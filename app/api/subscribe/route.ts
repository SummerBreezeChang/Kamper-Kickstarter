import { APIResponseError, Client, extractDatabaseId } from "@notionhq/client"
import { NextResponse } from "next/server"

/** Ensure the subscribe route runs in Node so the Notion SDK behaves consistently */
export const runtime = "nodejs"

type NotionProp = { type: string }

/** Trim and strip accidental wrapping quotes from .env values */
function trimEnv(value: string | undefined): string | undefined {
  if (value == null) return undefined
  const t = value.trim().replace(/^["']|["']$/g, "").trim()
  return t === "" ? undefined : t
}

/** Fix invisible / “smart” punctuation from Slack, Notion, or PDF copy-paste */
function normalizeDatabaseIdInput(raw: string): string {
  return raw
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[\u2010-\u2015\u2212\uFF0D]/g, "-")
    .trim()
}

export async function POST(req: Request) {
  try {
    const rawDatabaseId = trimEnv(process.env.NOTION_DATABASE_ID)
    const normalizedDbInput = rawDatabaseId ? normalizeDatabaseIdInput(rawDatabaseId) : undefined
    const databaseId = normalizedDbInput
      ? extractDatabaseId(normalizedDbInput) ?? normalizedDbInput
      : undefined
    const apiKey = trimEnv(
      process.env.NOTION_API_KEY ?? process.env.NOTION_SECRET ?? process.env.NOTION_TOKEN,
    )

    // Check env vars first before doing anything
    if (!apiKey) {
      console.error("[subscribe] Notion API key is not set (checked NOTION_API_KEY, NOTION_SECRET, NOTION_TOKEN)")
      return NextResponse.json({ error: "Notion is not configured." }, { status: 500 })
    }
    if (!databaseId) {
      console.error("[subscribe] NOTION_DATABASE_ID is not set")
      return NextResponse.json({ error: "Notion is not configured." }, { status: 500 })
    }

    // Initialize client inside handler so env vars are always read at runtime
    const notion = new Client({ auth: apiKey, notionVersion: '2022-06-28' })
    const { firstName, lastName, email } = await req.json()

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 })
    }

    // Retrieve the database schema so we can map our fields to whatever
    // property names/types the user set up in Notion.
    const db = await notion.databases.retrieve({ database_id: databaseId })
    const dbTyped = db as {
      properties?: Record<string, NotionProp>
      data_sources?: Array<{ id: string; name?: string }>
    }
    const props =
      dbTyped.properties != null && typeof dbTyped.properties === "object"
        ? dbTyped.properties
        : null
    const dataSources = Array.isArray(dbTyped.data_sources) ? dbTyped.data_sources : []
    const primaryDataSourceId = dataSources[0]?.id
    if (!props) {
      console.error("[subscribe] databases.retrieve returned no properties", { databaseId })
      return NextResponse.json(
        {
          error:
            "Could not load your Notion database schema. Check NOTION_DATABASE_ID and that this integration is connected to the database.",
        },
        { status: 500 },
      )
    }

    /** Case-insensitive exact property name (matches your "First Name", "Last Name", …) */
    const propExact = (label: string): readonly [string, NotionProp] | null => {
      const want = label.toLowerCase().trim()
      for (const [name, prop] of Object.entries(props)) {
        if (name.toLowerCase().trim() === want) return [name, prop]
      }
      return null
    }

    // Fuzzy match for other DB layouts — exact name + shortest `includes` wins.
    const findProp = (...candidates: string[]) => {
      const keys = Object.keys(props)
      const lowerKeys = keys.map((k) => k.toLowerCase().trim())

      for (const cand of candidates) {
        const normalized = cand.toLowerCase().trim()
        const exactIdx = lowerKeys.indexOf(normalized)
        if (exactIdx !== -1) {
          const realName = keys[exactIdx]
          return [realName, props[realName]] as const
        }
      }
      for (const cand of candidates) {
        const normalized = cand.toLowerCase().trim()
        if (normalized.length < 2) continue
        const fuzzyMatches = lowerKeys
          .map((k, i) => ({ k, i }))
          .filter(({ k }) => k.includes(normalized))
        if (fuzzyMatches.length === 0) continue
        const best = fuzzyMatches.reduce((a, b) => (a.k.length <= b.k.length ? a : b))
        const realName = keys[best.i]
        return [realName, props[realName]] as const
      }
      return null
    }

    const payload: Record<string, unknown> = {}

    // --- Your waitlist schema (Notion UI "Text" = API `rich_text`) ---
    const firstNameCol = propExact("First Name")
    if (firstNameCol?.[1]?.type === "title") {
      const content = String(firstName ?? "").trim() || email
      payload[firstNameCol[0]] = { title: [{ text: { content } }] }
    }

    const lastNameCol = propExact("Last Name")
    if (lastNameCol?.[1]?.type === "rich_text" && String(lastName ?? "").trim()) {
      payload[lastNameCol[0]] = {
        rich_text: [{ text: { content: String(lastName).trim() } }],
      }
    }

    const emailCol = propExact("Email")
    if (emailCol?.[1]?.type === "email") {
      payload[emailCol[0]] = { email }
    }

    const dateCol = propExact("Date")
    if (dateCol?.[1]?.type === "date") {
      payload[dateCol[0]] = { date: { start: new Date().toISOString() } }
    }

    // Any title column not filled yet (other database layouts)
    const titleFilled = Object.keys(props).some((k) => props[k]?.type === "title" && payload[k] != null)
    if (!titleFilled) {
      const titleEntry = Object.entries(props).find(([, p]) => p.type === "title")
      if (titleEntry) {
        const [titleName] = titleEntry
        const fullName = [firstName, lastName].filter(Boolean).join(" ").trim() || email
        payload[titleName] = { title: [{ text: { content: fullName } }] }
      }
    }

    const firstProp = findProp("First Name", "FirstName", "First")
    if (firstProp && firstName && !payload[firstProp[0]]) {
      const [name, prop] = firstProp
      if (prop.type === "rich_text") {
        payload[name] = { rich_text: [{ text: { content: String(firstName) } }] }
      } else if (prop.type === "title") {
        payload[name] = { title: [{ text: { content: String(firstName) } }] }
      }
    }

    const lastProp = findProp("Last Name", "LastName", "Last")
    if (lastProp && lastName && !payload[lastProp[0]]) {
      const [name, prop] = lastProp
      if (prop.type === "rich_text") {
        payload[name] = { rich_text: [{ text: { content: String(lastName) } }] }
      }
    }

    const emailProp = findProp("Email", "E-mail", "Email Address")
    if (emailProp && !payload[emailProp[0]]) {
      const [name, prop] = emailProp
      if (prop.type === "email") {
        payload[name] = { email }
      } else if (prop.type === "rich_text") {
        payload[name] = { rich_text: [{ text: { content: email } }] }
      } else if (prop.type === "title") {
        payload[name] = { title: [{ text: { content: email } }] }
      } else if (prop.type === "url") {
        payload[name] = { url: `mailto:${encodeURIComponent(email)}` }
      }
    }

    // Newer Notion databases expose `data_sources`; rows must be created under the data source parent.
    // See: https://developers.notion.com/reference/post-page
    const parent = primaryDataSourceId
      ? { data_source_id: primaryDataSourceId }
      : { database_id: databaseId }

    await notion.pages.create({
      parent: parent as never,
      properties: payload as never,
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error("[subscribe] Notion error:", err)

    let message = "Subscription failed. Please try again."
    if (APIResponseError.isAPIResponseError(err)) {
      const { code, message: notionMessage } = err
      if (code === "unauthorized") {
        message = "Notion API key is invalid."
        console.error("[subscribe] Invalid Notion API key")
      } else if (code === "object_not_found") {
        message =
          "Notion could not open that database. Either NOTION_DATABASE_ID is wrong (copy it from the database opened in your workspace on notion.so), or the database is not shared with this integration: open the database → ··· → Connect to → pick your integration. The integration and database must be in the same workspace."
        console.error("[subscribe] object_not_found — wrong ID, wrong workspace, or integration not connected to this database")
      } else if (code === "restricted_resource") {
        message =
          "Notion denied access. Open the database in Notion → … → Connect to (or Add connections) → select your integration."
        console.error("[subscribe] restricted_resource — connect integration to this database")
      } else if (code === "validation_error" && notionMessage?.length) {
        message = notionMessage
        console.error("[subscribe] Validation error:", notionMessage)
      } else if (notionMessage?.length) {
        message = notionMessage
        console.error("[subscribe] API error:", code, notionMessage)
      }
    } else if (err instanceof SyntaxError) {
      message = "Invalid request body."
      console.error("[subscribe] JSON parse error")
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}

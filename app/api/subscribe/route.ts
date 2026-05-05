import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

type NotionProp = { type: string }

function sanitizeDbId(raw: string): string {
  const hex = raw.replace(/[^a-fA-F0-9]/g, "")
  if (hex.length !== 32) return raw
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.NOTION_API_KEY
    const rawDbId = process.env.NOTION_DATABASE_ID

    if (!apiKey) {
      console.error("[subscribe] NOTION_API_KEY is not set")
      return NextResponse.json({ error: "Notion is not configured." }, { status: 500 })
    }
    if (!rawDbId) {
      console.error("[subscribe] NOTION_DATABASE_ID is not set")
      return NextResponse.json({ error: "Notion is not configured." }, { status: 500 })
    }

    const databaseId = sanitizeDbId(rawDbId)
    const notion = new Client({ auth: apiKey })

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
    }

    const { firstName, lastName, email } = body as {
      firstName?: string
      lastName?: string
      email?: string
    }

    if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 })
    }

    const db = (await notion.databases.retrieve({ database_id: databaseId })) as unknown as {
      properties: Record<string, NotionProp>
    }
    const props = db.properties

    console.log("[subscribe] Database properties:", Object.entries(props).map(([k, v]) => `${k} (${v.type})`).join(", "))

    const findProp = (...candidates: string[]) => {
      const lowerKeys = Object.keys(props).map((k) => k.toLowerCase())
      for (const cand of candidates) {
        const idx = lowerKeys.indexOf(cand.toLowerCase())
        if (idx !== -1) {
          const realName = Object.keys(props)[idx]
          return [realName, props[realName]] as const
        }
      }
      return null
    }

    const payload: Record<string, unknown> = {}

    const titleEntry = Object.entries(props).find(([, p]) => p.type === "title")
    if (titleEntry) {
      const [titleName] = titleEntry
      const fullName = [firstName, lastName].filter(Boolean).join(" ").trim() || email
      payload[titleName] = { title: [{ text: { content: fullName } }] }
    }

    const firstProp = findProp("First Name", "FirstName", "First", "Given Name")
    if (firstProp && firstName) {
      const [name, prop] = firstProp
      if (prop.type === "rich_text") {
        payload[name] = { rich_text: [{ text: { content: String(firstName) } }] }
      } else if (prop.type === "title" && !payload[name]) {
        payload[name] = { title: [{ text: { content: String(firstName) } }] }
      }
    }

    const lastProp = findProp("Last Name", "LastName", "Last", "Surname", "Family Name")
    if (lastProp && lastName) {
      const [name, prop] = lastProp
      if (prop.type === "rich_text") {
        payload[name] = { rich_text: [{ text: { content: String(lastName) } }] }
      } else if (prop.type === "title" && !payload[name]) {
        payload[name] = { title: [{ text: { content: String(lastName) } }] }
      }
    }

    const emailProp = findProp("Email", "E-mail", "Email Address", "email", "Mail")
    if (emailProp) {
      const [name, prop] = emailProp
      if (prop.type === "email") {
        payload[name] = { email }
      } else if (prop.type === "rich_text") {
        payload[name] = { rich_text: [{ text: { content: email } }] }
      } else if (prop.type === "title" && !payload[name]) {
        payload[name] = { title: [{ text: { content: email } }] }
      } else if (prop.type === "url") {
        payload[name] = { url: `mailto:${email}` }
      }
    } else {
      console.warn("[subscribe] No email property found in Notion DB. Email will only appear in the title field.")
    }

    console.log("[subscribe] Creating page with properties:", Object.keys(payload).join(", "))

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: payload as never,
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error("[subscribe] Notion error:", err)

    let message = "Subscription failed. Please try again."
    let status = 500

    if (err && typeof err === "object") {
      const notionErr = err as { code?: string; message?: string; status?: number; body?: string }
      if (notionErr.code === "unauthorized") {
        message = "Notion API key is invalid or expired."
        console.error("[subscribe] Invalid NOTION_API_KEY — regenerate at notion.so/my-integrations")
      } else if (notionErr.code === "object_not_found") {
        message = "Notion database not found. Verify NOTION_DATABASE_ID and that the integration is shared with the database."
        console.error("[subscribe] Database not found — ensure the integration is invited to the database via Share → Connections")
      } else if (notionErr.code === "validation_error") {
        message = "Data format mismatch with Notion database schema."
        console.error("[subscribe] Validation error — database property types may have changed:", notionErr.message)
      } else if (notionErr.code === "rate_limited") {
        message = "Too many requests. Please try again in a moment."
        status = 429
      } else if (notionErr.message) {
        console.error("[subscribe] Error detail:", notionErr.message)
      }
    }

    return NextResponse.json({ error: message }, { status })
  }
}

import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

type NotionProp = { type: string }

export async function POST(req: Request) {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID
    const apiKey = process.env.NOTION_API_KEY ?? process.env.NOTION_SECRET ?? process.env.NOTION_TOKEN

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
    const notion = new Client({ auth: apiKey })

    const { firstName, lastName, email } = await req.json()

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 })
    }

    // Retrieve the database schema so we can map our fields to whatever
    // property names/types the user set up in Notion.
    const db = (await notion.databases.retrieve({ database_id: databaseId })) as unknown as {
      properties: Record<string, NotionProp>
    }
    const props = db.properties

    const findProp = (...candidates: string[]) => {
      const keys = Object.keys(props)
      const lowerKeys = keys.map((k) => k.toLowerCase().trim())
      for (const cand of candidates) {
        const normalized = cand.toLowerCase().trim()
        const idx = lowerKeys.indexOf(normalized)
        if (idx !== -1) {
          const realName = keys[idx]
          return [realName, props[realName]] as const
        }

        const fuzzyIdx = lowerKeys.findIndex((k) => k.includes(normalized))
        if (fuzzyIdx !== -1) {
          const realName = keys[fuzzyIdx]
          return [realName, props[realName]] as const
        }
      }
      return null
    }

    const payload: Record<string, unknown> = {}

    // Title property — every Notion DB has exactly one. Use full name (or email) as the title.
    const titleEntry = Object.entries(props).find(([, p]) => p.type === "title")
    if (titleEntry) {
      const [titleName] = titleEntry
      const fullName = [firstName, lastName].filter(Boolean).join(" ").trim() || email
      payload[titleName] = { title: [{ text: { content: fullName } }] }
    }

    const firstProp = findProp("First Name", "FirstName", "First")
    if (firstProp && firstName) {
      const [name, prop] = firstProp
      if (prop.type === "rich_text") {
        payload[name] = { rich_text: [{ text: { content: String(firstName) } }] }
      } else if (prop.type === "title" && !payload[name]) {
        payload[name] = { title: [{ text: { content: String(firstName) } }] }
      }
    }

    const lastProp = findProp("Last Name", "LastName", "Last")
    if (lastProp && lastName) {
      const [name, prop] = lastProp
      if (prop.type === "rich_text") {
        payload[name] = { rich_text: [{ text: { content: String(lastName) } }] }
      }
    }

    const emailProp = findProp("Email", "E-mail", "Email Address")
    if (emailProp) {
      const [name, prop] = emailProp
      if (prop.type === "email") {
        payload[name] = { email }
      } else if (prop.type === "rich_text") {
        payload[name] = { rich_text: [{ text: { content: email } }] }
      }
    }

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: payload as never,
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    // Log full error details for debugging
    console.error("[subscribe] Notion error:", err)
    
    // Extract useful error info from Notion API errors
    let message = "Subscription failed. Please try again."
    if (err && typeof err === "object") {
      const notionErr = err as { code?: string; message?: string; body?: string }
      if (notionErr.code === "unauthorized") {
        message = "Notion API key is invalid."
        console.error("[subscribe] Invalid NOTION_API_KEY")
      } else if (notionErr.code === "object_not_found") {
        message = "Notion database not found. Check NOTION_DATABASE_ID."
        console.error("[subscribe] Database not found - check NOTION_DATABASE_ID and sharing permissions")
      } else if (
        notionErr.code === "validation_error" &&
        typeof notionErr.message === "string" &&
        notionErr.message.length > 0
      ) {
        message = notionErr.message
        console.error("[subscribe] Validation error:", notionErr.message)
      } else if (notionErr.message) {
        console.error("[subscribe] Error message:", notionErr.message)
      }
    }
    
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

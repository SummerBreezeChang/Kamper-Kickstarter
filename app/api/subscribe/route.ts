import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

const notion = new Client({ auth: process.env.NOTION_API_KEY })

type NotionProp = { type: string }

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email } = await req.json()

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 })
    }

    const databaseId = process.env.NOTION_DATABASE_ID
    if (!databaseId || !process.env.NOTION_API_KEY) {
      return NextResponse.json({ error: "Notion is not configured." }, { status: 500 })
    }

    // Retrieve the database schema so we can map our fields to whatever
    // property names/types the user set up in Notion.
    const db = (await notion.databases.retrieve({ database_id: databaseId })) as unknown as {
      properties: Record<string, NotionProp>
    }
    const props = db.properties

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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("[subscribe] Notion error:", message)
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 })
  }
}

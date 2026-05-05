import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

export async function GET() {
  const checks: Record<string, { ok: boolean; detail?: string }> = {}

  const apiKey = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_ID

  checks.NOTION_API_KEY = apiKey
    ? { ok: true, detail: `Set (${apiKey.slice(0, 8)}...)` }
    : { ok: false, detail: "Missing — add to Vercel Environment Variables" }

  checks.NOTION_DATABASE_ID = databaseId
    ? { ok: true, detail: `Set (${databaseId.slice(0, 8)}...)` }
    : { ok: false, detail: "Missing — add to Vercel Environment Variables" }

  if (apiKey && databaseId) {
    try {
      const notion = new Client({ auth: apiKey })
      const db = await notion.databases.retrieve({ database_id: databaseId }) as unknown as {
        title?: Array<{ plain_text?: string }>
        properties?: Record<string, { type: string }>
      }

      const dbTitle = db.title?.map((t) => t.plain_text).join("") || "(untitled)"
      const propNames = db.properties
        ? Object.entries(db.properties).map(([k, v]) => `${k} (${v.type})`).join(", ")
        : "none"

      checks.notion_connection = { ok: true, detail: `Connected to "${dbTitle}"` }
      checks.database_properties = { ok: true, detail: propNames }

      const hasEmailProp = db.properties
        ? Object.entries(db.properties).some(
            ([k, v]) =>
              /email|e-mail|mail/i.test(k) && (v.type === "email" || v.type === "rich_text")
          )
        : false

      checks.email_property = hasEmailProp
        ? { ok: true, detail: "Email-compatible property found" }
        : { ok: false, detail: "No property named 'Email' with type email/rich_text — subscriber emails may not be stored correctly" }
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string }
      if (e.code === "unauthorized") {
        checks.notion_connection = { ok: false, detail: "API key is invalid or revoked" }
      } else if (e.code === "object_not_found") {
        checks.notion_connection = { ok: false, detail: "Database not found — check ID and ensure the integration is shared with the database" }
      } else {
        checks.notion_connection = { ok: false, detail: e.message || "Unknown error" }
      }
    }
  }

  const allOk = Object.values(checks).every((c) => c.ok)
  return NextResponse.json({ status: allOk ? "healthy" : "unhealthy", checks }, { status: allOk ? 200 : 503 })
}

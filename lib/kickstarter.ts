/**
 * Kickstarter campaign URL used across marketing CTAs.
 *
 * Defaults to an on-site placeholder until the real Kickstarter link is ready.
 * Set `NEXT_PUBLIC_KICKSTARTER_URL` in Vercel/local env to switch every CTA at once.
 */
export const KICKSTARTER_HREF =
  process.env.NEXT_PUBLIC_KICKSTARTER_URL?.trim() || "/kickstarter"

export function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href)
}

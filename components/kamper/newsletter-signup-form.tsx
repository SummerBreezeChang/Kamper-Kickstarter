"use client"

import { useState } from "react"
import Link from "next/link"

type NewsletterSignupFormProps = {
  submitLabel?: string
  inputClassName: string
  buttonClassName: string
  privacyClassName: string
}

export function NewsletterSignupForm({
  submitLabel = "Subscribe",
  inputClassName,
  buttonClassName,
  privacyClassName,
}: NewsletterSignupFormProps) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    setErrorMessage(null)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.error || "Subscription failed. Please try again.")
      }
      setSubmitted(true)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-foreground/25 bg-foreground/5 px-6 py-6">
        <p className="text-2xl font-serif font-semibold text-foreground mb-2">You&apos;re on the list!</p>
        <p className="text-foreground/75">
          We&apos;ll send Kickstarter updates, early-bird pricing, and outdoor one-pot meal guides.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className={inputClassName}
          />
          <input
            type="text"
            name="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className={inputClassName}
          />
        </div>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter an e-mail address"
          className={inputClassName}
        />
        <button type="submit" disabled={submitting} className={buttonClassName}>
          {submitting ? "Submitting..." : submitLabel}
        </button>
        {errorMessage && (
          <p role="alert" className="text-sm text-primary">
            {errorMessage}
          </p>
        )}
      </form>

      <p className={privacyClassName}>
        By signing up for updates, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-foreground/90">
          Privacy Policy
        </Link>{" "}
        terms.
      </p>
    </div>
  )
}

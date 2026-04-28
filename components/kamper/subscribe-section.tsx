"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ImagePlaceholder } from "@/components/kamper/image-placeholder"
import { WordOpacityHeading } from "@/components/kamper/word-opacity-heading"

export function SubscribeSection() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="subscribe" className="border-t-2 border-dotted border-foreground/35">
      <div className="grid min-h-[760px] lg:min-h-[700px] lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="relative flex flex-col justify-between bg-secondary px-6 py-10 md:px-10 md:py-12 text-secondary-foreground"
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/70 mb-4">
              KAMPER Updates
            </p>
            <WordOpacityHeading
              lines={["Get launch updates, one-pot meal ideas,", "and early access offers."]}
              className="max-w-2xl text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground uppercase tracking-tight leading-[0.95]"
            />
          </div>

          <div className="mt-16">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-foreground/25 bg-foreground/5 px-6 py-6"
              >
                <p className="text-2xl font-serif font-semibold text-foreground mb-2">
                  You&apos;re on the list!
                </p>
                <p className="text-foreground/75">
                  We&apos;ll send Kickstarter updates, early-bird pricing, and outdoor one-pot meal guides.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-full border border-foreground/25 bg-transparent px-5 py-4 text-sm uppercase tracking-wide text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-foreground/40"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter an e-mail address"
                    className="w-full rounded-full border border-foreground/25 bg-transparent px-5 py-4 text-sm uppercase tracking-wide text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-foreground/40"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="mt-4 text-xs md:text-sm text-foreground/75">
              By signing up for updates, you agree to our{" "}
              <Link href="/privacy" className="underline hover:text-foreground/90">
                Privacy Policy
              </Link>{" "}
              terms.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="relative min-h-[360px] bg-muted p-0"
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_30%),radial-gradient(circle_at_75%_70%,rgba(120,0,50,0.35),transparent_35%)]" />
          <ImagePlaceholder
            title="Subscribe Visual"
            note="Replace with angled Kamper product shot on pink background"
            className="h-full w-full rounded-none border-0 bg-transparent text-foreground"
          />
        </motion.div>
      </div>
    </section>
  )
}

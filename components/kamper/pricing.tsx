"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const KICKSTARTER_URL = "https://www.kickstarter.com"

export function Pricing() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="preorder" className="py-24 md:py-32 bg-charcoal text-charcoal-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section header — left aligned */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest text-charcoal-foreground/60 mb-3 uppercase"
          >
            Launching on Kickstarter
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-charcoal-foreground uppercase tracking-tight"
          >
            Own it. Take it everywhere.
          </motion.h2>
        </div>

        {/* Two-column: card left, email right */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* Own It card — left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 bg-background rounded-2xl p-10 shadow-sm text-center"
          >
            <p className="text-xs tracking-widest text-muted-foreground mb-6 uppercase">
              Own It
            </p>
            <p className="text-6xl font-serif font-semibold text-foreground mb-2">
              $549
            </p>
            <p className="text-xs text-muted-foreground mb-6 uppercase tracking-wider">
              One-time payment · Free shipping
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Buy outright and keep it forever. The complete KAMPER kitchen, ready for any adventure.
            </p>
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full px-8 py-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Back on Kickstarter
            </a>
          </motion.div>

          {/* Email capture — right, vertically centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center px-2 lg:px-8"
          >
            <p className="text-xs tracking-widest text-charcoal-foreground/60 mb-3 uppercase">
              Not ready to back?
            </p>
            <h3 className="text-2xl md:text-3xl font-serif font-medium text-charcoal-foreground mb-3 uppercase">
              Get notified when KAMPER hits stores.
            </h3>
            <p className="text-sm text-charcoal-foreground/70 mb-8">
              Leave your email and we&apos;ll reach out the moment KAMPER becomes available at retail.
            </p>
            {submitted ? (
              <div className="py-4">
                <p className="text-charcoal-foreground font-medium mb-1">You&apos;re on the list.</p>
                <p className="text-sm text-charcoal-foreground/70">
                  We&apos;ll notify you the moment KAMPER becomes available at retail.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3.5 rounded-full border border-charcoal-foreground/30 bg-charcoal text-sm text-charcoal-foreground placeholder:text-charcoal-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full border border-secondary bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors whitespace-nowrap"
                >
                  Notify Me
                </button>
              </form>
            )}
            <p className="mt-4 text-xs text-charcoal-foreground/50">
              No commitment. Unsubscribe anytime.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

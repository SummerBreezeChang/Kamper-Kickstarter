"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { WordOpacityHeading } from "@/components/kamper/word-opacity-heading"
import { NewsletterSignupForm } from "@/components/kamper/newsletter-signup-form"

export function SubscribeSection() {
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
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}>
              <NewsletterSignupForm
                inputClassName="w-full rounded-full border border-foreground/25 bg-transparent px-5 py-4 text-sm uppercase tracking-wide text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-foreground/40"
                buttonClassName="w-full rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                privacyClassName="mt-4 text-xs md:text-sm text-foreground/75"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="relative min-h-[360px] bg-muted p-0 overflow-hidden"
        >
          <Image
            src="/luma/h01.png"
            alt="Mountain lake view with KAMPER grill setup at golden hour"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  )
}

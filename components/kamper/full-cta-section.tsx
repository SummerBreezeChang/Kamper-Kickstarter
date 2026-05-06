"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { WordOpacityHeading } from "@/components/kamper/word-opacity-heading"
import { isExternalHref, KICKSTARTER_HREF } from "@/lib/kickstarter"

export function FullCtaSection() {
  return (
    <section className="relative min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/luma/f01.png"
          alt="KAMPER cooking system at a forest campsite with prep table of fresh vegetables"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-end">
        <div className="w-full max-w-5xl px-6 md:px-10 pb-10 md:pb-14 text-left">
        <WordOpacityHeading
          lines={["Outdoor cooking", "one box simple"]}
          className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-charcoal-foreground uppercase tracking-tight leading-[0.9] mb-4"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl text-lg md:text-2xl text-charcoal-foreground/85 mb-8"
        >
          Pack. Place. Cook.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href={KICKSTARTER_HREF}
            {...(isExternalHref(KICKSTARTER_HREF)
              ? { target: "_blank" as const, rel: "noopener noreferrer" }
              : {})}
            className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full bg-primary text-primary-foreground text-base md:text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Back on Kickstarter
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  )
}

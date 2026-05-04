"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const KICKSTARTER_URL = "https://www.kickstarter.com"
const HEADING_PASSES = [
  {
    eyebrow: "Pass 01",
    title: "Pack small. Start clean.",
    description: "Carry one compact box from the car and set up your outdoor prep flow without clutter.",
    cta: "See setup",
  },
  {
    eyebrow: "Pass 02",
    title: "Unfold. Prep. Cook.",
    description: "Every motion reveals the next stage, turning one box into a complete cook station.",
    cta: "Keep scrolling",
  },
  {
    eyebrow: "Pass 03",
    title: "One box. Full kitchen.",
    description: "From packed to ready-to-cook in seconds, built for travel meals wherever you park.",
    cta: "Back on Kickstarter",
  },
]

export function RevealSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const headingY = useTransform(scrollYProgress, [0.42, 0.9], [26, 0])

  return (
    <section ref={containerRef} id="reveal" className="relative h-[calc(360vh-1300px)] bg-transparent text-charcoal-foreground">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative mx-auto flex h-full w-full max-w-[1540px] items-center justify-center px-6 md:px-10">
          {/* 3-pass heading / description / CTA flow */}
          <div className="absolute bottom-16 left-6 right-6 md:bottom-20">
            {HEADING_PASSES.map((pass, index) => (
              <motion.div
                key={pass.title}
                style={{
                  y: headingY,
                  opacity: useTransform(scrollYProgress, [0.42 + index * 0.16, 0.52 + index * 0.16, 0.62 + index * 0.16], [0, 1, 0]),
                }}
                className="absolute inset-x-0 text-center"
              >
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-charcoal-foreground/78">{pass.eyebrow}</p>
                <h2 className="text-3xl font-serif font-bold uppercase leading-[0.9] text-charcoal-foreground md:text-5xl lg:text-6xl">
                  {pass.title}
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-foreground/90 md:text-base">
                  {pass.description}
                </p>
                <a
                  href={KICKSTARTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 md:text-sm"
                >
                  {pass.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

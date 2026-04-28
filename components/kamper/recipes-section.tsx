"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ImagePlaceholder } from "@/components/kamper/image-placeholder"
import { WordOpacityHeading } from "@/components/kamper/word-opacity-heading"

const pillars = [
  {
    title: "Packable Design",
    description:
      "Compact enough to travel easily, with everything organized in one box for fast setup anywhere.",
    image: "Replace with overhead food + Kamper image"
  },
  {
    title: "Fast Setup",
    description:
      "Go from packed to cooking in under a minute. No assembly, no extra tools, no wasted campsite time.",
    image: "Replace with in-use cooking close-up"
  },
  {
    title: "Reliable Cooking",
    description:
      "Stable heat control, prep surface, and wind-ready design help you cook consistent meals in different environments.",
    image: "Replace with lifestyle detail image"
  }
]

export function RecipesSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  })
  const gridLiftY = useTransform(scrollYProgress, [0, 0.55, 1], [120, 0, -150])

  return (
    <section id="recipes" className="bg-secondary text-secondary-foreground min-h-[150vh] py-16 md:py-20">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center px-6 md:px-12 pt-16 md:pt-20 pb-12"
        >
          <p className="text-xs md:text-sm tracking-[0.2em] text-secondary-foreground/75 uppercase mb-3">
            Why KAMPER
          </p>
          <WordOpacityHeading
            lines={["Built for Travel", "Ready to Cook"]}
            className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold uppercase tracking-tight leading-[0.88]"
          />
          <p className="mt-4 text-sm md:text-base uppercase tracking-wide text-secondary-foreground/80">
            One compact outdoor kitchen that packs fast, sets up quickly, and cooks reliably wherever you camp.
          </p>
        </motion.div>

        <motion.div ref={gridRef} style={{ y: gridLiftY }} className="grid md:grid-cols-3 mt-[60px]">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="px-6 md:px-8 py-8 md:py-10 border-r border-border last:border-r-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-charcoal-foreground text-xs">
                  ●
                </span>
                <h3 className="text-sm md:text-base font-semibold uppercase tracking-wide">{pillar.title}</h3>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-secondary-foreground/85">{pillar.description}</p>

              {/* Keep breathing room while preserving continuous vertical divider */}
              <div className="mt-16 md:mt-28">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImagePlaceholder
                    title={pillar.title}
                    note={pillar.image}
                    className="rounded-none border-secondary-foreground/20 bg-card/65"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

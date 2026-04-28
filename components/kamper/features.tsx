"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    title: "ONE JET Burner",
    description: "8,500 BTU precision burner for consistent heat from simmer to sear.",
    stat: "8,500 BTU"
  },
  {
    title: "Integrated Prep Station",
    description: "Bamboo cutting board unfolds into a full workspace with utensil storage.",
    stat: "2x Space"
  },
  {
    title: "All-Weather Construction",
    description: "Powder-coated aluminum body with silicone seals. Rain or shine ready.",
    stat: "IP65 Rated"
  }
]

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <p className="text-sm tracking-widest text-muted-foreground mb-2 uppercase">
            Engineering
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground max-w-xl uppercase tracking-tight">
            Built to perform, designed to last.
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ 
  feature, 
  index 
}: { 
  feature: typeof features[0]
  index: number 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y }}
      className="group"
    >
      <div className="mb-6">
        <span className="text-4xl md:text-5xl font-light text-primary">
          {feature.stat}
        </span>
      </div>
      <h3 className="text-xl font-medium text-foreground mb-3">
        {feature.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  )
}

"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60])

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background">
      <motion.div 
        className="max-w-7xl mx-auto px-4 md:px-8 text-center"
        style={{ opacity, y }}
      >
        <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-foreground">
          KAMPER is a new standard in outdoor cooking, where thoughtful engineering 
          meets the freedom of the open road. From a compact box to a complete 
          prep-and-cook station in seconds.
        </p>
      </motion.div>
    </section>
  )
}

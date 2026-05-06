"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function LifestyleSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Full bleed image */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4743.JPG-Kj4FPY0hpqPDqNL6RU1EI9C2TJCFvg.jpeg"
          alt="Cooking outdoors at campsite"
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient overlay at bottom for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
      </motion.div>

      {/* Text - positioned at bottom, clean */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 pb-12"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-sm tracking-widest text-muted-foreground mb-2 uppercase">
            Adventure Ready
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground max-w-2xl uppercase tracking-tight">
            Go further, stay longer.
          </h2>
        </div>
      </motion.div>
    </section>
  )
}

"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function ComponentsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40])

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-muted">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div 
          className="mb-12 md:mb-16"
          style={{ opacity: textOpacity, y: textY }}
        >
          <p className="text-sm tracking-widest text-muted-foreground mb-2 uppercase">
            What&apos;s Included
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground max-w-xl uppercase tracking-tight">
            Everything you need, nothing you don&apos;t.
          </h2>
        </motion.div>

        {/* Large product image showing all components */}
        <motion.div 
          className="relative"
          style={{ y: imageY }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/layout.png-rWXol50Olre9nm6m6mEnJBO3qvSMa2.jpeg"
            alt="KAMPER complete kit with all accessories"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Component list */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Base Unit", desc: "Aluminum body with integrated burner" },
            { name: "Prep Table", desc: "Folding side table with bamboo surface" },
            { name: "Griddle Pan", desc: "Non-stick steel cooking surface" },
            { name: "Utensil Tray", desc: "Storage with included spatula" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-medium text-foreground mb-1">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

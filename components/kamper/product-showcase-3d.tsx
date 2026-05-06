"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Product3DViewer } from "./product-3d-viewer"

interface ProductShowcase3DProps {
  modelUrl?: string
}

export function ProductShowcase3D({ modelUrl }: ProductShowcase3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  return (
    <section 
      ref={containerRef}
      id="3d-view"
      className="relative py-24 bg-gradient-to-b from-muted/30 to-background overflow-hidden"
    >
      <motion.div 
        className="max-w-7xl mx-auto px-6 lg:px-12"
        style={{ opacity, y }}
      >
        <div className="text-center mb-8">
          <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4">
            360° View
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4">
            Explore every angle
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Scroll to rotate the KAMPER and see the thoughtful engineering from every perspective.
          </p>
        </div>

        <Product3DViewer modelUrl={modelUrl} />

        {/* Feature callouts around 3D model */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[
            { label: "Weight", value: "18 lbs" },
            { label: "Dimensions", value: "14\" × 12\" × 10\"" },
            { label: "Burner", value: "12,000 BTU" },
            { label: "Setup Time", value: "< 30 sec" },
          ].map((spec, index) => (
            <motion.div
              key={spec.label}
              className="text-center p-4 rounded-lg bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl font-bold text-foreground">{spec.value}</p>
              <p className="text-sm text-muted-foreground">{spec.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

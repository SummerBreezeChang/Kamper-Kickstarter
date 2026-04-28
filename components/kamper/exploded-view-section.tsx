"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ComponentPart {
  id: string
  name: string
  description: string
  offsetY: number // How much this part moves on scroll
}

const productParts: ComponentPart[] = [
  { id: "lid", name: "Cutting Board Lid", description: "Food-safe bamboo composite", offsetY: -150 },
  { id: "skillet", name: "Cast Iron Skillet", description: "Pre-seasoned, 10\" surface", offsetY: -80 },
  { id: "burner", name: "ONE JET Burner", description: "12,000 BTU multi-fuel", offsetY: 0 },
  { id: "body", name: "Main Housing", description: "Powder-coated aluminum", offsetY: 60 },
  { id: "legs", name: "Folding Legs", description: "Stainless steel, adjustable", offsetY: 120 },
]

export function ExplodedViewSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Control the explosion amount (0 = assembled, 1 = fully exploded)
  const explosionProgress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 min-h-screen bg-gradient-to-b from-background to-muted/20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4">
              Engineering
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-6">
              Thoughtfully designed, inside and out
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Every component serves a purpose. The KAMPER integrates cooking, prep, and storage into a seamless system that sets up in seconds.
            </p>

            {/* Parts List */}
            <div className="space-y-4">
              {productParts.map((part, index) => (
                <motion.div
                  key={part.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-foreground">{part.name}</h4>
                    <p className="text-sm text-muted-foreground">{part.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Exploded View Image */}
          <div className="relative aspect-square">
            {/* This will be replaced with sequential images or the existing exploded view */}
            <motion.div
              className="sticky top-1/4"
              style={{
                scale: useTransform(scrollYProgress, [0, 0.3], [0.9, 1]),
              }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.26.13%E2%80%AFAM-KhAHvJHHei3GdFPTuNewnczz8OOir5.png"
                alt="KAMPER exploded view showing internal components"
                className="w-full h-full object-contain"
              />
              
              {/* Animated highlight lines (placeholder for interactivity) */}
              <motion.div
                className="absolute top-[15%] right-0 w-24 h-px bg-primary"
                style={{
                  scaleX: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
                  transformOrigin: "left",
                }}
              />
              <motion.div
                className="absolute top-[35%] right-0 w-16 h-px bg-primary"
                style={{
                  scaleX: useTransform(scrollYProgress, [0.35, 0.55], [0, 1]),
                  transformOrigin: "left",
                }}
              />
              <motion.div
                className="absolute top-[55%] right-0 w-20 h-px bg-primary"
                style={{
                  scaleX: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
                  transformOrigin: "left",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

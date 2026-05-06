"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const specs = [
  { label: "Packed Dimensions", value: "14\" x 14\" x 11\"" },
  { label: "Weight", value: "22 lbs" },
  { label: "Fuel Type", value: "Standard Propane" },
]

export function Specs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-4 gap-12 md:gap-16 items-center">

          {/* Specs list — 1/3 width */}
          <div>
            <p className="text-sm tracking-widest text-muted-foreground mb-2 uppercase">
              Specifications
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-10 uppercase tracking-tight">
              The details.
            </h2>

            <div className="space-y-0">
              {specs.map((spec, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col py-4 border-b border-border"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <span className="text-xs tracking-wider text-muted-foreground uppercase mb-1">{spec.label}</span>
                  <span className="text-foreground font-medium">{spec.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product image — 3/4 width, dominant */}
          <motion.div
            className="lg:col-span-3"
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-SX4JTOln5x4OkMRuK4yiAa4SRZGbSU.png"
              alt="KAMPER fully expanded showing all components"
              className="w-full h-auto object-contain"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

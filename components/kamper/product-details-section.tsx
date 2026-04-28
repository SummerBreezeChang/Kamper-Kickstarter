"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const specs = [
  { label: "Weight", value: "18 lbs (8.2 kg)" },
  { label: "Dimensions (Closed)", value: '12" × 12" × 10"' },
  { label: "Prep Surface Height", value: '35" (with legs)' },
  { label: "Cooking Surface", value: '10" × 10" cast iron' },
  { label: "Fuel Capacity", value: "2× 13oz isobutane or 20oz liquid" },
  { label: "Heat Output", value: "12,000 BTU" },
]

const materials = [
  { component: "Main Housing", material: "Liquid-Crystal Polymer (LCP)" },
  { component: "Cutting Board", material: "ARBOFORM Liquid Wood" },
  { component: "Skillet", material: "Recycled Cast Iron" },
  { component: "Storage Drawer", material: "Stainless Steel (non-stick)" },
  { component: "Lid", material: "Polycarbonate (PC)" },
]

const included = [
  "KAMPER cooking unit",
  "Cast-iron skillet with lid",
  "ARBOFORM cutting board",
  "Stainless steel storage drawer",
  "Silicone handle/spatula",
  "User guide",
]

export function ProductDetailsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="py-24 px-6 lg:px-12">
      <motion.div className="max-w-7xl mx-auto" style={{ opacity }}>
        <div className="text-center mb-16">
          <motion.p 
            className="text-sm font-mono uppercase tracking-widest text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Details
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Built with precision
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Specifications */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">Specifications</h3>
            <div className="space-y-4">
              {specs.map((spec, index) => (
                <motion.div 
                  key={spec.label} 
                  className="flex justify-between items-baseline"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <span className="text-sm text-muted-foreground">{spec.label}</span>
                  <span className="text-sm font-medium text-foreground font-mono">{spec.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Materials */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">Materials</h3>
            <div className="space-y-4">
              {materials.map((item, index) => (
                <motion.div 
                  key={item.component} 
                  className="flex justify-between items-baseline"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <span className="text-sm text-muted-foreground">{item.component}</span>
                  <span className="text-sm font-medium text-foreground">{item.material}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What's Included */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">{"What's Included"}</h3>
            <ul className="space-y-3">
              {included.map((item, index) => (
                <motion.li 
                  key={item} 
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Product Image with hover effect */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.24.00%E2%80%AFAM.png-VgPoLUEM3Xz7H0OoQn8cnkidjIiamo.jpeg"
            alt="KAMPER fully expanded outdoor cooking station"
            className="max-w-3xl w-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

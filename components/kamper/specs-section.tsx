"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const specs = {
  dimensions: [
    { label: "Closed", value: '15" × 15" × 12"' },
    { label: "Open", value: '30" × 24" × 30"' },
    { label: "Weight", value: "28 lbs" },
  ],
  cooking: [
    { label: "Burner", value: "11,500 BTU" },
    { label: "Fuel", value: "1lb propane" },
    { label: "Griddle", value: '10" × 10"' },
  ],
  materials: [
    { label: "Body", value: "Powder-coated aluminum" },
    { label: "Griddle", value: "Stainless steel" },
    { label: "Cutting board", value: "FSC bamboo" },
  ]
}

const included = [
  "KAMPER base unit",
  "Fold-out prep table",
  "Stainless steel griddle",
  "Bamboo cutting board",
  "Utensil tray",
  "Silicone spatula",
  "Drip tray",
  "Quick-start guide"
]

export function SpecsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const imageX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section 
      ref={containerRef}
      id="specs"
      className="relative py-32 bg-muted overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-mono text-sm tracking-[0.2em] text-primary uppercase mb-4">
            Technical Details
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Specifications
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Specs tables */}
          <div className="space-y-8">
            {Object.entries(specs).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h3 className="font-mono text-xs tracking-[0.2em] text-primary uppercase mb-4">
                  {category}
                </h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* What's included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-6 border border-border"
            >
              <h3 className="font-mono text-xs tracking-[0.2em] text-primary uppercase mb-4">
                {"What's Included"}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="h-4 w-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product image with parallax */}
          <motion.div
            style={{ x: imageX }}
            className="sticky top-32"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/layout.png-rWXol50Olre9nm6m6mEnJBO3qvSMa2.jpeg"
                alt="KAMPER with all accessories"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Callout badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl"
            >
              <p className="text-3xl font-bold">28</p>
              <p className="text-xs font-mono uppercase tracking-wider opacity-80">lbs total</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

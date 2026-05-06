"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Flame, Package, Ruler, Wind } from "lucide-react"

const features = [
  {
    icon: Flame,
    title: "ONE JET Burner",
    description: "11,500 BTU stainless steel burner with precision flame control",
    stat: "11,500",
    statLabel: "BTU"
  },
  {
    icon: Package,
    title: "Compact Storage",
    description: "Everything nests inside a single 15\" cube for easy transport",
    stat: "15\"",
    statLabel: "Cube"
  },
  {
    icon: Ruler,
    title: "Prep Surface",
    description: "Bamboo cutting board doubles as work surface",
    stat: "12×12\"",
    statLabel: "Prep Area"
  },
  {
    icon: Wind,
    title: "Weather Resistant",
    description: "Powder-coated aluminum withstands the elements",
    stat: "IP54",
    statLabel: "Rating"
  }
]

export function FeatureRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section 
      ref={containerRef}
      id="features"
      className="relative py-32 bg-background overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-sm tracking-[0.2em] text-primary uppercase mb-4">
            Engineered for Adventure
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Every Detail Matters
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Precision-engineered components designed for years of outdoor cooking
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commencement-39IlSnPQSApX1mHeEeS3xhQwZPy6eX.png"
                alt="KAMPER top-down view showing all components"
                fill
                className="object-contain bg-gradient-to-br from-background to-muted"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Floating labels */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute top-1/4 left-0 -translate-x-1/2 bg-card rounded-xl p-3 shadow-lg border border-border"
            >
              <p className="text-xs font-mono text-primary">Griddle</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute top-1/3 right-0 translate-x-1/2 bg-card rounded-xl p-3 shadow-lg border border-border"
            >
              <p className="text-xs font-mono text-primary">Prep Table</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-1/4 right-1/4 bg-card rounded-xl p-3 shadow-lg border border-border"
            >
              <p className="text-xs font-mono text-primary">Storage</p>
            </motion.div>
          </motion.div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {feature.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-primary">
                        {feature.stat}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground uppercase">
                        {feature.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

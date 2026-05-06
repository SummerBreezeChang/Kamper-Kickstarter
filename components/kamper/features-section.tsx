"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Flame, Box, Utensils, Thermometer, Leaf, Shield } from "lucide-react"

const features = [
  {
    icon: Flame,
    title: "Multi-Fuel Burner",
    description: "ONE JET technology compatible with isobutane and liquid fuel. 40% more fuel efficient than conventional stoves.",
  },
  {
    icon: Box,
    title: "All-In-One Storage",
    description: "Cast-iron skillet, cutting board, utensils, and fuel storage—all nested inside a single compact unit.",
  },
  {
    icon: Utensils,
    title: "Premium Cookware",
    description: "Recycled cast-iron skillet with a stainless steel lid. Removable drawer doubles as grill grate and strainer.",
  },
  {
    icon: Thermometer,
    title: "Counter Height Design",
    description: "Integrated 8-inch legs bring your cooking surface to a comfortable 35-inch counter height.",
  },
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description: "ARBOFORM liquid wood cutting board, recycled cast iron, and heat-resistant LCP polymer housing.",
  },
  {
    icon: Shield,
    title: "Built to Last",
    description: "Weather-resistant polycarbonate lid and durable construction with a 2-year warranty.",
  },
]

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="features" ref={containerRef} className="py-24 px-6 lg:px-12">
      <motion.div className="max-w-7xl mx-auto" style={{ opacity }}>
        <div className="text-center mb-16">
          <motion.p 
            className="text-sm font-mono uppercase tracking-widest text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Engineered for Outdoors
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Every detail considered
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Inspired by aerospace engineering and professional kitchens. KAMPER combines heat-efficient cooking technology with thoughtful design.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

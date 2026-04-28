"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={containerRef} className="py-32 bg-muted">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          style={{ scale, opacity }}
          className="relative overflow-hidden rounded-3xl bg-foreground"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4743.JPG-Kj4FPY0hpqPDqNL6RU1EI9C2TJCFvg.jpeg"
              alt=""
              fill
              className="object-cover opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70" />
          </div>

          {/* Content */}
          <div className="relative grid lg:grid-cols-2 gap-12 p-12 md:p-20">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-mono text-sm tracking-[0.2em] text-primary uppercase mb-4"
              >
                Start Your Adventure
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-card mb-6"
              >
                Ready to cook <br />anywhere?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-card/70 mb-8"
              >
                Join thousands of outdoor enthusiasts who have upgraded their camping experience with KAMPER.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105">
                  Shop Now - $549
                </button>
                <button className="rounded-full border-2 border-card/30 px-8 py-4 font-medium text-card transition-all hover:bg-card/10">
                  Rent from $49/mo
                </button>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="flex items-center">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: "2,500+", label: "Happy Campers" },
                  { value: "4.9", label: "Average Rating" },
                  { value: "50+", label: "States Shipped" },
                  { value: "2yr", label: "Warranty" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-4xl md:text-5xl font-bold text-card">{stat.value}</p>
                    <p className="text-sm text-card/60 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

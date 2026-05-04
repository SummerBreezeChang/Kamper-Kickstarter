"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { WordOpacityHeading } from "@/components/kamper/word-opacity-heading"

const specs = [
  { label: "Dimensions (closed)", value: "15\" x 10\" x 4\"" },
  { label: "Dimensions (open)", value: "30\" x 20\" x 6\"" },
  { label: "Weight", value: "12 lbs" },
  { label: "Burner output", value: "15,000 BTU" },
  { label: "Cooking surface", value: "Bamboo cutting board" },
  { label: "Frame material", value: "Aluminum" },
]

const features = [
  "Integrated wind guard",
  "Built-in prep station",
  "Adjustable flame control",
  "Easy-clean surfaces",
  "Compact storage",
  "No assembly required",
]

export function ProductDetails() {
  return (
    <section id="details" className="py-24 md:py-32 bg-accent/10 text-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.25em] text-foreground/60 uppercase mb-4">
              KAMPER Specs
            </p>
            <WordOpacityHeading
              lines={["Built for", "Travel + Cooking"]}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-tight mb-8 text-foreground"
            />
            
            <p className="text-lg text-foreground/70 mb-10 max-w-md leading-relaxed">
              A compact kitchen platform engineered to travel easily and cook reliably anywhere.
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10">
              {specs.map((spec) => (
                <div key={spec.label} className="border-t border-foreground/20 pt-3">
                  <p className="text-xs text-foreground/60 uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className="font-medium text-foreground">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Features list */}
            <div className="flex flex-wrap gap-2">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1.5 rounded-full bg-accent/20 text-sm text-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right - Image/Video */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c01-nZS5VXgZlsz47GsrPLsjCJupf8jJBe.png"
                alt="KAMPER product detail showing cooking box, prep table with bamboo cutting board, griddle and accessory trays"
                fill
                className="object-cover scale-125"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

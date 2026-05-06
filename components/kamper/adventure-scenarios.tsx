"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const scenarios = [
  {
    id: "campsite",
    title: "Campsite Cooking",
    subtitle: "Morning coffee to evening feasts",
    description: "Set up your full outdoor kitchen at any campsite. From breakfast pancakes to dinner stir-fry, KAMPER handles it all.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4743.JPG-Kj4FPY0hpqPDqNL6RU1EI9C2TJCFvg.jpeg",
    features: ["Quick setup on any surface", "Stable on uneven ground", "Easy cleanup"]
  },
  {
    id: "tailgate",
    title: "Tailgate Ready",
    subtitle: "From trunk to table in minutes",
    description: "Perfect for parking lot cookouts, game days, or impromptu gatherings. Slides right out of your trunk.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.41.24%E2%80%AFAM-Y4diphVEqriTxWw9V2RXsKDplxoBT7.png",
    features: ["Fits any vehicle", "No assembly required", "Compact footprint"]
  },
  {
    id: "overlanding",
    title: "Overlanding",
    subtitle: "Built for the long haul",
    description: "Rugged enough for extended trips. Weather-resistant materials handle whatever conditions you encounter.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.41.39%E2%80%AFAM.png-T20rBqPrF5KmBpPP9947h8EBltMsLD.jpeg",
    features: ["Durable construction", "Secure storage", "Trail-tested"]
  }
]

export function AdventureScenarios() {
  const [activeScenario, setActiveScenario] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section 
      ref={containerRef}
      id="scenarios"
      className="relative py-32 bg-foreground overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <Image
          src={scenarios[activeScenario].image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm tracking-[0.2em] text-primary uppercase mb-4">
            Go Anywhere
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-card mb-6">
            Your Kitchen, Any Adventure
          </h2>
        </motion.div>

        {/* Scenario tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full bg-card/10 p-1">
            {scenarios.map((scenario, index) => (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(index)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeScenario === index
                    ? "bg-primary text-primary-foreground"
                    : "text-card/70 hover:text-card"
                }`}
              >
                {scenario.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <Image
              src={scenarios[activeScenario].image}
              alt={scenarios[activeScenario].title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle border */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-card/10" />
          </motion.div>

          {/* Text content */}
          <motion.div
            key={`text-${activeScenario}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase mb-2">
              {scenarios[activeScenario].subtitle}
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-card mb-4">
              {scenarios[activeScenario].title}
            </h3>
            <p className="text-lg text-card/70 mb-8">
              {scenarios[activeScenario].description}
            </p>
            
            {/* Feature list */}
            <ul className="space-y-3">
              {scenarios[activeScenario].features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 text-card/80"
                >
                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-12 gap-2">
          {scenarios.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveScenario(index)}
              className={`h-2 rounded-full transition-all ${
                activeScenario === index ? "w-8 bg-primary" : "w-2 bg-card/30 hover:bg-card/50"
              }`}
            >
              <span className="sr-only">Scenario {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

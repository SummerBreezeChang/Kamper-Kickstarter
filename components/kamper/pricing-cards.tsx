"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const pricingOptions = [
  {
    id: "buy",
    name: "Buy",
    price: 549,
    period: "one-time",
    description: "Own it forever",
    features: [
      "Full KAMPER system",
      "All accessories included",
      "2-year warranty",
      "Free shipping",
      "Lifetime support"
    ],
    cta: "Buy Now",
    popular: false
  },
  {
    id: "rent-to-own",
    name: "Rent to Own",
    price: 49,
    period: "/month",
    description: "Try before you commit",
    features: [
      "Full KAMPER system",
      "12-month term",
      "Own it after 12 payments",
      "Swap for new model anytime",
      "Free maintenance"
    ],
    cta: "Start Plan",
    popular: true
  },
  {
    id: "rent",
    name: "Rent",
    price: 79,
    period: "/trip",
    description: "Perfect for occasional use",
    features: [
      "Full KAMPER system",
      "Weekend or weekly rates",
      "Cleaned and ready",
      "Free local pickup",
      "Damage protection included"
    ],
    cta: "Reserve",
    popular: false
  }
]

export function PricingCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="pricing" className="py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm tracking-[0.2em] text-primary uppercase mb-4">
            Flexible Options
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Get Your KAMPER
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Buy it outright, rent to own, or just rent for your next adventure. Choose what works for you.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(option.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                option.popular
                  ? "bg-foreground text-card scale-105 shadow-2xl"
                  : "bg-card border border-border hover:border-primary/50 hover:shadow-lg"
              }`}
            >
              {/* Popular badge */}
              {option.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className={`text-lg font-medium mb-2 ${option.popular ? "text-card" : "text-foreground"}`}>
                  {option.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-5xl font-bold ${option.popular ? "text-card" : "text-foreground"}`}>
                    ${option.price}
                  </span>
                  <span className={`text-sm ${option.popular ? "text-card/70" : "text-muted-foreground"}`}>
                    {option.period}
                  </span>
                </div>
                <p className={`mt-2 text-sm ${option.popular ? "text-card/70" : "text-muted-foreground"}`}>
                  {option.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {option.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`h-5 w-5 flex-shrink-0 ${option.popular ? "text-primary" : "text-primary"}`} />
                    <span className={`text-sm ${option.popular ? "text-card/90" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-medium transition-colors ${
                  option.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-foreground text-card hover:bg-foreground/90"
                }`}
              >
                {option.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            30-day money-back guarantee
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Free shipping in the US
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Lifetime customer support
          </div>
        </motion.div>
      </div>
    </section>
  )
}

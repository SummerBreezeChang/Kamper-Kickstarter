"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Sparkles } from "lucide-react"

const pricingOptions = [
  {
    id: "buy",
    name: "Buy",
    price: "$549",
    period: "one-time",
    description: "Own your KAMPER outright and take it on every adventure.",
    features: [
      "Free shipping",
      "2-year warranty",
      "Lifetime support",
      "All accessories included",
      "30-day return policy",
    ],
    cta: "Buy Now",
    popular: false,
  },
  {
    id: "rent-to-own",
    name: "Rent to Own",
    price: "$49",
    period: "/month for 12 months",
    description: "Start using KAMPER today and own it after 12 payments.",
    features: [
      "Free shipping",
      "Full warranty coverage",
      "Cancel anytime",
      "All accessories included",
      "Apply payments to purchase",
    ],
    cta: "Start Renting",
    popular: true,
  },
  {
    id: "rent",
    name: "Rent",
    price: "$79",
    period: "/trip (up to 7 days)",
    description: "Perfect for trying KAMPER or occasional camping trips.",
    features: [
      "Free shipping both ways",
      "Cleaned and inspected",
      "Food package add-on",
      "Damage protection included",
      "Easy online booking",
    ],
    cta: "Rent for Your Trip",
    popular: false,
  },
]

export function PricingSection() {
  const [selectedOption, setSelectedOption] = useState("rent-to-own")
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="pricing" ref={containerRef} className="py-24 px-6 lg:px-12 bg-card">
      <motion.div className="max-w-7xl mx-auto" style={{ opacity }}>
        <div className="text-center mb-16">
          <motion.p 
            className="text-sm font-mono uppercase tracking-widest text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Flexible Options
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Choose how you KAMPER
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Buy it, rent it, or make it yours over time. Whatever works best for your adventure style.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingOptions.map((option, index) => (
            <motion.div
              key={option.id}
              className={cn(
                "relative rounded-xl border p-6 transition-all cursor-pointer",
                selectedOption === option.id
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-background hover:border-primary/50"
              )}
              onClick={() => setSelectedOption(option.id)}
              onMouseEnter={() => setHoveredOption(option.id)}
              onMouseLeave={() => setHoveredOption(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              {option.popular && (
                <motion.div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
                >
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </motion.div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{option.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <motion.span 
                    className="text-4xl font-bold text-foreground"
                    key={option.price}
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: hoveredOption === option.id ? [1, 1.05, 1] : 1 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {option.price}
                  </motion.span>
                  <span className="text-sm text-muted-foreground">{option.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{option.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {option.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={feature} 
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={selectedOption === option.id ? "default" : "outline"}
              >
                {option.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p 
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Have questions? <a href="#" className="text-primary underline-offset-4 hover:underline">Chat with us</a> or call 1-800-KAMPER
        </motion.p>
      </motion.div>
    </section>
  )
}

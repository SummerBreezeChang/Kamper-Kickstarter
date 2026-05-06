"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tent, Waves, Mountain, Users } from "lucide-react"

interface Scenario {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  icon: React.ReactNode
  features: string[]
}

const defaultScenarios: Scenario[] = [
  {
    id: "campsite",
    title: "Campsite",
    subtitle: "Weekend Warriors",
    description: "Transform your campsite into a gourmet kitchen. From morning coffee to evening feasts, KAMPER handles it all.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/three%20imagies-3-PZ6qQuWNaXqKyWMz2Rd5sjZGmVj6Qx.jpg",
    icon: <Tent className="w-5 h-5" />,
    features: ["Quick setup between activities", "Stable on uneven ground", "Weather-resistant design"],
  },
  {
    id: "beach",
    title: "Beach",
    subtitle: "Coastal Adventures",
    description: "Sand-proof, salt-resistant, and ready for beachside cooking. Fresh catch to plate in minutes.",
    image: "/placeholder.svg?height=800&width=1200",
    icon: <Waves className="w-5 h-5" />,
    features: ["Corrosion-resistant materials", "Easy clean-up", "Wind-stable burner"],
  },
  {
    id: "overlanding",
    title: "Overlanding",
    subtitle: "Remote Exploration",
    description: "When you're miles from anywhere, KAMPER is your reliable kitchen. Compact enough for any rig.",
    image: "/placeholder.svg?height=800&width=1200",
    icon: <Mountain className="w-5 h-5" />,
    features: ["Fits any vehicle setup", "Multi-fuel compatible", "Rugged construction"],
  },
  {
    id: "gatherings",
    title: "Gatherings",
    subtitle: "Group Adventures",
    description: "Feed the whole crew without the hassle. Designed for efficiency when cooking for groups.",
    image: "/placeholder.svg?height=800&width=1200",
    icon: <Users className="w-5 h-5" />,
    features: ["Large cooking surface", "Ample prep space", "Easy to share duties"],
  },
]

interface ScenariosSectionProps {
  scenarios?: Scenario[]
}

export function ScenariosSection({ scenarios = defaultScenarios }: ScenariosSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeScenario, setActiveScenario] = useState(scenarios[0])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef}
      id="scenarios"
      className="relative py-24 bg-card overflow-hidden"
    >
      <motion.div 
        className="max-w-7xl mx-auto px-6 lg:px-12"
        style={{ opacity }}
      >
        <div className="text-center mb-16">
          <motion.p 
            className="text-sm font-mono uppercase tracking-widest text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Use Cases
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Built for every adventure
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Scenario Tabs */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {scenarios.map((scenario, index) => (
              <motion.button
                key={scenario.id}
                onClick={() => setActiveScenario(scenario)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-4 p-4 lg:p-6 rounded-xl border text-left transition-all duration-300",
                  activeScenario.id === scenario.id
                    ? "bg-primary/10 border-primary"
                    : "bg-background border-border hover:border-primary/50"
                )}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                  activeScenario.id === scenario.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}>
                  {scenario.icon}
                </div>
                <div className="hidden lg:block">
                  <h3 className="font-semibold text-foreground">{scenario.title}</h3>
                  <p className="text-sm text-muted-foreground">{scenario.subtitle}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Active Scenario Display */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Image */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                  <img
                    src={activeScenario.image}
                    alt={activeScenario.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs font-mono uppercase tracking-widest text-primary-foreground/80 mb-2">
                      {activeScenario.subtitle}
                    </p>
                    <h3 className="text-2xl font-bold text-primary-foreground">
                      {activeScenario.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {activeScenario.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3">
                  {activeScenario.features.map((feature, index) => (
                    <motion.span
                      key={feature}
                      className="px-4 py-2 rounded-full bg-muted text-sm text-foreground"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

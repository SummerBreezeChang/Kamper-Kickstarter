"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Car, Tent, Mountain, Users } from "lucide-react"

const useCases = [
  {
    id: "car-camping",
    icon: Car,
    title: "Car Camping",
    description: "Perfect for campground setups. Pull up, pop open KAMPER, and start cooking real meals within minutes.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/three%20imagies-3-PZ6qQuWNaXqKyWMz2Rd5sjZGmVj6Qx.jpg",
  },
  {
    id: "weekend-trips",
    icon: Tent,
    title: "Weekend Getaways",
    description: "Two days, zero hassle. Everything you need is already packed and ready to go.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.24.00%E2%80%AFAM.png-VgPoLUEM3Xz7H0OoQn8cnkidjIiamo.jpeg",
  },
  {
    id: "overlanding",
    icon: Mountain,
    title: "Overlanding",
    description: "Durable construction handles the roughest roads. Compact design maximizes your cargo space.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.22.23%E2%80%AFAM.png-fQZX8jmP2v38FRRyTzv70EzZB67ow3.jpeg",
  },
  {
    id: "group-trips",
    icon: Users,
    title: "Group Adventures",
    description: "Feed the whole crew with generous cooking capacity. The elevated prep surface makes meal prep a social experience.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.23.32%E2%80%AFAM.png-WkGMcuXnPdM9WxRWD5oHHkfBiOf8dB.jpeg",
  },
]

export function UseCasesSection() {
  const [activeCase, setActiveCase] = useState(useCases[0])

  return (
    <section id="use-cases" className="py-24 px-6 lg:px-12 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4">Made For Adventure</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Built for how you camp
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {useCases.map((useCase) => (
            <button
              key={useCase.id}
              onClick={() => setActiveCase(useCase)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all",
                activeCase.id === useCase.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <useCase.icon className="w-4 h-4" />
              {useCase.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">{activeCase.title}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{activeCase.description}</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Setup in under 60 seconds
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                No extra gear required
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Easy cleanup and pack-down
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src={activeCase.image}
                alt={activeCase.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

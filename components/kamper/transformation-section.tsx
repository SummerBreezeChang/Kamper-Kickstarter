"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const transformationSteps = [
  {
    id: 1,
    title: "Compact & Portable",
    description: "A single, self-contained unit with a comfortable carry handle. Fits in any trunk.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.21.38%E2%80%AFAM-3ue4ri0IpkyiWGWBningQceBquq8eq.png",
  },
  {
    id: 2,
    title: "Deploy the Prep Table",
    description: "Slide out the cutting board and extend the integrated legs for a stable prep surface.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.23.53%E2%80%AFAM.png-9VGSzBL0yx3RZaknqwEoYveVYh3bhb.jpeg",
  },
  {
    id: 3,
    title: "Access the Cooktop",
    description: "Open the latch to reveal the cast-iron skillet and multi-fuel burner system.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.23.45%E2%80%AFAM.png-czJQLY6nCNt0kTBA6DO7anC7WFEixQ.jpeg",
  },
  {
    id: 4,
    title: "Full Kitchen Station",
    description: "A complete prep-and-cook setup at comfortable counter height. Everything you need, nothing you don't.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.23.22%E2%80%AFAM.png-Segbz3vFYPCtMd1sqv5VBySdRa3bqk.jpeg",
  },
]

export function TransformationSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="py-24 px-6 lg:px-12 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4">The Transformation</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            From box to kitchen in seconds
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Display */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            {transformationSteps.map((step, index) => (
              <img
                key={step.id}
                src={step.image}
                alt={step.title}
                className={cn(
                  "absolute inset-0 w-full h-full object-contain transition-opacity duration-500",
                  activeStep === index ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {transformationSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "w-full text-left p-6 rounded-lg border transition-all duration-300",
                  activeStep === index
                    ? "bg-primary/10 border-primary"
                    : "bg-card border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      activeStep === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step.id}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

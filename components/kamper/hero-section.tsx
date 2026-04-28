"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="text-2xl font-bold tracking-wider text-foreground">KAMPER</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#use-cases" className="hover:text-foreground transition-colors">Use Cases</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
        <Button variant="outline" size="sm">Get Started</Button>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 grid lg:grid-cols-2 gap-8 px-6 lg:px-12 py-12 lg:py-0 items-center">
        <div className="space-y-6 max-w-xl">
          <p className="text-sm font-mono uppercase tracking-widest text-primary">Outdoor Cooking System</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance text-foreground">
            Cook outdoors like you cook at home.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The compact, all-in-one camp kitchen that transforms from a portable box into a full prep-and-cook station. Buy, rent, or rent-to-own.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="text-base px-8">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8">
              Rent for Your Trip
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Free Shipping
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              2-Year Warranty
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.21.16%E2%80%AFAM.png-i82FlCni1LPpV0mJdzEWYOtFIzfKxv.jpeg"
            alt="KAMPER outdoor cooking system in compact mode"
            className="w-full max-w-lg mx-auto"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs font-mono uppercase tracking-widest">Scroll to explore</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}

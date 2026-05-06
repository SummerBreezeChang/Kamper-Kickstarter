"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Play } from "lucide-react"

export function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50])
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])
  const imageY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section ref={containerRef} className="relative min-h-[120vh]">
      <motion.div 
        className="sticky top-0 min-h-screen flex flex-col"
        style={{ opacity: heroOpacity }}
      >
        {/* Navigation */}
        <motion.nav 
          className="flex items-center justify-between px-6 py-4 lg:px-12 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-2xl font-bold tracking-wider text-foreground">KAMPER</div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#transformation" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#scenarios" className="hover:text-foreground transition-colors">Use Cases</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <Button variant="outline" size="sm">Get Started</Button>
        </motion.nav>

        {/* Hero Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 px-6 lg:px-12 py-12 lg:py-0 items-center">
          <motion.div 
            className="space-y-6 max-w-xl z-10"
            style={{ y: heroY, scale: heroScale }}
          >
            <motion.p 
              className="text-sm font-mono uppercase tracking-widest text-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Outdoor Cooking System
            </motion.p>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Cook outdoors like you cook at home.
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              The compact, all-in-one camp kitchen that transforms from a portable box into a full prep-and-cook station. Buy, rent, or rent-to-own.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button size="lg" className="text-base px-8">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 gap-2">
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </motion.div>
            <motion.div 
              className="flex items-center gap-6 pt-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                2-Year Warranty
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                30-Day Returns
              </div>
            </motion.div>
          </motion.div>

          {/* Product Image with Parallax */}
          <motion.div 
            className="relative"
            style={{ scale: imageScale, y: imageY }}
          >
            <motion.img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.21.16%E2%80%AFAM.png-i82FlCni1LPpV0mJdzEWYOtFIzfKxv.jpeg"
              alt="KAMPER outdoor cooking system in compact mode"
              className="w-full max-w-lg mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            {/* Decorative elements */}
            <motion.div
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gradient-to-br from-primary/5 to-secondary/10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

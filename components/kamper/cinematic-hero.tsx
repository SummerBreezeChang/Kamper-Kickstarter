"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Zoom out effect - starts zoomed in, zooms out as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.3, 1])
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  
  // Text animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-20%"])
  
  // Overlay fade
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0])

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background image with zoom effect */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale, y: imageY }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4743.JPG-Kj4FPY0hpqPDqNL6RU1EI9C2TJCFvg.jpeg"
            alt="KAMPER outdoor cooking system in use at campsite"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        
        {/* Dark overlay */}
        <motion.div 
          className="absolute inset-0 bg-foreground"
          style={{ opacity: overlayOpacity }}
        />
        
        {/* Hero content */}
        <motion.div 
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 font-mono text-sm tracking-[0.3em] text-card uppercase"
          >
            Introducing
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-6xl font-bold tracking-tight text-card md:text-8xl lg:text-9xl"
          >
            KAMPER
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8 max-w-xl text-lg text-card/90 md:text-xl"
          >
            The compact outdoor cooking system that transforms from portable box to full kitchen in seconds
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <button className="rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105">
              Shop Now
            </button>
            <button className="rounded-full border-2 border-card px-8 py-4 font-medium text-card transition-all hover:bg-card hover:text-foreground">
              Learn More
            </button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ opacity: textOpacity }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono text-card/70 tracking-wider uppercase">Scroll to explore</span>
            <svg 
              className="h-6 w-6 text-card/70" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

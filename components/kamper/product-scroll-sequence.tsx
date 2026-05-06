"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import Image from "next/image"

// Product transformation images - from closed to fully open
const transformationFrames = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.21.16%E2%80%AFAM.png-i82FlCni1LPpV0mJdzEWYOtFIzfKxv.jpeg",
    label: "Compact Mode",
    description: "Everything packs into a single portable box"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.23.53%E2%80%AFAM.png-9VGSzBL0yx3RZaknqwEoYveVYh3bhb.jpeg",
    label: "Deploy Legs",
    description: "Fold-out aluminum legs provide stable support"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.41.24%E2%80%AFAM-Y4diphVEqriTxWw9V2RXsKDplxoBT7.png",
    label: "Extend Prep Station",
    description: "Side table expands for food prep workspace"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.41.39%E2%80%AFAM.png-T20rBqPrF5KmBpPP9947h8EBltMsLD.jpeg",
    label: "Ready to Cook",
    description: "Full kitchen setup with burner and prep area"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/layout.png-rWXol50Olre9nm6m6mEnJBO3qvSMa2.jpeg",
    label: "Complete Setup",
    description: "All accessories laid out and ready"
  }
]

export function ProductScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Map scroll progress to frame index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      Math.floor(latest * transformationFrames.length),
      transformationFrames.length - 1
    )
    setCurrentFrame(frameIndex)
  })

  // Progress bar segments
  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  )

  return (
    <section 
      ref={containerRef}
      id="transformation"
      className="relative bg-muted"
      style={{ height: `${transformationFrames.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col">
        {/* Header */}
        <div className="pt-24 pb-8 px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-sm tracking-[0.2em] text-muted-foreground uppercase mb-2"
          >
            Setup in Seconds
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-foreground"
          >
            Watch the Transformation
          </motion.h2>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center px-6 pb-8">
          <div className="relative w-full max-w-5xl">
            {/* Product images */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-background shadow-2xl">
              {transformationFrames.map((frame, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: currentFrame === index ? 1 : 0,
                    scale: currentFrame === index ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src={frame.src}
                    alt={frame.label}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority={index === 0}
                  />
                </motion.div>
              ))}
            </div>

            {/* Step indicators */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {transformationFrames.map((frame, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const progress = index / (transformationFrames.length - 1)
                    if (containerRef.current) {
                      const containerRect = containerRef.current.getBoundingClientRect()
                      const scrollDistance = containerRect.height - window.innerHeight
                      const targetScroll = containerRef.current.offsetTop + (scrollDistance * progress)
                      window.scrollTo({ top: targetScroll, behavior: "smooth" })
                    }
                  }}
                  className={`relative h-2 rounded-full transition-all ${
                    currentFrame === index 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                >
                  <span className="sr-only">Step {index + 1}: {frame.label}</span>
                </button>
              ))}
            </div>

            {/* Current step label */}
            <motion.div
              key={currentFrame}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className="text-lg font-semibold text-foreground">
                {transformationFrames[currentFrame].label}
              </p>
              <p className="text-muted-foreground">
                {transformationFrames[currentFrame].description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Progress bar at bottom */}
        <div className="pb-8 px-6">
          <div className="mx-auto max-w-xl">
            <div className="h-1 w-full rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: progressWidth }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs font-mono text-muted-foreground">
              <span>Packed</span>
              <span>Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

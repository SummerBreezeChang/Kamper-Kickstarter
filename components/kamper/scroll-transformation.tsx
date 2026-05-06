"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface TransformationFrame {
  id: number
  title: string
  description: string
  image: string
}

const defaultFrames: TransformationFrame[] = [
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
    description: "A complete prep-and-cook setup at comfortable counter height.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-15%20at%208.23.22%E2%80%AFAM.png-Segbz3vFYPCtMd1sqv5VBySdRa3bqk.jpeg",
  },
]

interface ScrollTransformationProps {
  frames?: TransformationFrame[]
}

export function ScrollTransformation({ frames = defaultFrames }: ScrollTransformationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Update current frame based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const frameIndex = Math.min(
        Math.floor(value * frames.length),
        frames.length - 1
      )
      setCurrentFrame(frameIndex)
    })
    return () => unsubscribe()
  }, [scrollYProgress, frames.length])

  // Calculate opacity for each frame
  const getFrameOpacity = (index: number, progress: number) => {
    const frameSize = 1 / frames.length
    const frameStart = index * frameSize
    const frameEnd = (index + 1) * frameSize
    const frameMid = frameStart + frameSize / 2
    
    if (progress < frameStart || progress > frameEnd) return 0
    if (progress < frameMid) {
      return (progress - frameStart) / (frameMid - frameStart)
    }
    return 1 - (progress - frameMid) / (frameEnd - frameMid)
  }

  return (
    <section ref={containerRef} className="relative" style={{ height: `${frames.length * 100}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Stack */}
            <div className="relative aspect-square max-w-xl mx-auto w-full">
              {frames.map((frame, index) => (
                <motion.div
                  key={frame.id}
                  className="absolute inset-0"
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [
                        index / frames.length,
                        (index + 0.5) / frames.length,
                        (index + 1) / frames.length,
                      ],
                      index === frames.length - 1 
                        ? [0, 1, 1] 
                        : [0, 1, 0]
                    ),
                    scale: useTransform(
                      scrollYProgress,
                      [
                        index / frames.length,
                        (index + 0.5) / frames.length,
                      ],
                      [0.95, 1]
                    ),
                  }}
                >
                  <img
                    src={frame.image}
                    alt={frame.title}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              ))}
            </div>

            {/* Text Content */}
            <div className="relative h-64 lg:h-80">
              {frames.map((frame, index) => (
                <motion.div
                  key={frame.id}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [
                        index / frames.length,
                        (index + 0.3) / frames.length,
                        (index + 0.7) / frames.length,
                        (index + 1) / frames.length,
                      ],
                      index === frames.length - 1
                        ? [0, 1, 1, 1]
                        : [0, 1, 1, 0]
                    ),
                    y: useTransform(
                      scrollYProgress,
                      [
                        index / frames.length,
                        (index + 0.3) / frames.length,
                      ],
                      [30, 0]
                    ),
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      {frame.id}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-primary">
                      Step {frame.id} of {frames.length}
                    </span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {frame.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    {frame.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {frames.map((_, index) => (
              <motion.div
                key={index}
                className="h-1.5 rounded-full bg-border overflow-hidden"
                style={{ width: currentFrame === index ? 32 : 12 }}
              >
                <motion.div
                  className="h-full bg-primary"
                  style={{
                    width: useTransform(
                      scrollYProgress,
                      [
                        index / frames.length,
                        (index + 1) / frames.length,
                      ],
                      ["0%", "100%"]
                    ),
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

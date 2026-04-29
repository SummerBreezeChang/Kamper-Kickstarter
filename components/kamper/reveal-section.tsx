"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

// Product transformation frames - from closed to fully expanded
const PRODUCT_FRAMES = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a01-EqQSnPBpFWfbKJe7RyIpPOeJmQEWE9.png",
    title: "COMPACT",
    caption: "Starts closed",
    description: "Everything packs into one portable, protected box.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a02-9edDRvsMnc8FCBW383oTQdwMGAu1g2.png",
    title: "UNFOLD",
    caption: "Extend workspace",
    description: "Side table deploys for instant prep space.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a03-WePMclDJCF9VG7etybKarrmzeBPuRv.png",
    title: "EXPAND",
    caption: "Flip the board",
    description: "Bamboo cutting surface reveals for food prep.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a04-eWZiOuBKogla2GVbbZoeUwyrvHymtB.png",
    title: "READY",
    caption: "Prep station active",
    description: "Full workspace with cutting board and storage.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a06-uqh6RWAZJBM9unHUbGpnU5InafPTex.png",
    title: "COOK",
    caption: "Full kitchen",
    description: "Burners, prep, storage — everything you need.",
  },
]

const SHARED_BACKGROUND = "/landing-background.png"

export function RevealSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Map scroll to frame index (0 to 4)
  const frameIndex = useTransform(scrollYProgress, [0.05, 0.95], [0, PRODUCT_FRAMES.length - 1])
  
  // Product scale and position animations
  const productScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.9])
  const productY = useTransform(scrollYProgress, [0, 0.5, 1], ["5%", "0%", "-5%"])
  const productRotate = useTransform(scrollYProgress, [0, 1], [0, 3])
  
  // Text animations
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0])
  const descOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef} 
      id="reveal" 
      className="relative h-[500vh] bg-transparent text-charcoal-foreground"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image src={SHARED_BACKGROUND} alt="" fill className="object-cover object-center opacity-52 saturate-[0.8]" />
          <div className="absolute inset-0 bg-[#2f4f3e]/55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(170,210,160,0.18),transparent_30%),radial-gradient(circle_at_25%_75%,rgba(0,0,0,0.26),transparent_35%)]" />
        </div>

        {/* Large background title */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-end pb-12 md:pb-20 px-6 md:px-12">
          {PRODUCT_FRAMES.map((frame, index) => (
            <motion.h2
              key={frame.title}
              className="absolute text-[20vw] md:text-[16vw] lg:text-[14vw] font-serif font-bold text-charcoal-foreground/15 uppercase tracking-tight leading-none"
              style={{
                opacity: useTransform(
                  frameIndex,
                  [index - 0.5, index, index + 0.5],
                  [0, 1, 0]
                ),
              }}
            >
              {frame.title}
            </motion.h2>
          ))}
        </div>

        {/* Product images - scroll-driven crossfade */}
        <motion.div
          className="relative z-20 w-[85vw] md:w-[70vw] lg:w-[55vw] aspect-square flex items-center justify-center"
          style={{
            scale: productScale,
            y: productY,
            rotate: productRotate,
          }}
        >
          {PRODUCT_FRAMES.map((frame, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: useTransform(
                  frameIndex,
                  [index - 0.5, index, index + 0.5],
                  [0, 1, 0]
                ),
              }}
            >
              <Image
                src={frame.src}
                alt={frame.caption}
                width={1400}
                height={1400}
                className="object-contain drop-shadow-2xl"
                priority={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Caption and description */}
        <motion.div
          className="absolute z-30 bottom-24 md:bottom-32 left-6 md:left-12 right-6 md:right-12"
          style={{ opacity: descOpacity }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Left side - caption */}
            <div className="max-w-md">
              {PRODUCT_FRAMES.map((frame, index) => (
                <motion.div
                  key={frame.caption}
                  className="absolute"
                  style={{
                    opacity: useTransform(
                      frameIndex,
                      [index - 0.4, index, index + 0.4],
                      [0, 1, 0]
                    ),
                  }}
                >
                  <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-charcoal-foreground/80 mb-2">
                    {frame.caption}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-serif text-charcoal-foreground leading-snug">
                    {frame.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right side - step indicators */}
            <div className="flex items-center gap-2">
              {PRODUCT_FRAMES.map((_, index) => (
                <motion.div
                  key={index}
                  className="h-1.5 rounded-full bg-charcoal-foreground/30 overflow-hidden"
                  style={{ width: index === 0 ? 32 : 12 }}
                >
                  <motion.div
                    className="h-full bg-charcoal-foreground rounded-full"
                    style={{
                      width: useTransform(
                        frameIndex,
                        [index - 0.5, index, index + 0.5],
                        ["0%", "100%", "100%"]
                      ),
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll progress indicator */}
        <motion.div
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30"
          style={{ opacity: titleOpacity }}
        >
          <div className="flex flex-col items-center gap-3">
            <motion.div
              className="w-0.5 h-24 bg-charcoal-foreground/20 rounded-full overflow-hidden"
            >
              <motion.div
                className="w-full bg-charcoal-foreground rounded-full"
                style={{
                  height: useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]),
                }}
              />
            </motion.div>
            <span className="text-[10px] uppercase tracking-widest text-charcoal-foreground/60 writing-mode-vertical rotate-180"
              style={{ writingMode: "vertical-rl" }}
            >
              Scroll
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

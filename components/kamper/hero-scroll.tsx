"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const KICKSTARTER_URL = "https://www.kickstarter.com"

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

const leftNav = [
  { label: "Specs", href: "#details" },
  { label: "Use Cases", href: "#lifestyle" },
]
const rightNav = [
  { label: "One-Pot Meals", href: "#one-pot-meals" },
  { label: "Get Updates", href: "#subscribe" },
]

export function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [isNavHidden, setIsNavHidden] = useState(false)
  const lastScrollY = useRef(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Nav styling
  const navOpacity = useTransform(scrollY, [0, 220], [0.08, 0.52])
  const navBorderOpacity = useTransform(scrollY, [0, 160], [0.35, 0.95])
  const navBackground = useMotionTemplate`rgba(47, 79, 62, ${navOpacity})`
  const navBorder = useMotionTemplate`rgba(244, 248, 236, ${navBorderOpacity})`

  // Hero text animations - fade out as we scroll
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroTextY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-10%"])
  
  // Map scroll to frame index (0 to 4)
  const frameIndex = useTransform(scrollYProgress, [0.1, 0.9], [0, PRODUCT_FRAMES.length - 1])
  
  // Product animations
  const productScale = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.9], [0.65, 0.9, 1, 0.95])
  const productY = useTransform(scrollYProgress, [0, 0.15, 0.9], ["15%", "0%", "-5%"])
  
  // Caption animations
  const captionOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.85, 0.95], [0, 1, 1, 0])
  
  // Background title animations
  const bgTitleOpacity = useTransform(scrollYProgress, [0.12, 0.2, 0.85, 0.92], [0, 0.12, 0.12, 0])

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (currentY) => {
      const delta = currentY - lastScrollY.current

      if (currentY < 24) {
        setIsNavHidden(false)
      } else if (delta > 3) {
        setIsNavHidden(true)
      } else if (delta < -3) {
        setIsNavHidden(false)
      }

      lastScrollY.current = currentY
    })

    return () => unsubscribe()
  }, [scrollY])

  return (
    <section 
      ref={containerRef}
      id="hero"
      className="relative h-[600vh] bg-[#f5f5f0] text-charcoal"
    >
      {/* Fixed sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Navigation */}
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50"
          animate={{ y: isNavHidden ? -96 : 0, opacity: isNavHidden ? 0 : 1 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          style={{
            backgroundColor: navBackground,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <div className="px-5 md:px-8 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {leftNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 md:px-5 py-2 rounded-full bg-[#2f4f3e] text-[#f4f8ec] text-xs md:text-sm font-semibold uppercase tracking-wide hover:bg-[#3d6350] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link href="#hero" className="text-base md:text-lg font-serif font-semibold tracking-wide text-[#2f4f3e] uppercase">
              Kamper
            </Link>

            <div className="flex items-center gap-2">
              {rightNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 md:px-5 py-2 rounded-full bg-[#2f4f3e] text-[#f4f8ec] text-xs md:text-sm font-semibold uppercase tracking-wide hover:bg-[#3d6350] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <motion.div className="border-b-2 border-dotted" style={{ borderColor: navBorder }} />
        </motion.nav>

        {/* Hero text - fades out on scroll */}
        <motion.div 
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ opacity: heroTextOpacity, y: heroTextY }}
        >
          <p className="text-xs md:text-sm tracking-[0.12em] text-[#2f4f3e]/70 uppercase mb-2">
            Compact Outdoor Cooking System
          </p>
          <div className="text-center uppercase leading-none">
            <h1 className="text-[80px] md:text-[140px] lg:text-[200px] font-serif font-bold tracking-tight text-[#2f4f3e] leading-[0.9]">
              One Box
            </h1>
            <div className="mt-2 mb-2 border-b-2 border-dotted border-[#2f4f3e]/40 w-[80vw] mx-auto" />
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-[#2f4f3e]/80">
              Full Kitchen
            </p>
          </div>
        </motion.div>

        {/* Large background title - shows during scroll sequence */}
        <div className="absolute inset-0 z-5 pointer-events-none flex items-end pb-16 md:pb-24 px-6 md:px-12">
          {PRODUCT_FRAMES.map((frame, index) => (
            <motion.h2
              key={frame.title}
              className="absolute text-[22vw] md:text-[18vw] lg:text-[15vw] font-serif font-bold text-[#2f4f3e] uppercase tracking-tight leading-none"
              style={{
                opacity: useTransform(
                  frameIndex,
                  [index - 0.5, index, index + 0.5],
                  [0, 0.1, 0]
                ),
              }}
            >
              {frame.title}
            </motion.h2>
          ))}
        </div>

        {/* Product images - continuous scroll-driven crossfade */}
        <motion.div
          className="relative z-20 w-[80vw] md:w-[65vw] lg:w-[50vw] aspect-square flex items-center justify-center"
          style={{
            scale: productScale,
            y: productY,
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
                className="object-contain"
                style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))" }}
                priority={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Caption and description - appears after hero text fades */}
        <motion.div
          className="absolute z-30 bottom-16 md:bottom-24 left-6 md:left-12 right-6 md:right-12"
          style={{ opacity: captionOpacity }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Left side - caption */}
            <div className="relative h-20">
              {PRODUCT_FRAMES.map((frame, index) => (
                <motion.div
                  key={frame.caption}
                  className="absolute left-0 bottom-0"
                  style={{
                    opacity: useTransform(
                      frameIndex,
                      [index - 0.4, index, index + 0.4],
                      [0, 1, 0]
                    ),
                  }}
                >
                  <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#2f4f3e]/60 mb-2">
                    {frame.caption}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-serif text-[#2f4f3e] leading-snug max-w-md">
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
                  className="h-1.5 rounded-full bg-[#2f4f3e]/20 overflow-hidden"
                  style={{ width: 24 }}
                >
                  <motion.div
                    className="h-full bg-[#2f4f3e] rounded-full"
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

        {/* CTA button - visible at start */}
        <motion.div
          className="absolute z-30 bottom-16 md:bottom-24 left-6 md:left-12"
          style={{ opacity: heroTextOpacity }}
        >
          <Link
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2f4f3e] text-[#f4f8ec] text-sm font-semibold uppercase tracking-wide hover:bg-[#3d6350] transition-colors"
          >
            Back on Kickstarter
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Scroll indicator - only at start */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
          style={{ opacity: heroTextOpacity }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-[#2f4f3e]/40 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-[#2f4f3e]/60" />
          </motion.div>
        </motion.div>

        {/* Scroll progress indicator - during sequence */}
        <motion.div
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30"
          style={{ opacity: captionOpacity }}
        >
          <div className="flex flex-col items-center gap-3">
            <motion.div className="w-0.5 h-24 bg-[#2f4f3e]/15 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-[#2f4f3e] rounded-full"
                style={{
                  height: useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]),
                }}
              />
            </motion.div>
            <span 
              className="text-[10px] uppercase tracking-widest text-[#2f4f3e]/50 rotate-180"
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

"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const KICKSTARTER_URL = "https://www.kickstarter.com"
const HERO_HEADING_COLOR = "#F4F4CC"
const HERO_SEQUENCE_FRAMES = ["/luma/a01.png", "/luma/a02.png", "/luma/a03.png", "/luma/a04.png", "/luma/a05.png"]
const HERO_FRAME_POSITIONS = ["53% center", "51% center", "50% center", "50% center", "50% center"]

const leftNav = [
  { label: "Specs", href: "#details" },
  { label: "Use Cases", href: "#lifestyle" },
]
const rightNav = [
  { label: "One-Pot Meals", href: "#one-pot-meals" },
  { label: "Get Updates", href: "#subscribe" },
]

// Crossfade ranges driven by scrollYProgress (0 → 1) within the hero section.
// 5 frames evenly distributed across the scroll progress with overlap for smoothness.
function getFrameOpacityRange(index: number, total: number): { input: number[]; output: number[] } {
  const segment = 1 / total
  const center = (index + 0.5) * segment
  const fade = segment * 0.5

  if (index === 0) {
    return {
      input: [0, segment * 0.55, segment, segment + fade * 0.6],
      output: [1, 1, 1, 0],
    }
  }
  if (index === total - 1) {
    return {
      input: [center - fade, center - fade * 0.4, 1],
      output: [0, 1, 1],
    }
  }
  return {
    input: [center - fade, center - fade * 0.4, center + fade * 0.4, center + fade],
    output: [0, 1, 1, 0],
  }
}

function HeroFrame({
  src,
  index,
  total,
  scrollProgress,
  position,
}: {
  src: string
  index: number
  total: number
  scrollProgress: MotionValue<number>
  position: string
}) {
  const { input, output } = getFrameOpacityRange(index, total)
  const opacity = useTransform(scrollProgress, input, output)
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <Image
        src={src}
        alt={`Kamper hero sequence frame ${index + 1}`}
        fill
        priority={index === 0}
        className="object-contain scale-[2.6] md:scale-[2.8]"
        style={{ objectPosition: position }}
      />
    </motion.div>
  )
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  })
  const [isNavHidden, setIsNavHidden] = useState(false)
  const lastScrollY = useRef(0)
  const navOpacity = useTransform(scrollY, [0, 220], [0.08, 0.52])
  const navBorderOpacity = useTransform(scrollY, [0, 160], [0.35, 0.95])
  const navBackground = useMotionTemplate`rgba(47, 79, 62, ${navOpacity})`
  const navBorder = useMotionTemplate`rgba(244, 248, 236, ${navBorderOpacity})`

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
      ref={heroRef}
      id="hero"
      className="relative h-[220vh] bg-transparent text-charcoal-foreground"
    >
      {/* Navigation - fixed to viewport */}
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
                className="px-4 md:px-5 py-2 rounded-full bg-secondary text-secondary-foreground text-xs md:text-sm font-semibold uppercase tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="#hero"
            className="text-base md:text-lg font-serif font-semibold tracking-wide text-charcoal-foreground uppercase"
          >
            Kamper
          </Link>

          <div className="flex items-center gap-2">
            {rightNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 md:px-5 py-2 rounded-full bg-secondary text-secondary-foreground text-xs md:text-sm font-semibold uppercase tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <motion.div className="border-b-2 border-dotted" style={{ borderColor: navBorder }} />
      </motion.nav>

      {/* Sticky pinned content - keeps product visible in lower portion of viewport during scroll */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Heading - top portion of viewport */}
        <div className="relative z-10 px-6 pt-20 md:pt-24 pb-2 text-center shrink-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm tracking-[0.12em] text-charcoal-foreground/85 uppercase mb-1"
          >
            Compact Outdoor Cooking System
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center uppercase leading-none"
          >
            <h1
              className="w-screen relative left-1/2 -translate-x-1/2 whitespace-nowrap text-[80px] md:text-[140px] lg:text-[200px] font-serif font-bold tracking-tight leading-[0.9]"
              style={{ color: HERO_HEADING_COLOR }}
            >
              <motion.span
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.28 }}
                className="inline-block mr-[0.22em]"
              >
                One
              </motion.span>
              <motion.span
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.54 }}
                className="inline-block"
              >
                Box
              </motion.span>
            </h1>
            <div className="w-screen relative left-1/2 -translate-x-1/2 mt-2 mb-2 border-b-2 border-dotted border-charcoal-foreground/65" />
            <p
              className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold tracking-tight"
              style={{ color: HERO_HEADING_COLOR }}
            >
              Full Kitchen
            </p>
          </motion.div>
        </div>

        {/* Product image - takes remaining viewport space, stays visible during scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative z-10 flex-1 w-full px-6 md:px-12 pb-24 flex items-center justify-center"
        >
          <div className="relative mx-auto w-[94vw] md:w-[86vw] lg:w-[78vw] xl:w-[72vw] h-full max-h-[60vh]">
            {HERO_SEQUENCE_FRAMES.map((src, index) => (
              <HeroFrame
                key={src}
                src={src}
                index={index}
                total={HERO_SEQUENCE_FRAMES.length}
                scrollProgress={scrollYProgress}
                position={HERO_FRAME_POSITIONS[index] ?? "50% center"}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom left CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="absolute z-20 bottom-8 left-6 md:left-10 max-w-xs"
        >
          <p className="mb-3 text-xs md:text-sm uppercase tracking-wide text-charcoal-foreground/85">
            One box outdoor kitchen built for travel-ready meals
          </p>
          <Link
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors"
          >
            Back on Kickstarter
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

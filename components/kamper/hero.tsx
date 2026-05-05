"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const KICKSTARTER_URL = "https://www.kickstarter.com"
const HERO_HEADING_COLOR = "#F4F4CC"
const HERO_SEQUENCE_FRAMES = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a01-PusVFJuPGEpBL9c1Fz6CQ7FHKsrc3I.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a02-LP6aL5042HP2uXecCrkFxjCbp63ham.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a03-1CVulEP54k8Xo165zT3TaCRmKiA0TS.png",
  "/luma/a05.png",
]
const HERO_FRAME_POSITIONS = ["53% center", "51% center", "50% center", "50% center"]
const SCROLL_SEGMENT_PX = 392
const HOLD_RATIO = 0.72
// Vertical lift applied from frame 2 onward so the product centers in the viewport
// instead of staying anchored at the bottom of the hero section.
const CENTER_LIFT_PX = 260
const leftNav = [
  { label: "Specs", href: "#details" },
  { label: "Use Cases", href: "#lifestyle" },
]
const rightNav = [
  { label: "One-Pot Meals", href: "#one-pot-meals" },
  { label: "Get Updates", href: "#subscribe" },
]

export function Hero() {
  const { scrollY } = useScroll()
  const [isNavHidden, setIsNavHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const mobileNav = [...leftNav, ...rightNav]
  const navOpacity = useTransform(scrollY, [0, 220], [0.08, 0.52])
  const navBorderOpacity = useTransform(scrollY, [0, 160], [0.35, 0.95])
  const navBackground = useMotionTemplate`rgba(47, 79, 62, ${navOpacity})`
  const navBorder = useMotionTemplate`rgba(244, 248, 236, ${navBorderOpacity})`
  const scrollPixels = useTransform(scrollY, [0, SCROLL_SEGMENT_PX * 3], [0, SCROLL_SEGMENT_PX * 3])
  // imageY tracks scroll 1:1 so the product stays in viewport, but is lifted by
  // CENTER_LIFT_PX once we transition into frame 2 to vertically center it.
  const imageY = useTransform(
    scrollPixels,
    [0, SCROLL_SEGMENT_PX, SCROLL_SEGMENT_PX * 2, SCROLL_SEGMENT_PX * 3],
    [
      0,
      SCROLL_SEGMENT_PX - CENTER_LIFT_PX,
      SCROLL_SEGMENT_PX * 2 - CENTER_LIFT_PX,
      SCROLL_SEGMENT_PX * 3 - CENTER_LIFT_PX,
    ]
  )
  // "Unfold" title appears when the second frame (index 1) is in view
  const unfoldOpacity = useTransform(
    scrollPixels,
    [
      SCROLL_SEGMENT_PX - SCROLL_SEGMENT_PX * 0.28,
      SCROLL_SEGMENT_PX,
      SCROLL_SEGMENT_PX + SCROLL_SEGMENT_PX * HOLD_RATIO,
      SCROLL_SEGMENT_PX * 2,
    ],
    [0, 1, 1, 0]
  )
  // "Ready to Cook" title appears when the third frame (index 2) is in view
  const readyToCookOpacity = useTransform(
    scrollPixels,
    [
      SCROLL_SEGMENT_PX * 2 - SCROLL_SEGMENT_PX * 0.28,
      SCROLL_SEGMENT_PX * 2,
      SCROLL_SEGMENT_PX * 2 + SCROLL_SEGMENT_PX * HOLD_RATIO,
      SCROLL_SEGMENT_PX * 3,
    ],
    [0, 1, 1, 0]
  )
  // "All you need in one box" tagline appears when the fourth frame (index 3) is in view,
  // then fades out as the user continues scrolling past the hero section.
  // Uses scrollY directly (instead of scrollPixels) so it can fade out beyond the clamped range.
  const allInOneOpacity = useTransform(
    scrollY,
    [
      SCROLL_SEGMENT_PX * 3 - SCROLL_SEGMENT_PX * 0.28,
      SCROLL_SEGMENT_PX * 3,
      SCROLL_SEGMENT_PX * 3 + SCROLL_SEGMENT_PX * HOLD_RATIO,
      SCROLL_SEGMENT_PX * 4,
    ],
    [0, 1, 1, 0]
  )

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
    <section id="hero" className="relative min-h-screen flex flex-col bg-transparent text-charcoal-foreground">
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
        {/* Desktop nav - 3-section layout (chips + logo + chips) */}
        <div className="hidden md:flex px-8 py-4 items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {leftNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-5 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="#hero" className="text-lg font-serif font-semibold tracking-wide text-charcoal-foreground uppercase">
            Kamper
          </Link>

          <div className="flex items-center gap-2">
            {rightNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-5 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile nav - logo left, hamburger right */}
        <div className="flex md:hidden px-5 py-4 items-center justify-between">
          <Link
            href="#hero"
            className="text-lg font-serif font-semibold tracking-wide text-charcoal-foreground uppercase"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kamper
          </Link>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
              />
            </svg>
          </button>
        </div>

        <motion.div className="border-b-2 border-dotted" style={{ borderColor: navBorder }} />

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2 px-5 py-4">
                {mobileNav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wide text-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-16 md:pt-20 pb-4 -translate-y-[86px]">
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
          className="text-center uppercase leading-none mb-8 mt-0"
        >
          <h1
            className="w-screen relative left-1/2 -translate-x-1/2 whitespace-nowrap text-[82px] md:text-[180px] lg:text-[260px] font-serif font-bold tracking-tight leading-[0.9]"
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
          <p className="mt-1 text-sm md:text-4xl lg:text-5xl font-serif font-bold tracking-tight uppercase" style={{ color: HERO_HEADING_COLOR }}>
            Full Kitchen
          </p>
        </motion.div>
      </div>

      {/* Product image */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 w-full px-6 md:px-12 pb-1"
      >
        <motion.div
          style={{ y: imageY }}
          className="relative mx-auto w-[94vw] md:w-[86vw] lg:w-[78vw] xl:w-[72vw] aspect-[16/6]"
        >
          {HERO_SEQUENCE_FRAMES.map((src, index) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              style={{
                opacity: useTransform(
                  scrollPixels,
                  [
                    Math.max(0, index * SCROLL_SEGMENT_PX - SCROLL_SEGMENT_PX * 0.28),
                    index * SCROLL_SEGMENT_PX,
                    index * SCROLL_SEGMENT_PX + SCROLL_SEGMENT_PX * HOLD_RATIO,
                    (index + 1) * SCROLL_SEGMENT_PX,
                  ],
                  [0, 1, 1, 0]
                ),
              }}
            >
              <Image
                src={src}
                alt={`Kamper hero sequence frame ${index + 1}`}
                fill
                priority={index === 0}
                className={`object-contain ${index === 0 || index === 1 || index === 2 ? "scale-[2.88]" : "scale-[3.6]"} ${index === 0 ? "-translate-y-[66px] md:translate-y-0" : ""} ${index === 2 ? "md:translate-x-[80px]" : ""} ${index === 3 ? "translate-y-[120px] md:translate-y-[234px]" : ""}`}
                style={{ objectPosition: HERO_FRAME_POSITIONS[index] ?? "50% center" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Top-right scroll-driven title for second frame */}
      <motion.div
        style={{ opacity: unfoldOpacity }}
        className="fixed z-30 top-20 md:top-28 right-6 md:right-10 pointer-events-none"
      >
        <p
          className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold uppercase tracking-tight leading-none"
          style={{ color: HERO_HEADING_COLOR }}
        >
          Unfold
        </p>
      </motion.div>

      {/* Top-left scroll-driven title for third frame */}
      <motion.div
        style={{ opacity: readyToCookOpacity }}
        className="fixed z-30 top-20 md:top-28 left-6 md:left-10 pointer-events-none"
      >
        <p
          className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold uppercase tracking-tight leading-none"
          style={{ color: HERO_HEADING_COLOR }}
        >
          Ready
          <br />
          to Cook
        </p>
      </motion.div>

      {/* Bottom-center scroll-driven tagline for fourth frame */}
      <motion.div
        style={{ opacity: allInOneOpacity }}
        className="fixed z-30 bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 pointer-events-none w-[92vw] md:w-auto"
      >
        <p
          className="text-3xl md:text-7xl lg:text-8xl font-serif font-bold uppercase tracking-tight leading-[0.95] md:leading-none text-center md:whitespace-nowrap"
          style={{ color: HERO_HEADING_COLOR }}
        >
          All You Need in One Box
        </p>
      </motion.div>

      {/* Bottom left CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute z-20 bottom-[278px] md:bottom-[320px] left-6 md:left-10 max-w-xs"
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
    </section>
  )
}

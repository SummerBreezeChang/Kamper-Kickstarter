"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const KICKSTARTER_URL = "https://www.kickstarter.com"
const HERO_BACKGROUND = "/landing-background.png"
const HERO_PRODUCT_IMAGE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a01-EqQSnPBpFWfbKJe7RyIpPOeJmQEWE9.png"

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
      id="hero"
      className="relative min-h-screen flex flex-col bg-charcoal text-charcoal-foreground"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_BACKGROUND}
          alt=""
          fill
          priority
          className="object-cover object-center opacity-62 saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-[#2f4f3e]/52" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(157,196,149,0.26),transparent_34%),radial-gradient(circle_at_82%_68%,rgba(20,38,30,0.35),transparent_40%)]" />
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.3%22/%3E%3C/svg%3E')]" />
      </div>

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
                className="px-4 md:px-5 py-2 rounded-full bg-secondary text-secondary-foreground text-xs md:text-sm font-semibold uppercase tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="#hero" className="text-base md:text-lg font-serif font-semibold tracking-wide text-charcoal-foreground uppercase">
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

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-16 md:pt-20 pb-4">
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
          <h1 className="w-screen relative left-1/2 -translate-x-1/2 whitespace-nowrap text-[104px] md:text-[180px] lg:text-[260px] font-serif font-bold tracking-tight text-charcoal-foreground leading-[0.9]">
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
          <div className="w-screen relative left-1/2 -translate-x-1/2 mt-3 mb-3 border-b-2 border-dotted border-charcoal-foreground/65" />
          <p className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-charcoal-foreground/92">
            Full Kitchen
          </p>
        </motion.div>
      </div>

      {/* Product image - compact closed state */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 w-full px-6 md:px-12 pb-1"
      >
        <div className="relative mx-auto w-[60vw] md:w-[45vw] lg:w-[35vw] xl:w-[28vw] aspect-square flex items-center justify-center">
          <Image
            src={HERO_PRODUCT_IMAGE}
            alt="Kamper compact cooking system - closed"
            width={600}
            height={600}
            className="object-contain drop-shadow-2xl"
            priority
          />
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-charcoal-foreground/45 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-charcoal-foreground/70" />
        </motion.div>
      </motion.div>
    </section>
  )
}

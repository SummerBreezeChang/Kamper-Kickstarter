"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function StickyNavigation() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero (200vh = 2 * window.innerHeight)
      const scrollThreshold = window.innerHeight * 0.8
      setIsVisible(window.scrollY > scrollThreshold)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const sections = ["transformation", "features", "scenarios", "specs", "pricing"]
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const navItems = [
    { id: "transformation", label: "How It Works" },
    { id: "features", label: "Features" },
    { id: "scenarios", label: "Adventures" },
    { id: "specs", label: "Specs" },
    { id: "pricing", label: "Pricing" },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="mx-auto max-w-7xl px-4 py-4">
            <motion.nav
              className="flex items-center justify-between rounded-full bg-card/80 backdrop-blur-lg border border-border px-6 py-3 shadow-lg"
              onHoverStart={() => setIsExpanded(true)}
              onHoverEnd={() => setIsExpanded(false)}
            >
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-foreground">KAMPER</span>
              </Link>

              {/* Nav links - desktop */}
              <motion.div 
                className="hidden md:flex items-center gap-1"
                initial={false}
                animate={{ gap: isExpanded ? "0.5rem" : "0.25rem" }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`#${item.id}`}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>

              {/* CTA button */}
              <div className="flex items-center gap-3">
                <Link
                  href="#pricing"
                  className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Get KAMPER
                </Link>

                {/* Mobile menu button */}
                <button 
                  className="md:hidden p-2 text-foreground"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="md:hidden mt-2 overflow-hidden"
                >
                  <div className="rounded-2xl bg-card/95 backdrop-blur-lg border border-border p-4 shadow-lg">
                    {navItems.map((item) => (
                      <Link
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setIsExpanded(false)}
                        className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                          activeSection === item.id
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

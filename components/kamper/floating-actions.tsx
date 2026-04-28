"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const KICKSTARTER_URL = "https://www.kickstarter.com"
const RECIPES_URL = "#one-pot-meals"
const KICKSTARTER_ICON = "/kickstarter-icon.jpeg"

export function FloatingActions() {
  const [dockStyle, setDockStyle] = useState<React.CSSProperties | null>(null)
  const frameRef = useRef<number | null>(null)
  const lastDockRef = useRef<{ top: number; left: number } | null>(null)

  useEffect(() => {
    const updatePosition = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null

        const anchor = document.getElementById("footer-instagram-anchor")
        if (!anchor) {
          lastDockRef.current = null
          setDockStyle(null)
          return
        }

        const rect = anchor.getBoundingClientRect()
        const inView = rect.top < window.innerHeight && rect.bottom > 0
        if (!inView) {
          lastDockRef.current = null
          setDockStyle(null)
          return
        }

        // Round to whole pixels to avoid subpixel jitter.
        const top = Math.round(rect.top + (rect.height - 40) / 2)
        const left = Math.round(rect.right + 8)
        const last = lastDockRef.current
        if (!last || last.top !== top || last.left !== left) {
          lastDockRef.current = { top, left }
          setDockStyle({ top, left })
        }
      })
    }

    updatePosition()
    window.addEventListener("scroll", updatePosition, { passive: true })
    window.addEventListener("resize", updatePosition)
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener("scroll", updatePosition)
      window.removeEventListener("resize", updatePosition)
    }
  }, [])

  return (
    <div
      className={dockStyle ? "fixed z-[60] flex items-center gap-2" : "fixed z-[60] bottom-10 right-6 md:right-10 flex items-center gap-2"}
      style={dockStyle ?? undefined}
    >
      <Link
        href={RECIPES_URL}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="One-pot meals"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19h16" />
          <path d="M7 19v-8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8" />
          <path d="M10 9V5h4v4" />
        </svg>
      </Link>
      <Link
        href={KICKSTARTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors overflow-hidden"
        aria-label="Kickstarter"
      >
        <Image
          src={KICKSTARTER_ICON}
          alt="Kickstarter"
          width={20}
          height={20}
          className="object-contain"
        />
      </Link>
    </div>
  )
}

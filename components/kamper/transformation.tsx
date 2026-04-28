"use client"

import { useScroll } from "framer-motion"
import { useRef, useEffect } from "react"

const VIDEO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/close-Y0fqVdwwCe2qfWZYe5MtGDI1iEiYEa.mp4"

export function Transformation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Wait for video metadata to load
    const handleLoadedMetadata = () => {
      // Scrub video based on scroll position
      const unsubscribe = scrollYProgress.on("change", (value) => {
        if (video.duration) {
          video.currentTime = value * video.duration
        }
      })
      return unsubscribe
    }

    if (video.readyState >= 1) {
      // Metadata already loaded
      return scrollYProgress.on("change", (value) => {
        if (video.duration) {
          video.currentTime = value * video.duration
        }
      })
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata)
      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      }
    }
  }, [scrollYProgress])

  return (
    <section ref={containerRef} id="transformation" className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="w-[90vw] md:w-[80vw] lg:w-[70vw] h-auto max-h-[85vh] object-contain"
        />
      </div>
    </section>
  )
}

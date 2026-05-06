"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ImagePlaceholder } from "@/components/kamper/image-placeholder"
import { WordOpacityHeading } from "@/components/kamper/word-opacity-heading"

const settings = [
  {
    number: "01",
    title: "Beach",
    description: "Golden hour, sand between your toes",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a1.png-LXv1J4JSzBVJzvGfeKaNa45yHKVQLn.jpeg"
  },
  {
    number: "02",
    title: "Campsite",
    description: "Morning light, fresh mountain air",
    image: "/luma/d02.png"
  },
  {
    number: "03",
    title: "City Balcony",
    description: "Urban views, rooftop dining",
    image: "/luma/d03.png"
  }
]

function LifestyleCard({
  setting,
  index,
}: {
  setting: (typeof settings)[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  // Stronger motion for all cards: left-tilted -> vertical -> slight left tilt.
  const rotate = useTransform(scrollYProgress, [0, 0.55, 1], [-12, 0, -5])
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [24, 0, -14])

  const isImageUrl = typeof setting.image === 'string' && (setting.image.startsWith('http') || setting.image.startsWith('/'))

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`group max-w-[520px] ${index === 0 ? "ml-auto" : ""} ${index === 1 ? "mr-auto" : ""} ${index === 2 ? "mx-auto" : ""}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-charcoal-foreground text-xs font-semibold">
          {setting.number}
        </span>
        <div>
          <h3 className="text-sm md:text-base font-semibold uppercase tracking-wide text-foreground">
            {setting.title}
          </h3>
          <p className="text-xs md:text-sm text-foreground/70">
            {setting.description}
          </p>
        </div>
      </div>

      <motion.div
        style={{ rotate, y: translateY }}
        whileHover={{ scale: 1.03, y: -8 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="relative aspect-[4/3] overflow-hidden shadow-[0_20px_50px_rgba(42,18,9,0.18)] will-change-transform rounded-md"
      >
        {isImageUrl ? (
          <>
            <Image
              src={setting.image}
              alt={setting.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <ImagePlaceholder
            title={setting.title}
            note={setting.image}
            className="rounded-md border-foreground/20 bg-card/70"
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export function SettingsSection() {
  return (
    <section id="lifestyle" className="py-24 md:py-32 bg-secondary text-secondary-foreground border-y border-border">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <p className="text-sm tracking-[0.2em] text-foreground/70 uppercase mb-4">
            Use Cases
          </p>
          <WordOpacityHeading
            lines={["Every Environment", "Your Kitchen"]}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold uppercase tracking-tight leading-[0.9] text-foreground"
          />
          <p className="mt-5 max-w-xl text-sm md:text-base text-foreground/80 uppercase leading-relaxed">
            Beach mornings, campsites, and backyard nights - KAMPER goes anywhere you do.
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {settings.map((setting, index) => <LifestyleCard key={setting.title} setting={setting} index={index} />)}
        </div>
      </div>
    </section>
  )
}

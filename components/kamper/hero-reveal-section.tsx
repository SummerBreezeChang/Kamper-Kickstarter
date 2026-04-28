"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ImagePlaceholder } from "@/components/kamper/image-placeholder"

const KICKSTARTER_URL = "https://www.kickstarter.com"
const SHARED_BACKGROUND = "/landing-background.png"

const FRAMES = ["01 Closed", "02 Opening", "03 Mid", "04 Open", "05 Ready", "06 Cook Ready"]
const STEP_RANGE = [0, 1, 2, 3, 4, 5]
const TITLE_Y_STEPS = [
  "calc(10vh - 120px)",
  "calc(6vh - 120px)",
  "calc(2vh - 120px)",
  "calc(-3vh - 120px)",
  "calc(-8vh - 120px)",
  "calc(-13vh - 120px)",
]
const COPY_BLOCK_Y_STEPS = ["15vh", "10vh", "5vh", "0vh", "-6vh", "-12vh"]
const CENTER_COPY_Y_STEPS = ["0vh", "-0.4vh", "-0.8vh", "-1.2vh", "-1.6vh", "-2vh"]
const RIGHT_COPY_Y_STEPS = ["1vh", "0.4vh", "-0.4vh", "-0.9vh", "-1.3vh", "-1.8vh"]

const leftNav = [
  { label: "Specs", href: "#details" },
  { label: "Use Cases", href: "#lifestyle" },
]
const rightNav = [
  { label: "One-Pot Meals", href: "#one-pot-meals" },
  { label: "Get Updates", href: "#subscribe" },
]

const STORY_STEPS = [
  {
    bgTitle: "PACK SMALL",
    caption: "Start compact",
    centerDescription: "Carry one clean box from car to campsite with zero setup clutter.",
    rightDescription: "KAMPER rides compact and protected, ready to open anywhere.",
    placement: "center",
    cta: "See setup",
  },
  {
    bgTitle: "SET DOWN",
    caption: "Rotate to prep position",
    centerDescription: "Set it down, rotate once, and establish your prep zone immediately.",
    rightDescription: "One move creates a stable base before flame and food.",
    placement: "rightCenter",
    cta: undefined,
  },
  {
    bgTitle: "DROP LEG",
    caption: "Lock support",
    centerDescription: "Drop the support leg and lock the structure for confident outdoor use.",
    rightDescription: "From uneven ground to level cooking stance in seconds.",
    placement: "center",
    cta: "Continue",
  },
  {
    bgTitle: "FLIP BOARD",
    caption: "Red side to bamboo",
    centerDescription: "Flip to bamboo and prep instantly.\nBoard stable. Workspace clear.",
    rightDescription: "Transition from protected carry mode to clean prep mode in one motion.",
    placement: "rightCenter",
    cta: "Continue",
  },
  {
    bgTitle: "OPEN STORAGE",
    caption: "Tools ready",
    centerDescription: "Open side storage and keep every tool exactly where your hand expects.",
    rightDescription: "No rummaging. No reset. Just flow from prep to cook.",
    placement: "center",
    cta: undefined,
  },
  {
    bgTitle: "COOK ANYWHERE",
    caption: "Ready to cook",
    centerDescription: "One box becomes a complete\noutdoor kitchen.\nOne smooth sequence.",
    rightDescription: "Set, prep, and cook with less mess\nand faster cleanup.",
    placement: "rightCenter",
    cta: "Back on Kickstarter",
  },
] as const

export function HeroRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
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
      if (currentY < 24) setIsNavHidden(false)
      else if (delta > 3) setIsNavHidden(true)
      else if (delta < -3) setIsNavHidden(false)
      lastScrollY.current = currentY
    })
    return () => unsubscribe()
  }, [scrollY])

  // Phase 1: hero copy + product
  const heroBlockOpacity = useTransform(scrollYProgress, [0.01, 0.14, 0.2], [1, 1, 0])
  const heroBlockY = useTransform(scrollYProgress, [0.01, 0.2], ["0vh", "-7vh"])
  const heroCtaOpacity = useTransform(scrollYProgress, [0.01, 0.16, 0.23], [1, 1, 0])

  // Phase 2: reveal sequence starts later but in same container
  const frameIndex = useTransform(scrollYProgress, [0.2, 0.92], [0, FRAMES.length - 1])
  const revealOpacity = useTransform(scrollYProgress, [0.16, 0.24], [0, 1])
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.28, 0.84, 0.92], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.2, 0.52, 0.92], ["18%", "0%", "-20%"])
  const descOpacity = useTransform(scrollYProgress, [0.26, 0.5, 0.85, 1], [0, 1, 1, 0])
  const productY = useTransform(scrollYProgress, [0.2, 0.92], ["0vh", "16vh"])
  const textRiseY = useTransform(scrollYProgress, [0.2, 0.92], ["9vh", "-9vh"])
  const titleY = useTransform(frameIndex, STEP_RANGE, TITLE_Y_STEPS)
  const copyBlockY = useTransform(frameIndex, STEP_RANGE, COPY_BLOCK_Y_STEPS)
  const centerCopyY = useTransform(frameIndex, STEP_RANGE, CENTER_COPY_Y_STEPS)
  const rightCopyY = useTransform(frameIndex, STEP_RANGE, RIGHT_COPY_Y_STEPS)

  return (
    <section ref={containerRef} id="hero" className="relative h-[760vh] bg-charcoal text-charcoal-foreground">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={SHARED_BACKGROUND}
            alt=""
            fill
            priority
            className="object-cover object-center opacity-58 saturate-[0.8]"
          />
          <div className="absolute inset-0 bg-[#2f4f3e]/54" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(157,196,149,0.26),transparent_34%),radial-gradient(circle_at_82%_68%,rgba(20,38,30,0.35),transparent_40%)]" />
          <div className="absolute inset-0 opacity-18 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.3%22/%3E%3C/svg%3E')]" />
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

        {/* Shared product stage */}
        <motion.div
          style={{ y: productY }}
          className="relative z-20 w-[94vw] md:w-[86vw] lg:w-[78vw] xl:w-[72vw] aspect-[16/6]"
        >
          <motion.div style={{ opacity: heroBlockOpacity }} className="absolute inset-0">
            <ImagePlaceholder
              title="Hero Product Shot"
              note="Replace with: Kamper closed frame matching sequence frame 01 angle"
              showFrame={false}
              className="rounded-xl border-0 bg-transparent text-charcoal-foreground"
            />
          </motion.div>
          {FRAMES.map((label, index) => (
            <motion.div
              key={label}
              className="absolute inset-0"
              style={{
                opacity: useTransform(frameIndex, [index - 0.5, index, index + 0.5], [0, 1, 0]),
              }}
            >
              <ImagePlaceholder
                title={`Sequence Frame ${label}`}
                note="Replace with matching camera-angle unfold frame"
                showFrame={false}
                className="rounded-xl border-0 bg-transparent text-charcoal-foreground"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Hero copy phase */}
        <motion.div
          style={{ opacity: heroBlockOpacity, y: heroBlockY }}
          className="absolute z-30 inset-0 flex flex-col items-center justify-center px-6 pt-16 md:pt-20 pointer-events-none"
        >
          <p className="text-xs md:text-sm tracking-[0.12em] text-charcoal-foreground/85 uppercase mb-1">
            Compact Outdoor Cooking System
          </p>
          <div className="text-center uppercase leading-none mb-8 mt-0">
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
          </div>
        </motion.div>

        {/* Hero CTA phase */}
        <motion.div style={{ opacity: heroCtaOpacity }} className="absolute z-30 bottom-8 left-6 md:left-10 max-w-xs">
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
          </Link>
        </motion.div>

        {/* Reveal background headings phase */}
        <motion.div style={{ opacity: revealOpacity }} className="absolute inset-0 z-20 pointer-events-none">
          <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute inset-0">
            {STORY_STEPS.map((step, index) => (
              <motion.div
                key={step.bgTitle}
                className="absolute inset-0 flex items-end justify-start pb-28 md:pb-24 px-6 md:px-12"
                style={{
                  opacity: useTransform(frameIndex, [index - 0.55, index, index + 0.55], [0, 1, 0]),
                  y: titleY,
                }}
              >
                <motion.h2
                  style={{
                    opacity: useTransform(frameIndex, [index - 0.34, index, index + 0.34], [0.25, 1, 0.25]),
                  }}
                  className="text-[17vw] md:text-[14vw] lg:text-[12vw] font-serif font-bold text-charcoal-foreground uppercase tracking-tight leading-[0.82] whitespace-nowrap"
                >
                  {step.bgTitle}
                </motion.h2>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Reveal captions + CTA phase */}
        <motion.div
          style={{ opacity: descOpacity, y: textRiseY }}
          className="absolute z-30 left-0 right-0 bottom-12 px-6 md:px-12"
        >
          {STORY_STEPS.map((step, index) => (
            <motion.div
              key={step.caption}
              style={{
                opacity: useTransform(frameIndex, [index - 0.34, index, index + 0.34], [0, 1, 0]),
                y: copyBlockY,
              }}
              className={`absolute bottom-0 grid grid-cols-12 gap-4 md:gap-6 ${
                step.placement === "center"
                  ? "left-6 md:left-[18vw] right-6 md:right-[18vw] items-center"
                  : "left-6 md:left-[30vw] right-6 md:right-12 items-center"
              }`}
            >
              {step.caption !== "Ready to cook" ? (
                <motion.div
                  style={{ y: centerCopyY }}
                  className={`col-span-12 ${step.placement === "center" ? "md:col-span-6" : "md:col-span-5"} max-w-lg rounded-md bg-charcoal/28 px-3 py-2 backdrop-blur-[2px]`}
                >
                  <p className="text-sm md:text-base uppercase tracking-[0.14em] text-charcoal-foreground mb-2">{step.caption}</p>
                  <p className="whitespace-pre-line text-base md:text-[1.08rem] text-charcoal-foreground leading-[1.45]">
                    {step.centerDescription}
                  </p>
                </motion.div>
              ) : null}

              <motion.div
                style={{ y: rightCopyY }}
                className={`hidden md:block ${step.placement === "center" ? "md:col-span-3 md:justify-self-center" : "md:col-span-4 md:justify-self-start"} ${step.caption === "Ready to cook" ? "md:translate-x-[280px]" : ""} max-w-sm rounded-md bg-charcoal/24 px-3 py-2 backdrop-blur-[2px]`}
              >
                <p className="whitespace-pre-line text-base md:text-[1.05rem] text-charcoal-foreground leading-relaxed">{step.rightDescription}</p>
                {step.cta && step.placement === "rightCenter" ? (
                  <button className="mt-5 px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors">
                    {step.cta}
                  </button>
                ) : null}
              </motion.div>

              {step.cta ? (
                <div className={`col-span-12 ${step.placement === "center" ? "md:col-span-3 md:justify-self-end" : "md:hidden"} `}>
                  <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors">
                    {step.cta}
                  </button>
                </div>
              ) : null}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: heroBlockOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-charcoal-foreground/45 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-charcoal-foreground/70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


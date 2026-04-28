"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ImagePlaceholder } from "@/components/kamper/image-placeholder"

const FRAMES = ["01 Closed", "02 Opening", "03 Mid", "04 Open", "05 Ready", "06 Cook Ready"]
const SHARED_BACKGROUND = "/landing-background.png"
const STEP_RANGE = [0, 1, 2, 3, 4, 5]
const STEP_OPACITY_SPAN = 0.28
const FRAME_OPACITY_SPAN = 0.34
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
]

export function RevealSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Calculate which frame to show based on scroll progress
  // Keep some scroll at the start/end for pause beats.
  const frameIndex = useTransform(scrollYProgress, [0.12, 0.9], [0, FRAMES.length - 1])
  
  // Background text opacity and position
  const textOpacity = useTransform(scrollYProgress, [0.12, 0.22, 0.86, 0.94], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["20%", "0%", "-20%"])
  
  // Description text
  const descOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.88, 0.97], [0, 1, 1, 0])
  const productY = useTransform(scrollYProgress, [0.12, 0.9], ["-1vh", "12vh"])
  const textRiseY = useTransform(scrollYProgress, [0.12, 0.9], ["8vh", "-8vh"])
  const titleY = useTransform(frameIndex, STEP_RANGE, TITLE_Y_STEPS)
  const copyBlockY = useTransform(frameIndex, STEP_RANGE, COPY_BLOCK_Y_STEPS)
  const centerCopyY = useTransform(frameIndex, STEP_RANGE, CENTER_COPY_Y_STEPS)
  const rightCopyY = useTransform(frameIndex, STEP_RANGE, RIGHT_COPY_Y_STEPS)

  return (
    <section 
      ref={containerRef} 
      id="reveal" 
      className="relative h-[calc(620vh+24px)] bg-transparent text-charcoal-foreground"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          <Image src={SHARED_BACKGROUND} alt="" fill className="object-cover object-center opacity-52 saturate-[0.8]" />
          <div className="absolute inset-0 bg-[#2f4f3e]/55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(170,210,160,0.18),transparent_30%),radial-gradient(circle_at_25%_75%,rgba(0,0,0,0.26),transparent_35%)]" />
          <div className="absolute inset-0 opacity-15 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.25%22/%3E%3C/svg%3E')]" />
        </div>

        {/* Background storyboard text */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 pointer-events-none z-10"
        >
          {STORY_STEPS.map((step, index) => (
            <motion.div
              key={step.bgTitle}
              className="absolute inset-0 flex items-end justify-start pb-28 md:pb-24 px-6 md:px-12"
              style={{
                opacity: useTransform(frameIndex, [index - STEP_OPACITY_SPAN, index, index + STEP_OPACITY_SPAN], [0, 1, 0]),
                y: titleY,
              }}
            >
              <div>
                <motion.h2
                  style={{
                    opacity: useTransform(frameIndex, [index - STEP_OPACITY_SPAN, index, index + STEP_OPACITY_SPAN], [0.22, 1, 0.22]),
                  }}
                  className="text-[17vw] md:text-[14vw] lg:text-[12vw] font-serif font-bold text-charcoal-foreground uppercase tracking-tight leading-[0.82] whitespace-nowrap"
                >
                  {step.bgTitle}
                </motion.h2>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Frame images container */}
        <motion.div
          style={{ y: productY }}
          className="relative z-20 w-[94vw] md:w-[86vw] lg:w-[78vw] xl:w-[72vw] aspect-[16/6]"
        >
          {FRAMES.map((label, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              style={{
                opacity: useTransform(
                  frameIndex,
                  [index - FRAME_OPACITY_SPAN, index, index + FRAME_OPACITY_SPAN],
                  [0, 1, 0]
                ),
              }}
            >
              <ImagePlaceholder
                title={`Sequence Frame ${label}`}
                note="Replace with matching camera-angle unfold frame"
                className="rounded-xl border-charcoal-foreground/30 bg-black/10 text-charcoal-foreground"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Story caption + center/right descriptions + CTA */}
        <motion.div
          style={{ opacity: descOpacity, y: textRiseY }}
          className="absolute z-30 left-0 right-0 bottom-12 px-6 md:px-12"
        >
          {STORY_STEPS.map((step, index) => (
            <motion.div
              key={step.caption}
              style={{
                opacity: useTransform(frameIndex, [index - STEP_OPACITY_SPAN, index, index + STEP_OPACITY_SPAN], [0, 1, 0]),
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
                <div
                  className={`col-span-12 ${step.placement === "center" ? "md:col-span-3 md:justify-self-end" : "md:hidden"} `}
                >
                  <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors">
                    {step.cta}
                  </button>
                </div>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

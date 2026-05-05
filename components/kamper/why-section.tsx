"use client"

import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion"

const STORY_STEPS = [
  {
    eyebrow: "Why KAMPER",
    title: "COOK OUTSIDE\nWITHOUT CHAOS",
    description:
      "One compact box keeps prep, heat, and tools in one place so outdoor cooking feels simple from the start.",
    points: [
      "Compact carry, clean setup",
      "Less mess around camp",
      "Fast transition into cooking",
    ],
  },
  {
    eyebrow: "More Outdoor Joy",
    title: "MORE RELAXING\nMORE ENJOYABLE",
    description:
      "Spend less time managing setup and more time enjoying the people, food, and place around you.",
    points: [
      "More relaxed prep at camp",
      "More time shared around meals",
      "More confidence cooking outside",
    ],
  },
  {
    eyebrow: "Relaxed Outdoor Cooking",
    title: "RELAX MORE\nCOOK SIMPLE",
    description:
      "Set it down, open, and cook. KAMPER helps you spend more time outside and less time managing gear.",
    points: [
      "Ready in under a minute",
      "Cook anywhere you park",
      "Pack down fast after meals",
    ],
  },
]

export function WhySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [stepFloat, setStepFloat] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const stepIndex = useTransform(scrollYProgress, [0.08, 0.92], [0, STORY_STEPS.length - 1])
  useMotionValueEvent(stepIndex, "change", (value) => {
    setStepFloat(value)
  })

  const getWordOpacity = (targetStep: number, order: number, total: number) => {
    const relative = stepFloat - targetStep
    // Reach full reveal at step center, then fade back out.
    const enterProgress = Math.max(0, Math.min(1, (relative + 0.55) / 0.55))
    const exitProgress = Math.max(0, Math.min(1, (0.55 - relative) / 0.55))
    const revealPhase = Math.max(0, Math.min(1, Math.min(enterProgress, exitProgress)))
    if (Math.abs(relative) < 0.085) return 1
    const wordProgress = Math.max(0, Math.min(1, revealPhase * (total + 1) - order))
    return 0.4 + 0.6 * wordProgress
  }

  return (
    <section ref={sectionRef} id="why" className="relative h-[320vh] bg-charcoal text-charcoal-foreground">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid h-full grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
          {/* Left copy panel */}
          <div className="relative border-r border-charcoal-foreground/20">
            <div className="absolute left-0 right-0 top-0 border-t-2 border-dotted border-charcoal-foreground/45" />
            {STORY_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                style={{
                  opacity: useTransform(stepIndex, [index - 0.55, index, index + 0.55], [0, 1, 0]),
                  y: useTransform(stepIndex, [index - 0.55, index, index + 0.55], [36, 0, -36]),
                }}
                className="absolute inset-0 flex flex-col px-6 md:px-10 pt-8 md:pt-10 pb-10 md:pb-12"
              >
                {index === 0 ? (
                  <>
                    <div>
                      <h2 className="max-w-[620px] whitespace-pre-line text-[34px] sm:text-5xl md:text-7xl lg:text-[86px] font-serif font-bold uppercase tracking-tight leading-[0.88]">
                        <span
                          className="mr-[0.22em]"
                          style={{ opacity: getWordOpacity(index, 0, 3), color: "var(--charcoal-foreground)" }}
                        >
                          COOK
                        </span>
                        <span style={{ opacity: getWordOpacity(index, 1, 3), color: "var(--charcoal-foreground)" }}>
                          OUTSIDE
                        </span>
                        <br />
                        <span
                          className="mr-[0.22em]"
                          style={{ opacity: getWordOpacity(index, 2, 3), color: "var(--charcoal-foreground)" }}
                        >
                          WITHOUT
                        </span>
                        <span style={{ opacity: getWordOpacity(index, 3, 3), color: "var(--charcoal-foreground)" }}>
                          CHAOS
                        </span>
                      </h2>
                      <div className="mt-7 border-b-2 border-dotted border-charcoal-foreground/45" />
                      <p className="mt-4 md:mt-6 max-w-md text-sm md:text-xl uppercase leading-[1.25] text-charcoal-foreground/88">
                        {step.description}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 md:flex-1 md:flex md:items-center md:justify-start">
                      <motion.div
                        style={{
                          x: useTransform(stepIndex, [index - 0.1, index + 0.45], [160, 0]),
                        }}
                        className="w-full max-w-2xl space-y-1.5 md:space-y-4"
                      >
                        {step.points.map((point, pointIndex) => (
                          <motion.div
                            key={point}
                            style={{
                              x: useTransform(
                                stepIndex,
                                [index - 0.45, index + pointIndex * 0.08, index + 0.45],
                                [34 - pointIndex * 7, 10 - pointIndex * 3, 0]
                              ),
                            }}
                            className="flex items-start gap-3"
                          >
                            <motion.span
                              style={{
                                rotate: useTransform(
                                  stepIndex,
                                  [index - 0.45, index + pointIndex * 0.08, index + 0.45],
                                  [-16 + pointIndex * 3, -6, 0]
                                ),
                              }}
                              className="shrink-0 inline-flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full border border-charcoal-foreground/50 text-[8px] md:text-[10px] leading-none"
                            >
                              ●
                            </motion.span>
                            <p className="max-w-lg text-sm md:text-base uppercase leading-[1.4] text-charcoal-foreground/92">
                              {point}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </>
                ) : index === 1 ? (
                  <div className="mt-auto pb-[162px]">
                    <p className="mb-4 text-xs md:text-sm tracking-[0.16em] uppercase text-charcoal-foreground/64">
                      {step.eyebrow}
                    </p>
                    <h2 className="max-w-[760px] whitespace-pre-line text-[30px] sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-bold uppercase tracking-tight leading-[0.92]">
                      <span
                        className="mr-[0.22em]"
                        style={{ opacity: getWordOpacity(index, 0, 1), color: "var(--charcoal-foreground)" }}
                      >
                        MORE
                      </span>
                      <span style={{ opacity: getWordOpacity(index, 1, 1), color: "var(--charcoal-foreground)" }}>
                        RELAXING.
                      </span>
                      <br />
                      <span
                        className="mr-[0.22em]"
                        style={{ opacity: getWordOpacity(index, 0, 1), color: "var(--charcoal-foreground)" }}
                      >
                        MORE
                      </span>
                      <span style={{ opacity: getWordOpacity(index, 1, 1), color: "var(--charcoal-foreground)" }}>
                        ENJOYABLE.
                      </span>
                    </h2>
                  </div>
                ) : (
                  <div className="mt-auto pb-[62px]">
                    <h2 className="max-w-[640px] whitespace-pre-line text-[34px] sm:text-5xl md:text-7xl lg:text-[82px] font-serif font-bold uppercase tracking-tight leading-[0.88]">
                      <span
                        className="mr-[0.22em]"
                        style={{ opacity: getWordOpacity(index, 0, 3), color: "var(--charcoal-foreground)" }}
                      >
                        MAKING
                      </span>
                      <span
                        style={{ opacity: getWordOpacity(index, 1, 3), color: "var(--charcoal-foreground)" }}
                        className="mr-[0.22em]"
                      >
                        OUTDOOR
                      </span>
                      <br />
                      <span
                        className="mr-[0.22em]"
                        style={{ opacity: getWordOpacity(index, 2, 3), color: "var(--charcoal-foreground)" }}
                      >
                        COOKING
                      </span>
                      <span style={{ opacity: getWordOpacity(index, 3, 3), color: "var(--charcoal-foreground)" }}>SIMPLE.</span>
                    </h2>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right full-half video panel - stays fixed, fills the panel */}
          <div className="relative h-full overflow-hidden bg-secondary/30">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b01-QdiQCwKv2HELYQzLq0Xh46SasSPMgz.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

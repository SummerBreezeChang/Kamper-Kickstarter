"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type WordOpacityHeadingProps = {
  lines: string[]
  className: string
  delay?: number
}

export function WordOpacityHeading({ lines, className, delay = 0 }: WordOpacityHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(headingRef, { amount: 0.45 })
  const wordsByLine = lines.map((line) => line.split(" "))
  const totalWordsBeforeLine = wordsByLine.reduce<number[]>((acc, words, idx) => {
    if (idx === 0) return [0]
    return [...acc, acc[idx - 1] + wordsByLine[idx - 1].length]
  }, [])

  return (
    <motion.h2 ref={headingRef} className={className}>
      {wordsByLine.map((words, lineIndex) => (
        <span key={`${lines[lineIndex]}-${lineIndex}`} className="block">
          {words.map((word, wordIndex) => {
            const globalWordIndex = totalWordsBeforeLine[lineIndex] + wordIndex
            return (
            <motion.span
              key={`${word}-${wordIndex}`}
              animate={{ opacity: isInView ? 1 : 0.4 }}
              transition={{
                duration: 0.95,
                ease: "easeOut",
                delay: delay + globalWordIndex * 0.24,
              }}
              className="inline-block mr-[0.28em]"
            >
              {word}
            </motion.span>
          )})}
        </span>
      ))}
    </motion.h2>
  )
}

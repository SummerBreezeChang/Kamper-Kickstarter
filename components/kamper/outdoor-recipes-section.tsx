"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ImagePlaceholder } from "@/components/kamper/image-placeholder"
import { WordOpacityHeading } from "@/components/kamper/word-opacity-heading"

const recipeCards = [
  {
    title: "Skillet Lemon Herb Chicken",
    time: "20 min",
    description: "Seared chicken strips with charred peppers, onions, and zucchini on a smoking-hot griddle. Smoky, bright, ready in minutes.",
    note: "Replace with one-pan chicken + herbs image",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g01.png-knJYISvEPANwkS5o33g8sABOzNBeeS.jpeg",
  },
  {
    title: "One-Pot Camp Chili",
    time: "25 min",
    description: "Hearty beef and bean chili topped with melted cheddar, sour cream, and fresh scallions. Prep on the board, simmer in one pot.",
    note: "Replace with camp chili in pot image",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g02.png-oXdgw70nE8dpJGmtnPzqmJY8QmR9nd.jpeg",
  },
  {
    title: "Rosemary Veggie Skillet",
    time: "18 min",
    description: "Golden potatoes, bell peppers, and mushrooms tossed with fresh rosemary. Crispy edges, simple seasoning, one pan.",
    note: "Replace with veggie skillet image",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kamper_-_Outdoor_Cooking_Kitchen_A7_UCH6U.png-cvoi4zJOZzgUxU5iUil0D6EEu2homL.jpeg",
  },
]

export function OutdoorRecipesSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  })
  const gridLiftY = useTransform(scrollYProgress, [0, 0.55, 1], [120, 0, -150])

  return (
    <section id="one-pot-meals" className="bg-charcoal text-charcoal-foreground py-16 md:py-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-xs md:text-sm tracking-[0.18em] uppercase text-charcoal-foreground/75 mb-4">
            One-Pot Meals
          </p>
          <WordOpacityHeading
            lines={["Cook Anywhere", "One Box Easy"]}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold uppercase tracking-tight leading-[0.9]"
          />
          <p className="mt-4 text-sm md:text-base uppercase tracking-wide text-charcoal-foreground/80">
            Real outdoor meals, built for compact setup and fast cleanup.
          </p>
          <button className="mt-6 px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors">
            Explore One-Pot Meals
          </button>
        </motion.div>

        <motion.div ref={gridRef} style={{ y: gridLiftY }} className="grid md:grid-cols-3 gap-4 md:gap-5">
          {recipeCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="bg-secondary text-secondary-foreground rounded-sm overflow-hidden border border-border"
            >
              <div className="p-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder title={card.title} note={card.note} className="rounded-none border-secondary-foreground/20 bg-card/60" />
                  )}
                </div>
              </div>
              <div className="px-4 md:px-5 pb-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded-full bg-charcoal/15 text-[10px] font-semibold uppercase tracking-wide">One-Pot</span>
                  <span className="px-2 py-1 rounded-full bg-charcoal/15 text-[10px] font-semibold uppercase tracking-wide">{card.time}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-tight leading-[0.95] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-secondary-foreground/85 leading-relaxed">{card.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

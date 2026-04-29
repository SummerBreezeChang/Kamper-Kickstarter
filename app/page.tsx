 "use client"

import { Hero } from "@/components/kamper/hero"
import { RevealSection } from "@/components/kamper/reveal-section"
import { WhySection } from "@/components/kamper/why-section"
import { ProductDetails } from "@/components/kamper/product-details"
import { SettingsSection } from "@/components/kamper/settings-section"
import { RecipesSection } from "@/components/kamper/recipes-section"
import { FullCtaSection } from "@/components/kamper/full-cta-section"
import { OutdoorRecipesSection } from "@/components/kamper/outdoor-recipes-section"
import { SubscribeSection } from "@/components/kamper/subscribe-section"
import { Footer } from "@/components/kamper/footer"
import { FloatingActions } from "@/components/kamper/floating-actions"
import { motion } from "framer-motion"

const sectionReveal = {
  initial: { opacity: 0, y: 56, scale: 0.985 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.65, ease: "easeOut" as const },
}

export default function KamperPage() {
  return (
    <main className="bg-background">
      <FloatingActions />
      {/* Section 1 + 2 share one continuous background and overlay */}
      <section className="relative">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/landing-background.png')" }}
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#08110c]/78" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#2f4f3e]/55" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_80%_20%,rgba(170,210,160,0.18),transparent_30%),radial-gradient(circle_at_25%_75%,rgba(0,0,0,0.26),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 opacity-15 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.25%22/%3E%3C/svg%3E')]" />

        <div className="relative z-10">
          <Hero />
          <RevealSection />
        </div>
      </section>
      
      {/* Section 3: Why Cook Outside - dark charcoal section */}
      <motion.div {...sectionReveal}>
        <WhySection />
      </motion.div>
      
      {/* Section 4: Product Details - specs and features */}
      <motion.section id="details" {...sectionReveal}>
        <ProductDetails />
      </motion.section>
      
      {/* Section 5: Settings/Lifestyle - three lifestyle images */}
      <motion.div {...sectionReveal}>
        <SettingsSection />
      </motion.div>
      
      {/* Section 6: Recipes */}
      <motion.div {...sectionReveal}>
        <RecipesSection />
      </motion.div>
      
      {/* Section 7: Full Page CTA */}
      <motion.div {...sectionReveal}>
        <FullCtaSection />
      </motion.div>

      {/* Section 8: Outdoor one-pot recipes */}
      <motion.div {...sectionReveal}>
        <OutdoorRecipesSection />
      </motion.div>
      
      {/* Section 9: Subscribe */}
      <motion.div {...sectionReveal}>
        <SubscribeSection />
      </motion.div>
      
      {/* Section 10: Footer */}
      <motion.div {...sectionReveal}>
        <Footer />
      </motion.div>
    </main>
  )
}

 "use client"

import { HeroScroll } from "@/components/kamper/hero-scroll"
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
      {/* Section 1 & 2: Combined Hero + Product Scroll Sequence */}
      <HeroScroll />
      
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

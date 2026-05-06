"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0])

  return (
    <section ref={containerRef} className="py-32 px-6 lg:px-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-10"
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-6">
            Ready to cook outdoors like never before?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of happy campers who have simplified their outdoor cooking experience with KAMPER.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button size="lg" className="text-base px-8 gap-2 group">
            Shop KAMPER
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8">
            Rent for Your Next Trip
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {["Free Shipping", "2-Year Warranty", "30-Day Returns", "Lifetime Support"].map((badge) => (
            <span key={badge} className="text-sm text-muted-foreground">
              {badge}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

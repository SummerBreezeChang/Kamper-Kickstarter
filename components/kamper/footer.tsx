"use client"

import Link from "next/link"

import { isExternalHref, KICKSTARTER_HREF } from "@/lib/kickstarter"

const socialLinks = [
  { name: "Instagram", href: "#", icon: "instagram" },
]

const navLinks = [
  { name: "Specs", href: "#details" },
  { name: "Use Cases", href: "#lifestyle" },
  { name: "One-Pot Meals", href: "#one-pot-meals" },
  { name: "Get Updates", href: "#subscribe" },
]

const infoLinks = [
  { name: "Kickstarter", href: KICKSTARTER_HREF },
  { name: "Contact", href: "#footer" },
]

const policyLinks = [
  { name: "Terms Of Use", href: "#" },
  { name: "Sales Policy", href: "#" },
  { name: "Privacy Policy", href: "#" },
]

export function Footer() {
  return (
    <footer id="footer" className="relative bg-charcoal text-charcoal-foreground pt-4 md:pt-6">
      <div className="px-3 md:px-6">
        <h2 className="font-serif font-bold uppercase tracking-tight leading-none text-[16vw] md:text-[12vw] lg:text-[10vw]">
          KAMPER
        </h2>
      </div>

      <div className="px-3 md:px-6 pb-6 md:pb-10 pt-5 md:pt-7">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-[11px] md:text-xs uppercase tracking-wide">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="block text-charcoal-foreground hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            {infoLinks.map((link) =>
              isExternalHref(link.href) ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-charcoal-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} href={link.href} className="block text-charcoal-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              ),
            )}
          </div>

          <div className="space-y-1">
            {policyLinks.map((link) => (
              <Link key={link.name} href={link.href} className="block text-charcoal-foreground hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <p className="text-charcoal-foreground">Berkeley, CA, USA</p>
            <p className="text-charcoal-foreground">info@kamper.co</p>
          </div>

          <div className="flex md:justify-end md:pr-[112px] items-start">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                id="footer-instagram-anchor"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={social.name}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t-2 border-dotted border-charcoal-foreground/55 px-3 md:px-6 py-3">
        <div className="grid grid-cols-3 text-[10px] md:text-[11px] uppercase tracking-wide text-charcoal-foreground">
          <p>&copy; {new Date().getFullYear()} KAMPER</p>
          <p className="text-center">All Rights Reserved</p>
          <p className="text-right normal-case tracking-normal">
            <Link
              href="https://lumalabs.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Created with Luma
            </Link>
            {" · "}
            <Link
              href="https://www.summerchang.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              by Summer Chang
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

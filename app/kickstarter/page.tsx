import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { NewsletterSignupForm } from "@/components/kamper/newsletter-signup-form"

export const metadata: Metadata = {
  title: "KAMPER · Kickstarter (coming soon)",
  description: "KAMPER is coming soon. Subscribe for Kickstarter launch notifications.",
}

export default function KickstarterPlaceholderPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/luma/f01.png"
          alt=""
          fill
          priority
          className="object-cover blur-sm scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#08110c]/78" />
        <div className="absolute inset-0 bg-[#2f4f3e]/45" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-16 md:px-10">
        <Link
          href="/"
          className="mb-10 inline-flex w-fit items-center gap-2 text-sm uppercase tracking-wide text-[#bdc29e] hover:text-foreground transition-colors"
        >
          ← Back to KAMPER
        </Link>

        <div className="rounded-[28px] border border-foreground/20 bg-background/70 p-8 shadow-sm backdrop-blur-md md:p-10">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <div className="relative h-[124px] w-[124px] shrink-0 overflow-hidden rounded-3xl border border-foreground/15 bg-foreground/5">
              <Image src="/kickstarter-icon.jpeg" alt="Kickstarter" fill className="object-cover" sizes="124px" />
            </div>
            <div className="pl-8">
              <p className="ml-1 font-bold text-xs tracking-[2.2px] uppercase text-foreground/70">Kickstarter</p>
              <h1 className="mt-2 font-serif text-4xl font-bold uppercase tracking-tight leading-[0.95] md:text-5xl">
                Coming up soon
              </h1>
              <p className="mt-1.5 ml-1 max-w-xl pr-3 text-base leading-[22px] text-foreground/80">
                We&apos;re finishing the final campaign details. Subscribe to get notified the moment the Kickstarter page
                goes live.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-dotted border-foreground/25 pt-10">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/70 mb-4">Get notified</p>
            <NewsletterSignupForm
              submitLabel="Notify me"
              inputClassName="w-full rounded-full border border-foreground/25 bg-transparent px-5 py-4 text-sm uppercase tracking-wide text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-foreground/40"
              buttonClassName="w-full rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              privacyClassName="mt-4 text-xs md:text-sm text-foreground/75"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

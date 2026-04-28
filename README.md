# Kickstarter Landing Page Template

Production-ready Next.js template for Kickstarter-style launch pages.

This repo ships with a KAMPER demo implementation, but the layout, components, and docs are built for reuse with any product campaign.

## 60-Second Setup

```bash
git clone https://github.com/SummerBreezeChang/kickstarter-template.git
cd kickstarter-template
pnpm install
pnpm dev
```

Open `http://localhost:3000` (or the next available port shown in terminal).

## Why Use This Template

- Story-driven one-page structure for campaign-style storytelling
- Scroll interactions and animated headings with Framer Motion
- Centralized color tokens for fast brand theming
- Placeholder-first image workflow for easy asset replacement
- Reusable section components under `components/kamper/`

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion
- pnpm

## Reuse in 5 Steps

1. Duplicate or fork this repo for your product
2. Replace copy section-by-section
3. Replace visual assets in `public/`
4. Update brand tokens in `app/globals.css`
5. Run `pnpm build` before publishing

## Where to Edit

## Core page assembly

- `app/page.tsx`

## Main campaign sections

- `components/kamper/hero.tsx`
- `components/kamper/reveal-section.tsx`
- `components/kamper/why-section.tsx`
- `components/kamper/product-details.tsx`
- `components/kamper/settings-section.tsx`
- `components/kamper/recipes-section.tsx`
- `components/kamper/outdoor-recipes-section.tsx`
- `components/kamper/subscribe-section.tsx`
- `components/kamper/footer.tsx`

## Theme tokens

- `app/globals.css`

Start with:

- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--accent` / `--accent-foreground`
- `--charcoal` / `--charcoal-foreground`
- `--background` / `--foreground`

## Image Asset Workflow

Place campaign assets in:

- `public/luma/`

Common file references:

- Shared hero/reveal background: `public/landing-background.png`
- Floating + footer Kickstarter icon: `public/kickstarter-icon.jpeg`
- Why section stitched strip: `public/luma/why-story-strip.webp`

Tip: keep filenames stable while iterating so component code stays unchanged.

## Scroll Sequence Docs (Section 2)

- `docs/kamper-scroll-asset-manifest.md`
- `docs/kamper-scroll-prompt-pack.md`
- `docs/luma-image-guide.md`

Use these to generate consistent frame-by-frame reveal assets.

## Anchor IDs (Navigation Map)

- `#hero`
- `#details`
- `#lifestyle`
- `#recipes`
- `#one-pot-meals`
- `#subscribe`
- `#footer`

If you rename any section ID, update matching nav/footer links.

## Build + Quality Check

```bash
pnpm build
```

If build passes, the template is ready to deploy/share.

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  kamper/
docs/
public/
  luma/
```

## Notes

- Some extra component experiments are included in `components/kamper/` from the design process. You can remove unused files if you want a minimal template.
- A local Next.js root warning may appear if multiple lockfiles exist on your machine; it does not block build output.


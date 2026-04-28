# KAMPER Luma Asset Guide

Use this as the generation and export checklist for the current landing page.

## Recommended formats

- Use `WebP` for most photos (`quality 80-88`) to keep page speed high.
- Use `PNG` only when you need transparent backgrounds (for clean product cutouts in hero/reveal).
- Keep color profile `sRGB`.
- Export 2x source resolution if the model allows it, then downscale to target size.

## Asset naming and target sizes

- `public/luma/01-kamper-closed-hero.webp`
  - Purpose: Section 1 hero main product shot
  - Target size: `2400x1600` (or larger)
  - Aspect: landscape, product centered with negative space

- `public/luma/02-kamper-unfold-01-closed.webp`
- `public/luma/03-kamper-unfold-02-opening.webp`
- `public/luma/04-kamper-unfold-03-mid.webp`
- `public/luma/05-kamper-unfold-04-open.webp`
- `public/luma/06-kamper-unfold-05-ready.webp`
  - Purpose: Section 2 scroll-frame swap sequence
  - Target size: `1800x1800`
  - Important: same camera angle, same framing, same background in every frame

- `public/luma/07-kamper-beach-golden-hour.webp`
- `public/luma/08-kamper-campsite-morning.webp`
- `public/luma/09-kamper-backyard-evening.webp`
  - Purpose: Section 5 lifestyle cards
  - Target size: `1400x1866` (3:4)

- `public/luma/10-kamper-burner-closeup.webp`
  - Purpose: Section 4 product detail split
  - Target size: `1600x1600`

- `public/luma/11-bowl-food-kamper-background.webp`
- `public/luma/12-rice-vegetables-kamper.webp`
  - Purpose: Section 6 recipe cards
  - Target size: `1200x1200`

- `public/luma/13-full-lifestyle-cta.webp`
  - Purpose: Section 7 full-page CTA background
  - Target size: `2560x1440` minimum

## Prompt structure for Luma (copy-ready)

Use this template for consistency:

"Photorealistic outdoor product photography of KAMPER portable cooking system, [scene details], warm natural light, premium lifestyle brand aesthetic, editorial composition, shallow depth of field, realistic materials (aluminum frame, bamboo prep surface), no logos, no text overlays, no watermarks."

For sequence frames (Section 2), append:

"Same camera position, same lens, same background, only product state changes from closed to open stage [N]."

## Sequence generation tips (critical for Section 2)

- Generate frame 1 first and keep it as visual reference.
- Reuse the same seed/reference image for all following frames.
- Lock camera and focal length to prevent jitter during scroll.
- Keep lighting direction and shadows identical.
- Avoid adding new props between frames.

## Optional motion file (Section 4)

If you want a loop in Section 4, export:

- `public/luma/section-4-detail-loop.mp4`
  - 6-10 seconds, seamless loop, H.264
  - 1080p minimum, under 6 MB preferred

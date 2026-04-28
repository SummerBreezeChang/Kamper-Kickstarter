# KAMPER Scroll Asset Manifest (Sections 2-4)

This is the exact frame spec for the KAMPER transformation interaction.

## Global generation rules

- Format: `PNG` or `WebP` with transparent background
- Color profile: `sRGB`
- Min size: `2200x2200` (square canvas preferred for scroll sequence)
- Product scale: identical in all frames
- Camera: locked (same angle, focal length, distance)
- Lighting: locked (same direction and intensity)
- No text overlays, no background props, no watermark

---

## Section 2 - Transformation Scroll (mechanical sequence)

Use these files in order. Do not skip frame numbering.

### A. Hero pose to flat/open setup

1. `public/luma/scroll/a01-hero-45deg-closed.png`
   - KAMPER closed, vertical-ish at ~45deg
2. `public/luma/scroll/a02-rotate-down-start.png`
3. `public/luma/scroll/a03-rotate-down-mid.png`
4. `public/luma/scroll/a04-flat-top-red-right.png`
   - Flat orientation, red board side on right
5. `public/luma/scroll/a05-leg-drop-start.png`
6. `public/luma/scroll/a06-leg-drop-locked.png`

### B. Cutting board flip (red -> bamboo)

7. `public/luma/scroll/b01-red-side-ready.png`
8. `public/luma/scroll/b02-board-flip-start.png`
9. `public/luma/scroll/b03-board-flip-mid.png`
10. `public/luma/scroll/b04-bamboo-side-up.png`

### C. Utility setup (pin + storage)

11. `public/luma/scroll/c01-pull-pin-visible.png`
12. `public/luma/scroll/c02-pull-pin-engaged.png`
13. `public/luma/scroll/c03-storage-door-crack-open.png`
14. `public/luma/scroll/c04-storage-open-half.png`
15. `public/luma/scroll/c05-storage-open-full.png`
16. `public/luma/scroll/c06-ready-to-cook-final.png`

---

## Scroll mapping (for implementation)

Map scroll progress in `RevealSection` from `0 -> 1`:

- `0.00 - 0.36`: Sequence A (`a01`..`a06`)
- `0.36 - 0.62`: Sequence B (`b01`..`b04`)
- `0.62 - 0.92`: Sequence C (`c01`..`c06`)
- `0.92 - 1.00`: Hold `c06` (final ready state)

---

## Timed annotation copy (optional overlay text)

Use these labels synced with the ranges above:

- A-range: `From one box to cook-ready`
- A05-A06: `Drop leg and lock`
- B-range: `Flip board: rubber to bamboo`
- C01-C02: `Engage pull pin`
- C03-C05: `Open utensil storage`
- C06: `Ready to cook`

---

## Section 3 - Why it matters (supporting visuals)

Use 3 static transparent product states derived from sequence:

- `public/luma/why/w01-compact-travel.png` (closed/travel state)
- `public/luma/why/w02-prep-mode-bamboo.png` (prep state, bamboo visible)
- `public/luma/why/w03-cook-mode-open-storage.png` (full use mode)

These should visually correspond to the copy:

- Packable design
- Fast setup
- Reliable cooking

---

## Section 4 - Product details closeups

Use detailed stills (not sequence):

- `public/luma/details/d01-burner-closeup.png`
- `public/luma/details/d02-bamboo-surface-closeup.png`
- `public/luma/details/d03-storage-compartment-open.png`
- `public/luma/details/d04-pull-pin-mechanism.png`

---

## Prompt template (copy-ready)

`Photorealistic product render of KAMPER compact outdoor kitchen, transparent background, centered composition, fixed camera and lens, consistent scale and lighting with previous frame, realistic materials (coated red rubber board, bamboo board, metal frame, utility storage), no text, no watermark.`

For frame continuity append:
`This is frame <ID> in a mechanical transformation sequence. Keep camera, framing, shadows, and product scale identical to previous frame. Only change the specified mechanical state.`


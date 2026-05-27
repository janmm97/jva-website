# Handoff: JVA Landing Page Redesign

## Overview
This package contains production-ready, drop-in replacements for every section component in the JVA marketing site (`janmm97/jva-website`). Each file is a direct swap for its counterpart in `components/` — same import paths, same props, same `@/` aliasing. No new dependencies required (framer-motion is already installed).

## About these files
These are **high-fidelity production components** derived from the HTML prototype in `ui_kits/website/`. They use the codebase's own Tailwind v4 token system (`jva-*` colours), framer-motion, and Lucide. They are **not** the HTML prototypes — they are real Next.js/React components.

Reference the prototype at `ui_kits/website/index.html` for visual ground truth.
Reference the design system at `README.md` for all token/colour/motion specs.

## Fidelity
**High-fidelity.** Pixel-accurate to the HTML prototype. All colours, spacing, motion timing, and responsive behaviour are specified below and in the components themselves.

---

## New design direction (vs current site)

| Aspect | Before | After |
|---|---|---|
| Surface | `bg-jva-deep` blocks | Full-viewport sections (`min-h-screen`) with blurred parallax blooms |
| Hero height | `min-h-screen` (no real fill) | `min-h-screen flex flex-col justify-center` — fills the viewport exactly |
| Hero CTA | No CTA in code (bug) | Primary + Outline pair below headline |
| Ticker gap | Flush against CTAs | `mt-20` spacer before ticker |
| Integrations bg | `bg-jva-dark` | Full cinematic gradient matching the orb's backdrop |
| Integrations chips | White-on-dark (barely visible text) | White chip bg, `text-[#1F192F]` label — reads cleanly |
| Orb asset | Broken SVG mask | `/assets/logo/jva-orb-cutout.png` (circular-masked PNG) |
| Logo | Broken SVG mask | `/assets/logo/jva-logo-primary-reverse-transparent.png` |
| Process | 2-col grid | Scroll-pinned vertical carousel (4×100vh with sticky stage) |
| All sections | Fixed `py-24 lg:py-32` | `min-h-screen flex items-center` + parallax bloom layers |
| Social icons in footer | Brandfetch CDN img (broken) | Inline SVG paths (no external request) |

---

## Files in this package

```
components/
  layout/
    Navbar.tsx          ← updated logo path only
    Footer.tsx          ← inline SVG social icons (no brandfetch)
  sections/
    Hero.tsx            ← full-viewport, cinematic bg, CTA pair, ticker gap
    IntegrationSphere.tsx ← min-h-screen, orb gradient bg, parallax, cutout PNG
    Services.tsx        ← min-h-screen, parallax blooms
    Process.tsx         ← scroll-pinned carousel (NEW — useScroll + useTransform)
    Products.tsx        ← min-h-screen, parallax blooms
    About.tsx           ← min-h-screen, parallax blooms
    SocialProof.tsx     ← min-h-screen, parallax blooms
    Pricing.tsx         ← min-h-screen, parallax blooms
    FinalCTA.tsx        ← min-h-screen, parallax blooms

globals-additions.css   ← paste these rules into app/globals.css
assets-checklist.md     ← files to copy into /public/assets/
```

---

## Installation steps

### 1. Copy asset files into `/public/assets/logo/`
See `assets-checklist.md` for the exact files. Critically:
- `jva-logo-primary-reverse-transparent.png` — the navbar/footer logo
- `jva-orb-cutout.png` — the integration orb (circular PNG, transparent bg)

### 2. Paste `globals-additions.css` into `app/globals.css`
Add to the end of the file. These rules add the hero arc, particle CSS, and orb float animation.

### 3. Copy component files
Replace existing files one-for-one:
```bash
cp components/layout/Navbar.tsx      /path/to/repo/components/layout/Navbar.tsx
cp components/layout/Footer.tsx      /path/to/repo/components/layout/Footer.tsx
cp components/sections/*.tsx         /path/to/repo/components/sections/
```

### 4. Verify
Run `next dev` and scroll through each section. All Tailwind classes use existing `jva-*` tokens — no config changes needed.

---

## Section-by-section spec

### Hero
- Background: `linear-gradient(180deg, #0F0A1E 0%, #1F192F 35%, #2A2342 75%, #1F192F 100%)`
- Arc: `hero-arc` positioned `top: calc(100% - 34vh)`, `w-[110vw] h-[720px]`, border `rgba(196,181,232,0.55)`, inner fill matches `#2A2342`, glow `0 -8px 80px 12px rgba(155,111,208,0.45)`
- Particles: white `rgba(255,255,255,var(--popacity))` — not purple
- CTA: Primary "Submit Your Workflow Idea →" + Outline "See services" as a flex row
- Ticker: `mt-20` spacer before the `ToolTickerStrip` component

### IntegrationSphere
- Background: `linear-gradient(180deg, #1F192F 0%, #2A2342 18%, #3B3454 50%, #5A4F7C 78%, #8375A1 100%)`
- Section: `min-h-screen flex items-center`
- Orb asset: `src="/assets/logo/jva-orb-cutout.png"` — NOT the SVG
- Chip inner: `bg-white`, label: `text-[#1F192F] font-semibold` — dark text on white bg
- Parallax: Two `motion.div` bloom layers driven by `useScroll` + `useTransform`
- Stars: 15 white dots, `pointer-events-none`, inside `motion.div` with slow parallax

### Process (scroll-pinned carousel)
- Container: `h-[400vh]` (4 × viewport)
- Inner: `sticky top-0 h-screen overflow-hidden` — two-column layout
- Left col: eyebrow + H2 + step rail (step number badges, title text, active state highlighted)
- Right col: card stage with `perspective-[1200px]`; each card uses `useTransform` driven off shared `useScroll` progress
- Card transforms: `yPercent = (cardIndex - activeFloat) × 110`, `scale = 1 - abs(distance) × 0.08`, `opacity = 1 - abs(distance) × 0.7`
- Card surface: `bg-gradient-to-b from-[#2F2649] to-[#2A2342]`, border `rgba(196,181,232,0.20)`, shadow `0 24px 60px rgba(0,0,0,0.40)`
- Background gradient: top `#8375A1`, fades to `#1F192F` at bottom (bridges from Integrations section)
- "Scroll to advance" hint: visible until last card is active, `uppercase tracking-widest text-jva-lavender/40 text-xs`

### Services / Products / Pricing
- Section: `min-h-screen flex items-center`
- Two parallax blobs: `motion.div` with `useTransform` on `useScroll`, one moves up (+8%), one down (-8%) as the section scrolls through the viewport
- Blob sizes: `w-[40vw]` and `w-[35vw]`, `rounded-full`, `bg-jva-accent/30 or bg-jva-bright/25`, `blur-[140px]`
- No other changes to card/grid structure

### About / SocialProof
- Same `min-h-screen + parallax blooms` treatment
- `bg-jva-mid` for About (alternating), `bg-jva-deep` for SocialProof

### FinalCTA
- Section: `min-h-screen flex items-center`
- Central bloom: `w-[800px] h-[800px]`, `bg-jva-bright/30`, `blur-[160px]`, parallax `y: +/-6%`

### Navbar
- Logo: `src="/assets/logo/jva-logo-primary-reverse-transparent.png"` → `h-10`

### Footer
- Social icons: inline SVG paths (LinkedIn, X, YouTube, GitHub) — no external image requests
- Logo: `src="/assets/logo/jva-logo-primary-reverse-transparent.png"` → `h-12`

---

## Motion tokens (matching current globals.css)
| Variable | Value |
|---|---|
| Ease out | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Entry duration | `600ms` |
| Hover/state | `200–300ms` |
| Orb float | `5s ease-in-out infinite` — `y: 0 → -10 → 0` |
| Ticker | `42s linear infinite` |
| Pulse ring | `2.4s ease-in-out infinite` — `scale: 1 → 1.08`, `opacity: 0.4 → 0.1` |

---

## Assets checklist
See `assets-checklist.md`.

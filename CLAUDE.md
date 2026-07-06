# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # tsc -b + vite build → dist/, then copies dist/index.html → dist/404.html for SPA routing on GitHub Pages
npm run lint     # oxlint (config in .oxlintrc.json)
npm run preview  # serve the production build locally
```

No test suite exists.

## Architecture

Static marketing site for digitalftprints.com: React 19 + Vite + Tailwind v4 + Motion (framer-motion successor, imported from `motion/react`) + Lenis (inertia smooth scrolling). Two routes (`/` and `/contact`) via react-router-dom; unknown paths fall back to Home.

Content is separated from components — most edits shouldn't touch JSX:

- `src/data/site.ts` — email, socials, tagline, services, stat numbers
- `src/data/projects.ts` — project/case-study showcase
- `src/index.css` — brand colors, fonts, and keyframe animations live in the Tailwind v4 `@theme` block (no tailwind.config file)

Layout: `App.tsx` renders persistent chrome (`GradientBackground`, `Nav`, `Footer`, `ScrollManager`) around route pages wrapped in `AnimatePresence` for page transitions. `src/pages/Home.tsx` composes the section components in `src/sections/` (Hero, Marquee, Services, Work, Stats, CTA).

Shared animation primitives are in `src/lib/anim.tsx`: `Reveal` (scroll-into-view blur/rise), `WordReveal` (word-staggered headings with gradient accent segments), `Parallax`, `DeckItem` (offset right column in card grids), `CountUp`, `Magnetic` (cursor-following button), `Tilt`. Reuse these rather than writing new motion wrappers.

Animation gotchas learned the hard way:

- Lenis owns scrolling: `SmoothScroll.tsx` exports the live `lenis` instance (null under `prefers-reduced-motion`), and `ScrollManager` uses it for hash/route scrolls. Programmatic `window.scrollTo` gets overridden by Lenis — when driving the site in Playwright, scroll with `mouse.wheel` instead. `html { scroll-behavior: smooth }` must stay removed.
- A lingering `filter` (even `blur(0px)`) on an ancestor breaks `background-clip: text` and `backdrop-filter` on descendants — blur-in animations must end with `transitionEnd: { filter: 'none' }`, and gradient text must carry the clip class on the same element being filtered.
- All Motion animations respect reduced motion via `<MotionConfig reducedMotion="user">` in `App.tsx`; continuous canvas/loop effects (`HeroEffects.tsx`, cursor spotlight in `GradientBackground.tsx`) additionally gate themselves off manually.

Ambient layers: `GradientBackground.tsx` (fixed site-wide aurora + grid + cursor spotlight that reveals the grid), `HeroEffects.tsx` (hero-only particle canvas + looping footprint-trail walk along a bezier arc — path/timing constants at the top of the file).

The contact form builds a `mailto:` link (`buildMailto()` in `src/pages/Contact.tsx`); switching to a hosted form means replacing that function's body with a `fetch()` POST.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds and publishes to GitHub Pages. Custom domain comes from `public/CNAME`, so Vite `base` stays `'/'`.

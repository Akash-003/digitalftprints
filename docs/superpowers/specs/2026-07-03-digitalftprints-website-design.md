# Digital Footprints — Marketing Website Design

**Date:** 2026-07-03
**Domain:** digitalftprints.com (GoDaddy, DNS → GitHub Pages)
**Owner:** Akash

## What it is

A 2-page marketing site for **Digital Footprints**, a young dynamic startup offering:
Performance Marketing · Website & App Development · SEO · Business Consultation (revenue & growth).
Goal: feel alive and high-craft so the site itself proves the team is good at what it does.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Motion (Framer Motion) for animation
- react-router-dom (2 routes)
- No backend. Static build → GitHub Pages via GitHub Actions.

## Brand (retheme via CSS variables in `index.css`)

- Base: near-black indigo `#0B0B16`
- Accent gradient: violet → fuchsia → cyan
- Headings: Space Grotesk. Body: Inter.
- "Footprints" motif: subtle trailing-dots/path accent, used sparingly.

## Pages

### Landing `/`
1. Hero — animated gradient-mesh bg, staggered headline reveal, magnetic CTAs.
2. Services — 4 tilt-on-hover cards.
3. Work showcase — 3–4 case-study cards from editable `src/data/projects.ts`.
4. Impact stats — count-up numbers.
5. CTA band → contact.
6. Footer.

### Contact `/contact`
- Form: name, email, company, service-of-interest, message.
- Submit opens a prefilled `mailto:` to the company inbox.
- Submit handler isolated in one function so swapping to Web3Forms later is a one-line change.
- Direct email + social links alongside.

## Animation kit (respects `prefers-reduced-motion`)

Animated gradient background, scroll-reveal, count-up stats, magnetic buttons,
card tilt/hover, services marquee, route page transitions.

## Placeholders (owner fills later, all clearly marked)

- Company email — `src/data/site.ts` (used by mailto + footer).
- Real projects — `src/data/projects.ts`.
- Social links — `src/data/site.ts`.

## Deploy

- `public/CNAME` = `digitalftprints.com`.
- `.github/workflows/deploy.yml` builds and deploys to Pages on push to `main`.
- Vite `base: '/'` (custom domain serves from root).
- GoDaddy DNS: 4 A records → GitHub Pages IPs + `www` CNAME → `<user>.github.io`.

## Out of scope (YAGNI)

Blog, CMS, analytics, i18n, real form backend (mailto now; documented upgrade path).

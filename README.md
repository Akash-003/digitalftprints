# Digital Footprints — website

Marketing site for **digitalftprints.com**. React + Vite + Tailwind v4 + Motion.
Static build, deployed to GitHub Pages via GitHub Actions.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/  (also writes 404.html for SPA routing)
npm run preview  # serve the production build locally
```

## What to edit (no code needed)

| Want to change… | Edit this file |
|-----------------|----------------|
| Company email, socials, tagline, services, stat numbers | `src/data/site.ts` |
| Project / case-study showcase | `src/data/projects.ts` |
| Brand colours & fonts | the `@theme` block in `src/index.css` |

> The contact form currently opens the visitor's email app (`mailto:`). To switch
> to a hosted form later (e.g. Web3Forms), replace the body of `buildMailto()` in
> `src/pages/Contact.tsx` with a `fetch()` POST — nothing else changes.

## Deploy

Push to `main` → the workflow in `.github/workflows/deploy.yml` builds and publishes
to GitHub Pages automatically. Custom domain is set by `public/CNAME`.

One-time setup: repo **Settings → Pages → Source: GitHub Actions**, then add the
GoDaddy DNS records (see project notes).

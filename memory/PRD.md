# KSK & Kannialazhann Farm — Lead-Gen Website (PRD)

## Original problem statement
Build a frontend-only, multi-page, mobile-responsive lead-generation website for
the joint family business **KSK Farm × Kannialazhann** (Rajapalayam, Gopalapuram).
Showcase all animals across categories, drive WhatsApp/phone leads, full
animations, deployable to Vercel. No backend / no database.

## Stack
- React 19 + React Router 7 (SPA)
- Tailwind 3 + custom CSS variables
- Framer-style animations using Lenis (smooth scroll) + IntersectionObserver
  reveals + CSS transitions
- Fonts: Fraunces (display) + DM Sans (body), Google Fonts
- Brand colors: deep green #1f4d2b, gold #f4c20d, cream #f9f8f6, ink #2d2d2a
- Static data in `/app/frontend/src/data/animals.js`
- Vercel-ready (`/app/frontend/vercel.json` with SPA rewrites)

## User personas
1. **Pet buyer** looking for native Tamil dogs (Rajapalayam, Kanni, Kombai, Chippiparai).
2. **Farmer / dairy investor** buying HF cows.
3. **Wholesale meat / function buyer** ordering goats and Naatu Koli at ₹600/kg.
4. **Game-fowl & rooster breeder** looking for Sanda Koli / Sanda Seval bloodlines.
5. **Household buyer** picking up daily free-range eggs.

## Core requirements (static)
- 12 animals + Eggs across 5 categories: Dogs, Cows, Goats, Poultry, Eggs.
- Tamil + English naming everywhere.
- Pricing badges (₹600/kg) prominent on hero + each card.
- WhatsApp click-to-chat to right number per category:
  - Dogs / Cocks / Eggs → +91 7305644912 (wa.me/917305644912)
  - Cow / Goat → +91 7339598737 (wa.me/917339598737)
- Phone tel: links on every page.
- Contact form that opens WhatsApp with pre-filled message to the right number
  based on the selected category.
- Google Maps embed for KSK FARMS in Footer + Contact.
- Floating contact CTA on every page (now bottom-left to avoid Emergent badge).
- Social: Instagram @kannialazhann, YouTube @kannialazhann, WhatsApp group.

## What's been implemented (2025-12)
- ✅ Home: cinematic hero, marquee strip, story+stats, bento categories,
  why-buy-from-us, featured-animal rail, gold CTA section.
- ✅ Sticky glass Navbar with mobile drawer.
- ✅ Dark-green Footer with massive headline, map, social, dual contact blocks.
- ✅ Category pages for `dogs`, `cows`, `goats`, `poultry`, `eggs`.
- ✅ Animal detail pages with gallery thumbs, traits table, WA + Call buttons,
  related-animal rail, "Buying with us" trust card.
- ✅ Contact page with form → WhatsApp pre-fill.
- ✅ Floating multi-option contact widget (Dogs WA / Cows WA / Call).
- ✅ Smooth scroll (Lenis), scroll reveals, image zoom on hover, grain texture.
- ✅ Vercel deployment config (`vercel.json` with SPA rewrites, CRA build).
- ✅ All assets in `/app/frontend/public/animals/` from the supplied ZIP.
- ✅ data-testid on every interactive element.
- ✅ Tested 18/18 flows (iteration_1 + iteration_2) — all pass.

## Backlog (P1)
- Per-route SEO meta titles + descriptions (currently global only).
- Add OG image (any animal hero) for WhatsApp/social previews.
- Image lazy-loading + width/height attrs for better LCP.
- Optional gallery lightbox on animal detail pages.
- Testimonials / past-buyer slider (when content available).

## Backlog (P2)
- Multi-language toggle EN / TA full translation (currently EN + TA names only).
- Newsletter / WhatsApp broadcast opt-in.
- "Available now" stock counter (manual JSON update).
- Schema.org `LocalBusiness` JSON-LD for Google rich-result.

## Deployment
- Build: `cd /app/frontend && yarn build` → outputs `/app/frontend/build/`.
- Vercel: framework auto-detected via `vercel.json` (`create-react-app`,
  buildCommand `yarn build`, outputDirectory `build`, SPA rewrites).
- No env variables required — frontend is fully static; the existing
  `REACT_APP_BACKEND_URL` is unused.

## Files of interest
- `frontend/src/App.js` — router
- `frontend/src/data/animals.js` — single source of truth
- `frontend/src/pages/{Home,CategoryPage,AnimalDetailPage,ContactPage}.jsx`
- `frontend/src/components/{Navbar,Footer,FloatingCTA,Reveal,SmoothScroll,ScrollToTop}.jsx`
- `frontend/src/index.css` — theme tokens + animations
- `frontend/vercel.json` — deploy config

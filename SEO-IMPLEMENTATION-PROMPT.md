# SEO Master Implementation Prompt — kannialazhannfarm.in
### Paste this entire file into your GitHub Copilot agent in VS Code (open the repo root first, then start the chat with "Read SEO-IMPLEMENTATION-PROMPT.md and implement every phase in order, asking me only when a decision needs my input.")

---

## 0. Mission

You are acting as a senior technical SEO engineer working inside the **KSK & Kannialazhann Farm** repository (`kskandkannialazhannfarms-main`). The goal is to make `https://kannialazhannfarm.in` rank at the top of Google for livestock-buying searches in **Rajapalayam, Gopalapuram, and across Tamil Nadu** — specifically for **goats, roosters/Sanda Seval, hens/poultry, eggs, cows (HF), and native Tamil dog breeds** — and to fix the underlying technical reasons the site is currently close to invisible to search engines and to link-preview crawlers (Google, Bing, WhatsApp, Facebook, Instagram).

Work through the phases **in order**. Each phase has a "Definition of Done." Do not skip Phase 1 and Phase 2 — they are the foundation everything else depends on. Commit after each phase with a clear message (e.g. `seo: phase 1 — technical foundation`).

---

## 1. Project facts you must use (do not invent different values)

- **Domain:** `kannialazhannfarm.in` — treat the **apex domain** `https://kannialazhannfarm.in` as canonical (no `www`). If a `www` DNS record exists, it must 301-redirect to the apex (this is a Vercel dashboard → Domains setting, flag it for the owner if you cannot change DNS yourself).
- **Stack:** Create React App (`react-scripts` + `craco`), React 19, React Router 7 (`BrowserRouter`), Tailwind, deployed on Vercel as a static SPA build (`frontend/` is the app root, `frontend/build` is the output dir per `frontend/vercel.json`).
- **Business name (NAP — keep identical everywhere):** `KSK & Kannialazhann Farm`
- **Address:** `Rajapalayam, Gopalapuram - 626136, Tamil Nadu, India`
- **Coordinates** (from the existing Google Maps embed in `src/data/animals.js`): `lat 9.3654, lng 77.6233`
- **Phones:** Cow & Goat: `+91 7339598737` · Dogs/Poultry/Eggs: `+91 7305644912`, `+91 7339026424`
- **Social:** Instagram `@kannialazhann`, YouTube `@kannialazhann`, WhatsApp group link in `CONTACTS.whatsappGroup`
- **All product/category data lives in one file:** `frontend/src/data/animals.js` — exports `CONTACTS`, `CATEGORIES` (5: cows, goats, dogs, poultry, eggs), `ANIMALS` (13 items). **Treat this file as the single source of truth** — every script you write (sitemap generator, schema generator, prerender route list) must read from here, not from a hardcoded duplicate list, so the site self-updates when new animals are added.
- **Existing SEO hook:** `frontend/src/hooks/useSEO.js` — a client-side `useEffect` that mutates `document.title` / meta tags / canonical link per page. This is the only per-page SEO mechanism today — it does **not** help crawlers that don't execute JavaScript.
- **Half-built, disconnected feature:** `frontend/api/og.js` is a Vercel serverless function that builds correct per-route OG meta tags but it is **never called** — there is no rewrite rule routing social-media bot requests to it. After Phase 2 (prerendering) is done, this file becomes redundant — delete it rather than wiring it up, to avoid maintaining two SEO systems.
- **Logo asset:** `frontend/public/animals/Logos.jpg` (used in Navbar/Footer) — reuse this to generate the favicon set in Phase 1.

---

## 2. Audit findings (why the site isn't ranking)

1. **The entire site is client-side rendered with zero prerendering.** `index.html` ships an empty `<div id="root">`. Every page's real `<title>`, meta description, and content only exist after JavaScript runs. Google can eventually render JS, but indexing is slower and less reliable than a server-rendered/prerendered page, and **WhatsApp, Facebook, Instagram, LinkedIn, Telegram, and Slack crawlers do not execute JavaScript at all** — meaning every link this farm shares on WhatsApp (its primary sales channel) currently shows the same generic homepage image/title regardless of which animal or category was actually shared.
2. **No `robots.txt`, no `sitemap.xml`, no `manifest.json`, no favicon files exist anywhere in `public/`.** Search engines have no map of the site's pages.
3. **Zero structured data (JSON-LD).** No `LocalBusiness`, no `Product`, no `BreadcrumbList`, no `FAQPage` — meaning no rich results (price, ratings, map pin, FAQ accordions) are possible in Google search results.
4. **The catch-all route `path="*"` renders `<Home />` instead of a real 404.** This creates "soft 404s" — Google may interpret broken/old URLs as valid duplicate homepages, diluting ranking signals.
5. **Images are large, unoptimized, and have SEO-hostile filenames** (e.g. `HF Cow.jpg` at 1.1MB, `Sembari ( pottu aadu ).jpg` with spaces and parentheses). This hurts Core Web Vitals (LCP) — a confirmed Google ranking factor — and wastes an opportunity for image-search traffic.
6. **Title tags and meta descriptions mention Rajapalayam but rarely the wider service area** (Sivakasi, Srivilliputhur, Virudhunagar, Sattur, Tirunelveli, Madurai) that the business actually wants to capture per your request ("all over Tamil Nadu").
7. **No service-area / FAQ / blog content** — meaning there's no on-page content targeting the dozens of long-tail searches buyers actually type ("Sembari goat price Tamil Nadu", "Sanda Seval rooster for sale", "Rajapalayam dog puppy price", "Naatu koli eggs wholesale").
8. **No Google Search Console / Bing Webmaster verification, no Google Business Profile mentioned anywhere** — meaning local map-pack ranking (the single highest-impact channel for "near me" farm searches) is currently unclaimed.
9. **Single large JS bundle, no route-based code splitting** — every visitor downloads the code for every page (forms, maps, all animal galleries) even when they only want to see one category.

Everything below fixes these, in priority order.

---

## 3. Target keyword map (assign these as primary/secondary per page — use naturally, never stuff)

| Page | Primary keyword(s) | Secondary / long-tail keywords |
|---|---|---|
| Home `/` | `KSK Kannialazhann Farm`, `native livestock farm Rajapalayam` | `goat farm Tamil Nadu`, `dog farm Gopalapuram`, `HF cow farm Rajapalayam`, `country chicken farm Tamil Nadu` |
| `/category/goats` | `goat farm Rajapalayam`, `Sembari goat for sale` | `native goat Tamil Nadu price`, `goat ₹600 per kg Rajapalayam`, `Sembari Pottu Aadu`, `Mayilambadi goat`, `goat for sale near Rajapalayam`, `bulk goat order Tamil Nadu function` |
| `/category/dogs` | `Rajapalayam dog for sale`, `native Tamil dog breeds farm` | `Kanni dog Tirunelveli`, `Kombai dog Theni`, `Chippiparai dog price`, `Tamil hunting dog breeds`, `Rajapalayam puppy for sale Tamil Nadu` |
| `/category/cows` | `HF cow for sale Tamil Nadu`, `dairy cow farm Rajapalayam` | `Holstein Friesian cow Tamil Nadu price`, `pregnant HF cow for sale`, `milking cow farm Gopalapuram` |
| `/category/poultry` | `Naatu Koli farm Rajapalayam`, `Sanda Seval rooster for sale` | `country chicken Tamil Nadu`, `fighting rooster farm Tamil Nadu`, `Sanda Koli for sale`, `Red Sonali chicken`, `rooster farm Rajapalayam` |
| `/category/eggs` | `farm fresh eggs Rajapalayam`, `Naatu Koli eggs wholesale` | `country chicken eggs Tamil Nadu`, `free range eggs near Rajapalayam`, `farm eggs delivery Tamil Nadu` |
| Each `/animal/:slug` | the animal's own name + breed (e.g. `Rajapalayam dog puppy price`) | origin town + "for sale" + "Tamil Nadu" |
| `/contact` | `KSK Kannialazhann Farm contact`, `livestock farm Rajapalayam phone number` | `buy goat WhatsApp Rajapalayam`, `farm visit Gopalapuram` |
| New `/areas-we-serve` (Phase 4) | `livestock delivery Tamil Nadu` | `Sivakasi`, `Srivilliputhur`, `Virudhunagar`, `Sattur`, `Tenkasi`, `Tirunelveli`, `Madurai`, `Sankarankovil` — one section each, see Phase 4.4 |

---

## 4. PHASE 1 — Technical SEO foundation

### 1.1 `robots.txt`
Create `frontend/public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://kannialazhannfarm.in/sitemap.xml
```

### 1.2 Auto-generated `sitemap.xml`
Create `frontend/scripts/generate-sitemap.mjs` that reads `CATEGORIES` and `ANIMALS` directly from `src/data/animals.js` (it's plain ESM with no JSX, so Node can import it natively) and writes `frontend/public/sitemap.xml`:

```js
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { CATEGORIES, ANIMALS } from "../src/data/animals.js";

const BASE_URL = "https://kannialazhannfarm.in";
const today = new Date().toISOString().split("T")[0];

const routes = [
  { path: "/", priority: "1.0" },
  { path: "/contact", priority: "0.6" },
  ...CATEGORIES.map((c) => ({ path: `/category/${c.slug}`, priority: "0.8" })),
  ...ANIMALS.map((a) => ({ path: `/animal/${a.slug}`, priority: "0.7" })),
];

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(
  fileURLToPath(new URL("../public/sitemap.xml", import.meta.url)),
  xml
);
console.log(`✅ sitemap.xml generated with ${routes.length} URLs`);
```

In `frontend/package.json`, add:
```json
"scripts": {
  "generate-sitemap": "node scripts/generate-sitemap.mjs",
  "prebuild": "node scripts/generate-sitemap.mjs",
  "build": "craco build"
}
```
`prebuild` runs automatically before `build` (npm/yarn lifecycle convention) so the sitemap is always fresh and gets copied into `build/` along with the rest of `public/`.

### 1.3 `manifest.json` + favicons
1. Using `frontend/public/animals/Logos.jpg` as the source image, generate a favicon set (favicon.ico, 16x16, 32x32, 180x180 apple-touch-icon, 192x192 and 512x512 PNG). If you have image tooling available (`sharp`, or any installed CLI), generate them into `frontend/public/`. If no image tooling is available in this environment, create the `manifest.json` and `<link>` tags now and leave a clear `TODO` comment + tell the user to drop the generated icon files into `frontend/public/` (they can use https://realfavicongenerator.net with the Logos.jpg file).
2. Create `frontend/public/manifest.json`:
```json
{
  "short_name": "KSK Kannialazhann Farm",
  "name": "KSK & Kannialazhann Farm — Native Tamil Livestock",
  "icons": [
    { "src": "favicon.ico", "sizes": "64x64 32x32 24x24 16x16", "type": "image/x-icon" },
    { "src": "logo192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "logo512.png", "type": "image/png", "sizes": "512x512" }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#1f4d2b",
  "background_color": "#f9f8f6"
}
```
3. In `frontend/public/index.html`, replace the placeholder comments with real tags inside `<head>`:
```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<link rel="apple-touch-icon" href="%PUBLIC_URL%/apple-touch-icon.png" />
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```
4. Change `<meta name="theme-color" content="#000000" />` to `content="#1f4d2b"` (brand green).

### 1.4 Canonical & locale fixes in `index.html`
- Add `<html lang="en-IN">` instead of `lang="en"`.
- Add `<meta property="og:locale" content="en_IN" />`.
- Add a static fallback canonical: `<link rel="canonical" href="https://kannialazhannfarm.in/" />` (the `useSEO` hook will override this per-route after hydration — having a static one ensures the bare HTML always has *a* canonical even if JS fails).
- Replace the OG/Twitter image path `/animals/Kanni Dog 2.jpg` with the renamed file from Phase 5 (`/animals/kanni-dog-rajapalayam-tamilnadu.jpg`) once renaming is done — do this edit last, after Phase 5.

### 1.5 Real 404 handling (remove the soft-404)
Create `frontend/src/pages/NotFoundPage.jsx`:
```jsx
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";

export default function NotFoundPage() {
  useSEO({
    title: "Page Not Found — KSK & Kannialazhann Farm",
    description: "This page doesn't exist. Browse our goats, dogs, cows, poultry and eggs instead.",
  });
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5 pt-32">
      <p className="label-eyebrow text-[#1f4d2b]">404</p>
      <h1 className="font-serif-display text-4xl md:text-6xl mt-3 text-[#2d2d2a]">
        That page wandered off the farm.
      </h1>
      <Link to="/" className="mt-8 inline-flex px-6 py-4 rounded-full bg-[#1f4d2b] text-[#f4c20d] font-semibold">
        Back to the farm
      </Link>
    </div>
  );
}
```
In `frontend/src/App.js`, change:
```jsx
<Route path="*" element={<Home />} />
```
to:
```jsx
<Route path="*" element={<NotFoundPage />} />
```
and import it. Add `<meta name="robots" content="noindex">` behavior for this page by extending `useSEO` to accept a `noindex` boolean (see Phase 3.1) and pass `noindex: true` here.

### 1.6 Caching & security headers
In `frontend/vercel.json`, add a `headers` block so static assets are cached aggressively (helps repeat-visit performance, a Core Web Vitals factor) while HTML is always revalidated:
```json
{
  "version": 2,
  "buildCommand": "yarn build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/animals/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/(.*)\\.(xml|json|txt)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=3600" }]
    }
  ]
}
```

**Definition of Done — Phase 1:** `robots.txt`, `sitemap.xml`, `manifest.json`, and favicon files exist in the built output; `index.html` has manifest/icon links and `en-IN` locale; visiting a non-existent route shows the new 404 page; `vercel.json` has caching headers.

---

## 5. PHASE 2 — Make the SPA actually crawlable (prerendering)

This is the single highest-impact fix. It makes every route ship with its **real, final HTML** (title, meta tags, visible text, JSON-LD) baked in — so Google, Bing, and WhatsApp/Facebook/Instagram link previews all see correct content without running JavaScript.

### 2.1 Install `react-snap`
```bash
cd frontend
yarn add -D react-snap
```

### 2.2 Configure it in `frontend/package.json`
```json
"scripts": {
  "build": "craco build",
  "postbuild": "react-snap"
},
"reactSnap": {
  "source": "build",
  "minifyHtml": { "collapseWhitespace": false, "removeComments": false },
  "puppeteerArgs": ["--no-sandbox", "--disable-setuid-sandbox"],
  "skipThirdPartyRequests": true,
  "include": [
    "/",
    "/contact",
    "/category/cows",
    "/category/goats",
    "/category/dogs",
    "/category/poultry",
    "/category/eggs",
    "/animal/chippiparai",
    "/animal/kanni",
    "/animal/kombai",
    "/animal/rajapalayam",
    "/animal/hf-cow",
    "/animal/goat",
    "/animal/sembari-pottu",
    "/animal/sembari-mayilambadi",
    "/animal/naatu-koli",
    "/animal/red-sonali",
    "/animal/sanda-koli",
    "/animal/sanda-seval",
    "/animal/farm-eggs"
  ]
}
```
The `include` list is hardcoded here deliberately (react-snap needs concrete URLs to visit) — **if you add a new animal to `data/animals.js`, you must also add its `/animal/:slug` URL to this list.** Leave a comment above the list saying exactly that.

`postbuild` runs automatically after `build` completes (npm/yarn lifecycle). Do not rename the script keys.

### 2.3 Verify after building
```bash
yarn build
```
Then check that `frontend/build/category/goats/index.html` and `frontend/build/animal/rajapalayam/index.html` etc. exist and, when opened in a text editor, contain the **fully rendered HTML** (visible `<h1>Goats.</h1>` text, the real `<title>`, etc.) — not an empty `<div id="root">`.

### 2.4 Known risk / fallback
Puppeteer's bundled Chromium download can occasionally fail or time out in constrained CI/build environments. If `yarn build` fails specifically at the `postbuild` (react-snap) step on Vercel:
- First try adding `"puppeteerArgs": ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]`.
- If it still fails, fall back to running `yarn build` locally (or in a GitHub Action) and committing the prerendered `build/` output, or deploying via `vercel --prebuilt`.
- The long-term gold-standard fix (flag this to the project owner as a future investment, do not attempt mid-task) is migrating `frontend/` to **Next.js App Router**, which gives true SSR/SSG without any Puppeteer dependency. Don't do this now — it's a multi-day rewrite — but note it in your final summary as the recommended Phase 8.

### 2.5 Clean up the dead code
Delete `frontend/api/og.js` — once every route is prerendered with correct meta tags baked into its own static HTML, this serverless function (which was never wired into `vercel.json` anyway) is redundant and just adds maintenance burden.

**Definition of Done — Phase 2:** Every URL in the `include` list produces a static HTML file with real content and correct `<title>`/meta tags when you inspect `frontend/build/`. `api/og.js` removed.

---

## 6. PHASE 3 — Structured data (JSON-LD)

### 3.1 Extend `useSEO` to support JSON-LD and noindex
Rewrite `frontend/src/hooks/useSEO.js`:
```jsx
import { useEffect } from "react";

const DEFAULT_OG = "/animals/kanni-dog-rajapalayam-tamilnadu.jpg";

export default function useSEO({ title, description, image, url, jsonLd, noindex }) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (selector, attr, value) => {
      if (!value) return;
      let tag = document.head.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        const [k, v] = selector.replace(/[\[\]"]/g, "").split("=");
        tag.setAttribute(k, v);
        document.head.appendChild(tag);
      }
      tag.setAttribute(attr, value);
    };

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }
    if (title) {
      setMeta('meta[property="og:title"]', "content", title);
      setMeta('meta[name="twitter:title"]', "content", title);
    }
    const imgUrl = image || DEFAULT_OG;
    const absImg = imgUrl.startsWith("http") ? imgUrl : `${window.location.origin}${imgUrl}`;
    setMeta('meta[property="og:image"]', "content", absImg);
    setMeta('meta[name="twitter:image"]', "content", absImg);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[property="og:type"]', "content", "website");

    const pageUrl = url || window.location.href.split("?")[0].split("#")[0];
    setMeta('meta[property="og:url"]', "content", pageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    setMeta('meta[name="robots"]', "content", noindex ? "noindex, nofollow" : "index, follow");

    let script = document.getElementById("page-jsonld");
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.id = "page-jsonld";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, image, url, jsonLd, noindex]);
}
```

### 3.2 Sitewide `LocalBusiness` schema (static, always present)
Add this directly inside `<head>` in `frontend/public/index.html` — it must be present even if JavaScript fails, since it never changes per route:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "KSK & Kannialazhann Farm",
  "image": "https://kannialazhannfarm.in/animals/kanni-dog-rajapalayam-tamilnadu.jpg",
  "telephone": ["+917339598737", "+917305644912", "+917339026424"],
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rajapalayam",
    "addressRegion": "Tamil Nadu",
    "postalCode": "626136",
    "addressCountry": "IN"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 9.3654, "longitude": 77.6233 },
  "url": "https://kannialazhannfarm.in",
  "areaServed": [
    "Rajapalayam", "Gopalapuram", "Srivilliputhur", "Sivakasi", "Virudhunagar",
    "Sattur", "Tirunelveli", "Sankarankovil", "Madurai", "Tamil Nadu"
  ],
  "sameAs": [
    "https://www.instagram.com/kannialazhann",
    "https://youtube.com/@kannialazhann"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "07:00",
    "closes": "21:00"
  }
}
</script>
```

### 3.3 `Product` schema per animal page
In `frontend/src/pages/AnimalDetailPage.jsx`, build a `jsonLd` object and pass it to `useSEO`:
```jsx
const priceMatch = animal.priceNote.match(/₹\s?(\d+)/);
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${animal.name} (${animal.tamil})`,
  description: animal.description,
  image: `https://kannialazhannfarm.in${animal.hero}`,
  category: category?.name,
  brand: { "@type": "Brand", name: "KSK & Kannialazhann Farm" },
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: priceMatch ? priceMatch[1] : undefined,
    availability: "https://schema.org/InStock",
    areaServed: "Tamil Nadu",
    url: `https://kannialazhannfarm.in/animal/${animal.slug}`,
  },
};

useSEO({
  title: `${animal.name} (${animal.tamil}) — ${animal.tagline} | KSK & Kannialazhann Farm`,
  description: `${animal.description.slice(0, 155)}…`,
  image: animal.hero,
  jsonLd,
});
```
(If `priceMatch` is undefined, omit the `price` key entirely rather than sending `undefined` — Google requires either a valid price or the `priceSpecification`/contact-for-price pattern; for "contact for pricing" items, drop `offers` to a simpler `{"@type":"Offer","availability":"https://schema.org/InStock","priceCurrency":"INR"}` without a price field, which is valid but won't generate a price-rich result — that's acceptable and accurate, since the real price is "contact us.")

### 3.4 `BreadcrumbList` schema + visible breadcrumbs UI
Create `frontend/src/components/Breadcrumbs.jsx`:
```jsx
import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[12px] text-[#5c5c5c] flex gap-2 flex-wrap">
      {items.map((it, i) => (
        <span key={it.href} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {i === items.length - 1 ? (
            <span className="text-[#1f4d2b] font-semibold">{it.label}</span>
          ) : (
            <Link to={it.href} className="hover:underline">{it.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
```
Render it near the top of `CategoryPage.jsx` (`Home → {Category}`) and `AnimalDetailPage.jsx` (`Home → {Category} → {Animal}`). Build the matching `BreadcrumbList` JSON-LD alongside the `Product`/page `jsonLd` you pass to `useSEO` (merge as an array: `jsonLd: [productSchema, breadcrumbSchema]` — `useSEO` already `JSON.stringify`s whatever it's given, so an array of schema objects works as a valid multi-entity JSON-LD block).

### 3.5 `FAQPage` schema (built together with Phase 4.5 content)
Once you add FAQ content per category (Phase 4.5), wrap it in `FAQPage` JSON-LD and pass via the same `jsonLd` array on `CategoryPage.jsx`.

**Definition of Done — Phase 3:** Validate every page type (home, category, animal) with Google's Rich Results Test (https://search.google.com/test/rich-results) against the prerendered HTML — zero errors, `LocalBusiness`, `Product`, `BreadcrumbList`, and `FAQPage` all detected.

---

## 7. PHASE 4 — On-page content & keyword optimization

### 4.1 Home page title/meta
In `frontend/src/pages/Home.jsx`, update the `useSEO` call:
```jsx
useSEO({
  title: "KSK & Kannialazhann Farm | Goat, Dog, HF Cow & Poultry Farm in Rajapalayam, Gopalapuram, Tamil Nadu",
  description:
    "Buy native Tamil dogs (Rajapalayam, Kanni, Kombai, Chippiparai), HF dairy cows, Sembari goats (₹600/kg), Naatu Koli & Sanda Seval roosters (₹600/kg) and farm-fresh eggs. Family farm in Gopalapuram, Rajapalayam — delivering across Tamil Nadu.",
  image: "/animals/kanni-dog-rajapalayam-tamilnadu.jpg",
});
```
Also update the static fallback `<title>` and `<meta name="description">` in `frontend/public/index.html` to match exactly (keeps the pre-hydration HTML and the post-hydration HTML identical, which is good practice and avoids any flash-of-different-title).

### 4.2 Category page title/meta template
In `CategoryPage.jsx`, make the template explicitly mention Tamil Nadu + the price + the breed list:
```jsx
useSEO({
  title: category
    ? `${category.name} for Sale in Rajapalayam & Tamil Nadu (${category.tamil}) — KSK & Kannialazhann Farm`
    : "KSK & Kannialazhann Farm",
  description: category
    ? `${category.blurb} Direct from our farm in Gopalapuram, Rajapalayam — delivering across Tamil Nadu. ${category.price ? "Live weight " + category.price + "." : ""}`
    : undefined,
  image: category?.cover,
  jsonLd: [productListSchema, breadcrumbSchema, faqSchema], // see 3.4 / 3.5
});
```

### 4.3 Animal page title/meta template
Already shown in 3.3 — make sure the animal's **origin town** is in the title where available (e.g. Kanni → Tirunelveli, Kombai → Theni, Rajapalayam → Rajapalayam itself) since people search "[breed] dog [town]".

### 4.4 New page: `/areas-we-serve`
Create `frontend/src/pages/AreasWeServePage.jsx`. This single, well-written page is how you capture "all over Tamil Nadu" search intent **without** creating dozens of thin near-duplicate city pages (which Google penalizes as doorway pages). Structure:
- H1: "We Deliver Native Livestock Across Tamil Nadu"
- One short, genuinely different paragraph per nearby town/district actually served — e.g. Srivilliputhur, Sivakasi, Virudhunagar, Sattur, Tenkasi, Sankarankovil, Tirunelveli, Madurai — mention real distance/travel context, what's popular there (e.g. "Sivakasi households often order Naatu Koli eggs in bulk for functions"), and a WhatsApp CTA per region using `CONTACTS.whatsappPrimary` / `whatsappCowGoat` as appropriate.
- Add the route to `App.js`, to the sitemap generator's `staticRoutes` array, to the react-snap `include` list, and link to it from the Footer and Home page (internal linking signal).
- Give it its own `useSEO` call with title `"Livestock Delivery Across Tamil Nadu | KSK & Kannialazhann Farm"`.

### 4.5 FAQ content per category (feeds Phase 3.5 schema)
Add a `faqs` array to each entry in `CATEGORIES` inside `frontend/src/data/animals.js`, e.g. for goats:
```js
faqs: [
  { q: "What is the price of Sembari goat in Tamil Nadu?", a: "Our native goats are sold live-weight at ₹600/kg, including Sembari Pottu Aadu and Mayilambadi lines. Call or WhatsApp for current availability." },
  { q: "Do you deliver goats outside Rajapalayam?", a: "Yes — we regularly supply to Srivilliputhur, Sivakasi, Virudhunagar and surrounding Tamil Nadu districts. See our Areas We Serve page." },
  { q: "Can I buy goats in bulk for a function or festival?", a: "Yes, bulk orders for weddings and festivals are welcome — contact us in advance to reserve stock." },
],
```
Write 3–5 genuinely useful, differentiated FAQs per category (goats, dogs, cows, poultry, eggs) — these directly target long-tail voice/Google searches and qualify the page for FAQ rich snippets. Render them as a visible accordion section on `CategoryPage.jsx` (use the existing `@radix-ui/react-accordion` dependency already installed) — content must be visible, not just in JSON-LD (Google requires FAQ content to be visible on the page, not hidden-only schema).

### 4.6 Optional but recommended: `/blog` or `/guides` content hub
To build topical authority and rank for informational queries that feed buying intent ("how to choose a Rajapalayam puppy", "Sembari vs Mayilambadi goat", "Naatu Koli vs broiler nutrition", "how much milk does an HF cow give"), scaffold a simple `/guides` index + `/guides/:slug` route backed by a new `src/data/guides.js` file (same pattern as `animals.js`). This is a content-creation task for the farm owner over time — your job here is just to build the route/template/schema (`Article` JSON-LD) so it's ready to receive content. Do not invent fake article content yourself; leave 2–3 clearly-marked placeholder drafts with `TODO: owner to write real content` only if asked to.

### 4.7 Internal linking
- Footer: add links to `/areas-we-serve` and every category.
- Home: ensure every category card and every featured animal links through (already does).
- Category pages: ensure breadcrumbs (4.3.4) link back to Home and forward to each animal.

**Definition of Done — Phase 4:** Every category has visible FAQ content + schema; `/areas-we-serve` exists, is linked from Footer/Home, is in the sitemap and react-snap include list; all title/meta tags mention Tamil Nadu service area, not just Rajapalayam.

---

## 8. PHASE 5 — Image SEO & performance

### 5.1 Rename every image file to descriptive, keyword-rich, space-free kebab-case
Apply this exact mapping (rename the physical files in `frontend/public/animals/` **and** update every reference in `frontend/src/data/animals.js`, `Home.jsx`, `Footer.jsx`, `Navbar.jsx`, and `index.html`):

| Current filename | New filename |
|---|---|
| `Chippiparai Dog.jpg` | `chippiparai-dog-tamilnadu.jpg` |
| `Chippiparai Dog 2.jpg` | `chippiparai-dog-side-view-tamilnadu.jpg` |
| `Chippiparai Puppies.jpg` | `chippiparai-puppies-for-sale.jpg` |
| `Kanni Dog.jpg` | `kanni-dog-tirunelveli.jpg` |
| `Kanni Dog 2.jpg` | `kanni-dog-rajapalayam-tamilnadu.jpg` |
| `Kombai dog.jpg` | `kombai-dog-theni-tamilnadu.jpg` |
| `Rajapalayam Dog.jpg` | `rajapalayam-dog-for-sale.jpg` |
| `Rajapalayam puppies.jpg` | `rajapalayam-puppies-for-sale-tamilnadu.jpg` |
| `HF Cow.jpg` | `hf-cow-for-sale-tamilnadu.jpg` |
| `HF Cow2.jpg` | `hf-dairy-cow-rajapalayam.jpg` |
| `Goat.jpg` | `native-goat-for-sale-rajapalayam.jpg` |
| `Sembari ( pottu aadu ).jpg` | `sembari-pottu-aadu-goat-tamilnadu.jpg` |
| `Sembari(Mayilambadi).jpg` | `sembari-mayilambadi-goat-tamilnadu.jpg` |
| `Naatu koli.jpg` | `naatu-koli-country-chicken-tamilnadu.jpg` |
| `Naatu Koli Eggs.jpg` | `naatu-koli-farm-fresh-eggs.jpg` |
| `Red Sonali.jpg` | `red-sonali-chicken-tamilnadu.jpg` |
| `Sanda koli.jpg` | `sanda-koli-game-fowl-tamilnadu.jpg` |
| `Sanda Seval.jpg` | `sanda-seval-fighting-rooster-tamilnadu.jpg` |
| `Logos.jpg` | `ksk-kannialazhann-farm-logo.jpg` |

Use `git mv` for each so history is preserved, then do a project-wide search-and-replace of the old path strings.

### 5.2 Compress and convert to WebP with JPG fallback
For each image: produce a `.webp` version at ~80% quality, and re-encode the `.jpg` fallback at reasonable compression (target **under 150KB** per image, currently several are 600KB–1.1MB). If `sharp` or `imagemin` is available in the environment, script this conversion; otherwise document the exact command for the owner to run locally:
```bash
npx @squoosh/cli --webp '{"quality":80}' --mozjpeg '{"quality":75}' frontend/public/animals/*.jpg -d frontend/public/animals/optimized
```
Update image references to use a `<picture>` element with WebP + JPG fallback, e.g.:
```jsx
<picture>
  <source srcSet="/animals/kanni-dog-rajapalayam-tamilnadu.webp" type="image/webp" />
  <img src="/animals/kanni-dog-rajapalayam-tamilnadu.jpg" alt="Kanni dog puppy from Tirunelveli at KSK Farm, Rajapalayam" />
</picture>
```

### 5.3 Rewrite every `alt` attribute to be descriptive and location-aware
Replace generic alts like `alt={a.name}` with a template combining breed + tamil name + location, e.g. in `CategoryPage.jsx` and `AnimalDetailPage.jsx`:
```jsx
alt={`${a.name} (${a.tamil}) for sale at KSK & Kannialazhann Farm, Rajapalayam`}
```
Avoid keyword-stuffing the same alt text identically across many images — vary naturally per breed/origin (e.g. mention Tirunelveli for Kanni, Theni for Kombai).

### 5.4 Loading strategy & explicit dimensions
- The Home page hero image (`Kanni Dog 2` / renamed) is the Largest Contentful Paint element — set `loading="eager"` and add `fetchPriority="high"`, and give the `<img>` explicit `width`/`height` (or `aspect-ratio` via the existing Tailwind `aspect-[...]` wrapper, which is already in place — verify it prevents layout shift).
- Every other `<img>` site-wide (category grids, animal cards, gallery thumbnails) should have `loading="lazy"` added explicitly (currently relying on browser defaults inconsistently).

### 5.5 Route-based code splitting
In `frontend/src/App.js`, convert page imports to `React.lazy` + `Suspense` so each route's JS is fetched only when visited:
```jsx
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AnimalDetailPage = lazy(() => import("./pages/AnimalDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
```
Wrap `<Routes>` in `<Suspense fallback={<div className="min-h-screen" />}>`. Verify this doesn't break `react-snap` (it shouldn't — Puppeteer waits for network idle, but explicitly test the prerendered output still contains full content after this change, since `Suspense` + lazy-loaded chunks can occasionally need a slightly longer `react-snap` wait — increase `"waitFor"` in the `reactSnap` config to e.g. `1000` ms if any prerendered page comes out empty).

**Definition of Done — Phase 5:** All image files renamed and referenced consistently with no spaces in any filename; all images under ~150KB or served as WebP; every `<img>` has a descriptive, non-duplicate `alt`; Lighthouse Performance score (run via Chrome DevTools or `npx lighthouse https://kannialazhannfarm.in --view`) is 90+ on mobile for the homepage.

---

## 9. PHASE 6 — Local SEO & off-page (manual checklist — flag to the owner, not code)

These cannot be done by editing the repo — list them clearly in your final summary as action items for Shang:

1. **Claim and fully fill out a Google Business Profile** for "KSK & Kannialazhann Farm" at the exact address used in the schema (Section 3.2). Category: "Farm" / "Livestock breeder" (pick the closest available). Add all phone numbers, hours, photos (use the same renamed/optimized images), and the website URL. This is the single biggest local-ranking lever available — more impactful than any on-page change.
2. **Get the NAP (Name, Address, Phone) identical** everywhere it appears online: Google Business Profile, Instagram bio, YouTube channel "About" page, and any directory listing (JustDial, Sulekha, IndiaMART) — inconsistent NAP confuses Google's local ranking algorithm.
3. **Actively collect Google reviews** from buyers after each sale (a simple WhatsApp follow-up message with the Google review link works well) — review count/recency is a major local ranking factor and currently there's no review schema or visible social proof on the site at all.
4. **Get backlinks** from: the Instagram bio link, the YouTube channel description/links, and any local Tamil agriculture or pet-breeder forums/blogs/YouTube videos that mention the farm — ask for a link to `kannialazhannfarm.in`, not just a text mention.
5. **List on free Indian business directories** (JustDial, Sulekha, IndiaMART, Yellow Pages India) with the same NAP and a link to the site.

---

## 10. PHASE 7 — Submission & monitoring (do these once Phases 1–5 are deployed)

1. Verify the domain in **Google Search Console** (DNS TXT record or HTML file method), submit `https://kannialazhannfarm.in/sitemap.xml`, and request indexing for the homepage + each category page manually via the URL Inspection tool to speed up initial crawl.
2. Verify in **Bing Webmaster Tools** as well (can import directly from Search Console) — Bing also powers some assistant/voice search results.
3. Add the Search Console verification `<meta>` tag to `frontend/public/index.html` if using the HTML-tag method.
4. Re-run Google's **Rich Results Test** and **Mobile-Friendly Test** against the live deployed URLs (not localhost) after deploying, for home + one category + one animal page.
5. Set a recurring reminder (monthly) to check Search Console's "Pages" report for any pages marked "Crawled — not indexed" or "Discovered — not indexed," and the "Core Web Vitals" report for regressions.

---

## 11. Final Definition of Done — self-verify before reporting back

- [ ] `robots.txt`, `sitemap.xml` (auto-generated from `animals.js`), `manifest.json`, favicons all present in `frontend/build/` after a clean `yarn build`.
- [ ] `frontend/build/category/*/index.html` and `frontend/build/animal/*/index.html` each contain real prerendered text content and a unique `<title>` — verified by opening at least 3 of them in a text editor.
- [ ] `frontend/api/og.js` removed.
- [ ] `LocalBusiness` JSON-LD present in raw `index.html`; `Product` + `BreadcrumbList` JSON-LD present in prerendered animal pages; `FAQPage` JSON-LD present in prerendered category pages — all pass Google's Rich Results Test with zero errors.
- [ ] Visiting an invalid URL returns the new `NotFoundPage`, not the homepage.
- [ ] `/areas-we-serve` page exists, is linked from Footer + Home, is in the sitemap and the react-snap `include` list.
- [ ] Every category has 3–5 visible FAQs.
- [ ] All image files renamed (no spaces, descriptive, kebab-case), under ~150KB or served as WebP, with unique descriptive `alt` text.
- [ ] Lighthouse mobile Performance + SEO scores ≥ 90 on the homepage.
- [ ] Routes are code-split with `React.lazy`/`Suspense` and the prerendered build still contains full content after this change.
- [ ] A short written summary listing the Phase 6 manual action items (Google Business Profile, reviews, backlinks, directory listings) is given back to the project owner, since those cannot be completed by code changes alone.

---

## 12. What I'm intentionally NOT asking you to do right now

- **Full Next.js migration** — the gold-standard fix for crawlability, but a multi-day rewrite. Only attempt this if Phase 2's `react-snap` approach proves unworkable on Vercel after troubleshooting (Section 2.4).
- **Multi-language `hreflang` setup** — not needed; this is a single-region, mixed English/Tamil page (Tamil names are already inline), not separate localized URLs.
- **Creating dozens of city-specific landing pages** (e.g. `/goat-farm-madurai`, `/goat-farm-sivakasi`) — this is a doorway-page pattern Google actively penalizes. The single `/areas-we-serve` page (Phase 4.4) plus natural mentions in existing content is the correct approach for "all over Tamil Nadu" intent.

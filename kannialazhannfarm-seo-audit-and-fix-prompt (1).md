# Kannialazhann Farm (KSK Farm) — SEO Audit v2 (codebase-verified)
**Site:** https://www.kannialazhannfarm.in/
**Stack:** Create React App + CRACO, react-router-dom, deployed on Vercel
**Date:** June 22, 2026
**This version supersedes the earlier audit** — that one was based only on the live fetch. This one is based on the actual `kskandkannialazhannfarms-main` zip, and the findings are different and much more specific.

---

## 1. The real headline: this isn't a "missing SEO work" problem

You (or a previous agent) already did the SEO work. `SEO-IMPLEMENTATION-COMPLETE.md` in the repo shows Phases 1–4 done: robots.txt, an auto-generated sitemap, LocalBusiness/Product/Breadcrumb/FAQ JSON-LD, a real 404 page, the `/areas-we-serve` page, code splitting — it's all genuinely in the source code.

**None of it is reliably reaching Google**, because of four specific, fixable bugs in how the build/deploy pipeline handles it. This is good news: it means the fix is technical and contained, not "write more content."

---

## 2. Verified root causes

### 🔴 Root cause #1 — Prerendering is silently failing, and it's masked on purpose

`frontend/package.json`:
```json
"postbuild": "react-snap || echo 'Note: react-snap prerendering skipped. It will run on Vercel deployment (Linux environment).'"
```
The `|| echo ...` means: **if react-snap crashes for any reason, the build still reports success and deploys the un-prerendered SPA shell.** That's exactly what's live right now — I fetched `https://www.kannialazhannfarm.in/` directly and the raw HTML body is just:
```
You need to enable JavaScript to run this app.
```
No rendered text, no headings, no links. That matches an un-prerendered CRA build, not a successful react-snap output.

The implementation doc itself contains the false assumption that caused this to go unnoticed:
> *"If it times out, Vercel will show a warning but the deploy will still succeed... This is acceptable and has no negative impact on SEO."*

That's incorrect — a failed prerender means Google gets the empty shell, which is the single biggest reason impressions are stuck near zero. **Vercel's serverless build containers are a known unreliable environment for Puppeteer/Chromium** (missing system libraries like `libnss3`/`libatk` are common headless-Chrome failures there) — that's very likely what's happening on every deploy.

### 🔴 Root cause #2 — Your canonical/og:url tags fall back to `window.location.href`, and every page relies on that fallback

`frontend/src/hooks/useSEO.js`:
```js
const pageUrl = url || window.location.href.split("?")[0].split("#")[0];
...
canonical.setAttribute("href", pageUrl);
setMeta('meta[property="og:url"]', "content", pageUrl);
```
I checked every page component that calls `useSEO()` — **`Home.jsx`, `CategoryPage.jsx`, `AnimalDetailPage.jsx`, `ContactPage.jsx`, `AreasWeServePage.jsx`, `NotFoundPage.jsx` — none of them pass a `url` prop.** So canonical/og:url always falls back to whatever host is currently loading the page.

This is bad in two compounding ways:
- **If react-snap ever does succeed:** it crawls your build via a local static server (typically `http://localhost:<random-port>/...`). Since this canonical logic runs client-side JS during that crawl, the prerendered static HTML it bakes out almost certainly has `<link rel="canonical" href="http://localhost:45678/category/dogs">` — a localhost URL with zero meaning to Google, baked permanently into the file that gets deployed. That alone can suppress indexing even if everything else is fixed.
- **Even without prerendering:** a canonical that always mirrors the current host does nothing to consolidate www vs non-www — it just agrees with whatever URL it's already on, which is the opposite of what canonical is for.

### 🟡 Root cause #3 — Every static SEO signal in the code points to the non-www apex, but the live site serves on www

Confirmed by grep:
- `frontend/scripts/generate-sitemap.mjs`: `const BASE_URL = "https://kannialazhannfarm.in";`
- `frontend/public/sitemap.xml`: every `<loc>` uses `https://kannialazhannfarm.in/...`
- `frontend/public/robots.txt`: `Sitemap: https://kannialazhannfarm.in/sitemap.xml`
- `frontend/public/index.html`: `<link rel="canonical" href="https://kannialazhannfarm.in/" />`

But fetching both `https://kannialazhannfarm.in/` and `https://www.kannialazhannfarm.in/` resolves to the same content under the **www** host, and your GSC property (top-left of the screenshot) is registered as a **www URL-prefix property.**

So: your sitemap and robots.txt declare URLs under a host that isn't the one your GSC property is verified for. Depending on how the apex→www redirect is actually configured at the DNS/Vercel level, this can mean Search Console can't fully reconcile the submitted sitemap with the verified property, or that the redirect direction itself is the opposite of what every file in the code assumes.

**Action:** Check Vercel → Project → Domains, confirm the actual redirect direction, then pick ONE host and make everything agree (see fix list below — easiest path is usually to keep www as primary since GSC is already verified there, and update the code to match, rather than fighting the existing GSC property).

### 🟡 Root cause #4 — Two conflicting `vercel.json` files

- Root: `vercel.json` — legacy v1 `builds`/`routes` syntax, routes everything to `frontend/build/index.html`.
- `frontend/vercel.json` — modern v2 `rewrites`/`headers` syntax, with proper long-cache headers for `/static/` and `/animals/`.

Only one of these is actually used, depending on the Vercel project's **Root Directory** setting (Project Settings → General). If Root Directory is the repo root, the root `vercel.json` wins and **all the cache headers in `frontend/vercel.json` are dead code, never applied** — meaning your images and JS bundles may not be getting the long-lived caching you think they are. If Root Directory is `frontend`, it's the reverse and the root file is dead weight. Either way, having both is a real conflict — delete one.

---

## 3. What's already genuinely good (don't redo this)

- LocalBusiness JSON-LD in `index.html` with full address, geo coordinates, phone numbers, area served — solid.
- Per-category FAQ schema + visible accordion UI — solid.
- Product + Breadcrumb schema generated per animal/category page — solid.
- `/areas-we-serve` page targeting Sivakasi, Srivilliputhur, Virudhunagar, Sattur, Tirunelveli, Madurai, Sankarankovil — solid, and linked from Footer/Home.
- Sitemap auto-regenerates from `src/data/animals.js` on every build (21 URLs) — solid mechanism, just pointed at the wrong host.
- A real 404 page with proper `noindex` instead of a soft-404 — solid.

---

## 4. Implementation prompt for the Copilot agent

> Copy everything below this line into Copilot as the task brief. File paths are relative to repo root.

---

### TASK: Fix the SEO pipeline so prerendering and canonical signals actually reach production

#### Step 1 — Decide and lock the canonical host
Confirm in the Vercel dashboard (Domains tab) which direction the redirect currently runs. **Recommended: keep `www.kannialazhannfarm.in` as primary** (GSC is already verified there, and that's what's actually serving live), with `kannialazhannfarm.in` (apex) 301-redirecting to it. Then:

- `frontend/scripts/generate-sitemap.mjs`: change `BASE_URL` to `"https://www.kannialazhannfarm.in"`.
- `frontend/public/robots.txt`: change the `Sitemap:` line to `https://www.kannialazhannfarm.in/sitemap.xml`.
- `frontend/public/index.html`: change `<link rel="canonical" href="https://kannialazhannfarm.in/" />` to the www version. Also update the LocalBusiness JSON-LD `"url"` and `"image"` fields to www.
- Regenerate `public/sitemap.xml` (`yarn generate-sitemap`) and resubmit it in GSC after deploy.

#### Step 2 — Fix the canonical/og:url fallback bug in `useSEO.js`
Add a constant for the production origin and use it instead of `window.location.href`:

```js
// near the top of useSEO.js
const SITE_URL = "https://www.kannialazhannfarm.in";
```

Then in every page component that calls `useSEO()`, pass an explicit absolute `url` built from `SITE_URL` + the route's real path, e.g. in `CategoryPage.jsx`:
```js
useSEO({
  title: ...,
  description: ...,
  image: category?.cover,
  url: `${SITE_URL}/category/${slug}`,
  jsonLd: [breadcrumbSchema, faqSchema].filter(Boolean),
});
```
Do the same in `Home.jsx` (`SITE_URL + "/"`), `AnimalDetailPage.jsx` (`SITE_URL + "/animal/" + slug`), `ContactPage.jsx`, `AreasWeServePage.jsx`. This removes the `window.location.href` fallback dependency entirely so canonical/og:url are correct no matter what environment renders the page (browser, Googlebot, or react-snap's local crawl server).

#### Step 3 — Make prerendering failures loud, not silent, then actually verify it works
Replace the masked fallback:
```diff
- "postbuild": "react-snap || echo 'Note: react-snap prerendering skipped. It will run on Vercel deployment (Linux environment).'"
+ "postbuild": "react-snap"
```
Let it fail the build if it fails — that's the only way you'll actually see the error in Vercel's build logs instead of finding out months later via flat GSC impressions.

Then trigger a real deploy and check the **Vercel build log for the postbuild step specifically.** If react-snap is crashing on missing Chromium dependencies (very common on Vercel's build image), don't keep fighting it in-place — switch to one of these, in order of effort:
1. **Move prerendering to GitHub Actions** (Ubuntu runner has full apt access for Chromium deps), commit the prerendered `build/` output, and point Vercel at the pre-built static output instead of running its own build. Most reliable fix for this exact stack.
2. Try `puppeteer-core` + `@sparticuz/chromium` (a Chromium binary built for serverless/Lambda-style environments) in place of full Puppeteer in react-snap's config — sometimes resolves the missing-library issue without changing platforms.
3. Longer-term: migrate off CRA to something with native SSG (Next.js, Astro, or Vite + `vite-plugin-ssr`/SSG). Bigger lift, but removes this entire class of problem permanently.

**Verification (do this after every deploy until it's solid):**
- `curl -s https://www.kannialazhannfarm.in/animal/rajapalayam | grep -i "rajapalayam"` — should return real text, not just the title tag.
- View-source (not DevTools "Elements") on `/`, `/category/dogs`, `/animal/kanni`, `/areas-we-serve`, `/contact` — confirm full visible content, not `<div id="root"></div>`.
- Confirm canonical/og:url tags in those same view-source checks point to the live `www.kannialazhannfarm.in` URL — **not localhost, not the apex.**
- Paste a couple of those URLs into Google's Rich Results Test to confirm JSON-LD is visible in the static response.

#### Step 4 — Resolve the duplicate vercel.json
Check Project Settings → General → Root Directory in the Vercel dashboard. Whichever `vercel.json` is NOT in that directory's path is dead — delete it. Keep the v2-style `frontend/vercel.json` if Root Directory is `frontend` (recommended; its caching headers are better), or merge its `headers`/`rewrites` into a v2-style root `vercel.json` if Root Directory is the repo root.

#### Step 5 — Once Steps 1–4 are live, request re-indexing
- GSC → URL Inspection → request indexing for `/`, each `/category/*`, each `/animal/*`, `/areas-we-serve`, `/contact`.
- Re-submit the sitemap under the www property.
- Re-check the Performance report in ~2–3 weeks. Average position (4.4) and CTR (15.6%) were already healthy on the tiny slice of pages Google had — once the full site is actually crawlable, impressions should scale rather than needing to be earned from scratch.

---

## 5. Validation checklist

- [ ] Vercel build log shows react-snap completing successfully (no silent fallback)
- [ ] View-source on 5+ routes shows full real content, no JS required
- [ ] Canonical + og:url on every checked route point to the correct live `www` URL (no localhost, no apex)
- [ ] `BASE_URL` in `generate-sitemap.mjs`, the `Sitemap:` line in `robots.txt`, and the canonical in `index.html` all use the same host
- [ ] Only one `vercel.json` is active; it includes the long-cache headers for `/static/` and `/animals/`
- [ ] Sitemap resubmitted in GSC under the correct (www) property
- [ ] Indexing requested for all main routes
- [ ] Rich Results Test passes with no errors on a category and an animal page

---

## 6. Keyword data — still need the Queries tab

I still don't have your GSC **Queries** table (the screenshot cut off before it). Your existing title/meta work already targets the right terms (Rajapalayam dog, Kanni dog, Sembari goat, HF cow, native breeds + Tamil Nadu/Gopalapuram locality), so once Steps 1–4 ship and Google can actually see all 21 pages, I'd expect that targeting to start showing up in impressions on its own. If you share the Queries export afterward, I can tell you precisely which terms are converting to clicks vs. which need stronger on-page treatment.

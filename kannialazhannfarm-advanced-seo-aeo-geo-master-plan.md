# Kannialazhann Farm (KSK Farm) — Advanced SEO + AEO + GEO Master Plan
**Site:** https://www.kannialazhannfarm.in/
**Stack:** Create React App + CRACO, react-router-dom v7, deployed on Vercel, no backend
**Date:** June 27, 2026
**Scope:** Pan-India visibility, primary focus Tamil Nadu + Kerala, across classic SEO, AEO (Answer Engine Optimization — ChatGPT, Perplexity, Google AI Overviews, Gemini), and GEO (Generative Engine Optimization).

> **This document is written to be handed directly to a coding agent (Copilot/Claude Code) as the task brief.** Every code change references exact file paths relative to repo root (`kskandkannialazhannfarms-main/`). Read the whole document before starting — Section 1 explains *why* nothing else in this plan will work until Section 2 is fixed first.

---

## 0. Where this plan starts from

Two earlier audits already happened on this repo (`kannialazhannfarm-seo-audit-and-fix-prompt (1).md`, `SEO-IMPLEMENTATION-COMPLETE.md`). A lot of genuinely good work is already in the codebase: LocalBusiness/Product/Breadcrumb/FAQ JSON-LD, an auto-generated 21-URL sitemap, a real 404 page, the `/areas-we-serve` page, correct www-host canonical URLs, code-splitting. **None of that is the problem.** This plan does not repeat any of it.

What it does:
1. Diagnoses a **regression** — a previous fix attempt for prerendering made things worse, not better, and is the single biggest reason GSC impressions/clicks are still flat 5 days after the last audit.
2. Goes well beyond classic SEO into **AEO** (so ChatGPT/Perplexity/AI Overviews can find and quote this farm) and **GEO** (so the brand becomes a citable entity across the web/AI corpus).
3. Builds out the **Tamil Nadu + Kerala** geographic and content layer that's currently almost entirely Tamil Nadu-only.

---

## 1. Verified: the site is still being served as an empty shell in production

I fetched the live homepage directly. The entire visible body content of `https://www.kannialazhannfarm.in/` right now is:

```
You need to enable JavaScript to run this app.
```

No headings, no animal names, no prices, no Tamil text, no links — nothing a non-JS crawler can read. This is exactly the symptom the June 22 audit flagged. Here's what actually happened to it:

### 1.1 The previous fix made the bug permanent instead of fixing it

`frontend/scripts/postbuild.js` (current state):
```js
const isCI = process.env.CI || process.env.VERCEL;

if (isCI) {
  console.log('✓ Build successful on Vercel');
  console.log('Note: Prerendering skipped on CI (missing system libraries)');
  console.log('These are sufficient for Google crawling & indexing even without prerendering.');
  process.exit(0);   // <-- exits BEFORE react-snap is ever attempted
}
// react-snap only runs past this point — i.e. only on your local laptop, never on Vercel
```

`process.env.VERCEL` is **always** `"1"` on every Vercel build, with no exceptions. So this code doesn't "gracefully fall back when prerendering fails" — it **never attempts prerendering on production at all, by design**, and then prints a success message claiming the static build is "sufficient for Google crawling & indexing even without prerendering," which is not true for a client-side-rendered CRA SPA being read by anything that doesn't execute JavaScript.

The frustrating part: **the correct fix was already half-built and then disabled.** `frontend/snap.js` already contains this:
```js
if (process.env.CI) {
  try {
    const chromium = require('@sparticuz/chromium-core');
    executablePath = chromium.executablePath;
  } catch (e) { ... }
}
```
`@sparticuz/chromium` is the standard, well-documented package specifically built to run headless Chrome inside Vercel/AWS-Lambda-style build containers (which lack system libraries like `libnss3`, `libatk-bridge2.0-0`, `libgbm1` that a normal Puppeteer install expects). **Whoever wrote `snap.js` had the right idea.** But:
- `postbuild.js` never reaches the line that would call `react-snap` with this config, because of the `process.exit(0)` above.
- The package name in `snap.js` is wrong (`@sparticuz/chromium-core` isn't the real package; it's `@sparticuz/chromium`).
- The package isn't even installed — check `frontend/package.json`, it's not in `dependencies` or `devDependencies`.

So today: zero prerendering happens anywhere in production, the build silently lies that this is fine, and every route — `/`, every `/category/*`, every `/animal/*`, `/contact`, `/areas-we-serve` — serves **identical, content-less HTML** with the homepage's title/description baked in (since CRA serves the same `public/index.html` for every route via the SPA rewrite).

### 1.2 Why this is even worse for AEO/GEO than for classic SEO

Google's indexer *can* eventually execute JavaScript (in a deferred "second wave" of rendering), so this has been merely crippling rather than fatal for classic Google Search — which still partly explains the flat-but-not-zero 67 impressions.

But this is fatal for AEO/GEO specifically, because the crawlers that feed AI answer engines **do not execute JavaScript at all**:
- `GPTBot` (OpenAI / ChatGPT)
- `ClaudeBot`, `Claude-Web` (Anthropic)
- `PerplexityBot`
- `Google-Extended` (feeds Gemini / AI Overviews, separate from regular Googlebot)
- `Bingbot`'s AI-answer pipeline, `CCBot` (Common Crawl, which many LLMs train on)

Every one of these sees exactly what I saw: `You need to enable JavaScript to run this app.` Right now this farm is **structurally invisible** to every AI answer engine, regardless of how good the on-page content is, because none of that content is in the raw HTML response.

This is fixable, and it's the highest-leverage single fix in this entire plan — everything else (Kerala expansion, AEO content, schema work) is wasted effort on AI/answer-engine visibility until this ships.

---

## 2. P0 — Fix prerendering for real (do this section first, before anything else)

### Step A (primary fix — do this first)

**1. Install the real package:**
```bash
cd frontend
yarn add -D @sparticuz/chromium
```
Check the package's README for the Node.js version it expects (it pins to a specific Chrome-for-Testing build per major version) and make sure **Vercel → Project Settings → General → Node.js Version** matches.

**2. Delete `frontend/snap.js`.** Replace `frontend/scripts/postbuild.js` entirely with this:

```js
#!/usr/bin/env node
/**
 * Prerenders all routes with react-snap so every page ships real,
 * crawlable HTML — no JS execution required to read it.
 *
 * On Vercel, the build container has no system Chromium libraries
 * (libnss3, libatk-bridge2.0-0, libgbm1, etc.), so we use
 * @sparticuz/chromium, which ships a self-contained binary built for
 * exactly this kind of serverless/CI environment.
 *
 * This step FAILS THE BUILD if prerendering fails. That is intentional —
 * a silently-skipped prerender means production ships the empty SPA
 * shell, which is the bug that caused months of flat impressions. You
 * want to see this fail loudly in the Vercel build log, not discover it
 * three weeks later in Search Console.
 */
const { ANIMALS, CATEGORIES } = require("../src/data/animals.js");

const ROUTES = [
  "/",
  "/contact",
  "/areas-we-serve",
  ...CATEGORIES.map((c) => `/category/${c.slug}`),
  ...ANIMALS.map((a) => `/animal/${a.slug}`),
];
// Derived from the same source of truth as scripts/generate-sitemap.mjs —
// never hand-maintain this list separately again.

async function main() {
  let executablePath;
  let puppeteerArgs = ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"];

  if (process.env.VERCEL) {
    const chromium = require("@sparticuz/chromium");
    executablePath = await chromium.executablePath();
    puppeteerArgs = chromium.args;
    console.log("[prerender] Vercel build detected — using @sparticuz/chromium:", executablePath);
  } else {
    console.log("[prerender] Local/non-Vercel build — using system Chromium.");
  }

  const { run } = require("react-snap");
  await run({
    source: "build",
    include: ROUTES,
    puppeteerArgs,
    puppeteer: { executablePath },
    skipThirdPartyRequests: true,
    minifyHtml: { collapseWhitespace: false, removeComments: false },
    waitFor: 1200, // give useSEO's useEffect time to write title/meta/JSON-LD before the page is snapshotted
  });

  console.log(`[prerender] ✅ Prerendered ${ROUTES.length} routes successfully.`);
}

main().catch((err) => {
  console.error("[prerender] ❌ FAILED — production would ship the un-rendered SPA shell.");
  console.error(err);
  process.exit(1);
});
```

**3. In Vercel → Project Settings → Environment Variables**, add:
```
PUPPETEER_SKIP_DOWNLOAD=true
```
This stops `puppeteer`'s own postinstall step from wastefully downloading its bundled Chromium during `yarn install` — you're overriding `executablePath` anyway, so that download is pure dead weight on every build.

**4. Commit, push, and watch the actual Vercel build log for the postbuild step.** If `@sparticuz/chromium`'s binary still can't launch in your specific Vercel build region/runtime, the error will now be visible (not swallowed) — paste it into the agent and iterate. Two common follow-ups if it still fails:
   - Try a slightly older or newer major version of `@sparticuz/chromium` — there's a known compatibility matrix against Node major versions and the package changes its bundling approach periodically.
   - Set `Vercel → Build & Development Settings → Node.js Version` to whichever LTS the chosen `@sparticuz/chromium` version targets.

### Step B (fallback — only if Step A genuinely can't be made to work after a couple of iterations)

Move prerendering off Vercel's build container entirely:
1. Add a GitHub Actions workflow (`.github/workflows/deploy.yml`) that runs on `push` to `main`, using `ubuntu-latest` (a full Ubuntu runner has the Chromium shared libraries Vercel's minimal build image lacks — Puppeteer typically works there with zero extra setup).
2. In that workflow: checkout → `yarn install` → `yarn build` (which now runs `prebuild` sitemap generation, `craco build`, and the `postbuild.js` prerender step above, all inside the Ubuntu runner where it has every dependency it needs).
3. Deploy the resulting prerendered `frontend/build/` folder straight to Vercel using `vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN` (Vercel CLI), with `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` added as **GitHub repo secrets** — this is a one-time manual step for you (Settings → Secrets and variables → Actions on the GitHub repo; get the token from vercel.com/account/tokens and the org/project IDs from `.vercel/project.json` after running `vercel link` once locally).
4. In Vercel → Project Settings → Git, set the **Ignored Build Step** to `exit 0` so Vercel stops re-running its own (broken-for-this-purpose) build on every git push — GitHub Actions becomes the only thing that deploys.

This is more setup, but it's the most reliable long-term answer specifically because it removes Vercel's build container from the equation entirely instead of fighting it.

### Step C (note for later, not now)

The recurring nature of this bug (two audit rounds, two failed attempts) is a symptom of fighting browser-automation prerendering bolted onto a tool (CRA) that was never designed for it. **The durable fix, when there's appetite for a bigger lift, is migrating to a framework with native static-site generation** — Next.js (`output: 'export'`), Astro, or Vite + a SSG plugin. Any of these bakes real HTML per route at build time with zero Puppeteer/Chromium dependency at all, permanently retiring this entire class of bug. Not in scope for this sprint — flagging it so it's a deliberate later decision, not a surprise.

### Verification (run after every deploy until this is rock solid)

```bash
curl -s https://www.kannialazhannfarm.in/ | grep -i "rajapalayam\|kanni\|goat"
curl -s https://www.kannialazhannfarm.in/animal/rajapalayam | grep -i "rajapalayam"
curl -s https://www.kannialazhannfarm.in/category/dogs | grep -i "chippiparai\|kombai"
```
Each should return real matching text from the page content — not just the title tag, and not "enable JavaScript". Also:
- View-source (not DevTools "Elements" tab — that shows the *rendered* DOM, which hides this bug) on `/`, `/category/dogs`, `/animal/kanni`, `/areas-we-serve`, `/contact`.
- Confirm `<title>` and meta description are **different per page** (right now every route's raw HTML carries the homepage's title because prerendering never runs).
- Paste 2–3 URLs into Google's Rich Results Test — JSON-LD should be visible in the static response, not just after JS runs.
- Request re-indexing for all 21 URLs in GSC once this is verified live, and resubmit the sitemap.

---

## 3. Advanced technical SEO (finishing what's unfinished + new ground)

### 3.1 Finish Phase 5 — image pipeline (currently 0% done)

Current state of `frontend/public/animals/`: 18 files, spaces and inconsistent casing in filenames (`Sembari ( pottu aadu ).jpg`), several **600KB–1.1MB** each, zero `.webp` files. This is a real Core Web Vitals (LCP) problem on the mobile/limited-data connections most of your actual buyers are using.

```bash
# from frontend/public/animals
cd frontend/public/animals
npx @squoosh/cli --webp '{"quality":78}' --mozjpeg '{"quality":72}' *.jpg -d optimized
```
Then:
1. Rename every file to descriptive kebab-case (the exact mapping is already written out in `SEO-IMPLEMENTATION-COMPLETE.md` section 5.1 — use it as-is).
2. Update every reference in `src/data/animals.js`, `src/pages/Home.jsx`, `src/components/Footer.jsx`, `src/components/Navbar.jsx`, and `public/index.html` (do `index.html` last).
3. Swap `<img>` for `<picture>` with a WebP source + JPG fallback wherever animal photos render:
```jsx
<picture>
  <source srcSet={`/animals/${a.slug}.webp`} type="image/webp" />
  <img
    src={`/animals/${a.slug}.jpg`}
    alt={`${a.name} (${a.tamil}) for sale at KSK & Kannialazhann Farm, Rajapalayam, Tamil Nadu`}
    loading="lazy"
    width="800"
    height="600"
  />
</picture>
```
4. On the **hero image only** (Home.jsx above-the-fold), use `loading="eager"` and `fetchPriority="high"` instead of lazy — it's the LCP element.
5. Target: every image under 150KB after compression.

### 3.2 Sitemap — add image entries

Google Images is a real, underused traffic source for "rajapalayam dog images", "sembari goat photo" type queries. Extend `scripts/generate-sitemap.mjs` to add `<image:image>` tags per animal URL (requires the `xmlns:image` namespace on `<urlset>`):
```xml
<url>
  <loc>https://www.kannialazhannfarm.in/animal/rajapalayam</loc>
  <image:image>
    <image:loc>https://www.kannialazhannfarm.in/animals/rajapalayam-dog-for-sale.jpg</image:loc>
    <image:title>Rajapalayam Dog for Sale — KSK & Kannialazhann Farm</image:title>
  </image:image>
</url>
```

### 3.3 IndexNow (Bing/Yandex instant indexing — low effort, free)

Add a small script that pings IndexNow whenever the sitemap regenerates, so Bing/Yandex pick up changes within minutes instead of waiting for their own crawl schedule. Low priority relative to everything else here, but it's a 20-minute task with no downside — do it once Section 2 is shipped.

---

## 4. Advanced AEO — getting found and quoted by AI answer engines

Classic SEO optimizes for ranking in a list of blue links. AEO optimizes for being the sentence an AI assistant quotes back to someone asking "what's a good native Tamil Nadu guard dog" or "where can I buy Sembari goats near Madurai." None of this works until Section 2 ships, since it all depends on raw, JS-free HTML.

### 4.1 Add an `llms.txt` file

This is an emerging (not yet universal, but growing) convention some AI crawlers and agent frameworks check for a structured summary of a site. Add `frontend/public/llms.txt`:
```
# Kannialazhann Farm & KSK Farm

Native Tamil Nadu farm in Gopalapuram, Rajapalayam (Virudhunagar district),
selling native dog breeds, goats, HF dairy cows, and country poultry/eggs,
direct from farm, with delivery across Tamil Nadu and parts of Kerala.

## Pages
- /: Homepage, overview of all categories
- /category/dogs: Native dog breeds — Rajapalayam, Kanni, Kombai, Chippiparai
- /category/goats: Native and Sembari goats
- /category/cows: HF dairy cows
- /category/poultry: Country chicken, Sanda Koli, Sanda Seval game fowl
- /category/eggs: Farm-fresh country chicken eggs
- /areas-we-serve: Delivery coverage across Tamil Nadu and Kerala
- /contact: Phone/WhatsApp contact, split by category

## Key facts
- Location: Gopalapuram, Rajapalayam, Virudhunagar district, Tamil Nadu, India
- Contact: +91 7339598737 (cows & goats), +91 7305644912 (dogs, poultry, eggs)
- Native dog breeds bred: Rajapalayam, Kanni, Kombai, Chippiparai
- Service area: Rajapalayam, Srivilliputhur, Sivakasi, Virudhunagar, Sattur,
  Tirunelveli, Sankarankovil, Madurai, and parts of southern Kerala
  (see /areas-we-serve for the full, current list)
```
Keep this in sync manually whenever pages/categories change — it's a small, high-signal file, not something to auto-generate from a script.

### 4.2 Add "direct-answer" content blocks to every page

AI answer engines (and Google AI Overviews) overwhelmingly favor content that states the answer in the first 1–2 sentences, in plain language, with the specific fact up front — not buried under marketing copy. On every `CategoryPage.jsx` and `AnimalDetailPage.jsx`, add one short paragraph near the top, directly under the H1, written in this pattern:

> "**[Animal name]** [one-line definitive fact: origin, price range if you're comfortable publishing one, what it's used for]. Available for direct purchase from KSK & Kannialazhann Farm in Gopalapuram, Rajapalayam, with delivery across [district list]."

Example for the Rajapalayam dog page:
> "The **Rajapalayam dog** (ராஜபாளையம் நாய்) is a native Tamil Nadu sighthound breed, historically used for boar hunting and guarding, recognized for its all-white coat and pink nose. KSK & Kannialazhann Farm breeds Rajapalayam puppies directly in Gopalapuram, Rajapalayam, with home delivery across Virudhunagar, Sivakasi, Tirunelveli, and Madurai districts."

This single paragraph, sitting in plain static HTML once Section 2 ships, is the exact shape of text an LLM lifts almost verbatim into an answer. Write one of these for all 5 categories and all 13 animals — real, specific, no filler.

### 4.3 Widen FAQ coverage with AI-query-shaped questions

The existing per-category FAQs are good. Add a second layer of **comparison and "near me" style questions** — these map directly to how people actually phrase questions to ChatGPT/Perplexity, which differs from how they type into Google:
- "What's the difference between a Rajapalayam dog and a Kanni dog?"
- "Which native Tamil Nadu dog breed is best for an apartment?"
- "Is Sembari goat meat good for [specific use case]?"
- "Can you deliver a Kanni puppy to Kochi or Kollam?"
- "Do you provide health certificates for interstate delivery to Kerala?"

Wire these into the existing FAQ JSON-LD pattern already used in `CategoryPage.jsx` — don't invent a new mechanism, just add entries.

### 4.4 E-E-A-T: real signals, never fabricated ones

AI answer engines (and Google) weight first-hand, verifiable expertise signals. Concretely, and only with real material you actually have:
- An **About** section (can live on the homepage or as a new `/about` route) with real names/photos of the people running the farm, years of experience, and how many animals have been placed.
- If you have **any** government registration (Tamil Nadu Animal Husbandry Department registration, KCI breeder listing, etc.), state it explicitly with the registration detail — this is exactly the kind of fact competitor sites in the search results above (Premium Pet House, Rajapalayam Co-Operative Kennels) lean on, and it's a strong trust/citation signal.
- If you collect genuine customer testimonials (WhatsApp screenshots, repeat-buyer quotes), add a `Review`/`AggregateRating` schema block **only from real reviews you can stand behind** — never fabricate review counts or star ratings; this is one of the most heavily policed schema types by Google and the cost of getting caught (manual action) is severe.

---

## 5. Advanced GEO — becoming a citable entity in the broader AI/web corpus

GEO is bigger than what's on your own domain — it's about whether the wider web (which both search engines and AI models draw from) treats this farm as an established, citable source.

### 5.1 Make facts genuinely quotable

LLMs and AI Overviews disproportionately surface **tables, specific numbers, and structured comparisons** over prose. Add a comparison table to the `/category/dogs` page:

| Breed | Tamil name | Best for | Typical adult size | Coat |
|---|---|---|---|---|
| Rajapalayam | ராஜபாளையம் | Guarding, family pet | Large | White, short |
| Kanni | கன்னி | Apartment living, hare hunting | Small–medium | Short |
| Kombai | கொம்பை | Guarding, boar hunting | Large | Short, fawn |
| Chippiparai | சிப்பிபாறை | Deer hunting, endurance | Medium–large | Short, sleek |

(Fill in real figures you're confident about — don't publish numbers you're not sure of; an LLM repeating a wrong fact back to a buyer who then shows up expecting a 15kg dog that's actually 30kg is a real-world problem, not just an SEO one.) Do the same for goats (Sembari Pottu Aadu vs Mayilambadi) and poultry (Sanda Koli vs Sanda Seval vs Naatu Koli vs Red Sonali).

### 5.2 Off-site citation building (manual, not code — but essential to GEO)

AI models and AI Overviews lean heavily on **third-party corroboration**, not just your own site saying things about itself. Priority order:
1. **Google Business Profile** — claim/optimize it fully if not already done: correct categories (Farm, Pet Breeder, Livestock Dealer), service area expanded to include Kerala border towns, photos, posts, and — critically — start collecting genuine Google reviews. This is the single highest-leverage GEO action available and it's entirely outside the codebase.
2. **Indian business directories**: Justdial, Sulekha, IndiaMART (livestock/pet category), Yellowpages.in — list once, keep NAP (Name, Address, Phone) byte-for-byte identical to the website and GBP everywhere.
3. **YouTube** — you already have `@kannialazhann`. Add full, keyword-rich video descriptions with a link back to the relevant category/animal page on the site, and (if not already on) enable auto-captions/transcripts — transcripts are crawlable text that LLMs and Google can both index, and YouTube is itself a major AI-training and RAG-retrieval source.
4. **Local Tamil agri/pet blogs and forums** — a handful of genuine mentions/backlinks from Tamil Nadu-based pet or agriculture content sites carry far more GEO weight than volume directory spam.
5. **Wikipedia/Wikidata** — out of reach for a business listing directly, but if any of the breed pages on Wikipedia (Rajapalayam dog, Kanni dog, Kombai, Chippiparai) have an "External links" or "Notable breeders" section that accepts edits, a citation there is extremely high-value. Treat as opportunistic, not a checklist item to force.

---

## 6. Tamil Nadu + Kerala expansion (the geographic core of this request)

Right now, every location signal on the site — `LocalBusiness.areaServed` in `index.html`, `/areas-we-serve`, the keyword fields in `animals.js` — covers **Tamil Nadu only** (Rajapalayam, Gopalapuram, Srivilliputhur, Sivakasi, Virudhunagar, Sattur, Tirunelveli, Sankarankovil, Madurai). There is genuine, verifiable demand from Kerala — a quick check turns up Kerala-specific listings for these exact breeds (e.g. Rajapalayam puppies advertised for sale in Kochi on third-party pet marketplaces), so this isn't a speculative expansion, it's chasing demand that's already proven to exist and that you're currently not targeting at all.

### 6.1 One important caveat before expanding — read this before writing delivery copy

Interstate transport of live animals in India is genuinely regulated (fitness/health certification requirements under the Prevention of Cruelty to Animals (Transport of Animals) Rules apply to cattle/goats moved by road, and state-level animal husbandry rules can vary). **Don't let the AI agent write blanket "we deliver anywhere in Kerala" copy for cattle/goats without you confirming the actual logistics and paperwork first** — for dogs and poultry/eggs this is generally far simpler. A safe, accurate approach:
- For **dogs**: straightforward to market "delivery across Kerala" with normal pet-transport practice.
- For **cows/goats**: phrase as "delivery to Kerala available on request — contact us for transport and health-certificate details" rather than an unconditional blanket claim, until you've actually confirmed the process end-to-end.

### 6.2 Code changes

**`frontend/src/pages/AreasWeServePage.jsx`** — add a second section for Kerala, following the exact same pattern already used for the Tamil Nadu towns (genuine, differentiated paragraph per place, not a copy-pasted template):
- **Punalur** (Kollam district) — nearest major Kerala town via the Tenkasi–Shenkottai pass route from Gopalapuram/Rajapalayam.
- **Kollam**
- **Kottarakkara**
- **Thiruvananthapuram** (Trivandrum) — larger pet-buyer market, longer delivery distance, set expectations accordingly in the copy.
- **Pathanamthitta**
Add **Kanyakumari** too even though it's Tamil Nadu — it's the natural bridge district for Kerala-bound deliveries and currently missing from the list entirely.

**`frontend/public/index.html`** — extend the LocalBusiness JSON-LD `areaServed` array to add: `"Kanyakumari"`, `"Punalur"`, `"Kollam"`, `"Kottarakkara"`, `"Thiruvananthapuram"`, `"Pathanamthitta"`, `"Kerala"`.

**`frontend/src/data/animals.js`** — extend the `keywords` field on each animal/category with Kerala-aware terms, matching the real phrasing buyers use (verified above): e.g. for Rajapalayam dog, add `"rajapalayam puppy for sale kerala", "rajapalayam dog price kochi", "native tamil dog breed kerala delivery"`.

**`scripts/generate-sitemap.mjs`** — no change needed (it already derives from `animals.js`/`CATEGORIES` automatically), but if you add a dedicated `/areas-we-serve/kerala` sub-route later, add it to the `routes` array there too.

### 6.3 Manual (business-side) Kerala actions
- Expand the **Google Business Profile service area** to explicitly include the Kerala towns above.
- List in **Kerala-specific directories**: IndiaMART and Sulekha both let you set multiple service-area states; make sure Kerala districts are added, not just Tamil Nadu.
- Consider a short, simple **Malayalam translation** of the core "what we sell + how to order" content for the Kerala-facing pages — even a partial translation (page summary in Malayalam, full detail in English/Tamil) measurably improves trust and time-on-page for Kerala visitors, and Malayalam-language content is a genuine differentiator versus every Tamil Nadu-only competitor in this space.

---

## 7. Content strategy: add a Guides section (currently the site has none)

Right now there are exactly 5 route types: Home, Category, Animal Detail, Contact, Areas We Serve. There's no long-form informational content anywhere — which is the single biggest content gap holding back both topical authority (classic SEO) and citability (AEO/GEO), since informational "how to choose / how to care for" content is exactly what gets cited in AI answers, while transactional pages rarely do.

Add a `/guides` route (new `GuidesPage.jsx` + `GuideDetailPage.jsx`, following the existing `CategoryPage`/`AnimalDetailPage` pattern) with an initial set of genuinely useful articles:
1. "Rajapalayam vs Kanni vs Kombai vs Chippiparai — Which Native Tamil Nadu Dog Breed Should You Buy?"
2. "Sembari Goat Price Guide — Pottu Aadu vs Mayilambadi, Explained"
3. "How to Choose a Native Dog Breed for Apartment Living in Tamil Nadu or Kerala"
4. "Country Chicken (Naatu Koli) vs Broiler — Why Buyers Are Switching Back to Native Poultry"
5. "Buying Livestock Across State Lines: What Tamil Nadu Buyers in Kerala Should Know" (this is also where the cattle/goat transport caveat from Section 6.1 belongs, written accurately once you've confirmed the real process)
6. "HF Cow Care Basics for First-Time Dairy Farmers in Tamil Nadu"

Each guide gets its own URL, its own title/meta/JSON-LD (Article schema with `author`, `datePublished` — real ones, not placeholders), and gets added to the sitemap generator's `routes` array. This is also the natural home for the comparison tables from Section 5.1.

---

## 8. Manual / business-owner checklist (not code — but nothing in Sections 2–7 reaches its full potential without these)

- [ ] Claim/fully complete **Google Business Profile**: correct category, expanded service area (TN + Kerala), photos, weekly posts, actively request reviews from real buyers.
- [ ] List on **Justdial, Sulekha, IndiaMART** with byte-identical NAP across all of them and the website.
- [ ] Add **full, link-back-including descriptions** to all existing YouTube videos on `@kannialazhann`; enable captions.
- [ ] Set up a simple system to **collect 2–3 genuine customer testimonials a month** (WhatsApp screenshots are fine as raw material) to eventually power real review schema.
- [ ] Confirm the actual **interstate transport process** for cattle/goats to Kerala before publishing unconditional delivery claims (Section 6.1).
- [ ] Re-submit the sitemap and **request indexing** in GSC for all 21 (soon more) URLs once Section 2 is verified live.

---

## 9. Master task list for the AI coding agent (do in this order)

1. **Section 2** — ship the real prerendering fix (`postbuild.js` rewrite + `@sparticuz/chromium`). Verify with the curl/view-source checks before moving on. This blocks everything else's effectiveness.
2. **Section 3.1** — image rename + compress + WebP `<picture>` rollout.
3. **Section 4.2** — add the direct-answer paragraph to all 5 category pages and 13 animal pages.
4. **Section 4.3** — extend FAQ JSON-LD with the comparison/Kerala-delivery questions.
5. **Section 6.2** — Kerala expansion across `AreasWeServePage.jsx`, `index.html` schema, `animals.js` keywords.
6. **Section 5.1** — comparison tables on category pages.
7. **Section 4.1** — add `llms.txt`.
8. **Section 7** — build the `/guides` section and the first 2–3 articles (start with #1 and #2 from the list — highest buyer-intent overlap).
9. **Section 3.2 / 3.3** — sitemap image entries, IndexNow.

## 10. Validation checklist

- [ ] `curl` on `/`, a `/category/*`, and an `/animal/*` route returns real, page-specific text (not the JS-disabled message, not identical homepage content on every route).
- [ ] View-source shows a different `<title>`/meta description per route.
- [ ] Rich Results Test passes with no errors on a category and an animal page.
- [ ] `llms.txt` is reachable at `/llms.txt` and accurate.
- [ ] `/areas-we-serve` includes both Tamil Nadu and the new Kerala section.
- [ ] LocalBusiness JSON-LD `areaServed` includes the Kerala additions.
- [ ] All animal images are under 150KB, `.webp` + `.jpg` fallback, descriptive filenames.
- [ ] Sitemap resubmitted in GSC; indexing requested for all URLs.

## 11. What to realistically expect, and when

- **0–2 weeks after Section 2 ships:** no visible GSC change yet — this is Google/AI crawlers re-fetching and re-rendering, not an instant switch.
- **2–6 weeks:** impressions should start climbing materially past the current ~67/quarter baseline, since the full 21-page site becomes genuinely crawlable for the first time, and your already-decent title/meta/keyword targeting starts actually reaching Google instead of being trapped behind unrendered JS.
- **6–12 weeks:** Kerala-targeted impressions specifically should start appearing in GSC's country/query breakdown if Section 6 shipped — watch the Queries tab for early signs of Kerala-phrased searches ("rajapalayam puppy kochi" style terms) converting to impressions.
- **AEO/GEO impact is slower to observe directly** (you can't watch ChatGPT's training data update in real time), but Sections 4–5 are the correct, durable foundation for it regardless — and the off-site citation work in Section 5.2 compounds independently of any single algorithm update.

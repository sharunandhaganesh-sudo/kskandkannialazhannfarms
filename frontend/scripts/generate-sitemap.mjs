import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { CATEGORIES, ANIMALS } from "../src/data/animals.js";

const BASE_URL = "https://kannialazhannfarm.in";
const today = new Date().toISOString().split("T")[0];

const routes = [
  { path: "/", priority: "1.0" },
  { path: "/contact", priority: "0.6" },
  { path: "/areas-we-serve", priority: "0.7" },
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

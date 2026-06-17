// Vercel serverless function to generate dynamic meta tags for social media crawlers
// This ensures og:image and other meta tags are correct for each route

import { CATEGORIES, ANIMALS } from '../src/data/animals';

export default function handler(req, res) {
  const { type = 'home', slug } = req.query;
  const baseUrl = `https://${req.headers.host || 'kskkannialazhann.com'}`;

  let title = 'KSK & Kannialazhann Farm — Native Livestock from Rajapalayam';
  let description = 'Native Tamil dogs, HF cows, Sembari goats (₹600/kg), Naatu Koli (₹600/kg) and farm-fresh eggs. Direct from Gopalapuram, Rajapalayam.';
  let image = `${baseUrl}/animals/Kanni Dog 2.jpg`;
  let pageUrl = baseUrl;

  if (type === 'animal' && slug) {
    const animal = ANIMALS.find(a => a.slug === slug);
    if (animal) {
      title = `${animal.name} (${animal.tamil}) — ${animal.tagline} | KSK & Kannialazhann Farm`;
      description = animal.description.slice(0, 155) + '…';
      image = `${baseUrl}${animal.hero}`;
      pageUrl = `${baseUrl}/animal/${slug}`;
    }
  } else if (type === 'category' && slug) {
    const category = CATEGORIES.find(c => c.slug === slug);
    if (category) {
      title = `${category.name} (${category.tamil}) — KSK & Kannialazhann Farm`;
      description = `${category.blurb} Direct from our farm in Rajapalayam. ${category.price ? 'Live weight ' + category.price + '.' : ''}`;
      image = `${baseUrl}${category.cover}`;
      pageUrl = `${baseUrl}/category/${slug}`;
    }
  }

  // Return JSON for use in programmatic checking, or HTML for crawler preview
  const format = req.headers['user-agent']?.toLowerCase().includes('facebook|twitter|linkedin|whatsapp|pinterest') ? 'html' : 'json';

  if (format === 'html') {
    // Return minimal HTML with meta tags for crawlers
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
  <meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />
  <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="description" content="${description.replace(/"/g, '&quot;')}" />
</head>
<body>
  <script>window.location.href = '${pageUrl}';</script>
</body>
</html>`);
  } else {
    // Return JSON for debugging
    res.setHeader('Content-Type', 'application/json');
    res.json({ title, description, image, pageUrl });
  }

  res.end();
}

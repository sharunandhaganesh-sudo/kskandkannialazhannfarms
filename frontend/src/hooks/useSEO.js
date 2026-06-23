import { useEffect } from "react";

const SITE_URL = "https://www.kannialazhannfarm.in";
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
    const absImg = imgUrl.startsWith("http")
      ? imgUrl
      : `${window.location.origin}${imgUrl}`;
    setMeta('meta[property="og:image"]', "content", absImg);
    setMeta('meta[name="twitter:image"]', "content", absImg);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[property="og:type"]', "content", "website");

    const pageUrl = url || SITE_URL;
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


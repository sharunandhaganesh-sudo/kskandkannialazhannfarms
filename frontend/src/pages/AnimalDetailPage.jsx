import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MessageCircle, Phone, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import Breadcrumbs from "../components/Breadcrumbs";
import useSEO from "../hooks/useSEO";
import { getAnimalBySlug, getCategoryBySlug, ANIMALS } from "../data/animals";
import { buildWhatsappLink } from "../lib/utils";

export default function AnimalDetailPage() {
  const { slug } = useParams();
  const animal = getAnimalBySlug(slug);
  const [activeImg, setActiveImg] = useState(animal?.gallery[0]);

  useEffect(() => {
    if (animal) {
      setActiveImg(animal.gallery[0]);
      window.scrollTo(0, 0);
    }
  }, [slug, animal]);

  // Build schemas
  const category = getCategoryBySlug(animal?.category);
  const priceMatch = animal?.priceNote.match(/₹\s?(\d+)/) || null;
  
  const productSchema = animal ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${animal.name} (${animal.tamil})`,
    description: animal.description,
    image: `https://kannialazhannfarm.in${animal.hero}`,
    category: category?.name,
    brand: { "@type": "Brand", name: "KSK & Kannialazhann Farm" },
    offers: priceMatch ? {
      "@type": "Offer",
      priceCurrency: "INR",
      price: priceMatch[1],
      availability: "https://schema.org/InStock",
      areaServed: "Tamil Nadu",
      url: `https://kannialazhannfarm.in/animal/${animal.slug}`,
    } : {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      areaServed: "Tamil Nadu",
      url: `https://kannialazhannfarm.in/animal/${animal.slug}`,
    },
  } : null;

  const breadcrumbSchema = animal && category ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kannialazhannfarm.in/" },
      { "@type": "ListItem", position: 2, name: category.name, item: `https://kannialazhannfarm.in/category/${animal.category}` },
      { "@type": "ListItem", position: 3, name: animal.name, item: `https://kannialazhannfarm.in/animal/${animal.slug}` },
    ],
  } : null;

  useSEO({
    title: animal
      ? `${animal.name} (${animal.tamil}) — ${animal.tagline} | KSK & Kannialazhann Farm`
      : "KSK & Kannialazhann Farm",
    description: animal
      ? `${animal.description.slice(0, 155)}…`
      : undefined,
    image: animal?.hero,
    jsonLd: [productSchema, breadcrumbSchema].filter(Boolean),
  });

  if (!animal) return <Navigate to="/" replace />;

  const related = ANIMALS.filter(
    (a) => a.category === animal.category && a.slug !== animal.slug
  ).slice(0, 3);

  const message = `Hi! I'm interested in ${animal.name} (${animal.tamil}) at KSK & Kannialazhann Farm. Please share availability and price.`;

  return (
    <div className="pt-24 md:pt-28 bg-[#f9f8f6]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 pb-20 md:pb-28">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: category?.name, href: `/category/${animal.category}` },
          { label: animal.name, href: `/animal/${animal.slug}` },
        ]} />

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-2xl overflow-hidden bg-[#eae7dd] aspect-[4/5] md:aspect-[5/6]">
                <img
                  src={activeImg}
                  alt={animal.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            </Reveal>
            {animal.gallery.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
                {animal.gallery.map((g) => (
                  <button
                    key={g}
                    onClick={() => setActiveImg(g)}
                    data-testid={`gallery-thumb-${g}`}
                    className={`shrink-0 h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === g
                        ? "border-[#1f4d2b]"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="label-eyebrow text-[#1f4d2b]">{animal.tamil} · {category?.name}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mt-4 text-[#2d2d2a]">
                {animal.name}.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-lg text-[#1f4d2b] font-serif-display">
                {animal.tagline}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 text-[#5c5c5c] text-[15px] leading-relaxed">
                {animal.description}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#f4c20d] text-[#1f4d2b] font-bold text-[13px]">
                {animal.priceNote}
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-8 border-t border-[#eae7dd] pt-6 space-y-3">
                {animal.traits.map((t) => (
                  <div key={t.label} className="flex justify-between gap-4">
                    <span className="label-eyebrow text-[#5c5c5c]">{t.label}</span>
                    <span className="text-[13px] text-[#2d2d2a] font-medium text-right">{t.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-8 grid gap-3">
                <a
                  href={buildWhatsappLink(animal.whatsapp, message)}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="detail-whatsapp-btn"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#1f4d2b] text-[#f4c20d] font-semibold text-[14px] hover:bg-[#16381f] transition-all"
                >
                  <MessageCircle size={16} /> WhatsApp about {animal.name}
                </a>
                <div className="grid grid-cols-2 gap-3">
                  {animal.contact.map((num) => (
                    <a
                      key={num}
                      href={`tel:+91${num}`}
                      data-testid={`detail-call-${num}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full bg-white border border-[#eae7dd] text-[#1f4d2b] font-semibold text-[13px] hover:bg-[#1f4d2b]/5"
                    >
                      <Phone size={14} /> +91 {num}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="mt-8 bg-white border border-[#eae7dd] rounded-2xl p-5">
                <p className="label-eyebrow text-[#1f4d2b]">Buying with us</p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Honest live-weight pricing",
                    "Vaccinated & farm-raised",
                    "Visit the farm before you buy",
                    "Transport arranged on request",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[13px] text-[#2d2d2a]">
                      <Check size={14} className="mt-1 text-[#1f4d2b]" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <Reveal>
              <p className="label-eyebrow text-[#1f4d2b]">You may also like</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-serif-display text-3xl md:text-5xl mt-3 text-[#2d2d2a]">
                More from {category?.name}.
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a, i) => (
                <Reveal key={a.slug} delay={i * 80}>
                  <Link
                    to={`/animal/${a.slug}`}
                    data-testid={`related-animal-${a.slug}`}
                    className="block group bg-white rounded-2xl border border-[#eae7dd] overflow-hidden hover:-translate-y-1 transition-all"
                  >
                    <div className="zoom-wrap aspect-[4/5]">
                      <img src={a.hero} alt={a.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <p className="label-eyebrow text-[#1f4d2b]">{a.tamil}</p>
                      <h3 className="font-serif-display text-2xl mt-1 text-[#2d2d2a]">{a.name}</h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

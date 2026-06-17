import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Reveal from "../components/Reveal";
import { getCategoryBySlug, getAnimalsByCategory, CONTACTS } from "../data/animals";
import { buildWhatsappLink } from "../lib/utils";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  const animals = getAnimalsByCategory(slug);

  if (!category) return <Navigate to="/" replace />;

  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative bg-[#1f4d2b] text-white overflow-hidden">
        <img
          src={category.cover}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f4d2b] via-[#1f4d2b]/85 to-[#1f4d2b]/50" />
        <div className="grain" />
        <div className="relative max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 py-24 md:py-36">
          <Reveal>
            <Link to="/" className="label-eyebrow text-[#f4c20d] hover:underline">
              ← Back to farm
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <p className="label-eyebrow text-[#f4c20d] mt-6">{category.tamil}</p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl mt-3 leading-[0.95]">
              {category.name}.
            </h1>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 max-w-2xl text-white/80 text-base md:text-lg leading-relaxed">
              {category.blurb}
            </p>
          </Reveal>
          {category.price && (
            <Reveal delay={400}>
              <div className="mt-8 inline-flex px-5 py-2.5 rounded-full bg-[#f4c20d] text-[#1f4d2b] font-bold text-sm">
                Live weight pricing · {category.price}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* GRID */}
      <section className="py-20 md:py-28 bg-[#f9f8f6]" data-testid={`category-list-${slug}`}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-12">
            <Reveal>
              <h2 className="font-serif-display text-3xl md:text-5xl text-[#2d2d2a]">
                {animals.length} {animals.length > 1 ? "breeds" : "offering"} available
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <span className="label-eyebrow text-[#1f4d2b]">
                Tap any card to see details
              </span>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {animals.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link
                  to={`/animal/${a.slug}`}
                  data-testid={`animal-card-${a.slug}`}
                  className="block group bg-white rounded-2xl border border-[#eae7dd] overflow-hidden hover:-translate-y-1 transition-all"
                >
                  <div className="zoom-wrap aspect-[4/5] bg-[#eae7dd] relative">
                    <img src={a.hero} alt={a.name} className="w-full h-full object-cover" />
                    {a.priceNote && a.priceNote.includes("₹") && (
                      <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#f4c20d] text-[#1f4d2b] text-[11px] font-bold">
                        {a.priceNote}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="label-eyebrow text-[#1f4d2b]">{a.tamil}</p>
                    <h3 className="font-serif-display text-2xl md:text-3xl mt-1.5 text-[#2d2d2a]">{a.name}</h3>
                    <p className="text-[13px] text-[#5c5c5c] mt-2 line-clamp-2 leading-relaxed">{a.tagline}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-[#1f4d2b] inline-flex items-center gap-1.5">
                        View details <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <a
                        href={buildWhatsappLink(a.whatsapp, `Hi! I'm interested in ${a.name} (${a.tamil}).`)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        data-testid={`card-whatsapp-${a.slug}`}
                        className="h-9 w-9 rounded-full bg-[#1f4d2b] text-[#f4c20d] flex items-center justify-center hover:bg-[#16381f]"
                      >
                        <MessageCircle size={15} />
                      </a>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="py-20 bg-[#1f4d2b] text-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="label-eyebrow text-[#f4c20d]">Direct line for {category.name.toLowerCase()}</p>
            <h3 className="font-serif-display text-4xl md:text-5xl mt-3">
              Call. We pick up.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            {category.contact.map((num) => (
              <a
                key={num}
                href={`tel:+91${num}`}
                data-testid={`category-call-${num}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#f4c20d] text-[#1f4d2b] font-semibold text-[14px] hover:-translate-y-[1px] transition-all"
              >
                <Phone size={15} /> +91 {num}
              </a>
            ))}
            <a
              href={buildWhatsappLink(category.whatsapp, `Hi! I'm interested in ${category.name} from KSK & Kannialazhann Farm.`)}
              target="_blank"
              rel="noreferrer"
              data-testid={`category-whatsapp-${slug}`}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 backdrop-blur border border-white/30 text-white font-semibold text-[14px]"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

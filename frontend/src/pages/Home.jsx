import { Link } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle, Sparkles, ShieldCheck, Leaf, MapPin } from "lucide-react";
import Reveal from "../components/Reveal";
import { CATEGORIES, CONTACTS, ANIMALS } from "../data/animals";
import { buildWhatsappLink } from "../lib/utils";

const STATS = [
  { v: "12+", k: "Breeds raised" },
  { v: "2021", k: "Family-run since" },
  { v: "100%", k: "Native bloodlines" },
  { v: "₹600", k: "Per kg · Goat & Naatu Koli" },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-end pt-32 pb-16 md:pb-24 overflow-hidden">
        <img
          src="/animals/Rajapalayam Dog.jpg"
          alt="Rajapalayam dog at KSK Farm"
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f4d2b]/40 via-[#1f4d2b]/30 to-[#1f4d2b]/95" />
        <div className="grain" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 w-full">
          <Reveal>
            <p className="label-eyebrow text-[#f4c20d]">Rajapalayam · Gopalapuram · est. 2021</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif-display text-[#f9f8f6] text-[44px] sm:text-6xl md:text-7xl lg:text-[112px] leading-[0.95] mt-4 max-w-5xl">
              Native breeds.
              <br />
              <span className="text-[#f4c20d] italic">Honest farming.</span>
              <br />
              Straight from our soil.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-[#f9f8f6]/85 text-base md:text-lg leading-relaxed">
              KSK Farm × Kannialazhann is a joint family farm raising Tamil
              Nadu's finest native dogs, HF cows, Sembari goats and country
              chicken. We don't ship hype — we ship healthy animals.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={buildWhatsappLink(
                  CONTACTS.whatsappPrimary,
                  "Hi! I want to enquire about animals at KSK & Kannialazhann Farm."
                )}
                target="_blank"
                rel="noreferrer"
                data-testid="hero-whatsapp-btn"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[#f4c20d] text-[#1f4d2b] font-semibold text-[14px] hover:-translate-y-[2px] transition-all"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a
                href={`tel:+91${CONTACTS.dogCock[0]}`}
                data-testid="hero-call-btn"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 backdrop-blur border border-white/30 text-white font-semibold text-[14px] hover:bg-white/20 transition-all"
              >
                <Phone size={16} /> Call +91 {CONTACTS.dogCock[0]}
              </a>
              <Link
                to="/category/dogs"
                data-testid="hero-explore-btn"
                className="inline-flex items-center gap-2 px-6 py-4 text-[#f9f8f6] font-semibold text-[14px] group"
              >
                Explore the farm
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          {/* Pricing pill row */}
          <Reveal delay={480}>
            <div className="mt-12 inline-flex flex-wrap gap-2">
              <span className="px-4 py-2 rounded-full bg-[#f4c20d]/95 text-[#1f4d2b] text-[12px] font-semibold">
                Goat · ₹600 / kg
              </span>
              <span className="px-4 py-2 rounded-full bg-[#f4c20d]/95 text-[#1f4d2b] text-[12px] font-semibold">
                Naatu Koli · ₹600 / kg
              </span>
              <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur text-white text-[12px] font-semibold border border-white/20">
                Eggs · daily · contact rate
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="bg-[#1f4d2b] text-[#f4c20d] border-y border-[#f4c20d]/20 overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap py-5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-8 font-serif-display text-2xl md:text-3xl italic">
              <span>Chippiparai</span>
              <span className="opacity-50">/</span>
              <span>Kanni</span>
              <span className="opacity-50">/</span>
              <span>Kombai</span>
              <span className="opacity-50">/</span>
              <span>Rajapalayam</span>
              <span className="opacity-50">/</span>
              <span>HF Cow</span>
              <span className="opacity-50">/</span>
              <span>Sembari</span>
              <span className="opacity-50">/</span>
              <span>Naatu Koli</span>
              <span className="opacity-50">/</span>
              <span>Sanda Seval</span>
              <span className="opacity-50">/</span>
            </div>
          ))}
        </div>
      </section>

      {/* STATS / STORY */}
      <section className="py-24 md:py-32 bg-[#f9f8f6]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label-eyebrow text-[#1f4d2b]">Our story</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-4 text-[#2d2d2a]">
                A family. A farm. <em className="text-[#1f4d2b]">A promise.</em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-[#5c5c5c] text-[15px] leading-relaxed max-w-md">
                KSK Farm and Kannialazhann came together in Gopalapuram with one
                idea — keep Tamil Nadu's native bloodlines alive, and sell only
                what we'd buy for our own home. No middlemen, no marketing
                tricks, no shortcuts on animal health.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
                {STATS.map((s) => (
                  <div key={s.k} className="border-t border-[#eae7dd] pt-4">
                    <div className="font-serif-display text-3xl md:text-4xl text-[#1f4d2b]">{s.v}</div>
                    <div className="label-eyebrow text-[#5c5c5c] mt-1">{s.k}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <Reveal className="row-span-2">
              <div className="zoom-wrap rounded-2xl overflow-hidden aspect-[3/4]">
                <img src="/animals/HF Cow.jpg" alt="HF Cow" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="zoom-wrap rounded-2xl overflow-hidden aspect-[4/3]">
                <img src="/animals/Sanda Seval.jpg" alt="Sanda Seval" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="zoom-wrap rounded-2xl overflow-hidden aspect-[4/3]">
                <img src="/animals/Sembari ( pottu aadu ).jpg" alt="Sembari" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CATEGORIES BENTO */}
      <section className="py-24 md:py-32 bg-white" data-testid="home-categories">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <Reveal><p className="label-eyebrow text-[#1f4d2b]">What we raise</p></Reveal>
              <Reveal delay={80}>
                <h2 className="font-serif-display text-4xl md:text-6xl mt-3 text-[#2d2d2a] leading-tight">
                  Pick a category.<br /><span className="italic text-[#1f4d2b]">Meet the animals.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <Link to="/contact" className="text-[#1f4d2b] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                Talk to us <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {CATEGORIES.map((c, idx) => {
              const sizes = [
                "md:col-span-4 aspect-[16/10] md:aspect-[16/9]",
                "md:col-span-2 aspect-[4/5] md:aspect-auto",
                "md:col-span-2 aspect-[4/5] md:aspect-auto",
                "md:col-span-2 aspect-[4/5] md:aspect-auto",
                "md:col-span-2 aspect-[4/5] md:aspect-auto",
              ];
              return (
                <Reveal key={c.slug} delay={idx * 80} className={`${sizes[idx] || ""}`}>
                  <Link
                    to={`/category/${c.slug}`}
                    data-testid={`category-card-${c.slug}`}
                    className="group relative block w-full h-full rounded-2xl overflow-hidden bg-[#1f4d2b]"
                  >
                    <img
                      src={c.cover}
                      alt={c.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2614]/90 via-[#0d2614]/30 to-transparent" />
                    {c.price && (
                      <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#f4c20d] text-[#1f4d2b] text-[11px] font-bold">
                        {c.price}
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
                      <p className="label-eyebrow text-[#f4c20d]">{c.tamil}</p>
                      <h3 className="font-serif-display text-2xl md:text-4xl mt-1">{c.name}</h3>
                      <p className="text-[13px] text-white/75 mt-2 max-w-md line-clamp-2">{c.blurb}</p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#f4c20d]">
                        Explore <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 md:py-32 bg-[#f9f8f6]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <Reveal>
            <p className="label-eyebrow text-[#1f4d2b]">Why buy from us</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif-display text-4xl md:text-6xl mt-3 text-[#2d2d2a] leading-tight max-w-3xl">
              We don't sell animals. <em className="text-[#1f4d2b]">We sell trust.</em>
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, t: "Verified bloodlines", d: "Native breeds traced and selected — no crossbreed surprises." },
              { icon: Leaf, t: "Ethically raised", d: "Free range, green-fed, no antibiotic abuse, no battery cages." },
              { icon: Sparkles, t: "Honest pricing", d: "₹600/kg flat for goat & Naatu Koli. Live weight, transparent." },
            ].map((b, i) => (
              <Reveal key={b.t} delay={i * 100}>
                <div className="bg-white border border-[#eae7dd] rounded-2xl p-7 h-full hover:-translate-y-1 transition-transform">
                  <div className="h-12 w-12 rounded-xl bg-[#1f4d2b] text-[#f4c20d] flex items-center justify-center">
                    <b.icon size={20} />
                  </div>
                  <h3 className="font-serif-display text-2xl mt-5 text-[#2d2d2a]">{b.t}</h3>
                  <p className="text-[14px] text-[#5c5c5c] mt-2 leading-relaxed">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ANIMALS RAIL */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <Reveal><p className="label-eyebrow text-[#1f4d2b]">Meet a few faces</p></Reveal>
              <Reveal delay={80}>
                <h2 className="font-serif-display text-4xl md:text-6xl mt-3 text-[#2d2d2a]">
                  The lineup.
                </h2>
              </Reveal>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {ANIMALS.slice(0, 8).map((a, i) => (
              <Reveal key={a.slug} delay={i * 60}>
                <Link
                  to={`/animal/${a.slug}`}
                  data-testid={`featured-animal-${a.slug}`}
                  className="block group"
                >
                  <div className="zoom-wrap rounded-xl overflow-hidden aspect-[4/5] bg-[#eae7dd]">
                    <img src={a.hero} alt={a.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-3">
                    <p className="label-eyebrow text-[#1f4d2b]">{a.tamil}</p>
                    <h3 className="font-serif-display text-xl md:text-2xl mt-0.5 text-[#2d2d2a] group-hover:text-[#1f4d2b] transition-colors">{a.name}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[#f4c20d] relative overflow-hidden">
        <div className="grain" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 relative">
          <Reveal>
            <p className="label-eyebrow text-[#1f4d2b]">Ready to buy?</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif-display text-5xl md:text-7xl lg:text-8xl text-[#1f4d2b] mt-4 leading-[0.95]">
              One call.<br />
              <em>One healthy animal home.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={buildWhatsappLink(
                  CONTACTS.whatsappPrimary,
                  "Hi! I want to enquire about KSK & Kannialazhann Farm animals."
                )}
                target="_blank"
                rel="noreferrer"
                data-testid="cta-whatsapp-btn"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[#1f4d2b] text-[#f4c20d] font-semibold text-[14px] hover:-translate-y-[2px] transition-all"
              >
                <MessageCircle size={16} /> WhatsApp now
              </a>
              <Link
                to="/contact"
                data-testid="cta-contact-btn"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[#1f4d2b]/10 text-[#1f4d2b] font-semibold text-[14px] border border-[#1f4d2b]/30 hover:bg-[#1f4d2b]/20 transition-all"
              >
                <MapPin size={16} /> Visit the farm
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

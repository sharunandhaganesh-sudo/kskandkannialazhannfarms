import { useState } from "react";
import { MessageCircle, Phone, MapPin, Instagram, Youtube, Send } from "lucide-react";
import Reveal from "../components/Reveal";
import useSEO from "../hooks/useSEO";
import { CONTACTS, CATEGORIES } from "../data/animals";
import { buildWhatsappLink } from "../lib/utils";
import { toast } from "sonner";

const SITE_URL = "https://www.kannialazhannfarm.in";

export default function ContactPage() {
  useSEO({
    title: "Contact KSK & Kannialazhann Farm — Buy Farm Animals Online | Rajapalayam",
    description:
      "Contact KSK & Kannialazhann Farm to buy native farm animals in Tamil Nadu. Call or WhatsApp us for dogs, goats, cows, poultry & eggs. Dogs: +91 7305644912. Goats & Cows: +91 7339598737. Available in Rajapalayam, Gopalapuram, Sivakasi, Virudhunagar, Madurai.",
    url: `${SITE_URL}/contact`,
  });
  const [form, setForm] = useState({
    name: "",
    interest: "Dogs",
    phone: "",
    message: "",
  });

  const handle = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const cat = CATEGORIES.find((c) => c.name === form.interest);
  const targetNumber = cat ? cat.whatsapp : CONTACTS.whatsappPrimary;
  const messageText = `Hi KSK & Kannialazhann Farm!

Name: ${form.name || "—"}
Interested in: ${form.interest}
Phone: ${form.phone || "—"}

Message: ${form.message || "—"}`;
  const waHref = buildWhatsappLink(targetNumber, messageText);

  const handleSubmitClick = (e) => {
    if (!form.name || !form.message) {
      e.preventDefault();
      toast.error("Please fill at least your name and message.");
      return;
    }
    toast.success("Opening WhatsApp with your message…");
  };

  return (
    <div className="pt-24 md:pt-28">
      <section className="relative bg-[#1f4d2b] text-white overflow-hidden">
        <div className="grain" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 py-20 md:py-28">
          <Reveal>
            <p className="label-eyebrow text-[#f4c20d]">Contact · Visit · Buy</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl mt-4 leading-[0.95]">
              Say <em className="text-[#f4c20d]">vanakkam</em>.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-white/80 text-base md:text-lg">
              Pick a category, send a message — it lands on our WhatsApp instantly.
              Or just call us, we'll pick up between 7am and 9pm.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f9f8f6]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* FORM */}
          <Reveal>
            <div>
              <p className="label-eyebrow text-[#1f4d2b]">Send an enquiry</p>
              <h2 className="font-serif-display text-3xl md:text-5xl mt-3 text-[#2d2d2a]">
                Opens WhatsApp with your message pre-filled.
              </h2>
              <form
                onSubmit={(e) => e.preventDefault()}
                data-testid="contact-form"
                className="mt-8 grid gap-5"
              >
                <div>
                  <label className="label-eyebrow text-[#5c5c5c]">Your name</label>
                  <input
                    value={form.name}
                    onChange={handle("name")}
                    data-testid="form-name"
                    placeholder="e.g. Karthik R."
                    className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white border border-[#eae7dd] focus:border-[#1f4d2b] focus:outline-none text-[#2d2d2a]"
                  />
                </div>
                <div>
                  <label className="label-eyebrow text-[#5c5c5c]">Interested in</label>
                  <select
                    value={form.interest}
                    onChange={handle("interest")}
                    data-testid="form-interest"
                    className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white border border-[#eae7dd] focus:border-[#1f4d2b] focus:outline-none text-[#2d2d2a]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.name}>{c.name} ({c.tamil})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-eyebrow text-[#5c5c5c]">Phone (optional)</label>
                  <input
                    value={form.phone}
                    onChange={handle("phone")}
                    data-testid="form-phone"
                    placeholder="10-digit number"
                    className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white border border-[#eae7dd] focus:border-[#1f4d2b] focus:outline-none text-[#2d2d2a]"
                  />
                </div>
                <div>
                  <label className="label-eyebrow text-[#5c5c5c]">Message</label>
                  <textarea
                    value={form.message}
                    onChange={handle("message")}
                    data-testid="form-message"
                    rows={5}
                    placeholder="Tell us what you need, when, and where..."
                    className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white border border-[#eae7dd] focus:border-[#1f4d2b] focus:outline-none text-[#2d2d2a] resize-none"
                  />
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={handleSubmitClick}
                  data-testid="form-submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#1f4d2b] text-[#f4c20d] font-semibold text-[14px] hover:-translate-y-[2px] transition-all"
                >
                  <Send size={15} /> Send via WhatsApp
                </a>
                <p className="text-[12px] text-[#5c5c5c] -mt-2">
                  Tap the button and WhatsApp will open with your message
                  pre-filled, sent to the right team — Cows & Goats go to +91 7339598737, Dogs / Poultry / Eggs go to +91 7305644912.
                </p>
              </form>
            </div>
          </Reveal>

          {/* CONTACT INFO */}
          <Reveal delay={120}>
            <div className="space-y-6">
              <div className="bg-white border border-[#eae7dd] rounded-2xl p-6 md:p-7">
                <p className="label-eyebrow text-[#1f4d2b]">Phone numbers</p>
                <div className="mt-4 grid gap-5">
                  <div className="border-t border-[#eae7dd] pt-4">
                    <p className="label-eyebrow text-[#5c5c5c]">Cow & Goat</p>
                    {CONTACTS.cowGoat.map((n) => (
                      <a
                        key={n}
                        href={`tel:+91${n}`}
                        data-testid={`contact-tel-cow-${n}`}
                        className="block font-serif-display text-2xl md:text-3xl text-[#1f4d2b] hover:text-[#16381f]"
                      >
                        +91 {n}
                      </a>
                    ))}
                  </div>
                  <div className="border-t border-[#eae7dd] pt-4">
                    <p className="label-eyebrow text-[#5c5c5c]">Dogs & Roosters</p>
                    {CONTACTS.dogCock.map((n) => (
                      <a
                        key={n}
                        href={`tel:+91${n}`}
                        data-testid={`contact-tel-dog-${n}`}
                        className="block font-serif-display text-2xl md:text-3xl text-[#1f4d2b] hover:text-[#16381f]"
                      >
                        +91 {n}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#eae7dd] rounded-2xl p-6 md:p-7">
                <p className="label-eyebrow text-[#1f4d2b]">Find us</p>
                <p className="mt-3 flex items-start gap-2 text-[#2d2d2a]">
                  <MapPin size={18} className="text-[#1f4d2b] mt-1" />
                  <span>{CONTACTS.location}</span>
                </p>
                <div className="mt-4 rounded-xl overflow-hidden aspect-[4/3] border border-[#eae7dd]">
                  <iframe
                    title="KSK Farms Map"
                    src={CONTACTS.mapsEmbed}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div className="bg-[#1f4d2b] text-white rounded-2xl p-6 md:p-7">
                <p className="label-eyebrow text-[#f4c20d]">Follow the farm</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={CONTACTS.whatsappGroup}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="contact-wa-group"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#f4c20d] text-[#1f4d2b] font-semibold text-[13px]"
                  >
                    <MessageCircle size={14} /> WhatsApp Group
                  </a>
                  <a
                    href={CONTACTS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="contact-instagram"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/30 text-white text-[13px] font-semibold hover:bg-white/10"
                  >
                    <Instagram size={14} /> @kannialazhann
                  </a>
                  <a
                    href={CONTACTS.youtube}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="contact-youtube"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/30 text-white text-[13px] font-semibold hover:bg-white/10"
                  >
                    <Youtube size={14} /> YouTube
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

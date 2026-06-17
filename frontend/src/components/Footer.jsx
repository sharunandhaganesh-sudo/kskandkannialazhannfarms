import { Link } from "react-router-dom";
import { Instagram, Youtube, MessageCircle, Phone, MapPin } from "lucide-react";
import { CONTACTS } from "../data/animals";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#1f4d2b] text-[#f9f8f6] relative overflow-hidden"
    >
      <div className="grain" />
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 pt-20 md:pt-28 pb-10 relative">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="label-eyebrow text-[#f4c20d]">Let's talk livestock</p>
            <h2 className="font-serif-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mt-4">
              Come visit
              <br />
              the farm.
            </h2>
            <p className="mt-6 text-[#f9f8f6]/75 max-w-xl text-[15px] leading-relaxed">
              Walk our pens. Meet the animals. Pick what you like. We're a
              family farm in Gopalapuram — straight talk, fair prices, healthy
              stock.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-2xl">
              <div className="border-t border-[#f9f8f6]/20 pt-5">
                <p className="label-eyebrow text-[#f4c20d]">Cow & Goat</p>
                <a
                  href={`tel:+91${CONTACTS.cowGoat[0]}`}
                  data-testid="footer-phone-cow"
                  className="block font-serif-display text-2xl mt-2 hover:text-[#f4c20d] transition-colors"
                >
                  +91 {CONTACTS.cowGoat[0]}
                </a>
              </div>
              <div className="border-t border-[#f9f8f6]/20 pt-5">
                <p className="label-eyebrow text-[#f4c20d]">Dogs & Roosters</p>
                <a
                  href={`tel:+91${CONTACTS.dogCock[0]}`}
                  data-testid="footer-phone-dog-1"
                  className="block font-serif-display text-2xl mt-2 hover:text-[#f4c20d] transition-colors"
                >
                  +91 {CONTACTS.dogCock[0]}
                </a>
                <a
                  href={`tel:+91${CONTACTS.dogCock[1]}`}
                  data-testid="footer-phone-dog-2"
                  className="block font-serif-display text-2xl hover:text-[#f4c20d] transition-colors"
                >
                  +91 {CONTACTS.dogCock[1]}
                </a>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <a
                href={CONTACTS.whatsappGroup}
                target="_blank"
                rel="noreferrer"
                data-testid="footer-whatsapp-group"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#f4c20d] text-[#1f4d2b] font-semibold text-[13px] hover:-translate-y-[1px] transition-all"
              >
                <MessageCircle size={15} /> Join WhatsApp Group
              </a>
              <a
                href={CONTACTS.instagram}
                target="_blank"
                rel="noreferrer"
                data-testid="footer-instagram"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#f9f8f6]/30 text-[#f9f8f6] text-[13px] font-semibold hover:bg-[#f9f8f6]/10"
              >
                <Instagram size={15} /> Instagram
              </a>
              <a
                href={CONTACTS.youtube}
                target="_blank"
                rel="noreferrer"
                data-testid="footer-youtube"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#f9f8f6]/30 text-[#f9f8f6] text-[13px] font-semibold hover:bg-[#f9f8f6]/10"
              >
                <Youtube size={15} /> YouTube
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#f9f8f6]/20 aspect-[4/3]">
              <iframe
                title="KSK Farms Location"
                src={CONTACTS.mapsEmbed}
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-4 flex items-center gap-2 text-[#f9f8f6]/80 text-sm">
              <MapPin size={14} className="text-[#f4c20d]" /> {CONTACTS.location}
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-[#f9f8f6]/15 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-20 bg-white rounded-md overflow-hidden border border-[#f9f8f6]/20">
              <img
                src="/animals/Logos.jpg"
                alt="KSK & Kannialazhann logos"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-[12px] text-[#f9f8f6]/65">
              © {new Date().getFullYear()} KSK & Kannialazhann Farm · Gopalapuram, Rajapalayam
            </p>
          </div>
          <div className="flex gap-5 text-[12px] text-[#f9f8f6]/70">
            <Link to="/category/dogs" className="hover:text-[#f4c20d]">Dogs</Link>
            <Link to="/category/cows" className="hover:text-[#f4c20d]">Cows</Link>
            <Link to="/category/goats" className="hover:text-[#f4c20d]">Goats</Link>
            <Link to="/category/poultry" className="hover:text-[#f4c20d]">Poultry</Link>
            <Link to="/contact" className="hover:text-[#f4c20d]">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

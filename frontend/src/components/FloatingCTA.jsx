import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { CONTACTS } from "../data/animals";
import { buildWhatsappLink } from "../lib/utils";

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex flex-col items-start gap-3">
      {open && (
        <div
          data-testid="floating-cta-menu"
          className="bg-white rounded-2xl shadow-2xl border border-[#eae7dd] p-2 w-72 animate-in fade-in slide-in-from-bottom-2"
        >
          <a
            href={buildWhatsappLink(
              CONTACTS.whatsappPrimary,
              "Hi! I'm interested in dogs / chickens from KSK & Kannialazhann Farm."
            )}
            target="_blank"
            rel="noreferrer"
            data-testid="float-wa-dog"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f9f8f6] transition-colors"
          >
            <span className="h-10 w-10 rounded-full bg-[#1f4d2b] text-[#f4c20d] flex items-center justify-center">
              <MessageCircle size={18} />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-[#2d2d2a]">
                Dogs & Roosters
              </span>
              <span className="block text-[11px] text-[#5c5c5c]">
                WhatsApp · +91 {CONTACTS.dogCock[0]}
              </span>
            </span>
          </a>
          <a
            href={buildWhatsappLink(
              CONTACTS.whatsappCowGoat,
              "Hi! I'm interested in cows / goats from KSK & Kannialazhann Farm."
            )}
            target="_blank"
            rel="noreferrer"
            data-testid="float-wa-cow"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f9f8f6] transition-colors"
          >
            <span className="h-10 w-10 rounded-full bg-[#1f4d2b] text-[#f4c20d] flex items-center justify-center">
              <MessageCircle size={18} />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-[#2d2d2a]">
                Cows & Goats
              </span>
              <span className="block text-[11px] text-[#5c5c5c]">
                WhatsApp · +91 {CONTACTS.cowGoat[0]}
              </span>
            </span>
          </a>
          <a
            href={`tel:+91${CONTACTS.dogCock[0]}`}
            data-testid="float-call"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f9f8f6] transition-colors"
          >
            <span className="h-10 w-10 rounded-full bg-[#f4c20d] text-[#1f4d2b] flex items-center justify-center">
              <Phone size={18} />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-[#2d2d2a]">
                Call us directly
              </span>
              <span className="block text-[11px] text-[#5c5c5c]">
                +91 {CONTACTS.dogCock[0]}
              </span>
            </span>
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        data-testid="floating-cta-toggle"
        className={`h-14 w-14 md:h-16 md:w-16 rounded-full bg-[#1f4d2b] text-[#f4c20d] flex items-center justify-center shadow-2xl pulse-ring hover:bg-[#16381f] transition-all ${
          open ? "rotate-90" : ""
        }`}
        aria-label="Open contact menu"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

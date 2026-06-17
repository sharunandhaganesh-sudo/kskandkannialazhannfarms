import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { CONTACTS } from "../data/animals";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/category/dogs", label: "Dogs" },
  { to: "/category/cows", label: "Cows" },
  { to: "/category/goats", label: "Goats" },
  { to: "/category/poultry", label: "Poultry" },
  { to: "/category/eggs", label: "Eggs" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#f9f8f6]/85 backdrop-blur-xl border-b border-[#eae7dd]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 h-20 flex items-center justify-between">
        <Link
          to="/"
          data-testid="brand-logo-link"
          className="flex items-center gap-3 group"
        >
          <div className="h-12 w-24 md:h-14 md:w-28 overflow-hidden rounded-md bg-white border border-[#eae7dd] flex items-center justify-center">
            <img
              src="/animals/Logos.jpg"
              alt="KSK & Kannialazhann Farm logos"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-serif-display text-[15px] md:text-[17px] font-semibold text-[#1f4d2b]">
              KSK <span className="text-[#2d2d2a]">×</span> Kannialazhann
            </div>
            <div className="label-eyebrow text-[#5c5c5c]">Farm · Rajapalayam</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              data-testid={`nav-link-${n.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-3 py-2 text-[14px] font-medium transition-all ${
                  isActive
                    ? "text-[#1f4d2b]"
                    : "text-[#2d2d2a]/75 hover:text-[#1f4d2b]"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:+91${CONTACTS.dogCock[0]}`}
            data-testid="navbar-call-btn"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1f4d2b] hover:bg-[#16381f] text-white text-[13px] font-semibold transition-all hover:-translate-y-[1px]"
          >
            <Phone size={15} /> Call Farm
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            className="lg:hidden h-11 w-11 rounded-full bg-white border border-[#eae7dd] flex items-center justify-center text-[#1f4d2b]"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          data-testid="mobile-nav-drawer"
          className="lg:hidden bg-[#f9f8f6] border-t border-[#eae7dd]"
        >
          <div className="px-5 py-4 flex flex-col">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                data-testid={`mobile-nav-link-${n.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `py-3 border-b border-[#eae7dd] font-serif-display text-2xl ${
                    isActive ? "text-[#1f4d2b]" : "text-[#2d2d2a]"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href={`tel:+91${CONTACTS.dogCock[0]}`}
              className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#1f4d2b] text-white font-semibold"
              data-testid="mobile-call-btn"
            >
              <Phone size={16} /> Call: +91 {CONTACTS.dogCock[0]}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

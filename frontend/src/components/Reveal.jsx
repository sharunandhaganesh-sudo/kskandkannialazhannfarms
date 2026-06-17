import { useEffect, useRef } from "react";

export default function Reveal({ children, delay = 0, as: As = "div", className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("in"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <As ref={ref} className={`reveal-up ${className}`}>
      {children}
    </As>
  );
}

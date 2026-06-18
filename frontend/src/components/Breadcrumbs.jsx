import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[12px] text-[#5c5c5c] flex gap-2 flex-wrap mb-6">
      {items.map((it, i) => (
        <span key={it.href} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {i === items.length - 1 ? (
            <span className="text-[#1f4d2b] font-semibold">{it.label}</span>
          ) : (
            <Link to={it.href} className="hover:underline">{it.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}

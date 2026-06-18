import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";

export default function NotFoundPage() {
  useSEO({
    title: "Page Not Found — KSK & Kannialazhann Farm",
    description: "This page doesn't exist. Browse our goats, dogs, cows, poultry and eggs instead.",
    noindex: true,
  });
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5 pt-32">
      <p className="label-eyebrow text-[#1f4d2b]">404</p>
      <h1 className="font-serif-display text-4xl md:text-6xl mt-3 text-[#2d2d2a]">
        That page wandered off the farm.
      </h1>
      <Link to="/" className="mt-8 inline-flex px-6 py-4 rounded-full bg-[#1f4d2b] text-[#f4c20d] font-semibold">
        Back to the farm
      </Link>
    </div>
  );
}

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const buildWhatsappLink = (number, message) => {
  const text = encodeURIComponent(message || "");
  return `https://wa.me/${number}?text=${text}`;
};

export const buildTelLink = (number) => `tel:+91${number}`;

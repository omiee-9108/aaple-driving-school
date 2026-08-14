import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIndianPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

export function getWhatsAppLink(message?: string): string {
  const phone = "917083127002";
  const defaultText = "Namaskar! I want to enquire about driving classes / RTO services at Aaple Motor Driving School Miraj.";
  const text = encodeURIComponent(message || defaultText);
  return `https://wa.me/${phone}?text=${text}`;
}

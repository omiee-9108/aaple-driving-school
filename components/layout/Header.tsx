"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Menu,
  X,
  ShieldCheck,
  Award,
  ChevronDown,
  Car,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "@/components/ui/Button";
import { useEnquireModal } from "@/components/forms/EnquireModal";
import { servicesData } from "@/data/servicesData";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { openEnquireModal } = useEnquireModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="w-full sticky top-0 z-40 bg-white">
      {/* Top Notification / Trust Bar */}
      <div className="bg-brand-950 text-slate-200 text-xs py-2 px-4 border-b border-brand-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left: Location & RTO Authorization */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Govt. Authorized • RTO Miraj (MH-10)
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              Gandhi Chowk / RTO Ground, Miraj
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              Batches: 6:30 AM – 8:30 PM (7 Days)
            </span>
          </div>

          {/* Right: Direct Helplines */}
          <div className="flex items-center gap-4 font-medium">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{siteConfig.phone}</span>
            </a>
            <span className="text-brand-700">|</span>
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                siteConfig.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">WhatsApp Enquiry</span>
              <span className="sm:hidden">Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled ? "shadow-md py-2.5 bg-white/95 backdrop-blur-md" : "py-3.5 bg-white border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-900 to-brand-700 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-brand-900 transition-colors">
                  Aaple Motor
                </span>
                <span className="text-xs font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded border border-amber-300 uppercase">
                  MH-10
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-brand-700 mt-0.5">
                Driving School • Miraj
              </p>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                आपले मोटर ड्रायव्हिंग स्कूल
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname === "/"
                  ? "text-brand-900 bg-brand-50"
                  : "text-slate-700 hover:text-brand-900 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-1 ${
                  pathname.startsWith("/services")
                    ? "text-brand-900 bg-brand-50"
                    : "text-slate-700 hover:text-brand-900 hover:bg-slate-50"
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              {/* Mega Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-[580px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 grid grid-cols-2 gap-2 z-50 animate-scale-up">
                  <div className="col-span-2 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      All 10 Driving & RTO Services
                    </span>
                    <Link
                      href="/services"
                      className="text-xs font-bold text-brand-700 hover:underline"
                    >
                      View All Services →
                    </Link>
                  </div>
                  {servicesData.slice(0, 8).map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="p-2.5 rounded-xl hover:bg-brand-50/80 transition-colors group/item flex items-start gap-2.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-900 flex items-center justify-center flex-shrink-0 group-hover/item:bg-brand-900 group-hover/item:text-white transition-colors">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover/item:text-brand-900">
                          {service.name}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">
                          {service.shortDescription}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                    <Link
                      href="/services/number-registration"
                      className="text-slate-600 hover:text-brand-900 font-medium"
                    >
                      • Number Registration
                    </Link>
                    <Link
                      href="/services/choice-number-booking"
                      className="text-slate-600 hover:text-brand-900 font-medium"
                    >
                      • VIP Choice Number
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname === "/about"
                  ? "text-brand-900 bg-brand-50"
                  : "text-slate-700 hover:text-brand-900 hover:bg-slate-50"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/faq"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname === "/faq"
                  ? "text-brand-900 bg-brand-50"
                  : "text-slate-700 hover:text-brand-900 hover:bg-slate-50"
              }`}
            >
              FAQs
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname === "/contact"
                  ? "text-brand-900 bg-brand-50"
                  : "text-slate-700 hover:text-brand-900 hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-700" />
              <span>Call: {siteConfig.phone}</span>
            </a>
            <Button
              variant="primary"
              size="md"
              onClick={() => openEnquireModal()}
              className="bg-brand-900 hover:bg-brand-950 text-white font-bold"
            >
              Enquire Now (माहिती घ्या)
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openEnquireModal()}
              className="bg-brand-900 text-white text-xs font-bold px-3 py-2 rounded-lg"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                pathname === "/" ? "bg-brand-50 text-brand-900" : "text-slate-800"
              }`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                pathname === "/services" ? "bg-brand-50 text-brand-900" : "text-slate-800"
              }`}
            >
              All Services & Courses
            </Link>
            <div className="pl-4 space-y-1 border-l-2 border-brand-100 my-2">
              {servicesData.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="block py-1.5 text-xs text-slate-600 hover:text-brand-900 font-medium"
                >
                  • {s.name}
                </Link>
              ))}
            </div>
            <Link
              href="/about"
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                pathname === "/about" ? "bg-brand-50 text-brand-900" : "text-slate-800"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/faq"
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                pathname === "/faq" ? "bg-brand-50 text-brand-900" : "text-slate-800"
              }`}
            >
              FAQs
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                pathname === "/contact" ? "bg-brand-50 text-brand-900" : "text-slate-800"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Direct Action Buttons */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm shadow"
            >
              <Phone className="w-4 h-4" />
              Call Now: {siteConfig.phone}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                siteConfig.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-sm shadow"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

import React from "react";
import Link from "next/link";
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Award,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { servicesData } from "@/data/servicesData";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-950 text-slate-300 pt-16 pb-12 border-t border-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & NAP */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-700 rounded-xl flex items-center justify-center text-amber-400">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Aaple Motor
                </span>
                <p className="text-xs font-semibold text-brand-300">
                  Driving School • Miraj (MH-10)
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Miraj's premier government-authorized motor driving school & RTO consultancy center. 16+ years of road training excellence, dual-control safety vehicles, and 99.2% first-attempt license passing record.
            </p>

            <div className="inline-flex items-center gap-2 bg-brand-900/60 border border-brand-800 px-3 py-2 rounded-lg text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              RTO Miraj Approved Training Center
            </div>
          </div>

          {/* Col 2: Quick Links & Pages */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-500" />
                  All 10 Services & Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-500" />
                  About Our Miraj Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-500" />
                  RTO FAQs & Documents Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-500" />
                  Contact & Admission Form
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-500" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-500" />
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Driving & RTO Services
            </h3>
            <ul className="space-y-2 text-xs">
              {servicesData.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-brand-500" />
                    <span>{s.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-amber-400 hover:text-amber-300 font-semibold inline-block pt-1"
                >
                  View All 10 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Miraj Office & Helplines
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed">
                  {siteConfig.address.full}
                  <span className="block text-slate-500 mt-0.5">({siteConfig.address.landmark})</span>
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-white font-bold">
                    {siteConfig.phone}
                  </a>
                  <span className="text-slate-500 mx-1.5">•</span>
                  <a href={`tel:${siteConfig.altPhoneRaw}`} className="hover:text-white">
                    {siteConfig.altPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                    siteConfig.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  WhatsApp: +91 {siteConfig.whatsappRaw.slice(2)}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1 border-t border-slate-800">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-200 font-semibold">{siteConfig.operatingHours.timing}</div>
                  <div className="text-slate-400 text-[11px]">Open 7 Days a Week (Mon – Sun)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Aaple Motor Driving School, Miraj. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-slate-300">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-slate-300">
              Sitemap
            </Link>
            <span>•</span>
            <Link
              href="/admin"
              className="text-slate-600 hover:text-slate-400 transition-colors inline-flex items-center gap-1"
              title="Proprietor Management Portal"
            >
              <span>🔒</span>
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

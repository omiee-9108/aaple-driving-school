"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  Award,
  CheckCircle2,
  Phone,
  MessageCircle,
  Car,
  Users,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { useEnquireModal } from "@/components/forms/EnquireModal";

export const HeroSection: React.FC = () => {
  const { openEnquireModal } = useEnquireModal();

  return (
    <section className="relative bg-gradient-to-b from-brand-950 via-brand-900 to-slate-900 text-white overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Trust Badges, Value Props */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Government Authorized Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-800/80 border border-brand-700/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Govt. Authorized • RTO Miraj (MH-10)</span>
              <span className="hidden sm:inline text-brand-400">•</span>
              <span className="hidden sm:inline text-slate-200">16+ Years of Trust</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
              Learn Driving with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                100% Road Confidence
              </span>{" "}
              & Guaranteed RTO Passing
            </h1>

            {/* Marathi Subtitle */}
            <p className="text-base sm:text-lg text-brand-200 font-medium">
              मिरज व सांगली परिसरातील अग्रगण्य मोटर ड्रायव्हिंग ट्रेनिंग व आरटीओ सेवा केंद्र
            </p>

            {/* Paragraph summary */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Step into the driver’s seat with peace of mind. Dual-control sanitized cars, mock track tests on the Miraj RTO ground, dedicated female instructors, and end-to-end Smart Card Driving License assistance.
            </p>

            {/* Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Dual-control safety training cars</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Miraj RTO track simulator practice</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Doorstep pick & drop across Miraj</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Flexible batches (6:30 AM to 8:30 PM)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button
                variant="accent"
                size="lg"
                onClick={() => openEnquireModal()}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-7 shadow-lg shadow-amber-500/20"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Book Free Trial Class (मोफत डेमो)
              </Button>

              <Button
                variant="outline"
                size="lg"
                href="/services"
                className="w-full sm:w-auto border-brand-400 text-white hover:bg-brand-800/80 hover:text-white"
              >
                Explore All Services & Packages →
              </Button>
            </div>

            {/* Quick Trust Strip */}
            <div className="pt-6 border-t border-brand-800/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9/5</span>
                <span className="text-slate-400">(420+ Miraj Google Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">12,500+</span>
                <span className="text-slate-400">Drivers Trained</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Conversion Lead Capture Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 border border-slate-100 relative">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Special Discount Batch Open
              </div>

              <div className="mb-5">
                <h3 className="text-xl font-bold text-slate-900">
                  Enquire & Get Fees Details
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Fill below for instant fee quotes, batch timing & RTO slot check.
                </p>
              </div>

              <LeadForm
                sourceContext="Hero Card"
                compact={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

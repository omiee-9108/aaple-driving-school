"use client";

import React from "react";
import { Phone, MessageCircle, Sparkles, ShieldCheck, Car } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "@/components/ui/Button";
import { useEnquireModal } from "@/components/forms/EnquireModal";

export const HomeCTA: React.FC = () => {
  const { openEnquireModal } = useEnquireModal();

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-r from-brand-950 via-brand-900 to-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Limited Batch Slots Available in Miraj
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
          Ready to Start Your Driving Journey with Complete Confidence?
        </h2>

        <p className="text-sm sm:text-base text-brand-200 max-w-2xl mx-auto leading-relaxed">
          Book your first dual-control trial session or get your driving license renewed without waiting in long queues. We are right opposite Miraj RTO ground.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            variant="accent"
            size="lg"
            onClick={() => openEnquireModal()}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 shadow-xl shadow-amber-500/20"
          >
            Enquire Now / मोफत सल्ला
          </Button>

          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-lg text-sm shadow-md transition-all"
          >
            <Phone className="w-4 h-4" />
            Call: {siteConfig.phone}
          </a>

          <a
            href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
              siteConfig.whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-lg text-sm shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>

        <div className="pt-6 border-t border-brand-800/80 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Genuine RTO Processing
          </span>
          <span className="flex items-center gap-1.5">
            <Car className="w-4 h-4 text-amber-400" />
            Doorstep Pickup Available
          </span>
          <span>Open Mon – Sun (6:30 AM – 8:30 PM)</span>
        </div>
      </div>
    </section>
  );
};

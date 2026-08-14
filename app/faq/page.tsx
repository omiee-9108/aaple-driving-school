import React from "react";
import { Metadata } from "next";
import { getAllFAQs } from "@/sanity/client";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { HelpCircle, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { HomeCTA } from "@/components/home/HomeCTA";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) & RTO Rules | Aaple Driving School Miraj",
  description:
    "Got questions about Learning License, Permanent Driving License, RTO Miraj test tracks, documents needed, or fees? Read our complete FAQ guide.",
};

export const revalidate = 60;

export default async function FAQPage() {
  const faqs = await getAllFAQs();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-800 border border-brand-700 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Clear Answers • Zero Confusion
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-base sm:text-lg text-brand-200 font-medium">
            आरटीओ नियम, ड्रायव्हिंग लायसन्स व कोर्सेसबद्दल विचारले जाणारे प्रश्न
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about learning license procedures, document checklists, batch timings, and RTO passing guidelines in Miraj.
          </p>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion items={faqs} showSearch={true} showCategoryFilters={true} />
      </section>

      <HomeCTA />
    </div>
  );
}

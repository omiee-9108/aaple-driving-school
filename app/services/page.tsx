import React from "react";
import { Metadata } from "next";
import { getAllServices } from "@/sanity/client";
import { ServiceHighlights } from "@/components/home/ServiceHighlights";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldCheck, FileCheck, Phone, MessageCircle, Clock } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Driving Courses & RTO Services in Miraj | Fees & Packages",
  description:
    "Explore our complete list of driving courses and RTO services in Miraj: 2-Wheeler (₹3,000), 4-Wheeler Car Training (₹4,000), 2+4 Wheeler Combo (₹4,500), Driving License Renewal (₹1,500), PUC Testing (₹150/₹200), RC Transfer, Heavy Vehicle, and VIP Numbers.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-800 border border-brand-700 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            100% RTO Miraj (MH-10) Authorized
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Our Complete Driving & RTO Services
          </h1>

          <p className="text-base sm:text-lg text-brand-200 font-medium">
            मिरज व सांगली परिसरातील सर्व अधिकृत ड्रायव्हिंग कोर्सेस व वाहन सेवा
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From comprehensive dual-pedal car training to fast-track driving license renewals and instant PUC certificates, we manage all paperwork and road training end-to-end.
          </p>
        </div>
      </section>

      {/* Services Highlights Grid with Filter */}
      <ServiceHighlights services={services} />

      {/* RTO Document Advisory Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-8 sm:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-brand-200">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Quick RTO Advisory
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-950 mt-1">
                  Common Documents Checklist for Any RTO Service
                </h3>
              </div>
              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                  "Namaskar! Please send me the complete RTO documents checklist."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                Get Checklist on WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl border border-brand-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-900 flex items-center justify-center font-bold text-xs mb-2">
                  1
                </div>
                <h4 className="text-xs font-bold text-slate-900">Proof of Age & ID</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Aadhaar Card, PAN Card, Passport, or 10th School Leaving Certificate.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-brand-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-900 flex items-center justify-center font-bold text-xs mb-2">
                  2
                </div>
                <h4 className="text-xs font-bold text-slate-900">Proof of Address</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Aadhaar Card with Miraj/Sangli address, Electricity bill, or Rent Agreement.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-brand-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-900 flex items-center justify-center font-bold text-xs mb-2">
                  3
                </div>
                <h4 className="text-xs font-bold text-slate-900">Photographs</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  4 recent passport-size color photos with clean white background.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-brand-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-900 flex items-center justify-center font-bold text-xs mb-2">
                  4
                </div>
                <h4 className="text-xs font-bold text-slate-900">Medical Fitness</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Form 1A medical verification by doctor (handled at our office).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

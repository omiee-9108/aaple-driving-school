import React from "react";
import { Metadata } from "next";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Contact Us & Admission Enquiry | Aaple Motor Driving School Miraj",
  description:
    "Get in touch with Aaple Motor Driving School in Miraj, Maharashtra. Enroll for driving classes, book RTO test slots, or request fee details. Office: +91 88883 34136, Personal: +91 70288 37002.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-800 border border-brand-700 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300">
            <Clock className="w-4 h-4 text-amber-400" />
            Open 7 Days a Week: 6:30 AM – 8:30 PM
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Contact Us & Book Free Consultation
          </h1>

          <p className="text-base sm:text-lg text-brand-200 font-medium">
            प्रवेश व चौकशीसाठी संपर्क साधा — मोफत मार्गदर्शन
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Fill out the admission enquiry form below or reach out directly to our Miraj office team via phone or WhatsApp.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Contact Cards */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Lead Capture Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-card">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Online Admission & Service Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Please provide your contact number. Our team from Miraj RTO center will get back to you with exact fees and batch options within 15 minutes.
              </p>
            </div>

            <LeadForm sourceContext="Contact Page Form" compact={false} />
          </div>

          {/* Right Column: Contact Cards & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Direct Helplines */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-5">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                Direct Helplines & Office
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900">Official Contact Numbers</div>
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-200/80 px-1.5 py-0.5 rounded">Office:</span>
                        <a href={`tel:${siteConfig.phoneRaw}`} className="text-brand-800 font-bold hover:underline">
                          {siteConfig.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-200/80 px-1.5 py-0.5 rounded">Personal:</span>
                        <a href={`tel:${siteConfig.altPhoneRaw}`} className="text-brand-800 font-semibold hover:underline">
                          {siteConfig.altPhone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <MessageCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">WhatsApp Instant Support</div>
                    <p className="text-xs text-slate-600 mt-0.5">Quick replies for fees & document checklist</p>
                    <a
                      href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                        siteConfig.whatsappMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs font-bold text-emerald-700 hover:underline"
                    >
                      Click to Chat on WhatsApp (+91 {siteConfig.whatsappRaw.slice(2)}) →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Miraj Office Address</div>
                    <p className="text-slate-600 mt-1 leading-relaxed text-xs">
                      {siteConfig.address.full}
                    </p>
                    <p className="text-[11px] text-amber-800 font-semibold mt-1">
                      Landmark: {siteConfig.address.landmark}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <Clock className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Operating Timings</div>
                    <p className="text-slate-600 mt-0.5 text-xs">{siteConfig.operatingHours.timing}</p>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                      Open 7 Days a Week (Mon – Sun)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Map & Location Indicator */}
            <div className="bg-brand-900 rounded-2xl p-6 text-white space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase">
                <Navigation className="w-4 h-4" />
                Easy Location in Miraj
              </div>
              <h4 className="text-base font-bold">
                Conveniently located opposite Miraj RTO Test Ground
              </h4>
              <p className="text-xs text-brand-200 leading-relaxed">
                Just 5 minutes from Miraj Railway Station & Gandhi Chowk. Students from Sangli, Kupwad, and Jaysingpur can easily reach our ground.
              </p>
              <a
                href="https://maps.google.com/?q=Miraj+RTO+Office+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-bold bg-white text-brand-950 hover:bg-slate-100 px-4 py-2 rounded-lg transition-colors"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

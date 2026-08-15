"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Award,
  ChevronRight,
  Car,
  Phone,
  MessageCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { ServiceDetail, servicesData } from "@/data/servicesData";
import { siteConfig } from "@/data/siteConfig";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { Badge } from "@/components/ui/Badge";
import { LeadForm } from "@/components/forms/LeadForm";

interface ServiceDetailViewProps {
  service: ServiceDetail;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ service }) => {
  const relatedServices = servicesData
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb & Hero Header */}
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-amber-400 font-semibold truncate">
              {service.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent" className="font-bold uppercase tracking-wider text-[11px]">
                  {service.categoryLabel}
                </Badge>
                {service.badge && (
                  <Badge variant="safety" className="font-bold text-[11px]">
                    {service.badge}
                  </Badge>
                )}
                <span className="text-xs text-brand-200">
                  RTO Miraj (MH-10) Approved
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                {service.name}
              </h1>

              <p className="text-base sm:text-lg text-brand-200 font-medium">
                {service.marathiName}
              </p>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
                {service.shortDescription}
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold">
                <div className="flex items-center gap-2 bg-brand-800/80 px-3 py-2 rounded-lg border border-brand-700">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Timeline: {service.estimatedTime}</span>
                </div>
                {service.priceDisplay && (
                  <div className="flex items-center gap-2 bg-emerald-900/60 px-3 py-2 rounded-lg border border-emerald-700 text-emerald-300">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Price: {service.priceDisplay}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Contact Box on Hero */}
            <div className="lg:col-span-4 bg-brand-800/40 border border-brand-700/60 rounded-2xl p-6 backdrop-blur-sm text-center lg:text-left space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Direct Miraj RTO Helpline
              </div>
              <div className="text-lg font-bold text-white">
                Need immediate slot or fee details?
              </div>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-white text-brand-950 font-bold py-2.5 px-4 rounded-lg text-xs hover:bg-slate-100 transition-colors shadow"
              >
                <Phone className="w-4 h-4 text-brand-700" />
                Call: {siteConfig.phone}
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                  `Namaskar! I am inquiring about ${service.name} at Aaple Driving School Miraj.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-lg text-xs hover:bg-emerald-700 transition-colors shadow"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details, Inclusions, Documents, Process */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                Service Overview & Inclusions
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {service.fullDescription}
              </p>

              {/* Inclusions Checklist */}
              {service.inclusions && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    What is Included in this Package:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.inclusions.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Training Fleet / Vehicle Models if available */}
              {service.vehicleTypes && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Training Fleet & Available Vehicles:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.vehicleTypes.map((v, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-900 border border-brand-200 text-xs font-semibold px-3 py-1.5 rounded-lg"
                      >
                        <Car className="w-3.5 h-3.5 text-brand-700" />
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Documents Required Checklist */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Documents Required (कागदपत्रे यादी)
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Please bring original documents or clear photocopies to our Miraj office or send on WhatsApp.
              </p>

              <div className="space-y-3">
                {service.documentsRequired.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 text-xs sm:text-sm text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="font-medium leading-relaxed">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Process */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Step-by-Step Execution Process
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Transparent timeline from initial enrollment to final delivery in Miraj.
              </p>

              <div className="space-y-4">
                {service.stepByStepProcess.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-900 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                      {step.stepNumber}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service-Specific FAQs if available */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-brand-600" />
                  Frequently Asked Questions regarding {service.name}
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        {faq.question}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Lead Capture Form & Related Services */}
          <div className="lg:col-span-4 space-y-8">
            {/* Sticky Lead Form */}
            <div className="sticky top-24 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-card">
              <div className="mb-4">
                <Badge variant="accent" className="mb-2">
                  Fast Response
                </Badge>
                <h3 className="text-lg font-bold text-slate-900">
                  Enquire for {service.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill your details to get exact fee estimate & batch availability.
                </p>
              </div>

              <LeadForm
                defaultServiceSlug={service.slug}
                sourceContext={`Service Detail: ${service.name}`}
                compact={true}
              />
            </div>

            {/* Other RTO Services Widget */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Related Services in Miraj
              </h3>
              <div className="space-y-3">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/services/${rel.slug}`}
                    className="block p-3 rounded-xl hover:bg-brand-50/70 border border-slate-100 transition-colors group"
                  >
                    <div className="text-xs font-bold text-slate-900 group-hover:text-brand-900 flex items-center justify-between">
                      <span>{rel.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-900" />
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {rel.shortDescription}
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/services"
                className="block text-center text-xs font-bold text-brand-700 hover:text-brand-900 pt-2"
              >
                View All Services & Courses →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

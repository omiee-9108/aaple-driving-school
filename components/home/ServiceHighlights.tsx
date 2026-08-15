"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetail, ServiceCategory } from "@/data/servicesData";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface ServiceHighlightsProps {
  services: ServiceDetail[];
}

export const ServiceHighlights: React.FC<ServiceHighlightsProps> = ({ services }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Services (सर्व सेवा)" },
    { id: "training", label: "🚗 Driving Courses (वाहन प्रशिक्षण)" },
    { id: "license", label: "🪪 License Services (लायसन्स सेवा)" },
    { id: "vehicle_rto", label: "📄 RC & Vehicle Passing (वाहन आरटीओ)" },
    { id: "puc_choice", label: "💨 PUC & VIP Numbers" },
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Complete Service Offerings"
          title="RTO Approved Driving Courses & Vehicle Services in Miraj"
          marathiTitle="आपले मोटर ड्रायव्हिंग स्कूलच्या सर्व अधिकृत सेवा"
          subtitle="Explore our comprehensive array of driving license assistance, practical courses, instant PUC testing, and vehicle documentation."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-brand-900 text-white shadow-md scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-100 hover:text-brand-900 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            href="/services"
            className="border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white"
          >
            Explore All Services & Packages with Detailed Pricing →
          </Button>
        </div>
      </div>
    </section>
  );
};

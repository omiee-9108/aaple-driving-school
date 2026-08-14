"use client";

import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Award } from "lucide-react";
import { TestimonialItem } from "@/data/testimonialsData";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real Local Experiences"
          title="Loved by Students & License Holders in Miraj"
          marathiTitle="विद्यार्थी व नागरिकांचे समाधानकारक अनुभव"
          subtitle="Read verified reviews from doctors, students, working women, and business owners who learned driving with us."
        />

        {/* Carousel & Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between group hover:border-brand-300"
            >
              <div>
                {/* Rating & Service Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold bg-brand-100 text-brand-900 px-2 py-0.5 rounded-full border border-brand-200">
                    {item.serviceUsed}
                  </span>
                </div>

                {/* Quote Body */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic relative">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-900 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    {item.avatarPlaceholder}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {item.role} • {item.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google 4.9 Star Trust Banner */}
        <div className="mt-12 p-6 bg-gradient-to-r from-brand-900 to-brand-950 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-brand-950 flex items-center justify-center font-black text-xl shadow-md">
              4.9★
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">
                Rated 4.9/5 Across 420+ Reviews in Miraj & Sangli
              </h4>
              <p className="text-xs text-brand-200">
                100% genuine feedback from students trained on Miraj RTO grounds.
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold bg-white text-brand-950 hover:bg-slate-100 px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Check Google Maps Reviews →
          </a>
        </div>
      </div>
    </section>
  );
};

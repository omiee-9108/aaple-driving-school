"use client";

import React from "react";
import { Check, X, ShieldCheck, Car, Clock, Sparkles, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useEnquireModal } from "@/components/forms/EnquireModal";

export const WhyChooseUs: React.FC = () => {
  const { openEnquireModal } = useEnquireModal();

  const comparisonRows = [
    {
      feature: "Official RTO Miraj (MH-10) Recognition",
      aaple: true,
      others: "Unregistered / Middlemen",
    },
    {
      feature: "Dual-Control Auxiliary Brake & Clutch Vehicles",
      aaple: true,
      others: "Often Single-Pedal / Risky",
    },
    {
      feature: "Miraj RTO Ground Simulation Track Practice",
      aaple: true,
      others: "Only random highway driving",
    },
    {
      feature: "Dedicated Lady Instructors for Women",
      aaple: true,
      others: "Rarely Available",
    },
    {
      feature: "Doorstep Pick & Drop Service Across Miraj",
      aaple: true,
      others: "Must travel to their stand",
    },
    {
      feature: "First-Attempt Passing Record",
      aaple: "99.2% Verified",
      others: "Frequent Re-tests & Delays",
    },
    {
      feature: "Transparent Government Fee Breakdown",
      aaple: true,
      others: "Hidden extra costs at RTO",
    },
  ];

  const fleet = [
    {
      name: "Maruti Suzuki Swift (Dual-Control)",
      type: "4-Wheeler (Hatchback)",
      features: "Power Steering • AC • Dual Pedals • Reverse Sensor",
      badge: "Learner Favorite",
    },
    {
      name: "Maruti Suzuki WagonR (High Seating)",
      type: "4-Wheeler (Tall Boy)",
      features: "Clear Visibility • Easy Clutch • Perfect for Beginners",
      badge: "High Visibility",
    },
    {
      name: "Hyundai Grand i10",
      type: "4-Wheeler (Sedan-feel)",
      features: "Smooth Gearbox • Tight Turning Radius • Parking Ease",
      badge: "Modern Fleet",
    },
    {
      name: "Honda Activa 6G & Geared 150cc",
      type: "2-Wheeler (Scooty & Bike)",
      features: "8-Track Balance • Dual Brake • Lightweight Handling",
      badge: "Ladies Choice",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Aaple Difference"
          title="Why 12,500+ Drivers in Miraj Choose Us Over Others"
          marathiTitle="इतरांपेक्षा आपले मोटर ड्रायव्हिंग स्कूलच का निवडावे?"
          subtitle="We focus on deep driving instincts, zero-anxiety road training, and certified legal compliance."
        />

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden mb-16">
          <div className="p-6 bg-brand-900 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                Feature Comparison: Transparent & Verified
              </h3>
              <p className="text-xs text-brand-200 mt-0.5">
                See why smart learners in Sangli-Miraj trust our proven training methodology.
              </p>
            </div>
            <span className="text-xs font-bold bg-amber-400 text-brand-950 px-3 py-1.5 rounded-full uppercase tracking-wider">
              100% Honest Standard
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-700">
                  <th className="py-4 px-6 font-bold">Training Standard / Facility</th>
                  <th className="py-4 px-6 font-extrabold text-brand-900 bg-brand-50/70 w-1/3 text-center border-x border-slate-200">
                    🚗 Aaple Driving School Miraj
                  </th>
                  <th className="py-4 px-6 font-semibold text-slate-500 w-1/3 text-center">
                    ❌ Unorganized Driving Tutors
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-6 bg-brand-50/40 text-center border-x border-slate-100">
                      {typeof row.aaple === "boolean" && row.aaple ? (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                          <Check className="w-5 h-5 text-emerald-600 stroke-[3]" /> Yes, 100% Included
                        </span>
                      ) : (
                        <span className="font-bold text-brand-900">{row.aaple}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-500">
                      <span className="inline-flex items-center gap-1 font-medium text-slate-500">
                        <X className="w-4 h-4 text-red-500 stroke-[2]" /> {row.others}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fleet Showcase Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900">
              Modern, Sanitized Training Fleet
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              All vehicles are fitted with dual pedal controls and maintained to highest safety guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fleet.map((car, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center">
                      <Car className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                      {car.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {car.name}
                  </h4>
                  <p className="text-xs font-semibold text-brand-700 mt-0.5">
                    {car.type}
                  </p>
                  <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                    {car.features}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => openEnquireModal()}
                    className="w-full text-xs font-bold text-brand-900 hover:text-brand-700 py-1.5 rounded-lg border border-brand-200 hover:bg-brand-50 transition-colors"
                  >
                    Select this Vehicle →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

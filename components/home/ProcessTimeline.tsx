import React from "react";
import { FileCheck, Car, Navigation, Award, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: FileCheck,
      title: "Enroll & Learner License (LL)",
      marathi: "नोंदणी व शिकाऊ परवाना",
      description:
        "Submit basic KYC documents (Aadhaar & Photo). We file your Sarathi application, provide computer mock tests, and secure your digital LL within 48-72 hours.",
      highlight: "Online Sarathi Portal Filing",
    },
    {
      number: "02",
      icon: Car,
      title: "Dual-Control Practical Training",
      marathi: "प्रत्यक्ष रस्त्यावरील सुरक्षित ड्रायव्हिंग",
      description:
        "Master clutch bite-point, gear progression, mirror observation, steering technique, and traffic navigation with our certified instructors on dual-pedal cars.",
      highlight: "15 to 21 Daily Sessions",
    },
    {
      number: "03",
      icon: Navigation,
      title: "Miraj RTO Ground Simulation",
      marathi: "आरटीओ ट्रॅक मॉक टेस्ट सराव",
      description:
        "Rigorous practice on the exact 8-figure shape, H-track reverse bay, and hill-slope restart setup to eliminate any exam day fear.",
      highlight: "99.2% First-Attempt Pass Rate",
    },
    {
      number: "04",
      icon: Award,
      title: "Official Test & Smart Card DL",
      marathi: "अधिकृत परीक्षा व स्मार्ट कार्ड परवाना",
      description:
        "Appear for the final RTO driving test in our familiar training car. After inspector clearance, your chip-embedded Smart Card DL is dispatched to your doorstep.",
      highlight: "Doorstep Speed-Post Delivery",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Simple 4-Step Journey"
          title="How It Works: From Learner to Licensed Driver"
          marathiTitle="आपला परवाना मिळवण्याची सोपी व जलद प्रक्रिया"
          subtitle="We eliminate all red tape and RTO queues with a structured, step-by-step training system."
        />

        {/* Timeline Grid */}
        <div className="relative mt-12">
          {/* Connecting Line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-brand-200 via-brand-500 to-emerald-500 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl font-black text-brand-900 group-hover:text-brand-600 transition-colors">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center group-hover:bg-brand-900 group-hover:text-white transition-all shadow-sm">
                        <IconComp className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-brand-700 mt-0.5">
                      {step.marathi}
                    </p>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50/70 px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{step.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

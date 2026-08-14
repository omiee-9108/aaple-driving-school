import React from "react";
import { ShieldCheck, Car, Navigation, Users, Award, Clock } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const TrustBadges: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "RTO Miraj (MH-10) Authorized",
      marathi: "अधिकृत व मान्यताप्राप्त",
      description: "100% compliant with Central Motor Vehicle rules with direct Sarathi portal integration.",
      color: "from-blue-600 to-brand-800",
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      icon: Car,
      title: "Dual-Control Safety Fleet",
      marathi: "ड्युअल कंट्रोल सुरक्षा गाड्या",
      description: "Instructor auxiliary brake & clutch controls ensure zero accidents or stall anxiety.",
      color: "from-emerald-600 to-teal-800",
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Navigation,
      title: "Miraj RTO Ground Simulation",
      marathi: "आरटीओ ट्रॅक सराव",
      description: "Exact 8-figure, H-track reverse, and gradient hill-start practice before the real test.",
      color: "from-amber-600 to-orange-800",
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      icon: Users,
      title: "Dedicated Lady Instructors",
      marathi: "महिलांसाठी स्वतंत्र शिक्षिका",
      description: "Patient, supportive female instructors for women learners desiring comfortable training.",
      color: "from-purple-600 to-indigo-800",
      iconBg: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((pillar, idx) => {
          const IconComp = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-elevated border border-slate-100 transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${pillar.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    Trust Badge #{idx + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-brand-900 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs font-semibold text-brand-600 mt-0.5">
                  {pillar.marathi}
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

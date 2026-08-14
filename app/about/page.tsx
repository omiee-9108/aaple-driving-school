import React from "react";
import { Metadata } from "next";
import {
  ShieldCheck,
  Award,
  Users,
  Car,
  Navigation,
  CheckCircle2,
  HeartHandshake,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HomeCTA } from "@/components/home/HomeCTA";

export const metadata: Metadata = {
  title: "About Us | Aaple Motor Driving School Miraj",
  description:
    "Learn about Aaple Motor Driving School in Miraj, Maharashtra (MH-10). 16+ years of road safety training, certified male & female instructors, dual-control cars, and 12,500+ successful drivers.",
};

export default function AboutPage() {
  const stats = [
    { label: "Years of Road Training", value: "16+", subtitle: "Serving Miraj & Sangli" },
    { label: "Successful License Holders", value: "12,500+", subtitle: "Trained & Certified" },
    { label: "First-Attempt Pass Rate", value: "99.2%", subtitle: "RTO Miraj Ground" },
    { label: "Dual-Control Fleet", value: "12+", subtitle: "Modern Hatchbacks & 2W" },
  ];

  const coreValues = [
    {
      icon: ShieldCheck,
      title: "Uncompromising Road Safety",
      description:
        "Every single practical driving kilometer is supervised using dual-control safety pedal systems to protect learners and instil rock-solid driving instincts.",
    },
    {
      icon: Users,
      title: "Patient & Inclusive Coaching",
      description:
        "We understand that every learner is different. Whether you are 18 or 55, our certified male and female trainers provide respectful, pressure-free teaching.",
    },
    {
      icon: Award,
      title: "100% Legal & Genuine RTO Process",
      description:
        "We operate in direct alignment with the Ministry of Road Transport and Highways (MoRTH) Sarathi portal with clear, transparent receipts and zero hidden charges.",
    },
    {
      icon: HeartHandshake,
      title: "Community Trust in Miraj",
      description:
        "Over 16 years, multiple generations of families in Miraj, Sangli, Kupwad, and Jaysingpur have learned to drive with Aaple Motor Driving School.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-800 border border-brand-700 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300">
            <Award className="w-4 h-4 text-amber-400" />
            Since 2008 in Miraj, Maharashtra
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Our Story: Building Safe, Confident Drivers in Miraj
          </h1>

          <p className="text-base sm:text-lg text-brand-200 font-medium">
            आपले मोटर ड्रायव्हिंग स्कूल — विश्वास, गुणवत्ता आणि सुरक्षिततेची १६+ वर्षे
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Founded with a vision to make driving education accessible, safe, and stress-free for everyone in the Sangli-Miraj twin city region.
          </p>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="relative -mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((st, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-4xl font-black text-brand-900">
                {st.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                {st.label}
              </div>
              <div className="text-[11px] text-slate-500">{st.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Background Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="A Driving School Built on Trust, Safety & Patience"
              marathiTitle="विश्वासार्ह प्रशिक्षण पद्धत"
            />
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Established in Miraj opposite the official RTO Test Ground, <strong>Aaple Motor Driving School</strong> was started to bridge the gap between passing a driving test and becoming a genuinely safe, defensive road user.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Over the last 16 years, we have evolved into Miraj's top-rated driving school, equipped with computerised classroom training modules, modern dual-control training cars (Maruti Swift, WagonR, Hyundai i10), and specialized training tracks matching the exact dimensions of the Miraj RTO 8-track and H-reverse bay.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Certified instructors trained in advanced defensive driving and road psychology.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Specialized focus on hill climb clutch control and narrow Miraj bazaar traffic.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Full assistance for 2-wheeler, 4-wheeler, heavy transport, and vehicle RTO documents.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-gradient-to-br from-brand-900 to-brand-950 rounded-2xl p-8 text-white shadow-card space-y-6">
              <h3 className="text-xl font-bold text-amber-300">
                Our Promise to Every Student:
              </h3>
              <blockquote className="text-sm sm:text-base text-slate-200 italic leading-relaxed border-l-4 border-amber-400 pl-4">
                "We don't just teach you how to turn a steering wheel; we teach you how to read the road, anticipate hazards, and drive with quiet confidence that lasts a lifetime."
              </blockquote>
              <div className="pt-4 border-t border-brand-800 space-y-2 text-xs text-brand-200">
                <p>📍 Location: Opp. Miraj RTO Office Ground, Gandhi Chowk Road, Miraj</p>
                <p>⏰ Working Hours: Open 7 Days a Week (6:30 AM – 8:30 PM)</p>
                <p>📞 Phone: {siteConfig.phone} / {siteConfig.altPhone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Principles"
            title="The Values that Guide Our Driving School"
            marathiTitle="आमची मार्गदर्शक तत्त्वे"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-soft hover:shadow-card transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-900 flex items-center justify-center mb-4 group-hover:bg-brand-900 group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <HomeCTA />
    </div>
  );
}

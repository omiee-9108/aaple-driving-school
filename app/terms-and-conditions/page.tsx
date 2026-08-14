import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Terms and Conditions | Aaple Motor Driving School Miraj",
  description:
    "Terms of training, admission guidelines, RTO government fee disclaimers, and attendance policies for Aaple Motor Driving School Miraj.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-900">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Terms & Conditions</span>
        </nav>

        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-soft space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Terms and Conditions
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Admission & Training Agreement • Aaple Motor Driving School, Miraj
            </p>
          </div>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              1. Training Guidelines & Learner Eligibility
            </h2>
            <p>
              Students enrolling for practical driving training must hold a valid Learner's License (LL) issued by the competent RTO authority before taking the vehicle onto public roads. Aaple Motor Driving School assists students in obtaining their Learner's License upon enrollment.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              2. Batch Timings & Attendance
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Daily training slots are allotted on a fixed time basis to maintain instructor availability.</li>
              <li>In the event of an unavoidable absence, students are requested to notify the office at least 12 hours in advance to reschedule without session forfeiture.</li>
              <li>Courses must be completed within 60 days of course commencement.</li>
            </ul>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              3. Vehicle Safety & Dual Control
            </h2>
            <p>
              All four-wheeler training sessions are conducted in dual-pedal vehicles under the direct supervision of certified instructors. Students must obey the safety instructions given by the instructor at all times.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              4. Government RTO Fees & Regulatory Disclaimers
            </h2>
            <p>
              Government statutory fees for Sarathi and Vahan portals are subject to official revisions by the Maharashtra Motor Vehicles Department. Driving test results (Pass/Fail) are solely at the statutory discretion of the RTO Motor Vehicle Inspector (MVI). Aaple Motor Driving School provides rigorous preparation and vehicles for the test, but does not engage in unlawful practices.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              5. Jurisdiction
            </h2>
            <p>
              Any disputes or legal proceedings arising out of services provided shall be subject to the exclusive jurisdiction of the civil courts in Miraj / Sangli, Maharashtra.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

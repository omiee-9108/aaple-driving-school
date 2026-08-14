import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy | Aaple Motor Driving School Miraj",
  description:
    "Privacy Policy and data protection commitments for students and website visitors of Aaple Motor Driving School in Miraj, Maharashtra.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-900">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Privacy Policy</span>
        </nav>

        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-soft space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Last updated: January 2025 • Aaple Motor Driving School, Miraj (MH-10)
            </p>
          </div>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              1. Introduction & Scope
            </h2>
            <p>
              Welcome to <strong>Aaple Motor Driving School</strong> ("we", "our", or "us"). We operate from Miraj, Maharashtra, India. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website (<strong>aapledrivingschool.in</strong>) or enroll for our driving training courses and RTO consultancy services.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              2. Information We Collect
            </h2>
            <p>
              We collect information that you voluntarily provide to us when submitting an admission inquiry, requesting a callback, or enrolling in our courses:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Contact Information:</strong> Full Name, Mobile Number, Email Address, and Residential Area in Miraj/Sangli.</li>
              <li><strong>Government KYC Details (For RTO Processing):</strong> Aadhaar Card, Date of Birth, Blood Group, and Existing License details submitted for official Sarathi / Vahan filings.</li>
              <li><strong>Course Preferences:</strong> Desired vehicle category (2W, 4W, HMV), preferred batch timings, and specific learning requirements.</li>
            </ul>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              3. Purpose of Data Processing
            </h2>
            <p>We use your information solely for legitimate business operations, including:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Responding to admission inquiries and providing course fee schedules.</li>
              <li>Filing online applications on the MoRTH Sarathi and Vahan portals on your explicit behalf.</li>
              <li>Scheduling practical training sessions, instructor assignments, and RTO test ground appointments.</li>
              <li>Sending important service updates, test reminders, and license dispatch notifications via WhatsApp or SMS.</li>
            </ul>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              4. Data Protection & No-Sale Commitment
            </h2>
            <p>
              We strictly <strong>do not sell, rent, or trade</strong> your personal information or contact details to third-party telemarketers or external advertisers. Your government documentation is submitted strictly through authorized government gateways (Parivahan / Sarathi).
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              5. Contact Us
            </h2>
            <p>
              If you have any questions or data removal requests regarding this Privacy Policy, please contact:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <p><strong>Aaple Motor Driving School</strong></p>
              <p>Address: {siteConfig.address.full}</p>
              <p>Phone: {siteConfig.phone}</p>
              <p>Email: {siteConfig.email}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

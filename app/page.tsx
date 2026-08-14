import React from "react";
import { getAllServices, getAllTestimonials, getAllFAQs } from "@/sanity/client";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { ServiceHighlights } from "@/components/home/ServiceHighlights";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeCTA } from "@/components/home/HomeCTA";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function HomePage() {
  const [services, testimonials, faqs] = await Promise.all([
    getAllServices(),
    getAllTestimonials(),
    getAllFAQs(),
  ]);

  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Badges Strip */}
      <TrustBadges />

      {/* 3. Service Highlights Grid (All 10 Services) */}
      <ServiceHighlights services={services} />

      {/* 4. How It Works: 4-Step Process */}
      <ProcessTimeline />

      {/* 5. Why Choose Us: Comparison & Fleet Showcase */}
      <WhyChooseUs />

      {/* 6. Testimonials Carousel / Grid */}
      <Testimonials testimonials={testimonials} />

      {/* 7. Homepage FAQ Accordion */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Got Questions?"
            title="Frequently Asked Questions about RTO & Driving"
            marathiTitle="वारंवार विचारले जाणारे प्रश्न व त्यांची उत्तरे"
            subtitle="Find quick answers regarding learning license eligibility, test procedures at Miraj RTO ground, and fees."
          />
          <FAQAccordion items={faqs} limit={5} />
          <div className="mt-8 text-center">
            <Button variant="outline" href="/faq">
              Browse All FAQs & Document Guidelines →
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <HomeCTA />
    </div>
  );
}

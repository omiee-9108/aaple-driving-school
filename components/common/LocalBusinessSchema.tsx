import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { servicesData } from "@/data/servicesData";
import { faqData } from "@/data/faqData";

export const LocalBusinessSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: siteConfig.name,
    alternateName: siteConfig.marathiName,
    description: siteConfig.description,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: "https://aapledrivingschool.in",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "06:30",
        closes: "20:30",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Miraj",
      },
      {
        "@type": "City",
        name: "Sangli",
      },
      {
        "@type": "AdministrativeArea",
        name: "Sangli District, Maharashtra",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Driving School & RTO Services Miraj",
      itemListElement: servicesData.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.shortDescription,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "420",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.slice(0, 6).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};

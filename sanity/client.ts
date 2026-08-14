import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn, token } from "./env";
import { servicesData, ServiceDetail } from "../data/servicesData";
import { testimonialsData, TestimonialItem } from "../data/testimonialsData";
import { faqData, FAQItem } from "../data/faqData";
import { LeadFormData } from "../lib/validations";

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
    })
  : null;

/**
 * Hybrid Data Fetcher:
 * If Sanity credentials are provided in .env.local, it queries Sanity GROQ.
 * Otherwise, it instantly serves the complete curated local data.
 */
export async function getAllServices(): Promise<ServiceDetail[]> {
  if (sanityClient && projectId) {
    try {
      const query = `*[_type == "service"] | order(isPopular desc, _createdAt asc) {
        "id": _id,
        "slug": slug.current,
        name,
        marathiName,
        category,
        "categoryLabel": select(
          category == "license" => "License Services",
          category == "training" => "Driving Training",
          category == "vehicle_rto" => "Vehicle RTO & Testing",
          "PUC & Choice Numbers"
        ),
        shortDescription,
        fullDescription,
        badge,
        isPopular,
        estimatedTime,
        priceDisplay,
        icon,
        inclusions,
        documentsRequired,
        stepByStepProcess,
        benefits,
        vehicleTypes
      }`;
      const results = await sanityClient.fetch<ServiceDetail[]>(query);
      if (results && results.length > 0) return results;
    } catch (e) {
      console.warn("Sanity fetch failed, falling back to local services data:", e);
    }
  }
  return servicesData;
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail | undefined> {
  if (sanityClient && projectId) {
    try {
      const query = `*[_type == "service" && slug.current == $slug][0] {
        "id": _id,
        "slug": slug.current,
        name,
        marathiName,
        category,
        "categoryLabel": select(
          category == "license" => "License Services",
          category == "training" => "Driving Training",
          category == "vehicle_rto" => "Vehicle RTO & Testing",
          "PUC & Choice Numbers"
        ),
        shortDescription,
        fullDescription,
        badge,
        isPopular,
        estimatedTime,
        priceDisplay,
        icon,
        inclusions,
        documentsRequired,
        stepByStepProcess,
        benefits,
        vehicleTypes,
        faqs
      }`;
      const result = await sanityClient.fetch<ServiceDetail | null>(query, { slug });
      if (result) return result;
    } catch (e) {
      console.warn("Sanity fetch failed for slug, falling back to local data:", e);
    }
  }
  return servicesData.find((s) => s.slug === slug);
}

export async function getAllTestimonials(): Promise<TestimonialItem[]> {
  if (sanityClient && projectId) {
    try {
      const query = `*[_type == "testimonial"] | order(_createdAt desc) {
        "id": _id,
        name,
        role,
        location,
        rating,
        date,
        serviceUsed,
        "comment": quote,
        "avatarPlaceholder": name
      }`;
      const results = await sanityClient.fetch<TestimonialItem[]>(query);
      if (results && results.length > 0) {
        return results.map((r) => ({
          ...r,
          avatarPlaceholder: r.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
        }));
      }
    } catch (e) {
      console.warn("Sanity fetch failed for testimonials, using local fallback:", e);
    }
  }
  return testimonialsData;
}

export async function getAllFAQs(): Promise<FAQItem[]> {
  if (sanityClient && projectId) {
    try {
      const query = `*[_type == "faq"] | order(order asc, _createdAt asc) {
        "id": _id,
        category,
        "categoryLabel": select(
          category == "license" => "License & RTO Rules",
          category == "training" => "Driving Training & Batches",
          category == "documents" => "Documents Required",
          category == "vehicle_rto" => "Vehicle RC & PUC",
          "General & About Us"
        ),
        question,
        answer
      }`;
      const results = await sanityClient.fetch<FAQItem[]>(query);
      if (results && results.length > 0) return results;
    } catch (e) {
      console.warn("Sanity fetch failed for FAQs, using local fallback:", e);
    }
  }
  return faqData;
}

export async function saveLeadToSanity(lead: LeadFormData): Promise<boolean> {
  if (sanityClient && token) {
    try {
      await sanityClient.create({
        _type: "leadSubmission",
        fullName: lead.fullName,
        phoneNumber: lead.phoneNumber,
        serviceInterested: lead.serviceInterested,
        preferredTime: lead.preferredTime,
        message: lead.message || "",
        status: "new",
        createdAt: new Date().toISOString(),
      });
      return true;
    } catch (err) {
      console.error("Failed to save lead in Sanity:", err);
    }
  }
  return false;
}

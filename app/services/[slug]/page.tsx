import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug } from "@/sanity/client";
import { servicesData } from "@/data/servicesData";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.name} in Miraj | Fees, Documents & Process`,
    description: `${service.shortDescription} RTO Miraj (MH-10) approved service with transparent pricing, fast-track process and expert guidance.`,
    keywords: [
      `${service.name} Miraj`,
      `${service.slug} Miraj`,
      `driving license Miraj`,
      `RTO Miraj services`,
      `Aaple Motor Driving School`,
    ],
    openGraph: {
      title: `${service.name} | Aaple Motor Driving School Miraj`,
      description: service.shortDescription,
      url: `https://aapledrivingschool.in/services/${service.slug}`,
    },
  };
}

export const revalidate = 60;

export default async function IndividualServicePage({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}

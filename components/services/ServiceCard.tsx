"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Phone,
} from "lucide-react";
import { ServiceDetail } from "@/data/servicesData";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useEnquireModal } from "@/components/forms/EnquireModal";

interface ServiceCardProps {
  service: ServiceDetail;
  compact?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, compact = false }) => {
  const { openEnquireModal } = useEnquireModal();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-brand-300">
      {/* Top Card Body */}
      <div className="p-6 sm:p-7">
        {/* Badges & Icon */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/60 border border-brand-200 text-brand-900 flex items-center justify-center group-hover:scale-105 group-hover:bg-brand-900 group-hover:text-white transition-all duration-300 shadow-sm">
            <IconRenderer name={service.icon} className="w-7 h-7" />
          </div>

          <div className="flex flex-col items-end gap-1.5">
            {service.badge && (
              <Badge variant="accent" className="font-bold text-[10px]">
                {service.badge}
              </Badge>
            )}
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              {service.categoryLabel}
            </span>
          </div>
        </div>

        {/* Title & Marathi Name */}
        <Link href={`/services/${service.slug}`} className="block group-hover:text-brand-900">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-brand-900 transition-colors">
            {service.name}
          </h3>
          <p className="text-xs font-semibold text-brand-700 mt-0.5">
            {service.marathiName}
          </p>
        </Link>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed line-clamp-3">
          {service.shortDescription}
        </p>

        {/* Inclusions Highlights */}
        {!compact && service.inclusions && (
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Key Highlights:
            </p>
            {service.inclusions.slice(0, 3).map((inc, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{inc}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Pricing, Timeline & Action Buttons */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-brand-600" />
            <span className="font-medium">{service.estimatedTime}</span>
          </div>
          {service.priceDisplay && (
            <div className="font-extrabold text-brand-950 text-xs sm:text-sm">
              {service.priceDisplay}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            href={`/services/${service.slug}`}
            className="w-full inline-flex items-center justify-center text-xs font-bold text-brand-900 bg-white hover:bg-brand-50 border border-brand-200 py-2.5 px-3 rounded-lg transition-colors"
          >
            Details <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
          <button
            type="button"
            onClick={() => openEnquireModal(service.slug)}
            className="w-full inline-flex items-center justify-center text-xs font-bold text-white bg-brand-900 hover:bg-brand-950 py-2.5 px-3 rounded-lg shadow-sm transition-all"
          >
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
};

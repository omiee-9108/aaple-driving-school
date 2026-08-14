"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Search, MessageCircle, Phone } from "lucide-react";
import { FAQItem } from "@/data/faqData";
import { siteConfig } from "@/data/siteConfig";

interface FAQAccordionProps {
  items: FAQItem[];
  showCategoryFilters?: boolean;
  showSearch?: boolean;
  limit?: number;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  showCategoryFilters = false,
  showSearch = false,
  limit,
}) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const categories = [
    { id: "all", label: "All Topics" },
    { id: "license", label: "License & RTO" },
    { id: "training", label: "Training & Batches" },
    { id: "documents", label: "Documents Required" },
    { id: "vehicle_rto", label: "Vehicle RC & PUC" },
  ];

  let filtered = items;

  if (selectedCategory !== "all") {
    filtered = filtered.filter((item) => item.category === selectedCategory);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }

  if (limit && !searchQuery.trim() && selectedCategory === "all") {
    filtered = filtered.slice(0, limit);
  }

  return (
    <div className="w-full space-y-6">
      {/* Optional Search & Filters */}
      {(showSearch || showCategoryFilters) && (
        <div className="space-y-4 mb-8">
          {showSearch && (
            <div className="relative max-w-xl mx-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. age limit, license renewal, documents)..."
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm"
              />
            </div>
          )}

          {showCategoryFilters && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-brand-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200 text-sm">
            No matching questions found for "{searchQuery}". Call us on{" "}
            <strong>{siteConfig.phone}</strong> for instant assistance.
          </div>
        ) : (
          filtered.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden transition-all duration-200 hover:border-brand-300"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-900" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Help Banner if still confused */}
      <div className="mt-8 p-6 bg-brand-50 border border-brand-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-brand-950">
            Have a specific question not listed here?
          </h4>
          <p className="text-xs text-brand-800 mt-0.5">
            Our Miraj RTO consultant is ready to assist you right now.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="inline-flex items-center gap-1.5 bg-brand-900 hover:bg-brand-950 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" /> Call Miraj Office
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
              "Namaskar! I have a question regarding RTO services / driving course."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

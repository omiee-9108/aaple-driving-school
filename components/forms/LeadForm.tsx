"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { servicesData } from "@/data/servicesData";
import { siteConfig } from "@/data/siteConfig";

interface LeadFormProps {
  defaultServiceSlug?: string;
  className?: string;
  sourceContext?: string;
  compact?: boolean;
  onSuccess?: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  defaultServiceSlug,
  className,
  sourceContext = "General Form",
  compact = false,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    serviceInterested: defaultServiceSlug
      ? servicesData.find((s) => s.slug === defaultServiceSlug)?.name || ""
      : "",
    preferredTime: "anytime",
    message: "",
    website_hp: "", // Honeypot field for anti-spam
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your name";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    const phoneDigits = formData.phoneNumber.replace(/\D/g, "");
    if (!phoneDigits) {
      newErrors.phoneNumber = "Please enter your mobile number";
    } else if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      newErrors.phoneNumber = "Enter a valid 10-digit Indian number (starts with 6-9)";
    }

    if (!formData.serviceInterested) {
      newErrors.serviceInterested = "Please choose a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sourceContext,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit enquiry. Please try again.");
      }

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please call us directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      serviceInterested: defaultServiceSlug
        ? servicesData.find((s) => s.slug === defaultServiceSlug)?.name || ""
        : "",
      preferredTime: "anytime",
      message: "",
      website_hp: "",
    });
    setIsSuccess(false);
  };

  if (isSuccess) {
    const waText = encodeURIComponent(
      `Namaskar! I just submitted an inquiry for ${formData.serviceInterested} on your website. My name is ${formData.fullName} (+91 ${formData.phoneNumber}). Please confirm my batch/slot.`
    );
    const waUrl = `https://wa.me/${siteConfig.whatsappRaw}?text=${waText}`;

    return (
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-6 sm:p-8 text-center animate-fade-in">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-xl font-bold text-slate-900 mb-1">Enquiry Received!</h4>
        <p className="text-sm font-medium text-emerald-800 mb-2">आपली माहिती प्राप्त झाली आहे!</p>
        <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
          Thank you, <strong>{formData.fullName}</strong>. Our senior instructor from Miraj RTO center will call you on <strong>+91 {formData.phoneNumber}</strong> shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-3 rounded-lg shadow transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Connect Instantly on WhatsApp
          </a>
          <button
            onClick={resetForm}
            className="w-full sm:w-auto text-xs text-slate-500 hover:text-slate-800 underline py-2"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {/* Honeypot field (hidden for users, bots fill it) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Leave this empty</label>
        <input
          type="text"
          id="website_hp"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website_hp}
          onChange={handleChange}
        />
      </div>

      {errorMessage && (
        <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-sm text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
          >
            Full Name (पूर्ण नाव) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Rohit Patil"
            className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.fullName
                ? "border-red-400 focus:ring-red-400"
                : "border-slate-300 focus:ring-brand-500 focus:border-brand-500"
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
          >
            Mobile Number (मोबाईल नंबर) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-bold text-slate-500">
              +91
            </span>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              maxLength={10}
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="98220 12345"
              className={`w-full pl-12 pr-4 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.phoneNumber
                  ? "border-red-400 focus:ring-red-400"
                  : "border-slate-300 focus:ring-brand-500 focus:border-brand-500"
              }`}
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Service Interested In */}
        <div>
          <label
            htmlFor="serviceInterested"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
          >
            Service Interested In (आवश्यक सेवा) <span className="text-red-500">*</span>
          </label>
          <select
            id="serviceInterested"
            name="serviceInterested"
            required
            value={formData.serviceInterested}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.serviceInterested
                ? "border-red-400 focus:ring-red-400"
                : "border-slate-300 focus:ring-brand-500 focus:border-brand-500"
            }`}
          >
            <option value="">-- Select Service / Course --</option>
            <optgroup label="Driving Training Courses">
              <option value="4-Wheeler Training (Car Driving Course)">4-Wheeler Car Driving Course</option>
              <option value="2-Wheeler Training (Geared & Non-Geared)">2-Wheeler Training (Activa / Bike)</option>
              <option value="Heavy Vehicle Training (HMV / Transport DL)">Heavy Vehicle Training (Truck/Bus)</option>
              <option value="3-Wheeler Training (Auto Rickshaw & Cargo 3W)">3-Wheeler Auto Rickshaw Training</option>
            </optgroup>
            <optgroup label="Driving License Services">
              <option value="New Driving License (LL & DL)">New Driving License (Learner + Permanent)</option>
              <option value="Renew Old Driving License">Renew Expired Driving License / Form 1A</option>
            </optgroup>
            <optgroup label="Vehicle RTO & PUC Services">
              <option value="PUC (Pollution Under Control) Certificate">PUC Certificate (Instant 5-Min)</option>
              <option value="RC Book Services (Transfer, HP Cancel & Duplicate)">RC Book Transfer / Loan Cancellation</option>
              <option value="Number Registration & Vehicle Passing">New Number Registration & Passing</option>
              <option value="Choice Number Booking (VIP / Fancy Numbers)">Choice / VIP Number Booking (MH-10)</option>
            </optgroup>
            <option value="General Enquiry / Multiple Services">General Inquiry / Other RTO Work</option>
          </select>
          {errors.serviceInterested && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.serviceInterested}</p>
          )}
        </div>

        {/* Preferred Batch Timing */}
        {!compact && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="preferredTime"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Preferred Batch
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-brand-500 focus:border-brand-500"
              >
                <option value="anytime">Flexible / Any Time</option>
                <option value="morning">Morning Batch (6:30 AM – 10 AM)</option>
                <option value="afternoon">Afternoon Batch (11 AM – 3 PM)</option>
                <option value="evening">Evening Batch (4 PM – 8:30 PM)</option>
                <option value="weekend">Weekend Special (Sat & Sun)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Notes / Area (Optional)
              </label>
              <input
                type="text"
                id="message"
                name="message"
                maxLength={200}
                value={formData.message}
                onChange={handleChange}
                placeholder="e.g. Need pickup near Shivaji Nagar"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-brand-500 focus:border-brand-500"
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size={compact ? "md" : "lg"}
          isLoading={isLoading}
          className="w-full bg-brand-900 hover:bg-brand-950 text-white font-bold tracking-wide"
        >
          <Send className="w-4 h-4 mr-2" />
          Request Free Callback & Fees (माहिती मिळवा)
        </Button>

        <p className="text-center text-[11px] text-slate-500">
          🔒 Your information is 100% secure. No spam. Instant response from Miraj office.
        </p>
      </div>
    </form>
  );
};

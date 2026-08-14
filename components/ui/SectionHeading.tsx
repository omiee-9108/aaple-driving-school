import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  marathiTitle?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  marathiTitle,
  subtitle,
  align = "center",
  className,
  light = false,
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12", alignClasses[align], className)}>
      {eyebrow && (
        <Badge
          variant={light ? "accent" : "primary"}
          className="mb-3 uppercase tracking-wider text-[11px]"
        >
          {eyebrow}
        </Badge>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight",
          light ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {marathiTitle && (
        <p
          className={cn(
            "text-sm sm:text-base font-medium mt-1 tracking-normal",
            light ? "text-brand-200" : "text-brand-700"
          )}
        >
          {marathiTitle}
        </p>
      )}
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-base sm:text-lg leading-relaxed",
            light ? "text-slate-200" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "h-1 w-16 rounded-full mt-4",
          light ? "bg-accent-500" : "bg-brand-600",
          align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
        )}
      />
    </div>
  );
};

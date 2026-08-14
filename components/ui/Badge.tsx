import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "safety" | "accent" | "neutral" | "outline";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className,
}) => {
  const variantStyles = {
    primary: "bg-brand-50 text-brand-900 border border-brand-200",
    safety: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    accent: "bg-amber-50 text-amber-900 border border-amber-200",
    neutral: "bg-slate-100 text-slate-800 border border-slate-200",
    outline: "bg-transparent text-brand-900 border border-brand-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

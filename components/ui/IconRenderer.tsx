import React from "react";
import {
  Car,
  Bike,
  CreditCard,
  RefreshCw,
  Gauge,
  Truck,
  CarTaxiFront,
  FileText,
  Hash,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Navigation,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Star,
  Check,
  X,
  FileCheck,
  Send,
  MessageSquare,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react";

interface IconRendererProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Car,
  Bike,
  CreditCard,
  RefreshCw,
  Gauge,
  Truck,
  CarTaxiFront,
  FileText,
  Hash,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Navigation,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Star,
  Check,
  X,
  FileCheck,
  Send,
  MessageSquare,
  ThumbsUp,
};

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = "w-5 h-5" }) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className} />;
};

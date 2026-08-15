export interface SiteConfig {
  name: string;
  marathiName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneRaw: string;
  altPhone: string;
  altPhoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  whatsappMessage: string;
  email: string;
  address: {
    street: string;
    locality: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    full: string;
    landmark: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  rtoOffice: {
    code: string;
    name: string;
    jurisdiction: string;
  };
  operatingHours: {
    days: string;
    timing: string;
    batchTimings: string[];
  };
  stats: {
    yearsInBusiness: number;
    satisfiedStudents: string;
    firstAttemptPassRate: string;
    trainingVehicles: number;
    certifiedInstructors: number;
    googleRating: number;
    reviewCount: number;
  };
  trustPillars: {
    title: string;
    description: string;
    icon: string;
  }[];
  navLinks: {
    label: string;
    href: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Aaple Motor Driving School",
  marathiName: "आपले मोटर ड्रायव्हिंग स्कूल, मिरज",
  tagline: "Miraj's Most Trusted & RTO Approved Motor Driving Training Center",
  description:
    "Government approved driving school in Miraj (MH-10) offering end-to-end driving training, 2-wheeler & 4-wheeler license, license renewal, PUC testing, RC transfer, and vehicle registration services with dual-control modern vehicles and certified instructors.",
  phone: "+91 88883 34136",
  phoneRaw: "918888334136",
  altPhone: "+91 70288 37002",
  altPhoneRaw: "917028837002",
  whatsapp: "+91 88883 34136",
  whatsappRaw: "918888334136",
  whatsappMessage: "Namaskar! I am interested in Driving Training / RTO Services at Aaple Motor Driving School Miraj. Please share details.",
  email: "contact@aapledrivingschool.in",
  address: {
    street: "Near Miraj RTO Office Ground, Gandhi Chowk Road",
    locality: "Shivaji Nagar",
    city: "Miraj",
    district: "Sangli",
    state: "Maharashtra",
    pincode: "416410",
    full: "Opp. Miraj RTO Office Ground, Gandhi Chowk Road, Shivaji Nagar, Miraj, Maharashtra 416410",
    landmark: "500m from Miraj Railway Junction & Opp. RTO Test Ground",
  },
  geo: {
    latitude: 16.8273,
    longitude: 74.6468,
  },
  rtoOffice: {
    code: "MH-10",
    name: "Deputy Regional Transport Office (Dy. RTO), Miraj - Sangli",
    jurisdiction: "Miraj, Sangli, Kupwad, Jaysingpur, and surrounding areas",
  },
  operatingHours: {
    days: "Monday – Sunday (7 Days Open)",
    timing: "6:30 AM – 8:30 PM",
    batchTimings: [
      "Morning Batch: 6:30 AM – 10:00 AM (Ideal for students & office goers)",
      "Afternoon Batch: 11:00 AM – 3:00 PM (Dedicated slots for housewives & beginners)",
      "Evening Batch: 4:00 PM – 8:30 PM (Working professionals)",
      "Weekend Special: Custom Saturday-Sunday fast-track training",
    ],
  },
  stats: {
    yearsInBusiness: 16,
    satisfiedStudents: "12,500+",
    firstAttemptPassRate: "99.2%",
    trainingVehicles: 12,
    certifiedInstructors: 8,
    googleRating: 4.9,
    reviewCount: 420,
  },
  trustPillars: [
    {
      title: "Govt. & RTO MH-10 Authorized",
      description: "100% compliant with Ministry of Road Transport & Highways (MoRTH) standards with direct Sarathi portal integration.",
      icon: "ShieldCheck",
    },
    {
      title: "Dual-Control Safety Fleet",
      description: "Equipped with auxiliary instructor pedals for clutch and brake to guarantee 100% safe road confidence from Day 1.",
      icon: "Car",
    },
    {
      title: "Miraj RTO Ground Simulation",
      description: "Specialized practice on identical 8-shape, H-track, gradient/hill stop and parallel parking setups before the real test.",
      icon: "Navigation",
    },
    {
      title: "Dedicated Lady Instructors",
      description: "Patient, supportive female instructors available for women learners wanting comfortable one-on-one sessions.",
      icon: "Users",
    },
  ],
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
};

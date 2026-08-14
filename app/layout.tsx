import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LocalBusinessSchema } from "@/components/common/LocalBusinessSchema";
import { SiteLayoutWrapper } from "@/components/layout/SiteLayoutWrapper";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#022c22",
};


export const metadata: Metadata = {
  metadataBase: new URL("https://aapledrivingschool.in"),
  title: {
    default: "Aaple Motor Driving School Miraj | RTO Approved Driving Training MH-10",
    template: "%s | Aaple Motor Driving School Miraj",
  },
  description:
    "Miraj's most trusted government-authorized motor driving school & RTO consultancy (MH-10). 4-wheeler, 2-wheeler, heavy vehicle training, new driving license, license renewal, instant PUC, and RC transfer.",
  keywords: [
    "driving school Miraj",
    "motor driving school Miraj",
    "driving classes Sangli Miraj",
    "RTO Miraj driving license",
    "driving license renewal Miraj",
    "PUC certificate Miraj",
    "car driving training Miraj",
    "lady driving instructor Miraj",
    "MH-10 driving school",
    "RC transfer Miraj",
    "Aaple Motor Driving School",
    "आपले मोटर ड्रायव्हिंग स्कूल मिरज",
  ],
  authors: [{ name: "Aaple Motor Driving School" }],
  creator: "Aaple Motor Driving School",
  publisher: "Aaple Motor Driving School",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://aapledrivingschool.in",
    siteName: "Aaple Motor Driving School Miraj",
    title: "Aaple Motor Driving School Miraj | RTO Approved Driving Training MH-10",
    description:
      "Join Miraj's leading motor driving school. Dual-control modern cars, RTO test track practice, female instructors, and 99.2% first-attempt license passing rate.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Aaple Motor Driving School Miraj",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaple Motor Driving School Miraj",
    description: "Miraj's premier RTO approved motor driving training center with dual-control cars.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="min-h-screen flex flex-col antialiased text-slate-900 bg-slate-50">
        <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
      </body>
    </html>
  );
}

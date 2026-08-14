# 🚗 Aaple Motor Driving School — Production Marketing Website

A complete, modern, mobile-first marketing and lead-capture web application for **Aaple Motor Driving School** (आपले मोटर ड्रायव्हिंग स्कूल), located in **Miraj, Maharashtra, India (MH-10)**.

Built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, **Lucide Icons**, **Sanity CMS Schemas**, **Zod**, and **Resend**.

---

## 🌟 Key Features

### 1. Complete Business & Services Architecture
Features all 10 services with dedicated cards, category filters, and rich individual detail pages:
1. **New Driving License (LL & DL)**
2. **Renew Old Driving License (Form 1A)**
3. **PUC (Pollution Under Control) Certificate (Instant 5-Min)**
4. **2-Wheeler Training (Activa & Geared Bike)**
5. **4-Wheeler Training (Car Driving Course with Dual Controls)**
6. **Heavy Vehicle Training (HMV / Transport DL & Badge)**
7. **3-Wheeler Training (Auto Rickshaw & Cargo 3W)**
8. **RC Book Services (Ownership Transfer, Loan Removal & Duplicate RC)**
9. **Number Registration & Passing (HSRP & Commercial Fitness)**
10. **Choice Number Booking (VIP & Fancy Numbers MH-10)**

### 2. High-Conversion Lead Capture System
- **Client & Server-side validation** with Zod (validates 10-digit Indian phone numbers starting with 6-9).
- **Anti-Spam Honeypot** protection (`website_hp`) preventing automated bot submissions without annoying captchas.
- **Resend Email Notification** sending structured email alerts containing customer contact info, service chosen, and preferred batch timing with instant WhatsApp response buttons.
- **Embedded & Modal Forms**: Available directly on the Hero section, on every service page, contact page, and via the global "Enquire Now" modal.
- **Post-Submission WhatsApp Redirection**: One-tap button for the student to confirm their slot on WhatsApp immediately.

### 3. Headless CMS Ready (Sanity with Hybrid Fallback)
- Full Sanity schemas defined in `sanity/schemaTypes/`:
  - `service.ts`
  - `testimonial.ts`
  - `faq.ts`
  - `leadSubmission.ts`
  - `siteSettings.ts`
- **Graceful Fallback Data Layer**: Automatically operates out-of-the-box using the structured local dataset in `data/`, so the app runs smoothly with zero missing content even before Sanity credentials are provided.

### 4. Local SEO & Rich Snippets
- **LocalBusiness & AutomotiveBusiness JSON-LD schema** with Miraj coordinates (16.8273, 74.6468), NAP details, opening hours (6:30 AM – 8:30 PM), aggregate ratings (4.9★), and offer catalogs.
- **FAQPage Schema** for search engine rich answers.
- Dynamic `sitemap.xml` (via `app/sitemap.ts`) and `robots.txt` (via `app/robots.ts`).
- Keyword targeting for `driving school Miraj`, `RTO Miraj license`, `PUC Miraj`, `RC transfer Miraj`, etc.

### 5. Mobile-First Modern Aesthetics
- Deep trusted Navy Blue (`#08274a`), Emerald Safety Green (`#059669`), and Saffron Amber accents.
- Sticky WhatsApp floating button (`wa.me`) with custom pre-filled message.
- Click-to-call direct dialers on header and footer.
- Accessible dialog modals and FAQ accordion with live search filter.

---

## 📁 Directory Structure

```
aaple-driving-school/
├── app/
│   ├── layout.tsx                # Root layout, fonts, SEO schema, header & footer
│   ├── page.tsx                  # Home page (Hero, Badges, 10 Services, Timeline, Fleet, Reviews, FAQs)
│   ├── services/
│   │   ├── page.tsx              # All 10 services catalog & document checklist
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic individual service detail pages
│   ├── about/
│   │   └── page.tsx              # About Us, story, milestones, values
│   ├── contact/
│   │   └── page.tsx              # Contact page, lead form, office hours, map guide
│   ├── faq/
│   │   └── page.tsx              # FAQ page with search & category filters
│   ├── privacy-policy/
│   │   └── page.tsx              # DPDP & IT Act compliant privacy policy
│   ├── terms-and-conditions/
│   │   └── page.tsx              # Training agreement & RTO disclaimers
│   ├── api/
│   │   └── lead/
│   │       └── route.ts          # Server-side lead handler with Zod & Resend
│   ├── sitemap.ts                # Auto-generated XML sitemap
│   ├── robots.ts                 # SEO robots.txt
│   └── globals.css               # Design system & Tailwind styling
├── components/
│   ├── layout/                   # Header, Footer, MobileNav, FloatingWhatsApp
│   ├── ui/                       # Button, Badge, Modal, SectionHeading, IconRenderer
│   ├── home/                     # HeroSection, TrustBadges, ServiceHighlights, ProcessTimeline, WhyChooseUs, Testimonials, HomeCTA
│   ├── services/                 # ServiceCard, ServiceDetailView
│   ├── forms/                    # LeadForm, EnquireModal
│   └── common/                   # FAQAccordion, LocalBusinessSchema
├── data/
│   ├── siteConfig.ts             # Business NAP, timings, coordinates
│   ├── servicesData.ts           # Complete content for all 10 services
│   ├── testimonialsData.ts       # Verified student reviews from Miraj & Sangli
│   └── faqData.ts                # Categorized FAQs
├── sanity/
│   ├── schemaTypes/              # Sanity CMS document schemas
│   ├── env.ts                    # Sanity environment settings
│   └── client.ts                 # Sanity client & hybrid fallback loader
├── lib/
│   ├── utils.ts                  # Helper functions & WhatsApp URL builder
│   ├── validations.ts            # Zod validation schemas
│   └── mailer.ts                 # Resend email alert dispatch
├── .env.example
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Resend and Sanity keys if available:
```env
RESEND_API_KEY=re_your_api_key_here
LEAD_NOTIFICATION_EMAIL=your-email@example.com

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_write_token
```
*(Note: If omitted, the website runs automatically in fallback mode with complete local mock content and simulated console logging for leads).*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🚢 Deployment on Vercel

1. Push this repository to GitHub or GitLab.
2. Import the repository in [Vercel](https://vercel.com).
3. Under **Environment Variables**, add:
   - `RESEND_API_KEY` (from [Resend](https://resend.com))
   - `LEAD_NOTIFICATION_EMAIL` (your business inbox)
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` (from [Sanity.io](https://sanity.io))
4. Click **Deploy**. Vercel will automatically build the Next.js App Router application.

---

## 📞 Business Information
- **Business Name**: Aaple Motor Driving School (आपले मोटर ड्रायव्हिंग स्कूल)
- **Address**: Opp. Miraj RTO Office Ground, Gandhi Chowk Road, Shivaji Nagar, Miraj, Maharashtra 416410
- **Phone**: +91 70831 27002
- **WhatsApp**: +91 70831 27002
- **RTO Jurisdiction**: MH-10 (Miraj / Sangli)

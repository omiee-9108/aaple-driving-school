export const serviceSchema = {
  name: "service",
  title: "Services & Courses",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Service Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "marathiName",
      title: "Marathi Name (मराठी नाव)",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "License Services", value: "license" },
          { title: "Driving Training", value: "training" },
          { title: "Vehicle RTO & RC", value: "vehicle_rto" },
          { title: "PUC & Choice Numbers", value: "puc_choice" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "badge",
      title: "Highlight Badge (e.g. Most Popular, 5-Min Instant)",
      type: "string",
    },
    {
      name: "isPopular",
      title: "Feature on Homepage",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "shortDescription",
      title: "Short Summary (Card display)",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "fullDescription",
      title: "Full Detailed Overview",
      type: "text",
      rows: 6,
    },
    {
      name: "priceDisplay",
      title: "Price / Starting Fee Display (e.g. Starts at ₹1,800)",
      type: "string",
    },
    {
      name: "estimatedTime",
      title: "Estimated Timeline / Duration (e.g. 15 Days)",
      type: "string",
    },
    {
      name: "icon",
      title: "Icon Name (Lucide)",
      type: "string",
      description: "e.g. Car, Bike, CreditCard, RefreshCw, Gauge, Truck, FileText, Sparkles",
    },
    {
      name: "image",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "inclusions",
      title: "Inclusions / What's Included",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "documentsRequired",
      title: "Documents Required Checklist",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "stepByStepProcess",
      title: "Step-by-Step Process",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "stepNumber", title: "Step Number", type: "number" },
            { name: "title", title: "Step Title", type: "string" },
            { name: "description", title: "Step Description", type: "text", rows: 2 },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
};

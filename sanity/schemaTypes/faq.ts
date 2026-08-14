export const faqSchema = {
  name: "faq",
  title: "Frequently Asked Questions",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "General & About Us", value: "general" },
          { title: "License & RTO Rules", value: "license" },
          { title: "Driving Training & Batches", value: "training" },
          { title: "Documents Required", value: "documents" },
          { title: "Vehicle RC & PUC", value: "vehicle_rto" },
        ],
      },
      initialValue: "general",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
  },
};

export const testimonialSchema = {
  name: "testimonial",
  title: "Student Reviews & Testimonials",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Student / Customer Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "role",
      title: "Role / Profession",
      type: "string",
    },
    {
      name: "location",
      title: "Location in Miraj / Sangli",
      type: "string",
      initialValue: "Miraj, Maharashtra",
    },
    {
      name: "rating",
      title: "Rating (1 to 5 Stars)",
      type: "number",
      validation: (Rule: any) => Rule.required().min(1).max(5),
      initialValue: 5,
    },
    {
      name: "serviceUsed",
      title: "Service / Course Taken",
      type: "string",
    },
    {
      name: "quote",
      title: "Review / Testimonial Quote",
      type: "text",
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "date",
      title: "Display Date",
      type: "string",
    },
    {
      name: "avatar",
      title: "Customer Photo",
      type: "image",
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "serviceUsed",
    },
  },
};

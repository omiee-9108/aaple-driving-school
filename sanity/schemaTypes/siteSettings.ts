export const siteSettingsSchema = {
  name: "siteSettings",
  title: "Site & Business Settings",
  type: "document",
  fields: [
    {
      name: "businessName",
      title: "Business Name",
      type: "string",
      initialValue: "Aaple Motor Driving School",
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "primaryPhone",
      title: "Primary Phone Number",
      type: "string",
      initialValue: "+91 88883 34136",
    },
    {
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      initialValue: "+91 88883 34136",
    },
    {
      name: "email",
      title: "Contact Email",
      type: "string",
      initialValue: "contact@aapledrivingschool.in",
    },
    {
      name: "addressText",
      title: "Full Address",
      type: "text",
      rows: 2,
    },
    {
      name: "workingHours",
      title: "Working Hours",
      type: "string",
      initialValue: "Monday – Sunday: 6:30 AM – 8:30 PM",
    },
  ],
};

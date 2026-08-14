export const leadSubmissionSchema = {
  name: "leadSubmission",
  title: "Lead Inquiries",
  type: "document",
  fields: [
    {
      name: "fullName",
      title: "Full Name",
      type: "string",
      readOnly: true,
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      readOnly: true,
    },
    {
      name: "serviceInterested",
      title: "Service Interested In",
      type: "string",
      readOnly: true,
    },
    {
      name: "preferredTime",
      title: "Preferred Batch / Contact Time",
      type: "string",
      readOnly: true,
    },
    {
      name: "message",
      title: "Message / Notes",
      type: "text",
      rows: 3,
      readOnly: true,
    },
    {
      name: "status",
      title: "Lead Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted / In Discussion", value: "contacted" },
          { title: "Enrolled", value: "enrolled" },
          { title: "Closed / Not Interested", value: "closed" },
        ],
      },
      initialValue: "new",
    },
    {
      name: "createdAt",
      title: "Received Date & Time",
      type: "datetime",
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "serviceInterested",
    },
  },
};

import { z } from "zod";

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Please enter your full name (minimum 2 characters)" })
    .max(80, { message: "Name must be less than 80 characters" })
    .trim(),
  phoneNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, {
      message: "Please enter a valid 10-digit Indian mobile number (e.g. 9822012345)",
    })
    .trim(),
  serviceInterested: z
    .string()
    .min(1, { message: "Please select a service you are interested in" }),
  preferredTime: z
    .enum(["morning", "afternoon", "evening", "weekend", "anytime"])
    .default("anytime"),
  message: z
    .string()
    .max(500, { message: "Message must be under 500 characters" })
    .optional()
    .or(z.literal("")),
  // Honeypot field to catch automated spam bots
  website_hp: z.string().max(0, { message: "Bot submission detected" }).optional().or(z.literal("")),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validations";
import { sendLeadEmailNotification } from "@/lib/mailer";
import { saveLeadToSanity } from "@/sanity/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate body schema
    const parseResult = leadFormSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || "Invalid form input";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const leadData = parseResult.data;

    // 2. Anti-spam honeypot verification
    if (leadData.website_hp && leadData.website_hp.length > 0) {
      console.warn("Spam bot submission caught by honeypot:", leadData);
      // Return 200 silently to fool spam bots
      return NextResponse.json({ success: true, message: "Enquiry submitted successfully" });
    }

    // 3. Store lead in Sanity (if configured) or log in server records
    const sanitySaved = await saveLeadToSanity(leadData);

    // 4. Send email notification via Resend
    const emailResult = await sendLeadEmailNotification(leadData);

    // 5. Return success
    return NextResponse.json({
      success: true,
      message: "Enquiry received successfully! Our Miraj instructor will call you shortly.",
      leadDetails: {
        name: leadData.fullName,
        service: leadData.serviceInterested,
      },
    });
  } catch (error: any) {
    console.error("API /api/lead Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process enquiry. Please call us directly on +91 70831 27002.",
      },
      { status: 500 }
    );
  }
}

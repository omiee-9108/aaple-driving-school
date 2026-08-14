import { Resend } from "resend";
import { LeadFormData } from "./validations";

const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.LEAD_NOTIFICATION_EMAIL || "contact@aapledrivingschool.in";
const senderEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function sendLeadEmailNotification(data: LeadFormData): Promise<{ success: boolean; id?: string; error?: string }> {
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          .header { background: #0c3d6f; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
          .header p { margin: 4px 0 0; font-size: 14px; opacity: 0.9; }
          .content { padding: 24px; }
          .badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 9999px; font-weight: 600; font-size: 13px; margin-bottom: 16px; }
          .field { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
          .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; }
          .value { font-size: 16px; font-weight: 600; color: #0f172a; margin-top: 4px; }
          .phone-highlight { color: #026bc9; font-size: 18px; }
          .message-box { background: #f8fafc; padding: 14px; border-radius: 8px; border-left: 4px solid #0c87eb; margin-top: 6px; font-size: 14px; }
          .cta-box { text-align: center; padding: 20px; background: #f0fdf4; border-radius: 8px; margin-top: 20px; }
          .button { display: inline-block; background: #059669; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; }
          .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚗 New Lead: Aaple Motor Driving School</h1>
            <p>Miraj, Maharashtra (MH-10)</p>
          </div>
          <div class="content">
            <div class="badge">🔥 New Website Inquiry</div>
            
            <div class="field">
              <div class="label">Customer Name</div>
              <div class="value">${data.fullName}</div>
            </div>

            <div class="field">
              <div class="label">Phone Number</div>
              <div class="value phone-highlight">
                <a href="tel:+91${data.phoneNumber}" style="color:#026bc9; text-decoration:none;">+91 ${data.phoneNumber}</a>
              </div>
            </div>

            <div class="field">
              <div class="label">Service Interested In</div>
              <div class="value">${data.serviceInterested}</div>
            </div>

            <div class="field">
              <div class="label">Preferred Batch / Contact Time</div>
              <div class="value" style="text-transform: capitalize;">${data.preferredTime}</div>
            </div>

            ${data.message ? `
            <div class="field">
              <div class="label">Customer Notes / Message</div>
              <div class="message-box">${data.message}</div>
            </div>
            ` : ""}

            <div class="field">
              <div class="label">Submission Timestamp</div>
              <div class="value" style="font-size: 14px; color: #64748b;">${timestamp} IST</div>
            </div>

            <div class="cta-box">
              <p style="margin: 0 0 12px; font-weight: 600; color: #065f46;">Quick Action:</p>
              <a href="https://wa.me/91${data.phoneNumber}?text=Namaskar%20${encodeURIComponent(data.fullName)},%20thank%20you%20for%20contacting%20Aaple%20Motor%20Driving%20School%20Miraj%20regarding%20${encodeURIComponent(data.serviceInterested)}." class="button" target="_blank" style="color: #ffffff;">
                💬 Reply on WhatsApp
              </a>
            </div>
          </div>
          <div class="footer">
            Aaple Motor Driving School Lead Capture System • Miraj, Sangli 416410
          </div>
        </div>
      </body>
    </html>
  `;

  if (!resendApiKey) {
    // In development or when API key is not configured, log clearly
    console.log("==================================================");
    console.log("📨 [SIMULATED EMAIL NOTIFICATION] (RESEND_API_KEY not set)");
    console.log(`To: ${recipientEmail}`);
    console.log(`Subject: 🚗 New Lead: ${data.fullName} - ${data.serviceInterested}`);
    console.log(`Lead Name: ${data.fullName}`);
    console.log(`Phone: +91 ${data.phoneNumber}`);
    console.log(`Service: ${data.serviceInterested}`);
    console.log(`Preferred Time: ${data.preferredTime}`);
    if (data.message) console.log(`Notes: ${data.message}`);
    console.log("==================================================");
    return { success: true, id: `mock-${Date.now()}` };
  }

  try {
    const resend = new Resend(resendApiKey);
    const { data: resData, error } = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      subject: `🚗 New Lead: ${data.fullName} - ${data.serviceInterested}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: resData?.id };
  } catch (err: any) {
    console.error("Error sending email notification:", err);
    return { success: false, error: err?.message || "Failed to send email" };
  }
}

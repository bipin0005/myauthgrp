import type { ContactFormData } from "./email-types"

const RESEND_URL = "https://api.resend.com/emails"
const FROM_EMAIL = "onboarding@resend.dev" // Resend's default verified sender for testing
// NOTE: In Resend test mode, you can only send to your verified account email.
// To send to any email, verify your domain at resend.com/domains
const TO_EMAIL = "khatiwadabipin50@gmail.com" // Your verified Resend account email

async function sendViaResend(payload: unknown) {
  // Check for API key only when actually sending
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Email service not configured. Set RESEND_API_KEY in .env.local or the Vercel dashboard.")
  }

  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend error ${res.status}: ${text}`)
  }

  return res.json() as Promise<{ id: string }>
}

/* ========== 1)  mail to MyAuthGrp ====================== */
export async function sendContactEmail(data: ContactFormData) {
  try {
    const { id } = await sendViaResend({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Contact Form Submission – ${data.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
              🚀 New Contact Form Submission
            </h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #667eea; margin-bottom: 10px;">📋 Contact Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Name:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">
                    <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Service:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">
                    <span style="background: #667eea; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                      ${data.service}
                    </span>
                  </td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #667eea; margin-bottom: 10px;">💬 Message:</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
                <p style="margin: 0; line-height: 1.6; color: #333;">${data.message.replace(/\n/g, "<br>")}</p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                📧 Sent from MyAuthGrp Contact Form | 
                <a href="https://myauthgrp.com" style="color: #667eea; text-decoration: none;">myauthgrp.com</a>
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Service: ${data.service}

Message:
${data.message}

---
Sent from MyAuthGrp Contact Form
      `,
    })

    return { success: true, messageId: id, message: "Email sent successfully!" }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error: (error as Error).message }
  }
}

/* ========== 2)  auto-reply to the visitor ============== */
// NOTE: Auto-reply is disabled in Resend test mode because it can only send
// to your verified account email. To enable auto-replies to visitors:
// 1. Verify your domain at resend.com/domains
// 2. Update FROM_EMAIL to use your verified domain (e.g., hello@myauthgrp.com)
// 3. Remove the early return below
export async function sendAutoReply(data: ContactFormData) {
  // Skip auto-reply in test mode (can't send to unverified emails)
  if (FROM_EMAIL === "onboarding@resend.dev") {
    console.log("Auto-reply skipped: Resend is in test mode")
    return { success: true, skipped: true }
  }

  try {
    await sendViaResend({
      from: FROM_EMAIL,
      to: data.email,
      subject: "Thank you for contacting MyAuthGrp! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%); border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin: 0; font-size: 28px;">MyAuthGrp</h1>
              <p style="color: #8b5cf6; margin: 5px 0 0 0; font-weight: bold;">We Build the Web of the Future</p>
            </div>

            <h2 style="color: #333; margin-bottom: 20px;">Hi ${data.name}! 👋</h2>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              Thank you for reaching out to us! We've received your message about <strong>${data.service}</strong> 
              and we're excited to learn more about your project.
            </p>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
              <h3 style="color: #8b5cf6; margin-top: 0;">What happens next?</h3>
              <ul style="color: #555; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Our team will review your message within 24 hours</li>
                <li>We'll get back to you with initial thoughts and questions</li>
                <li>If it's a good fit, we'll schedule a discovery call</li>
                <li>We'll provide you with a detailed proposal and timeline</li>
              </ul>
            </div>

            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              In the meantime, feel free to check out our latest work on our website or connect with us on social media.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://myauthgrp.com" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Visit Our Website
              </a>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong>The MyAuthGrp Team</strong><br>
                <a href="mailto:myauthgrp@gmail.com" style="color: #8b5cf6;">myauthgrp@gmail.com</a> | 
                <a href="https://myauthgrp.com" style="color: #06b6d4;">myauthgrp.com</a>
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
Hi ${data.name}!

Thank you for reaching out to MyAuthGrp! We've received your message about ${data.service} and we're excited to learn more about your project.

What happens next?
- Our team will review your message within 24 hours
- We'll get back to you with initial thoughts and questions  
- If it's a good fit, we'll schedule a discovery call
- We'll provide you with a detailed proposal and timeline

Best regards,
The MyAuthGrp Team
myauthgrp@gmail.com | myauthgrp.com
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Auto-reply failed:", error)
    return { success: false }
  }
}

// Export the type for use in other files
export type { ContactFormData }

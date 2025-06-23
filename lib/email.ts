import type { ContactFormData } from "./email-types" // adjust path if needed

const RESEND_URL = "https://api.resend.com/emails"
const FROM_EMAIL = "hello@myauthgrp.com" // verified sender

async function sendViaResend(payload: unknown) {
  // ⬇️  moved here – safe for builds without the env var
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
      to: FROM_EMAIL,
      subject: `New Contact Form Submission – ${data.service}`,
      html: `
        <h2>🚀 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Message:</strong><br>${data.message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Service: ${data.service}

Message:
${data.message}
      `,
    })

    return { success: true, messageId: id, message: "Email sent successfully!" }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error: (error as Error).message }
  }
}

/* ========== 2)  auto-reply to the visitor ============== */
export async function sendAutoReply(data: ContactFormData) {
  try {
    await sendViaResend({
      from: FROM_EMAIL,
      to: data.email,
      subject: "Thanks for contacting MyAuthGrp! 🚀",
      html: `
        <h3>Hi ${data.name} 👋</h3>
        <p>Thanks for reaching out about <strong>${data.service}</strong>!<br>
        We’ll review your message and get back to you within 24 hours.</p>
        <p>— The MyAuthGrp Team</p>
      `,
      text: `
Hi ${data.name},

Thanks for reaching out about ${data.service}!
We'll review your message and get back to you within 24 hours.

— The MyAuthGrp Team
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Auto-reply failed:", error)
    return { success: false }
  }
}

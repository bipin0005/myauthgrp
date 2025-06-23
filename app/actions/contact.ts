"use server"

import { sendContactEmail, sendAutoReply, type ContactFormData } from "@/lib/email"

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    }

    // Validate required fields
    if (!data.name || !data.email || !data.service || !data.message) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Send email to MyAuthGrp
    const emailResult = await sendContactEmail(data)

    if (!emailResult.success) {
      return {
        success: false,
        error: emailResult.error || "Failed to send message",
      }
    }

    // Send auto-reply to user (optional - don't fail if this fails)
    await sendAutoReply(data)

    return {
      success: true,
      message: `Thank you ${data.name}! Your message has been sent successfully. We'll get back to you within 24 hours.`,
    }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    }
  }
}

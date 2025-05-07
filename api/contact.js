import sendgrid from "@sendgrid/mail";
import { rateLimit } from "./rateLimit";

// Initialize SendGrid with API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// Set up rate limiter
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 100, // Max 100 users per minute
  maxRequests: 5, // Max 5 requests per minute per IP
});

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex && emailRegex.test(email);
}

/**
 * Sanitizes user input to prevent XSS attacks
 * @param {string} input - The input to sanitize
 * @returns {string} - The sanitized input
 */
function sanitizeInput(input) {
  if (!input) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ 
      success: false, 
      message: "Method not allowed. Only POST requests are accepted." 
    });
  }

  try {
    // Apply rate limiting
    try {
      await limiter.check(res, 5, req.headers['x-forwarded-for'] || req.socket.remoteAddress);
    } catch (error) {
      return res.status(429).json({ 
        success: false, 
        message: "Rate limit exceeded. Please try again later." 
      });
    }

    // Extract and sanitize form data
    const { name, email, subject, message, website } = req.body;
    
    // Honeypot check - if 'website' field is filled, it's likely a bot
    if (website) {
      // Return success to fool bots, but don't actually send email
      return res.status(200).json({ 
        success: true, 
        message: "Form submitted successfully" 
      });
    }

    // Validate required fields
    if (!name || name.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: "Name is required" 
      });
    }
    
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "A valid email address is required" 
      });
    }
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: "Message is required" 
      });
    }

    // Length validation
    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be less than 100 characters"
      });
    }

    if (message.length > 5000) {
      return res.status(400).json({
        success: false,
        message: "Message must be less than 5000 characters"
      });
    }

    // Sanitize all inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject || "New message from your site");
    const sanitizedMessage = sanitizeInput(message);

    // ✅ 1. Send email to Paul
    await sendgrid.send({
      to: process.env.CONTACT_EMAIL || "paul@paultakisaki.com",
      from: process.env.FROM_EMAIL || "info@paultakisaki.com",
      subject: sanitizedSubject,
      replyTo: sanitizedEmail,
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`,
      html: `
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Message:</strong><br>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
    });

    // ✅ 2. Send auto-reply to user
    await sendgrid.send({
      to: sanitizedEmail,
      from: process.env.FROM_EMAIL || "info@paultakisaki.com",
      subject: "Thanks for reaching out!",
      text: `Hey ${sanitizedName}, thanks for your message! I've received it and will follow up shortly. - Paul`,
      html: `
        <p>Hey ${sanitizedName},</p>
        <p>Thanks for reaching out through my site. I've received your message and will follow up shortly.</p>
        <p>In the meantime, feel free to check out <a href="https://www.paultakisaki.com/blogs/blogs.html">my blog</a> or connect on <a href="https://www.linkedin.com/in/paultaki/">LinkedIn</a>.</p>
        <p style="margin-top: 24px;">Best,<br>Paul Takisaki</p>
      `,
    });

    return res.status(200).json({ 
      success: true, 
      message: "Message sent successfully" 
    });
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    
    // Return appropriate status based on error type
    const statusCode = error.code >= 400 && error.code < 500 ? 400 : 500;
    
    return res.status(statusCode).json({
      success: false,
      message: "Failed to send message",
      error: process.env.NODE_ENV === 'production' 
        ? 'An error occurred while sending your message' 
        : error.message,
    });
  }
}
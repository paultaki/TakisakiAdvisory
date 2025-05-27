// /api/send-email.js

import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    email,
    company = "",
    message = "",
    subject = "New Contact Form Submission",
  } = req.body;

  try {
    await sendgrid.send({
      to: "paul@paultakisaki.com",
      from: "paul@paultakisaki.com", // This must be a verified sender in SendGrid
      subject: `${subject} from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company/Position:</strong> ${company}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("SendGrid error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // ✅ 1. Send email to Paul
    await sendgrid.send({
      to: "paul@paultakisaki.com",
      from: "info@paultakisaki.com",
      subject: subject || "New message from your site",
      replyTo: email,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    // ✅ 2. Send auto-reply to user
    await sendgrid.send({
      to: email,
      from: "info@paultakisaki.com",
      subject: "Thanks for reaching out!",
      text: `Hey ${name}, thanks for your message! I've received it and will follow up shortly. - Paul`,
      html: `
        <p>Hey ${name},</p>
        <p>Thanks for reaching out through my site. I've received your message and will follow up shortly.</p>
        <p>In the meantime, feel free to check out <a href="https://www.paultakisaki.com/blogs/blogs.html">my blog</a> or connect on <a href="https://www.linkedin.com/in/paultaki/">LinkedIn</a>.</p>
        <p style="margin-top: 24px;">Best,<br>Paul Takisaki</p>
      `,
    });

    return res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    return res.status(500).json({
      message: "Email failed to send",
      error: error.message,
      response: error.response?.body,
    });
  }
}

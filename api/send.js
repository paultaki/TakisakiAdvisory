import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { name, email, subject, message } = req.body;

  try {
    await sendgrid.send({
      to: "paul@paultakisaki.com", // <- Change this to YOUR email
      from: "info@paultakisaki.com", // <- This must be verified in SendGrid
      subject: `[Contact Form] ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("SendGrid error:", error);
    res.status(500).json({ message: "Email failed to send" });
  }
}

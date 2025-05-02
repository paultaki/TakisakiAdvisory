export default async function handler(req, res) {
  console.log("=== /api/subscribe hit ===");

  if (req.method !== "POST") {
    console.log("❌ Wrong method:", req.method);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;
  console.log("📨 Email received:", email);

  if (!email || !email.includes("@")) {
    console.log("❌ Invalid email submitted:", email);
    return res.status(400).json({ message: "Invalid email address" });
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const SENDGRID_LIST_ID = process.env.SENDGRID_LIST_ID;

  try {
    const sgRes = await fetch(
      "https://api.sendgrid.com/v3/marketing/contacts",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_ids: [SENDGRID_LIST_ID],
          contacts: [{ email }],
        }),
      }
    );

    if (!sgRes.ok) {
      const error = await sgRes.json();
      console.error("❌ SendGrid API Error:", JSON.stringify(error, null, 2));
      return res.status(500).json({ message: "SendGrid error", error });
    }

    console.log("✅ Email successfully added:", email);
    return res.status(200).json({ message: "You’re on the list!" });
  } catch (err) {
    console.error("💥 UNCAUGHT ERROR:", err.message || err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
}

export default async function handler(req, res) {
  try {
    console.log("=== /api/subscribe HIT ===");

    if (req.method !== "POST") {
      console.log("❌ Wrong method:", req.method);
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email } = req.body;
    console.log("📨 Email received:", email);

    if (!email || !email.includes("@")) {
      console.log("❌ Invalid email format:", email);
      return res.status(400).json({ message: "Invalid email address" });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const listId = process.env.SENDGRID_LIST_ID;

    if (!apiKey || !listId) {
      console.error("❌ Missing environment variables");
      return res.status(500).json({ message: "Missing SendGrid credentials" });
    }

    const response = await fetch(
      "https://api.sendgrid.com/v3/marketing/contacts",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_ids: [listId],
          contacts: [{ email }],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("❌ SendGrid error:", JSON.stringify(err, null, 2));
      return res.status(500).json({ message: "SendGrid error", error: err });
    }

    console.log("✅ Successfully added:", email);
    return res.status(200).json({ message: "You’re on the list!" });
  } catch (err) {
    console.error("💥 UNHANDLED SERVER CRASH:", err);
    return res
      .status(500)
      .json({ message: "Unhandled server error", error: err.message });
  }
}

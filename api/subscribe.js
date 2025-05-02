export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
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
      console.error("SendGrid API Error:", JSON.stringify(error, null, 2));
      return res.status(500).json({
        message: "SendGrid error",
        error: error,
      });
    }

    return res.status(200).json({ message: "You’re on the list!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
}

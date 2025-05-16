// /api/subscribe.js

import client from "@sendgrid/client";

client.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Add the contact to the SendGrid list
    const data = {
      list_ids: [process.env.SENDGRID_LIST_ID],
      contacts: [
        {
          email: email,
        },
      ],
    };

    const request = {
      url: "/v3/marketing/contacts",
      method: "PUT",
      body: data,
    };

    await client.request(request);
    return res.status(200).json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error("SendGrid subscription error:", error);
    return res.status(500).json({ error: "Failed to subscribe" });
  }
}
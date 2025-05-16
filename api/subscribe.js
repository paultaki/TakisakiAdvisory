// /api/subscribe.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sendgrid = require('@sendgrid/mail');

// Set your API key from .env
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const subscribersPath = path.join(process.cwd(), 'data', 'subscribers.json');

  let subscribers = [];
  if (fs.existsSync(subscribersPath)) {
    subscribers = JSON.parse(fs.readFileSync(subscribersPath, 'utf8'));
  }

  if (subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return res.status(200).json({ message: 'Already subscribed!' });
  }

  subscribers.push({ email, date: new Date().toISOString() });
  fs.mkdirSync(path.dirname(subscribersPath), { recursive: true });
  fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));

  // ✅ Send confirmation email using SendGrid here:
  try {
    await sendgrid.send({
      to: email,  // Send confirmation to subscriber
      from: 'paul@paultakisaki.com', // verified sender in SendGrid
      subject: 'Subscription Confirmed!',
      html: `<p>Thank you for subscribing!</p>`
    });

    // Send notification to yourself
    await sendgrid.send({
      to: 'paul@paultakisaki.com', // your notification email
      from: 'paul@paultakisaki.com',
      subject: 'New Subscriber Alert!',
      html: `<p>New subscriber: ${email}</p>`
    });

    console.log(`Confirmation email sent to: ${email}`);
  } catch (sendgridError) {
    console.error('SendGrid error:', sendgridError);
    return res.status(500).json({ error: 'Subscription saved, but email failed to send.' });
  }

  res.status(200).json({ message: 'Subscribed successfully', email });
};
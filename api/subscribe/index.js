// /api/subscribe/index.js
const fs = require('fs');
const path = require('path');

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

  res.status(200).json({ message: 'Subscribed successfully', email });
};
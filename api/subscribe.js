require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sendgrid = require('@sendgrid/mail');
const client = require('@sendgrid/client');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
client.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  // Check if we're on Vercel
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
  console.log('Environment:', isVercel ? 'Vercel' : 'Local development');
  
  // Only attempt file operations if not on Vercel (prevents EROFS errors)
  if (!isVercel) {
    try {
      // Save locally (optional, temporary storage)
      const subscribersPath = path.join(process.cwd(), 'data', 'subscribers.json');
      let subscribers = [];
      if (fs.existsSync(subscribersPath)) {
        subscribers = JSON.parse(fs.readFileSync(subscribersPath, 'utf8'));
      }
      if (!subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
        subscribers.push({ email, date: new Date().toISOString() });
        fs.mkdirSync(path.dirname(subscribersPath), { recursive: true });
        fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));
        console.log(`Saved ${email} to local file storage`);
      } else {
        console.log(`${email} already exists in local storage`);
      }
    } catch (fsError) {
      console.error('File system error (non-critical):', fsError);
      // Continue with the API calls even if local storage fails
    }
  }

  let emailSuccess = false;
  let contactSuccess = false;

  // ✅ Send Confirmation Email
  try {
    console.log('Sending confirmation email...');
    await sendgrid.send({
      to: email,
      from: 'paul@paultakisaki.com',
      subject: 'Subscription Confirmed!',
      html: `<p>Thanks for subscribing!</p>`
    });
    console.log('Confirmation email sent to subscriber');

    await sendgrid.send({
      to: 'paul@paultakisaki.com',
      from: 'paul@paultakisaki.com',
      subject: 'New Subscriber Alert!',
      html: `<p>New subscriber: ${email}</p>`
    });
    console.log('Notification email sent to admin');
    emailSuccess = true;
  } catch (emailError) {
    console.error('SendGrid email error:', emailError);
    // Continue to next step even if email fails
  }

  // ✅ Add to SendGrid Contacts (exact fix here)
  try {
    console.log('Adding to SendGrid contacts...');
    const contactData = {
      contacts: [{ email }]
    };

    const request = {
      url: '/v3/marketing/contacts',
      method: 'PUT',
      body: contactData
    };

    const [response, body] = await client.request(request);
    console.log(`Successfully added ${email} to SendGrid contacts. Status: ${response.statusCode}`);
    contactSuccess = true;
  } catch (contactError) {
    console.error('Error adding to contacts:', contactError);
    // We'll handle this in the response below
  }

  // Determine appropriate response
  if (emailSuccess && contactSuccess) {
    return res.status(200).json({ message: 'Subscribed and added to contacts!', email });
  } else if (emailSuccess) {
    return res.status(200).json({ 
      message: 'Subscription received!', 
      warning: 'We received your subscription but had trouble adding you to our mailing list. We will ensure you receive our newsletters.',
      email 
    });
  } else if (contactSuccess) {
    return res.status(200).json({ 
      message: 'Added to contacts!', 
      warning: 'We added you to our mailing list but could not send a confirmation email. Welcome aboard!',
      email 
    });
  } else {
    return res.status(500).json({ 
      error: 'Subscription partially processed. Please email paul@paultakisaki.com if you do not receive confirmation.',
      email
    });
  }
};
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sendgrid = require('@sendgrid/mail');
const client = require('@sendgrid/client');

// Check if API key is present and valid (should start with SG.)
const apiKey = process.env.SENDGRID_API_KEY;
const hasValidApiKey = apiKey && typeof apiKey === 'string' && apiKey.startsWith('SG.');

// Set API keys for both services if valid
if (hasValidApiKey) {
  sendgrid.setApiKey(apiKey);
  client.setApiKey(apiKey);
} else {
  console.error('⚠️ INVALID SENDGRID API KEY: API key is missing or invalid (should start with SG.)');
  console.error('📝 Please follow the setup instructions in SENDGRID_SETUP.md');
  // We'll continue execution but API calls will fail
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Early exit if API key is invalid - still returns success to avoid blocking the frontend
  // but logs an error for the developer to see
  if (!hasValidApiKey) {
    console.error('CRITICAL ERROR: Newsletter subscription attempted but SendGrid API key is invalid');
    
    // Store subscription in emergency backup file
    try {
      const emergencyFilePath = path.join(process.cwd(), 'emergency-subscribers.json');
      let subscribers = [];
      
      // Read existing emergency subscribers if file exists
      if (fs.existsSync(emergencyFilePath)) {
        try {
          subscribers = JSON.parse(fs.readFileSync(emergencyFilePath, 'utf8'));
        } catch (readError) {
          // If file exists but can't be parsed, start with empty array
          subscribers = [];
        }
      }
      
      // Add new subscriber if not already present
      const emailToAdd = req.body.email;
      if (emailToAdd && !subscribers.some(s => s.email === emailToAdd)) {
        subscribers.push({
          email: emailToAdd,
          date: new Date().toISOString(),
          source: 'emergency-fallback'
        });
        
        // Create parent directory if it doesn't exist
        const dir = path.dirname(emergencyFilePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write updated subscribers to file
        fs.writeFileSync(emergencyFilePath, JSON.stringify(subscribers, null, 2));
        console.log(`[EMERGENCY] Saved ${emailToAdd} to emergency backup file`);
      }
    } catch (emergencyError) {
      console.error('[EMERGENCY] Failed to save to emergency backup:', emergencyError);
    }
    
    // We still return 200 so the user sees a success message, but log the error
    return res.status(200).json({ 
      message: 'Subscription received', 
      warning: 'Your subscription was recorded locally, but email delivery is currently unavailable. The site administrator has been notified.',
      apiKeyError: true
    });
  }

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

  // Check if API key looks valid
  const apiKey = process.env.SENDGRID_API_KEY;
  console.log(`API Key validation check: ${apiKey ? (apiKey.startsWith('SG.') ? 'Valid format' : 'Invalid format') : 'Missing'}`);
  
  // ✅ Send Confirmation Email
  try {
    console.log('Sending confirmation email...');
    await sendgrid.send({
      to: email,
      from: 'paul@paultakisaki.com',
      subject: 'Subscription Confirmed!',
      html: `<p>Thanks for subscribing to Paul Takisaki's newsletter!</p>
             <p>You'll receive insights and strategies on leadership and coaching.</p>`
    });
    console.log('Confirmation email sent to subscriber');

    await sendgrid.send({
      to: 'paul@paultakisaki.com',
      from: 'paul@paultakisaki.com',
      subject: 'New Subscriber Alert!',
      html: `<p>New subscriber: ${email}</p>
             <p>Added on: ${new Date().toLocaleString()}</p>`
    });
    console.log('Notification email sent to admin');
    emailSuccess = true;
  } catch (emailError) {
    console.error('SendGrid email error:', emailError);
    console.error('Email error details:', emailError.message);
    if (emailError.response) {
      console.error('Email error status code:', emailError.response.statusCode);
      console.error('Email error response body:', JSON.stringify(emailError.response.body));
    }
    // Continue to next step even if email fails
  }

  // ✅ Updated SendGrid contacts API call with enhanced logging
  try {
    console.log('Adding to SendGrid contacts...');
    // Log the API key being used (partially redacted for security)
    const apiKey = process.env.SENDGRID_API_KEY;
    console.log(`Using API key: ${apiKey ? apiKey.substring(0, 4) + '...' + apiKey.substring(apiKey.length - 4) : 'None'}`);
    
    // Get the list ID from environment variable or use the hardcoded value
    const listId = process.env.SENDGRID_LIST_ID || 'd5603f64-f104-4f93-92e1-02dee4c974e9';
    console.log(`Using list ID: ${listId}`);
    
    // Format contact data according to SendGrid API requirements
    const contactData = {
      list_ids: [listId], // Use the determined list ID
      contacts: [{ 
        email,
        created_at: new Date().toISOString(),
        source: "website_newsletter"
      }]
    };
    
    console.log('Contact data payload:', JSON.stringify(contactData));

    const request = {
      url: '/v3/marketing/contacts',
      method: 'PUT',
      body: contactData
    };

    // Make the request and capture detailed response
    console.log('Sending request to SendGrid contacts API...');
    const [response, body] = await client.request(request);
    
    console.log('SendGrid API response status:', response.statusCode);
    console.log('SendGrid API response body:', JSON.stringify(body));
    
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log(`Successfully added ${email} to SendGrid contacts.`);
      contactSuccess = true;
    } else {
      console.error(`Failed to add to contacts. Status: ${response.statusCode}`);
      console.error('Response body:', JSON.stringify(body));
    }
  } catch (contactError) {
    console.error('Error adding to contacts:', contactError);
    console.error('Error details:', contactError.message);
    if (contactError.response) {
      console.error('Error status code:', contactError.response.statusCode);
      console.error('Error response body:', contactError.response.body);
    }
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
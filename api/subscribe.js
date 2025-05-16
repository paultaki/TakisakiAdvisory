// /api/subscribe.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sendgrid = require('@sendgrid/mail');
const client = require('@sendgrid/client');

// Set your API key from .env
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.error('SENDGRID_API_KEY is not set. Email functionality will not work.');
} else {
  console.log('SENDGRID_API_KEY is set. Length:', apiKey.length);
  sendgrid.setApiKey(apiKey);
  client.setApiKey(apiKey);
}

// Get SendGrid list ID from .env
const listId = process.env.SENDGRID_LIST_ID;
if (!listId) {
  console.warn('SENDGRID_LIST_ID is not set. Contact list functionality will not work.');
} else {
  console.log('SENDGRID_LIST_ID is set:', listId);
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  // Check for Vercel environment
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
  console.log('Environment:', isVercel ? 'Vercel' : 'Local server');
  
  // Used to track if the email is already subscribed
  let alreadySubscribed = false;
  
  // Only perform file operations if NOT in Vercel environment
  if (!isVercel) {
    try {
      const subscribersPath = path.join(process.cwd(), 'data', 'subscribers.json');
      
      let subscribers = [];
      if (fs.existsSync(subscribersPath)) {
        subscribers = JSON.parse(fs.readFileSync(subscribersPath, 'utf8'));
      }
      
      // Check if already subscribed
      alreadySubscribed = subscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
      
      if (alreadySubscribed) {
        console.log(`Email ${email} is already subscribed (from file system)`);
      } else {
        // Add to local file
        subscribers.push({ email, date: new Date().toISOString() });
        fs.mkdirSync(path.dirname(subscribersPath), { recursive: true });
        fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));
        console.log(`Email ${email} saved to local file system`);
      }
    } catch (fsError) {
      // Log file system error but continue with SendGrid
      console.error('File system error (non-critical):', fsError);
    }
  } else {
    console.log('Skipping file operations in Vercel environment');
  }
  
  // If we already know the email is subscribed, return early
  if (alreadySubscribed) {
    return res.status(200).json({ message: 'Already subscribed!' });
  }

  // ✅ Add to SendGrid contact list and send confirmation email
  try {
    console.log(`Processing subscription for: ${email}`);
    
    let sendgridSuccess = false;
    let contactAddedToList = false;
    let errorDetails = null;
    let isExistingContact = false;
    
    // First check if the contact already exists in SendGrid list
    if (listId && apiKey) {
      try {
        // Check if the email already exists in the list
        console.log(`Checking if ${email} exists in SendGrid`);
        
        // Use Search Contacts endpoint to check if email exists
        // This endpoint is more reliable for checking contacts
        const searchRequest = {
          url: `/v3/marketing/contacts/search`,
          method: 'POST',
          body: {
            query: `email LIKE '${email.toLowerCase()}'`
          }
        };
        
        const [searchResponse, searchResults] = await client.request(searchRequest);
        
        if (searchResponse.statusCode >= 200 && searchResponse.statusCode < 300) {
          if (searchResults && 
              searchResults.contact_count && 
              searchResults.contact_count > 0) {
            
            console.log(`Email ${email} already exists in SendGrid (${searchResults.contact_count} matches)`);
            isExistingContact = true;
            contactAddedToList = true; // No need to add it again
            
            // Check if already in the specific list
            let inTargetList = false;
            
            if (searchResults.result && searchResults.result.length > 0) {
              const firstMatch = searchResults.result[0];
              if (firstMatch.list_ids && firstMatch.list_ids.includes(listId)) {
                inTargetList = true;
                console.log(`Email is already in the target list: ${listId}`);
              }
            }
            
            // If not in the target list, add it
            if (!inTargetList) {
              console.log(`Adding existing contact to list: ${listId}`);
              
              const addToListRequest = {
                url: `/v3/marketing/lists/${listId}/contacts`,
                method: 'POST',
                body: {
                  contact_ids: searchResults.result.map(r => r.id)
                }
              };
              
              await client.request(addToListRequest);
              console.log('Added existing contact to list successfully');
            }
            
            // Return early - already subscribed
            return res.status(200).json({ message: 'Already subscribed!' });
          } else {
            console.log(`Email ${email} not found in SendGrid, will add as new contact`);
          }
        }
      } catch (searchError) {
        console.error('Error searching for existing contact:', searchError);
        // Continue with adding the contact even if search failed
      }
    }
    
    // Step 1: Add the contact to the SendGrid list if not already in it
    if (!isExistingContact && listId && apiKey) {
      try {
        console.log(`Attempting to add ${email} to SendGrid list: ${listId}`);
        
        // Prepare the request to add a contact
        const data = {
          list_ids: [listId],
          contacts: [
            {
              email: email,
              custom_fields: {
                // You can add custom fields here if needed
                e1: 'Website Signup', // Example custom field
                e2: new Date().toISOString().split('T')[0] // Signup date
              }
            }
          ]
        };
        
        const request = {
          url: '/v3/marketing/contacts',
          method: 'PUT',
          body: data
        };
        
        // Make the request to SendGrid
        const [response, body] = await client.request(request);
        
        if (response.statusCode >= 200 && response.statusCode < 300) {
          console.log('Contact successfully added to list:', response.statusCode);
          contactAddedToList = true;
        } else {
          console.warn('Failed to add contact to list:', response.statusCode, body);
          errorDetails = { 
            status: response.statusCode,
            body: body
          };
        }
      } catch (listError) {
        console.error('Error adding contact to list:', listError);
        errorDetails = {
          message: listError.message,
          code: listError.code || 'UNKNOWN' 
        };
      }
    } else if (!listId || !apiKey) {
      console.warn('Skipping adding to list - missing configuration');
    }
    
    // Step 2: Attempt to send confirmation emails
    try {
      // Attempt to send confirmation email to subscriber
      await sendgrid.send({
        to: email,
        from: 'paul@paultakisaki.com', // verified sender in SendGrid
        subject: 'Subscription Confirmed!',
        html: `
          <p>Thank you for subscribing to Paul Takisaki's newsletter!</p>
          <p>You'll receive updates with leadership insights and strategies.</p>
          <br>
          <p>Best regards,<br>Paul Takisaki</p>
        `
      });
      console.log(`Confirmation email sent to: ${email}`);
      
      // Attempt to send notification email to admin
      await sendgrid.send({
        to: 'paul@paultakisaki.com',
        from: 'paul@paultakisaki.com',
        subject: 'New Newsletter Subscriber!',
        html: `
          <p>New subscriber: ${email}</p>
          <p>Added to list: ${contactAddedToList ? 'Yes' : 'No'}</p>
          <p>Time: ${new Date().toISOString()}</p>
        `
      });
      console.log(`Notification email sent to admin`);
      sendgridSuccess = true;
    } catch (sendgridError) {
      // Log detailed SendGrid error
      console.error('SendGrid email error details:', {
        message: sendgridError.message,
        code: sendgridError.code,
        response: sendgridError.response ? {
          statusCode: sendgridError.response.statusCode,
          body: sendgridError.response.body,
          headers: sendgridError.response.headers
        } : 'No response'
      });
      
      errorDetails = {
        message: sendgridError.message,
        code: sendgridError.code || 'UNKNOWN'
      };
    }
    
    // Step 3: Return appropriate response based on what succeeded
    if (sendgridSuccess && contactAddedToList) {
      // Complete success
      return res.status(200).json({ 
        message: 'Subscribed successfully!', 
        email 
      });
    } else if (sendgridSuccess || contactAddedToList) {
      // Partial success
      return res.status(200).json({ 
        message: 'Subscription received!', 
        warning: 'Some features may be delayed - we will ensure you receive our newsletters.',
        email,
        details: errorDetails
      });
    } else {
      // Both methods failed but we still saved the email locally
      return res.status(200).json({ 
        message: 'Your subscription was saved locally.', 
        warning: 'We are experiencing technical difficulties with our email service. We will add you to our list manually.',
        email,
        details: errorDetails 
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error processing your subscription.' });
  }
  
  // Note: We don't need this line because we already return responses
  // inside the try/catch blocks above
  // res.status(200).json({ message: 'Subscribed successfully', email });
};
// /api/subscribe.js - Newsletter subscription handler

// If you're using Express.js directly
const express = require('express');
const router = express.Router();

// For NextJS or serverless environments
const handler = async (req, res) => {
  // Set CORS headers to allow your domains
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate email
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Store the email address (using file storage as a simple solution)
    const fs = require('fs');
    const path = require('path');
    
    const dataDir = path.join(process.cwd(), 'data');
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const subscribersPath = path.join(dataDir, 'subscribers.json');
    
    // Read existing subscribers or create new array
    let subscribers = [];
    try {
      if (fs.existsSync(subscribersPath)) {
        const fileData = fs.readFileSync(subscribersPath, 'utf8');
        subscribers = JSON.parse(fileData);
      }
    } catch (err) {
      console.error('Error reading subscribers file:', err);
      // Continue with empty array if file read fails
    }
    
    // Check if email already exists
    const emailExists = subscribers.some(subscriber => 
      subscriber.email.toLowerCase() === email.toLowerCase()
    );
    
    if (emailExists) {
      return res.status(200).json({ 
        message: 'You are already subscribed!',
        email
      });
    }
    
    // Add new subscriber
    subscribers.push({
      email,
      date: new Date().toISOString()
    });
    
    // Write updated subscribers back to file
    fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));
    
    console.log(`Successfully saved subscription for email: ${email}`);

    // Return success response
    return res.status(200).json({
      message: 'Subscribed successfully',
      email
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      error: 'An error occurred during subscription. Please try again later.'
    });
  }
};

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// For Express.js
if (router) {
  router.post('/subscribe', handler);
  module.exports = router;
} else {
  // For Next.js API routes or serverless functions
  module.exports = handler;
}
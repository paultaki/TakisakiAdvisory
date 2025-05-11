// Simple script to test if your SendGrid API key works
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

// Set API key from environment variable
const apiKey = process.env.SENDGRID_API_KEY;

// Check if the API key is set
if (!apiKey || apiKey === 'your_sendgrid_api_key_here') {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: SendGrid API key not set!');
  console.log('Please set your actual SendGrid API key in the .env file');
  process.exit(1);
}

sgMail.setApiKey(apiKey);

// Test email data
const msg = {
  to: 'paul@paultakisaki.com', // Your email
  from: 'paul@paultakisaki.com', // Must be a verified sender in SendGrid
  subject: 'SendGrid API Test',
  text: 'This is a test email to verify that your SendGrid API key is working correctly.',
  html: '<p>This is a test email to verify that your SendGrid API key is working correctly.</p>',
};

// Send the test email
console.log('Attempting to send a test email...');
sgMail
  .send(msg)
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', 'SUCCESS: Test email sent successfully!');
    console.log('Your SendGrid API key is working correctly.');
  })
  .catch((error) => {
    console.error('\x1b[31m%s\x1b[0m', 'ERROR: Failed to send test email!');
    console.error('Error details:', error.toString());
    
    if (error.response) {
      console.error('Response body:', error.response.body);
    }
    
    console.log('\nPossible issues:');
    console.log('1. Your API key may be incorrect or has restricted permissions');
    console.log('2. Your sender email (paul@paultakisaki.com) may not be verified in SendGrid');
    console.log('3. Your SendGrid account may have sending limitations or restrictions');
  });
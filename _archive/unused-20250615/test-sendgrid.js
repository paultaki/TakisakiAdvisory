require('dotenv').config();
const sendgrid = require('@sendgrid/mail');
const client = require('@sendgrid/client');

// Output debugging information
console.log('Testing SendGrid API connections...');
console.log('Environment variables:');
console.log('- SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
console.log('- SENDGRID_LIST_ID exists:', !!process.env.SENDGRID_LIST_ID);

// Check if API key format is correct (should start with 'SG.')
const apiKey = process.env.SENDGRID_API_KEY;
console.log('API Key format check:', apiKey ? (apiKey.startsWith('SG.') ? 'VALID' : 'INVALID - Should start with SG.') : 'MISSING');

// Check list ID format (should be a UUID format)
const listId = process.env.SENDGRID_LIST_ID;
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
console.log('List ID format check:', listId ? (uuidRegex.test(listId) ? 'VALID' : 'INVALID - Should be UUID format') : 'MISSING');

// Set API key for both mail and client
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
client.setApiKey(process.env.SENDGRID_API_KEY);

// Test function to get SendGrid lists
async function testGetLists() {
  console.log('\n=== Testing Lists API ===');
  try {
    const request = {
      url: '/v3/marketing/lists',
      method: 'GET'
    };
    
    const [response, body] = await client.request(request);
    console.log('Lists API Status:', response.statusCode);
    console.log('Lists found:', body.result ? body.result.length : 0);
    
    if (body.result && body.result.length > 0) {
      console.log('\nAvailable lists:');
      body.result.forEach(list => {
        console.log(`- ${list.name} (ID: ${list.id})`);
      });
    }
    
    return true;
  } catch (error) {
    console.error('Lists API Error:', error.message);
    if (error.response) {
      console.error('Status code:', error.response.statusCode);
      console.error('Response body:', JSON.stringify(error.response.body));
    }
    return false;
  }
}

// Test function to get the specific list details
async function testGetListDetails() {
  if (!listId || !uuidRegex.test(listId)) {
    console.log('\n=== Skipping List Details Test - Invalid or Missing List ID ===');
    return false;
  }
  
  console.log(`\n=== Testing List Details for ID: ${listId} ===`);
  try {
    const request = {
      url: `/v3/marketing/lists/${listId}`,
      method: 'GET'
    };
    
    const [response, body] = await client.request(request);
    console.log('List Details API Status:', response.statusCode);
    
    if (response.statusCode === 200) {
      console.log('List Name:', body.name);
      console.log('Contact Count:', body.contact_count);
    }
    
    return true;
  } catch (error) {
    console.error('List Details API Error:', error.message);
    if (error.response) {
      console.error('Status code:', error.response.statusCode);
      console.error('Response body:', JSON.stringify(error.response.body));
    }
    return false;
  }
}

// Test function to check if we can add a contact
async function testAddContact() {
  console.log('\n=== Testing Contact Addition ===');
  // Create a test email with timestamp to avoid duplicates
  const testEmail = `test_${Date.now()}@example.com`;
  
  try {
    // Format contact data according to SendGrid API requirements
    const contactData = {
      list_ids: [listId],
      contacts: [{ 
        email: testEmail,
        first_name: 'Test',
        last_name: 'User',
        created_at: new Date().toISOString(),
        source: "api_test"
      }]
    };
    
    console.log('Test contact email:', testEmail);
    
    const request = {
      url: '/v3/marketing/contacts',
      method: 'PUT',
      body: contactData
    };
    
    const [response, body] = await client.request(request);
    console.log('Add Contact API Status:', response.statusCode);
    console.log('Response:', JSON.stringify(body, null, 2));
    
    return response.statusCode >= 200 && response.statusCode < 300;
  } catch (error) {
    console.error('Add Contact API Error:', error.message);
    if (error.response) {
      console.error('Status code:', error.response.statusCode);
      console.error('Response body:', JSON.stringify(error.response.body));
    }
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('\n========== SENDGRID API TESTS ==========\n');
  
  const listsResult = await testGetLists();
  const listDetailsResult = await testGetListDetails();
  const addContactResult = await testAddContact();
  
  console.log('\n========== TEST RESULTS ==========');
  console.log('Lists API test:', listsResult ? 'PASSED' : 'FAILED');
  console.log('List Details test:', listDetailsResult ? 'PASSED' : 'FAILED');
  console.log('Add Contact test:', addContactResult ? 'PASSED' : 'FAILED');
  
  console.log('\n=== DIAGNOSIS ===');
  if (!listsResult) {
    console.log('- API key may be invalid or incorrect');
    console.log('- SendGrid access may be restricted for this API key');
  }
  
  if (listsResult && !listDetailsResult) {
    console.log('- The list ID specified in SENDGRID_LIST_ID may be incorrect');
    console.log('- The list may have been deleted in SendGrid');
  }
  
  if (listsResult && !addContactResult) {
    console.log('- API key may not have write permissions for contacts');
    console.log('- The list may be read-only or have restrictions');
  }
  
  if (!listsResult && !listDetailsResult && !addContactResult) {
    console.log('- The API key appears to be completely invalid or has no permissions');
    console.log('- Double-check the API key in your .env file');
    console.log('- Generate a new API key in SendGrid with proper permissions if needed');
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Error running tests:', error);
});
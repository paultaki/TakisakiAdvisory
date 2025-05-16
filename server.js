require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '/')));

// API routes
app.post('/api/subscribe', async (req, res) => {
  try {
    // Import handler function from subscribe.js
    const subscribeHandler = require('./api/subscribe');
    // Call the handler with req and res
    return await subscribeHandler(req, res);
  } catch (error) {
    console.error('Error handling subscription:', error);
    return res.status(500).json({ error: 'Server error processing subscription' });
  }
});

// Email API route
app.post('/api/send-email', async (req, res) => {
  try {
    const sendEmailHandler = require('./api/send-email');
    return await sendEmailHandler(req, res);
  } catch (error) {
    console.error('Error handling email send:', error);
    return res.status(500).json({ error: 'Server error sending email' });
  }
});

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle API 404s
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Handle other routes by serving the appropriate HTML file
app.get('*', (req, res) => {
  // Extract the path from the request
  const requestPath = req.path;
  
  // Check if the path exists as a file
  const filePath = path.join(__dirname, requestPath);
  
  // Try to send the file
  res.sendFile(filePath, (err) => {
    if (err) {
      // If file not found, send index.html for SPA routing
      res.sendFile(path.join(__dirname, 'index.html'));
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
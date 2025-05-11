#!/bin/bash

# Make sure you have the required dependencies
echo "Installing dependencies..."
npm install

# Run the test script
echo "Testing SendGrid API key..."
node test-sendgrid.js
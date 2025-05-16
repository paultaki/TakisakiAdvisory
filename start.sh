#!/bin/bash

# Print diagnostic information
echo "=== Newsletter System Diagnostic ==="
echo "- Current directory: $(pwd)"
echo "- Node version: $(node -v)"
echo "- NPM version: $(npm -v)"

# Check for .env file
if [ -f .env ]; then
  echo "- .env file: Found"
  
  # Check SendGrid API Key format
  if grep -q "SENDGRID_API_KEY=SG." .env; then
    echo "- SendGrid API Key: Valid format (starts with SG.)"
  else
    echo "- SendGrid API Key: INVALID format (should start with SG.)"
    echo "  Please read SENDGRID_SETUP.md for instructions"
  fi
  
  # Check if list ID is in UUID format
  if grep -q "SENDGRID_LIST_ID=.*-.*-.*-.*-.*" .env; then
    echo "- SendGrid List ID: Valid format (UUID)"
  else
    echo "- SendGrid List ID: INVALID format (should be UUID)"
  fi
else
  echo "- .env file: MISSING"
  echo "  Please create .env file with your SendGrid credentials"
fi

echo ""
echo "Starting the server..."
echo "Access the website at: http://localhost:3000"
echo ""

# Start the server
node server.js
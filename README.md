# Paul Takisaki Website

This is the official website for Paul Takisaki, Executive Coach & AI Strategist.

## Contact Form Setup

The website includes a contact form that sends emails using SendGrid. Follow these steps to set it up:

### Prerequisites

- Node.js and npm installed
- SendGrid account (free tier works)
- Verified sender email in SendGrid

### Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure SendGrid**:
   - Sign up for a SendGrid account at [sendgrid.com](https://sendgrid.com)
   - Create an API key in the SendGrid dashboard
   - Add your API key to the `.env` file:
     ```
     SENDGRID_API_KEY=your_actual_api_key_here
     ```
   - Verify your domain and sender email (paul@paultakisaki.com) in SendGrid

3. **Start the server**:
   ```bash
   npm start
   ```
   For development (automatic reloading):
   ```bash
   npm run dev
   ```

4. **Access the website**:
   - Open http://localhost:3000 in your browser

### Troubleshooting

If the contact form doesn't work:

1. Check the console for errors (F12 in most browsers)
2. Verify your SendGrid API key is correctly set in the `.env` file
3. Make sure your sender email is verified in SendGrid
4. Check that the server is running (you should see "Server running on port 3000" in the console)

## Deployment

For production deployment, consider:

1. Setting up a proper web server (Nginx, Apache)
2. Using a process manager like PM2
3. Implementing HTTPS

Example PM2 start command:
```bash
pm2 start server.js --name "paul-takisaki-website"
```
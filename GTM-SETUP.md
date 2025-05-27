# Google Tag Manager Implementation Guide

## Overview

This document outlines the Google Tag Manager (GTM) implementation on paultakisaki.com. The site uses GTM container ID: `GTM-K9B7LZB8`.

## Tracking Implementation

### Core Pages with GTM Setup

The following pages have been updated with proper GTM implementation:

1. **Homepage** (index.html)
2. **About Page** (about.html)
3. **Insights Page** (insights/Insights.html)

### Key Tracking Events

The following key user interactions are now tracked:

1. **Page Views**
   - Every page has dataLayer initialization with page type
   - Can be used to track page views in Google Analytics

2. **Form Submissions**
   - Contact form submissions
   - Form submission success/failure events

3. **Newsletter Subscriptions**
   - Newsletter signup attempts
   - Successful/failed subscriptions

### Implementation Details

#### 1. dataLayer Initialization

Each page includes proper dataLayer initialization before the GTM script:

```javascript
<!-- Initialize dataLayer -->
<script>
window.dataLayer = window.dataLayer || [];
dataLayer.push({
    'pageType': 'home', // or 'about', 'insights', etc.
    'pageTitle': 'Page Title Here'
});
</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K9B7LZB8');</script>
<!-- End Google Tag Manager -->
```

#### 2. Contact Form Tracking Events

The website now tracks the following contact form events:

- `contact_modal_open`: When a user opens the contact form
- `form_submission`: When a user attempts to submit the contact form
- `form_submission_success`: When a form submission succeeds
- `form_submission_error`: When a form submission fails

Sample dataLayer push:

```javascript
dataLayer.push({
    'event': 'form_submission',
    'eventCategory': 'Lead Generation',
    'eventAction': 'Contact Form Submit',
    'eventLabel': email,
    'formData': {
        'name': name,
        'company': company ? company : 'Not provided'
    }
});
```

#### 3. Newsletter Tracking Events

The newsletter subscription form now tracks:

- `newsletter_subscribe`: When a user successfully subscribes
- `newsletter_subscribe_error`: When a subscription attempt fails

## How to Configure GTM

1. **Log in to Google Tag Manager**
   - Go to https://tagmanager.google.com/
   - Select container ID: GTM-K9B7LZB8

2. **Set up Google Analytics 4**
   - Create a GA4 configuration tag
   - Use automatic event tracking

3. **Create Custom Triggers**
   - Create triggers for each custom event:
     - `contact_modal_open`
     - `form_submission`
     - `form_submission_success`
     - `form_submission_error`
     - `newsletter_subscribe`
     - `newsletter_subscribe_error`

4. **Create Tags for Each Event**
   - Create GA4 event tags for each custom event
   - Link them to the appropriate triggers

5. **Test Your Tags**
   - Use Preview mode to verify events are firing correctly
   - Check real-time reports in Google Analytics

## Troubleshooting

If events aren't showing in Google Analytics:

1. **Check GTM Debug Mode**
   - Go to your website with `?gtm_debug=x` added to the URL
   - Verify events are firing in the GTM debug panel

2. **Verify dataLayer Events**
   - Open browser console
   - Type `dataLayer` to see all recorded events

3. **Check for JavaScript Errors**
   - Look for errors in the browser console that might prevent event tracking

4. **Verify GA4 Configuration**
   - Make sure your GA4 configuration tag is firing on all pages
   - Check that your measurement ID is correct

## Next Steps

1. **Tag all remaining pages** - Implement the same GTM code on all other HTML pages
2. **Set up conversion tracking** - Create goals in Google Analytics based on key actions
3. **Configure enhanced ecommerce** - If applicable for future product offerings
4. **Implement scroll depth tracking** - To measure content engagement

---

For additional help, refer to:
- [Google Tag Manager Help](https://support.google.com/tagmanager/)
- [Google Analytics 4 Help](https://support.google.com/analytics/)
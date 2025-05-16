/**
 * Newsletter subscription form handler
 * This script provides a robust way to handle newsletter subscription forms
 * across the website. It identifies forms with the class 'newsletter-form'
 * and sets up proper event handling and error feedback.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find all newsletter forms on the page
  const newsletterForms = document.querySelectorAll('form.newsletter-form, #newsletter-form');
  
  if (newsletterForms.length === 0) {
    console.log('No newsletter forms found on this page');
    return;
  }
  
  console.log(`Found ${newsletterForms.length} newsletter form(s)`);
  
  // Set up each form with proper IDs and event handlers
  newsletterForms.forEach((form, index) => {
    // Set ID if not already set
    if (!form.id) {
      form.id = `newsletter-form-${index}`;
    }
    
    // Find the email input
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput) {
      console.error(`No email input found in form ${form.id}`);
      return;
    }
    
    // Set ID and name if not already set
    if (!emailInput.id) {
      emailInput.id = `${form.id}-email`;
    }
    if (!emailInput.name) {
      emailInput.name = 'email';
    }
    
    // Find the submit button
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) {
      console.error(`No submit button found in form ${form.id}`);
      return;
    }
    
    // Add form submission handler
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const email = emailInput.value.trim();

      if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      // Create a status message element if it doesn't exist
      let statusMessage = form.querySelector('.subscription-status');
      if (!statusMessage) {
        statusMessage = document.createElement('div');
        statusMessage.className = 'subscription-status text-center my-2';
        form.appendChild(statusMessage);
      }
      
      // Clear any previous status messages
      statusMessage.innerHTML = '';

      submitButton.disabled = true;
      submitButton.textContent = 'Subscribing...';

      try {
        console.log('Sending subscription request...');
        submitButton.textContent = 'Subscribing...';
        
        // Add timestamp to avoid caching issues
        const timestamp = new Date().getTime();
        const apiUrl = `/api/subscribe?_t=${timestamp}`;
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          },
          body: JSON.stringify({ email })
        });

        console.log('Response received:', response.status);
        
        let result;
        try {
          // Try to parse the JSON response
          result = await response.json();
          console.log('Response data:', result);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          throw new Error('Invalid server response format');
        }

        if (response.ok) {
          submitButton.textContent = 'Subscribed!';
          
          // Handle the case where we got a warning but still succeeded
          if (result.warning) {
            statusMessage.innerHTML = `
              <p class="text-green-400">${result.message}</p>
              <p class="text-yellow-400 text-sm">${result.warning}</p>
            `;
          } else {
            statusMessage.innerHTML = `<p class="text-green-400">${result.message}</p>`;
          }
          
          emailInput.value = '';
          
          // Create a fallback alert in case the user doesn't see the status message
          setTimeout(() => {
            // Only show if the form hasn't been reset yet
            if (statusMessage.innerHTML.includes('Subscribed')) {
              alert('Thank you for subscribing!');
            }
          }, 5000);
          
        } else {
          submitButton.textContent = 'Try Again';
          statusMessage.innerHTML = `<p class="text-red-400">${result.error || 'Subscription failed. Please try again.'}</p>`;
        }
      } catch (err) {
        console.error('Network or parsing error:', err);
        
        // Create a fallback to a server-side script with GET parameters as a backup option
        const fallbackUrl = `/fallback-subscribe.php?email=${encodeURIComponent(email)}&t=${new Date().getTime()}`;
        
        try {
          submitButton.textContent = 'Trying alternative...';
          const fallbackResponse = await fetch(fallbackUrl);
          submitButton.textContent = 'Subscribed!';
          statusMessage.innerHTML = '<p class="text-green-400">Thank you for subscribing (fallback method)!</p>';
          emailInput.value = '';
        } catch (fallbackErr) {
          console.error('Fallback also failed:', fallbackErr);
          statusMessage.innerHTML = `
            <p class="text-red-400">We're experiencing technical difficulties.</p>
            <p class="text-sm">Please email us at paul@paultakisaki.com to subscribe.</p>
          `;
          submitButton.textContent = 'Try Again';
        }
      } finally {
        submitButton.disabled = false;
      }
    });
  });
  
  /**
   * Validate email format using regex
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Set form elements to submitting state
   */
  function setFormSubmitting(form, isSubmitting) {
    const inputs = form.querySelectorAll('input, button, textarea, select');
    inputs.forEach(input => {
      input.disabled = isSubmitting;
    });
  }
});
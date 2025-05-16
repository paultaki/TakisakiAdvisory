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
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        if (response.ok) {
          const result = await response.json();
          submitButton.textContent = 'Subscribed!';
          statusMessage.innerHTML = `<p class="text-green-400">${result.message}</p>`;
          emailInput.value = '';
        } else {
          const errorData = await response.json();
          statusMessage.innerHTML = `<p class="text-red-400">${errorData.error || 'Subscription failed. Try again.'}</p>`;
          submitButton.textContent = 'Try Again';
        }
      } catch (err) {
        console.error('Network error:', err);
        statusMessage.innerHTML = '<p class="text-red-400">Network error. Try again later.</p>';
        submitButton.textContent = 'Try Again';
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
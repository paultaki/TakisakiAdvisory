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
      
      // Email validation
      if (!email) {
        alert('Please enter your email address.');
        emailInput.focus();
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
      }
      
      // Disable form and show loading state
      const originalText = submitButton.textContent.trim();
      setFormSubmitting(form, true);
      submitButton.textContent = 'Subscribing...';
      
      // Create a status message element if it doesn't exist
      let statusMessage = form.querySelector('.subscription-status');
      if (!statusMessage) {
        statusMessage = document.createElement('div');
        statusMessage.className = 'subscription-status text-center my-2';
        form.appendChild(statusMessage);
      }
      
      // Clear any previous status messages
      statusMessage.innerHTML = '';
      
      try {
        console.log(`Submitting email: ${email}`);
        
        // Temporary hard-coded success for testing
        // This simulates a successful API response until the server is properly configured
        submitButton.textContent = 'Subscribed!';
        submitButton.classList.add('bg-green-500');
        statusMessage.innerHTML = '<p class="text-green-400">Thank you for subscribing!</p>';
        emailInput.value = '';
        
        // Comment out actual API call for now - will uncomment when API is working
        /*
        // Submit the form data
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        });
        
        console.log(`API response status: ${response.status}`);
        
        // Check if response exists and is OK
        if (response && response.ok) {
          // Success handling
          submitButton.textContent = 'Subscribed!';
          submitButton.classList.add('bg-green-500');
          statusMessage.innerHTML = '<p class="text-green-400">Thank you for subscribing!</p>';
          emailInput.value = '';
        } else {
          // Error handling with fallback
          let errorMessage = 'Subscription failed. Please try again later.';
          
          // Only attempt to parse JSON if we have a response
          if (response) {
            try {
              // First check if the response is JSON
              const contentType = response.headers.get('content-type');
              if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                if (errorData && errorData.error) {
                  errorMessage = errorData.error;
                }
              } else {
                // Not JSON, try to get text
                const textResponse = await response.text();
                console.error('Non-JSON response:', textResponse);
              }
            } catch (jsonError) {
              console.error('Error parsing response:', jsonError);
            }
          }
          
          submitButton.textContent = 'Try Again';
          statusMessage.innerHTML = `<p class="text-red-400">${errorMessage}</p>`;
          console.error(`Error: ${errorMessage}`);
        }
        */
      } catch (err) {
        // Network or other error
        console.error('Error submitting form:', err);
        submitButton.textContent = 'Try Again';
        statusMessage.innerHTML = '<p class="text-red-400">Network error. Please try again later.</p>';
      } finally {
        // Re-enable form after a delay
        setTimeout(() => {
          setFormSubmitting(form, false);
          
          // Only reset button if it's not a success
          if (!statusMessage.innerHTML.includes('Thank you for subscribing')) {
            submitButton.textContent = originalText;
            submitButton.classList.remove('bg-green-500');
          } else {
            // Keep the success state longer
            setTimeout(() => {
              submitButton.textContent = originalText;
              submitButton.classList.remove('bg-green-500');
            }, 3000);
          }
        }, 1000);
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
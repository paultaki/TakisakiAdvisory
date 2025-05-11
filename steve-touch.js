/**
 * Steve-Inspired Touch Experience
 * Creates perfect touch feedback and tactile interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only run on mobile devices
  const isMobile = window.innerWidth <= 992;
  if (!isMobile) return;
  
  // Add touch optimization marker
  document.documentElement.classList.add('touch-optimized');
  
  // Initialize touch optimizations
  initTouchOptimizations();
  
  // Set up ripple effects
  setupRippleEffects();
  
  // Add spring button effects
  setupSpringButtons();
  
  // Apply magnetic effects to important buttons
  setupMagneticEffects();
  
  // Initialize touch gestures
  setupTouchGestures();
});

/**
 * Sets up basic touch optimizations
 */
function initTouchOptimizations() {
  // Add CSS file
  const touchStyle = document.createElement('link');
  touchStyle.rel = 'stylesheet';
  touchStyle.href = 'steve-touch.css';
  document.head.appendChild(touchStyle);
  
  // Add tactile class to interactive elements
  const interactiveElements = document.querySelectorAll(
    'a:not(.steve-nav-link):not(.steve-cta-button), ' + 
    'button:not(.steve-menu-button), ' +
    'input[type="submit"], ' +
    'input[type="button"], ' +
    '[role="button"]'
  );
  
  interactiveElements.forEach(element => {
    // Skip elements that already have these classes
    if (!element.classList.contains('tactile') && 
        !element.classList.contains('ripple') &&
        !element.classList.contains('spring-button')) {
      element.classList.add('tactile');
    }
    
    // Add expanding-target for small buttons
    if (element.offsetWidth < 44 || element.offsetHeight < 44) {
      element.classList.add('expanding-target');
    }
  });
  
  // Enhance card elements
  const cards = document.querySelectorAll('.card, .testimonial-card, .demo-card');
  cards.forEach(card => {
    card.classList.add('card-press');
  });
  
  // Enhance form elements
  enhanceFormElements();
}

/**
 * Adds ripple effects to interactive elements
 */
function setupRippleEffects() {
  // Find elements that should have ripple effect
  const rippleElements = document.querySelectorAll(
    '.steve-cta-button, ' + 
    'button[type="submit"], ' +
    '.demo-button, ' + 
    '.contact-button'
  );
  
  rippleElements.forEach(element => {
    // Add ripple class
    element.classList.add('ripple');
    
    // Add touch event listener
    element.addEventListener('touchstart', createRipple, { passive: true });
  });
  
  // Create ripple effect function
  function createRipple(event) {
    const button = event.currentTarget;
    
    // Remove existing ripples
    const existingRipple = button.querySelector('.ripple-effect');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    // Create new ripple
    const circle = document.createElement('span');
    circle.classList.add('ripple-effect');
    button.appendChild(circle);
    
    // Calculate ripple size (should be at least as large as the button)
    const diameter = Math.max(button.clientWidth, button.clientHeight) * 1.2;
    circle.style.width = circle.style.height = `${diameter}px`;
    
    // Position the ripple
    const rect = button.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left - diameter / 2;
    const y = touch.clientY - rect.top - diameter / 2;
    
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    
    // Remove ripple after animation
    setTimeout(() => {
      if (circle && circle.parentNode) {
        circle.parentNode.removeChild(circle);
      }
    }, 500);
  }
}

/**
 * Adds spring-back effect to buttons
 */
function setupSpringButtons() {
  // Find elements for spring effect
  const springButtons = document.querySelectorAll(
    '.steve-cta-button, ' +
    '.contact-button, ' +
    '.demo-button'
  );
  
  springButtons.forEach(button => {
    button.classList.add('spring-button');
    
    button.addEventListener('touchstart', () => {
      button.classList.remove('released');
    }, { passive: true });
    
    button.addEventListener('touchend', () => {
      button.classList.add('released');
    }, { passive: true });
    
    button.addEventListener('touchcancel', () => {
      button.classList.add('released');
    }, { passive: true });
  });
}

/**
 * Creates a magnetic pull effect on important elements
 */
function setupMagneticEffects() {
  // Find primary CTA buttons
  const magneticElements = document.querySelectorAll('.steve-cta-button, .contact-button');
  
  magneticElements.forEach(element => {
    element.classList.add('magnetic-effect');
    
    // Create magnetic area around the element
    element.addEventListener('touchmove', function(e) {
      const touch = e.touches[0];
      const rect = element.getBoundingClientRect();
      
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      
      const touchX = touch.clientX;
      const touchY = touch.clientY;
      
      // Calculate distance from center
      const distanceX = touchX - buttonCenterX;
      const distanceY = touchY - buttonCenterY;
      
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Define the magnetic area
      const magneticArea = 70;
      
      // If within the magnetic area, apply pull effect
      if (distance < magneticArea) {
        // Calculate pull strength (stronger when closer)
        const pullStrength = 1 - (distance / magneticArea);
        
        // Maximum pull distance
        const maxPull = 10;
        
        // Calculate pull offset
        const pullX = distanceX * pullStrength * maxPull / magneticArea;
        const pullY = distanceY * pullStrength * maxPull / magneticArea;
        
        // Apply transformation
        element.style.transform = `translate(${pullX}px, ${pullY}px)`;
      } else {
        // Reset position if outside magnetic area
        element.style.transform = 'translate(0, 0)';
      }
    }, { passive: true });
    
    // Reset position when touch ends
    element.addEventListener('touchend', function() {
      element.style.transform = 'translate(0, 0)';
    }, { passive: true });
    
    element.addEventListener('touchcancel', function() {
      element.style.transform = 'translate(0, 0)';
    }, { passive: true });
  });
}

/**
 * Enhances form elements for better touch experience
 */
function enhanceFormElements() {
  // Enhance input fields
  const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
  inputs.forEach(input => {
    input.classList.add('touch-input');
  });
  
  // Enhance select fields
  const selects = document.querySelectorAll('select');
  selects.forEach(select => {
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'touch-select';
    
    // Insert wrapper before select
    select.parentNode.insertBefore(wrapper, select);
    
    // Move select into wrapper
    wrapper.appendChild(select);
  });
  
  // Find checkboxes and radio buttons
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const radios = document.querySelectorAll('input[type="radio"]');
  
  checkboxes.forEach(checkbox => {
    if (checkbox.closest('.touch-checkbox')) return;
    
    // Get existing label or create one
    let label = checkbox.closest('label');
    if (!label) {
      const id = checkbox.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
      checkbox.id = id;
      
      label = document.createElement('label');
      label.setAttribute('for', id);
      checkbox.parentNode.insertBefore(label, checkbox.nextSibling);
      label.appendChild(checkbox);
    }
    
    // Add touch-checkbox class
    label.classList.add('touch-checkbox');
    
    // Create the mark
    const mark = document.createElement('span');
    mark.className = 'touch-checkbox-mark';
    label.appendChild(mark);
  });
  
  radios.forEach(radio => {
    if (radio.closest('.touch-radio')) return;
    
    // Get existing label or create one
    let label = radio.closest('label');
    if (!label) {
      const id = radio.id || `radio-${Math.random().toString(36).substring(2, 9)}`;
      radio.id = id;
      
      label = document.createElement('label');
      label.setAttribute('for', id);
      radio.parentNode.insertBefore(label, radio.nextSibling);
      label.appendChild(radio);
    }
    
    // Add touch-radio class
    label.classList.add('touch-radio');
    
    // Create the mark
    const mark = document.createElement('span');
    mark.className = 'touch-radio-mark';
    label.appendChild(mark);
  });
}

/**
 * Sets up touch gestures for navigation and page interaction
 */
function setupTouchGestures() {
  // Add touch feedback to all elements with event listeners
  const addTouchFeedback = element => {
    if (element && element.addEventListener && typeof element.addEventListener === 'function') {
      const originalAddEventListener = element.addEventListener;
      
      element.addEventListener = function(type, listener, options) {
        if (type === 'click' || type === 'touchend') {
          // Add subtle touch feedback to clicks
          if (!element.classList.contains('tactile') && 
              !element.classList.contains('ripple') &&
              !element.classList.contains('spring-button')) {
            element.classList.add('subtle-touch');
          }
        }
        
        return originalAddEventListener.call(this, type, listener, options);
      };
    }
  };
  
  // Apply to document and body
  addTouchFeedback(document);
  addTouchFeedback(document.body);
  
  // Set up swipe detection
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;
  
  document.addEventListener('touchstart', function(e) {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  document.addEventListener('touchend', function(e) {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    handleGesture();
  }, { passive: true });
  
  function handleGesture() {
    const distanceX = touchendX - touchstartX;
    const distanceY = touchendY - touchstartY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < 60) return; // Ignore small movements
    
    // Calculate angle to determine gesture direction
    const angle = Math.atan2(distanceY, distanceX) * 180 / Math.PI;
    
    // Create custom event based on direction
    let event;
    if (angle > -45 && angle < 45) {
      event = new CustomEvent('swipe-right');
    } else if (angle > 45 && angle < 135) {
      event = new CustomEvent('swipe-down');
    } else if ((angle > 135 && angle <= 180) || (angle < -135 && angle >= -180)) {
      event = new CustomEvent('swipe-left');
    } else if (angle < -45 && angle > -135) {
      event = new CustomEvent('swipe-up');
    }
    
    if (event) {
      document.dispatchEvent(event);
      
      // Haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }
  }
}
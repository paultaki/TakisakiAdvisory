/**
 * Paul Takisaki Mobile Experience Enhancement
 * Creates beautiful, performant, and emotion-inducing mobile interactions
 */

document.addEventListener("DOMContentLoaded", function() {
  // Only run on mobile devices
  const isMobile = window.innerWidth <= 992;
  if (!isMobile) return;
  
  // Add mobile experience script marker
  document.documentElement.classList.add('mobile-enhanced');
  
  // ===== Core Setup =====
  // Add viewport meta tags if missing
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewportMeta = document.createElement('meta');
    viewportMeta.setAttribute('name', 'viewport');
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    document.head.appendChild(viewportMeta);
  }
  
  // Add iOS safe area support
  const safeAreaStyle = document.createElement('style');
  safeAreaStyle.innerHTML = `
    :root {
      --safe-area-inset-top: env(safe-area-inset-top, 0px);
      --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
      --safe-area-inset-left: env(safe-area-inset-left, 0px);
      --safe-area-inset-right: env(safe-area-inset-right, 0px);
    }
    
    body {
      padding-top: var(--safe-area-inset-top);
      padding-bottom: var(--safe-area-inset-bottom);
    }
    
    .has-bottom-nav {
      padding-bottom: calc(60px + var(--safe-area-inset-bottom));
    }
  `;
  document.head.appendChild(safeAreaStyle);
  
  // Load our mobile optimized stylesheet
  const mobileStylesheet = document.createElement('link');
  mobileStylesheet.rel = 'stylesheet';
  mobileStylesheet.href = 'mobile-master.css';
  document.head.appendChild(mobileStylesheet);
  
  // ===== Enhanced Navigation Experience =====
  // We're leaving this completely disabled to avoid conflicts with header.js
  // Only adding animation delay to nav items for visual enhancement
  
  // Safely try to add animation delay to each navigation item
  setTimeout(() => {
    try {
      const navItems = document.querySelectorAll('.main-nav ul li');
      navItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
      });
    } catch(e) {
      console.log('Could not set animation delay on nav items');
    }
  }, 1000); // Wait for header.js to finish
  
  // ===== Scroll Animations =====
  // Detect elements to animate on scroll
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  
  if (scrollElements.length > 0) {
    // Set initial state
    scrollElements.forEach((el, index) => {
      el.style.setProperty('--item-index', index % 5); // Cycle through 5 animation delays
    });
    
    // Callback for IntersectionObserver
    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <= 
        (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };
    
    const displayScrollElement = (element) => {
      element.classList.add('revealed');
    };
    
    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        }
      });
    };
    
    // Initialize on page load
    setTimeout(handleScrollAnimation, 100);
    
    // Add scroll listener with requestAnimationFrame for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollAnimation();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  // ===== Form Enhancements =====
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Add styling classes to all forms
    form.classList.add('enhanced-form');
    
    // Add subtle animations to form elements
    const formElements = form.querySelectorAll('input, textarea, select, button');
    formElements.forEach((el, index) => {
      el.classList.add('form-element');
      el.style.setProperty('--item-index', index);
    });
    
    // Improve form feedback
    form.addEventListener('submit', function(e) {
      // Don't interfere with form submission logic, just enhance it
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.innerHTML = `
          <span class="loading-spinner" aria-hidden="true"></span>
          <span class="visually-hidden">Sending...</span>
        `;
        submitButton.disabled = true;
        
        // If we have vibration api, give feedback
        if ('vibrate' in navigator) {
          navigator.vibrate([15, 10, 15]); // Success pattern vibration
        }
      }
    });
  });
  
  // ===== Images and Content Handling =====
  // Lazy load and progressive image loading
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    // Add loading lazy to all images that don't have it
    img.setAttribute('loading', 'lazy');
    
    // Add fade-in animation
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    img.onload = function() {
      img.style.opacity = '1';
    };
    
    // If already loaded, make visible
    if (img.complete) {
      img.style.opacity = '1';
    }
  });
  
  // ===== Interactive Components =====
  // Convert static sections into interactive components
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    const content = header.nextElementSibling;
    if (content && content.classList.contains('accordion-content')) {
      header.addEventListener('click', () => {
        // Toggle this accordion
        content.classList.toggle('active');
        header.setAttribute('aria-expanded', 
          content.classList.contains('active')
        );
        
        // Optional: close others
        const siblingAccordions = document.querySelectorAll('.accordion-content.active');
        siblingAccordions.forEach(accordion => {
          if (accordion !== content) {
            accordion.classList.remove('active');
            accordion.previousElementSibling.setAttribute('aria-expanded', 'false');
          }
        });
        
        // Haptic feedback if available
        if ('vibrate' in navigator) {
          navigator.vibrate(5);
        }
      });
    }
  });
  
  // ===== Performance Optimizations =====
  // Debounce function for performance
  const debounce = (func, wait = 20, immediate = true) => {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  
  // Add hardware acceleration to key animations
  const animatedElements = document.querySelectorAll(
    '.animated-underline, .tactile-button, [class*="button"], .card, .scroll-reveal'
  );
  animatedElements.forEach(el => {
    el.classList.add('use-gpu');
  });
  
  // ===== Gesture Support =====
  // Add gesture support for swiping
  let touchstartX = 0;
  let touchendX = 0;
  
  document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});
  
  const handleSwipe = () => {
    const swipeThreshold = 100; // Minimum swipe distance
    
    if (touchendX < touchstartX - swipeThreshold) {
      // Swiped left
      const event = new CustomEvent('swipe-left');
      document.dispatchEvent(event);
    }
    
    if (touchendX > touchstartX + swipeThreshold) {
      // Swiped right
      const event = new CustomEvent('swipe-right');
      document.dispatchEvent(event);
    }
  };
  
  // Close mobile menu on swipe left
  document.addEventListener('swipe-left', () => {
    if (mainNav && mainNav.classList.contains('active')) {
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // ===== Accessibility Enhancements =====
  // Implement focus visible polyfill
  document.documentElement.classList.add('js-focus-visible');
  
  // Add skip to content link if not present
  if (!document.querySelector('.skip-to-content')) {
    const skipLink = document.createElement('a');
    skipLink.classList.add('skip-to-content');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
  
  // Make sure all interactive elements have accessible names
  const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
  buttons.forEach(button => {
    if (!button.textContent.trim()) {
      const buttonType = button.classList.contains('mobile-menu-toggle') ? 'Menu' : 'Button';
      button.setAttribute('aria-label', buttonType);
    }
  });
  
  // ===== Final Touch - Page Transition =====
  // Create a subtle page transition effect
  const pageTransition = document.createElement('div');
  pageTransition.classList.add('page-transition');
  pageTransition.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(pageTransition);
  
  // Listen for page navigation - excluding header.js links which have their own handlers
  document.addEventListener('click', function(e) {
    // Only process links that navigate to a new page
    const link = e.target.closest('a');
    const isMainNav = link && (link.closest('.main-nav') || link.closest('.mobile-menu-toggle'));
    
    // Skip if it's a main navigation link since those are handled by header.js
    if (!isMainNav && link && 
        link.getAttribute('href') && 
        !link.getAttribute('href').startsWith('#') && 
        !link.getAttribute('href').startsWith('javascript:') &&
        link.hostname === window.location.hostname) {
      
      // Start page transition
      e.preventDefault();
      const targetUrl = link.href;
      
      pageTransition.style.opacity = '1';
      
      // Navigate after transition
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 300);
    }
  });
});
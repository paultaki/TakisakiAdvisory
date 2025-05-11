/**
 * Steve-Inspired Microinteractions
 * Subtle animations that create delight and emotional connection
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only run on mobile devices
  const isMobile = window.innerWidth <= 992;
  if (!isMobile) return;
  
  // Add microinteractions marker
  document.documentElement.classList.add('motion-enhanced');
  
  // Add the stylesheet
  const motionStyle = document.createElement('link');
  motionStyle.rel = 'stylesheet';
  motionStyle.href = 'steve-motion.css';
  document.head.appendChild(motionStyle);
  
  // Initialize animations
  initPageTransition();
  initScrollAnimations();
  initProgressIndicator();
  enhanceLinks();
  createParallaxEffects();
  setupCounters();
  initSuccessItems();
  setupForms();
  setupCursorFollowers();
  setupStaggers();
  
  // Trigger page loaded state
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 300);
});

/**
 * Creates subtle page entrance animation
 */
function initPageTransition() {
  // Add reveal class to key elements
  const revealElements = document.querySelectorAll(
    'h1, h2, h3, p, .button, .card, .testimonial-card, .demo-card'
  );
  
  // Set staggered reveal order
  revealElements.forEach((element, index) => {
    if (!element.closest('.stagger-children') && 
        !element.closest('.grid-reveal')) {
      element.classList.add('reveal-item');
      element.style.setProperty('--item-index', index % 10);
    }
  });
}

/**
 * Sets up scroll-triggered animations
 */
function initScrollAnimations() {
  // Find elements to animate on scroll
  const fadeElements = document.querySelectorAll(
    '.subtle-parallax, .image-reveal, .card-hover, .fade-in-section'
  );
  
  if (fadeElements.length > 0) {
    // Set up intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation classes
          if (entry.target.classList.contains('image-reveal')) {
            entry.target.classList.add('revealed');
          } else if (entry.target.classList.contains('fade-in-section')) {
            entry.target.classList.add('visible');
          } else if (entry.target.classList.contains('text-fade-up')) {
            entry.target.classList.add('visible');
          } else if (entry.target.parentElement.classList.contains('grid-reveal')) {
            entry.target.parentElement.classList.add('animate');
          } else if (entry.target.parentElement.classList.contains('stagger-children')) {
            entry.target.parentElement.classList.add('animate');
          }
          
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe all elements
    fadeElements.forEach(element => {
      observer.observe(element);
    });
    
    // Also observe parent containers
    const staggerContainers = document.querySelectorAll(
      '.stagger-children, .grid-reveal'
    );
    
    staggerContainers.forEach(container => {
      observer.observe(container);
    });
  }
}

/**
 * Creates a scroll progress indicator
 */
function initProgressIndicator() {
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-indicator';
  document.body.appendChild(progressBar);
  
  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = scrollPercentage + '%';
  });
}

/**
 * Enhances links with subtle animations
 */
function enhanceLinks() {
  // Add animation class to text links
  const textLinks = document.querySelectorAll('p a, li a, .footer a');
  
  textLinks.forEach(link => {
    if (!link.closest('.steve-nav-menu') && 
        !link.classList.contains('button') && 
        !link.classList.contains('steve-cta-button')) {
      link.classList.add('animated-link');
    }
  });
  
  // Add notification dots to new content
  const newLinks = document.querySelectorAll('a[href*="blogs.html"], a[href*="insights.html"]');
  
  newLinks.forEach(link => {
    if (!link.classList.contains('breathing-dot') && 
        !link.closest('.steve-nav-menu')) {
      link.classList.add('breathing-dot');
    }
  });
}

/**
 * Creates subtle parallax effects on images
 */
function createParallaxEffects() {
  // Find images and hero sections
  const images = document.querySelectorAll(
    '.card img, .testimonial-card img, section > img'
  );
  
  images.forEach(image => {
    // Skip images that already have animation classes
    if (image.closest('.image-reveal') || image.closest('.subtle-parallax')) {
      return;
    }
    
    // Wrap image in parallax container
    const parent = image.parentNode;
    const wrapper = document.createElement('div');
    wrapper.className = 'subtle-parallax';
    
    parent.insertBefore(wrapper, image);
    wrapper.appendChild(image);
  });
}

/**
 * Sets up number counters with animation
 */
function setupCounters() {
  // Look for numbers that should animate
  const numberElements = document.querySelectorAll(
    '.stats-number, .percentage, [data-count]'
  );
  
  if (numberElements.length > 0) {
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
    
    // Prepare each counter
    numberElements.forEach(element => {
      // Wrap numbers in span for animation
      const text = element.textContent;
      const hasPercent = text.includes('%');
      
      // Extract numeric value
      let numValue = parseInt(text.replace(/[^0-9]/g, ''));
      if (isNaN(numValue)) numValue = 0;
      
      // Set data attribute for target value
      element.setAttribute('data-target', numValue);
      element.textContent = '0' + (hasPercent ? '%' : '');
      element.classList.add('count-up');
      
      // Observe element
      observer.observe(element);
    });
  }
  
  // Counter animation function
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const hasPercent = element.textContent.includes('%');
    const duration = 1500; // ms
    const frameRate = 30;
    const framesTotal = duration / (1000 / frameRate);
    
    let current = 0;
    const increment = target / framesTotal;
    
    const counter = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        element.textContent = target + (hasPercent ? '%' : '');
        element.classList.add('animate');
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(current) + (hasPercent ? '%' : '');
      }
    }, 1000 / frameRate);
  }
}

/**
 * Initializes success checkpoints
 */
function initSuccessItems() {
  // Look for list items that should show completion
  const listItems = document.querySelectorAll(
    'li[data-complete="true"], .feature-list li, .benefits-list li'
  );
  
  listItems.forEach((item, index) => {
    item.classList.add('success-checkpoint');
    
    // Create staggered animation of checkmarks
    setTimeout(() => {
      item.classList.add('completed');
      
      // Haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(5);
      }
    }, 500 + (index * 300));
  });
}

/**
 * Enhances form interactions
 */
function setupForms() {
  // Form fields
  const formFields = document.querySelectorAll('input, textarea, select');
  
  formFields.forEach(field => {
    // Skip fields that are part of other components
    if (field.closest('.touch-radio') || field.closest('.touch-checkbox')) {
      return;
    }
    
    // Add success animation
    field.classList.add('input-success');
    
    // Validate on change/input
    field.addEventListener('change', validateField);
    field.addEventListener('input', validateField);
    
    function validateField() {
      // Very basic validation
      if (field.value.trim() !== '') {
        field.classList.add('valid');
        
        // Add focus highlight animation
        field.parentNode.classList.add('focus-highlight');
        field.parentNode.classList.add('highlighted');
        
        // Remove highlight after animation
        setTimeout(() => {
          field.parentNode.classList.remove('highlighted');
        }, 1500);
      } else {
        field.classList.remove('valid');
      }
    }
  });
  
  // Form submission
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Don't interfere with actual form submission
      
      // Add success animation to submit button
      const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitButton) {
        submitButton.classList.add('hover-glow');
        
        // Haptic success pattern
        if ('vibrate' in navigator) {
          navigator.vibrate([15, 10, 15]);
        }
      }
    });
  });
}

/**
 * Creates subtle cursor/touch follower effects
 */
function setupCursorFollowers() {
  // Find special buttons that should have magnetic effect
  const magneticElements = document.querySelectorAll(
    '.steve-cta-button, button[type="submit"], .contact-button'
  );
  
  magneticElements.forEach(element => {
    element.classList.add('magnetic');
    element.classList.add('hover-glow');
  });
}

/**
 * Sets up staggered animation groups
 */
function setupStaggers() {
  // Find groups of items that should animate together
  const cardGroups = document.querySelectorAll(
    '.card-grid, .testimonial-grid, .features-grid'
  );
  
  cardGroups.forEach(group => {
    if (!group.classList.contains('grid-reveal') && 
        !group.classList.contains('stagger-children')) {
      group.classList.add('grid-reveal');
    }
  });
  
  // Find list groups
  const lists = document.querySelectorAll('ul:not(.steve-nav-menu)');
  
  lists.forEach(list => {
    if (list.children.length >= 3 && 
        !list.classList.contains('stagger-children') &&
        !list.closest('.stagger-children')) {
      list.classList.add('stagger-children');
    }
  });
  
  // Add text fade up animation to paragraphs
  const paragraphs = document.querySelectorAll('section p');
  
  paragraphs.forEach(paragraph => {
    if (!paragraph.closest('.stagger-children') && 
        !paragraph.closest('.grid-reveal') &&
        !paragraph.classList.contains('reveal-item')) {
      paragraph.classList.add('text-fade-up');
    }
  });
}
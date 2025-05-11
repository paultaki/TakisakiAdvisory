/**
 * Steve-Inspired Mobile Navigation
 * Focuses on minimalist design with emotional microinteractions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only run on mobile devices
  const isMobile = window.innerWidth <= 992;
  if (!isMobile) return;
  
  // Add navigation marker
  document.documentElement.classList.add('steve-nav-enabled');
  
  // Create navigation elements
  initNavigation();
  
  // Handle navigation interactions
  setupNavigation();
  
  // Add touch feedback to all buttons and links
  enhanceTouchInteractions();
  
  // Handle page transitions
  setupPageTransitions();
});

/**
 * Creates the navigation structure
 */
function initNavigation() {
  // Create the header
  const header = document.createElement('header');
  header.className = 'steve-header';
  
  const headerInner = document.createElement('div');
  headerInner.className = 'steve-header-inner';
  
  // Create logo
  const logo = document.createElement('a');
  logo.className = 'steve-logo';
  logo.href = 'index.html';
  logo.setAttribute('aria-label', 'Paul Takisaki');
  
  const logoImg = document.createElement('img');
  logoImg.src = 'images/ptlogo.webp';
  logoImg.alt = 'PAUL TAKISAKI';
  logoImg.width = 'auto';
  logoImg.height = '32';
  
  logo.appendChild(logoImg);
  
  // Create menu button
  const menuButton = document.createElement('button');
  menuButton.className = 'steve-menu-button';
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Toggle navigation menu');
  menuButton.setAttribute('aria-controls', 'steve-nav-overlay');
  
  // Add hamburger lines
  for (let i = 0; i < 3; i++) {
    const line = document.createElement('span');
    line.className = 'steve-menu-line';
    line.setAttribute('aria-hidden', 'true');
    menuButton.appendChild(line);
  }
  
  // Add logo and menu button to header inner
  headerInner.appendChild(logo);
  headerInner.appendChild(menuButton);
  
  // Add header inner to header
  header.appendChild(headerInner);
  
  // Create navigation overlay
  const navOverlay = document.createElement('div');
  navOverlay.className = 'steve-nav-overlay';
  navOverlay.id = 'steve-nav-overlay';
  
  // Create navigation menu
  const navMenu = document.createElement('ul');
  navMenu.className = 'steve-nav-menu';
  
  // Menu items
  const menuItems = [
    { href: 'index.html', text: 'Home' },
    { href: 'playbook.html', text: 'Leadership Vault' },
    { href: 'services.html', text: 'Services' },
    { href: 'impact.html', text: 'Impact' },
    { href: 'blogs.html', text: 'Insights', notification: true },
    { href: 'about.html', text: 'About' }
  ];
  
  // Add menu items
  menuItems.forEach((item, index) => {
    const navItem = document.createElement('li');
    navItem.className = 'steve-nav-item';
    navItem.style.setProperty('--item-index', index);
    
    const link = document.createElement('a');
    link.className = 'steve-nav-link';
    link.href = item.href;
    link.textContent = item.text;
    
    // Check if current page
    if (window.location.pathname.includes(item.href)) {
      link.classList.add('active');
    }
    
    // Add notification if needed
    if (item.notification) {
      link.classList.add('notification-dot');
    }
    
    navItem.appendChild(link);
    navMenu.appendChild(navItem);
  });
  
  // Add menu to overlay
  navOverlay.appendChild(navMenu);
  
  // Create CTA button
  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'steve-nav-cta';
  
  const ctaButton = document.createElement('a');
  ctaButton.className = 'steve-cta-button';
  ctaButton.href = 'contact.html';
  ctaButton.textContent = "Let's Talk";
  
  ctaContainer.appendChild(ctaButton);
  navOverlay.appendChild(ctaContainer);
  
  // Create page transition overlay
  const pageTransition = document.createElement('div');
  pageTransition.className = 'steve-page-transition';
  
  // Add all elements to body
  document.body.insertBefore(header, document.body.firstChild);
  document.body.appendChild(navOverlay);
  document.body.appendChild(pageTransition);
  
  // Add the stylesheet
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = 'steve-nav.css';
  document.head.appendChild(styleLink);
}

/**
 * Sets up navigation interaction handlers
 */
function setupNavigation() {
  const menuButton = document.querySelector('.steve-menu-button');
  const navOverlay = document.querySelector('.steve-nav-overlay');
  const navLinks = document.querySelectorAll('.steve-nav-link');
  
  // Toggle navigation
  menuButton.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    
    this.setAttribute('aria-expanded', !expanded);
    
    if (!expanded) {
      navOverlay.classList.add('active');
      document.body.classList.add('steve-nav-active');
      
      // Haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(5);
      }
    } else {
      navOverlay.classList.remove('active');
      document.body.classList.remove('steve-nav-active');
    }
  });
  
  // Close navigation when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't close if it's a hash link
      if (this.getAttribute('href').startsWith('#')) return;
      
      // Otherwise prevent default and handle navigation
      e.preventDefault();
      
      const targetUrl = this.href;
      const pageTransition = document.querySelector('.steve-page-transition');
      
      // Close navigation
      navOverlay.classList.remove('active');
      document.body.classList.remove('steve-nav-active');
      menuButton.setAttribute('aria-expanded', 'false');
      
      // Start page transition
      pageTransition.classList.add('active');
      
      // Haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate([5, 10, 5]);
      }
      
      // Navigate after transition
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500);
    });
  });
  
  // Handle scroll for compact header
  let lastScrollTop = 0;
  const header = document.querySelector('.steve-header');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Handle swipe to close navigation
  let touchstartX = 0;
  
  navOverlay.addEventListener('touchstart', function(e) {
    touchstartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  navOverlay.addEventListener('touchend', function(e) {
    const touchendX = e.changedTouches[0].screenX;
    const diff = touchendX - touchstartX;
    
    // Swipe right to close
    if (diff > 70) {
      navOverlay.classList.remove('active');
      document.body.classList.remove('steve-nav-active');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  }, { passive: true });
}

/**
 * Enhances all interactive elements with touch feedback
 */
function enhanceTouchInteractions() {
  // Find all interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, [role="button"], input[type="submit"], input[type="button"]'
  );
  
  interactiveElements.forEach(element => {
    // Skip elements in the nav
    if (element.closest('.steve-nav-overlay') || 
        element.closest('.steve-header')) {
      return;
    }
    
    element.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
      this.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      // Haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(2);
      }
    }, { passive: true });
    
    element.addEventListener('touchend', function() {
      this.style.transform = 'scale(1)';
    }, { passive: true });
    
    element.addEventListener('touchcancel', function() {
      this.style.transform = 'scale(1)';
    }, { passive: true });
  });
}

/**
 * Sets up smooth page transitions
 */
function setupPageTransitions() {
  // Handle page loads
  window.addEventListener('load', function() {
    const pageTransition = document.querySelector('.steve-page-transition');
    
    // Fade in from previous page
    if (pageTransition) {
      pageTransition.classList.add('active');
      
      setTimeout(() => {
        pageTransition.classList.remove('active');
      }, 300);
    }
  });
  
  // Set up for non-navigation links
  const links = document.querySelectorAll('a:not(.steve-nav-link):not(.steve-logo):not(.steve-cta-button)');
  
  links.forEach(link => {
    // Only for internal links
    if (link.hostname === window.location.hostname && 
        !link.getAttribute('href').startsWith('#') &&
        !link.getAttribute('href').startsWith('javascript:')) {
      
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetUrl = this.href;
        const pageTransition = document.querySelector('.steve-page-transition');
        
        // Start page transition
        pageTransition.classList.add('active');
        
        // Haptic feedback if available
        if ('vibrate' in navigator) {
          navigator.vibrate([3, 10, 3]);
        }
        
        // Navigate after transition
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 500);
      });
    }
  });
}
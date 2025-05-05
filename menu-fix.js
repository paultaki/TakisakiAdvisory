/**
 * Mobile Menu Fix
 * A standalone script to fix mobile menu issues
 */

(function() {
  console.log("Menu fix loading...");
  
  // Run after a slight delay to ensure DOM is loaded
  setTimeout(function() {
    // Get menu elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // If elements don't exist, try again later
    if (!mobileMenuToggle || !mainNav) {
      console.log("Menu elements not found, retrying in 500ms...");
      setTimeout(arguments.callee, 500);
      return;
    }
    
    console.log("Menu elements found, fixing menu...");
    
    // Force important styles
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      .mobile-menu-toggle {
        cursor: pointer !important;
        z-index: 1001 !important;
      }
      
      @media (max-width: 1024px) {
        .main-nav {
          display: none !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100vh !important;
          z-index: 1000 !important;
        }
        
        .main-nav.active {
          display: flex !important;
        }
      }
    `;
    document.head.appendChild(styleEl);
    
    // Create a fresh click handler by cloning the button
    const newButton = mobileMenuToggle.cloneNode(true);
    mobileMenuToggle.parentNode.replaceChild(newButton, mobileMenuToggle);
    
    // Add click handler with debugging
    newButton.addEventListener('click', function(e) {
      console.log("Mobile menu button clicked");
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle expanded state
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      
      // Toggle active class
      if (expanded) {
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
        console.log("Menu closed");
      } else {
        mainNav.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        console.log("Menu opened");
      }
    });
    
    // Close menu when clicking links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        console.log("Menu link clicked, closing menu");
        newButton.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    console.log("Menu fix applied successfully");
  }, 300);
})();
document.addEventListener("DOMContentLoaded", function () {
  // Insert the header HTML with initially hidden dropdowns
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header>
        <div class="header-inner">
          <a class="logo" href="index.html" title="Paul Takisaki - Leadership for Misfits">Paul<span>Takisaki</span></a>
          <button id="mobile-toggle" class="mobile-toggle" aria-label="Toggle navigation menu">☰</button>
          <nav aria-label="Main Navigation">
            <ul class="nav-links">
              <li><a href="index.html" title="Home">HOME</a></li>
              <li class="has-dropdown">
                <a href="services.html" title="Services" class="dropdown-toggle">SERVICES</a>
                <ul class="dropdown-menu">
                  <li><a href="executive_coaching.html" title="Executive Coaching">EXECUTIVE COACHING</a></li>
                  <li><a href="leader_development.html" title="Leadership Development">LEADERSHIP DEVELOPMENT</a></li>
                  <li><a href="strategic_consulting.html" title="Strategic Consulting">STRATEGIC CONSULTING</a></li>
                </ul>
              </li>
              <li><a href="index.html#about" title="About Paul Takisaki">ABOUT</a></li>
              <li><a href="stories.html" title="Success Stories">SUCCESS STORIES</a></li>
              <li><a href="blogs.html" title="Insights">INSIGHTS</a></li>
              <li><a href="#contact" title="Contact Paul Takisaki">CONTACT</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
    
    // Add necessary CSS for dropdown functionality directly in the header.js
    const dropdownStyles = document.createElement('style');
    dropdownStyles.textContent = `
      /* Dropdown Menu Styles */
      .nav-links .has-dropdown {
        position: relative;
      }
      .nav-links .dropdown-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: rgba(0, 0, 0, 0.95);
        min-width: 200px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        z-index: 1000;
        padding: 0;
      }
      .nav-links .dropdown-menu li {
        margin: 0;
        display: block;
      }
      .nav-links .dropdown-menu a {
        padding: 15px 20px;
        display: block;
        text-align: left;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .nav-links .dropdown-menu a:hover {
        background-color: rgba(0, 229, 255, 0.1);
      }
      /* Active dropdown state */
      .nav-links .has-dropdown:hover .dropdown-menu,
      .nav-links .dropdown-menu.show {
        display: block;
      }
      /* Mobile styles for dropdowns */
      @media (max-width: 767px) {
        .nav-links {
          flex-direction: column;
        }
        .nav-links .dropdown-menu {
          position: static;
          width: 100%;
          box-shadow: none;
          padding-left: 20px;
          background-color: rgba(0, 0, 0, 0.2); /* Slightly lighter background to distinguish dropdown items */
        }
        .nav-links .has-dropdown:hover .dropdown-menu {
          display: none; /* Prevent hover from opening dropdown on mobile */
        }
        .nav-links .dropdown-menu.show {
          display: block;
        }
      }
    `;
    document.head.appendChild(dropdownStyles);
  }

  // Setup mobile toggle functionality
  const toggle = document.getElementById("mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  
  if (toggle && navLinks) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent event from bubbling up
      navLinks.classList.toggle("active");
    });
  }

  // Setup dropdown functionality - improved for mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // Always prevent default on the dropdown toggle
      e.preventDefault();
      e.stopPropagation(); // Prevent event from bubbling up
      
      // Toggle the dropdown menu
      const dropdownMenu = this.parentElement.querySelector('.dropdown-menu');
      dropdownMenu.classList.toggle('show');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    // Close all dropdown menus
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      if (menu.classList.contains('show')) {
        menu.classList.remove('show');
      }
    });
    
    // Close the mobile menu
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
  
  // Prevent clicks inside the navigation from closing it
  const navElement = document.querySelector('nav');
  if (navElement) {
    navElement.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // Add structured data for SEO
  const structuredData = document.createElement('script');
  structuredData.type = 'application/ld+json';
  structuredData.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Paul Takisaki Leadership",
    "description": "Executive coaching, leadership development, and strategic consulting for innovative leaders and teams.",
    "url": window.location.origin,
    "logo": window.location.origin + "/images/logo.png",
    "sameAs": [
      "https://www.linkedin.com/in/paultaki"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gilbert",
      "addressRegion": "AZ",
      "addressCountry": "US"
    },
    "priceRange": "$$"
  });
  document.head.appendChild(structuredData);
  
  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('.nav-links > li > a');
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
    }
  });
});
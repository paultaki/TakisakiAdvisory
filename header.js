document.addEventListener("DOMContentLoaded", function () {
  // Inject CSS fix for mobile navigation
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    @media (max-width: 1024px) {
      .main-nav {
        display: none !important;
      }
      
      .main-nav.active {
        display: flex !important;
      }
      
      .mobile-menu-toggle[aria-expanded="true"] ~ .main-nav {
        display: flex !important;
      }
    }
  `;
  document.head.appendChild(styleEl);
  // Create header content
  const headerContainer = document.getElementById("header-container");

  if (headerContainer) {
    // Get current page path
    const currentPage = window.location.pathname;
    const pageName = currentPage.split("/").pop() || "index.html";

    // Header HTML - using proper path references and improved structure
    const headerHTML = `
      <header class="site-header">
        <div class="container">
          <div class="logo">
            <a href="index.html" aria-label="Paul Takisaki Logo">
              <img src="images/ptlogo.webp" alt="PAUL TAKISAKI" class="logo-image" height="44" width="auto">
            </a>
          </div>
          
          <button class="mobile-menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Toggle navigation menu">
            <span class="hamburger-line" aria-hidden="true"></span>
            <span class="hamburger-line" aria-hidden="true"></span>
            <span class="hamburger-line" aria-hidden="true"></span>
          </button>
          
          <nav class="main-nav" aria-label="Main navigation">
            <ul>
              <li><a href="index.html" class="${
                pageName === "index.html" || currentPage === "/" ? "active" : ""
              }">Home</a></li>
              <li><a href="playbook.html" class="${
                pageName === "playbook.html" ? "active" : ""
              }">Leadership Vault</a></li>
              <li><a href="services.html" class="${
                pageName === "services.html" ? "active" : ""
              }">Services</a></li>
              <li><a href="impact.html" class="${
                pageName === "impact.html" ? "active" : ""
              }">Impact</a></li>
              <li><a href="blogs.html" class="${
                pageName === "blogs.html" ? "active" : ""
              }">Insights</a></li>
              <li><a href="about.html" class="${
                pageName === "about.html" ? "active" : ""
              }">About</a></li>
            </ul>
            
            <div class="nav-cta">
              <a href="contact.html" class="contact-button ${
                pageName === "contact.html" ? "active" : ""
              }">Let's Talk</a>
            </div>
          </nav>
        </div>
      </header>
    `;

    // Insert the header
    headerContainer.innerHTML = headerHTML;

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (mobileMenuToggle && mainNav) {
      // Reset the mobile nav state on page load
      mainNav.classList.remove("active"); 
      if (mobileMenuToggle.hasAttribute("aria-expanded")) {
        mobileMenuToggle.setAttribute("aria-expanded", "false");
      }
      
      mobileMenuToggle.addEventListener("click", function () {
        const expanded = this.getAttribute("aria-expanded") === "true" || false;
        this.setAttribute("aria-expanded", !expanded);
        mainNav.classList.toggle("active");
      });

      // Close mobile menu when clicking outside
      document.addEventListener("click", function (event) {
        if (
          !mainNav.contains(event.target) &&
          !mobileMenuToggle.contains(event.target) &&
          mainNav.classList.contains("active")
        ) {
          mobileMenuToggle.setAttribute("aria-expanded", "false");
          mainNav.classList.remove("active");
        }
      });
    }

    // Add scroll effect for header
    window.addEventListener("scroll", function () {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
    });

    // Handle window resize - reset mobile menu states
    window.addEventListener("resize", function () {
      if (window.innerWidth > 992) {
        // Switch to desktop behavior
        if (mainNav && mainNav.classList.contains("active")) {
          mainNav.classList.remove("active");
          if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute("aria-expanded", "false");
          }
        }
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });

        // Close mobile menu if open
        const mainNav = document.getElementById("main-nav");
        const mobileMenuToggle = document.getElementById("mobile-menu");

        if (mainNav && mainNav.classList.contains("active")) {
          mainNav.classList.remove("active");
          if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove("active");
          }
        }
      }
    });
  });

  // Page loader functionality (if applicable)
  const loader = document.querySelector(".page-loader");
  if (loader) {
    // Hide loader after page loads - reduced timing for better responsiveness
    setTimeout(function () {
      loader.classList.add("loaded");
      setTimeout(function () {
        loader.style.display = "none";
      }, 300);
    }, 500);

    // Safety timeout (reduced from 5 seconds to 3 seconds)
    setTimeout(function () {
      if (!loader.classList.contains("loaded")) {
        loader.classList.add("loaded");
        setTimeout(function () {
          loader.style.display = "none";
        }, 300);
      }
    }, 3000);
  }
});

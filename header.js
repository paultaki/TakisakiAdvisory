document.addEventListener("DOMContentLoaded", function () {
  // Insert the header HTML
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
  }

  // Ensure menu styles are properly applied
  if (!document.getElementById("header-styles")) {
    const styleElement = document.createElement("style");
    styleElement.id = "header-styles";
    styleElement.textContent = `
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
        list-style: none;
      }
      .nav-links .dropdown-menu li {
        margin: 0;
        padding: 0;
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
      /* Desktop hover behavior */
      @media (min-width: 768px) {
        .nav-links .has-dropdown:hover .dropdown-menu {
          display: block;
        }
      }
      /* Mobile styles for dropdowns */
      @media (max-width: 767px) {
        .nav-links .dropdown-menu {
          position: static;
          width: 100%;
          box-shadow: none;
          padding-left: 20px;
          background-color: rgba(0, 0, 0, 0.3);
        }
        .dropdown-menu.show {
          display: block !important;
        }
      }
    `;
    document.head.appendChild(styleElement);
  }

  // Configure mobile menu toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileToggle && navLinks) {
    // Remove any existing event listeners to prevent duplicates
    const newMobileToggle = mobileToggle.cloneNode(true);
    mobileToggle.parentNode.replaceChild(newMobileToggle, mobileToggle);

    // Add fresh event listener
    newMobileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navLinks.classList.toggle("active");
    });
  }

  // Configure dropdown toggles
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  dropdownToggles.forEach((toggle) => {
    // Remove any existing event listeners
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);

    // Add fresh event listener
    newToggle.addEventListener("click", function (e) {
      // Always prevent default to stop navigation
      e.preventDefault();
      e.stopPropagation();

      // Find the dropdown menu
      const dropdownMenu = this.nextElementSibling;

      // Toggle the show class
      if (dropdownMenu) {
        // Close any other open dropdowns first
        document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
          if (menu !== dropdownMenu) {
            menu.classList.remove("show");
          }
        });

        // Toggle this dropdown
        dropdownMenu.classList.toggle("show");
      }
    });
  });

  // Close menus when clicking outside
  document.addEventListener("click", function (e) {
    // Don't close if we're clicking inside the menu
    if (e.target.closest(".nav-links")) {
      return;
    }

    // Close all dropdowns
    document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
      menu.classList.remove("show");
    });

    // Close mobile menu
    if (navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });

  // Highlight current page in navigation
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navItems = document.querySelectorAll(".nav-links > li > a");
  navItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (
      href === currentPage ||
      (href === "index.html" &&
        (currentPage === "" || currentPage === "index.html"))
    ) {
      item.classList.add("active");
    }
  });
});

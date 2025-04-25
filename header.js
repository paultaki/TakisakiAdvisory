document.addEventListener("DOMContentLoaded", function () {
  // Determine if we're in a subfolder
  const pathParts = window.location.pathname.split("/");
  const inSubfolder =
    pathParts.length > 2 && pathParts[pathParts.length - 2] !== "";

  // Set the base path prefix depending on whether we're in a subfolder
  const basePath = inSubfolder ? "../" : "";

  // Insert the header HTML
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header>
        <div class="header-inner">
          <a class="logo" href="${basePath}index.html" title="Paul Takisaki - Leadership for Misfits">Paul<span>Takisaki</span></a>
          <button id="mobile-toggle" class="mobile-toggle" aria-label="Toggle navigation menu">☰</button>
          <nav aria-label="Main Navigation">
            <ul class="nav-links">
              <li><a href="${basePath}index.html" title="Home">HOME</a></li>
              <li class="has-dropdown">
                <a href="#" title="Services" class="dropdown-toggle">SERVICES</a>
                <ul class="dropdown-menu">
                  <li><a href="${basePath}executive_coaching.html" title="Executive Coaching">EXECUTIVE COACHING</a></li>
                  <li><a href="${basePath}leader_development.html" title="Leadership Development">LEADERSHIP DEVELOPMENT</a></li>
                  <li><a href="${basePath}strategic_consulting.html" title="Strategic Consulting">STRATEGIC CONSULTING</a></li>
                </ul>
              </li>
              <li><a href="${basePath}playbook.html" title="Leadership Vault">Leadership Vault</a></li>
              <li><a href="${basePath}index.html#about" title="About Paul Takisaki">ABOUT</a></li>
              <li><a href="${basePath}stories.html" title="Success Stories">SUCCESS STORIES</a></li>
              <li><a href="${basePath}blogs.html" title="Insights">INSIGHTS</a></li>
              <li><a href="${basePath}contact.html" title="Contact Paul Takisaki">CONTACT</a></li>
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
    // Skip dropdown toggles
    if (item.classList.contains("dropdown-toggle")) {
      return;
    }

    const href = item.getAttribute("href");
    // Extract page name from href (remove path and hash)
    const hrefPage = href.split("/").pop().split("#")[0];

    // Check for various matching conditions
    if (
      // Exact match
      hrefPage === currentPage ||
      // Index page variations
      (hrefPage === "index.html" &&
        (currentPage === "" || currentPage === "index.html")) ||
      // Blog pages match the blogs.html link
      (currentPage.startsWith("blog-") && hrefPage === "blogs.html") ||
      // For pages with hash, check if the base URL matches
      (href.includes("#") && hrefPage === currentPage)
    ) {
      item.classList.add("active");
      // Also mark parent dropdown as active if this is a dropdown item
      const parentLi = item.closest("li.has-dropdown");
      if (parentLi) {
        const parentLink = parentLi.querySelector("a.dropdown-toggle");
        if (parentLink) {
          parentLink.classList.add("active");
        }
      }
    }
  });
});

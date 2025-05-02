document.addEventListener("DOMContentLoaded", function () {
  // Create header content
  const headerContainer = document.getElementById("header-container");

  if (headerContainer) {
    // Get current page path
    const currentPage = window.location.pathname;
    const pageName = currentPage.split("/").pop() || "index.html";

    // Header HTML - using proper path references and improved structure
    const headerHTML = `
      <header>
        <div class="container">
          <div class="logo">
            <a href="index.html">
              <img src="images/ptlogo.webp" alt="PAUL TAKISAKI" class="logo-image">
            </a>
          </div>
          
          <div class="menu-toggle" id="mobile-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <nav class="main-nav" id="main-nav">
            <ul>
              <li><a href="index.html" class="${
                pageName === "index.html" || currentPage === "/" ? "active" : ""
              }">Home</a></li>
              <li><a href="playbook.html" class="${
                pageName === "playbook.html" ? "active" : ""
              }">Leadership Vault</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle ${
                  pageName.includes("services") ||
                  currentPage.includes("/services/")
                    ? "active"
                    : ""
                }">Services</a>
                <div class="dropdown-menu">
                  <a href="services/exec.html">Executive Development</a>
                  <a href="services/exec_dev.html">Accelerator</a>
                  <a href="services/strategy.html">Strategic Consulting</a>
                </div>
              </li>
              <li><a href="impact.html" class="${
                pageName === "impact.html" ? "active" : ""
              }">Impact</a></li>
              <li><a href="blogs.html" class="${
                pageName === "blogs.html" ? "active" : ""
              }">Blog</a></li>
              <li><a href="about.html" class="${
                pageName === "about.html" ? "active" : ""
              }">About</a></li>
              <li><a href="contact.html" class="nav-button ${
                pageName === "contact.html" ? "active" : ""
              }">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;

    // Insert the header
    headerContainer.innerHTML = headerHTML;

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById("mobile-menu");
    const mainNav = document.getElementById("main-nav");

    if (mobileMenuToggle && mainNav) {
      mobileMenuToggle.addEventListener("click", function () {
        this.classList.toggle("active");
        mainNav.classList.toggle("active");
      });

      // Close mobile menu when clicking outside
      document.addEventListener("click", function (event) {
        if (
          !mainNav.contains(event.target) &&
          !mobileMenuToggle.contains(event.target)
        ) {
          mobileMenuToggle.classList.remove("active");
          mainNav.classList.remove("active");

          // Also close any open dropdowns
          document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
            dropdown.classList.remove("open");
          });
        }
      });

      // Dropdown functionality
      const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

      dropdownToggles.forEach((toggle) => {
        const dropdown = toggle.parentElement;

        // Desktop hover behavior
        if (window.innerWidth > 992) {
          dropdown.addEventListener("mouseenter", function () {
            this.classList.add("hover");
          });

          dropdown.addEventListener("mouseleave", function () {
            this.classList.remove("hover");
          });
        }

        // Click behavior (especially for mobile)
        toggle.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          // Close all other open dropdowns first
          document.querySelectorAll(".dropdown.open").forEach((item) => {
            if (item !== dropdown) {
              item.classList.remove("open");
            }
          });

          // Toggle this dropdown
          dropdown.classList.toggle("open");
        });
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
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
          dropdown.classList.remove("open");
        });

        if (mainNav && mainNav.classList.contains("active")) {
          mainNav.classList.remove("active");
          if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove("active");
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
    // Hide loader after page loads
    setTimeout(function () {
      loader.classList.add("loaded");
      setTimeout(function () {
        loader.style.display = "none";
      }, 500);
    }, 800);

    // Safety timeout (max 5 seconds)
    setTimeout(function () {
      if (!loader.classList.contains("loaded")) {
        loader.classList.add("loaded");
        setTimeout(function () {
          loader.style.display = "none";
        }, 500);
      }
    }, 5000);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Page loader - hide after page loads
  const loader = document.querySelector(".page-loader");
  if (loader) {
    setTimeout(function () {
      loader.classList.add("loaded");
      setTimeout(function () {
        loader.style.display = "none";
      }, 500);
    }, 300);
  }

  // Always hide loader after maximum 5 seconds regardless of page load status
  setTimeout(function () {
    const loader = document.querySelector(".page-loader");
    if (loader) {
      loader.classList.add("loaded");
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  }, 5000);

  // Floating Action Button functionality
  const fabButton = document.querySelector(".fab-button");
  if (fabButton) {
    fabButton.addEventListener("click", function () {
      this.classList.toggle("active");
      document.querySelector(".fab-container").classList.toggle("active");
    });

    // Close FAB when clicking an option
    document.querySelectorAll(".fab-option").forEach(function (option) {
      option.addEventListener("click", function () {
        document.querySelector(".fab-button").classList.remove("active");
        document.querySelector(".fab-container").classList.remove("active");
      });
    });
  }

  // Header functionality
  const headerContainer = document.getElementById("header-container");

  if (headerContainer) {
    // Get current page path
    const currentPage = window.location.pathname;

    // Header HTML
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
                currentPage === "/index.html" || currentPage === "/"
                  ? "active"
                  : ""
              }">Home</a></li>
              <li><a href="playbook.html" class="${
                currentPage.includes("playbook") ? "active" : ""
              }">Leadership Vault</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle ${
                  currentPage.includes("services") ? "active" : ""
                }">Services</a>
                <div class="dropdown-menu">
                  <a href="services/exec.html">Executive Development</a>
                  <a href="services/exec_dev.html">Accelerator</a>
                  <a href="services/strategy.html">Strategic Consulting</a>
                </div>
              </li>
              <li><a href="impact.html" class="${
                currentPage.includes("impact") ? "active" : ""
              }">Impact</a></li>
              <li><a href="blogs.html" class="${
                currentPage.includes("blogs") ? "active" : ""
              }">Blog</a></li>
              <li><a href="about.html" class="${
                currentPage.includes("about") ? "active" : ""
              }">About</a></li>
              <li><a href="contact.html" class="nav-button ${
                currentPage.includes("contact") ? "active" : ""
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
      mobileMenuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        mobileMenuToggle.classList.toggle("active");
        mainNav.classList.toggle("active");
      });

      // Dropdown functionality
      const dropdownElements = document.querySelectorAll(".dropdown");

      dropdownElements.forEach((dropdown) => {
        const dropdownToggle = dropdown.querySelector(".dropdown-toggle");

        // Desktop behavior
        dropdown.addEventListener("mouseenter", function () {
          if (window.innerWidth > 992) {
            dropdown.classList.add("hover");
          }
        });

        dropdown.addEventListener("mouseleave", function () {
          if (window.innerWidth > 992) {
            dropdown.classList.remove("hover");
          }
        });

        // Mobile behavior
        if (dropdownToggle) {
          dropdownToggle.addEventListener("click", function (e) {
            if (window.innerWidth <= 992) {
              e.preventDefault();
              e.stopPropagation();
              dropdown.classList.toggle("open");
            }
          });
        }
      });

      // Close menu when clicking outside
      document.addEventListener("click", function (event) {
        if (
          !mainNav.contains(event.target) &&
          !mobileMenuToggle.contains(event.target)
        ) {
          if (mainNav.classList.contains("active")) {
            mainNav.classList.remove("active");
            mobileMenuToggle.classList.remove("active");
          }

          // Close all dropdown menus on mobile
          if (window.innerWidth <= 992) {
            document.querySelectorAll(".dropdown").forEach((dropdown) => {
              dropdown.classList.remove("open");
            });
          }
        }
      });
    }

    // Add scroll effect
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

    // Handle window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 992 && mainNav) {
        mainNav.classList.remove("active");
        if (mobileMenuToggle) {
          mobileMenuToggle.classList.remove("active");
        }
      }
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const nav = document.querySelector(".main-nav");
        const menuToggle = document.querySelector(".menu-toggle");
        if (
          window.innerWidth < 992 &&
          nav &&
          nav.classList.contains("active")
        ) {
          nav.classList.remove("active");
          if (menuToggle) {
            menuToggle.classList.remove("active");
          }
        }
      }
    });
  });
});

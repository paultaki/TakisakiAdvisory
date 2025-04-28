document.addEventListener("DOMContentLoaded", function () {
  // Create the navigation HTML
  const headerHTML = `
        <nav class="navbar">
            <div class="container navbar-container">
                <a href="index.html" class="logo">PAUL <span>TAKISAKI</span></a>
                <div class="nav-links">
                    <a href="about.html" class="nav-link">About</a>
                    <a href="services.html" class="nav-link">Services</a>
                    <a href="vault.html" class="nav-link">The Vault</a>
                    <a href="contact.html" class="nav-link">Contact</a>
                </div>
                <button class="mobile-menu-btn">☰</button>
                <div class="mobile-menu">
                    <button class="close-menu-btn">&times;</button>
                    <div class="mobile-nav-links">
                        <a href="index.html" class="mobile-nav-link">Home</a>
                        <a href="about.html" class="mobile-nav-link">About</a>
                        <a href="services.html" class="mobile-nav-link">Services</a>
                        <a href="vault.html" class="mobile-nav-link">The Vault</a>
                        <a href="contact.html" class="mobile-nav-link">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
    `;

  // Insert the navigation at the beginning of the body
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;
  }

  // Set active page in navigation
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Function to set active link
  const setActiveLink = (links, current) => {
    links.forEach((link) => {
      const linkHref = link.getAttribute("href");
      if (
        linkHref === current ||
        (current === "" && linkHref === "index.html") ||
        (current === "/" && linkHref === "index.html")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  setActiveLink(navLinks, currentPage);
  setActiveLink(mobileNavLinks, currentPage);

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const closeMenuBtn = document.querySelector(".close-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  });

  // Navbar behavior on scroll
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }
});

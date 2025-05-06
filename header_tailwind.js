document.addEventListener("DOMContentLoaded", function () {
  console.log("Tailwind Header.js loading...");
  
  // Create header content
  const headerContainer = document.getElementById("header-container");

  if (headerContainer) {
    // Get current page path
    const currentPage = window.location.pathname;
    const pageName = currentPage.split("/").pop() || "index.html";

    // Header HTML with Tailwind classes
    const headerHTML = `
      <header class="bg-black text-white fixed w-full top-0 z-50 shadow-md transition-all duration-300">
        <div class="w-full px-0 py-4 flex justify-between items-center relative">
          <!-- Logo aligned to far left -->
          <div class="pl-4 lg:pl-8">
            <a href="index.html" aria-label="Paul Takisaki Logo" class="block">
              <img src="images/ptlogo.webp" alt="PAUL TAKISAKI" class="h-12 w-auto object-contain" style="aspect-ratio: 5/1; object-fit: contain; max-width: none;" height="48">
            </a>
          </div>
          
          <!-- Hamburger menu for mobile - aligned to far right -->
          <div class="pr-4 lg:pr-8">
            <button class="lg:hidden flex flex-col justify-center items-center z-[101] transition-all duration-300 ease-in-out" id="mobile-menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Toggle navigation menu">
              <span class="block w-8 h-0.5 bg-white mb-2 transform transition-all duration-300" aria-hidden="true" id="hamburger-top"></span>
              <span class="block w-8 h-0.5 bg-white mb-2 transition-all duration-300" aria-hidden="true" id="hamburger-middle"></span>
              <span class="block w-8 h-0.5 bg-white transform transition-all duration-300" aria-hidden="true" id="hamburger-bottom"></span>
            </button>
          </div>
          
          <!-- Main Navigation -->
          <nav class="hidden lg:flex items-center space-x-10" id="main-nav" aria-label="Main navigation">
            <ul class="flex items-center space-x-8">
              <li><a href="index.html" class="text-base font-bold tracking-wide hover:text-accent transition py-2 border-b border-transparent hover:border-accent ${
                pageName === "index.html" || currentPage === "/" ? "text-accent border-accent" : "text-white"
              }">Home</a></li>
              <li><a href="takisaki_os.html" class="text-base font-bold tracking-wide hover:text-accent transition py-2 border-b border-transparent hover:border-accent ${
                pageName === "takisaki_os.html" || pageName === "playbook.html" ? "text-accent border-accent" : "text-white"
              }">Takisaki OS</a></li>
              <li><a href="impact.html" class="text-base font-bold tracking-wide hover:text-accent transition py-2 border-b border-transparent hover:border-accent ${
                pageName === "impact.html" ? "text-accent border-accent" : "text-white"
              }">Impact</a></li>
              <li><a href="insights.html" class="text-base font-bold tracking-wide hover:text-accent transition py-2 border-b border-transparent hover:border-accent ${
                pageName === "insights.html" || pageName === "blogs.html" ? "text-accent border-accent" : "text-white"
              }">Insights</a></li>
              <li><a href="about.html" class="text-base font-bold tracking-wide hover:text-accent transition py-2 border-b border-transparent hover:border-accent ${
                pageName === "about.html" ? "text-accent border-accent" : "text-white"
              }">About</a></li>
            </ul>
            
            <div>
              <a href="contact.html" class="bg-accent text-black px-6 py-3 rounded-md text-base font-bold hover:bg-cyan-300 transition ${
                pageName === "contact.html" ? "bg-cyan-300" : ""
              }">Let's Talk</a>
            </div>
          </nav>
        </div>
        
        <!-- Mobile Navigation Overlay - Fixed positioning with higher z-index -->
        <div class="fixed inset-0 bg-black bg-opacity-95 z-[100] lg:hidden hidden flex-col justify-center items-center" id="mobile-nav-overlay">
          <!-- Close button at top right -->
          <div class="absolute top-6 right-6 w-10 h-10 rounded-full flex justify-center items-center bg-white/10 cursor-pointer hover:bg-white/20 transition-all" id="mobile-close-btn">
            <span class="text-2xl font-bold text-white">&times;</span>
          </div>
          
          <nav class="flex flex-col items-center justify-center h-full space-y-8">
            <ul class="flex flex-col items-center space-y-8">
              <li><a href="index.html" class="text-2xl tracking-wide hover:text-accent transition ${
                pageName === "index.html" || currentPage === "/" ? "text-accent" : "text-white"
              }">Home</a></li>
              <li><a href="takisaki_os.html" class="text-2xl tracking-wide hover:text-accent transition ${
                pageName === "takisaki_os.html" || pageName === "playbook.html" ? "text-accent" : "text-white"
              }">Takisaki OS</a></li>
              <li><a href="impact.html" class="text-2xl tracking-wide hover:text-accent transition ${
                pageName === "impact.html" ? "text-accent" : "text-white"
              }">Impact</a></li>
              <li><a href="insights.html" class="text-2xl tracking-wide hover:text-accent transition ${
                pageName === "insights.html" || pageName === "blogs.html" ? "text-accent" : "text-white"
              }">Insights</a></li>
              <li><a href="about.html" class="text-2xl tracking-wide hover:text-accent transition ${
                pageName === "about.html" ? "text-accent" : "text-white"
              }">About</a></li>
            </ul>
            
            <div class="mt-8">
              <a href="contact.html" class="bg-accent text-black px-8 py-4 rounded-lg text-xl font-semibold hover:bg-cyan-300 transition ${
                pageName === "contact.html" ? "bg-cyan-300" : ""
              }">Let's Talk</a>
            </div>
          </nav>
        </div>
      </header>
      <!-- Space to prevent content from being hidden behind fixed header -->
      <div class="h-[72px]"></div>
    `;

    // Insert the header
    headerContainer.innerHTML = headerHTML;

    // Mobile menu toggle functionality
    function setupMobileMenu() {
      console.log("Setting up mobile menu...");
      const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
      const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
      const mobileCloseBtn = document.getElementById("mobile-close-btn");
      
      console.log("Menu toggle:", mobileMenuToggle);
      console.log("Nav overlay:", mobileNavOverlay);
      
      if (!mobileMenuToggle || !mobileNavOverlay) {
        console.log("Mobile menu elements not found, retrying in 500ms...");
        setTimeout(setupMobileMenu, 500);
        return;
      }
      
      console.log("Mobile menu elements found, attaching events...");
      
      // Make sure the menu starts closed
      if (mobileNavOverlay) {
        mobileNavOverlay.style.display = 'none';
        mobileMenuToggle.setAttribute("aria-expanded", "false");
      }
      
      // Toggle menu on button click
      mobileMenuToggle.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log("Menu button clicked");
        const expanded = this.getAttribute("aria-expanded") === "true";
        
        // Get hamburger elements
        const topBar = document.getElementById('hamburger-top');
        const middleBar = document.getElementById('hamburger-middle');
        const bottomBar = document.getElementById('hamburger-bottom');
        
        if (expanded) {
          // Close menu
          closeMenu();
        } else {
          // Open menu
          this.setAttribute("aria-expanded", "true");
          mobileNavOverlay.style.display = 'flex';
          document.body.style.overflow = "hidden";
          
          // Transform hamburger to X
          if (topBar) topBar.style.transform = 'translateY(10px) rotate(45deg)';
          if (middleBar) middleBar.style.opacity = '0';
          if (bottomBar) bottomBar.style.transform = 'translateY(-10px) rotate(-45deg)';
        }
      });
      
      // Close button functionality
      if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener("click", closeMenu);
      }
      
      // Helper function to close menu and reset hamburger
      function closeMenu() {
        // Get hamburger elements
        const topBar = document.getElementById('hamburger-top');
        const middleBar = document.getElementById('hamburger-middle');
        const bottomBar = document.getElementById('hamburger-bottom');
        
        mobileMenuToggle.setAttribute("aria-expanded", "false");
        mobileNavOverlay.style.display = 'none';
        document.body.style.overflow = "";
        
        // Reset hamburger to original state
        if (topBar) topBar.style.transform = '';
        if (middleBar) middleBar.style.opacity = '1';
        if (bottomBar) bottomBar.style.transform = '';
      }
      
      // Close menu when clicking any link in the mobile nav
      const mobileNavLinks = mobileNavOverlay.querySelectorAll("a");
      mobileNavLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
      });
      
      // Close the menu when clicking outside
      document.addEventListener('click', function(event) {
        if (mobileNavOverlay && mobileNavOverlay.style.display === 'flex' && 
            !mobileNavOverlay.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
          closeMenu();
        }
      });
      
      // Add escape key handling
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileNavOverlay && mobileNavOverlay.style.display === 'flex') {
          closeMenu();
        }
      });
      
      console.log("Mobile menu setup complete");
    }
    
    // Run the setup function
    setupMobileMenu();
    
    // Also run it after a delay to ensure everything is loaded
    setTimeout(setupMobileMenu, 1000);

    // Add scroll effect for header
    function handleHeaderScroll() {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add("shadow-lg", "bg-opacity-95");
        } else {
          header.classList.remove("shadow-lg", "bg-opacity-95");
        }
      }
    }
    
    window.addEventListener("scroll", handleHeaderScroll);
    
    // Initial call
    handleHeaderScroll();
  }

  // Page loader functionality
  const loader = document.querySelector(".page-loader");
  if (loader) {
    // Hide loader after page loads
    setTimeout(function () {
      loader.classList.add("opacity-0");
      setTimeout(function () {
        loader.style.display = "none";
      }, 300);
    }, 500);

    // Safety timeout
    setTimeout(function () {
      loader.style.display = "none";
    }, 3000);
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
      }
    });
  });
});
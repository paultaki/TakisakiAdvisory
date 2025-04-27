document.addEventListener("DOMContentLoaded", () => {
  // Initialize Intersection Observer for scroll animations
  const scrollElements = document.querySelectorAll(".step, .package, .story");

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  scrollElements.forEach((element) => {
    element.classList.add("scroll-element");
    scrollObserver.observe(element);
  });

  // Add subtle hover effects to steps
  const steps = document.querySelectorAll(".step");

  steps.forEach((step) => {
    step.addEventListener("mouseenter", () => {
      steps.forEach((s) => s.classList.remove("active"));
      step.classList.add("active");
    });
  });

  // Mobile navigation toggle (if needed)
  const setupMobileNav = () => {
    const navToggle = document.createElement("button");
    navToggle.classList.add("nav-toggle");
    navToggle.innerHTML = "<span></span><span></span><span></span>";

    const header = document.querySelector("header");
    const nav = document.querySelector("nav");

    header.insertBefore(navToggle, nav);

    navToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  };

  // Only setup mobile nav for small screens
  if (window.innerWidth < 768) {
    setupMobileNav();
  }

  // Add CSS for scroll animations (adds to existing CSS)
  const style = document.createElement("style");
  style.textContent = `
        .scroll-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .scroll-element.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .step {
            transition: all 0.3s ease;
        }
        
        .step.active {
            transform: translateY(-10px);
        }
        
        .step.active .step-number {
            transform: scale(1.1);
        }
        
        /* Mobile nav styles */
        @media (max-width: 767px) {
            .nav-toggle {
                display: block;
                background: none;
                border: none;
                width: 30px;
                height: 25px;
                position: absolute;
                right: 20px;
                top: 20px;
                cursor: pointer;
                z-index: 100;
            }
            
            .nav-toggle span {
                display: block;
                width: 100%;
                height: 2px;
                background-color: white;
                margin-bottom: 5px;
                transition: all 0.3s ease;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }
            
            nav {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                height: 100vh;
                background-color: #111;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: right 0.3s ease;
                z-index: 90;
            }
            
            nav.active {
                right: 0;
            }
            
            nav ul {
                flex-direction: column;
                text-align: center;
            }
            
            nav ul li {
                margin: 15px 0;
            }
        }
    `;

  document.head.appendChild(style);

  // Optional: Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});

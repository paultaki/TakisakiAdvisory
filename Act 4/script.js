// Fix loader issue - prioritize this code at the top
window.addEventListener("load", function () {
  hideLoader();
});

document.addEventListener("DOMContentLoaded", function () {
  hideLoader();

  // Failsafe - hide loader after 2 seconds no matter what
  setTimeout(function () {
    hideLoader();
  }, 2000);
});

function hideLoader() {
  const loader = document.querySelector(".page-loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";

    // Remove from DOM after transition
    setTimeout(function () {
      loader.style.display = "none";
    }, 500);
  }
}

// Main document ready function
document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector("header");
  const scrollThreshold = 50;

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      nav.classList.toggle("active");
    });

    // Close menu when clicking a nav link
    document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
      });
    });
  }

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevButton = document.querySelector(".testimonial-prev");
  const nextButton = document.querySelector(".testimonial-next");
  let currentSlide = 0;

  function showSlide(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    testimonialSlides[index].classList.add("active");
    indicators[index].classList.add("active");
    currentSlide = index;
  }

  if (prevButton && nextButton && testimonialSlides.length > 0) {
    prevButton.addEventListener("click", () => {
      currentSlide =
        (currentSlide - 1 + testimonialSlides.length) %
        testimonialSlides.length;
      showSlide(currentSlide);
    });

    nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    });

    // Connect indicators to slides
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        showSlide(index);
      });
    });

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    }, 5000);

    // Pause rotation on hover
    const testimonialContainer = document.querySelector(".testimonial-slider");
    if (testimonialContainer) {
      testimonialContainer.addEventListener("mouseenter", () => {
        clearInterval(testimonialInterval);
      });

      testimonialContainer.addEventListener("mouseleave", () => {
        testimonialInterval = setInterval(() => {
          currentSlide = (currentSlide + 1) % testimonialSlides.length;
          showSlide(currentSlide);
        }, 5000);
      });
    }
  }

  // Custom cursor for desktop only
  const cursor = document.querySelector(".cursor-follower");

  if (cursor && window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.opacity = "1";
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.addEventListener("mouseout", () => {
      cursor.style.opacity = "0";
    });

    // Slightly enlarge cursor on hoverable elements
    const hoverables = document.querySelectorAll(
      "a, button, .service-card, .os-card"
    );
    hoverables.forEach((hoverable) => {
      hoverable.addEventListener("mouseenter", (event) => {
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1.5)`;
        cursor.style.border = "1px solid var(--accent-color)";
        cursor.style.backgroundColor = "rgba(0, 229, 255, 0.1)";
      });

      hoverable.addEventListener("mouseleave", (event) => {
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1)`;
        cursor.style.border = "2px solid var(--accent-color)";
        cursor.style.backgroundColor = "transparent";
      });
    });
  }

  // Count up animation for result numbers
  const resultNumbers = document.querySelectorAll(".result-number");

  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCount() {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        return;
      }

      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCount);
    }

    updateCount();
  }

  // Intersection Observer for counting animation
  const resultsSection = document.querySelector(".results");

  if (resultsSection && resultNumbers.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resultNumbers.forEach((number) => {
              const targetValue = parseInt(number.textContent, 10);
              if (!isNaN(targetValue)) {
                animateCounter(number, targetValue);
              }
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(resultsSection);
  }

  // Scroll reveal animations
  const scrollElements = document.querySelectorAll(
    ".os-card, .service-card, .result-box"
  );

  if (scrollElements.length) {
    const elementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            elementObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    scrollElements.forEach((element) => {
      element.classList.add("scroll-element");
      elementObserver.observe(element);
    });

    // Add CSS for scroll animations
    const style = document.createElement("style");
    style.textContent = `
      .scroll-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
            
      .scroll-element.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  // Form submission
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple form validation
      const inputs = this.querySelectorAll("input, select");
      let isValid = true;

      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          isValid = false;
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });

      if (isValid) {
        // Form submission logic would go here
        // For now, just show a success message
        const formButton = this.querySelector("button");
        const originalText = formButton.textContent;

        formButton.disabled = true;
        formButton.textContent = "Sending...";

        setTimeout(() => {
          this.innerHTML =
            '<div class="success-message"><h3>Message Sent!</h3><p>Thank you for your interest. We\'ll be in touch soon.</p></div>';
        }, 1500);
      }
    });
  }

  // Create particles
  createParticles();

  // Initialize fade-in animations
  initFadeInAnimations();

  // Initialize mobile menu
  initMobileMenu();

  // FAB Menu Functionality
  initFloatingActionButton();

  // Smooth scrolling for anchor links
  initSmoothScrolling();
});

function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      const size = Math.random() * 6 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 8 + 5;
      const delay = Math.random() * 5;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;

      particlesContainer.appendChild(particle);
    }
  }
}

function initFadeInAnimations() {
  const fadeElems = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElems.forEach((elem) => {
    observer.observe(elem);
  });
}

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });

    // Close mobile menu when clicking links
    const menuLinks = navLinks.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
      });
    });
  }
}

function initFloatingActionButton() {
  const fabButton = document.querySelector(".fab-button");
  const fabContainer = document.querySelector(".fab-container");

  if (fabButton && fabContainer) {
    fabButton.addEventListener("click", function () {
      this.classList.toggle("active");
      fabContainer.classList.toggle("active");
    });

    // Close FAB when clicking an option
    document.querySelectorAll(".fab-option").forEach(function (option) {
      option.addEventListener("click", function () {
        fabButton.classList.remove("active");
        fabContainer.classList.remove("active");
      });
    });

    // Close FAB when clicking outside
    document.addEventListener("click", function (e) {
      if (fabContainer && !fabContainer.contains(e.target)) {
        fabButton.classList.remove("active");
        fabContainer.classList.remove("active");
      }
    });
  }
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Add haptic feedback if supported
        if (navigator && navigator.vibrate) {
          navigator.vibrate(30);
        }

        // Calculate position accounting for fixed navbar
        const navHeight = document.querySelector("header")
          ? document.querySelector("header").offsetHeight
          : 80;
        const targetPosition = targetElement.offsetTop - navHeight;

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Add progressive loading for speed perception
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

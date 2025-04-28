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

  if (prevButton && nextButton) {
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

  // Custom cursor
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
      hoverable.addEventListener("mouseenter", () => {
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1.5)`;
        cursor.style.border = "1px solid var(--accent-color)";
        cursor.style.backgroundColor = "rgba(0, 229, 255, 0.1)";
      });

      hoverable.addEventListener("mouseleave", () => {
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
              const targetValue = parseInt(number.getAttribute("data-count"));
              animateCounter(number, targetValue);
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

  // Chess piece animation in chess board
  function createChessPiece() {
    const piece = document.createElement("div");
    piece.classList.add("chess-piece");

    // Random position on the board
    const x = Math.floor(Math.random() * 8);
    const y = Math.floor(Math.random() * 8);

    piece.style.cssText = `
            position: absolute;
            width: 30px;
            height: 30px;
            background-color: ${
              Math.random() > 0.5
                ? "var(--accent-color)"
                : "rgba(255, 255, 255, 0.7)"
            };
            border-radius: 50%;
            top: ${12.5 * y + 5}%;
            left: ${12.5 * x + 5}%;
            opacity: 0;
            transform: scale(0);
            animation: pieceAppear 1s forwards ${Math.random() * 2}s;
        `;

    return piece;
  }

  const chessBoard = document.querySelector(".chess-board");

  if (chessBoard) {
    const piecesStyle = document.createElement("style");
    piecesStyle.textContent = `
            @keyframes pieceAppear {
                0% {
                    opacity: 0;
                    transform: scale(0);
                }
                100% {
                    opacity: 0.7;
                    transform: scale(1);
                }
            }
        `;
    document.head.appendChild(piecesStyle);

    // Add some chess pieces to the board
    for (let i = 0; i < 10; i++) {
      chessBoard.appendChild(createChessPiece());
    }
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
});
// Fade-in animation
document.addEventListener("DOMContentLoaded", function () {
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

  // Create particles
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.width = `${Math.random() * 6 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particlesContainer.appendChild(particle);
    }
  }

  // Buzzwords animation with contrasting rebellion words
  const corporateBuzzwords = [
    "Synergy",
    "Best Practices",
    "Alignment",
    "Thought Leadership",
    "Ownership",
    "Empower",
    "Stakeholders",
    "Paradigm Shift",
    "Circle Back",
    "Deep Dive",
    "Leverage",
    "Value-Add",
    "Streamline",
    "Optimize",
  ];

  const rebellionWords = [
    "Disruption",
    "Rebellion",
    "Courage",
    "Vision",
    "Truth",
    "Impact",
    "Challenge",
    "Revolution",
    "Authenticity",
    "Power",
    "Freedom",
    "Edge",
    "Breakthrough",
    "Audacity",
  ];

  const buzzwordsContainer = document.getElementById("buzzwords-container");
  if (buzzwordsContainer) {
    // Add corporate buzzwords that will fade out
    corporateBuzzwords.forEach((word, index) => {
      const buzzword = document.createElement("div");
      buzzword.classList.add("buzzword", "corporate");
      buzzword.textContent = word;

      // Position strategically across the container
      const col = index % 4;
      const row = Math.floor(index / 4);
      buzzword.style.left = `${20 + col * 20}%`;
      buzzword.style.top = `${20 + row * 15}%`;

      // Random delay for animation
      buzzword.style.animationDelay = `${Math.random() * 3}s`;

      buzzwordsContainer.appendChild(buzzword);
    });

    // Add rebellion words that will fade in
    rebellionWords.forEach((word, index) => {
      const buzzword = document.createElement("div");
      buzzword.classList.add("buzzword", "rebellion");
      buzzword.textContent = word;

      // Position in similar spots to the corporate words they'll replace
      const col = index % 4;
      const row = Math.floor(index / 4);
      buzzword.style.left = `${20 + col * 20}%`;
      buzzword.style.top = `${20 + row * 15}%`;

      // Random delay for animation
      buzzword.style.animationDelay = `${Math.random() * 3 + 4}s`;

      buzzwordsContainer.appendChild(buzzword);
    });
  }

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  // Smooth scroll for navigation links
  const navLinks2 = document.querySelectorAll('a[href^="#"]');

  navLinks2.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#") return;

      e.preventDefault();

      const targetElement = document.querySelector(href);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.98)";
        navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
      } else {
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
        navbar.style.boxShadow = "none";
      }
    });
  }
});

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations
  initAnimations();

  // Initialize scroll effects
  initScrollEffects();

  // Initialize mobile menu
  initMobileMenu();

  // Initialize vault framework reveals
  initVaultFrameworks();

  // Initialize form handling
  initFormHandling();
});

// Initialize scroll animations
function initAnimations() {
  // Add fade-in classes to elements
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const credentials = document.querySelector(".credentials");
  const vaultTeaser = document.querySelector(".vault-teaser");
  const testimonials = document.querySelector(".testimonials");
  const ctaButton = document.querySelector(".hero .cta-button");

  if (heroTitle) heroTitle.classList.add("fade-in");
  if (heroSubtitle) heroSubtitle.classList.add("fade-in", "fade-in-delay-1");
  if (credentials) credentials.classList.add("fade-in", "fade-in-delay-2");
  if (vaultTeaser) vaultTeaser.classList.add("fade-in", "fade-in-delay-2");
  if (testimonials) testimonials.classList.add("fade-in", "fade-in-delay-3");
  if (ctaButton) ctaButton.classList.add("fade-in", "fade-in-delay-3");

  // Trigger animations after a short delay
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach((el) => {
      el.classList.add("active");
    });
  }, 100);
}

// Initialize scroll effects
function initScrollEffects() {
  const nav = document.querySelector("nav");
  const sections = document.querySelectorAll("section");

  // Scroll event listener
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    // Change navbar background on scroll
    if (scrollPosition > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    // Animate elements when they come into view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - window.innerHeight * 0.75;

      if (scrollPosition > sectionTop) {
        const fadeElements = section.querySelectorAll(".fade-in:not(.active)");
        fadeElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("active");
          }, index * 100); // Stagger animations
        });
      }
    });
  });

  // Trigger initial scroll to activate visible elements
  window.dispatchEvent(new Event("scroll"));
}

// Initialize mobile menu
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");

  if (menuToggle && navLinks) {
    // Toggle menu on click
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking a link
    navLinksItems.forEach((item) => {
      item.addEventListener("click", function () {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }
}

// Initialize vault framework reveals
function initVaultFrameworks() {
  const frameworks = document.querySelectorAll(".framework");

  // Unlock frameworks on scroll
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const vaultSection = document.querySelector("#vault");

    if (
      vaultSection &&
      scrollPosition > vaultSection.offsetTop - window.innerHeight * 0.5
    ) {
      frameworks.forEach((framework, index) => {
        // Stagger the unlock effect
        setTimeout(() => {
          framework.classList.add("unlocked");
        }, index * 400);
      });
    }
  });

  // Also unlock on click for immediate interaction
  frameworks.forEach((framework) => {
    framework.addEventListener("click", function () {
      this.classList.toggle("unlocked");
    });
  });
}

// Initialize form handling
function initFormHandling() {
  const applicationForm = document.getElementById("application-form");
  const successModal = document.getElementById("success-modal");
  const modalClose = document.querySelector(".modal-close");

  if (applicationForm) {
    applicationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission with haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }

      // Collect form data
      const formData = new FormData(applicationForm);
      const formDataObj = {};

      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });

      // In a real implementation, you would send this data to your server
      console.log("Form submitted:", formDataObj);

      // Show success modal
      if (successModal) {
        successModal.classList.add("active");
      }

      // Reset form
      applicationForm.reset();
    });
  }

  // Close modal on button click
  if (modalClose) {
    modalClose.addEventListener("click", function () {
      successModal.classList.remove("active");
    });
  }

  // Close modal on click outside content
  if (successModal) {
    successModal.addEventListener("click", function (e) {
      if (e.target === successModal) {
        successModal.classList.remove("active");
      }
    });
  }

  // Floating label effect for form inputs
  const formInputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );

  formInputs.forEach((input) => {
    // Set placeholder to empty string to work with CSS selectors
    input.setAttribute("placeholder", " ");

    // Move label up if field has value (for cases where form is pre-filled)
    if (input.value.trim() !== "") {
      input.classList.add("has-value");
    }

    // Input event listener
    input.addEventListener("input", function () {
      if (this.value.trim() !== "") {
        this.classList.add("has-value");
      } else {
        this.classList.remove("has-value");
      }
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Add haptic feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }

      // Calculate position accounting for fixed navbar
      const navHeight = document.querySelector("nav").offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;

      // Smooth scroll to target
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Add parallax effect to hero section
function parallaxEffect() {
  const hero = document.querySelector(".hero");

  if (hero) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
      }
    });
  }
}

// Execute parallax effect
parallaxEffect();

// Weapon card hover effects
const weaponCards = document.querySelectorAll(".weapon-card");

weaponCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    // Add subtle glow effect
    this.style.boxShadow = `0 20px 40px rgba(0, 229, 255, 0.1)`;
  });

  card.addEventListener("mouseleave", function () {
    // Remove glow effect
    this.style.boxShadow = "";
  });
});

// Progressive loading for speed perception
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Preload background images for smoother transitions
  const preloadImages = [
    // Add any background images that need preloading
  ];

  preloadImages.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
});

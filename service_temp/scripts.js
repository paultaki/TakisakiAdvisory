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

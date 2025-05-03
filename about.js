// Operating System section - See More/Less functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize expanded sections to be hidden
  const expandedSections = document.querySelectorAll(".framework-expanded");
  expandedSections.forEach((section) => {
    section.style.display = "none";
  });

  // Add click event listeners to all See More buttons
  const expandButtons = document.querySelectorAll(".expand-btn");
  expandButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".framework-card");
      const expandedContent = card.querySelector(".framework-expanded");

      if (expandedContent.style.display === "block") {
        // Hide content
        expandedContent.style.display = "none";
        this.textContent = "See More";
      } else {
        // Show content
        expandedContent.style.display = "block";
        this.textContent = "See Less";
      }
    });
  });

  // Testimonial slider functionality
  let currentSlide = 0;
  const slides = document.querySelectorAll(".testimonial-slide");
  const indicators = document.querySelectorAll(".indicator");
  const totalSlides = slides.length;

  // Function to change slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.style.opacity = 0;
      slide.style.visibility = "hidden";
      slide.classList.remove("active");
      slide.style.position = "absolute";
    });

    // Show selected slide
    slides[index].style.opacity = 1;
    slides[index].style.visibility = "visible";
    slides[index].classList.add("active");
    slides[index].style.position = "relative";

    // Update indicators
    indicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    indicators[index].classList.add("active");
    currentSlide = index;
  }

  // Initialize first slide
  showSlide(0);

  // Set up indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Set up auto-rotation (optional)
  const autoRotate = setInterval(() => {
    const nextSlide = (currentSlide + 1) % totalSlides;
    showSlide(nextSlide);
  }, 8000);

  // Pause rotation on hover (optional)
  const testimonialContainer = document.querySelector(".testimonial-slider");
  if (testimonialContainer) {
    testimonialContainer.addEventListener("mouseenter", () => {
      clearInterval(autoRotate);
    });
  }

  // Navigation arrows (if present)
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(prevSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      showSlide(nextSlide);
    });
  }

  // Simple animation for sections as they scroll into view
  const animatedElements = document.querySelectorAll(
    ".snapshot-item, .framework-card, .impact-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  animatedElements.forEach((element) => {
    element.classList.add("animate-ready");
    observer.observe(element);
  });
});

// Add these to your main CSS file or in a style tag
// .animate-ready {
//   opacity: 0;
//   transform: translateY(20px);
//   transition: opacity 0.5s ease, transform 0.5s ease;
// }
// .animate-in {
//   opacity: 1;
//   transform: translateY(0);
// }

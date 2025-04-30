document.addEventListener("DOMContentLoaded", function () {
  // Framework expansion functionality
  const expandButtons = document.querySelectorAll(".expand-btn");

  expandButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".framework-card");
      const expandedContent = card.querySelector(".framework-expanded");

      if (expandedContent.style.display === "block") {
        expandedContent.style.display = "none";
        this.textContent = "See More";
        card.style.borderColor = "#333";
      } else {
        // First, close any open ones
        document.querySelectorAll(".framework-expanded").forEach((content) => {
          content.style.display = "none";
          content
            .closest(".framework-card")
            .querySelector(".expand-btn").textContent = "See More";
          content.closest(".framework-card").style.borderColor = "#333";
        });

        // Then open this one
        expandedContent.style.display = "block";
        this.textContent = "Show Less";
        card.style.borderColor = "var(--accent-color)";
      }
    });
  });

  // Testimonial slider functionality
  const slides = document.querySelectorAll(".testimonial-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    slides[index].classList.add("active");
    indicators[index].classList.add("active");
    currentSlide = index;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", function () {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) newIndex = slides.length - 1;
      showSlide(newIndex);
    });

    nextBtn.addEventListener("click", function () {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      showSlide(index);
    });
  });

  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
  }, 7000);

  // Pause rotation when hovering over testimonials
  const testimonialContainer = document.querySelector(".testimonial-slider");
  if (testimonialContainer) {
    testimonialContainer.addEventListener("mouseenter", () => {
      clearInterval(testimonialInterval);
    });

    testimonialContainer.addEventListener("mouseleave", () => {
      testimonialInterval = setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
      }, 7000);
    });
  }

  // Animate elements on scroll
  const animatedElements = document.querySelectorAll(
    ".handlebar-content, .framework-card, .anti-column, .result-box"
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
    { threshold: 0.2 }
  );

  animatedElements.forEach((element) => {
    element.classList.add("animate-ready");
    observer.observe(element);
  });

  // Add to about.css:
  // .animate-ready { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
  // .animate-in { opacity: 1; transform: translateY(0); }

  // Modify CSS for animation
  const style = document.createElement("style");
  style.textContent = `
    .animate-ready { 
      opacity: 0; 
      transform: translateY(20px); 
      transition: opacity 0.5s ease, transform 0.5s ease; 
    }
    .animate-in { 
      opacity: 1; 
      transform: translateY(0); 
    }
  `;
  document.head.appendChild(style);
});
document.addEventListener("DOMContentLoaded", function () {
    const loader = document.querySelector(".page-loader");
    if (loader) {
      loader.classList.add("loaded"); // adds fade-out class
      setTimeout(() => {
        loader.style.display = "none"; // remove completely
      }, 500);
    }
  });
  
// Mobile Navigation Toggle
const mobileToggle = document.getElementById("mobile-toggle");
const navbar = document.getElementById("navbar");

mobileToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
  mobileToggle.classList.toggle("active");
});

// Sticky Header
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    }

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active Menu Item
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Testimonial Slider
const testimonialTrack = document.getElementById("testimonial-track");
const testimonialNav = document.getElementById("testimonial-nav");
const slides = testimonialTrack.children;
let currentSlide = 0;

// Create navigation dots
for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("div");
  dot.classList.add("testimonial-dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    goToSlide(i);
  });
  testimonialNav.appendChild(dot);
}

function goToSlide(index) {
  testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll(".testimonial-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  currentSlide = index;
}

// Auto slide
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}, 5000);

// Polyfill for scrollIntoConstrainedView
if (!Element.prototype.scrollIntoConstrainedView) {
  Element.prototype.scrollIntoConstrainedView = function (
    scrollIntoViewOptions
  ) {
    const headerOffset = 80;
    const elementPosition = this.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: scrollIntoViewOptions?.behavior || "auto",
    });
  };
}

// Form Submission Handler
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = this.querySelector('input[placeholder="Your Name"]').value;
      const email = this.querySelector('input[placeholder="Your Email"]').value;
      const subject = this.querySelector('input[placeholder="Subject"]').value;
      const message = this.querySelector("textarea").value;

      // Here you would typically send this data to a server
      // For now, we'll just show a success message

      // Create a success message
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.style.padding = "1rem";
      successMessage.style.backgroundColor = "var(--success)";
      successMessage.style.color = "white";
      successMessage.style.borderRadius = "4px";
      successMessage.style.marginTop = "1rem";
      successMessage.textContent =
        "Thank you for your message! I'll get back to you soon.";

      // Replace form with success message
      contactForm.innerHTML = "";
      contactForm.appendChild(successMessage);

      // Log form data (for development)
      console.log({
        name,
        email,
        subject,
        message,
      });
    });
  }
});

// Add Animation on Scroll
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".service-card, .case-card, .blog-card, .stat-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });
});
// Hero content animation on scroll
document.addEventListener("DOMContentLoaded", function () {
  const hero = document.querySelector(".hero-content");

  if (!hero) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          hero.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  observer.observe(hero);
});

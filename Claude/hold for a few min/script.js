// Mobile Navigation Toggle
const mobileToggle = document.getElementById("mobile-toggle");
const navbar = document.getElementById("navbar");

mobileToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
  mobileToggle.classList.toggle("active");
  
  // Change the icon based on menu state
  if (mobileToggle.classList.contains("active")) {
    mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
  }
  
  // Initialize scroll reveal effects
  const initScrollEffects = () => {
    // Add classes to trigger different animations based on element type
    document.querySelectorAll('.service-card:nth-child(odd)').forEach(el => {
      el.classList.add('slide-right');
    });
    
    document.querySelectorAll('.service-card:nth-child(even)').forEach(el => {
      el.classList.add('slide-left');
    });
    
    // Staggered animation for stats
    document.querySelectorAll('.enhanced-stat-item').forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Pulse animation for key metrics
    document.querySelectorAll('.key-metric').forEach(el => {
      el.classList.add('pulse-animation');
    });
  };
  
  initScrollEffects();
  
  // Back to top button
  const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.display = 'none';
    button.style.backgroundColor = 'var(--accent)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '50%';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.fontSize = '1.2rem';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    button.style.transition = 'all 0.3s ease';
    button.style.zIndex = '999';
    
    button.addEventListener('mouseover', () => {
      button.style.transform = 'translateY(-5px)';
      button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseout', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        button.style.display = 'block';
        setTimeout(() => {
          button.style.opacity = '1';
        }, 10);
      } else {
        button.style.opacity = '0';
        setTimeout(() => {
          button.style.display = 'none';
        }, 300);
      }
    });
  };
  
  createBackToTopButton();
  
  // Newsletter form submission
  const footerForm = document.querySelector('footer form');
  if (footerForm) {
    footerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = footerForm.querySelector('input[type="email"]');
      const subscribeBtn = footerForm.querySelector('button');
      
      if (!emailInput.value || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
        emailInput.classList.add('error');
        emailInput.classList.add('shake');
        setTimeout(() => {
          emailInput.classList.remove('shake');
        }, 500);
        return;
      }
      
      // Show loading state
      const originalText = subscribeBtn.textContent;
      subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
      subscribeBtn.disabled = true;
      
      // Simulate submission
      setTimeout(() => {
        footerForm.innerHTML = `
          <div style="
            background-color: var(--success);
            color: white;
            padding: 15px;
            border-radius: 4px;
            text-align: center;
            animation: fadeIn 0.5s ease;
          ">
            <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
            Thanks for subscribing! You'll receive leadership insights soon.
          </div>
        `;
      }, 1500);
    });
  }
} else {
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Sticky Header with enhanced animation
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth Scrolling with better UX
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Close mobile menu if open
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
      mobileToggle.classList.remove("active");
      mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    // Smooth scroll with offset for header
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active Menu Item with improved detection
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

function updateActiveMenuItems() {
  let current = "";
  const scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200; // Offset to trigger earlier
    const sectionHeight = section.clientHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveMenuItems);
window.addEventListener("load", updateActiveMenuItems);

// Enhanced Testimonial Slider
const testimonialTrack = document.getElementById("testimonial-track");
const testimonialNav = document.getElementById("testimonial-nav");
const slides = testimonialTrack ? testimonialTrack.children : [];
let currentSlide = 0;
let isAutoSliding = true;
let slideInterval;

// Create navigation dots if testimonial section exists
if (testimonialTrack && testimonialNav) {
  // Create navigation dots
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("testimonial-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(i);
      resetAutoSlideTimer();
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

  // Auto slide with pause on hover
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      if (isAutoSliding) {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
      }
    }, 5000);
  }

  function resetAutoSlideTimer() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Pause auto-sliding when hovering over testimonials
  testimonialTrack.addEventListener("mouseenter", () => {
    isAutoSliding = false;
  });

  testimonialTrack.addEventListener("mouseleave", () => {
    isAutoSliding = true;
  });

  // Start the auto-sliding
  startAutoSlide();
}

// Form Submission Handler with validation and feedback
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = this.querySelector('input[placeholder="Your Name"]');
      const email = this.querySelector('input[placeholder="Your Email"]');
      const subject = this.querySelector('input[placeholder="Subject"]');
      const message = this.querySelector("textarea");
      
      // Simple validation
      let isValid = true;
      const requiredFields = [name, email, message];
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Add shake animation
          field.classList.add('shake');
          setTimeout(() => {
            field.classList.remove('shake');
          }, 500);
        } else {
          field.classList.remove('error');
        }
      });
      
      // Basic email validation
      if (email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
        isValid = false;
        email.classList.add('error');
      }
      
      if (!isValid) {
        return;
      }

      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Create a success message
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.style.padding = "1rem";
        successMessage.style.backgroundColor = "var(--success)";
        successMessage.style.color = "white";
        successMessage.style.borderRadius = "8px";
        successMessage.style.marginTop = "1rem";
        successMessage.style.boxShadow = "0 5px 15px rgba(46, 204, 113, 0.3)";
        successMessage.style.animation = "fadeIn 0.5s ease";
        successMessage.innerHTML = `
          <div style="display: flex; align-items: center;">
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-right: 1rem;"></i>
            <div>
              <h3 style="margin: 0; margin-bottom: 0.5rem;">Message Sent Successfully!</h3>
              <p style="margin: 0;">Thank you for reaching out, ${name.value}. I'll get back to you soon.</p>
            </div>
          </div>
        `;

        // Replace form with success message
        contactForm.innerHTML = "";
        contactForm.appendChild(successMessage);

        // Log form data (for development)
        console.log({
          name: name.value,
          email: email.value,
          subject: subject ? subject.value : "",
          message: message.value,
        });
      }, 1500);
    });
  }
});

// Scroll-triggered animations for UI elements
document.addEventListener("DOMContentLoaded", function() {
  // Select elements to animate
  const animatedElements = document.querySelectorAll(
    ".service-card, .case-card, .blog-card, .result-card, .enhanced-stat-item, .key-method-card"
  );
  
  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          
          // For results dashboard, add counting animation
          if (entry.target.classList.contains("result-card")) {
            const numberElement = entry.target.querySelector(".result-number");
            if (numberElement) {
              animateCounter(numberElement);
            }
          }
        }
      });
    },
    { threshold: 0.1 }
  );
  
  // Add initial styling and observe elements
  animatedElements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
  
  // Add animated class handler
  document.addEventListener("animationend", function(e) {
    if (e.target.classList.contains("animated")) {
      e.target.style.opacity = 1;
      e.target.style.transform = "translateY(0)";
    }
  });
  
  // Number counter animation function
  function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ""));
    const duration = 2000; // ms
    const step = 30; // update every 30ms
    let current = 0;
    const increment = target / (duration / step);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = element.textContent.includes("+") 
          ? `${target}+` 
          : `${target}`;
        clearInterval(timer);
      } else {
        element.textContent = element.textContent.includes("+") 
          ? `${Math.floor(current)}+` 
          : `${Math.floor(current)}`;
      }
    }, step);
  }
});

// Add custom CSS rules for animations
document.addEventListener("DOMContentLoaded", function() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideLeft {
      from { transform: translateX(30px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    .animated {
      animation: slideUp 0.6s ease forwards;
    }
    
    .shake {
      animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-5px); }
      40%, 80% { transform: translateX(5px); }
    }
    
    .error {
      border-color: #e74c3c !important;
      box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
    }
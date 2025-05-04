function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
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

document.addEventListener("DOMContentLoaded", function() {
  // Page transition effect
  setTimeout(function() {
    document.body.classList.add('page-visible');
  }, 50);

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Form validation and feedback
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        if (this.checkValidity()) {
          this.classList.add('valid');
          this.classList.remove('invalid');
        } else {
          this.classList.add('invalid');
          this.classList.remove('valid');
        }
      });
      
      // Initial validation check on focus out
      input.addEventListener('blur', function() {
        if (this.value) {
          if (this.checkValidity()) {
            this.classList.add('valid');
            this.classList.remove('invalid');
          } else {
            this.classList.add('invalid');
            this.classList.remove('valid');
          }
        }
      });
    });
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Check if form is valid
      if (contactForm.checkValidity()) {
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        
        // Add a subject if not present
        if (!formObject.subject) {
          formObject.subject = 'Website Contact Form';
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Actually send the data to your API
        fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formObject)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
          contactForm.classList.add('success');
          contactForm.reset();
          
          // Reset validation classes
          inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
          });
          
          // Reset form after some time
          setTimeout(() => {
            contactForm.classList.remove('success');
          }, 5000);
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Sorry, there was an error sending your message. Please try again later.');
        })
        .finally(() => {
          // Reset button state
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        });
      } else {
        // Mark all invalid fields
        inputs.forEach(input => {
          if (!input.checkValidity()) {
            input.classList.add('invalid');
          }
        });
      }
    });
  }

  // Handle page transitions for internal links
  const internalLinks = document.querySelectorAll('a[href^="/"]:not([target="_blank"]), a[href^="./"]:not([target="_blank"]), a[href^="../"]:not([target="_blank"])');
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip for anchor links
      if (href.startsWith('#')) return;
      
      e.preventDefault();
      document.body.classList.remove('page-visible');
      
      setTimeout(() => {
        window.location = href;
      }, 300);
    });
  });
  
  // Create particles if the particles container exists
  createParticles();
  
  // Initialize FAB (Floating Action Button) for mobile
  const fabButton = document.querySelector('.fab-button');
  const fabContainer = document.querySelector('.fab-container');
  const fabOptions = document.getElementById('fab-options');
  
  if (fabButton && fabContainer && fabOptions) {
    fabButton.addEventListener('click', function() {
      const isActive = fabContainer.classList.toggle('active');
      
      // Update ARIA attributes
      fabButton.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      fabOptions.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      
      // Change the icon for visual indication
      const fabIcon = fabButton.querySelector('.fab-icon');
      if (fabIcon) {
        fabIcon.textContent = isActive ? '×' : '+';
      }
    });
    
    // Close FAB when clicking outside
    document.addEventListener('click', function(e) {
      if (!fabContainer.contains(e.target) && fabContainer.classList.contains('active')) {
        fabContainer.classList.remove('active');
        fabButton.setAttribute('aria-expanded', 'false');
        fabOptions.setAttribute('aria-hidden', 'true');
        
        // Reset the icon
        const fabIcon = fabButton.querySelector('.fab-icon');
        if (fabIcon) {
          fabIcon.textContent = '+';
        }
      }
    });
    
    // Add keyboard support
    fabButton.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fabButton.click();
      }
    });
  }
  
  // Testimonial slider functionality with accessibility improvements
  const slides = document.querySelectorAll(".testimonial-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  
  if (slides.length > 0) {
    let currentSlide = 0;
  
    function showSlide(index) {
      // Update slide visibility and ARIA attributes
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        slide.setAttribute("hidden", "");
        
        // Update associated tab ARIA attributes
        indicators[i].setAttribute("aria-selected", "false");
        indicators[i].setAttribute("tabindex", "0");
      });
  
      // Update indicators
      indicators.forEach(indicator => indicator.classList.remove("active"));
      
      // Show current slide
      slides[index].classList.add("active");
      slides[index].removeAttribute("hidden");
      indicators[index].classList.add("active");
      indicators[index].setAttribute("aria-selected", "true");
      
      // Update current index
      currentSlide = index;
    }
  
    if (prevBtn && nextBtn) {
      // Click events
      prevBtn.addEventListener("click", function() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        showSlide(newIndex);
      });
  
      nextBtn.addEventListener("click", function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
      });
      
      // Keyboard events
      prevBtn.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          let newIndex = currentSlide - 1;
          if (newIndex < 0) newIndex = slides.length - 1;
          showSlide(newIndex);
        }
      });
      
      nextBtn.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          let newIndex = currentSlide + 1;
          if (newIndex >= slides.length) newIndex = 0;
          showSlide(newIndex);
        }
      });
    }
  
    if (indicators.length > 0) {
      indicators.forEach((indicator, index) => {
        // Click event
        indicator.addEventListener("click", function() {
          showSlide(index);
        });
        
        // Keyboard event
        indicator.addEventListener("keydown", function(e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            showSlide(index);
          }
          // Left and right arrow keys for navigation between indicators
          else if (e.key === "ArrowLeft") {
            e.preventDefault();
            let prevIndex = index - 1;
            if (prevIndex < 0) prevIndex = indicators.length - 1;
            indicators[prevIndex].focus();
          }
          else if (e.key === "ArrowRight") {
            e.preventDefault();
            let nextIndex = index + 1;
            if (nextIndex >= indicators.length) nextIndex = 0;
            indicators[nextIndex].focus();
          }
        });
      });
    }
  
    // Initialize with first slide active
    showSlide(0);
  }
  
  // Results section number animation
  function animateNumbers() {
    const numberElements = document.querySelectorAll(".result-number");
  
    numberElements.forEach((element) => {
      const targetValue = parseInt(element.textContent, 10);
      if (!isNaN(targetValue)) {
        const duration = 2000; // 2 seconds
        const increment = targetValue / 50;
        let current = 0;
  
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetValue) {
            element.textContent = targetValue;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(current);
          }
        }, 40);
      }
    });
  }
  
  // Trigger number animation when results section is in view
  const resultsSection = document.querySelector(".results");
  if (resultsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
  
    observer.observe(resultsSection);
  }
});


// header.js - Apple-Inspired Navigation
document.addEventListener("DOMContentLoaded", function () {
  // Add scroll behavior to header
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
      
      // Prevent scrolling when menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
  }
  
  // Dropdown functionality
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    // Desktop behavior
    dropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
    
    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Mobile/tablet click behavior
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      // Close other dropdowns
      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('open');
          otherDropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle this dropdown
      dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
        dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });
  
  // Handle active states
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
      link.classList.add('active');
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = header.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mainNav.classList.contains('active')) {
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          mainNav.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });
  
  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reset mobile menu state on desktop
      if (window.innerWidth > 1024) {
        mainNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        // Reset dropdown states
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('open');
          dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
      }
    }, 150);
  });
  
  // Page loader
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 300);
      }, 300);
    });
    
    // Safety timeout
    setTimeout(() => {
      if (!loader.classList.contains('loaded')) {
        loader.classList.add('loaded');
      }
    }, 3000);
  }
  
  // Performance optimization - Add passive event listeners
  window.addEventListener('scroll', () => {}, { passive: true });
  window.addEventListener('touchstart', () => {}, { passive: true });
  window.addEventListener('touchmove', () => {}, { passive: true });
});
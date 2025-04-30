/**
 * Paul Takisaki Website - Main JavaScript
 * Handles all interactive elements and animations
 */

// Document Ready Function
document.addEventListener("DOMContentLoaded", function() {
  // Add a class to know JS is loaded
  document.body.classList.add('js-loaded');
  
  // Initialize all components
  initPageLoader();
  initStickyHeader();
  initMobileMenu();
  initParticles();
  initTestimonialSlider();
  initScrollAnimations();
  initCustomCursor();
  initContactForm();
  initFloatingActionButton();
  initSmoothScrolling();
});

// Page Loader
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  
  // Hide loader when page is loaded
  window.addEventListener('load', function() {
    hideLoader();
  });
  
  // Failsafe - hide loader after a maximum time
  setTimeout(hideLoader, 2000);
  
  function hideLoader() {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    
    // Remove from DOM after transition
    setTimeout(function() {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 500);
  }
}

// Sticky Header
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  const scrollThreshold = 50;
  
  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  // Initial check
  handleScroll();
  
  // Add scroll event
  window.addEventListener('scroll', handleScroll);
}

// Mobile Menu
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const body = document.body;
  
  if (!menuToggle || !nav) return;
  
  // Create menu overlay element
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  body.appendChild(overlay);
  
  // Toggle main menu
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Add/remove no-scroll to body when menu is open
    body.classList.toggle('no-scroll', nav.classList.contains('active'));
    
    // Close all dropdowns when toggling menu
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  });
  
  // Handle dropdown toggles
  if (dropdownToggles) {
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        // Only prevent default on mobile
        if (window.innerWidth <= 992) {
          e.preventDefault();
        }
        
        const parent = this.parentElement;
        
        // Close other dropdowns
        if (window.innerWidth <= 992) {
          document.querySelectorAll('.dropdown').forEach(dropdown => {
            if (dropdown !== parent) {
              dropdown.classList.remove('active');
            }
          });
        }
        
        // Toggle current dropdown
        parent.classList.toggle('active');
      });
    });
  }
  
  // Close menu when clicking on overlay
  overlay.addEventListener('click', function() {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('no-scroll');
  });
  
  // Close menu when clicking on links (except dropdown toggles)
  const navLinks = nav.querySelectorAll('a:not(.dropdown-toggle)');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  });
  
  // Close menu on resize if window becomes desktop size
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
      
      // Reset dropdowns on desktop
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Add accessibility support for keyboard navigation
  if (dropdownToggles) {
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('keydown', function(e) {
        // Open dropdown on Enter or Space
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }
}

// Particles Effect
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  // Create particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size, position and animation delay
    const size = Math.random() * 6 + 2; // 2-8px
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10; // 10-20s
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Testimonial Slider
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  if (!slides.length || !indicators.length) return;
  
  let currentSlide = 0;
  let slideInterval;
  
  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.position = 'absolute';
    });
    
    // Remove active class from all indicators
    indicators.forEach(dot => dot.classList.remove('active'));
    
    // Show the selected slide
    slides[index].classList.add('active');
    slides[index].style.position = 'relative';
    
    // Update indicator
    indicators[index].classList.add('active');
    
    // Update current slide index
    currentSlide = index;
  }
  
  // Initialize: show first slide
  showSlide(0);
  
  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      clearInterval(slideInterval);
      
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
      
      startAutoSlide();
    });
  }
  
  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      clearInterval(slideInterval);
      
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
      
      startAutoSlide();
    });
  }
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      clearInterval(slideInterval);
      showSlide(index);
      startAutoSlide();
    });
  });
  
  // Auto-rotate slides
  function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(function() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }
  
  // Start auto-rotation
  startAutoSlide();
  
  // Pause on hover
  const sliderContainer = document.querySelector('.testimonial-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', function() {
      startAutoSlide();
    });
  }
}

// Scroll Animations
function initScrollAnimations() {
  // Fade-in elements as they come into view
  const fadeElems = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); // Stop observing once shown
        }
      });
    },
    { threshold: 0.15 }
  );
  
  fadeElems.forEach((elem) => {
    observer.observe(elem);
  });
  
  // Animate stat numbers in results section
  animateStatNumbers();
}

// Animate stat numbers when in view
function animateStatNumbers() {
  const resultBoxes = document.querySelectorAll('.result-box');
  if (!resultBoxes.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numberElement = entry.target.querySelector('.result-number');
          if (numberElement) {
            const finalValue = parseInt(numberElement.textContent, 10);
            if (!isNaN(finalValue)) {
              animateCounter(numberElement, finalValue);
            }
          }
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    { threshold: 0.5 }
  );
  
  resultBoxes.forEach((box) => {
    observer.observe(box);
  });
  
  function animateCounter(element, targetValue, duration = 1500) {
    let startValue = 0;
    const increment = targetValue / (duration / 16);
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const currentValue = Math.min(startValue + (increment * (elapsedTime / 16)), targetValue);
      
      element.textContent = Math.floor(currentValue);
      
      if (currentValue < targetValue) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = targetValue;
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
}

// Custom cursor for desktop
function initCustomCursor() {
  const cursor = document.querySelector('.cursor-follower');
  if (!cursor) return;
  
  // Only for desktop devices
  if (window.innerWidth <= 992) return;
  
  // Show cursor
  cursor.style.display = 'block';
  
  // Update cursor position
  document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = '1';
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  // Hide cursor when mouse leaves window
  document.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
  });
  
  // Slightly enlarge cursor on hoverable elements
  const hoverables = document.querySelectorAll(
    'a, button, .os-card, .service-card'
  );
  
  hoverables.forEach((hoverable) => {
    hoverable.addEventListener('mouseenter', (event) => {
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1.5)`;
      cursor.style.border = '1px solid var(--accent-color)';
      cursor.style.backgroundColor = 'rgba(0, 229, 255, 0.1)';
    });
    
    hoverable.addEventListener('mouseleave', (event) => {
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1)`;
      cursor.style.border = '2px solid var(--accent-color)';
      cursor.style.backgroundColor = 'transparent';
    });
  });
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const inputs = this.querySelectorAll('input, select');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    
    if (isValid) {
      // Get form button
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // Show sending state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate form submission (replace with actual submission logic)
      setTimeout(() => {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <h3>Message Sent!</h3>
          <p>Thank you for your interest. Paul will be in touch soon.</p>
        `;
        
        // Replace form with success message
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
      }, 1500);
    }
  });
}

// Floating Action Button
function initFloatingActionButton() {
  const fabButton = document.querySelector('.fab-button');
  const fabContainer = document.querySelector('.fab-container');
  
  if (!fabButton || !fabContainer) return;
  
  fabButton.addEventListener('click', function() {
    this.classList.toggle('active');
    fabContainer.classList.toggle('active');
    
    // Add haptic feedback if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  });
  
  // Close FAB when clicking an option
  const fabOptions = document.querySelectorAll('.fab-option');
  fabOptions.forEach(option => {
    option.addEventListener('click', function() {
      fabButton.classList.remove('active');
      fabContainer.classList.remove('active');
      
      // Add haptic feedback if supported
      if ('vibrate' in navigator) {
        navigator.vibrate(5);
      }
    });
  });
  
  // Close FAB when clicking outside
  document.addEventListener('click', function(e) {
    if (fabContainer.classList.contains('active') && 
        !fabContainer.contains(e.target) && 
        e.target !== fabButton) {
      fabButton.classList.remove('active');
      fabContainer.classList.remove('active');
    }
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Add haptic feedback if supported
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
      
      // Get header height for offset
      const headerHeight = document.querySelector('.site-header').offsetHeight;
      
      // Calculate position
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight;
      
      // Scroll to target
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}
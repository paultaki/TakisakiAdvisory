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
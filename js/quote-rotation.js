/**
 * Quote Rotation System
 * Displays testimonial quotes in the footer with smooth transitions
 */

// Collection of quotes to display
const quotes = [
    {
        text: "His coaching sharpened my business acumen and equipped me to lead with clarity and purpose.",
        author: "Pritesh",
        title: "Director, Verizon",
        category: "Leadership development"
    },
    {
        text: "He helped me increase my confidence and improve my executive presence as a leader.",
        author: "Cam",
        title: "Sr. Director, Verizon",
        category: "Leadership development"
    },
    {
        text: "Paul's leadership was pivotal in growing our Fixed Wireless Access business.",
        author: "Mike",
        title: "Vice President, Fortune 50",
        category: "Strategic impact"
    },
    {
        text: "He drives best-in-class results through a creative, transparent, and business-first mindset.",
        author: "Zac",
        title: "Director, Verizon",
        category: "Strategic impact"
    },
    {
        text: "Paul's compassion and focus on strengths helped me navigate my career with newfound confidence.",
        author: "Emmanuel",
        title: "Sr. Director, Verizon",
        category: "Personal approach"
    },
    {
        text: "His rare ability to provide undivided attention in one-on-one conversations is truly impressive.",
        author: "Ben",
        title: "Sr. Director, Verizon",
        category: "Personal approach"
    }
];

class QuoteRotation {
    constructor(options = {}) {
        // Default settings
        this.settings = {
            quoteContainerId: 'quote-rotation-container',
            rotationInterval: 8000, // 8 seconds between quotes
            fadeTransitionDuration: 800, // 800ms fade transition
            ...options
        };

        this.currentQuoteIndex = 0;
        this.isPaused = false;
        this.intervalId = null;

        // Elements
        this.container = null;
        this.quoteText = null;
        this.quoteAuthor = null;
        this.navigationDots = null;
        this.navigationControls = null;

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        // Get container element
        this.container = document.getElementById(this.settings.quoteContainerId);
        if (!this.container) return;

        // Create elements for the quote display
        this.createQuoteElements();
        
        // Add event listeners
        this.addEventListeners();
        
        // Set initial quote
        this.displayQuote(this.currentQuoteIndex);
        
        // Start rotation
        this.startRotation();
    }

    createQuoteElements() {
        // Quote content container
        const quoteContent = document.createElement('div');
        quoteContent.className = 'quote-content';
        
        // Quote text with opening and closing quote marks
        const quoteTextContainer = document.createElement('div');
        quoteTextContainer.className = 'quote-text-container';
        
        const openingQuote = document.createElement('span');
        openingQuote.className = 'quote-mark open-quote';
        openingQuote.innerHTML = `<img src="/images/quote_open.webp" alt="Quote" class="h-3 inline mr-2">`;
        
        this.quoteText = document.createElement('span');
        this.quoteText.className = 'quote-text';
        
        const closingQuote = document.createElement('span');
        closingQuote.className = 'quote-mark close-quote';
        closingQuote.innerHTML = `<img src="/images/quote_closed.webp" alt="Quote" class="h-3 inline ml-2">`;
        
        quoteTextContainer.appendChild(openingQuote);
        quoteTextContainer.appendChild(this.quoteText);
        quoteTextContainer.appendChild(closingQuote);
        
        // Quote attribution
        this.quoteAuthor = document.createElement('div');
        this.quoteAuthor.className = 'quote-author';
        
        quoteContent.appendChild(quoteTextContainer);
        quoteContent.appendChild(this.quoteAuthor);
        
        // Navigation dots
        this.navigationDots = document.createElement('div');
        this.navigationDots.className = 'quote-nav-dots';
        
        quotes.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'quote-dot';
            dot.setAttribute('aria-label', `Quote ${index + 1}`);
            dot.dataset.index = index;
            this.navigationDots.appendChild(dot);
        });
        
        // Navigation controls
        this.navigationControls = document.createElement('div');
        this.navigationControls.className = 'quote-controls';
        
        // Previous button
        const prevButton = document.createElement('button');
        prevButton.className = 'quote-prev';
        prevButton.setAttribute('aria-label', 'Previous quote');
        prevButton.innerHTML = '&#10094;';
        
        // Pause/play button
        this.pauseButton = document.createElement('button');
        this.pauseButton.className = 'quote-pause';
        this.pauseButton.setAttribute('aria-label', 'Pause quote rotation');
        this.pauseButton.innerHTML = '&#10074;&#10074;';
        
        // Next button
        const nextButton = document.createElement('button');
        nextButton.className = 'quote-next';
        nextButton.setAttribute('aria-label', 'Next quote');
        nextButton.innerHTML = '&#10095;';
        
        this.navigationControls.appendChild(prevButton);
        this.navigationControls.appendChild(this.pauseButton);
        this.navigationControls.appendChild(nextButton);
        
        // Add all elements to container
        this.container.appendChild(quoteContent);
        this.container.appendChild(this.navigationDots);
        this.container.appendChild(this.navigationControls);
    }

    addEventListeners() {
        // Dot navigation
        const dots = this.navigationDots.querySelectorAll('.quote-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                this.goToQuote(index);
            });
        });
        
        // Previous button
        const prevButton = this.navigationControls.querySelector('.quote-prev');
        prevButton.addEventListener('click', () => this.prevQuote());
        
        // Next button
        const nextButton = this.navigationControls.querySelector('.quote-next');
        nextButton.addEventListener('click', () => this.nextQuote());
        
        // Pause button
        this.pauseButton.addEventListener('click', () => this.togglePause());
        
        // Show controls on hover, hide otherwise
        this.container.addEventListener('mouseenter', () => {
            this.navigationControls.classList.add('visible');
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.navigationControls.classList.remove('visible');
        });
    }

    displayQuote(index) {
        // Update current quote index
        this.currentQuoteIndex = index;
        
        // Fade out
        this.container.classList.add('fade-out');
        
        // After fade out, update content and fade back in
        setTimeout(() => {
            // Update text and author with title
            this.quoteText.textContent = quotes[index].text;
            this.quoteAuthor.textContent = `— ${quotes[index].author}, ${quotes[index].title}`;
            
            // Update active dot
            const dots = this.navigationDots.querySelectorAll('.quote-dot');
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Fade in
            this.container.classList.remove('fade-out');
        }, this.settings.fadeTransitionDuration / 2);
    }

    prevQuote() {
        let newIndex = this.currentQuoteIndex - 1;
        if (newIndex < 0) newIndex = quotes.length - 1;
        this.goToQuote(newIndex);
    }

    nextQuote() {
        let newIndex = this.currentQuoteIndex + 1;
        if (newIndex >= quotes.length) newIndex = 0;
        this.goToQuote(newIndex);
    }

    goToQuote(index) {
        // Reset the timer
        this.resetRotationTimer();
        
        // Display the quote
        this.displayQuote(index);
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            // Update button to play symbol
            this.pauseButton.innerHTML = '&#9658;';
            this.pauseButton.setAttribute('aria-label', 'Resume quote rotation');
            
            // Clear interval
            clearInterval(this.intervalId);
            this.intervalId = null;
        } else {
            // Update button to pause symbol
            this.pauseButton.innerHTML = '&#10074;&#10074;';
            this.pauseButton.setAttribute('aria-label', 'Pause quote rotation');
            
            // Restart rotation
            this.startRotation();
        }
    }

    startRotation() {
        if (this.isPaused) return;
        
        // Clear any existing interval
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        // Set new interval
        this.intervalId = setInterval(() => {
            this.nextQuote();
        }, this.settings.rotationInterval);
    }

    resetRotationTimer() {
        // Reset the timer only if not paused
        if (!this.isPaused) {
            clearInterval(this.intervalId);
            this.startRotation();
        }
    }
}

// Initialize quote rotation when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create the quote rotation system
    window.quoteRotation = new QuoteRotation({
        // You can customize the settings here
        rotationInterval: 8000 // 8 seconds between quotes
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const testimonials = [
        {
            text: "Paul consistently demonstrated excellence as a sales leader, achieving Verizon's highest sales honor, the President's Cabinet, four times. His ability to drive results and elevate his teams is unmatched.",
            author: "Mike Caralis"
        },
        {
            text: "Paul is a role model for active listening, intellectual curiosity, and smart competitiveness. He knows how to win while also lifting others up.",
            author: "Chris Shank"
        },
        {
            text: "Paul brings a calm, strategic, and empowering leadership style. He analyzes complex data and turns it into actionable strategies that drive real results.",
            author: "Michael Caralis"
        },
        {
            text: "Paul has a rare ability to simplify complex challenges into clear, actionable steps. His strength lies in breaking problems down and communicating the strategy effectively.",
            author: "Todd Mundy"
        },
        {
            text: "Paul fosters a culture of empowerment and innovation. He listens to the frontline and translates their insights into team-driven initiatives that fuel performance.",
            author: "Jon Buia"
        },
        {
            text: "I've seen Paul lead sales leaders, tech consultants, and ops teams—all with the same level of excellence. He drives results with a creative, business-first, and transparent mindset.",
            author: "Zac Lagen"
        },
        {
            text: "Paul is an exceptional listener and decision-maker. He reads the audience, adapts quickly, and guides teams toward the best outcomes. He's one of the most empowering leaders I've worked with.",
            author: "Alla Reznik"
        }
    ];

    const leftSlide = document.querySelector(".testimonial-left");
    const rightSlide = document.querySelector(".testimonial-right");
    
    if (!leftSlide || !rightSlide) {
        console.error("❌ Testimonial slide containers not found. Check your HTML structure.");
        return;
    }

    let usedIndices = new Set();
    
    function getRandomIndex() {
        if (usedIndices.size === testimonials.length) {
            usedIndices.clear();
        }
        
        let index;
        do { 
            index = Math.floor(Math.random() * testimonials.length);
        } while (usedIndices.has(index));
        
        usedIndices.add(index);
        return index;
    }

    function updateTestimonial(element, testimonial) {
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.innerHTML = `
                <div class="testimonial-content">
                    <p class="testimonial-text">${testimonial.text}</p>
                    <p class="testimonial-author">- ${testimonial.author}</p>
                </div>
            `;
            element.style.opacity = '1';
        }, 500);
    }

    function rotateTestimonials() {
        const leftIndex = getRandomIndex();
        let rightIndex;
        do {
            rightIndex = getRandomIndex();
        } while (rightIndex === leftIndex);

        updateTestimonial(leftSlide, testimonials[leftIndex]);
        updateTestimonial(rightSlide, testimonials[rightIndex]);
    }

    // Initialize testimonials
    rotateTestimonials();

    // Rotate every 8 seconds
    setInterval(rotateTestimonials, 8000);

    // Handle Quiz Form
// In your script.js, update the quiz event listener:
document.getElementById("sales-quiz").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = 'Generating Insights...';
    submitButton.disabled = true;

    const teamSize = document.getElementById("team-size").value;
    const challenge = document.getElementById("biggest-challenge").value;

    const prompt = `I am a sales consultant. A user with a ${teamSize} sales team is struggling with ${challenge}. Provide a 3-sentence AI-driven recommendation.`;

    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const resultDiv = document.getElementById("quiz-results");
            resultDiv.innerHTML = `
                <p><strong>AI Insights:</strong></p>
                <p>${data.choices[0].text.trim()}</p>
            `;
            resultDiv.classList.remove("hidden");
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("quiz-results").innerHTML = `
            <p><strong>Error:</strong> Unable to fetch AI insights at this time. Please try again later.</p>
        `;
        document.getElementById("quiz-results").classList.remove("hidden");
    } finally {
        // Restore button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});
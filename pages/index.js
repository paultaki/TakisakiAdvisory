import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
    /*** 🏆 Testimonials Data 🏆 ***/
    const testimonials = [
        { text: "Paul consistently demonstrated excellence as a sales leader, achieving Verizon's highest sales honor, the President's Cabinet, four times. His ability to drive results and elevate his teams is unmatched.", author: "Mike Caralis" },
        { text: "Paul is a role model for active listening, intellectual curiosity, and smart competitiveness. He knows how to win while also lifting others up.", author: "Chris Shank" },
        { text: "Paul brings a calm, strategic, and empowering leadership style. He analyzes complex data and turns it into actionable strategies that drive real results.", author: "Michael Caralis" },
        { text: "Paul has a rare ability to simplify complex challenges into clear, actionable steps. His strength lies in breaking problems down and communicating the strategy effectively.", author: "Todd Mundy" },
        { text: "Paul fosters a culture of empowerment and innovation. He listens to the frontline and translates their insights into team-driven initiatives that fuel performance.", author: "Jon Buia" },
        { text: "I've seen Paul lead sales leaders, tech consultants, and ops teams—all with the same level of excellence. He drives results with a creative, business-first, and transparent mindset.", author: "Zac Lagen" },
        { text: "Paul is an exceptional listener and decision-maker. He reads the audience, adapts quickly, and guides teams toward the best outcomes. He's one of the most empowering leaders I've worked with.", author: "Alla Reznik" }
    ];

    // React state to store the testimonials
    const [leftTestimonial, setLeftTestimonial] = useState(testimonials[0]);
    const [rightTestimonial, setRightTestimonial] = useState(testimonials[1]);

    // Rotate testimonials every 8 seconds
    useEffect(() => {
        const rotateTestimonials = () => {
            let leftIndex = Math.floor(Math.random() * testimonials.length);
            let rightIndex;
            do {
                rightIndex = Math.floor(Math.random() * testimonials.length);
            } while (rightIndex === leftIndex);

            setLeftTestimonial(testimonials[leftIndex]);
            setRightTestimonial(testimonials[rightIndex]);
        };

        const interval = setInterval(rotateTestimonials, 8000);
        return () => clearInterval(interval);
    }, []);

    // AI Quiz Submission Handling
    const [quizResult, setQuizResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleQuizSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const teamSize = event.target["team-size"].value;
        const challenge = event.target["biggest-challenge"].value;

        const prompt = `I am a sales consultant. A user with a ${teamSize} sales team is struggling with ${challenge}. Provide a 3-sentence AI-driven recommendation.`;

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) throw new Error("API request failed");
            const data = await response.json();

            setQuizResult(data.choices[0]?.text.trim() || "No insights available.");
        } catch (error) {
            setQuizResult("Error fetching AI insights. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Scale AI, SaaS & B2B Startups | Expert GTM & Sales Growth</title>
                <meta name="description" content="Unlock predictable revenue growth with expert GTM strategy, sales process optimization, and Fractional CRO consulting for AI, SaaS & B2B startups." />
                <link rel="icon" type="image/png" href="/images/favicon.webp" />
            </Head>

            <header className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>Scale B2B Startups with Proven Sales Playbooks</h1>
                    <p>Transform your sales team into a revenue machine with expert GTM strategy.</p>
                    <a href="https://calendly.com/paultakisaki-info" className="cta-button cta-primary">Book Your Free GTM Audit 🚀</a>
                </div>
            </header>

            <div className="container">
                {/* Testimonials Section */}
                <section className="testimonials-section">
                    <h2>What Our Clients Say</h2>
                    <div className="testimonials-container">
                        <div className="testimonial testimonial-left">
                            <p className="testimonial-text">"{leftTestimonial.text}"</p>
                            <p className="testimonial-author">- {leftTestimonial.author}</p>
                        </div>
                        <div className="testimonial testimonial-right">
                            <p className="testimonial-text">"{rightTestimonial.text}"</p>
                            <p className="testimonial-author">- {rightTestimonial.author}</p>
                        </div>
                    </div>
                </section>

                {/* AI Quiz Section */}
                <section className="ai-quiz">
                    <div className="quiz-container">
                        <h2>🚀 AI-Powered Sales Strategy Quiz</h2>
                        <p className="quiz-subtitle">Discover what's holding your sales team back and get instant, AI-generated insights.</p>
                        <form onSubmit={handleQuizSubmit}>
                            <div className="form-group">
                                <label htmlFor="team-size">How big is your sales team?</label>
                                <select id="team-size" name="team-size">
                                    <option value="small">1-5</option>
                                    <option value="medium">6-20</option>
                                    <option value="large">21+</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="biggest-challenge">What's your biggest sales challenge?</label>
                                <select id="biggest-challenge" name="biggest-challenge">
                                    <option value="pipeline">Inconsistent pipeline</option>
                                    <option value="closing">Low close rates</option>
                                    <option value="competition">Losing to competitors</option>
                                </select>
                            </div>

                            <button type="submit" className="cta-button" disabled={loading}>
                                {loading ? "Generating Insights..." : "Get My AI Insights 🚀"}
                            </button>
                        </form>
                        {quizResult && <div id="quiz-results"><p>{quizResult}</p></div>}
                    </div>
                </section>
            </div>

            <footer>
                <p>&copy; 2024 Takisaki Advisory | All Rights Reserved | Contact: <a href="mailto:info@paultakisaki.com">info@paultakisaki.com</a></p>
            </footer>
        </>
    );
}

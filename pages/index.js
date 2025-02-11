import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
    console.log("✅ Home Component Rendered");

    useEffect(() => {
        console.log("✅ Checking for missing sections...");
    }, []);
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
                {/* 🔥 MISSING "What I Fix" SECTION FIXED 🔥 */}
                <section className="services">
                    <h2>What I Fix</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <h3>🚀 Your Revenue Has Stalled</h3>
                            <p>Slow growth, long sales cycles, and inconsistent pipelines.</p>
                            <strong>✅ Solution:</strong> GTM strategy audit, sales motion fixes, and revenue engine optimization.
                        </div>
                        <div className="service-card">
                            <h3>📈 Your Sales Team Is Missing Quotas</h3>
                            <p>Underperforming reps, lost deals, and objection struggles.</p>
                            <strong>✅ Solution:</strong> Sales process optimization, ICP refinement, and elite coaching.
                        </div>
                        <div className="service-card">
                            <h3>🎯 Your Competitors Are Scaling Faster</h3>
                            <p>Losing deals, weak positioning, or falling behind in market share.</p>
                            <strong>✅ Solution:</strong> Product repositioning, pricing adjustments, and market strategy.
                        </div>
                    </div>
                </section>



                {/* 🔥 Check if "Meet Paul Takisaki" is being processed */}
                {console.log("🔍 Rendering 'Meet Paul Takisaki' Section")}
                <section className="about-section">
                    <h2>Meet Paul Takisaki</h2>
                    <div className="about-container">
                        <div className="about-image">
                            <img src="/images/headshot.webp" alt="Paul Takisaki" />
                        </div>
                        <div className="about-content">
                            <ul className="about-list">
                                <li>🚀 <strong>20+ years scaling B2B, SaaS & AI startups</strong></li>
                                <li>🏆 <strong>4x Verizon President's Cabinet Winner</strong></li>
                                <li>🔥 <strong>Expert in GTM, ICP targeting, & deal conversion</strong></li>
                                <li>📈 <strong>Built high-performing sales teams that smashed revenue goals</strong></li>
                            </ul>
                            <img src="/images/pc.webp" alt="President's Cabinet Badge" className="award-badge" style={{ width: "150px", height: "auto" }} />
                            <a href="https://calendly.com/paultakisaki-info" className="cta-button">Let's Build Your Sales Engine 🚀</a>
                        </div>
                    </div>
                </section>
            </div>

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
            </div>

            <footer>
                <p>&copy; 2024 Takisaki Advisory | All Rights Reserved | Contact: <a href="mailto:info@paultakisaki.com">info@paultakisaki.com</a></p>
            </footer>
        </>
    );
}

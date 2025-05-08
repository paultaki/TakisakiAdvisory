// THE CONSTELLATION OF CONFIDENCE
// Interactive testimonial mythology system

class ConstellationOfConfidence {
  constructor(container) {
    this.container = container;
    this.stars = [];
    this.activeConnections = [];
    this.revealedPattern = false;
    this.constellationData = this.generateConstellationData();

    this.init();
    this.createConstellation();
    this.bindEvents();
    this.animate();
  }

  init() {
    // Create canvas for constellation
    this.canvas = document.createElement("canvas");
    this.canvas.classList.add("constellation-canvas");
    this.container.appendChild(this.canvas);

    // Style canvas
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";

    // Set canvas size
    this.resizeCanvas();

    // Get context
    this.ctx = this.canvas.getContext("2d");

    // Create testimonial container
    this.testimonialContainer = document.createElement("div");
    this.testimonialContainer.classList.add("testimonial-container");
    this.container.appendChild(this.testimonialContainer);

    // Style testimonial container
    Object.assign(this.testimonialContainer.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "10",
    });

    // Start with no active testimonial
    this.activeTestimonial = null;

    // Create revelation pattern container
    this.patternContainer = document.createElement("div");
    this.patternContainer.classList.add("pattern-container");
    this.container.appendChild(this.patternContainer);

    // Style pattern container
    Object.assign(this.patternContainer.style, {
      position: "absolute",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "20px 40px",
      borderRadius: "40px",
      background: "rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: "0",
      transition: "opacity 0.8s ease",
      pointerEvents: "none",
      zIndex: "20",
    });

    // Create pattern text
    this.patternText = document.createElement("div");
    this.patternText.classList.add("pattern-text");
    this.patternContainer.appendChild(this.patternText);

    // Style pattern text
    Object.assign(this.patternText.style, {
      color: "#fff",
      fontSize: "28px",
      fontWeight: "bold",
    });
  }

  resizeCanvas() {
    // Set canvas dimensions to match container
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;

    // Regenerate star positions when resized
    if (this.stars.length > 0) {
      this.distributeStars();
    }
  }

  generateConstellationData() {
    // Define company success stories and their connections
    return {
      stars: [
        {
          id: "fintech-leader",
          name: "Leading Financial Services Provider",
          testimonial:
            "StratusAI's Opportunity Gap Matrix revealed three underserved segments our internal analysis missed. We're showing 74.2% new account growth in those sectors.",
          color: "#5E9BF9",
          size: 1.2,
          metrics: [
            {
              id: "87-percent",
              value: "87%",
              description: "reduction in decision friction",
            },
            { id: "3x-roi", value: "3.2×", description: "ROI within 6 months" },
          ],
        },
        {
          id: "tech-innovator",
          name: "Global Technology Leader",
          testimonial:
            "StratusAI's predictive engine helped us identify acquisition targets before they appeared on anyone's radar. Two strategic purchases later, our market position has grown 28%.",
          color: "#F9DE5E",
          size: 1.3,
          metrics: [
            { id: "3x-roi", value: "3.2×", description: "ROI within 6 months" },
            {
              id: "28-percent",
              value: "28%",
              description: "market share growth",
            },
          ],
        },
        {
          id: "healthcare-disruptor",
          name: "Healthcare Innovation Company",
          testimonial:
            "Before StratusAI, our market signals were scattered across 14 dashboards. Now, The Oracle reveals patterns we never knew existed. We've accelerated product development by 87% while reducing decision lag.",
          color: "#5EF9A9",
          size: 1.1,
          metrics: [
            {
              id: "87-percent",
              value: "87%",
              description: "reduction in decision friction",
            },
            {
              id: "28-percent",
              value: "28%",
              description: "market share growth",
            },
          ],
        },
        {
          id: "retail-transformer",
          name: "Retail Transformation Leader",
          testimonial:
            "The Constellation of Confidence showed us our transformation path mirrored successful retail disruptors. We followed the pattern and achieved 3.2× ROI within four months.",
          color: "#F95E96",
          size: 1,
          metrics: [
            { id: "3x-roi", value: "3.2×", description: "ROI within 6 months" },
            {
              id: "87-percent",
              value: "87%",
              description: "reduction in decision friction",
            },
          ],
        },
        {
          id: "manufacturing-pioneer",
          name: "Manufacturing Pioneer",
          testimonial:
            "StratusAI's Signal Intelligence detected suppliers at risk before any traditional metrics showed warning signs. This saved us $42M in potential disruption and increased market share by 28%.",
          color: "#9B5EF9",
          size: 1.2,
          metrics: [
            {
              id: "28-percent",
              value: "28%",
              description: "market share growth",
            },
            {
              id: "87-percent",
              value: "87%",
              description: "reduction in decision friction",
            },
          ],
        },
        {
          id: "energy-innovator",
          name: "Sustainable Energy Innovator",
          testimonial:
            "The Oracle revealed market timing opportunities invisible to traditional analytics. We entered three markets at optimal moments, achieving 3.2× ROI across all initiatives.",
          color: "#F9915E",
          size: 1.1,
          metrics: [
            { id: "3x-roi", value: "3.2×", description: "ROI within 6 months" },
            {
              id: "28-percent",
              value: "28%",
              description: "market share growth",
            },
          ],
        },
        {
          id: "logistics-leader",
          name: "Global Logistics Leader",
          testimonial:
            "Orbital Navigation through market signals identified 87% more optimization opportunities than our previous intelligence systems. The Decision Horizon orbit transformed how we prioritize expansion.",
          color: "#5EF4F9",
          size: 1,
          metrics: [
            {
              id: "87-percent",
              value: "87%",
              description: "reduction in decision friction",
            },
            { id: "3x-roi", value: "3.2×", description: "ROI within 6 months" },
          ],
        },
      ],
      connections: [
        {
          stars: ["fintech-leader", "tech-innovator"],
          metric: "3x-roi",
          color: "#F9DE5E",
        },
        {
          stars: ["tech-innovator", "healthcare-disruptor"],
          metric: "28-percent",
          color: "#5EF9A9",
        },
        {
          stars: ["healthcare-disruptor", "fintech-leader"],
          metric: "87-percent",
          color: "#5E9BF9",
        },
        {
          stars: ["retail-transformer", "manufacturing-pioneer"],
          metric: "87-percent",
          color: "#5E9BF9",
        },
        {
          stars: ["manufacturing-pioneer", "energy-innovator"],
          metric: "28-percent",
          color: "#5EF9A9",
        },
        {
          stars: ["energy-innovator", "retail-transformer"],
          metric: "3x-roi",
          color: "#F9DE5E",
        },
        {
          stars: ["logistics-leader", "fintech-leader"],
          metric: "87-percent",
          color: "#5E9BF9",
        },
        {
          stars: ["logistics-leader", "energy-innovator"],
          metric: "3x-roi",
          color: "#F9DE5E",
        },
      ],
      metricColors: {
        "87-percent": "#5E9BF9", // Electric blue
        "3x-roi": "#F9DE5E", // Amber
        "28-percent": "#5EF9A9", // Verdant energy
      },
    };
  }

  createConstellation() {
    // Create stars based on constellation data
    this.stars = this.constellationData.stars.map((starData) => {
      return {
        id: starData.id,
        name: starData.name,
        testimonial: starData.testimonial,
        x: 0, // Will be set in distributeStars
        y: 0, // Will be set in distributeStars
        color: starData.color,
        baseRadius: starData.size * 5,
        radius: starData.size * 5,
        targetRadius: starData.size * 5,
        hovered: false,
        active: false,
        metrics: starData.metrics,
        opacity: 0, // For fade-in animation
        targetOpacity: 1,
        pulseFactor: Math.random() * 2, // For individual pulsing
        pulseOffset: Math.random() * Math.PI * 2, // Random phase offset
      };
    });

    // Distribute stars across the canvas
    this.distributeStars();

    // Create connections data
    this.connections = this.constellationData.connections.map((conn) => {
      const star1 = this.stars.find((s) => s.id === conn.stars[0]);
      const star2 = this.stars.find((s) => s.id === conn.stars[1]);

      return {
        star1: star1,
        star2: star2,
        metric: conn.metric,
        color: conn.color,
        active: false,
        opacity: 0,
        targetOpacity: 0,
      };
    });
  }

  distributeStars() {
    // Set positions for stars using a semi-random distribution
    // that ensures stars are not too close to each other

    const padding = 100; // Minimum distance from edges
    const width = this.canvas.width - padding * 2;
    const height = this.canvas.height - padding * 2;
    const minDistance = 100; // Minimum distance between stars

    // Generate potential positions
    const potentialPositions = [];

    // Try to place stars with minimum distance between them
    for (let i = 0; i < this.stars.length; i++) {
      let position = null;
      let attempts = 0;

      while (!position && attempts < 50) {
        // Generate random position
        const x = padding + Math.random() * width;
        const y = padding + Math.random() * height;
        let valid = true;

        // Check distance from other stars
        for (let j = 0; j < potentialPositions.length; j++) {
          const dist = Math.sqrt(
            Math.pow(x - potentialPositions[j].x, 2) +
              Math.pow(y - potentialPositions[j].y, 2)
          );

          if (dist < minDistance) {
            valid = false;
            break;
          }
        }

        if (valid) {
          position = { x, y };
          potentialPositions.push(position);
        }

        attempts++;
      }

      // If couldn't find valid position, just place randomly
      if (!position) {
        position = {
          x: padding + Math.random() * width,
          y: padding + Math.random() * height,
        };
        potentialPositions.push(position);
      }

      // Set star position
      this.stars[i].x = position.x;
      this.stars[i].y = position.y;
    }
  }

  drawStar(star) {
    // Draw star glow
    this.ctx.beginPath();
    const gradient = this.ctx.createRadialGradient(
      star.x,
      star.y,
      0,
      star.x,
      star.y,
      star.radius * 4
    );
    gradient.addColorStop(
      0,
      `${star.color}${Math.floor(star.opacity * 0.7 * 255)
        .toString(16)
        .padStart(2, "0")}`
    );
    gradient.addColorStop(1, `${star.color}00`);

    this.ctx.fillStyle = gradient;
    this.ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw star core
    this.ctx.beginPath();
    this.ctx.fillStyle = `${star.color}${Math.floor(star.opacity * 255)
      .toString(16)
      .padStart(2, "0")}`;
    this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw brighter center
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.8})`;
    this.ctx.arc(star.x, star.y, star.radius * 0.6, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawConnection(conn) {
    if (conn.opacity <= 0.01) return;

    // Draw line between stars with gradient
    this.ctx.beginPath();
    const gradient = this.ctx.createLinearGradient(
      conn.star1.x,
      conn.star1.y,
      conn.star2.x,
      conn.star2.y
    );
    gradient.addColorStop(
      0,
      `${conn.star1.color}${Math.floor(conn.opacity * 255)
        .toString(16)
        .padStart(2, "0")}`
    );
    gradient.addColorStop(
      1,
      `${conn.star2.color}${Math.floor(conn.opacity * 255)
        .toString(16)
        .padStart(2, "0")}`
    );

    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(conn.star1.x, conn.star1.y);
    this.ctx.lineTo(conn.star2.x, conn.star2.y);
    this.ctx.stroke();

    // Draw metric pulse along the line
    if (conn.active) {
      this.drawMetricPulse(conn);
    }
  }

  drawMetricPulse(conn) {
    // Get metric color
    const metricColor = this.constellationData.metricColors[conn.metric];

    // Calculate time-based pulse position (0 to 1)
    const time = performance.now() / 1000;
    const pulsePos = (time % 3) / 3; // Repeat every 3 seconds

    // Calculate point along the line
    const x = conn.star1.x + (conn.star2.x - conn.star1.x) * pulsePos;
    const y = conn.star1.y + (conn.star2.y - conn.star1.y) * pulsePos;

    // Draw pulse
    this.ctx.beginPath();
    const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 20);
    gradient.addColorStop(
      0,
      `${metricColor}${Math.floor(conn.opacity * 255)
        .toString(16)
        .padStart(2, "0")}`
    );
    gradient.addColorStop(1, `${metricColor}00`);

    this.ctx.fillStyle = gradient;
    this.ctx.arc(x, y, 20, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw metric value at midpoint on first pulse
    if (pulsePos < 0.1 && !conn.labelDrawn) {
      // Calculate midpoint
      const midX = (conn.star1.x + conn.star2.x) / 2;
      const midY = (conn.star1.y + conn.star2.y) / 2;

      // Draw metric label
      this.ctx.font = "bold 16px Arial";
      this.ctx.fillStyle = metricColor;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";

      // Get metric value text
      const metric = this.constellationData.stars[0].metrics.find(
        (m) => m.id === conn.metric
      );
      if (metric) {
        this.ctx.fillText(metric.value, midX, midY - 15);
      }

      conn.labelDrawn = true;
    }

    // Reset label drawn flag after pulse completes
    if (pulsePos > 0.9) {
      conn.labelDrawn = false;
    }
  }

  showTestimonial(star) {
    // Remove any existing testimonial
    this.hideTestimonial();

    // Create testimonial element
    const testimonial = document.createElement("div");
    testimonial.classList.add("testimonial");

    // Style testimonial
    Object.assign(testimonial.style, {
      position: "absolute",
      top: `${star.y + 20}px`,
      left: `${star.x}px`,
      transform: "translate(-50%, 0)",
      padding: "20px",
      width: "300px",
      background: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(10px)",
      borderRadius: "15px",
      color: "#fff",
      boxShadow: `0 0 20px ${star.color}40`,
      border: `1px solid ${star.color}50`,
      opacity: "0",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      pointerEvents: "auto",
      zIndex: "100",
    });

    // Add content
    testimonial.innerHTML = `
      <h3 style="font-size: 18px; margin: 0 0 10px 0;">${star.name}</h3>
      <p style="font-size: 14px; line-height: 1.5; margin: 0 0 15px 0;">${
        star.testimonial
      }</p>
      <div style="display: flex; justify-content: space-between;">
        ${star.metrics
          .map(
            (metric) => `
          <div style="text-align: center;">
            <div style="font-size: 20px; font-weight: bold; color: ${
              this.constellationData.metricColors[metric.id]
            };">${metric.value}</div>
            <div style="font-size: 12px; opacity: 0.8;">${
              metric.description
            }</div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    // Add to container
    this.testimonialContainer.appendChild(testimonial);
    this.activeTestimonial = testimonial;

    // Animate in
    setTimeout(() => {
      testimonial.style.opacity = "1";
      testimonial.style.transform = "translate(-50%, 0)";
    }, 10);

    // Highlight connections for this star
    this.highlightStarConnections(star);
  }

  hideTestimonial() {
    if (this.activeTestimonial) {
      this.activeTestimonial.style.opacity = "0";

      setTimeout(() => {
        if (this.activeTestimonial && this.activeTestimonial.parentNode) {
          this.testimonialContainer.removeChild(this.activeTestimonial);
          this.activeTestimonial = null;
        }
      }, 500);
    }
  }

  highlightStarConnections(star) {
    // Reset active connections
    this.activeConnections = [];

    // Find connections for this star
    this.connections.forEach((conn) => {
      if (conn.star1 === star || conn.star2 === star) {
        conn.active = true;
        conn.targetOpacity = 1;
        this.activeConnections.push(conn);

        // Also activate the connected star
        const connectedStar = conn.star1 === star ? conn.star2 : conn.star1;
        connectedStar.targetRadius = connectedStar.baseRadius * 1.5;
      } else {
        conn.active = false;
        conn.targetOpacity = 0;
      }
    });

    // Check if we have 3 active metrics (a complete pattern)
    this.checkForRevealationPattern();
  }

  checkForRevealationPattern() {
    if (this.activeConnections.length < 2) return;

    // Get unique metrics in active connections
    const activeMetrics = new Set();
    this.activeConnections.forEach((conn) => {
      activeMetrics.add(conn.metric);
    });

    // If we have all three metrics, show the pattern
    if (
      activeMetrics.size >= 3 ||
      (this.activeConnections.length >= 3 && activeMetrics.size >= 2)
    ) {
      this.revealPattern();
    } else {
      this.hidePattern();
    }
  }

  revealPattern() {
    if (this.revealedPattern) return;

    // Set pattern text
    this.patternText.innerHTML = "87% → 3.2× → 28%";

    // Show pattern container
    this.patternContainer.style.opacity = "1";
    this.patternContainer.style.pointerEvents = "auto";

    // Create "your future" prompt
    const futurePrompt = document.createElement("div");
    futurePrompt.classList.add("future-prompt");
    futurePrompt.textContent = "Do you see your future forming?";

    // Style prompt
    Object.assign(futurePrompt.style, {
      position: "absolute",
      top: "-40px",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#fff",
      fontSize: "18px",
      whiteSpace: "nowrap",
      opacity: "0",
      transition: "opacity 1s ease 0.5s", // Delay appearance
    });

    // Add prompt to pattern container
    this.patternContainer.appendChild(futurePrompt);

    // Fade in prompt
    setTimeout(() => {
      futurePrompt.style.opacity = "1";
    }, 10);

    // Add click functionality to pattern
    this.patternContainer.style.cursor = "pointer";
    this.patternContainer.addEventListener(
      "click",
      this.showRevelationJourney.bind(this),
      { once: true }
    );

    this.revealedPattern = true;
  }

  hidePattern() {
    if (!this.revealedPattern) return;

    // Hide pattern container
    this.patternContainer.style.opacity = "0";
    this.patternContainer.style.pointerEvents = "none";

    // Remove any future prompt
    const futurePrompt = this.patternContainer.querySelector(".future-prompt");
    if (futurePrompt) {
      this.patternContainer.removeChild(futurePrompt);
    }

    this.revealedPattern = false;
  }

  showRevelationJourney() {
    // Create the revelation journey overlay
    const overlay = document.createElement("div");
    overlay.classList.add("revelation-journey");

    // Style overlay
    Object.assign(overlay.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(20px)",
      zIndex: "1000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: "0",
      transition: "opacity 0.8s ease",
    });

    // Create journey content
    overlay.innerHTML = `
      <div class="journey-content" style="max-width: 800px; padding: 40px; background: rgba(255, 255, 255, 0.05); border-radius: 20px; text-align: center; transform: scale(0.9); transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1); color: #fff;">
        <h2 style="font-size: 36px; margin-bottom: 30px;">Your Revelation Journey</h2>
        
        <div class="journey-path" style="position: relative; height: 120px; margin: 50px 0;">
          <div style="position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: rgba(255, 255, 255, 0.2); transform: translateY(-50%);"></div>
          
          <div class="journey-node" style="position: absolute; top: 50%; left: 10%; transform: translate(-50%, -50%);">
            <div style="width: 20px; height: 20px; border-radius: 50%; background: #5E9BF9; box-shadow: 0 0 20px rgba(94, 155, 249, 0.5);" data-metric="87-percent"></div>
            <div style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 16px;">Decision Clarity</div>
            <div style="position: absolute; top: 30px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 24px; font-weight: bold;">87%</div>
          </div>
          
          <div class="journey-node" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <div style="width: 20px; height: 20px; border-radius: 50%; background: #F9DE5E; box-shadow: 0 0 20px rgba(249, 222, 94, 0.5);" data-metric="3x-roi"></div>
            <div style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 16px;">Implementation ROI</div>
            <div style="position: absolute; top: 30px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 24px; font-weight: bold;">3.2×</div>
          </div>
          
          <div class="journey-node" style="position: absolute; top: 50%; left: 90%; transform: translate(-50%, -50%);">
            <div style="width: 20px; height: 20px; border-radius: 50%; background: #5EF9A9; box-shadow: 0 0 20px rgba(94, 249, 169, 0.5);" data-metric="28-percent"></div>
            <div style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 16px;">Market Transformation</div>
            <div style="position: absolute; top: 30px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 24px; font-weight: bold;">28%</div>
          </div>
        </div>
        
        <p style="font-size: 18px; margin: 30px 0;">Based on your interaction with The Oracle and the Constellation, we've identified your optimal transformation pattern.</p>
        
        <p style="font-size: 16px; opacity: 0.8; margin: 30px 0;">This journey reveals how you'll reduce decision friction by 87%, achieve 3.2× ROI on implementation, and grow market share by 28% in targeted segments.</p>
        
        <div style="margin-top: 50px;">
          <button class="continue-button" style="padding: 15px 30px; background: linear-gradient(45deg, #5E9BF9, #F9DE5E, #5EF9A9); border: none; border-radius: 30px; color: #fff; font-size: 18px; cursor: pointer;">Continue Your Transformation</button>
        </div>
      </div>
    `;

    // Add to DOM
    document.body.appendChild(overlay);

    // Animate in
    setTimeout(() => {
      overlay.style.opacity = "1";
      const content = overlay.querySelector(".journey-content");
      content.style.transform = "scale(1)";
    }, 10);

    // Animate journey path
    setTimeout(() => {
      const nodes = overlay.querySelectorAll(".journey-node");

      // Animate metrics pulse
      nodes.forEach((node, index) => {
        setTimeout(() => {
          const dot = node.querySelector("div[data-metric]");
          dot.style.transition =
            "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s cubic-bezier(0.19, 1, 0.22, 1)";
          dot.style.transform = "scale(1.5)";
          dot.style.boxShadow = `0 0 30px ${dot.style.backgroundColor}`;

          setTimeout(() => {
            dot.style.transform = "scale(1)";
            dot.style.boxShadow = `0 0 20px ${dot.style.backgroundColor.replace(
              ")",
              ", 0.5)"
            )}`;
          }, 500);
        }, index * 1000 + 500);
      });

      // Draw connecting lines
      const journeyPath = overlay.querySelector(".journey-path");

      for (let i = 0; i < nodes.length - 1; i++) {
        setTimeout(() => {
          const startNode = nodes[i];
          const endNode = nodes[i + 1];

          const startRect = startNode.getBoundingClientRect();
          const endRect = endNode.getBoundingClientRect();

          const line = document.createElement("div");
          line.classList.add("journey-line");

          // Get metrics for gradient
          const startMetric =
            startNode.querySelector("div[data-metric]").dataset.metric;
          const endMetric =
            endNode.querySelector("div[data-metric]").dataset.metric;

          // Get colors
          const startColor = this.constellationData.metricColors[startMetric];
          const endColor = this.constellationData.metricColors[endMetric];

          // Calculate line position relative to journey path
          const startX =
            startRect.left +
            startRect.width / 2 -
            journeyPath.getBoundingClientRect().left;
          const startY =
            startRect.top +
            startRect.height / 2 -
            journeyPath.getBoundingClientRect().top;
          const endX =
            endRect.left +
            endRect.width / 2 -
            journeyPath.getBoundingClientRect().left;
          const endY =
            endRect.top +
            endRect.height / 2 -
            journeyPath.getBoundingClientRect().top;

          // Calculate length and angle
          const length = Math.sqrt(
            Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
          );
          const angle =
            (Math.atan2(endY - startY, endX - startX) * 180) / Math.PI;

          // Style line
          Object.assign(line.style, {
            position: "absolute",
            top: `${startY}px`,
            left: `${startX}px`,
            width: `${length}px`,
            height: "4px",
            background: `linear-gradient(to right, ${startColor}, ${endColor})`,
            transformOrigin: "0 50%",
            transform: `rotate(${angle}deg) scaleX(0)`,
            transition: "transform 1s cubic-bezier(0.19, 1, 0.22, 1)",
            zIndex: "1",
          });

          journeyPath.appendChild(line);

          // Animate line
          setTimeout(() => {
            line.style.transform = `rotate(${angle}deg) scaleX(1)`;
          }, 100);
        }, i * 1000 + 1000);
      }
    }, 500);

    // Add continue button functionality
    setTimeout(() => {
      const continueButton = overlay.querySelector(".continue-button");
      continueButton.addEventListener("click", () => {
        overlay.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 800);
      });
    }, 100);
  }

  bindEvents() {
    // Mouse move event for star hover
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is over any star
      let hoveredStar = null;
      this.stars.forEach((star) => {
        const dist = Math.sqrt(
          Math.pow(x - star.x, 2) + Math.pow(y - star.y, 2)
        );

        if (dist < star.radius * 2) {
          hoveredStar = star;
          star.hovered = true;
          star.targetRadius = star.baseRadius * 1.8;
          this.canvas.style.cursor = "pointer";
        } else {
          star.hovered = false;
          if (!star.active) {
            star.targetRadius = star.baseRadius;
          }
        }
      });

      // If no star is hovered, reset cursor
      if (!hoveredStar) {
        this.canvas.style.cursor = "default";
      }
    });

    // Click event for star selection
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if click is on any star
      this.stars.forEach((star) => {
        const dist = Math.sqrt(
          Math.pow(x - star.x, 2) + Math.pow(y - star.y, 2)
        );

        if (dist < star.radius * 2) {
          // Deactivate all stars
          this.stars.forEach((s) => {
            s.active = false;
            if (!s.hovered) {
              s.targetRadius = s.baseRadius;
            }
          });

          // Activate clicked star
          star.active = true;
          star.targetRadius = star.baseRadius * 1.8;

          // Show testimonial
          this.showTestimonial(star);
        }
      });
    });

    // Click outside stars to hide testimonial
    this.container.addEventListener("click", (e) => {
      if (e.target === this.canvas) {
        // Reset all stars
        this.stars.forEach((star) => {
          star.active = false;
          if (!star.hovered) {
            star.targetRadius = star.baseRadius;
          }
        });

        // Reset all connections
        this.connections.forEach((conn) => {
          conn.active = false;
          conn.targetOpacity = 0;
        });

        // Hide testimonial
        this.hideTestimonial();

        // Hide pattern
        this.hidePattern();

        this.activeConnections = [];
      }
    });

    // Handle resize
    window.addEventListener("resize", () => {
      this.resizeCanvas();
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Get time for animations
    const time = performance.now() / 1000;

    // Update and draw connections
    this.connections.forEach((conn) => {
      // Animate opacity
      conn.opacity += (conn.targetOpacity - conn.opacity) * 0.05;

      // Draw connection
      this.drawConnection(conn);
    });

    // Update and draw stars
    this.stars.forEach((star, index) => {
      // Animate opacity (for fade-in)
      star.opacity += (star.targetOpacity - star.opacity) * 0.05;

      // Animate radius
      star.radius += (star.targetRadius - star.radius) * 0.1;

      // Add subtle pulsing
      const pulse =
        Math.sin(time * 0.8 * star.pulseFactor + star.pulseOffset) * 0.2 + 1;
      star.radius = star.radius * pulse;

      // Stagger the fade-in animation
      if (index > 0 && this.stars[index - 1].opacity > 0.3) {
        star.targetOpacity = 1;
      }

      // Draw star
      this.drawStar(star);
    });
  }
}

// Example usage:
// const container = document.getElementById('constellation-container');
// const constellation = new ConstellationOfConfidence(container);

export default ConstellationOfConfidence;

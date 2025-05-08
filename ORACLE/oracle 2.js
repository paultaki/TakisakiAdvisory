// ORBITAL NAVIGATION SYSTEM
// The dimensional navigation that replaces traditional scrolling

class OrbitalNavigation {
  constructor(container) {
    this.container = container;
    this.currentOrbit = 0;
    this.orbits = [
      { id: 'market-cosmos', title: 'Market Cosmos', depth: 1 },
      { id: 'opportunity-nexus', title: 'Opportunity Nexus', depth: 2 },
      { id: 'signal-intelligence', title: 'Signal Intelligence', depth: 3 },
      { id: 'decision-horizon', title: 'Decision Horizon', depth: 4 }
    ];
    this.isTransitioning = false;
    this.anchors = [];
    
    this.init();
    this.createOrbitalLayers();
    this.bindEvents();
  }
  
  init() {
    // Create container for orbital layers
    this.orbitalContainer = document.createElement('div');
    this.orbitalContainer.classList.add('orbital-container');
    this.container.appendChild(this.orbitalContainer);
    
    // Create orbital navigation indicators
    this.navIndicators = document.createElement('div');
    this.navIndicators.classList.add('orbital-indicators');
    this.container.appendChild(this.navIndicators);
    
    // Create anchor container
    this.anchorContainer = document.createElement('div');
    this.anchorContainer.classList.add('anchor-container');
    this.container.appendChild(this.anchorContainer);
    
    // Style the containers
    this.applyContainerStyles();
  }
  
  applyContainerStyles() {
    // Apply styles to orbital container
    Object.assign(this.orbitalContainer.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      perspective: '1000px'
    });
    
    // Style navigation indicators
    Object.assign(this.navIndicators.style, {
      position: 'fixed',
      right: '30px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      zIndex: '1000'
    });
    
    // Style anchor container
    Object.assign(this.anchorContainer.style, {
      position: 'fixed',
      left: '30px',
      bottom: '30px',
      display: 'flex',
      gap: '15px',
      zIndex: '1000'
    });
  }
  
  createOrbitalLayers() {
    // Create each orbital layer
    this.orbits.forEach((orbit, index) => {
      // Create the layer
      const layer = document.createElement('div');
      layer.id = orbit.id;
      layer.classList.add('orbital-layer');
      
      // Apply orbital layer styles
      Object.assign(layer.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        opacity: index === 0 ? '1' : '0',
        pointerEvents: index === 0 ? 'auto' : 'none',
        transition: 'opacity 0.8s ease, transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)',
        transform: `translateZ(${-2000 * (index)}px)`,
        zIndex: `${1000 - index}`
      });
      
      this.orbitalContainer.appendChild(layer);
      
      // Create navigation indicator for this orbit
      this.createNavIndicator(orbit, index);
    });
  }
  
  createNavIndicator(orbit, index) {
    const indicator = document.createElement('div');
    indicator.classList.add('orbit-indicator');
    indicator.dataset.orbit = index;
    
    // Style the indicator
    Object.assign(indicator.style, {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: index === 0 ? '#fff' : 'rgba(255, 255, 255, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: index === 0 ? '0 0 10px rgba(255, 255, 255, 0.8)' : 'none'
    });
    
    // Add tooltip
    indicator.title = orbit.title;
    
    // Add click handler
    indicator.addEventListener('click', () => {
      if (!this.isTransitioning && this.currentOrbit !== index) {
        this.navigateToOrbit(index);
      }
    });
    
    this.navIndicators.appendChild(indicator);
  }
  
  createAnchor(orbitIndex) {
    // Check if anchor already exists for this orbit
    if (this.anchors.some(a => a.orbit === orbitIndex)) {
      return;
    }
    
    const orbit = this.orbits[orbitIndex];
    
    // Create anchor element
    const anchor = document.createElement('div');
    anchor.classList.add('orbit-anchor');
    anchor.dataset.orbit = orbitIndex;
    
    // Style the anchor
    Object.assign(anchor.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 15px',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(5px)',
      color: '#fff',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    });
    
    // Add label
    anchor.textContent = orbit.title;
    
    // Add hover effect
    anchor.addEventListener('mouseenter', () => {
      Object.assign(anchor.style, {
        background: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(255, 255, 255, 0.4)'
      });
    });
    
    anchor.addEventListener('mouseleave', () => {
      Object.assign(anchor.style, {
        background: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      });
    });
    
    // Add click handler
    anchor.addEventListener('click', () => {
      if (!this.isTransitioning && this.currentOrbit !== orbitIndex) {
        this.navigateToOrbit(orbitIndex);
      }
    });
    
    // Store anchor in array
    this.anchors.push({
      element: anchor,
      orbit: orbitIndex
    });
    
    // Add to container
    this.anchorContainer.appendChild(anchor);
    
    // Show confirmation message
    this.showMessage(`Anchor placed in ${orbit.title}`);
  }
  
  showMessage(text) {
    // Create message element
    const message = document.createElement('div');
    message.classList.add('orbital-message');
    message.textContent = text;
    
    // Style the message
    Object.assign(message.style, {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '12px 20px',
      borderRadius: '4px',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      color: '#fff',
      fontSize: '16px',
      zIndex: '2000',
      opacity: '0',
      transition: 'opacity 0.3s ease'
    });
    
    // Add to DOM
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
      message.style.opacity = '1';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(message);
      }, 300);
    }, 3000);
  }
  
  navigateToOrbit(targetOrbit) {
    if (this.isTransitioning || targetOrbit === this.currentOrbit) return;
    
    this.isTransitioning = true;
    
    const currentLayer = this.orbitalContainer.children[this.currentOrbit];
    const targetLayer = this.orbitalContainer.children[targetOrbit];
    
    // Update indicators
    const indicators = this.navIndicators.children;
    indicators[this.currentOrbit].style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    indicators[this.currentOrbit].style.boxShadow = 'none';
    
    indicators[targetOrbit].style.backgroundColor = '#fff';
    indicators[targetOrbit].style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
    
    // Start reality shift transition
    this.realityShiftTransition(currentLayer, targetLayer, targetOrbit);
  }
  
  realityShiftTransition(currentLayer, targetLayer, targetOrbit) {
    // Create blur overlay
    const blurOverlay = document.createElement('div');
    blurOverlay.classList.add('reality-shift-overlay');
    
    // Style the overlay
    Object.assign(blurOverlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backdropFilter: 'blur(0px)',
      zIndex: '1500',
      transition: 'backdrop-filter 1.2s cubic-bezier(0.19, 1, 0.22, 1), background-color 1.2s cubic-bezier(0.19, 1, 0.22, 1)',
      pointerEvents: 'none'
    });
    
    document.body.appendChild(blurOverlay);
    
    // Create audio for the transition
    this.playTransitionSound(targetOrbit > this.currentOrbit ? 'descend' : 'ascend');
    
    // Animate the transition
    setTimeout(() => {
      // Phase 1: Reality blur
      blurOverlay.style.backdropFilter = 'blur(20px)';
      blurOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
      
      // Prepare the target layer
      targetLayer.style.transform = `translateZ(0px)`;
      
      setTimeout(() => {
        // Phase 2: Swap visibility
        currentLayer.style.opacity = '0';
        currentLayer.style.pointerEvents = 'none';
        
        targetLayer.style.opacity = '1';
        targetLayer.style.pointerEvents = 'auto';
        
        // Phase 3: Reality clarify
        setTimeout(() => {
          blurOverlay.style.backdropFilter = 'blur(0px)';
          blurOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
          
          // Update current orbit
          this.currentOrbit = targetOrbit;
          
          // Remove overlay after transition
          setTimeout(() => {
            document.body.removeChild(blurOverlay);
            this.isTransitioning = false;
            
            // Create orbit-specific elements
            this.materializeOrbitContent(targetOrbit);
          }, 1200);
        }, 500);
      }, 700);
    }, 100);
  }
  
  playTransitionSound(direction) {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillator
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    // Set properties based on direction
    if (direction === 'descend') {
      // Descending sound
      oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 1.2);
    } else {
      // Ascending sound
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 1.2);
    }
    
    // Create gentle fade in/out
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.2);
    
    // Connect and play
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    
    // Automatically stop after transition
    setTimeout(() => {
      oscillator.stop();
    }, 1200);
  }
  
  materializeOrbitContent(orbitIndex) {
    const layer = this.orbitalContainer.children[orbitIndex];
    
    // Get any existing content
    const existingContent = layer.querySelectorAll('.orbit-content');
    
    // If content already exists, just make it visible
    if (existingContent.length > 0) {
      existingContent.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
      });
      return;
    }
    
    // Otherwise create new content for this orbit
    const orbitContent = this.createOrbitSpecificContent(orbitIndex);
    
    // Add content to the layer
    layer.appendChild(orbitContent);
    
    // Trigger materialization animation
    setTimeout(() => {
      orbitContent.style.opacity = '1';
      orbitContent.style.transform = 'translateY(0) scale(1)';
    }, 100);
  }
  
  createOrbitSpecificContent(orbitIndex) {
    // Create content wrapper
    const content = document.createElement('div');
    content.classList.add('orbit-content');
    
    // Style the content
    Object.assign(content.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, 30px) scale(0.95)',
      padding: '30px',
      maxWidth: '1200px',
      width: '80%',
      color: '#fff',
      opacity: '0',
      transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)'
    });
    
    // Different content for each orbit
    switch(orbitIndex) {
      case 0: // Market Cosmos
        content.innerHTML = `
          <h2 style="font-size: 42px; margin-bottom: 25px;">Market Cosmos</h2>
          <p style="font-size: 22px; margin-bottom: 40px; opacity: 0.9;">
            The universe of possibilities lies before you. Each point of light represents a market signal.
          </p>
          <div style="display: flex; gap: 30px; margin-top: 60px;">
            <div class="metric-card" style="flex: 1; padding: 30px; background: rgba(255, 255, 255, 0.1); border-radius: 20px; backdrop-filter: blur(10px);">
              <h3 style="font-size: 20px; margin-bottom: 10px;">Market Size</h3>
              <div style="font-size: 48px; font-weight: bold; margin-bottom: 15px;">$84.3M</div>
              <p style="opacity: 0.8;">Post-merger opportunity size across identified segments</p>
            </div>
            <div class="metric-card" style="flex: 1; padding: 30px; background: rgba(255, 255, 255, 0.1); border-radius: 20px; backdrop-filter: blur(10px);">
              <h3 style="font-size: 20px; margin-bottom: 10px;">Growth Velocity</h3>
              <div style="font-size: 48px; font-weight: bold; margin-bottom: 15px;">3.2×</div>
              <p style="opacity: 0.8;">Average ROI within 6 months of implementation</p>
            </div>
            <div class="metric-card" style="flex: 1; padding: 30px; background: rgba(255, 255, 255, 0.1); border-radius: 20px; backdrop-filter: blur(10px);">
              <h3 style="font-size: 20px; margin-bottom: 10px;">Market Share</h3>
              <div style="font-size: 48px; font-weight: bold; margin-bottom: 15px;">28%</div>
              <p style="opacity: 0.8;">Potential share growth in targeted segments</p>
            </div>
          </div>
          <div style="margin-top: 60px; text-align: center;">
            <button class="anchor-button" style="padding: 12px 25px; background: rgba(255, 255, 255, 0.2); border: none; border-radius: 30px; color: #fff; font-size: 16px; cursor: pointer; backdrop-filter: blur(5px);">Place Anchor Here</button>
          </div>
        `;
        break;
        
      case 1: // Opportunity Nexus
        content.innerHTML = `
          <h2 style="font-size: 42px; margin-bottom: 25px;">Opportunity Nexus</h2>
          <p style="font-size: 22px; margin-bottom: 40px; opacity: 0.9;">
            The convergence of opportunities and competitive positioning.
          </p>
          <div style="margin-top: 30px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px;">
            <div class="opportunity-card" style="padding: 30px; background: rgba(255, 255, 255, 0.1); border-radius: 20px; backdrop-filter: blur(10px);">
              <h3 style="font-size: 24px; margin-bottom: 20px;">Market Expansion</h3>
              <div style="height: 150px; margin-bottom: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                <div style="width: 100px; height: 100px; background: radial-gradient(circle, rgba(255,212,59,0.7) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;"></div>
              </div>
              <p style="opacity: 0.8;">Three adjacent territories show signals of rapid adoption readiness.</p>
            </div>
            <div class="opportunity-card" style="padding: 30px; background: rgba(255, 255, 255, 0.1); border-radius: 20px; backdrop-filter: blur(10px);">
              <h3 style="font-size: 24px; margin-bottom: 20px;">Competitive Gap</h3>
              <div style="height: 150px; margin-bottom: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                <div style="position: relative; width: 80px; height: 80px;">
                  <div style="position: absolute; width: 40px; height: 40px; background: rgba(59, 130, 255, 0.7); border-radius: 50%; left: 0; top: 20px;"></div>
                  <div style="position: absolute; width: 40px; height: 40px; background: rgba(255, 59, 59, 0.7); border-radius: 50%; right: 0; top: 20px;"></div>
                </div>
              </div>
              <p style="opacity: 0.8;">Primary competitor shows innovation gap in core technology matrix.</p>
            </div>
            <div class="opportunity-card" style="padding: 30px; background: rgba(255, 255, 255, 0.1); border-radius: 20px; backdrop-filter: blur(10px);">
              <h3 style="font-size: 24px; margin-bottom: 20px;">Acquisition Targets</h3>
              <div style="height: 150px; margin-bottom: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                <div style="position: relative; width: 120px; height: 120px;">
                  <div style="position: absolute; width: 30px; height: 30px; background: rgba(59, 255, 159, 0.7); border-radius: 50%; left: 45px; top: 0;"></div>
                  <div style="position: absolute; width: 30px; height: 30px; background: rgba(59, 255, 159, 0.7); border-radius: 50%; left: 0; top: 75px;"></div>
                  <div style="position: absolute; width: 30px; height: 30px; background: rgba(59, 255, 159, 0.7); border-radius: 50%; right: 0; top: 75px;"></div>
                </div>
              </div>
              <p style="opacity: 0.8;">Three tech providers identified with complementary capabilities.</p>
            </div>
            <div class="opportunity-card" style="padding: 30px; background: rgba(255, 255, 255, 0.1); border-radius: 20px; backdrop-filter: blur(10px);">
              <h3 style="font-size: 24px; margin-bottom: 20px;">Market Timing</h3>
              <div style="height: 150px; margin-bottom: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                <div style="width: 100px; height: 2px; background: rgba(255, 255, 255, 0.3); position: relative;">
                  <div style="position: absolute; width: 10px; height: 10px; background: #fff; border-radius: 50%; left: 30px; top: -4px;"></div>
                  <div style="position: absolute; width: 10px; height: 10px; background: rgba(255, 212, 59, 1); border-radius: 50%; left: 70px; top: -4px;"></div>
                </div>
              </div>
              <p style="opacity: 0.8;">Optimal market entry window identified in Q2 2025.</p>
            </div>
          </div>
          <div style="margin-top: 60px; text-align: center;">
            <button class="anchor-button" style="padding: 12px 25px; background: rgba(255, 255, 255, 0.2); border: none; border-radius: 30px; color: #fff; font-size: 16px; cursor: pointer; backdrop-filter: blur(5px);">Place Anchor Here</button>
          </div>
        `;
        break;
        
      case 2: // Signal Intelligence
        content.innerHTML = `
          <h2 style="font-size: 42px; margin-bottom: 25px;">Signal Intelligence</h2>
          <p style="font-size: 22px; margin-bottom: 40px; opacity: 0.9;">
            The micro-patterns that others miss. Invisible signals made visible.
          </p>
          <div style="margin-top: 30px; background: rgba(255, 255, 255, 0.1); border-radius: 20px; backdrop-filter: blur(10px); padding: 40px;">
            <h3 style="font-size: 28px; margin-bottom: 30px;">Signal Matrix</h3>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px;">
              <div class="signal-card" style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px;">
                <div style="font-size: 36px; margin-bottom: 10px;">+14%</div>
                <div style="opacity: 0.8;">API Usage Trend</div>
              </div>
              <div class="signal-card" style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px;">
                <div style="font-size: 36px; margin-bottom: 10px;">-8%</div>
                <div style="opacity: 0.8;">Competitor Hiring</div>
              </div>
              <div class="signal-card" style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px;">
                <div style="font-size: 36px; margin-bottom: 10px;">2.3×</div>
                <div style="opacity: 0.8;">Patent Velocity</div>
              </div>
              <div class="signal-card" style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px;">
                <div style="font-size: 36px; margin-bottom: 10px;">72%</div>
                <div style="opacity: 0.8;">Sentiment Shift</div>
              </div>
            </div>
            <div style="margin-top: 30px;">
              <h4 style="font-size: 22px; margin-bottom: 20px;">Hidden Pattern Recognition</h4>
              <div style="height: 4px; background: rgba(255, 255, 255, 0.1); position: relative; margin-bottom: 30px;">
                <div style="position: absolute; left: 20%; top: -3px; width: 10px; height: 10px; background: rgba(255, 255, 255, 0.5); border-radius: 50%;"></div>
                <div style="position: absolute; left: 35%; top: -3px; width: 10px; height: 10px; background: rgba(255, 255, 255, 0.5); border-radius: 50%;"></div>
                <div style="position: absolute; left: 42%; top: -3px; width: 10px; height: 10px; background: rgba(255, 255, 255, 0.5); border-radius: 50%;"></div>
                <div style="position: absolute; left: 60%; top: -3px; width: 10px; height: 10px; background: rgba(255, 255, 255, 0.5); border-radius: 50%;"></div>
                <div style="position: absolute; left: 78%; top: -3px; width: 10px; height: 10px; background: rgba(255, 255, 255, 0.5); border-radius: 50%;"></div>
              </div>
              <p style="opacity: 0.8;">StratusAI has detected a significant pattern in market signals that indicates an emerging opportunity window in the next 47 days. This pattern correlates with previous market disruptions at 89% confidence.</p>
            </div>
          </div>
          <div style="margin-top: 60px; text-align: center;">
            <button class="anchor-button" style="padding: 12px 25px; background: rgba(255, 255, 255, 0.2); border: none; border-radius: 30px; color: #fff; font-size: 16px; cursor: pointer; backdrop-filter: blur(5px);">Place Anchor Here</button>
          </div>
        `;
        break;
        
      case 3: // Decision Horizon
        content.innerHTML = `
          <h2 style="font-size: 42px; margin-bottom: 25px;">Decision Horizon</h2>
          <p style="font-size: 22px; margin-bottom: 40px; opacity: 0.9;">
            The moment of clarity where information transforms into action.
          </p>
          <div style="margin-top: 30px; background: rgba(255, 255, 255, 0.1); border-radius: 20px; backdrop-filter: blur(10px); padding: 40px;">
            <h3 style="font-size: 28px; margin-bottom: 30px;">Strategic Imperatives</h3>
            <div style="margin-bottom: 40px;">
              <div style="display: flex; margin-bottom: 20px; align-items: center;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(255, 212, 59, 0.2); display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                  <div style="width: 30px; height: 30px; border-radius: 50%; background: rgba(255, 212, 59, 0.8);"></div>
                </div>
                <div>
                  <h4 style="font-size: 24px; margin-bottom: 5px;">Acquire Nexus Technologies</h4>
                  <p style="opacity: 0.8;">Valuation indicates 1.3× multiple with synergy potential of $22.7M in first year.</p>
                </div>
              </div>
              <div style="display: flex; margin-bottom: 20px; align-items: center;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(59, 130, 255, 0.2); display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                  <div style="width: 30px; height: 30px; border-radius: 50%; background: rgba(59, 130, 255, 0.8);"></div>
                </div>
                <div>
                  <h4 style="font-size: 24px; margin-bottom: 5px;">Accelerate Eastern Expansion</h4>
                  <p style="opacity: 0.8;">Market signals indicate 47-day window before competitor entrenchment.</p>
                </div>
              </div>
              <div style="display: flex; margin-bottom: 20px; align-items: center;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(59, 255, 159, 0.2); display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                  <div style="width: 30px; height: 30px; border-radius: 50%; background: rgba(59, 255, 159, 0.8);"></div>
                </div>
                <div>
                  <h4 style="font-size: 24px; margin-bottom: 5px;">Reallocate R&D Resources</h4>
                  <p style="opacity: 0.8;">Shift 28% of resources to quantum encryption platform development.</p>
                </div>
              </div>
            </div>
            <div style="text-align: center; margin-top: 40px;">
              <div style="font-size: 24px; margin-bottom: 20px;">Do you see your future forming?</div>
              <button class="insight-button" style="padding: 15px 30px; background: linear-gradient(45deg, rgba(59, 130, 255, 0.8), rgba(255, 212, 59, 0.8)); border: none; border-radius: 30px; color: #fff; font-size: 18px; cursor: pointer; backdrop-filter: blur(5px);">Generate Custom Insight Path</button>
            </div>
          </div>
          <div style="margin-top: 60px; text-align: center;">
            <button class="anchor-button" style="padding: 12px 25px; background: rgba(255, 255, 255, 0.2); border: none; border-radius: 30px; color: #fff; font-size: 16px; cursor: pointer; backdrop-filter: blur(5px);">Place Anchor Here</button>
          </div>
        `;
        break;
    }
    
    // Add event listeners for buttons
    setTimeout(() => {
      // Add anchor button functionality
      const anchorButton = content.querySelector('.anchor-button');
      if (anchorButton) {
        anchorButton.addEventListener('click', () => {
          this.createAnchor(orbitIndex);
        });
      }
      
      // Add insight button functionality if exists
      const insightButton = content.querySelector('.insight-button');
      if (insightButton) {
        insightButton.addEventListener('click', () => {
          this.generateInsightPath();
        });
      }
    }, 100);
    
    return content;
  }
  
  generateInsightPath() {
    // Show the revelation pattern prompt
    this.showRevelationPattern();
  }
  
  showRevelationPattern() {
    // Create the revelation pattern overlay
    const overlay = document.createElement('div');
    overlay.classList.add('revelation-overlay');
    
    // Style the overlay
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      zIndex: '2000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '0',
      transition: 'opacity 0.5s ease'
    });
    
    // Create the revelation content
    overlay.innerHTML = `
      <div class="revelation-content" style="max-width: 800px; padding: 50px; background: rgba(255, 255, 255, 0.1); border-radius: 20px; text-align: center; transform: scale(0.9); transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1); color: #fff;">
        <h2 style="font-size: 36px; margin-bottom: 30px;">Your Revelation Path</h2>
        <div style="margin: 40px 0; position: relative; height: 100px;">
          <div style="position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: rgba(255, 255, 255, 0.3); transform: translateY(-50%);"></div>
          <div style="position: absolute; top: 50%; left: 10%; width: 20px; height: 20px; background: rgba(255, 255, 255, 0.8); border-radius: 50%; transform: translateY(-50%); box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);">
            <div style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%); white-space: nowrap;">Current Position</div>
          </div>
          <div style="position: absolute; top: 50%; left: 40%; width: 20px; height: 20px; background: rgba(59, 130, 255, 0.8); border-radius: 50%; transform: translateY(-50%); box-shadow: 0 0 15px rgba(59, 130, 255, 0.5);">
            <div style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%); white-space: nowrap;">Acquisition Phase</div>
          </div>
          <div style="position: absolute; top: 50%; left: 70%; width: 20px; height: 20px; background: rgba(59, 255, 159, 0.8); border-radius: 50%; transform: translateY(-50%); box-shadow: 0 0 15px rgba(59, 255, 159, 0.5);">
            <div style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%); white-space: nowrap;">Market Dominance</div>
          </div>
          <div style="position: absolute; top: 50%; right: 5%; width: 20px; height: 20px; background: rgba(255, 212, 59, 0.8); border-radius: 50%; transform: translateY(-50%); box-shadow: 0 0 15px rgba(255, 212, 59, 0.5);">
            <div style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%); white-space: nowrap;">Future State</div>
          </div>
        </div>
        <p style="font-size: 20px; margin-bottom: 30px;">Based on your trajectory, we've identified your optimal path to market leadership.</p>
        <div style="margin: 40px 0; font-size: 28px; font-weight: bold;">87% → 3.2× → 28%</div>
        <p style="opacity: 0.8; margin-bottom: 40px;">This revelation pattern shows increasing market share through targeted acquisitions and strategic positioning.</p>
        <button class="close-revelation" style="padding: 12px 25px; background: rgba(255, 255, 255, 0.2); border: none; border-radius: 30px; color: #fff; font-size: 16px; cursor: pointer;">Continue the Journey</button>
      </div>
    `;
    
    // Add to DOM
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
      overlay.style.opacity = '1';
      const content = overlay.querySelector('.revelation-content');
      content.style.transform = 'scale(1)';
    }, 10);
    
    // Add close functionality
    setTimeout(() => {
      const closeButton = overlay.querySelector('.close-revelation');
      closeButton.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 500);
      });
    }, 100);
  }
  
  bindEvents() {
    // Handle wheel events for orbital navigation
    window.addEventListener('wheel', (event) => {
      if (this.isTransitioning) return;
      
      const direction = event.deltaY > 0 ? 1 : -1;
      const targetOrbit = Math.max(0, Math.min(this.orbits.length - 1, this.currentOrbit + direction));
      
      if (targetOrbit !== this.currentOrbit) {
        this.navigateToOrbit(targetOrbit);
      }
    });
    
    // Add keyboard navigation
    window.addEventListener('keydown', (event) => {
      if (this.isTransitioning) return;
      
      let targetOrbit = this.currentOrbit;
      
      // Arrow Up/Down or Page Up/Down
      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        targetOrbit = Math.max(0, this.currentOrbit - 1);
      } else if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        targetOrbit = Math.min(this.orbits.length - 1, this.currentOrbit + 1);
      }
      // Number keys 1-4
      else if (event.key >= '1' && event.key <= String(this.orbits.length)) {
        targetOrbit
      }}
    }}
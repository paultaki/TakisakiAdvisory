// THE ORACLE - Core Implementation
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

// The Oracle's Vertex Shader
const oracleVertexShader = `
  uniform float uTime;
  uniform vec2 uCursorPosition;
  uniform float uPulseFrequency;
  uniform float uMarketVolatility;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  // Gravitational lensing effect
  vec3 distortPosition(vec3 position, vec2 cursor, float intensity) {
    vec3 distortion = position;
    float distance = length(position.xy - cursor);
    float attenuatedPull = 1.0 - clamp(distance / 2.0, 0.0, 1.0);
    
    // Create subtle gravitational pull toward cursor
    vec2 direction = normalize(cursor - position.xy);
    distortion.xy += direction * attenuatedPull * intensity;
    
    return distortion;
  }
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    // Base pulsation - synchronized with market data
    float pulseMagnitude = 0.02 + (uMarketVolatility * 0.05);
    float pulseFreq = uPulseFrequency;
    float pulse = sin(uTime * pulseFreq) * pulseMagnitude;
    
    // Apply gravitational lensing near cursor
    vec3 distortedPosition = distortPosition(position, uCursorPosition, 0.1);
    
    // Combine effects: baseline pulse + market rhythm + gravitational distortion
    vec3 transformedPosition = distortedPosition * (1.0 + pulse);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPosition, 1.0);
  }
`;

// The Oracle's Fragment Shader
const oracleFragmentShader = `
  uniform float uTime;
  uniform vec2 uCursorPosition;
  uniform float uVisitCount;
  uniform sampler2D uDataTexture;
  uniform float uRefractionRatio;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  // Create a cosmic, shimmering effect
  vec3 cosmicShimmer(vec3 baseColor, float time, vec2 uv) {
    float shimmerIntensity = 0.15;
    float shimmerSpeed = 0.7;
    
    float noise = fract(sin(dot(uv, vec2(12.9898, 78.233) * time * 0.1)) * 43758.5453);
    float shimmer = shimmerIntensity * sin(time * shimmerSpeed + noise * 6.28);
    
    return baseColor + shimmer;
  }
  
  // Create Oracle's color scheme based on visit count
  vec3 oracleColors(float visitCount, vec2 uv, vec3 normal) {
    // Base cosmic indigo to gold gradient
    vec3 indigo = vec3(0.07, 0.03, 0.35);
    vec3 gold = vec3(1.0, 0.84, 0.2);
    
    // Core base color
    vec3 baseColor = mix(indigo, gold, uv.y);
    
    // Add illumination based on normal
    float illumination = dot(normal, vec3(0.0, 1.0, 0.5)) * 0.5 + 0.5;
    baseColor = mix(baseColor, gold, illumination * 0.4);
    
    // Progressive revelation based on visit count
    if (visitCount > 1.0) {
      // Add data texture influence for returning visitors
      vec3 dataColor = texture2D(uDataTexture, uv).rgb;
      baseColor = mix(baseColor, dataColor, clamp(visitCount * 0.1, 0.0, 0.5));
    }
    
    // Apply cosmic shimmer effect
    vec3 finalColor = cosmicShimmer(baseColor, uTime, uv);
    
    return finalColor;
  }
  
  // Light refraction effect for cursor interaction
  vec3 refractLight(vec3 color, vec3 normal, vec2 cursorPos, vec2 uv) {
    float distToCursor = length(cursorPos - vPosition.xy);
    float refractStrength = smoothstep(1.0, 0.0, distToCursor) * uRefractionRatio;
    
    // Create subtle rainbow refraction near cursor
    vec3 refractedLight = normal * 0.5 + 0.5;
    
    return mix(color, refractedLight, refractStrength);
  }
  
  void main() {
    vec3 viewDirection = normalize(vPosition);
    vec3 normal = normalize(vNormal);
    
    // Generate base Oracle colors
    vec3 color = oracleColors(uVisitCount, vUv, normal);
    
    // Apply light refraction based on cursor position
    color = refractLight(color, normal, uCursorPosition, vUv);
    
    // Add subtle fresnel effect for edge glow
    float fresnel = pow(1.0 - dot(viewDirection, normal), 3.0);
    vec3 fresnelColor = mix(vec3(0.07, 0.03, 0.35), vec3(1.0, 0.84, 0.4), 0.5);
    color = mix(color, fresnelColor, fresnel * 0.6);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Oracle particle system shader
const particleVertexShader = `
  attribute float size;
  attribute float velocity;
  attribute float volatility;
  attribute vec3 color;
  
  uniform float uTime;
  uniform float uMarketVolatility;
  
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    
    // Calculate dynamic size based on data volatility
    float dynamicSize = size * (1.0 + sin(uTime * velocity) * volatility * uMarketVolatility);
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = dynamicSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  
  void main() {
    // Create soft, glowing particles
    float distToCenter = length(gl_PointCoord - vec2(0.5));
    if (distToCenter > 0.5) discard;
    
    // Soft-edged glow
    float intensity = 1.0 - (distToCenter * 2.0);
    intensity = pow(intensity, 1.5);
    
    gl_FragColor = vec4(vColor, intensity);
  }
`;

class Oracle {
  constructor(container, marketData) {
    this.container = container;
    this.marketData = marketData;
    this.visitCount = this.getVisitCount();
    this.hasInteracted = false;
    this.lastInteractionTime = 0;

    this.init();
    this.createOracle();
    this.createDataParticles();
    this.createPostProcessing();
    this.bindEvents();
    this.animate();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 15;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // Clock for animations
    this.clock = new THREE.Clock();

    // Oracle state
    this.cursorPosition = new THREE.Vector2(0, 0);
    this.harmonicTone = null;

    // Market data parameters
    this.marketVolatility = this.calculateVolatility();

    // Create audioContext for tones
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
  }

  getVisitCount() {
    // Use fingerprinting instead of cookies (pseudocode)
    // In a real implementation, use a more sophisticated approach
    let visits = localStorage.getItem("oracleVisits") || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem("oracleVisits", visits);
    return visits;
  }

  calculateVolatility() {
    // Calculate volatility from market data
    if (!this.marketData || !this.marketData.length) return 0.2;

    // Simple volatility calculation
    let sum = 0;
    let changes = [];

    for (let i = 1; i < this.marketData.length; i++) {
      let change = Math.abs(this.marketData[i] - this.marketData[i - 1]);
      changes.push(change);
      sum += change;
    }

    let avgChange = sum / changes.length;
    let volatility = avgChange / Math.max(...this.marketData);

    return Math.min(volatility * 10, 1.0); // Normalize to 0-1
  }

  createOracle() {
    // Create data texture for Oracle insights
    this.dataTexture = this.createDataTexture();

    // Oracle geometry
    const geometry = new THREE.SphereGeometry(5, 64, 64);

    // Oracle material with custom shaders
    const material = new THREE.ShaderMaterial({
      vertexShader: oracleVertexShader,
      fragmentShader: oracleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uCursorPosition: { value: this.cursorPosition },
        uVisitCount: { value: this.visitCount },
        uDataTexture: { value: this.dataTexture },
        uPulseFrequency: { value: 0.8 },
        uRefractionRatio: { value: 0.2 },
        uMarketVolatility: { value: this.marketVolatility },
      },
    });

    this.oracle = new THREE.Mesh(geometry, material);
    this.scene.add(this.oracle);
  }

  createDataTexture() {
    // Create a texture based on market data patterns
    const size = 256;
    const data = new Uint8Array(3 * size * size);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const stride = (i * size + j) * 3;

        // Create patterns based on market data
        const x = i / size;
        const y = j / size;

        // Use market data to influence the pattern
        const dataIndex =
          Math.floor((x + y) * 0.5 * this.marketData.length) %
          this.marketData.length;
        const value = this.marketData[dataIndex] / 100;

        // Create cosmic indigo to gold data pattern
        data[stride] = Math.floor(7 + value * 200); // R
        data[stride + 1] = Math.floor(3 + value * 180); // G
        data[stride + 2] = Math.floor(90 - value * 55); // B
      }
    }

    const texture = new THREE.DataTexture(data, size, size, THREE.RGBFormat);
    texture.needsUpdate = true;

    return texture;
  }

  createDataParticles() {
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount);
    const volatilities = new Float32Array(particleCount);

    const geometry = new THREE.BufferGeometry();

    // Create cosmic data particles
    for (let i = 0; i < particleCount; i++) {
      // Position: spherical distribution with more particles near Oracle
      const radius = 5 + Math.pow(Math.random(), 3) * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color: indigo to gold gradient based on distance
      const distRatio = (radius - 5) / 20;
      colors[i * 3] = 0.07 + distRatio * 0.93; // R: indigo to gold
      colors[i * 3 + 1] = 0.03 + distRatio * 0.81; // G: indigo to gold
      colors[i * 3 + 2] = 0.35 - distRatio * 0.15; // B: indigo to gold

      // Size: based on market data
      const dataIndex = i % this.marketData.length;
      const dataValue = this.marketData[dataIndex] / 100;

      sizes[i] = 0.1 + dataValue * 0.5;
      velocities[i] = 0.5 + Math.random() * 1.5;
      volatilities[i] = 0.1 + Math.random() * 0.9;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 1));
    geometry.setAttribute(
      "volatility",
      new THREE.BufferAttribute(volatilities, 1)
    );

    const material = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMarketVolatility: { value: this.marketVolatility },
      },
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createPostProcessing() {
    // Setup post-processing
    this.composer = new EffectComposer(this.renderer);

    // Render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // Bloom pass for glow
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // strength
      0.4, // radius
      0.85 // threshold
    );
    this.composer.addPass(bloomPass);
  }

  playHarmonicTone(frequency = 78) {
    // Stop any playing tone
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator = null;
    }

    // Create oscillator
    this.oscillator = this.audioContext.createOscillator();
    this.gain = this.audioContext.createGain();

    // Set properties
    this.oscillator.type = "sine";
    this.oscillator.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime
    );

    // Create gentle fade in/out
    this.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.gain.gain.linearRampToValueAtTime(
      0.2,
      this.audioContext.currentTime + 0.1
    );
    this.gain.gain.linearRampToValueAtTime(
      0,
      this.audioContext.currentTime + 2.0
    );

    // Connect and play
    this.oscillator.connect(this.gain);
    this.gain.connect(this.audioContext.destination);
    this.oscillator.start();

    // Automatically stop after 2 seconds
    setTimeout(() => {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator = null;
      }
    }, 2000);
  }

  revealInsight() {
    // Based on visit count, reveal different insights
    let insight;

    switch (this.visitCount % 4) {
      case 1:
        insight = "Market Size: $84.3M";
        break;
      case 2:
        insight = "Growth Pattern: 28% acceleration in adjacent segments";
        break;
      case 3:
        insight = "Vulnerability: Competitor X has 3 month innovation gap";
        break;
      case 0:
        insight = "Opportunity: 3 acquisition targets with < 1.5x valuation";
        break;
    }

    // Display insight (in a real implementation, this would be a DOM element)
    console.log("Oracle reveals:", insight);

    // In a real implementation, we would create a DOM element and position it near the Oracle
    // For this prototype, we'll just log to console
  }

  bindEvents() {
    // Track cursor position
    window.addEventListener("mousemove", (event) => {
      // Convert to normalized device coordinates (-1 to +1)
      this.cursorPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.cursorPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Oracle interaction
    window.addEventListener("click", (event) => {
      const now = Date.now();
      // Prevent rapid-fire clicking
      if (now - this.lastInteractionTime < 2000) return;

      // Check if click is near Oracle (simplified for this prototype)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Calculate distance to Oracle center (in normalized coords)
      const distance = Math.sqrt(x * x + y * y);

      if (distance < 0.5) {
        // If clicked near Oracle
        this.playHarmonicTone();
        this.triggerOracleExpansion();
        this.revealInsight();
        this.hasInteracted = true;
        this.lastInteractionTime = now;
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.composer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  triggerOracleExpansion() {
    // Make Oracle briefly expand then contract to reveal insight
    const originalScale = this.oracle.scale.x;

    // Expand
    gsap.to(this.oracle.scale, {
      x: originalScale * 1.15,
      y: originalScale * 1.15,
      z: originalScale * 1.15,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // Contract
        gsap.to(this.oracle.scale, {
          x: originalScale,
          y: originalScale,
          z: originalScale,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      },
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const elapsedTime = this.clock.getElapsedTime();

    // Update Oracle uniforms
    this.oracle.material.uniforms.uTime.value = elapsedTime;
    this.oracle.material.uniforms.uCursorPosition.value = this.cursorPosition;

    // Update particle uniforms
    this.particles.material.uniforms.uTime.value = elapsedTime;

    // Gentle rotation of the Oracle
    this.oracle.rotation.y = elapsedTime * 0.1;

    // Use composer for post-processing
    this.composer.render();
  }
}

// Example usage:
// const container = document.getElementById('oracle-container');
// const marketData = [42, 45, 41, 38, 47, 52, 56, 60, 58, 62, 65, 61, 59, 64, 68, 70];
// const oracleInstance = new Oracle(container, marketData);

export default Oracle;

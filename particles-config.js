/**
 * PARTICLES.JS CONFIGURATION
 * Advanced particle system for futuristic educational interface
 */

// Main particle configuration
const particlesConfig = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 1200,
      },
    },
    color: {
      value: ["#00d4ff", "#8338ec", "#06ffa5", "#ff006e"],
    },
    shape: {
      type: ["circle", "edge", "triangle"],
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 6,
      },
    },
    opacity: {
      value: 0.4,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.5,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00d4ff",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "bounce",
      bounce: true,
      attract: {
        enable: true,
        rotateX: 3000,
        rotateY: 3000,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: ["grab", "bubble"],
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 200,
        line_linked: {
          opacity: 0.8,
        },
      },
      bubble: {
        distance: 250,
        size: 8,
        duration: 2,
        opacity: 0.8,
        speed: 3,
      },
      repulse: {
        distance: 300,
        duration: 0.4,
      },
      push: {
        particles_nb: 6,
      },
      remove: {
        particles_nb: 3,
      },
    },
  },
  retina_detect: true,
};

// Educational themed particles configuration
const educationalParticlesConfig = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    color: {
      value: "#00d4ff",
    },
    shape: {
      type: ["circle", "edge"],
      stroke: {
        width: 1,
        color: "#00d4ff",
      },
    },
    opacity: {
      value: 0.3,
      random: false,
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 2,
      random: true,
      anim: {
        enable: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#00d4ff",
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 150,
        line_linked: {
          opacity: 0.6,
        },
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
};

// Advanced Particle System Class
class AdvancedParticleSystem {
  constructor(containerId, config = particlesConfig) {
    this.containerId = containerId;
    this.config = config;
    this.isActive = false;
    this.init();
  }

  init() {
    if (typeof particlesJS === "undefined") {
      console.warn("Particles.js not loaded");
      return;
    }

    particlesJS(this.containerId, this.config);
    this.isActive = true;
    this.addEnhancements();
  }

  addEnhancements() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    // Add glow effect to particles
    container.style.filter = "blur(0.5px)";
    container.style.mixBlendMode = "screen";

    // Add mouse tracking for enhanced interactivity
    this.addMouseTracking(container);

    // Add keyboard controls
    this.addKeyboardControls();
  }

  addMouseTracking(container) {
    let mouseTrail = [];
    const maxTrailLength = 10;

    container.addEventListener("mousemove", (e) => {
      mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      });

      // Limit trail length
      if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
      }

      // Create temporary particles at mouse position
      if (Math.random() > 0.8) {
        this.createTemporaryParticle(e.clientX, e.clientY);
      }
    });
  }

  createTemporaryParticle(x, y) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.background = "#00d4ff";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9998";
    particle.style.boxShadow = "0 0 6px #00d4ff";

    document.body.appendChild(particle);

    // Animate particle
    const animation = particle.animate(
      [
        { transform: "scale(1) translateY(0)", opacity: 1 },
        { transform: "scale(0) translateY(-50px)", opacity: 0 },
      ],
      {
        duration: 1000,
        easing: "ease-out",
      }
    );

    animation.onfinish = () => particle.remove();
  }

  addKeyboardControls() {
    document.addEventListener("keydown", (e) => {
      if (e.altKey) {
        switch (e.key) {
          case "p":
            this.toggleParticles();
            break;
          case "r":
            this.resetParticles();
            break;
          case "e":
            this.switchToEducationalMode();
            break;
          case "f":
            this.switchToFuturisticMode();
            break;
        }
      }
    });
  }

  toggleParticles() {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.style.display =
        container.style.display === "none" ? "block" : "none";
    }
  }

  resetParticles() {
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.fn.vendors.reset();
    }
  }

  switchToEducationalMode() {
    this.updateConfig(educationalParticlesConfig);
  }

  switchToFuturisticMode() {
    this.updateConfig(particlesConfig);
  }

  updateConfig(newConfig) {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = "";
      this.config = newConfig;
      this.init();
    }
  }

  addParticleBurst(x, y, count = 20) {
    if (!window.pJSDom || !window.pJSDom[0]) return;

    const pJS = window.pJSDom[0].pJS;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 5 + 2;

      pJS.particles.array.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1,
        opacity: 1,
        color: "#00d4ff",
      });
    }
  }

  destroy() {
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
    }
    this.isActive = false;
  }
}

// Floating Elements System
class FloatingElements {
  constructor() {
    this.elements = [];
    this.symbols = ["⚡", "🔬", "💡", "🚀", "⚙️", "📡", "🔮", "🌐"];
    this.init();
  }

  init() {
    this.createFloatingElements();
    this.animate();
  }

  createFloatingElements() {
    for (let i = 0; i < 8; i++) {
      const element = document.createElement("div");
      element.className = "floating-element";
      element.textContent = this.symbols[i];

      // Style the element
      Object.assign(element.style, {
        position: "fixed",
        fontSize: "24px",
        color: "rgba(0, 212, 255, 0.3)",
        pointerEvents: "none",
        zIndex: "1",
        userSelect: "none",
        left: Math.random() * window.innerWidth + "px",
        top: Math.random() * window.innerHeight + "px",
        animation: `float-${i} ${
          15 + Math.random() * 10
        }s ease-in-out infinite`,
      });

      document.body.appendChild(element);
      this.elements.push(element);
    }

    this.addFloatingAnimations();
  }

  addFloatingAnimations() {
    const style = document.createElement("style");
    let animations = "";

    for (let i = 0; i < 8; i++) {
      animations += `
                @keyframes float-${i} {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.3;
                    }
                    25% {
                        transform: translateY(-20px) rotate(90deg);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translateY(-10px) rotate(180deg);
                        opacity: 0.4;
                    }
                    75% {
                        transform: translateY(-30px) rotate(270deg);
                        opacity: 0.5;
                    }
                }
            `;
    }

    style.textContent = animations;
    document.head.appendChild(style);
  }

  animate() {
    this.elements.forEach((element, index) => {
      const speed = 0.5 + Math.random() * 0.5;
      const amplitude = 50 + Math.random() * 50;

      setInterval(() => {
        const currentTop = parseFloat(element.style.top);
        const currentLeft = parseFloat(element.style.left);

        element.style.top =
          currentTop + Math.sin(Date.now() * 0.001 + index) * speed + "px";
        element.style.left =
          currentLeft +
          Math.cos(Date.now() * 0.001 + index) * speed * 0.5 +
          "px";

        // Reset position if out of bounds
        if (currentTop > window.innerHeight + 50) {
          element.style.top = "-50px";
        }
        if (currentLeft > window.innerWidth + 50 || currentLeft < -50) {
          element.style.left = Math.random() * window.innerWidth + "px";
        }
      }, 50);
    });
  }

  destroy() {
    this.elements.forEach((element) => element.remove());
    this.elements = [];
  }
}

// Initialize particle systems when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize main particle system
  if (document.getElementById("particles-js")) {
    window.advancedParticles = new AdvancedParticleSystem("particles-js");
  }

  // Initialize floating elements
  window.floatingElements = new FloatingElements();

  // Add particle burst on click
  document.addEventListener("click", (e) => {
    if (window.advancedParticles && window.advancedParticles.isActive) {
      window.advancedParticles.addParticleBurst(e.clientX, e.clientY, 15);
    }
  });
});

// Export configurations and classes
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    particlesConfig,
    educationalParticlesConfig,
    AdvancedParticleSystem,
    FloatingElements,
  };
}

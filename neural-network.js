/**
 * NEURAL NETWORK VISUALIZATION
 * Dynamic background animation for futuristic educational interface
 */

class NeuralNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.nodes = [];
    this.connections = [];
    this.animationId = null;

    this.config = {
      nodeCount: 50,
      maxDistance: 150,
      nodeSpeed: 0.5,
      pulseSpeed: 0.02,
      connectionOpacity: 0.1,
      nodeOpacity: 0.3,
      primaryColor: "0, 212, 255",
      secondaryColor: "131, 56, 236",
      tertiaryColor: "6, 255, 165",
    };

    this.init();
  }

  init() {
    this.resize();
    this.createNodes();
    this.animate();

    // Handle resize
    window.addEventListener("resize", () => {
      this.resize();
      this.createNodes();
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createNodes() {
    this.nodes = [];

    for (let i = 0; i < this.config.nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.nodeSpeed,
        vy: (Math.random() - 0.5) * this.config.nodeSpeed,
        radius: Math.random() * 3 + 1,
        pulse: Math.random() * Math.PI * 2,
        type: Math.floor(Math.random() * 3), // 0: primary, 1: secondary, 2: tertiary
      });
    }
  }

  updateNodes() {
    this.nodes.forEach((node) => {
      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges
      if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

      // Keep within bounds
      node.x = Math.max(0, Math.min(this.canvas.width, node.x));
      node.y = Math.max(0, Math.min(this.canvas.height, node.y));

      // Update pulse
      node.pulse += this.config.pulseSpeed;
    });
  }

  drawConnections() {
    this.ctx.strokeStyle = `rgba(${this.config.primaryColor}, ${this.config.connectionOpacity})`;
    this.ctx.lineWidth = 1;

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.maxDistance) {
          const opacity =
            (1 - distance / this.config.maxDistance) *
            this.config.connectionOpacity;

          // Gradient based on node types
          const gradient = this.ctx.createLinearGradient(
            this.nodes[i].x,
            this.nodes[i].y,
            this.nodes[j].x,
            this.nodes[j].y
          );

          const color1 = this.getNodeColor(this.nodes[i].type);
          const color2 = this.getNodeColor(this.nodes[j].type);

          gradient.addColorStop(0, `rgba(${color1}, ${opacity})`);
          gradient.addColorStop(1, `rgba(${color2}, ${opacity})`);

          this.ctx.strokeStyle = gradient;
          this.ctx.beginPath();
          this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
          this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
          this.ctx.stroke();

          // Add data flow animation
          if (Math.random() > 0.99) {
            this.animateDataFlow(this.nodes[i], this.nodes[j]);
          }
        }
      }
    }
  }

  drawNodes() {
    this.nodes.forEach((node) => {
      const pulseSize = Math.sin(node.pulse) * 0.5 + 1;
      const radius = node.radius * pulseSize;

      // Outer glow
      const gradient = this.ctx.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        radius * 3
      );

      const color = this.getNodeColor(node.type);
      gradient.addColorStop(0, `rgba(${color}, ${this.config.nodeOpacity})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Core node
      this.ctx.fillStyle = `rgba(${color}, ${this.config.nodeOpacity * 2})`;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Inner core
      this.ctx.fillStyle = `rgba(255, 255, 255, ${this.config.nodeOpacity})`;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius * 0.3, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  getNodeColor(type) {
    switch (type) {
      case 0:
        return this.config.primaryColor;
      case 1:
        return this.config.secondaryColor;
      case 2:
        return this.config.tertiaryColor;
      default:
        return this.config.primaryColor;
    }
  }

  animateDataFlow(node1, node2) {
    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const x = node1.x + (node2.x - node1.x) * progress;
        const y = node1.y + (node2.y - node1.y) * progress;

        // Draw data packet
        this.ctx.fillStyle = `rgba(${this.config.tertiaryColor}, 0.8)`;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Add trail effect
        this.ctx.strokeStyle = `rgba(${this.config.tertiaryColor}, 0.3)`;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(node1.x, node1.y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  addInteractivity() {
    let mouseX = 0;
    let mouseY = 0;

    this.canvas.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Attract nearby nodes to cursor
      this.nodes.forEach((node) => {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          node.vx += dx * 0.0001;
          node.vy += dy * 0.0001;
        }
      });
    });

    this.canvas.addEventListener("click", (e) => {
      // Create expansion wave effect
      this.createExpansionWave(e.clientX, e.clientY);
    });
  }

  createExpansionWave(centerX, centerY) {
    const startTime = Date.now();
    const duration = 1500;
    const maxRadius = 200;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const radius = maxRadius * progress;
        const opacity = (1 - progress) * 0.3;

        this.ctx.strokeStyle = `rgba(${this.config.primaryColor}, ${opacity})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();

        // Create multiple rings
        if (progress > 0.3) {
          const innerRadius = radius * 0.5;
          this.ctx.strokeStyle = `rgba(${this.config.secondaryColor}, ${
            opacity * 0.5
          })`;
          this.ctx.beginPath();
          this.ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
          this.ctx.stroke();
        }

        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateNodes();
    this.drawConnections();
    this.drawNodes();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Matrix Rain Effect (Alternative background)
class MatrixRain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.columns = [];
    this.fontSize = 14;
    this.characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

    this.init();
  }

  init() {
    this.resize();
    this.createColumns();
    this.animate();

    window.addEventListener("resize", () => {
      this.resize();
      this.createColumns();
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createColumns() {
    const columnCount = Math.floor(this.canvas.width / this.fontSize);
    this.columns = [];

    for (let i = 0; i < columnCount; i++) {
      this.columns[i] = {
        y: Math.random() * this.canvas.height,
        speed: Math.random() * 3 + 1,
      };
    }
  }

  animate() {
    // Create trail effect
    this.ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "rgba(0, 212, 255, 0.8)";
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.columns.length; i++) {
      const char =
        this.characters[Math.floor(Math.random() * this.characters.length)];
      const x = i * this.fontSize;
      const y = this.columns[i].y;

      this.ctx.fillText(char, x, y);

      if (y > this.canvas.height && Math.random() > 0.975) {
        this.columns[i].y = 0;
      }

      this.columns[i].y += this.columns[i].speed;
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize Neural Network when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const neuralCanvas = document.getElementById("neural-canvas");
  if (neuralCanvas) {
    const network = new NeuralNetwork(neuralCanvas);
    network.addInteractivity();

    // Store reference for potential cleanup
    window.neuralNetwork = network;
  }
});

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { NeuralNetwork, MatrixRain };
}

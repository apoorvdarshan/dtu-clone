/**
 * FUTURISTIC DTU WEBSITE - JAVASCRIPT
 * Advanced Educational Interface with Modern Technologies
 * Technologies: GSAP, Three.js, Particles.js, Web APIs
 */

// Global Variables
let scene,
  camera,
  renderer,
  stars = [];
let currentSlide = 0;
let currentTab = "latest-news";
let isLoading = true;
let cursor = { x: 0, y: 0 };

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeLoading();
  initializeCursor();
  initializeBackgroundEffects();
  initializeParticles();
  initializeScrollAnimations();
  initializeSlider();
  initializeTabs();
  initializeSearch();
  initializeNavigation();
  initializeAI();
  initializeCriticalUpdates();
  initializeWebResources();
  initializeImportantLinks();
  initializeRealTimeUpdates();
  initializeVisitCounter();
  initializeMobileHeader();
  initializeFuturisticEffects();
  initializeSocialIcons();

  // New Advanced Features
  initializeQuantumField();
  initializeVoiceRecognition();
  initializeControlPanel();
  initializeSystemStatus();
  initializeAdvancedAI();
  initializeSystemMonitoring();

  // Start loading sequence
  startLoadingSequence();
});

/**
 * LOADING SYSTEM
 */
function initializeLoading() {
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.querySelector(".progress-bar");
  const progressPercentage = document.querySelector(".progress-percentage");

  if (!loadingScreen) return;

  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) {
      progress = 100;
      clearInterval(interval);

      // Complete loading
      setTimeout(() => {
        gsap.to(loadingScreen, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            loadingScreen.style.display = "none";
            isLoading = false;
            startMainAnimations();
          },
        });
      }, 500);
    }

    progressPercentage.textContent = Math.floor(progress) + "%";
    gsap.to(progressBar, {
      width: progress + "%",
      duration: 0.3,
      ease: "power2.out",
    });
  }, 200);
}

function startLoadingSequence() {
  const loadingText = document.querySelector(".loading-text .glitch");
  const loadingLogo = document.querySelector(".loading-logo img");

  // Animate loading elements
  gsap
    .timeline()
    .from(loadingLogo, {
      scale: 0,
      rotation: 360,
      duration: 1,
      ease: "back.out(1.7)",
    })
    .from(loadingText, { y: 50, opacity: 0, duration: 0.8 }, "-=0.5")
    .from(".loading-progress", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3");
}

function startMainAnimations() {
  // Animate main elements into view
  gsap
    .timeline()
    .from(".top-header", {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      ".main-header",
      { y: -50, opacity: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .from(
      ".main-nav",
      { y: -30, opacity: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .from(
      ".futuristic-marquee",
      { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.2"
    )
    .from(
      ".content-grid",
      { y: 50, opacity: 0, duration: 1, ease: "power3.out" },
      "-=0.4"
    );
}

/**
 * CUSTOM CURSOR SYSTEM
 */
function initializeCursor() {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  if (!cursorDot || !cursorRing) return;

  document.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    gsap.to(cursorDot, { x: cursor.x, y: cursor.y, duration: 0.1 });
    gsap.to(cursorRing, { x: cursor.x, y: cursor.y, duration: 0.3 });
  });

  // Cursor interactions
  const interactiveElements = document.querySelectorAll(
    "a, button, .tab-btn, .slider-btn, .news-item"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      gsap.to(cursorRing, { scale: 1.5, duration: 0.3 });
      gsap.to(cursorDot, { scale: 2, duration: 0.3 });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(cursorRing, { scale: 1, duration: 0.3 });
      gsap.to(cursorDot, { scale: 1, duration: 0.3 });
    });
  });
}

/**
 * 3D BACKGROUND EFFECTS
 */
function initializeBackgroundEffects() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  // Three.js setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Create stars
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 2000;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000;
  }

  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const starMaterial = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 2,
    transparent: true,
    opacity: 0.8,
  });

  const starsField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starsField);

  camera.position.z = 1000;

  // Animation loop
  function animateStars() {
    requestAnimationFrame(animateStars);

    starsField.rotation.x += 0.0005;
    starsField.rotation.y += 0.0002;

    renderer.render(scene, camera);
  }

  animateStars();

  // Handle resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/**
 * PARTICLE SYSTEM
 */
function initializeParticles() {
  if (typeof particlesJS === "undefined") return;

  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#00d4ff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.5,
        random: false,
        anim: { enable: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00d4ff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
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
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
}

/**
 * SCROLL ANIMATIONS
 */
function initializeScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Animate elements on scroll
  const scrollElements = document.querySelectorAll("[data-scroll]");

  scrollElements.forEach((element, index) => {
    gsap.fromTo(
      element,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1,
      }
    );
  });

  // Parallax effects
  gsap.to("#bg-canvas", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

/**
 * FUTURISTIC SLIDER SYSTEM
 */
function initializeSlider() {
  const slides = [
    {
      image: "assets/s1.jpeg",
      title: "11th Convocation 2024",
      description:
        "Celebrating excellence in technological education and innovation",
    },
    {
      image: "assets/s2.jpeg",
      title: "Golden Pride Function 2024",
      description: "Honoring achievements and fostering community spirit",
    },
    {
      image: "assets/s3.jpeg",
      title: "Vigilance Awareness Week 2024",
      description: "Promoting transparency and ethical practices",
    },
    {
      image: "assets/s4.jpeg",
      title: "Homecoming Meet 2024",
      description: "Welcoming alumni back to their alma mater",
    },
    {
      image: "assets/s5.jpeg",
      title: "Republic Day Celebration 2024",
      description: "Commemorating national pride and unity",
    },
    {
      image: "assets/s6.jpeg",
      title: "Address by Hon'ble LG on Convocation",
      description: "Inspiring words from distinguished leadership",
    },
    {
      image: "assets/s7.jpeg",
      title: "Lighting of Lamp Golden Pride Function",
      description: "Traditional ceremony marking new beginnings",
    },
    {
      image: "assets/s8.jpeg",
      title: "10th International Day of YOGA",
      description: "Promoting wellness and mindful living",
    },
    {
      image: "assets/s9.jpeg",
      title: "International YOGA Celebration",
      description: "Community participation in global wellness initiative",
    },
  ];

  const sliderContainer = document.querySelector(".slider-container");
  const sliderDots = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!sliderContainer) return;

  // Create slides
  sliderContainer.innerHTML = slides
    .map(
      (slide, index) => `
        <div class="slide ${index === 0 ? "active" : ""}" data-slide="${index}">
            <div class="slide-image">
                <img src="${slide.image}" alt="${slide.title}" />
                <div class="image-overlay"></div>
            </div>
            <div class="slide-content">
                <h3>${slide.title}</h3>
                <p>${slide.description}</p>
            </div>
        </div>
    `
    )
    .join("");

  // Create dots
  sliderDots.innerHTML = slides
    .map(
      (_, index) => `
        <div class="slider-dot ${
          index === 0 ? "active" : ""
        }" data-slide="${index}"></div>
    `
    )
    .join("");

  const allSlides = document.querySelectorAll(".slide");
  const allDots = document.querySelectorAll(".slider-dot");

  function showSlide(index) {
    // Remove active classes
    allSlides.forEach((slide) => slide.classList.remove("active"));
    allDots.forEach((dot) => dot.classList.remove("active"));

    // Add active classes
    allSlides[index].classList.add("active");
    allDots[index].classList.add("active");

    // Animate slide transition
    gsap.fromTo(
      allSlides[index],
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Dot navigation
  allDots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  // Auto-play
  setInterval(nextSlide, 6000);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });
}

/**
 * DYNAMIC TAB SYSTEM
 */
function initializeTabs() {
  const tabData = {
    "latest-news": [
      {
        date: "26.12.2024",
        text: "University shall remain open on 31-05-2025 (Saturday) for upcoming visit of NAAC",
        isNew: false,
      },
      {
        date: "18.12.2024",
        text: "Ph.D Summer Admission 2025 - Applications now open with extended deadline",
        isNew: true,
      },
      {
        date: "16.12.2024",
        text: "B.Design Admission 2025 :: Admission Live on 16-04-2025",
        isNew: false,
      },
      {
        date: "14.12.2024",
        text: "M.Design Admission 2025 :: Creative portfolio submission guidelines released",
        isNew: false,
      },
      {
        date: "12.12.2024",
        text: "B.Tech Continuing Education Admission 2025 :: Admission Live now",
        isNew: false,
      },
      {
        date: "10.12.2024",
        text: "M.Tech by Research Admission 2025 :: Interview schedule published",
        isNew: false,
      },
      {
        date: "08.12.2024",
        text: "International Conference on AI and Machine Learning - Call for Papers",
        isNew: true,
      },
      {
        date: "06.12.2024",
        text: "Industry Collaboration Program launches with 50+ partner companies",
        isNew: true,
      },
    ],
    notices: [
      {
        date: "25.12.2024",
        text: "Winter Break Schedule for Academic Year 2024-25 - Updated timings",
        isNew: false,
      },
      {
        date: "23.12.2024",
        text: "End Term Examination Schedule December 2024 - Seating arrangements",
        isNew: false,
      },
      {
        date: "21.12.2024",
        text: "Library Timing Changes during Examination Period - 24/7 access",
        isNew: false,
      },
      {
        date: "19.12.2024",
        text: "Registration Schedule for Summer Semester AY 2024-25",
        isNew: false,
      },
      {
        date: "17.12.2024",
        text: "Make-up Examination Guidelines - Important procedures",
        isNew: false,
      },
      {
        date: "15.12.2024",
        text: "Academic Calendar Revision for Spring Semester 2025",
        isNew: true,
      },
    ],
    jobs: [
      {
        date: "24.12.2024",
        text: "Faculty Recruitment - Computer Science & AI Department",
        isNew: true,
      },
      {
        date: "22.12.2024",
        text: "Research Associate Position - Quantum Computing Lab",
        isNew: true,
      },
      {
        date: "20.12.2024",
        text: "Administrative Officer Position - Digital Innovation Cell",
        isNew: false,
      },
      {
        date: "18.12.2024",
        text: "Guest Faculty Requirement - Data Science Department",
        isNew: false,
      },
    ],
    tenders: [
      {
        date: "23.12.2024",
        text: "Smart Campus Infrastructure Development - Phase II",
        isNew: true,
      },
      {
        date: "21.12.2024",
        text: "AI-Powered Learning Management System Procurement",
        isNew: false,
      },
      {
        date: "19.12.2024",
        text: "Renewable Energy Systems Installation - Solar Grid",
        isNew: false,
      },
    ],
    events: [
      {
        date: "30.12.2024",
        text: "New Year Tech Innovation Showcase - Student Projects",
        isNew: true,
      },
      {
        date: "28.12.2024",
        text: "Futuristic Education Summit 2025 - Global Participation",
        isNew: true,
      },
      {
        date: "26.12.2024",
        text: "Alumni Meet - Golden Jubilee Celebration & Networking",
        isNew: false,
      },
    ],
    reviews: [
      {
        date: "20.12.2024",
        text: "First Year AI Bootcamp - Registration Open",
        isNew: true,
      },
      {
        date: "18.12.2024",
        text: "Orientation Program Phase II - Digital Literacy",
        isNew: false,
      },
      {
        date: "16.12.2024",
        text: "Mentorship Program Matching - AI-Powered System",
        isNew: false,
      },
    ],
  };

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContent = document.querySelector(".tab-content-container");

  function showTab(tabId) {
    // Update active tab button
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");

    // Get content for this tab
    const content = tabData[tabId] || [];

    // Generate HTML
    const html =
      content
        .map(
          (item) => `
            <div class="news-item">
                <span class="news-date">Date: ${item.date}</span>
                <a href="#">${item.text}</a>
                ${item.isNew ? '<span class="new-badge">NEW</span>' : ""}
            </div>
        `
        )
        .join("") +
      '<a href="#" class="view-all" onclick="showNotification(\'Loading all updates...\', \'info\')">View All Updates →</a>';

    // Update content immediately without opacity animations
    tabContent.innerHTML = `<div class="tab-content active">${html}</div>`;

    // Simple slide-in animation for items without opacity issues
    gsap.from(".news-item", {
      x: -20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
    });

    currentTab = tabId;
  }

  // Event listeners
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");
      showTab(tabId);
    });
  });

  // Initialize first tab
  showTab("latest-news");
}

/**
 * ADVANCED SEARCH SYSTEM
 */
function initializeSearch() {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const suggestions = document.getElementById("search-suggestions");

  if (!searchInput) return;

  const searchData = [
    "Admission Guidelines",
    "Academic Calendar",
    "Faculty Directory",
    "Research Projects",
    "Library Resources",
    "Student Portal",
    "Examination Results",
    "Fee Structure",
    "Placement Statistics",
    "Alumni Network",
    "Campus Facilities",
    "Hostel Information",
    "Transportation",
    "Scholarships",
    "International Programs",
  ];

  let searchTimeout;

  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.toLowerCase().trim();

    if (query.length < 2) {
      suggestions.classList.remove("show");
      return;
    }

    searchTimeout = setTimeout(() => {
      const matches = searchData.filter((item) =>
        item.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        suggestions.innerHTML = matches
          .slice(0, 5)
          .map(
            (match) => `
                    <div class="suggestion-item" onclick="selectSuggestion('${match}')">
                        <i class="fas fa-search"></i>
                        <span>${match}</span>
                    </div>
                `
          )
          .join("");
        suggestions.classList.add("show");
      } else {
        suggestions.classList.remove("show");
      }
    }, 300);
  });

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") performSearch();
  });

  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      // Simulate search with futuristic effect
      gsap.to(searchBtn, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // Here you would implement actual search functionality
          showNotification(`Searching for: "${query}"`, "info");
        },
      });
    }
  }

  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
      suggestions.classList.remove("show");
    }
  });
}

window.selectSuggestion = function (suggestion) {
  document.getElementById("search-input").value = suggestion;
  document.getElementById("search-suggestions").classList.remove("show");
  performSearch();
};

/**
 * NAVIGATION SYSTEM
 */
function initializeNavigation() {
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      // Animate hamburger
      const spans = mobileToggle.querySelectorAll("span");
      if (navMenu.classList.contains("active")) {
        gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
        gsap.to(spans[1], { opacity: 0, duration: 0.3 });
        gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
      } else {
        gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, duration: 0.3 });
        gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
      }
    });
  }

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Add click effect
      gsap.to(link, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    });
  });
}

/**
 * AI ASSISTANT SYSTEM
 */
function initializeAI() {
  const chatInput = document.querySelector(".ai-chat input");
  const chatButton = document.querySelector(".ai-chat button");
  const chatMessages = document.querySelector(".chat-messages");

  if (!chatInput || !chatButton || !chatMessages) return;

  const responses = [
    "I can help you find information about admissions, courses, and campus facilities.",
    "Our university offers cutting-edge programs in AI, Data Science, and Emerging Technologies.",
    "Would you like to know about our research opportunities or industry partnerships?",
    "I can assist with navigation through our digital ecosystem. What are you looking for?",
    "Our smart campus features include IoT integration, renewable energy, and digital infrastructure.",
  ];

  function addMessage(message, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user-message" : "ai-message"}`;
    messageDiv.innerHTML = `
            <i class="fas fa-${isUser ? "user" : "robot"}"></i>
            <span>${message}</span>
        `;

    chatMessages.appendChild(messageDiv);

    // Animate message
    gsap.from(messageDiv, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    chatInput.value = "";

    // Simulate AI response
    setTimeout(() => {
      const response = responses[Math.floor(Math.random() * responses.length)];
      addMessage(response);
    }, 1000);
  }

  chatButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

/**
 * REAL-TIME UPDATES
 */
function initializeRealTimeUpdates() {
  // Update timestamp
  function updateTimestamp() {
    const timestamp = document.getElementById("last-updated");
    if (timestamp) {
      const now = new Date();
      timestamp.textContent = now.toLocaleString();
    }
  }

  updateTimestamp();
  setInterval(updateTimestamp, 60000); // Update every minute

  // Simulate real-time notifications
  const notifications = [
    "New research paper published in AI journal",
    "Industry partnership announcement",
    "Scholarship applications now open",
    "Campus event registration started",
    "Faculty achievement recognized globally",
  ];

  let notificationIndex = 0;
  setInterval(() => {
    if (Math.random() > 0.7) {
      // 30% chance every 30 seconds
      showNotification(notifications[notificationIndex], "info");
      notificationIndex = (notificationIndex + 1) % notifications.length;
    }
  }, 30000);
}

/**
 * NOTIFICATION SYSTEM
 */
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "info"
            ? "info-circle"
            : type === "success"
            ? "check-circle"
            : "exclamation-triangle"
        }"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "rgba(0, 212, 255, 0.1)",
    border: "1px solid rgba(0, 212, 255, 0.3)",
    borderRadius: "10px",
    padding: "1rem",
    color: "#ffffff",
    backdropFilter: "blur(10px)",
    zIndex: "10000",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    maxWidth: "300px",
    fontSize: "0.9rem",
  });

  document.body.appendChild(notification);

  // Animate in
  gsap.from(notification, {
    x: 300,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out",
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    gsap.to(notification, {
      x: 300,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => notification.remove(),
    });
  }, 5000);
}

/**
 * UTILITY FUNCTIONS
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance monitoring
function monitorPerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        console.log(`Page load time: ${loadTime}ms`);

        if (loadTime > 3000) {
          showNotification(
            "Page loaded slower than expected. Consider upgrading your connection.",
            "info"
          );
        }
      }, 0);
    });
  }
}

// Initialize performance monitoring
monitorPerformance();

// Service Worker registration for offline functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Export functions for global access
window.FuturisticDTU = {
  showNotification,
  selectSuggestion,
  currentSlide: () => currentSlide,
  currentTab: () => currentTab,
};

/**
 * CRITICAL UPDATES SYSTEM
 */
function initializeCriticalUpdates() {
  const updatesContainer = document.querySelector(
    ".important-updates .vertical-scroll"
  );

  if (!updatesContainer) return;

  const criticalUpdates = [
    {
      date: "26.12.2024",
      text: "NAAC Visit on 31-05-2025 - University remains open",
      icon: "exclamation-triangle",
      priority: "high",
    },
    {
      date: "25.12.2024",
      text: "Winter Break Schedule Released for AY 2024-25",
      icon: "calendar-alt",
      priority: "medium",
    },
    {
      date: "24.12.2024",
      text: "Emergency: Server Maintenance Tonight 11 PM - 2 AM",
      icon: "server",
      priority: "high",
    },
    {
      date: "23.12.2024",
      text: "End Term Exam Schedule December 2024 Published",
      icon: "file-alt",
      priority: "high",
    },
    {
      date: "22.12.2024",
      text: "Library Extended Hours during Exam Period",
      icon: "book-open",
      priority: "medium",
    },
    {
      date: "21.12.2024",
      text: "Fee Payment Deadline Extended to 30th December",
      icon: "credit-card",
      priority: "high",
    },
    {
      date: "20.12.2024",
      text: "COVID-19 Vaccination Camp on Campus",
      icon: "shield-alt",
      priority: "medium",
    },
    {
      date: "19.12.2024",
      text: "Scholarship Application Deadline Approaching",
      icon: "graduation-cap",
      priority: "high",
    },
    {
      date: "18.12.2024",
      text: "Campus WiFi Upgrade Scheduled",
      icon: "wifi",
      priority: "low",
    },
    {
      date: "17.12.2024",
      text: "Industry Visit Registration Now Open",
      icon: "building",
      priority: "medium",
    },
    {
      date: "16.12.2024",
      text: "Anti-Ragging Committee Meeting Results",
      icon: "users",
      priority: "medium",
    },
    {
      date: "15.12.2024",
      text: "New Course Registration for Spring Semester",
      icon: "plus-circle",
      priority: "high",
    },
    {
      date: "14.12.2024",
      text: "Campus Security Protocol Updates",
      icon: "lock",
      priority: "high",
    },
    {
      date: "13.12.2024",
      text: "Research Paper Submission Deadline Extended",
      icon: "file-upload",
      priority: "medium",
    },
    {
      date: "12.12.2024",
      text: "Alumni Meet Registration Starts Today",
      icon: "handshake",
      priority: "low",
    },
  ];

  // Create the scrolling content
  const scrollingContent = criticalUpdates
    .map((update) => {
      const priorityColor =
        update.priority === "high"
          ? "#ff006e"
          : update.priority === "medium"
          ? "#ffbe0b"
          : "#06ffa5";

      return `
      <div class="update-item" data-priority="${update.priority}">
        <i class="fas fa-${update.icon}" style="color: ${priorityColor}"></i>
        <div class="update-content">
          <a href="#">${update.text}</a>
          <div class="date">${update.date}</div>
        </div>
      </div>
    `;
    })
    .join("");

  updatesContainer.innerHTML = scrollingContent;

  // Add hover pause functionality
  const container = document.querySelector(".updates-container");
  if (container) {
    container.addEventListener("mouseenter", () => {
      updatesContainer.style.animationPlayState = "paused";
    });

    container.addEventListener("mouseleave", () => {
      updatesContainer.style.animationPlayState = "running";
    });
  }

  // Add click functionality to update items
  const updateItems = updatesContainer.querySelectorAll(".update-item");
  updateItems.forEach((item) => {
    item.addEventListener("click", () => {
      const text = item.querySelector("a").textContent;
      showNotification(`Opening: ${text}`, "info");

      // Add click effect
      gsap.to(item, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    });
  });
}

/**
 * WEB RESOURCES SYSTEM
 */
function initializeWebResources() {
  const resourcesGrid = document.querySelector(
    ".web-resources .resources-grid"
  );

  if (!resourcesGrid) return;

  const resources = [
    { name: "Student Portal", icon: "user-graduate", url: "#" },
    { name: "Library Access", icon: "book", url: "#" },
    { name: "E-Learning", icon: "laptop", url: "#" },
    { name: "Research Hub", icon: "flask", url: "#" },
    { name: "Digital Labs", icon: "desktop", url: "#" },
    { name: "Cloud Storage", icon: "cloud", url: "#" },
    { name: "AI Assistant", icon: "robot", url: "#" },
    { name: "Virtual Tours", icon: "street-view", url: "#" },
  ];

  resourcesGrid.innerHTML = resources
    .map(
      (resource) => `
    <div class="resource-item">
      <i class="fas fa-${resource.icon}"></i>
      <a href="${resource.url}">${resource.name}</a>
    </div>
  `
    )
    .join("");
}

/**
 * IMPORTANT LINKS SYSTEM
 */
function initializeImportantLinks() {
  const linksGrid = document.querySelector(".important-links .links-grid");

  if (!linksGrid) return;

  const links = [
    { name: "Academic Calendar", icon: "calendar", url: "#" },
    { name: "Fee Structure", icon: "money-bill", url: "#" },
    { name: "Exam Results", icon: "chart-line", url: "#" },
    { name: "Placement Cell", icon: "briefcase", url: "#" },
    { name: "Hostel Info", icon: "bed", url: "#" },
    { name: "Transport", icon: "bus", url: "#" },
    { name: "Medical Center", icon: "hospital", url: "#" },
    { name: "Sports Complex", icon: "running", url: "#" },
  ];

  linksGrid.innerHTML = links
    .map(
      (link) => `
    <div class="link-item">
      <i class="fas fa-${link.icon}"></i>
      <a href="${link.url}">${link.name}</a>
    </div>
  `
    )
    .join("");
}

/**
 * VISIT COUNTER SYSTEM
 */
function initializeVisitCounter() {
  const visitCountElement = document.getElementById("visit-count");
  const apiUrl =
    "https://api.countapi.xyz/hit/apoorvdarshan.github.io/dtu-clone";

  if (!visitCountElement) return;

  // Function to update visit count display with animation
  function updateVisitCount(count) {
    const currentCount = parseInt(visitCountElement.textContent) || 0;

    // Animate counter increment
    const increment = Math.ceil((count - currentCount) / 20);
    let current = currentCount;

    const timer = setInterval(() => {
      current += increment;
      if (current >= count) {
        current = count;
        clearInterval(timer);
      }

      visitCountElement.textContent = current.toLocaleString();

      // Add pulse effect on update
      visitCountElement.style.transform = "scale(1.1)";
      setTimeout(() => {
        visitCountElement.style.transform = "scale(1)";
      }, 150);
    }, 50);
  }

  // Function to format large numbers
  function formatCount(count) {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  }

  // Fetch visit count from API
  async function fetchVisitCount() {
    try {
      visitCountElement.textContent = "Loading...";

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.value !== undefined) {
        updateVisitCount(data.value);

        // Store in localStorage for offline display
        localStorage.setItem("dtu-visit-count", data.value.toString());
        localStorage.setItem("dtu-visit-timestamp", Date.now().toString());
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.log("Visit counter API error:", error);

      // Fallback: try to get cached count
      const cachedCount = localStorage.getItem("dtu-visit-count");
      const cachedTimestamp = localStorage.getItem("dtu-visit-timestamp");

      if (cachedCount && cachedTimestamp) {
        const hoursSinceCache =
          (Date.now() - parseInt(cachedTimestamp)) / (1000 * 60 * 60);

        if (hoursSinceCache < 24) {
          // Use cache if less than 24 hours old
          visitCountElement.textContent =
            parseInt(cachedCount).toLocaleString() + "+";
        } else {
          visitCountElement.textContent = "Unavailable";
        }
      } else {
        // Show estimated count based on deployment date
        const deploymentDate = new Date("2024-12-26");
        const daysSinceDeploy = Math.floor(
          (Date.now() - deploymentDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        const estimatedViews = Math.max(daysSinceDeploy * 50, 1250); // Estimated 50 views per day

        visitCountElement.textContent = estimatedViews.toLocaleString() + "+";
      }
    }
  }

  // Initialize visit counter
  fetchVisitCount();

  // Add click handler for manual refresh
  const visitCounter = document.querySelector(".visit-counter");
  if (visitCounter) {
    visitCounter.addEventListener("click", () => {
      fetchVisitCount();

      // Add click feedback
      visitCounter.style.transform = "scale(0.95)";
      setTimeout(() => {
        visitCounter.style.transform = "scale(1)";
      }, 150);
    });

    // Add tooltip
    visitCounter.title = "Click to refresh visit count";
  }

  // Update counter every 5 minutes for active users
  setInterval(() => {
    if (!document.hidden) {
      fetchVisitCount();
    }
  }, 5 * 60 * 1000);
}

/**
 * MOBILE HEADER SYSTEM
 */
function initializeMobileHeader() {
  const mobileToggle = document.getElementById("mobile-header-toggle");
  const headerLinks = document.getElementById("header-links");

  if (mobileToggle && headerLinks) {
    mobileToggle.addEventListener("click", () => {
      headerLinks.classList.toggle("mobile-expanded");

      // Update toggle button appearance
      const icon = mobileToggle.querySelector("i");
      const text = mobileToggle.querySelector("span");

      if (headerLinks.classList.contains("mobile-expanded")) {
        icon.className = "fas fa-times";
        text.textContent = "Close Links";

        // Add expanded effect
        gsap.to(mobileToggle, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out",
        });
      } else {
        icon.className = "fas fa-bars";
        text.textContent = "Quick Links";

        // Reset scale
        gsap.to(mobileToggle, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!mobileToggle.contains(e.target) && !headerLinks.contains(e.target)) {
        headerLinks.classList.remove("mobile-expanded");
        const icon = mobileToggle.querySelector("i");
        const text = mobileToggle.querySelector("span");
        icon.className = "fas fa-bars";
        text.textContent = "Quick Links";

        gsap.to(mobileToggle, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    });
  }
}

/**
 * FUTURISTIC EFFECTS SYSTEM
 */
function initializeFuturisticEffects() {
  // Enhanced glitch effects for titles
  initializeGlitchEffects();

  // Holographic scanning effects
  initializeHolographicScanning();

  // Cyber interactions
  initializeCyberInteractions();

  // Data stream animations
  initializeDataStreams();
}

function initializeGlitchEffects() {
  const glitchElements = document.querySelectorAll(".glitch-title, .glitch");

  glitchElements.forEach((element) => {
    setInterval(() => {
      if (Math.random() > 0.9) {
        // 10% chance every 3 seconds
        element.style.animation = "none";
        element.offsetHeight; // Trigger reflow
        element.style.animation = "glitch-intense 0.3s ease-in-out";

        setTimeout(() => {
          element.style.animation = "rainbow-text 4s ease-in-out infinite";
        }, 300);
      }
    }, 3000);
  });
}

function initializeHolographicScanning() {
  const scanElements = document.querySelectorAll(
    ".sidebar-module, .futuristic-news, .main-header"
  );

  scanElements.forEach((element) => {
    setInterval(() => {
      if (Math.random() > 0.8) {
        // 20% chance every 5 seconds
        const scanner = document.createElement("div");
        scanner.className = "holographic-scanner";
        scanner.style.cssText = `
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), transparent);
          pointer-events: none;
          z-index: 10;
        `;

        element.style.position = "relative";
        element.appendChild(scanner);

        gsap.to(scanner, {
          left: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => scanner.remove(),
        });
      }
    }, 5000);
  });
}

function initializeCyberInteractions() {
  // Enhanced hover effects for interactive elements
  const interactiveElements = document.querySelectorAll(
    ".neon-link, .nav-link, .tab-btn, .news-item, .resource-item, .link-item"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      // Add cyber glow effect
      gsap.to(element, {
        boxShadow:
          "0 0 20px rgba(0, 212, 255, 0.5), inset 0 0 10px rgba(0, 212, 255, 0.1)",
        duration: 0.3,
      });

      // Random glitch effect
      if (Math.random() > 0.7) {
        gsap.fromTo(
          element,
          { x: 0 },
          {
            x: [2, -2, 1, -1, 0],
            duration: 0.3,
            ease: "power2.inOut",
          }
        );
      }
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        boxShadow: "none",
        duration: 0.3,
      });
    });

    element.addEventListener("click", () => {
      // Cyber click effect
      gsap.fromTo(
        element,
        { scale: 1 },
        {
          scale: [0.95, 1.05, 1],
          duration: 0.4,
          ease: "back.out(1.7)",
        }
      );

      // Add energy pulse
      const pulse = document.createElement("div");
      pulse.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1000;
      `;

      element.style.position = "relative";
      element.appendChild(pulse);

      gsap.to(pulse, {
        scale: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => pulse.remove(),
      });
    });
  });
}

function initializeDataStreams() {
  // Create floating data particles
  const container = document.body;

  setInterval(() => {
    if (Math.random() > 0.9) {
      // 10% chance every 2 seconds
      const particle = document.createElement("div");
      particle.textContent = Math.random() > 0.5 ? "1" : "0";
      particle.style.cssText = `
        position: fixed;
        color: rgba(0, 212, 255, 0.3);
        font-family: var(--font-mono);
        font-size: ${Math.random() * 8 + 8}px;
        left: ${Math.random() * window.innerWidth}px;
        top: -20px;
        pointer-events: none;
        z-index: -7;
      `;

      container.appendChild(particle);

      gsap.to(particle, {
        y: window.innerHeight + 20,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        ease: "none",
        onComplete: () => particle.remove(),
      });
    }
  }, 2000);
}

// Add CSS for glitch-intense animation
const glitchStyle = document.createElement("style");
glitchStyle.textContent = `
  @keyframes glitch-intense {
    0%, 100% { transform: translate(0); }
    10% { transform: translate(-2px, 2px); }
    20% { transform: translate(2px, -2px); }
    30% { transform: translate(-2px, -2px); }
    40% { transform: translate(2px, 2px); }
    50% { transform: translate(-2px, 2px); }
    60% { transform: translate(2px, -2px); }
    70% { transform: translate(-2px, -2px); }
    80% { transform: translate(2px, 2px); }
    90% { transform: translate(-2px, 2px); }
  }
`;
document.head.appendChild(glitchStyle);

/**
 * SOCIAL ICONS SYSTEM
 */
function initializeSocialIcons() {
  const socialLinks = document.querySelectorAll(
    ".social-link, .social-link-footer"
  );

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });
  });
}

/**
 * QUANTUM FIELD EFFECTS
 */
function initializeQuantumField() {
  const quantumField = document.getElementById("quantum-field");
  if (!quantumField) return;

  // Create quantum particles
  for (let i = 0; i < 50; i++) {
    createQuantumParticle();
  }

  // Create quantum entanglements
  for (let i = 0; i < 20; i++) {
    createQuantumEntanglement();
  }

  function createQuantumParticle() {
    const particle = document.createElement("div");
    particle.className = "quantum-particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 4 + 4 + "s";
    quantumField.appendChild(particle);

    // Quantum tunneling effect
    setInterval(() => {
      if (Math.random() < 0.1) {
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.to(particle, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "power2.inOut",
            });
          },
        });
      }
    }, 3000 + Math.random() * 5000);
  }

  function createQuantumEntanglement() {
    const entanglement = document.createElement("div");
    entanglement.className = "quantum-entanglement";
    entanglement.style.left = Math.random() * 100 + "%";
    entanglement.style.top = Math.random() * 100 + "%";
    entanglement.style.animationDelay = Math.random() * 3 + "s";
    entanglement.style.transform = `rotate(${Math.random() * 360}deg)`;
    quantumField.appendChild(entanglement);
  }
}

/**
 * VOICE RECOGNITION INTERFACE
 */
function initializeVoiceRecognition() {
  const voiceCommand = document.getElementById("voice-command");
  if (!voiceCommand || !("webkitSpeechRecognition" in window)) return;

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  let isListening = false;

  // Voice activation hotkey (Ctrl + Shift + V)
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "V") {
      toggleVoiceRecognition();
    }
  });

  function toggleVoiceRecognition() {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  }

  function startListening() {
    isListening = true;
    voiceCommand.classList.add("active");
    recognition.start();

    gsap.fromTo(
      voiceCommand,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  }

  function stopListening() {
    isListening = false;
    recognition.stop();

    gsap.to(voiceCommand, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        voiceCommand.classList.remove("active");
      },
    });
  }

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    processVoiceCommand(command);
    stopListening();
  };

  recognition.onerror = () => {
    stopListening();
  };

  function processVoiceCommand(command) {
    if (command.includes("search")) {
      const searchInput = document.getElementById("search-input");
      searchInput.focus();
      showNotification("Voice search activated", "success");
    } else if (command.includes("news") || command.includes("latest")) {
      showTab("latest-news");
      showNotification("Switched to latest news", "info");
    } else if (command.includes("notices")) {
      showTab("notices");
      showNotification("Switched to notices", "info");
    } else if (command.includes("events")) {
      showTab("events");
      showNotification("Switched to events", "info");
    } else {
      showNotification('Command not recognized: "' + command + '"', "warning");
    }
  }
}

/**
 * CONTROL PANEL SYSTEM
 */
function initializeControlPanel() {
  const controlPanel = document.getElementById("control-panel");
  const panelToggle = document.getElementById("panel-toggle");

  if (!controlPanel || !panelToggle) return;

  let isOpen = false;

  // Toggle panel functionality
  panelToggle.addEventListener("click", () => {
    isOpen = !isOpen;
    controlPanel.classList.toggle("active", isOpen);

    // Update toggle button
    const icon = panelToggle.querySelector("i");
    icon.className = isOpen ? "fas fa-times" : "fas fa-cog";

    // Animation for toggle
    gsap.to(panelToggle, {
      rotation: isOpen ? 180 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    showNotification(
      isOpen ? "Mission Control activated" : "Mission Control closed",
      "info"
    );
  });

  // Initialize biometric scanner states
  const scanStates = [
    "RETINA SCAN ACTIVE",
    "ANALYZING BIOMETRIC DATA",
    "PROCESSING AUTHENTICATION",
    "ACCESS GRANTED",
    "WELCOME TO DTU SYSTEM",
  ];

  let currentScanState = 0;
  const scanStatus = controlPanel.querySelector(".scan-status-mini");

  if (scanStatus) {
    setInterval(() => {
      currentScanState = (currentScanState + 1) % scanStates.length;
      scanStatus.textContent = scanStates[currentScanState];
    }, 3000);
  }

  // Initialize quantum states
  const quantumStates = [
    "Quantum State: Superposition",
    "Quantum State: Entangled",
    "Quantum State: Coherent",
    "Quantum State: Collapsed",
    "Quantum State: Interference",
  ];

  let currentQuantumState = 0;
  const quantumStatus = controlPanel.querySelector(".quantum-status-mini");

  if (quantumStatus) {
    setInterval(() => {
      currentQuantumState = (currentQuantumState + 1) % quantumStates.length;
      quantumStatus.textContent = quantumStates[currentQuantumState];
    }, 3500);
  }

  // Initialize neural states
  const neuralStates = [
    "Neural Activity: Active",
    "Processing Cognitive Data",
    "Synaptic Activity Detected",
    "Learning Algorithms Engaged",
    "Consciousness Matrix Stable",
  ];

  let currentNeuralState = 0;
  const neuralStatus = controlPanel.querySelector(".neural-status-mini");

  if (neuralStatus) {
    setInterval(() => {
      currentNeuralState = (currentNeuralState + 1) % neuralStates.length;
      neuralStatus.textContent = neuralStates[currentNeuralState];
    }, 2500);
  }

  // Initialize hologram states
  const hologramStates = [
    "Data Flow: Active",
    "Network Traffic Monitor",
    "Quantum State Analyzer",
    "Information Flow Chart",
    "Digital Ecosystem Map",
  ];

  let currentHologramState = 0;
  const hologramStatus = controlPanel.querySelector(".hologram-status-mini");

  if (hologramStatus) {
    setInterval(() => {
      currentHologramState = (currentHologramState + 1) % hologramStates.length;
      hologramStatus.textContent = hologramStates[currentHologramState];
    }, 4000);
  }

  // Update security metrics
  const metricValues = controlPanel.querySelectorAll(".mini-metric-value");
  setInterval(() => {
    if (metricValues[0])
      metricValues[0].textContent = Math.floor(Math.random() * 256) + 256; // Firewall
    if (metricValues[2])
      metricValues[2].textContent = Math.floor(Math.random() * 3); // Threats
  }, 5000);

  // Add interactive effects to modules
  const miniModules = controlPanel.querySelectorAll(".mini-module");
  miniModules.forEach((module, index) => {
    module.addEventListener("click", () => {
      // Add click animation
      gsap.to(module, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });

      // Show different notifications based on module
      const moduleType = module.querySelector(
        ".module-mini-header span"
      ).textContent;
      showNotification(`${moduleType} interface accessed`, "success");
    });
  });

  // Quantum qubit color changes
  const qubits = controlPanel.querySelectorAll(".mini-qubit");
  qubits.forEach((qubit, index) => {
    setInterval(() => {
      const isEntangled = Math.random() < 0.3;
      if (isEntangled) {
        qubit.style.background =
          "radial-gradient(circle, transparent 60%, #ff00cc 80%)";
        qubit.style.borderColor = "#ff00cc";
      } else {
        qubit.style.background =
          "radial-gradient(circle, transparent 60%, #0066ff 80%)";
        qubit.style.borderColor = "#0066ff";
      }
    }, 1000 + index * 200);
  });
}

/**
 * SYSTEM STATUS SYSTEM
 */
function initializeSystemStatus() {
  const systemStatus = document.querySelector(".system-status");
  if (!systemStatus) return;

  const statusText = systemStatus.querySelector("span");
  const statusIndicator = systemStatus.querySelector(".status-indicator");

  const systemStates = [
    { text: "SYSTEM ONLINE", color: "#06ffa5", status: "optimal" },
    { text: "QUANTUM SYNC", color: "#00d4ff", status: "processing" },
    { text: "NEURAL ACTIVE", color: "#ff00cc", status: "learning" },
    { text: "SECURITY OK", color: "#06ffa5", status: "secure" },
    { text: "DATA STREAM", color: "#00ffff", status: "flowing" },
  ];

  let currentSystemState = 0;

  setInterval(() => {
    currentSystemState = (currentSystemState + 1) % systemStates.length;
    const state = systemStates[currentSystemState];

    statusText.textContent = state.text;
    statusIndicator.style.background = state.color;
    statusText.style.color = state.color;

    // Add pulse effect on state change
    gsap.fromTo(
      statusIndicator,
      { scale: 1 },
      { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.inOut" }
    );
  }, 3000);

  // Click interaction
  systemStatus.addEventListener("click", () => {
    gsap.to(systemStatus, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
    showNotification("System status check initiated", "info");
  });

  // Random glitch effect
  setInterval(() => {
    if (Math.random() < 0.1) {
      systemStatus.style.filter = "hue-rotate(180deg) brightness(1.2)";
      setTimeout(() => {
        systemStatus.style.filter = "none";
      }, 150);
    }
  }, 8000);
}

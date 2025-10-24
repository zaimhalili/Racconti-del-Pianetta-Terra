// ============================================
// BAMBINI BONSAI - INTERACTIVE SCRIPT
// Enhanced UX with particles, data viz, etc.
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all interactive elements
  initFadeAnimations();
  initSmoothScroll();
  initParallax();
  initNavbarEffects();
  initParticleSystem();
  initDataCounters();
  initCursorGlow();
  initScanlineEffect();
  initAudioSystem();
});

// ============================================
// FADE IN ANIMATIONS
// ============================================
function initFadeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((el) => observer.observe(el));
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ============================================
// PARALLAX EFFECTS
// ============================================
function initParallax() {
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;

        // Hero parallax
        const hero = document.querySelector(".hero");
        if (hero) {
          const gridOverlay = hero.querySelector(".grid-overlay");
          if (gridOverlay) {
            gridOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
          }
        }

        // Chapter image parallax
        const chapters = document.querySelectorAll(".story-chapter");
        chapters.forEach((chapter) => {
          const rect = chapter.getBoundingClientRect();
          const scrollPercent =
            (window.innerHeight - rect.top) / window.innerHeight;

          if (scrollPercent > -0.2 && scrollPercent < 1.2) {
            const image = chapter.querySelector(".chapter-image img");
            if (image) {
              image.style.transform = `scale(1.1) translateY(${scrollPercent * 30
                }px)`;
            }
          }
        });

        ticking = false;
      });

      ticking = true;
    }
  });
}

// ============================================
// NAVBAR EFFECTS
// ============================================
function initNavbarEffects() {
  const nav = document.querySelector(".nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.style.background = "rgba(13, 17, 23, 0.98)";
      nav.style.boxShadow = "0 4px 30px rgba(0, 242, 254, 0.1)";
    } else {
      nav.style.background = "rgba(13, 17, 23, 0.95)";
      nav.style.boxShadow = "none";
    }
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.style.color = "";
      if (link.getAttribute("href") === `#${current}`) {
        link.style.color = "var(--cyber-blue)";
      }
    });
  });
}

// ============================================
// PARTICLE SYSTEM FOR CHAPTER 4
// ============================================
function initParticleSystem() {
  const particleContainer = document.querySelector(".particle-system");
  if (!particleContainer) return;

  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: var(--cyber-blue);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.5 + 0.2};
      animation: float-particle ${Math.random() * 10 + 5}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
      box-shadow: 0 0 10px var(--cyber-blue);
    `;
    particleContainer.appendChild(particle);
  }

  // Add animation keyframes
  const style = document.createElement("style");
  style.textContent = `
    @keyframes float-particle {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(20px, -20px); }
      50% { transform: translate(-15px, 15px); }
      75% { transform: translate(15px, 5px); }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// DATA COUNTERS ANIMATION
// ============================================
function initDataCounters() {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          entry.target.classList.add("counted");
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-value").forEach((counter) => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element) {
  const text = element.textContent;
  if (text === "∞" || text === "SOSPENSIONE") {
    // Glitch effect for special values
    let glitchCount = 0;
    const glitchChars = ["█", "▓", "▒", "░", text];
    const interval = setInterval(() => {
      element.textContent = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      glitchCount++;
      if (glitchCount > 10) {
        element.textContent = text;
        clearInterval(interval);
      }
    }, 100);
  }
}

// ============================================
// CURSOR GLOW EFFECT
// ============================================
function initCursorGlow() {
  const cursor = document.createElement("div");
  cursor.className = "cursor-glow";
  cursor.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border: 2px solid var(--cyber-blue);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease-out;
    opacity: 0;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  const cursorDot = document.createElement("div");
  cursorDot.className = "cursor-dot";
  cursorDot.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: var(--cyber-blue);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: all 0.05s ease-out;
    opacity: 0;
    box-shadow: 0 0 20px var(--cyber-blue);
  `;
  document.body.appendChild(cursorDot);

  document.addEventListener("mousemove", (e) => {
    cursor.style.opacity = "0.6";
    cursorDot.style.opacity = "1";
    cursor.style.left = e.clientX - 20 + "px";
    cursor.style.top = e.clientY - 20 + "px";
    cursorDot.style.left = e.clientX - 3 + "px";
    cursorDot.style.top = e.clientY - 3 + "px";
  });

  // Interactive elements scale cursor
  const interactiveElements = document.querySelectorAll("a, button, .chapter-next");
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "60px";
      cursor.style.height = "60px";
      cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
      cursor.style.top = parseInt(cursor.style.top) - 10 + "px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
    });
  });
}

// ============================================
// ENHANCED SCANLINE EFFECT
// ============================================
function initScanlineEffect() {
  // Make scan line more visible on important sections
  const chapters = document.querySelectorAll(".story-chapter");

  chapters.forEach((chapter, index) => {
    const scanline = document.createElement("div");
    scanline.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--cyber-blue);
      opacity: 0;
      box-shadow: 0 0 20px var(--cyber-blue);
      z-index: 100;
    `;
    chapter.appendChild(scanline);

    // Trigger scanline animation when chapter is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateScanline(scanline);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(chapter);
  });
}

function animateScanline(scanline) {
  let position = 0;
  scanline.style.opacity = "0.8";

  const interval = setInterval(() => {
    position += 5;
    scanline.style.top = position + "%";

    if (position >= 100) {
      scanline.style.opacity = "0";
      scanline.style.top = "0";
      clearInterval(interval);
    }
  }, 30);
}

// ============================================
// LOAD ANIMATIONS
// ============================================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease-in";
    document.body.style.opacity = "1";
  }, 100);

  // Typewriter effect for hero subtitle
  const subtitle = document.querySelector(".hero-subtitle");
  if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = "";
    subtitle.style.opacity = "1";

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);
  }
});

// ============================================
// AUDIO SYSTEM - CYBERPUNK MUSIC
// ============================================
function initAudioSystem() {
  const audioToggle = document.getElementById('audioToggle');
  let audioEnabled = false;
  let audio = null;

  // Cyberpunk/Electronic music URL
  // Free Music Archive - Cyberpunk ambient with CORS enabled
  const musicUrl = 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Impact/Kevin_MacLeod_-_03_-_Volatile_Reaction.mp3'; // Dystopian Electronic

  audioToggle.addEventListener('click', (e) => {
    e.preventDefault();
    audioEnabled = !audioEnabled;

    if (audioEnabled) {
      audioToggle.classList.add('active');
      const icon = audioToggle.querySelector('i');
      icon.className = 'ri-volume-up-line';
      playMusic();
    } else {
      audioToggle.classList.remove('active');
      const icon = audioToggle.querySelector('i');
      icon.className = 'ri-volume-mute-line';
      stopMusic();
    }
  });

  function playMusic() {
    try {
      if (!audio) {
        audio = new Audio();
        audio.crossOrigin = "anonymous";
        audio.src = musicUrl;
        audio.loop = true;
        audio.volume = 0.3;
        audio.preload = "auto";
      }

      // Reset audio if it was stopped
      if (audio.paused) {
        audio.currentTime = 0;
      }

      // Play audio - must be triggered by user interaction
      audio.play()
        .then(() => {
          console.log('✓ Music playing');
        })
        .catch(err => {
          console.error('Playback error:', err.message);
          // Try reloading the audio
          audio.load();
          setTimeout(() => {
            audio.play().catch(e => console.error('Retry failed:', e.message));
          }, 100);
        });
    } catch (error) {
      console.error('Audio error:', error);
    }
  }

  function stopMusic() {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener("keydown", (e) => {
  // Arrow keys for navigation
  if (e.key === "ArrowDown") {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  } else if (e.key === "ArrowUp") {
    window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
  }
});

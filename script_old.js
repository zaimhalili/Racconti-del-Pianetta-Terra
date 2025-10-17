// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((el) => observer.observe(el));

  // Smooth scroll for navigation links
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

  // Parallax effect for chapter images
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Parallax for chapter images
    const chapters = document.querySelectorAll(".story-chapter");
    chapters.forEach((chapter) => {
      const rect = chapter.getBoundingClientRect();
      const scrollPercent =
        (window.innerHeight - rect.top) / window.innerHeight;

      if (scrollPercent > 0 && scrollPercent < 1.5) {
        const image = chapter.querySelector(".chapter-image img");
        if (image) {
          image.style.transform = `scale(1.05) translateY(${
            scrollPercent * 50
          }px)`;
        }
      }
    });
  });

  // Navbar background change on scroll
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.style.background = "rgba(26, 26, 46, 0.98)";
      nav.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.5)";
    } else {
      nav.style.background = "rgba(26, 26, 46, 0.95)";
      nav.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.5)";
    }
  });

  // Add progressive text reveal for chapter content
  const chapterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const paragraphs = entry.target.querySelectorAll("p");
          paragraphs.forEach((p, index) => {
            setTimeout(() => {
              p.style.opacity = "1";
              p.style.transform = "translateY(0)";
            }, index * 200);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const chapterTexts = document.querySelectorAll(".chapter-text");
  chapterTexts.forEach((text) => {
    const paragraphs = text.querySelectorAll("p");
    paragraphs.forEach((p) => {
      p.style.opacity = "0";
      p.style.transform = "translateY(20px)";
      p.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    });
    chapterObserver.observe(text);
  });

  // Cursor glow effect for dystopian theme
  const cursor = document.createElement("div");
  cursor.classList.add("cursor-trail");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Add rain effect animation (optional)
  createRainEffect();
});

// Create subtle rain effect for dystopian atmosphere
function createRainEffect() {
  const rainContainer = document.createElement("div");
  rainContainer.className = "rain-container";
  rainContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
    opacity: 0.15;
  `;
  document.body.appendChild(rainContainer);

  for (let i = 0; i < 50; i++) {
    const drop = document.createElement("div");
    drop.style.cssText = `
      position: absolute;
      width: 1px;
      height: ${Math.random() * 20 + 10}px;
      background: linear-gradient(to bottom, transparent, #00f2fe);
      left: ${Math.random() * 100}%;;
      top: ${Math.random() * 100}%;
      animation: rain-fall ${Math.random() * 3 + 2}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    rainContainer.appendChild(drop);
  }

  const style = document.createElement("style");
  style.textContent = `
    @keyframes rain-fall {
      to {
        transform: translateY(100vh);
        opacity: 0;
      }
    }
    .cursor-trail {
      position: fixed;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 242, 254, 0.4), transparent);
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease-out;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    }
  `;
  document.head.appendChild(style);
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 1s";
    document.body.style.opacity = "1";
  }, 100);
});

// Gli Immortali - Fun & Interactive with Typewriter Effect!

document.addEventListener('DOMContentLoaded', function () {
  console.log('👁️ Gli Immortali - Interactive Mode Activated!');

  // Initialize Timeline Carousel
  initTimelineCarousel();

  // Typewriter effect function
  const typewriterEffect = (element, text, speed = 30) => {
    element.textContent = '';
    let i = 0;

    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  };

  // Typewriter for main title on load
  const mainTitle = document.querySelector('.title');
  if (mainTitle) {
    const titleText = mainTitle.textContent;
    setTimeout(() => {
      typewriterEffect(mainTitle, titleText, 80);
    }, 500);
  }

  // Apply typewriter to card descriptions when visible
  const typewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const desc = entry.target.querySelector('.card-desc');
        const quote = entry.target.querySelector('.card-quote');

        if (desc && !desc.hasAttribute('data-typed')) {
          const originalText = desc.textContent;
          desc.setAttribute('data-typed', 'true');
          setTimeout(() => {
            typewriterEffect(desc, originalText, 20);
          }, 300);
        }

        if (quote && !quote.hasAttribute('data-typed')) {
          const quoteText = quote.textContent.trim();
          quote.setAttribute('data-typed', 'true');
          setTimeout(() => {
            typewriterEffect(quote, quoteText, 25);
          }, 800);
        }

        typewriterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Observe all chapter cards for typewriter
  const allCards = document.querySelectorAll('.chapter-card');
  allCards.forEach(card => typewriterObserver.observe(card));

  // Animated number counter for stats
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        if (target > 1000000) {
          element.textContent = (current / 1000000).toFixed(1) + 'B';
        } else if (target > 1000) {
          element.textContent = Math.floor(current).toLocaleString();
        } else {
          element.textContent = Math.floor(current);
        }
        requestAnimationFrame(updateCounter);
      } else {
        if (target > 1000000) {
          element.textContent = (target / 1000000).toFixed(1) + 'B';
        } else if (target > 1000) {
          element.textContent = target.toLocaleString();
        } else {
          element.textContent = target;
        }
      }
    };

    updateCounter();
  };

  // Observe stats section and trigger animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(num => animateCounter(num));
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Timeline carousel item click to scroll to chapter card
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach(item => {
    const content = item.querySelector('.timeline-content');
    if (content) {
      content.style.cursor = 'pointer';
      content.addEventListener('click', function () {
        const chapter = item.getAttribute('data-chapter');
        const targetCard = document.querySelector(`.chapter-card[data-chapter="${chapter}"]`);

        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

          targetCard.style.transform = 'translateY(-10px) scale(1.05)';
          targetCard.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.5)';

          setTimeout(() => {
            targetCard.style.transform = '';
            targetCard.style.boxShadow = '';
          }, 1000);
        }
      });
    }
  });

  // Chapter card hover effects
  allCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      const chapter = this.getAttribute('data-chapter');
      const timelineItem = document.querySelector(`.timeline-item[data-chapter="${chapter}"]`);
      if (timelineItem) {
        const dot = timelineItem.querySelector('.timeline-dot');
        if (dot) {
          dot.style.transform = 'scale(1.2)';
          dot.style.boxShadow = '0 0 30px var(--accent-color)';
        }
      }
    });

    card.addEventListener('mouseleave', function () {
      const chapter = this.getAttribute('data-chapter');
      const timelineItem = document.querySelector(`.timeline-item[data-chapter="${chapter}"]`);
      if (timelineItem) {
        const dot = timelineItem.querySelector('.timeline-dot');
        if (dot) {
          dot.style.transform = '';
          dot.style.boxShadow = '';
        }
      }
    });
  });

  // Parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
      logoIcon.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
    }
  });

  // Random glitch effect
  function randomGlitch() {
    const chapterNumbers = document.querySelectorAll('.chapter-number');
    const randomNumber = chapterNumbers[Math.floor(Math.random() * chapterNumbers.length)];
    if (randomNumber) {
      randomNumber.style.animation = 'glitch 0.3s ease';
      setTimeout(() => {
        randomNumber.style.animation = '';
      }, 300);
    }
  }

  setInterval(randomGlitch, 5000);

  // Add glitch keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(2px, -2px); }
      60% { transform: translate(-2px, -2px); }
      80% { transform: translate(2px, 2px); }
      100% { transform: translate(0); }
    }
  `;
  document.head.appendChild(style);

  // Interactive quote
  const quotes = [
    "L'immortalità non è un dono.<br/>È la più crudele delle prigioni.",
    "Ogni generazione mi lascia indietro.<br/>Ogni amicizia è una condanna.",
    "Sopravvissi. Come sempre.<br/>Ma non c'era più nessuno.",
    "Poveri bastardi.<br/>Se solo sapessero.",
    "Credono di essere immortali.<br/>Tutti loro."
  ];

  let currentQuote = 0;
  const quoteText = document.querySelector('.quote-text');

  if (quoteText) {
    quoteText.style.cursor = 'pointer';
    quoteText.addEventListener('click', function () {
      this.style.opacity = '0';
      this.style.transform = 'scale(0.9)';

      setTimeout(() => {
        currentQuote = (currentQuote + 1) % quotes.length;
        this.innerHTML = quotes[currentQuote];
        this.style.transition = 'all 0.5s ease';
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
      }, 300);
    });
  }

  // Easter egg
  let clickCount = 0;
  const logoIcon = document.querySelector('.logo-icon');

  if (logoIcon) {
    logoIcon.style.cursor = 'pointer';
    logoIcon.addEventListener('click', function () {
      clickCount++;
      this.style.transform = `rotate(${clickCount * 360}deg) scale(${1 + clickCount * 0.1})`;

      if (clickCount >= 5) {
        this.style.animation = 'float 0.5s ease-in-out infinite';
        setTimeout(() => {
          alert('🎉 Hai trovato l\'Easter Egg! L\'immortale ti saluta dopo 4.5 miliardi di anni! 👋');
          clickCount = 0;
          this.style.transform = '';
        }, 500);
      }
    });
  }

  console.log('✨ Tutto pronto! Clicca, esplora, divertiti!');
  console.log('💡 Suggerimento: Prova a cliccare l\'icona infinito 5 volte...');
});

// Timeline Carousel Functionality
function initTimelineCarousel() {
  const track = document.querySelector('.timeline-track');
  const items = document.querySelectorAll('.timeline-item');
  const prevBtn = document.querySelector('.timeline-prev');
  const nextBtn = document.querySelector('.timeline-next');
  const indicators = document.querySelectorAll('.dot-indicator');

  if (!track || items.length === 0) return;

  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dot indicators
    indicators.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, items.length - 1));
    updateCarousel();
  }

  // Button navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  // Dot navigation
  indicators.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      goToSlide(currentIndex + 1);
    }
  });

  // Auto-advance (optional - every 8 seconds for Immortali theme)
  let autoAdvance = setInterval(() => {
    goToSlide(currentIndex + 1 === items.length ? 0 : currentIndex + 1);
  }, 8000);

  // Pause auto-advance on hover
  const carousel = document.querySelector('.timeline-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoAdvance);
    });

    carousel.addEventListener('mouseleave', () => {
      autoAdvance = setInterval(() => {
        goToSlide(currentIndex + 1 === items.length ? 0 : currentIndex + 1);
      }, 8000);
    });
  }

  console.log('⏱️ Timeline Carousel initialized with', items.length, 'eras');
}

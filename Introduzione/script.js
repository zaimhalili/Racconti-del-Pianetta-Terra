// ========================================
// RACCONTI DEL PIANETA TERRA - INTRO PAGE
// Interactive Effects & Animations
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initCardParticles();
  initCursorGlow();
  initCardAnimations();
});

// ========================================
// CARD HOVER PARTICLES
// ========================================

function initCardParticles() {
  const cards = document.querySelectorAll('.story-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      createParticles(e.currentTarget);
    });
  });
}

function createParticles(card) {
  const particleCount = 8;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'hover-particle';
    
    const angle = (360 / particleCount) * i;
    const distance = 100;
    const x = Math.cos(angle * Math.PI / 180) * distance;
    const y = Math.sin(angle * Math.PI / 180) * distance;
    
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--cyber-blue);
      border-radius: 50%;
      pointer-events: none;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
      box-shadow: 0 0 10px var(--cyber-blue);
    `;
    
    card.appendChild(particle);
    
    setTimeout(() => {
      particle.style.transition = 'all 0.8s ease-out';
      particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      particle.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
      particle.remove();
    }, 810);
  }
}

// ========================================
// CUSTOM CURSOR GLOW
// ========================================

function initCursorGlow() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--cyber-blue);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s, transform 0.1s;
    box-shadow: 0 0 20px var(--cyber-blue);
  `;
  
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  
  // Scale on card hover
  const cards = document.querySelectorAll('.story-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.borderColor = 'var(--cyber-purple)';
    });
    
    card.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.borderColor = 'var(--cyber-blue)';
    });
  });
}

// ========================================
// INTERSECTION OBSERVER ANIMATIONS
// ========================================

function initCardAnimations() {
  const cards = document.querySelectorAll('.story-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  cards.forEach(card => {
    observer.observe(card);
  });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', (e) => {
  const cards = document.querySelectorAll('.story-card');
  
  if (e.key === '1') cards[0]?.click();
  if (e.key === '2') cards[1]?.click();
  if (e.key === '3') cards[2]?.click();
});

// ========================================
// GLITCH EFFECT ON TITLE
// ========================================

const title = document.querySelector('.title');
if (title) {
  setInterval(() => {
    if (Math.random() > 0.95) {
      title.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
      setTimeout(() => {
        title.style.transform = 'translate(0, 0)';
      }, 50);
    }
  }, 100);
}

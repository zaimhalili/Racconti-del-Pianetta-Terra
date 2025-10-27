// ========================================
// RACCONTI DEL PIANETA TERRA - INTRO PAGE
// Neutral Interactive Effects
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initCardAnimations();
  initKeyboardNav();
});

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

function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    const cards = document.querySelectorAll('.story-card');
    
    if (e.key === '1') cards[0]?.click();
    if (e.key === '2') cards[1]?.click();
    if (e.key === '3') cards[2]?.click();
  });
}
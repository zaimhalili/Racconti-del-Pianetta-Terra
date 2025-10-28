// Gli Immortali - Minimal JavaScript for Animations

document.addEventListener('DOMContentLoaded', function() {
  console.log('🌌 Gli Immortali - Loaded');

  // Smooth scroll for internal links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Fade in chapters on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all chapters
  const chapters = document.querySelectorAll('.chapter');
  chapters.forEach(chapter => {
    observer.observe(chapter);
  });

  // Glitch effect on chapter numbers (random trigger)
  const chapterNumbers = document.querySelectorAll('.chapter-number');
  
  function randomGlitch() {
    const randomNumber = chapterNumbers[Math.floor(Math.random() * chapterNumbers.length)];
    if (randomNumber) {
      randomNumber.style.animation = 'glitch-1 0.3s ease';
      setTimeout(() => {
        randomNumber.style.animation = '';
      }, 300);
    }
  }

  // Trigger glitch every 5-10 seconds
  setInterval(() => {
    if (Math.random() > 0.5) {
      randomGlitch();
    }
  }, 7000);

  // Highlight text animation on hover
  const highlights = document.querySelectorAll('.highlight, .highlight-red');
  highlights.forEach(highlight => {
    highlight.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.display = 'inline-block';
      this.style.transition = 'transform 0.2s ease';
    });
    
    highlight.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  console.log('✨ Animations initialized');
});

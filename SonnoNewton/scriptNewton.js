// IL SONNO DI NEWTON - Cosmic Theme JavaScript

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero background
let heroSection = document.querySelector('.cosmic-hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        let scrolled = window.pageYOffset;
        let heroImg = heroSection.querySelector('.hero-bg');
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Fade in animations on scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all chapter blocks
document.querySelectorAll('.chapter-block').forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(50px)';
    block.style.transition = 'opacity 1s ease, transform 1s ease';
    observer.observe(block);
});

// Add glitch effect to chapter numbers on hover
document.querySelectorAll('.chapter-number, .num').forEach(num => {
    num.addEventListener('mouseenter', function () {
        this.style.animation = 'glitch 0.3s infinite';
    });

    num.addEventListener('mouseleave', function () {
        this.style.animation = 'none';
    });
});

// Create glitch animation
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Cosmic particle effect (optional enhancement)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'cosmic-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(58, 134, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 15}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }

    document.body.appendChild(particlesContainer);
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
        });
    }
});

console.log('🚀 Il Sonno di Newton - Cosmic Theme Loaded');
console.log('🌟 Created by nØnètroppotardi');

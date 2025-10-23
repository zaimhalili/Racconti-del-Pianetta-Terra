// ====================================
//  GLI IMMORTALI - INTERACTIVE SCRIPT
//  Beautiful Animations & Effects
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-out',
        once: true,
        offset: 100,
        delay: 100
    });

    initializeProgressBar();
    initializeRevealOnScroll();
    initializeNavigationDots();
    typewriterEffect();
});

// === PROGRESS BAR ===
function initializeProgressBar() {
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// === REVEAL ON SCROLL ===
function initializeRevealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

// === NAVIGATION DOTS ===
function initializeNavigationDots() {
    const dots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('.chapter');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${current}`) {
                dot.classList.add('active');
            }
        });
    });

    // Smooth scroll on click
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(dot.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// === TYPEWRITER EFFECT FOR HERO TITLE ===
function typewriterEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = 1;

    let i = 0;
    const speed = 100;

    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    setTimeout(type, 500);
}

// === KEYBOARD NAVIGATION ===
document.addEventListener('keydown', (e) => {
    const chapters = Array.from(document.querySelectorAll('.chapter'));
    const currentIndex = chapters.findIndex(chapter => {
        const rect = chapter.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2;
    });

    if (e.key === 'ArrowDown' && currentIndex < chapters.length - 1) {
        chapters[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        chapters[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// === IMAGE HOVER EFFECT ===
document.querySelectorAll('.chapter-image img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transition = 'transform 0.5s ease, filter 0.5s ease';
        img.style.transform = 'scale(1.05)';
        img.style.filter = 'grayscale(0%) contrast(1.2)';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        img.style.filter = 'grayscale(100%) contrast(1.3)';
    });
});

// === CINEMATIC FADE IN FOR QUOTES ===
const quotes = document.querySelectorAll('blockquote');
const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

quotes.forEach(quote => {
    quote.style.opacity = '0';
    quote.style.transform = 'translateY(20px)';
    quote.style.transition = 'opacity 1s ease, transform 1s ease';
    quoteObserver.observe(quote);
});

// === CONSOLE MESSAGE ===
console.log('%c👁️ GLI IMMORTALI 👁️', 'font-size: 40px; color: #000000; text-shadow: 2px 2px 0px #cccccc; font-family: Nosifer;');
console.log('%cIl tempo è un cerchio infinito...', 'font-size: 16px; color: #666666; font-style: italic;');
console.log('%cWhite Theme - Apocalyptic Fonts', 'font-size: 14px; color: #8b0000;');

// === LOADING ANIMATION ===
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// === CHAPTER TRANSITION ===
const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chapterContent = entry.target.querySelector('.content-wrapper');
            if (chapterContent) {
                chapterContent.style.opacity = '1';
                chapterContent.style.transform = 'translateX(0)';
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.chapter').forEach(chapter => {
    chapterObserver.observe(chapter);
});

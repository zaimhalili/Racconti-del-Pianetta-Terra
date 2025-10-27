// ========================================
// RACCONTI DEL PIANETA TERRA - INTRO PAGE
// Neutral Interactive Effects
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initCardAnimations();
    initKeyboardNav();
    initParallaxEffect();
    initImageReveal();
    initSparkleEffect();
    initCardNumbering();
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

// ========================================
// LIGHTWEIGHT PARALLAX EFFECT
// ========================================

function initParallaxEffect() {
    const cards = document.querySelectorAll('.story-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Slightly slower for subtle effect
            const rotateX = (y - centerY) / 18;
            const rotateY = (centerX - x) / 18;

            card.style.transition = 'transform 0.15s ease-out';
            card.style.transform = `translateY(-8px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = '';
        });
    });
}// ========================================
// IMAGE REVEAL ON SCROLL
// ========================================

function initImageReveal() {
    const images = document.querySelectorAll('.card-image');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(30px)';
        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(img);
    });
}

// ========================================
// SUBTLE TAG ANIMATIONS
// ========================================

document.querySelectorAll('.story-card').forEach(card => {
    const tags = card.querySelectorAll('.tag');

    card.addEventListener('mouseenter', () => {
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(-3px)';
                tag.style.transition = 'transform 0.3s ease';
            }, index * 50);
        });
    });

    card.addEventListener('mouseleave', () => {
        tags.forEach(tag => {
            tag.style.transform = 'translateY(0)';
        });
    });
});

// ========================================
// SPARKLE EFFECT ON CLICK
// ========================================

function initSparkleEffect() {
    const cards = document.querySelectorAll('.story-card');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent default to show sparkles before navigation
            e.preventDefault();
            const href = card.getAttribute('href');

            createSparkles(e.clientX, e.clientY);

            // Navigate after sparkle animation
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });
}

function createSparkles(x, y) {
    const sparkleCount = 15;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        const angle = (360 / sparkleCount) * i;
        const distance = 60 + Math.random() * 50;
        const size = 3 + Math.random() * 5;

        sparkle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${['#fff', '#c0c0c0', '#8a8a8a'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            z-index: 9999;
            box-shadow: 0 0 10px currentColor;
        `;

        document.body.appendChild(sparkle);

        const endX = x + Math.cos(angle * Math.PI / 180) * distance;
        const endY = y + Math.sin(angle * Math.PI / 180) * distance;

        setTimeout(() => {
            sparkle.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            sparkle.style.left = endX + 'px';
            sparkle.style.top = endY + 'px';
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(0)';
        }, 10);

        setTimeout(() => {
            sparkle.remove();
        }, 620);
    }
}

// ========================================
// CARD NUMBERING OVERLAY
// ========================================

function initCardNumbering() {
    const cards = document.querySelectorAll('.story-card');

    cards.forEach((card, index) => {
        const numberOverlay = document.createElement('div');
        numberOverlay.className = 'card-number';
        numberOverlay.textContent = `0${index + 1}`;
        card.appendChild(numberOverlay);
    });
}
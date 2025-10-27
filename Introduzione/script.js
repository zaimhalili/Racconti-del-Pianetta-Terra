// ========================================
// RACCONTI DEL PIANETA TERRA - INTRO PAGE
// Neutral Interactive Effects
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initCardAnimations();
    initKeyboardNav();
    initParallaxEffect();
    initImageReveal();
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
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `translateY(-8px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========================================
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
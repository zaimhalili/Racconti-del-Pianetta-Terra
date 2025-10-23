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
    initializeTimelineScrubber();
    initializeAudioSystem();
    initializeDarkMode();
    initializeMap();
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

// ====================================
//  NEW INTERACTIVE FEATURES
// ====================================

// === 1. TIMELINE SCRUBBER ===
function initializeTimelineScrubber() {
    const handle = document.getElementById('timelineHandle');
    const track = document.querySelector('.timeline-track');
    const progress = document.getElementById('timelineProgress');
    const yearDisplay = document.getElementById('timelineYear');
    const markers = document.querySelectorAll('.timeline-marker');

    let isDragging = false;

    const chapterData = [
        { id: 'nascita', year: -4500000000, label: '4.5B anni fa' },
        { id: 'dinosauri', year: -230000000, label: '230M anni fa' },
        { id: 'umani', year: -2000000, label: '2M anni fa' },
        { id: 'roma', year: -753, label: '753 a.C.' },
        { id: 'giappone', year: 1600, label: '1600 d.C.' },
        { id: 'moderna', year: 1900, label: '1900 d.C.' },
        { id: 'apocalisse', year: 2045, label: '2045 d.C.' },
        { id: 'verita', year: 2046, label: 'Fine?' }
    ];

    function updateTimeline(percent) {
        progress.style.width = percent + '%';
        handle.style.left = percent + '%';

        // Calculate year based on position
        const minYear = -4500000000;
        const maxYear = 2046;
        const currentYear = minYear + (maxYear - minYear) * (percent / 100);

        // Format year display
        if (currentYear < -1000000000) {
            yearDisplay.textContent = (Math.abs(currentYear) / 1000000000).toFixed(1) + 'B anni fa';
        } else if (currentYear < -1000000) {
            yearDisplay.textContent = (Math.abs(currentYear) / 1000000).toFixed(0) + 'M anni fa';
        } else if (currentYear < 0) {
            yearDisplay.textContent = Math.abs(currentYear).toFixed(0) + ' a.C.';
        } else {
            yearDisplay.textContent = currentYear.toFixed(0) + ' d.C.';
        }
    }

    // Drag functionality
    track.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    // Touch support
    track.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDragging);

    function startDragging(e) {
        isDragging = true;
        updatePosition(e);
    }

    function drag(e) {
        if (!isDragging) return;
        updatePosition(e);
    }

    function stopDragging() {
        isDragging = false;
    }

    function updatePosition(e) {
        const rect = track.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        updateTimeline(percent);

        // Find closest chapter and scroll to it
        const chapterIndex = Math.round((chapterData.length - 1) * (percent / 100));
        const targetChapter = document.getElementById(chapterData[chapterIndex].id);
        if (targetChapter) {
            targetChapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Click on markers
    markers.forEach((marker, index) => {
        marker.addEventListener('click', () => {
            const percent = (index / (chapterData.length - 1)) * 100;
            updateTimeline(percent);
            const targetChapter = document.getElementById(chapterData[index].id);
            if (targetChapter) {
                targetChapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Update timeline based on scroll position
    window.addEventListener('scroll', () => {
        if (isDragging) return;

        const chapters = document.querySelectorAll('.chapter');
        let currentChapterIndex = 0;

        chapters.forEach((chapter, index) => {
            const rect = chapter.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                currentChapterIndex = index;
            }
        });

        const percent = (currentChapterIndex / (chapterData.length - 1)) * 100;
        updateTimeline(percent);
    });
}

// === INTERACTIVE MAP ===
function initializeMap() {
    const mapToggle = document.getElementById('mapToggle');
    const mapModal = document.getElementById('mapModal');
    const mapClose = document.getElementById('mapClose');
    const mapOverlay = document.getElementById('mapOverlay');

    mapToggle.addEventListener('click', () => {
        mapModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mapClose.addEventListener('click', closeMap);
    mapOverlay.addEventListener('click', closeMap);

    function closeMap() {
        mapModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Animate tree nodes on hover and click
    const nodes = document.querySelectorAll('.tree-node');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const chapter = node.getAttribute('data-chapter');
            const tooltip = document.createElement('div');
            tooltip.className = 'map-tooltip';
            tooltip.textContent = chapter.charAt(0).toUpperCase() + chapter.slice(1);
            tooltip.style.cssText = `
                position: absolute;
                background: black;
                color: white;
                padding: 8px 15px;
                font-family: 'Metal Mania', cursive;
                font-size: 0.9rem;
                pointer-events: none;
                border: 2px solid white;
                z-index: 10000;
            `;
            document.body.appendChild(tooltip);

            const rect = node.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        });

        node.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.map-tooltip');
            if (tooltip) tooltip.remove();
        });

        node.addEventListener('click', () => {
            const chapter = node.getAttribute('data-chapter');
            const targetChapter = document.getElementById(chapter);
            if (targetChapter) {
                closeMap();
                setTimeout(() => {
                    targetChapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        });
    });
}

// === AUDIO AMBIENCE SYSTEM ===
function initializeAudioSystem() {
    const audioToggle = document.getElementById('audioToggle');
    let audioEnabled = false;
    let audio = null;

    // Free apocalyptic/dark ambient music from YouTube Audio Library or similar
    // You can replace this with any free apocalyptic music URL
    const musicUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Placeholder - replace with apocalyptic music

    audioToggle.addEventListener('click', () => {
        audioEnabled = !audioEnabled;
        audioToggle.classList.toggle('active');
        audioToggle.querySelector('.icon').textContent = audioEnabled ? '🔊' : '🔇';

        if (audioEnabled) {
            playMusic();
        } else {
            stopMusic();
        }
    });

    function playMusic() {
        if (!audio) {
            audio = new Audio(musicUrl);
            audio.loop = true;
            audio.volume = 0.3; // Set to 30% volume for background
        }
        audio.play().catch(err => {
            console.log('Audio playback failed:', err);
        });
    }

    function stopMusic() {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
}

// === DARK MODE TOGGLE ===
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    let darkMode = false;

    // Check if user has a preference
    if (localStorage.getItem('darkMode') === 'true') {
        darkMode = true;
        document.body.classList.add('dark-mode');
        darkModeToggle.classList.add('active');
        darkModeToggle.querySelector('.icon').textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('active');
        darkModeToggle.querySelector('.icon').textContent = darkMode ? '☀️' : '🌙';

        // Save preference
        localStorage.setItem('darkMode', darkMode);
    });
}

// === ESCAPE KEY TO CLOSE MAP ===
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const mapModal = document.getElementById('mapModal');
        if (mapModal.classList.contains('active')) {
            mapModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

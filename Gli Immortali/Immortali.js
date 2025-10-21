document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const navToggle = document.querySelector('.nav-toggle');
    const chapterNav = document.querySelector('.chapter-nav');
    const chapterItems = document.querySelectorAll('.chapter-item');
    const sections = document.querySelectorAll('.story-section');
    const chapterIndicator = document.querySelector('#current-chapter');
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen immediately and load images in background
    const hideLoading = () => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            document.body.classList.add('loaded');
        }
    };

    // Hide loading screen immediately
    hideLoading();

    // Load images in background
    const loadImages = () => {
        const images = document.querySelectorAll('.section-image');
        images.forEach(image => {
            const src = image.getAttribute('data-src');
            if (src) {
                image.style.backgroundImage = `url(${src})`;
            }
        });
    };

    // Start loading images in background
    loadImages();

    // Create particles for hero section
    const createParticles = () => {
        const particles = document.querySelector('.hero-particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--delay', `${Math.random() * 4}s`);
            particle.style.setProperty('--size', `${Math.random() * 3 + 1}px`);
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particles.appendChild(particle);
        }
    };

    createParticles();
    
    // Toggle side navigation
    navToggle.addEventListener('click', () => {
        chapterNav.classList.toggle('open');
    });

    // Handle chapter navigation
    chapterItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            document.getElementById(targetSection).scrollIntoView({ behavior: 'smooth' });
            chapterNav.classList.remove('open');
        });
    });

    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to section
                entry.target.classList.add('active');
                
                // Update chapter indicator and navigation
                const sectionId = entry.target.id;
                const sectionTitle = entry.target.querySelector('h2')?.textContent || '';
                chapterIndicator.textContent = sectionTitle;
                
                // Update active chapter in navigation
                chapterItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('data-section') === sectionId);
                });
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.3
    });

    // Observe all sections
    sections.forEach(section => sectionObserver.observe(section));

    // Parallax effect for section images
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.section-image').forEach(image => {
            const parent = image.parentElement;
            const parentRect = parent.getBoundingClientRect();
            if (parentRect.top < window.innerHeight && parentRect.bottom > 0) {
                image.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });
    });

    // Close navigation when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.chapter-nav') && !e.target.closest('.nav-toggle')) {
            chapterNav.classList.remove('open');
        }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            chapterNav.classList.remove('open');
        }
    });

    // Function to update memory fragments based on era
    function updateMemoryFragments(era) {
        const fragments = document.querySelectorAll('.memory-fragment');
        const colors = {
            primordial: '#ff4400',
            dinosaurs: '#1a472a',
            'ice-age': '#a5f2f3',
            ancient: '#c5a572',
            medieval: '#4a4a4a',
            modern: '#3498db',
            future: '#16222a',
            apocalypse: '#8B0000'
        };

        fragments.forEach(fragment => {
            fragment.style.background = colors[era] || '#ffffff';
            fragment.style.opacity = Math.random() * 0.3 + 0.1;
        });
    }

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add intersection observer for sections
    const observerOptions = {
        root: null,
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const era = entry.target.id;
                setActiveEra(era);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Add parallax effect to memory fragments
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 20;

        memoryFragments.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Handle touch events for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const currentEra = document.body.getAttribute('data-era');
        const currentIndex = Array.from(timelinePoints).findIndex(
            point => point.getAttribute('data-era') === currentEra
        );

        if (touchEndX < touchStartX && currentIndex < timelinePoints.length - 1) {
            // Swipe left - next era
            setActiveEra(timelinePoints[currentIndex + 1].getAttribute('data-era'));
        } else if (touchEndX > touchStartX && currentIndex > 0) {
            // Swipe right - previous era
            setActiveEra(timelinePoints[currentIndex - 1].getAttribute('data-era'));
        }
    }
});

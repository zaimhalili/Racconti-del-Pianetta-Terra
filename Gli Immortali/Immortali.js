document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const timelinePoints = document.querySelectorAll('.timeline-point');
    const sections = document.querySelectorAll('.era-section');
    const memoryFragments = document.querySelector('.memory-fragments');
    
    // Create memory fragments
    createMemoryFragments();

    // Set initial state
    setActiveEra('primordial');

    // Add event listeners to timeline points
    timelinePoints.forEach(point => {
        point.addEventListener('click', () => {
            const era = point.getAttribute('data-era');
            setActiveEra(era);
        });
    });

    // Function to set active era
    function setActiveEra(era) {
        // Update timeline points
        timelinePoints.forEach(point => {
            point.classList.remove('active');
            if (point.getAttribute('data-era') === era) {
                point.classList.add('active');
            }
        });

        // Update sections
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === era) {
                section.classList.add('active');
            }
        });

        // Update body background
        document.body.setAttribute('data-era', era);

        // Update memory fragments
        updateMemoryFragments(era);
    }

    // Function to create memory fragments
    function createMemoryFragments() {
        for (let i = 0; i < 20; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'memory-fragment';
            fragment.style.width = `${Math.random() * 20 + 5}px`;
            fragment.style.height = fragment.style.width;
            fragment.style.left = `${Math.random() * 100}%`;
            fragment.style.top = `${Math.random() * 100}%`;
            fragment.style.animationDelay = `${Math.random() * 20}s`;
            memoryFragments.appendChild(fragment);
        }
    }

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

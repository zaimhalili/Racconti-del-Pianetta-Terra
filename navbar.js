// Unified Navbar Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Create sidebar overlay for mobile
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    if (mobileToggle && navbarLinks) {
        mobileToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navbarLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            overlay.classList.toggle('active');

            // Prevent body scroll when sidebar is open
            if (navbarLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close sidebar when clicking overlay
        overlay.addEventListener('click', function () {
            navbarLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close sidebar when clicking a link
        const navLinks = navbarLinks.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navbarLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.unified-navbar');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Set active link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath.includes(linkPath) ||
            (linkPath.includes('index.html') && currentPath.endsWith('/'))) {
            link.classList.add('active');
        }
    });

    // Global Audio Toggle
    const audioToggle = document.querySelector('#globalAudioToggle');
    const bgAudio = document.querySelector('#bg-audio');

    if (audioToggle && bgAudio) {
        let isPlaying = false;

        audioToggle.addEventListener('click', function () {
            if (isPlaying) {
                bgAudio.pause();
                audioToggle.querySelector('i').className = 'ri-volume-mute-line';
                audioToggle.classList.remove('active');
                isPlaying = false;
            } else {
                bgAudio.play().catch(err => {
                    console.log('Audio playback failed:', err);
                });
                audioToggle.querySelector('i').className = 'ri-volume-up-line';
                audioToggle.classList.add('active');
                isPlaying = true;
            }
        });

        // Set volume
        bgAudio.volume = 0.3;
    }
});

// Unified Navbar Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    if (mobileToggle && navbarLinks) {
        mobileToggle.addEventListener('click', function () {
            navbarLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.unified-navbar')) {
                navbarLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });

        // Close mobile menu when clicking a link
        const navLinks = navbarLinks.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navbarLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
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
});

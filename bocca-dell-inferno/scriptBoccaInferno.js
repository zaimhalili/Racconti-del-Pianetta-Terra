// Forest-themed interactive page
document.addEventListener('DOMContentLoaded', function () {
	// Fade-in animations
	const fadeElements = document.querySelectorAll('.fade-in, .story-section, .reveal');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
			}
		});
	}, {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	});

	fadeElements.forEach(el => observer.observe(el));

	// Audio toggle
	const audioBtn = document.querySelector('.audio-toggle');
	const audioEl = document.getElementById('bg-audio');

	if (audioBtn && audioEl) {
		audioBtn.addEventListener('click', function () {
			if (audioEl.paused) {
				audioEl.play().catch(err => console.log('Audio play failed:', err));
				audioBtn.classList.add('active');
			} else {
				audioEl.pause();
				audioBtn.classList.remove('active');
			}
		});
	}

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

	// Floating Leaves
	const leavesContainer = document.querySelector('.leaves-container');
	if (leavesContainer) {
		const leafCount = 25;
		for (let i = 0; i < leafCount; i++) {
			const leaf = document.createElement('div');
			leaf.className = 'leaf';
			leaf.style.left = Math.random() * 100 + 'vw';
			leaf.style.animationDelay = (Math.random() * 12).toFixed(2) + 's';
			leaf.style.setProperty('--drift', (Math.random() * 100 - 50).toFixed(0) + 'px');
			leaf.style.setProperty('--rotate', (Math.random() * 720 - 360).toFixed(0) + 'deg');
			leavesContainer.appendChild(leaf);
		}
	}

	// Fireflies
	const firefliesContainer = document.querySelector('.fireflies');
	if (firefliesContainer) {
		const fireflyCount = 20;
		for (let i = 0; i < fireflyCount; i++) {
			const firefly = document.createElement('div');
			firefly.className = 'firefly';
			firefly.style.left = Math.random() * 100 + 'vw';
			firefly.style.top = Math.random() * 100 + 'vh';
			firefly.style.animationDelay = (Math.random() * 10).toFixed(2) + 's';
			firefly.style.setProperty('--fx', (Math.random() * 80 - 40).toFixed(0) + 'px');
			firefly.style.setProperty('--fy', (Math.random() * 60 - 30).toFixed(0) + 'px');
			firefliesContainer.appendChild(firefly);
		}
	}

	// Active nav link and trail marker on scroll
	const sections = document.querySelectorAll('.story-section');
	const navLinks = document.querySelectorAll('.summary-nav a[href^="#"]');
	const trailMarkers = document.querySelectorAll('.trail-marker');

	window.addEventListener('scroll', function () {
		let current = '';
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (window.pageYOffset >= sectionTop - 200) {
				current = section.getAttribute('id');
			}
		});

		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === '#' + current) {
				link.classList.add('active');
			}
		});

		trailMarkers.forEach(marker => {
			marker.classList.remove('active');
			if (marker.getAttribute('data-section') === current) {
				marker.classList.add('active');
			}
		});
	});

	// Trail marker clicks
	trailMarkers.forEach(marker => {
		marker.addEventListener('click', function () {
			const sectionId = this.getAttribute('data-section');
			const section = document.getElementById(sectionId);
			if (section) {
				section.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// Parallax layers
	const layers = Array.from(document.querySelectorAll('.parallax-layer'));
	let ticking = false;
	function updateParallax() {
		const y = window.scrollY || window.pageYOffset;
		layers.forEach(layer => {
			const depth = parseFloat(layer.getAttribute('data-depth') || '0');
			const translate = Math.min(y * depth, 150);
			layer.style.transform = `translateY(${translate}px)`;
		});
		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(updateParallax);
			ticking = true;
		}
	}
	if (layers.length) {
		window.addEventListener('scroll', onScroll, { passive: true });
		updateParallax();
	}

	// Tilt effect for cards
	const tiltEls = document.querySelectorAll('.tilt');
	tiltEls.forEach(el => {
		const strength = 12;
		el.addEventListener('mousemove', (e) => {
			const rect = el.getBoundingClientRect();
			const px = (e.clientX - rect.left) / rect.width;
			const py = (e.clientY - rect.top) / rect.height;
			const rx = (0.5 - py) * strength;
			const ry = (px - 0.5) * strength;
			el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
		});
		el.addEventListener('mouseleave', () => {
			el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
		});
	});

	// Magnetic button
	document.querySelectorAll('.magnetic').forEach(btn => {
		const strength = 20;
		btn.addEventListener('mousemove', (e) => {
			const rect = btn.getBoundingClientRect();
			const dx = e.clientX - (rect.left + rect.width / 2);
			const dy = e.clientY - (rect.top + rect.height / 2);
			btn.style.transform = `translate(${dx / strength}px, ${dy / strength}px)`;
		});
		btn.addEventListener('mouseleave', () => {
			btn.style.transform = 'translate(0,0)';
		});
	});
});

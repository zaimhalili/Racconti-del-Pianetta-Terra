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

	// Audio toggle - use navbar button
	const audioBtn = document.querySelector('#globalAudioToggle');
	const audioEl = document.getElementById('bg-audio');

	if (audioBtn && audioEl) {
		audioBtn.addEventListener('click', function () {
			if (audioEl.paused) {
				audioEl.play().catch(err => console.log('Audio play failed:', err));
				audioBtn.classList.add('active');
				audioBtn.querySelector('i').className = 'ri-volume-up-line';
			} else {
				audioEl.pause();
				audioBtn.classList.remove('active');
				audioBtn.querySelector('i').className = 'ri-volume-mute-line';
			}
		});

		// Set volume
		audioEl.volume = 0.3;
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

		// Better scroll detection - also check if we're near bottom
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollTop = window.pageYOffset || window.scrollY;
		const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;

		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			// More lenient threshold for last section
			const threshold = section.id === 'para4' ? 300 : 200;
			if (scrollTop >= sectionTop - threshold) {
				current = section.getAttribute('id');
			}
		});

		// Force last section if near bottom
		if (isNearBottom) {
			current = 'para4';
		}

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

	// Story Choice Buttons
	const storyChoices = {
		silence: {
			title: "Il Silenzio del Bosco",
			text: "Creel sceglie il silenzio. Con il passare dei giorni, la voragine continua a inghiottire chi osa sfidare le leggi della foresta. Il guardacaccia diventa complice del mistero, portando con sé il peso di un segreto che la terra custodisce gelosamente. Il bosco lo ricompensa con la sua protezione, ma il prezzo è l'eterna vigilanza sul confine tra il lecito e l'indicibile."
		},
		report: {
			title: "La Rivelazione",
			text: "Creel decide di denunciare tutto. Le autorità arrivano, ispezionano la zona, ma non trovano traccia della voragine. Gli altri guardacaccia lo evitano, sussurrando che il bosco non perdona chi tradisce i suoi segreti. Una notte, mentre torna a casa, sente la terra tremare sotto i suoi piedi. La voragine si apre davanti a lui, come un occhio che lo fissa in silenzio, poi si richiude. Da quel giorno, Creel sa che il bosco lo ha segnato."
		}
	};

	document.querySelectorAll('.choice-btn').forEach(btn => {
		btn.addEventListener('click', function () {
			const choice = this.getAttribute('data-choice');
			const resultDiv = this.closest('.story-choice').querySelector('.choice-result');
			const allButtons = this.closest('.choice-buttons').querySelectorAll('.choice-btn');

			// Mark selected
			allButtons.forEach(b => b.classList.remove('selected'));
			this.classList.add('selected');

			// Show result
			const story = storyChoices[choice];
			resultDiv.innerHTML = `
				<h4><i class="ri-book-mark-line"></i> ${story.title}</h4>
				<p>${story.text}</p>
			`;
			resultDiv.style.display = 'block';

			// Smooth scroll to result
			setTimeout(() => {
				resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			}, 100);
		});
	});

	// Spotlight effect for dark text reveal
	document.querySelectorAll('.reveal-on-hover').forEach(el => {
		el.addEventListener('mousemove', (e) => {
			const rect = el.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width) * 100;
			const y = ((e.clientY - rect.top) / rect.height) * 100;
			el.style.setProperty('--mouse-x', `${x}%`);
			el.style.setProperty('--mouse-y', `${y}%`);
		});
	});

	// Magnetic Voragine Effect - Enhanced with cursor pull
	const voragineCard = document.querySelector('.voragine-card');
	const voragineHole = document.querySelector('.voragine-card .hole');

	if (voragineCard && voragineHole) {
		voragineCard.addEventListener('mousemove', (e) => {
			const rect = voragineCard.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			const mouseX = e.clientX;
			const mouseY = e.clientY;

			// Calculate distance from center
			const deltaX = mouseX - centerX;
			const deltaY = mouseY - centerY;
			const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

			// Magnetic pull strength (inverse of distance) - more aggressive
			const maxDistance = 400; // pixels - wider range
			const pullStrength = Math.max(0, 1 - (distance / maxDistance));

			// Exponential scaling for more aggressive pull when close
			const intensePull = Math.pow(pullStrength, 0.5);

			// Pull effect - move hole toward cursor with stronger pull
			const pullX = deltaX * intensePull * 0.35;
			const pullY = deltaY * intensePull * 0.35;

			// Scale effect - grow much faster when cursor is close (exponential)
			const scaleMultiplier = 1 + (Math.pow(pullStrength, 0.7) * 0.8);

			// Apply transformations
			voragineHole.style.transform = `translate(${pullX}px, ${pullY}px) scale(${scaleMultiplier})`;
			voragineHole.style.boxShadow = `
				0 0 ${40 + pullStrength * 40}px rgba(0, 0, 0, ${0.9 + pullStrength * 0.1}) inset,
				0 0 ${60 + pullStrength * 80}px rgba(74, 124, 89, ${0.2 + pullStrength * 0.5})
			`;

			// Rotate vortex rings much faster when close
			const vortexRings = voragineCard.querySelectorAll('.vortex-ring');
			vortexRings.forEach((ring, index) => {
				const baseSpeed = 3 + index * 2;
				const newSpeed = baseSpeed / (1 + pullStrength * 4);
				ring.style.animationDuration = `${newSpeed}s`;
			});
		});

		voragineCard.addEventListener('mouseleave', () => {
			voragineHole.style.transform = 'translate(0, 0) scale(1)';
			voragineHole.style.boxShadow = '0 0 40px rgba(0, 0, 0, 1) inset, 0 0 60px rgba(74, 124, 89, 0.2)';

			const vortexRings = voragineCard.querySelectorAll('.vortex-ring');
			vortexRings.forEach((ring, index) => {
				const baseSpeed = 3 + index * 2;
				ring.style.animationDuration = `${baseSpeed}s`;
			});
		});
	}
});

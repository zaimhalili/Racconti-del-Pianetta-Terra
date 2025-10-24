// Interattività: toggle del testo completo + piccolo effetto glitch per tema distopico
document.addEventListener('DOMContentLoaded', function(){
		const container = document.getElementById('summaryContainer');
		const title = document.querySelector('.hero-title');
		if(!container) return;

	// summary nav links
		// nav links: scroll to section and mark active
		const navLinks = Array.from(document.querySelectorAll('.summary-nav a'));
		navLinks.forEach(a=>{
			a.addEventListener('click', function(e){
				e.preventDefault();
				const targetId = this.getAttribute('href').slice(1);
				const target = document.getElementById(targetId);
				// If we have a scrollable #viewport, scroll within it. Otherwise fallback to window
				const scrollContainer = document.getElementById('viewport') || window;
				if(scrollContainer === window){
					target.scrollIntoView({behavior:'smooth', block:'start'});
				} else {
					// compute top of target relative to the viewport container and scroll
					const containerRect = scrollContainer.getBoundingClientRect();
					const targetRect = target.getBoundingClientRect();
					const offset = targetRect.top - containerRect.top + scrollContainer.scrollTop;
					scrollContainer.scrollTo({top: offset, behavior: 'smooth'});
				}
				// tiny glitch feedback
				if(title){ title.classList.add('glitch-active'); setTimeout(()=> title.classList.remove('glitch-active'), 700);}    
			});
		});

		// highlight active link based on scroll position
		const panels = Array.from(document.querySelectorAll('.panel'));
		const viewport = document.getElementById('viewport');

		// Use IntersectionObserver to detect which panel is most visible inside the scroll container.
		// Root is the #viewport element when present, otherwise the browser viewport (null).
		const observerRoot = viewport || null;
		const observerOptions = {
			root: observerRoot,
			rootMargin: '0px',
			threshold: [0.45, 0.6]
		};

		let currentActive = -1;
		const io = new IntersectionObserver((entries)=>{
			// Find the entry with highest intersectionRatio above threshold
			let bestEntry = null;
			entries.forEach(e=>{
				if(e.isIntersecting){
					if(!bestEntry || e.intersectionRatio > bestEntry.intersectionRatio) bestEntry = e;
				}
			});
			if(bestEntry){
				const id = bestEntry.target.id;
				const idx = panels.findIndex(p=>p.id === id);
				if(idx !== -1 && idx !== currentActive){
					currentActive = idx;
					navLinks.forEach((a,i)=> a.classList.toggle('active', i===idx));
					// make overlay visible for the active panel and hide others
					panels.forEach((p,i)=>{
						const overlay = p.querySelector('.panel-overlay');
						if(overlay) overlay.classList.toggle('visible', i===idx);
						// also toggle active class on panel for image animations
						p.classList.toggle('active', i===idx);
					});
				}
			}
		}, observerOptions);

		panels.forEach(p=> io.observe(p));

		// Fallback: keep a cheap updateActive for older browsers or immediate sync
		function updateActiveFallback(){
			let midlineY = observerRoot ? (observerRoot.getBoundingClientRect().top + observerRoot.getBoundingClientRect().height/2) : window.innerHeight/2;
			let idx = panels.findIndex(p=>{
				const r = p.getBoundingClientRect();
				return r.top <= midlineY && r.bottom >= midlineY;
			});
			if(idx === -1) idx = 0;
			currentActive = idx;
			navLinks.forEach((a,i)=> a.classList.toggle('active', i===idx));
			panels.forEach((p,i)=>{
				const overlay = p.querySelector('.panel-overlay');
				if(overlay) overlay.classList.toggle('visible', i===idx);
				// toggle active class for image transitions
				p.classList.toggle('active', i===idx);
			});
		}
		if(viewport){
			viewport.addEventListener('scroll', updateActiveFallback, {passive:true});
			new ResizeObserver(updateActiveFallback).observe(viewport);
		} else {
			window.addEventListener('scroll', updateActiveFallback, {passive:true});
			window.addEventListener('resize', updateActiveFallback);
		}
		// initial sync
		updateActiveFallback();

	// Optional: keyboard navigation
	document.addEventListener('keydown', function(e){
		if(container.classList.contains('hidden')) return;
		const panels = Array.from(document.querySelectorAll('.panel'));
		// find current index relative to viewport midline
		let midlineY = viewport ? (viewport.getBoundingClientRect().top + viewport.getBoundingClientRect().height/2) : window.innerHeight/2;
		const current = panels.findIndex(p=>{
			const r = p.getBoundingClientRect();
			return r.top <= midlineY && r.bottom >= midlineY;
		});
		const scrollContainer = viewport || window;
		if(e.key === 'ArrowDown' && current < panels.length-1){
			const target = panels[current+1];
			if(scrollContainer === window) target.scrollIntoView({behavior:'smooth'});
			else {
				const rect = scrollContainer.getBoundingClientRect();
				const targetRect = target.getBoundingClientRect();
				const offset = targetRect.top - rect.top + scrollContainer.scrollTop;
				scrollContainer.scrollTo({top: offset, behavior: 'smooth'});
			}
		} else if(e.key === 'ArrowUp' && current > 0){
			const target = panels[current-1];
			if(scrollContainer === window) target.scrollIntoView({behavior:'smooth'});
			else {
				const rect = scrollContainer.getBoundingClientRect();
				const targetRect = target.getBoundingClientRect();
				const offset = targetRect.top - rect.top + scrollContainer.scrollTop;
				scrollContainer.scrollTo({top: offset, behavior: 'smooth'});
			}
		}
	});

});



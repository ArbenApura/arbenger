<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount } from 'svelte';

	// IMPORTED MODULES
	import { browser } from '$app/environment';

	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';
	import { isMobile, prefersReducedMotion } from '$lib/stores/viewport';

	// -- STATES -- //

	let container: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let animationId: number;
	let dark = true;

	// -- SUBSCRIPTIONS -- //

	const unsubTheme = isDark.subscribe((v) => (dark = v));

	// -- CONSTANTS -- //

	const CONNECTION_DISTANCE = 120;
	const MOUSE_RADIUS = 150;

	// -- TYPES -- //

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		opacity: number;
	}

	// -- FUNCTIONS -- //

	function initParticles(width: number, height: number, count: number): Particle[] {
		return Array.from({ length: count }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			vx: (Math.random() - 0.5) * 0.4,
			vy: (Math.random() - 0.5) * 0.4,
			size: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.5 + 0.2,
		}));
	}

	// -- LIFECYCLES -- //

	onMount(() => {
		if (!browser || !canvas || !container) return;
		if ($isMobile || $prefersReducedMotion) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width = container.clientWidth;
		let height = container.clientHeight;
		canvas.width = width;
		canvas.height = height;

		const particleCount = width < 1024 ? 30 : 60;
		let particles = initParticles(width, height, particleCount);
		let mouseX = -1000;
		let mouseY = -1000;

		function onMouseMove(e: MouseEvent) {
			const rect = canvas.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		}

		function onMouseLeave() {
			mouseX = -1000;
			mouseY = -1000;
		}

		container.addEventListener('mousemove', onMouseMove);
		container.addEventListener('mouseleave', onMouseLeave);

		function animate() {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);

			particles.forEach((p) => {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0 || p.x > width) p.vx *= -1;
				if (p.y < 0 || p.y > height) p.vy *= -1;

				const dx = p.x - mouseX;
				const dy = p.y - mouseY;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < MOUSE_RADIUS && dist > 0) {
					const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
					p.x += (dx / dist) * force * 2;
					p.y += (dy / dist) * force * 2;
				}
			});

			const lineColor = dark ? '34, 211, 238' : '8, 145, 178';
			const dotColor = dark ? '34, 211, 238' : '8, 145, 178';

			const connectionOpacityMultiplier = dark ? 0.15 : 0.12;
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < CONNECTION_DISTANCE) {
						const opacity = (1 - dist / CONNECTION_DISTANCE) * connectionOpacityMultiplier;
						ctx.beginPath();
						ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
						ctx.lineWidth = 0.5;
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.stroke();
					}
				}
			}

			const dotOpacityMultiplier = dark ? 1 : 0.6;
			particles.forEach((p) => {
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${dotColor}, ${p.opacity * dotOpacityMultiplier})`;
				ctx.fill();
			});

			animationId = requestAnimationFrame(animate);
		}

		animate();

		const resizeObserver = new ResizeObserver(() => {
			width = container.clientWidth;
			height = container.clientHeight;
			canvas.width = width;
			canvas.height = height;
			particles = initParticles(width, height, particleCount);
		});
		resizeObserver.observe(container);

		return () => {
			cancelAnimationFrame(animationId);
			resizeObserver.disconnect();
			container.removeEventListener('mousemove', onMouseMove);
			container.removeEventListener('mouseleave', onMouseLeave);
			unsubTheme();
		};
	});
</script>

<!-- INTERACTIVE PARTICLE NETWORK BACKGROUND -->
<div bind:this={container} class="pointer-events-auto absolute inset-0 overflow-hidden" aria-hidden="true">
	{#if !$isMobile}
		<canvas bind:this={canvas} class="absolute inset-0"></canvas>
	{/if}

	<!-- MOBILE FALLBACK -->
	{#if $isMobile}
		{@const mc = dark ? '#22D3EE' : '#0891B2'}
		{@const mc2 = dark ? '#2DD4BF' : '#0E7490'}
		<!-- GRADIENT MESH -->
		<div class="absolute inset-0">
			<div class="absolute -top-20 -right-20 h-80 w-80 rounded-full blur-[60px]" style="background: {dark ? 'rgba(34, 211, 238, 0.35)' : 'rgba(8, 145, 178, 0.35)'};"></div>
			<div class="absolute top-1/3 -left-24 h-96 w-96 rounded-full blur-[80px]" style="background: {dark ? 'rgba(45, 212, 191, 0.2)' : 'rgba(6, 182, 212, 0.25)'};"></div>
			<div class="absolute bottom-20 right-0 h-72 w-72 rounded-full blur-[70px]" style="background: {dark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(14, 116, 144, 0.2)'};"></div>
		</div>
		<!-- STATIC CONSTELLATION -->
		<svg class="absolute inset-0 h-full w-full" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
			<line x1="310" y1="80" x2="360" y2="180" stroke={mc} stroke-width="0.5" opacity="0.15" />
			<line x1="360" y1="180" x2="280" y2="240" stroke={mc} stroke-width="0.5" opacity="0.12" />
			<line x1="280" y1="240" x2="340" y2="320" stroke={mc} stroke-width="0.4" opacity="0.1" />
			<line x1="310" y1="80" x2="280" y2="240" stroke={mc2} stroke-width="0.3" opacity="0.08" />
			<line x1="360" y1="180" x2="340" y2="320" stroke={mc} stroke-width="0.3" opacity="0.08" />
			<line x1="60" y1="520" x2="140" y2="580" stroke={mc} stroke-width="0.5" opacity="0.12" />
			<line x1="140" y1="580" x2="100" y2="670" stroke={mc} stroke-width="0.4" opacity="0.1" />
			<line x1="60" y1="520" x2="100" y2="670" stroke={mc2} stroke-width="0.3" opacity="0.07" />
			<line x1="140" y1="580" x2="220" y2="620" stroke={mc} stroke-width="0.3" opacity="0.08" />
			<line x1="220" y1="430" x2="310" y2="80" stroke={mc} stroke-width="0.2" opacity="0.05" />
			<line x1="220" y1="430" x2="340" y2="320" stroke={mc} stroke-width="0.3" opacity="0.06" />
			<line x1="220" y1="430" x2="140" y2="580" stroke={mc2} stroke-width="0.3" opacity="0.06" />
			<circle cx="310" cy="80" r="2.5" fill={mc} opacity="0.4" />
			<circle cx="360" cy="180" r="2" fill={mc} opacity="0.35" />
			<circle cx="280" cy="240" r="2" fill={mc} opacity="0.3" />
			<circle cx="340" cy="320" r="1.5" fill={mc2} opacity="0.25" />
			<circle cx="220" cy="430" r="1.5" fill={mc} opacity="0.2" />
			<circle cx="60" cy="520" r="2" fill={mc} opacity="0.3" />
			<circle cx="140" cy="580" r="2.5" fill={mc} opacity="0.35" />
			<circle cx="100" cy="670" r="1.5" fill={mc2} opacity="0.25" />
			<circle cx="220" cy="620" r="1" fill={mc} opacity="0.18" />
			<circle cx="370" cy="60" r="0.8" fill={mc} opacity="0.12" />
			<circle cx="250" cy="160" r="0.7" fill={mc2} opacity="0.1" />
			<circle cx="180" cy="350" r="0.7" fill={mc} opacity="0.08" />
			<circle cx="50" cy="450" r="0.6" fill={mc} opacity="0.08" />
			<circle cx="300" cy="550" r="0.7" fill={mc2} opacity="0.08" />
			<circle cx="180" cy="720" r="0.6" fill={mc} opacity="0.06" />
		</svg>
	{/if}
</div>

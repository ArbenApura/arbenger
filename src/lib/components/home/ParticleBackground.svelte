<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount } from 'svelte';

	// IMPORTED MODULES
	import { browser } from '$app/environment';
	import { isDark } from '$lib/stores/theme';

	// -- STATES -- //

	let container: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let animationId: number;
	let dark = true;

	// -- SUBSCRIPTIONS -- //

	const unsubTheme = isDark.subscribe((v) => (dark = v));

	// -- CONSTANTS -- //

	const PARTICLE_COUNT = 60;
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

	function initParticles(width: number, height: number): Particle[] {
		return Array.from({ length: PARTICLE_COUNT }, () => ({
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

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width = container.clientWidth;
		let height = container.clientHeight;
		canvas.width = width;
		canvas.height = height;

		let particles = initParticles(width, height);
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

				// MOUSE REPULSION
				const dx = p.x - mouseX;
				const dy = p.y - mouseY;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < MOUSE_RADIUS && dist > 0) {
					const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
					p.x += (dx / dist) * force * 2;
					p.y += (dy / dist) * force * 2;
				}
			});

			// THEME-AWARE PARTICLE COLORS
			const lineColor = dark ? '34, 211, 238' : '22, 20, 70';
			const dotColor = dark ? '34, 211, 238' : '22, 20, 70';

			// DRAW CONNECTIONS
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < CONNECTION_DISTANCE) {
						const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
						ctx.beginPath();
						ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
						ctx.lineWidth = 0.5;
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.stroke();
					}
				}
			}

			// DRAW PARTICLES
			particles.forEach((p) => {
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${dotColor}, ${p.opacity})`;
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
			particles = initParticles(width, height);
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
	<canvas bind:this={canvas} class="absolute inset-0"></canvas>
</div>

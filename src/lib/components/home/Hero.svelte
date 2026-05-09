<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount } from 'svelte';

	// IMPORTED MODULES
	import { browser } from '$app/environment';

	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';

	// IMPORTED COMPONENTS
	import Button from '$lib/components/ui/Button.svelte';
	import Typewriter from '$lib/components/ui/Typewriter.svelte';
	import ParticleBackground from '$lib/components/home/ParticleBackground.svelte';

	// -- CONSTANTS -- //

	const HERO_PHRASES = [
		'and do it well',
		'without the bloat',
		"you'll keep coming back to",
		'that stay out of your way',
		'worth your time',
	];

	// -- STATES -- //

	let isVisible = false;

	let scrollY = 0;

	// -- LIFECYCLES -- //

	onMount(() => {
		setTimeout(() => {
			isVisible = true;
		}, 100);
	});
</script>

<svelte:window bind:scrollY />

<!-- HERO SECTION -->
<section class="relative flex min-h-screen items-center overflow-hidden">
	<!-- PARTICLE NETWORK BACKGROUND -->
	<ParticleBackground />

	<!-- GRID OVERLAY — RADIAL-GRADIENT DOTS CANNOT BE EXPRESSED AS TAILWIND; isDark TERNARY FOR THEME-AWARE DOT COLOR -->
	<div
		class="pointer-events-none absolute inset-0 opacity-10"
		style="background-image: radial-gradient(circle, {$isDark ? '#2A2578' : 'rgba(226, 232, 240, 0.6)'} 1px, transparent 1px); background-size: 50px 50px;"
		aria-hidden="true"
	></div>

	<!-- NOISE TEXTURE OVERLAY — SVG NOISE FILTER CANNOT BE EXPRESSED AS TAILWIND -->
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
		style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E&quot;);"
		aria-hidden="true"
	></div>

	<!-- FLOATING ORB DECORATIONS — PARALLAX SHIFT ON SCROLL; isDark TERNARY FOR THEME-AWARE ORB COLORS -->
	<div
		class="animate-pulse-glow pointer-events-none absolute top-1/4 left-[10%] h-72 w-72 rounded-full opacity-20 blur-3xl"
		style="background: radial-gradient(circle, {$isDark ? 'rgba(34, 211, 238, 0.4)' : 'rgba(8, 145, 178, 0.04)'} 0%, transparent 70%); transform: translateY({scrollY *
			-0.15}px);"
		aria-hidden="true"
	></div>
	<div
		class="animate-pulse-glow pointer-events-none absolute right-[10%] bottom-1/4 h-96 w-96 rounded-full opacity-15 blur-3xl"
		style="background: radial-gradient(circle, {$isDark ? 'rgba(45, 212, 191, 0.3)' : 'rgba(8, 145, 178, 0.03)'} 0%, transparent 70%); transform: translateY({scrollY *
			-0.1}px); animation-delay: 1.5s;"
		aria-hidden="true"
	></div>

	<!-- HERO CONTENT -->
	<div class="relative z-10 mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
		<!-- TEXT CONTENT — LEFT SIDE -->
		<div class="flex-1">
			<!-- TAGLINE -->
			<h1
				class="font-display max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] transition-all duration-1000 md:text-6xl lg:text-7xl dark:text-white"
				class:opacity-0={!isVisible}
				class:translate-y-8={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition-delay: 200ms;"
			>
				Tools that do the job
				<br />
				<span class="text-[#0891B2] dark:text-[#22D3EE]">
					<Typewriter phrases={HERO_PHRASES} typingSpeed={70} deletingSpeed={35} pauseDuration={2500} />
				</span>
			</h1>

			<!-- SUBTITLE -->
			<p
				class="mt-8 max-w-xl text-lg text-[#475569] transition-all duration-1000 md:text-xl dark:text-slate-300"
				class:opacity-0={!isVisible}
				class:translate-y-8={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition-delay: 400ms;"
			>
				Extensions, plugins, AI tools, and web apps. Take a look around.
			</p>

			<!-- CTA BUTTON -->
			<div
				class="mt-12 transition-all duration-1000"
				class:opacity-0={!isVisible}
				class:translate-y-8={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition-delay: 600ms;"
			>
				<Button href="/products" variant="primary" class="group relative overflow-hidden">
					<span class="relative z-10">See What's Available</span>
				</Button>
			</div>
		</div>

		<!-- GEOMETRIC CONSTELLATION GRAPHIC — RIGHT SIDE, DESKTOP ONLY -->
		<div
			class="pointer-events-none hidden shrink-0 lg:block"
			class:opacity-0={!isVisible}
			class:opacity-100={isVisible}
			style="transition: opacity 1.5s ease; transition-delay: 800ms;"
			aria-hidden="true"
		>
			<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-100 w-100">
				<!-- CONSTELLATION LINES -->
				<line x1="200" y1="60" x2="320" y2="140" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.3" />
				<line x1="320" y1="140" x2="280" y2="260" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.25" />
				<line x1="280" y1="260" x2="160" y2="300" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.2" />
				<line x1="160" y1="300" x2="100" y2="200" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.25" />
				<line x1="100" y1="200" x2="200" y2="60" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.3" />
				<!-- INNER LINES — FORM AN ABSTRACT "A" SHAPE -->
				<line x1="200" y1="60" x2="160" y2="300" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.8" opacity="0.2" />
				<line x1="200" y1="60" x2="280" y2="260" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.8" opacity="0.2" />
				<line x1="140" y1="200" x2="260" y2="180" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.6" opacity="0.15" />
				<!-- CROSS CONNECTIONS -->
				<line x1="100" y1="200" x2="320" y2="140" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.3" opacity="0.1" />
				<line x1="200" y1="60" x2="220" y2="220" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.3" opacity="0.1" />
				<line x1="320" y1="140" x2="160" y2="300" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.3" opacity="0.08" />
				<!-- OUTER SCATTERED CONNECTIONS -->
				<line x1="60" y1="120" x2="200" y2="60" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.3" opacity="0.12" />
				<line x1="350" y1="80" x2="320" y2="140" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.3" opacity="0.12" />
				<line x1="360" y1="300" x2="280" y2="260" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.3" opacity="0.1" />
				<line x1="80" y1="340" x2="160" y2="300" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.3" opacity="0.1" />
				<!-- MAIN VERTEX DOTS -->
				<circle cx="200" cy="60" r="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.6" />
				<circle cx="320" cy="140" r="2.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.5" />
				<circle cx="280" cy="260" r="2.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.4" />
				<circle cx="160" cy="300" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.4" />
				<circle cx="100" cy="200" r="2.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.5" />
				<!-- INNER DOTS -->
				<circle cx="220" cy="220" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
				<circle cx="140" cy="200" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.25" />
				<circle cx="260" cy="180" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.25" />
				<!-- OUTER SCATTERED DOTS -->
				<circle cx="60" cy="120" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" class="animate-pulse" />
				<circle cx="350" cy="80" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" class="animate-pulse" style="animation-delay: 1s;" />
				<circle cx="360" cy="300" r="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" class="animate-pulse" style="animation-delay: 2s;" />
				<circle cx="80" cy="340" r="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" class="animate-pulse" style="animation-delay: 0.5s;" />
				<circle cx="40" cy="260" r="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
				<circle cx="340" cy="220" r="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
			</svg>
		</div>
	</div>
</section>

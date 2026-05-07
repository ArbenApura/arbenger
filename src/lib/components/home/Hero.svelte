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
		'developers love',
		'that actually ship',
		'I wish existed',
		'worth using',
		'that solve real problems',
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
	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- TAGLINE -->
		<h1
			class="font-display max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] transition-all duration-1000 md:text-6xl lg:text-7xl dark:text-white"
			class:opacity-0={!isVisible}
			class:translate-y-8={!isVisible}
			class:opacity-100={isVisible}
			class:translate-y-0={isVisible}
			style="transition-delay: 200ms;"
		>
			I build things
			<br />
			<span
				class="animate-gradient bg-clip-text text-transparent"
				style="background-image: linear-gradient(135deg, {$isDark ? '#22D3EE' : '#0891B2'}, {$isDark ? '#2DD4BF' : '#0D9488'}, {$isDark ? '#22D3EE' : '#0891B2'});"
			>
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
			One person. Real products. No VC, no team of 50, no slide decks.
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
				<span class="relative z-10">See what I'm building</span>
			</Button>
		</div>
	</div>
</section>

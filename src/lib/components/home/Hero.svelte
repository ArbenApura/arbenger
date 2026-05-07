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
		'of tomorrow',
		'developers love',
		'that ship fast',
		'with purpose',
		'that scale',
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
<section class="relative flex min-h-screen items-center justify-center overflow-hidden">
	<!-- PARTICLE NETWORK BACKGROUND -->
	<ParticleBackground />

	<!-- GRID OVERLAY — RADIAL-GRADIENT DOTS CANNOT BE EXPRESSED AS TAILWIND; isDark TERNARY FOR THEME-AWARE DOT COLOR -->
	<div
		class="pointer-events-none absolute inset-0 opacity-10"
		style="background-image: radial-gradient(circle, {$isDark ? '#2A2578' : '#CBD5E1'} 1px, transparent 1px); background-size: 50px 50px;"
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
		style="background: radial-gradient(circle, {$isDark ? 'rgba(34, 211, 238, 0.4)' : 'rgba(22, 20, 70, 0.08)'} 0%, transparent 70%); transform: translateY({scrollY *
			-0.15}px);"
		aria-hidden="true"
	></div>
	<div
		class="animate-pulse-glow pointer-events-none absolute right-[10%] bottom-1/4 h-96 w-96 rounded-full opacity-15 blur-3xl"
		style="background: radial-gradient(circle, {$isDark ? 'rgba(45, 212, 191, 0.3)' : 'rgba(22, 20, 70, 0.06)'} 0%, transparent 70%); transform: translateY({scrollY *
			-0.1}px); animation-delay: 1.5s;"
		aria-hidden="true"
	></div>

	<!-- HERO CONTENT -->
	<div class="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<!-- TERMINAL BADGE -->
		<div
			class="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/80 px-4 py-2 backdrop-blur-sm transition-all duration-700 dark:border-[#2A2578] dark:bg-[#1E1A5E]/50"
			class:opacity-0={!isVisible}
			class:translate-y-4={!isVisible}
			class:opacity-100={isVisible}
			class:translate-y-0={isVisible}
		>
			<span class="animate-pulse-glow h-2 w-2 rounded-full bg-[#2DD4BF]"></span>
			<span class="font-mono text-xs text-[#334155] dark:text-slate-300">SHIPPING NEW TOOLS</span>
		</div>

		<!-- TAGLINE -->
		<h1
			class="font-display text-5xl font-bold tracking-tight text-[#161446] transition-all duration-1000 md:text-7xl lg:text-8xl dark:text-white"
			class:opacity-0={!isVisible}
			class:translate-y-8={!isVisible}
			class:opacity-100={isVisible}
			class:translate-y-0={isVisible}
			style="transition-delay: 200ms;"
		>
			Building the tools
			<br />
			<span
				class="animate-gradient bg-clip-text text-transparent"
				style="background-image: linear-gradient(135deg, #22D3EE, #2DD4BF, #22D3EE);"
			>
				<Typewriter phrases={HERO_PHRASES} typingSpeed={70} deletingSpeed={35} pauseDuration={2500} />
			</span>
		</h1>

		<!-- SUBTITLE -->
		<p
			class="mx-auto mt-8 max-w-2xl text-lg text-[#334155] transition-all duration-1000 md:text-xl dark:text-slate-300"
			class:opacity-0={!isVisible}
			class:translate-y-8={!isVisible}
			class:opacity-100={isVisible}
			class:translate-y-0={isVisible}
			style="transition-delay: 400ms;"
		>
			We craft AI-powered tools, developer extensions, and SaaS products that help creators and engineers work
			smarter, build faster, and ship with confidence.
		</p>

		<!-- CTA BUTTONS -->
		<div
			class="mt-12 flex flex-col items-center justify-center gap-4 transition-all duration-1000 sm:flex-row"
			class:opacity-0={!isVisible}
			class:translate-y-8={!isVisible}
			class:opacity-100={isVisible}
			class:translate-y-0={isVisible}
			style="transition-delay: 600ms;"
		>
			<Button href="/products" variant="primary" class="group relative overflow-hidden">
				<span class="relative z-10">Explore Products</span>
			</Button>
			<Button href="/about" variant="secondary">About Us</Button>
		</div>

		<!-- SCROLL INDICATOR -->
		<div
			class="mt-20 flex flex-col items-center gap-2 transition-all duration-1000"
			class:opacity-0={!isVisible}
			class:opacity-100={isVisible}
			style="transition-delay: 1000ms;"
		>
			<span class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">SCROLL</span>
			<div class="animate-pulse-glow h-8 w-[1px] bg-[#E2E8F0] dark:bg-[#2A2578]"></div>
		</div>
	</div>
</section>

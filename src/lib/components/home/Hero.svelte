<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount } from 'svelte';

	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';
	import { isMobile } from '$lib/stores/viewport';
	// IMPORTED COMPONENTS
	import ParticleBackground from '$lib/components/home/ParticleBackground.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Typewriter from '$lib/components/ui/Typewriter.svelte';

	// -- CONSTANTS -- //

	const HERO_PHRASES = [
		'Full-Stack Web Developer',
		'SvelteKit & Next.js Specialist',
		'Web App Developer',
		'Freelance Developer',
		'Figma to Production',
	];

	// -- REACTIVE STATES -- //

	$: c = $isDark ? '#22D3EE' : '#0891B2';
	$: c2 = $isDark ? '#2DD4BF' : '#0E7490';
	$: op = (v: number) => Math.min(v * 4, 1);
	$: fp = (v: number) => Math.min(v * 2, 1);

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
		class="pointer-events-none absolute inset-0"
		style="background-image: radial-gradient(circle, {$isDark
			? 'rgba(42, 37, 120, 0.1)'
			: 'rgba(8, 145, 178, 0.08)'} 1px, transparent 1px); background-size: 50px 50px;"
		aria-hidden="true"
	></div>

	<!-- NOISE TEXTURE OVERLAY — SVG NOISE FILTER CANNOT BE EXPRESSED AS TAILWIND -->
	<div
		class="pointer-events-none absolute inset-0 mix-blend-overlay"
		style="opacity: {$isDark
			? 0.03
			: 0.06}; background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E&quot;);"
		aria-hidden="true"
	></div>

	<!-- FLOATING ORB DECORATIONS — PARALLAX SHIFT ON SCROLL -->
	<div
		class="animate-pulse-glow pointer-events-none absolute top-1/4 left-[10%] h-48 w-48 rounded-full blur-3xl md:h-72 md:w-72"
		style="opacity: {$isDark ? 0.2 : 1}; background: radial-gradient(circle, {$isDark
			? 'rgba(34, 211, 238, 0.4)'
			: 'rgba(8, 145, 178, 0.5)'} 0%, transparent 70%); {$isMobile
			? ''
			: `transform: translateY(${scrollY * -0.15}px);`}"
		aria-hidden="true"
	></div>
	<div
		class="animate-pulse-glow pointer-events-none absolute right-[10%] bottom-1/4 h-56 w-56 rounded-full blur-3xl md:h-96 md:w-96"
		style="opacity: {$isDark ? 0.15 : 0.8}; background: radial-gradient(circle, {$isDark
			? 'rgba(45, 212, 191, 0.3)'
			: 'rgba(6, 182, 212, 0.45)'} 0%, transparent 70%); animation-delay: 1.5s; {$isMobile
			? ''
			: `transform: translateY(${scrollY * -0.1}px);`}"
		aria-hidden="true"
	></div>

	<!-- HERO CONTENT -->
	<div class="relative z-10 mx-auto flex max-w-7xl items-center px-6 lg:px-8">
		<!-- TEXT CONTENT — LEFT SIDE -->
		<div class="flex-1">
			<!-- TAGLINE -->
			<div
				class:opacity-0={!isVisible}
				class:translate-y-8={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition: all 1s ease; transition-delay: 100ms;"
			>
				<span class="inline-flex items-center gap-2 rounded-full border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 px-3.5 py-1.5 font-mono text-xs text-[#0F766E] dark:text-[#2DD4BF]">
					<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2DD4BF]" />
					Available for freelance work
				</span>
			</div>

			<h1
				class="font-display max-w-4xl text-4xl leading-[1.1] font-bold tracking-tight text-[#0F172A] transition-all duration-1000 md:text-6xl lg:text-7xl dark:text-white"
				class:opacity-0={!isVisible}
				class:translate-y-8={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition-delay: 200ms;"
			>
				Arben M. Apura
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
				I'm a freelance full-stack developer focused on building production web applications —
				from client Figma designs to deployed products.
			</p>

			<!-- CTA BUTTONS -->
			<div
				class="mt-12 flex flex-wrap items-center gap-4 transition-all duration-1000"
				class:opacity-0={!isVisible}
				class:translate-y-8={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition-delay: 600ms;"
			>
				<Button href="/projects/" variant="primary" class="group relative overflow-hidden">
					<span class="relative z-10">View Projects</span>
				</Button>
				<Button href="/contact/" variant="secondary">Get in Touch</Button>
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
			<svg viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-115 w-115">
				<!-- AMBIENT GLOW -->
				<circle cx="260" cy="240" r="170" fill={c} opacity={fp(0.02)} />
				<circle cx="260" cy="180" r="90" fill={c} opacity={fp(0.03)} />
				<circle cx="260" cy="100" r="40" fill={c2} opacity={fp(0.04)} />

				<!-- CONCENTRIC RINGS -->
				<circle cx="260" cy="260" r="240" stroke={c} stroke-width="0.3" opacity={op(0.05)} />
				<circle cx="260" cy="260" r="190" stroke={c} stroke-width="0.3" opacity={op(0.07)} />
				<circle cx="260" cy="260" r="135" stroke={c2} stroke-width="0.3" opacity={op(0.06)} />

				<!-- LOGO OUTER "A" SHAPE -->
				<polygon
					points="120.9,450 32.9,450 226.8,70 293.4,70 345.1,174.1 298.5,245.7 260,167.1"
					fill={c}
					fill-opacity={fp(0.03)}
					fill-rule="evenodd"
					stroke={c}
					stroke-width="1.1"
					stroke-linejoin="miter"
					opacity={op(0.42)}
				/>

				<!-- LOGO INNER "M" SHAPE -->
				<polygon
					points="178.6,450 161.8,450 249,298.5 272.7,325.1 359.7,191.8 487.1,450 398.7,450 349.3,349.2 359.9,332.1 397.5,353.7 356.2,272.2 271.3,395.3 249.6,365.2"
					fill={c}
					fill-opacity={fp(0.03)}
					fill-rule="evenodd"
					stroke={c}
					stroke-width="0.9"
					stroke-linejoin="miter"
					opacity={op(0.32)}
				/>

				<!-- CROSS LATTICE BETWEEN OUTER AND INNER -->
				<line x1="298.5" y1="245.7" x2="356.2" y2="272.2" stroke={c2} stroke-width="0.4" opacity={op(0.14)} />
				<line x1="298.5" y1="245.7" x2="249" y2="298.5" stroke={c2} stroke-width="0.4" opacity={op(0.14)} />
				<line x1="298.5" y1="245.7" x2="359.7" y2="191.8" stroke={c2} stroke-width="0.4" opacity={op(0.14)} />
				<line x1="298.5" y1="245.7" x2="272.7" y2="325.1" stroke={c2} stroke-width="0.4" opacity={op(0.14)} />
				<line x1="345.1" y1="174.1" x2="356.2" y2="272.2" stroke={c2} stroke-width="0.4" opacity={op(0.14)} />
				<line x1="260" y1="167.1" x2="359.7" y2="191.8" stroke={c2} stroke-width="0.4" opacity={op(0.14)} />
				<line x1="298.5" y1="245.7" x2="359.9" y2="332.1" stroke={c2} stroke-width="0.4" opacity={op(0.14)} />
				<line x1="298.5" y1="245.7" x2="349.3" y2="349.2" stroke={c2} stroke-width="0.4" opacity={op(0.14)} />

				<!-- SATELLITE-TO-LOGO CONNECTIONS -->
				<line x1="260" y1="25" x2="226.8" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="260" y1="25" x2="293.4" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="200" y1="30" x2="226.8" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="200" y1="30" x2="293.4" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="320" y1="28" x2="293.4" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="320" y1="28" x2="226.8" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="260" y1="50" x2="226.8" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="260" y1="50" x2="293.4" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="140" y1="45" x2="226.8" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="380" y1="42" x2="293.4" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="380" y1="42" x2="345.1" y2="174.1" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="90" y1="75" x2="226.8" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="430" y1="75" x2="345.1" y2="174.1" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="430" y1="75" x2="359.7" y2="191.8" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="60" y1="130" x2="226.8" y2="70" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="460" y1="130" x2="359.7" y2="191.8" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="460" y1="130" x2="345.1" y2="174.1" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="30" y1="200" x2="260" y2="167.1" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="490" y1="200" x2="359.7" y2="191.8" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="490" y1="200" x2="345.1" y2="174.1" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="15" y1="280" x2="32.9" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="505" y1="280" x2="397.5" y2="353.7" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="505" y1="280" x2="356.2" y2="272.2" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="40" y1="360" x2="32.9" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="40" y1="360" x2="120.9" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="480" y1="360" x2="397.5" y2="353.7" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="480" y1="360" x2="487.1" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="60" y1="460" x2="32.9" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="60" y1="460" x2="120.9" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="460" y1="460" x2="487.1" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="460" y1="460" x2="398.7" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="110" y1="490" x2="120.9" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="110" y1="490" x2="161.8" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="410" y1="490" x2="398.7" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="410" y1="490" x2="487.1" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="260" y1="495" x2="178.6" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="260" y1="495" x2="271.3" y2="395.3" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="180" y1="480" x2="178.6" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="180" y1="480" x2="161.8" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="340" y1="480" x2="398.7" y2="450" stroke={c} stroke-width="0.3" opacity={op(0.08)} />
				<line x1="340" y1="480" x2="271.3" y2="395.3" stroke={c} stroke-width="0.3" opacity={op(0.08)} />

				<!-- OUTER WEB (SATELLITE ADJACENCIES) -->
				<line x1="260" y1="25" x2="200" y2="30" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="260" y1="25" x2="320" y2="28" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="200" y1="30" x2="260" y2="50" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="200" y1="30" x2="140" y2="45" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="320" y1="28" x2="260" y2="50" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="320" y1="28" x2="380" y2="42" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="140" y1="45" x2="90" y2="75" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="380" y1="42" x2="430" y2="75" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="90" y1="75" x2="60" y2="130" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="430" y1="75" x2="460" y2="130" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="60" y1="130" x2="30" y2="200" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="460" y1="130" x2="490" y2="200" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="30" y1="200" x2="15" y2="280" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="490" y1="200" x2="505" y2="280" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="15" y1="280" x2="40" y2="360" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="505" y1="280" x2="480" y2="360" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="40" y1="360" x2="60" y2="460" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="480" y1="360" x2="460" y2="460" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="60" y1="460" x2="110" y2="490" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="460" y1="460" x2="410" y2="490" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="110" y1="490" x2="180" y2="480" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="410" y1="490" x2="340" y2="480" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="260" y1="495" x2="180" y2="480" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />
				<line x1="260" y1="495" x2="340" y2="480" stroke={c2} stroke-width="0.25" opacity={op(0.07)} />

				<!-- LOGO VERTEX NODES (OUTER A) -->
				<circle cx="260.1" cy="70" r="5" fill={c} opacity={fp(0.85)} />
				<circle cx="260.1" cy="70" r="11" stroke={c} stroke-width="0.5" opacity={op(0.22)} fill="none" />
				<circle cx="260.1" cy="70" r="19" stroke={c} stroke-width="0.3" opacity={op(0.08)} fill="none" />
				<circle cx="120.9" cy="450" r="3.5" fill={c} opacity={fp(0.55)} />
				<circle cx="120.9" cy="450" r="7.5" stroke={c} stroke-width="0.35" opacity={op(0.12)} fill="none" />
				<circle cx="32.9" cy="450" r="3.5" fill={c} opacity={fp(0.55)} />
				<circle cx="32.9" cy="450" r="7.5" stroke={c} stroke-width="0.35" opacity={op(0.12)} fill="none" />
				<circle cx="226.8" cy="70" r="3.5" fill={c} opacity={fp(0.55)} />
				<circle cx="226.8" cy="70" r="7.5" stroke={c} stroke-width="0.35" opacity={op(0.12)} fill="none" />
				<circle cx="293.4" cy="70" r="3.5" fill={c} opacity={fp(0.55)} />
				<circle cx="293.4" cy="70" r="7.5" stroke={c} stroke-width="0.35" opacity={op(0.12)} fill="none" />
				<circle cx="345.1" cy="174.1" r="3.5" fill={c} opacity={fp(0.55)} />
				<circle cx="345.1" cy="174.1" r="7.5" stroke={c} stroke-width="0.35" opacity={op(0.12)} fill="none" />
				<circle cx="298.5" cy="245.7" r="3.5" fill={c} opacity={fp(0.55)} />
				<circle cx="298.5" cy="245.7" r="7.5" stroke={c} stroke-width="0.35" opacity={op(0.12)} fill="none" />
				<circle cx="260" cy="167.1" r="3.5" fill={c} opacity={fp(0.55)} />
				<circle cx="260" cy="167.1" r="7.5" stroke={c} stroke-width="0.35" opacity={op(0.12)} fill="none" />

				<!-- LOGO VERTEX NODES (INNER M) -->
				<circle cx="178.6" cy="450" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="178.6" cy="450" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="161.8" cy="450" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="161.8" cy="450" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="249" cy="298.5" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="249" cy="298.5" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="272.7" cy="325.1" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="272.7" cy="325.1" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="359.7" cy="191.8" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="359.7" cy="191.8" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="487.1" cy="450" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="487.1" cy="450" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="398.7" cy="450" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="398.7" cy="450" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="349.3" cy="349.2" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="349.3" cy="349.2" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="359.9" cy="332.1" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="359.9" cy="332.1" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="397.5" cy="353.7" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="397.5" cy="353.7" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="356.2" cy="272.2" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="356.2" cy="272.2" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="271.3" cy="395.3" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="271.3" cy="395.3" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />
				<circle cx="249.6" cy="365.2" r="2.5" fill={c2} opacity={fp(0.45)} />
				<circle cx="249.6" cy="365.2" r="6" stroke={c2} stroke-width="0.3" opacity={op(0.1)} fill="none" />

				<!-- OUTER SATELLITES -->
				<circle
					cx="260"
					cy="25"
					r="1.8"
					fill={c}
					opacity={op(0.28)}
					class="animate-pulse"
					style="animation-delay: 0.0s;"
				/>
				<circle cx="200" cy="30" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle cx="320" cy="28" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle cx="260" cy="50" r="1.8" fill={c} opacity={fp(0.28)} />
				<circle cx="140" cy="45" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle
					cx="380"
					cy="42"
					r="1.3"
					fill={c}
					opacity={op(0.2)}
					class="animate-pulse"
					style="animation-delay: 2.0s;"
				/>
				<circle cx="90" cy="75" r="1.8" fill={c} opacity={fp(0.28)} />
				<circle cx="430" cy="75" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle cx="60" cy="130" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle
					cx="460"
					cy="130"
					r="1.8"
					fill={c}
					opacity={op(0.28)}
					class="animate-pulse"
					style="animation-delay: 0.6s;"
				/>
				<circle cx="30" cy="200" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle cx="490" cy="200" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle cx="15" cy="280" r="1.8" fill={c} opacity={fp(0.28)} />
				<circle cx="505" cy="280" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle
					cx="40"
					cy="360"
					r="1.3"
					fill={c}
					opacity={op(0.2)}
					class="animate-pulse"
					style="animation-delay: 2.6s;"
				/>
				<circle cx="480" cy="360" r="1.8" fill={c} opacity={fp(0.28)} />
				<circle cx="60" cy="460" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle cx="460" cy="460" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle
					cx="110"
					cy="490"
					r="1.8"
					fill={c}
					opacity={op(0.28)}
					class="animate-pulse"
					style="animation-delay: 1.2s;"
				/>
				<circle cx="410" cy="490" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle cx="260" cy="495" r="1.3" fill={c} opacity={fp(0.2)} />
				<circle cx="180" cy="480" r="1.8" fill={c} opacity={fp(0.28)} />
				<circle cx="340" cy="480" r="1.3" fill={c} opacity={fp(0.2)} />

				<!-- STAR DUST -->
				<circle cx="260" cy="95" r="0.50" fill={c2} opacity={fp(0.05)} />
				<circle cx="240" cy="130" r="0.65" fill={c} opacity={fp(0.07)} />
				<circle cx="280" cy="125" r="0.80" fill={c} opacity={fp(0.09)} />
				<circle cx="220" cy="165" r="0.50" fill={c} opacity={fp(0.11)} />
				<circle cx="300" cy="160" r="0.65" fill={c} opacity={fp(0.05)} />
				<circle cx="210" cy="220" r="0.80" fill={c2} opacity={fp(0.07)} />
				<circle cx="310" cy="220" r="0.50" fill={c} opacity={fp(0.09)} />
				<circle cx="180" cy="270" r="0.65" fill={c} opacity={fp(0.11)} />
				<circle cx="340" cy="270" r="0.80" fill={c} opacity={fp(0.05)} />
				<circle cx="75" cy="200" r="0.50" fill={c} opacity={fp(0.07)} />
				<circle cx="445" cy="200" r="0.65" fill={c2} opacity={fp(0.09)} />
				<circle cx="100" cy="350" r="0.80" fill={c} opacity={fp(0.11)} />
				<circle cx="420" cy="350" r="0.50" fill={c} opacity={fp(0.05)} />
				<circle cx="155" cy="400" r="0.65" fill={c} opacity={fp(0.07)} />
				<circle cx="365" cy="400" r="0.80" fill={c} opacity={fp(0.09)} />
				<circle cx="250" cy="410" r="0.50" fill={c2} opacity={fp(0.11)} />
				<circle cx="50" cy="60" r="0.65" fill={c} opacity={fp(0.05)} />
				<circle cx="470" cy="60" r="0.80" fill={c} opacity={fp(0.07)} />
				<circle cx="490" cy="410" r="0.50" fill={c} opacity={fp(0.09)} />
				<circle cx="30" cy="410" r="0.65" fill={c} opacity={fp(0.11)} />
			</svg>
		</div>
	</div>
</section>

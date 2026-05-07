<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Zap, Shield, Eye } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal, revealSlide } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import Button from '$lib/components/ui/Button.svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';

	// -- CONSTANTS -- //

	const STATS = [
		{ value: '5+', label: 'Product Categories', icon: Zap },
		{ value: '100%', label: 'Solo Built', icon: Shield },
		{ value: '∞', label: 'Ideas in Pipeline', icon: Eye },
	];
</script>

<!-- ABOUT TEASER SECTION -->
<section class="relative overflow-hidden border-t border-[#2A2578]/50 py-32">
	<!-- BACKGROUND ACCENTS -->
	<div
		class="pointer-events-none absolute bottom-0 left-0 h-100 w-100 rounded-full opacity-10 blur-3xl"
		style="background: radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, transparent 70%);"
		aria-hidden="true"
	></div>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- TOP: ABOUT TEXT -->
		<div class="grid items-center gap-16 lg:grid-cols-2">
			<div use:revealSlide={{ direction: 'left' }}>
				<SectionLabel label="ABOUT" />

				<h2 class="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
					Crafting digital tools
					<br />
					<span class="text-[#22D3EE]">with purpose</span>
				</h2>

				<p class="mt-6 text-lg leading-relaxed text-slate-300">
					Arbenger is a solo venture by Arben Apura, focused on building developer tools and creative products
					that make a real difference. From AI-powered utilities to browser extensions, every product is built
					with obsessive attention to performance, design, and developer experience.
				</p>

				<p class="mt-4 text-slate-400">
					We don't chase trends. We identify real pain points, architect thoughtful solutions, and ship
					products that developers actually want to use every day.
				</p>

				<div class="mt-10">
					<Button href="/about" variant="secondary">Learn more about us</Button>
				</div>
			</div>

			<!-- DECORATIVE: ANIMATED LOGO WITH ORBITAL RINGS -->
			<div use:revealSlide={{ direction: 'right' }} class="hidden items-center justify-center lg:flex">
				<div class="relative">
					<!-- ORBITAL RING 1 -->
					<div
						class="absolute -inset-5 animate-[spin_20s_linear_infinite] rounded-full border border-[#2A2578]/40"
					></div>
					<!-- ORBITAL RING 2 -->
					<div
						class="absolute -inset-12.5 animate-[spin_30s_linear_infinite_reverse] rounded-full border border-[#2A2578]/20"
					></div>
					<!-- ORBITAL DOT -->
					<div
						class="absolute -top-5 left-1/2 h-2 w-2 -translate-x-1/2 animate-[spin_20s_linear_infinite] rounded-full bg-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.5)]"
						style="transform-origin: 50% calc(50% + 148px);"
					></div>

					<!-- GLOW RING -->
					<div
						class="animate-pulse-glow absolute inset-0 rounded-full opacity-30 blur-2xl"
						style="background: radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%);"
					></div>

					<!-- LOGO CONTAINER -->
					<div
						class="relative flex h-72 w-72 items-center justify-center rounded-full border border-[#2A2578]/60 bg-[#1E1A5E]/30 backdrop-blur-sm"
					>
						<Logo size={112} class="animate-float text-[#161446] dark:text-white" />
					</div>
				</div>
			</div>
		</div>

		<!-- STATS ROW -->
		<div class="mt-20 grid gap-6 sm:grid-cols-3">
			{#each STATS as stat, i}
				<div
					use:reveal={{ delay: i * 150 }}
					class="group flex items-center gap-5 rounded-xl border border-[#2A2578]/50 bg-[#1E1A5E]/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#22D3EE]/20"
				>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#22D3EE]/10 transition-colors duration-300 group-hover:bg-[#22D3EE]/20"
					>
						<svelte:component this={stat.icon} class="size-6 text-[#22D3EE]" />
					</div>
					<div>
						<p class="font-display text-2xl font-bold text-white">{stat.value}</p>
						<p class="text-sm text-slate-400">{stat.label}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

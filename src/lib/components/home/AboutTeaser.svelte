<script lang="ts">
	// IMPORTED MODULES
	import { reveal, revealSlide } from '$lib/actions/reveal';

	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';

	// IMPORTED COMPONENTS
	import Button from '$lib/components/ui/Button.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
</script>

<!-- ABOUT TEASER SECTION -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-32 dark:border-[#2A2578]/50">
	<!-- BACKGROUND ACCENT -->
	<div
		class="pointer-events-none absolute bottom-0 left-0 h-100 w-100 rounded-full opacity-10 blur-3xl"
		style="background: radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, transparent 70%);"
		aria-hidden="true"
	></div>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-16 lg:grid-cols-2">
			<!-- TEXT — PERSONAL, NOT CORPORATE -->
			<div use:revealSlide={{ direction: 'left' }}>
				<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">About</p>

				<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
					Built by developers, for developers.
				</h2>

				<p class="mt-6 text-lg leading-relaxed text-[#475569] dark:text-slate-300">
					Arbenger exists because the right tools often don't. We build VS Code extensions,
					Chrome plugins, AI utilities, and SaaS products that solve real problems.
				</p>

				<p class="mt-4 text-[#64748B] dark:text-slate-400">
					Our current focus is AI tooling and developer extensions. Everything we ship is
					designed for people who actually write code.
				</p>

				<div class="mt-10">
					<Button href="/about" variant="secondary">Learn more</Button>
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

					<!-- FLOATING TECH STACK ICONS -->
					<!-- SVELTEKIT FLAME -->
					<div class="animate-float absolute -top-10 -right-6" style="animation-delay: 0.5s;" aria-hidden="true">
						<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8">
							<path d="M 24 4 C 18 2 12 6 10 10 C 8 14 10 18 12 20 C 10 18 9 15 10 12 C 11 8 16 5 20 6 C 24 7 26 12 24 16 C 22 20 16 22 14 20 C 16 22 20 22 22 18 C 26 14 26 8 24 4 Z" fill="#FF3E00" opacity="0.7" />
						</svg>
					</div>

					<!-- TYPESCRIPT BADGE -->
					<div class="animate-float absolute -bottom-8 -left-8" style="animation-delay: 1.5s;" aria-hidden="true">
						<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7">
							<rect x="2" y="2" width="28" height="28" rx="4" fill="#3178C6" opacity="0.7" />
							<text x="16" y="22" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="sans-serif" opacity="0.9">TS</text>
						</svg>
					</div>

					<!-- AI BRAIN CIRCUIT -->
					<div class="animate-float absolute -right-12 bottom-8" style="animation-delay: 2.5s;" aria-hidden="true">
						<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7">
							<circle cx="16" cy="16" r="10" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1.5" opacity="0.5" />
							<circle cx="16" cy="10" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.6" />
							<circle cx="10" cy="18" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.6" />
							<circle cx="22" cy="18" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.6" />
							<line x1="16" y1="10" x2="10" y2="18" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" opacity="0.4" />
							<line x1="16" y1="10" x2="22" y2="18" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" opacity="0.4" />
							<line x1="10" y1="18" x2="22" y2="18" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" opacity="0.4" />
						</svg>
					</div>

					<!-- LOGO CONTAINER -->
					<div
						class="relative flex h-72 w-72 items-center justify-center rounded-full border border-[#F1F5F9] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-sm dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/30 dark:shadow-none"
					>
						<Logo size={112} class="animate-float text-[#0F172A] dark:text-white" />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

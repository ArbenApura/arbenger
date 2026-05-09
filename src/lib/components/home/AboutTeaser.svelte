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
					Less noise, more function.
				</h2>

				<p class="mt-6 text-lg leading-relaxed text-[#475569] dark:text-slate-300">
					Arbenger makes extensions, plugins, AI tools, and web apps.
					Each one is built to do its job and get out of the way.
				</p>

				<p class="mt-4 text-[#64748B] dark:text-slate-400">
					Curious? Browse the catalog or say hello.
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

					<!-- FLOATING ABSTRACT SHAPES -->
					<!-- FACETED GEM — TOP RIGHT -->
					<div class="animate-float absolute -top-10 -right-6" style="animation-delay: 0.5s;" aria-hidden="true">
						<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9">
							<path d="M18 3L30 14L18 33L6 14Z" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" opacity="0.35" fill="none" />
							<path d="M6 14H30" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.7" opacity="0.2" />
							<path d="M18 3L14 14L18 33" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.15" />
							<path d="M18 3L22 14L18 33" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.15" />
							<circle cx="18" cy="3" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.4" />
						</svg>
					</div>

					<!-- STACKED RINGS — BOTTOM LEFT -->
					<div class="animate-float absolute -bottom-8 -left-8" style="animation-delay: 1.5s;" aria-hidden="true">
						<svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8">
							<circle cx="17" cy="17" r="12" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" opacity="0.3" fill="none" />
							<circle cx="17" cy="17" r="7" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.8" opacity="0.2" fill="none" />
							<circle cx="17" cy="17" r="2.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.25" />
						</svg>
					</div>

					<!-- CONSTELLATION TRIANGLE — BOTTOM RIGHT -->
					<div class="animate-float absolute -right-12 bottom-8" style="animation-delay: 2.5s;" aria-hidden="true">
						<svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8">
							<line x1="17" y1="5" x2="5" y2="27" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.7" opacity="0.25" />
							<line x1="5" y1="27" x2="29" y2="27" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.7" opacity="0.25" />
							<line x1="29" y1="27" x2="17" y2="5" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.7" opacity="0.25" />
							<circle cx="17" cy="5" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.4" />
							<circle cx="5" cy="27" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
							<circle cx="29" cy="27" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
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

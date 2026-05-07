<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Code, Brain, Wrench, Rocket, ArrowRight } from 'lucide-svelte';

	// IMPORTED MODULES
	import { categories } from '$lib/data/products';
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import Badge from '$lib/components/ui/Badge.svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';

	// -- CONSTANTS -- //

	const ICON_MAP: Record<string, typeof Code> = {
		code: Code,
		brain: Brain,
		wrench: Wrench,
		rocket: Rocket,
	};
</script>

<!-- PRODUCT CATEGORIES SECTION -->
<section class="relative overflow-hidden py-32">
	<!-- SECTION BACKGROUND ACCENT -->
	<div
		class="pointer-events-none absolute top-0 right-0 h-125 w-125 rounded-full opacity-10 blur-3xl"
		style="background: radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%);"
		aria-hidden="true"
	></div>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div use:reveal>
			<SectionLabel label="PRODUCTS" />

			<h2 class="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">What we build</h2>
			<p class="mt-4 max-w-2xl text-lg text-slate-300">
				From browser extensions to AI-powered platforms, we build tools that solve real problems for developers
				and creators across multiple ecosystems.
			</p>
		</div>

		<!-- CATEGORY GRID -->
		<div class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each categories as category, i}
				<div
					use:reveal={{ delay: i * 100 }}
					class="group relative overflow-hidden rounded-xl border border-[#2A2578] bg-[#1E1A5E]/50 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#22D3EE]/30 hover:shadow-[0_0_60px_rgba(34,211,238,0.08)]"
				>
					<!-- HOVER GRADIENT — RADIAL-GRADIENT CANNOT BE EXPRESSED AS TAILWIND -->
					<div
						class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						style="background: radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.06) 0%, transparent 60%);"
						aria-hidden="true"
					></div>

					<!-- ICON -->
					<div
						class="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#22D3EE]/10 transition-all duration-300 group-hover:bg-[#22D3EE]/20 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
					>
						{#if category.icon === 'chrome'}
							<svg
								class="size-7 text-[#22D3EE]"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect x="3" y="3" width="18" height="18" rx="2" />
								<path d="M7 7h10v10H7z" />
							</svg>
						{:else}
							<svelte:component this={ICON_MAP[category.icon]} class="size-7 text-[#22D3EE]" />
						{/if}
					</div>

					<!-- CONTENT -->
					<h3 class="font-display relative text-xl font-bold tracking-tight text-white">
						{category.name}
					</h3>

					<p class="relative mt-3 text-sm leading-relaxed text-slate-300">
						{category.description}
					</p>

					<!-- FOOTER -->
					<div class="relative mt-6 flex items-center justify-between">
						<Badge variant="cyan">Coming soon</Badge>
						<span
							class="flex items-center gap-1 text-xs text-slate-500 transition-colors duration-300 group-hover:text-[#22D3EE]"
						>
							View
							<ArrowRight class="size-3 transition-transform duration-300 group-hover:translate-x-1" />
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

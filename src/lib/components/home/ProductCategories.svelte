<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Code, Brain, Wrench, Rocket, ArrowRight } from 'lucide-svelte';

	// IMPORTED MODULES
	import { categories } from '$lib/data/products';
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';

	// IMPORTED COMPONENTS
	import CategoryIllustration from '$lib/components/ui/CategoryIllustration.svelte';

	// -- CONSTANTS -- //

	const ICON_MAP: Record<string, typeof Code> = {
		code: Code,
		brain: Brain,
		wrench: Wrench,
		rocket: Rocket,
	};
</script>

<!-- PRODUCT CATEGORIES SECTION -->
<section class="relative overflow-hidden py-16 md:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- SECTION INTRO — LEFT-ALIGNED, NO SECTION LABEL -->
		<div use:reveal class="max-w-2xl">
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Products</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
				What's here
			</h2>
		</div>

		<!-- STACKED CATEGORY ROWS — EACH ONE UNIQUE, NOT A GRID -->
		<div class="mt-20 space-y-4">
			{#each categories as category, i}
				<a
					href="/products/"
					use:reveal={{ delay: i * 80 }}
					class="group flex items-center justify-between rounded-2xl border border-[#F1F5F9] bg-white px-4 py-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 sm:px-8 sm:py-6 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/20 dark:shadow-none dark:hover:border-[#22D3EE]/30 dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.06)]"
				>
					<div class="flex items-center gap-3 sm:gap-6">
						<!-- ICON -->
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0891B2]/10 transition-all duration-300 sm:h-12 sm:w-12 group-hover:bg-[#0891B2]/20 group-hover:shadow-[0_0_20px_rgba(8,145,178,0.15)] dark:bg-[#22D3EE]/10 dark:group-hover:bg-[#22D3EE]/20 dark:group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
						>
							{#if category.icon === 'chrome'}
								<svg
									class="size-6 text-[#0891B2] dark:text-[#22D3EE]"
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
								<svelte:component this={ICON_MAP[category.icon]} class="size-6 text-[#0891B2] dark:text-[#22D3EE]" />
							{/if}
						</div>

						<!-- TEXT -->
						<div>
							<h3 class="font-display text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">
								{category.name}
							</h3>
							<p class="mt-1 text-sm text-[#64748B] dark:text-slate-400">
								{category.description}
							</p>
						</div>
					</div>

					<!-- ILLUSTRATION + ARROW -->
					<div class="flex shrink-0 items-center gap-6">
						<div class="hidden md:block">
							<CategoryIllustration category={category.id} />
						</div>
						<ArrowRight
							class="size-5 shrink-0 text-[#94A3B8] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#22D3EE] dark:text-slate-500"
						/>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

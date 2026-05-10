<script lang="ts">
	// IMPORTED DEP-MODULES
	import { ImageIcon, ArrowRight, Shield, Layers, Crop } from 'lucide-svelte';
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
	// IMPORTED COMPONENTS
	import Button from '$lib/components/ui/Button.svelte';
</script>

<section class="relative overflow-hidden py-16 md:py-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- SECTION INTRO -->
		<div use:reveal class="mb-10 max-w-2xl">
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Now available</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
				Try our first tool
			</h2>
			<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
				We're shipping products one at a time. Here's what's ready to use.
			</p>
		</div>

		<!-- FEATURED CARD -->
		<div use:reveal={{ delay: 100 }} class="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:border-[#2A2578]/60 dark:from-[#1E1A5E]/30 dark:to-[#0B0A23] dark:shadow-none">
			<div class="flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-center lg:gap-16">
				<!-- LEFT: CONTENT -->
				<div class="flex-1 space-y-5">
					<!-- BADGES -->
					<div class="flex items-center gap-2">
						<span class="rounded-full bg-[#2DD4BF]/10 px-3 py-1 text-xs font-semibold text-[#2DD4BF]">
							Live
						</span>
						<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
							Utilities
						</span>
					</div>

					<h2 class="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl dark:text-white">
						Image Resizer
					</h2>

					<p class="max-w-lg text-base text-[#475569] dark:text-slate-300">
						Drag, drop, resize. Crop to any region, batch-process dozens at once, export as PNG, JPEG, or WebP. Your images never leave your device.
					</p>

					<!-- FEATURE PILLS -->
					<div class="flex flex-wrap gap-2">
						<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
							<Shield size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
							100% Local
						</span>
						<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
							<Layers size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
							Batch Processing
						</span>
						<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
							<Crop size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
							Crop & Resize
						</span>
						<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
							<ImageIcon size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
							PNG · JPEG · WebP
						</span>
					</div>

					<!-- CTA BUTTONS: STACKED ON NARROW, INLINE ON SM+ -->
					<div class="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
						<Button href="/products/image-resizer/" variant="primary" class="w-full sm:w-auto">
							Open Image Resizer
						</Button>
						<a
							href="/products/"
							class="flex items-center justify-center gap-1 text-sm text-[#64748B] transition-colors hover:text-[#0891B2] sm:justify-start dark:text-slate-400 dark:hover:text-[#22D3EE]"
						>
							All products
							<ArrowRight size={14} />
						</a>
					</div>
				</div>

				<!-- DESKTOP UI MINIATURE: SIDE-BY-SIDE ON LG+ -->
				<div class="hidden shrink-0 lg:block">
					<div class="relative w-80 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/40 dark:shadow-none">
						<!-- MOCK BREADCRUMB -->
						<div class="mb-3 flex items-center gap-1 text-[8px] text-[#CBD5E1] dark:text-slate-600">
							<span>Home</span><span>/</span><span>Products</span><span>/</span><span class="text-[#94A3B8] dark:text-slate-400">Image Resizer</span>
						</div>
						<!-- MOCK IMAGE PREVIEW -->
						<div class="mb-3 flex h-24 items-center justify-center rounded-lg bg-[#F1F5F9] dark:bg-[#0B0A23]/50">
							<div class="flex items-center gap-3">
								<div class="flex h-16 w-20 items-center justify-center rounded border border-dashed border-[#CBD5E1] dark:border-slate-600">
									<ImageIcon size={16} class="text-[#CBD5E1] dark:text-slate-600" />
								</div>
								<svg width="20" height="12" viewBox="0 0 20 12" fill="none" class="text-[#0891B2] dark:text-[#22D3EE]">
									<path d="M1 6h14M12 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								<div class="flex h-12 w-16 items-center justify-center rounded border border-[#0891B2]/30 bg-[#0891B2]/5 dark:border-[#22D3EE]/30 dark:bg-[#22D3EE]/5">
									<ImageIcon size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
								</div>
							</div>
						</div>
						<!-- MOCK DIMENSIONS ROW -->
						<div class="mb-2 flex items-center gap-1.5">
							<div class="flex flex-1 items-center rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 dark:border-[#2A2578] dark:bg-[#0B0A23]/50">
								<span class="text-[7px] font-medium text-[#94A3B8] dark:text-slate-500">W</span>
								<span class="ml-auto text-[8px] font-semibold tabular-nums text-[#0F172A] dark:text-white">1280</span>
								<span class="ml-0.5 text-[6px] text-[#CBD5E1] dark:text-slate-600">px</span>
							</div>
							<div class="flex h-5 w-5 items-center justify-center rounded text-[#0891B2] dark:text-[#22D3EE]">
								<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
							</div>
							<div class="flex flex-1 items-center rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 dark:border-[#2A2578] dark:bg-[#0B0A23]/50">
								<span class="text-[7px] font-medium text-[#94A3B8] dark:text-slate-500">H</span>
								<span class="ml-auto text-[8px] font-semibold tabular-nums text-[#0F172A] dark:text-white">720</span>
								<span class="ml-0.5 text-[6px] text-[#CBD5E1] dark:text-slate-600">px</span>
							</div>
						</div>
						<!-- MOCK FORMAT + QUALITY ROW -->
						<div class="mb-3 flex items-center gap-1.5">
							<div class="flex flex-1 items-center rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 dark:border-[#2A2578] dark:bg-[#0B0A23]/50">
								<span class="text-[7px] text-[#94A3B8] dark:text-slate-500">Format</span>
								<span class="ml-auto text-[8px] font-semibold text-[#0F172A] dark:text-white">PNG</span>
							</div>
							<div class="flex flex-1 items-center gap-1 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 dark:border-[#2A2578] dark:bg-[#0B0A23]/50">
								<span class="text-[7px] text-[#94A3B8] dark:text-slate-500">Quality</span>
								<div class="ml-auto h-1 w-10 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
									<div class="h-full w-[85%] rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
								</div>
							</div>
						</div>
						<!-- MOCK RESIZE BUTTON -->
						<div class="flex items-center justify-center gap-1.5 rounded-lg bg-[#0891B2] py-1.5 dark:bg-[#22D3EE]">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white dark:text-[#0B0A23]"><polygon points="5 3 19 12 5 21 5 3"/></svg>
							<span class="text-[9px] font-semibold text-white dark:text-[#0B0A23]">Resize</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<script lang="ts">
	// IMPORTED DEP-MODULES
	import { ImageIcon, ArrowRight, Shield, Layers, Crop, Target, Pipette, Eye, Palette, Volume2, SlidersHorizontal, Music, Code, WandSparkles, Smartphone } from 'lucide-svelte';
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
				Free tools for designers and developers
			</h2>
			<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
				Image processing, code editing, color picking, and more — all free, all private. No uploads, no accounts.
			</p>
		</div>

		<!-- TOOL CARDS GRID -->
		<div class="grid gap-6 sm:grid-cols-2">
			<!-- IMAGE RESIZER CARD -->
			<div use:reveal={{ delay: 100 }} class="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-[#2A2578]/60 dark:from-[#1E1A5E]/30 dark:to-[#0B0A23] dark:shadow-none dark:hover:shadow-none">
				<div class="flex flex-col gap-6 p-6 sm:p-8">
					<!-- BADGES -->
					<div class="flex items-center gap-2">
						<span class="rounded-full bg-[#2DD4BF]/10 px-3 py-1 text-xs font-semibold text-[#2DD4BF]">
							Live
						</span>
						<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
							Utilities
						</span>
					</div>

					<h3 class="font-display text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
						Image Resizer
					</h3>

					<p class="text-sm text-[#475569] dark:text-slate-300">
						Drag, drop, resize. Crop to any region, batch-process dozens at once, export as PNG, JPEG, or WebP.
					</p>

					<!-- UI MINIATURE -->
					<div class="rounded-xl border border-[#E2E8F0] bg-white p-3.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
						<!-- MOCK IMAGE PREVIEW -->
						<div class="mb-3 flex h-20 items-center justify-center rounded-lg bg-[#F1F5F9] dark:bg-[#0B0A23]/50">
							<div class="flex items-center gap-3">
								<div class="flex h-14 w-18 items-center justify-center rounded border border-dashed border-[#CBD5E1] dark:border-slate-600">
									<ImageIcon size={14} class="text-[#CBD5E1] dark:text-slate-600" />
								</div>
								<svg width="16" height="10" viewBox="0 0 20 12" fill="none" class="text-[#0891B2] dark:text-[#22D3EE]">
									<path d="M1 6h14M12 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								<div class="flex h-10 w-14 items-center justify-center rounded border border-[#0891B2]/30 bg-[#0891B2]/5 dark:border-[#22D3EE]/30 dark:bg-[#22D3EE]/5">
									<ImageIcon size={10} class="text-[#0891B2] dark:text-[#22D3EE]" />
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
							<div class="flex h-4 w-4 items-center justify-center text-[#0891B2] dark:text-[#22D3EE]">
								<svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
							</div>
							<div class="flex flex-1 items-center rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 dark:border-[#2A2578] dark:bg-[#0B0A23]/50">
								<span class="text-[7px] font-medium text-[#94A3B8] dark:text-slate-500">H</span>
								<span class="ml-auto text-[8px] font-semibold tabular-nums text-[#0F172A] dark:text-white">720</span>
								<span class="ml-0.5 text-[6px] text-[#CBD5E1] dark:text-slate-600">px</span>
							</div>
						</div>
						<!-- MOCK RESIZE BUTTON -->
						<div class="flex items-center justify-center gap-1.5 rounded-lg bg-[#0891B2] py-1.5 dark:bg-[#22D3EE]">
							<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white dark:text-[#0B0A23]"><polygon points="5 3 19 12 5 21 5 3"/></svg>
							<span class="text-[8px] font-semibold text-white dark:text-[#0B0A23]">Resize</span>
						</div>
					</div>

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
					</div>

					<!-- CTA -->
					<Button href="/products/image-resizer/" variant="primary" class="w-full">
						Open Image Resizer
					</Button>
				</div>
			</div>

			<!-- IMAGE COMPRESSOR CARD -->
			<div use:reveal={{ delay: 200 }} class="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-[#2A2578]/60 dark:from-[#1E1A5E]/30 dark:to-[#0B0A23] dark:shadow-none dark:hover:shadow-none">
				<div class="flex flex-col gap-6 p-6 sm:p-8">
					<!-- BADGES -->
					<div class="flex items-center gap-2">
						<span class="rounded-full bg-[#2DD4BF]/10 px-3 py-1 text-xs font-semibold text-[#2DD4BF]">
							Live
						</span>
						<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
							Utilities
						</span>
					</div>

					<h3 class="font-display text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
						Image Compressor
					</h3>

					<p class="text-sm text-[#475569] dark:text-slate-300">
						Shrink PNG, JPEG, and WebP images up to 90% smaller. Batch-process dozens at once, with before/after preview.
					</p>

					<!-- UI MINIATURE -->
					<div class="rounded-xl border border-[#E2E8F0] bg-white p-3.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
						<!-- MOCK COMPARE SLIDER -->
						<div class="relative mb-3 flex h-20 items-center justify-center overflow-hidden rounded-lg bg-[#F1F5F9] dark:bg-[#0B0A23]/50">
							<!-- LANDSCAPE SVG -->
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" class="absolute h-full w-full">
								<rect width="200" height="80" fill="#87CEEB" class="dark:fill-[#1a1a3e]" />
								<circle cx="160" cy="18" r="10" fill="#FFD700" opacity="0.8" class="dark:fill-[#F59E0B]" />
								<polygon points="0,50 30,28 60,45 85,22 120,40 150,30 200,48 200,80 0,80" fill="#6B8E6B" class="dark:fill-[#2d4a2d]" />
								<polygon points="0,60 40,38 80,52 110,35 200,55 200,80 0,80" fill="#4A7A4A" class="dark:fill-[#1e3a1e]" />
							</svg>
							<!-- SLIDER LINE -->
							<div class="absolute top-0 bottom-0 left-1/2 w-px bg-white shadow-[0_0_4px_rgba(0,0,0,0.3)]" />
							<!-- SLIDER HANDLE -->
							<div class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white p-1 shadow">
								<svg width="6" height="6" viewBox="0 0 24 24" fill="none" class="text-[#64748B]">
									<circle cx="9" cy="5" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="19" r="1" fill="currentColor"/>
									<circle cx="15" cy="5" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="19" r="1" fill="currentColor"/>
								</svg>
							</div>
							<!-- LABELS -->
							<div class="absolute bottom-1 left-1.5 z-10 rounded bg-black/50 px-1.5 py-0.5 text-[6px] font-medium text-white">
								Original · 1.3 MB
							</div>
							<div class="absolute bottom-1 right-1.5 z-10 rounded bg-[#0891B2]/70 px-1.5 py-0.5 text-[6px] font-medium text-white dark:bg-[#22D3EE]/70 dark:text-[#0B0A23]">
								320 KB · 75%
							</div>
						</div>
						<!-- MOCK QUALITY SLIDER -->
						<div class="mb-2">
							<div class="mb-1 flex items-center justify-between">
								<span class="text-[7px] font-medium text-[#94A3B8] dark:text-slate-500">QUALITY</span>
								<span class="text-[7px] font-semibold tabular-nums text-[#0891B2] dark:text-[#22D3EE]">80</span>
							</div>
							<div class="h-1 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
								<div class="h-full w-[80%] rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
							</div>
						</div>
						<!-- MOCK COMPRESS BUTTON -->
						<div class="flex items-center justify-center gap-1.5 rounded-lg bg-[#0891B2] py-1.5 dark:bg-[#22D3EE]">
							<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white dark:text-[#0B0A23]"><polygon points="5 3 19 12 5 21 5 3"/></svg>
							<span class="text-[8px] font-semibold text-white dark:text-[#0B0A23]">Compress</span>
						</div>
					</div>

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
							<Target size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
							Target Size
						</span>
					</div>

					<!-- CTA -->
					<Button href="/products/image-compressor/" variant="primary" class="w-full">
						Open Image Compressor
					</Button>
				</div>
			</div>

			<!-- COLOR PICKER CARD -->
			<div use:reveal={{ delay: 300 }} class="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-[#2A2578]/60 dark:from-[#1E1A5E]/30 dark:to-[#0B0A23] dark:shadow-none dark:hover:shadow-none">
				<div class="flex h-full flex-col gap-6 p-6 sm:p-8">
					<!-- BADGES -->
					<div class="flex items-center gap-2">
						<span class="rounded-full bg-[#2DD4BF]/10 px-3 py-1 text-xs font-semibold text-[#2DD4BF]">
							Live
						</span>
						<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
							Chrome Extension
						</span>
					</div>

					<h3 class="font-display text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
						Color Picker
					</h3>

					<p class="text-sm text-[#475569] dark:text-slate-300">
						Pick any color, check WCAG contrast, simulate color blindness — without giving an extension access to your browsing data.
					</p>

					<!-- UI MINIATURE -->
					<div class="rounded-xl border border-[#E2E8F0] bg-white p-3.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
						<!-- MOCK COLOR SWATCH + HEX -->
						<div class="mb-2 flex items-center gap-3">
							<div class="h-12 w-12 rounded-lg bg-[#22D3EE]" />
							<div>
								<div class="font-mono text-sm font-bold text-[#0F172A] dark:text-white">#22D3EE</div>
								<div class="font-mono text-[7px] text-[#94A3B8] dark:text-slate-500">rgb(34, 211, 238)</div>
							</div>
						</div>
						<!-- MOCK FORMAT ROWS -->
						<div class="mb-2.5 space-y-1">
							<div class="flex items-center rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 dark:border-[#2A2578] dark:bg-[#0B0A23]/50">
								<span class="w-5 text-[7px] font-medium text-[#94A3B8] dark:text-slate-500">HEX</span>
								<span class="flex-1 text-left text-[8px] font-semibold text-[#0F172A] dark:text-white">#22D3EE</span>
								<svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0 text-[#CBD5E1] dark:text-slate-600"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
							</div>
							<div class="flex items-center rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 dark:border-[#2A2578] dark:bg-[#0B0A23]/50">
								<span class="w-5 text-[7px] font-medium text-[#94A3B8] dark:text-slate-500">HSL</span>
								<span class="flex-1 text-left text-[8px] font-semibold text-[#0F172A] dark:text-white">hsl(188, 82%, 53%)</span>
								<svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0 text-[#CBD5E1] dark:text-slate-600"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
							</div>
						</div>
						<!-- MOCK PICK BUTTON -->
						<div class="flex items-center justify-center gap-1.5 rounded-lg bg-[#0891B2] py-1.5 dark:bg-[#22D3EE]">
							<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white dark:text-[#0B0A23]"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/></svg>
							<span class="text-[8px] font-semibold text-white dark:text-[#0B0A23]">Pick Color</span>
						</div>
					</div>

					<!-- FEATURE PILLS -->
					<div class="flex flex-wrap gap-2">
						<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
							<Eye size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
							Contrast Checker
						</span>
						<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
							<Palette size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
							Harmonies
						</span>
						<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
							<Shield size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
							Minimal Permissions
						</span>
					</div>

					<!-- CTA — mt-auto PUSHES TO BOTTOM TO MATCH OTHER CARDS -->
					<Button href="/products/color-picker/" variant="primary" class="mt-auto w-full">
						Explore Color Picker
					</Button>
				</div>
			</div>

			<!-- SOUND BOOSTER CARD -->
			<div use:reveal={{ delay: 400 }} class="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-[#2A2578]/60 dark:from-[#1E1A5E]/30 dark:to-[#0B0A23] dark:shadow-none dark:hover:shadow-none">
				<div class="flex h-full flex-col gap-6 p-6 sm:p-8">
					<!-- BADGES -->
					<div class="flex items-center gap-2">
						<span class="rounded-full bg-[#2DD4BF]/10 px-3 py-1 text-xs font-semibold text-[#2DD4BF]">
							Live
						</span>
						<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
							Chrome Extension
						</span>
					</div>

					<h3 class="font-display text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
						Sound Booster
					</h3>

					<p class="text-sm text-[#475569] dark:text-slate-300">
						Boost audio beyond 100% with a 5-band equalizer, presets, and keyboard shortcuts — without broad page permissions.
					</p>

					<!-- UI MINIATURE -->
					<div class="flex h-[168px] flex-col rounded-xl border border-[#E2E8F0] bg-white p-3.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
						<!-- VOLUME -->
						<div class="mb-1.5 text-center font-mono text-xl font-bold text-[#0891B2] dark:text-[#22D3EE]">200%</div>
						<!-- PEAK METER -->
						<div class="mb-1.5 h-1 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
							<div class="h-full w-3/5 rounded-full" style="background: linear-gradient(to right, #4ADE80, #FBBF24);"></div>
						</div>
						<!-- SLIDER WITH THUMB -->
						<div class="relative mb-2 flex items-center">
							<div class="h-1.5 w-full rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
								<div class="h-full w-1/3 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]"></div>
							</div>
							<div class="absolute left-[calc(33%-4px)] h-3 w-3 rounded-full border-[1.5px] border-white bg-[#0891B2] shadow-sm dark:border-[#0B0A23] dark:bg-[#22D3EE]"></div>
						</div>
						<!-- BUTTONS -->
						<div class="mb-2 flex gap-1">
							<div class="flex-1 rounded border border-[#E2E8F0] py-0.5 text-center text-[7px] text-[#475569] dark:border-[#2A2578] dark:text-slate-400">Mute</div>
							<div class="flex-1 rounded border border-[#E2E8F0] py-0.5 text-center text-[7px] text-[#475569] dark:border-[#2A2578] dark:text-slate-400">Reset 100%</div>
						</div>
						<!-- EQ VERTICAL SLIDERS -->
						<div class="flex flex-1 items-stretch rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1.5 dark:border-[#2A2578] dark:bg-[#0B0A23]/40">
							<div class="flex flex-1 items-stretch justify-evenly">
								{#each [20, 33, 50, 50, 50] as thumbPos}
									<div class="relative w-2 flex-1">
										<div class="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#CBD5E1] dark:bg-[#2A2578]"></div>
										<div class="absolute left-1/2 -translate-x-1/2 h-[5px] w-[5px] rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" style="top: {thumbPos}%;"></div>
									</div>
								{/each}
							</div>
						</div>
					</div>

					<!-- FEATURE PILLS -->
					<div class="flex flex-wrap gap-2">
						<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
							<Volume2 size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
							Up to 600%
						</span>
						<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
							<SlidersHorizontal size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
							5-Band EQ
						</span>
						<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
							<Shield size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
							Minimal Permissions
						</span>
					</div>

					<!-- CTA -->
					<Button href="/products/sound-booster/" variant="primary" class="mt-auto w-full">
						Explore Sound Booster
					</Button>
				</div>
			</div>
			<!-- HTML EDITOR CARD (FULL WIDTH) -->
			<div use:reveal={{ delay: 500 }} class="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:col-span-2 dark:border-[#2A2578]/60 dark:from-[#1E1A5E]/30 dark:to-[#0B0A23] dark:shadow-none dark:hover:shadow-none">
				<div class="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
					<!-- TEXT SIDE -->
					<div class="flex flex-1 flex-col gap-4">
						<!-- BADGES -->
						<div class="flex items-center gap-2">
							<span class="rounded-full bg-[#2DD4BF]/10 px-3 py-1 text-xs font-semibold text-[#2DD4BF]">
								New
							</span>
							<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
								Utilities
							</span>
						</div>

						<h3 class="font-display text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
							HTML Editor
						</h3>

						<p class="text-sm text-[#475569] dark:text-slate-300">
							Write HTML, CSS, and JavaScript with live preview, Prettier formatting, and inline error detection. No signup, no server.
						</p>

						<!-- FEATURE PILLS -->
						<div class="flex flex-wrap gap-2">
							<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
								<Shield size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
								100% Local
							</span>
							<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
								<WandSparkles size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
								Prettier
							</span>
							<span class="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">
								<Smartphone size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
								Device Preview
							</span>
						</div>

						<!-- CTA -->
						<Button href="/products/html-editor/" variant="primary" class="w-full sm:w-auto">
							Open HTML Editor
						</Button>
					</div>

					<!-- UI MINIATURE -->
					<div class="w-full shrink-0 sm:w-[280px]">
						<div class="rounded-xl border border-[#E2E8F0] bg-white dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
							<!-- MOCK TAB BAR -->
							<div class="flex items-center border-b border-[#E2E8F0] px-2 py-1.5 dark:border-[#2A2578]">
								<div class="flex items-center gap-1 border-b-2 border-[#0891B2] px-2 py-0.5 text-[7px] font-medium text-[#0891B2] dark:border-[#22D3EE] dark:text-[#22D3EE]">
									<Code size={8} />
									HTML
								</div>
								<div class="px-2 py-0.5 text-[7px] text-[#94A3B8] dark:text-slate-600">CSS</div>
								<div class="px-2 py-0.5 text-[7px] text-[#94A3B8] dark:text-slate-600">JS</div>
							</div>
							<!-- MOCK SPLIT EDITOR + PREVIEW -->
							<div class="flex">
								<!-- CODE SIDE -->
								<div class="flex-1 border-r border-[#E2E8F0] bg-[#0B0A23] p-2 font-mono text-[7px] leading-relaxed dark:border-[#2A2578]">
									<div class="flex gap-1.5">
										<div class="select-none text-[#475569]">
											<div>1</div><div>2</div><div>3</div>
										</div>
										<div>
											<div><span class="text-[#f07178]">&lt;h1&gt;</span><span class="text-[#e2e8f0]">Hello</span><span class="text-[#f07178]">&lt;/h1&gt;</span></div>
											<div><span class="text-[#f07178]">&lt;p&gt;</span></div>
											<div>&nbsp;&nbsp;<span class="text-[#e2e8f0]">World</span></div>
										</div>
									</div>
								</div>
								<!-- PREVIEW SIDE -->
								<div class="flex-1 p-2">
									<div class="text-[8px] font-bold text-[#0891B2]">Hello</div>
									<div class="mt-0.5 text-[6px] text-[#475569]">World</div>
								</div>
							</div>
							<!-- MOCK CONSOLE -->
							<div class="flex items-center gap-1.5 border-t border-[#E2E8F0] px-2 py-1 dark:border-[#2A2578]">
								<span class="text-[6px] font-medium text-[#64748b] dark:text-slate-500">Console</span>
								<div class="flex-1" />
								<span class="text-[5px] text-[#94A3B8] dark:text-slate-600">&#9654; Hello</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- ALL PRODUCTS LINK -->
		<div use:reveal={{ delay: 300 }} class="mt-8 flex justify-center">
			<a
				href="/products/"
				class="flex items-center gap-1.5 text-sm text-[#64748B] transition-colors hover:text-[#0891B2] dark:text-slate-400 dark:hover:text-[#22D3EE]"
			>
				View all products
				<ArrowRight size={14} />
			</a>
		</div>
	</div>
</section>

<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
</script>

<!-- INTRO -->
<section use:reveal>
	<p class="text-lg leading-relaxed text-[#475569] dark:text-slate-300">
		Arbenger Image Resizer is a free, browser-based tool that lets you resize, crop, and convert images without
		uploading them to any server. Every pixel stays on your machine. This guide walks you through every feature —
		from your first resize to batch-processing dozens of images at once.
	</p>

	<!-- PRIVACY CALLOUT -->
	<div
		class="mt-8 flex items-start gap-4 rounded-xl border border-[#0891B2]/20 bg-[#0891B2]/5 p-5 dark:border-[#22D3EE]/20 dark:bg-[#22D3EE]/5"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="mt-0.5 h-5 w-5 shrink-0 text-[#0891B2] dark:text-[#22D3EE]"
		>
			<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
		</svg>
		<div>
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">100% Private</p>
			<p class="mt-1 text-sm text-[#475569] dark:text-slate-400">
				Your images never leave your browser. All processing happens locally using your device's Canvas API and Web
				Workers. No uploads, no servers, no tracking.
			</p>
		</div>
	</div>
</section>

<!-- TABLE OF CONTENTS -->
<section use:reveal class="mt-12">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">What You'll Learn</h2>
	<nav class="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<ol class="space-y-2 text-sm">
			<li>
				<a href="#uploading" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">1. Uploading Images</a>
			</li>
			<li>
				<a href="#resizing" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">2. Resizing an Image</a>
			</li>
			<li>
				<a href="#cropping" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">3. Cropping</a>
			</li>
			<li>
				<a href="#formats" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">4. Format Conversion</a>
			</li>
			<li>
				<a href="#fit-modes" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">5. Fit Modes Explained</a>
			</li>
			<li>
				<a href="#batch" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">6. Batch Processing</a>
			</li>
			<li>
				<a href="#presets" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">7. Presets & Shortcuts</a>
			</li>
			<li>
				<a href="#tips" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">8. Pro Tips</a>
			</li>
		</ol>
	</nav>
</section>

<!-- SECTION 1: UPLOADING -->
<section use:reveal class="mt-16" id="uploading">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">1. Uploading Images</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		There are three ways to get images into the resizer:
	</p>

	<!-- UPLOAD METHODS DIAGRAM -->
	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<!-- DRAG & DROP (MINI UploadZone — DASHED BORDER HIGHLIGHTED) -->
		<div class="flex flex-col items-center rounded-xl border border-[#E2E8F0] p-4 text-center dark:border-[#2A2578]">
			<div class="mb-3 flex h-[88px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#0891B2] bg-[#0891B2]/5 dark:border-[#22D3EE] dark:bg-[#22D3EE]/5">
				<div class="rounded-xl bg-[#E2E8F0] p-2 dark:bg-[#2A2578]/50">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-[#0891B2] dark:text-[#22D3EE]">
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="17 8 12 3 7 8" />
						<line x1="12" x2="12" y1="3" y2="15" />
					</svg>
				</div>
				<p class="text-[9px] font-medium text-[#0F172A] dark:text-white">Drop images here</p>
			</div>
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Drag & Drop</p>
			<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">Drop files directly onto the upload zone</p>
		</div>

		<!-- CLICK TO BROWSE (MINI UploadZone — BROWSE BUTTON HIGHLIGHTED) -->
		<div class="flex flex-col items-center rounded-xl border border-[#E2E8F0] p-4 text-center dark:border-[#2A2578]">
			<div class="mb-3 flex h-[88px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30">
				<p class="text-[9px] text-[#94A3B8] dark:text-slate-500">Drop images here, paste, or</p>
				<div class="rounded-lg bg-[#0891B2] px-4 py-1.5 text-[10px] font-medium text-white shadow-sm dark:bg-[#22D3EE] dark:text-[#0B0A23]">
					Browse Files
				</div>
				<p class="text-[8px] text-[#94A3B8] dark:text-slate-500">PNG, JPG, WebP</p>
			</div>
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Click to Browse</p>
			<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">Click the zone to open your file picker</p>
		</div>

		<!-- CLIPBOARD PASTE (MINI UploadZone — KEYBOARD SHORTCUT) -->
		<div class="flex flex-col items-center rounded-xl border border-[#E2E8F0] p-4 text-center dark:border-[#2A2578]">
			<div class="mb-3 flex h-[88px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30">
				<div class="flex items-center gap-1.5">
					<kbd class="rounded-md border border-[#CBD5E1] bg-white px-2 py-1 font-mono text-[11px] font-medium text-[#334155] shadow-sm dark:border-[#2A2578] dark:bg-[#0B0A23] dark:text-slate-300">Ctrl</kbd>
					<span class="text-[10px] text-[#94A3B8] dark:text-slate-500">+</span>
					<kbd class="rounded-md border border-[#CBD5E1] bg-white px-2 py-1 font-mono text-[11px] font-medium text-[#334155] shadow-sm dark:border-[#2A2578] dark:bg-[#0B0A23] dark:text-slate-300">V</kbd>
				</div>
				<p class="text-[9px] text-[#94A3B8] dark:text-slate-500">Paste from clipboard</p>
			</div>
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Clipboard Paste</p>
			<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">Press Ctrl+V to paste from clipboard</p>
		</div>
	</div>

	<!-- SUPPORTED FORMATS -->
	<div class="mt-8 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Supported Input Formats</p>
		<div class="mt-3 flex flex-wrap gap-2">
			{#each ['PNG', 'JPEG', 'WebP'] as fmt}
				<span class="rounded-lg bg-white px-3 py-1.5 font-mono text-xs text-[#0F172A] shadow-sm dark:bg-[#2A2578]/50 dark:text-white">
					{fmt}
				</span>
			{/each}
		</div>
		<p class="mt-3 text-xs text-[#94A3B8] dark:text-slate-500">
			Files up to 50 MB are supported. Larger files trigger a warning but will still be processed.
		</p>
	</div>
</section>

<!-- SECTION 2: RESIZING -->
<section use:reveal class="mt-16" id="resizing">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">2. Resizing an Image</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		After uploading, you'll see the preview on the left and the controls panel on the right. Here's the resize workflow:
	</p>

	<!-- WORKFLOW STEPS -->
	<div class="mt-8 space-y-6">
		<!-- STEP 1 -->
		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
				1
			</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Set Your Dimensions</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					Enter width and height in pixels. The aspect ratio lock is on by default — changing one dimension
					automatically adjusts the other to maintain proportions.
				</p>
			</div>
		</div>

		<!-- STEP 2 -->
		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
				2
			</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Choose Output Format</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					Select PNG (lossless), JPEG (smaller files), or WebP (best compression). For JPEG and WebP, use the
					quality slider to balance size vs. quality.
				</p>
			</div>
		</div>

		<!-- STEP 3 -->
		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
				3
			</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Click Resize</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					When your browser supports it, the image is processed in a Web Worker off the main thread, so the UI stays smooth. You'll see the
					result preview instantly with file size comparison.
				</p>
			</div>
		</div>

		<!-- STEP 4 -->
		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
				4
			</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Download</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					Hit the download button to save your resized image. The filename is editable — change it before
					downloading if needed.
				</p>
			</div>
		</div>
	</div>

	<!-- UI MOCKUP: CONTROLS PANEL -->
	<div class="mt-10 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">RESIZE CONTROLS</p>
		</div>
		<div class="space-y-4 p-5">
			<!-- DIMENSIONS ROW MOCKUP -->
			<div class="flex items-center gap-3">
				<div class="flex-1">
					<p class="mb-1 text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">WIDTH</p>
					<div class="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 font-mono text-sm text-[#0F172A] dark:border-[#2A2578] dark:bg-[#0B0A23] dark:text-white">
						1920
					</div>
				</div>
				<!-- ASPECT RATIO LINK ICON (MATCHES LUCIDE Link ICON USED IN ACTUAL UI) -->
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-4 h-4 w-4 text-[#0891B2] dark:text-[#22D3EE]">
					<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
					<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
				</svg>
				<div class="flex-1">
					<p class="mb-1 text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">HEIGHT</p>
					<div class="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 font-mono text-sm text-[#0F172A] dark:border-[#2A2578] dark:bg-[#0B0A23] dark:text-white">
						1080
					</div>
				</div>
				<!-- SWAP DIMENSIONS ICON (MATCHES LUCIDE ArrowLeftRight ICON USED IN ACTUAL UI) -->
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-4 h-4 w-4 text-[#CBD5E1] dark:text-slate-600">
					<path d="M8 3 4 7l4 4" />
					<path d="M4 7h16" />
					<path d="m16 21 4-4-4-4" />
					<path d="M20 17H4" />
				</svg>
			</div>

			<!-- FORMAT ROW MOCKUP -->
			<div>
				<p class="mb-1 text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">FORMAT</p>
				<div class="flex gap-2">
					{#each ['PNG', 'JPEG', 'WebP'] as f}
						<span
							class="rounded-lg px-3 py-1.5 font-mono text-xs {f === 'PNG'
								? 'bg-[#0891B2] text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]'
								: 'border border-[#E2E8F0] text-[#64748B] dark:border-[#2A2578] dark:text-slate-400'}"
						>
							{f}
						</span>
					{/each}
				</div>
			</div>

			<!-- QUALITY SLIDER MOCKUP -->
			<div>
				<div class="mb-1 flex items-center justify-between">
					<p class="text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">QUALITY</p>
					<p class="font-mono text-[10px] text-[#0891B2] dark:text-[#22D3EE]">85%</p>
				</div>
				<div class="h-1.5 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
					<div class="h-full w-[85%] rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				</div>
			</div>
		</div>
	</div>
</section>

<!-- SECTION 3: CROPPING -->
<section use:reveal class="mt-16" id="cropping">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">3. Cropping</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Click the <strong class="text-[#0F172A] dark:text-white">Crop</strong> button in the top-right corner of the preview to open the crop dialog.
		Drag the handles to select your region, then click Apply. The crop is applied before resizing.
	</p>

	<!-- CROP DIALOG MOCKUP (MATCHES ACTUAL CropDialog.svelte UI) -->
	<div class="mt-8 overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-xl dark:border-[#2A2578]">
		<!-- DIALOG HEADER -->
		<div class="flex items-center justify-between border-b border-[#E2E8F0] bg-white px-4 py-2.5 dark:border-white/10 dark:bg-[#161446]">
			<div class="flex items-center gap-2.5">
				<div class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/15">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-[#0891B2] dark:text-[#22D3EE]">
						<path d="M6 2v14a2 2 0 0 0 2 2h14" /><path d="M18 22V8a2 2 0 0 0-2-2H2" />
					</svg>
				</div>
				<div>
					<p class="text-sm font-semibold text-[#0F172A] dark:text-white">Crop Image</p>
					<p class="text-[11px] text-[#94A3B8] dark:text-slate-400">photo-example.jpg</p>
				</div>
			</div>
			<div class="flex items-center gap-1">
				<div class="rounded-lg p-1.5 text-[#94A3B8] dark:text-slate-400">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
						<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
					</svg>
				</div>
				<div class="rounded-lg p-1.5 text-[#94A3B8] dark:text-slate-400">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
						<path d="M18 6 6 18" /><path d="m6 6 12 12" />
					</svg>
				</div>
			</div>
		</div>

		<!-- CANVAS AREA -->
		<div class="relative flex items-center justify-center overflow-hidden bg-[#F1F5F9] dark:bg-[#0B0A23]" style="height: 220px;">
			<!-- SAMPLE IMAGE (SVG LANDSCAPE SCENE) -->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" class="absolute rounded border border-[#CBD5E1] dark:border-white/10" style="width: 280px; height: 180px;">
				<!-- SKY -->
				<rect width="280" height="180" fill="#87CEEB" class="dark:fill-[#1a1a3e]" />
				<!-- SUN -->
				<circle cx="220" cy="40" r="22" fill="#FFD700" opacity="0.9" class="dark:fill-[#F59E0B]" />
				<!-- MOUNTAINS -->
				<polygon points="0,120 50,60 100,100 140,50 200,90 240,65 280,110 280,180 0,180" fill="#6B8E6B" class="dark:fill-[#2d4a2d]" />
				<polygon points="0,140 70,80 130,120 180,75 280,130 280,180 0,180" fill="#4A7A4A" class="dark:fill-[#1e3a1e]" />
				<!-- GROUND -->
				<rect y="145" width="280" height="35" fill="#3D6B3D" class="dark:fill-[#163016]" />
				<!-- CLOUDS -->
				<ellipse cx="70" cy="35" rx="28" ry="10" fill="white" opacity="0.7" class="dark:fill-white/20" />
				<ellipse cx="150" cy="25" rx="22" ry="8" fill="white" opacity="0.5" class="dark:fill-white/15" />
			</svg>

			<!-- CROP FRAME — box-shadow CREATES DARK OVERLAY OUTSIDE (SAME TECHNIQUE AS REAL CropDialog) -->
			<div class="absolute border border-white/80" style="width: 220px; height: 140px; box-shadow: 0 0 0 9999px rgba(0,0,0,0.55);">
				<!-- RULE OF THIRDS GRID -->
				<div class="absolute left-1/3 h-full w-px bg-white/20" />
				<div class="absolute left-2/3 h-full w-px bg-white/20" />
				<div class="absolute top-1/3 h-px w-full bg-white/20" />
				<div class="absolute top-2/3 h-px w-full bg-white/20" />

				<!-- CENTER CROSSHAIR -->
				<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
					<div class="absolute left-1/2 -translate-x-px bg-white/50" style="width: 2px; height: 14px; top: -7px;" />
					<div class="absolute top-1/2 -translate-y-px bg-white/50" style="height: 2px; width: 14px; left: -7px;" />
				</div>

				<!-- 8 ROUND HANDLES (CYAN FILL + WHITE BORDER) -->
				<!-- CORNERS -->
				<div class="absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-full border-2 border-white bg-[#0891B2] shadow dark:bg-[#22D3EE]" />
				<div class="absolute -right-[5px] -top-[5px] h-[10px] w-[10px] rounded-full border-2 border-white bg-[#0891B2] shadow dark:bg-[#22D3EE]" />
				<div class="absolute -bottom-[5px] -left-[5px] h-[10px] w-[10px] rounded-full border-2 border-white bg-[#0891B2] shadow dark:bg-[#22D3EE]" />
				<div class="absolute -bottom-[5px] -right-[5px] h-[10px] w-[10px] rounded-full border-2 border-white bg-[#0891B2] shadow dark:bg-[#22D3EE]" />
				<!-- EDGES -->
				<div class="absolute -top-[5px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-full border-2 border-white bg-[#0891B2] shadow dark:bg-[#22D3EE]" />
				<div class="absolute -bottom-[5px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-full border-2 border-white bg-[#0891B2] shadow dark:bg-[#22D3EE]" />
				<div class="absolute -left-[5px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full border-2 border-white bg-[#0891B2] shadow dark:bg-[#22D3EE]" />
				<div class="absolute -right-[5px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full border-2 border-white bg-[#0891B2] shadow dark:bg-[#22D3EE]" />
			</div>
		</div>

		<!-- DIALOG FOOTER -->
		<div class="flex items-center justify-between border-t border-[#E2E8F0] bg-white px-4 py-2.5 dark:border-white/10 dark:bg-[#161446]">
			<div class="flex items-center gap-3 text-[11px]">
				<span class="font-mono text-[#334155] dark:text-slate-200">1200x800</span>
				<span class="text-[#CBD5E1] dark:text-slate-600">at</span>
				<span class="font-mono text-[#334155] dark:text-slate-200">120,40</span>
				<span class="rounded-full bg-[#0891B2]/10 px-2 py-0.5 text-[10px] font-medium text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]">Cropped</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs font-medium text-[#64748B] dark:border-[#2A2578] dark:text-slate-400">Cancel</span>
				<span class="flex items-center gap-1.5 rounded-lg bg-[#0891B2] px-3 py-1.5 text-xs font-semibold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3">
						<polyline points="20 6 9 17 4 12" />
					</svg>
					Apply
				</span>
			</div>
		</div>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		The crop dialog provides 8 round handles (corners + edges), a rule-of-thirds grid, and a center crosshair. Drag
		the handles to resize, or drag the crop area to reposition. Minimum crop size is 40px per side.
	</p>
</section>

<!-- SECTION 4: FORMAT CONVERSION -->
<section use:reveal class="mt-16" id="formats">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">4. Format Conversion</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Choose your output format based on your needs. Here's when to use each:
	</p>

	<!-- FORMAT COMPARISON TABLE -->
	<div class="mt-6 overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<table class="w-full min-w-[480px] text-left text-sm">
			<thead>
				<tr class="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Format</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Best For</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Quality</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Transparency</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#F1F5F9] dark:divide-[#2A2578]/40">
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">PNG</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Screenshots, logos, graphics</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Lossless</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Yes</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">JPEG</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Photos, complex imagery</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Adjustable (1-100)</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">No</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">WebP</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Web use, best compression</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Adjustable (1-100)</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Yes</td>
				</tr>
			</tbody>
		</table>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		When converting to JPEG, transparent areas are filled with the background color you set in the controls.
	</p>
</section>

<!-- SECTION 5: FIT MODES -->
<section use:reveal class="mt-16" id="fit-modes">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">5. Fit Modes Explained</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		When the target dimensions have a different aspect ratio than the original, fit modes determine how the image fills
		the space:
	</p>

	<!-- FIT MODE DIAGRAMS -->
	<div class="mt-8 grid gap-6 sm:grid-cols-3">
		<!-- STRETCH -->
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" class="mb-4 w-full">
				<rect x="5" y="5" width="150" height="110" rx="4" fill="#F1F5F9" class="dark:fill-[#1E1A5E]" />
				<!-- STRETCHED IMAGE FILLS ENTIRE FRAME -->
				<rect x="10" y="10" width="140" height="100" rx="2" fill="#0891B2" opacity="0.2" class="dark:fill-[#22D3EE]" />
				<!-- ARROWS SHOWING STRETCH -->
				<path d="M30 60H72" stroke="#0891B2" stroke-width="1.5" stroke-linecap="round" class="dark:stroke-[#22D3EE]" />
				<path d="M30 57L25 60L30 63" stroke="#0891B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" class="dark:stroke-[#22D3EE]" />
				<path d="M88 60H130" stroke="#0891B2" stroke-width="1.5" stroke-linecap="round" class="dark:stroke-[#22D3EE]" />
				<path d="M130 57L135 60L130 63" stroke="#0891B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" class="dark:stroke-[#22D3EE]" />
				<path d="M80 22V52" stroke="#0891B2" stroke-width="1.5" stroke-linecap="round" class="dark:stroke-[#22D3EE]" />
				<path d="M77 22L80 17L83 22" stroke="#0891B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" class="dark:stroke-[#22D3EE]" />
				<path d="M80 68V98" stroke="#0891B2" stroke-width="1.5" stroke-linecap="round" class="dark:stroke-[#22D3EE]" />
				<path d="M77 98L80 103L83 98" stroke="#0891B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" class="dark:stroke-[#22D3EE]" />
				<!-- LABEL WITH BACKGROUND -->
				<rect x="56" y="53" width="48" height="14" rx="3" fill="#F1F5F9" class="dark:fill-[#1E1A5E]" />
				<text x="80" y="64" text-anchor="middle" fill="#0891B2" font-size="9" font-weight="bold" font-family="monospace" class="dark:fill-[#22D3EE]">FILLS ALL</text>
			</svg>
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Stretch</p>
			<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">
				Distorts the image to fill the exact target size. Fast, but may warp the content.
			</p>
		</div>

		<!-- CONTAIN -->
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" class="mb-4 w-full">
				<rect x="5" y="5" width="150" height="110" rx="4" fill="#F1F5F9" class="dark:fill-[#1E1A5E]" />
				<!-- LETTERBOXED IMAGE -->
				<rect x="30" y="10" width="100" height="100" rx="2" fill="#0891B2" opacity="0.2" class="dark:fill-[#22D3EE]" />
				<!-- BACKGROUND BARS -->
				<rect x="10" y="10" width="18" height="100" rx="1" fill="#94A3B8" opacity="0.15" />
				<rect x="132" y="10" width="18" height="100" rx="1" fill="#94A3B8" opacity="0.15" />
				<text x="80" y="65" text-anchor="middle" fill="#0891B2" font-size="9" font-family="monospace" class="dark:fill-[#22D3EE]">FITS IN</text>
			</svg>
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Contain</p>
			<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">
				Fits the entire image inside the target with no distortion. Empty space is filled with your background color.
			</p>
		</div>

		<!-- COVER -->
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" class="mb-4 w-full">
				<rect x="5" y="5" width="150" height="110" rx="4" fill="#F1F5F9" class="dark:fill-[#1E1A5E]" />
				<!-- IMAGE OVERFLOWS -->
				<rect x="10" y="10" width="140" height="100" rx="2" fill="#0891B2" opacity="0.2" class="dark:fill-[#22D3EE]" />
				<!-- CROP INDICATORS -->
				<line x1="10" y1="10" x2="10" y2="110" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.6" />
				<line x1="150" y1="10" x2="150" y2="110" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.6" />
				<text x="80" y="65" text-anchor="middle" fill="#0891B2" font-size="9" font-family="monospace" class="dark:fill-[#22D3EE]">CROPS</text>
			</svg>
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Cover</p>
			<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">
				Fills the target completely by cropping the image to match the aspect ratio. No empty space.
			</p>
		</div>
	</div>
</section>

<!-- SECTION 6: BATCH PROCESSING -->
<section use:reveal class="mt-16" id="batch">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">6. Batch Processing</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Upload more than one image and the tool automatically switches to batch mode. All images share the same resize
		settings and are exported as a single ZIP file.
	</p>

	<!-- BATCH WORKFLOW — HORIZONTAL ON DESKTOP, VERTICAL TIMELINE ON MOBILE -->
	<div class="mt-8 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">BATCH MODE WORKFLOW</p>
		</div>

		<!-- DESKTOP: HORIZONTAL FLOW (sm+) -->
		<div class="hidden p-6 sm:block">
			<div class="flex items-start justify-between">
				<!-- STEP 1 -->
				<div class="flex flex-1 flex-col items-center text-center">
					<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-[#0891B2] dark:text-[#22D3EE]">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
						</svg>
					</div>
					<p class="mt-2 text-xs font-bold text-[#0F172A] dark:text-white">Upload 2+</p>
					<p class="mt-0.5 text-[10px] text-[#94A3B8] dark:text-slate-500">Drop multiple images</p>
				</div>

				<!-- CONNECTOR -->
				<div class="mt-5 flex flex-1 items-center justify-center">
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-1 h-3.5 w-3.5 shrink-0 text-[#CBD5E1] dark:text-slate-600">
						<path d="m9 18 6-6-6-6" />
					</svg>
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
				</div>

				<!-- STEP 2 -->
				<div class="flex flex-1 flex-col items-center text-center">
					<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-[#0891B2] dark:text-[#22D3EE]">
							<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
						</svg>
					</div>
					<p class="mt-2 text-xs font-bold text-[#0F172A] dark:text-white">Configure</p>
					<p class="mt-0.5 text-[10px] text-[#94A3B8] dark:text-slate-500">Shared resize settings</p>
				</div>

				<!-- CONNECTOR -->
				<div class="mt-5 flex flex-1 items-center justify-center">
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-1 h-3.5 w-3.5 shrink-0 text-[#CBD5E1] dark:text-slate-600">
						<path d="m9 18 6-6-6-6" />
					</svg>
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
				</div>

				<!-- STEP 3 -->
				<div class="flex flex-1 flex-col items-center text-center">
					<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-[#0891B2] dark:text-[#22D3EE]">
							<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
						</svg>
					</div>
					<p class="mt-2 text-xs font-bold text-[#0F172A] dark:text-white">Auto-Name</p>
					<p class="mt-0.5 text-[10px] text-[#94A3B8] dark:text-slate-500">Naming patterns</p>
				</div>

				<!-- CONNECTOR -->
				<div class="mt-5 flex flex-1 items-center justify-center">
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-1 h-3.5 w-3.5 shrink-0 text-[#CBD5E1] dark:text-slate-600">
						<path d="m9 18 6-6-6-6" />
					</svg>
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
				</div>

				<!-- STEP 4 -->
				<div class="flex flex-1 flex-col items-center text-center">
					<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-[#0891B2] dark:text-[#22D3EE]">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
						</svg>
					</div>
					<p class="mt-2 text-xs font-bold text-[#0F172A] dark:text-white">Download ZIP</p>
					<p class="mt-0.5 text-[10px] text-[#94A3B8] dark:text-slate-500">All images in one file</p>
				</div>
			</div>
		</div>

		<!-- MOBILE: STACKED STEPS (below sm) -->
		<div class="space-y-0 sm:hidden">
			{#each [
				{ n: '1', title: 'Upload 2+ images', desc: 'Drop or browse multiple files', icon: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M17 8l-5-5-5 5|M12 3v12' },
				{ n: '2', title: 'Configure settings', desc: 'Shared dimensions, format, quality', icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z|M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' },
				{ n: '3', title: 'Auto-name files', desc: 'Sequential, prefix, or template', icon: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z|M15 5l4 4' },
				{ n: '4', title: 'Download ZIP', desc: 'All images in one file', icon: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M7 10l5 5 5-5|M12 15V3' },
			] as step}
				<div class="flex items-center gap-4 border-b border-[#F1F5F9] px-5 py-4 last:border-b-0 dark:border-[#2A2578]/30">
					<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-xs font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
						{step.n}
					</div>
					<div class="min-w-0 flex-1">
						<p class="text-sm font-bold text-[#0F172A] dark:text-white">{step.title}</p>
						<p class="text-xs text-[#64748B] dark:text-slate-400">{step.desc}</p>
					</div>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 shrink-0 text-[#0891B2]/40 dark:text-[#22D3EE]/30">
						{#each step.icon.split('|') as d}
							<path d={d} />
						{/each}
					</svg>
				</div>
			{/each}
		</div>
	</div>

	<!-- BATCH FEATURES LIST -->
	<div class="mt-8 space-y-4">
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Drag to reorder</strong> — rearrange images by dragging them in the list. Works on mobile with touch.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Per-image crop</strong> — each image can have its own crop region, independent of the shared resize settings.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Auto-naming patterns</strong> — choose from sequential (image-1, image-2), prefix-original, original-suffix, number-only, or custom templates with {'{name}'}, {'{n}'}, {'{w}'}, {'{h}'} tokens.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">ZIP export</strong> — all resized images are packaged into a single ZIP file using JSZip (dynamically loaded, not part of the initial page bundle).
			</p>
		</div>
	</div>
</section>

<!-- SECTION 7: PRESETS -->
<section use:reveal class="mt-16" id="presets">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">7. Presets & Shortcuts</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		The resizer includes dimension presets for common use cases. Select from the presets dropdown to instantly set
		dimensions:
	</p>

	<!-- PRESET GROUPS -->
	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<!-- SOCIAL MEDIA -->
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Social Media</p>
			<ul class="mt-3 space-y-2 text-xs text-[#475569] dark:text-slate-400">
				<li class="flex justify-between">
					<span>Instagram Post</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">1080 x 1080</span>
				</li>
				<li class="flex justify-between">
					<span>Twitter / X</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">1600 x 900</span>
				</li>
				<li class="flex justify-between">
					<span>YouTube Thumbnail</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">1280 x 720</span>
				</li>
				<li class="flex justify-between">
					<span>LinkedIn Post</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">1200 x 627</span>
				</li>
				<li class="flex justify-between">
					<span>Facebook</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">1200 x 630</span>
				</li>
			</ul>
		</div>

		<!-- SCREENS -->
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Screen Sizes</p>
			<ul class="mt-3 space-y-2 text-xs text-[#475569] dark:text-slate-400">
				<li class="flex justify-between">
					<span>HD</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">1280 x 720</span>
				</li>
				<li class="flex justify-between">
					<span>Full HD</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">1920 x 1080</span>
				</li>
				<li class="flex justify-between">
					<span>4K UHD</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">3840 x 2160</span>
				</li>
			</ul>
		</div>

		<!-- APP ICONS -->
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">App Icons</p>
			<ul class="mt-3 space-y-2 text-xs text-[#475569] dark:text-slate-400">
				<li class="flex justify-between">
					<span>Favicon</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">16 x 16</span>
				</li>
				<li class="flex justify-between">
					<span>Small Icon</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">32 x 32</span>
				</li>
				<li class="flex justify-between">
					<span>Icon</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">64 x 64</span>
				</li>
				<li class="flex justify-between">
					<span>Icon</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">128 x 128</span>
				</li>
				<li class="flex justify-between">
					<span>Icon</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">256 x 256</span>
				</li>
				<li class="flex justify-between">
					<span>Large Icon</span>
					<span class="font-mono text-[#0891B2] dark:text-[#22D3EE]">512 x 512</span>
				</li>
			</ul>
		</div>
	</div>

	<!-- SCALE PRESETS -->
	<div class="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Quick Scale</p>
		<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">
			Use scale presets to resize relative to the original dimensions:
		</p>
		<div class="mt-3 flex flex-wrap gap-2">
			{#each ['25%', '50%', '75%', '100%', '125%', '150%', '200%', '300%'] as scale}
				<span class="rounded-lg bg-white px-3 py-1.5 font-mono text-xs text-[#0F172A] shadow-sm dark:bg-[#2A2578]/50 dark:text-white">
					{scale}
				</span>
			{/each}
		</div>
	</div>

	<!-- KEYBOARD SHORTCUTS -->
	<div class="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Keyboard Shortcuts</p>
		<div class="mt-3 space-y-2 text-sm">
			<div class="flex items-center justify-between">
				<span class="text-[#475569] dark:text-slate-300">Paste image from clipboard</span>
				<kbd class="rounded-md bg-white px-2 py-0.5 font-mono text-xs shadow-sm dark:bg-[#2A2578]/50">Ctrl+V</kbd>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-[#475569] dark:text-slate-300">Clear all images</span>
				<kbd class="rounded-md bg-white px-2 py-0.5 font-mono text-xs shadow-sm dark:bg-[#2A2578]/50">Esc</kbd>
			</div>
		</div>
	</div>
</section>

<!-- SECTION 8: PRO TIPS -->
<section use:reveal class="mt-16" id="tips">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">8. Pro Tips</h2>

	<div class="mt-6 space-y-4">
		<!-- TIP 1 -->
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">
				Use WebP for the smallest file sizes
			</p>
			<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
				WebP typically produces files 25-34% smaller than JPEG at equivalent quality, with transparency support.
				It's supported by all modern browsers and is the best choice for web images.
			</p>
		</div>

		<!-- TIP 2 -->
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">
				Crop before resize for the best quality
			</p>
			<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
				The tool applies your crop to the original full-resolution image before resizing. This means you're working
				with the maximum available detail, producing sharper results than cropping after resize.
			</p>
		</div>

		<!-- TIP 3 -->
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">
				Batch + Cover mode for social media assets
			</p>
			<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
				Need to create Instagram posts from landscape photos? Upload them all, set the dimension to 1080x1080 with
				Cover fit mode, and download the ZIP. Every image will be center-cropped to a perfect square.
			</p>
		</div>

		<!-- TIP 4 -->
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">
				Use Contain for consistent padding
			</p>
			<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
				If you need all images to be exactly the same dimensions but don't want to crop, use Contain mode with a
				matching background color. The image is centered with padding on the shorter axis.
			</p>
		</div>

		<!-- TIP 5 -->
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">
				Template naming for organized exports
			</p>
			<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
				In batch mode, use the template naming pattern with tokens like <code class="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-xs dark:bg-[#2A2578]/50">{'{name}'}-{'{w}'}x{'{h}'}</code> to
				include the original filename and target dimensions in every exported file automatically.
			</p>
		</div>
	</div>
</section>

<!-- CTA -->
<section use:reveal class="mt-16">
	<div class="rounded-2xl border border-[#0891B2]/20 bg-[#0891B2]/5 p-8 text-center dark:border-[#22D3EE]/20 dark:bg-[#22D3EE]/5">
		<p class="font-display text-xl font-bold text-[#0F172A] dark:text-white">Ready to resize?</p>
		<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
			Try the Image Resizer now — no signup, no upload, no cost.
		</p>
		<a
			href="/products/image-resizer/"
			class="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0891B2] px-6 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-[#0891B2]/90 dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:hover:bg-[#22D3EE]/90"
		>
			Open Image Resizer
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
				<path d="M5 12h14M12 5l7 7-7 7" />
			</svg>
		</a>
	</div>
</section>

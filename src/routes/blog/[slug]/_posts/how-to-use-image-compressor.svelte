<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
</script>

<!-- INTRO -->
<section use:reveal>
	<p class="text-lg leading-relaxed text-[#475569] dark:text-slate-300">
		Arbenger Image Compressor is a free, browser-based tool that shrinks your PNG, JPEG, and WebP images without
		uploading them to any server. Every pixel stays on your machine. This guide walks you through every feature —
		from compressing a single photo to batch-processing dozens of images at once.
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
				Your images never leave your browser. All compression happens locally using Web Workers and the Canvas API.
				No uploads, no servers, no tracking.
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
				<a href="#compressing" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">2. Compressing an Image</a>
			</li>
			<li>
				<a href="#comparing" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">3. Before & After Comparison</a>
			</li>
			<li>
				<a href="#formats" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">4. Format Conversion</a>
			</li>
			<li>
				<a href="#target-size" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">5. Target Size Mode</a>
			</li>
			<li>
				<a href="#batch" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">6. Batch Processing</a>
			</li>
			<li>
				<a href="#tips" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">7. Pro Tips</a>
			</li>
		</ol>
	</nav>
</section>

<!-- SECTION 1: UPLOADING -->
<section use:reveal class="mt-16" id="uploading">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">1. Uploading Images</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		There are three ways to get images into the compressor:
	</p>

	<!-- UPLOAD METHODS DIAGRAM -->
	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<!-- DRAG & DROP -->
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

		<!-- CLICK TO BROWSE -->
		<div class="flex flex-col items-center rounded-xl border border-[#E2E8F0] p-4 text-center dark:border-[#2A2578]">
			<div class="mb-3 flex h-[88px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30">
				<p class="text-[9px] text-[#94A3B8] dark:text-slate-500">...paste, or</p>
				<div class="rounded-lg bg-[#0891B2] px-4 py-1.5 text-[10px] font-medium text-white shadow-sm dark:bg-[#22D3EE] dark:text-[#0B0A23]">
					Browse Files
				</div>
				<p class="text-[8px] text-[#94A3B8] dark:text-slate-500">PNG, JPG, WebP</p>
			</div>
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Click to Browse</p>
			<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">Click the zone to open your file picker</p>
		</div>

		<!-- CLIPBOARD PASTE -->
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
		<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Supported Formats</p>
		<div class="mt-3 flex flex-wrap gap-2">
			{#each ['PNG', 'JPEG', 'WebP'] as fmt}
				<span class="rounded-lg bg-white px-3 py-1.5 font-mono text-xs text-[#0F172A] shadow-sm dark:bg-[#2A2578]/50 dark:text-white">
					{fmt}
				</span>
			{/each}
		</div>
		<p class="mt-3 text-xs text-[#94A3B8] dark:text-slate-500">
			Upload one image for single mode with before/after comparison, or multiple images for batch mode with ZIP export.
		</p>
	</div>
</section>

<!-- SECTION 2: COMPRESSING -->
<section use:reveal class="mt-16" id="compressing">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">2. Compressing an Image</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		After uploading, you'll see the preview on the left and the controls panel on the right. Here's the compression workflow:
	</p>

	<!-- WORKFLOW STEPS -->
	<div class="mt-8 space-y-6">
		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">1</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Set Quality</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					Use the quality slider (1–100) to control the compression level. Lower values produce smaller files with more visible artifacts. For PNG, quality controls color reduction.
				</p>
			</div>
		</div>

		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">2</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Choose Output Format</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					Keep the original format or convert to JPEG, PNG, or WebP. WebP typically achieves the smallest file sizes.
				</p>
			</div>
		</div>

		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">3</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Click Compress</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					The image is compressed in a Web Worker off the main thread, so the UI stays smooth. You'll see the result with file size comparison instantly.
				</p>
			</div>
		</div>

		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">4</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Download</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					Hit the download button to save your compressed image. The filename is editable — change it before downloading if needed.
				</p>
			</div>
		</div>
	</div>

	<!-- UI MOCKUP: CONTROLS PANEL -->
	<div class="mt-10 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">COMPRESS CONTROLS</p>
		</div>
		<div class="space-y-4 p-5">
			<!-- QUALITY CONTROL TOGGLE MOCKUP -->
			<div>
				<p class="mb-1 text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">QUALITY CONTROL</p>
				<div class="flex rounded-lg border border-[#E2E8F0] dark:border-[#2A2578]">
					<span class="flex flex-1 items-center justify-center gap-1.5 rounded-l-lg bg-[#0891B2]/10 px-3 py-2 text-xs font-medium text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
						Quality
					</span>
					<span class="flex flex-1 items-center justify-center gap-1.5 rounded-r-lg px-3 py-2 text-xs font-medium text-[#64748B] dark:text-slate-400">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
						Target Size
					</span>
				</div>
			</div>

			<!-- QUALITY SLIDER MOCKUP -->
			<div>
				<div class="mb-1 flex items-center justify-between">
					<p class="text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">QUALITY</p>
					<p class="font-mono text-[10px] text-[#0891B2] dark:text-[#22D3EE]">80</p>
				</div>
				<div class="h-1.5 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
					<div class="h-full w-[80%] rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				</div>
				<div class="mt-1 flex justify-between text-[8px] text-[#94A3B8] dark:text-slate-500">
					<span>Smaller file</span>
					<span>Better quality</span>
				</div>
			</div>

			<!-- FORMAT ROW MOCKUP -->
			<div>
				<p class="mb-1 text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">OUTPUT FORMAT</p>
				<div class="flex gap-2">
					{#each ['Same as original', 'JPEG', 'PNG', 'WebP'] as f}
						<span
							class="rounded-lg px-2.5 py-1.5 text-[10px] {f === 'Same as original'
								? 'bg-[#0891B2] text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]'
								: 'border border-[#E2E8F0] text-[#64748B] dark:border-[#2A2578] dark:text-slate-400'}"
						>
							{f}
						</span>
					{/each}
				</div>
			</div>

			<!-- FILENAME MOCKUP -->
			<div>
				<p class="mb-1 text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">FILENAME</p>
				<div class="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 font-mono text-xs text-[#0F172A] dark:border-[#2A2578] dark:bg-[#0B0A23] dark:text-white">
					photo-compressed
				</div>
			</div>
		</div>
	</div>
</section>

<!-- SECTION 3: COMPARING -->
<section use:reveal class="mt-16" id="comparing">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">3. Before & After Comparison</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		After compressing, the before/after slider lets you compare the original and compressed images side by side. Drag the handle to reveal more of either side.
	</p>

	<!-- COMPARE SLIDER MOCKUP -->
	<div class="mt-8 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="relative flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0B0A23]" style="height: 240px;">
			<!-- SAMPLE IMAGE LEFT (ORIGINAL) -->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" class="absolute rounded" style="width: 320px; height: 200px;">
				<rect width="320" height="200" fill="#87CEEB" class="dark:fill-[#1a1a3e]" />
				<circle cx="250" cy="45" r="25" fill="#FFD700" opacity="0.9" class="dark:fill-[#F59E0B]" />
				<polygon points="0,130 60,65 120,110 160,55 220,95 270,70 320,120 320,200 0,200" fill="#6B8E6B" class="dark:fill-[#2d4a2d]" />
				<polygon points="0,155 80,90 150,130 200,80 320,140 320,200 0,200" fill="#4A7A4A" class="dark:fill-[#1e3a1e]" />
				<rect y="160" width="320" height="40" fill="#3D6B3D" class="dark:fill-[#163016]" />
				<ellipse cx="80" cy="38" rx="30" ry="11" fill="white" opacity="0.7" class="dark:fill-white/20" />
			</svg>

			<!-- SLIDER DIVIDER LINE -->
			<div class="absolute top-0 bottom-0 left-1/2 z-10 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]" />

			<!-- GRIP HANDLE -->
			<div class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white p-2 shadow-lg">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-[#64748B]">
					<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>
				</svg>
			</div>

			<!-- LABELS -->
			<div class="absolute bottom-3 left-3 z-10 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
				Original · 1.3 MB
			</div>
			<div class="absolute bottom-3 right-3 z-10 rounded-md bg-[#0891B2]/80 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm dark:bg-[#22D3EE]/80 dark:text-[#0B0A23]">
				Compressed · 320 KB · 75% smaller
			</div>

			<!-- ZOOM CONTROLS MOCKUP -->
			<div class="absolute top-3 right-3 z-10 flex items-center gap-1">
				<div class="rounded-md bg-black/50 p-1.5">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-white/80"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
				</div>
				<div class="rounded-md bg-black/50 p-1.5">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-white/80"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 space-y-3">
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Scroll to zoom</strong> — zoom up to 2000% to inspect compression artifacts at the pixel level.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Drag to pan</strong> — when zoomed in, click and drag to move around the image. Both sides move together.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Pinch to zoom</strong> — on mobile, use two-finger pinch to zoom in and out.
			</p>
		</div>
	</div>
</section>

<!-- SECTION 4: FORMAT CONVERSION -->
<section use:reveal class="mt-16" id="formats">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">4. Format Conversion</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Choose your output format based on your needs. The compressor can keep the original format or convert to any supported type:
	</p>

	<!-- FORMAT COMPARISON TABLE -->
	<div class="mt-6 overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<table class="w-full min-w-[480px] text-left text-sm">
			<thead>
				<tr class="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Format</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Compression</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Quality Slider</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Best For</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#F1F5F9] dark:divide-[#2A2578]/40">
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">JPEG</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Lossy</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Controls quality (0-100)</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Photos, complex imagery</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">WebP</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Lossy</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Controls quality (0-100)</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Web use, smallest files</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">PNG</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Color quantization</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Controls color count (100 = lossless)</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Graphics, screenshots, logos</td>
				</tr>
			</tbody>
		</table>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		If the compressed result is larger than the original (same format), the compressor keeps the original automatically — your file will never get bigger.
	</p>
</section>

<!-- SECTION 5: TARGET SIZE -->
<section use:reveal class="mt-16" id="target-size">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">5. Target Size Mode</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Instead of setting a quality level, you can specify a maximum file size. The compressor uses binary search to find the
		highest quality that fits within your target.
	</p>

	<!-- TARGET SIZE MOCKUP -->
	<div class="mt-8 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">TARGET SIZE MODE</p>
		</div>
		<div class="space-y-4 p-5">
			<!-- TOGGLE MOCKUP -->
			<div class="flex rounded-lg border border-[#E2E8F0] dark:border-[#2A2578]">
				<span class="flex flex-1 items-center justify-center gap-1.5 rounded-l-lg px-3 py-2 text-xs font-medium text-[#64748B] dark:text-slate-400">
					Quality
				</span>
				<span class="flex flex-1 items-center justify-center gap-1.5 rounded-r-lg bg-[#0891B2]/10 px-3 py-2 text-xs font-medium text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]">
					Target Size
				</span>
			</div>

			<!-- SIZE INPUT MOCKUP -->
			<div>
				<div class="flex items-center justify-between">
					<p class="text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">MAXIMUM FILE SIZE</p>
					<p class="text-[10px] text-[#94A3B8] dark:text-slate-500">Original: 1.3 MB</p>
				</div>
				<div class="mt-1 flex gap-2">
					<div class="flex-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 font-mono text-sm text-[#0F172A] dark:border-[#2A2578] dark:bg-[#0B0A23] dark:text-white">
						200
					</div>
					<div class="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] dark:border-[#2A2578] dark:bg-[#0B0A23] dark:text-white">
						KB
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 space-y-3">
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Validation</strong> — the target cannot exceed the original file size. The input highlights amber and the compress button is disabled if it does.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Can't reach target?</strong> — if the smallest possible file still exceeds your target, the compressor shows a warning with the achievable minimum.
			</p>
		</div>
	</div>
</section>

<!-- SECTION 6: BATCH PROCESSING -->
<section use:reveal class="mt-16" id="batch">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">6. Batch Processing</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Upload more than one image and the tool automatically switches to batch mode. All images share the same compression
		settings and are exported as a single ZIP file.
	</p>

	<!-- BATCH WORKFLOW -->
	<div class="mt-8 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">BATCH MODE WORKFLOW</p>
		</div>

		<!-- DESKTOP: HORIZONTAL FLOW -->
		<div class="hidden p-6 sm:block">
			<div class="flex items-start justify-between">
				<div class="flex flex-1 flex-col items-center text-center">
					<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-[#0891B2] dark:text-[#22D3EE]">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
						</svg>
					</div>
					<p class="mt-2 text-xs font-bold text-[#0F172A] dark:text-white">Upload 2+</p>
					<p class="mt-0.5 text-[10px] text-[#94A3B8] dark:text-slate-500">Drop multiple images</p>
				</div>

				<div class="mt-5 flex flex-1 items-center justify-center">
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-1 h-3.5 w-3.5 shrink-0 text-[#CBD5E1] dark:text-slate-600"><path d="m9 18 6-6-6-6" /></svg>
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
				</div>

				<div class="flex flex-1 flex-col items-center text-center">
					<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-[#0891B2] dark:text-[#22D3EE]">
							<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
						</svg>
					</div>
					<p class="mt-2 text-xs font-bold text-[#0F172A] dark:text-white">Configure</p>
					<p class="mt-0.5 text-[10px] text-[#94A3B8] dark:text-slate-500">Shared quality & format</p>
				</div>

				<div class="mt-5 flex flex-1 items-center justify-center">
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-1 h-3.5 w-3.5 shrink-0 text-[#CBD5E1] dark:text-slate-600"><path d="m9 18 6-6-6-6" /></svg>
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
				</div>

				<div class="flex flex-1 flex-col items-center text-center">
					<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-[#0891B2] dark:text-[#22D3EE]">
							<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
						</svg>
					</div>
					<p class="mt-2 text-xs font-bold text-[#0F172A] dark:text-white">Auto-Name</p>
					<p class="mt-0.5 text-[10px] text-[#94A3B8] dark:text-slate-500">Naming patterns</p>
				</div>

				<div class="mt-5 flex flex-1 items-center justify-center">
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-1 h-3.5 w-3.5 shrink-0 text-[#CBD5E1] dark:text-slate-600"><path d="m9 18 6-6-6-6" /></svg>
					<div class="h-px flex-1 bg-[#E2E8F0] dark:bg-[#2A2578]" />
				</div>

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

		<!-- MOBILE: STACKED STEPS -->
		<div class="space-y-0 sm:hidden">
			{#each [
				{ n: '1', title: 'Upload 2+ images', desc: 'Drop or browse multiple files', icon: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M17 8l-5-5-5 5|M12 3v12' },
				{ n: '2', title: 'Configure settings', desc: 'Shared quality, format', icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z|M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' },
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
				<strong class="text-[#0F172A] dark:text-white">Drag to reorder</strong> — rearrange images by dragging them in the list.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Duplicate detection</strong> — re-uploading the same file is automatically skipped with a toast notification.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Auto-naming patterns</strong> — choose from sequential (img-1, img-2), prefix-original, original-suffix, number-only, or custom templates with {'{name}'} and {'{n}'} tokens.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">ZIP export</strong> — all compressed images are packaged into a single ZIP file.
			</p>
		</div>
	</div>
</section>

<!-- SECTION 7: PRO TIPS -->
<section use:reveal class="mt-16" id="tips">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">7. Pro Tips</h2>

	<div class="mt-6 space-y-4">
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">
				Use WebP for the smallest file sizes
			</p>
			<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
				WebP typically produces files 25-34% smaller than JPEG at equivalent quality, with transparency support.
				Convert your PNGs and JPEGs to WebP for the best web performance.
			</p>
		</div>

		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">
				PNG quality 100 still compresses
			</p>
			<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
				Quality 100 for PNG means lossless re-encoding — zero visual change. But UPNG's optimized encoder often produces
				smaller files than the original by using better compression filters. You might see 10-30% reduction with no quality loss.
			</p>
		</div>

		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">
				Target size for email attachments
			</p>
			<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
				Need to send photos under a size limit? Switch to Target Size mode, set your limit (e.g., 500 KB), and the
				compressor finds the highest quality that fits. No guesswork needed.
			</p>
		</div>

		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">
				Zoom in to check quality
			</p>
			<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
				Use the scroll wheel (or pinch on mobile) to zoom up to 2000% on the before/after slider. This lets you
				inspect compression artifacts at the pixel level before downloading.
			</p>
		</div>

		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">
				Keyboard shortcuts
			</p>
			<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
				Press <kbd class="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-xs dark:bg-[#2A2578]/50">Ctrl+V</kbd> to paste
				images from clipboard, and <kbd class="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-xs dark:bg-[#2A2578]/50">Esc</kbd> to
				clear all images.
			</p>
		</div>
	</div>
</section>

<!-- CTA -->
<section use:reveal class="mt-16">
	<div class="rounded-2xl border border-[#0891B2]/20 bg-[#0891B2]/5 p-8 text-center dark:border-[#22D3EE]/20 dark:bg-[#22D3EE]/5">
		<p class="font-display text-xl font-bold text-[#0F172A] dark:text-white">Ready to compress?</p>
		<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
			Try the Image Compressor now — no signup, no upload, no cost.
		</p>
		<a
			href="/products/image-compressor/"
			class="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0891B2] px-6 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-[#0891B2]/90 dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:hover:bg-[#22D3EE]/90"
		>
			Open Image Compressor
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
				<path d="M5 12h14M12 5l7 7-7 7" />
			</svg>
		</a>
	</div>
</section>

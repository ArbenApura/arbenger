<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<!-- INTRO -->
<section use:reveal>
	<p class="text-lg leading-relaxed text-[#475569] dark:text-slate-300">
		We got tired of installing volume booster extensions that request access to every website or inject tracking scripts. So we built one that doesn't. Sound Booster amplifies audio up to 600%, includes a 5-band equalizer with presets, keyboard shortcuts, and a live peak meter — using only three permissions.
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
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Minimal Permissions</p>
			<p class="mt-1 text-sm text-[#475569] dark:text-slate-400">
				This extension only uses <code class="rounded bg-[#F1F5F9] px-1 py-0.5 font-mono text-xs dark:bg-[#2A2578]">activeTab</code>, <code class="rounded bg-[#F1F5F9] px-1 py-0.5 font-mono text-xs dark:bg-[#2A2578]">storage</code>, and <code class="rounded bg-[#F1F5F9] px-1 py-0.5 font-mono text-xs dark:bg-[#2A2578]">scripting</code>. The audio processor only activates when you open the popup or press a keyboard shortcut — never automatically on page load. No data collection, no network requests, no analytics.
			</p>
		</div>
	</div>
</section>

<!-- TABLE OF CONTENTS -->
<section use:reveal class="mt-12">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">What You'll Learn</h2>
	<nav class="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<ol class="space-y-2 text-sm">
			<li><a href="#boosting" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">1. Boosting Volume</a></li>
			<li><a href="#equalizer" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">2. Using the Equalizer</a></li>
			<li><a href="#presets" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">3. Presets</a></li>
			<li><a href="#shortcuts" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">4. Keyboard Shortcuts</a></li>
			<li><a href="#peak-meter" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">5. Peak Meter</a></li>
			<li><a href="#on-off" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">6. On/Off Toggle</a></li>
			<li><a href="#themes" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">7. Dark & Light Mode</a></li>
			<li><a href="#why" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">8. Why We Built This</a></li>
		</ol>
	</nav>
</section>

<!-- SECTION 1: BOOSTING VOLUME -->
<section use:reveal class="mt-16" id="boosting">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">1. Boosting Volume</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Click the extension icon in your Chrome toolbar to open the popup. The workflow is three steps:
	</p>

	<!-- WORKFLOW STEPS -->
	<div class="mt-8 space-y-6">
		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">1</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Play audio in any tab</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">Open YouTube, a podcast episode, Spotify Web, or any page with audio or video. The extension detects media elements automatically.</p>
			</div>
		</div>
		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">2</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Click the extension icon</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">The popup opens showing the volume slider at 100%. The status bar shows how many media sources were detected on the page.</p>
			</div>
		</div>
		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">3</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Drag past 100%</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">The percentage display turns cyan while boosting. A DynamicsCompressor prevents clipping at high volumes. The slider snaps to 100% when you're near it.</p>
			</div>
		</div>
	</div>

	<!-- POPUP UI MOCKUP: BOOST FLOW -->
	<div class="mt-10 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">POPUP — VOLUME STATES</p>
		</div>
		<div class="flex gap-4 p-5 sm:gap-6">
			<!-- STATE 1: NORMAL -->
			<div class="flex-1">
				<p class="mb-2 text-center text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">NORMAL</p>
				<div class="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#0B0A23]">
					<div class="p-3">
						<div class="mb-2 text-center font-mono text-base font-bold text-[#0F172A] dark:text-white">100%</div>
						<div class="mb-1.5 h-1 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
							<div class="h-full w-1/4 rounded-full bg-[#4ADE80]"></div>
						</div>
						<div class="relative flex items-center">
							<div class="h-1 w-full rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
								<div class="h-full rounded-full bg-[#94A3B8] dark:bg-slate-500" style="width: 16.7%;"></div>
							</div>
							<div class="absolute h-2.5 w-2.5 rounded-full border border-white bg-[#94A3B8] dark:border-[#0B0A23] dark:bg-slate-500" style="left: calc(16.7% - 5px);"></div>
						</div>
					</div>
				</div>
			</div>

			<!-- ARROW -->
			<div class="flex items-center pt-6">
				<svg width="16" height="10" viewBox="0 0 20 12" fill="none" class="text-[#0891B2] dark:text-[#22D3EE]">
					<path d="M1 6h14M12 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>

			<!-- STATE 2: BOOSTED -->
			<div class="flex-1">
				<p class="mb-2 text-center text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">BOOSTED</p>
				<div class="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#0B0A23]">
					<div class="p-3">
						<div class="mb-2 text-center font-mono text-base font-bold text-[#0891B2] dark:text-[#22D3EE]">300%</div>
						<div class="mb-1.5 h-1 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
							<div class="h-full w-4/5 rounded-full" style="background: linear-gradient(to right, #4ADE80, #FBBF24);"></div>
						</div>
						<div class="relative flex items-center">
							<div class="h-1 w-full rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
								<div class="h-full w-1/2 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]"></div>
							</div>
							<div class="absolute h-2.5 w-2.5 rounded-full border border-white bg-[#0891B2] dark:border-[#0B0A23] dark:bg-[#22D3EE]" style="left: calc(50% - 5px);"></div>
						</div>
					</div>
				</div>
			</div>

			<!-- ARROW -->
			<div class="flex items-center pt-6">
				<svg width="16" height="10" viewBox="0 0 20 12" fill="none" class="text-[#0891B2] dark:text-[#22D3EE]">
					<path d="M1 6h14M12 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>

			<!-- STATE 3: MUTED -->
			<div class="flex-1">
				<p class="mb-2 text-center text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">MUTED</p>
				<div class="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#0B0A23]">
					<div class="p-3">
						<div class="mb-2 text-center font-mono text-base font-bold text-[#F87171]/60">MUTED</div>
						<div class="mb-1.5 h-1 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]"></div>
						<div class="relative flex items-center">
							<div class="h-1 w-full rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
								<div class="h-full w-1/2 rounded-full bg-[#F87171]/40"></div>
							</div>
							<div class="absolute h-2.5 w-2.5 rounded-full border border-white bg-[#F87171]/60 dark:border-[#0B0A23]" style="left: calc(50% - 5px);"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<p class="mt-6 text-[#475569] leading-relaxed dark:text-slate-300">
		The percentage display changes color: white at normal volume, <span class="font-semibold text-[#0891B2] dark:text-[#22D3EE]">cyan when boosted</span>, <span class="font-semibold text-[#FBBF24]">amber above 300%</span>, and <span class="font-semibold text-[#F87171]">red when muted</span>. The toolbar badge also updates to show the current boost level.
	</p>
</section>

<!-- SECTION 2: EQUALIZER -->
<section use:reveal class="mt-16" id="equalizer">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">2. Using the Equalizer</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Expand the "Equalizer" section in the popup. Five vertical sliders control frequency bands from -12dB to +12dB. Each uses a BiquadFilterNode with a Q of 1.4 for natural-sounding adjustments.
	</p>

	<!-- EQ BANDS TABLE -->
	<div class="mt-6 overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<table class="w-full min-w-[480px] text-left text-sm">
			<thead>
				<tr class="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Band</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Frequency</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Controls</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#F1F5F9] dark:divide-[#2A2578]/40">
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">60Hz</td>
					<td class="px-4 py-3 font-mono text-xs text-[#475569] dark:text-slate-300">Sub-bass</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Rumble, kick drums, deep bass</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">230Hz</td>
					<td class="px-4 py-3 font-mono text-xs text-[#475569] dark:text-slate-300">Low-mids</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Warmth, body, male vocals</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">910Hz</td>
					<td class="px-4 py-3 font-mono text-xs text-[#475569] dark:text-slate-300">Mids</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Presence, speech clarity</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">4kHz</td>
					<td class="px-4 py-3 font-mono text-xs text-[#475569] dark:text-slate-300">Upper-mids</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Detail, articulation, bite</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">14kHz</td>
					<td class="px-4 py-3 font-mono text-xs text-[#475569] dark:text-slate-300">Treble</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Air, sparkle, cymbals</td>
				</tr>
			</tbody>
		</table>
	</div>

	<!-- EQ UI MOCKUP -->
	<div class="mt-10 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">EQUALIZER PANEL — BASS BOOST PRESET</p>
		</div>
		<div class="p-6">
			<div class="flex justify-evenly">
				{#each [
					{ db: '+8', pos: 17, freq: '60Hz' },
					{ db: '+5', pos: 29, freq: '230Hz' },
					{ db: '0', pos: 50, freq: '910Hz' },
					{ db: '0', pos: 50, freq: '4kHz' },
					{ db: '0', pos: 50, freq: '14kHz' }
				] as band}
					<div class="flex flex-col items-center gap-1">
						<span class="font-mono text-[10px] font-semibold text-[#0891B2] dark:text-[#22D3EE]">{band.db}</span>
						<div class="relative" style="width: 20px; height: 80px;">
							<!-- TRACK -->
							<div class="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]"></div>
							<!-- CENTER LINE -->
							<div class="absolute left-0 right-0 top-1/2 h-[1px] bg-[#94A3B8]/20"></div>
							<!-- THUMB -->
							<div class="absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full border-2 border-white bg-[#0891B2] dark:border-[#0B0A23] dark:bg-[#22D3EE]" style="top: calc({band.pos}% - 6px);"></div>
						</div>
						<span class="text-[10px] text-[#94A3B8] dark:text-slate-500">{band.freq}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		Each slider shows its current dB value above it. A horizontal center line marks 0dB (no change). The audio chain processes in order: source → EQ bands → gain → compressor → analyser → speakers.
	</p>
</section>

<!-- SECTION 3: PRESETS -->
<section use:reveal class="mt-16" id="presets">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">3. Presets</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Seven built-in presets cover common listening scenarios. Select from the dropdown above the EQ sliders. The sliders update instantly to show the preset's values.
	</p>

	<!-- PRESETS TABLE -->
	<div class="mt-6 overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<table class="w-full min-w-[480px] text-left text-sm">
			<thead>
				<tr class="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Preset</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">60Hz</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">230Hz</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">910Hz</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">4kHz</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">14kHz</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Best For</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#F1F5F9] font-mono text-xs dark:divide-[#2A2578]/40">
				<tr><td class="px-4 py-2.5 font-semibold text-[#0891B2] dark:text-[#22D3EE]">Flat</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 font-sans text-[#475569] dark:text-slate-300">No EQ applied</td></tr>
				<tr><td class="px-4 py-2.5 font-semibold text-[#0891B2] dark:text-[#22D3EE]">Bass Boost</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+8</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+5</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 font-sans text-[#475569] dark:text-slate-300">Music, movies</td></tr>
				<tr><td class="px-4 py-2.5 font-semibold text-[#0891B2] dark:text-[#22D3EE]">Treble Boost</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+5</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+8</td><td class="px-4 py-2.5 font-sans text-[#475569] dark:text-slate-300">Clarity, detail</td></tr>
				<tr><td class="px-4 py-2.5 font-semibold text-[#0891B2] dark:text-[#22D3EE]">Music</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+4</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+2</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+3</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+5</td><td class="px-4 py-2.5 font-sans text-[#475569] dark:text-slate-300">General listening</td></tr>
				<tr><td class="px-4 py-2.5 font-semibold text-[#0891B2] dark:text-[#22D3EE]">Movie</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+6</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+4</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+2</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+1</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+3</td><td class="px-4 py-2.5 font-sans text-[#475569] dark:text-slate-300">Film, TV shows</td></tr>
				<tr><td class="px-4 py-2.5 font-semibold text-[#0891B2] dark:text-[#22D3EE]">Voice</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">-2</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+6</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">+4</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">-1</td><td class="px-4 py-2.5 font-sans text-[#475569] dark:text-slate-300">Podcasts, calls</td></tr>
				<tr><td class="px-4 py-2.5 font-semibold text-[#0891B2] dark:text-[#22D3EE]">Bass Cut</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">-8</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">-4</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">0</td><td class="px-4 py-2.5 font-sans text-[#475569] dark:text-slate-300">Reduce rumble</td></tr>
			</tbody>
		</table>
	</div>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		You can also save custom presets. Click the save icon next to the dropdown, enter a name, and your current EQ settings are stored locally. Custom presets appear in a "Saved" group and can be deleted anytime.
	</p>
</section>

<!-- SECTION 4: KEYBOARD SHORTCUTS -->
<section use:reveal class="mt-16" id="shortcuts">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">4. Keyboard Shortcuts</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		These shortcuts work globally — even when the popup is closed. They use Chrome's <code class="rounded bg-[#F1F5F9] px-1 py-0.5 font-mono text-xs dark:bg-[#2A2578]">chrome.commands</code> API.
	</p>

	<div class="mt-6 overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<table class="w-full text-left text-sm">
			<thead>
				<tr class="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Shortcut</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Action</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#F1F5F9] dark:divide-[#2A2578]/40">
				<tr>
					<td class="px-4 py-3"><kbd class="rounded-md border border-[#E2E8F0] bg-white px-2 py-1 font-mono text-xs text-[#0F172A] shadow-sm dark:border-[#2A2578] dark:bg-[#1E1A5E] dark:text-white">Alt+Shift+Up</kbd></td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Volume up 10%</td>
				</tr>
				<tr>
					<td class="px-4 py-3"><kbd class="rounded-md border border-[#E2E8F0] bg-white px-2 py-1 font-mono text-xs text-[#0F172A] shadow-sm dark:border-[#2A2578] dark:bg-[#1E1A5E] dark:text-white">Alt+Shift+Down</kbd></td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Volume down 10%</td>
				</tr>
				<tr>
					<td class="px-4 py-3"><kbd class="rounded-md border border-[#E2E8F0] bg-white px-2 py-1 font-mono text-xs text-[#0F172A] shadow-sm dark:border-[#2A2578] dark:bg-[#1E1A5E] dark:text-white">Alt+Shift+M</kbd></td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Toggle mute</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Custom Shortcuts</p>
		<p class="mt-2 text-sm text-[#475569] dark:text-slate-400">
			You can remap these shortcuts in Chrome at <code class="rounded bg-white px-1 py-0.5 font-mono text-xs dark:bg-[#2A2578]/50">chrome://extensions/shortcuts</code>. Any key combination supported by Chrome is available.
		</p>
	</div>
</section>

<!-- SECTION 5: PEAK METER -->
<section use:reveal class="mt-16" id="peak-meter">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">5. Peak Meter</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		The horizontal bar below the volume percentage shows audio output level in real time. It polls the AnalyserNode every 60ms using <code class="rounded bg-[#F1F5F9] px-1 py-0.5 font-mono text-xs dark:bg-[#2A2578]">getByteFrequencyData()</code>.
	</p>

	<!-- PEAK METER MOCKUP -->
	<div class="mt-8 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">PEAK METER — LEVEL ZONES</p>
		</div>
		<div class="space-y-3 p-5">
			<div class="flex items-center gap-3">
				<div class="h-2 w-24 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]"><div class="h-full w-1/3 rounded-full bg-[#4ADE80]"></div></div>
				<span class="text-xs text-[#475569] dark:text-slate-400">Safe — low to moderate level</span>
			</div>
			<div class="flex items-center gap-3">
				<div class="h-2 w-24 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]"><div class="h-full w-3/4 rounded-full" style="background: linear-gradient(to right, #4ADE80, #FBBF24);"></div></div>
				<span class="text-xs text-[#475569] dark:text-slate-400">Moderate — approaching loud</span>
			</div>
			<div class="flex items-center gap-3">
				<div class="h-2 w-24 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]"><div class="h-full w-full rounded-full" style="background: linear-gradient(to right, #4ADE80 55%, #FBBF24 75%, #F87171);"></div></div>
				<span class="text-xs text-[#475569] dark:text-slate-400">Hot — compressor may engage</span>
			</div>
		</div>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		If the meter stays in the red zone, consider lowering volume or reducing EQ gains. The built-in DynamicsCompressor handles most clipping, but backing off produces cleaner audio.
	</p>
</section>

<!-- SECTION 6: ON/OFF -->
<section use:reveal class="mt-16" id="on-off">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">6. On/Off Toggle</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		The toggle switch in the popup header instantly bypasses all audio processing. When off, gain resets to 1.0 (native volume) and EQ flattens — but your settings are preserved. Toggle back on and everything is restored instantly.
	</p>

	<!-- ON/OFF MOCKUP -->
	<div class="mt-8 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">ON/OFF TOGGLE STATES</p>
		</div>
		<div class="flex gap-8 p-5">
			<!-- ON -->
			<div class="flex-1 text-center">
				<p class="mb-2 text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">ON</p>
				<div class="mx-auto flex w-fit items-center gap-2 rounded-lg border border-[#E2E8F0] px-3 py-2 dark:border-[#2A2578]">
					<div class="h-4 w-7 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]">
						<div class="ml-3.5 h-3 w-3 translate-y-0.5 rounded-full bg-white dark:bg-[#0B0A23]"></div>
					</div>
					<span class="text-xs font-semibold text-[#0F172A] dark:text-white">200%</span>
				</div>
				<p class="mt-2 text-[10px] text-[#475569] dark:text-slate-400">Badge: "200"</p>
			</div>
			<!-- OFF -->
			<div class="flex-1 text-center">
				<p class="mb-2 text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">OFF</p>
				<div class="mx-auto flex w-fit items-center gap-2 rounded-lg border border-[#E2E8F0] px-3 py-2 opacity-40 dark:border-[#2A2578]">
					<div class="h-4 w-7 rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
						<div class="h-3 w-3 translate-y-0.5 translate-x-0.5 rounded-full bg-[#94A3B8]"></div>
					</div>
					<span class="text-xs text-[#94A3B8]">200%</span>
				</div>
				<p class="mt-2 text-[10px] text-[#475569] dark:text-slate-400">Badge: "OFF"</p>
			</div>
		</div>
	</div>
</section>

<!-- SECTION 7: THEMES -->
<section use:reveal class="mt-16" id="themes">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">7. Dark & Light Mode</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Click the sun/moon icon in the header to toggle themes. The preference persists across popup opens. The Chrome toolbar icon also adapts to your system theme — dark icon on light toolbars, light icon on dark toolbars.
	</p>
</section>

<!-- SECTION 8: WHY WE BUILT THIS -->
<section use:reveal class="mt-16" id="why">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">8. Why We Built This</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Most volume booster extensions on the Chrome Web Store request broad host permissions, inject analytics, have bloated UIs, or lack an equalizer. We wanted one that's powerful, private, and polished.
	</p>

	<div class="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Technical Details</p>
		<ul class="mt-3 list-inside list-disc space-y-1.5 text-sm text-[#475569] dark:text-slate-400">
			<li>Built with vanilla TypeScript — no framework overhead</li>
			<li>Manifest V3 — Chrome's latest and most secure extension platform</li>
			<li>Audio chain: MediaElementSource → BiquadFilter ×5 → GainNode → DynamicsCompressor → Analyser</li>
			<li>MutationObserver captures dynamically added media elements (SPA support)</li>
			<li>esbuild for instant builds, minified IIFE output</li>
			<li>Total bundle size under 25KB</li>
		</ul>
	</div>
</section>

<!-- CTA -->
<section use:reveal class="mt-16">
	<div class="rounded-2xl border border-[#0891B2]/20 bg-[#0891B2]/5 p-8 text-center dark:border-[#22D3EE]/20 dark:bg-[#22D3EE]/5">
		<p class="font-display text-xl font-bold text-[#0F172A] dark:text-white">Try Sound Booster</p>
		<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
			Free, private, and lightweight. Three permissions. Volume boost, EQ, and presets in one popup.
		</p>
		<div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
			<a
				href="https://chromewebstore.google.com/detail/sound-booster-%E2%80%94-arbenger/mngicimeobmdkmcebgjhliknojfkfkfg"
				target="_blank"
				rel="noopener"
				class="inline-flex items-center gap-2 rounded-lg bg-[#0891B2] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0891B2]/90 dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:hover:bg-[#22D3EE]/90"
			>
				<img src="/icons/chrome.svg" alt="Chrome" width="18" height="18" class="shrink-0" />
				Add to Chrome
			</a>
			<a
				href="/products/sound-booster/"
				class="inline-flex items-center gap-2 text-sm font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80"
			>
				Product page &rarr;
			</a>
		</div>
	</div>
</section>

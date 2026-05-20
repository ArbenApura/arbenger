<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
</script>

<!-- INTRO -->
<section use:reveal>
	<p class="text-lg leading-relaxed text-[#475569] dark:text-slate-300">
		We got tired of installing color picker extensions that demand access to every website we visit. So we built one that doesn't. Color Picker combines an eyedropper, four output formats, WCAG contrast checker, color blindness simulation, harmonies, shades, and persistent history — in a single lightweight popup with only two permissions.
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
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Zero Page-Access Permissions</p>
			<p class="mt-1 text-sm text-[#475569] dark:text-slate-400">
				This extension only uses <code class="rounded bg-[#F1F5F9] px-1 py-0.5 font-mono text-xs dark:bg-[#2A2578]">activeTab</code> and <code class="rounded bg-[#F1F5F9] px-1 py-0.5 font-mono text-xs dark:bg-[#2A2578]">storage</code>. No browsing history access, no network requests, no analytics. Your data stays in your browser.
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
				<a href="#picking" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">1. Picking Colors</a>
			</li>
			<li>
				<a href="#formats" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">2. Output Formats</a>
			</li>
			<li>
				<a href="#contrast" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">3. Two-Color Contrast Checker</a>
			</li>
			<li>
				<a href="#colorblind" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">4. Color Blindness Simulation</a>
			</li>
			<li>
				<a href="#harmonies" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">5. Color Harmonies</a>
			</li>
			<li>
				<a href="#shades" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">6. Shades & Tints</a>
			</li>
			<li>
				<a href="#history" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">7. Color History</a>
			</li>
			<li>
				<a href="#why" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">8. Why We Built This</a>
			</li>
		</ol>
	</nav>
</section>

<!-- SECTION 1: PICKING COLORS -->
<section use:reveal class="mt-16" id="picking">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">1. Picking Colors</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Click the extension icon in your Chrome toolbar to open the popup. The workflow is three steps:
	</p>

	<!-- WORKFLOW STEPS -->
	<div class="mt-8 space-y-6">
		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
				1
			</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Click "Pick Color"</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					The button text changes to "Click anywhere to pick…" and the popup content collapses to give you a clear view. Chrome's built-in EyeDropper API activates with a crosshair cursor.
				</p>
			</div>
		</div>

		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
				2
			</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Click any pixel</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					Move your cursor over any element on any webpage. Click the pixel you want. The color is captured from the screen at exact pixel coordinates.
				</p>
			</div>
		</div>

		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
				3
			</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">HEX auto-copied</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					The HEX value is immediately copied to your clipboard. A teal "Copied" toast confirms it. The popup expands to show the full color swatch, all formats, and the feature panels.
				</p>
			</div>
		</div>
	</div>

	<!-- POPUP UI MOCKUP: PICK FLOW -->
	<div class="mt-10 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">POPUP — PICK FLOW</p>
		</div>
		<div class="flex gap-4 p-5 sm:gap-6">
			<!-- STATE 1: IDLE -->
			<div class="flex-1">
				<p class="mb-2 text-center text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">IDLE</p>
				<div class="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#0B0A23]">
					<div class="flex items-center gap-1.5 border-b border-[#E2E8F0] px-3 py-1.5 dark:border-[#2A2578]">
						<div class="h-2 w-2 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
						<span class="font-mono text-[7px] font-bold text-[#0F172A] dark:text-white">Color Picker</span>
					</div>
					<div class="p-2.5">
						<div class="flex items-center justify-center gap-1 rounded-md bg-[#0891B2] py-1.5 dark:bg-[#22D3EE]">
							<svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-white dark:text-[#0B0A23]"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/></svg>
							<span class="text-[7px] font-semibold text-white dark:text-[#0B0A23]">Pick Color</span>
						</div>
						<div class="mt-2 space-y-1">
							<div class="h-2 rounded bg-[#E2E8F0] dark:bg-[#2A2578]" />
							<div class="h-2 rounded bg-[#E2E8F0] dark:bg-[#2A2578]" />
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

			<!-- STATE 2: PICKING -->
			<div class="flex-1">
				<p class="mb-2 text-center text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">PICKING</p>
				<div class="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#0B0A23]">
					<div class="flex items-center gap-1.5 border-b border-[#E2E8F0] px-3 py-1.5 dark:border-[#2A2578]">
						<div class="h-2 w-2 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
						<span class="font-mono text-[7px] font-bold text-[#0F172A] dark:text-white">Color Picker</span>
					</div>
					<div class="p-2.5">
						<div class="flex items-center justify-center rounded-md bg-[#0891B2]/60 py-1.5 dark:bg-[#22D3EE]/60">
							<span class="text-[7px] text-white/80 dark:text-[#0B0A23]/80">Click anywhere to pick…</span>
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

			<!-- STATE 3: RESULT -->
			<div class="flex-1">
				<p class="mb-2 text-center text-[10px] font-medium text-[#94A3B8] dark:text-slate-500">RESULT</p>
				<div class="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#0B0A23]">
					<div class="flex items-center gap-1.5 border-b border-[#E2E8F0] px-3 py-1.5 dark:border-[#2A2578]">
						<div class="h-2 w-2 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
						<span class="font-mono text-[7px] font-bold text-[#0F172A] dark:text-white">Color Picker</span>
					</div>
					<div class="p-2.5">
						<div class="mb-2 flex items-center gap-2">
							<div class="h-7 w-7 rounded bg-[#6366F1]" />
							<span class="font-mono text-[9px] font-bold text-[#0F172A] dark:text-white">#6366F1</span>
						</div>
						<div class="space-y-0.5">
							<div class="flex items-center rounded border border-[#E2E8F0] bg-white px-1.5 py-0.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
								<span class="w-4 text-[5px] text-[#94A3B8]">HEX</span>
								<span class="flex-1 text-[6px] font-semibold text-[#0F172A] dark:text-white">#6366F1</span>
							</div>
							<div class="flex items-center rounded border border-[#E2E8F0] bg-white px-1.5 py-0.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
								<span class="w-4 text-[5px] text-[#94A3B8]">RGB</span>
								<span class="flex-1 text-[6px] font-semibold text-[#0F172A] dark:text-white">rgb(99,102,241)</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-8 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Browser Requirement</p>
		<p class="mt-2 text-sm text-[#475569] dark:text-slate-400">
			Color Picker uses Chrome's <code class="rounded bg-white px-1 py-0.5 font-mono text-xs dark:bg-[#2A2578]/50">EyeDropper API</code>, available in Chrome 95 and later. If your browser doesn't support it, the popup shows a compatibility message instead of the Pick button.
		</p>
	</div>
</section>

<!-- SECTION 2: OUTPUT FORMATS -->
<section use:reveal class="mt-16" id="formats">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">2. Output Formats</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		After picking a color, the popup displays it in four formats. Click any format row to copy that value to your clipboard.
	</p>

	<!-- FORMAT TABLE -->
	<div class="mt-6 overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<table class="w-full min-w-[480px] text-left text-sm">
			<thead>
				<tr class="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Format</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Example</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Best For</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#F1F5F9] dark:divide-[#2A2578]/40">
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">HEX</td>
					<td class="px-4 py-3 font-mono text-xs text-[#475569] dark:text-slate-300">#6366F1</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">CSS, design tools, quick sharing</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">RGB</td>
					<td class="px-4 py-3 font-mono text-xs text-[#475569] dark:text-slate-300">rgb(99, 102, 241)</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">CSS, JavaScript canvas, programmatic use</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">HSL</td>
					<td class="px-4 py-3 font-mono text-xs text-[#475569] dark:text-slate-300">hsl(239, 84%, 67%)</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Adjusting lightness/saturation, design systems</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">OKLCH</td>
					<td class="px-4 py-3 font-mono text-xs text-[#475569] dark:text-slate-300">oklch(54.1% 0.233 277)</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Perceptually uniform adjustments, modern CSS</td>
				</tr>
			</tbody>
		</table>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		OKLCH is a perceptually uniform color space — changing the lightness value produces consistent visual steps, unlike HSL where the same lightness change looks different across hues.
	</p>
</section>

<!-- SECTION 3: CONTRAST CHECKER -->
<section use:reveal class="mt-16" id="contrast">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">3. Two-Color Contrast Checker</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Open the "Contrast" panel in the popup. You'll see two color slots: text (foreground) and background. Your picked color auto-fills the text slot. You can change either by typing a hex value directly.
	</p>

	<!-- CONTRAST WORKFLOW -->
	<div class="mt-8 space-y-6">
		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
				1
			</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Set your text color</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					The picked color is used as the text (foreground) color. You can type a different hex value in the text input field.
				</p>
			</div>
		</div>

		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
				2
			</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Set your background color</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					Defaults to white (#FFFFFF). Type any hex value. A swap button lets you flip foreground and background with one click.
				</p>
			</div>
		</div>

		<div class="flex gap-4">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0891B2] font-mono text-sm font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
				3
			</div>
			<div>
				<p class="font-display text-base font-bold text-[#0F172A] dark:text-white">Read the results</p>
				<p class="mt-1 text-sm text-[#475569] leading-relaxed dark:text-slate-300">
					A live text preview shows the actual combination. Below it: the contrast ratio (e.g., "4.53:1") and three WCAG badges — AA, AA+ (large text), and AAA.
				</p>
			</div>
		</div>
	</div>

	<!-- CONTRAST CHECKER UI MOCKUP -->
	<div class="mt-10 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">CONTRAST CHECKER PANEL</p>
		</div>
		<div class="p-5">
			<!-- COLOR SLOTS -->
			<div class="flex items-end gap-3">
				<div class="flex-1">
					<p class="mb-1 text-[9px] font-medium tracking-wide text-[#94A3B8] uppercase dark:text-slate-500">Text</p>
					<div class="h-6 rounded-md bg-[#6366F1]" />
					<div class="mt-1 rounded-md border border-[#E2E8F0] bg-white px-2 py-1 text-center font-mono text-[10px] text-[#0F172A] dark:border-[#2A2578] dark:bg-[#0B0A23] dark:text-white">#6366F1</div>
				</div>
				<!-- SWAP BUTTON -->
				<div class="mb-3 flex h-6 w-6 items-center justify-center rounded border border-[#E2E8F0] text-[#94A3B8] dark:border-[#2A2578]">
					<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 16V4m0 12-4-4m4 4 4-4M17 8v12m0-12 4 4m-4-4-4 4"/></svg>
				</div>
				<div class="flex-1">
					<p class="mb-1 text-[9px] font-medium tracking-wide text-[#94A3B8] uppercase dark:text-slate-500">Background</p>
					<div class="h-6 rounded-md border border-[#E2E8F0] bg-white dark:border-[#2A2578]" />
					<div class="mt-1 rounded-md border border-[#E2E8F0] bg-white px-2 py-1 text-center font-mono text-[10px] text-[#0F172A] dark:border-[#2A2578] dark:bg-[#0B0A23] dark:text-white">#FFFFFF</div>
				</div>
			</div>
			<!-- PREVIEW -->
			<div class="mt-4 flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white p-3 dark:border-[#2A2578]">
				<span class="text-sm font-bold" style="color: #6366F1;">Aa</span>
				<span class="text-xs" style="color: #6366F1;">Sample text</span>
			</div>
			<!-- RESULT ROW -->
			<div class="mt-3 flex items-center justify-between">
				<span class="font-mono text-lg font-bold text-[#0F172A] dark:text-white">3.95:1</span>
				<div class="flex gap-1.5">
					<span class="rounded bg-[#F87171]/15 px-2 py-0.5 text-[9px] font-bold text-[#F87171]">AA ✗</span>
					<span class="rounded bg-[#4ADE80]/15 px-2 py-0.5 text-[9px] font-bold text-[#4ADE80]">AA+</span>
					<span class="rounded bg-[#F87171]/15 px-2 py-0.5 text-[9px] font-bold text-[#F87171]">AAA ✗</span>
				</div>
			</div>
		</div>
	</div>

	<!-- WCAG STANDARDS TABLE -->
	<div class="mt-8 overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<table class="w-full min-w-[400px] text-left text-sm">
			<thead>
				<tr class="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Level</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Min Ratio</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Applies To</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#F1F5F9] dark:divide-[#2A2578]/40">
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">AA</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">4.5:1</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Normal text (under 18px or 14px bold)</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">AA+</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">3:1</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Large text (18px+ or 14px+ bold)</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">AAA</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">7:1</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Enhanced readability, all text sizes</td>
				</tr>
			</tbody>
		</table>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		Most websites target AA compliance. AAA is recommended for body text where readability is critical (e.g., long-form content, legal text).
	</p>
</section>

<!-- SECTION 4: COLOR BLINDNESS -->
<section use:reveal class="mt-16" id="colorblind">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">4. Color Blindness Simulation</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		About 8% of men and 0.5% of women have some form of color vision deficiency. The "Color Blindness" panel shows how your picked color appears under three types of dichromacy:
	</p>

	<!-- CVD TYPES -->
	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Protanopia</p>
			<p class="mt-2 text-xs text-[#64748B] dark:text-slate-400">
				No red cones. Red and green appear similar. Affects ~1% of men. Most common confusion: red vs. brown, green vs. yellow.
			</p>
		</div>
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Deuteranopia</p>
			<p class="mt-2 text-xs text-[#64748B] dark:text-slate-400">
				No green cones. Similar confusion as protanopia but with different brightness perception. The most common form — ~5% of men.
			</p>
		</div>
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Tritanopia</p>
			<p class="mt-2 text-xs text-[#64748B] dark:text-slate-400">
				No blue cones. Blue and yellow appear similar. Very rare (~0.01%). Confusion: blue vs. green, yellow vs. violet.
			</p>
		</div>
	</div>

	<!-- COLOR BLINDNESS UI MOCKUP -->
	<div class="mt-8 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">COLOR BLINDNESS PANEL — EXAMPLE WITH #EF4444</p>
		</div>
		<div class="divide-y divide-[#F1F5F9] p-5 dark:divide-[#2A2578]/40">
			<!-- PROTANOPIA -->
			<div class="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
				<div class="flex items-center gap-2">
					<div class="h-6 w-6 rounded bg-[#EF4444]" />
					<svg width="12" height="8" viewBox="0 0 20 12" fill="none" class="text-[#CBD5E1] dark:text-slate-600">
						<path d="M1 6h14M12 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					<div class="h-6 w-6 rounded bg-[#8B8B42]" />
				</div>
				<div class="flex-1">
					<p class="text-xs font-semibold text-[#0F172A] dark:text-white">Protanopia</p>
					<p class="text-[10px] text-[#94A3B8] dark:text-slate-500">No red cones · #8B8B42</p>
				</div>
			</div>
			<!-- DEUTERANOPIA -->
			<div class="flex items-center gap-3 py-3">
				<div class="flex items-center gap-2">
					<div class="h-6 w-6 rounded bg-[#EF4444]" />
					<svg width="12" height="8" viewBox="0 0 20 12" fill="none" class="text-[#CBD5E1] dark:text-slate-600">
						<path d="M1 6h14M12 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					<div class="h-6 w-6 rounded bg-[#A89A33]" />
				</div>
				<div class="flex-1">
					<p class="text-xs font-semibold text-[#0F172A] dark:text-white">Deuteranopia</p>
					<p class="text-[10px] text-[#94A3B8] dark:text-slate-500">No green cones · #A89A33</p>
				</div>
			</div>
			<!-- TRITANOPIA -->
			<div class="flex items-center gap-3 py-3 last:pb-0">
				<div class="flex items-center gap-2">
					<div class="h-6 w-6 rounded bg-[#EF4444]" />
					<svg width="12" height="8" viewBox="0 0 20 12" fill="none" class="text-[#CBD5E1] dark:text-slate-600">
						<path d="M1 6h14M12 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					<div class="h-6 w-6 rounded bg-[#EF3F3F]" />
				</div>
				<div class="flex-1">
					<p class="text-xs font-semibold text-[#0F172A] dark:text-white">Tritanopia</p>
					<p class="text-[10px] text-[#94A3B8] dark:text-slate-500">No blue cones · #EF3F3F</p>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Algorithm</p>
		<p class="mt-2 text-sm text-[#475569] dark:text-slate-400">
			Simulations use the Machado, Oliveira & Fernandes 2009 model — the same peer-reviewed algorithm that powers Chrome DevTools' built-in vision deficiency emulation. Each simulation row shows the original color, an arrow, and the simulated color with its hex value. Click any row to copy the simulated hex.
		</p>
	</div>
</section>

<!-- SECTION 5: HARMONIES -->
<section use:reveal class="mt-16" id="harmonies">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">5. Color Harmonies</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		The "Harmonies" panel generates four palette types from your picked color by rotating the hue on the HSL color wheel:
	</p>

	<!-- HARMONY TYPES TABLE -->
	<div class="mt-6 overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<table class="w-full min-w-[480px] text-left text-sm">
			<thead>
				<tr class="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Type</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Hue Rotation</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Colors</th>
					<th class="px-4 py-3 font-display text-xs font-bold text-[#0F172A] dark:text-white">Use Case</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#F1F5F9] dark:divide-[#2A2578]/40">
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">Complementary</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">+180°</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">2</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">High contrast, CTAs, accents</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">Analogous</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">±15°, ±30°</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">5</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Cohesive palettes, gradients</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">Triadic</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">+120°, +240°</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">3</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Balanced, vibrant designs</td>
				</tr>
				<tr>
					<td class="px-4 py-3 font-mono text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">Split-comp</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">+150°, +210°</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">3</td>
					<td class="px-4 py-3 text-[#475569] dark:text-slate-300">Softer contrast than complementary</td>
				</tr>
			</tbody>
		</table>
	</div>

	<!-- HARMONIES UI MOCKUP -->
	<div class="mt-8 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">HARMONIES PANEL — EXAMPLE WITH #6366F1</p>
		</div>
		<div class="space-y-4 p-5">
			<!-- COMPLEMENTARY -->
			<div>
				<p class="mb-2 text-[10px] font-medium tracking-wide text-[#94A3B8] uppercase dark:text-slate-500">Complementary</p>
				<div class="flex gap-1.5">
					<div class="h-7 w-7 rounded-md bg-[#6366F1]" title="#6366F1" />
					<div class="h-7 w-7 rounded-md bg-[#F1EE63]" title="#F1EE63" />
				</div>
			</div>
			<!-- ANALOGOUS -->
			<div>
				<p class="mb-2 text-[10px] font-medium tracking-wide text-[#94A3B8] uppercase dark:text-slate-500">Analogous</p>
				<div class="flex gap-1.5">
					<div class="h-7 w-7 rounded-md bg-[#6366F1]" />
					<div class="h-7 w-7 rounded-md bg-[#8363F1]" />
					<div class="h-7 w-7 rounded-md bg-[#7363F1]" />
					<div class="h-7 w-7 rounded-md bg-[#6383F1]" />
					<div class="h-7 w-7 rounded-md bg-[#6393F1]" />
				</div>
			</div>
			<!-- TRIADIC -->
			<div>
				<p class="mb-2 text-[10px] font-medium tracking-wide text-[#94A3B8] uppercase dark:text-slate-500">Triadic</p>
				<div class="flex gap-1.5">
					<div class="h-7 w-7 rounded-md bg-[#6366F1]" />
					<div class="h-7 w-7 rounded-md bg-[#66F163]" />
					<div class="h-7 w-7 rounded-md bg-[#F16366]" />
				</div>
			</div>
		</div>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		Each palette row shows clickable swatches — click any swatch to copy its hex value. The first swatch in every row is your original picked color for reference.
	</p>
</section>

<!-- SECTION 6: SHADES & TINTS -->
<section use:reveal class="mt-16" id="shades">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">6. Shades & Tints</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		The "Shades & Tints" panel generates a 9-step ramp by adjusting the lightness value in HSL space:
	</p>

	<div class="mt-6 space-y-4">
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">4 tints</strong> — progressively lighter (+10%, +20%, +30%, +40% lightness)
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Original color</strong> — centered in the strip, slightly taller as a visual anchor
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">4 shades</strong> — progressively darker (-10%, -20%, -30%, -40% lightness)
			</p>
		</div>
	</div>

	<!-- SHADES UI MOCKUP -->
	<div class="mt-8 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/40">
			<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">SHADES & TINTS — EXAMPLE WITH #6366F1</p>
		</div>
		<div class="p-5">
			<div class="flex gap-1">
				<div class="h-8 flex-1 rounded bg-[#C4C5F9]" />
				<div class="h-8 flex-1 rounded bg-[#A4A6F6]" />
				<div class="h-8 flex-1 rounded bg-[#8486F4]" />
				<div class="h-8 flex-1 rounded bg-[#7376F2]" />
				<div class="h-9 flex-1 rounded bg-[#6366F1]" />
				<div class="h-8 flex-1 rounded bg-[#4F52C1]" />
				<div class="h-8 flex-1 rounded bg-[#3B3E91]" />
				<div class="h-8 flex-1 rounded bg-[#272A61]" />
				<div class="h-8 flex-1 rounded bg-[#131531]" />
			</div>
			<div class="mt-2 flex justify-between text-[9px] text-[#94A3B8] dark:text-slate-500">
				<span>Lighter</span>
				<span class="font-medium text-[#0891B2] dark:text-[#22D3EE]">Original</span>
				<span>Darker</span>
			</div>
		</div>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		Click any swatch in the strip to copy its hex value. Useful for building consistent shade scales for design systems, hover states, or border variations.
	</p>
</section>

<!-- SECTION 7: HISTORY -->
<section use:reveal class="mt-16" id="history">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">7. Color History</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		The bottom of the popup shows your last 10 picked colors, saved to <code class="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-xs dark:bg-[#2A2578]">chrome.storage.local</code> — they persist across popup opens, tab changes, and browser restarts.
	</p>

	<div class="mt-6 space-y-4">
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Click any history item</strong> — loads the color into the popup (swatch, formats, all panels) and copies its hex.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Delete individual colors</strong> — hover over an item to reveal the × button.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Clear all</strong> — requires confirmation (click once to see "Confirm?", click again to clear). Resets after 3 seconds if you don't confirm.
			</p>
		</div>
		<div class="flex items-start gap-3">
			<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
			<p class="text-sm text-[#475569] dark:text-slate-300">
				<strong class="text-[#0F172A] dark:text-white">Deduplication</strong> — picking the same color again moves it to the top instead of creating a duplicate.
			</p>
		</div>
	</div>
</section>

<!-- SECTION 8: WHY WE BUILT THIS -->
<section use:reveal class="mt-16" id="why">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">8. Why We Built This</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Multiple color picker extensions have been caught injecting tracking code after being sold to new owners. The market leader, ColorZilla, requires "access data on all websites" for basic functionality. And none of them include a contrast checker — you need a separate tool for that. We built Color Picker because the bar was on the floor.
	</p>

	<!-- TECH DETAILS -->
	<div class="mt-8 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Under the Hood</p>
		<ul class="mt-3 space-y-2 text-sm text-[#475569] dark:text-slate-300">
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				<span><strong class="text-[#0F172A] dark:text-white">Chrome Manifest V3</strong> — the latest and most secure extension platform</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				<span><strong class="text-[#0F172A] dark:text-white">EyeDropper API</strong> — Chrome 95+ native browser API for pixel-accurate color picking</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				<span><strong class="text-[#0F172A] dark:text-white">Machado 2009</strong> — peer-reviewed color blindness simulation verified against Chromium source</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				<span><strong class="text-[#0F172A] dark:text-white">Lightweight</strong> — no external dependencies at runtime. Fast to install, fast to load.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				<span><strong class="text-[#0F172A] dark:text-white">Light & dark mode</strong> — toggle in the popup header, persisted across sessions</span>
			</li>
		</ul>
	</div>
</section>

<!-- CTA -->
<section use:reveal class="mt-16">
	<div class="rounded-2xl border border-[#0891B2]/20 bg-[#0891B2]/5 p-8 text-center dark:border-[#22D3EE]/20 dark:bg-[#22D3EE]/5">
		<p class="font-display text-xl font-bold text-[#0F172A] dark:text-white">Try Color Picker</p>
		<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
			Free, private, and lightweight. Two permissions. Six tools in one popup.
		</p>
		<div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
			<a
				href="https://chromewebstore.google.com/detail/color-picker-%E2%80%94-arbenger/mjdifbicaidoofdighgfdnajphcbjnba"
				target="_blank"
				rel="noopener"
				class="inline-flex items-center gap-2 rounded-lg bg-[#0891B2] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0891B2]/90 dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:hover:bg-[#22D3EE]/90"
			>
				<img src="/icons/chrome.svg" alt="Chrome" width="18" height="18" class="shrink-0" />
				Add to Chrome
			</a>
			<a
				href="/products/color-picker/"
				class="inline-flex items-center gap-2 text-sm font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80"
			>
				Product page &rarr;
			</a>
		</div>
	</div>
</section>

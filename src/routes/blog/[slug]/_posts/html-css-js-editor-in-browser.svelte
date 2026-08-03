<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
</script>

<!-- INTRO -->
<section use:reveal>
	<p class="text-lg leading-relaxed text-[#475569] dark:text-slate-300">
		Arbenger HTML Editor is a free, browser-based editor for writing HTML, CSS, and JavaScript with a live preview that updates as you type. No account, no uploads, no server — your code never leaves your device. This guide walks through every feature.
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
				All code editing, formatting, linting, and previewing happens in your browser. Nothing is sent to a server. Your work persists in IndexedDB on your device.
			</p>
		</div>
	</div>
</section>

<!-- TABLE OF CONTENTS -->
<section use:reveal class="mt-12">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">What You'll Learn</h2>
	<nav class="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<ol class="space-y-2 text-sm">
			<li><a href="#editor" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">1. The Editor</a></li>
			<li><a href="#live-preview" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">2. Live Preview</a></li>
			<li><a href="#formatting" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">3. Prettier Formatting</a></li>
			<li><a href="#errors" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">4. Error Detection</a></li>
			<li><a href="#emmet" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">5. Emmet Abbreviations</a></li>
			<li><a href="#devices" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">6. Responsive Device Preview</a></li>
			<li><a href="#console" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">7. Built-in Console</a></li>
			<li><a href="#export" class="text-[#0891B2] hover:underline dark:text-[#22D3EE]">8. Export</a></li>
		</ol>
	</nav>
</section>

<!-- SECTION 1: THE EDITOR -->
<section use:reveal class="mt-16" id="editor">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">1. The Editor</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Three tabbed panes — HTML, CSS, and JavaScript — each powered by CodeMirror 6. You get syntax highlighting, auto-completion, bracket matching, code folding, and a custom theme that matches Arbenger's dark/light mode.
	</p>

	<!-- EDITOR MOCKUP -->
	<div class="mt-6 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<!-- TAB BAR -->
		<div class="flex items-center border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
			<div class="flex items-center gap-1.5 border-b-2 border-[#0891B2] px-4 py-2 text-xs font-medium text-[#0891B2] dark:border-[#22D3EE] dark:text-[#22D3EE]">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
				HTML
			</div>
			<div class="px-4 py-2 text-xs font-medium text-[#94A3B8] dark:text-slate-500">CSS</div>
			<div class="px-4 py-2 text-xs font-medium text-[#94A3B8] dark:text-slate-500">JS</div>
			<div class="flex-1" />
			<div class="mr-3 flex items-center gap-1 text-[10px] text-[#94A3B8] dark:text-slate-500">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/></svg>
				Format
			</div>
		</div>
		<!-- CODE AREA -->
		<div class="bg-[#0B0A23] p-4 font-mono text-xs leading-relaxed">
			<div class="flex">
				<div class="mr-4 select-none text-right text-[#475569]" style="min-width: 1.5rem;">
					<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
				</div>
				<div>
					<div><span class="text-[#f07178]">&lt;h1</span><span class="text-[#e2e8f0]">&gt;</span><span class="text-[#e2e8f0]">Hello, World!</span><span class="text-[#f07178]">&lt;/h1&gt;</span></div>
					<div><span class="text-[#f07178]">&lt;p</span> <span class="text-[#ffcb6b]">class</span><span class="text-[#89ddff]">=</span><span class="text-[#c3e88d]">"intro"</span><span class="text-[#e2e8f0]">&gt;</span></div>
					<div>&nbsp;&nbsp;<span class="text-[#e2e8f0]">Start editing to see</span></div>
					<div>&nbsp;&nbsp;<span class="text-[#e2e8f0]">your changes live.</span></div>
					<div><span class="text-[#f07178]">&lt;/p&gt;</span></div>
				</div>
			</div>
		</div>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		All three editors stay mounted when switching tabs — cursor position, scroll, and undo history are preserved.
	</p>
</section>

<!-- SECTION 2: LIVE PREVIEW -->
<section use:reveal class="mt-16" id="live-preview">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">2. Live Preview</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		The right panel shows a live preview that updates 300ms after you stop typing. Toggle between auto-run and manual mode with the play/pause button. Click the refresh icon to force a re-run.
	</p>

	<!-- PREVIEW MOCKUP -->
	<div class="mt-6 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<!-- TOOLBAR -->
		<div class="flex items-center gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
			<span class="text-xs font-medium text-[#64748b] dark:text-slate-500">Preview</span>
			<div class="flex-1" />
			<div class="rounded bg-[#0891B2]/10 px-2 py-0.5 text-[9px] font-semibold text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]">AUTO</div>
			<div class="h-3 w-px bg-[#E2E8F0] dark:bg-[#2A2578]" />
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-[#0891B2] dark:text-[#22D3EE]"><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="2" y="10" width="6" height="6" rx="1"/></svg>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-[#94A3B8] dark:text-slate-500"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-[#94A3B8] dark:text-slate-500"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
		</div>
		<!-- RENDERED OUTPUT -->
		<div class="bg-white p-6 dark:bg-white">
			<h3 class="text-2xl font-bold text-[#0891b2]">Hello, World!</h3>
			<p class="mt-2 text-sm text-[#475569]">Start editing to see your changes live.</p>
		</div>
	</div>
</section>

<!-- SECTION 3: PRETTIER FORMATTING -->
<section use:reveal class="mt-16" id="formatting">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">3. Prettier Formatting</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Click <strong class="text-[#0F172A] dark:text-white">Format</strong> in the editor toolbar or press <kbd class="rounded border border-[#E2E8F0] bg-[#F8FAFC] px-1.5 py-0.5 font-mono text-xs dark:border-[#2A2578] dark:bg-[#1E1A5E]">Shift+Alt+F</kbd> to format the active pane. <strong class="text-[#0F172A] dark:text-white">Format All</strong> formats HTML, CSS, and JavaScript at once.
	</p>

	<!-- BEFORE / AFTER -->
	<div class="mt-6 grid gap-4 sm:grid-cols-2">
		<!-- BEFORE -->
		<div class="overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
			<div class="border-b border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-[10px] font-medium text-[#94A3B8] dark:border-[#2A2578] dark:bg-[#1E1A5E]/20 dark:text-slate-500">BEFORE</div>
			<div class="bg-[#0B0A23] p-3 font-mono text-[11px] leading-relaxed text-[#e2e8f0]">
				<div><span class="text-[#f07178]">&lt;div</span> <span class="text-[#ffcb6b]">class</span><span class="text-[#89ddff]">=</span><span class="text-[#c3e88d]">"box"</span><span class="text-[#e2e8f0]">&gt;</span><span class="text-[#f07178]">&lt;p</span><span class="text-[#e2e8f0]">&gt;</span>text<span class="text-[#f07178]">&lt;/p&gt;&lt;/div&gt;</span></div>
			</div>
		</div>
		<!-- AFTER -->
		<div class="overflow-hidden rounded-xl border border-[#0891B2]/30 dark:border-[#22D3EE]/30">
			<div class="border-b border-[#0891B2]/20 bg-[#0891B2]/5 px-3 py-1.5 text-[10px] font-medium text-[#0891B2] dark:border-[#22D3EE]/20 dark:bg-[#22D3EE]/5 dark:text-[#22D3EE]">AFTER</div>
			<div class="bg-[#0B0A23] p-3 font-mono text-[11px] leading-relaxed text-[#e2e8f0]">
				<div><span class="text-[#f07178]">&lt;div</span> <span class="text-[#ffcb6b]">class</span><span class="text-[#89ddff]">=</span><span class="text-[#c3e88d]">"box"</span><span class="text-[#e2e8f0]">&gt;</span></div>
				<div>&nbsp;&nbsp;<span class="text-[#f07178]">&lt;p&gt;</span>text<span class="text-[#f07178]">&lt;/p&gt;</span></div>
				<div><span class="text-[#f07178]">&lt;/div&gt;</span></div>
			</div>
		</div>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		Prettier runs entirely in your browser via the standalone ESM build. No code is sent anywhere.
	</p>
</section>

<!-- SECTION 4: ERROR DETECTION -->
<section use:reveal class="mt-16" id="errors">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">4. Error Detection</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		The editor catches errors as you type. Each language has its own linter:
	</p>

	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<div class="rounded-xl border border-[#E2E8F0] p-4 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">HTML</p>
			<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">Unclosed tags, unmatched closing tags, missing required elements</p>
			<!-- MINI ERROR MOCKUP -->
			<div class="mt-3 rounded bg-[#0B0A23] p-2 font-mono text-[10px]">
				<div class="flex items-center gap-2">
					<span class="text-[#475569]">3</span>
					<span class="text-[#f07178]">&lt;div&gt;</span>
					<span class="rounded bg-[#f59e0b]/10 px-1 text-[8px] text-[#f59e0b]">Unclosed tag</span>
				</div>
			</div>
		</div>
		<div class="rounded-xl border border-[#E2E8F0] p-4 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">CSS</p>
			<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">Mismatched braces, unexpected closing braces</p>
			<div class="mt-3 rounded bg-[#0B0A23] p-2 font-mono text-[10px]">
				<div class="flex items-center gap-2">
					<span class="text-[#475569]">5</span>
					<span class="text-[#e2e8f0]">}}</span>
					<span class="rounded bg-[#ef4444]/10 px-1 text-[8px] text-[#ef4444]">Unexpected }</span>
				</div>
			</div>
		</div>
		<div class="rounded-xl border border-[#E2E8F0] p-4 dark:border-[#2A2578]">
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">JavaScript</p>
			<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">Syntax errors caught before execution via parse-only check</p>
			<div class="mt-3 rounded bg-[#0B0A23] p-2 font-mono text-[10px]">
				<div class="flex items-center gap-2">
					<span class="text-[#475569]">1</span>
					<span class="text-[#82aaff]">const</span> <span class="text-[#e2e8f0]">x =</span>
					<span class="rounded bg-[#ef4444]/10 px-1 text-[8px] text-[#ef4444]">Unexpected end</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- SECTION 5: EMMET -->
<section use:reveal class="mt-16" id="emmet">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">5. Emmet Abbreviations</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Type an Emmet abbreviation and press <kbd class="rounded border border-[#E2E8F0] bg-[#F8FAFC] px-1.5 py-0.5 font-mono text-xs dark:border-[#2A2578] dark:bg-[#1E1A5E]">Tab</kbd> to expand it. Works in both HTML and CSS panes.
	</p>

	<!-- EMMET EXAMPLES TABLE -->
	<div class="mt-6 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
					<th class="px-4 py-2 text-left text-xs font-medium text-[#94A3B8] dark:text-slate-500">Type</th>
					<th class="px-4 py-2 text-left text-xs font-medium text-[#94A3B8] dark:text-slate-500">Get</th>
				</tr>
			</thead>
			<tbody class="font-mono text-xs">
				<tr class="border-b border-[#E2E8F0] dark:border-[#2A2578]/50">
					<td class="px-4 py-2.5 text-[#0891B2] dark:text-[#22D3EE]">ul>li*3</td>
					<td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">&lt;ul&gt;&lt;li&gt;&lt;/li&gt; &times;3&lt;/ul&gt;</td>
				</tr>
				<tr class="border-b border-[#E2E8F0] dark:border-[#2A2578]/50">
					<td class="px-4 py-2.5 text-[#0891B2] dark:text-[#22D3EE]">div.card>h2+p</td>
					<td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">&lt;div class="card"&gt;&lt;h2&gt;+&lt;p&gt;&lt;/div&gt;</td>
				</tr>
				<tr class="border-b border-[#E2E8F0] dark:border-[#2A2578]/50">
					<td class="px-4 py-2.5 text-[#0891B2] dark:text-[#22D3EE]">m10</td>
					<td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">margin: 10px;</td>
				</tr>
				<tr>
					<td class="px-4 py-2.5 text-[#0891B2] dark:text-[#22D3EE]">bgc</td>
					<td class="px-4 py-2.5 text-[#475569] dark:text-slate-300">background-color: #fff;</td>
				</tr>
			</tbody>
		</table>
	</div>
</section>

<!-- SECTION 6: DEVICE PREVIEW -->
<section use:reveal class="mt-16" id="devices">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">6. Responsive Device Preview</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Test your layout at three fixed viewport sizes, each rendered inside a realistic device frame. A rotation toggle switches between portrait and landscape.
	</p>

	<!-- DEVICE CARDS -->
	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<!-- PHONE -->
		<div class="flex flex-col items-center rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<div class="mb-3 flex h-20 w-10 flex-col items-center rounded-[10px] bg-[#1a1a2e] p-1">
				<div class="mb-0.5 h-1 w-4 rounded-full bg-[#0d0d1a]" />
				<div class="flex-1 w-full rounded-[6px] bg-white" />
				<div class="mt-0.5 h-0.5 w-4 rounded-full bg-[#3a3a5e]" />
			</div>
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Mobile</p>
			<p class="text-xs text-[#64748B] dark:text-slate-400">375 &times; 667</p>
		</div>
		<!-- TABLET -->
		<div class="flex flex-col items-center rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<div class="mb-3 flex h-20 w-14 flex-col items-center rounded-[6px] bg-[#1a1a2e] p-1.5">
				<div class="mb-0.5 h-0.5 w-0.5 rounded-full bg-[#3a3a5e]" />
				<div class="flex-1 w-full rounded-[3px] bg-white" />
			</div>
			<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Tablet</p>
			<p class="text-xs text-[#64748B] dark:text-slate-400">768 &times; 1024</p>
		</div>
		<!-- DESKTOP -->
		<div class="flex flex-col items-center rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<div class="mb-1 flex flex-col items-center">
				<div class="flex h-12 w-20 flex-col items-center rounded-t bg-[#1a1a2e] p-1">
					<div class="mb-0.5 h-0.5 w-0.5 rounded-full bg-[#3a3a5e]" />
					<div class="flex-1 w-full rounded-[1px] bg-white" />
				</div>
				<div class="h-2 w-3 bg-[#1a1a2e]" />
				<div class="h-0.5 w-8 rounded-b bg-[#1a1a2e]" />
			</div>
			<p class="font-display mt-2 text-sm font-bold text-[#0F172A] dark:text-white">Desktop</p>
			<p class="text-xs text-[#64748B] dark:text-slate-400">1440 &times; 900</p>
		</div>
	</div>
</section>

<!-- SECTION 7: CONSOLE -->
<section use:reveal class="mt-16" id="console">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">7. Built-in Console</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		A collapsible console panel below the preview captures <code class="rounded bg-[#F1F5F9] px-1 py-0.5 text-xs dark:bg-[#1E1A5E]">console.log</code>, <code class="rounded bg-[#F1F5F9] px-1 py-0.5 text-xs dark:bg-[#1E1A5E]">warn</code>, <code class="rounded bg-[#F1F5F9] px-1 py-0.5 text-xs dark:bg-[#1E1A5E]">error</code>, and <code class="rounded bg-[#F1F5F9] px-1 py-0.5 text-xs dark:bg-[#1E1A5E]">info</code> output from your JavaScript. Runtime errors and unhandled promise rejections are captured too.
	</p>

	<!-- CONSOLE MOCKUP -->
	<div class="mt-6 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]">
		<div class="flex items-center gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
			<span class="text-xs font-medium text-[#64748b] dark:text-slate-500">Console</span>
			<span class="rounded-full bg-[#ef4444]/10 px-1.5 py-0.5 text-[9px] font-medium text-[#ef4444]">1</span>
			<div class="flex-1" />
		</div>
		<div class="bg-[#0B0A23] font-mono text-xs">
			<div class="flex items-start gap-2 border-b border-[#1E1A5E]/50 px-3 py-1.5 text-[#e2e8f0]">
				<span>Hello from Arbenger HTML Editor!</span>
			</div>
			<div class="flex items-start gap-2 border-b border-[#1E1A5E]/50 bg-[#f59e0b]/5 px-3 py-1.5 text-[#f59e0b]">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 h-3 w-3 shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
				<span>Deprecation warning: use addEventListener instead</span>
			</div>
			<div class="flex items-start gap-2 bg-[#ef4444]/5 px-3 py-1.5 text-[#ef4444]">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 h-3 w-3 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
				<span>ReferenceError: foo is not defined (line 4)</span>
			</div>
		</div>
	</div>

	<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
		Filter by level (All / Log / Warn / Error / Info) and clear with one click. The console auto-clears when the preview re-renders.
	</p>
</section>

<!-- SECTION 8: EXPORT -->
<section use:reveal class="mt-16" id="export">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">8. Export</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Two export options, both client-side:
	</p>

	<div class="mt-6 grid gap-4 sm:grid-cols-2">
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<div class="mb-2 flex items-center gap-2">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-[#0891B2] dark:text-[#22D3EE]"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
				<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">ZIP</p>
			</div>
			<p class="text-xs text-[#64748B] dark:text-slate-400">
				Three separate files: <code class="text-[#0891B2] dark:text-[#22D3EE]">index.html</code>, <code class="text-[#0891B2] dark:text-[#22D3EE]">style.css</code>, <code class="text-[#0891B2] dark:text-[#22D3EE]">script.js</code>. Ready to open in any code editor.
			</p>
		</div>
		<div class="rounded-xl border border-[#E2E8F0] p-5 dark:border-[#2A2578]">
			<div class="mb-2 flex items-center gap-2">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-[#0891B2] dark:text-[#22D3EE]"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
				<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Standalone HTML</p>
			</div>
			<p class="text-xs text-[#64748B] dark:text-slate-400">
				Single <code class="text-[#0891B2] dark:text-[#22D3EE]">index.html</code> file with CSS in a <code class="text-[#0891B2] dark:text-[#22D3EE]">&lt;style&gt;</code> tag and JS in a <code class="text-[#0891B2] dark:text-[#22D3EE]">&lt;script&gt;</code> tag. Open directly in a browser.
			</p>
		</div>
	</div>
</section>

<!-- WHY WE BUILT THIS -->
<section use:reveal class="mt-16" id="why">
	<h2 class="font-display text-2xl font-bold text-[#0F172A] dark:text-white">Why We Built This</h2>

	<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
		Most online HTML editors either paywall basic features like private pens, or load 5-10MB of IDE framework for a task that should be instant. We wanted something in between: a clean editor with real developer tools (Prettier, linting, Emmet, device preview) that loads fast, works offline, and never touches your code.
	</p>

	<!-- TECH DETAILS -->
	<div class="mt-8 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
		<p class="font-display text-sm font-bold text-[#0F172A] dark:text-white">Under the Hood</p>
		<ul class="mt-3 space-y-2 text-sm text-[#475569] dark:text-slate-300">
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				<span><strong class="text-[#0F172A] dark:text-white">CodeMirror 6</strong> — modular editor core (~300KB vs Monaco's 5-10MB). Mobile-first, accessible.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				<span><strong class="text-[#0F172A] dark:text-white">Prettier Standalone</strong> — same formatter used by most professional codebases, compiled to run in the browser.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				<span><strong class="text-[#0F172A] dark:text-white">Sandboxed iframe</strong> — preview runs in an isolated iframe. User code cannot access the host page.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				<span><strong class="text-[#0F172A] dark:text-white">IndexedDB persistence</strong> — your code auto-saves to your browser. No cloud, no login.</span>
			</li>
		</ul>
	</div>
</section>

<!-- CTA -->
<section use:reveal class="mt-16">
	<div class="rounded-2xl border border-[#0891B2]/20 bg-[#0891B2]/5 p-8 text-center dark:border-[#22D3EE]/20 dark:bg-[#22D3EE]/5">
		<p class="font-display text-xl font-bold text-[#0F172A] dark:text-white">Try the HTML Editor</p>
		<p class="mt-2 text-sm text-[#475569] dark:text-slate-300">
			Free, private, and instant. No signup required.
		</p>
		<div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
			<a
				href="/products/html-editor/"
				class="inline-flex items-center gap-2 rounded-lg bg-[#0891B2] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0891B2]/90 dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:hover:bg-[#22D3EE]/90"
			>
				Open HTML Editor
			</a>
			<a
				href="/projects/"
				class="inline-flex items-center gap-2 text-sm font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80"
			>
				All projects &rarr;
			</a>
		</div>
	</div>
</section>

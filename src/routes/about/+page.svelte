<script lang="ts">
	// IMPORTED MODULES
	import { reveal, revealSlide } from '$lib/actions/reveal';

	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<MetaTags
	title="About Arbenger — Who We Are & What We Build"
	description="Arbenger builds VS Code extensions, Chrome plugins, AI tools, and web apps. Learn about our approach to making software tools that stay out of your way."
	url="https://arbenger.com/about"
/>

<Breadcrumbs pageName="About" pageUrl="https://arbenger.com/about" />

<!-- PAGE HERO -->
<section class="relative overflow-hidden pt-32 pb-16">
	<!-- GEOMETRIC BACKGROUND — ANGULAR LINES FROM TOP-RIGHT -->
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<svg viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 right-0 hidden h-75 w-200 md:block" preserveAspectRatio="none">
			<line x1="800" y1="0" x2="500" y2="200" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.12" />
			<line x1="800" y1="0" x2="600" y2="280" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.08" />
			<line x1="800" y1="0" x2="700" y2="300" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.1" />
			<line x1="800" y1="0" x2="400" y2="120" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.3" opacity="0.06" />
			<circle cx="500" cy="200" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" />
			<circle cx="600" cy="280" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
			<circle cx="700" cy="300" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.12" />
			<circle cx="400" cy="120" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
		</svg>
	</div>

	<div use:reveal class="relative mx-auto max-w-7xl px-6 lg:px-8">
		<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">About</p>

		<h1 class="font-display mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			About Arbenger
		</h1>

		<p class="mt-6 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			We make software tools. Here's what that looks like.
		</p>
	</div>
</section>

<!-- WHAT WE DO SECTION -->
<section class="relative overflow-hidden py-16">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid items-start gap-12 lg:grid-cols-2">
			<!-- COMPANY INFO -->
			<div use:revealSlide={{ direction: 'left' }}>
				<h2 class="font-display text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">What we do</h2>

				<p class="mt-6 text-[#475569] dark:text-slate-300">
					Arbenger builds VS Code extensions, Chrome plugins, AI tools, and web apps.
					Each product covers a different need, but they share the same approach —
					keep it clean, keep it useful.
				</p>
			</div>

			<!-- CATEGORY INFO CARD -->
			<div use:revealSlide={{ direction: 'right' }} class="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.06)] sm:p-6 dark:border-[#2A2578] dark:bg-[#1E1A5E] dark:shadow-none">
				<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Product categories</p>
				<ul class="mt-4 space-y-3 text-sm text-[#475569] dark:text-slate-300">
					<li class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							<svg class="size-4 text-[#0891B2] dark:text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
						</span>
						VS Code Extensions
					</li>
					<li class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							<svg class="size-4 text-[#0891B2] dark:text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 7h10v10H7z" /></svg>
						</span>
						Chrome Plugins
					</li>
					<li class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							<svg class="size-4 text-[#0891B2] dark:text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3 4 4.5 4.5 0 0 1-3-4"/><path d="M12 18v4"/></svg>
						</span>
						AI Tools
					</li>
					<li class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							<svg class="size-4 text-[#0891B2] dark:text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
						</span>
						Misc Tools
					</li>
					<li class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							<svg class="size-4 text-[#0891B2] dark:text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
						</span>
						SaaS Products
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- WHAT TO EXPECT SECTION -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div use:reveal>
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Our approach</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">What to expect.</h2>
		</div>

		<!-- 3-CARD GRID: 1 LARGE + 2 SMALL -->
		<div class="mt-12 grid gap-8 md:grid-cols-5">
			<!-- LARGE CARD -->
			<div use:reveal={{ delay: 100 }} class="rounded-xl border border-[#F1F5F9] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] sm:p-8 md:col-span-3 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<h3 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">Does what it says</h3>
				<p class="mt-3 text-[#475569] dark:text-slate-300">
					No hidden complexity. If a tool says it does something, that's what it does.
				</p>
			</div>

			<!-- SMALL CARD -->
			<div use:reveal={{ delay: 200 }} class="rounded-xl border border-[#F1F5F9] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] sm:p-8 md:col-span-2 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<h3 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">Kept up to date</h3>
				<p class="mt-3 text-[#475569] dark:text-slate-300">
					Products get regular updates and fixes.
				</p>
			</div>

			<!-- SMALL CARD -->
			<div use:reveal={{ delay: 300 }} class="rounded-xl border border-[#F1F5F9] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] sm:p-8 md:col-span-2 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<h3 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">Feedback welcome</h3>
				<p class="mt-3 text-[#475569] dark:text-slate-300">
					Something not right? Let us know. That's how things get better.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]">
	<div use:reveal class="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 lg:px-8">
		<p class="text-lg text-[#475569] dark:text-slate-300">
			Got a question?
		</p>
		<Button href="/contact" variant="secondary">Get in touch</Button>
	</div>
</section>

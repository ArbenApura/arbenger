<script lang="ts">
	// IMPORTED MODULES
	import { reveal, revealSlide } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<MetaTags
	title="About Arbenger | Company & Founder"
	description="Learn about Arbenger, a solo venture by Arben Apura focused on building AI tools, developer extensions, and SaaS products."
	url="https://arbenger.com/about"
/>

<!-- PAGE HERO -->
<section class="relative pt-32 pb-16">
	<div use:reveal class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">About</p>

		<h1 class="font-display mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			One developer. Real products. That's the whole story.
		</h1>

		<p class="mt-6 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			Arbenger is a solo operation by Arben Apura. No investors, no board meetings,
			no roadmap decks. Just building.
		</p>
	</div>
</section>

<!-- FOUNDER SECTION -->
<section class="relative py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-start gap-12 lg:grid-cols-2">
			<!-- FOUNDER INFO -->
			<div use:revealSlide={{ direction: 'left' }}>
				<h2 class="font-display text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">Arben Apura</h2>
				<p class="mt-2 font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Founder & Developer</p>

				<p class="mt-6 text-[#475569] dark:text-slate-300">
					I got into this because I kept running into tools that were almost right but not quite.
					The VS Code extension that was 80% there. The AI wrapper that missed the point.
					The SaaS app that felt like it was built by people who never used their own product.
				</p>

				<p class="mt-4 text-[#475569] dark:text-slate-300">
					So I started building my own. Every product here exists because I needed it first.
					If it solves my problem well, it'll probably solve yours too.
				</p>

				<p class="mt-4 text-[#64748B] dark:text-slate-400">
					Stack: TypeScript, Svelte, whatever AI model is actually good this week.
					Philosophy: ship it, use it, fix it, repeat.
				</p>
			</div>

			<!-- DECORATIVE TERMINAL CARD -->
			<div use:revealSlide={{ direction: 'right' }} class="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.06)] dark:border-[#2A2578] dark:bg-[#1E1A5E] dark:shadow-none">
				<div class="flex items-center gap-2">
					<div class="h-3 w-3 rounded-full bg-[#EF4444]"></div>
					<div class="h-3 w-3 rounded-full bg-[#F59E0B]"></div>
					<div class="h-3 w-3 rounded-full bg-[#22C55E]"></div>
				</div>
				<div class="mt-4 font-mono text-sm text-[#475569] dark:text-slate-300">
					<p><span class="text-[#0891B2] dark:text-[#22D3EE]">$</span> whoami</p>
					<p class="mt-1 text-[#0F172A] dark:text-white">arben-apura</p>
					<p class="mt-3"><span class="text-[#0891B2] dark:text-[#22D3EE]">$</span> cat role.txt</p>
					<p class="mt-1 text-[#0F172A] dark:text-white">solo dev, shipping real things</p>
					<p class="mt-3"><span class="text-[#0891B2] dark:text-[#22D3EE]">$</span> cat stack.txt</p>
					<p class="mt-1 text-[#0F172A] dark:text-white">TypeScript, Svelte, AI/ML, Extensions</p>
					<p class="mt-3"><span class="text-[#0891B2] dark:text-[#22D3EE]">$</span> cat philosophy.txt</p>
					<p class="mt-1 text-[#0F172A] dark:text-white">if it doesn't exist, build it</p>
					<p class="mt-3">
						<span class="text-[#0891B2] dark:text-[#22D3EE]">$</span>
						<span class="animate-blink">_</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- HOW I WORK SECTION — REPLACES GENERIC MISSION CARDS -->
<section class="relative border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div use:reveal>
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">How I work</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">No process. Just principles.</h2>
		</div>

		<!-- ASYMMETRIC LAYOUT — NOT A 3-COLUMN CARD GRID -->
		<div class="mt-12 grid gap-8 md:grid-cols-5">
			<!-- LARGE CARD -->
			<div use:reveal={{ delay: 100 }} class="rounded-xl border border-[#F1F5F9] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] md:col-span-3 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<h3 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">I use what I build</h3>
				<p class="mt-3 text-[#475569] dark:text-slate-300">
					Every tool starts as something I need. If I'm not using it daily, it's not ready to ship.
					That's the bar. No hypothetical users, no assumed workflows. Real usage, real feedback, real iteration.
				</p>
			</div>

			<!-- SMALL CARD -->
			<div use:reveal={{ delay: 200 }} class="rounded-xl border border-[#F1F5F9] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] md:col-span-2 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<h3 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">Ship small, ship often</h3>
				<p class="mt-3 text-[#475569] dark:text-slate-300">
					No six-month stealth modes. Build the core, ship it, learn from it.
					The best version is the one people can actually use.
				</p>
			</div>

			<!-- SMALL CARD -->
			<div use:reveal={{ delay: 300 }} class="rounded-xl border border-[#F1F5F9] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] md:col-span-2 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<h3 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">Solo doesn't mean sloppy</h3>
				<p class="mt-3 text-[#475569] dark:text-slate-300">
					One person means every line of code has intent.
					No handoffs, no "someone else will fix this." I own every pixel.
				</p>
			</div>

			<!-- LARGE CARD -->
			<div use:reveal={{ delay: 400 }} class="rounded-xl border border-[#F1F5F9] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] md:col-span-3 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<h3 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">Build in public</h3>
				<p class="mt-3 text-[#475569] dark:text-slate-300">
					I share what I'm working on, what's broken, what I'm learning.
					Not for clout -- because it keeps me honest and helps other devs doing the same thing.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="relative border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]">
	<div use:reveal class="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 lg:px-8">
		<p class="text-lg text-[#475569] dark:text-slate-300">
			Want to follow along or just say hey?
		</p>
		<Button href="/contact" variant="secondary">Get in touch</Button>
	</div>
</section>

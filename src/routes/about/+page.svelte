<script lang="ts">
	// IMPORTED MODULES
	import { socialLinks } from '$lib/data/navigation';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	// -- CONSTANTS -- //

	// BRAND ICONS NOT AVAILABLE IN LUCIDE V1+; INLINE SVG PATHS USED INSTEAD
	const SOCIAL_ICONS: Record<string, string> = {
		github: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
		twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
		linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
	};
</script>

<MetaTags
	title="About Arbenger | Company & Founder"
	description="Learn about Arbenger, a solo venture by Arben Apura focused on building AI tools, developer extensions, and SaaS products."
	url="https://arbenger.com/about"
/>

<!-- PAGE HERO -->
<section class="relative pt-32 pb-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionLabel label="ABOUT" />

		<h1 class="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
			About Arbenger
		</h1>

		<p class="mt-6 max-w-2xl text-lg text-slate-300">
			A solo venture dedicated to building tools that empower developers and creators.
		</p>
	</div>
</section>

<!-- FOUNDER SECTION -->
<section class="relative py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionLabel label="FOUNDER" />

		<div class="grid items-start gap-12 lg:grid-cols-2">
			<!-- FOUNDER INFO -->
			<div>
				<h2 class="font-display text-3xl font-bold tracking-tight text-white">
					Arben Apura
				</h2>
				<p class="mt-2 font-mono text-sm text-[#22D3EE]">Founder & Developer</p>

				<p class="mt-6 text-slate-300">
					A passionate developer and creator building tools at the intersection of
					AI, developer experience, and productivity. Every product at Arbenger starts
					with a simple question: how can we make this better?
				</p>

				<p class="mt-4 text-slate-300">
					With a focus on clean code, thoughtful design, and real utility, Arbenger
					products are crafted to solve problems that developers and creators face every day.
				</p>
			</div>

			<!-- DECORATIVE TERMINAL CARD -->
			<div class="rounded-xl border border-[#2A2578] bg-[#1E1A5E] p-6">
				<div class="flex items-center gap-2">
					<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
					<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
					<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				</div>
				<div class="mt-4 font-mono text-sm text-slate-300">
					<p><span class="text-[#22D3EE]">$</span> whoami</p>
					<p class="mt-1 text-white">arben-apura</p>
					<p class="mt-3"><span class="text-[#22D3EE]">$</span> cat role.txt</p>
					<p class="mt-1 text-white">Founder & Developer @ Arbenger</p>
					<p class="mt-3"><span class="text-[#22D3EE]">$</span> cat stack.txt</p>
					<p class="mt-1 text-white">TypeScript, Svelte, AI/ML, Extensions</p>
					<p class="mt-3"><span class="text-[#22D3EE]">$</span> cat mission.txt</p>
					<p class="mt-1 text-white">Building the tools of tomorrow</p>
					<p class="mt-3">
						<span class="text-[#22D3EE]">$</span>
						<span class="animate-blink">_</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- MISSION SECTION -->
<section class="relative border-t border-[#2A2578] py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionLabel label="MISSION" />

		<h2 class="font-display text-3xl font-bold tracking-tight text-white">
			Why we build
		</h2>

		<div class="mt-8 grid gap-8 md:grid-cols-3">
			<!-- MISSION CARD 1 -->
			<div class="rounded-xl border border-[#2A2578] bg-[#1E1A5E] p-6">
				<h3 class="font-display text-lg font-bold tracking-tight text-white">Developer First</h3>
				<p class="mt-3 text-sm text-slate-300">
					Every tool is designed with developers in mind. Clean APIs, thoughtful UX,
					and documentation that actually helps.
				</p>
			</div>

			<!-- MISSION CARD 2 -->
			<div class="rounded-xl border border-[#2A2578] bg-[#1E1A5E] p-6">
				<h3 class="font-display text-lg font-bold tracking-tight text-white">Quality Over Quantity</h3>
				<p class="mt-3 text-sm text-slate-300">
					We ship fewer products, but each one is polished and purposeful. No bloat,
					no unnecessary complexity.
				</p>
			</div>

			<!-- MISSION CARD 3 -->
			<div class="rounded-xl border border-[#2A2578] bg-[#1E1A5E] p-6">
				<h3 class="font-display text-lg font-bold tracking-tight text-white">Open & Transparent</h3>
				<p class="mt-3 text-sm text-slate-300">
					We believe in open source and transparent development. Building in public
					and sharing what we learn along the way.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- SOCIAL LINKS SECTION -->
<section class="relative border-t border-[#2A2578] py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionLabel label="CONNECT" />

		<h2 class="font-display text-3xl font-bold tracking-tight text-white">
			Find us online
		</h2>

		<div class="mt-8 flex flex-wrap gap-4">
			{#each socialLinks as social}
				<a
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-3 rounded-lg border border-[#2A2578] px-5 py-3 text-slate-300 transition-all duration-300 hover:border-[#22D3EE]/50 hover:text-[#22D3EE]"
					aria-label={social.platform}
				>
					<svg class="size-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d={SOCIAL_ICONS[social.icon]} />
					</svg>
					<span class="text-sm font-medium">{social.platform}</span>
				</a>
			{/each}
		</div>

		<div class="mt-8">
			<Button href="/contact" variant="secondary">Get in touch</Button>
		</div>
	</div>
</section>

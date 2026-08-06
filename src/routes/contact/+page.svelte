<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Mail, Phone, MapPin } from 'lucide-svelte';

	// IMPORTED MODULES
	import { socialLinks } from '$lib/data/navigation';
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import PlatformCard from '$lib/components/ui/PlatformCard.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';
</script>

<MetaTags
	title="Contact — Arben Apura"
	description="Get in touch with Arben Apura — full-stack web developer. Email, phone, and professional profiles on Upwork, LinkedIn, and GitHub. Open to new opportunities."
	url="{SITE_URL}/contact/"
/>

<Breadcrumbs pageName="Contact" pageUrl="{SITE_URL}/contact/" />

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: 'Contact Arben Apura',
		url: `${SITE_URL}/contact/`,
		description: 'Get in touch with Arben Apura — full-stack web developer.',
		mainEntity: {
			'@type': 'Person',
			name: 'Arben M. Apura',
			url: SITE_URL,
			email: 'mailto:arbenapura.official@gmail.com',
			telephone: '+639764304619',
			sameAs: socialLinks.map((l) => l.url),
		},
	}}
/>

<!-- PAGE HERO -->
<section class="relative overflow-hidden pt-32 pb-16">
	<div use:reveal class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Contact</p>

		<h1 class="font-display mt-4 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			Say Hello
		</h1>

		<p class="mt-6 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			Let's build something together. I'm open to full-time roles and new projects — remote and worldwide.
		</p>
	</div>
</section>

<!-- CONTACT INFO -->
<section class="relative overflow-hidden pb-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- EMAIL — PRIMARY CONTACT -->
		<div use:reveal={{ delay: 100 }} class="max-w-2xl rounded-xl border border-[#F1F5F9] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.06)] sm:p-8 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
			<div class="flex items-center gap-4">
				<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
					<Mail class="size-6 text-[#0891B2] dark:text-[#22D3EE]" />
				</div>
				<div>
					<h2 class="font-display text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">Email</h2>
					<p class="mt-1 text-sm text-[#64748B] dark:text-slate-400">I'll get back to you as soon as I can.</p>
				</div>
			</div>

			<a
				href="mailto:arbenapura.official@gmail.com"
				class="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#0891B2] px-5 py-3 text-sm font-medium text-[#0891B2] transition-all duration-300 hover:bg-[#0891B2]/10 dark:border-[#22D3EE] dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/10"
			>
				<Mail class="size-4" />
				arbenapura.official@gmail.com
			</a>
		</div>

		<!-- PHONE + LOCATION -->
		<div use:reveal={{ delay: 150 }} class="mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
			<div class="rounded-xl border border-[#F1F5F9] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<div class="flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<Phone class="size-5 text-[#0891B2] dark:text-[#22D3EE]" />
					</div>
					<div>
						<h2 class="font-display text-sm font-bold tracking-tight text-[#0F172A] dark:text-white">Phone</h2>
						<a
							href="tel:+639764304619"
							class="mt-0.5 block text-sm text-[#64748B] transition-colors hover:text-[#0891B2] dark:text-slate-400 dark:hover:text-[#22D3EE]"
						>
							+63 976 430 4619
						</a>
					</div>
				</div>
			</div>

			<div class="rounded-xl border border-[#F1F5F9] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<div class="flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<MapPin class="size-5 text-[#0891B2] dark:text-[#22D3EE]" />
					</div>
					<div>
						<h2 class="font-display text-sm font-bold tracking-tight text-[#0F172A] dark:text-white">Location</h2>
						<p class="mt-0.5 text-sm text-[#64748B] dark:text-slate-400">San Jose Del Monte, Bulacan, PH · Remote</p>
					</div>
				</div>
			</div>
		</div>

		<!-- PROFESSIONAL PROFILES -->
		<div use:reveal={{ delay: 200 }} class="mt-12">
			<p class="font-mono text-sm text-[#64748B] dark:text-slate-400">Or find me here</p>

			<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each socialLinks as platform, i}
					<PlatformCard {platform} delay={i * 80} />
				{/each}
			</div>
		</div>
	</div>
</section>

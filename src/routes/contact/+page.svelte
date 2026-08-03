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

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// BRAND ICONS NOT AVAILABLE IN LUCIDE V1+; INLINE SVG PATHS USED INSTEAD
	const SOCIAL_ICONS: Record<string, string> = {
		github: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
		facebook:
			'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
	};
</script>

<MetaTags
	title="Contact — Arben Apura"
	description="Get in touch with Arben Apura — full-stack web developer. Email, phone, GitHub, and Facebook. Available for freelance work."
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
			email: 'arbenapura.official@gmail.com',
			telephone: '+639764304619',
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
			Let's build something together. I'm currently available for freelance projects and full-time roles.
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

		<!-- SOCIAL LINKS -->
		<div use:reveal={{ delay: 200 }} class="mt-12">
			<p class="font-mono text-sm text-[#64748B] dark:text-slate-400">Or find me here</p>

			<div class="mt-4 flex flex-wrap gap-4">
				{#each socialLinks as social}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white px-5 py-3 text-[#475569] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#0891B2]/50 hover:text-[#0891B2] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:border-[#2A2578] dark:bg-transparent dark:text-slate-300 dark:shadow-none dark:hover:border-[#22D3EE]/50 dark:hover:text-[#22D3EE]"
						aria-label={social.platform}
					>
						<svg class="size-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d={SOCIAL_ICONS[social.icon]} />
						</svg>
						<span class="text-sm font-medium">{social.platform}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED MODULES
	import { socialLinks } from '$lib/data/navigation';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import FeaturedProjects from '$lib/components/home/FeaturedProjects.svelte';
	import MinorTools from '$lib/components/home/MinorTools.svelte';
	import Skills from '$lib/components/home/Skills.svelte';
	import AboutTeaser from '$lib/components/home/AboutTeaser.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import GeometricDivider from '$lib/components/ui/GeometricDivider.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';
</script>

<MetaTags
	title="Arben Apura — Full-Stack Web Developer"
	description="Full-stack web developer from the Philippines building web apps, AI tools, and Chrome extensions. SvelteKit, Next.js, TypeScript."
	url={SITE_URL}
/>

<!-- PERSON JSON-LD (HOMEPAGE ONLY) -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Arben M. Apura',
		url: SITE_URL,
		jobTitle: 'Full-Stack Web Developer',
		email: 'mailto:arbenapura.official@gmail.com',
		telephone: '+639764304619',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'San Jose del Monte',
			addressRegion: 'Bulacan',
			addressCountry: 'PH',
		},
		knowsAbout: ['SvelteKit', 'Next.js', 'TypeScript', 'Supabase', 'Firebase', 'Capacitor', 'OpenAI API'],
		sameAs: socialLinks.map((l) => l.url),
	}}
/>

<!-- HERO -->
<Hero />

<!-- FEATURED PROJECTS -->
<FeaturedProjects />

<!-- MINOR TOOLS -->
<MinorTools />

<!-- SKILLS -->
<Skills />

<!-- ABOUT TEASER -->
<AboutTeaser />

<!-- CONNECT CTA WITH GEOMETRIC MESH BACKGROUND -->
<GeometricDivider>
	<div use:reveal class="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center lg:px-8">
		<p class="text-lg text-[#475569] dark:text-slate-300">
			Let's build something.
		</p>
		<Button href="/contact/" variant="primary">Get in Touch</Button>
	</div>
</GeometricDivider>

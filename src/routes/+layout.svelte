<script lang="ts">
	// IMPORTED MODULES
	import '../app.css';

	// IMPORTED COMPONENTS
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
</script>

<!-- SITEWIDE JSON-LD -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Arbenger',
		url: 'https://arbenger.com'
	}}
/>

<!-- SKIP TO CONTENT -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[#22D3EE] focus:px-4 focus:py-2 focus:text-[#0B0A23]"
>
	Skip to content
</a>

<Navbar />

<!-- MAIN CONTENT -->
<main id="main-content">
	<slot />
</main>

<Footer />

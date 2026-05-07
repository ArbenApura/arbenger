<script lang="ts">
	// IMPORTED COMPONENTS
	import Button from '$lib/components/ui/Button.svelte';
	import GridBackground from '$lib/components/home/GridBackground.svelte';
</script>

<!-- HERO SECTION -->
<section class="relative flex min-h-screen items-center justify-center overflow-hidden">
	<GridBackground />

	<!-- NOISE TEXTURE OVERLAY — SVG NOISE FILTER CANNOT BE EXPRESSED AS A TAILWIND CLASS -->
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
		style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E&quot;);"
		aria-hidden="true"
	></div>

	<!-- HERO CONTENT -->
	<div class="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<!-- TAGLINE -->
		<h1 class="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
			Building the tools
			<br />
			of tomorrow
			<!-- BLINKING CURSOR -->
			<span class="animate-blink ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.05em] bg-[#22D3EE]"></span>
		</h1>

		<!-- SUBTITLE -->
		<p class="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
			AI tools, developer extensions, and SaaS products crafted for developers and creators.
		</p>

		<!-- CTA BUTTONS -->
		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button href="/products" variant="primary">Explore Products</Button>
			<Button href="/about" variant="secondary">About Us</Button>
		</div>
	</div>
</section>

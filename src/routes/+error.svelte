<script lang="ts">
	// IMPORTED DEP-MODULES
	import { page } from '$app/stores';

	// IMPORTED COMPONENTS
	import Button from '$lib/components/ui/Button.svelte';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
	<title>{$page.status} | Arben Apura</title>
</svelte:head>

<!-- ERROR PAGE -->
<section class="flex min-h-screen items-center justify-center">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<!-- ERROR CODE -->
		<h1 class="font-display text-8xl font-bold tracking-tight text-[#0F172A] md:text-9xl dark:text-[#22D3EE]">
			{$page.status}
		</h1>

		<!-- ERROR MESSAGE -->
		<p class="mt-6 text-lg text-[#475569] dark:text-slate-300">
			{$page.error?.message || 'Something went wrong'}
		</p>

		<!-- CTA -->
		<div class="mt-10">
			<Button href="/" variant="primary">Go home</Button>
		</div>
	</div>
</section>

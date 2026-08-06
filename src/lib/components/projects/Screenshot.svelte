<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount } from 'svelte';

	// -- REQUIRED PROPS -- //

	export let src: string;
	export let alt: string;
	export let onResolve: (isLandscape: boolean) => void;

	// -- OPTIONAL PROPS -- //

	export let extraClass: string = '';

	// -- STATES -- //

	let imgEl: HTMLImageElement;

	// -- LIFECYCLES -- //

	onMount(() => {
		// Cached images may have finished loading before hydration attached on:load.
		if (imgEl.complete && imgEl.naturalWidth > 0) {
			onResolve(imgEl.naturalWidth > imgEl.naturalHeight);
		}
	});

	// -- FUNCTIONS -- //

	function handleLoad(e: Event) {
		const img = e.currentTarget as HTMLImageElement;
		onResolve(img.naturalWidth > img.naturalHeight);
	}

	function handleError() {
		// Failed loads are treated as portrait so the gallery still renders.
		onResolve(false);
	}
</script>

<img
	bind:this={imgEl}
	{src}
	{alt}
	loading="lazy"
	on:load={handleLoad}
	on:error={handleError}
	class="w-full rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]/60 {extraClass}"
/>

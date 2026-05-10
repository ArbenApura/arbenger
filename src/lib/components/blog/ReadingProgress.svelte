<script lang="ts">
	// -- STATES -- //

	let scrollY = 0;
	let winHeight = 0;

	// -- REACTIVE STATES -- //

	$: docHeight = scrollY >= 0 && typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0;

	$: progress = docHeight > winHeight ? Math.min((scrollY / (docHeight - winHeight)) * 100, 100) : 0;
</script>

<svelte:window bind:scrollY bind:innerHeight={winHeight} />

<!-- TOP READING PROGRESS BAR -->
<div class="fixed top-0 right-0 left-0 z-[60] h-[2px] bg-transparent">
	<!-- PROGRESS FILL — DYNAMIC WIDTH REQUIRES INLINE STYLE -->
	<div
		class="h-full bg-[#0891B2] transition-[width] duration-150 ease-out dark:bg-[#22D3EE]"
		style="width: {progress}%;"
	/>
</div>

<!-- BOTTOM READING PROGRESS BAR -->
<div class="fixed right-0 bottom-0 left-0 z-[60] h-[3px] bg-[#E2E8F0]/50 dark:bg-[#2A2578]/50">
	<!-- PROGRESS FILL — DYNAMIC WIDTH REQUIRES INLINE STYLE -->
	<div
		class="h-full bg-[#0891B2] transition-[width] duration-150 ease-out dark:bg-[#22D3EE]"
		style="width: {progress}%;"
	/>
</div>

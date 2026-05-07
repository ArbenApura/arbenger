<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Sun, Moon } from 'lucide-svelte';

	// IMPORTED MODULES
	import { isDark } from '$lib/stores/theme';
</script>

<!-- THEME TOGGLE BUTTON -->
<button
	on:click={() => isDark.toggle()}
	class="rounded-lg p-2 text-[#475569] transition-colors duration-200 hover:bg-black/5 hover:text-[#0891B2] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-[#22D3EE]"
	aria-label="Toggle theme"
>
	{#if $isDark}
		<Sun class="size-5" />
	{:else}
		<Moon class="size-5 text-[#0F172A]" />
	{/if}
</button>

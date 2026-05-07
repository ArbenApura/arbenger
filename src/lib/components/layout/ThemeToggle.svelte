<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Sun, Moon } from 'lucide-svelte';

	// IMPORTED MODULES
	import { isDark } from '$lib/stores/theme';
</script>

<!-- THEME TOGGLE BUTTON -->
<button
	on:click={() => isDark.toggle()}
	class="rounded-lg p-2 text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-[#22D3EE]"
	aria-label="Toggle theme"
>
	{#if $isDark}
		<Sun class="size-5" />
	{:else}
		<Moon class="size-5 text-[#161446]" />
	{/if}
</button>

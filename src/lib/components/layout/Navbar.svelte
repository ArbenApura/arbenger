<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Menu, X } from 'lucide-svelte';

	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { navLinks } from '$lib/data/navigation';

	// IMPORTED COMPONENTS
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';

	// -- STATES -- //

	let scrollY = 0;

	let isMobileMenuOpen = false;

	// -- REACTIVE STATES -- //

	$: isScrolled = scrollY > 50;

	// -- FUNCTIONS -- //

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}
</script>

<svelte:window bind:scrollY />

<!-- NAVBAR -->
<nav
	class={cn(
		'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
		isScrolled
			? 'border-b border-[#2A2578] bg-[#0B0A23]/80 backdrop-blur-lg dark:border-[#2A2578] dark:bg-[#0B0A23]/80'
			: 'bg-transparent'
	)}
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- LOGO + WORDMARK -->
		<a href="/" class="flex items-center gap-3">
			<img src="/arbenger.svg" alt="" class="h-8 w-8" width="32" height="32" />
			<span class="font-display text-lg tracking-tight text-white dark:text-white text-[#161446]">
				ARBENGER
			</span>
		</a>

		<!-- DESKTOP NAV LINKS -->
		<div class="hidden items-center gap-8 lg:flex">
			{#each navLinks as link}
				<a
					href={link.href}
					class="text-sm text-slate-300 transition-colors duration-200 hover:text-[#22D3EE] dark:text-slate-300 dark:hover:text-[#22D3EE]"
				>
					{link.label}
				</a>
			{/each}
			<ThemeToggle />
		</div>

		<!-- MOBILE MENU BUTTON -->
		<div class="flex items-center gap-2 lg:hidden">
			<ThemeToggle />
			<button
				on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				class="rounded-lg p-2 text-slate-300 transition-colors duration-200 hover:bg-white/5"
				aria-label="Toggle menu"
			>
				{#if isMobileMenuOpen}
					<X class="size-5" />
				{:else}
					<Menu class="size-5" />
				{/if}
			</button>
		</div>
	</div>

	<!-- MOBILE MENU DRAWER -->
	{#if isMobileMenuOpen}
		<div class="border-t border-[#2A2578] bg-[#0B0A23] px-4 py-4 lg:hidden dark:border-[#2A2578] dark:bg-[#0B0A23]">
			{#each navLinks as link}
				<a
					href={link.href}
					class="block rounded-lg px-4 py-3 text-sm text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-[#22D3EE]"
					on:click={closeMobileMenu}
				>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>

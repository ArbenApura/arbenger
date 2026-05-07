<script lang="ts">
	// IMPORTED DEP-MODULES
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	// -- STATES -- //

	let visible = false;

	// -- FUNCTIONS -- //

	function accept() {
		localStorage.setItem('arbenger-cookies-consent', 'accepted');
		visible = false;
	}

	function decline() {
		localStorage.setItem('arbenger-cookies-consent', 'declined');
		visible = false;
	}

	// -- LIFECYCLES -- //

	onMount(() => {
		const consent = localStorage.getItem('arbenger-cookies-consent');
		if (!consent) {
			visible = true;
		}
	});
</script>

{#if visible}
	<!-- COOKIE CONSENT BANNER -->
	<div
		transition:fly={{ y: 100, duration: 400 }}
		class="fixed bottom-0 left-0 right-0 z-[60] border-t border-[#F1F5F9] bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-lg dark:border-[#2A2578] dark:bg-[#1E1A5E]/95 dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
	>
		<div class="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
			<!-- MESSAGE -->
			<p class="text-sm text-[#475569] dark:text-slate-300">
				This site uses cookies to improve your experience.
				<a
					href="/cookies"
					class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80"
				>
					Learn more
				</a>
			</p>

			<!-- BUTTONS -->
			<div class="flex w-full gap-3 sm:w-auto">
				<button
					on:click={decline}
					class="rounded-lg px-4 py-2 text-sm font-medium text-[#64748B] transition-colors duration-200 hover:text-[#0F172A] dark:text-slate-400 dark:hover:text-white"
				>
					Decline
				</button>
				<button
					on:click={accept}
					class="rounded-lg bg-[#0891B2] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#0891B2]/90 dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:hover:bg-[#22D3EE]/90"
				>
					Accept
				</button>
			</div>
		</div>
	</div>
{/if}

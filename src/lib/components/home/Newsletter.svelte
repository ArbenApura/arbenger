<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
</script>

<!-- NEWSLETTER SECTION -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-24 dark:border-[#2A2578]/50">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div use:reveal class="mx-auto max-w-xl text-center">
			<!-- HEADING -->
			<h2 class="font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
				Stay in the loop
			</h2>

			<!-- SUBTITLE -->
			<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
				Get notified when new products launch.
			</p>

			<!-- EMAIL FORM -->
			<form action="#" class="mt-8 flex flex-col gap-3 sm:flex-row">
				<input
					type="email"
					placeholder="you@example.com"
					required
					class="flex-1 rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all duration-200 focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 focus:outline-none dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:text-white dark:placeholder-slate-500 dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]/20"
				/>
				<button
					type="submit"
					class="shrink-0 rounded-lg bg-[#0F172A] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#1E293B] dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:hover:bg-[#06B6D4]"
				>
					Subscribe
				</button>
			</form>

			<!-- DISCLAIMER -->
			<p class="mt-4 text-xs text-[#94A3B8] dark:text-slate-500">
				No spam. Unsubscribe anytime.
			</p>
		</div>
	</div>
</section>

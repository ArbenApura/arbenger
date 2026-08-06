<script lang="ts">
	// IMPORTED MODULES
	import { navLinks, socialLinks } from '$lib/data/navigation';
	import { SOCIAL_ICONS } from '$lib/utils/socialIcons';

	// IMPORTED COMPONENTS
	import Logo from '$lib/components/ui/Logo.svelte';

	// -- CONSTANTS -- //

	const CURRENT_YEAR = new Date().getFullYear();

</script>

<!-- FOOTER -->
<footer class="border-t border-[#E2E8F0] bg-white dark:border-[#2A2578] dark:bg-[#0B0A23]">
	<div class="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
		<!-- FOOTER GRID: STACKED ON MOBILE, 4 COLUMNS ON DESKTOP -->
		<div class="grid gap-8 md:grid-cols-4">
			<!-- LOGO + TAGLINE -->
			<div>
				<a href="/" class="flex items-center gap-3">
					<Logo size={32} class="text-[#0F172A] dark:text-white" />
					<span class="font-display text-lg tracking-tight text-[#0F172A] dark:text-white">ARBENGER</span>
				</a>
				<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
					Full-stack developer building and shipping production web apps, Android apps, and AI tools.
				</p>
			</div>

			<!-- NAV LINKS -->
			<div>
				<h3 class="font-display text-sm font-bold tracking-tight text-[#0F172A] uppercase dark:text-white">Navigation</h3>
				<ul class="mt-4 space-y-2">
					{#each navLinks as link}
						<li>
							<a
								href={link.href}
								class="text-sm text-[#64748B] transition-colors duration-200 hover:text-[#0891B2] dark:text-slate-400 dark:hover:text-[#22D3EE]"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- CONNECT -->
			<div>
				<h3 class="font-display text-sm font-bold tracking-tight text-[#0F172A] uppercase dark:text-white">Connect</h3>
				<div class="mt-4 flex gap-4">
					{#each socialLinks as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="text-[#64748B] transition-colors duration-200 hover:text-[#0891B2] dark:text-slate-400 dark:hover:text-[#22D3EE]"
							aria-label={social.platform}
						>
							<svg
								class="size-5"
								viewBox={SOCIAL_ICONS[social.icon].viewBox}
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								{#each SOCIAL_ICONS[social.icon].paths as d}
									<path d={d} />
								{/each}
							</svg>
						</a>
					{/each}
				</div>
			</div>

			<!-- ABOUT BLURB -->
			<div>
				<h3 class="font-display text-sm font-bold tracking-tight text-[#0F172A] uppercase dark:text-white">Open to opportunities</h3>
				<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
					Open to full-time roles and new projects. Based in the Philippines, working worldwide.
				</p>
			</div>
		</div>

		<!-- COPYRIGHT -->
		<div class="mt-12 flex items-center justify-between border-t border-[#E2E8F0] pt-8 dark:border-[#2A2578]">
			<p class="text-sm text-[#64748B] dark:text-slate-400">
				&copy; {CURRENT_YEAR} Arben Apura. All rights reserved.
			</p>
		</div>
	</div>
</footer>

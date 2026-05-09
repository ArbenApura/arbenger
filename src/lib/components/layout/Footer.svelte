<script lang="ts">
	// IMPORTED MODULES
	import { navLinks, socialLinks } from '$lib/data/navigation';

	// IMPORTED COMPONENTS
	import Logo from '$lib/components/ui/Logo.svelte';
	import LanguageSelector from '$lib/components/layout/LanguageSelector.svelte';

	// -- CONSTANTS -- //

	const CURRENT_YEAR = new Date().getFullYear();

	// BRAND ICONS NOT AVAILABLE IN LUCIDE V1+; INLINE SVG PATHS USED INSTEAD
	const SOCIAL_ICONS: Record<string, string> = {
		github: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
	};
</script>

<!-- FOOTER -->
<footer class="border-t border-[#E2E8F0] bg-white dark:border-[#2A2578] dark:bg-[#0B0A23]">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<!-- FOOTER GRID: STACKED ON MOBILE, 4 COLUMNS ON DESKTOP -->
		<div class="grid gap-8 md:grid-cols-4">
			<!-- LOGO + TAGLINE -->
			<div>
				<a href="/" class="flex items-center gap-3">
					<Logo size={32} class="text-[#0F172A] dark:text-white" />
					<span class="font-display text-lg tracking-tight text-[#0F172A] dark:text-white">ARBENGER</span>
				</a>
				<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">Extensions, plugins, AI tools, and web apps.</p>
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

			<!-- LEGAL LINKS -->
			<div>
				<h3 class="font-display text-sm font-bold tracking-tight text-[#0F172A] uppercase dark:text-white">Legal</h3>
				<ul class="mt-4 space-y-2">
					<li>
						<a
							href="/privacy"
							class="text-sm text-[#64748B] transition-colors duration-200 hover:text-[#0891B2] dark:text-slate-400 dark:hover:text-[#22D3EE]"
						>
							Privacy Policy
						</a>
					</li>
					<li>
						<a
							href="/terms"
							class="text-sm text-[#64748B] transition-colors duration-200 hover:text-[#0891B2] dark:text-slate-400 dark:hover:text-[#22D3EE]"
						>
							Terms of Service
						</a>
					</li>
					<li>
						<a
							href="/cookies"
							class="text-sm text-[#64748B] transition-colors duration-200 hover:text-[#0891B2] dark:text-slate-400 dark:hover:text-[#22D3EE]"
						>
							Cookie Policy
						</a>
					</li>
				</ul>
			</div>

			<!-- SOCIAL LINKS -->
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
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d={SOCIAL_ICONS[social.icon]} />
							</svg>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- COPYRIGHT + LANGUAGE -->
		<div class="mt-12 flex items-center justify-between border-t border-[#E2E8F0] pt-8 dark:border-[#2A2578]">
			<p class="text-sm text-[#64748B] dark:text-slate-400">
				&copy; {CURRENT_YEAR} Arbenger. All rights reserved.
			</p>
			<LanguageSelector />
		</div>
	</div>
</footer>

<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';
</script>

<!-- TECH STACK SECTION -->
<section class="relative overflow-hidden py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- SECTION HEADING -->
		<div use:reveal class="text-center">
			<h2 class="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl dark:text-white">
				Built with
			</h2>
		</div>

		<!-- TECH ROW -->
		<div use:reveal={{ delay: 100 }} class="mt-14 flex flex-wrap items-center justify-center gap-10 sm:gap-14 md:gap-16">
			<!-- SVELTEKIT -->
			<div class="group flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1">
				<div class="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,62,0,0.4)]">
					<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10">
						<path d="M32.5 8.5C27.5 3.5 20 5.5 16.5 10C13.5 14 14 19 17 22.5C14 19.5 13.5 15.5 15.5 12C18 7.5 24 5 28.5 7.5C33 10 34 16 31 20.5C28 25 21.5 26.5 18 24C21.5 27 27 26 30 22C34.5 16.5 34 11.5 32.5 8.5Z" fill="#FF3E00" />
						<path d="M17 22.5C14 19.5 13.5 15.5 15.5 12C18 7.5 24 5 28.5 7.5" stroke="#FF3E00" stroke-width="0" opacity="0" />
						<path d="M22 17.5C19 14.5 14 16 12 19.5C10 23 11.5 27 14 29C11.5 27 10.5 23.5 12 20.5C13.5 17 18 15.5 21 17C24 18.5 25 23 22.5 26C20 29 15 30 13 28.5C15 30 19.5 29.5 22 26.5C25 22.5 24.5 18.5 22 17.5Z" fill="#FF3E00" opacity="0.7" />
					</svg>
				</div>
				<span class="text-sm font-medium text-[#475569] dark:text-slate-400">SvelteKit</span>
			</div>

			<!-- TYPESCRIPT -->
			<div class="group flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1">
				<div class="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(49,120,198,0.4)]">
					<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10">
						<rect x="4" y="4" width="32" height="32" rx="4" fill="#3178C6" />
						<text x="20" y="28" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="sans-serif">TS</text>
					</svg>
				</div>
				<span class="text-sm font-medium text-[#475569] dark:text-slate-400">TypeScript</span>
			</div>

			<!-- TAILWINDCSS -->
			<div class="group flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1">
				<div class="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
					<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10">
						<path d="M12 16C13.3 10.7 16.7 8 22 8C30 8 31 13 35 14C37 14.5 38.7 14 40 12C38.7 17.3 35.3 20 30 20C22 20 21 15 17 14C15 13.5 13.3 14 12 16Z" fill="#06B6D4" transform="translate(-6, 4) scale(0.8)" />
						<path d="M6 24C7.3 18.7 10.7 16 16 16C24 16 25 21 29 22C31 22.5 32.7 22 34 20C32.7 25.3 29.3 28 24 28C16 28 15 23 11 22C9 21.5 7.3 22 6 24Z" fill="#06B6D4" transform="translate(-2, 6) scale(0.8)" />
					</svg>
				</div>
				<span class="text-sm font-medium text-[#475569] dark:text-slate-400">TailwindCSS</span>
			</div>

			<!-- PYTHON -->
			<div class="group flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1">
				<div class="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(55,118,171,0.4)]">
					<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10">
						<path d="M20 4C13 4 13.5 7 13.5 7V10H20.5V11H10.5C10.5 11 6 10.5 6 17.5C6 24.5 10 24 10 24H12.5V21C12.5 21 12.3 17 16.5 17H23C23 17 27 17.1 27 13.5V7.5C27 7.5 27.5 4 20 4ZM16 6.5C16.8 6.5 17.5 7.2 17.5 8C17.5 8.8 16.8 9.5 16 9.5C15.2 9.5 14.5 8.8 14.5 8C14.5 7.2 15.2 6.5 16 6.5Z" fill="#3776AB" />
						<path d="M20 36C27 36 26.5 33 26.5 33V30H19.5V29H29.5C29.5 29 34 29.5 34 22.5C34 15.5 30 16 30 16H27.5V19C27.5 19 27.7 23 23.5 23H17C17 23 13 22.9 13 26.5V32.5C13 32.5 12.5 36 20 36ZM24 33.5C23.2 33.5 22.5 32.8 22.5 32C22.5 31.2 23.2 30.5 24 30.5C24.8 30.5 25.5 31.2 25.5 32C25.5 32.8 24.8 33.5 24 33.5Z" fill="#FFD43B" />
					</svg>
				</div>
				<span class="text-sm font-medium text-[#475569] dark:text-slate-400">Python</span>
			</div>

			<!-- AI / MACHINE LEARNING -->
			<div class="group flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1">
				<div class="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
					<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10">
						<!-- BRAIN OUTLINE -->
						<path d="M20 6C14 6 10 10.5 10 15C10 18 11.5 20.5 14 22V30H18V24L20 22L22 24V30H26V22C28.5 20.5 30 18 30 15C30 10.5 26 6 20 6Z" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1.5" fill="none" />
						<!-- CIRCUIT NODES -->
						<circle cx="15" cy="14" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} />
						<circle cx="25" cy="14" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} />
						<circle cx="20" cy="18" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} />
						<circle cx="16" cy="20" r="1" fill={$isDark ? '#22D3EE' : '#0891B2'} />
						<circle cx="24" cy="20" r="1" fill={$isDark ? '#22D3EE' : '#0891B2'} />
						<!-- CIRCUIT LINES -->
						<line x1="15" y1="14" x2="20" y2="18" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.8" opacity="0.6" />
						<line x1="25" y1="14" x2="20" y2="18" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.8" opacity="0.6" />
						<line x1="16" y1="20" x2="20" y2="18" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.8" opacity="0.6" />
						<line x1="24" y1="20" x2="20" y2="18" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.8" opacity="0.6" />
					</svg>
				</div>
				<span class="text-sm font-medium text-[#475569] dark:text-slate-400">AI / ML</span>
			</div>

			<!-- CLOUDFLARE -->
			<div class="group flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1">
				<div class="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(245,135,0,0.4)]">
					<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10">
						<path d="M28.5 27H10C7.5 27 5.5 25 5.5 22.5C5.5 20.2 7.2 18.3 9.4 18C9.2 17.3 9 16.5 9 15.5C9 12 12 9 15.5 9C17.8 9 19.8 10.2 21 12C21.8 11.4 22.8 11 24 11C27 11 29.5 13.5 29.5 16.5C29.5 17 29.4 17.5 29.3 18C32 18.3 34 20.5 34 23C34 25.5 31.8 27 28.5 27Z" fill="#F58700" />
					</svg>
				</div>
				<span class="text-sm font-medium text-[#475569] dark:text-slate-400">Cloudflare</span>
			</div>
		</div>
	</div>
</section>

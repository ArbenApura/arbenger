<script lang="ts">
	// IMPORTED MODULES
	import { revealSlide } from '$lib/actions/reveal';
	// IMPORTED COMPONENTS
	import Button from '$lib/components/ui/Button.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
</script>

<!-- ABOUT TEASER SECTION -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 md:py-32 dark:border-[#2A2578]/50">
	<!-- BACKGROUND ACCENT -->
	<div
		class="pointer-events-none absolute bottom-0 left-0 h-100 w-100 rounded-full opacity-10 blur-3xl"
		style="background: radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, transparent 70%);"
		aria-hidden="true"
	></div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid items-center gap-16 lg:grid-cols-2">
			<!-- DECORATIVE: ANIMATED LOGO WITH ORBITAL RINGS -->
			<div use:revealSlide={{ direction: 'left' }} class="hidden items-center justify-center lg:flex">
				<div class="relative">
					<!-- ORBITAL RING 1 — INNER, DASHED -->
					<div
						class="absolute -inset-5 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-[#0891B2]/15 dark:border-[#22D3EE]/20"
					></div>
					<!-- ORBITAL RING 2 — MIDDLE, SOLID, ICONS TRACK THIS -->
					<div
						class="absolute -inset-12.5 animate-[spin_60s_linear_infinite_reverse] rounded-full border border-[#0891B2]/10 dark:border-[#22D3EE]/15"
					></div>
					<!-- ORBITAL RING 3 — OUTER, THIN -->
					<div
						class="absolute -inset-20 animate-[spin_80s_linear_infinite] rounded-full border border-[#0891B2]/6 dark:border-[#2A2578]/15"
					></div>
					<!-- ORBITAL DOT — RIDES RING 1 -->
					<div
						class="absolute -top-5 left-1/2 h-2 w-2 -translate-x-1/2 animate-[spin_40s_linear_infinite] rounded-full bg-[#0891B2] shadow-[0_0_8px_rgba(8,145,178,0.4)] dark:bg-[#22D3EE] dark:shadow-[0_0_10px_rgba(34,211,238,0.5)]"
						style="transform-origin: 0px 185px;"
					></div>
					<!-- ORBITAL DOT 2 — RIDES RING 3, OPPOSITE SIDE -->
					<div
						class="absolute -bottom-20 left-1/2 h-1.5 w-1.5 -translate-x-1/2 animate-[spin_80s_linear_infinite] rounded-full bg-[#0891B2]/60 dark:bg-[#22D3EE]/50"
						style="transform-origin: 0px -80px;"
					></div>
					<!-- GLOW RING -->
					<div
						class="animate-pulse-glow absolute -inset-4 rounded-full opacity-20 blur-2xl dark:opacity-30"
						style="background: radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%);"
					></div>

					<!-- ORBITING PLATFORM LOGOS — SINGLE WRAPPER SPINS ALL 5 TOGETHER -->
					<div class="absolute inset-0 animate-[spin_60s_linear_infinite_reverse]" aria-hidden="true">
						{#each [
							{ src: '/icons/vscode.svg', angle: 0 },
							{ src: '/icons/chrome.svg', angle: 72 },
							{ src: '/icons/tools.svg', angle: 144 },
							{ src: '/icons/android.svg', angle: 216 },
							{ src: '/icons/ai.svg', angle: 288 },
						] as icon}
							<div class="absolute top-1/2 left-1/2 h-0 w-0" style="transform: rotate({icon.angle}deg) translateY(-210px);">
								<div class="animate-[spin_60s_linear_infinite] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.1)] backdrop-blur-sm dark:bg-[#1E1A5E]/80 dark:shadow-[0_0_12px_rgba(34,211,238,0.1)]">
									<img src={icon.src} alt="" class="size-6" />
								</div>
							</div>
						{/each}
					</div>

					<!-- LOGO CONTAINER -->
					<div
						class="relative flex h-80 w-80 items-center justify-center rounded-full border border-[#F1F5F9] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-sm dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/30 dark:shadow-none"
					>
						<Logo size={140} class="animate-float text-[#0F172A] dark:text-white" />
					</div>
				</div>
			</div>

			<!-- TEXT -->
			<div use:revealSlide={{ direction: 'right' }}>
				<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">About</p>

				<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
					Less noise, more function.
				</h2>

				<p class="mt-6 text-lg leading-relaxed text-[#475569] dark:text-slate-300">
					Arbenger makes extensions, plugins, AI tools, and web apps. Each one is built to do its job and get out
					of the way.
				</p>

				<p class="mt-4 text-[#64748B] dark:text-slate-400">Curious? Browse the catalog or say hello.</p>

				<div class="mt-10">
					<Button href="/about/" variant="secondary">Learn more</Button>
				</div>
			</div>
		</div>
	</div>
</section>

<script lang="ts">
	// IMPORTED MODULES
	import { reveal, revealSlide } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import Button from '$lib/components/ui/Button.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
</script>

<!-- ABOUT TEASER SECTION -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-32 dark:border-[#2A2578]/50">
	<!-- BACKGROUND ACCENT -->
	<div
		class="pointer-events-none absolute bottom-0 left-0 h-100 w-100 rounded-full opacity-10 blur-3xl"
		style="background: radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, transparent 70%);"
		aria-hidden="true"
	></div>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-16 lg:grid-cols-2">
			<!-- TEXT — PERSONAL, NOT CORPORATE -->
			<div use:revealSlide={{ direction: 'left' }}>
				<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Who's behind this</p>

				<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
					I'm Arben. I build tools for people who build things.
				</h2>

				<p class="mt-6 text-lg leading-relaxed text-[#475569] dark:text-slate-300">
					Arbenger is just me -- a developer who got tired of waiting for the right tools to exist.
					So I started making them. VS Code extensions, Chrome plugins, AI utilities, whatever
					scratches the itch.
				</p>

				<p class="mt-4 text-[#64748B] dark:text-slate-400">
					Currently obsessed with AI tooling and developer extensions. Everything here is solo-built,
					shipped when it's ready, and designed for people who actually write code.
				</p>

				<div class="mt-10">
					<Button href="/about" variant="secondary">More about me</Button>
				</div>
			</div>

			<!-- DECORATIVE: ANIMATED LOGO WITH ORBITAL RINGS -->
			<div use:revealSlide={{ direction: 'right' }} class="hidden items-center justify-center lg:flex">
				<div class="relative">
					<!-- ORBITAL RING 1 -->
					<div
						class="absolute -inset-5 animate-[spin_20s_linear_infinite] rounded-full border border-[#2A2578]/40"
					></div>
					<!-- ORBITAL RING 2 -->
					<div
						class="absolute -inset-12.5 animate-[spin_30s_linear_infinite_reverse] rounded-full border border-[#2A2578]/20"
					></div>
					<!-- ORBITAL DOT -->
					<div
						class="absolute -top-5 left-1/2 h-2 w-2 -translate-x-1/2 animate-[spin_20s_linear_infinite] rounded-full bg-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.5)]"
						style="transform-origin: 50% calc(50% + 148px);"
					></div>

					<!-- GLOW RING -->
					<div
						class="animate-pulse-glow absolute inset-0 rounded-full opacity-30 blur-2xl"
						style="background: radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%);"
					></div>

					<!-- LOGO CONTAINER -->
					<div
						class="relative flex h-72 w-72 items-center justify-center rounded-full border border-[#F1F5F9] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-sm dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/30 dark:shadow-none"
					>
						<Logo size={112} class="animate-float text-[#0F172A] dark:text-white" />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

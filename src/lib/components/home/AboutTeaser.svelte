<script lang="ts">
	// IMPORTED COMPONENTS
	import Button from '$lib/components/ui/Button.svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
</script>

<!-- ABOUT TEASER SECTION -->
<section class="relative py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<!-- TEXT CONTENT -->
			<div>
				<SectionLabel label="ABOUT" />

				<h2 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
					Crafting digital tools with purpose
				</h2>

				<p class="mt-6 text-slate-300">
					Arbenger is a solo venture by Arben Apura, focused on building developer tools
					and creative products that make a difference. From AI-powered utilities to
					browser extensions, every product is built with care and attention to detail.
				</p>

				<div class="mt-8">
					<Button href="/about" variant="secondary">Learn more about us</Button>
				</div>
			</div>

			<!-- DECORATIVE LOGO ELEMENT (HIDDEN ON MOBILE) -->
			<div class="hidden items-center justify-center lg:flex">
				<div class="relative">
					<!-- GLOW RING -->
					<div
						class="absolute inset-0 rounded-full opacity-20 blur-3xl"
						style="background: radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%);"
					></div>

					<!-- LOGO -->
					<div class="relative flex h-64 w-64 items-center justify-center rounded-full border border-[#2A2578]">
						<img src="/arbenger.svg" alt="" class="h-24 w-24" width="96" height="96" />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

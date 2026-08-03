<script lang="ts">
	// IMPORTED DEP-MODULES
	import { GraduationCap, Languages, Award, Briefcase } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal, revealSlide } from '$lib/actions/reveal';
	import { skillGroups } from '$lib/data/skills';

	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	const TIMELINE = [
		{
			role: 'Remote Full-Stack Developer',
			company: 'Smartago LLC (Wilmington, DE, US · UniStar.BG Ltd subsidiary)',
			period: '08/2025 — 06/2026',
			points: [
				'Developed and shipped 7 Android and web apps to the Google Play Store, implementing client Figma designs end-to-end.',
				'Leading app "XAPK Installer APK Downloader" surpassed 500k+ downloads on mobile, tablet, and Android TV; two Android TV apps passed 100k+ downloads each.',
				'Integrated Capacitor with SvelteKit to ship one codebase to both the Web and native Android.',
				'Integrated Google Play Billing with idempotent purchase verification to prevent duplicate transactions and secure in-app purchases.',
			],
		},
		{
			role: 'Remote Full-Stack Developer',
			company: 'UniStar.BG Ltd (Gotse Delchev, Bulgaria)',
			period: '01/2025 — 06/2026',
			points: [
				'Developed web automation and scraping pipelines for a prototype app store, scraping the web for APKs with thousands of scrapes per day.',
				'Built a parallel queue task system (worker pooling) to process the scraped data, with incremental database scaling as usage grew.',
				'Created a full admin panel on PostgreSQL with Drizzle ORM: app CMS with multi-language support (manual, DeepL, and Gemini AI translation), order and sales management, and usage statistics.',
				'Managed production deployment on Plesk and Webuzo (including VM deployment and cloning) and a monorepo with optimized CI/CD.',
			],
		},
	];
</script>

<MetaTags
	title="About — Arben Apura, Full-Stack Web Developer"
	description="Full-stack developer from San Jose Del Monte, Bulacan, Philippines. SvelteKit and Next.js specialist — web apps, AI tools, and Chrome extensions."
	url="{SITE_URL}/about/"
/>

<Breadcrumbs pageName="About" pageUrl="{SITE_URL}/about/" />

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'AboutPage',
		name: 'About Arben Apura',
		url: `${SITE_URL}/about/`,
		description: 'Full-stack developer from San Jose Del Monte, Bulacan, Philippines. SvelteKit and Next.js specialist.',
		mainEntity: {
			'@type': 'Person',
			name: 'Arben M. Apura',
			url: SITE_URL,
			jobTitle: 'Full-Stack Web Developer',
			email: 'mailto:arbenapura.official@gmail.com',
			sameAs: ['https://github.com/ArbenApura', 'https://www.facebook.com/arbenapura.official'],
		},
	}}
/>

<!-- PAGE HERO -->
<section class="relative overflow-hidden pt-32 pb-16">
	<!-- GEOMETRIC BACKGROUND — ANGULAR LINES FROM TOP-RIGHT -->
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<svg viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 right-0 hidden h-75 w-200 md:block" preserveAspectRatio="none">
			<line x1="800" y1="0" x2="500" y2="200" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.12" />
			<line x1="800" y1="0" x2="600" y2="280" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.08" />
			<line x1="800" y1="0" x2="700" y2="300" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.1" />
			<line x1="800" y1="0" x2="400" y2="120" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.3" opacity="0.06" />
			<circle cx="500" cy="200" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" />
			<circle cx="600" cy="280" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
			<circle cx="700" cy="300" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.12" />
			<circle cx="400" cy="120" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
		</svg>
	</div>

	<div use:reveal class="relative mx-auto max-w-7xl px-6 lg:px-8">
		<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">About</p>

		<h1 class="font-display mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			About Me
		</h1>

		<p class="mt-6 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			Full-stack developer from San Jose Del Monte, Bulacan, Philippines. Remote-friendly, always building.
		</p>
	</div>
</section>

<!-- PROFESSIONAL SUMMARY -->
<section class="relative overflow-hidden py-16">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div use:revealSlide={{ direction: 'left' }} class="max-w-3xl">
			<h2 class="font-display text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">Who I am</h2>

			<p class="mt-6 text-lg leading-relaxed text-[#475569] dark:text-slate-300">
				A dedicated and adaptable full-stack developer with a strong focus on web development. Proficient in
				frameworks like SvelteKit and Next.js, I enjoy creating user-friendly and efficient applications. I value
				continuous learning, writing clean code, and working collaboratively to deliver practical solutions.
				Always striving to improve, I approach challenges with a positive attitude and a commitment to quality.
			</p>
		</div>
	</div>
</section>

<!-- WORK HISTORY TIMELINE -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div use:reveal class="max-w-2xl">
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Work history</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">Where I've worked</h2>
		</div>

		<div class="mt-12 grid gap-8 md:grid-cols-3">
			{#each TIMELINE as job, i}
				<div
					use:reveal={{ delay: i * 100 }}
					class="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] md:col-span-3 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none"
				>
					<div class="flex flex-wrap items-center gap-3">
						<div class="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							<Briefcase class="size-5 text-[#0891B2] dark:text-[#22D3EE]" />
						</div>
						<div>
							<h3 class="font-display text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">{job.role}</h3>
							<p class="text-sm text-[#64748B] dark:text-slate-400">
								{job.company} · {job.period}
							</p>
						</div>
					</div>

					<ul class="mt-5 list-disc space-y-2 pl-5 text-sm text-[#475569] dark:text-slate-300">
						{#each job.points as point}
							<li>{point}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- EDUCATION + LANGUAGES + ACCOMPLISHMENT -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid gap-8 md:grid-cols-3">
			<!-- EDUCATION -->
			<div use:reveal={{ delay: 0 }} class="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<div class="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
					<GraduationCap class="size-5 text-[#0891B2] dark:text-[#22D3EE]" />
				</div>
				<h3 class="font-display mt-4 text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">Education</h3>
				<div class="mt-4 space-y-4 text-sm">
					<div>
						<p class="font-medium text-[#0F172A] dark:text-white">BS in Information Technology</p>
						<p class="text-[#64748B] dark:text-slate-400">Bulacan State University · Magna Cum Laude</p>
						<p class="text-xs text-[#94A3B8] dark:text-slate-500">Expected 2025</p>
					</div>
					<div>
						<p class="font-medium text-[#0F172A] dark:text-white">High School & Senior High School</p>
						<p class="text-[#64748B] dark:text-slate-400">San Jose del Monte National Trade School</p>
						<p class="text-xs text-[#94A3B8] dark:text-slate-500">Expected 2021</p>
					</div>
				</div>
			</div>

			<!-- LANGUAGES -->
			<div use:reveal={{ delay: 100 }} class="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<div class="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
					<Languages class="size-5 text-[#0891B2] dark:text-[#22D3EE]" />
				</div>
				<h3 class="font-display mt-4 text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">Languages</h3>
				<div class="mt-4 space-y-4 text-sm">
					<div>
						<p class="font-medium text-[#0F172A] dark:text-white">Filipino</p>
						<p class="text-[#64748B] dark:text-slate-400">Native</p>
					</div>
					<div>
						<p class="font-medium text-[#0F172A] dark:text-white">English</p>
						<p class="text-[#64748B] dark:text-slate-400">Proficient</p>
					</div>
				</div>
			</div>

			<!-- ACCOMPLISHMENT -->
			<div use:reveal={{ delay: 200 }} class="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<div class="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
					<Award class="size-5 text-[#0891B2] dark:text-[#22D3EE]" />
				</div>
				<h3 class="font-display mt-4 text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">Accomplishment</h3>
				<p class="mt-4 text-sm text-[#475569] dark:text-slate-300">
					Registered our university capstone project, <span class="font-medium text-[#0F172A] dark:text-white">"Door Lock Module"</span>,
					with the Intellectual Property Office of the Philippines (IPOPHL) in February 2026.
				</p>
				<a
					href="/projects/door-lock-module/"
					class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0891B2] transition-colors hover:text-[#0E7490] dark:text-[#22D3EE] dark:hover:text-[#67E8F9]"
				>
					View the project →
				</a>
			</div>
		</div>
	</div>
</section>

<!-- SKILLS -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div use:reveal class="mb-10 max-w-2xl">
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Skills</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">What I work with</h2>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each skillGroups as group, i}
				<div
					use:reveal={{ delay: i * 80 }}
					class="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none"
				>
					<h3 class="font-display text-sm font-bold tracking-tight text-[#0891B2] uppercase dark:text-[#22D3EE]">
						{group.name}
					</h3>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each group.skills as skill}
							<span class="rounded-md bg-[#F1F5F9] px-2.5 py-1 text-xs text-[#64748B] dark:bg-[#2A2578]/30 dark:text-slate-400">
								{skill}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
	<div use:reveal class="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 lg:px-8">
		<p class="text-lg text-[#475569] dark:text-slate-300">
			Like what you see?
		</p>
		<Button href="/contact/" variant="secondary">Get in touch</Button>
	</div>
</section>

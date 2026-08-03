<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount, onDestroy } from 'svelte';
	import { dev } from '$app/environment';

	// IMPORTED MODULES
	import { hideChrome } from '$lib/stores/layout';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// -- LIFECYCLES -- //

	onMount(() => {
		hideChrome.set(true);
	});

	onDestroy(() => {
		hideChrome.set(false);
	});

	// -- FUNCTIONS -- //

	function printResume() {
		window.print();
	}
</script>

<MetaTags
	title="Resume — Arben Apura, Full-Stack Web Developer"
	description="One-page resume of Arben M. Apura — full-stack web developer. Printable to PDF."
	url="{SITE_URL}/resume/"
/>

<Breadcrumbs pageName="Resume" pageUrl="{SITE_URL}/resume/" />

<!-- PAGE HEADER (HIDDEN WHEN PRINTING) -->
<section class="relative overflow-hidden pt-32 pb-10 print:hidden">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Resume</p>

		<h1 class="font-display mt-4 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			Resume
		</h1>

		<p class="mt-4 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			A one-page overview, formatted for applicant tracking systems. Download the PDF version below.
		</p>

		<div class="mt-8 flex flex-wrap items-center gap-3">
			<a
				href="/resume/ArbenApura-Resume.pdf"
				download
				class="inline-flex items-center gap-2 rounded-lg bg-[#0891B2] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(8,145,178,0.2)] hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
			>
				Download Resume (PDF)
			</a>

			{#if dev}
				<button
					on:click={printResume}
					class="inline-flex items-center gap-2 rounded-lg border border-[#0F172A] px-6 py-3 text-sm font-medium text-[#0F172A] transition-all duration-300 hover:bg-[#0F172A]/5 dark:border-[#22D3EE] dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/10"
				>
					Print (dev)
				</button>
			{/if}
		</div>

		<p class="mt-4 text-sm text-[#94A3B8] dark:text-slate-500">
			US Letter, one page, ATS-friendly.
		</p>
	</div>
</section>

<!-- RESUME SHEET — ALWAYS WHITE PAPER (SCREEN + PRINT), ATS-FRIENDLY: SINGLE COLUMN, STANDARD FONT, NO IMAGES -->
<section class="px-4 py-12 md:px-6 print:px-0 print:py-0">
	<div
		class="resume-sheet mx-auto w-[8.5in] max-w-full rounded-xl border border-[#E2E8F0] bg-white p-9 shadow-[0_8px_32px_rgba(0,0,0,0.12)] print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none"
	>
		<!-- HEADER -->
		<header>
			<h2 class="text-[22pt] leading-none font-bold tracking-tight text-[#0F172A]">
				Arben M. Apura
			</h2>
			<p class="mt-2 text-[12pt] font-semibold tracking-[0.08em] text-[#0891B2] uppercase">
				Full-Stack Developer
			</p>
			<p class="mt-3 text-[10pt] leading-relaxed text-[#334155]">
				arbenapura.official@gmail.com | +63 976 430 4619 | San Jose Del Monte, Bulacan 3023, Philippines · Remote
				<br />
				github.com/ArbenApura | arbenger.com
			</p>
		</header>

		<!-- PROFESSIONAL SUMMARY -->
		<section class="resume-section mt-4">
			<h3 class="border-b border-[#CBD5E1] pb-0.5 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Professional Summary
			</h3>
			<p class="mt-2 text-[10.5pt] leading-[1.2] text-[#334155]">
				Full-stack developer focused on building and shipping production web and Android applications.
				Experienced in turning client designs into complete products across frontend, backend, mobile, and
				infrastructure. Strong focus on TypeScript, SvelteKit, Next.js, PostgreSQL, and Capacitor.
			</p>
		</section>

		<!-- EXPERIENCE -->
		<section class="resume-section mt-2">
			<h3 class="border-b border-[#CBD5E1] pb-0.5 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Experience
			</h3>
			<div class="mt-2 space-y-3">
				<div>
					<div class="flex items-baseline justify-between gap-4">
						<p class="text-[11pt] font-semibold text-[#0F172A]">Smartago LLC - Freelance Full-Stack Developer</p>
						<p class="shrink-0 text-[10pt] text-[#64748B]">08/2025 - 06/2026</p>
					</div>
					<p class="mt-0 text-[10pt] text-[#64748B]">Additional work for the same client group · UniStar.BG subsidiary</p>
					<ul class="mt-1.5 list-disc space-y-0 pl-4 text-[10.5pt] leading-[1.2] text-[#334155]">
						<li>Shipped and maintained 7 production apps in SvelteKit and Capacitor, wrapping web codebases into native Android builds for the Google Play Store across utility and Android TV categories.</li>
						<li>Developed "XAPK Installer APK Downloader" from Figma designs to 500k+ downloads across mobile, tablet, and Android TV, plus an Android TV launcher and TV downloader that each surpassed 100k+ downloads.</li>
						<li>Architected and maintained a shared codebase across Web, Android phones/tablets, and Android TV.</li>
						<li>Integrated Google Play Billing with idempotent purchase verification and RTDN webhook endpoints that sync purchase lifecycle events (purchased, renewed, cancelled, expired) to the database.</li>
					</ul>
				</div>
				<div>
					<div class="flex items-baseline justify-between gap-4">
						<p class="text-[11pt] font-semibold text-[#0F172A]">UniStar.BG Ltd - Freelance Full-Stack Developer</p>
						<p class="shrink-0 text-[10pt] text-[#64748B]">01/2025 - 06/2026</p>
					</div>
					<p class="mt-0 text-[10pt] text-[#64748B]">Long-term freelance engagement via Upwork · Gotse Delchev, Bulgaria</p>
					<ul class="mt-1.5 list-disc space-y-0 pl-4 text-[10.5pt] leading-[1.2] text-[#334155]">
						<li>Built an automated web scraping and APK ingestion pipeline covering metadata extraction, processing, packaging, and database persistence.</li>
						<li>Designed and implemented a parallel job-processing system with worker pooling, processing thousands of APK scraping tasks per day while scaling PostgreSQL incrementally with workload growth.</li>
						<li>Built a SvelteKit, PostgreSQL/Drizzle CMS supporting 40+ languages with manual, DeepL, and Gemini-powered translation workflows, plus order, sales, and per-app user and activity analytics.</li>
						<li>Managed production deployment on Linux (Plesk, Webuzo, Nginx) covering SSL and DNS, VM provisioning and cloning, and a monorepo with optimized CI/CD.</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- PROJECTS AND ACHIEVEMENTS -->
		<section class="resume-section mt-2">
			<h3 class="border-b border-[#CBD5E1] pb-0.5 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Projects and Achievements
			</h3>
			<ul class="mt-2 list-disc space-y-0 pl-4 text-[10.5pt] leading-[1.2] text-[#334155]">
				<li>Door Lock Module (2026) - IoT smart door lock using RFID and face recognition, built with Arduino and a web app for access; registered with the Intellectual Property Office of the Philippines (IPOPHL).</li>
				<li>Top One Uwu (2022) - AI study assistant built and launched during my 2nd year of college, gaining traction in the Philippine programming community and receiving features from Inquirer.net and CLTV36.</li>
			</ul>
		</section>

		<!-- SKILLS -->
		<section class="resume-section mt-2">
			<h3 class="border-b border-[#CBD5E1] pb-0.5 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Skills
			</h3>
			<div class="mt-2 space-y-1 text-[10.5pt] leading-[1.2] text-[#334155]">
				<p><span class="font-semibold text-[#0F172A]">Frontend:</span> TypeScript, JavaScript, SvelteKit, Next.js, React, Tailwind CSS, SCSS, HTML</p>
				<p><span class="font-semibold text-[#0F172A]">Backend:</span> Node.js, Supabase, Firebase, PocketBase, PostgreSQL, MySQL, PHP, Drizzle ORM</p>
				<p><span class="font-semibold text-[#0F172A]">Mobile:</span> Capacitor, Google Play Billing, Progressive Web Apps, Google Play Store deployment</p>
				<p><span class="font-semibold text-[#0F172A]">Hosting and DevOps:</span> Linux, Vercel, Render, Cloudflare Pages, Plesk, Webuzo, Nginx, VPS, SSL, DNS, CI/CD, Git</p>
				<p><span class="font-semibold text-[#0F172A]">AI and APIs:</span> OpenAI API, Google AI Studio API, DeepSeek, LLM prompt engineering</p>
			</div>
		</section>

		<!-- EDUCATION -->
		<section class="resume-section mt-2">
			<h3 class="border-b border-[#CBD5E1] pb-0.5 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Education
			</h3>
			<div class="mt-2 space-y-1 text-[10.5pt] leading-[1.2] text-[#334155]">
				<div class="flex items-baseline justify-between gap-4">
					<p class="font-semibold text-[#0F172A]">Bulacan State University - Sarmiento Campus</p>
					<p class="shrink-0 text-[#64748B]">San Jose del Monte, Bulacan</p>
				</div>
				<div class="flex items-baseline justify-between gap-4">
					<p class="font-semibold text-[#0F172A]">BS in Information Technology</p>
					<p class="shrink-0 text-[#64748B]">July 2025 | <span class="font-semibold text-[#0F172A]">Magna Cum Laude</span></p>
				</div>
			</div>
		</section>

	</div>
</section>

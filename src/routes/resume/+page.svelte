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
		<section class="resume-section mt-6">
			<h3 class="border-b border-[#CBD5E1] pb-0.5 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Professional Summary
			</h3>
			<p class="mt-2 text-[10.5pt] leading-[1.3] text-[#334155]">
				Full-stack developer with 4+ years building web and Android applications in SvelteKit, Next.js, and
				Capacitor. Shipped 7 apps to Google Play — 500k+ downloads on the leading app — end-to-end from Figma
				to production. Seeking remote full-stack roles across Web and Android.
			</p>
		</section>

		<!-- EXPERIENCE -->
		<section class="resume-section mt-3">
			<h3 class="border-b border-[#CBD5E1] pb-0.5 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Experience
			</h3>
			<div class="mt-2 space-y-3">
				<div>
					<div class="flex items-baseline justify-between gap-4">
						<p class="text-[11pt] font-semibold text-[#0F172A]">Remote Full-Stack Developer - Smartago LLC (UniStar.BG Ltd subsidiary, Wilmington, DE, US)</p>
						<p class="shrink-0 text-[10pt] text-[#64748B]">08/2025 - 06/2026</p>
					</div>
					<ul class="mt-1.5 list-disc space-y-0 pl-4 text-[10.5pt] leading-[1.3] text-[#334155]">
						<li>Shipped 7 Android and web apps to Google Play from Figma designs end-to-end.</li>
						<li>XAPK Installer APK Downloader: 500k+ downloads; two Android TV apps: 100k+ each.</li>
						<li>Integrated Capacitor with SvelteKit to ship one codebase to the Web and native Android.</li>
						<li>Integrated Google Play Billing with idempotent verification to prevent duplicate transactions.</li>
					</ul>
				</div>
				<div>
					<div class="flex items-baseline justify-between gap-4">
						<p class="text-[11pt] font-semibold text-[#0F172A]">Remote Full-Stack Developer - UniStar.BG Ltd (Gotse Delchev, Bulgaria)</p>
						<p class="shrink-0 text-[10pt] text-[#64748B]">01/2025 - 06/2026</p>
					</div>
					<ul class="mt-1.5 list-disc space-y-0 pl-4 text-[10.5pt] leading-[1.3] text-[#334155]">
						<li>Developed web automation and scraping pipelines for a prototype app store, scraping the web for APKs (thousands of scrapes per day).</li>
						<li>Built a parallel queue task system (worker pooling) to process the scraped data, with incremental database scaling as usage grew.</li>
						<li>Created a full admin panel (PostgreSQL, Drizzle ORM): app CMS with multi-language support (manual, DeepL, Gemini AI) across 40+ languages, order and sales management, and usage statistics.</li>
						<li>Managed production deployment on Plesk and Webuzo, including VM instances and a monorepo with CI/CD.</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- PROJECTS AND ACHIEVEMENTS -->
		<section class="resume-section mt-3">
			<h3 class="border-b border-[#CBD5E1] pb-0.5 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Projects and Achievements
			</h3>
			<ul class="mt-2 list-disc space-y-0 pl-4 text-[10.5pt] leading-[1.3] text-[#334155]">
				<li>Door Lock Module (2026) - university capstone smart door lock with RFID and face recognition (Arduino), registered with the Intellectual Property Office of the Philippines (IPOPHL).</li>
				<li>Top One Uwu (2022) - AI study assistant that went viral in the Programming Philippines community; featured in Inquirer.net, a popular media outlet in the Philippines, and interviewed live on CLTV36.</li>
			</ul>
		</section>

		<!-- SKILLS -->
		<section class="resume-section mt-3">
			<h3 class="border-b border-[#CBD5E1] pb-0.5 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Skills
			</h3>
			<div class="mt-2 space-y-1 text-[10.5pt] leading-[1.3] text-[#334155]">
				<p><span class="font-semibold text-[#0F172A]">Frontend:</span> TypeScript, JavaScript, SvelteKit, Next.js, React, Tailwind CSS, SCSS, HTML</p>
				<p><span class="font-semibold text-[#0F172A]">Backend:</span> Node.js, Supabase, Firebase, PocketBase, PostgreSQL, MySQL, PHP, Drizzle ORM</p>
				<p><span class="font-semibold text-[#0F172A]">Mobile:</span> Capacitor, Google Play Billing, Progressive Web Apps, Google Play Store deployment</p>
				<p><span class="font-semibold text-[#0F172A]">Hosting and DevOps:</span> Vercel, Render, Cloudflare Pages, Plesk, Webuzo, Nginx, VPS, CI/CD, Git</p>
				<p><span class="font-semibold text-[#0F172A]">AI and APIs:</span> OpenAI API, Google AI Studio API, DeepSeek, LLM prompt engineering</p>
			</div>
		</section>

		<!-- EDUCATION -->
		<section class="resume-section mt-3">
			<h3 class="border-b border-[#CBD5E1] pb-0.5 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Education
			</h3>
			<div class="mt-2 space-y-1 text-[10.5pt] leading-[1.3] text-[#334155]">
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

		<!-- LANGUAGES -->
		<section class="resume-section mt-3">
			<h3 class="border-b border-[#CBD5E1] pb-0.5 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Languages
			</h3>
			<p class="mt-2 text-[10.5pt] leading-[1.3] text-[#334155]">
				Filipino <span class="text-[#64748B]">(Native)</span> | English <span class="text-[#64748B]">(Proficient)</span>
			</p>
		</section>
	</div>
</section>

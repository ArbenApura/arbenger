<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount, onDestroy } from 'svelte';

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
			A one-page overview, formatted for applicant tracking systems. Print it or save it as a PDF — sized for US Letter.
		</p>

		<button
			on:click={printResume}
			class="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0891B2] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(8,145,178,0.2)] hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
		>
			Print / Save as PDF
		</button>
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
				Full-Stack Web Developer
			</p>
			<p class="mt-3 text-[10pt] leading-relaxed text-[#334155]">
				arbenapura.official@gmail.com | +63 976 430 4619 | San Jose Del Monte, Bulacan, Philippines
				<br />
				github.com/ArbenApura | arbenger.com
			</p>
		</header>

		<!-- PROFESSIONAL SUMMARY -->
		<section class="resume-section mt-6">
			<h3 class="border-b border-[#CBD5E1] pb-1 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Professional Summary
			</h3>
			<p class="mt-2.5 text-[10.5pt] leading-[1.4] text-[#334155]">
				Full-stack developer with over 3 years building web and Android applications, proficient in SvelteKit,
				Next.js, and Capacitor. Sole developer of 7 apps shipped to the Google Play Store, with 500k+ downloads
				on the leading app. Creates user-friendly, efficient applications and values clean code and continuous learning.
			</p>
		</section>

		<!-- EXPERIENCE -->
		<section class="resume-section mt-4">
			<h3 class="border-b border-[#CBD5E1] pb-1 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Experience
			</h3>
			<div class="mt-2.5">
				<div class="flex items-baseline justify-between gap-4">
					<p class="text-[11pt] font-semibold text-[#0F172A]">Remote Full-Stack Web Developer - UniStar.BG Ltd (Bulgaria)</p>
					<p class="shrink-0 text-[10pt] text-[#64748B]">01/2025 - 06/2026</p>
				</div>
				<ul class="mt-1.5 list-disc space-y-0.5 pl-4 text-[10.5pt] leading-[1.4] text-[#334155]">
					<li>Sole developer of 7 Android and web apps shipped to the Google Play Store, implementing client Figma designs end-to-end.</li>
					<li>"XAPK Installer APK Downloader" surpassed 500k+ downloads on mobile, tablet, and Android TV; two Android TV apps passed 100k+ downloads each.</li>
					<li>Integrated Capacitor with SvelteKit, shipping one codebase to both the Web and native Android.</li>
					<li>Built a parallel queue task system (worker pooling) that processed large volumes of scraped data across available resources.</li>
					<li>Developed web automation and scraping pipelines; dissected APK structure and packaging for product development.</li>
					<li>Created a full admin panel: app CMS, multi-language support (manual, DeepL, and Gemini AI translation), orders and sales, and usage statistics.</li>
					<li>Engineered Google Play Billing integration with idempotent purchase verification — deduplicating order IDs and enforcing atomic entitlement state transitions for exactly-once fulfillment and protection against duplicate or replayed transactions.</li>
					<li>Managed production deployment on Plesk and Webuzo, including virtual machine deployment and cloning.</li>
					<li>Organized all source code in a monorepo with optimized CI/CD for continuous and fast updates.</li>
				</ul>
			</div>
		</section>

		<!-- SKILLS -->
		<section class="resume-section mt-4">
			<h3 class="border-b border-[#CBD5E1] pb-1 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Skills
			</h3>
			<div class="mt-2.5 space-y-1 text-[10.5pt] leading-[1.4] text-[#334155]">
				<p><span class="font-semibold text-[#0F172A]">Frontend:</span> TypeScript, JavaScript, SvelteKit, Svelte, Next.js, React, Tailwind CSS, SCSS, HTML</p>
				<p><span class="font-semibold text-[#0F172A]">Backend:</span> Node.js, Supabase, Firebase, PocketBase, MySQL, PHP</p>
				<p><span class="font-semibold text-[#0F172A]">Mobile:</span> Capacitor, Google Play Billing, Progressive Web Apps, Google Play Store deployment</p>
				<p><span class="font-semibold text-[#0F172A]">Hosting and DevOps:</span> Vercel, Render, Cloudflare Pages, Plesk, Webuzo, Nginx, VPS, CI/CD, Monorepo</p>
				<p><span class="font-semibold text-[#0F172A]">AI and APIs:</span> OpenAI API, Google AI Studio API, DeepSeek, LLM prompt engineering</p>
			</div>
		</section>

		<!-- EDUCATION -->
		<section class="resume-section mt-4">
			<h3 class="border-b border-[#CBD5E1] pb-1 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Education
			</h3>
			<div class="mt-2.5 space-y-1 text-[10.5pt] leading-[1.4] text-[#334155]">
				<p>
					<span class="font-semibold text-[#0F172A]">BS in Information Technology</span> - Bulacan State University
					<span class="text-[#64748B]"> | Magna Cum Laude | 2025</span>
				</p>
				<p>
					<span class="font-semibold text-[#0F172A]">High School and Senior High School</span> - San Jose del Monte
					National Trade School <span class="text-[#64748B]"> | 2021</span>
				</p>
			</div>
		</section>

		<!-- ACHIEVEMENTS -->
		<section class="resume-section mt-4">
			<h3 class="border-b border-[#CBD5E1] pb-1 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Achievements
			</h3>
			<p class="mt-2.5 text-[10.5pt] leading-[1.4] text-[#334155]">
				Registered the university capstone project <span class="font-semibold text-[#0F172A]">"Door Lock Module"</span> -
				a smart door lock with RFID and face recognition - with the Intellectual Property Office of the Philippines
				(IPOPHL), February 2026.
			</p>
		</section>

		<!-- LANGUAGES -->
		<section class="resume-section mt-4">
			<h3 class="border-b border-[#CBD5E1] pb-1 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Languages
			</h3>
			<p class="mt-2.5 text-[10.5pt] leading-[1.4] text-[#334155]">
				Filipino <span class="text-[#64748B]">(Native)</span> | English <span class="text-[#64748B]">(Proficient)</span>
			</p>
		</section>
	</div>
</section>

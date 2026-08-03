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
				Dedicated and adaptable full-stack developer with a strong focus on web development. Proficient in
				SvelteKit and Next.js, creating user-friendly and efficient applications. Value continuous learning,
				clean code, and collaboration, and approach challenges with a positive attitude and a commitment to quality.
			</p>
		</section>

		<!-- SKILLS -->
		<section class="resume-section mt-5">
			<h3 class="border-b border-[#CBD5E1] pb-1 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Skills
			</h3>
			<div class="mt-2.5 space-y-1 text-[10.5pt] leading-[1.4] text-[#334155]">
				<p><span class="font-semibold text-[#0F172A]">Frontend:</span> TypeScript, JavaScript, SvelteKit, Svelte, Next.js, React, Tailwind CSS, SCSS, HTML</p>
				<p><span class="font-semibold text-[#0F172A]">Backend:</span> Node.js, Supabase, Firebase, PocketBase, MySQL, PHP</p>
				<p><span class="font-semibold text-[#0F172A]">Mobile:</span> Capacitor, Progressive Web Apps, Google Play Store deployment</p>
				<p><span class="font-semibold text-[#0F172A]">Hosting and DevOps:</span> Vercel, Render, Cloudflare Pages, Plesk, Webuzo, Nginx, VPS</p>
				<p><span class="font-semibold text-[#0F172A]">AI and APIs:</span> OpenAI API, LLM prompt engineering</p>
			</div>
		</section>

		<!-- EXPERIENCE -->
		<section class="resume-section mt-5">
			<h3 class="border-b border-[#CBD5E1] pb-1 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Experience
			</h3>
			<div class="mt-2.5">
				<div class="flex items-baseline justify-between gap-4">
					<p class="text-[11pt] font-semibold text-[#0F172A]">Remote Full-Stack Web Developer - UniStar.BG Ltd</p>
					<p class="shrink-0 text-[10pt] text-[#64748B]">01/2025 - 06/2026</p>
				</div>
				<ul class="mt-1.5 list-disc space-y-0.5 pl-4 text-[10.5pt] leading-[1.4] text-[#334155]">
					<li>Collaborated with design teams to implement user-friendly interfaces and improve user experience.</li>
					<li>Built modern web applications integrated with Capacitor for deployment on the Web and the Google Play Store.</li>
					<li>Developed secure, efficient APIs and managed databases for seamless app integration.</li>
					<li>Handled server setup, configuration, and deployment to ensure reliable performance.</li>
				</ul>
			</div>
		</section>

		<!-- EDUCATION -->
		<section class="resume-section mt-5">
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
		<section class="resume-section mt-5">
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
		<section class="resume-section mt-5">
			<h3 class="border-b border-[#CBD5E1] pb-1 text-[12pt] font-bold tracking-[0.08em] text-[#0F172A] uppercase">
				Languages
			</h3>
			<p class="mt-2.5 text-[10.5pt] leading-[1.4] text-[#334155]">
				Filipino <span class="text-[#64748B]">(Native)</span> | English <span class="text-[#64748B]">(Proficient)</span>
			</p>
		</section>
	</div>
</section>

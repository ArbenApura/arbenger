# Personal Portfolio Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert arbenger.com from a company site into a personal portfolio for Arben M. Apura — "Full-Stack Web Developer" — keeping the Arbenger brand on the 5 live tools, the existing navy/cyan design system, and all working product pages.

**Architecture:** Static SvelteKit site (prerendered, Cloudflare Pages). Featured projects come from a new typed data module (`src/lib/data/projects.ts`) rendered through new shared components (ProjectCard, MinorProjectCard, ProjectCover). Company-era surfaces are deleted (newsletter, language selector, cookie banner, legal routes, products catalog). Product tool routes under `/products/<slug>` stay untouched. `/products/` redirects to `/projects/` via `_redirects`.

**Tech Stack:** SvelteKit 2 + Svelte 4 (no runes, `svelte:` event syntax), TypeScript, Tailwind CSS v4 (arbitrary `#HEX` values only, no invented color names), lucide-svelte, Cloudflare Pages. No test runner is configured — verification is `yarn check` (svelte-check) plus `yarn build`.

**Design conventions (must follow):**
- Comments: UPPERCASE section comments (`// -- CONSTANTS -- //` etc.); import groups in order: DEP-TYPES, TYPES, ENVS, DEP-MODULES, MODULES, DEP-COMPONENTS, COMPONENTS.
- Colors via arbitrary values only: dark page `#0B0A23`, card `#1E1A5E`, border `#2A2578`, accent cyan `#0891B2` (light) / `#22D3EE` (dark), teal `#2DD4BF`, body `#475569`/`#64748B` (dark `slate-300`/`slate-400`), headings `#0F172A` (dark white). Cards: `rounded-2xl border border-[#E2E8F0] bg-white ... dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/20` style.
- Fonts: headings `font-display`, eyebrows `font-mono`, body default (Satoshi).
- One H1 per page. `use:reveal` actions for scroll animations.
- Do NOT touch the 5 product tool pages (`src/routes/products/(utilities|chrome-plugins)/*`), `ParticleBackground.svelte`, the stats API, or `extensions/`.

---

## Task 1: Baseline check + asset placement

**Files:**
- Create: `static/projects/top-one-uwu/`, `static/projects/calculus-courseware/`, `static/projects/exemplary-league-portal/`, `static/projects/door-lock-module/`

- [ ] **Step 1: Verify the baseline builds**

Run: `yarn check`
Expected: no errors (svelte-check passes). If errors exist, fix them first and stop — do not build on a broken tree.

- [ ] **Step 2: Create static asset folders and copy project images**

Run (PowerShell):

```powershell
New-Item -ItemType Directory -Path "static\projects\top-one-uwu" -Force | Out-Null
New-Item -ItemType Directory -Path "static\projects\calculus-courseware" -Force | Out-Null
New-Item -ItemType Directory -Path "static\projects\exemplary-league-portal" -Force | Out-Null
New-Item -ItemType Directory -Path "static\projects\door-lock-module" -Force | Out-Null

Copy-Item "docs\content\projects\top-one-uwu\TopOneUwu-1.png" "static\projects\top-one-uwu\cover.png"
Copy-Item "docs\content\projects\top-one-uwu\TopOneUwu-2.png" "static\projects\top-one-uwu\screenshot-1.png"

Copy-Item "docs\content\projects\calculus-courseware\BasicCalculusCourseware-1.png" "static\projects\calculus-courseware\cover.png"
Copy-Item "docs\content\projects\calculus-courseware\BasicCalculusCourseware-2.png" "static\projects\calculus-courseware\screenshot-1.png"

Copy-Item "docs\content\projects\exemplary-league-portal\ELITES-1.png" "static\projects\exemplary-league-portal\cover.png"
Copy-Item "docs\content\projects\exemplary-league-portal\ELITES-2.png" "static\projects\exemplary-league-portal\screenshot-1.png"
Copy-Item "docs\content\projects\exemplary-league-portal\ELITES-3.png" "static\projects\exemplary-league-portal\screenshot-2.png"

Copy-Item "docs\content\projects\door-lock-module\IMRAD-Smart-Door-Lock-Face-Recognition-and-RFID-Technology-for-ITDS-Department-SC.pdf" "static\projects\door-lock-module\"
```

Expected: `Get-ChildItem -Recurse static\projects | Select-Object FullName` lists 9 files. (door-lock-module deliberately has NO cover image — a generated placeholder is used instead. The 134 MB demo MP4 stays in `docs/` and is NOT copied.)

- [ ] **Step 3: Commit**

```bash
git add static/projects
git commit -m "feat(site): add portfolio project images and research paper"
```

---

## Task 2: Types + data layer

**Files:**
- Modify: `src/lib/types/index.ts` (append `PortfolioProject` interface)
- Create: `src/lib/data/projects.ts`
- Create: `src/lib/data/skills.ts`
- Modify: `src/lib/data/navigation.ts` (rewrite)

- [ ] **Step 1: Add the `PortfolioProject` interface**

Append to `src/lib/types/index.ts` (after the `BlogCategoryInfo` interface at the end of the file):

```ts
export interface PortfolioProject {
	slug: string;
	name: string;
	tagline: string;
	year: string;
	category: string;
	role: string;
	status: string;
	recognition?: string;
	summary: string;
	problem?: string;
	solution?: string;
	features: string[];
	stack: string[];
	links: { label: string; url: string }[];
	cover?: string;
	screenshots?: string[];
	video?: { embedUrl: string; title: string };
	pdf?: { path: string; label: string };
}
```

- [ ] **Step 2: Create `src/lib/data/projects.ts`**

```ts
// IMPORTED TYPES
import type { PortfolioProject } from '$lib/types';

export const projects: PortfolioProject[] = [
	{
		slug: 'door-lock-module',
		name: 'Door Lock Module',
		tagline: 'Smart door lock with RFID and face recognition for a university faculty room.',
		year: '2026',
		category: 'IoT · Web App',
		role: 'Proponent · full-stack & hardware',
		status: 'Completed',
		recognition: 'Registered with IPOPHL · Feb 2026',
		summary:
			'Capstone for Bulacan State University: an Arduino-powered smart door lock with RFID and face recognition, managed through a SvelteKit web app.',
		problem:
			'Unauthorized access to the faculty room of the Information Technology and Decision Sciences (ITDS) Department at Bulacan State University — Sarmiento Campus.',
		solution:
			'An Arduino-powered smart door lock system with RFID and face recognition, plus a management website for real-time access control: assign, change, or remove face profiles and RFID cards from any browser.',
		features: [
			'RFID authentication from two readers (front and back of the door)',
			'Face recognition through the web interface',
			'Real-time access logs',
			'Role-based permissions for admins and staff',
			'Special access requests workflow',
			'Automated notifications',
			'LCD, LED, and buzzer status feedback',
			'UPS backup power during outages',
		],
		stack: ['SvelteKit', 'Supabase', 'Face API JS', 'Arduino Mega 2560', 'ESP8266 NodeMCU', 'RFID RC522', 'Vercel'],
		links: [{ label: 'Video demo', url: 'https://drive.google.com/file/d/1nP0sxq7zsu-T9uGX4PkL9_r0YTN7GDT7/view' }],
		video: {
			embedUrl: 'https://drive.google.com/file/d/1nP0sxq7zsu-T9uGX4PkL9_r0YTN7GDT7/preview',
			title: 'Door Lock Module demo',
		},
		pdf: {
			path: '/projects/door-lock-module/IMRAD-Smart-Door-Lock-Face-Recognition-and-RFID-Technology-for-ITDS-Department-SC.pdf',
			label: 'Research paper (IMRAD)',
		},
	},
	{
		slug: 'top-one-uwu',
		name: 'Top One Uwu',
		tagline: 'Free AI-powered writing assistant for students — featured in Inquirer.net.',
		year: '2022',
		category: 'Web App · AI',
		role: 'Solo developer',
		status: 'Archived',
		recognition: 'Featured in Inquirer.net',
		summary:
			'A free AI-powered writing and study assistant for students, built at 19 while exploring SvelteKit. Went viral in the Programming Philippines community and was covered by Inquirer.net.',
		problem:
			'Paid grammar-checking apps hide their best features behind premium upgrades — students needed a free alternative.',
		solution:
			'A completely free web app combining grammar fixing, rewriting, summarizing, essay writing, and plagiarism checking, run entirely on free tiers of Supabase, OpenAI, and Render.',
		features: [
			'Grammar fixer',
			'Content rephraser',
			'Content expander',
			'Content summarizer',
			'Essay writer',
			'Essay title generator',
			'Plagiarism checker',
		],
		stack: ['SvelteKit', 'Supabase', 'OpenAI API', 'Tailwind CSS', 'Render'],
		links: [
			{
				label: 'Inquirer.net article',
				url: 'https://technology.inquirer.net/118079/19-yo-student-develops-free-alternative-grammar-checking-web-app',
			},
		],
		cover: '/projects/top-one-uwu/cover.png',
		screenshots: ['/projects/top-one-uwu/screenshot-1.png'],
	},
	{
		slug: 'calculus-courseware',
		name: 'Basic Calculus Courseware',
		tagline: 'Client-built e-learning platform for a doctoral program.',
		year: '2022',
		category: 'Web App · E-learning',
		role: 'Contracted full-stack developer',
		status: 'Completed',
		summary:
			'A courseware platform for Basic Calculus with student and teacher accounts — courses, lessons, videos, modules, interactive worksheets, and assessments.',
		problem: 'A client completing a doctoral degree needed a courseware platform tailored to teaching Basic Calculus.',
		solution:
			'A comprehensive web application covering the whole teaching workflow: enrolled students, lessons, academic quarters, video materials, modules, worksheets, and assessments.',
		features: [
			'Student and teacher accounts',
			'Course and lesson management',
			'Video material storage',
			'Module delivery',
			'Interactive worksheets',
			'Assessments',
			'Academic quarter tracking',
		],
		stack: ['Next.js', 'React', 'Firebase'],
		links: [],
		cover: '/projects/calculus-courseware/cover.png',
		screenshots: ['/projects/calculus-courseware/screenshot-1.png'],
	},
	{
		slug: 'exemplary-league-portal',
		name: 'ELITS Membership Portal',
		tagline: 'Digital membership and blog portal for my student organization — built as Vice-President.',
		year: '2023',
		category: 'Web App',
		role: 'Solo developer · org VP',
		status: 'Completed',
		summary:
			'Streamlined the membership process for the Exemplary League of Information Technology Students (ELITS) at Bulacan State University — Sarmiento Campus, with a blog alongside.',
		problem: 'The student organization relied on manual sign-ups; membership needed a digital workflow.',
		solution: 'A web application that streamlines ELITS membership, with a built-in blog covering a variety of topics.',
		features: ['Digital membership process', 'Built-in blog'],
		stack: ['SvelteKit', 'Tailwind CSS', 'Supabase'],
		links: [],
		cover: '/projects/exemplary-league-portal/cover.png',
		screenshots: [
			'/projects/exemplary-league-portal/screenshot-1.png',
			'/projects/exemplary-league-portal/screenshot-2.png',
		],
	},
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
	return projects.find((p) => p.slug === slug);
}
```

- [ ] **Step 3: Create `src/lib/data/skills.ts`**

```ts
export interface SkillGroup {
	name: string;
	skills: string[];
}

export const skillGroups: SkillGroup[] = [
	{
		name: 'Frontend',
		skills: ['JavaScript / TypeScript', 'SvelteKit', 'Svelte', 'Next.js', 'React', 'Tailwind CSS', 'SCSS / CSS', 'HTML'],
	},
	{
		name: 'Backend',
		skills: ['Node.js', 'Supabase', 'Firebase', 'PocketBase', 'MySQL', 'PHP', 'ORM'],
	},
	{
		name: 'Mobile',
		skills: ['Capacitor', 'Progressive Web Apps', 'Google Play deployment'],
	},
	{
		name: 'Hosting & DevOps',
		skills: ['Vercel', 'Render', 'Cloudflare Pages', 'Plesk', 'Webuzo', 'Nginx', 'VPS'],
	},
	{
		name: 'AI & APIs',
		skills: ['OpenAI API', 'LLM prompt engineering', 'REST APIs'],
	},
];
```

- [ ] **Step 4: Rewrite `src/lib/data/navigation.ts`**

Replace the entire file content with:

```ts
// IMPORTED TYPES
import type { NavLink, SocialLink } from '$lib/types';

export const navLinks: NavLink[] = [
	{ label: 'Projects', href: '/projects/' },
	{ label: 'Blog', href: '/blog/' },
	{ label: 'About', href: '/about/' },
	{ label: 'Contact', href: '/contact/' },
];

export const socialLinks: SocialLink[] = [
	{ platform: 'GitHub', url: 'https://github.com/ArbenApura', icon: 'github' },
	{ platform: 'Facebook', url: 'https://www.facebook.com/arbenapura.official', icon: 'facebook' },
];
```

- [ ] **Step 5: Verify types**

Run: `yarn check`
Expected: passes (new files are not imported anywhere yet, so no new errors).

- [ ] **Step 6: Commit**

```bash
git add src/lib/types/index.ts src/lib/data/projects.ts src/lib/data/skills.ts src/lib/data/navigation.ts
git commit -m "feat(site): add portfolio project, skills, and navigation data"
```

---

## Task 3: Shared project components

**Files:**
- Create: `src/lib/components/projects/ProjectCover.svelte`
- Create: `src/lib/components/projects/ProjectCard.svelte`
- Create: `src/lib/components/projects/MinorProjectCard.svelte`

- [ ] **Step 1: Create `src/lib/components/projects/ProjectCover.svelte`**

```svelte
<script lang="ts">
	// IMPORTED TYPES
	import type { PortfolioProject } from '$lib/types';

	// -- REQUIRED PROPS -- //

	export let project: PortfolioProject;

	// -- OPTIONAL PROPS -- //

	export let imageClass: string = '';
	export let placeholderClass: string = '';

	// -- REACTIVE STATES -- //

	$: initials = project.name
		.split(' ')
		.map((w) => w[0])
		.join('')
		.slice(0, 3)
		.toUpperCase();
</script>

{#if project.cover}
	<img src={project.cover} alt={`${project.name} screenshot`} loading="lazy" class={imageClass} />
{:else}
	<div class={placeholderClass}>
		<div class="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#1E1A5E] via-[#0B0A23] to-[#0B0A23]">
			<div
				class="absolute h-40 w-40 rounded-full opacity-25 blur-3xl"
				style="background: radial-gradient(circle, rgba(34, 211, 238, 0.5) 0%, transparent 70%);"
				aria-hidden="true"
			></div>
			<div class="relative text-center">
				<p class="font-display text-5xl font-bold tracking-tight text-white">{initials}</p>
				<p class="font-mono mt-3 text-xs tracking-widest text-[#22D3EE]">{project.year}</p>
			</div>
		</div>
	</div>
{/if}
```

- [ ] **Step 2: Create `src/lib/components/projects/ProjectCard.svelte`**

```svelte
<script lang="ts">
	// IMPORTED TYPES
	import type { PortfolioProject } from '$lib/types';

	// IMPORTED DEP-MODULES
	import { ArrowUpRight } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import ProjectCover from '$lib/components/projects/ProjectCover.svelte';

	// -- REQUIRED PROPS -- //

	export let project: PortfolioProject;
	export let delay: number = 0;
</script>

<a
	href="/projects/{project.slug}/"
	use:reveal={{ delay }}
	class="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#0891B2]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-[#2A2578]/60 dark:from-[#1E1A5E]/30 dark:to-[#0B0A23] dark:shadow-none dark:hover:border-[#22D3EE]/40 dark:hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)]"
>
	<!-- COVER -->
	<ProjectCover {project} imageClass="aspect-video w-full object-cover" placeholderClass="aspect-video w-full" />

	<!-- BODY -->
	<div class="flex flex-1 flex-col gap-4 p-6">
		<!-- BADGES -->
		<div class="flex flex-wrap items-center gap-2">
			<span class="rounded-full bg-[#2DD4BF]/10 px-3 py-1 font-mono text-xs text-[#2DD4BF]">
				{project.year}
			</span>
			<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
				{project.category}
			</span>
		</div>

		<h2 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">
			{project.name}
		</h2>

		<p class="flex-1 text-sm text-[#64748B] dark:text-slate-400">
			{project.tagline}
		</p>

		{#if project.recognition}
			<p class="flex items-center gap-1.5 text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">
				<span class="h-1.5 w-1.5 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				{project.recognition}
			</p>
		{/if}

		<!-- FOOTER -->
		<div class="flex items-center justify-between border-t border-[#F1F5F9] pt-4 dark:border-[#2A2578]/40">
			<span class="text-xs text-[#94A3B8] dark:text-slate-500">{project.role}</span>
			<span class="flex items-center gap-1 text-sm font-medium text-[#0891B2] transition-all group-hover:gap-2 dark:text-[#22D3EE]">
				View project
				<ArrowUpRight size={14} />
			</span>
		</div>
	</div>
</a>
```

- [ ] **Step 3: Create `src/lib/components/projects/MinorProjectCard.svelte`**

```svelte
<script lang="ts">
	// IMPORTED TYPES
	import type { Product } from '$lib/types';

	// IMPORTED DEP-MODULES
	import { ArrowRight, Image, Minimize2, Palette, Volume2, Code, Wrench } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// -- REQUIRED PROPS -- //

	export let product: Product;
	export let delay: number = 0;

	// -- CONSTANTS -- //

	const PRODUCT_ICONS: Record<string, typeof Code> = {
		'image-resizer': Image,
		'image-compressor': Minimize2,
		'color-picker': Palette,
		'sound-booster': Volume2,
		'html-editor': Code,
	};

	// -- REACTIVE STATES -- //

	$: Icon = PRODUCT_ICONS[product.slug] || Wrench;
	$: isExtension = product.category === 'chrome-plugins';
</script>

<a
	href={product.externalUrl || `/products/${product.slug}/`}
	use:reveal={{ delay }}
	class="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:border-[#0891B2]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/20 dark:hover:border-[#22D3EE]/40 dark:hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)]"
>
	<!-- TOP ROW -->
	<div class="mb-4 flex items-center justify-between">
		<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
			<Icon class="size-5 text-[#0891B2] dark:text-[#22D3EE]" />
		</div>
		{#if isExtension}
			<span class="rounded-full border border-[#E2E8F0] px-2.5 py-0.5 text-[10px] text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
				Chrome extension
			</span>
		{/if}
	</div>

	<h3 class="font-display text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">
		{product.name}
	</h3>

	<p class="mt-2 flex-1 text-sm text-[#64748B] dark:text-slate-400">
		{product.description}
	</p>

	<!-- FOOTER -->
	<div class="mt-5 flex items-center justify-between border-t border-[#F1F5F9] pt-4 dark:border-[#2A2578]/40">
		<span class="flex items-center gap-1.5 text-xs text-[#2DD4BF]">
			<span class="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
			Live
		</span>
		<span class="flex items-center gap-1 text-xs font-medium text-[#0891B2] transition-all group-hover:gap-2 dark:text-[#22D3EE]">
			Open tool
			<ArrowRight size={13} />
		</span>
	</div>
</a>
```

- [ ] **Step 4: Verify + commit**

Run: `yarn check` — Expected: passes.
Run:

```bash
git add src/lib/components/projects
git commit -m "feat(site): add project card, minor project card, and cover components"
```

---

## Task 4: Home section components (FeaturedProjects, MinorTools, Skills)

**Files:**
- Create: `src/lib/components/home/FeaturedProjects.svelte`
- Create: `src/lib/components/home/MinorTools.svelte`
- Create: `src/lib/components/home/Skills.svelte`

- [ ] **Step 1: Create `src/lib/components/home/FeaturedProjects.svelte`**

```svelte
<script lang="ts">
	// IMPORTED DEP-MODULES
	import { ArrowRight } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
	import { projects } from '$lib/data/projects';

	// IMPORTED COMPONENTS
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
</script>

<!-- FEATURED PROJECTS SECTION -->
<section class="relative overflow-hidden py-16 md:py-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- SECTION INTRO -->
		<div use:reveal class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div class="max-w-2xl">
				<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Selected work</p>
				<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
					Featured projects
				</h2>
			</div>
			<a
				href="/projects/"
				class="group flex items-center gap-1.5 text-sm font-medium text-[#0891B2] transition-colors hover:text-[#0E7490] dark:text-[#22D3EE] dark:hover:text-[#67E8F9]"
			>
				View all projects
				<ArrowRight size={14} class="transition-transform group-hover:translate-x-0.5" />
			</a>
		</div>

		<!-- PROJECT CARDS -->
		<div class="grid gap-6 sm:grid-cols-2">
			{#each projects as project, i}
				<ProjectCard {project} delay={i * 100} />
			{/each}
		</div>
	</div>
</section>
```

- [ ] **Step 2: Create `src/lib/components/home/MinorTools.svelte`**

```svelte
<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
	import { products } from '$lib/data/products';

	// IMPORTED COMPONENTS
	import MinorProjectCard from '$lib/components/projects/MinorProjectCard.svelte';

	// -- REACTIVE STATES -- //

	$: liveProducts = products.filter((p) => p.status === 'live');
</script>

<!-- MINOR TOOLS SECTION -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 md:py-24 dark:border-[#2A2578]/50">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- SECTION INTRO -->
		<div use:reveal class="mb-10 max-w-2xl">
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Still live</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
				Small tools I've shipped
			</h2>
			<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
				Free browser tools and Chrome extensions — all private, no uploads, no accounts.
			</p>
		</div>

		<!-- TOOL CARDS -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each liveProducts as product, i}
				<MinorProjectCard {product} delay={i * 80} />
			{/each}
		</div>
	</div>
</section>
```

- [ ] **Step 3: Create `src/lib/components/home/Skills.svelte`**

```svelte
<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
	import { skillGroups } from '$lib/data/skills';
</script>

<!-- SKILLS SECTION -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 md:py-24 dark:border-[#2A2578]/50">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- SECTION INTRO -->
		<div use:reveal class="mb-10 max-w-2xl">
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Skills</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
				What I work with
			</h2>
		</div>

		<!-- SKILL GROUP CARDS -->
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
```

- [ ] **Step 4: Verify + commit**

Run: `yarn check` — Expected: passes.
Run:

```bash
git add src/lib/components/home/FeaturedProjects.svelte src/lib/components/home/MinorTools.svelte src/lib/components/home/Skills.svelte
git commit -m "feat(site): add home sections for featured projects, minor tools, and skills"
```

---

## Task 5: Layout + SEO cleanup and deletions

**Files:**
- Modify: `src/routes/+layout.svelte` (remove CookieBanner, update WebSite JSON-LD name)
- Modify: `src/lib/components/seo/MetaTags.svelte` (remove `twitter:site`, default siteName)
- Delete: `src/routes/privacy/`, `src/routes/terms/`, `src/routes/cookies/`
- Delete: `src/lib/components/layout/LanguageSelector.svelte`, `src/lib/components/layout/CookieBanner.svelte`
- Delete: `src/lib/data/locales.ts`, `src/lib/stores/locale.ts`
- Delete: `src/lib/components/home/Newsletter.svelte`, `src/lib/components/home/ProductCategories.svelte`
- Delete (dead code): `src/lib/components/home/Roadmap.svelte`, `src/lib/components/home/TechStack.svelte`, `src/lib/components/home/GridBackground.svelte`

- [ ] **Step 1: Verify no other usages of deleted modules**

Run: `rg -l "locale|LanguageSelector|CookieBanner|Newsletter|ProductCategories" src --glob "!*.d.ts"`
Expected: matches only in `src/lib/components/layout/Navbar.svelte`, `src/lib/components/layout/Footer.svelte`, `src/routes/+layout.svelte`, `src/routes/+page.svelte` (all are modified in later tasks) — plus the files being deleted themselves. Also run `rg -l "CategoryIllustration|EmptyStateIllustration" src` — Expected: only `src/lib/components/ui/CategoryIllustration.svelte` + `src/lib/components/ui/EmptyStateIllustration.svelte` themselves and `ProductCategories.svelte`; if only ProductCategories references them, they are unused and safe to leave (do NOT delete them in this task — they are referenced by the category system and may be reused later; deleting is optional).

- [ ] **Step 2: Update `src/routes/+layout.svelte`**

Replace the `<script>` block (lines 1–13) and the WebSite JSON-LD name and the CookieBanner usage with the following — final full file content:

```svelte
<script lang="ts">
	// IMPORTED MODULES
	import '../app.css';
	import { hideChrome } from '$lib/stores/layout';

	// IMPORTED DEP-COMPONENTS
	import { Toaster } from 'svelte-sonner';
	// IMPORTED COMPONENTS
	import Footer from '$lib/components/layout/Footer.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
</script>

<!-- SITEWIDE JSON-LD -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Arben Apura',
		url: 'https://arbenger.com',
	}}
/>

<!-- SKIP TO CONTENT -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[#22D3EE] focus:px-4 focus:py-2 focus:text-[#0B0A23]"
>
	Skip to content
</a>

{#if !$hideChrome}
	<Navbar />
{/if}

<!-- MAIN CONTENT -->
<main id="main-content">
	<slot />
</main>

{#if !$hideChrome}
	<Footer />
{/if}
<Toaster richColors closeButton position="bottom-right" />
```

- [ ] **Step 3: Update `src/lib/components/seo/MetaTags.svelte`**

Delete the `twitter:site` line and change the default `siteName` prop. Final full file content:

```svelte
<script lang="ts">
	// -- REQUIRED PROPS -- //

	export let title: string;
	export let description: string;
	export let url: string;

	// -- OPTIONAL PROPS -- //

	export let image: string = 'https://arbenger.com/og-image.png';
	export let type: 'website' | 'article' = 'website';
	export let siteName: string = 'Arben Apura';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<!-- OPEN GRAPH -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={siteName} />

	<!-- TWITTER CARD -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
```

- [ ] **Step 4: Delete company-era files and routes**

Run (PowerShell):

```powershell
Remove-Item -Recurse -Force "src\routes\privacy"
Remove-Item -Recurse -Force "src\routes\terms"
Remove-Item -Recurse -Force "src\routes\cookies"
Remove-Item -Force "src\lib\components\layout\LanguageSelector.svelte"
Remove-Item -Force "src\lib\components\layout\CookieBanner.svelte"
Remove-Item -Force "src\lib\data\locales.ts"
Remove-Item -Force "src\lib\stores\locale.ts"
Remove-Item -Force "src\lib\components\home\Newsletter.svelte"
Remove-Item -Force "src\lib\components\home\ProductCategories.svelte"
Remove-Item -Force "src\lib\components\home\Roadmap.svelte"
Remove-Item -Force "src\lib\components\home\TechStack.svelte"
Remove-Item -Force "src\lib\components\home\GridBackground.svelte"
```

Expected: each path is gone. `yarn check` will now FAIL because Navbar/Footer still import LanguageSelector — that is expected; it is resolved in Tasks 6–7. Do not commit a broken state; proceed directly to Task 6.

---

## Task 6: Navbar rewrite (remove mega menu + language selector, add Projects link)

**Files:**
- Modify: `src/lib/components/layout/Navbar.svelte` (full rewrite)

- [ ] **Step 1: Replace the entire file with the new Navbar**

```svelte
<script lang="ts">
	// IMPORTED DEP-MODULES
	import { fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { sortedPosts, formatPostDate } from '$lib/data/blog';

	// IMPORTED DEP-COMPONENTS
	import { Menu, X, ChevronDown, ArrowRight, BookOpen } from 'lucide-svelte';

	// IMPORTED COMPONENTS
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';

	// -- TYPES -- //

	type Popover = 'blog' | null;

	// -- CONSTANTS -- //

	const PLAIN_LINKS = [
		{ label: 'Projects', href: '/projects/' },
		{ label: 'About', href: '/about/' },
		{ label: 'Contact', href: '/contact/' },
	];

	// -- STATES -- //

	let scrollY = 0;

	let isMobileMenuOpen = false;

	let activePopover: Popover = null;

	let navEl: HTMLElement;

	let mobileBlogOpen = false;

	// -- REACTIVE STATES -- //

	$: isScrolled = scrollY > 50;

	$: recentPosts = sortedPosts.slice(0, 3);

	// -- FUNCTIONS -- //

	function togglePopover(name: 'blog') {
		activePopover = activePopover === name ? null : name;
	}

	function closeAll() {
		activePopover = null;
		isMobileMenuOpen = false;
		mobileBlogOpen = false;
	}

	function handleWindowClick(e: MouseEvent) {
		if (activePopover && navEl && !navEl.contains(e.target as Node)) {
			activePopover = null;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			activePopover = null;
			isMobileMenuOpen = false;
		}
	}
</script>

<svelte:window bind:scrollY on:click={handleWindowClick} on:keydown={handleKeydown} />

<!-- NAVBAR -->
<nav
	bind:this={navEl}
	aria-label="Main navigation"
	class={cn(
		'fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300',
		isScrolled || isMobileMenuOpen || activePopover
			? 'border-[#F1F5F9] bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-lg dark:border-[#2A2578] dark:bg-[#0B0A23]/95 dark:shadow-none'
			: 'border-transparent bg-transparent',
	)}
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- LOGO + WORDMARK -->
		<a href="/" class="flex items-center gap-3" on:click={closeAll}>
			<Logo size={32} class="text-[#0F172A] dark:text-white" />
			<span class="font-display text-lg tracking-tight text-[#0F172A] dark:text-white">
				ARBENGER
			</span>
		</a>

		<!-- DESKTOP NAV -->
		<div class="hidden items-center gap-8 lg:flex">
			{#each PLAIN_LINKS as link}
				<a
					href={link.href}
					class="text-sm text-[#475569] transition-colors duration-200 hover:text-[#0891B2] dark:text-slate-300 dark:hover:text-[#22D3EE]"
				>
					{link.label}
				</a>
			{/each}

			<!-- BLOG TRIGGER + DROPDOWN -->
			<div class="relative">
				<button
					on:click={() => togglePopover('blog')}
					class={cn(
						'flex items-center gap-1 text-sm transition-colors duration-200',
						activePopover === 'blog'
							? 'text-[#0891B2] dark:text-[#22D3EE]'
							: 'text-[#475569] hover:text-[#0891B2] dark:text-slate-300 dark:hover:text-[#22D3EE]',
					)}
					aria-expanded={activePopover === 'blog'}
					aria-haspopup="true"
				>
					Blog
					<ChevronDown
						size={14}
						class={cn(
							'transition-transform duration-200',
							activePopover === 'blog' && 'rotate-180',
						)}
					/>
				</button>

				<!-- BLOG DROPDOWN PANEL -->
				{#if activePopover === 'blog'}
					<div
						transition:fly={{ y: -8, duration: 150, easing: cubicOut }}
						class="absolute left-1/2 top-full mt-4 w-96 -translate-x-1/2 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-[#2A2578] dark:bg-[#0F0E2A] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
					>
						<p class="mb-3 font-mono text-xs tracking-widest text-[#0891B2] dark:text-[#22D3EE]">
							LATEST
						</p>

						<div class="space-y-1">
							{#each recentPosts as post}
								<a
									href="/blog/{post.slug}/"
									class="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[#F1F5F9] dark:hover:bg-[#1E1A5E]"
									on:click={() => (activePopover = null)}
								>
									<BookOpen
										size={16}
										class="mt-0.5 shrink-0 text-[#94A3B8] transition-colors group-hover:text-[#0891B2] dark:group-hover:text-[#22D3EE]"
									/>
									<div class="min-w-0">
										<p
											class="truncate text-sm font-medium text-[#0F172A] group-hover:text-[#0891B2] dark:text-white dark:group-hover:text-[#22D3EE]"
										>
											{post.title}
										</p>
										<p class="mt-0.5 text-xs text-[#94A3B8]">
											{formatPostDate(post.date)} · {post.readTime} min read
										</p>
									</div>
								</a>
							{/each}
						</div>

						<div class="mt-3 border-t border-[#E2E8F0] pt-3 dark:border-[#2A2578]">
							<a
								href="/blog/"
								class="group flex items-center gap-1.5 text-sm font-medium text-[#0891B2] transition-colors hover:text-[#0E7490] dark:text-[#22D3EE] dark:hover:text-[#67E8F9]"
								on:click={() => (activePopover = null)}
							>
								View all posts
								<ArrowRight
									size={14}
									class="transition-transform group-hover:translate-x-0.5"
								/>
							</a>
						</div>
					</div>
				{/if}
			</div>

			<ThemeToggle />
		</div>

		<!-- MOBILE MENU BUTTON -->
		<div class="flex items-center gap-2 lg:hidden">
			<ThemeToggle />
			<button
				on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				class="rounded-lg p-2 text-[#475569] transition-colors duration-200 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5"
				aria-label="Toggle menu"
			>
				{#if isMobileMenuOpen}
					<X class="size-5" />
				{:else}
					<Menu class="size-5" />
				{/if}
			</button>
		</div>
	</div>

	<!-- MOBILE MENU DRAWER -->
	{#if isMobileMenuOpen}
		<div
			transition:slide={{ duration: 200, easing: cubicOut }}
			class="border-t border-[#E2E8F0] bg-white/95 px-6 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden dark:border-[#2A2578] dark:bg-[#0B0A23]/95 dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
		>
			<!-- PLAIN LINKS -->
			{#each PLAIN_LINKS as link}
				<a
					href={link.href}
					class="block rounded-lg px-4 py-3.5 text-base font-medium text-[#0F172A] transition-colors duration-200 hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-white dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]"
					on:click={closeAll}
				>
					{link.label}
				</a>
			{/each}

			<!-- BLOG (EXPANDABLE) -->
			<button
				on:click={() => (mobileBlogOpen = !mobileBlogOpen)}
				class="flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-left text-base font-medium text-[#0F172A] transition-colors duration-200 hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-white dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]"
			>
				Blog
				<ChevronDown
					size={16}
					class={cn(
						'transition-transform duration-200',
						mobileBlogOpen && 'rotate-180',
					)}
				/>
			</button>

			{#if mobileBlogOpen}
				<div transition:slide={{ duration: 150, easing: cubicOut }} class="mb-1 ml-4 space-y-0.5">
					{#each recentPosts as post}
						<a
							href="/blog/{post.slug}/"
							class="block rounded-lg px-4 py-2.5 text-sm text-[#475569] transition-colors hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-slate-400 dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]"
							on:click={closeAll}
						>
							<span class="line-clamp-1">{post.title}</span>
						</a>
					{/each}
					<a
						href="/blog/"
						class="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[#0891B2] transition-colors hover:bg-[#0891B2]/10 dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/10"
						on:click={closeAll}
					>
						<ArrowRight size={14} />
						View all posts
					</a>
				</div>
			{/if}
		</div>
	{/if}
</nav>
```

- [ ] **Step 2: Verify**

Run: `yarn check`
Expected: passes — Navbar no longer references LanguageSelector/products.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/layout/Navbar.svelte
git commit -m "refactor(site): simplify navbar to plain links, keep blog dropdown"
```

---

## Task 7: Footer rewrite (remove legal links + language selector, add Facebook)

**Files:**
- Modify: `src/lib/components/layout/Footer.svelte` (full rewrite)

- [ ] **Step 1: Replace the entire file with the new Footer**

```svelte
<script lang="ts">
	// IMPORTED MODULES
	import { navLinks, socialLinks } from '$lib/data/navigation';

	// IMPORTED COMPONENTS
	import Logo from '$lib/components/ui/Logo.svelte';

	// -- CONSTANTS -- //

	const CURRENT_YEAR = new Date().getFullYear();

	// BRAND ICONS NOT AVAILABLE IN LUCIDE V1+; INLINE SVG PATHS USED INSTEAD
	const SOCIAL_ICONS: Record<string, string> = {
		github: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
		facebook:
			'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
	};
</script>

<!-- FOOTER -->
<footer class="border-t border-[#E2E8F0] bg-white dark:border-[#2A2578] dark:bg-[#0B0A23]">
	<div class="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
		<!-- FOOTER GRID: STACKED ON MOBILE, 4 COLUMNS ON DESKTOP -->
		<div class="grid gap-8 md:grid-cols-4">
			<!-- LOGO + TAGLINE -->
			<div>
				<a href="/" class="flex items-center gap-3">
					<Logo size={32} class="text-[#0F172A] dark:text-white" />
					<span class="font-display text-lg tracking-tight text-[#0F172A] dark:text-white">ARBENGER</span>
				</a>
				<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
					Full-stack developer building web apps, AI tools, and extensions.
				</p>
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

			<!-- CONNECT -->
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

			<!-- ABOUT BLURB -->
			<div>
				<h3 class="font-display text-sm font-bold tracking-tight text-[#0F172A] uppercase dark:text-white">Available for work</h3>
				<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">
					Open to freelance projects and full-time roles. Based in the Philippines, working worldwide.
				</p>
			</div>
		</div>

		<!-- COPYRIGHT -->
		<div class="mt-12 flex items-center justify-between border-t border-[#E2E8F0] pt-8 dark:border-[#2A2578]">
			<p class="text-sm text-[#64748B] dark:text-slate-400">
				&copy; {CURRENT_YEAR} Arben Apura. All rights reserved.
			</p>
		</div>
	</div>
</footer>
```

- [ ] **Step 2: Verify + commit**

Run: `yarn check` — Expected: passes.
Run:

```bash
git add src/lib/components/layout/Footer.svelte src/routes/+layout.svelte src/lib/components/seo/MetaTags.svelte
git add -A src/routes/privacy src/routes/terms src/routes/cookies src/lib/components/layout/LanguageSelector.svelte src/lib/components/layout/CookieBanner.svelte src/lib/data/locales.ts src/lib/stores/locale.ts src/lib/components/home/Newsletter.svelte src/lib/components/home/ProductCategories.svelte src/lib/components/home/Roadmap.svelte src/lib/components/home/TechStack.svelte src/lib/components/home/GridBackground.svelte
git commit -m "refactor(site): remove company chrome — newsletter, locale, cookie banner, legal pages"
```

---

## Task 8: Hero + AboutTeaser copy

**Files:**
- Modify: `src/lib/components/home/Hero.svelte` (copy + CTAs)
- Modify: `src/lib/components/home/AboutTeaser.svelte` (copy)

- [ ] **Step 1: Update Hero phrases**

In `src/lib/components/home/Hero.svelte`, replace the `HERO_PHRASES` constant (lines 15–21):

```ts
	const HERO_PHRASES = [
		'Full-Stack Web Developer',
		'SvelteKit & Next.js Specialist',
		'Indie Tool Builder',
		'Freelance Developer',
		'Student of Clean Code',
	];
```

- [ ] **Step 2: Update the Hero heading, subtitle, and CTAs**

Replace the block from `<!-- TAGLINE -->` through the closing of the CTA `</div>` (the whole text content column, currently lines 94–135) with:

```svelte
			<!-- TAGLINE -->
			<div
				class:opacity-0={!isVisible}
				class:translate-y-8={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition: all 1s ease; transition-delay: 100ms;"
			>
				<span class="inline-flex items-center gap-2 rounded-full border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 px-3.5 py-1.5 font-mono text-xs text-[#0F766E] dark:text-[#2DD4BF]">
					<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2DD4BF]" />
					Available for freelance work
				</span>
			</div>

			<h1
				class="font-display max-w-4xl text-4xl leading-[1.1] font-bold tracking-tight text-[#0F172A] transition-all duration-1000 md:text-6xl lg:text-7xl dark:text-white"
				class:opacity-0={!isVisible}
				class:translate-y-8={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition-delay: 200ms;"
			>
				Arben M. Apura
				<br />
				<span class="text-[#0891B2] dark:text-[#22D3EE]">
					<Typewriter phrases={HERO_PHRASES} typingSpeed={70} deletingSpeed={35} pauseDuration={2500} />
				</span>
			</h1>

			<!-- SUBTITLE -->
			<p
				class="mt-8 max-w-xl text-lg text-[#475569] transition-all duration-1000 md:text-xl dark:text-slate-300"
				class:opacity-0={!isVisible}
				class:translate-y-8={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition-delay: 400ms;"
			>
				I build clean, efficient web applications — from full-stack platforms and AI tools to
				Chrome extensions that do one thing well.
			</p>

			<!-- CTA BUTTONS -->
			<div
				class="mt-12 flex flex-wrap items-center gap-4 transition-all duration-1000"
				class:opacity-0={!isVisible}
				class:translate-y-8={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition-delay: 600ms;"
			>
				<Button href="/projects/" variant="primary" class="group relative overflow-hidden">
					<span class="relative z-10">View Projects</span>
				</Button>
				<Button href="/contact/" variant="secondary">Get in Touch</Button>
			</div>
```

- [ ] **Step 3: Update AboutTeaser copy**

In `src/lib/components/home/AboutTeaser.svelte`, replace the eyebrow/h2/paragraphs/button block (lines 79–94) with:

```svelte
				<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">About</p>

				<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
					Less noise, more function.
				</h2>

				<p class="mt-6 text-lg leading-relaxed text-[#475569] dark:text-slate-300">
					I'm Arben — a full-stack developer from the Philippines. I build web apps, AI tools,
					and extensions that do one thing well and get out of the way.
				</p>

				<p class="mt-4 text-[#64748B] dark:text-slate-400">
					From capstone IoT systems to tools covered by national media — clean code, useful results.
				</p>

				<div class="mt-10">
					<Button href="/about/" variant="secondary">More about me</Button>
				</div>
```

- [ ] **Step 4: Verify + commit**

Run: `yarn check` — Expected: passes.
Run:

```bash
git add src/lib/components/home/Hero.svelte src/lib/components/home/AboutTeaser.svelte
git commit -m "feat(site): personalize hero and about teaser copy"
```

---

## Task 9: Home page rewrite

**Files:**
- Modify: `src/routes/+page.svelte` (full rewrite)

- [ ] **Step 1: Replace the entire file with the new homepage**

```svelte
<script lang="ts">
	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import FeaturedProjects from '$lib/components/home/FeaturedProjects.svelte';
	import MinorTools from '$lib/components/home/MinorTools.svelte';
	import Skills from '$lib/components/home/Skills.svelte';
	import AboutTeaser from '$lib/components/home/AboutTeaser.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import GeometricDivider from '$lib/components/ui/GeometricDivider.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';
</script>

<MetaTags
	title="Arben Apura — Full-Stack Web Developer"
	description="Full-stack web developer from the Philippines building web apps, AI tools, and Chrome extensions. SvelteKit, Next.js, TypeScript."
	url={SITE_URL}
/>

<!-- PERSON JSON-LD (HOMEPAGE ONLY) -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Arben M. Apura',
		url: SITE_URL,
		jobTitle: 'Full-Stack Web Developer',
		email: 'mailto:arbenapura.official@gmail.com',
		telephone: '+639764304619',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'San Jose Del Monte',
			addressRegion: 'Bulacan',
			addressCountry: 'PH',
		},
		knowsAbout: ['SvelteKit', 'Next.js', 'TypeScript', 'Supabase', 'Firebase', 'Capacitor', 'OpenAI API'],
		sameAs: ['https://github.com/ArbenApura', 'https://www.facebook.com/arbenapura.official'],
	}}
/>

<!-- HERO -->
<Hero />

<!-- FEATURED PROJECTS -->
<FeaturedProjects />

<!-- MINOR TOOLS -->
<MinorTools />

<!-- SKILLS -->
<Skills />

<!-- ABOUT TEASER -->
<AboutTeaser />

<!-- CONNECT CTA WITH GEOMETRIC MESH BACKGROUND -->
<GeometricDivider>
	<div use:reveal class="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center lg:px-8">
		<p class="text-lg text-[#475569] dark:text-slate-300">
			Let's build something.
		</p>
		<Button href="/contact/" variant="primary">Get in Touch</Button>
	</div>
</GeometricDivider>
```

Note: `use:reveal` requires the `reveal` action import — add it to the script:

```ts
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
```

(final script block: modules import goes after the component imports per import order — place `import { reveal } from '$lib/actions/reveal';` in the MODULES group as shown below; the full final script section is:)

```svelte
<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import FeaturedProjects from '$lib/components/home/FeaturedProjects.svelte';
	import MinorTools from '$lib/components/home/MinorTools.svelte';
	import Skills from '$lib/components/home/Skills.svelte';
	import AboutTeaser from '$lib/components/home/AboutTeaser.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import GeometricDivider from '$lib/components/ui/GeometricDivider.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';
</script>
```

- [ ] **Step 2: Verify + commit**

Run: `yarn check` — Expected: passes.
Run:

```bash
git add src/routes/+page.svelte
git commit -m "feat(site): rebuild homepage with featured projects, tools, and skills"
```

---

## Task 10: About page rewrite

**Files:**
- Modify: `src/routes/about/+page.svelte` (full rewrite)

- [ ] **Step 1: Replace the entire file**

```svelte
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
			role: 'Remote Full-Stack Web Developer',
			company: 'UniStar.BG Ltd',
			period: '01/2025 — 06/2026',
			points: [
				'Collaborated with design teams to implement user-friendly interfaces and improve user experience.',
				'Built modern web applications integrated with Capacitor for deployment on both Web and Google Play Store.',
				'Developed secure, efficient APIs and managed databases for seamless app integration.',
				'Handled server setup, configuration, and deployment to ensure reliable performance.',
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
```

- [ ] **Step 2: Verify + commit**

Run: `yarn check` — Expected: passes.
Run:

```bash
git add src/routes/about/+page.svelte
git commit -m "feat(site): rewrite about page with personal summary, work history, education"
```

---

## Task 11: Contact page rewrite

**Files:**
- Modify: `src/routes/contact/+page.svelte` (full rewrite)

- [ ] **Step 1: Replace the entire file**

```svelte
<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Mail, Phone, MapPin } from 'lucide-svelte';

	// IMPORTED MODULES
	import { socialLinks } from '$lib/data/navigation';
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// BRAND ICONS NOT AVAILABLE IN LUCIDE V1+; INLINE SVG PATHS USED INSTEAD
	const SOCIAL_ICONS: Record<string, string> = {
		github: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
		facebook:
			'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
	};
</script>

<MetaTags
	title="Contact — Arben Apura"
	description="Get in touch with Arben Apura — full-stack web developer. Email, phone, GitHub, and Facebook. Available for freelance work."
	url="{SITE_URL}/contact/"
/>

<Breadcrumbs pageName="Contact" pageUrl="{SITE_URL}/contact/" />

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: 'Contact Arben Apura',
		url: `${SITE_URL}/contact/`,
		description: 'Get in touch with Arben Apura — full-stack web developer.',
		mainEntity: {
			'@type': 'Person',
			name: 'Arben M. Apura',
			url: SITE_URL,
			email: 'arbenapura.official@gmail.com',
			telephone: '+639764304619',
		},
	}}
/>

<!-- PAGE HERO -->
<section class="relative overflow-hidden pt-32 pb-16">
	<div use:reveal class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Contact</p>

		<h1 class="font-display mt-4 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			Say Hello
		</h1>

		<p class="mt-6 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			Let's build something together. I'm currently available for freelance projects and full-time roles.
		</p>
	</div>
</section>

<!-- CONTACT INFO -->
<section class="relative overflow-hidden pb-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- EMAIL — PRIMARY CONTACT -->
		<div use:reveal={{ delay: 100 }} class="max-w-2xl rounded-xl border border-[#F1F5F9] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.06)] sm:p-8 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
			<div class="flex items-center gap-4">
				<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
					<Mail class="size-6 text-[#0891B2] dark:text-[#22D3EE]" />
				</div>
				<div>
					<h2 class="font-display text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">Email</h2>
					<p class="mt-1 text-sm text-[#64748B] dark:text-slate-400">I'll get back to you as soon as I can.</p>
				</div>
			</div>

			<a
				href="mailto:arbenapura.official@gmail.com"
				class="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#0891B2] px-5 py-3 text-sm font-medium text-[#0891B2] transition-all duration-300 hover:bg-[#0891B2]/10 dark:border-[#22D3EE] dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/10"
			>
				<Mail class="size-4" />
				arbenapura.official@gmail.com
			</a>
		</div>

		<!-- PHONE + LOCATION -->
		<div use:reveal={{ delay: 150 }} class="mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
			<div class="rounded-xl border border-[#F1F5F9] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<div class="flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<Phone class="size-5 text-[#0891B2] dark:text-[#22D3EE]" />
					</div>
					<div>
						<h2 class="font-display text-sm font-bold tracking-tight text-[#0F172A] dark:text-white">Phone</h2>
						<a
							href="tel:+639764304619"
							class="mt-0.5 block text-sm text-[#64748B] transition-colors hover:text-[#0891B2] dark:text-slate-400 dark:hover:text-[#22D3EE]"
						>
							+63 976 430 4619
						</a>
					</div>
				</div>
			</div>

			<div class="rounded-xl border border-[#F1F5F9] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<div class="flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<MapPin class="size-5 text-[#0891B2] dark:text-[#22D3EE]" />
					</div>
					<div>
						<h2 class="font-display text-sm font-bold tracking-tight text-[#0F172A] dark:text-white">Location</h2>
						<p class="mt-0.5 text-sm text-[#64748B] dark:text-slate-400">San Jose Del Monte, Bulacan, PH · Remote</p>
					</div>
				</div>
			</div>
		</div>

		<!-- SOCIAL LINKS -->
		<div use:reveal={{ delay: 200 }} class="mt-12">
			<p class="font-mono text-sm text-[#64748B] dark:text-slate-400">Or find me here</p>

			<div class="mt-4 flex flex-wrap gap-4">
				{#each socialLinks as social}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white px-5 py-3 text-[#475569] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#0891B2]/50 hover:text-[#0891B2] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:border-[#2A2578] dark:bg-transparent dark:text-slate-300 dark:shadow-none dark:hover:border-[#22D3EE]/50 dark:hover:text-[#22D3EE]"
						aria-label={social.platform}
					>
						<svg class="size-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d={SOCIAL_ICONS[social.icon]} />
						</svg>
						<span class="text-sm font-medium">{social.platform}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
```

- [ ] **Step 2: Verify + commit**

Run: `yarn check` — Expected: passes.
Run:

```bash
git add src/routes/contact/+page.svelte
git commit -m "feat(site): rewrite contact page with personal email, phone, and socials"
```

---

## Task 12: Projects listing page + redirects

**Files:**
- Create: `src/routes/projects/+page.svelte`
- Delete: `src/routes/products/+page.svelte` (the catalog page — tool detail routes stay)
- Modify: `_redirects`

- [ ] **Step 1: Create `src/routes/projects/+page.svelte`**

```svelte
<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Shield } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
	import { projects } from '$lib/data/projects';
	import { products } from '$lib/data/products';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
	import MinorProjectCard from '$lib/components/projects/MinorProjectCard.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// -- REACTIVE STATES -- //

	$: liveProducts = products.filter((p) => p.status === 'live');
</script>

<MetaTags
	title="Projects — Arben Apura"
	description="A selection of projects by Arben Apura — capstone IoT systems, AI web apps, client work, and free browser tools."
	url="{SITE_URL}/projects/"
/>

<Breadcrumbs pageName="Projects" pageUrl="{SITE_URL}/projects/" />

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: 'Arben Apura Projects',
		url: `${SITE_URL}/projects/`,
		description: 'A selection of projects by Arben Apura.',
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: projects.map((p, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: p.name,
				url: `${SITE_URL}/projects/${p.slug}/`,
			})),
		},
	}}
/>

<!-- HERO -->
<section class="relative overflow-hidden pt-32 pb-12">
	<div use:reveal class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="max-w-3xl">
			<h1 class="font-display text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
				Projects
			</h1>
			<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
				A few things I've built — capstone systems, client work, AI tools, and small utilities that are still live.
			</p>
		</div>
	</div>
</section>

<!-- FEATURED PROJECTS -->
<section class="relative overflow-hidden pb-16">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<p use:reveal class="mb-6 text-xs font-semibold uppercase tracking-widest text-[#0891B2] dark:text-[#22D3EE]">
			Featured projects
		</p>

		<div class="grid gap-6 sm:grid-cols-2">
			{#each projects as project, i}
				<ProjectCard {project} delay={i * 100} />
			{/each}
		</div>
	</div>
</section>

<!-- DIVIDER -->
<div class="mx-auto max-w-7xl px-6 lg:px-8">
	<div class="border-t border-[#E2E8F0] dark:border-[#2A2578]/40" />
</div>

<!-- MINOR PROJECTS -->
<section class="relative overflow-hidden py-16">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div use:reveal class="mb-8 max-w-2xl">
			<p class="text-xs font-semibold uppercase tracking-widest text-[#0891B2] dark:text-[#22D3EE]">
				Minor projects
			</p>
			<h2 class="font-display mt-3 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
				Small tools I've shipped — still live
			</h2>
			<p class="mt-3 text-[#64748B] dark:text-slate-400">
				Free browser tools and Chrome extensions. Everything runs local, everything is free.
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each liveProducts as product, i}
				<MinorProjectCard {product} delay={i * 80} />
			{/each}
		</div>

		<p use:reveal class="mt-6 flex items-center gap-1.5 text-xs text-[#94A3B8] dark:text-slate-500">
			<Shield size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
			No uploads, no accounts, no tracking — all tools run 100% in your browser.
		</p>
	</div>
</section>
```

- [ ] **Step 2: Delete the products catalog page and add the redirect**

Run (PowerShell):

```powershell
Remove-Item -Force "src\routes\products\+page.svelte"
```

Append to `_redirects` (keep existing blog redirects):

```
# Products catalog replaced by projects page (2026-08-04)
/products/ /projects/ 301
```

- [ ] **Step 3: Verify + commit**

Run: `yarn check` — Expected: passes.
Run:

```bash
git add src/routes/projects/+page.svelte _redirects
git add -A src/routes/products/+page.svelte
git commit -m "feat(site): add projects page, retire products catalog with redirect"
```

---

## Task 13: Project detail pages

**Files:**
- Create: `src/routes/projects/[slug]/+page.ts`
- Create: `src/routes/projects/[slug]/+page.svelte`

- [ ] **Step 1: Create `src/routes/projects/[slug]/+page.ts`**

```ts
// IMPORTED MODULES
import { error } from '@sveltejs/kit';
import { getProjectBySlug, projects } from '$lib/data/projects';

export const prerender = true;

export const entries = () => projects.map((p) => ({ slug: p.slug }));

export const load = ({ params }) => {
	const project = getProjectBySlug(params.slug);
	if (!project) {
		throw error(404, 'Project not found');
	}
	return { project };
};
```

- [ ] **Step 2: Create `src/routes/projects/[slug]/+page.svelte`**

```svelte
<script lang="ts">
	// IMPORTED TYPES
	import type { PageData } from './$types';

	// IMPORTED DEP-MODULES
	import { ArrowLeft, ExternalLink, FileText } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import ProjectCover from '$lib/components/projects/ProjectCover.svelte';

	// -- REQUIRED PROPS -- //

	export let data: PageData;

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// -- REACTIVE STATES -- //

	$: project = data.project;
</script>

<MetaTags
	title="{project.name} — Arben Apura"
	description={project.summary}
	url="{SITE_URL}/projects/{project.slug}/"
/>

<Breadcrumbs
	items={[
		{ name: 'Projects', url: `${SITE_URL}/projects/` },
		{ name: project.name, url: `${SITE_URL}/projects/${project.slug}/` },
	]}
/>

<!-- PROJECT JSON-LD -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: project.name,
		url: `${SITE_URL}/projects/${project.slug}/`,
		description: project.summary,
		...(project.year ? { dateCreated: project.year } : {}),
		author: { '@type': 'Person', name: 'Arben M. Apura', url: SITE_URL },
		...(project.cover ? { image: `${SITE_URL}${project.cover}` } : {}),
	}}
/>

<!-- PAGE HERO -->
<section class="relative overflow-hidden pt-32 pb-12">
	<div use:reveal class="mx-auto max-w-4xl px-6 lg:px-8">
		<!-- BADGES -->
		<div class="mb-6 flex flex-wrap items-center gap-2">
			<span class="rounded-full bg-[#2DD4BF]/10 px-3 py-1 font-mono text-xs text-[#2DD4BF]">
				{project.year}
			</span>
			<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
				{project.category}
			</span>
			<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
				{project.status}
			</span>
		</div>

		<h1 class="font-display text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			{project.name}
		</h1>

		<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
			{project.summary}
		</p>

		{#if project.recognition}
			<p class="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0891B2]/10 px-4 py-1.5 font-mono text-xs text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]">
				<span class="h-1.5 w-1.5 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				{project.recognition}
			</p>
		{/if}

		<!-- COVER -->
		<div class="mt-10 overflow-hidden rounded-2xl border border-[#E2E8F0] dark:border-[#2A2578]/60">
			<ProjectCover {project} imageClass="aspect-video w-full object-cover" placeholderClass="aspect-video w-full" />
		</div>

		<!-- LINKS -->
		{#if project.links.length > 0}
			<div class="mt-8 flex flex-wrap gap-3">
				{#each project.links as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg border border-[#0891B2] px-5 py-2.5 text-sm font-medium text-[#0891B2] transition-all duration-300 hover:bg-[#0891B2]/10 dark:border-[#22D3EE] dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/10"
					>
						<ExternalLink class="size-4" />
						{link.label}
					</a>
				{/each}

				{#if project.pdf}
					<a
						href={project.pdf.path}
						download
						class="inline-flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-5 py-2.5 text-sm font-medium text-[#64748B] transition-all duration-300 hover:border-[#0891B2]/50 hover:text-[#0891B2] dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-[#22D3EE]/50 dark:hover:text-[#22D3EE]"
					>
						<FileText class="size-4" />
						{project.pdf.label}
					</a>
				{/if}
			</div>
		{/if}
	</div>
</section>

<!-- PROBLEM / SOLUTION -->
{#if project.problem || project.solution}
	<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<div class="grid gap-8 md:grid-cols-2">
				{#if project.problem}
					<div use:reveal={{ delay: 0 }}>
						<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">The problem</p>
						<p class="mt-4 text-[#475569] dark:text-slate-300">{project.problem}</p>
					</div>
				{/if}
				{#if project.solution}
					<div use:reveal={{ delay: 100 }}>
						<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">The solution</p>
						<p class="mt-4 text-[#475569] dark:text-slate-300">{project.solution}</p>
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}

<!-- FEATURES -->
{#if project.features.length > 0}
	<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<p use:reveal class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Key features</p>
			<div class="mt-6 grid gap-3 sm:grid-cols-2">
				{#each project.features as feature, i}
					<div
						use:reveal={{ delay: i * 60 }}
						class="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
					>
						<span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0891B2]/10 text-[10px] font-bold text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]">
							{i + 1}
						</span>
						<span class="text-sm text-[#475569] dark:text-slate-300">{feature}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- TECH STACK -->
{#if project.stack.length > 0}
	<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<p use:reveal class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Tech stack</p>
			<div class="mt-6 flex flex-wrap gap-2">
				{#each project.stack as tech}
					<span class="rounded-md bg-[#F1F5F9] px-3 py-1.5 font-mono text-xs text-[#64748B] dark:bg-[#2A2578]/30 dark:text-slate-400">
						{tech}
					</span>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- VIDEO EMBED -->
{#if project.video}
	<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<p use:reveal class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Demo</p>
			<h2 class="font-display mt-3 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
				{project.video.title}
			</h2>
			<div class="mt-6 aspect-video overflow-hidden rounded-2xl border border-[#E2E8F0] dark:border-[#2A2578]/60">
				<iframe
					src={project.video.embedUrl}
					title={project.video.title}
					class="h-full w-full"
					loading="lazy"
					allow="autoplay; fullscreen"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</section>
{/if}

<!-- GALLERY -->
{#if project.screenshots && project.screenshots.length > 0}
	<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<p use:reveal class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Screenshots</p>
			<div class="mt-6 grid gap-6 sm:grid-cols-2">
				{#each project.screenshots as shot, i}
					<img
						src={shot}
						alt={`${project.name} screenshot ${i + 1}`}
						loading="lazy"
						class="w-full rounded-xl border border-[#E2E8F0] dark:border-[#2A2578]/60"
					/>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- BACK LINK -->
<section class="pb-16">
	<div class="mx-auto max-w-4xl px-6 lg:px-8">
		<a
			href="/projects/"
			class="inline-flex items-center gap-2 font-mono text-sm text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80"
		>
			<ArrowLeft class="size-4" />
			Back to all projects
		</a>
	</div>
</section>
```

- [ ] **Step 3: Verify + commit**

Run: `yarn check` — Expected: passes.
Run:

```bash
git add src/routes/projects/[slug]
git commit -m "feat(site): add prerendered project detail pages"
```

---

## Task 14: Blog reframe + author JSON-LD

**Files:**
- Modify: `src/routes/blog/+page.svelte` (meta, intro, publisher)
- Modify: `src/routes/blog/[slug]/+page.svelte` (author meta + JSON-LD)

- [ ] **Step 1: Update blog listing page**

In `src/routes/blog/+page.svelte`:

1. Replace the `<MetaTags>` block (lines 44–48) with:

```svelte
<MetaTags
	title="Blog — Dev Logs & Tutorials | Arben Apura"
	description="Tutorials, dev logs, and lessons from building things. Follow along with SvelteKit, Next.js, and the tools I ship."
	url="{SITE_URL}/blog/"
/>
```

2. Replace the `<JsonLd>` `publisher` object (lines 59–64) with:

```ts
		publisher: {
			'@type': 'Person',
			name: 'Arben Apura',
			url: SITE_URL,
		},
```

3. Replace the intro paragraph (lines 77–79) with:

```svelte
		<p class="mt-4 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			Writing about building things — tutorials, dev logs, and lessons learned along the way.
		</p>
```

- [ ] **Step 2: Update blog post page**

In `src/routes/blog/[slug]/+page.svelte`:

1. Replace the title in `<MetaTags>` (line 42) with:

```svelte
	title="{post.title} | Arben Apura Blog"
```

2. Replace the author meta (lines 49–51) with:

```svelte
<svelte:head>
	<meta name="author" content="Arben Apura" />
</svelte:head>
```

3. Replace the `author` + `publisher` objects in the Article JSON-LD (lines 69–75) with:

```ts
		author: { '@type': 'Person', name: 'Arben Apura', url: SITE_URL },
		publisher: {
			'@type': 'Person',
			name: 'Arben Apura',
			url: SITE_URL,
		},
```

- [ ] **Step 3: Verify + commit**

Run: `yarn check` — Expected: passes.
Run:

```bash
git add src/routes/blog/+page.svelte src/routes/blog/[slug]/+page.svelte
git commit -m "feat(site): reframe blog as dev log with personal author schema"
```

---

## Task 15: Sitemap update

**Files:**
- Modify: `src/routes/sitemap.xml/+server.ts` (full rewrite)

- [ ] **Step 1: Replace the file**

```ts
import type { RequestHandler } from './$types';
import { sortedPosts } from '$lib/data/blog';
import { projects } from '$lib/data/projects';

const SITE_URL = 'https://arbenger.com';

const LAST_MOD = '2026-08-04';

const STATIC_PAGES = [
	{ path: '/', priority: '1.0', changefreq: 'weekly', lastmod: LAST_MOD },
	{ path: '/projects/', priority: '0.9', changefreq: 'weekly', lastmod: LAST_MOD },
	{ path: '/blog/', priority: '0.8', changefreq: 'weekly', lastmod: LAST_MOD },
	{ path: '/about/', priority: '0.6', changefreq: 'monthly', lastmod: LAST_MOD },
	{ path: '/contact/', priority: '0.5', changefreq: 'monthly', lastmod: LAST_MOD },
	{ path: '/products/image-resizer/', priority: '0.7', changefreq: 'weekly', lastmod: '2026-05-21' },
	{ path: '/products/image-compressor/', priority: '0.7', changefreq: 'weekly', lastmod: '2026-05-21' },
	{ path: '/products/color-picker/', priority: '0.7', changefreq: 'weekly', lastmod: '2026-05-21' },
	{ path: '/products/sound-booster/', priority: '0.7', changefreq: 'weekly', lastmod: '2026-05-21' },
	{ path: '/products/html-editor/', priority: '0.8', changefreq: 'weekly', lastmod: '2026-05-25' },
];

const PROJECT_PAGES = projects.map((p) => ({
	path: `/projects/${p.slug}/`,
	priority: '0.7',
	changefreq: 'monthly' as const,
	lastmod: LAST_MOD,
}));

const BLOG_PAGES = sortedPosts.map((post) => ({
	path: `/blog/${post.slug}/`,
	priority: '0.7',
	changefreq: 'monthly' as const,
	lastmod: post.updatedDate ?? post.date,
}));

const PAGES = [...STATIC_PAGES, ...PROJECT_PAGES, ...BLOG_PAGES];

export const GET: RequestHandler = async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
	(page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600',
		},
	});
};

export const prerender = true;
```

- [ ] **Step 2: Verify + commit**

Run: `yarn check` — Expected: passes.
Run:

```bash
git add src/routes/sitemap.xml/+server.ts
git commit -m "feat(site): update sitemap for portfolio pages"
```

---

## Task 16: Final verification + docs

**Files:**
- Modify: `docs/changelog/CHANGELOG.md` (append entry)
- Modify: `docs/architecture/routing.md` (update route map)
- Modify: `docs/architecture/data-models.md` (add PortfolioProject + projects.ts)

- [ ] **Step 1: Full type check and build**

Run: `yarn check`
Expected: no errors.

Run: `yarn build`
Expected: build succeeds; prerendered output includes `/projects/`, `/projects/door-lock-module/`, `/projects/top-one-uwu/`, `/projects/calculus-courseware/`, `/projects/exemplary-league-portal/`. No prerender errors (e.g. "NotFound" for /products/ links must be absent — the only /products/ links remaining are the `externalUrl` tool links which still exist).

- [ ] **Step 2: Manual preview checklist**

Run: `yarn preview`
Open http://localhost:4173 and check:

1. Home: hero shows "Arben M. Apura" + availability badge; typewriter cycles roles; 4 featured project cards (door lock shows the generated placeholder cover); 5 minor tool cards; skills grid; about teaser copy; CTA.
2. Navbar: Projects/Blog/About/Contact plain links + Blog dropdown with 3 posts; no Products mega menu; no language selector; theme toggle works.
3. Footer: Navigation/Connect (GitHub + Facebook icons)/Available-for-work; no Legal column; copyright "Arben Apura".
4. /projects/: featured grid + minor grid; `http://localhost:4173/products/` redirects to `/projects/`.
5. Project pages: door-lock-module shows placeholder cover, video iframe (Google Drive preview), PDF download link works, features/stack sections; top-one-uwu shows cover + screenshot + press link.
6. /about/: summary, UniStar timeline, education, languages, IPOPHL accomplishment linking to the door-lock project.
7. /contact/: email/phone/location cards + GitHub/Facebook links; mailto + tel links correct.
8. /blog/: intro copy reframed; post pages render; author meta "Arben Apura".
9. /privacy/, /terms/, /cookies/: 404 (routes deleted).
10. Light + dark mode both render correctly; one H1 per page.

- [ ] **Step 3: Update documentation**

Append to `docs/changelog/CHANGELOG.md` (top of file, after the header):

```markdown
## 2026-08-04 — Portfolio revision

- Converted the site from a company presence to a personal portfolio (Arben M. Apura).
- Added /projects/ with 4 featured projects (door-lock-module, top-one-uwu, calculus-courseware, exemplary-league-portal) + minor tools grid.
- Added prerendered project detail pages with placeholder covers, video embed, and PDF download.
- Rewrote home, about, contact pages; reframed blog as a dev log.
- Removed newsletter, language selector, cookie banner, legal pages, and the products catalog (/products/ → /projects/).
- Updated Person-based JSON-LD, nav links, footer, sitemap.
```

Update `docs/architecture/routing.md`: replace the route map entries for `/products` catalog, `/privacy`, `/terms`, `/cookies` with the new `/projects` routes; add `/projects/[slug]`. Update `docs/architecture/data-models.md`: add the `PortfolioProject` interface and note `src/lib/data/projects.ts` + `src/lib/data/skills.ts` as the new data sources.

- [ ] **Step 4: Final commit**

```bash
git add docs
git commit -m "docs: update changelog, routing, and data models for portfolio revision"
```

- [ ] **Step 5: Deploy (user-authorized final step)**

Run: `yarn deploy`
Expected: wrangler builds and deploys to Cloudflare Pages project `arbenger` (requires logged-in wrangler + Cloudflare credentials). If the user has not authorized deployment, stop here and hand off with instructions.

---

## Self-review notes

- **Spec coverage:** Every spec section maps to tasks: identity/branding → Tasks 2, 8, 9; site map (home/about/projects/contact/blog) → Tasks 9–14; removals → Tasks 5–7, 12; data layer → Tasks 1–4; SEO → Tasks 5, 9–15; verification → Task 16. Product tool pages, stats API, and `extensions/` are untouched per spec §5 and §9.
- **Type consistency:** `PortfolioProject` fields (slug, name, tagline, year, category, role, status, recognition?, summary, problem?, solution?, features, stack, links, cover?, screenshots?, video?, pdf?) are consumed identically by `ProjectCard`, `ProjectCover`, and the `[slug]` detail page. `skillGroups` is imported by `Skills.svelte` and the about page. `navLinks`/`socialLinks` are consumed by Navbar (rewritten) and Footer/contact.
- **Redirect chain:** `/products/` → `/projects/` via `_redirects`; tool pages `/products/<slug>/` unchanged so `product.externalUrl` links and the sitemap entries remain valid.
- **Known follow-ups (not in scope):** new `og-image.png` with the personal brand; resizing the 1.7 MB courseware cover; GitHub repo links for door-lock-module/top-one-uwu when available.

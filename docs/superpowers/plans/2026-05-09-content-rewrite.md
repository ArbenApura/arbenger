# Content Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all page copy to be neutral, general-audience, claim-free, and eye-catching per the spec at `docs/superpowers/specs/2026-05-09-content-rewrite-design.md`.

**Architecture:** Copy-only changes across 9 files. No new components, no structural layout changes except removing Roadmap from homepage and simplifying the About page (founder section → company section, 4 cards → 3 cards). All visual design, styling, and animations stay the same.

**Tech Stack:** SvelteKit, Svelte 4, Tailwind CSS v4, TypeScript

---

### Task 1: Update Hero Copy

**Files:**
- Modify: `src/lib/components/home/Hero.svelte:18-24` (HERO_PHRASES)
- Modify: `src/lib/components/home/Hero.svelte:89` (heading text)
- Modify: `src/lib/components/home/Hero.svelte:105` (subtitle text)
- Modify: `src/lib/components/home/Hero.svelte:118` (CTA text)

- [ ] **Step 1: Replace HERO_PHRASES array**

In `src/lib/components/home/Hero.svelte`, replace lines 18-24:

```typescript
const HERO_PHRASES = [
	'and do it well',
	'without the bloat',
	"you'll keep coming back to",
	'that stay out of your way',
	'worth your time',
];
```

- [ ] **Step 2: Replace heading text**

In `src/lib/components/home/Hero.svelte`, replace line 89:

```svelte
				Tools that do the job
```

(was: `Building the tools`)

- [ ] **Step 3: Replace subtitle text**

In `src/lib/components/home/Hero.svelte`, replace line 105:

```svelte
				Extensions, plugins, AI tools, and web apps. Take a look around.
```

(was: `Developer tools, AI products, and SaaS platforms built for speed, quality, and real-world use.`)

- [ ] **Step 4: Replace CTA text**

In `src/lib/components/home/Hero.svelte`, replace line 118:

```svelte
					<span class="relative z-10">See What's Available</span>
```

(was: `Explore Products`)

- [ ] **Step 5: Verify dev server**

Run: `yarn dev` (if not already running)
Open `http://localhost:8000` in the browser. Confirm:
- Hero heading reads "Tools that do the job"
- Typewriter cycles through new phrases
- Subtitle reads "Extensions, plugins, AI tools, and web apps. Take a look around."
- CTA button reads "See What's Available"

- [ ] **Step 6: Commit**

```powershell
git add src/lib/components/home/Hero.svelte
git commit -m "content: update hero copy — neutral heading, typewriter phrases, subtitle, CTA"
```

---

### Task 2: Update ProductCategories Section Heading

**Files:**
- Modify: `src/lib/components/home/ProductCategories.svelte:31-33`

- [ ] **Step 1: Replace section heading**

In `src/lib/components/home/ProductCategories.svelte`, replace lines 31-33:

```svelte
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
				What's here
			</h2>
```

(was: `What we're building`)

- [ ] **Step 2: Commit**

```powershell
git add src/lib/components/home/ProductCategories.svelte
git commit -m "content: update product categories heading to present tense"
```

---

### Task 3: Update AboutTeaser Copy

**Files:**
- Modify: `src/lib/components/home/AboutTeaser.svelte:28-44`

- [ ] **Step 1: Replace heading**

In `src/lib/components/home/AboutTeaser.svelte`, replace line 29:

```svelte
					Less noise, more function.
```

(was: `Built by developers, for developers.`)

- [ ] **Step 2: Replace body paragraphs**

Replace lines 32-40 with:

```svelte
				<p class="mt-6 text-lg leading-relaxed text-[#475569] dark:text-slate-300">
					Arbenger makes extensions, plugins, AI tools, and web apps.
					Each one is built to do its job and get out of the way.
				</p>

				<p class="mt-4 text-[#64748B] dark:text-slate-400">
					Curious? Browse the catalog or say hello.
				</p>
```

- [ ] **Step 3: Commit**

```powershell
git add src/lib/components/home/AboutTeaser.svelte
git commit -m "content: update about teaser — neutral, no audience targeting"
```

---

### Task 4: Update Homepage — Remove Roadmap, Update Meta & CTA

**Files:**
- Modify: `src/routes/+page.svelte`

- [ ] **Step 1: Remove Roadmap import**

In `src/routes/+page.svelte`, delete line 12:

```
	import Roadmap from '$lib/components/home/Roadmap.svelte';
```

- [ ] **Step 2: Remove Roadmap usage**

Delete lines 52-53:

```
<!-- ROADMAP -->
<Roadmap />
```

- [ ] **Step 3: Update MetaTags**

Replace lines 18-22:

```svelte
<MetaTags
	title="Arbenger — Extensions, Plugins, AI Tools & Web Apps"
	description="Extensions, plugins, AI tools, and web apps. Browse what's available at Arbenger."
	url="https://arbenger.com"
/>
```

- [ ] **Step 4: Update JSON-LD description**

Replace line 32:

```
		description: 'Extensions, plugins, AI tools, and web applications.',
```

(was: `Building AI tools, developer extensions, and SaaS products.`)

- [ ] **Step 5: Update bottom CTA text**

Replace lines 64-67:

```svelte
		<p class="text-lg text-[#475569] dark:text-slate-300">
			Got a question? We're around.
		</p>
		<Button href="/contact" variant="primary">Get in Touch</Button>
```

- [ ] **Step 6: Verify homepage in browser**

Open `http://localhost:8000`. Confirm:
- No Roadmap section visible
- Page title in browser tab is updated
- Bottom CTA reads "Got a question? We're around."
- No console errors

- [ ] **Step 7: Commit**

```powershell
git add src/routes/+page.svelte
git commit -m "content: remove roadmap, update homepage meta and CTA copy"
```

---

### Task 5: Rewrite About Page

This is the largest task — the founder section is replaced with a company section, and "How We Work" becomes "What to expect" with 3 cards instead of 4.

**Files:**
- Modify: `src/routes/about/+page.svelte`

- [ ] **Step 1: Update MetaTags**

Replace lines 13-17:

```svelte
<MetaTags
	title="About | Arbenger"
	description="What Arbenger does and how we approach building software tools."
	url="https://arbenger.com/about"
/>
```

- [ ] **Step 2: Update hero subtitle**

Replace lines 42-44:

```svelte
		<p class="mt-6 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			We make software tools. Here's what that looks like.
		</p>
```

- [ ] **Step 3: Replace entire founder section (lines 49-99)**

Replace the `<!-- FOUNDER SECTION -->` block (lines 49-99) with:

```svelte
<!-- WHAT WE DO SECTION -->
<section class="relative py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-start gap-12 lg:grid-cols-2">
			<!-- COMPANY INFO -->
			<div use:revealSlide={{ direction: 'left' }}>
				<h2 class="font-display text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">What we do</h2>

				<p class="mt-6 text-[#475569] dark:text-slate-300">
					Arbenger builds VS Code extensions, Chrome plugins, AI tools, and web apps.
					Each product covers a different need, but they share the same approach —
					keep it clean, keep it useful.
				</p>
			</div>

			<!-- CATEGORY INFO CARD -->
			<div use:revealSlide={{ direction: 'right' }} class="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.06)] dark:border-[#2A2578] dark:bg-[#1E1A5E] dark:shadow-none">
				<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Product categories</p>
				<ul class="mt-4 space-y-3 text-sm text-[#475569] dark:text-slate-300">
					<li class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							<svg class="size-4 text-[#0891B2] dark:text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
						</span>
						VS Code Extensions
					</li>
					<li class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							<svg class="size-4 text-[#0891B2] dark:text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 7h10v10H7z" /></svg>
						</span>
						Chrome Plugins
					</li>
					<li class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							<svg class="size-4 text-[#0891B2] dark:text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3 4 4.5 4.5 0 0 1-3-4"/><path d="M12 18v4"/></svg>
						</span>
						AI Tools
					</li>
					<li class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							<svg class="size-4 text-[#0891B2] dark:text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
						</span>
						Misc Tools
					</li>
					<li class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							<svg class="size-4 text-[#0891B2] dark:text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
						</span>
						SaaS Products
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
```

- [ ] **Step 4: Replace "How We Work" section (lines 101-148)**

Replace the `<!-- HOW WE WORK SECTION -->` block (lines 101-148) with:

```svelte
<!-- WHAT TO EXPECT SECTION -->
<section class="relative border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div use:reveal>
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Our approach</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">What to expect.</h2>
		</div>

		<!-- 3-CARD GRID: 1 LARGE + 2 SMALL -->
		<div class="mt-12 grid gap-8 md:grid-cols-5">
			<!-- LARGE CARD -->
			<div use:reveal={{ delay: 100 }} class="rounded-xl border border-[#F1F5F9] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] md:col-span-3 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<h3 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">Does what it says</h3>
				<p class="mt-3 text-[#475569] dark:text-slate-300">
					No hidden complexity. If a tool says it does something, that's what it does.
				</p>
			</div>

			<!-- SMALL CARD -->
			<div use:reveal={{ delay: 200 }} class="rounded-xl border border-[#F1F5F9] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] md:col-span-2 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<h3 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">Kept up to date</h3>
				<p class="mt-3 text-[#475569] dark:text-slate-300">
					Products get regular updates and fixes.
				</p>
			</div>

			<!-- SMALL CARD -->
			<div use:reveal={{ delay: 300 }} class="rounded-xl border border-[#F1F5F9] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] md:col-span-2 dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none">
				<h3 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">Feedback welcome</h3>
				<p class="mt-3 text-[#475569] dark:text-slate-300">
					Something not right? Let us know. That's how things get better.
				</p>
			</div>
		</div>
	</div>
</section>
```

- [ ] **Step 5: Update CTA section (lines 150-158)**

Replace with:

```svelte
<!-- CTA -->
<section class="relative border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]">
	<div use:reveal class="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 lg:px-8">
		<p class="text-lg text-[#475569] dark:text-slate-300">
			Got a question?
		</p>
		<Button href="/contact" variant="secondary">Get in touch</Button>
	</div>
</section>
```

- [ ] **Step 6: Remove unused isDark import**

The `isDark` store import (line 6) was only used by the geometric background SVG in the hero. The geometric background lines in the hero section use `$isDark` — check if they're still present. If the hero geometric background is still there, keep the import. If you removed the founder terminal card but the hero geo lines remain, the import stays.

Check: The hero section (lines 20-33) still uses `$isDark` for the SVG lines, so **keep the import**.

- [ ] **Step 7: Verify about page in browser**

Open `http://localhost:8000/about`. Confirm:
- No "Arben Apura" or "Founder & Developer" text
- No terminal card
- "What we do" section with category list card
- "What to expect" section with 3 cards (not 4)
- CTA reads "Got a question?"
- No console errors

- [ ] **Step 8: Commit**

```powershell
git add src/routes/about/+page.svelte
git commit -m "content: rewrite about page — company style, remove founder section, 3-card approach grid"
```

---

### Task 6: Update Products Page Copy & Meta

**Files:**
- Modify: `src/routes/products/+page.svelte:50-53` (meta)
- Modify: `src/routes/products/+page.svelte:65-67` (subtitle)

- [ ] **Step 1: Update MetaTags**

Replace lines 50-54:

```svelte
<MetaTags
	title="Products | Arbenger"
	description="Browse Arbenger's catalog — VS Code extensions, Chrome plugins, AI tools, and web apps."
	url="https://arbenger.com/products"
/>
```

- [ ] **Step 2: Update subtitle**

Replace lines 65-67:

```svelte
		<p class="mt-6 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			Everything in one place. More on the way.
		</p>
```

- [ ] **Step 3: Commit**

```powershell
git add src/routes/products/+page.svelte
git commit -m "content: update products page subtitle and meta description"
```

---

### Task 7: Update Product Category Descriptions

**Files:**
- Modify: `src/lib/data/products.ts:4-40`

- [ ] **Step 1: Replace all category descriptions**

In `src/lib/data/products.ts`, replace the entire `categories` array (lines 4-40):

```typescript
export const categories: ProductCategoryInfo[] = [
	{
		id: 'vscode-extensions',
		name: 'VS Code Extensions',
		description: 'Tools and add-ons for Visual Studio Code.',
		icon: 'code',
		productCount: 0,
	},
	{
		id: 'chrome-plugins',
		name: 'Chrome Plugins',
		description: 'Browser extensions that work inside Chrome.',
		icon: 'chrome',
		productCount: 0,
	},
	{
		id: 'ai-tools',
		name: 'AI Tools',
		description: 'Software that uses AI to get things done.',
		icon: 'brain',
		productCount: 0,
	},
	{
		id: 'misc-tools',
		name: 'Misc Tools',
		description: 'Converters, formatters, and other small utilities.',
		icon: 'wrench',
		productCount: 0,
	},
	{
		id: 'saas',
		name: 'SaaS Products',
		description: 'Web apps you can use from anywhere.',
		icon: 'rocket',
		productCount: 0,
	},
];
```

- [ ] **Step 2: Verify descriptions in browser**

Check both `http://localhost:8000` (homepage product categories) and `http://localhost:8000/products` (product list). Each category should show the new one-line description.

- [ ] **Step 3: Commit**

```powershell
git add src/lib/data/products.ts
git commit -m "content: update product category descriptions — neutral, plain language"
```

---

### Task 8: Update Contact Page Copy & Meta

**Files:**
- Modify: `src/routes/contact/+page.svelte:24-28` (meta)
- Modify: `src/routes/contact/+page.svelte:35-41` (heading + subtitle)
- Modify: `src/routes/contact/+page.svelte:56` (email response text)

- [ ] **Step 1: Update MetaTags**

Replace lines 24-28:

```svelte
<MetaTags
	title="Contact | Arbenger"
	description="Reach out to Arbenger. We'd like to hear from you."
	url="https://arbenger.com/contact"
/>
```

- [ ] **Step 2: Update heading and subtitle**

Replace lines 35-41:

```svelte
		<h1 class="font-display mt-4 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			Say Hello
		</h1>

		<p class="mt-6 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			Question, idea, or just want to talk — we're here.
		</p>
```

- [ ] **Step 3: Update email response text**

Replace line 56:

```svelte
					<p class="mt-1 text-sm text-[#64748B] dark:text-slate-400">We'll get back to you as soon as we can.</p>
```

(was: `We'll get back to you within a day or two.`)

- [ ] **Step 4: Commit**

```powershell
git add src/routes/contact/+page.svelte
git commit -m "content: update contact page — warmer heading, neutral response time"
```

---

### Task 9: Update Footer Tagline

**Files:**
- Modify: `src/lib/components/layout/Footer.svelte:33`

- [ ] **Step 1: Replace tagline**

In `src/lib/components/layout/Footer.svelte`, replace line 33:

```svelte
				<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">Extensions, plugins, AI tools, and web apps.</p>
```

(was: `Developer tools, AI products, and SaaS platforms.`)

- [ ] **Step 2: Commit**

```powershell
git add src/lib/components/layout/Footer.svelte
git commit -m "content: update footer tagline — factual product list"
```

---

### Task 10: Final Verification

- [ ] **Step 1: Full site walkthrough**

Visit each page in the browser and confirm copy matches the spec:
- `http://localhost:8000` — homepage
- `http://localhost:8000/products` — products
- `http://localhost:8000/about` — about
- `http://localhost:8000/contact` — contact

Check specifically:
- No references to "developers," "creators," or any specific audience
- No claims about quality, speed, or superiority
- No "Arben Apura" or "Founder" text anywhere
- No Roadmap section on homepage
- Footer tagline updated on all pages
- All page titles updated in browser tab
- No console errors on any page

- [ ] **Step 2: Check both themes**

Toggle dark/light mode on each page. All new text should be readable in both themes (dark text on light bg, light text on dark bg).

- [ ] **Step 3: Check mobile view**

Resize to mobile width. Confirm:
- About page category card stacks properly
- About page 3-card grid stacks vertically
- No horizontal overflow from new text

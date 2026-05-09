# Content Rewrite: Neutral, General-Audience Copy

**Date:** 2026-05-09  
**Goal:** Rewrite all page content to be neutral, non-targeting, and free of claims. The site serves a wide range of users and should not assume any specific audience. Copy should be eye-catching and direct without being generic.

## Decisions

- **Tone:** Clean, confident, direct. No marketing buzzwords, no claims, no targeting. Eye-catching through clarity and rhythm, not hype.
- **Voice:** Professional but approachable. Short sentences. Active voice. No exclamation points.
- **About page:** General company style (no founder spotlight, no terminal card).
- **Roadmap section:** Removed entirely from homepage.
- **Newsletter:** Kept as-is (copy already neutral).

### Copywriting principles applied
- Clarity over cleverness
- Direct and specific — no "streamline," "optimize," "innovative"
- Active voice throughout
- One idea per section
- Honest — no fabricated proof points or unverifiable claims

---

## Files to Modify

### 1. `src/lib/components/home/Hero.svelte`

**Heading:** `"Tools that do the job"`

**Typewriter phrases** (replace existing):
```
"and do it well"
"without the bloat"
"you'll keep coming back to"
"that stay out of your way"
"worth your time"
```

> Rationale: The heading is short and punchy — 5 words. The typewriter completes the sentence, creating a curiosity loop (Zeigarnik effect). Each phrase paints a concrete mental image without claiming superiority.

**Subtitle:** `"Extensions, plugins, AI tools, and web apps. Take a look around."`

> Rationale: First sentence is factual — what's here. Second sentence is an invitation, not a command. The period instead of em-dash gives it a calm, confident rhythm.

**CTA:** `"See What's Available"` (was "Explore Products")

> Rationale: "See" is lower commitment than "Explore" (reduces activation energy). "What's Available" is concrete — tells them what they get.

### 2. `src/lib/components/home/ProductCategories.svelte`

**Section heading:** `"What's here"` (was "What we're building")

> Rationale: Present tense, not future. Two words. Direct.

### 3. `src/lib/components/home/AboutTeaser.svelte`

**Heading:** `"Less noise, more function."`

> Rationale: Contrast structure (X, not Y) is memorable and specific. Doesn't claim "best" or "fastest" — just positions the philosophy without promising.

**Body:** `"Arbenger makes extensions, plugins, AI tools, and web apps. Each one is built to do its job and get out of the way."`

> Rationale: Second sentence uses a concrete metaphor ("get out of the way") instead of vague adjectives like "simple" or "easy."

**Secondary:** `"Curious? Browse the catalog or say hello."`

> Rationale: Rhetorical-question-as-transition. "Say hello" is warmer than "get in touch" without being unprofessional.

### 4. `src/routes/+page.svelte`

- Remove `<Roadmap />` component import and usage.
- Update bottom CTA text: `"Got a question? We're around."`
- Update meta title: `"Arbenger — Extensions, Plugins, AI Tools & Web Apps"`
- Update meta description: `"Extensions, plugins, AI tools, and web apps. Browse what's available at Arbenger."`
- Update JSON-LD description: `"Extensions, plugins, AI tools, and web applications."`

### 5. `src/routes/about/+page.svelte`

**Hero:**
- Heading: `"About Arbenger"` (unchanged)
- Subtitle: `"We make software tools. Here's what that looks like."`

> Rationale: Matter-of-fact first sentence. Second sentence creates a small curiosity gap — invites scrolling.

**Founder section replaced with company section:**
- Heading: `"What we do"`
- Body: `"Arbenger builds VS Code extensions, Chrome plugins, AI tools, and web apps. Each product covers a different need, but they share the same approach — keep it clean, keep it useful."`
- Terminal card replaced with a clean info card listing the five product categories with their icons.

> Rationale: "Keep it clean, keep it useful" uses parallel structure for rhythm. It describes an approach without claiming results.

**"How We Work" replaced with "What to expect":**
- Section label: `"Our approach"`
- Heading: `"What to expect."`
- Card 1 (large): `"Does what it says"` / `"No hidden complexity. If a tool says it does something, that's what it does."`
- Card 2 (small): `"Kept up to date"` / `"Products get regular updates and fixes."`
- Card 3 (small): `"Feedback welcome"` / `"Something not right? Let us know. That's how things get better."`
- Card 4 (large, "Build in public"): removed. Grid becomes 3 cards.

> Rationale: Card 1 uses the Pratfall-adjacent honesty move — "if it says it does X, it does X" is refreshingly un-hyperbolic. Card 3 uses a direct question to the reader (engagement).

**CTA:** `"Got a question?"` + "Get in touch" button.

**Meta:**
- Title: `"About | Arbenger"`
- Description: `"What Arbenger does and how we approach building software tools."`

### 6. `src/routes/products/+page.svelte`

- Subtitle: `"Everything in one place. More on the way."`
- Meta description: `"Browse Arbenger's catalog — VS Code extensions, Chrome plugins, AI tools, and web apps."`

> Rationale: "More on the way" creates anticipation without making a specific promise. Two short sentences have better rhythm than one long one.

### 7. `src/lib/data/products.ts`

Category descriptions (concise, each with a hint of personality):
- VS Code Extensions: `"Tools and add-ons for Visual Studio Code."`
- Chrome Plugins: `"Browser extensions that work inside Chrome."`
- AI Tools: `"Software that uses AI to get things done."`
- Misc Tools: `"Converters, formatters, and other small utilities."`
- SaaS Products: `"Web apps you can use from anywhere."`

> Rationale: Each description is one sentence, plain language, no jargon. "Get things done" and "use from anywhere" are concrete benefits without being claims.

### 8. `src/routes/contact/+page.svelte`

- Heading: `"Say Hello"` (was "Get in Touch")
- Subtitle: `"Question, idea, or just want to talk — we're here."`
- Email response text: `"We'll get back to you as soon as we can."`
- Meta description: `"Reach out to Arbenger. We'd like to hear from you."`

> Rationale: "Say Hello" is warmer and lower-pressure than "Get in Touch." The subtitle uses a three-item list with escalating informality ("just want to talk") — mirrors natural speech.

### 9. `src/lib/components/layout/Footer.svelte`

- Tagline: `"Extensions, plugins, AI tools, and web apps."`

> Rationale: Lists what Arbenger makes — factual, specific, and serves as a mini-reminder of product scope. Better than the generic "Software tools and applications."

### 10. `src/routes/+page.svelte` (Meta/JSON-LD)

Already covered in item 4 above.

---

## What's NOT changing

- All visual design, layout, styling, animations, illustrations
- Navbar links and structure
- Newsletter form (copy is already neutral)
- Legal pages (privacy, terms, cookies)
- Contact page structure (email card + social links)
- Products page filter tabs and card layout
- Footer structure (just updating tagline)
- Component files not listed above

---

## Structural changes

- Remove `Roadmap` component import from `src/routes/+page.svelte`
- About page: remove founder name/role, remove terminal card, replace with general info card
- About page: reduce "How We Work" from 4 cards to 3 cards (remove "Build in public")
- About page "What to Expect" grid: 3 cards total. First card spans `md:col-span-3`, second and third each span `md:col-span-2`. Single row on desktop, stacked on mobile.

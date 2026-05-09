# Content Rewrite: Neutral, General-Audience Copy

**Date:** 2026-05-09  
**Goal:** Rewrite all page content to be neutral, non-targeting, and free of claims. The site serves a wide range of users and should not assume any specific audience.

## Decisions

- **Tone:** Neutral product showcase. Clean, factual, no marketing speak.
- **About page:** General company style (no founder spotlight, no terminal card).
- **Roadmap section:** Removed entirely from homepage.
- **Newsletter:** Kept as-is (copy already neutral).

---

## Files to Modify

### 1. `src/lib/components/home/Hero.svelte`

**Typewriter phrases** (replace existing):
```
"that save you time"
"that just work"
"worth trying"
"for any workflow"
"you'll actually use"
```

**Heading:** `"Software tools for everyday use"`  
**Subtitle:** `"Extensions, plugins, AI tools, and web apps — all in one place."`  
**CTA:** unchanged ("Explore Products")

### 2. `src/lib/components/home/ProductCategories.svelte`

**Section heading:** `"What's available"` (was "What we're building")

### 3. `src/lib/components/home/AboutTeaser.svelte`

**Heading:** `"Software, simplified."`  
**Body:** `"Arbenger makes extensions, plugins, AI tools, and SaaS products. Everything is designed to be straightforward and easy to pick up."`  
**Secondary:** `"Browse what's available or get in touch if you have questions."`

### 4. `src/routes/+page.svelte`

- Remove `<Roadmap />` component import and usage.
- Update bottom CTA text: `"Interested? We'd love to hear from you."`
- Update meta title: `"Software Tools & Apps | Arbenger"`
- Update meta description: `"Arbenger — software tools, extensions, plugins, and web apps."`
- Update JSON-LD description: `"Software tools, extensions, and web applications."`

### 5. `src/routes/about/+page.svelte`

**Hero:**
- Subtitle: `"Software tools, extensions, and apps — made to be useful."`

**Founder section replaced with company section:**
- Heading: `"What Arbenger Does"`
- Body: `"Arbenger builds software across several categories — VS Code extensions, Chrome plugins, AI tools, and SaaS products. The focus is on making tools that are easy to use and genuinely helpful."`
- Terminal card replaced with a clean info card listing categories (no terminal aesthetic).

**"How We Work" replaced with "What to Expect":**
- Heading: `"What to expect."`
- Card 1 (large): `"Straightforward tools"` / `"No unnecessary complexity. Each product does what it says."`
- Card 2 (small): `"Regular updates"` / `"Products are maintained and improved over time."`
- Card 3 (small): `"Open to feedback"` / `"Suggestions and bug reports are always welcome."`
- Card 4 (large, "Build in public"): removed. Grid becomes 3 cards (one large, two small).

**CTA:** `"Have a question?"` + "Get in touch" button.

**Meta:**
- Title: `"About | Arbenger"`
- Description: `"Learn about Arbenger and what we do."`

### 6. `src/routes/products/+page.svelte`

- Subtitle: `"Browse available tools and products."`
- Meta description: `"Browse Arbenger's catalog of extensions, plugins, AI tools, and web apps."`

### 7. `src/lib/data/products.ts`

Category descriptions (neutral):
- VS Code Extensions: `"Extensions for Visual Studio Code."`
- Chrome Plugins: `"Browser extensions for Chrome."`
- AI Tools: `"Tools powered by AI."`
- Misc Tools: `"Utilities, converters, and small tools."`
- SaaS Products: `"Web applications and online services."`

### 8. `src/routes/contact/+page.svelte`

- Subtitle: `"Questions, feedback, or just want to say hello — reach out anytime."`
- Email response text: `"We'll get back to you as soon as we can."`
- Meta description: `"Get in touch with Arbenger."`

### 9. `src/lib/components/layout/Footer.svelte`

- Tagline: `"Software tools and applications."`

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

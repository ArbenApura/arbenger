# Product Guidelines — Arbenger

## Voice & Tone

**Concise and direct.** Technical, confident, no fluff. Matches the "terminal meets luxury" aesthetic. UI text should be clear and functional. Documentation should be thorough but scannable.

- Use short, active sentences
- Avoid marketing jargon and filler words
- Technical terms are fine — the audience is tech-savvy
- Error messages should be specific and actionable
- Tool descriptions should lead with what the tool does, not what it is

## Design Principles

1. **Dark-first** — Navy-950 backgrounds with elevated navy-800 surfaces. Light mode is the alternate, not the default.
2. **Glow, not glow-y** — Cyan accents should feel like subtle screen light, not neon signs. Low opacity, soft spread.
3. **Monospace for structure, sans for reading** — Space Mono for headings (technical character), Satoshi for body (comfortable reading).
4. **Motion with purpose** — Every animation serves a function: drawing attention, providing feedback, or creating atmosphere. No decoration-only animation.
5. **Density through depth** — Use layered surfaces (navy-950 → navy-800 → navy-700 borders) to create depth without clutter.

## Privacy Standard

All browser-based tools must be **100% client-side**. Images and user data never leave the browser. No uploads, no signups, no tracking cookies. This is a core brand promise.

## Performance Standard

- LCP < 2.0s
- INP < 100ms
- CLS < 0.05
- PageSpeed score > 90 on all pages

## Accessibility Standard

- WCAG AA compliance on both dark and light themes
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `aria-label` on icon-only buttons
- Visible keyboard focus rings
- Skip-to-content link

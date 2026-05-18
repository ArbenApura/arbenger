# Workflow — Arbenger

## TDD Policy

**Flexible** — Tests recommended for complex logic only. No blocking requirement. Focus on shipping working features with manual verification.

## Commit Strategy

**Conventional Commits** — All commits follow the format:

```
type(scope): description
```

Types: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`, `perf`

Scope is optional but encouraged (e.g., `feat(products)`, `fix(blog)`, `docs(architecture)`).

Rules:
- Subject line ≤ 50 characters
- Body only when "why" isn't obvious from the subject
- No `Co-Authored-By` lines

## Code Review

**Optional / self-review** — Solo developer workflow. Self-review is sufficient. PR-based workflow available for future collaborators.

## Verification Checkpoints

**Track completion only** — Manual verification required when a full feature track is done, not after individual tasks or phases. This keeps velocity high during implementation.

## Task Lifecycle

1. **Create track** — `/conductor:new-track` with spec and phased plan
2. **Implement** — Work through phases and tasks sequentially
3. **Verify** — Test at track completion (all pages, both themes, responsive, `yarn check`)
4. **Deploy** — `yarn deploy` to Cloudflare Pages
5. **Document** — Update all relevant docs after code changes

## Development Commands

| Command | When to Use |
|---------|-------------|
| `yarn dev` | Local development (port 8000) |
| `yarn build` | Verify production build |
| `yarn check` | TypeScript + Svelte type checking before commit |
| `yarn format` | Format all files before commit |
| `yarn deploy` | Deploy to production |
| `yarn db:generate` | After schema changes |
| `yarn db:migrate` | Apply pending migrations |

## Branch Strategy

Work on `main` for solo development. Feature branches for experimental or large changes.

## Documentation Policy

After code changes, update all relevant docs — not just changelog. This includes:
- Product docs in `docs/products/`
- Architecture docs in `docs/architecture/`
- Guidelines in `docs/guidelines/`
- Changelog in `docs/changelog/`

# TypeScript/JavaScript Style Guide — Arbenger

## TypeScript Configuration

- **Strict mode** enabled
- Target: ESNext (Vite handles transpilation)
- Module: ESNext with `"type": "module"` in package.json

## Formatting (Prettier)

Handled by Prettier with project `.prettierrc`:

| Rule | Value |
|------|-------|
| Indentation | Tabs |
| Quotes | Single |
| Trailing commas | None |
| Print width | 100 |
| Semicolons | Yes (default) |

Run `yarn format` to apply.

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Variables, functions | camelCase | `formatBytes`, `activeImageId` |
| Types, interfaces | PascalCase | `ImageEntry`, `ResizeSettings` |
| Type aliases (unions) | PascalCase | `ImageFormat`, `ProcessingState` |
| Constants (module-level) | UPPER_SNAKE_CASE | `FORMAT_OPTIONS`, `SCALE_OPTIONS` |
| Files | kebab-case | `image-resizer.ts`, `store.ts` |
| Directories | kebab-case | `image-resizer/`, `code_styleguides/` |

## Import Organization

Imports grouped in order (separated by blank line):

1. **Assets** — SVGs, images, fonts
2. **Dependency types** — `import type { X } from 'library'`
3. **Types** — `import type { X } from '$lib/types'`
4. **Environment** — `$env/...`
5. **Constants** — `import { X } from '$lib/data/...'`
6. **Dependency modules** — `import { X } from 'library'`
7. **Modules** — `import { X } from '$lib/...'`
8. **Dependency components** — `import X from 'library/Component.svelte'`
9. **Components** — `import X from '$lib/components/...'`

## Type Patterns

- Prefer `type` over `interface` for unions, primitives, and utility types
- Use `interface` for object shapes that may be extended
- Export types from the module that owns them
- Route-local types stay in route-local `_lib/store.ts`, not in `$lib/types/`
- Shared types go in `$lib/types/index.ts`

## Function Patterns

- Prefer named function declarations for top-level exports
- Arrow functions for callbacks, event handlers, and inline logic
- Avoid default exports for utility modules (use named exports)
- Components use default export (Svelte convention)

## Async Patterns

- Use `async/await` over raw Promises
- Always handle errors at system boundaries (API endpoints, fetch calls)
- Use `keepalive: true` for fire-and-forget analytics POSTs

## Store Patterns (Svelte)

- `writable`/`readable`/`derived` from `svelte/store`
- No runes (`$state`, `$derived`, `$effect`)
- Map-based per-item state with revision counters for reactivity triggers
- Store files export types, constants, stores, and action functions as a single module

## Comments

- Default: no comments
- Only comment the WHY when non-obvious
- UPPERCASE section headers in Svelte files: `// -- SECTION NAME -- //`
- No inline TODO/FIXME — track in Conductor tracks instead

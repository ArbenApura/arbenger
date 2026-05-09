---
name: update-docs
description: Update all project documentation to reflect recent code changes. Use this skill whenever the user says "update docs", "sync docs", "document changes", or after completing a feature/fix when the user wants documentation updated. Also trigger proactively when significant code changes have been made and the user hasn't mentioned docs yet — offer to run it.
---

# Update Documentation

Scan all documentation files and update them to reflect the current state of the codebase. Documentation should never be stale — every doc must accurately describe what exists right now.

## Process

### Step 1: Identify what changed

Run `git status` and `git diff --stat` against the last doc-update commit (or `HEAD~N` to cover recent work). Also check `git log --oneline -20` for context on what was done.

Build a list of:
- New files created
- Files modified (and what changed)
- Files deleted
- Dependencies added or removed
- New components, stores, data files, types
- Structural changes (routes added/removed, layout changes)

### Step 2: Audit every doc file

Read each documentation file and check it against the current codebase. The docs live under `docs/` in these locations:

| Doc | What to check |
|-----|--------------|
| `docs/changelog/CHANGELOG.md` | Add a new dated section covering all changes since the last entry. Include before/after for copy changes, list all files changed, note structural changes. |
| `docs/guidelines/design-system.md` | New visual components, color usage, effects, spacing patterns, component specs (navbar, footer, cards, etc.) |
| `docs/guidelines/component-conventions.md` | New components added to file location tables, removed components noted, new patterns or conventions |
| `docs/guidelines/seo-standards.md` | Meta tag examples match current pages, H1 targets match current headings, JSON-LD examples match current schemas, E-E-A-T signals accurate |
| `docs/guidelines/deployment.md` | Commands match package manager (yarn not npm), dependencies listed, build output accurate, page counts correct |
| `docs/architecture/routing.md` | Route map includes all current routes with correct H1s, layout tree matches actual file structure, navigation links match CTAs, internal links accurate |
| `docs/architecture/data-models.md` | TypeScript interfaces match `src/lib/types/index.ts`, data file contents match actual data (descriptions, arrays), section numbering correct |
| `docs/architecture/state-management.md` | Store inventory complete, store implementations match actual code, localStorage keys accurate, initialization flow correct |

### Step 3: Make updates

For each doc that needs changes:
1. Update the `Last updated` date to today
2. Make the specific content changes
3. Verify section numbering is still correct
4. Check for any npm references (should be yarn)

Do NOT update docs that are historical records of past work (e.g., old implementation plans under `docs/superpowers/plans/`). Those reflect what was done at the time.

### Step 4: Commit

Stage all changed docs and commit with a descriptive message:

```
docs: update documentation to reflect [summary of what changed]
```

### Step 5: Report

Summarize what was updated in a table:

| Doc | Changes |
|-----|---------|
| CHANGELOG.md | Added section for ... |
| design-system.md | Updated ... |
| ... | ... |

## Key Rules

- Be thorough — check EVERY doc, not just the obvious ones
- Be specific — "updated meta tags" is not enough, list the actual before/after values
- Be accurate — read the actual source files to verify, don't rely on memory
- Update dates — every modified doc gets its `Last updated` field changed
- Keep history — the changelog is append-only (new entries at the top, old entries preserved)
- Use yarn — never write npm commands in any doc

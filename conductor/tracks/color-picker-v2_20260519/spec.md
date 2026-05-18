# Specification: Color Picker v2 — Pro Features

**Track ID:** color-picker-v2_20260519
**Type:** Feature
**Created:** 2026-05-19
**Status:** Approved

## Summary

Major upgrade adding three pro-grade features that no competing Chrome color picker extension offers together: two-color WCAG contrast checking, developer-friendly output formats (Tailwind, CSS vars, OKLCH), and color blindness simulation. Combined with our existing zero-permission trust model and modern UI, this positions Arbenger Color Picker as the best-in-class tool.

## Context

Research shows top user pain points with existing tools (ColorZilla, Eye Dropper, ColorPick) are: trust/security concerns, no built-in contrast checking, and no developer output formats. The two-color contrast flow is only available in Pika (Mac-only) — no Chrome extension does it.

## Acceptance Criteria

- [ ] Two-color contrast: user can pick or enter foreground + background colors
- [ ] Shows WCAG 2.1 contrast ratio, AA/AAA pass/fail for normal and large text
- [ ] Developer formats: copy as Tailwind class, CSS variable, OKLCH, HSL, RGB, HEX
- [ ] Color blindness simulation: preview picked color through protanopia, deuteranopia, tritanopia filters
- [ ] All new features integrated into existing popup with collapsible sections
- [ ] Extension still under 15KB JS bundled

## Dependencies

Builds on existing color-picker-ext_20260518 codebase.

## Out of Scope

- APCA (WCAG 3.0 draft) — future addition
- Palette sync across devices
- Pick from uploaded images
- Swift/Kotlin output (web-focused for v2)

## Technical Notes

- Color blindness simulation uses Brettel 1997 algorithm (pure math, no dependencies)
- OKLCH conversion uses standard formulas (no dependencies)
- Two-color contrast uses existing `contrastRatio` function, extended with foreground/background picker
- All features must work in the popup context (no content scripts needed)

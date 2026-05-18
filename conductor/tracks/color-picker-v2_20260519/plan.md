# Implementation Plan: Color Picker v2 — Pro Features

**Track ID:** color-picker-v2_20260519
**Spec:** [spec.md](./spec.md)
**Created:** 2026-05-19
**Status:** [ ] Not Started

## Overview

Add three major features to the existing Color Picker extension: two-color contrast checker, developer output formats, and color blindness simulation. All implemented as new collapsible sections in the popup, reusing existing color math utilities.

## Phase 1: Developer Output Formats

Replace existing basic format rows with an expanded format system.

### Tasks

- [ ] Task 1.1: Add OKLCH color conversion functions (RGB → OKLCH)
- [ ] Task 1.2: Add Tailwind class matcher (find closest Tailwind color name for a hex value)
- [ ] Task 1.3: Add CSS variable format (`var(--color-name)` with customizable prefix)
- [ ] Task 1.4: Update format rows UI — add OKLCH row, Tailwind row, CSS var row
- [ ] Task 1.5: Each format row copies its value on click (using existing toast system)

### Verification

- [ ] All 6 formats display correctly for any picked color
- [ ] Copy toast shows correct value for each format

## Phase 2: Two-Color Contrast Checker

Replace existing single-color contrast section with a two-color picker.

### Tasks

- [ ] Task 2.1: Redesign contrast section — foreground + background color slots
- [ ] Task 2.2: Add HEX input fields for manual color entry (foreground + background)
- [ ] Task 2.3: "Use picked color as foreground/background" buttons to assign current pick
- [ ] Task 2.4: Swap foreground/background button
- [ ] Task 2.5: Display WCAG 2.1 contrast ratio with AA/AAA pass/fail for normal text (4.5:1) and large text (3:1)
- [ ] Task 2.6: Live preview text sample showing foreground on background

### Verification

- [ ] Can set both colors via pick or manual hex input
- [ ] Contrast ratio updates live as colors change
- [ ] Pass/fail badges correct for AA/AAA normal and large text

## Phase 3: Color Blindness Simulation

New collapsible section showing how the picked color appears under different types of color blindness.

### Tasks

- [ ] Task 3.1: Implement Brettel 1997 color blindness simulation (protanopia, deuteranopia, tritanopia)
- [ ] Task 3.2: Build simulation UI — three swatches with labels showing simulated colors
- [ ] Task 3.3: Show original vs simulated hex values side by side
- [ ] Task 3.4: Click any simulated swatch to copy its hex value

### Verification

- [ ] Simulation produces visually correct results for known test colors
- [ ] All three types display with clear labels
- [ ] Copy works on simulated swatches

## Phase 4: Integration & Polish

Ensure all features work together smoothly.

### Tasks

- [ ] Task 4.1: Verify popup stays within 480px max height with all sections
- [ ] Task 4.2: Test light/dark mode on all new sections
- [ ] Task 4.3: Verify bundle size stays under 15KB
- [ ] Task 4.4: Update README with new features

### Verification

- [ ] All features work in light and dark mode
- [ ] Popup scrolls smoothly, no layout overflow
- [ ] Bundle under 15KB

## Final Verification

- [ ] All acceptance criteria met
- [ ] Extension tested with various color picks
- [ ] Two-color contrast produces correct WCAG ratios
- [ ] Color blindness simulation matches known reference values
- [ ] All copy actions trigger toast with correct value

# Specification: Color Picker Site Integration

**Track ID:** color-picker-site_20260519
**Type:** Feature
**Created:** 2026-05-19
**Status:** Approved

## Summary

Integrate the Color Picker Chrome extension across arbenger.com: fix product data, add to homepage FeaturedTool, create a product landing page at `/products/color-picker`, write a blog post, and update the sitemap. Follow existing patterns from Image Resizer and Image Compressor.

## Context

Color Picker is Arbenger's first Chrome extension — live with features: eyedropper, HEX/RGB/HSL/OKLCH output, color harmonies, two-color contrast checker, color blindness simulation, shades/tints, and persistent history. Currently listed in `products.ts` but missing `externalUrl`, and not showcased on homepage or blog.

## Acceptance Criteria

- [ ] Product data in `products.ts` has correct `externalUrl` (Chrome Web Store or placeholder)
- [ ] Homepage FeaturedTool showcases Color Picker alongside Image Resizer and Image Compressor
- [ ] Product landing page at `/products/color-picker` with feature showcase, screenshots description, and Chrome Web Store CTA
- [ ] Blog post at `/blog/introducing-color-picker` announcing the extension
- [ ] Sitemap includes `/products/color-picker/` and `/blog/introducing-color-picker/`
- [ ] All pages have correct MetaTags and JSON-LD schema
- [ ] Works in both dark and light mode
- [ ] Responsive (mobile, tablet, desktop)

## Dependencies

- Existing product display patterns (FeaturedTool, products page, blog)
- Color Picker extension (complete — extensions/color-picker/)
- Design system (docs/guidelines/design-system.md)

## Out of Scope

- Chrome Web Store submission (separate process)
- Extension download analytics
- Video demo or animated screenshots

## Technical Notes

- Landing page uses `(chrome-plugins)` group route to keep URL clean: `/products/color-picker`
- Blog post follows existing pattern: `.svelte` file in `_posts/` with metadata in `blog.ts`
- FeaturedTool currently hardcoded for 2 products — needs redesign or extension for 3
- Product landing page should use WebApplication JSON-LD + BreadcrumbList (matching image tools)
- External URL links should open in new tab with `target="_blank" rel="noopener"`

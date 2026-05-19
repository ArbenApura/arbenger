import { readFileSync, writeFileSync } from 'fs';
import { Resvg } from '@resvg/resvg-js';

const lightLogoSvg = readFileSync('public/icons/color-picker-dark.svg', 'utf8');
const logoMatch = lightLogoSvg.match(/<g[^>]*>([\s\S]*?)<\/g>/);
const logoPaths = logoMatch ? logoMatch[1] : '';


// RENDER AT 2X FOR SHARP TEXT

// -- SMALL PROMO TILE: 440x280 (render at 880x560) --
const SW = 880, SH = 560;
const SCX = SW / 2;

const smallSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SW}" height="${SH}" viewBox="0 0 ${SW} ${SH}">
  <rect width="${SW}" height="${SH}" fill="#071C38"/>

  <!-- LOGO — DARK CIRCLE + WHITE ICON, BIGGER -->
  <g transform="translate(${SCX},${SH / 2 - 90})">
    <circle r="95" fill="#0B1628" stroke="#1E293B" stroke-width="2"/>
    <g fill="#FFFFFF" transform="scale(0.16) translate(-525,-530)">
      ${logoPaths}
    </g>
  </g>

  <!-- TITLE -->
  <text x="${SCX}" y="${SH / 2 + 80}" text-anchor="middle" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="bold">Color Picker</text>

  <!-- TAGLINE -->
  <text x="${SCX}" y="${SH / 2 + 120}" text-anchor="middle" fill="#22D3EE" font-family="Arial, Helvetica, sans-serif" font-size="22">WCAG Contrast · Color Blindness · 4 Formats</text>

  <!-- BRAND -->
  <text x="${SCX}" y="${SH - 36}" text-anchor="middle" fill="#64748B" font-family="Arial, Helvetica, sans-serif" font-size="20">by Arbenger</text>
</svg>`;

// -- MARQUEE PROMO TILE: 1400x560 (render at 2800x1120) --
const MW = 1400, MH = 560;
const LOGO_CX = 215;
const LOGO_CY = MH / 2;
const TX = 430;

const marqueeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${MW}" height="${MH}" viewBox="0 0 ${MW} ${MH}">
  <rect width="${MW}" height="${MH}" fill="#071C38"/>

  <!-- LOGO — DARK CIRCLE + WHITE ICON -->
  <g transform="translate(${LOGO_CX},${LOGO_CY})">
    <circle r="140" fill="#0B1628" stroke="#1E293B" stroke-width="2"/>
    <g fill="#FFFFFF" transform="scale(0.2) translate(-525,-530)">
      ${logoPaths}
    </g>
  </g>

  <!-- TITLE -->
  <text x="${TX}" y="${LOGO_CY - 60}" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold">Color Picker</text>

  <!-- TAGLINE -->
  <text x="${TX}" y="${LOGO_CY - 15}" fill="#94A3B8" font-family="Arial, Helvetica, sans-serif" font-size="26">Pick any color. Check if it's accessible.</text>

  <!-- FEATURE PILLS -->
  <g transform="translate(${TX}, ${LOGO_CY + 20})">
    <rect x="0" y="0" width="180" height="48" rx="24" fill="#22D3EE" opacity="0.12"/>
    <text x="90" y="31" text-anchor="middle" fill="#22D3EE" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold">Eyedropper</text>

    <rect x="196" y="0" width="230" height="48" rx="24" fill="#22D3EE" opacity="0.12"/>
    <text x="311" y="31" text-anchor="middle" fill="#22D3EE" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold">Contrast Checker</text>

    <rect x="442" y="0" width="220" height="48" rx="24" fill="#22D3EE" opacity="0.12"/>
    <text x="552" y="31" text-anchor="middle" fill="#22D3EE" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold">Color Blindness</text>
  </g>

  <!-- TRUST LINE -->
  <text x="${TX}" y="${LOGO_CY + 110}" fill="#2DD4BF" font-family="Arial, Helvetica, sans-serif" font-size="20">Minimal permissions · Lightweight · Free</text>

  <!-- BRAND -->
  <text x="${TX}" y="${MH - 30}" fill="#64748B" font-family="Arial, Helvetica, sans-serif" font-size="16">by Arbenger</text>
</svg>`;

const small = new Resvg(smallSvg, { fitTo: { mode: 'width', value: 440 }, background: '#071C38' });
writeFileSync('store/small-promo-tile.png', small.render().asPng());
console.log('Generated: store/small-promo-tile.png (440x280)');

const marquee = new Resvg(marqueeSvg, { fitTo: { mode: 'width', value: MW }, background: '#071C38' });
writeFileSync('store/marquee-promo-tile.png', marquee.render().asPng());
console.log('Generated: store/marquee-promo-tile.png (1400x560)');

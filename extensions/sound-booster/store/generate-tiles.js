import { writeFileSync } from 'fs';
import { Resvg } from '@resvg/resvg-js';

const speakerIcon = `
  <polygon points="40,150 130,150 270,35 270,425 130,310 40,310"/>
  <path d="M340,110 Q440,230 340,350" stroke-width="44" fill="none" stroke-linecap="round"/>
  <path d="M420,45 Q555,230 420,415" stroke-width="44" fill="none" stroke-linecap="round"/>
`;

// -- SMALL PROMO TILE: 440x280 (render at 880x560 for 2x) --
const SW = 880, SH = 560;
const SCX = SW / 2;

const smallSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SW}" height="${SH}" viewBox="0 0 ${SW} ${SH}">
  <rect width="${SW}" height="${SH}" fill="#071C38"/>

  <!-- LOGO — DARK CIRCLE + WHITE ICON -->
  <g transform="translate(${SCX},${SH / 2 - 90})">
    <circle r="95" fill="#0B1628" stroke="#1E293B" stroke-width="2"/>
    <g fill="#FFFFFF" stroke="#FFFFFF" transform="scale(0.18) translate(-300,-230)">
      ${speakerIcon}
    </g>
  </g>

  <!-- TITLE -->
  <text x="${SCX}" y="${SH / 2 + 80}" text-anchor="middle" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="bold">Sound Booster</text>

  <!-- TAGLINE -->
  <text x="${SCX}" y="${SH / 2 + 120}" text-anchor="middle" fill="#22D3EE" font-family="Arial, Helvetica, sans-serif" font-size="22">Volume up to 600% · 5-Band EQ · Presets</text>

  <!-- BRAND -->
  <text x="${SCX}" y="${SH - 36}" text-anchor="middle" fill="#64748B" font-family="Arial, Helvetica, sans-serif" font-size="20">by Arbenger</text>
</svg>`;

// -- MARQUEE PROMO TILE: 1400x560 --
const MW = 1400, MH = 560;
const LOGO_CX = 215;
const LOGO_CY = MH / 2;
const TX = 430;

const marqueeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${MW}" height="${MH}" viewBox="0 0 ${MW} ${MH}">
  <rect width="${MW}" height="${MH}" fill="#071C38"/>

  <!-- LOGO — DARK CIRCLE + WHITE ICON -->
  <g transform="translate(${LOGO_CX},${LOGO_CY})">
    <circle r="140" fill="#0B1628" stroke="#1E293B" stroke-width="2"/>
    <g fill="#FFFFFF" stroke="#FFFFFF" transform="scale(0.28) translate(-300,-230)">
      ${speakerIcon}
    </g>
  </g>

  <!-- TITLE -->
  <text x="${TX}" y="${LOGO_CY - 60}" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold">Sound Booster</text>

  <!-- TAGLINE -->
  <text x="${TX}" y="${LOGO_CY - 15}" fill="#94A3B8" font-family="Arial, Helvetica, sans-serif" font-size="26">Boost audio beyond 100%. Per-tab volume &amp; equalizer.</text>

  <!-- FEATURE PILLS -->
  <g transform="translate(${TX}, ${LOGO_CY + 20})">
    <rect x="0" y="0" width="200" height="48" rx="24" fill="#22D3EE" opacity="0.12"/>
    <text x="100" y="31" text-anchor="middle" fill="#22D3EE" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold">Up to 600%</text>

    <rect x="216" y="0" width="190" height="48" rx="24" fill="#22D3EE" opacity="0.12"/>
    <text x="311" y="31" text-anchor="middle" fill="#22D3EE" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold">5-Band EQ</text>

    <rect x="422" y="0" width="160" height="48" rx="24" fill="#22D3EE" opacity="0.12"/>
    <text x="502" y="31" text-anchor="middle" fill="#22D3EE" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold">Presets</text>

    <rect x="598" y="0" width="200" height="48" rx="24" fill="#22D3EE" opacity="0.12"/>
    <text x="698" y="31" text-anchor="middle" fill="#22D3EE" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold">No Tracking</text>
  </g>

  <!-- TRUST LINE -->
  <text x="${TX}" y="${LOGO_CY + 110}" fill="#2DD4BF" font-family="Arial, Helvetica, sans-serif" font-size="20">Minimal permissions · Zero tracking · Free</text>

  <!-- BRAND -->
  <text x="${TX}" y="${MH - 30}" fill="#64748B" font-family="Arial, Helvetica, sans-serif" font-size="16">by Arbenger</text>
</svg>`;

const small = new Resvg(smallSvg, { fitTo: { mode: 'width', value: 440 }, background: '#071C38' });
writeFileSync('store/small-promo-tile.png', small.render().asPng());
console.log('Generated: store/small-promo-tile.png (440x280)');

const marquee = new Resvg(marqueeSvg, { fitTo: { mode: 'width', value: MW }, background: '#071C38' });
writeFileSync('store/marquee-promo-tile.png', marquee.render().asPng());
console.log('Generated: store/marquee-promo-tile.png (1400x560)');

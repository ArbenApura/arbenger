# Publishing to Chrome Web Store

## Prerequisites

1. Chrome Web Store Developer account ($5 one-time fee)
   - https://chrome.google.com/webstore/devconsole
2. Google account (use arbenapura.official@gmail.com)

## Step 1: Package

```bash
cd extensions/sound-booster
yarn package
```

Output: `store/sound-booster-v1.0.0.zip`

## Step 2: Generate Promo Tiles

```bash
node store/generate-tiles.js
```

Output:
- `store/small-promo-tile.png` (440×280)
- `store/marquee-promo-tile.png` (1400×560)

## Step 3: Create Screenshots

Take these screenshots of the extension popup (1280×800 recommended):

1. **Main view** — Volume at 200%, peak meter active, "1 media source detected"
2. **EQ open** — Equalizer expanded, Bass Boost preset selected, sliders adjusted
3. **Light mode** — Toggle to light mode, show same main view
4. **Muted state** — Show MUTED text with red color, mute button active
5. **Off state** — Show booster disabled with dimmed controls

Tips:
- Screenshot the popup at native size and pad to 1280×800 with Arbenger navy (#0B0A23) background
- Or use Chrome DevTools device toolbar for exact 1280×800
- Minimum size accepted: 640×400

## Step 4: Upload to Chrome Web Store

1. Go to https://chrome.google.com/webstore/devconsole
2. Click **New Item**
3. Upload `store/sound-booster-v1.0.0.zip`
4. Fill in listing details from `store/listing.md`:
   - Name: `Sound Booster — Arbenger`
   - Short description: copy from listing.md
   - Full description: copy from listing.md
   - Category: Accessibility
   - Language: English
5. Upload screenshots (1-5 images)
6. Upload promo tiles:
   - Small promo tile (440×280) — required
   - Marquee promo tile (1400×560) — optional
7. Privacy tab:
   - Single purpose: "Boost and equalize audio playback in browser tabs beyond the default 100% volume limit"
   - Permission justifications:
     - `activeTab`: "Required to inject the audio processing script into the current tab when the user activates the extension"
     - `storage`: "Saves user preferences (theme, EQ presets, panel states) locally"
     - `scripting`: "Required to programmatically inject the content script that creates the audio processing chain"
   - Data usage: Select **"This extension does not collect or use user data"**
   - Privacy policy URL: `https://arbenger.com/privacy/`
8. Click **Submit for Review**

## Step 5: After Approval

1. Copy the Chrome Web Store URL
2. Update `src/lib/data/products.ts` — add sound-booster product entry with store URL
3. Create product page at `/products/sound-booster/`
4. Add "Add to Chrome" links on arbenger.com
5. Write blog tutorial post
6. Deploy site: `yarn deploy`

## Updating the Extension

1. Bump version in `public/manifest.json` and `package.json`
2. Run `yarn package`
3. Dashboard → Sound Booster → Package → Upload new package
4. Submit for review (usually faster than first review)

## Files in store/

- `listing.md` — Store listing copy (description, tags, category)
- `PUBLISHING.md` — This file
- `generate-tiles.js` — Promo tile image generator
- `small-promo-tile.png` — 440×280 promo tile
- `marquee-promo-tile.png` — 1400×560 marquee tile
- `sound-booster-v*.zip` — Packaged extension ready to upload

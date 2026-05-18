# Publishing to Chrome Web Store

## Prerequisites

1. Chrome Web Store Developer account ($5 one-time fee)
   - https://chrome.google.com/webstore/devconsole
2. Google account (use arbenapura.official@gmail.com)

## Step 1: Package

```bash
cd extensions/color-picker
yarn package
```

Output: `store/color-picker-v1.1.0.zip`

## Step 2: Create Screenshots

Take these screenshots of the extension popup (1280×800 recommended):

1. **Main view** — Pick a vibrant color (e.g., #6366F1), show swatch + all 4 format rows
2. **Contrast checker** — Open the Contrast panel, show text vs background with AA/AAA badges
3. **Color blindness** — Open the Color Blindness panel, show all 3 simulation rows
4. **Harmonies** — Open the Harmonies panel, show complementary + analogous swatches
5. **Light mode** — Toggle to light mode, show the same main view

Tips:
- Use Chrome's device toolbar (F12 → toggle device) to get exact 1280×800
- Or screenshot the popup at native size and pad to 1280×800 with the Arbenger navy (#0B0A23) background
- Minimum size accepted: 640×400

## Step 3: Create Promo Tile

- Size: 440×280 PNG
- Show the extension icon + name on navy background
- Can use Figma, Canva, or any design tool

## Step 4: Upload to Chrome Web Store

1. Go to https://chrome.google.com/webstore/devconsole
2. Click **New Item**
3. Upload `store/color-picker-v1.1.0.zip`
4. Fill in listing details from `store/listing.md`:
   - Name: `Color Picker — Arbenger`
   - Short description: copy from listing.md
   - Full description: copy from listing.md
   - Category: Developer Tools
   - Language: English
5. Upload screenshots (1-5 images)
6. Upload promo tile (440×280)
7. Privacy tab:
   - Single purpose: "Pick colors from webpages and provide color format conversion, contrast checking, and color blindness simulation"
   - Permission justification:
     - `activeTab`: "Required to activate the EyeDropper API on the current page for color picking"
     - `storage`: "Required to persist color history and user preferences (theme, panel states)"
   - Data usage: Select **"This extension does not collect or use user data"**
   - Privacy policy URL: `https://arbenger.com/privacy/`
8. Click **Submit for Review**

## Step 5: After Approval

1. Copy the Chrome Web Store URL
2. Update `src/lib/data/products.ts` — replace placeholder externalUrl with real store URL
3. Update all "Add to Chrome" links on arbenger.com:
   - `/products/color-picker/+page.svelte`
   - Blog post CTA
4. Deploy site: `yarn deploy`

## Updating the Extension

1. Bump version in `public/manifest.json`
2. Run `yarn package`
3. Dashboard → Color Picker → Package → Upload new package
4. Submit for review (usually faster than first review)

## Files in store/

- `listing.md` — Store listing copy (description, tags, category)
- `color-picker-v*.zip` — Packaged extension ready to upload
- `PUBLISHING.md` — This file

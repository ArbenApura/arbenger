# Arbenger Color Picker

Chrome extension for picking colors from any webpage.

## Features

- Eyedropper picks any pixel color (EyeDropper API, Chrome 95+)
- View in HEX, RGB, HSL
- One-click copy to clipboard
- Persistent color history (50 colors, chrome.storage.local)
- Delete individual colors or clear all
- Arbenger dark theme UI

## Development

```bash
cd extensions/color-picker
yarn install
yarn build        # one-shot build to dist/
yarn watch        # rebuild on file changes
```

## Load in Chrome

1. Open `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `dist/` directory

## Build Output

The `dist/` directory contains the complete extension:

- `manifest.json` — Manifest V3
- `popup.html` — Popup UI
- `popup.js` — Bundled TypeScript
- `icons/` — Extension icons (16, 32, 48, 128px)

## Tech Stack

- TypeScript
- esbuild (bundler)
- Chrome Manifest V3
- EyeDropper API
- chrome.storage.local

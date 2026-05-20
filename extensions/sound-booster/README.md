# Sound Booster — Arbenger

Chrome extension that boosts audio beyond 100% with per-tab volume control, 5-band equalizer, presets, and keyboard shortcuts.

## Development

### Setup

```bash
cd extensions/sound-booster
yarn install
```

### Build

```bash
yarn build       # Production build → dist/
yarn watch       # Watch mode (unminified)
```

### Load in Chrome

1. `yarn build`
2. Open `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" → select `dist/` folder

### Package for Store

```bash
yarn package     # Build + zip → store/sound-booster-v{version}.zip
```

### Generate Icons

```bash
node generate-icons.js
```

Converts SVG sources in `public/icons/` to PNG at 16, 32, 48, 128px.

## Architecture

```
src/
├── popup.ts      # Popup UI — volume slider, EQ, presets, theme
├── background.ts # Service worker — badge, shortcuts, state, injection
└── content.ts    # Content script — Web Audio API engine

public/
├── manifest.json # Manifest V3, permissions: activeTab + storage + scripting
├── popup.html    # Popup markup + embedded CSS
└── icons/        # SVG sources + generated PNGs
```

### Audio Processing Chain

```
MediaElement → [EQ Band ×5] → GainNode → DynamicsCompressor → Analyser → Destination
```

### Message Flow

```
Popup ←→ Background (badge, state, injection)
Popup ←→ Content Script (volume, EQ, peak meter)
Background → Content Script (keyboard shortcuts)
```

## Permissions

| Permission | Why |
|-----------|-----|
| `activeTab` | Inject content script into current tab |
| `storage` | Persist theme, presets, panel states |
| `scripting` | Programmatic content script injection |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Alt+Shift+Up | Volume +10% |
| Alt+Shift+Down | Volume -10% |
| Alt+Shift+M | Toggle mute |

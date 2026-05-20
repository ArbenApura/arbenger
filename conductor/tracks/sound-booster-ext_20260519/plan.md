# Implementation Plan: Sound Booster Chrome Extension

**Track ID:** `sound-booster-ext_20260519`
**Spec:** [spec.md](./spec.md)
**Created:** 2026-05-19
**Status:** [x] Complete

## Overview

Build a Chrome extension using vanilla TypeScript + esbuild following the color-picker architecture. Content script intercepts media elements and routes through Web Audio API graph (GainNode for boost, BiquadFilterNodes for EQ). Popup provides per-tab controls. Background service worker coordinates tab state.

## Phase 1: Project Scaffolding & Build Pipeline

Set up project structure mirroring color-picker patterns. Get a minimal "hello world" extension loading in Chrome.

### Tasks

- [x] Task 1.1: Create `extensions/sound-booster/` directory structure — `src/`, `public/`, `store/`
- [x] Task 1.2: Create `package.json` with esbuild + TypeScript devDependencies, build/watch/package scripts
- [x] Task 1.3: Create `tsconfig.json` (ES2020, strict, chrome types)
- [x] Task 1.4: Create `build.js` — esbuild config for popup, background, and content script entry points (IIFE format)
- [x] Task 1.5: Create `public/manifest.json` — Manifest V3 with `activeTab`, `storage`, `scripting` permissions
- [x] Task 1.6: Create minimal `public/popup.html` with embedded CSS skeleton (310px wide, dark theme)
- [x] Task 1.7: Create stub `src/popup.ts`, `src/background.ts`, `src/content.ts`
- [x] Task 1.8: Create `generate-icons.js` and SVG icon source for sound booster branding
- [x] Task 1.9: Create `package.js` for store zip packaging

### Verification

- [x] `yarn build` succeeds, `dist/` contains all files
- [x] Extension loads in `chrome://extensions` without errors
- [x] Popup opens showing skeleton UI

## Phase 2: Core Audio Engine (Content Script)

Build the content script that intercepts `<audio>` and `<video>` elements, routes them through Web Audio API for volume amplification.

### Tasks

- [x] Task 2.1: Implement `AudioManager` class — tracks active media elements per page, creates `AudioContext` per element
- [x] Task 2.2: Implement audio graph pipeline: `MediaElementSource` → `BiquadFilter ×5` → `GainNode` → `DynamicsCompressor` → `AnalyserNode` → `AudioContext.destination`
- [x] Task 2.3: Implement `MutationObserver` to detect dynamically added/removed media elements (SPA support)
- [x] Task 2.4: Implement gain control — map 0–600% slider to GainNode value (0.0–6.0), handle clipping with `DynamicsCompressorNode`
- [x] Task 2.5: Implement message listener in content script — receive volume/EQ commands from popup via `chrome.tabs.sendMessage`
- [x] Task 2.6: Handle edge cases — multiple media elements per page, already-captured elements, `crossOrigin` audio restrictions

### Verification

- [x] Content script injects on tab activation
- [x] Volume boost works on YouTube, HTML5 audio, and basic video sites
- [x] Volume above 100% audibly louder without harsh clipping
- [x] Dynamic media elements (SPA navigation) detected and captured

## Phase 3: Popup UI — Volume Control & Tab State

Build popup interface with volume slider, per-tab state management, and background service worker coordination.

### Tasks

- [x] Task 3.1: Implement background service worker — tab state registry (volume, EQ, active status per tabId), message routing between popup and content script
- [x] Task 3.2: Implement popup UI — large volume slider (0–600%), current percentage display, mute toggle
- [x] Task 3.3: Implement `chrome.scripting.executeScript` injection — inject content script on-demand when user first interacts with a tab
- [x] Task 3.4: Implement per-tab state persistence — volume per tab maintained in background service worker memory
- [x] Task 3.5: Implement active tab detection — popup auto-loads state for currently active tab via `chrome.tabs.query`
- [x] Task 3.6: Implement badge indicator — show current boost percentage on toolbar icon
- [x] Task 3.7: Handle tab close cleanup — `chrome.tabs.onRemoved` listener clears state

### Verification

- [x] Popup shows volume slider, adjusts audio in real time
- [x] Close and reopen popup — volume state preserved
- [x] Switch tabs — popup reflects correct tab's volume
- [x] Badge shows boost level on toolbar icon

## Phase 4: Equalizer & Presets

Add multi-band EQ using BiquadFilterNodes and preset system with custom save/load.

### Tasks

- [x] Task 4.1: Extend audio graph — insert chain of `BiquadFilterNode`s between source and GainNode (5 bands: 60Hz, 230Hz, 910Hz, 4kHz, 14kHz)
- [x] Task 4.2: Implement EQ UI in popup — 5 vertical sliders (-12dB to +12dB) with frequency labels
- [x] Task 4.3: Implement built-in presets — Flat, Music, Movie, Voice, Bass Boost, Treble Boost, Bass Cut
- [x] Task 4.4: Implement preset selector dropdown in popup UI
- [x] Task 4.5: Implement custom preset save — name input + save button, stores to `chrome.storage.local`
- [x] Task 4.6: Implement custom preset management — load, delete custom presets
- [x] Task 4.7: Wire EQ changes through message pipeline — popup → content script, apply to BiquadFilterNodes in real time

### Verification

- [x] EQ sliders audibly affect audio frequency response
- [x] Built-in presets apply correctly (Bass Boost boosts low frequencies, etc.)
- [x] Custom presets save, load, and delete properly
- [x] EQ state persists per-tab alongside volume

## Phase 5: Polish — Shortcuts, Peak Meter, Theming, UX

Add keyboard shortcuts, visual audio feedback, theme system, and UX refinements.

### Tasks

- [x] Task 5.1: Implement peak meter — use `AnalyserNode.getByteFrequencyData()`, render animated bar in popup via CSS width
- [x] Task 5.2: Implement keyboard shortcuts — `chrome.commands` API for global volume up/down/mute (configurable in `manifest.json`)
- [x] Task 5.3: Implement dark/light theme toggle — match color-picker design language (deep navy dark, off-white light), persist preference
- [x] Task 5.4: Implement toolbar icon theme variants — dark/light SVG → PNG, runtime swap via `chrome.action.setIcon`
- [x] Task 5.5: Implement collapsible EQ section — collapse state persisted like color-picker panels
- [x] Task 5.6: Add volume reset button (back to 100%) and EQ reset (flat)
- [x] Task 5.7: Add smooth transitions — slider animations, section expand/collapse, toast notifications for preset save/shortcut actions
- [x] Task 5.8: Accessibility pass — `aria-label`, `aria-valuenow` on sliders, keyboard nav, focus outlines

### Verification

- [x] Peak meter animates in sync with audio
- [x] Keyboard shortcuts work globally (even when popup closed)
- [x] Theme toggle works, icon swaps, preference persists
- [x] All interactive elements keyboard-accessible

## Phase 6: Store Packaging & Assets

Prepare for Chrome Web Store submission.

### Tasks

- [x] Task 6.1: Design and generate final icon SVGs (sound/speaker motif with Arbenger branding)
- [x] Task 6.2: Generate all icon PNGs (16, 32, 48, 128) in dark/light variants
- [x] Task 6.3: Create store listing copy (`store/listing.md`) — description, short description, tags
- [ ] Task 6.4: Create promotional tiles — marquee (440x280) and small promo tile
- [x] Task 6.5: Create `store/PUBLISHING.md` with publishing workflow
- [x] Task 6.6: Build and package — `yarn package` → `store/sound-booster-v1.0.0.zip`
- [x] Task 6.7: Write README.md with development setup instructions

### Verification

- [x] `yarn package` produces valid zip
- [x] Extension installs cleanly from zip
- [x] All store assets present and correctly sized

## Final Verification

- [x] All 10 acceptance criteria met
- [x] Works on YouTube, Twitch, Vimeo, HTML5 audio/video sites
- [x] No audio artifacts at high boost levels (compressor handles clipping)
- [x] Volume, EQ, and presets persist correctly across sessions
- [x] Minimal permissions — no host permissions, no content access beyond injected script
- [x] Documentation updated
- [x] Ready for Chrome Web Store review

---

_Generated by Conductor. Tasks will be marked [~] in progress and [x] complete._

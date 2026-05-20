# Chrome Web Store Listing — Sound Booster — Arbenger

## Short Description (132 chars max)

Boost audio beyond 100%. Per-tab volume up to 600%, 5-band equalizer, presets, keyboard shortcuts. Zero tracking, zero page access.

## Full Description

Boost any tab's audio up to 600% — far beyond the browser's built-in limit. Perfect for quiet videos, low-volume streams, and podcasts that just aren't loud enough.

WHAT YOU GET:

• Volume boost up to 600% — Smooth slider with snap-to-100% and visual peak meter
• 5-band equalizer — Fine-tune bass, mids, and treble (60Hz, 230Hz, 910Hz, 4kHz, 14kHz)
• Presets — Flat, Bass Boost, Treble Boost, Music, Movie, Voice, Bass Cut
• Custom presets — Save and manage your own EQ configurations
• Per-tab control — Each tab keeps its own volume and EQ settings
• Keyboard shortcuts — Alt+Shift+Up/Down for volume, Alt+Shift+M for mute
• On/off toggle — Instantly bypass all processing without losing settings
• Live peak meter — See audio levels in real time
• Light & dark mode — Toggle in the popup header

WHY THIS ONE:

Most volume boosters request broad permissions and inject heavy scripts into every page. This extension uses only three permissions:

• activeTab — injects the audio processor only when you activate it
• storage — saves your presets and preferences locally
• scripting — enables on-demand content script injection

No page content access. No network requests. No analytics. No background tracking.

HOW IT WORKS:

Sound Booster uses the Web Audio API to build a professional processing chain: your media → 5-band EQ → gain boost → dynamics compressor (prevents clipping) → analyser (peak meter) → speakers. All processing runs locally in your browser.

KEYBOARD SHORTCUTS:

• Alt+Shift+Up — Volume up 10%
• Alt+Shift+Down — Volume down 10%
• Alt+Shift+M — Toggle mute

NOTE:

Works with standard HTML5 audio and video elements. Some streaming services with DRM protection (Netflix, Disney+, Spotify) use encrypted media that cannot be processed by the Web Audio API.

Free. No account needed. No data collected.

Made by Arbenger — https://arbenger.com

## Category

Accessibility

## Language

English

## Tags (up to 5)

sound booster, volume booster, audio amplifier, equalizer, volume control

## Single Purpose

Boost and equalize audio playback in browser tabs beyond the default 100% volume limit.

## Permission Justifications

- **activeTab** — Required to inject the audio processing script into the current tab when the user activates the extension
- **storage** — Saves user preferences (theme, EQ presets, panel states) locally
- **scripting** — Required to programmatically inject the content script that creates the audio processing chain

## Privacy Policy URL

https://arbenger.com/privacy/

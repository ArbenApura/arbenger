// -- TYPES -- //

interface EqPreset {
	name: string;
	gains: number[];
	builtIn?: boolean;
}

// -- CONSTANTS -- //

const MAX_VOLUME = 600;
const EQ_MIN = -12;
const EQ_MAX = 12;
const PEAK_POLL_MS = 60;

const EQ_BANDS = [
	{ freq: 60, label: '60' },
	{ freq: 230, label: '230' },
	{ freq: 910, label: '910' },
	{ freq: 4000, label: '4k' },
	{ freq: 14000, label: '14k' }
];

const BUILT_IN_PRESETS: EqPreset[] = [
	{ name: 'Flat', gains: [0, 0, 0, 0, 0], builtIn: true },
	{ name: 'Bass Boost', gains: [8, 5, 0, 0, 0], builtIn: true },
	{ name: 'Treble Boost', gains: [0, 0, 0, 5, 8], builtIn: true },
	{ name: 'Music', gains: [4, 2, 0, 3, 5], builtIn: true },
	{ name: 'Movie', gains: [6, 4, 2, 1, 3], builtIn: true },
	{ name: 'Voice', gains: [-2, 0, 6, 4, -1], builtIn: true },
	{ name: 'Bass Cut', gains: [-8, -4, 0, 0, 0], builtIn: true }
];

const MOON_SVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
const SUN_SVG =
	'<circle cx="12" cy="12" r="5"/>' +
	'<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>' +
	'<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
	'<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>' +
	'<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

const SPEAKER_SVG =
	'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>' +
	'<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>' +
	'<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>';

const MUTED_SVG =
	'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>' +
	'<line x1="23" y1="9" x2="17" y2="15"/>' +
	'<line x1="17" y1="9" x2="23" y2="15"/>';

// -- DOM REFS -- //

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const volumeSlider = $<HTMLInputElement>('volumeSlider');
const volumePct = $<HTMLDivElement>('volumePct');
const peakBar = $<HTMLDivElement>('peakBar');
const muteBtn = $<HTMLButtonElement>('muteBtn');
const muteIcon = $<SVGElement>('muteIcon');
const muteLabel = $<HTMLSpanElement>('muteLabel');
const resetBtn = $<HTMLButtonElement>('resetBtn');
const themeBtn = $<HTMLButtonElement>('themeBtn');
const themeIcon = $<SVGElement>('themeIcon');
const eqToggle = $<HTMLButtonElement>('eqToggle');
const eqBody = $<HTMLDivElement>('eqBody');
const eqSlidersEl = $<HTMLDivElement>('eqSliders');
const presetSelectWrap = $<HTMLDivElement>('presetSelect');
const presetBtn = $<HTMLButtonElement>('presetBtn');
const presetLabel = $<HTMLSpanElement>('presetLabel');
const presetDropdown = $<HTMLDivElement>('presetDropdown');
const savePresetBtn = $<HTMLButtonElement>('savePresetBtn');
const deletePresetBtn = $<HTMLButtonElement>('deletePresetBtn');
const resetEqBtn = $<HTMLButtonElement>('resetEqBtn');
const statusDot = $<HTMLDivElement>('statusDot');
const statusText = $<HTMLSpanElement>('statusText');
const toast = $<HTMLDivElement>('toast');
const powerCheck = $<HTMLInputElement>('powerCheck');

// -- STATE -- //

let tabId: number | null = null;
let volume = 100;
let muted = false;
let enabled = true;
let eqGains = [0, 0, 0, 0, 0];
let customPresets: EqPreset[] = [];
let isDark = true;
let peakTimer: ReturnType<typeof setInterval> | null = null;
let toastTimer: ReturnType<typeof setTimeout> | null = null;

// -- HELPERS -- //

function showToast(msg: string) {
	toast.textContent = msg;
	toast.classList.add('show');
	if (toastTimer) clearTimeout(toastTimer);
	toastTimer = setTimeout(() => toast.classList.remove('show'), 1500);
}

function setStatus(type: 'active' | 'warning' | 'error' | 'off', text: string) {
	statusDot.className = 'status-dot ' + type;
	statusText.textContent = text;
}

// -- CONTENT SCRIPT COMMUNICATION -- //

async function ensureInjected(): Promise<boolean> {
	try {
		const resp = await chrome.runtime.sendMessage({ type: 'ensure-injected' });
		if (resp?.ok) {
			tabId = resp.tabId;
			return true;
		}
	} catch {}
	return false;
}

async function sendToContent<T = unknown>(msg: object): Promise<T | null> {
	if (!tabId) return null;
	try {
		return await chrome.tabs.sendMessage(tabId, msg);
	} catch {
		return null;
	}
}

// -- POWER ON/OFF -- //

async function togglePower(on: boolean) {
	enabled = on;
	powerCheck.checked = on;
	document.body.classList.toggle('off', !on);

	if (on) {
		await sendToContent({ type: 'set-enabled', enabled: true });
		await sendToContent({ type: 'set-volume', volume });
		await sendToContent({ type: 'set-mute', muted });
		await sendToContent({ type: 'set-eq', gains: eqGains });
		chrome.runtime.sendMessage({ type: 'badge-update', volume, muted, enabled: true });
		const state = await sendToContent<{ mediaCount: number }>({ type: 'get-state' });
		const count = state?.mediaCount ?? 0;
		if (count > 0) {
			setStatus('active', `${count} media source${count !== 1 ? 's' : ''} detected`);
		} else {
			setStatus('warning', 'No media detected — play audio first');
		}
		startPeakMeter();
		showToast('Booster ON');
	} else {
		stopPeakMeter();
		await sendToContent({ type: 'set-enabled', enabled: false });
		chrome.runtime.sendMessage({ type: 'badge-update', volume, muted, enabled: false });
		setStatus('off', 'Booster disabled');
		showToast('Booster OFF');
	}
}

// -- VOLUME -- //

function updateVolumeUI() {
	volumePct.textContent = muted ? 'MUTED' : `${volume}%`;
	volumePct.className = 'volume-pct mono';
	if (muted) volumePct.classList.add('muted');
	else if (volume > 300) volumePct.classList.add('high');
	else if (volume > 100) volumePct.classList.add('boost');

	volumeSlider.value = String(volume);
	volumeSlider.setAttribute('aria-valuenow', String(volume));
	updateSliderTrack();

	muteBtn.classList.toggle('active', muted);
	muteIcon.innerHTML = muted ? MUTED_SVG : SPEAKER_SVG;
	muteLabel.textContent = muted ? 'Unmute' : 'Mute';
}

function updateSliderTrack() {
	const pct = (volume / MAX_VOLUME) * 100;
	volumeSlider.style.background = `linear-gradient(to right, var(--cyan) ${pct}%, var(--border) ${pct}%)`;
}

function snapVolume(raw: number): number {
	return raw >= 95 && raw <= 105 ? 100 : raw;
}

async function setVolume(val: number) {
	volume = Math.max(0, Math.min(MAX_VOLUME, val));
	updateVolumeUI();
	await sendToContent({ type: 'set-volume', volume });
	chrome.runtime.sendMessage({ type: 'badge-update', volume, muted, enabled });
}

async function toggleMute() {
	muted = !muted;
	updateVolumeUI();
	await sendToContent({ type: 'set-mute', muted });
	chrome.runtime.sendMessage({ type: 'badge-update', volume, muted, enabled });
}

// -- EQ -- //

function renderEqSliders() {
	eqSlidersEl.innerHTML = EQ_BANDS.map(
		(band, i) => `
		<div class="eq-column">
			<span class="eq-value mono" id="eqVal${i}">${formatEqValue(eqGains[i])}</span>
			<div class="eq-track-wrap">
				<div class="eq-track"></div>
				<div class="eq-center-line"></div>
				<input type="range" class="eq-slider" id="eqSlider${i}"
					min="${EQ_MIN}" max="${EQ_MAX}" value="${eqGains[i]}"
					data-band="${i}" aria-label="${band.label}Hz EQ"
					aria-valuenow="${eqGains[i]}" aria-valuemin="${EQ_MIN}" aria-valuemax="${EQ_MAX}">
			</div>
			<span class="eq-freq mono">${band.label}</span>
		</div>`
	).join('');

	EQ_BANDS.forEach((_, i) => {
		const slider = document.getElementById(`eqSlider${i}`) as HTMLInputElement;
		slider.addEventListener('input', () => {
			const val = parseInt(slider.value);
			eqGains[i] = val;
			const label = document.getElementById(`eqVal${i}`);
			if (label) label.textContent = formatEqValue(val);
			applyEq();
			syncPresetSelect();
		});
	});
}

function formatEqValue(v: number): string {
	return v > 0 ? `+${v}` : String(v);
}

async function applyEq() {
	await sendToContent({ type: 'set-eq', gains: eqGains });
	chrome.runtime.sendMessage({ type: 'badge-update', volume, muted, eqGains, enabled });
}

function syncPresetSelect() {
	const allPresets = [...BUILT_IN_PRESETS, ...customPresets];
	const match = allPresets.find((p) => p.gains.every((g, i) => g === eqGains[i]));
	const name = match ? match.name : 'Custom';
	presetLabel.textContent = name;
	presetDropdown.querySelectorAll('.custom-select-option').forEach((opt) => {
		opt.classList.toggle('active', (opt as HTMLElement).dataset.value === name);
	});
}

function togglePresetDropdown() {
	presetSelectWrap.classList.toggle('open');
}

function closePresetDropdown() {
	presetSelectWrap.classList.remove('open');
}

// -- PRESETS -- //

async function loadCustomPresets(): Promise<void> {
	return new Promise((resolve) => {
		chrome.storage.local.get('customPresets', (data) => {
			customPresets = data.customPresets || [];
			resolve();
		});
	});
}

async function saveCustomPresets() {
	return new Promise<void>((resolve) => {
		chrome.storage.local.set({ customPresets }, resolve);
	});
}

function renderPresets() {
	let html = '<div class="custom-select-group"><div class="custom-select-group-label">Presets</div>';
	for (const p of BUILT_IN_PRESETS) {
		html += `<button class="custom-select-option" data-value="${p.name}" type="button">${p.name}</button>`;
	}
	html += '</div>';

	if (customPresets.length > 0) {
		html += '<div class="custom-select-group"><div class="custom-select-group-label">Saved</div>';
		for (const p of customPresets) {
			html += `<button class="custom-select-option" data-value="${p.name}" type="button">${p.name}</button>`;
		}
		html += '</div>';
	}

	presetDropdown.innerHTML = html;

	presetDropdown.querySelectorAll('.custom-select-option').forEach((opt) => {
		opt.addEventListener('click', () => {
			const name = (opt as HTMLElement).dataset.value!;
			applyPreset(name);
			closePresetDropdown();
		});
	});

	syncPresetSelect();
}

function applyPreset(name: string) {
	const allPresets = [...BUILT_IN_PRESETS, ...customPresets];
	const preset = allPresets.find((p) => p.name === name);
	if (!preset) return;
	eqGains = [...preset.gains];
	renderEqSliders();
	applyEq();
	presetLabel.textContent = name;
	presetDropdown.querySelectorAll('.custom-select-option').forEach((opt) => {
		opt.classList.toggle('active', (opt as HTMLElement).dataset.value === name);
	});
	showToast(`Preset: ${name}`);
}

async function saveNewPreset() {
	const name = prompt('Enter preset name:');
	if (!name || !name.trim()) return;
	const trimmed = name.trim();

	const exists = customPresets.findIndex((p) => p.name === trimmed);
	if (exists !== -1) {
		customPresets[exists].gains = [...eqGains];
	} else {
		customPresets.push({ name: trimmed, gains: [...eqGains] });
	}

	await saveCustomPresets();
	renderPresets();
	presetLabel.textContent = trimmed;
	showToast(`Saved: ${trimmed}`);
}

async function deleteCurrentPreset() {
	const name = presetLabel.textContent || '';
	const isCustom = customPresets.some((p) => p.name === name);
	if (!isCustom) {
		showToast('Cannot delete default presets');
		return;
	}

	customPresets = customPresets.filter((p) => p.name !== name);
	await saveCustomPresets();
	renderPresets();
	applyPreset('Flat');
	showToast(`Deleted: ${name}`);
}

// -- PEAK METER -- //

function startPeakMeter() {
	if (peakTimer) return;
	peakTimer = setInterval(async () => {
		const resp = await sendToContent<{ peak: number }>({ type: 'get-peak' });
		if (resp?.peak !== undefined) {
			peakBar.style.width = `${Math.min(100, resp.peak * 100)}%`;
		}
	}, PEAK_POLL_MS);
}

function stopPeakMeter() {
	if (peakTimer) {
		clearInterval(peakTimer);
		peakTimer = null;
	}
	peakBar.style.width = '0%';
}

// -- THEME -- //

function applyTheme(dark: boolean) {
	isDark = dark;
	document.body.classList.toggle('light', !dark);
	themeIcon.innerHTML = dark ? SUN_SVG : MOON_SVG;
	syncToolbarIcon();
}

function syncToolbarIcon() {
	const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	chrome.runtime.sendMessage({ type: 'set-icon-theme', isDark: sysDark });
}

async function loadTheme(): Promise<void> {
	return new Promise((resolve) => {
		chrome.storage.local.get('theme', (data) => {
			applyTheme(data.theme !== 'light');
			resolve();
		});
	});
}

// -- COLLAPSIBLE -- //

function setupToggle(toggle: HTMLButtonElement, body: HTMLDivElement, storageKey: string) {
	chrome.storage.local.get(storageKey, (data) => {
		if (data[storageKey]) {
			toggle.classList.add('open');
			body.classList.add('open');
			toggle.setAttribute('aria-expanded', 'true');
		}
	});
	toggle.addEventListener('click', () => {
		const isOpen = toggle.classList.toggle('open');
		body.classList.toggle('open');
		toggle.setAttribute('aria-expanded', String(isOpen));
		chrome.storage.local.set({ [storageKey]: isOpen });
	});
}

// -- EVENT LISTENERS -- //

function setupEventListeners() {
	volumeSlider.addEventListener('input', () => {
		const snapped = snapVolume(parseInt(volumeSlider.value));
		if (snapped !== parseInt(volumeSlider.value)) {
			volumeSlider.value = String(snapped);
		}
		setVolume(snapped);
	});

	muteBtn.addEventListener('click', toggleMute);
	resetBtn.addEventListener('click', () => setVolume(100));

	powerCheck.addEventListener('change', () => {
		togglePower(powerCheck.checked);
	});

	presetBtn.addEventListener('click', togglePresetDropdown);

	document.addEventListener('click', (e) => {
		if (!presetSelectWrap.contains(e.target as Node)) closePresetDropdown();
	});

	savePresetBtn.addEventListener('click', saveNewPreset);
	deletePresetBtn.addEventListener('click', deleteCurrentPreset);

	resetEqBtn.addEventListener('click', () => {
		eqGains = [0, 0, 0, 0, 0];
		renderEqSliders();
		applyEq();
		presetLabel.textContent = 'Flat';
		showToast('EQ reset to flat');
	});

	themeBtn.addEventListener('click', () => {
		applyTheme(!isDark);
		chrome.storage.local.set({ theme: isDark ? 'dark' : 'light' });
	});
}

// -- INIT -- //

async function init() {
	await loadTheme();
	await loadCustomPresets();
	renderPresets();
	renderEqSliders();
	setupToggle(eqToggle, eqBody, 'panelEq');
	setupEventListeners();

	const ok = await ensureInjected();
	if (ok) {
		const state = await sendToContent<{
			volume: number;
			muted: boolean;
			eqGains: number[];
			mediaCount: number;
			enabled: boolean;
		}>({ type: 'get-state' });

		if (state) {
			volume = state.volume ?? 100;
			muted = state.muted ?? false;
			enabled = state.enabled ?? true;
			eqGains = state.eqGains ?? [0, 0, 0, 0, 0];
			renderEqSliders();
			syncPresetSelect();

			powerCheck.checked = enabled;
			document.body.classList.toggle('off', !enabled);

			const count = state.mediaCount ?? 0;
			if (!enabled) {
				setStatus('off', 'OFF — booster disabled');
			} else if (count > 0) {
				setStatus('active', `${count} media source${count !== 1 ? 's' : ''} detected`);
			} else {
				setStatus('warning', 'No media detected — play audio first');
			}
		} else {
			setStatus('active', 'Ready');
		}

		updateVolumeUI();
		if (enabled) startPeakMeter();
	} else {
		setStatus('error', 'Cannot boost audio on this page');
		updateVolumeUI();
		powerCheck.disabled = true;
		document.body.classList.add('off');
	}
}

init();

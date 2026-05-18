// -- TYPES -- //

interface ColorEntry {
	hex: string;
	rgb: string;
	hsl: string;
	timestamp: number;
}

// -- CONSTANTS -- //

const MAX_HISTORY = 10;
const COPY_FEEDBACK_MS = 800;

const MOON_SVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
const SUN_SVG =
	'<circle cx="12" cy="12" r="5"/>' +
	'<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>' +
	'<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
	'<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>' +
	'<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

// -- DOM REFS -- //

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const pickBtn = $<HTMLButtonElement>('pickBtn');
const resultEl = $<HTMLDivElement>('result');
const swatchEl = $<HTMLDivElement>('swatch');
const hexDisplay = $<HTMLDivElement>('hexDisplay');
const hexValue = $<HTMLSpanElement>('hexValue');
const rgbValue = $<HTMLSpanElement>('rgbValue');
const hslValue = $<HTMLSpanElement>('hslValue');
const historyHeader = $<HTMLDivElement>('historyHeader');
const historyList = $<HTMLDivElement>('historyList');
const emptyState = $<HTMLDivElement>('emptyState');
const clearBtn = $<HTMLButtonElement>('clearBtn');
const unsupported = $<HTMLDivElement>('unsupported');
const mainEl = $<HTMLDivElement>('main');
const themeBtn = $<HTMLButtonElement>('themeBtn');
const themeIcon = $<SVGElement>('themeIcon');

const copyToast = $<HTMLDivElement>('copyToast');

const harmoniesSection = $<HTMLDivElement>('harmoniesSection');
const harmoniesToggle = $<HTMLButtonElement>('harmoniesToggle');
const harmoniesBody = $<HTMLDivElement>('harmoniesBody');
const contrastSection = $<HTMLDivElement>('contrastSection');
const contrastToggle = $<HTMLButtonElement>('contrastToggle');
const contrastBody = $<HTMLDivElement>('contrastBody');
const shadesSection = $<HTMLDivElement>('shadesSection');
const shadesToggle = $<HTMLButtonElement>('shadesToggle');
const shadesBody = $<HTMLDivElement>('shadesBody');
const cbSection = $<HTMLDivElement>('cbSection');
const cbToggle = $<HTMLButtonElement>('cbToggle');
const cbBody = $<HTMLDivElement>('cbBody');

// -- COLOR MATH -- //

function hexToRgb(hex: string): [number, number, number] {
	const h = hex.replace('#', '');
	return [
		parseInt(h.substring(0, 2), 16),
		parseInt(h.substring(2, 4), 16),
		parseInt(h.substring(4, 6), 16)
	];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	if (max === min) return [0, 0, Math.round(l * 100)];
	const d = max - min;
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let h = 0;
	if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
	else if (max === g) h = ((b - r) / d + 2) / 6;
	else h = ((r - g) / d + 4) / 6;
	return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
	h /= 360;
	s /= 100;
	l /= 100;
	if (s === 0) {
		const v = Math.round(l * 255);
		return [v, v, v];
	}
	const hue2rgb = (p: number, q: number, t: number) => {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	};
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	return [
		Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
		Math.round(hue2rgb(p, q, h) * 255),
		Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
	];
}

function rgbToHex(r: number, g: number, b: number): string {
	return (
		'#' +
		[r, g, b]
			.map((c) => {
				const hex = Math.max(0, Math.min(255, c)).toString(16);
				return hex.length === 1 ? '0' + hex : hex;
			})
			.join('')
			.toUpperCase()
	);
}

function hslToHex(h: number, s: number, l: number): string {
	const [r, g, b] = hslToRgb(h, s, l);
	return rgbToHex(r, g, b);
}

function relativeLuminance(r: number, g: number, b: number): number {
	const [rs, gs, bs] = [r, g, b].map((c) => {
		c /= 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
	const l1 = relativeLuminance(...rgb1);
	const l2 = relativeLuminance(...rgb2);
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}

// -- OKLCH CONVERSION -- //

function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
	const lr = r / 255, lg = g / 255, lb = b / 255;
	const rl = lr <= 0.04045 ? lr / 12.92 : Math.pow((lr + 0.055) / 1.055, 2.4);
	const gl = lg <= 0.04045 ? lg / 12.92 : Math.pow((lg + 0.055) / 1.055, 2.4);
	const bl = lb <= 0.04045 ? lb / 12.92 : Math.pow((lb + 0.055) / 1.055, 2.4);
	const l_ = Math.cbrt(0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl);
	const m_ = Math.cbrt(0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl);
	const s_ = Math.cbrt(0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl);
	const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
	const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
	const bv = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
	const C = Math.sqrt(a * a + bv * bv);
	let H = Math.atan2(bv, a) * 180 / Math.PI;
	if (H < 0) H += 360;
	return [Math.round(L * 1000) / 1000, Math.round(C * 1000) / 1000, Math.round(H * 10) / 10];
}

function formatOklch(L: number, C: number, H: number): string {
	return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})`;
}



// -- COLOR BLINDNESS SIMULATION (Machado et al. 2009, verified against Chromium source) -- //

function linearize(c: number): number {
	c /= 255;
	return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function delinearize(c: number): number {
	c = Math.max(0, Math.min(1, c));
	return c <= 0.0031308 ? Math.round(c * 12.92 * 255) : Math.round((1.055 * Math.pow(c, 1 / 2.4) - 0.055) * 255);
}

type SimMatrix = [number, number, number, number, number, number, number, number, number];

const PROTAN: SimMatrix = [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998];
const DEUTAN: SimMatrix = [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.011820, 0.042940, 0.968881];
const TRITAN: SimMatrix = [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.303900];

function simulateCB(r: number, g: number, b: number, m: SimMatrix): [number, number, number] {
	const rl = linearize(r), gl = linearize(g), bl = linearize(b);
	return [
		delinearize(m[0] * rl + m[1] * gl + m[2] * bl),
		delinearize(m[3] * rl + m[4] * gl + m[5] * bl),
		delinearize(m[6] * rl + m[7] * gl + m[8] * bl)
	];
}

function getColorBlindSims(hex: string) {
	const [r, g, b] = hexToRgb(hex);
	const p = simulateCB(r, g, b, PROTAN);
	const d = simulateCB(r, g, b, DEUTAN);
	const t = simulateCB(r, g, b, TRITAN);
	return {
		protanopia: { hex: rgbToHex(...p), label: 'Protanopia', desc: 'No red cones' },
		deuteranopia: { hex: rgbToHex(...d), label: 'Deuteranopia', desc: 'No green cones' },
		tritanopia: { hex: rgbToHex(...t), label: 'Tritanopia', desc: 'No blue cones' }
	};
}

// -- COLOR PARSING -- //

function parseColor(hex: string): { hex: string; rgb: string; hsl: string } {
	const upper = hex.toUpperCase();
	const [r, g, b] = hexToRgb(upper);
	const [h, s, l] = rgbToHsl(r, g, b);
	return {
		hex: upper,
		rgb: `rgb(${r}, ${g}, ${b})`,
		hsl: `hsl(${h}, ${s}%, ${l}%)`
	};
}

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

// -- HARMONY GENERATION -- //

function rotateHue(h: number, deg: number): number {
	return ((h + deg) % 360 + 360) % 360;
}

function getHarmonies(hex: string) {
	const [r, g, b] = hexToRgb(hex);
	const [h, s, l] = rgbToHsl(r, g, b);
	return {
		complementary: [hslToHex(rotateHue(h, 180), s, l)],
		analogous: [
			hslToHex(rotateHue(h, -30), s, l),
			hslToHex(rotateHue(h, -15), s, l),
			hslToHex(rotateHue(h, 15), s, l),
			hslToHex(rotateHue(h, 30), s, l)
		],
		triadic: [hslToHex(rotateHue(h, 120), s, l), hslToHex(rotateHue(h, 240), s, l)],
		splitComp: [hslToHex(rotateHue(h, 150), s, l), hslToHex(rotateHue(h, 210), s, l)]
	};
}

// -- SHADE GENERATION -- //

function getShades(hex: string): string[] {
	const [r, g, b] = hexToRgb(hex);
	const [h, s, l] = rgbToHsl(r, g, b);
	const steps = [];
	for (let i = 4; i >= 1; i--) {
		const nl = Math.min(100, l + i * 10);
		steps.push(hslToHex(h, s, nl));
	}
	steps.push(hex.toUpperCase());
	for (let i = 1; i <= 4; i++) {
		const nl = Math.max(0, l - i * 10);
		steps.push(hslToHex(h, s, nl));
	}
	return steps;
}

// -- CONTRAST CALC -- //

function getContrastInfo(hex: string) {
	const rgb = hexToRgb(hex);
	const white: [number, number, number] = [255, 255, 255];
	const black: [number, number, number] = [0, 0, 0];
	const vsWhite = contrastRatio(rgb, white);
	const vsBlack = contrastRatio(rgb, black);
	return {
		vsWhite: { ratio: vsWhite, aa: vsWhite >= 4.5, aaLarge: vsWhite >= 3, aaa: vsWhite >= 7 },
		vsBlack: { ratio: vsBlack, aa: vsBlack >= 4.5, aaLarge: vsBlack >= 3, aaa: vsBlack >= 7 }
	};
}

// -- UI: DISPLAY COLOR -- //

let currentHex = '';

function displayColor(entry: ColorEntry, animate = false) {
	currentHex = entry.hex;
	swatchEl.style.background = entry.hex;
	hexDisplay.textContent = entry.hex;

	const [r, g, b] = hexToRgb(entry.hex);
	const [oL, oC, oH] = rgbToOklch(r, g, b);

	hexValue.textContent = entry.hex;
	rgbValue.textContent = entry.rgb;
	hslValue.textContent = entry.hsl;

	const oklchEl = document.getElementById('oklchValue');
	if (oklchEl) oklchEl.textContent = formatOklch(oL, oC, oH);

	resultEl.classList.remove('hidden');

	if (animate) {
		resultEl.classList.remove('fade-in');
		void resultEl.offsetWidth;
		resultEl.classList.add('fade-in');
	}

	renderHarmonies(entry.hex);
	renderContrast(entry.hex);
	renderShades(entry.hex);
	renderColorBlindness(entry.hex);

	harmoniesSection.classList.remove('hidden');
	contrastSection.classList.remove('hidden');
	shadesSection.classList.remove('hidden');
	cbSection.classList.remove('hidden');
}

// -- UI: COPY -- //

let toastTimer: ReturnType<typeof setTimeout> | null = null;

function showCopyToast(value: string) {
	copyToast.textContent = `Copied ${value}`;
	copyToast.classList.add('show');
	if (toastTimer) clearTimeout(toastTimer);
	toastTimer = setTimeout(() => copyToast.classList.remove('show'), 1500);
}

async function writeClipboard(text: string) {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		const ta = document.createElement('textarea');
		ta.value = text;
		ta.style.position = 'fixed';
		ta.style.opacity = '0';
		document.body.appendChild(ta);
		ta.select();
		document.execCommand('copy');
		document.body.removeChild(ta);
	}
}

async function copyFormatValue(text: string, row: HTMLElement) {
	await writeClipboard(text);
	showCopyToast(text);
	row.classList.add('copied');
	setTimeout(() => row.classList.remove('copied'), COPY_FEEDBACK_MS);
}

async function copyHex(hex: string) {
	await writeClipboard(hex);
	showCopyToast(hex);
}

// -- UI: HARMONIES -- //

function renderHarmonies(hex: string) {
	const h = getHarmonies(hex);
	const group = (label: string, colors: string[]) => `
		<div class="harmony-group">
			<div class="harmony-label mono">${label}</div>
			<div class="harmony-swatches">
				<div class="harmony-swatch" style="background:${escapeHtml(hex)}" title="${escapeHtml(hex)}" data-hex="${escapeHtml(hex)}"></div>
				${colors.map((c) => `<div class="harmony-swatch" style="background:${escapeHtml(c)}" title="${escapeHtml(c)}" data-hex="${escapeHtml(c)}"></div>`).join('')}
			</div>
		</div>`;
	harmoniesBody.innerHTML =
		group('Complementary', h.complementary) +
		group('Analogous', h.analogous) +
		group('Triadic', h.triadic) +
		group('Split-complementary', h.splitComp);
}

// -- UI: SHADES -- //

function renderShades(hex: string) {
	const shades = getShades(hex);
	shadesBody.innerHTML = `
		<div class="shade-desc">Click any swatch to copy its hex value.</div>
		<div class="shade-strip">
			${shades.map((c, i) => `<button class="shade-swatch${i === 4 ? ' origin' : ''}" style="background:${escapeHtml(c)}" data-hex="${escapeHtml(c)}" title="${escapeHtml(c)}" aria-label="Copy ${escapeHtml(c)}"></button>`).join('')}
		</div>
		<div class="shade-labels"><span>Lighter</span><span>Original</span><span>Darker</span></div>`;
}

// -- UI: COLOR BLINDNESS -- //

function renderColorBlindness(hex: string) {
	const sims = getColorBlindSims(hex);
	cbBody.innerHTML = Object.values(sims).map((s) => `
		<div class="cb-row" data-hex="${escapeHtml(s.hex)}" role="button" tabindex="0" title="Click to copy ${escapeHtml(s.hex)}">
			<div class="cb-swatches">
				<div class="cb-swatch" style="background:${escapeHtml(hex)}"></div>
				<svg class="cb-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
				<div class="cb-swatch" style="background:${escapeHtml(s.hex)}"></div>
			</div>
			<div class="cb-info">
				<div class="cb-type">${s.label}</div>
				<div class="cb-desc">${s.desc} · ${escapeHtml(s.hex)}</div>
			</div>
		</div>`).join('');
}

// -- UI: TWO-COLOR CONTRAST -- //

let contrastFg = '';
let contrastBg = '#FFFFFF';

function renderContrast(hex: string) {
	contrastFg = hex;
	updateContrastDisplay();
}

function updateContrastDisplay() {
	if (!contrastFg) return;
	const fgRgb = hexToRgb(contrastFg);
	const bgRgb = hexToRgb(contrastBg);
	const ratio = contrastRatio(fgRgb, bgRgb);
	const aaNormal = ratio >= 4.5;
	const aaLarge = ratio >= 3;
	const aaaNormal = ratio >= 7;

	contrastBody.innerHTML = `
		<div class="contrast-2col">
			<div class="contrast-colors">
				<div class="contrast-slot">
					<label class="contrast-slot-label mono">Text</label>
					<div class="contrast-slot-swatch" style="background:${escapeHtml(contrastFg)}"></div>
					<input class="contrast-hex-input mono" id="contrastFgInput" value="${escapeHtml(contrastFg)}" maxlength="7" spellcheck="false">
				</div>
				<button class="contrast-swap" id="contrastSwap" aria-label="Swap colors" title="Swap">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16V4m0 12-4-4m4 4 4-4M17 8v12m0-12 4 4m-4-4-4 4"/></svg>
				</button>
				<div class="contrast-slot">
					<label class="contrast-slot-label mono">Background</label>
					<div class="contrast-slot-swatch" style="background:${escapeHtml(contrastBg)}"></div>
					<input class="contrast-hex-input mono" id="contrastBgInput" value="${escapeHtml(contrastBg)}" maxlength="7" spellcheck="false">
				</div>
			</div>
			<div class="contrast-result-preview" style="background:${escapeHtml(contrastBg)};color:${escapeHtml(contrastFg)}">
				<span style="font-size:14px;font-weight:700">Aa</span>
				<span style="font-size:11px">Sample text</span>
			</div>
			<div class="contrast-result-row">
				<div class="contrast-ratio mono">${ratio.toFixed(2)}:1</div>
				<div class="contrast-badges">
					<span class="badge ${aaNormal ? 'pass' : 'fail'}" title="Normal text ≥ 4.5:1">AA ${aaNormal ? '✓' : '✗'}</span>
					<span class="badge ${aaLarge ? 'pass' : 'fail'}" title="Large text ≥ 3:1">AA+</span>
					<span class="badge ${aaaNormal ? 'pass' : 'fail'}" title="Enhanced ≥ 7:1">AAA ${aaaNormal ? '✓' : '✗'}</span>
				</div>
			</div>
		</div>`;

	const fgInput = document.getElementById('contrastFgInput') as HTMLInputElement;
	const bgInput = document.getElementById('contrastBgInput') as HTMLInputElement;
	const swapBtn = document.getElementById('contrastSwap') as HTMLButtonElement;

	const handleInput = (input: HTMLInputElement, isFg: boolean) => {
		input.addEventListener('input', () => {
			let v = input.value.trim();
			if (!v.startsWith('#')) v = '#' + v;
			if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
				if (isFg) contrastFg = v.toUpperCase();
				else contrastBg = v.toUpperCase();
				updateContrastDisplay();
			}
		});
	};
	handleInput(fgInput, true);
	handleInput(bgInput, false);

	swapBtn.addEventListener('click', () => {
		const tmp = contrastFg;
		contrastFg = contrastBg;
		contrastBg = tmp;
		updateContrastDisplay();
	});
}

// -- UI: COLLAPSIBLE SECTIONS -- //

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

setupToggle(harmoniesToggle, harmoniesBody, 'panelHarmonies');
setupToggle(contrastToggle, contrastBody, 'panelContrast');
setupToggle(shadesToggle, shadesBody, 'panelShades');
setupToggle(cbToggle, cbBody, 'panelColorBlind');

// -- STORAGE -- //

async function loadHistory(): Promise<ColorEntry[]> {
	return new Promise((resolve) => {
		chrome.storage.local.get('colorHistory', (data) => {
			resolve(data.colorHistory || []);
		});
	});
}

async function saveHistory(history: ColorEntry[]) {
	return new Promise<void>((resolve) => {
		chrome.storage.local.set({ colorHistory: history }, resolve);
	});
}

async function addToHistory(entry: ColorEntry) {
	const history = await loadHistory();
	const existing = history.findIndex((h) => h.hex === entry.hex);
	if (existing !== -1) history.splice(existing, 1);
	history.unshift(entry);
	if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
	await saveHistory(history);
	renderHistory(history);
}

async function removeFromHistory(index: number) {
	const history = await loadHistory();
	history.splice(index, 1);
	await saveHistory(history);
	renderHistory(history);
}

async function clearHistory() {
	await saveHistory([]);
	renderHistory([]);
}

// -- UI: HISTORY -- //

let clearPending = false;
let clearTimer: ReturnType<typeof setTimeout> | null = null;

function handleClearClick() {
	if (clearPending) {
		if (clearTimer) clearTimeout(clearTimer);
		clearPending = false;
		clearBtn.textContent = 'Clear all';
		clearBtn.classList.remove('confirm');
		clearHistory();
		return;
	}
	clearPending = true;
	clearBtn.textContent = 'Confirm?';
	clearBtn.classList.add('confirm');
	clearTimer = setTimeout(() => {
		clearPending = false;
		clearBtn.textContent = 'Clear all';
		clearBtn.classList.remove('confirm');
	}, 3000);
}

function renderHistory(history: ColorEntry[]) {
	if (history.length === 0) {
		historyHeader.classList.add('hidden');
		historyList.innerHTML = '';
		emptyState.classList.remove('hidden');
		return;
	}
	emptyState.classList.add('hidden');
	historyHeader.classList.remove('hidden');
	historyList.innerHTML = history
		.map(
			(entry, i) => `
		<div class="history-item" role="button" tabindex="0" data-index="${i}" data-hex="${escapeHtml(entry.hex)}" aria-label="Copy ${escapeHtml(entry.hex)}">
			<div class="history-swatch" style="background:${escapeHtml(entry.hex)}"></div>
			<span class="history-hex mono">${escapeHtml(entry.hex)}</span>
			<button class="history-delete" data-delete="${i}" aria-label="Remove ${escapeHtml(entry.hex)}">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
			</button>
		</div>`
		)
		.join('');
}

function handleHistoryAction(target: HTMLElement) {
	const deleteBtn = target.closest('[data-delete]') as HTMLElement | null;
	if (deleteBtn) {
		removeFromHistory(parseInt(deleteBtn.dataset.delete!, 10));
		return;
	}
	const item = target.closest('.history-item') as HTMLElement | null;
	if (item) {
		const hex = item.dataset.hex!;
		const colors = parseColor(hex);
		displayColor({ ...colors, timestamp: Date.now() });
		copyHex(hex);
	}
}

historyList.addEventListener('click', (e) => {
	if ((e.target as HTMLElement).closest('[data-delete]')) e.stopPropagation();
	handleHistoryAction(e.target as HTMLElement);
});

historyList.addEventListener('keydown', (e) => {
	if (e.key === 'Enter' || e.key === ' ') {
		e.preventDefault();
		handleHistoryAction(e.target as HTMLElement);
	}
});

clearBtn.addEventListener('click', handleClearClick);

// -- FORMAT ROW COPY -- //

function handleFormatCopy(row: HTMLElement) {
	const format = row.dataset.format!;
	const el = document.getElementById(format + 'Value') || row.querySelector('.format-value');
	const value = el?.textContent || '';
	if (value) copyFormatValue(value, row);
}

document.querySelectorAll('.format-row').forEach((row) => {
	row.addEventListener('click', () => handleFormatCopy(row as HTMLElement));
	row.addEventListener('keydown', (e) => {
		if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
			e.preventDefault();
			handleFormatCopy(row as HTMLElement);
		}
	});
});

// -- SWATCH COPY (harmonies + shades + cb) -- //

document.addEventListener('click', (e) => {
	const swatch = (e.target as HTMLElement).closest(
		'.harmony-swatch, .shade-swatch'
	) as HTMLElement | null;
	if (swatch?.dataset.hex) {
		copyHex(swatch.dataset.hex);
		return;
	}
	const cbRow = (e.target as HTMLElement).closest('.cb-row') as HTMLElement | null;
	if (cbRow?.dataset.hex) {
		copyHex(cbRow.dataset.hex);
	}
});

// -- THEME -- //

let isDark = true;

function syncToolbarIcon() {
	const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	chrome.runtime.sendMessage({ type: 'set-icon-theme', isDark: sysDark });
}

function applyTheme(dark: boolean) {
	isDark = dark;
	document.body.classList.toggle('light', !dark);
	themeIcon.innerHTML = dark ? SUN_SVG : MOON_SVG;
	syncToolbarIcon();
}

async function loadTheme() {
	return new Promise<void>((resolve) => {
		chrome.storage.local.get('theme', (data) => {
			applyTheme(data.theme !== 'light');
			resolve();
		});
	});
}

themeBtn.addEventListener('click', () => {
	applyTheme(!isDark);
	chrome.storage.local.set({ theme: isDark ? 'dark' : 'light' });
});

// -- PICK FLOW -- //

const PICK_ICON =
	'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
	'<path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/>' +
	'<path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4"/>' +
	'</svg>';

function setPickingState(picking: boolean) {
	pickBtn.disabled = picking;
	document.body.classList.toggle('picking', picking);
	if (picking) {
		pickBtn.textContent = 'Click anywhere to pick…';
	} else {
		pickBtn.innerHTML = PICK_ICON + 'Pick Color';
	}
}

async function pickColor() {
	setPickingState(true);
	try {
		// @ts-expect-error EyeDropper API not in TS lib
		const dropper = new EyeDropper();
		const result = await dropper.open();
		const sRGBHex: string = result.sRGBHex;
		const colors = parseColor(sRGBHex);
		const entry: ColorEntry = { ...colors, timestamp: Date.now() };
		displayColor(entry, true);
		await addToHistory(entry);
		await writeClipboard(entry.hex);
		showCopyToast(entry.hex);
		chrome.runtime.sendMessage({ type: 'color-picked', hex: entry.hex });
	} catch (err: unknown) {
		if (err instanceof Error && err.name !== 'AbortError') {
			console.error('EyeDropper error:', err);
		}
	} finally {
		setPickingState(false);
	}
}

pickBtn.addEventListener('click', pickColor);

// -- INIT -- //

async function init() {
	await loadTheme();

	// @ts-expect-error EyeDropper API check
	if (typeof EyeDropper === 'undefined') {
		unsupported.classList.remove('hidden');
		mainEl.classList.add('hidden');
		return;
	}

	chrome.runtime.sendMessage({ type: 'badge-clear' });

	const history = await loadHistory();
	if (history.length > 0) {
		displayColor(history[0]);
	}
	renderHistory(history);
}

init();

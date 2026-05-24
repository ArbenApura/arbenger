// IMPORTED DEP-MODULES
import { writable } from 'svelte/store';

// -- TYPES -- //

export type EditorTab = 'html' | 'css' | 'js';
export type DevicePreset = 'mobile' | 'tablet' | 'desktop' | 'full';

// -- CONSTANTS -- //

const DEFAULT_HTML = `<h1>Hello, World!</h1>
<p>Start editing to see your changes live.</p>`;

const DEFAULT_CSS = `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  color: #1e293b;
  background: #ffffff;
}

h1 {
  color: #0891b2;
  margin-bottom: 0.5rem;
}

p {
  color: #475569;
  line-height: 1.6;
}`;

const DEFAULT_JS = `console.log('Hello from Arbenger HTML Editor!');`;

// -- STORES -- //

export const htmlCode = writable(DEFAULT_HTML);
export const cssCode = writable(DEFAULT_CSS);
export const jsCode = writable(DEFAULT_JS);
export const activeTab = writable<EditorTab>('html');
export const autoRun = writable(true);
export const showPreview = writable(true);
export const showConsole = writable(false);
export const devicePreset = writable<DevicePreset>('full');

// -- FUNCTIONS -- //

export function getActiveStore(tab: EditorTab) {
	switch (tab) {
		case 'html':
			return htmlCode;
		case 'css':
			return cssCode;
		case 'js':
			return jsCode;
	}
}

export function resetAll() {
	htmlCode.set(DEFAULT_HTML);
	cssCode.set(DEFAULT_CSS);
	jsCode.set(DEFAULT_JS);
}

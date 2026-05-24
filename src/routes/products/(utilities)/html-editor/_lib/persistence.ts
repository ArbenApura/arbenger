// IMPORTED MODULES
import { htmlCode, cssCode, jsCode } from './store';

// -- CONSTANTS -- //

const DB_NAME = 'arbenger-html-editor';
const STORE_NAME = 'editor-state';
const STATE_KEY = 'current';
const SAVE_DEBOUNCE = 1000;

// -- TYPES -- //

type EditorState = {
	html: string;
	css: string;
	js: string;
	savedAt: number;
};

// -- STATES -- //

let db: IDBDatabase | null = null;
let saveTimer: ReturnType<typeof setTimeout> | null = null;

// -- FUNCTIONS -- //

function openDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, 1);
		request.onupgradeneeded = () => {
			request.result.createObjectStore(STORE_NAME);
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

async function getDB(): Promise<IDBDatabase> {
	if (!db) db = await openDB();
	return db;
}

async function saveState(state: EditorState): Promise<void> {
	const database = await getDB();
	return new Promise((resolve, reject) => {
		const tx = database.transaction(STORE_NAME, 'readwrite');
		tx.objectStore(STORE_NAME).put(state, STATE_KEY);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
}

async function loadState(): Promise<EditorState | null> {
	const database = await getDB();
	return new Promise((resolve, reject) => {
		const tx = database.transaction(STORE_NAME, 'readonly');
		const request = tx.objectStore(STORE_NAME).get(STATE_KEY);
		request.onsuccess = () => resolve(request.result ?? null);
		request.onerror = () => reject(request.error);
	});
}

function scheduleSave(html: string, css: string, js: string) {
	if (saveTimer) clearTimeout(saveTimer);
	saveTimer = setTimeout(() => {
		saveState({ html, css, js, savedAt: Date.now() });
	}, SAVE_DEBOUNCE);
}

export async function initPersistence(): Promise<number | null> {
	try {
		const state = await loadState();
		if (state) {
			htmlCode.set(state.html);
			cssCode.set(state.css);
			jsCode.set(state.js);
		}

		const unsubHTML = htmlCode.subscribe((v) => {
			let c = '',
				j = '';
			cssCode.subscribe((val) => (c = val))();
			jsCode.subscribe((val) => (j = val))();
			scheduleSave(v, c, j);
		});

		const unsubCSS = cssCode.subscribe((v) => {
			let h = '',
				j = '';
			htmlCode.subscribe((val) => (h = val))();
			jsCode.subscribe((val) => (j = val))();
			scheduleSave(h, v, j);
		});

		const unsubJS = jsCode.subscribe((v) => {
			let h = '',
				c = '';
			htmlCode.subscribe((val) => (h = val))();
			cssCode.subscribe((val) => (c = val))();
			scheduleSave(h, c, v);
		});

		return state?.savedAt ?? null;
	} catch {
		return null;
	}
}

export function getLastSaved(): Promise<number | null> {
	return loadState().then((s) => s?.savedAt ?? null);
}

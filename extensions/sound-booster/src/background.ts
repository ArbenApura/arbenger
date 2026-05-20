// -- TYPES -- //

interface TabState {
	volume: number;
	muted: boolean;
	enabled: boolean;
	eqGains: number[];
}

// -- STATE -- //

const tabStates = new Map<number, TabState>();

const DEFAULT_STATE: TabState = { volume: 100, muted: false, enabled: true, eqGains: [0, 0, 0, 0, 0] };

function getTabState(tabId: number): TabState {
	return tabStates.get(tabId) ?? { ...DEFAULT_STATE, eqGains: [...DEFAULT_STATE.eqGains] };
}

// -- BADGE -- //

function updateBadge(tabId: number, state: TabState) {
	if (!state.enabled) {
		chrome.action.setBadgeText({ text: 'OFF', tabId });
		chrome.action.setBadgeBackgroundColor({ color: '#94A3B8', tabId });
	} else if (state.muted) {
		chrome.action.setBadgeText({ text: 'M', tabId });
		chrome.action.setBadgeBackgroundColor({ color: '#F87171', tabId });
	} else if (state.volume > 100) {
		const text = String(state.volume);
		chrome.action.setBadgeText({ text: text.length > 4 ? 'MAX' : text, tabId });
		chrome.action.setBadgeBackgroundColor({ color: '#22D3EE', tabId });
	} else {
		chrome.action.setBadgeText({ text: '', tabId });
	}
}

// -- CONTENT SCRIPT INJECTION -- //

async function ensureContentScript(tabId: number): Promise<boolean> {
	try {
		await chrome.tabs.sendMessage(tabId, { type: 'ping' });
		return true;
	} catch {
		try {
			await chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'] });
			return true;
		} catch {
			return false;
		}
	}
}

// -- MESSAGE HANDLER -- //

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
	if (msg.type === 'set-icon-theme') {
		setIconForTheme(msg.isDark);
		return;
	}

	if (msg.type === 'ensure-injected') {
		(async () => {
			const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
			if (!tab?.id) {
				sendResponse({ ok: false });
				return;
			}
			const ok = await ensureContentScript(tab.id);
			sendResponse({ ok, tabId: tab.id });
		})();
		return true;
	}

	if (msg.type === 'badge-update') {
		(async () => {
			const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
			if (!tab?.id) return;
			const state = getTabState(tab.id);
			if (msg.volume !== undefined) state.volume = msg.volume;
			if (msg.muted !== undefined) state.muted = msg.muted;
			if (msg.enabled !== undefined) state.enabled = msg.enabled;
			if (msg.eqGains) state.eqGains = msg.eqGains;
			tabStates.set(tab.id, state);
			updateBadge(tab.id, state);
			sendResponse({ ok: true });
		})();
		return true;
	}

	if (msg.type === 'get-tab-state') {
		(async () => {
			const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
			if (!tab?.id) {
				sendResponse(null);
				return;
			}
			sendResponse({ tabId: tab.id, state: getTabState(tab.id) });
		})();
		return true;
	}
});

// -- TAB CLEANUP -- //

chrome.tabs.onRemoved.addListener((tabId) => {
	tabStates.delete(tabId);
});

// -- KEYBOARD SHORTCUTS -- //

chrome.commands.onCommand.addListener(async (command) => {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	if (!tab?.id) return;

	const ok = await ensureContentScript(tab.id);
	if (!ok) return;

	const state = getTabState(tab.id);

	switch (command) {
		case 'volume-up': {
			state.volume = Math.min(600, state.volume + 10);
			tabStates.set(tab.id, state);
			chrome.tabs.sendMessage(tab.id, { type: 'set-volume', volume: state.volume });
			updateBadge(tab.id, state);
			break;
		}
		case 'volume-down': {
			state.volume = Math.max(0, state.volume - 10);
			tabStates.set(tab.id, state);
			chrome.tabs.sendMessage(tab.id, { type: 'set-volume', volume: state.volume });
			updateBadge(tab.id, state);
			break;
		}
		case 'toggle-mute': {
			state.muted = !state.muted;
			tabStates.set(tab.id, state);
			chrome.tabs.sendMessage(tab.id, { type: 'set-mute', muted: state.muted });
			updateBadge(tab.id, state);
			break;
		}
	}
});

// -- ICON THEME -- //

function setIconForTheme(isDark: boolean) {
	const suffix = isDark ? '-light' : '';
	chrome.action.setIcon({
		path: {
			16: `icons/icon${suffix}-16.png`,
			32: `icons/icon${suffix}-32.png`,
			48: `icons/icon${suffix}-48.png`,
			128: `icons/icon${suffix}-128.png`
		}
	});
}

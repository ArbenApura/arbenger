chrome.runtime.onMessage.addListener((msg) => {
	if (msg.type === 'color-picked' && msg.hex) {
		chrome.action.setBadgeText({ text: ' ' });
		chrome.action.setBadgeBackgroundColor({ color: msg.hex });
	}
	if (msg.type === 'badge-clear') {
		chrome.action.setBadgeText({ text: '' });
	}
	if (msg.type === 'set-icon-theme') {
		setIconForTheme(msg.isDark);
	}
});

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

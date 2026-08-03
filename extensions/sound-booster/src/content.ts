// -- TYPES -- //

interface ManagedMedia {
	element: HTMLMediaElement;
	context: AudioContext;
	source: MediaElementAudioSourceNode;
	gainNode: GainNode;
	eqNodes: BiquadFilterNode[];
	compressor: DynamicsCompressorNode;
	analyser: AnalyserNode;
}

// -- CONSTANTS -- //

const EQ_FREQUENCIES = [60, 230, 910, 4000, 14000];

// -- AUDIO MANAGER -- //

class AudioManager {
	private managed = new Map<HTMLMediaElement, ManagedMedia>();
	private volume = 100;
	private muted = false;
	private enabled = true;
	private eqGains = [0, 0, 0, 0, 0];
	private observer: MutationObserver | null = null;

	init() {
		this.scanForMedia();
		this.setupObserver();
	}

	private scanForMedia() {
		document.querySelectorAll<HTMLMediaElement>('audio, video').forEach((el) => this.captureElement(el));
	}

	private setupObserver() {
		this.observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				for (const node of mutation.addedNodes) {
					if (node instanceof HTMLMediaElement) {
						this.captureElement(node);
					}
					if (node instanceof HTMLElement) {
						node.querySelectorAll<HTMLMediaElement>('audio, video').forEach((el) => this.captureElement(el));
					}
				}
		for (const node of mutation.removedNodes) {
				if (node instanceof HTMLMediaElement) {
					if (!node.isConnected) this.releaseElement(node);
				}
				if (node instanceof HTMLElement) {
					node.querySelectorAll<HTMLMediaElement>('audio, video').forEach((el) => {
						if (!el.isConnected) this.releaseElement(el);
					});
				}
			}
			}
		});
		this.observer.observe(document.documentElement, { childList: true, subtree: true });
	}

	private captureElement(el: HTMLMediaElement) {
		if (this.managed.has(el)) return;

		try {
			const context = new AudioContext();
			const source = context.createMediaElementSource(el);

			const eqNodes: BiquadFilterNode[] = EQ_FREQUENCIES.map((freq, i) => {
				const filter = context.createBiquadFilter();
				filter.type = 'peaking';
				filter.frequency.value = freq;
				filter.Q.value = 1.4;
				filter.gain.value = this.enabled ? this.eqGains[i] : 0;
				return filter;
			});

			const gainNode = context.createGain();
			gainNode.gain.value = this.getEffectiveGain();

			const compressor = context.createDynamicsCompressor();
			compressor.threshold.value = -6;
			compressor.knee.value = 12;
			compressor.ratio.value = 4;
			compressor.attack.value = 0.003;
			compressor.release.value = 0.25;

			const analyser = context.createAnalyser();
			analyser.fftSize = 256;
			analyser.smoothingTimeConstant = 0.8;

			let prev: AudioNode = source;
			for (const eq of eqNodes) {
				prev.connect(eq);
				prev = eq;
			}
			prev.connect(gainNode);
			gainNode.connect(compressor);
			compressor.connect(analyser);
			analyser.connect(context.destination);

			if (context.state === 'suspended') {
				context.resume().catch(() => {});
				document.addEventListener('click', () => context.resume(), { once: true });
			}

			this.managed.set(el, { element: el, context, source, gainNode, eqNodes, compressor, analyser });
		} catch {
			// Element may already have a MediaElementSource, or CORS restriction
		}
	}

	private releaseElement(el: HTMLMediaElement) {
		const m = this.managed.get(el);
		if (!m) return;
		try {
			m.context.close();
		} catch {}
		this.managed.delete(el);
	}

	private getEffectiveGain(): number {
		if (!this.enabled) return 1;
		if (this.muted) return 0;
		return this.volume / 100;
	}

	private applyGainToAll() {
		const gain = this.getEffectiveGain();
		this.managed.forEach((m) => {
			m.gainNode.gain.value = gain;
		});
	}

	private applyEqToAll() {
		this.managed.forEach((m) => {
			m.eqNodes.forEach((eq, i) => {
				eq.gain.value = this.enabled ? (this.eqGains[i] ?? 0) : 0;
			});
		});
	}

	setEnabled(on: boolean) {
		this.enabled = on;
		this.applyGainToAll();
		this.applyEqToAll();
	}

	setVolume(pct: number) {
		this.volume = pct;
		this.applyGainToAll();
	}

	setMute(muted: boolean) {
		this.muted = muted;
		this.applyGainToAll();
	}

	setEq(gains: number[]) {
		this.eqGains = gains;
		this.applyEqToAll();
	}

	getPeakLevel(): number {
		let maxPeak = 0;
		this.managed.forEach((m) => {
			const data = new Uint8Array(m.analyser.frequencyBinCount);
			m.analyser.getByteFrequencyData(data);
			let peak = 0;
			for (let i = 0; i < data.length; i++) {
				if (data[i] > peak) peak = data[i];
			}
			const norm = peak / 255;
			if (norm > maxPeak) maxPeak = norm;
		});
		return maxPeak;
	}

	getState() {
		return {
			volume: this.volume,
			muted: this.muted,
			enabled: this.enabled,
			eqGains: [...this.eqGains],
			mediaCount: this.managed.size
		};
	}
}

// -- SINGLETON -- //

const manager = new AudioManager();
manager.init();

// -- MESSAGE HANDLER -- //

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
	switch (msg.type) {
		case 'ping':
			sendResponse({ ok: true });
			break;
		case 'get-state':
			sendResponse(manager.getState());
			break;
		case 'set-volume':
			manager.setVolume(msg.volume);
			sendResponse({ ok: true });
			break;
		case 'set-mute':
			manager.setMute(msg.muted);
			sendResponse({ ok: true });
			break;
		case 'set-eq':
			manager.setEq(msg.gains);
			sendResponse({ ok: true });
			break;
		case 'set-enabled':
			manager.setEnabled(msg.enabled);
			sendResponse({ ok: true });
			break;
		case 'get-peak':
			sendResponse({ peak: manager.getPeakLevel() });
			break;
		case 'init':
			if (msg.volume !== undefined) manager.setVolume(msg.volume);
			if (msg.muted !== undefined) manager.setMute(msg.muted);
			if (msg.gains) manager.setEq(msg.gains);
			if (msg.enabled !== undefined) manager.setEnabled(msg.enabled);
			sendResponse(manager.getState());
			break;
	}
	return true;
});

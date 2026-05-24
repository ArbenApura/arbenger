<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount, onDestroy } from 'svelte';
	import { EditorView, keymap, placeholder as cmPlaceholder } from '@codemirror/view';
	import { EditorState, Compartment } from '@codemirror/state';
	import { indentWithTab } from '@codemirror/commands';
	import { html } from '@codemirror/lang-html';
	import { css } from '@codemirror/lang-css';
	import { javascript } from '@codemirror/lang-javascript';
	import { lintGutter } from '@codemirror/lint';
	import { basicSetup } from 'codemirror';
	// IMPORTED MODULES
	import { isDark } from '$lib/stores/theme';
	import { arbengerDarkTheme, arbengerLightTheme } from '../_lib/codemirror-theme';
	import { getLinter } from '../_lib/linting';

	// -- REQUIRED PROPS -- //

	export let language: 'html' | 'css' | 'javascript' = 'html';
	export let value: string = '';
	export let onChange: (value: string) => void = () => {};

	// -- OPTIONAL PROPS -- //

	export let placeholder: string = '';

	// -- CONSTANTS -- //

	const themeCompartment = new Compartment();

	// -- STATES -- //

	let container: HTMLDivElement;
	let view: EditorView;
	let internalUpdate = false;

	// -- FUNCTIONS -- //

	function getLanguageExtension(lang: string) {
		switch (lang) {
			case 'html':
				return html();
			case 'css':
				return css();
			case 'javascript':
				return javascript();
			default:
				return html();
		}
	}

	function getTheme(dark: boolean) {
		return dark ? arbengerDarkTheme : arbengerLightTheme;
	}

	export function getView() {
		return view;
	}

	// -- REACTIVE STATEMENTS -- //

	$: if (view && !internalUpdate) {
		const currentDoc = view.state.doc.toString();
		if (value !== currentDoc) {
			view.dispatch({
				changes: { from: 0, to: currentDoc.length, insert: value },
			});
		}
	}

	$: if (view) {
		view.dispatch({
			effects: themeCompartment.reconfigure(getTheme($isDark)),
		});
	}

	// -- LIFECYCLES -- //

	onMount(() => {
		const extensions = [
			basicSetup,
			keymap.of([indentWithTab]),
			getLanguageExtension(language),
			getLinter(language),
			lintGutter(),
			themeCompartment.of(getTheme($isDark)),
			EditorView.updateListener.of((update) => {
				if (update.docChanged) {
					internalUpdate = true;
					value = update.state.doc.toString();
					onChange(value);
					internalUpdate = false;
				}
			}),
			EditorView.theme({
				'&': { height: '100%' },
				'.cm-scroller': { overflow: 'auto' },
			}),
		];

		if (placeholder) {
			extensions.push(cmPlaceholder(placeholder));
		}

		const state = EditorState.create({ doc: value, extensions });
		view = new EditorView({ state, parent: container });
	});

	onDestroy(() => {
		view?.destroy();
	});
</script>

<div bind:this={container} class="h-full overflow-hidden" />

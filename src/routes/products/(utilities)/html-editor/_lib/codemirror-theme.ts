// IMPORTED DEP-MODULES
import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

// -- CONSTANTS -- //

const FONT = "'JetBrains Mono', monospace";
const FONT_SIZE = '13px';

// -- FUNCTIONS -- //

export const arbengerDarkTheme = [
	EditorView.theme(
		{
			'&': {
				color: '#e2e8f0',
				backgroundColor: '#0B0A23',
			},
			'.cm-content': {
				caretColor: '#22D3EE',
				fontFamily: FONT,
				fontSize: FONT_SIZE,
			},
			'.cm-cursor, .cm-dropCursor': {
				borderLeftColor: '#22D3EE',
			},
			'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
				backgroundColor: '#1E1A5E',
			},
			'.cm-activeLine': {
				backgroundColor: '#1E1A5E40',
			},
			'.cm-gutters': {
				backgroundColor: '#0B0A23',
				color: '#475569',
				border: 'none',
			},
			'.cm-activeLineGutter': {
				color: '#22D3EE',
				backgroundColor: 'transparent',
			},
			'.cm-lineNumbers .cm-gutterElement': {
				padding: '0 8px 0 16px',
			},
			'.cm-foldPlaceholder': {
				backgroundColor: '#1E1A5E',
				color: '#22D3EE',
				border: 'none',
			},
		},
		{ dark: true }
	),
	syntaxHighlighting(
		HighlightStyle.define([
			{ tag: tags.keyword, color: '#c792ea' },
			{ tag: [tags.name, tags.deleted, tags.character, tags.macroName], color: '#e2e8f0' },
			{ tag: [tags.propertyName], color: '#22d3ee' },
			{ tag: [tags.function(tags.variableName), tags.labelName], color: '#82aaff' },
			{ tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: '#f78c6c' },
			{ tag: [tags.definition(tags.name), tags.separator], color: '#e2e8f0' },
			{ tag: [tags.className], color: '#ffcb6b' },
			{
				tag: [
					tags.number,
					tags.changed,
					tags.annotation,
					tags.modifier,
					tags.self,
					tags.namespace,
				],
				color: '#f78c6c',
			},
			{ tag: [tags.typeName], color: '#ffcb6b' },
			{ tag: [tags.operator, tags.operatorKeyword], color: '#89ddff' },
			{ tag: [tags.url, tags.escape, tags.regexp, tags.link], color: '#22d3ee' },
			{ tag: [tags.meta, tags.comment], color: '#546e7a' },
			{ tag: tags.strong, fontWeight: 'bold' },
			{ tag: tags.emphasis, fontStyle: 'italic' },
			{ tag: tags.strikethrough, textDecoration: 'line-through' },
			{ tag: tags.link, textDecoration: 'underline' },
			{ tag: tags.heading, fontWeight: 'bold', color: '#22d3ee' },
			{ tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: '#f78c6c' },
			{ tag: [tags.processingInstruction, tags.string, tags.inserted], color: '#c3e88d' },
			{ tag: tags.invalid, color: '#ff5370' },
			{ tag: tags.attributeName, color: '#ffcb6b' },
			{ tag: tags.attributeValue, color: '#c3e88d' },
			{ tag: tags.tagName, color: '#f07178' },
		])
	),
];

export const arbengerLightTheme = [
	EditorView.theme({
		'&': {
			color: '#0f172a',
			backgroundColor: '#ffffff',
		},
		'.cm-content': {
			caretColor: '#0891B2',
			fontFamily: FONT,
			fontSize: FONT_SIZE,
		},
		'.cm-cursor, .cm-dropCursor': {
			borderLeftColor: '#0891B2',
		},
		'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
			backgroundColor: '#e2e8f0',
		},
		'.cm-activeLine': {
			backgroundColor: '#f1f5f9',
		},
		'.cm-gutters': {
			backgroundColor: '#ffffff',
			color: '#94a3b8',
			border: 'none',
		},
		'.cm-activeLineGutter': {
			color: '#0891B2',
			backgroundColor: 'transparent',
		},
		'.cm-lineNumbers .cm-gutterElement': {
			padding: '0 8px 0 16px',
		},
		'.cm-foldPlaceholder': {
			backgroundColor: '#f1f5f9',
			color: '#0891B2',
			border: 'none',
		},
	}),
	syntaxHighlighting(
		HighlightStyle.define([
			{ tag: tags.keyword, color: '#7c3aed' },
			{ tag: [tags.name, tags.deleted, tags.character, tags.macroName], color: '#0f172a' },
			{ tag: [tags.propertyName], color: '#0891b2' },
			{ tag: [tags.function(tags.variableName), tags.labelName], color: '#2563eb' },
			{ tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: '#c2410c' },
			{ tag: [tags.definition(tags.name), tags.separator], color: '#0f172a' },
			{ tag: [tags.className], color: '#b45309' },
			{
				tag: [
					tags.number,
					tags.changed,
					tags.annotation,
					tags.modifier,
					tags.self,
					tags.namespace,
				],
				color: '#c2410c',
			},
			{ tag: [tags.typeName], color: '#b45309' },
			{ tag: [tags.operator, tags.operatorKeyword], color: '#0891b2' },
			{ tag: [tags.url, tags.escape, tags.regexp, tags.link], color: '#0891b2' },
			{ tag: [tags.meta, tags.comment], color: '#94a3b8' },
			{ tag: tags.strong, fontWeight: 'bold' },
			{ tag: tags.emphasis, fontStyle: 'italic' },
			{ tag: tags.strikethrough, textDecoration: 'line-through' },
			{ tag: tags.link, textDecoration: 'underline' },
			{ tag: tags.heading, fontWeight: 'bold', color: '#0891b2' },
			{ tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: '#c2410c' },
			{ tag: [tags.processingInstruction, tags.string, tags.inserted], color: '#16a34a' },
			{ tag: tags.invalid, color: '#ef4444' },
			{ tag: tags.attributeName, color: '#b45309' },
			{ tag: tags.attributeValue, color: '#16a34a' },
			{ tag: tags.tagName, color: '#e11d48' },
		])
	),
];

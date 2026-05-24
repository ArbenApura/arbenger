// IMPORTED DEP-MODULES
import { linter, type Diagnostic } from '@codemirror/lint';

// -- FUNCTIONS -- //

function htmlLinter() {
	return linter((view) => {
		const diagnostics: Diagnostic[] = [];
		const doc = view.state.doc.toString();

		const voidElements = new Set([
			'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
			'link', 'meta', 'param', 'source', 'track', 'wbr',
		]);

		const openTags: { tag: string; from: number; to: number }[] = [];
		const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\/?>/g;
		let match;

		while ((match = tagRegex.exec(doc)) !== null) {
			const full = match[0];
			const tagName = match[1].toLowerCase();
			const from = match.index;
			const to = from + full.length;

			if (full.startsWith('</')) {
				let lastOpen = -1;
				for (let i = openTags.length - 1; i >= 0; i--) {
					if (openTags[i].tag === tagName) {
						lastOpen = i;
						break;
					}
				}
				if (lastOpen === -1) {
					diagnostics.push({
						from,
						to,
						severity: 'error',
						message: `Closing tag </${tagName}> has no matching opening tag`,
					});
				} else {
					openTags.splice(lastOpen, 1);
				}
			} else if (!full.endsWith('/>') && !voidElements.has(tagName)) {
				openTags.push({ tag: tagName, from, to });
			}
		}

		for (const unclosed of openTags) {
			diagnostics.push({
				from: unclosed.from,
				to: unclosed.to,
				severity: 'warning',
				message: `Unclosed tag <${unclosed.tag}>`,
			});
		}

		return diagnostics;
	});
}

function cssLinter() {
	return linter((view) => {
		const diagnostics: Diagnostic[] = [];
		const doc = view.state.doc.toString();

		let braceDepth = 0;
		for (let i = 0; i < doc.length; i++) {
			if (doc[i] === '{') braceDepth++;
			if (doc[i] === '}') {
				braceDepth--;
				if (braceDepth < 0) {
					diagnostics.push({
						from: i,
						to: i + 1,
						severity: 'error',
						message: 'Unexpected closing brace',
					});
					braceDepth = 0;
				}
			}
		}

		if (braceDepth > 0) {
			const lastBrace = doc.lastIndexOf('{');
			if (lastBrace >= 0) {
				diagnostics.push({
					from: lastBrace,
					to: lastBrace + 1,
					severity: 'error',
					message: `${braceDepth} unclosed brace(s)`,
				});
			}
		}

		return diagnostics;
	});
}

function jsLinter() {
	return linter((view) => {
		const diagnostics: Diagnostic[] = [];
		const doc = view.state.doc.toString();

		if (!doc.trim()) return diagnostics;

		// Parse-only check via indirect eval in a try/catch — does NOT execute user code.
		// Function constructor parses but never calls the function.
		try {
			Function('"use strict";' + doc);
		} catch (e) {
			const msg = (e as SyntaxError).message;
			diagnostics.push({
				from: 0,
				to: Math.min(doc.length, 100),
				severity: 'error',
				message: msg,
			});
		}

		return diagnostics;
	});
}

export function getLinter(language: 'html' | 'css' | 'javascript') {
	switch (language) {
		case 'html':
			return htmlLinter();
		case 'css':
			return cssLinter();
		case 'javascript':
			return jsLinter();
	}
}

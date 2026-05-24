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
				const lastOpen = openTags.findLastIndex((t) => t.tag === tagName);
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
					const line = view.state.doc.lineAt(i);
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

		try {
			new Function(doc);
		} catch (e) {
			const msg = (e as SyntaxError).message;
			const lineMatch = msg.match(/line (\d+)/i);
			let from = 0;
			let to = doc.length;

			if (lineMatch) {
				const lineNum = parseInt(lineMatch[1], 10);
				const line = view.state.doc.line(Math.min(lineNum, view.state.doc.lines));
				from = line.from;
				to = line.to;
			}

			diagnostics.push({ from, to, severity: 'error', message: msg });
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

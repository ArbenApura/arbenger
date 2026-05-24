// IMPORTED TYPES
import type { Plugin } from 'prettier';

// -- TYPES -- //

type FormatResult = { formatted: string; error: null } | { formatted: null; error: string };

// -- STATES -- //

let prettierModule: typeof import('prettier/standalone') | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let plugins: Plugin<any>[] = [];

// -- FUNCTIONS -- //

async function loadPrettier() {
	if (prettierModule) return;
	const [prettier, html, css, babel, estree] = await Promise.all([
		import('prettier/standalone'),
		import('prettier/plugins/html'),
		import('prettier/plugins/postcss'),
		import('prettier/plugins/babel'),
		import('prettier/plugins/estree'),
	]);
	prettierModule = prettier;
	plugins = [html, css, babel, estree] as Plugin[];
}

export async function formatHTML(code: string): Promise<FormatResult> {
	try {
		await loadPrettier();
		const formatted = await prettierModule!.format(code, {
			parser: 'html',
			plugins,
			printWidth: 100,
			tabWidth: 2,
			useTabs: true,
		});
		return { formatted, error: null };
	} catch (e) {
		return { formatted: null, error: (e as Error).message };
	}
}

export async function formatCSS(code: string): Promise<FormatResult> {
	try {
		await loadPrettier();
		const formatted = await prettierModule!.format(code, {
			parser: 'css',
			plugins,
			printWidth: 100,
			tabWidth: 2,
			useTabs: true,
		});
		return { formatted, error: null };
	} catch (e) {
		return { formatted: null, error: (e as Error).message };
	}
}

export async function formatJS(code: string): Promise<FormatResult> {
	try {
		await loadPrettier();
		const formatted = await prettierModule!.format(code, {
			parser: 'babel',
			plugins,
			printWidth: 100,
			tabWidth: 2,
			useTabs: true,
			singleQuote: true,
			semi: true,
		});
		return { formatted, error: null };
	} catch (e) {
		return { formatted: null, error: (e as Error).message };
	}
}

export async function formatByLanguage(
	language: 'html' | 'css' | 'javascript',
	code: string
): Promise<FormatResult> {
	switch (language) {
		case 'html':
			return formatHTML(code);
		case 'css':
			return formatCSS(code);
		case 'javascript':
			return formatJS(code);
	}
}

export async function formatAll(
	h: string,
	c: string,
	j: string
): Promise<{ html: FormatResult; css: FormatResult; js: FormatResult }> {
	await loadPrettier();
	const [html, css, js] = await Promise.all([formatHTML(h), formatCSS(c), formatJS(j)]);
	return { html, css, js };
}

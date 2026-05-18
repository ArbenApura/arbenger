import { build, context } from 'esbuild';
import { cpSync, existsSync, mkdirSync } from 'fs';

const isWatch = process.argv.includes('--watch');

const buildOptions = {
	entryPoints: ['src/popup.ts', 'src/background.ts'],
	bundle: true,
	outdir: 'dist',
	format: 'iife',
	target: 'chrome95',
	minify: !isWatch
};

function copyPublic() {
	if (!existsSync('dist')) mkdirSync('dist', { recursive: true });
	cpSync('public', 'dist', { recursive: true });
}

copyPublic();

if (isWatch) {
	const ctx = await context(buildOptions);
	await ctx.watch();
	console.log('Watching for changes...');
} else {
	await build(buildOptions);
	console.log('Build complete.');
}

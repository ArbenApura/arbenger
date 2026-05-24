// IMPORTED DEP-MODULES
import JSZip from 'jszip';

// -- FUNCTIONS -- //

function buildStandaloneHTML(html: string, css: string, js: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Arbenger HTML Editor Export</title>
<style>
${css}
</style>
</head>
<body>
${html}
<script>
${js}
</script>
</body>
</html>`;
}

function triggerDownload(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export async function exportAsZip(html: string, css: string, js: string) {
	const zip = new JSZip();
	zip.file('index.html', buildStandaloneHTML(html, css, js));
	zip.file('style.css', css);
	zip.file('script.js', js);

	const blob = await zip.generateAsync({ type: 'blob' });
	triggerDownload(blob, 'html-editor-export.zip');
}

export function exportAsHTML(html: string, css: string, js: string) {
	const content = buildStandaloneHTML(html, css, js);
	const blob = new Blob([content], { type: 'text/html' });
	triggerDownload(blob, 'index.html');
}

// Render the live resume page to a print PDF via headless Chromium (Playwright).
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const url = process.env.RESUME_URL ?? 'http://localhost:8000/resume/';
const out = process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), 'out.pdf');

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  // Make sure the interactive site shell (navbar, footer, buttons) is excluded,
  // exactly as the @media print rules on the page intend.
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: out,
    printBackground: true,
    preferCSSPageSize: true, // honor @page { size: letter; margin: 0.5in } from app.css
  });
  console.log('wrote', out);
} finally {
  await browser.close();
}

import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const manifest = JSON.parse(readFileSync('dist/manifest.json', 'utf8'));
const version = manifest.version;
const filename = `color-picker-v${version}.zip`;

execSync(`powershell Compress-Archive -Path dist\\* -DestinationPath store\\${filename} -Force`);
console.log(`Packaged: store/${filename}`);

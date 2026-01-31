import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const distDir = './dist';
const outFile = './game.js';

const files = ['types.js', 'constants.js', 'state.js', 'game.js'];

let bundle = '';

for (const file of files) {
  const filePath = join(distDir, file);
  try {
    let content = readFileSync(filePath, 'utf-8');
    content = content.replace(/^export /gm, '');
    content = content.replace(/^import .+$/gm, '');
    bundle += content + '\n';
  } catch (e) {
    console.error(`Failed to read ${filePath}:`, e.message);
  }
}

writeFileSync(outFile, bundle);
console.log(`Bundle created: ${outFile}`);

/* Verifies every content script loads without errors and every
   registry section has registered content. Run: npm run check:content */
import fs from 'node:fs';
import vm from 'node:vm';

const ctx = vm.createContext({ console });

const html = fs.readFileSync('index.html', 'utf8');
const sectionScripts = [...html.matchAll(/src="(content\/sections\/[^"]+)"/g)].map((m) => m[1]);
const files = ['content/registry.js', 'content/legacy.js', ...sectionScripts];

let failed = false;

for (const f of files) {
  if (!fs.existsSync(f)) {
    console.error(`MISSING FILE (referenced in index.html): ${f}`);
    failed = true;
    continue;
  }
  try {
    vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
  } catch (e) {
    console.error(`LOAD ERROR in ${f}: ${e.message}`);
    failed = true;
  }
}

if (!failed) {
  const missing = vm.runInContext(
    'SECTIONS.filter(s => !SECTION_CONTENT[s.id]).map(s => s.id)',
    ctx
  );
  if (missing.length) {
    console.error(`Sections without content: ${missing.join(', ')}`);
    failed = true;
  } else {
    const total = vm.runInContext('SECTIONS.length', ctx);
    console.log(`OK — all ${total} sections load and have content.`);
  }
}

process.exit(failed ? 1 : 0);

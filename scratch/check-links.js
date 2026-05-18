#!/usr/bin/env node
/**
 * Link Checker — checks all internal href and src links in HTML files.
 * Exits with code 1 if broken links are found (used in CI).
 */

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
let broken = 0;
let checked = 0;

const htmlFiles = fs.readdirSync(docsDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const fullPath = path.join(docsDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');

  // Extract all href and src values
  const hrefMatches = [...content.matchAll(/href="([^"#]+)"/g)];
  const srcMatches = [...content.matchAll(/src="([^"]+)"/g)];
  const allLinks = [...hrefMatches, ...srcMatches].map(m => m[1]);

  for (const link of allLinks) {
    // Skip external links, data URIs, mailto, js
    if (link.startsWith('http') || link.startsWith('data:') || link.startsWith('mailto:') || link.startsWith('javascript:')) continue;

    const resolved = path.resolve(docsDir, link.split('?')[0]);
    checked++;
    if (!fs.existsSync(resolved)) {
      console.error(`❌ BROKEN: [${file}] → ${link}`);
      broken++;
    }
  }
});

console.log(`\n🔍 Checked ${checked} links across ${htmlFiles.length} HTML files.`);

if (broken > 0) {
  console.error(`\n❌ ${broken} broken link(s) found. Fix them before deploying!\n`);
  process.exit(1);
} else {
  console.log(`✅ All links are valid!\n`);
  process.exit(0);
}

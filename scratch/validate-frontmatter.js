#!/usr/bin/env node
/**
 * validate-frontmatter.js — Ensures all toolkit .md files (except READMEs)
 * have valid YAML front-matter. Exits 1 on failure (used in CI).
 */
const fs = require('fs');
const path = require('path');

const REQUIRED_FIELDS = ['title', 'category', 'applies_to', 'eu_ai_act_article', 'status', 'last_reviewed', 'version'];
const VALID_STATUSES = ['current', 'needs-review', 'outdated', 'draft'];
const VALID_CATEGORIES = ['starter', 'template', 'checklist', 'sector-pack', 'vendor', 'example', 'gpai', 'document'];

const toolkitDir = path.join(__dirname, '../toolkit');
let errors = 0;
let checked = 0;

function parseFrontMatter(content) {
  if (!content.startsWith('---')) return null;
  const end = content.indexOf('\n---', 3);
  if (end === -1) return null;
  const yaml = content.slice(3, end).trim();
  const result = {};
  for (const line of yaml.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
    result[key] = val;
  }
  return result;
}

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md') {
      checked++;
      const content = fs.readFileSync(fullPath, 'utf8');
      const rel = path.relative(process.cwd(), fullPath);
      const meta = parseFrontMatter(content);

      if (!meta) {
        console.error(`❌ MISSING front-matter: ${rel}`);
        errors++;
        continue;
      }

      for (const field of REQUIRED_FIELDS) {
        if (!meta[field]) {
          console.error(`❌ MISSING field "${field}": ${rel}`);
          errors++;
        }
      }

      if (meta.status && !VALID_STATUSES.includes(meta.status)) {
        console.error(`❌ INVALID status "${meta.status}" (must be one of: ${VALID_STATUSES.join(', ')}): ${rel}`);
        errors++;
      }

      if (meta.category && !VALID_CATEGORIES.includes(meta.category)) {
        console.error(`❌ INVALID category "${meta.category}" (must be one of: ${VALID_CATEGORIES.join(', ')}): ${rel}`);
        errors++;
      }
    }
  }
}

scanDir(toolkitDir);

console.log(`\n📋 Validated front-matter in ${checked} files.`);
if (errors > 0) {
  console.error(`❌ ${errors} error(s) found. Fix them before merging!\n`);
  process.exit(1);
} else {
  console.log(`✅ All front-matter is valid!\n`);
}

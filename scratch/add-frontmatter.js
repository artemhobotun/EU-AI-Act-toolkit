#!/usr/bin/env node
/**
 * add-frontmatter.js — Injects YAML front-matter into all toolkit Markdown files
 * that don't already have it, based on their folder and filename.
 */
const fs = require('fs');
const path = require('path');

const toolkitDir = path.join(__dirname, '../toolkit');

// Map folder names to metadata
const folderMeta = {
  'starter-pack':   { category: 'starter',      applies_to: ['All'],          status: 'current' },
  'templates':      { category: 'template',      applies_to: ['High-Risk', 'General'], status: 'current' },
  'checklists':     { category: 'checklist',     applies_to: ['All'],          status: 'current' },
  'sector-packs':   { category: 'sector-pack',   applies_to: ['Sector-Specific'], status: 'current' },
  'vendor-pack':    { category: 'vendor',        applies_to: ['Deployer', 'Provider'], status: 'current' },
  'examples':       { category: 'example',       applies_to: ['All'],          status: 'current' },
  'gpai-pack':      { category: 'gpai',          applies_to: ['GPAI'],         status: 'current' },
};

// Guess EU AI Act article reference from filename
function guessArticle(filename) {
  const name = filename.toLowerCase();
  if (name.includes('inventory') || name.includes('register')) return 'Article 11, 12';
  if (name.includes('risk') || name.includes('screening')) return 'Article 9';
  if (name.includes('vendor') || name.includes('procurement') || name.includes('due-diligence')) return 'Article 13, 25';
  if (name.includes('incident') || name.includes('log')) return 'Article 73';
  if (name.includes('transparency') || name.includes('disclosure')) return 'Article 13, 50';
  if (name.includes('literacy') || name.includes('training')) return 'Article 4';
  if (name.includes('policy') || name.includes('use-policy')) return 'Article 9, 29';
  if (name.includes('maintenance') || name.includes('monitoring')) return 'Article 72';
  if (name.includes('governance') || name.includes('management')) return 'Article 9';
  if (name.includes('human-oversight') || name.includes('oversight')) return 'Article 14';
  if (name.includes('gpai') || name.includes('general-purpose')) return 'Article 51–56';
  if (name.includes('technical') || name.includes('documentation')) return 'Article 11, Annex IV';
  if (name.includes('conformity')) return 'Article 43';
  if (name.includes('contract') || name.includes('agreement')) return 'Article 25, 26';
  if (name.includes('assessment')) return 'Article 9, 10';
  return 'General';
}

// Format filename into a nice title
function toTitle(filename) {
  return filename
    .replace('.md', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

let processed = 0;
let skipped = 0;

function processDir(dir, meta) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const childMeta = folderMeta[entry.name] || meta;
      processDir(fullPath, childMeta);
    } else if (entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md') {
      const content = fs.readFileSync(fullPath, 'utf8');

      // Skip if already has front-matter
      if (content.startsWith('---')) {
        skipped++;
        return;
      }

      const article = guessArticle(entry.name);
      const title = toTitle(entry.name);
      const folderKey = path.relative(toolkitDir, dir).split(path.sep)[0];
      const m = folderMeta[folderKey] || meta || { category: 'document', applies_to: ['All'], status: 'current' };

      const frontmatter = `---
title: "${title}"
category: "${m.category}"
applies_to: [${m.applies_to.map(x => `"${x}"`).join(', ')}]
eu_ai_act_article: "${article}"
status: "${m.status}"
last_reviewed: "2026-05"
version: "1.0"
---

`;

      fs.writeFileSync(fullPath, frontmatter + content, 'utf8');
      processed++;
    }
  }
}

processDir(toolkitDir, null);
console.log(`✅ Added front-matter to ${processed} files`);
console.log(`⏭  Skipped ${skipped} files (already had front-matter)`);

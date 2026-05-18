#!/usr/bin/env node
/**
 * build-versions.js — Generates docs/api/versions.json:
 * a snapshot of every template's current version, status, and article reference.
 * Also generates docs/api/summary.json for the status dashboard.
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const apiDir = path.join(rootDir, 'docs', 'api');
const toolkitDir = path.join(rootDir, 'toolkit');

if (!fs.existsSync(apiDir)) fs.mkdirSync(apiDir, { recursive: true });

function parseFrontMatter(content) {
  if (!content.startsWith('---')) return {};
  const end = content.indexOf('\n---', 3);
  if (end === -1) return {};
  const yaml = content.slice(3, end).trim();
  const result = {};
  for (const line of yaml.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    } else {
      val = val.replace(/^"|"$/g, '');
    }
    result[key] = val;
  }
  return result;
}

const versions = [];
const needsReview = [];
const outdated = [];

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) { scanDir(fullPath); continue; }
    if (!entry.name.endsWith('.md') || entry.name.toLowerCase() === 'readme.md') continue;

    const content = fs.readFileSync(fullPath, 'utf8');
    const meta = parseFrontMatter(content);
    const rel = path.relative(rootDir, fullPath);

    const record = {
      path: rel,
      title: meta.title || entry.name,
      version: meta.version || '1.0',
      status: meta.status || 'unknown',
      last_reviewed: meta.last_reviewed || null,
      category: meta.category || null,
      applies_to: meta.applies_to || [],
      eu_ai_act_article: meta.eu_ai_act_article || null,
      github_url: `https://github.com/artemhobotun/EU-AI-Act-Toolkit/blob/main/${rel}`
    };

    versions.push(record);
    if (meta.status === 'needs-review') needsReview.push(record.path);
    if (meta.status === 'outdated') outdated.push(record.path);
  }
}

scanDir(toolkitDir);

// Sort by path for consistency
versions.sort((a, b) => a.path.localeCompare(b.path));

fs.writeFileSync(path.join(apiDir, 'versions.json'), JSON.stringify({
  generated_at: new Date().toISOString(),
  total: versions.length,
  needs_review_count: needsReview.length,
  outdated_count: outdated.length,
  templates: versions
}, null, 2));

console.log(`✅ Generated api/versions.json — ${versions.length} templates tracked`);
if (needsReview.length) console.log(`⚠️  ${needsReview.length} template(s) need review`);
if (outdated.length) console.log(`❌  ${outdated.length} template(s) are outdated`);

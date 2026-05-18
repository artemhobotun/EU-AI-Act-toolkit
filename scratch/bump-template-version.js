#!/usr/bin/env node
/**
 * bump-template-version.js — Increments the version field in a template's front-matter.
 *
 * Usage:
 *   node scratch/bump-template-version.js <file-path> [patch|minor|major] [--reason "reason text"]
 *
 * Examples:
 *   node scratch/bump-template-version.js toolkit/templates/ai-use-policy-template.md patch --reason "Corrected Article reference"
 *   node scratch/bump-template-version.js toolkit/gpai-pack/systemic-risk-assessment.md minor
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const filePath = args[0];
const bumpType = args[1] || 'patch'; // patch | minor | major
const reasonIdx = args.indexOf('--reason');
const reason = reasonIdx !== -1 ? args[reasonIdx + 1] : 'Version bump';

if (!filePath) {
  console.error('Usage: node bump-template-version.js <file-path> [patch|minor|major] [--reason "text"]');
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), filePath);
if (!fs.existsSync(fullPath)) {
  console.error(`❌ File not found: ${fullPath}`);
  process.exit(1);
}

const content = fs.readFileSync(fullPath, 'utf8');
if (!content.startsWith('---')) {
  console.error('❌ File has no YAML front-matter');
  process.exit(1);
}

// Parse version
const versionMatch = content.match(/^version:\s*"?(\d+)\.(\d+)\.(\d+)"?/m);
if (!versionMatch) {
  console.error('❌ No version field found in front-matter');
  process.exit(1);
}

let [, major, minor, patch] = versionMatch.map(Number);
if (bumpType === 'major') { major++; minor = 0; patch = 0; }
else if (bumpType === 'minor') { minor++; patch = 0; }
else { patch++; }

const newVersion = `${major}.${minor}.${patch}`;
const today = new Date().toISOString().slice(0, 7); // YYYY-MM

// Update version and last_reviewed
let updated = content
  .replace(/^version:\s*"?[\d.]+?"?/m, `version: "${newVersion}"`)
  .replace(/^last_reviewed:\s*"?[\d-]+?"?/m, `last_reviewed: "${today}"`);

fs.writeFileSync(fullPath, updated, 'utf8');

// Log to TEMPLATE_CHANGELOG.md
const changelogPath = path.join(process.cwd(), 'docs', 'TEMPLATE_CHANGELOG.md');
const rel = path.relative(process.cwd(), fullPath);
const logEntry = `| ${today} | \`${rel}\` | ${bumpType} bump → **v${newVersion}** | ${reason} |\n`;

let changelog = '';
if (fs.existsSync(changelogPath)) {
  changelog = fs.readFileSync(changelogPath, 'utf8');
} else {
  changelog = `# Template Changelog\n\nTracks version changes to individual toolkit templates.\n\n| Date | Template | Change | Reason |\n|---|---|---|---|\n`;
}
// Insert after header row
const insertAfter = '|---|---|---|---|\n';
changelog = changelog.replace(insertAfter, insertAfter + logEntry);
fs.writeFileSync(changelogPath, changelog, 'utf8');

console.log(`✅ Bumped ${rel}: v${versionMatch[1]}.${versionMatch[2]}.${versionMatch[3]} → v${newVersion}`);
console.log(`📋 Logged to TEMPLATE_CHANGELOG.md`);

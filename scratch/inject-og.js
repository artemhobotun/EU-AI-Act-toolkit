#!/usr/bin/env node
/**
 * inject-og.js — Adds Open Graph meta tags to all HTML pages.
 */
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const baseUrl = 'https://artemhobotun.github.io/EU-AI-Act-Toolkit';
const defaultImage = `${baseUrl}/assets/og-image.svg`;

const pageMeta = {
  'index.html':           { title: 'AI Governance Dashboard — EU AI Act Toolkit', desc: 'Your EU AI Act readiness hub. Access templates, evaluate risks, and review compliance frameworks.' },
  'packs.html':           { title: 'Toolkit Packs — EU AI Act Toolkit', desc: 'Sector-specific compliance packs for Healthcare, Finance, HR, Marketing and more.' },
  'use-cases.html':       { title: 'Use Cases — EU AI Act Toolkit', desc: 'Real-world AI use case breakdowns mapped to EU AI Act obligations.' },
  'resources.html':       { title: 'Resources — EU AI Act Toolkit', desc: 'Curated legal resources, guides, and official EU documents for AI Act compliance.' },
  'roadmap.html':         { title: 'Compliance Roadmap — EU AI Act Toolkit', desc: 'Key EU AI Act enforcement milestones — 6, 12, 24 and 36 months.' },
  'wizard.html':          { title: 'Applicability Wizard — EU AI Act Toolkit', desc: 'Answer 5 questions to determine your EU AI Act obligations and risk category.' },
  'official-sources.html':{ title: 'Official EU Sources — EU AI Act Toolkit', desc: 'Direct links to official EU AI Act legal texts and regulatory guidance.' },
  'community.html':       { title: 'Community — EU AI Act Toolkit', desc: 'Join the community of practitioners building AI governance frameworks.' },
  'maintainer.html':      { title: 'Maintainer — EU AI Act Toolkit', desc: 'About Artem Hobotun — the creator and maintainer of the EU AI Act Toolkit.' },
  'quiz.html':            { title: 'Self-Check Quiz — EU AI Act Toolkit', desc: 'Quick self-assessment to gauge your EU AI Act readiness level.' },
  'changelog.html':       { title: 'Changelog — EU AI Act Toolkit', desc: 'Full version history of the EU AI Act Toolkit — every feature, fix and improvement.' },
};

const htmlFiles = fs.readdirSync(docsDir).filter(f => f.endsWith('.html'));
let updated = 0;

htmlFiles.forEach(file => {
  const fullPath = path.join(docsDir, file);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Skip if OG already injected
  if (content.includes('og:title')) return;

  const meta = pageMeta[file] || { title: 'EU AI Act Toolkit', desc: 'Practical compliance templates for real teams.' };
  const pageUrl = `${baseUrl}/${file}`;

  const ogBlock = `
  <!-- Open Graph / Social Cards -->
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${defaultImage}">
  <meta property="og:site_name" content="EU AI Act Toolkit">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.desc}">
  <meta name="twitter:image" content="${defaultImage}">`;

  // Inject before </head>
  content = content.replace('</head>', `${ogBlock}\n</head>`);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ OG tags → ${file}`);
  updated++;
});

console.log(`\n🎉 Added OG tags to ${updated} pages.`);

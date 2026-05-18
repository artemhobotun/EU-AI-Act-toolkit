const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const apiDir = path.join(rootDir, 'docs', 'api');
const mainJsPath = path.join(rootDir, 'docs', 'assets', 'main.js');

if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

// Parse YAML front-matter from a markdown string
function parseFrontMatter(content) {
  if (!content.startsWith('---')) return {};
  const end = content.indexOf('\n---', 3);
  if (end === -1) return {};
  const yaml = content.slice(3, end).trim();
  const result = {};
  for (const line of yaml.split('\n')) {
    const [key, ...rest] = line.split(':');
    if (!key) continue;
    let val = rest.join(':').trim();
    // Parse arrays like ["A", "B"]
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    } else {
      val = val.replace(/^"|"$/g, '');
    }
    result[key.trim()] = val;
  }
  return result;
}

// 1. Build Glossary API
function buildGlossaryApi() {
  if (fs.existsSync(mainJsPath)) {
    const mainJs = fs.readFileSync(mainJsPath, 'utf8');
    const match = mainJs.match(/const glossaryDict = ({[\s\S]*?});/);
    if (match && match[1]) {
      try {
        const glossaryDict = new Function('return ' + match[1])();
        fs.writeFileSync(path.join(apiDir, 'glossary.json'), JSON.stringify(glossaryDict, null, 2));
        console.log('✅ Generated api/glossary.json');
      } catch (e) {
        console.error('❌ Failed to parse glossaryDict:', e);
      }
    }
  }
}

// 2. Build Templates API (enriched with front-matter metadata)
function buildTemplatesApi() {
  const toolkitDir = path.join(rootDir, 'toolkit');
  const templates = [];

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    for (const file of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        scanDir(fullPath);
      } else if (file.endsWith('.md') && file.toLowerCase() !== 'readme.md') {
        const relativePath = path.relative(rootDir, fullPath);
        const content = fs.readFileSync(fullPath, 'utf8');
        const meta = parseFrontMatter(content);
        templates.push({
          id: file.replace('.md', ''),
          name: meta.title || file.replace(/-/g, ' ').replace('.md', ''),
          path: relativePath,
          category: meta.category || null,
          applies_to: meta.applies_to || [],
          eu_ai_act_article: meta.eu_ai_act_article || null,
          status: meta.status || 'unknown',
          version: meta.version || null,
          last_reviewed: meta.last_reviewed || null,
          github_url: `https://github.com/artemhobotun/EU-AI-Act-Toolkit/blob/main/${relativePath}`
        });
      }
    }
  }

  scanDir(toolkitDir);
  fs.writeFileSync(path.join(apiDir, 'templates.json'), JSON.stringify(templates, null, 2));
  console.log(`✅ Generated api/templates.json with ${templates.length} templates`);

  // Build category summary
  const byCategory = {};
  const byArticle = {};
  const byStatus = {};
  for (const t of templates) {
    const cat = t.category || 'uncategorized';
    byCategory[cat] = (byCategory[cat] || 0) + 1;
    const art = t.eu_ai_act_article || 'General';
    byArticle[art] = (byArticle[art] || 0) + 1;
    const st = t.status || 'unknown';
    byStatus[st] = (byStatus[st] || 0) + 1;
  }
  const summary = {
    total: templates.length,
    generated_at: new Date().toISOString(),
    by_category: byCategory,
    by_status: byStatus,
    by_article: byArticle
  };
  fs.writeFileSync(path.join(apiDir, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(`✅ Generated api/summary.json`);
}

buildGlossaryApi();
buildTemplatesApi();

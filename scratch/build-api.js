const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const apiDir = path.join(rootDir, 'docs', 'api');
const mainJsPath = path.join(rootDir, 'docs', 'assets', 'main.js');

// Ensure API directory exists
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

// 1. Build Glossary API
function buildGlossaryApi() {
  if (fs.existsSync(mainJsPath)) {
    const mainJs = fs.readFileSync(mainJsPath, 'utf8');
    // Extract the glossaryDict object using regex
    const match = mainJs.match(/const glossaryDict = ({[\s\S]*?});/);
    if (match && match[1]) {
      try {
        // Evaluate the object string
        const glossaryDict = new Function('return ' + match[1])();
        fs.writeFileSync(path.join(apiDir, 'glossary.json'), JSON.stringify(glossaryDict, null, 2));
        console.log('✅ Generated api/glossary.json');
      } catch (e) {
        console.error('❌ Failed to parse glossaryDict:', e);
      }
    }
  }
}

// 2. Build Templates API
function buildTemplatesApi() {
  const toolkitDir = path.join(rootDir, 'toolkit');
  const templates = [];

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (file.endsWith('.md') && file.toLowerCase() !== 'readme.md') {
        const relativePath = path.relative(rootDir, fullPath);
        templates.push({
          id: file.replace('.md', ''),
          name: file.replace(/-/g, ' ').replace('.md', ''),
          path: relativePath,
          github_url: `https://github.com/artemhobotun/EU-AI-Act-Toolkit/blob/main/${relativePath}`
        });
      }
    }
  }

  scanDir(toolkitDir);
  fs.writeFileSync(path.join(apiDir, 'templates.json'), JSON.stringify(templates, null, 2));
  console.log(`✅ Generated api/templates.json with ${templates.length} templates`);
}

buildGlossaryApi();
buildTemplatesApi();

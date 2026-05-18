const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const targetLink = `          <li><a href="business-quiz.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Industry Analyzer</a></li>`;

fs.readdirSync(docsDir).forEach(file => {
  if (!file.endsWith('.html')) return;
  if (file === 'business-quiz.html') return; // already has it

  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if link already exists
  if (content.includes('href="business-quiz.html"')) {
    console.log(`[Skip] ${file} already contains the link.`);
    return;
  }

  // Look for target navigation structure to insert
  const targetPattern = `<li><a href="quiz.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg> Readiness Self-Check</a></li>`;

  if (content.includes(targetPattern)) {
    const newPattern = `${targetPattern}\n${targetLink}`;
    content = content.replace(targetPattern, newPattern);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[Success] Updated ${file} navigation.`);
  } else {
    console.log(`[Warn] Could not find target pattern in ${file}.`);
  }
});

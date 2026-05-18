const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const htmlFiles = fs.readdirSync(docsDir).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match maintainer list item up to the end of sidebar-footer
  const regex = /(<li><a href="maintainer\.html"[\s\S]*?<\/a><\/li>\s*<\/ul>\s*<\/nav>)\s*(<\/div>)/;

  if (regex.test(content)) {
    const replacement = `$1\n      <div style="margin-top: var(--s-4); padding: 0 var(--s-3);">\n        <a href="https://doi.org/10.5281/zenodo.20277010" target="_blank" rel="noopener">\n          <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.20277010.svg" alt="DOI" style="max-width: 100%; border-radius: 4px; display: block; opacity: 0.85; transition: opacity 0.2s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.85">\n        </a>\n      </div>\n    $2`;
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Added DOI badge to sidebar of ${file}`);
  } else {
    console.log(`⚠️ Target block not found in ${file}`);
  }
});

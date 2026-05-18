const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const htmlFiles = fs.readdirSync(docsDir).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add footer to changelog.html if missing
  if (file === 'changelog.html' && !content.includes('class="simple-footer"')) {
    const target = '  </main>\n</div>';
    const replacement = `    <footer class="simple-footer">
      <div style="display: flex; justify-content: center; align-items: center; gap: var(--s-3); flex-wrap: wrap;">
        <p style="margin: 0;"><strong>EU AI Act Toolkit</strong> — Maintained by <a href="maintainer.html">Artem Nazarko</a>. Educational use only, not legal advice.</p>
        <span style="opacity: 0.4;">|</span>
        <a href="https://doi.org/10.5281/zenodo.20277010" target="_blank" rel="noopener" style="display: inline-flex; align-items: center;">
          <img src="https://img.shields.io/badge/DOI-10.5281%2Fzenodo.20277010-blue.svg" alt="DOI" style="height: 16px; opacity: 0.75; transition: opacity 0.2s; border-radius: 2px;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.75">
        </a>
      </div>
    </footer>
  </main>
</div>`;
    if (content.includes(target)) {
      content = content.replace(target, replacement);
      console.log(`✅ Added new inline footer to changelog.html`);
    }
  }

  // 2. Remove DOI from sidebar if present
  const sidebarRegex = /(<li><a href="maintainer\.html"[\s\S]*?<\/a><\/li>\s*<\/ul>\s*<\/nav>)\s*<div style="margin-top: var\(--s-4\); padding: 0 var\(--s-3\);">\s*<a href="https:\/\/doi\.org\/10\.5281\/zenodo\.20277010"[\s\S]*?<\/a>\s*<\/div>\s*(<\/div>)/;
  if (sidebarRegex.test(content)) {
    content = content.replace(sidebarRegex, '$1\n    $2');
    console.log(`✅ Removed DOI badge from sidebar in ${file}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

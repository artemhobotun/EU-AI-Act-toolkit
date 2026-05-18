const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const files = ['roadmap.html', 'wizard.html'];

const target = `  <footer class="simple-footer">
    <div class="container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
      <p><strong>EU AI Act Toolkit</strong> — Maintained by <a href="maintainer.html">Artem Nazarko</a>. Educational use only, not legal advice.</p>
    </div>
  </footer>`;

const replacement = `  <footer class="simple-footer">
    <div class="container" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px;">
      <p><strong>EU AI Act Toolkit</strong> — Maintained by <a href="maintainer.html">Artem Nazarko</a>. Educational use only, not legal advice.</p>
      <a href="https://doi.org/10.5281/zenodo.20277010" target="_blank" rel="noopener">
        <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.20277010.svg" alt="DOI" style="max-height: 20px; opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.8">
      </a>
    </div>
  </footer>`;

files.forEach(file => {
  const filePath = path.join(docsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(target)) {
      content = content.replace(target, replacement);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Added DOI badge to footer of ${file}`);
    } else {
      console.log(`⚠️ Target block not found in ${file}`);
    }
  }
});

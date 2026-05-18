const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.html'));

const footerHTML = `
    <footer style="margin-top: var(--s-20); padding-top: var(--s-6); border-top: 1px solid var(--border); text-align: center; color: var(--text-faint); font-size: var(--text-xs);">
      <p><strong>EU AI Act Toolkit</strong> — Maintained by <a href="maintainer.html">Artem Nazarko</a>. Educational use only, not legal advice.</p>
    </footer>
`;

for (const file of files) {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove existing footer if present to avoid duplicates
  content = content.replace(/<footer[\s\S]*?<\/footer>\s*/g, '');
  
  // Insert footer right before </main>
  content = content.replace('</main>', `${footerHTML}\n  </main>`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated footer in ${file}`);
}

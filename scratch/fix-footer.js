const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const regex = /<footer style="margin-top: var\(--s-20\); padding-top: var\(--s-6\); border-top: 1px solid var\(--border\); text-align: center; color: var\(--text-faint\); font-size: var\(--text-xs\);">/g;
      const newContent = content.replace(regex, '<footer class="simple-footer">');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Fixed footer in:', fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, '../docs'));

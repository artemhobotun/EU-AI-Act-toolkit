const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.html'));

const repoBase = "https://github.com/artemhobotun/EU-AI-Act-Toolkit/blob/main/";

let changes = 0;

for (const file of files) {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find all links
  const hrefRegex = /href="([^"]+)"/g;
  let newContent = content;
  
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const url = match[1];
    
    // Check if it's a relative path that looks like it's pointing to a repo file 
    // e.g. ../toolkit/..., toolkit/..., guide/...
    if (!url.startsWith('http') && !url.startsWith('#') && !url.endsWith('.html') && !url.startsWith('assets/') && !url.startsWith('data:')) {
        // We have a relative path to a non-html file
        // Convert to absolute GitHub URL
        let cleanUrl = url.replace(/^\.\.\//, '');
        if (cleanUrl.startsWith('/')) cleanUrl = cleanUrl.substring(1);
        
        const newUrl = repoBase + cleanUrl;
        newContent = newContent.replace(`href="${url}"`, `href="${newUrl}"`);
        changes++;
        console.log(`Replaced in ${file}: ${url} -> ${newUrl}`);
    }
  }
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
  }
}

console.log(`Made ${changes} link replacements.`);

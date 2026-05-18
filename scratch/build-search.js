const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.html'));

const index = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
  
  // Extract Title
  let title = file;
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  if (titleMatch) {
    title = titleMatch[1].replace('EU AI Act Toolkit — ', '');
  }

  // Extract clean text content
  let text = content
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  index.push({
    title,
    url: file,
    content: text
  });
});

fs.writeFileSync(path.join(docsDir, 'search-index.json'), JSON.stringify(index, null, 2));
console.log(`Generated search-index.json with ${index.length} entries.`);

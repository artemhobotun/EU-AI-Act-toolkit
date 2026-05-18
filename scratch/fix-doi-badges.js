const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const htmlFiles = fs.readdirSync(docsDir).filter(file => file.endsWith('.html'));

const oldSvg = 'https://zenodo.org/badge/DOI/10.5281/zenodo.20277010.svg';
const newSvg = 'https://img.shields.io/badge/DOI-10.5281%2Fzenodo.20277010-blue.svg';

htmlFiles.forEach(file => {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(oldSvg)) {
    content = content.replaceAll(oldSvg, newSvg);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed DOI badge SVG in ${file}`);
  }
});

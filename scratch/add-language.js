const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.html'));

const langHtml = `<select style="background:transparent; border:none; color:inherit; font-weight:600; font-size:13px; cursor:pointer; outline:none; appearance:none;">
          <option>EN ▾</option>
          <option disabled>FR (Soon)</option>
          <option disabled>DE (Soon)</option>
        </select>`;

files.forEach(file => {
  const fullPath = path.join(docsDir, file);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Inject before the theme-toggle button
  if (!content.includes('<option>EN ▾</option>')) {
    content = content.replace(
      '<button id="theme-toggle"',
      `${langHtml}\n        <button id="theme-toggle"`
    );
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Added language switcher to', file);
  }
});

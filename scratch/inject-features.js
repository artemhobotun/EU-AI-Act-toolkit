const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const htmlFiles = fs.readdirSync(docsDir).filter(f => f.endsWith('.html'));

const searchModalHtml = `
  <!-- Search Modal -->
  <div id="search-modal">
    <div class="search-modal-content">
      <div class="search-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="search-input" placeholder="Search templates, guidelines, terms... (Cmd+K)" autocomplete="off">
      </div>
      <div id="search-results" class="search-results"></div>
    </div>
  </div>
`;

for (const file of htmlFiles) {
  const fullPath = path.join(docsDir, file);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Inject Script and Modal before </body>
  if (!content.includes('assets/main.js')) {
    content = content.replace('</body>', `${searchModalHtml}\n  <script src="assets/main.js"></script>\n</body>`);
  }

  // Inject Theme Toggle and Search Button in Header
  if (!content.includes('id="search-btn"')) {
    // Find <nav class="nav-links"> or similar, but the user has <div class="header-right"> or just <nav> in index.html?
    // Let's check how headers are structured. We might just inject it before the last </div> in <header class="site-header">
    const headerReplacement = `
      <div style="display: flex; gap: 16px; align-items: center; margin-left: 24px;">
        <button id="search-btn" class="btn btn-outline" style="padding: 6px 12px; font-size: 13px; gap: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          Search <span style="opacity: 0.5; font-size: 11px;">Cmd+K</span>
        </button>
        <button id="theme-toggle" style="background:none; border:none; color:inherit; cursor:pointer; padding:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>
      </div>
    </header>`;
    content = content.replace('</header>', headerReplacement);
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Injected features into ${file}`);
}

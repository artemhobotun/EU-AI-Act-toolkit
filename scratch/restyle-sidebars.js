const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const htmlFiles = fs.readdirSync(docsDir).filter(f => f.endsWith('.html'));

const newSidebar = `  <aside class="sidebar">
    <a href="index.html" class="logo">🇪🇺 EU AI Act Toolkit</a>
    
    <div class="nav-section">
      <div class="nav-section-title">Core Actions</div>
      <nav>
        <ul>
          <li><a href="index.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Dashboard</a></li>
          <li><a href="packs.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg> Toolkit Packs</a></li>
          <li><a href="use-cases.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> Use Cases</a></li>
          <li><a href="resources.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg> Resources</a></li>
        </ul>
      </nav>
    </div>

    <div class="nav-section">
      <div class="nav-section-title">Interactive Tools</div>
      <nav>
        <ul>
          <li><a href="quiz.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg> Readiness Self-Check</a></li>
          <li><a href="wizard.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><circle cx="12" cy="12" r="10"></circle><path d="m10 15 5-3-5-3v6Z"></path></svg> Risk Decision Tree</a></li>
        </ul>
      </nav>
    </div>

    <div class="sidebar-footer">
      <div class="nav-section-title">Support & Info</div>
      <nav>
        <ul>
          <li><a href="official-sources.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg> EU Sources</a></li>
          <li><a href="community.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Community</a></li>
          <li><a href="roadmap.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path></svg> Roadmap</a></li>
        </ul>
      </nav>
    </div>
  </aside>`;

const newHeaderNav = `    <nav class="nav-links">
      <a href="index.html">Dashboard</a>
      <a href="packs.html">Sector Packs</a>
      <a href="quiz.html">Readiness Check</a>
      <a href="wizard.html">Decision Tree</a>
      <a href="roadmap.html">Roadmap</a>
      <a href="resources.html">Resources</a>
    </nav>`;

htmlFiles.forEach(file => {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace sidebar
  const sidebarRegex = /<aside class="sidebar">([\s\S]*?)<\/aside>/;
  if (sidebarRegex.test(content)) {
    content = content.replace(sidebarRegex, newSidebar);
    console.log(`Updated Sidebar: [${file}]`);
  }

  // Replace header nav
  const headerNavRegex = /<nav class="nav-links">([\s\S]*?)<\/nav>/;
  if (headerNavRegex.test(content)) {
    content = content.replace(headerNavRegex, newHeaderNav);
    console.log(`Updated Header Nav: [${file}]`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Done standardizing all navigations!');

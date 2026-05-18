/**
 * EU AI Act Toolkit - Main JS
 * Handles Search, Dark Mode, and Glossary Tooltips
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSearch();
  initGlossary();
});

/* --- Theme Toggle --- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleBtn.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* --- Global Search Modal (Cmd+K) --- */
let searchIndex = [];

async function initSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchBtn || !searchModal || !searchInput) return;

  // Toggle modal
  function toggleModal(show) {
    if (show) {
      searchModal.classList.add('active');
      searchInput.focus();
      if (searchIndex.length === 0) fetchSearchIndex();
    } else {
      searchModal.classList.remove('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
    }
  }

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleModal(true);
  });

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) toggleModal(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      toggleModal(false);
    }
    // Cmd+K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      toggleModal(!searchModal.classList.contains('active'));
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    const results = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.content.toLowerCase().includes(query)
    );

    renderSearchResults(results, query);
  });

  async function fetchSearchIndex() {
    try {
      const res = await fetch('search-index.json');
      searchIndex = await res.json();
    } catch (e) {
      console.error('Failed to load search index:', e);
    }
  }

  function renderSearchResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = `<div class="search-empty">No results found for "${query}"</div>`;
      return;
    }

    searchResults.innerHTML = results.slice(0, 8).map(r => `
      <a href="${r.url}" class="search-result-item">
        <div class="search-result-title">${r.title}</div>
        <div class="search-result-excerpt">${getExcerpt(r.content, query)}</div>
      </a>
    `).join('');
  }

  function getExcerpt(content, query) {
    const idx = content.toLowerCase().indexOf(query);
    if (idx === -1) return content.substring(0, 100) + '...';
    const start = Math.max(0, idx - 40);
    const end = Math.min(content.length, idx + query.length + 40);
    return (start > 0 ? '...' : '') + content.substring(start, end) + '...';
  }
}

/* --- Glossary Tooltips --- */
const glossaryDict = {
  'GPAI': 'General-Purpose AI. An AI model capable of competently performing a wide range of distinct tasks.',
  'High-Risk': 'AI systems posing significant risks to health, safety, or fundamental rights, subject to strict obligations.',
  'Provider': 'A natural or legal person developing an AI system and putting it into service under their own name/trademark.',
  'Deployer': 'Any person using an AI system under their authority in a professional context.',
  'Prohibited': 'AI practices that are completely banned because they pose unacceptable risks (e.g., social scoring).'
};

function initGlossary() {
  // Only apply to paragraphs within the main content area
  const contentAreas = document.querySelectorAll('.card, .doc-body, .checklist-items');
  if (!contentAreas.length) return;

  const terms = Object.keys(glossaryDict);
  // Match whole words only
  const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'g');

  contentAreas.forEach(area => {
    // Only process text nodes inside p, li
    const walker = document.createTreeWalker(area, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
      // Avoid replacing inside links, headings, or already processed tooltips
      const parentName = node.parentNode.nodeName.toLowerCase();
      if (parentName === 'a' || parentName === 'h1' || parentName === 'h2' || parentName === 'h3' || node.parentNode.classList.contains('glossary-term')) {
        return;
      }

      if (regex.test(node.nodeValue)) {
        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        let match;
        
        // Reset regex state
        regex.lastIndex = 0;
        
        while ((match = regex.exec(node.nodeValue)) !== null) {
          // Push preceding text
          frag.appendChild(document.createTextNode(node.nodeValue.substring(lastIndex, match.index)));
          
          // Create tooltip span
          const term = match[1];
          const span = document.createElement('span');
          span.className = 'glossary-term';
          span.textContent = term;
          
          const tooltip = document.createElement('div');
          tooltip.className = 'tooltip-box';
          tooltip.textContent = glossaryDict[term];
          span.appendChild(tooltip);
          
          frag.appendChild(span);
          lastIndex = regex.lastIndex;
        }
        
        frag.appendChild(document.createTextNode(node.nodeValue.substring(lastIndex)));
        node.parentNode.replaceChild(frag, node);
      }
    });
  });
}

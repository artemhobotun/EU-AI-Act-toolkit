// EU AI Act Toolkit Pages Interactivity
// Handles quiz scoring, result recommendations, animations, and navigation state

(function() {
  'use strict';

  // ── 10-Question Governance Self-Check (LocalStorage & State Restore) ──
  const selfCheckQuestions = [
    {
      category: '🤖 AI Tool Use',
      text: 'How does your organisation primarily use AI systems?',
      options: [
        { label: 'We develop our own custom models or significantly modify open-source models (GPAI)', score: 3 },
        { label: 'We procure third-party AI software for high-impact decisions (CV screening, credit scoring)', score: 6 },
        { label: 'We use general productivity AI tools (ChatGPT, Claude, Copilot) for day-to-day office tasks', score: 10 },
        { label: 'We do not currently use or plan to use any AI tools', score: 10 }
      ]
    },
    {
      category: '📦 Vendor Procurement',
      text: 'Do you have a structured process for screening third-party AI vendors?',
      options: [
        { label: 'Yes, we require vendors to show technical documentation and compliance proof', score: 10 },
        { label: 'Partially, we ask basic security/privacy questions but lack AI-specific checks', score: 6 },
        { label: 'No, employees can sign up and use AI tools freely without oversight', score: 2 }
      ]
    },
    {
      category: '🔒 Data & Privacy',
      text: 'Are your AI systems processing personal data or sensitive customer/employee information?',
      options: [
        { label: 'No personal or customer data is shared with or processed by AI systems', score: 10 },
        { label: 'Yes, but we use strict anonymisation and operate on-premise/isolated networks', score: 8 },
        { label: 'Yes, personal data is sent directly to external cloud API endpoints', score: 4 }
      ]
    },
    {
      category: '👁 Human Oversight',
      text: 'Who has ultimate decision-making authority over the AI outputs?',
      options: [
        { label: 'All AI outputs are strictly reviewed and approved by trained staff before taking action', score: 10 },
        { label: 'Outputs are reviewed occasionally; most recommendations are accepted by default', score: 5 },
        { label: 'The AI takes automated action without any human-in-the-loop review', score: 1 }
      ]
    },
    {
      category: '📋 Governance Docs',
      text: 'Do you maintain an active internal registry (inventory) of all AI systems used in your firm?',
      options: [
        { label: 'Yes, we have a fully mapped, up-to-date registry of all AI tools and their use cases', score: 10 },
        { label: 'We have an informal list, but it does not detail risks or compliance parameters', score: 5 },
        { label: 'No, we do not track what AI systems are used across departments', score: 1 }
      ]
    },
    {
      category: '⚠️ Risk Domains',
      text: 'Do any of your AI tools fall into high-risk domains like recruitment, education, or access to credit?',
      options: [
        { label: 'No, none of our systems operate in these areas', score: 10 },
        { label: 'Yes, but they are strictly helper tools (not primary decision makers)', score: 6 },
        { label: 'Yes, they are core tools used to rank CVs, grade students, or evaluate creditworthiness', score: 2 }
      ]
    },
    {
      category: '⚖️ Legal & Copyright',
      text: 'If you develop AI models, do you respect EU copyright law and document your training datasets?',
      options: [
        { label: 'We do not build/train AI models (only use existing tools)', score: 10 },
        { label: 'Yes, we strictly verify data sources and training documentation complies with EU laws', score: 10 },
        { label: 'No, we scrape training data without clear documentation of copyright compliance', score: 2 }
      ]
    },
    {
      category: '🎓 Staff Training',
      text: 'Are your employees trained on basic AI safety, bias mitigation, and tool limitations?',
      options: [
        { label: 'Yes, all staff using AI receive mandatory training and guidance materials', score: 10 },
        { label: 'We have basic guidelines, but no structured training has been conducted', score: 5 },
        { label: 'No training or guidelines have been provided to staff', score: 1 }
      ]
    },
    {
      category: '📊 Performance Monitoring',
      text: 'How frequently do you audit your AI outputs for bias, inaccuracies, or drift?',
      options: [
        { label: 'We perform regular, documented checks and maintain feedback loops', score: 10 },
        { label: 'We review performance only when issues or customer complaints arise', score: 4 },
        { label: 'We do not monitor the accuracy or bias of AI outputs', score: 1 }
      ]
    },
    {
      category: '⚙️ Incident Logging',
      text: 'Do you have a clear policy and process for logging and reporting AI incidents or failures?',
      options: [
        { label: 'Yes, we have a formal logging process and incident reporting flow', score: 10 },
        { label: 'We address incidents on an ad-hoc basis; no central logs exist', score: 4 },
        { label: 'No, we have no incident log or reporting protocol', score: 1 }
      ]
    }
  ];

  let currentStep = 0;
  let quizAnswers = [];

  window.startQuiz = function() {
    const quizIntro = document.getElementById('quizIntro');
    const quizMain = document.getElementById('quizMain');
    const quizResult = document.getElementById('quizResult');

    if (!quizMain) return;

    quizIntro.style.display = 'none';
    quizResult.style.display = 'none';
    quizMain.style.display = 'block';

    // Restore state from LocalStorage if available
    const saved = localStorage.getItem('ai_act_quiz_progress');
    if (saved) {
      const data = JSON.parse(saved);
      currentStep = data.currentStep || 0;
      quizAnswers = data.answers || [];
    } else {
      currentStep = 0;
      quizAnswers = [];
    }

    renderQuizQuestion();
  };

  function saveQuizProgress() {
    localStorage.setItem('ai_act_quiz_progress', JSON.stringify({
      currentStep,
      answers: quizAnswers
    }));
  }

  function renderQuizQuestion() {
    const stepCurrent = document.getElementById('stepCurrent');
    const stepTotal = document.getElementById('stepTotal');
    const stepCategory = document.getElementById('stepCategory');
    const questionCategory = document.getElementById('questionCategory');
    const questionText = document.getElementById('questionText');
    const questionOptions = document.getElementById('questionOptions');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressFill = document.getElementById('progressFill');

    if (!questionText) return;

    const q = selfCheckQuestions[currentStep];
    stepCurrent.textContent = currentStep + 1;
    stepTotal.textContent = selfCheckQuestions.length;
    stepCategory.textContent = q.category;
    questionCategory.textContent = q.category;
    questionText.textContent = q.text;

    // Progress fill percentage
    const pct = ((currentStep) / selfCheckQuestions.length) * 100;
    progressFill.style.width = `${pct}%`;

    questionOptions.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const isSelected = quizAnswers[currentStep] === idx;
      const cardOption = document.createElement('div');
      cardOption.className = `quiz-option ${isSelected ? 'selected' : ''}`;
      cardOption.style.cssText = 'padding: var(--s-4); border: 1px solid var(--border); border-radius: 6px; margin-bottom: var(--s-3); cursor: pointer; transition: all 0.2s; background: rgba(255,255,255,0.02); display: flex; align-items: center; justify-content: space-between;';
      if (isSelected) {
        cardOption.style.borderColor = 'var(--gold-400)';
        cardOption.style.background = 'rgba(212, 163, 89, 0.05)';
      }

      cardOption.innerHTML = `
        <span style="font-weight: 500; font-size: var(--text-base); color: #fff;">${opt.label}</span>
        <div style="width: 18px; height: 18px; border-radius: 50%; border: 2px solid ${isSelected ? 'var(--gold-400)' : 'var(--border)'}; display: flex; align-items: center; justify-content: center;">
          ${isSelected ? '<div style="width: 8px; height: 8px; border-radius: 50%; background: var(--gold-400);"></div>' : ''}
        </div>
      `;

      cardOption.addEventListener('click', () => {
        selectOption(idx);
      });

      questionOptions.appendChild(cardOption);
    });

    prevBtn.disabled = currentStep === 0;
    nextBtn.disabled = quizAnswers[currentStep] === undefined;
    nextBtn.textContent = currentStep === selfCheckQuestions.length - 1 ? 'Finish Assessment ✦' : 'Next →';
  }

  function selectOption(idx) {
    quizAnswers[currentStep] = idx;
    saveQuizProgress();
    renderQuizQuestion();

    // Auto-advance with visual micro-delay
    setTimeout(() => {
      if (currentStep < selfCheckQuestions.length - 1) {
        nextQuestion();
      } else {
        finishQuiz();
      }
    }, 350);
  }

  window.prevQuestion = function() {
    if (currentStep > 0) {
      currentStep--;
      saveQuizProgress();
      renderQuizQuestion();
    }
  };

  window.nextQuestion = function() {
    if (currentStep < selfCheckQuestions.length - 1) {
      currentStep++;
      saveQuizProgress();
      renderQuizQuestion();
    } else {
      finishQuiz();
    }
  };

  function finishQuiz() {
    localStorage.removeItem('ai_act_quiz_progress'); // Clean up active progress
    const quizMain = document.getElementById('quizMain');
    const quizResult = document.getElementById('quizResult');

    if (!quizMain || !quizResult) return;

    quizMain.style.display = 'none';
    quizResult.style.display = 'block';

    let totalScore = 0;
    let maxScore = selfCheckQuestions.length * 100; // Let's use percentage scale out of 100 total
    let totalScoreObtained = 0;

    selfCheckQuestions.forEach((q, idx) => {
      const selectedOptIdx = quizAnswers[idx] || 0;
      totalScoreObtained += q.options[selectedOptIdx].score;
    });

    // Score out of 100
    const finalScore = Math.round((totalScoreObtained / (selfCheckQuestions.length * 10)) * 100);
    window.currentQuizScore = finalScore;

    let readinessLevel = '';
    let recommendation = '';
    let color = '';

    if (finalScore <= 45) {
      readinessLevel = 'Action Required (Low Readiness)';
      color = 'var(--red-400)';
      recommendation = 'You have minimal governance policies in place. Priority should be given to establishing an AI inventory, setting up basic tool parameters, and rolling out initial vendor due diligence.';
    } else if (finalScore <= 75) {
      readinessLevel = 'Improving (Moderate Readiness)';
      color = 'var(--amber-500)';
      recommendation = 'You have active foundations! Expand your workflow: formalize staff safety training, finalize the system registry, and begin implementing detailed risk checks for Annex III systems.';
    } else {
      readinessLevel = 'Optimized (High Readiness)';
      color = 'var(--green-500)';
      recommendation = 'Excellent governance. Keep checking new software purchases, maintain the incident logs systematically, and ensure continuous review loops for compliance documentation.';
    }

    quizResult.innerHTML = `
      <div class="quiz-card" style="text-align: center; border: 1px solid rgba(255,255,255,0.08); padding: var(--s-8);">
        <div style="position: relative; width: 140px; height: 140px; margin: 0 auto var(--s-5); display: flex; align-items: center; justify-content: center;">
          <svg style="position: absolute; transform: rotate(-90deg); width: 100%; height: 100%;">
            <circle cx="70" cy="70" r="60" stroke="rgba(255,255,255,0.05)" stroke-width="8" fill="none"></circle>
            <circle cx="70" cy="70" r="60" stroke="${color}" stroke-dasharray="377" stroke-dashoffset="${377 - (377 * finalScore) / 100}" stroke-width="8" fill="none" style="transition: stroke-dashoffset 1s ease-out; stroke-linecap: round;"></circle>
          </svg>
          <div style="font-size: var(--text-2xl); font-weight: 800; color: #fff;">${finalScore}%</div>
        </div>
        <h2 style="font-size: var(--text-2xl); color: ${color}; margin-bottom: var(--s-2);">${readinessLevel}</h2>
        <p style="color: var(--text-muted); font-size: var(--text-base); max-width: 500px; margin: 0 auto var(--s-6); line-height: 1.7;">
          ${recommendation}
        </p>

        <div style="display: flex; gap: var(--s-3); justify-content: center; margin-bottom: var(--s-8);">
          <button class="btn btn-gold" onclick="window.location.href='packs.html'">📦 Get Required Packs</button>
          <button class="btn btn-outline" onclick="window.startQuiz()">🔄 Restart Assessment</button>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--border); margin: var(--s-8) 0;">

        <!-- Risk Screening Report Builder -->
        <div style="text-align: left; padding: var(--s-3);">
          <h3 style="margin-top: 0; color: #fff; font-size: var(--text-xl); display: flex; align-items: center; gap: 8px;">🛠️ AI Risk Screening Report Builder</h3>
          <p style="color: var(--text-muted); font-size: var(--text-sm); line-height: 1.6; margin-bottom: var(--s-4);">
            Generate a customized, compliance-ready Markdown or JSON screening report for your system. Type in the details below and download your files directly to your local workspace!
          </p>
          <div style="display: flex; flex-direction: column; gap: var(--s-4);">
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <span style="font-weight: 600; font-size: 13px; color: #fff;">System Name / Identifier</span>
              <input type="text" id="report-sys-name" value="My Company AI Assistant" style="width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 4px; background: rgba(0,0,0,0.3); color: #fff; outline: none; font-size: var(--text-sm);">
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <span style="font-weight: 600; font-size: 13px; color: #fff;">Intended Purpose & Target Audience</span>
              <textarea id="report-purpose" style="width: 100%; height: 75px; padding: 10px; border: 1px solid var(--border); border-radius: 4px; background: rgba(0,0,0,0.3); color: #fff; resize: vertical; outline: none; font-size: var(--text-sm); font-family: inherit;">Automated customer support chatbot handling general support and product questions for EU-based consumers.</textarea>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <span style="font-weight: 600; font-size: 13px; color: #fff;">Human-in-the-Loop Safeguards</span>
              <input type="text" id="report-human-loop" value="Standard escalation to live human agent when user requests escalation or chatbot confidence is below 70%." style="width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 4px; background: rgba(0,0,0,0.3); color: #fff; outline: none; font-size: var(--text-sm);">
            </div>
            <div style="display: flex; gap: var(--s-3); margin-top: var(--s-2); flex-wrap: wrap;">
              <button class="btn btn-primary" onclick="exportRiskReport('markdown')">💾 Download Markdown (.md)</button>
              <button class="btn btn-outline" onclick="exportRiskReport('json')">💾 Download JSON (.json)</button>
            </div>
          </div>
        </div>
      </div>
    `;

    quizResult.scrollIntoView({ behavior: 'smooth' });
  }

  window.exportRiskReport = function(format) {
    const sysName = document.getElementById('report-sys-name')?.value || 'Unnamed AI System';
    const purpose = document.getElementById('report-purpose')?.value || '';
    const humanLoop = document.getElementById('report-human-loop')?.value || '';
    const score = window.currentQuizScore || 0;

    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'markdown') {
      filename = sysName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-risk-screening.md';
      mimeType = 'text/markdown';
      content = `# EU AI Act - Risk Screening & Governance Report\n\n`;
      content += `## 1. System Identification\n`;
      content += `- **System Name:** ${sysName}\n`;
      content += `- **Date generated:** ${new Date().toLocaleDateString()}\n`;
      content += `- **Toolkit Self-Assessment Score:** ${score}%\n\n`;
      content += `## 2. Intended Purpose & Target Audience\n`;
      content += `${purpose}\n\n`;
      content += `## 3. Human Oversight & Guardrails\n`;
      content += `${humanLoop}\n\n`;
      content += `## 4. Assessment Summary\n`;
      content += `This system has been screened using the EU AI Act Toolkit self-check. Internal evidence logging should be updated with this documentation sheet.`;
    } else {
      filename = sysName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-risk-screening.json';
      mimeType = 'application/json';
      content = JSON.stringify({
        systemName: sysName,
        generationDate: new Date().toISOString(),
        selfAssessmentScore: score,
        intendedPurpose: purpose,
        humanOversight: humanLoop,
        toolkitVersion: '2.0.0'
      }, null, 2);
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.showNotification) {
      window.showNotification('Screening report downloaded successfully!');
    } else {
      alert('Screening report downloaded successfully!');
    }
  };

  // Smooth reveal animations using IntersectionObserver
  function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('[data-animate], .card, .resource-card, .tile');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      elementsToAnimate.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      // Fallback: animate immediately on older browsers
      elementsToAnimate.forEach(function(el) {
        el.classList.add('revealed');
      });
    }
  }

  // Update active navigation state based on current page
  function updateActiveNavigation() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a[href], .nav-link[href]');

    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      const hrefFile = href ? href.split('/').pop().split('#')[0].split('?')[0] : '';
      const normalizedCurrent = currentFile === '' ? 'index.html' : currentFile;
      const normalizedHref = hrefFile === '' ? 'index.html' : hrefFile;

      if (normalizedHref === normalizedCurrent) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Add copy-link functionality to important resource cards
  function initCopyLinks() {
    const copyButtons = document.querySelectorAll('[data-copy-link]');

    copyButtons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();

        const card = button.closest('[data-resource-id], .card, .resource-card');
        if (!card) return;

        const resourceId = card.getAttribute('data-resource-id') || card.getAttribute('id');
        const resourceTitle = card.getAttribute('data-resource-title') || card.textContent.split('\n')[0];

        if (resourceId || resourceTitle) {
          const pageUrl = window.location.href;
          const linkText = resourceTitle || 'Resource';
          const copyText = linkText + ': ' + pageUrl;

          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(copyText).then(function() {
              showNotification('Link copied to clipboard');
              button.textContent = '✓ Copied';
              setTimeout(function() {
                button.textContent = 'Copy Link';
              }, 2000);
            }).catch(function() {
              fallbackCopyToClipboard(copyText);
            });
          } else {
            fallbackCopyToClipboard(copyText);
          }
        }
      });
    });
  }

  // Fallback copy-to-clipboard for older browsers
  function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      showNotification('Link copied to clipboard');
    } catch (err) {
      console.warn('Copy failed:', err);
    }

    document.body.removeChild(textarea);
  }

  // Show temporary notification message
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #333; color: #fff; padding: 12px 20px; border-radius: 4px; z-index: 9999; font-size: 14px;';

    document.body.appendChild(notification);

    setTimeout(function() {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.3s ease';
      setTimeout(function() {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Rewrite sibling links to GitHub URLs when hosted on GitHub Pages
  function rewriteGitHubPagesLinks() {
    const isGitHubPages = window.location.hostname.endsWith('github.io');
    if (!isGitHubPages) return;

    const links = document.querySelectorAll('a[href]');
    links.forEach(function(link) {
      const href = link.getAttribute('href');
      if (!href) return;

      // Only rewrite relative links pointing to documents/files
      const isRelative = !href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:');
      const isDocument = href.endsWith('.md') || href.endsWith('.csv') || href.endsWith('.pdf') || href.endsWith('.png') || href.endsWith('.jpg') || href.endsWith('.jpeg');

      if (isRelative && isDocument) {
        let newHref = href;
        if (href.startsWith('../toolkit/')) {
          newHref = 'https://github.com/artemhobotun/EU-AI-Act-Toolkit/blob/main/toolkit/' + href.substring('../toolkit/'.length);
        } else if (href.startsWith('../.github/')) {
          newHref = 'https://github.com/artemhobotun/EU-AI-Act-Toolkit/blob/main/.github/' + href.substring('../.github/'.length);
        } else if (href.startsWith('../')) {
          newHref = 'https://github.com/artemhobotun/EU-AI-Act-Toolkit/blob/main/docs/' + href.substring('../'.length);
        } else if (href.startsWith('guide/')) {
          newHref = 'https://github.com/artemhobotun/EU-AI-Act-Toolkit/blob/main/docs/guide/' + href.substring('guide/'.length);
        } else {
          newHref = 'https://github.com/artemhobotun/EU-AI-Act-Toolkit/blob/main/docs/' + href;
        }
        link.setAttribute('href', newHref);
      }
    });
  }

  // Initialize all functionality when DOM is ready
  // ── SPA Page Transitions ────────────────────
  function initPageTransitions() {
    const localLinks = document.querySelectorAll('a[href]:not([target="_blank"])');
    
    localLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignore hashes, external links, or JS links
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;
        
        // Ignore modifier keys
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        
        e.preventDefault();
        
        // Add transitioning class
        document.body.classList.add('page-transitioning');
        
        // Wait for animation to finish, then navigate
        setTimeout(() => {
          window.location.href = href;
        }, 250); // Matches CSS fadeOutDown duration
      });
    });
  }

  // ── Global Search (Cmd+K) ───────────────────
  function initGlobalSearch() {
    // 1. Inject Search Modal HTML
    const searchHTML = `
      <div id="search-modal" class="search-modal" role="dialog" aria-modal="true">
        <div class="search-modal-content">
          <input type="text" id="search-input" placeholder="Search the toolkit (e.g. 'Vendor', 'Risk', 'Packs')..." autocomplete="off" spellcheck="false">
          <div id="search-results" class="search-results"></div>
          <div class="search-footer">
            <span><kbd>Esc</kbd> to close</span>
            <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate · <kbd>Enter</kbd> to select</span>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', searchHTML);

    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Simple static search index for GitHub Pages
    const searchIndex = [
      { title: 'Dashboard', desc: 'Home overview and quick actions', url: 'index.html' },
      { title: 'Start Self-Check', desc: 'AI Governance readiness quiz', url: 'quiz.html' },
      { title: 'Toolkit Packs', desc: 'Starter Pack, Vendor Pack, Sector Packs', url: 'packs.html' },
      { title: 'Use Cases & Examples', desc: 'Real-world AI implementations and governance', url: 'use-cases.html' },
      { title: 'Resources', desc: 'Glossary, Decision Tree, Checklist', url: 'resources.html' },
      { title: 'Vendor Assessment Pack', desc: 'Tools for reviewing third-party AI software', url: 'packs.html#vendor-pack' },
      { title: 'AI System Inventory', desc: 'Template to map your organisation\'s AI usage', url: 'packs.html#starter-pack' },
      { title: 'Official EU Sources', desc: 'Links to actual EU legislation and guidelines', url: 'official-sources.html' },
      { title: 'Community', desc: 'Join the discussion and contribute', url: 'community.html' },
      { title: 'Maintainer', desc: 'About Artem Nazarko', url: 'maintainer.html' }
    ];

    let selectedIndex = -1;

    // Toggle Modal
    function openSearch() {
      searchModal.classList.add('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
      searchResults.classList.remove('has-results');
      setTimeout(() => searchInput.focus(), 50);
    }

    function closeSearch() {
      searchModal.classList.remove('active');
      searchInput.blur();
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearch();
      }
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    // Handle input and filtering
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      selectedIndex = -1;
      
      if (!query) {
        searchResults.innerHTML = '';
        searchResults.classList.remove('has-results');
        return;
      }

      const results = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
      );

      if (results.length > 0) {
        searchResults.innerHTML = results.map((item, idx) => `
          <a href="${item.url}" class="search-result-item" data-index="${idx}">
            <strong>${item.title}</strong>
            <span>${item.desc}</span>
          </a>
        `).join('');
        searchResults.classList.add('has-results');
      } else {
        searchResults.innerHTML = `<div class="search-result-item"><span>No results found for "${query}"</span></div>`;
        searchResults.classList.add('has-results');
      }
    });

    // Keyboard navigation in results
    searchInput.addEventListener('keydown', (e) => {
      const items = searchResults.querySelectorAll('a.search-result-item');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        updateSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = selectedIndex - 1 < 0 ? items.length - 1 : selectedIndex - 1;
        updateSelection(items);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        items[selectedIndex].click();
      }
    });

    function updateSelection(items) {
      items.forEach(item => item.classList.remove('selected'));
      if (selectedIndex >= 0) {
        items[selectedIndex].classList.add('selected');
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
      }
    }
  }

  // ── Packs Interactive Checklist (LocalStorage) ──
  function initPacksInteractiveChecklist() {
    const progressContainer = document.getElementById('packs-progress-container');
    const progressText = document.getElementById('packs-progress-text');
    const progressFill = document.getElementById('packs-progress-fill');

    if (!progressContainer) return;

    // Find all cards inside grids
    const grids = document.querySelectorAll('.cards-grid, .cards-grid-3');
    let cardElements = [];
    grids.forEach(grid => {
      const cards = grid.querySelectorAll('.card');
      cards.forEach(card => cardElements.push(card));
    });

    if (cardElements.length === 0) return;

    progressContainer.style.display = 'block';

    // Load from local storage or default to empty
    const completedTasks = JSON.parse(localStorage.getItem('ai_act_completed_tasks') || '{}');

    let totalTasks = cardElements.length;

    function updateProgress() {
      let completedCount = 0;
      cardElements.forEach(card => {
        const id = card.getAttribute('data-task-id');
        if (completedTasks[id]) {
          completedCount++;
          card.classList.add('task-completed');
          // Add a premium completed indicator border / glow
          card.style.borderColor = 'var(--gold-400)';
          card.style.boxShadow = '0 0 10px rgba(212, 163, 89, 0.15)';
        } else {
          card.classList.remove('task-completed');
          card.style.borderColor = '';
          card.style.boxShadow = '';
        }
      });

      const pct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
      progressText.textContent = `${completedCount}/${totalTasks} Tasks Completed (${pct}%)`;
      progressFill.style.width = `${pct}%`;
    }

    cardElements.forEach((card, idx) => {
      // Generate a stable ID based on title
      const titleEl = card.querySelector('h3');
      if (!titleEl) return;
      const titleText = titleEl.textContent.trim();
      const id = 'task_' + titleText.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      card.setAttribute('data-task-id', id);

      // Inject checkbox at the top right of the card
      const checkboxWrapper = document.createElement('div');
      checkboxWrapper.style.cssText = 'position: absolute; top: var(--s-4); right: var(--s-4); display: flex; align-items: center; gap: 6px; cursor: pointer; user-select: none; z-index: 10;';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = !!completedTasks[id];
      checkbox.style.cssText = 'width: 16px; height: 16px; accent-color: var(--gold-400); cursor: pointer;';

      const label = document.createElement('span');
      label.textContent = 'Done';
      label.style.cssText = 'font-size: 10px; color: var(--text-faint); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;';

      checkboxWrapper.appendChild(label);
      checkboxWrapper.appendChild(checkbox);

      // Ensure card position relative so absolute positioning works
      card.style.position = 'relative';
      card.appendChild(checkboxWrapper);

      // Trigger toggle when clicking the checkbox directly
      checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        if (checkbox.checked) {
          completedTasks[id] = true;
        } else {
          delete completedTasks[id];
        }
        localStorage.setItem('ai_act_completed_tasks', JSON.stringify(completedTasks));
        updateProgress();
      });

      checkboxWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        checkbox.click();
      });
    });

    updateProgress();
  }

  function init() {
    initScrollAnimations();
    updateActiveNavigation();
    initCopyLinks();
    rewriteGitHubPagesLinks();
    initPageTransitions();
    initGlobalSearch();
    initPacksInteractiveChecklist();
  }

  // Ensure DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

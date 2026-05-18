/**
 * Applicability Wizard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const wizardContent = document.getElementById('wizard-content');
  const wizardProgress = document.getElementById('wizard-progress');
  if (!wizardContent) return;

  const steps = [
    {
      id: 'q1',
      title: 'What is your role?',
      desc: 'Are you building the AI system yourself, or just using someone else\'s tool?',
      options: [
        { label: 'Provider (We build/brand the AI)', next: 'q2', icon: '🛠️' },
        { label: 'Deployer (We use an AI tool internally or for clients)', next: 'q2', icon: '💻' },
        { label: 'Importer / Distributor', next: 'q2', icon: '📦' }
      ]
    },
    {
      id: 'q2',
      title: 'Does the AI system use biometric data?',
      desc: 'This includes facial recognition, emotion inference, or biometric categorization.',
      options: [
        { label: 'Yes, for untargeted scraping or social scoring', next: 'result_prohibited', icon: '🛑' },
        { label: 'Yes, for emotion inference at workplace/school', next: 'result_prohibited', icon: '🛑' },
        { label: 'Yes, for biometric categorization (e.g. race, political opinions)', next: 'result_prohibited', icon: '🛑' },
        { label: 'Yes, but for other purposes (e.g., remote biometric identification)', next: 'result_high_risk', icon: '⚠️' },
        { label: 'No biometric data used', next: 'q3', icon: '✅' }
      ]
    },
    {
      id: 'q3',
      title: 'Is the AI used in critical sectors (Annex III)?',
      desc: 'E.g., Education, Employment/HR, Credit Scoring, Law Enforcement, Critical Infrastructure.',
      options: [
        { label: 'Yes, used in HR/Employment (e.g., CV screening)', next: 'result_high_risk', icon: '👔' },
        { label: 'Yes, used in Education/Exams', next: 'result_high_risk', icon: '🎓' },
        { label: 'Yes, used in Credit Scoring or Essential Services', next: 'result_high_risk', icon: '🏦' },
        { label: 'No, none of the above', next: 'q4', icon: '❌' }
      ]
    },
    {
      id: 'q4',
      title: 'Is it a General-Purpose AI (GPAI)?',
      desc: 'Like ChatGPT, Claude, or an open-source foundational model.',
      options: [
        { label: 'Yes, we are the Provider of a GPAI model', next: 'result_gpai', icon: '🧠' },
        { label: 'No, it is a specific-purpose AI', next: 'q5', icon: '🎯' }
      ]
    },
    {
      id: 'q5',
      title: 'Does the AI interact directly with humans?',
      desc: 'E.g., Chatbots, deepfakes, or emotionally engaging systems.',
      options: [
        { label: 'Yes, it is a Chatbot or generates deepfakes', next: 'result_limited_risk', icon: '🤖' },
        { label: 'No, purely backend or analytical', next: 'result_minimal_risk', icon: '📊' }
      ]
    }
  ];

  const results = {
    'result_prohibited': {
      title: 'Prohibited System',
      icon: '🛑',
      desc: 'Your AI system likely falls under Unacceptable Risk. These practices are banned under the EU AI Act. You must phase out this system immediately.',
      color: 'var(--red-400)'
    },
    'result_high_risk': {
      title: 'High-Risk System',
      icon: '⚠️',
      desc: 'Your system is classified as High-Risk. You must implement a Quality Management System, keep technical documentation, ensure human oversight, and undergo conformity assessments.',
      color: 'var(--amber-500)'
    },
    'result_gpai': {
      title: 'GPAI Model',
      icon: '🧠',
      desc: 'As a GPAI Provider, you must maintain up-to-date technical documentation, respect EU copyright law, and publish a summary of training data.',
      color: 'var(--blue-400)'
    },
    'result_limited_risk': {
      title: 'Limited Risk (Transparency)',
      icon: '🤖',
      desc: 'Your system has transparency obligations. You must clearly inform users that they are interacting with an AI (e.g., labeling chatbots or deepfakes).',
      color: 'var(--blue-400)'
    },
    'result_minimal_risk': {
      title: 'Minimal / No Risk',
      icon: '✅',
      desc: 'Your system currently has no mandatory obligations under the EU AI Act, though voluntary codes of conduct are encouraged.',
      color: 'var(--green-500)'
    }
  };

  let history = [];
  
  function renderStep(stepId) {
    wizardContent.innerHTML = '';
    
    if (results[stepId]) {
      renderResult(stepId);
      return;
    }

    const step = steps.find(s => s.id === stepId);
    if (!step) return;

    // Update Progress
    const totalSteps = 5; // Approx max depth
    const currentDepth = history.length;
    wizardProgress.innerHTML = Array.from({length: totalSteps}).map((_, i) => 
      `<div class="wizard-dot ${i <= currentDepth ? 'active' : ''}"></div>`
    ).join('');

    const html = `
      <div class="wizard-step active">
        <h2>${step.title}</h2>
        <p>${step.desc}</p>
        <div class="wizard-options">
          ${step.options.map((opt, i) => `
            <div class="wizard-option" data-next="${opt.next}">
              <span style="font-weight: 500;">${opt.icon} &nbsp; ${opt.label}</span>
              <span style="color: var(--text-muted);">→</span>
            </div>
          `).join('')}
        </div>
        ${history.length > 0 ? `
          <button class="btn btn-outline" id="wizard-back" style="margin-top: 24px;">← Back</button>
        ` : ''}
      </div>
    `;

    wizardContent.innerHTML = html;

    // Attach listeners
    document.querySelectorAll('.wizard-option').forEach(el => {
      el.addEventListener('click', () => {
        history.push(stepId);
        renderStep(el.getAttribute('data-next'));
      });
    });

    const backBtn = document.getElementById('wizard-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        const prev = history.pop();
        renderStep(prev);
      });
    }
  }

  function renderResult(resultId) {
    const res = results[resultId];
    wizardProgress.innerHTML = `<div class="wizard-dot active" style="background: ${res.color}"></div>`;
    
    wizardContent.innerHTML = `
      <div class="wizard-step active wizard-result">
        <div class="wizard-result-icon">${res.icon}</div>
        <h2 style="color: ${res.color}">${res.title}</h2>
        <p>${res.desc}</p>
        <div style="display: flex; gap: 16px; justify-content: center; margin-top: 32px;">
          <button class="btn btn-primary" onclick="window.location.href='packs.html'">View Templates</button>
          <button class="btn btn-outline" id="wizard-restart">Start Over</button>
        </div>
      </div>
    `;

    document.getElementById('wizard-restart').addEventListener('click', () => {
      history = [];
      renderStep('q1');
    });
  }

  // Start wizard
  renderStep('q1');
});

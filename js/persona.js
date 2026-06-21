/* ── Persona definitions ────────────────────────────────── */
const PERSONAS = {
  earthling: {
    id:          'earthling',
    icon:        '🌱',
    name:        'Earthling',
    color:       '#22c55e',
    tagline:     '"AI keeps coming up everywhere — help me actually get it"',
    description: "No tech background needed. We'll use real-life analogies, plain English, and zero jargon. By the end you'll be the person who actually understands AI at the dinner table.",
    identifiers: [
      'Curious non-technical people',
      'Parents, relatives, or friends wondering about AI',
      'Business professionals who use AI tools but want to understand them',
      'Anyone who\'s tried ChatGPT but has no idea how it works'
    ],
    banners: {
      default: 'Plain English, real-life analogies — no tech background needed.',
    },
    curriculum: [
      'ai-foundations',
      'generative-ai',
      'llms',
      'prompt-engineering',
      'ai-agents',
      'coding-assistants',
      'vibe-coding',
      'vibe-coding-master',
      'agentic-use-cases',
      'glossary',
      'learning-roadmap'
    ]
  },
  cadet: {
    id:          'cadet',
    icon:        '🛸',
    name:        'Cadet',
    color:       '#3b82f6',
    tagline:     '"I\'m a developer ready to build with AI — show me how"',
    description: "You write code and want to understand how to build AI-powered features. Expect hands-on examples, API calls, framework comparisons, and practical patterns you can use this week.",
    identifiers: [
      'Junior and mid-level software developers',
      'Bootcamp graduates moving into AI development',
      'Engineers from other stacks learning to build with LLMs',
      'Developers who\'ve used ChatGPT but never integrated an AI API'
    ],
    banners: {
      default: 'Hands-on, code-first — everything you need to build with AI.',
    },
    curriculum: [
      'ai-foundations',
      'generative-ai',
      'llms',
      'models-ecosystem',
      'prompt-engineering',
      'llm-internals',
      'llm-inference',
      'system-prompts',
      'advanced-prompts',
      'prompt-formulas',
      'context-engineering',
      'context-eng-deep',
      'rag',
      'ai-apis',
      'local-models',
      'ai-agents',
      'agentic-ai',
      'agent-components',
      'agent-protocols',
      'skills',
      'sub-agents',
      'frameworks',
      'first-agent',
      'workflows',
      'ai-engineering',
      'coding-assistants',
      'claude-code',
      'vibe-coding',
      'vibe-coding-master',
      'developer-use-cases',
      'agentic-use-cases',
      'prod-stack',
      'automation-expert',
      'socratic-reasoning',
      'glossary',
      'learning-roadmap'
    ]
  },
  commander: {
    id:          'commander',
    icon:        '🌟',
    name:        'Commander',
    color:       '#8b5cf6',
    tagline:     '"I lead technical teams and need to understand this shift"',
    description: "You understand software and systems, but AI feels like a paradigm shift. We focus on strategic framing, team impact, and what this means for your roadmap — not the math.",
    identifiers: [
      'Engineering managers, Directors, VPs, and CTOs',
      'Tech leads who own roadmaps and team direction',
      'Senior engineers transitioning into leadership roles',
      'Product managers evaluating AI for their product'
    ],
    banners: {
      default: 'Strategic framing, business impact, and what this means for your team.',
    },
    curriculum: [
      'ai-foundations',
      'generative-ai',
      'llms',
      'models-ecosystem',
      'prompt-engineering',
      'system-prompts',
      'advanced-prompts',
      'prompt-formulas',
      'socratic-reasoning',
      'context-engineering',
      'rag',
      'ai-agents',
      'agentic-ai',
      'workflows',
      'ai-engineering',
      'secure-ai',
      'functional-safety',
      'coding-assistants',
      'vibe-coding',
      'vibe-coding-master',
      'developer-use-cases',
      'agentic-use-cases',
      'prod-stack',
      'automation-expert',
      'glossary',
      'learning-roadmap'
    ]
  },
  engineer: {
    id:          'engineer',
    icon:        '🤖',
    name:        'Engineer',
    color:       '#f97316',
    tagline:     '"I\'m in the engine room — give me internals and production reality"',
    description: "You've already shipped AI features and want the deep stuff: internals, production tradeoffs, evaluation strategies, and architecture patterns at scale.",
    identifiers: [
      'AI and ML engineers building production systems',
      'Senior developers actively working with LLMs and agents',
      'Researchers building RAG, agentic, or fine-tuning pipelines',
      'Platform engineers evaluating models and infrastructure'
    ],
    banners: {
      default: 'Internals, tradeoffs, and production patterns — no hand-holding.',
    },
    curriculum: [
      'ai-foundations',
      'generative-ai',
      'llms',
      'llm-internals',
      'llm-inference',
      'models-ecosystem',
      'local-models',
      'system-prompts',
      'advanced-prompts',
      'prompt-formulas',
      'socratic-reasoning',
      'prompt-engineering',
      'context-engineering',
      'context-eng-deep',
      'rag',
      'ai-apis',
      'ai-agents',
      'agentic-ai',
      'agent-components',
      'agent-protocols',
      'skills',
      'sub-agents',
      'frameworks',
      'first-agent',
      'workflows',
      'ai-engineering',
      'coding-assistants',
      'claude-code',
      'vibe-coding',
      'vibe-coding-master',
      'jarvis-ai',
      'prod-stack',
      'developer-use-cases',
      'secure-ai',
      'functional-safety',
      'embedded-ai',
      'embedded-handbook',
      'sil-platforms',
      'agentic-use-cases',
      'automation-expert',
      'glossary',
      'learning-roadmap'
    ]
  },
  embedded: {
    id:          'embedded',
    icon:        '🔧',
    name:        'Embedded',
    color:       '#14b8a6',
    tagline:     '"I build firmware and hardware — show me AI that works in the real world"',
    description: "You work in embedded systems, firmware, BSP, or hardware. Learn how AI tools can accelerate your workflow — from debugging kernel panics to generating driver code — without losing sight of safety and constraints.",
    identifiers: [
      'Embedded Linux and firmware engineers',
      'BSP and device driver developers',
      'Hardware engineers exploring AI tooling',
      'Engineers working on safety-critical or regulated systems'
    ],
    banners: {
      default: 'AI for embedded systems — firmware, drivers, safety, and hardware.',
    },
    curriculum: [
      'ai-foundations',
      'generative-ai',
      'llms',
      'prompt-engineering',
      'system-prompts',
      'coding-assistants',
      'claude-code',
      'context-engineering',
      'ai-agents',
      'agentic-ai',
      'ai-apis',
      'vibe-coding',
      'embedded-ai',
      'embedded-handbook',
      'sil-platforms',
      'secure-ai',
      'functional-safety',
      'agentic-use-cases',
      'glossary',
      'learning-roadmap'
    ]
  }
};

/* ── Persona state ──────────────────────────────────────── */
let currentPersona = null;

function getPersonaFromURL() {
  const params = new URLSearchParams(window.location.search);
  const p = params.get('for');
  return PERSONAS[p] ? p : null;
}

function getSavedPersona() {
  return localStorage.getItem('ai-buddy-persona') || null;
}

function savePersona(id) {
  localStorage.setItem('ai-buddy-persona', id);
}

function selectPersona(id) {
  if (!PERSONAS[id]) return;
  currentPersona = id;
  savePersona(id);
  applyPersona(id);
  hideOverlay();
  showApp();
}

function applyPersona(id) {
  const p = PERSONAS[id];
  if (!p) return;

  /* body attribute drives CSS persona colors */
  document.body.setAttribute('data-persona', id);

  /* update badge */
  const badge = document.getElementById('persona-badge');
  if (badge) {
    badge.setAttribute('aria-label', `Current persona: ${p.name}. Click to switch.`);
    badge.innerHTML = `
      <span aria-hidden="true">${p.icon}</span>
      <span>${p.name}</span>
      <span class="persona-badge-arrow" aria-hidden="true">▾</span>
    `;
  }

  /* rebuild persona switcher menu */
  const menu = document.getElementById('persona-menu');
  if (menu) {
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', 'Select persona');
    menu.innerHTML = Object.values(PERSONAS).map(persona => `
      <div class="persona-menu-item ${persona.id === id ? 'active' : ''}"
           role="option"
           aria-selected="${persona.id === id ? 'true' : 'false'}"
           tabindex="0"
           onclick="selectPersona('${persona.id}'); closePersonaMenu()"
           onkeydown="if(event.key==='Enter'||event.key===' '){selectPersona('${persona.id}');closePersonaMenu();}">
        <span aria-hidden="true">${persona.icon}</span> ${persona.name}
        ${persona.id === id ? '<span aria-hidden="true"> ✓</span>' : ''}
      </div>
    `).join('');
  }

  /* re-render current section's persona banner if content is showing */
  updatePersonaBanner();
}

function updatePersonaBanner() {
  const banner = document.getElementById('persona-banner');
  if (!banner || !currentPersona) return;
  const p = PERSONAS[currentPersona];
  banner.innerHTML = `
    <span aria-hidden="true">${p.icon}</span>
    <span><strong>Viewing as ${p.name}:</strong> ${p.banners.default}</span>
  `;
}

/* ── Overlay / App visibility ───────────────────────────── */
function showOverlay() {
  const el = document.getElementById('persona-overlay');
  if (el) { el.classList.remove('hidden'); }
  const app = document.getElementById('app');
  if (app) app.style.display = 'none';
}

function hideOverlay() {
  const el = document.getElementById('persona-overlay');
  if (el) {
    el.classList.add('hidden');
    setTimeout(() => { el.style.display = 'none'; }, 400);
  }
}

function showApp() {
  const app = document.getElementById('app');
  if (app) app.style.display = 'flex';
}

/* ── Persona menu toggle ────────────────────────────────── */
function togglePersonaMenu() {
  const menu  = document.getElementById('persona-menu');
  const badge = document.getElementById('persona-badge');
  const isOpen = menu.classList.toggle('open');
  badge?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (isOpen) menu.querySelector('[role="option"]')?.focus();
}

function closePersonaMenu() {
  document.getElementById('persona-menu').classList.remove('open');
  document.getElementById('persona-badge')?.setAttribute('aria-expanded', 'false');
}

/* Close menu on outside click */
document.addEventListener('click', (e) => {
  const wrapper = document.querySelector('.persona-badge-wrapper');
  if (wrapper && !wrapper.contains(e.target)) closePersonaMenu();
});

/* ── Share modal ────────────────────────────────────────── */
function openShareModal() {
  const modal = document.getElementById('share-modal');
  if (!modal) return;

  const grid = modal.querySelector('.share-grid');
  const base = window.location.origin + window.location.pathname;

  grid.innerHTML = Object.values(PERSONAS).map(p => `
    <div class="share-row">
      <span class="share-row-icon" aria-hidden="true">${p.icon}</span>
      <div class="share-row-info">
        <div class="share-row-name">Share as ${p.name}</div>
        <div class="share-row-url">${base}?for=${p.id}</div>
      </div>
      <button class="share-copy-btn"
              aria-label="Copy link for ${p.name}"
              onclick="copyShareLink('${base}?for=${p.id}', this)">Copy</button>
    </div>
  `).join('');

  modal.classList.add('open');
  modal.querySelector('.modal-close')?.focus();
}

function closeShareModal() {
  document.getElementById('share-modal').classList.remove('open');
  document.getElementById('share-trigger')?.focus();
}

function copyShareLink(url, btn) {
  navigator.clipboard.writeText(url).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

/* ── Build persona overlay cards ────────────────────────── */
function buildPersonaOverlay() {
  const grid = document.getElementById('persona-grid');
  if (!grid) return;

  grid.innerHTML = Object.values(PERSONAS).map(p => `
    <div class="persona-card" data-id="${p.id}" onclick="selectPersona('${p.id}')">
      <span class="persona-card-icon" aria-hidden="true">${p.icon}</span>
      <div class="persona-card-name">${p.name}</div>
      <div class="persona-card-tagline">${p.tagline}</div>
      <div class="persona-card-divider"></div>
      <ul class="persona-card-list">
        ${p.identifiers.map(i => `<li>${i}</li>`).join('')}
      </ul>
      <button class="persona-card-btn" aria-label="Start learning as ${p.name}">
        Start as ${p.name} →
      </button>
    </div>
  `).join('');
}

/* ── Init (called by app.js on DOMContentLoaded) ────────── */
function initPersona() {
  buildPersonaOverlay();

  const fromURL   = getPersonaFromURL();
  const fromStore = getSavedPersona();

  if (fromURL) {
    /* Shared link — apply silently, skip overlay */
    selectPersona(fromURL);
    showApp();
  } else if (fromStore) {
    /* Returning user */
    selectPersona(fromStore);
    showApp();
  } else {
    /* First visit — show overlay */
    showOverlay();
  }
}

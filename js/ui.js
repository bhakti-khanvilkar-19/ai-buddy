/* ── Theme ──────────────────────────────────────────────── */
function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('ai-buddy-theme', isDark ? 'dark' : 'light');
  document.getElementById('theme-icon').textContent = isDark ? '☀️' : '🌙';
  mermaid.initialize({ startOnLoad: false, theme: isDark ? 'dark' : 'default' });
  document.querySelectorAll('.mermaid[data-processed]').forEach(el => {
    el.removeAttribute('data-processed');
    el.innerHTML = el.getAttribute('data-src') || el.innerHTML;
  });
  mermaid.init(undefined, '.mermaid');
}

function applyStoredTheme() {
  const stored = localStorage.getItem('ai-buddy-theme');
  /* Default to dark — remove class only if user explicitly chose light */
  if (stored === 'light') {
    document.body.classList.remove('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = '🌙';
  } else {
    document.body.classList.add('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = '☀️';
  }
}

/* ── Mobile sidebar ─────────────────────────────────────── */
function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.getElementById('mobile-toggle');
  const isOpen  = sidebar.classList.toggle('open');
  toggle?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  toggle?.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

/* Dismiss sidebar when clicking outside on mobile */
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.querySelector('.mobile-menu-toggle');
  if (window.innerWidth <= 768 && sidebar && !sidebar.contains(e.target) && e.target !== toggle) {
    sidebar.classList.remove('open');
  }
});

/* ── Tabs ───────────────────────────────────────────────── */
function switchTab(tabId, clickedHeader) {
  const target    = document.getElementById(tabId);
  const container = target
    ? target.closest('.tabs')
    : clickedHeader?.closest('.tabs') || document.querySelector('.tabs');
  if (!container) return;

  const contents = [...container.querySelectorAll('.tab-content')];
  const headers  = [...container.querySelectorAll('.tab-header')];

  contents.forEach(c => c.classList.remove('active'));
  headers.forEach(h => h.classList.remove('active'));

  if (target) target.classList.add('active');
  const idx = contents.indexOf(target);
  if (idx >= 0) headers[idx]?.classList.add('active');
}

/* ── Copy code ──────────────────────────────────────────── */
function copyCode(btn) {
  const pre  = btn.closest('.code-block').querySelector('pre');
  const text = pre ? pre.textContent : '';
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  });
}

/* ── Collapsible ────────────────────────────────────────── */
function toggleCollapsible(el) {
  const content = el.nextElementSibling;
  if (content) content.classList.toggle('open');
}

/* ── Quiz ───────────────────────────────────────────────── */
function checkAnswer(el, correct) {
  el.closest('.quiz-container').querySelectorAll('.quiz-option').forEach(o => {
    o.classList.remove('correct', 'incorrect');
  });
  el.classList.add(correct ? 'correct' : 'incorrect');
  if (!correct) {
    el.closest('.quiz-container').querySelectorAll('.quiz-option').forEach(o => {
      if (o.dataset.correct === 'true') o.classList.add('correct');
    });
  }
}

/* ── Interactive demos ──────────────────────────────────── */
function tokenizeText() {
  const input  = document.getElementById('token-input');
  const output = document.getElementById('token-output');
  if (!input || !output) return;

  const tokens = (input.value.match(/\w+|[^\w\s]/g) || []);
  const ids    = tokens.map((_, i) => 10000 + i * 17 + input.value.length);

  output.innerHTML = `
    <div class="example-box">
      <p><strong>Tokens (${tokens.length}):</strong> ${tokens.map(t => `<code>"${t}"</code>`).join(' ')}</p>
      <p><strong>Token IDs:</strong> [${ids.join(', ')}]</p>
      <p style="margin:0"><em>Tip: real BPE tokenizers split differently — this is a simplified demo.</em></p>
    </div>`;
}

function demoTokenize() {
  const input  = document.getElementById('tok-input');
  const output = document.getElementById('tok-output');
  if (!input || !output) return;

  const text   = input.value.trim();
  const tokens = (text.match(/\w+|[^\w\s]/g) || []);
  const ids    = tokens.map((_, i) => 10000 + i * 17 + text.length);
  const cost   = ((tokens.length / 1000) * 0.003).toFixed(6);

  output.innerHTML = `
    <div class="example-box">
      <p><strong>Tokens (${tokens.length}):</strong> ${tokens.map(t => `<code>${t}</code>`).join(' ')}</p>
      <p><strong>Token IDs:</strong> [${ids.join(', ')}]</p>
      <p style="margin:0"><strong>Estimated cost (Claude Sonnet input):</strong> ~$${cost}</p>
    </div>`;
}

function showRecommendation() {
  const sel = document.getElementById('usecase-selector');
  const out = document.getElementById('recommendation');
  if (!sel || !out) return;

  const recs = {
    blog:  '<div class="example-box"><strong>Recommended:</strong> GPT-4o or Claude<br><strong>Tips:</strong> Provide tone, audience, and key points you want covered.</div>',
    code:  '<div class="example-box"><strong>Recommended:</strong> Claude, Copilot, or Cursor<br><strong>Tips:</strong> Include language, framework, and edge cases you need handled.</div>',
    art:   '<div class="example-box"><strong>Recommended:</strong> DALL-E 3 or Midjourney<br><strong>Tips:</strong> Be specific: style, mood, lighting, composition.</div>',
    music: '<div class="example-box"><strong>Recommended:</strong> Suno.ai or MusicLM<br><strong>Tips:</strong> Specify genre, tempo, instruments, and mood.</div>',
    video: '<div class="example-box"><strong>Recommended:</strong> Runway Gen-3 or Pika Labs<br><strong>Tips:</strong> Short, clear scene descriptions work best.</div>',
    '3d':  '<div class="example-box"><strong>Status:</strong> Still experimental. Shap-E and Point-E exist but quality is limited.<br><strong>Alternative:</strong> Describe your model to Meshy or CSM.</div>'
  };
  out.innerHTML = recs[sel.value] || '';
}

function calculateModelSize() {
  const size      = parseFloat(document.getElementById('model-size')?.value || 7);
  const precision = parseInt(document.getElementById('precision')?.value || 16);
  const gb        = (size * precision) / 8;
  const vram      = (gb * 1.2).toFixed(1);
  const result    = document.getElementById('model-calc-result');
  if (!result) return;

  result.innerHTML = `
    <div class="example-box" style="margin-top:.75rem">
      <strong>Estimated VRAM needed: ${vram} GB</strong><br><br>
      ${parseFloat(vram) <= 8  ? '✅' : '❌'} RTX 4060 Ti — 8 GB<br>
      ${parseFloat(vram) <= 12 ? '✅' : '❌'} RTX 3080 — 12 GB<br>
      ${parseFloat(vram) <= 24 ? '✅' : '❌'} RTX 4090 — 24 GB<br>
      ${parseFloat(vram) > 24  ? '⚡ Requires multiple GPUs or cloud inference' : ''}
    </div>`;
}

function updateTempDemo() {
  const slider = document.getElementById('tempSlider');
  const valEl  = document.getElementById('tempVal');
  const outEl  = document.getElementById('tempOutput');
  if (!slider || !valEl || !outEl) return;

  const t = parseFloat(slider.value);
  valEl.textContent = t.toFixed(1);

  let label, desc, color;
  if      (t <= 0.3) { label = '🧊 Deterministic'; desc = 'Best for: code, structured data, JSON extraction'; color = '#0891b2'; }
  else if (t <= 0.7) { label = '⚖️ Balanced';      desc = 'Best for: factual Q&A, analysis, documentation';  color = '#059669'; }
  else if (t <= 1.2) { label = '🎨 Creative';       desc = 'Best for: writing, brainstorming, chatbots';       color = '#d97706'; }
  else               { label = '🔥 High entropy';   desc = 'Best for: poetry, fiction. Risk: hallucinations increase.'; color = '#dc2626'; }

  outEl.innerHTML = `
    <div style="padding:.65rem 1rem;border-left:4px solid ${color};background:rgba(0,0,0,.04);border-radius:0 .5rem .5rem 0">
      <strong style="color:${color}">${label}</strong><br>${desc}
    </div>`;
}

/* ── Search ─────────────────────────────────────────────── */
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll('.nav-section').forEach(section => {
      let visible = 0;
      section.querySelectorAll('.nav-item').forEach(item => {
        const match = !q || item.textContent.toLowerCase().includes(q);
        item.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      if (q && visible > 0) section.classList.add('expanded');
    });
  });
}

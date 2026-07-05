/* ── Content map ─────────────────────────────────────────
   Each section can have content keyed by persona.
   Fallback: if a persona key is missing, 'default' is used.
   The actual HTML strings live in content/sections/*.js — for
   now we pull from the legacy content bridge (content/legacy.js).
   ───────────────────────────────────────────────────────── */

/* ── Active section tracking ────────────────────────────── */
let activeSectionId = null;

/* ── Navigation builder ─────────────────────────────────── */
function getSortedSections(persona) {
  const curriculum = PERSONAS[persona]?.curriculum;
  if (curriculum) {
    return curriculum.map(id => SECTIONS.find(s => s.id === id)).filter(Boolean);
  }
  return SECTIONS.filter(s => !s.personas || s.personas.includes(persona));
}

function buildNav() {
  const nav     = document.querySelector('.nav-sections');
  const persona = currentPersona || 'cadet';
  if (!nav) return;
  nav.innerHTML = '';

  getSortedSections(persona).forEach(section => {
    const wrap = document.createElement('div');
    wrap.className = 'nav-section';
    wrap.id        = `nav-${section.id}`;

    const hasContent   = typeof SECTION_CONTENT !== 'undefined' && !!SECTION_CONTENT[section.id];
    const displayTitle = section.title.replace(/^\d+\.\s*/, '');
    const soonBadge   = hasContent ? '' : '<span class="nav-badge-soon">Soon</span>';

    /* Header row: the title itself navigates to the section; the chevron
       only expands/collapses the "what's inside" preview below. These are
       two separate controls because they do two separate things — the
       previous version made every sub-topic a button that all navigated
       to the exact same page, which looked like broken/missing content. */
    const header = document.createElement('div');
    header.className = 'nav-section-header';

    const titleBtn = document.createElement('button');
    titleBtn.type      = 'button';
    titleBtn.className = 'nav-section-title-btn';
    titleBtn.innerHTML = `<span class="nav-section-title">${displayTitle}</span>${soonBadge}`;
    titleBtn.onclick   = () => loadSection(section.id);

    const toggleBtn = document.createElement('button');
    toggleBtn.type      = 'button';
    toggleBtn.className = 'nav-section-toggle';
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', `${displayTitle} — show topics covered`);
    toggleBtn.innerHTML = `<span class="chevron" aria-hidden="true">▶</span>`;
    toggleBtn.onclick   = () => {
      const expanded = wrap.classList.toggle('expanded');
      toggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };

    header.appendChild(titleBtn);
    header.appendChild(toggleBtn);

    /* Sub-topic preview — informational only, not separately clickable,
       since all of a section's content lives on one page. */
    const items = document.createElement('ul');
    items.className  = 'nav-items';
    const itemList   = section.itemsByPersona?.[persona] || section.items;
    itemList.forEach(item => {
      const li = document.createElement('li');
      li.className   = 'nav-item';
      li.textContent = item;
      items.appendChild(li);
    });

    wrap.appendChild(header);
    wrap.appendChild(items);
    nav.appendChild(wrap);
  });
}

/* ── Content loader ─────────────────────────────────────── */
function loadSection(id) {
  activeSectionId = id;

  const persona  = currentPersona || 'cadet';
  const sorted   = getSortedSections(persona);
  const currIdx  = sorted.findIndex(s => s.id === id);
  const prevSec  = sorted[currIdx - 1];
  const nextSec  = sorted[currIdx + 1];

  /* update active nav — section header only (sub-topics are non-interactive) */
  document.querySelectorAll('.nav-section-header').forEach(el => el.classList.remove('nav-section-active'));
  const navSection = document.getElementById(`nav-${id}`);
  if (navSection) {
    navSection.classList.add('expanded');
    navSection.querySelector('.nav-section-header')?.classList.add('nav-section-active');
    navSection.querySelector('.nav-section-toggle')?.setAttribute('aria-expanded', 'true');
  }

  /* resolve content */
  const html = resolveContent(id, persona);

  /* render */
  const container = document.getElementById('content-container');
  if (!container) return;

  container.innerHTML = `
    <div class="persona-banner" id="persona-banner"></div>
    <div class="section">${html}</div>
  `;

  /* remove any hardcoded static progress bars */
  container.querySelectorAll('.progress-bar').forEach(el => {
    el.nextElementSibling?.classList.contains('progress-label') &&
      el.nextElementSibling.remove();
    el.remove();
  });

  /* inject dynamic progress bar */
  const pct     = Math.round(((currIdx + 1) / sorted.length) * 100);
  const section = container.querySelector('.section');
  section.insertAdjacentHTML('afterbegin', `
    <div class="progress-bar" role="progressbar"
         aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"
         aria-label="Course progress">
      <div class="progress-fill" style="width:${pct}%"></div>
    </div>
    <p class="progress-label">Section ${currIdx + 1} of ${sorted.length}</p>
  `);

  /* inject prev / next navigation */
  const prevTitle = prevSec?.title.replace(/^\d+\.\s*/, '');
  const nextTitle = nextSec?.title.replace(/^\d+\.\s*/, '');
  section.insertAdjacentHTML('beforeend', `
    <div class="section-nav">
      ${prevSec
        ? `<button class="button button-secondary section-nav-btn" onclick="loadSection('${prevSec.id}')">← ${prevTitle}</button>`
        : '<span></span>'}
      ${nextSec
        ? `<button class="button button-primary section-nav-btn" onclick="loadSection('${nextSec.id}')">${nextTitle} →</button>`
        : '<span></span>'}
    </div>
  `);

  updatePersonaBanner();

  /* convert markdown mermaid code fences into renderable mermaid divs */
  container.querySelectorAll('pre code.language-mermaid').forEach(code => {
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = code.textContent;
    code.closest('pre').replaceWith(div);
  });

  /* re-init mermaid on new content */
  try {
    mermaid.init(undefined, '#content-container .mermaid');
  } catch (e) {
    console.error('Mermaid render failed:', e);
  }

  /* track visited section */
  if (currentPersona) {
    const key = `ai-academy-completed-${currentPersona}`;
    const visited = JSON.parse(localStorage.getItem(key) || '[]');
    if (!visited.includes(id)) {
      visited.push(id);
      localStorage.setItem(key, JSON.stringify(visited));
    }
  }

  /* close mobile sidebar */
  document.getElementById('sidebar')?.classList.remove('open');

  /* scroll top */
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Content resolver ───────────────────────────────────── */
function resolveContent(sectionId, persona) {
  if (typeof SECTION_CONTENT !== 'undefined') {
    const section = SECTION_CONTENT[sectionId];
    if (section) {
      const raw = section[persona] || section['default'] || section;
      /* Parse markdown strings; leave existing HTML blobs untouched */
      if (typeof raw === 'string' && !raw.trimStart().startsWith('<') && typeof marked !== 'undefined') {
        return marked.parse(raw);
      }
      return raw;
    }
  }
  return buildPlaceholder(sectionId, persona);
}

function buildPlaceholder(sectionId, persona) {
  const section  = SECTIONS.find(s => s.id === sectionId);
  const pData    = PERSONAS[persona];
  const title    = section?.title || sectionId;
  return `
    <h1>${title}</h1>
    <div class="concept-card">
      <div class="why-matters-box">
        <strong>Content coming soon for ${pData?.icon || ''} ${pData?.name || persona}</strong>
        <p style="margin-top:.5rem">
          We're writing this section tailored to ${pData?.name || persona}s.
          Check back soon — or <a href="index.html" style="color:var(--primary)">switch persona</a>
          to see what's already available.
        </p>
      </div>
    </div>
  `;
}

/* ── Default landing content — dashboard ────────────────── */
function buildLanding() {
  const persona = currentPersona ? PERSONAS[currentPersona] : null;
  if (!persona) return;

  const container = document.getElementById('content-container');
  if (!container) return;

  const sortedSections = getSortedSections(currentPersona);
  const firstSection   = sortedSections[0];
  const totalSections  = sortedSections.length;

  /* Read completed sections from localStorage */
  const completedKey  = `ai-academy-completed-${currentPersona}`;
  const completed     = JSON.parse(localStorage.getItem(completedKey) || '[]');
  const completedSet  = new Set(completed);
  const completedCount = completed.length;
  const pct = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  /* Find the next unvisited section */
  const nextSection = sortedSections.find(s => !completedSet.has(s.id)) || firstSection;

  /* Greeting based on time */
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  container.innerHTML = `
    <div class="persona-banner" id="persona-banner"></div>
    <div class="section">

      <!-- Hero dashboard card -->
      <div class="dashboard-hero">
        <div class="dashboard-hero-eyebrow">${persona.icon} ${persona.name} Track</div>
        <div class="dashboard-hero-greeting">${greet}, learner.</div>
        <p class="dashboard-hero-sub">${persona.description}</p>
        <div class="dashboard-stats">
          <div class="dashboard-stat">
            <div class="dashboard-stat-value">${totalSections}</div>
            <div class="dashboard-stat-label">Topics</div>
          </div>
          <div class="dashboard-stat">
            <div class="dashboard-stat-value">${completedCount}</div>
            <div class="dashboard-stat-label">Completed</div>
          </div>
          <div class="dashboard-stat">
            <div class="dashboard-stat-value">${pct}%</div>
            <div class="dashboard-stat-label">Progress</div>
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="course-progress-card">
        <div class="course-progress-header">
          <span class="course-progress-label">Overall Progress</span>
          <span class="course-progress-pct">${completedCount} / ${totalSections}</span>
        </div>
        <div class="course-progress-track">
          <div class="course-progress-fill" style="width:${pct}%"></div>
        </div>
      </div>

      <!-- Next up -->
      ${nextSection ? `
        <div class="dashboard-section-label">Continue Learning</div>
        <div class="next-lesson-card" onclick="loadSection('${nextSection.id}')" role="button" tabindex="0">
          <div>
            <div class="next-lesson-label">▶ Next up</div>
            <div class="next-lesson-title">${nextSection.title.replace(/^\d+\.\s*/, '')}</div>
            <div class="next-lesson-meta">${nextSection.items.slice(0, 3).join(' · ')}${nextSection.items.length > 3 ? ' …' : ''}</div>
          </div>
          <div class="next-lesson-arrow">→</div>
        </div>
      ` : ''}

      <!-- Learning path -->
      <div class="dashboard-section-label">Your Learning Path</div>
      <div class="dashboard-path-grid">
        ${sortedSections.slice(0, 9).map((s, i) => {
          const done = completedSet.has(s.id);
          return `
            <button type="button" class="dashboard-path-card" onclick="loadSection('${s.id}')"
                    aria-label="Go to ${s.title.replace(/^\d+\.\s*/, '')}">
              <div class="dashboard-path-card-num">${done ? '✓ Done' : `#${i + 1}`}</div>
              <div class="dashboard-path-card-title">${s.title.replace(/^\d+\.\s*/, '')}</div>
              <div class="dashboard-path-card-meta">
                <span>${s.items.length} topics</span>
              </div>
            </button>
          `;
        }).join('')}
      </div>

      ${firstSection ? `
        <button class="button button-primary" style="margin-top:.5rem" onclick="loadSection('${firstSection.id}')">
          Start learning →
        </button>
      ` : ''}

    </div>
  `;
  updatePersonaBanner();
}

/* ── App init ───────────────────────────────────────────── */
function initApp() {
  applyStoredTheme();

  mermaid.initialize({
    startOnLoad: false,
    theme: document.body.classList.contains('dark') ? 'dark' : 'default'
  });

  initPersona(); /* from persona.js — shows overlay or restores persona */
  initSearch();  /* from ui.js */
}

document.addEventListener('DOMContentLoaded', initApp);

/* ── Called after persona is set ────────────────────────── */
/* Override selectPersona to rebuild nav + show landing     */
const _originalSelect = selectPersona;
window.selectPersona = function(id) {
  _originalSelect(id);
  buildNav();
  buildLanding();
};

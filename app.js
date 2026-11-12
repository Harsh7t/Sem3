// Hash router + checklist state. Progress lives in localStorage (this browser only).
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

let done = load('sem3-done', {});
let hideDone = load('sem3-hide', false);
// Progress: localStorage always; also mirrored to progress.json when served by tools/serve.py.
let onServer = false;
const persist = () => {
  save('sem3-done', done); save('sem3-hide', hideDone);
  if (onServer) fetch('/api/progress', { method: 'PUT', body: JSON.stringify({ done, hide: hideDone }) }).catch(() => {});
};

const key = (s, u, i) => `${s.id}:${u}:${i}`;
const unitCount = (s, u) => ({ total: s.units[u].topics.length, done: s.units[u].topics.filter((_, i) => done[key(s, u, i)]).length });
const subjectCount = (s) => s.units.reduce((a, _, u) => { const c = unitCount(s, u); return { total: a.total + c.total, done: a.done + c.done }; }, { total: 0, done: 0 });
const pct = (c) => (c.total ? Math.round((c.done / c.total) * 100) : 0);
const bar = (c) => `<div class="bar" role="progressbar" aria-valuenow="${pct(c)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct(c)}%"></i></div>`;

function renderNav(current) {
  $('#nav').innerHTML = SUBJECTS.map((s) => `<a class="subject-link" href="#/${s.id}"${s.id === current ? ' aria-current="page"' : ''} title="${esc(s.name)}">${s.code}</a>`).join('');
  const all = SUBJECTS.reduce((a, s) => { const c = subjectCount(s); return { total: a.total + c.total, done: a.done + c.done }; }, { total: 0, done: 0 });
  $('#overall').textContent = `${all.done}/${all.total} done · ${pct(all)}%`;
}

function home() {
  $('#main').innerHTML = `<div class="page">
    <div class="doc-head"><h1>Semester 3</h1></div>
    <p class="lede">Pick a subject. Each one has a syllabus checklist and previous-year-question solutions, grouped by paper or by topic.</p>
    <ul class="cards">${SUBJECTS.map((s) => {
      const c = subjectCount(s);
      return `<li class="card subject-card"><div class="row"><h3>${esc(s.name)}</h3><span class="spacer"></span><span class="chip">${s.code}</span></div>
        <span class="muted">${esc(s.meta)}</span>
        <div class="row">${bar(c)}<span class="mono">${c.done}/${c.total}</span></div>
        <div class="actions"><a class="button primary" href="#/${s.id}">Checklist</a><a class="button" href="#/${s.id}/pyq">PYQ solutions</a></div></li>`;
    }).join('')}</ul></div>`;
}

function head(s, tab) {
  const c = subjectCount(s);
  return `<div class="doc-head"><h1>${esc(s.name)}</h1><span class="chip">${s.code}</span></div>
    <div class="tabs" role="navigation" aria-label="Sections">
      <a class="tab" href="#/${s.id}" ${tab === 'checklist' ? 'aria-current="page"' : ''}>Checklist<span class="chip">${c.done}/${c.total}</span></a>
      <a class="tab" href="#/${s.id}/pyq" ${tab === 'pyq' ? 'aria-current="page"' : ''}>PYQ solutions<span class="chip">${s.pyq.length}</span></a>
    </div>`;
}

function checklist(s) {
  const c = subjectCount(s);
  const units = s.units.map((u, ui) => {
    const uc = unitCount(s, ui);
    const rows = u.topics.map((t, i) => ({ t, i, on: !!done[key(s, ui, i)] })).filter((r) => !(hideDone && r.on));
    return `<details class="card unit" open data-unit="${ui}">
      <summary><h3>${esc(u.title)}</h3>
        ${u.hours ? `<span class="chip">${u.hours} hrs</span>` : ''}${u.tag ? `<span class="chip">${esc(u.tag)}</span>` : ''}
        <span class="chip${uc.done === uc.total ? ' ok' : ''}">${uc.done}/${uc.total}</span>
        <button type="button" data-all="${ui}">${uc.done === uc.total ? 'Clear unit' : 'Mark unit'}</button></summary>
      <ul class="items">${rows.length ? rows.map((r) => `<li class="item"><label><input type="checkbox" data-k="${key(s, ui, r.i)}" ${r.on ? 'checked' : ''}><span>${esc(r.t)}</span></label></li>`).join('') : '<li class="item"><label class="muted">All done here.</label></li>'}</ul>
    </details>`;
  }).join('');
  $('#main').innerHTML = `<div class="page">${head(s, 'checklist')}
    <div class="toolbar">${bar(c)}<span class="mono">${pct(c)}%</span>
      <label class="check"><input type="checkbox" id="hide" ${hideDone ? 'checked' : ''}>Hide completed</label>
      <button type="button" id="reset">Reset subject</button></div>
    <div class="units">${units}</div></div>`;
}

const EXAMS = { mid: 'Midsem', end: 'Endsem', supp: 'Supplementary', ct: 'Class test' };
const examName = (e) => EXAMS[e] || e.toUpperCase();
const yearOf = (q) => q.year || 'Year unknown';
const branchOf = (q) => (q.branch && q.branch !== 'UNKNOWN' ? q.branch : '');
const byNewest = (a, b) => b.year - a.year || a.p - b.p || a.q - b.q;

// One question: summary line + question/solution. `ctx` = what to show on the right (unit in paper view, paper in topic view).
function qCard(s, q, mode) {
  const lead = mode === 'topic' ? `${yearOf(q)} · ${examName(q.exam)}${branchOf(q) ? ' · ' + esc(branchOf(q)) : ''} · Q${esc(q.q)}` : `Q${esc(q.q)}`;
  const ctx = mode === 'topic' ? '' : `<span class="chip">${esc(s.units[q.unit].title.split(' · ')[0])}</span>`;
  return `<details class="card solution"><summary><span class="qid">${lead}</span><span class="qtopic">${esc(q.topic)}</span><span class="spacer"></span>${ctx}${q.marks !== '?' ? `<span class="chip">${esc(q.marks)} marks</span>` : ''}</summary>
    <div class="body"><h4>Question</h4><div class="qa qtext">${q.qh}</div><h4>Solution</h4><div class="qa">${q.sh}</div></div></details>`;
}

function paperView(s) {
  const papers = [...new Map(s.pyq.map((q) => [q.p, q])).values()].sort(byNewest);
  const card = (pq) => {
    const qs = s.pyq.filter((q) => q.p === pq.p);
    return `<details class="card paper"><summary><h3>${yearOf(pq)}${branchOf(pq) ? ' · ' + esc(branchOf(pq)) : ''}</h3><span class="src" title="${esc(pq.src)}">${esc(pq.src)}</span><span class="spacer"></span><span class="chip">${qs.length} Q</span></summary>
      <div class="paper-body">${qs.map((q) => qCard(s, q, 'paper')).join('')}</div></details>`;
  };
  const dated = papers.filter((q) => q.year), undated = papers.filter((q) => !q.year);
  const group = (title, list) => (list.length ? `<section class="pyq-group"><h2>${title}</h2>${list.map(card).join('')}</section>` : '');
  return Object.keys(EXAMS).concat([...new Set(dated.map((q) => q.exam))].filter((e) => !EXAMS[e]))
    .map((exam) => group(`${examName(exam)} papers`, dated.filter((q) => q.exam === exam))).join('')
    + group('Unknown year papers', undated);
}

function topicView(s) {
  return `<section class="pyq-group">${s.units.map((u, ui) => {
    const qs = s.pyq.filter((q) => q.unit === ui).sort(byNewest);
    return qs.length ? `<details class="card paper topic-unit"><summary><h3>${esc(u.title)}</h3><span class="spacer"></span><span class="chip">${qs.length} Q</span></summary>
      <div class="paper-body">${qs.map((q) => qCard(s, q, 'topic')).join('')}</div></details>` : '';
  }).join('')}</section>`;
}

function pyq(s, view) {
  const seg = (v, label) => `<a class="button${view === v ? ' primary' : ''}" href="#/${s.id}/pyq${v === 'topic' ? '/topic' : ''}" ${view === v ? 'aria-current="page"' : ''}>${label}</a>`;
  $('#main').innerHTML = `<div class="page">${head(s, 'pyq')}${s.pyq.length ? `
    <div class="toolbar"><div class="seg" role="group" aria-label="Group solutions">${seg('paper', 'Paper wise')}${seg('topic', 'Topic wise')}</div>
      <input type="search" id="find" placeholder="Search topic, keyword, year…" aria-label="Search solutions"><span class="mono" id="hits"></span></div>
    ${view === 'topic' ? topicView(s) : paperView(s)}`
    : '<div class="slot"><strong>Solutions go here</strong>No solutions added yet.</div>'}</div>`;
}

function findPyq(v) {
  v = v.trim().toLowerCase();
  const cards = [...document.querySelectorAll('.solution')];
  cards.forEach((c) => { c.hidden = !!v && !c.textContent.toLowerCase().includes(v); });
  document.querySelectorAll('.paper').forEach((g) => {
    const n = g.querySelectorAll('.solution:not([hidden])').length;
    g.hidden = !!v && !n;
    if (v) g.open = n > 0;
  });
  document.querySelectorAll('.pyq-group').forEach((g) => { g.hidden = !!v && !g.querySelector('.solution:not([hidden])'); });
  $('#hits').textContent = v ? `${cards.filter((c) => !c.hidden).length} match(es)` : '';
}

function route() {
  const [, id, tab, sub] = location.hash.split('/');
  const s = SUBJECTS.find((x) => x.id === id);
  renderNav(s?.id);
  if (!s) home(); else if (tab === 'pyq') pyq(s, sub === 'topic' ? 'topic' : 'paper'); else checklist(s);
  document.title = s ? `${s.code} · SEM3 Prep` : 'SEM3 Prep';
}

// After a change, re-render but keep scroll position and unit open/closed state.
function refresh() {
  const main = $('#main'), top = main.scrollTop;
  const closed = [...document.querySelectorAll('.unit:not([open])')].map((d) => d.dataset.unit);
  route();
  closed.forEach((u) => document.querySelector(`.unit[data-unit="${u}"]`)?.removeAttribute('open'));
  main.scrollTop = top;
}

document.addEventListener('input', (e) => { if (e.target.id === 'find') findPyq(e.target.value); });

document.addEventListener('change', (e) => {
  if (e.target.id === 'hide') { hideDone = e.target.checked; persist(); return refresh(); }
  const k = e.target.dataset?.k;
  if (!k) return;
  if (e.target.checked) done[k] = true; else delete done[k];
  persist();
  refresh();
});

document.addEventListener('click', (e) => {
  const s = SUBJECTS.find((x) => x.id === location.hash.split('/')[1]);
  if (!s) return;
  const all = e.target.closest('[data-all]');
  if (all) {
    e.preventDefault();
    const u = +all.dataset.all, c = unitCount(s, u);
    s.units[u].topics.forEach((_, i) => { if (c.done === c.total) delete done[key(s, u, i)]; else done[key(s, u, i)] = true; });
    persist(); refresh();
  } else if (e.target.id === 'reset' && confirm(`Clear all progress for ${s.code}?`)) {
    Object.keys(done).filter((k) => k.startsWith(s.id + ':')).forEach((k) => delete done[k]);
    persist(); refresh();
  }
});

$('#theme').addEventListener('click', () => {
  const dark = getComputedStyle(document.documentElement).colorScheme === 'dark';
  document.documentElement.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('sem3-theme', document.documentElement.dataset.theme); } catch {}
});

addEventListener('hashchange', route);
fetch('/api/progress').then((r) => (r.ok ? r.json() : Promise.reject())).then((d) => {
  onServer = true; $('#saved').textContent = 'Progress is saved on this computer (progress.json)';
  if (d.done) { done = d.done; hideDone = !!d.hide; save('sem3-done', done); save('sem3-hide', hideDone); } else persist(); // first run: upload what this browser already had
}).catch(() => {}).finally(route);

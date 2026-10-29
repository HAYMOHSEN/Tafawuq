/* Tafawuq English — core: content registry, utilities, storage, SRS, speech. */
(function () {
  'use strict';
  const TAF = window.TAF = window.TAF || {};
  TAF.version = '1.0.0';
  TAF.config = { support: 'haymohsen@gmail.com', app: 'Tafawuq English' };
  TAF.units = [];
  TAF.byId = {};
  TAF.qIndex = {};      // qid -> {q, unit, topic, section}
  TAF.topics = {};      // topic key -> {label, unit}

  /* ---------- content registry ---------- */
  TAF.contentErrors = [];
  TAF.unit = function (u) {
    try { registerUnit(u); } catch (e) {
      TAF.contentErrors.push((u && u.id || '?') + ': ' + (e && e.message));
      if (u && TAF.byId[u.id] === u) { delete TAF.byId[u.id]; TAF.units = TAF.units.filter(x => x !== u); }
    }
  };
  function registerUnit(u) {
    if (TAF.byId[u.id]) return;
    TAF.units.push(u);
    TAF.byId[u.id] = u;
    const reg = (q, id, topic, section) => {
      q.id = id; q.topic = topic; q.unit = u.id; q.section = section;
      TAF.qIndex[id] = q;
    };
    TAF.topics['vocab:' + u.id] = { label: 'مفردات الوحدة ' + u.n, unit: u.id, kind: 'vocab' };
    TAF.topics['reading:' + u.id] = { label: 'القراءة — الوحدة ' + u.n, unit: u.id, kind: 'reading' };
    TAF.topics['speaking:' + u.id] = { label: 'التعبيرات الشفوية — الوحدة ' + u.n, unit: u.id, kind: 'speaking' };
    TAF.topics['writing:' + u.id] = { label: 'الكتابة — الوحدة ' + u.n, unit: u.id, kind: 'writing' };
    (u.grammar || []).forEach(g => {
      TAF.topics[g.id] = { label: g.title, ar: g.ar, unit: u.id, kind: 'grammar' };
      (g.qs || []).forEach((q, i) => reg(q, g.id + '#' + i, g.id, 'grammar'));
    });
    if (u.reading) (u.reading.qs || []).forEach((q, i) => reg(q, u.id + '-rd#' + i, 'reading:' + u.id, 'reading'));
    (u.test || []).forEach((q, i) => {
      const k = q.k || 'vocab';
      const topic = TAF.topics[k] ? k : (k + ':' + u.id);
      reg(q, u.id + '-t#' + i, topic, 'test');
    });
    (u.vocab || []).forEach(v => { v.id = u.id + ':' + v.w; v.unit = u.id; });
  }
  TAF.extras = [];
  TAF.extra = function (x) { TAF.extras.push(x); };

  TAF.unitsFor = grade => TAF.units.filter(u => u.grade === grade).sort((a, b) => a.n - b.n);
  TAF.allVocab = grade => TAF.unitsFor(grade).flatMap(u => u.vocab || []);

  /* ---------- utils ---------- */
  const U = TAF.util = {};
  U.$ = (sel, root) => (root || document).querySelector(sel);
  U.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  U.esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const LATIN_RUN = /\(?[A-Za-z][A-Za-z0-9'’.,!?;:()\/\-–—+%&*=\s]*[A-Za-z0-9.!?)%'’]|\(?[A-Za-z]/g;
  // wrap each English run in <bdi> (keeping parentheses balanced) so mixed Arabic/English lines display correctly
  function bidiWrap(seg) {
    let out = '', last = 0, m;
    LATIN_RUN.lastIndex = 0;
    while ((m = LATIN_RUN.exec(seg))) {
      let end = m.index + m[0].length, txt = m[0];
      const open = (txt.match(/\(/g) || []).length, close = (txt.match(/\)/g) || []).length;
      if (open > close && seg[end] === ')') { txt += ')'; end++; LATIN_RUN.lastIndex = end; }
      out += seg.slice(last, m.index) + '\u0001bdi class="en"\u0002' + txt + '\u0001/bdi\u0002';
      last = end;
    }
    return out + seg.slice(last);
  }
  // Inline markup: **bold**, ==mark==, and isolate Latin runs inside Arabic text.
  U.md = function (s, opts) {
    let t = U.esc(s);
    const isAr = /[؀-ۿ]/.test(s || '');
    t = t.replace(/\*\*(.+?)\*\*/g, '\u0001b\u0002$1\u0001/b\u0002').replace(/==(.+?)==/g, '\u0001mark\u0002$1\u0001/mark\u0002');
    if (isAr && !(opts && opts.noBidi)) t = t.split(/(\u0001[^\u0002]*\u0002)/).map(seg => seg.charAt(0) === '\u0001' ? seg : bidiWrap(seg)).join('');
    return t.replace(/\u0001/g, '<').replace(/\u0002/g, '>').replace(/&lt;br&gt;/g, '<br>');
  };
  U.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  U.sample = (a, n) => U.shuffle(a).slice(0, n);
  U.pad = n => String(n).padStart(2, '0');
  U.today = () => { const d = new Date(); return d.getFullYear() + '-' + U.pad(d.getMonth() + 1) + '-' + U.pad(d.getDate()); };
  U.dayDiff = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 864e5);
  U.words = s => (s || '').trim().split(/\s+/).filter(Boolean).length;
  U.fmtTime = sec => { sec = Math.max(0, Math.round(sec)); const m = Math.floor(sec / 60), s = sec % 60; return m + ':' + U.pad(s); };
  U.arNum = n => String(n);
  // Arabic counted nouns: 1 → singular, 2 → dual, 3–10 → plural, 11+ → singular accusative
  U.arN = (n, f) => n === 1 ? f.one : n === 2 ? f.two : (n >= 3 && n <= 10) ? n + ' ' + f.few : n + ' ' + f.many;
  U.AR = {
    day: { one: 'يوم واحد', two: 'يومان', few: 'أيام', many: 'يوماً' },
    answer: { one: 'إجابة واحدة', two: 'إجابتان', few: 'إجابات', many: 'إجابة' },
    word: { one: 'كلمة واحدة', two: 'كلمتان', few: 'كلمات', many: 'كلمة' },
    section: { one: 'قسم واحد', two: 'قسمان', few: 'أقسام', many: 'قسماً' },
    point: { one: 'نقطة واحدة', two: 'نقطتان', few: 'نقاط', many: 'نقطة' },
    card: { one: 'بطاقة واحدة', two: 'بطاقتان', few: 'بطاقات', many: 'بطاقة' },
    question: { one: 'سؤال واحد', two: 'سؤالان', few: 'أسئلة', many: 'سؤالاً' }
  };

  // Answer normalisation for typed answers
  const CONTR = [[/\bcan't\b/g, 'cannot'], [/\bcan not\b/g, 'cannot'], [/\bwon't\b/g, 'will not'], [/\bshan't\b/g, 'shall not'], [/\bain't\b/g, 'is not'],
    [/n't\b/g, ' not'], [/'m\b/g, ' am'], [/'re\b/g, ' are'], [/'ve\b/g, ' have'], [/'ll\b/g, ' will']];
  U.norm = function (s) {
    let t = String(s || '').toLowerCase()
      .replace(/[‘’ʼ`´]/g, "'").replace(/[“”]/g, '"')
      .replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
    CONTR.forEach(([re, r]) => { t = t.replace(re, r); });
    t = t.replace(/["“”]/g, '').replace(/[,;:]/g, ' ').replace(/\s*([.!?])+\s*$/g, '').replace(/\s+([.!?])/g, '$1').replace(/\s+/g, ' ').trim();
    return t;
  };
  U.matches = (input, answers) => { const n = U.norm(input); return !!n && (answers || []).some(a => U.norm(a) === n); };
  // tolerant check: allows one small typo for answers longer than 6 chars
  U.lev = function (a, b) {
    if (a === b) return 0; const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, i) => i), cur = new Array(n + 1);
    for (let i = 1; i <= m; i++) { cur[0] = i; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); [prev, cur] = [cur, prev]; }
    return prev[n];
  };
  U.closeMatch = (input, answers) => { const n = U.norm(input); return (answers || []).some(a => { const t = U.norm(a); return t.length > 6 && U.lev(n, t) === 1; }); };

  U.toast = function (msg, ms) {
    let el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show');
    clearTimeout(U._tt); U._tt = setTimeout(() => el.classList.remove('show'), ms || 2200);
  };
  U.download = function (name, text, type) {
    const blob = new Blob([text], { type: type || 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  /* ---------- icons (inline SVG, stroke-based) ---------- */
  const I = (p, extra) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra || ''}>${p}</svg>`;
  TAF.icon = {
    home: I('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>'),
    book: I('<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5V4.5"/><path d="M8 7h8M8 11h6"/>'),
    practice: I('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
    exam: I('<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="9" cy="8.5" r="1.4"/><circle cx="9" cy="13" r="1.4"/><path d="M13 8.5h4M13 13h4M8 17.5h8"/>'),
    more: I('<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>'),
    speaker: I('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>'),
    search: I('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    chevron: I('<path d="m15 18-6-6 6-6"/>'),
    back: I('<path d="m9 18 6-6-6-6"/>'),
    check: I('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    x: I('<path d="M6 6l12 12M18 6 6 18"/>'),
    bulb: I('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'),
    alert: I('<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17.5v.5"/>'),
    star: I('<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>'),
    cards: I('<rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/>'),
    target: I('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
    ear: I('<path d="M7 10a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0"/><path d="M10 10a2 2 0 0 1 4 0"/>'),
    notebook: I('<rect x="5" y="3" width="15" height="18" rx="2"/><path d="M5 7H3M5 12H3M5 17H3M10 8h6M10 12h6"/>'),
    shuffle: I('<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="m15 15 6 6M4 4l5 5"/>'),
    clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    print: I('<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>'),
    moon: I('<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>'),
    gear: I('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    chart: I('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    sheet: I('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>'),
    pen: I('<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/>'),
    chat: I('<path d="M4 5h16v11H9l-5 4z"/>'),
    flame: I('<path d="M12 21c-4 0-7-2.6-7-6.5 0-3 2-5 3.5-6.5.3 1.7 1.2 2.7 2.2 3.2C10.5 8 12 5 14.5 3c.2 3 1.7 4.5 3 6 1.2 1.4 1.5 2.8 1.5 4.5 0 4-3 7.5-7 7.5z"/>')
  };

  /* ---------- storage (hardened: safe access, daily snapshots, recovery, merge) ---------- */
  const KEY = 'tafawuq.v1';
  const SNAPS = ['tafawuq.snap1', 'tafawuq.snap2', 'tafawuq.snap3'];
  const mem = {};
  const ls = {
    ok: false,
    probe() { try { localStorage.setItem('__tafawuq_probe', '1'); localStorage.removeItem('__tafawuq_probe'); this.ok = true; } catch (e) { this.ok = false; } return this.ok; },
    get(k) { if (this.ok) { try { return localStorage.getItem(k); } catch (e) { /* fall back to memory */ } } return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; },
    set(k, v) {
      if (this.ok) { try { localStorage.setItem(k, v); return true; } catch (e) { store.lastError = e && /quota/i.test(e.name + e.message) ? 'quota' : 'write'; } }
      mem[k] = v; return false;
    },
    del(k) { if (this.ok) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } } delete mem[k]; }
  };
  ls.probe();

  const fresh = () => ({
    v: 2,
    settings: { grade: 11, examDate: '', theme: 'auto', rate: 0.92, voice: '', fs: 1, newPerDay: 12, name: '', goal: 20, sound: true, haptics: true, celebrate: true, motion: 'auto', immersion: false, onboarded: false },
    q: {}, topics: {}, mistakes: {}, srs: {}, done: {}, tests: {}, exams: [], drafts: {}, checks: {},
    xp: 0, badges: {}, log: {}, cnt: {}, stars: {}, hl: {}, printPrefs: {},
    streak: { last: '', count: 0 }, daily: { date: '', answered: 0, reviewed: 0, newToday: 0, goalHit: false },
    meta: { snapDay: '', lastExport: 0 }, savedAt: 0, created: Date.now()
  });
  const isObj = x => x && typeof x === 'object' && !Array.isArray(x);
  function normalise(o) {
    const base = fresh();
    if (!isObj(o)) return base;
    for (const k in base) {
      if (o[k] === undefined || o[k] === null || Array.isArray(o[k]) !== Array.isArray(base[k]) || (typeof base[k] !== 'object' && typeof o[k] !== typeof base[k]) || (isObj(base[k]) && !isObj(o[k]))) o[k] = base[k];
    }
    ['settings', 'streak', 'daily', 'meta'].forEach(g => { for (const k in base[g]) if (o[g][k] === undefined) o[g][k] = base[g][k]; });
    o.v = 2;
    return o;
  }
  let notice = null;     // 'restored' | 'corrupt' — shown once by the app shell
  function load() {
    const raw = ls.get(KEY);
    if (raw == null) return fresh();
    try { return normalise(JSON.parse(raw)); } catch (e) {
      ls.set('tafawuq.corrupt.' + Date.now(), raw);          // keep the damaged copy so it can be sent for support
      for (const k of SNAPS) { try { const o = JSON.parse(ls.get(k)); if (isObj(o)) { notice = 'restored'; return normalise(o); } } catch (e2) { /* try next */ } }
      notice = 'corrupt'; return fresh();
    }
  }
  let S = load();

  const listeners = [];
  let saveT = null;
  function persist() {
    clearTimeout(saveT); saveT = null;
    S.savedAt = Date.now();
    const t = U.today();
    if (S.meta.snapDay !== t) {            // one rolling snapshot per day: the state as it was before today's first save
      const prev = ls.get(KEY);
      if (prev) { const s1 = ls.get(SNAPS[0]), s2 = ls.get(SNAPS[1]); if (s2) ls.set(SNAPS[2], s2); if (s1) ls.set(SNAPS[1], s1); ls.set(SNAPS[0], prev); }
      S.meta.snapDay = t;
    }
    const json = JSON.stringify(S);
    if (!ls.set(KEY, json) && store.lastError === 'quota') { SNAPS.forEach(k => ls.del(k)); ls.set(KEY, json); }
  }
  function mergeStates(a, b) {
    const out = normalise(JSON.parse(JSON.stringify(a))), inc = normalise(JSON.parse(JSON.stringify(b)));
    out.xp = Math.max(out.xp, inc.xp);
    if ((inc.streak.last || '') > (out.streak.last || '') || (inc.streak.last === out.streak.last && inc.streak.count > out.streak.count)) out.streak = inc.streak;
    const unionMin = k => { for (const id in inc[k]) if (!out[k][id] || inc[k][id] < out[k][id]) out[k][id] = inc[k][id]; };
    ['done', 'badges'].forEach(unionMin);
    for (const id in inc.tests) out.tests[id] = Math.max(out.tests[id] || 0, inc.tests[id]);
    for (const id in inc.stars) if (!out.stars[id]) out.stars[id] = inc.stars[id];
    for (const id in inc.hl) { const set = new Set([...(out.hl[id] || []), ...inc.hl[id]]); out.hl[id] = [...set]; }
    for (const id in inc.mistakes) if (!out.mistakes[id] || inc.mistakes[id].n > out.mistakes[id].n) out.mistakes[id] = inc.mistakes[id];
    for (const id in inc.srs) if (!out.srs[id] || (inc.srs[id].reps || 0) > (out.srs[id].reps || 0)) out.srs[id] = inc.srs[id];
    const bigger = (x, y) => (y.r + y.w) > ((x && (x.r + x.w)) || 0);
    for (const id in inc.q) if (bigger(out.q[id], inc.q[id])) out.q[id] = inc.q[id];
    for (const id in inc.topics) if (bigger(out.topics[id], inc.topics[id])) out.topics[id] = inc.topics[id];
    const seen = new Set(out.exams.map(x => x.t));
    out.exams = out.exams.concat(inc.exams.filter(x => !seen.has(x.t))).sort((p, q) => q.t - p.t).slice(0, 60);
    for (const id in inc.drafts) if ((inc.drafts[id] || '').length > (out.drafts[id] || '').length) out.drafts[id] = inc.drafts[id];
    for (const id in inc.checks) out.checks[id] = (out.checks[id] || []).map((v, i) => v || (inc.checks[id] || [])[i]).concat((inc.checks[id] || []).slice((out.checks[id] || []).length));
    for (const d in inc.log) { const x = out.log[d] || { q: 0, xp: 0 }; out.log[d] = { q: Math.max(x.q, inc.log[d].q || 0), xp: Math.max(x.xp, inc.log[d].xp || 0) }; }
    for (const k in inc.cnt) out.cnt[k] = Math.max(out.cnt[k] || 0, inc.cnt[k] || 0);
    out.created = Math.min(out.created, inc.created);
    return out;
  }
  const store = TAF.store = {
    get s() { return S; },
    get notice() { const n = notice; return n; },
    clearNotice() { notice = null; },
    lastError: null,
    get persistent() { return ls.ok; },
    persistGranted: null,
    on(fn) { listeners.push(fn); },
    emit(ev) { listeners.forEach(fn => { try { fn(ev); } catch (e) { /* ignore */ } }); },
    save() { if (saveT) return; saveT = setTimeout(persist, 150); },
    saveNow() { persist(); },
    reset() { S = fresh(); persist(); },
    requestPersist() { try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().then(g => { store.persistGranted = g; }, () => { }); } catch (e) { /* ignore */ } },
    estimate() { try { return navigator.storage && navigator.storage.estimate ? navigator.storage.estimate() : Promise.resolve(null); } catch (e) { return Promise.resolve(null); } },
    bytes() { const v = ls.get(KEY); return v ? v.length : 0; },
    snapshots() {
      return SNAPS.map(k => { try { const o = JSON.parse(ls.get(k)); return isObj(o) ? { key: k, savedAt: o.savedAt || 0, xp: o.xp || 0, answers: Object.keys(o.q || {}).length, words: Object.values(o.srs || {}).filter(c => c.reps > 0).length } : null; } catch (e) { return null; } }).filter(Boolean);
    },
    restoreSnapshot(key) { const o = JSON.parse(ls.get(key)); if (!isObj(o)) throw new Error('bad snapshot'); persist(); const keep = ls.get(KEY); ls.set('tafawuq.beforeRestore', keep); S = normalise(o); persist(); store.emit('external'); },
    export() { S.meta.lastExport = Date.now(); persist(); return JSON.stringify({ app: 'tafawuq', v: 2, at: new Date().toISOString(), data: S }); },
    inspect(text) {
      const o = JSON.parse(text);
      const d = o && o.app === 'tafawuq' && isObj(o.data) ? o.data : null;
      if (!d) throw new Error('bad file');
      const n = normalise(d);
      return { savedAt: n.savedAt || (o.at ? Date.parse(o.at) : 0), xp: n.xp, answers: Object.keys(n.q).length, words: Object.values(n.srs).filter(c => c.reps > 0).length, streak: n.streak.count, data: n };
    },
    import(text, mode) {
      const info = store.inspect(text);
      persist(); ls.set('tafawuq.beforeImport', ls.get(KEY));          // safety copy of what was there
      S = mode === 'merge' ? mergeStates(S, info.data) : normalise(info.data);
      persist(); store.emit('external');
      return info;
    },
    rollDay() {
      const t = U.today();
      if (S.daily.date !== t) S.daily = { date: t, answered: 0, reviewed: 0, newToday: 0, goalHit: false };
    },
    touchStreak() {
      const t = U.today();
      if (S.streak.last === t) return;
      const gap = S.streak.last ? U.dayDiff(S.streak.last, t) : 99;
      S.streak.count = gap === 1 ? S.streak.count + 1 : 1;
      S.streak.last = t;
      if (TAF.game && TAF.game.onStreak) TAF.game.onStreak(S.streak.count);
    },
    // record an answer to a question
    answer(q, ok) {
      if (!q || !q.id) return;
      store.rollDay(); store.touchStreak();
      const r = S.q[q.id] || (S.q[q.id] = { r: 0, w: 0, s: 0, t: 0 });
      const knewBefore = r.r > 0;
      if (ok) { r.r++; r.s++; } else { r.w++; r.s = 0; }
      r.t = Date.now();
      const tp = S.topics[q.topic] || (S.topics[q.topic] = { r: 0, w: 0 });
      ok ? tp.r++ : tp.w++;
      if (!ok) S.mistakes[q.id] = { t: Date.now(), n: ((S.mistakes[q.id] || {}).n || 0) + 1 };
      else if (S.mistakes[q.id] && r.s >= 2) { delete S.mistakes[q.id]; S.cnt.cleared = (S.cnt.cleared || 0) + 1; }
      S.daily.answered++;
      if (TAF.game) { if (ok) TAF.game.xp(knewBefore ? 3 : 10); if (TAF.game.afterAnswer) TAF.game.afterAnswer(); }
      store.save();
    },
    markDone(key) { const first = !S.done[key]; S.done[key] = S.done[key] || Date.now(); store.save(); if (first && TAF.game && TAF.game.queueCheck) TAF.game.queueCheck(); return first; },
    isDone(key) { return !!S.done[key]; },
    topicAcc(key) { const t = S.topics[key]; if (!t || t.r + t.w === 0) return null; return t.r / (t.r + t.w); }
  };
  // never lose progress: flush when the page is hidden or closed; adopt newer data written by another tab
  const flush = () => { if (saveT) persist(); };
  window.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') return flush();
    const v = ls.get(KEY);
    try { const o = v && JSON.parse(v); if (o && (o.savedAt || 0) > (S.savedAt || 0)) { S = normalise(o); store.emit('external'); } } catch (e) { /* ignore */ }
  });
  window.addEventListener('storage', e => {
    if (e.key !== KEY || !e.newValue) return;
    try { const o = normalise(JSON.parse(e.newValue)); if ((o.savedAt || 0) > (S.savedAt || 0)) { S = o; store.emit('external'); } } catch (err) { /* ignore */ }
  });
  store.requestPersist();

  /* ---------- my words (starred by the learner) ---------- */
  TAF.words = {
    key: (unit, w) => unit + ':' + String(w).toLowerCase().trim(),
    has: key => !!S.stars[key],
    toggle(item) { // item: {key, w, ar, ex, unit}
      if (S.stars[item.key]) { delete S.stars[item.key]; store.save(); return false; }
      S.stars[item.key] = { w: item.w, ar: item.ar || '', ex: item.ex || '', unit: item.unit || '', t: Date.now() };
      store.save(); return true;
    },
    list: () => Object.keys(S.stars).map(key => Object.assign({ key }, S.stars[key])).sort((a, b) => b.t - a.t)
  };
  // gamification hooks — real implementation lives in gamify.js (loaded later); safe no-ops until then
  TAF.game = TAF.game || { xp() {}, check() {}, celebrate() {}, sfx() {}, holdOn() {}, holdOff() {}, queueCheck() {} };

  /* ---------- spaced repetition (SM-2 lite) ---------- */
  TAF.srs = {
    state(id) { return S.srs[id]; },
    isDue(id) { const c = S.srs[id]; return c && c.due <= U.today(); },
    rate(id, grade) { // grade: 0 again, 1 hard, 2 good, 3 easy
      store.rollDay(); store.touchStreak();
      const isNew = !S.srs[id];
      const c = S.srs[id] || { ef: 2.5, ivl: 0, reps: 0, lapses: 0 };
      if (grade === 0) { c.reps = 0; c.ivl = 0; c.lapses++; c.ef = Math.max(1.3, c.ef - 0.2); }
      else {
        c.reps++;
        if (c.reps === 1) c.ivl = grade === 3 ? 3 : 1;
        else if (c.reps === 2) c.ivl = grade === 1 ? 2 : grade === 3 ? 6 : 4;
        else c.ivl = Math.round(c.ivl * (grade === 1 ? 1.2 : grade === 3 ? c.ef * 1.3 : c.ef));
        c.ef = Math.max(1.3, c.ef + (grade === 1 ? -0.15 : grade === 3 ? 0.15 : 0));
      }
      const d = new Date(); d.setDate(d.getDate() + c.ivl);
      c.due = d.getFullYear() + '-' + U.pad(d.getMonth() + 1) + '-' + U.pad(d.getDate());
      S.srs[id] = c;
      if (isNew) S.daily.newToday++;
      S.daily.reviewed++;
      if (TAF.game) TAF.game.xp([0, 2, 4, 5][grade] + (isNew ? 3 : 0));
      store.save();
      return c;
    },
    dueCards(grade) { return TAF.allVocab(grade).filter(v => TAF.srs.isDue(v.id)); },
    newCards(grade) {
      // new cards come from units the learner has opened, in book order
      const opened = TAF.unitsFor(grade).filter(u => S.done['open:' + u.id]);
      const pool = (opened.length ? opened : TAF.unitsFor(grade).slice(0, 1)).flatMap(u => u.vocab || []);
      return pool.filter(v => !S.srs[v.id]);
    },
    learnedCount(unit) { return (unit.vocab || []).filter(v => S.srs[v.id] && S.srs[v.id].reps > 0).length; }
  };

  /* ---------- speech ---------- */
  const tts = TAF.tts = {
    ok: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    voices: [],
    load() {
      if (!tts.ok) return;
      const pick = () => {
        tts.voices = speechSynthesis.getVoices().filter(v => /^en(-|_|$)/i.test(v.lang));
      };
      pick();
      if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', pick);
    },
    // "Natural"/"online" voices sound best but need the internet; with no connection fall back to a voice stored on the device
    isLocal: v => !v || v.localService !== false,
    voice() {
      const want = S.settings.voice;
      const vs = tts.voices;
      const online = typeof navigator === 'undefined' || navigator.onLine !== false;
      const local = vs.filter(tts.isLocal);
      const pool = online || !local.length ? vs : local;
      const chosen = vs.find(v => v.name === want);
      if (chosen && (online || tts.isLocal(chosen))) return chosen;
      return pool.find(v => /en-GB/i.test(v.lang) && /natural|online|neural/i.test(v.name)) || pool.find(v => /en-GB/i.test(v.lang)) || pool.find(v => /en-US/i.test(v.lang)) || pool[0] || null;
    },
    speak(text, btn, rate) {
      if (!tts.ok) { U.toast('النطق غير مدعوم في هذا المتصفح'); return; }
      speechSynthesis.cancel();
      U.$$('.speak.playing').forEach(b => b.classList.remove('playing'));
      const u = new SpeechSynthesisUtterance(String(text).replace(/==|\*\*/g, '').replace(/_{2,}/g, 'blank'));
      const v = tts.voice();
      if (v) u.voice = v; u.lang = v ? v.lang : 'en-GB';
      u.rate = rate || S.settings.rate || 0.92;
      if (btn) { btn.classList.add('playing'); u.onend = u.onerror = () => btn.classList.remove('playing'); }
      speechSynthesis.speak(u);
      return u;
    },
    stop() { if (tts.ok) speechSynthesis.cancel(); }
  };
  tts.load();
  TAF.speakBtn = (text, label) => `<button class="speak" type="button" data-say="${U.esc(text)}" aria-label="${U.esc(label || 'استمع')}" title="استمع">${TAF.icon.speaker}</button>`;
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-say]');
    if (b) { e.preventDefault(); e.stopPropagation(); tts.speak(b.getAttribute('data-say'), b); }
  });
})();

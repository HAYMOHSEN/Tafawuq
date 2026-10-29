#!/usr/bin/env node
// Content-level grading test: loads every unit in a fake browser, feeds each question its own correct answer
// (and several wrong ones) through the real grading function, and fails on any disagreement.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..', '..');
const listeners = {};
const doc = { addEventListener(t, f) { (listeners[t] = listeners[t] || []).push(f); }, getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; }, createElement() { return { style: {}, classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, appendChild() {}, remove() {} }; }, body: { appendChild() {} }, documentElement: { classList: { add() {}, remove() {} }, style: { setProperty() {} }, dataset: {} }, visibilityState: 'visible' };
const store = {};
const win = { document: doc, localStorage: { getItem: k => (k in store ? store[k] : null), setItem(k, v) { store[k] = String(v); }, removeItem(k) { delete store[k]; } }, addEventListener() {}, matchMedia: () => ({ matches: false, addEventListener() {} }), navigator: { storage: {} }, innerWidth: 400, innerHeight: 800, location: { hash: '' } };
win.window = win; win.self = win;
const ctx = vm.createContext(Object.assign(win, { console, setTimeout, clearTimeout, setInterval, clearInterval, requestAnimationFrame: f => 0, performance: { now: () => 0 }, Date, Math, JSON, Object, Array, String, Number, Set, Map, RegExp, Promise, Error, URL, Blob: function () {}, navigator: win.navigator }));
const load = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
const args = process.argv.slice(2);
if (args.length) { ['js/core.js', 'js/ui.js'].forEach(load); args.forEach(f => vm.runInContext(fs.readFileSync(path.resolve(f), 'utf8'), ctx, { filename: f })); ['js/gamify.js', 'js/quiz.js'].forEach(load); }
else ['js/core.js', 'js/ui.js', 'data/content.js', 'js/gamify.js', 'js/quiz.js'].forEach(load);
const TAF = win.TAF;
let bad = 0, checked = 0;
const fail = (q, m) => { bad++; console.log(`✗ ${q.id}: ${m}`); };
const tok = s => String(s).split(/\s+/).filter(Boolean);
for (const id in TAF.qIndex) {
  const q = TAF.qIndex[id]; checked++;
  const G = TAF.Quiz.grade;
  switch (q.t) {
    case 'mcq':
      q.o.forEach((_, i) => { const ok = G(q, { resp: i }); if (ok !== (i === q.a)) fail(q, `option ${i} graded ${ok}`); });
      break;
    case 'tf': [true, false].forEach(v => { if (G(q, { resp: v }) !== (v === q.a)) fail(q, 'tf grading'); }); break;
    case 'gap': case 'find': case 'tr':
      q.a.forEach(a => { if (!G(q, { resp: a })) fail(q, `accepted answer rejected: "${a}"`); });
      if (G(q, { resp: '' })) fail(q, 'empty answer accepted');
      if (G(q, { resp: 'zzz qqq' })) fail(q, 'nonsense accepted');
      break;
    case 'err':
      if (!G(q, { resp: q.w })) fail(q, 'correct token rejected');
      tok(q.q).forEach(t => { const same = t.toLowerCase().replace(/^[^\w']+|[^\w']+$/g, '') === q.w.toLowerCase().replace(/^[^\w']+|[^\w']+$/g, ''); if (!same && G(q, { resp: t })) fail(q, `wrong token accepted: ${t}`); });
      if (!tok(q.q).some(t => t.toLowerCase().replace(/^[^\w']+|[^\w']+$/g, '') === q.w.toLowerCase())) fail(q, 'target word not in sentence');
      break;
    case 'order': {
      const w = tok(q.a); const st = { orderWords: w, resp: w.map((_, i) => i) };
      if (!G(q, st)) fail(q, 'correct order rejected');
      if (w.length > 2) { const rev = { orderWords: w, resp: w.map((_, i) => i).reverse() }; if (w.slice().reverse().join(' ') !== w.join(' ') && G(q, rev)) fail(q, 'reverse order accepted'); }
      break;
    }
    case 'open': if (!q.m) fail(q, 'no model answer'); break;
    default: fail(q, 'unknown type ' + q.t);
  }
  // mcq quality: options unique, answer index valid, blank count
  if (q.t === 'mcq') {
    if (new Set(q.o.map(x => x.trim().toLowerCase())).size !== q.o.length) fail(q, 'duplicate options');
    if (!q.x) fail(q, 'no explanation');
  }
}
console.log(`${checked} questions checked across ${TAF.units.length} units — ${bad ? bad + ' PROBLEM(S)' : 'all grading checks passed'}`);
process.exit(bad ? 1 : 0);

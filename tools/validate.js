#!/usr/bin/env node
// Validates unit content files. Usage: node tools/validate.js [data/units/g11u2.js ...]
// With no args, validates every file in data/units.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
let files = process.argv.slice(2);
if (!files.length) {
  const dir = path.join(root, 'data/units');
  files = fs.readdirSync(dir).filter(f => /^g1[12]u\d+\.js$/.test(f)).sort().map(f => path.join(dir, f));
  const xd = path.join(root, 'data/extras');
  if (fs.existsSync(xd)) files = files.concat(fs.readdirSync(xd).filter(f => f.endsWith('.js')).sort().map(f => path.join(xd, f)));
}

const wc = s => (s || '').trim().split(/\s+/).filter(Boolean).length;
const tokens = s => s.replace(/[“”"]/g, '').split(/\s+/).map(t => t.replace(/^[^\w']+|[^\w']+$/g, '')).filter(Boolean);
let totalErr = 0, totalWarn = 0;

function makeCheckQ(E, W) {
  return (q, where, needX) => {
    const T = q.t;
    if (!q || !T) return E(`${where}: missing t`);
    if (needX && !q.x) W(`${where}: no explanation x`);
    switch (T) {
      case 'mcq':
        if (!q.q) E(`${where}: mcq missing q`);
        if (!Array.isArray(q.o) || q.o.length < 3 || q.o.length > 4) E(`${where}: mcq needs 3–4 options`);
        else {
          if (new Set(q.o.map(s => s.trim().toLowerCase())).size !== q.o.length) E(`${where}: duplicate options`);
          if (!Number.isInteger(q.a) || q.a < 0 || q.a >= q.o.length) E(`${where}: mcq a out of range`);
        }
        break;
      case 'gap':
        if (!q.q || (q.q.match(/_{4}/g) || []).length !== 1) E(`${where}: gap q must contain exactly one ____`);
        if (/_{5,}/.test(q.q || '')) E(`${where}: use exactly 4 underscores`);
        if (!Array.isArray(q.a) || !q.a.length) E(`${where}: gap a must be non-empty array`);
        break;
      case 'find':
        if (!q.q) E(`${where}: find missing q`);
        if (!Array.isArray(q.a) || !q.a.length) E(`${where}: find a must be non-empty array`);
        break;
      case 'tf':
        if (!q.q || typeof q.a !== 'boolean') E(`${where}: tf needs q and boolean a`);
        break;
      case 'tr':
        if (!q.q || !q.p) E(`${where}: tr needs q and p`);
        if (!Array.isArray(q.a) || !q.a.length) E(`${where}: tr a must be non-empty array`);
        break;
      case 'err': {
        if (!q.q || !q.w || !q.c) E(`${where}: err needs q, w, c`);
        else {
          const toks = tokens(q.q).map(t => t.toLowerCase());
          if (/\s/.test(q.w.trim())) E(`${where}: err w must be a single token`);
          else if (!toks.includes(q.w.toLowerCase().replace(/^[^\w']+|[^\w']+$/g, ''))) E(`${where}: err w "${q.w}" not found as a token in q`);
          else if (toks.filter(t => t === q.w.toLowerCase()).length > 1) W(`${where}: err w "${q.w}" appears more than once`);
        }
        break;
      }
      case 'order': {
        if (!q.a || typeof q.a !== 'string') E(`${where}: order needs a (string)`);
        else { const n = wc(q.a); if (n < 4 || n > 14) W(`${where}: order has ${n} words`); }
        break;
      }
      case 'open':
        if (!q.q || !q.m) E(`${where}: open needs q and m`);
        break;
      default: E(`${where}: unknown type ${T}`);
    }
  };
}

for (const file of files) {
  const errs = [], warns = [];
  const E = m => errs.push(m), W = m => warns.push(m);
  let unit = null; const extras = [];
  const src = fs.readFileSync(file, 'utf8');
  try {
    const ctx = { TAF: { unit: u => { if (unit) E('TAF.unit called twice'); unit = u; }, extra: x => extras.push(x) } };
    vm.runInNewContext(src, ctx, { filename: file });
  } catch (e) { console.log(`✗ ${path.basename(file)}: JS ERROR ${e.message}`); totalErr++; continue; }
  if (!unit && extras.length) {
    const checkX = makeCheckQ(E, W); const ids = new Set();
    extras.forEach((x, xi) => {
      const w = `extra[${xi}] ${x.id || ''}`;
      for (const f of ['id', 'grade', 'kind', 'title', 'ar']) if (!x[f]) E(`${w}: missing ${f}`);
      if (x.id && ids.has(x.id)) E(`${w}: duplicate id`); ids.add(x.id);
      if (![11, 12].includes(x.grade)) E(`${w}: grade must be 11 or 12`);
      if (!['literature', 'culture', 'life'].includes(x.kind)) E(`${w}: kind must be literature|culture|life`);
      if (/<[a-z\/][^>]*>/i.test(JSON.stringify(x))) E(`${w}: HTML tags found`);
      if (!Array.isArray(x.body) || x.body.length < 3) E(`${w}: body too short`);
      else x.body.forEach((b, bi) => { const keys = Object.keys(b); if (keys.length !== 1 || !['p', 'h', 'table', 'ex', 'tip', 'warn'].includes(keys[0])) E(`${w}.body[${bi}]: bad block ${keys.join(',')}`); if (b.table) b.table.rows.forEach((r, ri) => { if (r.length !== b.table.head.length) E(`${w}.body[${bi}] row ${ri} width`); }); });
      if (x.kind === 'literature' && !x.poem && !x.excerpt) W(`${w}: literature item has no poem/excerpt text`);
      if (!Array.isArray(x.qs) || x.qs.length < 5) W(`${w}: ${x.qs ? x.qs.length : 0} questions (6–10 expected)`);
      (x.qs || []).forEach((q, qi) => checkX(q, `${w}.qs[${qi}]`, true));
    });
    totalErr += errs.length; totalWarn += warns.length;
    console.log(`${errs.length ? '✗' : '✓'} ${path.basename(file)} — ${extras.length} extra item(s): ${extras.map(x => x.id).join(', ')}`);
    errs.forEach(e => console.log('   ERROR ' + e)); warns.forEach(w => console.log('   warn  ' + w));
    continue;
  }
  if (!unit) { console.log(`✗ ${path.basename(file)}: no TAF.unit call`); totalErr++; continue; }
  const u = unit;
  const base = path.basename(file, '.js').replace(/\.(review|wip|tmp)$/, '');
  if (u.id !== base) E(`id "${u.id}" must equal file name "${base}"`);
  const m = /^g(1[12])u(\d+)$/.exec(u.id || '');
  if (!m || +m[1] !== u.grade || +m[2] !== u.n) E('grade/n must match id');
  if (![1, 2].includes(u.sem)) E('sem must be 1 or 2');
  for (const f of ['title', 'ar', 'topics']) if (!u[f]) E(`missing ${f}`);
  if (!Array.isArray(u.goals) || u.goals.length < 4) W('goals: 4–6 expected');
  if (/<[a-z\/][^>]*>/i.test(src)) E('HTML tags found — use **bold** / ==mark== only');

  // vocab
  if (!Array.isArray(u.vocab)) E('vocab missing');
  else {
    if (u.vocab.length < 28 || u.vocab.length > 40) W(`vocab count ${u.vocab.length} (28–36 expected)`);
    const seen = new Set();
    u.vocab.forEach((v, i) => {
      for (const f of ['w', 'ar', 'pos', 'def', 'ex']) if (!v[f]) E(`vocab[${i}] missing ${f}`);
      if (seen.has((v.w || '').toLowerCase())) E(`vocab duplicate "${v.w}"`);
      seen.add((v.w || '').toLowerCase());
      const IRR = new Set('a an the be get make leave hang go take have do come give keep put run set find feel hold bring buy catch fall lose say tell think win write speak break choose drive eat fly forget grow hide know lead ride rise see sell send shake sing sit sleep stand steal swim teach throw wake wear dig bear beat bite blow build burn deal draw dream fight freeze hear lay lend let light mean meet pay prove seek shine shoot shut sink slide spend spin spread stick sting strike swear sweep tear understand weep wind'.split(' '));
      const words = (v.w || '').toLowerCase().replace(/\(.*?\)/g, '').replace(/\bsomething\b|\bsomeone\b|\bsb\b|\bsth\b|\bone's\b/g, '').trim().split(/\s+/).map(x => x.replace(/[^a-z]/g, '')).filter(Boolean);
      const key = words.find(x => !IRR.has(x) && x.length > 2);
      if (key && v.ex && !v.ex.toLowerCase().includes(key.slice(0, Math.min(4, key.length - 1)))) W(`vocab "${v.w}" example may not contain the word`);
    });
  }

  const gids = new Set();
  const checkQ = makeCheckQ(E, W);
  if (!Array.isArray(u.grammar) || !u.grammar.length) E('grammar missing');
  else u.grammar.forEach((g, gi) => {
    const w = `grammar[${gi}]`;
    if (!g.id || !g.id.startsWith(u.id + '-gr')) E(`${w}: id must start with ${u.id}-gr`);
    if (gids.has(g.id)) E(`${w}: duplicate id`); gids.add(g.id);
    for (const f of ['title', 'ar']) if (!g[f]) E(`${w}: missing ${f}`);
    if (!Array.isArray(g.body) || g.body.length < 4) E(`${w}: body too short`);
    else g.body.forEach((b, bi) => {
      const keys = Object.keys(b);
      if (keys.length !== 1 || !['p', 'h', 'table', 'ex', 'tip', 'warn'].includes(keys[0])) E(`${w}.body[${bi}]: bad block ${keys.join(',')}`);
      if (b.table && (!Array.isArray(b.table.head) || !Array.isArray(b.table.rows))) E(`${w}.body[${bi}]: bad table`);
      if (b.table) b.table.rows.forEach((r, ri) => { if (r.length !== b.table.head.length) E(`${w}.body[${bi}] row ${ri} has ${r.length} cells, head has ${b.table.head.length}`); });
      if (b.ex && (!Array.isArray(b.ex) || b.ex.some(e => !Array.isArray(e) || e.length !== 2))) E(`${w}.body[${bi}]: ex must be [[en, ar], ...]`);
    });
    if (!Array.isArray(g.summary) || g.summary.length < 3) W(`${w}: summary 3–6 lines expected`);
    if (!Array.isArray(g.qs) || g.qs.length < 12) W(`${w}: ${g.qs ? g.qs.length : 0} questions (14–18 expected)`);
    (g.qs || []).forEach((q, qi) => checkQ(q, `${w}.qs[${qi}]`, true));
    const mc = (g.qs || []).filter(q => q.t === 'mcq');
    if (mc.length >= 4) {
      const cnt = [0, 0, 0, 0]; mc.forEach(q => cnt[q.a]++);
      if (Math.max(...cnt) / mc.length > 0.5) W(`${w}: answer position skewed ${cnt.join('/')}`);
    }
  });

  // reading
  const r = u.reading;
  if (!r) E('reading missing');
  else {
    if (!Array.isArray(r.text)) E('reading.text must be array of paragraphs');
    else {
      const n = wc(r.text.join(' '));
      const [lo, hi] = u.grade === 11 ? [280, 400] : [330, 470];
      if (n < lo || n > hi) W(`reading length ${n} words (${lo}–${hi})`);
    }
    for (const f of ['title', 'skill', 'skillAr', 'skillTip']) if (!r[f]) E(`reading missing ${f}`);
    if (!Array.isArray(r.gloss) || r.gloss.some(g => g.length !== 2)) E('reading.gloss must be [[w, ar]]');
    else if (r.gloss.length < 10) W(`reading.gloss has ${r.gloss.length} entries (12–16 expected)`);
    const np = Array.isArray(r.text) ? r.text.length : 0;
    for (const f of ['gist', 'tr']) {
      if (r[f] === undefined) W(`reading.${f} missing (one Arabic string per paragraph required)`);
      else if (!Array.isArray(r[f]) || r[f].length !== np || r[f].some(x => typeof x !== 'string' || !/[\u0600-\u06FF]/.test(x))) E(`reading.${f} must be an array of ${np} Arabic strings (one per paragraph)`);
    }
    if (Array.isArray(r.gist) && r.gist.some(x => x.length > 110)) W('reading.gist items should be ≤ 90 characters');
    if (!Array.isArray(r.qs) || r.qs.length < 8) W(`reading qs ${r.qs ? r.qs.length : 0} (9–11)`);
    (r.qs || []).forEach((q, qi) => checkQ(q, `reading.qs[${qi}]`, false));
  }

  // writing
  const wr = u.writing;
  if (!wr) E('writing missing');
  else {
    for (const f of ['type', 'ar', 'about', 'task', 'taskAr']) if (!wr[f]) E(`writing missing ${f}`);
    if (!Array.isArray(wr.plan) || wr.plan.some(p => !p.part || !p.ar || !p.tip)) E('writing.plan items need part, ar, tip');
    if (!Array.isArray(wr.phrases) || wr.phrases.some(p => !p.en || !p.ar)) E('writing.phrases need en, ar');
    if (!Array.isArray(wr.words) || wr.words.length !== 2) E('writing.words must be [min, max]');
    if (!Array.isArray(wr.model)) E('writing.model must be array of paragraphs');
    else if (Array.isArray(wr.words)) {
      const n = wc(wr.model.join(' '));
      if (n < wr.words[0] - 10 || n > wr.words[1] + 15) W(`writing model ${n} words, target ${wr.words.join('–')}`);
    }
    if (!Array.isArray(wr.check) || wr.check.length < 5) W('writing.check 6–8 expected');
  }

  // speaking
  const sp = u.speaking;
  if (!sp) E('speaking missing');
  else {
    if (!sp.title || !sp.ar) E('speaking needs title, ar');
    if (!Array.isArray(sp.phrases) || sp.phrases.some(p => !p.en || !p.ar)) E('speaking.phrases need en, ar');
    if (!Array.isArray(sp.dialogue) || sp.dialogue.some(d => !Array.isArray(d) || d.length !== 2)) E('speaking.dialogue must be [[name, line]]');
  }

  // test
  if (!Array.isArray(u.test)) E('test missing');
  else {
    if (u.test.length < 18 || u.test.length > 24) W(`test has ${u.test.length} questions (20)`);
    const okK = new Set(['vocab', 'reading', 'speaking', 'writing', ...gids]);
    u.test.forEach((q, qi) => {
      checkQ(q, `test[${qi}]`, true);
      if (!q.k || !okK.has(q.k)) E(`test[${qi}]: k "${q.k}" invalid`);
    });
    for (const g of gids) if (!u.test.some(q => q.k === g)) W(`test has no question for ${g}`);
  }

  totalErr += errs.length; totalWarn += warns.length;
  const stats = `vocab ${u.vocab ? u.vocab.length : 0}, grammar ${(u.grammar || []).map(g => (g.qs || []).length).join('+')} qs, reading ${r && r.text ? wc(r.text.join(' ')) : 0}w/${r && r.qs ? r.qs.length : 0}q, test ${u.test ? u.test.length : 0}`;
  console.log(`${errs.length ? '✗' : '✓'} ${u.id} "${u.title}" — ${stats}`);
  errs.forEach(e => console.log('   ERROR ' + e));
  warns.forEach(w => console.log('   warn  ' + w));
}
console.log(`\n${files.length} file(s), ${totalErr} error(s), ${totalWarn} warning(s)`);
process.exit(totalErr ? 1 : 0);

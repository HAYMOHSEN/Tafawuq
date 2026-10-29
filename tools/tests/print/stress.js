#!/usr/bin/env node
/* Print Center layout stress test.
   Builds every kind of paper in hundreds of option combinations (all units, both grades, many seeds),
   renders each page in a hidden A4 host and fails if anything is clipped, too wide, runs into the footer,
   or a builder throws.  Also checks that sparse / empty units degrade gracefully.
   Usage: node tools/tests/print/stress.js [grade 11|12]   (default: both) */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', '..', '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(f).pipe(res);
});

const stateFor = grade => JSON.stringify({ v: 2, settings: { grade, onboarded: true, name: 'اختبار', celebrate: false, sound: false, haptics: false, motion: 'off' }, xp: 900, topics: { [`g${grade}u1-gr1`]: { r: 3, w: 7 }, [`g${grade}u5-gr2`]: { r: 2, w: 8 } } });

async function runGrade(browser, base, grade) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'ar-JO', serviceWorkers: 'block' });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.addInitScript(([k, v]) => { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }, ['tafawuq.v1', stateFor(grade)]);
  await page.goto(base + '/index.html');
  await page.waitForFunction(() => window.TAF && TAF.print && TAF.views);
  // star three real words of this grade (the "My words" source needs some)
  await page.evaluate(g => { TAF.allVocab(g).slice(0, 3).forEach(v => TAF.words.toggle({ key: TAF.words.key(v.unit, v.w), w: v.w, ar: v.ar, ex: v.ex, unit: v.unit })); }, grade);
  const units = await page.evaluate(() => TAF.unitsFor(TAF.store.s.settings.grade).map(u => u.id));
  const combos = [];
  for (const unit of ['all', ...units]) for (const focus of ['mixed', 'grammar', 'vocab', 'reading']) for (const n of [10, 20, 30]) combos.push(['worksheet', { unit, focus, n }]);
  for (const types of [['mcq'], ['gap'], ['tr'], ['err'], ['order'], ['match'], ['tf'], ['find'], ['open'], ['mcq', 'gap', 'err']]) combos.push(['worksheet', { unit: 'all', focus: 'mixed', n: 30, types }]);
  for (const types of [['match'], ['gap'], ['mcq', 'match']]) combos.push(['worksheet', { unit: 'all', focus: 'vocab', n: 30, types }]);
  for (const scope of ['all', '1', '2']) for (const pattern of ['auto', 'g11', 'adv']) for (const omr of [true, false]) combos.push(['exam', { scope, pattern, omr }]);
  for (const layout of ['list', 'fold', 'az']) for (const u of [[], [units[0]], units.slice(0, 2)]) for (const extra of [{}, { foldKey: 'page', vis: 'ar', shuf: true }, { ex: false, def: true }]) combos.push(['vocab', Object.assign({ layout, units: u }, extra)]);
  combos.push(['vocab', { src: 'starred' }], ['cards', { src: 'starred' }]);
  for (const flip of ['long', 'short']) for (const rev of [false, true]) combos.push(['cards', { flip, rev, units: [] }], ['cards', { flip, rev, units: [units[0]], ex: false, def: true }]);
  combos.push(['report', {}], ['report', { hist: false, advice: false }], ['certificate', {}], ['certificate', { ach: 'curr', sex: 'f' }], ['certificate', { ach: 'custom', custom: 'A very long achievement title that keeps going and going to test wrapping in the frame', name: 'اسم طويل جداً جداً جداً للطالب لاختبار التفاف الاسم داخل الشهادة' }]);

  const total = { builds: 0, pages: 0, problems: [] };
  const seeds = [1, 2, 3, 77, 9001];
  for (let i = 0; i < combos.length; i += 6) {
    const r = await page.evaluate(async ([chunk, seeds]) => {
      await TAF.print.fontsReady();
      const out = { builds: 0, pages: 0, problems: [] };
      const host = document.createElement('div'); host.className = 'pp-doc'; host.style.cssText = 'position:absolute;left:-20000px;top:0;visibility:hidden'; document.body.appendChild(host);
      const check = (label, pages) => {
        host.innerHTML = pages.join('');
        host.querySelectorAll('.pp-page').forEach((pg, i) => {
          const body = pg.querySelector('.pp-body');
          if (body) {
            if (body.scrollHeight > body.clientHeight + 1) out.problems.push(`${label} p${i + 1}: body clipped ${body.scrollHeight}>${body.clientHeight}`);
            if (body.scrollWidth > body.clientWidth + 1) out.problems.push(`${label} p${i + 1}: body too wide ${body.scrollWidth}>${body.clientWidth}`);
            const fb = pg.querySelector('.pp-foot'), fr = fb && fb.getBoundingClientRect();
            let maxB = 0; body.querySelectorAll('*').forEach(e => { const r = e.getBoundingClientRect(); if (r.height > 0 && r.bottom > maxB) maxB = r.bottom; });
            if (fr && maxB > fr.top + 0.5) out.problems.push(`${label} p${i + 1}: content ${(maxB - fr.top).toFixed(1)}px into the footer`);
          }
          if (pg.scrollHeight > pg.clientHeight + 1) out.problems.push(`${label} p${i + 1}: page overflow`);
        });
        out.pages += pages.length;
      };
      for (const [kind, over] of chunk) for (const seed of (kind === 'worksheet' || kind === 'exam' ? seeds : [5])) {
        const label = kind + ' ' + JSON.stringify(over) + ' #' + seed;
        let b; try { b = TAF.print._build(kind, over, seed); } catch (e) { out.problems.push(label + ' THROW ' + e.message); continue; }
        out.builds++;
        if (!b.doc) { out.problems.push(label + ' built nothing'); continue; }
        check(label, b.pages); if (b.keyPages.length) check(label + ' [key]', b.keyPages);
      }
      host.remove();
      return out;
    }, [combos.slice(i, i + 6), seeds]);
    total.builds += r.builds; total.pages += r.pages; total.problems.push(...r.problems);
  }

  // sparse units: only MCQ grammar and a tiny vocabulary / nothing at all — must not throw, and the empty case must be explained
  const sparse = await page.evaluate(async g => {
    await TAF.print.fontsReady();
    const out = [], id = n => `g${g}u${n}`;
    TAF.unit({ id: id(90), grade: g, sem: 2, n: 90, title: 'Sparse A', ar: 'وحدة مبسّطة', topics: 'x', goals: [], vocab: [{ w: 'alpha', ar: 'ألفا', pos: 'noun', def: 'first', ex: 'Alpha is the first letter.' }, { w: 'beta', ar: 'بيتا', pos: 'noun', def: 'second', ex: 'Beta comes second.' }], grammar: [{ id: id(90) + '-gr1', title: 'Only MCQ', ar: 'أسئلة اختيار فقط', body: [], summary: [], qs: [{ t: 'mcq', q: 'She ____ home.', o: ['go', 'goes', 'going'], a: 1, x: 'x' }, { t: 'mcq', q: 'They ____ here.', o: ['is', 'are', 'am'], a: 1, x: 'x' }] }] });
    TAF.unit({ id: id(91), grade: g, sem: 2, n: 91, title: 'Empty B', ar: 'وحدة فارغة', topics: 'x', goals: [], vocab: [], grammar: [] });
    for (const u of [id(90), id(91)]) {
      for (const focus of ['mixed', 'grammar', 'vocab', 'reading']) { try { TAF.print._build('worksheet', { unit: u, focus, n: 30 }, 5); } catch (e) { out.push(`worksheet ${u} ${focus} threw ${e.message}`); } }
      for (const [k, o] of [['vocab', { units: [u] }], ['cards', { units: [u] }]]) { try { TAF.print._build(k, o, 5); } catch (e) { out.push(`${k} ${u} threw ${e.message}`); } }
    }
    try { TAF.print._build('exam', { scope: '2' }, 5); } catch (e) { out.push('exam threw ' + e.message); }
    return out;
  }, grade);
  total.problems.push(...sparse);
  // …and the tool page for an empty unit explains itself and disables the print button instead of crashing
  await page.evaluate(g => { TAF.store.s.printPrefs = TAF.store.s.printPrefs || {}; TAF.store.s.printPrefs.worksheet = Object.assign(TAF.store.s.printPrefs.worksheet || {}, { unit: `g${g}u91`, focus: 'mixed' }); location.hash = '#/print'; }, grade);
  await page.evaluate(() => { location.hash = '#/print/worksheet'; });
  await page.waitForFunction(() => !document.querySelector('[data-busy="1"]') && document.querySelector('[data-act="print"]'), null, { timeout: 15000 });
  const empty = await page.evaluate(() => ({ disabled: document.querySelector('[data-act="print"]').disabled, msg: document.querySelector('[data-desk]').innerText.trim() }));
  if (!empty.disabled || !empty.msg) total.problems.push('empty unit: print button should be disabled and an explanation shown ' + JSON.stringify(empty));
  errs.filter(e => !/Service Worker/.test(e)).forEach(e => total.problems.push('browser error: ' + e));
  await ctx.close();
  return total;
}

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch();
  const want = process.argv[2] ? [+process.argv[2]] : [11, 12];
  let bad = 0;
  for (const g of want) {
    const r = await runGrade(browser, base, g);
    console.log(`grade ${g}: ${r.builds} papers built, ${r.pages} pages checked, ${r.problems.length} problem(s)`);
    r.problems.slice(0, 30).forEach(p => console.log('   ✗ ' + p));
    bad += r.problems.length;
  }
  await browser.close(); server.close();
  if (bad) process.exit(1);
  console.log('print stress: OK');
})().catch(e => { console.error(e); process.exit(2); });

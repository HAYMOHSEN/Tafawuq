#!/usr/bin/env node
/* Store + install-dialog screenshots, taken with a believable, well-progressed student.
   Usage: node tools/screenshots.js
   Output:
     ../tafawuq-store-assets/*.png   1920×1080 shots for the Store listing (not part of the website)
     screenshots/*.png               small shots referenced by manifest.webmanifest (install dialog)            */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path'), cp = require('child_process');
const root = path.join(__dirname, '..');
const STORE = path.resolve(root, '..', 'tafawuq-store-assets');
const SHOTS = path.join(root, 'screenshots');
fs.mkdirSync(STORE, { recursive: true }); fs.mkdirSync(SHOTS, { recursive: true });

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(f).pipe(res);
});

// a student who has been studying for about six weeks — built from the real content so every id is valid
async function buildState(browser, base) {
  const ctx = await browser.newContext({ locale: 'ar-JO', serviceWorkers: 'block' });
  const page = await ctx.newPage();
  await page.goto(base + '/index.html'); await page.waitForFunction(() => window.TAF && TAF.units && TAF.game);
  const state = await page.evaluate(() => {
    const d = new Date(), p2 = n => String(n).padStart(2, '0');
    const day = off => { const x = new Date(d); x.setDate(x.getDate() - off); return `${x.getFullYear()}-${p2(x.getMonth() + 1)}-${p2(x.getDate())}`; };
    const now = Date.now(), DAY = 864e5;
    const s = {
      v: 2, settings: { grade: 11, examDate: '', theme: 'light', rate: 0.92, voice: '', fs: 1, newPerDay: 12, name: 'سارة', goal: 20, sound: false, haptics: false, celebrate: false, motion: 'off', immersion: false, onboarded: true },
      q: {}, topics: {}, mistakes: {}, srs: {}, done: {}, tests: {}, exams: [], drafts: {}, checks: {}, xp: 3420, badges: {}, log: {}, cnt: {}, stars: {}, hl: {}, printPrefs: {},
      streak: { last: day(0), count: 12 }, daily: { date: day(0), answered: 14, reviewed: 6, newToday: 4, goalHit: false },
      meta: { snapDay: day(0), lastExport: now }, savedAt: now, created: now - 40 * DAY
    };
    [26, 31, 18, 40, 22, 35, 14].forEach((q, i) => { s.log[day(6 - i)] = { q, xp: q * 3 }; });
    TAF.unitsFor(11).slice(0, 5).forEach((u, ui) => {
      const full = ui < 3;
      s.done['open:' + u.id] = now;
      ['vocab', 'reading', 'writing', 'speaking'].forEach((k, i) => { if (full || i < 2) s.done[u.id + ':' + k] = now; });
      u.grammar.forEach((g, gi) => {
        if (full || gi === 0) s.done[u.id + ':gr:' + g.id] = now;
        s.topics[g.id] = { r: 8 + ((ui * 3 + gi * 5) % 9), w: 1 + ((ui + gi * 2) % 4) };
        s.q[g.id + '#0'] = { r: 3, w: 1, s: 1, t: now };
      });
      s.topics['vocab:' + u.id] = { r: 30 + ui * 3, w: 6 }; s.topics['reading:' + u.id] = { r: 10, w: 3 };
      if (full) s.tests[u.id] = 78 + ui * 5;
      u.vocab.slice(0, full ? 24 : 10).forEach((v, vi) => { s.srs[u.id + ':' + v.w] = { ef: 2.5, ivl: 1 + (vi % 6), reps: 1 + (vi % 4), lapses: vi % 5 === 0 ? 1 : 0, due: vi % 3 === 0 ? day(0) : day(-(1 + vi % 5)) }; });
    });
    s.exams = [
      { t: now - DAY, kind: 'exam', grade: 11, title: 'نموذج الامتحان الوزاري — الورقة الشاملة', pct: 76, secs: 5400 },
      { t: now - 3 * DAY, kind: 'unit', unit: 'g11u2', pct: 85, right: 17, total: 20, secs: 700 }
    ];
    TAF.game.BADGES.forEach((b, i) => { if (i < 14 && i % 5 !== 4) s.badges[b.id] = now - i * DAY; });
    return s;
  });
  await ctx.close();
  return JSON.stringify(state);
}

async function shoot(browser, base, state, spec) {
  const ctx = await browser.newContext({ viewport: spec.viewport, deviceScaleFactor: spec.dsf, locale: 'ar-JO', serviceWorkers: 'block', colorScheme: 'light', reducedMotion: 'reduce' });
  await ctx.addInitScript(s => { try { if (!localStorage.getItem('tafawuq.v1')) localStorage.setItem('tafawuq.v1', s); delete window.showSaveFilePicker; } catch (e) { /* ignore */ } }, state);
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto(base + '/index.html' + spec.hash);
  await page.waitForSelector('#main > *');
  if (spec.wait) await page.waitForSelector(spec.wait, { timeout: 15000 });
  if (spec.act) await spec.act(page);
  await page.waitForTimeout(500);
  // frame the shot: top of the page, or a chosen element at the top of the viewport
  await page.evaluate(sel => { const el = sel && document.querySelector(sel); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 70; window.scrollTo(0, Math.max(0, y)); } else window.scrollTo(0, 0); }, spec.scrollTo || null);
  await page.waitForTimeout(400);
  await page.screenshot({ path: spec.out });
  await ctx.close();
  return errs;
}

const nextCard = async page => { await page.click('[data-nav="next"]'); await page.waitForTimeout(500); };

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch();
  const state = await buildState(browser, base);
  const wide = { viewport: { width: 1280, height: 720 }, dsf: 1.5 };
  const narrow = { viewport: { width: 360, height: 640 }, dsf: 1.5 };
  const specs = [
    // Store (1920×1080)
    { ...wide, out: path.join(STORE, '1-home.png'), hash: '#/' },
    { ...wide, out: path.join(STORE, '2-grammar.png'), hash: '#/unit/g11u3/grammar/0' },
    { ...wide, out: path.join(STORE, '3-reading-story.png'), hash: '#/unit/g11u1/reading?m=story', wait: '.rd-card', act: nextCard },
    { ...wide, out: path.join(STORE, '4-exam.png'), hash: '#/exam/run/g11?s=all&go=1', wait: '[data-opt]', act: async p => { await p.click('[data-opt="1"]'); } },
    { ...wide, out: path.join(STORE, '5-print.png'), hash: '#/print/worksheet?seed=ABC123', wait: '.pr-pw', scrollTo: '.pr-prevhead' },
    { ...wide, out: path.join(STORE, '6-achievements.png'), hash: '#/achievements' },
    // install dialog (manifest)
    { viewport: wide.viewport, dsf: 1, out: path.join(SHOTS, 'wide-1-home.png'), hash: '#/' },
    { viewport: wide.viewport, dsf: 1, out: path.join(SHOTS, 'wide-2-reading.png'), hash: '#/unit/g11u1/reading?m=story', wait: '.rd-card', act: nextCard },
    { viewport: wide.viewport, dsf: 1, out: path.join(SHOTS, 'wide-3-exam.png'), hash: '#/exam/run/g11?s=all&go=1', wait: '[data-opt]', act: async p => { await p.click('[data-opt="1"]'); } },
    { ...narrow, out: path.join(SHOTS, 'narrow-1-home.png'), hash: '#/' },
    { ...narrow, out: path.join(SHOTS, 'narrow-2-reading.png'), hash: '#/unit/g11u1/reading?m=story', wait: '.rd-card', act: nextCard, scrollTo: '.rd-card' },
    { ...narrow, out: path.join(SHOTS, 'narrow-3-cards.png'), hash: '#/unit/g11u1/vocab?m=cards', wait: '.flash, [data-flip], .card-face, #main .sheet' }
  ];
  let bad = 0;
  for (const spec of specs) {
    const errs = await shoot(browser, base, state, spec);
    console.log((errs.length ? '✗ ' : '✓ ') + path.basename(spec.out) + (errs.length ? '  ' + errs.join(' | ') : ''));
    bad += errs.length;
  }
  await browser.close(); server.close();
  // keep the install-dialog images small: palette PNGs are plenty for UI screenshots
  try { fs.readdirSync(SHOTS).filter(f => f.endsWith('.png')).forEach(f => cp.execSync(`convert ${JSON.stringify(path.join(SHOTS, f))} -colors 160 PNG8:${JSON.stringify(path.join(SHOTS, f))}`)); } catch (e) { console.log('(skipped palette optimisation: ' + e.message.split('\n')[0] + ')'); }
  if (bad) process.exit(1);
})().catch(e => { console.error(e); process.exit(2); });

#!/usr/bin/env node
/* Tafawuq end-to-end test-suite (Playwright + Chromium).
   Usage: node tools/tests/e2e.js [filter]   — runs every scenario whose name contains `filter`. */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', '..');
const SHOTS = process.env.SHOTS || '/tmp/e2e-shots';
fs.mkdirSync(SHOTS, { recursive: true });
const filter = process.argv[2] || '';

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(f).pipe(res);
});

const results = [];
let browser, base;
const KEY = 'tafawuq.v1';
const seedState = (extra) => JSON.stringify(Object.assign({ settings: { onboarded: true, name: 'اختبار', celebrate: false, sound: false, haptics: false, motion: 'off' } }, extra || {}));

async function T(name, fn, opts) {
  if (filter && !name.includes(filter)) return;
  opts = opts || {};
  const ctx = await browser.newContext({ viewport: opts.viewport || { width: 390, height: 844 }, deviceScaleFactor: 1, locale: 'ar-JO', serviceWorkers: opts.sw ? 'allow' : 'block', colorScheme: opts.dark ? 'dark' : 'light', acceptDownloads: true });
  if (!opts.fresh) await ctx.addInitScript(([k, v]) => { try { if (!localStorage.getItem(k)) localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }, [KEY, opts.seed || seedState()]);
  await ctx.addInitScript(() => { try { delete window.showSaveFilePicker; delete window.showOpenFilePicker; } catch (e) { /* ignore */ } });
  if (opts.init) await ctx.addInitScript(opts.init);
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !(opts.ignore && opts.ignore.test(m.text()))) errs.push('console: ' + m.text()); });
  page.setDefaultTimeout(8000);
  const t0 = Date.now();
  try {
    await fn(page, ctx, errs);
    if (errs.length && !opts.allowErrors) throw new Error('browser errors:\n' + errs.join('\n'));
    results.push([name, true]); console.log(`✓ ${name} (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
  } catch (e) {
    results.push([name, false, e.message]);
    console.log(`✗ ${name}\n    ${String(e.message).split('\n').slice(0, 8).join('\n    ')}`);
    try { await page.screenshot({ path: path.join(SHOTS, 'FAIL-' + name.replace(/[^a-z0-9]+/gi, '_') + '.png') }); } catch (e2) { /* ignore */ }
  }
  await ctx.close();
}

/* ---------- helpers ---------- */
const open = async (page, hash) => { await page.goto(base + '/index.html' + (hash || '#/')); await page.waitForSelector('#main > *'); };
const go = async (page, hash) => { await page.evaluate(h => { if (location.hash === h) TAF.app.render(); else location.hash = h; }, hash); await page.waitForTimeout(150); await page.waitForSelector('#main > *'); };
const state = page => page.evaluate(k => JSON.parse(localStorage.getItem(k)), KEY);
const flush = page => page.evaluate(() => TAF.store.saveNow());
const expect = (cond, msg) => { if (!cond) throw new Error(msg); };
const eq = (a, b, msg) => { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`${msg}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };
const dismiss = async page => { for (let i = 0; i < 4; i++) { const m = await page.$('.ui-back.in'); if (!m) return; const b = await page.$('.ui-back.in .ui-actions .btn'); if (b) await b.click(); else await page.keyboard.press('Escape'); await page.waitForTimeout(250); } };
const flat = qs => qs.map(q => { const o = {}; for (const k in q) o[k] = q[k]; return o; });
const hookQuiz = page => page.evaluate(() => { if (TAF.Quiz.__hooked) return; const o = TAF.Quiz.run; TAF.Quiz.run = function (el, qs, opts) { window.__qs = qs.map(q => { const r = {}; for (const k in q) r[k] = q[k]; return r; }); window.__qopts = opts; return o.apply(this, arguments); }; TAF.Quiz.__hooked = true; });
const clean = t => t.toLowerCase().replace(/^[^\w']+|[^\w']+$/g, '');

// a student who has already worked for a while (report / certificate / starred-words need real progress)
const richProgress = grade => {
  const now = Date.now(), d = new Date(), p2 = n => String(n).padStart(2, '0');
  const today = `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
  const u1 = (grade === 12 ? 'g12' : 'g11') + 'u1', u2 = (grade === 12 ? 'g12' : 'g11') + 'u5';   // unit 5's rule titles contain English terms (V-ing, to) → exercises the markup paths
  const done = { ['open:' + u1]: now };
  ['vocab', 'reading', 'writing', 'speaking'].forEach(k => { done[u1 + ':' + k] = now; });
  const o = {
    v: 2, settings: { grade, onboarded: true, name: 'اختبار', celebrate: false, sound: false, haptics: false, motion: 'off' },
    xp: 1260, streak: { last: today, count: 6 }, done, tests: { [u1]: 90 },
    topics: { [u1 + '-gr1']: { r: 9, w: 6 }, [u1 + '-gr2']: { r: 14, w: 2 }, [u2 + '-gr1']: { r: 3, w: 7 }, [u2 + '-gr2']: { r: 5, w: 5 } },
    exams: [
      { t: now - 86400000, kind: 'exam', grade, title: 'نموذج الامتحان الوزاري — الورقة الشاملة', pct: 72, secs: 4100 },
      { t: now - 3 * 86400000, kind: 'unit', unit: u1, pct: 90, right: 18, total: 20, secs: 800 }
    ]
  };
  if (grade === 11) o.stars = {
    'g11u1:keep in touch': { w: 'keep in touch', ar: 'يبقى على تواصل', ex: 'We still keep in touch by email after all these years.', unit: 'g11u1', t: now },
    'g11u5:overhear': { w: 'overhear', ar: 'يسمع (حديثاً) مصادفةً', ex: 'I overheard my parents planning a surprise party for me.', unit: 'g11u5', t: now - 5000 }
  };
  return JSON.stringify(o);
};

async function answerPractice(page, q, correct) {
  switch (q.t) {
    case 'mcq': await page.click(`[data-opt="${correct ? q.a : (q.a + 1) % q.o.length}"]`); break;
    case 'tf': await page.click(`[data-tf="${correct ? q.a : !q.a}"]`); break;
    case 'gap': case 'find': await page.fill('input[data-in]', correct ? q.a[0] : 'zzzz'); await page.click('[data-check]'); break;
    case 'tr': await page.fill('textarea[data-in]', correct ? q.a[0] : 'zzzz zzzz'); await page.click('[data-check]'); break;
    case 'err': { const toks = q.q.split(/\s+/).filter(Boolean); let idx = toks.findIndex(t => clean(t) === clean(q.w)); if (!correct) idx = toks.findIndex((t, i) => i !== idx); await page.click(`[data-tok="${idx}"]`); break; }
    case 'order': {
      const words = q.a.split(/\s+/).filter(Boolean), seq = correct ? words : words.slice().reverse();
      for (const w of seq) { let hit = false; for (const b of await page.$$('[data-pick]:not([disabled])')) { if ((await b.innerText()).trim() === w) { await b.click(); hit = true; break; } } if (!hit) throw new Error('order token not found: ' + w); }
      await page.click('[data-check]'); break;
    }
    case 'open': await page.click('[data-reveal]'); await page.click(`[data-self="${correct ? 1 : 0}"]`); break;
    default: throw new Error('unknown question type ' + q.t);
  }
  await page.waitForSelector(correct ? '.feedback.show.ok' : '.feedback.show.no');
}
// run a whole practice quiz; returns the percentage shown on the result card
async function runPractice(page, qs, pattern) {
  for (let i = 0; i < qs.length; i++) {
    const correct = pattern ? pattern(i, qs[i]) : true;
    await answerPractice(page, qs[i], correct);
    await dismiss(page);
    await page.click('[data-next]');
  }
  await page.waitForSelector('.result-score .big');
  return +(await page.innerText('.result-score .big')).replace('%', '');
}

async function answerExam(page, q, text) {
  switch (q.t) {
    case 'mcq': await page.click(`[data-opt="${q.a}"]`); break;
    case 'tf': await page.click(`[data-tf="${q.a}"]`); break;
    case 'gap': case 'find': await page.fill('input[data-in]', q.a[0]); break;
    case 'tr': await page.fill('textarea[data-in]', q.a[0]); break;
    case 'err': { const toks = q.q.split(/\s+/).filter(Boolean); await page.click(`[data-tok="${toks.findIndex(t => clean(t) === clean(q.w))}"]`); break; }
    case 'order': { for (const w of q.a.split(/\s+/).filter(Boolean)) { for (const b of await page.$$('[data-pick]:not([disabled])')) { if ((await b.innerText()).trim() === w) { await b.click(); break; } } } break; }
    case 'open': await page.fill('textarea[data-in]', text || 'My answer is that this is a reasonable and complete response to the question.'); break;
  }
}

/* =====================================================================
   SCENARIOS
   ===================================================================== */
async function main() {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  base = 'http://127.0.0.1:' + server.address().port;
  browser = await chromium.launch();
  const units = await (async () => { const c = await browser.newContext(); const p = await c.newPage(); await p.goto(base + '/index.html'); const u = await p.evaluate(() => TAF.units.map(u => ({ id: u.id, grammar: u.grammar.length, hasR: !!u.reading, hasW: !!u.writing, hasS: !!u.speaking }))); await c.close(); return u; })();
  console.log(`Testing against ${units.length} unit(s): ${units.map(u => u.id).join(', ')}\n`);

  /* ---------- onboarding ---------- */
  await T('onboarding: three steps save the choices', async page => {
    await page.goto(base + '/index.html');
    await page.waitForSelector('.ui-box');
    expect((await page.innerText('.ui-box')).includes('أهلاً بك'), 'welcome text');
    await page.click('[data-act="0"]');
    await page.click('.ob-choice[data-k="grade"][data-v="12"]');
    await page.fill('#obn', 'سارة');
    await page.click('[data-act="0"]');
    await page.click('.ob-choice[data-k="goal"][data-v="40"]');
    await page.fill('#obd', '2027-06-20');
    await page.dispatchEvent('#obd', 'change');
    await page.click('[data-act="0"]');
    await page.waitForSelector('.ui-back', { state: 'detached' });
    await flush(page);
    const s = await state(page);
    eq([s.settings.grade, s.settings.name, s.settings.goal, s.settings.examDate, s.settings.onboarded], [12, 'سارة', 40, '2027-06-20', true], 'saved settings');
    expect((await page.innerText('main')).includes('سارة'), 'greeting uses the name');
    eq(await page.getAttribute('.grade-switch [data-grade="12"]', 'aria-pressed'), 'true', 'grade switch');
  }, { fresh: true });

  await T('onboarding: skip button marks as done and never returns', async page => {
    await page.goto(base + '/index.html');
    await page.waitForSelector('.ui-box');
    await page.click('[data-act="1"]');
    await page.waitForSelector('.ui-back', { state: 'detached' });
    await page.reload(); await page.waitForSelector('#main > *');
    expect(!(await page.$('.ui-box')), 'onboarding must not reappear');
  }, { fresh: true });

  /* ---------- every route of every unit ---------- */
  await T('routes: every screen of every unit renders without errors', async page => {
    await open(page, '#/');
    const fixed = ['#/', '#/units', '#/practice', '#/review', '#/review?new=1', '#/mistakes', '#/drill', '#/mixed', '#/dictation', '#/stats', '#/speed', '#/words', '#/achievements', '#/plan', '#/tips', '#/exam', '#/cheatsheet', '#/search?q=tense', '#/more', '#/diag', '#/about'];
    const per = u => [`#/unit/${u.id}`, `#/unit/${u.id}/vocab`, ...['list', 'cards', 'quiz', 'spell', 'match'].map(m => `#/unit/${u.id}/vocab?m=${m}`), ...Array.from({ length: u.grammar }, (_, i) => [`#/unit/${u.id}/grammar/${i}`, `#/unit/${u.id}/grammar/${i}/practice`]).flat(), `#/unit/${u.id}/reading`, `#/unit/${u.id}/reading/questions`, `#/unit/${u.id}/writing`, `#/unit/${u.id}/speaking`, `#/unit/${u.id}/speaking/practice`, `#/unit/${u.id}/test`, `#/unit/${u.id}/summary`, `#/dictation?u=${u.id}`];
    const all = fixed.concat(units.flatMap(per));
    for (const h of all) {
      await go(page, h);
      const txt = (await page.innerText('main')).trim();
      expect(txt.length > 20, `empty screen: ${h}`);
      expect(!txt.includes('حدث خطأ أثناء فتح'), `view crashed: ${h}`);
      expect(!txt.includes('الصفحة غير موجودة'), `route not found: ${h}`);
      await dismiss(page);
    }
  });

  await T('grade 12: every general screen renders (also while its content is still empty)', async page => {
    await open(page, '#/');
    await page.evaluate(() => { TAF.store.s.settings.grade = 12; TAF.store.saveNow(); });
    for (const h of ['#/', '#/units', '#/practice', '#/review', '#/review?new=1', '#/mistakes', '#/drill', '#/mixed', '#/dictation', '#/stats', '#/speed', '#/words', '#/achievements', '#/plan', '#/tips', '#/exam', '#/exam/run/adv?s=all', '#/exam/run/adv?s=all&go=1', '#/exam/run/quick?s=all&go=1', '#/cheatsheet', '#/search?q=a']) {
      await go(page, h);
      const txt = (await page.innerText('main')).trim();
      expect(txt.length > 10, 'empty screen ' + h);
      expect(!txt.includes('حدث خطأ أثناء فتح'), 'view crashed: ' + h);
      await dismiss(page);
    }
  });

  /* ---------- all question types through the real UI ---------- */
  await T('quiz: every grammar question (all types) can be answered correctly via the UI', async page => {
    await open(page, '#/'); await hookQuiz(page);
    for (const u of units) for (let gi = 0; gi < u.grammar; gi++) {
      await go(page, `#/unit/${u.id}/grammar/${gi}/practice`);
      const qs = await page.evaluate(() => window.__qs);
      const pct = await runPractice(page, qs);
      eq(pct, 100, `${u.id} grammar ${gi} result`);
    }
    const s = await state(page);
    expect(s.xp > 100, 'XP should have been awarded, got ' + s.xp);
    expect(Object.keys(s.q).length > 20, 'answers recorded');
  }, { allowErrors: false });

  await T('quiz: wrong answers show the right feedback and fill the mistakes notebook', async page => {
    await open(page, '#/'); await hookQuiz(page);
    const u = units[0];
    await go(page, `#/unit/${u.id}/grammar/0/practice`);
    const qs = await page.evaluate(() => window.__qs);
    for (const q of qs.slice(0, 6)) { await answerPractice(page, q, false); await dismiss(page); await page.click('[data-next]'); }
    await flush(page);
    const s = await state(page);
    expect(Object.keys(s.mistakes).length >= 6, 'mistakes recorded: ' + Object.keys(s.mistakes).length);
    await go(page, '#/mistakes');
    const rows = await page.$$('.review-item');
    expect(rows.length >= 6, 'mistakes listed: ' + rows.length);
    // correct them twice → they disappear
    for (let round = 0; round < 2; round++) {
      await go(page, '#/mistakes?go=1');
      const mq = await page.evaluate(() => window.__qs);
      for (const q of mq) { await answerPractice(page, q, true); await dismiss(page); await page.click('[data-next]'); }
      await page.waitForSelector('.result-score .big');
    }
    await flush(page);
    const s2 = await state(page);
    eq(Object.keys(s2.mistakes).length, 0, 'mistakes cleared after two correct passes');
  });

  await T('quiz: generated vocabulary and speaking quizzes work', async page => {
    await open(page, '#/'); await hookQuiz(page);
    for (const u of units) {
      await go(page, `#/unit/${u.id}/vocab?m=quiz`);
      const qs = await page.evaluate(() => window.__qs);
      eq(await runPractice(page, qs), 100, `${u.id} vocab quiz`);
      if (u.hasS) { await go(page, `#/unit/${u.id}/speaking/practice`); const sq = await page.evaluate(() => window.__qs); eq(await runPractice(page, sq), 100, `${u.id} speaking quiz`); }
    }
  });

  await T('reading: comprehension questions (mcq/tf/find/open) and completion flag', async page => {
    await open(page, '#/'); await hookQuiz(page);
    const u = units.find(x => x.hasR);
    await go(page, `#/unit/${u.id}/reading/questions`);
    const qs = await page.evaluate(() => window.__qs);
    eq(await runPractice(page, qs), 100, 'reading quiz');
    await flush(page);
    expect(!!(await state(page)).done[u.id + ':reading'], 'reading marked done');
  });

  /* ---------- flashcards & SRS ---------- */
  await T('flashcards: flip, rate with keyboard, SRS persists across reload', async page => {
    await open(page, `#/unit/${units[0].id}/vocab?m=cards`);
    const total = await page.evaluate(id => TAF.byId[id].vocab.length, units[0].id);
    for (let i = 0; i < total; i++) {
      await page.waitForSelector('[data-flip]');
      await page.keyboard.press('Space');
      await page.waitForSelector('.rate');
      await page.keyboard.press('3');
    }
    await page.waitForSelector('.result-score');
    await flush(page);
    const s = await state(page);
    eq(Object.keys(s.srs).length, total, 'every card has SRS state');
    await page.reload(); await page.waitForSelector('#main > *');
    const s2 = await state(page);
    eq(Object.keys(s2.srs).length, total, 'SRS persisted after reload');
    await go(page, '#/review');
    expect((await page.innerText('main')).includes('أنهيت مراجعة اليوم'), 'nothing due today');
    // make them due and verify the review queue picks them up
    await page.evaluate(() => { const S = TAF.store.s; Object.values(S.srs).forEach(c => { c.due = '2000-01-01'; }); TAF.store.saveNow(); });
    await go(page, '#/review');
    await page.waitForSelector('[data-flip]');
    eq(await page.evaluate(() => TAF.srs.dueCards(11).length), total, 'cards due');
  });

  await T('vocab: filter, star a word, match game, immersion blur', async page => {
    await open(page, `#/unit/${units[0].id}/vocab`);
    await page.fill('[data-filter]', 'touch');
    const visible = await page.$$eval('[data-list] .item:not(.hidden)', els => els.length);
    expect(visible >= 2 && visible < 10, 'filter narrows the list: ' + visible);
    await page.click('[data-star-v]:visible');
    await flush(page);
    expect(Object.keys((await state(page)).stars).length === 1, 'word starred');
    await go(page, '#/words');
    expect((await page.innerText('main')).includes('touch'), 'starred word listed in My words');
    await go(page, `#/unit/${units[0].id}/vocab?m=match`);
    for (let n = 0; n < 6; n++) {
      const pair = await page.evaluate(() => { const L = Array.from(document.querySelectorAll('[data-l]')).filter(b => !b.classList.contains('done')); if (!L.length) return null; const en = L[0].textContent; const v = TAF.allVocab(11).find(x => x.w === en); const R = Array.from(document.querySelectorAll('[data-r]')).findIndex(b => b.textContent === v.ar && !b.classList.contains('done')); return [L[0].dataset.l, R]; });
      if (!pair) break;
      await page.click(`[data-l="${pair[0]}"]`); await page.click(`[data-r="${pair[1]}"]`);
    }
    await page.waitForSelector('.result-score', { timeout: 5000 });
  });

  /* ---------- exam simulator ---------- */
  await T('exam: Grade 11 ministerial-pattern paper — answer, navigate, submit, self-mark writing', async page => {
    await open(page, '#/'); await hookQuiz(page);
    await go(page, '#/exam/run/g11?s=all&go=1');
    page.on('dialog', d => d.accept());
    const qs = await page.evaluate(() => window.__qs);
    expect(qs.length >= 38, 'paper has Q1+Q2+Q3: ' + qs.length);
    expect(qs.filter(q => q.sec === 'q1').length === 28, 'Q1 has 28 items');
    expect(Math.abs(qs.filter(q => q.sec === 'q1').reduce((a, q) => a + q.marks, 0) - 70) < 0.01, 'Q1 totals 70');
    expect(Math.abs(qs.filter(q => q.sec === 'q2').reduce((a, q) => a + q.marks, 0) - 20) < 0.01, 'Q2 totals 20');
    for (let i = 0; i < qs.length; i++) {
      await answerExam(page, qs[i]);
      if (i < qs.length - 1) await page.click('[data-next]');
    }
    await page.click('[data-jump="0"]');           // navigation works
    await page.click(`[data-jump="${qs.length - 1}"]`);
    await page.click('[data-submit]');
    await page.waitForSelector('.result-score .big');
    // self-mark the open questions (reading open items, writing rubric)
    for (let guard = 0; guard < 12; guard++) {
      const rub = await page.$('[data-rubsave]'); if (rub) { await rub.click(); continue; }
      const ss = await page.$('[data-sscore]'); if (ss) { await ss.click(); continue; }
      const sr = await page.$('[data-selfr]'); if (sr) { await sr.click(); continue; }
      break;
    }
    await page.waitForSelector('.result-score .big');
    const pct = +(await page.innerText('.result-score .big')).replace('%', '');
    expect(pct >= 90, 'perfect answers + rubric should score ≥ 90, got ' + pct);
    expect((await page.innerText('main')).includes('السؤال الأول'), 'section breakdown shown');
    await flush(page);
    expect((await state(page)).exams.some(x => x.kind === 'exam'), 'exam history saved');
  });

  await T('exam: unit test and quick exam run and save the best score', async page => {
    await open(page, '#/'); await hookQuiz(page);
    page.on('dialog', d => d.accept());
    await go(page, `#/unit/${units[0].id}/test`);
    const qs = await page.evaluate(() => window.__qs);
    for (let i = 0; i < qs.length; i++) { await answerExam(page, qs[i]); if (i < qs.length - 1) await page.click('[data-next]'); }
    await page.click('[data-submit]');
    await page.waitForSelector('.result-score .big');
    eq(await page.innerText('.result-score .big'), '100%', 'unit test result');
    await flush(page);
    eq((await state(page)).tests[units[0].id], 100, 'best score stored');
    await go(page, '#/exam/run/quick?s=all&go=1');
    const q2 = await page.evaluate(() => window.__qs);
    expect(q2.length === 20, 'quick exam has 20 items: ' + q2.length);
  });

  /* ---------- speed round (fake clock) ---------- */
  await T('speed round: runs for 60s, scores, records best', async page => {
    await page.clock.install();
    await open(page, '#/speed');
    await page.click('[data-go]');
    for (let i = 0; i < 6; i++) { await page.click('[data-o="0"]'); await page.clock.runFor(1200); }
    await page.clock.runFor(62000);
    await page.waitForSelector('.result-score .big');
    await flush(page);
    const s = await state(page);
    expect(typeof (s.cnt.speedBest || 0) === 'number', 'speedBest stored');
    expect(s.xp >= 0, 'xp non-negative');
  });

  /* ---------- settings & data ---------- */
  await T('settings: toggles and segmented controls persist', async page => {
    await open(page, '#/more');
    await page.click('[data-set="goal"][data-v="40"]');
    await page.click('[data-set="theme"][data-v="dark"]');
    await page.click('[data-toggle="immersion"]');
    await page.click('[data-set="fs"][data-v="1.2"]');
    await flush(page);
    const s = (await state(page)).settings;
    eq([s.goal, s.theme, s.immersion, s.fs], [40, 'dark', true, 1.2], 'settings saved');
    eq(await page.evaluate(() => document.documentElement.dataset.theme), 'dark', 'dark theme applied');
    expect(await page.evaluate(() => document.documentElement.classList.contains('immersion')), 'immersion class applied');
    await page.reload(); await page.waitForSelector('#main > *');
    eq(await page.evaluate(() => document.documentElement.dataset.theme), 'dark', 'theme survives reload');
  });

  await T('speech: with no connection the app switches to an on-device voice; online voices are labelled', async (page, ctx) => {
    await open(page, '#/more');
    const HAZEL = 'Microsoft Hazel - English (United Kingdom)', SONIA = 'Microsoft Sonia Online (Natural) - English (United Kingdom)', GOOGLE = 'Google US English';
    const pick = () => page.evaluate(() => { const v = TAF.tts.voice(); return v && v.name; });
    eq(await pick(), SONIA, 'online: the natural voice is preferred');
    // the voice list tells the student which voices need the internet
    const labels = await page.$$eval('#vc option', os => os.map(o => o.textContent));
    expect(labels.some(l => l.includes(SONIA) && l.includes('يحتاج إنترنت')) && labels.some(l => l.includes(GOOGLE) && l.includes('يحتاج إنترنت')), 'online voices carry the «يحتاج إنترنت» label: ' + labels.join(' | '));
    expect(labels.some(l => l.includes(HAZEL) && !l.includes('يحتاج إنترنت')), 'the on-device voice is not labelled');
    await ctx.setOffline(true);
    eq(await pick(), HAZEL, 'offline: an on-device voice is used instead');
    await page.evaluate(g => { TAF.store.s.settings.voice = g; }, GOOGLE);
    eq(await pick(), HAZEL, 'offline: a chosen online voice is replaced by an on-device one');
    await ctx.setOffline(false);
    eq(await pick(), GOOGLE, 'back online: the voice the student chose is used again');
    await page.evaluate(h => { TAF.store.s.settings.voice = h; }, HAZEL);
    await ctx.setOffline(true);
    eq(await pick(), HAZEL, 'offline: an on-device voice the student chose stays');
    // nothing but online voices on the device: still returns something (the speech engine decides what happens)
    await page.evaluate(() => { TAF.tts.voices = TAF.tts.voices.filter(v => v.localService === false); TAF.store.s.settings.voice = ''; });
    expect(!!(await pick()), 'only online voices installed: a voice is still returned');
    await ctx.setOffline(false);
  }, { init: () => {
    const V = [{ name: 'Microsoft Hazel - English (United Kingdom)', lang: 'en-GB', localService: true, default: true, voiceURI: 'h' }, { name: 'Microsoft Sonia Online (Natural) - English (United Kingdom)', lang: 'en-GB', localService: false, default: false, voiceURI: 's' }, { name: 'Google US English', lang: 'en-US', localService: false, default: false, voiceURI: 'g' }];
    Object.defineProperty(window, 'speechSynthesis', { value: { getVoices: () => V, speak() {}, cancel() {}, pause() {}, resume() {}, addEventListener() {}, removeEventListener() {}, speaking: false, pending: false, paused: false }, configurable: true });
    window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  } });

  await T('data: backup downloads valid JSON; import-merge keeps the best of both', async page => {
    await open(page, '#/'); await go(page, '#/more');
    await page.evaluate(() => { const S = TAF.store.s; S.xp = 120; S.stars['x:foo'] = { w: 'foo', ar: 'فو', ex: '', unit: 'x', t: 1 }; TAF.store.saveNow(); });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.click('[data-backup]')]);
    const file = await dl.path(); const raw = fs.readFileSync(file, 'utf8'); const obj = JSON.parse(raw);
    eq([obj.app, obj.data.xp], ['tafawuq', 120], 'backup content');
    // craft a different backup: higher xp, other star
    const other = JSON.parse(raw); other.data.xp = 500; other.data.stars = { 'y:bar': { w: 'bar', ar: 'بار', ex: '', unit: 'y', t: 2 } }; other.data.streak = { last: '2030-01-01', count: 9 };
    const tmp = path.join('/tmp', 'e2e-import.json'); fs.writeFileSync(tmp, JSON.stringify(other));
    await page.setInputFiles('[data-import]', tmp);
    await page.waitForSelector('.ui-box');
    await page.click('[data-act="0"]');              // merge
    await page.waitForSelector('.ui-back', { state: 'detached' });
    await flush(page);
    const s = await state(page);
    eq(s.xp, 500, 'merged xp is the max');
    eq(Object.keys(s.stars).sort(), ['x:foo', 'y:bar'], 'stars are unioned');
    // replace mode
    other.data.xp = 7; fs.writeFileSync(tmp, JSON.stringify(other));
    await page.setInputFiles('[data-import]', tmp);
    await page.waitForSelector('.ui-box'); await page.click('[data-act="1"]');
    await page.waitForSelector('.ui-back', { state: 'detached' });
    await flush(page);
    eq((await state(page)).xp, 7, 'replace import');
    // bad file
    fs.writeFileSync(tmp, '{"hello":1}');
    await page.setInputFiles('[data-import]', tmp);
    await page.waitForSelector('.ui-box');
    expect((await page.innerText('.ui-box')).includes('الملف غير صالح'), 'bad file is rejected politely');
  });

  await T('reliability: corrupted save file is recovered from the daily snapshot', async page => {
    await open(page, '#/');
    await page.evaluate(() => { const S = TAF.store.s; S.xp = 321; TAF.store.saveNow(); });
    // pretend a new day began so the next save rotates the previous state into snapshot 1
    await page.evaluate(() => { TAF.store.s.meta.snapDay = '2000-01-01'; TAF.store.saveNow(); });
    expect(await page.evaluate(() => TAF.store.snapshots().length) >= 1, 'a snapshot exists');
    await page.evaluate(k => localStorage.setItem(k, '{"broken json'), KEY);
    await page.reload(); await page.waitForSelector('.ui-box');
    expect((await page.innerText('.ui-box')).includes('استرجعنا'), 'user is told data was restored');
    await dismiss(page);
    eq(await page.evaluate(() => TAF.store.s.xp), 321, 'xp restored from snapshot');
  });

  await T('reliability: corrupted file with no snapshot starts fresh and keeps a copy', async page => {
    await page.goto(base + '/index.html'); await page.evaluate(k => { localStorage.clear(); localStorage.setItem(k, 'not json at all'); }, KEY);
    await page.reload(); await page.waitForSelector('.ui-box');
    expect((await page.innerText('.ui-box')).includes('تعذّرت قراءة بياناتك'), 'user is informed');
    const keys = await page.evaluate(() => Object.keys(localStorage));
    expect(keys.some(k => k.startsWith('tafawuq.corrupt.')), 'damaged copy kept: ' + keys.join(','));
  }, { fresh: true });

  await T('reliability: storage full (quota) does not crash the app', async page => {
    await open(page, '#/');
    await page.evaluate(() => { const orig = Storage.prototype.setItem; Storage.prototype.setItem = function (k, v) { if (String(k).startsWith('tafawuq')) throw new DOMException('full', 'QuotaExceededError'); return orig.call(this, k, v); }; });
    await go(page, `#/unit/${units[0].id}/vocab?m=quiz`);
    await hookQuiz(page); await go(page, `#/unit/${units[0].id}/vocab?m=quiz&x=1`);
    const qs = await page.evaluate(() => window.__qs);
    for (const q of qs.slice(0, 3)) { await answerPractice(page, q, true); await page.click('[data-next]'); }
    await page.evaluate(() => TAF.store.saveNow());
    eq(await page.evaluate(() => TAF.store.lastError), 'quota', 'quota error is tracked');
    await go(page, '#/more');
    expect((await page.innerText('main')).includes('المزيد'), 'app still navigable');
  });

  await T('reliability: blocked storage (private mode) falls back to memory and warns', async page => {
    await page.goto(base + '/index.html'); await page.waitForSelector('.ui-box');
    expect((await page.innerText('.ui-box')).includes('التخزين غير متاح') || (await page.innerText('.ui-box')).includes('أهلاً بك'), 'a dialog appears');
    await dismiss(page);
    const ok = await page.evaluate(() => TAF.store.persistent);
    eq(ok, false, 'persistent flag is false');
    await go(page, '#/units');
  }, { fresh: true, init: () => { Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('denied', 'SecurityError'); } }); } , allowErrors: true });

  await T('reliability: progress made in one tab appears in another', async (page, ctx) => {
    await open(page, '#/');
    const p2 = await ctx.newPage(); await p2.goto(base + '/index.html#/achievements'); await p2.waitForSelector('#main > *');
    await page.evaluate(() => { TAF.store.s.xp = 777; TAF.store.saveNow(); });
    await p2.waitForFunction(() => TAF.store.s.xp === 777, null, { timeout: 5000 });
    expect((await p2.innerText('main')).includes('777'), 'second tab re-rendered');
  });

  /* ---------- gamification ---------- */
  await T('gamification: XP, levels, badges, goal and celebrations', async page => {
    await open(page, '#/');
    await page.evaluate(() => { TAF.store.s.settings.celebrate = true; TAF.store.s.settings.goal = 10; TAF.store.saveNow(); });
    const lvl0 = await page.evaluate(() => TAF.game.info(TAF.store.s.xp).level);
    await page.evaluate(() => TAF.game.xp(150, 'test'));
    await page.waitForSelector('.ui-box');
    expect((await page.innerText('.ui-box')).includes('المستوى 2'), 'level-up dialog');
    await dismiss(page);
    await page.evaluate(() => { for (let i = 0; i < 10; i++) TAF.store.answer({ id: 'zz#' + i, topic: 'vocab:g11u1' }, true); });
    await page.waitForSelector('.ui-box', { timeout: 4000 });       // goal reached and/or first badge
    for (let i = 0; i < 4; i++) await dismiss(page);
    await flush(page);
    const s = await state(page);
    expect(s.badges.first, 'first-steps badge awarded');
    eq(s.daily.goalHit, true, 'goal flag');
    expect(s.xp > 150, 'xp increased');
    await go(page, '#/achievements');
    expect((await page.innerText('main')).includes('الخطوة الأولى'), 'badge listed');
    eq(lvl0, 1, 'started at level 1');
  });

  await T('gamification: celebration dialogs wait until the quiz is over', async page => {
    await open(page, '#/'); await hookQuiz(page);
    await page.evaluate(() => { TAF.store.s.settings.celebrate = true; TAF.store.saveNow(); });
    await go(page, `#/unit/${units[0].id}/grammar/0/practice`);
    const qs = await page.evaluate(() => window.__qs);
    for (let i = 0; i < 9; i++) { await answerPractice(page, qs[i], true); expect(!(await page.$('.ui-back')), 'no dialog mid-quiz (question ' + i + ')'); await page.click('[data-next]'); }
    await page.click('[data-exit]');                 // leaving the quiz releases the queued celebrations
    await page.waitForSelector('.ui-box', { timeout: 5000 });
    expect((await page.innerText('.ui-box')).length > 10, 'dialog shown after the quiz');
  });

  /* ---------- offline ---------- */
  await T('offline: app loads and works with no network after first visit', async (page, ctx) => {
    await page.goto(base + '/index.html'); await page.waitForSelector('#main > *');
    await page.waitForFunction(async () => { const r = await navigator.serviceWorker.getRegistration(); return !!(r && r.active); }, null, { timeout: 15000 });
    await page.waitForFunction(async () => (await caches.keys()).length > 0 && (await (await caches.open((await caches.keys())[0])).keys()).length > 20, null, { timeout: 15000 });
    await page.reload(); await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    await ctx.setOffline(true);
    await page.reload(); await page.waitForSelector('#main > *');
    await go(page, `#/unit/${units[0].id}/grammar/0`);
    expect((await page.innerText('main')).length > 300, 'lesson renders offline');
    expect(await page.evaluate(() => document.fonts.check('16px Readex')), 'fonts available offline');
    await ctx.setOffline(false);
  }, { sw: true });

  /* ---------- print center ---------- */
  const PRINT_KINDS = ['worksheet', 'exam', 'vocab', 'cards', 'report', 'certificate'];
  const PV = { viewport: { width: 1280, height: 900 } };
  const waitPaper = page => page.waitForFunction(() => !document.querySelector('[data-busy="1"]') && document.querySelector('.pr-pw'), null, { timeout: 15000 });
  const toolState = page => page.evaluate(() => { const v = document.getElementById('main')._pr; return { pages: v.state.pages.length, code: v.state.doc && v.state.doc.code, P: JSON.parse(JSON.stringify(v.ctx.P)), landscape: !!(v.state.doc && v.state.doc.landscape) }; });
  const stubPrint = page => page.evaluate(() => { window.__printed = []; window.print = () => window.__printed.push({ root: !!document.getElementById('print-root'), pages: document.querySelectorAll('#print-root .pp-page').length, cls: document.body.className, title: document.title }); });
  const pdfInfo = buf => { const t = buf.toString('latin1'), mb = t.match(/\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)\s*\]/) || []; return { pages: (t.match(/\/Type\s*\/Page[^s]/g) || []).length, w: +mb[1], h: +mb[2] }; };

  await T('print: the hub lists the six tools and each one renders a paged A4 preview', async page => {
    await open(page, '#/print');
    const hrefs = await page.$$eval('.pr-hub a', as => as.map(a => a.getAttribute('href')));
    for (const k of PRINT_KINDS) expect(hrefs.includes('#/print/' + k), 'hub is missing the link to ' + k);
    for (const k of PRINT_KINDS) {
      await go(page, '#/print/' + k); await waitPaper(page);
      const r = await page.evaluate(() => { const pg = document.querySelector('.pr-pw .pp-page'), b = pg.getBoundingClientRect(); return { pages: document.querySelectorAll('.pr-pw').length, stats: document.querySelector('[data-stats]').textContent.trim(), canPrint: !!document.querySelector('[data-act="print"]:not([disabled])'), ratio: b.width / b.height }; });
      expect(r.pages > 0 && r.stats && r.canPrint, `${k}: ${JSON.stringify(r)}`);
      expect(k === 'certificate' ? Math.abs(r.ratio - 297 / 210) < 0.02 : Math.abs(r.ratio - 210 / 297) < 0.02, `${k}: preview is not A4 (${r.ratio.toFixed(3)})`);
    }
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: the print button builds the A4 paper, calls print, then restores the app', async page => {
    await open(page, '#/print/worksheet'); await waitPaper(page);
    await stubPrint(page);
    const title0 = await page.title(), preview = (await toolState(page)).pages;
    await page.click('[data-act="print"]');
    await page.waitForFunction(() => window.__printed.length === 1);
    const p = await page.evaluate(() => window.__printed[0]);
    expect(p.root, 'the paper (#print-root) must exist while the browser prints');
    eq(p.pages, preview, 'pages in the print root vs the preview');
    expect(/pp-printing/.test(p.cls), 'body gets pp-printing so the app chrome is hidden');
    expect(p.title && p.title !== title0, 'document title becomes the sheet name (it is the PDF file name)');
    await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
    await page.waitForFunction(() => !document.getElementById('print-root') && !document.getElementById('taf-print-page'), null, { timeout: 3000 });
    expect(!(await page.evaluate(() => document.body.classList.contains('pp-printing'))), 'pp-printing removed after printing');
    eq(await page.title(), title0, 'document title restored after printing');
    // leaving the page while the paper is mounted also cleans up (hashchange)
    await page.click('[data-act="print"]'); await page.waitForFunction(() => window.__printed.length === 2);
    await go(page, '#/print');
    expect(!(await page.$('#print-root')), 'print root must not survive a navigation');
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: browser print (Ctrl+P) gives a real PDF — A4, same page count as the preview, every tool', async page => {
    await open(page, '#/print');
    for (const k of PRINT_KINDS) {
      await go(page, '#/print/' + k); await waitPaper(page);
      const prev = (await toolState(page)).pages;
      const info = pdfInfo(await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true }));
      eq(info.pages, prev, `${k}: pages in the PDF vs the preview`);
      expect(Math.abs(Math.min(info.w, info.h) - 595) < 2 && Math.abs(Math.max(info.w, info.h) - 842) < 2, `${k}: PDF is not A4 (${info.w}×${info.h})`);
      expect(k === 'certificate' ? info.w > info.h : info.h > info.w, `${k}: wrong orientation ${info.w}×${info.h}`);
      await page.waitForFunction(() => !document.getElementById('print-root'), null, { timeout: 3000 });
    }
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: the PDF carries the Arabic text and the student name', async page => {
    const { spawnSync } = require('child_process');
    if (spawnSync('pdftotext', ['-v']).error) { console.log('    (pdftotext not installed — text check skipped)'); return; }
    await open(page, '#/print');
    const dir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'taf-pdf-'));
    for (const [k, needles] of [['report', ['تقرير', 'اختبار']], ['certificate', ['شهادة', 'اختبار']], ['worksheet', ['ورقة عمل']], ['vocab', ['قائمة المفردات', 'keep in touch']]]) {
      await go(page, '#/print/' + k); await waitPaper(page);
      const f = path.join(dir, k + '.pdf'); fs.writeFileSync(f, await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true }));
      const txt = spawnSync('pdftotext', [f, '-'], { encoding: 'utf8' }).stdout.replace(/[‪-‮⁦-⁩]/g, '');
      for (const n of needles) expect(txt.includes(n) || txt.includes([...n].reverse().join('')), `${k}: PDF text does not contain «${n}»`);
      await page.waitForFunction(() => !document.getElementById('print-root'));
    }
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: worksheet — options change the sheet, the key can be removed or printed alone, "new sheet" differs', async page => {
    await open(page, '#/print/worksheet?seed=ABC123'); await waitPaper(page);
    const a = await toolState(page);
    expect(a.P.key === true && a.pages >= 2, 'worksheet starts with its answer key included');
    await stubPrint(page);
    await page.click('[data-act="keyonly"]'); await page.waitForFunction(() => window.__printed.length === 1);
    const keyOnly = await page.evaluate(() => window.__printed[0]);
    expect(keyOnly.pages >= 1 && keyOnly.pages < a.pages, `key-only print should be fewer pages than the whole (${keyOnly.pages} vs ${a.pages})`);
    await page.evaluate(() => TAF.print.cleanup());
    // switch the key off through the real checkbox → fewer pages in the preview
    await page.click('label.pr-sw:has(input[data-opt="key"])'); await waitPaper(page); await page.waitForTimeout(150);
    const b = await toolState(page);
    expect(b.P.key === false && b.pages === a.pages - keyOnly.pages, `without the key: ${b.pages} pages, expected ${a.pages - keyOnly.pages}`);
    // pick grammar focus and a bigger sheet
    await page.click('[data-opt="focus"][data-val="grammar"]'); await waitPaper(page); await page.waitForTimeout(150);
    await page.click('[data-opt="n"][data-val="30"]'); await waitPaper(page); await page.waitForTimeout(150);
    const c = await toolState(page);
    eq([c.P.focus, c.P.n], ['grammar', 30], 'options applied');
    expect(c.pages > b.pages, 'a 30-question sheet is longer than a 15-question one');
    // same seed → same paper; "new sheet" → different code
    const code1 = c.code; await page.click('[data-act="regen"]'); await waitPaper(page); await page.waitForTimeout(150);
    expect((await toolState(page)).code !== code1, 'regenerate must give a different sheet code');
    // options persist for the next visit
    await open(page, '#/print/worksheet'); await waitPaper(page);
    const d = await toolState(page); eq([d.P.focus, d.P.n, d.P.key], ['grammar', 30, false], 'print options are remembered');
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: the same seed always rebuilds the same sheet (teacher can re-print or share the code)', async page => {
    await open(page, '#/print/worksheet?seed=ABC123'); await waitPaper(page);
    const first = await page.evaluate(() => { const v = document.getElementById('main')._pr; return { code: v.state.doc.code, txt: v.state.doc.txt }; });
    eq(first.code, 'ABC123', 'the seed in the URL is the sheet code');
    await go(page, '#/print/worksheet?seed=ZZZ999'); await waitPaper(page);
    const other = await page.evaluate(() => document.getElementById('main')._pr.state.doc.txt);
    expect(other !== first.txt, 'a different seed must give a different sheet');
    await go(page, '#/print/worksheet?seed=ABC123'); await waitPaper(page);
    const again = await page.evaluate(() => document.getElementById('main')._pr.state.doc.txt);
    expect(again === first.txt, 'the same seed must rebuild the identical sheet');
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: downloads (worksheet .txt, vocabulary .csv/.txt) are UTF-8 with BOM and clean of markup', async page => {
    const grab = async sel => { const [dl] = await Promise.all([page.waitForEvent('download'), page.click(sel)]); const f = path.join(require('os').tmpdir(), 'taf-' + Date.now() + '-' + dl.suggestedFilename()); await dl.saveAs(f); return { name: dl.suggestedFilename(), buf: fs.readFileSync(f) }; };
    const bom = b => b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF;
    await open(page, '#/print/vocab'); await waitPaper(page);
    let d = await grab('[data-act="csv"]');
    expect(/\.csv$/.test(d.name) && bom(d.buf), `csv name/BOM: ${d.name}`);
    let t = d.buf.toString('utf8'); expect(/keep in touch/.test(t) && /[؀-ۿ]/.test(t), 'csv has English words and Arabic meanings');
    expect(!/<[a-z]|\*\*/.test(t), 'csv contains markup');
    d = await grab('[data-act="txt"]'); t = d.buf.toString('utf8');
    expect(/\.txt$/.test(d.name) && bom(d.buf) && !/<[a-z]|\*\*/.test(t), `vocab txt: ${d.name}`);
    await go(page, '#/print/worksheet'); await waitPaper(page);
    d = await grab('[data-act="txt"]'); t = d.buf.toString('utf8');
    expect(bom(d.buf) && /1\./.test(t) && !/<[a-z]|\*\*/.test(t), 'worksheet txt has numbered questions and no markup');
    await go(page, '#/print/report'); await waitPaper(page);
    d = await grab('[data-act="txt"]'); t = d.buf.toString('utf8');
    expect(!/<[a-z]|\*\*/.test(t) && /اختبار/.test(t), 'report txt carries the name and no markup');
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: report and certificate use the student\'s name and real progress', async page => {
    await open(page, '#/print/report'); await waitPaper(page);
    const rep = await page.evaluate(() => { const d = document.getElementById('main')._pr.state.doc; return d.txt; });
    expect(/اختبار/.test(rep) && /1260/.test(rep) && /6/.test(rep) && /الوحدة 1: \d+%/.test(rep), 'report is missing the name / XP / streak / unit progress');
    expect(/72%/.test(await page.evaluate(() => document.querySelector('.pr-pw').textContent + [...document.querySelectorAll('.pr-pw')].map(x => x.textContent).join(' '))), 'report history shows the 72% mock exam');
    // type another name into the field → preview updates
    await page.fill('input[data-opt="name"]', 'سارة'); await page.waitForTimeout(500); await waitPaper(page);
    expect(/سارة/.test(await page.evaluate(() => document.getElementById('main')._pr.state.doc.txt)), 'typing a name must update the report');
    await go(page, '#/print/certificate'); await waitPaper(page);
    const cert = await page.evaluate(() => document.getElementById('main')._pr.state.doc.txt);
    expect(/اختبار/.test(cert) && /90%/.test(cert), `certificate lacks the name / score: ${cert}`);
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: starred words ("My words") can be printed as a list and as cut-out cards', async page => {
    await open(page, '#/print/vocab'); await waitPaper(page);
    await page.click('[data-opt="src"][data-val="starred"]'); await waitPaper(page); await page.waitForTimeout(150);
    let st = await page.evaluate(() => document.getElementById('main')._pr.state.doc.txt);
    expect(/keep in touch/.test(st) && /overhear/.test(st) && !/get in touch/.test(st), 'only the starred words are listed');
    await go(page, '#/print/cards'); await waitPaper(page);
    await page.click('[data-opt="src"][data-val="starred"]'); await waitPaper(page); await page.waitForTimeout(150);
    st = await page.evaluate(() => document.getElementById('main')._pr.state.doc.txt);
    expect(/keep in touch/.test(st) && /overhear/.test(st), 'starred words appear on the cards');
    const pages = (await toolState(page)).pages; eq(pages, 2, 'two cards → one sheet of fronts and one of backs');
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: word tools start with ONE unit (not the whole book); "all units" is one tap away', async page => {
    await open(page, '#/print/cards'); await waitPaper(page);
    const a = await toolState(page);
    eq(a.P.units.length, 1, 'cards: first visit selects a single unit'); expect(a.pages <= 16, `cards: ${a.pages} pages by default is too many`);
    await page.click('[data-opt="units"][data-val="__all"]'); await waitPaper(page); await page.waitForTimeout(150);
    const b = await toolState(page); eq(b.P.units, [], 'cards: "all units" is empty selection'); expect(b.pages > a.pages * 5, 'cards: all units means many more pages');
    await go(page, '#/print/vocab'); await waitPaper(page);
    const c = await toolState(page); eq(c.P.units.length, 1, 'vocab: first visit selects a single unit'); expect(c.pages <= 6, `vocab: ${c.pages} pages by default`);
  }, Object.assign({ seed: seedState({ settings: { onboarded: true, name: 'اختبار', celebrate: false, sound: false, haptics: false, motion: 'off', grade: 11 } }) }, PV));

  await T('print: grade 12 — every tool builds and prints', async page => {
    await open(page, '#/print');
    for (const k of PRINT_KINDS) {
      await go(page, '#/print/' + k); await waitPaper(page);
      const r = await toolState(page);
      expect(r.pages > 0, `grade 12 ${k}: empty preview`);
      const info = pdfInfo(await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true }));
      eq(info.pages, r.pages, `grade 12 ${k}: PDF pages vs preview`);
      await page.waitForFunction(() => !document.getElementById('print-root'), null, { timeout: 3000 });
    }
  }, Object.assign({ seed: richProgress(12) }, PV));

  await T('print: plain-text and CSV exports never leak markup (all tools, many option sets, both grades)', async page => {
    await open(page, '#/print');
    for (const grade of [11, 12]) {
      await page.evaluate(g => { TAF.store.s.settings.grade = g; TAF.store.save(); }, grade);
      const bad = await page.evaluate(async () => {
        await TAF.print.fontsReady();
        const out = [], V = {
          worksheet: [{}, { focus: 'grammar' }, { focus: 'reading' }, { focus: 'vocab' }, { n: 40 }],
          exam: [{}, { pattern: 'g11' }, { pattern: 'adv' }],
          vocab: [{ units: [] }, { layout: 'fold' }, { layout: 'fold', vis: 'ar', foldKey: 'page' }, { layout: 'az', units: [] }, { def: true, units: [] }],
          cards: [{ units: [] }, { rev: true, units: [] }], report: [{}, { advice: false }], certificate: [{}, { showScore: false }]
        };
        for (const [k, list] of Object.entries(V)) for (const o of list) for (const seed of [1, 7, 99]) {
          let b; try { b = TAF.print._build(k, o, seed); } catch (e) { out.push(`${k} ${JSON.stringify(o)} threw ${e.message}`); continue; }
          if (!b.doc) continue;
          for (const f of ['txt', 'csv']) { const t = b.doc[f]; if (!t) continue; const m = t.match(/<\/?[a-z][^>]*>|\*\*|(?<!=)==(?!=)|&[a-z]+;|&#\d+;|undefined|\bNaN\b|\[object/); if (m) out.push(`${k} ${JSON.stringify(o)} #${seed} ${f}: «${m[0]}»`); }
        }
        return out;
      });
      expect(!bad.length, `grade ${grade}: ` + bad.slice(0, 5).join('\n'));
    }
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: no sheet ends with a nearly empty last page (every unit, list / A-Z / fold / worksheet / keys)', async page => {
    await open(page, '#/print');
    const orphans = await page.evaluate(async () => {
      await TAF.print.fontsReady();
      const res = [];
      for (const g of [11, 12]) {
        TAF.store.s.settings.grade = g;
        for (const u of TAF.unitsFor(g)) for (const [kind, o] of [['vocab', { units: [u.id], layout: 'list' }], ['vocab', { units: [u.id], layout: 'az' }], ['vocab', { units: [u.id], layout: 'fold', foldKey: 'page' }], ['worksheet', { unit: u.id, focus: 'grammar', n: 15 }], ['worksheet', { unit: u.id, focus: 'vocab', n: 20 }], ['worksheet', { unit: u.id, focus: 'mixed', n: 25 }]]) {
          const secs = [...new DOMParser().parseFromString(TAF.print._build(kind, o, 4242).pages.join(''), 'text/html').querySelectorAll('section.pp-page')];
          const byRole = {}; secs.forEach(s => { (byRole[s.dataset.role] = byRole[s.dataset.role] || []).push(s.querySelectorAll('.pp-blk').length); });
          for (const [role, arr] of Object.entries(byRole)) if (arr.length > 1 && arr[arr.length - 1] <= 2) res.push(`${kind} ${JSON.stringify(o)} ${role}: ${arr.length} pages, last has ${arr[arr.length - 1]} block(s)`);
        }
      }
      return res;
    });
    expect(!orphans.length, `${orphans.length} sheets end with an almost empty page:\n` + orphans.slice(0, 6).join('\n'));
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: the paper ignores dark theme and a large font setting', async page => {
    await open(page, '#/print');
    await page.evaluate(() => { TAF.store.s.settings.theme = 'dark'; TAF.store.s.settings.font = 'xl'; TAF.app.applyTheme(); });
    await go(page, '#/print/worksheet'); await waitPaper(page);
    await page.evaluate(() => { const v = document.getElementById('main')._pr; TAF.print.mountRoot(v.state.pages, { title: 't' }); });
    await page.emulateMedia({ media: 'print' });
    const r = await page.evaluate(() => { const pg = document.querySelector('#print-root .pp-page'), cs = getComputedStyle(pg), b = pg.getBoundingClientRect(), vis = [...document.body.children].filter(e => getComputedStyle(e).display !== 'none' && e.id !== 'print-root' && !/^(SCRIPT|STYLE|LINK)$/.test(e.tagName)).map(e => e.tagName + '#' + e.id + '.' + e.className); return { bg: cs.backgroundColor, color: cs.color, w: Math.round(b.width), h: Math.round(b.height), vis }; });
    await page.emulateMedia({ media: 'screen' });
    eq(r.bg, 'rgb(255, 255, 255)', 'paper background'); expect(/^rgb\((\d+), (\d+), (\d+)\)$/.test(r.color) && RegExp.$1 < 60, `paper text should be dark, got ${r.color}`);
    expect(Math.abs(r.w - 794) <= 2 && Math.abs(r.h - 1123) <= 4, `A4 at 96dpi should be 794×1123 px, got ${r.w}×${r.h}`);
    eq(r.vis, [], 'while printing, nothing but the paper may be visible');
  }, Object.assign({ seed: richProgress(11) }, PV));

  await T('print: hub and tools fit a phone screen (no sideways scrolling) and the key buttons are reachable', async page => {
    await open(page, '#/print');
    for (const h of ['#/print', ...PRINT_KINDS.map(k => '#/print/' + k)]) {
      await go(page, h); await page.waitForTimeout(400);
      const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, btn: (() => { const b = document.querySelector('[data-act="print"]'); if (!b) return null; const x = b.getBoundingClientRect(); return { w: x.width, h: x.height, inView: x.left >= 0 && x.right <= innerWidth + 1 }; })() }));
      expect(r.sw <= r.iw + 1, `${h}: horizontal overflow ${r.sw} > ${r.iw}`);
      if (h !== '#/print') expect(r.btn && r.btn.inView && r.btn.h >= 40, `${h}: print button not usable ${JSON.stringify(r.btn)}`);
    }
  }, { seed: richProgress(11) });

  await T('print: pages with their own print button (plan, unit summary, rules summary) hide the app chrome', async page => {
    await open(page, '#/');
    for (const h of ['#/plan', '#/unit/' + units[0].id + '/summary', '#/cheatsheet', '#/tips']) {
      await go(page, h);
      await page.emulateMedia({ media: 'print' });
      const r = await page.evaluate(() => { const hid = sel => [...document.querySelectorAll(sel)].every(e => getComputedStyle(e).display === 'none'); return { nav: hid('.topbar, .bottomnav, .sidenav'), btns: hid('main .btn'), bg: getComputedStyle(document.body).backgroundColor }; });
      const info = pdfInfo(await page.pdf({ format: 'A4', printBackground: true }));
      await page.emulateMedia({ media: 'screen' });
      expect(r.nav && r.btns && r.bg === 'rgb(255, 255, 255)', `${h}: chrome visible in print ${JSON.stringify(r)}`);
      expect(info.pages >= 1 && info.pages <= 14, `${h}: ${info.pages} PDF pages`);
    }
  }, Object.assign({ seed: richProgress(11) }, PV));

  /* ---------- accessibility (axe) ---------- */
  for (const dark of [false, true]) {
    await T(`a11y: axe finds no serious/critical WCAG A/AA issues on key screens (${dark ? 'dark' : 'light'} theme)`, async page => {
      await open(page, '#/');
      const bg = (await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).match(/\d+/g).slice(0, 3).map(Number), lum = (bg[0] + bg[1] + bg[2]) / 3;
      expect(dark ? lum < 90 : lum > 200, `the ${dark ? 'dark' : 'light'} theme is not applied (body background rgb(${bg}))`);
      await page.addScriptTag({ path: path.join(__dirname, 'vendor', 'axe.min.js') });
      const u0 = units[0].id;
      const screens = ['#/', '#/units', `#/unit/${u0}`, `#/unit/${u0}/vocab`, `#/unit/${u0}/grammar/0`, `#/unit/${u0}/reading`, `#/unit/${u0}/reading?m=listen`, `#/unit/${u0}/reading?m=story`, `#/unit/${u0}/writing`, `#/unit/${u0}/speaking`, `#/unit/${u0}/summary`,
        '#/practice', '#/exam', '#/more', '#/achievements', '#/words', '#/speed', '#/plan', '#/tips', '#/stats', '#/cheatsheet', '#/mistakes', '#/search',
        '#/print', '#/print/worksheet', '#/print/exam', '#/print/vocab', '#/print/cards', '#/print/report', '#/print/certificate'];
      const bad = [];
      for (const h of screens) {
        await go(page, h);
        if (h.startsWith('#/print/')) await page.waitForFunction(() => !document.querySelector('[data-busy="1"]'), null, { timeout: 15000 }).catch(() => {});
        const r = await page.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'], resultTypes: ['violations'] })).violations.filter(v => v.impact === 'serious' || v.impact === 'critical').map(v => ({ id: v.id, n: v.nodes.length, sample: v.nodes[0].target.join(' '), help: v.help })));
        r.forEach(v => bad.push(`${h}: ${v.id} ×${v.n} (${v.help}) e.g. ${v.sample}`));
      }
      // a live quiz and the exam start screen too
      await go(page, `#/unit/${u0}/grammar/0`);
      const startBtn = await page.$('[data-start], [data-practice], .btn[href*="drill"], [data-quiz]');
      if (startBtn) { await startBtn.click(); await page.waitForTimeout(400); const r = await page.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'], resultTypes: ['violations'] })).violations.filter(v => v.impact === 'serious' || v.impact === 'critical').map(v => `${v.id} ×${v.nodes.length} e.g. ${v.nodes[0].target.join(' ')}`)); r.forEach(v => bad.push('quiz: ' + v)); }
      if (bad.length) throw new Error(bad.slice(0, 14).join('\n'));
    }, Object.assign({ dark, seed: richProgress(11) }, PV));
  }

  /* ---------- visual snapshots for manual review ---------- */
  for (const [label, vp, dark] of [['mobile', { width: 390, height: 844 }, false], ['mobile-dark', { width: 390, height: 844 }, true], ['desktop', { width: 1280, height: 800 }, false]]) {
    await T('screenshots: ' + label, async page => {
      const pages = { home: '#/', units: '#/units', unit: `#/unit/${units[0].id}`, grammar: `#/unit/${units[0].id}/grammar/0`, vocab: `#/unit/${units[0].id}/vocab`, writing: `#/unit/${units[0].id}/writing`, exam: '#/exam', more: '#/more', achievements: '#/achievements' };
      for (const [n, h] of Object.entries(pages)) { await open(page, h); await page.waitForTimeout(200); await page.screenshot({ path: path.join(SHOTS, `${label}-${n}.png`), fullPage: false }); }
    }, { viewport: vp, dark });
  }

  await browser.close(); server.close();
  const failed = results.filter(r => !r[1]);
  console.log(`\n${results.length - failed.length}/${results.length} scenarios passed`);
  if (failed.length) { console.log('FAILED:\n' + failed.map(f => ' - ' + f[0]).join('\n')); process.exit(1); }
}
main().catch(e => { console.error(e); process.exit(2); });

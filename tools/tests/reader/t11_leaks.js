const { launch, open, sleep, mkT } = require('./lib');
const T = mkT('NO LISTENER / TIMER LEAKS');
(async () => {
  const { browser, ctx, page, errors } = await launch({});
  const cdp = await ctx.newCDPSession(page);
  const count = async expr => {
    const { result } = await cdp.send('Runtime.evaluate', { expression: expr });
    const { listeners } = await cdp.send('DOMDebugger.getEventListeners', { objectId: result.objectId });
    const by = {}; listeners.forEach(l => { by[l.type] = (by[l.type] || 0) + 1; }); return by;
  };
  await open(page, '/unit/g11u5/reading?m=read');
  await page.evaluate(() => { location.hash = '#/units'; }); await sleep(300);
  const base = { d: await count('document'), w: await count('window') };
  const intervals = await page.evaluate(() => { window.__iv = 0; const si = window.setInterval, ci = window.clearInterval; const live = new Set(); window.setInterval = function () { const id = si.apply(window, arguments); live.add(id); return id; }; window.clearInterval = function (id) { live.delete(id); return ci(id); }; window.__live = live; return 0; });
  for (let round = 0; round < 6; round++) {
    for (const m of ['read', 'listen', 'story']) {
      await page.evaluate(m => { location.hash = '#/unit/g11u5/reading?m=' + m; }, m); await sleep(250);
      // exercise: open a popup, start narration / timer
      if (m === 'read') { await page.locator('.rd-passage .rd-w').nth(5).click(); await page.locator('[data-tool="timer"]').click(); }
      if (m === 'listen') { await page.locator('[data-play]').click(); await page.locator('[data-tog="shadow"]').click(); await sleep(200); }
      if (m === 'story') { await page.locator('[data-narr]').click(); await sleep(150); }
    }
  }
  await page.evaluate(() => { location.hash = '#/units'; }); await sleep(500);
  const after = { d: await count('document'), w: await count('window') };
  const diff = (a, b) => Object.keys(Object.assign({}, a, b)).filter(k => (a[k] || 0) !== (b[k] || 0)).map(k => `${k}: ${a[k] || 0} -> ${b[k] || 0}`);
  T.eq('document listeners back to baseline', diff(base.d, after.d), []);
  T.eq('window listeners back to baseline', diff(base.w, after.w), []);
  T.eq('no intervals left running', await page.evaluate(() => window.__live.size), 0);
  T.ok('speech cancelled and quiet', await page.evaluate(() => !speechSynthesis.speaking));
  console.log('  baseline document:', JSON.stringify(base.d), '\n  after document   :', JSON.stringify(after.d));
  T.eq('errors', errors, []);
  const ok = T.done([]); await browser.close(); process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

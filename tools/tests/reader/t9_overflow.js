const { launch, open, sleep, mkT, shot } = require('./lib');
const T = mkT('NO HORIZONTAL OVERFLOW');
(async () => {
  for (const w of [320, 360, 390, 412, 768, 1280]) {
    const { browser, page, errors } = await launch({ w, h: w > 700 ? 800 : 780 });
    await open(page, '/unit/g11u5/reading?m=read');
    for (const m of ['read', 'listen', 'story']) {
      await page.evaluate(m => { location.hash = '#/unit/g11u5/reading?m=' + m; }, m); await sleep(350);
      if (m === 'read') { await page.locator('.rd-passage .rd-w', { hasText: /^Tibetology$/ }).first().click(); await sleep(350); }
      if (m === 'story') { await page.locator('.rd-opt').first().click(); await sleep(300); }
      const o = await page.evaluate(() => { const d = document.documentElement; const wide = [...document.querySelectorAll('main *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1) && getComputedStyle(e).position !== 'fixed' && !e.closest('.rd-print') && !e.closest('[hidden]') && getComputedStyle(e).display !== 'none'; }).slice(0, 4).map(e => e.className || e.tagName); return { sw: d.scrollWidth, iw: innerWidth, wide }; });
      T.ok(`${w}px ${m}: no horizontal overflow`, o.sw <= o.iw + 1 && o.wide.length === 0, o);
      if (w === 320 && m === 'listen') await shot(page, 'ov_320_listen');
    }
    T.eq(`${w}px errors`, errors, []);
    await browser.close();
  }
  const ok = T.done([]); process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

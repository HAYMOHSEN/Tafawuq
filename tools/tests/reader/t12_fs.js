const { launch, open, sleep, mkT, shot } = require('./lib');
const T = mkT('LARGEST FONT SETTING (fs=1.2)');
(async () => {
  for (const w of [360, 390]) {
    const { browser, page, errors } = await launch({ w, h: 780, settings: { fs: 1.2 } });
    await open(page, '/unit/g11u5/reading?m=read');
    T.eq(`${w}: root font scaled`, await page.evaluate(() => getComputedStyle(document.documentElement).fontSize), '19.2px');
    for (const m of ['read', 'listen', 'story']) {
      await page.evaluate(m => { location.hash = '#/unit/g11u5/reading?m=' + m; }, m); await sleep(350);
      const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, wide: [...document.querySelectorAll('main *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1) && getComputedStyle(e).position !== 'fixed' && !e.closest('.rd-print') && !e.closest('[hidden]'); }).slice(0, 3).map(e => e.className || e.tagName) }));
      T.ok(`${w} ${m}: no overflow at fs 1.2`, o.sw <= o.iw + 1 && o.wide.length === 0, o);
      if (m === 'listen') { await page.locator('[data-play]').click(); await sleep(300); await shot(page, `fs_${w}_listen`); }
    }
    // print block unaffected by the font setting (12pt = 16px)
    await page.evaluate(() => { location.hash = '#/unit/g11u5/reading?m=read'; }); await sleep(300);
    await page.emulateMedia({ media: 'print' });
    T.eq(`${w}: print type size independent of fs`, await page.evaluate(() => getComputedStyle(document.querySelector('.rd-print')).fontSize), '16px');
    await page.emulateMedia({ media: 'screen' });
    T.eq(`${w}: errors`, errors, []);
    await browser.close();
  }
  const ok = T.done([]); process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

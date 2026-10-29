const { launch, open, shot, sleep, mkT } = require('./lib');
const T = mkT('A11Y audit: touch targets, names, focus ring');
(async () => {
  const { browser, ctx, page, errors } = await launch({ touch: true, mobile: true });
  const audit = async label => {
    const bad = await page.evaluate(() => {
      const out = [];
      const sel = 'main button, main a[href], main [role="button"], main input[type="range"], .rd-pop button, .rd-pop a';
      document.querySelectorAll(sel).forEach(e => {
        if (e.closest('.rd-print') || e.classList.contains('rd-w') || e.classList.contains('rd-kw') || e.closest('.crumbs')) return;
        const cs = getComputedStyle(e), r = e.getBoundingClientRect();
        if (cs.display === 'none' || cs.visibility === 'hidden' || r.width === 0 || r.height === 0) return;
        const name = (e.getAttribute('aria-label') || e.textContent || e.title || '').trim();
        if (r.height < 43.5 || r.width < 43.5) out.push({ tag: e.tagName.toLowerCase() + '.' + String(e.className).split(' ').slice(0, 2).join('.'), w: Math.round(r.width), h: Math.round(r.height), name: name.slice(0, 25) });
        if (!name && !e.querySelector('svg title')) out.push({ tag: 'NO NAME ' + e.tagName + '.' + e.className });
      });
      return out;
    });
    T.ok(label + ': all targets >= 44px and named', bad.length === 0, bad);
  };
  // read
  await open(page, '/unit/g11u5/reading?m=read');
  await audit('read');
  await page.locator('.rd-passage .rd-w', { hasText: /^fingertips$/ }).first().click();
  await page.waitForSelector('.rd-pop.rd-in'); await sleep(300);
  await audit('read + popup');
  await page.keyboard.press('Escape');
  await page.locator('.rd-tool[data-tool="timer"]').click();
  await audit('read + timer dock');
  await page.locator('[data-tm="stop"]').click();
  await audit('read + timer result');
  // listen
  await page.evaluate(() => { location.hash = '#/unit/g11u5/reading?m=listen'; }); await sleep(400);
  await audit('listen');
  // story
  await page.evaluate(() => { location.hash = '#/unit/g11u5/reading?m=story'; }); await sleep(400);
  await audit('story card 1');
  await page.locator('.rd-opt').first().click(); await sleep(200);
  await audit('story answered');
  await page.evaluate(() => { location.hash = '#/unit/g11u5/reading?m=story'; });
  // focus ring visible from keyboard
  await page.evaluate(() => { location.hash = '#/unit/g11u5/reading?m=read'; }); await sleep(300);
  await page.locator('.rd-tool').first().focus();
  await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
  const ring = await page.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return { cls: e.className, outline: cs.outlineStyle + ' ' + cs.outlineWidth }; });
  T.ok('keyboard focus shows an outline', /solid [23]px/.test(ring.outline), ring);
  console.log('errors:', errors);
  const ok = T.done(errors);
  await browser.close(); process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

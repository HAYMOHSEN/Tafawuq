const { launch, open, sleep, mkT, shot } = require('./lib');
const T = mkT('NARROW PHONE DOCK (320/360)');
(async () => {
  for (const w of [320, 360]) {
    const { browser, page, errors } = await launch({ w, h: 740 });
    await open(page, '/unit/g11u5/reading?m=listen');
    T.ok(`${w}: options visible before playing`, await page.evaluate(() => document.querySelector('[data-dock]').classList.contains('rd-opts-open')) && await page.locator('[data-speed], .rd-speed').first().isVisible());
    const h0 = await page.evaluate(() => Math.round(document.querySelector('[data-dock]').getBoundingClientRect().height));
    await page.locator('[data-play]').click(); await sleep(300);
    T.ok(`${w}: options tuck away when playback starts`, !(await page.evaluate(() => document.querySelector('[data-dock]').classList.contains('rd-opts-open'))) && !(await page.locator('.rd-speed').isVisible()));
    const h1 = await page.evaluate(() => Math.round(document.querySelector('[data-dock]').getBoundingClientRect().height));
    T.ok(`${w}: dock shrinks (${h0}px -> ${h1}px)`, h1 < h0 - 60 && h1 < 150, [h0, h1]);
    await shot(page, `n_${w}_collapsed`);
    await page.locator('[data-optbtn]').click(); await sleep(100);
    T.ok(`${w}: gear reopens`, await page.locator('.rd-speed').isVisible());
    await page.locator('[data-tog="loop"]').click();
    await page.locator('[data-optbtn]').click();
    T.ok(`${w}: gear shows a dot when an option is on`, await page.evaluate(() => document.querySelector('[data-optbtn]').hasAttribute('data-on')));
    T.eq(`${w}: gear aria-expanded`, await page.locator('[data-optbtn]').getAttribute('aria-expanded'), 'false');
    T.eq(`${w}: errors`, errors, []);
    await browser.close();
  }
  const ok = T.done([]); process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

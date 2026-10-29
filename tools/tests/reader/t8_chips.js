const { launch, open, shot, sleep, mkT } = require('./lib');
const T = mkT('GLOSS CHIPS + PRINT REFRESH');
(async () => {
  const { browser, page, errors } = await launch({});
  await page.addInitScript(() => { window.__p = []; window.print = () => { __p.push(document.querySelector('.rd-print').innerHTML); }; });
  await open(page, '/unit/g11u5/reading?m=read');
  const n = await page.locator('button.rd-gchip').count();
  T.eq('all 16 gloss chips are interactive', n, 16);
  const y0 = await page.evaluate(() => scrollY);
  await page.locator('button.rd-gchip', { hasText: 'obstacle' }).scrollIntoViewIfNeeded();
  const y1 = await page.evaluate(() => scrollY);
  await page.locator('button.rd-gchip', { hasText: 'obstacle' }).click();
  await page.waitForSelector('.rd-pop.rd-in'); await sleep(450);
  T.eq('popup shows the chip word', await page.locator('.rd-pop-word').innerText(), 'obstacle');
  T.ok('page did not jump away to the passage', Math.abs((await page.evaluate(() => scrollY)) - y1) < 140, [y1, await page.evaluate(() => scrollY)]);
  T.ok('chip is visible above the sheet', await page.evaluate(() => { const c = [...document.querySelectorAll('.rd-gchip')].find(x => x.textContent.includes('obstacle')).getBoundingClientRect(); const p = document.querySelector('.rd-pop').getBoundingClientRect(); return c.bottom <= p.top + 2 && c.top >= 0; }));
  await shot(page, 'c1_chip_popup');
  await page.keyboard.press('Escape');
  // multi-word chip
  await page.locator('button.rd-gchip', { hasText: 'set out to' }).click();
  await page.waitForSelector('.rd-pop.rd-in');
  T.ok('phrase chip resolves the phrase', (await page.locator('.rd-pop-phrase').innerText()).includes('set out to'));
  await page.keyboard.press('Escape');
  // print block reflects highlights made after mount
  await page.locator('[data-tool="pen"]').click();
  await page.locator('.rd-passage .rd-w', { hasText: /^obstacle$/ }).first().click();
  await page.locator('[data-tool="pen"]').click();
  await page.locator('[data-tool="print"]').click();
  T.eq('print called', await page.evaluate(() => __p.length), 1);
  T.ok('print html includes the new highlight', await page.evaluate(() => /rd-pr-hl/.test(__p[0])));
  T.eq('errors', errors, []);
  const ok = T.done([]);
  await browser.close(); process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

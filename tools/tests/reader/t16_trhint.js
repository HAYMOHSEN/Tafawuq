const { launch, open, sleep, mkT, shot } = require('./lib');
const T = mkT('NO-MEANING -> SHOW PARAGRAPH TRANSLATION');
(async () => {
  const { browser, page, errors } = await launch({});
  await open(page, '/unit/g11u5/reading?m=read');
  await page.locator('.rd-passage .rd-w', { hasText: /^covered$/ }).first().click();
  await page.waitForSelector('.rd-pop.rd-in');
  T.ok('button offered when the word has no entry', (await page.locator('.rd-pop [data-trpara]').count()) === 1);
  await shot(page, 'th_popup');
  await page.locator('.rd-pop [data-trpara]').click(); await sleep(500);
  T.ok('popup closed', await page.evaluate(() => document.querySelector('.rd-pop').hidden));
  T.ok('translation of paragraph 1 is open', await page.evaluate(() => !document.querySelector('[data-trbox="0"]').hidden));
  T.eq('its toggle shows expanded', await page.locator('[data-tr="0"]').getAttribute('aria-expanded'), 'true');
  T.ok('translation scrolled into view', await page.evaluate(() => { const r = document.querySelector('[data-trbox="0"]').getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }));
  // known word: no such button
  await page.locator('.rd-passage .rd-w', { hasText: /^fingertips$/ }).first().click();
  T.eq('no button when a meaning exists', await page.locator('.rd-pop [data-trpara]').count(), 0);
  await page.keyboard.press('Escape');
  // story mode
  await page.evaluate(() => { location.hash = '#/unit/g11u5/reading?m=story'; }); await sleep(500);
  await page.locator('.rd-bigtext .rd-w', { hasText: /^covered$/ }).first().click();
  await page.waitForSelector('.rd-pop.rd-in');
  await page.locator('.rd-pop [data-trpara]').click(); await sleep(400);
  T.ok('story: card translation opened', await page.evaluate(() => !document.querySelector('[data-trbox]').hidden && document.querySelector('[data-tr]').getAttribute('aria-pressed') === 'true'));
  // listen mode has no translation UI -> no button
  await page.evaluate(() => { location.hash = '#/unit/g11u5/reading?m=listen'; }); await sleep(500);
  await page.locator('.rd-passage .rd-w', { hasText: /^covered$/ }).first().click();
  await page.waitForSelector('.rd-pop.rd-in');
  T.eq('listen: no translation shortcut', await page.locator('.rd-pop [data-trpara]').count(), 0);
  T.eq('errors', errors, []);
  const ok = T.done([]); await browser.close(); process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

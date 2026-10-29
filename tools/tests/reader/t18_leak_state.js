const { launch, open, sleep, mkT } = require('./lib');
const T = mkT('NO STATE LEAKS ONTO OTHER PAGES (router clones <main>)');
(async () => {
  const { browser, page, errors } = await launch({});
  await open(page, '/unit/g11u5/reading?m=read');
  T.ok('reading page has rd-main', await page.evaluate(() => document.querySelector('main').classList.contains('rd-main')));
  for (const h of ['#/units', '#/cheatsheet', '#/', '#/unit/g11u5/reading/questions', '#/more']) {
    await page.evaluate(h => { location.hash = h; }, h); await sleep(400);
    const o = await page.evaluate(() => { const m = document.querySelector('main'); return { cls: m.className, style: m.getAttribute('style') }; });
    T.ok(`${h}: main carries no reader classes / inline vars`, !/rd-/.test(o.cls) && !/rd-/.test(o.style || ''), o);
  }
  // printing another page must still show its content
  await page.evaluate(() => { location.hash = '#/cheatsheet'; }); await sleep(500);
  await page.emulateMedia({ media: 'print' });
  const vis = await page.evaluate(() => [...document.querySelector('main').children].filter(c => getComputedStyle(c).display !== 'none').length);
  T.ok('cheat sheet still prints (content not hidden by the passage-print rule)', vis > 0, vis);
  await page.emulateMedia({ media: 'screen' });
  T.eq('errors', errors, []);
  const ok = T.done([]); await browser.close(); process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

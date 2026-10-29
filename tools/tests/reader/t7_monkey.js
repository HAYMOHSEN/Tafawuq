const { launch, open, shot, sleep, mkT } = require('./lib');
const T = mkT('MONKEY (random interaction, no errors)');
function rng(seed) { let s = seed; return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296; }
(async () => {
  for (const [seed, w, h, touch] of [[7, 390, 844, true], [21, 1280, 800, false], [99, 360, 740, true]]) {
    const R = rng(seed);
    const { browser, ctx, page, errors } = await launch({ w, h, touch, mobile: touch });
    await page.addInitScript(() => { window.print = () => {}; });
    await open(page, '/unit/g11u' + (1 + Math.floor(R() * 5)) + '/reading?m=read');
    await page.evaluate(() => { __tts.msPerWord = 15; });
    const modes = ['read', 'listen', 'story'];
    const keys = ['Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', ' ', 'Tab', 'Home', 'End'];
    let actions = 0;
    const t0 = Date.now();
    while (Date.now() - t0 < 22000) {
      const r = R();
      try {
        if (r < 0.45) {                                   // click a random visible interactive element
          const els = await page.evaluate(() => [...document.querySelectorAll('main button, main a[href^="#/unit"], .rd-w, .rd-kw, .rd-s, .rd-pop button, .rd-seek')].filter(e => { const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return b.width > 0 && b.height > 0 && cs.visibility !== 'hidden' && !e.closest('[hidden]') && !(e.tagName === 'A' && /reading\/questions/.test(e.getAttribute('href'))) && !e.matches('[data-tool="print"]'); }).map((e, i) => i));
          if (els.length) {
            const k = els[Math.floor(R() * els.length)];
            await page.evaluate(k => { const list = [...document.querySelectorAll('main button, main a[href^="#/unit"], .rd-w, .rd-kw, .rd-s, .rd-pop button, .rd-seek')].filter(e => { const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return b.width > 0 && b.height > 0 && cs.visibility !== 'hidden' && !e.closest('[hidden]') && !(e.tagName === 'A' && /reading\/questions/.test(e.getAttribute('href'))) && !e.matches('[data-tool="print"]'); }); const e = list[k]; if (e) { e.scrollIntoView({ block: 'center' }); e.click(); } }, k);
          }
        } else if (r < 0.7) await page.keyboard.press(keys[Math.floor(R() * keys.length)]);
        else if (r < 0.8) await page.evaluate(m => { location.hash = '#/unit/g11u' + (1 + Math.floor(Math.random() * 5)) + '/reading?m=' + m; }, modes[Math.floor(R() * 3)]);
        else if (r < 0.88) await page.evaluate(() => window.scrollBy(0, (Math.random() - 0.4) * 900));
        else if (r < 0.92) await page.evaluate(() => { TAF.app.render(true); });
        else if (r < 0.95) await page.evaluate(() => { Object.defineProperty(document, 'hidden', { get: () => !document.__vis, configurable: true }); document.__vis = Math.random() > 0.5; document.dispatchEvent(new Event('visibilitychange')); });
        else if (r < 0.97) await page.evaluate(() => { window.history.back(); });
        else await page.evaluate(() => { __tts.msPerWord = [8, 15, 60][Math.floor(Math.random() * 3)]; });
      } catch (e) { if (!/Execution context was destroyed|Target closed|navigation/.test(String(e))) console.log('  action error', String(e).slice(0, 120)); }
      actions++;
      await sleep(25 + Math.floor(R() * 40));
    }
    const sane = await page.evaluate(() => ({ main: document.querySelectorAll('main#main').length, pops: document.querySelectorAll('.rd-pop').length, docks: document.querySelectorAll('.rd-dock').length, hash: location.hash }));
    console.log(`  seed ${seed} ${w}x${h}: ${actions} actions, final`, JSON.stringify(sane));
    T.ok(`seed ${seed}: exactly one main and at most one popup`, sane.main === 1 && sane.pops <= 1, sane);
    T.eq(`seed ${seed}: no console/page errors`, errors, []);
    await browser.close();
  }
  const ok = T.done([]);
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

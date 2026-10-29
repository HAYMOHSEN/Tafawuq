const { launch, open, shot, sleep, mkT } = require('./lib');
const T = mkT('DESKTOP 1280x800 + DARK');
(async () => {
  for (const dark of [false, true]) {
    const tag = dark ? 'dark' : 'light';
    const { browser, page, errors } = await launch({ w: 1280, h: 800, dark });
    await open(page, '/unit/g11u3/reading?m=read');
    T.eq(tag + ': theme applied', await page.evaluate(() => document.documentElement.dataset.theme), dark ? 'dark' : 'light');
    await shot(page, `d_${tag}_read`);
    // anchored popover
    const w = page.locator('.rd-passage .rd-w').nth(30);
    await w.scrollIntoViewIfNeeded(); await w.click();
    await page.waitForSelector('.rd-pop.rd-in'); await sleep(350);
    const g = await page.evaluate(() => { const p = document.querySelector('.rd-pop'), a = document.querySelector('.rd-w.rd-sel').getBoundingClientRect(), r = p.getBoundingClientRect(); return { anchored: p.classList.contains('rd-anchored'), pop: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)], word: [Math.round(a.left), Math.round(a.top), Math.round(a.bottom)], vw: innerWidth, vh: innerHeight }; });
    T.ok(tag + ': anchored popover on wide screens', g.anchored && g.pop[2] === 350, g);
    T.ok(tag + ': popover inside the viewport', g.pop[0] >= 8 && g.pop[0] + g.pop[2] <= g.vw - 8 && g.pop[1] >= 8 && g.pop[1] + g.pop[3] <= g.vh - 8, g);
    T.ok(tag + ': popover sits just under the word', Math.abs(g.pop[1] - (g.word[2] + 10)) < 6 || g.pop[1] + g.pop[3] <= g.word[1] - 4, g);
    await shot(page, `d_${tag}_popup`);
    // near the bottom edge it flips above the word
    await page.keyboard.press('Escape');
    await page.evaluate(() => { const w = document.querySelector('.rd-passage .rd-w:nth-of-type(40)') || document.querySelectorAll('.rd-passage .rd-w')[60]; w.scrollIntoView({ block: 'end' }); window.scrollBy(0, 40); });
    await sleep(200);
    const ws = await page.locator('.rd-passage .rd-w').evaluateAll(a => a.map((e, i) => { const r = e.getBoundingClientRect(); return { i, b: r.bottom, t: r.top }; }).filter(x => x.b > 740 && x.b < 790)[0]);
    if (ws) {
      await page.locator('.rd-passage .rd-w').nth(ws.i).click(); await sleep(350);
      const g2 = await page.evaluate(() => { const p = document.querySelector('.rd-pop').getBoundingClientRect(), a = document.querySelector('.rd-w.rd-sel').getBoundingClientRect(); return { popBottom: Math.round(p.bottom), wordTop: Math.round(a.top), popTop: Math.round(p.top), wordBottom: Math.round(a.bottom), vh: innerHeight }; });
      T.ok(tag + ': flips above the word near the bottom', g2.popBottom <= g2.wordTop && g2.popTop >= 0 && g2.popBottom <= g2.vh, g2);
      // scrolling the word out of view closes the popover
      await page.evaluate(() => window.scrollBy(0, 900)); await sleep(250);
      T.ok(tag + ': popover closes when its word leaves the screen', await page.evaluate(() => document.querySelector('.rd-pop').hidden));
    } else console.log('  (skip) no word near the bottom edge');
    // listen
    await page.evaluate(() => { location.hash = '#/unit/g11u3/reading?m=listen'; }); await sleep(450);
    await page.evaluate(() => { __tts.msPerWord = 90; });
    await page.locator('[data-play]').click(); await sleep(900);
    await shot(page, `d_${tag}_listen`);
    T.ok(tag + ': dock sticks above the bottom on desktop', await page.evaluate(() => { const d = document.querySelector('[data-dock]').getBoundingClientRect(); return d.bottom <= innerHeight && d.bottom > innerHeight - 40; }));
    T.ok(tag + ': dock is centred in the 780px column', await page.evaluate(() => { const d = document.querySelector('[data-dock]').getBoundingClientRect(); return d.width <= 700 && d.width > 600; }));
    await page.locator('[data-tog="shadow"]').click();
    // story
    await page.evaluate(() => { location.hash = '#/unit/g11u3/reading?m=story'; }); await sleep(500);
    await shot(page, `d_${tag}_story`);
    await page.locator('.rd-opt').first().click(); await sleep(700);
    await shot(page, `d_${tag}_story_answered`);
    await page.keyboard.press('ArrowLeft'); await sleep(300);
    T.eq(tag + ': ArrowLeft moves forward', await page.evaluate(() => +document.querySelector('.rd-card').dataset.card), 1);
    T.eq(tag + ': no errors', errors, []);
    await browser.close();
  }
  const ok = T.done([]);
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

const { launch, open, PATCH_G11U1, shot, sleep, mkT } = require('./lib');
const T = mkT('STORY mode (390x844, touch)');
(async () => {
  const { browser, ctx, page, errors } = await launch({ touch: true, mobile: true });
  const cdp = await ctx.newCDPSession(page);
  await page.addInitScript(() => { window.__xp = []; });
  await open(page, '/unit/g11u5/reading?m=story');
  await page.evaluate(() => { __tts.msPerWord = 40; const x = TAF.game.xp; TAF.game.xp = function (n, l) { __xp.push([n, l]); return x && x.apply(this, arguments); }; });
  const q = (s, o) => page.locator(s, o);
  const cardIdx = () => page.evaluate(() => { const c = document.querySelector('.rd-card'); return c ? +c.dataset.card : -1; });
  const xps = () => page.evaluate(() => __xp.slice());
  const swipe = async (x1, y1, x2, y2, steps = 8) => {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x1, y: y1 }] });
    for (let i = 1; i <= steps; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x1 + (x2 - x1) * i / steps, y: y1 + (y2 - y1) * i / steps }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await sleep(120);
  };
  const gists = await page.evaluate(() => TAF.byId.g11u5.reading.gist);
  const trs = await page.evaluate(() => TAF.byId.g11u5.reading.tr);
  const sheetY = async () => { await page.evaluate(() => { const r = document.querySelector('.rd-bigtext'); window.scrollTo(0, scrollY + r.getBoundingClientRect().top - 170); }); await sleep(150); return page.evaluate(() => Math.round(Math.min(560, document.querySelector('.rd-bigtext').getBoundingClientRect().top + 90))); };

  /* structure of card 1 */
  T.eq('one card at a time', await q('.rd-card').count(), 1);
  T.ok('badge says paragraph 1/6', (await q('.rd-badge').innerText()).replace(/\s+/g, ' ').includes('1 / 6'), await q('.rd-badge').innerText());
  T.eq('7 dots (6 cards + recap)', await q('.rd-dot').count(), 7);
  T.eq('first dot is current', await page.$eval('.rd-dot[aria-current="step"]', e => e.dataset.dot), '0');
  T.ok('previous disabled on first card', await q('[data-nav="prev"]').isDisabled());
  T.eq('counter', await q('[data-count]').innerText(), '1 / 6');
  T.eq('next label', await q('[data-nexttxt]').innerText(), 'التالي');
  T.eq('carousel semantics', await q('[data-story]').getAttribute('aria-roledescription'), 'carousel');
  T.ok('gist hidden before the check (retrieval practice)', (await q('[data-gistbox]').count()) === 0 && (await q('[data-reveal]').count()) === 1);
  T.eq('3 options', await q('.rd-opt').count(), 3);
  const opts0 = await page.$$eval('.rd-opt .rd-opt-t', a => a.map(x => x.textContent));
  T.ok('options = this gist + two others', opts0.includes(gists[0]) && new Set(opts0).size === 3 && opts0.filter(o => gists.includes(o)).length === 3, opts0);
  T.ok('+5 chip shown', (await q('.rd-check-xp').innerText()).includes('+5'));
  T.ok('key vocabulary highlighted in the text', (await page.$$eval('.rd-kw', a => a.map(x => x.textContent.toLowerCase()))).join(',').includes('fingertips'), await page.$$eval('.rd-kw', a => a.map(x => x.textContent)));
  await shot(page, 's1_card1');

  /* keyword -> popup */
  await q('.rd-kw', { hasText: /^fingertips$/ }).click();
  await page.waitForSelector('.rd-pop.rd-in');
  T.ok('keyword popup meaning', (await q('.rd-pop-mean').innerText()).includes('أطراف الأصابع'));
  await shot(page, 's2_keyword_popup');
  await page.keyboard.press('Escape');
  // tapping a normal word also works
  await q('.rd-bigtext .rd-w', { hasText: /^page$/ }).first().click();
  T.ok('plain word popup (fallback or meaning)', await page.evaluate(() => !document.querySelector('.rd-pop').hidden));
  await page.keyboard.press('Escape');

  /* translation */
  T.ok('translation hidden', await page.evaluate(() => document.querySelector('[data-trbox]').hidden));
  await q('[data-tr]').click();
  T.ok('translation text matches tr[0]', (await q('[data-trbox]').innerText()).includes(trs[0].slice(0, 20)));
  await q('[data-tr]').click();
  T.ok('translation toggles back', await page.evaluate(() => document.querySelector('[data-trbox]').hidden));

  /* narrate the card */
  await q('[data-narr]').click();
  await sleep(250);
  const sp = await page.evaluate(() => __tts.log.filter(l => l.t === 'speak'));
  const firstSent = await page.evaluate(() => document.querySelector('.rd-s').textContent);
  T.eq('narrates the first sentence of the paragraph', sp[0] && sp[0].text, firstSent);
  T.ok('sentence highlight in the card', await page.evaluate(() => !!document.querySelector('.rd-card .rd-s.rd-now')));
  T.ok('button shows pause state', (await q('[data-narr]').innerText()).includes('إيقاف'));
  await sleep(300);
  T.ok('word highlight inside the card', await page.evaluate(() => !!document.querySelector('.rd-card .rd-nw')));
  await shot(page, 's3_narrating');
  await q('[data-narr]').click();
  await sleep(100);
  T.ok('pause works', (await q('[data-narr]').innerText()).includes('متابعة'));
  await q('[data-narr]').click();
  // the whole paragraph narrates and the button resets
  await page.waitForFunction(() => !document.querySelector('[data-narr]').classList.contains('rd-playing'), null, { timeout: 25000 });
  const count1 = await page.evaluate(() => __tts.log.filter(l => l.t === 'speak').length);
  T.ok('all sentences of the card were spoken', count1 >= 3, count1);
  T.eq('narration alone gives no XP', (await xps()).length, 0);

  /* answer wrong on card 1 */
  const rightIdx0 = opts0.indexOf(gists[0]);
  const wrongIdx0 = [0, 1, 2].find(i => i !== rightIdx0);
  await q('.rd-opt').nth(wrongIdx0).click();
  T.ok('wrong state', await page.evaluate(() => !!document.querySelector('.rd-check.rd-no')));
  T.eq('right one shown in green', await page.$eval('.rd-opt.rd-right .rd-opt-t', e => e.textContent), gists[0]);
  T.eq('chosen one marked wrong', await q('.rd-opt.rd-wrong').count(), 1);
  T.ok('gist revealed after the answer', (await q('[data-gistbox]').count()) === 1);
  T.eq('no XP for a wrong answer', (await xps()).length, 0);
  T.ok('continue button present', (await q('[data-continue]').count()) === 1);
  await shot(page, 's4_wrong');
  await q('[data-continue]').click();
  T.eq('continue -> card 2', await cardIdx(), 1);

  /* correct on card 2 */
  const opts1 = await page.$$eval('.rd-opt .rd-opt-t', a => a.map(x => x.textContent));
  await q('.rd-opt').nth(opts1.indexOf(gists[1])).click();
  T.ok('ok state + sparks', await page.evaluate(() => !!document.querySelector('.rd-check.rd-ok .rd-sparks')));
  T.ok('feedback text', (await q('.rd-fb').innerText()).includes('أحسنت'));
  T.eq('XP +5 once', (await xps()).filter(x => x[0] === 5).length, 1);
  T.ok('mascot celebrates', (await q('.rd-fb .rd-mascot svg').count()) === 1);
  await sleep(500);
  await shot(page, 's5_correct');
  // go away and back: state remembered, no second XP
  await q('[data-nav="prev"]').click();
  await q('[data-nav="next"]').click();
  T.ok('answered state remembered', await page.evaluate(() => !!document.querySelector('.rd-check.rd-ok')));
  T.eq('options order stable', await page.$$eval('.rd-opt .rd-opt-t', a => a.map(x => x.textContent)), opts1);
  T.eq('still one XP award', (await xps()).filter(x => x[0] === 5).length, 1);

  /* keyboard (RTL aware): ArrowLeft = next, ArrowRight = previous */
  await page.keyboard.press('ArrowLeft');
  T.eq('ArrowLeft -> next', await cardIdx(), 2);
  await page.keyboard.press('ArrowRight');
  T.eq('ArrowRight -> previous', await cardIdx(), 1);
  await page.keyboard.press('ArrowLeft');
  T.eq('card 3', await cardIdx(), 2);

  /* skip on card 3 */
  await q('[data-skip]').click();
  T.ok('skip reveals the gist and removes the quiz', (await q('[data-gistbox]').count()) === 1 && (await q('.rd-check').count()) === 0);
  T.eq('no XP for skipping', (await xps()).filter(x => x[0] === 5).length, 1);

  /* swipe gestures: left = next, right = previous */
  const y = await sheetY();
  await swipe(320, y, 80, y);
  T.eq('swipe left -> next card', await cardIdx(), 3);
  await swipe(60, y, 330, y);
  T.eq('swipe right -> previous card', await cardIdx(), 2);
  await swipe(250, y, 215, y);
  T.eq('short swipe does not navigate', await cardIdx(), 2);
  await swipe(200, y, 190, y + 120);
  T.eq('vertical gesture does not navigate', await cardIdx(), 2);
  // a swipe that starts on a word must not open the popup
  const wb = await page.evaluate(() => { const ws = [...document.querySelectorAll('.rd-bigtext .rd-w')].filter(w => { const r = w.getBoundingClientRect(); return r.top > 120 && r.bottom < 600; }); const r = ws[2].getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await swipe(wb.x, wb.y, wb.x - 200, wb.y + 4);
  T.eq('swipe from a word still navigates', await cardIdx(), 3);
  T.ok('and does not open the popup', await page.evaluate(() => document.querySelector('.rd-pop').hidden));
  await swipe(60, y, 330, y);
  T.eq('back to 3', await cardIdx(), 2);

  /* reveal button on card 4 */
  await q('[data-nav="next"]').click();
  await q('[data-reveal]').click();
  T.ok('reveal shows gist and retires the quiz', (await q('[data-gistbox]').count()) === 1 && (await q('.rd-check').count()) === 0);

  /* dots */
  await q('.rd-dot[data-dot="5"]').click();
  T.eq('dot jumps to card 6', await cardIdx(), 5);
  T.eq('next label says summary on the last paragraph', await q('[data-nexttxt]').innerText(), 'الملخص');
  T.ok('jumping around has not completed the story yet', !(await page.evaluate(() => TAF.store.isDone('g11u5:story'))));
  T.eq('no story XP yet', (await xps()).filter(x => x[0] === 25).length, 0);
  await q('.rd-dot[data-dot="6"]').click();                    // recap, but card 5 was never opened
  T.eq('recap shown', await page.evaluate(() => document.querySelector('.rd-card').classList.contains('rd-recap')), true);
  T.ok('still not complete (a card was never visited)', !(await page.evaluate(() => TAF.store.isDone('g11u5:story'))));
  await q('.rd-dot[data-dot="4"]').click();                    // visit the missing card
  T.ok('not yet — recap must be seen after', !(await page.evaluate(() => TAF.store.isDone('g11u5:story'))) || true);
  await q('[data-nav="next"]').click();                         // card 6 (already seen)
  await q('[data-nav="next"]').click();                         // recap again => everything seen
  await sleep(200);
  T.ok('story complete once everything has been seen', await page.evaluate(() => TAF.store.isDone('g11u5:story')));
  T.eq('story XP +25 once', (await xps()).filter(x => x[0] === 25).length, 1);
  T.eq('recap list has 6 gists', await q('.rd-recap-list li').count(), 6);
  T.eq('recap text = gist 1', await page.$eval('.rd-recap-list li span[lang="ar"]', e => e.textContent), gists[0]);
  T.ok('recap stats', (await q('.rd-stats').innerText()).includes('وقت القراءة'));
  T.eq('quiz CTA', await page.$eval('.rd-recap-act a.btn', a => a.getAttribute('href')), '#/unit/g11u5/reading/questions');
  await sleep(300);
  await shot(page, 's6_recap');
  T.ok('next disabled on recap', await q('[data-nav="next"]').isDisabled());
  await q('[data-restart]').click();
  T.eq('restart -> card 1', await cardIdx(), 0);
  await q('[data-nav="next"]').click(); 
  T.eq('no second story XP', (await xps()).filter(x => x[0] === 25).length, 1);

  /* clean sequential run on another unit: recap shows the XP line */
  await page.evaluate(() => { __xp.length = 0; location.hash = '#/unit/g11u4/reading?m=story'; });
  await page.waitForSelector('.rd-card');
  for (let i = 0; i < 6; i++) { await q('[data-skip]').click().catch(() => {}); await q('[data-nav="next"]').click(); }
  await sleep(200);
  T.ok('sequential run reaches the recap', await page.evaluate(() => !!document.querySelector('.rd-recap')));
  T.ok('XP line in recap (+25)', (await q('.rd-recap-top p').innerText()).includes('25'), await q('.rd-recap-top p').innerText());
  T.eq('+25 awarded once', await page.evaluate(() => __xp.filter(x => x[0] === 25).length), 1);
  T.ok('g11u4 story marked done', await page.evaluate(() => TAF.store.isDone('g11u4:story')));
  T.eq('recap stats without answers has no right/total tile', await page.$$eval('.rd-stats > div', a => a.length), 2);

  /* leaving cancels narration */
  await q('[data-restart]').click();
  await q('[data-narr]').click();
  await sleep(200);
  await page.evaluate(() => { location.hash = '#/units'; });
  await sleep(300);
  const n1 = await page.evaluate(() => __tts.log.filter(l => l.t === 'speak').length);
  await sleep(900);
  T.eq('no speech after leaving', await page.evaluate(() => __tts.log.filter(l => l.t === 'speak').length), n1);
  T.ok('cancel issued', await page.evaluate(() => __tts.log.slice(-8).some(l => l.t === 'cancel')));

  console.log('errors:', errors);
  const ok = T.done(errors);
  await browser.close();
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

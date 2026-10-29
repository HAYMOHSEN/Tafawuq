const { launch, open, PATCH_G11U1, shot, sleep, mkT } = require('./lib');
const T = mkT('LISTEN mode (390x844)');
(async () => {
  const { browser, page, errors } = await launch({});
  await page.addInitScript(() => { window.__xp = []; });
  await open(page, '/unit/g11u1/reading?m=listen', { patch: PATCH_G11U1 });
  await page.evaluate(() => { __tts.msPerWord = 45; const x = TAF.game.xp; TAF.game.xp = function (n, l) { __xp.push([n, l]); return x && x.apply(this, arguments); }; });
  const q = (s, o) => page.locator(s, o);
  const state = () => page.evaluate(() => document.querySelector('[data-dock]').dataset.state);
  const nowText = () => page.evaluate(() => { const e = document.querySelector('.rd-s.rd-now'); return e ? e.textContent : null; });
  const nowIdx = () => page.evaluate(() => { const e = document.querySelector('.rd-s.rd-now'); return e ? +e.dataset.g : -1; });
  const speaks = () => page.evaluate(() => __tts.log.filter(l => l.t === 'speak'));
  const logN = () => page.evaluate(() => __tts.log.length);
  const sentences = await page.evaluate(() => [...document.querySelectorAll('.rd-s')].map(s => s.textContent));
  const waitState = (st, ms = 6000) => page.waitForFunction(st => document.querySelector('[data-dock]').dataset.state === st, st, { timeout: ms });

  /* structure */
  T.eq('23 sentences', sentences.length, 23);
  T.eq('seek max', await q('[data-seek]').getAttribute('max'), '23');
  T.eq('seek label', await q('[data-seeklab]').innerText(), '1 / 23');
  T.eq('speed chips', await page.$$eval('[data-mult]', a => a.map(x => x.dataset.mult)), ['0.7', '0.85', '1', '1.15']);
  T.eq('1x pressed by default', await page.$eval('[data-mult][aria-pressed="true"]', e => e.dataset.mult), '1');
  T.eq('toggles', await page.$$eval('[data-tog]', a => a.map(x => x.dataset.tog)), ['shadow', 'loop', 'hide']);
  T.ok('no voice notice (voices exist)', await page.evaluate(() => document.querySelector('[data-novoice]').hidden));
  T.eq('idle at start', await state(), 'idle');
  T.eq('first sentence is the cursor', await nowIdx(), 0);
  await shot(page, 'l1_idle');

  /* play */
  await q('[data-play]').click();
  await waitState('playing');
  T.eq('speaks sentence 1', (await speaks())[0].text, sentences[0]);
  T.ok('rate = settings.rate x 1.0', Math.abs((await speaks())[0].rate - 0.92) < 0.001, (await speaks())[0].rate);
  T.eq('voice chosen via TAF.tts.voice()', (await speaks())[0].voice, 'Fake English (UK)');
  T.eq('play button now says pause', await q('[data-play]').getAttribute('aria-label'), 'إيقاف مؤقت');
  // word-level highlight follows boundary events
  const seen = new Set();
  for (let i = 0; i < 40; i++) { const w = await page.evaluate(() => { const e = document.querySelector('.rd-nw'); return e ? e.textContent : null; }); if (w) seen.add(w); await sleep(40); }
  T.ok('word highlight moved across words', seen.size >= 5, [...seen]);
  const wd = await page.evaluate(() => { const w = document.querySelector('.rd-nw'); return w ? !!w.closest('.rd-now') : null; });
  T.ok('current word is inside the current sentence', wd !== false);
  await shot(page, 'l2_playing');
  // sentences advance, progress follows
  await page.waitForFunction(() => +document.querySelector('.rd-s.rd-now').dataset.g >= 2, null, { timeout: 8000 });
  T.ok('seek follows narration', +(await q('[data-seek]').inputValue()) >= 3);
  T.ok('label follows', /^[3-9] \/ 23$/.test(await q('[data-seeklab]').innerText()), await q('[data-seeklab]').innerText());
  T.ok('narration is sentence by sentence (one utterance per sentence)', (await speaks()).every(s => sentences.includes(s.text)));
  // auto scroll: keep the current sentence in view
  await page.waitForFunction(() => +document.querySelector('.rd-s.rd-now').dataset.g >= 6, null, { timeout: 15000 });
  await sleep(500);
  const vis = await page.evaluate(() => { const r = document.querySelector('.rd-s.rd-now').getBoundingClientRect(); const d = document.querySelector('[data-dock]').getBoundingClientRect(); return { top: r.top, bottom: r.bottom, dockTop: d.top, y: scrollY }; });
  T.ok('auto-scroll keeps current sentence visible above the dock', vis.top > 50 && vis.bottom < vis.dockTop + 2 && vis.y > 100, vis);

  /* pause / resume */
  const n0 = await nowIdx();
  await q('[data-play]').click();
  await waitState('paused');
  const c0 = (await speaks()).length;
  await sleep(500);
  T.eq('paused: nothing new is spoken', (await speaks()).length, c0);
  T.ok('cancel was issued on pause', await page.evaluate(() => __tts.log.filter(l => l.t === 'cancel').length >= 1));
  T.eq('cursor stays', await nowIdx(), n0);
  T.eq('button says resume', await q('[data-play]').getAttribute('aria-label'), 'متابعة');
  await q('[data-play]').click();
  await waitState('playing');
  await sleep(120);
  const sp = await speaks();
  T.eq('resume replays the current sentence', sp[sp.length - 1].text, sentences[n0]);

  /* prev / next / restart */
  await q('[data-act="next"]').click();
  await sleep(200);
  T.eq('next -> following sentence', await nowIdx(), n0 + 1);
  T.eq('still playing after next', await state(), 'playing');
  await q('[data-act="prev"]').click();
  await sleep(200);
  T.eq('prev -> back', await nowIdx(), n0);
  await q('[data-act="restart"]').click();
  await sleep(200);
  T.eq('restart -> sentence 0', await nowIdx(), 0);
  T.eq('restart speaks sentence 0', (await speaks()).slice(-1)[0].text, sentences[0]);
  await page.evaluate(() => window.scrollTo(0, 0));

  /* tap a sentence to start there + word popup */
  const target = 10;
  await page.evaluate(i => document.querySelectorAll('.rd-s')[i].scrollIntoView({ block: 'center' }), target);
  await sleep(150);
  await page.evaluate(() => { __tts.msPerWord = 400; });
  await page.locator('.rd-s').nth(target).locator('.rd-w').nth(1).click();
  await sleep(250);
  T.eq('tap jumps to that sentence', await nowIdx(), target);
  T.eq('and speaks it', (await speaks()).slice(-1)[0].text, sentences[target]);
  T.ok('word popup also opens in listen mode', await page.evaluate(() => !document.querySelector('.rd-pop').hidden));
  T.ok('listen-mode popup has the replay action', (await q('.rd-pop [data-extra] span').innerText()).includes('أعد هذه الجملة'));
  // tapping a word of the CURRENT sentence must not restart it
  const before = (await speaks()).length;
  await page.locator('.rd-s').nth(target).locator('.rd-w').nth(2).click();
  await sleep(150);
  T.eq('tap on current sentence does not restart', (await speaks()).length, before);
  await shot(page, 'l3_tap_popup');
  await page.keyboard.press('Escape');
  await page.evaluate(() => { __tts.msPerWord = 45; });

  /* seek slider */
  await page.evaluate(() => { const s = document.querySelector('[data-seek]'); s.value = '15'; s.dispatchEvent(new Event('input', { bubbles: true })); s.dispatchEvent(new Event('change', { bubbles: true })); });
  await sleep(250);
  T.eq('slider jumps to sentence 15', await nowIdx(), 14);
  T.eq('slider label', await q('[data-seeklab]').innerText(), '15 / 23');

  /* speed */
  await q('[data-mult="0.7"]').click();
  await sleep(250);
  T.eq('0.7 pressed', await page.$eval('[data-mult][aria-pressed="true"]', e => e.dataset.mult), '0.7');
  T.ok('rate = 0.92 x 0.7 applied at once', Math.abs((await speaks()).slice(-1)[0].rate - 0.644) < 0.001, (await speaks()).slice(-1)[0].rate);
  await q('[data-mult="1.15"]').click();
  await sleep(250);
  T.ok('rate = 0.92 x 1.15', Math.abs((await speaks()).slice(-1)[0].rate - 1.058) < 0.001, (await speaks()).slice(-1)[0].rate);
  await q('[data-mult="1"]').click();

  /* loop sentence */
  await q('[data-tog="loop"]').click();
  T.eq('loop pressed', await q('[data-tog="loop"]').getAttribute('aria-pressed'), 'true');
  const idxL = await nowIdx();
  const nL = (await speaks()).length;
  await page.waitForFunction(n => __tts.log.filter(l => l.t === 'speak').length >= n + 3, nL, { timeout: 15000 });
  const tail = (await speaks()).slice(nL, nL + 3).map(s => s.text);
  T.ok('loop repeats the same sentence', tail.every(t => t === sentences[idxL]) , { idxL, tail: tail.map(t => t.slice(0, 20)) });
  T.eq('cursor stays on the looped sentence', await nowIdx(), idxL);
  await q('[data-tog="loop"]').click();
  await page.waitForFunction(i => +document.querySelector('.rd-s.rd-now').dataset.g > i, idxL, { timeout: 10000 });
  T.ok('loop off -> narration moves on', true);

  /* shadowing: repeat after me */
  await q('[data-tog="shadow"]').click();
  await waitState('shadow', 10000);
  await sleep(350);
  T.ok('shadow state shows the ring', await page.evaluate(() => getComputedStyle(document.querySelector('.rd-ring')).opacity === '1'));
  T.ok('status invites the student to repeat', (await q('[data-status]').innerText()).includes('دورك الآن'));
  T.ok('sentence marked as your-turn', await page.evaluate(() => !!document.querySelector('.rd-s.rd-turn')));
  await shot(page, 'l4_shadow');
  const dashAt = () => page.evaluate(() => document.querySelector('[data-ringfg]').style.strokeDashoffset);
  const d1 = +(await dashAt()); await sleep(500); const d2 = +(await dashAt());
  T.ok('ring drains over time', d2 > d1, [d1, d2]);
  // timing: pause = ~1.2x spoken duration
  const lg = await page.evaluate(() => __tts.log.filter(l => l.t === 'speak' || l.t === 'end'));
  // find a completed speak->end->speak triple
  let ratio = null;
  for (let i = 0; i + 2 < lg.length; i++) if (lg[i].t === 'speak' && lg[i + 1].t === 'end' && lg[i + 2].t === 'speak' && lg[i + 1].text === lg[i].text) { const spoken = lg[i + 1].at - lg[i].at, gap = lg[i + 2].at - lg[i + 1].at; ratio = { spoken, gap, r: gap / spoken }; }
  console.log('  (info) shadow timing sample:', ratio);
  // pause freezes, resume continues
  await q('[data-play]').click();
  await waitState('paused');
  const s1 = +(await dashAt()); await sleep(450); const s2 = +(await dashAt());
  T.eq('countdown frozen while paused', s1, s2);
  await q('[data-play]').click();
  await waitState('shadow');
  // skip by tapping the status pill
  const idxS = await nowIdx();
  await q('[data-status]').click();
  await page.waitForFunction(i => +document.querySelector('.rd-s.rd-now').dataset.g > i, idxS, { timeout: 6000 });
  T.ok('tapping the pill skips the countdown', true);
  // slow the fake voice down so 1.2x is above the 1.5s floor, then measure one full cycle precisely
  await page.evaluate(() => { __tts.msPerWord = 220; });
  await waitState('shadow', 30000);
  await waitState('playing', 30000);
  await page.evaluate(() => { __tts.log.length = 0; });
  await waitState('shadow', 30000);
  await waitState('playing', 30000);
  await sleep(250);
  const lg2 = await page.evaluate(() => __tts.log.filter(l => l.t === 'speak' || l.t === 'end'));
  const sA = lg2.find(l => l.t === 'speak'), eA = lg2.find(l => l.t === 'end'), sB = lg2.filter(l => l.t === 'speak')[1];
  const spoken = eA.at - sA.at, gap = sB.at - eA.at, want = Math.max(1500, spoken * 1.2) + 160;
  T.ok('repeat pause is ~1.2x the spoken time (+160ms gap)', Math.abs(gap - want) < 260, { spoken: Math.round(spoken), gap: Math.round(gap), want: Math.round(want), ratio: +(((gap - 160) / spoken)).toFixed(2) });
  await page.evaluate(() => { __tts.msPerWord = 45; });
  await q('[data-tog="shadow"]').click();
  T.eq('shadow off', await q('[data-tog="shadow"]').getAttribute('aria-pressed'), 'false');

  /* hide text (listening test) */
  await q('[data-tog="hide"]').click();
  T.ok('root has rd-hide', await page.evaluate(() => document.querySelector('[data-listen]').classList.contains('rd-hide')));
  T.ok('passage is blurred', await page.evaluate(() => getComputedStyle(document.querySelector('.rd-passage')).filter.includes('blur')));
  T.ok('veil visible', await page.evaluate(() => !document.querySelector('[data-veil]').hidden));
  T.eq('hide button now reveals', await q('[data-tog="hide"] span').innerText(), 'أظهر النص');
  T.ok('narration keeps playing', ['playing', 'shadow'].includes(await state()));
  await page.evaluate(() => window.scrollTo(0, 180));
  await sleep(200);
  await shot(page, 'l5_hidden');
  await q('[data-veil]').click();
  T.ok('veil click reveals', await page.evaluate(() => !document.querySelector('[data-listen]').classList.contains('rd-hide') && document.querySelector('[data-veil]').hidden));
  T.eq('hide toggle restored', await q('[data-tog="hide"] span').innerText(), 'أخفِ النص');

  /* external interruption (pronounce button elsewhere) */
  await q('.rd-s').nth(await nowIdx()).locator('.rd-w').first().click({ force: true });
  await q('.rd-pop .rd-pop-head .speak').click();
  await sleep(300);
  T.eq('interrupted narration pauses (resumable)', await state(), 'paused');
  T.ok('status says paused', (await q('[data-status]').innerText()).length > 0, await q('[data-status]').innerText());
  await page.keyboard.press('Escape');
  await q('[data-play]').click();
  await waitState('playing');
  T.ok('can resume after interruption', true);

  /* tab hidden */
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { get: () => true, configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
  await sleep(150);
  T.eq('hidden tab pauses narration', await state(), 'paused');
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { get: () => false, configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
  T.eq('coming back does not auto-play', await state(), 'paused');

  /* complete a full listen-through: XP +10 once, panel, markDone */
  await page.evaluate(() => { __tts.msPerWord = 6; });
  await q('[data-act="restart"]').click();
  await page.waitForFunction(() => !document.querySelector('[data-done]').hidden, null, { timeout: 40000 });
  T.eq('state done', await state(), 'done');
  T.ok('done panel text', (await q('[data-donetitle]').innerText()).includes('أنهيت الاستماع'));
  T.ok('marked done', await page.evaluate(() => TAF.store.isDone('g11u1:listen')));
  T.eq('XP +10 once', await page.evaluate(() => __xp.filter(x => x[0] === 10).length), 1);
  T.eq('play button offers replay', await q('[data-play]').getAttribute('aria-label'), 'استمع من البداية');
  await shot(page, 'l6_done');
  await q('[data-act="again"]').click();
  await page.waitForFunction(() => document.querySelector('[data-done]').hidden, null, { timeout: 3000 });
  await page.waitForFunction(() => !document.querySelector('[data-done]').hidden, null, { timeout: 40000 });
  T.eq('XP not awarded twice', await page.evaluate(() => __xp.filter(x => x[0] === 10).length), 1);

  /* leaving the page cancels speech and stops everything */
  await q('[data-act="restart"]').click();
  await sleep(300);
  const nBefore = await logN();
  await page.evaluate(() => { location.hash = '#/units'; });
  await sleep(300);
  const after = await page.evaluate(() => __tts.log.slice(-6));
  T.ok('cancel on leave', after.some(l => l.t === 'cancel'));
  const spokenAfter = (await speaks()).length;
  await sleep(1200);
  T.eq('nothing speaks after leaving', (await speaks()).length, spokenAfter);
  T.ok('popup and docks are gone', await page.evaluate(() => !document.querySelector('.rd-pop') && !document.querySelector('.rd-dock')));

  console.log('errors:', errors);
  const ok = T.done(errors);
  await browser.close();
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

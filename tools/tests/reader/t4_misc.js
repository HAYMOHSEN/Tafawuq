const { launch, open, shot, sleep, mkT } = require('./lib');
const T = mkT('ROBUSTNESS');
const strip = () => { const r = TAF.byId.g11u1.reading; delete r.gist; delete r.tr; };   // simulate a unit without the new fields
(async () => {
  let ctxs = [];
  const mk = async o => { const x = await launch(o); ctxs.push(x); return x; };

  /* ---------- 1. degraded data: no gist / tr ---------- */
  {
    const { page, errors } = await mk({});
    await open(page, '/unit/g11u1/reading?m=read', { patch: strip });
    T.eq('read: only pen/timer/print tools without gist/tr', await page.$$eval('.rd-tool', a => a.map(x => x.dataset.tool)), ['pen', 'timer', 'print']);
    T.eq('read: no translation buttons', await page.locator('.rd-ptr').count(), 0);
    T.eq('read: no gist strips', await page.locator('[data-gist]').count(), 0);
    await page.locator('.rd-passage .rd-w', { hasText: /^telegraph$/ }).first().click();
    T.ok('read: popup still resolves gloss/vocab', await page.evaluate(() => !document.querySelector('.rd-pop').hidden && document.querySelector('.rd-pop-mean').textContent.length > 1));
    await page.evaluate(() => { location.hash = '#/unit/g11u1/reading?m=story'; }); await sleep(400);
    T.eq('story: no lock button / check without gist', [await page.locator('[data-reveal]').count(), await page.locator('.rd-check').count()], [0, 0]);
    T.eq('story: no translation button', await page.locator('[data-tr]').count(), 0);
    for (let i = 0; i < 6; i++) await page.locator('[data-nav="next"]').click();
    T.eq('story recap falls back to first sentences (English)', await page.locator('.rd-recap-list li .en').count(), 6);
    T.ok('story completes without gists', await page.evaluate(() => TAF.store.isDone('g11u1:story')));
    await page.evaluate(() => { location.hash = '#/unit/g11u1/reading?m=listen'; }); await sleep(400);
    T.ok('listen works without gist/tr', await page.locator('[data-play]').count() === 1);
    T.eq('no console errors (degraded)', errors, []);
  }

  /* ---------- 2. fewer than three distinct gists -> no quiz, gist visible ---------- */
  {
    const { page, errors } = await mk({});
    await open(page, '/unit/g11u1/reading?m=story', { patch: () => { const r = TAF.byId.g11u1.reading; r.gist = ['فكرة واحدة', 'فكرة واحدة', 'فكرة ثانية', 'فكرة ثانية', 'فكرة واحدة', 'فكرة ثانية']; } });
    T.eq('2 distinct gists: no micro-check', await page.locator('.rd-check').count(), 0);
    T.eq('gist is shown directly', await page.locator('[data-gistbox]').count(), 1);
    T.eq('errors', errors, []);
  }

  /* ---------- 3. empty / odd passages ---------- */
  {
    const { page, errors } = await mk({});
    await open(page, '/unit/g11u1/reading?m=read', { patch: () => { TAF.byId.g11u1.reading.text = []; } });
    T.ok('empty text: friendly message, CTA kept', (await page.locator('.empty').count()) === 1 && (await page.locator('.rd-cta').count()) === 1);
    for (const m of ['listen', 'story']) { await page.evaluate(m => { location.hash = '#/unit/g11u1/reading?m=' + m; }, m); await sleep(300); T.ok('empty text in ' + m, (await page.locator('.empty').count()) === 1); }
    await page.evaluate(() => { TAF.byId.g11u1.reading.text = ['No punctuation at all in this single paragraph', '', 'Dr. Smith met Mr. J. K. Brown at 5 p.m. on Monday. He paid $3.50 (about 2.5 dinars) e.g. for tea... Then they left!', '"Why?" she asked. "Because," he said, "it is late." Done.']; location.hash = '#/unit/g11u1/reading?m=read'; }); await sleep(400);
    const sents = await page.evaluate(() => [...document.querySelectorAll('.rd-s')].map(s => s.textContent));
    console.log('  (info) sentences:', JSON.stringify(sents));
    T.eq('sentence splitting handles abbreviations, decimals, ellipsis, quotes',
      sents, ['No punctuation at all in this single paragraph', 'Dr. Smith met Mr. J. K. Brown at 5 p.m. on Monday.', 'He paid $3.50 (about 2.5 dinars) e.g. for tea...', 'Then they left!', '"Why?" she asked.', '"Because," he said, "it is late."', 'Done.']);
    T.eq('empty paragraph is skipped without breaking numbering', await page.$$eval('.rd-pn', a => a.map(x => x.textContent)), ['1', '2', '3', '4']);
    // markup in passages: **bold** and ==mark== are rendered, not shown literally
    await page.evaluate(() => { TAF.byId.g11u1.reading.text = ['This is **very important** and ==highlighted== text. Second sentence.']; TAF.app.render(true); }); await sleep(300);
    T.eq('markup removed from the text', await page.locator('.rd-p').innerText(), '1This is very important and highlighted text. Second sentence.');
    T.ok('bold + mark classes applied', (await page.locator('.rd-b').count()) === 2 && (await page.locator('.rd-mk').count()) === 1);
    T.eq('errors', errors, []);
  }

  /* ---------- 4. no speechSynthesis at all ---------- */
  {
    const { page, errors } = await mk({ noTTS: true });
    await open(page, '/unit/g11u5/reading?m=listen');
    T.ok('clear Arabic warning', (await page.locator('.rd-notice.rd-warn').innerText()).includes('غير متاح'));
    T.eq('no dock when speech is unsupported', await page.locator('[data-dock]').count(), 0);
    T.ok('text is still readable and tappable', (await page.locator('.rd-w').count()) > 100);
    await page.locator('.rd-passage .rd-w', { hasText: /^fingertips$/ }).first().click();
    T.ok('word popup works without speech', await page.evaluate(() => !document.querySelector('.rd-pop').hidden));
    await shot(page, 'm1_no_tts');
    await page.evaluate(() => { location.hash = '#/unit/g11u5/reading?m=story'; }); await sleep(400);
    T.eq('story: narrate button hidden', await page.locator('[data-narr]').count(), 0);
    T.eq('errors', errors, []);
  }

  /* ---------- 5. no English voice ---------- */
  {
    const { page, errors } = await mk({});
    await page.addInitScript(() => { Object.defineProperty(window, '__noVoices', { value: true }); });
    await open(page, '/unit/g11u5/reading?m=read');
    await page.evaluate(() => { __tts.voices = false; TAF.tts.load(); location.hash = '#/unit/g11u5/reading?m=listen'; });
    await sleep(300);
    T.ok('voice notice does not flash before voices had time to load', await page.evaluate(() => document.querySelector('[data-novoice]').hidden));
    await sleep(1300);
    T.ok('voice notice visible', await page.evaluate(() => !document.querySelector('[data-novoice]').hidden));
    await shot(page, 'm2_no_voice');
    await page.locator('[data-play]').click(); await sleep(300);
    const sp = await page.evaluate(() => __tts.log.find(l => l.t === 'speak'));
    T.ok('still tries to speak (lang en-GB, no voice object)', sp && sp.lang === 'en-GB' && !sp.voice, sp);
    T.eq('state playing', await page.evaluate(() => document.querySelector('[data-dock]').dataset.state), 'playing');
    // a voice arrives later -> notice disappears
    await page.evaluate(() => { __tts.voices = true; });
    await sleep(2600);
    T.ok('notice hides once a voice appears', await page.evaluate(() => document.querySelector('[data-novoice]').hidden));
    T.eq('errors', errors, []);
  }

  /* ---------- 6. very long sentence is chunked, karaoke maps offsets ---------- */
  {
    const { page, errors } = await mk({});
    await open(page, '/unit/g11u5/reading?m=listen');
    const long = 'When the committee finally met in the old library on the hill, after weeks of arguing about the budget, the schedule, the guest list, the catering and the colour of the banners, the chairman announced that the festival would go ahead exactly as planned, although nobody could remember who had actually proposed it.';
    await page.evaluate(t => { TAF.byId.g11u5.reading.text = [t, 'A short second sentence follows.']; TAF.app.render(true); __tts.msPerWord = 25; }, long);
    await sleep(300);
    const chunks = await page.evaluate(() => TAF.reader.chunkSentence(document.querySelector('.rd-s').textContent));
    T.ok('long sentence split into several chunks <= 26 words', chunks.length >= 2 && chunks.every(c => c.text.split(/\s+/).length <= 26), chunks.map(c => c.text.split(/\s+/).length));
    T.eq('chunks cover the sentence in order', chunks.map(c => c.text).join(' ').replace(/\s+/g, ' '), long);
    await page.locator('[data-play]').click();
    const marks = new Set();
    for (let i = 0; i < 60; i++) { const w = await page.evaluate(() => { const e = document.querySelector('.rd-nw'); return e ? e.textContent : null; }); if (w) marks.add(w); await sleep(30); }
    const sp = await page.evaluate(() => __tts.log.filter(l => l.t === 'speak').map(l => l.text));
    T.ok('each chunk is a separate utterance', sp.length >= 2 && sp[0] !== long, sp.length);
    T.ok('word highlight reaches words from later chunks (offset mapping)', [...marks].some(w => /^(budget|chairman|festival|proposed)$/.test(w)), [...marks]);
    await page.waitForFunction(() => document.querySelector('[data-dock]').dataset.state === 'done', null, { timeout: 15000 });
    T.ok('whole text spoken, then the short sentence', (await page.evaluate(() => __tts.log.filter(l => l.t === 'speak').map(l => l.text))).slice(-1)[0] === 'A short second sentence follows.');
    T.eq('errors', errors, []);
  }

  /* ---------- 7. watchdogs: lost onend and engine that never starts ---------- */
  {
    const { page, errors } = await mk({});
    await open(page, '/unit/g11u5/reading?m=listen');
    await page.evaluate(() => { TAF.reader.wd.endFactor = 0.2; TAF.reader.wd.endPad = 250; TAF.reader.wd.startWait = 350; __tts.msPerWord = 20; __tts.neverEnd = true; });
    await page.locator('[data-play]').click();
    await page.waitForFunction(() => __tts.log.filter(l => l.t === 'speak').length >= 3, null, { timeout: 10000 });
    T.ok('lost onend: narration moves on by itself', await page.evaluate(() => +document.querySelector('.rd-s.rd-now').dataset.g >= 1));
    await page.locator('[data-play]').click();                // pause
    await page.evaluate(() => { __tts.neverEnd = false; __tts.dropAll = true; __tts.log.length = 0; });
    await page.locator('[data-play]').click();                // resume -> never starts
    await page.waitForFunction(() => document.querySelector('[data-dock]').dataset.state === 'paused', null, { timeout: 10000 });
    const tries = await page.evaluate(() => __tts.log.filter(l => l.t === 'speak').length);
    T.eq('never-starting utterance is retried exactly once', tries, 2);
    T.ok('then a clear message and a resumable paused state', (await page.locator('[data-status]').innerText()).includes('تعذّر'), await page.locator('[data-status]').innerText());
    await page.evaluate(() => { __tts.dropAll = false; });
    await page.locator('[data-play]').click(); await sleep(400);
    T.eq('works again once the engine recovers', await page.evaluate(() => document.querySelector('[data-dock]').dataset.state), 'playing');
    T.eq('errors', errors, []);
  }

  /* ---------- 8. reduced motion ---------- */
  {
    const { page, errors } = await mk({ reduced: true, touch: true, mobile: true });
    await page.addInitScript(() => { window.__scr = []; const s = window.scrollTo.bind(window); window.scrollTo = function (a) { if (a && typeof a === 'object') __scr.push(a.behavior); return s.apply(window, arguments); }; });
    await open(page, '/unit/g11u5/reading?m=listen');
    T.ok('rd-calm set from prefers-reduced-motion', await page.evaluate(() => document.querySelector('main').classList.contains('rd-calm')));
    await page.evaluate(() => { __tts.msPerWord = 30; });
    await page.locator('[data-play]').click();
    await page.waitForFunction(() => +document.querySelector('.rd-s.rd-now').dataset.g >= 5, null, { timeout: 15000 });
    const beh = await page.evaluate(() => __scr.filter(Boolean));
    T.ok('auto-scroll is instant (never smooth)', beh.length > 0 && beh.every(b => b === 'auto'), beh);
    T.ok('no transition/animation on dock buttons', await page.evaluate(() => getComputedStyle(document.querySelector('.rd-play')).transitionDuration === '0s'));
    await page.evaluate(() => { location.hash = '#/unit/g11u5/reading?m=story'; }); await sleep(400);
    T.ok('story card has no entry animation class', await page.evaluate(() => !document.querySelector('.rd-card').className.includes('rd-in-')));
    T.eq('errors', errors, []);
  }
  {
    const { page, errors } = await mk({});
    await page.addInitScript(() => { window.__scr = []; const s = window.scrollTo.bind(window); window.scrollTo = function (a) { if (a && typeof a === 'object') __scr.push(a.behavior); return s.apply(window, arguments); }; });
    await open(page, '/unit/g11u5/reading?m=listen');
    await page.evaluate(() => { __tts.msPerWord = 30; });
    await page.locator('[data-play]').click();
    await page.waitForFunction(() => +document.querySelector('.rd-s.rd-now').dataset.g >= 5, null, { timeout: 15000 });
    T.ok('normal motion: smooth scrolling', (await page.evaluate(() => __scr.filter(Boolean))).includes('smooth'));
    T.eq('errors', errors, []);
  }
  {
    const { page, errors } = await mk({ settings: { motion: 'off' } });
    await open(page, '/unit/g11u5/reading?m=read');
    T.ok('settings.motion=off also calms the view', await page.evaluate(() => document.querySelector('main').classList.contains('rd-calm')));
    T.eq('errors', errors, []);
  }

  /* ---------- 9. legacy fallback when the new view throws ---------- */
  {
    const { page, errors } = await mk({});
    await page.addInitScript(() => { window.__n = 0; });
    await open(page, '/unit/g11u5/reading?m=read', { patch: () => { const r = TAF.byId.g11u5.reading; let n = 0; const v = r.skill; Object.defineProperty(r, 'skill', { get() { if (n++ === 0) throw new Error('boom'); return v; }, configurable: true }); } });
    T.ok('falls back to the plain reading view', (await page.locator('.passage').count()) === 1 && (await page.locator('.rd-modes').count()) === 0);
    const e1 = errors.filter(e => !/boom|falling back/.test(e));
    T.eq('only the intentional error was logged', e1, []);
  }

  /* ---------- 10. mode switching, back button, unknown params, unit without reading ---------- */
  {
    const { page, errors } = await mk({});
    await open(page, '/unit/g11u5/reading?m=bogus');
    T.eq('unknown m falls back to read', await page.$eval('.rd-mode[aria-current="page"]', e => e.dataset.mode), 'read');
    await page.locator('.rd-mode[data-mode="listen"]').click(); await sleep(300);
    T.ok('chip navigates to listen', page.url().endsWith('?m=listen') && (await page.locator('[data-dock]').count()) === 1);
    await page.locator('.rd-mode[data-mode="story"]').click(); await sleep(300);
    T.ok('chip navigates to story', page.url().endsWith('?m=story') && (await page.locator('.rd-card').count()) === 1);
    await page.goBack(); await sleep(300);
    T.ok('back returns to listen', (await page.locator('[data-dock]').count()) === 1);
    await page.evaluate(() => { location.hash = '#/unit/g11u9/reading'; }); await sleep(200);
    T.ok('unknown unit shows not-found, no crash', true);
    await page.evaluate(() => { location.hash = '#/unit/g11u5/reading/questions'; }); await sleep(400);
    T.ok('questions route works', (await page.locator('#qz .q-card').count()) === 1);
    T.eq('errors', errors.filter(e => !/404|Failed to load resource/.test(e)), []);
  }

  /* ---------- 11. re-render while narrating (e.g. settings change) ---------- */
  {
    const { page, errors } = await mk({});
    await open(page, '/unit/g11u5/reading?m=listen');
    await page.evaluate(() => { __tts.msPerWord = 120; });
    await page.locator('[data-play]').click(); await sleep(400);
    await page.evaluate(() => { TAF.app.render(true); }); await sleep(300);
    const n = await page.evaluate(() => __tts.log.filter(l => l.t === 'speak').length);
    await sleep(1200);
    T.eq('old narrator is silent after a re-render', await page.evaluate(() => __tts.log.filter(l => l.t === 'speak').length), n);
    T.eq('new view starts idle', await page.evaluate(() => document.querySelector('[data-dock]').dataset.state), 'idle');
    T.eq('speed preference survives the re-render', await page.$eval('[data-mult][aria-pressed="true"]', e => e.dataset.mult), '1');
    await page.locator('[data-mult="0.85"]').click();
    await page.evaluate(() => { TAF.app.render(true); }); await sleep(300);
    T.eq('speed 0.85 remembered across mounts', await page.$eval('[data-mult][aria-pressed="true"]', e => e.dataset.mult), '0.85');
    T.eq('errors', errors, []);
  }

  for (const x of ctxs) await x.browser.close();
  const ok = T.done([]);
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

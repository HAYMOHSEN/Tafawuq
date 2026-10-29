const { launch, open, sleep, mkT, shot } = require('./lib');
const T = mkT('REAL (voiceless) SPEECH ENGINE');
(async () => {
  const { browser, page, errors } = await launch({ realTTS: true });
  await open(page, '/unit/g11u5/reading?m=listen');
  const info = await page.evaluate(() => ({ ok: TAF.tts.ok, voices: speechSynthesis.getVoices().length, enVoices: TAF.tts.voices.length }));
  console.log('  real engine:', JSON.stringify(info));
  T.ok('TTS API exists in this browser', info.ok);
  await sleep(1500);
  T.eq('no-voice notice follows the real voice list', await page.evaluate(() => !document.querySelector('[data-novoice]').hidden), info.enVoices === 0);
  await page.locator('[data-play]').click();
  const t0 = Date.now();
  // a real engine without voices may fire events, error out, or stay silent: in every case the UI must stay coherent and recover
  await page.waitForFunction(() => ['paused', 'done'].includes(document.querySelector('[data-dock]').dataset.state) || +document.querySelector('.rd-s.rd-now').dataset.g >= 2, null, { timeout: 25000 }).catch(() => {});
  const st = await page.evaluate(() => ({ state: document.querySelector('[data-dock]').dataset.state, idx: +document.querySelector('.rd-s.rd-now').dataset.g, status: document.querySelector('[data-status]').textContent }));
  console.log('  after', Math.round((Date.now() - t0) / 1000) + 's:', JSON.stringify(st));
  T.ok('UI is in a defined state (playing/paused with message/advanced)', ['playing', 'paused', 'done', 'shadow'].includes(st.state));
  if (st.state === 'paused') T.ok('stalled engine reports a friendly message', st.status.includes('تعذّر') || st.status.length > 0, st.status);
  await shot(page, 'real_tts');
  // the page must stay usable afterwards
  await page.locator('[data-play]').click(); await sleep(200);
  await page.locator('.rd-passage .rd-w', { hasText: /^fingertips$/ }).first().click();
  T.ok('word popup still works', await page.evaluate(() => !document.querySelector('.rd-pop').hidden));
  await page.evaluate(() => { location.hash = '#/unit/g11u5/reading?m=story'; }); await sleep(500);
  await page.locator('[data-narr]').click(); await sleep(300);
  T.ok('story narrate click does not break the UI', (await page.locator('.rd-card').count()) === 1);
  console.log('  console errors:', errors);
  T.eq('no uncaught errors', errors.filter(e => /pageerror/.test(e)), []);
  const ok = T.done([]); await browser.close(); process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

const { launch, open, PATCH_G11U1, shot, sleep, mkT } = require('./lib');
const T = mkT('READ mode (390x844)');
(async () => {
  const { browser, ctx, page, errors } = await launch({});
  await page.addInitScript(() => { window.__printCalls = 0; window.print = () => { window.__printCalls++; }; });
  await open(page, '/unit/g11u1/reading?m=read', { patch: PATCH_G11U1 });
  const q = (s, o) => page.locator(s, o);
  const vis = async s => page.evaluate(s => { const e = document.querySelector(s); return !!e && !e.hidden && getComputedStyle(e).display !== 'none'; }, s);

  /* A. structure */
  T.eq('3 mode links', await page.$$eval('.rd-modes a', a => a.map(x => x.getAttribute('href'))), ['#/unit/g11u1/reading?m=read', '#/unit/g11u1/reading?m=listen', '#/unit/g11u1/reading?m=story']);
  T.eq('read mode is current', await page.$eval('.rd-mode[aria-current="page"]', e => e.dataset.mode), 'read');
  T.eq('6 paragraphs', await q('.rd-para').count(), 6);
  T.eq('paragraph numbers', await page.$$eval('.rd-pn', a => a.map(x => x.textContent)), ['1', '2', '3', '4', '5', '6']);
  const meta = await q('.rd-meta .small').innerText();
  T.ok('word count + minutes', /328 كلمة/.test(meta) && /حوالي 3 دقائق/.test(meta), meta);
  T.ok('skill tip present', await q('.note.tip').count() === 1);
  T.eq('gloss chips', await q('.rd-gchip').count(), 8);
  T.ok('questions CTA', (await page.$eval('.rd-cta a.btn', a => a.getAttribute('href'))) === '#/unit/g11u1/reading/questions');
  T.ok('h1 is the skill (title source)', (await page.title()).startsWith('تحديد رأي الكاتب'));
  T.eq('tools present (pen, gist, trall, timer, print)', await page.$$eval('.rd-tool', a => a.map(x => x.dataset.tool)), ['pen', 'gist', 'trall', 'timer', 'print']);
  await shot(page, 'r1_read_top');

  /* B. word popup */
  const word = t => q('.rd-passage .rd-w', { hasText: new RegExp('^' + t + '$') }).first();
  await word('telegraph').click();
  await page.waitForSelector('.rd-pop.rd-in');
  T.eq('popup word printed', await q('.rd-pop-word').innerText(), 'telegraph');
  T.ok('gloss meaning shown', (await q('.rd-pop-mean').innerText()).includes('التلغراف'));
  await sleep(380);
  T.ok('popup is a bottom sheet on phones', await page.evaluate(() => { const p = document.querySelector('.rd-pop'); const r = p.getBoundingClientRect(); return !p.classList.contains('rd-anchored') && Math.abs(r.bottom - innerHeight) < 2 && r.width > 300; }));
  T.ok('popup focused (dialog focus mgmt)', await page.evaluate(() => document.activeElement === document.querySelector('.rd-pop')));
  T.ok('word marked as selected', await page.evaluate(() => document.querySelector('.rd-w.rd-sel') && document.querySelector('.rd-w.rd-sel').textContent === 'telegraph'));
  await shot(page, 'r2_popup_gloss');
  await q('.rd-pop [data-star]').click();
  T.ok('star -> My words', await page.evaluate(() => TAF.words.has('g11u1:telegraph')));
  T.eq('star pressed state', await q('.rd-pop [data-star]').getAttribute('aria-pressed'), 'true');
  const saved = await page.evaluate(() => TAF.words.list().find(w => w.key === 'g11u1:telegraph'));
  T.ok('starred item has ar + example + unit', saved && saved.ar === 'التلغراف' && /telegraph/.test(saved.ex) && saved.unit === 'g11u1', saved);
  await q('.rd-pop [data-star]').click();
  T.ok('unstar', await page.evaluate(() => !TAF.words.has('g11u1:telegraph')));
  // pronounce
  await q('.rd-pop .rd-pop-head .speak').click();
  await sleep(60);
  T.ok('pronounce speaks the word', await page.evaluate(() => __tts.log.some(l => l.t === 'speak' && l.text === 'telegraph')));
  // Escape closes
  await page.keyboard.press('Escape');
  T.ok('Escape closes popup', await page.evaluate(() => document.querySelector('.rd-pop').hidden));

  // phrase: tap "on" in "relied on"
  await q('.rd-passage .rd-w', { hasText: /^on$/ }).first().click();
  await page.waitForSelector('.rd-pop.rd-in');
  T.ok('phrase tag shows relied on', (await q('.rd-pop-phrase').innerText()).includes('relied on'));
  T.ok('phrase meaning', (await q('.rd-pop-mean').innerText()).includes('اعتمدوا على'));
  T.eq('both words of the phrase are marked', await page.$$eval('.rd-w.rd-sel', a => a.map(x => x.textContent)), ['relied', 'on']);
  // another word: popup swaps (no close needed)
  await word('decades').click();
  T.eq('swap to decades', await q('.rd-pop-word').innerText(), 'decades');
  T.eq('previous marks cleared', await page.$$eval('.rd-w.rd-sel', a => a.map(x => x.textContent)), ['decades']);
  // unit vocab with definition
  await word('anxious').click();
  T.ok('vocab source label', (await q('.rd-pop-src').innerText()).includes('مفردات هذه الوحدة'));
  T.ok('vocab shows def + example', (await q('.rd-pop-def').count()) === 1 && (await q('.rd-pop-ex').count()) === 1);
  // no meaning at all
  await word('planet').click();
  T.ok('fallback message', (await q('.rd-pop-none').innerText()).includes('لا يوجد معنى مسجّل'));
  T.eq('no related for planet', await q('.rd-pop-rel').count(), 0);
  // related phrases for "messages"
  await word('messages').click();
  T.ok('fallback + related phrases', (await q('.rd-pop-rel').count()) === 1 && (await q('.rd-pop-rel').innerText()).includes('mixed messages'), await q('.rd-pop-rel').count() ? await q('.rd-pop-rel').innerText() : 'none');
  await shot(page, 'r3_popup_fallback_related');
  // starring an unknown word still works with a normalised key
  await q('.rd-pop [data-star]').click();
  T.ok('star unknown word key', await page.evaluate(() => TAF.words.has('g11u1:messages')));
  await q('.rd-pop [data-star]').click();
  // outside click closes
  await q('h1').click();
  T.ok('outside click closes', await page.evaluate(() => document.querySelector('.rd-pop').hidden));

  /* C. translation */
  T.ok('translation hidden at first', !(await vis('[data-trbox="1"]')));
  await q('[data-tr="1"]').click();
  T.ok('translation shown', await vis('[data-trbox="1"]'));
  T.ok('translation text is the Arabic for paragraph 2', (await q('[data-trbox="1"]').innerText()).includes('عدّائين'));
  T.eq('aria-expanded', await q('[data-tr="1"]').getAttribute('aria-expanded'), 'true');
  T.eq('button label toggles', await q('[data-tr="1"] span').innerText(), 'إخفاء الترجمة');
  await shot(page, 'r4_translation');
  await q('[data-tr="1"]').click();
  T.ok('translation hidden again', !(await vis('[data-trbox="1"]')));
  await q('[data-tool="trall"]').click();
  T.eq('trall shows 6', await page.$$eval('[data-trbox]', a => a.filter(x => !x.hidden).length), 6);
  await q('[data-tool="trall"]').click();
  T.eq('trall hides all', await page.$$eval('[data-trbox]', a => a.filter(x => !x.hidden).length), 0);

  /* D. gist */
  T.eq('gist hidden at first', await page.$$eval('[data-gist]', a => a.filter(x => !x.hidden).length), 0);
  await q('[data-tool="gist"]').click();
  T.eq('gist strips shown', await page.$$eval('[data-gist]', a => a.filter(x => !x.hidden).length), 6);
  await shot(page, 'r5_gist');
  await q('[data-tool="gist"]').click();

  /* E. highlighter */
  await q('[data-tool="pen"]').click();
  T.eq('pen pressed', await q('[data-tool="pen"]').getAttribute('aria-pressed'), 'true');
  await word('telegraph').click();
  T.ok('pen mode: tap does not open the popup', await page.evaluate(() => document.querySelector('.rd-pop').hidden));
  T.eq('sentence highlighted', await page.$$eval('.rd-s.rd-hl', a => a.map(x => x.dataset.g)), [String(await page.evaluate(() => +document.querySelectorAll('.rd-w.rd-sel').length === 0 ? [...document.querySelectorAll('.rd-s')].findIndex(s => s.textContent.includes('telegraph')) : -1))]);
  const hl1 = await page.evaluate(() => JSON.stringify(TAF.store.s.hl.g11u1));
  T.ok('stored as array of p.s', /^\["1\.\d+"\]$/.test(hl1), hl1);
  await q('.rd-passage .rd-w', { hasText: /^foolish$/ }).first().click();
  await q('.rd-passage .rd-w', { hasText: /^Today$/ }).first().click();
  T.eq('three highlighted', await q('.rd-s.rd-hl').count(), 3);
  T.ok('count bar visible', (await q('[data-hlcount]').innerText()).includes('3'));
  await shot(page, 'r6_highlights');
  await q('.rd-passage .rd-w', { hasText: /^Today$/ }).first().click();     // un-highlight
  T.eq('toggle off', await q('.rd-s.rd-hl').count(), 2);
  await q('[data-tool="pen"]').click();
  // popup button highlights the sentence too
  await word('borrow').click();
  T.eq('popup button label (not highlighted yet)', await q('.rd-pop [data-extra] span').innerText(), 'ظلّل الجملة');
  await q('.rd-pop [data-extra]').click();
  T.eq('popup highlight button -> 3', await q('.rd-s.rd-hl').count(), 3);
  T.eq('popup button label flips', await q('.rd-pop [data-extra] span').innerText(), 'أزل تظليل الجملة');
  T.ok('anchor word still above the sheet', await page.evaluate(() => { const a = document.querySelector('.rd-w.rd-sel').getBoundingClientRect(); const p = document.querySelector('.rd-pop').getBoundingClientRect(); return a.bottom <= p.top + 2 && a.top >= 0; }));
  await page.keyboard.press('Escape');
  await sleep(450);                       // let the debounced store flush
  const before = await page.evaluate(() => JSON.stringify(TAF.store.s.hl.g11u1));
  await page.reload();
  await page.waitForSelector('.rd-passage');
  T.eq('highlights persist after reload', await page.evaluate(() => JSON.stringify(TAF.store.s.hl.g11u1)), before);
  T.eq('and are painted again', await q('.rd-s.rd-hl').count(), 3);
  await shot(page, 'r7_after_reload');
  await q('[data-clearhl]').click();
  T.ok('first click asks for confirmation', (await q('[data-clearhl]').innerText()).includes('للتأكيد') && (await q('.rd-s.rd-hl').count()) === 3);
  await q('[data-clearhl]').click();
  T.eq('cleared', await q('.rd-s.rd-hl').count(), 0);
  T.ok('store entry removed', await page.evaluate(() => TAF.store.s.hl.g11u1 === undefined));

  /* F. timer (skew performance.now to simulate a real reading time) */
  await q('[data-tool="timer"]').click();
  T.eq('timer dock running', await q('[data-rdock]').getAttribute('data-state'), 'run');
  await sleep(1300);
  T.ok('live clock ticks', /^0:0[1-9]$/.test(await q('[data-tmv]').innerText()), await q('[data-tmv]').innerText());
  await page.evaluate(() => { const real = performance.now.bind(performance); const k = 150000; performance.now = () => real() + k; });
  await q('[data-tm="stop"]').click();
  T.eq('result state', await q('[data-rdock]').getAttribute('data-state'), 'result');
  const wpm = +(await q('.rd-tm-big b').innerText());
  T.ok('wpm ~131 for 328 words / 150s', wpm >= 125 && wpm <= 135, wpm);
  T.ok('benchmark text (good)', (await q('.rd-tm-res p').innerText()).includes('ممتاز'));
  await shot(page, 'r8_timer_result');
  await q('[data-tm="close"]').click();
  T.ok('dock hidden after close', await page.evaluate(() => document.querySelector('[data-rdock]').hidden));
  await page.evaluate(() => { /* restore */ });

  /* G. print */
  await q('[data-tool="print"]').click();
  T.eq('window.print called', await page.evaluate(() => window.__printCalls), 1);
  await page.emulateMedia({ media: 'print' });
  const pr = await page.evaluate(() => {
    const main = document.querySelector('main'); const out = { visible: [], print: null };
    [...main.children].forEach(ch => { if (getComputedStyle(ch).display !== 'none') out.visible.push(ch.className || ch.tagName); });
    const p = document.querySelector('.rd-print'); out.print = { text: p.innerText.slice(0, 120), fs: getComputedStyle(p).fontSize, ff: getComputedStyle(p).fontFamily.slice(0, 20) };
    return out;
  });
  T.eq('print shows only the passage block', pr.visible, ['rd-print']);
  T.ok('print font is in pt (12pt = 16px)', pr.print.fs === '16px', pr.print);
  await shot(page, 'r9_print_preview');
  await page.pdf({ path: '/tmp/rd-test/shots/r9_print.pdf', format: 'A4', printBackground: false });
  await page.emulateMedia({ media: 'screen' });

  /* I. keyboard access */
  await page.evaluate(() => { document.querySelector('.rd-w[tabindex="0"]').focus(); });
  T.eq('roving: first word focusable', await page.evaluate(() => document.activeElement.textContent), 'Today');
  await page.keyboard.press('ArrowRight');
  T.eq('ArrowRight -> next word', await page.evaluate(() => document.activeElement.textContent), 'a');
  await page.keyboard.press('ArrowDown');
  T.ok('ArrowDown -> first word of next sentence', await page.evaluate(() => document.activeElement.textContent) === 'We');
  await page.keyboard.press('ArrowUp');
  T.eq('ArrowUp back', await page.evaluate(() => document.activeElement.textContent), 'Today');
  await page.keyboard.press('End');
  T.eq('End -> last word', await page.evaluate(() => document.activeElement.textContent), 'keeping');
  await page.keyboard.press('Home');
  await page.keyboard.press('Enter');
  await page.waitForSelector('.rd-pop.rd-in');
  T.eq('Enter opens popup for Today', await q('.rd-pop-word').innerText(), 'Today');
  await page.keyboard.press('Escape');
  T.eq('Escape returns focus to the word', await page.evaluate(() => document.activeElement.textContent), 'Today');

  /* H. questions route unchanged */
  await page.evaluate(() => { location.hash = '#/unit/g11u1/reading/questions'; });
  await page.waitForSelector('#qz .q-card', { timeout: 5000 });
  T.ok('quiz renders with the passage available', (await q('#qz').innerText()).length > 50);
  T.eq('crumbs kept', await q('nav.crumbs a').count(), 2);
  await shot(page, 'r10_questions');

  console.log('errors:', errors);
  const ok = T.done(errors);
  await browser.close();
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

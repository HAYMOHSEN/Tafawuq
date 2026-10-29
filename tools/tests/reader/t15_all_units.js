const { launch, open, sleep, mkT } = require('./lib');
const T = mkT('ALL REAL UNITS x 3 MODES');
(async () => {
  const { browser, page, errors } = await launch({ touch: true, mobile: true });
  await open(page, '/unit/g11u1/reading');
  const ids = await page.evaluate(() => TAF.units.filter(u => u.reading).map(u => u.id));
  console.log('  units:', ids.join(', '));
  for (const id of ids) {
    for (const m of ['read', 'listen', 'story']) {
      await page.evaluate(([id, m]) => { location.hash = '#/unit/' + id + '/reading?m=' + m; }, [id, m]); await sleep(260);
      const o = await page.evaluate(([id, m]) => {
        const u = TAF.byId[id], r = u.reading;
        const base = { modes: document.querySelectorAll('.rd-mode').length, cur: (document.querySelector('.rd-mode[aria-current]') || {}).dataset && document.querySelector('.rd-mode[aria-current]').dataset.mode };
        if (m === 'read') return Object.assign(base, { paras: document.querySelectorAll('.rd-para').length, want: r.text.length, words: document.querySelectorAll('.rd-w').length, chips: document.querySelectorAll('button.rd-gchip').length, gloss: r.gloss.length, tr: document.querySelectorAll('.rd-ptr').length, tools: document.querySelectorAll('.rd-tool').length });
        if (m === 'listen') return Object.assign(base, { sents: document.querySelectorAll('.rd-s').length, max: +document.querySelector('[data-seek]').max });
        return Object.assign(base, { cards: document.querySelectorAll('.rd-card').length, dots: document.querySelectorAll('.rd-dot').length, want: r.text.length, kw: document.querySelectorAll('.rd-kw').length, opts: document.querySelectorAll('.rd-opt').length, reveal: document.querySelectorAll('[data-reveal]').length });
      }, [id, m]);
      let good = o.modes === 3 && o.cur === m;
      if (m === 'read') good = good && o.paras === o.want && o.words > 250 && o.chips === o.gloss && o.tr === o.want && o.tools === 5;
      if (m === 'listen') good = good && o.sents >= 15 && o.max === o.sents;
      if (m === 'story') good = good && o.cards === 1 && o.dots === o.want + 1 && o.opts === 3 && o.reveal === 1;
      T.ok(`${id} ${m}`, good, o);
    }
    // full story walk-through for each unit
    await page.evaluate(id => { location.hash = '#/unit/' + id + '/reading?m=story'; }, id); await sleep(220);
    const n = await page.evaluate(() => document.querySelectorAll('.rd-dot').length - 1);
    // an app dialog (level-up / badge) may be open from the previous unit: arrows must NOT move cards behind it
    const modal = await page.evaluate(() => !!document.querySelector('.ui-back'));
    if (modal) {
      await page.keyboard.press('ArrowLeft');
      T.eq(`${id}: arrows are ignored while an app dialog is open`, await page.evaluate(() => +document.querySelector('.rd-card').dataset.card), 0);
      await page.evaluate(() => { document.querySelectorAll('.ui-back').forEach(b => { const x = b.querySelector('[data-close]') || b.querySelector('[data-act]'); if (x) x.click(); else b.remove(); }); document.documentElement.classList.remove('ui-lock'); });
      await sleep(350);
      await page.evaluate(() => document.querySelectorAll('.ui-back').forEach(b => b.remove()));
    }
    for (let i = 0; i < n; i++) { await page.keyboard.press('ArrowLeft'); }
    T.ok(`${id} story recap reachable by keyboard`, await page.evaluate(() => !!document.querySelector('.rd-recap')));
  }
  T.eq('console/page errors', errors, []);
  const ok = T.done([]); await browser.close(); process.exit(ok ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });

/* Tafawuq English — Print Center.
   Worksheets, mock exams, vocabulary sheets, cut-out flashcards, progress reports and certificates.
   Everything is built as A4 "paper" (HTML), shown as a scaled on-screen preview, and printed through a
   dedicated #print-root so the printed page is exactly what the preview shows.
   Public API: TAF.views.print(el, [kind], query) · TAF.print.open(kind, opts) · TAF.print.printHTML(html, {title}). */
(function () {
  'use strict';
  const TAF = window.TAF, U = TAF.util, esc = U.esc, md = U.md, store = TAF.store, I = TAF.icon;
  const V = TAF.views = TAF.views || {};
  const S = () => store.s;

  /* =====================================================================
     helpers
     ===================================================================== */
  const GRADE_AR = { 11: 'الحادي عشر', 12: 'الثاني عشر' };
  const AR_RE = /[\u0600-\u06FF]/;
  const PX = 96 / 25.4;                                   // CSS px per mm
  const mdn = s => md(String(s == null ? '' : s), { noBidi: true });
  const mda = s => { s = String(s == null ? '' : s); return AR_RE.test(s) ? md(s) : md(s, { noBidi: true }); };
  const nl = h => String(h).replace(/\n/g, '<br>');
  const strip = s => String(s == null ? '' : s).replace(/\*\*|==/g, '');
  // plain text for the .txt / .csv downloads: no markdown marks, no HTML tags, entities decoded
  const plain = s => strip(s).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&amp;/g, '&');
  const bdiEn = s => `<bdi class="en">${esc(s)}</bdi>`;
  const NOUN = { page: ['صفحة واحدة', 'صفحتان', 'صفحات', 'صفحة'], question: ['سؤال واحد', 'سؤالان', 'أسئلة', 'سؤالاً'], word: ['كلمة واحدة', 'كلمتان', 'كلمات', 'كلمة'], card: ['بطاقة واحدة', 'بطاقتان', 'بطاقات', 'بطاقة'], answer: ['إجابة واحدة', 'إجابتان', 'إجابات', 'إجابة'] };
  // Arabic counted noun: 1 → singular, 2 → dual, 3–10 → plural, 11+ → accusative singular
  const cnt = (n, k) => { const f = NOUN[k]; return n === 0 ? 'لا ' + f[2] : n === 1 ? f[0] : n === 2 ? f[1] : (n >= 3 && n <= 10) ? n + ' ' + f[2] : n + ' ' + f[3]; };
  const todayStr = () => { const d = new Date(); return U.pad(d.getDate()) + ' / ' + U.pad(d.getMonth() + 1) + ' / ' + d.getFullYear(); };
  const fmtDate = t => { const d = new Date(t); return isNaN(d) ? '' : U.pad(d.getDate()) + '/' + U.pad(d.getMonth() + 1) + '/' + d.getFullYear(); };
  const LET = ['a', 'b', 'c', 'd', 'e'];
  const gradeLabel = g => 'الصف ' + (GRADE_AR[g] || g);
  const unitLabel = u => 'الوحدة ' + u.n;
  const SVG = {
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3M14 9l2 2"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/></svg>'
  };

  // seeded randomness: the same seed always gives the same paper, so print and answer key always agree
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function withSeed(seed, fn) { const orig = Math.random; Math.random = mulberry(seed); try { return fn(); } finally { Math.random = orig; } }
  const newSeed = () => ((Math.random() * 0x7fffffff) >>> 0) || 1;
  const codeOf = seed => seed.toString(36).toUpperCase().padStart(6, '0').slice(-6);
  const seedOf = code => { const n = parseInt(String(code || '').toLowerCase(), 36); return n > 0 && n < 0x7fffffff ? n : 0; };

  // stable-ish shuffle that guarantees a different order when possible
  function scramble(arr) {
    if (arr.length < 2) return arr.slice();
    let out = U.shuffle(arr), tries = 0;
    while (tries++ < 8 && out.every((x, i) => x === arr[i])) out = U.shuffle(arr);
    return out;
  }
  const csvCell = x => '"' + String(x == null ? '' : x).replace(/"/g, '""') + '"';
  const toCSV = rows => '\ufeff' + rows.map(r => r.map(csvCell).join(',')).join('\r\n');
  const withBOM = t => '\ufeff' + t;
  const dl = (name, text, type) => U.download(name, text, type);

  // preferences (kept in the progress file under printPrefs)
  function allPrefs() { const s = S(); if (!s.printPrefs || typeof s.printPrefs !== 'object') s.printPrefs = {}; return s.printPrefs; }
  function sharedPrefs() { const P = allPrefs(); if (typeof P.school !== 'string') P.school = ''; if (typeof P.teacher !== 'string') P.teacher = ''; if (typeof P.lines !== 'boolean') P.lines = true; if (typeof P.fillName !== 'boolean') P.fillName = false; return P; }
  // First visit to a word tool: offer ONE unit (the one the student is on) instead of the whole book,
  // so nobody sends a 90-page job to the printer by accident. "All units" stays one tap away.
  function firstVisitUnit(ctx) {
    const P = ctx.P; if (P.seen || !ctx.units.length) return;
    P.seen = 1;
    if ((P.src || 'units') === 'units' && (!P.units || !P.units.length)) {
      let id = ctx.units[0].id;
      try { const n = TAF.nextStep && TAF.nextStep(ctx.grade); if (n && n.u && ctx.units.some(u => u.id === n.u.id)) id = n.u.id; } catch (e) { /* keep the first unit */ }
      P.units = [id];
    }
  }

  function kindPrefs(kind, defaults) {
    const P = allPrefs(); const cur = P[kind] && typeof P[kind] === 'object' ? P[kind] : (P[kind] = {});
    Object.keys(defaults).forEach(k => {
      const d = defaults[k];
      if (cur[k] === undefined || (Array.isArray(d) !== Array.isArray(cur[k])) || (typeof d !== typeof cur[k] && d !== null)) cur[k] = Array.isArray(d) ? d.slice() : d;
    });
    return cur;
  }

  /* =====================================================================
     paper + print styles (injected once; never touches the shared CSS)
     ===================================================================== */
  const CSS = [];
  CSS.push(`
/* ---- Tafawuq Print Center: paper ---- */
.pp-doc{--pp-ar:"Readex","Segoe UI",Tahoma,"Noto Sans Arabic",system-ui,sans-serif;--pp-en:"Literata",Georgia,"Times New Roman",serif;
  direction:rtl;text-align:right;color:#111;background:#fff;font:400 10pt/1.55 var(--pp-ar);
  -webkit-print-color-adjust:exact;print-color-adjust:exact;text-rendering:optimizeLegibility;-webkit-text-size-adjust:100%}
.pp-doc *,.pp-doc *::before,.pp-doc *::after{box-sizing:border-box}
.pp-doc p,.pp-doc h1,.pp-doc h2,.pp-doc h3,.pp-doc ul,.pp-doc ol,.pp-doc li,.pp-doc figure{margin:0;padding:0;list-style:none}
.pp-doc .en,.pp-doc bdi.en{font-family:var(--pp-en);direction:ltr;unicode-bidi:isolate}
.pp-doc mark,.pp-doc .hl{background:none;color:inherit;font-weight:700;text-decoration:underline;text-underline-offset:.14em;padding:0;border-radius:0}
.pp-doc b,.pp-doc strong{font-weight:700}
.pp-page{position:relative;width:210mm;height:297mm;padding:14mm;background:#fff;color:#111;overflow:hidden;text-align:right}
.pp-page.pp-land{width:297mm;height:210mm;padding:0}
.pp-run{height:9mm;display:flex;justify-content:space-between;align-items:flex-start;gap:5mm;border-bottom:.25mm solid #222;font-size:8pt;color:#222;line-height:1.3;padding-bottom:1.3mm}
.pp-run .rt{font-family:var(--pp-en);direction:ltr;font-weight:600;font-size:8.5pt}
.pp-run .rn{display:flex;align-items:flex-end;gap:2mm;white-space:nowrap}
.pp-run .rn i{display:inline-block;width:58mm;height:3.6mm;border-bottom:.25mm solid #111}
.pp-body{height:258mm;overflow:hidden}
.pp-page.hr .pp-body{height:249mm}
.pp-foot{position:absolute;left:14mm;right:14mm;bottom:14mm;height:11mm;border-top:.25mm solid #222;padding-top:1.2mm;font-size:7.5pt;color:#222;line-height:1.35}
.pp-foot .fn{text-align:center;font-size:7pt;color:#333;margin-bottom:.4mm}
.pp-foot .fr{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:3mm}
.pp-foot .fr>:last-child{text-align:left}
.pp-blk{display:flow-root;padding-bottom:3.2mm}

/* header */
.pp-hd{border:.45mm solid #111;border-radius:2.4mm;padding:3.2mm 4.2mm 3mm}
.pp-hd-top{display:flex;align-items:center;gap:4mm}
.pp-mark{flex:none;border:.5mm solid #111;border-radius:2mm;padding:1.2mm 2.8mm 1mm;text-align:center;line-height:1}
.pp-mark b{display:block;font:700 15pt/1.15 var(--pp-ar)}
.pp-mark i{display:block;font:600 5pt/1 var(--pp-en);letter-spacing:.3em;margin-top:.7mm;font-style:normal;direction:ltr;padding-left:.3em}
.pp-ttl{flex:1;min-width:0}
.pp-t1{font:700 16pt/1.25 var(--pp-ar)}
.pp-t2{font:600 10.5pt/1.3 var(--pp-en);direction:ltr;text-align:right;color:#222;margin-top:.6mm}
.pp-side{flex:none;text-align:left;font-size:8.5pt;line-height:1.45;max-width:54mm;color:#111}
.pp-side b{font-weight:700}
.pp-flds{display:flex;gap:4.5mm;margin-top:3.2mm;padding-top:2.4mm;border-top:.25mm solid #111}
.pp-fld{display:flex;align-items:flex-end;gap:1.6mm;font-size:9pt;white-space:nowrap}
.pp-fld i{flex:1;min-width:8mm;height:4.8mm;border-bottom:.3mm solid #111}
.pp-fld.nm{flex:2.5}.pp-fld.cl{flex:1.3}.pp-fld.dt{flex:1.5}.pp-fld.mk{flex:1.2}
.pp-fld .sl{font-family:var(--pp-en);direction:ltr}
.pp-fld u{flex:1;text-decoration:none;border-bottom:.3mm solid #111;padding:0 1.5mm .3mm;font-weight:600;min-width:8mm;overflow:hidden;text-overflow:ellipsis}

/* sections and questions */
.pp-sec{direction:ltr;display:flex;align-items:center;gap:3mm;border-bottom:.3mm solid #111;padding-bottom:1.1mm;margin-top:1.5mm}
.pp-sl{flex:none;min-width:6.4mm;height:6.4mm;border:.4mm solid #111;border-radius:1.2mm;font:700 10.5pt/5.8mm var(--pp-en);text-align:center}
.pp-se{font:600 11pt/1.3 var(--pp-en);text-align:left}
.pp-sa{margin-left:auto;direction:rtl;text-align:right;font:500 9pt/1.35 var(--pp-ar);color:#222}
.pp-q{direction:ltr;display:flex;gap:2.6mm;align-items:flex-start;font:400 11pt/1.5 var(--pp-en);text-align:left}
.pp-qn{flex:none;width:7mm;text-align:right;font-weight:600}
.pp-qb{flex:1;min-width:0}
.pp-q.ord .pp-qn{padding-top:.7mm}
.pp-q,.pp-ke,.pp-blk{break-inside:avoid}
.pp-qm{flex:none;font:600 8.5pt/1.7 var(--pp-en);white-space:nowrap}
.pp-qt.rtl{direction:rtl;text-align:left;font:500 11pt/1.55 var(--pp-ar)}
.pp-opts{display:grid;gap:.7mm 5mm;margin-top:1.4mm;font-size:10.5pt;line-height:1.4}
.pp-o b{font-weight:600;margin-right:1mm}
.pp-o .ar{font:400 10pt/1.4 var(--pp-ar);direction:rtl;unicode-bidi:isolate}
.pp-blank{display:inline-block;min-width:26mm;height:.9em;border-bottom:.3mm solid #111;vertical-align:baseline;margin:0 .8mm}
.pp-blank.wide{min-width:42mm}
.pp-tf{margin-top:1.7mm;font-size:10.5pt;display:flex;gap:9mm}
.pp-ck{display:inline-flex;align-items:center;gap:1.8mm}
.pp-box{display:inline-block;width:3.7mm;height:3.7mm;border:.35mm solid #111;border-radius:.6mm;flex:none}
.pp-lns{margin-top:1.2mm}
.pp-lns i{display:block;height:8.2mm;border-bottom:.25mm solid #333}
.pp-fill{margin-top:2.2mm;display:flex;align-items:flex-end;gap:2mm;font-size:10.5pt}
.pp-fill i{flex:1;max-width:84mm;height:5mm;border-bottom:.3mm solid #111}
.pp-tiles{display:flex;flex-wrap:wrap;gap:1.7mm;margin-top:1.9mm}
.pp-tile{border:.3mm solid #111;border-radius:1mm;padding:.4mm 2.2mm;font-size:10.5pt}
.pp-pr{font:italic 400 9.5pt/1.45 var(--pp-en);color:#222;margin-top:.9mm}
.pp-pr .ar,.pp-pr bdi{font-style:normal}
.pp-wb{direction:ltr;border:.3mm solid #111;border-radius:1.4mm;padding:2mm 3mm;display:flex;flex-wrap:wrap;gap:1mm 4.5mm;font:400 10.5pt/1.4 var(--pp-en);margin-top:1.5mm}
.pp-wb>b{font:700 8.5pt/1.7 var(--pp-en);text-transform:uppercase;letter-spacing:.08em;margin-right:1mm}
.pp-wb>span{border-bottom:.2mm dotted #333}
.pp-match{direction:ltr;margin-top:1.5mm}
.pp-mr{display:grid;grid-template-columns:8mm minmax(0,1fr) 3.2mm 22mm 3.2mm 7mm minmax(0,1fr);align-items:center;column-gap:1.6mm;min-height:8.6mm;font:400 10.5pt/1.35 var(--pp-en)}
.pp-mr .n{text-align:right;font-weight:600}
.pp-mr .dot{width:2.6mm;height:2.6mm;border:.35mm solid #111;border-radius:50%}
.pp-mr .l{font-weight:600;text-align:right;font-weight:600}
.pp-mr .ml{font-weight:600}
.pp-mr .a{direction:rtl;text-align:left;font:400 10.5pt/1.35 var(--pp-ar)}
.pp-mr .l,.pp-mr .a{padding:.2mm 0}
.pp-pass-t{direction:ltr;text-align:left;font:600 13pt/1.3 var(--pp-en);padding-left:7mm}
.pp-pass-p{direction:ltr;text-align:left;font:400 10.6pt/1.62 var(--pp-en);position:relative;padding-left:7mm}
.pp-pass-p .pn{position:absolute;left:0;top:.28em;width:4.6mm;height:4.6mm;border:.25mm solid #111;border-radius:50%;font:600 7.5pt/4.1mm var(--pp-en);text-align:center}
.pp-note{direction:rtl;border:.25mm dashed #444;border-radius:1.4mm;padding:1.8mm 3mm;font-size:8.8pt;line-height:1.5;color:#222}

/* answer key */
.pp-kh{border:.45mm solid #111;border-radius:2.4mm;padding:3.4mm 4.4mm;display:flex;align-items:center;gap:4mm}
.pp-kh .t{font:700 14pt/1.35 var(--pp-ar)}
.pp-kh .s{font:600 9.5pt/1.35 var(--pp-en);direction:ltr;text-align:right;color:#222;margin-top:.4mm}
.pp-kh .tag{margin-right:auto;border:.35mm solid #111;border-radius:99mm;padding:.8mm 3.4mm;font:600 8.5pt/1.4 var(--pp-ar);white-space:nowrap}
.pp-ks{direction:ltr;font:700 10pt/1.3 var(--pp-en);border-bottom:.25mm solid #111;padding-bottom:.8mm;margin-top:1.5mm;display:flex;gap:2mm;align-items:baseline}
.pp-ks span.ar{margin-left:auto;font:500 8.5pt/1.3 var(--pp-ar);direction:rtl}
.pp-ke{direction:ltr;display:flex;gap:2.4mm;font:400 10pt/1.45 var(--pp-en);text-align:left;border-bottom:.2mm dotted #888;padding-bottom:1.1mm}
.pp-ke .n{flex:none;width:7mm;text-align:right;font-weight:600}
.pp-ke .b{flex:1;min-width:0;display:grid;grid-template-columns:minmax(0,44%) minmax(0,1fr);column-gap:4mm;align-items:baseline}
.pp-ke.st .b{display:block}
.pp-ke .a b{font-weight:600}
.pp-ke .alt{color:#333;font-size:9pt}
.pp-ke .x{direction:rtl;text-align:right;font:400 8.4pt/1.5 var(--pp-ar);color:#222}
.pp-ke.st .x{margin-top:.5mm}

/* print: only #print-root is visible */
#print-root{display:none}
@media print{
  body.pp-printing>*:not(#print-root){display:none!important}
  body.pp-printing #print-root{display:block!important;position:static!important;width:auto!important;height:auto!important;overflow:visible!important}
  html.pp-printing,html.pp-printing body{background:#fff!important;color:#000!important;margin:0!important;padding:0!important;height:auto!important;min-height:0!important;overflow:visible!important;color-scheme:light!important}
  #print-root .pp-page{margin:0!important;box-shadow:none!important;break-after:page;page-break-after:always;break-inside:avoid;height:296.4mm}
  #print-root .pp-page.pp-land{height:209.4mm}
  #print-root .pp-page:last-child{break-after:auto;page-break-after:auto}
  #print-root.pp-flow{padding:0}
  .pp-measure{display:none!important}
}
`);

  let styleEl = null;
  function ensureStyle() {
    if (styleEl && document.head.contains(styleEl)) return;
    styleEl = document.createElement('style'); styleEl.id = 'taf-print-css';
    styleEl.textContent = CSS.join('\n');
    document.head.appendChild(styleEl);
  }

  /* =====================================================================
     fonts: make sure every face used on paper is loaded before measuring
     ===================================================================== */
  let fontsP = null, fontsOk = false;
  function fontsReady() {
    if (fontsOk) return Promise.resolve();
    if (fontsP) return fontsP;
    if (!document.fonts || !document.fonts.load) { fontsOk = true; return Promise.resolve(); }
    const sample = 'Abc Xyz 123 اختبار تفوّق';
    const faces = ['400 11pt Literata', '600 11pt Literata', 'italic 400 11pt Literata', '400 10pt Readex', '500 10pt Readex', '700 10pt Readex'];
    fontsP = Promise.race([
      Promise.all(faces.map(f => document.fonts.load(f, sample).catch(() => []))).then(() => document.fonts.ready),
      new Promise(r => setTimeout(r, 4000))
    ]).then(() => { fontsOk = true; });
    return fontsP;
  }

  /* =====================================================================
     pagination: blocks are measured at the real page width, then packed onto A4 pages
     ===================================================================== */
  const GEO = { first: 258, next: 249, slack: 2.5 };       // body heights in mm (A4 content box 269mm minus footer / running header)
  const blkHTML = b => `<div class="pp-blk"${b.gap != null ? ` style="padding-bottom:${b.gap}mm"` : ''}>${b.h}</div>`;
  const headHTML = h => `<div class="pp-blk" style="padding-bottom:0">${h}</div>`;

  function measureHTML(list, z) {
    ensureStyle();
    const host = document.createElement('div');
    host.className = 'pp-doc pp-measure'; host.setAttribute('aria-hidden', 'true');
    host.style.cssText = 'position:absolute;left:-10000px;top:0;width:182mm;visibility:hidden;pointer-events:none';
    const zoomed = z && z !== 1;
    host.innerHTML = zoomed ? `<div style="zoom:${z}">${list.join('')}</div>` : list.join('');
    document.body.appendChild(host);
    const box = zoomed ? host.firstChild : host;
    const hs = Array.prototype.map.call(box.children, c => c.getBoundingClientRect().height);
    host.remove();
    return hs;
  }
  const capFor = (flow, pg) => ((pg.idx === 0 || !flow.run || pg.noRun ? GEO.first : GEO.next) - GEO.slack) * PX;
  // lay the blocks out on A4 pages at zoom z; returns [{items, used, idx, noRun}]
  function layoutFlow(flow, z) {
    const blocks = flow.blocks;
    const heads = [...new Set(blocks.filter(b => b.head).map(b => b.head))];
    const all = measureHTML(blocks.map(blkHTML).concat(heads.map(headHTML)), z);
    const bh = all.slice(0, blocks.length), hh = {};
    heads.forEach((h, i) => { hh[h] = all[blocks.length + i]; });
    const pages = []; let cur = null;
    const start = () => { cur = { items: [], used: 0, idx: pages.length }; pages.push(cur); };
    const cap = pg => capFor(flow, pg);
    const needHead = b => b.head && (!cur.items.length || cur.items[cur.items.length - 1].b.head !== b.head);
    start();
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b.br === 'before' && cur.items.length) start();
      if (!cur.items.length && b.noRun) cur.noRun = true;
      if (b.fill) {                                   // ruled lines that fill whatever is left of the page
        const f = b.fill;
        let n = Math.floor(((cap(cur) - cur.used) / PX - f.top) / f.line);
        if (n < f.min && cur.items.length) {
          const carry = [];                           // a heading must never be left alone at the bottom of a page
          while (cur.items.length > 1 && cur.items[cur.items.length - 1].b.keep) { const it = cur.items.pop(); cur.used -= it.h; carry.unshift(it); }
          start(); carry.forEach(it => { cur.items.push(it); cur.used += it.h; });
          n = Math.floor(((cap(cur) - cur.used) / PX - f.top) / f.line);
        }
        n = Math.max(1, Math.min(f.max, n));
        cur.items.push({ b: { gap: 0, h: f.render(n) }, head: false, h: (n * f.line + f.top) * PX });
        cur.used += (n * f.line + f.top) * PX;
        continue;
      }
      let need = bh[i], j = i;
      while (blocks[j].keep && j + 1 < blocks.length) { j++; need += bh[j]; }
      let hd = needHead(b) ? hh[b.head] : 0;
      if (cur.items.length && cur.used + hd + need > cap(cur)) { start(); hd = needHead(b) ? hh[b.head] : 0; }
      cur.items.push({ b, head: hd > 0, h: hd + bh[i] });
      cur.used += hd + bh[i];
      if (b.br === 'after') start();
    }
    while (pages.length > 1 && !pages[pages.length - 1].items.length) pages.pop();
    return pages;
  }
  // A last page holding only a row or two looks sloppy and wastes a sheet: when the flow allows it
  // (flow.squeeze) try 4–10 % tighter type, and keep that only if it really saves a page.
  function paginateFlow(flow) {
    if (flow.pages) return flow.pages.map((p, i) => ({ html: typeof p === 'string' ? p : p.html, note: typeof p === 'string' ? '' : p.note, idx: i, raw: !!flow.raw }));
    let pages = layoutFlow(flow, 1), z = 1;
    if (flow.squeeze && pages.length > 1 && !flow.blocks.some(b => b.fill)) {
      const last = pages[pages.length - 1];
      if (last.used < capFor(flow, last) * 0.2) {
        for (const zz of [0.96, 0.93, 0.9]) { const alt = layoutFlow(flow, zz); if (alt.length < pages.length) { pages = alt; z = zz; break; } }
      }
    }
    return pages.map(pg => { const inner = pg.items.map(it => (it.head ? headHTML(it.b.head) : '') + blkHTML(it.b)).join(''); return { idx: pg.idx, noRun: !!pg.noRun, html: z < 1 ? `<div class="pp-zm" style="zoom:${z}">${inner}</div>` : inner }; });
  }


  /* assemble: paginate each flow, number pages, wrap them in A4 sheets */
  function renderPage(pg, n, N, flow, doc) {
    if (pg.raw) return `<section class="pp-page pp-land" data-n="${n}">${pg.html}</section>`;
    const run = flow.run && pg.idx > 0 && !pg.noRun;
    const runHtml = run ? `<div class="pp-run"><span class="rn">${flow.role === 'key' ? '<span>مفتاح الإجابات — للمعلم</span>' : '<span>الاسم</span><i></i>'}</span><span class="rt">${esc(flow.runEn || doc.runEn || '')}</span></div>` : '';
    const note = pg.note || flow.footNote || doc.footNote || '';
    const foot = `<div class="pp-foot">${note ? `<div class="fn">${note}</div>` : ''}<div class="fr"><span>تفوّق · <bdi class="en">Tafawuq</bdi></span><span>صفحة ${n} من ${N}</span><span class="en">${doc.code ? 'Code ' + esc(doc.code) : ''}</span></div></div>`;
    return `<section class="pp-page${run ? ' hr' : ''}${doc.landscape ? ' pp-land' : ''}" data-n="${n}" data-role="${flow.role || 'main'}">${runHtml}<div class="pp-body">${pg.html}</div>${foot}</section>`;
  }
  function assemble(doc, o) {
    o = o || {};
    const flows = doc.flows.filter(f => (o.keyOnly ? f.role === 'key' : (f.role !== 'key' || o.key !== false)));
    const parts = flows.map(f => ({ f, pgs: f._pg || (f._pg = paginateFlow(f)) }));
    const N = parts.reduce((a, p) => a + p.pgs.length, 0);
    let n = 0; const pages = [];
    parts.forEach(p => p.pgs.forEach(pg => { n++; pages.push(renderPage(pg, n, N, p.f, doc)); }));
    return pages;
  }

  /* =====================================================================
     printing
     ===================================================================== */
  const printState = { root: null, page: null, title: null, timer: null };
  function cleanupPrint() {
    clearTimeout(printState.timer);
    if (printState.root) { printState.root.remove(); printState.root = null; }
    if (printState.page) { printState.page.remove(); printState.page = null; }
    document.body.classList.remove('pp-printing'); document.documentElement.classList.remove('pp-printing');
    if (printState.title != null) { document.title = printState.title; printState.title = null; }
  }
  function mountRoot(pages, o) {
    o = o || {};
    ensureStyle(); cleanupPrint();
    const root = document.createElement('div');
    root.id = 'print-root'; root.className = 'pp-doc' + (o.flow ? ' pp-flow' : '');
    root.innerHTML = Array.isArray(pages) ? pages.join('') : String(pages);
    document.body.appendChild(root);
    const st = document.createElement('style'); st.id = 'taf-print-page';
    st.textContent = `@page{size:A4 ${o.landscape ? 'landscape' : 'portrait'};margin:${o.flow ? '14mm' : '0'}}`;
    document.head.appendChild(st);
    document.body.classList.add('pp-printing'); document.documentElement.classList.add('pp-printing');
    printState.root = root; printState.page = st;
    if (o.title) { printState.title = document.title; document.title = o.title; }
    clearTimeout(printState.timer);
    printState.timer = setTimeout(cleanupPrint, 10 * 60 * 1000);          // safety net if `afterprint` never fires
    return cleanupPrint;
  }
  let activeView = null;          // set by tool views so Ctrl+P / browser-menu printing also prints the paper, not the app
  window.addEventListener('beforeprint', () => { if (!printState.root && activeView && activeView.pages && activeView.pages.length) mountRoot(activeView.pages, activeView.opts); });
  window.addEventListener('afterprint', () => { const r = printState.root; setTimeout(() => { if (printState.root === r) cleanupPrint(); }, 300); });
  window.addEventListener('hashchange', () => { if (printState.root) cleanupPrint(); });

  function printPages(pages, o) {
    ensureStyle();
    const go = () => { mountRoot(pages, o); try { window.print(); } catch (e) { cleanupPrint(); } };
    if (fontsOk) go(); else fontsReady().then(go);
  }
  function fileTitle(doc, extra) {
    return ['تفوّق', doc.title, extra].concat(doc.fileBits || []).concat([U.today()]).filter(Boolean).join(' - ').replace(/[\\/:*?"<>|]/g, ' ');
  }

  /* =====================================================================
     preview (scaled pages on a grey desk)
     ===================================================================== */
  function previewHTML(pages, land) {
    const W = (land ? 297 : 210) * PX, H = (land ? 210 : 297) * PX;
    return `<div class="pr-pinwrap">${pages.map((p, i) => `<figure class="pr-pg"><div class="pr-pw" data-w="${W}" data-h="${H}"><div class="pr-pin pp-doc" style="width:${W}px;height:${H}px">${p}</div></div><figcaption>صفحة ${i + 1} من ${pages.length}${p.indexOf('data-role="key"') > -1 ? ' — مفتاح الإجابات (للمعلم)' : ''}</figcaption></figure>`).join('')}</div>`;
  }
  function fitDesk(desk, zoom) {
    const cs = getComputedStyle(desk);
    const avail = desk.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (avail <= 0) return;
    desk.querySelectorAll('.pr-pw').forEach(pw => {
      const W = +pw.dataset.w, H = +pw.dataset.h;
      let k = Math.min(1, avail / W);
      if (zoom === 'big') k = Math.min(1, Math.max(k, 0.92));
      pw.style.width = (W * k) + 'px'; pw.style.height = (H * k) + 'px';
      pw.firstElementChild.style.transform = 'scale(' + k + ')';
    });
  }

  /* =====================================================================
     UI building blocks (options panel)
     ===================================================================== */
  const group = (label, body, hint) => `<div class="pr-group"><div class="pr-lbl"><span>${label}</span>${hint ? `<span class="pr-hint">${hint}</span>` : ''}</div>${body}</div>`;
  const chipBtn = (key, val, label, on, mode, dis) => `<button type="button" class="chip${on ? ' on' : ''}" data-opt="${key}" data-mode="${mode || 'set'}" data-val="${esc(val)}" aria-pressed="${on}"${dis ? ' disabled' : ''}>${label}</button>`;
  const chips = (key, items, cur, mode) => `<div class="pr-chips" role="group">${items.map(([v, l, dis]) => chipBtn(key, v, l, mode === 'toggle' ? (cur || []).includes(v) : String(cur) === String(v), mode, dis)).join('')}</div>`;
  const seg = (key, items, cur) => `<div class="seg" role="group">${items.map(([v, l]) => `<button type="button" data-opt="${key}" data-mode="set" data-val="${esc(v)}" aria-pressed="${String(cur) === String(v)}">${l}</button>`).join('')}</div>`;
  const sw = (key, label, on, hint, shared) => `<label class="pr-sw"><input type="checkbox" data-opt="${key}" data-mode="bool"${shared ? ' data-shared="1"' : ''}${on ? ' checked' : ''}><span>${label}${hint ? `<small>${hint}</small>` : ''}</span></label>`;
  const tx = (key, label, val, ph, o) => `<label class="pr-tx"><span>${label}</span><input type="${o && o.type || 'text'}" data-opt="${key}" data-mode="text"${o && o.shared ? ' data-shared="1"' : ''} value="${esc(val)}" placeholder="${esc(ph || '')}" maxlength="${o && o.max || 60}"${o && o.dir ? ` dir="${o.dir}"` : ''}></label>`;
  const sel = (key, label, items, cur) => `<label class="pr-tx"><span>${label}</span><select data-opt="${key}" data-mode="val">${items.map(([v, l]) => `<option value="${esc(v)}"${String(v) === String(cur) ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></label>`;
  const myName = sh => (sh && sh.fillName && S().settings.name || '').trim();
  const detailsShared = sh => `<details class="pr-more"><summary>تفاصيل الترويسة (المدرسة والمعلم والاسم)</summary><div class="pr-tx2">${tx('school', 'اسم المدرسة', sh.school, 'يظهر أعلى الورقة', { shared: 1 })}${tx('teacher', 'المعلم / الشعبة', sh.teacher, 'اختياري', { shared: 1 })}</div>${sw('lines', 'سطور الاسم والتاريخ في أعلى الورقة', sh.lines, '', 1)}${S().settings.name ? sw('fillName', 'اكتب اسمي في خانة الاسم', sh.fillName, 'الاسم المحفوظ في الإعدادات: ' + esc(S().settings.name), 1) : ''}</details>`;

  function crumbsHTML(items) { return `<nav class="crumbs" aria-label="مسار التنقل">${items.map(([t, h]) => h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`).join('<span aria-hidden="true">‹</span>')}</nav>`; }

  // generic header block for paper
  function paperHeader(o) {
    const sh = o.shared || {};
    const side = [];
    if (sh.school) side.push(`<b>${esc(sh.school)}</b>`);
    if (o.grade) side.push(gradeLabel(o.grade));
    if (sh.teacher) side.push(esc(sh.teacher));
    const nm = myName(sh);
    const fields = sh.lines === false ? '' : `<div class="pp-flds"><span class="pp-fld nm"><span>الاسم:</span>${nm ? `<u><bdi dir="auto">${esc(nm)}</bdi></u>` : '<i></i>'}</span><span class="pp-fld cl"><span>الشعبة:</span><i></i></span><span class="pp-fld dt"><span>التاريخ:</span><i></i></span>${o.total ? `<span class="pp-fld mk"><span>العلامة:</span><i></i><span class="sl">/ ${esc(o.total)}</span></span>` : ''}</div>`;
    return `<div class="pp-hd"><div class="pp-hd-top"><div class="pp-mark"><b>تفوّق</b><i>TAFAWUQ</i></div><div class="pp-ttl"><div class="pp-t1">${md(o.title)}</div>${o.sub ? `<div class="pp-t2">${esc(o.sub)}</div>` : ''}</div>${side.length ? `<div class="pp-side">${side.join('<br>')}</div>` : ''}</div>${fields}</div>`;
  }
  const secBlock = (letter, en, ar) => ({ keep: true, gap: 2.4, h: `<div class="pp-sec"><span class="pp-sl">${letter}</span><span class="pp-se">${esc(en)}</span><span class="pp-sa">${esc(ar)}</span></div>` });
  const keyHeader = (ar, en) => ({ keep: true, gap: 4, h: `<div class="pp-kh"><div><div class="t">مفتاح الإجابات — ${md(ar)}</div><div class="s">${esc(en)}</div></div><span class="tag">للمعلم — لا يُوزَّع على الطلاب</span></div>` });

  /* =====================================================================
     question rendering (worksheet + exam share these)
     ===================================================================== */
  const blankify = s => mdn(s).replace(/_{3,}/g, '<span class="pp-blank"></span>');
  const lines = (k, cls) => `<div class="pp-lns${cls ? ' ' + cls : ''}">${'<i></i>'.repeat(k)}</div>`;
  const marksLbl = m => m == null ? '' : `<div class="pp-qm">[${m} ${m === 1 ? 'mark' : 'marks'}]</div>`;
  const qWrap = (n, inner, marks, cls) => `<div class="pp-q${cls ? ' ' + cls : ''}"><div class="pp-qn">${n}.</div><div class="pp-qb">${inner}</div>${marksLbl(marks)}</div>`;

  function optsHTML(q) {
    const n = q.o.length, mx = Math.max.apply(null, q.o.map(o => strip(o).length));
    const cols = mx <= 16 ? Math.min(n, 4) : mx <= 38 ? 2 : 1;
    return `<div class="pp-opts" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${q.o.map((o, i) => `<span class="pp-o"><b>${LET[i]})</b> ${q.arOpts ? `<span class="ar">${md(o)}</span>` : mdn(o)}</span>`).join('')}</div>`;
  }
  function stemHTML(q) { return q.rtl ? `<div class="pp-qt rtl">${md(q.q)}</div>` : `<div class="pp-qt">${blankify(q.q)}</div>`; }

  // it: {q, scr?}  -> HTML for a numbered question
  function qHTML(it, n, o) {
    o = o || {}; const q = it.q;
    let inner = '';
    switch (q.t) {
      case 'mcq': inner = stemHTML(q) + optsHTML(q); break;
      case 'gap': inner = `<div class="pp-qt">${blankify(q.q)}${/_{3,}/.test(q.q) ? '' : ' <span class="pp-blank wide"></span>'}</div>`; break;
      case 'tf': inner = `<div class="pp-qt">${mdn(q.q)}</div><div class="pp-tf"><span class="pp-ck"><i class="pp-box"></i>True</span><span class="pp-ck"><i class="pp-box"></i>False</span></div>`; break;
      case 'find': inner = `<div class="pp-qt">${mdn(q.q)}</div><div class="pp-fill"><span>Answer:</span><i></i></div>`; break;
      case 'err': inner = `<div class="pp-qt">${mdn(q.q)}</div><div class="pp-fill"><span>Correct word:</span><i></i></div>`; break;
      case 'tr': inner = `<div class="pp-qt">${mdn(q.q)}</div>${q.p ? `<div class="pp-pr">${mda(q.p)}</div>` : ''}${lines(2)}`; break;
      case 'order': inner = `<div class="pp-tiles">${(it.scr || []).map(w => `<span class="pp-tile">${esc(w)}</span>`).join('')}</div>${lines(1)}`; break;
      case 'open': inner = `<div class="pp-qt">${nl(mdn(q.q))}</div>${lines(o.lines || (String(q.m || '').length > 160 ? 4 : 3))}`; break;
      default: inner = `<div class="pp-qt">${mdn(q.q || '')}</div>`;
    }
    return qWrap(n, inner, o.marks, q.t === 'order' ? 'ord' : '');
  }

  // plain-text version of a question
  function qText(it, n) {
    const q = it.q, t = s => strip(s).replace(/_{3,}/g, '______');
    switch (q.t) {
      case 'mcq': return `${n}. ${t(q.q)}\r\n` + q.o.map((o, i) => `   ${LET[i]}) ${strip(o)}`).join('\r\n');
      case 'gap': return `${n}. ${t(q.q)}${/_{3,}/.test(q.q) ? '' : ' ______'}`;
      case 'tf': return `${n}. ${t(q.q)}\r\n   [ ] True   [ ] False`;
      case 'find': return `${n}. ${t(q.q)}\r\n   Answer: ____________`;
      case 'err': return `${n}. ${t(q.q)}\r\n   Correct word: ____________`;
      case 'tr': return `${n}. ${t(q.q)}${q.p ? '\r\n   (' + strip(q.p) + ')' : ''}\r\n   ______________________________________`;
      case 'order': return `${n}. ${(it.scr || []).join(' / ')}\r\n   ______________________________________`;
      case 'open': return `${n}. ${t(q.q)}\r\n   ______________________________________\r\n   ______________________________________`;
    }
    return `${n}. ${t(q.q || '')}`;
  }

  // answer-key entry: {h: html, t: text}
  function keyEntry(it, n, o) {
    o = o || {}; const q = it.q; let a = '', at = '', alt = '';
    const li = i => `<b>${LET[i]})</b> `;
    switch (q.t) {
      case 'mcq': a = li(q.a) + (q.arOpts ? `<span class="ar" dir="rtl">${md(q.o[q.a])}</span>` : mdn(q.o[q.a])); at = LET[q.a] + ') ' + strip(q.o[q.a]); break;
      case 'tf': a = `<b>${q.a ? 'True' : 'False'}</b>`; at = q.a ? 'True' : 'False'; break;
      case 'gap': case 'find': case 'tr': {
        const arr = q.a || []; a = mdn(arr[0] || ''); at = strip(arr[0] || '');
        if (arr.length > 1) { alt = `<span class="alt"> &nbsp;/&nbsp; ${arr.slice(1, 4).map(mdn).join(' &nbsp;/&nbsp; ')}</span>`; at += ' / ' + arr.slice(1, 4).map(strip).join(' / '); }
        break;
      }
      case 'err': a = `<b>${esc(q.w)}</b> → <b>${mdn(q.c)}</b>`; at = q.w + ' -> ' + strip(q.c); break;
      case 'order': a = mdn(q.a); at = strip(q.a); break;
      case 'open': a = nl(mdn(q.m || '')); at = strip(q.m || ''); break;
      case 'match': a = it.keyH; at = it.keyT; break;
    }
    if (o.marks != null) alt += `<span class="alt"> &nbsp;[${o.marks}]</span>`;
    const hasX = o.expl !== false && q.x;
    const stack = at.length + (alt ? 20 : 0) > 56 || q.t === 'open';
    return { h: `<div class="pp-ke${stack ? ' st' : ''}"><div class="n">${n}.</div><div class="b"><div class="a">${a}${alt}</div>${hasX ? `<div class="x">${md(q.x)}</div>` : ''}</div></div>`, t: `${n}. ${at}` + (hasX ? '\r\n   ' + strip(q.x) : '') };
  }

  /* passage blocks (reading): title + one block per paragraph so long texts can flow across pages */
  function passageBlocks(u) {
    const r = u.reading;
    const out = [{ keep: true, gap: 2, h: `<div class="pp-pass-t">${mdn(r.title)}</div>` }];
    (r.text || []).forEach((p, i) => out.push({ gap: 2.2, h: `<div class="pp-pass-p"><span class="pn">${i + 1}</span>${mdn(p)}</div>` }));
    return out;
  }
  const passageText = u => strip(u.reading.title) + '\r\n\r\n' + (u.reading.text || []).map((p, i) => `(${i + 1}) ${strip(p)}`).join('\r\n\r\n');

  /* vocabulary gap questions (word bank): blank the target word in its example sentence */
  function blankIn(ex, w) {
    const core = w.replace(/\(.*?\)/g, '').replace(/\b(something|someone|sth|sb|one's)\b/g, '').trim();
    if (!core || core.split(/\s+/).length > 3) return null;
    const words = core.split(/\s+/);
    const esc2 = x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const firstStem = words[0].length > 3 ? esc2(words[0].replace(/e$/, '')) + '\\w{0,4}' : esc2(words[0]) + '(?:s|es|ed|ing|d)?';
    const rest = words.slice(1).map(esc2).join('\\s+');
    const re = new RegExp('\\b' + firstStem + (rest ? '\\s+' + rest + '(?:s|es)?' : '') + '\\b', 'i');
    const m = ex.match(re);
    if (!m) return null;
    return { q: ex.replace(m[0], '____'), ans: m[0] };
  }

  const KINDS = {};
  const ORDER = ['worksheet', 'exam', 'vocab', 'cards', 'report', 'certificate'];

  /* =====================================================================
     WORKSHEET — questions drawn from the unit data, with an answer key on its own pages
     ===================================================================== */
  const WS_ORDER = ['match', 'mcq', 'gap', 'tf', 'find', 'err', 'tr', 'order', 'open'];
  const WS_UI = ['mcq', 'gap', 'tf', 'find', 'err', 'tr', 'order', 'open', 'match'];
  const WS_LBL = { mcq: 'اختيار من متعدد', gap: 'أكمل الفراغ', tf: 'صح أم خطأ', find: 'ابحث في النص', err: 'اكتشف الخطأ', tr: 'أعد الصياغة', order: 'رتّب الكلمات', open: 'أجب بأسلوبك', match: 'توصيل المفردات' };
  const WS_EN = { mcq: 'Multiple choice', gap: 'Gap fill', tf: 'True / False', find: 'Find in the text', err: 'Error correction', tr: 'Rewrite the sentence', order: 'Word order', open: 'Open questions', match: 'Matching' };
  const WS_INS = {
    match: ['Match each word with its meaning.', 'صِل كل كلمة بمعناها بخط مستقيم.'],
    mcq: ['Choose the correct answer.', 'اختر الإجابة الصحيحة.'],
    gap: ['Complete each sentence.', 'أكمل الفراغ بالإجابة المناسبة.'],
    tf: ['Write True or False.', 'ضع إشارة في المربع: صح (True) أم خطأ (False).'],
    find: ['Find the word or phrase in the text.', 'ابحث في النص عن الكلمة أو العبارة المطلوبة.'],
    err: ['Each sentence has ONE mistake. Underline it and write the correct word.', 'في كل جملة خطأ واحد: ضع خطاً تحته ثم اكتب الكلمة الصحيحة.'],
    tr: ['Rewrite each sentence as instructed.', 'أعد كتابة الجملة وفق التعليمات المعطاة.'],
    order: ['Put the words in order to make a correct sentence.', 'رتّب الكلمات لتكوين جملة صحيحة.'],
    open: ['Answer in your own words.', 'أجب بأسلوبك الخاص.']
  };
  const WS_W = { mcq: 4, gap: 3, tf: 2, find: 2, err: 2, tr: 2, order: 1.4, open: 1.2 };
  const WS_GAP = { mcq: 3.4, gap: 3.4, tf: 3.4, find: 3.4, err: 3.8, tr: 4, order: 3.8, open: 4.6 };
  const WS_FOCUS = [['mixed', 'مختلط'], ['grammar', 'قواعد'], ['vocab', 'مفردات'], ['reading', 'قراءة']];
  const WS_FOCUS_AR = { mixed: 'تمارين متنوعة', grammar: 'القواعد', vocab: 'المفردات', reading: 'القراءة' };

  function wsFix(ctx) {
    const P = ctx.P, ids = ctx.units.map(u => u.id);
    if (P.unit !== 'all' && !ids.includes(P.unit)) P.unit = 'all';
    if (!WS_FOCUS.some(f => f[0] === P.focus)) P.focus = 'mixed';
    if (P.focus === 'reading' && P.unit === 'all') { const u = ctx.units.find(x => x.reading); if (u) P.unit = u.id; }
    if (P.focus === 'grammar' && P.g !== 'all') { const ok = ctx.units.some(x => (P.unit === 'all' || x.id === P.unit) && (x.grammar || []).some(g => g.id === P.g)); if (!ok) P.g = 'all'; }
    if (![10, 15, 20, 30].includes(P.n)) P.n = 15;
  }

  function wsPool(ctx) {
    const P = ctx.P, key = [ctx.grade, P.unit, P.focus, P.g, ctx.seed].join('|');
    if (ctx.cache.pool && ctx.cache.pool.key === key) return ctx.cache.pool;
    const sel = P.unit === 'all' ? ctx.units : ctx.units.filter(u => u.id === P.unit);
    const pool = { key, passage: null }; WS_ORDER.forEach(t => { pool[t] = []; });
    const seen = new Set();
    const add = (q, order, extra) => {
      if (!pool[q.t] || q.t === 'match') return;
      const sig = q.t + '|' + String(q.q || q.a || '').toLowerCase().replace(/\s+/g, ' ');
      if (seen.has(sig)) return; seen.add(sig);
      pool[q.t].push(Object.assign({ q, order }, extra || {}));
    };
    withSeed(ctx.seed, () => {
      sel.forEach((u, ui) => {
        const base = ui * 100000, vs = u.vocab || [];
        if (P.focus === 'grammar' || P.focus === 'mixed') (u.grammar || []).forEach((g, gi) => { if (P.focus === 'grammar' && P.g !== 'all' && g.id !== P.g) return; (g.qs || []).forEach((q, i) => add(q, base + gi * 1000 + i)); });
        if (P.focus === 'mixed') (u.test || []).forEach((q, i) => add(q, base + 50000 + i));
        if (P.focus === 'reading' && u.reading) { pool.passage = pool.passage || u; (u.reading.qs || []).forEach((q, i) => add(q, base + i)); }
        if ((P.focus === 'vocab' || P.focus === 'mixed') && TAF.vocabQuiz && vs.length) TAF.vocabQuiz(vs, u, P.focus === 'vocab' ? vs.length : Math.min(6, vs.length)).forEach((q, i) => add(q, base + 90000 + i));
        if (P.focus === 'vocab') {
          vs.forEach((v, i) => { const b = blankIn(v.ex || '', v.w); if (b) add({ t: 'gap', q: b.q, a: [b.ans], vb: true, x: v.w + ' = ' + v.ar }, base + 95000 + i); });
          vs.forEach((v, i) => pool.match.push({ v, order: base + i }));
        }
      });
      const seenAr = new Set();
      pool.match = pool.match.filter(m => { if (seenAr.has(m.v.ar)) return false; seenAr.add(m.v.ar); return true; });
    });
    ctx.cache.pool = pool;
    return pool;
  }

  function wsChoose(ctx, pool) {
    const P = ctx.P, avail = {};
    WS_ORDER.forEach(t => { avail[t] = pool[t].length; });
    let types = (P.types || []).filter(t => avail[t] > 0);
    if (!types.length) types = WS_ORDER.filter(t => avail[t] > 0);
    const N = P.n, alloc = {};
    types.forEach(t => { alloc[t] = 0; });
    let m = 0;
    if (types.includes('match')) { m = Math.min(avail.match, types.length === 1 ? Math.min(N, 12) : Math.min(10, Math.max(5, Math.round(N * 0.3)))); alloc.match = m; }
    const others = types.filter(t => t !== 'match');
    let left = Math.min(N - m, others.reduce((a, t) => a + avail[t], 0));
    while (left > 0) {
      let best = null, bs = 1e9;
      others.forEach(t => { if (alloc[t] >= avail[t]) return; const sc = (alloc[t] + 1) / WS_W[t]; if (sc < bs) { bs = sc; best = t; } });
      if (!best) break; alloc[best]++; left--;
    }
    const items = {}; let right = [];
    withSeed(ctx.seed + 7, () => {
      types.forEach(t => {
        if (!alloc[t]) return;
        const pick = U.sample(pool[t], alloc[t]).sort((a, b) => a.order - b.order);
        if (t === 'order') pick.forEach(it => { it.scr = scramble(String(it.q.a).split(/\s+/).filter(Boolean)); });
        items[t] = pick;
      });
      if (items.match) right = scramble(items.match.map(x => x.v));
    });
    const total = WS_ORDER.reduce((a, t) => a + (items[t] ? items[t].length : 0), 0);
    return { items, alloc, avail, total, right, types };
  }

  function wsBuild(ctx) {
    const P = ctx.P, sh = ctx.shared, pool = wsPool(ctx), ch = wsChoose(ctx, pool);
    if (!ch.total) return null;
    let n = 0; const secs = [];
    WS_ORDER.forEach(t => { const arr = ch.items[t]; if (!arr || !arr.length) return; secs.push({ t, start: n + 1, items: arr }); n += arr.length; });
    const u1 = P.unit !== 'all' ? ctx.units.find(u => u.id === P.unit) : null;
    const g1 = P.focus === 'grammar' && P.g !== 'all' && u1 ? (u1.grammar || []).find(g => g.id === P.g) : null;
    const title = 'ورقة عمل — ' + (g1 ? g1.ar : WS_FOCUS_AR[P.focus]);
    let sub = u1 ? `Unit ${u1.n} · ${strip(u1.title)}` : `Grade ${ctx.grade} · All units`;
    if (g1) sub += ` · ${strip(g1.title)}`;
    if (P.focus === 'reading' && pool.passage) sub = `Unit ${pool.passage.n} · Reading: ${strip(pool.passage.reading.title)}`;
    const code = codeOf(ctx.seed);

    const blocks = [{ gap: 5, h: paperHeader({ title, sub, grade: ctx.grade, shared: sh, total: ch.total }) }];
    let txt = `تفوّق — ${title}\r\n${sub}\r\n${sh.school ? sh.school + '\r\n' : ''}Name: ______________________   Date: ____________   Class: ________\r\n` + '='.repeat(60) + '\r\n\r\n';
    if (P.focus === 'reading' && pool.passage) { blocks.push.apply(blocks, passageBlocks(pool.passage)); blocks.push({ gap: 1, h: '<div style="height:1mm"></div>' }); txt += passageText(pool.passage) + '\r\n\r\n'; }
    const keyBlocks = [keyHeader(title, 'Answer Key · ' + sub)];
    let ktxt = '\r\n' + '='.repeat(60) + '\r\nANSWER KEY — مفتاح الإجابات (للمعلم)\r\n' + '='.repeat(60) + '\r\n';
    secs.forEach((sec, si) => {
      const L = String.fromCharCode(65 + si), ins = WS_INS[sec.t];
      blocks.push(secBlock(L, ins[0], ins[1]));
      txt += `${L}. ${ins[0]}  —  ${ins[1]}\r\n\r\n`;
      keyBlocks.push({ keep: true, gap: 1.6, h: `<div class="pp-ks"><span>${L}. ${WS_EN[sec.t]}</span><span class="ar">${WS_LBL[sec.t]}</span></div>` });
      ktxt += `\r\n${L}. ${WS_EN[sec.t]} — ${WS_LBL[sec.t]}\r\n`;
      if (sec.t === 'match') {
        const pairs = sec.items.map(x => x.v), right = ch.right;
        blocks.push({ gap: 3.6, h: `<div class="pp-match">${pairs.map((v, i) => `<div class="pp-mr"><span class="n">${sec.start + i}.</span><span class="l">${esc(v.w)}</span><i class="dot"></i><span></span><i class="dot"></i><span class="ml">${String.fromCharCode(65 + i)}.</span><span class="a">${esc(right[i].ar)}</span></div>`).join('')}</div>` });
        txt += pairs.map((v, i) => `${sec.start + i}. ${v.w}`).join('\r\n') + '\r\n\r\n' + right.map((v, i) => `   ${String.fromCharCode(65 + i)}. ${v.ar}`).join('\r\n') + '\r\n\r\n';
        pairs.forEach((v, i) => {
          const letter = String.fromCharCode(65 + right.indexOf(v));
          const e = keyEntry({ q: { t: 'match' }, keyH: `<b>${letter}</b> — <span class="ar" dir="rtl">${esc(v.ar)}</span> &nbsp;<span class="alt">(${esc(v.w)})</span>`, keyT: `${letter} — ${v.ar} (${v.w})` }, sec.start + i, { expl: false });
          keyBlocks.push({ gap: 1.4, h: e.h }); ktxt += e.t + '\r\n';
        });
        return;
      }
      if (sec.t === 'gap' && sec.items.some(it => it.q.vb)) {
        const bank = withSeed(ctx.seed + 11, () => U.shuffle(sec.items.filter(it => it.q.vb).map(it => it.q.a[0])));
        blocks.push({ keep: true, gap: 2.4, h: `<div class="pp-wb"><b>Word bank</b>${bank.map(w => `<span>${esc(w)}</span>`).join('')}</div>` });
        txt += 'Word bank: ' + bank.join(' | ') + '\r\n\r\n';
      }
      sec.items.forEach((it, i) => {
        const num = sec.start + i;
        blocks.push({ gap: WS_GAP[sec.t], h: qHTML(it, num) });
        txt += qText(it, num) + '\r\n\r\n';
        const e = keyEntry(it, num, { expl: P.expl });
        keyBlocks.push({ gap: 2, h: e.h }); ktxt += e.t + '\r\n';
      });
    });
    const flows = [{ role: 'main', run: true, squeeze: true, blocks }, { role: 'key', run: true, squeeze: true, blocks: keyBlocks, runEn: 'Answer Key' }];
    const idBits = [P.unit === 'all' ? 'all' : P.unit, P.focus];
    return {
      kind: 'worksheet', title: 'ورقة عمل', runEn: `Worksheet · ${u1 ? 'Unit ' + u1.n : 'Grade ' + ctx.grade}`, code, flows, hasKey: true,
      txt: txt + (P.key ? ktxt : ''), fileId: idBits.join('-'), fileBits: [u1 ? unitLabel(u1) : 'كل الوحدات', WS_FOCUS_AR[P.focus]],
      statLine: cnt(ch.total, 'question')
    };
  }

  function wsOptions(ctx) {
    const P = ctx.P, pool = wsPool(ctx), ch = wsChoose(ctx, pool);
    const unitItems = ctx.units.map(u => [u.id, unitLabel(u)]);
    let h = group('الوحدة', chips('unit', P.focus === 'reading' ? unitItems : [['all', 'كل الوحدات']].concat(unitItems), P.unit, 'set'));
    h += group('التركيز', chips('focus', WS_FOCUS, P.focus, 'set'));
    if (P.focus === 'grammar' && P.unit !== 'all') {
      const u = ctx.units.find(x => x.id === P.unit);
      if (u && (u.grammar || []).length > 1) h += group('القاعدة', chips('g', [['all', 'كل قواعد الوحدة']].concat(u.grammar.map(g => [g.id, esc(g.ar)])), P.g, 'set'));
    }
    h += group('عدد الأسئلة', seg('n', [[10, '10'], [15, '15'], [20, '20'], [30, '30']], P.n), ch.total === 0 ? 'لا أسئلة متاحة' : ch.total < P.n ? `المتوفر ${ch.total} فقط بهذه الخيارات` : '');
    const tItems = WS_UI.filter(t => ch.avail[t] > 0).map(t => [t, `${WS_LBL[t]} <span class="pr-cnt">${ch.avail[t]}</span>`]);
    h += group('أنواع الأسئلة', tItems.length ? chips('types', tItems, ch.types, 'toggle') : '<p class="small muted">لا أسئلة متاحة بهذه الخيارات.</p>');
    h += group('الورقة', sw('key', 'مفتاح الإجابة في آخر الورقة', P.key, 'يُطبع في صفحات مستقلة — ألغِه قبل توزيع الورقة على الطلاب') + sw('expl', 'شرح الإجابات في المفتاح', P.expl));
    return h + detailsShared(ctx.shared);
  }

  KINDS.worksheet = {
    ar: 'ورقة عمل', icon: I.sheet, random: true, needsUnits: true,
    desc: 'أسئلة من الوحدة على ورقة جاهزة، مع مفتاح إجابة في صفحة مستقلة.',
    sub: 'اختر الوحدة والتركيز وعدد الأسئلة، وسنجهّز ورقة نظيفة تصلح للطباعة أو الحفظ بصيغة PDF.',
    defaults: { unit: 'all', focus: 'mixed', g: 'all', n: 15, types: WS_UI.slice(), key: true, expl: true },
    fix: wsFix, options: wsOptions, build: wsBuild,
    keyPref: ctx => ctx.P.key,
    changed(ctx, key) { if (key === 'unit') ctx.P.g = 'all'; if (['unit', 'focus', 'g'].includes(key)) { wsFix(ctx); } },
    minOne(ctx, key, val) {                // runs before a chip is toggled: make the stored selection match what the user sees
      if (key !== 'types') return false;
      const pool = wsPool(ctx); let eff = (ctx.P.types || []).filter(t => pool[t].length > 0);
      if (!eff.length) eff = WS_UI.filter(t => pool[t].length > 0);
      ctx.P.types = eff;
      if (eff.length === 1 && eff[0] === val) { U.toast('اترك نوعاً واحداً من الأسئلة على الأقل'); return true; }
      return false;
    },
    actions: () => [
      { id: 'keyonly', ar: 'طباعة مفتاح الإجابة فقط (للمعلم)', short: 'المفتاح فقط', icon: SVG.key },
      { id: 'txt', ar: 'تنزيل ورقة العمل كملف نصي (<bdi class="en">.txt</bdi>)', short: 'ملف نصي', icon: SVG.down }
    ]
  };

  /* =====================================================================
     VOCABULARY — table, fold-over test sheet, A–Z list (+ CSV)
     ===================================================================== */
  CSS.push(`
/* vocabulary */
.pp-vh,.pp-vr{direction:ltr;display:grid;grid-template-columns:7mm 50mm 40mm minmax(0,1fr);column-gap:3mm;align-items:start;text-align:left}
.pp-vh{font:700 8.5pt/1.4 var(--pp-en);border-top:.4mm solid #111;border-bottom:.4mm solid #111;padding:1.1mm 0}
.pp-vh .a{direction:rtl;text-align:right;font-family:var(--pp-ar)}
.pp-vr{padding:1.5mm 0;border-bottom:.2mm solid #888;font:400 10pt/1.4 var(--pp-en)}
.pp-vr .n{text-align:right;color:#444;font-size:8.2pt;padding-top:.5mm}
.pp-vr .w b{font-weight:600;font-size:10.5pt}
.pp-vr .w i{display:block;font:italic 400 8pt/1.25 var(--pp-en);color:#444}
.pp-vr .a{direction:rtl;text-align:right;font:500 10pt/1.45 var(--pp-ar)}
.pp-vr .x{font-size:9.4pt;line-height:1.4;color:#1a1a1a}
.pp-vr .x em{display:block;font-style:italic;color:#444;font-size:8.6pt;margin-top:.4mm}
.pp-vu{direction:rtl;display:flex;gap:2.5mm;align-items:baseline;border-bottom:.3mm solid #111;padding:2.2mm 0 1mm;font:700 10.5pt/1.3 var(--pp-ar);margin-top:.5mm}
.pp-vu .en{font:600 10.5pt/1.3 var(--pp-en);color:#222;margin-right:auto}
.pp-vg{direction:ltr;text-align:left;font:italic 600 8.8pt/1.3 var(--pp-en);color:#333;padding:1.6mm 0 .6mm;border-bottom:.2mm dotted #666}
.pp-vl{direction:ltr;display:flex;align-items:center;gap:2.5mm;padding:1.6mm 0 .8mm;margin-top:.5mm}
.pp-vl b{display:inline-block;min-width:7mm;height:7mm;border:.4mm solid #111;border-radius:1.2mm;font:700 11pt/6.4mm var(--pp-en);text-align:center}
.pp-vl i{flex:1;border-bottom:.3mm solid #111;height:0}
/* fold-over test */
.pp-fh,.pp-fr{direction:ltr;display:grid;column-gap:2.5mm;align-items:end;text-align:left}
.pp-fh.in,.pp-fr.in{grid-template-columns:7mm 52mm minmax(0,1fr) 6mm 44mm}
.pp-fh.out,.pp-fr.out{grid-template-columns:7mm 62mm minmax(0,1fr)}
.pp-fh{font:700 8.5pt/1.4 var(--pp-en);border-top:.4mm solid #111;border-bottom:.4mm solid #111;padding:1.1mm 0;align-items:center}
.pp-fh .ar{direction:rtl;text-align:right;font-family:var(--pp-ar)}
.pp-fr{min-height:9.4mm;padding:1mm 0 0;font:400 10.5pt/1.35 var(--pp-en)}
.pp-fr .n{text-align:right;color:#444;font-size:8.2pt;padding-bottom:1mm}
.pp-fr .v{padding-bottom:.9mm}
.pp-fr .v b{font-weight:600}
.pp-fr .v i{font:italic 400 8pt/1.2 var(--pp-en);color:#444;margin-left:1mm}
.pp-fr .v.ar{direction:rtl;text-align:right;font:500 10.5pt/1.4 var(--pp-ar)}
.pp-fr .wr i{display:block;border-bottom:.3mm solid #111;height:6.4mm}
.pp-fr .fd{align-self:stretch;border-left:.35mm dashed #111;margin:-1mm 0 0 2.6mm}
.pp-fr .k{padding-bottom:.9mm;color:#111}
.pp-fr .k.ar{direction:rtl;text-align:right;font:500 10pt/1.4 var(--pp-ar)}
.pp-fr .k.en{font:400 10.5pt/1.35 var(--pp-en)}
.pp-fh .fd{align-self:center;text-align:center;margin:0 -2.5mm 0 0;font:700 7.4pt/1.2 var(--pp-ar);white-space:nowrap;color:#111}
.pp-fh .fd b{font-weight:700}
`);

  const VOC_HEAD = '<div class="pp-vh"><span></span><span>Word</span><span class="a">المعنى</span><span>Example</span></div>';
  const vSortKey = w => String(w).toLowerCase().replace(/\(.*?\)/g, '').replace(/^(to|a|an|the)\s+/, '').trim();

  const effSrc = ctx => (ctx.P.src === 'starred' || !ctx.units.length) ? 'starred' : 'units';
  function vocabWords(ctx) {
    const P = ctx.P;
    if (effSrc(ctx) === 'starred') {
      const idx = id => { const i = TAF.units.findIndex(u => u.id === id); return i < 0 ? 999 : i; };
      return TAF.words.list().map(st => {
        const u = TAF.byId[st.unit], v = u && (u.vocab || []).find(x => x.w.toLowerCase().trim() === String(st.w).toLowerCase().trim());
        return { w: st.w, ar: (v && v.ar) || st.ar || '', pos: (v && v.pos) || '', def: (v && v.def) || '', ex: (v && v.ex) || st.ex || '', tag: (v && v.tag) || '', unit: st.unit || '', un: u ? u.n : 0, utitle: u ? u.title : '', ui: idx(st.unit), vi: v && u ? u.vocab.indexOf(v) : 9999 };
      }).sort((a, b) => a.ui - b.ui || a.vi - b.vi);
    }
    const sel = P.units.length ? ctx.units.filter(u => P.units.includes(u.id)) : ctx.units;
    return sel.flatMap(u => (u.vocab || []).map((v, i) => ({ w: v.w, ar: v.ar, pos: v.pos || '', def: v.def || '', ex: v.ex || '', tag: v.tag || '', unit: u.id, un: u.n, ui: u.n, vi: i, utitle: u.title })));
  }
  function vocabScope(ctx, words) {
    const P = ctx.P;
    if (effSrc(ctx) === 'starred') return { en: 'My starred words', ar: 'كلماتي المميّزة', id: 'starred' };
    const sel = P.units.length ? ctx.units.filter(u => P.units.includes(u.id)) : ctx.units;
    if (sel.length === 1) return { en: `Unit ${sel[0].n} · ${strip(sel[0].title)}`, ar: unitLabel(sel[0]), id: sel[0].id };
    if (P.units.length) return { en: `Units ${sel.map(u => u.n).join(', ')}`, ar: 'الوحدات ' + sel.map(u => u.n).join('، '), id: sel.map(u => u.n).join('+') };
    return { en: `Grade ${ctx.grade} · All units`, ar: 'كل وحدات ' + gradeLabel(ctx.grade), id: 'all' };
  }

  function vocabBuild(ctx) {
    const P = ctx.P, sh = ctx.shared;
    let words = vocabWords(ctx);
    if (!words.length) return null;
    const sc = vocabScope(ctx, words), code = (P.layout === 'fold' && P.shuf) ? codeOf(ctx.seed) : '', N = words.length;
    const countAr = cnt(N, 'word');
    const o = { ex: P.ex, def: P.def };
    const csv = toCSV([['Unit', 'Unit title', 'English', 'Part of speech', 'Arabic', 'Definition', 'Example', 'Group']].concat(words.map(w => [w.un || '', (TAF.byId[w.unit] || {}).title || '', w.w, w.pos, w.ar, w.def, w.ex, w.tag])));
    let blocks = [], title, sub = sc.en, flows = [], txt = '';
    const head = (t, subt, total) => ({ gap: 4.5, h: paperHeader({ title: t, sub: subt, grade: ctx.grade, shared: sh, total }) });

    if (P.layout === 'fold') {
      title = 'ورقة اختبار المفردات';
      if (P.shuf) withSeed(ctx.seed, () => { words = U.shuffle(words); });
      const inline = P.foldKey === 'inline', vis = P.vis;
      const hdrCols = `<div class="pp-fh ${inline ? 'in' : 'out'}"><span></span><span class="${vis === 'en' ? '' : 'ar'}">${vis === 'en' ? 'English word' : 'المعنى العربي'}</span><span>${vis === 'en' ? 'اكتب المعنى بالعربية' : 'Write the English word'}</span>${inline ? `<span class="fd"><b>اطوِ</b></span><span class="${vis === 'en' ? 'ar' : ''}">${vis === 'en' ? 'الإجابة' : 'Answer'}</span>` : ''}</div>`;
      blocks.push(head(title, 'Fold-over vocabulary test · ' + sub, N));
      blocks.push({ gap: 3.5, h: `<div class="pp-note">${inline ? 'اطوِ الورقة عند الخط المتقطع فتختفي الإجابات في العمود الأخير، ثم اكتب المعنى المطلوب أمام كل كلمة، وافتح الورقة لتصحّح إجاباتك بنفسك.' : 'اكتب المعنى المطلوب أمام كل كلمة. الإجابات الصحيحة في الصفحة الأخيرة (للمعلم).'}</div>` });
      words.forEach((v, i) => {
        const left = vis === 'en' ? `<span class="v"><b>${esc(v.w)}</b>${v.pos ? `<i>${esc(v.pos)}</i>` : ''}</span>` : `<span class="v ar">${md(v.ar)}</span>`;
        const ans = vis === 'en' ? `<span class="k ar">${md(v.ar)}</span>` : `<span class="k en">${esc(v.w)}</span>`;
        blocks.push({ gap: 0, head: hdrCols, h: `<div class="pp-fr ${inline ? 'in' : 'out'}"><span class="n">${i + 1}</span>${left}<span class="wr"><i></i></span>${inline ? `<span class="fd"></span>${ans}` : ''}</div>` });
      });
      const keyBlocks = [];
      if (!inline) {
        keyBlocks.push(keyHeader(title, 'Answer Key · Fold-over vocabulary test · ' + sub));
        words.forEach((v, i) => keyBlocks.push({ gap: 1.2, h: `<div class="pp-ke"><div class="n">${i + 1}.</div><div class="a"><b>${esc(v.w)}</b> &nbsp;=&nbsp; <span class="ar" dir="rtl">${md(v.ar)}</span></div></div>` }));
      }
      flows.push({ role: 'main', run: true, squeeze: true, blocks, runEn: 'Vocabulary test' });
      if (keyBlocks.length) flows.push({ role: 'key', run: true, squeeze: true, blocks: keyBlocks, runEn: 'Vocabulary test — Answer Key' });
      txt = `تفوّق — ${title}\r\n${sub}\r\nName: ____________   Date: ________\r\n${'='.repeat(50)}\r\n` + words.map((v, i) => `${i + 1}. ${vis === 'en' ? v.w : v.ar} = ____________`).join('\r\n') + `\r\n\r\n${'='.repeat(50)}\r\nANSWERS\r\n` + words.map((v, i) => `${i + 1}. ${v.w} = ${v.ar}`).join('\r\n');
    } else {
      const az = P.layout === 'az';
      title = az ? 'قائمة المفردات — ترتيب أبجدي' : 'قائمة المفردات';
      blocks.push(head(title, `Vocabulary list · ${sub} · ${N} words`));
      if (az) {
        words = words.slice().sort((a, b) => vSortKey(a.w).localeCompare(vSortKey(b.w), 'en'));
        let last = '';
        words.forEach((v, i) => {
          const L = (vSortKey(v.w).charAt(0) || '#').toUpperCase(), letter = /[A-Z]/.test(L) ? L : '#';
          if (letter !== last) { blocks.push({ keep: true, gap: 0, head: VOC_HEAD, h: `<div class="pp-vl"><b>${letter}</b><i></i></div>` }); last = letter; }
          blocks.push({ gap: 0, head: VOC_HEAD, h: vocabRow(v, i + 1, o, true) });
        });
      } else {
        let lastU = null, lastTag = null, k = 0;
        words.forEach(v => {
          if (v.unit !== lastU) { blocks.push({ keep: true, gap: 0, head: VOC_HEAD, h: `<div class="pp-vu"><span>${v.un ? 'الوحدة ' + v.un : 'كلماتي'}</span>${v.utitle ? `<span class="en">${esc(strip(v.utitle))}</span>` : ''}</div>` }); lastU = v.unit; lastTag = null; }
          if (v.tag && v.tag !== lastTag) { blocks.push({ keep: true, gap: 0, head: VOC_HEAD, h: `<div class="pp-vg">${esc(v.tag)}</div>` }); lastTag = v.tag; }
          blocks.push({ gap: 0, head: VOC_HEAD, h: vocabRow(v, ++k, o, false) });
        });
      }
      flows.push({ role: 'main', run: true, squeeze: true, blocks, runEn: 'Vocabulary list' });
      txt = `تفوّق — ${title}\r\n${sub}\r\n${'='.repeat(50)}\r\n` + words.map((v, i) => `${i + 1}. ${v.w}${v.pos ? ' (' + v.pos + ')' : ''} = ${v.ar}${P.ex && v.ex ? '\r\n   ' + v.ex : ''}`).join('\r\n');
    }
    return { kind: 'vocab', title, runEn: 'Vocabulary · ' + sc.en, code, flows, csv, txt, fileId: sc.id + '-' + P.layout, fileBits: [sc.ar], statLine: `${countAr}` };
  }
  function vocabRow(v, n, o, showUnit) {
    return `<div class="pp-vr"><span class="n">${n}</span><span class="w"><b>${esc(v.w)}</b>${v.pos || showUnit ? `<i>${esc(v.pos)}${showUnit && v.un ? (v.pos ? ' · ' : '') + 'U' + v.un : ''}</i>` : ''}</span><span class="a">${md(v.ar)}</span><span class="x">${o.ex && v.ex ? esc(v.ex) : ''}${o.def && v.def ? `<em>${esc(v.def)}</em>` : ''}</span></div>`;
  }

  function vocabOptions(ctx) {
    const P = ctx.P, starred = TAF.words.list().length, words = vocabWords(ctx);
    const noUnits = !ctx.units.length, src = effSrc(ctx);
    let h = noUnits ? `<div class="pr-group"><p class="pr-note" style="margin:0">محتوى الصف ${GRADE_AR[ctx.grade]} قيد الإعداد بعد، لذلك المتاح الآن هو طباعة «كلماتي المميّزة». يمكنك أيضاً تبديل الصف إلى الحادي عشر من الأعلى.</p></div>` : group('مصدر الكلمات', seg('src', [['units', 'من وحدات الكتاب'], ['starred', `كلماتي المميّزة (${starred})`]], src));
    if (src === 'units') h += group('الوحدات', `<div class="pr-chips" role="group">${chipBtn('units', '__all', 'كل الوحدات', P.units.length === 0, 'toggle')}${ctx.units.map(u => chipBtn('units', u.id, unitLabel(u), P.units.includes(u.id), 'toggle')).join('')}</div>`, cnt(words.length, 'word'));
    else h += `<p class="pr-note">${starred ? `ستُطبع ${cnt(starred, 'word')} أضفتها إلى «كلماتي» (بالنجمة)، مرتبة حسب الوحدة.` : 'لم تضف كلمات إلى «كلماتي» بعد: اضغط النجمة بجانب أي كلمة في قائمة المفردات لتجمعها هنا ثم اطبعها.'}</p>`;
    h += group('التنسيق', chips('layout', [['list', 'جدول المفردات'], ['fold', 'ورقة اختبار قابلة للطي'], ['az', 'ترتيب أبجدي']], P.layout, 'set'));
    if (P.layout === 'fold') {
      h += group('الظاهر في الورقة', seg('vis', [['en', 'الكلمة الإنجليزية'], ['ar', 'المعنى العربي']], P.vis));
      h += group('مكان الإجابات', seg('foldKey', [['inline', 'عمود قابل للطي'], ['page', 'صفحة مستقلة']], P.foldKey));
      h += group('الترتيب', sw('shuf', 'ترتيب عشوائي للكلمات', P.shuf, 'مناسب للاختبار حتى لا يحفظ الطالب التسلسل'));
    } else h += group('محتوى الجدول', sw('ex', 'جملة مثال لكل كلمة', P.ex) + sw('def', 'التعريف بالإنجليزية', P.def));
    return h + detailsShared(ctx.shared);
  }

  KINDS.vocab = {
    ar: 'قائمة المفردات', icon: I.notebook, random: false, needsUnits: false,
    desc: 'جدول مفردات، أو ورقة اختبار قابلة للطي، أو ترتيب أبجدي.',
    sub: 'اختر الوحدات وشكل القائمة. يمكنك أيضاً طباعة كلماتك المميّزة بالنجمة فقط.',
    emptyMsg: 'لا توجد كلمات لطباعتها — اختر وحدة، أو أضف كلمات إلى «كلماتي» أولاً.',
    defaults: { src: 'units', units: [], layout: 'list', vis: 'en', foldKey: 'inline', shuf: false, ex: true, def: false },
    fix(ctx) { const P = ctx.P, ids = ctx.units.map(u => u.id); firstVisitUnit(ctx); P.units = (P.units || []).filter(id => ids.includes(id)); if (!['units', 'starred'].includes(P.src)) P.src = 'units'; },
    changed(ctx, key) { if (key === 'units') { if (ctx.P.units.includes('__all')) ctx.P.units = []; ctx.P.units = ctx.P.units.filter(id => id !== '__all'); } },
    fromOpts(P, o) { if (o.unit) P.units = [o.unit]; },
    options: vocabOptions, build: vocabBuild, keyPref: () => true,
    actions: () => [
      { id: 'csv', ar: 'تنزيل CSV', short: 'CSV', icon: SVG.file },
      { id: 'txt', ar: 'تنزيل القائمة كملف نصي (<bdi class="en">.txt</bdi>)', short: 'ملف نصي', icon: SVG.down }
    ]
  };

  /* =====================================================================
     CARDS — 8 flashcards per A4 page, front/back pages aligned for double-sided printing
     ===================================================================== */
  CSS.push(`
/* flashcards */
.pp-cg{direction:ltr;display:grid;grid-template-columns:repeat(2,91mm);grid-template-rows:repeat(4,63mm);width:182mm;border-top:.3mm dashed #444;border-left:.3mm dashed #444}
.pp-cd{position:relative;border-right:.3mm dashed #444;border-bottom:.3mm dashed #444;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6mm 7mm 5mm;overflow:hidden}
.pp-cd.e{border-right-color:transparent;border-bottom-color:transparent}
.pp-cd .no{position:absolute;top:2.4mm;left:3mm;font:600 7pt/1 var(--pp-en);color:#444;letter-spacing:.05em;direction:ltr}
.pp-cd .big{font:600 24pt/1.2 var(--pp-en);direction:ltr}
.pp-cd .big.md{font-size:19pt}.pp-cd .big.sm{font-size:15pt}
.pp-cd .pos{margin-top:2.6mm;font:italic 400 9.5pt/1.2 var(--pp-en);border:.25mm solid #333;border-radius:99mm;padding:.5mm 3mm;direction:ltr}
.pp-cd .ar{font:700 19pt/1.45 var(--pp-ar);direction:rtl}
.pp-cd .ar.md{font-size:15.5pt}.pp-cd .ar.sm{font-size:12.5pt}
.pp-cd .df{margin-top:2.4mm;font:italic 400 8.6pt/1.35 var(--pp-en);color:#333;direction:ltr}
.pp-cd .ex{margin-top:2.2mm;font:400 9.6pt/1.4 var(--pp-en);direction:ltr;color:#111}
`);
  const lenCls = (s, a, b) => { const n = strip(s).length; return n <= a ? '' : n <= b ? 'md' : 'sm'; };

  function cardWords(ctx) { return vocabWords({ P: ctx.P, units: ctx.units, grade: ctx.grade }); }
  function cardFace(v, side, o) {
    const no = `<span class="no">${v.un ? 'U' + v.un + ' · ' : ''}${v.num}</span>`;
    const en = `<div class="big en ${lenCls(v.w, 14, 26)}">${esc(v.w)}</div>${v.pos ? `<div class="pos">${esc(v.pos)}</div>` : ''}`;
    const ar = `<div class="ar ${lenCls(v.ar, 16, 34)}">${md(v.ar)}</div>`;
    const extra = (o.def && v.def ? `<div class="df">${esc(v.def)}</div>` : '') + (o.ex && v.ex ? `<div class="ex">“${esc(v.ex)}”</div>` : '');
    if (side === 'front') return `<div class="pp-cd">${no}${o.rev ? ar : en}</div>`;
    return `<div class="pp-cd">${no}${o.rev ? en : ar}${extra}</div>`;
  }
  function cardsBuild(ctx) {
    const P = ctx.P;
    let words = cardWords(ctx);
    if (!words.length) return null;
    if (P.shuf) withSeed(ctx.seed, () => { words = U.shuffle(words); });
    words = words.map((v, i) => Object.assign({}, v, { num: i + 1 }));
    const per = 8, pagesN = Math.ceil(words.length / per), pages = [];
    const empty = '<div class="pp-cd e"></div>';
    const sc = vocabScope(ctx, words);
    const edge = P.flip === 'short' ? 'القصيرة' : 'الطويلة';
    for (let p = 0; p < pagesN; p++) {
      const set = words.slice(p * per, p * per + per);
      const cell = i => set[i] ? cardFace(set[i], 'front', P) : empty;
      const backCell = i => set[i] ? cardFace(set[i], 'back', P) : empty;
      // front: row-major. back: mirrored so each back sits behind its own front.
      const front = [0, 1, 2, 3, 4, 5, 6, 7].map(cell).join('');
      const order = [];
      if (P.flip === 'short') { for (let r = 3; r >= 0; r--) order.push(r * 2, r * 2 + 1); }
      else { for (let r = 0; r < 4; r++) order.push(r * 2 + 1, r * 2); }
      const back = order.map(backCell).join('');
      pages.push({ html: `<div class="pp-cg">${front}</div>`, note: `الوجه الأمامي (${p + 1} من ${pagesN}) — اطبع على الوجهين ثم قصّ على الخطوط المتقطعة` });
      pages.push({ html: `<div class="pp-cg">${back}</div>`, note: `الوجه الخلفي (${p + 1} من ${pagesN}) — القلب من الحافة ${edge}` });
    }
    const txt = `تفوّق — بطاقات المفردات — ${sc.en}\r\n${'='.repeat(50)}\r\n` + words.map(v => `${v.num}. ${v.w}${v.pos ? ' (' + v.pos + ')' : ''} | ${v.ar}${P.ex && v.ex ? ' | ' + v.ex : ''}`).join('\r\n');
    return {
      kind: 'cards', title: 'بطاقات للقص', runEn: 'Flashcards', code: P.shuf ? codeOf(ctx.seed) : '', flows: [{ role: 'main', run: false, pages }], txt,
      fileId: sc.id, fileBits: [sc.ar], statLine: `${cnt(words.length, 'card')} · ${pagesN} ${pagesN === 1 ? 'ورقة' : pagesN === 2 ? 'ورقتان' : pagesN <= 10 ? 'أوراق' : 'ورقة'} على الوجهين`
    };
  }
  function cardsOptions(ctx) {
    const P = ctx.P, starred = TAF.words.list().length, words = cardWords(ctx);
    const noUnits = !ctx.units.length, src = effSrc(ctx);
    let h = noUnits ? `<div class="pr-group"><p class="pr-note" style="margin:0">محتوى الصف ${GRADE_AR[ctx.grade]} قيد الإعداد بعد، لذلك المتاح الآن هو طباعة «كلماتي المميّزة». يمكنك أيضاً تبديل الصف إلى الحادي عشر من الأعلى.</p></div>` : group('مصدر البطاقات', seg('src', [['units', 'من وحدات الكتاب'], ['starred', `كلماتي المميّزة (${starred})`]], src));
    if (src === 'units') h += group('الوحدات', `<div class="pr-chips" role="group">${chipBtn('units', '__all', 'كل الوحدات', P.units.length === 0, 'toggle')}${ctx.units.map(u => chipBtn('units', u.id, unitLabel(u), P.units.includes(u.id), 'toggle')).join('')}</div>`, cnt(words.length, 'word'));
    else h += `<p class="pr-note">${starred ? `ستُطبع ${cnt(starred, 'card')} من كلماتك المميّزة بالنجمة.` : 'لم تضف كلمات إلى «كلماتي» بعد: اضغط النجمة بجانب أي كلمة لتجمعها هنا.'}</p>`;
    h += group('وجه البطاقة', seg('rev', [['false', 'الإنجليزية في الأمام'], ['true', 'العربية في الأمام']], String(P.rev)));
    h += group('خلف البطاقة', sw('ex', 'جملة مثال', P.ex) + sw('def', 'التعريف بالإنجليزية', P.def) + sw('shuf', 'ترتيب عشوائي للبطاقات', P.shuf));
    h += group('الطباعة على الوجهين', seg('flip', [['long', 'قلب من الحافة الطويلة'], ['short', 'قلب من الحافة القصيرة']], P.flip));
    h += `<p class="pr-note">في نافذة الطباعة اختر الطباعة على الوجهين مع القلب من الحافة الطويلة؛ وتظهر في بعض الطابعات باسم <bdi class="en">Two-sided</bdi> و<bdi class="en">Flip on long edge</bdi>. وإن كانت طابعتك لا تدعم ذلك فاطبع الصفحات الفردية أولاً، ثم أعد الورق في الدرج واطبع الصفحات الزوجية.</p>`;
    return h;
  }
  KINDS.cards = {
    ar: 'بطاقات للقص', icon: I.cards, random: false, needsUnits: false,
    desc: 'بطاقات مفردات للقص: ثماني في الصفحة، وجهان متطابقان.',
    sub: 'بطاقات مفردات تقصّها وتراجع بها: الكلمة في الأمام، ومعناها ومثالها في الخلف.',
    emptyMsg: 'لا توجد كلمات لطباعتها — اختر وحدة، أو أضف كلمات إلى «كلماتي» أولاً.',
    defaults: { src: 'units', units: [], rev: false, ex: true, def: false, shuf: false, flip: 'long' },
    fix(ctx) { const P = ctx.P, ids = ctx.units.map(u => u.id); firstVisitUnit(ctx); P.units = (P.units || []).filter(id => ids.includes(id)); },
    changed(ctx, key) { if (key === 'units' && ctx.P.units.includes('__all')) ctx.P.units = []; },
    fromOpts(P, o) { if (o.unit) P.units = [o.unit]; },
    options: cardsOptions, build: cardsBuild,
    actions: () => [{ id: 'txt', ar: 'تنزيل القائمة كملف نصي (<bdi class="en">.txt</bdi>)', short: 'ملف نصي', icon: SVG.down }]
  };

  /* =====================================================================
     EXAM — a full mock paper modelled on the published ministerial pattern (practice paper, not an official one)
     ===================================================================== */
  CSS.push(`
/* exam */
.pp-eb{direction:rtl;display:flex;align-items:center;gap:3.2mm;border:.45mm solid #111;border-radius:2mm;padding:2.3mm 3.8mm}
.pp-eb .q{flex:none;font:700 12pt/1.3 var(--pp-en);direction:ltr}
.pp-eb .d{flex:1;font:500 9pt/1.5 var(--pp-ar)}
.pp-eb .m{flex:none;border:.35mm solid #111;border-radius:99mm;padding:.5mm 3.2mm;font:700 9pt/1.5 var(--pp-en);white-space:nowrap;direction:ltr}
.pp-cv{direction:rtl;text-align:right}
.pp-cv-top{display:flex;justify-content:space-between;align-items:center;gap:6mm}
.pp-cv-sch{font:700 12pt/1.5 var(--pp-ar)}
.pp-cv-ttl{text-align:center;margin:9mm 0 7mm;padding:6.5mm 0 6mm;border-top:.8mm solid #111;border-bottom:.8mm solid #111}
.pp-cv-ttl .a1{font:700 27pt/1.35 var(--pp-ar)}
.pp-cv-ttl .a2{font:500 14pt/1.5 var(--pp-ar);margin-top:.5mm}
.pp-cv-ttl .e1{font:600 11.5pt/1.4 var(--pp-en);letter-spacing:.3em;direction:ltr;margin-top:3.2mm;padding-left:.3em}
.pp-cv-ttl .e2{font:400 11pt/1.4 var(--pp-en);direction:ltr;color:#222}
.pp-cv-id{display:grid;grid-template-columns:1fr 1fr;gap:4.6mm 9mm;margin-bottom:7mm}
.pp-cv-id .f{display:flex;align-items:flex-end;gap:2mm;font-size:10pt;white-space:nowrap}
.pp-cv-id .f i{flex:1;border-bottom:.3mm solid #111;height:6mm}
.pp-cv-id .f b{font-weight:700}
.pp-cv-id .f u{flex:1;text-decoration:none;border-bottom:.3mm solid #111;padding:0 1.5mm .4mm;min-height:6mm}
.pp-cv h4{font:700 10.5pt/1.4 var(--pp-ar);margin:0 0 1.6mm}
.pp-tb{border:.35mm solid #111;border-radius:1.6mm;overflow:hidden;font-size:9.4pt;line-height:1.45}
.pp-tb .r{display:grid;grid-template-columns:27mm minmax(0,1fr) 17mm 17mm 24mm;border-bottom:.25mm solid #111}
.pp-tb.k4 .r{grid-template-columns:27mm minmax(0,1fr) 17mm 17mm}
.pp-tb .r>*{padding:1.5mm 2.3mm;border-left:.25mm solid #111}
.pp-tb .r>*:last-child{border-left:0}
.pp-tb .r:last-child{border-bottom:0}
.pp-tb .h{font-weight:700;border-bottom:.4mm solid #111}
.pp-tb .t{font-weight:700}
.pp-tb .c{text-align:center}
.pp-ins{margin:6.5mm 0 4.5mm;font-size:9.6pt;line-height:1.65}
.pp-ins div{display:flex;gap:2.4mm;margin-bottom:.9mm}
.pp-ins b{flex:none;width:5.5mm;height:5.5mm;border:.3mm solid #111;border-radius:50%;text-align:center;font:600 7.5pt/5mm var(--pp-en)}
.pp-task{direction:ltr;text-align:left;border:.3mm solid #111;border-radius:1.6mm;padding:2.4mm 3.6mm;margin-bottom:2.6mm;font:400 10.8pt/1.55 var(--pp-en)}
.pp-task .th{display:flex;gap:3mm;align-items:baseline;margin-bottom:.8mm}
.pp-task .th b{font-weight:700;font-size:11.5pt}
.pp-task .th span{font:400 9pt/1.4 var(--pp-en);color:#333}
.pp-task .ar{direction:rtl;text-align:right;font:400 8.8pt/1.5 var(--pp-ar);color:#222;margin-top:.6mm}
.pp-omr-t{display:flex;justify-content:space-between;align-items:center;border:.45mm solid #111;border-radius:2.2mm;padding:3mm 4.2mm}
.pp-omr-t .a{font:700 14pt/1.3 var(--pp-ar)}
.pp-omr-t .e{font:600 9.5pt/1.3 var(--pp-en);direction:ltr;color:#222;margin-top:.4mm}
.pp-omr-id{display:grid;grid-template-columns:2fr 1fr 1fr;gap:4mm;margin:5mm 0 4mm}
.pp-omr-id .f{display:flex;align-items:flex-end;gap:2mm;font-size:9.5pt;white-space:nowrap}
.pp-omr-id .f i{flex:1;border-bottom:.3mm solid #111;height:5.5mm}
.pp-omr-id .f u{flex:1;text-decoration:none;border-bottom:.3mm solid #111;padding:0 1.5mm .3mm;font-weight:600}
.pp-omr-how{display:flex;align-items:center;gap:6mm;font-size:8.8pt;line-height:1.6;border:.25mm dashed #444;border-radius:1.4mm;padding:2mm 3.4mm;margin-bottom:5mm}
.pp-omr-how .s{display:flex;align-items:center;gap:1.6mm;white-space:nowrap}
.pp-omr{direction:ltr;display:grid;gap:0 7mm}
.pp-omr .col{display:flex;flex-direction:column}
.pp-omr .r{display:flex;align-items:center;gap:2.4mm;height:var(--rh,9.2mm)}
.pp-omr .r.g{margin-top:3mm}
.pp-omr .r b{width:7mm;text-align:right;font:600 10pt/1 var(--pp-en);flex:none}
.pp-bub{display:inline-block;width:5.6mm;height:5.6mm;border:.35mm solid #111;border-radius:50%;font:400 6.4pt/5mm var(--pp-en);text-align:center;color:#444;flex:none;font-style:normal}
.pp-bub.n{visibility:hidden}
.pp-bub.f{background:#111;color:#111}
.pp-bub.x{background:linear-gradient(45deg,transparent 46%,#111 46%,#111 54%,transparent 54%),linear-gradient(-45deg,transparent 46%,#111 46%,#111 54%,transparent 54%)}
.pp-qg{direction:ltr;display:grid;gap:1.4mm 3mm;font:400 10pt/1.4 var(--pp-en);border:.3mm solid #111;border-radius:1.6mm;padding:2.4mm 3.2mm}
.pp-qg span{white-space:nowrap}
.pp-qg i{font-style:normal;color:#444;margin-right:1.6mm;font-size:9pt}
.pp-qg b{font-weight:700}
.pp-rub{direction:rtl;border:.35mm solid #111;border-radius:1.6mm;overflow:hidden;font-size:9.4pt;line-height:1.45}
.pp-rub .r{display:grid;grid-template-columns:minmax(0,1fr) 22mm;border-bottom:.25mm solid #111}
.pp-rub .r>*{padding:1.5mm 2.6mm}
.pp-rub .r>*:first-child{border-left:.25mm solid #111}
.pp-rub .r:last-child{border-bottom:0}
.pp-rub .h{font-weight:700;border-bottom:.4mm solid #111}
.pp-model{direction:ltr;text-align:left;font:400 10pt/1.55 var(--pp-en);border-left:.6mm solid #111;padding-left:3mm}
.pp-model p+p{margin-top:1.6mm}
`);

  const EX_RUBRIC = [['المحتوى وتحقيق المطلوب', 'Content and task achievement', 4], ['التنظيم والترابط بين الفقرات', 'Organisation and coherence', 2], ['القواعد والمفردات', 'Grammar and vocabulary', 3], ['الترقيم والتهجئة', 'Punctuation and spelling', 1]];
  const EX_NOTE = 'نموذج تدريبي على نمط الامتحان الوزاري المنشور — وليس ورقة امتحان رسمية.';
  const exPattern = ctx => { const p = ctx.P.pattern; return ctx.grade === 12 ? (p === 'g11' ? 'g11' : 'adv') : 'g11'; };
  function exScope(units, scope) { if (scope === '1' || scope === '2') { const f = units.filter(u => u.sem === +scope); return f.length ? f : units; } return units; }
  function exPools(units) {
    const vocab = [], grammar = [], func = [], allV = units.flatMap(x => x.vocab || []);
    units.forEach(u => {
      (u.test || []).forEach(q => {
        if (q.t !== 'mcq') return;
        if (q.k === 'vocab') vocab.push(q); else if (q.k === 'speaking' || q.k === 'writing') func.push(q); else if (q.k !== 'reading') grammar.push(q);
      });
      (u.grammar || []).forEach(g => (g.qs || []).forEach(q => { if (q.t === 'mcq') grammar.push(q); }));
      if (TAF.vocabGapQ) (u.vocab || []).forEach(v => { const q = TAF.vocabGapQ(v, allV); if (q) vocab.push(q); });
    });
    return { vocab: U.shuffle(vocab), grammar: U.shuffle(grammar), func: U.shuffle(func) };
  }
  function exTake(arr, n, used) { const out = []; for (const q of arr) { if (out.length >= n) break; if (used.has(q.id)) continue; used.add(q.id); out.push(q); } return out; }
  function exFill(out, n, sources, used) { for (const src of sources) { if (out.length >= n) break; out.push.apply(out, exTake(src, n - out.length, used)); } return out; }
  const wrapIt = q => ({ q });

  function exBuildG11(units) {
    const P = exPools(units), used = new Set();
    const voc = exFill(exTake(P.vocab, 13, used), 13, [P.grammar], used);
    const gr = exFill(exTake(P.grammar, 7, used), 7, [P.vocab], used);
    const st = exFill(exTake(P.func, 8, used), 8, [P.grammar, P.vocab], used);
    const parts = [
      { L: 'A', en: 'Vocabulary', ar: 'المفردات', items: U.shuffle(voc).map(wrapIt) },
      { L: 'B', en: 'Grammar', ar: 'القواعد', items: U.shuffle(gr).map(wrapIt) },
      { L: 'C', en: 'Structures and functions', ar: 'التراكيب والوظائف اللغوية', items: U.shuffle(st).map(wrapIt) }
    ].filter(p => p.items.length);
    const ru = U.shuffle(units.filter(u => u.reading && u.reading.qs && u.reading.qs.length))[0] || null;
    let q2 = [];
    if (ru) {
      const rq = ru.reading.qs, each = Math.floor(20 / rq.length * 2) / 2;
      let rest = 20 - each * rq.length;
      q2 = rq.map((q, i) => ({ q, marks: each + (i === rq.length - 1 ? rest : 0) }));
    }
    const wu = U.shuffle(units.filter(u => u.writing)).slice(0, 2);
    return { parts, ru, q2, wu };
  }
  function exBuildAdv(units) {
    const used = new Set(), read = [];
    U.shuffle(units.filter(u => u.reading && u.reading.qs)).forEach(u => {
      if (read.length >= 12) return;
      u.reading.qs.forEach(q => {
        if (read.length >= 12) return;
        if (q.t === 'mcq') read.push({ q, u });
        else if (q.t === 'tf') read.push({ q: Object.assign({}, q, { t: 'mcq', o: ['True', 'False'], a: q.a ? 0 : 1 }), u });
      });
    });
    read.forEach(r => used.add(r.q.id));
    const P = exPools(units), rest = [];
    rest.push.apply(rest, exTake(P.vocab, 14, used)); rest.push.apply(rest, exTake(P.grammar, 16, used)); rest.push.apply(rest, exTake(P.func, 8, used));
    exFill(rest, 50 - read.length, [P.grammar, P.vocab, P.func], used);
    return { read, lang: U.shuffle(rest).map(wrapIt) };
  }

  const examBanner = (en, ar, m) => ({ keep: true, gap: 3, h: `<div class="pp-eb"><span class="q">${esc(en)}</span><span class="d">${ar}</span>${m ? `<span class="m">${esc(m)}</span>` : ''}</div>` });
  const exField = (label, val, after) => `<span class="f"><b>${label}</b>${val ? `<u>${val}</u>` : '<i></i>'}${after ? `<span class="en">${after}</span>` : ''}</span>`;

  function omrBlock(N, counts, title, nm) {
    const per = N <= 30 ? 10 : 13, cols = Math.ceil(N / per);
    let col = '';
    for (let c = 0; c < cols; c++) {
      let rows = '';
      for (let i = c * per; i < Math.min(N, (c + 1) * per); i++) {
        const k = counts[i] || 4;
        rows += `<div class="r${(i - c * per) % 5 === 0 && i > c * per ? ' g' : ''}"><b>${i + 1}</b>${[0, 1, 2, 3].map(j => `<i class="pp-bub${j >= k ? ' n' : ''}">${'ABCD'[j]}</i>`).join('')}</div>`;
      }
      col += `<div class="col">${rows}</div>`;
    }
    return `<div class="pp-omr-t"><div><div class="a">${title.ar}</div><div class="e">${title.en}</div></div><div class="pp-mark"><b>تفوّق</b><i>TAFAWUQ</i></div></div>
      <div class="pp-omr-id"><span class="f"><b>الاسم:</b>${nm ? `<u><bdi dir="auto">${esc(nm)}</bdi></u>` : '<i></i>'}</span><span class="f"><b>الشعبة:</b><i></i></span><span class="f"><b>التاريخ:</b><i></i></span></div>
      <div class="pp-omr-how"><span>ظلّل الدائرة المناسبة تظليلاً كاملاً بقلم حبر أسود أو رصاص غامق، ولا تُظلّل أكثر من دائرة للسؤال الواحد.</span><span class="s">صحيح <i class="pp-bub f"></i></span><span class="s">خطأ <i class="pp-bub x"></i></span></div>
      <div class="pp-omr" style="grid-template-columns:repeat(${cols},1fr);--rh:${N <= 30 ? 11.4 : 9.4}mm">${col}</div>`;
  }
  const qGrid = (items, start) => {
    const n = items.length, cols = n <= 30 ? 7 : 10;
    return `<div class="pp-qg" style="grid-template-columns:repeat(${cols},1fr)">${items.map((it, i) => `<span><i>${start + i}</i><b>${LET[it.q.a]}</b></span>`).join('')}</div>`;
  };
  const tbRow = (cells, cls) => `<div class="r${cls ? ' ' + cls : ''}">${cells.map((c, i) => `<span class="${i > 1 ? 'c' : ''}">${c}</span>`).join('')}</div>`;

  function examBuild(ctx) {
    const P = ctx.P, sh = ctx.shared, grade = ctx.grade, pattern = exPattern(ctx);
    const units = exScope(ctx.units, P.scope);
    const data = withSeed(ctx.seed, () => pattern === 'adv' ? exBuildAdv(units) : exBuildG11(units));
    const code = codeOf(ctx.seed), gAr = GRADE_AR[grade] || grade;
    const blocks = [], keyBlocks = [];
    let txt = '', ktxt = '', n = 0;
    const title = pattern === 'adv' ? 'امتحان تجريبي — الإنجليزي المتقدم' : 'امتحان تجريبي — اللغة الإنجليزية';
    const sub = pattern === 'adv' ? `Advanced English · Grade ${grade} · Practice Paper` : `English Language · Grade ${grade} · Practice Paper`;
    const rows = []; let total = 0, totalQ = 0;

    // ----- questions
    const itemsOut = [];            // for the OMR + key: {it, n}
    const pushMcq = (it, num, o) => { blocks.push({ gap: 3.3, h: qHTML(it, num, o) }); txt += qText(it, num) + '\r\n\r\n'; itemsOut.push({ it, n: num }); };
    if (pattern === 'g11') {
      const q1n = data.parts.reduce((a, p) => a + p.items.length, 0), m1 = q1n * 2.5;
      blocks.push(examBanner('Question One', `اختر الإجابة الصحيحة (a / b / c / d) ${P.omr ? 'وظلّل رمزها في ورقة الإجابة' : 'ثم ضع دائرة حول رمزها'}.`, `${q1n} × 2.5 = ${m1} marks`));
      txt += `QUESTION ONE — Multiple choice (${q1n} × 2.5 = ${m1} marks)\r\n\r\n`;
      data.parts.forEach(p => {
        const a = n + 1; n += p.items.length;
        blocks.push(secBlock(p.L, p.en, `${p.ar} (${a}–${n})`));
        p.items.forEach((it, i) => pushMcq(it, a + i));
      });
      rows.push(['السؤال الأول', `اختيار من متعدد: ${data.parts.map(p => `${p.ar} (${p.items.length})`).join(' · ')}`, q1n, m1]);
      total += m1; totalQ += q1n;
      if (P.omr) blocks.push({ br: 'before', noRun: true, gap: 0, h: omrBlock(q1n, itemsOut.map(x => x.it.q.o.length), { ar: 'ورقة الإجابة — السؤال الأول', en: 'ANSWER SHEET · Question One (Multiple Choice)' }, myName(sh)) });
      // Q2
      if (data.ru) {
        const ru = data.ru, m2 = data.q2.reduce((a, x) => a + x.marks, 0);
        blocks.push(Object.assign(examBanner('Question Two', 'اقرأ النص بعناية ثم أجب عن الأسئلة التي تليه.', `${m2} marks`), { br: 'before' }));
        txt += `QUESTION TWO — Reading (${m2} marks)\r\n\r\n` + passageText(ru) + '\r\n\r\n';
        blocks.push.apply(blocks, passageBlocks(ru)); blocks.push({ gap: 1, h: '<div style="height:1mm"></div>' });
        data.q2.forEach((x, i) => { blocks.push({ gap: 4, h: qHTML({ q: x.q }, i + 1, { marks: x.marks, lines: x.marks >= 4 ? 5 : 3 }) }); txt += qText({ q: x.q }, i + 1) + `  [${x.marks} marks]\r\n\r\n`; });
        rows.push(['السؤال الثاني', 'القراءة: نص وأسئلة كتابية (فهم، استنتاج، مفردات)', data.q2.length, m2]);
        total += m2; totalQ += data.q2.length;
      }
      // Q3
      if (data.wu.length) {
        const m3 = 10;
        blocks.push(Object.assign(examBanner('Question Three', data.wu.length > 1 ? 'الكتابة الحرة — اختر موضوعاً واحداً فقط من الموضوعين، وخطّط قبل أن تكتب.' : 'الكتابة الحرة — خطّط قبل أن تكتب.', `${m3} marks`), { br: 'before' }));
        txt += `QUESTION THREE — Free writing (${m3} marks)\r\n\r\n`;
        data.wu.forEach((u, i) => {
          const w = u.writing, L = 'AB'[i];
          blocks.push({ gap: 2.6, h: `<div class="pp-task"><div class="th"><b>${data.wu.length > 1 ? 'Task ' + L : 'Task'}</b><span>${esc(w.type)} · ${(w.words || [150, 200]).join('–')} words</span></div>${mdn(w.task)}${w.taskAr ? `<div class="ar">${md(w.taskAr)}</div>` : ''}</div>` });
          txt += `Task ${L} (${w.type}, ${(w.words || []).join('-')} words): ${strip(w.task)}\r\n\r\n`;
        });
        blocks.push({ keep: true, gap: 1.2, h: `<div class="pp-ks" style="margin-top:0"><span>Your answer</span><span class="ar">اكتب إجابتك هنا — واذكر رمز الموضوع الذي اخترته</span></div>` });
        blocks.push({ fill: { line: 8.2, top: 1.2, min: 8, max: 26, render: lines } });
        rows.push(['السؤال الثالث', 'الكتابة الحرة: اختر موضوعاً من موضوعين', 1, m3]);
        total += m3; totalQ += 1;
      }
    } else {
      // advanced pattern: reading items (grouped by passage) then language items
      const R = data.read.length, L = data.lang.length;
      let groups = [];
      data.read.forEach(r => { const g = groups[groups.length - 1]; if (g && g.u === r.u) g.items.push(r); else groups.push({ u: r.u, items: [r] }); });
      if (R) {
        blocks.push(examBanner('Section A', `أسئلة النصوص القرائية (1–${R}) — اقرأ كل نص ثم اختر الإجابة الصحيحة.`, `${R} × 2 = ${R * 2} marks`));
        txt += `SECTION A — Reading (${R} questions)\r\n\r\n`;
        groups.forEach((g, gi) => {
          blocks.push.apply(blocks, passageBlocks(g.u)); blocks.push({ gap: 1, h: '<div style="height:1mm"></div>' });
          txt += passageText(g.u) + '\r\n\r\n';
          g.items.forEach(r => { n++; pushMcq({ q: r.q }, n); });
        });
        rows.push(['القسم الأول', 'أسئلة النصوص القرائية (اختيار من متعدد)', R, R * 2]);
      }
      if (L) {
        blocks.push(examBanner('Section B', `المفردات والقواعد والتراكيب والوظائف اللغوية (${n + 1}–${n + L}).`, `${L} × 2 = ${L * 2} marks`));
        txt += `SECTION B — Language (${L} questions)\r\n\r\n`;
        data.lang.forEach(it => { n++; pushMcq(it, n); });
        rows.push(['القسم الثاني', 'المفردات والقواعد والتراكيب والوظائف اللغوية', L, L * 2]);
      }
      total = (R + L) * 2; totalQ = R + L;
      if (P.omr && n) blocks.push({ br: 'before', noRun: true, gap: 0, h: omrBlock(n, itemsOut.map(x => x.it.q.o.length), { ar: 'ورقة الإجابة — الأسئلة الاختيارية', en: 'ANSWER SHEET · Multiple Choice' }, myName(sh)) });
    }
    if (!totalQ) return null;

    // ----- cover page
    const cover = `<div class="pp-cv">
      <div class="pp-cv-top"><div class="pp-mark"><b>تفوّق</b><i>TAFAWUQ</i></div><div class="pp-cv-sch">${sh.school ? esc(sh.school) : ''}${sh.teacher ? `<div style="font-weight:400;font-size:9.5pt">${esc(sh.teacher)}</div>` : ''}</div></div>
      <div class="pp-cv-ttl"><div class="a1">امتحان تجريبي</div><div class="a2">اللغة الإنجليزية${pattern === 'adv' ? ' (المتقدم)' : ''} — الصف ${gAr}</div><div class="e1">${pattern === 'adv' ? 'ADVANCED ENGLISH' : 'ENGLISH LANGUAGE'}</div><div class="e2">Practice Examination · Grade ${grade}</div></div>
      <div class="pp-cv-id">${exField('اسم الطالب:', myName(sh) ? `<bdi dir="auto">${esc(myName(sh))}</bdi>` : '')}${exField('الشعبة:')}${exField('التاريخ:', `<bdi class="en">${todayStr()}</bdi>`)}${exField('رقم الجلوس:')}${exField('الزمن:', 'ساعتان <bdi class="en">(2 hours)</bdi>')}${exField('العلامة:', '', `/ ${total}`)}</div>
      <h4>توزيع العلامات</h4>
      <div class="pp-tb">${tbRow(['القسم', 'المطلوب', 'الأسئلة', 'العلامة', 'علامة الطالب'], 'h')}${rows.map(r => tbRow([`<b>${r[0]}</b>`, r[1], r[2], r[3], ''])).join('')}${tbRow(['<b>المجموع</b>', '', totalQ, `<b>${total}</b>`, ''], 't')}</div>
      <div class="pp-ins"><h4 style="margin-top:0">تعليمات</h4>
        <div><b>1</b><span>اقرأ جميع الأسئلة بتمعّن قبل البدء، وابدأ بما تعرفه جيداً.</span></div>
        <div><b>2</b><span>${P.omr ? 'أجب عن الأسئلة الاختيارية في ورقة الإجابة (OMR) بتظليل الدائرة تظليلاً كاملاً.' : 'اختر إجابة واحدة لكل سؤال اختياري وضع دائرة حول رمزها.'}</span></div>
        <div><b>3</b><span>${pattern === 'adv' ? 'أجب عن جميع الأسئلة، وراجع إجاباتك قبل التسليم.' : 'اكتب إجابات السؤالين الثاني والثالث في المساحات المخصصة لها على الورقة نفسها.'}</span></div>
        <div><b>4</b><span>للتدرّب في ظروف قريبة من الامتحان الحقيقي: لا قاموس ولا هاتف، ولا حديث أو نقل أثناء الحل.</span></div>
        <div><b>5</b><span>${pattern === 'adv' ? 'وقت مقترح: 70 دقيقة لأسئلة اللغة، و40 دقيقة لأسئلة النصوص، و10 دقائق للمراجعة.' : 'وقت مقترح: 45 دقيقة للسؤال الأول، و35 للثاني، و30 للثالث، و10 دقائق للمراجعة.'}</span></div></div>
      <div class="pp-note">${EX_NOTE} أُعدّ من بنك أسئلة تطبيق «تفوّق» ويصلح للتدرّب على نمط الامتحان وتوزيع الوقت.</div></div>`;
    blocks.unshift({ br: 'after', gap: 0, h: cover });

    // ----- answer key
    keyBlocks.push(keyHeader(title, `Answer Key and Marking Scheme · ${sub}`));
    keyBlocks.push({ gap: 3, h: `<div class="pp-tb k4">${tbRow(['القسم', 'المطلوب', 'الأسئلة', 'العلامة'], 'h')}${rows.map(r => tbRow([`<b>${r[0]}</b>`, r[1], r[2], r[3]])).join('')}${tbRow(['<b>المجموع</b>', '', totalQ, `<b>${total}</b>`], 't')}</div>` });
    ktxt += '\r\n' + '='.repeat(60) + '\r\nANSWER KEY / MARKING SCHEME — مفتاح الإجابات ومعايير التصحيح (للمعلم)\r\n' + '='.repeat(60) + '\r\n';
    if (itemsOut.length) {
      keyBlocks.push({ keep: true, gap: 1.6, h: `<div class="pp-ks"><span>Multiple choice — quick key</span><span class="ar">${pattern === 'g11' ? 'السؤال الأول — الإجابات' : 'الإجابات الاختيارية'}</span></div>` });
      keyBlocks.push({ gap: 3, h: qGrid(itemsOut.map(x => x.it), 1) });
      ktxt += itemsOut.map(x => `${x.n}. ${LET[x.it.q.a]}`).join('   ') + '\r\n';
      if (P.expl) {
        keyBlocks.push({ keep: true, gap: 1.6, h: `<div class="pp-ks"><span>Explanations</span><span class="ar">شرح الإجابات</span></div>` });
        itemsOut.forEach(x => { const e = keyEntry(x.it, x.n, { expl: true }); keyBlocks.push({ gap: 1.8, h: e.h }); ktxt += e.t + '\r\n'; });
      }
    }
    if (pattern === 'g11' && data.ru) {
      keyBlocks.push({ keep: true, gap: 1.6, h: `<div class="pp-ks"><span>Question Two — Reading</span><span class="ar">السؤال الثاني — القراءة</span></div>` });
      data.q2.forEach((x, i) => { const e = keyEntry({ q: x.q }, i + 1, { expl: P.expl, marks: x.marks }); keyBlocks.push({ gap: 2, h: e.h }); ktxt += e.t + `  [${x.marks}]\r\n`; });
    }
    if (pattern === 'g11' && data.wu.length) {
      keyBlocks.push({ keep: true, gap: 1.6, h: `<div class="pp-ks"><span>Question Three — Writing (10 marks)</span><span class="ar">السؤال الثالث — معايير التصحيح</span></div>` });
      keyBlocks.push({ gap: 3, h: `<div class="pp-rub"><div class="r h"><span>المعيار</span><span>العلامة</span></div>${EX_RUBRIC.map(r => `<div class="r"><span>${r[0]} <bdi class="en" style="color:#444;font-size:8.5pt">· ${r[1]}</bdi></span><span style="text-align:center">${r[2]}</span></div>`).join('')}<div class="r"><span><b>المجموع</b></span><span style="text-align:center"><b>10</b></span></div></div>` });
      ktxt += '\r\nQuestion Three — rubric: ' + EX_RUBRIC.map(r => `${r[1]} ${r[2]}`).join(' | ') + '\r\n';
      data.wu.forEach((u, i) => {
        const w = u.writing, L = 'AB'[i];
        keyBlocks.push({ gap: 3, h: `<div class="pp-ks" style="margin-top:0"><span>Model answer — Task ${L} (${esc(w.type)})</span><span class="ar">نموذج إجابة للموضوع ${L === 'A' ? 'الأول' : 'الثاني'}</span></div><div class="pp-model">${(w.model || []).map(p => `<p>${mdn(p)}</p>`).join('')}</div>` });
        ktxt += `\r\nModel — Task ${L}:\r\n` + (w.model || []).map(strip).join('\r\n\r\n') + '\r\n';
      });
    }

    const flows = [{ role: 'main', run: true, blocks }, { role: 'key', run: true, squeeze: true, blocks: keyBlocks, runEn: 'Practice Exam — Answer Key' }];
    const head = `تفوّق — ${title}\r\n${sub}\r\nName: ____________________  Class: ______  Date: __________   Time: 2 hours   Total: ${total}\r\n${EX_NOTE}\r\n` + '='.repeat(60) + '\r\n\r\n';
    return {
      kind: 'exam', title: 'امتحان تجريبي', runEn: `Practice Exam · Grade ${grade}`, code, flows, hasKey: true,
      footNote: EX_NOTE, txt: head + txt + (P.key ? ktxt : ''), fileId: 'g' + grade + '-' + pattern, fileBits: [gradeLabel(grade)],
      statLine: `${cnt(totalQ, 'question')} · ${total} علامة`
    };
  }

  function examOptions(ctx) {
    const P = ctx.P, pat = exPattern(ctx), sems = [...new Set(ctx.units.map(u => u.sem))].sort();
    let h = '';
    if (ctx.grade === 12) h += group('نمط الورقة', seg('pattern', [['adv', 'الإنجليزي المتقدم — 50 سؤالاً'], ['g11', 'الورقة الشاملة (28 + قراءة + كتابة)']], pat));
    else h += `<div class="pr-group"><p class="pr-note" style="margin:0"><b>نمط الورقة:</b> الورقة الشاملة للصف الحادي عشر — 28 سؤال اختيار من متعدد (70 علامة) + قراءة وأسئلة كتابية (20) + كتابة حرة (10)، في ساعتين.</p></div>`;
    if (sems.length > 1) h += group('نطاق الوحدات', chips('scope', [['all', 'كل الوحدات']].concat(sems.map(s => [String(s), s === 1 ? 'الفصل الأول' : 'الفصل الثاني'])), P.scope, 'set'));
    h += group('محتويات الملف', sw('omr', 'ورقة إجابة (OMR) للأسئلة الاختيارية', P.omr, 'صفحة بدوائر للتظليل على نمط ورقة الامتحان') + sw('key', 'نموذج الإجابة ومعايير التصحيح في الصفحات الأخيرة', P.key, 'صفحات مستقلة للمعلم — ألغِه قبل توزيع الامتحان') + sw('expl', 'شرح الإجابات في المفتاح', P.expl));
    return h + detailsShared(ctx.shared);
  }

  KINDS.exam = {
    ar: 'نموذج امتحان', icon: I.exam, random: true, needsUnits: true,
    desc: 'نموذج امتحان كامل بنمط الورقة الوزارية، مع مفتاح تصحيح.',
    sub: 'نموذج تدريبي على نمط الورقة الوزارية المنشورة (وليس ورقة رسمية): غلاف وتعليمات، أسئلة، ورقة إجابة، ثم مفتاح التصحيح.',
    defaults: { pattern: 'auto', scope: 'all', omr: true, key: true, expl: true },
    fix(ctx) { const P = ctx.P; if (!['all', '1', '2'].includes(P.scope)) P.scope = 'all'; if (!['auto', 'g11', 'adv'].includes(P.pattern)) P.pattern = 'auto'; },
    options: examOptions, build: examBuild, keyPref: ctx => ctx.P.key,
    actions: () => [
      { id: 'keyonly', ar: 'طباعة المفتاح فقط (للمعلم)', short: 'المفتاح فقط', icon: SVG.key },
      { id: 'txt', ar: 'تنزيل الامتحان كملف نصي (<bdi class="en">.txt</bdi>)', short: 'ملف نصي', icon: SVG.down }
    ]
  };

  /* =====================================================================
     REPORT — one-page progress report for student / parent / teacher
     ===================================================================== */
  CSS.push(`
/* report */
.pp-ri{display:grid;grid-template-columns:2.3fr 1.55fr 1.5fr 1.2fr;gap:3mm 6mm;margin:3mm 0 0;padding-top:2.4mm;border-top:.25mm solid #111}
.pp-ri .f{display:flex;align-items:flex-end;gap:1.6mm;font-size:9.2pt;white-space:nowrap;min-width:0}
.pp-ri .f i{flex:1;border-bottom:.3mm solid #111;height:5mm;min-width:6mm}
.pp-ri .f u{flex:1;text-decoration:none;border-bottom:.3mm solid #111;padding:0 1mm;min-width:0;font-weight:600}
.pp-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}
.pp-kpi>div{border:.35mm solid #111;border-radius:1.8mm;padding:2mm 1.6mm 1.8mm;text-align:center}
.pp-kpi b{display:block;font:600 18pt/1.1 var(--pp-en);direction:ltr}
.pp-kpi b small{font-size:9.5pt;font-weight:400;color:#333}
.pp-kpi span{display:block;font:500 8.2pt/1.35 var(--pp-ar);margin-top:.6mm;color:#111}
.pp-kpi em{display:block;font:400 7.3pt/1.3 var(--pp-ar);color:#444;font-style:normal}
.pp-rs{font:700 10pt/1.3 var(--pp-ar);border-bottom:.3mm solid #111;padding-bottom:.8mm;margin-bottom:1.4mm;display:flex;justify-content:space-between;align-items:baseline;gap:4mm}
.pp-rs small{font:400 7.6pt/1.3 var(--pp-ar);color:#444}
.pp-lg{display:inline-flex;align-items:center;gap:3.2mm;font:400 7.6pt/1.3 var(--pp-ar);color:#222}
.pp-lg span{display:inline-flex;align-items:center;gap:1.1mm;white-space:nowrap}
.pp-br{height:3.1mm;border:.3mm solid #111;border-radius:.9mm;overflow:hidden;background:#fff}
.pp-br i{display:block;height:100%;background:#111}
.pp-br i.low{background:repeating-linear-gradient(135deg,#111 0 .5mm,#fff .5mm 1.2mm)}
.pp-br i.mid{background:#8a8a8a}
.pp-sw2{display:inline-block;width:4.2mm;height:2.4mm;border:.25mm solid #111;flex:none}
.pp-sw2.low{background:repeating-linear-gradient(135deg,#111 0 .4mm,#fff .4mm 1mm)}
.pp-sw2.mid{background:#8a8a8a}.pp-sw2.good{background:#111}
.pp-cols{display:grid;grid-template-columns:1fr 1fr;gap:0 7mm}
.pp-tr{display:grid;grid-template-columns:minmax(0,1fr) 30mm 9.5mm;gap:2.4mm;align-items:center;padding:.75mm 0;font-size:8.6pt;line-height:1.3;border-bottom:.2mm dotted #777}
.pp-tr .nm{min-width:0;line-height:1.28}
.pp-tr .un{display:inline-block;width:4.1mm;height:4.1mm;border:.25mm solid #111;border-radius:50%;font:600 6.4pt/3.7mm var(--pp-en);text-align:center;margin-left:1.4mm;vertical-align:.1mm}
.pp-rsub{font:600 8.2pt/1.3 var(--pp-ar);color:#222;margin:2.2mm 0 .6mm}
.pp-tr .pc{text-align:left;font:600 8.4pt/1 var(--pp-en);direction:ltr}
.pp-et{display:grid;grid-template-columns:19mm minmax(0,1fr) 12mm;gap:2.6mm;padding:.8mm 0;font-size:8.6pt;border-bottom:.2mm dotted #777;align-items:baseline;line-height:1.3}
.pp-et .nm{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pp-et .pc{text-align:left;font:600 8.8pt/1 var(--pp-en);direction:ltr}
.pp-wk{display:flex;gap:2.6mm;padding:1mm 0;font-size:8.8pt;line-height:1.55;border-bottom:.2mm dotted #777}
.pp-wk b{flex:none;width:5.4mm;height:5.4mm;border:.3mm solid #111;border-radius:50%;text-align:center;font:700 7.8pt/4.9mm var(--pp-en);margin-top:.4mm}
.pp-sig{display:grid;grid-template-columns:repeat(3,1fr);gap:12mm;margin-top:6mm;text-align:center;font-size:8.6pt}
.pp-sig div{border-top:.3mm solid #111;padding-top:1mm}
.tt .pp-tr{padding:.35mm 0;font-size:8.2pt}.tt .pp-et{padding:.4mm 0;font-size:8.2pt}.tt .pp-wk{padding:.5mm 0;font-size:8.4pt;line-height:1.45}
.tt .pp-kpi b{font-size:15pt}.tt .pp-lns i{height:7mm}.tt .pp-sig{margin-top:3.5mm}
`);
  const barCls = p => p < 60 ? 'low' : p < 80 ? 'mid' : 'good';
  const streakNow = s => (s.streak.last === U.today() || (s.streak.last && U.dayDiff(s.streak.last, U.today()) === 1)) ? s.streak.count : 0;

  // unit completion in %: the app's own TAF.unitProgress when present, otherwise count the "done" flags
  function unitPct(u) {
    if (TAF.unitProgress) { try { return TAF.unitProgress(u); } catch (e) { /* fall through */ } }
    const s = S(), keys = ['vocab'].concat((u.grammar || []).map(g => 'gr:' + g.id), u.reading ? ['reading'] : [], u.writing ? ['writing'] : [], u.speaking ? ['speaking'] : []);
    const done = keys.filter(k => s.done[u.id + ':' + k]).length + ((s.tests[u.id] || 0) >= 60 ? 1 : 0);
    return done / (keys.length + 1) * 100;
  }
  function reportData(ctx) {
    const s = S(), g = ctx.grade, units = ctx.units;
    const vocab = TAF.allVocab(g), learned = vocab.filter(v => s.srs[v.id] && s.srs[v.id].reps > 0).length;
    let r = 0, w = 0;
    Object.keys(s.q).forEach(id => { const m = /^g(1[12])u/.exec(id); if (m && +m[1] === g) { r += s.q[id].r; w += s.q[id].w; } });
    const topics = [];
    units.forEach(u => (u.grammar || []).forEach(gr => { const t = s.topics[gr.id] || { r: 0, w: 0 }, n = t.r + t.w; topics.push({ g: gr, u, n, acc: n ? t.r / n : null }); }));
    const skill = (prefix, ar) => { let rr = 0, ww = 0; units.forEach(u => { const t = s.topics[prefix + ':' + u.id]; if (t) { rr += t.r; ww += t.w; } }); return { ar, n: rr + ww, acc: rr + ww ? rr / (rr + ww) : null }; };
    const skills = [skill('vocab', 'المفردات'), skill('reading', 'القراءة'), skill('speaking', 'التعبيرات الشفوية')];
    const prog = units.map(u => ({ u, p: Math.max(0, Math.min(100, Math.round(unitPct(u) || 0))) }));
    const exams = (s.exams || []).filter(x => x.kind === 'unit' ? (TAF.byId[x.unit] && TAF.byId[x.unit].grade === g) : (x.grade === g || x.grade == null)).slice(0, 6);
    let inf = null; try { inf = TAF.game && TAF.game.info ? TAF.game.info(s.xp || 0) : null; } catch (e) { inf = null; }
    return { s, learned, totalV: vocab.length, answers: r + w, acc: r + w ? r / (r + w) : null, topics, skills, prog, exams, inf, streak: streakNow(s) };
  }
  function adviceFor(t) {
    const p = Math.round(t.acc * 100), nm = `«${md(t.g.ar)}»`;
    if (p < 50) return `${nm}: دقتك ${p}%. ابدأ بقراءة الشرح خطوة بخطوة، ثم حلّ خمسة أسئلة من تمارينه كل يوم حتى تتجاوز 70%.`;
    if (p < 70) return `${nm}: دقتك ${p}%. راجع ملخص القاعدة، ثم أعد حلّ الأسئلة التي أخطأت فيها من «دفتر الأخطاء».`;
    return `${nm}: دقتك ${p}%، وأنت قريب من الإتقان. حلّ اختباراً قصيراً في القاعدة مرة أخرى لتثبّت ما تعلّمته.`;
  }
  const examName = x => x.kind === 'unit' && TAF.byId[x.unit] ? 'اختبار الوحدة ' + TAF.byId[x.unit].n : esc(x.title || 'امتحان تجريبي');

  function reportBlocks(ctx, D, tight) {
    const P = ctx.P, sh = ctx.shared, g = ctx.grade, s = D.s;
    const W = h => tight ? `<div class="tt">${h}</div>` : h;
    const name = (P.name || s.settings.name || '').trim();
    const info = (label, val) => `<span class="f"><b>${label}</b>${val ? `<u>${val}</u>` : '<i></i>'}</span>`;
    const side = [sh.school ? `<b>${esc(sh.school)}</b>` : '', sh.teacher ? esc(sh.teacher) : ''].filter(Boolean).join('<br>');
    const blocks = [], gp = tight ? 3 : 4;
    blocks.push({ gap: gp, h: `<div class="pp-hd"><div class="pp-hd-top"><div class="pp-mark"><b>تفوّق</b><i>TAFAWUQ</i></div><div class="pp-ttl"><div class="pp-t1">تقرير التقدّم الدراسي</div><div class="pp-t2">Progress Report · English · Grade ${g}</div></div>${side ? `<div class="pp-side">${side}</div>` : ''}</div>
      <div class="pp-ri">${info('الطالب:', name ? `<bdi dir="auto">${esc(name)}</bdi>` : '')}${info('الصف:', GRADE_AR[g])}${info('التاريخ:', `<bdi class="en">${todayStr()}</bdi>`)}${info('الشعبة:', '')}</div></div>` });
    const wpct = D.totalV ? Math.round(D.learned / D.totalV * 100) : 0;
    blocks.push({ gap: gp, h: W(`<div class="pp-kpi">
      <div><b>${(s.xp || 0).toLocaleString('en')}</b><span>نقطة خبرة (XP)</span><em>${D.inf ? `المستوى ${D.inf.level} — ${esc(D.inf.ar)}` : '&nbsp;'}</em></div>
      <div><b>${D.streak}</b><span>أيام متتالية من الدراسة</span><em>السلسلة الحالية</em></div>
      <div><b>${D.learned}<small> / ${D.totalV}</small></b><span>كلمات في المراجعة</span><em>${wpct}% من مفردات الصف</em></div>
      <div><b>${D.acc == null ? '—' : Math.round(D.acc * 100) + '%'}</b><span>دقة الإجابات</span><em>${cnt(D.answers, 'answer')}</em></div></div>`) });
    const half = Math.ceil(D.prog.length / 2);
    const prow = x => `<div class="pp-tr"><span class="nm"><b class="un" style="font-weight:600">${x.u.n}</b><b>الوحدة ${x.u.n}</b> <span style="color:#444">· ${esc(strip(x.u.ar || ''))}</span></span><div class="pp-br"><i class="${barCls(x.p)}" style="width:${x.p}%"></i></div><span class="pc">${x.p}%</span></div>`;
    blocks.push({ gap: gp, h: W(`<div class="pp-rs"><span>إتمام الوحدات</span><small>${D.prog.filter(x => x.p >= 100).length} من ${D.prog.length} وحدات مكتملة</small></div><div class="pp-cols"><div>${D.prog.slice(0, half).map(prow).join('')}</div><div>${D.prog.slice(half).map(prow).join('')}</div></div>`) });
    const legend = `<span class="pp-lg"><span><i class="pp-sw2 low"></i>أقل من 60%</span><span><i class="pp-sw2 mid"></i>60–79%</span><span><i class="pp-sw2 good"></i>80% فأكثر</span></span>`;
    const trow = (nm, acc) => { const p = acc == null ? 0 : Math.round(acc * 100); return `<div class="pp-tr"><span class="nm">${nm}</span><div class="pp-br">${acc == null ? '' : `<i class="${barCls(p)}" style="width:${p}%"></i>`}</div><span class="pc">${acc == null ? '—' : p + '%'}</span></div>`; };
    const cap = tight ? 12 : 16;
    let list = D.topics.slice(), cut = '';
    if (list.length > cap) { list = list.filter(t => t.n > 0).sort((a, b) => a.acc - b.acc).slice(0, cap); cut = ` — أضعف ${list.length} من ${D.topics.length}`; if (!list.length) list = D.topics.slice(0, cap); }
    const lh = Math.ceil(list.length / 2);
    const rowsH = arr => arr.map(t => trow(`<b class="un">${t.u.n}</b>${md(t.g.ar)}`, t.acc)).join('');
    blocks.push({ gap: gp, h: W(`<div class="pp-rs"><span>الدقة في القواعد${cut} <small>(الرقم في الدائرة هو رقم الوحدة)</small></span>${legend}</div>
      <div class="pp-cols"><div>${rowsH(list.slice(0, lh))}</div><div>${rowsH(list.slice(lh))}</div></div>
      <div class="pp-rsub">المهارات</div><div class="pp-cols"><div>${D.skills.slice(0, 2).map(k => trow(k.ar, k.acc)).join('')}</div><div>${D.skills.slice(2).map(k => trow(k.ar, k.acc)).join('')}</div></div>`) });
    if (P.hist) {
      const ex = D.exams.slice(0, tight ? 4 : 6), eh = Math.ceil(ex.length / 2);
      const erow = x => `<div class="pp-et"><span class="en">${fmtDate(x.t)}</span><span class="nm">${examName(x)}</span><span class="pc">${x.pct}%</span></div>`;
      blocks.push({ gap: gp, h: W(`<div class="pp-rs"><span>الاختبارات والامتحانات التجريبية</span><small>${ex.length ? 'آخر ' + ex.length + ' نتائج' : ''}</small></div>${ex.length ? `<div class="pp-cols"><div>${ex.slice(0, eh).map(erow).join('')}</div><div>${ex.slice(eh).map(erow).join('')}</div></div>` : '<p style="font-size:8.8pt;color:#333;margin:0">لم يُنجز الطالب اختباراً أو امتحاناً تجريبياً بعد.</p>'}`) });
    }
    let weak = [];
    if (P.advice) {
      weak = D.topics.filter(t => t.n >= 3 && t.acc < 0.85).sort((a, b) => a.acc - b.acc).slice(0, 3);
      blocks.push({ gap: gp, h: W(`<div class="pp-rs"><span>أضعف المواضيع وكيف تتحسّن</span></div>${weak.length ? weak.map((t, i) => `<div class="pp-wk"><b>${i + 1}</b><span>${adviceFor(t)}</span></div>`).join('') : `<div class="pp-wk"><span>${D.topics.some(t => t.n >= 3) ? 'أداؤك قوي في المواضيع التي تدرّبت عليها (85% فأكثر). واصل المراجعة اليومية وجرّب نموذج امتحان كاملاً.' : 'لا تتوفر بيانات كافية بعد؛ حلّ ثلاثة أسئلة على الأقل في كل قاعدة ليظهر لك تحليل نقاط الضعف.'}</span></div>`}`) });
    }
    blocks.push({ gap: tight ? 2 : 3, h: W(`<div class="pp-rs"><span>ملاحظات المعلم</span></div>${lines(2)}`) });
    blocks.push({ gap: 0, h: W(`<div class="pp-sig"><div>توقيع الطالب</div><div>توقيع ولي الأمر</div><div>توقيع المعلم</div></div>`) });
    return { blocks, weak, name };
  }
  function reportBuild(ctx) {
    const g = ctx.grade, D = reportData(ctx), s = D.s;
    let R = reportBlocks(ctx, D, false);
    const fits = bl => measureHTML(bl.map(blkHTML)).reduce((a, b) => a + b, 0) <= (GEO.first - GEO.slack) * PX;
    if (!fits(R.blocks)) R = reportBlocks(ctx, D, true);          // squeeze everything onto one page
    const weak = R.weak, name = R.name;
    const txt = [`تفوّق — تقرير التقدّم الدراسي — ${gradeLabel(g)}`, `التاريخ: ${todayStr()}`, name ? `الطالب: ${name}` : '', '',
      `النقاط: ${s.xp || 0}${D.inf ? ` — المستوى ${D.inf.level} (${D.inf.ar})` : ''}`, `أيام متتالية: ${D.streak}`, `كلمات في المراجعة: ${D.learned} / ${D.totalV}`, `دقة الإجابات: ${D.acc == null ? '—' : Math.round(D.acc * 100) + '%'} (${D.answers} إجابة)`, '', 'إتمام الوحدات:']
      .concat(D.prog.map(x => `  الوحدة ${x.u.n}: ${x.p}%`)).concat(['', 'الدقة في القواعد:']).concat(D.topics.map(t => `  ${t.g.ar}: ${t.acc == null ? '—' : Math.round(t.acc * 100) + '%'}`)).concat(weak.length ? ['', 'أضعف المواضيع:'].concat(weak.map(t => '  ' + plain(adviceFor(t)))) : []).join('\r\n');
    return { kind: 'report', title: 'تقرير التقدّم', runEn: 'Progress Report', code: '', flows: [{ role: 'main', run: true, blocks: R.blocks }], txt, fileId: 'g' + g, fileBits: [name || gradeLabel(g)], statLine: '' };
  }
  function reportOptions(ctx) {
    const P = ctx.P, s = S();
    let h = group('اسم الطالب', tx('name', 'الاسم على التقرير', P.name, s.settings.name ? 'الافتراضي: ' + s.settings.name : 'اتركه فارغاً لتكتبه بخط اليد'));
    h += group('محتويات التقرير', sw('hist', 'سجل الاختبارات والامتحانات التجريبية', P.hist) + sw('advice', 'أضعف المواضيع ونصائح للتحسّن', P.advice));
    h += `<p class="pr-note">يُحسب التقرير من تقدّمك المحفوظ على هذا الجهاز للصف ${GRADE_AR[ctx.grade]}، ويُطبع بالأبيض والأسود بوضوح: تبقى أنماط التظليل مفهومة حتى لو طُبع بدون ألوان.</p>`;
    return h + detailsShared(ctx.shared);
  }
  KINDS.report = {
    ar: 'تقرير التقدم', icon: I.chart, random: false, needsUnits: true,
    desc: 'صفحة واحدة تلخّص تقدّم الطالب لولي الأمر والمعلم.',
    sub: 'تقرير من صفحة واحدة: النقاط، والكلمات، ودقة كل قاعدة، وإتمام الوحدات، ونتائج الامتحانات، مع نصائح مخصّصة.',
    defaults: { name: '', hist: true, advice: true },
    options: reportOptions, build: reportBuild,
    actions: () => [{ id: 'txt', ar: 'تنزيل التقرير كملف نصي (<bdi class="en">.txt</bdi>)', short: 'ملف نصي', icon: SVG.down }]
  };

  /* =====================================================================
     CERTIFICATE — landscape A4, CSS-only border, greyscale friendly
     ===================================================================== */
  CSS.push(`
/* certificate */
.pp-cert{position:absolute;left:0;top:0;width:297mm;height:209.4mm;direction:rtl;text-align:center;color:#111;background:#fff}
.pp-cert .f1{position:absolute;inset:8mm;border:1.5mm solid #111}
.pp-cert .f2{position:absolute;inset:11.6mm;border:.35mm solid #111}
.pp-cert .f3{position:absolute;inset:13.6mm;border:.2mm dashed #555}
.pp-cert .cn{position:absolute;width:8mm;height:8mm;background:#fff;border:.5mm solid #111;transform:rotate(45deg)}
.pp-cert .cn::after{content:"";position:absolute;inset:1.4mm;background:#111}
.pp-cert .cn.tl{left:4.6mm;top:4.6mm}.pp-cert .cn.tr{right:4.6mm;top:4.6mm}.pp-cert .cn.bl{left:4.6mm;bottom:4.6mm}.pp-cert .cn.br{right:4.6mm;bottom:4.6mm}
.pp-cert .in{position:absolute;left:26mm;right:26mm;top:19mm;bottom:19mm;display:flex;flex-direction:column;align-items:center;justify-content:space-between}
.pp-cert .g1,.pp-cert .g2{display:flex;flex-direction:column;align-items:center;width:100%}
.pp-cert .t1{font:700 38pt/1.25 var(--pp-ar);margin-top:3.4mm}
.pp-cert .t2{font:600 11.5pt/1.3 var(--pp-en);letter-spacing:.42em;direction:ltr;padding-left:.42em;color:#222}
.pp-cert .orn{display:flex;align-items:center;gap:3mm;width:120mm;margin:3.4mm 0 3mm}
.pp-cert .orn span{flex:1;border-top:.3mm solid #111}
.pp-cert .orn i{width:3.2mm;height:3.2mm;background:#111;transform:rotate(45deg)}
.pp-cert .p1{font:400 13.5pt/1.6 var(--pp-ar);color:#111}
.pp-cert .nm{min-width:150mm;max-width:215mm;border-bottom:.45mm solid #111;margin:1.6mm 0 2.4mm;padding:0 6mm 1mm;font:700 29pt/1.35 var(--pp-ar)}
.pp-cert .nm.md{font-size:24pt}.pp-cert .nm.sm{font-size:19pt}
.pp-cert .nm.blank{height:15mm}
.pp-cert .ach{font:600 21pt/1.3 var(--pp-en);direction:ltr;margin-top:1.6mm}
.pp-cert .ach.md{font-size:17pt}.pp-cert .ach.sm{font-size:14pt}
.pp-cert .ach2{font:500 12.5pt/1.5 var(--pp-ar);color:#222;margin-top:.4mm}
.pp-cert .sc{margin-top:2.2mm;display:inline-block;border:.4mm solid #111;border-radius:99mm;padding:.8mm 5mm;font:600 12pt/1.5 var(--pp-ar)}
.pp-cert .sc bdi{font-family:var(--pp-en);font-weight:600}
.pp-cert .en-line{margin-top:2.6mm;font:italic 400 10pt/1.5 var(--pp-en);color:#333;direction:ltr;max-width:200mm}
.pp-cert .ft{width:100%;display:flex;justify-content:space-between;align-items:flex-end}
.pp-cert .ft .c{width:62mm;text-align:center;font:500 10pt/1.5 var(--pp-ar)}
.pp-cert .ft .c .v{display:block;min-height:7mm;font:600 11pt/1.5 var(--pp-en);direction:ltr;padding-bottom:.4mm}
.pp-cert .ft .c .l{display:block;border-top:.35mm solid #111;padding-top:1mm}
.pp-seal{width:27mm;height:27mm;border:.6mm solid #111;border-radius:50%;position:relative;display:grid;place-items:center;flex:none}
.pp-seal::before{content:"";position:absolute;inset:1.4mm;border:.25mm solid #111;border-radius:50%}
.pp-seal i{width:10mm;height:10mm;background:#111;clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);margin-bottom:3mm}
.pp-seal span{position:absolute;bottom:3.6mm;left:0;right:0;font:700 6.8pt/1 var(--pp-ar);text-align:center}
`);
  const ORD_AR = ['', 'الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة', 'السابعة', 'الثامنة', 'التاسعة', 'العاشرة', 'الحادية عشرة', 'الثانية عشرة'];
  function certAchOptions(ctx) {
    const s = S();
    const done = u => unitPct(u) >= 100;
    const opts = ctx.units.map(u => ['u:' + u.id, `الوحدة ${u.n} — \u2066${strip(u.title)}\u2069${done(u) ? ' (مكتملة)' : ''}`]);
    opts.push(['curr', `إنهاء منهاج الصف ${GRADE_AR[ctx.grade]} كاملاً`], ['custom', 'نص آخر أكتبه بنفسي']);
    let auto = 'curr';
    if (ctx.units.length) {
      const completed = ctx.units.filter(done);
      auto = completed.length === ctx.units.length ? 'curr' : completed.length ? 'u:' + completed[completed.length - 1].id : 'u:' + ctx.units[0].id;
    }
    return { opts, auto };
  }
  function certBuild(ctx) {
    const P = ctx.P, sh = ctx.shared, s = S(), g = ctx.grade;
    const { opts, auto } = certAchOptions(ctx);
    let ach = P.ach === 'auto' || !opts.some(o => o[0] === P.ach) ? auto : P.ach;
    const fem = P.sex === 'f';
    const name = (P.name || s.settings.name || '').trim();
    const u = ach.startsWith('u:') ? TAF.byId[ach.slice(2)] : null;
    let enT = '', arT = '', lead = '', score = null;
    if (u) {
      enT = `Unit ${u.n} · ${strip(u.title)}`; arT = `الوحدة ${u.n}${ORD_AR[u.n] ? ' (' + ORD_AR[u.n] + ')' : ''}: ${strip(u.ar || '')} — ${gradeLabel(u.grade)}`;
      lead = `تقديراً لإتمام${fem ? 'ها' : 'ه'} الوحدة التالية بنجاح:`;
      const t = s.tests && s.tests[u.id]; if (t != null) score = Math.round(t);
    } else if (ach === 'curr') {
      enT = `English Curriculum · Grade ${g}`; arT = `منهاج اللغة الإنجليزية — ${gradeLabel(g)}`;
      lead = `تقديراً لإنهاء${fem ? 'ها' : 'ه'} المنهاج التالي بنجاح:`;
      const ts = ctx.units.map(x => s.tests && s.tests[x.id]).filter(x => x != null);
      if (ts.length) score = Math.round(ts.reduce((a, b) => a + b, 0) / ts.length);
    } else {
      enT = strip(P.custom || 'Outstanding achievement'); arT = '';
      lead = `تقديراً لتميّز${fem ? 'ها' : 'ه'} في:`;
    }
    let scoreTxt = '';
    const typed = String(P.score || '').trim();
    if (typed) scoreTxt = /^\d+(\.\d+)?$/.test(typed) ? typed + '%' : typed; else if (score != null && P.showScore) scoreTxt = score + '%';
    const d = P.date && /^\d{4}-\d{2}-\d{2}$/.test(P.date) ? P.date.split('-').reverse().join(' / ') : todayStr();
    const nmCls = name.length > 34 ? 'sm' : name.length > 22 ? 'md' : '';
    const enCls = enT.length > 56 ? 'sm' : enT.length > 36 ? 'md' : '';
    const html = `<div class="pp-cert"><div class="f1"></div><div class="f2"></div><div class="f3"></div><i class="cn tl"></i><i class="cn tr"></i><i class="cn bl"></i><i class="cn br"></i>
      <div class="in"><div class="g1">
        <div class="pp-mark"><b>تفوّق</b><i>TAFAWUQ</i></div>
        <div class="t1">شهادة إنجاز</div><div class="t2">CERTIFICATE OF ACHIEVEMENT</div>
        <div class="orn"><span></span><i></i><span></span></div></div><div class="g2">
        <div class="p1">${sh.school ? esc(sh.school) + ' — ' : ''}تُمنح هذه الشهادة ${fem ? 'للطالبة' : 'للطالب'}</div>
        ${name ? `<div class="nm ${nmCls}"><bdi dir="auto">${esc(name)}</bdi></div>` : '<div class="nm blank"></div>'}
        <div class="p1">${lead}</div>
        <div class="ach ${enCls}">${esc(enT)}</div>
        ${arT ? `<div class="ach2">${esc(arT)}</div>` : ''}
        ${scoreTxt ? `<div class="sc">بنتيجة <bdi>${esc(scoreTxt)}</bdi></div>` : ''}
        <div class="en-line">Awarded in recognition of dedication, effort and successful achievement${u ? ' in ' + esc('Unit ' + u.n) : ''}.</div></div>
        <div class="ft"><div class="c"><span class="v">${d}</span><span class="l">التاريخ</span></div><div class="pp-seal"><i></i><span>تفوّق</span></div><div class="c"><span class="v">${sh.teacher ? esc(sh.teacher) : '&nbsp;'}</span><span class="l">توقيع المعلم</span></div></div>
      </div></div>`;
    const txt = `تفوّق — شهادة إنجاز\r\n${name || '__________'}\r\n${enT}\r\n${arT}\r\n${scoreTxt ? 'النتيجة: ' + scoreTxt + '\r\n' : ''}${d}`;
    return { kind: 'certificate', title: 'شهادة إنجاز', runEn: 'Certificate', landscape: true, code: '', flows: [{ role: 'main', run: false, raw: true, pages: [html] }], txt, fileId: u ? u.id : 'g' + g, fileBits: [name || ''], statLine: 'A4 أفقية' };
  }
  function certOptions(ctx) {
    const P = ctx.P, s = S(), { opts, auto } = certAchOptions(ctx);
    const cur = P.ach === 'auto' || !opts.some(o => o[0] === P.ach) ? auto : P.ach;
    let h = group('اسم الطالب', tx('name', 'الاسم على الشهادة', P.name, s.settings.name ? 'الافتراضي: ' + s.settings.name : 'اتركه فارغاً لتكتبه بخط اليد'));
    h += group('الشهادة', seg('sex', [['m', 'لطالب'], ['f', 'لطالبة']], P.sex));
    h += group('سبب التقدير', sel('ach', 'الإنجاز', opts, cur) + (cur === 'custom' ? tx('custom', 'نص الإنجاز (بالإنجليزية أو العربية)', P.custom, 'مثال: Excellence in Grammar', { max: 90 }) : ''));
    h += group('النتيجة والتاريخ', `<div class="pr-grid">${tx('score', 'النتيجة (اختياري)', P.score, 'مثال: 90 — أو اتركها تلقائية')}${tx('date', 'التاريخ', P.date, '', { type: 'date', dir: 'ltr' })}</div>` + sw('showScore', 'إظهار أفضل نتيجة اختبار وحدة تلقائياً', P.showScore));
    return h + detailsShared(ctx.shared);
  }
  KINDS.certificate = {
    ar: 'شهادة إنجاز', icon: I.star, random: false, needsUnits: false,
    desc: 'شهادة إنجاز أنيقة تُطبع بالأبيض والأسود.',
    sub: 'شهادة ثنائية اللغة لإتمام وحدة أو المنهاج كاملاً، تصلح للطباعة بالأبيض والأسود وللإهداء.',
    defaults: { name: '', sex: 'm', ach: 'auto', custom: '', score: '', date: '', showScore: true },
    options: certOptions, build: certBuild,
    actions: () => []
  };

  /*__KINDS__*/

  /* =====================================================================
     tool view (options + live preview + sticky actions)
     ===================================================================== */

  function hubView(el) {
    ensureStyle();
    const tools = ORDER.filter(k => KINDS[k]);
    let h = `<div class="page-head"><h1>مركز الطباعة</h1><p class="sub">اطبع مواد دراسية مرتبة ونظيفة، أو احفظها بصيغة PDF — للطالب وللمعلم.</p></div>`;
    h += `<div class="ruled pr-hub">`;
    tools.forEach(k => { const K = KINDS[k]; h += `<a href="#/print/${k}"><span class="num">${K.icon}</span><span class="grow"><span class="t">${K.ar}</span><span class="d">${K.desc}</span></span><span class="chev">${I.chevron}</span></a>`; });
    h += `</div><div class="sem-label">مواد جاهزة في التطبيق</div><div class="ruled pr-hub">`;
    h += `<a href="#/cheatsheet"><span class="num">${I.sheet}</span><span class="grow"><span class="t">ملخص القواعد</span><span class="d">قواعد كل وحدة في صفحة واحدة للمراجعة السريعة، وفيه زر للطباعة.</span></span><span class="chev">${I.chevron}</span></a>`;
    h += `<a href="#/units"><span class="num">${I.book}</span><span class="grow"><span class="t">ملخصات الوحدات</span><span class="d">افتح أي وحدة ثم اختر «ملخص الوحدة للطباعة».</span></span><span class="chev">${I.chevron}</span></a>`;
    h += `</div>`;
    h += `<div class="note tip" style="margin-top:1.2rem">${I.bulb}<div><b>نصيحة للمعلّم:</b> قبل توزيع ورقة العمل أو الامتحان على الطلاب ألغِ خيار «مفتاح الإجابة»، ثم اطبع نسختك وحدها بزر «طباعة مفتاح الإجابة فقط». ولإرسال الورقة إلكترونياً اختر «حفظ بتنسيق PDF» من نافذة الطباعة. وكل ورقة تحمل رمزاً يميّزها، فاضغط «ورقة جديدة» لإعداد نسخة ثانية بأسئلة مختلفة للصف نفسه.</div></div>`;
    el.innerHTML = h;
  }

  function applyOpt(P, key, mode, val, input) {
    if (mode === 'toggle') { const a = Array.isArray(P[key]) ? P[key].slice() : []; const i = a.indexOf(val); if (i >= 0) a.splice(i, 1); else a.push(val); P[key] = a; return; }
    if (mode === 'bool') { P[key] = !!input.checked; return; }
    if (mode === 'text') { P[key] = String(input.value || ''); return; }
    if (typeof P[key] === 'number') P[key] = +val; else if (typeof P[key] === 'boolean') P[key] = val === 'true'; else P[key] = val;
  }

  function toolView(el, kind, K, query) {
    ensureStyle();
    const grade = S().settings.grade;
    const units = TAF.unitsFor(grade);
    const head = crumbsHTML([['الطباعة', '#/print'], [K.ar]]) + `<div class="page-head"><h1>${K.ar}</h1><p class="sub">${K.sub || K.desc}</p></div>`;
    if (K.needsUnits && !units.length) {
      el.innerHTML = head + `<div class="empty">${I.book}<p>محتوى الصف ${GRADE_AR[grade] || grade} قيد الإعداد، فلا تتوفر أسئلة للطباعة بعد.</p><p class="small muted">بدّل الصف من الأعلى إلى الصف الحادي عشر لتجد المحتوى الجاهز.</p><button type="button" class="btn" data-g11>عرض أدوات الصف الحادي عشر</button> <a class="btn ghost" href="#/print">مركز الطباعة</a></div>`;
      const b = el.querySelector('[data-g11]');
      if (b) b.onclick = () => { S().settings.grade = 11; store.save(); if (TAF.app) { TAF.app.syncGrade && TAF.app.syncGrade(); TAF.app.render(true); } };
      return;
    }
    const shared = sharedPrefs();
    const P = kindPrefs(kind, K.defaults);
    const ctx = { kind, grade, units, P, shared, seed: seedOf(query && query.get('seed')) || newSeed(), cache: {} };
    if (K.fix) K.fix(ctx);
    const state = { token: 0, doc: null, pages: [], zoom: 'fit', moreOpen: false };

    el.innerHTML = `${head}
      <div class="sheet pr-opts" data-opts></div>
      <div class="pr-prevhead"><div><b>معاينة الورقة</b><span class="pr-stats" data-stats role="status"></span></div><div class="row" style="gap:.35rem">${K.random ? `<button type="button" class="btn ghost sm" data-act="regen">${I.shuffle} ورقة جديدة</button>` : ''}<button type="button" class="btn ghost sm pr-zoombtn" data-act="zoom" aria-pressed="false">${SVG.zoom} <span data-zl>تكبير</span></button></div></div>
      <div class="pr-desk" data-desk></div>
      <div class="pr-bar" data-bar></div>`;
    const optsEl = el.querySelector('[data-opts]'), desk = el.querySelector('[data-desk]'), bar = el.querySelector('[data-bar]'), statsEl = el.querySelector('[data-stats]');

    function renderBar() {
      const doc = state.doc; const acts = K.actions ? K.actions(ctx, doc) : [];
      bar.innerHTML = `<button type="button" class="btn pr-primary" data-act="print"${doc ? '' : ' disabled'}>${I.print} طباعة / حفظ PDF</button>` + (acts.length ? `
        <div class="pr-acts${state.moreOpen ? ' open' : ''}" data-acts>${acts.map(a => `<button type="button" class="btn ghost sm" data-act="${a.id}"${doc ? '' : ' disabled'}>${a.icon || ''}<span class="long">${a.ar}</span><span class="short">${a.short || a.ar}</span></button>`).join('')}</div>
        <button type="button" class="btn ghost pr-morebtn" data-act="more" aria-expanded="${state.moreOpen}" aria-label="المزيد من الخيارات">${SVG.more}</button>` : '');
    }
    function renderOptions() {
      const f = document.activeElement && optsEl.contains(document.activeElement) ? document.activeElement : null;
      const key = f && f.dataset ? [f.dataset.opt, f.dataset.val] : null;
      optsEl.innerHTML = K.options(ctx);
      if (key && key[0]) { const nf = Array.prototype.find.call(optsEl.querySelectorAll('[data-opt]'), x => x.dataset.opt === key[0] && (key[1] == null || x.dataset.val === key[1])); if (nf && !nf.disabled && (nf.tagName === 'BUTTON' || nf.tagName === 'SELECT')) nf.focus({ preventScroll: true }); }
    }
    function drawPreview() {
      if (!state.pages.length) { desk.innerHTML = `<div class="empty">${I.sheet}<p>لا توجد عناصر لعرضها بهذه الخيارات.</p></div>`; return; }
      desk.innerHTML = previewHTML(state.pages, state.doc && state.doc.landscape);
      fitDesk(desk, state.zoom);
    }
    function pagesFor(o) { return assemble(state.doc, o); }
    function updateStats() {
      const d = state.doc; if (!d) { statsEl.textContent = ''; return; }
      const bits = [cnt(state.pages.length, 'page')];
      if (d.statLine) bits.push(d.statLine);
      if (d.code) bits.push('رمز الورقة ' + d.code);
      statsEl.textContent = ' · ' + bits.join(' · ');
    }
    async function rebuild() {
      const my = ++state.token;
      desk.setAttribute('aria-busy', 'true'); desk.dataset.busy = '1';
      await fontsReady();
      if (my !== state.token || !el.isConnected) return;
      let doc = null, err = null;
      try { doc = K.build(ctx); } catch (e) { err = e; console.error(e); }
      if (err || !doc) {
        state.doc = null; state.pages = []; activeView = null; statsEl.textContent = '';
        desk.removeAttribute('aria-busy'); delete desk.dataset.busy;
        desk.innerHTML = err ? `<div class="empty">${I.alert}<p>تعذّر تجهيز الورقة بهذه الخيارات. جرّب خيارات أخرى.</p></div>` : `<div class="empty">${I.sheet}<p>${K.emptyMsg || 'لا توجد عناصر لطباعتها بهذه الخيارات — غيّر الوحدة أو نوع الأسئلة.'}</p></div>`;
        renderBar(); return;
      }
      state.doc = doc;
      try { state.pages = pagesFor({ key: K.keyPref ? K.keyPref(ctx) : true }); } catch (e) { console.error(e); state.pages = []; }
      activeView = { pages: state.pages, opts: { landscape: doc.landscape, title: fileTitle(doc) } };
      desk.removeAttribute('aria-busy'); delete desk.dataset.busy;
      drawPreview(); updateStats(); renderBar();
    }
    renderOptions(); renderBar(); rebuild();

    // ----- events
    let txtTimer = null;
    optsEl.addEventListener('click', e => {
      const b = e.target.closest('button[data-opt]'); if (!b || b.disabled) return;
      const key = b.dataset.opt, mode = b.dataset.mode;
      if (mode === 'toggle' && K.minOne && K.minOne(ctx, key, b.dataset.val)) return;
      applyOpt(P, key, mode, b.dataset.val, b);
      if (K.changed) K.changed(ctx, key);
      store.save(); renderOptions(); rebuild();
    });
    optsEl.addEventListener('change', e => {
      const i = e.target.closest('[data-opt]'); if (!i || i.tagName === 'BUTTON') return;
      const key = i.dataset.opt, mode = i.dataset.mode;
      if (mode === 'text') return;
      applyOpt(i.dataset.shared ? shared : P, key, mode, i.value, i);
      if (K.changed) K.changed(ctx, key);
      store.save(); if (mode !== 'bool') renderOptions(); rebuild();      // switches never change other controls, so keep the panel (and keyboard focus) as is
    });
    optsEl.addEventListener('input', e => {
      const i = e.target.closest('input[data-mode="text"]'); if (!i) return;
      applyOpt(i.dataset.shared ? shared : P, i.dataset.opt, 'text', i.value, i);
      if (K.changed) K.changed(ctx, i.dataset.opt);
      store.save(); clearTimeout(txtTimer); txtTimer = setTimeout(rebuild, 260);
    });
    const onAct = e => {
      const b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
      const act = b.dataset.act, doc = state.doc;
      if (act !== 'more' && state.moreOpen) { state.moreOpen = false; const pop = bar.querySelector('[data-acts]'), mb = bar.querySelector('[data-act="more"]'); if (pop) pop.classList.remove('open'); if (mb) mb.setAttribute('aria-expanded', 'false'); }
      if (act === 'more') { state.moreOpen = !state.moreOpen; const pop = bar.querySelector('[data-acts]'); if (pop) pop.classList.toggle('open', state.moreOpen); b.setAttribute('aria-expanded', state.moreOpen); return; }
      if (act === 'regen') { ctx.seed = newSeed(); ctx.cache = {}; rebuild(); U.toast('جهّزنا ورقة جديدة بأسئلة مختلفة'); return; }
      if (act === 'zoom') { state.zoom = state.zoom === 'fit' ? 'big' : 'fit'; b.setAttribute('aria-pressed', state.zoom === 'big'); const zl = b.querySelector('[data-zl]'); if (zl) zl.textContent = state.zoom === 'big' ? 'ملاءمة العرض' : 'تكبير'; desk.classList.toggle('big', state.zoom === 'big'); lastW = -1; fitDesk(desk, state.zoom); return; }
      if (!doc) return;
      if (act === 'print') return printPages(state.pages, { landscape: doc.landscape, title: fileTitle(doc) });
      if (act === 'keyonly') { const pgs = pagesFor({ keyOnly: true }); return printPages(pgs, { landscape: doc.landscape, title: fileTitle(doc, 'مفتاح الإجابة') }); }
      if (act === 'txt' && doc.txt) { dl(`tafawuq-${kind}${doc.fileId ? '-' + doc.fileId : ''}-${U.today()}.txt`, withBOM(doc.txt), 'text/plain;charset=utf-8'); return U.toast('نُزّل الملف النصي'); }
      if (act === 'csv' && doc.csv) { dl(`tafawuq-${kind}${doc.fileId ? '-' + doc.fileId : ''}-${U.today()}.csv`, doc.csv, 'text/csv;charset=utf-8'); return U.toast('نُزّل ملف CSV'); }
    };
    el.addEventListener('click', onAct);
    let ro = null, lastW = -1;
    const refit = () => { const w = desk.clientWidth; if (w === lastW) return; lastW = w; fitDesk(desk, state.zoom); };
    if (window.ResizeObserver) { ro = new ResizeObserver(() => requestAnimationFrame(refit)); ro.observe(desk); } else window.addEventListener('resize', refit);
    if (TAF.app && TAF.app.onLeave) TAF.app.onLeave(() => { if (ro) ro.disconnect(); window.removeEventListener('resize', refit); clearTimeout(txtTimer); state.token++; if (activeView && activeView.pages === state.pages) activeView = null; });
    // test / automation hook
    el._pr = { ctx, state, K, rebuild, renderOptions };
  }

  V.print = function (el, params, query) {
    const kind = params && params[0];
    ensureStyle();
    if (!kind) return hubView(el);
    const K = KINDS[kind];
    if (!K) return V.notFound ? V.notFound(el) : (el.innerHTML = '<div class="empty">الصفحة غير موجودة.</div>');
    return toolView(el, kind, K, query || new URLSearchParams());
  };

  /* =====================================================================
     public API
     ===================================================================== */
  TAF.print = {
    version: 1,
    kinds: ORDER,
    // open a tool, optionally pre-setting its options; {now:true} prints straight away
    open(kind, opts) {
      opts = opts || {};
      const K = KINDS[kind]; if (!K) { location.hash = '#/print'; return; }
      const P = kindPrefs(kind, K.defaults);
      Object.keys(opts).forEach(k => { if (k !== 'now' && k !== 'seed') P[k] = opts[k]; });
      if (K.fromOpts) K.fromOpts(P, opts);
      store.save();
      if (opts.now) {
        const grade = S().settings.grade, units = TAF.unitsFor(grade);
        const ctx = { kind, grade, units, P, shared: sharedPrefs(), seed: opts.seed || newSeed(), cache: {} };
        if (K.fix) K.fix(ctx);
        fontsReady().then(() => { const doc = K.build(ctx); printPages(assemble(doc, { key: K.keyPref ? K.keyPref(ctx) : true }), { landscape: doc.landscape, title: fileTitle(doc) }); });
        return;
      }
      location.hash = '#/print/' + kind + (opts.seed ? '?seed=' + codeOf(opts.seed) : '');
    },
    // print any HTML string with the app's paper typography (flows across pages with 14mm margins)
    printHTML(html, o) {
      o = o || {}; ensureStyle();
      const go = () => { mountRoot(`<div class="pp-flow-in" style="padding:0">${html}</div>`, { flow: true, landscape: !!o.landscape, title: o.title ? 'تفوّق - ' + o.title : '' }); try { window.print(); } catch (e) { cleanupPrint(); } };
      if (fontsOk) go(); else fontsReady().then(go);
    },
    printPages, mountRoot, cleanup: cleanupPrint, fontsReady,
    // internals exposed for automated tests
    _build(kind, over, seed) {
      const K = KINDS[kind]; const grade = S().settings.grade, units = TAF.unitsFor(grade);
      const P = Object.assign({}, kindPrefs(kind, K.defaults), over || {});
      const ctx = { kind, grade, units, P, shared: sharedPrefs(), seed: seed || 12345, cache: {} };
      if (K.fix) K.fix(ctx);
      const doc = K.build(ctx);
      if (!doc) return { doc: null, ctx, pages: [], keyPages: [] };
      return { doc, ctx, pages: assemble(doc, { key: K.keyPref ? K.keyPref(ctx) : true }), keyPages: assemble(doc, { keyOnly: true }) };
    },
    _assemble: assemble, _kinds: KINDS
  };
})();

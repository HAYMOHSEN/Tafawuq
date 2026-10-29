/* Tafawuq English — Reading Studio (القطع).
   Replaces TAF.views.reading with three ways to read a passage, plus the original comprehension-quiz sub-route:
     ?m=read    traditional page: tap-a-word meanings, translation, gist strips, highlighter pen, reading timer, print
     ?m=listen  narrated karaoke: sentence + word highlighting, shadowing ("repeat after me"), loop, listening test
     ?m=story   swipeable paragraph cards: key vocabulary, narration, main-idea micro-check, recap
   Styles live in css/reader.css (every class is prefixed rd-). Load after views.js (the router resolves V.reading lazily).
   Optional hooks used when present: TAF.game.xp/celebrate, TAF.ui.sfx, TAF.mascot, TAF.app.onLeave, TAF.words, TAF.tts. */
(function () {
  'use strict';
  const TAF = window.TAF;
  if (!TAF || !TAF.views || !TAF.util || !TAF.store) return;
  const U = TAF.util, esc = U.esc, md = U.md, store = TAF.store, V = TAF.views;
  const legacyReading = V.reading;

  /* ============================================================
     0. small helpers
     ============================================================ */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const go = h => { location.hash = h; };
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const st = () => store.s;                                   // never cache: the store may swap its state object
  const calm = () => {                                        // reduced motion (OS preference or the app's own switch)
    const m = (st().settings || {}).motion;
    return m === 'off' || (m !== 'on' && !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches));
  };
  const xp = (n, label) => { try { if (TAF.game && typeof TAF.game.xp === 'function') TAF.game.xp(n, label); } catch (e) { /* ignore */ } };
  const sfx = n => { try { if (TAF.ui && TAF.ui.sfx) TAF.ui.sfx(n); } catch (e) { /* ignore */ } };
  const party = kind => { try { if ((st().settings || {}).celebrate === false) return; if (TAF.game && TAF.game.celebrate) TAF.game.celebrate(kind); } catch (e) { /* ignore */ } };
  const onLeave = fn => { if (TAF.app && TAF.app.onLeave) TAF.app.onLeave(fn); };
  const minutesAr = n => n <= 1 ? 'دقيقة واحدة' : n === 2 ? 'دقيقتين' : n <= 10 ? n + ' دقائق' : n + ' دقيقة';
  const crumbs = items => `<nav class="crumbs" aria-label="مسار التنقل">${items.map(([t, h]) => h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`).join('<span aria-hidden="true">‹</span>')}</nav>`;
  const hasSelection = () => { try { const s = window.getSelection && getSelection(); return !!s && !s.isCollapsed && String(s).trim().length > 0; } catch (e) { return false; } };
  // award XP + mark a section done, once per key
  function awardOnce(key, n, label) {
    if (store.isDone(key)) return false;
    store.markDone(key);
    xp(n, label);
    return true;
  }

  // view preferences that survive switching modes inside one session (reset on reload)
  const UI = { mult: 1, shadow: false, loop: false, optsOpen: true };

  /* ============================================================
     1. icons (stroke style, like TAF.icon)
     ============================================================ */
  const svg = (p, fill) => `<svg viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="${fill ? 1.5 : 1.9}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${p}</svg>`;
  const TI = TAF.icon || {};
  const IC = {
    play: svg('<path d="M8 5.4v13.2a1 1 0 0 0 1.52.85l10.6-6.6a1 1 0 0 0 0-1.7L9.52 4.55A1 1 0 0 0 8 5.4z"/>', 1),
    pause: svg('<rect x="6.2" y="4.6" width="4.1" height="14.8" rx="1.3"/><rect x="13.7" y="4.6" width="4.1" height="14.8" rx="1.3"/>', 1),
    prev: svg('<rect x="4.6" y="5" width="2.6" height="14" rx="1.1"/><path d="M19 6.3v11.4a.9.9 0 0 1-1.42.74l-8.1-5.7a.9.9 0 0 1 0-1.48l8.1-5.7A.9.9 0 0 1 19 6.3z"/>', 1),
    next: svg('<rect x="16.8" y="5" width="2.6" height="14" rx="1.1"/><path d="M5 6.3v11.4a.9.9 0 0 0 1.42.74l8.1-5.7a.9.9 0 0 0 0-1.48l-8.1-5.7A.9.9 0 0 0 5 6.3z"/>', 1),
    restart: svg('<path d="M4.2 12a7.8 7.8 0 1 0 2.4-5.6"/><path d="M4 4.2v4.3h4.3"/>'),
    mic: svg('<rect x="9" y="2.8" width="6" height="11" rx="3"/><path d="M5.6 11.2a6.4 6.4 0 0 0 12.8 0M12 17.6v3.4M8.6 21h6.8"/>'),
    loop: svg('<path d="m17 2.8 3.4 3.4L17 9.6"/><path d="M3.8 11V9.4a3.2 3.2 0 0 1 3.2-3.2h13.4"/><path d="m7 21.2-3.4-3.4L7 14.4"/><path d="M20.2 13v1.6a3.2 3.2 0 0 1-3.2 3.2H3.6"/>'),
    eye: svg('<path d="M2.2 12S5.6 5.6 12 5.6 21.8 12 21.8 12 18.4 18.4 12 18.4 2.2 12 2.2 12z"/><circle cx="12" cy="12" r="3"/>'),
    eyeOff: svg('<path d="M3.5 3.5l17 17"/><path d="M10.4 5.8A9.6 9.6 0 0 1 12 5.6C18.4 5.6 21.8 12 21.8 12a16 16 0 0 1-3.1 3.9M6.5 7.6A16.4 16.4 0 0 0 2.2 12S5.6 18.4 12 18.4a9.4 9.4 0 0 0 3.9-.8"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>'),
    translate: svg('<path d="M3.5 5.5h9M8 3.5v2M5.5 5.5c.4 3.2 2.8 6 6 7.7M11.5 5.5c-.4 3.2-2.8 6-6.5 8"/><path d="m12.5 20 4-9 4 9M13.9 17h5.2"/>'),
    marker: svg('<path d="m14.8 4.2 5 5-8.4 8.4-5.2 1 .9-5.2z"/><path d="m12.6 6.4 5 5"/><path d="M3.6 21h6.8"/>'),
    timer: svg('<circle cx="12" cy="13.4" r="7.6"/><path d="M12 9.4v4.3l2.7 1.6M9.4 2.6h5.2"/>'),
    headphones: svg('<path d="M4 15.4V12a8 8 0 0 1 16 0v3.4"/><rect x="3.2" y="14" width="4.6" height="7" rx="2"/><rect x="16.2" y="14" width="4.6" height="7" rx="2"/>'),
    sparkle: svg('<path d="M12 2.8l1.9 5.3 5.3 1.9-5.3 1.9L12 17.2l-1.9-5.3L4.8 10l5.3-1.9z"/><path d="M19 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>'),
    book: TI.book || '', cards: TI.cards || '', speaker: TI.speaker || '', star: TI.star || '', x: TI.x || '', check: TI.check || '',
    bulb: TI.bulb || '', print: TI.print || '', gear: TI.gear || '', next2: TI.chevron || '', prev2: TI.back || '', alert: TI.alert || '', search: TI.search || '', target: TI.target || ''
  };

  /* ============================================================
     2. text model: paragraphs -> sentences -> words
     ============================================================ */
  const WORD_RE = /[A-Za-z\u00C0-\u024F][A-Za-z0-9\u00C0-\u024F]*(?:['\u2019\-\u2011][A-Za-z0-9\u00C0-\u024F]+)*/g;
  const ABBR = new Set(['mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'jr', 'st', 'mt', 'vs', 'inc', 'ltd', 'gen', 'col', 'capt', 'lt', 'sgt', 'rev', 'hon', 'vol', 'approx', 'dept', 'fig', 'cf', 'pp']);

  // strips **bold** / ==mark== markers but remembers which characters carried them
  function parseInline(raw) {
    raw = String(raw == null ? '' : raw).replace(/[\r\n\t]+/g, ' ');
    let text = '', b = 0, m = 0;
    const flags = [];
    for (let k = 0; k < raw.length; k++) {
      const ch = raw[k], nx = raw[k + 1];
      if (ch === '*' && nx === '*') { b = b ? 0 : 1; k++; continue; }
      if (ch === '=' && nx === '=') { m = m ? 0 : 2; k++; continue; }
      text += ch; flags.push(b | m);
    }
    return { text, flags };
  }

  // sentence boundaries: . ! ? … followed by a capital/quote; not after Mr./Dr./initials/e.g./a.m.
  function splitSentences(text) {
    const out = [];
    const push = (a, b) => { while (a < b && /\s/.test(text[a])) a++; while (b > a && /\s/.test(text[b - 1])) b--; if (b > a) out.push([a, b]); };
    const re = /(?:[.!?]+|\u2026)["'\u201D\u2019)\]]*(?=\s|$)/g;
    let start = 0, m;
    while ((m = re.exec(text))) {
      const end = m.index + m[0].length;
      const nx = /^\s*(\S)/.exec(text.slice(end));
      if (nx && /[a-z]/.test(nx[1])) continue;                              // "Why?" she asked  /  e.g. the …
      if (/^\.["'\u201D\u2019)\]]*$/.test(m[0])) {                           // a lone full stop: abbreviation or initial?
        const w = /([A-Za-z](?:[A-Za-z.]*[A-Za-z])?)$/.exec(text.slice(start, m.index));
        if (w) {
          const tok = w[1];
          if (ABBR.has(tok.toLowerCase().replace(/\./g, ''))) continue;
          if (/^[A-HJ-Z]$/.test(tok)) continue;                              // J. K. Rowling
          if (/^(?:[A-Za-z]\.)+[A-Za-z]$/.test(tok)) continue;               // U.S.  e.g.  a.m.
        }
      }
      push(start, end); start = end;
    }
    push(start, text.length);
    return out;
  }

  function buildModel(r) {
    const src = Array.isArray(r.text) ? r.text : String(r.text || '').split(/\n{2,}/);
    const paras = [], flat = [];
    src.forEach((raw, p) => {
      const { text, flags } = parseInline(raw);
      const P = { p, text, sents: [] };
      splitSentences(text).forEach(([a, b], s) => {
        const t = text.slice(a, b), words = [];
        let m; WORD_RE.lastIndex = 0;
        while ((m = WORD_RE.exec(t))) words.push({ s: m.index, e: m.index + m[0].length, t: m[0], f: flags[a + m.index] || 0 });
        const S = { p, s, id: p + '.' + s, g: flat.length, text: t, words, el: null, wordEls: [], hl: false, kw: null };
        S.tf = words.map(w => forms(normWord(w.t)));
        P.sents.push(S); flat.push(S);
      });
      paras.push(P);
    });
    return { paras, flat, plain: paras.map(P => P.text).join('\n\n') };
  }

  function sentHTML(S, o) {
    let h = '', pos = 0;
    S.words.forEach((w, k) => {
      h += esc(S.text.slice(pos, w.s));
      const isKw = !!(o && o.kw && S.kw && S.kw[k] != null);
      h += `<span class="rd-w${w.f & 1 ? ' rd-b' : ''}${w.f & 2 ? ' rd-mk' : ''}${isKw ? ' rd-kw' : ''}" data-i="${k}"${isKw ? ' role="button" tabindex="0"' : ''}>${esc(S.text.slice(w.s, w.e))}</span>`;
      pos = w.e;
    });
    return h + esc(S.text.slice(pos));
  }
  const paraInner = (P, o) => P.sents.map(S => `<span class="rd-s${o && o.hl && S.hl ? ' rd-hl' : ''}" data-g="${S.g}" data-p="${S.p}" data-s="${S.s}">${sentHTML(S, o)}</span>`).join(' ');

  // after innerHTML: connect model sentences to their DOM nodes
  function bindSentenceEls(root, flat) {
    flat.forEach(S => {
      S.el = root.querySelector('.rd-s[data-g="' + S.g + '"]');
      S.wordEls = S.el ? Array.from(S.el.querySelectorAll('.rd-w')) : [];
    });
  }

  // index of the word that contains (or comes next after) a character offset
  function wordAt(S, pos) {
    const ws = S.words;
    if (!ws.length) return -1;
    for (let k = 0; k < ws.length; k++) if (pos < ws[k].e) return k;
    return ws.length - 1;
  }

  // very long sentences are spoken in clause-sized chunks (Chrome's voices can stall on long utterances)
  function chunkSentence(text) {
    const MAXW = 26, MAXC = 170, MIN = 24;
    const n = (text.match(/\S+/g) || []).length;
    if (n <= MAXW && text.length <= MAXC) return [{ text, off: 0 }];
    const out = [];
    (function split(a, b) {
      const seg = text.slice(a, b);
      const cnt = (seg.match(/\S+/g) || []).length;
      const emit = () => { const lead = seg.length - seg.replace(/^\s+/, '').length; const t = seg.trim(); if (t) out.push({ text: t, off: a + lead }); };
      if (cnt <= MAXW && seg.length <= MAXC) return emit();
      const mid = (a + b) / 2;
      let best = -1, bd = Infinity, m;
      const pick = re => { re.lastIndex = 0; while ((m = re.exec(seg))) { const cut = a + m.index + m[0].length; if (cut - a < MIN || b - cut < MIN) continue; const d = Math.abs(cut - mid); if (d < bd) { bd = d; best = cut; } } };
      pick(/[,;:\u2013\u2014]\s+/g);
      if (best < 0) pick(/\s+/g);
      if (best < 0) return emit();
      split(a, best); split(best, b);
    })(0, text.length);
    return out;
  }

  /* ============================================================
     3. lexicon: word -> Arabic meaning (gloss phrases, unit vocab, other units of the same grade)
     ============================================================ */
  const IRREG = {
    kept: 'keep', took: 'take', taken: 'take', made: 'make', went: 'go', gone: 'go', got: 'get', gotten: 'get', came: 'come', saw: 'see', seen: 'see',
    gave: 'give', given: 'give', knew: 'know', known: 'know', thought: 'think', brought: 'bring', bought: 'buy', taught: 'teach', caught: 'catch',
    found: 'find', told: 'tell', said: 'say', paid: 'pay', met: 'meet', ran: 'run', wrote: 'write', written: 'write', spoke: 'speak', spoken: 'speak',
    broke: 'break', broken: 'break', chose: 'choose', chosen: 'choose', began: 'begin', begun: 'begin', drew: 'draw', drawn: 'draw', grew: 'grow',
    grown: 'grow', held: 'hold', led: 'lead', left: 'leave', lost: 'lose', meant: 'mean', sent: 'send', spent: 'spend', stood: 'stand',
    understood: 'understand', wore: 'wear', worn: 'wear', won: 'win', sat: 'sit', slept: 'sleep', felt: 'feel', fell: 'fall', fallen: 'fall',
    flew: 'fly', flown: 'fly', forgot: 'forget', forgotten: 'forget', hid: 'hide', hidden: 'hide', heard: 'hear', built: 'build', became: 'become',
    drove: 'drive', driven: 'drive', ate: 'eat', eaten: 'eat', rose: 'rise', risen: 'rise', shook: 'shake', shaken: 'shake', sang: 'sing', sung: 'sing',
    swam: 'swim', threw: 'throw', thrown: 'throw', woke: 'wake', woken: 'wake', did: 'do', done: 'do', had: 'have', was: 'be', were: 'be', been: 'be',
    children: 'child', people: 'person', men: 'man', women: 'woman'
  };
  const formsCache = new Map();
  // candidate base forms of a word: itself first, then -s/-es/-ed/-ing/-d/-ly/-ies/-ied stripped variants (and irregular verbs)
  function forms(w) {
    w = String(w).toLowerCase().replace(/[\u2018\u2019]/g, "'");
    let f = formsCache.get(w);
    if (f) return f;
    f = [w];
    const add = x => { if (x.length >= 3 && f.indexOf(x) < 0) f.push(x); };
    if (IRREG[w]) add(IRREG[w]);
    const L = w.length;
    if (L > 3) {
      if (/ies$/.test(w)) add(w.slice(0, -3) + 'y');
      if (/ied$/.test(w)) add(w.slice(0, -3) + 'y');
      if (/(?:ch|sh|ss|x|z|o)es$/.test(w)) add(w.slice(0, -2));
      if (/s$/.test(w) && !/(?:ss|us|is)$/.test(w)) add(w.slice(0, -1));
      if (/ing$/.test(w) && L > 5) { const b = w.slice(0, -3); add(b); add(b + 'e'); if (/([^aeiou])\1$/.test(b)) add(b.slice(0, -1)); }
      if (/ed$/.test(w) && L > 4) { const b = w.slice(0, -2); add(b); add(w.slice(0, -1)); if (/([^aeiou])\1$/.test(b)) add(b.slice(0, -1)); }
      if (/ly$/.test(w) && L > 5) { add(w.slice(0, -2)); if (/ily$/.test(w)) add(w.slice(0, -3) + 'y'); }
    }
    formsCache.set(w, f);
    return f;
  }
  const normWord = t => String(t).toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/'s$/, '').replace(/s'$/, 's').replace(/'$/, '');
  const phraseToks = s => (String(s || '').toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/[\u2018\u2019]/g, "'")
    .match(/[a-z\u00C0-\u024F][a-z0-9\u00C0-\u024F]*(?:['\-][a-z0-9\u00C0-\u024F]+)*/g) || []);

  function mkEntry(w, o) {
    const toks = phraseToks(w);
    if (!toks.length) return null;
    return Object.assign({ w: String(w), toks }, o);
  }
  // entries are indexed by their own words; a tapped word is expanded to its possible base forms (one direction only,
  // so "sight" never matches an entry written "sighted")
  function mkIndex(entries) {
    const map = new Map();
    entries.forEach(e => e.toks.forEach(t => { let a = map.get(t); if (!a) map.set(t, a = []); if (a.indexOf(e) < 0) a.push(e); }));
    return { map, entries };
  }
  // entries (single words or phrases) that match the sentence around word index t
  function matchesAt(ix, S, t, singlesOnly) {
    const res = [], seen = new Set();
    (S.tf[t] || []).forEach(f => (ix.map.get(f) || []).forEach(e => {
      if (seen.has(e)) return;
      seen.add(e);
      const n = e.toks.length;
      if (singlesOnly && n > 1) return;
      for (let k = 0; k < n; k++) {
        const start = t - k;
        if (start < 0 || start + n > S.tf.length) continue;
        let ok = true, ex = 0;
        for (let j = 0; j < n; j++) {
          const a = S.tf[start + j];
          if (a.indexOf(e.toks[j]) < 0) { ok = false; break; }
          if (a[0] === e.toks[j]) ex++;
        }
        if (ok) { res.push({ e, from: start, len: n, ex }); break; }
      }
    }));
    return res;
  }
  const better = (a, b) => !b || a.len > b.len || (a.len === b.len && a.ex > b.ex);

  const othersCache = {};
  function buildLex(u) {
    const gl = ((u.reading && u.reading.gloss) || []).map(g => Array.isArray(g) ? mkEntry(g[0], { ar: g[1], src: 'gloss', unitId: u.id }) : null).filter(Boolean);
    const vo = (u.vocab || []).map(v => mkEntry(v.w, { ar: v.ar, v, src: 'vocab', unitId: u.id, unitN: u.n })).filter(Boolean);
    return {
      glossEntries: gl, gloss: mkIndex(gl), vocab: mkIndex(vo),
      others() {
        if (!othersCache[u.id]) {
          const list = [];
          TAF.units.filter(x => x.grade === u.grade && x.id !== u.id).sort((a, b) => a.n - b.n)
            .forEach(x => (x.vocab || []).forEach(v => { const e = mkEntry(v.w, { ar: v.ar, v, src: 'other', unitId: x.id, unitN: x.n }); if (e) list.push(e); }));
          othersCache[u.id] = mkIndex(list);
        }
        return othersCache[u.id];
      }
    };
  }

  function lookup(c, S, t) {
    const srcs = [['gloss', c.lex.gloss], ['vocab', c.lex.vocab], ['other', c.lex.others()]];
    const pickBest = (ix, singles, sent, idx) => { let b = null; matchesAt(ix, sent, idx, singles).forEach(m => { if (better(m, b)) b = m; }); return b; };
    for (const [kind, ix] of srcs) {
      const best = pickBest(ix, false, S, t);
      if (!best) continue;
      const res = { kind, e: best.e, from: best.from, len: best.len, ar: best.e.ar || '', v: best.e.v || null };
      if (best.len > 1) {                                                   // a phrase: also look for the word on its own
        for (const [k2, ix2] of srcs) { const b2 = pickBest(ix2, true, S, t); if (b2 && b2.e !== best.e) { res.alone = { kind: k2, e: b2.e }; break; } }
      }
      return res;
    }
    const w = S.words[t].t;                                                 // hyphenated compound: try its parts
    if (w.indexOf('-') > 0) {
      const parts = w.split('-').filter(p => p.length > 2).sort((a, b) => b.length - a.length);
      for (const p of parts) {
        const fake = { tf: [forms(normWord(p))], words: [{}] };
        for (const [kind, ix] of srcs) {
          const best = pickBest(ix, true, fake, 0);
          if (best) return { kind, e: best.e, from: t, len: 1, ar: best.e.ar || '', v: best.e.v || null, part: p };
        }
      }
    }
    return null;
  }

  const STOP = new Set(('the a an of to in on at by for with and or but is are was were be been am it this that these those he she they we you i my his her their our your its ' +
    'as if do does did not no so up out from into than then there here has have had can will would could should may might must who whom what which when where why how all any some one more most very just also only about over after before').split(' '));
  // articles, prepositions, conjunctions, pronouns and auxiliaries: their meaning depends on the sentence, so we say so instead of guessing
  const FUNC = new Set(('the a an of to in on at by for with and or but is are was were be been am it this that these those he she they we you i my his her their our your its ' +
    'as if do does did not no so from into than then there here has have had can will would could should may might must who whom what which when where why how').split(' '));
  // phrases of this unit that contain the tapped word — shown when the word itself has no entry
  function related(c, S, t) {
    const tf = S.tf[t];
    if (!tf || !tf.length || STOP.has(tf[0]) || tf[0].length < 3) return [];
    const out = [], seen = new Set();
    tf.forEach(f => (c.lex.vocab.map.get(f) || []).forEach(e => { if (e.toks.length > 1 && !seen.has(e)) { seen.add(e); out.push(e); } }));
    return out.slice(0, 3);
  }

  // gloss phrases that appear in the passage -> S.kw[wordIndex] = gloss entry index (used for in-text highlighting)
  function markKeywords(model, lex) {
    model.flat.forEach(S => {
      S.kw = new Array(S.words.length);
      for (let t = 0; t < S.words.length; t++) {
        if (S.kw[t] != null) continue;
        let best = null;
        matchesAt(lex.gloss, S, t).forEach(m => { if (m.from === t && better(m, best)) best = m; });
        if (best) { const gi = lex.glossEntries.indexOf(best.e); for (let k = 0; k < best.len; k++) S.kw[t + k] = gi; }
      }
    });
  }

  /* ============================================================
     4. highlights (persisted in store.s.hl[unitId] = ["p.s", ...])
     ============================================================ */
  function loadHL(id) {
    const h = st().hl && st().hl[id];
    return new Set(Array.isArray(h) ? h.filter(x => typeof x === 'string') : []);
  }
  function saveHL(id, set) {
    const s = st();
    if (!s.hl || typeof s.hl !== 'object' || Array.isArray(s.hl)) s.hl = {};
    const arr = Array.from(set).sort((a, b) => { const x = a.split('.').map(Number), y = b.split('.').map(Number); return (x[0] - y[0]) || (x[1] - y[1]); });
    if (arr.length) s.hl[id] = arr; else delete s.hl[id];
    store.save();
  }

  /* ============================================================
     5. context object: one per mounted view, owns every listener / timer
     ============================================================ */
  function makeCtx(el, u, r, mode) {
    const c = { el, u, r, mode, off: [], model: buildModel(r), lex: buildLex(u), dead: false };
    c.nWords = U.words(c.model.plain);
    c.on = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); c.off.push(() => t.removeEventListener(ev, fn, o)); };
    c.cleanup = fn => { c.off.push(fn); };
    c.timer = (fn, ms) => { const id = setTimeout(fn, ms); c.off.push(() => clearTimeout(id)); return id; };
    c.destroy = () => {
      if (c.dead) return;
      c.dead = true;
      c.off.splice(0).reverse().forEach(f => { try { f(); } catch (e) { /* ignore */ } });
    };
    onLeave(c.destroy);
    const hl = loadHL(u.id);
    c.model.flat.forEach(S => { S.hl = hl.has(S.id); });
    return c;
  }

  function syncNavHeight(c) {                                 // docks float just above the bottom nav (absent on wide screens)
    const set = () => {
      const nav = $('.bottomnav');
      const h = nav && getComputedStyle(nav).display !== 'none' ? nav.offsetHeight : 0;
      c.el.style.setProperty('--rd-nav', h + 'px');
    };
    set();
    c.on(window, 'resize', set);
  }

  function pageTop(c, mode) {
    const { u, r } = c;
    const items = [['read', 'قراءة', IC.book, 'النص كما في الكتاب وبجانبه أدوات الدراسة'], ['listen', 'استماع', IC.headphones, 'استمع جملة جملة وتابع الكلمات'], ['story', 'قصة', IC.cards, 'بطاقات فقرة بفقرة وأسئلة سريعة']];
    let h = crumbs([['الوحدات', '#/units'], [`الوحدة ${u.n}`, `#/unit/${u.id}`], ['القراءة']]);
    h += `<div class="page-head"><div class="unit-num">الوحدة ${u.n} · القراءة</div><h1>${esc(r.skillAr)}</h1><p class="sub en" style="text-align:right">${esc(r.skill)}</p></div>`;
    h += `<nav class="rd-modes" aria-label="طريقة عرض القطعة">${items.map(([k, t, ic, d]) => `<a class="rd-mode" data-mode="${k}" href="#/unit/${u.id}/reading?m=${k}"${k === mode ? ' aria-current="page"' : ''}>${ic}<b>${t}</b><small>${d}</small></a>`).join('')}</nav>`;
    return h;
  }
  const ctaHTML = (u, r) => `<div class="sheet rd-cta"><div class="row" style="justify-content:space-between"><div><b>أسئلة الاستيعاب</b><div class="small muted">${(r.qs || []).length} أسئلة: فكرة رئيسية، تفاصيل، استنتاج، مفردات</div></div><a class="btn" href="#/unit/${u.id}/reading/questions">أجب عن الأسئلة</a></div></div>`;

  // print-only block: title + passage, sized in pt so the app's font-size setting does not change the printout
  function printHTML(c) {
    const { u, r, model } = c;
    const body = model.paras.map(P => `<p class="rd-pr-p"><b class="rd-pr-n">${P.p + 1}</b>${P.sents.map(S => `<span${S.hl ? ' class="rd-pr-hl"' : ''}>${esc(S.text)}</span>`).join(' ')}</p>`).join('');
    return `<div class="rd-print" aria-hidden="true"><div class="rd-pr-top"><span>Tafawuq · Grade ${esc(u.grade)} · Unit ${esc(u.n)}: ${esc(u.title)}</span><span>Reading</span></div>
      <div class="rd-pr-title">${esc(r.title)}</div>${r.skill ? `<div class="rd-pr-skill">${esc(r.skill)}</div>` : ''}<div class="rd-pr-body">${body}</div></div>`;
  }
  function wirePrint(c) {
    const refresh = () => { const box = $('.rd-print', c.el); if (!box) return; const fresh = document.createElement('div'); fresh.innerHTML = printHTML(c); box.replaceWith(fresh.firstElementChild); };
    c.on(window, 'beforeprint', refresh);           // also covers Ctrl+P / the browser menu
    return refresh;
  }

  /* ============================================================
     6. keyboard access to words (roving tabindex): arrows move, Enter/Space opens
     ============================================================ */
  function initRoving(c, root) {
    const list = () => $$('.rd-w', root);
    const first = list()[0];
    if (first) { first.tabIndex = 0; first.setAttribute('role', 'button'); first.setAttribute('aria-haspopup', 'dialog'); }
    list().forEach((w, k) => { if (k) w.tabIndex = -1; });
    const focusAt = (ws, from, to) => {
      if (to < 0 || to >= ws.length) return;
      ws[from].tabIndex = -1; ws[from].removeAttribute('role'); ws[from].removeAttribute('aria-haspopup');
      ws[to].tabIndex = 0; ws[to].setAttribute('role', 'button'); ws[to].setAttribute('aria-haspopup', 'dialog'); ws[to].focus();
    };
    c.on(root, 'keydown', e => {
      const w = e.target.closest && e.target.closest('.rd-w');
      if (!w || e.altKey || e.ctrlKey || e.metaKey) return;
      const ws = list(), k = ws.indexOf(w);
      if (k < 0) return;
      let to = -1;
      const sentStep = dir => {
        const cur = w.closest('.rd-s');
        const sents = $$('.rd-s', root), si = sents.indexOf(cur), tgt = sents[si + dir];
        return tgt ? ws.indexOf($('.rd-w', tgt)) : -1;
      };
      switch (e.key) {
        case 'ArrowRight': to = k + 1; break;
        case 'ArrowLeft': to = k - 1; break;
        case 'ArrowDown': to = sentStep(1); break;
        case 'ArrowUp': to = sentStep(-1); break;
        case 'Home': to = 0; break;
        case 'End': to = ws.length - 1; break;
        case 'Enter': case ' ': e.preventDefault(); w.click(); return;
        default: return;
      }
      e.preventDefault();
      focusAt(ws, k, to);
    });
  }

  /* ============================================================
     7. word popup (bottom sheet on phones, anchored popover on wide screens)
     ============================================================ */
  function createPopup(c, o) {
    o = o || {};
    const pop = document.createElement('div');
    pop.className = 'rd-pop'; pop.hidden = true; pop.tabIndex = -1;
    pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-labelledby', 'rd-pop-w');
    c.el.appendChild(pop);
    let cur = null, opener = null, marked = [];
    const wide = () => !!(window.matchMedia && matchMedia('(min-width: 700px)').matches);
    const cleanHead = w => String(w).replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();

    function starInfo(res, S, printed) {
      if (res) {
        const head = cleanHead(res.e.w);
        return { key: TAF.words.key(res.e.unitId || c.u.id, res.e.w), w: head, ar: res.ar, ex: (res.v && res.v.ex) || S.text, unit: res.e.unitId || c.u.id };
      }
      const base = normWord(printed);
      return { key: TAF.words.key(c.u.id, base), w: base, ar: '', ex: S.text, unit: c.u.id };
    }

    function html(res, S, t, printed) {
      const phrase = res && res.len > 1 ? cleanHead(res.e.w) : '';
      const info = starInfo(res, S, printed);
      const on = TAF.words.has(info.key);
      let h = `<div class="rd-pop-grab" aria-hidden="true"></div>`;
      h += `<div class="rd-pop-head"><span class="rd-pop-word en" id="rd-pop-w" lang="en" dir="ltr">${esc(printed)}</span>${TAF.speakBtn(printed, 'انطق الكلمة ' + printed)}</div>`;
      if (phrase) h += `<div class="rd-pop-phrase"><span class="rd-pop-tag">ضمن العبارة</span><bdi class="en" lang="en">${esc(phrase)}</bdi>${TAF.speakBtn(phrase, 'انطق العبارة ' + phrase)}</div>`;
      if (res) {
        const src = res.kind === 'gloss' ? 'من قاموس القطعة' : res.kind === 'vocab' ? 'من مفردات هذه الوحدة' : `من مفردات الوحدة ${res.e.unitN}`;
        h += `<div class="rd-pop-mean" lang="ar" dir="rtl">${md(res.ar || '—')}</div>`;
        if (res.part) h += `<div class="rd-pop-note">معنى الجزء <bdi class="en">${esc(res.part)}</bdi> من الكلمة المركّبة</div>`;
        if (res.alone) h += `<div class="rd-pop-alone"><span class="rd-pop-tag">الكلمة وحدها</span><bdi class="en" lang="en">${esc(cleanHead(res.alone.e.w))}</bdi> — ${md(res.alone.e.ar || '')}</div>`;
        h += `<div class="rd-pop-meta"><span class="rd-pop-src">${esc(src)}</span>${res.v && res.v.pos ? `<span class="rd-pop-pos en">${esc(res.v.pos)}</span>` : ''}${res.kind === 'other' ? `<a class="rd-pop-link" href="#/unit/${esc(res.e.unitId)}/vocab">افتح المفردات</a>` : ''}</div>`;
        if (res.v && res.v.def) h += `<div class="rd-pop-def en" lang="en" dir="ltr">${esc(res.v.def)}</div>`;
        if (res.v && res.v.ex) h += `<div class="rd-pop-ex en" lang="en" dir="ltr"><span>${esc(res.v.ex)}</span>${TAF.speakBtn(res.v.ex, 'استمع إلى المثال')}</div>`;
      } else {
        const proper = t > 0 && /^[A-Z][a-z]/.test(printed) && !STOP.has(normWord(printed));       // capitalised in mid-sentence: a name
        const func = FUNC.has(normWord(printed));
        const online = typeof navigator !== 'undefined' && navigator.onLine !== false;
        const web = `https://translate.google.com/?sl=en&tl=ar&op=translate&text=${encodeURIComponent(printed)}`;
        h += `<div class="rd-pop-none">${IC.search}<div>${proper
          ? `<p>يبدو أن هذه الكلمة اسم علم (شخص أو مكان أو مؤسسة)، فلا تحتاج إلى ترجمة.</p>`
          : func
          ? `<p>كلمة وظيفية شائعة (حرف جر أو ضمير أو أداة ربط…).</p><p class="small muted">معناها يتغيّر بحسب الجملة، فالأفضل أن تفهمها من سياقها. استمع إلى نطقها أو راجع ترجمة الفقرة.</p>`
          : `<p>لا يوجد معنى مسجّل لهذه الكلمة.</p><p class="small muted">استمع إلى نطقها، أو أضفها إلى «كلماتي» لتراجعها لاحقاً، أو <a class="rd-pop-link" href="#/search?q=${encodeURIComponent(normWord(printed))}">ابحث عنها في المنهاج</a>${online ? ` أو <a class="rd-pop-link" href="${web}" target="_blank" rel="noopener noreferrer">اعرف معناها من الإنترنت</a>` : ''}.</p>`}</div></div>`;
        if (o.trHint && o.trHint.has(S)) h += `<button type="button" class="btn soft sm rd-pop-tr" data-trpara>${IC.translate}<span>اعرض ترجمة هذه الفقرة</span></button>`;
        const rel = (proper || func) ? [] : related(c, S, t);
        if (rel.length) h += `<div class="rd-pop-rel"><span class="rd-pop-tag">عبارات من هذه الوحدة تحتوي هذه الكلمة</span><ul>${rel.map(e => `<li><bdi class="en" lang="en">${esc(cleanHead(e.w))}</bdi><span lang="ar" dir="rtl">${md(e.ar || '')}</span></li>`).join('')}</ul></div>`;
      }
      h += `<div class="rd-pop-actions"><button type="button" class="btn ghost sm rd-star" data-star aria-pressed="${on}">${IC.star}<span>${on ? 'في كلماتي' : 'أضف إلى كلماتي'}</span></button>${o.extra ? o.extra.html(S) : ''}</div>`;
      h += `<button type="button" class="rd-pop-x iconbtn" data-close aria-label="إغلاق">${IC.x}</button>`;
      return h;
    }

    function position() {
      if (pop.hidden || !cur) return;
      if (!pop.classList.contains('rd-anchored')) { pop.style.cssText = ''; return; }
      const a = cur.anchorEl.getBoundingClientRect();
      if (a.bottom < 0 || a.top > innerHeight) return close();
      const w = pop.offsetWidth || 340, h = pop.offsetHeight || 200;
      let left = clamp(a.left + a.width / 2 - w / 2, 10, Math.max(10, innerWidth - w - 10));
      let top = a.bottom + 10;
      if (top + h > innerHeight - 10) top = Math.max(10, a.top - h - 10);
      pop.style.left = left + 'px'; pop.style.top = top + 'px'; pop.style.right = 'auto'; pop.style.bottom = 'auto';
    }

    // on phones the sheet covers the bottom of the screen: scroll so the tapped word stays visible above it
    function keepAnchorVisible() {
      if (!cur || pop.classList.contains('rd-anchored')) return;
      const a = cur.anchorEl.getBoundingClientRect();
      const lineTop = pop.offsetHeight ? innerHeight - pop.offsetHeight : innerHeight * 0.55;
      const topbar = $('.topbar'), minTop = (topbar ? topbar.getBoundingClientRect().bottom : 56) + 8;
      if (a.bottom > lineTop - 14) window.scrollBy({ top: a.bottom - lineTop + 28, behavior: calm() ? 'auto' : 'smooth' });
      else if (a.top < minTop) window.scrollBy({ top: a.top - minTop - 20, behavior: calm() ? 'auto' : 'smooth' });
    }
    function open(wordEl, S, t, byKey, anchorEl) {
      const printed = S.words[t].t;
      const res = lookup(c, S, t);
      closeMarks();
      opener = byKey ? (anchorEl || wordEl) : null;
      cur = { S, t, res, printed, anchorEl: anchorEl || wordEl };
      pop.innerHTML = html(res, S, t, printed);
      pop.hidden = false;
      pop.classList.toggle('rd-anchored', wide());
      pop.classList.remove('rd-in');
      const from = res ? res.from : t, len = res ? res.len : 1;
      for (let k = from; k < from + len; k++) { const w = S.wordEls[k]; if (w) { w.classList.add('rd-sel'); marked.push(w); } }
      position();
      keepAnchorVisible();
      requestAnimationFrame(() => { if (!pop.hidden) { pop.classList.add('rd-in'); position(); } });
      try { pop.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
      if (o.onOpen) o.onOpen(cur);
    }
    function closeMarks() { marked.forEach(w => w.classList.remove('rd-sel')); marked = []; }
    function close(restore) {
      if (pop.hidden) return;
      closeMarks();
      pop.hidden = true; pop.classList.remove('rd-in', 'rd-anchored'); pop.style.cssText = '';
      const was = cur; cur = null;
      if (restore && opener && document.contains(opener)) { try { opener.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
      opener = null;
      if (o.onClose) o.onClose(was);
    }

    pop.addEventListener('click', e => {
      if (o.onSpeak && e.target.closest('[data-say]')) o.onSpeak();       // runs before the global pronounce handler cancels speech
      const b = e.target.closest('button');
      if (!b || !cur) return;
      if (b.hasAttribute('data-close')) return close(true);
      if (b.hasAttribute('data-star')) {
        const info = starInfo(cur.res, cur.S, cur.printed);
        const on = TAF.words.toggle(info);
        if (on) { try { if (TAF.game && TAF.game.queueCheck) TAF.game.queueCheck(); } catch (err) { /* ignore */ } }
        b.setAttribute('aria-pressed', String(on));
        $('span', b).textContent = on ? 'في كلماتي' : 'أضف إلى كلماتي';
        U.toast(on ? 'أُضيفت إلى كلماتي' : 'أُزيلت من كلماتي');
        return;
      }
      if (b.hasAttribute('data-trpara') && o.trHint) { const S = cur.S; close(); o.trHint.run(S); return; }
      if (b.hasAttribute('data-extra') && o.extra) o.extra.run(cur.S, b, { close });
    });
    c.on(document, 'pointerdown', e => {
      if (pop.hidden || pop.contains(e.target)) return;
      if (e.target.closest && e.target.closest('.rd-w')) return;           // tapping another word just swaps the content
      close();
    }, true);
    c.on(document, 'keydown', e => { if (e.key === 'Escape' && !pop.hidden) { e.preventDefault(); close(true); } });
    let raf = 0;
    const reflow = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; position(); }); };
    c.on(window, 'resize', () => { if (!pop.hidden) { pop.classList.toggle('rd-anchored', wide()); reflow(); } });
    c.on(window, 'scroll', reflow, { passive: true });
    return { open, close, isOpen: () => !pop.hidden, el: pop, current: () => cur };
  }

  /* ============================================================
     8. narrator: sentence-by-sentence speech with karaoke events, shadowing and loop
     ============================================================ */
  const WD = { startWait: 4500, endFactor: 3, endPad: 6000 };   // stall watchdog: tuned for real voices; tests may shorten it
  function createNarrator(cfg) {
    const synth = window.speechSynthesis;
    const sents = cfg.sentences, N = sents.length, on = cfg.on || {};
    let state = 'idle', i = clamp(cfg.start || 0, 0, Math.max(0, N - 1)), c = 0, gen = 0, cur = null;
    let wd = null, gapT = null, sh = null, pausedIn = null, t0 = 0, acc = 0, tries = 0, waited = 0, destroyed = false;
    const played = new Set(), measured = {};

    const supported = () => !!(synth && TAF.tts && TAF.tts.ok);
    const emit = (k, a, b, d) => { if (!destroyed && on[k]) { try { on[k](a, b, d); } catch (e) { console.error('[reader]', e); } } };
    const setState = s => { if (state !== s) { state = s; emit('state', s); } };
    const chunks = S => S.chunks || (S.chunks = chunkSentence(S.text));
    const estMs = S => Math.max(900, Math.max(1, S.words.length) / (2.6 * cfg.rate()) * 1000);

    function killSpeech() {
      gen++; cur = null; clearTimeout(wd); wd = null;
      let had = false;
      try { had = !!(synth.speaking || synth.pending); synth.cancel(); } catch (e) { /* ignore */ }
      return had;
    }
    function killTimers() { clearTimeout(gapT); gapT = null; if (sh && sh.iv) { clearInterval(sh.iv); sh.iv = null; } }
    function fail(reason) { killSpeech(); killTimers(); acc = 0; c = 0; pausedIn = 'speech'; setState('paused'); emit('error', reason || 'failed'); }
    function outside() {                                   // something else (e.g. a pronounce button) cancelled our speech
      killTimers(); clearTimeout(wd); cur = null; acc = 0; c = 0; pausedIn = 'speech'; setState('paused'); emit('interrupted');
    }

    function arm(S, started, my) {
      clearTimeout(wd);
      wd = setTimeout(() => {
        if (destroyed || my !== gen) return;
        if (!started) {                                    // the engine never started this utterance
          if ((synth.speaking || synth.pending) && waited < 3) { waited++; return arm(S, false, my); }
          if (tries++ < 1) { killSpeech(); return speak(80); }
          return fail('stalled');
        }
        gen++; try { synth.cancel(); } catch (e) { /* ignore */ }   // started but never ended (long-speech stall / lost onend): move on
        chunkDone();
      }, started ? estMs(S) * WD.endFactor + WD.endPad : WD.startWait);
    }

    function speak(delay) {
      if (destroyed) return;
      const S = sents[i], ch = chunks(S)[c], my = ++gen;
      const run = () => {
        if (destroyed || my !== gen) return;
        let u;
        try { u = new SpeechSynthesisUtterance(ch.text.replace(/[\u2018\u2019]/g, "'")); } catch (e) { return fail('unsupported'); }
        const v = TAF.tts.voice();
        if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-GB';
        u.rate = cfg.rate(); u.pitch = 1; u.volume = 1;
        let started = false;
        u.onstart = () => { if (my !== gen) return; started = true; tries = 0; waited = 0; t0 = performance.now(); arm(S, true, my); };
        u.onboundary = e => {
          if (my !== gen) return;
          if (e && e.name && e.name !== 'word') return;
          if (!started) { started = true; t0 = t0 || performance.now(); arm(S, true, my); }
          const k = wordAt(S, ch.off + ((e && e.charIndex) || 0));
          if (k >= 0) emit('word', S, k);
        };
        u.onend = () => { if (my !== gen) return; clearTimeout(wd); acc += t0 ? performance.now() - t0 : 0; t0 = 0; chunkDone(); };
        u.onerror = e => {
          if (my !== gen) return;
          clearTimeout(wd);
          const err = e && e.error;
          if (err === 'canceled' || err === 'interrupted') return outside();
          fail(err || 'failed');
        };
        cur = u;                                           // keep a reference: some browsers drop events of collected utterances
        try { synth.speak(u); } catch (e) { return fail('failed'); }
        arm(S, false, my);
      };
      if (delay) setTimeout(run, delay); else run();
    }

    function chunkDone() {
      if (destroyed) return;
      const S = sents[i], cs = chunks(S);
      if (c + 1 < cs.length) { c++; return speak(0); }
      c = 0; played.add(i); if (acc > 300) measured[i] = acc; acc = 0;
      emit('sentenceDone', S, i);
      if (destroyed || state !== 'playing') return;
      if (cfg.shadow && cfg.shadow()) return startShadow();
      advance();
    }
    function after(fn) { clearTimeout(gapT); gapT = setTimeout(() => { gapT = null; if (!destroyed && state === 'playing') fn(); }, 160); }
    function advance() {
      if (cfg.loop && cfg.loop()) { c = 0; return after(() => speak(0)); }
      if (i + 1 < N) { i++; c = 0; emit('sentence', sents[i], i); return after(() => speak(0)); }
      setState('done'); emit('done');
    }

    function startShadow() {
      const S = sents[i];
      const total = clamp((measured[i] || estMs(S)) * 1.2, 1500, 20000);
      sh = { total, left: total, last: performance.now(), iv: null };
      setState('shadow');
      emit('shadow', S, sh.left, sh.total);
      sh.iv = setInterval(tickShadow, 100);
    }
    function tickShadow() {
      if (!sh) return;
      const now = performance.now(); sh.left -= now - sh.last; sh.last = now;
      if (sh.left <= 0) return endShadow();
      emit('shadow', sents[i], sh.left, sh.total);
    }
    function endShadow() {
      if (sh && sh.iv) clearInterval(sh.iv);
      sh = null; pausedIn = null;
      emit('shadow', sents[i], 0, 1);
      if (destroyed) return;
      setState('playing');
      advance();
    }

    function play(k) {
      if (destroyed) return false;
      if (!supported()) { emit('error', 'unsupported'); return false; }
      const had = killSpeech(); killTimers(); sh = null; pausedIn = null;
      if (k != null) i = clamp(k, 0, N - 1); else if (state === 'done') i = 0;
      c = 0; acc = 0; tries = 0; waited = 0;
      emit('sentence', sents[i], i);
      setState('playing');
      speak(had ? 70 : 0);
      return true;
    }
    function pause() {
      if (destroyed) return;
      if (state === 'playing') { killSpeech(); killTimers(); acc = 0; c = 0; pausedIn = 'speech'; setState('paused'); }
      else if (state === 'shadow') { killTimers(); pausedIn = 'shadow'; setState('paused'); }
    }
    function resume() {
      if (destroyed || state !== 'paused') return;
      if (pausedIn === 'shadow' && sh) { sh.last = performance.now(); sh.iv = setInterval(tickShadow, 100); pausedIn = null; setState('shadow'); return; }
      pausedIn = null; c = 0; acc = 0; tries = 0; waited = 0;
      setState('playing'); speak(40);
    }
    function toggle() {
      if (state === 'playing' || state === 'shadow') pause();
      else if (state === 'paused') resume();
      else play(state === 'done' ? 0 : i);
    }
    function seek(k) {                                     // move the cursor; keep playing if we were playing
      k = clamp(k, 0, N - 1);
      if (state === 'playing' || state === 'shadow') return play(k);
      killSpeech(); killTimers(); sh = null; pausedIn = null; c = 0; acc = 0; i = k;
      if (state === 'done') setState('paused');
      emit('sentence', sents[i], i);
    }
    function stop() { killSpeech(); killTimers(); sh = null; pausedIn = null; c = 0; acc = 0; setState('idle'); }
    function skipShadow() { if (state === 'shadow' && sh) endShadow(); }
    function destroy() {
      if (destroyed) return;
      killSpeech(); killTimers(); destroyed = true;
      try { if (synth && synth.paused) synth.resume(); } catch (e) { /* ignore */ }
    }
    return {
      play, pause, resume, toggle, seek, stop, skipShadow, destroy, supported,
      next: () => seek(i + 1), prev: () => seek(i - 1), restart: () => play(0),
      get state() { return state; }, get index() { return i; }, get count() { return N; }, get heard() { return played.size; }
    };
  }

  const curRate = () => clamp((+((st().settings || {}).rate) || 0.92) * UI.mult, 0.45, 1.6);
  const SPEEDS = [0.7, 0.85, 1, 1.15];

  /* ============================================================
     9. shared passage markup (read + listen)
     ============================================================ */
  function parasHTML(c, o) {
    const { r, model } = c;
    return model.paras.map(P => {
      const gist = (r.gist && r.gist[P.p]) || '', tr = (r.tr && r.tr[P.p]) || '';
      let h = `<div class="rd-para" data-p="${P.p}">`;
      if (o.gist && gist) h += `<div class="rd-gist" data-gist hidden><span class="rd-gist-lab">${IC.bulb}<span>الفكرة الرئيسية</span></span><span class="rd-gist-t" lang="ar" dir="rtl">${md(gist)}</span></div>`;
      h += `<p class="rd-p" lang="en" dir="ltr"><span class="rd-pn">${P.p + 1}</span>${paraInner(P, o)}</p>`;
      if (o.tr && tr) h += `<div class="rd-pfoot"><button type="button" class="rd-ptr" data-tr="${P.p}" aria-expanded="false">${IC.translate}<span>ترجمة</span></button></div><div class="rd-tr" data-trbox="${P.p}" hidden lang="ar" dir="rtl"><span class="rd-tr-lab">ترجمة الفقرة ${P.p + 1}</span><p>${md(tr)}</p></div>`;
      return h + '</div>';
    }).join('');
  }
  const emptyHTML = `<div class="empty">${IC.book}<p>لا يوجد نص لهذه القطعة بعد.</p></div>`;

  /* ============================================================
     10. READ mode
     ============================================================ */
  function benchmark(wpm, secs) {
    if (secs < 8) return { tone: 'warn', text: 'الوقت قصير جداً. اضغط «ابدأ»، ثم اقرأ النص كاملاً، ثم اضغط «أنهيت القراءة».' };
    if (wpm < 70) return { tone: 'low', text: 'بداية جيدة! القراءة المتأنية طبيعية عندما تبحث عن المعنى. اقرأ النص مرة ثانية وستلاحظ أنك أسرع.' };
    if (wpm < 110) return { tone: 'ok', text: 'سرعة جيدة لطالب يدرس الإنجليزية. هدفك القادم: 120 كلمة في الدقيقة.' };
    if (wpm < 160) return { tone: 'good', text: 'ممتاز! هذه سرعة قارئ واثق، وتكفي لإنهاء قطعة الامتحان بوقت مريح.' };
    if (wpm < 240) return { tone: 'great', text: 'رائع جداً! سرعتك قريبة من سرعة القراءة العادية بالإنجليزية. تأكّد فقط أنك تفهم ما تقرأ.' };
    return { tone: 'fast', text: 'سريع جداً! على الأرجح تصفّحت النص. أعد القراءة بتمعّن ثم أجب عن الأسئلة لتتأكد من الفهم.' };
  }

  function mountRead(c) {
    const { el, u, r, model } = c;
    const hasGist = Array.isArray(r.gist) && r.gist.some(Boolean);
    const hasTr = Array.isArray(r.tr) && r.tr.some(Boolean);
    const mins = Math.max(1, Math.round(c.nWords / 130));
    const flags = { pen: false, gist: false, trAll: false };

    let h = pageTop(c, 'read');
    h += `<div class="note tip">${IC.bulb}<div>${md(r.skillTip)}</div></div>`;
    if (!model.flat.length) {
      el.innerHTML = h + emptyHTML + ctaHTML(u, r);
      return;
    }
    h += `<section class="sheet rd-sheet rd-read" aria-labelledby="rd-title">
      <div class="rd-meta"><span class="small muted">${c.nWords} كلمة · حوالي ${minutesAr(mins)}</span><a class="rd-listenlink" href="#/unit/${u.id}/reading?m=listen">${IC.headphones}<span>استمع للنص</span></a></div>
      <div class="rd-tools" role="toolbar" aria-label="أدوات القراءة">
        <button type="button" class="rd-tool rd-tool-pen" data-tool="pen" aria-pressed="false" title="قلم التظليل: ظلّل الجمل المهمة" aria-label="قلم التظليل">${IC.marker}<span>تظليل</span></button>
        ${hasGist ? `<button type="button" class="rd-tool" data-tool="gist" aria-pressed="false" title="إظهار الفكرة الرئيسية لكل فقرة" aria-label="إظهار الأفكار الرئيسية">${IC.bulb}<span>الأفكار</span></button>` : ''}
        ${hasTr ? `<button type="button" class="rd-tool" data-tool="trall" aria-pressed="false" title="إظهار ترجمة كل الفقرات" aria-label="إظهار ترجمة كل الفقرات">${IC.translate}<span>الترجمة</span></button>` : ''}
        <button type="button" class="rd-tool" data-tool="timer" title="قِس سرعة قراءتك بالكلمات في الدقيقة" aria-label="قياس سرعة القراءة">${IC.timer}<span>قِس سرعتك</span></button>
        <button type="button" class="rd-tool" data-tool="print" title="اطبع النص وحده" aria-label="طباعة النص">${IC.print}<span>طباعة</span></button>
      </div>
      <div class="rd-hlbar" data-hlbar hidden><span data-hlcount></span><button type="button" class="rd-linkbtn" data-clearhl>مسح التظليل</button></div>
      <p class="rd-hint" data-hint>اضغط على أي كلمة لمعناها ونطقها. ولتظليل جملة فعّل «تظليل».</p>
      <h2 class="rd-title en" id="rd-title" lang="en"><span>${esc(r.title)}</span></h2>
      <div class="rd-passage" data-passage>${parasHTML(c, { gist: hasGist, tr: hasTr, hl: true })}</div>
    </section>`;
    const glossHits = c.lex.glossEntries.map(e => {                 // first place each glossary entry occurs, so a chip can open the same popup as a tap
      for (const S of model.flat) for (let t = 0; t < S.words.length; t++) { if (matchesAt(c.lex.gloss, S, t).some(x => x.e === e && x.from === t)) return { S, t }; }
      return null;
    });
    if (c.lex.glossEntries.length) {
      h += `<h3 class="rd-gloss-h">كلمات مساعدة</h3><div class="rd-gloss" data-gloss>${c.lex.glossEntries.map((e, k) => {
        const inner = `<span class="en" lang="en" dir="ltr">${esc(e.w)}</span><span class="rd-gchip-ar">${esc(e.ar || '')}</span>`;
        return glossHits[k] ? `<button type="button" class="rd-gchip" data-g="${k}" aria-haspopup="dialog">${inner}</button>` : `<span class="rd-gchip rd-gchip-static">${inner}</span>`;
      }).join('')}</div>`;
    }
    h += ctaHTML(u, r);
    h += `<div class="rd-dock rd-dock-read" data-rdock hidden></div>`;
    h += printHTML(c);
    el.innerHTML = h;

    const passage = $('[data-passage]', el), hint = $('[data-hint]', el), hlbar = $('[data-hlbar]', el), rdock = $('[data-rdock]', el);
    bindSentenceEls(passage, model.flat);
    initRoving(c, passage);
    syncNavHeight(c);
    const refreshPrint = wirePrint(c);

    /* ---- highlights ---- */
    const hlSet = loadHL(u.id);
    let clearArm = 0;
    function refreshHL() {
      clearTimeout(clearArm); clearArm = 0;
      model.flat.forEach(S => { S.hl = hlSet.has(S.id); if (S.el) S.el.classList.toggle('rd-hl', S.hl); });
      hlbar.hidden = hlSet.size === 0;
      $('[data-hlcount]', el).textContent = hlSet.size === 1 ? 'جملة واحدة مظلّلة' : hlSet.size === 2 ? 'جملتان مظلّلتان' : `${hlSet.size} جمل مظلّلة`;
      const clr = $('[data-clearhl]', el); clr.textContent = 'مسح التظليل'; clr.classList.remove('rd-confirm');
    }
    function toggleSentence(S) {
      if (hlSet.has(S.id)) hlSet.delete(S.id); else hlSet.add(S.id);
      saveHL(u.id, hlSet); refreshHL();
    }
    refreshHL();
    $('[data-clearhl]', el).addEventListener('click', e => {
      const b = e.currentTarget;
      if (!clearArm) {                                               // two-step confirm without a blocking dialog
        clearArm = setTimeout(() => { clearArm = 0; b.textContent = 'مسح التظليل'; b.classList.remove('rd-confirm'); }, 3200);
        c.cleanup(() => clearTimeout(clearArm));
        b.textContent = 'اضغط مرة ثانية للتأكيد'; b.classList.add('rd-confirm');
        return;
      }
      clearTimeout(clearArm); clearArm = 0;
      hlSet.clear(); saveHL(u.id, hlSet); refreshHL(); U.toast('تم مسح التظليل');
    });

    /* ---- word popup ---- */
    const popup = createPopup(c, {
      trHint: {
        has: S => hasTr && !!r.tr[S.p],
        run: S => { setTr(S.p, true); const box = $(`[data-trbox="${S.p}"]`, el); if (box) box.scrollIntoView({ block: 'center', behavior: calm() ? 'auto' : 'smooth' }); }
      },
      extra: {
        html: S => `<button type="button" class="btn soft sm" data-extra>${IC.marker}<span>${hlSet.has(S.id) ? 'أزل تظليل الجملة' : 'ظلّل الجملة'}</span></button>`,
        run: (S, btn) => { toggleSentence(S); $('span', btn).textContent = hlSet.has(S.id) ? 'أزل تظليل الجملة' : 'ظلّل الجملة'; }
      }
    });

    /* ---- taps on the passage ---- */
    passage.addEventListener('click', e => {
      if (hasSelection()) return;
      const sEl = e.target.closest('.rd-s');
      if (!sEl) return;
      const S = model.flat[+sEl.dataset.g];
      if (!S) return;
      if (flags.pen) { popup.close(); toggleSentence(S); return; }
      const w = e.target.closest('.rd-w');
      if (w) popup.open(w, S, +w.dataset.i, e.detail === 0);
    });

    /* ---- gloss chips open the same popup (anchored to the chip, no jump) ---- */
    const glossBox = $('[data-gloss]', el);
    if (glossBox) glossBox.addEventListener('click', e => {
      const b = e.target.closest('button[data-g]');
      const hit = b && glossHits[+b.dataset.g];
      if (hit) popup.open(hit.S.wordEls[hit.t], hit.S, hit.t, e.detail === 0, b);
    });

    /* ---- per paragraph / global translation and gist ---- */
    const setTr = (p, on) => {
      const box = $(`[data-trbox="${p}"]`, el), btn = $(`[data-tr="${p}"]`, el);
      if (!box || !btn) return;
      box.hidden = !on; btn.setAttribute('aria-expanded', String(on));
      $('span', btn).textContent = on ? 'إخفاء الترجمة' : 'ترجمة';
    };
    el.addEventListener('click', e => {
      const trb = e.target.closest('[data-tr]');
      if (trb) { const p = trb.dataset.tr, box = $(`[data-trbox="${p}"]`, el); setTr(p, box.hidden); return; }
      const tool = e.target.closest('[data-tool]');
      if (!tool) return;
      const k = tool.dataset.tool;
      if (k === 'pen') {
        flags.pen = !flags.pen; popup.close();
        tool.setAttribute('aria-pressed', String(flags.pen));
        passage.classList.toggle('rd-pen', flags.pen);
        hint.textContent = flags.pen ? 'قلم التظليل يعمل: اضغط على أي جملة لتظليلها، واضغط عليها ثانية لإزالة التظليل.' : 'اضغط على أي كلمة لمعناها ونطقها. ولتظليل جملة فعّل «تظليل».';
        hint.classList.toggle('rd-hint-on', flags.pen);
      } else if (k === 'gist') {
        flags.gist = !flags.gist; tool.setAttribute('aria-pressed', String(flags.gist));
        $$('[data-gist]', el).forEach(g => { g.hidden = !flags.gist; });
      } else if (k === 'trall') {
        flags.trAll = !flags.trAll; tool.setAttribute('aria-pressed', String(flags.trAll));
        model.paras.forEach(P => setTr(P.p, flags.trAll));
      } else if (k === 'print') {
        popup.close(); refreshPrint();
        window.print();
      } else if (k === 'timer') {
        popup.close(); timer.toggleStart();
      }
    });

    /* ---- reading timer (counts only while the tab is visible) ---- */
    const timer = (function () {
      let state = 'idle', acc = 0, since = 0, iv = null;
      const elapsed = () => acc + (since ? performance.now() - since : 0);
      const set = s => { state = s; rdock.hidden = s === 'idle'; rdock.dataset.state = s; };
      function paintRun() {
        const t = Math.round(elapsed() / 1000);
        rdock.innerHTML = `<div class="rd-tm-run"><span class="rd-tm-dot" aria-hidden="true"></span><div class="rd-tm-t"><b dir="ltr" data-tmv>${U.fmtTime(t)}</b><small>اقرأ النص كاملاً، ثم اضغط عند الانتهاء</small></div>
          <button type="button" class="btn" data-tm="stop">أنهيت القراءة</button><button type="button" class="btn ghost sm" data-tm="cancel" aria-label="إلغاء القياس">${IC.x}</button></div>`;
      }
      function start() {
        acc = 0; since = performance.now(); set('run'); paintRun();
        clearInterval(iv); iv = setInterval(() => { const v = $('[data-tmv]', rdock); if (v) v.textContent = U.fmtTime(Math.round(elapsed() / 1000)); }, 250);
        const tb = $('[data-tool="timer"]', el); tb.classList.add('rd-on'); $('span', tb).textContent = 'يقيس…';
      }
      function reset() {
        clearInterval(iv); iv = null; acc = 0; since = 0; set('idle'); rdock.innerHTML = '';
        const tb = $('[data-tool="timer"]', el); tb.classList.remove('rd-on'); $('span', tb).textContent = 'قِس سرعتك';
      }
      function stop() {
        const secs = Math.max(1, Math.round(elapsed() / 1000));
        clearInterval(iv); iv = null; since = 0; set('result');
        const wpm = Math.round(c.nWords / (secs / 60));
        const b = benchmark(wpm, secs);
        const pos = clamp((wpm - 40) / 220, 0, 1) * 100;
        rdock.innerHTML = `<div class="rd-tm-res rd-tone-${b.tone}"><div class="rd-tm-top"><div class="rd-tm-big"><b dir="ltr">${b.tone === 'warn' ? '—' : wpm}</b><small>كلمة / دقيقة</small></div>
          <div class="rd-tm-meta"><span>${c.nWords} كلمة</span><span dir="ltr">${U.fmtTime(secs)}</span></div></div>
          <div class="rd-scale" aria-hidden="true"><i style="inset-inline-start:${pos}%"></i></div>
          <p>${esc(b.text)}</p>
          <div class="rd-tm-act"><button type="button" class="btn sm" data-tm="again">${IC.restart}<span>حاول مرة أخرى</span></button><button type="button" class="btn ghost sm" data-tm="close">إغلاق</button></div></div>`;
        const tb = $('[data-tool="timer"]', el); tb.classList.remove('rd-on'); $('span', tb).textContent = 'قِس سرعتك';
      }
      rdock.addEventListener('click', e => {
        const b = e.target.closest('[data-tm]'); if (!b) return;
        const k = b.dataset.tm;
        if (k === 'stop') stop(); else if (k === 'cancel' || k === 'close') reset(); else if (k === 'again') start();
      });
      c.on(document, 'visibilitychange', () => {
        if (state !== 'run') return;
        if (document.hidden) { if (since) { acc += performance.now() - since; since = 0; } } else if (!since) since = performance.now();
      });
      c.cleanup(() => clearInterval(iv));
      return { toggleStart() { if (state === 'run') stop(); else start(); } };
    })();
  }

  /* ============================================================
     11. LISTEN mode (narrated karaoke)
     ============================================================ */
  function mountListen(c) {
    const { el, u, r, model } = c;
    const flat = model.flat, N = flat.length;
    let h = pageTop(c, 'listen');
    if (!N) { el.innerHTML = h + emptyHTML + ctaHTML(u, r); return; }
    const can = !!(TAF.tts && TAF.tts.ok && window.speechSynthesis);
    const hide = { on: false };

    h += `<section class="sheet rd-sheet rd-listen" data-listen aria-labelledby="rd-title">`;
    if (!can) h += `<div class="rd-notice rd-warn" role="alert">${IC.alert}<div><b>الاستماع غير متاح في هذا المتصفح</b><p>المتصفح الذي تستخدمه لا يدعم القراءة الصوتية. افتح التطبيق في Chrome أو Edge أو Safari لتستمع، ويمكنك الآن قراءة النص أدناه والضغط على أي كلمة لمعناها.</p></div></div>`;
    else h += `<div class="rd-notice" data-novoice hidden>${IC.alert}<div><b>لم نجد صوتاً إنجليزياً على جهازك</b><p>قد يبدو النطق غريباً. في ويندوز: الإعدادات ← الوقت واللغة ← الكلام ← إضافة أصوات، وفي أندرويد: إعدادات تحويل النص إلى كلام. حاول التشغيل على أي حال.</p></div></div>`;
    h += `<div class="rd-meta"><span class="small muted">${can ? 'اضغط تشغيل، أو اضغط على أي جملة لتبدأ منها.' : 'وضع القراءة فقط.'}</span></div>`;
    h += `<h2 class="rd-title en" id="rd-title" lang="en"><span>${esc(r.title)}</span></h2>`;
    h += `<div class="rd-passage-wrap"><div class="rd-passage rd-passage-listen" data-passage>${parasHTML(c, {})}</div>
      <button type="button" class="rd-veil" data-veil hidden><span class="rd-veil-in">${IC.eyeOff}<b>النص مخفي</b><span>استمع أولاً، ثم اضغط هنا لإظهاره</span></span></button></div>`;
    h += `<div class="rd-done" data-done hidden role="status"><div class="rd-done-t">${IC.headphones}<div><b data-donetitle>أحسنت! أنهيت الاستماع للقطعة كاملة</b><small data-donesub></small></div></div>
      <div class="rd-done-act"><button type="button" class="btn sm" data-act="again">${IC.restart}<span>استمع مرة أخرى</span></button><a class="btn ghost sm" href="#/unit/${u.id}/reading/questions">أجب عن الأسئلة</a></div></div>`;
    h += `</section>`;
    if (can) {
      h += `<div class="rd-dock rd-dock-listen" data-dock>
        <div class="rd-seekrow"><button type="button" class="rd-ib rd-ib-sm" data-act="restart" aria-label="من البداية" title="من البداية">${IC.restart}</button>
          <input class="rd-seek" type="range" min="1" max="${N}" value="1" step="1" data-seek aria-label="موضع الجملة في القطعة"><span class="rd-seeklab" data-seeklab dir="ltr">1 / ${N}</span></div>
        <div class="rd-transport">
          <div class="rd-tp-main"><button type="button" class="rd-ib" data-act="prev" aria-label="الجملة السابقة" title="الجملة السابقة">${IC.prev}</button>
            <span class="rd-playwrap"><svg class="rd-ring" viewBox="0 0 72 72" aria-hidden="true"><circle class="rd-ring-bg" cx="36" cy="36" r="33"/><circle class="rd-ring-fg" cx="36" cy="36" r="33" data-ringfg/></svg>
              <button type="button" class="rd-play" data-act="toggle" data-play aria-label="تشغيل">${IC.play}</button></span>
            <button type="button" class="rd-ib" data-act="next" aria-label="الجملة التالية" title="الجملة التالية">${IC.next}</button></div>
          <button type="button" class="rd-ib rd-optbtn" data-optbtn aria-label="خيارات الاستماع" aria-expanded="true" title="خيارات الاستماع">${IC.gear}</button>
          <div class="rd-speed" role="group" aria-label="سرعة القراءة">${SPEEDS.map(m => `<button type="button" data-mult="${m}" aria-pressed="${m === UI.mult}" title="سرعة ${m}">${m}×</button>`).join('')}</div>
        </div>
        <div class="rd-status" data-status aria-live="off"></div>
        <div class="rd-toggles" role="group" aria-label="خيارات الاستماع">
          <button type="button" class="rd-pill" data-tog="shadow" aria-pressed="${UI.shadow}">${IC.mic}<span>كرّر بعدي</span></button>
          <button type="button" class="rd-pill" data-tog="loop" aria-pressed="${UI.loop}">${IC.loop}<span>كرّر الجملة</span></button>
          <button type="button" class="rd-pill" data-tog="hide" aria-pressed="false">${IC.eyeOff}<span>أخفِ النص</span></button>
        </div></div>`;
    }
    h += ctaHTML(u, r);
    h += printHTML(c);
    el.innerHTML = h;

    const passage = $('[data-passage]', el), root = $('[data-listen]', el);
    bindSentenceEls(passage, flat);
    initRoving(c, passage);
    syncNavHeight(c);
    wirePrint(c);

    /* ---- voices notice ---- */
    if (can) {
      const note = $('[data-novoice]', el);
      const hasVoice = () => { try { return !!((TAF.tts.voices && TAF.tts.voices.length) || speechSynthesis.getVoices().some(v => /^en(-|_|$)/i.test(v.lang))); } catch (e) { return false; } };
      let poll = 0;
      const sync = () => {                                              // shown only after voices had time to load (no flash); re-checked lightly while visible
        const ok = hasVoice();
        note.hidden = ok;
        if (ok && poll) { clearInterval(poll); poll = 0; }
        if (!ok && !poll) poll = setInterval(sync, 2000);
      };
      c.timer(sync, 1200);
      c.cleanup(() => clearInterval(poll));
      try { speechSynthesis.addEventListener('voiceschanged', sync); c.cleanup(() => speechSynthesis.removeEventListener('voiceschanged', sync)); } catch (e) { /* ignore */ }
    }

    /* ---- karaoke bookkeeping ---- */
    let nowS = null, nowW = null;
    const clearWord = () => { if (nowW) { nowW.classList.remove('rd-nw'); nowW = null; } };
    function setNow(S) {
      if (nowS && nowS !== S && nowS.el) nowS.el.classList.remove('rd-now', 'rd-turn');
      if (nowS !== S) clearWord();
      nowS = S; if (S && S.el) S.el.classList.add('rd-now');
    }
    function setWord(S, k) { if (S !== nowS) return; const w = S.wordEls[k]; if (!w || w === nowW) return; clearWord(); nowW = w; w.classList.add('rd-nw'); }

    const popup = createPopup(c, {
      extra: {
        html: () => `<button type="button" class="btn soft sm" data-extra>${IC.play}<span>أعد هذه الجملة</span></button>`,
        run: (S, btn, api) => { api.close(); if (narr) narr.play(S.g); }
      },
      onSpeak: () => { if (narr && (narr.state === 'playing' || narr.state === 'shadow')) narr.pause(); }
    });

    function ensureVisible(S) {
      if (!S || !S.el || hide.on) return;
      const rects = S.el.getClientRects();
      if (!rects.length) return;
      const top = rects[0].top, bottom = rects[rects.length - 1].bottom;
      const tb = $('.topbar');
      const topSafe = (tb ? tb.getBoundingClientRect().bottom : 56) + 14;
      let botSafe = innerHeight - 14;
      if (dock) { const d = dock.getBoundingClientRect(); if (d.top > 0) botSafe = Math.min(botSafe, d.top - 14); }
      if (popup.isOpen()) { const pr = popup.el.getBoundingClientRect(); if (pr.top > 0 && !popup.el.classList.contains('rd-anchored')) botSafe = Math.min(botSafe, pr.top - 14); }
      if (top >= topSafe && bottom <= botSafe) return;
      const room = Math.max(0, botSafe - topSafe - (bottom - top));
      const target = window.scrollY + top - topSafe - room * 0.3;
      window.scrollTo({ top: Math.max(0, target), behavior: calm() ? 'auto' : 'smooth' });
    }

    /* ---- no speech: reading only ---- */
    const dock = $('[data-dock]', el);
    if (!can) {
      passage.addEventListener('click', e => {
        if (hasSelection()) return;
        const sEl = e.target.closest('.rd-s'), w = e.target.closest('.rd-w');
        if (sEl && w) popup.open(w, model.flat[+sEl.dataset.g], +w.dataset.i, e.detail === 0);
      });
      return;
    }

    /* ---- controls ---- */
    const playBtn = $('[data-play]', el), seek = $('[data-seek]', el), seekLab = $('[data-seeklab]', el), status = $('[data-status]', el);
    const ring = $('[data-ringfg]', el), done = $('[data-done]', el), veil = $('[data-veil]', el);
    const RING = 2 * Math.PI * 33;
    ring.style.strokeDasharray = RING.toFixed(2);
    const setRing = frac => { ring.style.strokeDashoffset = (RING * (1 - clamp(frac, 0, 1))).toFixed(2); };
    setRing(1);
    const label = (k, n) => `${n + 1} / ${N}`;
    const seekProg = i => seek.style.setProperty('--rd-p', (N > 1 ? i / (N - 1) * 100 : 0).toFixed(1) + '%');
    const STATUS = {
      idle: 'اضغط تشغيل للاستماع', playing: 'جارٍ الاستماع…', paused: 'متوقف مؤقتاً', done: 'انتهت القطعة', shadow: ''
    };
    let narr = null;
    function paintState(s) {
      dock.dataset.state = s; root.dataset.state = s;
      const playing = s === 'playing' || s === 'shadow';
      playBtn.innerHTML = s === 'done' ? IC.restart : playing ? IC.pause : IC.play;
      playBtn.setAttribute('aria-label', s === 'done' ? 'استمع من البداية' : playing ? 'إيقاف مؤقت' : s === 'paused' ? 'متابعة' : 'تشغيل');
      if (s !== 'shadow') { setRing(1); if (nowS && nowS.el) nowS.el.classList.remove('rd-turn'); }
      if (s !== 'shadow') status.textContent = STATUS[s] || '';
      if (s === 'playing' || s === 'shadow') done.hidden = true;
    }
    narr = createNarrator({
      sentences: flat,
      rate: curRate,
      shadow: () => UI.shadow,
      loop: () => UI.loop,
      on: {
        state: paintState,
        sentence: (S, i) => { setNow(S); seek.value = String(i + 1); seekProg(i); seekLab.textContent = label(0, i); ensureVisible(S); },
        word: (S, k) => setWord(S, k),
        shadow: (S, left, total) => {
          if (S.el) S.el.classList.add('rd-turn');
          clearWord();
          setRing(left / total);
          status.textContent = left > 0 ? `دورك الآن — كرّر الجملة بصوتك (${Math.ceil(left / 1000)})` : '';
        },
        sentenceDone: (S, i) => { if (narr && narr.heard >= N) listenComplete(); },
        done: () => {
          done.hidden = false;
          $('[data-donetitle]', el).textContent = narr.heard >= N ? 'أحسنت! أنهيت الاستماع للقطعة كاملة' : 'وصلنا إلى نهاية القطعة';
          $('[data-donesub]', el).textContent = narr.heard >= N ? 'الخطوة التالية: اختبر فهمك بالأسئلة.' : 'استمع إلى باقي الجمل لتحصل على نقاط الاستماع الكامل.';
          const box = done.getBoundingClientRect(), d = dock.getBoundingClientRect();
          if (box.bottom > d.top - 8) window.scrollBy({ top: box.bottom - d.top + 16, behavior: calm() ? 'auto' : 'smooth' });
        },
        interrupted: () => { status.textContent = 'توقف الصوت لأن صوتاً آخر بدأ — اضغط متابعة'; },
        error: reason => {
          status.textContent = reason === 'unsupported' ? 'القراءة الصوتية غير مدعومة في هذا المتصفح' : 'تعذّر تشغيل الصوت على هذا الجهاز. تحقق من مستوى الصوت أو جرّب متصفحاً آخر.';
          U.toast('تعذّر تشغيل الصوت');
        }
      }
    });
    c.cleanup(() => narr.destroy());
    function listenComplete() {
      if (awardOnce(u.id + ':listen', 10, 'استماع كامل')) party();
    }
    function syncOpts() {                                             // narrow phones: speed + toggles live behind the gear button
      dock.classList.toggle('rd-opts-open', UI.optsOpen);
      const ob = $('[data-optbtn]', dock); ob.setAttribute('aria-expanded', String(UI.optsOpen));
      ob.toggleAttribute('data-on', UI.shadow || UI.loop || hide.on || UI.mult !== 1);
    }
    paintState('idle');
    setNow(flat[0]);
    syncOpts();

    // tab hidden / page hidden: pause so audio never plays in a background tab with an out-of-sync screen
    c.on(document, 'visibilitychange', () => { if (document.hidden) narr.pause(); });
    c.on(window, 'pagehide', () => narr.stop());

    dock.addEventListener('click', e => {
      const a = e.target.closest('[data-act]');
      if (a) {
        const k = a.dataset.act;
        if (k === 'toggle') {
          if (narr.state === 'idle') {
            narr.play(narr.index);
            if (window.innerWidth <= 380 && UI.optsOpen && !UI.optsPinned) { UI.optsOpen = false; syncOpts(); }   // narrow phone: give the text room once listening starts
          } else narr.toggle();
        }
        else if (k === 'prev') narr.prev(); else if (k === 'next') narr.next(); else if (k === 'restart') narr.restart();
        return;
      }
      if (e.target.closest('[data-optbtn]')) { UI.optsOpen = !UI.optsOpen; UI.optsPinned = true; syncOpts(); return; }
      const m = e.target.closest('[data-mult]');
      if (m) {
        UI.mult = +m.dataset.mult;
        $$('[data-mult]', dock).forEach(b => b.setAttribute('aria-pressed', String(b === m)));
        syncOpts();
        if (narr.state === 'playing') narr.play(narr.index);          // apply the new speed right away
        return;
      }
      const t = e.target.closest('[data-tog]');
      if (t) {
        const k = t.dataset.tog;
        if (k === 'hide') {
          hide.on = !hide.on; t.setAttribute('aria-pressed', String(hide.on));
          root.classList.toggle('rd-hide', hide.on); veil.hidden = !hide.on;
          t.querySelector('span').textContent = hide.on ? 'أظهر النص' : 'أخفِ النص';
          t.querySelector('svg').outerHTML = hide.on ? IC.eye : IC.eyeOff;
        } else { UI[k] = !UI[k]; t.setAttribute('aria-pressed', String(UI[k])); if (k === 'shadow' && !UI.shadow && narr.state === 'shadow') narr.skipShadow(); }
        syncOpts();
      }
    });
    status.addEventListener('click', () => narr.skipShadow());
    seek.addEventListener('input', () => { seekLab.textContent = label(0, +seek.value - 1); seekProg(+seek.value - 1); });
    seek.addEventListener('change', () => narr.seek(+seek.value - 1));
    veil.addEventListener('click', () => { const t = $('[data-tog="hide"]', dock); if (t) t.click(); });
    $('[data-act="again"]', el).addEventListener('click', () => narr.play(0));

    /* ---- tap a sentence: start from there (and show the word meaning) ---- */
    passage.addEventListener('click', e => {
      if (hasSelection() || hide.on) return;
      const sEl = e.target.closest('.rd-s');
      if (!sEl) return;
      const S = flat[+sEl.dataset.g];
      const w = e.target.closest('.rd-w');
      const live = narr.state === 'playing' || narr.state === 'shadow' || narr.state === 'paused';
      if (!(live && narr.index === S.g)) narr.play(S.g);
      if (w) popup.open(w, S, +w.dataset.i, e.detail === 0);
      else popup.close();
    });
  }

  /* ============================================================
     12. STORY mode (swipeable cards)
     ============================================================ */
  function mountStory(c) {
    const { el, u, r, model } = c;
    const cards = model.paras.filter(P => P.sents.length), N = cards.length;
    let h = pageTop(c, 'story');
    if (!N) { el.innerHTML = h + emptyHTML + ctaHTML(u, r); return; }
    markKeywords(model, c.lex);
    const can = !!(TAF.tts && TAF.tts.ok && window.speechSynthesis);
    const gist = Array.isArray(r.gist) ? r.gist : [], tr = Array.isArray(r.tr) ? r.tr : [];
    const distinct = new Set(cards.map(P => gist[P.p]).filter(Boolean));
    const canCheck = distinct.size >= 3;
    const cs = cards.map(() => ({ tr: false, check: null, result: null, pick: -1, shown: false }));
    const seen = new Set();
    let cur = 0, narr = null, nowS = null, nowW = null, active = 0, lastT = performance.now(), completed = false, rightCount = 0, askedCount = 0, dir = 0;

    h += `<section class="rd-story" data-story aria-roledescription="carousel" aria-label="${esc(r.title)}">
      <div class="rd-dots" role="group" aria-label="التنقل بين البطاقات" data-dots>${cards.map((P, k) => `<button type="button" class="rd-dot" data-dot="${k}" aria-label="الفقرة ${k + 1} من ${N}"><i></i></button>`).join('')}<button type="button" class="rd-dot rd-dot-end" data-dot="${N}" aria-label="ملخص القصة">${IC.sparkle}</button></div>
      <div class="rd-stage" data-stage></div>
      <div class="sr" role="status" aria-live="polite" data-live></div>
    </section>
    <div class="rd-dock rd-dock-story" data-sdock>
      <button type="button" class="btn ghost rd-nb" data-nav="prev">${IC.prev2}<span>السابق</span></button>
      <span class="rd-nb-count" data-count dir="ltr"></span>
      <button type="button" class="btn rd-nb" data-nav="next"><span data-nexttxt>التالي</span>${IC.next2}</button>
    </div>`;
    h += printHTML(c);
    el.innerHTML = h;
    const stage = $('[data-stage]', el), live = $('[data-live]', el), dots = $$('[data-dot]', el);
    const prevB = $('[data-nav="prev"]', el), nextB = $('[data-nav="next"]', el);
    syncNavHeight(c);
    wirePrint(c);

    const popup = createPopup(c, {
      onSpeak: () => { if (narr && narr.state === 'playing') narr.pause(); },
      trHint: {
        has: S => !!tr[S.p] && cur < N,
        run: () => {
          const k = cur; if (!cs[k]) return;
          cs[k].tr = true;
          const box = $('[data-trbox]', stage), b = $('[data-tr]', stage);
          if (box) { box.hidden = false; box.scrollIntoView({ block: 'nearest', behavior: calm() ? 'auto' : 'smooth' }); }
          if (b) { b.setAttribute('aria-pressed', 'true'); $('span', b).textContent = 'إخفاء الترجمة'; }
        }
      }
    });

    /* ---------- card html ---------- */
    function makeCheck(k) {
      const idx = cards[k].p, pool = [];
      cards.forEach(P => { if (P.p !== idx && gist[P.p] && gist[P.p] !== gist[idx]) pool.push(P.p); });
      const others = U.shuffle(Array.from(new Set(pool.map(p => gist[p]))).map(txt => pool.find(p => gist[p] === txt)));
      if (!gist[idx] || others.length < 2) return null;
      return U.shuffle([idx, others[0], others[1]]);
    }
    function checkHTML(k) {
      const s = cs[k];
      if (!canCheck || !gist[cards[k].p]) return '';
      if (!s.check) s.check = makeCheck(k);
      if (!s.check) return '';
      const idx = cards[k].p, LET = ['أ', 'ب', 'ج'];
      if (!s.result) {
        return `<div class="rd-check" data-check><div class="rd-check-q">${IC.target}<span>ما الفكرة الرئيسية لهذه الفقرة؟</span><em class="rd-check-xp" dir="ltr">+5</em></div>
          <div class="rd-opts" role="group" aria-label="اختر الفكرة الرئيسية">${s.check.map((p, j) => `<button type="button" class="rd-opt" data-opt="${j}"><span class="rd-opt-n" aria-hidden="true">${LET[j]}</span><span class="rd-opt-t" lang="ar" dir="rtl">${md(gist[p])}</span></button>`).join('')}</div>
          <button type="button" class="rd-skip" data-skip>تخطَّ وأظهر الفكرة الرئيسية</button></div>`;
      }
      const ok = s.result === 'right';
      const mascot = (TAF.mascot && s.result !== 'skip') ? `<span class="rd-mascot">${TAF.mascot(ok ? 'cheer' : 'think', 64)}</span>` : '';
      if (s.result === 'skip') return '';
      return `<div class="rd-check rd-${ok ? 'ok' : 'no'}" data-check>
        <div class="rd-opts rd-opts-done" role="group">${s.check.map((p, j) => `<div class="rd-opt ${p === idx ? 'rd-right' : (j === s.pick ? 'rd-wrong' : 'rd-dim')}"><span class="rd-opt-n" aria-hidden="true">${p === idx ? IC.check : (j === s.pick ? IC.x : LET[j])}</span><span class="rd-opt-t" lang="ar" dir="rtl">${md(gist[p])}</span></div>`).join('')}</div>
        <div class="rd-fb" role="status">${mascot}<div><b>${ok ? 'أحسنت! هذه هي الفكرة الرئيسية' : 'ليست هذه بالضبط'}</b><span>${ok ? 'عمل رائع — تابع القصة.' : 'الفكرة الصحيحة هي الخيار المظلّل بالأخضر. تابع وسنلتقط الفكرة التالية.'}</span></div>
          ${ok ? `<i class="rd-sparks" aria-hidden="true">${'<b></b>'.repeat(8)}</i>` : ''}</div>
        <button type="button" class="btn rd-continue" data-continue>${k === N - 1 ? 'عرض الملخص' : 'متابعة'}${IC.next2}</button></div>`;
    }
    function gistHTML(k) {
      const g = gist[cards[k].p];
      if (!g) return '';
      const s = cs[k], open = !canCheck || s.result || s.shown;
      if (open) return `<div class="rd-gist rd-gist-card" data-gistbox><span class="rd-gist-lab">${IC.bulb}<span>الفكرة الرئيسية</span></span><span class="rd-gist-t" lang="ar" dir="rtl">${md(g)}</span></div>`;
      return `<button type="button" class="rd-gist rd-gist-lock" data-reveal>${IC.bulb}<span>أظهر الفكرة الرئيسية</span></button>`;
    }
    function trHTML(k) {
      const t = tr[cards[k].p];
      if (!t) return '';
      return `<div class="rd-tr" data-trbox lang="ar" dir="rtl"${cs[k].tr ? '' : ' hidden'}><span class="rd-tr-lab">ترجمة الفقرة</span><p>${md(t)}</p></div>`;
    }
    function cardHTML(k) {
      const P = cards[k], hasKw = P.sents.some(S => S.kw && S.kw.some(x => x != null));
      return `<article class="rd-card" data-card="${k}" aria-label="الفقرة ${k + 1} من ${N}">
        <header class="rd-card-head"><span class="rd-badge">الفقرة <b dir="ltr">${k + 1} / ${N}</b></span><span class="rd-card-title en" lang="en" dir="ltr">${esc(r.title)}</span></header>
        <div data-gistslot>${gistHTML(k)}</div>
        <p class="rd-bigtext" lang="en" dir="ltr">${paraInner(P, { kw: true })}</p>
        ${hasKw ? `<p class="rd-kwhint">${IC.marker}<span>اضغط على الكلمات المظلّلة لمعناها</span></p>` : ''}
        <div class="rd-card-acts">
          ${can ? `<button type="button" class="rd-act rd-act-narr" data-narr aria-pressed="false">${IC.speaker}<span>استمع للفقرة</span></button>` : ''}
          ${tr[P.p] ? `<button type="button" class="rd-act" data-tr aria-pressed="${cs[k].tr}">${IC.translate}<span>${cs[k].tr ? 'إخفاء الترجمة' : 'ترجمة'}</span></button>` : ''}
        </div>
        ${trHTML(k)}
        <div data-checkslot>${checkHTML(k)}</div>
      </article>`;
    }
    function recapHTML() {
      const rows = cards.map((P, k) => {
        const g = gist[P.p];
        return `<li><span class="rd-pn">${k + 1}</span>${g ? `<span lang="ar" dir="rtl">${md(g)}</span>` : `<span class="en" lang="en" dir="ltr">${esc(P.sents[0].text)}</span>`}</li>`;
      }).join('');
      const secs = Math.max(1, Math.round(active / 1000)), wpm = Math.round(c.nWords / (secs / 60));
      const stats = [`<div><b dir="ltr">${U.fmtTime(secs)}</b><small>وقت القراءة</small></div>`, `<div><b dir="ltr">${secs >= 20 ? wpm : '—'}</b><small>كلمة / دقيقة</small></div>`];
      if (askedCount) stats.push(`<div><b dir="ltr">${rightCount} / ${askedCount}</b><small>أفكار صحيحة</small></div>`);
      return `<article class="rd-card rd-recap" data-card="${N}" aria-label="ملخص القصة">
        <div class="rd-recap-top">${TAF.mascot ? `<span class="rd-mascot">${TAF.mascot('cheer', 78)}</span>` : IC.sparkle}<div><h2>أنهيت القصة!</h2><p class="muted">${completed && recapXp ? `ربحت ${recapXp} نقطة. ` : ''}هذه أفكار القطعة بالترتيب:</p></div></div>
        <ol class="rd-recap-list">${rows}</ol>
        <div class="rd-stats">${stats.join('')}</div>
        <div class="rd-recap-act"><a class="btn" href="#/unit/${u.id}/reading/questions">أجب عن الأسئلة</a><button type="button" class="btn ghost" data-restart>${IC.restart}<span>اقرأ مرة أخرى</span></button><a class="btn ghost" href="#/unit/${u.id}/reading?m=read">الوضع التقليدي</a></div>
      </article>`;
    }
    let recapXp = 0;

    /* ---------- narration of the current card ---------- */
    const clearWord = () => { if (nowW) { nowW.classList.remove('rd-nw'); nowW = null; } };
    function destroyNarr() {
      if (narr) { narr.destroy(); narr = null; }
      if (nowS && nowS.el) nowS.el.classList.remove('rd-now');
      nowS = null; clearWord();
    }
    function paintNarr(stt) {
      const b = $('[data-narr]', stage); if (!b) return;
      const playing = stt === 'playing';
      b.classList.toggle('rd-playing', playing);
      b.setAttribute('aria-pressed', String(playing));
      b.innerHTML = `${playing ? IC.pause : IC.speaker}<span>${playing ? 'إيقاف مؤقت' : stt === 'paused' ? 'متابعة الاستماع' : 'استمع للفقرة'}</span>`;
    }
    function startNarr() {
      const P = cards[cur];
      if (!narr) {
        narr = createNarrator({
          sentences: P.sents, rate: curRate, shadow: () => false, loop: () => false,
          on: {
            state: s => { paintNarr(s); if (s === 'done') { if (nowS && nowS.el) nowS.el.classList.remove('rd-now'); clearWord(); } },
            sentence: S => { if (nowS && nowS.el && nowS !== S) nowS.el.classList.remove('rd-now'); clearWord(); nowS = S; if (S.el) S.el.classList.add('rd-now'); },
            word: (S, k) => { if (S !== nowS) return; const w = S.wordEls[k]; if (!w || w === nowW) return; clearWord(); nowW = w; w.classList.add('rd-nw'); },
            interrupted: () => paintNarr('paused'),
            error: reason => { U.toast(reason === 'unsupported' ? 'القراءة الصوتية غير مدعومة في هذا المتصفح' : 'تعذّر تشغيل الصوت على هذا الجهاز'); }
          }
        });
      }
      if (narr.state === 'idle' || narr.state === 'done') narr.play(0); else narr.toggle();
    }

    /* ---------- navigation ---------- */
    const topbarH = () => { const tb = $('.topbar'); return tb ? tb.getBoundingClientRect().bottom : 56; };
    function bindCard() {
      bindSentenceEls(stage, cards[cur] ? cards[cur].sents : []);
    }
    function tickTime() {
      const now = performance.now();
      if (!document.hidden) active += Math.min(now - lastT, 180000);
      lastT = now;
    }
    function show(k, d, opts) {
      opts = opts || {};
      tickTime();
      popup.close(); destroyNarr();
      dir = d || 0;
      cur = clamp(k, 0, N);
      seen.add(cur);
      recapXp = 0;
      if (!completed && seen.size >= N + 1) {                      // every card and the recap were visited
        completed = true;
        if (awardOnce(u.id + ':story', 25, 'أنهيت القصة')) { recapXp = 25; party('big'); }
        else store.markDone(u.id + ':story');
      }
      stage.innerHTML = cur < N ? cardHTML(cur) : recapHTML();
      const card = stage.firstElementChild;
      if (card && !calm()) card.classList.add(dir > 0 ? 'rd-in-r' : dir < 0 ? 'rd-in-l' : 'rd-in-0');
      bindCard();
      dots.forEach((b, i) => {
        b.classList.toggle('rd-on', i === cur); b.classList.toggle('rd-seen', seen.has(i) && i !== cur);
        if (i === cur) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
      prevB.disabled = cur === 0; nextB.disabled = cur === N;
      $('[data-nexttxt]', el).textContent = cur === N - 1 ? 'الملخص' : 'التالي';
      $('[data-count]', el).textContent = cur < N ? `${cur + 1} / ${N}` : '✓';
      live.textContent = cur < N ? `الفقرة ${cur + 1} من ${N}` : 'ملخص القصة';
      if (!opts.noScroll) scrollToStory();
    }
    function scrollToStory() {
      const top = $('[data-dots]', el).getBoundingClientRect().top + window.scrollY - topbarH() - 8;
      if (Math.abs(window.scrollY - top) > 4) window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    }
    const next = () => { if (cur < N) show(cur + 1, 1); };
    const prev = () => { if (cur > 0) show(cur - 1, -1); };

    prevB.addEventListener('click', prev);
    nextB.addEventListener('click', next);
    $('[data-dots]', el).addEventListener('click', e => { const b = e.target.closest('[data-dot]'); if (b) { const k = +b.dataset.dot; if (k !== cur) show(k, k > cur ? 1 : -1); } });
    // RTL UI: swiping / pressing towards the left moves forward
    c.on(document, 'keydown', e => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t && t.closest && t.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (popup.isOpen() && e.key === 'Escape') return;
      if (document.querySelector('.ui-back')) return;                 // an app dialog (level-up, badge…) is open on top
      if (e.key === 'ArrowLeft') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); prev(); }
    });

    /* ---------- touch swipe (pointer events; vertical scrolling stays native) ---------- */
    (function swipe() {
      let id = null, sx = 0, sy = 0, dx = 0, drag = false, card = null, swallow = false;
      stage.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse' || (e.isPrimary === false)) return;
        if (e.target.closest('button, a, input, textarea')) return;
        id = e.pointerId; sx = e.clientX; sy = e.clientY; dx = 0; drag = false; card = stage.firstElementChild;
      });
      stage.addEventListener('pointermove', e => {
        if (id !== e.pointerId || !card) return;
        dx = e.clientX - sx; const dy = e.clientY - sy;
        if (!drag && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.4) { drag = true; card.classList.add('rd-dragging'); try { stage.setPointerCapture(id); } catch (err) { /* ignore */ } }
        if (drag) {
          const lim = (dx < 0 && cur >= N) || (dx > 0 && cur <= 0) ? 0.25 : 1;       // rubber-band at the ends
          card.style.transform = `translateX(${dx * lim}px) rotate(${(dx * lim) / 60}deg)`;
          card.style.opacity = String(1 - Math.min(0.45, Math.abs(dx) / 500));
        }
      });
      const end = e => {
        if (id !== e.pointerId) return;
        const was = drag, d = dx; id = null;
        if (card) { card.classList.remove('rd-dragging'); card.style.transform = ''; card.style.opacity = ''; }
        card = null; drag = false;
        if (was) {
          swallow = true; setTimeout(() => { swallow = false; }, 60);
          if (e.type === 'pointerup' && Math.abs(d) > 56) { if (d < 0) next(); else prev(); }
        }
      };
      stage.addEventListener('pointerup', end);
      stage.addEventListener('pointercancel', end);
      stage.addEventListener('click', e => { if (swallow) { e.stopPropagation(); e.preventDefault(); } }, true);
    })();

    /* ---------- taps inside a card ---------- */
    function refreshCheck(k) {
      $('[data-checkslot]', stage).innerHTML = checkHTML(k);
      $('[data-gistslot]', stage).innerHTML = gistHTML(k);
    }
    stage.addEventListener('click', e => {
      if (hasSelection()) return;
      const card = e.target.closest('.rd-card'); if (!card) return;
      const k = +card.dataset.card;
      const w = e.target.closest('.rd-w');
      if (w && cur < N) {
        const S = model.flat[+w.closest('.rd-s').dataset.g];
        if (S) popup.open(w, S, +w.dataset.i, e.detail === 0);
        return;
      }
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-narr')) { popup.close(); return startNarr(); }
      if (b.hasAttribute('data-tr')) {
        cs[k].tr = !cs[k].tr;
        const box = $('[data-trbox]', stage); if (box) box.hidden = !cs[k].tr;
        b.setAttribute('aria-pressed', String(cs[k].tr)); $('span', b).textContent = cs[k].tr ? 'إخفاء الترجمة' : 'ترجمة';
        return;
      }
      if (b.hasAttribute('data-reveal') || b.hasAttribute('data-skip')) {
        cs[k].result = 'skip'; cs[k].shown = true; refreshCheck(k);
        const g = $('[data-gistbox]', stage);                         // the revealed idea sits above the text: bring it into view
        if (g) { const r = g.getBoundingClientRect(); if (r.top < topbarH() + 6 || r.bottom > innerHeight - 8) window.scrollBy({ top: r.top - topbarH() - 14, behavior: calm() ? 'auto' : 'smooth' }); }
        return;
      }
      if (b.hasAttribute('data-opt')) {
        const j = +b.dataset.opt, ok = cs[k].check[j] === cards[k].p;
        cs[k].pick = j; cs[k].result = ok ? 'right' : 'wrong'; cs[k].shown = true;
        askedCount++; if (ok) rightCount++;
        refreshCheck(k);
        if (ok) { sfx('ok'); awardOnce(u.id + ':sc' + cards[k].p, 5, 'فكرة رئيسية صحيحة'); } else sfx('no');
        const fb = $('.rd-fb', stage); if (fb) { try { fb.scrollIntoView({ block: 'nearest', behavior: calm() ? 'auto' : 'smooth' }); } catch (err) { /* ignore */ } }
        return;
      }
      if (b.hasAttribute('data-continue')) return next();
      if (b.hasAttribute('data-restart')) return show(0, -1);
    });
    // keyword buttons: keyboard activation
    stage.addEventListener('keydown', e => {
      const w = e.target.closest && e.target.closest('.rd-kw');
      if (w && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); w.click(); }
    });

    c.on(document, 'visibilitychange', () => { if (document.hidden && narr) narr.pause(); tickTime(); });
    c.on(window, 'pagehide', () => destroyNarr());
    c.cleanup(destroyNarr);
    show(0, 0, { noScroll: true });
    // the router scrolls to the top after the view is built; bring the cards up under the top bar right after that
    c.timer(() => { if (window.scrollY < 40) scrollToStory(); }, 60);
  }

  /* ============================================================
     13. comprehension questions (unchanged behaviour of the original view)
     ============================================================ */
  function mountQuestions(el, u, r) {
    let h = crumbs([['الوحدات', '#/units'], [`الوحدة ${u.n}`, `#/unit/${u.id}`], ['القراءة']]);
    h += `<div id="qz"></div>`; el.innerHTML = h;
    const qs = (r.qs || []).map(q => Object.assign(Object.create(q), { passage: [`**${r.title}**`, ...r.text.map((p, i) => `(${i + 1}) ` + p)], passageOpen: false }));
    // keep ids/topics from the prototype
    TAF.Quiz.run(U.$('#qz', el), qs, { onExit: () => go(`#/unit/${u.id}/reading`), doneLabel: 'عودة للوحدة', onDone: () => go(`#/unit/${u.id}`), onFinish: res => { if (res.pct >= 60) store.markDone(u.id + ':reading'); } });
  }

  /* ============================================================
     14. entry point
     ============================================================ */
  function render(el, args, query) {
    const id = args[0], sub = args[1];
    const u = TAF.byId[id];
    if (!u || !u.reading) return V.notFound ? V.notFound(el) : (el.innerHTML = '<div class="empty">غير موجود</div>');
    const r = u.reading;
    if (sub === 'questions') return mountQuestions(el, u, r);
    const q = query && typeof query.get === 'function' ? query.get('m') : null;
    const mode = q === 'listen' || q === 'story' ? q : 'read';
    el.classList.add('rd-main');
    el.classList.toggle('rd-calm', calm());
    const c = makeCtx(el, u, r, mode);
    // the router builds the next <main> with cloneNode(false), which copies attributes: leave no trace on the element
    c.cleanup(() => { el.classList.remove('rd-main', 'rd-calm'); el.style.removeProperty('--rd-nav'); });
    if (mode === 'listen') mountListen(c); else if (mode === 'story') mountStory(c); else mountRead(c);
  }

  V.reading = function (el, args, query) {
    try { return render(el, args, query); } catch (err) {
      console.error('[reader] falling back to the plain reading view', err);
      if (typeof legacyReading === 'function') { el.innerHTML = ''; el.classList.remove('rd-main', 'rd-calm'); el.style.removeProperty('--rd-nav'); return legacyReading(el, args, query); }
      throw err;
    }
  };
  TAF.reader = { buildModel, buildLex, splitSentences, chunkSentence, forms, lookup, wd: WD, version: '1.0' };
})();

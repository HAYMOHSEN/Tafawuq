/* Tafawuq English — screens. Each view renders into <main>. */
(function () {
  'use strict';
  const TAF = window.TAF, U = TAF.util, md = U.md, esc = U.esc, store = TAF.store, I = TAF.icon;
  const V = TAF.views = {};
  const S = () => store.s;
  const grade = () => S().settings.grade;
  const go = h => { location.hash = h; };

  /* ---------- helpers ---------- */
  const crumbs = items => `<nav class="crumbs" aria-label="مسار التنقل">${items.map(([t, h]) => h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`).join('<span aria-hidden="true">‹</span>')}</nav>`;
  const ring = (pct, label) => `<div class="ring" style="--p:${Math.round(pct)}" aria-label="${esc(label || '')} ${Math.round(pct)}%"><b>${Math.round(pct)}%</b></div>`;
  const row = (href, title, desc, right, lead) => `<a href="${href}">${lead || ''}<span class="grow"><span class="t">${title}</span>${desc ? `<span class="d">${desc}</span>` : ''}</span>${right || `<span class="chev">${I.chevron}</span>`}</a>`;
  const doneMark = ok => ok ? `<span style="color:var(--green)">${I.check}</span>` : `<span class="chev">${I.chevron}</span>`;
  const empty = (icon, text, action) => `<div class="empty">${icon}<p>${text}</p>${action || ''}</div>`;

  // unit sections and progress
  function sections(u) {
    const list = [{ key: 'vocab', title: 'المفردات', en: 'Vocabulary', href: `#/unit/${u.id}/vocab`, icon: I.cards }];
    (u.grammar || []).forEach((g, i) => list.push({ key: 'gr:' + g.id, title: 'القواعد: ' + g.ar, en: g.title, href: `#/unit/${u.id}/grammar/${i}`, icon: I.pen }));
    if (u.reading) list.push({ key: 'reading', title: 'القراءة', en: u.reading.title, href: `#/unit/${u.id}/reading`, icon: I.book });
    if (u.writing) list.push({ key: 'writing', title: 'الكتابة: ' + u.writing.ar, en: u.writing.type, href: `#/unit/${u.id}/writing`, icon: I.sheet });
    if (u.speaking) list.push({ key: 'speaking', title: 'التعبيرات الشفوية', en: u.speaking.title, href: `#/unit/${u.id}/speaking`, icon: I.chat });
    list.push({ key: 'test', title: 'اختبار الوحدة', en: 'Unit test', href: `#/unit/${u.id}/test`, icon: I.exam });
    return list;
  }
  function secDone(u, key) {
    if (key === 'vocab') { const n = (u.vocab || []).length; return n && TAF.srs.learnedCount(u) / n >= 0.8; }
    if (key === 'test') return (S().tests[u.id] || 0) >= 60;
    return store.isDone(u.id + ':' + key);
  }
  function unitProgress(u) { const s = sections(u); return s.filter(x => secDone(u, x.key)).length / s.length * 100; }
  TAF.unitProgress = unitProgress;
  function nextStep(g) {
    for (const u of TAF.unitsFor(g)) for (const s of sections(u)) if (!secDone(u, s.key)) return { u, s };
    return null;
  }
  TAF.nextStep = nextStep;
  TAF.unitSections = sections;
  TAF.sectionDone = secDone;

  /* ---------- HOME ---------- */
  V.home = function (el) {
    const g = grade(), s = S(); store.rollDay();
    const units = TAF.unitsFor(g);
    const due = TAF.srs.dueCards(g).length;
    const mistakes = Object.keys(s.mistakes).filter(id => TAF.qIndex[id] && TAF.byId[TAF.qIndex[id].unit].grade === g).length;
    const nx = nextStep(g);
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'صباح الخير' : hour < 18 ? 'مساء الخير' : 'مساء النور';
    const name = s.settings.name ? '، ' + esc(s.settings.name) : '';
    const overall = units.length ? units.reduce((a, u) => a + unitProgress(u), 0) / units.length : 0;
    let h = `<div class="hello"><h1>${greet}${name}</h1><p class="muted" style="margin:0">الصف ${g === 11 ? 'الحادي عشر' : 'الثاني عشر'} · أنجزت ${Math.round(overall)}% من المنهاج</p></div>`;

    if (nx) {
      h += `<a class="sheet next-card" href="${nx.s.href}" style="display:block;text-decoration:none;color:inherit">
        <div class="label">خطوتك التالية</div>
        <div class="what">الوحدة ${nx.u.n}: ${esc(nx.s.title)}</div>
        <div class="muted small"><span class="en">${esc(nx.u.title)}</span> — <span class="en">${esc(nx.s.en)}</span></div>
        <div style="margin-top:.7rem"><span class="btn sm">ابدأ الآن</span></div></a>`;
    } else if (units.length) {
      h += `<div class="sheet next-card"><div class="what">أنهيت كل أقسام المنهاج 🎉</div><p class="muted">حافظ على مستواك بالمراجعة اليومية وامتحانات المحاكاة.</p><a class="btn sm" href="#/exam">امتحان محاكاة</a></div>`;
    }

    // today's plan
    const goal = 20, answered = s.daily.answered;
    const tasks = [];
    tasks.push({ done: due === 0, txt: due ? `راجع ${due} من البطاقات المستحقة اليوم` : 'لا بطاقات مستحقة للمراجعة اليوم', href: '#/review', btn: 'راجع' });
    const newLeft = Math.max(0, s.settings.newPerDay - s.daily.newToday);
    tasks.push({ done: newLeft === 0, txt: newLeft ? `تعلّم ${newLeft} كلمات جديدة` : 'تعلّمت كلمات اليوم الجديدة', href: '#/review?new=1', btn: 'تعلّم' });
    tasks.push({ done: answered >= goal, txt: `أجب عن ${goal} سؤالاً (أنجزت ${Math.min(answered, goal)})`, href: '#/drill', btn: 'تدرّب' });
    if (mistakes) tasks.push({ done: false, txt: `صحّح ${mistakes} من أخطائك السابقة`, href: '#/mistakes', btn: 'صحّح' });
    h += `<h2>خطة اليوم</h2><div class="sheet"><ul class="task-list">${tasks.map(t => `<li class="${t.done ? 'done' : ''}"><span class="box">${t.done ? I.check : ''}</span><span class="txt">${t.txt}</span>${t.done ? '' : `<a class="btn ghost sm" href="${t.href}">${t.btn}</a>`}</li>`).join('')}</ul></div>`;

    // exam countdown + streak
    h += `<div class="grid2" style="margin-top:.9rem">`;
    if (s.settings.examDate) {
      const days = U.dayDiff(U.today(), s.settings.examDate);
      const left = units.filter(u => unitProgress(u) < 100).length;
      h += `<div class="sheet"><div class="small muted">العد التنازلي للامتحان</div><div class="countdown"><b>${Math.max(0, days)}</b><span>${days === 1 ? 'يوم' : 'يوماً'}</span></div><div class="small muted">${left ? `بقيت ${left} وحدات غير مكتملة — حوالي ${Math.max(1, Math.ceil(days / Math.max(1, left)))} يوم لكل وحدة` : 'كل الوحدات مكتملة، ركّز على المحاكاة'}</div></div>`;
    } else {
      h += `<a class="sheet" href="#/more" style="text-decoration:none;color:inherit"><div class="small muted">العد التنازلي للامتحان</div><div style="font-weight:500;margin:.2rem 0">حدّد موعد امتحانك</div><div class="small muted">لنقسم الوحدات على الأيام المتبقية</div></a>`;
    }
    h += `<div class="sheet"><div class="small muted">أيام الدراسة المتتالية</div><div class="countdown"><b>${s.streak.last === U.today() || U.dayDiff(s.streak.last || U.today(), U.today()) === 1 ? s.streak.count : 0}</b><span>يوم</span></div><div class="small muted">ادرس ولو 10 دقائق يومياً لتحافظ عليها</div></div>`;
    h += `</div>`;

    h += `<h2>اختصارات</h2><div class="ruled">`;
    h += row('#/units', 'وحدات الكتاب', `${units.length} وحدة · ${g === 11 ? 'Grade 11' : 'Grade 12'}`, null, `<span class="num">${I.book}</span>`);
    h += row('#/cheatsheet', 'ملخص القواعد', 'قواعد كل وحدة في صفحة واحدة للمراجعة السريعة والطباعة', null, `<span class="num">${I.sheet}</span>`);
    h += row('#/exam', 'امتحانات المحاكاة', 'بنمط الامتحان الوزاري مع مؤقت وتصحيح فوري', null, `<span class="num">${I.exam}</span>`);
    h += `</div>`;
    el.innerHTML = h;
  };

  /* ---------- UNITS ---------- */
  V.units = function (el) {
    const g = grade(), units = TAF.unitsFor(g);
    let h = `<div class="page-head"><h1>وحدات الصف ${g === 11 ? 'الحادي عشر' : 'الثاني عشر'}</h1><p class="sub">مرتبة كما في كتاب الطالب المقرر</p></div>`;
    if (!units.length) { el.innerHTML = h + empty(I.book, 'المحتوى قيد الإعداد لهذا الصف.'); return; }
    [1, 2].forEach(sem => {
      const list = units.filter(u => u.sem === sem);
      if (!list.length) return;
      h += `<div class="sem-label">الفصل الدراسي ${sem === 1 ? 'الأول' : 'الثاني'}</div><div class="ruled">`;
      list.forEach(u => {
        const p = unitProgress(u);
        h += `<a href="#/unit/${u.id}"><span class="num">${u.n}</span><span class="grow"><span class="t en" style="text-align:right">${esc(u.title)}</span><span class="d">${esc(u.ar)} — ${esc(u.topics)}</span></span>${ring(p, 'التقدم')}</a>`;
      });
      h += `</div>`;
    });
    const extras = TAF.extras.filter(x => x.grade === g);
    if (extras.length) {
      h += `<div class="sem-label">إضافات</div><div class="ruled">`;
      extras.forEach(x => { h += row(`#/extra/${x.id}`, esc(x.ar), esc(x.title), null, `<span class="num">${I.star}</span>`); });
      h += `</div>`;
    }
    el.innerHTML = h;
  };

  /* ---------- UNIT OVERVIEW ---------- */
  V.unit = function (el, [id]) {
    const u = TAF.byId[id]; if (!u) return V.notFound(el);
    if (!store.isDone('open:' + u.id)) store.markDone('open:' + u.id);
    if (S().settings.grade !== u.grade) { S().settings.grade = u.grade; store.save(); TAF.app && TAF.app.syncGrade(); }
    let h = crumbs([['الوحدات', '#/units'], [`الوحدة ${u.n}`]]);
    h += `<div class="page-head"><div class="unit-num">الصف ${u.grade} · الفصل ${u.sem === 1 ? 'الأول' : 'الثاني'} · الوحدة ${u.n}</div><h1 class="unit-title"><span>${esc(u.title)}</span></h1><p class="sub" style="margin-top:.4rem">${esc(u.ar)} — ${esc(u.topics)}</p></div>`;
    h += `<div class="sheet"><h3 style="margin-top:0">ماذا ستتعلم؟</h3><ul class="summary-list">${(u.goals || []).map(g => `<li>${md(g)}</li>`).join('')}</ul></div>`;
    h += `<h2>أقسام الوحدة</h2><div class="ruled">`;
    sections(u).forEach(s => {
      let desc = `<span class="en">${esc(s.en)}</span>`;
      if (s.key === 'vocab') desc += ` · تعلّمت ${TAF.srs.learnedCount(u)} من ${(u.vocab || []).length}`;
      if (s.key === 'test' && S().tests[u.id] != null) desc += ` · أفضل نتيجة ${S().tests[u.id]}%`;
      h += row(s.href, esc(s.title), desc, doneMark(secDone(u, s.key)), `<span class="num">${s.icon}</span>`);
    });
    h += `</div><div class="row no-print" style="margin-top:1rem"><a class="btn ghost" href="#/unit/${u.id}/summary">${I.print} ملخص الوحدة للطباعة</a></div>`;
    el.innerHTML = h;
  };

  /* ---------- VOCAB ---------- */
  V.vocab = function (el, [id], query) {
    const u = TAF.byId[id]; if (!u) return V.notFound(el);
    const mode = query.get('m') || 'list';
    let h = crumbs([['الوحدات', '#/units'], [`الوحدة ${u.n}`, `#/unit/${u.id}`], ['المفردات']]);
    h += `<div class="page-head"><h1>مفردات الوحدة ${u.n}</h1><p class="sub">${(u.vocab || []).length} كلمة وتعبير — <span class="en">${esc(u.title)}</span></p></div>`;
    const modes = [['list', 'القائمة'], ['cards', 'بطاقات'], ['quiz', 'اختبار المعاني'], ['spell', 'استمع واكتب'], ['match', 'لعبة التوصيل']];
    h += `<div class="chips" role="tablist">${modes.map(([k, t]) => `<a class="chip" role="tab" href="#/unit/${u.id}/vocab?m=${k}" aria-current="${k === mode}">${t}</a>`).join('')}</div><div id="vbody"></div>`;
    el.innerHTML = h;
    const body = U.$('#vbody', el);
    const vocab = u.vocab || [];
    if (mode === 'list') return vocabList(body, vocab, u);
    if (mode === 'cards') return flashSession(body, U.shuffle(vocab), { learn: true, back: `#/unit/${u.id}/vocab` });
    if (mode === 'quiz') return TAF.Quiz.run(body, vocabQuiz(vocab, u, 12), { title: 'اختبار معاني المفردات', onExit: () => go(`#/unit/${u.id}/vocab`), onDone: () => go(`#/unit/${u.id}`) });
    if (mode === 'spell') return spellGame(body, vocab, u);
    if (mode === 'match') return matchGame(body, vocab, u);
  };

  function vocabList(body, vocab, u) {
    let h = `<input class="searchbox" type="search" placeholder="ابحث في الكلمات بالإنجليزية أو العربية" aria-label="بحث في المفردات" data-filter><div class="ruled vocab-list" style="margin-top:.8rem" data-list>`;
    let lastTag = null;
    vocab.forEach(v => {
      if (v.tag && v.tag !== lastTag) { h += `<div class="tag-head en" style="text-align:right">${esc(v.tag)}</div>`; lastTag = v.tag; }
      const st = TAF.srs.state(v.id);
      const starred = TAF.words.has(TAF.words.key(v.unit, v.w));
      h += `<div class="item" data-q="${esc((v.w + ' ' + v.ar + ' ' + v.def).toLowerCase())}">${TAF.speakBtn(v.w, 'انطق ' + v.w)}
        <span class="grow"><span class="w">${esc(v.w)}</span><span class="pos en">${esc(v.pos)}</span>
        <span class="t ar-blur" style="font-weight:500;margin-top:.15rem">${esc(v.ar)}</span>
        <span class="def">${esc(v.def)}</span>
        <span class="ex">${esc(v.ex)} ${TAF.speakBtn(v.ex, 'استمع إلى المثال')}</span></span>
        <button class="speak" type="button" data-star-v="${esc(v.id)}" aria-pressed="${starred}" aria-label="${starred ? 'إزالة من كلماتي' : 'أضف إلى كلماتي'}" title="كلماتي" style="${starred ? 'background:var(--hl);color:var(--ink)' : ''}">${I.star}</button>
        ${st && st.reps ? `<span class="small" style="color:var(--green)" title="في المراجعة">${I.check}</span>` : ''}</div>`;
    });
    h += `</div><div class="row" style="margin-top:1rem"><a class="btn" href="#/unit/${u.id}/vocab?m=cards">${I.cards} ابدأ البطاقات</a><a class="btn ghost" href="#/unit/${u.id}/vocab?m=quiz">اختبر نفسك</a></div>`;
    body.innerHTML = h;
    body.addEventListener('click', e => {
      const sb = e.target.closest('[data-star-v]');
      if (sb) { const v = vocab.find(x => x.id === sb.dataset.starV); if (v) { const on = TAF.words.toggle({ key: TAF.words.key(v.unit, v.w), w: v.w, ar: v.ar, ex: v.ex, unit: v.unit }); sb.style.cssText = on ? 'background:var(--hl);color:var(--ink)' : ''; sb.setAttribute('aria-pressed', on); U.toast(on ? 'أُضيفت إلى كلماتي' : 'أُزيلت من كلماتي'); TAF.game.queueCheck(); } return; }
      const b = e.target.closest('.ar-blur'); if (b) b.classList.toggle('shown');
    });
    U.$('[data-filter]', body).addEventListener('input', e => {
      const t = e.target.value.trim().toLowerCase();
      U.$$('[data-list] .item', body).forEach(it => it.classList.toggle('hidden', !!t && !it.dataset.q.includes(t)));
      U.$$('[data-list] .tag-head', body).forEach(x => x.classList.toggle('hidden', !!t));
    });
  }

  // auto-generated vocabulary questions
  function blankIn(ex, w) {
    const core = w.replace(/\(.*?\)/g, '').replace(/\b(something|someone|sth|sb|one's)\b/g, '').trim();
    if (!core || core.split(/\s+/).length > 3) return null;
    const words = core.split(/\s+/);
    // allow simple inflections on the first word (verbs) or last word (nouns)
    const esc2 = x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const firstStem = words[0].length > 3 ? esc2(words[0].replace(/e$/, '')) + '\\w{0,4}' : esc2(words[0]) + '(?:s|es|ed|ing|d)?';
    const rest = words.slice(1).map(esc2).join('\\s+');
    const re = new RegExp('\\b' + firstStem + (rest ? '\\s+' + rest + '(?:s|es)?' : '') + '\\b', 'i');
    const m = ex.match(re);
    if (!m) return null;
    return { q: ex.replace(m[0], '____'), ans: m[0] };
  }
  // distractor picker: avoids words from the same group/with overlapping meaning so only one option can fit
  function pickDistractors(v, pool, n, sameGrammar) {
    const norm = x => String(x || '').toLowerCase();
    const share = (a, b) => { const A = norm(a.w).replace(/\(.*?\)/g, '').split(/\s+/).filter(t => t.length > 2), B = norm(b.w).replace(/\(.*?\)/g, '').split(/\s+/).filter(t => t.length > 2); return A.some(t => B.includes(t)); };
    const arClash = (a, b) => { const x = a.ar.replace(/\s/g, ''), y = b.ar.replace(/\s/g, ''); return x === y || x.includes(y) || y.includes(x); };
    const ok = x => x !== v && !share(v, x) && !arClash(v, x);
    const tiers = [
      pool.filter(x => ok(x) && x.tag !== v.tag && (!sameGrammar || x.pos === v.pos)),
      pool.filter(x => ok(x) && (!sameGrammar || x.pos === v.pos)),
      pool.filter(ok)
    ];
    const out = [];
    for (const t of tiers) { for (const x of U.shuffle(t)) { if (out.length >= n) break; if (!out.includes(x)) out.push(x); } if (out.length >= n) break; }
    return out;
  }
  function vocabQuiz(vocab, u, n) {
    const qs = [];
    const pool = U.shuffle(vocab).slice(0, n);
    pool.forEach((v, i) => {
      const kind = i % 3;
      const topic = 'vocab:' + v.unit;
      const base = { topic, unit: v.unit, section: 'vocab', wordRef: v };
      if (kind === 0) {
        const opts = U.shuffle([v, ...pickDistractors(v, vocab, 3, false)]);
        qs.push(Object.assign({ id: v.id + '|ar', t: 'mcq', q: v.w, say: v.w, o: opts.map(x => x.ar), a: opts.indexOf(v), arOpts: true, x: `${v.w} = ${v.ar}. مثال: ${v.ex}` }, base));
      } else if (kind === 1) {
        const opts = U.shuffle([v, ...pickDistractors(v, vocab, 3, false)]);
        qs.push(Object.assign({ id: v.id + '|en', t: 'mcq', q: v.ar, rtl: true, o: opts.map(x => x.w), a: opts.indexOf(v), x: `${v.ar} = ${v.w}. ${v.def}` }, base));
      } else {
        const b = blankIn(v.ex, v.w);
        const opts = U.shuffle([v, ...pickDistractors(v, vocab, 3, true)]);
        if (b) qs.push(Object.assign({ id: v.id + '|gap', t: 'mcq', q: b.q, o: opts.map(x => x.w), a: opts.indexOf(v), x: `الكلمة المناسبة: ${v.w} (${v.ar}). الجملة: ${v.ex}` }, base));
        else qs.push(Object.assign({ id: v.id + '|def', t: 'mcq', q: v.def, o: opts.map(x => x.w), a: opts.indexOf(v), x: `${v.w} = ${v.ar}` }, base));
      }
    });
    return qs.filter(q => q.o.length >= 3 && new Set(q.o).size === q.o.length);
  }
  TAF.vocabQuiz = vocabQuiz;
  TAF.vocabGapQ = function (v, pool) {
    const b = blankIn(v.ex, v.w); if (!b) return null;
    const opts = U.shuffle([v, ...pickDistractors(v, pool, 3, true)]);
    if (opts.length < 4 || new Set(opts.map(x => x.w)).size < 4) return null;
    return { id: v.id + '|gap', t: 'mcq', q: b.q, o: opts.map(x => x.w), a: opts.indexOf(v), x: `${v.w} = ${v.ar}`, topic: 'vocab:' + v.unit, unit: v.unit, section: 'vocab', wordRef: v };
  };

  // flashcards with SRS rating
  function flashSession(body, cards, opts) {
    let i = 0, flipped = false, known = 0, held = true;
    TAF.game.holdOn();
    const release = () => { if (held) { held = false; TAF.game.holdOff(); } };
    TAF.app.onLeave(release);
    function draw() {
      if (i >= cards.length) {
        release();
        body.innerHTML = `<div class="sheet result-score"><div class="big">${cards.length}</div><p>بطاقة راجعتها${known ? ` · عرفت ${known} منها` : ''}</p><p class="muted small">ستعود كل بطاقة في الوقت المناسب حسب تقييمك لها.</p><div class="row" style="justify-content:center;margin-top:1rem"><a class="btn" href="${opts.back || '#/practice'}">تم</a></div></div>`;
        return;
      }
      const v = cards[i];
      const st = TAF.srs.state(v.id);
      const prev = c => { // preview next interval
        const now = st ? Object.assign({}, st) : null;
        const ivl = c === 0 ? 0 : !now || !now.reps ? (c === 3 ? 3 : 1) : now.reps === 1 ? (c === 1 ? 2 : c === 3 ? 6 : 4) : Math.round(now.ivl * (c === 1 ? 1.2 : c === 3 ? now.ef * 1.3 : now.ef));
        return ivl === 0 ? 'اليوم' : ivl === 1 ? 'غداً' : ivl + ' أيام';
      };
      body.innerHTML = `
        <div class="quiz-top"><div class="bar"><i style="width:${i / cards.length * 100}%"></i></div><span class="count">${i + 1} / ${cards.length}</span></div>
        <div class="flash ${flipped ? 'flipped' : ''}" data-flip role="button" tabindex="0" aria-label="اقلب البطاقة">
          <div class="flash-inner">
            <div class="flash-face"><div class="big">${esc(v.w)}</div><div class="muted en">${esc(v.pos)}</div>${TAF.speakBtn(v.w)}<div class="small muted" style="background:var(--sheet)">اضغط لرؤية المعنى</div></div>
            <div class="flash-face flash-back"><div class="ar-big">${esc(v.ar)}</div><div class="ex small">${esc(v.def)}</div><div class="ex">“${esc(v.ex)}” ${TAF.speakBtn(v.ex)}</div></div>
          </div>
        </div>
        ${flipped ? `<div class="rate" role="group" aria-label="قيّم معرفتك بالكلمة">
          <button class="again" data-rate="0">نسيتها<small>${prev(0)}</small></button>
          <button data-rate="1">صعبة<small>${prev(1)}</small></button>
          <button class="good" data-rate="2">عرفتها<small>${prev(2)}</small></button>
          <button data-rate="3">سهلة جداً<small>${prev(3)}</small></button></div>` : `<button class="btn block" data-flipbtn>اقلب البطاقة</button>`}
        <p class="small muted" style="text-align:center;margin-top:.8rem">اختصارات: <span class="kbd">Space</span> للقلب، <span class="kbd">1</span>–<span class="kbd">4</span> للتقييم</p>`;
    }
    body.onclick = e => {
      if (e.target.closest('[data-say]')) return;
      if (e.target.closest('[data-flip], [data-flipbtn]')) { flipped = !flipped; draw(); return; }
      const r = e.target.closest('[data-rate]');
      if (r) { const gr = +r.dataset.rate; TAF.srs.rate(cards[i].id, gr); if (gr >= 2) known++; if (gr === 0) cards.push(cards[i]); i++; flipped = false; draw(); }
    };
    const key = e => {
      if (!document.body.contains(body)) return document.removeEventListener('keydown', key);
      if (e.target.matches('input, textarea')) return;
      if (e.code === 'Space') { e.preventDefault(); flipped = !flipped; draw(); }
      if (flipped && /^[1-4]$/.test(e.key)) { const b = body.querySelector(`[data-rate="${+e.key - 1}"]`); b && b.click(); }
    };
    document.addEventListener('keydown', key);
    TAF.app.onLeave(() => document.removeEventListener('keydown', key));
    draw();
  }

  TAF.flashSession = flashSession;

  function spellGame(body, vocab, u) {
    const items = U.shuffle(vocab.filter(v => v.w.replace(/\(.*?\)/g, '').trim().split(/\s+/).length <= 3)).slice(0, 10);
    if (!TAF.tts.ok) { body.innerHTML = empty(I.ear, 'جهازك لا يدعم النطق الآلي، جرّب متصفحاً آخر.'); return; }
    let i = 0, right = 0, answered = false;
    function draw(fb) {
      if (i >= items.length) { body.innerHTML = `<div class="sheet result-score"><div class="big">${right}/${items.length}</div><p>كلمات كتبتها بشكل صحيح</p><div class="row" style="justify-content:center"><a class="btn" href="#/unit/${u.id}/vocab?m=spell">جولة جديدة</a><a class="btn ghost" href="#/unit/${u.id}">عودة للوحدة</a></div></div>`; return; }
      const v = items[i], target = v.w.replace(/\(.*?\)/g, '').trim();
      body.innerHTML = `<div class="quiz-top"><div class="bar"><i style="width:${i / items.length * 100}%"></i></div><span class="count">${i + 1} / ${items.length}</span></div>
        <div class="q-card" style="text-align:center"><p class="muted">استمع ثم اكتب الكلمة أو التعبير</p>
        <button class="btn" data-say="${esc(target)}" style="margin:.4rem auto 1rem">${I.speaker} استمع</button>
        <p class="small muted">تلميح: ${esc(v.ar)}</p>
        <input class="answer-input ${fb ? (fb.ok ? 'right' : 'wrong') : ''}" data-spell dir="ltr" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type what you hear…" ${answered ? 'readonly' : ''} value="${fb ? esc(fb.val) : ''}">
        ${fb ? `<div class="feedback show ${fb.ok ? 'ok' : 'no'}"><div class="verdict">${fb.ok ? I.check + ' صحيح' : I.x + ' التهجئة الصحيحة:'}</div><div class="correct-ans">${esc(target)}</div></div>` : ''}
        <div class="quiz-actions">${answered ? `<button class="btn" data-next>التالي</button>` : `<button class="btn" data-check>تحقّق</button>`}</div></div>`;
      const inp = U.$('[data-spell]', body); if (!answered) inp.focus();
      if (!fb) setTimeout(() => TAF.tts.speak(target, null, 0.8), 250);
    }
    function check() {
      const v = items[i], target = v.w.replace(/\(.*?\)/g, '').trim(), val = U.$('[data-spell]', body).value;
      const ok = U.norm(val) === U.norm(target);
      if (ok) right++; answered = true;
      store.answer({ id: v.id + '|spell', topic: 'vocab:' + v.unit }, ok);
      draw({ ok, val });
    }
    body.onclick = e => { if (e.target.closest('[data-check]')) check(); if (e.target.closest('[data-next]')) { i++; answered = false; draw(); } };
    body.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); answered ? (i++, answered = false, draw()) : check(); } };
    draw();
  }

  function matchGame(body, vocab, u) {
    const set = U.sample(vocab, Math.min(6, vocab.length));
    let left = U.shuffle(set), right = U.shuffle(set), sel = null, matched = 0, mistakes = 0;
    const t0 = Date.now();
    function draw() {
      body.innerHTML = `<p class="muted">صِل كل كلمة بمعناها. الأخطاء: ${mistakes}</p><div class="match">
        ${left.map((v, i) => `<button class="en ${v._done ? 'done' : ''} ${sel && sel.side === 'l' && sel.i === i ? 'sel' : ''}" data-l="${i}">${esc(v.w)}</button><button class="${right[i]._done ? 'done' : ''} ${sel && sel.side === 'r' && sel.i === i ? 'sel' : ''}" data-r="${i}">${esc(right[i].ar)}</button>`).join('')}
        </div>`;
    }
    body.onclick = e => {
      const b = e.target.closest('[data-l], [data-r]'); if (!b) return;
      const side = b.dataset.l != null ? 'l' : 'r', i = +(b.dataset.l != null ? b.dataset.l : b.dataset.r);
      if (!sel || sel.side === side) { sel = { side, i }; return draw(); }
      const a = side === 'l' ? left[i] : left[sel.i], bb = side === 'r' ? right[i] : right[sel.i];
      if (a === bb) {
        a._done = true; matched++; sel = null; draw();
        if (matched === set.length) {
          set.forEach(v => delete v._done);
          setTimeout(() => { body.innerHTML = `<div class="sheet result-score"><div class="big">${U.fmtTime((Date.now() - t0) / 1000)}</div><p>أنهيت التوصيل بـ ${mistakes} ${mistakes === 1 ? 'خطأ' : 'أخطاء'}</p><div class="row" style="justify-content:center"><a class="btn" href="#/unit/${u.id}/vocab?m=match&r=${Date.now()}">جولة جديدة</a><a class="btn ghost" href="#/unit/${u.id}">عودة للوحدة</a></div></div>`; }, 450);
        }
      } else {
        mistakes++; sel = null; draw();
        const btn = body.querySelector(`[data-${side}="${i}"]`); btn && btn.classList.add('bad');
      }
    };
    draw();
  }

  // table helper: head = plain strings, rows = arrays of ready HTML; 3+ columns stack on phones
  function tableHTML(head, rows, cls) {
    const stack = head.length >= 3;
    const lab = h => esc(String(h).replace(/\*\*|==/g, ''));
    return `<div class="tbl-wrap"><table class="tbl ${stack ? 'rstack' : ''} ${cls || ''}"><thead><tr>${head.map(x => `<th>${md(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td data-label="${lab(head[i])}"${i === 0 ? ' class="rowhead"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  TAF.tableHTML = tableHTML;

  /* ---------- GRAMMAR ---------- */
  function blocksHTML(body) {
    return body.map(b => {
      if (b.p) return `<p>${md(b.p)}</p>`;
      if (b.h) return `<h3>${md(b.h)}</h3>`;
      if (b.tip) return `<div class="note tip">${I.bulb}<div>${md(b.tip)}</div></div>`;
      if (b.warn) return `<div class="note warn">${I.alert}<div>${md(b.warn)}</div></div>`;
      if (b.ex) return `<ul class="examples">${b.ex.map(([en, ar]) => `<li><span class="en-line">${md(en, { noBidi: true })}<span class="ar-line">${md(ar)}</span></span>${TAF.speakBtn(en)}</li>`).join('')}</ul>`;
      if (b.table) return tableHTML(b.table.head, b.table.rows.map(r => r.map(c => /[\u0600-\u06FF]/.test(c) ? md(c) : `<span class="en">${md(c, { noBidi: true })}</span>`)));
      return '';
    }).join('');
  }
  TAF.blocksHTML = blocksHTML;

  V.grammar = function (el, [id, gi, mode]) {
    const u = TAF.byId[id]; if (!u) return V.notFound(el);
    const g = (u.grammar || [])[+gi]; if (!g) return V.notFound(el);
    const key = u.id + ':gr:' + g.id;
    let h = crumbs([['الوحدات', '#/units'], [`الوحدة ${u.n}`, `#/unit/${u.id}`], ['القواعد']]);
    if (mode === 'practice') {
      h += `<div class="page-head"><h1 style="font-size:1.25rem">تدريب: ${esc(g.ar)}</h1><p class="sub en" style="text-align:right">${esc(g.title)}</p></div><div id="qz"></div>`;
      el.innerHTML = h;
      const nextG = (u.grammar || [])[+gi + 1];
      TAF.Quiz.run(U.$('#qz', el), g.qs || [], {
        onExit: () => go(`#/unit/${u.id}/grammar/${gi}`),
        doneLabel: nextG ? 'القاعدة التالية' : 'عودة للوحدة',
        onDone: () => go(nextG ? `#/unit/${u.id}/grammar/${+gi + 1}` : `#/unit/${u.id}`),
        onFinish: r => { if (r.pct >= 60) store.markDone(key); }
      });
      return;
    }
    const acc = store.topicAcc(g.id);
    h += `<article class="lesson"><div class="page-head"><div class="unit-num">الوحدة ${u.n} · قاعدة ${+gi + 1} من ${u.grammar.length}</div><h1>${esc(g.ar)}</h1><p class="sub en" style="text-align:right;font-size:1.15rem">${esc(g.title)}</p></div>`;
    h += blocksHTML(g.body || []);
    if (g.summary) h += `<div class="sheet" style="border-inline-start:5px solid var(--hl)"><h3 style="margin-top:0">الخلاصة</h3><ul class="summary-list">${g.summary.map(s => `<li>${md(s)}</li>`).join('')}</ul></div>`;
    h += `</article><div class="sheet" style="margin-top:1rem"><div class="row" style="justify-content:space-between"><div><b>تدرّب على القاعدة</b><div class="small muted">${(g.qs || []).length} سؤالاً مع شرح لكل إجابة${acc != null ? ` · دقتك حتى الآن ${Math.round(acc * 100)}%` : ''}</div></div><a class="btn" href="#/unit/${u.id}/grammar/${gi}/practice">ابدأ التدريب</a></div></div>`;
    el.innerHTML = h;
  };

  /* ---------- READING ---------- */
  V.reading = function (el, [id, mode]) {
    const u = TAF.byId[id]; if (!u || !u.reading) return V.notFound(el);
    const r = u.reading;
    let h = crumbs([['الوحدات', '#/units'], [`الوحدة ${u.n}`, `#/unit/${u.id}`], ['القراءة']]);
    if (mode === 'questions') {
      h += `<div id="qz"></div>`; el.innerHTML = h;
      const qs = (r.qs || []).map(q => Object.assign(Object.create(q), { passage: [`**${r.title}**`, ...r.text.map((p, i) => `(${i + 1}) ` + p)], passageOpen: false }));
      // keep ids/topics from the prototype
      TAF.Quiz.run(U.$('#qz', el), qs, { onExit: () => go(`#/unit/${u.id}/reading`), doneLabel: 'عودة للوحدة', onDone: () => go(`#/unit/${u.id}`), onFinish: res => { if (res.pct >= 60) store.markDone(u.id + ':reading'); } });
      return;
    }
    const plain = r.text.join('\n\n');
    h += `<div class="page-head"><div class="unit-num">الوحدة ${u.n} · القراءة</div><h1>${esc(r.skillAr)}</h1><p class="sub en" style="text-align:right">${esc(r.skill)}</p></div>`;
    h += `<div class="note tip">${I.bulb}<div>${md(r.skillTip)}</div></div>`;
    h += `<div class="sheet"><div class="row" style="justify-content:space-between;margin-bottom:.4rem"><span class="small muted">${U.words(plain)} كلمة · حوالي ${Math.max(1, Math.round(U.words(plain) / 130))} دقائق</span><span class="row" style="gap:.4rem"><button class="btn ghost sm" data-readall>${I.speaker} استمع للنص</button><button class="btn ghost sm" data-stop>إيقاف</button></span></div>
      <div class="passage"><h3>${esc(r.title)}</h3>${r.text.map((p, i) => `<p><span class="pn">${i + 1}</span>${md(p, { noBidi: true })}</p>`).join('')}</div></div>`;
    if (r.gloss && r.gloss.length) h += `<h3>كلمات مساعدة</h3><div class="gloss">${r.gloss.map(([w, a]) => `<span><span class="en">${esc(w)}</span> — ${esc(a)}</span>`).join('')}</div>`;
    h += `<div class="sheet" style="margin-top:1rem"><div class="row" style="justify-content:space-between"><div><b>أسئلة الاستيعاب</b><div class="small muted">${(r.qs || []).length} أسئلة: فكرة رئيسية، تفاصيل، استنتاج، مفردات</div></div><a class="btn" href="#/unit/${u.id}/reading/questions">أجب عن الأسئلة</a></div></div>`;
    el.innerHTML = h;
    U.$('[data-readall]', el).onclick = e => TAF.tts.speak(r.title + '. ' + plain, e.currentTarget, Math.min(1, S().settings.rate));
    U.$('[data-stop]', el).onclick = () => TAF.tts.stop();
  };

  /* ---------- WRITING ---------- */
  V.writing = function (el, [id]) {
    const u = TAF.byId[id]; if (!u || !u.writing) return V.notFound(el);
    const w = u.writing, s = S();
    const draft = s.drafts[u.id] || '';
    const checks = s.checks[u.id] || [];
    let h = crumbs([['الوحدات', '#/units'], [`الوحدة ${u.n}`, `#/unit/${u.id}`], ['الكتابة']]);
    h += `<div class="page-head"><div class="unit-num">الوحدة ${u.n} · الكتابة</div><h1>${esc(w.ar)}</h1><p class="sub en" style="text-align:right">${esc(w.type)}</p></div>`;
    h += `<p>${md(w.about)}</p>`;
    h += `<h2>خطة الكتابة</h2><ol class="plan-steps">${w.plan.map(p => `<li><b>${esc(p.ar)}</b> <span class="en muted small">${esc(p.part)}</span><div>${md(p.tip)}</div></li>`).join('')}</ol>`;
    h += `<h2>عبارات مفيدة</h2>` + tableHTML(['Phrase', 'المعنى', 'الاستخدام'], w.phrases.map(p => [`<span class="en">${esc(p.en)}</span>`, esc(p.ar), `<span class="small muted">${esc(p.use || '')}</span>`]), 'phrase-tbl');
    h += `<h2>المهمة</h2><div class="sheet"><p class="en" style="font-size:1.08rem;text-align:left">${md(w.task, { noBidi: true })}</p><p class="muted small" style="margin:0">${md(w.taskAr)}</p></div>`;
    h += `<h2>اكتب إجابتك</h2><textarea class="answer-input editor" dir="ltr" data-draft placeholder="Start writing here… your draft is saved automatically.">${esc(draft)}</textarea>
      <div class="row" style="justify-content:space-between;margin-top:.3rem"><span class="wordcount" data-wc></span><span class="small muted">يُحفظ تلقائياً على جهازك</span></div>`;
    h += `<h2>راجع قبل التسليم</h2><div class="sheet"><ul class="checklist">${w.check.map((c, i) => `<li><label><input type="checkbox" data-ck="${i}" ${checks[i] ? 'checked' : ''}><span>${md(c)}</span></label></li>`).join('')}</ul></div>`;
    h += `<h2>نموذج إجابة</h2><details class="sheet"><summary style="cursor:pointer">اعرض النموذج (حاول الكتابة أولاً)</summary><div class="model" style="margin-top:.8rem">${w.model.map(p => `<p>${md(p, { noBidi: true })}</p>`).join('')}</div><div class="small muted" style="margin-top:.5rem">${U.words(w.model.join(' '))} كلمة</div></details>`;
    h += `<div class="row" style="margin-top:1rem"><button class="btn" data-finish>${store.isDone(u.id + ':writing') ? 'تم إنجاز هذا القسم ✓' : 'أنهيت الكتابة والمراجعة'}</button><button class="btn ghost" data-copy>نسخ النص</button></div>`;
    el.innerHTML = h;
    const ta = U.$('[data-draft]', el), wc = U.$('[data-wc]', el);
    const upd = () => { const n = U.words(ta.value); wc.textContent = `${n} كلمة · المطلوب ${w.words[0]}–${w.words[1]}`; wc.classList.toggle('ok', n >= w.words[0] && n <= w.words[1]); };
    upd();
    ta.addEventListener('input', () => { s.drafts[u.id] = ta.value; store.save(); upd(); });
    el.addEventListener('change', e => { const c = e.target.closest('[data-ck]'); if (c) { s.checks[u.id] = s.checks[u.id] || []; s.checks[u.id][+c.dataset.ck] = c.checked; store.save(); } });
    U.$('[data-finish]', el).onclick = e => {
      const n = U.words(ta.value), ticked = (s.checks[u.id] || []).filter(Boolean).length;
      if (n < Math.round(w.words[0] * 0.6)) return U.toast('اكتب مسودتك أولاً (تقترب من العدد المطلوب)');
      if (ticked < Math.ceil(w.check.length / 2)) return U.toast('راجع قائمة التدقيق وعلّم ما أنجزته');
      store.markDone(u.id + ':writing'); e.currentTarget.textContent = 'تم إنجاز هذا القسم ✓'; U.toast('أحسنت! سُجّل القسم كمنجز');
    };
    U.$('[data-copy]', el).onclick = () => { navigator.clipboard && navigator.clipboard.writeText(ta.value).then(() => U.toast('نُسخ النص'), () => U.toast('تعذّر النسخ')); };
  };

  /* ---------- SPEAKING ---------- */
  V.speaking = function (el, [id, mode]) {
    const u = TAF.byId[id]; if (!u || !u.speaking) return V.notFound(el);
    const sp = u.speaking;
    let h = crumbs([['الوحدات', '#/units'], [`الوحدة ${u.n}`, `#/unit/${u.id}`], ['التعبيرات الشفوية']]);
    if (mode === 'practice') {
      h += `<div id="qz"></div>`; el.innerHTML = h;
      const ph = sp.phrases;
      const qs = U.shuffle(ph).slice(0, Math.min(10, ph.length)).map((p, i) => {
        const opts = U.shuffle([p, ...U.shuffle(ph.filter(x => x !== p)).slice(0, 3)]);
        return { id: u.id + '-sp|' + p.en, topic: 'speaking:' + u.id, unit: u.id, section: 'speaking', t: 'mcq', q: p.ar + (p.use ? ` (${p.use})` : ''), rtl: true, o: opts.map(x => x.en), a: opts.indexOf(p), x: `${p.en} = ${p.ar}` };
      });
      TAF.Quiz.run(U.$('#qz', el), qs, { onExit: () => go(`#/unit/${u.id}/speaking`), doneLabel: 'عودة للوحدة', onDone: () => go(`#/unit/${u.id}`), onFinish: r => { if (r.pct >= 60) store.markDone(u.id + ':speaking'); } });
      return;
    }
    h += `<div class="page-head"><div class="unit-num">الوحدة ${u.n} · التعبيرات الشفوية</div><h1>${esc(sp.ar)}</h1><p class="sub en" style="text-align:right">${esc(sp.title)}</p></div>`;
    h += `<div class="ruled">${sp.phrases.map(p => `<div class="item">${TAF.speakBtn(p.en)}<span class="grow"><span class="t en" style="text-align:left;direction:ltr">${esc(p.en)}</span><span class="d">${esc(p.ar)}${p.use ? ' · ' + esc(p.use) : ''}</span></span></div>`).join('')}</div>`;
    if (sp.dialogue && sp.dialogue.length) {
      const names = [...new Set(sp.dialogue.map(d => d[0]))];
      h += `<h2>حوار نموذجي</h2><div class="row" style="margin-bottom:.6rem"><button class="btn ghost sm" data-play>${I.speaker} استمع للحوار</button><button class="btn ghost sm" data-stop>إيقاف</button></div><div class="dialogue">${sp.dialogue.map(([who, line]) => `<div class="bubble-line ${names.indexOf(who) % 2 ? 'b' : 'a'}"><span class="who">${esc(who)}</span>${md(line, { noBidi: true })}</div>`).join('')}</div>`;
      h += `<p class="small muted" style="margin-top:.8rem">تدرّب مع زميل: كل واحد يأخذ دوراً، ثم بدّلا الأدوار واستبدلا التفاصيل بمعلومات عنكما.</p>`;
    }
    h += `<div class="sheet" style="margin-top:1rem"><div class="row" style="justify-content:space-between"><div><b>اختبر حفظك للعبارات</b><div class="small muted">نعطيك المعنى بالعربي وتختار العبارة الإنجليزية</div></div><a class="btn" href="#/unit/${u.id}/speaking/practice">ابدأ</a></div></div>`;
    el.innerHTML = h;
    const play = U.$('[data-play]', el);
    if (play) play.onclick = () => {
      if (!TAF.tts.ok) return U.toast('النطق غير مدعوم هنا');
      speechSynthesis.cancel();
      sp.dialogue.forEach(([who, line]) => { const ut = new SpeechSynthesisUtterance(line.replace(/==|\*\*/g, '')); const v = TAF.tts.voice(); if (v) ut.voice = v; ut.lang = v ? v.lang : 'en-GB'; ut.rate = S().settings.rate; ut.pitch = sp.dialogue.findIndex(d => d[0] === who) % 2 ? 1.15 : 0.9; speechSynthesis.speak(ut); });
    };
    const stop = U.$('[data-stop]', el); if (stop) stop.onclick = () => TAF.tts.stop();
  };

  /* ---------- UNIT TEST ---------- */
  V.test = function (el, [id]) {
    const u = TAF.byId[id]; if (!u) return V.notFound(el);
    let h = crumbs([['الوحدات', '#/units'], [`الوحدة ${u.n}`, `#/unit/${u.id}`], ['اختبار الوحدة']]);
    h += `<div class="page-head"><h1>اختبار الوحدة ${u.n}</h1><p class="sub">${(u.test || []).length} سؤالاً شاملاً — النتيجة والتصحيح بعد التسليم${S().tests[u.id] != null ? ` · أفضل نتيجة لك ${S().tests[u.id]}%` : ''}</p></div><div id="qz"></div>`;
    el.innerHTML = h;
    TAF.Quiz.run(U.$('#qz', el), u.test || [], {
      mode: 'exam', timeLimit: 25 * 60, confirmExit: 'هل تريد الخروج من الاختبار؟ لن تُحفظ إجاباتك.', onExit: () => go(`#/unit/${u.id}`), doneLabel: 'عودة للوحدة', onDone: () => go(`#/unit/${u.id}`),
      onFinish: r => { const s = S(); s.tests[u.id] = Math.max(s.tests[u.id] || 0, r.pct); s.exams.unshift({ t: Date.now(), kind: 'unit', unit: u.id, pct: r.pct, right: r.right, total: r.total, secs: Math.round(r.secs) }); s.exams = s.exams.slice(0, 60); store.save(); }
    });
  };

  /* ---------- UNIT SUMMARY (printable) ---------- */
  V.summary = function (el, [id]) {
    const u = TAF.byId[id]; if (!u) return V.notFound(el);
    let h = crumbs([['الوحدات', '#/units'], [`الوحدة ${u.n}`, `#/unit/${u.id}`], ['الملخص']]);
    h += `<div class="page-head"><div class="unit-num">ملخص الوحدة ${u.n} — الصف ${u.grade}</div><h1 class="unit-title"><span>${esc(u.title)}</span></h1><p class="sub">${esc(u.ar)}</p></div>`;
    h += `<div class="row no-print" style="margin-bottom:1rem"><button class="btn" onclick="window.print()">${I.print} اطبع أو احفظ PDF</button></div>`;
    h += `<h2>القواعد</h2>`;
    (u.grammar || []).forEach(g => { h += `<div class="sheet cheat-unit"><h3 style="margin-top:0">${esc(g.ar)} <span class="en muted small">${esc(g.title)}</span></h3><ul class="summary-list">${(g.summary || []).map(s => `<li>${md(s)}</li>`).join('')}</ul></div>`; });
    h += `<h2>المفردات</h2>` + tableHTML(['Word', 'المعنى', 'Example'], (u.vocab || []).map(v => [`<b class="en">${esc(v.w)}</b>`, esc(v.ar), `<span class="en small">${esc(v.ex)}</span>`]));
    if (u.writing) h += `<h2>الكتابة: ${esc(u.writing.ar)}</h2><div class="sheet"><ol>${u.writing.plan.map(p => `<li><b>${esc(p.ar)}:</b> ${md(p.tip)}</li>`).join('')}</ol><div class="small en">${u.writing.phrases.map(p => esc(p.en)).join(' · ')}</div></div>`;
    if (u.speaking) h += `<h2>تعبيرات شفوية</h2><div class="tbl-wrap"><table class="tbl"><tbody>${u.speaking.phrases.map(p => `<tr><td class="en">${esc(p.en)}</td><td>${esc(p.ar)}</td></tr>`).join('')}</tbody></table></div>`;
    el.innerHTML = h;
  };

  /* ---------- PRACTICE HUB ---------- */
  V.practice = function (el) {
    const g = grade(), s = S();
    const due = TAF.srs.dueCards(g).length, newN = TAF.srs.newCards(g).length;
    const mistakes = Object.keys(s.mistakes).filter(id => TAF.qIndex[id] && TAF.byId[TAF.qIndex[id].unit].grade === g).length;
    let h = `<div class="page-head"><h1>التدريب</h1><p class="sub">تدريب ذكي يتكيّف مع مستواك</p></div><div class="ruled">`;
    h += row('#/plan', 'خطة الدراسة', 'جدول يومي مبني على موعد امتحانك والأقسام المتبقية', null, `<span class="num">${I.clock}</span>`);
    h += row('#/review', 'مراجعة البطاقات', due ? `${due} بطاقة مستحقة اليوم` : 'لا بطاقات مستحقة الآن', null, `<span class="num">${I.cards}</span>`);
    h += row('#/review?new=1', 'تعلّم كلمات جديدة', `${Math.min(newN, s.settings.newPerDay)} كلمات من الوحدات التي فتحتها`, null, `<span class="num">${I.star}</span>`);
    h += row('#/mistakes', 'دفتر الأخطاء', mistakes ? `${mistakes} سؤالاً أخطأت فيه — يختفي السؤال بعد إجابتين صحيحتين متتاليتين` : 'لا أخطاء محفوظة — ممتاز!', null, `<span class="num">${I.notebook}</span>`);
    h += row('#/drill', 'تدريب على نقاط ضعفك', 'نختار لك أسئلة من القواعد التي تخطئ فيها أكثر', null, `<span class="num">${I.target}</span>`);
    h += row('#/speed', 'الجولة السريعة', '60 ثانية — أجب بأسرع ما تستطيع واجمع نقاطاً', null, `<span class="num">${I.flame}</span>`);
    h += row('#/words', 'كلماتي', 'الكلمات التي أضفتها بنجمة وتلك التي تنساها', null, `<span class="num">${I.star}</span>`);
    h += row('#/mixed', 'اختبار عشوائي سريع', '15 سؤالاً منوعاً من كل الوحدات', null, `<span class="num">${I.shuffle}</span>`);
    h += row('#/dictation', 'استماع وإملاء', 'استمع لجملة واكتبها لتقوية الاستماع والتهجئة', null, `<span class="num">${I.ear}</span>`);
    h += row('#/stats', 'إحصائياتي', 'دقتك في كل قاعدة ومهارة', null, `<span class="num">${I.chart}</span>`);
    h += `</div>`;
    el.innerHTML = h;
  };

  V.review = function (el, _, query) {
    const g = grade(), s = S(); store.rollDay();
    const wantNew = query.get('new') === '1';
    let cards = TAF.srs.dueCards(g);
    const newLeft = Math.max(0, s.settings.newPerDay - s.daily.newToday);
    let fresh = TAF.srs.newCards(g).slice(0, wantNew ? Math.max(newLeft, 5) : newLeft);
    if (!wantNew) cards = cards.concat(fresh.slice(0, Math.min(fresh.length, 5)));
    else cards = fresh;
    let h = `<div class="page-head"><h1>${wantNew ? 'كلمات جديدة' : 'مراجعة البطاقات'}</h1><p class="sub">تكرار متباعد: الكلمات الصعبة تعود أسرع، والسهلة تتباعد</p></div><div id="fs"></div>`;
    el.innerHTML = h;
    if (!cards.length) { U.$('#fs', el).innerHTML = empty(I.cards, wantNew ? 'لا كلمات جديدة الآن. افتح وحدة جديدة لإضافة كلماتها.' : 'أنهيت مراجعة اليوم. عُد غداً!', `<a class="btn" href="#/units">افتح وحدة</a>`); return; }
    flashSession(U.$('#fs', el), U.shuffle(cards), { back: '#/practice' });
  };

  V.mistakes = function (el, _, query) {
    const g = grade(), s = S();
    const ids = Object.keys(s.mistakes).filter(id => TAF.qIndex[id] && TAF.byId[TAF.qIndex[id].unit].grade === g);
    if (query.get('go') === '1' && ids.length) {
      el.innerHTML = `<div class="page-head"><h1>تصحيح الأخطاء</h1></div><div id="qz"></div>`;
      const qs = U.shuffle(ids).slice(0, 20).map(id => TAF.qIndex[id]);
      TAF.Quiz.run(U.$('#qz', el), qs, { onExit: () => go('#/mistakes'), doneLabel: 'عودة لدفتر الأخطاء', onDone: () => go('#/mistakes') });
      return;
    }
    let h = `<div class="page-head"><h1>دفتر الأخطاء</h1><p class="sub">كل سؤال تخطئ فيه يُحفظ هنا تلقائياً، ويُحذف بعد أن تجيبه صحيحاً مرتين متتاليتين.</p></div>`;
    if (!ids.length) { el.innerHTML = h + empty(I.notebook, 'دفترك فارغ. حلّ تمارين الوحدات وسيُحفظ هنا ما تخطئ فيه.'); return; }
    h += `<div class="row" style="margin-bottom:1rem"><a class="btn" href="#/mistakes?go=1">صحّح أخطائي الآن (${Math.min(20, ids.length)})</a></div>`;
    const byUnit = {};
    ids.forEach(id => { const q = TAF.qIndex[id]; (byUnit[q.unit] = byUnit[q.unit] || []).push(q); });
    Object.keys(byUnit).sort((a, b) => TAF.byId[a].n - TAF.byId[b].n).forEach(uid => {
      const u = TAF.byId[uid];
      h += `<h3>الوحدة ${u.n}: <span class="en">${esc(u.title)}</span></h3><div class="sheet">`;
      byUnit[uid].forEach(q => {
        const t = TAF.topics[q.topic];
        h += `<div class="review-item"><div class="q">${md(q.q || q.a, { noBidi: true })}</div><div class="small muted">${t ? esc(t.ar || t.label) : ''} · أخطأت ${s.mistakes[q.id].n} ${s.mistakes[q.id].n === 1 ? 'مرة' : 'مرات'}</div><div class="small">الصحيح: <span class="en">${md(TAF.Quiz.correctText(q), { noBidi: true })}</span></div></div>`;
      });
      h += `</div>`;
    });
    el.innerHTML = h;
  };

  function weakTopics(g) {
    const units = TAF.unitsFor(g);
    const list = [];
    units.forEach(u => (u.grammar || []).forEach(gr => {
      const t = S().topics[gr.id] || { r: 0, w: 0 };
      const n = t.r + t.w;
      const acc = n ? t.r / n : null;
      list.push({ g: gr, u, n, acc });
    }));
    return list;
  }
  V.drill = function (el) {
    const g = grade();
    const topics = weakTopics(g);
    const tried = topics.filter(t => t.n >= 3).sort((a, b) => a.acc - b.acc);
    const opened = topics.filter(t => store.isDone('open:' + t.u.id));
    let chosen = tried.filter(t => t.acc < 0.8).slice(0, 3);
    if (chosen.length < 2) chosen = chosen.concat(opened.filter(t => !chosen.includes(t) && t.n < 3).slice(0, 3 - chosen.length));
    if (!chosen.length) chosen = U.sample(topics, Math.min(3, topics.length));
    const pool = chosen.flatMap(t => {
      // prefer questions not yet answered correctly twice
      const qs = (t.g.qs || []).filter(q => { const r = S().q[q.id]; return !r || r.s < 2; });
      return U.sample(qs.length >= 5 ? qs : t.g.qs || [], 6);
    });
    let h = `<div class="page-head"><h1>تدريب على نقاط ضعفك</h1><p class="sub">ركّزنا على: ${chosen.map(t => `<b>${esc(t.g.ar)}</b>${t.acc != null ? ` (${Math.round(t.acc * 100)}%)` : ''}`).join('، ')}</p></div><div id="qz"></div>`;
    el.innerHTML = h;
    TAF.Quiz.run(U.$('#qz', el), U.shuffle(pool).slice(0, 15), { onExit: () => go('#/practice'), doneLabel: 'تدريب جديد', onDone: () => { TAF.app.render(true); } });
  };

  V.mixed = function (el) {
    const g = grade();
    const units = TAF.unitsFor(g);
    const opened = units.filter(u => store.isDone('open:' + u.id));
    const src = opened.length ? opened : units;
    const pool = src.flatMap(u => (u.grammar || []).flatMap(gr => gr.qs || []).concat(u.test || []));
    const vq = src.flatMap(u => vocabQuiz(u.vocab || [], u, 2));
    el.innerHTML = `<div class="page-head"><h1>اختبار عشوائي</h1><p class="sub">من ${opened.length ? 'الوحدات التي فتحتها' : 'كل الوحدات'}</p></div><div id="qz"></div>`;
    TAF.Quiz.run(U.$('#qz', el), U.shuffle(U.sample(pool, 11).concat(U.sample(vq, 4))), { onExit: () => go('#/practice'), doneLabel: 'اختبار جديد', onDone: () => TAF.app.render(true) });
  };

  /* ---------- DICTATION ---------- */
  V.dictation = function (el, _, query) {
    const g = grade(), units = TAF.unitsFor(g);
    const uid = query.get('u');
    if (!uid) {
      let h = `<div class="page-head"><h1>استماع وإملاء</h1><p class="sub">ستسمع ${8} جمل من الوحدة. اكتب كل جملة كما تسمعها، ثم نقارن كلمة بكلمة.</p></div>`;
      if (!TAF.tts.ok) h += `<div class="note warn">${I.alert}<div>هذا المتصفح لا يدعم النطق الآلي. جرّب Edge أو Chrome.</div></div>`;
      h += `<div class="ruled">${units.map(u => row(`#/dictation?u=${u.id}`, `الوحدة ${u.n}`, `<span class="en">${esc(u.title)}</span>`, null, `<span class="num">${u.n}</span>`)).join('')}</div>`;
      el.innerHTML = h; return;
    }
    const u = TAF.byId[uid]; if (!u) return V.notFound(el);
    const sents = [];
    (u.grammar || []).forEach(gr => (gr.body || []).forEach(b => b.ex && b.ex.forEach(([en]) => sents.push(en.replace(/==|\*\*/g, '')))));
    (u.vocab || []).forEach(v => sents.push(v.ex));
    const items = U.sample(sents.filter(s => U.words(s) >= 5 && U.words(s) <= 16 && !/[←→✗✓]|A:|B:/.test(s)), 8);
    let i = 0, score = 0, shown = false;
    function diff(input, target) {
      const a = U.norm(input).split(' '), b = U.norm(target).split(' ');
      // LCS alignment
      const m = a.length, n = b.length, L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
      for (let x = m - 1; x >= 0; x--) for (let y = n - 1; y >= 0; y--) L[x][y] = a[x] === b[y] ? L[x + 1][y + 1] + 1 : Math.max(L[x + 1][y], L[x][y + 1]);
      let x = 0, y = 0, out = [], ok = 0;
      while (x < m && y < n) { if (a[x] === b[y]) { out.push(`<span class="ok">${esc(b[y])}</span>`); ok++; x++; y++; } else if (L[x + 1][y] >= L[x][y + 1]) { out.push(`<span class="extra">${esc(a[x])}</span>`); x++; } else { out.push(`<span class="miss">${esc(b[y])}</span>`); y++; } }
      while (x < m) out.push(`<span class="extra">${esc(a[x++])}</span>`);
      while (y < n) out.push(`<span class="miss">${esc(b[y++])}</span>`);
      return { html: out.join(' '), pct: Math.round(ok / n * 100) };
    }
    function draw(res) {
      if (i >= items.length) { el.innerHTML = `<div class="sheet result-score"><div class="big">${Math.round(score / items.length)}%</div><p>متوسط دقتك في الإملاء</p><div class="row" style="justify-content:center"><a class="btn" href="#/dictation?u=${u.id}&r=${Date.now()}">جولة أخرى</a><a class="btn ghost" href="#/dictation">وحدة أخرى</a></div></div>`; return; }
      el.innerHTML = `${crumbs([['الإملاء', '#/dictation'], [`الوحدة ${u.n}`]])}<div class="quiz-top"><div class="bar"><i style="width:${i / items.length * 100}%"></i></div><span class="count">${i + 1} / ${items.length}</span></div>
        <div class="q-card"><div class="row" style="margin-bottom:.8rem"><button class="btn" data-play>${I.speaker} استمع</button><button class="btn ghost" data-slow>أبطأ</button></div>
        <textarea class="answer-input" data-in rows="3" dir="ltr" spellcheck="false" placeholder="Write the sentence…" ${shown ? 'readonly' : ''}>${res ? esc(res.val) : ''}</textarea>
        ${res ? `<div class="feedback show ${res.pct >= 90 ? 'ok' : 'no'}"><div class="verdict">${res.pct}% صحيح</div><div class="diff">${res.html}</div><div class="small muted" style="margin-top:.4rem">الأخضر صحيح، الأحمر كلمة ناقصة أو خاطئة، والمشطوب زائد.</div></div>` : ''}
        <div class="quiz-actions">${shown ? `<button class="btn" data-next>التالي</button>` : `<button class="btn" data-check>تحقّق</button>`}</div></div>`;
      if (!res) setTimeout(() => TAF.tts.speak(items[i], null), 300);
    }
    el.onclick = e => {
      if (e.target.closest('[data-play]')) TAF.tts.speak(items[i], e.target.closest('button'));
      if (e.target.closest('[data-slow]')) TAF.tts.speak(items[i], e.target.closest('button'), 0.65);
      if (e.target.closest('[data-check]')) { const val = U.$('[data-in]', el).value; if (!val.trim()) return U.toast('اكتب ما سمعته أولاً'); const d = diff(val, items[i]); score += d.pct; shown = true; store.answer({ id: u.id + '|dict|' + items[i].slice(0, 30), topic: 'vocab:' + u.id }, d.pct >= 90); draw(Object.assign(d, { val })); }
      if (e.target.closest('[data-next]')) { i++; shown = false; draw(); }
    };
    draw();
  };

  /* ---------- STATS ---------- */
  V.stats = function (el) {
    const g = grade(), s = S();
    const topics = weakTopics(g);
    const qAns = Object.values(s.q).reduce((a, r) => a + r.r + r.w, 0), qRight = Object.values(s.q).reduce((a, r) => a + r.r, 0);
    const learned = TAF.allVocab(g).filter(v => s.srs[v.id] && s.srs[v.id].reps > 0).length, totalV = TAF.allVocab(g).length;
    let h = `<div class="page-head"><h1>إحصائياتي</h1><p class="sub">الصف ${g}</p></div>`;
    h += `<div class="sheet"><div class="stat-line"><span><b>${qAns}</b> إجابة</span><span><b>${qAns ? Math.round(qRight / qAns * 100) : 0}%</b> دقة عامة</span><span><b>${learned}</b> / ${totalV} كلمة في المراجعة</span><span><b>${s.streak.count}</b> أيام متتالية</span></div></div>`;
    h += `<h2>دقتك في القواعد</h2><div class="sheet topic-bars">`;
    topics.forEach(t => {
      const p = t.acc == null ? 0 : Math.round(t.acc * 100);
      const cls = t.acc == null ? '' : p < 60 ? 'low' : p < 80 ? 'mid' : 'good';
      h += `<div class="t-row"><span>${esc(t.g.ar)} <span class="small muted">(و${t.u.n})</span></span><div class="bar"><i class="${cls}" style="width:${t.acc == null ? 0 : p}%"></i></div><span class="small">${t.acc == null ? '—' : p + '%'}</span></div>`;
    });
    h += `</div>`;
    const ex = s.exams.filter(x => !x.unit || (TAF.byId[x.unit] && TAF.byId[x.unit].grade === g)).slice(0, 12);
    if (ex.length) {
      h += `<h2>آخر الاختبارات</h2><div class="ruled">${ex.map(x => `<div class="item"><span class="grow"><span class="t">${x.kind === 'unit' ? 'اختبار الوحدة ' + TAF.byId[x.unit].n : esc(x.title || 'امتحان محاكاة')}</span><span class="d">${new Date(x.t).toLocaleDateString('ar-JO-u-nu-latn')} · ${U.fmtTime(x.secs)}</span></span><b>${x.pct}%</b></div>`).join('')}</div>`;
    }
    el.innerHTML = h;
  };

  /* ---------- CHEAT SHEET ---------- */
  V.cheatsheet = function (el) {
    const g = grade(), units = TAF.unitsFor(g);
    let h = `<div class="page-head"><h1>ملخص القواعد</h1><p class="sub">كل قواعد الصف ${g} مختصرة — للمراجعة قبل الامتحان</p></div><div class="row no-print" style="margin-bottom:1rem"><button class="btn" onclick="window.print()">${I.print} اطبع أو احفظ PDF</button></div>`;
    units.forEach(u => {
      h += `<div class="sheet cheat-unit"><h3 style="margin-top:0">الوحدة ${u.n}: <span class="en">${esc(u.title)}</span></h3>`;
      (u.grammar || []).forEach((gr, i) => { h += `<p style="margin:.6rem 0 .2rem"><a href="#/unit/${u.id}/grammar/${i}"><b>${esc(gr.ar)}</b></a> — <span class="en small">${esc(gr.title)}</span></p><ul class="summary-list">${(gr.summary || []).map(s => `<li>${md(s)}</li>`).join('')}</ul>`; });
      h += `</div>`;
    });
    el.innerHTML = h;
  };

  /* ---------- SEARCH ---------- */
  V.search = function (el, _, query) {
    const q0 = query.get('q') || '';
    el.innerHTML = `<div class="page-head"><h1>بحث</h1></div><input class="searchbox" type="search" data-s value="${esc(q0)}" placeholder="ابحث عن كلمة، قاعدة، أو موضوع… مثل: used to أو المبني للمجهول" aria-label="بحث"><div id="res" style="margin-top:1rem"></div>`;
    const inp = U.$('[data-s]', el), res = U.$('#res', el);
    function doSearch() {
      const t = inp.value.trim().toLowerCase();
      if (t.length < 2) { res.innerHTML = '<p class="muted">اكتب حرفين على الأقل.</p>'; return; }
      const hits = [];
      TAF.units.forEach(u => {
        if ((u.title + ' ' + u.ar + ' ' + u.topics).toLowerCase().includes(t)) hits.push({ h: `#/unit/${u.id}`, t: `الوحدة ${u.n} (الصف ${u.grade}): ${u.title}`, d: u.ar, score: 3 });
        (u.grammar || []).forEach((g, i) => {
          const txt = (g.title + ' ' + g.ar + ' ' + JSON.stringify(g.body) + ' ' + (g.summary || []).join(' ')).toLowerCase();
          if ((g.title + ' ' + g.ar).toLowerCase().includes(t)) hits.push({ h: `#/unit/${u.id}/grammar/${i}`, t: `قاعدة: ${g.ar}`, d: `${g.title} · الصف ${u.grade} الوحدة ${u.n}`, score: 4 });
          else if (txt.includes(t)) hits.push({ h: `#/unit/${u.id}/grammar/${i}`, t: `قاعدة: ${g.ar}`, d: `ورد فيها «${inp.value.trim()}» · الصف ${u.grade} الوحدة ${u.n}`, score: 1 });
        });
        (u.vocab || []).forEach(v => {
          if (v.w.toLowerCase().includes(t) || v.ar.includes(inp.value.trim())) hits.push({ h: `#/unit/${u.id}/vocab`, t: `${v.w} — ${v.ar}`, d: `${v.def} · الصف ${u.grade} الوحدة ${u.n}`, score: v.w.toLowerCase() === t ? 5 : 2 });
        });
        if (u.writing && (u.writing.type + ' ' + u.writing.ar).toLowerCase().includes(t)) hits.push({ h: `#/unit/${u.id}/writing`, t: `كتابة: ${u.writing.ar}`, d: `${u.writing.type} · الصف ${u.grade} الوحدة ${u.n}`, score: 3 });
      });
      hits.sort((a, b) => b.score - a.score);
      res.innerHTML = hits.length ? `<div class="sheet" style="padding:0;overflow:hidden">${hits.slice(0, 60).map(x => `<a class="result-hit" href="${x.h}">${md(x.t)}<small>${md(x.d)}</small></a>`).join('')}</div>` : `<p class="muted">لا نتائج لـ «${esc(inp.value)}».</p>`;
    }
    let tmr; inp.addEventListener('input', () => { clearTimeout(tmr); tmr = setTimeout(() => { history.replaceState(null, '', '#/search?q=' + encodeURIComponent(inp.value)); doSearch(); }, 200); });
    if (q0) doSearch(); else res.innerHTML = '<p class="muted">ابحث في كل المفردات والقواعد وأنواع الكتابة للصفين.</p>';
    inp.focus();
  };

  /* ---------- EXTRAS (literature spot etc.) ---------- */
  V.extra = function (el, [id]) {
    const x = TAF.extras.find(e => e.id === id); if (!x) return V.notFound(el);
    let h = crumbs([['الوحدات', '#/units'], [x.ar]]);
    h += `<div class="page-head"><h1>${esc(x.ar)}</h1><p class="sub en" style="text-align:right">${esc(x.title)}</p></div>`;
    if (x.poem) h += `<div class="sheet"><div class="row" style="justify-content:space-between"><b class="en">${esc(x.poemTitle || '')}</b>${TAF.speakBtn(x.poem)}</div><div class="lit-poem">${esc(x.poem)}</div>${x.poet ? `<p class="small muted en" style="text-align:left">— ${esc(x.poet)}</p>` : ''}</div>`;
    h += TAF.blocksHTML(x.body || []);
    if (x.qs && x.qs.length) h += `<div class="sheet" style="margin-top:1rem"><div class="row" style="justify-content:space-between"><b>أسئلة</b><a class="btn" href="#/extra/${x.id}/q">ابدأ</a></div></div>`;
    el.innerHTML = h;
  };
  V.extraQ = function (el, [id]) {
    const x = TAF.extras.find(e => e.id === id); if (!x) return V.notFound(el);
    el.innerHTML = `<div id="qz"></div>`;
    x.qs.forEach((q, i) => { q.id = q.id || x.id + '#' + i; q.topic = q.topic || 'reading:' + x.id; });
    TAF.Quiz.run(U.$('#qz', el), x.qs, { onExit: () => go('#/extra/' + x.id), onDone: () => go('#/extra/' + x.id) });
  };

  V.notFound = function (el) { el.innerHTML = empty(I.search, 'الصفحة غير موجودة.', `<a class="btn" href="#/">الرئيسية</a>`); };
})();

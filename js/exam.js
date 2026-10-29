/* Tafawuq English — exam simulator built on the ministerial paper patterns (2025–2026). */
(function () {
  'use strict';
  const TAF = window.TAF, U = TAF.util, esc = U.esc, store = TAF.store, I = TAF.icon, V = TAF.views;
  const S = () => store.s;
  const go = h => { location.hash = h; };
  const RUBRIC = [['المحتوى وتحقيق المطلوب', 4], ['التنظيم والترابط بين الفقرات', 2], ['القواعد والمفردات', 3], ['الترقيم والتهجئة', 1]];

  const FORMATS = {
    g11: {
      title: 'نموذج الامتحان الوزاري — الورقة الشاملة',
      desc: 'السؤال الأول: 28 سؤال اختيار من متعدد في المفردات والقواعد والتراكيب (70 علامة) · السؤال الثاني: قراءة وأسئلة كتابية (20) · السؤال الثالث: كتابة حرة تختار فيها موضوعاً من اثنين (10) · ساعتان',
      mins: 120
    },
    adv: {
      title: 'نموذج الإنجليزي المتقدم — 50 سؤالاً',
      desc: '50 سؤال اختيار من متعدد في ساعتين: أسئلة على نصوص قصيرة، ثم مفردات وقواعد وتحويل جمل ووظائف لغوية وأعراف الكتابة',
      mins: 120
    },
    quick: { title: 'امتحان سريع', desc: '20 سؤال اختيار من متعدد في 25 دقيقة من الوحدات المختارة', mins: 25 }
  };

  function scopeUnits(grade, scope) {
    const all = TAF.unitsFor(grade);
    if (scope === '1' || scope === '2') { const f = all.filter(u => u.sem === +scope); return f.length ? f : all; }
    return all;
  }
  const clone = (q, extra) => Object.assign(Object.create(q), extra);
  function pools(units) {
    const vocab = [], grammar = [], func = [];
    units.forEach(u => {
      (u.test || []).forEach(q => {
        if (q.t !== 'mcq') return;
        if (q.k === 'vocab') vocab.push(q);
        else if (q.k === 'speaking' || q.k === 'writing') func.push(q);
        else if (q.k !== 'reading') grammar.push(q);
      });
      (u.grammar || []).forEach(g => (g.qs || []).forEach(q => { if (q.t === 'mcq') grammar.push(q); }));
      const allV = units.flatMap(x => x.vocab || []);
      (u.vocab || []).forEach(v => { const q = TAF.vocabGapQ(v, allV); if (q) vocab.push(q); });
    });
    return { vocab: U.shuffle(vocab), grammar: U.shuffle(grammar), func: U.shuffle(func) };
  }
  function take(arr, n, used) {
    const out = [];
    for (const q of arr) { if (out.length >= n) break; if (used.has(q.id)) continue; used.add(q.id); out.push(q); }
    return out;
  }
  function fill(out, n, sources, used) {
    for (const src of sources) { if (out.length >= n) break; out.push(...take(src, n - out.length, used)); }
    return out;
  }
  const passageOf = u => [`**${u.reading.title}**`, ...u.reading.text.map((p, i) => `(${i + 1}) ` + p)];

  function buildG11(units) {
    const P = pools(units), used = new Set();
    const voc = fill(take(P.vocab, 13, used), 13, [P.grammar], used);
    const gr = fill(take(P.grammar, 7, used), 7, [P.vocab], used);
    const st = fill(take(P.func, 3, used), 8, [P.grammar, P.vocab], used);
    const q1 = U.shuffle(voc).concat(U.shuffle(gr), U.shuffle(st)).map(q => clone(q, { marks: 2.5, sec: 'q1', label: 'السؤال الأول' }));
    const ru = U.shuffle(units.filter(u => u.reading && u.reading.qs && u.reading.qs.length))[0];
    let q2 = [];
    if (ru) {
      const rq = ru.reading.qs;
      const each = Math.floor(20 / rq.length * 2) / 2;
      let rest = 20 - each * rq.length;
      q2 = rq.map((q, i) => { let m = each; if (i === rq.length - 1) m += rest; return clone(q, { marks: m, sec: 'q2', label: 'السؤال الثاني: القراءة', passage: passageOf(ru), passageOpen: true }); });
    }
    const wu = U.shuffle(units.filter(u => u.writing)).slice(0, 2);
    const q3 = [];
    if (wu.length) {
      const tasks = wu.map((u, i) => `Task ${'AB'[i]}: ${u.writing.task}`).join('\n\n');
      const models = wu.map((u, i) => `Model for Task ${'AB'[i]} (${u.writing.type}):\n${u.writing.model.join('\n')}`).join('\n\n');
      q3.push({ id: 'exam-writing-' + wu.map(u => u.id).join('-'), topic: 'writing:' + wu[0].id, unit: wu[0].id, section: 'writing', t: 'open', writing: true,
        q: `Free writing — choose ONE task and write in your answer box. Plan first, then write in paragraphs.\n\n${tasks}`, m: models, marks: 10, rubric: RUBRIC, sec: 'q3', label: 'السؤال الثالث: الكتابة' });
    }
    return { qs: q1.concat(q2, q3), sections: [{ key: 'q1', label: 'السؤال الأول: مفردات وقواعد وتراكيب' }, { key: 'q2', label: 'السؤال الثاني: القراءة' }, { key: 'q3', label: 'السؤال الثالث: الكتابة الحرة' }] };
  }

  function buildAdv(units) {
    const used = new Set();
    // reading items: mcq (and tf as two-option mcq) from 2–3 passages
    const read = [];
    U.shuffle(units.filter(u => u.reading)).forEach(u => {
      if (read.length >= 12) return;
      u.reading.qs.forEach(q => {
        if (read.length >= 12) return;
        if (q.t === 'mcq') read.push(clone(q, { passage: passageOf(u), passageOpen: true }));
        else if (q.t === 'tf') read.push(clone(q, { t: 'mcq', o: ['True', 'False'], a: q.a ? 0 : 1, passage: passageOf(u), passageOpen: true }));
      });
    });
    read.forEach(q => used.add(q.id));
    const P = pools(units);
    const rest = [];
    rest.push(...take(P.vocab, 14, used), ...take(P.grammar, 16, used), ...take(P.func, 8, used));
    fill(rest, 50 - read.length, [P.grammar, P.vocab, P.func], used);
    const qs = read.map(q => clone(q, { marks: 2, sec: 'r', label: 'القراءة' })).concat(U.shuffle(rest).map(q => clone(q, { marks: 2, sec: 'l', label: 'اللغة' })));
    return { qs, sections: [{ key: 'r', label: 'أسئلة النصوص' }, { key: 'l', label: 'المفردات والقواعد والوظائف' }] };
  }

  function buildQuick(units) {
    const P = pools(units), used = new Set();
    const qs = [...take(P.vocab, 7, used), ...take(P.grammar, 9, used), ...take(P.func, 4, used)];
    fill(qs, 20, [P.grammar, P.vocab], used);
    return { qs: U.shuffle(qs), sections: null };
  }

  V.exam = function (el, _, query) {
    const g = S().settings.grade, scope = query.get('s') || 'all';
    const units = TAF.unitsFor(g);
    let h = `<div class="page-head"><h1>امتحانات المحاكاة</h1><p class="sub">بنمط أوراق الامتحان الوزاري — مؤقت، تسليم، ثم تصحيح وشرح لكل سؤال</p></div>`;
    if (!units.length) { el.innerHTML = h + `<div class="empty">${I.exam}<p>المحتوى قيد الإعداد لهذا الصف.</p></div>`; return; }
    const sems = [...new Set(units.map(u => u.sem))];
    h += `<div class="chips">${[['all', 'كل الوحدات'], ...sems.map(s => [String(s), s === 1 ? 'الفصل الأول' : 'الفصل الثاني'])].map(([k, t]) => `<a class="chip" href="#/exam?s=${k}" aria-current="${k === scope}">${t}</a>`).join('')}</div>`;
    const list = g === 11 ? ['g11', 'quick'] : ['adv', 'g11', 'quick'];
    h += `<div class="ruled">`;
    list.forEach(k => {
      const f = FORMATS[k];
      const title = k === 'g11' && g === 12 ? 'نموذج الورقة الشاملة (28 + قراءة + كتابة)' : f.title;
      h += `<a href="#/exam/run/${k}?s=${scope}"><span class="num">${I.clock}</span><span class="grow"><span class="t">${esc(title)}</span><span class="d">${esc(f.desc)}</span></span><span class="chev">${I.chevron}</span></a>`;
    });
    h += `<a href="#/tips"><span class="num">${I.bulb}</span><span class="grow"><span class="t">نصائح الامتحان وتوزيع الوقت</span><span class="d">استراتيجية كل سؤال في الورقة الوزارية</span></span><span class="chev">${I.chevron}</span></a>`;
    h += `<a href="#/units"><span class="num">${I.exam}</span><span class="grow"><span class="t">اختبارات الوحدات</span><span class="d">اختبار شامل لكل وحدة من داخل صفحة الوحدة</span></span><span class="chev">${I.chevron}</span></a></div>`;
    h += `<div class="note tip" style="margin-top:1rem">${I.bulb}<div>${g === 11
      ? 'الامتحان الوزاري للصف الحادي عشر (جيل 2008 و2009) كان ورقياً: 28 سؤال اختيار من متعدد على ورقة الإجابة، ثم قراءة وكتابة في دفتر الإجابة، ومدته ساعتان. أما جيل 2010 فالإنجليزي عندهم في الحادي عشر مادة مدرسية، والنموذج مفيد لهم للتدريب.'
      : 'ورقة «الإنجليزي المتقدم» لجيل 2008 (تموز 2026) كانت 50 سؤال اختيار من متعدد في ساعتين. قد تتغير المواصفات لجيل 2009؛ تابع إعلانات وزارة التربية الرسمية.'}</div></div>`;
    const hist = S().exams.filter(x => x.kind === 'exam' && x.grade === g).slice(0, 8);
    if (hist.length) h += `<h2>محاولاتك السابقة</h2><div class="ruled">${hist.map(x => `<div class="item"><span class="grow"><span class="t">${esc(x.title)}</span><span class="d">${new Date(x.t).toLocaleDateString('ar-JO')} · ${U.fmtTime(x.secs)}</span></span><b>${x.pct}%</b></div>`).join('')}</div>`;
    el.innerHTML = h;
  };

  V.examRun = function (el, [kind], query) {
    const g = S().settings.grade, scope = query.get('s') || 'all';
    const f = FORMATS[kind]; if (!f) return V.notFound(el);
    const units = scopeUnits(g, scope);
    const built = kind === 'g11' ? buildG11(units) : kind === 'adv' ? buildAdv(units) : buildQuick(units);
    if (!query.get('go')) {
      el.innerHTML = `<div class="page-head"><h1>${esc(f.title)}</h1><p class="sub">${esc(f.desc)}</p></div>
        <div class="sheet"><ul class="summary-list">
        <li>عدد الأسئلة: ${built.qs.length} · الوقت: ${f.mins} دقيقة</li>
        <li>لا تظهر الإجابات الصحيحة إلا بعد التسليم، تماماً كالامتحان الحقيقي.</li>
        <li>تنقّل بين الأسئلة بحرية من خلال لوحة الأرقام أسفل السؤال.</li>
        ${kind === 'g11' ? '<li>الكتابة الحرة تقيّمها بنفسك بعد التسليم وفق معايير التصحيح (من 10).</li>' : ''}
        <li>اجلس في مكان هادئ وأغلق الإشعارات.</li></ul>
        <div class="row" style="margin-top:1rem"><a class="btn" href="#/exam/run/${kind}?s=${scope}&go=1">ابدأ الامتحان الآن</a><a class="btn ghost" href="#/exam">رجوع</a></div></div>`;
      return;
    }
    const rec = { t: Date.now(), kind: 'exam', grade: g, title: f.title, pct: 0, secs: 0 };
    el.innerHTML = `<div id="qz"></div>`;
    TAF.Quiz.run(U.$('#qz', el), built.qs, {
      mode: 'exam', timeLimit: f.mins * 60, sections: built.sections,
      confirmExit: 'هل تريد الخروج من الامتحان؟ لن تُحفظ إجاباتك.', onExit: () => go('#/exam'),
      doneLabel: 'العودة للامتحانات', onDone: () => go('#/exam'),
      onFinish: r => { rec.pct = r.pct; rec.secs = Math.round(r.secs); const s = S(); s.exams.unshift(rec); s.exams = s.exams.slice(0, 60); store.save(); },
      onUpdate: r => { rec.pct = r.pct; store.save(); }
    });
  };
})();

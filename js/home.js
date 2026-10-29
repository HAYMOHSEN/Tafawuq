/* Tafawuq English — dashboard, onboarding, achievements, my words, speed round. */
(function () {
  'use strict';
  const TAF = window.TAF, U = TAF.util, md = U.md, esc = U.esc, store = TAF.store, I = TAF.icon, V = TAF.views;
  const S = () => store.s;
  const grade = () => S().settings.grade;
  const go = h => { location.hash = h; };
  const DAY = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
  const DAYN = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  const hash = str => { let h = 5381; for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0; return Math.abs(h); };
  function wordOfDay(g) {
    const all = TAF.allVocab(g).filter(v => v.w.split(/\s+/).length <= 3);
    if (!all.length) return null;
    return all[hash(U.today() + ':' + g) % all.length];
  }
  function weekBars() {
    const s = S(), goal = TAF.game.goal(), out = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.getFullYear() + '-' + U.pad(d.getMonth() + 1) + '-' + U.pad(d.getDate());
      const q = (s.log[key] || {}).q || 0;
      const cls = (i === 0 ? 'today ' : '') + (q >= goal ? 'hit' : q > 0 ? 'on' : '');
      out.push(`<div class="d ${cls}" title="${DAYN[d.getDay()]}: ${q} إجابة"><i style="height:${Math.max(4, Math.min(1, q / goal) * 40)}px"></i><span>${DAY[d.getDay()]}</span></div>`);
    }
    return `<div class="weekbars" role="img" aria-label="نشاطك في آخر 7 أيام">${out.join('')}</div>`;
  }
  const streakNow = () => { const st = S().streak; return st.last === U.today() || (st.last && U.dayDiff(st.last, U.today()) === 1) ? st.count : 0; };

  /* ---------- HOME ---------- */
  V.home = function (el) {
    const g = grade(), s = S(); store.rollDay();
    const units = TAF.unitsFor(g);
    const inf = TAF.game.info(s.xp);
    const goal = TAF.game.goal(), done = Math.min(s.daily.answered, goal), hit = s.daily.answered >= goal;
    const due = TAF.srs.dueCards(g).length;
    const mistakes = Object.keys(s.mistakes).filter(id => TAF.qIndex[id] && TAF.byId[TAF.qIndex[id].unit] && TAF.byId[TAF.qIndex[id].unit].grade === g).length;
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'صباح الخير' : hour < 18 ? 'مساء الخير' : 'مساء النور';
    const nm = s.settings.name ? ' يا ' + esc(s.settings.name) : '';
    const sk = streakNow();
    const msg = hit ? 'حققت هدف اليوم — عمل رائع!' : sk >= 3 ? `${U.arN(sk, U.AR.day)} متتالية، لا تكسر السلسلة!` : done > 0 ? `باقي ${U.arN(goal - done, U.AR.answer)} على هدف اليوم` : 'جاهز لإنجاز اليوم؟';
    const mood = hit ? 'cheer' : hour >= 23 || hour < 5 ? 'sleepy' : 'happy';

    let h = `<section class="home-hero"><div>${TAF.mascot(mood, 78)}</div><div><h1>${greet}${nm}</h1><p>${msg}</p></div></section>`;

    // backup reminder (gentle, only when there is something worth saving)
    const daysSince = s.meta.lastExport ? (Date.now() - s.meta.lastExport) / 864e5 : 999;
    if (s.xp >= 150 && daysSince > 14 && !(s.meta.nudgeUntil > Date.now())) {
      h += `<div class="nudge" style="margin-bottom:.8rem"><p>تقدّمك محفوظ على هذا الجهاز فقط. خذ نسخة احتياطية الآن لتحميه.</p><a class="btn sm" href="#/more">نسخة احتياطية</a><button class="iconbtn" data-dismiss-nudge aria-label="إخفاء">${I.x}</button></div>`;
    }

    h += `<a class="sheet lvl-card" href="#/achievements" aria-label="مستواك وإنجازاتك"><div class="lvl-top"><span class="lvl-chip">المستوى <b>${inf.level}</b> · ${esc(inf.ar)}</span><span class="small muted en">${s.xp} XP</span></div><div class="xpbar" role="progressbar" aria-label="تقدّمك نحو المستوى التالي" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(inf.pct)}"><i style="width:${Math.max(3, inf.pct)}%"></i></div><div class="small muted" style="margin-top:.35rem">${U.arN(inf.span - inf.into, U.AR.point)} للمستوى التالي</div></a>`;

    h += `<div class="dash">
      <div class="sheet tile"><div class="goal-ring ${hit ? 'hit' : ''}" style="--p:${done / goal * 100}"><div class="gr"><b>${done}</b><span>من ${goal}</span></div></div><div class="cap">هدف اليوم (إجابات)</div></div>
      <div class="sheet tile"><div class="streak-n ${sk ? '' : 'cold'}">${I.flame}<span>${sk}</span></div><div class="cap">${sk === 1 ? 'يوم' : 'أيام'} متتالية</div>${weekBars()}</div>
    </div>`;

    // next step
    const nx = TAF.nextStep ? TAF.nextStep(g) : null;
    if (nx) {
      h += `<a class="sheet next-card" href="${nx.s.href}" style="display:block;text-decoration:none;color:inherit;margin-top:.8rem"><div class="label">تابع من حيث توقفت</div><div class="what">الوحدة ${nx.u.n}: ${esc(nx.s.title)}</div><div class="muted small"><span class="en">${esc(nx.u.title)}</span> — <span class="en">${esc(nx.s.en)}</span></div><div style="margin-top:.7rem"><span class="btn sm">ابدأ الآن</span></div></a>`;
    } else if (!units.length) {
      h += `<div class="sheet next-card" style="margin-top:.8rem"><div class="what">محتوى الصف ${g === 11 ? 'الحادي عشر' : 'الثاني عشر'} قيد الإضافة</div><p class="muted" style="margin:.3rem 0 0">يمكنك تبديل الصف من الأعلى. تُضاف الوحدات تباعاً مع كل تحديث.</p></div>`;
    } else {
      h += `<div class="sheet next-card" style="margin-top:.8rem"><div class="what">أنهيت كل أقسام الصف 🎉</div><p class="muted">حافظ على مستواك بالمراجعة اليومية وامتحانات المحاكاة.</p><a class="btn sm" href="#/exam">امتحان محاكاة</a></div>`;
    }

    // word of the day
    const w = wordOfDay(g);
    if (w) {
      const key = TAF.words.key(w.unit, w.w), starred = TAF.words.has(key);
      h += `<div class="sheet wod" style="margin-top:.8rem"><div class="wod-row"><span class="cap">كلمة اليوم</span><span class="row" style="gap:.3rem">${TAF.speakBtn(w.w, 'انطق الكلمة')}<button class="speak" data-star-wod aria-pressed="${starred}" aria-label="${starred ? 'إزالة من كلماتي' : 'أضف إلى كلماتي'}" title="كلماتي" style="${starred ? 'background:var(--hl);color:var(--ink)' : ''}">${I.star}</button></span></div><div class="w">${esc(w.w)}</div><div><b>${esc(w.ar)}</b> <span class="muted small en">(${esc(w.pos)})</span></div><div class="ex">“${esc(w.ex)}”</div></div>`;
    }

    // readiness
    const rd = TAF.game.readiness(g);
    h += `<div class="sheet ready" style="margin-top:.8rem"><div class="ready-top"><div>${rd.enough ? `<div class="big">${Math.round(rd.score)}%</div>` : `<div class="big" style="color:var(--ink-3)">—</div>`}</div><div><b>جاهزيتك للامتحان</b><div class="small muted">${rd.enough ? 'تقدير من دقتك في كل مهارة، موزّعة كما في ورقة الامتحان' : 'حلّ بعض التمارين ليظهر لك تقدير جاهزيتك'}</div></div></div>`;
    rd.areas.forEach(a => {
      const p = a.acc == null ? 0 : Math.round(a.acc * 100);
      h += `<div class="meter"><span>${a.ar}</span><div class="bar"><i class="${a.acc == null ? '' : p < 60 ? 'low' : p < 80 ? 'mid' : ''}" style="width:${p}%;${a.acc != null && p < 60 ? 'background:var(--red)' : a.acc != null && p < 80 ? 'background:var(--hl)' : a.acc != null ? 'background:var(--green)' : ''}"></i></div><small>${a.acc == null ? '—' : p + '%'}</small></div>`;
    });
    if (s.settings.examDate) { const days = U.dayDiff(U.today(), s.settings.examDate); h += `<div class="small muted" style="margin-top:.2rem">${days > 0 ? `باقي <b>${U.arN(days, U.AR.day)}</b> على امتحانك` : days === 0 ? 'امتحانك اليوم — بالتوفيق!' : 'مضى موعد امتحانك — حدّث التاريخ من الإعدادات'}</div>`; }
    else h += `<a class="small" href="#/more">حدّد موعد امتحانك لنرتّب لك الخطة</a>`;
    h += `</div>`;

    // quick actions
    const qa = (href, ic, t, sub, dot) => `<a class="qa" href="${href}">${dot ? `<span class="dot">${dot}</span>` : ''}<span class="ic">${ic}</span>${t}${sub ? `<small>${sub}</small>` : ''}</a>`;
    h += `<h2>اختصارات</h2><div class="qa-grid">`
      + qa('#/review', I.cards, 'مراجعة', due ? 'بطاقات اليوم' : 'لا شيء مستحق', due || '')
      + qa('#/speed', I.clock, 'جولة سريعة', '60 ثانية')
      + qa('#/words', I.star, 'كلماتي', `${Object.keys(s.stars).length} كلمة`)
      + qa('#/mistakes', I.notebook, 'أخطائي', mistakes ? 'صحّحها الآن' : 'دفتر نظيف', mistakes || '')
      + qa('#/exam', I.exam, 'امتحان', 'محاكاة')
      + qa('#/print', I.print, 'طباعة', 'أوراق وتقارير')
      + `</div>`;
    el.innerHTML = h;
    el.onclick = e => {
      if (e.target.closest('[data-dismiss-nudge]')) { s.meta.nudgeUntil = Date.now() + 5 * 864e5; store.save(); TAF.app.render(true); }
      const b = e.target.closest('[data-star-wod]');
      if (b && w) { const on = TAF.words.toggle({ key: TAF.words.key(w.unit, w.w), w: w.w, ar: w.ar, ex: w.ex, unit: w.unit }); b.style.cssText = on ? 'background:var(--hl);color:var(--ink)' : ''; b.setAttribute('aria-pressed', on); U.toast(on ? 'أُضيفت إلى كلماتي' : 'أُزيلت من كلماتي'); }
    };
  };

  /* ---------- ACHIEVEMENTS ---------- */
  V.achievements = function (el) {
    const s = S(), inf = TAF.game.info(s.xp), B = TAF.game.BADGES;
    const got = B.filter(b => s.badges[b.id]).length;
    const qAns = Object.values(s.q).reduce((a, r) => a + r.r + r.w, 0), qRight = Object.values(s.q).reduce((a, r) => a + r.r, 0);
    const words = Object.values(s.srs).filter(c => c.reps > 0).length;
    let h = `<div class="page-head"><h1>إنجازاتي</h1><p class="sub">كل خطوة تُحتسب. استمر!</p></div>`;
    h += `<div class="sheet" style="text-align:center"><div>${TAF.mascot(got ? 'cheer' : 'happy', 92)}</div><div class="lvl-chip" style="margin:.4rem auto">المستوى <b>${inf.level}</b> · ${esc(inf.ar)}</div><p class="muted small en" style="margin:.1rem 0 .6rem">${esc(inf.en)}</p><div class="xpbar"><i style="width:${Math.max(3, inf.pct)}%"></i></div><p class="small muted" style="margin:.4rem 0 0"><b class="en">${s.xp}</b> نقطة · ${U.arN(inf.span - inf.into, U.AR.point)} للمستوى التالي</p></div>`;
    h += `<div class="sheet" style="margin-top:.8rem"><div class="stat-line"><span><b>${qAns}</b> إجابة</span><span><b>${qAns ? Math.round(qRight / qAns * 100) : 0}%</b> دقة</span><span><b>${words}</b> كلمة</span><span><b>${streakNow()}</b> أيام متتالية</span><span><b>${got}</b>/${B.length} وسام</span></div></div>`;
    h += `<h2>الأوسمة</h2><div class="badge-grid">${B.map(b => { const on = !!s.badges[b.id]; return `<div class="badge-card ${on ? '' : 'locked'}">${TAF.game.badgeIcon(b, 58)}<b>${esc(b.ar)}</b><small>${esc(b.d)}</small>${on ? `<small class="ok-text">${new Date(s.badges[b.id]).toLocaleDateString('ar-JO-u-nu-latn')}</small>` : ''}</div>`; }).join('')}</div>`;
    h += `<h2>سُلّم المستويات</h2><div class="ruled">${TAF.game.NAMES.map((n, i) => { const l = i + 1; return `<div class="item"><span class="num" style="${inf.level >= l ? 'background:var(--blue);color:#fff' : ''}">${l}</span><span class="grow"><span class="t">${n[1]} <span class="en muted small">${n[0]}</span></span><span class="d">من ${TAF.game.need(l)} نقطة</span></span>${inf.level >= l ? `<span style="color:var(--green)">${I.check}</span>` : ''}</div>`; }).join('')}</div>`;
    el.innerHTML = h;
  };

  /* ---------- MY WORDS ---------- */
  function wordsCSV(list) {
    const q = x => '"' + String(x == null ? '' : x).replace(/"/g, '""') + '"';
    return '﻿' + 'English,Arabic,Example,Unit\r\n' + list.map(w => [w.w, w.ar, w.ex, w.unit].map(q).join(',')).join('\r\n');
  }
  TAF.wordsCSV = wordsCSV;
  V.words = function (el, _, query) {
    const s = S(), list = TAF.words.list();
    // words the learner keeps forgetting are surfaced automatically
    const hard = TAF.allVocab(grade()).filter(v => s.srs[v.id] && s.srs[v.id].lapses >= 2 && !s.stars[TAF.words.key(v.unit, v.w)]);
    if (query.get('go') === 'cards') {
      el.innerHTML = `<div class="page-head"><h1>مراجعة كلماتي</h1></div><div id="fs"></div>`;
      const cards = list.map(w => ({ id: w.key, w: w.w, ar: w.ar || '—', def: '', ex: w.ex || '', pos: '', unit: w.unit }));
      return TAF.flashSession(U.$('#fs', el), U.shuffle(cards), { back: '#/words' });
    }
    if (query.get('go') === 'quiz') {
      el.innerHTML = `<div class="page-head"><h1>اختبر كلماتي</h1></div><div id="qz"></div>`;
      const items = list.filter(w => w.ar);
      const qs = U.sample(items, Math.min(12, items.length)).map((w, i) => {
        const others = U.sample(items.filter(x => x !== w), 3);
        if (others.length < 2) return null;
        const opts = U.shuffle([w, ...others]);
        return { id: w.key + '|my', topic: 'vocab:' + (w.unit || 'x'), unit: w.unit, t: 'mcq', q: i % 2 ? w.ar : w.w, rtl: i % 2 === 1, say: i % 2 ? '' : w.w, arOpts: i % 2 === 0, o: opts.map(x => i % 2 ? x.w : x.ar), a: opts.indexOf(w), x: `${w.w} = ${w.ar}` };
      }).filter(Boolean);
      if (!qs.length) { el.innerHTML = `<div class="empty">${I.star}<p>أضف 3 كلمات على الأقل مع معانيها لتختبر نفسك.</p><a class="btn" href="#/words">عودة</a></div>`; return; }
      return TAF.Quiz.run(U.$('#qz', el), qs, { onExit: () => go('#/words'), onDone: () => go('#/words'), doneLabel: 'عودة لكلماتي', record: false });
    }
    let h = `<div class="page-head"><h1>كلماتي</h1><p class="sub">كلماتك المفضّلة التي أضفتها بنجمة، وكلمات تنساها كثيراً</p></div>`;
    if (!list.length) h += `<div class="sheet words-empty">${TAF.mascot('think', 84)}<p><b>قائمتك فارغة</b></p><p class="muted">اضغط على النجمة بجانب أي كلمة (في المفردات أو أثناء القراءة) لتجمعها هنا وتراجعها وتطبعها.</p><a class="btn" href="#/units">تصفّح الوحدات</a></div>`;
    else {
      h += `<div class="row no-print" style="margin-bottom:.9rem"><a class="btn" href="#/words?go=cards">${I.cards} راجعها كبطاقات</a><a class="btn ghost" href="#/words?go=quiz">اختبرني</a><button class="btn ghost" data-csv>تصدير CSV</button><a class="btn ghost" href="#/print/vocab?starred=1">${I.print} طباعة</a></div>`;
      h += `<div class="ruled vocab-list">${list.map(w => `<div class="item" data-k="${esc(w.key)}">${TAF.speakBtn(w.w, 'انطق ' + w.w)}<span class="grow"><span class="w">${esc(w.w)}</span><span class="t" style="font-weight:500">${esc(w.ar || '—')}</span>${w.ex ? `<span class="ex">${esc(w.ex)}</span>` : ''}</span><button class="iconbtn" data-unstar aria-label="إزالة">${I.x}</button></div>`).join('')}</div>`;
    }
    if (hard.length) h += `<h2>تحتاج انتباهاً</h2><p class="muted small" style="margin-top:-.3rem">كلمات نسيتها أكثر من مرة في البطاقات.</p><div class="ruled vocab-list">${hard.slice(0, 15).map(v => `<div class="item">${TAF.speakBtn(v.w)}<span class="grow"><span class="w">${esc(v.w)}</span><span class="t" style="font-weight:500">${esc(v.ar)}</span></span><button class="btn soft sm" data-addhard="${esc(v.id)}">⭐ أضف</button></div>`).join('')}</div>`;
    el.innerHTML = h;
    el.onclick = e => {
      const c = e.target.closest('[data-csv]'); if (c) { U.download(`tafawuq-my-words-${U.today()}.csv`, wordsCSV(list), 'text/csv;charset=utf-8'); return; }
      const u = e.target.closest('[data-unstar]'); if (u) { const k = u.closest('[data-k]').dataset.k; TAF.words.toggle({ key: k }); TAF.app.render(true); return; }
      const a = e.target.closest('[data-addhard]'); if (a) { const v = TAF.allVocab(grade()).find(x => x.id === a.dataset.addhard); if (v) { TAF.words.toggle({ key: TAF.words.key(v.unit, v.w), w: v.w, ar: v.ar, ex: v.ex, unit: v.unit }); TAF.game.check(); TAF.app.render(true); } }
    };
  };

  /* ---------- SPEED ROUND ---------- */
  V.speed = function (el) {
    const g = grade(), s = S();
    const units = TAF.unitsFor(g);
    const opened = units.filter(u => store.isDone('open:' + u.id));
    const src = opened.length ? opened : units;
    const best = s.cnt.speedBest || 0;
    const intro = () => {
      el.innerHTML = `<div class="page-head"><h1>الجولة السريعة</h1><p class="sub">أجب عن أكبر عدد ممكن خلال 60 ثانية — المفردات والقواعد معاً</p></div>
        <div class="sheet speed-start">${TAF.mascot('wow', 96)}<p style="margin:.3rem 0"><b>أفضل نتيجة لك: ${best}</b></p><p class="muted small">كل 3 إجابات متتالية تزيد المكافأة. الخطأ يكسر السلسلة فقط ولا يُنقص نقاطك.</p>${src.length ? `<button class="btn" data-go>ابدأ الجولة</button>` : `<p class="muted">لا توجد وحدات لهذا الصف بعد.</p>`}</div>`;
    };
    intro();
    const pool = () => {
      const vq = src.flatMap(u => TAF.vocabQuiz(u.vocab || [], u, 8));
      const gq = src.flatMap(u => (u.grammar || []).flatMap(gr => (gr.qs || []).filter(q => q.t === 'mcq')));
      return U.shuffle(vq.concat(U.sample(gq, 30))).filter(q => q.o && q.o.length >= 3 && q.q);
    };
    function run() {
      const qs = pool(); let i = 0, right = 0, combo = 0, bestCombo = 0, left = 60, locked = false, over = false, held = true;
      TAF.game.holdOn();
      const release = () => { if (held) { held = false; TAF.game.holdOff(); } };
      const tmr = setInterval(() => { left--; paint(); if (left <= 0) end(); }, 1000);
      TAF.app.onLeave(() => { clearInterval(tmr); over = true; release(); });
      function paint() {
        const q = qs[i % qs.length];
        const bar = U.$('.speed-hud .bar', el); if (bar) { bar.classList.toggle('low', left <= 10); U.$('i', bar).style.width = (left / 60 * 100) + '%'; }
        const sc = U.$('.score', el); if (sc) sc.textContent = right;
        const tm = U.$('.timer', el); if (tm) tm.textContent = left;
        if (!U.$('[data-q]', el)) draw(q);
      }
      function draw(q) {
        el.innerHTML = `<div class="speed-hud"><span class="timer en" style="font-weight:700;min-width:2rem">${left}</span><div class="bar ${left <= 10 ? 'low' : ''}"><i style="width:${left / 60 * 100}%"></i></div><span class="score">${right}</span></div>
          <div class="q-card" data-q>${combo >= 3 ? `<span class="combo">${I.flame}×${combo}</span>` : ''}
          ${q.rtl ? `<div class="q-text" style="direction:rtl;text-align:right;font-family:var(--font-ui)">${md(q.q)}</div>` : `<div class="q-text">${md(q.q, { noBidi: true }).replace(/_{4}/g, '<span class="blank"></span>')}</div>`}
          <div class="opts ${q.arOpts ? 'ar-opts' : ''}">${q.o.map((o, k) => `<button type="button" class="opt" data-o="${k}"><span class="bubble">${'abcd'[k]}</span><span>${md(o, { noBidi: !q.arOpts })}</span></button>`).join('')}</div></div>`;
      }
      el.onclick = e => {
        const b = e.target.closest('[data-o]'); if (!b || locked || over) return;
        locked = true; const q = qs[i % qs.length], k = +b.dataset.o, ok = k === q.a;
        b.classList.add(ok ? 'right' : 'wrong');
        if (!ok) { const r = U.$(`[data-o="${q.a}"]`, el); r && r.classList.add('right'); }
        TAF.ui.sfx(ok ? 'ok' : 'no');
        if (ok) { right++; combo++; bestCombo = Math.max(bestCombo, combo); } else combo = 0;
        setTimeout(() => { locked = false; if (over) return; i++; draw(qs[i % qs.length]); const sc = U.$('.score', el); if (sc) sc.textContent = right; }, ok ? 380 : 900);
      };
      function end() {
        if (over) return; over = true; clearInterval(tmr); release();
        const newBest = right > (s.cnt.speedBest || 0);
        if (newBest) s.cnt.speedBest = right;
        const xp = right * 2 + bestCombo * 2;
        store.save();
        TAF.game.xp(xp, 'الجولة السريعة'); TAF.game.queueCheck();
        if (newBest && right > 0) { TAF.game.celebrate(); }
        el.onclick = ev => { if (ev.target.closest('[data-again]')) V.speed(el); };
        el.innerHTML = `<div class="sheet result-score">${TAF.mascot(right >= 15 ? 'cheer' : 'happy', 92)}<div class="big">${right}</div><p style="margin:.4rem 0 .1rem">إجابة صحيحة في 60 ثانية</p><p class="muted small" style="margin:0">أطول سلسلة: ${bestCombo} · ${newBest && right > 0 ? '🎉 رقم قياسي جديد!' : 'أفضل نتيجة: ' + (s.cnt.speedBest || 0)}</p><div class="row" style="justify-content:center;margin-top:1rem"><button class="btn" data-again>جولة جديدة</button><a class="btn ghost" href="#/practice">التدريب</a></div></div>`;
      }
      draw(qs[0]);
    }
    el.onclick = e => { if (e.target.closest('[data-go]')) run(); };
  };

  /* ---------- STUDY PLAN ---------- */
  V.plan = function (el) {
    const g = grade(), s = S(), units = TAF.unitsFor(g);
    const rem = [];
    units.forEach(u => TAF.unitSections(u).forEach(sec => { if (!TAF.sectionDone(u, sec.key)) rem.push({ u, sec }); }));
    const hasDate = !!s.settings.examDate;
    const left = hasDate ? U.dayDiff(U.today(), s.settings.examDate) : null;
    let h = `<div class="page-head"><h1>خطة الدراسة</h1><p class="sub">${hasDate && left > 0 ? `باقي ${U.arN(left, U.AR.day)} على امتحانك — وزّعنا الأقسام المتبقية على الأيام` : 'خطة مقترحة بإيقاع ثابت — حدّد موعد امتحانك لنضبطها عليه'}</p></div>`;
    if (!units.length) { el.innerHTML = h + `<div class="empty">${I.book}<p>محتوى هذا الصف قيد الإضافة.</p></div>`; return; }
    if (!hasDate || left <= 0) h += `<div class="nudge" style="margin-bottom:1rem"><p>${hasDate ? 'مضى موعد امتحانك — حدّث التاريخ.' : 'لم تحدد موعد امتحانك بعد.'}</p><a class="btn sm" href="#/more">حدّد الموعد</a></div>`;
    const mock = hasDate && left > 3 ? Math.min(7, Math.floor(left / 4)) : 0;
    const studyDays = hasDate && left > 0 ? Math.max(1, left - mock) : Math.max(1, Math.ceil(rem.length / 2));
    const per = Math.max(1, Math.min(6, Math.ceil(rem.length / studyDays)));
    const horizon = Math.min(hasDate && left > 0 ? left : 14, 21);
    const days = [];
    let cursor = 0;
    for (let d = 0; d < horizon; d++) {
      const date = new Date(); date.setDate(date.getDate() + d);
      const isMock = hasDate && left > 0 && d >= left - mock;
      const tasks = [];
      if (isMock) { tasks.push({ t: 'امتحان محاكاة كامل بمواصفات الامتحان الوزاري', href: '#/exam' }); tasks.push({ t: 'صحّح أخطاءك وراجعها', href: '#/mistakes' }); }
      else {
        rem.slice(cursor, cursor + per).forEach(x => tasks.push({ t: `الوحدة ${x.u.n} — ${x.sec.title}`, href: x.sec.href }));
        cursor += per;
        if (d % 3 === 2 || !tasks.length) { tasks.push({ t: 'راجع بطاقات اليوم', href: '#/review' }); tasks.push({ t: 'جولة سريعة للمفردات والقواعد', href: '#/speed' }); }
        else if (d % 3 === 0) tasks.push({ t: 'دقيقتان: كلمة اليوم وأخطاء الأمس', href: '#/' });
      }
      days.push({ date, tasks, isMock });
    }
    h += `<div class="row no-print" style="margin-bottom:.8rem"><button class="btn ghost sm" onclick="window.print()">${I.print} اطبع الخطة</button><a class="btn ghost sm" href="#/tips">نصائح الامتحان</a></div>`;
    h += days.map((x, i) => `<div class="sheet cheat-unit" style="${i ? '' : 'border-inline-start:5px solid var(--hl)'}"><div class="row" style="justify-content:space-between"><b>${i === 0 ? 'اليوم' : i === 1 ? 'غداً' : x.date.toLocaleDateString('ar-JO-u-nu-latn', { weekday: 'long' })}</b><span class="small muted">${x.date.toLocaleDateString('ar-JO-u-nu-latn', { day: 'numeric', month: 'long' })}${x.isMock ? ' · أسبوع المحاكاة' : ''}</span></div><ul class="task-list plan-list">${x.tasks.map(t => `<li><a href="${t.href}" style="margin:0;text-decoration:none;color:inherit;flex:1">${esc(t.t)}</a><span class="chev muted">${I.chevron}</span></li>`).join('')}</ul></div>`).join('');
    if (cursor < rem.length) h += `<p class="muted small">بعد هذه الفترة يبقى ${U.arN(rem.length - cursor, U.AR.section)} — ستظهر في الأيام التالية.</p>`;
    el.innerHTML = h;
  };

  /* ---------- EXAM TIPS ---------- */
  V.tips = function (el) {
    const g = grade();
    const card = (t, items) => `<div class="sheet" style="margin-top:.8rem"><h3 style="margin-top:0">${t}</h3><ul class="summary-list">${items.map(x => `<li>${md(x)}</li>`).join('')}</ul></div>`;
    let h = `<div class="page-head"><h1>نصائح الامتحان</h1><p class="sub">خطة الوقت واستراتيجيات كل سؤال — مبنية على أوراق الامتحان الوزارية المنشورة</p></div>`;
    h += `<div class="sheet"><h3 style="margin-top:0">توزيع الوقت المقترح (ساعتان)</h3>${TAF.tableHTML(['القسم', 'الوقت', 'ملاحظة'], g === 11 ? [
      ['السؤال الأول — 28 اختياراً', '40–45 دقيقة', 'دقيقة ونصف للسؤال تقريباً؛ أجِب السهل أولاً'],
      ['السؤال الثاني — القراءة', '40 دقيقة', 'اقرأ الأسئلة قبل النص'],
      ['السؤال الثالث — الكتابة', '30 دقيقة', 'ثلاث دقائق للتخطيط'],
      ['المراجعة', '5–10 دقائق', 'ورقة الإجابة والترقيم']] : [
      ['الأسئلة 1–12 (النصوص)', '45 دقيقة', 'اقرأ الأسئلة ثم النص'],
      ['الأسئلة 13–50 (اللغة)', '60 دقيقة', 'أقل من دقيقتين للسؤال'],
      ['المراجعة', '10–15 دقيقة', 'ورقة الإجابة والأسئلة المؤجلة']])}</div>`;
    h += card('أسئلة الاختيار من متعدد (المفردات والقواعد)', [
      'اقرأ الجملة كاملة قبل النظر إلى الخيارات، وحدّد **ما الذي يُختبر**: زمن؟ حرف جر؟ شكل الكلمة؟ ترتيب؟',
      'احذف الخيارين الخاطئين بوضوح أولاً، ثم قارن بين الباقيَين.',
      'في المفردات: خذ المعنى من السياق وليس من أول كلمة تعرفها؛ انتبه إلى المتلازمات (collocations) والأفعال المركبة.',
      'في القواعد: كلمات مثل **by the time, since, yesterday, if, unless, hardly** تحدّد الزمن أو التركيب.',
      'أسئلة «This means that…» تُختبر في الشرطيات والتمنّي: اقلب الجملة إلى واقعها (If I had studied = I didn\'t study).',
      'أجِب عن كل الأسئلة: لا تترك فراغاً (راجع تعليمات ورقتك بشأن الخصم).']);
    h += card('السؤال الثاني: القراءة والأسئلة الكتابية', [
      'ابدأ بقراءة الأسئلة ثم اقرأ النص مرة واحدة بتركيز وضع علامة على موضع كل إجابة.',
      'عندما يقول السؤال **copy / find** فانقل من النص حرفياً؛ وعندما يقول **in your own words** فأعد الصياغة.',
      'التزم بالعدد المطلوب: «اذكر نقطتين» = نقطتان فقط، لا أكثر.',
      'سؤال الضمير (what does *it* refer to?): ارجع إلى الجملة السابقة، وجرّب وضع إجابتك مكان الضمير.',
      'سؤال رأيك (give your view): جملتان؛ الأولى رأيك، والثانية سببك.']);
    h += card('ركنا الثقافة والأدب', [
      'اقرأ نصوص Culture Spot وLiterature Spot في كتابك مرة على الأقل؛ الأسئلة عنها قصيرة لكنها مضمونة العلامة لمن قرأ.',
      'في القصيدة: تعلّم عدّ المقاطع (syllables) والقافية والصور البلاغية الأساسية والمزاج العام.']);
    h += card('السؤال الثالث: الكتابة', [
      'اختر الموضوع الذي تعرف مفرداته، وليس الأسهل في الظاهر.',
      'خطّط في ثلاث دقائق: الفكرة العامة، ثلاث نقاط، خاتمة.',
      'استخدم أدوات الربط (however, as a result, in addition) بدون إفراط، وفقرات واضحة.',
      'راجع الأزمنة والفاعل مع الفعل والتهجئة في آخر دقيقتين، وعدد الكلمات المناسب هو الذي يغطي المطلوب بدقة (غالباً 150–200 كلمة).',
      'اتبع نوع النص المطلوب: رسالة رسمية، مقالة رأي، مقالة مع/ضد، تقرير… لكل منها بنية ولغة.']);
    h += `<p class="small muted" style="margin-top:1rem">هذه نصائح عامة للاستعداد، وليست تعليمات رسمية. اتبع دائماً تعليمات ورقتك الامتحانية وإعلانات وزارة التربية والتعليم.</p><div class="row" style="margin-top:.6rem"><a class="btn" href="#/exam">ابدأ امتحاناً تجريبياً</a><a class="btn ghost" href="#/plan">خطة الدراسة</a></div>`;
    el.innerHTML = h;
  };

  /* ---------- ONBOARDING ---------- */
  TAF.onboard = function () {
    const s = S().settings;
    if (s.onboarded) return;
    let step = 0; const draft = { grade: s.grade || 11, name: s.name || '', goal: s.goal || 20, exam: s.examDate || '' };
    const dots = () => `<div class="ob-dots">${[0, 1, 2].map(i => `<i class="${i === step ? 'on' : ''}"></i>`).join('')}</div>`;
    const choice = (key, val, title, sub) => `<button type="button" class="ob-choice" data-k="${key}" data-v="${val}" aria-pressed="${String(draft[key]) === String(val)}"><span class="rad"></span><span><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}</span></button>`;
    const screens = [
      () => `<div class="ui-mascot">${TAF.mascot('cheer', 118)}</div><h2 class="ui-title">أهلاً بك في «تفوّق»</h2><p class="ui-lead">أنا هايلي، سأرافقك في رحلة التفوّق بالإنجليزي: شرح مبسّط بالعربي، وتدريب ذكي، وامتحانات تحاكي امتحان الوزارة.</p><p class="muted small">إعداد سريع بثلاث خطوات (دقيقة واحدة).</p>`,
      () => `<h2 class="ui-title">في أي صف أنت؟</h2><div class="ob-choices">${choice('grade', 11, 'الحادي عشر', 'Grade 11')}${choice('grade', 12, 'الثاني عشر', 'Grade 12 — يشمل الإنجليزي المتقدم')}</div><div class="ob-field"><label for="obn">ماذا نناديك؟ (اختياري)</label><input id="obn" maxlength="24" value="${esc(draft.name)}" placeholder="اسمك الأول"></div>`,
      () => `<h2 class="ui-title">كم تريد أن تنجز يومياً؟</h2><div class="ob-choices">${choice('goal', 10, 'خفيف', '10 إجابات — خمس دقائق')}${choice('goal', 20, 'منتظم', '20 إجابة — عشر دقائق')}${choice('goal', 40, 'جاد', '40 إجابة — عشرين دقيقة')}</div><div class="ob-field"><label for="obd">موعد امتحانك (اختياري)</label><input id="obd" type="date" value="${esc(draft.exam)}"></div>`
    ];
    let boxRef = null;
    TAF.ui.modal({
      html: '<div data-ob></div>', dismissible: false, cls: 'ob',
      actions: [{ label: 'التالي', primary: true, keepOpen: true, onClick: next }, { label: 'تخطّي', keepOpen: true, onClick: close0 }],
      onOpen(box, close) { box._close = close; paint(box); }
    });
    function paint(box) {
      boxRef = box;
      U.$('[data-ob]', box).innerHTML = screens[step]() + dots();
      const main = U.$('[data-act="0"]', box); if (main) main.textContent = step === 2 ? 'ابدأ التعلّم' : step === 0 ? 'هيّا نبدأ' : 'التالي';
      const skip = U.$('[data-act="1"]', box); if (skip) skip.classList.toggle('hidden', step === 0 ? false : step === 2);
      U.$$('.ob-choice', box).forEach(b => b.onclick = () => { draft[b.dataset.k] = +b.dataset.v; paint(box); });
      const n = U.$('#obn', box); if (n) n.oninput = () => { draft.name = n.value.trim(); };
      const d = U.$('#obd', box); if (d) d.onchange = () => { draft.exam = d.value; };
    }
    function save() { Object.assign(S().settings, { grade: draft.grade, name: draft.name, goal: draft.goal, examDate: draft.exam, onboarded: true }); store.saveNow(); TAF.app.syncGrade(); }
    function next() { if (step < 2) { step++; paint(boxRef); } else { save(); boxRef._close('done'); TAF.game.celebrate(); TAF.app.render(true); } }
    function close0() { S().settings.onboarded = true; store.saveNow(); boxRef._close('skip'); }
  };
})();

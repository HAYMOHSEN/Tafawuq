/* Tafawuq English — motivation layer: XP, levels, badges, daily goal, celebrations. */
(function () {
  'use strict';
  const TAF = window.TAF, U = TAF.util, esc = U.esc, store = TAF.store, I = TAF.icon;
  const S = () => store.s;

  /* ---------- levels ---------- */
  const NAMES = [['Newcomer', 'مبتدئ'], ['Explorer', 'مستكشف'], ['Learner', 'متعلّم'], ['Achiever', 'مثابر'], ['Rising Star', 'نجم صاعد'], ['Scholar', 'دارس'], ['Expert', 'متمكّن'], ['Mentor', 'مرشد'], ['Master', 'متقن'], ['Champion', 'بطل'], ['Legend', 'أسطورة']];
  const need = l => 50 * l * (l - 1);          // cumulative XP needed to reach level l
  const levelOf = xp => { let l = 1; while (xp >= need(l + 1)) l++; return l; };
  function info(xp) {
    xp = xp || 0;
    const l = levelOf(xp), a = need(l), b = need(l + 1), nm = NAMES[Math.min(l, NAMES.length) - 1];
    return { level: l, en: nm[0], ar: nm[1] + (l > NAMES.length ? ' ' + (l - NAMES.length + 1) : ''), into: xp - a, span: b - a, pct: (xp - a) / (b - a) * 100, next: b };
  }

  /* ---------- badges ---------- */
  const doneKeys = suffix => Object.keys(S().done).filter(k => k.endsWith(suffix)).length;
  const vocabKnown = () => Object.values(S().srs).filter(c => c.reps > 0).length;
  const grammarAcc = () => { let r = 0, w = 0; Object.keys(S().topics).forEach(k => { if (TAF.topics[k] && TAF.topics[k].kind === 'grammar') { r += S().topics[k].r; w += S().topics[k].w; } }); return { n: r + w, acc: r + w ? r / (r + w) : 0 }; };
  const unitsDone = () => TAF.units.filter(u => TAF.unitProgress && TAF.unitProgress(u) >= 100).length;
  const C = k => (S().cnt[k] || 0);
  const BADGES = [
    { id: 'first', ar: 'الخطوة الأولى', d: 'أجب عن أول سؤال لك', ic: 'target', c: '#2B3A9E', t: () => Object.keys(S().q).length >= 1 },
    { id: 'words50', ar: 'جامع الكلمات', d: 'ادخل 50 كلمة في المراجعة', ic: 'cards', c: '#17845A', t: () => vocabKnown() >= 50 },
    { id: 'words200', ar: 'سيّد المفردات', d: 'تعلّم 200 كلمة', ic: 'book', c: '#0E6B4A', t: () => vocabKnown() >= 200 },
    { id: 'guru', ar: 'خبير القواعد', d: 'دقة 90% في 60 إجابة قواعد', ic: 'pen', c: '#7A3EB1', t: () => { const g = grammarAcc(); return g.n >= 60 && g.acc >= .9; } },
    { id: 'streak3', ar: 'ثلاثة أيام', d: 'ادرس 3 أيام متتالية', ic: 'flame', c: '#E07A1F', t: () => S().streak.count >= 3 },
    { id: 'streak7', ar: 'أسبوع كامل', d: 'ادرس 7 أيام متتالية', ic: 'flame', c: '#D95D0F', t: () => S().streak.count >= 7 },
    { id: 'streak30', ar: 'شهر من الالتزام', d: 'ادرس 30 يوماً متتالياً', ic: 'flame', c: '#C23B0A', t: () => S().streak.count >= 30 },
    { id: 'goal7', ar: 'صاحب الهدف', d: 'حقق هدف اليوم 7 مرات', ic: 'target', c: '#1F8FA8', t: () => C('goalDays') >= 7 },
    { id: 'perfect', ar: 'علامة كاملة', d: '100% في اختبار وحدة', ic: 'star', c: '#C99A00', t: () => C('perfect') >= 1 },
    { id: 'exam85', ar: 'متفوّق في المحاكاة', d: '85% أو أكثر في امتحان محاكاة', ic: 'exam', c: '#2B3A9E', t: () => S().exams.some(x => x.kind === 'exam' && x.pct >= 85) },
    { id: 'speed20', ar: 'سريع البديهة', d: '20 إجابة صحيحة في جولة سريعة', ic: 'clock', c: '#CF3434', t: () => C('speedBest') >= 20 },
    { id: 'cleaner', ar: 'مصحّح الأخطاء', d: 'صحّح 10 أخطاء من دفترك', ic: 'notebook', c: '#4B5BD6', t: () => C('cleared') >= 10 },
    { id: 'story3', ar: 'راوي القصص', d: 'أكمل 3 قطع في وضع القصة', ic: 'book', c: '#B04A8A', t: () => doneKeys(':story') >= 3 },
    { id: 'listener', ar: 'أذن ذهبية', d: 'استمع إلى 3 قطع كاملة', ic: 'ear', c: '#1F8FA8', t: () => doneKeys(':listen') >= 3 },
    { id: 'writer3', ar: 'كاتب واعد', d: 'أنجز 3 أقسام كتابة', ic: 'sheet', c: '#6B5B2B', t: () => doneKeys(':writing') >= 3 },
    { id: 'night', ar: 'بومة الليل', d: 'أجب عن 10 أسئلة بعد العاشرة مساءً', ic: 'moon', c: '#3B3F7A', t: () => C('night') >= 10 },
    { id: 'early', ar: 'عصفور الصباح', d: 'أجب عن 10 أسئلة قبل السابعة صباحاً', ic: 'star', c: '#E0A21F', t: () => C('early') >= 10 },
    { id: 'stars5', ar: 'قائمتي الخاصة', d: 'أضف 5 كلمات إلى كلماتي', ic: 'star', c: '#C99A00', t: () => Object.keys(S().stars).length >= 5 },
    { id: 'unit1', ar: 'وحدة مكتملة', d: 'أنهِ كل أقسام وحدة واحدة', ic: 'check', c: '#17845A', t: () => unitsDone() >= 1 },
    { id: 'unit5', ar: 'خمس وحدات', d: 'أنهِ 5 وحدات', ic: 'check', c: '#0E6B4A', t: () => unitsDone() >= 5 }
  ];
  const badgeById = id => BADGES.find(b => b.id === id);
  function badgeIcon(b, size) { return `<span class="badge-ic" style="--bc:${b.c};width:${size || 56}px;height:${size || 56}px">${I[b.ic] || I.star}</span>`; }

  /* ---------- engine ---------- */
  let checkT = null, holds = 0;
  const pending = [];
  // while a learner is in the middle of a quiz/flashcard run we never interrupt with dialogs: they wait (with a small toast)
  function present(item) {
    if (holds > 0) { pending.push(item); if (item.toast) U.toast(item.toast, 2600); return; }
    item.show();
  }
  const game = TAF.game = {
    NAMES, need, levelOf, info, BADGES, badgeById, badgeIcon,
    goal() { return S().settings.goal || 20; },
    xp(n, label) {
      if (!n) return;
      const s = S(), before = levelOf(s.xp || 0);
      s.xp = (s.xp || 0) + n;
      const d = U.today(); const l = s.log[d] || (s.log[d] = { q: 0, xp: 0 }); l.xp += n;
      TAF.ui.pop(n, label);
      const after = levelOf(s.xp);
      if (after > before) game.levelUp(after);
      store.save(); game.queueCheck();
    },
    celebrating() { return S().settings.celebrate !== false; },
    holdOn() { holds++; },
    holdOff() { holds = Math.max(0, holds - 1); if (!holds && pending.length) setTimeout(() => { if (!holds) pending.splice(0).forEach(i => i.show()); }, 450); },
    levelUp(l) {
      const i = info(S().xp);
      TAF.ui.sfx('level');
      if (!game.celebrating()) { U.toast(`مستوى جديد: ${l} — ${i.ar}`, 3000); return; }
      present({ toast: `⭐ مستوى جديد: ${l}`, show() {
        TAF.ui.confetti(170, 1.1);
        TAF.ui.modal({
          mascot: 'cheer', mascotSize: 110, title: `مبروك! وصلت إلى المستوى ${l}`,
          html: `<p class="ui-lead">أصبحت الآن «<b>${esc(i.ar)}</b>» <span class="en muted">(${esc(i.en)})</span></p><p class="muted">واصل، فالمستوى التالي يحتاج ${U.arN(i.span - i.into, U.AR.point)} فقط.</p>`,
          actions: [{ label: 'أكمل', primary: true }]
        });
      } });
    },
    queueCheck() { clearTimeout(checkT); checkT = setTimeout(game.check, 500); },
    check() {
      const s = S(); let fresh = [];
      BADGES.forEach(b => { if (!s.badges[b.id]) { let ok = false; try { ok = b.t(); } catch (e) { ok = false; } if (ok) { s.badges[b.id] = Date.now(); fresh.push(b); } } });
      if (!fresh.length) return;
      store.save();
      fresh.forEach(b => {
        TAF.ui.sfx('badge');
        if (!game.celebrating()) { U.toast(`وسام جديد: ${b.ar}`, 3000); return; }
        present({ toast: `🎖 وسام جديد: ${b.ar}`, show() {
          TAF.ui.confetti(90, .8);
          TAF.ui.modal({
            mascot: 'wow', mascotSize: 84, title: 'وسام جديد!',
            html: `<div class="badge-pop">${badgeIcon(b, 84)}<b class="badge-name">${esc(b.ar)}</b><span class="muted">${esc(b.d)}</span></div>`,
            actions: [{ label: 'رائع!', primary: true }, { label: 'كل أوسمتي', href: '#/achievements' }]
          });
        } });
      });
    },
    // called from store.answer for goal tracking
    afterAnswer() {
      const s = S(), d = s.daily;
      const h = new Date().getHours();
      if (h >= 22 || h < 4) s.cnt.night = (s.cnt.night || 0) + 1;
      if (h >= 4 && h < 7) s.cnt.early = (s.cnt.early || 0) + 1;
      const lg = s.log[U.today()] || (s.log[U.today()] = { q: 0, xp: 0 }); lg.q++;
      if (d.answered >= game.goal() && !d.goalHit) {
        d.goalHit = true; s.cnt.goalDays = (s.cnt.goalDays || 0) + 1;
        setTimeout(() => game.goalReached(), 600);
      }
    },
    goalReached() {
      TAF.ui.sfx('done');
      game.xp(30, 'هدف اليوم');
      if (!game.celebrating()) { U.toast('حققت هدف اليوم!', 3000); return; }
      present({ toast: '🎯 حققت هدف اليوم!', show() {
        TAF.ui.confetti(110, .9);
        TAF.ui.modal({ mascot: 'cheer', mascotSize: 96, title: 'حققت هدف اليوم!', html: `<p class="ui-lead">${S().daily.answered} إجابة اليوم — عمل ممتاز.</p><p class="muted">يمكنك المتابعة لزيادة نقاطك، أو الراحة وستعود غداً أقوى.</p>`, actions: [{ label: 'أكمل التدريب', primary: true }, { label: 'الرئيسية', href: '#/' }] });
      } });
    },
    onStreak(n) {
      if ([3, 7, 14, 30, 60, 100].includes(n)) { game.xp(n >= 30 ? 100 : n >= 7 ? 50 : 20, `${n} أيام متتالية`); if (game.celebrating()) TAF.ui.confetti(80, .7); }
    },
    // readiness: weighted accuracy across the exam's skill areas (null until enough data)
    readiness(grade) {
      const units = TAF.unitsFor(grade), s = S();
      const agg = (pred) => { let r = 0, w = 0; Object.keys(s.topics).forEach(k => { if (pred(k)) { r += s.topics[k].r; w += s.topics[k].w; } }); return { n: r + w, acc: r + w ? r / (r + w) : null }; };
      const inGrade = k => { const t = TAF.topics[k]; return t && TAF.byId[t.unit] && TAF.byId[t.unit].grade === grade; };
      const areas = [
        { key: 'vocab', ar: 'المفردات', w: 13, ...agg(k => k.startsWith('vocab:') && inGrade(k)) },
        { key: 'grammar', ar: 'القواعد', w: 7, ...agg(k => TAF.topics[k] && TAF.topics[k].kind === 'grammar' && inGrade(k)) },
        { key: 'func', ar: 'التراكيب والتعبيرات', w: 8, ...agg(k => k.startsWith('speaking:') && inGrade(k)) },
        { key: 'reading', ar: 'القراءة', w: 20, ...agg(k => k.startsWith('reading:') && inGrade(k)) }
      ];
      const wr = units.filter(u => u.writing);
      const wdone = wr.filter(u => store.isDone(u.id + ':writing')).length;
      areas.push({ key: 'writing', ar: 'الكتابة', w: 10, n: wdone, acc: wr.length && wdone ? Math.min(1, wdone / Math.max(1, wr.length * .6)) : null });
      const used = areas.filter(a => a.acc != null && a.n >= 5 || a.key === 'writing' && a.acc != null && a.n >= 1);
      const total = used.reduce((a, x) => a + x.w, 0);
      const score = total ? used.reduce((a, x) => a + x.acc * x.w, 0) / total * 100 : null;
      return { score, areas, enough: used.length >= 2 };
    },
    confetti: (a, b) => TAF.ui.confetti(a, b),
    celebrate(kind) { TAF.ui.sfx('done'); if (game.celebrating()) TAF.ui.confetti(kind === 'big' ? 170 : 90, 1); },
    sfx: n => TAF.ui.sfx(n),
    xpIcon: I.star
  };
})();

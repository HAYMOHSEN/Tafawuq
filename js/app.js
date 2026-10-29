/* Tafawuq English — shell, router, boot. */
(function () {
  'use strict';
  const TAF = window.TAF, U = TAF.util, esc = U.esc, store = TAF.store, I = TAF.icon, V = TAF.views;
  const S = () => store.s;

  const NAV = [
    ['#/', 'الرئيسية', I.home, /^#?\/?$/],
    ['#/units', 'الوحدات', I.book, /^#\/(units|unit|extra)/],
    ['#/practice', 'التدريب', I.practice, /^#\/(practice|review|mistakes|drill|mixed|dictation|stats|speed|words|plan)/],
    ['#/exam', 'الامتحانات', I.exam, /^#\/(exam|tips)/],
    ['#/more', 'المزيد', I.more, /^#\/(more|cheatsheet|search|about|diag|achievements|print)/]
  ];
  const lazy = name => (el, p, q) => (V[name] ? V[name](el, p, q) : V.notFound(el));
  const ROUTES = [
    [/^\/?$/, lazy('home')],
    [/^\/units$/, lazy('units')],
    [/^\/unit\/(g1[12]u\d+)$/, lazy('unit')],
    [/^\/unit\/(g1[12]u\d+)\/vocab$/, lazy('vocab')],
    [/^\/unit\/(g1[12]u\d+)\/grammar\/(\d+)(?:\/(practice))?$/, lazy('grammar')],
    [/^\/unit\/(g1[12]u\d+)\/reading(?:\/(questions))?$/, lazy('reading')],
    [/^\/unit\/(g1[12]u\d+)\/writing$/, lazy('writing')],
    [/^\/unit\/(g1[12]u\d+)\/speaking(?:\/(practice))?$/, lazy('speaking')],
    [/^\/unit\/(g1[12]u\d+)\/test$/, lazy('test')],
    [/^\/unit\/(g1[12]u\d+)\/summary$/, lazy('summary')],
    [/^\/practice$/, lazy('practice')],
    [/^\/review$/, lazy('review')],
    [/^\/mistakes$/, lazy('mistakes')],
    [/^\/drill$/, lazy('drill')],
    [/^\/mixed$/, lazy('mixed')],
    [/^\/dictation$/, lazy('dictation')],
    [/^\/stats$/, lazy('stats')],
    [/^\/speed$/, lazy('speed')],
    [/^\/words$/, lazy('words')],
    [/^\/achievements$/, lazy('achievements')],
    [/^\/plan$/, lazy('plan')],
    [/^\/tips$/, lazy('tips')],
    [/^\/exam$/, lazy('exam')],
    [/^\/exam\/run\/(\w+)$/, lazy('examRun')],
    [/^\/print(?:\/(\w+))?$/, lazy('print')],
    [/^\/cheatsheet$/, lazy('cheatsheet')],
    [/^\/search$/, lazy('search')],
    [/^\/extra\/([\w-]+)$/, lazy('extra')],
    [/^\/extra\/([\w-]+)\/q$/, lazy('extraQ')],
    [/^\/more$/, lazy('more')],
    [/^\/diag$/, lazy('diag')],
    [/^\/about$/, lazy('about')]
  ];

  let leaveFns = [], guard = null, lastHash = location.hash;
  const app = TAF.app = {
    onLeave(fn) { leaveFns.push(fn); },
    setGuard(msg) { guard = msg; },
    syncGrade() {
      U.$$('.grade-switch button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.grade === S().settings.grade)));
    },
    applyTheme() {
      const st = S().settings, t = st.theme;
      const dark = t === 'dark' || (t === 'auto' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
      const root = document.documentElement;
      root.dataset.theme = dark ? 'dark' : 'light';
      root.style.setProperty('--fs', st.fs || 1);
      root.classList.toggle('immersion', !!st.immersion);
      root.classList.toggle('no-motion', st.motion === 'off');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = dark ? '#11142B' : '#F5F6FA';
    },
    render(force) {
      const hash = location.hash || '#/';
      const [path, qs] = hash.slice(1).split('?');
      const query = new URLSearchParams(qs || '');
      leaveFns.forEach(f => { try { f(); } catch (e) { /* ignore */ } });
      leaveFns = [];
      TAF.tts.stop();
      const old = U.$('#main');
      const main = document.createElement('main');   // fresh element: no listeners, classes or inline styles from the previous view
      main.id = 'main'; main.tabIndex = -1;
      old.replaceWith(main);
      let found = false;
      for (const [re, fn] of ROUTES) {
        const m = re.exec(path || '/');
        if (m) {
          found = true;
          try { fn(main, m.slice(1), query); } catch (e) { console.error(e); main.innerHTML = `<div class="empty">${I.alert}<p>حدث خطأ أثناء فتح هذه الصفحة. تقدّمك محفوظ.</p><a class="btn" href="#/">الرئيسية</a> <a class="btn ghost" href="#/diag">فحص التطبيق</a></div>`; app.logError(e); }
          break;
        }
      }
      if (!found) V.notFound(main);
      U.$$('.navlink').forEach(a => {
        const n = NAV.find(x => x[0] === a.getAttribute('href'));
        a.removeAttribute('aria-current');
        if (n && n[3].test(hash)) a.setAttribute('aria-current', 'page');
      });
      if (!force) window.scrollTo(0, 0);
      const h1 = main.querySelector('h1');
      document.title = (h1 ? h1.textContent.trim() + ' — ' : '') + 'تفوّق | إنجليزي ثانوي';
    },
    errors: [],
    logError(e) { app.errors.push(String(e && e.stack || e).slice(0, 400)); if (app.errors.length > 20) app.errors.shift(); }
  };

  window.addEventListener('hashchange', () => {
    if (guard && location.hash !== lastHash) {
      if (!confirm(guard)) { history.replaceState(null, '', lastHash || '#/'); return; }
      guard = null;
    }
    lastHash = location.hash;
    app.render();
  });
  window.addEventListener('beforeunload', e => { if (guard) { e.preventDefault(); e.returnValue = ''; } });
  window.addEventListener('error', e => app.logError(e.error || e.message));
  window.addEventListener('unhandledrejection', e => app.logError(e.reason));
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); TAF.installEvt = e; });
  if (window.matchMedia) { const mq = matchMedia('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', () => app.applyTheme()); }
  store.on(ev => { if (ev === 'external') { app.applyTheme(); app.syncGrade(); app.render(true); } });

  /* ---------- shell ---------- */
  function shell() {
    const nav = NAV.map(([h, t, ic]) => `<a class="navlink" href="${h}">${ic}<span>${t}</span></a>`).join('');
    document.body.innerHTML = `<div class="app">
      <header class="topbar">
        <a class="brand" href="#/" aria-label="تفوّق — الرئيسية"><img class="brand-mark" src="icons/icon-192.png" alt="" width="30" height="30"><span>تفوّق</span></a>
        <span class="spacer"></span>
        <div class="grade-switch" role="group" aria-label="اختر الصف"><button type="button" data-grade="11">الحادي عشر</button><button type="button" data-grade="12">الثاني عشر</button></div>
        <a class="iconbtn" href="#/search" aria-label="بحث">${I.search}</a>
      </header>
      <div class="layout"><nav class="sidenav" aria-label="القائمة الرئيسية">${nav}</nav><main id="main" tabindex="-1"></main></div>
      <nav class="bottomnav" aria-label="القائمة الرئيسية">${nav}</nav></div>`;
    U.$('.grade-switch').addEventListener('click', e => {
      const b = e.target.closest('[data-grade]'); if (!b) return;
      S().settings.grade = +b.dataset.grade; store.save(); app.syncGrade();
      if (/^#\/unit\//.test(location.hash)) location.hash = '#/units'; else app.render(true);
    });
  }

  function showUpdateBar() {
    if (U.$('.update-bar')) return;
    const b = document.createElement('div'); b.className = 'update-bar'; b.setAttribute('role', 'status');
    b.innerHTML = `<span>تحديث جديد جاهز للتطبيق</span><button class="btn" type="button" data-reload>حدّث الآن</button><button class="iconbtn" type="button" aria-label="لاحقاً" data-later style="color:var(--paper)">${I.x}</button>`;
    b.addEventListener('click', e => { if (e.target.closest('[data-reload]')) { store.saveNow(); location.reload(); } if (e.target.closest('[data-later]')) b.remove(); });
    document.body.appendChild(b);
  }

  function startupNotices() {
    const n = store.notice;
    if (n) {
      store.clearNotice();
      TAF.ui.modal({ mascot: 'think', mascotSize: 80, title: n === 'restored' ? 'استرجعنا بياناتك' : 'تعذّرت قراءة بياناتك',
        html: n === 'restored' ? '<p>اكتشفنا خللاً في ملف تقدّمك، فاسترجعنا آخر نسخة تلقائية سليمة. قد تفقد عمل آخر يوم فقط.</p>' : '<p>بدأنا من جديد حتى يعمل التطبيق. احتفظنا بنسخة من الملف التالف، ويمكنك استيراد نسخة احتياطية سابقة من «المزيد».</p>', actions: [{ label: 'حسناً', primary: true }] });
    } else if (!store.persistent) {
      TAF.ui.modal({ mascot: 'think', mascotSize: 80, title: 'التخزين غير متاح', html: '<p>متصفحك يمنع حفظ البيانات (ربما وضع التصفح الخاص). يمكنك الدراسة، لكن تقدمك لن يبقى بعد الإغلاق. افتح التطبيق في نافذة عادية.</p>', actions: [{ label: 'فهمت', primary: true }] });
    }
  }

  function boot() {
    app.applyTheme();
    shell();
    app.syncGrade();
    app.render();
    startupNotices();
    if (TAF.onboard && !S().settings.onboarded) TAF.onboard();
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      let had = !!navigator.serviceWorker.controller;
      navigator.serviceWorker.addEventListener('controllerchange', () => { if (had) showUpdateBar(); had = true; });
      navigator.serviceWorker.register('sw.js').catch(() => { /* offline cache unavailable */ });
    }
    setTimeout(() => TAF.tts.load(), 800);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

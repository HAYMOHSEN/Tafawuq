/* Tafawuq English — settings, data centre (backup / restore / export), diagnostics, about. */
(function () {
  'use strict';
  const TAF = window.TAF, U = TAF.util, esc = U.esc, store = TAF.store, I = TAF.icon, V = TAF.views;
  const S = () => store.s;
  const fmtDate = t => t ? new Date(t).toLocaleString('ar-JO-u-nu-latn', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
  const kb = n => (n / 1024).toFixed(n > 1048576 ? 0 : 1) + ' KB';

  /* ---------- file helpers ---------- */
  async function saveFile(name, text, type, desc) {
    if (window.showSaveFilePicker) {
      try {
        const ext = '.' + name.split('.').pop();
        const h = await window.showSaveFilePicker({ suggestedName: name, types: [{ description: desc || 'ملف', accept: { [type]: [ext] } }] });
        const w = await h.createWritable(); await w.write(text); await w.close();
        return 'picker';
      } catch (e) { if (e && e.name === 'AbortError') return 'cancel'; }
    }
    U.download(name, text, type); return 'download';
  }
  TAF.saveFile = saveFile;
  async function doBackup() {
    const json = store.export();
    const r = await saveFile(`tafawuq-backup-${U.today()}.json`, json, 'application/json', 'نسخة احتياطية من تفوّق');
    if (r !== 'cancel') U.toast(r === 'picker' ? 'حُفظت النسخة الاحتياطية في المكان الذي اخترته' : 'نُزّلت النسخة الاحتياطية — احتفظ بها في مكان آمن', 3500);
    TAF.app.render(true);
  }
  function draftsText() {
    const s = S(); const parts = [];
    Object.keys(s.drafts).forEach(id => { const u = TAF.byId[id]; const t = (s.drafts[id] || '').trim(); if (t) parts.push(`=== Unit ${u ? u.n + ': ' + u.title : id} — ${u && u.writing ? u.writing.type : ''} ===\r\n\r\n${t}\r\n`); });
    return parts.join('\r\n');
  }

  /* ---------- MORE / SETTINGS ---------- */
  V.more = function (el) {
    const s = S().settings;
    const seg = (key, opts) => `<div class="seg" role="group">${opts.map(([v, t]) => `<button type="button" data-set="${key}" data-v="${v}" aria-pressed="${String(s[key]) === String(v)}">${t}</button>`).join('')}</div>`;
    const tog = (key, label, sub) => `<div class="setting-row"><span>${label}${sub ? `<small class="muted" style="display:block">${sub}</small>` : ''}</span><button type="button" class="seg-switch" role="switch" data-toggle="${key}" aria-checked="${s[key] !== false && s[key] !== 'off' && !!s[key]}" aria-label="${label}"><i></i></button></div>`;
    const snaps = store.snapshots();
    const days = S().meta.lastExport ? Math.floor((Date.now() - S().meta.lastExport) / 864e5) : null;
    let h = `<div class="page-head"><h1>المزيد</h1></div><div class="ruled">`;
    const r = (href, ic, t, d) => `<a href="${href}"><span class="num">${ic}</span><span class="grow"><span class="t">${t}</span><span class="d">${d}</span></span><span class="chev">${I.chevron}</span></a>`;
    h += r('#/achievements', I.star, 'إنجازاتي ومستواي', 'النقاط والأوسمة')
      + r('#/words', I.cards, 'كلماتي', 'الكلمات التي جمعتها وتراجعها')
      + r('#/plan', I.clock, 'خطة الدراسة', 'جدول مبني على موعد امتحانك')
      + r('#/print', I.print, 'مركز الطباعة', 'أوراق عمل ونماذج امتحان وتقارير وبطاقات')
      + r('#/search', I.search, 'بحث في المنهاج', 'كلمات، قواعد، أنواع الكتابة')
      + r('#/cheatsheet', I.sheet, 'ملخص القواعد', 'صفحة لكل وحدة للمراجعة السريعة')
      + r('#/stats', I.chart, 'إحصائياتي', 'دقتك في كل قاعدة')
      + `<button type="button" data-share><span class="num">${I.chat}</span><span class="grow"><span class="t">شارك التطبيق مع زملائك</span><span class="d">أرسل الرابط لمن يحتاج المساعدة</span></span><span class="chev">${I.chevron}</span></button>`;
    h += `</div><h2>الإعدادات</h2><div class="sheet">`;
    h += `<div class="setting-row"><label for="nm">اسمك</label><input id="nm" data-name value="${esc(s.name)}" maxlength="24" placeholder="اختياري" style="max-width:180px;padding:.45rem .7rem;border-radius:10px;border:1px solid var(--rule);background:var(--sheet)"></div>`;
    h += `<div class="setting-row"><span>الصف</span>${seg('grade', [[11, 'الحادي عشر'], [12, 'الثاني عشر']])}</div>`;
    h += `<div class="setting-row"><label for="ed">موعد امتحانك</label><input id="ed" type="date" data-exam value="${esc(s.examDate)}" style="padding:.45rem .7rem;border-radius:10px;border:1px solid var(--rule);background:var(--sheet)"></div>`;
    h += `<div class="setting-row"><span>هدف اليوم (إجابات)</span>${seg('goal', [[10, '10'], [20, '20'], [40, '40'], [60, '60']])}</div>`;
    h += `<div class="setting-row"><span>كلمات جديدة يومياً</span>${seg('newPerDay', [[6, '6'], [12, '12'], [20, '20']])}</div>`;
    h += `<div class="setting-row"><span>المظهر</span>${seg('theme', [['auto', 'تلقائي'], ['light', 'فاتح'], ['dark', 'داكن']])}</div>`;
    h += `<div class="setting-row"><span>حجم الخط</span>${seg('fs', [[0.92, 'صغير'], [1, 'عادي'], [1.1, 'كبير'], [1.2, 'أكبر']])}</div>`;
    h += tog('sound', 'المؤثرات الصوتية', 'نغمة عند الإجابة والإنجاز');
    h += tog('haptics', 'الاهتزاز', 'على الأجهزة التي تدعمه');
    h += tog('celebrate', 'نوافذ الاحتفال', 'عند ارتفاع المستوى أو نيل وسام (عند الإيقاف تظهر رسالة صغيرة فقط)');
    h += tog('immersion', 'وضع الإنجليزية فقط', 'إخفاء المعاني العربية في قوائم المفردات حتى تضغط عليها');
    h += `<div class="setting-row"><span>الحركة والاحتفالات</span>${seg('motion', [['auto', 'تلقائي'], ['on', 'مفعّلة'], ['off', 'مطفأة']])}</div>`;
    h += `<div class="setting-row"><span>سرعة النطق</span>${seg('rate', [[0.75, 'بطيء'], [0.92, 'عادي'], [1.05, 'سريع']])}</div>`;
    const vs = TAF.tts.voices;
    h += `<div class="setting-row"><label for="vc">الصوت</label><span class="row" style="flex-wrap:nowrap"><select id="vc" data-voice style="max-width:190px;padding:.4rem;border-radius:10px;border:1px solid var(--rule);background:var(--sheet)"><option value="">تلقائي</option>${vs.map(v => `<option value="${esc(v.name)}" ${v.name === s.voice ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})${TAF.tts.isLocal(v) ? '' : ' — يحتاج إنترنت'}</option>`).join('')}</select>${TAF.speakBtn('Welcome to Tafawuq. Let us practise English together.', 'جرّب الصوت')}</span></div>`;
    if (!TAF.tts.ok || !vs.length) h += `<p class="small muted" style="margin:.5rem 0 0">لم نجد أصواتاً إنجليزية على جهازك. في ويندوز: الإعدادات ← الوقت واللغة ← الكلام ← إضافة أصوات.</p>`;
    else if (vs.some(v => !TAF.tts.isLocal(v))) h += `<p class="small muted" style="margin:.5rem 0 0">الأصوات المكتوب بجانبها «يحتاج إنترنت» أوضح نطقاً، لكنها تتوقف دون اتصال؛ عندها يختار التطبيق تلقائياً صوتاً مخزّناً على جهازك.</p>`;
    h += `</div>`;

    h += `<h2>بياناتك وتخزينها</h2><div class="sheet">`;
    h += `<div class="diag-row"><span>حالة التخزين</span><span class="${store.persistent ? 'ok-text' : 'bad-text'}">${store.persistent ? 'يعمل — محفوظ على هذا الجهاز' : 'غير متاح — لن يبقى تقدمك بعد الإغلاق'}</span></div>`;
    h += `<div class="diag-row"><span>آخر نسخة احتياطية</span><span class="${days == null ? 'warn-text' : days > 14 ? 'warn-text' : 'ok-text'}">${days == null ? 'لم تأخذ نسخة بعد' : days === 0 ? 'اليوم' : `قبل ${days} يوماً`}</span></div>`;
    h += `<p class="small muted">يُحفظ تقدمك تلقائياً على هذا الجهاز، ويُنشأ لك استرجاع تلقائي يومي. لنقل تقدمك إلى جهاز آخر أو حمايته من حذف بيانات المتصفح خذ نسخة احتياطية.</p>`;
    h += `<div class="row"><button class="btn" data-backup>${I.sheet} حفظ نسخة احتياطية</button><label class="btn ghost" style="cursor:pointer">استيراد نسخة<input type="file" accept=".json,application/json" data-import class="sr"></label></div>`;
    h += `<div class="row" style="margin-top:.6rem"><button class="btn ghost sm" data-csv>تصدير كلماتي (CSV)</button><button class="btn ghost sm" data-drafts>تصدير مسودات الكتابة (TXT)</button></div>`;
    if (snaps.length) h += `<h3>الاسترجاع التلقائي</h3><div class="ruled">${snaps.map(sn => `<div class="item"><span class="grow"><span class="t">${fmtDate(sn.savedAt)}</span><span class="d">${sn.answers} إجابة · ${sn.words} كلمة · ${sn.xp} نقطة</span></span><button class="btn ghost sm" data-restore="${sn.key}">استرجع</button></div>`).join('')}</div>`;
    h += `<div class="row" style="margin-top:.9rem"><button class="btn ghost sm" data-reset style="color:var(--red)">مسح كل التقدم</button></div></div>`;
    h += `<div class="ruled" style="margin-top:1rem"><a href="#/diag"><span class="num">${I.gear}</span><span class="grow"><span class="t">حالة التطبيق والفحص الذاتي</span><span class="d">تأكد أن كل شيء يعمل، ولدعم فني أسرع</span></span><span class="chev">${I.chevron}</span></a><a href="#/about"><span class="num">${I.bulb}</span><span class="grow"><span class="t">عن التطبيق</span><span class="d">الإصدار ${TAF.version}</span></span><span class="chev">${I.chevron}</span></a></div>`;
    if (TAF.installEvt) h = h.replace('<h2>الإعدادات</h2>', `<div class="nudge no-print" style="margin-bottom:1rem"><p>ثبّت «تفوّق» على جهازك لتفتحه كتطبيق مستقل ويعمل دون إنترنت.</p><button class="btn sm" data-install>تثبيت</button></div><h2>الإعدادات</h2>`);
    el.innerHTML = h;

    const apply = () => { TAF.app.applyTheme(); TAF.app.syncGrade(); };
    el.onclick = async e => {
      const b = e.target.closest('[data-set]');
      if (b) { const k = b.dataset.set; let v = b.dataset.v; if (['grade', 'fs', 'newPerDay', 'rate', 'goal'].includes(k)) v = +v; s[k] = v; store.save(); apply(); TAF.app.render(true); return; }
      const t = e.target.closest('[data-toggle]');
      if (t) { const k = t.dataset.toggle; s[k] = !(s[k] !== false && !!s[k]); store.save(); apply(); TAF.ui.sfx('xp'); TAF.app.render(true); return; }
      if (e.target.closest('[data-share]')) { const url = location.origin + location.pathname; const data = { title: 'تفوّق — إنجليزي الصف الحادي عشر والثاني عشر', text: 'شرح بالعربي وتدريب وامتحانات محاكاة لمنهاج اللغة الإنجليزية.', url }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(url); U.toast('نُسخ الرابط'); } } catch (err) { /* user cancelled */ } return; }
      if (e.target.closest('[data-backup]')) return doBackup();
      if (e.target.closest('[data-csv]')) { const list = TAF.words.list(); if (!list.length) return U.toast('قائمة كلماتي فارغة'); await saveFile(`tafawuq-my-words-${U.today()}.csv`, TAF.wordsCSV(list), 'text/csv', 'ملف CSV'); return; }
      if (e.target.closest('[data-drafts]')) { const t = draftsText(); if (!t) return U.toast('لا توجد مسودات كتابة بعد'); await saveFile(`tafawuq-writing-${U.today()}.txt`, '﻿' + t, 'text/plain', 'ملف نصي'); return; }
      if (e.target.closest('[data-install]') && TAF.installEvt) { TAF.installEvt.prompt(); TAF.installEvt = null; return; }
      const rs = e.target.closest('[data-restore]');
      if (rs) { const ok = await TAF.ui.confirm({ title: 'استرجاع نسخة تلقائية', text: 'سيُستبدل تقدمك الحالي بهذه النسخة (نحتفظ بنسخة من وضعك الحالي أولاً). متابعة؟', ok: 'استرجع' }); if (ok) { try { store.restoreSnapshot(rs.dataset.restore); apply(); U.toast('تم الاسترجاع'); TAF.app.render(true); } catch (err) { U.toast('تعذّر الاسترجاع'); } } return; }
      if (e.target.closest('[data-reset]')) { const ok = await TAF.ui.confirm({ title: 'مسح كل التقدم؟', text: 'سيُحذف تقدمك ونقاطك وأوسمتك على هذا الجهاز نهائياً. يُنصح بأخذ نسخة احتياطية قبل ذلك.', ok: 'مسح كل شيء', danger: true, mascot: 'think' }); if (ok) { store.reset(); apply(); U.toast('تم مسح التقدم'); location.hash = '#/'; TAF.app.render(); TAF.onboard && TAF.onboard(); } }
    };
    el.oninput = e => { if (e.target.matches('[data-name]')) { s.name = e.target.value.trim(); store.save(); } };
    el.onchange = e => {
      if (e.target.matches('[data-exam]')) { s.examDate = e.target.value; store.save(); U.toast('حُفظ موعد الامتحان'); }
      if (e.target.matches('[data-voice]')) { s.voice = e.target.value; store.save(); TAF.tts.speak('This is how I sound.'); }
      if (e.target.matches('[data-import]')) {
        const f = e.target.files[0]; if (!f) return;
        const rd = new FileReader();
        rd.onload = () => {
          let info; try { info = store.inspect(String(rd.result)); } catch (err) { return TAF.ui.modal({ mascot: 'think', title: 'الملف غير صالح', html: '<p>هذا ليس ملف نسخة احتياطية من تفوّق، أو أنه تالف. اختر ملفاً آخر.</p>', actions: [{ label: 'حسناً', primary: true }] }); }
          const text = String(rd.result);
          TAF.ui.modal({
            mascot: 'wow', mascotSize: 76, title: 'استيراد نسخة احتياطية',
            html: `<div class="sheet" style="text-align:start"><div class="diag-row"><span>تاريخ النسخة</span><span>${fmtDate(info.savedAt)}</span></div><div class="diag-row"><span>النقاط</span><span class="v">${info.xp}</span></div><div class="diag-row"><span>الإجابات المسجّلة</span><span class="v">${info.answers}</span></div><div class="diag-row"><span>الكلمات المتعلَّمة</span><span class="v">${info.words}</span></div></div><p class="small muted">«دمج» يجمع النسختين ويحتفظ بالأفضل من كل منهما (مناسب لتجميع تقدمك من جهازين). «استبدال» يمسح الحالي ويضع هذه النسخة.</p>`,
            actions: [
              { label: 'دمج مع تقدمي الحالي', primary: true, onClick: () => { try { store.import(text, 'merge'); apply(); U.toast('تم الدمج بنجاح'); TAF.app.render(true); } catch (err) { U.toast('تعذّر الاستيراد'); } } },
              { label: 'استبدال تقدمي بهذه النسخة', onClick: () => { try { store.import(text, 'replace'); apply(); U.toast('تم الاستيراد'); TAF.app.render(true); } catch (err) { U.toast('تعذّر الاستيراد'); } } },
              { label: 'إلغاء' }]
          });
        };
        rd.readAsText(f); e.target.value = '';
      }
    };
  };

  /* ---------- DIAGNOSTICS ---------- */
  V.diag = function (el) {
    const row = (k, v, cls) => `<div class="diag-row"><span>${k}</span><span class="v ${cls || ''}">${v}</span></div>`;
    el.innerHTML = `<div class="page-head"><h1>حالة التطبيق</h1><p class="sub">فحص سريع يطمئنك أن كل شيء يعمل، ويساعد في الدعم الفني</p></div><div id="dg" class="sheet"><p class="muted">جارٍ الفحص…</p></div><div class="row" style="margin-top:1rem"><button class="btn" data-run>أعد الفحص</button><button class="btn ghost" data-copy>انسخ التقرير</button></div>`;
    let report = '';
    async function run() {
      const out = []; const add = (k, v, cls) => { out.push(row(k, v, cls)); report += `${k}: ${String(v).replace(/<[^>]+>/g, '')}\n`; };
      report = `Tafawuq ${TAF.version} diagnostics ${new Date().toISOString()}\n`;
      // content
      const units = TAF.units.length, qs = Object.keys(TAF.qIndex).length, vocab = TAF.units.reduce((a, u) => a + (u.vocab || []).length, 0);
      add('وحدات المنهاج المحمّلة', `${units} (${TAF.unitsFor(11).length} للصف 11، ${TAF.unitsFor(12).length} للصف 12)`, units ? 'ok-text' : 'bad-text');
      add('الأسئلة / المفردات', `${qs} / ${vocab}`);
      let bad = 0;
      Object.values(TAF.qIndex).forEach(q => { try { if (q.t === 'mcq' && !(q.o && q.a >= 0 && q.a < q.o.length)) bad++; if (['gap', 'find', 'tr'].includes(q.t) && !(Array.isArray(q.a) && q.a.length)) bad++; if (q.t === 'err' && !(q.w && q.c)) bad++; } catch (e) { bad++; } });
      add('سلامة بنية الأسئلة', bad ? `${bad} مشكلة` : 'سليمة', bad ? 'bad-text' : 'ok-text');
      if (TAF.contentErrors.length) add('وحدات تعذّر تحميلها', TAF.contentErrors.join('؛ '), 'bad-text');
      // storage
      let rw = false; try { localStorage.setItem('__t', 'ok'); rw = localStorage.getItem('__t') === 'ok'; localStorage.removeItem('__t'); } catch (e) { rw = false; }
      add('كتابة/قراءة التخزين', rw ? 'سليمة' : 'فاشلة', rw ? 'ok-text' : 'bad-text');
      add('حجم بياناتك', kb(store.bytes()));
      add('آخر حفظ', fmtDate(S().savedAt));
      const est = await store.estimate(); if (est) add('المساحة المستخدمة / المتاحة', `${kb(est.usage || 0)} / ${((est.quota || 0) / 1048576).toFixed(0)} MB`);
      let per = null; try { per = navigator.storage && navigator.storage.persisted ? await navigator.storage.persisted() : null; } catch (e) { /* ignore */ }
      add('تخزين دائم (لا يُحذف تلقائياً)', per == null ? 'غير معروف' : per ? 'نعم' : 'لا (يُنصح بنسخة احتياطية)', per ? 'ok-text' : 'warn-text');
      add('نسخ الاسترجاع التلقائي', store.snapshots().length);
      // offline
      let sw = 'غير مدعوم'; try { if ('serviceWorker' in navigator) { const r = await navigator.serviceWorker.getRegistration(); sw = r ? (navigator.serviceWorker.controller ? 'يعمل — التطبيق متاح دون إنترنت' : 'مسجّل (يعمل بعد إعادة التحميل)') : 'غير مسجّل'; } } catch (e) { sw = 'خطأ'; }
      add('العمل دون إنترنت', sw, /يعمل —/.test(sw) ? 'ok-text' : 'warn-text');
      try { if (window.caches) { const ks = await caches.keys(); let n = 0; for (const k of ks) { const c = await caches.open(k); n += (await c.keys()).length; } add('ملفات مخزّنة للعمل دون إنترنت', `${n}`); } } catch (e) { /* ignore */ }
      add('الاتصال بالإنترنت الآن', navigator.onLine ? 'متصل' : 'غير متصل (التطبيق يعمل رغم ذلك)');
      // speech
      add('النطق الآلي', TAF.tts.ok ? `متاح — ${TAF.tts.voices.length} صوت إنجليزي` : 'غير متاح', TAF.tts.ok && TAF.tts.voices.length ? 'ok-text' : 'warn-text');
      add('المؤثرات الصوتية', (window.AudioContext || window.webkitAudioContext) ? 'متاحة' : 'غير متاحة');
      add('الشاشة', `${innerWidth}×${innerHeight} @${window.devicePixelRatio || 1}x`);
      add('المتصفح', navigator.userAgent.slice(0, 90));
      add('الإصدار', TAF.version);
      const box = U.$('#dg', el); if (box) box.innerHTML = out.join('');
    }
    el.onclick = async e => {
      if (e.target.closest('[data-run]')) { U.$('#dg', el).innerHTML = '<p class="muted">جارٍ الفحص…</p>'; run(); }
      if (e.target.closest('[data-copy]')) { try { await navigator.clipboard.writeText(report); U.toast('نُسخ التقرير'); } catch (err) { U.toast('تعذّر النسخ'); } }
    };
    run();
  };

  /* ---------- ABOUT ---------- */
  V.about = function (el) {
    const counts = [11, 12].map(g => ({ g, u: TAF.unitsFor(g).length, v: TAF.allVocab(g).length, q: Object.values(TAF.qIndex).filter(q => TAF.byId[q.unit] && TAF.byId[q.unit].grade === g).length }));
    el.innerHTML = `<div class="page-head"><h1>عن «تفوّق»</h1><p class="sub">رفيقك في منهاج اللغة الإنجليزية للصفين الحادي عشر والثاني عشر</p></div>
      <div class="sheet" style="text-align:center">${TAF.mascot('happy', 84)}<p style="margin:.2rem 0"><b>هايلي</b> يرافقك في رحلة التفوّق</p></div>
      <div class="sheet" style="margin-top:.8rem"><p style="margin-top:0">شرح بالعربي لقواعد المنهاج، ومفردات كل وحدة مع نطقها، وقطع قراءة تُروى بالصوت، وأسئلة وتدريب ذكي، ونماذج كتابة، وامتحانات محاكاة بنمط الامتحان الوزاري، وطباعة وتخزين لتقدمك. يعمل دون إنترنت ويحفظ تقدمك على جهازك.</p>
      <ul class="summary-list">${counts.map(c => `<li>الصف ${c.g}: ${c.u} وحدات · ${c.v} كلمة وتعبير · ${c.q} سؤالاً</li>`).join('')}</ul></div>
      <div class="sheet" style="margin-top:.8rem"><p style="margin:0 0 .5rem"><b>خصوصيتك:</b> لا حسابات ولا تتبّع، ولا يُرسل تقدّمك أو إجاباتك أو مسوّداتك إلى أي خادم؛ كل شيء يبقى على جهازك، ويمكنك نسخه احتياطياً أو مسحه من «المزيد».</p><p class="small" style="margin:0">المحتوى مكتوب خصيصاً لهذا التطبيق ومنظّم حسب وحدات كتاب الطالب المقرر. التطبيق غير تابع لوزارة التربية والتعليم ولا للمركز الوطني لتطوير المناهج ولا لناشر الكتاب. مواصفات الامتحانات مستمدة من الأوراق الوزارية المنشورة للعامين 2025 و2026 وقد تتغير؛ تابع الإعلانات الرسمية. هل وجدت خطأً؟ اضغط «أبلغ عن خطأ» تحت أي سؤال، أو راسلنا على ${esc(TAF.config.support)}.</p></div>
      <p class="small muted">الإصدار ${TAF.version} · Jotech · الخطوط: Readex Pro وLiterata (SIL Open Font License)</p>`;
  };
})();

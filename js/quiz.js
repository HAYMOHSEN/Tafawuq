/* Tafawuq English — question engine (practice + exam modes). */
(function () {
  'use strict';
  const TAF = window.TAF, U = TAF.util, md = U.md, esc = U.esc, store = TAF.store;
  const LET = ['a', 'b', 'c', 'd', 'e'];
  const KIND = {
    mcq: 'اختر الإجابة الصحيحة', gap: 'أكمل الفراغ', find: 'ابحث في النص', tf: 'صح أم خطأ؟',
    tr: 'أعد كتابة الجملة', err: 'اضغط على الكلمة الخاطئة', order: 'رتّب الكلمات لتكوين جملة', open: 'أجب بأسلوبك'
  };

  function blankify(s) {
    return md(s, { noBidi: true }).replace(/_{4}/g, '<span class="blank" aria-label="blank"></span>');
  }
  const mdn = s => md(s, { noBidi: true }).replace(/\n/g, '<br>');
  function tokenize(s) { return String(s).split(/\s+/).filter(Boolean); }
  function clean(t) { return t.toLowerCase().replace(/^[^\w']+|[^\w']+$/g, '').replace(/[’]/g, "'"); }
  function correctText(q) {
    switch (q.t) {
      case 'mcq': return q.o[q.a];
      case 'tf': return q.a ? 'True — صح' : 'False — خطأ';
      case 'gap': case 'find': case 'tr': return q.a[0];
      case 'err': return q.w + ' → ' + q.c;
      case 'order': return q.a;
      case 'open': return q.m;
    }
    return '';
  }
  function respText(q, st) {
    const r = st.resp;
    if (r == null || r === '' || (Array.isArray(r) && !r.length)) return '— لم تُجب —';
    switch (q.t) {
      case 'mcq': return q.o[r];
      case 'tf': return r ? 'True' : 'False';
      case 'err': return r;
      case 'order': return st.orderWords ? r.map(i => st.orderWords[i]).join(' ') : '';
      default: return r;
    }
  }
  function grade(q, st) {
    const r = st.resp;
    switch (q.t) {
      case 'mcq': return r === q.a;
      case 'tf': return r === q.a;
      case 'gap': case 'find': case 'tr':
        if (U.matches(r, q.a)) return true;
        if (q.t === 'find' && U.closeMatch(r, q.a)) { st.typo = true; return true; }   // typo tolerance only for word-finding, never for grammar answers
        return false;
      case 'err': return clean(r || '') === clean(q.w);
      case 'order': {
        if (!st.orderWords || !Array.isArray(r)) return false;
        return U.norm(r.map(i => st.orderWords[i]).join(' ')) === U.norm(q.a);
      }
      case 'open': return st.self === true;
    }
    return false;
  }

  function qBody(q, st, mode) {
    const locked = st.done && mode === 'practice';
    let h = `<div class="q-kind">${esc(KIND[q.t] || '')}${q.label ? ' · ' + esc(q.label) : ''}</div>`;
    switch (q.t) {
      case 'mcq': {
        h += q.rtl ? `<div class="q-text" style="direction:rtl;text-align:right;font-family:var(--font-ui)">${md(q.q)}</div>` : `<div class="q-text">${blankify(q.q)}</div>`;
        if (q.say) h += `<div style="margin:-.5rem 0 .8rem">${TAF.speakBtn(q.say)}</div>`;
        h += `<div class="opts ${q.arOpts ? 'ar-opts' : ''}">`;
        q.o.forEach((o, i) => {
          let cls = '';
          if (st.resp === i) cls = 'sel';
          if (locked) { if (i === q.a) cls = 'right'; else if (st.resp === i) cls = 'wrong'; }
          h += `<button type="button" class="opt ${cls}" data-opt="${i}" ${locked ? 'disabled' : ''}><span class="bubble">${LET[i]}</span><span>${md(o, { noBidi: !q.arOpts })}</span></button>`;
        });
        h += '</div>'; break;
      }
      case 'tf': {
        h += `<div class="q-text">${md(q.q, { noBidi: true })}</div><div class="opts tf-opts">`;
        [[true, 'True', 'صح'], [false, 'False', 'خطأ']].forEach(([v, en, ar]) => {
          let cls = st.resp === v ? 'sel' : '';
          if (locked) { if (v === q.a) cls = 'right'; else if (st.resp === v) cls = 'wrong'; }
          h += `<button type="button" class="opt ${cls}" data-tf="${v}" ${locked ? 'disabled' : ''}><span class="bubble">${en[0]}</span><span>${en} <small class="muted">${ar}</small></span></button>`;
        });
        h += '</div>'; break;
      }
      case 'gap': case 'find': case 'tr': {
        h += `<div class="q-text">${blankify(q.q)}</div>`;
        if (q.p) h += `<div class="q-prompt">${md(q.p)}</div>`;
        const cls = locked ? (st.ok ? 'right' : 'wrong') : '';
        const isTr = q.t === 'tr';
        h += isTr
          ? `<textarea class="answer-input ${cls}" data-in rows="2" dir="ltr" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Write the full sentence…" ${locked ? 'readonly' : ''}>${esc(st.resp || '')}</textarea>`
          : `<input class="answer-input ${cls}" data-in dir="ltr" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer…" value="${esc(st.resp || '')}" ${locked ? 'readonly' : ''}>`;
        break;
      }
      case 'err': {
        h += `<div class="tokens" role="group" aria-label="sentence">`;
        tokenize(q.q).forEach((t, i) => {
          let cls = st.resp != null && st.respIdx === i ? 'sel' : '';
          if (locked) {
            if (clean(t) === clean(q.w)) cls = 'target';
            else if (st.respIdx === i) cls = 'wrongpick';
          }
          h += `<button type="button" class="token ${cls}" data-tok="${i}" ${locked ? 'disabled' : ''}>${esc(t)}</button>`;
        });
        h += '</div>'; break;
      }
      case 'order': {
        if (!st.orderWords) {
          const words = tokenize(q.a);
          let idx = U.shuffle(words.map((_, i) => i));
          if (words.length > 2 && idx.every((v, i) => v === i)) idx = idx.reverse();
          st.orderWords = words; st.orderPool = idx; st.resp = st.resp || [];
        }
        h += `<div class="order-line tokens" data-line>`;
        (st.resp || []).forEach((wi, pos) => { h += `<button type="button" class="token sel" data-unpick="${pos}" ${locked ? 'disabled' : ''}>${esc(st.orderWords[wi])}</button>`; });
        h += `</div><div class="tokens">`;
        st.orderPool.forEach(wi => {
          const used = (st.resp || []).includes(wi);
          h += `<button type="button" class="token ${used ? 'used' : ''}" data-pick="${wi}" ${used || locked ? 'disabled' : ''}>${esc(st.orderWords[wi])}</button>`;
        });
        h += '</div>';
        if (!locked) h += `<div class="row" style="margin-top:.6rem"><button type="button" class="btn ghost sm" data-clear>مسح الترتيب</button></div>`;
        break;
      }
      case 'open': {
        h += `<div class="q-text">${mdn(q.q)}</div>`;
        h += `<textarea class="answer-input ${q.writing ? 'editor' : ''}" data-in rows="${q.writing ? 12 : 4}" dir="ltr" spellcheck="true" placeholder="Write your answer…" ${st.revealed && mode === 'practice' ? 'readonly' : ''}>${esc(st.resp || '')}</textarea>`;
        break;
      }
    }
    return h;
  }

  // small helpers under each explanation: review the rule, star the word, report a problem
  function toolsHTML(q, ok) {
    let t = '';
    const top = TAF.topics[q.topic];
    if (!ok && top && top.kind === 'grammar') t += `<button type="button" class="btn ghost sm" data-rule>${TAF.icon.pen} راجع القاعدة</button>`;
    if (q.wordRef) { const on = TAF.words.has(TAF.words.key(q.wordRef.unit, q.wordRef.w)); t += `<button type="button" class="btn ghost sm" data-star aria-pressed="${on}">${TAF.icon.star} ${on ? 'في كلماتي' : 'أضف إلى كلماتي'}</button>`; }
    if (q.t !== 'open' && q.id) t += `<button type="button" class="btn ghost sm" data-report title="هل في السؤال أو الإجابة خطأ؟">أبلغ عن خطأ</button>`;
    return t ? `<div class="fb-tools">${t}</div>` : '';
  }
  function openRule(q) {
    const top = TAF.topics[q.topic]; const u = top && TAF.byId[top.unit]; if (!u) return;
    const gi = u.grammar.findIndex(g => g.id === q.topic), g = u.grammar[gi]; if (!g) return;
    TAF.ui.sheet({ title: `${esc(g.ar)} <span class="en muted small">${esc(g.title)}</span>`, html: `<ul class="summary-list">${(g.summary || []).map(x => `<li>${md(x)}</li>`).join('')}</ul>`, actions: [{ label: 'افتح الدرس كاملاً', primary: true, href: `#/unit/${u.id}/grammar/${gi}` }, { label: 'متابعة التدريب' }] });
  }
  function report(q) {
    const body = `Question id: ${q.id}\nUnit: ${q.unit || ''}\nType: ${q.t}\nQuestion: ${q.q || q.a || ''}\n\nWhat is wrong? (write here)\n`;
    try { navigator.clipboard && navigator.clipboard.writeText(body); } catch (e) { /* ignore */ }
    const a = document.createElement('a'); a.href = `mailto:${TAF.config.support}?subject=${encodeURIComponent('Tafawuq – question report ' + q.id)}&body=${encodeURIComponent(body)}`;
    document.body.appendChild(a); a.click(); a.remove();
    U.toast('نُسخت تفاصيل السؤال. أرسلها إلى ' + TAF.config.support, 4000);
  }

  function feedbackHTML(q, st, opts) {
    const ok = st.ok;
    let h = `<div class="feedback show ${ok ? 'ok' : 'no'}" role="status">`;
    if (q.t === 'open') {
      h = `<div class="feedback show ${st.self == null ? 'ok' : ok ? 'ok' : 'no'}" role="status">`;
      h += `<div class="verdict">${TAF.icon.bulb} نموذج إجابة</div><div class="correct-ans">${mdn(q.m)}</div>`;
      if (q.x) h += `<div class="why">${md(q.x)}</div>`;
      if (st.self == null) h += `<div class="selfmark"><span class="small muted">قارن إجابتك بالنموذج:</span><button type="button" class="btn sm" data-self="1">إجابتي صحيحة</button><button type="button" class="btn ghost sm" data-self="0">تحتاج تحسين</button></div>`;
      return h + '</div>';
    }
    h += `<div class="verdict">${ok ? TAF.icon.check + (st.typo ? ' صحيح — انتبه للتهجئة' : ' إجابة صحيحة') : TAF.icon.x + ' إجابة غير صحيحة'}</div>`;
    if (!ok || st.typo || q.t === 'err') h += `<div class="correct-ans">${md(correctText(q), { noBidi: true })}</div>`;
    if (q.t === 'tr' && q.a.length > 1 && ok) h += `<div class="small muted">إجابات مقبولة أخرى: <span class="en">${q.a.slice(1).map(esc).join(' / ')}</span></div>`;
    if (q.x) h += `<div class="why">${md(q.x)}</div>`;
    if (!ok && (q.t === 'tr' || q.t === 'gap' || q.t === 'find') && opts.allowOverride) h += `<div class="selfmark"><button type="button" class="btn ghost sm" data-override>أعتقد أن إجابتي صحيحة أيضاً</button></div>`;
    h += toolsHTML(q, ok);
    return h + '</div>';
  }

  /**
   * Run a quiz inside `el`.
   * opts: { mode: 'practice'|'exam', title, timeLimit (sec), onFinish(result), onExit(), record (default true), backLabel }
   */
  function run(el, questions, opts) {
    opts = Object.assign({ mode: 'practice', record: true, allowOverride: true }, opts || {});
    const qs = questions.slice();
    const states = qs.map(() => ({ resp: null, done: false, ok: null }));
    let idx = 0, finished = false, combo = 0;
    const started = Date.now();
    let timerId = null;
    const isExam = opts.mode === 'exam';
    el._reported = false;

    function answered(st, q) {
      const r = st.resp;
      if (q.t === 'order') return Array.isArray(r) && st.orderWords && r.length === st.orderWords.length;
      return !(r == null || r === '');
    }

    function render() {
      if (finished) return;
      const q = qs[idx], st = states[idx];
      const doneCount = isExam ? states.filter((s, i) => answered(s, qs[i])).length : states.filter(s => s.done).length;
      let h = `<div class="quiz-top">`;
      if (opts.onExit) h += `<button class="iconbtn" type="button" data-exit aria-label="خروج">${TAF.icon.x}</button>`;
      h += `<div class="bar" aria-hidden="true"><i style="width:${Math.round(doneCount / qs.length * 100)}%"></i></div>`;
      if (!isExam && combo >= 2) h += `<span class="combo" title="إجابات صحيحة متتالية">${TAF.icon.flame}×${combo}</span>`;
      h += `<span class="count">${idx + 1} / ${qs.length}</span>`;
      if (opts.timeLimit) h += `<span class="timer" data-timer></span>`;
      h += `</div>`;
      if (opts.title && idx === 0 && !isExam) h += `<p class="muted small" style="margin-top:-.4rem">${esc(opts.title)}</p>`;
      if (q.passage) h += `<details class="sheet" style="margin-bottom:.8rem" ${q.passageOpen ? 'open' : ''}><summary class="small" style="cursor:pointer">النص المرافق للسؤال</summary><div class="passage" style="margin-top:.6rem">${q.passage.map(p => `<p>${md(p, { noBidi: true })}</p>`).join('')}</div></details>`;
      const fx = st.fx || ''; st.fx = '';
      h += `<div class="q-card ${fx}">${qBody(q, st, opts.mode)}`;
      if (!isExam && st.done) h += feedbackHTML(q, st, opts);
      h += `</div>`;
      h += `<div class="quiz-actions">`;
      if (isExam) {
        h += `<button class="btn ghost" type="button" data-prev ${idx === 0 ? 'disabled' : ''}>السابق</button>`;
        h += idx < qs.length - 1 ? `<button class="btn" type="button" data-next>التالي</button>` : `<button class="btn" type="button" data-submit>إنهاء وتسليم</button>`;
      } else if (!st.done) {
        if (q.t === 'open') h += `<button class="btn" type="button" data-reveal>اعرض نموذج الإجابة</button>`;
        else if (q.t !== 'mcq' && q.t !== 'tf' && q.t !== 'err') h += `<button class="btn" type="button" data-check>تحقّق</button>`;
        h += `<button class="btn ghost" type="button" data-skip style="flex:0 0 auto">تخطَّ</button>`;
      } else {
        h += `<button class="btn" type="button" data-next ${q.t === 'open' && st.self == null ? 'disabled' : ''}>${idx < qs.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}</button>`;
      }
      h += `</div>`;
      if (isExam) {
        h += `<div class="sheet" style="margin-top:1rem"><div class="small muted" style="margin-bottom:.4rem">الانتقال بين الأسئلة</div><div class="row" style="gap:.35rem">`;
        qs.forEach((qq, i) => {
          const a = answered(states[i], qq);
          h += `<button type="button" class="btn sm ${i === idx ? '' : a ? 'soft' : 'ghost'}" data-jump="${i}" style="min-width:2.4rem;padding:.2rem .4rem" aria-label="سؤال ${i + 1}">${i + 1}</button>`;
        });
        h += `</div></div>`;
      }
      el.innerHTML = h;
      tick();
      const inp = el.querySelector('[data-in]');
      if (inp && !inp.readOnly && !('ontouchstart' in window)) inp.focus({ preventScroll: true });
      el.scrollIntoView({ block: 'start', behavior: 'instant' in window ? 'instant' : 'auto' });
    }

    function tick() {
      if (!opts.timeLimit) return;
      const t = el.querySelector('[data-timer]');
      if (!t) return;
      const left = opts.timeLimit - (Date.now() - started) / 1000;
      t.textContent = U.fmtTime(left);
      t.classList.toggle('low', left < 300);
      if (left <= 0 && !finished) { U.toast('انتهى الوقت — تم تسليم الامتحان'); finish(); }
    }
    if (opts.timeLimit) timerId = setInterval(tick, 1000);
    let held = true; TAF.game.holdOn();
    const release = () => { if (held) { held = false; TAF.game.holdOff(); } };
    if (TAF.app) {
      TAF.app.onLeave(() => { clearInterval(timerId); finished = true; TAF.app.setGuard(null); release(); });
      if (isExam && opts.confirmExit) TAF.app.setGuard(opts.confirmExit);
    }

    function check() {
      const q = qs[idx], st = states[idx];
      if (st.done) return;
      if (q.t === 'order' && !answered(st, q)) { U.toast('رتّب كل الكلمات أولاً'); return; }
      if ((q.t === 'gap' || q.t === 'find' || q.t === 'tr') && !String(st.resp || '').trim()) { U.toast('اكتب إجابتك أولاً'); return; }
      st.ok = grade(q, st); st.done = true;
      if (opts.record) store.answer(q, st.ok);
      if (q.t !== 'open') {
        if (st.ok) { combo++; if (combo >= 3 && opts.record) TAF.game.xp(2, 'سلسلة'); st.fx = 'pulse-ok'; } else { combo = 0; st.fx = 'pulse-no'; }
        TAF.game.sfx(st.ok ? 'ok' : 'no');
      }
      render();
    }

    function finish() {
      if (finished) return;
      finished = true; clearInterval(timerId); release();
      if (TAF.app) TAF.app.setGuard(null);
      if (isExam) {
        qs.forEach((q, i) => {
          const st = states[i];
          if (q.t === 'open') { st.ok = null; return; }
          st.ok = answered(st, q) ? grade(q, st) : false; st.done = true;
          if (opts.record) store.answer(q, st.ok);
        });
      }
      showResults();
    }

    function score() {
      let got = 0, total = 0, right = 0, count = 0, pending = false;
      const weighted = qs.some(q => q.marks);
      qs.forEach((q, i) => {
        const st = states[i], m = q.marks || 1;
        if (q.t === 'open') {
          if (st.selfScore != null) { got += st.selfScore; total += m; count++; if (st.selfScore >= m / 2) right++; }
          else if (st.self != null) { total += m; count++; if (st.self) { got += m; right++; } }
          else if (isExam) { pending = true; if (weighted) total += m; }
          return;
        }
        total += m; count++;
        if (st.ok) { got += m; right++; }
      });
      got = Math.round(got * 10) / 10;
      return { got, total, right, count, pending, weighted, pct: total ? Math.round(got / total * 100) : 0 };
    }

    function showResults() {
      const sc = score();
      const secs = (Date.now() - started) / 1000;
      const pendingOpen = sc.pending;
      let msg = sc.pct >= 90 ? 'ممتاز! أداء متقن.' : sc.pct >= 75 ? 'جيد جداً، راجع الأخطاء القليلة.' : sc.pct >= 50 ? 'بداية جيدة، راجع الشرح ثم أعد المحاولة.' : 'تحتاج مراجعة الدرس ثم إعادة التدريب.';
      const line = sc.weighted ? `الدرجة ${sc.got} من ${sc.total}` : `${sc.right} من ${sc.count} إجابة صحيحة`;
      let h = `<div class="sheet result-score"><div class="big">${sc.pct}%</div><p style="margin:.5rem 0 .2rem">${line}</p><p class="muted small" style="margin:0">${msg} · الوقت ${U.fmtTime(secs)}</p></div>`;
      if (opts.sections) {
        h += `<div class="sheet"><div class="topic-bars">` + opts.sections.map(sec => {
          let g = 0, t = 0;
          qs.forEach((q, i) => { if (q.sec !== sec.key) return; const st = states[i], m = q.marks || 1; t += m; if (q.t === 'open') g += st.selfScore != null ? st.selfScore : st.self ? m : 0; else if (st.ok) g += m; });
          const p = t ? Math.round(g / t * 100) : 0;
          return `<div class="t-row"><span>${esc(sec.label)}</span><div class="bar"><i class="${p < 60 ? 'low' : p < 80 ? 'mid' : 'good'}" style="width:${p}%"></i></div><span class="small">${Math.round(g * 10) / 10}/${t}</span></div>`;
        }).join('') + `</div></div>`;
      }
      if (pendingOpen) h += `<div class="note tip">${TAF.icon.bulb}<div>قيّم إجاباتك الكتابية أدناه بمقارنتها بالنموذج لتُحتسب في الدرجة.</div></div>`;
      const wrongIdx = qs.map((q, i) => (states[i].ok === false ? i : -1)).filter(i => i >= 0);
      h += `<div class="row" style="margin:1rem 0">`;
      if (wrongIdx.length) h += `<button class="btn" type="button" data-retry>أعد الأسئلة الخاطئة (${wrongIdx.length})</button>`;
      h += `<button class="btn ghost" type="button" data-done>${esc(opts.doneLabel || 'إنهاء')}</button></div>`;
      h += `<h2>مراجعة الإجابات</h2><div class="sheet">`;
      qs.forEach((q, i) => {
        const st = states[i];
        const mark = q.t === 'open' && st.self == null && st.selfScore == null ? '<span class="muted">؟</span>' : st.selfScore != null ? `<span class="small" style="font-weight:700">${st.selfScore}/${q.marks}</span>` : st.ok ? `<span class="mark-ok">✓</span>` : `<span class="mark-no">✗</span>`;
        h += `<div class="review-item"><div class="row" style="align-items:flex-start;flex-wrap:nowrap">${mark}<div class="grow" style="flex:1"><div class="q">${q.writing ? 'Free writing task' : mdn((q.t === 'err' || q.t === 'order') ? (q.q || KIND.order) : q.q).replace(/_{4}/g, '____')}</div>`;
        if (q.p) h += `<div class="small muted">${md(q.p)}</div>`;
        h += `<div class="a small">إجابتك: <span class="en">${esc(respText(q, st))}</span></div>`;
        if (q.writing && st.resp) h += `<div class="a small muted">عدد كلماتك: ${U.words(st.resp)}</div>`;
        if (!st.ok || q.t === 'open') h += `<div class="a small">${q.writing ? 'نموذج' : 'الصحيح'}: <span class="en">${mdn(correctText(q))}</span></div>`;
        if (q.x && !st.ok) h += `<div class="a small muted">${md(q.x)}</div>`;
        if (q.t === 'open' && st.self == null && st.selfScore == null && isExam) {
          if (q.rubric) {
            h += `<div class="sheet" style="margin-top:.5rem;padding:.7rem .9rem"><div class="small" style="font-weight:500;margin-bottom:.3rem">قيّم كتابتك بصدق:</div>` + q.rubric.map((c, ci) => `<div class="setting-row" style="padding:.35rem 0"><span class="small">${esc(c[0])}</span><select data-rub="${i}" data-ci="${ci}" aria-label="${esc(c[0])}">${Array.from({ length: c[1] + 1 }, (_, v) => `<option value="${v}" ${v === Math.ceil(c[1] / 2) ? 'selected' : ''}>${v} / ${c[1]}</option>`).join('')}</select></div>`).join('') + `<button type="button" class="btn sm" data-rubsave="${i}" style="margin-top:.5rem">احسب درجة الكتابة</button></div>`;
          } else if ((q.marks || 1) > 1) {
            const m = q.marks;
            h += `<div class="selfmark"><button type="button" class="btn sm" data-sscore="${i}" data-v="${m}">صحيحة كاملة (${m})</button><button type="button" class="btn soft sm" data-sscore="${i}" data-v="${m / 2}">صحيحة جزئياً (${m / 2})</button><button type="button" class="btn ghost sm" data-sscore="${i}" data-v="0">خطأ (0)</button></div>`;
          } else {
            h += `<div class="selfmark"><button type="button" class="btn sm" data-selfr="${i}" data-v="1">إجابتي صحيحة</button><button type="button" class="btn ghost sm" data-selfr="${i}" data-v="0">غير صحيحة</button></div>`;
          }
        }
        h += `</div></div></div>`;
      });
      h += `</div>`;
      el.innerHTML = h;
      el.scrollIntoView({ block: 'start' });
      const result = { right: sc.right, total: sc.total, got: sc.got, pct: sc.pct, secs, pendingOpen };
      if (opts.onFinish && !el._reported) { el._reported = true; opts.onFinish(result); }
      else if (opts.onUpdate) opts.onUpdate(result);
    }

    el.onclick = function (e) {
      const t = e.target.closest('button');
      if (!t || t.matches('[data-say]')) return;
      const q = qs[idx], st = states[idx];
      if (t.matches('[data-exit]')) { if (opts.confirmExit && !confirm(opts.confirmExit)) return; clearInterval(timerId); finished = true; release(); if (TAF.app) TAF.app.setGuard(null); return opts.onExit && opts.onExit(); }
      if (t.matches('[data-done]')) { return opts.onDone ? opts.onDone() : (opts.onExit && opts.onExit()); }
      if (t.matches('[data-retry]')) {
        const wrong = qs.filter((qq, i) => states[i].ok === false);
        return run(el, wrong, Object.assign({}, opts, { mode: 'practice', timeLimit: 0, title: 'إعادة الأسئلة الخاطئة', onFinish: null }));
      }
      if (t.matches('[data-sscore]')) {
        const i = +t.dataset.sscore, v = +t.dataset.v;
        states[i].selfScore = v; states[i].ok = v >= (qs[i].marks || 1) / 2; states[i].done = true;
        if (opts.record) store.answer(qs[i], states[i].ok);
        el._reported = true; return showResults();
      }
      if (t.matches('[data-rubsave]')) {
        const i = +t.dataset.rubsave;
        let v = 0; el.querySelectorAll(`[data-rub="${i}"]`).forEach(sel => { v += +sel.value; });
        states[i].selfScore = v; states[i].ok = v >= (qs[i].marks || 1) / 2; states[i].done = true;
        if (opts.record) store.answer(qs[i], states[i].ok);
        el._reported = true; return showResults();
      }
      if (t.matches('[data-selfr]')) {
        const i = +t.dataset.selfr, v = t.dataset.v === '1';
        states[i].self = v; states[i].ok = v; states[i].done = true;
        if (opts.record) store.answer(qs[i], v);
        el._reported = true; return showResults();
      }
      if (finished) return;
      if (t.matches('[data-opt]') && !st.done) {
        st.resp = +t.dataset.opt;
        if (isExam) return render();
        return check();
      }
      if (t.matches('[data-tf]') && !st.done) {
        st.resp = t.dataset.tf === 'true';
        if (isExam) return render();
        return check();
      }
      if (t.matches('[data-tok]') && !st.done) {
        st.respIdx = +t.dataset.tok; st.resp = tokenize(q.q)[st.respIdx];
        if (isExam) return render();
        return check();
      }
      if (t.matches('[data-pick]')) { st.resp = (st.resp || []).concat(+t.dataset.pick); return render(); }
      if (t.matches('[data-unpick]')) { st.resp.splice(+t.dataset.unpick, 1); return render(); }
      if (t.matches('[data-clear]')) { st.resp = []; return render(); }
      if (t.matches('[data-check]')) return check();
      if (t.matches('[data-reveal]')) { st.revealed = true; st.done = true; st.ok = null; return render(); }
      if (t.matches('[data-self]')) {
        st.self = t.dataset.self === '1'; st.ok = st.self;
        if (opts.record) store.answer(q, st.ok);
        return render();
      }
      if (t.matches('[data-rule]')) return openRule(q);
      if (t.matches('[data-report]')) return report(q);
      if (t.matches('[data-star]')) { const w = q.wordRef; const on = TAF.words.toggle({ key: TAF.words.key(w.unit, w.w), w: w.w, ar: w.ar, ex: w.ex, unit: w.unit }); t.setAttribute('aria-pressed', on); t.innerHTML = `${TAF.icon.star} ${on ? 'في كلماتي' : 'أضف إلى كلماتي'}`; TAF.game.queueCheck(); return; }
      if (t.matches('[data-override]')) {
        st.ok = true; st.overridden = true;
        if (opts.record) store.fixLast && store.fixLast(q);
        return render();
      }
      if (t.matches('[data-skip]')) { st.done = true; st.ok = false; st.skipped = true; combo = 0; if (opts.record) store.answer(q, false); }
      if (t.matches('[data-next], [data-skip]')) {
        if (idx < qs.length - 1) { idx++; return render(); }
        return isExam ? confirmSubmit() : finish();
      }
      if (t.matches('[data-prev]')) { if (idx > 0) { idx--; render(); } return; }
      if (t.matches('[data-jump]')) { idx = +t.dataset.jump; return render(); }
      if (t.matches('[data-submit]')) return confirmSubmit();
    };
    el.oninput = function (e) {
      const t = e.target;
      if (t.matches('[data-in]') && !finished) states[idx].resp = t.value;
    };
    el.onkeydown = function (e) {
      if (e.key === 'Enter' && e.target.matches('input[data-in]')) {
        e.preventDefault();
        if (isExam) { if (idx < qs.length - 1) { idx++; render(); } }
        else if (!states[idx].done) check();
        else el.querySelector('[data-next]') && el.querySelector('[data-next]').click();
      } else if (e.key === 'Enter' && !e.target.matches('textarea') && !isExam && states[idx] && states[idx].done) {
        const n = el.querySelector('[data-next]'); if (n && document.activeElement === document.body) { e.preventDefault(); n.click(); }
      }
    };
    function confirmSubmit() {
      const left = states.filter((s, i) => !answered(s, qs[i])).length;
      if (left && !confirm(`بقي ${left} سؤالاً دون إجابة. هل تريد التسليم الآن؟`)) return;
      finish();
    }
    if (!qs.length) { el.innerHTML = `<div class="empty">لا توجد أسئلة هنا بعد.</div>`; return; }
    render();
    return { finish, get finished() { return finished; } };
  }

  // fix a wrong answer that the learner proved right (self-override)
  store.fixLast = function (q) {
    const S = store.s, r = S.q[q.id], tp = S.topics[q.topic];
    if (r && r.w > 0) { r.w--; r.r++; r.s++; }
    if (tp && tp.w > 0) { tp.w--; tp.r++; }
    if (S.mistakes[q.id] && S.mistakes[q.id].n <= 1) delete S.mistakes[q.id];
    store.save();
  };

  TAF.Quiz = { run, grade, KIND, correctText };
})();

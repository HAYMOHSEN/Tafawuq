/* Tafawuq English — UI layer: mascot, dialogs, bottom sheet, confetti, sound, XP pop. */
(function () {
  'use strict';
  const TAF = window.TAF, U = TAF.util, esc = U.esc;
  const ui = TAF.ui = {};
  const S = () => TAF.store.s;
  const reduced = () => (S().settings.motion === 'off') || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches && S().settings.motion !== 'on');

  /* ---------- mascot: "هايلي", a highlighter pen ---------- */
  TAF.mascot = function (mood, size, label) {
    mood = mood || 'happy'; size = size || 96;
    const INK = '#1C2147', BLUE = '#2B3A9E', YEL = '#FFE45C';
    let eyes, mouth, arms, extra = '';
    const eye = (cx, px, py, r) => `<circle cx="${cx}" cy="84" r="${r || 9}" fill="#fff" stroke="${INK}" stroke-width="2.4"/><circle cx="${cx + px}" cy="${84 + py}" r="${(r || 9) * 0.47}" fill="${INK}"/><circle cx="${cx + px + 1.4}" cy="${84 + py - 1.6}" r="1.4" fill="#fff"/>`;
    const armsDown = `<path d="M30 94 Q15 99 13 113" /><path d="M90 94 Q105 99 107 113" />`;
    switch (mood) {
      case 'cheer':
        eyes = `<path d="M40 87 Q48 76 56 87" /><path d="M64 87 Q72 76 80 87" />`;
        mouth = `<path d="M47 98 Q60 122 73 98 Z" fill="${INK}" stroke="${INK}"/><path d="M53 108 Q60 114 67 108 Q60 104 53 108Z" fill="#FF8FA0" stroke="none"/>`;
        arms = `<path d="M30 92 Q12 80 15 56" /><path d="M90 92 Q108 80 105 56" />`;
        extra = `<g fill="${YEL}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"><path d="M12 30l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/><path d="M106 22l2.4 5.6 5.6 2.4-5.6 2.4-2.4 5.6-2.4-5.6-5.6-2.4 5.6-2.4z"/></g><g fill="${BLUE}"><circle cx="24" cy="12" r="3"/><circle cx="98" cy="48" r="3"/><circle cx="4" cy="62" r="2.4"/></g>`;
        break;
      case 'think':
        eyes = eye(48, 3, -3) + eye(72, 3, -3);
        mouth = `<path d="M54 103 Q60 99 67 104" />`;
        arms = `<path d="M30 94 Q15 99 13 113" /><path d="M90 94 Q100 104 78 107" />`;
        extra = `<g><circle cx="100" cy="26" r="15" fill="#fff" stroke="${INK}" stroke-width="2.4"/><circle cx="88" cy="46" r="3.2" fill="#fff" stroke="${INK}" stroke-width="2"/><text x="100" y="33" text-anchor="middle" font-size="20" font-weight="700" fill="${BLUE}" stroke="none" font-family="Readex, sans-serif">?</text></g>`;
        break;
      case 'sleepy':
        eyes = `<path d="M40 85 Q48 92 56 85" /><path d="M64 85 Q72 92 80 85" />`;
        mouth = `<path d="M54 103 Q60 107 66 103" />`;
        arms = armsDown;
        extra = `<g fill="${BLUE}" stroke="none" font-family="Readex, sans-serif" font-weight="700"><text x="96" y="40" font-size="18">z</text><text x="106" y="24" font-size="13">z</text></g>`;
        break;
      case 'wow':
        eyes = eye(48, 0, 0, 11) + eye(72, 0, 0, 11);
        mouth = `<ellipse cx="60" cy="106" rx="6.5" ry="8.5" fill="${INK}" stroke="none"/>`;
        arms = `<path d="M30 92 Q14 84 14 68" /><path d="M90 92 Q106 84 106 68" />`;
        break;
      default: // happy
        eyes = eye(48, 0, 1) + eye(72, 0, 1);
        mouth = `<path d="M49 100 Q60 113 71 100" />`;
        arms = armsDown;
    }
    return `<svg class="mascot mascot-${mood}" viewBox="-6 0 132 150" width="${size}" height="${Math.round(size * 150 / 132)}" role="img" aria-label="${esc(label || 'هايلي')}" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="143" rx="28" ry="5" fill="${INK}" opacity=".12"/>
      <g stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <ellipse cx="45" cy="135" rx="11" ry="6" fill="${BLUE}"/><ellipse cx="75" cy="135" rx="11" ry="6" fill="${BLUE}"/>
        ${arms}
        <rect x="30" y="44" width="60" height="90" rx="27" fill="${YEL}"/>
        <rect x="38" y="56" width="6" height="52" rx="3" fill="#FFF6C2" stroke="none" opacity=".9"/>
        <g transform="rotate(-6 60 32)"><rect x="33" y="14" width="54" height="36" rx="13" fill="${BLUE}"/><path d="M42 24h20" stroke="#fff" stroke-width="3" opacity=".55"/></g>
        <circle cx="39" cy="101" r="5" fill="#FF9AA2" stroke="none" opacity=".65"/><circle cx="81" cy="101" r="5" fill="#FF9AA2" stroke="none" opacity=".65"/>
        ${eyes}${mouth}
      </g>${extra}</svg>`;
  };

  /* ---------- sound + haptics ---------- */
  let actx = null;
  function ctx() {
    if (actx) return actx;
    const A = window.AudioContext || window.webkitAudioContext;
    if (!A) return null;
    try { actx = new A(); } catch (e) { actx = null; }
    return actx;
  }
  function tone(c, f, t, d, type, g) {
    const o = c.createOscillator(), v = c.createGain();
    o.type = type || 'sine'; o.frequency.value = f;
    const t0 = c.currentTime + t;
    v.gain.setValueAtTime(0.0001, t0); v.gain.exponentialRampToValueAtTime(g || 0.07, t0 + 0.012); v.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    o.connect(v); v.connect(c.destination); o.start(t0); o.stop(t0 + d + 0.03);
  }
  const SFX = {
    ok: c => { tone(c, 659, 0, .1); tone(c, 880, .09, .16); },
    no: c => { tone(c, 247, 0, .16, 'triangle', .06); tone(c, 196, .12, .2, 'triangle', .05); },
    tick: c => tone(c, 1320, 0, .04, 'square', .02),
    xp: c => { tone(c, 988, 0, .06, 'sine', .04); },
    done: c => { tone(c, 784, 0, .1); tone(c, 1047, .1, .22); },
    level: c => { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(c, f, i * .09, .22, 'triangle', .07)); },
    badge: c => { [784, 988, 1175, 1568].forEach((f, i) => tone(c, f, i * .08, .3, 'sine', .06)); }
  };
  const HAP = { ok: 12, no: [18, 40, 18], level: [30, 40, 30, 40, 70], badge: [20, 30, 50], done: 20 };
  ui.sfx = function (name) {
    const s = S().settings;
    if (s.haptics !== false && HAP[name] && navigator.vibrate) { try { navigator.vibrate(HAP[name]); } catch (e) { /* ignore */ } }
    if (s.sound === false || !SFX[name]) return;
    const c = ctx(); if (!c) return;
    if (c.state === 'suspended') c.resume();
    try { SFX[name](c); } catch (e) { /* ignore */ }
  };

  /* ---------- floating XP pill ---------- */
  let popEl = null, popSum = 0, popT = null;
  ui.pop = function (n, label) {
    if (!n) return;
    if (!popEl) { popEl = document.createElement('div'); popEl.className = 'xp-pop'; popEl.setAttribute('aria-live', 'polite'); popEl.setAttribute('role', 'status'); document.body.appendChild(popEl); }
    popSum += n;
    popEl.innerHTML = `<span class="xp-star">${TAF.icon.star}</span><b>+${popSum}</b> نقطة${label ? ` <span class="xp-label">${esc(label)}</span>` : ''}`;
    popEl.classList.remove('show'); void popEl.offsetWidth; popEl.classList.add('show');
    clearTimeout(popT); popT = setTimeout(() => { popEl.classList.remove('show'); popSum = 0; }, 1500);
  };

  /* ---------- confetti ---------- */
  ui.confetti = function (count, power) {
    if (reduced()) return;
    count = count || 130; power = power || 1;
    const cv = document.createElement('canvas'); cv.className = 'confetti'; cv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cv);
    const dpr = Math.min(2, window.devicePixelRatio || 1), W = innerWidth, H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
    const g = cv.getContext('2d'); g.scale(dpr, dpr);
    const colors = ['#2B3A9E', '#FFE45C', '#17845A', '#CF3434', '#6C7BFF', '#FFFFFF', '#FF9AA2'];
    const ps = Array.from({ length: count }, () => {
      const left = Math.random() < .5;
      const ang = (left ? -1 : 1) * (Math.PI / 2.6 + Math.random() * .5) - Math.PI / 2;
      const sp = (7 + Math.random() * 9) * power;
      return { x: W / 2 + (Math.random() - .5) * W * .5, y: H * .72, vx: Math.cos(ang) * sp * (.4 + Math.random()), vy: Math.sin(ang) * sp * 1.15, w: 6 + Math.random() * 6, h: 4 + Math.random() * 6, r: Math.random() * 6.28, vr: (Math.random() - .5) * .4, c: colors[(Math.random() * colors.length) | 0], t: 0 };
    });
    const t0 = performance.now();
    (function frame(now) {
      const el = now - t0;
      g.clearRect(0, 0, W, H);
      ps.forEach(p => {
        p.vy += .32; p.vx *= .992; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.globalAlpha = Math.max(0, 1 - el / 2800);
        g.fillStyle = p.c; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.restore();
      });
      if (el < 2800) requestAnimationFrame(frame); else cv.remove();
    })(t0);
  };

  /* ---------- dialog / sheet ---------- */
  const queue = []; let openCount = 0, lastFocus = null;
  function focusables(root) { return U.$$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', root).filter(e => e.offsetParent !== null); }
  function build(kind, o) {
    const back = document.createElement('div');
    back.className = 'ui-back ' + kind;
    const id = 'dlg' + Math.random().toString(36).slice(2, 7);
    back.innerHTML = `<div class="ui-box ${o.cls || ''}" role="dialog" aria-modal="true" aria-labelledby="${id}t" tabindex="-1">
      ${kind === 'sheet' ? '<div class="ui-grab" aria-hidden="true"></div>' : ''}
      ${o.mascot ? `<div class="ui-mascot">${TAF.mascot(o.mascot, o.mascotSize || 92)}</div>` : ''}
      ${o.title ? `<h2 class="ui-title" id="${id}t">${o.title}</h2>` : `<span class="sr" id="${id}t">نافذة</span>`}
      <div class="ui-body">${o.html || ''}</div>
      ${(o.actions && o.actions.length) ? `<div class="ui-actions">${o.actions.map((a, i) => a.href ? `<a class="btn ${a.primary ? '' : 'ghost'}" href="${a.href}" data-act="${i}">${a.label}</a>` : `<button type="button" class="btn ${a.primary ? '' : 'ghost'}" data-act="${i}">${a.label}</button>`).join('')}</div>` : ''}
      ${o.dismissible === false ? '' : `<button type="button" class="ui-x iconbtn" aria-label="إغلاق" data-close>${TAF.icon.x}</button>`}
    </div>`;
    return back;
  }
  function show(kind, o) {
    if (openCount > 0 && !o.immediate) { queue.push([kind, o]); return { close() { }, queued: true }; }
    openCount++;
    lastFocus = document.activeElement;
    const back = build(kind, o), box = back.firstElementChild;
    document.body.appendChild(back);
    document.documentElement.classList.add('ui-lock');
    requestAnimationFrame(() => back.classList.add('in'));
    let closed = false;
    const close = (why) => {
      if (closed) return; closed = true;
      back.classList.remove('in');
      document.removeEventListener('keydown', key, true);
      setTimeout(() => { back.remove(); openCount = Math.max(0, openCount - 1); if (!openCount) document.documentElement.classList.remove('ui-lock'); if (lastFocus && lastFocus.focus && !queue.length) { try { lastFocus.focus({ preventScroll: true }); } catch (e) { /* ignore */ } } if (o.onClose) o.onClose(why); const nx = queue.shift(); if (nx) show(nx[0], nx[1]); }, reduced() ? 0 : 180);
    };
    function key(e) {
      if (e.key === 'Escape' && o.dismissible !== false) { e.stopPropagation(); close('esc'); }
      if (e.key === 'Tab') {
        const f = focusables(box); if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', key, true);
    back.addEventListener('click', e => {
      if (e.target === back && o.dismissible !== false) return close('backdrop');
      if (e.target.closest('[data-close]')) return close('x');
      const b = e.target.closest('[data-act]');
      if (b) { const a = o.actions[+b.dataset.act]; if (a.onClick) a.onClick(close); if (!a.keepOpen && !a.href) close('action'); else if (a.href) close('link'); }
    });
    setTimeout(() => { const p = box.querySelector('.btn:not(.ghost), .btn') || box; p.focus({ preventScroll: true }); }, 30);
    if (o.onOpen) o.onOpen(box, close);
    return { close, el: box };
  }
  ui.modal = o => show('modal', o);
  ui.sheet = o => show('sheet', o);
  ui.confirm = function (o) {
    return new Promise(res => ui.modal({
      title: o.title || 'تأكيد', html: `<p>${o.text || ''}</p>`, mascot: o.mascot, mascotSize: 72, immediate: true,
      actions: [{ label: o.ok || 'نعم', primary: !o.danger, onClick: () => res(true) }, { label: o.cancel || 'إلغاء', onClick: () => res(false) }],
      onClose: why => { if (why === 'esc' || why === 'x' || why === 'backdrop') res(false); }
    }));
  };
})();

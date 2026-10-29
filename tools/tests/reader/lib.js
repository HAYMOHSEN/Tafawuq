const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..', '..');
const BASE = process.env.BASE || 'http://localhost:8765/';

// A controllable fake speechSynthesis. Window.__tts exposes knobs + a call log.
const FAKE_TTS = `
(() => {
  const T = window.__tts = { log: [], msPerWord: 70, noBoundary: false, dropStart: false, neverEnd: false, voices: true, startDelay: 5, spoken: [] };
  class U { constructor(t) { this.text = String(t); this.lang = ''; this.rate = 1; this.pitch = 1; this.volume = 1; this.voice = null; this.onstart = this.onend = this.onerror = this.onboundary = null; } }
  const synth = {
    speaking: false, pending: false, paused: false, _q: [], _cur: null, _timers: [],
    getVoices() { return T.voices ? [{ name: 'Fake English (UK)', lang: 'en-GB', default: true, localService: true, voiceURI: 'fake-uk' }] : []; },
    addEventListener() {}, removeEventListener() {},
    speak(u) { T.log.push({ t: 'speak', at: performance.now(), text: u.text, rate: u.rate, lang: u.lang, voice: u.voice && u.voice.name }); T.spoken.push(u.text); this._q.push(u); this.pending = true; this._pump(); },
    cancel() {
      T.log.push({ t: 'cancel', at: performance.now() });
      const cur = this._cur, q = this._q.splice(0);
      this._timers.forEach(clearTimeout); this._timers = [];
      this._cur = null; this.speaking = false; this.pending = false;
      [cur].concat(q).filter(Boolean).forEach(u => setTimeout(() => { try { u.onerror && u.onerror({ error: 'canceled' }); } catch (e) { console.error(e); } }, 0));
    },
    pause() { T.log.push({ t: 'pause' }); this.paused = true; },
    resume() { T.log.push({ t: 'resume' }); this.paused = false; this._pump(); },
    _pump() {
      if (this._cur || !this._q.length || this.paused) return;
      const u = this._q.shift(); this._cur = u; this.speaking = true; this.pending = this._q.length > 0;
      if (T.dropAll) return;
      const words = [], re = /\\S+/g; let m; while ((m = re.exec(u.text))) words.push(m.index);
      const per = T.msPerWord / (u.rate || 1);
      const at = (ms, fn) => this._timers.push(setTimeout(fn, ms));
      if (!T.dropStart) at(T.startDelay, () => { try { u.onstart && u.onstart({}); } catch (e) { console.error(e); } });
      if (!T.noBoundary) words.forEach((ci, k) => at(T.startDelay + 2 + k * per, () => { try { u.onboundary && u.onboundary({ name: 'word', charIndex: ci, charLength: 3 }); } catch (e) { console.error(e); } }));
      if (!T.neverEnd) at(T.startDelay + 4 + words.length * per, () => { this._cur = null; this.speaking = false; T.log.push({ t: 'end', at: performance.now(), text: u.text }); try { u.onend && u.onend({}); } catch (e) { console.error(e); } this._pump(); });
    }
  };
  Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true, writable: true });
  window.SpeechSynthesisUtterance = U;
})();`;

const NO_TTS = `try { delete window.speechSynthesis; delete window.SpeechSynthesisUtterance; } catch (e) {} `;

async function launch(o = {}) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    serviceWorkers: 'block', locale: 'ar-JO', viewport: { width: o.w || 390, height: o.h || 844 },
    colorScheme: o.dark ? 'dark' : 'light', reducedMotion: o.reduced ? 'reduce' : 'no-preference',
    hasTouch: !!o.touch, isMobile: !!o.mobile, deviceScaleFactor: o.dsf || 1
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  await page.addInitScript(`try { if (!localStorage.getItem('tafawuq.v1')) localStorage.setItem('tafawuq.v1', JSON.stringify({ v: 2, settings: Object.assign({ onboarded: true }, ${JSON.stringify(o.settings || {})}) })); } catch (e) {}`);
  if (!o.realTTS) await page.addInitScript(o.noTTS ? NO_TTS : FAKE_TTS);
  if (o.init) await page.addInitScript(o.init);
  return { browser, ctx, page, errors };
}

async function open(page, hash, o = {}) {
  await page.goto(BASE + 'index.html' + (hash ? '#' + hash : ''));
  await page.waitForSelector('main#main > *', { timeout: 8000 });
  if (o.patch) { await page.evaluate(o.patch); await page.evaluate(() => TAF.app.render(true)); }
}

// give g11u1 the gist / tr / gloss that real units have (test data only, never written to disk)
const PATCH_G11U1 = () => {
  const r = TAF.byId.g11u1.reading;
  r.gist = ['اليوم تصل الرسالة إلى أي مكان في ثانية، لكن الكاتب غير مقتنع بأننا صرنا أفضل تواصلاً.', 'كان إرسال الأخبار قديماً عملاً شاقاً، فكان الناس يفكرون في كل كلمة.', 'جدة الكاتب كانت تكتب رسالة شهرياً من القاهرة، وما زالت الأسرة تقرؤها.', 'الرسائل الحديثة سريعة وعابرة وقلّما تُحفظ.', 'لا أحد يريد العودة للانتظار شهراً، فالمراسلة الفورية لها فوائد حقيقية.', 'يقترح الكاتب أن نقتبس عادة التمهّل قبل الضغط على إرسال.'];
  r.tr = ['اليوم تستطيع الرسالة أن تعبر الكوكب في أقل من ثانية. نضغط على الشاشة فتصل كلماتنا قبل أن نضع الهاتف جانباً. ومن السهل أن نظن أن هذه السرعة جعلتنا متواصلين أفضل، لكنني لست مقتنعاً بذلك.', 'في معظم تاريخ البشرية كان إرسال الأخبار مهمة جدية. اعتمد الحكام القدماء على عدّائين وفرسان حملوا الرسائل عبر الصحاري والجبال أحياناً لأسابيع. ثم طارت الحمائم المدرَّبة بين المدن، وفي القرن التاسع عشر سمح التلغراف برسائل قصيرة ومكلفة عبر الأسلاك. ولأن كل كلمة كلّفت وقتاً أو مالاً، كان الناس يفكرون جيداً قبل أن يكتبوا.', 'هذا الاهتمام هو بالضبط ما فقدناه في رأيي. حين كانت جدتي طالبة في القاهرة في ستينيات القرن الماضي كانت تكتب لأهلها في إربد مرة كل شهر. وكانت كل رسالة تستغرق منها أمسية كاملة. كانت تصف الطقس ودروسها والناس الذين قابلتهم، وتسأل دائماً عن كل قريب بالاسم. احتفظ أهلها بتلك الرسائل عقوداً، ونحن ما زلنا نقرؤها اليوم.', 'أما الرسائل الحديثة فقلّما يُحتفظ بها. هي سريعة ومتكررة وكثيراً ما تكون مهملة. نرسل عشر رسائل قصيرة حيث كانت رسالة واحدة متأنية تكفي، ونتوقع رداً فورياً. وجد باحثون أن كثيراً من المراهقين يقلقون حين يتأخر صديق في الرد.', 'بالطبع لا يريد أحد العودة إلى انتظار الأخبار شهراً. فالمراسلة الفورية أنقذت أرواحاً في الطوارئ، وتتيح للعائلات التي تفصلها المحيطات أن ترى وجوه بعضها كل يوم. هذه فوائد حقيقية، ومن الحماقة تجاهلها.', 'ومع ذلك أعتقد أنه ينبغي أن نستعير عادة واحدة من الماضي: التمهّل. قبل أن تضغط «إرسال» اسأل نفسك هل تقول رسالتك ما تقصده حقاً. بضع ثوانٍ إضافية من التفكير قد تحوّل رسالة عادية إلى شيء يستحق الاحتفاظ به.'];
  r.gloss = [['undertaking', 'مهمة / عمل كبير'], ['relied on', 'اعتمدوا على'], ['telegraph', 'التلغراف'], ['decades', 'عقود'], ['by contrast', 'على النقيض'], ['genuine', 'حقيقي'], ['foolish', 'أحمق / غير حكيم'], ['borrow', 'يستعير']];
};

const shot = async (page, name) => { await page.screenshot({ path: `/tmp/rd-test/shots/${name}.png` }); return name; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
module.exports = { launch, open, PATCH_G11U1, shot, sleep, BASE };

// tiny assertion helper
function mkT(name) {
  const T = { name, pass: 0, fail: 0, fails: [] };
  T.ok = (label, cond, extra) => { if (cond) { T.pass++; } else { T.fail++; T.fails.push(label + (extra !== undefined ? '  -> ' + JSON.stringify(extra) : '')); console.log('  ✗ FAIL:', label, extra !== undefined ? JSON.stringify(extra) : ''); } };
  T.eq = (label, a, b) => T.ok(label, JSON.stringify(a) === JSON.stringify(b), { got: a, want: b });
  T.done = errors => { if (errors && errors.length) { T.fail++; T.fails.push('console/page errors: ' + errors.join(' | ')); console.log('  ✗ ERRORS:', errors); } console.log(`== ${name}: ${T.pass} passed, ${T.fail} failed`); return T.fail === 0; };
  return T;
}
module.exports.mkT = mkT;

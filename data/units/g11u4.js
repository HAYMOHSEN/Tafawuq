TAF.unit({
  id: "g11u4",
  grade: 11, sem: 1, n: 4,
  title: "Inside story",
  ar: "القصة من الداخل",
  topics: "الأخبار والصحافة وتغطية الأحداث، التصوير الفوتوغرافي، الأخبار الزائفة والتحقق من المصادر، وسرد القصص والحكايات",
  goals: [
    "استخدام الأزمنة السردية الأربعة (past simple وpast continuous وpast perfect simple وpast perfect continuous) معاً لرواية قصة مترابطة",
    "التمييز بين past perfect simple وpast perfect continuous من حيث النتيجة والمدة والدليل في الماضي وأفعال الحالة",
    "استخدام الجمل المقلوبة بعد التعابير المنفية (Never had I… / No sooner had… than…) وتحويل الجمل إليها",
    "توظيف مفردات الأخبار والتصوير الفوتوغرافي والأخبار الزائفة في الكلام والكتابة",
    "تمييز التحيّز في تقريرين مختلفين عن الحدث نفسه من خلال الكلمات والمصادر والحقائق المختارة",
    "سرد حكاية شخصية بتشويق، ثم كتابة قصة قصيرة بحبكة وذروة ونهاية"
  ],
  vocab: [
    { w: "headline", ar: "العنوان الرئيسي للخبر", pos: "noun", def: "the title of a news story, printed in large letters", ex: "The newspaper's headline said that the old bridge would reopen on Monday.", tag: "news reporting" },
    { w: "breaking news", ar: "خبر عاجل", pos: "compound noun", def: "news about something important that has just happened", ex: "We interrupt this programme with some breaking news from the capital.", tag: "news reporting" },
    { w: "eyewitness", ar: "شاهد عيان", pos: "noun", def: "a person who sees an event and can describe what happened", ex: "One eyewitness told reporters that the car had been travelling very fast.", tag: "news reporting" },
    { w: "correspondent", ar: "مراسل صحفي", pos: "noun", def: "a journalist who reports from a particular place or on a particular subject", ex: "Our sports correspondent will bring you the latest news from the stadium.", tag: "news reporting" },
    { w: "coverage", ar: "تغطية إعلامية", pos: "noun", def: "the reporting of an event or subject in newspapers, online or on TV", ex: "The channel's live coverage of the festival lasted all weekend.", tag: "news reporting" },
    { w: "go viral", ar: "ينتشر انتشاراً واسعاً (على الإنترنت)", pos: "phrase", def: "to spread very quickly to huge numbers of people online", ex: "Her short video about a stray cat went viral overnight.", tag: "news reporting" },
    { w: "news bulletin", ar: "نشرة أخبار موجزة", pos: "compound noun", def: "a short news report on radio or television", ex: "I heard about the storm on the eight o'clock news bulletin.", tag: "news reporting" },
    { w: "scoop", ar: "سبق صحفي", pos: "noun", def: "an important story that one newspaper or channel publishes before the others", ex: "Our local paper got the scoop on the new stadium a full day before the TV channels.", tag: "news reporting" },
    { w: "make the headlines", ar: "يتصدّر عناوين الأخبار", pos: "collocation", def: "to become an important story that appears in the news", ex: "The young inventor from Karak made the headlines when her robot won first prize.", tag: "news collocations" },
    { w: "cover a story", ar: "يغطّي خبراً أو قصة إخبارية", pos: "collocation", def: "to report on an event or subject in the news", ex: "A team of reporters was sent to cover a story about the flood.", tag: "news collocations" },
    { w: "issue a statement", ar: "يُصدر بياناً", pos: "collocation", def: "to make an official announcement, in writing or in public", ex: "The company issued a statement saying it was sorry for the delay.", tag: "news collocations" },
    { w: "break the news", ar: "ينقل الخبر لأول مرة (غالباً خبر سيئ)", pos: "collocation", def: "to tell someone important news for the first time, especially bad news", ex: "It was hard for the doctor to break the news to the family.", tag: "news collocations" },
    { w: "hold a press conference", ar: "يعقد مؤتمراً صحفياً", pos: "collocation", def: "to organise a meeting where officials answer journalists' questions", ex: "The coach held a press conference to announce the team for Friday's final.", tag: "news collocations" },
    { w: "conduct an interview", ar: "يُجري مقابلة", pos: "collocation", def: "to ask someone questions to get information or opinions", ex: "Hala conducted an interview with the oldest baker in the city.", tag: "news collocations" },
    { w: "run a story", ar: "ينشر قصة إخبارية", pos: "collocation", def: "to publish or broadcast a news report", ex: "The local newspaper ran a story about the new library on its front page.", tag: "news collocations" },
    { w: "off the record", ar: "بشكل غير رسمي (لا يجوز نشره)", pos: "idiom", def: "said privately, and not to be published or quoted", ex: "The minister spoke off the record, so the newspaper could not print his words.", tag: "news collocations" },
    { w: "snapshot", ar: "لقطة سريعة / صورة عفوية", pos: "noun", def: "a photograph taken quickly without much planning", ex: "This snapshot of my grandfather was taken at a family picnic in 1985.", tag: "photography" },
    { w: "caption", ar: "التعليق المكتوب أسفل الصورة", pos: "noun", def: "the words under a photo that explain it", ex: "The caption under the photo gave the date and the place.", tag: "photography" },
    { w: "close-up", ar: "لقطة مقرّبة", pos: "noun", def: "a photograph taken from very near the subject", ex: "She took a close-up of the bee sitting on the flower.", tag: "photography" },
    { w: "in focus", ar: "واضح / مضبوط البؤرة", pos: "phrase", def: "clear and sharp in a photo (opposite: out of focus)", ex: "Hold the camera still so that her face stays in focus.", tag: "photography" },
    { w: "zoom in (on)", ar: "يقرّب العدسة على", pos: "phrasal verb", def: "to make a camera show something larger and closer", ex: "The photographer zoomed in on the lion's eyes.", tag: "photography" },
    { w: "candid", ar: "عفوي (يُلتقط دون تصنّع)", pos: "adjective", def: "(of a photo) taken when people are not posing", ex: "The best photos of the wedding were candid ones of children laughing.", tag: "photography" },
    { w: "capture", ar: "يلتقط / يوثّق (لحظة)", pos: "verb", def: "to record a moment or scene in a photo or video", ex: "Her photo captured the exact moment the balloon burst.", tag: "photography" },
    { w: "crop", ar: "يقصّ أطراف الصورة", pos: "verb", def: "to cut off the edges of a photo to improve it", ex: "I cropped the picture so that only my cousins were in it.", tag: "photography" },
    { w: "photojournalist", ar: "مصوّر صحفي", pos: "noun", def: "a journalist who tells news stories mainly through photographs", ex: "The photojournalist spent a week in the village before taking a single picture.", tag: "photography" },
    { w: "misleading", ar: "مضلِّل", pos: "adjective", def: "giving a wrong idea or impression, often on purpose", ex: "The headline was misleading because the story said something completely different.", tag: "fake news" },
    { w: "hoax", ar: "خدعة / خبر ملفّق", pos: "noun", def: "a trick that makes people believe something false", ex: "The 'free phones' message turned out to be an internet hoax.", tag: "fake news" },
    { w: "fact-check", ar: "يتحقق من الحقائق", pos: "verb", def: "to check that the facts in a story are true", ex: "Good journalists always fact-check a story before they publish it.", tag: "fake news" },
    { w: "verify", ar: "يتحقق من صحة (المعلومة)", pos: "verb", def: "to make sure that something is true or correct", ex: "Please verify the details with two different sources before you post.", tag: "fake news" },
    { w: "source", ar: "مصدر المعلومات", pos: "noun", def: "a person, book or website that provides information", ex: "A news story is only as good as its sources.", tag: "fake news" },
    { w: "clickbait", ar: "عنوان خادع لجذب النقرات", pos: "noun", def: "an exciting headline designed to make you click, usually with weak content", ex: "'You won't believe what happened next!' is typical clickbait.", tag: "fake news" },
    { w: "rumour", ar: "إشاعة", pos: "noun", def: "a story that many people repeat but nobody has proved", ex: "There is a rumour that school will finish early on Thursday.", tag: "fake news" },
    { w: "debunk", ar: "يفنّد / يكشف زيف", pos: "verb", def: "to show that a belief or story is false", ex: "Scientists quickly debunked the claim that the lake had turned red.", tag: "fake news" },
    { w: "biased", ar: "متحيّز", pos: "adjective", def: "unfairly supporting one side and ignoring the other", ex: "A biased report tells you only the good things about one side.", tag: "fake news" },
    { w: "credible", ar: "موثوق / جدير بالتصديق", pos: "adjective", def: "trustworthy; able to be believed", ex: "A credible website names its writers and explains where its facts came from.", tag: "fake news" },
    { w: "take (something) with a pinch of salt", ar: "يتعامل معه بحذر وعدم تصديق كامل", pos: "idiom", def: "to doubt that something is completely true", ex: "I take anything I read on social media with a pinch of salt.", tag: "fake news" }
  ],
  grammar: [
    {
      id: "g11u4-gr1",
      title: "Narrative tenses",
      ar: "الأزمنة السردية (رواية القصة)",
      body: [
        { p: "عندما نروي قصة أو خبراً أو حكاية شخصية عن الماضي، لا نكتفي بزمن واحد؛ بل نستخدم **أربعة أزمنة تعمل معاً كفريق**، ولكل زمن «وظيفة» محددة في القصة. اسأل نفسك دائماً: هل هذا حدث رئيسي في القصة؟ أم خلفية للمشهد؟ أم شيء حدث **قبل** بداية الأحداث؟ إجابتك تحدد الزمن الذي تختاره." },
        { h: "1) فريق الأزمنة الأربعة" },
        { table: { head: ["الزمن", "التكوين", "وظيفته في القصة", "مثال"], rows: [
          ["Past simple", "V2 — did not + V", "الأحداث الرئيسية المتتابعة (خط الحبكة)", "The phone rang and I answered it."],
          ["Past continuous", "was / were + V-ing", "الخلفية والمشهد، أو حدث كان جارياً عندما وقع حدث آخر", "It was raining when we left."],
          ["Past perfect simple", "had + V3", "حدث اكتمل قبل حدث ماضٍ آخر (الماضي الأسبق)", "The match had started when we arrived."],
          ["Past perfect continuous", "had been + V-ing", "نشاط استمر مدة قبل لحظة في الماضي (المدة أو السبب)", "We had been waiting for an hour."]
        ] } },
        { tip: "تخيّل أنك مخرج فيلم: الـ past simple هو الأحداث التي تتحرك أمام الكاميرا، والـ past continuous هو المشهد الذي يظهر في الخلفية، أما الـ past perfect بنوعيه فهو «مشهد استرجاعي» (flashback) يشرح ما جرى قبل بداية الفيلم." },
        { h: "2) Past simple مقابل Past continuous" },
        { p: "نستخدم **past simple** لأحداث تامة تقع واحداً بعد الآخر (ثم… ثم…). ونستخدم **past continuous** لحدث كان **جارياً** (وغالباً طويلاً) في لحظة معينة، وقد يقطعه حدث **قصير** بصيغة past simple. مع الحدث الطويل نستخدم غالباً while أو as، ومع الحدث القصير القاطع نستخدم when." },
        { ex: [
          ["The reporter ==arrived== at the scene, ==opened== her notebook and ==began== to ask questions.", "وصلت المراسلة إلى مكان الحدث وفتحت دفترها وبدأت تطرح الأسئلة. (أحداث متتابعة ← past simple)"],
          ["It ==was getting== dark, and a cold wind ==was blowing== across the square.", "كان الظلام يحلّ وكانت ريح باردة تهبّ عبر الساحة. (وصف المشهد ← past continuous)"],
          ["While Rana ==was filming== the crowd, a man suddenly ran past her.", "بينما كانت رنا تصوّر الحشد، ركض رجل فجأة من أمامها. (حدث طويل يقطعه حدث قصير)"],
          ["Sami ==was cooking== while his sister ==was setting== the table.", "كان سامي يطبخ بينما كانت أخته تجهّز المائدة. (حدثان متزامنان)"]
        ] },
        { warn: "✗ He was opening the door and was walking in. ← ✓ He ==opened== the door and ==walked== in. لا نستخدم past continuous لأحداث متتابعة؛ نستخدمه فقط للخلفية أو للحدث الطويل الذي يُقطع." },
        { warn: "✗ I was knowing the answer. ← ✓ I ==knew== the answer. أفعال الحالة (know, believe, want, like, understand, belong…) لا تأتي عادةً بصيغة continuous." },
        { h: "3) Past perfect simple: الماضي الأسبق" },
        { p: "نستخدم **past perfect simple** (had + V3) لحدث وقع **قبل** حدث آخر في الماضي، حين نريد أن نوضّح أيهما جاء أولاً. شكله ثابت مع كل الضمائر: المثبت had + V3، والنفي hadn't + V3، والسؤال Had + فاعل + V3؟" },
        { ex: [
          ["When we reached the stadium, the match ==had started==.", "عندما وصلنا إلى الملعب كانت المباراة قد بدأت. (بدأت قبل وصولنا)"],
          ["I ==hadn't seen== the message, so I didn't reply.", "لم أكن قد رأيت الرسالة، لذلك لم أردّ."],
          ["==Had== the photographer ==left== before the police arrived?", "هل كان المصوّر قد غادر قبل وصول الشرطة؟"]
        ] },
        { h: "4) Past perfect continuous باختصار" },
        { p: "نستخدم **past perfect continuous** (had been + V-ing) لنشاط **استمر مدة** قبل لحظة في الماضي، وغالباً مع for / since / all day / how long، أو لنشرح سبب موقف ماضٍ. وسنقارنه بالـ past perfect simple بالتفصيل في القاعدة التالية." },
        { ex: [
          ["The crowd ==had been waiting== outside the hall for three hours when the singer arrived.", "كان الجمهور ينتظر خارج القاعة منذ ثلاث ساعات عندما وصل المغني."],
          ["Her voice was hoarse because she ==had been shouting== all afternoon.", "كان صوتها مبحوحاً لأنها كانت تصرخ طوال فترة العصر."]
        ] },
        { h: "5) كلمات الربط والزمن: by the time / already / just / before / after" },
        { table: { head: ["الكلمة", "القاعدة", "مثال"], rows: [
          ["by the time", "by the time + past simple ← الجملة الرئيسية past perfect (الحدث اكتمل قبل ذلك الوقت)", "By the time we arrived, the crowd had gone."],
          ["already", "تأتي بعد had مباشرة (أو في آخر الجملة) بمعنى «من قبل / فعلاً»", "The shop had already closed."],
          ["just", "تأتي بعد had مباشرة بمعنى «قبل لحظات»", "I had just sat down when the phone rang."],
          ["before", "الحدث الأسبق past perfect، والحدث الذي يلي before يكون past simple", "She had left before I arrived."],
          ["after", "الحدث الأسبق past perfect بعد after، والحدث الأحدث past simple", "After he had finished the call, he wrote the report."],
          ["when", "قد تأتي مع أي زمن؛ والمعنى يتغيّر بحسب الزمن (انظر المقارنة بعد قليل)", "When I arrived, she had left."],
          ["never … before", "تجربة لم تحدث قبل ذلك الوقت في الماضي", "I had never seen snow before that day."]
        ] } },
        { p: "ملاحظة: بعد after وbefore قد نستخدم past simple في الحدثين لأن الكلمة نفسها توضّح الترتيب (After he finished the call, he wrote the report)، وهذا مقبول في الحديث اليومي. لكن past perfect أدق، وهو المتوقع في تمارين الأزمنة السردية. أما مع by the time وalready وjust وnever … before فاستخدام past perfect هو الأساس." },
        { h: "6) مقارنة مهمة: When I got home, my mother …" },
        { p: "غيّر الزمن فيتغيّر المعنى كله، رغم أن بقية الجملة واحدة:" },
        { ex: [
          ["When I got home, my mother ==cooked== dinner.", "عندما وصلت إلى البيت طبخت أمي العشاء. (الطبخ بعد وصولي)"],
          ["When I got home, my mother ==was cooking== dinner.", "عندما وصلت كانت أمي تطبخ العشاء. (الطبخ جارٍ لحظة وصولي)"],
          ["When I got home, my mother ==had cooked== dinner.", "عندما وصلت كانت أمي قد انتهت من طبخ العشاء. (انتهى الطبخ قبل وصولي)"],
          ["When I got home, my mother ==had been cooking== dinner for hours.", "عندما وصلت كانت أمي تطبخ العشاء منذ ساعات. (نشاط طويل قبل وصولي)"]
        ] },
        { h: "7) قصة قصيرة تجمع الأزمنة الأربعة" },
        { ex: [
          ["It ==was getting== dark when Mona reached the old market.", "كان الظلام يحلّ عندما وصلت منى إلى السوق القديم. (خلفية ← past continuous)"],
          ["She ==had been looking== for the little photo shop for an hour.", "كانت تبحث عن محل التصوير الصغير منذ ساعة. (نشاط طويل قبل وصولها ← past perfect continuous)"],
          ["Her friend ==had told== her that it was behind the bakery.", "كانت صديقتها قد أخبرتها أنه خلف المخبز. (حدث أسبق ← past perfect simple)"],
          ["At last, she ==spotted== a faded sign, ==pushed== the door and ==stepped== inside.", "وأخيراً لمحت لافتة باهتة ودفعت الباب ودخلت. (أحداث رئيسية ← past simple)"],
          ["The old photographer ==was reading== a newspaper behind the counter, and he ==had already printed== her photos.", "كان المصوّر العجوز يقرأ صحيفة خلف المنضدة، وكان قد طبع صورها بالفعل."]
        ] },
        { tip: "طريقة سريعة لاختيار الزمن: (1) حدث رئيسي في القصة ← past simple. (2) خلفية أو حدث جارٍ ← past continuous. (3) حدث انتهى قبل حدث آخر ← past perfect simple. (4) نشاط طويل قبل حدث آخر ← past perfect continuous. وإذا لم يكن في الجملة حدثان في الماضي فلا حاجة إلى past perfect أصلاً." },
        { warn: "✗ By the time we arrived, the film already started. ← ✓ By the time we arrived, the film ==had already started==. مع by the time وalready نحتاج past perfect." },
        { warn: "✗ She had went home before I called. ← ✓ She had ==gone== home before I called. بعد had نستخدم التصريف الثالث V3 دائماً (went ← gone، wrote ← written، took ← taken)." },
        { warn: "لا تضع had في كل فعل لمجرد أن القصة في الماضي: ✗ When Lina had arrived, she had sat down and had opened her laptop. ← ✓ When Lina ==arrived==, she ==sat== down and ==opened== her laptop. نستخدم past perfect فقط للحدث الأسبق الذي نعود إليه." }
      ],
      summary: [
        "Past simple ← الأحداث الرئيسية المتتابعة في القصة (and then…).",
        "Past continuous ← الخلفية، أو الحدث الطويل الذي يقطعه حدث قصير (while / when).",
        "Past perfect simple (had + V3) ← حدث وقع قبل حدث ماضٍ آخر.",
        "Past perfect continuous (had been + V-ing) ← نشاط استمر مدة قبل لحظة في الماضي.",
        "by the time + past simple ← الجملة الرئيسية past perfect، وتأتي معها already / just / never … before.",
        "after وbefore ترتّبان الأحداث: الحدث الأسبق يأخذ had + V3 (ويجوز past simple أحياناً لوضوح الترتيب)."
      ],
      qs: [
        { t: "mcq", q: "The reporter picked up her notebook, ____ to the witness and started asking questions.", o: ["had walked", "was walking", "walked", "had been walking"], a: 2, x: "أحداث متتابعة بالترتيب (picked up ← walked ← started)، فنستخدم past simple مع كل فعل." },
        { t: "mcq", q: "At nine o'clock last night, I ____ a documentary about the Dead Sea, so I didn't answer your call.", o: ["had watched", "was watching", "have watched", "watch"], a: 1, x: "At nine o'clock last night لحظة محددة في الماضي كان الحدث جارياً فيها ← past continuous (was watching)، وجملة so I didn't answer your call تؤكد أن المشاهدة كانت مستمرة في تلك اللحظة." },
        { t: "mcq", q: "While Sami was filming the crowd, a bird suddenly ____ on his camera.", o: ["landed", "was landing", "had landed", "has landed"], a: 0, x: "was filming هو الحدث الطويل الجاري، وsuddenly تدل على حدث قصير قطعه ← past simple (landed)." },
        { t: "mcq", q: "When we got to the stadium, the match ____, so we had missed the first goal.", o: ["has already started", "had already started", "was already started", "would already start"], a: 1, x: "بدأت المباراة قبل وصولنا، فنستخدم past perfect: had already started. وجملة we had missed تؤكد أن الحدث وقع قبل الوصول." },
        { t: "mcq", q: "By the time the ambulance arrived, the crowd ____ home.", o: ["already went", "has already gone", "had already gone", "would already go"], a: 2, x: "by the time + past simple ← الجملة الرئيسية past perfect: كان الناس قد ذهبوا قبل وصول سيارة الإسعاف." },
        { t: "mcq", q: "After the story ____ online, thousands of people shared it within an hour.", o: ["had appeared", "was appearing", "has appeared", "appears"], a: 0, x: "الحدث الأسبق (ظهور الخبر) يأتي بعد after بصيغة past perfect، ثم الحدث الأحدث (shared) بصيغة past simple." },
        { t: "mcq", q: "By the time we reached the village, we ____ for six hours.", o: ["were walking", "have been walking", "walked", "had been walking"], a: 3, x: "by the time + past simple مع مدة (for six hours) ← past perfect continuous: كنا نمشي منذ ست ساعات قبل أن نصل." },
        { t: "mcq", q: "Which sentence means that the film was already over BEFORE Dana arrived?", o: ["When Dana arrived, the film finished.", "When Dana arrived, the film was finishing.", "When Dana arrived, the film had finished.", "When Dana arrived, the film has finished."], a: 2, x: "had finished = انتهى الفيلم قبل وصولها. أما was finishing فتعني أنه كان يقترب من نهايته لحظة وصولها، وfinished تعني أنه انتهى بعد وصولها." },
        { t: "mcq", q: "Which sentence uses the tenses correctly?", o: ["She had been taking the photo when she had heard a loud bang.", "She was taking the photo when she heard a loud bang.", "She took the photo when she was hearing a loud bang.", "She had taken the photo when she was hearing a loud bang."], a: 1, x: "was taking هو الحدث الطويل الجاري، وheard هو الحدث القصير الذي قطعه. باقي الجمل تخلط الأزمنة بشكل غير منطقي." },
        { t: "gap", q: "At eight o'clock last night, the photographer ____ (still / work) in his studio.", a: ["was still working"], x: "لحظة محددة في الماضي كان فيها النشاط جارياً ← past continuous، وتأتي still بين was والفعل: was still working." },
        { t: "gap", q: "The reporter was exhausted because she ____ (not / sleep) for two days.", a: ["hadn't slept", "had not slept", "hadn't been sleeping", "had not been sleeping", "'d not slept", "'d not been sleeping"], x: "الإرهاق سببه أمر أسبق ← past perfect: hadn't slept (أو hadn't been sleeping للتأكيد على المدة)." },
        { t: "gap", q: "We ____ (wait) outside the studio since dawn when the actor finally appeared.", a: ["had been waiting", "'d been waiting", "had waited", "'d waited"], x: "since dawn مدة بدأت قبل ظهور الممثل واستمرت حتى لحظة ظهوره ← had been waiting (ويُقبل had waited)." },
        { t: "gap", q: "I ____ (never / be) to a press conference before that day, so I felt nervous.", a: ["had never been", "'d never been"], x: "never … before that day: تجربة لم تحدث قبل ذلك اليوم ← past perfect: had never been. أما felt nervous فهو الحدث الرئيسي بصيغة past simple." },
        { t: "tr", q: "The match started. Then we arrived at the stadium.", p: "Join the sentences. Start: By the time we arrived at the stadium, …", a: ["By the time we arrived at the stadium, the match had started.", "By the time we arrived at the stadium, the match had already started.", "By the time we arrived at the stadium, the match had begun.", "By the time we arrived at the stadium, the match had already begun."], x: "by the time + past simple ← الجملة الرئيسية past perfect للحدث الأسبق (بدأت المباراة)." },
        { t: "tr", q: "Hana finished her homework. Then the phone rang.", p: "Join the sentences using 'before' and the past perfect. Start: Hana …", a: ["Hana had finished her homework before the phone rang.", "Hana had already finished her homework before the phone rang."], x: "الحدث الأسبق (finished) بصيغة past perfect، والحدث الذي يلي before (the phone rang) بصيغة past simple." },
        { t: "err", q: "By the time we got to the stadium, the match already started.", w: "started", c: "had started (the match had already started)", x: "مع by the time وalready نحتاج past perfect للحدث الأسبق: the match had already started." },
        { t: "err", q: "The journalist had wrote the article before the facts were checked.", w: "wrote", c: "written (had written)", x: "بعد had نستخدم التصريف الثالث V3: wrote ← written." },
        { t: "order", a: "Why had nobody told the correspondent about the change of plan?", x: "سؤال بصيغة past perfect: كلمة السؤال + had + الفاعل + V3 …؟" }
      ]
    },
    {
      id: "g11u4-gr2",
      title: "Past perfect simple vs past perfect continuous",
      ar: "الماضي التام البسيط مقابل الماضي التام المستمر",
      body: [
        { p: "كلا الزمنين يصف ما حدث **قبل** لحظة معينة في الماضي، لكن الفرق بينهما في «زاوية النظر». **Past perfect simple** ينظر إلى **النتيجة أو الإنجاز**: ماذا أنجز؟ كم عدد؟ كم مرة؟ أما **past perfect continuous** فينظر إلى **المدة أو النشاط نفسه**: ماذا كان يفعل؟ وكم استمر؟" },
        { h: "1) التكوين" },
        { table: { head: ["الصيغة", "Past perfect simple", "Past perfect continuous"], rows: [
          ["مثبت", "had + V3 — She had finished.", "had been + V-ing — She had been working."],
          ["منفي", "had not (hadn't) + V3", "had not (hadn't) been + V-ing"],
          ["سؤال", "Had + فاعل + V3 …؟", "Had + فاعل + been + V-ing …؟"],
          ["سؤال عن المدة", "How long had you known him?", "How long had you been waiting?"],
          ["إجابة قصيرة", "Yes, I had. / No, I hadn't.", "Yes, I had. / No, I hadn't."]
        ] } },
        { p: "كلمة had ثابتة مع كل الضمائر (I / you / he / she / it / we / they)." },
        { h: "2) النتيجة أو الإنجاز مقابل المدة" },
        { table: { head: ["", "Past perfect simple", "Past perfect continuous"], rows: [
          ["يركّز على", "اكتمال الحدث ونتيجته", "استمرار النشاط ومدته"],
          ["أسئلة وكلمات دالة", "How many? How much? How often? twice, three times", "How long? for / since / all day / all morning"],
          ["مع الأعداد", "عدد محدد من الأشياء المنجزة: three reports", "لا نستخدمه مع عدد الأشياء المنجزة"],
          ["نوع الأفعال", "أفعال الحالة والأفعال المنجزة", "أفعال النشاط: work, wait, run, cry, rain…"]
        ] } },
        { ex: [
          ["By noon, she ==had written== three reports.", "بحلول الظهر كانت قد كتبت ثلاثة تقارير. (عدد ونتيجة)"],
          ["By noon, she ==had been writing== reports for five hours.", "بحلول الظهر كانت تكتب التقارير منذ خمس ساعات. (مدة ونشاط)"],
          ["He ==had painted== the wall.", "كان قد دهن الجدار. (انتهى الدهان)"],
          ["He ==had been painting== the wall.", "كان يدهن الجدار. (ركّزنا على النشاط، وقد لا يكون قد انتهى)"]
        ] },
        { warn: "✗ By the end of the interview, he had been answering fifty questions. ← ✓ By the end of the interview, he ==had answered== fifty questions. عندما يوجد عدد محدد من الأشياء المنجزة نستخدم past perfect simple." },
        { h: "3) دليل في الماضي: شرح سبب موقف ماضٍ" },
        { p: "نستخدم **past perfect continuous** لنشرح **سبب** موقف كنا نراه أو نشعر به في الماضي: الدليل موجود في الماضي (عيون حمراء، أرض مبللة، شخص يلهث)، وسببه نشاط جرى **قبله** مباشرة. هذه هي الفكرة نفسها في present perfect continuous (Your eyes are red. Have you been crying?) لكن منقولة إلى الماضي." },
        { ex: [
          ["Her eyes were red. She ==had been crying==.", "كانت عيناها حمراوين؛ فقد كانت تبكي قبل قليل."],
          ["The streets were wet because it ==had been raining== all night.", "كانت الشوارع مبللة لأن المطر ظلّ يهطل طوال الليل."],
          ["He was out of breath. He ==had been running==.", "كان يلهث؛ فقد كان يركض."],
          ["There was dust on the floor. Someone ==had been moving== the furniture.", "كان هناك غبار على الأرض؛ فقد كان أحدهم ينقل الأثاث."]
        ] },
        { tip: "قارن: الدليل الآن ← present perfect continuous: His hands ==are== dirty. He ==has been digging==. أما الدليل في الماضي ← past perfect continuous: His hands ==were== dirty. He ==had been digging==." },
        { warn: "✗ He was tired because he has been working all night. ← ✓ He was tired because he ==had been working== all night. عندما تكون القصة في الماضي لا نستخدم has been بل had been." },
        { h: "4) أفعال الحالة (state verbs)" },
        { p: "أفعال الحالة تصف حالة أو شعوراً أو ملكية أو رأياً، لا «نشاطاً»، ولذلك لا تأتي عادةً بصيغة continuous حتى مع for وsince. نستخدم معها **past perfect simple** فقط." },
        { table: { head: ["النوع", "أفعال", "مثال"], rows: [
          ["المعرفة والرأي", "know, believe, understand, realise, remember, doubt", "She had known the mayor for years."],
          ["المشاعر والرغبة", "like, love, hate, want, need, prefer", "I had wanted that camera for a long time."],
          ["الملكية والانتماء", "own, belong, contain, have (= يملك)", "They had owned the café since 1995."],
          ["الانطباع", "seem, appear, look (= يبدو)", "He had seemed calm all morning."]
        ] } },
        { ex: [
          ["By 2020, my uncle ==had owned== the same camera for twenty years.", "بحلول عام 2020 كان عمي يملك الكاميرا نفسها منذ عشرين عاماً."],
          ["I ==had known== Hadeel since primary school, so I trusted her story.", "كنت أعرف هديل منذ المرحلة الابتدائية، لذلك صدّقت قصتها."]
        ] },
        { warn: "✗ She had been knowing the editor for ten years. ← ✓ She ==had known== the editor for ten years. الفعل know فعل حالة فلا يأتي معه continuous." },
        { p: "بعض الأفعال لها معنيان: معنى **حالة** (simple فقط) ومعنى **نشاط** (يجوز continuous):" },
        { table: { head: ["الفعل", "معنى الحالة (simple فقط)", "معنى النشاط (يجوز continuous)"], rows: [
          ["have", "He had had the same camera for years. (يملك)", "He had been having trouble with the lens. (يواجه مشكلة)"],
          ["think", "I had thought the story was true. (أعتقد)", "I had been thinking about the story all day. (أفكّر فيها)"]
        ] } },
        { h: "5) أفعال تقبل الشكلين بمعنى متقارب" },
        { p: "مع أفعال الإقامة والعمل والدراسة والانتظار مثل live, work, study, teach, wait, stay نستطيع استخدام الشكلين مع for وsince دون فرق كبير في المعنى، لأن المدة هي المهمة." },
        { ex: [
          ["Dana ==had lived== in Zarqa for ten years before she moved to Amman.", "عاشت دانا في الزرقاء عشر سنوات قبل أن تنتقل إلى عمّان."],
          ["Dana ==had been living== in Zarqa for ten years before she moved to Amman.", "المعنى نفسه تقريباً، مع إبراز أن إقامتها كانت مستمرة طوال تلك المدة."]
        ] },
        { p: "لكن إذا أردنا أن نؤكد أن النشاط كان **متكرراً أو مؤقتاً أو مزعجاً** فنفضّل continuous: He ==had been phoning== her all week. (كان يتصل بها طوال الأسبوع)." },
        { h: "6) Past continuous مقابل Past perfect continuous" },
        { table: { head: ["الزمن", "المعنى", "مثال"], rows: [
          ["Past continuous", "نشاط جارٍ في لحظة معينة في الماضي", "At 8 pm, she was waiting at the gate."],
          ["Past perfect continuous", "نشاط بدأ قبل تلك اللحظة واستمر حتى وصل إليها (غالباً مع مدة)", "At 8 pm, she had been waiting at the gate for an hour."]
        ] } },
        { h: "7) كيف أختار؟" },
        { table: { head: ["العلامة في الجملة", "الزمن المناسب", "مثال"], rows: [
          ["عدد أو كمية، أو How many? / twice / three times", "past perfect simple", "By ten, he had sent four emails."],
          ["نتيجة نهائية أو حدث اكتمل", "past perfect simple", "She had finished the report."],
          ["for / since / all day / How long؟ (مع أفعال النشاط)", "past perfect continuous", "We had been driving for six hours."],
          ["دليل أو سبب لموقف ماضٍ", "past perfect continuous", "His shirt was wet. He had been running."],
          ["فعل حالة (know, own, belong, want…)", "past perfect simple فقط", "I had known him since childhood."]
        ] } },
        { tip: "ثلاثة أسئلة قبل أن تختار: (1) هل الفعل فعل حالة؟ ← simple. (2) هل هناك عدد أو نتيجة مكتملة؟ ← simple. (3) هل المهم هو المدة أو السبب أو النشاط نفسه؟ ← continuous." }
      ],
      summary: [
        "had + V3 ← النتيجة أو الإنجاز أو العدد (How many?) قبل لحظة في الماضي.",
        "had been + V-ing ← المدة أو النشاط المستمر قبل لحظة في الماضي (How long? for / since / all day).",
        "Past perfect continuous يشرح سبب موقف ماضٍ: His eyes were red. He had been crying.",
        "أفعال الحالة (know, own, belong, want, like…) ← past perfect simple فقط.",
        "live / work / study / wait / stay تقبل الشكلين تقريباً بالمعنى نفسه مع for وsince.",
        "في سياق ماضٍ نستخدم had been وليس has been."
      ],
      qs: [
        { t: "mcq", q: "Her eyes were red because she ____.", o: ["has been crying", "had been crying", "is crying", "cries"], a: 1, x: "الدليل (عيناها حمراوان) كان في الماضي وسببه نشاط سبقه ← past perfect continuous. أما has been crying فللدليل في الحاضر." },
        { t: "mcq", q: "By the time they sold the bakery, the family ____ it for more than forty years.", o: ["had been owning", "owned", "had owned", "was owning"], a: 2, x: "own فعل حالة فلا يأتي بصيغة continuous، ومع by the time نحتاج past perfect ← had owned." },
        { t: "mcq", q: "By the end of the match, the goalkeeper ____ five brilliant saves.", o: ["had been making", "was making", "has made", "had made"], a: 3, x: "عدد محدد (five saves) ونتيجة منجزة ← past perfect simple (had made)." },
        { t: "mcq", q: "When I got to the gate, my brother ____ for twenty minutes, and he was furious.", o: ["had been waiting", "was waiting", "waited", "has been waiting"], a: 0, x: "for twenty minutes: نشاط بدأ قبل وصولي واستمر حتى لحظة وصولي ← past perfect continuous." },
        { t: "mcq", q: "Which sentence does NOT tell us that the painter finished the wall?", o: ["He had painted the wall.", "He painted the wall.", "He has painted the wall.", "He had been painting the wall."], a: 3, x: "past perfect continuous يركّز على النشاط نفسه ولا يخبرنا أن الدهان انتهى، بينما had painted وpainted وhas painted كلها تدل على أن الجدار اكتمل دهانه." },
        { t: "mcq", q: "Which sentence is NOT correct?", o: ["She had worked there for three years when she resigned.", "She had been working there for three years when she resigned.", "She had been knowing the editor for three years when she resigned.", "She had known the editor for three years when she resigned."], a: 2, x: "know فعل حالة لا يأتي بصيغة continuous؛ الصحيح had known. أما work فيقبل الشكلين." },
        { t: "mcq", q: "The camera ____ to my grandfather for fifty years before he gave it to me.", o: ["had been belonging", "had belonged", "was belonging", "has belonged"], a: 1, x: "belong فعل حالة ← past perfect simple فقط (had belonged)." },
        { t: "gap", q: "The streets were wet. It ____ (rain) all night.", a: ["had been raining", "'d been raining", "had rained", "'d rained"], x: "الشوارع المبللة دليل في الماضي على نشاط سبقه ← had been raining (ويُقبل had rained)." },
        { t: "gap", q: "When she interviewed the mayor, she ____ (not / know) him for very long.", a: ["hadn't known", "had not known", "'d not known"], x: "know فعل حالة ← past perfect simple: hadn't known him for very long (لا نقول hadn't been knowing)." },
        { t: "gap", q: "By the time the film ended, we ____ (sit) in the cinema for nearly three hours.", a: ["had been sitting", "'d been sitting", "had sat", "'d sat"], x: "مدة (nearly three hours) قبل لحظة في الماضي ← had been sitting (ويُقبل had sat)." },
        { t: "gap", q: "The photographer ____ (take) more than two hundred photos by midnight.", a: ["had taken", "'d taken"], x: "عدد محدد (more than two hundred photos) ← past perfect simple: had taken." },
        { t: "gap", q: "They ____ (own) the café since 1995, so everybody in town knew them.", a: ["had owned", "'d owned"], x: "own فعل حالة ← past perfect simple: had owned." },
        { t: "tr", q: "We began waiting at six o'clock. The bus came at eight o'clock.", p: "Use 'for'. Start: By the time the bus came, …", a: ["By the time the bus came, we had been waiting for two hours.", "By the time the bus came, we'd been waiting for two hours.", "By the time the bus came, we had waited for two hours.", "By the time the bus came, we'd waited for two hours.", "By the time the bus came, we had been waiting for 2 hours.", "By the time the bus came, we'd been waiting for 2 hours.", "By the time the bus came, we had waited for 2 hours.", "By the time the bus came, we'd waited for 2 hours.", "By the time the bus came, we had already been waiting for two hours.", "By the time the bus came, we'd already been waiting for two hours.", "By the time the bus came, we had been waiting for two hours already.", "By the time the bus came, we'd been waiting for two hours already."], x: "مدة نشاط (ساعتان) قبل لحظة في الماضي ← had been waiting for two hours." },
        { t: "tr", q: "The editor began reading the article at nine. It was eleven o'clock and he was still reading it.", p: "Use 'for'. Start: At eleven o'clock, the editor …", a: ["At eleven o'clock, the editor had been reading the article for two hours.", "At eleven o'clock, the editor had been reading it for two hours.", "At eleven o'clock, the editor had been reading the article for 2 hours.", "At eleven o'clock, the editor had been reading it for 2 hours."], x: "نشاط بدأ قبل اللحظة المذكورة واستمر حتى وصل إليها مع مدة ← had been reading … for two hours." },
        { t: "err", q: "He was exhausted because he has been working all night.", w: "has", c: "had (had been working)", x: "السياق في الماضي (was exhausted) فنحتاج past perfect continuous: had been working، وليس has been." },
        { t: "err", q: "The photographer had took more than a hundred photos by noon.", w: "took", c: "taken (had taken)", x: "بعد had نستخدم التصريف الثالث V3: took ← taken. والعدد (more than a hundred) يدل على past perfect simple." },
        { t: "order", a: "How long had the reporters been waiting?", x: "How long + had + الفاعل + been + V-ing ← سؤال عن مدة النشاط." }
      ]
    },
    {
      id: "g11u4-gr3",
      title: "Negative inversion",
      ar: "الجمل المقلوبة بعد التعابير المنفية",
      body: [
        { p: "في الجملة العادية يأتي الفاعل قبل الفعل: I had never seen such a crowd. لكن عندما نريد **التأكيد** أو نضفي طابعاً **رسمياً أو درامياً** (كما في القصص والخطب والمقالات)، نبدأ الجملة بتعبير **منفي أو مقيِّد**، فينقلب ترتيب الكلمات إلى ترتيب السؤال. هذا ما نسميه **negative inversion**، والمعنى لا يتغيّر؛ يتغيّر الأسلوب فقط." },
        { h: "1) القاعدة العامة" },
        { p: "**تعبير منفي + فعل مساعد + فاعل + باقي الفعل.** الفعل المساعد يتقدّم على الفاعل، ولا يتغيّر شيء آخر في المعنى." },
        { table: { head: ["الجملة العادية", "الجملة المقلوبة"], rows: [
          ["I had never seen such a crowd.", "==Never had I== seen such a crowd."],
          ["She has seldom spoken to reporters.", "==Seldom has she== spoken to reporters."],
          ["He can rarely make a speech without notes.", "==Rarely can he== make a speech without notes."],
          ["They are rarely late.", "==Rarely are they== late."]
        ] } },
        { h: "2) الفعل المساعد حسب الزمن" },
        { p: "إذا لم يوجد فعل مساعد في الجملة الأصلية (present simple أو past simple) نضيف **do / does / did** قبل الفاعل، ويرجع الفعل الرئيسي إلى صيغة المصدر V1." },
        { table: { head: ["الزمن", "ما نضعه قبل الفاعل", "مثال"], rows: [
          ["Present simple", "do / does + فاعل + V1", "Rarely ==does he give== interviews."],
          ["Past simple", "did + فاعل + V1", "Seldom ==did we see== such a crowd."],
          ["Present perfect", "have / has + فاعل + V3", "Never ==have I felt== so proud."],
          ["Past perfect", "had + فاعل + V3", "Never ==had I seen== such a storm."],
          ["الأفعال الناقصة (modals)", "can / could / should / must / will + فاعل + V1", "Under no circumstances ==should you share== it."],
          ["فعل be", "am / is / are / was / were + فاعل", "Rarely ==is she== late."]
        ] } },
        { tip: "بعد did نستخدم V1 وليس V2 (Seldom did we see…)، وبعد does نستخدم V1 دون s (Rarely does he give…). فالفعل المساعد هو الذي يحمل الزمن، والفعل الرئيسي يعود إلى أصله." },
        { h: "3) Never / Rarely / Seldom" },
        { p: "**Never** (لم … أبداً) و**rarely / seldom** (نادراً) هي أشهر تعبيرات القلب. وكثيراً ما تأتي Never مع before: Never before had I…" },
        { ex: [
          ["==Never had I== felt so nervous before an interview.", "لم أشعر قط بهذا التوتر قبل مقابلة."],
          ["==Rarely does== a news story ==change== so many lives.", "نادراً ما يغيّر خبر حياة هذا العدد من الناس."],
          ["==Seldom have== reporters ==been== given such freedom.", "نادراً ما مُنح الصحفيون مثل هذه الحرية."],
          ["==Never before had== the town ==seen== so many tourists.", "لم تشهد البلدة من قبل هذا العدد من السياح."]
        ] },
        { tip: "انتبه: hardly ever بمعنى «نادراً جداً» (= rarely) تُقلب أيضاً لكن دون when: Hardly ever ==does he complain==. أما hardly … when فتعني «ما إن … حتى» كما في القسم التالي." },
        { h: "4) Hardly / Scarcely / Barely … when و No sooner … than" },
        { p: "نستخدمها عندما يقع حدثان متتابعان بسرعة كبيرة («ما إن … حتى»). الحدث **الأول** بصيغة **past perfect** بعد التعبير المقلوب، والحدث **الثاني** بصيغة **past simple**. والقاعدة التي يحبها واضعو الأسئلة: **hardly / scarcely / barely ← when**، و**no sooner ← than**." },
        { table: { head: ["البنية", "مثال"], rows: [
          ["Hardly / Scarcely / Barely + had + فاعل + V3 + ==when== + past simple", "Hardly had the show started when the power failed."],
          ["No sooner + had + فاعل + V3 + ==than== + past simple", "No sooner had she posted the photo than it went viral."]
        ] } },
        { ex: [
          ["==Hardly had== she sat down ==when== the phone rang.", "ما إن جلست حتى رنّ الهاتف."],
          ["==No sooner had== the news been published ==than== the website crashed.", "ما إن نُشر الخبر حتى انهار الموقع."],
          ["==Scarcely had== the match begun ==when== it started to rain.", "ما كادت المباراة تبدأ حتى بدأ المطر يهطل."]
        ] },
        { tip: "إذا جاءت hardly بعد الفاعل فلا يوجد قلب: She had hardly sat down when the phone rang. وهذه الجملة العادية تعني ما تعنيه الجملة المقلوبة Hardly had she sat down when the phone rang (= ما إن جلست حتى رنّ الهاتف)." },
        { warn: "✗ No sooner had he arrived when the phone rang. ← ✓ No sooner had he arrived ==than== the phone rang. وكذلك ✗ Hardly had he arrived than … ← ✓ Hardly had he arrived ==when== …" },
        { h: "5) Not only … but also" },
        { p: "عندما تبدأ الجملة بـ **Not only** نقلب ترتيب **الجملة الأولى فقط** (الفعل المساعد قبل الفاعل)، ثم نكمل الجملة الثانية بالترتيب العادي مع but … also." },
        { ex: [
          ["==Not only did== the video go viral, but it also changed the law.", "لم ينتشر الفيديو فحسب، بل غيّر القانون أيضاً."],
          ["==Not only is== the photo fake, but it is also dangerous.", "ليست الصورة مزيفة فحسب، بل هي خطيرة أيضاً."],
          ["==Not only has== she written the article, but she has also taken the photographs.", "لم تكتب المقال فحسب، بل التقطت الصور أيضاً."]
        ] },
        { tip: "لا قلب إذا لم تبدأ الجملة بـ Not only، أو إذا جاءت Not only مع الفاعل نفسه: The video was ==not only== fake but also dangerous. / Not only the editor but also the reporter was surprised." },
        { h: "6) Little did … know" },
        { p: "تعبير درامي كثير في القصص بمعنى «لم يكن … يعلم أبداً (أن …)». التركيب: **Little did + فاعل + know / realise / suspect / imagine / expect** + (that) + ما حدث لاحقاً. كلمة little هنا بمعنى «لا شيء تقريباً» وليست a little (قليلاً)، وهي تشير إلى أن الشخصية لم تتوقع ما سيحدث، فتشوّق القارئ لما بعدها." },
        { ex: [
          ["==Little did== she ==know== that the photo would soon go viral.", "لم تكن تعلم أبداً أن الصورة ستنتشر قريباً انتشاراً واسعاً."],
          ["==Little did== the reporters ==realise== that the story was a hoax.", "لم يكن الصحفيون يدركون أبداً أن القصة خدعة."],
          ["==Little did== we ==imagine== how much trouble the rumour would cause.", "لم نتخيّل قط كم من المتاعب ستسبّبها الإشاعة."]
        ] },
        { h: "7) Not until … did …" },
        { p: "**Not until** (لم … إلا عندما / حتى) يأتي بعدها وقت أو جملة زمنية، ثم نقلب **الجملة الرئيسية** التي تليها. أما الجزء الذي يلي Not until مباشرةً فيبقى بالترتيب العادي." },
        { ex: [
          ["Not until the next morning ==did we hear== the news.", "لم نسمع الخبر إلا في صباح اليوم التالي."],
          ["Not until she read the comments ==did she realise== the photo was fake.", "لم تدرك أن الصورة مزيفة إلا بعد أن قرأت التعليقات."],
          ["Not until the story had been checked ==was it published==.", "لم يُنشر الخبر إلا بعد التحقق منه."]
        ] },
        { warn: "✗ Not until did she read the comments she realised the photo was fake. ← ✓ Not until she read the comments ==did she realise== the photo was fake. نقلب الجملة الرئيسية وليس جملة Not until." },
        { warn: "✗ Not until he left did he realised his mistake. ← ✓ Not until he left did he ==realise== his mistake. بعد did نستخدم V1 دائماً." },
        { h: "8) Only when / Only after / Only then …" },
        { p: "**Only** مع عبارة وقت أو شرط أو وسيلة (only when, only after, only then, only if, only by) تعني «لم يحدث … إلا …». وكما في Not until، تبقى العبارة التي تلي only بالترتيب العادي، ثم نقلب الجملة الرئيسية." },
        { ex: [
          ["Only when I checked the source ==did I realise== it was a hoax.", "لم أدرك أنها خدعة إلا عندما تحققت من المصدر."],
          ["Only after the police had arrived ==did the crowd start== to leave.", "لم يبدأ الحشد بالمغادرة إلا بعد وصول الشرطة."],
          ["Only then ==did the reporter understand== the truth.", "عندها فقط فهم المراسل الحقيقة."],
          ["Only by checking two sources ==can you be== sure that a story is true.", "لا تستطيع التأكد من صحة الخبر إلا بالتحقق من مصدرين."]
        ] },
        { h: "9) Under no circumstances / On no account / At no time / In no way" },
        { p: "هذه عبارات منفية (فيها no) تُستخدم في الأسلوب الرسمي للمنع أو النفي القاطع: **Under no circumstances / On no account** = «تحت أي ظرف / لا يجوز أبداً»، و**At no time** = «لم … في أي وقت»، و**In no way** = «بأي شكل لا». بعدها نقلب الجملة، وغالباً مع فعل ناقص (should / must / can) أو مع did / was." },
        { ex: [
          ["==Under no circumstances should== you share a story before checking it.", "لا يجوز لك تحت أي ظرف أن تشارك خبراً قبل التحقق منه."],
          ["==On no account must== the door be left open.", "يجب ألا يُترك الباب مفتوحاً بأي حال من الأحوال."],
          ["==At no time did== the minister admit that he had made a mistake.", "لم يعترف الوزير في أي وقت بأنه أخطأ."],
          ["==In no way was== the editor responsible for the error.", "لم يكن المحرر مسؤولاً عن الخطأ بأي شكل."]
        ] },
        { warn: "لا تكرر النفي: ✗ Under no circumstances should you not click the link. ← ✓ Under no circumstances should you click the link. فالعبارة نفسها منفية، ولا نضيف not بعدها." },
        { h: "10) خطوات تحويل الجملة (Transformation)" },
        { p: "(1) ضع التعبير المنفي أو المقيِّد في أول الجملة. (2) حدّد الفعل المساعد، أو أضف do / does / did إن لم يوجد. (3) اكتب الفعل المساعد ثم الفاعل. (4) احذف كلمة النفي من مكانها الأصلي (never, not, rarely…) لأنها انتقلت إلى البداية. (5) راجع الأزمنة: بعد did / does نستخدم V1." },
        { table: { head: ["الجملة الأصلية", "بعد القلب"], rows: [
          ["I had never met such a brave eyewitness.", "==Never had I== met such a brave eyewitness."],
          ["The minister rarely gives interviews.", "==Rarely does the minister== give interviews."],
          ["As soon as the story broke, the website crashed.", "==No sooner had== the story broken ==than== the website crashed."],
          ["He didn't know the truth until the next day.", "==Not until== the next day ==did he know== the truth."],
          ["You must not share this video under any circumstances.", "==Under no circumstances must== you share this video."],
          ["She only understood the problem when she saw the photos.", "==Only when== she saw the photos ==did she understand== the problem."]
        ] } },
        { tip: "الجمل المقلوبة قوية جداً، لذلك استخدمها بحذر: مرة أو مرتين في القصة أو المقالة، عند الذروة أو عند التأكيد. ولا تستخدمها في الحديث اليومي العادي." },
        { warn: "✗ Never I have seen such a mess. ← ✓ Never ==have I== seen such a mess. بعد التعبير المنفي يأتي الفعل المساعد قبل الفاعل." },
        { warn: "✗ Rarely she checks the source. ← ✓ Rarely ==does she check== the source. في present simple نضيف does ونعيد الفعل إلى V1." },
        { warn: "✗ Not only he lost his phone, but he also missed his bus. ← ✓ Not only ==did he lose== his phone, but he also missed his bus." }
      ],
      summary: [
        "تعبير منفي في أول الجملة + فعل مساعد + فاعل: Never had I seen… / Rarely does she speak…",
        "إن لم يوجد فعل مساعد نضيف do / does / did ونعيد الفعل إلى V1: Seldom did we see…",
        "Hardly / Scarcely + had + فاعل + V3 + when …، وNo sooner + had + فاعل + V3 + than …",
        "Not only did he… but he also…، وLittle did she know that… (تشويق في القصص).",
        "Not until / Only when / Only after + جملة بترتيب عادي، ثم نقلب الجملة الرئيسية: Not until I read it did I understand.",
        "Under no circumstances / On no account / At no time / In no way + مساعد + فاعل، ولا نكرر النفي."
      ],
      qs: [
        { t: "mcq", q: "I'm sixteen, and never ____ on a plane.", o: ["I have been", "have I been", "had I been", "I been"], a: 1, x: "بعد never في أول الجملة نقلب الترتيب: الفعل المساعد قبل الفاعل. ولأن الحديث عن الحاضر (I'm sixteen) نستخدم present perfect: have I been." },
        { t: "mcq", q: "Little ____ that the photo would soon go viral.", o: ["she knew", "did she know", "she did know", "knew she"], a: 1, x: "Little did + فاعل + V1: تعبير ثابت في القصص بمعنى «لم تكن تعلم أبداً»." },
        { t: "mcq", q: "Rarely ____ to the press about his private life.", o: ["he talks", "he does talk", "talks he", "does he talk"], a: 3, x: "Rarely في أول الجملة ← does he talk. في present simple نضيف does قبل الفاعل ونعيد الفعل إلى V1." },
        { t: "gap", q: "Little ____ they know that a reporter was filming them.", a: ["did"], x: "Little did + فاعل + know: تعبير ثابت يُستخدم مع past simple." },
        { t: "mcq", q: "Only after the police had arrived ____ the crowd start to leave.", o: ["had", "was", "did", "does"], a: 2, x: "بعد Only after + جملة بترتيب عادي نقلب الجملة الرئيسية، وبما أن الحدث في الماضي نستخدم did: did the crowd start (وبعد did نستخدم V1)." },
        { t: "mcq", q: "Not until the next morning ____ about the accident.", o: ["did we hear", "we heard", "heard we", "we did hear"], a: 0, x: "Not until + وقت ← نقلب الجملة الرئيسية: did we hear (بعد did نستخدم V1)." },
        { t: "mcq", q: "Not only ____ the photo fake, but it was also very harmful.", o: ["did", "has", "were", "was"], a: 3, x: "Not only في أول الجملة ← نقلب فعل be: was the photo fake. أما did فتحتاج فعلاً رئيسياً بعد الفاعل." },
        { t: "mcq", q: "Under no circumstances ____ share a news story before you have checked the source.", o: ["should you", "you should", "you must not", "shouldn't you"], a: 0, x: "Under no circumstances عبارة منفية ← نقلب الجملة: should you share. الخياران you should وyou must not بلا قلب، أما shouldn't you ففيه تكرار للنفي (العبارة منفية أصلاً فلا نضيف not أو n't)." },
        { t: "gap", q: "No sooner had the story broken ____ the website crashed.", a: ["than"], x: "No sooner … than: الأداة المرتبطة بـ no sooner هي than، أما hardly / scarcely فترتبط بـ when." },
        { t: "gap", q: "Not only ____ she win the competition, but she also broke the record.", a: ["did"], x: "Not only في أول الجملة ← did she win (بعد did نستخدم V1)." },
        { t: "mcq", q: "Which sentence is correct?", o: ["No sooner he had opened the door than the alarm went off.", "Hardly had he opened the door than the alarm went off.", "No sooner had he opened the door than the alarm went off.", "No sooner had he opened the door when the alarm went off."], a: 2, x: "No sooner + had + فاعل + V3 + than. الجملة الأولى لم تقلب الترتيب، والثانية استخدمت hardly مع than (الصحيح when)، والرابعة استخدمت no sooner مع when (الصحيح than)." },
        { t: "order", a: "Little did the editor suspect that the photograph was fake.", x: "Little + did + فاعل + V1 (suspect): تعبير مقلوب يُستخدم في القصص بمعنى «لم يكن … يشك أبداً في أن …»." },
        { t: "tr", q: "I had never seen such an amazing photograph.", p: "Rewrite starting with: Never …", a: ["Never had I seen such an amazing photograph.", "Never before had I seen such an amazing photograph.", "Never had I seen such an amazing photograph before.", "Never in my life had I seen such an amazing photograph.", "Never had I seen such an amazing photograph in my life."], x: "Never في أول الجملة ← had قبل الفاعل: Never had I seen …" },
        { t: "tr", q: "As soon as the reporter finished her speech, the audience stood up.", p: "Rewrite starting with: No sooner …", a: ["No sooner had the reporter finished her speech than the audience stood up."], x: "As soon as ← No sooner + had + فاعل + V3 + than + past simple." },
        { t: "tr", q: "She didn't realise the photo was fake until she read the comments.", p: "Rewrite starting with: Not until …", a: ["Not until she read the comments did she realise the photo was fake.", "Not until she had read the comments did she realise the photo was fake.", "Not until she read the comments did she realise that the photo was fake.", "Not until she had read the comments did she realise that the photo was fake.", "Not until she read the comments did she realize the photo was fake.", "Not until she had read the comments did she realize the photo was fake.", "Not until she read the comments did she realize that the photo was fake.", "Not until she had read the comments did she realize that the photo was fake.", "Not until she'd read the comments did she realise the photo was fake.", "Not until she'd read the comments did she realise that the photo was fake.", "Not until she'd read the comments did she realize the photo was fake.", "Not until she'd read the comments did she realize that the photo was fake."], x: "Not until + الجملة الزمنية بترتيب عادي، ثم نقلب الجملة الرئيسية: did she realise (بعد did نستخدم V1)." },
        { t: "tr", q: "You must not share this video under any circumstances.", p: "Rewrite starting with: Under no circumstances …", a: ["Under no circumstances must you share this video.", "Under no circumstances should you share this video.", "Under no circumstances can you share this video.", "Under no circumstances may you share this video.", "Under no circumstances are you to share this video."], x: "Under no circumstances + فعل ناقص + فاعل + V1، ولا نكرر not." },
        { t: "err", q: "No sooner had the film started when the screen went black.", w: "when", c: "than", x: "No sooner تأتي مع than (وليس when). أما hardly وscarcely فتأتيان مع when." },
        { t: "err", q: "At no time did the minister admitted that he had made a mistake.", w: "admitted", c: "admit", x: "بعد did نستخدم V1: At no time did the minister admit …" }
      ]
    },
  ],
  reading: {
    title: "One Hotel, Two Stories",
    text: [
      "Report A: Wadi Zaytoun gained a spectacular new landmark on Saturday, when the Olive Terrace Hotel opened its doors to its first guests. Designed to match the town's traditional buildings, the elegant 120-room hotel stands just 300 metres from the famous Roman theatre, and visitors can enjoy magnificent views of the 2,000-year-old ruins from their balconies.",
      "Mayor Hala Qasem, who cut the ribbon in front of hundreds of cheering residents, called the project 'a gift to our community'. The hotel will provide 150 jobs, and local families are delighted. 'For years, tourists came for an hour and left,' said shop owner Yousef Nasser. 'Now they will stay, eat in our restaurants and buy our olive oil.'",
      "Experts say the hotel could even help to protect the ruins, because the extra money from visitors will pay for repairs. Guests can also enjoy a rooftop restaurant serving traditional dishes made from local ingredients. There is no doubt that the future of Wadi Zaytoun looks bright.",
      "Report B: A giant concrete hotel opened on Saturday just 300 metres from Wadi Zaytoun's ancient Roman theatre, while angry protesters stood outside the gates. Critics say the six-storey building, which has 120 rooms, towers over the 2,000-year-old ruins and spoils the view that has attracted visitors for generations.",
      "The hotel will provide only 150 jobs, and local people say that most of them are badly paid cleaning and kitchen positions. A single night in a room costs more than many local workers earn in a week. 'They told us the hotel would help everyone,' said teacher Rana Haddad. 'But the profits will go to a big company in the capital, not to our town.'",
      "Archaeologist Dr Samer Khalil warned that heavy building work, noise and thousands of extra visitors could damage the fragile site. The hotel's owners refused to answer questions about their plans. Many residents now fear that Wadi Zaytoun is risking its priceless past for the sake of quick money."
    ],
    skill: "Recognising bias",
    skillAr: "تمييز التحيّز في النص",
    skillTip: "التحيّز (bias) يعني أن يميل الكاتب إلى جانب واحد بدل عرض الصورة كاملة. لكشفه انتبه إلى ثلاثة أشياء: الكلمات المشحونة بالعاطفة مثل spectacular وspoils، والحقائق التي ذكرها الكاتب أو تجاهلها، ومن اقتبس كلامهم (مصادر مسمّاة أم مجرد «experts say»). ثم قارن بين تقريرين عن الحدث نفسه وركّز على الحقائق المشتركة بينهما.",
    gloss: [["spectacular", "مذهل / رائع المنظر"], ["landmark", "معلم بارز"], ["magnificent", "فخم / رائع"], ["ruins", "آثار / أطلال"], ["cut the ribbon", "يقصّ الشريط (لافتتاح مشروع)"], ["delighted", "مسرور جداً"], ["protesters", "المحتجّون"], ["critics", "المنتقدون"], ["towers over", "يعلو شامخاً فوق"], ["spoils", "يُفسد"], ["badly paid", "قليل الأجر"], ["profits", "الأرباح"], ["archaeologist", "عالم آثار"], ["fragile", "هشّ / سهل التضرر"], ["priceless", "لا يُقدَّر بثمن"], ["for the sake of", "من أجل / في سبيل"]],
    gist: [
      "التقرير A يصف افتتاح فندق جديد قرب مسرح روماني بكلمات إعجاب ومديح.",
      "ترحّب رئيسة البلدية وصاحب متجر بالفندق لأنه يوفّر وظائف ويجذب السياح.",
      "يرى التقرير أن الفندق قد يساعد في حماية الآثار وأن مستقبل البلدة مشرق.",
      "التقرير B يروي الحدث نفسه لكنه يركّز على الاحتجاجات وضخامة المبنى.",
      "يرى التقرير أن الوظائف قليلة وسيئة الأجر وأن الأرباح لن تفيد أهل البلدة.",
      "يحذّر عالم آثار من ضرر الموقع، ويخشى السكان التضحية بتراثهم من أجل المال."
    ],
    tr: [
      "التقرير A: حصلت بلدة وادي الزيتون يوم السبت على معلم جديد مذهل، عندما فتح فندق «شرفة الزيتون» أبوابه لأول نزلائه. وقد صُمّم هذا الفندق الأنيق، الذي يضم 120 غرفة، ليتناسب مع المباني التقليدية في البلدة، ويقع على بعد 300 متر فقط من المسرح الروماني الشهير، ويستطيع الزوار الاستمتاع من شرفاتهم بإطلالات رائعة على الآثار التي يبلغ عمرها ألفي عام.",
      "وقد وصفت رئيسة البلدية هالة قاسم، التي قصّت الشريط أمام مئات السكان المبتهجين، المشروع بأنه «هدية لمجتمعنا». وسيوفّر الفندق 150 وظيفة، والعائلات المحلية مسرورة جداً. وقال صاحب المتجر يوسف ناصر: «لسنوات طويلة كان السياح يأتون لمدة ساعة ثم يغادرون. أما الآن فسيبقون ويأكلون في مطاعمنا ويشترون زيت الزيتون منا».",
      "ويقول خبراء إن الفندق قد يساعد حتى في حماية الآثار، لأن الأموال الإضافية القادمة من الزوار ستغطي تكاليف الترميم. كما يستطيع النزلاء الاستمتاع بمطعم على السطح يقدّم أطباقاً تقليدية مصنوعة من مكونات محلية. ولا شك في أن مستقبل وادي الزيتون يبدو مشرقاً.",
      "التقرير B: افتُتح فندق خرساني ضخم يوم السبت على بعد 300 متر فقط من المسرح الروماني القديم في وادي الزيتون، بينما وقف محتجّون غاضبون خارج البوابات. ويقول المنتقدون إن المبنى المؤلف من ستة طوابق، والذي يضم 120 غرفة، يعلو شامخاً فوق الآثار التي يبلغ عمرها ألفي عام ويُفسد المنظر الذي جذب الزوار لأجيال.",
      "وسيوفّر الفندق 150 وظيفة فقط، ويقول السكان إن معظمها وظائف تنظيف ومطبخ قليلة الأجر. كما أن ليلة واحدة في غرفة تكلّف أكثر مما يكسبه كثير من العمال المحليين في أسبوع. وقالت المعلمة رنا حداد: «قالوا لنا إن الفندق سيفيد الجميع. لكن الأرباح ستذهب إلى شركة كبيرة في العاصمة، لا إلى بلدتنا».",
      "وحذّر عالم الآثار الدكتور سامر خليل من أن أعمال البناء الثقيلة والضجيج وآلاف الزوار الإضافيين قد تُلحق الضرر بالموقع الهشّ. ورفض أصحاب الفندق الإجابة عن الأسئلة المتعلقة بخططهم. ويخشى كثير من السكان الآن أن يخاطر وادي الزيتون بماضيه الذي لا يُقدَّر بثمن من أجل مال سريع."
    ],
    qs: [
      { t: "mcq", q: "Why does the text put two reports about the same event side by side?", o: ["To advertise the Olive Terrace Hotel to tourists.", "To prove that the hotel should never have been built.", "To show how writers can describe the same event in very different ways.", "To explain how Roman theatres were built."], a: 2, x: "يعرض النص تقريرين عن الحدث نفسه (افتتاح الفندق) بنبرتين مختلفتين تماماً، والهدف أن نلاحظ كيف تؤثر الكلمات والحقائق المختارة في رأي القارئ، وهذا هو موضوع مهارة تمييز التحيّز." },
      { t: "mcq", q: "Which fact is mentioned in Report B but NOT in Report A?", o: ["The hotel has 120 rooms.", "Angry protesters stood outside the hotel on opening day.", "The hotel opened on a Saturday.", "The hotel is 300 metres from the Roman theatre."], a: 1, x: "الاحتجاجات مذكورة في الفقرة 4 فقط. التقرير A لا يشير إليها إطلاقاً، وهذا مثال على التحيّز بالحذف (omission)." },
      { t: "mcq", q: "Which pair of words shows the writers' different attitudes to the hotel?", o: ["Saturday (A) / Saturday (B)", "magnificent (A) / spoils (B)", "metres (A) / metres (B)", "town (A) / town (B)"], a: 1, x: "magnificent كلمة مديح، وspoils كلمة ذم. الكلمات المشحونة بالعاطفة (loaded words) من أهم علامات التحيّز." },
      { t: "mcq", q: "What can we infer about the writer of Report B?", o: ["The writer stayed in the hotel on its first night.", "The writer believes the hotel's jobs are well paid.", "The writer works for the hotel's owners.", "The writer is worried about the hotel's effect on the town and its ruins."], a: 3, x: "اختيار الكاتب لكلمات مثل giant وspoils وfragile وpriceless ولمصادر تنتقد المشروع يدل على قلقه من أثر الفندق في البلدة وآثارها." },
      { t: "mcq", q: "In paragraph 5, what does 'them' refer to in 'most of them are badly paid'?", o: ["jobs", "local people", "the owners", "workers"], a: 0, x: "most of them are badly paid cleaning and kitchen positions ← الضمير them يعود على jobs (الوظائف)، فهي التي توصف بأنها وظائف تنظيف ومطبخ قليلة الأجر." },
      { t: "mcq", q: "Which headline would suit Report B best?", o: ["A Bright Future for Wadi Zaytoun", "Locals Celebrate as Mayor Opens New Hotel", "Hotel Opens Beside Ancient Theatre Despite Protests", "Olive Oil Sales Rise in Wadi Zaytoun"], a: 2, x: "التقرير B يركّز على الاحتجاجات وعلى قرب الفندق من المسرح القديم، فالعنوان الثالث هو الأنسب. أما الأول والثاني فيناسبان لهجة التقرير A المتفائلة." },
      { t: "tf", q: "Report A mentions that some people protested against the hotel.", a: false, x: "التقرير A لا يذكر الاحتجاجات إطلاقاً؛ يذكر فقط السكان المبتهجين، وهذا مثال على التحيّز بالحذف." },
      { t: "tf", q: "Both reports give the same number of jobs that the hotel will provide.", a: true, x: "التقريران يذكران 150 وظيفة، لكن A كتبها بشكل إيجابي (will provide 150 jobs)، وB أضاف only لتبدو قليلة. الحقيقة واحدة والصياغة مختلفة." },
      { t: "find", q: "Find a word in paragraph 6 that means 'easily damaged or broken'.", a: ["fragile"], x: "fragile = هشّ يسهل تضرره: could damage the fragile site." },
      { t: "open", q: "Give two words or phrases from Report A that show a positive attitude, and two from Report B that show a negative attitude.", m: "Report A: spectacular, magnificent, delighted, bright. Report B: giant, angry protesters, spoils, badly paid, refused.", x: "الصفات والكلمات المشحونة تكشف موقف الكاتب حتى لو كانت الحقائق نفسها." },
      { t: "open", q: "Which report would you trust more? What would you do to find out the truth?", m: "I would not completely trust either one, because both choose words and facts to support one side. I would read other sources, look at the facts that both reports agree on (120 rooms, 300 metres, 150 jobs) and ask who gains from each opinion.", x: "الأفضل ألا نصدّق تقريراً واحداً؛ نقارن المصادر ونركّز على الحقائق المشتركة ونسأل من المستفيد." }
    ]
  },
  writing: {
    type: "A story",
    ar: "قصة قصيرة",
    about: "القصة (story) نص سردي يروي أحداثاً متسلسلة تقع لشخصية أو أكثر في مكان وزمان محددين. لها حبكة تتصاعد تدريجياً حتى **الذروة (climax)** ثم تنتهي بنتيجة أو حلّ. في الامتحان تُعطى عادةً جملة يجب أن **تبدأ بها** قصتك أو **تنتهي بها**، فاكتبها حرفياً دون تغيير. الطول المعتاد 150–200 كلمة في 4–5 فقرات قصيرة. استخدم الأزمنة السردية: past simple للأحداث الرئيسية، وpast continuous للمشهد، وpast perfect simple وcontinuous لما سبق القصة. وأضف أدوات ربط زمنية، وصفات وظروفاً حيّة بدلاً من good وnice، وجملة أو جملتين من الحوار (direct speech) بعلامات اقتباس، ثم جملة مقلوبة واحدة أو اثنتين عند الذروة مثل Never had I… أو Little did I know…",
    plan: [
      { part: "Beginning", ar: "البداية (المكان والزمان والشخصيات)", tip: "عرّف بالشخصية والمكان والجو العام في جملتين أو ثلاث. استخدم past continuous لوصف المشهد، وpast perfect لما حدث قبل القصة. إذا أُعطيت جملة افتتاحية فاكتبها حرفياً كأول جملة." },
      { part: "Build-up", ar: "تطوّر الأحداث", tip: "اذكر الأحداث بترتيبها باستخدام past simple وأدوات الربط الزمنية (then, after a while, as soon as). ابدأ بالمشكلة أو الحدث غير المتوقع، وزد التوتر تدريجياً." },
      { part: "Climax", ar: "الذروة (أكثر لحظة تشويقاً)", tip: "هنا الحدث الأهم في القصة: استخدم جملاً قصيرة وحواراً وتعبيرات مثل Suddenly وNo sooner had… than… وLittle did I know… لرفع التشويق." },
      { part: "Ending", ar: "النهاية", tip: "اربط الخيوط: ماذا حدث في النهاية؟ وبماذا شعرت الشخصية؟ يمكنك ختم القصة بدرس أو بشعور أو بمفاجأة صغيرة. وإذا أُعطيت جملة ختامية فخطّط من البداية لتصل إليها بشكل طبيعي." }
    ],
    phrases: [
      { en: "The sun was setting and the wind was getting stronger.", ar: "كانت الشمس تغيب وكانت الريح تشتدّ.", use: "وصف المشهد في البداية (past continuous)" },
      { en: "I had been … for hours when …", ar: "كنت أفعل … منذ ساعات عندما …", use: "خلفية سابقة للأحداث (past perfect continuous)" },
      { en: "At first, … / At that moment, …", ar: "في البداية … / في تلك اللحظة …", use: "ربط زمني" },
      { en: "As soon as … / Just as … / By the time …", ar: "حالما … / تماماً عندما … / بحلول الوقت الذي …", use: "ربط زمني" },
      { en: "After a while, … / Not long after, … / Moments later, …", ar: "بعد قليل … / بعد وقت قصير … / بعد لحظات …", use: "مرور الوقت" },
      { en: "Meanwhile, …", ar: "في هذه الأثناء …", use: "حدثان متزامنان" },
      { en: "Suddenly, … / All of a sudden, …", ar: "فجأة …", use: "حدث مفاجئ في الذروة" },
      { en: "No sooner had I … than …", ar: "ما إن … حتى …", use: "تسريع الأحداث (جملة مقلوبة)" },
      { en: "Little did I know that …", ar: "لم أكن أعلم إطلاقاً أن …", use: "التشويق (جملة مقلوبة)" },
      { en: "Never had I felt so … in my life.", ar: "لم أشعر في حياتي قط بهذا القدر من …", use: "التعبير عن المشاعر (جملة مقلوبة)" },
      { en: "'…,' she whispered nervously.", ar: "«…» همست بتوتر.", use: "الحوار: علامات الاقتباس والفاصلة داخلها + فعل القول + ظرف" },
      { en: "To my surprise / relief / horror, …", ar: "لدهشتي / لارتياحي / لرعبي …", use: "التعبير عن رد الفعل" },
      { en: "breathlessly, anxiously, eagerly, gently …", ar: "ظروف (adverbs) تصف الطريقة", use: "إضافة حيوية للأفعال بدل الكلمات العامة (good / nice)" },
      { en: "In the end, … / Eventually, … / Finally, …", ar: "في النهاية … / أخيراً …", use: "ربط الخاتمة" },
      { en: "From that day on, … / Looking back, …", ar: "منذ ذلك اليوم … / عند النظر إلى الوراء …", use: "ختم القصة بدرس أو شعور" }
    ],
    task: "Write a story (150–200 words) that begins with the sentence: 'I knew something was wrong the moment I opened my bag.'",
    taskAr: "اكتب قصة (150–200 كلمة) تبدأ بالجملة المعطاة حرفياً. استخدم الأزمنة السردية وأدوات الربط الزمنية، وأضف صفات وظروفاً حيّة، وجملة أو جملتين من الحوار، وتأكد أن للقصة ذروة ونهاية واضحة. (في الامتحان قد تُعطى جملة تنتهي بها قصتك بدلاً من جملة البداية.)",
    words: [150, 200],
    model: [
      "I knew something was wrong the moment I opened my bag. My camera, which I had been using all morning, had vanished. I had spent hours photographing the ruins of Jerash for a school competition, and every precious picture was on it.",
      "Then I remembered that I had rested at the old theatre. Panicking, I ran back along the dusty path. The sun was setting and the guards were closing the gates. 'Please let it still be there,' I whispered breathlessly. No sooner had I reached the theatre than I saw an elderly man sitting on the stone steps.",
      "'Are you looking for this?' he asked with a gentle smile, holding up my camera.",
      "I had never felt such relief! He explained that he had been waiting for almost an hour because he had guessed that someone would come back. Little did I know that he was a famous photographer, and before we said goodbye, he showed me how to zoom in on the carved stones.",
      "When I finally got back to the bus, my teacher was waiting anxiously at the door. 'Where on earth have you been?' she cried. I just grinned and held up the camera."
    ],
    check: [
      "هل بدأت (أو أنهيت) القصة بالجملة المعطاة حرفياً ودون تغيير؟",
      "هل استخدمت الأزمنة السردية بشكل صحيح: past simple للأحداث، وpast continuous للمشهد، وpast perfect لما سبق؟",
      "هل استخدمت أدوات ربط زمنية متنوعة (as soon as, by the time, after a while, meanwhile)؟",
      "هل أضفت صفات وظروفاً حيّة بدلاً من good وvery nice (dusty, breathlessly, anxiously)؟",
      "هل في القصة حوار قصير بعلامات اقتباس صحيحة وفعل قول (she whispered)؟",
      "هل للقصة ذروة واضحة ونهاية مناسبة تربط الأحداث؟",
      "هل استخدمت جملة مقلوبة أو اثنتين بشكل صحيح (Never had I… / Little did I know…) دون مبالغة؟",
      "هل عدد الكلمات بين 150 و200، وهل راجعت التهجئة وعلامات الترقيم؟"
    ]
  },
  speaking: {
    title: "Telling an anecdote",
    ar: "رواية حكاية شخصية قصيرة (anecdote)",
    phrases: [
      { en: "Did I ever tell you about the time I …?", ar: "هل أخبرتك يوماً عن المرة التي …؟", use: "البداية: فتح الحكاية" },
      { en: "You won't believe what happened to me …!", ar: "لن تصدّق ما حدث لي …!", use: "البداية: جذب الانتباه" },
      { en: "This happened a couple of years ago, when I was …", ar: "حدث هذا قبل سنتين تقريباً عندما كنت …", use: "البداية: تحديد الزمان" },
      { en: "It all started when …", ar: "بدأ كل شيء عندما …", use: "البداية: بدء الأحداث" },
      { en: "I was in the middle of … when …", ar: "كنت في منتصف … عندما …", use: "التشويق: الخلفية والحدث القاطع (past continuous + past simple)" },
      { en: "I had just … when …", ar: "ما إن … حتى …", use: "التشويق: تسارع الأحداث (past perfect)" },
      { en: "And then, out of nowhere, …", ar: "وفجأة ومن العدم …", use: "التشويق: حدث مفاجئ" },
      { en: "To make matters worse, …", ar: "ولزيادة الطين بلة …", use: "التشويق: تعقيد الموقف" },
      { en: "You'll never guess what happened next!", ar: "لن تخمّن أبداً ما حدث بعد ذلك!", use: "التشويق: إثارة فضول المستمع" },
      { en: "Wait for it … here comes the best part.", ar: "انتظر … هذا هو الجزء الأجمل.", use: "التشويق: إبطاء الإيقاع" },
      { en: "No way! / You're joking! / Seriously?", ar: "مستحيل! / أنت تمزح! / حقاً؟", use: "رد فعل المستمع: الدهشة" },
      { en: "So what happened next? / What did you do?", ar: "إذن ماذا حدث بعد ذلك؟ / وماذا فعلت؟", use: "رد فعل المستمع: طلب المزيد" },
      { en: "That must have been terrifying / embarrassing!", ar: "لا بد أن ذلك كان مرعباً / محرجاً!", use: "رد فعل المستمع: التعاطف" },
      { en: "In the end, … / Long story short, …", ar: "في النهاية … / باختصار …", use: "النهاية: إنهاء الحكاية" },
      { en: "Looking back, it was actually quite funny.", ar: "عند النظر إلى الوراء كان الأمر مضحكاً فعلاً.", use: "النهاية: ختام بتأمل" },
      { en: "And that's why I never … again!", ar: "ولهذا لن أفعل … مرة أخرى أبداً!", use: "النهاية: ختام بالعبرة" }
    ],
    dialogue: [
      ["Karim", "Hadeel, you look exhausted! What happened to you this morning?"],
      ["Hadeel", "You won't believe it! I had been revising for the physics test until two o'clock, so I overslept."],
      ["Karim", "Oh no! Did you miss the school bus?"],
      ["Hadeel", "Wait for it. I was running down the street when, out of nowhere, a bakery van stopped beside me. It was Abu Khalid, our neighbour!"],
      ["Karim", "What a relief! Did he give you a lift?"],
      ["Hadeel", "He did, but to make matters worse, I realised I had left my bag at home – with my calculator inside."],
      ["Karim", "You're joking! So what did you do in the end?"],
      ["Hadeel", "Abu Khalid turned the van around, and I got to school two minutes before the bell. Long story short, I smelled like fresh bread all day!"],
      ["Karim", "Ha! Looking back, that's actually quite funny."]
    ]
  },
  test: [
    { t: "mcq", q: "The police are asking any ____ who saw the accident to contact them.", o: ["correspondents", "eyewitnesses", "captions", "headlines"], a: 1, k: "vocab", x: "eyewitness = شاهد عيان رأى الحادث بنفسه. أما correspondent فهو مراسل صحفي، وcaption تعليق على صورة." },
    { t: "mcq", q: "The young inventor from Irbid ____ the headlines when her robot won an international prize.", o: ["did", "took", "got", "made"], a: 3, k: "vocab", x: "make the headlines = يتصدّر عناوين الأخبار، وهو التركيب الثابت (collocation)." },
    { t: "mcq", q: "To show the tiny details on the butterfly's wings, Dana had to ____ on it.", o: ["zoom in", "zoom out", "cut off", "look up"], a: 0, k: "vocab", x: "zoom in on = يقرّب العدسة على الشيء ليظهر أكبر وأوضح، أما zoom out فيُظهر مساحة أوسع." },
    { t: "mcq", q: "'You won't believe what this boy did next!' is a typical example of ____.", o: ["a caption", "breaking news", "clickbait", "an eyewitness report"], a: 2, k: "vocab", x: "clickbait = عنوان مثير لجذب النقرات دون محتوى حقيقي، وهذه العبارة مثال نموذجي عليه." },
    { t: "mcq", q: "Before you share a shocking post, try to ____ it with a reliable source.", o: ["verify", "conduct", "crop", "capture"], a: 0, k: "vocab", x: "verify = يتحقق من صحة المعلومة، وreliable source = مصدر موثوق." },
    { t: "mcq", q: "I never believe everything I read online – I take it with a ____ of salt.", o: ["piece", "pile", "punch", "pinch"], a: 3, k: "vocab", x: "take something with a pinch of salt = يتعامل معه بحذر ولا يصدّقه بالكامل." },
    { t: "mcq", q: "By the time the firefighters got there, the fire ____ the whole building, and nothing was left.", o: ["was destroying", "destroyed", "has destroyed", "had destroyed"], a: 3, k: "g11u4-gr1", x: "by the time + past simple ← الجملة الرئيسية past perfect: كان الحريق قد دمّر المبنى قبل وصولهم، وnothing was left يؤكد اكتمال الحدث." },
    { t: "gap", q: "Salma ____ (still / take) photos of the mountains when a bird flew across the sky.", a: ["was still taking"], k: "g11u4-gr1", x: "حدث طويل كان جارياً (تصوير الجبال) قطعه حدث قصير (flew) ← past continuous: was still taking، وتأتي still بين was والفعل." },
    { t: "err", q: "When we arrived at the café, our friends have already ordered.", w: "have", c: "had (had already ordered)", k: "g11u4-gr1", x: "القصة في الماضي، وطلبُ الأصدقاء حدث قبل وصولنا ← past perfect: had already ordered، وليس present perfect." },
    { t: "mcq", q: "Hadeel ____ the mayor for ten years, so she wasn't nervous at the interview.", o: ["had known", "had been knowing", "was knowing", "has known"], a: 0, k: "g11u4-gr2", x: "know فعل حالة ← past perfect simple (had known)، ولا نستخدم معه صيغة continuous." },
    { t: "mcq", q: "By the end of the tour, the guide ____ the same story eight times.", o: ["had been telling", "had told", "was telling", "has told"], a: 1, k: "g11u4-gr2", x: "عدد المرات (eight times) يدل على نتيجة منجزة ← past perfect simple: had told." },
    { t: "gap", q: "The children were covered in mud. They ____ (play) football in the rain.", a: ["had been playing", "'d been playing", "had played", "'d played"], k: "g11u4-gr2", x: "الطين دليل في الماضي على نشاط سبقه ← had been playing (ويُقبل had played)." },
    { t: "mcq", q: "Not until the lights went out ____ how dark the street was.", o: ["we realised", "we did realise", "realised we", "did we realise"], a: 3, k: "g11u4-gr3", x: "Not until + جملة زمنية ← نقلب الجملة الرئيسية: did we realise (وبعد did نستخدم V1)." },
    { t: "tr", q: "She had hardly stepped off the plane when reporters surrounded her.", p: "Rewrite starting with: Hardly …", a: ["Hardly had she stepped off the plane when reporters surrounded her.", "Hardly had she stepped off the plane when the reporters surrounded her."], k: "g11u4-gr3", x: "Hardly في أول الجملة ← had قبل الفاعل: Hardly had she stepped … when …" },
    { t: "err", q: "Rarely does he speaks to journalists.", w: "speaks", c: "speak", k: "g11u4-gr3", x: "بعد does نستخدم V1 دون s: Rarely does he speak …" },
    { t: "mcq", q: "Your friend says: '…and then, out of nowhere, all the lights went out!' Which is the best reaction?", o: ["I don't want to listen.", "That was yesterday.", "Really? What happened next?", "It's time to go."], a: 2, k: "speaking", x: "المستمع الجيد يُظهر الدهشة والاهتمام ويطلب المزيد: Really? What happened next?" },
    { t: "mcq", q: "Which sentence is best for ENDING an anecdote?", o: ["Did I ever tell you about the time I got lost?", "Long story short, we found the dog the next morning.", "You won't believe what happened to me!", "It all started when I was ten."], a: 1, k: "speaking", x: "Long story short تُستخدم لإنهاء الحكاية باختصار. أما بقية العبارات فتصلح لبدايتها." },
    { t: "mcq", q: "Read: 'Our spectacular new mall will turn the sleepy town into a thriving paradise.' Which words show that the writer is strongly in favour of the mall?", o: ["new, mall, town", "will, turn, into", "spectacular, thriving, paradise", "sleepy, town, mall"], a: 2, k: "reading", x: "spectacular وthriving وparadise كلمات مديح مبالغ فيها، وهي من علامات التحيّز لصالح المشروع." },
    { t: "mcq", q: "Report 1: 'The council wisely closed the road to protect children.' Report 2: 'The council shut the road without warning, leaving drivers stranded.' What is the main difference between the two reports?", o: ["They describe two different events.", "They use different words that show different attitudes.", "Only one of them mentions the road.", "Only one of them has a headline."], a: 1, k: "reading", x: "الحدث واحد (إغلاق الطريق)، لكن wisely تدل على استحسان، بينما without warning وstranded تدلان على انتقاد." },
    { t: "mcq", q: "Which sentence uses direct speech correctly?", o: ["Where have you been, she shouted angrily.", "She shouted angrily 'where have you been'.", "'Where have you been?' she shouted angrily.", "'Where have you been' she shouted angrily."], a: 2, k: "writing", x: "نضع الكلام المباشر (direct speech) بين علامتي اقتباس مع علامة الاستفهام داخلهما، ثم فعل القول (she shouted) بحرف صغير." }
  ]
});

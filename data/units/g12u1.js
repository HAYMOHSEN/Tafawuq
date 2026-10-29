TAF.unit({
  id: "g12u1",
  grade: 12, sem: 1, n: 1,
  title: "Identity",
  ar: "الهوية",
  topics: "الشخصية والهوية، الصفات الشخصية والصفات المركّبة، الوراثة مقابل التنشئة، هل تشكّل اللغةُ طريقةَ رؤيتنا للعالم، التفضيلات والقيم، واختبارات الشخصية في التوظيف",
  goals: [
    "التمييز بين الأزمنة المستمرة والتامة (present / past perfect simple مقابل continuous) واختيار الأنسب للنتيجة أو المدة أو الخلفية",
    "استخدام future continuous وfuture perfect (simple وcontinuous) مع by the time وby then وthis time next week",
    "تجنّب فخاخ الامتحان في for وsince وago وalready وyet وstill وأفعال الحالة وترتيب الأحداث بالـ past perfect",
    "وصف الشخصية بدقة بالصفات ومشتقاتها الاسمية والصفات المركّبة وتعابير التفضيل (be wild about, click with, set great store by…)",
    "فهم موقف الكاتب ونبرته من خلال اختياره للكلمات (word choice) في نص عن اللغة والتفكير",
    "التحدث عن القيم والتفضيلات ومناقشة الاختبارات النفسية في التوظيف، وكتابة تدوينة (blog post) عن الماضي بخاتمة تأملية"
  ],
  vocab: [
    { w: "assertive (assertiveness)", ar: "حازم وواثق في التعبير عن رأيه (الحزم)", pos: "adjective", def: "confident and direct about what you want, without being aggressive", ex: "Assertiveness is not rudeness: an assertive person says what they need, politely.", tag: "personality adjectives & nouns" },
    { w: "discreet (discretion)", ar: "كتوم ومتحفّظ في كلامه (التكتّم) — انتبه: discrete = منفصل", pos: "adjective", def: "careful not to reveal private things or cause embarrassment (noun: discretion)", ex: "A good counsellor is discreet and never repeats what students tell her in private.", tag: "personality adjectives & nouns" },
    { w: "humble (humility)", ar: "متواضع (التواضع)", pos: "adjective", def: "not proud; not thinking that you are better than other people", ex: "Despite winning three national prizes, Salma stayed humble and thanked her teachers.", tag: "personality adjectives & nouns" },
    { w: "sincere (sincerity)", ar: "صادق ومخلص فيما يقول ويشعر (الصدق / الإخلاص)", pos: "adjective", def: "really meaning what you say or feel, without pretending", ex: "Please accept my sincere apologies; I know the delay caused you a lot of trouble.", tag: "personality adjectives & nouns" },
    { w: "merciful (mercy)", ar: "رحيم (الرحمة)", pos: "adjective", def: "kind and forgiving towards someone you have power over", ex: "A merciful teacher forgives honest mistakes and helps students learn from them.", tag: "personality adjectives & nouns" },
    { w: "inclusive (inclusion)", ar: "شامل يرحّب بالجميع (الشمول والدمج)", pos: "adjective", def: "welcoming everyone, whatever their background, ability or opinions", ex: "Our school wants to be inclusive, so every student can join a club.", tag: "personality adjectives & nouns" },

    { w: "kind-hearted", ar: "طيّب القلب", pos: "adjective", def: "generous and caring towards other people", ex: "The kind-hearted baker gave free bread to families who could not pay.", tag: "compound adjectives of character" },
    { w: "narrow-minded", ar: "ضيّق الأفق", pos: "adjective", def: "unwilling to accept different ideas or ways of living (opposite: open-minded)", ex: "It is narrow-minded to judge a whole community by the mistakes of one person.", tag: "compound adjectives of character" },
    { w: "tight-fisted", ar: "بخيل / شحيح", pos: "adjective", def: "unwilling to spend or give money; mean", ex: "My tight-fisted neighbour never leaves a tip, even after excellent service.", tag: "compound adjectives of character" },
    { w: "absent-minded", ar: "شارد الذهن / كثير النسيان", pos: "adjective", def: "forgetting things because your mind is busy with something else", ex: "The absent-minded professor searched for his glasses for an hour; they were on his head.", tag: "compound adjectives of character" },
    { w: "laid-back", ar: "هادئ الطبع ومرتاح البال", pos: "adjective", def: "relaxed and not easily worried or upset", ex: "My laid-back cousin never panics, even when he misses the last bus.", tag: "compound adjectives of character" },
    { w: "high-spirited", ar: "مرِح ومفعم بالحيوية", pos: "adjective", def: "full of energy, fun and enthusiasm", ex: "The high-spirited children ran around the garden all afternoon.", tag: "compound adjectives of character" },
    { w: "thin-skinned", ar: "حسّاس جداً تجاه النقد", pos: "adjective", def: "easily hurt or offended by criticism (opposite: thick-skinned)", ex: "He is too thin-skinned to accept advice without feeling insulted.", tag: "compound adjectives of character" },
    { w: "strong-willed", ar: "قوي الإرادة / عنيد", pos: "adjective", def: "determined to do what you want, even when others disagree", ex: "Strong-willed people often refuse to give up, even when everyone advises them to.", tag: "compound adjectives of character" },
    { w: "forward-looking", ar: "متطلّع إلى المستقبل ومنفتح على الجديد", pos: "adjective", def: "thinking about the future and open to new ideas", ex: "The forward-looking company trains its staff in skills they will need in ten years.", tag: "compound adjectives of character" },
    { w: "highly strung", ar: "عصبي المزاج وسريع التوتر", pos: "adjective", def: "nervous, tense and easily upset (US: high-strung)", ex: "Hana is highly strung before exams, so a short walk helps her relax.", tag: "compound adjectives of character" },

    { w: "be wild about", ar: "مولع جداً بـ / متحمّس لـ", pos: "idiom", def: "to like or love something very much", ex: "Most of my cousins seem to be wild about football, but I prefer chess.", tag: "idioms of preference & identity" },
    { w: "get a kick out of", ar: "يستمتع كثيراً بـ / يجد متعة وإثارة في", pos: "idiom", def: "to enjoy something a lot, often in an excited or playful way", ex: "Rami gets a kick out of solving puzzles that nobody else can finish.", tag: "idioms of preference & identity" },
    { w: "plump for", ar: "يستقرّ على اختيار (بعد تردّد)", pos: "phrasal verb", def: "to decide on one thing from several, often after hesitating", ex: "After comparing six laptops, Dana plumped for the cheapest one.", tag: "idioms of preference & identity" },
    { w: "click with", ar: "ينسجم مع / يتفاهم مباشرةً مع", pos: "phrasal verb", def: "to get on well with someone from the moment you meet", ex: "I clicked with Yousef at once; we had the same sense of humour.", tag: "idioms of preference & identity" },
    { w: "what makes us tick", ar: "ما الذي يحرّكنا ويفسّر طباعنا ودوافعنا", pos: "idiom", def: "the qualities and motives that explain how a person behaves", ex: "Psychologists study personality to understand what makes us tick.", tag: "idioms of preference & identity" },
    { w: "set great store by", ar: "يُولي أهمية كبيرة لـ", pos: "idiom", def: "to believe that something is very important or valuable", ex: "My grandfather sets great store by punctuality and honesty.", tag: "idioms of preference & identity" },

    { w: "disposition", ar: "الطبع / الميل الفطري في المزاج", pos: "noun", def: "a person's natural way of feeling and behaving", ex: "Even as a baby, Lina had a cheerful disposition.", tag: "nature vs nurture" },
    { w: "trait", ar: "سمة / صفة شخصية", pos: "noun", def: "a particular quality in someone's character or behaviour", ex: "Curiosity is a trait that many successful scientists share.", tag: "nature vs nurture" },
    { w: "hereditary", ar: "وراثي", pos: "adjective", def: "passed from parents to children through genes", ex: "Some illnesses are hereditary, so doctors ask about your family history.", tag: "nature vs nurture" },
    { w: "nurture", ar: "التنشئة والرعاية (أثر البيئة والتربية)", pos: "noun / verb", def: "(noun) the care and upbringing that shape a person; (verb) to help to grow", ex: "Is talent a matter of nature or nurture? Most experts say both matter.", tag: "nature vs nurture" },
    { w: "mould", ar: "يشكّل / يصوغ (شخصية أو قناعات)", pos: "verb", def: "to shape someone's character or beliefs over time (US: mold)", ex: "Her years abroad moulded her into a confident, independent young woman.", tag: "nature vs nurture" },
    { w: "offspring", ar: "الأبناء / النسل (للإنسان أو الحيوان)", pos: "noun", def: "a person's children, or the young of an animal (no plural -s)", ex: "Many birds feed their offspring for weeks before the young can fly.", tag: "nature vs nurture" },
    { w: "destiny", ar: "المصير / القدر", pos: "noun", def: "the future that seems to be decided in advance and cannot be changed", ex: "Some people believe in destiny; others think their own choices matter more.", tag: "nature vs nurture" },
    { w: "vulnerability (vulnerable)", ar: "الهشاشة / قابلية التأثر أو التعرّض للأذى", pos: "noun", def: "the state of being easily hurt, harmed or influenced (adjective: vulnerable)", ex: "Teenagers' vulnerability to peer pressure is one reason schools teach confidence.", tag: "nature vs nurture" },

    { w: "grasp", ar: "يستوعب / يدرك فكرةً (رسمياً: comprehend)", pos: "verb", def: "to understand an idea fully (more formal: comprehend)", ex: "It took me a while to grasp how the two grammar systems differ.", tag: "thinking verbs" },
    { w: "conceive (of)", ar: "يتصوّر / يتخيّل أن الأمر ممكن", pos: "verb", def: "to form an idea in your mind; to imagine that something is possible", ex: "Some people cannot conceive of a day without their phones.", tag: "thinking verbs" },
    { w: "assume", ar: "يفترض / يظنّ (دون دليل)", pos: "verb", def: "to accept that something is true without having proof", ex: "Don't assume that quiet students have nothing to say.", tag: "thinking verbs" },
    { w: "conclude", ar: "يخلص إلى / يقرّر بعد دراسة الأدلة", pos: "verb", def: "to decide that something is true after thinking about the evidence", ex: "After comparing the results, the researchers concluded that more tests were needed.", tag: "thinking verbs" },
    { w: "deduce", ar: "يستدلّ / يستنتج منطقياً من القرائن", pos: "verb", def: "to work out a fact by logical thinking from clues", ex: "From the muddy footprints, the detective deduced that the visitor had come through the garden.", tag: "thinking verbs" },
    { w: "reflect (on)", ar: "يتأمّل / يفكّر مليّاً في", pos: "verb", def: "to think carefully about something, especially your own experiences", ex: "At the end of term, we reflect on what we have learned about ourselves.", tag: "thinking verbs" },

    { w: "come as a shock", ar: "جاء كصدمة / فاجأ بشدة", pos: "phrase", def: "to surprise or upset someone because it was not expected", ex: "The news of the school's closure came as a shock to everyone.", tag: "key-word transformation phrases" },
    { w: "much to my delight", ar: "ولسروري الشديد", pos: "phrase", def: "used to say that something made you very pleased (also: surprise, regret)", ex: "Much to my delight, the teacher cancelled the quiz.", tag: "key-word transformation phrases" },
    { w: "keep an eye (on)", ar: "يراقب / يُبقي عينه على / يعتني مؤقتاً بـ", pos: "phrase", def: "to watch someone or something carefully so that nothing goes wrong", ex: "Could you keep an eye on my bag while I buy a ticket?", tag: "key-word transformation phrases" },
    { w: "not have a clue", ar: "ليس لديه أدنى فكرة", pos: "phrase", def: "to have no idea about something (informal)", ex: "My brother does not have a clue how to cook an egg.", tag: "key-word transformation phrases" }
  ],
  grammar: [
    {
      id: "g12u1-gr1",
      title: "Continuous and perfect tenses in contrast",
      ar: "الأزمنة المستمرة والتامة: متى نختار أيّها؟",
      body: [
        { p: "في الصف الثاني عشر لا يكفي أن تعرف **شكل** الزمن؛ المطلوب أن تعرف **لماذا** اختار الكاتب هذا الزمن بالذات. فالزمن في الإنجليزية يحدّد «زاوية النظر» إلى الحدث: هل نراه حقيقةً كاملة؟ أم عملية جارية؟ أم حدثاً له أثر في وقت لاحق؟ أم نشاطاً استمر مدة؟ وهذا ما تختبره أسئلة الاختيار من متعدد في الامتحان." },
        { h: "1) خريطة الأزمنة الثمانية" },
        { table: { head: ["الزمن", "التكوين", "الفكرة الأساسية", "مثال"], rows: [
          ["Present simple", "V / V(s)", "عادة أو حقيقة أو حالة دائمة", "Hala walks to school every day."],
          ["Present continuous", "am / is / are + V-ing", "حدث جارٍ الآن، أو موقف مؤقت، أو تغيّر مستمر", "Hala is walking to school this week."],
          ["Present perfect simple", "have / has + V3", "نتيجة أو عدد أو خبرة تربط الماضي بالحاضر", "Hala has walked two kilometres already."],
          ["Present perfect continuous", "have / has been + V-ing", "نشاط مستمر حتى الآن (أو توقف للتو) مع التركيز على المدة", "Hala has been walking for an hour."],
          ["Past simple", "V2", "حدث انتهى في الماضي، أو أحداث متتابعة", "Hala walked home and made tea."],
          ["Past continuous", "was / were + V-ing", "خلفية، أو حدث جارٍ في لحظة ماضية", "Hala was walking home when it started to rain."],
          ["Past perfect simple", "had + V3", "حدث أسبق من حدث ماضٍ آخر", "Hala had walked a long way before the rain started."],
          ["Past perfect continuous", "had been + V-ing", "نشاط استمر مدة قبل لحظة في الماضي (مدة أو سبب)", "Hala had been walking for an hour when it started to rain."]
        ] } },
        { tip: "اسأل نفسك ثلاثة أسئلة قبل أن تختار الزمن: (1) هل الحديث عن الحاضر أم الماضي؟ (2) هل أركّز على **النتيجة والعدد** (simple) أم على **النشاط والمدة** (continuous)؟ (3) هل أعود إلى الوراء من نقطة زمنية معينة (perfect)؟" },

        { h: "2) Present simple مقابل Present continuous: عادة أم موقف مؤقت؟" },
        { p: "نستخدم **present simple** للعادات والحقائق والحالات الدائمة، و**present continuous** للحدث الجاري الآن أو الموقف **المؤقت** أو التغيّر الجاري حولنا. وهناك استخدام خاص: **always + present continuous** لوصف عادة متكررة **تزعج** المتحدث أو تفاجئه (وقد تعبّر أحياناً عن الإعجاب بحسب نبرة الصوت والسياق)." },
        { ex: [
          ["My cousin ==works== in a bank in Aqaba.", "ابن عمي يعمل في بنك في العقبة. (وضع دائم)"],
          ["This month he ==is working== at the airport branch.", "هذا الشهر يعمل في فرع المطار. (وضع مؤقت)"],
          ["Internet speeds ==are improving== in many villages.", "تتحسّن سرعة الإنترنت في قرى كثيرة. (تغيّر جارٍ)"],
          ["Dad ==always leaves== his glasses on the sofa.", "أبي دائماً يترك نظارته على الأريكة. (عادة، وصف محايد)"],
          ["Dad ==is always leaving== his glasses in the car!", "أبي لا يكفّ عن ترك نظارته في السيارة! (انزعاج)"]
        ] },
        { p: "ومع **be + صفة** نفرّق بين الصفة الثابتة والسلوك المؤقت: **He is rude** = طبعه وقح، أما **He is being rude** = يتصرف بوقاحة الآن في هذا الموقف فقط. يصلح هذا مع صفات السلوك الذي يتحكم فيه الإنسان (silly, rude, polite, selfish, difficult, careful)، ولا نقول «He is being tall»." },
        { ex: [
          ["Sami ==is== polite, so his teachers like him.", "سامي مهذّب بطبعه، لذلك يحبه معلموه."],
          ["Sami ==is being== rude today. I wonder what is wrong.", "سامي يتصرف بوقاحة اليوم. أتساءل ما المشكلة."]
        ] },

        { h: "3) Present perfect simple مقابل Present perfect continuous" },
        { table: { head: ["وجه المقارنة", "Present perfect simple", "Present perfect continuous"], rows: [
          ["التركيز", "النتيجة أو العدد أو اكتمال الفعل", "النشاط نفسه والمدة (وقد لا يكون مكتملاً)"],
          ["السؤال المناسب", "How many / How much …?", "How long …?"],
          ["مثال", "I've written three pages.", "I've been writing all morning."],
          ["هل انتهى الفعل؟", "I've read your report. (قرأته كله)", "I've been reading your report. (ما زلت أقرؤه أو قرأت جزءاً)"],
          ["نتيجة أو أثر ظاهر الآن", "I've fixed the bike, so you can ride it now.", "I've been fixing the bike, so my hands are black."]
        ] } },
        { p: "مع الأفعال التي تدل على مدة مثل **live** و**work** و**study** و**teach** يكاد المعنى يتطابق، لكن continuous توحي بوضع **مؤقت** أو قابل للتغيّر، وsimple توحي بوضع **أدوم**. ومع **lately / recently** نستخدم continuous غالباً لوصف نشاط يتكرر." },
        { ex: [
          ["I ==have lived== in Amman all my life.", "عشت في عمّان طوال حياتي. (وضع دائم)"],
          ["I ==have been living== with my aunt since September.", "أعيش مع خالتي منذ أيلول. (وضع مؤقت)"],
          ["Prices ==have been rising== lately.", "الأسعار في ارتفاع متواصل مؤخراً."]
        ] },
        { tip: "قاعدة سريعة: إذا رأيت **How many / How much / three times / finished** فاختر **simple**، وإذا رأيت **How long / all day / lately** وكان الفعل فعل حدث فاختر **continuous**. وإذا كان الفعل من أفعال الحالة (know, own, belong) فاستخدم simple دائماً مع How long." },

        { h: "4) Past simple مقابل Past continuous" },
        { p: "نستخدم **past simple** للأحداث التامة المتتابعة أو للحدث القصير. ونستخدم **past continuous** للخلفية أو للحدث **الجاري** في لحظة ماضية (while / as / at 8 pm / this time yesterday)، وهو لا يخبرنا هل انتهى الحدث أم لا، بعكس past simple الذي يوحي بالاكتمال." },
        { ex: [
          ["I ==read== the whole novel on Friday.", "قرأت الرواية كلها يوم الجمعة. (اكتملت)"],
          ["I ==was reading== the novel when my cousin arrived.", "كنت أقرأ الرواية عندما وصل ابن عمي. (جارٍ وقتها، ولا نعرف هل أنهيتها)"],
          ["She ==opened== the letter, ==read== it twice and ==smiled==.", "فتحت الرسالة وقرأتها مرتين وابتسمت. (أحداث متتابعة)"],
          ["While we ==were waiting==, a stranger ==asked== us for directions.", "بينما كنا ننتظر، سألنا غريب عن الطريق. (حدث جارٍ يقطعه حدث قصير)"],
          ["My little brother ==was always borrowing== my pens.", "كان أخي الصغير لا يكفّ عن استعارة أقلامي. (عادة ماضية مزعجة)"],
          ["I ==was wondering== if you could help me.", "كنت أتساءل إن كان بإمكانك مساعدتي. (صيغة مهذّبة)"]
        ] },
        { warn: "✗ She was opening the door and was walking in. ← ✓ She ==opened== the door and ==walked== in. لا نستخدم past continuous لأحداث متتابعة؛ نستخدمه للحدث الجاري أو الخلفية فقط." },

        { h: "5) Past perfect simple مقابل Past perfect continuous" },
        { p: "كلاهما يعود إلى ما قبل لحظة في الماضي. **Past perfect simple** يركّز على **اكتمال** الفعل أو نتيجته أو عدده، أما **past perfect continuous** فيركّز على **استمرار** النشاط ومدته، أو على كونه **سبباً** لحالة نراها في الماضي." },
        { ex: [
          ["When I arrived, the lesson ==had started==.", "عندما وصلت كان الدرس قد بدأ. (حدث أسبق)"],
          ["By the time I found the file, I ==had opened== twelve folders.", "حين وجدت الملف كنت قد فتحت اثني عشر مجلداً. (عدد ونتيجة)"],
          ["They ==had been waiting== for two hours when the bus finally came.", "كانوا ينتظرون منذ ساعتين عندما وصلت الحافلة أخيراً. (مدة)"],
          ["Her eyes were red because she ==had been crying==.", "كانت عيناها حمراوين لأنها كانت تبكي. (سبب)"],
          ["I ==had known== him for years before we worked together.", "كنت أعرفه منذ سنوات قبل أن نعمل معاً. (فعل حالة ← simple فقط)"]
        ] },
        { tip: "استخدم past perfect فقط عندما تحتاج إلى توضيح أن حدثاً وقع **قبل** حدث ماضٍ آخر. إذا رويت الأحداث بترتيب وقوعها فـ past simple يكفي؛ فلا تضع had في كل جملة من القصة." },

        { h: "6) أفعال الحالة وأفعال الحدث (stative / dynamic verbs)" },
        { p: "**أفعال الحالة** تصف شعوراً أو فكرة أو ملكية أو حالة ثابتة، ولا نستخدمها عادةً بصيغة continuous، لا في الحاضر ولا في perfect continuous. من أشهرها: know, believe, understand, remember, belong, own, need, want, prefer, like, love, hate, seem, resemble, contain, consist of." },
        { ex: [
          ["I ==have known== Maha since primary school.", "أعرف مها منذ المرحلة الابتدائية."],
          ["She ==owns== two small shops in Salt.", "تملك محلين صغيرين في السلط."]
        ] },
        { p: "وبعض الأفعال لها **معنيان**: معنى حالة (simple) ومعنى نشاط (continuous):" },
        { table: { head: ["الفعل", "معنى الحالة (simple)", "معنى النشاط (continuous)"], rows: [
          ["think", "I think it's a good idea. (رأي)", "I'm thinking about changing schools. (أفكّر في الأمر)"],
          ["have", "She has a big family. (تملك)", "She's having lunch. (تتناول)"],
          ["see", "I see what you mean. (أفهم)", "I'm seeing the dentist tomorrow. (موعد)"],
          ["be", "He is shy. (طبعه)", "He is being shy today. (يتصرف بخجل الآن)"],
          ["taste", "The soup tastes salty. (طعمه)", "She is tasting the soup. (تتذوقه)"],
          ["expect", "I expect he'll pass. (أتوقع)", "We're expecting guests tonight. (ننتظر)"],
          ["weigh", "The box weighs five kilos. (وزنه)", "He is weighing the flour. (يزن الدقيق)"]
        ] } },
        { p: "وأفعال التفكير التي تعلمتها في هذه الوحدة هي في الغالب أفعال حالة أو عمليات ذهنية، فانتبه إلى صيغتها:" },
        { table: { head: ["الفعل", "المعنى", "مثال", "الصيغة"], rows: [
          ["comprehend", "يستوعب (رسمي)", "Few people comprehend how complex the brain is.", "simple"],
          ["grasp", "يدرك فكرة", "I finally grasp the rule.", "simple"],
          ["recognise", "يتعرّف على / يقرّ بـ", "I didn't recognise her voice.", "simple"],
          ["conceive (of)", "يتصوّر", "I can't conceive of living without music.", "simple"],
          ["assume", "يفترض", "I assume you have read the text.", "simple"],
          ["gather", "يفهم مما سمعه", "I gather the match has been postponed.", "simple"],
          ["deduce", "يستدلّ بالمنطق", "The detective deduced the truth.", "simple"],
          ["conclude", "يخلص إلى / ينهي", "The report concludes that more tests are needed.", "simple، ويقبل continuous بمعنى «ينهي»"],
          ["reflect (on)", "يتأمّل", "We have been reflecting on our results.", "يقبل continuous (عملية تفكير)"]
        ] } },
        { tip: "في الإعلانات والكلام العفوي قد تسمع جملاً مثل «I'm loving this song»، لكن في الامتحان الأصل هو الصيغة البسيطة مع أفعال الحالة: I love this song." },
        { warn: "✗ I am understanding the lesson. ← ✓ I ==understand== the lesson.  ✗ She has been knowing him since 2015. ← ✓ She ==has known== him since 2015.  ✗ We are having a big house. ← ✓ We ==have== a big house (have بمعنى «يملك» فعل حالة)." }
      ],
      summary: [
        "Present simple ← عادة أو حقيقة؛ present continuous ← الآن أو موقف مؤقت؛ always + continuous ← عادة مزعجة.",
        "Present perfect simple ← نتيجة أو عدد (How many)؛ present perfect continuous ← نشاط ومدة (How long).",
        "Past simple ← حدث تام أو أحداث متتابعة؛ past continuous ← خلفية أو حدث جارٍ يقطعه حدث قصير.",
        "Past perfect simple ← حدث أسبق ونتيجته؛ past perfect continuous ← مدة أو سبب قبل لحظة ماضية.",
        "أفعال الحالة (know, own, believe, recognise…) لا تأتي عادةً بصيغة continuous، وبعضها يغيّر معناه (think, have, see, be)."
      ],
      qs: [
        { t: "mcq", q: "Dad usually drives to work, but for the time being he ____ the bus because his car is at the garage.", o: ["has taken", "took", "is taking", "was taking"], a: 2, x: "for the time being تدل على موقف **مؤقت** يجري حالياً (السيارة الآن في الكراج)، فنستخدم present continuous: is taking. أما took وwas taking فللماضي، وhas taken لا يناسب for the time being." },
        { t: "gap", q: "Prices ____ (rise) faster than salaries at the moment, and many families are worried.", a: ["are rising", "'re rising"], x: "at the moment تدل على اتجاه جارٍ حالياً ← present continuous: are rising." },
        { t: "mcq", q: "Which sentence shows that the speaker is annoyed by a habit?", o: ["My neighbour plays the piano every evening.", "My neighbour is always playing the piano at midnight.", "My neighbour has played the piano since 2019.", "My neighbour will play the piano tonight."], a: 1, x: "always + present continuous تعبّر عن عادة متكررة **تزعج** المتحدث. الجمل الأخرى تصف الواقع دون انفعال." },
        { t: "mcq", q: "I ____ three chapters of this novel this evening, and I am about to start the fourth.", o: ["have read", "have been reading", "was reading", "had read"], a: 0, x: "ذُكر عدد محدد (three chapters) ونتيجة مكتملة ← present perfect simple. أما continuous فيركّز على النشاط والمدة لا على العدد." },
        { t: "mcq", q: "I ____ a documentary about the Dead Sea when the electricity suddenly went off.", o: ["watched", "have watched", "had watched", "was watching"], a: 3, x: "كانت المشاهدة حدثاً جارياً قطعه حدث قصير (went off) ← past continuous: was watching." },
        { t: "gap", q: "I ____ (know) Maha since primary school, so I can tell when she is worried.", a: ["have known", "'ve known"], x: "know فعل حالة لا يأتي بصيغة continuous، ومع since نستخدم present perfect simple: have known." },
        { t: "mcq", q: "Why is Hadeel ____ so rude to everyone this morning? She is usually very polite.", o: ["being", "been", "be", "to be"], a: 0, x: "is being + صفة تصف **سلوكاً مؤقتاً** في موقف معين. فالصيغة الصحيحة: Why is Hadeel being so rude?" },
        { t: "mcq", q: "Which sentence suggests that the speaker has probably NOT finished the report?", o: ["I read the report.", "I have read the report.", "I have been reading the report.", "I had read the report."], a: 2, x: "present perfect continuous يركّز على النشاط ولا يؤكد الاكتمال، بينما الصيغ الأخرى توحي بأن القراءة انتهت." },
        { t: "gap", q: "When I reached the hall, the lecture ____ (already / begin) and the professor was halfway through his first slide.", a: ["had already begun", "'d already begun", "had begun already", "had already started", "'d already started", "had started already", "'d begun already", "'d started already"], x: "بدأت المحاضرة قبل وصولي ← past perfect simple: had already begun (وتوضع already بعد had)." },
        { t: "gap", q: "Please don't knock. Mum ____ (have) a shower at the moment.", a: ["is having", "'s having"], x: "have هنا بمعنى «يأخذ/يتناول» أي فعل حدث، وat the moment تدل على أنه جارٍ الآن ← is having. أما have بمعنى «يملك» فهو فعل حالة (Mum has a car)." },
        { t: "mcq", q: "By the time the bus arrived, Hadi ____ for ten minutes and was completely out of breath.", o: ["ran", "was running", "has been running", "had been running"], a: 3, x: "by the time + past simple ← نشاط استمر مدة (for ten minutes) قبل لحظة ماضية ← past perfect continuous: had been running." },
        { t: "gap", q: "We ____ (drive) for six hours when the car finally broke down.", a: ["had been driving", "'d been driving", "had driven", "'d driven"], x: "مدة (for six hours) قبل لحظة في الماضي (broke down) ← had been driving، ويُقبل had driven أيضاً." },
        { t: "tr", q: "Nour began working at the museum in 2019, and she still works there.", p: "Rewrite starting with: Nour has been …", a: ["Nour has been working at the museum since 2019.", "Nour has been working in the museum since 2019.", "Nour has been working there since 2019."], x: "بدأت في 2019 وما زالت مستمرة ← present perfect continuous + since + نقطة البداية." },
        { t: "err", q: "Yesterday, by the time the guests arrived, Mum has already prepared the food.", w: "has", c: "had (had already prepared)", x: "by the time + past simple ← الحدث الأسبق (تحضير الطعام) يأتي بصيغة past perfect: had already prepared." },
        { t: "err", q: "I am waiting for you since nine o'clock.", w: "am", c: "have been (I have been waiting …)", x: "since + نقطة بداية ونشاط مستمر حتى الآن ← present perfect continuous: I have been waiting." },
        { t: "order", a: "Why have you been ignoring my messages all week?", x: "سؤال بصيغة present perfect continuous: كلمة السؤال + have + الفاعل + been + V-ing." },
        { t: "tr", q: "The film started at seven o'clock. We arrived at half past seven.", p: "Rewrite starting with: When we arrived, the film had …", a: ["When we arrived, the film had started.", "When we arrived, the film had already started.", "When we arrived, the film had begun.", "When we arrived, the film had already begun.", "When we arrived, the film had been on for half an hour.", "When we arrived, the film had been running for half an hour.", "When we arrived, the film had been playing for half an hour.", "When we arrived, the film had been going for half an hour.", "When we arrived, the film had been showing for half an hour.", "When we arrived, the film had been going on for half an hour.", "When we arrived, the film had started half an hour earlier.", "When we arrived, the film had begun half an hour earlier.", "When we arrived, the film had already started half an hour earlier.", "When we arrived, the film had started half an hour before.", "When we arrived, the film had started at seven o'clock.", "When we arrived, the film had begun at seven o'clock.", "When we arrived, the film had already started at seven o'clock.", "When we arrived, the film had been on for thirty minutes.", "When we arrived, the film had been running for thirty minutes.", "When we arrived, the film had started thirty minutes earlier."], x: "بدأ الفيلم قبل وصولنا ← past perfect (had started / had begun)، أو had been on for half an hour لبيان المدة." },
        { t: "mcq", q: "Which sentence is correct?", o: ["I have been knowing Rami for ten years.", "I have been reading this novel since a week.", "By the time he called, I had already left.", "She was owning a bakery when she was twenty."], a: 2, x: "know وown فعلا حالة فلا يأتيان continuous، وsince لا تأتي مع مدة (a week) بل مع نقطة بداية (since Monday)، أما المدة فتأخذ for (for a week). الجملة الصحيحة هي by the time + past simple مع had already left." }
      ]
    },
    {
      id: "g12u1-gr2",
      title: "Future continuous and future perfect",
      ar: "المستقبل المستمر والمستقبل التام",
      body: [
        { p: "عندما نتحدث عن المستقبل لا نكتفي بـ will؛ فنحن نختار أيضاً **زاوية النظر** إلى الحدث: هل سيكون **جارياً** في لحظة معينة؟ (future continuous) أم سيكون **قد اكتمل** قبل لحظة معينة؟ (future perfect simple) أم سيكون النشاط **قد استمر مدة** حتى تلك اللحظة؟ (future perfect continuous). وهذه الأزمنة تتكرر في أسئلة الاختيار من متعدد وأسئلة التحويل." },
        { tip: "تخيّل خطاً زمنياً وعلامة في المستقبل (مثلاً يوم الجمعة): **future continuous** = الحدث «في منتصفه» عند العلامة. **future perfect simple** = الحدث «انتهى» قبل العلامة. **future perfect continuous** = النشاط «استمر مدة» حتى العلامة." },
        { h: "1) التكوين" },
        { table: { head: ["الزمن", "الإثبات", "النفي", "السؤال"], rows: [
          ["Future continuous", "will be + V-ing", "will not (won't) be + V-ing", "Will + فاعل + be + V-ing?"],
          ["Future perfect simple", "will have + V3", "will not (won't) have + V3", "Will + فاعل + have + V3?"],
          ["Future perfect continuous", "will have been + V-ing", "will not (won't) have been + V-ing", "Will + فاعل + have been + V-ing?"]
        ] } },
        { ex: [
          ["This time next week, I ==will be sitting== my first mock exam.", "في مثل هذا الوقت من الأسبوع القادم سأكون منشغلاً بأداء أول امتحان تجريبي لي."],
          ["She ==won't be using== her laptop tonight, so you can borrow it.", "لن تستخدم حاسوبها المحمول الليلة، فيمكنك استعارته."],
          ["==Will== the builders ==have finished== the roof by Friday?", "هل سيكون البنّاؤون قد أنهوا السقف بحلول يوم الجمعة؟"],
          ["How long ==will== you ==have been working== here by next June?", "كم ستكون مدة عملك هنا بحلول حزيران القادم؟"]
        ] },

        { h: "2) Future continuous: أربعة استخدامات" },
        { table: { head: ["الاستخدام", "مثال", "ملاحظة"], rows: [
          ["حدث سيكون **جارياً** في لحظة محددة في المستقبل", "At nine tomorrow, I'll be sitting in the exam hall.", "this time next week / at 9 tomorrow / in July"],
          ["حدث مرتّب أو متوقع بحكم الروتين، وليس قراراً لحظياً", "I'll be seeing the headteacher on Monday, so I'll mention it.", "نتحدث عن موعد قائم لا عن قرار جديد"],
          ["سؤال **مهذّب** عن خطط الآخرين", "Will you be using the car this evening?", "أخفّ وقعاً من Will you lend me the car? لأنه لا يطلب شيئاً صراحةً"],
          ["توقّع ما يجري الآن", "Don't call Tariq now. He'll be having dinner.", "أظنه يتناول العشاء الآن"]
        ] } },
        { p: "قارن بين **will** البسيطة (قرار أو وعد لحظي) و**will be + V-ing** (حدث جارٍ أو مرتّب):" },
        { ex: [
          ["The phone is ringing. – I'll ==get== it.", "الهاتف يرنّ. – سأردّ أنا. (قرار لحظي)"],
          ["I ==will be phoning== clients all evening, so I can't join you.", "سأكون منشغلاً بالاتصال بالعملاء طوال المساء، فلن أستطيع الانضمام إليكم. (حدث جارٍ)"]
        ] },

        { h: "3) Future perfect simple: اكتمال قبل نقطة في المستقبل" },
        { p: "نستخدم **will have + V3** لحدث **سيكتمل قبل** وقت معين في المستقبل. وتأتي معه كلمات مثل **by** + وقت، و**by then**، و**by the time** + present simple، و**before**، و**in two years' time**." },
        { ex: [
          ["By Friday, the builders ==will have finished== the roof.", "بحلول يوم الجمعة سيكون البنّاؤون قد أنهوا السقف."],
          ["By the time you get home, I ==will have cooked== dinner.", "حين تصل إلى البيت سأكون قد أعددت العشاء."],
          ["I'm afraid I ==won't have finished== the essay by tomorrow.", "أخشى ألا أكون قد أنهيت المقال بحلول الغد."],
          ["In ten years' time, many villages ==will have changed== beyond recognition.", "بعد عشر سنوات ستكون قرى كثيرة قد تغيّرت تغيّراً كبيراً."],
          ["Don't worry. By then, she ==will have forgotten== all about it.", "لا تقلق. بحلول ذلك الوقت ستكون قد نسيت الأمر كله."]
        ] },

        { h: "4) Future perfect continuous: المدة حتى نقطة في المستقبل" },
        { p: "نستخدم **will have been + V-ing** عندما نريد التركيز على **مدة** النشاط حتى نقطة مستقبلية، وغالباً مع **for** + مدة و**by / by the time**. قارن: الـ simple يركّز على النتيجة أو العدد، والـ continuous يركّز على المدة." },
        { ex: [
          ["By June, I ==will have been teaching== here for twenty years.", "بحلول حزيران سأكون قد درّست هنا عشرين عاماً. (مدة)"],
          ["By the time she retires, she ==will have taught== over three thousand students.", "حين تتقاعد ستكون قد درّست أكثر من ثلاثة آلاف طالب. (عدد)"],
          ["By the time the plane lands, the passengers ==will have been travelling== for ten hours.", "حين تهبط الطائرة سيكون الركاب قد سافروا عشر ساعات. (مدة)"],
          ["Next month, Omar ==will have been learning== German for exactly two years.", "الشهر القادم سيكون عمر قد تعلّم الألمانية سنتين بالضبط."],
          ["By next June, we ==will have known== each other for ten years.", "بحلول حزيران القادم نكون قد عرفنا بعضنا عشر سنوات. (know فعل حالة ← simple)"]
        ] },

        { h: "5) فخاخ الامتحان" },
        { p: "**الفخ الأول: لا will بعد أدوات الزمن.** بعد when / as soon as / by the time / before / after / until / once نستخدم **present simple** (أو present perfect) للتعبير عن المستقبل، ولا نضع will." },
        { ex: [
          ["By the time she ==arrives==, we will have left.", "حين تصل نكون قد غادرنا. (✗ By the time she will arrive)"],
          ["I'll call you as soon as I ==have finished==.", "سأتصل بك حالما أنتهي. (✗ as soon as I will finish)"]
        ] },
        { p: "**الفخ الثاني: by مقابل until.** **by** تعني «في موعد أقصاه»، أي أن الحدث ينتهي قبل ذلك الوقت أو عنده (وتأتي معها غالباً future perfect، وقد تأتي future simple أيضاً: I'll finish it by six). **until** تعني «حتى» ويستمر الحدث إلى ذلك الوقت (future simple أو continuous)." },
        { table: { head: ["وجه المقارنة", "by (موعد نهائي)", "until (استمرار حتى)"], rows: [
          ["المعنى", "الحدث ينتهي قبل ذلك الوقت أو عنده", "الحدث يستمر إلى ذلك الوقت ثم يتوقف"],
          ["الزمن المناسب", "غالباً future perfect (أو future simple)", "future simple / future continuous (لا future perfect)"],
          ["مثال", "I will have finished the report by six.", "I will be working on the report until six."]
        ] } },
        { p: "**الفخ الثالث: أفعال الحالة.** لا نقول will have been knowing ولا will have been owning؛ بل **will have known** و**will have owned**." },
        { warn: "✗ I will be getting it. (جواباً على رنين الهاتف) ← ✓ I'll ==get== it. القرار اللحظي يأخذ will البسيطة، أما will be + V-ing فللحدث الجاري أو المرتّب." },

        { h: "6) استخدام إضافي: افتراض عمّا حدث بالفعل" },
        { p: "نستخدم **will have + V3** أيضاً لافتراض أن شيئاً **حدث** بالفعل (بمعنى «على الأرجح»)، وهو شائع في الأسلوب الرسمي والكتابة:" },
        { ex: [
          ["As you ==will have noticed==, the timetable has changed.", "كما لاحظتم على الأرجح، تغيّر الجدول."],
          ["It's nine o'clock, so the match ==will have started==.", "الساعة التاسعة، فلا بد أن المباراة قد بدأت."]
        ] }
      ],
      summary: [
        "Future continuous (will be + V-ing) ← حدث جارٍ في لحظة مستقبلية (this time next week)، أو سؤال مهذّب عن خطط الآخرين.",
        "Future perfect simple (will have + V3) ← حدث يكتمل قبل نقطة مستقبلية (by, by then, by the time, before).",
        "Future perfect continuous (will have been + V-ing) ← مدة النشاط حتى نقطة مستقبلية (for + مدة).",
        "بعد by the time / when / before / until نستخدم present simple لا will: By the time she arrives, we will have left.",
        "by = موعد نهائي (غالباً future perfect)، وuntil = استمرار حتى (continuous)؛ وأفعال الحالة تبقى simple: will have known."
      ],
      qs: [
        { t: "mcq", q: "This time next week, I ____ on a beach in Aqaba while you are still studying.", o: ["lie", "will have lain", "will be lying", "have lain"], a: 2, x: "This time next week + while you are still studying ← الحدث سيكون **جارياً** في ذلك الوقت ← future continuous: will be lying." },
        { t: "gap", q: "Don't call the players before nine tomorrow morning. They ____ (still / sleep).", a: ["will still be sleeping", "'ll still be sleeping"], x: "still تدل على أن النوم سيكون جارياً في ذلك الوقت ← future continuous: will still be sleeping." },
        { t: "mcq", q: "Which question asks about someone's plans in the most polite, indirect way?", o: ["Will you lend me your car tonight?", "Give me your car tonight.", "Can I have your car tonight?", "Will you be using your car tonight?"], a: 3, x: "Will you be using …? تسأل عن خطة الشخص دون أن تطلب شيئاً صراحةً، أما الخيارات الأخرى فهي طلبات أو أوامر مباشرة." },
        { t: "mcq", q: "Please don't phone before ten. I will be studying ____ ten o'clock.", o: ["by", "until", "since", "ago"], a: 1, x: "until تعني أن الدراسة ستستمر حتى العاشرة. أما by فتدل على موعد نهائي لحدث ينتهي، وsince وago لا تناسبان المستقبل." },
        { t: "order", a: "Will you be using the printer this afternoon?", x: "سؤال مهذّب بـ future continuous: Will + فاعل + be + V-ing؟" },
        { t: "gap", q: "I'll text you as soon as the plane ____ (land).", a: ["lands", "has landed"], x: "بعد as soon as نستخدم present simple (أو present perfect) للمستقبل، ولا نضع will." },
        { t: "mcq", q: "By the time the guests ____, we will have finished decorating the house.", o: ["arrive", "will arrive", "will have arrived", "would arrive"], a: 0, x: "بعد by the time نستخدم present simple للمستقبل (arrive)، وتأتي will have finished في الجملة الرئيسية." },
        { t: "mcq", q: "Which sentence describes an action that will be IN PROGRESS at nine o'clock tomorrow?", o: ["By nine, Hana will have finished her interview.", "Hana will finish her interview after nine.", "Hana has finished her interview at nine.", "At nine, Hana will be having her interview."], a: 3, x: "will be having = الحدث جارٍ عند التاسعة (future continuous). أما will have finished فتعني أنه انتهى قبل التاسعة." },
        { t: "gap", q: "By June, Layla ____ (teach) at this school for twenty years.", a: ["will have been teaching", "'ll have been teaching", "will have taught", "'ll have taught"], x: "مدة (for twenty years) حتى نقطة في المستقبل (By June) ← will have been teaching، ويُقبل will have taught أيضاً." },
        { t: "mcq", q: "Which sentence emphasises the DURATION of an activity up to a future point?", o: ["By June, I will have finished the course.", "In June, I will study English.", "By June, I will have been studying English for three years.", "In June, I am studying English."], a: 2, x: "will have been studying + for three years تركّز على مدة النشاط حتى نقطة مستقبلية، وهذا هو future perfect continuous." },
        { t: "mcq", q: "By the time you read this message, I ____ the city.", o: ["will leave", "am leaving", "will have left", "had left"], a: 2, x: "by the time + present simple ← الحدث يكتمل قبل ذلك الوقت ← future perfect: will have left." },
        { t: "gap", q: "By the time you come back on Monday, I ____ (not / finish) the report, because it is enormous.", a: ["won't have finished", "will not have finished"], x: "نفي future perfect: won't have + V3، لأن الحدث لن يكتمل قبل نقطة محددة (By the time you come back)." },
        { t: "err", q: "I must finish this essay until Friday.", w: "until", c: "by", x: "الموعد النهائي لإنهاء الفعل يأخذ by (حتى لا يتجاوز يوم الجمعة)، أما until فلحدث يستمر إلى ذلك الوقت." },
        { t: "tr", q: "The film starts at eight and ends at ten. I will arrive at half past ten.", p: "Join the sentences using the future perfect. Start: By the time I arrive, …", a: ["By the time I arrive, the film will have ended.", "By the time I arrive, the film will have come to an end.", "By the time I arrive, the film will have finished.", "By the time I arrive, the film will already have ended.", "By the time I arrive, the film will already have finished.", "By the time I arrive, the film will have already ended.", "By the time I arrive, the film will have already finished.", "By the time I arrive, the film will have ended already.", "By the time I arrive, the film will have finished already.", "By the time I arrive, the film will already have come to an end.", "By the time I arrive, the film will have already come to an end."], x: "by the time + present simple ← الجملة الرئيسية future perfect للحدث الذي ينتهي قبل ذلك: will have ended." },
        { t: "gap", q: "Don't worry about the noise. The workers ____ (already / finish) by the time you get back.", a: ["will already have finished", "will have already finished", "will have finished already", "'ll already have finished", "'ll have already finished", "'ll have finished already"], x: "حدث سيكتمل قبل عودتك (by the time you get back) ← future perfect: will already have finished." },
        { t: "mcq", q: "Next month, Maher and I ____ each other for ten years.", o: ["will have known", "will have been knowing", "will be knowing", "are knowing"], a: 0, x: "know فعل حالة لا يأتي بصيغة continuous، لذلك نستخدم future perfect simple: will have known." },
        { t: "err", q: "Tomorrow, by the time Mum gets home, I would have cleaned the kitchen.", w: "would", c: "will (I will have cleaned)", x: "المستقبل الحقيقي بعد by the time + present simple يأخذ will have + V3 في الجملة الرئيسية، وليس would have." },
        { t: "tr", q: "I started cooking at noon. At five o'clock I will still be cooking.", p: "Rewrite starting with: By five o'clock, …", a: ["By five o'clock, I will have been cooking for five hours.", "By five o'clock, I'll have been cooking for five hours.", "By five o'clock I will have been cooking for five hours.", "By five o'clock, I will have been cooking for 5 hours.", "By five o'clock, I will have been cooking since noon.", "By five o'clock, I will have been cooking since twelve o'clock.", "By five o'clock, I will have been cooking since midday.", "By five o'clock, I'll have been cooking since noon.", "By five o'clock, I will have cooked for five hours.", "By five o'clock, I'll have cooked for five hours."], x: "من الظهر إلى الخامسة = خمس ساعات، والتركيز على المدة حتى نقطة مستقبلية ← will have been cooking for five hours، ويُقبل will have cooked for five hours أيضاً." }
      ]
    },
    {
      id: "g12u1-gr3",
      title: "Time expressions and exam traps",
      ar: "تعابير الزمن وفخاخ الامتحان",
      body: [
        { p: "معظم أخطاء الأزمنة في الامتحان سببها **كلمة دالة** لم ننتبه إليها. في هذا الدرس نجمع تعابير الزمن التي تتكرر في امتحان الصف الثاني عشر (for, since, ago, already, yet, still…)، وفخاخ أفعال الحالة مع الأزمنة التامة، وترتيب الأحداث في السرد، ثم قوالب التحويل (key-word transformations) التي يحبها واضعو الأسئلة." },
        { h: "1) for / since / ago / how long" },
        { table: { head: ["الكلمة", "القاعدة", "مثال"], rows: [
          ["for", "+ مدة (two years, a long time, ages). مع present perfect لمدة مستمرة حتى الآن، ومع past simple لمدة انتهت", "I've lived here for ten years. / I lived in Karak for ten years (then I moved)."],
          ["since", "+ نقطة بداية (2019, Monday, I was ten, last week). تأتي مع present perfect (ومع past perfect في الماضي)", "I've known him since 2019."],
          ["ago", "+ مدة قبل الآن. تأتي مع past simple فقط", "I met him five years ago."],
          ["How long …?", "present perfect (simple أو continuous) لمدة مستمرة حتى الآن. أما How long ago …? فمع past simple", "How long have you been learning English? / How long ago did you move?"],
          ["during / while", "during + اسم، وwhile + جملة فيها فاعل وفعل", "during the lesson / while the teacher was talking"],
          ["It's … since …", "It's + مدة + since + past simple = present perfect منفي + for", "It's three years since I last saw her. = I haven't seen her for three years."],
          ["It's the first time …", "present perfect (وفي الماضي: It was the first time + past perfect)", "It's the first time I have flown. / It was the first time he had flown."]
        ] } },
        { warn: "✗ I've known him since five years. ← ✓ I've known him ==for== five years (أو ==since== 2019).  ✗ I've met him two years ago. ← ✓ I ==met== him two years ago (ago لا تأتي مع present perfect).  ✗ When have you arrived? ← ✓ When ==did== you arrive? (أسئلة When تأخذ past simple)." },

        { h: "2) already / yet / still / just / lately / so far" },
        { table: { head: ["الكلمة", "المعنى ومكانها", "مثال"], rows: [
          ["already", "حدث وقع بالفعل (وربما أبكر من المتوقع). تأتي بعد have / has، أو في آخر الجملة للتعبير عن الدهشة", "They have already left. / Have you finished already?"],
          ["yet", "في النفي والسؤال بمعنى «حتى الآن»، وتأتي غالباً في آخر الجملة", "I haven't finished yet. / Has the match started yet?"],
          ["still", "ما زال (الحالة مستمرة). وفي النفي تسبق have / has للتعبير عن الدهشة أو الانزعاج", "She still lives in Irbid. / He still hasn't replied."],
          ["just", "قبل لحظات، مع present perfect (أما just now فمع past simple)", "I've just seen her. / I saw her just now."],
          ["lately / recently", "في الفترة الأخيرة، مع present perfect (وغالباً continuous)", "I've been sleeping badly lately."],
          ["so far / up to now / by now", "حتى هذه اللحظة، مع present perfect", "So far, we have scored two goals."],
          ["have yet to + V", "تعبير رسمي بمعنى «لم … بعد»", "We have yet to receive a reply."]
        ] } },
        { p: "الفرق بين **yet** و**still** في النفي: She hasn't replied **yet** = لم تردّ حتى الآن (وصف محايد). She **still** hasn't replied = ما زالت لم تردّ (دهشة أو انزعاج لأن الانتظار طال)." },
        { warn: "✗ I haven't finished my homework already. ← ✓ I haven't finished my homework ==yet==.  ✗ I've just finished it a minute ago. ← ✓ I've just finished it. / I finished it a minute ago. (ago تأتي مع past simple فقط)." },

        { h: "3) فترة لم تنتهِ مقابل فترة انتهت" },
        { p: "مع today / this morning / this week / this year نستخدم **present perfect** إذا كانت الفترة لا تزال مستمرة، و**past simple** إذا كانت قد انتهت:" },
        { ex: [
          ["I ==have seen== three patients this morning.", "رأيت ثلاثة مرضى هذا الصباح. (ما زلنا في الصباح)"],
          ["I ==saw== three patients this morning.", "رأيت ثلاثة مرضى هذا الصباح. (نحن الآن بعد الظهر؛ الفترة انتهت)"]
        ] },

        { h: "4) أفعال الحالة مع الأزمنة التامة" },
        { p: "أفعال الحالة (know, own, belong, be, have بمعنى «يملك»، love, need, understand, believe) تأخذ **present perfect simple** مع for / since، ولا تأخذ perfect continuous:" },
        { ex: [
          ["I ==have known== Maha since primary school.", "أعرف مها منذ المرحلة الابتدائية."],
          ["They ==have been== friends for years.", "هما صديقان منذ سنوات."],
          ["He ==has had== this watch since he was fifteen.", "يملك هذه الساعة منذ كان في الخامسة عشرة."]
        ] },
        { p: "لكن حين يكون للفعل **معنى نشاط** نستطيع استخدام continuous:" },
        { ex: [
          ["She ==has been having== trouble sleeping lately.", "تعاني من صعوبة في النوم مؤخراً. (have = تعاني)"],
          ["I ==have been thinking== about your offer.", "أفكّر في عرضك. (think = عملية تفكير)"]
        ] },

        { h: "5) ترتيب الأحداث في السرد (sequencing)" },
        { p: "في القصة أو التدوينة نروي الأحداث الرئيسية بـ **past simple** بالترتيب، ونصف الخلفية بـ **past continuous**، ونرجع بالزمن إلى الوراء بـ **past perfect** (simple أو continuous) عند الحاجة فقط." },
        { table: { head: ["الإشارة", "الزمن", "مثال"], rows: [
          ["after / before / when / as soon as", "الحدث الأسبق past perfect (ويجوز past simple إذا كان الترتيب واضحاً)", "After she had spoken to the manager, she left."],
          ["by the time (في الماضي)", "الجملة الرئيسية past perfect", "By the time we arrived, the show had ended."],
          ["hardly … when / no sooner … than", "past perfect بعد الظرف مع قلب الفعل المساعد والفاعل", "Hardly had we sat down when the lights went out. / No sooner had he left than it began to rain."],
          ["It was the first time …", "past perfect", "It was the first time she had spoken in public."],
          ["not … until", "past perfect للحدث الأسبق", "He didn't realise he had lost his keys until he reached the door."]
        ] } },
        { ex: [
          ["The bus ==was crossing== the desert when the engine suddenly stopped.", "كانت الحافلة تعبر الصحراء عندما توقف المحرك فجأة. (خلفية + حدث قصير)"],
          ["The driver ==had been warning== us about the heat all day.", "كان السائق يحذّرنا من الحر طوال اليوم. (نشاط أسبق)"],
          ["We ==had run== out of water, so we decided to wait for help.", "كان الماء قد نفد منا، فقررنا انتظار المساعدة. (حدث أسبق ثم حدث رئيسي)"]
        ] },
        { warn: "لا تضع had في كل فعل لمجرد أن القصة في الماضي: ✗ When Lina had arrived, she had sat down and had opened her laptop. ← ✓ When Lina ==arrived==, she ==sat== down and ==opened== her laptop. نستخدم past perfect فقط للحدث الأسبق الذي نعود إليه." },

        { h: "6) قوالب التحويل (key-word transformations)" },
        { p: "في الامتحان يُطلب منك اختيار الجملة التي تعني ما تعنيه الجملة الأصلية. احفظ هذه القوالب الزمنية:" },
        { table: { head: ["الجملة الأصلية", "الجملة المحوّلة", "الفكرة"], rows: [
          ["I last saw him in 2020.", "I haven't seen him since 2020.", "last + past simple ← haven't + V3 + since"],
          ["It's five years since we met.", "We haven't met for five years.", "It's … since ← haven't + V3 + for"],
          ["This is the first time I have ridden a camel.", "I have never ridden a camel before.", "first time ← never … before"],
          ["She started working here in 2015.", "She has been working here since 2015.", "started … in ← has been V-ing since"],
          ["The meeting began at nine; it is now eleven.", "The meeting has been going on for two hours.", "بدأ وما زال مستمراً ← has been V-ing for"]
        ] } },
        { p: "وهذه عبارات ثابتة تظهر كثيراً في أسئلة التحويل (وهي من مفردات الوحدة أيضاً):" },
        { table: { head: ["العبارة", "المعنى أو القالب", "مثال بالتحويل"], rows: [
          ["no matter where / what / who / how", "مثل wherever / whatever / whoever / however", "No matter where you go, you will find friendly people. = Wherever you go, you will find friendly people."],
          ["have no choice but to + V", "مثل be forced to / have to", "I had no choice but to cancel the trip. = I was forced to cancel the trip."],
          ["much to my delight (surprise / regret)", "مثل I was delighted (surprised / sorry) that …", "Much to my delight, she accepted. = I was delighted when she accepted."],
          ["might as well + V", "لا يوجد سبب مقنع لعدم فعل ذلك", "There is no bus, so we might as well walk."],
          ["come as a shock (to sb)", "مثل sb was shocked by …", "The result came as a shock to us. = We were shocked by the result."],
          ["keep an eye on", "مثل watch carefully / look after", "Keep an eye on the soup. = Watch the soup carefully."],
          ["not have a clue", "مثل have no idea", "I don't have a clue where he lives. = I have no idea where he lives."]
        ] } },
        { tip: "في سؤال التحويل حافظ على المعنى نفسه، وانتبه إلى ما بعد كل قالب (since + نقطة بداية، for + مدة، never … before)، ولا تغيّر الكلمة المعطاة. بعد might as well نستخدم الفعل بدون to، وبعد no choice but نستخدم to + فعل." }
      ],
      summary: [
        "for + مدة، since + نقطة بداية، ago + past simple فقط؛ وأسئلة When …? تأخذ past simple.",
        "already في الإثبات، yet في النفي والسؤال (آخر الجملة)، still للاستمرار أو الدهشة، وjust = قبل لحظات.",
        "أفعال الحالة تأخذ present perfect simple مع for / since: have known (✗ have been knowing).",
        "في السرد: past simple للحدث الرئيسي، past continuous للخلفية، past perfect للحدث الأسبق (by the time، hardly … when، no sooner … than).",
        "قوالب التحويل: last … in 2020 = haven't … since 2020؛ last … two years ago = haven't … for two years؛ It's … since = haven't … for؛ first time = never … before؛ no matter where = wherever؛ no choice but to = be forced to."
      ],
      qs: [
        { t: "mcq", q: "I've lived in Irbid ____ 2018.", o: ["for", "ago", "since", "during"], a: 2, x: "2018 نقطة بداية في الزمن، فنستخدم since مع present perfect. أما for فمع المدة (for six years)." },
        { t: "mcq", q: "We moved to Madaba five years ____.", o: ["since", "before", "for", "ago"], a: 3, x: "ago تأتي بعد مدة وتدل على وقت قبل الآن، ومع past simple فقط (moved)." },
        { t: "mcq", q: "The match hasn't started ____, so we have time to find our seats.", o: ["yet", "already", "still", "ago"], a: 0, x: "yet تأتي في آخر الجملة المنفية بمعنى «حتى الآن». أما already فللإثبات، وstill لا تأتي في آخر جملة منفية." },
        { t: "gap", q: "It's two years since I last ____ (see) my cousins.", a: ["saw"], x: "بعد It's + مدة + since I last نستخدم past simple: It's two years since I last saw them." },
        { t: "mcq", q: "She ____ hasn't replied to my email, and it is starting to annoy me.", o: ["yet", "still", "already", "ago"], a: 1, x: "still قبل hasn't تعبّر عن الدهشة أو الانزعاج من طول الانتظار. أما yet فتأتي في آخر الجملة." },
        { t: "mcq", q: "He ____ this old watch since he was fifteen.", o: ["is having", "has been having", "had", "has had"], a: 3, x: "have بمعنى «يملك» فعل حالة، ومع since نستخدم present perfect simple: has had." },
        { t: "gap", q: "I last played football five years ago. = I haven't played football ____ five years.", a: ["for", "in"], x: "الجملة المنفية مع present perfect وبعدها مدة تأخذ for (ويُقبل in في الكلام العفوي، خصوصاً الأمريكي: I haven't played football in five years)." },
        { t: "err", q: "I've known him since five years.", w: "since", c: "for (I've known him for five years)", x: "five years مدة وليست نقطة بداية، فتأخذ for. ولو أردنا since لقلنا since 2019 مثلاً." },
        { t: "mcq", q: "By the time the rescue team reached the cave, the hikers ____ for two days.", o: ["waited", "were waiting", "had been waiting", "have been waiting"], a: 2, x: "by the time + past simple مع مدة (for two days) ← past perfect continuous: had been waiting." },
        { t: "gap", q: "When the alarm rang at six, Jana ____ (study) for nine hours without a break.", a: ["had been studying", "'d been studying", "had studied", "'d studied"], x: "مدة (for nine hours) قبل لحظة ماضية (the alarm rang) ← had been studying، ويُقبل had studied." },
        { t: "tr", q: "I last visited the dentist in March.", p: "Rewrite starting with: I haven't …", a: ["I haven't visited the dentist since March.", "I have not visited the dentist since March.", "I haven't been to the dentist since March.", "I have not been to the dentist since March.", "I haven't seen the dentist since March.", "I have not seen the dentist since March.", "I haven't gone to the dentist since March.", "I have not gone to the dentist since March.", "I haven't seen a dentist since March.", "I have not seen a dentist since March."], x: "last … in March ← haven't + V3 + since March." },
        { t: "mcq", q: "Hardly ____ sat down when the lights went out.", o: ["had we", "we had", "we have", "have we"], a: 0, x: "بعد Hardly نقلب الفعل المساعد والفاعل: Hardly had we sat down when …" },
        { t: "order", a: "No sooner had they arrived than it began to rain.", x: "No sooner + had + الفاعل + V3 + than + past simple." },
        { t: "gap", q: "We have yet ____ (hear) from the university.", a: ["to hear"], x: "التعبير الرسمي have yet to + V بمعنى «لم … بعد»: We have yet to hear." },
        { t: "err", q: "Last year, it was the first time she has spoken in public.", w: "has", c: "had (had spoken)", x: "It was the first time + past perfect، لأننا نتحدث عن الماضي: It was the first time she had spoken in public." },
        { t: "mcq", q: "'When ____ you first visit Petra?' 'Two years ago.'", o: ["have", "did", "do", "had"], a: 1, x: "أسئلة When عن وقت منتهٍ تأخذ past simple (did you visit)، وجواب Two years ago يؤكد ذلك." },
        { t: "tr", q: "It is the first time I have tried Japanese food.", p: "Rewrite starting with: I have never …", a: ["I have never tried Japanese food before.", "I've never tried Japanese food before.", "I have never tried Japanese food.", "I've never tried Japanese food."], x: "It is the first time … ← I have never + V3 … before." },
        { t: "mcq", q: "Which sentence means the same as 'No matter where you hide, I will find you'?", o: ["Nowhere you hide, I will find you.", "You hide where, I will find you.", "Wherever you hide, I will find you.", "If you hide, I won't find you."], a: 2, x: "no matter where = wherever: أينما اختبأت سأجدك." },
        { t: "mcq", q: "Which sentence means the same as 'I had no choice but to cancel the trip'?", o: ["I chose to cancel the trip.", "I could not cancel the trip.", "I was happy to cancel the trip.", "I was forced to cancel the trip."], a: 3, x: "have no choice but to + V = be forced to / have to: لم يكن أمامي خيار سوى إلغاء الرحلة." },
        { t: "mcq", q: "The last bus has already left, so we ____ take a taxi.", o: ["might as well to", "might as well", "as well might", "might well as"], a: 1, x: "التعبير might as well يعني «لا يوجد سبب مقنع لعدم فعل ذلك»، ويأتي بعده الفعل بدون to: we might as well take a taxi." },
        { t: "tr", q: "Everyone was shocked by the news.", p: "Rewrite starting with: The news came as …", a: ["The news came as a shock to everyone.", "The news came as a complete shock to everyone.", "The news came as a total shock to everyone.", "The news came as a nasty shock to everyone.", "The news came as a great shock to everyone.", "The news came as a big shock to everyone.", "The news came as a real shock to everyone.", "The news came as quite a shock to everyone.", "The news came as a huge shock to everyone.", "The news came as a terrible shock to everyone."], x: "sb was shocked by X ← X came as a shock to sb: The news came as a shock to everyone." }
      ]
    },
  ],
  reading: {
    title: "The Words We See Through",
    text: [
      "Imagine describing a sunset to someone who speaks a different language. You choose your words carefully, but do those words also decide what you notice? For nearly a century, scholars have argued about whether the language we speak shapes the way we see the world. The idea is usually linked to the linguists Edward Sapir and Benjamin Lee Whorf, and it remains one of the most tantalising puzzles in the study of the mind.",
      "The boldest version of the theory claims that language works like a cage: if your language has no word for something, you cannot grasp the idea at all. This is a seductive claim, but few researchers accept it today. A language may lack a neat word for 'privacy', yet its speakers can still long to be alone. Translators, too, explain unfamiliar ideas every day, which suggests that we can usually conceive of things for which we have no single word.",
      "A more modest version is far easier to defend: language may not limit thought, but it may gently nudge our attention. Some experiments, for instance, suggest that speakers of languages with separate words for light and dark blue may tell those shades apart a fraction of a second faster than speakers whose language uses one word for both. The effect is tiny, and some studies report that it fades when people are kept busy with another spoken task.",
      "Other examples are more intriguing still. In some Aboriginal Australian languages, speakers describe positions using compass points instead of 'left' and 'right', and they are reported to keep track of direction with remarkable accuracy. Grammar may play a part too. Arabic, like Spanish or German, gives every noun a gender, and researchers have wondered whether this affects how speakers picture objects, such as whether a bridge seems 'strong' or 'elegant'. The evidence here is mixed, so it deserves a cautious reading.",
      "So what should we conclude? Perhaps that language is less a prison than a pair of well-worn spectacles. It does not decide what exists, but it can make some things easier to notice than others. Anyone who has learned a second language will probably recognise the strange pleasure of seeing familiar things from a new angle. That is hardly proof, of course. Yet I find it a more convincing summary than either extreme, both of which rely on dramatic claims and too little careful evidence.",
      "Whatever the final answer, the question is worth asking. It invites us to reflect on how much of our own outlook we simply assume to be natural, and it makes us a little more curious about people who see the world through different words."
    ],
    skill: "Understanding how word choice reveals attitude",
    skillAr: "فهم كيف تكشف الكلمات المختارة موقف الكاتب",
    skillTip: "انتبه إلى الكلمات التي تحمل شحنة إيجابية أو سلبية (connotation) مثل seductive وtantalising وdramatic وwell-worn، فالكاتب يختارها ليوحي بموقفه دون أن يصرّح به. جرّب أن تستبدل الكلمة بمرادف محايد وسترى كيف يتغيّر الانطباع. وانتبه كذلك إلى عبارات التحفّظ (may, some studies report, hardly proof) فهي تكشف مقدار ثقة الكاتب بما يقوله.",
    gloss: [
      ["tantalising", "مثير للفضول ومحيّر"], ["grasp", "يستوعب / يدرك"], ["seductive", "مُغرٍ وجذّاب (وقد يكون مضلِّلاً)"], ["conceive of", "يتصوّر"],
      ["modest", "معتدل / غير مبالغ فيه"], ["nudge", "يدفع برفق"], ["a fraction of a second", "جزء من الثانية"], ["fades", "يتلاشى"],
      ["intriguing", "مثير للاهتمام"], ["remarkable", "لافت / مدهش"], ["mixed", "متباين / غير حاسم"], ["cautious", "حذر"],
      ["spectacles", "نظارات"], ["convincing", "مُقنع"], ["dramatic", "مبالغ فيه / مثير"], ["outlook", "نظرة إلى الأمور / رؤية للعالم"]
    ],
    gist: [
      "يتساءل الكاتب: هل تشكّل اللغة التي نتحدثها طريقة رؤيتنا للعالم؟ سؤال قديم ومثير.",
      "النسخة القوية من النظرية تعدّ اللغة قفصاً، لكن قلة من الباحثين يقبلونها اليوم.",
      "النسخة المعتدلة أسهل في الدفاع عنها: قد تدفع اللغة انتباهنا برفق دون أن تقيّد تفكيرنا.",
      "أمثلة أخرى مثيرة كجهات البوصلة وجنس الأسماء، لكن الأدلة عليها متباينة.",
      "يرى الكاتب أن اللغة أشبه بنظارات قديمة منها بسجن، ويرفض الموقفين المتطرفين.",
      "مهما كان الجواب، يدعونا السؤال إلى التأمل في نظرتنا إلى العالم التي نعدّها طبيعية."
    ],
    tr: [
      "تخيّل أنك تصف غروب الشمس لشخص يتحدث لغة مختلفة. أنت تختار كلماتك بعناية، لكن هل تقرّر هذه الكلمات أيضاً ما تلاحظه؟ فمنذ ما يقارب قرناً من الزمن يتجادل الباحثون حول ما إذا كانت اللغة التي نتحدث بها تشكّل الطريقة التي نرى بها العالم. وتُنسب هذه الفكرة عادةً إلى عالِمَي اللغة إدوارد سابير وبنيامين لي وورف، ولا تزال من أكثر الألغاز إثارةً للفضول في دراسة العقل.",
      "تزعم النسخة الأجرأ من النظرية أن اللغة تعمل كالقفص: فإذا لم تكن في لغتك كلمة لشيء ما، فلن تستطيع استيعاب الفكرة على الإطلاق. وهذا زعم مُغرٍ، لكن قلة من الباحثين يقبلونه اليوم. فقد تفتقر لغةٌ ما إلى كلمة جاهزة لمفهوم «الخصوصية»، ومع ذلك يستطيع المتحدثون بها أن يشتاقوا إلى العزلة. كما يشرح المترجمون أفكاراً غير مألوفة كل يوم، وهذا يوحي بأننا نستطيع في الغالب أن نتصوّر أشياء ليس لدينا كلمة واحدة تعبّر عنها.",
      "أما النسخة الأكثر اعتدالاً فيسهل الدفاع عنها أكثر بكثير: فقد لا تحدّ اللغة من التفكير، لكنها قد تدفع انتباهنا برفق. فبعض التجارب، على سبيل المثال، توحي بأن المتحدثين بلغات فيها كلمتان منفصلتان للأزرق الفاتح والأزرق الداكن قد يميّزون بين هاتين الدرجتين أسرع بجزء من الثانية من المتحدثين بلغة تستخدم كلمة واحدة للاثنتين. والأثر ضئيل، وتفيد بعض الدراسات بأنه يتلاشى عندما ينشغل الناس بمهمة كلامية أخرى.",
      "وثمة أمثلة أخرى أكثر إثارة للاهتمام. ففي بعض لغات السكان الأصليين في أستراليا، يصف المتحدثون المواضع باستخدام جهات البوصلة بدلاً من «يسار» و«يمين»، ويقال إنهم يتتبعون الاتجاهات بدقة لافتة. وقد تؤدي القواعد النحوية دوراً أيضاً. فالعربية، مثل الإسبانية أو الألمانية، تُسند إلى كل اسم جنساً، وقد تساءل الباحثون عمّا إذا كان ذلك يؤثر في الطريقة التي يتخيل بها المتحدثون الأشياء، كأن يبدو الجسر «قوياً» أو «أنيقاً». والأدلة هنا متباينة، لذا تستحق قراءة حذرة.",
      "إذن، ماذا ينبغي أن نستنتج؟ ربما أن اللغة أقرب إلى نظارات قديمة كثيرة الاستعمال منها إلى سجن. فهي لا تقرّر ما هو موجود، لكنها قد تجعل بعض الأشياء أسهل ملاحظةً من غيرها. وكل من تعلّم لغة ثانية سيتعرّف على الأرجح إلى تلك المتعة الغريبة في رؤية الأشياء المألوفة من زاوية جديدة. وهذا بالكاد يُعدّ دليلاً بالطبع. ومع ذلك أراه خلاصة أكثر إقناعاً من أيٍّ من الموقفين المتطرفين، فكلاهما يعتمد على ادعاءات مبالغ فيها وعلى أدلة دقيقة قليلة جداً.",
      "ومهما كان الجواب النهائي، فإن السؤال يستحق أن يُطرح. إنه يدعونا إلى التأمل في مقدار ما نفترض ببساطة أنه طبيعي في نظرتنا إلى الأمور، ويجعلنا أكثر فضولاً قليلاً تجاه أناس يرون العالم من خلال كلمات مختلفة."
    ],
    qs: [
      { t: "mcq", q: "What is the main purpose of the article?", o: ["To show that the language we speak completely controls our thoughts.", "To examine how far language may influence the way we see the world, without claiming a final answer.", "To explain why Arabic is easier to translate than other languages.", "To describe how to learn a second language more quickly."], a: 1, x: "الفقرة الأولى تطرح السؤال، والفقرات التالية تعرض النسخة القوية والنسخة المعتدلة والأدلة المتباينة، وتنتهي بخلاصة حذرة دون جواب نهائي." },
      { t: "mcq", q: "Which idea in paragraph 2 is used to argue against the 'cage' version of the theory?", o: ["Translators often refuse to work with unfamiliar ideas.", "Most languages have too many words for 'privacy'.", "The theory was invented only recently.", "People can understand ideas even when their language has no single word for them."], a: 3, x: "الفقرة 2: يستطيع المتحدثون أن يشتاقوا إلى العزلة دون كلمة جاهزة للخصوصية، ويشرح المترجمون أفكاراً غير مألوفة، فاللغة ليست قفصاً." },
      { t: "mcq", q: "In paragraph 2, the writer calls the 'cage' claim 'seductive'. This word suggests that the writer thinks the claim is …", o: ["attractive, but not fully trustworthy.", "obviously silly and not worth discussing.", "proven beyond any doubt.", "too difficult for ordinary readers."], a: 0, x: "seductive تعني مُغرياً وجذّاباً، وجاءت بعدها عبارة but few researchers accept it، فالكاتب يراها فكرة جذابة لكنها غير موثوقة تماماً." },
      { t: "mcq", q: "What does 'it' refer to in 'some studies report that it fades when people are kept busy' (paragraph 3)?", o: ["the language", "another spoken task", "the effect", "a fraction of a second"], a: 2, x: "The effect is tiny, and some studies report that it fades … ← الضمير it يعود على the effect." },
      { t: "mcq", q: "Why does the writer use expressions such as 'may' and 'some studies report' in paragraph 3?", o: ["To show that the evidence is not certain.", "To prove that the experiments were badly designed.", "To explain how the experiments were carried out.", "To suggest that the results are completely wrong."], a: 0, x: "عبارات التحفّظ (hedging) مثل may وsome studies report تدل على أن الأدلة غير قاطعة، وليس على أن النتائج خاطئة." },
      { t: "mcq", q: "What is the writer's attitude to the two extreme positions in the debate (paragraph 5)?", o: ["Enthusiastic, because they are bold and original.", "Indifferent, because both are equally true.", "Unconvinced, because they rely on exaggeration.", "Amused, because they are old-fashioned."], a: 2, x: "both of which rely on dramatic claims and too little careful evidence ← الكاتب غير مقتنع بالموقفين المتطرفين لاعتمادهما على ادعاءات مبالغ فيها." },
      { t: "mcq", q: "In paragraph 5, the writer compares language to 'a pair of well-worn spectacles'. What does this suggest?", o: ["Language changes what exists in the world.", "Language can make some things easier to notice without deciding what exists.", "Language makes it impossible to see anything clearly.", "Language is useful only to people with poor eyesight."], a: 1, x: "النظارات تساعدنا على ملاحظة أشياء معينة بوضوح لكنها لا تخلقها، وهذا يعبّر عن الموقف المعتدل الذي يفضّله الكاتب." },
      { t: "tf", q: "The writer says that the difference in how quickly people tell shades of blue apart is large.", a: false, x: "الفقرة 3: The effect is tiny. فالأثر صغير جداً." },
      { t: "tf", q: "The writer believes the evidence about grammatical gender is clear and complete.", a: false, x: "الفقرة 4: The evidence here is mixed. أي أن الأدلة متباينة وتحتاج إلى قراءة حذرة." },
      { t: "find", q: "Find a word in paragraph 3 that means 'very small'.", a: ["tiny"], x: "tiny = صغير جداً (The effect is tiny)." },
      { t: "open", q: "Choose TWO words or phrases from the text that show the writer's attitude to the 'cage' theory. Explain what each one suggests.", m: "'Seductive' suggests that the idea is attractive but misleading. 'Few researchers accept it today' shows that the writer finds the theory unconvincing. ('Boldest' also hints that it goes further than the evidence allows.)", x: "اختر كلمات تحمل شحنة تقييمية (seductive, boldest) أو عبارات تدل على قلة التأييد (few researchers accept it)، ثم اشرح الانطباع الذي تتركه." }
    ]
  },
  writing: {
    type: "Blog post about the past",
    ar: "تدوينة عن الماضي (سرد شخصي)",
    about: "التدوينة (blog post) نص شخصي يُنشر على الإنترنت ويروي فيه الكاتب تجربة أو ذكرى بصيغة المتكلم. أسلوبها شبه رسمي ودود؛ تسمح بجمل قصيرة وبتعبيرات الذاكرة وبمخاطبة القارئ أحياناً، لكنها تبقى منظمة. في التدوينة عن الماضي (personal recount) نروي الأحداث بترتيب زمني بروابط مثل One day… The next day…، ونستخدم الأزمنة الماضية بدقة (past simple للأحداث، past continuous للخلفية، past perfect لما سبق)، ثم ننهي بخاتمة تأملية (reflective ending) نذكر فيها ما تعلمناه. الطول المعتاد 200–250 كلمة.",
    plan: [
      { part: "Title and opening hook", ar: "العنوان والافتتاحية", tip: "اختر عنواناً جذاباً وجملة افتتاحية تنقل القارئ إلى الذكرى مباشرة، مثل: Every autumn, the memories come flooding back." },
      { part: "Setting the scene", ar: "تحديد المشهد", tip: "متى؟ أين؟ مع من؟ كم كان عمرك؟ استخدم I clearly recall… وAt that time… مع past continuous لوصف الخلفية." },
      { part: "What happened (in order)", ar: "الأحداث بالترتيب", tip: "اروِ الأحداث الرئيسية بـ past simple وبروابط زمنية (One day… Then… Within minutes… The next day…)، واستخدم past perfect للإشارة إلى ما حدث قبل ذلك." },
      { part: "Feelings and details", ar: "المشاعر والتفاصيل", tip: "ماذا رأيت وسمعت وشعرت؟ تفاصيل حسية قصيرة ومشاعرك في ذلك الوقت تجعل الذكرى حيّة." },
      { part: "Reflective ending", ar: "الخاتمة التأملية", tip: "انظر إلى الوراء: ماذا علّمتك هذه الذكرى وكيف شكّلت شخصيتك اليوم؟ استخدم Looking back… وI've never forgotten… وTo this day… مع present perfect وpresent simple." }
    ],
    phrases: [
      { en: "The memories came flooding back.", ar: "تدفقت الذكريات إلى ذهني دفعةً واحدة.", use: "افتتاحية أو خاتمة" },
      { en: "I clearly recall …", ar: "أتذكّر بوضوح …", use: "استحضار الذكرى" },
      { en: "I've never forgotten …", ar: "لم أنسَ قط …", use: "ذكرى راسخة" },
      { en: "At that time, … / Back then, …", ar: "في ذلك الوقت …", use: "تحديد المشهد" },
      { en: "One morning, … / One day, …", ar: "ذات صباح … / ذات يوم …", use: "بدء الحدث الرئيسي" },
      { en: "Within minutes, … / Before long, …", ar: "في غضون دقائق … / بعد وقت قصير …", use: "تتابع سريع" },
      { en: "The next day, … / A few days later, …", ar: "في اليوم التالي … / بعد أيام قليلة …", use: "الانتقال زمنياً" },
      { en: "By the time …, I had already …", ar: "حين …، كنت قد … بالفعل", use: "الحدث الأسبق" },
      { en: "Without warning, … / All of a sudden, …", ar: "دون سابق إنذار … / فجأةً …", use: "حدث مفاجئ" },
      { en: "It was then that I realised …", ar: "عندها أدركت أن …", use: "لحظة الإدراك" },
      { en: "I can still picture …", ar: "ما زلت أرى … بوضوح في ذهني", use: "تفاصيل حسية" },
      { en: "Looking back, … / As I think about it now, …", ar: "عندما أنظر إلى الماضي … / وأنا أفكر في الأمر الآن …", use: "بدء الخاتمة التأملية" },
      { en: "That experience taught me that …", ar: "علّمتني تلك التجربة أن …", use: "الدرس المستفاد" },
      { en: "To this day, … / Even now, …", ar: "حتى يومنا هذا … / حتى الآن …", use: "الأثر المستمر" },
      { en: "Whenever I …, I am reminded of …", ar: "كلما … تذكّرت …", use: "خاتمة تأملية" },
      { en: "Perhaps that is what makes me who I am.", ar: "ربما هذا ما جعلني على ما أنا عليه.", use: "ربط الذكرى بالهوية" }
    ],
    task: "Write a blog post (200–250 words) about a memory from your childhood that helped to shape the person you are today. Use time linkers to organise your story, include at least two memory phrases, and finish with a reflective ending.",
    taskAr: "اكتب تدوينة (200–250 كلمة) عن ذكرى من طفولتك ساهمت في تشكيل شخصيتك اليوم. رتّب الأحداث بروابط زمنية، واستخدم عبارتين على الأقل من عبارات الذكريات (مثل I clearly recall…)، وأنهِ التدوينة بخاتمة تأملية.",
    words: [200, 250],
    model: [
      "The Olive Harvest I Still Remember",
      "Every October, when the first cool breeze reaches Amman, the memories come flooding back. I clearly recall the olive harvest of my tenth year, when my grandfather finally allowed me to join the grown-ups on his land near Ajloun.",
      "At that time, I thought the work would be easy. We arrived before sunrise, and by the time the sun had climbed over the hill, I had already filled one small basket. Then my grandfather handed me a long wooden pole and said, 'Now it is your turn.' Within minutes my arms were aching, and the olives were bouncing everywhere except into the nets. The next hour was miserable. I was close to tears when I noticed that he had been watching me all along, smiling.",
      "'Nobody is born knowing how to do this,' he said quietly. He showed me how to tap the branches gently, and by the afternoon I had collected more olives than my cousins. That night, as we ate warm bread dipped in fresh oil, he told me that he had been picking olives since he was seven years old.",
      "Looking back, I realise that day taught me more than any lesson at school. I have never forgotten his patience, and it is the reason I try not to give up when something feels difficult. Perhaps that is what makes me tick: the belief that skill, like an olive tree, needs time and care to grow."
    ],
    check: [
      "هل في التدوينة عنوان جذاب وافتتاحية تنقل القارئ إلى الذكرى؟",
      "هل رتّبت الأحداث زمنياً باستخدام روابط مثل One day… Then… The next day…؟",
      "هل استخدمت عبارتين على الأقل من عبارات الذاكرة (I clearly recall… / I've never forgotten…)؟",
      "هل استخدمت الأزمنة الماضية بدقة: past simple للأحداث، past continuous للخلفية، past perfect لما سبق؟",
      "هل أضفت تفاصيل حسية ومشاعر (ماذا رأيت وسمعت وشعرت؟) لتصبح الذكرى حيّة؟",
      "هل تنتهي التدوينة بخاتمة تأملية تبيّن ما تعلمته وكيف شكّلت الذكرى شخصيتك؟",
      "هل الأسلوب شخصي ودود (بصيغة المتكلم) دون أن يكون عامياً أكثر من اللازم؟",
      "هل عدد الكلمات ضمن المطلوب، وراجعت الإملاء وعلامات الترقيم؟"
    ]
  },
  speaking: {
    title: "Preferences, values and psychometric tests",
    ar: "التفضيلات والقيم وما يشكّل هويتنا، ومناقشة الاختبارات النفسية في التوظيف",
    phrases: [
      { en: "I'm wild about … / I get a real kick out of …", ar: "أنا مولع بـ … / أستمتع حقاً بـ …", use: "التعبير عن الاهتمامات القوية" },
      { en: "I'd rather … than …", ar: "أفضّل … على …", use: "التعبير عن التفضيل" },
      { en: "I tend to … when I'm under pressure.", ar: "أميل إلى … عندما أكون تحت الضغط.", use: "وصف الطباع والعادات" },
      { en: "I set great store by honesty and loyalty.", ar: "أُولي أهمية كبيرة للصدق والوفاء.", use: "التعبير عن القيم" },
      { en: "What really makes me tick is …", ar: "ما يحرّكني فعلاً هو …", use: "الحديث عن الدوافع" },
      { en: "I clicked with her straight away because …", ar: "انسجمت معها فوراً لأن …", use: "الحديث عن الصداقات" },
      { en: "The way I was brought up has shaped my attitude to …", ar: "الطريقة التي نشأت بها شكّلت موقفي من …", use: "ما يشكّل الهوية" },
      { en: "In my case, I'd say nurture matters more than nature, because …", ar: "في حالتي أرى أن التنشئة أهم من الطبيعة الوراثية، لأن …", use: "إبداء رأي في الوراثة والبيئة" },
      { en: "One argument in favour of psychometric tests is that …", ar: "من الحجج المؤيدة للاختبارات النفسية أن …", use: "عرض حجة مؤيدة" },
      { en: "Supporters claim that … / Critics point out that …", ar: "يزعم المؤيدون أن … / يشير المنتقدون إلى أن …", use: "عرض الرأيين" },
      { en: "That's a fair point, but …", ar: "هذه نقطة وجيهة، ولكن …", use: "الاعتراض المهذّب" },
      { en: "I see where you're coming from, yet I'm not convinced that …", ar: "أفهم وجهة نظرك، لكنني لست مقتنعاً بأن …", use: "عدم الاقتناع بأدب" },
      { en: "Surely it is unfair to judge someone on one test alone.", ar: "من الظلم بالتأكيد أن نحكم على شخص من اختبار واحد فقط.", use: "حجة ضد" },
      { en: "Admittedly, … ; nevertheless, …", ar: "صحيح أن … ومع ذلك …", use: "الاعتراف بنقطة ثم الرد عليها" },
      { en: "All things considered, tests should be one tool among many.", ar: "إذا وضعنا كل شيء في الحسبان، فالاختبارات أداة واحدة من أدوات كثيرة.", use: "الخلاصة" },
      { en: "Would you agree that …? / Don't you think …?", ar: "هل توافق على أن …؟ / ألا تعتقد أن …؟", use: "دعوة الطرف الآخر للرد" }
    ],
    dialogue: [
      ["Dana", "Our debate topic this week is whether companies should use psychometric tests when they hire people. Which side would you rather take?"],
      ["Yazan", "I'd argue in favour. One advantage is that every candidate answers the same questions, so the process can be fairer than a quick chat."],
      ["Dana", "That's a fair point, but I'm not convinced a test can show what makes a person tick. Someone may seem laid-back on paper and still work extremely hard."],
      ["Yazan", "Admittedly, no test is perfect. Still, employers set great store by evidence, and a test might show whether a candidate is assertive enough to lead a team."],
      ["Dana", "Critics also point out that applicants can guess the answers employers want. Surely it is unfair to judge someone on one questionnaire alone."],
      ["Yazan", "I see where you're coming from. All things considered, I think the tests are useful as one tool among many, not the only one."],
      ["Dana", "I can agree with that. Let's use it as our closing sentence."],
      ["Yazan", "Deal. I'm wild about debating, so I'm already looking forward to Thursday!"]
    ]
  },
  test: [
    { t: "mcq", q: "Instead of boasting about her victory, the champion praised her opponents with great ____.", o: ["discretion", "humility", "mercy", "inclusion"], a: 1, k: "vocab", x: "humility = التواضع، وهو ما يظهر حين لا تتباهى البطلة بل تمدح منافسيها. أما discretion فهو التكتّم، وmercy الرحمة، وinclusion الشمول." },
    { t: "mcq", q: "Nothing worries our manager. He is so ____ that he stayed calm even when the whole system crashed an hour before the deadline.", o: ["thin-skinned", "highly strung", "laid-back", "tight-fisted"], a: 2, k: "vocab", x: "laid-back = هادئ الطبع لا يقلق بسهولة. أما highly strung فعكس ذلك (عصبي وسريع التوتر)، وthin-skinned حسّاس للنقد، وtight-fisted بخيل." },
    { t: "mcq", q: "After comparing all the menus, we finally ____ the grilled fish.", o: ["clicked with", "set great store by", "got a kick out of", "plumped for"], a: 3, k: "vocab", x: "plump for = يستقر على اختيار بعد تردد، وهو ما يناسب «finally» بعد مقارنة القوائم. أما click with فتعني الانسجام مع شخص." },
    { t: "mcq", q: "It took the whole class a long time to ____ the idea that identity is not the same as personality.", o: ["grasp", "deduce", "reflect", "assume"], a: 0, k: "vocab", x: "grasp an idea = يستوعب فكرة. أما deduce وassume فتأتيان عادةً مع that، وreflect تحتاج on (reflect on)." },
    { t: "mcq", q: "I'm exhausted. I ____ since six o'clock this morning and I haven't had a single break.", o: ["worked", "have been working", "am working", "had worked"], a: 1, k: "g12u1-gr1", x: "since + نقطة بداية ونشاط مستمر حتى الآن مع التركيز على المدة ← present perfect continuous: have been working." },
    { t: "mcq", q: "Which sentence is grammatically correct?", o: ["I am wanting a glass of water.", "She is owning two cars.", "They have been knowing each other for years.", "We have known each other for years."], a: 3, k: "g12u1-gr1", x: "want وown وknow أفعال حالة لا تأتي عادةً بصيغة continuous، ومع for نستخدم present perfect simple: have known." },
    { t: "mcq", q: "At this time tomorrow, our flight ____ over the Mediterranean, so we won't be able to answer our phones.", o: ["is flying", "has been flying", "will be flying", "will have flown"], a: 2, k: "g12u1-gr2", x: "At this time tomorrow + حدث سيكون جارياً في تلك اللحظة ← future continuous: will be flying." },
    { t: "mcq", q: "I won't leave until you ____ me the truth.", o: ["tell", "will tell", "are telling", "would tell"], a: 0, k: "g12u1-gr2", x: "بعد until نستخدم present simple للتعبير عن المستقبل، ولا نضع will بعد أدوات الزمن." },
    { t: "mcq", q: "I ____ my cousins since last summer, so I miss them a lot.", o: ["didn't see", "haven't seen", "don't see", "wasn't seeing"], a: 1, k: "g12u1-gr3", x: "since + نقطة بداية (last summer) تستلزم present perfect: haven't seen." },
    { t: "err", q: "I haven't finished my homework already, so I can't go out.", w: "already", c: "yet (I haven't finished my homework yet)", k: "g12u1-gr3", x: "في الجملة المنفية نستخدم yet في آخر الجملة بمعنى «حتى الآن»، أما already فتأتي في الجملة المثبتة (I have finished it already). وبقية الجملة (so I can't go out) تؤكد أن الواجب لم ينتهِ بعد، فالخطأ ليس في haven't." },
    { t: "mcq", q: "Which sentence means the same as 'I last saw my cousins two years ago'?", o: ["I haven't seen my cousins for two years.", "I haven't seen my cousins since two years.", "I didn't see my cousins for two years.", "I have seen my cousins for two years."], a: 0, k: "g12u1-gr3", x: "last … ago ← haven't + V3 + for + المدة. وsince لا تأتي مع مدة (two years) بل مع نقطة بداية." },
    { t: "mcq", q: "Which sentence means the same as 'I'll complete the report before the end of the week'?", o: ["I will be completing the report until the end of the week.", "I have completed the report since the end of the week.", "I will have completed the report by the end of the week.", "I would complete the report by the end of the week."], a: 2, k: "g12u1-gr2", x: "before the end of the week = by the end of the week ← حدث يكتمل قبل نقطة مستقبلية ← future perfect: will have completed." },
    { t: "mcq", q: "Which sentence means the same as 'The news of his resignation came as a shock to the whole department'?", o: ["The department had expected his resignation for a long time.", "His resignation shocked nobody in the department.", "The department was relieved by the news of his resignation.", "The whole department was shocked by the news of his resignation."], a: 3, k: "vocab", x: "X came as a shock to sb = sb was shocked by X: صُدم القسم كله بخبر الاستقالة." },
    { t: "mcq", q: "Read the text.\nSome companies now ask job applicants to complete a personality questionnaire before the interview. Supporters say it helps managers to see beyond a polished CV. However, one psychologist cautions that people can easily guess which answers employers want to see, so the results may reveal more about a candidate's skill at guessing than about their true character.\n\nWhat is the psychologist's main concern?", o: ["Questionnaires take too long to complete.", "Applicants may give answers that do not show their real character.", "Managers prefer CVs to questionnaires.", "Personality cannot be described in words."], a: 1, k: "reading", x: "عالِم النفس يحذّر من أن المتقدمين قد يخمّنون الإجابات التي يريدها أصحاب العمل، فتكشف النتائج مهارتهم في التخمين لا شخصيتهم الحقيقية." },
    { t: "mcq", q: "Read the text.\nWhen Layla's family moved abroad, she was only seven, yet she soon spoke the new language like a native. Her parents, by contrast, struggled for years. Some researchers suggest that young children adapt more easily because their habits and ways of thinking have not yet been firmly moulded.\n\nIn this context, 'moulded' is closest in meaning to …", o: ["shaped", "damaged", "forgotten", "copied"], a: 0, k: "reading", x: "have been firmly moulded = تشكّلت وترسّخت بقوة، أي shaped. والمقصود أن عادات الصغار لم تترسّخ بعد، فيتكيّفون بسهولة أكبر." },
    { t: "mcq", q: "Read the text.\nThe so-called 'learning styles' theory has been repeated in staffrooms for years. Teachers are told that some pupils are 'visual' and others 'auditory', as if the matter were settled. Yet careful studies have found little evidence that teaching to a pupil's supposed style improves results.\n\nThe phrase 'so-called' suggests that the writer …", o: ["strongly supports the theory.", "has never heard of the theory.", "doubts that the theory deserves its reputation.", "is describing a brand-new discovery."], a: 2, k: "reading", x: "so-called تُستعمل للتشكيك في تسمية أو سمعة شيء ما، ويؤكد ذلك كلام الكاتب عن «little evidence» و«supposed style»." },
    { t: "mcq", q: "Read the poem.\nI am the sum of every road\nmy grandmother once walked,\nof olive trees that bent in wind\nand evenings when she talked.\nHer patience lives inside my hands,\nher laughter in my voice.\nI did not make the things I am,\nyet I can make my choice.\n\nWhat do the last two lines suggest about identity?", o: ["We have no control over who we become.", "We are completely different from our families.", "Choice is less important than family.", "We inherit much of who we are, but we can still choose how to act."], a: 3, k: "reading", x: "I did not make the things I am (ما أنا عليه موروث) + yet I can make my choice (لكن لي حرية الاختيار)، فالهوية تجمع بين الموروث والاختيار." },
    { t: "mcq", q: "Your classmate says: 'Psychometric tests are the fairest way to choose employees.' You partly disagree. Which reply is the most appropriate?", o: ["That's rubbish. You obviously know nothing about it.", "I see where you're coming from, but I'm not convinced they can measure everything that matters.", "Yes. No. Maybe. I don't really care.", "Tests are good. End of discussion."], a: 1, k: "speaking", x: "الرد المهذّب يعترف بوجهة نظر الطرف الآخر (I see where you're coming from) ثم يعبّر عن عدم الاقتناع (but I'm not convinced) دون إساءة." },
    { t: "mcq", q: "Which sentence is the most appropriately hedged for an academic essay?", o: ["Language definitely controls every thought we have.", "Everyone knows that language shapes thought.", "Some researchers suggest that language may influence what we notice.", "It is a proven fact that language decides our view of the world."], a: 2, k: "writing", x: "التحفّظ (hedging) يتم بكلمات مثل some researchers suggest وmay، لأن الأدلة غير قاطعة. الجمل الأخرى جازمة ومبالغ فيها." },
    { t: "mcq", q: "Which sentence would make the best reflective ending for a blog post about a childhood memory?", o: ["Looking back, I realise that day taught me patience, and I have never forgotten it.", "In conclusion, this essay has discussed three main points.", "Please find attached the document you requested.", "I look forward to hearing from you soon."], a: 0, k: "writing", x: "الخاتمة التأملية في التدوينة الشخصية تنظر إلى الماضي (Looking back) وتذكر ما تعلمناه. أما الجمل الأخرى فتناسب مقالة أو رسالة رسمية." }
  ]
});

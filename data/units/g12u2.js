TAF.unit({
  id: "g12u2",
  grade: 12, sem: 1, n: 2,
  title: "On the move",
  ar: "في حركة وتنقّل",
  topics: "الحركة والتنقّل اليومي والسفر، أفعال الحركة، أبحاث الفضاء والسياحة الفضائية، السيارات ذاتية القيادة، أنواع السياحة وسياحة «الفرصة الأخيرة»، وكتابة رسالة شكوى رسمية",
  goals: [
    "استخدام القلب (inversion) بعد الظروف المنفية والمقيِّدة مثل Never وRarely وLittle وNo sooner وNot only وOnly when وNot until لإضافة التوكيد",
    "استخدام So… that وSuch… that مع القلب، والرد على كلام الآخرين بـ So do I وNeither / Nor can I",
    "تكوين الجمل المشقوقة (It-cleft وWh-cleft) وتقديم عناصر الجملة (fronting) مثل Into the room walked… وGone are the days…، ومعرفة متى يكون كل تركيب طبيعياً",
    "تمييز أفعال الحركة والتنقّل (stride, hobble, surge, alight, disperse…) والتعابير والمتلازمات اللفظية، واستخدام الأفعال بمعانيها الحرفية والمجازية",
    "فهم أدوات الإحالة (it, this, such, so, do so, the former / the latter) في نص قصصي",
    "كتابة رسالة بريد رسمية للشكوى بأسلوب مهذّب وحازم، والمقارنة بين بدائل (أنواع السياحة) أثناء الحديث"
  ],
  vocab: [
    { w: "shuffle", ar: "يمشي جارّاً قدميه / يتحرك ببطء بخطوات قصيرة", pos: "verb", def: "to walk slowly, dragging your feet along the ground", ex: "The queue shuffled forward until we finally reached the ticket window.", tag: "verbs of movement" },
    { w: "lurch", ar: "يرتجّ / يتمايل فجأة وبعنف (شخص أو مركبة)", pos: "verb", def: "to move suddenly and unsteadily forwards or to one side", ex: "The bus lurched forward and several passengers grabbed the nearest handrail.", tag: "verbs of movement" },
    { w: "wobble", ar: "يهتزّ / يتأرجح لعدم الثبات", pos: "verb", def: "to move unsteadily from side to side", ex: "My bike wobbled badly because one of the tyres was almost flat.", tag: "verbs of movement" },
    { w: "stride", ar: "يمشي بخطوات واسعة وواثقة", pos: "verb", def: "to walk with long, confident steps", ex: "Confident commuters stride past the tourists without even looking up.", tag: "verbs of movement" },
    { w: "hobble", ar: "يعرج / يمشي بصعوبة بسبب ألم في القدم", pos: "verb", def: "to walk with difficulty because your leg or foot hurts", ex: "After the long hike, we hobbled back to the car on sore feet.", tag: "verbs of movement" },
    { w: "surge", ar: "يندفع / يتدفّق بقوة كالموجة", pos: "verb", def: "to move forward suddenly and powerfully, especially as a crowd", ex: "As the gates opened, the fans surged into the stadium.", tag: "verbs of movement" },
    { w: "stagger", ar: "يترنّح من الإعياء أو الحِمل؛ ومجازاً: يصدم / يذهل", pos: "verb", def: "to walk unsteadily, nearly falling; also, to shock someone deeply", ex: "She staggered under the weight of her luggage, and the price of the taxi staggered her even more.", tag: "verbs of movement" },
    { w: "stumble", ar: "يتعثّر؛ ومجازاً: يعثر بالصدفة على (stumble across)", pos: "verb", def: "to trip and nearly fall; also, to find something by chance", ex: "I stumbled on the stairs, and later stumbled across a tiny café in a quiet side street.", tag: "verbs of movement" },
    { w: "dart", ar: "ينطلق بسرعة وخفّة", pos: "verb", def: "to move suddenly and very quickly in one direction", ex: "A cat darted across the road, and the driver braked hard.", tag: "verbs of movement" },
    { w: "trudge", ar: "يمشي بتثاقل وإعياء (وليس wander = يتجوّل بلا هدف)", pos: "verb", def: "to walk slowly with heavy steps because you are tired", ex: "While tourists wander through the old souq, tired commuters trudge home through the rain.", tag: "verbs of movement" },
    { w: "descend", ar: "ينزل / يهبط إلى مستوى أدنى", pos: "verb", def: "to go down to a lower place or level", ex: "Passengers descended the steep steps to the underground platform.", tag: "travel and commuting verbs" },
    { w: "alight", ar: "ينزل من (قطار أو حافلة) — رسمي", pos: "verb", def: "to get off a train, bus or other vehicle (formal)", ex: "Passengers are requested to alight from the train at the next station.", tag: "travel and commuting verbs" },
    { w: "disperse", ar: "يتفرّق / ينفضّ (حشد)", pos: "verb", def: "to spread out in different directions, as a crowd does", ex: "When the match ended, the crowd slowly dispersed into the side streets.", tag: "travel and commuting verbs" },
    { w: "bolt", ar: "يهرع راكضاً / يفرّ مسرعاً (خوفاً أو استعجالاً)", pos: "verb", def: "to run suddenly and very fast, often in fear or in a hurry", ex: "When the whistle blew, the commuters bolted for the doors of the train.", tag: "travel and commuting verbs" },
    { w: "collide", ar: "يصطدم بـ", pos: "verb", def: "to crash into someone or something while moving", ex: "Two cyclists collided at the junction, but neither was badly hurt.", tag: "travel and commuting verbs" },
    { w: "falter", ar: "يتردّد / يضعف / تخونه قدماه", pos: "verb", def: "to lose strength or confidence and begin to hesitate or stop", ex: "Her steps faltered when she saw how many platforms there were.", tag: "travel and commuting verbs" },
    { w: "driving force", ar: "القوة المحرِّكة / الدافع الرئيسي", pos: "idiom", def: "the person or thing that makes something happen or develop", ex: "Curiosity has always been the driving force behind space exploration.", tag: "idioms (Active Vocabulary)" },
    { w: "plain sailing", ar: "أمر سهل لا عقبات فيه", pos: "idiom", def: "a process that is easy and has no problems", ex: "Once we found the right platform, the rest of the journey was plain sailing.", tag: "idioms (Active Vocabulary)" },
    { w: "go downhill", ar: "يتدهور حاله / يسوء", pos: "idiom", def: "to become worse in quality, health or success", ex: "The old bus company has been going downhill since it lost its best drivers.", tag: "idioms (Active Vocabulary)" },
    { w: "in the same boat", ar: "في الموقف الصعب نفسه (كلنا في الهمّ سواء)", pos: "idiom", def: "in the same difficult situation as other people", ex: "Half the passengers had missed their connection, so we were all in the same boat.", tag: "idioms (Active Vocabulary)" },
    { w: "take someone for a ride", ar: "يخدع شخصاً / يستغفله", pos: "idiom", def: "to trick or cheat someone, often to get their money", ex: "The driver took us for a ride by choosing a much longer route.", tag: "idioms (Active Vocabulary)" },
    { w: "drive", ar: "يقود؛ ومجازاً: يدفع / يُجبر (drive someone mad)", pos: "verb", def: "to control a vehicle; figuratively, to force someone into a state or action", ex: "Endless delays drove many commuters to give up on the train altogether.", tag: "literal and figurative verbs" },
    { w: "fly", ar: "يطير؛ ومجازاً: يمرّ بسرعة (الوقت)", pos: "verb", def: "to travel through the air; figuratively, to pass very quickly (time)", ex: "The holiday flew by, and soon we were back at the airport.", tag: "literal and figurative verbs" },
    { w: "jump", ar: "يقفز؛ ومجازاً: يتسرّع (jump to conclusions)", pos: "verb", def: "to leap; figuratively, to decide or react too quickly (jump to conclusions)", ex: "Don't jump to conclusions: the train may simply be running late.", tag: "literal and figurative verbs" },
    { w: "sail through", ar: "يبحر عبر …؛ ومجازاً: ينجح بسهولة تامة (في امتحان مثلاً)", pos: "phrasal verb", def: "to travel through by ship; figuratively, to pass or succeed very easily", ex: "She sailed through her driving test without making a single mistake.", tag: "literal and figurative verbs" },
    { w: "breakthrough", ar: "إنجاز مفصلي / اختراق علمي", pos: "noun", def: "an important discovery or development that solves a problem", ex: "A breakthrough in battery technology could make electric buses much cheaper.", tag: "phrasal nouns" },
    { w: "setback", ar: "نكسة / عقبة تؤخّر التقدّم", pos: "noun", def: "a problem that delays or reverses progress", ex: "The failed launch was a serious setback, but the team did not give up.", tag: "phrasal nouns" },
    { w: "outset", ar: "البداية (at the outset = في البداية)", pos: "noun", def: "the beginning of something (usually in 'at the outset')", ex: "At the outset, few people believed the new tram line would ever open.", tag: "phrasal nouns" },
    { w: "outcry", ar: "ضجّة احتجاج / استنكار شعبي", pos: "noun", def: "a strong public protest about something", ex: "There was a public outcry when the council announced it would close the bus station.", tag: "phrasal nouns" },
    { w: "cutbacks", ar: "تخفيضات (في الميزانية أو الخدمات)", pos: "noun", def: "reductions in spending or services", ex: "Cutbacks to the railway budget meant fewer trains at weekends.", tag: "phrasal nouns" },
    { w: "getaway", ar: "رحلة قصيرة للاستراحة؛ أو هروب سريع", pos: "noun", def: "a short holiday; also, a quick escape after a crime", ex: "We booked a weekend getaway to the Dead Sea to escape the city noise.", tag: "phrasal nouns" },
    { w: "outlook", ar: "التوقعات المستقبلية / النظرة العامة", pos: "noun", def: "what is likely to happen in future; also, a general attitude", ex: "The outlook for tourism is positive, with more visitors expected next year.", tag: "phrasal nouns" },
    { w: "fair share", ar: "حصّة عادلة / نصيب معتاد (من المشكلات مثلاً)", pos: "collocation", def: "a normal or expected amount of something, especially problems", ex: "Every big city has its fair share of traffic problems.", tag: "collocations" },
    { w: "knock-on effect", ar: "أثر متسلسل غير مباشر", pos: "collocation", def: "an indirect result that follows from an earlier event", ex: "One cancelled train had a knock-on effect on every service that evening.", tag: "collocations" },
    { w: "overcome hurdles", ar: "يتجاوز العقبات", pos: "collocation", def: "to deal successfully with difficulties", ex: "The young engineers overcame many hurdles before their solar car finished the race.", tag: "collocations" },
    { w: "brag about", ar: "يتباهى بـ", pos: "collocation", def: "to talk too proudly about what you have or have done", ex: "He kept bragging about the number of countries he had visited.", tag: "collocations" },
    { w: "breakneck speed", ar: "بسرعة جنونية / خطيرة", pos: "collocation", def: "extremely fast, in a dangerous way", ex: "The motorbike raced down the hill at breakneck speed.", tag: "collocations" },
    { w: "drastically improved", ar: "تحسّن جذرياً", pos: "collocation", def: "became much better in a very noticeable way", ex: "Journey times have drastically improved since the new motorway opened.", tag: "adverb + adjective" },
    { w: "deeply disappointed", ar: "خائب الأمل بشدّة", pos: "collocation", def: "extremely unhappy because something was worse than you hoped", ex: "We were deeply disappointed to find that our flight had been cancelled.", tag: "adverb + adjective" },
    { w: "gravely mistaken", ar: "مخطئ خطأً جسيماً", pos: "collocation", def: "completely and seriously wrong", ex: "Anyone who thinks the journey will be easy is gravely mistaken.", tag: "adverb + adjective" }
  ],
  grammar: [
    {
      id: "g12u2-gr1",
      title: "Inversion for emphasis",
      ar: "القلب (Inversion) للتوكيد: Never have I… / So great was… / Neither do I",
      body: [
        { p: "في الجملة الإنجليزية العادية يأتي الفاعل قبل الفعل (**Subject + Verb**). لكن حين نريد **توكيداً قوياً** أو أسلوباً رسمياً أو أدبياً، نبدأ الجملة بعبارة منفية أو مقيِّدة مثل Never وRarely وNo sooner، ثم **نقلب الترتيب**: نضع **الفعل المساعد قبل الفاعل** كما نفعل في السؤال، لكن الجملة تبقى خبرية وليست سؤالاً. هذا هو **Inversion**." },
        { ex: [
          ["I have never seen such a crowd. → ==Never have I== seen such a crowd.", "لم أرَ حشداً كهذا قط. (توكيد قوي)"],
          ["She rarely travels alone. → ==Rarely does she== travel alone.", "نادراً ما تسافر وحدها."],
          ["The queue was so long that we gave up. → ==So long was the queue== that we gave up.", "كان الطابور طويلاً لدرجة أننا استسلمنا."]
        ] },
        { h: "1) كيف نكوّن القلب؟" },
        { p: "ننظر إلى الجملة العادية ونطبّق إحدى الحالات الثلاث:" },
        { table: { head: ["إذا كان في الجملة العادية…", "نفعل ماذا؟", "مثال"], rows: [
          ["فعل مساعد أو modal (have, will, can, should…)", "ننقل المساعد قبل الفاعل", "I have never felt so lost. → Never ==have I== felt so lost."],
          ["الفعل be وحده (am / is / are / was / were)", "ننقل be قبل الفاعل", "She is rarely late. → Rarely ==is she== late."],
          ["فعل عادي في Present simple أو Past simple (لا يوجد مساعد)", "نضيف do / does / did قبل الفاعل ثم الفعل بصيغته الأصلية", "They seldom take the bus. → Seldom ==do they take== the bus."]
        ] } },
        { tip: "هي الطريقة نفسها التي نكوّن بها السؤال: لو كنتَ ستقول «Have you…?» أو «Do they…?» فاقلب بالطريقة نفسها بعد العبارة المنفية. وتذكّر: بعد do / does / did يأتي الفعل بصيغته الأصلية (base form) دائماً." },
        { h: "2) العبارات التي تُوجب القلب" },
        { table: { head: ["المجموعة", "العبارات", "مثال"], rows: [
          ["ظروف النفي والتكرار", "never, never before, rarely, seldom, little, hardly ever, nowhere, not once", "Never before ==had the station been== so crowded."],
          ["حدثان متتاليان بسرعة", "no sooner … than ؛ hardly / scarcely / barely … when (أو before)", "==No sooner had we boarded== than the doors closed."],
          ["Not only … (but also)", "Not only + مساعد + فاعل …, but …", "==Not only did the bus arrive== late, but it also broke down."],
          ["الحصر بـ only", "only then, only later, only after / when / if, only by, only in this way, only once", "==Only when the doors opened did== we feel the cold."],
          ["Not until", "Not until + وقت أو جملة + مساعد + فاعل", "==Not until midnight did== the last bus arrive."],
          ["النفي القاطع (ومنه المنع)", "under no circumstances, on no account, at no time, in no way, by no means", "==On no account should== you leave the group."],
          ["النتيجة بـ So / Such", "So + صفة أو ظرف …، Such + be + اسم …", "==So heavy was the traffic== that we missed the flight."]
        ] } },
        { ex: [
          ["==Not once did he apologise== for the delay.", "لم يعتذر ولو مرة واحدة عن التأخير."],
          ["==Seldom have we seen== such a quiet airport.", "نادراً ما رأينا مطاراً بهذا الهدوء."],
          ["==Nowhere else can you find== a view like this.", "لن تجد في أي مكان آخر منظراً كهذا."]
        ] },
        { h: "3) Little did … (لم يكن يدري)" },
        { p: "في هذا التركيب تعني **little** «لا… أبداً / لم… إطلاقاً» وليست «صغير». نستخدمه في السرد مع أفعال المعرفة والتوقّع (know, realise, imagine, suspect, expect) لنقول إن الشخص **لم يكن يعلم** بما سيحدث." },
        { ex: [
          ["==Little did she realise== that the train was already moving.", "لم تكن تدرك أن القطار قد بدأ يتحرك فعلاً."],
          ["==Little did we imagine== that a car with no driver would be waiting for us.", "لم نتخيّل أبداً أن سيارة بلا سائق ستكون في انتظارنا."]
        ] },
        { h: "4) No sooner … than و Hardly … when" },
        { p: "نستخدمهما لحدثين وقعا **واحداً بعد الآخر مباشرة**. الجملة الأولى بزمن **Past perfect** مع القلب، والجملة الثانية بالترتيب العادي وبزمن Past simple. الرابط مختلف: **no sooner … THAN** لكن **hardly / scarcely / barely … WHEN** (أو before)." },
        { ex: [
          ["==No sooner had she sat down than== the train moved off.", "ما إن جلست حتى تحرّك القطار."],
          ["==Hardly had she sat down when== the train moved off.", "لم تكد تجلس حتى تحرّك القطار."]
        ] },
        { h: "5) Not only … but (also)" },
        { p: "نقلب في الجزء الأول فقط (بعد Not only)، أما الجزء الثاني بعد but فيبقى بالترتيب العادي." },
        { ex: [
          ["==Not only did the coach arrive== late, but the driver was also rude.", "لم تتأخر الحافلة فحسب، بل كان السائق فظّاً أيضاً."],
          ["==Not only is the metro== cheap, but it is also fast.", "المترو ليس رخيصاً فحسب، بل سريع أيضاً."]
        ] },
        { h: "6) Only + ظرف، و Not until" },
        { p: "عندما نبدأ بـ **only** + عبارة ظرفية (زمن أو طريقة أو شرط) أو بـ **not until**، يقع القلب في **الجملة الرئيسية** التي تأتي بعد العبارة، أما الفعل داخل عبارة only / not until نفسها فيبقى بالترتيب العادي." },
        { ex: [
          ["Only after the storm had passed ==did the ferries sail==.", "لم تبحر العبّارات إلا بعد أن مرّت العاصفة."],
          ["Only by asking a local ==could we find== the hidden entrance.", "لم نتمكن من إيجاد المدخل الخفي إلا بسؤال أحد السكان."],
          ["Not until we reached Aqaba ==did the rain stop==.", "لم يتوقف المطر إلا بعد أن وصلنا إلى العقبة."]
        ] },
        { p: "الصيغة العادية المقابلة تستخدم **not … until** بلا قلب: The rain did not stop until we reached Aqaba." },
        { warn: "✗ Only when did the doors open we noticed the smell. ← ✓ Only when the doors opened ==did we notice== the smell. الفعل داخل عبارة Only when يبقى كما هو، والقلب يأتي في الجملة الرئيسية بعدها." },
        { tip: "لا قلب إذا كانت only + اسم هي **الفاعل نفسه**: Only Sami knew the way. (هنا Only Sami هو الفاعل). أما إذا جاءت only + ظرف ثم فاعل جديد فنقلب: Only then did Sami find the way." },
        { h: "7) So … that و Such … that" },
        { p: "للتعبير عن «لدرجة أن…» بأسلوب أقوى نبدأ بـ **So** أو **Such** ونقلب:" },
        { table: { head: ["التركيب", "ما الذي يسبق الفاعل؟", "مثال"], rows: [
          ["So + صفة + be + فاعل + that", "الفعل be", "So crowded ==was the platform== that nobody could move."],
          ["So + ظرف أو صفة + مساعد + فاعل + فعل + that", "المساعد (do / did / has…)", "So quickly ==did the crowd disperse== that the platform was empty in minutes."],
          ["Such + be + اسم + that", "الفعل be بعد Such مباشرة", "Such ==was the noise== that we could not hear the announcement."]
        ] } },
        { p: "الصيغة العادية بلا قلب: The platform was **so crowded that** nobody could move. / It was **such a crowded platform that** nobody could move. والقلب يجعل الجملة أكثر رسمية وتأثيراً." },
        { h: "8) Neither / Nor / So + مساعد + فاعل" },
        { p: "نستخدمها للموافقة على كلام سابق: **So** للموافقة على جملة مثبتة («وأنا كذلك»)، و**Neither / Nor** للموافقة على جملة منفية («ولا أنا»). المساعد يطابق **زمن الجملة الأولى**؛ وإن لم يكن فيها مساعد نستخدم do / does / did." },
        { table: { head: ["الجملة الأولى", "الرد", "السبب"], rows: [
          ["I love travelling by train.", "==So do I.==", "Present simple مثبت ← do"],
          ["She has visited Petra.", "==So have I.==", "المساعد has / have يتكرر"],
          ["Dad was exhausted.", "==So was I.==", "الفعل be ← was"],
          ["I don't enjoy flying.", "==Neither do I.== / ==Nor do I.==", "جملة منفية ← Neither / Nor ثم مساعد مثبت"],
          ["He can't swim.", "==Neither can I.==", "المساعد can يتكرر"]
        ] } },
        { p: "ونستخدم nor داخل الجملة للربط بين فكرتين منفيتين: He didn't apologise, ==nor did he== offer an explanation." },
        { tip: "**So do I** تعني «وأنا كذلك». أما **So I do** فتعني «نعم، هذا صحيح فعلاً» (تأكيد لما قاله الآخر): A: You look tired. B: So I am. — لا تخلط بينهما." },
        { warn: "✗ Neither don't I. / Neither I do. / Nor I can. ← ✓ Neither ==do I==. كلمة Neither تحمل معنى النفي بنفسها فلا نضيف نفياً آخر، ويجب أن يأتي المساعد قبل الفاعل." },
        { h: "9) فخاخ الامتحان" },
        { warn: "✗ Never I have seen such a crowd. ← ✓ Never ==have I== seen such a crowd. بعد العبارة المنفية يأتي المساعد قبل الفاعل." },
        { warn: "✗ Rarely she goes by bus. / Rarely does she goes by bus. ← ✓ Rarely ==does she go== by bus. إن لم يوجد مساعد نضيف do / does / did ويعود الفعل إلى صيغته الأصلية." },
        { warn: "✗ No sooner had he sat down when the bell rang. ← ✓ No sooner had he sat down ==than== the bell rang. (وبعد hardly نستخدم when)." },
        { warn: "✗ Not only she was late, but also … ← ✓ Not only ==was she== late, but she was also … . القلب يكون في الجزء الأول فقط." },
        { warn: "✗ Hardly had he arrived when did the meeting start. ← ✓ Hardly had he arrived ==when the meeting started==. لا قلب في الجملة الثانية." },
        { tip: "لا قلب إذا كانت الكلمة المنفية هي **الفاعل** نفسه: Nobody came. / Not a single bus arrived. أما إذا كانت مفعولاً أو ظرفاً مقدَّماً فنقلب: Not a single bus ==did we see==. ولا قلب أيضاً إذا بقيت العبارة المنفية في موضعها العادي داخل الجملة: I have never seen it. (عادية) ← Never have I seen it. (قلب)." },
        { tip: "القلب أسلوب **رسمي أو أدبي**: يليق بالكتابة الرسمية والخطابات والسرد والأخبار. في الحديث اليومي نستخدم الترتيب العادي، ما عدا So do I / Neither do I فهما شائعتان جداً. ويظهر القلب أيضاً في جمل شرطية رسمية مثل Had I known… وShould you need… (وهو موضوع مستقل)." },
        { tip: "نصيحة لأسئلة إعادة الصياغة (key-word transformations): إذا طُلب منك أن تبدأ بـ Never أو Hardly أو No sooner أو Only when أو Not until أو So فالجملة الجديدة تحتاج قلباً. انقل المساعد قبل الفاعل، وانتبه إلى الزمن (Hardly had … ← Past perfect) وإلى الرابط (no sooner THAN / hardly WHEN)." }
      ],
      summary: [
        "Never / Rarely / Seldom / Little / Not once / Nowhere في أول الجملة ← مساعد + فاعل + فعل: Never have I seen…",
        "إن لم يوجد مساعد ← do / does / did + الفعل الأصلي: Rarely does he arrive on time.",
        "No sooner had… THAN / Hardly (Scarcely, Barely) had… WHEN: القلب في الجملة الأولى فقط ثم Past simple.",
        "Only + ظرف، Not until، Not only: القلب في الجملة الرئيسية: Only then did I understand.",
        "So + صفة + be + فاعل + that / Such + be + اسم + that: So great was the crowd that…",
        "So do I (وأنا كذلك) / Neither (Nor) do I (ولا أنا): المساعد يطابق الجملة الأولى ولا نفي مزدوج."
      ],
      qs: [
        { t: "mcq", q: "Never ____ a car with no driver before today.", o: ["I have seen", "have I seen", "I seen", "I did see"], a: 1, x: "بعد Never في أول الجملة نقلب: المساعد have قبل الفاعل I ← Never have I seen." },
        { t: "mcq", q: "Rarely ____ late for school.", o: ["he is", "he does", "is he", "does he be"], a: 2, x: "الفعل be وحده ينتقل قبل الفاعل بعد Rarely ← Rarely is he late. ولا نستخدم does مع be." },
        { t: "mcq", q: "Little ____ that the train had already left.", o: ["she knew", "she did know", "was she knowing", "did she know"], a: 3, x: "Little did + فاعل + الفعل الأصلي ← Little did she know. بعد did يأتي know بصيغته الأصلية." },
        { t: "mcq", q: "A: I can't stand long queues.  B: ____.", o: ["Neither can I", "Neither I can", "So can I", "Nor I can"], a: 0, x: "الجملة الأولى منفية (can't) ← Neither can I (المساعد قبل الفاعل). أما So can I فتعني «وأنا أستطيع تحمّلها أيضاً» وهذا يعاكس الجملة الأولى." },
        { t: "gap", q: "Seldom ____ (we / travel – present simple) abroad during term time.", a: ["do we travel"], x: "Seldom في أول الجملة ← do + فاعل + الفعل الأصلي: Seldom do we travel." },
        { t: "mcq", q: "No sooner had the bus left the station ____ it broke down.", o: ["when", "than", "that", "then"], a: 1, x: "التركيب الثابت: No sooner … THAN. أما when فتأتي بعد hardly / scarcely / barely." },
        { t: "gap", q: "A: I was exhausted after the flight.  B: So ____ I.", a: ["was"], x: "الجملة الأولى فيها was ← نكرر المساعد نفسه: So was I." },
        { t: "mcq", q: "Only after the train had stopped ____ the doors.", o: ["the guard opened", "opened the guard", "the guard did open", "did the guard open"], a: 3, x: "بعد Only after + عبارة ظرفية يقع القلب في الجملة الرئيسية: did the guard open (do + الفعل الأصلي)." },
        { t: "gap", q: "Such ____ the demand for tickets that the website crashed.", a: ["was"], x: "Such + be + اسم + that ← Such was the demand … . الفعل be يأتي مباشرة بعد Such." },
        { t: "err", q: "So expensive were the tickets what many students could not afford them.", w: "what", c: "that", x: "للتعبير عن النتيجة بعد So + صفة نستخدم that: So expensive were the tickets that …" },
        { t: "mcq", q: "Under no circumstances ____ leave your bags unattended at the airport.", o: ["you should", "you should not", "should you", "do you should"], a: 2, x: "Under no circumstances عبارة منفية بنفسها فتتطلب القلب ← should you leave. ولا نضيف not لأن النفي موجود في العبارة." },
        { t: "gap", q: "Not only ____ (the coach / arrive – past simple) two hours late, but the driver was also rude.", a: ["did the coach arrive"], x: "Not only + did + فاعل + الفعل الأصلي، ثم يعود الترتيب عادياً بعد but." },
        { t: "order", a: "Little did I know that the bus had left.", x: "Little + did + I + know ← قلب بعد Little، وبعد did يأتي الفعل الأصلي." },
        { t: "tr", q: "I have never seen such a crowded platform.", p: "Rewrite starting with: Never …", a: ["Never have I seen such a crowded platform.", "Never before have I seen such a crowded platform.", "Never have I seen such a crowded platform before."], x: "Never في أول الجملة ← Never have I seen …" },
        { t: "tr", q: "She had barely sat down when the train began to move.", p: "Rewrite starting with: Barely …", a: ["Barely had she sat down when the train began to move.", "Barely had she sat down before the train began to move.", "Barely had she sat down when the train began moving.", "Barely had she sat down before the train began moving."], x: "Barely + had + فاعل + V3 … when / before …، والجملة الثانية بالترتيب العادي." },
        { t: "mcq", q: "Which sentence is correct?", o: ["Only Rana knew which platform to use.", "Only did Rana know which platform to use.", "Only knew Rana which platform to use.", "Only Rana did knew which platform to use."], a: 0, x: "Only Rana هو الفاعل نفسه فلا قلب. نقلب فقط حين تأتي only + ظرف مثل Only then did she know …" },
        { t: "err", q: "No sooner had we boarded the bus when the rain started.", w: "when", c: "than", x: "No sooner … THAN. وفي المقابل: Hardly had we boarded the bus WHEN the rain started." },
        { t: "tr", q: "I realised only when I reached the gate that I had left my passport at home.", p: "Rewrite starting with: Only when …", a: ["Only when I reached the gate did I realise that I had left my passport at home.", "Only when I reached the gate did I realize that I had left my passport at home.", "Only when I reached the gate did I realise I had left my passport at home.", "Only when I reached the gate did I realize I had left my passport at home."], x: "Only when + عبارة ظرفية ثم القلب في الجملة الرئيسية: did I realise … (ويجوز حذف that بعد realise)." }
      ]
    },
    {
      id: "g12u2-gr2",
      title: "Cleft sentences and fronting",
      ar: "الجمل المشقوقة (Cleft) والتقديم (Fronting) للتوكيد",
      body: [
        { p: "في هذا الدرس نتعلم طريقتين أخريين لتسليط الضوء على معلومة معيّنة: **شقّ الجملة** إلى جزأين (cleft) لنضع الجزء المهم في موضع التركيز، و**تقديم** عنصر من الجملة إلى أولها (fronting). نستعملهما لنؤكّد أو نصحّح أو نقابل، أو لنربط الجملة بما سبقها، أو لنصنع جواً أدبياً في الوصف." },
        { ex: [
          ["Rania found the lost ticket.", "رانيا وجدت التذكرة المفقودة. (جملة عادية)"],
          ["==It was Rania who== found the lost ticket.", "رانيا هي التي وجدت التذكرة. (نركّز على مَن)"],
          ["==What Rania found was== the lost ticket.", "ما وجدته رانيا هو التذكرة المفقودة. (نركّز على ماذا)"]
        ] },
        { h: "1) الـ It-cleft:  It + be + [العنصر المهم] + that / who …" },
        { p: "نضع العنصر الذي نريد إبرازه بين **It is / was** وبين **that** (أو **who** للأشخاص). يمكن أن يكون العنصر فاعلاً أو مفعولاً أو ظرف زمان أو مكان أو سبب:" },
        { table: { head: ["العنصر المُبرَز", "الجملة العادية", "It-cleft"], rows: [
          ["الفاعل (شخص)", "Dana booked the tickets.", "It was ==Dana who== booked the tickets."],
          ["الفاعل (شيء)", "A signal failure caused the delay.", "It was ==a signal failure that== caused the delay."],
          ["المفعول", "We needed a map.", "It was ==a map that== we needed."],
          ["الزمان", "The strike began in March.", "It was ==in March that== the strike began."],
          ["المكان", "We lost our bags at the border.", "It was ==at the border that== we lost our bags."],
          ["السبب", "The bus stopped because of the snow.", "It was ==because of the snow that== the bus stopped."],
          ["عبارة ظرفية", "We understood only when we arrived.", "It was ==only when we arrived that== we understood."],
          ["Not until (شائعة في الامتحان)", "The last bus did not arrive until midnight.", "It was ==not until midnight that== the last bus arrived."]
        ] } },
        { p: "**قواعد مهمة:** (أ) بعد العنصر المُبرَز نستخدم **that** (أو **who** إذا كان شخصاً)، ولا نستخدم what أو where أو when في امتحان القواعد. (ب) تبقى **It was / It is** مفردة حتى لو كان العنصر جمعاً: It was **the drivers** who started the strike. (ج) يتفق الفعل بعد who / that مع العنصر المُبرَز: It is **Hala** who has the tickets. / It is **the buses** that are late." },
        { p: "ونستخدم الـ It-cleft كثيراً للمقابلة والتصحيح، وفي الأسئلة أيضاً:" },
        { ex: [
          ["It wasn't the price that bothered me; ==it was the delay==.", "لم يكن السعر هو ما أزعجني، بل التأخير."],
          ["Was it the delay ==that== upset you?", "هل كان التأخير هو ما أزعجك؟"],
          ["Who was it ==that== left the door open?", "مَن الذي ترك الباب مفتوحاً؟"]
        ] },
        { h: "2) الـ Wh-cleft (pseudo-cleft):  What … is …" },
        { p: "نبدأ بجملة اسمية تبدأ بـ **What** تصف الشيء أو الفعل أو المشكلة، ثم **is / was**، ثم **العنصر المُبرَز في آخر الجملة** (حيث يقع الثقل والتوكيد). وما بعد is / was قد يكون:" },
        { table: { head: ["ما بعد is / was", "مثال"], rows: [
          ["اسم أو عبارة اسمية", "What I need is ==a quiet seat==."],
          ["فعل (مع to أو بدونها) إذا كان فعل What هو do", "What she did was ==(to) apologise== at once."],
          ["جملة تبدأ بـ that", "What happened was ==that the signal failed==."],
          ["اسم فعلي (-ing)", "What I enjoy most is ==walking along the beach==."]
        ] } },
        { p: "ولدينا بدائل لكلمة What: **All (that) I want is…** (الشيء الوحيد الذي أريده)، **The thing that…**، **The place where…**، **The person who…**، **The reason (why)… is that…**" },
        { ex: [
          ["==What I love about this city is== its friendly people.", "ما أحبه في هذه المدينة هو لطف أهلها."],
          ["==All we need is== a faster bus service.", "كل ما نحتاجه هو خدمة حافلات أسرع."],
          ["==The place where== we met ==was== the old railway station.", "المكان الذي التقينا فيه هو محطة القطار القديمة."],
          ["==The reason why== the flight was delayed ==is that== the crew were stuck in traffic.", "سبب تأخّر الرحلة هو أن الطاقم علق في الازدحام."],
          ["==What worries many people about space tourism is== its cost.", "ما يقلق كثيرين بشأن السياحة الفضائية هو كلفتها."],
          ["==What scientists fear most is== a collision between satellites and space junk.", "أكثر ما يخشاه العلماء هو اصطدام الأقمار الصناعية بحطام الفضاء."]
        ] },
        { p: "ويمكن عكس الترتيب فيأتي العنصر المُبرَز في أول الجملة وتتأخر جملة What: **A faster bus service is what we need.** (reversed pseudo-cleft)." },
        { tip: "إذا كان الفعل في جزء What هو **do** (What I did / What he does) فإن ما بعد was / is يكون فعلاً: What he did ==was shout== (أو was to shout). وتذكّر أن زمن was / is يتبع زمن الجملة: What worried me **was** … / What worries me **is** …" },
        { warn: "✗ The reason why he left was because he was ill. ← ✓ The reason why he left was ==that== he was ill. في الأسلوب الرسمي تُعدّ reason … because مكرّرة، لأن كلمة reason تحمل معنى because." },
        { h: "3) التقديم (Fronting)" },
        { p: "نقدّم عنصراً من الجملة (غير الفاعل غالباً) إلى أولها لنُبرزه أو نقابل به أو نربطه بما قبله، أو لنخلق مشهداً أدبياً. أهم الأنواع:" },
        { table: { head: ["النوع", "الترتيب", "مثال"], rows: [
          ["ظرف مكان أو اتجاه + فعل حركة أو وضع + الفاعل (بلا do)", "Place + Verb + Subject", "Into the room ==walked a tall guard==. / On the wall ==hung a faded map==. / Here ==comes the bus==."],
          ["صفة أو صيغة فعلية (V3 أو V-ing) كـ complement + be + الفاعل", "Complement + be + Subject", "==Gone are the days== of paper tickets. / ==Waiting at the gate were== two customs officers."],
          ["المفعول إلى أول الجملة (بلا قلب)", "Object + Subject + Verb", "==This idea== I cannot accept. / Travel I love; queuing I hate."],
          ["صفة + as + فاعل + فعل (بمعنى although)", "Adjective + as + S + V", "==Exhausted as== they were, the hikers pressed on."]
        ] } },
        { ex: [
          ["Down the platform ==ran the guard==, waving his flag.", "ركض الحارس على الرصيف وهو يلوّح بعلمه."],
          ["==Gone were the days== when we queued at ticket windows.", "ولّت الأيام التي كنا نقف فيها في طوابير شبابيك التذاكر."],
          ["==Not a word did== he say about the delay.", "لم ينطق بكلمة عن التأخير. (مفعول منفي مقدَّم ← قلب)"],
          ["The conference was a success. ==Particularly impressive was== the opening talk.", "كان المؤتمر ناجحاً. وأكثر ما أثار الإعجاب الكلمة الافتتاحية. (التقديم يربط الجملة بما قبلها)"]
        ] },
        { p: "**ملاحظات على النوع الأول:** (أ) الفعل يأتي **قبل** الفاعل الاسمي ولا نستخدم do / did. (ب) يتفق الفعل مع الفاعل الذي يأتي **بعده**: Waiting at the gate **were** two customs officers. (ج) إذا كان الفاعل **ضميراً** (he, she, it, they) فلا يحدث قلب: Here ==it comes==! / Down the steps ==they rushed==." },
        { h: "4) متى يكون كل تركيب طبيعياً؟" },
        { table: { head: ["التركيب", "الأسلوب", "متى نستخدمه؟"], rows: [
          ["Inversion بعد Never / Rarely / Only …", "رسمي أو أدبي", "لإبراز الندرة أو الدرجة أو المفاجأة: Rarely have I seen …"],
          ["It-cleft", "رسمي وغير رسمي", "لتحديد أو تصحيح: مَن؟ متى؟ أين؟ لماذا؟  It was the noise, not the heat, that …"],
          ["Wh-cleft", "شائع جداً في الكلام والعروض التقديمية", "لتقديم نقطة أو إبداء رأي: What I'd like to do today is …"],
          ["Fronting مع القلب", "أدبي أو رسمي", "لوصف مشهد وبناء التشويق: Into the station poured …"],
          ["Fronting للمفعول", "حواري أو بلاغي", "للمقابلة والتوكيد: This I cannot accept."]
        ] } },
        { tip: "لا تُكثر منها! جملة أو جملتان مؤكِّدتان في الفقرة تكفيان؛ الإكثار يجعل الأسلوب متكلَّفاً ويُضعف التوكيد. اختر التركيب الذي يخدم النقطة الأهم فعلاً." },
        { warn: "✗ It were my cousins who called. ← ✓ It ==was== my cousins who called. تبقى It مع was المفردة مهما كان العنصر المُبرَز." },
        { warn: "✗ It was the driver who he stopped the bus. ← ✓ It was the driver ==who stopped== the bus. لا نكرّر الضمير بعد who / that (خطأ شائع بتأثير العربية)." },
        { warn: "✗ Into the room walked he. ← ✓ Into the room ==he walked== / Into the room ==walked the teacher==. مع الضمير لا يحدث قلب." },
        { warn: "✗ Gone the days are. ← ✓ Gone ==are the days==. الترتيب: complement + be + الفاعل." },
        { warn: "✗ What happened it was that the engine failed. ← ✓ What happened ==was== that the engine failed. لا نضيف ضميراً (it) قبل was." },
        { tip: "نصيحة للامتحان: عبارة Rewrite starting with ‘It was…’ تعني It-cleft، وعبارة ‘What…’ تعني Wh-cleft. حدّد العنصر الذي يريد السؤال إبرازه (غالباً الكلمة المشدَّد عليها أو التي تأتي بعد not) وضعه بعد was، ثم تذكّر that / who." }
      ],
      summary: [
        "It-cleft: It + was / is + العنصر المُبرَز + that (who للأشخاص) + باقي الجملة: It was Rami who found it.",
        "تبقى It مع was المفردة، وبعد العنصر المُبرَز نستخدم that / who فقط ولا نكرّر الضمير.",
        "Wh-cleft: What + جملة + is / was + العنصر: What I need is …؛ All I want is …؛ The reason is that …",
        "Fronting: ظرف مكان + فعل + فاعل (Into the room walked …)، وcomplement + be + فاعل (Gone are the days …)، ومع الضمير لا قلب.",
        "القلب وتقديم الظرف رسميان أو أدبيان، والـ Wh-cleft شائع في الكلام، والـ It-cleft للتحديد والتصحيح. لا تُكثر منها."
      ],
      qs: [
        { t: "mcq", q: "____ was Ranya who first noticed the smoke.", o: ["It", "That", "What", "There"], a: 0, x: "الـ It-cleft: It was + العنصر المُبرَز + who ← It was Ranya who …" },
        { t: "mcq", q: "It was in Aqaba ____ we first went snorkelling.", o: ["what", "that", "who", "whose"], a: 1, x: "بعد العنصر المُبرَز (in Aqaba) نستخدم that." },
        { t: "mcq", q: "What I like most about travelling ____ the chance to meet new people.", o: ["are", "does", "is", "has"], a: 2, x: "جملة What … تُعامل كمفرد ويأتي بعدها الفعل be ← is." },
        { t: "gap", q: "____ was the noise, not the heat, that kept us awake all night.", a: ["It", "it"], x: "It was … that: نبرز noise ونصحّح بـ not the heat." },
        { t: "mcq", q: "What happened was ____ the fog got so thick that the airport closed.", o: ["because", "for", "which", "that"], a: 3, x: "بعد What happened was نأتي بجملة تبدأ بـ that ← What happened was that …" },
        { t: "mcq", q: "Gone ____ the days when we queued for hours at the ticket office.", o: ["is", "are", "has", "be"], a: 1, x: "Gone + be + الفاعل: الفعل يتفق مع الفاعل الجمع the days الذي يأتي بعده ← are." },
        { t: "gap", q: "It was only when we reached the top ____ we saw the whole valley.", a: ["that"], x: "في الـ It-cleft نستخدم that بعد العنصر المُبرَز (only when we reached the top)." },
        { t: "mcq", q: "Which sentence puts the emphasis on WHEN the accident happened? (The accident happened at rush hour.)", o: ["What happened was the accident at rush hour.", "It was the accident that happened at rush hour.", "It was at rush hour that the accident happened.", "It was at rush hour what the accident happened."], a: 2, x: "لإبراز الزمان نضع العبارة الزمنية (at rush hour) بين It was و that. أما الخياران الأولان فيبرزان الحادث نفسه، وأما الأخير ففيه خطأ (what بدل that)." },
        { t: "tr", q: "Sara found the lost wallet.", p: "Rewrite starting with: It was … (stress WHO found it)", a: ["It was Sara who found the lost wallet.", "It was Sara that found the lost wallet."], x: "طُلب إبراز الشخص (مَن وجد؟) فنضع الفاعل Sara بين It was وwho / that ثم باقي الجملة. (لو أردنا إبراز المفعول لقلنا: It was the lost wallet that Sara found.)" },
        { t: "mcq", q: "When the doors opened, the students ran out. Down the steps ____, laughing.", o: ["they ran", "ran they", "did they run", "run they"], a: 0, x: "عند تقديم ظرف المكان مع فاعل ضمير (they) لا يحدث قلب: Down the steps they ran." },
        { t: "gap", q: "Around the corner ____ (come) a speeding scooter, and everyone jumped aside.", a: ["came"], x: "ظرف مكان مقدَّم + فعل + فاعل بلا do، والسياق في الماضي ← Around the corner came …" },
        { t: "mcq", q: "What the guide did ____ to check every passport twice.", o: ["did", "has", "were", "was"], a: 3, x: "What the guide did was (to) check … : بعد was نأتي بالفعل (مع to أو بدونها)." },
        { t: "err", q: "It were the drivers who started the strike.", w: "were", c: "was", x: "تبقى It مع was المفردة حتى لو كان العنصر المُبرَز جمعاً (the drivers)." },
        { t: "tr", q: "The empty driver's seat surprised me most.", p: "Rewrite starting with: What …", a: ["What surprised me most was the empty driver's seat.", "What surprised me the most was the empty driver's seat.", "What most surprised me was the empty driver's seat."], x: "Wh-cleft: What + الفعل + (me) + is / was + العنصر المُبرَز في آخر الجملة." },
        { t: "mcq", q: "Waiting at the gate ____ two customs officers.", o: ["was", "had", "were", "did"], a: 2, x: "الفاعل الحقيقي two customs officers (جمع) ويأتي بعد الفعل ← were." },
        { t: "tr", q: "The days of paper tickets have gone.", p: "Rewrite starting with: Gone …", a: ["Gone are the days of paper tickets."], x: "Complement + be + الفاعل ← Gone are the days of paper tickets." },
        { t: "err", q: "It was my parents which taught me to be patient.", w: "which", c: "who (or that)", x: "في الـ It-cleft نستخدم who أو that مع الأشخاص، وليس which." },
        { t: "order", a: "It was the guide who warned us about the delay.", x: "It was + العنصر المُبرَز (the guide) + who + باقي الجملة." }
      ]
    }
  ],
  reading: {
    title: "Follow the Colour",
    text: [
      "The escalator carried Tala down into the earth, and with every metre she descended, the noise grew louder. Never had she felt so small. It was her first evening alone in a foreign capital, far from Amman; her phone had died over the sea, and her only guide was a note from her teacher: ‘Blue line to Millbrook.’ She would have to rely on that scrap of paper and on luck.",
      "At the bottom, the crowd took hold of her. Commuters surged out of an arriving train, strode past in dark coats and flowed up the stairs like water. A man with a huge backpack collided with her, muttered something and was gone. Her suitcase wobbled, she stumbled, and she clung to the wall while hundreds of strangers hurried by. She longed to ask someone for directions, yet every face looked far too busy for her to do so.",
      "Ahead, the passage divided in two, one branch signed ‘Eastgate’ and the other ‘Harbour’. The former was packed; the latter was almost empty. Tala had no idea which she needed, so she followed the crowd. She shuffled forward in a slow queue and squeezed on to a train that lurched through the darkness while she counted the stops. Only after six of them did she realise that Millbrook had never been announced. Such mistakes, she thought miserably, happened to other people.",
      "She alighted at the next station, her confidence faltering, and trudged along a tunnel that seemed endless. A small boy darted between the commuters, an old man hobbled past on a stick, and a woman staggered under a tower of boxes. Nobody seemed to notice Tala. When the crowd had dispersed, she sat on a bench and parked her panic, forcing herself to think.",
      "‘Lost?’ said a voice. The old man who had hobbled past earlier was sitting beside her. She nodded. ‘Everybody is, at first,’ he said kindly. ‘But you are watching the wrong thing. It is the colour you should follow, not the crowd.’ He pointed to a blue stripe painted along the wall. ‘Will it take me to Millbrook?’ she asked. ‘I believe so,’ he replied, ‘and if not, you can always ask again.’",
      "It was such a simple idea that Tala almost laughed. She thanked him, followed the stripe through two long passages and bolted for the right train as its doors began to close. When she climbed out into the evening light, a boy with a rucksack was frowning at a map, wearing the very same expression she had worn an hour earlier. Tala hesitated for only a second. Then she walked up to him and asked, ‘Where are you trying to go?’"
    ],
    skill: "Understanding reference devices",
    skillAr: "فهم أدوات الإحالة (الضمائر وكلمات الربط المرجعية)",
    skillTip: "يتجنّب الكاتب التكرار فيستعمل كلمات تُحيل إلى شيء ذُكر قبلها (وأحياناً بعدها): ضمائر مثل it وthey وthem، وكلمات الإشارة this وthat وthese وthose، وكلمات مثل such وso وthe same، وthe former / the latter (الأول / الأخير من اثنين)، وdo so (تعوّض فعلاً وما يتبعه). عندما تجد كلمة كهذه ابحث عمّا قبلها، ثم ضع المرجع المقترح مكانها وتأكد أن المعنى سليم وأن العدد (مفرد / جمع) والعاقل / غير العاقل منسجمان.",
    gloss: [
      ["descended", "نزلت إلى مستوى أدنى"], ["surged", "اندفعوا بقوة كالموجة"], ["strode", "مشَوا بخطوات واسعة وواثقة"], ["collided with", "اصطدم بـ"],
      ["muttered", "تمتم بصوت خافت"], ["wobbled", "اهتزّت / تأرجحت لعدم الثبات"], ["clung to", "تشبّثت بـ"], ["shuffled", "تحرّكت ببطء وهي تجرّ قدميها"],
      ["lurched", "ارتجّ / تمايل فجأة وبعنف"], ["alighted", "نزلت من (القطار)"], ["faltering", "يتردّد ويضعف"], ["trudged", "مشت بثقل وإعياء"],
      ["hobbled", "مشى وهو يعرج"], ["staggered", "ترنّحت (من الثقل)"], ["parked her panic", "وضعت ذعرها جانباً (استعمال مجازي)"], ["bolted", "هرعت راكضة بسرعة"]
    ],
    gist: [
      "تنزل تالا وحدها إلى مترو مدينة غريبة، وهاتفها مطفأ وليس معها إلا ورقة صغيرة.",
      "يبتلعها الزحام فتتعثّر وتتشبّث بالجدار، وتتمنى أن تسأل أحداً لكن الجميع مشغولون.",
      "تتبع الحشد وتركب قطاراً خاطئاً، وتكتشف بعد ست محطات أن محطتها لم تُذكر.",
      "تنزل في المحطة التالية وتتيه في الأنفاق، ثم تضع ذعرها جانباً لتفكّر.",
      "يعلّمها رجل مسنّ أن تتبع اللون المرسوم على الجدار لا الزحام.",
      "تتبع تالا الشريط الأزرق فتصل، وفي النهاية تبادر إلى مساعدة صبي ضائع مثلها."
    ],
    tr: [
      "حملها السلّم المتحرك إلى باطن الأرض، وكلما هبطت متراً ازداد الضجيج ارتفاعاً. لم تشعر قط بأنها صغيرة إلى هذا الحد. كانت أمسيتها الأولى وحدها في عاصمة أجنبية، بعيدة عن عمّان؛ فقد انطفأ هاتفها فوق البحر، وكان دليلها الوحيد ورقة كتبتها لها معلمتها: «الخط الأزرق إلى ميلبروك». وكان عليها أن تعتمد على قصاصة الورق تلك وعلى الحظ.",
      "في الأسفل، أمسك بها الزحام. اندفع الركاب من قطار قادم، ومرّوا بجانبها بخطوات واسعة في معاطف داكنة، وانسابوا على الدرج كالماء. اصطدم بها رجل يحمل حقيبة ظهر ضخمة، وتمتم بشيء ثم اختفى. اهتزّت حقيبتها، وتعثّرت، وتشبّثت بالجدار بينما كان مئات الغرباء يمرّون مسرعين. كانت تتوق إلى أن تسأل أحداً عن الطريق، لكن كل وجه بدا مشغولاً أكثر من أن تفعل ذلك.",
      "في الأمام، انقسم الممر إلى فرعين، كُتب على أحدهما «إيستغيت» وعلى الآخر «هاربر». كان الأول مزدحماً، أما الثاني فشبه خالٍ. لم تكن تالا تعرف أيهما تحتاج، فتبعت الحشد. تقدّمت في طابور بطيء، وحشرت نفسها في قطار كان يترنّح عبر العتمة بينما تعدّ المحطات. وبعد ست محطات فقط أدركت أن «ميلبروك» لم يُعلَن عنها قط. وفكّرت بأسى أن مثل هذه الأخطاء لا تقع إلا للآخرين.",
      "نزلت في المحطة التالية وقد بدأت ثقتها تهتزّ، وسارت بتثاقل في نفق بدا بلا نهاية. اندفع صبي صغير بين الركاب، ومرّ رجل مسنّ يعرج مستنداً إلى عصا، وترنّحت امرأة تحت برج من الصناديق. وبدا أن أحداً لم ينتبه إلى تالا. وحين تفرّق الزحام جلست على مقعد، ووضعت ذعرها جانباً، وأجبرت نفسها على التفكير.",
      "«هل تهتِ؟» قال صوت ما. كان الرجل المسنّ الذي مرّ عارجاً قبل قليل يجلس بجانبها. أومأت برأسها. قال بلطف: «الجميع يتيه في البداية. لكنك تنظرين إلى الشيء الخطأ. اللون هو ما ينبغي أن تتبعيه، لا الزحام.» وأشار إلى شريط أزرق مرسوم على الجدار. سألت: «هل سيوصلني إلى ميلبروك؟» فأجاب: «أظن ذلك، وإن لم يفعل فبإمكانك أن تسألي مرة أخرى.»",
      "كانت فكرة بسيطة إلى درجة أن تالا كادت تضحك. شكرته، وتبعت الشريط عبر ممرين طويلين، وهرعت راكضة نحو القطار الصحيح بينما كانت أبوابه تبدأ بالإغلاق. وحين صعدت إلى ضوء المساء، كان صبي يحمل حقيبة ظهر يحدّق عابساً في خريطة، وعلى وجهه التعبير نفسه الذي ارتسم على وجهها قبل ساعة. تردّدت تالا لثانية واحدة فقط. ثم مشت نحوه وسألته: «إلى أين تحاول الذهاب؟»"
    ],
    qs: [
      { t: "mcq", q: "What is the main message of the story?", o: ["Crowds always know where to go, so travellers should follow them.", "Big cities are too dangerous for young people to travel alone.", "Clear signs and asking for help are more reliable than copying other people.", "Old people understand public transport better than young people."], a: 2, x: "تتعلم تالا أن تتبع اللون (الإشارات) لا الزحام، وتنتهي بأن تعرض المساعدة على غيرها. الخيارات الأخرى تناقض النص أو تعمّم أكثر مما فيه." },
      { t: "mcq", q: "Why could Tala not use her phone to find the way?", o: ["It had been stolen on the train.", "It had stopped working during her flight.", "There was no signal underground.", "She had left it at the airport."], a: 1, x: "الفقرة 1: her phone had died over the sea ← توقف الهاتف عن العمل أثناء الرحلة الجوية." },
      { t: "mcq", q: "In paragraph 2, ‘to do so’ refers to…", o: ["hurry by", "cling to the wall", "follow the crowd", "ask someone for directions"], a: 3, x: "do so تعوّض العبارة الفعلية السابقة: ask someone for directions. فالمعنى: كل وجه بدا مشغولاً أكثر من أن تسأله عن الطريق." },
      { t: "mcq", q: "In paragraph 3, ‘The former’ and ‘the latter’ refer to…", o: ["the Eastgate branch and the Harbour branch", "the Harbour branch and the Eastgate branch", "Tala and the crowd", "the train and the platform"], a: 0, x: "the former = الأول من الاثنين المذكورين (الفرع المكتوب عليه Eastgate)، وthe latter = الأخير (الفرع المكتوب عليه Harbour)." },
      { t: "mcq", q: "In paragraph 3, ‘Such mistakes’ refers to…", o: ["mistakes like getting on a train that goes the wrong way", "mistakes in reading her teacher's note", "mistakes made only by old people", "mistakes made by the station staff"], a: 0, x: "Such mistakes تعود على الجملة السابقة: اكتشفت أنها في قطار لا يمرّ بميلبروك، أي أخطاء من نوع ركوب القطار في الاتجاه الخاطئ." },
      { t: "mcq", q: "In paragraph 5, ‘I believe so’ means that the old man believes…", o: ["Tala is lost", "the crowd should be followed", "he will help her again", "the blue stripe will lead to Millbrook"], a: 3, x: "so تعوّض ما جاء في سؤال تالا: Will it take me to Millbrook? ← I believe (that it will take you to Millbrook)." },
      { t: "mcq", q: "Why did Tala follow the crowd when the passage divided in paragraph 3?", o: ["She knew that the Eastgate train went to Millbrook.", "A guard told her to go that way.", "She did not know which way she needed, so she copied everyone else.", "The other branch was closed."], a: 2, x: "الفقرة 3: Tala had no idea which she needed, so she followed the crowd ← لم تعرف أي فرع تحتاج فقلّدت الآخرين." },
      { t: "mcq", q: "What advice does the old man give Tala?", o: ["To ask every passenger for directions.", "To use the coloured line instead of copying other passengers.", "To wait on the bench until the station is empty.", "To take whichever train has the most people on it."], a: 1, x: "It is the colour you should follow, not the crowd ← اتبعي اللون (الشريط الملوّن) لا الحشد." },
      { t: "tf", q: "Tala asked a stranger for help as soon as she reached the bottom of the escalator.", a: false, x: "الفقرة 2: كانت تتمنى أن تسأل لكن كل الوجوه بدت مشغولة، فلم تفعل." },
      { t: "find", q: "Find a word in paragraph 4 that means ‘walked slowly with heavy, tired steps’.", a: ["trudged"], x: "trudged = مشت بثقل وإعياء." },
      { t: "open", q: "How is Tala different at the end of the story from how she was in paragraph 2? Use evidence from the text.", m: "In paragraph 2 she longed to ask for directions but could not bring herself to do so. At the end she walks up to a boy who looks as lost as she was and asks where he is trying to go. She has learnt from the old man and become more confident and helpful.", x: "الإجابة الجيدة تقارن بين تردّدها في الفقرة 2 (to do so) ومبادرتها في النهاية بسؤال الصبي." }
    ]
  },
  writing: {
    type: "Letter of complaint (formal email)",
    ar: "رسالة شكوى (بريد إلكتروني رسمي)",
    about: "رسالة الشكوى الرسمية (بريد إلكتروني أو خطاب) تُوجَّه إلى شركة أو مدير لتشرح ما حدث وما سبّبه من ضرر، وتطلب حلاً محدداً. أسلوبها **رسمي ومهذّب لكنه حازم**: بلا غضب ولا شتائم ولا اختصارات (I am وليس I'm)، مع وقائع مرتبة زمنياً وتفاصيل محددة (تواريخ وأرقام)، ثم مطلب واضح وموعد نهائي. الطول المعتاد 200–250 كلمة. نبدأ بـ Dear Mr / Ms + اسم العائلة وننهي بـ Yours sincerely، أو نبدأ بـ Dear Sir or Madam وننهي بـ Yours faithfully.",
    plan: [
      { part: "Subject line and greeting", ar: "سطر الموضوع والتحية", tip: "اكتب موضوعاً محدداً يذكر المشكلة والتاريخ ورقم الحجز (Complaint about … booked for 12 March)، ثم تحية رسمية مثل Dear Mr Haddad, أو Dear Sir or Madam," },
      { part: "Opening paragraph", ar: "فقرة الافتتاح (الغرض)", tip: "اذكر سبب الكتابة في جملة واحدة (I am writing to complain about …) مع تفاصيل الحجز، ويمكنك إضافة جملة تنازل تقابل بين الوعد والواقع (Although the brochure promised …)." },
      { part: "Body 1: what happened", ar: "ماذا حدث؟", tip: "اعرض الوقائع بترتيب زمني. استخدم المبني للمجهول لإبراز الحدث لا الفاعل (No explanation was given, our complaints were dismissed) وأدوات الربط (To begin with, Furthermore)." },
      { part: "Body 2: effects and your response", ar: "الآثار وما فعلتَه", tip: "اشرح الضرر (مال، وقت، راحة) وما حاولت فعله، وعبّر عن خيبة أملك بكلمات قوية ومهذبة، وأضف جملة توكيد (What disappointed us most was … / Not once were we offered …) وظرف تعليق مثل Realistically أو Ultimately." },
      { part: "Closing paragraph", ar: "الخاتمة: المطلوب والموعد", tip: "اطلب حلاً محدداً (a full refund, compensation) ومهلة (within 14 days) وبيّن ما ستفعله إن لم يُحل الأمر. اختم بعبارة مهذبة ثم التوقيع المناسب للتحية." }
    ],
    phrases: [
      { en: "I am writing to complain about…", ar: "أكتب لأشتكي من …", use: "افتتاح الرسالة" },
      { en: "I am writing to express my dissatisfaction with…", ar: "أكتب لأعبّر عن عدم رضاي عن …", use: "افتتاح أكثر رسمية" },
      { en: "Although the brochure promised …, we received …", ar: "مع أن الكتيّب وعد بـ …، فقد تلقّينا …", use: "جملة تنازل (concession) بـ although" },
      { en: "Despite having booked well in advance, …", ar: "رغم أنني حجزت مسبقاً بوقت كافٍ، …", use: "تنازل: despite + V-ing" },
      { en: "While I appreciate that delays can occur, …", ar: "مع تقديري أن التأخير قد يحدث، …", use: "تنازل مهذّب يخفف حدّة الشكوى" },
      { en: "No explanation was given. / We were told that …", ar: "لم يُقدَّم أي تفسير. / قيل لنا إن …", use: "المبني للمجهول لعرض الوقائع دون اتهام مباشر" },
      { en: "Not once were we offered an apology.", ar: "لم يُعرض علينا اعتذار ولو مرة واحدة.", use: "قلب (inversion) للتوكيد" },
      { en: "What disappointed us most was …", ar: "أكثر ما خيّب أملنا هو …", use: "Wh-cleft للتوكيد" },
      { en: "It was the lack of any information that …", ar: "كان غياب أي معلومات هو ما …", use: "It-cleft للتوكيد" },
      { en: "Ultimately, the responsibility lies with your company.", ar: "في المحصلة، المسؤولية تقع على شركتكم.", use: "ظرف تعليق في أول الجملة" },
      { en: "Realistically, no passenger can be expected to …", ar: "من الناحية الواقعية، لا يمكن توقّع أن …", use: "ظرف تعليق في أول الجملة" },
      { en: "I would be grateful if you could look into this matter.", ar: "سأكون ممتنّاً لو نظرتم في هذا الأمر.", use: "طلب مهذّب" },
      { en: "I would expect a full refund within 14 days.", ar: "أتوقّع استرداد المبلغ كاملاً خلال 14 يوماً.", use: "مطلب حازم" },
      { en: "If I do not receive a satisfactory reply, I shall have to take the matter further.", ar: "إن لم أتلقَّ رداً مرضياً فسأضطر إلى متابعة الأمر.", use: "تحذير مهذّب" },
      { en: "I look forward to your prompt reply.", ar: "أتطلّع إلى ردّكم السريع.", use: "خاتمة" },
      { en: "Yours faithfully, / Yours sincerely,", ar: "وتفضّلوا بقبول فائق الاحترام", use: "faithfully مع Dear Sir or Madam، وsincerely مع اسم المرسَل إليه" }
    ],
    task: "You booked a two-day guided trip to Wadi Rum for your family through a travel agency, Horizon Adventures. The minibus from Amman arrived two hours late, so you missed the sunset jeep tour. The ‘luxury’ camp had no hot water, and the staff were unhelpful and offered no apology. Write a formal email (200–250 words) to the manager, Mr Haddad, explaining what went wrong and what you expect the agency to do.",
    taskAr: "حجزتَ لعائلتك رحلة سياحية مصحوبة بمرشد إلى وادي رم لمدة يومين عبر وكالة سفر. وصلت الحافلة الصغيرة من عمّان متأخرة ساعتين فضاعت عليكم جولة الجيبات وقت الغروب، ولم يكن في المخيّم «الفاخر» ماء ساخن، وكان الموظفون غير متعاونين ولم يعتذروا. اكتب بريداً إلكترونياً رسمياً إلى المدير السيد حدّاد تشرح فيه ما حدث وما تتوقعه من الوكالة.",
    words: [200, 250],
    model: [
      "Subject: Complaint about the Wadi Rum tour booked for 12–13 March (Booking No. 4471)",
      "Dear Mr Haddad,",
      "I am writing to express my deep dissatisfaction with the two-day Wadi Rum trip that my family booked through your agency. Although the brochure promised a ‘seamless, luxury experience’, we received nothing of the kind.",
      "To begin with, the minibus from Amman arrived two hours late, and no explanation was given. As a result, the sunset jeep tour, which was the main reason for our booking, had finished before we reached the camp. Not once were we offered an apology. Furthermore, the ‘luxury’ tents had no hot water, and our complaints to the camp manager were dismissed.",
      "What disappointed us most was the attitude of your staff. When I telephoned your office that evening, the call went unanswered, and later I was told that ‘these things happen’. Realistically, delays can occur, but a polite explanation costs nothing. Ultimately, we paid a premium price for a service that was never delivered.",
      "I would therefore be grateful if you could refund the cost of the sunset tour and half of the accommodation fee within 14 days. I have attached a copy of the booking confirmation. If I do not receive a satisfactory reply, I shall have to take the matter further.",
      "I look forward to your prompt response.",
      "Yours sincerely,",
      "Rana Khalil"
    ],
    check: [
      "هل كتبتَ سطر موضوع واضحاً وتحية مناسبة (Dear Mr / Ms … أو Dear Sir or Madam) وخاتمة تتوافق معها (Yours sincerely / faithfully)؟",
      "هل ذكرتَ الغرض من الرسالة في جملتها الأولى مع تفاصيل الحجز؟",
      "هل عرضتَ الوقائع بترتيب زمني منطقي مع تفاصيل محددة (تواريخ وأرقام)؟",
      "هل استخدمتَ جملة تنازل واحدة على الأقل (although / despite / while) وبعض الجمل المبنية للمجهول؟",
      "هل أضفتَ توكيداً مدروساً (What disappointed us most was … / Not once were we …) دون إفراط؟",
      "هل بدأتَ جملة أو جملتين بظرف تعليق مثل Realistically أو Ultimately؟",
      "هل الأسلوب مهذّب لكنه حازم، بلا غضب ولا تهديد فجّ ولا اختصارات (I'm, don't)؟",
      "هل طلبتَ حلاً محدداً وموعداً نهائياً، وهل عدد الكلمات ضمن المطلوب؟"
    ]
  },
  speaking: {
    title: "Considering and comparing alternatives",
    ar: "دراسة البدائل والمقارنة بينها (أنواع السياحة وسياحة «الفرصة الأخيرة»)",
    phrases: [
      { en: "There are a few options on the table: …", ar: "هناك عدة خيارات مطروحة: …", use: "عرض البدائل" },
      { en: "Let's weigh up the options.", ar: "دعونا نوازن بين الخيارات.", use: "بدء المقارنة" },
      { en: "On the one hand, … On the other hand, …", ar: "من ناحية … ومن ناحية أخرى …", use: "مقابلة ميزة بعيب" },
      { en: "One advantage of … over … is that …", ar: "من مزايا … على … أنّ …", use: "مقارنة بين خيارين" },
      { en: "Compared with …, … is far more / less …", ar: "بالمقارنة مع …، فإن … أكثر / أقل بكثير …", use: "مقارنة بصيغة التفضيل" },
      { en: "Whereas … is …, … is …", ar: "بينما … يكون …، فإن … يكون …", use: "إبراز التناقض" },
      { en: "What appeals to me about … is …", ar: "ما يجذبني في … هو …", use: "Wh-cleft لإبراز سبب التفضيل" },
      { en: "The main drawback of … is that …", ar: "العيب الرئيس في … هو أن …", use: "ذكر السلبيات" },
      { en: "It's not so much … as …", ar: "الأمر ليس … بقدر ما هو …", use: "تصحيح زاوية النظر" },
      { en: "If we chose …, we would gain … but lose …", ar: "لو اخترنا … لكسبنا … لكن خسرنا …", use: "تخيّل نتائج الخيار" },
      { en: "That's a fair point, but …", ar: "هذه نقطة وجيهة، لكن …", use: "الاعتراض بأدب" },
      { en: "I'm leaning towards … because …", ar: "أميل إلى … لأن …", use: "التعبير عن ميل أولي" },
      { en: "All things considered, I'd opt for …", ar: "بعد النظر في كل شيء، سأختار …", use: "الوصول إلى قرار" },
      { en: "It's a kind of last-chance tourism – seeing a place before it disappears.", ar: "إنها نوع من سياحة «الفرصة الأخيرة» – زيارة مكان قبل أن يزول.", use: "وصف نوع سياحي" },
      { en: "Both have their merits, but …", ar: "لكلٍّ منهما مزاياه، لكن …", use: "الاعتراف بإيجابيات الخيارين" },
      { en: "Would you agree that …?", ar: "هل توافق على أن …؟", use: "طلب رأي الطرف الآخر" }
    ],
    dialogue: [
      ["Lina", "So, we have three options for the class trip: a hiking weekend in Dana, a city break in Cairo, or a day at the Dead Sea."],
      ["Omar", "Let's weigh them up. On the one hand, Dana would be cheap and healthy. On the other hand, most of us have hiked there before."],
      ["Lina", "True. Compared with Dana, a city break is far more exciting, but it would cost a great deal more."],
      ["Omar", "What appeals to me about the Dead Sea is that it's a kind of last-chance tourism: seeing a place before it changes for ever. The water level keeps dropping every year."],
      ["Lina", "That's a fair point, but couldn't more visitors damage the shoreline even faster? That's the main drawback."],
      ["Omar", "It's not so much whether we go as how we go. A small group with a local guide would have much less impact."],
      ["Lina", "Good thinking. All things considered, I'm leaning towards Dana. It's the cheapest and the greenest option."],
      ["Omar", "I'd rather go to the Dead Sea, but I can live with Dana if we plan a Dead Sea day trip for next year."],
      ["Lina", "Deal. Shall we put both ideas to a vote on Sunday?"],
      ["Omar", "Sounds good. Whichever wins, at least we've compared the alternatives properly."]
    ]
  },
  test: [
    { t: "mcq", q: "The exhausted hikers ____ up the last slope, too tired to speak.", o: ["darted", "trudged", "surged", "bolted"], a: 1, k: "vocab", x: "trudge = يمشي بثقل وإعياء، وهو المناسب لمتنزّهين منهَكين. أما darted وbolted وsurged فتدلّ على سرعة واندفاع." },
    { t: "mcq", q: "Ever since its founder retired, the club has been ____, and fewer members come every year.", o: ["plain sailing", "a driving force", "in the same boat", "going downhill"], a: 3, k: "vocab", x: "going downhill = يتدهور حاله، وهو ما يتفق مع تناقص الأعضاء. plain sailing تعني أمراً سهلاً بلا مشكلات، وa driving force قوة دافعة إيجابية." },
    { t: "mcq", q: "There was a public ____ when the council announced it would close the only bus route to the village.", o: ["outcry", "outset", "outlook", "getaway"], a: 0, k: "vocab", x: "outcry = احتجاج شعبي قوي. أما outset فهي البداية، وoutlook التوقعات، وgetaway إجازة قصيرة." },
    { t: "mcq", q: "Since the new motorway opened, journey times have ____ improved.", o: ["deeply", "gravely", "drastically", "heavily"], a: 2, k: "vocab", x: "المتلازمة الصحيحة drastically improved = تحسّن جذرياً. أما deeply فتأتي مع disappointed، وgravely مع mistaken." },
    { t: "mcq", q: "The strike had a ____ on schools, hospitals and shops across the city.", o: ["fair share", "knock-on effect", "breakneck speed", "driving force"], a: 1, k: "vocab", x: "have a knock-on effect on = يترك أثراً متسلسلاً غير مباشر في. العبارات الأخرى لا تتفق مع have a … on." },
    { t: "mcq", q: "Hardly ____ the signal been repaired when another fault appeared.", o: ["had", "has", "did", "was"], a: 0, k: "g12u2-gr1", x: "Hardly + had + فاعل + V3 … when ← Hardly had the signal been repaired when … (Past perfect مبني للمجهول)." },
    { t: "mcq", q: "Which sentence means the same as: ‘The passengers did not realise the danger until the doors jammed.’?", o: ["Not until the doors jammed the passengers realised the danger.", "Not until did the doors jam the passengers realised the danger.", "Not until the doors jammed realised the passengers the danger.", "Not until the doors jammed did the passengers realise the danger."], a: 3, k: "g12u2-gr1", x: "Not until + عبارة ظرفية (the doors jammed) ثم القلب في الجملة الرئيسية: did the passengers realise. الخيارات الأخرى بلا قلب أو بترتيب خاطئ." },
    { t: "mcq", q: "Which sentence means the same as: ‘The queue was so long that many people gave up.’?", o: ["So long the queue was that many people gave up.", "So was the queue long that many people gave up.", "So long was the queue that many people gave up.", "Such long was the queue that many people gave up."], a: 2, k: "g12u2-gr1", x: "So + صفة + be + فاعل + that ← So long was the queue that … ولا نستخدم Such مع الصفة وحدها." },
    { t: "mcq", q: "A: I haven't tried a driverless taxi yet.  B: ____.", o: ["So have I", "Neither have I", "Neither haven't I", "Nor I have"], a: 1, k: "g12u2-gr1", x: "الجملة الأولى منفية (haven't) ← Neither have I. ولا نجمع Neither مع نفي آخر، ويجب قلب المساعد والفاعل." },
    { t: "mcq", q: "It was the lack of information, not the delay itself, ____ upset the passengers.", o: ["what", "who", "that", "why"], a: 2, k: "g12u2-gr2", x: "الـ It-cleft: بعد العنصر المُبرَز (غير الشخص) نستخدم that. who للأشخاص فقط، وwhat وwhy لا تُستخدمان هنا." },
    { t: "mcq", q: "Which sentence means the same as: ‘The lack of legroom disappointed her most.’?", o: ["It disappointed her most was the lack of legroom.", "What the lack of legroom disappointed her most.", "The lack of legroom what disappointed her most.", "What disappointed her most was the lack of legroom."], a: 3, k: "g12u2-gr2", x: "الـ Wh-cleft: What + الفعل (disappointed her most) + was + العنصر المُبرَز في آخر الجملة." },
    { t: "mcq", q: "Which sentence is correct?", o: ["Into the compartment walked a tired, dusty traveller.", "Into the compartment walked he, tired and dusty.", "Into the compartment did walk a tired traveller.", "Into the compartment a tired traveller walked the."], a: 0, k: "g12u2-gr2", x: "ظرف المكان المقدَّم + فعل + فاعل اسمي بلا did. ومع الضمير he لا يحدث قلب (Into the compartment he walked)، والخيار الأخير ترتيبه خاطئ." },
    { t: "mcq", q: "Which sentence means the same as: ‘The strike, not the weather, caused the delay.’?", o: ["The strike was the weather that caused the delay.", "It was the strike that caused the delay, not the weather.", "It was the weather that caused the delay, not the strike.", "What caused the delay it was the strike, not the weather."], a: 1, k: "g12u2-gr2", x: "الـ It-cleft للتحديد والتصحيح: It was the strike that caused the delay, not the weather. الخيار الثالث يعكس المعنى، والرابع فيه ضمير زائد (it)." },
    { t: "mcq", q: "Read the text.\n\nSupporters of driverless cars point out that human error causes most road accidents, so removing the driver should make roads safer. Critics reply that the technology still struggles in heavy rain and in unusual situations. Until those problems are solved, they argue, it would be gravely mistaken to hand over the wheel completely.\n\nWhat do the critics believe?", o: ["Driverless cars are already safer than human drivers.", "Human error is not a cause of road accidents.", "Driverless cars should be banned for ever.", "Driverless cars are not yet reliable enough to replace human drivers completely."], a: 3, k: "reading", x: "gravely mistaken to hand over the wheel completely ← يرى المنتقدون أن من الخطأ الجسيم تسليم القيادة بالكامل لأن التقنية ما زالت غير موثوقة." },
    { t: "mcq", q: "Read the text.\n\nFor now, space tourism is a pastime for the very rich: a single ticket costs a fortune. Supporters say prices will fall, as they did for air travel, and that every flight helps to fund research. Opponents counter that a few minutes of weightlessness do little for science, and that each launch adds to pollution.\n\nIn the text, the verb ‘counter’ is closest in meaning to…", o: ["reply with an opposing argument", "count again", "agree with", "offer a lower price"], a: 0, k: "reading", x: "Opponents counter that … = يردّ المعارضون بحجة مضادة، فهم يخالفون المؤيدين. لذلك counter هنا بمعنى reply with an opposing argument." },
    { t: "mcq", q: "Read the passage.\n\nThe old lorry lurched round the final bend, its engine faltering like a tired animal. Hamza stumbled out into the dust, hobbled to the well and stared. Nothing had changed: the same crooked gate, the same silent house. Only the boy who had once darted along this track was gone.\n\nWhat mood does the passage mainly create?", o: ["excitement and humour", "anger and bitterness", "sadness and nostalgia", "fear and panic"], a: 2, k: "reading", x: "Nothing had changed … Only the boy … was gone ← حنين وحزن على الطفولة التي رحلت. والصور (tired animal, silent house) تعزّز جو الأسى." },
    { t: "mcq", q: "Read the text.\n\nThe new tram line was supposed to ease congestion. It has done so, but at a price. Rents near the stations have risen sharply, and many long-term residents can no longer afford to stay. Such side effects are rarely mentioned in the glossy brochures.\n\nWhat does ‘done so’ refer to?", o: ["raised rents near the stations", "eased congestion", "closed the stations", "printed the brochures"], a: 1, k: "reading", x: "done so تعوّض العبارة الفعلية السابقة: It has done so = it has eased congestion." },
    { t: "mcq", q: "Two friends are choosing between a beach holiday and a desert camp. Which reply best compares the alternatives?", o: ["Beach holiday is good. Desert camp is good.", "I don't mind. Whatever you want.", "A beach holiday would be more relaxing, whereas the desert camp offers far more adventure.", "Both are the same, so there is nothing to discuss."], a: 2, k: "speaking", x: "المقارنة الجيدة تضع ميزة كل خيار مقابل الآخر بأداة تقابل مثل whereas مع تفاصيل واضحة." },
    { t: "mcq", q: "Which sentence is the most suitable ending for a formal email of complaint?", o: ["Give me my money back right now or you will be sorry!", "Maybe you could possibly consider thinking about a refund, if it is not any trouble.", "Anyway, thanks a lot; whatever happens is fine with me.", "I would be grateful if you could refund the full cost within 14 days; otherwise, I shall have to take the matter further."], a: 3, k: "writing", x: "الأسلوب المطلوب مهذّب وحازم: طلب محدد مع موعد (within 14 days) ونتيجة مذكورة بأدب. الخيارات الأخرى وقحة أو مترددة أو غير مناسبة." },
    { t: "mcq", q: "Choose the best word to complete this sentence from a letter of complaint: ‘____, no passenger can reasonably be expected to wait four hours without any information.’", o: ["Realistically", "Eventually", "Formerly", "Likewise"], a: 0, k: "writing", x: "Realistically ظرف تعليق في أول الجملة بمعنى «من الناحية الواقعية»، وهو المناسب لعرض حجة منطقية في رسالة شكوى." }
  ]
});

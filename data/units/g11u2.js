TAF.unit({
  id: "g11u2",
  grade: 11, sem: 1, n: 2,
  title: "Looking ahead",
  ar: "نظرة إلى المستقبل",
  topics: "تهديدات البيئة وتغيّر المناخ والطقس، الحيوانات المهدَّدة بالانقراض وجهود إنقاذها، التنبؤ بالمستقبل والتخطيط له، وحلّ المشكلات والعرض الإقناعي",
  goals: [
    "التمييز بين صيغ المستقبل المستخدمة للتوقّع (will وbe going to وmay/might/could وbe likely to وbe bound to) واختيار الأنسب بحسب الدليل ودرجة التأكّد",
    "التعبير عن الخطط والنوايا والترتيبات والآمال باستخدام be going to والمضارع المستمر والمضارع البسيط وwill وbe about to وhope/plan/intend، واستخدام المستقبل المستمر والمستقبل التام مع by وby the time",
    "استخدام مفردات تهديدات البيئة والطقس والحياة البرية، وعبارات السبب والنتيجة (lead to, due to, as a result of…)، ونطق الأسماء المركبة مثل climate change بوضع النبر على الجزء الأول",
    "تحديد الفكرة الرئيسية لكل فقرة والتمييز بينها وبين التفاصيل الداعمة",
    "التعبير عن التردد والاتفاق والاختلاف عند حل المشكلات، وتقديم عرض إقناعي قصير",
    "كتابة رسالة إلكترونية رسمية مهذبة ومنظمة في فقرات واضحة الأغراض"
  ],
  vocab: [
    { w: "deforestation", ar: "إزالة الغابات (قطع الأشجار على نطاق واسع)", pos: "noun", def: "the cutting down of large areas of forest", ex: "Deforestation is a major problem in tropical countries, where huge areas of forest are cleared for farming.", tag: "threats to the environment" },
    { w: "desertification", ar: "التصحّر", pos: "noun", def: "the process in which fertile land slowly turns into desert", ex: "Planting trees and grass can slow down desertification at the edge of the desert.", tag: "threats to the environment" },
    { w: "drought", ar: "الجفاف (فترة قحط)", pos: "noun", def: "a long period with very little or no rain", ex: "After two years with almost no rain, the drought left many farmers' wells nearly empty.", tag: "threats to the environment" },
    { w: "global warming", ar: "الاحتباس الحراري / ارتفاع حرارة الأرض", pos: "noun phrase", def: "the gradual rise in the Earth's average temperature", ex: "Scientists warn that global warming is making summers hotter and droughts longer.", tag: "threats to the environment" },
    { w: "pollution", ar: "التلوّث", pos: "noun", def: "harmful substances that make air, water or soil dirty", ex: "Heavy traffic is one cause of air pollution in big cities.", tag: "threats to the environment" },

    { w: "climate change", ar: "تغيّر المناخ", pos: "compound noun", def: "long-term change in the world's weather patterns and temperatures", ex: "Rising temperatures, stronger storms and longer droughts are all signs of climate change.", tag: "compound nouns – stress on the first part" },
    { w: "greenhouse gases", ar: "غازات الدفيئة", pos: "compound noun", def: "gases, such as carbon dioxide, that trap heat in the atmosphere", ex: "Burning coal and oil releases greenhouse gases into the air.", tag: "compound nouns – stress on the first part" },
    { w: "sea level", ar: "مستوى سطح البحر", pos: "compound noun", def: "the average height of the sea's surface", ex: "If the ice caps melt, sea level will rise and flood many coastal cities.", tag: "compound nouns – stress on the first part" },
    { w: "carbon footprint", ar: "البصمة الكربونية", pos: "compound noun", def: "the amount of carbon dioxide that a person or activity produces", ex: "Walking to school instead of going by car reduces your carbon footprint.", tag: "compound nouns – stress on the first part" },
    { w: "fossil fuels", ar: "الوقود الأحفوري", pos: "compound noun", def: "coal, oil and gas, formed underground from ancient plants and animals", ex: "Many countries still depend on fossil fuels such as coal, oil and gas for electricity.", tag: "compound nouns – stress on the first part" },
    { w: "habitat loss", ar: "فقدان الموائل الطبيعية", pos: "compound noun", def: "the destruction of the natural places where animals and plants live", ex: "Habitat loss happens when forests are cut down or wetlands are drained, so wild animals have nowhere left to live.", tag: "compound nouns – stress on the first part" },
    { w: "food chain", ar: "السلسلة الغذائية", pos: "compound noun", def: "a series of living things, each of which eats the one before it", ex: "If frogs disappear, the whole food chain in the pond will be affected.", tag: "compound nouns – stress on the first part" },
    { w: "nature reserve", ar: "محمية طبيعية", pos: "compound noun", def: "a protected area where wild plants and animals can live safely", ex: "We spent the weekend hiking in a nature reserve and spotted two eagles.", tag: "compound nouns – stress on the first part" },
    { w: "flash flood", ar: "سيل جارف / فيضان مفاجئ", pos: "compound noun", def: "a sudden and dangerous flood, usually after very heavy rain", ex: "Hikers should avoid narrow wadis after rain because of the risk of a flash flood.", tag: "compound nouns – stress on the first part" },
    { w: "breeding programme", ar: "برنامج إكثار (تكاثر الحيوانات المهدَّدة)", pos: "compound noun", def: "a plan to help rare animals produce young in a safe place", ex: "A careful breeding programme helped to bring the Arabian oryx back to the wild.", tag: "compound nouns – stress on the first part" },

    { w: "heavy rain", ar: "أمطار غزيرة", pos: "collocation", def: "a large amount of rain falling hard and fast", ex: "Heavy rain turned the dry valley into a fast-flowing river within an hour.", tag: "weather collocations" },
    { w: "strong winds", ar: "رياح قوية", pos: "collocation", def: "air that blows with great force", ex: "During the storm, strong winds blew roof tiles off several houses.", tag: "weather collocations" },
    { w: "scorching heat", ar: "حرّ لاهب", pos: "collocation", def: "extremely hot weather that is almost painful to be outside in", ex: "We stayed indoors all afternoon to avoid the scorching heat of July.", tag: "weather collocations" },
    { w: "thick fog", ar: "ضباب كثيف", pos: "collocation", def: "dense cloud near the ground that makes it difficult to see", ex: "In the early morning, a thick fog hung over the valley like a white blanket.", tag: "weather collocations" },
    { w: "bitterly cold", ar: "برد قارس", pos: "collocation", def: "extremely cold, in an unpleasant and painful way", ex: "On winter nights, the hills near Ajloun can be bitterly cold.", tag: "weather collocations" },

    { w: "endangered species", ar: "نوع مهدَّد بالانقراض", pos: "noun phrase", def: "a kind of animal or plant that may soon disappear completely", ex: "The government has made it illegal to hunt any endangered species.", tag: "endangered species and wildlife" },
    { w: "extinct", ar: "منقرض", pos: "adjective", def: "no longer existing anywhere in the world", ex: "Dinosaurs became extinct millions of years ago.", tag: "endangered species and wildlife" },
    { w: "habitat", ar: "الموطن الطبيعي", pos: "noun", def: "the natural place where an animal or plant normally lives", ex: "The sandy desert is the natural habitat of the sand cat.", tag: "endangered species and wildlife" },
    { w: "poaching", ar: "الصيد غير المشروع", pos: "noun", def: "the illegal hunting or catching of wild animals", ex: "Rangers arrested two men for poaching after they killed a protected animal in the reserve.", tag: "endangered species and wildlife" },
    { w: "conservation", ar: "حماية الطبيعة والمحافظة عليها", pos: "noun", def: "the protection of wildlife, forests and other natural resources", ex: "Conservation groups work with local villagers to protect rare animals.", tag: "endangered species and wildlife" },
    { w: "predator", ar: "حيوان مفترس", pos: "noun", def: "an animal that hunts and eats other animals", ex: "The owl is a silent predator that hunts small rodents at night.", tag: "endangered species and wildlife" },
    { w: "nocturnal", ar: "ليلي (ينشط في الليل)", pos: "adjective", def: "active at night and asleep during the day", ex: "Many desert animals are nocturnal, since the nights are much cooler than the days.", tag: "endangered species and wildlife" },
    { w: "elusive", ar: "مراوغ / يصعب العثور عليه", pos: "adjective", def: "difficult to see, find or catch", ex: "The thief proved elusive: the police searched the city for weeks but could not find him.", tag: "endangered species and wildlife" },
    { w: "vulnerable", ar: "معرَّض للخطر", pos: "adjective", def: "easily harmed; at risk of becoming endangered", ex: "Baby turtles are especially vulnerable to birds and crabs on their way to the sea.", tag: "endangered species and wildlife" },
    { w: "in the wild", ar: "في البرّية (في الطبيعة)", pos: "phrase", def: "in natural conditions, not in a zoo or on a farm", ex: "Very few people have ever seen a sand cat in the wild.", tag: "endangered species and wildlife" },

    { w: "lead to", ar: "يؤدي إلى", pos: "verb phrase", def: "to cause something to happen, often after some time", ex: "Cutting down forests can lead to floods and the loss of fertile soil.", tag: "cause and effect" },
    { w: "result in", ar: "يسفر عن / ينتهي بـ", pos: "verb phrase", def: "to have a particular effect or outcome in the end", ex: "Years of drought resulted in a very poor harvest for the farmers.", tag: "cause and effect" },
    { w: "contribute to", ar: "يسهم في", pos: "verb phrase", def: "to be one of the causes of something", ex: "Cars, factories and power stations all contribute to air pollution.", tag: "cause and effect" },
    { w: "be caused by", ar: "يحدث بسبب / ينتج عن", pos: "passive phrase", def: "to happen because of something", ex: "Many floods can be caused by sudden, heavy rain in the mountains.", tag: "cause and effect" },
    { w: "as a result of", ar: "نتيجةً لـ", pos: "linking phrase", def: "as a consequence of something that happened earlier", ex: "As a result of the thick fog, all morning flights were delayed.", tag: "cause and effect" },
    { w: "due to", ar: "بسبب", pos: "preposition", def: "caused by; because of (used after be or before a noun)", ex: "The cancellation of the match was due to the heavy snow.", tag: "cause and effect" }
  ],
  grammar: [
    {
      id: "g11u2-gr1",
      title: "Future forms for predictions",
      ar: "صيغ المستقبل للتنبؤ والتوقّع",
      body: [
        { p: "في الإنجليزية لا يوجد «زمن مستقبل» واحد مثل «سوف» في العربية، بل عدة صيغ، ونختار بينها حسب **غرضنا من الكلام**: هل نتوقّع شيئاً (prediction)؟ أم نخطّط له؟ أم نقرّر الآن؟ في هذا الدرس نتعلّم صيغ **التوقّع**: ماذا نظن أنه سيحدث في المستقبل، وما مدى تأكّدنا من ذلك. أما الخطط والترتيبات والآمال فهي موضوع الدرس التالي." },
        { h: "1) will / won't — توقّع مبني على رأينا أو خبرتنا" },
        { p: "التكوين: **will / won't + فعل مجرد** (الصيغة نفسها لكل الضمائر، وبدون to وبدون s). السؤال: Will + الفاعل + الفعل؟ والجواب المختصر: Yes, it will. / No, it won't. نستخدمها لتوقّع مبني على **رأينا أو خبرتنا أو معرفتنا العامة**، وتأتي كثيراً بعد I think / I believe / I'm sure / I expect أو مع probably / perhaps." },
        { ex: [
          ["I think summers in Jordan ==will get== hotter over the next few decades.", "أظن أن الصيف في الأردن سيصبح أكثر حرارة خلال العقود القليلة القادمة."],
          ["Don't worry, the test ==won't be== difficult.", "لا تقلق، الاختبار لن يكون صعباً."],
          ["==Will== people still drive petrol cars in fifty years' time?", "هل سيظل الناس يقودون سيارات البنزين بعد خمسين سنة؟"],
          ["There ==will be== more droughts if the climate keeps changing.", "ستكون هناك فترات جفاف أكثر إذا استمر المناخ في التغيّر."]
        ] },
        { h: "2) be going to — توقّع مبني على دليل نراه الآن" },
        { p: "التكوين: **am / is / are + going to + فعل مجرد**. نستخدمها عندما يكون عندنا **دليل واضح في الحاضر** يجعلنا نتوقّع ما سيحدث، وغالباً يكون الحدث قريباً. النفي: am/is/are **not** going to. السؤال: Is it going to…؟" },
        { ex: [
          ["Look at those black clouds! It's ==going to rain==.", "انظر إلى تلك الغيوم السوداء! ستمطر."],
          ["The river is almost dry. There ==is going to be== a water shortage this summer.", "النهر شبه جاف. سيكون هناك نقص في المياه هذا الصيف."],
          ["The old wall is cracked and leaning. It ==is going to fall== soon.", "الجدار القديم متشقق ومائل. سيسقط قريباً."],
          ["The sky is clear, so it ==isn't going to rain== today.", "السماء صافية، لذلك لن تمطر اليوم."]
        ] },
        { table: { head: ["", "will", "be going to"], rows: [
          ["أساس التوقّع", "رأي أو خبرة أو معرفة عامة", "دليل نراه أو نعرفه الآن"],
          ["ما يرافقها", "I think, I'm sure, I expect, probably, perhaps", "Look! Careful! Watch out! + وصف لما نراه"],
          ["مثال", "I think it will rain tomorrow.", "Look at the sky! It's going to rain."]
        ] } },
        { tip: "في الكلام اليومي يمكن أحياناً استخدام الصيغتين في توقّع عام دون فرق كبير (I think it will be / is going to be a hot summer). لكن في الامتحان ابحث عن القرينة: إذا رأيت **دليلاً ظاهراً** (Look at…! / the sky is full of clouds) فاختر going to، وإذا رأيت **رأياً** (I think… / probably…) فاختر will." },
        { h: "3) may / might / could — احتمال غير مؤكّد" },
        { p: "بعد **may / might / could** نضع فعلاً مجرداً (بدون to وبدون s). تدل على أن الحدث **ممكن لكنه غير مؤكد**. may أقوى قليلاً من might وcould، لكن الفرق صغير في الاستخدام. للنفي نقول **may not / might not**. أما **could not** فلا نستخدمها لنقول «ربما لا يحدث»، لأنها تعني غالباً أن الحدث **مستحيل**. وعند السؤال عن التوقّع نادراً ما نبدأ بـ may / might، بل نسأل عادةً: Do you think it will rain? أو Is it likely to rain؟" },
        { ex: [
          ["We ==might see== an oryx if we are lucky.", "ربما نرى مهاً عربياً إذا حالفنا الحظ."],
          ["It ==may not rain== this winter, and then the dams will stay low.", "ربما لا تمطر هذا الشتاء، وعندها ستبقى السدود منخفضة."],
          ["Without enough water, the crops ==could die==.", "من دون ماء كافٍ قد تموت المحاصيل."],
          ["She ==may well win== the prize.", "من المحتمل جداً أن تفوز بالجائزة. (may well = احتمال قوي)"]
        ] },
        { tip: "**maybe** و**perhaps** ظرفان بمعنى «ربما» ويأتيان غالباً في أول الجملة: Maybe it will snow. أما **may be** (كلمتان) فهي may + be: It ==may be== cold tonight. (= Maybe it will be cold tonight.)" },
        { h: "4) درجات التأكّد" },
        { p: "نستطيع التعبير عن مدى ثقتنا بالتوقّع باختيار التركيب المناسب. هذا الجدول يرتّبها من الأقوى إلى الأضعف:" },
        { table: { head: ["درجة التأكّد", "التراكيب", "مثال"], rows: [
          ["شبه مؤكد", "will definitely / will certainly / be bound to / be sure to / be certain to", "The ice is bound to melt in this heat."],
          ["مرجّح", "will probably / be likely to / I expect (that)…", "The new park is likely to attract many families."],
          ["ممكن", "may / might / could / maybe / perhaps", "We might see snow next week."],
          ["مستبعد", "be unlikely to / probably won't / I doubt (that)… / I don't think… will", "Rain is unlikely to fall in Aqaba in July."],
          ["شبه مستحيل", "definitely won't / certainly won't", "Don't worry, we definitely won't be late."]
        ] } },
        { h: "موقع الظرف: probably / definitely / certainly" },
        { p: "في الجملة المثبتة يأتي الظرف **بعد will**. وفي الجملة المنفية يأتي **قبل won't** (نقطة يخطئ فيها كثير من الطلاب). أما perhaps وmaybe فيأتيان في **بداية الجملة**." },
        { table: { head: ["النوع", "الترتيب", "مثال"], rows: [
          ["مثبت", "will + probably / definitely + فعل", "It will probably rain tonight. / We will definitely win."],
          ["منفي", "probably / definitely + won't + فعل", "It probably won't rain tonight. / We definitely won't lose."],
          ["perhaps / maybe", "في أول الجملة", "Perhaps we will see a sand cat. / Maybe it will snow."]
        ] } },
        { warn: "✗ It won't probably rain. ← ✓ It ==probably won't== rain. في النفي يسبق الظرف won't." },
        { h: "5) be likely to / be unlikely to / be bound to" },
        { p: "التكوين: **be + likely / unlikely / bound / sure / certain + to + فعل مجرد**. معنى likely «مرجّح»، وunlikely «غير مرجّح» (معناها منفي أصلاً)، وbound to «لا بدّ أن / شبه مؤكد» وتُستخدم عندما نكون واثقين بحكم المنطق أو الخبرة. ويمكن أيضاً استخدام التركيب: **It is likely that + جملة**." },
        { ex: [
          ["Prices ==are likely to rise== again next year.", "من المرجّح أن ترتفع الأسعار مرة أخرى العام القادم."],
          ["The shy sand cat ==is unlikely to come== close to people.", "من غير المرجّح أن يقترب قط الرمال الخجول من الناس."],
          ["If you leave the plants in this heat, they ==are bound to die==.", "إذا تركت النباتات في هذا الحر فلا بدّ أن تموت."],
          ["It ==is likely that== the meeting will be postponed.", "من المرجّح أن يُؤجَّل الاجتماع."]
        ] },
        { warn: "✗ It is probable to rain. ← ✓ It is ==likely to== rain. / It is ==probable that== it will rain. الصفة probable لا يأتي بعدها to + فعل، بل that + جملة." },
        { tip: "**unlikely** معناها منفي أصلاً، فلا نضيف معها not لنعبّر عن «لن»: He ==is unlikely to== win. = He ==isn't likely to== win. أما isn't unlikely فتعني «من المحتمل» (نفي النفي)!" },
        { h: "6) أفعال الرأي: I think / I expect / I'm sure / I doubt" },
        { p: "نبدأ التوقّع كثيراً بجملة تعبّر عن رأينا ثم نضع will في الجملة الثانية: I expect / I think / I believe / I'm sure + (that) + will. وللنفي نضع النفي مع فعل الرأي: **I don't think + will** (هذه هي الصيغة المطلوبة في الامتحان). أما **doubt** فمعناها «أشكّ»، أي أنها منفية في المعنى، فيأتي بعدها فعل مثبت: I doubt (that) it will rain. = I don't think it will rain." },
        { ex: [
          ["I ==expect== the museum will be crowded on Friday.", "أتوقّع أن يكون المتحف مزدحماً يوم الجمعة."],
          ["I'm ==sure== the project will succeed.", "أنا واثق من أن المشروع سينجح."],
          ["I ==don't think== the ice caps will recover quickly.", "لا أظن أن الجليد القطبي سيتعافى بسرعة."],
          ["I ==doubt== (that) the reserve will open before spring.", "أشكّ في أن تفتح المحمية قبل الربيع."]
        ] },
        { warn: "✗ In the future, people will can live on Mars. ← ✓ …people ==will be able to== live on Mars. لا نجمع will مع can؛ نستخدم will be able to." },
        { warn: "✗ It will to rain tomorrow. / He will goes there. ← ✓ It ==will rain==. / He ==will go==. بعد will فعل مجرد دائماً (بدون to وبدون s)." },
        { tip: "عبارات الزمن التي ترافق التوقّع: tomorrow, next week / year, soon, one day, in the future, in ten years' time, by the end of the century." }
      ],
      summary: [
        "will / won't + فعل مجرد ← توقّع مبني على رأي أو خبرة (I think, probably).",
        "be going to ← توقّع مبني على دليل نراه الآن (Look at those clouds!).",
        "may / might / could + فعل مجرد ← احتمال؛ والنفي may not / might not (وليس could not).",
        "will probably / will definitely ← الظرف بعد will، وفي النفي قبل won't: probably won't.",
        "be likely to / unlikely to / bound to + فعل مجرد ← درجات التأكّد؛ وbound to شبه مؤكد.",
        "I expect / I think / I'm sure + will؛ وI don't think / I doubt + will (الفعل الثاني مثبت)."
      ],
      qs: [
        { t: "mcq", q: "Experts believe that electric cars ____ more common in the next ten years.", o: ["become", "will become", "are become", "will becoming"], a: 1, x: "توقّع عن المستقبل ← will + فعل مجرد: will become. أما become فمضارع، وwill becoming خطأ في الصيغة." },
        { t: "mcq", q: "Look at those black clouds! It ____ rain very soon.", o: ["will to", "going to", "is going to", "is go to"], a: 2, x: "الدليل ظاهر الآن (Look at those black clouds!) ← be going to، ولا ننسَ فعل be: is going to." },
        { t: "mcq", q: "Which sentence is a prediction based on evidence we can see now?", o: ["That ladder is very shaky – someone is going to fall!", "I think the oryx will survive in the wild.", "Perhaps it will rain next week.", "Summers will probably be hotter in 2050."], a: 0, x: "الجملة الأولى مبنية على شيء نراه الآن (السلّم المهتزّ) ← going to. أما الباقي فآراء وتوقّعات عامة ← will." },
        { t: "mcq", q: "Which sentence shows that the speaker is MOST sure?", o: ["It might be a hot summer.", "It could be a hot summer.", "It is unlikely to be a hot summer.", "It is bound to be a hot summer."], a: 3, x: "be bound to تعني «لا بدّ أن» وهي أقوى درجات التأكّد. might وcould تدلان على احتمال فقط، وunlikely تدل على الاستبعاد." },
        { t: "mcq", q: "We haven't decided yet. We ____ visit the nature reserve on Friday, or we might go on Saturday.", o: ["are bound to", "may", "will definitely", "are certain"], a: 1, x: "لم نقرّر بعد ← احتمال غير مؤكد ← may + فعل مجرد. أما are bound to وwill definitely وare certain فتدل على التأكّد." },
        { t: "mcq", q: "The sky is completely clear, so it ____ rain tonight.", o: ["won't probably", "probably won't", "will probably not to", "probably not will"], a: 1, x: "في الجملة المنفية يسبق الظرف probably الفعل المساعد won't: probably won't." },
        { t: "mcq", q: "It is ____ rain tonight, so take an umbrella.", o: ["likely to", "probable to", "possible to", "sure that"], a: 0, x: "likely تأتي بعدها to + فعل مجرد. أما probable فيأتي بعدها that + جملة، ولا تُستخدم possible وsure بهذا الشكل." },
        { t: "mcq", q: "I ____ the match will start on time. It's raining heavily and the pitch is flooded.", o: ["expect", "am sure", "doubt", "think"], a: 2, x: "المطر الغزير والملعب المغمور يجعلان بدء المباراة في موعدها مستبعداً ← I doubt (أشكّ). أما expect وam sure وthink فتدل على توقّع إيجابي لا يناسب السياق." },
        { t: "gap", q: "If you leave the plants without water in this heat, they are bound ____ (die).", a: ["to die"], x: "be bound to + فعل مجرد: bound to die." },
        { t: "gap", q: "The river is almost dry and it hasn't rained for months. There ____ (be – going to) a serious water shortage soon.", a: ["is going to be", "'s going to be"], x: "دليل ظاهر في الحاضر (النهر شبه جاف) ← is going to be." },
        { t: "gap", q: "Water prices are likely ____ (rise) again next summer.", a: ["to rise"], x: "be likely to + فعل مجرد: likely to rise." },
        { t: "gap", q: "I ____ (not / think) the dam will be full this year.", a: ["don't think", "do not think"], x: "في الإنجليزية نضع النفي عادةً مع فعل الرأي: I don't think + will، وهي الصيغة المعتادة بدلاً من I think … won't." },
        { t: "tr", q: "It is very probable that the match will be cancelled.", p: "Rewrite using 'likely': The match …", a: ["The match is likely to be cancelled.", "The match is very likely to be cancelled.", "The match is highly likely to be cancelled.", "The match will very likely be cancelled.", "The match's likely to be cancelled.", "The match's very likely to be cancelled."], x: "It is probable that + جملة = The match is likely to + فعل مجرد. وبما أن المباراة ستُلغى فنستخدم المبني للمجهول: to be cancelled." },
        { t: "tr", q: "I don't think the shop will open before nine.", p: "Rewrite using the word given: UNLIKELY. The shop …", a: ["The shop is unlikely to open before nine.", "The shop is unlikely to open before nine o'clock.", "The shop is unlikely to open before 9.", "The shop is unlikely to open before 9 o'clock.", "The shop's unlikely to open before nine.", "The shop's unlikely to open before nine o'clock."], x: "I don't think … will = is unlikely to + فعل مجرد، ولا نضيف not لأن unlikely منفية في المعنى." },
        { t: "err", q: "Scientists think that droughts will becomes more frequent in the future.", w: "becomes", c: "become (will become)", x: "بعد will نضع الفعل المجرد دائماً (بدون s وبدون to): will become، وليس will becomes." },
        { t: "err", q: "Rana is likely passing the exam because she has studied very hard.", w: "passing", c: "to pass (is likely to pass)", x: "be likely + to + فعل مجرد: is likely to pass." },
        { t: "order", a: "The oryx is unlikely to disappear again.", x: "التركيب: الفاعل + is unlikely to + فعل مجرد." }
      ]
    },
    {
      id: "g11u2-gr2",
      title: "Future forms for plans, arrangements and hopes",
      ar: "صيغ المستقبل للخطط والترتيبات والآمال",
      body: [
        { p: "عندما نتحدث عن **خططنا** فنحن لا نتوقّع ما سيحدث، بل نخبر عمّا **ننوي** فعله أو **رتّبنا** له. وهنا تتغيّر الصيغة بحسب درجة التخطيط: هل هي مجرد نية؟ أم موعد مؤكّد؟ أم جدول رسمي؟ أم قرار اتُّخذ الآن؟ وفي نهاية الدرس نتعلّم صيغتين متقدمتين هما المستقبل المستمر والمستقبل التام." },
        { table: { head: ["الصيغة", "نستخدمها لـ", "مثال"], rows: [
          ["be going to + فعل", "نية أو خطة قرّرناها قبل لحظة الكلام", "I'm going to join the school's green club."],
          ["Present continuous", "ترتيب مؤكّد (موعد، مكان، أشخاص)", "We're meeting the park manager at ten tomorrow."],
          ["Present simple", "جدول رسمي ثابت (مواصلات، برامج، مواعيد)", "The train leaves at 7.15 tomorrow."],
          ["will + فعل", "قرار لحظي، عرض، وعد", "It's hot in here. I'll open the window."],
          ["be about to + فعل", "على وشك الحدوث فوراً", "Be quiet! The talk is about to start."]
        ] } },
        { h: "1) be going to — النيّة والخطة" },
        { p: "نستخدمها للحديث عن **نية أو خطة قرّرناها قبل أن نتكلّم**. التكوين: am / is / are + going to + فعل مجرد. النفي: am/is/are **not** going to. السؤال: Are you going to…؟" },
        { ex: [
          ["I'm ==going to study== environmental engineering at university.", "أنوي أن أدرس الهندسة البيئية في الجامعة."],
          ["We ==aren't going to use== plastic bags at our school fair.", "لن نستخدم الأكياس البلاستيكية في معرض مدرستنا."],
          ["Are you ==going to join== the clean-up day?", "هل ستشارك في يوم التنظيف؟"]
        ] },
        { h: "2) المضارع المستمر — الترتيبات" },
        { p: "نستخدم **Present continuous** للترتيبات المؤكّدة التي **اتفقنا عليها مع الآخرين**، وعادةً يكون الوقت (وأحياناً المكان) معروفاً، وقد نكون حجزنا أو حدّدنا موعداً. تأتي معها كثيراً عبارات مثل tomorrow, on Friday, at five o'clock, next week." },
        { ex: [
          ["I'm ==visiting== my cousins in Aqaba this weekend. We've already booked the hotel.", "سأزور أبناء عمومتي في العقبة في نهاية الأسبوع. لقد حجزنا الفندق فعلاً."],
          ["We're ==meeting== the municipality's engineer at ten tomorrow.", "سنقابل مهندس البلدية في العاشرة صباح الغد."]
        ] },
        { p: "**الفرق بين النية والترتيب:**" },
        { ex: [
          ["I'm ==going to see== a doctor about my cough.", "سأذهب إلى الطبيب بخصوص سعالي. (نية، لم أحدّد الموعد بعد)"],
          ["I'm ==seeing== the doctor at four this afternoon.", "سأقابل الطبيب في الرابعة عصراً. (موعد محجوز)"]
        ] },
        { tip: "في كثير من الحالات يمكن استخدام الصيغتين لخطة مرتّبة (I'm visiting / I'm going to visit my cousins on Friday) دون فرق كبير. لكن المضارع المستمر يحتاج إلى **ترتيب مسبق** ووقت معروف، أما going to فتكفي معها النية فقط." },
        { warn: "عادةً لا نستخدم المضارع المستمر للمستقبل مع أحداث لا يمكن ترتيبها مثل الطقس: ✗ It's raining tomorrow. ← ✓ It ==is going to rain== / It ==will rain== tomorrow." },
        { h: "3) المضارع البسيط — الجداول والبرامج" },
        { p: "نستخدم **Present simple** للمستقبل عندما نتحدث عن **جدول رسمي ثابت** لا يتغيّر بقرارنا الشخصي: مواعيد الحافلات والقطارات والطائرات، وبرامج الأفلام والمؤتمرات، وجداول المدرسة. وتأتي معه عادةً أفعال مثل: start, begin, finish, end, open, close, leave, arrive." },
        { ex: [
          ["The bus to Petra ==leaves== at 7.30 tomorrow morning.", "تغادر الحافلة المتجهة إلى البتراء الساعة 7:30 صباح الغد."],
          ["The environment conference ==starts== on Sunday and ends on Tuesday.", "يبدأ مؤتمر البيئة يوم الأحد وينتهي يوم الثلاثاء."],
          ["What time does the film ==begin==?", "متى يبدأ الفيلم؟"]
        ] },
        { tip: "قارن: The film ==starts== at 8. (برنامج السينما = جدول) مقابل We're ==seeing== the film at 8. (ترتيبنا الشخصي: حجزنا التذاكر)." },
        { h: "4) will — القرار اللحظي والعرض والوعد" },
        { p: "نستخدم **will** عندما نقرّر **في لحظة الكلام نفسها** (لم نكن نخطّط من قبل)، وعندما نعرض المساعدة، وعندما نعد بشيء، وعندما نطلب شيئاً بأدب. الاختصار 'll والنفي won't." },
        { table: { head: ["الاستخدام", "مثال", "المعنى"], rows: [
          ["قرار لحظي", "We've run out of milk. I'll go to the shop.", "نفد الحليب. سأذهب إلى المتجر."],
          ["عرض (offer)", "That bag looks heavy. I'll carry it for you.", "تلك الحقيبة تبدو ثقيلة. سأحملها عنك."],
          ["وعد (promise)", "I promise I won't tell anyone your secret.", "أعدك بأنني لن أخبر أحداً بسرّك."],
          ["طلب مهذب", "Will you help me with this poster?", "هل تساعدني في هذا الملصق؟"]
        ] } },
        { ex: [
          ["A: There's no bread. B: Oh, ==I'll buy== some on my way home.", "لا يوجد خبز. – آه، سأشتري بعضاً منه في طريقي إلى البيت. (قرار لحظي)"],
          ["I've already decided: I'm ==going to buy== a new bike next month.", "لقد قرّرت: سأشتري دراجة جديدة الشهر القادم. (قرار سابق)"]
        ] },
        { tip: "عند اقتراح المساعدة نستخدم أيضاً **Shall I…?** مع I وwe: Shall I open the window? (هل أفتح النافذة؟)" },
        { h: "5) الآمال والخطط: hope / plan / intend / would like" },
        { table: { head: ["التركيب", "المعنى", "مثال"], rows: [
          ["hope + to + فعل", "أمل بفعل شيء (قد يتحقق وقد لا يتحقق)", "I hope to visit Wadi Rum next spring."],
          ["hope (that) + جملة", "أمل بأن يحدث شيء", "I hope (that) we win the match. / I hope it doesn't rain."],
          ["plan + to + فعل", "خطة", "We plan to plant fifty trees in the school yard."],
          ["intend + to + فعل", "نية جادة (أكثر رسمية)", "I intend to apply for a scholarship."],
          ["would like / would love + to + فعل", "رغبة مهذبة", "I'd like to speak to the manager, please."]
        ] } },
        { p: "بعد hope نستخدم عادةً **المضارع البسيط** أو **will** للمستقبل: I hope it ==doesn't== rain. / I hope it ==won't== rain. ولا نضع مفعولاً به قبل to بعد hope. أما مع want وwould like فنضع المفعول: I want ==you to come==." },
        { warn: "✗ I hope you to pass the exam. ← ✓ I hope ==you pass== the exam. فعل hope لا يأتي بعده مفعول + to (بخلاف want: I want you to pass)." },
        { warn: "✗ We plan visiting Petra in May. ← ✓ We plan ==to visit== Petra in May. بعد plan نستخدم to + فعل (ويمكن أيضاً: plan on visiting)." },
        { h: "6) be about to — على وشك الحدوث" },
        { p: "نستخدم **be about to + فعل مجرد** لحدث سيقع **بعد لحظات قليلة**. وفي الماضي نستخدم **was / were about to** لحدث كان على وشك الحدوث عندما قاطعه حدث آخر. ولا نضيف معها وقتاً بعيداً مثل tomorrow." },
        { ex: [
          ["Hurry up! The film ==is about to start==.", "أسرع! الفيلم على وشك أن يبدأ."],
          ["I ==was about to call== you when the phone rang.", "كنت على وشك أن أتصل بك عندما رنّ الهاتف."]
        ] },
        { warn: "✗ The match is about to start tomorrow. ← ✓ The match ==starts== / ==is going to start== tomorrow. التركيب about to يعني «بعد لحظات»، فلا يجتمع مع كلمة بعيدة مثل tomorrow." },
        { h: "7) بعد when / as soon as / before / until: المضارع وليس will" },
        { p: "في الجمل التي تبدأ بـ **when, as soon as, before, after, until, once, by the time** ونتحدث فيها عن المستقبل نستخدم **المضارع البسيط** (أو المضارع التام) بعدها، وليس will. أما will فتأتي في الجملة الرئيسية." },
        { ex: [
          ["I'll call you as soon as I ==arrive== at the hotel.", "سأتصل بك فور وصولي إلى الفندق."],
          ["We'll start planting the trees when the rain ==stops==.", "سنبدأ بزراعة الأشجار عندما يتوقف المطر."]
        ] },
        { warn: "✗ I'll call you as soon as I will arrive. ← ✓ I'll call you as soon as I ==arrive==." },
        { h: "8) المستقبل المستمر — will be + V-ing" },
        { p: "التكوين: **will be + V-ing**. النفي: won't be + V-ing. السؤال: Will + الفاعل + be + V-ing؟ نستخدمه لـ: (أ) حدث **سيكون جارياً** في وقت محدّد في المستقبل (كأننا نصوّره وهو في منتصفه)، (ب) حدث مُرتَّب أو متوقَّع في مجرى الأمور العادية، (ج) أسئلة مهذبة عن خطط الآخرين." },
        { ex: [
          ["This time next week, I ==will be lying== on a beach in Aqaba.", "في مثل هذا الوقت من الأسبوع القادم سأكون مستلقياً على شاطئ في العقبة."],
          ["Don't call me at eight. I ==will be watching== the match.", "لا تتصل بي في الثامنة. سأكون أشاهد المباراة."],
          ["Will you ==be using== the projector this afternoon?", "هل ستستخدم جهاز العرض بعد الظهر؟ (سؤال مهذب)"]
        ] },
        { tip: "كلمات دالة على المستقبل المستمر: this time tomorrow / next week، at 8 p.m. tomorrow، all day tomorrow، in two hours' time." },
        { h: "9) المستقبل التام — will have + V3" },
        { p: "التكوين: **will have + V3**. النفي: won't have + V3. السؤال: Will + الفاعل + have + V3؟ نستخدمه لحدث **سيكون قد انتهى قبل وقت محدّد** في المستقبل. والكلمات الدالة: **by + وقت** (by Friday, by 2030, by the end of the month) و**by the time + جملة بالمضارع البسيط** وbefore." },
        { ex: [
          ["By Friday, I ==will have finished== the report.", "بحلول يوم الجمعة سأكون قد أنهيت التقرير."],
          ["By the time you get home, we ==will have cooked== dinner.", "بحلول وقت وصولك إلى البيت سنكون قد أعددنا العشاء."],
          ["By 2030, the school ==will have planted== over a thousand trees.", "بحلول عام 2030 تكون المدرسة قد زرعت أكثر من ألف شجرة."]
        ] },
        { table: { head: ["", "Future continuous", "Future perfect"], rows: [
          ["التكوين", "will be + V-ing", "will have + V3"],
          ["الفكرة", "الحدث جارٍ في وقت معيّن", "الحدث منتهٍ قبل وقت معيّن"],
          ["كلمات دالة", "this time tomorrow, at 8 p.m. tomorrow", "by Friday, by the time…, before"],
          ["مثال", "At 8 p.m. tomorrow, I'll be watching the match.", "By 8 p.m. tomorrow, I'll have finished my homework."]
        ] } },
        { tip: "قارن: I'll finish the report **on** Friday. (سأنهيه يوم الجمعة نفسه) مقابل I'll have finished the report **by** Friday. (سأكون قد أنهيته في موعد أقصاه الجمعة، وربما قبلها)." },
        { warn: "✗ I will have finished the report until Friday. ← ✓ …==by== Friday. نستخدم **by** (في موعد أقصاه) مع حدث ينتهي، و**until** (حتى) مع نشاط يستمر: I'll be working on it ==until== Friday." },
        { warn: "✗ By the time we will arrive, the film will have started. ← ✓ By the time we ==arrive==, the film will have started. بعد by the time نستخدم المضارع البسيط وليس will." },
        { tip: "هناك أيضاً **future perfect continuous**: will have been + V-ing للتعبير عن **مدة** نشاط حتى وقت مستقبلي: By June, I will have been working here for ten years." }
      ],
      summary: [
        "be going to ← نية أو خطة قُرِّرت قبل الكلام: I'm going to study engineering.",
        "Present continuous ← ترتيب مؤكّد بوقت ومكان: We're meeting the manager at ten.",
        "Present simple ← جدول رسمي ثابت: The train leaves at 7.15.",
        "will ← قرار لحظي أو عرض أو وعد: I'll help you. / I won't tell anyone.",
        "hope / plan / intend / would like + to V؛ وbe about to + V ← على وشك الحدوث.",
        "will be V-ing ← جارٍ في وقت مستقبلي؛ will have V3 ← منتهٍ قبل وقت (by / by the time + مضارع بسيط)."
      ],
      qs: [
        { t: "mcq", q: "A: Have you decided what to do for the school fair? B: Yes, we ____ sell homemade soap.", o: ["are going to", "will to", "are", "going"], a: 0, x: "قرار اتُّخذ سابقاً (Have you decided…؟ Yes) ← be going to + فعل مجرد: are going to sell." },
        { t: "mcq", q: "A: I've forgotten my pen. B: Don't worry, I ____ you one of mine.", o: ["lend", "have lent", "'ll lend", "was lending"], a: 2, x: "قرار وعرض في لحظة الكلام ← will: I'll lend." },
        { t: "mcq", q: "I can't come on Saturday. I ____ my grandparents in Irbid – we arranged it last week.", o: ["visit", "will visiting", "have visited", "am visiting"], a: 3, x: "ترتيب متفق عليه (we arranged it) ← Present continuous: am visiting." },
        { t: "mcq", q: "The bus to Aqaba ____ at 6.45 tomorrow morning, so we must leave home early.", o: ["leave", "leaves", "is leave", "leaving"], a: 1, x: "جدول مواصلات رسمي ← Present simple، والفاعل مفرد غائب: leaves." },
        { t: "mcq", q: "Be quiet, please. The headmaster ____ speak.", o: ["is about to", "is going about to", "will about to", "about to"], a: 0, x: "حدث على وشك الحدوث بعد لحظات ← be about to + فعل مجرد: is about to speak." },
        { t: "mcq", q: "Please don't phone me at nine tomorrow. I ____ my exam then.", o: ["will have taken", "took", "will be taking", "have been taking"], a: 2, x: "حدث سيكون جارياً في وقت محدّد في المستقبل (at nine tomorrow … then) ← Future continuous: will be taking." },
        { t: "mcq", q: "By the end of this month, the volunteers ____ over a thousand trees.", o: ["has planted", "planted", "had planted", "will have planted"], a: 3, x: "by the end of this month ← حدث سينتهي قبل وقت محدد في المستقبل ← Future perfect: will have planted." },
        { t: "mcq", q: "Please send me your project ____ Thursday at the latest.", o: ["until", "during", "by", "since"], a: 2, x: "at the latest تدل على موعد أقصى ← by Thursday. أما until فتأتي مع نشاط يستمر حتى وقت معين." },
        { t: "gap", q: "I'd like ____ (speak) to the manager, please.", a: ["to speak"], x: "would like + to + فعل مجرد." },
        { t: "gap", q: "As soon as the rain ____ (stop), we will begin the tree-planting.", a: ["stops", "has stopped"], x: "بعد as soon as نستخدم المضارع البسيط (أو التام) وليس will." },
        { t: "gap", q: "By next June, I ____ (finish – future perfect) school.", a: ["will have finished", "'ll have finished"], x: "by next June ← حدث سينتهي قبل وقت محدد ← will have + V3." },
        { t: "gap", q: "This time next week, we ____ (lie – future continuous) on a beach in Aqaba.", a: ["will be lying", "'ll be lying"], x: "this time next week ← حدث جارٍ في وقت مستقبلي ← will be + V-ing." },
        { t: "gap", q: "I promise I ____ (not / tell) anyone your secret.", a: ["won't tell", "will not tell"], x: "الوعد ← will: won't tell." },
        { t: "tr", q: "The film will start in a few seconds.", p: "Rewrite using 'about to': The film …", a: ["The film is about to start.", "The film is just about to start.", "The film's about to start.", "The film's just about to start.", "The film is about to begin.", "The film is just about to begin.", "The film's about to begin.", "The film's just about to begin."], x: "will … in a few seconds = is about to + فعل مجرد (حدث على وشك الحدوث)." },
        { t: "tr", q: "The workers will complete the new bridge before the end of May.", p: "Rewrite starting with: By the end of May, the workers …", a: ["By the end of May, the workers will have completed the new bridge.", "By the end of May the workers will have completed the new bridge.", "By the end of May, the workers will have finished the new bridge.", "By the end of May the workers will have finished the new bridge."], x: "before the end of May = by the end of May ← Future perfect: will have + V3." },
        { t: "err", q: "I'll call you as soon as I will arrive at the hotel.", w: "will", c: "delete it (as soon as I arrive)", x: "بعد as soon as نستخدم المضارع البسيط وليس will، لذلك نحذف will ونكتب: as soon as I arrive." },
        { t: "err", q: "I will have finished the report until Friday.", w: "until", c: "by", x: "الحدث سينتهي في موعد أقصاه الجمعة ← by Friday. أما until فمع نشاط يستمر حتى وقت معين." },
        { t: "order", a: "They are about to announce the winners of the competition.", x: "التركيب: الفاعل + be about to + فعل مجرد + المفعول." }
      ]
    }
  ],
  reading: {
    title: "Beyond the Pandas",
    text: [
      "When people think of endangered animals, they usually picture pandas, tigers or whales. These famous creatures appear on posters and in documentaries. However, many lesser-known animals are disappearing too, and because few people talk about them, they may vanish without anyone noticing. Our own region is home to several of these overlooked animals.",
      "The Arabian oryx proves that a species can come back even after it has vanished from the wild. By 1972, hunters with cars and rifles had wiped out the wild herds. Fortunately, a few oryx survived in captivity, and careful breeding programmes produced new herds. Over the following decades, these animals were released into protected areas in several countries, including Jordan, where the Shaumari Wildlife Reserve near Azraq is one of their homes. In 2011, experts improved the oryx's status from 'endangered' to 'vulnerable'.",
      "The sand cat, a small wild cat, is a master of desert life but a mystery to scientists. Thick fur on its paws protects it from burning sand and cold nights, and it gets the water it needs from the animals it eats. Because it is nocturnal and extremely elusive, it is rarely seen in the wild, and nobody knows exactly how many there are. Worldwide it is not classed as endangered, but in several regions its habitat is shrinking as roads, farms and towns spread.",
      "Smaller and paler than most of its relatives, the Syrian brown bear lives in mountain forests, eating fruit, nuts, plants and insects. Long ago it roamed the hills of the Levant, but forests were cut down, and bears that raided beehives or farms were often hunted. As a result, it has almost vanished from that region, and today it survives only in a few scattered areas, mainly in Turkey, Iran, Iraq and the Caucasus.",
      "Saving these animals is possible, but it takes teamwork. Governments can create reserves and enforce laws against poaching, while organisations such as Jordan's Royal Society for the Conservation of Nature run breeding programmes and teach schoolchildren about wildlife. Ordinary people can help too: they can avoid buying wild animals as pets, protect natural areas and reduce their carbon footprint. If we act now, more species may follow the oryx's path back from the edge of extinction."
    ],
    skill: "Understanding the main idea of paragraphs",
    skillAr: "فهم الفكرة الرئيسية للفقرات",
    skillTip: "الفكرة الرئيسية (main idea) هي أهم ما تريد الفقرة قوله، أما بقية الجمل فتشرحها وتدعمها بتفاصيل وأمثلة وأسباب. ابحث عن الجملة التي تلخّص الفقرة (topic sentence): قد تكون في أولها وهو الأكثر شيوعاً، وقد تكون في وسطها أو في آخرها، وكلمات مثل However وAs a result تدلّك عليها. اسأل نفسك: «عن ماذا تتحدث كل جمل الفقرة؟» ثم اختر الجواب الذي لا يكون ضيقاً (تفصيلة واحدة فقط) ولا واسعاً (أكبر من الفقرة) ولا يحتوي معلومة غير موجودة في النص.",
    gloss: [["overlooked", "مُهمَل / لا يلتفت إليه أحد"], ["vanish", "يختفي تماماً"], ["wiped out", "قضى عليه تماماً"], ["herds", "قطعان"], ["captivity", "الأسر (العيش في حدائق الحيوان لا في الطبيعة)"], ["released", "أُطلقت (في الطبيعة)"], ["status", "الوضع / التصنيف"], ["paws", "كفوف الحيوان"], ["elusive", "يصعب العثور عليه أو الإمساك به"], ["shrinking", "يتقلّص"], ["roamed", "جاب / تجوّل بحرّية"], ["raided", "أغار على / هاجم"], ["beehives", "خلايا النحل"], ["scattered", "متفرّقة"], ["enforce", "يطبّق (القانون)"]],
    gist: [
      "الحيوانات المشهورة تنال الاهتمام، وحيوانات أقل شهرة في منطقتنا تختفي دون أن يلاحظ أحد.",
      "المها العربي يثبت أن نوعاً اختفى من البرية يمكن أن يعود بفضل برامج الإكثار.",
      "قط الرمال بارع في العيش بالصحراء لكنه لغز للعلماء، وموطنه يتقلّص في بعض المناطق.",
      "الدب البني السوري كاد يختفي من بلاد الشام بسبب قطع الغابات والصيد.",
      "إنقاذ هذه الحيوانات ممكن لكنه يحتاج إلى تعاون الحكومات والمنظمات والناس."
    ],
    tr: [
      "عندما يفكّر الناس في الحيوانات المهدَّدة بالانقراض، فإنهم يتخيّلون عادةً الباندا أو النمور أو الحيتان. تظهر هذه الكائنات المشهورة على الملصقات وفي الأفلام الوثائقية. لكنّ كثيراً من الحيوانات الأقل شهرة تختفي هي أيضاً، ولأن قلّة من الناس تتحدث عنها فقد تزول دون أن يلاحظ أحد. وتحتضن منطقتنا عدداً من هذه الحيوانات التي لا يلتفت إليها أحد.",
      "يثبت المها العربي أن النوع يمكن أن يعود حتى بعد أن يختفي من البرية. فبحلول عام 1972 كان الصيادون بسياراتهم وبنادقهم قد قضوا على القطعان البرية. ولحسن الحظ نجا عدد قليل من المها في الأسر، وأنتجت برامج الإكثار الدقيقة قطعاناً جديدة. وعلى مدى العقود التالية أُطلقت هذه الحيوانات في مناطق محمية في عدة دول، منها الأردن، حيث تُعدّ محمية الشومري للحياة البرية قرب الأزرق إحدى مواطنها. وفي عام 2011 حسّن الخبراء تصنيف المها من «مهدَّد بالانقراض» إلى «معرَّض للخطر».",
      "قط الرمال، وهو قط بري صغير، بارع في العيش في الصحراء لكنه يبقى لغزاً بالنسبة إلى العلماء. فالفراء الكثيف على كفوفه يحميه من الرمال الحارقة ومن برودة الليالي، ويحصل على الماء الذي يحتاج إليه من الحيوانات التي يأكلها. ولأنه ليلي النشاط وشديد المراوغة، نادراً ما يُرى في البرية، ولا أحد يعرف بدقة كم عدده. وهو عالمياً غير مصنَّف ضمن الأنواع المهدَّدة بالانقراض، لكن موطنه يتقلّص في عدة مناطق مع انتشار الطرق والمزارع والبلدات.",
      "الدب البني السوري أصغر حجماً وأفتح لوناً من معظم أقاربه، ويعيش في الغابات الجبلية ويتغذّى على الفاكهة والمكسّرات والنباتات والحشرات. وكان في الماضي البعيد يجوب تلال بلاد الشام، لكن الغابات قُطعت، وكثيراً ما كانت الدببة التي تغير على خلايا النحل أو المزارع تتعرّض للصيد. ونتيجة لذلك كاد يختفي من تلك المنطقة، ولا يعيش اليوم إلا في بضع مناطق متفرقة، أغلبها في تركيا وإيران والعراق والقوقاز.",
      "إنقاذ هذه الحيوانات ممكن، لكنه يحتاج إلى عمل جماعي. فبإمكان الحكومات إنشاء المحميات وتطبيق القوانين ضد الصيد غير المشروع، بينما تدير منظمات مثل الجمعية الملكية لحماية الطبيعة في الأردن برامج إكثار وتعلّم أطفال المدارس عن الحياة البرية. ويستطيع الناس العاديون المساعدة أيضاً: بتجنّب شراء الحيوانات البرية كحيوانات أليفة، وحماية المناطق الطبيعية، وتقليل بصمتهم الكربونية. وإذا تحرّكنا الآن، فقد تتبع أنواع أخرى طريق المها العربي للعودة من حافة الانقراض."
    ],
    qs: [
      { t: "mcq", q: "What is the main idea of the whole text?", o: ["Famous animals like pandas no longer need any protection.", "Lesser-known animals in our region are also in danger, but they can be helped.", "The Arabian oryx is the only animal that has ever been saved from extinction.", "Zoos are the best place to keep every kind of endangered animal."], a: 1, x: "النص كله يتحدث عن حيوانات أقل شهرة في منطقتنا (المها، قط الرمال، الدب) وعن إمكانية إنقاذها بالتعاون. الخيارات الأخرى غير صحيحة أو واسعة أكثر من اللازم أو غير مذكورة في النص." },
      { t: "mcq", q: "Which sentence best expresses the main idea of paragraph 1?", o: ["Pandas, tigers and whales appear on posters.", "Documentaries about animals are very popular.", "Many lesser-known animals are disappearing, but few people notice.", "The writer lives in a region with many zoos."], a: 2, x: "جملة الفكرة الرئيسية هنا في منتصف الفقرة (However, many lesser-known animals are disappearing too…). الخيار الأول تفصيلة ضيقة، والخياران الثاني والرابع غير مذكورين." },
      { t: "mcq", q: "What is the main idea of paragraph 2?", o: ["The Arabian oryx shows that a species can return after it has vanished from the wild.", "Hunters used cars and rifles to kill oryx in the twentieth century.", "Jordan has the largest oryx reserve in the world.", "Oryx live better in zoos than in the desert."], a: 0, x: "الجملة الأولى تحمل الفكرة الرئيسية (The Arabian oryx proves that a species can come back…) وبقية الجمل تفاصيل تدعمها. الخيار الثاني تفصيلة ضيقة، والثالث والرابع غير مذكورين." },
      { t: "mcq", q: "What is the main idea of paragraph 3?", o: ["Sand cats live only in Jordan and nowhere else.", "The sand cat is the most endangered wild cat in the world.", "Sand cats can live for years without eating or drinking.", "The sand cat suits desert life, but it is little known and its habitat is shrinking."], a: 3, x: "الفقرة تصف تكيّف قط الرمال مع الصحراء، وتذكر أن العلماء لا يعرفون الكثير عنه، وأن موطنه يتقلّص. الخيارات الأخرى معلومات غير صحيحة أو غير مذكورة (النص يقول إنه ليس مصنفاً مهدداً عالمياً، ويحصل على الماء من طعامه)." },
      { t: "mcq", q: "In paragraph 4, which sentence states the main idea?", o: ["Smaller and paler than most of its relatives, the Syrian brown bear lives in mountain forests.", "As a result, it has almost vanished from that region.", "Long ago it roamed the hills of the Levant.", "Bears that raided beehives or farms were often hunted."], a: 1, x: "هنا الفكرة الرئيسية في آخر الفقرة: النتيجة (As a result) أن الدب كاد يختفي من المنطقة. الجمل الأخرى تصف الدب وتشرح الأسباب (تفاصيل داعمة)." },
      { t: "mcq", q: "Why does the writer mention pandas, tigers and whales in paragraph 1?", o: ["To show that these animals no longer need help.", "To explain how pandas were saved from extinction.", "To contrast well-known animals with lesser-known ones that get less attention.", "To list the animals that live in our region."], a: 2, x: "الكاتب يذكر الحيوانات المشهورة ليقارنها بالحيوانات الأقل شهرة التي لا ينتبه لها أحد (However, many lesser-known animals…)." },
      { t: "mcq", q: "In paragraph 5, who does 'they' refer to in 'they can avoid buying wild animals as pets'?", o: ["Governments", "Organisations", "Schoolchildren", "Ordinary people"], a: 3, x: "الجملة السابقة: Ordinary people can help too: they can avoid… ← الضمير they يعود على Ordinary people." },
      { t: "mcq", q: "What can we infer from the fact that the oryx's status improved from 'endangered' to 'vulnerable' in 2011?", o: ["The oryx is in less danger than before, but it is not completely safe.", "The oryx is now completely safe.", "The oryx has become extinct again.", "Experts have stopped studying the oryx."], a: 0, x: "الاستنتاج: التحسّن يعني أن الخطر أقل، لكن «vulnerable» ما زالت تعني أن النوع معرّض للخطر، فهو ليس آمناً تماماً." },
      { t: "tf", q: "According to the text, the sand cat is classed as endangered all over the world.", a: false, x: "الفقرة 3: Worldwide it is not classed as endangered. لكنّ موطنه يتقلّص في مناطق عدة." },
      { t: "find", q: "Find a word in paragraph 3 that means 'very difficult to see, find or catch'.", a: ["elusive"], x: "elusive = مراوغ يصعب العثور عليه أو الإمساك به." },
      { t: "open", q: "Write the main idea of paragraph 5 in ONE sentence in your own words, then give ONE supporting detail from the paragraph.", m: "Main idea: Saving endangered animals is possible, but it needs teamwork. Detail: Ordinary people can help by not buying wild animals as pets, protecting natural areas and reducing their carbon footprint.", x: "الفكرة الرئيسية: إنقاذ الحيوانات يحتاج إلى تعاون. أما التفصيلة الداعمة فتكون مثالاً أو سبباً من الفقرة نفسها، مثل أدوار الحكومات أو المنظمات أو الناس العاديين." }
    ]
  },
  writing: {
    type: "Formal email",
    ar: "رسالة إلكترونية رسمية",
    about: "الرسالة الإلكترونية الرسمية (Formal email) نكتبها إلى شخص أو جهة لا تربطنا بها صداقة، مثل البلدية أو مدير المدرسة أو إحدى الشركات، لتقديم **اقتراح** أو **شكوى** أو **استفسار** أو **طلب**. أسلوبها **مهذب وواضح ومباشر**: نتجنب الاختصارات (I am وليس I'm) والكلمات العامية وعلامات التعجب، ونستخدم عبارات الطلب المهذب مثل I would be grateful if you could… وكل فقرة لها **غرض واحد** (الغرض ← المشكلة ← الاقتراح ← الخاتمة). تبدأ الرسالة بعنوان (Subject) ثم تحية، وتنتهي بعبارة ختامية واسمك. الطول المعتاد 150–200 كلمة. القاعدة البريطانية: Dear Sir or Madam ← Yours faithfully، وDear Mr / Ms + اسم العائلة ← Yours sincerely.",
    plan: [
      { part: "Subject line", ar: "عنوان الرسالة", tip: "عبارة قصيرة ومحددة تلخّص الموضوع، مثل: Proposal for a tree-planting project in Al-Zahra Park. لا تكتب عنواناً عاماً مثل Hello أو Important!" },
      { part: "Greeting", ar: "التحية", tip: "Dear Sir or Madam, إذا لم تعرف اسم المستلم، أو Dear Mr / Ms + اسم العائلة إذا عرفته. ضع فاصلة بعد التحية." },
      { part: "Paragraph 1: purpose", ar: "الفقرة الأولى: الغرض", tip: "عرّف بنفسك باختصار (أنا طالب في … وأسكن في …) ثم اذكر سبب الكتابة بجملة واضحة: I am writing to suggest / complain about / enquire about …" },
      { part: "Paragraph 2: the problem", ar: "الفقرة الثانية: المشكلة", tip: "اشرح المشكلة بأسبابها ونتائجها باستخدام due to وas a result وlead to، وأعطِ أمثلة محددة، وحذّر من المستقبل إن لزم: If nothing is done, … is likely to get worse." },
      { part: "Paragraph 3: proposal or request", ar: "الفقرة الثالثة: الاقتراح أو الطلب", tip: "اشرح ما تقترحه أو تطلبه بدقة وفوائده المتوقعة باستخدام will وbe likely to، واعرض المساعدة، واطلب الدعم بأدب: I would be grateful if you could …" },
      { part: "Closing paragraph", ar: "الفقرة الأخيرة: الخاتمة", tip: "اشكر المستلم، واذكر أنك تنتظر الردّ: Thank you for your time and consideration. I look forward to hearing from you." },
      { part: "Sign-off and name", ar: "العبارة الختامية والاسم", tip: "Yours faithfully, مع Dear Sir or Madam؛ وYours sincerely, مع Dear Mr / Ms + اسم. ثم اكتب اسمك الكامل في سطر مستقل." }
    ],
    phrases: [
      { en: "I am writing to suggest / complain about / enquire about …", ar: "أكتب إليكم لأقترح / لأشتكي من / لأستفسر عن …", use: "افتتاح الرسالة وبيان الغرض" },
      { en: "I am a student at … School, and I live in …", ar: "أنا طالب في مدرسة … وأسكن في …", use: "التعريف بنفسك باختصار" },
      { en: "I would like to draw your attention to …", ar: "أودّ لفت انتباهكم إلى …", use: "عرض المشكلة" },
      { en: "I am particularly concerned about …", ar: "يقلقني بشكل خاص …", use: "التعبير عن القلق بأدب" },
      { en: "This is mainly due to … / As a result of …, …", ar: "يعود ذلك أساساً إلى … / نتيجةً لـ …، …", use: "ذكر الأسباب والنتائج" },
      { en: "If nothing is done, the situation is likely to get worse.", ar: "إذا لم يُتّخذ أي إجراء فمن المرجّح أن يزداد الوضع سوءاً.", use: "التحذير من المستقبل" },
      { en: "I would like to propose a project to …", ar: "أودّ أن أقترح مشروعاً لـ …", use: "تقديم الاقتراح" },
      { en: "This project will benefit the whole community because …", ar: "سيفيد هذا المشروع المجتمع كله لأن …", use: "ذكر الفوائد" },
      { en: "I would be grateful if you could …", ar: "سأكون ممتناً لو تفضّلتم بـ …", use: "طلب مهذب" },
      { en: "Would it be possible to arrange a meeting?", ar: "هل يمكن ترتيب لقاء؟", use: "طلب مهذب" },
      { en: "Our school would be happy to provide volunteers.", ar: "يسعد مدرستنا توفير متطوعين.", use: "عرض المساعدة" },
      { en: "Please find attached some photographs of the park.", ar: "تجدون مرفقاً بعض الصور للحديقة.", use: "إرفاق ملفات أو صور" },
      { en: "Thank you for your time and consideration.", ar: "شكراً لوقتكم واهتمامكم.", use: "الشكر في الخاتمة" },
      { en: "I look forward to hearing from you.", ar: "أتطلع إلى سماع ردّكم.", use: "ختام الرسالة (بعد look forward to نستخدم V-ing)" },
      { en: "Dear Sir or Madam, … Yours faithfully,", ar: "سيدي / سيدتي … مع خالص التقدير", use: "عندما لا تعرف اسم المستلم" },
      { en: "Dear Mr Haddad, … Yours sincerely,", ar: "السيد حداد … مع خالص التحية", use: "عندما تعرف اسم المستلم" }
    ],
    task: "Your school's environmental club wants to improve a public space in your neighbourhood. Write a formal email (150–200 words) to your local municipality suggesting an environmental project, for example planting trees, setting up a recycling scheme or cleaning a park. Describe the problem, explain your proposal and its benefits, and politely ask for support.",
    taskAr: "ناديك البيئي في المدرسة يريد تحسين مكان عام في حيّك. اكتب رسالة إلكترونية رسمية (150–200 كلمة) إلى البلدية تقترح فيها مشروعاً بيئياً (مثل زراعة الأشجار أو نظام لإعادة التدوير أو تنظيف حديقة). صِف المشكلة، واشرح اقتراحك وفوائده، واطلب الدعم بأسلوب مهذب. (النموذج أدناه عن مدرسة وحديقة خياليتين.)",
    words: [150, 200],
    model: [
      "Subject: Proposal for a tree-planting and recycling project in our neighbourhood park",
      "Dear Sir or Madam,",
      "I am a student at Al-Zahra Secondary School, and I am writing to suggest an environmental project for the small park behind our school.",
      "At present, the park is dry and dusty, with very few trees, and litter is a serious problem because there are no recycling bins nearby. As a result, families rarely use the park, especially during the scorching heat of summer. If nothing is done, the situation is likely to get worse.",
      "I would like to propose a project in which students and local residents plant trees and place recycling bins around the park. The trees will provide shade, and the bins are likely to reduce the amount of litter. In addition, a greener park would give children a safe place to play. Our school would be happy to provide volunteers, and I would be grateful if the municipality could supply the young trees and the bins.",
      "Thank you for your time and consideration. I look forward to hearing from you.",
      "Yours faithfully,",
      "Lina Haddad"
    ],
    check: [
      "هل كتبت عنوان رسالة (Subject) قصيراً ومحدداً؟",
      "هل اخترت تحية وخاتمة متوافقتين (Dear Sir or Madam ← Yours faithfully / Dear Mr Haddad ← Yours sincerely)؟",
      "هل ذكرت سبب الكتابة في الفقرة الأولى بجملة مثل I am writing to …؟",
      "هل لكل فقرة غرض واحد واضح (الغرض، المشكلة، الاقتراح، الخاتمة)؟",
      "هل الأسلوب رسمي: بلا اختصارات (I am وليس I'm) وبلا كلمات عامية أو علامات تعجّب؟",
      "هل استخدمت طلباً مهذباً (I would be grateful if you could …) وعبارات السبب والنتيجة (due to, as a result) وصيغ المستقبل (will, is likely to)؟",
      "هل ختمت بالشكر وبعبارة I look forward to hearing from you ثم وضعت اسمك؟",
      "هل عدد الكلمات بين 150 و200، وهل راجعت التهجئة وعلامات الترقيم؟"
    ]
  },
  speaking: {
    title: "Solving problems together and persuading others",
    ar: "حلّ المشكلات معاً: التردّد والاتفاق والاختلاف والإقناع",
    phrases: [
      { en: "I can't make up my mind.", ar: "لا أستطيع أن أحسم أمري.", use: "التعبير عن التردد" },
      { en: "I'm torn between … and …", ar: "أنا حائر بين … و…", use: "التردد بين خيارين" },
      { en: "On the one hand …, but on the other hand …", ar: "من ناحية …، لكن من ناحية أخرى …", use: "وزن الإيجابيات والسلبيات" },
      { en: "That's a good point. / You've got a point there.", ar: "هذه نقطة جيدة. / معك حق في هذه النقطة.", use: "الموافقة" },
      { en: "I couldn't agree more.", ar: "أوافقك تماماً.", use: "موافقة قوية" },
      { en: "Exactly! That's just what I was thinking.", ar: "بالضبط! هذا ما كنت أفكر فيه.", use: "موافقة حماسية" },
      { en: "I see your point, but …", ar: "أفهم وجهة نظرك، لكن …", use: "الاختلاف بلطف" },
      { en: "I'm afraid I don't agree.", ar: "للأسف لا أوافق.", use: "اختلاف مهذب" },
      { en: "I'm not convinced that … would work.", ar: "لست مقتنعاً بأن … سينجح.", use: "التشكيك بأدب" },
      { en: "Why don't we …? / How about …ing? / What if we …?", ar: "لماذا لا … ؟ / ما رأيك في … ؟ / ماذا لو … ؟", use: "اقتراح حل" },
      { en: "The best solution would be to …", ar: "أفضل حل هو أن …", use: "عرض الحل الأفضل" },
      { en: "Shall we agree on …, then?", ar: "هل نتفق على … إذن؟", use: "الوصول إلى قرار" },
      { en: "Imagine what would happen if …", ar: "تخيّلوا ماذا سيحدث لو …", use: "عرض إقناعي: جذب الانتباه" },
      { en: "Let me give you three good reasons.", ar: "دعوني أعطيكم ثلاثة أسباب وجيهة.", use: "عرض إقناعي: تنظيم الحجج" },
      { en: "If we act now, we will … So I urge you to …", ar: "إذا تحرّكنا الآن فسوف … لذلك أحثّكم على …", use: "عرض إقناعي: الدعوة إلى التحرك" },
      { en: "CLImate change, GREENhouse gases, SEA level, CARbon footprint", ar: "في الأسماء المركبة يقع النبر على الجزء الأول؛ انطقها هكذا ليبدو عرضك واضحاً وطبيعياً.", use: "نطق: نبر الأسماء المركبة" }
    ],
    dialogue: [
      ["Rama", "We need a project for Green Week, and honestly, I can't make up my mind. I'm torn between a recycling corner and a tree-planting day."],
      ["Khaled", "On the one hand, bins would help every single day. On the other hand, planting trees is more exciting, and it will cool the school yard in summer."],
      ["Rama", "That's a good point. But who is going to empty the bins? I'm not convinced the cleaners will have time."],
      ["Khaled", "I see your point, but why don't we ask the science club to take turns? What if we do both – bins first, trees in spring?"],
      ["Rama", "I couldn't agree more! The best solution would be to start small and grow. Shall we agree on that, then?"],
      ["Khaled", "Definitely. Now we have to persuade Mr Samer. Imagine our yard in a year – greener, cleaner and full of students who are proud of it."],
      ["Rama", "Nice! And let me give him three good reasons: it saves money, it teaches responsibility, and it reduces our carbon footprint."],
      ["Khaled", "If we present it on Sunday, he will probably say yes. I'll prepare the slides tonight."],
      ["Rama", "Great. I'm meeting the art teacher at ten tomorrow, so I'll ask her to help with the posters."]
    ]
  },
  test: [
    { t: "mcq", q: "Burning coal and oil releases carbon dioxide and other ____ that trap heat in the atmosphere.", o: ["food chains", "greenhouse gases", "flash floods", "breeding programmes"], a: 1, k: "vocab", x: "greenhouse gases = غازات الدفيئة، وهي الغازات التي تحبس الحرارة في الغلاف الجوي. أما food chains فسلاسل غذائية، وflash floods سيول مفاجئة." },
    { t: "mcq", q: "We couldn't play football outside because of the ____ rain.", o: ["heavy", "strong", "big", "high"], a: 0, k: "vocab", x: "الصحيح heavy rain (أمطار غزيرة). نقول strong winds مع الرياح، لكن heavy مع المطر." },
    { t: "mcq", q: "Long periods of drought can ____ crop failures and food shortages.", o: ["be caused by", "due to", "as a result of", "lead to"], a: 3, k: "vocab", x: "الجفاف هو السبب وفشل المحاصيل هو النتيجة ← lead to + النتيجة. أما be caused by فتأتي بعدها العبارة التي تمثّل السبب، وdue to وas a result of لا تأتيان بعد can." },
    { t: "mcq", q: "The football match was postponed ____ the thick fog.", o: ["because", "so", "due to", "as a result"], a: 2, k: "vocab", x: "بعد due to يأتي اسم أو عبارة اسمية (the thick fog). أما because فيأتي بعدها جملة كاملة، وso وas a result لا تأتيان بهذا الشكل قبل الاسم." },
    { t: "mcq", q: "Park rangers are working hard to stop ____, the illegal hunting of wild animals.", o: ["poaching", "desertification", "drought", "pollution"], a: 0, k: "vocab", x: "poaching = الصيد غير المشروع للحيوانات البرية، وهو المعنى المذكور بعد الفاصلة." },
    { t: "mcq", q: "Sand cats are ____, so they sleep in burrows during the day and hunt at night.", o: ["extinct", "vulnerable", "endangered", "nocturnal"], a: 3, k: "vocab", x: "nocturnal = ليلي النشاط، وهذا ما يفسّر النوم نهاراً والصيد ليلاً. أما extinct فمنقرض، وvulnerable معرّض للخطر، وendangered مهدّد بالانقراض." },
    { t: "mcq", q: "The weather report says there is a small chance of snow tonight. It ____ snow, but it isn't very likely.", o: ["is bound to", "might", "will definitely", "is certain to"], a: 1, k: "g11u2-gr1", x: "احتمال ضعيف (small chance … isn't very likely) ← might + فعل مجرد. أما is bound to وwill definitely وis certain to فتدل على التأكّد." },
    { t: "mcq", q: "Rain is ____ fall in Aqaba in July.", o: ["unlike to", "not unlikely", "unlikely to", "improbable to"], a: 2, k: "g11u2-gr1", x: "unlikely to + فعل مجرد = من غير المرجّح أن. أما improbable فلا يأتي بعدها to + فعل، وnot unlikely تعني «من المحتمل» وتحتاج إلى to أيضاً." },
    { t: "gap", q: "A: Do you think the match will be cancelled? B: I doubt it. I don't think it ____ (be) cancelled.", a: ["will be", "'ll be", "is going to be", "'s going to be"], k: "g11u2-gr1", x: "بعد I don't think نضع فعلاً مثبتاً مع will: it will be cancelled." },
    { t: "gap", q: "He hasn't studied at all, so he is unlikely ____ (pass) the exam.", a: ["to pass"], k: "g11u2-gr1", x: "be unlikely to + فعل مجرد: unlikely to pass." },
    { t: "err", q: "Scientists say that sea levels are likely rising by the end of the century.", w: "rising", c: "to rise (are likely to rise)", k: "g11u2-gr1", x: "be likely + to + فعل مجرد: are likely to rise." },
    { t: "mcq", q: "A: The phone is ringing. B: I ____ it!", o: ["was answering", "have answered", "answered", "'ll answer"], a: 3, k: "g11u2-gr2", x: "قرار لحظي في لحظة الكلام ← will: I'll answer." },
    { t: "mcq", q: "Our flight ____ at 6.45 tomorrow morning, so we must get up very early.", o: ["departs", "depart", "departing", "is depart"], a: 0, k: "g11u2-gr2", x: "رحلة طيران بجدول رسمي ← Present simple، والفاعل مفرد: departs." },
    { t: "mcq", q: "Please don't call me at eight tomorrow evening. I ____ for my final exams.", o: ["will have studied", "will be studying", "have studied", "studied"], a: 1, k: "g11u2-gr2", x: "at eight tomorrow evening ← حدث سيكون جارياً في وقت محدد في المستقبل (ولذلك لا تتصل بي) ← Future continuous: will be studying." },
    { t: "mcq", q: "By the time the guests ____, we will have finished cooking.", o: ["will arrive", "arrived", "arrive", "are arrived"], a: 2, k: "g11u2-gr2", x: "بعد by the time نستخدم المضارع البسيط وليس will: By the time the guests arrive." },
    { t: "tr", q: "The workers will finish the new library before the end of June.", p: "Rewrite starting with: By the end of June, the workers …", a: ["By the end of June, the workers will have finished the new library.", "By the end of June the workers will have finished the new library.", "By the end of June, the workers will have completed the new library.", "By the end of June the workers will have completed the new library."], k: "g11u2-gr2", x: "before the end of June = by the end of June ← Future perfect: will have + V3." },
    { t: "mcq", q: "A: Should we hold the clean-up day on Friday or Saturday? B: I can't make up my mind – I'm ____ the two.", o: ["agreed with", "keen at", "tired for", "torn between"], a: 3, k: "speaking", x: "I'm torn between … and … تعبّر عن التردد بين خيارين." },
    { t: "mcq", q: "Which reply politely disagrees with the idea 'Let's cancel the project'?", o: ["I see your point, but I'm not sure that would solve the problem.", "That's a silly idea.", "I couldn't agree more.", "You're wrong, so please be quiet."], a: 0, k: "speaking", x: "I see your point, but … عبارة مهذبة للاختلاف. أما I couldn't agree more فموافقة، والخياران الآخران غير مهذبين." },
    { t: "mcq", q: "Read: 'Last year, the school garden was full of butterflies. This spring there are hardly any. Our teacher thinks the new car park, the noise from the building work and the loss of old flowering bushes are the main reasons.' What is the main idea of the paragraph?", o: ["Butterflies are the most beautiful insects in the world.", "The school is planning to build a bigger car park.", "Teachers should stop all building work.", "The garden has fewer butterflies than last year, probably because of changes made by people."], a: 3, k: "reading", x: "الجملتان الأولى والثانية تذكران انخفاض عدد الفراشات، والثالثة تذكر الأسباب المحتملة. الخيارات الأخرى غير مذكورة في الفقرة." },
    { t: "mcq", q: "Which sentence is the most suitable for a formal email to a municipality?", o: ["Can you fix the park ASAP? It's a mess!", "I would be grateful if you could consider planting more trees in our park.", "Hey! We need more trees in the park, OK?", "Plant some trees, please!!"], a: 1, k: "writing", x: "الرسالة الرسمية تستخدم طلباً مهذباً مثل I would be grateful if you could … وتتجنب العامية والاختصارات وعلامات التعجب." }
  ]
});

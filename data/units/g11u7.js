TAF.unit({
  id: "g11u7",
  grade: 11, sem: 2, n: 7,
  title: "Is it fair?",
  ar: "هل هذا عادل؟",
  topics: "قضايا العدالة الاجتماعية (المساواة، الفقر، البطالة، العنصرية، الهجرة)، مشكلات المياه والبيئة، العمل الخيري والتبرّع والتطوّع، نقل الكلام وأفعال النقل وأنماطها، والتعبير عن الرأي وكتابة مقالة صحفية",
  goals: [
    "نقل أقوال الآخرين بصيغة Reported speech مع تطبيق الـ backshift وتغيير الضمائر وكلمات الزمان والمكان بدقة",
    "نقل الأسئلة بنوعيها (yes/no وwh-) والأوامر والطلبات بترتيب الكلمات الصحيح وبصيغة (not) to + V",
    "استخدام أفعال النقل (admit, deny, suggest, agree, offer, advise, accuse, congratulate, explain…) مع النمط الصحيح لكل فعل: -ing أو to + V أو حرف جر + -ing أو that-clause",
    "توظيف مفردات القضايا الاجتماعية ومشكلات المياه والعمل الخيري، والأفعال مع حروف الجر المصاحبة لها مثل protect against وdeal with وparticipate in",
    "تحديد غرض الكاتب واتجاهه (attitude) من خلال اختيار الكلمات والتفاصيل وطريقة ختم النص",
    "التعبير عن الرأي بدرجات مختلفة من القوة والاعتراض بلباقة، وكتابة مقالة (article) بعنوان جذاب ومقدمة مشوّقة وخاتمة مؤثرة"
  ],
  vocab: [
    { w: "gender equality", ar: "المساواة بين الجنسين", pos: "noun phrase", def: "the idea that men and women should have the same rights and chances", ex: "Many countries have passed new laws to promote gender equality in the workplace.", tag: "social issues" },
    { w: "homelessness", ar: "التشرّد (عدم وجود مأوى)", pos: "noun", def: "the situation of having no home to live in", ex: "The charity's winter campaign aims to reduce homelessness in our city.", tag: "social issues" },
    { w: "racism", ar: "العنصرية", pos: "noun", def: "unfair treatment of people because of their race or skin colour", ex: "The school runs workshops that teach students to stand up against racism.", tag: "social issues" },
    { w: "immigration", ar: "الهجرة إلى بلد جديد للعيش فيه", pos: "noun", def: "the process of moving to a foreign country to live there", ex: "Strict immigration rules decide who is allowed to live and work in a country.", tag: "social issues" },
    { w: "unemployment", ar: "البطالة", pos: "noun", def: "the situation in which people want to work but cannot find jobs", ex: "High unemployment among young graduates worries many families.", tag: "social issues" },
    { w: "poverty", ar: "الفقر", pos: "noun", def: "the state of not having enough money for basic needs", ex: "Good schools can help children escape poverty and build a better future.", tag: "social issues" },
    { w: "discrimination", ar: "التمييز (معاملة غير عادلة)", pos: "noun", def: "treating a person or group worse than others for an unfair reason", ex: "Discrimination at work because of age, gender or religion is illegal in many countries.", tag: "social issues" },
    { w: "enforce", ar: "يُنفّذ (قانوناً) / يفرض", pos: "verb", def: "to make sure that people obey a law or rule", ex: "Traffic police enforce the seat-belt law on all main roads.", tag: "social issues" },
    { w: "equal", ar: "متساوٍ", pos: "adjective", def: "having the same rights, value or status as others", ex: "Under the law, every citizen is equal, whatever his or her background.", tag: "social issues" },
    { w: "justify", ar: "يبرّر", pos: "verb", def: "to show or explain that something is reasonable or right", ex: "Can anything justify wasting food while other families go hungry?", tag: "social issues" },
    { w: "institution", ar: "مؤسسة (كالمدرسة والمستشفى والبنك)", pos: "noun", def: "a large and important organisation such as a bank, school or hospital", ex: "Schools, hospitals and banks are institutions that every society depends on.", tag: "social issues" },
    { w: "expand", ar: "يتوسّع / يوسّع", pos: "verb", def: "to become bigger or to make something bigger", ex: "The charity plans to expand its food programme to three more cities.", tag: "social issues" },
    { w: "contaminate (water supplies)", ar: "يلوّث (مصادر المياه العذبة)", pos: "verb", def: "to make something dirty or poisonous by adding harmful substances", ex: "Waste from the factory could contaminate the fresh water supplies of nearby villages.", tag: "water and environment" },
    { w: "broken pipes", ar: "أنابيب مكسورة (يتسرّب منها الماء)", pos: "collocation", def: "damaged pipes that let water escape or let dirt in", ex: "Broken pipes waste a huge amount of drinking water every year.", tag: "water and environment" },
    { w: "install (new toilets)", ar: "يركّب (مراحيض جديدة)", pos: "verb", def: "to fit equipment in a place so that it is ready to use", ex: "Volunteers helped to install new toilets at the village school.", tag: "water and environment" },
    { w: "natural disasters", ar: "كوارث طبيعية", pos: "collocation", def: "sudden events in nature, such as floods or earthquakes, that cause great damage", ex: "After natural disasters like floods, clean water is often the first thing people need.", tag: "water and environment" },
    { w: "provide (water filters)", ar: "يوفّر (فلاتر مياه)", pos: "verb", def: "to give or supply something that people need", ex: "The foundation will provide water filters for every family in the village.", tag: "water and environment" },
    { w: "anonymous", ar: "مجهول الاسم / دون ذكر الهوية", pos: "adjective", def: "with a name that is not known or not made public", ex: "An anonymous donor paid for all the books in the new school library.", tag: "charity and kindness" },
    { w: "commission", ar: "تكليف رسمي بعمل (مدفوع) / عمولة", pos: "noun", def: "a formal request for someone to create something, or money earned from a sale", ex: "The town council gave the artist a commission to design a fountain for the square.", tag: "charity and kindness" },
    { w: "foundation", ar: "مؤسسة خيرية (تموّل أعمالاً نافعة)", pos: "noun", def: "an organisation that gives money to support a good cause", ex: "A family foundation paid for the clinic's new equipment.", tag: "charity and kindness" },
    { w: "ill-equipped", ar: "غير مجهَّز بما يكفي / غير مؤهَّل", pos: "adjective", def: "not having the tools or skills needed to do something", ex: "The village clinic was ill-equipped, with only two skilled nurses and almost no medicine.", tag: "charity and kindness" },
    { w: "industrious", ar: "مجتهد / كثير العمل", pos: "adjective", def: "working hard and steadily", ex: "Rami is an industrious student who always hands in his work on time.", tag: "charity and kindness" },
    { w: "integral", ar: "أساسي لا غنى عنه (جزء لا يتجزأ)", pos: "adjective", def: "forming an essential part of something", ex: "Volunteers are integral to the success of any charity.", tag: "charity and kindness" },
    { w: "intern", ar: "متدرّب (في شركة أو مؤسسة)", pos: "noun", def: "a student or young person working for a short time to gain experience", ex: "As an intern at the foundation, Dina answered calls and helped to plan events.", tag: "charity and kindness" },
    { w: "proceeds", ar: "العائدات (المال المحصَّل من حدث أو بيع)", pos: "noun", def: "the money made from an event or from selling something", ex: "All proceeds from the school fair will go to the children's ward.", tag: "charity and kindness" },
    { w: "donate", ar: "يتبرّع", pos: "verb", def: "to give money or goods to a person or charity", ex: "Many families donate food and clothes to the local charity during Ramadan.", tag: "charity and kindness" },
    { w: "fundraise", ar: "يجمع التبرعات (لقضية أو جمعية)", pos: "verb", def: "to collect money for a charity or a cause", ex: "Our class decided to fundraise for the shelter by selling handmade cards.", tag: "charity and kindness" },
    { w: "prove", ar: "يُثبت", pos: "verb", def: "to show clearly that something is true", ex: "The test results proved that the water was safe to drink.", tag: "useful verbs" },
    { w: "set out", ar: "ينطلق في رحلة / يعرض الأفكار بوضوح", pos: "phrasal verb", def: "to start a journey, or to explain ideas clearly in order", ex: "The volunteers set out at dawn to reach the remote village before noon.", tag: "useful verbs" },
    { w: "set up", ar: "يؤسّس / يُنشئ", pos: "phrasal verb", def: "to start an organisation, business or system", ex: "A group of neighbours set up a small charity to help families in need.", tag: "useful verbs" },
    { w: "test", ar: "يختبر / يفحص", pos: "verb", def: "to check something to see if it works or is safe", ex: "Engineers test the water every week to make sure it is clean.", tag: "useful verbs" },
    { w: "protect (sb/sth) against", ar: "يحمي من", pos: "verb + preposition", def: "to keep someone or something safe from harm or damage", ex: "Regular hand washing can help protect against many illnesses.", tag: "dependent prepositions" },
    { w: "learn from", ar: "يتعلّم من", pos: "verb + preposition", def: "to gain knowledge or experience from a person or event", ex: "We should learn from our mistakes instead of hiding them.", tag: "dependent prepositions" },
    { w: "live in", ar: "يعيش في (مكان أو ظروف معيّنة)", pos: "verb + preposition", def: "to have your home in a place, or to exist in a certain condition", ex: "Too many families still live in poverty and cannot afford basic medicine.", tag: "dependent prepositions" },
    { w: "deal with", ar: "يتعامل مع / يعالج (مشكلة)", pos: "verb + preposition", def: "to take action to solve a problem or handle a situation", ex: "The council has a new plan to deal with the shortage of clean water.", tag: "dependent prepositions" },
    { w: "survive on", ar: "يعيش على (قدر قليل من الطعام أو المال)", pos: "verb + preposition", def: "to stay alive using only a small amount of food or money", ex: "After the floods, some families had to survive on bread and rice for days.", tag: "dependent prepositions" },
    { w: "participate in", ar: "يشارك في", pos: "verb + preposition", def: "to take part in an activity or event", ex: "More than fifty students participated in the charity run last Friday.", tag: "dependent prepositions" },
    { w: "apologise for", ar: "يعتذر عن", pos: "verb + preposition", def: "to say sorry for something you did wrong", ex: "He apologised for forgetting to pass on the message.", tag: "dependent prepositions" },
    { w: "accuse (sb) of", ar: "يتّهم (شخصاً) بـ", pos: "verb + preposition", def: "to say that someone has done something wrong or illegal", ex: "Two students were accused of cheating in the final exam.", tag: "dependent prepositions" },
    { w: "congratulate (sb) on", ar: "يهنّئ (شخصاً) على", pos: "verb + preposition", def: "to tell someone you are pleased about their success or good news", ex: "Laith was congratulated on winning the national science prize.", tag: "dependent prepositions" }
  ],
  grammar: [
    {
      id: "g11u7-gr1",
      title: "Reported speech",
      ar: "الكلام المنقول: الأقوال والأسئلة والأوامر",
      body: [
        { p: "عندما ننقل ما قاله شخص آخر دون أن نكرّر كلماته بالحرف نستخدم **الكلام المنقول (Reported speech)**. نغيّر في الجملة **الزمن** و**الضمائر** و**كلمات الزمان والمكان**، ونحذف علامتي الاقتباس. وسنتعلم هنا كيف ننقل ثلاثة أنواع من الكلام: الجمل الخبرية، والأسئلة، والأوامر والطلبات." },
        { ex: [
          ["Rana said she ==lived== in Irbid.", "قالت رنا إنها تعيش في إربد. (الكلام المباشر: “I live in Irbid.”)"],
          ["The girls told us they ==were collecting== old books.", "أخبرتنا الفتيات أنهن يجمعن كتباً قديمة. (الكلام المباشر: “We are collecting old books.”)"]
        ] },
        { h: "1) الخطوة الأولى: الرجوع بالزمن خطوة إلى الخلف (Backshift)" },
        { p: "إذا كان فعل النقل في الماضي (said, told, asked, explained…) فإننا عادةً **نرجع بزمن الجملة خطوة واحدة إلى الماضي**. وكلمة that بعد said وtold اختيارية في الكلام العادي." },
        { table: { head: ["الكلام المباشر", "الكلام المنقول", "مثال"], rows: [
          ["Present simple", "Past simple", "“I need help.” → He said he needed help."],
          ["Present continuous", "Past continuous", "“We are waiting.” → They said they were waiting."],
          ["Present perfect", "Past perfect", "“I have finished.” → She said she had finished."],
          ["Present perfect continuous", "Past perfect continuous", "“We have been collecting books.” → They said they had been collecting books."],
          ["Past simple", "Past perfect", "“We visited the camp.” → They said they had visited the camp."],
          ["Past continuous", "Past perfect continuous", "“I was waiting.” → He said he had been waiting."],
          ["Past perfect", "Past perfect (لا يتغير)", "“I had left early.” → She said she had left early."]
        ] } },
        { tip: "في الامتحان نحوّل الـ Past simple إلى Past perfect (visited ← had visited) والـ Past continuous إلى Past perfect continuous. وفي الكلام اليومي قد يبقى الزمن الماضي كما هو إذا كان زمن الحدث واضحاً من السياق." },
        { h: "2) الأفعال الناقصة (Modals) في الكلام المنقول" },
        { table: { head: ["الكلام المباشر", "الكلام المنقول", "مثال"], rows: [
          ["will", "would", "“I will help.” → She said she would help."],
          ["can", "could", "“I can swim.” → He said he could swim."],
          ["may", "might", "“It may rain.” → Dad said it might rain."],
          ["must (واجب)", "had to (وقد تبقى must)", "“You must wait.” → She said I had to wait."],
          ["should / would / could / might / ought to", "لا تتغير", "“You should rest.” → He said I should rest."]
        ] } },
        { p: "ملاحظات: (1) **must** التي تدل على **استنتاج** (“He must be tired”) تبقى must بعد said. (2) **mustn't** تبقى كما هي: She said we mustn't be late. (3) **shall** في العروض والاقتراحات تتحول إلى should: “Shall I open the window?” ← He asked if he should open the window." },
        { ex: [
          ["Sami said he ==couldn't== find the key.", "قال سامي إنه لا يستطيع إيجاد المفتاح. (الكلام المباشر: “I can't find the key.”)"],
          ["The nurses said they ==would== visit the clinic soon.", "قالت الممرضات إنهن سيزرن العيادة قريباً. (الكلام المباشر: “We will visit the clinic soon.”)"]
        ] },
        { h: "3) متى لا نعمل backshift؟" },
        { p: "لا نرجع بالزمن في حالتين: **(أ)** إذا كان فعل النقل في المضارع أو المضارع التام أو المستقبل (says, tells, has said, will say)، كأن ننقل رسالة وصلتنا الآن أو نقرأ ما كتبه شخص. **(ب)** إذا كان الكلام حقيقة عامة، أو ما زال صحيحاً وقت النقل (وفي هذه الحالة الثانية يجوز أيضاً أن نعمل backshift)." },
        { ex: [
          ["Nada says she ==is== very busy.", "تقول ندى إنها مشغولة جداً. فعل النقل مضارع، لذلك لا يتغير الزمن. (الكلام المباشر: “I am very busy.”)"],
          ["The teacher told us that the Earth ==goes== round the Sun.", "أخبرنا المعلم أن الأرض تدور حول الشمس. (حقيقة عامة)"]
        ] },
        { tip: "في أسئلة التحويل بالامتحان اعمل backshift بعد أي فعل نقل ماضٍ (said, told, asked) حتى لو كان الكلام ما زال صحيحاً، إلا إذا كانت الجملة حقيقة علمية أو كان فعل النقل في المضارع." },
        { h: "4) الضمائر وكلمات الزمان والمكان" },
        { p: "**الضمائر** تتغير بحسب من يتكلم ومن يُنقل عنه: I ← he / she، we ← they، my ← his / her، our ← their، you ← I / he / she / they حسب المقصود. أما **كلمات الزمان والمكان** فتتغير عندما يختلف وقت النقل أو مكانه عن وقت الكلام الأصلي ومكانه:" },
        { table: { head: ["الكلام المباشر", "الكلام المنقول"], rows: [
          ["now", "then / at that time"],
          ["today / tonight", "that day / that night"],
          ["yesterday", "the day before / the previous day"],
          ["tomorrow", "the next day / the following day"],
          ["last week / last year", "the week before / the year before"],
          ["next week / next month", "the following week / the following month"],
          ["two days ago", "two days before / two days earlier"],
          ["this / these", "that / those"],
          ["here", "there"],
          ["come / bring", "go / take (حسب مكان المتحدث)"]
        ] } },
        { ex: [
          ["Hala told Sami she would call him ==the next day==.", "أخبرت هالة سامياً أنها ستتصل به في اليوم التالي. (الكلام المباشر: “I'll call you tomorrow.”)"],
          ["Adam said that he and his brother lived ==there==.", "قال آدم إنه وأخاه يعيشان هناك. (الكلام المباشر: “My brother and I live here.”)"]
        ] },
        { tip: "إذا نقلنا الكلام في اليوم نفسه وفي المكان نفسه فلا حاجة لتغيير كلمات الزمان والمكان: “I'll call you tomorrow,” she said this morning ← She said she'd call me tomorrow." },
        { h: "5) say و tell" },
        { p: "**tell** يحتاج دائماً إلى شخص بعده (tell + شخص). أما **say** فلا نضع بعده شخصاً مباشرة، وإن أردنا ذكره نستخدم say **to**." },
        { table: { head: ["الفعل", "النمط", "مثال"], rows: [
          ["say", "say (that) + جملة", "She said (that) she was late."],
          ["say", "say to + شخص + (that)", "She said to me that she was late."],
          ["tell", "tell + شخص + (that) + جملة", "She told me (that) she was late."],
          ["tell", "tell + شخص + (not) to + V", "She told me to wait."]
        ] } },
        { p: "وهناك تعابير ثابتة: **tell** the truth / a lie / a story / a joke / a secret / the time، و**say** hello / sorry / thank you / a prayer / something / nothing." },
        { h: "6) نقل الأسئلة (Reported questions)" },
        { p: "عند نقل السؤال نحوّله إلى **جملة خبرية**: لا نستخدم do / does / did، ولا نقلب ترتيب الفاعل والفعل، ولا نكتب علامة استفهام. نستخدم asked أو wanted to know أو wondered، ونطبّق backshift كالمعتاد." },
        { table: { head: ["نوع السؤال", "القاعدة", "مثال"], rows: [
          ["Yes / No", "asked + if / whether + فاعل + فعل", "“Is the well safe?” → She asked if / whether the well was safe."],
          ["Wh-question", "asked + wh-word + فاعل + فعل", "“Where do you work?” → He asked where I worked."],
          ["سؤال عن الفاعل", "asked + who / what + فعل (بلا تغيير في الترتيب)", "“Who lives here?” → She asked who lived there."]
        ] } },
        { ex: [
          ["The teacher asked ==if we recycled== plastic.", "سأل المعلم إن كنا نعيد تدوير البلاستيك. (الكلام المباشر: “Do you recycle plastic?”)"],
          ["I asked ==what time the clinic opened==.", "سألتُ في أي ساعة تفتح العيادة. (الكلام المباشر: “What time does the clinic open?”)"],
          ["She asked me ==whether I had ever donated== blood.", "سألتني إن كنت قد تبرّعت بالدم من قبل. (الكلام المباشر: “Have you ever donated blood?”)"]
        ] },
        { tip: "نفضّل whether عندما يأتي بعده or not (He asked whether I was coming or not)، وبعد حرف الجر، وقبل to + V (I wasn't sure whether to go)." },
        { h: "7) نقل الأوامر والطلبات" },
        { p: "نستخدم: **فعل نقل + شخص + (not) to + V**. لا يوجد backshift هنا لأن الفعل يأتي بصيغة to + V. نستخدم told / ordered للأمر القوي، وasked للطلب المهذّب (please / could you)." },
        { ex: [
          ["The teacher ==told us to close== the window.", "طلب منا المعلم أن نغلق النافذة. (الكلام المباشر: “Close the window.”)"],
          ["Mona ==asked me to help== her.", "طلبت مني منى أن أساعدها. (الكلام المباشر: “Could you help me, please?”)"],
          ["The guard ==ordered us not to touch== the wires.", "أمرنا الحارس ألا نلمس الأسلاك. (الكلام المباشر: “Don't touch the wires!”)"]
        ] },
        { warn: "✗ She asked me where did I live. ← ✓ She asked me where ==I lived==. بعد wh-word نستخدم ترتيب الجملة الخبرية بلا did." },
        { warn: "✗ She told me where I lived. (إذا كان الأصل سؤالاً) ← ✓ She ==asked== me where I lived. السؤال ينقل بـ asked أو wanted to know أو wondered، وليس بـ told." },
        { warn: "✗ He said me that he was late. ← ✓ He ==told me== that he was late. / He ==said== that he was late. فالفعل say لا يأخذ شخصاً مباشرة." },
        { warn: "✗ The doctor told me don't eat sugar. ← ✓ The doctor told me ==not to eat== sugar. الأمر المنفي ينقل بالنمط told + شخص + not to + V، ولا نكتب don't بعد الفعل." },
        { warn: "✗ Dana said she will call me the next day. ← ✓ Dana said she ==would== call me the next day. العبارة the next day تدل على أن الكلام منقول، فلا بد من would." }
      ],
      summary: [
        "فعل النقل ماضٍ ← backshift: live ← lived، have done ← had done، will ← would، can ← could، may ← might.",
        "فعل النقل مضارع (says) أو الكلام حقيقة عامة ← لا يتغير الزمن.",
        "غيّر الضمائر وكلمات الزمان والمكان: today ← that day، tomorrow ← the next day، here ← there.",
        "tell + شخص دائماً (told me)، وsay لا يأخذ شخصاً مباشرة (said to me).",
        "الأسئلة: if / whether أو wh-word + ترتيب الجملة الخبرية، بلا do/did وبلا علامة استفهام.",
        "الأوامر والطلبات: told / asked / ordered + شخص + (not) to + V."
      ],
      qs: [
        { t: "mcq", q: "“I work at the shelter on Fridays,” said Hind. → Hind said that she ____ at the shelter on Fridays.", o: ["will work", "worked", "has worked", "had worked"], a: 1, x: "فعل النقل said ماضٍ، فيرجع Present simple خطوة إلى الخلف ← Past simple: work ← worked." },
        { t: "mcq", q: "“I'm planning a charity run,” says Yousef on the phone. → Yousef says that he ____ a charity run.", o: ["is planning", "was planning", "had been planning", "would plan"], a: 0, x: "فعل النقل says في المضارع، فلا نعمل backshift ويبقى الزمن Present continuous." },
        { t: "mcq", q: "“We'll finish the well tomorrow,” the engineer said two weeks ago. → Two weeks ago, the engineer said they would finish the well ____.", o: ["tomorrow", "the day before", "yesterday", "the next day"], a: 3, x: "عند نقل الكلام في وقت لاحق تتحول tomorrow إلى the next day (أو the following day)، وتتحول will إلى would." },
        { t: "mcq", q: "The nurse ____ the family that the patient was feeling better.", o: ["told", "said", "spoke", "talked"], a: 0, x: "الفعل tell يحتاج شخصاً بعده (told the family). أما said فلا يأخذ شخصاً مباشرة؛ نقول said to the family." },
        { t: "mcq", q: "“Do you recycle plastic bottles?” the teacher asked us. → The teacher asked us ____ plastic bottles.", o: ["did we recycle", "that we recycled", "if we recycled", "if did we recycle"], a: 2, x: "سؤال yes/no ينقل بـ if أو whether + ترتيب الجملة الخبرية بلا did، والزمن يرجع خطوة: recycle ← recycled." },
        { t: "mcq", q: "“What time does the clinic open?” she asked. → She asked ____.", o: ["what time did the clinic open", "what time the clinic opened", "what time had the clinic opened", "what time would the clinic open"], a: 1, x: "بعد wh-word نستخدم ترتيب الجملة الخبرية (فاعل + فعل) بلا does/did، مع backshift: open ← opened." },
        { t: "mcq", q: "“Don't drink the tap water,” the guide told us. → The guide told us ____ the tap water.", o: ["don't drink", "not drink", "not to drink", "no drinking"], a: 2, x: "الأمر المنفي ينقل بالنمط told + شخص + not to + V." },
        { t: "gap", q: "“We will open the new library tomorrow,” the mayor announced. → The mayor announced that they ____ open the new library the following day.", a: ["would", "were going to", "were to"], x: "تتحول will إلى would عند النقل (ويصح أيضاً were going to)، والعبارة the following day تؤكد أن الكلام منقول." },
        { t: "gap", q: "“Have you finished your homework?” Mum asked me. → Mum asked me ____ I had finished my homework.", a: ["if", "whether"], x: "سؤال yes/no ينقل بـ if أو whether، ويتحول Present perfect إلى Past perfect." },
        { t: "gap", q: "“I'm leaving today,” Fares said. A week later I told my sister: “Fares said he was leaving ____.”", a: ["that day", "on that day", "the same day", "on the same day", "that same day", "on that same day"], x: "عندما يختلف وقت النقل عن وقت الكلام الأصلي تتحول today إلى that day." },
        { t: "gap", q: "“Please be quiet,” the librarian said to us. → The librarian asked us ____ quiet.", a: ["to be"], x: "الطلب المهذّب ينقل بالنمط asked + شخص + to + V." },
        { t: "gap", q: "“I haven't visited the new clinic until now,” said Amal. → Amal said that she ____ visited the new clinic until then.", a: ["hadn't", "had not"], x: "بعد فعل نقل ماضٍ يتحول Present perfect إلى Past perfect: have not visited ← had not visited، وuntil now ← until then." },
        { t: "tr", q: "“I'm going to donate my old bike,” Tamer said.", p: "Report it with backshift. Start: Tamer said …", a: ["Tamer said he was going to donate his old bike.", "Tamer said that he was going to donate his old bike.", "Tamer said he would donate his old bike.", "Tamer said that he would donate his old bike.", "Tamer said he'd donate his old bike.", "Tamer said that he'd donate his old bike."], x: "am going to ← was going to (ويصح أيضاً would donate)، وI ← he، وmy ← his." },
        { t: "tr", q: "“Where did you put the donation box?” she asked me.", p: "Rewrite starting with: She asked me …", a: ["She asked me where I had put the donation box.", "She asked me where I put the donation box.", "She asked me where I'd put the donation box."], x: "يتحول السؤال إلى جملة خبرية: where + فاعل + فعل، ويتحول Past simple إلى Past perfect (ويُقبل بقاؤه Past simple)، وyou ← I." },
        { t: "err", q: "The doctor said me to rest for a week.", w: "said", c: "told (The doctor told me to rest)", x: "للأوامر والنصائح نستخدم told + شخص + to + V، والفعل said لا يأخذ شخصاً مباشرة." },
        { t: "err", q: "Dana said that she will call me the next day.", w: "will", c: "would", x: "فعل النقل ماضٍ والعبارة the next day تدل على الكلام المنقول ← will تتحول إلى would." },
        { t: "order", a: "She asked me whether I had seen the doctor.", x: "السؤال المنقول: asked + whether + فاعل + فعل (Past perfect) بلا ترتيب سؤال." }
      ]
    },
    {
      id: "g11u7-gr2",
      title: "Reporting verbs and their patterns",
      ar: "أفعال النقل وأنماطها (admit, suggest, offer, advise, accuse, explain…)",
      body: [
        { p: "بدلاً من تكرار said في كل مرة، نستخدم **أفعال نقل (Reporting verbs)** تعبّر عن **قصد** المتكلم: هل اقترح؟ وعد؟ اعتذر؟ اتّهم؟ ولكل فعل **نمط ثابت** يأتي بعده، ومعرفة هذا النمط هي مفتاح الإجابة الصحيحة في الامتحان. وميزة هذه الأفعال أنها تختصر الجملة، وأغلب أنماطها لا تحتاج إلى backshift." },
        { h: "الأنماط الستة في نظرة واحدة" },
        { table: { head: ["النمط", "الأفعال", "مثال"], rows: [
          ["V + -ing", "admit (يعترف)، deny (ينكر)، regret (يندم)، suggest (يقترح)، recommend (يوصي)", "He admitted breaking the window."],
          ["V + to + V", "agree (يوافق)، offer (يعرض)، refuse (يرفض)، promise (يعد)، threaten (يهدّد)، claim (يدّعي)", "She offered to help."],
          ["V + شخص + to + V", "advise (ينصح)، encourage (يشجّع)، persuade (يقنع)، warn (يحذّر)، remind (يذكّر)، invite (يدعو)", "He advised us to leave early."],
          ["V + حرف جر + -ing", "apologise for (يعتذر عن)، insist on (يصرّ على)", "They apologised for being late."],
          ["V + شخص + حرف جر + -ing", "accuse sb of (يتّهم بـ)، congratulate sb on (يهنّئ على)، praise sb for (يثني على)، blame sb for (يلوم على)", "She accused him of lying."],
          ["V + (that) + جملة", "explain (يشرح)، mention (يذكر)، complain (يشتكي)، announce (يعلن)", "He explained that the road was closed."]
        ] } },
        { p: "**طريقة الحل في ثلاث خطوات:** (1) افهم قصد المتكلم. (2) اختر فعل النقل المناسب له. (3) استخدم نمط هذا الفعل، وغيّر الضمائر وكلمات الزمان والمكان عند الحاجة." },
        { h: "1) فعل + -ing: admit, deny, regret, suggest, recommend" },
        { p: "تعبّر هذه الأفعال عن اعتراف أو إنكار أو ندم أو اقتراح أو توصية، ويأتي بعدها **-ing** مباشرة." },
        { ex: [
          ["Ali ==admitted breaking== the vase.", "اعترف علي بأنه كسر المزهرية. (الكلام المباشر: “I broke the vase.”)"],
          ["Nour ==denied taking== my pen.", "أنكرت نور أنها أخذت قلمي. (الكلام المباشر: “I didn't take your pen.”)"],
          ["Zaid ==regretted shouting== at her.", "ندم زيد على أنه صرخ في وجهها. (الكلام المباشر: “I wish I hadn't shouted at her.”)"],
          ["Mona ==suggested collecting== old clothes.", "اقترحت منى جمع الملابس القديمة. (الكلام المباشر: “Let's collect old clothes.”)"],
          ["Dad ==recommended trying== the new bakery.", "أوصى أبي بتجربة المخبز الجديد. (الكلام المباشر: “You should try the new bakery.”)"]
        ] },
        { tip: "suggest وrecommend يأتي بعدهما -ing أو that + فاعل (+ should): She suggested ==that we (should) wait==. ولا نقول suggested to wait ولا suggested me to wait. وفي الامتحان استخدم بعد recommend صيغة -ing أو that-clause." },
        { tip: "regret + -ing تعني الندم على شيء فعلناه: He regretted ==shouting==. أما regret to say / to inform فهي عبارة رسمية بمعنى «يؤسفني أن أقول»: We regret to inform you that the flight is cancelled." },
        { h: "2) فعل + to + V: agree, offer, refuse, promise, threaten, claim" },
        { ex: [
          ["Sami ==agreed to help== us.", "وافق سامي على مساعدتنا. (الكلام المباشر: “OK, I'll help you.”)"],
          ["The driver ==offered to carry== our bags.", "عرض السائق أن يحمل حقائبنا. (الكلام المباشر: “I'll carry your bags.”)"],
          ["The manager ==refused to sign== it.", "رفض المدير التوقيع عليه. (الكلام المباشر: “No, I won't sign it.”)"],
          ["Tareq ==promised to be== there at six.", "وعد طارق بأن يكون هناك في السادسة. (الكلام المباشر: “I'll be there at six.”)"],
          ["Dina ==threatened to tell== the teacher.", "هدّدت دينا بأن تخبر المعلمة. (الكلام المباشر: “Hand it back, or I'll tell the teacher.”)"],
          ["The stranger ==claimed to be== a trained nurse.", "ادّعى الغريب أنه ممرض مدرَّب. (الكلام المباشر: “I'm a trained nurse.”)"]
        ] },
        { p: "النفي بوضع **not** قبل to: She promised ==not to be== late. ولا نضيف not بعد refuse عند نقل جملة منفية لأن معناه سلبي أصلاً: “I won't pay.” ← He refused to pay. (أما refused not to pay فتعني أنه أصرّ على الدفع)." },
        { tip: "للحديث عن ادّعاء يخص الماضي نستخدم claim + to have + V3: He claimed ==to have seen== the thief. وهي بمعنى He claimed that he had seen the thief." },
        { h: "3) فعل + شخص + to + V: advise, encourage, persuade, warn, remind, invite" },
        { p: "هنا **الشخص (المفعول به) ضروري** بعد الفعل وقبل to: ✗ He advised to rest ← ✓ He advised ==me to rest==." },
        { ex: [
          ["Mum ==advised me to see== a doctor.", "نصحتني أمي بزيارة الطبيب. (الكلام المباشر: “You should see a doctor.”)"],
          ["Mr Adel ==encouraged me to enter== the competition.", "شجّعني الأستاذ عادل على دخول المسابقة. (الكلام المباشر: “Go on, enter the competition!”)"],
          ["Rula ==persuaded Dana to come== with us.", "أقنعت رولا دانا بأن تأتي معنا، وقد وافقت دانا في النهاية. (الكلام المباشر: “Please come with us, Dana.”)"],
          ["The lifeguard ==warned us not to swim== there.", "حذّرنا المنقذ من السباحة هناك. (الكلام المباشر: “Don't swim here – it's dangerous.”)"],
          ["The teacher ==reminded us to bring== our ID cards.", "ذكّرنا المعلم بإحضار بطاقاتنا الشخصية. (الكلام المباشر: “Don't forget your ID card.”)"],
          ["Lina ==invited us to join== her picnic.", "دعتنا لينا إلى الانضمام إلى نزهتها. (الكلام المباشر: “Would you like to join our picnic?”)"]
        ] },
        { tip: "advise وsuggest متقاربان في المعنى لكن نمطيهما مختلفان: She ==advised me to take== a taxi (شخص + to + V) تعني تقريباً She ==suggested taking== a taxi (-ing). ولا نقول suggested me to take." },
        { tip: "persuade تعني أن المحاولة **نجحت** (persuaded him to come = وافق فعلاً). أما إن لم تنجح فنقول tried to persuade him to come." },
        { h: "4) فعل + حرف جر + -ing: apologise for, insist on" },
        { p: "بعد أي حرف جر نستخدم **-ing** دائماً. ويمكن ذكر الشخص بعد apologise بـ to: She apologised ==to me== for being late." },
        { ex: [
          ["Karim ==apologised for being== late.", "اعتذر كريم عن تأخره. (الكلام المباشر: “I'm sorry I'm late.”)"],
          ["Lara ==apologised for not calling== earlier.", "اعتذرت لارا لأنها لم تتصل في وقت أبكر. (الكلام المباشر: “Sorry for not calling earlier.”)"],
          ["Rami ==insisted on paying== for the tickets.", "أصرّ رامي على دفع ثمن التذاكر. (الكلام المباشر: “Let me pay for the tickets!”)"]
        ] },
        { h: "5) فعل + شخص + حرف جر + -ing: accuse of, congratulate on, praise for, blame for" },
        { p: "يأتي **الشخص** بعد الفعل، ثم **حرف جر ثابت** لكل فعل، ثم **-ing**. احفظ الحرف مع الفعل:" },
        { table: { head: ["الفعل", "حرف الجر", "مثال"], rows: [
          ["accuse sb", "of", "He accused her of cheating."],
          ["congratulate sb", "on", "We congratulated him on passing."],
          ["praise sb", "for", "The teacher praised us for working hard."],
          ["blame sb", "for", "She blamed him for losing the keys."]
        ] } },
        { ex: [
          ["Omar ==accused Saad of copying== his homework.", "اتّهم عمر سعداً بنسخ واجبه. (الكلام المباشر: “You copied my homework!”)"],
          ["The headmaster ==congratulated the team on winning== the cup.", "هنّأ المدير الفريق على الفوز بالكأس. (الكلام المباشر: “Well done on winning the cup!”)"],
          ["The manager ==praised Dina for working== so hard.", "أثنى المدير على دينا لأنها عملت بجدّ كبير. (الكلام المباشر: “You worked so hard, Dina.”)"],
          ["Hana ==blamed Fadi for losing== the keys.", "لامت هناء فادياً على ضياع المفاتيح. (الكلام المباشر: “You lost the keys, Fadi!”)"]
        ] },
        { tip: "أفعال مشابهة بالنمط نفسه: thank sb for، criticise sb for، forgive sb for، suspect sb of، prevent sb from، discourage sb from." },
        { h: "6) فعل + that-clause: explain, mention, complain, announce" },
        { p: "يأتي بعد هذه الأفعال جملة كاملة، لذلك **نطبّق backshift** كما في الدرس السابق، وكلمة that اختيارية. وتأخذ that-clause أيضاً أفعال أخرى مثل say, add, reply, admit, deny, claim, promise, suggest, warn." },
        { ex: [
          ["The guide ==explained that== the road was closed.", "شرح المرشد أن الطريق مغلق. (الكلام المباشر: “The road is closed.”)"],
          ["A neighbour ==mentioned that== the water had been cut off for two hours the day before.", "ذكر أحد الجيران أن المياه قُطعت ساعتين في اليوم السابق. (الكلام المباشر: “The water was cut off for two hours yesterday.”)"],
          ["Laila ==complained that== she hadn't received her parcel.", "اشتكت ليلى من أنها لم تستلم طردها. (الكلام المباشر: “I haven't received my parcel.”)"],
          ["The mayor ==announced that== they would open a new shelter the following month.", "أعلن رئيس البلدية أنهم سيفتتحون مأوى جديداً في الشهر التالي. (الكلام المباشر: “We will open a new shelter next month.”)"]
        ] },
        { warn: "✗ She explained me that the road was closed. ← ✓ She explained ==to me== that the road was closed. الأفعال explain / mention / complain / announce / suggest لا تأخذ شخصاً مباشرة (نضع to قبله)، أما tell / inform / remind / warn فتأخذه مباشرة: told me، informed me." },
        { h: "7) النفي مع أفعال النقل" },
        { table: { head: ["النمط", "كيف ننفي؟", "مثال"], rows: [
          ["V + to + V", "not قبل to", "He promised not to tell anyone."],
          ["V + -ing", "not قبل -ing", "She regretted not saving money."],
          ["V + شخص + to + V", "not قبل to", "The guard warned us not to enter."],
          ["V + that-clause", "النفي داخل الجملة", "He explained that he couldn't come."]
        ] } },
        { warn: "✗ Tala denied not breaking it. ← ✓ Tala ==denied breaking== it. الفعلان deny وrefuse سلبيان في المعنى (ينكر / يرفض) فلا نضيف معهما not عند نقل جملة منفية: He refused to pay (ولا نقول refused not to pay لأن معناها مختلف)." },
        { warn: "✗ She suggested to buy a gift. ← ✓ She suggested ==buying== a gift. (أو: suggested that we buy a gift)" },
        { warn: "✗ He accused me for lying. ← ✓ He accused me ==of== lying. وكذلك: congratulated me ==on== (وليس for)." },
        { warn: "✗ She apologised me for the delay. ← ✓ She apologised ==to me== for the delay. الفعل apologise لا يأخذ مفعولاً مباشراً." },
        { tip: "اربط الفعل بالقصد: اعتراف ← admit، إنكار ← deny، عرض مساعدة ← offer، وعد ← promise، نصيحة ← advise، تحذير ← warn، اتهام ← accuse، مديح ← praise، لوم ← blame، اعتذار ← apologise، إصرار ← insist." }
      ],
      summary: [
        "V + -ing مباشرة: admit, deny, regret, suggest, recommend (✗ suggest to do ← ✓ suggest doing).",
        "V + to + V: agree, offer, refuse, promise, threaten, claim (النفي: not to).",
        "V + شخص + to + V: advise, encourage, persuade, warn, remind, invite.",
        "V + حرف جر + -ing: apologise for, insist on. وV + شخص + حرف جر + -ing: accuse of, congratulate on, praise for, blame for.",
        "V + that-clause: explain, mention, complain, announce ← مع backshift (✗ explained me ← ✓ explained to me).",
        "النفي: not to + V أو not + -ing، ولا نضيف not مع deny وrefuse عند نقل جملة منفية."
      ],
      qs: [
        { t: "mcq", q: "“I'll lend you my notes,” said Hadi. → Hadi ____ lend me his notes.", o: ["offered to", "suggested to", "admitted to", "advised to"], a: 0, x: "عرض المساعدة يُنقل بالفعل offer + to + V: offered to lend." },
        { t: "mcq", q: "“Why don't we visit the orphanage?” said Dana. → Dana suggested ____ the orphanage.", o: ["to visit", "visiting", "us to visit", "visit"], a: 1, x: "بعد suggest نستخدم -ing (suggested visiting) أو that-clause، ولا نستخدم to + V." },
        { t: "mcq", q: "“You should drink more water,” the doctor said to me. → The doctor advised ____ more water.", o: ["me drinking", "to drink", "me to drink", "that drinking"], a: 2, x: "النمط advise + شخص + to + V: advised me to drink." },
        { t: "mcq", q: "“You stole my bike!” said Rami to Zaid. → Rami accused Zaid ____ his bike.", o: ["for stealing", "to steal", "with stealing", "of stealing"], a: 3, x: "الفعل accuse يأتي بعده الشخص ثم of + -ing: accused Zaid of stealing." },
        { t: "mcq", q: "“Don't touch the wires!” the electrician said to us. → The electrician warned us ____ the wires.", o: ["not touch", "not to touch", "do not touch", "not touching"], a: 1, x: "النمط warn + شخص + not to + V: warned us not to touch." },
        { t: "mcq", q: "“Sorry I forgot to call you,” said Lara. → Lara apologised ____ to call me.", o: ["to forget", "of forgetting", "for forgetting", "at forgetting"], a: 2, x: "apologise يأخذ حرف الجر for ثم -ing: apologised for forgetting." },
        { t: "mcq", q: "“The match has been postponed,” said the referee. → The referee ____ that the match had been postponed.", o: ["announced", "agreed to", "insisted on", "apologised for"], a: 0, x: "announce + that-clause، ونطبّق backshift: has been postponed ← had been postponed." },
        { t: "gap", q: "“I didn't take the money,” said Maha. → Maha denied ____ (take) the money.", a: ["taking", "having taken"], x: "بعد deny نستخدم -ing: denied taking." },
        { t: "gap", q: "“I won't tell anyone the secret,” said Nabil. → Nabil promised ____ tell anyone the secret.", a: ["not to", "never to", "that he would not", "he would not"], x: "النفي مع promise يكون بـ not قبل to: promised not to tell. (ويصح أيضاً استخدام that-clause: promised that he wouldn't tell)." },
        { t: "gap", q: "“Remember to lock the door,” said Mum to me. → Mum reminded me ____ (lock) the door.", a: ["to lock"], x: "النمط remind + شخص + to + V: reminded me to lock." },
        { t: "gap", q: "“Well done on passing your test!” said Ruba to Samer. → Ruba congratulated Samer ____ passing his test.", a: ["on"], x: "congratulate sb on + -ing." },
        { t: "tr", q: "“I'll help you with the project,” Rula said to us.", p: "Rewrite starting with: Rula offered …", a: ["Rula offered to help us with the project."], x: "offer + to + V، وyou ← us." },
        { t: "tr", q: "“You lied to me,” Mr Haddad said to Samer.", p: "Rewrite starting with: Mr Haddad accused …", a: ["Mr Haddad accused Samer of lying to him.", "Mr Haddad accused Samer of having lied to him."], x: "النمط accuse sb of + -ing، وme ← him." },
        { t: "tr", q: "“You raised so much money for the shelter. Well done, Dina!” said the principal.", p: "Rewrite starting with: The principal praised …", a: ["The principal praised Dina for raising so much money for the shelter.", "The principal praised Dina for having raised so much money for the shelter.", "The principal praised her for raising so much money for the shelter."], x: "النمط praise sb for + -ing." },
        { t: "err", q: "The coach blamed the goalkeeper on losing the match.", w: "on", c: "for", x: "الفعل blame يأخذ بعد الشخص الحرف for: blamed the goalkeeper for losing. (أما accuse فتأخذ of)." },
        { t: "err", q: "My dad refused paying for the damage.", w: "paying", c: "to pay (refused to pay)", x: "بعد refuse نستخدم to + V وليس -ing: refused to pay." },
        { t: "order", a: "My teacher encouraged us to take part in the charity run.", x: "النمط encourage + شخص + to + V: encouraged us to take part." }
      ]
    }
  ],
  reading: {
    title: "Little Things, Big Hearts",
    text: [
      "A: When fifteen-year-old Huda Qasem heard that families in a small village near Karak were falling ill, she refused to just feel sorry for them. Old, broken pipes had allowed waste to contaminate the village's only water supply, and the nearest clinic was ill-equipped to treat so many patients.",
      "Huda persuaded her school's environment club to fundraise. They held a market day, selling handmade soap, fresh bread and even homework help, and the proceeds went to a foundation that installed water filters in forty homes. “Nobody asked us to,” Huda says with a shrug. “We just couldn't stop thinking about those children drinking dirty water.”",
      "B: Every month for almost a year, a plain white envelope appeared at the front desk of a tiny clinic in Irbid. Inside was always some cash and a note: “For medicine for people who cannot pay.” There was never a name. The nurses joked that their anonymous donor must be a millionaire.",
      "The truth, when they finally discovered it, astonished them. The donor was Abu Salim, a retired bus driver who survived on a small pension and had once been treated at the clinic himself. “I can't give much,” he said, embarrassed, “so I give a little, regularly.” Personally, I find his quiet generosity more impressive than any grand gift.",
      "C: Khaled Abu Awad has been an industrious carpenter in Salt for thirty years. Last summer, a hotel offered him a generous commission to make twenty dining tables. At the same time, a village school asked whether he could repair its broken desks. He did the school job first, and charged nothing.",
      "His young intern, Sami, a vocational-school student on a summer placement, was amazed. “He handled those old desks as if they were made of gold,” Sami says. “Now I understand why people say he is integral to this neighbourhood.” Khaled, typically, shrugs off the praise. None of these three is rich or famous, yet each has made a difference. What could you do this week?"
    ],
    skill: "Identifying the writer's purpose and attitude",
    skillAr: "تحديد غرض الكاتب واتجاهه",
    skillTip: "الغرض (purpose) هو سبب كتابة النص (أن يُخبر أو يُقنع أو يُلهم أو يُسلّي)، والاتجاه (attitude) هو شعور الكاتب تجاه موضوعه. انتبه إلى كلمات الرأي والمشاعر (Personally, I find… / astonished / impressive) وإلى ما يختار الكاتب ذكره وإلى طريقة ختام النص كالسؤال الموجّه للقارئ. ثم اسأل نفسك: ماذا يريدني الكاتب أن أشعر به أو أفعله بعد القراءة؟",
    gloss: [
      ["contaminate", "يلوّث"], ["ill-equipped", "غير مجهَّز بما يكفي"],
      ["persuaded", "أقنعت"], ["fundraise", "تجمع التبرعات"], ["proceeds", "العائدات (الأموال المحصَّلة)"], ["foundation", "مؤسسة خيرية"], ["shrug", "هزّة كتفين (لعدم الاكتراث أو التواضع)"],
      ["anonymous", "مجهول الاسم"], ["donor", "متبرّع"], ["astonished", "أذهلهم / فاجأهم جداً"], ["pension", "راتب تقاعدي"],
      ["industrious", "مجتهد في عمله"], ["commission", "طلبية / تكليف مدفوع بعمل"], ["intern", "متدرّب"], ["placement", "فترة تدريب عملي"], ["integral", "أساسي لا غنى عنه (جزء لا يتجزأ)"]
    ],
    gist: [
      "القصة A: ترفض هدى الاكتفاء بالشفقة على قرية تلوّثت مياهها بسبب أنابيب قديمة.",
      "تقنع هدى نادي البيئة بجمع التبرعات في يوم سوق، فتُركَّب فلاتر مياه في أربعين بيتاً.",
      "القصة B: مظروف أبيض يصل كل شهر إلى عيادة صغيرة من متبرّع مجهول يظنّه الممرضون ثرياً.",
      "المتبرّع سائق حافلة متقاعد محدود الدخل، والكاتب معجب بكرمه الهادئ.",
      "القصة C: النجّار خالد يصلح مقاعد مدرسة قروية مجاناً قبل تنفيذ طلبية فندق مربحة.",
      "المتدرّب سامي معجب بخالد، ويختم الكاتب بسؤال يدفع القارئ إلى أن يفعل شيئاً."
    ],
    tr: [
      "A: عندما سمعت هدى قاسم، ذات الخمسة عشر عاماً، أن عائلات في قرية صغيرة قرب الكرك بدأت تمرض، رفضت أن تكتفي بالشعور بالأسى عليهم. فقد سمحت أنابيب قديمة ومكسورة للفضلات بأن تلوّث مصدر المياه الوحيد في القرية، وكانت أقرب عيادة غير مجهّزة بما يكفي لعلاج هذا العدد الكبير من المرضى.",
      "أقنعت هدى نادي البيئة في مدرستها بجمع التبرعات. فأقاموا يوماً للسوق باعوا فيه صابوناً مصنوعاً يدوياً وخبزاً طازجاً وحتى المساعدة في الواجبات المدرسية، وذهبت العائدات إلى مؤسسة قامت بتركيب فلاتر مياه في أربعين بيتاً. تقول هدى وهي تهزّ كتفيها: «لم يطلب منا أحد ذلك. لكننا ببساطة لم نستطع التوقف عن التفكير في أولئك الأطفال الذين يشربون ماءً قذراً.»",
      "B: كل شهر ولمدة عام تقريباً، كان مظروف أبيض بسيط يظهر على مكتب الاستقبال في عيادة صغيرة في إربد. وكان في داخله دائماً بعض المال ورسالة قصيرة: «لشراء الدواء لمن لا يستطيعون الدفع». ولم يكن عليه أي اسم. وكان الممرضون يمزحون بأن متبرّعهم المجهول لا بد أن يكون مليونيراً.",
      "أما الحقيقة، حين اكتشفوها أخيراً، فقد أذهلتهم. كان المتبرّع هو أبو سالم، وهو سائق حافلة متقاعد يعيش على راتب تقاعدي صغير، وقد عولج هو نفسه في تلك العيادة ذات يوم. قال لهم وهو محرج: «لا أستطيع أن أعطي كثيراً، لذلك أعطي القليل بانتظام». أما أنا شخصياً، فأجد كرمه الهادئ أكثر إثارة للإعجاب من أي هدية ضخمة.",
      "C: يعمل خالد أبو عوّاد نجّاراً مجتهداً في السلط منذ ثلاثين عاماً. وفي الصيف الماضي عرض عليه فندق طلبية مجزية لصنع عشرين طاولة طعام. وفي الوقت نفسه سألته مدرسة قروية إن كان بإمكانه إصلاح مقاعدها الدراسية المكسورة. فأنجز عمل المدرسة أولاً، ولم يتقاضَ شيئاً.",
      "أما متدرّبه الشاب سامي، وهو طالب في مدرسة مهنية يقضي تدريباً عملياً في الصيف، فقد أصابته الدهشة. يقول سامي: «كان يتعامل مع تلك المقاعد القديمة كأنها مصنوعة من الذهب. والآن أفهم لماذا يقول الناس إنه جزء لا غنى عنه في هذا الحي». أما خالد، كعادته، فيتجاهل المديح بهزّة كتف. ليس أحد من هؤلاء الثلاثة ثرياً أو مشهوراً، ومع ذلك أحدث كل واحد منهم فرقاً. فماذا يمكنك أنت أن تفعل هذا الأسبوع؟"
    ],
    qs: [
      { t: "mcq", q: "What is the writer's main purpose in this article?", o: ["To warn readers about dirty drinking water.", "To inspire readers by showing how ordinary people help others.", "To ask readers to give money to one particular foundation.", "To describe how a clinic and a school are run."], a: 1, x: "القصص الثلاث عن أشخاص عاديين يساعدون غيرهم، وينتهي النص بسؤال موجّه للقارئ، فالغرض هو الإلهام والتشجيع." },
      { t: "mcq", q: "What had made the villagers in story A ill?", o: ["They had eaten food sold at the school market.", "The nearest clinic had given them the wrong medicine.", "Waste had got into their only water supply through old pipes.", "A foundation had installed the wrong water filters."], a: 2, x: "الفقرة 1: Old, broken pipes had allowed waste to contaminate the village's only water supply." },
      { t: "mcq", q: "In paragraph 4, what does 'it' in 'when they finally discovered it' refer to?", o: ["the envelope", "the truth", "the clinic", "the pension"], a: 1, x: "الجملة: The truth, when they finally discovered it, astonished them ← الضمير it يعود على the truth." },
      { t: "mcq", q: "Why does the writer mention that Abu Salim 'had once been treated at the clinic himself'?", o: ["To show that the clinic was very expensive.", "To show that he used to work there as a nurse.", "To prove that he was richer than the nurses thought.", "To suggest that he wanted to give something back."], a: 3, x: "استنتاج: الرجل عولج في العيادة سابقاً، ولهذا يلمّح الكاتب إلى أنه يريد أن يردّ الجميل." },
      { t: "mcq", q: "What is the writer's attitude to Abu Salim's gift?", o: ["Impressed by its quiet generosity", "Disappointed that it was so small", "Doubtful that he really gave it", "Annoyed that he hid his name"], a: 0, x: "عبارة Personally, I find his quiet generosity more impressive than any grand gift تكشف إعجاب الكاتب." },
      { t: "mcq", q: "Why does the writer end with the question 'What could you do this week?'", o: ["To test whether readers remember the stories", "To show that the writer cannot decide what to do", "To encourage readers to take action themselves", "To suggest that Khaled needs more help"], a: 2, x: "السؤال الأخير موجّه إلى القارئ مباشرة ليدفعه إلى العمل، وهذا يؤكد أن غرض الكاتب هو الإلهام." },
      { t: "tf", q: "Huda's club gave the money they raised directly to the villagers.", a: false, x: "الفقرة 2: the proceeds went to a foundation that installed water filters، أي أن المؤسسة هي التي ركّبت الفلاتر." },
      { t: "tf", q: "Khaled charged the school nothing for repairing its desks.", a: true, x: "الفقرة 5: He did the school job first, and charged nothing." },
      { t: "find", q: "Find a word in paragraph 4 that means 'very surprised'.", a: ["astonished"], x: "astonished = مندهش جداً، وهي من الكلمات التي تكشف مشاعر الشخصيات." },
      { t: "open", q: "Find TWO expressions in the article that show the writer admires the people in the stories.", m: "For example: 'she refused to just feel sorry for them' (Huda) and 'I find his quiet generosity more impressive than any grand gift' (Abu Salim). Both show that the writer respects people who act instead of only talking." },
      { t: "open", q: "Which of the three people do you admire most? Give one reason.", m: "I admire Abu Salim most because he gave regularly even though he had very little money, and he did not want any thanks or credit." }
    ]
  },
  writing: {
    type: "Article",
    ar: "مقالة صحفية",
    about: "المقالة الصحفية (Article) تُكتب لمجلة المدرسة أو لموقع إلكتروني، وهدفها أن تشدّ القارئ وتعرض عليه فكرة أو قضية بأسلوب حيّ. أسلوبها **شبه رسمي (semi-formal)**: نخاطب القارئ بـ you، ونستخدم أسئلة بلاغية واختصارات قليلة مثل it's وdoesn't، لكن دون عامية أو كلمات الشارع. تبدأ بعنوان جذاب ومقدمة مشوّقة، وتُقسَّم إلى فقرات قصيرة، وتنتهي بخاتمة تترك أثراً. الطول المعتاد 150–200 كلمة.",
    plan: [
      { part: "Title", ar: "العنوان", tip: "اجعله قصيراً ويثير الفضول: سؤال بلاغي (Is it fair…?)، أو مبالغة (The Biggest Waste Ever!)، أو جناس لفظي alliteration (Big Hearts, Bright Futures). لا تجعله جملة طويلة." },
      { part: "Introduction", ar: "المقدمة", tip: "ابدأ بجملة تشدّ الانتباه: خطاب مباشر للقارئ (Imagine… / Have you ever…?) أو عبارة صادمة. ثم عرّف بالموضوع في جملة أو جملتين." },
      { part: "Body paragraph 1", ar: "الفقرة الأولى", tip: "اعرض المشكلة أو الموقف غير العادل بمثال واقعي وبلغة بسيطة حيّة، دون أرقام لا تتأكد من صحتها." },
      { part: "Body paragraph 2", ar: "الفقرة الثانية", tip: "اعرض الحلول: ماذا يستطيع القارئ أن يفعل؟ استخدم دعوة للعمل (Why not…?) وأمثلة عملية سهلة التنفيذ." },
      { part: "Conclusion", ar: "الخاتمة", tip: "اربطها بالعنوان بتكرار كلماته أو بالإجابة عن سؤاله، أو اختم بسؤال يدفع القارئ إلى التفكير أو بدعوة أخيرة للعمل." }
    ],
    phrases: [
      { en: "Imagine turning on the tap and finding…", ar: "تخيّل أنك تفتح الصنبور فتجد…", use: "مقدمة بخطاب مباشر للقارئ" },
      { en: "Have you ever wondered why…?", ar: "هل تساءلت يوماً لماذا…؟", use: "مقدمة بسؤال" },
      { en: "Believe it or not, …", ar: "صدّق أو لا تصدّق، …", use: "عبارة افتتاحية صادمة" },
      { en: "It may sound surprising, but…", ar: "قد يبدو الأمر مفاجئاً، لكن…", use: "عبارة افتتاحية صادمة" },
      { en: "Let's face it: …", ar: "لنعترف بالأمر: …", use: "أسلوب حواري مع القارئ" },
      { en: "Take … for example.", ar: "خذ … مثالاً.", use: "تقديم مثال" },
      { en: "What's more, …", ar: "والأكثر من ذلك…", use: "إضافة فكرة" },
      { en: "That's why …", ar: "ولهذا السبب…", use: "ذكر النتيجة" },
      { en: "So what can we do about it?", ar: "فماذا يمكننا أن نفعل حيال ذلك؟", use: "الانتقال من المشكلة إلى الحل" },
      { en: "It doesn't take much to…", ar: "لا يتطلب الأمر الكثير لـ…", use: "تشجيع القارئ" },
      { en: "Why not start by …?", ar: "لمَ لا تبدأ بـ…؟", use: "دعوة للعمل" },
      { en: "Surely nobody can justify …?", ar: "بالتأكيد لا أحد يستطيع تبرير…؟", use: "سؤال بلاغي" },
      { en: "The next time you …, remember …", ar: "في المرة القادمة التي …، تذكّر…", use: "ختام مؤثر" },
      { en: "So, is it fair? …", ar: "إذن، هل هذا عادل؟ …", use: "خاتمة تعود إلى العنوان" },
      { en: "After all, …", ar: "فبعد كل شيء…", use: "تعليل في الخاتمة" },
      { en: "Isn't it time we …?", ar: "أليس قد آن الأوان أن …؟", use: "خاتمة بسؤال" }
    ],
    task: "Your school magazine is running a series called ‘Is it fair?’ Write an article (160–200 words) about an unfair situation in the world or in your community, and suggest what young people can do about it. Give your article an attention-grabbing title.",
    taskAr: "تُصدر مجلة مدرستك سلسلة بعنوان «هل هذا عادل؟». اكتب مقالة (160–200 كلمة) عن موقف غير عادل في العالم أو في مجتمعك، واقترح ما يستطيع الشباب فعله حياله. أعطِ مقالتك عنواناً جذاباً، وابدأها بمقدمة تخاطب القارئ، واختمها بخاتمة تعود إلى العنوان أو تطرح سؤالاً.",
    words: [160, 200],
    model: [
      "Title: Is It Fair That Clean Water Is a Luxury?",
      "Imagine turning on the tap and getting nothing but a few brown drops. For millions of families around the world, that isn't a bad dream – it's an ordinary morning.",
      "The problem is not always a shortage of water. In many places, broken pipes waste it before it reaches the taps, and waste from factories or farms can contaminate what is left. Children miss lessons because they spend hours carrying water, or because the water they drink makes them ill. Surely nobody can justify that?",
      "So what can we do about it? More than you might think. Students can fundraise for a charity that installs water filters, run a water-saving campaign, or simply spread the word online. It doesn't take much to start: even one bake sale can help pay for a filter that protects a family against dirty water.",
      "Is it fair that some of us waste water while others walk miles to find it? Of course not. The next time you fill a glass, remember how lucky you are – and ask yourself what you could do to help everyone get a fair share."
    ],
    check: [
      "هل العنوان قصير وجذاب (سؤال بلاغي أو مبالغة أو جناس لفظي)؟",
      "هل تبدأ المقدمة بجملة تشدّ القارئ (خطاب مباشر أو عبارة صادمة أو سؤال)؟",
      "هل كل فقرة تدور حول فكرة واحدة وتبدأ بجملة واضحة؟",
      "هل الأسلوب شبه رسمي: مخاطبة القارئ بـ you وأسئلة بلاغية واختصارات قليلة دون عامية؟",
      "هل عرضت المشكلة ثم اقترحت حلولاً عملية يستطيع الشباب تنفيذها؟",
      "هل تعود الخاتمة إلى العنوان أو تطرح سؤالاً يدفع القارئ إلى التفكير؟",
      "هل التزمت بعدد الكلمات المطلوب وبمعلومات تثق بصحتها؟",
      "هل راجعت الأزمنة والتهجئة وعلامات الترقيم (علامة الاستفهام والفاصلة)؟"
    ]
  },
  speaking: {
    title: "Expressing opinions",
    ar: "التعبير عن الآراء بدرجات مختلفة والاعتراض بلباقة",
    phrases: [
      { en: "It goes without saying that…", ar: "لا يخفى على أحد أن…", use: "رأي قوي" },
      { en: "There's no doubt in my mind that…", ar: "لا يساورني شك في أن…", use: "رأي قوي" },
      { en: "I'm absolutely convinced that…", ar: "أنا مقتنع تماماً بأن…", use: "رأي قوي" },
      { en: "As far as I'm concerned, …", ar: "بالنسبة إليّ…", use: "رأي أقل قوة" },
      { en: "In my opinion, … / If you ask me, …", ar: "في رأيي… / إن سألتني…", use: "رأي أقل قوة" },
      { en: "The way I see it, …", ar: "كما أرى الأمر…", use: "رأي أقل قوة" },
      { en: "I see your point, but…", ar: "أفهم وجهة نظرك، لكن…", use: "التسليم بكلام الآخر ثم الاعتراض" },
      { en: "That's true, but on the other hand…", ar: "هذا صحيح، لكن من ناحية أخرى…", use: "التسليم بكلام الآخر ثم الاعتراض" },
      { en: "You've got a point there. Even so, …", ar: "معك حق في هذه النقطة، ومع ذلك…", use: "التسليم بكلام الآخر ثم الاعتراض" },
      { en: "I'm no expert, but…", ar: "لست خبيراً، لكن…", use: "رأي متحفظ (hedging)" },
      { en: "I'm inclined to think that…", ar: "أميل إلى الاعتقاد بأن…", use: "رأي متحفظ" },
      { en: "It seems to me that… / I may be wrong, but…", ar: "يبدو لي أن… / قد أكون مخطئاً، لكن…", use: "رأي متحفظ" },
      { en: "You're entitled to your opinion, but…", ar: "من حقك أن يكون لك رأيك، لكن…", use: "الاعتراض بلباقة" },
      { en: "I'm not sure I agree with you there.", ar: "لست متأكداً من أنني أوافقك في هذه النقطة.", use: "الاعتراض بلباقة" },
      { en: "Have you considered…?", ar: "هل فكّرتَ في…؟", use: "الاعتراض بلباقة باقتراح زاوية أخرى" },
      { en: "Fair enough. / Let's agree to differ.", ar: "كلام معقول. / لنتفق على أن نختلف.", use: "إنهاء النقاش بلباقة" }
    ],
    dialogue: [
      ["Lina", "As far as I'm concerned, every student should do some community service before graduating."],
      ["Omar", "I see your point, but is it fair to force people? Volunteering is supposed to be a choice."],
      ["Lina", "It goes without saying that choice matters. But many students would never start if nobody gave them a push."],
      ["Omar", "I'm no expert, but I'm inclined to think that students who are forced won't really care."],
      ["Lina", "You're entitled to your opinion, but I've seen it work. My cousin hated the idea, and now he runs a free tutoring group."],
      ["Omar", "Fair enough, that's a good example. What about students who work part-time or look after younger brothers and sisters?"],
      ["Lina", "Good question. Perhaps the hours could be flexible for them, or they could choose a project close to home."],
      ["Omar", "Now that sounds fair to me. I'd support a flexible scheme."],
      ["Lina", "So we agree, more or less!"],
      ["Omar", "More or less. Let's suggest it to Ms Hiba on Sunday."]
    ]
  },
  test: [
    { t: "mcq", q: "Employers must not treat people unfairly because of their age or gender. This is called ____.", o: ["immigration", "discrimination", "unemployment", "expansion"], a: 1, k: "vocab", x: "discrimination = التمييز: أن نعامل شخصاً أو فئة معاملة أسوأ من غيرهم لسبب غير عادل." },
    { t: "mcq", q: "The ____ donor paid for the new playground but asked us not to mention his name.", o: ["industrious", "integral", "anonymous", "ill-equipped"], a: 2, k: "vocab", x: "anonymous = مجهول الاسم، أي متبرّع لا يريد أن يُعرف اسمه." },
    { t: "mcq", q: "Dirty waste from a factory began to ____ the village's fresh water supplies.", o: ["contaminate", "install", "donate", "enforce"], a: 0, k: "vocab", x: "contaminate = يلوّث: يجعل الماء قذراً وغير صالح للشرب." },
    { t: "mcq", q: "All the ____ from the school concert will be given to the children's hospital.", o: ["institutions", "interns", "foundations", "proceeds"], a: 3, k: "vocab", x: "proceeds = العائدات، أي المال المحصَّل من حفل أو من بيع شيء." },
    { t: "mcq", q: "A group of parents decided to ____ a small charity to help families in need.", o: ["test", "set up", "set out", "prove"], a: 1, k: "vocab", x: "set up a charity = يؤسّس جمعية. أما set out فتعني ينطلق في رحلة أو يعرض أفكاره بوضوح." },
    { t: "mcq", q: "All students are invited to participate ____ the charity run on Friday.", o: ["on", "at", "in", "for"], a: 2, k: "vocab", x: "participate in = يشارك في (حرف الجر المصاحب للفعل هو in)." },
    { t: "mcq", q: "My sister ____ to me that she was feeling tired.", o: ["said", "told", "spoke", "asked"], a: 0, k: "g11u7-gr1", x: "الفعل say يأخذ to قبل الشخص (said to me)، أما tell فيأخذ الشخص مباشرة (told me)." },
    { t: "gap", q: "“Why are you crying?” the nurse asked the boy. → The nurse asked the boy why he ____ crying.", a: ["was"], k: "g11u7-gr1", x: "السؤال المنقول يتبع ترتيب الجملة الخبرية، ويرجع Present continuous خطوة: are crying ← was crying." },
    { t: "mcq", q: "“Please don't be late,” Mum said to me. → Mum asked me ____ late.", o: ["don't be", "not be", "not to be", "to don't be"], a: 2, k: "g11u7-gr1", x: "الطلب المنفي ينقل بالنمط asked + شخص + not to + V." },
    { t: "mcq", q: "“I will announce the winner tomorrow,” said the host. → The host said he ____ announce the winner the next day.", o: ["will", "can", "shall", "would"], a: 3, k: "g11u7-gr1", x: "تتحول will إلى would عند النقل، والعبارة the next day تدل على أن الكلام منقول." },
    { t: "err", q: "He asked me where did I park the car.", w: "did", c: "delete did (He asked me where I parked the car)", k: "g11u7-gr1", x: "بعد wh-word نستخدم ترتيب الجملة الخبرية بلا did، ثم يرجع الفعل خطوة إلى الخلف: park ← parked." },
    { t: "mcq", q: "“I won't lie again,” said Tala. → Tala promised ____ again.", o: ["not lying", "not to lie", "don't lie", "to not lying"], a: 1, k: "g11u7-gr2", x: "الفعل promise يأتي بعده to + V، والنفي بوضع not قبل to: promised not to lie." },
    { t: "gap", q: "They congratulated Amer ____ winning the science award.", a: ["on"], k: "g11u7-gr2", x: "congratulate sb on + -ing." },
    { t: "mcq", q: "“It was you who left the gate open,” said the farmer. → The farmer blamed me ____ the gate open.", o: ["for leaving", "of leaving", "to leave", "on leaving"], a: 0, k: "g11u7-gr2", x: "النمط blame sb for + -ing: blamed me for leaving." },
    { t: "mcq", q: "The coach ____ the players to train harder after the defeat.", o: ["suggested", "admitted", "denied", "encouraged"], a: 3, k: "g11u7-gr2", x: "الفعل encourage وحده يأتي بعده شخص + to + V. أما suggest وadmit وdeny فيأتي بعدها -ing أو that-clause." },
    { t: "tr", q: "“I'll clean the classroom,” said Hadeel.", p: "Rewrite starting with: Hadeel offered …", a: ["Hadeel offered to clean the classroom."], k: "g11u7-gr2", x: "عرض المساعدة ينقل بالنمط offer + to + V." },
    { t: "mcq", q: "Which phrase sounds the most tentative (not too sure)?", o: ["It goes without saying that…", "I'm no expert, but I'm inclined to think…", "There's no doubt in my mind that…", "I'm absolutely convinced that…"], a: 1, k: "speaking", x: "العبارتان I'm no expert وI'm inclined to think للتحفّظ (hedging)، أما العبارات الأخرى فتعبّر عن رأي قوي." },
    { t: "mcq", q: "Your friend says: ‘Homework should be banned!’ You disagree politely. What do you say?", o: ["That's the silliest thing I've ever heard!", "Whatever. I'm not listening.", "You're entitled to your opinion, but I think homework helps us revise.", "You're wrong, and that's final."], a: 2, k: "speaking", x: "You're entitled to your opinion, but… عبارة مهذّبة للاعتراض دون إهانة." },
    { t: "mcq", q: "Read: ‘People say teenagers only care about their phones. Yet last Friday, forty of us gave up our morning to clean the beach, and nobody asked us to.’ What is the writer's main purpose?", o: ["To challenge a negative opinion about teenagers", "To advertise a mobile phone", "To complain about the beach", "To ask readers for money"], a: 0, k: "reading", x: "الكاتب يذكر رأي الناس ثم يردّ عليه بمثال يناقضه، فغرضه تحدّي الصورة السلبية عن المراهقين." },
    { t: "mcq", q: "Which opening sentence is the most attention-grabbing for an article about wasting food?", o: ["This article is about wasting food.", "Have you ever looked inside a bakery's bin at closing time?", "Food is something that people eat.", "I am going to write about food now."], a: 1, k: "writing", x: "المقدمة الجذابة تبدأ بسؤال أو خطاب مباشر للقارئ يثير فضوله، لا بإعلان مباشر عن الموضوع." }
  ]
});

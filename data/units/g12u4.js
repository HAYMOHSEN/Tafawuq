TAF.unit({
  id: "g12u4",
  grade: 12, sem: 1, n: 4,
  title: "Tastes",
  ar: "أذواق ونكهات",
  topics: "أنواع الطعام وقوامه ونكهته، الشهية والإغراء، آداب المائدة، لغة مراجعات المطاعم، تعبيرات الكمية (partitives) ومحدِّدات الكمية، والجمل الشرطية المتقدمة",
  goals: [
    "استخدام تعبيرات الكمية (a pinch of, a clove of, a handful of…) مع الأسماء المعدودة وغير المعدودة بصورة صحيحة",
    "اختيار محدِّد الكمية المناسب (a great many, a good deal of, a couple of, a single…) ومطابقة الفعل معه",
    "تكوين الجمل الشرطية المقلوبة (Should… / Were … to… / Had…) واستخدام بدائل if مثل unless وprovided that وbut for وotherwise",
    "فهم الشرط المختلط (mixed conditionals) وزمن كل جزء فيه، واستخدام if … will/would للتعبير عن المجاملة",
    "وصف الطعام وقوامه وجودته بصفات إيجابية وسلبية، واستخدام مفردات الشهية وآداب المائدة والتعبيرات الاصطلاحية",
    "إعادة صياغة (paraphrase) وجهات نظر مختلفة ومقارنتها، وكتابة مراجعة مطعم بأسلوب رسمي مقنع"
  ],
  vocab: [
    { w: "staple", ar: "غذاء أساسي (يُؤكل بانتظام وبكميات كبيرة)", pos: "noun", def: "a basic food that people eat regularly and in large amounts", ex: "In many Jordanian homes, bread and rice are staples at almost every family meal.", tag: "food types" },
    { w: "delicacy", ar: "طبق فاخر / أكلة نادرة وشهية", pos: "noun", def: "a rare or expensive food that is considered especially delicious", ex: "Truffles are an expensive delicacy that chefs shave thinly over pasta.", tag: "food types" },
    { w: "pulses", ar: "البقوليات (عدس، حمص، فاصولياء…)", pos: "noun", def: "dried seeds such as lentils, chickpeas and beans that are eaten as food", ex: "Pulses are cheap, filling and rich in protein, so they appear in many traditional dishes.", tag: "food types" },
    { w: "dairy produce", ar: "منتجات الألبان", pos: "compound noun", def: "food made from milk, such as cheese, butter and yoghurt", ex: "People who cannot digest lactose often have to avoid dairy produce.", tag: "food types" },
    { w: "tender", ar: "طريّ / سهل المضغ (لحم، خضار)", pos: "adjective", def: "soft and easy to cut or chew", ex: "The lamb had been cooked so slowly that it was meltingly tender.", tag: "texture & taste (positive)" },
    { w: "succulent", ar: "طريّ وغنيّ بالعصارة / شهيّ", pos: "adjective", def: "juicy, soft and full of flavour", ex: "We were served succulent chicken with lemon and garlic.", tag: "texture & taste (positive)" },
    { w: "velvety", ar: "ناعم كالمخمل (قوام ناعم وكريمي)", pos: "adjective", def: "smooth, soft and rich in texture", ex: "The lentil soup was thick, velvety and gently spiced.", tag: "texture & taste (positive)" },
    { w: "gooey", ar: "لزج وطريّ ومطّاطي (بطريقة لذيذة)", pos: "adjective", def: "soft, sticky and pleasantly moist", ex: "Gooey melted cheese stretched from the pastry as she pulled it apart.", tag: "texture & taste (positive)" },
    { w: "fluffy", ar: "هشّ وخفيف (كالأرز والكعك)", pos: "adjective", def: "light, soft and full of air", ex: "The rice was fluffy, with every grain separate from the next.", tag: "texture & taste (positive)" },
    { w: "chewy", ar: "مطّاطي يحتاج إلى مضغ (جيد في الحلوى والخبز، سيّئ في اللحم)", pos: "adjective", def: "firm and needing a lot of chewing; pleasant in cookies, not in meat", ex: "I like my cookies chewy in the middle, but chewy steak is a disappointment.", tag: "texture & taste (positive)" },
    { w: "gristly", ar: "فيه غضاريف وعروق صلبة (لحم)", pos: "adjective", def: "full of tough, rubbery pieces of gristle, usually in meat", ex: "The steak was so gristly that I left half of it on the plate.", tag: "texture & taste (negative)" },
    { w: "soggy", ar: "مبلَّل ورخو (فقد قرمشته)", pos: "adjective", def: "unpleasantly wet and soft, especially when it should be crisp", ex: "The falafel had gone soggy in the delivery box.", tag: "texture & taste (negative)" },
    { w: "stodgy", ar: "ثقيل ودسم على المعدة", pos: "adjective", def: "heavy, thick and filling in an unpleasant way", ex: "The pudding was so stodgy that I could barely finish a spoonful.", tag: "texture & taste (negative)" },
    { w: "greasy", ar: "دهنيّ / مليء بالزيت", pos: "adjective", def: "covered in, or containing, too much oil or fat", ex: "The fried chicken was so greasy that the paper bag turned see-through.", tag: "texture & taste (negative)" },
    { w: "mouldy", ar: "متعفّن (عليه عفن)", pos: "adjective", def: "covered with a soft grey-green growth because it is old (US: moldy)", ex: "I threw away the mouldy bread and bought a fresh loaf.", tag: "texture & taste (negative)" },
    { w: "scalding", ar: "شديد السخونة (يحرق)", pos: "adjective", def: "extremely hot; hot enough to burn you", ex: "Be careful – the soup is scalding, so let it cool for a minute.", tag: "texture & taste (negative)" },
    { w: "tempting", ar: "مُغرٍ / مُشتهى", pos: "adjective", def: "attractive and making you want to eat or have it", ex: "The tray of warm baklava looked far too tempting to resist.", tag: "texture & taste (positive)" },
    { w: "devour", ar: "يلتهم", pos: "verb", def: "to eat something quickly and eagerly because you are very hungry", ex: "After the long hike, the boys devoured a whole tray of rice and chicken.", tag: "appetite & hunger" },
    { w: "rustle up", ar: "يحضّر وجبة على عجل بما هو متوفر", pos: "phrasal verb", def: "to prepare a meal quickly using whatever you have", ex: "Don't worry about dinner – I can rustle up something from the fridge.", tag: "appetite & hunger" },
    { w: "comfort eating", ar: "الأكل للمواساة العاطفية", pos: "noun", def: "eating rich or sweet food in order to feel better emotionally", ex: "Many people turn to comfort eating when they feel stressed or lonely.", tag: "appetite & hunger" },
    { w: "stomach rumbles", ar: "قرقرة المعدة (من الجوع)", pos: "collocation", def: "the low noise your stomach makes when you are hungry", ex: "My stomach rumbles every morning at about eleven, long before break.", tag: "appetite & hunger" },
    { w: "succumb (to)", ar: "يرضخ لـ / يستسلم لـ (الإغراء)", pos: "verb", def: "to give in to a temptation that you were trying to resist", ex: "I promised to cut down on sweets, but I succumbed to a piece of kunafa.", tag: "appetite & hunger" },
    { w: "waft", ar: "تنساب (رائحة) في الهواء", pos: "verb", def: "(of a smell) to be carried gently through the air", ex: "The smell of fresh bread wafted out of the bakery and along the street.", tag: "appetite & hunger" },
    { w: "trawl (through)", ar: "يفتّش بدقة في (قوائم أو مواقع كثيرة)", pos: "verb", def: "to search through a lot of things carefully to find something", ex: "I trawled through dozens of online reviews before choosing a restaurant.", tag: "appetite & hunger" },
    { w: "sneak", ar: "يأخذ شيئاً خلسةً / يتسلل", pos: "verb", def: "to move or take something quietly so that nobody notices", ex: "He sneaked a piece of cake from the table while his mother was out of the room.", tag: "appetite & hunger" },
    { w: "bring (something) home to (someone)", ar: "يجعله يدرك تماماً / يُرسّخ في ذهنه", pos: "idiom", def: "to make someone fully realise how true or serious something is", ex: "That awkward dinner abroad brought home to me how much table customs differ.", tag: "table manners & idioms" },
    { w: "haul (someone) over the coals", ar: "يوبّخ بشدة / يحاسب بقسوة", pos: "idiom", def: "to criticise someone severely for something they have done wrong", ex: "Her father hauled her over the coals for talking with her mouth full.", tag: "table manners & idioms" },
    { w: "slurp", ar: "يرتشف / يأكل بصوت مسموع", pos: "verb", def: "to drink or eat noisily by sucking", ex: "In some countries it is polite to slurp noodles, but elsewhere it is rude.", tag: "table manners & idioms" },
    { w: "a sinking feeling", ar: "شعور بالانقباض (بأن أمراً سيّئاً قد حدث)", pos: "phrase", def: "a sudden unpleasant feeling that something has gone wrong", ex: "I had a sinking feeling when the waiter said they had run out of food.", tag: "table manners & idioms" },
    { w: "a thing of the past", ar: "أمر انتهى زمنه / أصبح من الماضي", pos: "idiom", def: "something that no longer exists or happens", ex: "Eating together without phones is fast becoming a thing of the past.", tag: "table manners & idioms" },
    { w: "mind your manners", ar: "تأدّب / انتبه لسلوكك", pos: "idiom", def: "behave politely, especially when eating or talking to other people", ex: "Mind your manners, Omar – we are guests in your uncle's house.", tag: "table manners & idioms" },
    { w: "a letdown", ar: "خيبة أمل / شيء مخيّب للآمال", pos: "noun", def: "something disappointing because it is not as good as you expected", ex: "After such glowing reviews, the main course was a real letdown.", tag: "restaurant reviews" },
    { w: "give (something) a wide berth", ar: "يتجنّب / يبتعد تماماً عن", pos: "idiom", def: "to keep well away from someone or something", ex: "After one dreadful sandwich, I gave that kiosk a wide berth.", tag: "restaurant reviews" },
    { w: "hype", ar: "ضجة دعائية / مبالغة في الترويج", pos: "noun", def: "exaggerated publicity that makes something seem better than it is", ex: "The new burger bar did not live up to the hype.", tag: "restaurant reviews" },
    { w: "value for money", ar: "قيمة تستحق ما يُدفع فيها", pos: "phrase", def: "worth the amount of money that you pay for it", ex: "The set lunch is excellent value for money: three courses at a modest price.", tag: "restaurant reviews" },
    { w: "yearn for", ar: "يتوق بشدة إلى", pos: "phrasal verb", def: "to want something very much, especially something you miss", ex: "Studying abroad, she yearned for her mother's cooking.", tag: "restaurant reviews" }
  ],
  grammar: [
    {
      id: "g12u4-gr1",
      title: "Partitives and quantifiers",
      ar: "تعبيرات الكمية (Partitives) ومحدِّدات الكمية (Quantifiers)",
      body: [
        { p: "كثير من الأسماء في الإنجليزية لا نستطيع عدّها مباشرة (bread, salt, rice, advice)، فكيف نتحدث عن **قطعة** منها أو عن **كمية محددة**؟ نستخدم تركيباً ثابتاً هو **partitive + of + noun**. بعد ذلك نتعلم محدِّدات الكمية (quantifiers) مثل a great many وa good deal of وa couple of، وكيف يتطابق الفعل معها. هذا الدرس يحبه واضعو الامتحان لأن أخطاءه شائعة جداً عند الطلبة العرب." },
        { h: "1) Partitives: اسم + of + اسم" },
        { p: "الاسم الأول (a pinch, a slice, a clove…) هو الاسم **المعدود** الذي يحمل العدد والجمع، أما الاسم بعد of فهو الطعام نفسه، وغالباً يكون غير معدود فيبقى مفرداً كما هو. لكل partitive أطعمة يرتبط بها عادةً (collocations)، فالأفضل أن نحفظها في مجموعات:" },
        { table: { head: ["المجموعة", "أمثلة (partitive + of)", "ملاحظات"], rows: [
          ["كميات صغيرة ونكهات", "a pinch of salt · a dash of lemon juice · a dusting of icing sugar · a sprinkle of cinnamon · a knob of butter · a drop of honey · a squeeze of lemon", "a pinch وa dash وa dusting وa sprinkle للمقادير الصغيرة التي تُضاف للنكهة أو الزينة؛ وa knob قطعة صغيرة من الزبدة (بريطانية)"],
          ["أجزاء من النباتات والأعشاب", "a clove of garlic · a sprig of mint (thyme, parsley) · a bunch of parsley · a head of lettuce · a stalk of celery · an ear of corn", "a clove قسم واحد من رأس الثوم، وa sprig غصن صغير من الأعشاب، وa bunch حزمة أو عنقود"],
          ["قطع وشرائح", "a slice of bread / cake / melon · a loaf of bread · a cube of sugar · a chunk of cheese · a wedge of lemon · a bar of chocolate", "a slice شريحة رقيقة، وa chunk قطعة سميكة، وa wedge قطعة على شكل مثلث؛ وجمع loaf هو loaves"],
          ["ما تحمله اليد أو الملعقة", "a handful of nuts · a scoop of ice cream · a spoonful of sugar · a mouthful of rice · a helping of pudding", "a scoop كمية تُغرف بمغرفة أو ملعقة خاصة (مثل كرة الآيس كريم)، وa helping حصة تُقدَّم في الطبق"],
          ["أوعية وعبوات", "a bowl of soup · a jar of honey · a carton of milk · a tin of tuna · a packet of biscuits · a tray of baklava · a bottle of water", "تدل على الوعاء وما فيه؛ ونقول أيضاً a glass of juice وa cup of tea"],
          ["أفكار وأشياء مجردة", "a piece of advice / information / news · an item of furniture · a pang of hunger · a hint of cardamom · a grain of truth · a morsel of food", "تجعل الأسماء غير المعدودة «معدودة»: a pang of hunger = وخزة جوع، وa hint of cardamom = لمحة هيل"]
        ] } },
        { ex: [
          ["Stir in ==a pinch of== salt and top the yoghurt with ==a sprig of== mint.", "أضف رشة ملح وزيّن اللبن بغصن نعناع."],
          ["The cake was finished with ==a dusting of== icing sugar.", "زُيّنت الكعكة بطبقة خفيفة من السكر البودرة."],
          ["She grabbed ==a handful of== almonds from the bowl.", "أمسكت حفنة من اللوز من الوعاء."],
          ["Each portion comes with ==a scoop of== ice cream.", "تأتي كل حصة مع كرة من البوظة (الآيس كريم)."],
          ["Let me give you ==a piece of advice==: never shop for food when you are hungry.", "دعني أعطيك نصيحة: لا تتسوق للطعام وأنت جائع."]
        ] },
        { h: "قواعد استخدام الـ partitives" },
        { p: "**أولاً — نجمع الـ partitive لا الطعام:** two slices of bread, three loaves of bread, four spoonfuls of sugar, two bunches of grapes. ولا نقول two breads بمعنى رغيفين أو شريحتين." },
        { p: "**ثانياً — of لا تُحذف:** a slice of cake وليس a slice cake. **ثالثاً — الفعل يطابق الـ partitive لا الطعام:** A loaf of bread ==is== on the table. / Two loaves of bread ==are== on the table." },
        { p: "**رابعاً — dozen وhundred وthousand:** بعد رقم محدد لا نضيف of ولا s: two dozen eggs, three hundred guests. أما للدلالة على عدد كبير غير محدد فنستعمل الجمع مع of: dozens of eggs, hundreds of guests." },
        { tip: "لكل طعام تركيبه المفضّل: نقول a bar of chocolate وa slice of cake وa clove of garlic وa sprig of mint، ولا نقول a clove of mint ولا a loaf of chocolate. تعلّم الـ partitives على شكل مجموعات كما في الجدول." },
        { h: "2) المعدود وغير المعدود" },
        { p: "الاسم **غير المعدود** (uncountable) ليس له جمع، ولا نضع قبله a/an ولا رقماً مباشرة، ويأخذ فعلاً مفرداً؛ ولهذا نحتاج إلى partitive حين نريد أن «نعدّه». والصعوبة عند الطلبة العرب أن كثيراً من الأسماء غير معدودة في الإنجليزية رغم أنها تُجمع في العربية:" },
        { table: { head: ["النوع", "أمثلة", "الصواب والخطأ"], rows: [
          ["غير معدودة في الإنجليزية", "advice, information, news, furniture, luggage, equipment, bread, homework, progress, research, evidence, traffic", "✗ an advice / two furnitures / many informations ← ✓ a piece of advice / two items of furniture / a lot of information"],
          ["جمع دائماً (لا مفرد لها)", "groceries, leftovers, clothes, goods, belongings, savings, scissors, trousers", "The groceries are in the car. · These trousers are too long."],
          ["لها معنيان: غير معدود ومعدود", "chicken, fish, lamb, cheese, coffee, tea, cake, chocolate, glass, paper, experience, room", "I had chicken for lunch (لحم) / A chicken crossed the road (طائر) · Two coffees, please (= two cups) · three cheeses (= three types)"]
        ] } },
        { warn: "✗ She gave me some good advices. ← ✓ She gave me ==some good advice== (أو a good ==piece of advice==). كلمات advice وinformation وnews وfurniture وluggage لا تُجمع أبداً. وكلمة news مفردة رغم أن آخرها s: The news ==is== good." },
        { h: "3) محدِّدات الكمية (Quantifiers)" },
        { p: "المحدِّد يبيّن «كم» نتحدث عنه، ويجب أن يناسب نوع الاسم بعده. هذا الجدول هو أهم ما في الدرس:" },
        { table: { head: ["المحدِّد", "مع معدود جمع", "مع غير معدود", "ملاحظات"], rows: [
          ["many · a great many · a good many · numerous · a large number of", "✓", "✗", "a great many وa good many أقوى وأكثر رسمية من many، ويأتي بعدها اسم جمع مباشرة وفعل جمع: A great many diners are vegetarian."],
          ["much · a great deal of · a good deal of · a large amount of · a fair amount of · a generous amount of", "✗", "✓", "much تُستعمل غالباً في النفي والسؤال؛ وفي المثبت نفضّل a lot of أو a great deal of: She spent a great deal of money."],
          ["a lot of · lots of · plenty of · loads of (عامية)", "✓", "✓", "تصلح مع النوعين وof فيها واجبة. plenty of تعني «أكثر من كافٍ»."],
          ["a few · several · a couple of · a handful of", "✓", "✗", "a couple of = اثنان أو ثلاثة (أسلوب محكي) ولا بدّ من of. وa handful of تعني مجازاً «عدداً قليلاً» مع الجمع المعدود: only a handful of restaurants (أما حرفياً بمعنى «ملء الكف» فتصلح مع غير المعدود أيضاً: a handful of rice)."],
          ["a little · a bit of · a small amount of", "✗", "✓", "a few وa little معناهما «بعض» ويكفي (إيجابي)."],
          ["few · little", "few ✓", "little ✓", "معناهما «قليل جداً / يكاد لا يوجد» (سلبي ورسمي): Few people complained."],
          ["fewer · less", "fewer ✓", "less ✓", "fewer calories, less sugar. قد تسمع less calories في الكلام اليومي لكن الامتحان يريد fewer."],
          ["a number of · the number of", "✓", "✗", "A number of dishes were cold. / The number of complaints is rising."],
          ["a single · every single · not a single", "اسم مفرد معدود", "✗", "للتأكيد على الواحد فقط: Not a single crumb was left."],
          ["a generous helping of · a generous portion of", "✓", "✓", "generous = كبير وسخي. وهاتان partitives فتصلحان مع المعدود الجمع وغير المعدود: a generous helping of cream / of olives. أما a generous amount of فمع غير المعدود فقط."]
        ] } },
        { ex: [
          ["==A great many== people queue outside the new bakery every Friday.", "عدد كبير جداً من الناس يصطفون أمام المخبز الجديد كل جمعة."],
          ["The chef spent ==a good deal of== time perfecting the sauce.", "أمضى الطاهي وقتاً طويلاً في إتقان الصلصة."],
          ["Could I have ==a generous helping of== rice, please?", "هل يمكنني الحصول على حصة كبيرة من الأرز من فضلك؟"],
          ["==A couple of== friends are joining us for dinner.", "اثنان أو ثلاثة من الأصدقاء سينضمون إلينا على العشاء."],
          ["There was ==not a single== crumb left on the tray.", "لم تبقَ فتاتة واحدة على الصينية."],
          ["==Fewer== people eat out on weekdays, and they spend ==less== money.", "يقل عدد من يأكلون خارج البيت في أيام الأسبوع، وينفقون مالاً أقل."]
        ] },
        { h: "few / a few وlittle / a little" },
        { ex: [
          ["There are ==a few== olives left – help yourself.", "بقيت بضع زيتونات – تفضّل. (إيجابي: يوجد ما يكفي)"],
          ["There are ==few== olives left, so we must order more.", "لم يبقَ إلا القليل جداً من الزيتون. (سلبي: لا يكفي)"],
          ["I have ==a little== time, so let's have a coffee.", "لدي قليل من الوقت فلنشرب قهوة. (يكفي)"],
          ["I have ==little== time, so I can't stay for coffee.", "وقتي ضيق جداً فلا أستطيع البقاء لشرب القهوة. (لا يكفي)"]
        ] },
        { h: "4) متى نستخدم of بعد المحدِّد؟" },
        { table: { head: ["الحالة", "القاعدة", "مثال"], rows: [
          ["محدِّد + اسم عام (دون the / this / my)", "بلا of", "Most guests · Many people · Some food · Several dishes"],
          ["محدِّد + the / this / these / my / ضمير", "نضيف of", "Most of the guests · many of them · some of my food"],
          ["a lot / lots / plenty / a great deal / a number / a couple / a handful", "of دائماً", "a lot of fruit · plenty of time · a couple of days"],
          ["all / both / half + اسم", "of اختيارية قبل the / my / this", "all (of) the food · both (of) the starters · half (of) the cake"],
          ["all / both / half + ضمير", "of واجبة", "all of us · both of them · half of it"],
          ["no / none", "no + اسم؛ none of + the / ضمير", "no sugar · none of the sugar · none of them"],
          ["each / every", "each of + جمع محدد؛ every + مفرد", "each of the dishes · every dish"]
        ] } },
        { warn: "✗ Most of people enjoy street food. ← ✓ ==Most people== enjoy street food (اسم عام بلا the فلا حاجة لـ of)، أو Most ==of the== people (بعد the نضيف of). وكذلك ✗ both us ← ✓ both ==of== us." },
        { h: "5) تطابق الفعل مع المحدِّدات" },
        { p: "القاعدة الذهبية: الفعل يطابق **الاسم الرئيس** في العبارة، وليس الاسم الأقرب إليه." },
        { table: { head: ["الحالة", "الفعل", "مثال"], rows: [
          ["each · every · one of · either · neither of", "مفرد", "Each of the dishes is fresh. · One of the waiters has left."],
          ["many · few · several · both · a couple of · a great many · a number of", "جمع", "A great many diners are vegetarian. · A number of dishes have sold out."],
          ["the number of + جمع", "مفرد", "The number of vegetarian diners is rising."],
          ["much · a great deal of · a good deal of · a little + غير معدود", "مفرد", "A good deal of food was wasted."],
          ["most · some · all · half · a lot of · plenty of · the rest of · الكسور + of", "يطابق الاسم بعد of", "Most of the soup is gone. · Most of the dishes are gone. · Half of the cake has been eaten. · Half of the guests have left."],
          ["partitive + of + noun", "يطابق الـ partitive", "A bunch of grapes is on the table. · Two loaves of bread are enough."],
          ["مبالغ ومقاييس ومدد تُعامل كوحدة واحدة", "مفرد", "Ten dinars is a lot for a sandwich. · Two hours is long enough."],
          ["neither … nor · either … or", "يطابق الاسم الأقرب", "Neither the chef nor the waiters were happy. · Neither the waiters nor the chef was happy."]
        ] } },
        { tip: "أسماء تنتهي بـ s لكنها مفردة: news, mathematics, physics, economics, politics ← The news ==is== good. وأسماء جمع دائماً وإن لم تنتهِ بـ s: police, people, cattle ← The police ==are== here. أما neither of + جمع فالأصل معه فعل مفرد (Neither of the dishes was hot) وقد يُسمع الجمع في الكلام اليومي، فاختر المفرد في الامتحان." },
        { warn: "✗ A number of complaints was received. ← ✓ A number of complaints ==were== received (جمع). أما The number of complaints ==was== high فمفردة لأن الاسم الرئيس هو number." },
        { warn: "✗ A great deal of people came. ← ✓ A great ==many== people came / A great ==deal of== money was spent. اسأل نفسك: هل الاسم بعدها معدود (many) أم غير معدود (deal of)؟ وكذلك ✗ a large amount of people ← ✓ a large ==number of== people (فـ amount مع غير المعدود، وnumber مع المعدود)." },
        { h: "6) كلمات تحدد الدرجة: too / so / really / enough" },
        { table: { head: ["التركيب", "المعنى", "مثال"], rows: [
          ["too + adjective", "أكثر من اللازم (سلبي)، وغالباً مع to + V1", "The tea is too hot to drink."],
          ["really / very / so + adjective", "تأكيد الدرجة دون معنى «أكثر من اللازم»", "The tea is really hot, but I like it."],
          ["so + adjective + that", "نتيجة", "The tea was so hot that I burnt my tongue."],
          ["adjective + enough (to)", "بالقدر الكافي (enough بعد الصفة)", "The soup isn't hot enough to serve."],
          ["enough + noun · too much / too many + noun", "كافٍ / أكثر من اللازم", "We don't have enough bowls. · There is too much salt."]
        ] } },
        { tip: "عند الشك اسأل ثلاثة أسئلة: (1) هل الاسم معدود أم غير معدود؟ (2) هل المعنى كثير أم قليل، وهل هو إيجابي أم سلبي؟ (3) ما الاسم الرئيس الذي سيطابقه الفعل؟" }
      ],
      summary: [
        "Partitive = اسم معدود + of + طعام: a pinch of salt, a clove of garlic, a sprig of mint, a handful of nuts. نجمع الـ partitive لا الطعام: two slices of bread, three loaves of bread.",
        "advice, information, news, furniture, bread غير معدودة ← a piece of advice وليس an advice، والفعل معها مفرد (The news is good).",
        "many / a great many / a couple of / a few / several + جمع معدود؛ much / a great deal of / a good deal of / a little + غير معدود؛ a lot of / plenty of مع النوعين.",
        "few / little = قليل جداً (سلبي)؛ a few / a little = بعض (إيجابي)؛ fewer + معدود، less + غير معدود؛ not a single للتأكيد على النفي التام.",
        "of بعد المحدِّد تأتي قبل the / my / ضمير (most of the guests, many of them) وتُحذف قبل الاسم العام (most people).",
        "الفعل يطابق الاسم الرئيس: A number of … are / The number of … is؛ Half of the cake is / Half of the guests are؛ A bunch of grapes is."
      ],
      qs: [
        { t: "mcq", q: "Mum always adds a ____ of salt to the rice water.", o: ["clove", "pinch", "loaf", "sprig"], a: 1, x: "a pinch of salt = رشة ملح، وهي الـ partitive المعتادة للمقادير الصغيرة. أما a clove فللثوم، وa loaf للخبز، وa sprig لأغصان الأعشاب." },
        { t: "mcq", q: "Zaid gave me a very useful ____ before my interview.", o: ["advice", "advices", "piece of advice", "pieces of advice"], a: 2, x: "advice اسم غير معدود فلا يُجمع ولا يأتي بعد a مباشرة؛ نقول a piece of advice (وبالجمع pieces of advice بلا a)." },
        { t: "gap", q: "Add three ____ (spoonful) of honey to the warm milk.", a: ["spoonfuls", "spoonsful"], x: "نجمع الـ partitive لا الاسم الذي بعد of: three spoonfuls of honey (والصيغة النادرة spoonsful مقبولة أيضاً)." },
        { t: "mcq", q: "A great many customers ____ complained about the noise this week.", o: ["has", "is", "was", "have"], a: 3, x: "a great many + اسم جمع معدود + فعل جمع. وthis week فترة لم تنتهِ بعد فنستخدم Present perfect: have complained." },
        { t: "mcq", q: "The company spent a great ____ of money on advertising.", o: ["deal", "many", "number", "few"], a: 0, x: "money اسم غير معدود ← a great deal of. أما a great many فتأتي مع اسم جمع معدود مباشرة (a great many tourists) ولا تأخذ of بعدها." },
        { t: "err", q: "I need some advices about which restaurant to choose.", w: "advices", c: "advice", x: "advice غير معدود فلا يُجمع: some advice أو a piece of advice." },
        { t: "gap", q: "We have very ____ (few / little) time before the restaurant closes, so let's hurry.", a: ["little"], x: "time غير معدود، والمعنى سلبي (الوقت لا يكفي) ← little. أما few فتأتي مع اسم جمع معدود." },
        { t: "mcq", q: "If you want to lose weight, eat ____ sugar and ____ biscuits.", o: ["less … less", "less … fewer", "fewer … less", "fewer … fewer"], a: 1, x: "sugar غير معدود ← less، وbiscuits جمع معدود ← fewer. (قد تسمع less biscuits في الكلام اليومي، لكن الامتحان يطلب fewer.)" },
        { t: "gap", q: "The cake was delicious, and I ate half ____ it myself.", a: ["of"], x: "بعد half نضع of إذا جاء بعدها ضمير: half of it / half of them." },
        { t: "order", a: "A good deal of the food was left untouched.", x: "a good deal of + اسم غير معدود (food)، والفعل مفرد was." },
        { t: "mcq", q: "Half of the soup ____ been eaten, but half of the dishes ____ still untouched.", o: ["has … are", "have … is", "has … is", "have … are"], a: 0, x: "الفعل يطابق الاسم الذي بعد of: soup مفرد ← has، وdishes جمع ← are." },
        { t: "tr", q: "Lots of tourists try the local dishes.", p: "Rewrite starting with: A great many …", a: ["A great many tourists try the local dishes."], x: "a great many + اسم جمع معدود (tourists) + فعل جمع (try)." },
        { t: "err", q: "Most of people prefer home-cooked meals to restaurant food.", w: "of", c: "احذف of (Most people…) أو Most of the people…", x: "قبل الاسم العام بلا the نقول Most people. أما مع the أو my أو ضمير فنضيف of: Most of the people / most of them." },
        { t: "mcq", q: "Neither the chef nor the waiters ____ aware of the problem.", o: ["was", "is", "were", "has been"], a: 2, x: "مع neither … nor يطابق الفعل الاسم الأقرب إليه، وهو waiters (جمع) ← were." },
        { t: "gap", q: "Last year the number of complaints ____ (be) very low.", a: ["was"], x: "the number of + جمع ← فعل مفرد لأن الاسم الرئيس number؛ وlast year ← Past simple: was." },
        { t: "err", q: "A number of complaints was received about the slow service.", w: "was", c: "were", x: "a number of = عدد من ← فعل جمع (were). أما the number of فتأخذ فعلاً مفرداً." },
        { t: "tr", q: "Nobody complained about the food.", p: "Rewrite starting with: Not a single person …", a: ["Not a single person complained about the food."], x: "not a single person = ولا شخص واحد، وهي صيغة أقوى من nobody، ويبقى الفعل بعدها في الزمن نفسه (complained)." },
        { t: "mcq", q: "Which sentence is correct?", o: ["A large number of people is waiting outside.", "Plenty of the food were left on the plates.", "One of the waiters have forgotten our order.", "Each of the chefs has a different speciality."], a: 3, x: "each of + جمع ← فعل مفرد has. والبقية خاطئة: a large number of people ← are، وplenty of the food ← was، وone of the waiters ← has." }
      ]
    },
    {
      id: "g12u4-gr2",
      title: "Advanced conditionals",
      ar: "الجمل الشرطية المتقدمة: القلب وبدائل if والشرط المختلط",
      body: [
        { p: "تعرف من الصفوف السابقة الأنواع الأربعة للجمل الشرطية (zero وfirst وsecond وthird). في هذا الدرس ننتقل إلى المستوى المتقدم الذي يظهر كثيراً في النصوص الرسمية وفي أسئلة تحويل الجمل: (1) **الجمل الشرطية المقلوبة** التي تُحذف منها if، (2) **بدائل if**، (3) **الشرط المختلط** حيث يختلف زمن الشرط عن زمن الجواب، (4) استخدام **will / would بعد if** للمجاملة." },
        { h: "مراجعة سريعة للأنواع الأربعة" },
        { table: { head: ["النوع", "جملة الشرط", "الجواب", "المعنى ومثال"], rows: [
          ["Zero", "if + present simple", "present simple", "حقيقة عامة: If you heat sugar, it melts."],
          ["First", "if + present simple", "will / can / may + V1 أو أمر", "شرط ممكن في المستقبل: If it rains, we'll eat inside."],
          ["Second", "if + past simple (were)", "would / could / might + V1", "غير واقعي في الحاضر أو المستقبل: If I had more time, I would cook."],
          ["Third", "if + past perfect", "would / could / might + have + V3", "غير واقعي في الماضي: If we had left earlier, we would have arrived on time."]
        ] } },
        { h: "1) الجمل الشرطية المقلوبة (Inverted conditionals)" },
        { p: "في الأسلوب الرسمي نحذف if ونقدّم الفعل المساعد على الفاعل. توجد ثلاثة قوالب فقط، ولكل قالب نوعه:" },
        { table: { head: ["القالب المقلوب", "يقابل", "الجواب المعتاد", "المعنى"], rows: [
          ["Should + subject + V1", "If + present simple (أو If … should)", "will / can / أمر", "شرط ممكن؛ أكثر تهذيباً وتدل should على احتمال ضعيف"],
          ["Were + subject + to + V1 (أو Were + subject + صفة / اسم)", "If + past simple / were", "would + V1", "غير واقعي في الحاضر أو المستقبل"],
          ["Had + subject + V3", "If + past perfect", "would have + V3", "غير واقعي في الماضي"]
        ] } },
        { ex: [
          ["==Should== the food arrive cold, please ask the waiter to replace it.", "إذا وصل الطعام بارداً فيُرجى أن تطلب من النادل استبداله. (= If the food arrives cold, …)"],
          ["==Were I to== open a restaurant, I would serve only local dishes.", "لو فتحتُ مطعماً لقدّمتُ أطباقاً محلية فقط. (= If I opened a restaurant, …)"],
          ["==Were== she more confident, she would complain to the manager.", "لو كانت أكثر ثقة لاشتكت إلى المدير. (= If she were more confident, …)"],
          ["==Had== we known the kitchen closed at nine, we would have ordered earlier.", "لو علمنا أن المطبخ يُغلق في التاسعة لطلبنا مبكراً. (= If we had known …)"],
          ["==Had she not== skipped breakfast, she wouldn't have felt so dizzy.", "لولا أنها تخطّت وجبة الفطور لما شعرت بالدوار. (= If she hadn't skipped …)"]
        ] },
        { p: "**قواعد القلب:** (1) نحذف if تماماً ولا نجمع بينها وبين الفعل المقلوب (✗ If had we known). (2) النفي يكون بوضع **not بعد الفاعل**: Had we **not** left early … ولا نستعمل الاختصار hadn't في هذا القالب. (3) في النوع الثاني مع الأفعال العادية لا نقدّم الفعل نفسه، بل نستعمل Were + فاعل + to + V1: ✗ Opened I a restaurant ← ✓ Were I to open a restaurant. أما مع be فنقول مباشرة Were I rich / Were he here. (4) نضع فاصلة بعد الجملة المقلوبة." },
        { tip: "Should تعطي الشرط طابعاً مهذباً ورسمياً (إن حصل أن…)، وقد نضيف happen to لزيادة التهذيب: ==Should== you ==happen to== see Hala, please give her this note. وWere … to تصلح أيضاً لافتراض مستقبلي مستبعد: Were it to rain tomorrow, we would move the party indoors." },
        { warn: "✗ Had I knew about the allergy, I would have told the chef. ← ✓ Had I ==known== … (بعد Had + الفاعل نستعمل التصريف الثالث V3). وتجنّب الاختصار في هذا القالب الرسمي: استعمل Had we ==not== left early, … (النفي بـ not بعد الفاعل) بدل Hadn't we left early." },
        { h: "2) بدائل if (If-substitutes)" },
        { p: "كلمات وتراكيب تؤدي معنى if بطرق مختلفة. المهم أن تعرف لكل منها: المعنى، وما يأتي بعدها (اسم أم جملة؟)، والزمن المناسب." },
        { h: "أ) «لولا»: if it weren't for وbut for وwithout" },
        { table: { head: ["الصيغة", "الحاضر / العام", "الماضي"], rows: [
          ["If it weren't for / If it hadn't been for", "If it weren't for the chef's advice, I wouldn't know how to cook this dish.", "If it hadn't been for the chef's advice, I wouldn't have known how to cook this dish."],
          ["Were it not for / Had it not been for (قلب)", "Were it not for the chef's advice, I wouldn't know …", "Had it not been for the chef's advice, I wouldn't have known …"],
          ["But for + اسم", "But for the chef's advice, I wouldn't know …", "But for the chef's advice, I wouldn't have known …"],
          ["Without + اسم أو V-ing", "Without the chef's advice, I wouldn't know …", "Without the chef's advice, I wouldn't have known …"]
        ] } },
        { p: "ملاحظتان: (1) بعد but for وwithout وif it weren't for يأتي **اسم أو V-ing** فقط، ولا تأتي جملة كاملة. (2) نحدد الصيغة (الحاضر أو الماضي) من الجواب: would + V1 للحاضر، وwould have + V3 للماضي." },
        { h: "ب) شروط وافتراضات" },
        { table: { head: ["التركيب", "المعنى", "ما يأتي بعده"], rows: [
          ["supposing / suppose (that)", "لنفترض أن… (تخيّل أو احتمال، وكثيراً في سؤال)", "جملة بالزمن نفسه الذي يأتي بعد if"],
          ["assuming (that)", "بافتراض أن… (نعدّ الأمر صحيحاً)", "جملة؛ ونستعمل المضارع للمستقبل"],
          ["provided / providing (that)", "بشرط أن… (= only if)", "جملة بالمضارع، ولا نستعمل will بعدها"],
          ["on condition that", "بشرط أن… (رسمي جداً، شرط يُفرَض)", "جملة"],
          ["as long as · so long as", "طالما / بشرط أن… (أقل رسمية)", "جملة بالمضارع"],
          ["unless", "إلا إذا… (= if … not)", "جملة بفعل مثبت"],
          ["otherwise", "وإلا… (= if not)", "تبدأ جملة جديدة بعد نقطة أو فاصلة منقوطة"]
        ] } },
        { ex: [
          ["==Supposing== the restaurant is full when we arrive, where shall we go?", "لنفترض أن المطعم ممتلئ عندما نصل، فإلى أين نذهب؟"],
          ["==Assuming== the shops are open, we'll buy the ingredients on the way.", "بافتراض أن المحلات مفتوحة سنشتري المكونات في الطريق."],
          ["You may bring your own dessert, ==provided that== you clear up afterwards.", "يمكنك إحضار حلواك بشرط أن تنظّف المكان بعد ذلك."],
          ["I'll lend you the recipe ==on condition that== you keep it secret.", "سأعيرك الوصفة بشرط أن تحتفظ بها سراً."],
          ["I don't mind where we eat ==as long as== the food is fresh.", "لا يهمني أين نأكل ما دام الطعام طازجاً."],
          ["We'll eat in the garden ==unless== it rains.", "سنأكل في الحديقة إلا إذا أمطرت."],
          ["We left early; ==otherwise==, we would have missed the bus.", "غادرنا مبكراً وإلا لفاتتنا الحافلة. (otherwise هنا = if we hadn't left early)"]
        ] },
        { p: "**unless = if … not:** لكن بعدها فعل **مثبت** (✗ unless you don't). ونستعملها غالباً مع الشرط الواقعي (zero وfirst). ولا تصلح حين يعبّر الجواب عن شعور أو ردّ فعل تجاه **عدم حدوث** الشرط (upset, surprised, sorry…): ✗ I'll be upset unless you come. ← ✓ I'll be upset ==if you don't== come. أما You won't enjoy it unless you like spicy food فصحيحة لأن المعنى «إلا إذا»." },
        { p: "**provided / providing / as long as / on condition that** كلها بمعنى «only if»، وتأتي بعدها الأزمنة نفسها التي تأتي بعد if: المضارع للمستقبل (✗ provided that it will be fine ← ✓ provided that it is fine)." },
        { p: "**otherwise** ظرف وليست أداة ربط، ولذلك نفصل قبلها في الكتابة الرسمية بنقطة أو فاصلة منقوطة، أو نستعمل or بدلاً منها: Hurry up, or you'll miss the bus. وتحمل معنى الشرط المنفي: في الحاضر if … not، وفي الماضي if … had not." },
        { warn: "✗ But for it rained, we would have eaten outside. ← ✓ But for ==the rain==, we would have eaten outside. بعد but for نضع اسماً أو V-ing لا جملة. وكذلك ✗ Unless you don't hurry, … ← ✓ ==Unless you hurry==, … لأن unless تحمل معنى النفي أصلاً." },
        { warn: "✗ I'll take an umbrella in case it will rain. ← ✓ in case it ==rains==. وتذكّر أن in case ليست بديلاً لـ if؛ معناها «تحسباً لأن…» فنأخذ المظلة قبل أن تمطر، أما if it rains فنأخذها عندما تمطر فعلاً." },
        { h: "3) الشرط المختلط (Mixed conditionals) والمرجع الزمني" },
        { p: "في الشرط المختلط لا يقع الشرط والجواب في الزمن نفسه. لا تحفظ الأنواع بأسمائها، بل اسأل: **متى** وقع الشرط؟ و**متى** تظهر النتيجة؟" },
        { table: { head: ["الحالة", "جملة الشرط", "الجواب", "مثال"], rows: [
          ["سبب في الماضي ← نتيجة الآن (Third → Second)", "if + past perfect", "would / could / might + V1", "If I had eaten breakfast, I wouldn't be so hungry now."],
          ["حالة دائمة أو صفة ← نتيجة في الماضي (Second → Third)", "if + past simple / were", "would / could / might + have + V3", "If she weren't so shy, she would have complained about the soup."]
        ] } },
        { p: "**إشارات الزمن:** now وtoday وstill وby now وthese days تدل على نتيجة في الحاضر ← would + V1. أما yesterday وlast night وin 2020 وat the time فتدل على نتيجة في الماضي ← would have + V3. ويمكن استعمال could أو might بدل would لتغيير المعنى: If I had trained as a chef, I could be running my own restaurant now." },
        { ex: [
          ["If I ==had listened== to the doctor last year, I ==wouldn't be== so tired now.", "لو كنتُ قد استمعتُ للطبيب العام الماضي لما كنتُ متعباً الآن."],
          ["If you ==hadn't eaten== so many sweets, you ==wouldn't have== a stomach ache now.", "لو لم تأكل هذا العدد من الحلويات لما أصابك ألم في المعدة الآن."],
          ["If Dana ==weren't== so shy, she ==would have told== the waiter about the mistake.", "لو لم تكن دانة خجولة إلى هذا الحد لأخبرت النادل بالخطأ."],
          ["==Had I not skipped== lunch, I ==wouldn't be== so hungry now.", "لولا أنني تخطّيت الغداء لما كنتُ جائعاً الآن. (مع القلب)"],
          ["If I ==were== a better cook, I ==would have made== dinner myself last night.", "لو كنتُ طاهياً أفضل لأعددتُ العشاء بنفسي ليلة أمس."]
        ] },
        { h: "4) if مع will / would للمجاملة" },
        { p: "القاعدة المعتادة أننا لا نستعمل will / would في جملة الشرط (✗ If it will rain). لكن توجد استثناءات مهمة:" },
        { table: { head: ["الاستعمال", "الشكل", "مثال"], rows: [
          ["طلب مهذب (= هل تتفضل…؟)", "if you will / would + V1", "If you will just follow me, I'll show you to your table. · I would be grateful if you would send the bill to my office."],
          ["طلب شديد التهذيب", "if you wouldn't mind + V-ing · if you could + V1", "If you wouldn't mind waiting a moment, your table will be ready soon."],
          ["إصرار أو عادة مزعجة (will بنبرة قوية)", "if you will + V1", "If you will keep eating between meals, don't be surprised when you put on weight."],
          ["نتيجة مستقبلية داخل جملة الشرط", "if it will + V1 (= إذا كان هذا سيساعد)", "If it will help, I'll bring some more chairs."]
        ] } },
        { ex: [
          ["==If you would== take a seat, the chef will be with you in a moment.", "إذا تفضّلتَ بالجلوس فسيكون الطاهي معك بعد لحظات."],
          ["I'd appreciate it ==if you could== keep your voice down.", "سأكون ممتناً لو خفضتَ صوتك."],
          ["==Should== you wish to see the dessert menu, please let us know.", "إذا رغبتم في الاطلاع على قائمة الحلويات فيُرجى إخبارنا. (قلب رسمي ومهذب)"]
        ] },
        { warn: "✗ If you will need help, ask me. ← ✓ If you ==need== help, ask me. نستعمل will بعد if فقط للمجاملة أو الإصرار أو النتيجة، وليس لمجرد الإشارة إلى المستقبل." },
        { h: "5) تحويلات تكثر في الامتحان" },
        { table: { head: ["الجملة الأصلية", "الصيغة المكافئة"], rows: [
          ["If you need more information, contact the manager.", "Should you need more information, contact the manager."],
          ["If I won a prize, I would invite everyone.", "Were I to win a prize, I would invite everyone."],
          ["If they had warned us, we would have stayed away.", "Had they warned us, we would have stayed away."],
          ["If it weren't for the noise, this café would be perfect.", "But for the noise, this café would be perfect. / Were it not for the noise, …"],
          ["If you don't hurry, you'll miss the bus.", "Unless you hurry, you'll miss the bus. / Hurry up; otherwise, you'll miss the bus."],
          ["If you wash up afterwards, I'll cook.", "I'll cook, provided (that) you wash up afterwards."]
        ] } },
        { tip: "حيلة سريعة لاختيار القالب المقلوب: إذا كان الجواب will أو can أو أمراً ← Should؛ وإذا كان would + V1 ← Were … to؛ وإذا كان would have + V3 ← Had. استثناء في الشرط المختلط: إذا كان الشرط في الماضي نستعمل Had حتى لو كان الجواب would + V1، مثل Had I not skipped lunch, I wouldn't be so hungry now؛ فانظر إلى زمن الشرط أيضاً، لا إلى الجواب وحده." }
      ],
      summary: [
        "القلب بدل if: Should + فاعل + V1 (ممكن)، Were + فاعل + to + V1 (غير واقعي حاضر/مستقبل)، Had + فاعل + V3 (غير واقعي ماضٍ). النفي بـ not بعد الفاعل: Had we not left …",
        "«لولا»: if it weren't for / Were it not for / but for / without + اسم؛ وفي الماضي: if it hadn't been for / Had it not been for.",
        "provided / providing (that) وon condition that وas long as = بشرط أن؛ supposing وassuming = لنفترض / بافتراض؛ ولا نستعمل will بعدها.",
        "unless = if … not (وبعدها فعل مثبت)؛ otherwise = وإلا، وتبدأ جملة جديدة بعد نقطة أو فاصلة منقوطة.",
        "الشرط المختلط: If + had V3 … would + V1 (سبب ماضٍ ونتيجة الآن)؛ If + V2 / were … would have V3 (حالة دائمة ونتيجة ماضية).",
        "للمجاملة نستعمل will / would بعد if: If you will / would + V1 …، I'd be grateful if you would / could …"
      ],
      qs: [
        { t: "mcq", q: "____ the food arrive cold, please ask the waiter to replace it.", o: ["Should", "Would", "Had", "Unless"], a: 0, x: "الشرط ممكن والجواب أمر ← Should + فاعل + V1 (= If the food arrives cold)." },
        { t: "mcq", q: "Which sentence is correct?", o: ["Was I to open my own café, I would hire only local staff.", "Would I open my own café, I would hire only local staff.", "Were I to open my own café, I would hire only local staff.", "Opened I my own café, I would hire only local staff."], a: 2, x: "القالب المقلوب للنوع الثاني هو Were + فاعل + to + V1. لا نستعمل Was ولا Would، ولا نقدّم الفعل العادي (Opened I ✗)." },
        { t: "gap", q: "____ it not for the lemon juice, the salad would taste flat.", a: ["Were", "were"], x: "Were it not for = If it weren't for (الحاضر، والجواب would taste). أما Had it not been for فتأتي مع would have + V3." },
        { t: "mcq", q: "I'll lend you my recipe book ____ you promise to look after it.", o: ["in case of", "provided that", "unless", "otherwise"], a: 1, x: "provided that = بشرط أن (only if). أما unless فتعكس المعنى، وin case of تأتي قبل اسم لا قبل جملة، وotherwise لا تدخل على جملة شرط." },
        { t: "mcq", q: "This curry is extremely hot, so you won't enjoy it ____ you like very spicy food.", o: ["if", "otherwise", "providing", "unless"], a: 3, x: "unless = إلا إذا: لن تستمتع به إلا إذا كنت تحب الطعام الحار جداً. أما if فتعطي معنى معاكساً (إن كنت تحب الحار فلن تستمتع!)، وotherwise وproviding لا تناسبان المعنى." },
        { t: "mcq", q: "Book a table now; ____ you may have to wait an hour.", o: ["otherwise", "unless", "provided", "as long as"], a: 0, x: "otherwise = وإلا (if you don't book now)، وتبدأ جملة جديدة بعد الفاصلة المنقوطة. أما unless وprovided وas long as فأدوات شرط تدخل على الجملة الشرطية ولا تعطي هذا المعنى." },
        { t: "tr", q: "If she complained, the manager would listen.", p: "Rewrite starting with: Were …", a: ["Were she to complain, the manager would listen."], x: "النوع الثاني ← Were + فاعل + to + V1: Were she to complain, …" },
        { t: "err", q: "Had I knew about the delay, I would have taken the earlier train.", w: "knew", c: "known", x: "بعد Had + الفاعل نستعمل التصريف الثالث (V3) لا الثاني: Had I known … (= If I had known …)، والجواب would have taken." },
        { t: "mcq", q: "If I had listened to my doctor last year, I ____ so tired now.", o: ["wouldn't have been", "wouldn't be", "won't be", "hadn't been"], a: 1, x: "الشرط في الماضي (had listened) والنتيجة الآن (now) ← شرط مختلط: would + V1 ← wouldn't be." },
        { t: "gap", q: "____ the waiter not warned us, we would have ordered the fish.", a: ["Had", "had"], x: "الجواب would have + V3 (ماضٍ غير واقعي) ← Had + فاعل + not + V3: Had the waiter not warned us, …" },
        { t: "tr", q: "If it weren't for the noise, this café would be perfect.", p: "Rewrite starting with: But for …", a: ["But for the noise, this café would be perfect.", "But for the noise, this cafe would be perfect."], x: "but for + اسم (the noise) بمعنى «لولا»، والجواب كما هو: would be." },
        { t: "mcq", q: "I would be very grateful if you ____ send the invoice to my office.", o: ["are going to", "shall", "had", "would"], a: 3, x: "في الطلب المهذب نستعمل would (أو could) بعد if: I would be grateful if you would … وهذا من استثناءات القاعدة التي تمنع will / would في جملة الشرط." },
        { t: "mcq", q: "If Dana weren't so shy, she ____ the waiter about the mistake last night.", o: ["would tell", "will tell", "would have told", "had told"], a: 2, x: "الصفة الدائمة (shy) في الحاضر والنتيجة وقعت أمس (last night) ← would have + V3: would have told." },
        { t: "gap", q: "If I ____ (not / eat) so much at lunch today, I wouldn't feel so full now.", a: ["hadn't eaten", "had not eaten", "'d not eaten"], x: "شرط مختلط: الفعل الماضي (at lunch today) ← had not eaten، والنتيجة الآن ← wouldn't feel." },
        { t: "err", q: "Provided that the weather will be fine, we'll hold the picnic in the park.", w: "will", c: "is (Provided that the weather is fine …)", x: "بعد provided that نستعمل المضارع للتعبير عن المستقبل كما بعد if، ولا نستعمل will." },
        { t: "tr", q: "If you don't add enough water, the rice will burn.", p: "Rewrite using: UNLESS", a: ["Unless you add enough water, the rice will burn.", "The rice will burn unless you add enough water."], x: "unless = if … not، وبعدها فعل مثبت: Unless you add enough water, …" },
        { t: "order", a: "Had it not been for her advice, I would have failed.", x: "Had it not been for + اسم = لولا (في الماضي)، والجواب would have + V3." },
        { t: "mcq", q: "Which sentence means the same as: 'If it hadn't been for the heavy traffic, we would have arrived on time'?", o: ["Had it not been for the heavy traffic, we would have arrived on time.", "If it weren't for the heavy traffic, we would arrive on time.", "Had it been for the heavy traffic, we would have arrived on time.", "If it would not have been for the heavy traffic, we would have arrived on time."], a: 0, x: "Had it not been for = If it hadn't been for (الماضي). الخيار الثاني في الحاضر، والثالث ينقصه not فينقلب المعنى، والرابع فيه would بعد if وهو خطأ." }
      ]
    }
  ],
  reading: {
    title: "What tickles your taste buds?",
    text: [
      "Why do we reach for a biscuit when we are not even hungry? Is it the smell of a bakery, the glossy pictures in adverts, or simply the people sitting around the table? We asked three readers what they believe really switches on our appetite, and their answers could hardly be more different.",
      "A: For me, nothing works faster than a smell. Last week the scent of baking bread wafted out of a bakery as I walked past, and my stomach rumbled although I had eaten lunch only an hour earlier. Scientists have long known that the aroma of food can make our mouths water before we have tasted anything, so I believe this reaction is largely automatic. A friend of mine who claims she never snacks admits that she cannot pass that bakery without buying a pastry. In my view, willpower is overrated; the sensible solution is to avoid the street altogether rather than to depend on self-control.",
      "B: Smell may play a part, but I am convinced that appetite is created far more by what we see. Adverts show glossy photographs of burgers dripping with sauce, and delivery apps send a notification just as we settle down for the evening. Before long I find myself trawling through endless pictures of tempting dishes, and sooner or later I succumb. Most of it is hype, of course – the real meal never looks like the photograph – but knowing that does not stop me from ordering. Companies understand this perfectly well, and I think they should be more honest about it.",
      "C: In my experience, appetite has far less to do with the nose or the screen than with the clock and the company. I feel hungry at the same hours every day, whether or not my body needs food. When I am alone, I rustle up something simple and hardly notice what I am eating; at a family gathering, however, it is a different story. Were I to refuse a second helping, my aunt would be hurt, so I end up devouring far more than I intended. Comfort eating works in a similar way, because we link particular dishes with happy memories. Habit and social pressure, not smell or advertising, decide what ends up on my plate.",
      "So who is right? Perhaps all three. A scent, a screen or a family table can each start the process, yet none of them leaves us completely powerless. Whatever tickles your taste buds, pausing to ask 'Am I really hungry?' costs nothing."
    ],
    skill: "Paraphrasing and comparing viewpoints",
    skillAr: "إعادة الصياغة ومقارنة وجهات النظر",
    skillTip: "لإعادة صياغة جملة (paraphrase) افهم فكرتها أولاً، ثم غيّر الكلمات بمرادفات (willpower ← self-control) وغيّر بناء الجملة (If I refused ← Were I to refuse) مع الحفاظ على المعنى نفسه، ولا تنسخ العبارات حرفياً. ولمقارنة وجهات النظر لخّص موقف كل كاتب في جملة واحدة، ثم ابحث عن نقاط الاتفاق (in common with, similarly) ونقاط الاختلاف (whereas, unlike, however)، وانتبه إلى عبارات الرأي مثل I am convinced وIn my view.",
    gloss: [
      ["reach for", "يمدّ يده نحو (ليتناول)"], ["glossy", "لامع / مصقول"],
      ["wafted", "انسابت (رائحة) في الهواء"], ["aroma", "رائحة زكية"], ["overrated", "مبالَغ في تقدير قيمته"], ["self-control", "ضبط النفس"],
      ["convinced", "على قناعة تامة"], ["trawling", "يتصفّح / يفتّش بإسهاب"], ["succumb", "يستسلم (للإغراء)"], ["hype", "دعاية مبالغ فيها"],
      ["rustle up", "يُعدّ (وجبة) على عجل"], ["gathering", "لقاء / تجمّع"], ["helping", "حصة من الطعام"], ["devouring", "يلتهم"],
      ["comfort eating", "الأكل للمواساة العاطفية"], ["powerless", "عاجز"]
    ],
    gist: [
      "سُئل ثلاثة قرّاء عمّا يوقظ شهيتنا حقاً، فجاءت إجاباتهم شديدة الاختلاف.",
      "A: الرائحة تثير الشهية تلقائياً، والأفضل تجنّب مصدرها بدل الاعتماد على الإرادة.",
      "B: الصور والإعلانات هي التي تصنع الشهية، وعلى الشركات أن تكون أكثر صدقاً.",
      "C: العادة والمناسبات الاجتماعية، لا الرائحة ولا الإعلان، تحدد ما نأكل.",
      "ربما الآراء الثلاثة صحيحة جزئياً، لكننا لسنا عاجزين تماماً أمام الإغراء."
    ],
    tr: [
      "لماذا نمدّ أيدينا إلى قطعة بسكويت ونحن لسنا جائعين أصلاً؟ هل السبب رائحة مخبز، أم الصور اللامعة في الإعلانات، أم مجرد الأشخاص الجالسين حول المائدة؟ سألنا ثلاثة قرّاء عمّا يعتقدون أنه يُشعل شهيتنا حقاً، فجاءت إجاباتهم شديدة الاختلاف.",
      "A: بالنسبة إليّ، لا شيء يعمل أسرع من الرائحة. ففي الأسبوع الماضي انسابت رائحة الخبز الطازج من أحد المخابز وأنا أمرّ بجانبه، فقرقرت معدتي مع أنني تناولت الغداء قبل ساعة واحدة فقط. وقد عرف العلماء منذ زمن طويل أن رائحة الطعام قد تجعل لعابنا يسيل قبل أن نتذوق شيئاً، ولذلك أعتقد أن هذا الردّ تلقائي في معظمه. وتعترف صديقة لي، تزعم أنها لا تتناول وجبات خفيفة أبداً، بأنها لا تستطيع أن تمرّ بذلك المخبز دون أن تشتري قطعة معجنات. وفي رأيي أن قوة الإرادة مبالغ في تقدير قيمتها؛ والحل المعقول هو أن نتجنب ذلك الشارع تماماً بدلاً من الاعتماد على ضبط النفس.",
      "B: قد تلعب الرائحة دوراً، لكنني على قناعة تامة بأن الشهية تصنعها الصور التي نراها أكثر بكثير. فالإعلانات تعرض صوراً لامعة لشطائر برغر تتقاطر منها الصلصة، وتطبيقات التوصيل ترسل إشعاراً في اللحظة التي نستقر فيها لقضاء المساء. وبعد قليل أجد نفسي أتصفح بلا نهاية صور أطباق مغرية، وعاجلاً أو آجلاً أستسلم. ومعظم ذلك دعاية مبالغ فيها بالطبع، فالوجبة الحقيقية لا تشبه الصورة أبداً، لكن معرفتي بذلك لا تمنعني من الطلب. والشركات تدرك ذلك جيداً، وأعتقد أن عليها أن تكون أكثر صدقاً في هذا الشأن.",
      "C: في تجربتي، علاقة الشهية بالأنف أو بالشاشة أقل بكثير من علاقتها بالساعة وبمن حولنا. فأنا أشعر بالجوع في الساعات نفسها كل يوم، سواء أكان جسمي بحاجة إلى الطعام أم لا. وحين أكون وحدي أُعدّ شيئاً بسيطاً على عجل ولا ألاحظ تقريباً ما آكله؛ أما في اللقاءات العائلية فالأمر مختلف تماماً. فلو رفضتُ تناول حصة ثانية لجُرحت مشاعر عمّتي، ولذلك ينتهي بي الأمر إلى التهام أكثر بكثير مما نويت. والأكل للمواساة يعمل بطريقة مماثلة، لأننا نربط أطباقاً معينة بذكريات سعيدة. إن العادة والضغط الاجتماعي، لا الرائحة ولا الإعلان، هما ما يحدد ما ينتهي في صحني.",
      "فمن المحقّ إذن؟ ربما الثلاثة جميعاً. فالرائحة أو الشاشة أو مائدة العائلة قد تبدأ كل منها هذه العملية، لكن لا شيء منها يتركنا عاجزين تماماً. وأياً كان ما يداعب براعم التذوق لديك، فإن التوقف لحظة لتسأل نفسك «هل أنا جائع فعلاً؟» لا يكلّفك شيئاً."
    ],
    qs: [
      { t: "mcq", q: "What is the main purpose of the article?", o: ["To prove that smell is the strongest trigger of hunger.", "To present different opinions about what makes us want to eat.", "To persuade readers to stop eating at family gatherings.", "To warn readers against food-delivery apps."], a: 1, x: "المقال يعرض ثلاث وجهات نظر مختلفة (A وB وC) حول ما يثير الشهية ولا يحاول إثبات رأي واحد؛ وتؤكد الفقرة الأخيرة ذلك بقولها Perhaps all three." },
      { t: "mcq", q: "Why does the writer of A think it is sensible to avoid the street?", o: ["Because the bakery sells unhealthy food.", "Because the street is too crowded at lunchtime.", "Because willpower cannot be relied on to stop an automatic reaction.", "Because the writer is allergic to fresh bread."], a: 2, x: "A يرى أن الاستجابة للرائحة تلقائية (largely automatic) وأن willpower is overrated، لذلك فتجنّب المكان أذكى من الاعتماد على ضبط النفس وحده." },
      { t: "mcq", q: "In paragraph 3, the word 'succumb' is closest in meaning to …", o: ["give in", "complain", "hesitate", "pay"], a: 0, x: "succumb (to) = يستسلم للإغراء، أي give in. ويدل عليه السياق: sooner or later I succumb وknowing that does not stop me from ordering." },
      { t: "mcq", q: "In paragraph 2, what does 'this reaction' refer to?", o: ["The work of scientists", "Eating lunch an hour earlier", "Walking past a bakery", "Our mouths watering at the smell of food"], a: 3, x: "this reaction تعود إلى ما ذُكر قبلها مباشرة: the aroma of food can make our mouths water، أي سيلان اللعاب عند شمّ الطعام." },
      { t: "mcq", q: "Which writer says that a relative's feelings affect how much they eat?", o: ["C", "A", "B", "A and B"], a: 0, x: "الكاتب C وحده يذكر أن رفض حصة ثانية سيجرح مشاعر عمّته (Were I to refuse a second helping, my aunt would be hurt)." },
      { t: "mcq", q: "Which sentence is the best paraphrase of B's words 'Most of it is hype, of course – the real meal never looks like the photograph'?", o: ["Real food usually looks better than it does in photographs.", "Advertising makes food seem better than it really is.", "Photographs of food are always completely honest.", "Most meals are never photographed at all."], a: 1, x: "hype = دعاية مبالغ فيها، وجملة the real meal never looks like the photograph تعني أن الصور تُظهر الطعام أجمل من حقيقته. الخيار الأول يعكس المعنى، والثالث يناقضه." },
      { t: "mcq", q: "Which sentence is the closest paraphrase of C's 'Were I to refuse a second helping, my aunt would be hurt'?", o: ["I refused a second helping, so my aunt was hurt.", "If I had refused a second helping, my aunt would have been hurt.", "My aunt would be hurt if I refused a second helping.", "My aunt is hurt because I never refuse a second helping."], a: 2, x: "Were I to refuse = If I refused: شرط غير واقعي في الحاضر أو المستقبل، والجواب would be hurt. الخيار الثاني من النوع الثالث (الماضي) فلا يطابق المعنى." },
      { t: "mcq", q: "What do the writers of A and C have in common?", o: ["They both believe advertising is the main cause of temptation.", "They both say willpower is the best defence.", "They both blame food companies for what people eat.", "They both describe feeling like eating when their bodies do not need food."], a: 3, x: "A: قرقرت معدتي رغم أنني تناولت الغداء قبل ساعة. وC: أشعر بالجوع في الساعات نفسها سواء احتاج جسمي إلى الطعام أم لا. أما الخيارات الأخرى فتخص B أو لا يقولها أحد." },
      { t: "tf", q: "The writer of A had not eaten lunch when the smell of the bakery made their stomach rumble.", a: false, x: "غير صحيح. النص يقول إنه تناول الغداء قبل ساعة فقط (I had eaten lunch only an hour earlier)." },
      { t: "find", q: "Find a phrase in paragraph 4 that means 'the situation is completely different'.", a: ["a different story", "it is a different story", "it's a different story", "different story"], x: "it is a different story = الأمر مختلف تماماً." },
      { t: "open", q: "In your own words, explain the main difference between B's view and C's view. Which do you find more convincing, and why?", m: "B believes that appetite is created mainly by outside things that companies control, such as photographs, adverts and phone notifications. C believes it comes from routine and from the social situation, for example family meals and politeness. I find C more convincing, because I often eat simply because it is mealtime or because other people are eating.", x: "الإجابة الجيدة تعيد صياغة الفكرتين بكلماتك (لا تنسخ الجمل) وتقارن بينهما بكلمات مثل whereas وunlike، ثم تعطي رأيك مع سبب." }
    ]
  },
  writing: {
    type: "Restaurant review",
    ar: "مراجعة مطعم",
    about: "المراجعة (review) نص صحفي قصير يصف تجربتك في مطعم أو مقهى ويقيّمها، ثم يوصي القرّاء بزيارته أو بتجنّبه. أسلوبها **شبه رسمي**: تجمع بين الانطباع الشخصي واللغة المنظمة الدقيقة، لذلك نتجنب العامية (pricey, yummy, grub) ونستعمل مقابلاتها الرسمية (expensive, delicious, food). ومن أدوات الكتابة المتقدمة في هذا الدرس: **الاسمية** (nominalisation) لتحويل الصفة أو الفعل إلى اسم فيصبح الأسلوب أكثر رسمية وإحكاماً، مثل The slowness of the service بدل The service was slow؛ و**المقارنة والمقابلة** (In common with… / Unlike…)؛ و**الافتتاحية الشرطية** (Should you find yourself in…)؛ و**عبارات التوصية** (I cannot praise it highly enough). الطول المعتاد 200–250 كلمة في أربع فقرات تقريباً مع عنوان.",
    plan: [
      { part: "Title and introduction", ar: "العنوان والمقدمة", tip: "ابدأ بعنوان جذاب واسم المطعم ومكانه. ثم اكتب افتتاحية تلفت الانتباه، ويفضّل جملة شرطية مقلوبة مثل Should you find yourself in… أو Were you to ask me…، وأضف انطباعك العام في جملة واحدة." },
      { part: "The food", ar: "الطعام", tip: "صف الأطباق بصفات دقيقة للقوام والنكهة (tender, velvety, fluffy / soggy, stodgy, greasy) لا بكلمتي good وbad فقط. قارن بين الأطباق أو بين المطعم وغيره (In common with… / Unlike…) واستخدم الاسمية: the tenderness of the lamb." },
      { part: "Service, atmosphere and price", ar: "الخدمة والأجواء والسعر", tip: "قيّم الخدمة والأجواء والسعر (value for money) بتوازن بين الإيجابي والسلبي مستخدماً أدوات التضاد (although, however, on the other hand). ويمكنك إضافة شرط يبيّن ما كان سيتغير: Had we booked…" },
      { part: "Conclusion and recommendation", ar: "الخاتمة والتوصية", tip: "لخّص رأيك وأعطِ توصية واضحة: I cannot praise it highly enough أو I would give it a wide berth. ويمكنك إضافة تقييم بالنجوم أو نصيحة مشروطة: Provided that you book ahead, …" }
    ],
    phrases: [
      { en: "Should you find yourself in …, do not miss …", ar: "إذا وجدتَ نفسك في … فلا تفوّت …", use: "افتتاحية بجملة شرطية مقلوبة" },
      { en: "Were you to ask me for a place that …, I would suggest …", ar: "لو سألتني عن مكان …، لاقترحتُ …", use: "افتتاحية شرطية مهذبة" },
      { en: "Had I known how …, I would have …", ar: "لو علمتُ كم …، لكنتُ …", use: "افتتاحية أو خاتمة تعبّر عن المفاجأة أو الندم" },
      { en: "In common with most family-run restaurants, …", ar: "على غرار معظم المطاعم العائلية، …", use: "مقارنة: وجه الشبه" },
      { en: "Unlike its larger rivals, … / In contrast to …", ar: "على عكس منافسيه الأكبر، … / بخلاف …", use: "مقابلة: وجه الاختلاف" },
      { en: "The tenderness of the lamb was remarkable.", ar: "كانت طراوة اللحم لافتة.", use: "الاسمية: بدل The lamb was very tender" },
      { en: "The slowness of the service tried our patience.", ar: "اختبر بطءُ الخدمة صبرنا.", use: "الاسمية: تحويل الصفة إلى اسم لأسلوب أكثر رسمية" },
      { en: "The dessert was a real letdown / fell short of expectations.", ar: "كانت الحلوى خيبة أمل حقيقية / لم ترقَ إلى التوقعات.", use: "نقد سلبي" },
      { en: "It does not live up to the hype.", ar: "لا يرقى إلى الضجة المحيطة به.", use: "نقد: دعاية مبالغ فيها" },
      { en: "It offers excellent value for money.", ar: "يقدم قيمة ممتازة مقابل السعر.", use: "تقييم السعر" },
      { en: "I cannot praise it highly enough.", ar: "لا أستطيع أن أمتدحه بما يكفي.", use: "توصية قوية" },
      { en: "I would advise readers to give it a wide berth.", ar: "أنصح القرّاء بتجنّبه تماماً.", use: "تحذير" },
      { en: "Provided that you book ahead, …", ar: "بشرط أن تحجز مسبقاً، …", use: "نصيحة مشروطة" },
      { en: "Were it not for the noise, it would be flawless.", ar: "لولا الضجيج لكان بلا عيوب.", use: "تقييم متوازن: مدح مع تحفظ" },
      { en: "Use 'expensive', not 'pricey'; 'delicious', not 'yummy'.", ar: "استعمل expensive بدل pricey، وdelicious بدل yummy.", use: "العامية ← الرسمية" },
      { en: "Use 'food', not 'grub'; 'rather disappointing', not 'a bit of a letdown'.", ar: "استعمل food بدل grub، وrather disappointing بدل a bit of a letdown.", use: "العامية ← الرسمية" }
    ],
    task: "A local magazine for young readers is running a series called 'Hidden Gems'. Write a review (200–250 words) of a restaurant, café or street-food stall that you know well. Describe the food and the service, compare the place with similar ones, and say whether you would recommend it.",
    taskAr: "تنشر مجلة محلية للشباب سلسلة بعنوان «جواهر مخفية». اكتب مراجعة (200–250 كلمة) لمطعم أو مقهى أو بسطة طعام تعرفه جيداً: صف الطعام (النكهة والقوام) والخدمة والسعر، وقارن المكان بأماكن مشابهة، ثم أوصِ به أو حذّر منه. ابدأ بجملة شرطية مقلوبة واستخدم أسلوباً شبه رسمي.",
    words: [200, 250],
    model: [
      "Olive Corner: A Hidden Gem in Salt",
      "Should you find yourself in Salt around lunchtime, do not walk past Olive Corner. Tucked away in a quiet side street, this small family restaurant has become a favourite with local students, and after two visits I can understand why.",
      "In common with the best home kitchens, Olive Corner relies on simple ingredients cooked with care. The tenderness of the slow-cooked lamb was remarkable, and the lentil soup was velvety and gently spiced. Unlike the fast-food outlets nearby, it serves nothing greasy. The bread, fluffy inside and slightly crisp outside, arrived with a generous helping of hummus. The baklava, however, was a letdown: it was rather soggy and far too sweet.",
      "The staff were friendly, although the slowness of the kitchen on a busy Friday tried our patience. Had we booked a table, we would probably have waited far less. Prices, on the other hand, are very reasonable. A three-course meal costs about the same as a fast-food combo, so the restaurant offers excellent value for money.",
      "Provided that you book ahead, I cannot praise Olive Corner highly enough. Were I to give it a score, it would earn four stars out of five, with the missing star reserved for the dessert. Go hungry, and leave room for a second helping of lentil soup."
    ],
    check: [
      "هل بدأتَ بعنوان وبافتتاحية جذابة، ويفضّل جملة شرطية مقلوبة مثل Should you find yourself in…؟",
      "هل وصفتَ الطعام بصفات دقيقة للقوام والنكهة (tender, velvety, soggy…) وليس بكلمتي good وbad فقط؟",
      "هل قارنتَ بين الأطباق أو بين المطعم وغيره باستخدام In common with… أو Unlike…؟",
      "هل استخدمتَ الاسمية (nominalisation) مرتين على الأقل، مثل the tenderness of… وthe slowness of…؟",
      "هل غطّيتَ الطعام والخدمة والسعر بتوازن بين الجوانب الإيجابية والسلبية؟",
      "هل ختمتَ بتوصية واضحة (I cannot praise it highly enough / I would give it a wide berth)؟",
      "هل التزمتَ بأسلوب شبه رسمي وتجنّبتَ الكلمات العامية مثل yummy وpricey وgrub؟",
      "هل راجعتَ الجمل الشرطية وتعبيرات الكمية وتطابق الفعل وعدد الكلمات؟"
    ]
  },
  speaking: {
    title: "Describing food, giving feedback and describing amounts",
    ar: "وصف الطعام وتقديم الملاحظات والشكاوى ووصف الكميات",
    phrases: [
      { en: "The meat is beautifully tender and full of flavour.", ar: "اللحم طري جداً وغني بالنكهة.", use: "وصف جودة الطعام" },
      { en: "The rice is lovely and fluffy, but the chicken is rather dry.", ar: "الأرز رائع وهش، لكن الدجاج جاف بعض الشيء.", use: "وصف القوام (إيجابي وسلبي)" },
      { en: "It's a bit bland. It could do with a pinch of salt.", ar: "طعمه باهت قليلاً. يحتاج إلى رشة ملح.", use: "ملاحظة على النكهة" },
      { en: "That was delicious – compliments to the chef!", ar: "كان لذيذاً – تحياتي للطاهي!", use: "المديح" },
      { en: "Excuse me, I'm afraid there's a problem with our order.", ar: "عفواً، للأسف هناك مشكلة في طلبنا.", use: "بدء شكوى مهذبة" },
      { en: "I'm afraid the soup is only lukewarm.", ar: "للأسف الشوربة فاترة فقط.", use: "شكوى مهذبة" },
      { en: "Would it be possible to have it heated up / replaced?", ar: "هل يمكن تسخينه / استبداله؟", use: "طلب مهذب" },
      { en: "I'd be grateful if you could take it back to the kitchen.", ar: "سأكون ممتناً لو أعدتَه إلى المطبخ.", use: "طلب شديد التهذيب (if + could)" },
      { en: "Had I known it would be so greasy, I wouldn't have ordered it.", ar: "لو علمتُ أنه سيكون دهنياً إلى هذا الحد لما طلبته.", use: "تعبير عن خيبة الأمل بجملة شرطية" },
      { en: "Were you to use a little less oil, it would be perfect.", ar: "لو استعملتم زيتاً أقل قليلاً لكان مثالياً.", use: "ملاحظة بنّاءة بجملة شرطية" },
      { en: "Could I have a generous helping of rice, please?", ar: "هل يمكنني الحصول على حصة كبيرة من الأرز من فضلك؟", use: "طلب كمية" },
      { en: "Just a handful of nuts and a couple of olives will do.", ar: "حفنة من المكسرات وحبتا زيتون تكفيان.", use: "وصف كمية صغيرة" },
      { en: "There's hardly any sauce on this plate.", ar: "لا تكاد توجد صلصة في هذا الطبق.", use: "شكوى من قلة الكمية" },
      { en: "I'm stuffed – I couldn't manage another mouthful.", ar: "شبعتُ تماماً – لا أستطيع تناول لقمة أخرى.", use: "التعبير عن الشبع" },
      { en: "It really irritates me when people talk with their mouths full.", ar: "يزعجني حقاً عندما يتحدث الناس وأفواههم ممتلئة بالطعام.", use: "التعبير عن الانزعاج (آداب المائدة)" },
      { en: "I don't mind how people eat, as long as they are polite.", ar: "لا يهمني كيف يأكل الناس ما داموا مهذبين.", use: "التعبير عن التسامح (آداب المائدة)" }
    ],
    dialogue: [
      ["Rana", "This lamb is beautifully tender, Tariq, and the rice is lovely and fluffy. How's yours?"],
      ["Tariq", "Mine is a different story, I'm afraid. The chicken is rather dry, and the soup is only lukewarm."],
      ["Rana", "Then let's say something. Excuse me, Yousef? I'm afraid there's a problem with my friend's meal."],
      ["Yousef", "I'm very sorry to hear that. What seems to be the trouble?"],
      ["Tariq", "The soup isn't hot enough, and there's hardly any sauce on the chicken. Would it be possible to have them replaced?"],
      ["Yousef", "Of course, sir. I'll bring a fresh bowl of soup and a generous helping of sauce straight away."],
      ["Tariq", "Thank you. I'd be grateful if you could bring a couple of lemon wedges as well."],
      ["Yousef", "Certainly. Should you need anything else, please just call me."],
      ["Rana", "That was handled nicely. Had we complained rudely, the whole evening would have been spoilt."],
      ["Tariq", "You're right. If the fresh soup is half as good as your lamb, I'll give this place five stars."]
    ]
  },
  test: [
    { t: "mcq", q: "The steak was so ____ that I had to chew each piece for ages.", o: ["tender", "gristly", "velvety", "succulent"], a: 1, k: "vocab", x: "gristly = فيه غضاريف وعروق صلبة تحتاج إلى مضغ طويل. أما tender وvelvety وsucculent فصفات إيجابية تدل على اللين والنعومة والعصارة." },
    { t: "mcq", q: "I promised myself I would eat no more sweets, but I ____ to temptation when I saw the tray of baklava.", o: ["devoured", "trawled", "succumbed", "wafted"], a: 2, k: "vocab", x: "succumb to temptation = يرضخ للإغراء. أما devour فتعني يلتهم الطعام، وtrawl يفتّش بدقة، وwaft تُقال عن الرائحة التي تنساب في الهواء." },
    { t: "mcq", q: "The restaurant looked impressive, but the food was a real ____: cold, greasy and overpriced.", o: ["letdown", "delicacy", "staple", "helping"], a: 0, k: "vocab", x: "a letdown = خيبة أمل، وهي مناسبة لوصف طعام بارد ودهني ومرتفع السعر. أما delicacy فأكلة فاخرة، وstaple غذاء أساسي، وhelping حصة." },
    { t: "mcq", q: "My grandmother can always ____ a tasty meal from whatever is left in the fridge.", o: ["trawl through", "sneak into", "yearn for", "rustle up"], a: 3, k: "vocab", x: "rustle up a meal = يحضّر وجبة على عجل بما هو متوفر. والخيارات الأخرى لا تعطي معنى مع a tasty meal." },
    { t: "mcq", q: "Read this extract from a review:\n'The new café near the university had been praised by half the city, so my expectations were high. Sadly, the coffee was lukewarm, the pastry was soggy and the waiter looked bored. Frankly, it did not live up to the hype, and I shall give it a wide berth in future.'\nWhat does the reviewer mean by 'give it a wide berth'?", o: ["visit it more often", "stay away from it", "recommend it to friends", "write a longer review of it"], a: 1, k: "vocab", x: "give something a wide berth = يتجنّبه تماماً. ويدل عليه السياق: المقهى لم يرقَ إلى الضجة المحيطة به (did not live up to the hype) فقرر الكاتب ألا يقترب منه مستقبلاً." },
    { t: "mcq", q: "She finished the rice pudding with a ____ of cinnamon.", o: ["loaf", "slice", "dusting", "carton"], a: 2, k: "g12u4-gr1", x: "a dusting of cinnamon = طبقة خفيفة من القرفة المطحونة. أما loaf فللخبز، وslice لشرائح الخبز والكعك، وcarton لعبوات الحليب والعصير." },
    { t: "mcq", q: "____ visitors come to the old market every weekend, especially in spring.", o: ["A great many", "A great deal of", "Much", "A little"], a: 0, k: "g12u4-gr1", x: "visitors اسم جمع معدود ← a great many. أما a great deal of وmuch وa little فتأتي مع الأسماء غير المعدودة." },
    { t: "mcq", q: "Which sentence means the same as 'There was hardly any rice left'?", o: ["Very few rice were left.", "A little rice was left.", "Not much of rice was left.", "Very little rice was left."], a: 3, k: "g12u4-gr1", x: "hardly any + اسم غير معدود = very little (قليل جداً، معنى سلبي). أما a little فمعناها «بعض» الإيجابي، وrice غير معدود فلا تصلح معه few." },
    { t: "mcq", q: "The rest of the pizza ____ in the fridge, but the rest of the olives ____ on the table.", o: ["is … are", "are … is", "is … is", "are … are"], a: 0, k: "g12u4-gr1", x: "الفعل يطابق الاسم الذي بعد of: pizza مفرد ← is، وolives جمع ← are." },
    { t: "mcq", q: "____ I to open a restaurant, it would serve only seasonal dishes.", o: ["Had", "Should", "Were", "Would"], a: 2, k: "g12u4-gr2", x: "Were + فاعل + to + V1 هو القالب المقلوب للشرط غير الواقعي في الحاضر أو المستقبل (= If I opened a restaurant, …)." },
    { t: "mcq", q: "Which sentence means the same as 'If it hadn't been for her recipe, the cake would have been a disaster'?", o: ["Without her recipe, the cake will be a disaster.", "But for her recipe, the cake would have been a disaster.", "Had it been for her recipe, the cake would have been a disaster.", "If she had followed her recipe, the cake would have been a disaster."], a: 1, k: "g12u4-gr2", x: "If it hadn't been for = But for + اسم (لولا في الماضي) ← would have been. الخيار الأول يحوّل المعنى إلى المستقبل، والثالث ينقصه not فينعكس المعنى، والرابع يعكس المعنى تماماً." },
    { t: "mcq", q: "Which sentence means the same as 'If you need a vegetarian option, tell the waiter'?", o: ["Would you need a vegetarian option, tell the waiter.", "Had you need a vegetarian option, tell the waiter.", "Unless you need a vegetarian option, tell the waiter.", "Should you need a vegetarian option, tell the waiter."], a: 3, k: "g12u4-gr2", x: "الشرط الممكن (If you need) يقابله Should you need. أما Would وHad فلا تصحان بهذا الشكل، وunless تعكس المعنى." },
    { t: "mcq", q: "I'd be able to cook this dish properly now if I ____ the cookery course last year.", o: ["took", "would take", "had taken", "have taken"], a: 2, k: "g12u4-gr2", x: "last year في جملة الشرط (الماضي) والنتيجة now ← شرط مختلط: if + past perfect (had taken) … would be able to." },
    { t: "gap", q: "We'll have the picnic in the park ____ it rains, in which case we'll stay at home.", a: ["unless"], k: "g12u4-gr2", x: "unless = إلا إذا (= if it doesn't rain)، وقد دلّت على المعنى عبارة in which case we'll stay at home." },
    { t: "mcq", q: "Reem, a student, talks about table manners:\n'Honestly, I can't stand it when people talk with their mouths full. From an early age, my parents brought it home to me that good manners cost nothing, and I'm grateful for that. I don't mind which hand holds the fork, but noisy chewing drives me up the wall. Slurping, however, is a different matter – in some countries it's actually polite.'\nWhat is Reem's attitude to slurping?", o: ["She finds it just as annoying as talking with a full mouth.", "She accepts that it can be polite in some cultures.", "She believes it is always rude.", "She has never noticed anyone doing it."], a: 1, k: "reading", x: "تقول Reem إن slurping «مسألة مختلفة» (a different matter) لأنه مهذب في بعض البلدان، فموقفها متسامح. أما الحديث بفم ممتلئ فتكرهه (can't stand it)." },
    { t: "mcq", q: "Read the poem:\nBefore the city wakes, the baker's door\nbreathes out a warm gold cloud of bread and spice.\nThe cold street, half asleep, leans in for more\nand drinks the morning slowly, sip by sip.\nNobody asks if they are hungry yet;\nthe smell has asked them, and they have said yes.\nWhat do the last two lines suggest?", o: ["People ignore the smell of bread because they are not hungry.", "The baker is asking customers whether they want to buy bread.", "The street is empty because nobody is hungry.", "The smell attracts people before they have decided that they are hungry."], a: 3, k: "reading", x: "الشاعر يقول إن أحداً لا يسأل نفسه إن كان جائعاً، فالرائحة هي التي «سألتهم» وأجابوا بنعم؛ أي أنها تجذب الناس قبل أن يقرروا أنهم جائعون. وهذه صورة مجازية تجعل الرائحة تتصرف كشخص يسأل." },
    { t: "mcq", q: "Read the text:\n'Many shoppers believe they choose their food freely, but I suspect that supermarkets are planned to tempt us. The bread and the milk are kept at the back of the shop, so we have to walk past row after row of snacks to reach them.'\nWhich sentence is the best paraphrase of the second sentence?", o: ["Shoppers who want bread and milk must first pass many tempting products.", "Snacks are cheaper at the back of the shop than bread and milk.", "Bread and milk are usually sold out by the time shoppers reach them.", "Customers prefer to buy snacks before they buy bread and milk."], a: 0, k: "reading", x: "الجملة الثانية تقول إن الخبز والحليب في مؤخرة المتجر فنمرّ بصفوف من الوجبات الخفيفة لنصل إليهما. وأفضل إعادة صياغة: من يريد الخبز والحليب عليه أن يمرّ أولاً بمنتجات مغرية كثيرة. أما بقية الخيارات فتضيف معلومات غير مذكورة." },
    { t: "mcq", q: "You are in a restaurant and your soup is cold. Which request is the most polite and appropriate?", o: ["This soup is freezing! Take it away.", "I'm afraid my soup is rather cold. Would it be possible to have it heated up?", "Your soup is terrible and you should be ashamed.", "Why is the food always cold in this place?"], a: 1, k: "speaking", x: "الشكوى المهذبة تبدأ بـ I'm afraid وتخفف النقد بـ rather وتنتهي بطلب مهذب Would it be possible …؟ أما بقية الخيارات فهجومية أو غير مهذبة." },
    { t: "mcq", q: "Which sentence would be most suitable in a formal restaurant review?", o: ["The grub was yummy and dirt cheap.", "I reckon it's a bit pricey, but whatever.", "The food was delicious and offered remarkably good value for money.", "Loads of people say it's brilliant, so there you go."], a: 2, k: "writing", x: "المراجعة شبه رسمية، فنفضّل المفردات الدقيقة (delicious, value for money) على العامية (grub, yummy, pricey, loads of)." },
    { t: "mcq", q: "Which sentence is a nominalised version of 'The waiters were slow, and this annoyed us'?", o: ["The waiters were so slow that we were annoyed.", "We were annoyed because the waiters were slow.", "The waiters slowly annoyed us.", "The slowness of the waiters annoyed us."], a: 3, k: "writing", x: "الاسمية (nominalisation) تحوّل الصفة slow إلى الاسم slowness فنحصل على أسلوب أكثر رسمية: The slowness of the waiters annoyed us." }
  ]
});

# Review log — EXTRAS (data/extras/extras-g11.js, data/extras/extras-g12.js) — independent review

Work copies: data/wip/extras-g11.review.js and data/wip/extras-g12.review.js (originals untouched until the final `mv`;
their mtimes were checked before the `mv`, nobody else had modified them).
Scope: 14 extras / 124 questions — G11: Frost poem, Jordan's Parliament, 3 Life Skills (44 qs); G12: seaside, Black Beauty,
humour, Great Expectations, 5 Life Skills (80 qs).

Method
- Read CONTENT_SCHEMA.md (EXTRAS), tools/validate.js and the renderer (js/views.js V.extra / blocksHTML, js/core.js U.md /
  bidiWrap, js/quiz.js grade, css/app.css) so the checks match what students actually see.
- Every mcq/tf/gap/err/order item was solved blind and compared with the key (0 wrong keys, 0 mcq with a second defensible
  option, 0 err/order problems); every `x` was re-read against its key (the few that cite option positions were re-checked
  after edits). Every typed `gap` list was probed with the REAL app grader (U.matches / U.norm).
  tools/tests/grading.test.js only registers unit questions (it reports "0 questions" for extras), so I ran the same
  assertions over TAF.extras with a throw-away harness kept outside the repo (/tmp/rev/extras_grade.js): 44 + 80 questions pass.
- Facts and texts verified on the web (WebSearch/WebFetch only; no browser tools):
  * Frost poem: Poetry Foundation, Wikipedia and Owl Eyes full texts (plus RPO/Toronto for the 1923 book, stanza form and
    the rhyme scheme). Programmatic string comparison with the canonical text: identical.
  * Black Beauty ch. 1 "My Early Home": Standard Ebooks text.
  * Great Expectations ch. 8: Hackernoon full text (all quotes), LingQ, Shmoop, a university extract and a QQ reader copy
    (for the one punctuation question below).
  * Parliament: English translation of the Jordanian Constitution (Constitute, 2014) — Art. 36/62/63/64 (Senate appointed by
    the King, two Houses, categories of senators), Art. 53 (confidence vote only in the House of Representatives),
    Art. 91–93 (bill: House, then Senate, then the King's ratification), Art. 96 (questions to ministers).
  * Seaside: George III's first Weymouth visit in 1789 (regencyhistory.net). Other dates/names (Frost 1874–1963 and "New
    Hampshire" 1923, Sewell 1820–78 / 1877, Dickens 1812–70 / All the Year Round 1860–61, Tuckman 1965, Dweck at Stanford,
    UK 22.5 g sugars/100 g "high" threshold, WHO "free sugars") are well established.
- Scripts also checked: English-only `p` blocks (trailing LRM), table heads, `warn`/`tip`/`h` blocks, markup balance,
  parentheses, word counts of every model text (Frost diary 97 words for 80–100; Black Beauty animal paragraph 63 for 60–80;
  cinema paragraph 74 for 70–90; humour paragraph 62 for 60–80), excerpt lengths (109 and 97 words, <= 120), arithmetic of
  the decision matrix (25 / 18 / 24; with cost x4: 34 for Ajloun, 31 for Petra) and of the food-label sums (9 g x 3.3 = about
  30 g = 7–8 teaspoons), British spelling scan, Arabic hamza/punctuation/typo scan, option-length cues.

## Special checks requested
1. Frost poem — verbatim and word-for-word correct (16 lines, 4 stanzas). Every line has 8 syllables (counted by hand twice
   and by script with overrides: "village" 2, "stopping" 2, "evening" eve-ning 2, "promises" 3, "sound's" 1, "miles" 1,
   "queer" 1), rhyme scheme AABA BBCB CCDC DDDD (know/though/snow = A; here/queer/near/year = B; lake/shake/mistake/flake = C;
   sweep/deep/keep/sleep/sleep = D), metre iambic tetrameter (stress example "whose WOODS these ARE I THINK I KNOW"),
   first published 1923 in "New Hampshire" (public domain). Only unresolved point: punctuation at the end of line 13 (see
   Residual doubts); no word is in doubt.
2. Quotations — Black Beauty: all 4 quotations verbatim (Standard Ebooks); Great Expectations: all 5 quotations in the body and
   the 5 quoted fragments inside the questions verbatim except one comma (fixed below); no invented or unverifiable quotation remains.
3. Parliament text — every statement is supported by the Constitution (see sources); no numbers of seats/senators, no dates and
   no uncertain claim are made. Kept as is.
4. Arabic explanation of poetic devices (alliteration, rhyme, imagery, metre, personification, repetition) — correct apart from
   two slips fixed below ("third line of every stanza departs from the rhyme" is false for stanza 4; "dark and deep" called
   adjacent words).
5. mcq keys — 0 errors, no second correct option; Life Skills content is sensible, culturally fine (no alcohol, pork, romance;
   Jordanian examples) and had no language errors; three typed keys were flawed (fixed).

## Changes — critical (1)
- [critical] extras-g12 g12-life-growth qs[6] (gap "I haven't mastered the subjunctive ____, but I'm getting there.", key "yet") —
  ambiguous key: "fully / completely / properly / perfectly" are equally correct English and would be marked wrong → new stem
  "He hasn't passed his driving test ____, but he is learning from every attempt." (only yet / as yet / so far fit), `a` =
  ["yet","as yet","so far"], x says the other two are accepted.

## Changes — major (2)
- [major] g12-life-food qs[6] (gap less/more) — "…than the ordinary one, so I prefer it." also allows "more" → "…so it is the
  healthier choice."; `a` extended with the normal intensifiers (much less, far less, a lot less, a little less, slightly less).
- [major] g12-life-team qs[6] (gap "find a middle ____") — "middle way / path / course" are equally idiomatic but were rejected →
  `a` = ground, way, path, course; x mentions them.

## Changes — minor (22)
### extras-g11
- [minor] g11-lit-frost, body §5 (rhyme) — "the third line in EVERY stanza departs from the other three" is false for stanza 4
  (sleep rhymes with deep/keep) → "in each of the first three stanzas … in the last stanza all four lines rhyme".
- [minor] g11-lit-frost qs[4] x — "dark and deep" described as two adjacent words (they are separated by "and") → "close
  together (separated by and)".
- [minor] g11-lit-frost, body §2 — "(no farmhouse near)" looked like a quotation but the poem says "without a farmhouse near"
  → exact phrase.
- [minor] g11-life-volunteering qs[4] (gap "keen to get ____ in") — "engaged" (get engaged in) is also correct → added.
- [minor] g11-culture-parliament qs[4] and qs[8], g11-life-resilience qs[3] — the key was 2.1x / 2.2x / 1.9x longer than every
  other option (guessable without reading); distractors lengthened/key shortened, meaning, key position and x unchanged.
### extras-g12
- [minor] g12-lit-greatexpectations, excerpt + body ex #4 — quotation had a comma ("knaves, Jacks") that four of five full-text
  copies do not have ("He calls the knaves Jacks, this boy!") → conformed to the majority text (all other words identical).
- [minor] g12-lit-greatexpectations, table "Setting" — "Victorian England" is inaccurate: the story runs from about 1812 to
  1840 (early–mid 19th century; only the publication is Victorian) → corrected.
- [minor] g12-lit-blackbeauty, warn (colt / filly / foal) — the only English-only `warn` in the two files: no Arabic "why" (schema)
  and, because U.md isolates English only when Arabic is present, the ✗ and ← render in the wrong order on the RTL page → one
  Arabic explanation line added.
- [minor] g12-lit-blackbeauty, table §5 — "be gentle and good" is not Sewell's wording → "grow up gentle and good" (verbatim).
- [minor] g12-lit-blackbeauty qs[4] x — "المهور" (plural of dowry) used for colts → "الأمهار".
- [minor] g12-lit-blackbeauty qs[4], g12-lit-greatexpectations qs[7], g12-life-decision qs[4], g12-life-food qs[3],
  g12-life-growth qs[2], g12-life-team qs[1] — key 1.8–2.1x longer than the distractors (length cue) → options balanced
  (keys, positions and x intact).
- [minor] g12-life-decision, table heads "Cost (×2)", "Learning (×3)", "Fun (×1)", "Who is affected?" — English-only <th>
  strings end in ")" / "?" and are not isolated, so the closing bracket/question mark jumps to the wrong end on the RTL page
  (and in the phone "stacked" labels) → trailing LRM added to the four heads.
- [minor] g12-life-decision, decision-matrix paragraph — never said that a higher score is better, so "Cost 5" could be read as
  "most expensive" → "(الدرجة الأعلى = الأفضل، فالدرجة 5 في معيار التكلفة تعني الأرخص)".
- [minor] g12-life-growth, "yet" paragraph — said yet is used "with the present perfect" although the lesson's own table uses
  "I can't do this yet" → added the negative-present use.
- [minor] g12-culture-seaside qs[7] (gap staycation) — "domestic holiday" is a correct definition-term → added to `a`.

Totals: critical 1, major 2, minor 22 (g11: 0 / 0 / 7; g12: 1 / 2 / 15).

## Checked and left unchanged (verified)
- Frost: poem text, all 16 syllable counts, rhyme tables, metre explanation (tetra = four, iamb = da-DUM, 4 x 2 = 8), imagery and
  device tables (woods occurs 4 times; "Whose" begins with /h/ so it is rightly not offered as alliteration), vocabulary
  (queer flagged as archaic), diary model (97 words), all 10 questions.
- Parliament: text, Arabic paraphrase, tables, vocabulary, reference/"Why does the writer mention" explanations, 10 questions.
- Volunteering, online image, resilience: all English examples/translations, notices A–C, STOP rule, debate scaffolds, Hiba's
  story and its habit table, all err/order/gap/mcq items.
- Seaside (text, timeline, vocabulary, 10 qs), Black Beauty (chapter summary, techniques, vocabulary, 10 qs), humour (text,
  kinds-of-humour table and exercise, expressions, 10 qs), Great Expectations (summary, decay table, figurative-language table —
  "waxwork and skeleton" is an implied comparison, characters, 10 qs), decision, food (label analysis arithmetic), growth, team,
  leadership: facts, definitions, Arabic translations and keys verified.
- English-only `p` blocks (all 16: Parliament x4, seaside x4, humour x3, Black Beauty, Great Expectations, Layla case, team case,
  leadership case — incl. the closing-quote case) end with U+200E after the final punctuation, so the full stop/quote stays at the right end;
  `ex` lines are LTR in the app (.en-line) and table cells are wrapped in span.en, so those are safe.

## Residual doubts
1. Frost line 13: Poetry Foundation, Wikipedia and Owl Eyes print "The woods are lovely, dark and deep," (comma, as in the file);
   two other transcriptions (RPO's 1923 text and Poetry Out Loud) appear to show a full stop, and the Lathem edition adds a
   comma after "dark" (Wikipedia calls that an emendation; Frost intended "lovely, dark and deep" as one phrase).
   Words, rhyme and syllables are unaffected; the file follows the standard current text.
2. Great Expectations punctuation differs between editions ("knaves Jacks" in four copies, "knaves, Jacks" in one; "strong,"
   with comma in most). Kept the majority wording; no wording of any quote is in doubt.
3. APP-LEVEL (not fixable in content): js/views.js V.extra renders `poem` but never `excerpt`, so the Black Beauty / Great
   Expectations `excerpt` fields (109 and 97 words) are invisible. Nothing is lost because the same sentences are shown through
   the body `ex` blocks (each with a 🔊 button), but the field is dead data although validate.js asks for poem/excerpt.
4. APP-LEVEL display: U.md isolates English runs only when the string contains Arabic, so (a) English-only `p` blocks need the
   trailing LRM trick and are right-aligned/ragged-left in the RTL page, (b) English-only `warn` strings render "✗ … ← ✓ …" in the
   wrong visual order, (c) `tableHTML` heads (`<th>${md(x)}`) get no span.en. Scan of data/units: 18 English-only `warn` blocks and
   4 English-only `h` blocks end with punctuation without LRM (g11u2, g11u3, g11u4, g11u8 …) and g12u10 grammar[1].body[2] head[2]
   "+ gerund (V-ing)" has the bracket problem. A one-line renderer fix (always bidiWrap, or dir="auto" on warn/tip/p/h/th) would
   be safer than editing content.
5. Option-length cue remains in a few mcqs where the key is only 1.3–1.7x longer than the distractors (not changed: not wrong,
   and rewriting every item would be a restyle); the ratio is pervasive in LLM-written mcq sets.
6. Great Expectations extract is built around a jilted bride (the stopped clocks/wedding dress); there is no romance, but a
   school that wants zero wedding imagery may prefer another chapter. The "Estella… break his heart" line is quoted verbatim
   because it is the textbook-relevant foreshadowing.
7. Culture text "Jordan's Parliament" calls the body the "National Assembly" (the usual English name of Majlis al-Umma); the
   Constitute English translation says "Parliament" — both are used in the text ("usually called Parliament"), so no change.

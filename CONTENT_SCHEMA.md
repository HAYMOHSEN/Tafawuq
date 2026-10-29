# Tafawuq English — unit content schema

One file per textbook unit: `data/units/g{grade}u{n}.js` (e.g. `g11u3.js`, `g12u7.js`).
The file is plain JavaScript that calls `TAF.unit({...})` once. It must parse as JS
(use double-quoted strings or template literals carefully; escape `"` inside strings).

Audience: Jordanian public-school students in Grade 11 (CEFR ~B1+/B2) and Grade 12 (~B2/C1)
studying the national textbook "Jordan High Note". Explanations are in **Arabic (MSA, simple,
friendly, like a good Jordanian teacher)**; all English content is natural, correct British-leaning English.

## COPYRIGHT — hard rule
Everything must be ORIGINAL. Do not copy or closely paraphrase any reading text, dialogue,
exercise or example sentence from the textbook, workbook or any website. Match the unit's
*topic, grammar and skills*, but write your own passages, sentences and models.
(Public-domain poems published before 1929 may be quoted.)

## Inline markup allowed inside strings
- `**bold**` → bold
- `==text==` → highlighter mark (use for the key form/word in grammar explanations and examples, sparingly: 1 per example)
- Mixed Arabic + English inside one string is fine — the app isolates English runs automatically.
- No HTML tags.

## Top level

```js
TAF.unit({
  id: "g11u1",               // g{grade}u{n}
  grade: 11, sem: 1, n: 1,   // semester 1 or 2; n = unit number as in the book
  title: "Get the message",  // exact book unit title
  ar: "وصلتِ الرسالة",         // short Arabic rendering of the title
  topics: "Arabic one-line summary of the unit's themes",
  goals: ["Arabic learning outcome", ...],          // 4–6
  vocab: [...],      // 28–36 items
  grammar: [...],    // every grammar point of the unit (usually 2–3)
  reading: {...},
  writing: {...},
  speaking: {...},
  test: [...]        // 20 mixed questions = unit test
});
```

## vocab item
```js
{ w: "keep in touch", ar: "يبقى على تواصل", pos: "phrase", def: "to continue to communicate with someone",
  ex: "We still keep in touch by email after all these years.", tag: "collocation" }
```
- `pos`: noun | verb | adjective | adverb | phrasal verb | phrase | idiom | collocation | compound noun ...
- `def`: short learner-dictionary definition in English (≤ 14 words).
- `ex`: ORIGINAL example sentence containing `w` (or its inflected form). ≤ 20 words.
- `tag` (optional): the book's vocabulary group, e.g. "phrasal verbs", "emotions", "idioms".
- Cover the unit's real vocabulary sets (collocations, phrasal verbs, idioms, topic words, word-formation).

## grammar point
```js
{
  id: "g11u1-gr1",
  title: "Present and past tenses",   // English name as students know it
  ar: "مراجعة الأزمنة الحاضرة والماضية",
  body: [                               // ordered blocks
    { p: "Arabic paragraph (may contain English)" },
    { h: "Arabic sub-heading" },
    { table: { head: ["...","..."], rows: [["...","..."], ...] } },
    { ex: [["English example with ==form==", "الترجمة العربية"], ...] },
    { tip: "Arabic tip / memory trick" },
    { warn: "Common mistake: ✗ wrong sentence → ✓ right sentence + Arabic why" }
  ],
  summary: ["One-line rule in Arabic with the key form", ...],   // 3–6 lines (used in the cheat sheet)
  qs: [ ...questions ]                  // 14–18, graded easy → hard, mixed types
}
```
Explanations must be complete enough that a student who missed the lesson can learn it:
form (affirmative/negative/question), uses with time expressions, contrasts with similar forms,
the typical exam traps. Use tables for forms.

## reading
```js
{
  title: "English title",
  text: ["paragraph 1", "paragraph 2", ...],   // ORIGINAL, Grade 11: 300–380 words, Grade 12: 350–450 words, 4–6 paragraphs
  skill: "Identifying the author's opinion",   // the unit's Active Reading skill
  skillAr: "Arabic name of the skill",
  skillTip: "Arabic: how to apply this skill, 2–3 sentences",
  gloss: [["word", "المعنى بالعربية"], ...],    // 12–16 harder words/phrases AS THEY APPEAR in the text (students tap words in the reader)
  gist: ["Arabic main idea of paragraph 1", ...], // REQUIRED: exactly ONE per paragraph (same order/length as `text`), ≤ 90 chars, a clear topic-sentence style summary in Arabic
  tr: ["Arabic translation of paragraph 1", ...], // REQUIRED: exactly ONE per paragraph, faithful, complete, natural MSA (not word-for-word)
  qs: [ ...questions ]                          // 9–11: mcq (main idea, detail, inference, reference 'it/they refers to', purpose),
                                                // tf, find (word meaning), open (with model answer)
}
```

## writing
```js
{
  type: "Analytical essay", ar: "مقالة تحليلية",
  about: "Arabic: what this genre is, register, length, when it's used",
  plan: [ { part: "Introduction", ar: "المقدمة", tip: "Arabic: what goes here" }, ... ],
  phrases: [ { en: "It could be argued that…", ar: "يمكن القول إن…", use: "Arabic: function" }, ... ],  // 12–16
  task: "English exam-style task prompt (original)",
  taskAr: "Arabic explanation of the task",
  words: [150, 200],                 // target word range
  model: ["paragraph 1", ...],       // ORIGINAL model answer for the task, within the word range
  check: ["Arabic checklist item", ...]  // 6–8 self-check items (content, organisation, language, mechanics)
}
```

## speaking (the unit's functional language)
```js
{
  title: "Breaking the ice", ar: "...",
  phrases: [ { en: "...", ar: "...", use: "Arabic function (optional)" }, ... ],   // 10–16
  dialogue: [ ["Lina", "line"], ["Omar", "line"], ... ]                          // ORIGINAL, 6–10 lines, Jordanian names/settings welcome
}
```

## Questions (used in grammar.qs, reading.qs, test)
Every question may have `x` = explanation in Arabic of WHY the answer is right (strongly encouraged
for all; required for grammar and test). In `test`, add `k` = topic key: "vocab", "reading",
"speaking", "writing", or a grammar id like "g11u1-gr2".

| type | fields | notes |
|---|---|---|
| `mcq` | `q`, `o` (3–4 options), `a` (0-based index) | blank = `____` (4 underscores). Exactly one correct option. Vary the position of the answer. |
| `gap` | `q` (contains one `____`, verb in brackets if needed), `a` (array of ALL accepted answers) | Answer is what fills the blank only. Include contracted and full forms. |
| `tf` | `q` (statement), `a` (true/false) | reading only |
| `find` | `q` ("Find a word in paragraph 3 that means …"), `a` (array) | reading only, single word/short phrase |
| `tr` | `q` (original sentence), `p` (instruction, e.g. "Rewrite starting with: Hardly …" or "Use the word given: UNLESS"), `a` (array of full accepted sentences) | Sentence transformation. List 2–4 acceptable variants. |
| `err` | `q` (sentence with ONE wrong word), `w` (the wrong word exactly as written, a single token), `c` (the correction) | Student taps the wrong word. |
| `order` | `a` (the correct sentence, 6–12 words) | App shuffles the words. Only one natural order must be possible. |
| `open` | `q`, `m` (model answer) | Self-marked (reading inference, personal response, short writing). |

Quality bar: answers must be unambiguous and 100% correct; distractors plausible but clearly wrong
to someone who knows the rule; British spelling preferred but don't punish US spelling in `a` arrays
(list both when relevant). Mix types: in each grammar point aim for ~6 mcq, ~4 gap, ~2 tr, ~1–2 err, ~1 order.
The unit `test` (20): ~6 vocab, ~8 grammar (all points), ~2 speaking/functions, ~2 err/tr, ~2 reading-style (short text inside q).

---------------------------------------------------------------------------------------------------
# EXTRAS (Culture Spot / Literature Spot / Life Skills) — `data/extras/<name>.js`
A file may contain several `TAF.extra({...})` calls (no `TAF.unit`). Same inline markup, same question types.

```js
TAF.extra({
  id: "g11-lit-frost",            // unique, kebab-case, prefix g11-/g12-
  grade: 11,
  kind: "literature",             // "literature" | "culture" | "life"
  title: "Stopping by Woods on a Snowy Evening",   // English title as in the book
  ar: "ركن الأدب: ...",            // short Arabic heading
  poem: "line 1\nline 2\n…",      // ONLY for public-domain works (published before 1929) — shown verbatim with a 🔊 button
  poemTitle: "…", poet: "Robert Frost (1923)",
  excerpt: "…",                   // optional: public-domain prose excerpt (≤ 120 words), otherwise paraphrase in `body`
  body: [ {p}, {h}, {ex}, {table}, {tip}, {warn} ... ],   // Arabic explanation: summary, theme, vocabulary, devices, exam angles
  qs: [ ...6–10 questions: mcq / gap / tf / open / order ... ]
})
```
The Ministry exam asks about the Culture Spot (e.g. "why does the writer mention …") and the Literature Spot (e.g.
"how many syllables are in each line", rhyme, imagery, theme), so cover those angles.

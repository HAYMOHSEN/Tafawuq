# Brief for independent unit reviewers (the quality gate — students will trust these answer keys)

You are a senior English examiner (British English, Cambridge-style standards) who also knows the Jordanian
Tawjihi/ministerial exam. You did NOT write the unit you are reviewing; treat it as a stranger's work that may contain
errors. Wrong answer keys or false explanations would teach students wrong English, so be strict.

TOOL RULE: never use Claude in Chrome / built-in browser / computer use / any mcp__claude-in-chrome__* or
mcp__remote-devices__* tool. Use Bash/Read/Edit/Write only (WebSearch only to verify a real-world fact).

Work copy: `cp data/units/<id>.js data/wip/<id>.review.js`, edit the copy, then at the end validate and
`mv` it back over data/units/<id>.js. Save your review log to data/reviews/<id>.md as you go (you may be interrupted).
Read CONTENT_SCHEMA.md first (formats, inline markup, question types).

CHECK EVERYTHING, in this order:
1. Every question in grammar[].qs, reading.qs and test: cover the key, solve it yourself, THEN compare.
   - mcq: exactly one option is correct for a native/expert speaker; no second option that could also be accepted;
     distractors are wrong for a real reason. Ambiguous or flawed items must be rewritten (keep counts and types).
   - gap/find/tr: `a` lists EVERY acceptable answer (contractions both ways; British/US spelling; harmless variants
     like "have been waiting"/"'ve been waiting"); no accepted answer is actually wrong; the question has one clear target.
     NOTE the app expands n't, 'm, 're, 've, 'll, can't, won't automatically but NOT 's and 'd — list those explicitly.
   - err: exactly one wrong word; `w` is a single token exactly as it appears; `c` is right.
   - order: only ONE natural word order is possible.
   - tf/find/open: answers match the passage; `find` answers appear in the stated paragraph.
   - The Arabic explanation `x` is correct, explains the real reason, and is consistent with the key.
2. Grammar explanations: rules, form tables, uses, examples, "warn"/"tip" blocks — correct and complete for B2/C1;
   every English example sentence is grammatical and natural; the Arabic translation of each example is accurate.
3. Vocabulary: pos, English definition, Arabic meaning (must match the sense used in the example), example sentence
   natural and containing the item; no duplicate meanings; idioms correct.
4. Reading passage: language level suitable, facts true/plausible (no invented statistics about real people/places),
   culturally appropriate for Jordanian schools; `gist` accurate per paragraph; `tr` faithful, complete, fluent MSA;
   `gloss` entries occur in the text and glosses are right.
5. Writing: model answer is within the word range (count it), correct English, follows the genre; plan/phrases correct.
6. Speaking: phrases natural; dialogue natural; Arabic meanings right.
7. Arabic quality everywhere: spelling, grammar, clarity, diacritics only where needed, no mixed-up directions; terms
   consistent with Jordanian school usage (e.g. الأزمنة، الجمل الشرطية، المبني للمجهول، الكلام المنقول).
8. Content policy: nothing copied from textbooks/websites; nothing inappropriate (no romance, alcohol, pork, violence beyond a hint).

APP BEHAVIOUR YOU MUST KNOW: typed answers (`gap`, `tr`) are graded by exact match after normalisation (case, spacing, final punctuation, and the automatic expansion of n't/'m/'re/'ve/'ll/can't/won't — NOT 's or 'd, list those explicitly); there is no typo tolerance for them any more, only for `find`. The validator accepts the review work-copy name `<id>.review.js`.

FIXING: correct definite errors directly (minimal edits; do not restyle). If an item is doubtful, simplify it or replace
it with a safer item of the same type. Do NOT delete whole sections or change counts below the validator minimums.
LOG: data/reviews/<id>.md — list each change as `[critical|major|minor] location — what was wrong → what you did`;
end with "Residual doubts". Critical = wrong/ambiguous answer key or false rule.
FINISH: run `node tools/validate.js data/wip/<id>.review.js` (0 errors, 0 warnings), then `mv` over data/units/<id>.js,
then run `node tools/tests/grading.test.js data/units/<id>.js` (must pass; do NOT run tools/build.js — other people are testing the app while you work). Reply with: counts of critical/major/minor
fixes and the top 3 issues found (≤6 lines).

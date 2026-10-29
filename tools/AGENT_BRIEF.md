# Brief for unit-content writers

You are writing ONE unit of content for "Tafawuq English" (تفوّق), an offline study app for Jordanian
public-school students preparing English for Grade 11 / Grade 12 (Tawjihi), aligned with the national
textbook "Jordan High Note". Students are Arabic speakers; the app explains in Arabic and teaches English.

1. Read /home/claude/tafawuq/CONTENT_SCHEMA.md (the format — follow it exactly).
2. Read /home/claude/tafawuq/data/units/g11u1.js — a finished unit. Match its depth, tone and quality
   (Arabic explanations like a clear, warm Jordanian teacher; correct, natural English).
3. Work in /home/claude/tafawuq/data/wip/<id>.js (NOT in data/units — the app bundles that folder, so a half-written
   file there would break the app). You may be interrupted at any moment, so SAVE EARLY AND OFTEN: write the file
   with the metadata + vocab first, then append/Edit in each grammar point, then reading, writing, speaking, test —
   saving after every section. If a wip file for your id already exists when you start, read it and continue from it
   instead of starting over. Touch NO other file except at the very end (step 6).
3b. The reading passage must ALSO include `gist` (one Arabic main-idea line per paragraph), `tr` (faithful Arabic
   translation per paragraph) and 12–16 `gloss` entries — see CONTENT_SCHEMA.md. The app uses them for a
   narrated "story mode" and tap-a-word meanings.
4. Run: node /home/claude/tafawuq/tools/validate.js /home/claude/tafawuq/data/wip/<id>.js
   Fix every ERROR and every warning you reasonably can. Repeat until clean.
5. Then re-read every question you wrote and check the answer key like a strict examiner:
   - exactly one correct mcq option; distractors definitely wrong;
   - gap/tr/find `a` arrays list every reasonable correct answer (contracted + full forms, British/US spelling);
   - err: exactly one error in the sentence and `w` is that word;
   - order: only one natural word order;
   - explanations (x) are correct and actually explain the rule.
   Fix anything doubtful (simplify the item rather than risk an ambiguous key).

6. Only when the validator shows 0 errors AND 0 warnings and you finished the answer-key review (step 5):
   `mv /home/claude/tafawuq/data/wip/<id>.js /home/claude/tafawuq/data/units/<id>.js` and run the validator on the moved file once more.

HARD RULES
- ORIGINAL content only: do not copy or closely paraphrase textbook/workbook/website texts, dialogues,
  exercises or example sentences. Write your own on the unit's topics. (Public-domain classics like
  Dickens may be summarised in your own words.)
- Real-world facts (people, dates, statistics) must be accurate and well established; if unsure, leave
  the specific out or write a clearly generic/fictional example.
- Cover EVERY grammar point listed for your unit, thoroughly (form, uses, contrasts, exam traps).
- Culturally appropriate for Jordanian schools: Jordanian/Arab names and places are welcome; no romance,
  no alcohol/pork, nothing offensive.
- Keep strings free of HTML. Use **bold** and ==highlight== only.
- When done, reply with just: the file path, the validator summary line, and any doubts (≤5 lines).

TOOL RULE (strict): never use Claude in Chrome, the built-in browser, computer use, or any
mcp__claude-in-chrome__* / mcp__remote-devices__* tool — they interrupt the user. Work from your own
knowledge; use WebSearch/WebFetch only if you truly must check a fact.

GRADE 12 ADDENDUM (applies when your unit id starts with g12)
- Level is C1 (Pearson "High Note 5"): richer vocabulary, formal register, subtler grammar contrasts, exam traps at
  Advanced-English level. Reading passages 380–450 words (the validator range is 330–470). Notes for every unit are in
  /home/claude/tafawuq/data/scope.md (read the block for your unit, under "CLEAN BLOCKS — GRADE 12").
- The Grade 12 ministerial "Advanced English" paper is 100% multiple choice (50 items, 2 hours: ~12 items on short
  reading texts incl. literary/poetic ones, then vocabulary, grammar & key-word transformations, functions/register,
  writing conventions such as hedging and the structure of reports/proposals). So make the unit `test` (20 items)
  almost entirely `mcq`, including 3–4 items that embed a short 40–70-word text in the question `q` (use \n inside the
  string) followed by an inference / vocabulary-in-context / attitude question, 3–4 key-word-transformation-style items
  written as mcq ("Which sentence means the same as…?"), and 2–3 function/register/convention items. The grammar
  practice (`qs`) should still mix all types (mcq, gap, tr, err, order).
- Title spelling must match the one given in your task prompt exactly.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An offline, single-file learning app (Vietnamese UI) that prepares beginners for a Selenium Java technical audit. Despite the directory name, there is no TypeScript, Java or real Selenium here. It is plain HTML, CSS and ES5-style JavaScript, and the "simulations" are JavaScript state machines. The Java snippets are illustrative and have never been compiled.

Keep these constraints:
- `index.html` must work when opened from disk with no network: no CDN, remote fonts, external scripts or backend.
- The UI must not imply that real Java or Selenium runs. Undo is a feature of the simulation, not a WebDriver rollback.
- UI and learning content are in Vietnamese; technical terms stay in English.

## Commands

```bash
npm run build        # node source/build.js index.html
npm run test:data    # content and engine checks; needs only Node
npm run test:e2e     # browser checks; needs `npm install` and Google Chrome
node tests/sync-test.js   # progress download/import checks (no npm script); same requirements as e2e
```

There is no linter and no test framework. The tests are plain scripts with no filter for running a single check.

- `index.html` is generated but committed. Edit `source/src/`, never `index.html`, then rebuild and commit both.
- `test:data` reads `source/src/` directly. The two browser scripts load the built `index.html`, so build before running them.
- The browser scripts hardcode Windows paths: the `file:///D:/...` URL and the Chrome executable. `tests/e2e.js` writes its screenshots to the OS temp directory.

## Architecture

### Build

`source/build.js` concatenates the files in `source/src/` in an explicit order and inlines the CSS and JS into `00-shell.html`. There are no modules: all scripts share one global scope, and the filename numbers do **not** give the load order.

- `05-sims-a.js` declares `SIMS` and the helpers `E`, `F` and `BLANK`, which later simulation files use.
- `05c-extra.js` must load after both simulation files: it appends extra steps to existing simulations by `sim.id`. A simulation's full step list can therefore be split between `05-sims-a.js` / `06-sims-b.js` and `05c-extra.js`.
- `04-app.js` loads last and renders on load.

A new source file must be added to the list in `build.js`. If it holds data or engine code, also add it to the separate list in `tests/test-data.js`, which runs those files in a Node `vm` context without a DOM. So data files and `01-core.js` must not touch the DOM.

### Simulation engine

Each entry in `SIMS` is declarative: `code` (Java lines), `init` state, and `steps`. Each step has `t`, `what`, `why`, `how`, `impact`, a `line` index into `code`, a status `st` (`run`/`ok`/`err`/`wait`) and an optional `fx(state)` mutator.

`sbvabBuildSnapshots` (`01-core.js`) computes every state up front by cloning the previous one and applying `fx`. Undo, reset and the timeline only select a stored snapshot. This requires that:
- state is JSON-serializable, because cloning is a JSON round trip;
- `fx` is deterministic and changes only the state passed to it;
- rendering depends only on the snapshot and controller state. The e2e test compares each simulation's `innerHTML` after Undo and timeline jumps with what it was originally.

The "before → after" table comes from `sbvabDiff`, which ignores the bookkeeping keys in `SBVAB_META`. A new bookkeeping field belongs in that list.

### UI (`04-app.js`)

A single IIFE with a hash router (`parse` / `render_page`). Views build HTML strings (escape with `esc`) and replace `#main`. Events are delegated on `document` and dispatched by `data-*` attributes, so a new control needs a branch in `onClick` or the `change`/`input` listeners. A new clickable `data-*` attribute on a non-button element must also be added to the `closest()` selector in `onClick`. Simulations are the exception to full-page rendering: `act()` re-renders only that simulation's section.

### Persistence

Progress is stored in `localStorage` under `sbvab-v1`; the theme is separate, under `sbvab-theme`. Exported files have the shape `{ sbvab: 1, exportedAt, progress }`, and importing replaces progress without merging. A new progress field needs a default in the initial load and in **both** import paths (`handleImportFile` and the `import` branch of `dataAction`). The reset branch builds its own empty object too.

## Curriculum

The scope follows two tables supplied by the owner: the Automation Test skill matrix and the Interview Evaluation sheet. `17-curriculum.js` encodes them as `GROUPS` and `EVAL_ROWS`. Keep new topics within those tables.

Lesson ids are stable because saved progress refers to them. The displayed code (such as `4.3`) comes from the lesson's position in `GROUPS`. Add lessons 21+ with `addLesson` (`11-add-lesson.js`), which also creates their cards, quiz and audit entries and rotates the correct answer position. Eval self-ratings are keyed by the sub-category name.

## Content rules enforced by `test:data`

The expected counts are hardcoded in `tests/test-data.js`:
- 47 lessons; 60 simulations, only for lessons 1–20: per lesson, exactly one `Dễ` and two `Trung bình`, at most 10 steps each (fewer than 5 only prints a `SHORT` warning).
- 141 flashcards and 141 quiz questions (3 of each per lesson). Each quiz question has 4 distinct options and a 4-entry `why` array aligned with them.
- 60 mock audit questions, with every lesson covered.
- Every lesson belongs to exactly one entry in `GROUPS`, and the `EVAL_ROWS` weights total 100.

The test prints the distribution of correct quiz answers across A–D but does not fail on it; keep it balanced (currently 36/35/35/35). "No state diff" notes for observational steps are expected.

## Related docs

- `SOURCE_REFERENCES.md` maps each lesson to official documentation and records whether each page was actually read or only checked for HTTP 200. Update it when lesson `refs` change, and do not link to a documentation homepage.
- `QA_REPORT.md` is a dated record of one test run and lists known limitations. Its statement that the project is not a git repository is out of date.

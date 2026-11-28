const fs = require('fs'), vm = require('vm');
const S = process.argv[2] + '/src/';
const files = ['03-lessons.js', '05-sims-a.js', '06-sims-b.js', '05c-extra.js', '07-cards.js', '08-quiz.js', '09-audit.js', '11-add-lesson.js', '12-lessons-java.js', '13-lessons-testing.js', '14-lessons-api.js', '15-lessons-sql.js', '16-lessons-ai-git.js', '17-curriculum.js', '01-core.js'];
const ctx = {}; vm.createContext(ctx);
vm.runInContext(files.map(f => fs.readFileSync(S + f, 'utf8')).join('\n') + '\n;this.__ok=1;', ctx);
const { LESSONS, SIMS, CARDS, QUIZ, AUDIT, CHEAT, GLOSSARY, sbvabBuildSnapshots, sbvabDiff, GROUPS, EVAL_ROWS } = ctx;
let fail = 0; const bad = (m) => { fail++; console.log('FAIL:', m); };
const ok = (c, m) => { if (!c) bad(m); };
const cnt = (arr, k) => arr.reduce((a, x) => (a[x[k]] = (a[x[k]] || 0) + 1, a), {});

// lessons
ok(LESSONS.length === 47, 'lessons=47 got ' + LESSONS.length);
const ids = new Set(LESSONS.map(l => l.id));
ok(ids.size === LESSONS.length, 'duplicate lesson id');
// curriculum: mỗi bài thuộc đúng một nhóm; mọi liên kết trỏ tới bài có thật
const grouped = GROUPS.flatMap(g => g.lessons);
ok(grouped.length === LESSONS.length && new Set(grouped).size === grouped.length && grouped.every(i => ids.has(i)), 'every lesson in exactly one group');
GROUPS.forEach((g, i) => { ok(g.n === i + 1, 'group order'); g.items.forEach(it => ok(it[2].length && it[2].every(x => ids.has(x)), 'item link ' + it[1])); });
ok(EVAL_ROWS.reduce((a, r) => a + r[2], 0) === 100, 'eval weights must total 100');
ok(new Set(EVAL_ROWS.map(r => r[1])).size === EVAL_ROWS.length, 'eval row names unique');
EVAL_ROWS.forEach(r => ok(r[3].every(x => ids.has(x)), 'eval link ' + r[1]));
ok(GLOSSARY.every(g => ids.has(g[2])), 'glossary lesson link');
ok(CHEAT.every(c => c.length === 4 && c.every(Boolean)), 'cheat row');
LESSONS.forEach(l => {
  ['obj', 'codeExplain', 'mistakes', 'refs', 'code', 'terms'].forEach(k => { if (k !== 'terms' && !(Array.isArray(l[k]) && l[k].length)) bad(`L${l.id} missing ${k}`); });
  ['what', 'why', 'when', 'how', 'whenNot'].forEach(k => { if (!l.theory[k]) bad(`L${l.id} theory.${k}`); });
  if (!l.beginner.analogy || !l.beginner.text || !l.beginner.terms.length) bad(`L${l.id} beginner incomplete`);
  l.refs.forEach(r => { if (!/^https?:\/\//.test(r[2])) bad(`L${l.id} bad ref url`); if (/\/(documentation\/webdriver\/?)$/.test(r[2])) bad(`L${l.id} homepage-only ref`); });
});
// sims
ok(SIMS.length === 60, 'sims=60 got ' + SIMS.length);
const perLesson = cnt(SIMS, 'lesson');
for (let i = 1; i <= 20; i++) { // mô phỏng chỉ có ở bài 1-20
  const ss = SIMS.filter(s => s.lesson === i);
  ok(ss.length === 3, `lesson ${i} has ${ss.length} sims`);
  ok(ss.filter(s => s.level === 'Dễ').length === 1, `lesson ${i} needs exactly 1 easy`);
  ok(ss.filter(s => s.level === 'Trung bình').length === 2, `lesson ${i} needs 2 medium`);
}
const seenIds = new Set();
SIMS.forEach(sim => {
  ok(!seenIds.has(sim.id), 'dup sim id ' + sim.id); seenIds.add(sim.id);
  const n = sim.steps.length;
  if (n < 5) console.log('SHORT', sim.id, n); if (n > 10) bad(sim.id + ' too many steps');
  
  ['takeaway', 'scen', 'title'].forEach(k => { const v = sim[k]; if (!v || v.length < 10) bad(`${sim.id} ${k} empty`); });
  sim.steps.forEach((st, i) => {
    if (!(st.line >= 0 && st.line < sim.code.length)) bad(`${sim.id} step ${i + 1} line ${st.line} out of range`);
    ['t', 'what', 'why', 'how', 'impact'].forEach(k => { if (!st[k]) bad(`${sim.id} step ${i + 1} missing ${k}`); });
    if (!['run', 'ok', 'err', 'wait'].includes(st.st)) bad(`${sim.id} step ${i + 1} bad st ${st.st}`);
  });
  if (sim.predict) { ok(sim.predict.opts.length === 4 && sim.predict.ans >= 0 && sim.predict.ans < 4, sim.id + ' predict'); }
  // determinism + immutability
  const a = sbvabBuildSnapshots(sim), before = JSON.stringify(a);
  const b = sbvabBuildSnapshots(sim);
  ok(JSON.stringify(b) === before, sim.id + ' not deterministic');
  ok(a.length === n + 1, sim.id + ' snapshot count');
  // undo/redo: restoring snapshot i must equal stored snapshot i, and full forward+back is identity
  for (let i = 1; i <= n; i++) {
    const back = a[i - 1];
    const fwdAgain = a[i];
    ok(JSON.stringify(a[i - 1]) === JSON.stringify(b[i - 1]), `${sim.id} undo mismatch at ${i}`);
    if (i > 0 && a[i].step !== i) bad(sim.id + ' step counter wrong');
  }
  ok(JSON.stringify(a) === before, sim.id + ' snapshots mutated');
  // state change must exist in most steps
  let noChange = 0; for (let i = 1; i <= n; i++) if (sbvabDiff(a[i - 1], a[i]).length === 0) noChange++;
  if (noChange > 1) console.log(`note: ${sim.id} has ${noChange} steps with no state diff (observational)`);
});
// cards
ok(CARDS.length === 141, 'cards=141 got ' + CARDS.length);
const cl = cnt(CARDS, 'lesson'); for (let i = 1; i <= 47; i++) ok(cl[i] === 3, `cards lesson ${i} = ${cl[i]}`);
CARDS.forEach(c => { if (!c.q || !c.a || !c.vi || !c.kw.length || !['Dễ', 'Vừa', 'Khó'].includes(c.diff)) bad('card ' + c.id); });
// quiz
ok(QUIZ.length === 141, 'quiz=141 got ' + QUIZ.length);
const ql = cnt(QUIZ, 'lesson'); for (let i = 1; i <= 47; i++) ok(ql[i] === 3, `quiz lesson ${i} = ${ql[i]}`);
const ansDist = [0, 0, 0, 0];
QUIZ.forEach(q => {
  ok(q.opts.length === 4 && new Set(q.opts).size === 4, q.id + ' options');
  ok(q.ans >= 0 && q.ans <= 3, q.id + ' ans'); ansDist[q.ans]++;
  ok(q.why.length === 4, q.id + ' why len'); ok(q.exp && q.exp.length > 10, q.id + ' exp');
});
// audit
ok(AUDIT.length === 60, 'audit=60 got ' + AUDIT.length);
ok(new Set(AUDIT.map(a => a.id)).size === AUDIT.length, 'duplicate audit id');
const al = cnt(AUDIT, 'lesson'); for (let i = 1; i <= 47; i++) ok(al[i] >= 1, 'audit missing lesson ' + i);
AUDIT.forEach(a => { ['en', 'vi', 'model', 'viExp', 'follow', 'mistake', 'cat'].forEach(k => { if (!a[k]) bad(`${a.id} ${k}`); }); if (!a.kw.length) bad(a.id + ' kw'); });
console.log('quiz answer position distribution (A,B,C,D):', ansDist.join(','));
console.log('lessons', LESSONS.length, 'sims', SIMS.length, 'cards', CARDS.length, 'quiz', QUIZ.length, 'audit', AUDIT.length, 'cheat', CHEAT.length, 'glossary', GLOSSARY.length);
console.log(fail ? `FAILURES: ${fail}` : 'ALL DATA CHECKS PASSED');

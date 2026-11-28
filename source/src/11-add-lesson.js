/* ===== Khai báo gọn cho bài 21+ : một object sinh ra bài học, flashcard, quiz và câu audit =====
   quiz : [câu hỏi, đáp án đúng, giải thích, sai1, lý do1, sai2, lý do2, sai3, lý do3]
          Vị trí đáp án đúng được xoay vòng A-D.
   cards: [độ khó, câu hỏi EN, đáp án EN, giải thích VI, 'từ khóa|từ khóa']
   audit: [loại, EN, VI, model answer, giải thích VI, 'từ khóa|từ khóa', câu hỏi tiếp, lỗi thường gặp] */
var QUIZ_ROTATE = 0;
function addLesson(d) {
  LESSONS.push({
    id: d.id, title: d.title, sub: d.sub, obj: d.obj,
    theory: { what: d.theory[0], why: d.theory[1], when: d.theory[2], how: d.theory[3], whenNot: d.theory[4] },
    beginner: { analogy: d.analogy, text: d.text, terms: d.terms },
    code: d.code, codeTitle: d.codeTitle, codeExplain: d.explain, mistakes: d.mistakes, refs: d.refs
  });
  d.cards.forEach(function (c, i) {
    CARDS.push({ id: 'C' + d.id + '-' + (i + 1), lesson: d.id, diff: c[0], q: c[1], a: c[2], vi: c[3], kw: c[4].split('|') });
  });
  d.quiz.forEach(function (q, i) {
    var pos = (QUIZ_ROTATE + Math.floor(QUIZ_ROTATE / 4)) % 4;
    QUIZ_ROTATE++;
    var opts = [q[3], q[5], q[7]], why = [q[4], q[6], q[8]];
    opts.splice(pos, 0, q[1]);
    why.splice(pos, 0, 'Đúng: ' + q[2]);
    QUIZ.push({ id: 'Q' + d.id + '-' + (i + 1), lesson: d.id, q: q[0], opts: opts, ans: pos, exp: q[2], why: why });
  });
  d.audit.forEach(function (a) {
    AUDIT.push({ id: 'A' + (AUDIT.length + 1), lesson: d.id, cat: a[0], en: a[1], vi: a[2], model: a[3], viExp: a[4], kw: a[5].split('|'), follow: a[6], mistake: a[7] });
  });
}

/* ===== APP (DOM / UI) ===== */
(function () {
  'use strict';
  var KEY = 'sbvab-v1';
  var GROUP_OF = {}, CODE_OF = {}, ORDER = [];
  GROUPS.forEach(function (g) {
    g.lessons.forEach(function (l, i) { GROUP_OF[l] = g.n; CODE_OF[l] = g.n + '.' + (i + 1); ORDER.push(l); });
  });

  /* ---------- storage ---------- */
  function loadP() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function saveP() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { /* private mode: keep running */ } }
  var P = loadP();
  P.lessons = P.lessons || {}; P.sims = P.sims || {}; P.flash = P.flash || {}; P.quiz = P.quiz || {};
  P.audit = P.audit || []; P.bm = P.bm || []; P.check = P.check || {}; P.last = P.last || null;
  P.quizSessions = P.quizSessions || []; P.evalr = P.evalr || {};

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function lessonById(id) { return LESSONS.filter(function (l) { return l.id === +id; })[0]; }
  function simsOf(id) { return SIMS.filter(function (s) { return s.lesson === +id; }); }
  function pct(a, b) { return b ? Math.round(100 * a / b) : 0; }

  /* ---------- sidebar ---------- */
  function buildNav(route) {
    var learn = [['#/', 'Dashboard', '⌂']].concat(GROUPS.map(function (g) { return ['#/group/' + g.n, g.title, g.n]; }));
    var review = [['#/eval', 'Đánh giá phỏng vấn', '★'], ['#/flash', 'Flashcards', '▤'], ['#/quiz', 'Quiz', '?'], ['#/audit', 'Mock Audit', '🎙'], ['#/cheat', 'Cheat Sheet', '⇄'], ['#/glossary', 'Glossary', 'A'], ['#/weak', 'Weak Points', '!']];
    var other = [['#/refs', 'References', '§'], ['#/extra', 'Kiến thức bổ sung', '+'], ['#/data', 'Dữ liệu & Cài đặt', '⚙']];
    var html = '<div class="brand">Selenium Java Visual Audit Bootcamp<small>Học offline · Mô phỏng, không chạy Selenium thật</small></div>';
    [['Học theo nhóm kỹ năng', learn], ['Ôn tập', review], ['Khác', other]].forEach(function (grp) {
      html += '<div class="nav-group">' + grp[0] + '</div><nav class="nav" aria-label="' + grp[0] + '">';
      grp[1].forEach(function (it) { html += navLink(it, route); });
      html += '</nav>';
    });
    $('#side').innerHTML = html;
  }
  function navLink(it, route) {
    var cur = route === it[0] ? ' aria-current="page"' : '';
    return '<a href="' + it[0] + '"' + cur + '><span aria-hidden="true">' + it[2] + '</span>' + it[1] + '</a>';
  }

  /* ---------- simulation engine UI ---------- */
  var CTL = {};
  function getCtl(sim) {
    if (!CTL[sim.id]) CTL[sim.id] = { sim: sim, snaps: sbvabBuildSnapshots(sim), idx: 0, speed: 1, playing: false, timer: null, pred: null };
    return CTL[sim.id];
  }
  function stopTimer(c) { if (c.timer) { clearTimeout(c.timer); c.timer = null; } c.playing = false; }
  function stopAll() { Object.keys(CTL).forEach(function (k) { stopTimer(CTL[k]); }); }
  function scheduleTick(c) {
    c.timer = setTimeout(function () {
      c.timer = null;
      if (!c.playing) return;
      var last = c.snaps.length - 1;
      if (c.idx < last) c.idx++;
      if (c.idx >= last) { c.playing = false; P.sims[c.sim.id] = true; saveP(); }
      render(c);
      if (c.playing) scheduleTick(c);
    }, 1200 / c.speed);
  }
  function act(c, a, arg) {
    var last = c.snaps.length - 1;
    if (a === 'play') { stopAll(); if (c.idx < last) { c.playing = true; scheduleTick(c); } }
    else if (a === 'pause') { stopTimer(c); }
    else if (a === 'next') { stopAll(); if (c.idx < last) c.idx++; }
    else if (a === 'prev') { stopAll(); if (c.idx > 0) c.idx--; }
    else if (a === 'reset') { stopAll(); c.idx = 0; }
    else if (a === 'replay') { stopAll(); c.idx = 0; c.playing = true; scheduleTick(c); }
    else if (a === 'goto') { stopAll(); c.idx = Math.max(0, Math.min(last, arg)); }
    else if (a === 'speed') { var was = c.playing; stopAll(); c.speed = arg; if (was && c.idx < last) { c.playing = true; scheduleTick(c); } }
    else if (a === 'pred') { c.pred = arg; }
    if (c.idx === last && a !== 'pred') { P.sims[c.sim.id] = true; saveP(); }
    render(c);
  }
  function stPill(st) {
    var map = { idle: ['gray', '○ Chưa chạy'], run: ['blue', '▶ Đang thực thi'], ok: ['green', '✓ Thành công'], err: ['red', '✗ Lỗi / Exception'], wait: ['yellow', '⏳ Đang chờ'] };
    var m = map[st] || map.idle;
    return '<span class="pill ' + m[0] + '">' + m[1] + '</span>';
  }
  function elHTML(e) {
    var c = 'el ' + (e.c || '');
    return '<div class="' + c.trim() + '"><span class="tg">' + esc(e.tag) + '</span><span>' + esc(e.label) + '</span>' +
      (e.hint ? '<span class="hint">' + esc(e.hint) + '</span>' : '') + '</div>';
  }
  function leftHTML(s) {
    var h = '';
    if (s.clock) {
      var fill = Math.min(100, 100 * s.clock.now / s.clock.max), lim = 100 * s.clock.limit / s.clock.max;
      h += '<div class="clock" aria-label="Đồng hồ mô phỏng"><div class="row"><span class="pill yellow">⏱ ' + esc(s.clock.label) + '</span><span class="muted">Đã trôi: ' + s.clock.now + 's / giới hạn: ' + s.clock.limit + 's</span></div>' +
        '<div class="track"><div class="fill" style="width:' + fill + '%"></div><div class="limit" style="left:' + lim + '%" title="Timeout"></div></div></div>';
    }
    if (s.nodes) {
      h += '<div class="nodes">' + s.nodes.map(function (n, i) {
        return (i ? '<span class="arrow" aria-hidden="true">' + (n.arrow || '→') + '</span>' : '') +
          '<div class="node ' + (n.st || '') + '"><b>' + esc(n.label) + '</b><small>' + esc(n.sub || '') + '</small></div>';
      }).join('') + '</div>';
    }
    if (s.browser) {
      var b = s.browser;
      h += '<div class="browser" role="img" aria-label="Trình duyệt mô phỏng">';
      h += '<div class="bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="url">' + esc(b.url) + '</span><span class="muted">' + esc(b.title || '') + '</span></div>';
      if (b.tabs) h += '<div class="tabstrip">' + b.tabs.map(function (t) { return '<span class="tab' + (t.active ? ' active' : '') + '">' + (t.active ? '● ' : '') + esc(t.title) + '</span>'; }).join('') + '</div>';
      h += '<div class="page">' + (s.dom || []).map(elHTML).join('') + '</div>';
      if (b.ctx && b.ctx !== 'main') h += '<div class="ctx">Ngữ cảnh hiện tại: ' + esc(b.ctx) + ' (driver đang ở trong frame này)</div>';
      else h += '<div class="ctx" style="background:var(--panel2);color:var(--muted)">Ngữ cảnh hiện tại: main document</div>';
      h += '</div>';
    } else if (s.dom) {
      h += '<div class="page" style="border:1px solid var(--border);border-radius:10px;margin-top:8px">' + s.dom.map(elHTML).join('') + '</div>';
    }
    if (s.vars && Object.keys(s.vars).length) {
      h += '<div class="card" style="margin:10px 0 0"><h3 style="margin-top:0">Biến / tham chiếu (Java)</h3><div class="vars">' +
        Object.keys(s.vars).map(function (k) { return '<span class="k">' + esc(k) + '</span><span>' + esc(JSON.stringify(s.vars[k])) + '</span>'; }).join('') + '</div></div>';
    }
    if (s.exc) h += '<div class="exc" role="alert"><b>⚠ Exception:</b> ' + esc(s.exc) + '</div>';
    return h;
  }
  function rightHTML(c) {
    var s = c.snaps[c.idx], sim = c.sim, last = c.snaps.length - 1, h = '';
    h += '<h3 style="margin-top:0">Mã Java minh họa</h3><div class="codepanel" role="region" aria-label="Mã Java">';
    sim.code.forEach(function (ln, i) {
      h += '<div class="' + (i === s.line ? 'cur' : '') + '"><span class="n">' + (i + 1) + '</span><span>' + esc(ln) + '</span></div>';
    });
    h += '</div>';
    h += '<div class="muted" style="margin-top:8px">Lệnh đang chạy:</div><div class="wrap-cmd">' + (s.cmd ? esc(s.cmd) : '— (chưa có lệnh nào được thực thi)') + '</div>';
    h += '<div class="row"><b>Bước hiện tại:</b> ' + esc(s.stepTitle) + '</div>';
    if (c.idx === 0 && sim.predict) {
      h += '<div class="predict"><b>🔮 Dự đoán trước khi chạy</b><p style="margin:4px 0">' + esc(sim.predict.q) + '</p>';
      sim.predict.opts.forEach(function (o, i) {
        h += '<label><input type="radio" name="pred-' + sim.id + '" data-sim="' + sim.id + '" data-act="pred" data-i="' + i + '"' + (c.pred === i ? ' checked' : '') + '> ' + esc(o) + '</label>';
      });
      h += '<div class="muted" style="font-size:.85rem">Bạn có thể chọn hoặc bỏ qua — mô phỏng vẫn chạy bình thường.</div></div>';
    }
    if (c.idx === last) {
      h += '<div class="notice"><b>Kết luận kỹ thuật:</b> ' + esc(sim.takeaway) + '</div>';
      if (sim.predict && c.pred !== null && c.pred !== undefined) {
        var ok = c.pred === sim.predict.ans;
        h += '<div class="notice ' + (ok ? '' : 'warn') + '"><b>' + (ok ? '✓ Dự đoán đúng.' : '✗ Dự đoán chưa đúng.') + '</b> Đáp án: ' + esc(sim.predict.opts[sim.predict.ans]) + '. ' + esc(sim.predict.why) + '</div>';
      }
    }
    return h;
  }
  function prettyPath(p, cur) {
    var m = p.match(/^dom\.(\d+)\.(\w+)$/);
    if (m && cur.dom && cur.dom[+m[1]]) {
      var el = cur.dom[+m[1]], field = { c: 'trạng thái', label: 'nội dung', hint: 'ghi chú', tag: 'loại thẻ' }[m[2]] || m[2];
      return 'Phần tử "' + (el.label || el.tag) + '" · ' + field;
    }
    if (/^vars\./.test(p)) return 'biến ' + p.slice(5);
    if (p === 'browser.url') return 'URL trình duyệt';
    if (p === 'browser.title') return 'tiêu đề trang';
    if (p === 'browser.ctx') return 'ngữ cảnh (frame)';
    if (/^browser\.tabs/.test(p)) return 'danh sách tab';
    if (/^clock\./.test(p)) return 'đồng hồ · ' + p.slice(6);
    return p;
  }
  function diffHTML(prev, cur) {
    var d = sbvabDiff(prev, cur);
    if (!d.length && JSON.stringify(prev.exc) === JSON.stringify(cur.exc)) return '<div class="diff muted">Không có thay đổi trạng thái ở bước này (bước mang tính quan sát / kiểm tra).</div>';
    var rows = d.slice(0, 14).map(function (x) {
      return '<div class="ch">• <b>' + esc(prettyPath(x.path, cur)) + '</b>: ' + esc(JSON.stringify(x.from)) + ' → <b>' + esc(JSON.stringify(x.to)) + '</b></div>';
    });
    if (d.length > 14) rows.push('<div class="muted">… và ' + (d.length - 14) + ' thay đổi khác</div>');
    if (JSON.stringify(prev.exc) !== JSON.stringify(cur.exc)) rows.push('<div class="ch">• exception: ' + esc(prev.exc || 'không có') + ' → <b>' + esc(cur.exc || 'không có') + '</b></div>');
    return '<div class="diff">' + rows.join('') + '</div>';
  }
  function logsHTML(s) {
    return '<div class="logs" aria-label="Nhật ký">' + s.logs.map(function (l) {
      return '<div>[t=' + l.time + 's] ' + esc(l.msg) + '</div>';
    }).join('') + (s.logs.length ? '' : '<div class="muted">Chưa có log.</div>') + '</div>';
  }
  function explainHTML(c) {
    var s = c.snaps[c.idx];
    if (!s.info) return '<p class="muted">Nhấn <b>Bước tiếp theo</b> hoặc <b>Phát</b> để bắt đầu. Mỗi bước sẽ giải thích: WHAT (làm gì), WHY (vì sao), HOW (cách xử lý), STATE CHANGE (thay đổi gì), IMPACT (kết quả).</p>';
    return '<dl>' +
      '<dt>WHAT — Đang làm gì?</dt><dd>' + esc(s.info.what) + '</dd>' +
      '<dt>WHY — Vì sao cần?</dt><dd>' + esc(s.info.why) + '</dd>' +
      '<dt>HOW — Xử lý thế nào?</dt><dd>' + esc(s.info.how) + '</dd>' +
      '<dt>IMPACT — Kết quả / hệ quả</dt><dd>' + esc(s.info.impact) + '</dd></dl>';
  }
  function renderSimInto(c) {
    var s = c.snaps[c.idx], last = c.snaps.length - 1, N = c.sim.steps.length;
    var prev = c.snaps[Math.max(0, c.idx - 1)];
    var h = '';
    h += '<div class="sim-head"><div><span class="pill ' + (c.sim.level === 'Dễ' ? 'green' : 'yellow') + '">' + esc(c.sim.level) + '</span> <span class="pill gray">Bài ' + CODE_OF[c.sim.lesson] + '</span><h3 style="margin-top:6px">' + esc(c.sim.title) + '</h3></div>' +
      '<div class="statusbar"><span class="stepcount" aria-live="polite">Bước ' + c.idx + ' / ' + N + '</span>' + stPill(s.st) + '<span class="pill">⏱ t = ' + s.time + 's (mô phỏng)</span>' + (c.playing ? '<span class="pill blue">Đang tự chạy ' + c.speed + 'x</span>' : '') + '</div></div>';
    h += '<div class="sim-scen"><b>Kịch bản:</b> ' + esc(c.sim.scen) + '</div>';
    h += '<div class="sim-body"><div class="sim-left">' + leftHTML(s) + '</div><div class="sim-right">' + rightHTML(c) + '</div></div>';
    var dis = function (x) { return x ? ' disabled' : ''; };
    var A = function (a, label, extra, x) { return '<button data-sim="' + c.sim.id + '" data-act="' + a + '"' + (extra || '') + dis(x) + '>' + label + '</button>'; };
    h += '<div class="sim-ctrl" role="group" aria-label="Điều khiển mô phỏng">' +
      A('reset', '⏮ Đặt lại', '', c.idx === 0 && !c.playing) +
      A('prev', '⏪ Hoàn tác (Undo)', '', c.idx === 0) +
      (c.playing ? A('pause', '⏸ Tạm dừng', '', false) : A('play', '▶ Phát tự động', '', c.idx === last)) +
      A('next', '⏭ Bước tiếp theo', '', c.idx === last) +
      A('replay', '↻ Phát lại', '', false) +
      '<span class="spacer"></span><label class="muted">Tốc độ <select data-sim="' + c.sim.id + '" data-act="speed" aria-label="Tốc độ">' +
      [0.5, 1, 2].map(function (v) { return '<option value="' + v + '"' + (c.speed === v ? ' selected' : '') + '>' + v + 'x</option>'; }).join('') +
      '</select></label></div>';
    h += '<div class="sim-ctrl" style="border-top:none;padding-top:0"><span class="muted">Dòng thời gian:</span><div class="timeline" role="group" aria-label="Dòng thời gian">' +
      c.snaps.map(function (sn, i) {
        var cls = i === c.idx ? ' aria-current="step"' : (i < c.idx ? ' class="past"' : '');
        return '<button data-sim="' + c.sim.id + '" data-act="goto" data-i="' + i + '"' + cls + ' title="' + (i ? 'Bước ' + i + ': ' + esc(c.sim.steps[i - 1].t) : 'Trạng thái ban đầu') + '">' + i + '</button>';
      }).join('') + '</div></div>';
    h += '<div class="sim-foot"><div><h4>Trước → Sau (STATE CHANGE)</h4>' + diffHTML(prev, s) + '</div><div><h4>Nhật ký thực thi</h4>' + logsHTML(s) + '</div></div>';
    h += '<div class="sim-explain">' + explainHTML(c) + '</div>';
    h += '<div class="sim-explain muted" style="font-size:.85rem"><b>Lưu ý:</b> Đây là mô phỏng bằng JavaScript. Mã Java chỉ để minh họa; không có Selenium hay Java thật nào được chạy. Hoàn tác (Undo) là tính năng của mô phỏng, không phải thao tác rollback của WebDriver.</div>';
    var box = document.getElementById('sim-' + c.sim.id);
    if (box) box.innerHTML = h;
  }
  function render(c) { renderSimInto(c); }
  function simShell(sim) { return '<section class="sim" id="sim-' + sim.id + '" aria-label="Mô phỏng ' + esc(sim.title) + '"></section>'; }

  /* ---------- lesson page ---------- */
  function refsHTML(refs) {
    return '<ul>' + refs.map(function (r) {
      return '<li><b>' + esc(r[0]) + '</b> — ' + esc(r[1]) + '<br><a href="' + esc(r[2]) + '" target="_blank" rel="noopener">' + esc(r[2]) + '</a></li>';
    }).join('') + '</ul>';
  }
  function lessonView(id) {
    var L = lessonById(id);
    if (!L) return '<p>Không tìm thấy bài học.</p>';
    P.last = '#/lesson/' + id; saveP();
    var sims = simsOf(id);
    var h = '<div class="lesson-head"><span class="pill blue">' + esc(GROUPS[GROUP_OF[L.id] - 1].title) + '</span> <span class="pill gray">Bài ' + CODE_OF[L.id] + '</span><h1>' + esc(L.title) + '</h1><p class="muted">' + esc(L.sub) + '</p></div>';
    h += '<div class="notice">Ví dụ code, lệnh và kết quả bên dưới chỉ để đọc hiểu; ứng dụng <b>không chạy</b> Java, Selenium, SQL, API hay công cụ AI thật. Mô phỏng (nếu có) viết bằng JavaScript.</div>';
    var letter = 'ABCDEFGHI', li = 0;
    function sec(title) { return letter.charAt(li++) + '. ' + title; }
    h += '<div class="card"><h2>Mục tiêu học</h2><ul>' + L.obj.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul>';
    h += '<button data-lesson-done="' + id + '" class="' + (P.lessons[id] ? 'primary' : '') + '">' + (P.lessons[id] ? '✓ Đã đánh dấu hoàn thành' : 'Đánh dấu đã học xong') + '</button> ';
    h += '<button data-bm="' + id + '">' + (P.bm.indexOf(id) >= 0 ? '★ Đã ghim' : '☆ Ghim bài này') + '</button></div>';
    h += '<section class="card"><h2>' + sec('Lý thuyết') + '</h2><dl class="kv">' +
      '<dt>Đây là gì?</dt><dd>' + esc(L.theory.what) + '</dd>' +
      '<dt>Vì sao cần?</dt><dd>' + esc(L.theory.why) + '</dd>' +
      '<dt>Khi nào nên dùng?</dt><dd>' + esc(L.theory.when) + '</dd>' +
      '<dt>Hoạt động thế nào?</dt><dd>' + esc(L.theory.how) + '</dd>' +
      '<dt>Khi nào KHÔNG nên dùng?</dt><dd>' + esc(L.theory.whenNot) + '</dd></dl></section>';
    h += '<section class="card"><h2>' + sec('Giải thích cho người mới') + '</h2><p><b>Ví dụ đời thường:</b> ' + esc(L.beginner.analogy) + '</p><p>' + esc(L.beginner.text) + '</p>' +
      '<h3>Thuật ngữ cần biết trước</h3><table><tr><th>Thuật ngữ</th><th>Nghĩa đơn giản</th></tr>' +
      L.beginner.terms.map(function (t) { return '<tr><td><b>' + esc(t[0]) + '</b></td><td>' + esc(t[1]) + '</td></tr>'; }).join('') + '</table></section>';
    h += '<section class="card"><h2>' + sec(esc(L.codeTitle || 'Ví dụ Java (minh họa)')) + '</h2><div class="codebox"><pre style="margin:0">' + L.code.map(function (ln, i) { return '<span class="ln">' + (i + 1) + '</span>' + esc(ln); }).join('\n') + '</pre></div>' +
      '<h3>Giải thích từng dòng quan trọng</h3>' + L.codeExplain.map(function (x) {
        return '<div class="explain-row"><code>' + esc(x[0]) + '</code><div>' + esc(x[1]) + '</div></div>';
      }).join('') + '</section>';
    if (sims.length) h += '<section class="card"><h2>' + sec('Mô phỏng tương tác (' + sims.length + ' ví dụ)') + '</h2><p class="muted">Ví dụ 1 là mức Dễ; ví dụ 2 và 3 là mức Trung bình. Bạn có thể dự đoán trước, rồi phát mô phỏng để kiểm tra.</p>' +
      sims.map(function (s) { return simShell(s); }).join('') + '</section>';
    h += '<section class="card"><h2>' + sec('Lỗi thường gặp') + '</h2><table><tr><th>Hiểu sai / dùng sai</th><th>Cách đúng</th></tr>' +
      L.mistakes.map(function (m) { return '<tr><td>' + esc(m[0]) + '</td><td>' + esc(m[1]) + '</td></tr>'; }).join('') + '</table></section>';
    var aud = AUDIT.filter(function (a) { return a.lesson === +id; });
    h += '<section class="card"><h2>' + sec('Câu hỏi phỏng vấn / audit') + '</h2>' + aud.map(function (a) {
      return '<details><summary>[' + esc(a.cat) + '] ' + esc(a.en) + '</summary><p><i>' + esc(a.vi) + '</i></p><p><b>Gợi ý trả lời (EN):</b> ' + esc(a.model) + '</p><p><b>Giải thích (VI):</b> ' + esc(a.viExp) + '</p><p><b>Từ khóa:</b> ' + a.kw.map(function (k) { return '<span class="kw">' + esc(k) + '</span>'; }).join('') + '</p><p><b>Câu hỏi tiếp theo:</b> ' + esc(a.follow) + '</p><p><b>Trả lời sai thường gặp:</b> ' + esc(a.mistake) + '</p></details>';
    }).join('') + '<p class="muted">Luyện đầy đủ trong <a href="#/audit">Mock Audit</a>.</p></section>';
    var cards = CARDS.filter(function (c) { return c.lesson === +id; });
    h += '<section class="card"><h2>' + sec('Flashcards của bài này') + '</h2>' + cards.map(function (c) {
      return '<details><summary>' + esc(c.q) + '</summary><p><b>EN:</b> ' + esc(c.a) + '</p><p><b>VI:</b> ' + esc(c.vi) + '</p></details>';
    }).join('') + '<p><a href="#/flash">Ôn tất cả thẻ →</a></p></section>';
    var qs = QUIZ.filter(function (q) { return q.lesson === +id; });
    h += '<section class="card"><h2>' + sec('Mini quiz (' + qs.length + ' câu)') + '</h2><p class="muted">Làm bài tương tác tại <a href="#/quiz">Quiz</a>. Dưới đây là danh sách câu hỏi:</p><ol>' + qs.map(function (q) { return '<li>' + esc(q.q) + '</li>'; }).join('') + '</ol></section>';
    h += '<section class="card"><h2>' + sec('Tài liệu chính thức') + '</h2>' + refsHTML(L.refs) + '<p class="muted">Xác minh ngày: ' + esc(REF_VERIFIED) + '. Chi tiết trong SOURCE_REFERENCES.md.</p></section>';
    var at = ORDER.indexOf(+id), prevL = lessonById(ORDER[at - 1]), nextL = lessonById(ORDER[at + 1]);
    h += '<div class="row" style="justify-content:space-between">' + (prevL ? '<a href="#/lesson/' + prevL.id + '">← ' + esc(prevL.title) + '</a>' : '<span></span>') + (nextL ? '<a href="#/lesson/' + nextL.id + '">' + esc(nextL.title) + ' →</a>' : '<span></span>') + '</div>';
    return h;
  }
  function mountSims(id) {
    simsOf(id).forEach(function (s) { render(getCtl(s)); });
  }

  /* ---------- day pages & dashboard ---------- */
  function lessonDone(id) { return !!P.lessons[id]; }
  function dashboard() {
    var done = LESSONS.filter(function (l) { return lessonDone(l.id); }).length;
    var simsDone = SIMS.filter(function (s) { return P.sims[s.id]; }).length;
    var known = CARDS.filter(function (c) { return P.flash[c.id] && P.flash[c.id].r === 'known'; }).length;
    var answered = Object.keys(P.quiz).filter(function (k) { return P.quiz[k].n > 0; });
    var correct = answered.filter(function (k) { return P.quiz[k].c; }).length;
    var h = '<h1>Selenium Java Visual Audit Bootcamp</h1><p class="muted">Ôn theo 6 nhóm kỹ năng, cùng Git và phỏng vấn. Tiến độ được lưu trong trình duyệt này (localStorage).</p>';
    h += '<div class="row" style="margin:12px 0"><a class="pill blue" href="' + (P.last && P.last.indexOf('#/lesson/') === 0 ? P.last : '#/group/1') + '" style="text-decoration:none">▶ Tiếp tục học</a>' +
      (P.bm.length ? '<span class="muted">Đã ghim: ' + P.bm.map(function (b) { var l = lessonById(b); return l ? '<a href="#/lesson/' + b + '">' + esc(l.title) + '</a>' : ''; }).join(', ') + '</span>' : '') + '</div>';
    h += '<div class="card"><h3 style="margin-top:0">Đồng bộ giữa các thiết bị</h3>' +
      '<p class="muted">Tiến độ chỉ lưu trên trình duyệt này. Để học tiếp trên máy khác: tải file ở máy này, rồi nhập file đó ở máy kia.</p>' +
      '<div class="row"><button class="primary" data-data="download">⬇ Tải file tiến độ</button><button data-data="pick">⬆ Nhập file tiến độ</button>' +
      '<input type="file" id="importfile" accept=".json,application/json" class="hidden" aria-label="Chọn file tiến độ"></div>' +
      '<p class="muted" style="margin-bottom:0">Lần tải file gần nhất: ' + (P.lastExport ? esc(new Date(P.lastExport).toLocaleString('vi-VN')) : 'chưa có — hãy tải file sau mỗi buổi học') + '</p></div>' +
      '<div class="kpis">' +
      '<div class="kpi">Bài đã học<b>' + done + ' / ' + LESSONS.length + '</b><div class="progress"><span style="width:' + pct(done, LESSONS.length) + '%"></span></div></div>' +
      '<div class="kpi">Mô phỏng đã xem đến cuối<b>' + simsDone + ' / ' + SIMS.length + '</b><div class="progress"><span style="width:' + pct(simsDone, SIMS.length) + '%"></span></div></div>' +
      '<div class="kpi">Flashcard "Đã nhớ"<b>' + known + ' / ' + CARDS.length + '</b><div class="progress"><span style="width:' + pct(known, CARDS.length) + '%"></span></div></div>' +
      '<div class="kpi">Độ chính xác Quiz<b>' + (answered.length ? pct(correct, answered.length) + '%' : 'Chưa có') + '</b><span class="muted">' + correct + '/' + answered.length + ' câu đã làm</span></div></div>';
    h += '<div class="card" style="margin-top:16px"><h3 style="margin-top:0">Mức sẵn sàng phỏng vấn (tự đánh giá theo tỷ trọng)</h3><p><b>' + evalScore() + '%</b> — <a href="#/eval">Mở bảng đánh giá →</a></p></div>';
    h += '<h2 style="margin-top:20px">Lộ trình theo nhóm kỹ năng</h2><div class="roadmap">';
    GROUPS.forEach(function (g) {
      var dn = g.lessons.filter(lessonDone).length;
      h += '<div class="day"><h3 style="margin-top:0"><a href="#/group/' + g.n + '">' + g.n + '. ' + esc(g.title) + '</a></h3><div class="muted">' + dn + '/' + g.lessons.length + ' bài hoàn thành</div>';
      h += '<div class="progress" style="margin:6px 0"><span style="width:' + pct(dn, g.lessons.length) + '%"></span></div>';
      h += g.lessons.map(function (l) { return '<div><a href="#/lesson/' + l + '">' + (lessonDone(l) ? '✓ ' : '○ ') + CODE_OF[l] + ' ' + esc(lessonById(l).title) + '</a></div>'; }).join('') + '</div>';
    });
    h += '</div>';
    var mins = (LESSONS.length - done) * 45 + (SIMS.length - simsDone) * 3 + (CARDS.length - known) * 0.5;
    h += '<div class="card"><h3 style="margin-top:0">Ước tính thời gian còn lại</h3><p>Khoảng <b>' + Math.max(0, Math.round(mins / 60 * 10) / 10) + ' giờ</b> (ước tính thô: 45 phút/bài chưa học, 3 phút/mô phỏng chưa xem, 30 giây/thẻ chưa nhớ).</p></div>';
    var today = new Date().toISOString().slice(0, 10);
    var items = [['sim', 'Học xong 1 bài (xem mô phỏng nếu bài có)'], ['card', 'Ôn 10 flashcard'], ['quiz', 'Làm 1 bộ quiz'], ['audit', 'Trả lời 3 câu Mock Audit và tự đánh giá']];
    h += '<div class="card checklist"><h3 style="margin-top:0">Checklist hôm nay (' + today + ')</h3>' + items.map(function (it) {
      var key = today + ':' + it[0];
      return '<label><input type="checkbox" data-check="' + key + '"' + (P.check[key] ? ' checked' : '') + '> ' + esc(it[1]) + '</label>';
    }).join('') + '</div>';
    var weak = weakTopics().slice(0, 3);
    h += '<div class="card"><h3 style="margin-top:0">Chủ đề yếu (dựa trên quiz và tự đánh giá)</h3>' + (weak.length ? weak.map(function (w) {
      return '<div>• <a href="#/lesson/' + w.id + '">' + esc(w.title) + '</a> — ' + w.reason + '</div>';
    }).join('') : '<p class="muted">Chưa có dữ liệu. Làm Quiz hoặc Mock Audit để hệ thống phân tích.</p>') + '</div>';
    return h;
  }
  function weakTopics() {
    var score = {};
    function add(l, v, why) { if (!l) return; score[l] = score[l] || { id: l, v: 0, why: [] }; score[l].v += v; if (why) score[l].why.push(why); }
    QUIZ.forEach(function (q) { var r = P.quiz[q.id]; if (r && r.n > 0 && !r.c) add(q.lesson, 2, 'sai quiz'); });
    P.audit.forEach(function (a) { if (a.self === 1) add(a.lesson, 2, 'tự đánh giá "chưa trả lời được"'); if (a.self === 2) add(a.lesson, 1, 'tự đánh giá "một phần"'); });
    CARDS.forEach(function (c) { var r = P.flash[c.id]; if (r && r.r === 'forgot') add(c.lesson, 1, 'thẻ "Chưa nhớ"'); });
    return Object.keys(score).map(function (k) {
      var s = score[k], L = lessonById(s.id);
      return { id: s.id, title: L.title, v: s.v, reason: esc(s.why.slice(0, 3).join(', ')) };
    }).filter(function (x) { return x.v > 0; }).sort(function (a, b) { return b.v - a.v; });
  }

  function lessonLink(id) { return '<a href="#/lesson/' + id + '" title="' + esc(lessonById(id).title) + '">' + CODE_OF[id] + '</a>'; }
  function groupView(n) {
    var g = GROUPS[n - 1];
    if (!g) return '<p>Không có nhóm này.</p>';
    return '<h1>' + g.n + '. ' + esc(g.title) + '</h1>' +
      '<div class="card"><h3 style="margin-top:0">Yêu cầu kỹ năng → bài đáp ứng</h3><table><tr><th>Nhóm con</th><th>Yêu cầu</th><th>Bài</th></tr>' + g.items.map(function (it) {
        return '<tr><td>' + esc(it[0]) + '</td><td>' + esc(it[1]) + '</td><td>' + it[2].map(lessonLink).join(', ') + '</td></tr>';
      }).join('') + '</table></div>' +
      '<table><tr><th>Bài</th><th>Tên bài</th><th>Mô phỏng</th><th>Trạng thái</th></tr>' + g.lessons.map(function (l) {
        var L = lessonById(l), total = simsOf(l).length, done = simsOf(l).filter(function (s) { return P.sims[s.id]; }).length;
        return '<tr><td>' + CODE_OF[l] + '</td><td><a href="#/lesson/' + l + '">' + esc(L.title) + '</a></td><td>' + (total ? done + '/' + total + ' đã xem đến cuối' : 'Không có mô phỏng') + '</td><td>' + (lessonDone(l) ? '✓ Đã học xong' : '○ Chưa đánh dấu') + '</td></tr>';
      }).join('') + '</table>';
  }

  /* ---------- interview evaluation ---------- */
  var EVAL_LEVELS = ['0 — Chưa biết', '1 — Biết sơ', '2 — Hiểu cơ bản', '3 — Trả lời tốt', '4 — Giải thích kèm ví dụ'];
  function evalScore() {
    var sum = EVAL_ROWS.reduce(function (a, r) { return a + r[2] * (+P.evalr[r[1]] || 0) / 4; }, 0);
    return Math.round(sum * 10) / 10;
  }
  function evalView() {
    var h = '<h1>Đánh giá phỏng vấn</h1><p class="muted">Tỷ trọng lấy theo bảng Interview Evaluation. Điểm dưới đây là <b>bạn tự đánh giá</b> để chọn chỗ cần ôn, không phải kết quả chấm thật.</p>';
    h += '<div class="card"><h3 style="margin-top:0">Mức sẵn sàng: ' + evalScore() + '%</h3><div class="progress"><span style="width:' + evalScore() + '%"></span></div></div>';
    h += '<table><tr><th>Category</th><th>Sub-category</th><th>Rate</th><th>Bài ôn</th><th>Đã học</th><th>Tự đánh giá</th></tr>' + EVAL_ROWS.map(function (r) {
      var v = +P.evalr[r[1]] || 0;
      return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td><td style="white-space:nowrap">' + r[2] + '%</td><td>' + r[3].map(lessonLink).join(', ') + '</td><td>' + r[3].filter(lessonDone).length + '/' + r[3].length + '</td><td><select data-eval="' + esc(r[1]) + '" style="min-width:15em" aria-label="Tự đánh giá ' + esc(r[1]) + '">' +
        EVAL_LEVELS.map(function (t, i) { return '<option value="' + i + '"' + (v === i ? ' selected' : '') + '>' + t + '</option>'; }).join('') + '</select></td></tr>';
    }).join('') + '</table>';
    var gaps = EVAL_ROWS.map(function (r) { return { name: r[1], lost: r[2] * (4 - (+P.evalr[r[1]] || 0)) / 4, ids: r[3] }; })
      .filter(function (x) { return x.lost > 0; }).sort(function (a, b) { return b.lost - a.lost; }).slice(0, 5);
    if (gaps.length) h += '<div class="card"><h3 style="margin-top:0">Nên ôn trước (còn thiếu nhiều điểm nhất)</h3><ol>' + gaps.map(function (x) {
      return '<li>' + esc(x.name) + ' — còn thiếu ' + (Math.round(x.lost * 10) / 10) + '% · ' + x.ids.slice(0, 6).map(lessonLink).join(', ') + '</li>';
    }).join('') + '</ol></div>';
    return h;
  }

  /* ---------- flashcards ---------- */
  var FC = { list: [], i: 0, flipped: false, filter: { group: 'all', diff: 'all', mode: 'all' } };
  function cardState(c) { return P.flash[c.id] || { r: 'new', h: [], due: 0, bm: false, wrong: 0, streak: 0 }; }
  function cardPriority(c) { var s = cardState(c); return (s.wrong * 2) + (s.r === 'forgot' ? 3 : s.r === 'unsure' ? 2 : s.r === 'new' ? 1 : 0); }
  function buildFC() {
    var f = FC.filter, now = Date.now();
    var list = CARDS.filter(function (c) {
      if (f.group !== 'all' && GROUP_OF[c.lesson] !== +f.group) return false;
      if (f.diff !== 'all' && c.diff !== f.diff) return false;
      var s = cardState(c);
      if (f.mode === 'due' && !(s.due <= now && s.r !== 'new')) return false;
      if (f.mode === 'wrong' && !(s.wrong > 0 || s.r === 'forgot' || s.r === 'unsure')) return false;
      if (f.mode === 'bm' && !s.bm) return false;
      return true;
    });
    list.sort(function (a, b) { return cardPriority(b) - cardPriority(a) || a.id.localeCompare(b.id); });
    FC.list = list; FC.i = 0; FC.flipped = false;
  }
  function shuffleFC() { for (var i = FC.list.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = FC.list[i]; FC.list[i] = FC.list[j]; FC.list[j] = t; } FC.i = 0; FC.flipped = false; }
  function rateCard(c, r) {
    var s = cardState(c), now = Date.now(), DAY = 86400000;
    var h = s.h.concat([{ t: now, r: r }]).slice(-20);
    var wrong = s.wrong + (r === 'forgot' ? 1 : 0), streak = r === 'known' ? s.streak + 1 : 0;
    var due = r === 'forgot' ? now : r === 'unsure' ? now + DAY : now + DAY * [1, 2, 4, 7][Math.min(3, streak - 1 < 0 ? 0 : streak - 1)];
    P.flash[c.id] = { r: r, h: h, due: due, bm: s.bm, wrong: wrong, streak: streak };
    saveP();
  }
  function fcView() {
    if (!FC.list.length) buildFC();
    var f = FC.filter;
    var h = '<h1>Flashcards</h1><p class="muted">Lật thẻ để xem đáp án. Tự đánh giá: <b>Chưa nhớ</b> (sẽ hiện lại trong phiên này), <b>Chưa chắc</b> (ôn lại sau 1 ngày), <b>Đã nhớ</b> (khoảng cách tăng dần: 1, 2, 4, 7 ngày).</p>';
    h += '<div class="card row"><label>Nhóm <select data-fcf="group"><option value="all">Tất cả</option>' + GROUPS.map(function (g) { return '<option value="' + g.n + '"' + (f.group === String(g.n) ? ' selected' : '') + '>' + esc(g.title) + '</option>'; }).join('') + '</select></label>' +
      '<label>Độ khó <select data-fcf="diff">' + ['all', 'Dễ', 'Vừa', 'Khó'].map(function (v) { return '<option value="' + v + '"' + (f.diff === v ? ' selected' : '') + '>' + (v === 'all' ? 'Tất cả' : v) + '</option>'; }).join('') + '</select></label>' +
      '<label>Chế độ <select data-fcf="mode">' + [['all', 'Tất cả'], ['due', 'Đến hạn ôn'], ['wrong', 'Thẻ đã sai / khó'], ['bm', 'Đã ghim']].map(function (v) { return '<option value="' + v[0] + '"' + (f.mode === v[0] ? ' selected' : '') + '>' + v[1] + '</option>'; }).join('') + '</select></label>' +
      '<button data-fca="apply">Áp dụng bộ lọc</button><button data-fca="shuffle">🔀 Xáo trộn</button></div>';
    if (!FC.list.length) return h + '<div class="card"><p>Không có thẻ nào khớp bộ lọc. Hãy đổi chế độ.</p></div>';
    if (FC.i >= FC.list.length) FC.i = 0;
    var c = FC.list[FC.i], s = cardState(c), L = lessonById(c.lesson);
    h += '<div class="statusbar"><span class="pill">Thẻ ' + (FC.i + 1) + ' / ' + FC.list.length + '</span><span class="pill ' + (c.diff === 'Khó' ? 'red' : c.diff === 'Vừa' ? 'yellow' : 'green') + '">Độ khó: ' + c.diff + '</span>' +
      '<span class="pill gray">Trạng thái: ' + ({ new: 'Mới', forgot: 'Chưa nhớ', unsure: 'Chưa chắc', known: 'Đã nhớ' })[s.r] + '</span>' +
      '<a class="pill blue" href="#/lesson/' + c.lesson + '">Bài ' + CODE_OF[c.lesson] + ': ' + esc(L.title) + '</a></div>';
    h += '<div class="fc-wrap"><div class="fc' + (FC.flipped ? ' flipped' : '') + '" data-fc="flip" role="button" tabindex="0" aria-label="Lật thẻ" aria-pressed="' + FC.flipped + '">' +
      '<div class="fc-face"><span class="muted">Câu hỏi (EN)</span><h3>' + esc(c.q) + '</h3><span class="muted">Chạm để lật thẻ</span></div>' +
      '<div class="fc-face fc-back"><span class="muted">Đáp án mẫu (EN)</span><p><b>' + esc(c.a) + '</b></p><span class="muted">Giải thích (VI)</span><p>' + esc(c.vi) + '</p>' +
      '<p>' + c.kw.map(function (k) { return '<span class="kw">' + esc(k) + '</span>'; }).join('') + '</p></div></div></div>';
    h += '<div class="rate"><button data-fca="prev">← Thẻ trước</button><button data-fca="flip">Lật thẻ</button><button data-fca="next">Thẻ sau →</button>' +
      '<button data-fca="bm">' + (s.bm ? '★ Bỏ ghim' : '☆ Ghim thẻ') + '</button></div>';
    h += '<div class="rate"><button data-fca="rate" data-r="forgot">✗ Chưa nhớ</button><button data-fca="rate" data-r="unsure">? Chưa chắc</button><button data-fca="rate" data-r="known">✓ Đã nhớ</button></div>';
    h += '<p class="muted" style="text-align:center">Lịch sử: ' + (s.h.length ? s.h.map(function (x) { return ({ forgot: 'Chưa nhớ', unsure: 'Chưa chắc', known: 'Đã nhớ' })[x.r]; }).join(' → ') : 'chưa đánh giá') + ' · Số lần sai: ' + s.wrong + '</p>';
    h += '<p class="muted" style="text-align:center">Mẹo: nhấn nút Chưa nhớ khi bạn không trả lời được trong 5 giây.</p>';
    return h;
  }

  /* ---------- quiz ---------- */
  var QZ = { set: [], answers: {}, submitted: false, perm: {}, mode: 'lesson', arg: '1' };
  function permFor(q) { if (!QZ.perm[q.id]) { var p = [0, 1, 2, 3]; for (var i = 3; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = p[i]; p[i] = p[j]; p[j] = t; } QZ.perm[q.id] = p; } return QZ.perm[q.id]; }
  function pickQuiz(mode, arg) {
    var set;
    if (mode === 'lesson') set = QUIZ.filter(function (q) { return q.lesson === +arg; });
    else if (mode === 'group') set = QUIZ.filter(function (q) { return GROUP_OF[q.lesson] === +arg; });
    else if (mode === 'random') { set = QUIZ.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 10); }
    else if (mode === 'wrong') set = QUIZ.filter(function (q) { var r = P.quiz[q.id]; return r && r.n > 0 && !r.c; });
    else set = QUIZ.slice();
    QZ.set = set; QZ.answers = {}; QZ.submitted = false; QZ.perm = {}; QZ.mode = mode; QZ.arg = arg;
  }
  function qzArgOptions(mode, arg) {
    var list = mode === 'group'
      ? GROUPS.map(function (g) { return [g.n, g.title]; })
      : ORDER.map(function (id) { return [id, CODE_OF[id] + ' ' + lessonById(id).title]; });
    return list.map(function (o) { return '<option value="' + o[0] + '"' + (String(arg) === String(o[0]) ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('');
  }
  function quizView() {
    var h = '<h1>Quiz</h1><p class="muted">Mỗi câu có 4 đáp án. Đáp án chỉ hiện sau khi bạn bấm <b>Nộp bài</b>. Thứ tự đáp án được xáo trộn.</p>';
    h += '<div class="card row"><label>Chọn bộ câu <select data-qz="mode">' + [['lesson', 'Theo bài'], ['group', 'Theo nhóm kỹ năng'], ['random', 'Ngẫu nhiên 10 câu'], ['wrong', 'Ôn câu đã sai'], ['all', 'Toàn bộ']].map(function (m) { return '<option value="' + m[0] + '"' + (QZ.mode === m[0] ? ' selected' : '') + '>' + m[1] + '</option>'; }).join('') + '</select></label>' +
      '<label>Giá trị <select data-qz="arg">' + qzArgOptions(QZ.mode, QZ.arg) + '</select></label>' +
      '<button data-qz="start" class="primary">Bắt đầu bộ câu</button></div>';
    if (!QZ.set.length) { pickQuiz(QZ.mode, QZ.arg); }
    if (!QZ.set.length) return h + '<div class="card"><p>Chưa có câu sai nào để ôn. Hãy làm một bộ quiz trước.</p></div>';
    var score = 0;
    h += '<form id="quizform">';
    QZ.set.forEach(function (q, qi) {
      var perm = permFor(q), sel = QZ.answers[q.id];
      h += '<div class="card"><h3 style="margin-top:0">Câu ' + (qi + 1) + '. ' + esc(q.q) + '</h3><p class="muted" style="font-size:.85rem">Bài ' + CODE_OF[q.lesson] + ' · ' + esc(GROUPS[GROUP_OF[q.lesson] - 1].title) + (q.ref ? ' · Tham chiếu: ' + esc(q.ref) : '') + '</p>';
      perm.forEach(function (oi, di) {
        var cls = '';
        if (QZ.submitted) cls = oi === q.ans ? ' right' : (sel === oi ? ' wrong' : '');
        h += '<label class="opt' + cls + '"><input type="radio" name="q' + q.id + '" value="' + oi + '" data-qz="pick" data-q="' + q.id + '"' + (sel === oi ? ' checked' : '') + (QZ.submitted ? ' disabled' : '') + '> <span><b>' + String.fromCharCode(65 + di) + '.</b> ' + esc(q.opts[oi]) + '</span></label>';
      });
      if (QZ.submitted) {
        var right = sel === q.ans;
        if (right) score++;
        h += '<div class="explainq"><p><b>' + (sel === undefined ? '— Chưa chọn (tính là sai)' : right ? '✓ Đúng' : '✗ Sai') + '.</b> Đáp án đúng: <b>' + esc(q.opts[q.ans]) + '</b></p><p>' + esc(q.exp) + '</p>' +
          '<details><summary>Vì sao các đáp án còn lại sai?</summary><ul>' + q.why.map(function (w, i) { return i === q.ans ? '' : '<li><b>' + esc(q.opts[i]) + ':</b> ' + esc(w); }).join('') + '</ul></details></div>';
      }
      h += '</div>';
    });
    h += '</form><div class="row">' + (QZ.submitted ? '<span class="pill blue">Điểm: ' + score + ' / ' + QZ.set.length + ' (' + pct(score, QZ.set.length) + '%)</span><button data-qz="retry">Làm lại các câu sai</button><button data-qz="retake">Làm lại bộ này</button>' : '<button class="primary" data-qz="submit">Nộp bài</button>') + '</div>';
    return h;
  }

  /* ---------- mock audit ---------- */
  var AU = { list: [], i: 0, revealed: false, typed: '', self: null, timerOn: false, mins: 2, left: 0, sessionCount: 10, cat: 'all', lesson: 'all', started: false, interval: null, done: 0 };
  function auditBank() {
    return AUDIT.filter(function (a) { return (AU.cat === 'all' || a.cat === AU.cat) && (AU.lesson === 'all' || a.lesson === +AU.lesson); });
  }
  function auditStart() {
    AU.list = auditBank().sort(function () { return Math.random() - 0.5; }).slice(0, AU.sessionCount);
    AU.i = 0; AU.revealed = false; AU.typed = ''; AU.self = null; AU.started = true; AU.done = 0; startAuditTimer();
  }
  function stopAuditTimer() { if (AU.interval) { clearInterval(AU.interval); AU.interval = null; } }
  function startAuditTimer() {
    stopAuditTimer();
    if (!AU.timerOn) return;
    AU.left = AU.mins * 60;
    AU.interval = setInterval(function () {
      AU.left--;
      var t = $('#au-time'); if (t) t.textContent = fmtT(AU.left);
      if (AU.left <= 0) { stopAuditTimer(); AU.revealed = true; render_page(); }
    }, 1000);
  }
  function fmtT(s) { s = Math.max(0, s); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  function auditView() {
    var h = '<h1>Mock Audit</h1><p class="muted">Trả lời bằng lời hoặc gõ ra. Không có chấm điểm AI: bạn tự so với đáp án mẫu và từ khóa, rồi tự đánh giá. Đây là công cụ học, không phải đánh giá ngữ nghĩa tự động.</p>';
    if (!AU.started) {
      var cats = ['all', 'Định nghĩa', 'So sánh', 'Ứng dụng', 'Xử lý lỗi', 'Phỏng vấn'];
      h += '<div class="card"><h3 style="margin-top:0">Thiết lập buổi thi thử</h3><div class="grid2">' +
        '<label>Số câu <select data-au="count">' + [5, 10, 15, 30].map(function (n) { return '<option value="' + n + '"' + (AU.sessionCount === n ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>' +
        '<label>Loại câu <select data-au="cat">' + cats.map(function (c) { return '<option value="' + c + '"' + (AU.cat === c ? ' selected' : '') + '>' + (c === 'all' ? 'Tất cả' : c) + '</option>'; }).join('') + '</select></label>' +
        '<label>Bài <select data-au="lesson"><option value="all">Tất cả</option>' + ORDER.map(lessonById).map(function (l) { return '<option value="' + l.id + '"' + (AU.lesson == l.id ? ' selected' : '') + '>' + CODE_OF[l.id] + ' ' + esc(l.title) + '</option>'; }).join('') + '</select></label>' +
        '<label><input type="checkbox" data-au="timer"' + (AU.timerOn ? ' checked' : '') + '> Bật đồng hồ áp lực (mỗi câu)</label>' +
        '<label>Số phút mỗi câu <select data-au="mins">' + [1, 2, 3].map(function (m) { return '<option value="' + m + '"' + (AU.mins === m ? ' selected' : '') + '>' + m + '</option>'; }).join('') + '</select></label></div>' +
        '<p class="muted">Có ' + auditBank().length + ' câu khớp bộ lọc.</p><button class="primary" data-au="start" ' + (auditBank().length ? '' : 'disabled') + '>Bắt đầu Mock Audit</button></div>';
      var hist = P.audit.slice(-8).reverse();
      h += '<div class="card"><h3 style="margin-top:0">Lịch sử tự đánh giá gần đây</h3>' + (hist.length ? '<table><tr><th>Thời điểm</th><th>Bài</th><th>Tự đánh giá</th></tr>' + hist.map(function (x) { return '<tr><td>' + new Date(x.t).toLocaleString('vi-VN') + '</td><td>' + x.lesson + '</td><td>' + ['', 'Chưa trả lời được', 'Trả lời một phần', 'Trả lời tốt'][x.self] + '</td></tr>'; }).join('') + '</table>' : '<p class="muted">Chưa có buổi thi thử nào.</p>') + '</div>';
      return h;
    }
    if (AU.i >= AU.list.length) {
      stopAuditTimer();
      var sess = P.audit.slice(-AU.list.length);
      var n1 = sess.filter(function (x) { return x.self === 1; }).length, n2 = sess.filter(function (x) { return x.self === 2; }).length, n3 = sess.filter(function (x) { return x.self === 3; }).length;
      return h + '<div class="card"><h2>Hoàn thành buổi thi thử</h2><p>Tự đánh giá: <span class="pill red">Chưa trả lời được: ' + n1 + '</span> <span class="pill yellow">Một phần: ' + n2 + '</span> <span class="pill green">Tốt: ' + n3 + '</span></p><p>Xem chủ đề cần ôn ở <a href="#/weak">Weak Points</a>.</p><button class="primary" data-au="restart">Thiết lập buổi mới</button></div>';
    }
    var q = AU.list[AU.i];
    h += '<div class="statusbar"><span class="pill">Câu ' + (AU.i + 1) + ' / ' + AU.list.length + '</span><span class="pill purple">' + esc(q.cat) + '</span><a class="pill blue" href="#/lesson/' + q.lesson + '">Bài ' + CODE_OF[q.lesson] + '</a>' +
      (AU.timerOn ? '<span class="pill yellow" id="au-time">⏱ ' + fmtT(AU.left) + '</span>' : '') + '</div>';
    h += '<div class="card"><h3 style="margin-top:0">' + esc(q.en) + '</h3><p><i>' + esc(q.vi) + '</i></p>' +
      '<label for="au-ans"><b>Câu trả lời của bạn (có thể để trống nếu trả lời bằng lời):</b></label><textarea id="au-ans" data-au="typed" placeholder="Gõ câu trả lời của bạn...">' + esc(AU.typed) + '</textarea>' +
      '<div class="row" style="margin-top:8px"><button data-au="check">Đối chiếu từ khóa</button><button data-au="reveal">' + (AU.revealed ? 'Ẩn đáp án gợi ý' : 'Hiện đáp án gợi ý') + '</button></div>';
    if (AU.revealed || AU.typed) {
      var typedLow = AU.typed.toLowerCase(), hits = 0;
      h += '<div class="muted" style="margin-top:8px">Từ khóa cần nhắc tới:</div><p>' + q.kw.map(function (k) {
        var hit = typedLow && typedLow.indexOf(k.toLowerCase()) >= 0; if (hit) hits++;
        return '<span class="kw' + (hit ? ' hit' : '') + '">' + (hit ? '✓ ' : '') + esc(k) + '</span>';
      }).join('') + '</p>';
      if (AU.typed) h += '<p class="muted">Đã nhắc tới ' + hits + ' / ' + q.kw.length + ' từ khóa (chỉ là kiểm tra từ khóa đơn giản, không phải chấm ngữ nghĩa).</p>';
    }
    if (AU.revealed) {
      h += '<div class="notice"><p><b>Gợi ý trả lời (EN):</b> ' + esc(q.model) + '</p><p><b>Giải thích (VI):</b> ' + esc(q.viExp) + '</p><p><b>Câu hỏi tiếp theo có thể gặp:</b> ' + esc(q.follow) + '</p><p><b>Trả lời sai thường gặp:</b> ' + esc(q.mistake) + '</p></div>';
    }
    h += '<div class="card"><b>Tự đánh giá của bạn:</b><div class="rate" style="justify-content:flex-start">' +
      [[1, 'Chưa trả lời được'], [2, 'Trả lời một phần'], [3, 'Trả lời tốt']].map(function (x) { return '<button data-au="self" data-s="' + x[0] + '" class="' + (AU.self === x[0] ? 'primary' : '') + '">' + x[1] + '</button>'; }).join('') +
      '</div><button class="primary" data-au="next" ' + (AU.self ? '' : 'disabled') + '>Câu tiếp theo →</button> <button data-au="stop">Kết thúc sớm</button></div>';
    return h;
  }

  /* ---------- cheat, glossary, refs, weak, data ---------- */
  function cheatView() {
    return '<h1>Cheat Sheet — so sánh dễ nhầm</h1><p class="muted">Bảng tóm tắt. Mỗi mục có ví dụ và câu trả lời audit ngắn.</p>' +
      '<table class="cmp"><tr><th>Cặp khái niệm</th><th>Khác nhau chính</th><th>Ví dụ / Code</th><th>Trả lời audit ngắn (EN)</th></tr>' + CHEAT.map(function (r) {
        return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td><td><code>' + esc(r[2]) + '</code></td><td>' + esc(r[3]) + '</td></tr>';
      }).join('') + '</table>';
  }
  function glossaryView(q) {
    q = (q || '').toLowerCase();
    var items = GLOSSARY.filter(function (g) { return !q || (g[0] + ' ' + g[1] + ' ' + g[2]).toLowerCase().indexOf(q) >= 0; });
    return '<h1>Glossary — Từ điển thuật ngữ</h1><div class="card"><input type="text" id="gsearch" data-gsearch placeholder="Tìm thuật ngữ (ví dụ: wait, locator)" value="' + esc(q) + '" aria-label="Tìm thuật ngữ"></div>' +
      '<table><tr><th>Thuật ngữ (EN)</th><th>Giải thích (VI)</th><th>Bài</th></tr>' + items.map(function (g) {
        return '<tr><td><b>' + esc(g[0]) + '</b></td><td>' + esc(g[1]) + '</td><td><a href="#/lesson/' + g[2] + '">' + CODE_OF[g[2]] + '</a></td></tr>';
      }).join('') + '</table><p class="muted">' + items.length + ' thuật ngữ.</p>';
  }
  function refsView() {
    return '<h1>References — Tài liệu chính thức</h1><p class="muted">Ngày kiểm tra liên kết gần nhất: ' + esc(REF_VERIFIED) + '. Nội dung mô tả tóm tắt theo tài liệu; không sao chép nguyên văn.</p>' +
      ORDER.map(lessonById).map(function (l) { return '<section class="card"><h3 style="margin-top:0">Bài ' + CODE_OF[l.id] + ': ' + esc(l.title) + '</h3>' + refsHTML(l.refs) + '</section>'; }).join('');
  }
  function weakView() {
    var w = weakTopics();
    var sim = P.audit.length, quizTotal = Object.keys(P.quiz).filter(function (k) { return P.quiz[k].n > 0; }).length;
    return '<h1>Weak Points — Chủ đề yếu & khoảng trống</h1><p class="muted">Dựa trên: câu quiz đã sai, thẻ "Chưa nhớ/Chưa chắc", và tự đánh giá Mock Audit. Không có dữ liệu thì không có điểm yếu được tính.</p>' +
      '<div class="card">' + (w.length ? '<table><tr><th>Bài</th><th>Điểm yếu</th><th>Lý do</th></tr>' + w.map(function (x) { return '<tr><td><a href="#/lesson/' + x.id + '">' + CODE_OF[x.id] + ' ' + esc(x.title) + '</a></td><td>' + x.v + '</td><td>' + x.reason + '</td></tr>'; }).join('') + '</table>' : '<p>Chưa có dữ liệu. Đã làm ' + quizTotal + ' câu quiz và ' + sim + ' lượt tự đánh giá Mock Audit.</p>') + '</div>' +
      '<div class="card"><h3 style="margin-top:0">Hành động gợi ý</h3><ol><li>Mở các bài có điểm cao nhất, xem lại mô phỏng và Lỗi thường gặp.</li><li>Làm <a href="#/quiz">Quiz → Ôn câu đã sai</a>.</li><li>Ôn <a href="#/flash">flashcard chế độ "Thẻ đã sai / khó"</a>.</li></ol></div>';
  }
  function dataView() {
    return '<h1>Dữ liệu tiến độ & cài đặt</h1>' +
      '<div class="card"><h3 style="margin-top:0">Giao diện</h3><div class="row"><span>Chế độ màu:</span><button data-theme="auto">Theo hệ thống</button><button data-theme="light">Sáng</button><button data-theme="dark">Tối</button></div></div>' +
      '<div class="card"><h3 style="margin-top:0">Xuất / nhập tiến độ (JSON)</h3><p class="muted">Tiến độ được lưu trong trình duyệt này. Xuất ra file JSON để sao lưu hoặc chuyển sang máy khác.</p>' +
      '<div class="row"><button class="primary" data-data="export">Xuất JSON</button><button data-data="import">Nhập JSON từ ô bên dưới</button></div>' +
      '<textarea id="jsonbox" aria-label="Nội dung JSON" placeholder="Dán nội dung JSON đã xuất vào đây để nhập"></textarea><p id="jsonmsg" class="muted"></p></div>' +
      '<div class="card"><h3 style="margin-top:0">Đặt lại tiến độ</h3><p class="muted">Thao tác này xóa mọi tiến độ, thẻ, quiz và lịch sử audit trên trình duyệt này.</p><button data-data="reset" style="border-color:var(--red);color:var(--red)">Đặt lại tất cả tiến độ…</button></div>';
  }

  function extraView() {
    return '<h1>Kiến thức bổ sung</h1><p class="muted">Giới thiệu ngắn các chủ đề thường được hỏi nhưng hỗ trợ cho nhóm Web Automation, không nằm trong bài chính. Mục tiêu: hiểu khái niệm và công dụng; không cần thuộc cú pháp.</p>' +
      EXTRA_TOPICS.map(function (t) {
        return '<section class="card"><h2>' + esc(t.title) + '</h2><p><b>Là gì / làm gì:</b> ' + esc(t.what) + '</p><p><b>Vì sao cần:</b> ' + esc(t.why) + '</p><p><b>Cách làm:</b> ' + esc(t.how) + '</p>' +
          '<div class="codebox"><pre style="margin:0">' + t.code.map(esc).join('\n') + '</pre></div><p class="muted">' + esc(t.note) + '</p>' + refsHTML(t.refs) + '</section>';
      }).join('');
  }

  /* ---------- router ---------- */
  var ROUTE = '';
  function parse() {
    var h = location.hash || '#/';
    var m;
    if ((m = h.match(/^#\/lesson\/(\d+)/))) return { r: '#/lesson', id: +m[1] };
    if ((m = h.match(/^#\/group\/(\d)/))) return { r: '#/group', id: +m[1] };
    return { r: h.split('?')[0] || '#/' };
  }
  function render_page() {
    var rt = parse(), main = $('#main');
    stopAll();
    stopAuditTimer();
    var route = rt.r === '#/lesson' ? '#/lesson/' + rt.id : rt.r === '#/group' ? '#/group/' + rt.id : rt.r;
    buildNav(route === '#/lesson/' + rt.id ? '#/group/' + GROUP_OF[rt.id] : route);
    var html = '';
    if (rt.r === '#/lesson') { html = lessonView(rt.id); main.innerHTML = html; mountSims(rt.id); }
    else if (rt.r === '#/group') main.innerHTML = groupView(rt.id);
    else if (rt.r === '#/eval') main.innerHTML = evalView();
    else if (rt.r === '#/flash') main.innerHTML = fcView();
    else if (rt.r === '#/quiz') main.innerHTML = quizView();
    else if (rt.r === '#/audit') main.innerHTML = auditView();
    else if (rt.r === '#/cheat') main.innerHTML = cheatView();
    else if (rt.r === '#/glossary') main.innerHTML = glossaryView('');
    else if (rt.r === '#/weak') main.innerHTML = weakView();
    else if (rt.r === '#/refs') main.innerHTML = refsView();
    else if (rt.r === '#/extra') main.innerHTML = extraView();
    else if (rt.r === '#/data') main.innerHTML = dataView();
    else main.innerHTML = dashboard();
    if (rt.r === '#/flash') { /* keep */ }
    $('#side').classList.remove('open');
    document.title = (rt.r === '#/lesson' ? lessonById(rt.id).title : 'Selenium Java Visual Audit Bootcamp');
    ROUTE = rt.r;
    try { main.focus({ preventScroll: true }); } catch (e) { }
  }
  window.addEventListener('hashchange', function () { FC.list = []; render_page(); window.scrollTo(0, 0); });

  /* ---------- delegated events ---------- */
  function onClick(e) {
    var t = e.target.closest('button, [data-lesson-done], [data-bm], [data-fc], [data-fca], [data-qz], [data-au], [data-data], [data-theme], [data-sim]');
    if (e.target.closest('[data-fc="flip"]') && !e.target.closest('button')) { FC.flipped = !FC.flipped; return render_page(); }
    if (!t) return;
    var sim = t.getAttribute('data-sim');
    if (sim && t.hasAttribute('data-act')) {
      var c = CTL[sim]; if (!c) return;
      var a = t.getAttribute('data-act');
      if (a === 'goto') return act(c, 'goto', +t.getAttribute('data-i'));
      if (a === 'pred') return;
      return act(c, a);
    }
    if (t.hasAttribute('data-lesson-done')) { var id = t.getAttribute('data-lesson-done'); P.lessons[id] = !P.lessons[id]; saveP(); return render_page(); }
    if (t.hasAttribute('data-bm')) { var b = +t.getAttribute('data-bm'); P.bm = P.bm.indexOf(b) >= 0 ? P.bm.filter(function (x) { return x !== b; }) : P.bm.concat([b]); saveP(); return render_page(); }
    var fca = t.getAttribute('data-fca');
    if (fca) {
      if (FC.list.length === 0 && fca !== 'apply') buildFC();
      var card = FC.list[FC.i];
      if (fca === 'apply') { buildFC(); }
      else if (fca === 'shuffle') { shuffleFC(); }
      else if (fca === 'prev') { FC.i = Math.max(0, FC.i - 1); FC.flipped = false; }
      else if (fca === 'next') { FC.i = Math.min(FC.list.length - 1, FC.i + 1); FC.flipped = false; }
      else if (fca === 'flip') { FC.flipped = !FC.flipped; }
      else if (fca === 'bm' && card) { var s0 = cardState(card); P.flash[card.id] = Object.assign({}, s0, { bm: !s0.bm, r: s0.r === undefined ? 'new' : s0.r }); saveP(); }
      else if (fca === 'rate' && card) { rateCard(card, t.getAttribute('data-r')); FC.i = Math.min(FC.list.length - 1, FC.i + 1); FC.flipped = false; }
      return render_page();
    }
    var qz = t.getAttribute('data-qz');
    if (qz === 'submit' || qz === 'retry' || qz === 'retake' || qz === 'start') {
      if (qz === 'start') { var m = $('[data-qz="mode"]').value, ar = $('[data-qz="arg"]').value; pickQuiz(m, ar); }
      else if (qz === 'retake') { pickQuiz(QZ.mode, QZ.arg); }
      else if (qz === 'retry') { pickQuiz('wrong', ''); }
      else if (qz === 'submit') {
        QZ.submitted = true;
        var sc = 0;
        QZ.set.forEach(function (q) {
          var sel = QZ.answers[q.id], ok = sel === q.ans; if (ok) sc++;
          var rec = P.quiz[q.id] || { n: 0, c: false };
          P.quiz[q.id] = { n: rec.n + 1, c: ok, last: Date.now() };
        });
        P.quizSessions.push({ t: Date.now(), n: QZ.set.length, score: sc }); saveP();
      }
      return render_page();
    }
    var au = t.getAttribute('data-au');
    if (au) {
      if (au === 'start') { auditStart(); }
      else if (au === 'check') { render_page(); }
      else if (au === 'reveal') { AU.revealed = !AU.revealed; }
      else if (au === 'self') { AU.self = +t.getAttribute('data-s'); var q0 = AU.list[AU.i]; P.audit.push({ t: Date.now(), id: q0.id, lesson: q0.lesson, self: AU.self }); saveP(); }
      else if (au === 'next') { AU.i++; AU.revealed = false; AU.typed = ''; AU.self = null; startAuditTimer(); if (AU.i >= AU.list.length) P.auditSessions = (P.auditSessions || 0) + 1; saveP(); }
      else if (au === 'stop') { AU.i = AU.list.length; stopAuditTimer(); }
      else if (au === 'restart') { AU.started = false; }
      return render_page();
    }
    var dt = t.getAttribute('data-data');
    if (dt) return dataAction(dt);
    var th = t.getAttribute('data-theme');
    if (th) { try { if (th === 'auto') localStorage.removeItem('sbvab-theme'); else localStorage.setItem('sbvab-theme', th); } catch (x) { } applyTheme(); }
  }
  function handleImportFile(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var o = JSON.parse(reader.result);
        if (!o || o.sbvab !== 1 || typeof o.progress !== 'object') throw new Error('File không đúng định dạng tiến độ của ứng dụng này.');
        if (!window.confirm('Thay tiến độ hiện tại trên máy này bằng nội dung file "' + file.name + '"?')) return;
        P = o.progress; P.lessons = P.lessons || {}; P.sims = P.sims || {}; P.flash = P.flash || {}; P.quiz = P.quiz || {}; P.audit = P.audit || []; P.bm = P.bm || []; P.check = P.check || {}; P.evalr = P.evalr || {};
        saveP(); FC.list = []; render_page();
        var msg = $('#syncmsg'); if (msg) msg.textContent = 'Đã nhập tiến độ từ file.';
      } catch (x) { window.alert('Không nhập được: ' + x.message); }
    };
    reader.onerror = function () { window.alert('Không đọc được file.'); };
    reader.readAsText(file);
  }
  function applyTheme() {
    var th = null; try { th = localStorage.getItem('sbvab-theme'); } catch (x) { }
    if (th) document.documentElement.setAttribute('data-theme', th); else document.documentElement.removeAttribute('data-theme');
  }
  function dataAction(dt) {
    var msg = $('#jsonmsg');
    if (dt === 'export') {
      var blob = JSON.stringify({ sbvab: 1, exportedAt: new Date().toISOString(), progress: P }, null, 2);
      var box = $('#jsonbox'); if (box) box.value = blob;
      try { var a = document.createElement('a'); a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(blob); a.download = 'sbvab-progress.json'; document.body.appendChild(a); a.click(); a.remove(); } catch (x) { }
      if (msg) msg.textContent = 'Đã tạo JSON (nằm trong ô bên dưới). Nếu chưa tải file, hãy sao chép nội dung trong ô.';
    } else if (dt === 'import') {
      try {
        var o = JSON.parse($('#jsonbox').value);
        if (!o || o.sbvab !== 1 || typeof o.progress !== 'object') throw new Error('Định dạng không đúng (cần {sbvab:1, progress:{...}}).');
        P = o.progress; P.lessons = P.lessons || {}; P.sims = P.sims || {}; P.flash = P.flash || {}; P.quiz = P.quiz || {}; P.audit = P.audit || []; P.bm = P.bm || []; P.check = P.check || {}; P.evalr = P.evalr || {};
        saveP(); FC.list = []; if (msg) msg.textContent = 'Đã nhập tiến độ thành công.'; render_page();
      } catch (x) { if (msg) msg.textContent = 'Lỗi nhập: ' + x.message; }
    } else if (dt === 'download') {
      var d = new Date(), pad = function (n) { return ('0' + n).slice(-2); };
      var fname = 'sbvab-tien-do-' + d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + '.json';
      P.lastExport = Date.now(); saveP();
      var text = JSON.stringify({ sbvab: 1, exportedAt: new Date().toISOString(), progress: P }, null, 2);
      try {
        var url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
        var a = document.createElement('a'); a.href = url; a.download = fname;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      } catch (x) { }
      var sm = $('#syncmsg'); if (sm) sm.textContent = 'Đã tải ' + fname + '. Hãy giữ file này (Drive, Zalo, email...).';
      else render_page();
    } else if (dt === 'pick') {
      var fi = $('#importfile'); if (fi) fi.click();
    } else if (dt === 'reset') {
      if (window.confirm('Xóa toàn bộ tiến độ trên trình duyệt này? Thao tác không thể hoàn tác.')) {
        if (window.prompt('Gõ RESET (chữ hoa) để xác nhận:') === 'RESET') {
          P = { lessons: {}, sims: {}, flash: {}, quiz: {}, audit: [], bm: [], check: {}, last: null, quizSessions: [], evalr: {} };
          saveP(); FC.list = []; render_page();
        }
      }
    }
  }
  document.addEventListener('click', onClick);
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches('select[data-act="speed"]')) { var c = CTL[t.getAttribute('data-sim')]; if (c) act(c, 'speed', +t.value); return; }
    if (t.matches('input[data-act="pred"]')) { var c2 = CTL[t.getAttribute('data-sim')]; if (c2) { c2.pred = +t.getAttribute('data-i'); } return; }
    if (t.matches('[data-fcf]')) { FC.filter[t.getAttribute('data-fcf')] = t.value; FC.list = []; return render_page(); }
    if (t.matches('[data-qz="pick"]')) { QZ.answers[t.getAttribute('data-q')] = +t.value; return; }
    if (t.id === 'importfile') { handleImportFile(t.files && t.files[0]); t.value = ''; return; }
    if (t.matches('[data-check]')) { P.check[t.getAttribute('data-check')] = t.checked; saveP(); return; }
    if (t.matches('[data-au="mode"]')) return;
    if (t.matches('[data-qz="mode"]')) { $('[data-qz="arg"]').innerHTML = qzArgOptions(t.value, ''); return; }
    if (t.matches('[data-eval]')) { P.evalr[t.getAttribute('data-eval')] = +t.value; saveP(); return render_page(); }
    if (t.matches('[data-au="count"]')) { AU.sessionCount = +t.value; return render_page(); }
    if (t.matches('[data-au="cat"]')) { AU.cat = t.value; return render_page(); }
    if (t.matches('[data-au="lesson"]')) { AU.lesson = t.value; return render_page(); }
    if (t.matches('[data-au="timer"]')) { AU.timerOn = t.checked; return render_page(); }
    if (t.matches('[data-au="mins"]')) { AU.mins = +t.value; return render_page(); }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches('[data-au="typed"]')) { AU.typed = t.value; return; }
    if (t.matches('[data-gsearch]')) { var pos = t.selectionStart; $('#main').innerHTML = glossaryView(t.value); var n = $('#gsearch'); n.focus(); n.setSelectionRange(pos, pos); }
  });
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-fc="flip"]') && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); FC.flipped = !FC.flipped; render_page(); }
  });
  var menu = document.getElementById('menu');
  if (menu) menu.addEventListener('click', function () { $('#side').classList.toggle('open'); });

  applyTheme();
  if (!location.hash) { try { history.replaceState(null, '', '#/'); } catch (x) { } }
  render_page();
})();

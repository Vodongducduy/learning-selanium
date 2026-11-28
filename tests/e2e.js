const puppeteer = require('puppeteer-core');
const URL = 'file:///D:/typescript/selanium-project-learn/index.html';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SHOTS = require('os').tmpdir().split(require('path').sep).join('/');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const results = [];
  const check = (name, cond, extra) => results.push([cond ? 'PASS' : 'FAIL', name, extra || '']);
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--allow-file-access-from-files'], defaultViewport: { width: 1280, height: 900 } });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push('console.' + m.type() + ': ' + m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));

  await page.goto(URL, { waitUntil: 'load' });
  await page.evaluate(() => localStorage.clear());
  await page.goto(URL + '#/', { waitUntil: 'load' });
  await sleep(200);

  // 1. Dashboard and navigation
  let txt = await page.$eval('#main', e => e.textContent);
  check('Dashboard renders', /Selenium Java Visual Audit Bootcamp/.test(txt) && /Lộ trình theo nhóm kỹ năng/.test(txt));
  const navCount = await page.$$eval('#side nav a', a => a.length);
  check('Sidebar has 18 navigation links', navCount === 18, navCount);

  // 2. Every lesson renders with exactly three simulations
  let lessonProblems = [];
  for (let i = 1; i <= 20; i++) {
    await page.goto(URL + '#/lesson/' + i, { waitUntil: 'load' });
    await sleep(40);
    const n = await page.$$eval('section.sim', s => s.length);
    if (n !== 3) lessonProblems.push('lesson ' + i + ' sims=' + n);
    const h = await page.$eval('#main', e => e.textContent);
    if (!h.includes('Mã Java minh họa') || !h.includes('Tài liệu chính thức')) lessonProblems.push('lesson ' + i + ' sections');
  }
  check('All 20 lessons render with 3 simulations and all sections', lessonProblems.length === 0, lessonProblems.join('; '));

  // 3. For every simulation: step forward, undo back, reset, timeline
  const undoFail = [];
  let simsTested = 0;
  for (let lesson = 1; lesson <= 20; lesson++) {
    await page.goto(URL + '#/lesson/' + lesson, { waitUntil: 'load' });
    await sleep(30);
    const ids = await page.$$eval('section.sim', s => s.map(x => x.id));
    for (const sid of ids) {
      simsTested++;
      const sel = '#' + sid;
      const initial = await page.$eval(sel, e => e.innerHTML);
      const steps = await page.$eval(sel, e => +e.querySelector('.stepcount').textContent.match(/\/ (\d+)/)[1]);
      const snaps = [initial];
      for (let k = 0; k < steps; k++) {
        await page.click(sel + ' [data-act="next"]');
        snaps.push(await page.$eval(sel, e => e.innerHTML));
      }
      for (let k = steps; k > 0; k--) {
        await page.click(sel + ' [data-act="prev"]');
        const now = await page.$eval(sel, e => e.innerHTML);
        if (now !== snaps[k - 1]) { undoFail.push(sid + ':undo@' + k); break; }
      }
      await page.click(sel + ' [data-act="reset"]');
      const reset = await page.$eval(sel, e => e.innerHTML);
      if (reset !== initial) undoFail.push(sid + ':reset');
      const mid = Math.max(1, Math.floor(steps / 2));
      await page.click(sel + ' .timeline button[data-i="' + mid + '"]');
      const atMid = await page.$eval(sel, e => e.innerHTML);
      if (atMid !== snaps[mid]) undoFail.push(sid + ':timeline' + mid);
      await page.click(sel + ' [data-act="reset"]');
    }
  }
  check('60 simulations found and exercised (' + simsTested + ')', simsTested === 60, simsTested);
  check('Undo restores the exact previous DOM state at every step', undoFail.filter(x => x.includes(':undo')).length === 0, undoFail.filter(x => x.includes(':undo')).slice(0, 4).join(' '));
  check('Reset restores the exact initial state for all simulations', undoFail.filter(x => x.endsWith(':reset')).length === 0, undoFail.filter(x => x.endsWith(':reset')).slice(0, 4).join(' '));
  check('Clickable timeline reproduces the stored snapshot', undoFail.filter(x => x.includes(':timeline')).length === 0, undoFail.filter(x => x.includes(':timeline')).slice(0, 4).join(' '));

  // 4. Play / pause / speed / replay / undo during autoplay
  await page.goto(URL + '#/lesson/1', { waitUntil: 'load' });
  await sleep(60);
  await page.click('#sim-L1-E [data-act="reset"]');
  await page.select('#sim-L1-E select', '2');
  await page.click('#sim-L1-E [data-act="play"]');
  await sleep(300);
  await page.click('#sim-L1-E [data-act="pause"]');
  const pausedAt = await page.$eval('#sim-L1-E .stepcount', e => e.textContent);
  await sleep(1500);
  const stillPaused = await page.$eval('#sim-L1-E .stepcount', e => e.textContent);
  check('Pause stops autoplay', pausedAt === stillPaused, pausedAt + ' -> ' + stillPaused);
  await page.click('#sim-L1-E [data-act="play"]');
  await sleep(4800);
  const end = await page.$eval('#sim-L1-E .stepcount', e => e.textContent);
  check('Play reaches last step at 2x speed', /Bước 6 \/ 6/.test(end), end);
  check('Takeaway appears at the end', (await page.$eval('#sim-L1-E', e => e.textContent)).includes('Kết luận kỹ thuật'));
  await page.click('#sim-L1-E [data-act="replay"]');
  await sleep(150);
  const rp = await page.$eval('#sim-L1-E .stepcount', e => e.textContent);
  check('Replay restarts from step 0', /Bước [01] \//.test(rp), rp);
  await page.click('#sim-L1-E [data-act="pause"]');
  await page.click('#sim-L1-E [data-act="reset"]');
  await page.click('#sim-L1-E [data-act="play"]');
  await sleep(1400);
  await page.click('#sim-L1-E [data-act="prev"]');
  const u1 = await page.$eval('#sim-L1-E .stepcount', e => e.textContent);
  await sleep(1600);
  const u2 = await page.$eval('#sim-L1-E .stepcount', e => e.textContent);
  check('Undo during autoplay stops the timer safely', u1 === u2, u1 + ' -> ' + u2);

  // 5. Leaving a lesson stops its simulation
  await page.click('#sim-L1-E [data-act="reset"]');
  await page.click('#sim-L1-E [data-act="play"]');
  await page.goto(URL + '#/flash', { waitUntil: 'load' });
  await sleep(1500);
  check('Leaving a lesson while playing does not crash the flashcards page', /Flashcards/.test(await page.$eval('#main', e => e.textContent)));

  // 6. Flashcards: flip, rate, persist
  await page.evaluate(() => document.querySelector('[data-fca="flip"]').click());
  await page.evaluate(() => document.querySelector('[data-fca="rate"][data-r="known"]').click());
  await sleep(100);
  const fcStore = await page.evaluate(() => JSON.parse(localStorage.getItem('sbvab-v1')).flash);
  check('Flashcard rating saved to localStorage', fcStore && Object.values(fcStore).some(v => v.r === 'known'));

  // 7. Quiz: answers hidden until submit, score after submit
  await page.goto(URL + '#/quiz', { waitUntil: 'load' });
  await sleep(60);
  await page.select('[data-qz="mode"]', 'group');
  await sleep(40);
  await page.select('[data-qz="arg"]', '1');
  await page.click('[data-qz="start"]');
  await sleep(60);
  let quizText = await page.$eval('#main', e => e.textContent);
  check('Quiz hides correct answers before submit', !/Đáp án đúng:/.test(quizText));
  const names = await page.$$eval('[data-qz="pick"]', els => Array.from(new Set(els.map(e => e.name))));
  for (const name of names) await page.click('input[name="' + name + '"]');
  await page.click('[data-qz="submit"]');
  await sleep(60);
  quizText = await page.$eval('#main', e => e.textContent);
  check('Quiz reveals answers and score after submit', /Điểm:/.test(quizText) && /Đáp án đúng:/.test(quizText), names.length + ' questions in group 1');
  const quizStore = await page.evaluate(() => JSON.parse(localStorage.getItem('sbvab-v1')).quiz);
  check('Quiz results saved', Object.keys(quizStore).length === names.length);

  // 8. Mock audit
  await page.goto(URL + '#/audit', { waitUntil: 'load' });
  await sleep(60);
  await page.click('[data-au="start"]');
  await sleep(60);
  await page.type('#au-ans', 'driver test session');
  await page.click('[data-au="reveal"]');
  await page.click('[data-au="self"][data-s="3"]');
  await page.click('[data-au="next"]');
  await sleep(60);
  const audStore = await page.evaluate(() => JSON.parse(localStorage.getItem('sbvab-v1')).audit);
  check('Mock audit self-assessment saved', audStore.length === 1 && audStore[0].self === 3);
  check('Mock audit moves to question 2', /Câu 2 \//.test(await page.$eval('#main', e => e.textContent)));

  // 9. Theme and JSON
  await page.goto(URL + '#/data', { waitUntil: 'load' });
  await sleep(60);
  await page.click('[data-theme="dark"]');
  check('Dark theme applies', (await page.evaluate(() => document.documentElement.getAttribute('data-theme'))) === 'dark');
  await page.click('[data-theme="light"]');
  await page.click('[data-data="export"]');
  const exported = await page.$eval('#jsonbox', e => e.value);
  check('JSON export contains progress', exported.includes('"progress"'));
  await page.evaluate(() => localStorage.clear());
  await page.goto(URL + '#/data', { waitUntil: 'load' });
  await sleep(60);
  await page.$eval('#jsonbox', (e, v) => { e.value = v; }, exported);
  await page.click('[data-data="import"]');
  await sleep(80);
  const restored = await page.evaluate(() => JSON.parse(localStorage.getItem('sbvab-v1')).quiz);
  check('JSON import restores quiz progress', Object.keys(restored || {}).length === Object.keys(quizStore).length);
  await page.reload({ waitUntil: 'load' });
  await sleep(80);
  const after = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('sbvab-v1')).quiz).length);
  check('Progress survives a browser refresh', after === Object.keys(quizStore).length);

  // 10. Responsive: phone width
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(URL + '#/lesson/9', { waitUntil: 'load' });
  await sleep(150);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('No horizontal page scroll at 390px width', overflow <= 1, 'overflow=' + overflow);
  await page.screenshot({ path: SHOTS + '/shot-mobile.png' });
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(URL + '#/lesson/1', { waitUntil: 'load' });
  await sleep(150);
  await page.screenshot({ path: SHOTS + '/shot-desktop.png' });

  // 11. Dark mode screenshot
  await page.goto(URL + '#/lesson/1', { waitUntil: 'load' });
  await page.evaluate(() => localStorage.setItem('sbvab-theme', 'dark'));
  await page.reload({ waitUntil: 'load' });
  await sleep(120);
  await page.screenshot({ path: SHOTS + '/shot-dark.png' });
  await page.evaluate(() => localStorage.removeItem('sbvab-theme'));

  // 12. Nhóm kỹ năng, bài 21-47 và bảng đánh giá phỏng vấn
  const newProblems = [];
  for (let i = 21; i <= 47; i++) {
    await page.goto(URL + '#/lesson/' + i, { waitUntil: 'load' });
    const t = await page.$eval('#main', e => e.textContent);
    if (!t.includes('A. Lý thuyết') || !t.includes('Tài liệu chính thức') || t.includes('Mô phỏng tương tác') || /undefined/.test(await page.$eval('#main .lesson-head', e => e.textContent))) newProblems.push(i);
    const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (o > 1) newProblems.push(i + ':overflow');
  }
  check('Lessons 21-47 render without simulations section', newProblems.length === 0, newProblems.join(' '));
  for (let g = 1; g <= 7; g++) {
    await page.goto(URL + '#/group/' + g, { waitUntil: 'load' });
    check('Group page ' + g + ' lists its requirements', /Yêu cầu kỹ năng/.test(await page.$eval('#main', e => e.textContent)));
  }
  await page.goto(URL + '#/eval', { waitUntil: 'load' });
  await page.select('select[data-eval="Basic language - Java"]', '4');
  await page.select('select[data-eval="Work Hard"], select[data-eval="Working mindset"]', '2');
  await page.reload({ waitUntil: 'load' });
  check('Interview evaluation is weighted and persists', /Mức sẵn sàng: 12.5%/.test(await page.$eval('#main', e => e.textContent)));
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  const wide = [];
  for (const r of ['#/eval', '#/group/1', '#/group/2', '#/lesson/37', '#/lesson/40']) {
    await page.goto(URL + r, { waitUntil: 'load' });
    await sleep(60);
    const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (o > 1) wide.push(r + '=' + o);
  }
  check('New pages fit 390px width', wide.length === 0, wide.join(' '));
  await page.screenshot({ path: SHOTS + '/shot-new-mobile.png' });
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(URL + '#/eval', { waitUntil: 'load' });
  await sleep(100);
  await page.screenshot({ path: SHOTS + '/shot-eval.png' });

  check('No console errors or uncaught exceptions', errors.length === 0, errors.slice(0, 5).join(' | '));
  await browser.close();
  let failed = 0;
  results.forEach(r => { if (r[0] === 'FAIL') failed++; console.log(r[0], '-', r[1], r[2] ? '(' + r[2] + ')' : ''); });
  console.log(failed ? 'FAILED: ' + failed + ' of ' + results.length : 'ALL E2E CHECKS PASSED (' + results.length + ')');
})().catch(e => { console.error('E2E crashed:', e); process.exit(1); });

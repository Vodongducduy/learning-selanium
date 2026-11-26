const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const os = require('os');
const URL = 'file:///D:/typescript/selanium-project-learn/index.html';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sbvab-'));
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const page = await browser.newPage();
  const cdp = await page.createCDPSession();
  await cdp.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: dir });
  page.on('dialog', d => d.accept());
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(URL + '#/', { waitUntil: 'load' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'load' });
  // create progress: mark lesson 1 done and rate a flashcard
  await page.goto(URL + '#/lesson/1', { waitUntil: 'load' });
  await page.click('[data-lesson-done="1"]');
  // download
  await page.goto(URL + '#/data', { waitUntil: 'load' });
  await page.goto(URL + '#/', { waitUntil: 'load' });
  await page.click('[data-data="download"]');
  await sleep(1500);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const okDownload = files.length === 1 && /^sbvab-tien-do-\d{4}-\d{2}-\d{2}\.json$/.test(files[0]);
  console.log(okDownload ? 'PASS' : 'FAIL', 'download file named', files.join(','));
  // wipe and re-import
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'load' });
  const before = await page.evaluate(() => (JSON.parse(localStorage.getItem('sbvab-v1') || '{}').lessons || {})[1]);
  const input = await page.$('#importfile');
  await input.uploadFile(path.join(dir, files[0]));
  await sleep(800);
  const after = await page.evaluate(() => (JSON.parse(localStorage.getItem('sbvab-v1') || '{}').lessons || {})[1]);
  console.log(!before && after === true ? 'PASS' : 'FAIL', 'import restores lesson 1 done', String(before), '->', String(after));
  // bad file is rejected
  fs.writeFileSync(path.join(dir, 'bad.json'), '{"x":1}');
  let alerted = false;
  page.removeAllListeners('dialog');
  page.on('dialog', d => { alerted = d.message().includes('Không nhập'); d.accept(); });
  await (await page.$('#importfile')).uploadFile(path.join(dir, 'bad.json'));
  await sleep(600);
  console.log(alerted ? 'PASS' : 'FAIL', 'invalid file rejected with message');
  console.log(errors.length ? 'FAIL page errors ' + errors.join('|') : 'PASS no page errors');
  await browser.close();
})().catch(e => { console.error('crashed', e); process.exit(1); });

const fs = require('fs'), path = require('path');
const S = __dirname + '/src/';
const css = fs.readFileSync(S + '02-style.css', 'utf8');
const js = ['03-lessons.js', '05-sims-a.js', '06-sims-b.js', '05c-extra.js', '10-extra.js', '07-cards.js', '08-quiz.js', '09-audit.js', '01-core.js', '04-app.js']
  .map(f => fs.readFileSync(S + f, 'utf8')).join('\n');
let html = fs.readFileSync(S + '00-shell.html', 'utf8').replace('/*__CSS__*/', () => css).replace('/*__JS__*/', () => js);
const out = process.argv[2];
fs.writeFileSync(out, html, 'utf8');
console.log('built', out, html.length, 'bytes');

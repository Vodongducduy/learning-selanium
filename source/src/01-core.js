/* ===== ENGINE CORE (pure, deterministic, no DOM) ===== */
function sbvabClone(o) { return JSON.parse(JSON.stringify(o)); }

/* Build every immutable snapshot up front. snaps[i] is the FULL state after i steps.
   Undo / Timeline / Reset simply select a stored snapshot, so restoration is exact. */
function sbvabBuildSnapshots(sim) {
  var snaps = [];
  var s0 = sbvabClone(sim.init);
  s0.step = 0; s0.time = 0; s0.line = -1; s0.st = 'idle'; s0.exc = null;
  s0.stepTitle = 'Trạng thái ban đầu'; s0.cmd = ''; s0.logs = []; s0.info = null;
  snaps.push(s0);
  sim.steps.forEach(function (stp, i) {
    var prev = snaps[i];
    var n = sbvabClone(prev);
    n.step = i + 1;
    n.time = +(prev.time + (stp.dt || 1)).toFixed(1);
    n.line = stp.line;
    n.st = stp.st || 'run';
    n.stepTitle = stp.t;
    n.cmd = stp.line >= 0 ? sim.code[stp.line] : '';
    n.exc = null;
    n.info = { what: stp.what, why: stp.why, how: stp.how, impact: stp.impact };
    n.logs = prev.logs.concat([{ time: n.time, msg: stp.t, st: n.st }]);
    if (stp.fx) stp.fx(n);
    snaps.push(n);
  });
  return snaps;
}

/* Flatten a state into path -> value, ignoring bookkeeping keys. */
var SBVAB_META = ['step', 'time', 'line', 'st', 'stepTitle', 'cmd', 'logs', 'info', 'exc'];
function sbvabFlatten(obj, prefix, out) {
  if (obj === null || typeof obj !== 'object') { out[prefix] = obj; return out; }
  Object.keys(obj).forEach(function (k) {
    if (!prefix && SBVAB_META.indexOf(k) >= 0) return;
    sbvabFlatten(obj[k], prefix ? prefix + '.' + k : k, out);
  });
  return out;
}

/* STATE CHANGE: list of differences between two snapshots. */
function sbvabDiff(prev, cur) {
  var a = sbvabFlatten(prev, '', {}), b = sbvabFlatten(cur, '', {});
  var keys = Object.keys(a).concat(Object.keys(b).filter(function (k) { return !(k in a); }));
  var out = [];
  keys.forEach(function (k) {
    var x = a[k], y = b[k];
    if (JSON.stringify(x) !== JSON.stringify(y)) out.push({ path: k, from: x, to: y });
  });
  return out;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sbvabClone: sbvabClone, sbvabBuildSnapshots: sbvabBuildSnapshots, sbvabDiff: sbvabDiff };
}

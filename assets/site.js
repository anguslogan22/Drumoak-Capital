(function () {
  "use strict";
  var R = window.DRUMOAK_REPORTS || [];
  var M = window.DRUMOAK_CHRT;
  var ROOT = document.body.getAttribute("data-root") || "";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var fmt = function (n) { return Math.round(n).toLocaleString("en-GB"); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var cls = function (r) { return r.type === "long" ? "buy" : r.type === "short" ? "sell" : "credit"; };
  var moveCls = function (r) { return r.move == null ? "" : r.move >= 0 ? "pos" : "neg"; };
  var pdfUrl = function (r) { return ROOT + encodeURI(r.pdf); };
  var noteUrl = function (r) { return ROOT + "reports/" + r.slug + ".html"; };
  var coverUrl = function (r) { return ROOT + "assets/covers/" + r.slug + ".jpg"; };
  var NAVY = "#0d1b2a", NAVY2 = "#1a2e45", GOLD = "#b8964a", BUY = "#1f6b48", SELL = "#a23b2e", MUTED = "#6b7078", RULE = "#ece9e2";

  /* ---------- Nav ---------- */
  var toggle = $(".nav-toggle"), links = $(".nav-links");
  if (toggle && links) toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  /* ---------- Coverage tape ---------- */
  var tape = $("#tape");
  if (tape) tape.innerHTML = R.map(function (r) {
    return '<a class="tape-item" href="' + noteUrl(r) + '"><b>' + r.ticker + '</b><span class="r ' + (r.type === "long" ? "pos" : r.type === "short" ? "neg" : "") + '">' +
      esc(r.rating.toUpperCase()) + "</span>" + (r.type === "credit" ? "<span>Restructuring</span>" :
      '<span class="num">' + esc(r.target) + '</span><span class="num ' + moveCls(r) + '">' + esc(r.moveLabel) + "</span>") + "</a>";
  }).join("");

  $$("[data-count]").forEach(function (el) {
    var k = el.getAttribute("data-count");
    el.textContent = k === "all" ? R.length : R.filter(function (r) { return r.type === k; }).length;
  });

  /* ---------- Cover cards ---------- */
  function card(r) {
    return '<a class="cover-card" href="' + noteUrl(r) + '">' +
      '<div class="cover-img"><img src="' + coverUrl(r) + '" alt="' + esc(r.name) + ' report, first page" loading="lazy" width="560" height="725"></div>' +
      '<div class="cover-meta"><div class="cover-top"><span class="tick">' + r.ticker + '</span><span class="badge ' + cls(r) + '">' + esc(r.rating) + "</span></div>" +
      "<h3>" + esc(r.name) + "</h3><p>" + esc(r.headline) + "</p>" +
      '<div class="cover-foot"><span>' + r.dateLabel + " · " + esc(r.sector) + '</span><span class="num ' + moveCls(r) + '">' + esc(r.moveLabel) + "</span></div></div></a>";
  }
  var strip = $("#library");
  if (strip) strip.innerHTML = R.map(card).join("");

  /* ---------- Coverage table ---------- */
  function buildTable(root) {
    var limit = parseInt(root.getAttribute("data-limit") || "0", 10);
    var tools = root.hasAttribute("data-tools");
    var state = { type: "all", sector: "all", q: "", key: "date", dir: -1, open: null, view: "table" };
    var sectors = [];
    R.forEach(function (r) { if (sectors.indexOf(r.sector) < 0) sectors.push(r.sector); });

    var html = "";
    if (tools) {
      html += '<div class="toolbar"><div class="chips" role="group" aria-label="Position">' +
        [["all", "All"], ["long", "Long"], ["short", "Short"], ["credit", "Credit"]].map(function (f, i) {
          return '<button class="chip' + (i ? "" : " on") + '" data-type="' + f[0] + '">' + f[1] + "</button>";
        }).join("") + '</div><div class="chips" role="group" aria-label="Sector"><button class="chip on" data-sector="all">All sectors</button>' +
        sectors.map(function (s) { return '<button class="chip" data-sector="' + s + '">' + s + "</button>"; }).join("") +
        '</div><div class="tool-right"><input class="search" type="search" placeholder="Filter company or ticker" aria-label="Filter coverage">' +
        '<div class="seg" role="group" aria-label="View"><button class="on" data-view="table">Table</button><button data-view="cards">Covers</button></div></div></div>';
    }
    html += '<div class="table-wrap"><table class="cov"><thead><tr>' +
      [["date", "Date", 1], ["name", "Company", 1], ["sector", "Sector", 1], ["", "Rating"], ["", "Ref. price", 0, "r"], ["", "Target", 0, "r"], ["move", "Implied move", 1, "r"], ["", ""]].map(function (c) {
        return '<th class="' + (c[2] ? "sortable " : "") + (c[3] || "") + '"' + (c[2] ? ' data-key="' + c[0] + '"' : "") + ">" + c[1] + (c[2] ? '<span class="dir"></span>' : "") + "</th>";
      }).join("") + '</tr></thead><tbody></tbody></table></div><div class="cards-grid" hidden></div>';
    root.innerHTML = html;
    var tbody = $("tbody", root), grid = $(".cards-grid", root), wrap = $(".table-wrap", root);

    function list() {
      var l = R.filter(function (r) {
        if (state.type !== "all" && r.type !== state.type) return false;
        if (state.sector !== "all" && r.sector !== state.sector) return false;
        if (state.q && (r.name + " " + r.ticker + " " + r.tags.join(" ")).toLowerCase().indexOf(state.q) < 0) return false;
        return true;
      }).sort(function (a, b) {
        var x = a[state.key], y = b[state.key];
        if (x == null) return 1; if (y == null) return -1;
        return (x > y ? 1 : x < y ? -1 : 0) * state.dir;
      });
      return limit ? l.slice(0, limit) : l;
    }
    function render() {
      var l = list();
      wrap.hidden = state.view !== "table"; grid.hidden = state.view !== "cards";
      if (state.view === "cards") { grid.innerHTML = l.length ? l.map(card).join("") : '<p class="empty">No reports match these filters.</p>'; return; }
      if (!l.length) { tbody.innerHTML = '<tr><td colspan="8" class="empty">No reports match these filters.</td></tr>'; return; }
      tbody.innerHTML = l.map(function (r) {
        var open = state.open === r.ticker;
        return '<tr class="row' + (open ? " open" : "") + '" data-t="' + r.ticker + '" tabindex="0" aria-expanded="' + open + '">' +
          '<td class="num small">' + r.dateLabel + '</td><td class="co"><b>' + esc(r.name) + "</b><span>" + r.ticker + " · " + esc(r.exch) + "</span></td>" +
          '<td class="sec">' + esc(r.sector) + '</td><td><span class="badge ' + cls(r) + '">' + esc(r.rating) + "</span></td>" +
          '<td class="r num">' + esc(r.type === "credit" ? "n/a" : r.ref) + '</td><td class="r num">' + esc(r.type === "credit" ? "n/a" : r.target) + "</td>" +
          '<td class="r num ' + moveCls(r) + '"><b style="font-weight:600">' + esc(r.moveLabel) + '</b></td><td class="r"><span class="chev">›</span></td></tr>' +
          (open ? '<tr class="detail"><td colspan="8"><div class="inner"><div><div class="detail-head">' + esc(r.headline) + "</div><p>" + esc(r.summary) + '</p><div class="tags">' + r.tags.map(esc).join(" · ") +
            '</div></div><div class="detail-cta"><a class="btn btn-solid" href="' + noteUrl(r) + '">Open note <span class="arr">→</span></a><a class="link" href="' + pdfUrl(r) + '" target="_blank" rel="noopener">PDF</a></div></div></td></tr>' : "");
      }).join("");
      $$("th[data-key]", root).forEach(function (th) {
        $(".dir", th).textContent = th.getAttribute("data-key") === state.key ? (state.dir > 0 ? "↑" : "↓") : "";
      });
    }
    tbody.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      var tr = e.target.closest("tr.row"); if (!tr) return;
      var t = tr.getAttribute("data-t"); state.open = state.open === t ? null : t; render();
    });
    tbody.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target.matches("tr.row")) { e.preventDefault(); e.target.click(); }
    });
    $$("th[data-key]", root).forEach(function (th) {
      th.addEventListener("click", function () {
        var k = th.getAttribute("data-key");
        if (state.key === k) state.dir *= -1; else { state.key = k; state.dir = k === "name" || k === "sector" ? 1 : -1; }
        render();
      });
    });
    if (tools) {
      var group = function (attr, key) {
        $$("[" + attr + "]", root).forEach(function (b) {
          b.addEventListener("click", function () {
            $$("[" + attr + "]", root).forEach(function (x) { x.classList.remove("on"); });
            b.classList.add("on"); state[key] = b.getAttribute(attr); render();
          });
        });
      };
      group("data-type", "type"); group("data-sector", "sector"); group("data-view", "view");
      $(".search", root).addEventListener("input", function (e) { state.q = e.target.value.trim().toLowerCase(); render(); });
    }
    render();
  }
  $$("[data-coverage]").forEach(buildTable);

  /* ---------- Cohort DCF engine ---------- */
  var CAL = 954.3 / 954.7696; // FCF inputs are rounded to £0.1m; scales PVs so the base case ties to the reported EV of £954.3m
  function dcf(w, g) {
    w /= 100; g /= 100;
    var pv = 0;
    M.fcf.forEach(function (f, i) { pv += f / Math.pow(1 + w, i + 1); });
    var last = M.fcf[M.fcf.length - 1];
    var pvtv = last * (1 + g) / (w - g) / Math.pow(1 + w, M.fcf.length);
    pv *= CAL; pvtv *= CAL;
    var ev = pv + pvtv, eq = ev + M.cash - M.debt - M.nci;
    return { pv: pv, pvtv: pvtv, ev: ev, eq: eq, ps: eq / M.shares * 100, tvShare: pvtv / ev };
  }
  function blended(ps) { return ps * M.weights.dcf + M.comps * M.weights.comps + M.rim * M.weights.rim; }

  /* ---------- Charts ---------- */
  function lab(v, unit) {
    if (unit === "p") return fmt(v) + "p";
    var d = v < 100 && v % 1 ? 2 : 0;
    return unit + v.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function axis(x, top, bottom, unit, ticks) {
    return ticks.map(function (t) {
      return '<line x1="' + x(t) + '" x2="' + x(t) + '" y1="' + top + '" y2="' + bottom + '" stroke="' + RULE + '"/>' +
        '<text x="' + x(t) + '" y="' + (bottom + 16) + '" font-size="10.5" fill="' + MUTED + '" text-anchor="middle">' + lab(t, unit) + "</text>";
    }).join("");
  }
  function niceTicks(min, max, n) {
    var span = max - min, step = Math.pow(10, Math.floor(Math.log10(span / n)));
    [1, 2, 2.5, 5, 10].some(function (m) { if (span / (step * m) <= n) { step *= m; return true; } return false; });
    var out = [], t = Math.floor(min / step) * step;
    for (; t <= max + step - 1e-9; t += step) out.push(+t.toFixed(4));
    return out;
  }
  function marker(px, top, bottom, text, col, dashed) {
    return '<line x1="' + px + '" x2="' + px + '" y1="' + (top - 8) + '" y2="' + bottom + '" stroke="' + col + '"' + (dashed ? ' stroke-dasharray="3 3"' : ' stroke-width="2"') + '/>' +
      '<text x="' + px + '" y="' + (top - 12) + '" font-size="10.5" fill="' + (col === GOLD ? "#8c6f2f" : col) + '" font-weight="' + (dashed ? 400 : 600) + '" text-anchor="middle">' + text + "</text>";
  }

  function footballField(el) {
    var lo = dcf(8.0, 2.0).ps, hi = dcf(7.0, 3.0).ps, target = blended(dcf(M.wacc, M.g).ps);
    var rows = [
      { label: "DCF", sub: "WACC 7.0 to 8.0%, g 2.0 to 3.0%", lo: lo, hi: hi },
      { label: "Trading comps", sub: "EV/EBITDA to EV/Sales", lo: M.compsRange[0], hi: M.compsRange[1] },
      { label: "Residual income", sub: "Book value and ROE spread", lo: M.rim, hi: M.rim },
      { label: "DDM", sub: "Reference only, 0% weight", lo: M.ddm, hi: M.ddm, ref: true }
    ];
    var W = 520, labW = 150, padR = 14, rowH = 40, top = 26, H = top + rows.length * rowH + 26, min = 400, max = 2600;
    var x = function (v) { return labW + (v - min) / (max - min) * (W - labW - padR); };
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Valuation range by method">' + axis(x, top - 6, H - 22, "p", [500, 1000, 1500, 2000, 2500]);
    rows.forEach(function (r, i) {
      var y = top + i * rowH, tip = r.label + ": " + (r.lo === r.hi ? fmt(r.lo) + "p" : fmt(r.lo) + "p to " + fmt(r.hi) + "p");
      s += '<text x="0" y="' + (y + 14) + '" font-size="12.5" fill="' + NAVY + '" font-weight="500">' + r.label + '</text><text x="0" y="' + (y + 28) + '" font-size="10.5" fill="' + MUTED + '">' + r.sub + "</text><g><title>" + tip + "</title>";
      if (r.lo === r.hi) s += '<rect x="' + (x(r.lo) - 3) + '" y="' + (y + 6) + '" width="6" height="18" rx="2" fill="' + (r.ref ? "#b9b4a8" : NAVY2) + '"/><text x="' + (x(r.lo) + 9) + '" y="' + (y + 19) + '" font-size="11" fill="#3a3f47">' + fmt(r.lo) + "p</text>";
      else s += '<rect x="' + x(r.lo) + '" y="' + (y + 6) + '" width="' + (x(r.hi) - x(r.lo)) + '" height="18" rx="2" fill="' + NAVY2 + '" opacity="' + (i ? 0.78 : 1) + '"/><text x="' + (x(r.lo) - 5) + '" y="' + (y + 19) + '" font-size="11" fill="#3a3f47" text-anchor="end">' + fmt(r.lo) + '</text><text x="' + (x(r.hi) + 5) + '" y="' + (y + 19) + '" font-size="11" fill="#3a3f47">' + fmt(r.hi) + "</text>";
      s += "</g>";
    });
    s += marker(x(M.price), top, H - 22, "Price " + fmt(M.price) + "p", NAVY, true) + marker(x(target), top, H - 22, "Target " + fmt(target) + "p", GOLD, false) + "</svg>";
    el.innerHTML = s;
  }

  function scenarios(el, c) {
    var vals = c.rows.map(function (r) { return r[1]; }).concat([c.price]);
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals), pad = (hi - lo) * 0.22;
    var ticks = niceTicks(Math.max(0, lo - pad), hi + pad, 5), min = ticks[0], max = ticks[ticks.length - 1];
    var W = 520, labW = 52, padR = 12, rowH = 44, top = 30, H = top + c.rows.length * rowH + 24;
    var x = function (v) { return labW + (v - min) / (max - min) * (W - labW - padR); };
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Scenario values against reference price">' + axis(x, top - 6, H - 22, c.unit, ticks);
    c.rows.forEach(function (r, i) {
      var y = top + i * rowH + 8, v = r[1], up = (v / c.price - 1) * 100, col = v >= c.price ? BUY : SELL;
      var a = Math.min(x(v), x(c.price)), b = Math.max(x(v), x(c.price)), right = v >= c.price;
      s += '<g><title>' + r[0] + ": " + lab(v, c.unit) + " (" + (up >= 0 ? "+" : "") + up.toFixed(1) + '%)</title><text x="0" y="' + (y + 13) + '" font-size="12.5" font-weight="' + (r[0] === "Base" ? 600 : 400) + '" fill="' + NAVY + '">' + r[0] + "</text>" +
        '<rect x="' + a + '" y="' + y + '" width="' + Math.max(2, b - a) + '" height="18" rx="2" fill="' + col + '" opacity="' + (r[0] === "Base" ? 1 : 0.5) + '"/>' +
        '<text x="' + (right ? b + 6 : a - 6) + '" y="' + (y + 13) + '" font-size="11.5" fill="' + NAVY + '" text-anchor="' + (right ? "start" : "end") + '" font-weight="500">' + lab(v, c.unit) + ' <tspan fill="' + col + '">' + (up >= 0 ? "+" : "") + up.toFixed(1) + "%</tspan></text></g>";
    });
    s += marker(x(c.price), top, H - 22, "Ref. price " + lab(c.price, c.unit), NAVY, true) + "</svg>";
    el.innerHTML = s;
  }

  function range(el, c) {
    var pts = [c.price, c.lo, c.hi].concat(c.street ? [c.street] : []);
    var lo = Math.min.apply(null, pts), hi = Math.max.apply(null, pts), pad = (hi - lo) * 0.25;
    var ticks = niceTicks(lo - pad, hi + pad, 5), min = ticks[0], max = ticks[ticks.length - 1];
    var W = 520, padL = 16, padR = 16, top = 44, H = 132;
    var x = function (v) { return padL + (v - min) / (max - min) * (W - padL - padR); };
    var y = top + 10, s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Reference price against target">' + axis(x, top - 14, H - 26, c.unit, ticks);
    s += '<line x1="' + x(c.price) + '" x2="' + x(c.lo) + '" y1="' + (y + 9) + '" y2="' + (y + 9) + '" stroke="' + BUY + '" stroke-width="2" stroke-dasharray="2 4"/>';
    s += c.hi > c.lo ? '<rect x="' + x(c.lo) + '" y="' + y + '" width="' + (x(c.hi) - x(c.lo)) + '" height="18" rx="2" fill="' + BUY + '"/>' : '<rect x="' + (x(c.lo) - 4) + '" y="' + y + '" width="8" height="18" rx="2" fill="' + BUY + '"/>';
    s += '<text x="' + x((c.lo + c.hi) / 2) + '" y="' + (y - 8) + '" font-size="11" font-weight="600" fill="' + BUY + '" text-anchor="middle">Target ' + (c.hi > c.lo ? lab(c.lo, c.unit) + " to " + lab(c.hi, c.unit) : lab(c.lo, c.unit)) + "</text>";
    s += '<circle cx="' + x(c.price) + '" cy="' + (y + 9) + '" r="6" fill="' + NAVY + '" stroke="#fff" stroke-width="2"/><text x="' + x(c.price) + '" y="' + (y - 8) + '" font-size="11" fill="' + NAVY + '" text-anchor="middle">Ref. ' + lab(c.price, c.unit) + "</text>";
    if (c.street) s += '<line x1="' + x(c.street) + '" x2="' + x(c.street) + '" y1="' + (y - 2) + '" y2="' + (y + 20) + '" stroke="' + GOLD + '" stroke-width="2"/><text x="' + x(c.street) + '" y="' + (y + 36) + '" font-size="10.5" fill="#8c6f2f" text-anchor="middle">Street ' + lab(c.street, c.unit) + "</text>";
    el.innerHTML = s + "</svg>";
  }

  function recovery(el, c) {
    var W = 520, labW = 128, padR = 50, rowH = 44, top = 8, H = top + c.rows.length * rowH + 4;
    var max = Math.max.apply(null, c.rows.map(function (r) { return r[1]; }));
    var x = function (v) { return v / max * (W - labW - padR); };
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Claims and estimated recovery by tranche">';
    c.rows.forEach(function (r, i) {
      var y = top + i * rowH, rec = r[1] * r[2] / 100;
      s += '<g><title>' + r[0] + ": $" + r[1] + "m claim, around " + r[2] + '% recovery</title><text x="0" y="' + (y + 14) + '" font-size="12.5" fill="' + NAVY + '" font-weight="500">' + r[0] + '</text><text x="0" y="' + (y + 28) + '" font-size="10.5" fill="' + MUTED + '">$' + r[1] + "m claim</text>" +
        '<rect x="' + labW + '" y="' + (y + 5) + '" width="' + x(r[1]) + '" height="20" rx="2" fill="#e4e9f0"/>' +
        '<rect x="' + labW + '" y="' + (y + 5) + '" width="' + Math.max(2, x(rec)) + '" height="20" rx="2" fill="' + NAVY2 + '"/>' +
        '<text x="' + (labW + x(r[1]) + 8) + '" y="' + (y + 19) + '" font-size="12" font-weight="600" fill="' + NAVY + '">' + r[2] + "%</text></g>";
    });
    el.innerHTML = s + '</svg><div class="legend dark-ink"><span><i style="background:#1a2e45"></i>Estimated recovery</span><span><i style="background:#e4e9f0"></i>Unrecovered claim</span></div>';
  }

  var ff = $("#ff");
  if (ff && M) footballField(ff);

  /* ---------- Interactive model ---------- */
  var MODEL_HTML = '<div class="model-grid"><div class="model-controls">' +
    '<div class="ctrl"><div class="ctrl-top"><label for="in-wacc">WACC</label><output id="o-wacc">7.26%</output></div><input id="in-wacc" type="range" min="6.5" max="8.5" step="0.01" value="7.26"><div class="ctrl-scale"><span>6.5%</span><span>Base 7.26%</span><span>8.5%</span></div></div>' +
    '<div class="ctrl"><div class="ctrl-top"><label for="in-g">Terminal growth</label><output id="o-g">2.5%</output></div><input id="in-g" type="range" min="1.5" max="3.5" step="0.1" value="2.5"><div class="ctrl-scale"><span>1.5%</span><span>Base 2.5%</span><span>3.5%</span></div></div>' +
    '<div class="eyebrow" style="margin-top:6px">Equity bridge</div><table class="bridge">' +
    '<tr><td>PV of FCF, FY27E to FY34E</td><td id="b-pv"></td></tr><tr><td>PV of terminal value</td><td id="b-tv"></td></tr><tr class="total"><td>Enterprise value</td><td id="b-ev"></td></tr>' +
    '<tr><td>Plus cash</td><td>£49.6m</td></tr><tr><td>Less borrowings</td><td>(£47.4m)</td></tr><tr><td>Less non-controlling interests</td><td>(£1.8m)</td></tr>' +
    '<tr class="total"><td>Equity value</td><td id="b-eq"></td></tr><tr><td>Diluted shares</td><td>46.6m</td></tr><tr class="total"><td>DCF value per share</td><td id="b-ps"></td></tr></table>' +
    '<button class="reset" id="reset" type="button">Reset to base case</button></div><div class="model-out"><div class="out-top">' +
    '<div class="out"><div class="out-label">DCF value</div><div class="out-val num" id="v-dcf"></div><div class="out-sub" id="v-dcf-up"></div></div>' +
    '<div class="out"><div class="out-label">Blended target</div><div class="out-val num" id="v-tgt"></div><div class="out-sub" id="v-tgt-up"></div></div>' +
    '<div class="out"><div class="out-label">TV share of EV</div><div class="out-val num" id="v-tv"></div><div class="out-sub">Report base case 71.0%</div></div></div>' +
    '<div class="sens-head"><div class="eyebrow">Sensitivity · DCF value per share (p)</div><span>Click a cell to load it</span></div><table class="sens" id="sens" aria-label="WACC and terminal growth sensitivity"></table>' +
    '<div class="legend"><span><i style="background:#e4e9f0"></i>Lower value</span><span><i style="background:#2f527a"></i>Higher value</span><span>Reference price 1,194p</span></div>' +
    '<div class="blend"><div class="eyebrow">Blended target build</div><div class="blend-bar"><div id="bl-dcf" style="background:#2f527a"></div><div id="bl-comps" style="background:#4d7096;border-left:2px solid #0d1b2a"></div><div id="bl-rim" style="background:#6b7d92;border-left:2px solid #0d1b2a"></div></div>' +
    '<p class="small" style="margin-top:12px">Comps (1,812p) and residual income (1,355p) are held at report values. The DDM (624p) is shown for reference and excluded from the blend because of Cohort\'s 30% to 32% payout ratio.</p></div></div></div>';

  function initModel(root) {
    root.innerHTML = MODEL_HTML;
    var wI = $("#in-wacc"), gI = $("#in-g"), sens = $("#sens");
    var waccs = [6.5, 7.0, 7.5, 8.0, 8.5], gs = [1.5, 2.0, 2.5, 3.0, 3.5];
    var ramp = ["#e4e9f0", "#c3cfde", "#9cb0c8", "#7290b0", "#4d7096", "#2f527a"];
    var vals = []; waccs.forEach(function (w) { gs.forEach(function (g) { vals.push(dcf(w, g).ps); }); });
    var vmin = Math.min.apply(null, vals), vmax = Math.max.apply(null, vals);
    var shade = function (v) { return Math.min(ramp.length - 1, Math.floor((v - vmin) / (vmax - vmin + 1e-9) * ramp.length)); };
    sens.innerHTML = '<thead><tr><th class="corner">WACC \\ g</th>' + gs.map(function (g) { return "<th>" + g.toFixed(1) + "%</th>"; }).join("") + "</tr></thead><tbody>" +
      waccs.map(function (w) {
        return "<tr><th>" + w.toFixed(1) + "%</th>" + gs.map(function (g) {
          var v = dcf(w, g).ps, up = (v / M.price - 1) * 100, k = shade(v);
          return '<td data-w="' + w + '" data-g="' + g + '" style="background:' + ramp[k] + (k >= 4 ? ";color:#fff" : "") + '" title="WACC ' + w.toFixed(1) + "%, g " + g.toFixed(1) + "%: " + fmt(v) + "p, " + (up >= 0 ? "+" : "") + up.toFixed(1) + '% vs 1,194p">' + fmt(v) + "</td>";
        }).join("") + "</tr>";
      }).join("") + "</tbody>";
    function upd() {
      var w = parseFloat(wI.value), g = parseFloat(gI.value), d = dcf(w, g), t = blended(d.ps);
      var uD = (d.ps / M.price - 1) * 100, uT = (t / M.price - 1) * 100;
      $("#o-wacc").textContent = w.toFixed(2) + "%"; $("#o-g").textContent = g.toFixed(1) + "%";
      $("#v-dcf").textContent = fmt(d.ps) + "p"; $("#v-tgt").textContent = fmt(t) + "p"; $("#v-tv").textContent = (d.tvShare * 100).toFixed(1) + "%";
      $("#v-dcf-up").textContent = (uD >= 0 ? "+" : "") + uD.toFixed(1) + "% vs 1,194p"; $("#v-dcf-up").className = "out-sub " + (uD >= 0 ? "pos" : "neg");
      $("#v-tgt-up").textContent = (uT >= 0 ? "+" : "") + uT.toFixed(1) + "% implied"; $("#v-tgt-up").className = "out-sub " + (uT >= 0 ? "pos" : "neg");
      $("#b-pv").textContent = "£" + d.pv.toFixed(1) + "m"; $("#b-tv").textContent = "£" + d.pvtv.toFixed(1) + "m"; $("#b-ev").textContent = "£" + d.ev.toFixed(1) + "m";
      $("#b-eq").textContent = "£" + d.eq.toFixed(1) + "m"; $("#b-ps").textContent = fmt(d.ps) + "p";
      var c = [d.ps * M.weights.dcf, M.comps * M.weights.comps, M.rim * M.weights.rim];
      [["#bl-dcf", "DCF 50%"], ["#bl-comps", "Comps 30%"], ["#bl-rim", "RI 20%"]].forEach(function (b, i) {
        var el = $(b[0]); el.style.flexBasis = (c[i] / t * 100) + "%"; el.textContent = b[1] + " · " + fmt(c[i]) + "p";
      });
      $$("td", sens).forEach(function (td) {
        td.classList.toggle("sel", Math.abs(parseFloat(td.getAttribute("data-w")) - w) < 0.01 && Math.abs(parseFloat(td.getAttribute("data-g")) - g) < 0.01);
      });
    }
    wI.addEventListener("input", upd); gI.addEventListener("input", upd);
    sens.addEventListener("click", function (e) { var td = e.target.closest("td"); if (!td) return; wI.value = td.getAttribute("data-w"); gI.value = td.getAttribute("data-g"); upd(); });
    $("#reset").addEventListener("click", function () { wI.value = M.wacc; gI.value = M.g; upd(); });
    upd();
  }

  /* ---------- Report note page ---------- */
  var noteRoot = $("#note");
  if (noteRoot) {
    var tk = document.body.getAttribute("data-ticker");
    var idx = -1;
    R.forEach(function (r, k) { if (r.ticker === tk) idx = k; });
    if (idx > -1) renderNote(noteRoot, R[idx], R[idx - 1], R[idx + 1]);
  }
  function renderNote(root, r, newer, older) {
    var kpis = r.type === "credit" ? r.stats.slice(2, 6) : [["Reference price", r.ref], ["12-month target", r.target], [r.move < 0 ? "Implied downside" : "Implied upside", r.moveLabel, moveCls(r)], r.stats[0]];
    var chartTitle = { football: "Valuation range by method (p per share)", scenarios: "Scenario values against reference price", range: "Reference price against target", recovery: "Estimated recovery by tranche" }[r.chart.type];
    var h = '<section class="note-head"><div class="wrap">' +
      '<a class="back" href="' + ROOT + 'research.html">← Research archive</a>' +
      '<div class="note-title"><div><div class="eyebrow">' + esc(r.tags.join(" · ")) + " · " + r.dateLabel + "</div><h1>" + esc(r.name) + '</h1><div class="note-tick">' + r.ticker + " · " + esc(r.exch) + '</div><p class="lede">' + esc(r.headline) + ".</p></div>" +
      '<div class="note-rating"><span class="badge big ' + cls(r) + '">' + esc(r.rating) + '</span><a class="btn btn-solid" href="' + pdfUrl(r) + '" target="_blank" rel="noopener">Read full report <span class="arr">→</span></a></div></div>' +
      '<div class="kpi-row note-kpis">' + kpis.map(function (k) { return '<div class="kpi"><div class="kpi-val num ' + (k[2] || "") + '">' + esc(k[1]) + '</div><div class="kpi-label">' + esc(k[0]) + "</div></div>"; }).join("") + "</div></div></section>";

    h += '<section class="section note-body"><div class="wrap note-grid"><div class="note-main">' +
      '<div class="debate reveal"><div><div class="eyebrow muted">Key debate</div><p>' + esc(r.debate) + '</p></div><div><div class="eyebrow">Drumoak view</div><p>' + esc(r.view) + "</p></div></div>" +
      '<h2 class="h3 reveal">' + (r.type === "credit" ? "The analysis" : "Investment thesis") + '</h2><ol class="pillars reveal">' + r.pillars.map(function (p, k) {
        return '<li><span class="n">0' + (k + 1) + "</span><div><h3>" + esc(p[0]) + "</h3><p>" + esc(p[1]) + "</p></div></li>";
      }).join("") + "</ol>" +
      '<h2 class="h3 reveal">' + (r.type === "credit" ? "Recoveries" : "Valuation") + '</h2><div class="panel chart-panel reveal"><div class="ff-title"><span>' + chartTitle + '</span></div><div id="note-chart" class="ff"></div></div>' +
      '<ul class="val-list reveal">' + r.valuation.map(function (v) { return "<li>" + esc(v) + "</li>"; }).join("") + "</ul>" +
      '<div class="cr-grid reveal"><div><h2 class="h3">' + (r.type === "credit" ? "Key dates" : "Catalysts") + '</h2><ul class="dash">' + r.catalysts.map(function (v) { return "<li>" + esc(v) + "</li>"; }).join("") + "</ul></div>" +
      '<div><h2 class="h3">' + (r.type === "short" ? "Risks to the short" : "Risks") + '</h2><ul class="dash risk">' + r.risks.map(function (v) { return "<li>" + esc(v) + "</li>"; }).join("") + "</ul></div></div>" +
      "</div>" +
      '<aside class="note-side"><div class="side-block"><div class="eyebrow">Key figures</div><dl>' + r.stats.map(function (s) { return "<dt>" + esc(s[0]) + '</dt><dd class="num">' + esc(s[1]) + "</dd>"; }).join("") + "</dl></div>" +
      '<a class="side-cover" href="' + pdfUrl(r) + '" target="_blank" rel="noopener"><img src="' + coverUrl(r) + '" alt="First page of the ' + esc(r.name) + ' report" loading="lazy" width="560" height="725"><span>Open PDF ↗</span></a></aside></div></section>';

    if (r.model) h += '<section class="section dark" id="model"><div class="wrap"><div class="section-head reveal"><div><div class="eyebrow">Interactive model</div><h2 class="h2">Stress the DCF yourself</h2><p class="muted">FY27E to FY34E unlevered free cash flows from the report, discounted live. Move WACC and terminal growth or click any cell in the grid.</p></div></div><div class="reveal" id="model-root"></div></div></section>';

    h += '<section class="section surface pdf-section"><div class="wrap"><div class="section-head"><div><div class="eyebrow">Full report</div><h2 class="h2">Read the note</h2></div><a class="link" href="' + pdfUrl(r) + '" download>Download PDF</a></div>' +
      '<div class="pdf-wrap"><iframe class="pdf-frame" src="' + pdfUrl(r) + '#view=FitH" title="' + esc(r.name) + ' report" loading="lazy"></iframe>' +
      '<div class="pdf-fallback"><img src="' + coverUrl(r) + '" alt="" loading="lazy"><a class="btn btn-solid" href="' + pdfUrl(r) + '" target="_blank" rel="noopener">Open the full PDF <span class="arr">→</span></a></div></div></div></section>';

    h += '<nav class="note-nav" aria-label="More research"><div class="wrap note-nav-inner">' +
      (newer ? '<a href="' + noteUrl(newer) + '"><span class="small">← Newer</span><b>' + esc(newer.name) + "</b></a>" : "<span></span>") +
      (older ? '<a class="older" href="' + noteUrl(older) + '"><span class="small">Older →</span><b>' + esc(older.name) + "</b></a>" : "<span></span>") + "</div></nav>";

    root.innerHTML = h;
    var ch = $("#note-chart");
    if (r.chart.type === "football") footballField(ch);
    else if (r.chart.type === "scenarios") scenarios(ch, r.chart);
    else if (r.chart.type === "range") range(ch, r.chart);
    else if (r.chart.type === "recovery") recovery(ch, r.chart);
  }
  var modelRoot = $("#model-root");
  if (modelRoot && M) initModel(modelRoot);

  /* ---------- Quick search (Ctrl/Cmd + K, or /) ---------- */
  var pages = [["Home", "index.html"], ["Research archive", "research.html"], ["About and methodology", "about.html"], ["Contact", "contact.html"]];
  var pal = document.createElement("div");
  pal.className = "palette"; pal.hidden = true;
  pal.innerHTML = '<div class="palette-box" role="dialog" aria-modal="true" aria-label="Search"><input type="text" placeholder="Search reports, tickers, sectors" aria-label="Search"><ul></ul><div class="palette-foot"><span>↑ ↓ to move</span><span>Enter to open</span><span>Esc to close</span></div></div>';
  document.body.appendChild(pal);
  var pin = $("input", pal), pul = $("ul", pal), items = [], sel = 0;
  function pRender() {
    var q = pin.value.trim().toLowerCase();
    var rs = R.filter(function (r) { return !q || (r.name + " " + r.ticker + " " + r.sector + " " + r.tags.join(" ") + " " + r.rating).toLowerCase().indexOf(q) > -1; })
      .map(function (r) { return { href: noteUrl(r), html: '<b class="tick">' + r.ticker + "</b><span>" + esc(r.name) + '</span><span class="badge ' + cls(r) + '">' + esc(r.rating) + '</span><span class="num ' + moveCls(r) + '">' + esc(r.type === "credit" ? "Credit" : r.moveLabel) + "</span>" }; });
    var ps = pages.filter(function (p) { return !q || p[0].toLowerCase().indexOf(q) > -1; }).map(function (p) { return { href: ROOT + p[1], html: '<b class="tick">Page</b><span>' + p[0] + "</span>" }; });
    items = rs.concat(ps); sel = 0;
    pul.innerHTML = items.length ? items.map(function (it, k) { return '<li class="' + (k ? "" : "on") + '"><a href="' + it.href + '">' + it.html + "</a></li>"; }).join("") : '<li class="none">No matches</li>';
  }
  function pOpen() { pal.hidden = false; pin.value = ""; pRender(); setTimeout(function () { pin.focus(); }, 0); document.documentElement.style.overflow = "hidden"; }
  function pClose() { pal.hidden = true; document.documentElement.style.overflow = ""; }
  function pMove(d) { var lis = $$("li", pul); if (!items.length) return; lis[sel].classList.remove("on"); sel = (sel + d + items.length) % items.length; lis[sel].classList.add("on"); lis[sel].scrollIntoView({ block: "nearest" }); }
  pin.addEventListener("input", pRender);
  pin.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); pMove(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); pMove(-1); }
    else if (e.key === "Enter" && items[sel]) location.href = items[sel].href;
  });
  pal.addEventListener("click", function (e) { if (e.target === pal) pClose(); });
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); if (pal.hidden) pOpen(); else pClose(); }
    else if (e.key === "/" && pal.hidden && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); pOpen(); }
    else if (e.key === "Escape" && !pal.hidden) pClose();
  });
  $$(".search-btn").forEach(function (b) {
    b.addEventListener("click", pOpen);
    var k = $("kbd", b); if (k && !/Mac|iPhone|iPad/.test(navigator.platform)) k.textContent = "Ctrl K";
  });

  /* ---------- Reveal on scroll ---------- */
  var els = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add("in"); });
  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();
})();

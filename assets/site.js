(function () {
  "use strict";
  var R = window.DRUMOAK_REPORTS || [];
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var fmt = function (n) { return Math.round(n).toLocaleString("en-GB"); };
  var ratingClass = function (r) { return r.type === "long" ? "buy" : r.type === "short" ? "sell" : "credit"; };
  var moveClass = function (r) { return r.move == null ? "" : r.move >= 0 ? "pos" : "neg"; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* ---------- Nav ---------- */
  var toggle = $(".nav-toggle"), links = $(".nav-links");
  if (toggle && links) toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  /* ---------- Coverage tape ---------- */
  var tape = $("#tape");
  if (tape) {
    tape.innerHTML = R.map(function (r) {
      var mv = r.move == null ? r.rating : r.moveLabel;
      return '<a class="tape-item" href="' + encodeURI(r.pdf) + '" target="_blank" rel="noopener">' +
        "<b>" + r.ticker + "</b>" +
        '<span class="r ' + (r.type === "long" ? "pos" : r.type === "short" ? "neg" : "") + '">' + esc(r.rating.toUpperCase()) + "</span>" +
        '<span class="num">' + esc(r.type === "credit" ? "" : r.target) + "</span>" +
        '<span class="num ' + moveClass(r) + '">' + esc(r.type === "credit" ? "Restructuring" : mv) + "</span></a>";
    }).join("");
  }

  /* ---------- Counts ---------- */
  $$("[data-count]").forEach(function (el) {
    var k = el.getAttribute("data-count");
    var n = k === "all" ? R.length : R.filter(function (r) { return r.type === k; }).length;
    el.textContent = n;
  });

  /* ---------- Coverage table ---------- */
  function buildTable(root) {
    var limit = parseInt(root.getAttribute("data-limit") || "0", 10);
    var withTools = root.hasAttribute("data-tools");
    var state = { type: "all", sector: "all", q: "", key: "date", dir: -1, open: null };

    var sectors = [];
    R.forEach(function (r) { if (sectors.indexOf(r.sector) < 0) sectors.push(r.sector); });

    var html = "";
    if (withTools) {
      html += '<div class="toolbar"><div class="chips" role="group" aria-label="Filter by position">' +
        [["all", "All"], ["long", "Long"], ["short", "Short"], ["credit", "Credit"]].map(function (f, i) {
          return '<button class="chip' + (i === 0 ? " on" : "") + '" data-type="' + f[0] + '">' + f[1] + "</button>";
        }).join("") +
        '</div><div class="chips" role="group" aria-label="Filter by sector"><button class="chip on" data-sector="all">All sectors</button>' +
        sectors.map(function (s) { return '<button class="chip" data-sector="' + s + '">' + s + "</button>"; }).join("") +
        '</div><input class="search" type="search" placeholder="Search company or ticker" aria-label="Search coverage"></div>';
    }
    var cols = [
      ["date", "Date", "sortable"], ["name", "Company", "sortable"], ["sector", "Sector", "sortable"],
      ["rating", "Rating", ""], ["ref", "Ref. price", "r"], ["target", "Target", "r"],
      ["move", "Implied move", "sortable r"], ["", "", ""]
    ];
    html += '<div class="table-wrap"><table class="cov"><thead><tr>' + cols.map(function (c) {
      return '<th class="' + c[2] + '"' + (c[2].indexOf("sortable") > -1 ? ' data-key="' + c[0] + '"' : "") + ">" + c[1] +
        (c[2].indexOf("sortable") > -1 ? '<span class="dir"></span>' : "") + "</th>";
    }).join("") + "</tr></thead><tbody></tbody></table></div>";
    root.innerHTML = html;
    var tbody = $("tbody", root);

    function rows() {
      var list = R.filter(function (r) {
        if (state.type !== "all" && r.type !== state.type) return false;
        if (state.sector !== "all" && r.sector !== state.sector) return false;
        if (state.q) {
          var hay = (r.name + " " + r.ticker + " " + r.tags.join(" ")).toLowerCase();
          if (hay.indexOf(state.q) < 0) return false;
        }
        return true;
      });
      list.sort(function (a, b) {
        var x = a[state.key], y = b[state.key];
        if (x == null) return 1; if (y == null) return -1;
        return (x > y ? 1 : x < y ? -1 : 0) * state.dir;
      });
      if (limit) list = list.slice(0, limit);
      return list;
    }

    function render() {
      var list = rows();
      if (!list.length) { tbody.innerHTML = '<tr><td colspan="8" class="empty">No reports match these filters.</td></tr>'; return; }
      tbody.innerHTML = list.map(function (r) {
        var open = state.open === r.ticker;
        var main = '<tr class="row' + (open ? " open" : "") + '" data-t="' + r.ticker + '" tabindex="0" aria-expanded="' + open + '">' +
          '<td class="num small">' + r.dateLabel + "</td>" +
          '<td class="co"><b>' + esc(r.name) + "</b><span>" + r.ticker + " · " + esc(r.exch) + "</span></td>" +
          '<td class="sec">' + esc(r.sector) + "</td>" +
          '<td><span class="badge ' + ratingClass(r) + '">' + esc(r.rating) + "</span></td>" +
          '<td class="r num">' + esc(r.type === "credit" ? "n/a" : r.ref) + "</td>" +
          '<td class="r num">' + esc(r.type === "credit" ? "n/a" : r.target) + "</td>" +
          '<td class="r num ' + moveClass(r) + '"><b style="font-weight:500">' + esc(r.moveLabel) + "</b></td>" +
          '<td class="r"><span class="chev">›</span></td></tr>';
        var detail = open ? '<tr class="detail"><td colspan="8"><div class="inner"><div><p>' + esc(r.summary) + '</p><div class="tags">' +
          r.tags.map(esc).join(" · ") + (r.kpis ? " · " + r.kpis.map(function (k) { return k[0] + " " + k[1]; }).join(" · ") : "") +
          '</div></div><a class="btn btn-line" href="' + encodeURI(r.pdf) + '" target="_blank" rel="noopener">Read report <span class="arr">→</span></a></div></td></tr>' : "";
        return main + detail;
      }).join("");
      $$("th[data-key]", root).forEach(function (th) {
        $(".dir", th).textContent = th.getAttribute("data-key") === state.key ? (state.dir > 0 ? "↑" : "↓") : "";
      });
    }

    tbody.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      var tr = e.target.closest("tr.row"); if (!tr) return;
      var t = tr.getAttribute("data-t");
      state.open = state.open === t ? null : t; render();
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
    if (withTools) {
      $$("[data-type]", root).forEach(function (b) {
        b.addEventListener("click", function () {
          $$("[data-type]", root).forEach(function (x) { x.classList.remove("on"); });
          b.classList.add("on"); state.type = b.getAttribute("data-type"); render();
        });
      });
      $$("[data-sector]", root).forEach(function (b) {
        b.addEventListener("click", function () {
          $$("[data-sector]", root).forEach(function (x) { x.classList.remove("on"); });
          b.classList.add("on"); state.sector = b.getAttribute("data-sector"); render();
        });
      });
      $(".search", root).addEventListener("input", function (e) { state.q = e.target.value.trim().toLowerCase(); render(); });
      var hash = location.hash.replace("#", "").toUpperCase();
      if (hash && R.some(function (r) { return r.ticker === hash; })) state.open = hash;
    }
    render();
  }
  $$("[data-coverage]").forEach(buildTable);

  /* ---------- Cohort DCF ---------- */
  var M = window.DRUMOAK_CHRT;
  // FCF inputs are rounded to £0.1m in the report; scale PVs so the base case ties to the reported EV of £954.3m.
  var CAL = 954.3 / 954.7696;
  function dcf(w, g) {
    w /= 100; g /= 100;
    var pv = 0;
    M.fcf.forEach(function (f, i) { pv += f / Math.pow(1 + w, i + 1); });
    var last = M.fcf[M.fcf.length - 1];
    var tv = last * (1 + g) / (w - g);
    var pvtv = tv / Math.pow(1 + w, M.fcf.length);
    pv *= CAL; pvtv *= CAL;
    var ev = pv + pvtv;
    var eq = ev + M.cash - M.debt - M.nci;
    return { pv: pv, pvtv: pvtv, ev: ev, eq: eq, ps: eq / M.shares * 100, tvShare: pvtv / ev };
  }
  function blended(ps) { return ps * M.weights.dcf + M.comps * M.weights.comps + M.rim * M.weights.rim; }

  /* ---------- Football field ---------- */
  function footballField(el, dcfLow, dcfHigh) {
    var rows = [
      { label: "DCF", sub: "WACC 7.0 to 8.0%, g 2.0 to 3.0%", lo: dcfLow, hi: dcfHigh },
      { label: "Trading comps", sub: "EV/EBITDA to EV/Sales", lo: M.compsRange[0], hi: M.compsRange[1] },
      { label: "Residual income", sub: "Book value and ROE spread", lo: M.rim, hi: M.rim },
      { label: "DDM", sub: "Reference only, 0% weight", lo: M.ddm, hi: M.ddm, ref: true }
    ];
    var W = 520, labW = 150, padR = 14, rowH = 40, top = 26, H = top + rows.length * rowH + 26;
    var min = 400, max = 2600;
    var x = function (v) { return labW + (v - min) / (max - min) * (W - labW - padR); };
    var target = blended(dcf(M.wacc, M.g).ps);
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Valuation range by method, pence per share">';
    [500, 1000, 1500, 2000, 2500].forEach(function (t) {
      s += '<line x1="' + x(t) + '" x2="' + x(t) + '" y1="' + (top - 6) + '" y2="' + (H - 22) + '" stroke="#ece9e2"/>' +
        '<text x="' + x(t) + '" y="' + (H - 6) + '" font-size="10.5" fill="#6b7078" text-anchor="middle">' + fmt(t) + "p</text>";
    });
    rows.forEach(function (r, i) {
      var y = top + i * rowH;
      s += '<text x="0" y="' + (y + 14) + '" font-size="12.5" fill="#15181d" font-weight="500">' + r.label + "</text>" +
        '<text x="0" y="' + (y + 28) + '" font-size="10.5" fill="#6b7078">' + r.sub + "</text>";
      var tip = r.label + ": " + (r.lo === r.hi ? fmt(r.lo) + "p" : fmt(r.lo) + "p to " + fmt(r.hi) + "p");
      if (r.lo === r.hi) {
        s += '<g><title>' + tip + '</title><rect x="' + (x(r.lo) - 3) + '" y="' + (y + 6) + '" width="6" height="18" rx="2" fill="' + (r.ref ? "#b9b4a8" : "#1f4a3a") + '"/>' +
          '<text x="' + (x(r.lo) + 9) + '" y="' + (y + 19) + '" font-size="11" fill="#3a3f47">' + fmt(r.lo) + "p</text></g>";
      } else {
        s += '<g><title>' + tip + '</title><rect x="' + x(r.lo) + '" y="' + (y + 6) + '" width="' + (x(r.hi) - x(r.lo)) + '" height="18" rx="2" fill="#1f4a3a" opacity="' + (i === 0 ? 1 : 0.78) + '"/>' +
          '<text x="' + (x(r.lo) - 5) + '" y="' + (y + 19) + '" font-size="11" fill="#3a3f47" text-anchor="end">' + fmt(r.lo) + "</text>" +
          '<text x="' + (x(r.hi) + 5) + '" y="' + (y + 19) + '" font-size="11" fill="#3a3f47">' + fmt(r.hi) + "</text></g>";
      }
    });
    var yb = H - 22;
    s += '<line x1="' + x(M.price) + '" x2="' + x(M.price) + '" y1="' + (top - 8) + '" y2="' + yb + '" stroke="#15181d" stroke-dasharray="3 3"/>' +
      '<text x="' + x(M.price) + '" y="' + (top - 12) + '" font-size="10.5" fill="#15181d" text-anchor="middle">Price ' + fmt(M.price) + "p</text>" +
      '<line x1="' + x(target) + '" x2="' + x(target) + '" y1="' + (top - 8) + '" y2="' + yb + '" stroke="#1f6b48" stroke-width="2"/>' +
      '<text x="' + x(target) + '" y="' + (top - 12) + '" font-size="10.5" fill="#1f6b48" font-weight="600" text-anchor="middle">Target ' + fmt(target) + "p</text>";
    s += "</svg>";
    el.innerHTML = s;
  }
  var ff = $("#ff");
  if (ff && M) footballField(ff, dcf(8.0, 2.0).ps, dcf(7.0, 3.0).ps);

  /* ---------- Interactive model ---------- */
  var model = $("#model");
  if (model && M) {
    var wI = $("#in-wacc"), gI = $("#in-g");
    var waccs = [6.5, 7.0, 7.5, 8.0, 8.5], gs = [1.5, 2.0, 2.5, 3.0, 3.5];
    // sequential single-hue ramp, light to dark, for value per share
    var ramp = ["#e6eee9", "#c6dccf", "#9fc2b3", "#74a58f", "#4d876f", "#2f6b54"];
    var vals = [];
    waccs.forEach(function (w) { gs.forEach(function (g) { vals.push(dcf(w, g).ps); }); });
    var vmin = Math.min.apply(null, vals), vmax = Math.max.apply(null, vals);
    var shade = function (v) {
      var i = Math.min(ramp.length - 1, Math.floor((v - vmin) / (vmax - vmin + 1e-9) * ramp.length));
      return ramp[i];
    };
    var sens = $("#sens");
    sens.innerHTML = '<thead><tr><th class="corner">WACC \\ g</th>' + gs.map(function (g) { return "<th>" + g.toFixed(1) + "%</th>"; }).join("") + "</tr></thead><tbody>" +
      waccs.map(function (w) {
        return "<tr><th>" + w.toFixed(1) + "%</th>" + gs.map(function (g) {
          var v = dcf(w, g).ps, up = (v / M.price - 1) * 100;
          var bg = shade(v), light = ramp.indexOf(bg) >= 4;
          return '<td data-w="' + w + '" data-g="' + g + '" style="background:' + bg + (light ? ";color:#fff" : "") + '" title="WACC ' + w.toFixed(1) + "%, g " + g.toFixed(1) + "%: " + fmt(v) + "p, " + (up >= 0 ? "+" : "") + up.toFixed(1) + '% vs 1,194p">' + fmt(v) + "</td>";
        }).join("") + "</tr>";
      }).join("") + "</tbody>";

    function update() {
      var w = parseFloat(wI.value), g = parseFloat(gI.value);
      var d = dcf(w, g), t = blended(d.ps);
      var upD = (d.ps / M.price - 1) * 100, upT = (t / M.price - 1) * 100;
      $("#o-wacc").textContent = w.toFixed(2) + "%";
      $("#o-g").textContent = g.toFixed(1) + "%";
      $("#v-dcf").textContent = fmt(d.ps) + "p";
      $("#v-dcf-up").textContent = (upD >= 0 ? "+" : "") + upD.toFixed(1) + "% vs 1,194p";
      $("#v-dcf-up").className = "out-sub " + (upD >= 0 ? "pos" : "neg");
      $("#v-tgt").textContent = fmt(t) + "p";
      $("#v-tgt-up").textContent = (upT >= 0 ? "+" : "") + upT.toFixed(1) + "% implied";
      $("#v-tgt-up").className = "out-sub " + (upT >= 0 ? "pos" : "neg");
      $("#v-tv").textContent = (d.tvShare * 100).toFixed(1) + "%";
      $("#b-pv").textContent = "£" + d.pv.toFixed(1) + "m";
      $("#b-tv").textContent = "£" + d.pvtv.toFixed(1) + "m";
      $("#b-ev").textContent = "£" + d.ev.toFixed(1) + "m";
      $("#b-eq").textContent = "£" + d.eq.toFixed(1) + "m";
      $("#b-ps").textContent = fmt(d.ps) + "p";
      var contrib = [d.ps * M.weights.dcf, M.comps * M.weights.comps, M.rim * M.weights.rim];
      $("#bl-dcf").style.flexBasis = (contrib[0] / t * 100) + "%";
      $("#bl-comps").style.flexBasis = (contrib[1] / t * 100) + "%";
      $("#bl-rim").style.flexBasis = (contrib[2] / t * 100) + "%";
      $("#bl-dcf").textContent = "DCF 50% · " + fmt(contrib[0]) + "p";
      $("#bl-comps").textContent = "Comps 30% · " + fmt(contrib[1]) + "p";
      $("#bl-rim").textContent = "RI 20% · " + fmt(contrib[2]) + "p";
      $$("td", sens).forEach(function (td) {
        var on = Math.abs(parseFloat(td.getAttribute("data-w")) - w) < 0.01 && Math.abs(parseFloat(td.getAttribute("data-g")) - g) < 0.01;
        td.classList.toggle("sel", on);
      });
    }
    wI.addEventListener("input", update);
    gI.addEventListener("input", update);
    sens.addEventListener("click", function (e) {
      var td = e.target.closest("td"); if (!td) return;
      wI.value = td.getAttribute("data-w"); gI.value = td.getAttribute("data-g"); update();
    });
    $("#reset").addEventListener("click", function () { wI.value = M.wacc; gI.value = M.g; update(); });
    update();
  }

  /* ---------- Reveal on scroll ---------- */
  var els = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add("in"); });

  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();
})();

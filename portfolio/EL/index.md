<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>EL | Drumoak Capital</title>

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

<style>
:root{ --bg:#000; --card:#111; --txt:#fff; --muted:#aaa; --shadow:0 6px 24px rgba(0,0,0,.65); }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--txt);min-height:100vh;display:flex;flex-direction:column}

/* nav ------------------------------------------------------------------- */
nav{background:#000;padding:.75rem 1.5rem;border-bottom:1px solid #222}
nav ul{list-style:none;display:flex;gap:1.4rem;align-items:center;margin:0}
nav a{color:var(--txt);text-decoration:none;font-weight:600}
nav a:hover{text-decoration:underline}
nav strong{font-size:1.1rem}

/* layout ---------------------------------------------------------------- */
main{flex:1;display:grid;place-items:center;padding:2.5rem 1rem}
.card{background:var(--card);border-radius:12px;box-shadow:var(--shadow);padding:2.5rem 3rem;
      max-width:900px;width:100%;display:grid;gap:1.5rem}
.card h1{font-size:2rem;letter-spacing:-.02em}
table{width:100%;border-collapse:collapse}
th,td{padding:.45rem .6rem;border-bottom:1px solid #333;text-align:center}
td:first-child{font-weight:600}
small{color:var(--muted);font-size:.8rem}
</style>
</head>

<body>
<nav>
  <ul>
    <li><strong>Drumoak&nbsp;Capital</strong></li>
    <li><a href="/Drumoak-Capital/">Home</a></li>
    <li><a href="/Drumoak-Capital/About/">About</a></li>
    <li><a href="/Drumoak-Capital/portfolio/">Portfolio</a></li>
    <li><a href="/Drumoak-Capital/history/">History</a></li>
  </ul>
</nav>

<main>
  <section class="card">
    <h1>$EL &mdash; Estée Lauder&nbsp;Cos.</h1>
        
    <p>
      <strong>Position size:</strong> 6.76 units (5&times; leverage)<br>
      <strong>Average entry price:</strong> $66.57<br>
      <strong>Live price:</strong> $<span id="liveP">--</span><br>
      <strong>Current P/L:</strong> <span id="totPL">--</span>
      <small>(% after leverage)</small>
    </p>

    <h2>Purchase&nbsp;log</h2>
    <table>
      <thead>
        <tr><th>Lot</th><th>Date&nbsp;&amp;&nbsp;Time&nbsp;(EDT)</th><th>Units</th><th>Entry&nbsp;Price&nbsp;($)</th><th>Live&nbsp;P/L&nbsp;%</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>20&nbsp;May&nbsp;2025 · 3 : 34&nbsp;pm</td><td>4.46025</td><td id="e1">--</td><td id="pl1">--</td></tr>
        <tr><td>2</td><td>21&nbsp;May&nbsp;2025 · 6 : 26&nbsp;pm</td><td>2.29893</td><td id="e2">--</td><td id="pl2">--</td></tr>
      </tbody>
    </table>

    <h2>Thesis</h2>
    <p>Walking past the beauty counter this spring felt surreal: a blue-chip house like Estée Lauder was priced like a broken biotech&hellip; <em>(full thesis unchanged)</em></p>

    <h2>Risk / Exit Plan</h2>
    <ul>
      <li>China headwinds: two quarters &lt; 5 % sales growth → trim&nbsp;50 %</li>
      <li>Management shuffle: surprise CEO/CFO exit → re-evaluate</li>
      <li>Thesis creep: if I pitch “Hims&nbsp;&amp;&nbsp;Hers is the new EL” → halve</li>
      <li>Hard stop: −25 % on blended entry</li>
    </ul>

    <small>Educational only &mdash; not investment advice. I do <strong>not</strong> manage external capital.</small>
  </section>
</main>

<!-- Live-price & dynamic P/L --------------------------------------------- -->
<script>
/* constants from your notes */
const units1 = 4.46025, units2 = 2.29893;
const avgEntry = 66.57;
const lot2Pct  = 23.77;   // lot #2 is +23.77 %
const lev      = 5;

/* fetch live price, derive entry prices, update DOM */
(async () => {
  const url = 'https://stooq.com/q/l/?s=el.us&f=sd2t2ohlcv&h&e=json';
  const data = await fetch(url).then(r=>r.json()).catch(()=>null);
  if(!data || !data.data) return;

  const live = parseFloat(data.data[0].close);
  document.getElementById('liveP').textContent = live.toFixed(2);

  /* derive entry price for lot2 then lot1 */
  const entry2 = live / (1 + lot2Pct/100);
  const entry1 = (avgEntry * (units1 + units2) - units2 * entry2) / units1;

  /* overall P/L */
  const overall = ((live - avgEntry) / avgEntry * 100 * lev).toFixed(2);
  document.getElementById('totPL').textContent = (overall>=0?'+':'') + overall + ' %';

  /* fill table */
  function upd(entry, units, cellE, cellPL){
    document.getElementById(cellE).textContent = entry.toFixed(2);
    const pct = ((live - entry) / entry * 100 * lev).toFixed(2);
    document.getElementById(cellPL).textContent = (pct>=0?'+':'') + pct + ' %';
  }
  upd(entry1, units1, 'e1', 'pl1');
  upd(entry2, units2, 'e2', 'pl2');
})();
</script>
</body>
</html>

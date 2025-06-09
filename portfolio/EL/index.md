<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>EL | Drumoak Capital</title>

<!-- Inter font -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

<style>
:root{ --bg:#0d1117; --card:#161b22; --txt:#c9d1d9; --accent:#4db5ff; --shadow:0 6px 24px rgba(0,0,0,.45);}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--txt);min-height:100vh;display:flex;flex-direction:column}

/* nav */
nav{background:rgba(13,17,23,.78);backdrop-filter:blur(4px);padding:.7rem 1.5rem}
nav ul{list-style:none;display:flex;gap:1.4rem;align-items:center;margin:0}
nav a{color:var(--txt);text-decoration:none;font-weight:600}
nav a:hover{color:var(--accent)}
nav strong{font-size:1.1rem}

/* layout */
main{flex:1;display:grid;place-items:center;padding:2.5rem 1rem}
.card{background:var(--card);border-radius:12px;box-shadow:var(--shadow);padding:2.5rem 3rem;
      max-width:900px;width:100%;display:grid;gap:1.5rem}
.card h1{font-size:2rem;letter-spacing:-.02em}
table{width:100%;border-collapse:collapse}
th,td{padding:.45rem .6rem;border-bottom:1px solid #30363d;text-align:center}
code{font-family:inherit;color:var(--accent)}
small{opacity:.75;font-size:.8rem}
.gain{color:#3fb950}.loss{color:#f85149}
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
    <h1>$EL — Estée&nbsp;Lauder&nbsp;Cos.</h1>

    <p>
      <strong>Position size:</strong> 6.76 units (5× leverage)<br>
      <strong>Average entry price:</strong> $<span id="entry">66.57</span><br>
      <strong>Live price:</strong> $<span id="livePrice">--</span><br>
      <strong>Current P/L:</strong>
      <span id="overallPL">--</span>
      <small>(% after leverage)</small>
    </p>

    <h2>Purchase&nbsp;log</h2>
    <table>
      <thead>
        <tr><th>Lot</th><th>Date&nbsp;&amp;&nbsp;Time&nbsp;(EDT)</th><th>Units</th><th>Entry&nbsp;Price</th><th>Live&nbsp;P/L&nbsp;%</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>20&nbsp;May&nbsp;2025 · 3 : 34 pm</td><td>4.46025</td><td>$66.57</td><td id="pl1">--</td></tr>
        <tr><td>2</td><td>21&nbsp;May&nbsp;2025 · 6 : 26 pm</td><td>2.29893</td><td>same</td><td id="pl2">--</td></tr>
      </tbody>
    </table>

    <!-- thesis & risk text unchanged -->

    <small>Educational only — not investment advice. I do <strong>not</strong> manage external capital.</small>
  </section>
</main>

<!-- live-price script -->
<script>
const entryPrice = 66.57, leverage = 5, lot1Entry = 66.57, lot2Entry = 66.57;

(async ()=>{
  const url='https://stooq.com/q/l/?s=el.us&f=sd2t2ohlcv&h&e=json';
  const data=await fetch(url).then(r=>r.json()).catch(()=>null);
  if(!data||!data.data) return;

  const price=parseFloat(data.data[0].close).toFixed(2);
  document.getElementById('livePrice').textContent=price;

  const overall=((price-entryPrice)/entryPrice*leverage*100).toFixed(2);
  const overallSpan=document.getElementById('overallPL');
  overallSpan.textContent=(overall>=0?'+':'')+overall+' %';
  overallSpan.className=overall>=0?'gain':'loss';

  function lot(entry,id){
    const pct=((price-entry)/entry*leverage*100).toFixed(2);
    const cell=document.getElementById(id);
    cell.textContent=(pct>=0?'+':'')+pct+' %';
    cell.className=pct>=0?'gain':'loss';
  }
  lot(lot1Entry,'pl1'); lot(lot2Entry,'pl2');
})();
</script>
</body>
</html>

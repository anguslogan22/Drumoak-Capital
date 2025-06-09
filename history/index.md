<!-- ▼ Drumoak Capital header (B/W) ───────────────────────────── -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

<style>
:root{ --bg:#000; --txt:#fff; --muted:#999; }
body{margin:0;font-family:'Inter',sans-serif;background:var(--bg);color:var(--txt);}
.tpc-nav{background:#000;border-bottom:1px solid #333;padding:.75rem 1.5rem}
.tpc-nav ul{list-style:none;margin:0;display:flex;gap:1.5rem;align-items:center}
.tpc-nav a{color:var(--txt);text-decoration:none;font-weight:600}
.tpc-nav a:hover{text-decoration:underline}
.tpc-nav strong{font-size:1.15rem}

table{width:100%;border-collapse:collapse;margin-top:.6rem}
th,td{padding:.45rem .6rem;border-bottom:1px solid #333;text-align:left}
details{white-space:pre-line}
small{color:var(--muted);font-size:.8rem}
</style>

<nav class="tpc-nav">
  <ul>
    <li><strong>Drumoak&nbsp;Capital</strong></li>
    <li><a href="/Drumoak-Capital/About/">About</a></li>
    <li><a href="/Drumoak-Capital/portfolio/">Portfolio</a></li>
    <li><a href="/Drumoak-Capital/history/">History</a></li>
    <li><a href="/Drumoak-Capital/CV/">CV</a></li>
  </ul>
</nav>
<!-- ▲ header ends ─────────────────────────────────────────────── -->

## Trade History

*Closed positions (percent returns already include leverage).  
Click **Why?** to expand a one-paragraph note for each trade.*

<table id="historyTable">
<thead>
<tr><th>Close Date (2025)</th><th>Ticker</th><th>Entry $</th><th>Exit $</th><th>% P/L</th><th>Why?</th></tr>
</thead>
<tbody>
<tr><td>6 Jun · 17:02</td><td>MANU</td><td>13.28</td><td>15.81</td><td>+19.05 %</td><td><details>United dipped …</details></td></tr>
<tr><td>6 Jun · 16:57</td><td>CELH</td><td>36.80</td><td>39.87</td><td>+41.84 %</td><td><details>Celsius flipped …</details></td></tr>
<tr><td>6 Jun · 16:57</td><td>CELH</td><td>37.46</td><td>39.88</td><td>+32.38 %</td><td><details>Second tranche …</details></td></tr>
<tr><td>27 May · 18:40</td><td>GDX</td><td>47.14</td><td>49.78</td><td>+27.95 %</td><td><details>Portfolio hedge …</details></td></tr>
<tr><td>23 May · 18:31</td><td>VXX</td><td>56.18</td><td>56.94</td><td>+6.77 %</td><td><details>Short swing …</details></td></tr>
<tr><td>14 May · 14:33</td><td>AMD</td><td>119.19</td><td>121.23</td><td>+8.53 %</td><td><details>AI mania …</details></td></tr>
<tr><td>13 May · 14:50</td><td>PLTR</td><td>122.95</td><td>123.61</td><td>+2.70 %</td><td><details>Same AI theme …</details></td></tr>
<tr><td>12 May · 18:27</td><td>HIMS</td><td>51.78</td><td>54.54</td><td>+26.70 %</td><td><details>High-growth DTC …</details></td></tr>
<tr><td>06 Mar · 15:19</td><td>HMC</td><td>28.46</td><td>28.75</td><td>+5.00 %</td><td><details>Trump speech …</details></td></tr>
<tr><td>04 Mar · 20:13</td><td>TXRH</td><td>173.36</td><td>185.93</td><td>+36.37 %</td><td><details>Earnings play …</details></td></tr>
<tr><td>04 Mar · 14:36</td><td>CAKE</td><td>54.96</td><td>49.57</td><td>−50.00 %</td><td><details>Earnings thesis …</details></td></tr>
<tr><td>13 Feb · 15:11</td><td>PM</td><td>130.43</td><td>149.35</td><td>+72.54 %</td><td><details>Bet on strong …</details></td></tr>
</tbody>
</table>

---

## Year-to-date stats

| Metric | Value |
|---|---:|
| Trades closed | <span id="statTrades">--</span> |
| Win rate | <span id="statWin">--</span> |
| Avg return per trade | <span id="statAvg">--</span> |
| Avg winner | <span id="statAvgWin">--</span> |
| Avg loser | <span id="statAvgLose">--</span> |
| Best trade | <span id="statBest">--</span> |
| Worst trade | <span id="statWorst">--</span> |

<small>*Stats update automatically from the table above.*</small>

---

> **Disclaimer:** Educational purposes only — not investment advice.

<script>
/* ---------- auto-compute stats from history table ---------------- */
(function(){
  const rows = [...document.querySelectorAll('#historyTable tbody tr')];
  const pl = rows.map(r=>{
    let txt = r.children[4].textContent.trim();
    txt = txt.replace(/[+%]/g,'').replace('−','-');   // handle unicode minus
    return parseFloat(txt);
  });

  const trades = pl.length;
  const wins = pl.filter(x=>x>0);
  const losses = pl.filter(x=>x<0);

  const sum = arr => arr.reduce((a,b)=>a+b,0);
  const fmt = n => (n>0?'+':'')+n.toFixed(1)+' %';

  document.getElementById('statTrades').textContent = trades;
  document.getElementById('statWin').textContent    = (wins.length/trades*100).toFixed(1)+' %';
  document.getElementById('statAvg').textContent    = fmt(sum(pl)/trades);
  document.getElementById('statAvgWin').textContent = wins.length? fmt(sum(wins)/wins.length):'–';
  document.getElementById('statAvgLose').textContent= losses.length? fmt(sum(losses)/losses.length):'–';
  document.getElementById('statBest').textContent   = fmt(Math.max(...pl));
  document.getElementById('statWorst').textContent  = fmt(Math.min(...pl));
})();
</script>


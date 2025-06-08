# Trade History  

*Closed positions (percent returns already include leverage).  
Click **Why?** to expand a one-paragraph note for each trade.*

| Close&nbsp;Date&nbsp;(2025) | Ticker | Entry \$ | Exit \$ | % P/L |  Why?  |
|---|---|---:|---:|---:|---:|---|
| 6 Jun · 17:02 | MANU | 13.28 | 15.81 | **+19.05 %** | <details>United dipped ~18 % after the Europa League loss. Looked unjustified given ongoing cost-cuts and the brand’s global pull. Bought the knee-jerk sell-off; pop back to fair value delivered the gain.</details> |
| 6 Jun · 16:57 | CELH | 36.80 | 39.87 | **+41.84 %** | <details>Celsius flipped from unprofitable to profitable; shelves near me never stayed stocked. New Alani Energy acquisition widens shelf space. Bought the growth + profitability inflection.</details> |
| 6 Jun · 16:57 | CELH | 37.46 | 39.88 | **+32.38 %** | <details>Second tranche one tick higher after confirmation of momentum. Same thesis as above.</details> |
| 27 May · 18:40 | GDX | 47.14 | 49.78 | **+27.95 %** | <details>Portfolio hedge: Aussie / US gold miners ETF as a low-beta ballast during USD wobble. Macro tailwind + leverage produced the quick pop.</details> |
| 23 May · 18:31 | VXX | 56.18 | 56.94 | **+6.77 %** | <details>Short swing on volatility headline-spike (Trump tariff chatter on Europe). Grabbed the fade once tweet-risk cooled.</details> |
| 14 May · 14:33 | AMD | 119.19 | 121.23 | **+8.53 %** | <details>AI mania sympathy play versus NVDA. Tight risk, took the chart breakout and booked quick profit.</details> |
| 13 May · 14:50 | PLTR | 122.95 | 123.61 | **+2.70 %** | <details>Same AI theme; realised it fit better as swing than core hold—took green and moved on.</details> |
| 12 May · 18:27 | HIMS | 51.78 | 54.54 | **+26.70 %** | <details>High-growth DTC health brand; cosmetics/health TAM echo of my EL thesis. Rode earnings-day strength.</details> |
| 06 Mar · 15:19 | HMC | 28.46 | 28.75 | **+5.00 %** | <details>Trump inauguration speech lumped Honda in “big three” US makers. Snatched the headline dip; sold next day.</details> |
| 04 Mar · 20:13 | TXRH | 173.36 | 185.93 | **+36.37 %** | <details>Earnings play: solid cash-flow restaurant brand, beat on comps. Rode post-print momentum.</details> |
| 04 Mar · 14:36 | CAKE | 54.96 | 49.57 | **−50.00 %** | <details>Earnings thesis mirrored TXRH but went the other way—traffic slowdown + wage pressure. Cut at predetermined max loss.</details> |
| 13 Feb · 15:11 | PM | 130.43 | 149.35 | **+72.54 %** | <details>Bet on strong earnings driven by ZYN/modern-oral growth. Re-rating + solid volume guidance delivered outsized move.</details> |

---

## Year-to-date stats 🧮  

| Metric | Value |
|---|---:|
| Trades closed | **12** |
| Win rate | **91.7 %** (11 / 12) |
| Avg return per trade | **+19.2 %** |
| Avg winner | **+25.4 %** |
| Avg loser | **−50.0 %** |
| Best trade | **+72.5 %** (PM) |
| Worst trade | **−50.0 %** (CAKE) |

<small>*Stats updated manually for now; can be automated later.*</small>

---
<!-- === ROI Calculator & Comparison ============================== -->
<hr>
<h2>If you’d put <input id="startAmt" type="number" value="100" min="1" style="width:6rem"> $ into TPC…</h2>
<div id="roiChart"></div>

<script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
<script>
(async ()=>{
  const startInput = document.getElementById('startAmt');
  const hist = await fetch('/data/history.json').then(r=>r.json());

  // sort oldest->newest for compounding
  hist.sort((a,b)=> new Date(a.date) - new Date(b.date));

  // helper to build the two curves
  function buildSeries(initial){
    const tpcX = [], tpcY = [];
    let bal = initial, lastDate = new Date(hist[0].date);

    hist.forEach(tr=>{
      const d = new Date(tr.date);
      // add passive points between trades (for smooth plot)
      tpcX.push(d); tpcY.push(bal *= (1 + tr.plPc/100));
      lastDate = d;
    });

    // S&P curve: monthly 0.64 % from first trade to last trade
    const spxX = [], spxY = [];
    let spBal = initial, cur = new Date(hist[0].date);
    while (cur <= lastDate){
      spxX.push(new Date(cur)); spxY.push(spBal);
      spBal *= 1.0064;                 // ≈ 8 % p.a.
      cur.setMonth(cur.getMonth()+1);
    }
    return {tpcX,tpcY,spxX,spxY};
  }

  function draw(){
    const initial = parseFloat(startInput.value||100);
    const {tpcX,tpcY,spxX,spxY} = buildSeries(initial);

    Plotly.newPlot('roiChart',[
      {x:tpcX,y:tpcY,type:'scatter',mode:'lines+markers',
       name:`TPC realised P/L`,line:{dash:'solid'}},
      {x:spxX,y:spxY,type:'scatter',mode:'lines',
       name:`S&P (8 % p.a.)`,line:{dash:'dot'}}
    ],{
      paper_bgcolor:'#0d1117',plot_bgcolor:'#0d1117',
      font:{color:'#c9d1d9'},margin:{t:20},legend:{x:0,y:1},
      yaxis:{title:'Portfolio value ($)'}
    },{responsive:true});
  }

  // initial draw + live update on amount change
  draw();  startInput.addEventListener('input',draw);
})();
</script>
<!-- ============================================================= -->

---

> **Disclaimer:** Educational only — not investment advice.

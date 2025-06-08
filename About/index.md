# About Thistle Point Capital&nbsp;🚀  

<div align="center">
  <img src="/assets/profile.jpg"
       alt="Angus Logan"
       width="220"
       style="border:4px solid #4db5ff;border-radius:50%;margin-top:8px">
</div>

> **Mission:** *Compound intelligently, manage risk ruthlessly, and publish every step so the learning is shared.*

---

## Founder  

Hi — I’m **Angus Logan**, second-year B.Com student at **McGill University** (Finance × Statistics).  
When I’m not on the varsity soccer pitch I’m:

* **Associate Director, Corporate Relations – McGill Ventures**  
* **Co-Founder / Co-President – McGill Athletes in Business**  
* Scripting factor tests, reading 10-Ks, and tinkering with risk dashboards.

---

## What is TPC?  

| &nbsp; | Description |
|-------|-------------|
| **Live Portfolio** | Current holdings, weights, and risk notes (updated daily). |
| **Trade History** | Closed positions with full rationales &nbsp;→ win-rate & stats auto-calculated. |
| **Algo Lab** *(beta)* | Python notebooks & back-tests—nothing hidden behind paywalls. |
| **Resources** *(coming)* | Data APIs, favourite reads, and code snippets worth re-using. |

---

## Contact & Docs  

<table>
<tr><td><strong>📄&nbsp;CV</strong></td>
    <td><a href="/Angus_Logan_CV.pdf">Download PDF</a></td></tr>
<tr><td><strong>💼&nbsp;LinkedIn</strong></td>
    <td><a href="https://www.linkedin.com/in/angus-logan/">/angus-logan</a></td></tr>
<tr><td><strong>✉️&nbsp;Email</strong></td>
    <td><a href="mailto:angus.logan123@gmail.com">angus.logan123@gmail.com</a></td></tr>
</table>

---

## Investment Principles  

1. **Drawdown first.** Survival > ego.  
2. **Hypothesis → Data → Trade.** Every position has a written thesis before capital is committed.  
3. **Post-mortem culture.** Winners and losers get the same autopsy—bias hides in silence.  

---
## The Returns 
<hr>

<h2 align="center">2025 Market Benchmarks vs&nbsp;TPC</h2>
<div id="benchChart" style="height:420px"></div>

<!-- Plotly CDN -->
<script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
<script>
/* ─── 1 | edit these numbers whenever rates/returns change ───────── */
const dataPoints = [
  { name:'Canada Overnight',   value:5.00 },
  { name:'UK Base Rate',       value:5.25 },
  { name:'US Fed Funds',       value:5.50 },
  { name:'S&P 500&nbsp;YTD',   value:12.3 },
  { name:'FTSE&nbsp;100&nbsp;YTD', value:2.1 },
  { name:'TPC Avg Return',     value:19.2 }   // update from your stats block
];
/* ─────────────────────────────────────────────────────────────────── */

const x = dataPoints.map(d => d.name);
const y = dataPoints.map(d => d.value);
const colors = dataPoints.map(d => d.name.includes('TPC') ? '#4db5ff' : '#8b949e');

Plotly.newPlot('benchChart', [{
  type:'bar',
  x:y,
  y:x,
  orientation:'h',
  marker:{color:colors},
  hovertemplate:'%{x:.2f}%<extra></extra>'
}], {
  paper_bgcolor:'#0d1117',
  plot_bgcolor :'#0d1117',
  font:{color:'#c9d1d9'},
  margin:{l:120,r:20,t:10,b:40},
  xaxis:{title:'% Return / Rate'},
}, {responsive:true});
</script>


---

> **Disclaimer**  
> Educational content only. Nothing here constitutes investment advice, solicitation, or recommendation.  
> Thistle Point Capital manages *personal* funds exclusively.

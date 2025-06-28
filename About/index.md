 <!-- ▼ Drumoak Capital shared header ──────────────────────── -->
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
 
 <style>
 :root {
   --bg: #ffffff;   /* white background */
   --txt: #000000;  /* black text */
   --accent: #000000; /* black accent on hover */
 }
 body {
   margin: 0;
   font-family: 'Inter', sans-serif;
   background: var(--bg);
   color: var(--txt);
 }
-.tpc-nav {
-  background: var(--bg);
-  padding: 0.75rem 1.5rem;
+nav {
+  background: #fff;
+  border-bottom: 1px solid var(--line);
+  padding: .75rem 1.5rem;
+  position: sticky;
+  top: 0;
+  z-index: 1000;
 }
-.tpc-nav ul {
+nav ul {
   list-style: none;
   margin: 0;
   display: flex;
-  gap: 1.5rem;
+  gap: 1.25rem;
   align-items: center;
 }
-.tpc-nav a {
+nav a {
   color: var(--txt);
   text-decoration: none;
   font-weight: 600;
 }
-.tpc-nav a:hover {
+nav a:hover {
   color: var(--accent);
 }
-.tpc-nav strong {
+nav strong {
   font-size: 1.15rem;
+  margin-right: 1rem;
 }
 </style>
 
 
<nav class="tpc-nav">
  <ul style="display:flex; gap:1.5rem; list-style:none; margin:0; padding:0;">
    <li><strong>Drumoak Capital</strong></li>
    <li><a href="/Drumoak-Capital/">Home</a></li>
    <li><a href="/Drumoak-Capital/About/">About</a></li>
    <li><a href="/Drumoak-Capital/portfolio/">Portfolio</a></li>
    <li><a href="/Drumoak-Capital/portfolio/short-term.html">Portfolio ST</a></li>
    <li><a href="/Drumoak-Capital/portfolio/long-term.html">Portfolio LT</a></li>
    <li><a href="/Drumoak-Capital/history/">History</a></li>
    <li><a href="/Drumoak-Capital/strategy/events.html">Strategy Events</a></li>
    <li><a href="/Drumoak-Capital/strategy/algorithm.html">Strategy Algorithm</a></li>
    <li><a href="/Drumoak-Capital/media/">Media</a></li>
  </ul>
</nav>

 <!-- ▲ header ends ──────────────────────────────────────────────── -->
 
 



# About Drumoak Capital&nbsp;🚀  

<div align="center">
  <img src="/assets/profile.jpg"
       alt="Angus Logan"
       width="220"
       style="border:4px solid #4db5ff;border-radius:50%;margin-top:8px">
</div>

> **Mission:** *Compound intelligently, manage risk ruthlessly, and publish every step so the learning is shared.*

---

## Founder  

Hi — I’m **Angus Logan**, second-year B.Com student at **McGill University** Majoring in Finance and Minoring in Statistics.  
When I’m not on the varsity soccer pitch I’m:

* **Associate Director, Corporate Relations – McGill Ventures**  
* **Co-Founder / Co-President – McGill Athletes in Business**  


---

## What is Drumoak Capital?  

| &nbsp; | Description |
|-------|-------------|
| **Portfolio** | Current short and long term holdings, weights, and risk notes. |
| **Trade History** | Closed positions with full rationales &nbsp;→ win-rate & stats auto-calculated. |
| **Strategy** | Both event driven and algorithmic strategies used. |
| **Media**| Great Podcasts, Books, and other resources I've consumed lately and my thoughts. |

---

## Contact & Docs  

<table>
<tr><td><strong>💼&nbsp;LinkedIn</strong></td>
    <td><a href="https://www.linkedin.com/in/angus-logan/">/angus-logan</a></td></tr>
<tr><td><strong>✉️&nbsp;Email</strong></td>
    <td><a href="mailto:angus.logan123@gmail.com">angus.logan123@gmail.com</a></td></tr>
</table>

---

## Investment Principles  

1. **Drawdown first.** First you learn, then you remove the L.   
2. **Hypothesis → Data → Trade.** Every position has a written thesis before capital is committed.  
3. **Post-mortem culture.** Winners and losers get the same autopsy—bias hides in silence.  

<!-- Returns ------------------------------------------------------ -->
## The Returns
<hr>

<h2 align="center">2025 Market Benchmarks vs&nbsp;Drumoak Capital</h2>
<div id="benchChart" style="height:420px"></div>

<script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
<script>
/* edit these numbers whenever rates/returns change */
const dataPoints = [
  { name:'S&P 500&nbsp;YTD',   value:8.0 },
  { name:'FTSE&nbsp;100&nbsp;YTD', value:2.1 },
  { name:'Drumoak Capital Avg Return',     value:72.2 }
];

/* vertical bars → x = names, y = numbers */
const x = dataPoints.map(d => d.name);
const y = dataPoints.map(d => d.value);
const colors = dataPoints.map(d =>
  d.name.includes('DC') ? '#4db5ff' : '#8b949e'
);

Plotly.newPlot('benchChart', [{
  type:'bar',
  x:x,
  y:y,
  marker:{color:colors},
  hovertemplate:'%{y:.2f}%<extra></extra>'
}], {
  paper_bgcolor:'#0d1117',
  plot_bgcolor :'#0d1117',
  font:{color:'#c9d1d9'},
  margin:{l:50,r:20,t:10,b:80},
  yaxis:{title:'% Return / Rate'},
}, {responsive:true});
</script>

---

> **Disclaimer**  
> Educational content only. Nothing here constitutes investment advice, solicitation, or recommendation.  
> Drumoak Capital manages *personal* funds exclusively.

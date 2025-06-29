<html lang="en">
<head>
<meta charset="utf-8">
<title>About - Drumoak Capital</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #fff;
  --card: #fff;
  --txt: #000;
  --muted: #555;
  --line: #ddd;
  --accent: #4db5ff;
  --shadow: 0 6px 24px rgba(0,0,0,.15);
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--txt);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
nav {
  background: #fff;
  border-bottom: 1px solid var(--line);
  padding: .75rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
nav a {
  color: var(--txt);
  text-decoration: none;
  font-weight: 600;
}
nav a:hover { color: var(--accent); }
nav strong { font-size: 1.15rem; margin-right: 1rem; }
main {
  flex: 1;
  display: grid;
  place-items: center;
  padding: 2.5rem 1rem;
}
.hero,
.section {
  background: var(--card);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 2rem 3rem;
  max-width: 900px;
  width: 100%;
  margin-bottom: 2rem;
}
.hero { text-align: center; display: grid; gap: 1rem; }
.section h2 { margin-top: 0; margin-bottom: 1rem; text-align: center; }
.section ul { padding-left: 1.2rem; margin-bottom: 1rem; }
footer {
  text-align: center;
  padding: 1rem;
  font-size: .85rem;
  opacity: .8;
}
</style>
</head>
<body>
<nav class="tpc-nav">
  <ul>
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
<main>
  <section class="hero">
    <h1>About Drumoak Capital&nbsp;🚀</h1>
    <img src="/Drumoak-Capital/assets/profile.jpg" alt="Angus Logan" width="220" height="220" style="display:block;margin:0 auto;border:4px solid #000;border-radius:50%;object-fit:cover;">
    <p><strong>Mission:</strong> Compound intelligently, manage risk ruthlessly, and publish every step so the learning is shared.</p>
  </section>
  <section class="section">
    <h2>Founder</h2>
    <p>Hi — I’m <strong>Angus Logan</strong>, second-year B.Com student at <strong>McGill University</strong> majoring in Finance and minoring in Statistics. When I’m not on the varsity soccer pitch I’m:</p>
    <ul>
      <li>Associate Director, Corporate Relations – McGill Ventures</li>
      <li>Co-Founder / Co-President – McGill Athletes in Business</li>
    </ul>
    <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/angus-logan/">/angus-logan</a></p>
  </section>
  <section class="section">
    <h2>What is Drumoak Capital?</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:1rem;">
      <tr><th style="text-align:left;padding:.5rem;border-bottom:1px solid var(--line);">&nbsp;</th><th style="text-align:left;padding:.5rem;border-bottom:1px solid var(--line);">Description</th></tr>
      <tr><td style="padding:.5rem;"> <strong>Portfolio</strong> </td><td style="padding:.5rem;">Current short and long term holdings, weights, and risk notes.</td></tr>
      <tr><td style="padding:.5rem;"> <strong>Trade History</strong> </td><td style="padding:.5rem;">Closed positions with full rationales → win-rate & stats auto-calculated.</td></tr>
      <tr><td style="padding:.5rem;"> <strong>Strategy</strong> </td><td style="padding:.5rem;">Both event driven and algorithmic strategies used.</td></tr>
      <tr><td style="padding:.5rem;"> <strong>Media</strong> </td><td style="padding:.5rem;">Great Podcasts, Books, and other resources I've consumed lately and my thoughts.</td></tr>
    </table>
    <p>Drumoak Capital began as a passion project so I could hone my web development skills and take accountability for six years of trading experience.</p>
  </section>
  <section class="section">
    <h2>Returns Snapshot</h2>
    <div id="benchChart" style="height:420px"></div>
  </section>
</main>
<footer>
  <p><strong>Disclaimer:</strong> Educational content only. Nothing here constitutes investment advice, solicitation, or recommendation. Drumoak Capital manages personal funds exclusively.</p>
</footer>
<script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
<script>
const dataPoints = [
  { name:'S&P 500 Avg Year', value:8.0 },
  { name:'FTSE 100 Avg Year', value:4.5 },
  { name:'Drumoak Capital Avg Year', value:72.2 }
];
const x = dataPoints.map(d => d.name);
const y = dataPoints.map(d => d.value);
const colors = dataPoints.map(d => d.name.includes('Drumoak') ? '#4db5ff' : '#8b949e');
Plotly.newPlot('benchChart', [{
  type:'bar',
  x:x,
  y:y,
  marker:{color:colors},
  hovertemplate:'%{y:.2f}%<extra></extra>'
}], {
  paper_bgcolor:'#fff',
  plot_bgcolor:'#fff',
  font:{color:'#000'},
  margin:{l:50,r:20,t:10,b:80},
  yaxis:{title:'% Avg Annual Return'},
}, {responsive:true});
</script>
</body>
</html>

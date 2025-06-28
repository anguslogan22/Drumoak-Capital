<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>About | Drumoak Capital</title>
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
    * { box-sizing: border-box; margin: 0; padding: 0; }
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
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    nav a { color: var(--txt); text-decoration: none; font-weight: 600; }
    nav a:hover { color: var(--accent); }
    nav strong { font-size: 1.15rem; margin-right: 1rem; }
    main {
      flex: 1;
      padding: 2rem 1rem;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { padding: .45rem .6rem; border-bottom: 1px solid var(--line); text-align: left; }
  </style>
</head>
<body>
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
  <main>
    <h1>About Drumoak Capital&nbsp;🚀</h1>
    <div style="text-align:center;">
      <img src="/assets/profile.jpg" alt="Angus Logan" width="220" style="border:4px solid #4db5ff;border-radius:50%;margin-top:8px">
    </div>
    <p><strong>Mission:</strong> <em>Compound intelligently, manage risk ruthlessly, and publish every step so the learning is shared.</em></p>
    <h2>Founder</h2>
    <p>Hi — I’m <strong>Angus Logan</strong>, second-year B.Com student at <strong>McGill University</strong> majoring in Finance and minoring in Statistics. When I’m not on the varsity soccer pitch I’m:</p>
    <ul>
      <li><strong>Associate Director, Corporate Relations – McGill Ventures</strong></li>
      <li><strong>Co-Founder / Co-President – McGill Athletes in Business</strong></li>
    </ul>
    <h2>What is Drumoak Capital?</h2>
    <table>
      <tr><th>&nbsp;</th><th>Description</th></tr>
      <tr><td><strong>Portfolio</strong></td><td>Current short and long term holdings, weights, and risk notes.</td></tr>
      <tr><td><strong>Trade History</strong></td><td>Closed positions with full rationales &amp; win-rate &amp; stats auto-calculated.</td></tr>
      <tr><td><strong>Strategy</strong></td><td>Both event driven and algorithmic strategies used.</td></tr>
      <tr><td><strong>Media</strong></td><td>Great Podcasts, Books, and other resources I've consumed lately and my thoughts.</td></tr>
    </table>
    <h2>Contact &amp; Docs</h2>
    <table>
      <tr><td><strong>💼&nbsp;LinkedIn</strong></td><td><a href="https://www.linkedin.com/in/angus-logan/">/angus-logan</a></td></tr>
      <tr><td><strong>✉️&nbsp;Email</strong></td><td><a href="mailto:angus.logan123@gmail.com">angus.logan123@gmail.com</a></td></tr>
    </table>
    <h2>Investment Principles</h2>
    <ol>
      <li><strong>Drawdown first.</strong> First you learn, then you remove the L.</li>
      <li><strong>Hypothesis → Data → Trade.</strong> Every position has a written thesis before capital is committed.</li>
      <li><strong>Post-mortem culture.</strong> Winners and losers get the same autopsy—bias hides in silence.</li>
    </ol>
    <h2>The Returns</h2>
    <hr>
    <div id="benchChart" style="height:420px"></div>
    <script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
    <script>
      const dataPoints = [
        { name:'S&P 500&nbsp;YTD',   value:8.0 },
        { name:'FTSE&nbsp;100&nbsp;YTD', value:2.1 },
        { name:'Drumoak Capital Avg Return',     value:72.2 }
      ];
      const x = dataPoints.map(d => d.name);
      const y = dataPoints.map(d => d.value);
      const colors = dataPoints.map(d => d.name.includes('DC') ? '#4db5ff' : '#8b949e');
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
    <p><strong>Disclaimer</strong><br>
       Educational content only. Nothing here constitutes investment advice, solicitation, or recommendation.<br>
       Drumoak Capital manages <em>personal</em> funds exclusively.</p>
  </main>
  <footer>&copy; 2025 Angus Logan. Educational only&nbsp;&mdash; not investment advice.</footer>
</body>
</html>

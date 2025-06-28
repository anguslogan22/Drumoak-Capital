<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>EL | Drumoak Capital</title>

  <!-- Inter font -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg:     #fff;                            /* page background */
      --card:   #fff;                            /* card background */
      --txt:    #000;                            /* primary text */
      --muted:  #555;                            /* secondary text */
      --line:   #ddd;                            /* borders/dividers */
      --shadow: 0 6px 24px rgba(0,0,0,.15);       /* soft shadow */
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

    /* nav */
    nav {
      background: var(--bg);
      border-bottom: 1px solid var(--line);
      padding: .75rem 1.5rem;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    nav ul {
      list-style: none;
      display: flex;
      gap: 1.25rem;
      align-items: center;
    }
    nav a {
      color: var(--txt);
      text-decoration: none;
      font-weight: 600;
    }
    nav a:hover {
      color: var(--accent);
    }
    nav strong {
      font-size: 1.15rem;
      margin-right: 1rem;
    }

    /* layout */
    main {
      flex: 1;
      display: grid;
      place-items: center;
      padding: 2.5rem 1rem;
    }
    .card {
      background: var(--card);
      border-radius: 12px;
      box-shadow: var(--shadow);
      padding: 2.5rem 3rem;
      max-width: 900px;
      width: 100%;
      display: grid;
      gap: 1.5rem;
    }
    .card h1 {
      font-size: 2rem;
      letter-spacing: -0.02em;
      color: var(--txt);
    }

    /* table */
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: .45rem .6rem;
      border-bottom: 1px solid var(--line);
      text-align: center;
      color: var(--txt);
    }
    td:first-child {
      font-weight: 600;
    }
    small {
      color: var(--muted);
      font-size: .8rem;
    }
  </style>
</head>

<body>
  <nav>
    <ul>
      <li><strong>Drumoak&nbsp;Capital</strong></li>
      <li><a href="/Drumoak-Capital/">Home</a></li>
      <li><a href="/Drumoak-Capital/About/">About</a></li>
      <li><a href="/Drumoak-Capital/portfolio/short-term.html">Short&nbsp;Term</a></li>
      <li><a href="/Drumoak-Capital/portfolio/long-term.html">Long&nbsp;Term</a></li>
      <li><a href="/Drumoak-Capital/strategy/events.html">Events</a></li>
      <li><a href="/Drumoak-Capital/strategy/algorithm.html">Algorithm</a></li>
      <li><a href="/Drumoak-Capital/history/">History</a></li>
      <li><a href="/Drumoak-Capital/media/">Media</a></li>
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

      <h2>Purchase log</h2>
      <table>
        <thead>
          <tr>
            <th>Lot</th>
            <th>Date &amp; Time (EDT)</th>
            <th>Units</th>
            <th>Entry Price ($)</th>
            <th>Live P/L %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>20 May 2025 · 3:34 pm</td>
            <td>4.46025</td>
            <td id="e1">--</td>
            <td id="pl1">--</td>
          </tr>
          <tr>
            <td>2</td>
            <td>21 May 2025 · 6:26 pm</td>
            <td>2.29893</td>
            <td id="e2">--</td>
            <td id="pl2">--</td>
          </tr>
        </tbody>
      </table>

      <h2>Thesis</h2>
      <p>
        Walking past the beauty counter this spring felt surreal:
        a blue-chip house like Estée Lauder was priced like a broken biotech stock, this was a fantastic buying opportunity for such a cheap beast of a company. In spite of Jim Cramer calling the stock "horrendous", I think it is a great buy and diversifies the portfolio nicely.
      </p>

      <h2>Risk / Exit Plan</h2>
      <ul>
        <li>China headwinds: two quarters &lt; 5% sales growth → trim 50%</li>
        <li>Management shuffle: surprise CEO/CFO exit → re-evaluate</li>
        <li>Thesis creep: if I pitch “Hims &amp; Hers is the new EL” → halve</li>
        <li>Hard stop: −25% on blended entry</li>
      </ul>

      <small>
        Educational only — not investment advice. I do <strong>not</strong> manage external capital.
      </small>
    </section>
  </main>

  <!-- Live price & dynamic P/L via FinancialModelingPrep -->
  <script>
    /* constants */
    const units1   = 4.46025,
          units2   = 2.29893,
          avgEntry = 66.57,
          lev      = 5;

    (async () => {
      // replace YOUR_API_KEY with your FinancialModelingPrep key
      const apiKey = 'YOUR_API_KEY';
      const url    = `https://financialmodelingprep.com/api/v3/quote/EL?apikey=${apiKey}`;

      const resp = await fetch(url).catch(()=>null);
      const json = resp ? await resp.json().catch(()=>null) : null;
      if (!json || !json.length) {
        console.error('Failed to fetch EL quote');
        return;
      }

      const live = parseFloat(json[0].price);
      document.getElementById('liveP').textContent = live.toFixed(2);

      // derive entry prices
      const entry2 = live / (1 + 23.77/100);
      const entry1 = (avgEntry*(units1+units2) - units2*entry2) / units1;

      // overall leveraged P/L
      const overall = ((live - avgEntry)/avgEntry*100*lev).toFixed(2);
      document.getElementById('totPL').textContent = (overall>=0? '+' : '') + overall + ' %';

      // update each lot row
      function upd(entry, cellE, cellPL) {
        document.getElementById(cellE).textContent = entry.toFixed(2);
        const pct = ((live - entry)/entry*100*lev).toFixed(2);
        document.getElementById(cellPL).textContent = (pct>=0? '+' : '') + pct + ' %';
      }
      upd(entry1, 'e1', 'pl1');
      upd(entry2, 'e2', 'pl2');
    })();
  </script>
</body>
</html>

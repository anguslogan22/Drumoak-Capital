<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>About | Thistle Point Capital</title>

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

<style>
:root{
  --bg:#0d1117; --card:#161b22; --txt:#c9d1d9; --accent:#4db5ff;
}
*{box-sizing:border-box;margin:0;padding:0}
body{
  font-family:'Inter',sans-serif;background:var(--bg);color:var(--txt);
  display:flex;justify-content:center;padding:3rem 1rem;
}
.card{
  background:var(--card);border-radius:14px;box-shadow:0 6px 24px rgba(0,0,0,.45);
  max-width:950px;width:100%;padding:2.5rem 3rem;display:flex;gap:2.5rem;flex-wrap:wrap;
}
.headshot{
  flex:0 0 220px;height:220px;border-radius:50%;object-fit:cover;border:5px solid var(--accent);
}
.content{flex:1 1 320px;display:flex;flex-direction:column;gap:1.25rem}
h1{font-size:2rem;letter-spacing:-.02em;font-weight:600}
h2{font-size:1.25rem;margin-top:1.5rem}
p{line-height:1.55}
table{width:100%;border-collapse:collapse;margin-top:.5rem}
td{padding:.35rem .5rem;vertical-align:top}
td:first-child{font-weight:600}
a.btn{
  display:inline-block;margin-top:.75rem;background:var(--accent);color:#002842;
  padding:.55rem 1.15rem;border-radius:8px;font-weight:600;text-decoration:none;
  transition:transform .15s;box-shadow:0 2px 6px rgba(0,0,0,.4)
}
a.btn:hover{transform:translateY(-2px)}
hr{border:none;border-top:1px solid #30363d;margin:1.5rem 0}
small{font-size:.8rem;opacity:.75}
</style>
</head>

<body>
<div class="card">
  <!-- profile -->
  <img src="/assets/profile.jpg" alt="Angus Logan" class="headshot"
       onerror="this.style.display='none'">

  <!-- text -->
  <div class="content">
    <h1>Angus Logan</h1>

    <p>
      Second-year Finance major &amp; Statistics minor at <strong>McGill University</strong>;
      varsity men’s soccer defender; and markets obsessive behind <strong>Thistle&nbsp;Point&nbsp;Capital</strong>.
    </p>

    <p>
      Outside the trading screen I serve as Associate Director&nbsp;&ndash;&nbsp;Corporate Relations at
      <em>McGill&nbsp;Ventures</em> and Co-Founder / Co-President of
      <em>McGill Athletes in Business</em>.
    </p>

    <!-- links -->
    <table>
      <tr><td>CV&nbsp;(PDF)</td><td><a href="/Angus_Logan_CV.pdf" class="btn">Download</a></td></tr>
      <tr><td>LinkedIn</td><td><a href="https://www.linkedin.com/in/angus-logan/"
                                  target="_blank">linkedin.com/in/angus-logan</a></td></tr>
      <tr><td>Email</td><td><a href="mailto:angus.logan123@gmail.com">angus.logan123@gmail.com</a></td></tr>
    </table>

    <hr>

    <h2>Site Map</h2>
    <table>
      <tr><td>Portfolio</td><td>Live positions, weights, risk notes</td></tr>
      <tr><td>History</td><td>Closed trades, win-rate stats, full rationales</td></tr>
      <tr><td>Algo Lab</td><td>Python notebooks &amp; back-tests (coming soon)</td></tr>
      <tr><td>Resources</td><td>Books, data APIs, reading list (coming soon)</td></tr>
    </table>

    <hr>

    <small>
      Disclaimer: Educational purposes only. Nothing here constitutes investment advice,
      solicitation or recommendation. I do not manage external capital.
    </small>
  </div>
</div>
</body>
</html>

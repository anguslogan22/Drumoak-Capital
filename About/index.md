<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>About | Thistle Point Capital</title>

<!-- Typeface -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

<style>
:root{
  --bg:#0d1117;    /* page background */
  --card:#161b22;  /* info panel */
  --txt:#c9d1d9;   /* body text */
  --accent:#4db5ff;/* buttons / borders */
}
*{box-sizing:border-box;margin:0;padding:0}
body{
  font-family:'Inter',sans-serif;
  background:var(--bg);
  color:var(--txt);
  min-height:100vh;
  display:flex;
  flex-direction:column;
}

/* ─── navigation (same as home) ─────────────────────────────── */
nav{
  background:rgba(13,17,23,.75);
  backdrop-filter:blur(4px);
  padding:.75rem 1.5rem;
}
nav ul{list-style:none;display:flex;gap:1.5rem;align-items:center}
nav a{color:var(--txt);text-decoration:none;font-weight:600}
nav a:hover{color:var(--accent)}
nav strong{font-size:1.15rem}

/* ─── main bio card ─────────────────────────────────────────── */
main{flex:1;display:grid;place-items:center;padding:3rem 1rem}
.card{
  background:var(--card);
  border-radius:14px;
  box-shadow:0 6px 24px rgba(0,0,0,.45);
  padding:2.75rem 3rem;
  display:flex;
  gap:2.5rem;
  max-width:950px;
  width:100%;
  flex-wrap:wrap;
}
.headshot{
  flex:0 0 220px;
  height:220px;
  border-radius:50%;
  border:5px solid var(--accent);
  object-fit:cover;
}
.content{flex:1 1 320px;display:flex;flex-direction:column;gap:1.35rem}
h1{font-size:2rem;font-weight:600;letter-spacing:-.02em}
h2{font-size:1.25rem;margin-top:1rem;margin-bottom:.25rem}
p{line-height:1.55}
table{width:100%;border-collapse:collapse}
td{padding:.35rem .5rem;vertical-align:top}
td:first-child{font-weight:600;white-space:nowrap}
a.btn{
  display:inline-block;
  background:var(--accent);
  color:#002842;
  padding:.55rem 1.25rem;
  border-radius:8px;
  font-weight:600;
  text-decoration:none;
  transition:transform .15s;
  box-shadow:0 2px 6px rgba(0,0,0,.4);
}
a.btn:hover{transform:translateY(-2px)}
hr{border:none;border-top:1px solid #30363d;margin:1.5rem 0}
small{font-size:.8rem;opacity:.75}
@media(max-width:640px){
  .headshot{flex:0 0 140px;height:140px}
}
</style>
</head>

<body>

<!-- nav -->
<nav>
  <ul>
    <li><strong>Thistle&nbsp;Point&nbsp;Capital</strong></li>
    <li><a href="/About/">About</a></li>
    <li><a href="/portfolio/">Portfolio</a></li>
    <li><a href="/history/">History</a></li>
  </ul>
</nav>

<!-- bio card -->
<main>
  <section class="card">

    <img src="/assets/profile.jpg" alt="Angus Logan" class="headshot"
         onerror="this.style.display='none'">

    <div class="content">
      <h1>Angus Logan</h1>

      <p>
        Second-year Finance major &amp; Statistics minor at <strong>McGill University</strong>;
        varsity men’s soccer midfielder; and the analyst, coder, and risk-manager behind
        <strong>Thistle&nbsp;Point&nbsp;Capital</strong>.
      </p>

      <p>
        I currently serve as Associate Director &ndash; Corporate Relations at <em>McGill Ventures</em>
        and Co-Founder / Co-President of <em>McGill Athletes in Business</em>.
        This site is my open notebook&mdash;every position, back-test, and post-mortem lives in public.
      </p>

      <!-- links -->
      <h2>Contact &amp; Documents</h2>
      <table>
        <tr><td>CV&nbsp;(PDF)</td><td><a href="/Angus_Logan_CV.pdf" class="btn">Download</a></td></tr>
        <tr><td>LinkedIn</td><td><a href="https://www.linkedin.com/in/angus-logan/" target="_blank">
                                   linkedin.com/in/angus-logan</a></td></tr>
        <tr><td>Email</td><td><a href="mailto:angus.logan123@gmail.com">angus.logan123@gmail.com</a></td></tr>
      </table>

      <!-- site map -->
      <hr>
      <h2>Site Map</h2>
      <table>
        <tr><td>Portfolio</td><td>Live positions, weights, risk notes</td></tr>
        <tr><td>History</td><td>Closed trades, win-rate stats, rationales</td></tr>
        <tr><td>Algo Lab</td><td>Python notebooks &amp; back-tests (coming soon)</td></tr>
        <tr><td>Resources</td><td>Books, data APIs, reading list (coming soon)</td></tr>
      </table>

      <hr>
      <small>
        Disclaimer: Educational purposes only. Nothing here constitutes investment advice,
        solicitation, or recommendation. I do not manage external capital.
      </small>
    </div>
  </section>
</main>

</body>
</html>

/* Drumoak Capital: published coverage.
   To add a report: copy one object, edit it, put it at the top of the list,
   then copy any file in /reports/ and change data-ticker in it to the new ticker.
   move = implied move in % (midpoint for a range); drives sorting and colour.
   chart.type: "scenarios" (bear/base/bull vs price), "range" (price, street, target), "recovery", "football". */
window.DRUMOAK_REPORTS = [
  {
    ticker: "CHRT", slug: "chrt", exch: "LSE AIM", name: "Cohort PLC",
    sector: "Defence", tags: ["Aerospace & Defence", "Defence Electronics"],
    type: "long", rating: "Buy", date: "2026-09", dateLabel: "Sep 2026",
    ref: "1,194p", target: "1,839p", move: 54.0, moveLabel: "+54.0%",
    headline: "A rearmament compounder priced at a small-cap discount",
    summary: "Structural NATO and UK rearmament thesis across sonar, electronic warfare and secure communications. 6.8% revenue CAGR to FY34E, adjusted EBIT margin expansion from 11.8% to 15.0%, and a net cash build to £247.2m, against a 28% EV/EBITDA discount to peers. Blended DCF (50%), comps (30%) and residual income (20%).",
    stats: [["Market cap", "£556.4m"], ["EV/EBITDA (LTM)", "12.9x"], ["Peer median", "17.9x"], ["Adj. EBIT margin FY26A", "11.8%"], ["Net cash FY34E", "£247.2m"], ["WACC", "7.26%"]],
    debate: "Cohort trades on 12.9x LTM EV/EBITDA against a peer median of 17.9x. The market attributes the gap to smaller market capitalisation and lower liquidity relative to BAE Systems and L3Harris.",
    view: "The discount is not explained by a quality gap. Margins sit inside the peer range, revenue is underwritten by contracted NATO and UK rearmament spend, and the net cash trajectory funds bolt-on M&A without diluting the balance sheet. The discount should narrow as FY27E and FY28E results confirm the margin path.",
    pillars: [
      ["Contracted growth", "A 6.8% revenue CAGR from FY26A to FY34E, underwritten by contracted rather than speculative NATO and UK defence spending across sonar, electronic warfare and secure communications."],
      ["Margin expansion", "Adjusted EBIT margin moves from 11.8% to 15.0% by FY34E on mix shift toward higher-value electronic warfare and sonar systems and operating leverage. EPS compounds at 9.6%, around 1.4x revenue growth, not double."],
      ["Balance sheet optionality", "Net cash builds from £2.2m in FY26A to £247.2m by FY34E, with capex held near 2.1% of revenue, funding further bolt-on M&A without equity issuance."]
    ],
    valuation: [
      "Three-method blend: DCF 2,049p at 50% weight (WACC 7.26%, terminal growth 2.5%), trading comps 1,812p at 30%, residual income 1,355p at 20%.",
      "The DDM returns 624p and is excluded from the blend because the 30% to 32% payout ratio understates the value of retained earnings.",
      "Even excluding the DCF entirely, a comps and residual income blend still implies around +36% upside, so the call does not rest on DCF assumptions."
    ],
    catalysts: [
      "FY27 interim results confirming gross margin holds in the 36% to 38% range or better.",
      "Normalisation of the working-capital-heavy FY26A, visible in H1 FY27 cash conversion.",
      "UK Defence Investment Plan delivery against the 3.5% of GDP core defence target.",
      "Further bolt-on acquisitions funded from the growing net cash position."
    ],
    risks: [
      "UK and European procurement timelines slip, delaying contract conversion.",
      "Acquisition integration risk and overpaying for targets, which is not explicitly modelled.",
      "Gross margin stalling below 36%, the early warning sign for the margin thesis.",
      "The size and liquidity discount persists regardless of fundamentals."
    ],
    chart: { type: "football" },
    model: true,
    pdf: "assets/Angus Logan Drumoak Capital Cohort PLC (LON-CHRT) Equity Research Report.pdf"
  },
  {
    ticker: "RNWH", slug: "rnwh", exch: "LSE", name: "Renew Holdings PLC",
    sector: "Infrastructure", tags: ["Engineering Services", "Infrastructure"],
    type: "long", rating: "Buy", date: "2026-08", dateLabel: "Aug 2026",
    ref: "920p", target: "1,343.5p", move: 46, moveLabel: "+46.0%",
    headline: "An asset-light infrastructure compounder screeners misread",
    summary: "Non-discretionary infrastructure maintenance thesis. Asset-light exposure to CP7 rail and AMP8 water regulatory cycles, high-ROCE capital efficiency, a record £915m order book, disciplined programmatic M&A and the removal of legacy contract risk.",
    stats: [["Market cap", "£710m"], ["FY25 revenue", "£1,116m"], ["FY25 adj. EBIT", "£72.1m"], ["Order book", "£915m"], ["ROCE", "17.2%"], ["FCF conversion", "85%"]],
    debate: "First-pass screens see a contractor on a 6.5% EBIT margin and price it like one.",
    view: "Renew leases specialist heavy plant on a cost pass-through basis rather than owning it. Capex stays below 1.5% of sales and capital turnover of 2.66x lifts ROCE to around 17%. Over 90% of revenue sits inside statutory regulatory frameworks, so this is a compounder, not a cyclical contractor.",
    pillars: [
      ["Regulatory demand visibility", "Over 90% of revenue comes from statutory frameworks: Network Rail CP7 (£44bn, 2024 to 2029) and Ofwat AMP8 (£88bn, 2025 to 2030). The work is non-discretionary and insulated from the macro cycle."],
      ["Capital efficiency", "A labour-led model with leased plant keeps capex below 1.5% of revenue. ROCE of 17.2% decomposes into a 6.46% margin and 2.66x capital turnover."],
      ["Disciplined M&A", "Cash generation funds bolt-ons of regional specialists at 4.5x to 6.0x EV/EBITDA, integrated into tier-1 national frameworks for immediate accretion."],
      ["Legacy risk removed", "The late-2024 divestment of Walter Lilly removed fixed-price building exposure, leaving a pure-play infrastructure services business."]
    ],
    valuation: [
      "Five-year DCF (FY26E to FY30E) at a WACC of 8.92% and 2.25% terminal growth gives an enterprise value of £1,075.5m and 1,343.5p per share.",
      "Bear case 890p on 3.5% organic growth, a 6.0% margin and 9.5% WACC. Bull case 1,680p on 10.5% growth with bolt-on M&A and a 7.2% margin.",
      "FCF conversion of 85% of EBIT supports the cash flow profile underlying the DCF."
    ],
    catalysts: [
      "AMP8 task-order ramp as Renew's water framework coverage expands from 3 to 10 of the 12 major UK water authorities.",
      "Bolt-on acquisitions in energy and nuclear at 4.5x to 6.0x EBITDA.",
      "Order book progression above the record £915m.",
      "Re-rating as the market moves from margin-based to ROCE-based screening."
    ],
    risks: [
      "CP7 or AMP8 execution delays slow organic growth toward the 3.5% bear case.",
      "Labour cost inflation outpaces contract indexation, compressing margins toward 6.0%.",
      "Water sector stress at the client level.",
      "Acquisition integration risk as the bolt-on programme scales."
    ],
    chart: { type: "scenarios", unit: "p", price: 920, rows: [["Bear", 890], ["Base", 1343.5], ["Bull", 1680]] },
    pdf: "assets/Angus Logan Equity Research_ Renew Holdings PLC (LSE_ RNWH).pdf"
  },
  {
    ticker: "SNBR", slug: "snbr", exch: "NASDAQ (delisted)", name: "Sleep Number",
    sector: "Consumer", tags: ["Debt Restructuring", "Consumer Discretionary"],
    type: "credit", rating: "Chapter 11", date: "2026-07", dateLabel: "Jul 2026",
    ref: "$672.5m funded debt", target: "$415m sale", move: null, moveLabel: "Recovery note",
    headline: "The fulcrum sits inside the secured class",
    summary: "Chapter 11 analysis of the lender-supervised Section 363 sale: DIP financing and roll-up mechanics, the fulcrum within the secured creditor class, estimated recoveries across the capital structure, and the proposed sale to a Sleep Country Canada affiliate.",
    stats: [["Petition date", "12 Jun 2026"], ["Court", "S.D.N.Y."], ["Funded debt", "$672.5m"], ["DIP facility", "$260m"], ["Sale price", "$415m"], ["Blended recovery", "around 50%"]],
    debate: "One credit agreement and one lender group make the capital structure look simple, so the obvious read puts the fulcrum between secured and unsecured creditors.",
    view: "The DIP financing fractures the secured class. A $195m roll-up converts prepetition debt into a superpriority, priming claim, leaving the remaining $477.5m to recover whatever the $415m sale covers once the DIP is repaid. The fulcrum sits inside the secured class, a level above where most readers look.",
    pillars: [
      ["A sale run through a court", "The petition and the asset purchase agreement landed the same day, after a 14-week Guggenheim process: 52 parties contacted, 19 NDAs, five proposals. This was a lender-supervised Section 363 sale, not a reorganisation."],
      ["Why it happened", "FY2025 revenue fell 16% to $1.4bn. Q1 2026 adjusted EBITDA fell 74% to $6m and liquidity reached $40m, only $10m above the covenant floor."],
      ["DIP and roll-up mechanics", "$65m of new money plus a $195m roll-up of prepetition claims sit at superpriority. The residual $477.5m of prepetition secured debt is primed and recovers around 32%."]
    ],
    valuation: [
      "DIP new money ($65m) and roll-up ($195m) recover around 100%.",
      "Residual prepetition secured debt (around $477.5m) recovers around 32%. Netted pro rata across the same lender group, $350m of value against $672.5m of claims is a blended recovery near 50%.",
      "Trade and lease-rejection claims and common equity recover around zero."
    ],
    catalysts: [
      "Bid deadline 8 July, auction 13 July, sale hearing 15 July and closing 31 July 2026.",
      "A competing bid at auction above the $415m stalking horse would lift residual secured recovery."
    ],
    risks: [
      "Challenges to the roll-up from residual lenders or the creditors' committee.",
      "Lease-rejection and trade claims are unquantified but out of the money under the base case.",
      "Closing conditions on the Sleep Country Canada sale."
    ],
    chart: { type: "recovery", rows: [["DIP new money", 65, 100], ["DIP roll-up", 195, 100], ["Residual secured", 477.5, 32]] },
    pdf: "assets/Drumoak Capital SNBR Debt Restructuring Report July 2026.pdf"
  },
  {
    ticker: "CDRE", slug: "cdre", exch: "NYSE", name: "Cadre Holdings Inc",
    sector: "Defence", tags: ["Industrials", "Aerospace & Defence"],
    type: "long", rating: "Buy", date: "2026-05", dateLabel: "May 2026",
    ref: "$29.85", target: "$38.78", move: 29.9, moveLabel: "+29.9%",
    headline: "A public-market roll-up in a defence wrapper",
    summary: "Mission-critical safety equipment compounder. Disciplined bolt-on M&A platform, certification-driven replacement demand, TYR Tactical integration, European defence and nuclear safety exposure, and a discount to higher-quality industrial peers.",
    stats: [["Market cap", "$1.22bn"], ["FY25 sales", "$610.3m"], ["FY25 adj. EBITDA", "$111.7m"], ["Gross margin", "42.5%"], ["Fwd EV/EBITDA", "around 10x"], ["Capex / revenue", "1.1%"]],
    debate: "The market sees a defence-adjacent industrial and prices it at around 10x forward EBITDA, below every quality peer.",
    view: "Cadre is a capital allocation platform consolidating certified safety niches. FY2025 operating cash flow doubled to $63.7m, gross margin rose 140bps to 42.5% and the dividend grew for the 17th consecutive quarter while $89.6m went into acquisitions.",
    pillars: [
      ["The M&A platform", "TYR Tactical ($175m, February 2026) is the blueprint: 66% international revenue against 17% for existing Cadre, so revenue synergies are additive rather than cannibalised, with immediate EPS accretion guided."],
      ["Replacement demand", "Body armour carries a defined service life and certification creates multi-year switching costs. Agencies defer infrastructure, not frontline equipment."],
      ["Nuclear safety", "Decommissioning, weapons modernisation and the commercial nuclear build-out, the last linked to AI power demand, form a second growth leg largely ignored by sell-side coverage."]
    ],
    valuation: [
      "FY2026E EV/EBITDA exit framework bridged through $184m of net debt and around 41.0m diluted shares.",
      "Base case $38.78: management midpoint revenue of $747m, a 19.0% EBITDA margin and a 12.5x multiple, still below MSA Safety (around 13x) and Federal Signal (around 12x).",
      "Bear $25.17 at 10.0x and a 17.5% margin. Bull $57.46 at 15.0x and a 21.0% margin."
    ],
    catalysts: [
      "Q1 and Q2 2026 results showing post-TYR EBITDA margin expansion.",
      "Further bolt-ons, following the Tedder Industries and Alien Gear Holsters announcement in March 2026.",
      "European procurement flowing through TYR's international footprint.",
      "A re-rating into the 12x to 14x peer range."
    ],
    risks: [
      "TYR integration failure on the largest deal in the company's history.",
      "Leverage: long-term debt rose from $211.8m to $291.0m in FY2025.",
      "Fixed-price exposure, around 65% of Distribution revenue, against input cost inflation."
    ],
    chart: { type: "scenarios", unit: "$", price: 29.85, rows: [["Bear", 25.17], ["Base", 38.78], ["Bull", 57.46]] },
    pdf: "assets/Angus Logan Equity Research Cadre Holdings Inc (CDRE) .pdf"
  },
  {
    ticker: "MDA", slug: "mda", exch: "TSX / NYSE", name: "MDA Space Ltd",
    sector: "Space", tags: ["Industrials", "Space & Defence"],
    type: "short", rating: "Sell", date: "2026-04", dateLabel: "Apr 2026",
    ref: "C$47.57", target: "C$25.08", move: -47.3, moveLabel: "−47.3%",
    headline: "A defence contractor wearing a space-tech suit",
    summary: "Valuation mismatch short. Mix shift toward lower-margin sovereign defence contracts, structural margin pressure, backlog conversion risk, institutional selling after the NYSE listing, and the likely loss of a space-tech premium multiple.",
    stats: [["Market cap", "C$6.6bn"], ["Fwd P/E", "around 50x"], ["EV/EBITDA", "around 20x"], ["FY25 EBITDA margin", "19.8%"], ["Backlog", "C$4.0bn"], ["Shares", "137.7m"]],
    debate: "The market prices MDA alongside capital-light space disruptors such as Rocket Lab, at around 50x forward earnings.",
    view: "The business is pivoting toward sovereign defence work (49North, Arctic surveillance, Canadian Surface Combatant) on 12% to 15% EBITDA margins. That is a valuation category error, and category errors correct. The short does not need MDA to miss a number.",
    pillars: [
      ["The re-rating trap", "As the revenue mix approaches 50/50 commercial and defence by 2028, the right peers become Lockheed Martin (17.6x), Northrop Grumman (around 14x) and BAE Systems (around 14x), not Rocket Lab."],
      ["Structural margin erosion", "Fixed-price sovereign contracts and capped-margin procurement hold EBITDA margins at 12% to 15%. The model has 2026E margins of 17.2% (bear) and 19.0% (base) against 19.8% in FY2025A."],
      ["The institutional exit signal", "Institutional ownership fell by around 17% after the March 2026 NYSE listing, as funds used US liquidity to sell into retail demand."]
    ],
    valuation: [
      "Single-period FY2026E EV/EBITDA exit framework, bridged through C$120m of net debt and 137.7m shares.",
      "Bear C$25.08 at 12.0x, the defence prime median, and a 17.2% margin. Base C$43.74 at 18.0x on management guidance, still 8.1% below the price.",
      "Bull C$67.92 at 25.0x. The sensitivity grid shows a Sell across most realistic margin and multiple combinations."
    ],
    catalysts: [
      "Margin disclosure as defence revenue scales, starting with Q1 results on 7 May 2026.",
      "The NASA Artemis delay removing the robotics segment's growth premium.",
      "Neutral-to-negative 2026 FCF against C$250m of guided capex."
    ],
    risks: [
      "Artemis acceleration or a takeover bid from a US defence prime, the main squeeze risk.",
      "A revenue beat without margin disclosure delaying the re-rating.",
      "Canada-US tariff carve-outs neutralising part of the input cost headwind."
    ],
    chart: { type: "scenarios", unit: "C$", price: 47.57, rows: [["Bear", 25.08], ["Base", 43.74], ["Bull", 67.92]] },
    pdf: "assets/Angus Logan Equity Research MDA Space Ltd (MDA) .pdf"
  },
  {
    ticker: "GAW", slug: "gaw", exch: "LSE", name: "Games Workshop Group PLC",
    sector: "Consumer", tags: ["Consumer Discretionary", "Gaming & IP"],
    type: "long", rating: "Buy", date: "2026-03", dateLabel: "Mar 2026",
    ref: "17,260p", target: "21,000p to 22,500p", move: 26, moveLabel: "+22% to +30%",
    headline: "Core business at peak? Amazon optionality at zero",
    summary: "Warhammer IP flywheel. Structural core growth, Space Marine 2 conversion, Amazon optionality, pricing power, and alternative data signals pointing to upside not reflected in consensus.",
    stats: [["Market cap", "around £5.7bn"], ["FY25 revenue", "£617.5m"], ["FY25 EBIT margin", "42.6%"], ["Fwd P/E", "around 27x"], ["Street target", "20,009p"], ["Net cash", "around £165m"]],
    debate: "At around 28x trailing earnings the stock looks fully valued, and the Space Marine 2 licensing windfall will not repeat.",
    view: "The market is making two errors. It reads the 47% fall in H1 FY2026 licensing income as deterioration when it is the annualisation of a one-off, while core revenue grew 17.3% to £316.1m without a new edition. And it assigns roughly zero value to the Amazon media deal, which the sum-of-parts puts at 2,000p to 6,000p per share.",
    pillars: [
      ["Not a mature asset", "Core growth of 17.3% in a half with no new Warhammer 40,000 edition points to audience expansion. Space Marine 2 sold 7 million copies; 2% to 5% conversion is 140,000 to 350,000 potential new hobbyists."],
      ["Amazon optionality", "A probability-weighted real-options model values the Warhammer media franchise separately from the core DCF, calibrated against comparable IP licensing deals."],
      ["Pricing power", "Management offset a £12m tariff hit with US price increases and saw no demand response. 3D printing is assessed as a 2% to 3% annual headwind, not an existential threat."]
    ],
    valuation: [
      "Two-stage core DCF: bear 10,800p, base 16,500p, bull 21,200p, against a street-implied core value of around 19,500p.",
      "A separate real-options layer for the Amazon IP deal, worth 1,800p in the base case.",
      "Target range of 21,000p to 22,500p against a street average of 20,009p."
    ],
    catalysts: [
      "An Amazon showrunner announcement, estimated at a 10% to 15% re-rating on the news.",
      "H2 FY2026 core growth above 12%, confirming the new hobbyist pipeline.",
      "Google Trends holding above 80 without a new gaming catalyst."
    ],
    risks: [
      "Core growth falling below 8% for two consecutive halves.",
      "No showrunner by the end of 2026 and Amazon reassigning writer-room staff.",
      "3D printing and tariffs eroding pricing power faster than assessed."
    ],
    chart: { type: "range", unit: "p", price: 17260, street: 20009, lo: 21000, hi: 22500 },
    pdf: "assets/Drumoak Capital Games Workshop Group PLC (GAW) Equity Research Report March 2026.pdf"
  },
  {
    ticker: "SBUX", slug: "sbux", exch: "NASDAQ", name: "Starbucks Corporation",
    sector: "Consumer", tags: ["Consumer Discretionary", "Beverages"],
    type: "short", rating: "Sell", date: "2026-03", dateLabel: "Mar 2026",
    ref: "$97.15", target: "$45 to $55", move: -48.5, moveLabel: "−43% to −54%",
    headline: "Paying a premium for a turnaround the numbers cannot yet support",
    summary: "40x forward earnings for a turnaround the numbers do not yet support. Arabica costs near 50-year highs, US share erosion, $21.9bn of net debt, and a three-scenario DCF implying 43% to 54% downside.",
    stats: [["Market cap", "around $110bn"], ["Fwd P/E", "39.7x"], ["Industry P/E", "22.0x"], ["FY25 EBIT margin", "7.9%"], ["Net debt", "$21.9bn"], ["US share (Technomic)", "48%"]],
    debate: "Brian Niccol turned around Chipotle and Q1 FY2026 delivered the first transaction-led positive comp in eight years, so the bull case says he will do it again.",
    view: "The operator is not the question. The question is whether early signs of a turnaround justify 40x forward earnings, nearly double the 22x industry average, after an EPS miss and a 420bp contraction in North America margins. Even the bull case DCF sits 18% below the price.",
    pillars: [
      ["Commodity squeeze", "At $1.05/lb arabica in FY2019, EBIT margin was 15.4%. At $3.80/lb in FY2025 it was 7.9%. Guidance implies only partial recovery toward 11%."],
      ["Structural competition", "US share fell from 52% to 48% between 2023 and 2025, with Dutch Bros, McCafé and Luckin expanding and hybrid work cutting morning occasions."],
      ["Balance sheet constraint", "Net debt of $21.9bn against $2.4bn of annual FCF limits buybacks, and the China JV deconsolidation removes long-run growth optionality."]
    ],
    valuation: [
      "Three-scenario DCF: bear $34.20, base $54.80, bull $79.50, against a street-implied value of around $101.",
      "Base case assumes margins recover toward 11.5% by FY2028 and comps stabilise above 3%.",
      "The bull case is the street's scenario, full margin recovery to 14% to 15%, and still implies 18% downside."
    ],
    catalysts: [
      "Arabica staying above $3.50/lb through Q3 2026.",
      "Comps falling below +2% for two consecutive quarters.",
      "US market share below 47% in the next Technomic survey."
    ],
    risks: [
      "Comps accelerating to +5% with simultaneous margin expansion.",
      "A sustained fall in arabica below $3.00/lb, the biggest catalyst for a thesis review.",
      "An activist arriving with a credible capital return programme."
    ],
    chart: { type: "scenarios", unit: "$", price: 97.15, rows: [["Bear", 34.20], ["Base", 54.80], ["Bull", 79.50]] },
    pdf: "assets/Drumoak Capital Starbucks Corporation (SBUX) Equity Research Report March 2026.pdf"
  },
  {
    ticker: "CELH", slug: "celh", exch: "NASDAQ", name: "Celsius Holdings",
    sector: "Consumer", tags: ["Consumer Staples", "Beverages"],
    type: "long", rating: "Buy", date: "2026-01", dateLabel: "Jan 2026",
    ref: "$45.74", target: "$70.00", move: 53, moveLabel: "+53.0%",
    headline: "From one brand to a three-brand energy platform",
    summary: "Three-brand energy platform. Celsius, Alani Nu and Rockstar (North America) portfolio transition, PepsiCo distribution dynamics, and 2026 to 2029 earnings power under base and bull execution.",
    stats: [["Market cap", "$11.79bn"], ["Q3'25 revenue", "around $725m"], ["Gross margin", "51.3%"], ["US energy share", "over 20%"], ["PepsiCo stake", "11%"], ["Fwd P/E", "39.7x"]],
    debate: "Is the three-brand portfolio and deeper PepsiCo alignment a durable platform, or will 2026 show that growth was mostly a distribution and M&A reset?",
    view: "The 25% to 30% drawdown after Q3 2025 looks like integration and deal-cost anxiety rather than broken demand. Scanner growth of 13% for the Celsius brand and portfolio growth of 31% are the real signals, and PepsiCo raising its stake to 11% is a vote of confidence.",
    pillars: [
      ["Portfolio segmentation", "Celsius for mainstream better-for-you, Alani Nu for women and Gen Z, Rockstar for value and convenience. Together over 20% of tracked US energy."],
      ["Distribution control", "As PepsiCo's Strategic Energy Drink Captain, Celsius gains influence over planograms, SKU priority and cooler execution. Alani Nu moved into Pepsi's network from 1 December."],
      ["Cash funds the build", "The balance sheet funds innovation, integration and a $300m buyback announced in November 2025."]
    ],
    valuation: [
      "2026 to 2029 earnings power framework under base and bull execution, with an illustrative FCF range to check cash conversion.",
      "The $70 target sits inside the base to bull implied range and assumes execution de-risks through early 2026.",
      "The swing factor is whether wider availability converts into repeat velocity while gross margin holds above 50%."
    ],
    catalysts: [
      "Alani Nu distribution inflection through PepsiCo in Q1 to H1 2026.",
      "Scanner and velocity re-accelerating across all three brands.",
      "Rockstar margin improvement targeted for H1 2026."
    ],
    risks: [
      "Share and velocity deteriorating against the category for two consecutive quarters.",
      "Rising promotional intensity needed to hold volume.",
      "Margin compression persisting beyond the transition period."
    ],
    chart: { type: "range", unit: "$", price: 45.74, lo: 70, hi: 70 },
    pdf: "assets/Drumoak Capital Celsius Holdings (CELH) Equity Research Report January 2026.pdf"
  }
];

/* Cohort PLC model inputs, from the September 2026 report (Appendix A and Sections 8 to 10). */
window.DRUMOAK_CHRT = {
  fcf: [46.1, 40.8, 40.8, 44.7, 47.8, 50.7, 53.1, 55.2],   // FY27E to FY34E unlevered FCF, £m
  years: ["FY27E", "FY28E", "FY29E", "FY30E", "FY31E", "FY32E", "FY33E", "FY34E"],
  cash: 49.6, debt: 47.4, nci: 1.8, shares: 46.6,           // £m, £m, £m, m
  wacc: 7.26, g: 2.5, price: 1194,
  comps: 1812, rim: 1355, ddm: 624,
  weights: { dcf: 0.5, comps: 0.3, rim: 0.2 },
  compsRange: [1719, 2210]
};

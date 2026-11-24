/* Drumoak Capital: published coverage.
   To add a report, copy one object, edit the fields and put it at the top of the list.
   move = implied move in % (use the midpoint for a range); it drives sorting and colour. */
window.DRUMOAK_REPORTS = [
  {
    ticker: "CHRT", exch: "LSE AIM", name: "Cohort PLC",
    sector: "Defence", tags: ["Aerospace & Defence", "Defence Electronics"],
    type: "long", rating: "Buy", date: "2026-09", dateLabel: "Sep 2026",
    ref: "1,194p", target: "1,839p", move: 54.0, moveLabel: "+54.0%",
    summary: "Structural NATO and UK rearmament thesis across sonar, electronic warfare and secure communications. 6.8% revenue CAGR to FY34E, adjusted EBIT margin expansion from 11.8% to 15.0%, and a net cash build to £247.2m, against a 28% EV/EBITDA discount to peers. Blended DCF (50%), comps (30%) and residual income (20%).",
    pdf: "assets/Angus Logan Drumoak Capital Cohort PLC (LON-CHRT) Equity Research Report.pdf"
  },
  {
    ticker: "RNWH", exch: "LSE", name: "Renew Holdings PLC",
    sector: "Infrastructure", tags: ["Engineering Services", "Infrastructure"],
    type: "long", rating: "Buy", date: "2026-08", dateLabel: "Aug 2026",
    ref: "900p to 920p", target: "1,343.5p", move: 46, moveLabel: "+46%",
    summary: "Non-discretionary infrastructure maintenance thesis. Asset-light exposure to CP7 rail and AMP8 water regulatory cycles, high-ROCE capital efficiency, a record £915m order book, disciplined programmatic M&A and the removal of legacy contract risk.",
    pdf: "assets/Angus Logan Equity Research_ Renew Holdings PLC (LSE_ RNWH).pdf"
  },
  {
    ticker: "SNBR", exch: "NASDAQ (delisted)", name: "Sleep Number",
    sector: "Consumer", tags: ["Debt Restructuring", "Consumer Discretionary"],
    type: "credit", rating: "Chapter 11", date: "2026-07", dateLabel: "Jul 2026",
    ref: "$672.5m funded debt", target: "$415m sale", move: null, moveLabel: "Recovery note",
    kpis: [["Funded debt", "$672.5m"], ["DIP facility", "Up to $260m"], ["Sale price", "$415m"]],
    summary: "Chapter 11 analysis of the lender-supervised Section 363 sale: DIP financing and roll-up mechanics, the fulcrum within the secured creditor class, estimated recoveries across the capital structure, and the proposed sale to a Sleep Country Canada affiliate.",
    pdf: "assets/Drumoak Capital SNBR Debt Restructuring Report July 2026.pdf"
  },
  {
    ticker: "CDRE", exch: "NYSE", name: "Cadre Holdings Inc",
    sector: "Defence", tags: ["Industrials", "Aerospace & Defence"],
    type: "long", rating: "Buy", date: "2026-05", dateLabel: "May 2026",
    ref: "$29.85", target: "$38.78", move: 29.9, moveLabel: "+29.9%",
    summary: "Mission-critical safety equipment compounder. Disciplined bolt-on M&A platform, certification-driven replacement demand, TYR Tactical integration, European defence and nuclear safety exposure, and a discount to higher-quality industrial peers.",
    pdf: "assets/Angus Logan Equity Research Cadre Holdings Inc (CDRE) .pdf"
  },
  {
    ticker: "MDA", exch: "TSX / NYSE", name: "MDA Space Ltd",
    sector: "Space", tags: ["Industrials", "Space & Defence"],
    type: "short", rating: "Sell", date: "2026-04", dateLabel: "Apr 2026",
    ref: "C$47.57", target: "C$25.08", move: -47.3, moveLabel: "−47.3%",
    summary: "Valuation mismatch short. Mix shift toward lower-margin sovereign defence contracts, structural margin pressure, backlog conversion risk, institutional selling after the NYSE listing, and the likely loss of a space-tech premium multiple.",
    pdf: "assets/Angus Logan Equity Research MDA Space Ltd (MDA) .pdf"
  },
  {
    ticker: "GAW", exch: "LSE", name: "Games Workshop Group PLC",
    sector: "Consumer", tags: ["Consumer Discretionary", "Gaming & IP"],
    type: "long", rating: "Buy", date: "2026-03", dateLabel: "Mar 2026",
    ref: "17,260p", target: "21,000p to 22,500p", move: 26, moveLabel: "+22% to +30%",
    summary: "Warhammer IP flywheel. Structural core growth, Space Marine 2 conversion, Amazon optionality, pricing power, and alternative data signals pointing to upside not reflected in consensus.",
    pdf: "assets/Drumoak Capital Games Workshop Group PLC (GAW) Equity Research Report March 2026.pdf"
  },
  {
    ticker: "SBUX", exch: "NASDAQ", name: "Starbucks Corporation",
    sector: "Consumer", tags: ["Consumer Discretionary", "Beverages"],
    type: "short", rating: "Sell", date: "2026-03", dateLabel: "Mar 2026",
    ref: "$97.15", target: "$45 to $55", move: -48.5, moveLabel: "−43% to −54%",
    summary: "40x forward earnings for a turnaround the numbers do not yet support. Arabica costs near 50-year highs, US share erosion, $21.9bn of net debt, and a three-scenario DCF implying 43% to 54% downside.",
    pdf: "assets/Drumoak Capital Starbucks Corporation (SBUX) Equity Research Report March 2026.pdf"
  },
  {
    ticker: "CELH", exch: "NASDAQ", name: "Celsius Holdings",
    sector: "Consumer", tags: ["Consumer Staples", "Beverages"],
    type: "long", rating: "Buy", date: "2026-01", dateLabel: "Jan 2026",
    ref: "$45.74", target: "$70.00", move: 53, moveLabel: "+53%",
    summary: "Three-brand energy platform. Celsius, Alani Nu and Rockstar (North America) portfolio transition, PepsiCo distribution dynamics, and 2026 to 2029 earnings power under base and bull execution.",
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

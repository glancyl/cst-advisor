/* CST Training: ILM case study page styles · v7
   Palette from the live ILM course pages and hubs: blue #4c6bd8, navy #1d2560, orange #ff8c04. */
(function () {
  if (document.getElementById('ilmcs-styles')) return;
  var f = document.createElement('link');
  f.rel = 'stylesheet';
  f.href = 'https://fonts.googleapis.com/css2?family=Asap:wght@400;600;700&display=swap';
  document.head.appendChild(f);

  var css = `
.ilmcs{--navy:#1d2560;--blue:#4c6bd8;--orange:#ff8c04;--light:#f4f5f9;--pale:#e9ebf5;--line:#dcdfea;--body:#3D4665;--muted:#6B7394;--r:14px;
  font-family:"Asap",Arial,sans-serif;color:var(--body);font-size:16px;line-height:1.6}
.ilmcs *,.ilmcs *::before,.ilmcs *::after{box-sizing:border-box}
.ilmcs h1,.ilmcs h2,.ilmcs h3{font-family:"Asap",Arial,sans-serif!important;font-weight:700!important;color:var(--navy);margin:0 0 14px!important;letter-spacing:0}
.ilmcs h1{font-size:clamp(1.9rem,3.6vw,2.7rem)!important;line-height:1.18!important;color:#fff!important}
.ilmcs h2{font-size:clamp(1.6rem,3.2vw,2.4rem)!important;line-height:1.2!important}
.ilmcs h3{font-size:1.2rem!important;line-height:1.3!important;margin:0 0 8px!important}
.ilmcs p{margin:0 0 .9em}
.ilmcs a{text-decoration:none}
.ilmcs :focus-visible{outline:3px solid var(--orange);outline-offset:2px}
.ilmcs-wrap{max-width:1140px;margin:0 auto;padding:0 20px}
.ilmcs-narrow{max-width:860px}
.ilmcs-head{text-align:center;max-width:860px;margin:0 auto 34px}
.ilmcs-head p{margin:0}
.ilmcs-eyebrow{font-weight:700;font-size:.82rem!important;text-transform:uppercase;letter-spacing:.12em;color:var(--orange)!important;margin:0 0 10px!important}
.ilmcs-eyebrow.navy{color:var(--navy)!important}
.ilmcs-eyebrow.light{color:#fff!important;opacity:.85}

/* Section colours */
.ilmcs-white,.ilmcs-light,.ilmcs-navy,.ilmcs-blue,.ilmcs-orange{padding:60px 0}
.ilmcs-white{background:#fff}
.ilmcs-light{background:var(--light)}
.ilmcs-navy{background:var(--navy)}
.ilmcs-blue{background:var(--blue)}
.ilmcs-orange{background:var(--orange)}
.ilmcs-navy h2,.ilmcs-blue h2,.ilmcs-navy .ilmcs-head p,.ilmcs-blue .ilmcs-head p,.ilmcs-two>div:first-child p,.ilmcs-narrow>p{color:#fff!important}
.ilmcs-orange h2{color:var(--navy)!important}
.ilmcs-orange .ilmcs-head p{color:var(--navy)!important;font-weight:600}

/* Hero */
.ilmcs-hero{background:var(--blue);color:#fff;padding:50px 0 76px;border-bottom-right-radius:50px;position:relative;z-index:2;margin-bottom:-50px}
.ilmcs-hero h1{max-width:880px}
.ilmcs-hero .ilmcs-eyebrow{color:#fff!important;opacity:.85}
.ilmcs-lede{color:#fff!important;font-size:1.12rem;max-width:760px}
.ilmcs-byline{font-size:.85rem;color:#dfe5fb!important;margin:20px 0 0!important}
.ilmcs-ticks-hero{list-style:none!important;margin:16px 0 0!important;padding:0!important;display:flex;flex-wrap:wrap;gap:10px 26px}
.ilmcs-ticks-hero li{display:flex;gap:10px;align-items:center;font-weight:700;margin:0;color:#fff}
.ilmcs-ticks-hero li::before,.ilmcs-ticks li::before{content:"";flex:0 0 20px;height:20px;border-radius:50%;background:var(--orange) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5.5 10.5l3 2.8 6-6.3' fill='none' stroke='%23fff' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/20px no-repeat}
.ilmcs-first{padding-top:110px}

/* Buttons */
.ilmcs-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:26px}
.ilmcs-ctas.left{justify-content:flex-start}
.ilmcs-btn{display:inline-block;padding:13px 28px;border-radius:30px;border:2px solid transparent;font-weight:700;font-size:1rem;transition:background .15s,color .15s}
.ilmcs-btn.pri{background:var(--orange);border-color:var(--orange);color:#fff!important}
.ilmcs-btn.pri:hover{background:#e67d00;border-color:#e67d00}
.ilmcs-btn.gh{background:transparent;border-color:#fff;color:#fff!important}
.ilmcs-btn.gh:hover{background:rgba(255,255,255,.14)}
.ilmcs-btn.navy{background:var(--navy);border-color:var(--navy);color:#fff!important}
.ilmcs-btn.navy:hover{background:#151c4d}
.ilmcs-btn.wh{background:#fff;border-color:#fff;color:var(--navy)!important}
.ilmcs-btn.wh:hover{background:var(--pale)}

/* Story 1 quote card */
.ilmcs-quote{position:relative;max-width:900px;margin:0 auto;background:#fff;border-radius:var(--r);border-top:6px solid var(--orange);padding:44px 48px 32px;box-shadow:0 14px 40px rgba(0,0,0,.25)}
.ilmcs .ilmcs-quote p{color:var(--navy)!important;font-size:1.08rem!important;line-height:1.7!important;margin:0 0 1em!important;text-align:left}
.ilmcs .ilmcs-quote p.ilmcs-who{color:var(--muted)!important;font-size:.92rem!important;margin:6px 0 0!important}
.ilmcs-qmark{position:absolute;top:-6px;left:24px;font-family:Georgia,serif;font-size:96px;line-height:1;color:var(--orange)}
.ilmcs-quote mark{display:inline;background:#fff7ec;color:var(--navy);font-weight:700;padding:2px 4px;border-radius:4px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.ilmcs-who{font-weight:700;color:var(--muted)!important;font-size:.92rem!important;margin:6px 0 0!important}

/* Timeline on orange */
.ilmcs-path{list-style:none!important;margin:0 auto!important;padding:0!important;display:flex;gap:14px;align-items:stretch;justify-content:center;max-width:1100px}
.ilmcs-path>li{flex:1 1 0;min-width:0}
.ilmcs-path li{background:#fff;border-radius:var(--r);padding:22px 16px;margin:0;text-align:center;display:flex;flex-direction:column;gap:4px;box-shadow:0 8px 22px rgba(29,37,96,.15)}
.ilmcs-path li.cst{background:var(--navy);transform:translateY(-8px);box-shadow:0 14px 30px rgba(29,37,96,.35)}
.ilmcs-path em{align-self:center;font-style:normal;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;background:var(--orange);color:#fff;border-radius:999px;padding:4px 10px;margin-bottom:6px}
.ilmcs-path strong{color:var(--navy);font-size:1.08rem}
.ilmcs-path span{font-size:.93rem;color:var(--muted);line-height:1.45}
.ilmcs .ilmcs-path li{font-size:.93rem;line-height:1.45;color:var(--muted)}
.ilmcs .ilmcs-path li.cst,.ilmcs .ilmcs-path li.cst *:not(em){color:#fff!important}

/* Endorsement on blue */
.ilmcs-endorse{max-width:940px;margin:0 auto;text-align:center}
.ilmcs .ilmcs-endorse-h{color:#fff!important;font-size:clamp(2.2rem,5vw,3.4rem)!important;line-height:1.1!important;margin:0 0 22px!important}
.ilmcs-endorse-text{color:#fff!important;font-size:clamp(1.15rem,2vw,1.4rem)!important;line-height:1.6!important;font-weight:600}
.ilmcs-endorse-who{color:#dfe5fb!important;font-size:.95rem}
.ilmcs-endorse-who strong{color:#fff}
.ilmcs-endorse::before{content:"\\201C";display:block;font-family:Georgia,serif;font-size:90px;line-height:.8;color:var(--orange)}

.ilmcs-endorse-2{max-width:820px;margin:36px auto 0;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);border-top:5px solid var(--orange);border-radius:14px;padding:28px 32px}
.ilmcs .ilmcs-endorse-2-text{color:#fff!important;font-size:1.08rem!important;line-height:1.65!important;font-style:italic}

/* Chips */
.ilmcs-chips{list-style:none!important;margin:0!important;padding:0!important;display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
.ilmcs-chips li{background:var(--pale);border-bottom:3px solid var(--orange);border-radius:999px;padding:9px 18px;font-weight:700;color:var(--navy);margin:0}

/* Layout and cards */
.ilmcs-two{display:grid;grid-template-columns:1.2fr 1fr;gap:44px;align-items:center}
.ilmcs-grid2{display:grid;grid-template-columns:1fr 1fr;gap:22px;max-width:1000px;margin:0 auto}
.ilmcs-panel{background:#fff;border-top:6px solid var(--orange);border-radius:var(--r);padding:28px 30px}
.ilmcs-panel li{color:var(--navy);font-weight:600}
.ilmcs-card{background:#fff;color:var(--body);border-radius:var(--r);padding:28px;border-top:6px solid var(--orange);box-shadow:0 10px 30px rgba(29,37,96,.08)}
.ilmcs-card p{color:var(--body)!important;margin:0}
.ilmcs-card.bordered{border:1px solid var(--line);border-top:6px solid var(--orange)}
.ilmcs-pill{display:inline-block;background:var(--blue);color:#fff;font-size:.8rem;font-weight:700;padding:5px 12px;border-radius:999px;margin-bottom:12px}
.ilmcs-ticks{list-style:none!important;margin:0 0 18px!important;padding:0!important;display:grid;gap:10px}
.ilmcs-ticks li{display:flex;gap:10px;align-items:flex-start;margin:0}
.ilmcs-ticks li::before{margin-top:2px}
.ilmcs-link{font-weight:700;color:var(--navy)!important;border-bottom:2px solid var(--orange)}

/* Steps on blue */
.ilmcs-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;counter-reset:s;list-style:none!important;margin:0!important;padding:0!important}
.ilmcs-steps li{counter-increment:s;background:#fff;border-top:6px solid var(--orange);border-radius:var(--r);padding:26px 24px;margin:0}
.ilmcs-steps li::before{content:counter(s);display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:var(--navy);color:#fff;font-weight:700;margin-bottom:12px}
.ilmcs-steps p{margin:0;font-size:.97rem;color:var(--body)!important}

.ilmcs-source{font-size:.9rem!important;color:#c9d0ee!important;border-top:1px solid rgba(255,255,255,.2);padding-top:14px;margin-top:22px!important}
.ilmcs-source a{color:#fff!important;font-weight:700;border-bottom:2px solid var(--orange)}

/* Theme resets */
.ilmcs blockquote,.ilmcs mark{quotes:none}
.ilmcs ul li::marker,.ilmcs ol li::marker{content:none}

/* WordPress adds empty paragraphs and line breaks inside grids */
.ilmcs-path>:not(li),.ilmcs-chips>:not(li),.ilmcs-steps>:not(li),.ilmcs-ticks>:not(li),.ilmcs-ticks-hero>:not(li),.ilmcs-grid2>:not(div),.ilmcs-two>:not(div){display:none!important}
.ilmcs-ctas>p{display:contents}
.ilmcs p:empty,.ilmcs-path>br,.ilmcs-chips>br,.ilmcs-two>br,.ilmcs-grid2>br,.ilmcs-steps>br,.ilmcs-ctas>br,.ilmcs-ticks>br,.ilmcs-ticks-hero>br,.ilmcs-quote>br{display:none}

@media (max-width:1000px){
  .ilmcs-path{flex-wrap:wrap}
  .ilmcs-path>li{flex:1 1 40%}
  .ilmcs-path li.cst{transform:none}
}
@media (max-width:900px){
  .ilmcs-two,.ilmcs-grid2,.ilmcs-steps{grid-template-columns:1fr}
}
@media (max-width:700px){
  .ilmcs-white,.ilmcs-light,.ilmcs-navy,.ilmcs-blue,.ilmcs-orange{padding:44px 0}
  .ilmcs-hero{border-bottom-right-radius:30px;margin-bottom:-30px;padding-bottom:56px}
  .ilmcs-first{padding-top:80px}
  .ilmcs-quote{padding:40px 22px 24px}
  .ilmcs-path>li{flex:1 1 100%}
}`;
  var s = document.createElement('style');
  s.id = 'ilmcs-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

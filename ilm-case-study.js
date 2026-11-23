/* CST Training: ILM case study page styles · v2
   Palette and section styles from the live First Aid and NVQ hubs. */
(function () {
  if (document.getElementById('ilmcs-styles')) return;
  var f = document.createElement('link');
  f.rel = 'stylesheet';
  f.href = 'https://fonts.googleapis.com/css2?family=Alata&family=Asap:wght@400;600;700&display=swap';
  document.head.appendChild(f);

  var css = `
.ilmcs{--navy:#1d2560;--blue:#4c6bd8;--orange:#ff8c04;--light:#f4f5f9;--pale:#e9ebf5;--line:#dcdfea;--body:#3D4665;--muted:#6B7394;--r:14px;
  font-family:"Asap",Arial,sans-serif;color:var(--body);font-size:16px;line-height:1.6}
.ilmcs *,.ilmcs *::before,.ilmcs *::after{box-sizing:border-box}
.ilmcs h1,.ilmcs h2,.ilmcs h3{font-family:"Asap",Arial,sans-serif;font-weight:700;color:var(--navy);margin:0 0 12px}
.ilmcs h1{font-size:clamp(1.9rem,3.6vw,2.6rem)!important;line-height:1.2!important;color:#fff}
.ilmcs h2{font-size:clamp(1.7rem,3.4vw,2.4rem)!important;line-height:1.2!important}
.ilmcs h3{font-size:1.2rem!important;line-height:1.3!important;margin:0 0 8px!important}
.ilmcs p{margin:0 0 .9em}
.ilmcs :focus-visible{outline:3px solid var(--orange);outline-offset:2px}
.ilmcs-wrap{max-width:1140px;margin:0 auto;padding:0 20px}
.ilmcs-narrow{max-width:860px}
.ilmcs-head{text-align:center;max-width:820px;margin:0 auto 30px}
.ilmcs-head p{margin:0}
.ilmcs-eyebrow{font-weight:700;font-size:.82rem;text-transform:uppercase;letter-spacing:.12em;color:var(--orange);margin:0 0 10px!important}

/* Section colours */
.ilmcs-white,.ilmcs-light,.ilmcs-pale,.ilmcs-navy,.ilmcs-blue{padding:56px 0}
.ilmcs-white{background:#fff}
.ilmcs-light{background:var(--light)}
.ilmcs-pale{background:var(--pale)}
.ilmcs-navy{background:var(--navy);color:#fff}
.ilmcs-blue{background:var(--blue);color:#fff}
.ilmcs-navy h2,.ilmcs-blue h2{color:#fff}
.ilmcs-navy p,.ilmcs-blue p{color:#fff}

/* Hero */
.ilmcs-hero{background:var(--blue);color:#fff;padding:48px 0 70px;border-bottom-right-radius:50px;position:relative;z-index:1;margin-bottom:-50px}
.ilmcs-hero .ilmcs-wrap{max-width:1140px}
.ilmcs-hero h1{max-width:860px}
.ilmcs-hero .ilmcs-eyebrow{color:#fff;opacity:.85}
.ilmcs-lede{color:#fff;font-size:1.12rem;max-width:760px}
.ilmcs-byline{font-size:.85rem;color:#dfe5fb;margin:18px 0 0!important}
.ilmcs-ticks-hero{list-style:none;margin:16px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:10px 26px}
.ilmcs-ticks-hero li{display:flex;gap:10px;align-items:center;font-weight:700;margin:0}
.ilmcs-ticks-hero li::before,.ilmcs-ticks li::before{content:"";flex:0 0 20px;height:20px;border-radius:50%;background:var(--orange) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5.5 10.5l3 2.8 6-6.3' fill='none' stroke='%23fff' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/20px no-repeat}
.ilmcs-first{padding-top:96px}

/* Buttons */
.ilmcs-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px}
.ilmcs-ctas.left{justify-content:flex-start}
.ilmcs-btn{display:inline-block;padding:13px 26px;border-radius:30px;border:2px solid transparent;font-weight:700;text-decoration:none!important;transition:background .15s}
.ilmcs-btn.pri{background:var(--orange);border-color:var(--orange);color:#fff!important}
.ilmcs-btn.pri:hover{background:#e67d00;border-color:#e67d00}
.ilmcs-btn.gh{background:transparent;border-color:#fff;color:#fff!important}
.ilmcs-btn.gh:hover{background:rgba(255,255,255,.14)}

/* Story 1 */
.ilmcs-story{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:40px;align-items:start}
.ilmcs-quote{margin:0;background:#fff;border-radius:var(--r);border-top:5px solid var(--orange);padding:30px 32px;box-shadow:0 10px 30px rgba(0,0,0,.18)}
.ilmcs-quote p{color:var(--navy)!important;font-size:1.05rem;line-height:1.65}
.ilmcs-quote footer{font-weight:700;color:var(--muted);font-size:.9rem;margin-top:6px}

/* Timeline */
.ilmcs-path{list-style:none;margin:10px 0 0;padding:0;display:grid;grid-template-columns:repeat(5,1fr)}
.ilmcs-path li{position:relative;padding:46px 12px 0;margin:0;text-align:center}
.ilmcs-path li::before{content:"";position:absolute;top:8px;left:50%;transform:translateX(-50%);width:24px;height:24px;border-radius:50%;background:#fff;border:5px solid var(--blue);z-index:1}
.ilmcs-path li:last-child::before{background:var(--orange);border-color:var(--orange)}
.ilmcs-path li::after{content:"";position:absolute;top:19px;left:50%;width:100%;height:3px;background:var(--pale)}
.ilmcs-path li:last-child::after{display:none}
.ilmcs-path strong{display:block;color:var(--navy);font-size:1.05rem;margin-bottom:4px}
.ilmcs-path span{display:block;font-size:.95rem;color:var(--muted);line-height:1.45}

/* Endorsement */
.ilmcs-endorse{max-width:1000px;margin:0 auto;background:#fff;border:1px solid var(--line);border-left:6px solid var(--orange);border-radius:var(--r);padding:34px 40px;box-shadow:0 10px 30px rgba(29,37,96,.08)}
.ilmcs-endorse blockquote{margin:0 0 16px;padding:0;border:0;font-size:1.25rem;line-height:1.55;color:var(--navy);font-style:normal;background:none}
.ilmcs-endorse figcaption{color:var(--muted);font-size:.95rem}
.ilmcs-endorse figcaption strong{color:var(--navy)}

/* Chips */
.ilmcs-chips{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
.ilmcs-chips li{background:#fff;border:1.5px solid #c3c8dc;border-radius:999px;padding:9px 16px;font-weight:600;color:var(--navy);margin:0}

/* Layout and cards */
.ilmcs-two{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center}
.ilmcs-grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:1000px;margin:0 auto}
.ilmcs-panel{background:var(--light);border:1px solid var(--line);border-top:5px solid var(--orange);border-radius:var(--r);padding:26px 28px}
.ilmcs-card{background:#fff;color:var(--body);border-radius:var(--r);padding:26px;border-top:5px solid var(--orange)}
.ilmcs-card p{color:var(--body)!important;margin:0}
.ilmcs-card.bordered{border:1px solid var(--line);border-top:5px solid var(--orange);box-shadow:0 10px 30px rgba(29,37,96,.06)}
.ilmcs-pill{display:inline-block;background:var(--navy);color:#fff;font-size:.8rem;font-weight:700;padding:5px 12px;border-radius:999px;margin-bottom:12px}
.ilmcs-ticks{list-style:none;margin:0 0 16px;padding:0;display:grid;gap:10px}
.ilmcs-ticks li{display:flex;gap:10px;align-items:flex-start;margin:0}
.ilmcs-ticks li::before{margin-top:2px}
.ilmcs-link{font-weight:700;color:var(--navy)!important;text-decoration:none!important;border-bottom:2px solid var(--orange)}

/* Steps */
.ilmcs-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;counter-reset:s;list-style:none;margin:0;padding:0}
.ilmcs-steps li{counter-increment:s;background:#fff;border:1px solid var(--line);border-top:4px solid var(--orange);border-radius:var(--r);padding:24px 22px;margin:0}
.ilmcs-steps li::before{content:counter(s);display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--navy);color:#fff;font-weight:700;margin-bottom:12px}
.ilmcs-steps p{margin:0;font-size:.97rem}

.ilmcs-source{font-size:.9rem;color:var(--muted);border-top:1px solid #c3c8dc;padding-top:14px;margin-top:20px!important}
.ilmcs-source a{color:var(--navy);font-weight:700}

/* WordPress adds empty paragraphs and line breaks inside grids */
.ilmcs-story>p:empty,.ilmcs-path>p:empty,.ilmcs-chips>p:empty,.ilmcs-two>p:empty,.ilmcs-grid2>p:empty,.ilmcs-steps>p:empty,.ilmcs-ctas>p:empty,.ilmcs-ticks>p:empty,.ilmcs-ticks-hero>p:empty,
.ilmcs-story>br,.ilmcs-path>br,.ilmcs-chips>br,.ilmcs-two>br,.ilmcs-grid2>br,.ilmcs-steps>br,.ilmcs-ctas>br,.ilmcs-ticks>br,.ilmcs-ticks-hero>br{display:none}

@media (max-width:900px){
  .ilmcs-story,.ilmcs-two,.ilmcs-grid2,.ilmcs-steps{grid-template-columns:1fr}
  .ilmcs-path{grid-template-columns:1fr}
  .ilmcs-path li{text-align:left;padding:0 0 22px 44px}
  .ilmcs-path li::before{left:12px;top:0;transform:translateX(-50%)}
  .ilmcs-path li::after{left:11px;top:20px;width:3px;height:100%}
}
@media (max-width:700px){
  .ilmcs-white,.ilmcs-light,.ilmcs-pale,.ilmcs-navy,.ilmcs-blue{padding:40px 0}
  .ilmcs-hero{border-bottom-right-radius:30px;margin-bottom:-30px;padding-bottom:56px}
  .ilmcs-first{padding-top:70px}
  .ilmcs-endorse,.ilmcs-quote{padding:24px 20px}
  .ilmcs-endorse blockquote{font-size:1.08rem}
}`;
  var s = document.createElement('style');
  s.id = 'ilmcs-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

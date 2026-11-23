/* CST Training: ILM case study page styles. Host in cst-advisor repo. */
(function () {
  if (document.getElementById('ilmcs-styles')) return;

  var fonts = document.createElement('link');
  fonts.rel = 'stylesheet';
  fonts.href = 'https://fonts.googleapis.com/css2?family=Alata&family=Asap:wght@400;600;700&display=swap';
  document.head.appendChild(fonts);

  var css = `
.cst-ilm-cs{--navy:#1C2560;--orange:#FF8A00;--surface:#F4F6FA;--border:#DDE3F0;--body:#3D4665;--muted:#6B7394;--key-bg:#FFF7EC;--key-bd:#FFC77F;
  font-family:'Asap',Arial,sans-serif;color:var(--body);line-height:1.6;font-size:17px;letter-spacing:.025em}
.cst-ilm-cs *{box-sizing:border-box}
.cst-ilm-cs h1,.cst-ilm-cs h2{font-family:'Alata',Arial,sans-serif;color:var(--navy);line-height:1.15;letter-spacing:.025em;margin:0 0 16px}
.cst-ilm-cs h1{font-size:clamp(30px,4.5vw,46px);color:#fff}
.cst-ilm-cs h2{font-size:clamp(24px,3vw,32px)}
.cst-ilm-cs h3{font-family:'Asap',Arial,sans-serif;font-weight:700;color:var(--navy);font-size:20px;margin:0 0 8px}
.cst-ilm-cs p{margin:0 0 14px}
.ilmcs-wrap{max-width:1140px;margin:0 auto;padding:0 20px}
.ilmcs-narrow{max-width:820px}
.ilmcs-section{padding:64px 0}
.ilmcs-surface{background:var(--surface)}

/* Hero */
.ilmcs-hero{background:var(--navy);color:#fff;padding:80px 0 64px;position:relative;overflow:hidden}
.ilmcs-hero:after{content:"";position:absolute;right:-80px;top:-80px;width:320px;height:320px;border:40px solid rgba(255,138,0,.15);border-radius:50%}
.ilmcs-hero .ilmcs-wrap{position:relative;z-index:1;max-width:900px;margin-left:max(20px,calc((100% - 1140px)/2))}
.ilmcs-lead{font-size:20px;color:#E4E8F5;max-width:760px}
.ilmcs-byline{font-size:15px;color:#A8AFC6;margin-top:6px}
.ilmcs-eyebrow{display:inline-block;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.12em;color:var(--orange);margin-bottom:12px}
.ilmcs-eyebrow-dark{color:var(--orange)}
.ilmcs-hero-btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}
.ilmcs-btn{display:inline-block;padding:14px 26px;border-radius:6px;font-weight:700;text-decoration:none!important;transition:all .2s}
.ilmcs-btn-primary{background:var(--orange);color:#fff!important}
.ilmcs-btn-primary:hover{background:#e67c00}
.ilmcs-btn-ghost{border:2px solid #fff;color:#fff!important}
.ilmcs-btn-ghost:hover{background:#fff;color:var(--navy)!important}

/* Stats */
.ilmcs-stats{background:#fff;border-bottom:1px solid var(--border);padding:28px 0}
.ilmcs-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;text-align:center}
.ilmcs-stat-num{display:block;font-family:'Alata',Arial,sans-serif;font-size:28px;color:var(--navy)}
.ilmcs-stat-label{font-size:14px;color:var(--muted)}

/* Endorsement */
.ilmcs-endorse{margin:0;background:var(--key-bg);border:1px solid var(--key-bd);border-left:6px solid var(--orange);border-radius:10px;padding:36px 40px}
.ilmcs-endorse-label{font-weight:700;text-transform:uppercase;font-size:13px;letter-spacing:.12em;color:var(--orange)}
.ilmcs-endorse blockquote{margin:0 0 18px;padding:0;border:0;font-size:21px;line-height:1.55;color:var(--navy);font-style:normal}
.ilmcs-endorse figcaption{color:var(--muted);font-size:15px}
.ilmcs-endorse figcaption strong{color:var(--navy)}

/* Chips */
.ilmcs-chips{list-style:none;margin:20px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:10px}
.ilmcs-chips li{background:#fff;border:1px solid var(--border);border-radius:999px;padding:8px 16px;font-size:15px;color:var(--navy);font-weight:600;margin:0}

/* Layout */
.ilmcs-two{display:grid;grid-template-columns:1.3fr 1fr;gap:40px;align-items:center}
.ilmcs-grid2{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px}
.ilmcs-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:24px}
.ilmcs-card{background:#fff;border:1px solid var(--border);border-radius:10px;padding:28px}
.ilmcs-surface .ilmcs-card{box-shadow:0 2px 10px rgba(28,37,96,.05)}
.ilmcs-card-key{background:var(--key-bg);border-color:var(--key-bd)}
.ilmcs-card-label{font-weight:700;color:var(--navy)}
.ilmcs-pill{display:inline-block;background:var(--navy);color:#fff;font-size:13px;font-weight:700;padding:5px 12px;border-radius:999px;margin-bottom:12px}
.ilmcs-num{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:var(--navy);color:#fff;font-family:'Alata',Arial,sans-serif;font-size:18px;margin-bottom:14px;border-bottom:3px solid var(--orange)}
.ilmcs-ticks{list-style:none;margin:0 0 16px;padding:0}
.ilmcs-ticks li{position:relative;padding-left:28px;margin:0 0 10px}
.ilmcs-ticks li:before{content:"";position:absolute;left:0;top:7px;width:14px;height:8px;border-left:3px solid var(--orange);border-bottom:3px solid var(--orange);transform:rotate(-45deg)}
.ilmcs-link{font-weight:700;color:var(--navy)!important;text-decoration:none!important;border-bottom:2px solid var(--orange)}

/* Navy story */
.ilmcs-navy{background:var(--navy);color:#E4E8F5}
.ilmcs-navy h2{color:#fff}
.ilmcs-learner-quote{margin:24px 0 10px;padding:28px 32px;background:rgba(255,255,255,.06);border:0;border-left:5px solid var(--orange);border-radius:8px;font-size:18px;line-height:1.65;color:#fff;font-style:normal}
.ilmcs-attrib{color:#A8AFC6;font-size:15px}

/* Path */
.ilmcs-path{list-style:none;margin:28px 0 0;padding:0;display:grid;grid-template-columns:repeat(5,1fr);gap:0;counter-reset:none}
.ilmcs-path li{position:relative;padding:44px 14px 0;margin:0;text-align:center}
.ilmcs-path li:before{content:"";position:absolute;top:10px;left:50%;transform:translateX(-50%);width:20px;height:20px;border-radius:50%;background:#fff;border:4px solid var(--navy);z-index:1}
.ilmcs-path li:last-child:before{background:var(--orange);border-color:var(--orange)}
.ilmcs-path li:after{content:"";position:absolute;top:20px;left:50%;width:100%;height:3px;background:var(--border)}
.ilmcs-path li:last-child:after{display:none}
.ilmcs-path-step{display:block;font-weight:700;color:var(--navy);margin-bottom:6px}
.ilmcs-path-text{display:block;font-size:15px;color:var(--muted);line-height:1.45}

.ilmcs-source{font-size:15px;color:var(--muted);border-top:1px solid var(--border);padding-top:16px;margin-top:24px}
.ilmcs-source a{color:var(--navy)}

/* CTA */
.ilmcs-cta{background:var(--navy);color:#E4E8F5;padding:64px 0;text-align:center}
.ilmcs-cta h2{color:#fff}
.ilmcs-cta .ilmcs-hero-btns{justify-content:center}
.ilmcs-small{font-size:15px;margin-top:16px}
.ilmcs-small a{color:#fff}

@media (max-width:900px){
  .ilmcs-two,.ilmcs-grid2,.ilmcs-grid3{grid-template-columns:1fr}
  .ilmcs-stats-grid{grid-template-columns:1fr 1fr}
  .ilmcs-path{grid-template-columns:1fr}
  .ilmcs-path li{text-align:left;padding:0 0 24px 44px}
  .ilmcs-path li:before{left:10px;top:2px;transform:none}
  .ilmcs-path li:after{left:19px;top:22px;width:3px;height:100%}
  .ilmcs-endorse{padding:26px 22px}
  .ilmcs-endorse blockquote{font-size:18px}
  .ilmcs-section{padding:48px 0}
}`;

  var style = document.createElement('style');
  style.id = 'ilmcs-styles';
  style.textContent = css;
  document.head.appendChild(style);
})();

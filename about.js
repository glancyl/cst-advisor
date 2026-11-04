@import url('https://fonts.googleapis.com/css2?family=Alata&family=Asap:wght@400;700&display=swap');
/* CST Training About Us page styles (v8). Paste into a WPCode CSS snippet, Site Wide Header. Everything is scoped to #cst-about. */
html:has(#cst-about){overflow-x:clip}
#cst-about{--n:#1C2560;--n2:#141B4A;--o:#FF8A00;--s:#F4F6FA;--b:#DDE3F0;--t:#3D4665;--m:#6B7394;--hf:"Alata",Arial,sans-serif;--bf:"Asap",Arial,sans-serif;font-family:var(--bf);color:var(--t);line-height:1.6;font-size:17px;-webkit-font-smoothing:antialiased}
#cst-about *,#cst-about *::before,#cst-about *::after{box-sizing:border-box}
#cst-about h1,#cst-about h2,#cst-about h3,#cst-about h4,#cst-about p{margin:0;padding:0;text-transform:none;text-align:left}#cst-about p{font-size:inherit;line-height:inherit;font-family:inherit;color:inherit}
#cst-about h1,#cst-about h2,#cst-about h3{font-family:var(--hf);font-weight:400;letter-spacing:.02em;line-height:1.12;color:var(--n)}
#cst-about a{text-decoration:none}
#cst-about img{max-width:100%;display:block}
#cst-about button{font-family:inherit;cursor:pointer}
#cst-about .cab-band{width:100vw;margin-left:calc(50% - 50vw);position:relative}
#cst-about .cab-wrap{max-width:1180px;margin:0 auto;padding:0 24px}
#cst-about .cab-sec{padding:96px 0}
#cst-about .cab-eyebrow{display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--o);margin-bottom:14px}
#cst-about .cab-eyebrow::before{content:"";width:22px;height:3px;border-radius:2px;background:var(--o)}
#cst-about .cab-h2{font-size:clamp(30px,4vw,46px);margin-bottom:14px}
#cst-about .cab-lead{font-size:19px;color:var(--m);max-width:640px}
#cst-about .cab-head{margin-bottom:48px}
#cst-about .cab-btn{display:inline-flex;align-items:center;gap:10px;padding:15px 26px;border-radius:999px;font-weight:700;font-size:16px;border:2px solid transparent;transition:transform .25s,box-shadow .25s,background .25s,color .25s}
#cst-about .cab-btn:hover{transform:translateY(-2px)}
#cst-about .cab-btn-o{background:var(--o);color:#fff;box-shadow:0 10px 24px -10px rgba(255,138,0,.8)}
#cst-about .cab-btn-ghost{border-color:rgba(255,255,255,.35);color:#fff}
#cst-about .cab-btn-ghost:hover{border-color:#fff;background:rgba(255,255,255,.08)}
#cst-about .cab-btn-n{background:var(--n);color:#fff}
#cst-about .cab-arrow{display:inline-block;transition:transform .25s}#cst-about .cab-btn:hover .cab-arrow{transform:translateX(4px)}
#cst-about .cab-hero{background:radial-gradient(1200px 600px at 85% 10%,#2A3580 0%,transparent 60%),var(--n);color:#fff;overflow:hidden;padding:110px 0 150px}
#cst-about .cab-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:56px 56px;mask-image:linear-gradient(to bottom,#000 30%,transparent 95%);-webkit-mask-image:linear-gradient(to bottom,#000 30%,transparent 95%)}
#cst-about .cab-rise{position:absolute;bottom:-40%;width:2px;height:120px;background:linear-gradient(to top,transparent,var(--o));border-radius:2px;opacity:.55;animation:cabRise linear infinite}
@keyframes cabRise{from{transform:translateY(0)}to{transform:translateY(-190vh)}}
#cst-about .cab-hero-in{position:relative;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
#cst-about .cab-hero h1{color:#fff;font-size:clamp(38px,5.4vw,66px);margin-bottom:22px}
#cst-about .cab-hero h1 em{font-style:normal;color:var(--o)}
#cst-about .cab-hero .cab-lead{color:rgba(255,255,255,.78);margin-bottom:34px}
#cst-about .cab-hero-btns{display:flex;flex-wrap:wrap;gap:14px}
#cst-about .cab-hero-photo{position:relative}
#cst-about .cab-hero-photo .cab-ph{border-radius:28px;overflow:hidden;box-shadow:0 40px 80px -30px rgba(0,0,0,.6);transform:rotate(1.5deg);transition:transform .6s}
#cst-about .cab-hero-photo:hover .cab-ph{transform:rotate(0)}
#cst-about .cab-hero-photo img{width:100%;aspect-ratio:4/3;object-fit:cover}
#cst-about .cab-badge{position:absolute;left:-28px;bottom:-30px;background:#fff;color:var(--n);border-radius:20px;padding:18px 22px;box-shadow:0 24px 50px -20px rgba(0,0,0,.45);display:flex;gap:16px;align-items:center;max-width:320px;animation:cabFloat 5s ease-in-out infinite}
@keyframes cabFloat{50%{transform:translateY(-8px)}}
#cst-about .cab-badge strong{font-family:var(--hf);font-weight:400;font-size:44px;line-height:1;color:var(--o)}
#cst-about .cab-badge p{font-weight:700;font-size:15px;line-height:1.3;color:var(--n)}
#cst-about .cab-badge .cab-small{display:block;font-weight:400;font-size:12px;color:var(--m);margin-top:4px}
#cst-about .cab-stats{position:relative;margin-top:-80px;z-index:2}
#cst-about .cab-stats-in{display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-radius:24px;box-shadow:0 30px 60px -30px rgba(28,37,96,.35);border:1px solid var(--b);overflow:hidden}
#cst-about .cab-stat{padding:30px 26px;border-right:1px solid var(--b)}#cst-about .cab-stat:last-child{border-right:0}
#cst-about .cab-stat .cab-num{display:block;font-family:var(--hf);font-weight:400;font-size:clamp(32px,3.6vw,44px);color:var(--n);line-height:1.05}

#cst-about .cab-stat .cab-lbl{display:block;margin-top:6px;font-size:15px;color:var(--m)}
#cst-about.cab-ready .cab-story{display:grid;grid-template-columns:280px 1fr;gap:48px}#cst-about:not(.cab-ready) .cab-panels{display:grid;gap:20px}
#cst-about .cab-tabs{display:flex;flex-direction:column;gap:10px}
#cst-about .cab-tab{text-align:left;padding:18px 20px;border-radius:16px;border:1px solid var(--b);background:#fff;color:var(--n);font-weight:700;font-size:16px;display:flex;gap:14px;align-items:center;transition:all .25s}
#cst-about .cab-tab i{font-style:normal;font-family:var(--hf);color:var(--m);font-size:14px}
#cst-about .cab-tab:hover{border-color:var(--n)}
#cst-about .cab-tab[aria-selected="true"]{background:var(--n);color:#fff;border-color:var(--n);box-shadow:0 16px 30px -16px rgba(28,37,96,.6)}
#cst-about .cab-tab[aria-selected="true"] i{color:var(--o)}
#cst-about .cab-panel{background:var(--s);border-radius:24px;padding:44px;position:relative;overflow:hidden;min-height:330px}
#cst-about .cab-panel[hidden]{display:none}
#cst-about .cab-panel.cab-show{animation:cabIn .5s ease both}
@keyframes cabIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
#cst-about .cab-panel h3{font-size:clamp(24px,2.6vw,32px);margin-bottom:16px}
#cst-about .cab-panel p+p{margin-top:14px}
#cst-about .cab-panel .cab-big{position:absolute;right:24px;bottom:-30px;font-family:var(--hf);font-size:180px;line-height:1;color:rgba(28,37,96,.05);pointer-events:none}
#cst-about .cab-quote{margin-top:56px;background:var(--n);color:#fff;border-radius:28px;padding:56px;position:relative;overflow:hidden;display:grid;grid-template-columns:auto 1fr;gap:36px;align-items:center}
#cst-about .cab-quote::after{content:"";position:absolute;right:-60px;top:-60px;width:240px;height:240px;border-radius:50%;border:40px solid rgba(255,138,0,.12)}
#cst-about .cab-quote img,#cst-about .cab-quote .cab-qi{width:120px;height:120px;border-radius:50%;object-fit:cover;border:4px solid var(--o);background:#fff}
#cst-about .cab-quote blockquote{margin:0;padding:0;border:0;font-family:var(--hf);font-size:clamp(20px,2.3vw,28px);line-height:1.4;color:#fff;position:relative;z-index:1}
#cst-about .cab-quote blockquote::before{content:"\201C";color:var(--o);font-size:1.6em;line-height:0;vertical-align:-.35em;margin-right:4px}
#cst-about .cab-quote .cab-cite{display:block;margin-top:18px;font-style:normal;font-family:var(--bf);font-size:15px;color:rgba(255,255,255,.7)}
#cst-about .cab-quote .cab-cite strong{color:#fff}
#cst-about .cab-pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px}
#cst-about .cab-pillar{border:1px solid var(--b);border-radius:20px;padding:28px;background:#fff;transition:transform .3s,box-shadow .3s,border-color .3s}
#cst-about .cab-pillar:hover{transform:translateY(-6px);box-shadow:0 24px 40px -24px rgba(28,37,96,.4);border-color:transparent}
#cst-about .cab-pillar .cab-ic{width:48px;height:48px;border-radius:14px;background:#FFF7EC;display:grid;place-items:center;margin-bottom:18px}
#cst-about .cab-pillar h3{font-size:20px;margin-bottom:8px}
#cst-about .cab-pillar p{font-size:15px;color:var(--m)}
#cst-about .cab-tl-sec{background:var(--s)}
#cst-about .cab-tl{position:relative;max-width:980px;margin:0 auto}
#cst-about .cab-tl-line{position:absolute;left:50%;top:0;bottom:0;width:4px;margin-left:-2px;background:var(--b);border-radius:4px}
#cst-about .cab-tl-fill{position:absolute;left:0;top:0;width:100%;height:0;background:linear-gradient(var(--n),var(--o));border-radius:4px}
#cst-about .cab-tl-item{position:relative;width:50%;padding:0 48px 56px 0;transition:opacity .7s,transform .7s}
#cst-about .cab-tl-item:nth-child(odd){margin-left:50%;padding:0 0 56px 48px}
#cst-about .cab-tl-item.cab-on{opacity:1;transform:none}@media(min-width:701px){#cst-about .cab-tl-item+.cab-tl-item{margin-top:-90px}}
#cst-about .cab-tl-dot{position:absolute;top:22px;right:-11px;width:22px;height:22px;border-radius:50%;background:#fff;border:4px solid var(--b);transition:border-color .4s,transform .4s;z-index:1}
#cst-about .cab-tl-item:nth-child(odd) .cab-tl-dot{right:auto;left:-11px}
#cst-about .cab-tl-item.cab-on .cab-tl-dot{border-color:var(--o);transform:scale(1.15)}
#cst-about .cab-tl-card{background:#fff;border-radius:20px;padding:26px 28px;box-shadow:0 20px 40px -28px rgba(28,37,96,.45);border:1px solid var(--b)}
#cst-about .cab-tl-card.cab-hl{background:var(--n);border-color:var(--n)}
#cst-about .cab-tl-card.cab-hl h3{color:#fff}#cst-about .cab-tl-card.cab-hl p{color:rgba(255,255,255,.78)}
#cst-about .cab-tl-card p.cab-tl-date{display:inline-block;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--o);margin-bottom:8px}
#cst-about .cab-tl-card h3{font-size:22px;margin-bottom:8px}
#cst-about .cab-tl-card p{font-size:15.5px}
#cst-about .cab-tl-card img{margin-top:16px;border-radius:14px;width:100%;height:170px;object-fit:cover}
#cst-about .cab-gal{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:220px;gap:16px}
#cst-about .cab-gi{display:block;position:relative;border-radius:20px;overflow:hidden;cursor:zoom-in;border:0;padding:0;background:var(--s)}
#cst-about .cab-gi.wide{grid-column:span 2}#cst-about .cab-gi.tall{grid-row:span 2}#cst-about .cab-gi.big{grid-column:span 2;grid-row:span 2}#cst-about .cab-gi.logo{background:#ECEAE6}#cst-about .cab-gi.logo img{object-fit:contain}
#cst-about .cab-gi img{width:100%;height:100%;object-fit:cover;transition:transform .7s}
#cst-about .cab-gi:hover img{transform:scale(1.06)}
#cst-about .cab-gi span{position:absolute;left:0;right:0;bottom:0;padding:40px 18px 14px;background:linear-gradient(transparent,rgba(20,27,74,.85));color:#fff;font-size:14px;font-weight:700;text-align:left;transform:translateY(100%);transition:transform .35s}
#cst-about .cab-gi:hover span,#cst-about .cab-gi:focus-visible span{transform:none}
#cst-about .cab-lb{position:fixed;inset:0;background:rgba(14,19,52,.92);display:none;align-items:center;justify-content:center;z-index:99999;padding:30px}
#cst-about .cab-lb.cab-open{display:flex;animation:cabFade .25s}
@keyframes cabFade{from{opacity:0}}
#cst-about .cab-lb img{max-height:82vh;max-width:90vw;border-radius:14px}
#cst-about .cab-lb p{position:absolute;bottom:22px;left:0;right:0;text-align:center;color:#fff;font-size:15px}
#cst-about .cab-lb button{position:absolute;background:rgba(255,255,255,.12);color:#fff;border:0;width:52px;height:52px;border-radius:50%;font-size:24px;line-height:1}
#cst-about .cab-lb button:hover{background:var(--o)}
#cst-about .cab-lb-x{top:20px;right:20px}#cst-about .cab-lb-p{left:20px;top:50%}#cst-about .cab-lb-n{right:20px;top:50%}
#cst-about .cab-team-sec{background:linear-gradient(var(--n),var(--n2));color:#fff;overflow:hidden}
#cst-about .cab-team-sec .cab-h2{color:#fff}#cst-about .cab-team-sec .cab-lead{color:rgba(255,255,255,.72)}
#cst-about .cab-team-top{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:28px}
#cst-about .cab-search{position:relative;min-width:280px}
#cst-about .cab-search input{width:100%;padding:14px 18px 14px 46px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;font-family:inherit;font-size:16px;outline:none;transition:border-color .2s,background .2s;margin:0;height:auto;box-shadow:none}
#cst-about .cab-search input::placeholder{color:rgba(255,255,255,.55)}
#cst-about .cab-search input:focus{border-color:var(--o);background:rgba(255,255,255,.12)}
#cst-about .cab-search svg{position:absolute;left:17px;top:50%;transform:translateY(-50%);opacity:.6}
#cst-about .cab-chips{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 14px;scrollbar-width:thin;margin-bottom:26px}
#cst-about .cab-chip{flex:0 0 auto;padding:11px 18px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;font-weight:700;font-size:15px;display:flex;gap:8px;align-items:center;transition:all .2s;white-space:nowrap}
#cst-about .cab-chip small{font-size:12px;background:rgba(255,255,255,.14);border-radius:999px;padding:2px 8px;font-weight:700}
#cst-about .cab-chip:hover{border-color:#fff}
#cst-about .cab-chip[aria-pressed="true"]{background:var(--o);border-color:var(--o)}
#cst-about .cab-chip[aria-pressed="true"] small{background:rgba(0,0,0,.15)}
#cst-about .cab-sub{font-family:var(--hf);font-size:20px;color:var(--o);margin:10px 0 18px;letter-spacing:.03em}
#cst-about .cab-people{display:grid;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));gap:18px;margin-bottom:30px}
#cst-about .cab-p{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:22px 14px 20px;text-align:center;transition:transform .3s,background .3s,border-color .3s;animation:cabPop .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 25ms)}
@keyframes cabPop{from{opacity:0;transform:translateY(18px) scale(.96)}}
#cst-about .cab-p:hover{transform:translateY(-6px);background:rgba(255,255,255,.1);border-color:rgba(255,138,0,.6)}
#cst-about .cab-av{width:104px;height:104px;margin:0 auto 14px;border-radius:50%;position:relative;padding:4px;background:conic-gradient(var(--o) 0 0,rgba(255,255,255,.15) 0);transition:background .4s}
#cst-about .cab-p:hover .cab-av{background:conic-gradient(var(--o) 0 360deg,rgba(255,255,255,.15) 0)}
#cst-about .cab-av img{width:100%;height:100%;border-radius:50%;object-fit:cover;background:#fff}
#cst-about .cab-av .cab-in{width:100%;height:100%;border-radius:50%;display:none;place-items:center;background:linear-gradient(135deg,#2A3580,var(--n));font-family:var(--hf);font-size:32px;color:#fff}
#cst-about .cab-av.cab-noimg .cab-in{display:grid}
#cst-about .cab-p .cab-n{margin:0;display:block;font-size:16px;color:#fff}
#cst-about .cab-p .cab-r{display:block;font-size:13px;line-height:1.35;color:rgba(255,255,255,.65);margin-top:4px}
#cst-about .cab-empty{padding:40px;text-align:center;color:rgba(255,255,255,.7)}
#cst-about .cab-team-note{font-size:15px;color:rgba(255,255,255,.6);text-align:center;margin-top:10px}
#cst-about .cab-acc{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
#cst-about .cab-acc a{background:#fff;border:1px solid var(--b);border-radius:18px;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s,border-color .3s}
#cst-about .cab-acc a:hover{transform:translateY(-5px);border-color:var(--o);box-shadow:0 20px 34px -22px rgba(28,37,96,.45)}
#cst-about .cab-acc img{max-height:62px;width:auto;max-width:100%;object-fit:contain;filter:grayscale(1);opacity:.75;transition:filter .3s,opacity .3s}
#cst-about .cab-acc a:hover img{filter:none;opacity:1}
#cst-about .cab-acc .cab-accn{font-size:12px;font-weight:700;color:var(--m);margin-top:8px;letter-spacing:.06em;text-transform:uppercase}
#cst-about .cab-acc a.cab-noimg img{display:none}#cst-about .cab-acc a.cab-noimg .cab-accn{font-family:var(--hf);font-size:22px;color:var(--n);text-transform:none;margin:0}
#cst-about .cab-ven-sec{background:var(--s)}
#cst-about .cab-ven{display:grid;grid-template-columns:1fr 1.15fr;gap:28px;align-items:stretch}
#cst-about .cab-vlist{display:flex;flex-direction:column;gap:10px}
#cst-about .cab-v{cursor:pointer;text-align:left;background:#fff;border:1px solid var(--b);border-radius:16px;padding:16px 18px;display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;color:var(--t);transition:all .25s}
#cst-about .cab-v .cab-pin{width:38px;height:38px;border-radius:12px;background:var(--s);display:grid;place-items:center;transition:background .25s}
#cst-about .cab-v .cab-vn{display:block;color:var(--n);font-size:16px}
#cst-about .cab-v .cab-va{display:block;font-size:13.5px;color:var(--m);line-height:1.4}
#cst-about .cab-v:hover{border-color:var(--n)}
#cst-about .cab-v[aria-pressed="true"]{border-color:var(--o);box-shadow:0 14px 28px -20px rgba(28,37,96,.5)}
#cst-about .cab-v[aria-pressed="true"] .cab-pin{background:var(--o)}#cst-about .cab-v[aria-pressed="true"] .cab-pin svg{stroke:#fff}
#cst-about .cab-map{border-radius:24px;overflow:hidden;background:#dfe5f1;min-height:420px;position:relative;box-shadow:0 30px 60px -36px rgba(28,37,96,.5)}
#cst-about .cab-map iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
#cst-about .cab-map-tag{position:absolute;left:16px;bottom:16px;background:var(--n);color:#fff;padding:10px 16px;border-radius:12px;font-size:14px;font-weight:700;z-index:1;box-shadow:0 10px 20px -10px rgba(0,0,0,.5)}
#cst-about .cab-tag-hq{display:inline-block;margin-left:6px;font-size:11px;font-weight:700;background:var(--o);color:#fff;border-radius:6px;padding:1px 7px;vertical-align:2px}
#cst-about .cab-more{margin-top:16px;font-size:15px;color:var(--m)}
#cst-about .cab-careers{border-radius:32px;background:var(--n);color:#fff;padding:64px;display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center;position:relative;overflow:hidden}
#cst-about .cab-careers::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:40px 40px}
#cst-about .cab-careers>*{position:relative}
#cst-about .cab-careers h2{color:#fff;font-size:clamp(28px,3.4vw,40px);margin-bottom:14px}
#cst-about .cab-careers .cab-txt{color:rgba(255,255,255,.78);margin-bottom:26px}
#cst-about .cab-roles{display:flex;flex-wrap:wrap;gap:10px}
#cst-about .cab-roles a{padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;font-weight:700;font-size:15px;transition:all .2s}
#cst-about .cab-roles a:hover{background:var(--o);border-color:var(--o)}
#cst-about .cab-cta{text-align:center;padding:90px 0 100px}
#cst-about .cab-cta h2{text-align:center;font-size:clamp(30px,4vw,48px);margin-bottom:14px}
#cst-about .cab-cta .cab-txt{text-align:center;max-width:560px;margin:0 auto 30px;color:var(--m)}
#cst-about .cab-foot{font-size:12.5px;color:var(--m);text-align:center;margin-top:36px}

#cst-about .cab-rv.cab-on{opacity:1;transform:none}
#cst-about.cab-ready .cab-dept{display:none}#cst-about.cab-ready .cab-dept.cab-active{display:block}#cst-about:not(.cab-ready) .cab-dept::before{content:attr(data-label);display:block;font-family:var(--hf);font-size:26px;color:#fff;margin:36px 0 18px}
#cst-about .cab-center,#cst-about .cab-center h2{text-align:center}
#cst-about .cab-cta h2,#cst-about .cab-cta .cab-foot{text-align:center}#cst-about .cab-cta .cab-eyebrow{justify-content:center;display:flex}
#cst-about .cab-vtx{min-width:0}#cst-about .cab-v .cab-vn{font-weight:700}#cst-about .cab-p p{text-align:center}#cst-about .cab-p .cab-n{font-weight:700}#cst-about .cab-gi.wide:last-child:nth-child(4){grid-column:1/-1;grid-row:span 2}
#cst-about .cab-hero-btns .cab-btn{margin:0}
#cst-about .cab-quote > img{flex:none}
#cst-about .cab-badge > div{min-width:0}
@media(max-width:980px){#cst-about .cab-hero-in,#cst-about .cab-story,#cst-about .cab-ven,#cst-about .cab-careers{grid-template-columns:1fr}#cst-about .cab-tabs{flex-direction:row;overflow-x:auto}#cst-about .cab-tab{flex:0 0 auto}#cst-about .cab-acc{grid-template-columns:repeat(3,1fr)}#cst-about .cab-stats-in{grid-template-columns:repeat(2,1fr)}#cst-about .cab-stat:nth-child(2){border-right:0}#cst-about .cab-stat:nth-child(-n+2){border-bottom:1px solid var(--b)}#cst-about .cab-pillars{grid-template-columns:1fr}#cst-about .cab-gal{grid-template-columns:repeat(2,1fr)}#cst-about .cab-badge{left:12px}}
@media(max-width:700px){#cst-about .cab-sec{padding:70px 0}#cst-about .cab-hero{padding:80px 0 130px}#cst-about .cab-tl-line{left:11px}#cst-about .cab-tl-item,#cst-about .cab-tl-item:nth-child(odd){width:100%;margin-left:0;padding:0 0 36px 44px}#cst-about .cab-tl-dot,#cst-about .cab-tl-item:nth-child(odd) .cab-tl-dot{left:0;right:auto}#cst-about .cab-quote{grid-template-columns:1fr;padding:36px}#cst-about .cab-panel{padding:30px}#cst-about .cab-careers{padding:36px}#cst-about .cab-acc{grid-template-columns:repeat(2,1fr)}#cst-about .cab-gal{grid-auto-rows:160px}#cst-about .cab-people{grid-template-columns:repeat(2,1fr)}#cst-about .cab-map{min-height:320px}#cst-about .cab-search{min-width:100%}}
@media(prefers-reduced-motion:reduce){#cst-about *{animation:none!important;transition:none!important}#cst-about .cab-rv,#cst-about .cab-tl-item{opacity:1;transform:none}#cst-about .cab-rise{display:none}}
/* ---- v7: works with no JavaScript; JS only adds interactions ---- */
#cst-about .cab-gal > p,#cst-about .cab-acc > p,#cst-about .cab-roles > p,#cst-about .cab-hero-btns > p,#cst-about .cab-ph > p,#cst-about .cab-quote > p.mod-reset,#cst-about .cab-badge > p,#cst-about .cab-p > p:not(.cab-n):not(.cab-r){display:contents}
#cst-about .cab-hero-btns{display:flex;flex-wrap:wrap;gap:14px}
#cst-about .cab-hero::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:linear-gradient(to bottom,#000 30%,transparent 95%);mask-image:linear-gradient(to bottom,#000 30%,transparent 95%);pointer-events:none}
#cst-about .cab-hero-in > *{animation:cabIn .8s ease both}#cst-about .cab-hero-in > *:nth-child(2){animation-delay:.15s}
#cst-about .cab-btn-o::after,#cst-about .cab-btn-n::after{content:"→";display:inline-block;transition:transform .25s}#cst-about .cab-btn-o:hover::after,#cst-about .cab-btn-n:hover::after{transform:translateX(4px)}
#cst-about .cab-quote blockquote p{display:inline;margin:0;font:inherit;color:inherit}
#cst-about .cab-tl::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:4px;margin-left:-2px;background:var(--b);border-radius:4px}
#cst-about .cab-tl::after{content:"";position:absolute;left:50%;top:0;width:4px;margin-left:-2px;height:var(--fill,0%);background:linear-gradient(var(--n),var(--o));border-radius:4px}
#cst-about .cab-tl-item::before{content:"";position:absolute;top:22px;right:-11px;width:22px;height:22px;border-radius:50%;background:#fff;border:4px solid var(--o);z-index:1}
#cst-about .cab-tl-item:nth-child(odd)::before{right:auto;left:-11px}
#cst-about .cab-tl-card{position:relative;z-index:1}
#cst-about .cab-pillar[data-icon]::before{content:"";display:block;width:48px;height:48px;border-radius:14px;margin-bottom:18px;background:#FFF7EC center/24px no-repeat}
#cst-about .cab-pillar[data-icon="shield"]::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FF8A00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E%3C/svg%3E")}
#cst-about .cab-pillar[data-icon="star"]::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FF8A00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'/%3E%3C/svg%3E")}
#cst-about .cab-pillar[data-icon="home"]::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FF8A00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 10.5 12 3l9 7.5V21H3z'/%3E%3Cpath d='M9 21v-6h6v6'/%3E%3C/svg%3E")}
#cst-about .cab-v{display:grid;grid-template-columns:38px 1fr;column-gap:14px;align-items:center;cursor:pointer}
#cst-about .cab-v::before{content:"";grid-row:1 / 3;width:38px;height:38px;border-radius:12px;background:var(--s) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231C2560' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z'/%3E%3Ccircle cx='12' cy='10' r='2.5'/%3E%3C/svg%3E") center/20px no-repeat}
#cst-about .cab-v[aria-pressed="true"]::before{background:var(--o) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z'/%3E%3Ccircle cx='12' cy='10' r='2.5'/%3E%3C/svg%3E") center/20px no-repeat}
#cst-about .cab-v .cab-vn,#cst-about .cab-v .cab-va{grid-column:2}
#cst-about .cab-p img{display:block;width:104px;height:104px;border-radius:50%;object-fit:cover;margin:0 auto 14px;border:4px solid rgba(255,255,255,.15);background:#fff}
#cst-about .cab-p .cab-av img{width:100%;height:100%;margin:0;border:0}
#cst-about .cab-p:not(:has(img)):not(:has(.cab-av))::before{content:"";display:block;width:104px;height:104px;margin:0 auto 14px;border-radius:50%;background:linear-gradient(135deg,#2A3580,#1C2560);border:4px solid rgba(255,255,255,.15)}
#cst-about .cab-acc a img{display:block}
@media(max-width:700px){#cst-about .cab-tl::before,#cst-about .cab-tl::after{left:11px}#cst-about .cab-tl-item::before,#cst-about .cab-tl-item:nth-child(odd)::before{left:0;right:auto}}

#cst-about .cab-gal > p:last-child:nth-child(4) > .cab-gi.wide{grid-column:1/-1;grid-row:span 2}
#cst-about .cab-gal > p:last-child:nth-child(4){display:block;grid-column:1/-1;grid-row:span 2}
#cst-about .cab-gal > p:last-child:nth-child(4) > .cab-gi{height:100%}

/* ---- v8: more colour, better text wrapping, CTA panel ---- */
#cst-about h1,#cst-about h2,#cst-about h3{text-wrap:balance}
#cst-about p{text-wrap:pretty}
#cst-about .cab-lead{max-width:760px}
#cst-about .cab-center .cab-lead{margin-left:auto;margin-right:auto;text-align:center}
/* pillars */
#cst-about .cab-pillar{position:relative;overflow:hidden;background:var(--s);border-color:transparent}
#cst-about .cab-pillar::after{content:"";position:absolute;left:0;top:0;right:0;height:4px;background:linear-gradient(90deg,var(--o),#FFB45C)}
#cst-about .cab-pillar:nth-child(2){background:var(--n)}
#cst-about .cab-pillar:nth-child(2) h3{color:#fff}
#cst-about .cab-pillar:nth-child(2) p{color:rgba(255,255,255,.75)}
#cst-about .cab-pillar:nth-child(2)::before{background-color:rgba(255,255,255,.1)}
#cst-about .cab-pillar[data-icon]::before{background-color:#fff;box-shadow:0 8px 18px -10px rgba(255,138,0,.6)}
/* quote */
#cst-about .cab-quote{background:linear-gradient(135deg,var(--n) 0%,#2A3580 100%)}
#cst-about .cab-quote::before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px;background:var(--o)}
/* accreditations in full colour */
#cst-about .cab-acc img{filter:none;opacity:1}
#cst-about .cab-acc a{border-bottom:3px solid transparent}
#cst-about .cab-acc a:hover{border-color:var(--b);border-bottom-color:var(--o)}
#cst-about .cab-acc .cab-accn{color:var(--n)}
/* stats */
#cst-about .cab-stat:nth-child(odd) .cab-num{color:var(--o)}
/* CTA panel */
#cst-about .cab-cta{margin-top:56px;padding:64px 32px 56px;border-radius:32px;background:radial-gradient(600px 300px at 85% 0%,rgba(255,138,0,.28),transparent 70%),linear-gradient(135deg,#FFF7EC 0%,#FFFFFF 60%,#F4F6FA 100%);border:1px solid #FFE1BD;text-align:center}
#cst-about .cab-cta > *{margin-left:auto;margin-right:auto}
#cst-about .cab-cta h2{max-width:720px}
#cst-about .cab-cta .cab-txt{max-width:560px;margin-bottom:28px;text-align:center}
#cst-about .cab-cta > p:has(> .cab-btn){display:flex;justify-content:center;margin:0}
#cst-about .cab-cta .cab-btn-n{background:var(--o);box-shadow:0 12px 26px -12px rgba(255,138,0,.9)}
#cst-about .cab-cta .cab-foot{max-width:640px;margin-top:28px;text-align:center}
/* v8.1: outer value cards in light blue */
#cst-about .cab-pillar:nth-child(1),#cst-about .cab-pillar:nth-child(3){background:#4C6BD8}
#cst-about .cab-pillar:nth-child(1) h3,#cst-about .cab-pillar:nth-child(3) h3{color:#fff}
#cst-about .cab-pillar:nth-child(1) p,#cst-about .cab-pillar:nth-child(3) p{color:rgba(255,255,255,.85)}
/* ---- v9: one-line CTA text, team arrows, mobile fixes ---- */
#cst-about .cab-panel h3{text-wrap:wrap}
@media(min-width:900px){
#cst-about .cab-cta .cab-txt,#cst-about .cab-cta .cab-foot{max-width:none;white-space:nowrap}
}
/* team chip arrows (desktop) */
#cst-about .cab-chipnav{display:flex;align-items:center;gap:10px;margin-bottom:26px}
#cst-about .cab-chipnav .cab-chips{flex:1;min-width:0;margin:0;padding:4px 2px;scroll-behavior:smooth}
#cst-about .cab-chipnav-btn{flex:0 0 44px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.06);color:#fff;font-size:26px;line-height:1;padding:0 0 3px;display:grid;place-items:center;transition:background .2s,border-color .2s,opacity .2s}
#cst-about .cab-chipnav-btn:hover{background:var(--o);border-color:var(--o)}
#cst-about .cab-chipnav-btn:disabled{opacity:.3;cursor:default;background:transparent;border-color:rgba(255,255,255,.25)}
@media(min-width:701px){
#cst-about .cab-chipnav .cab-chips{scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 16px,#000 calc(100% - 16px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 16px,#000 calc(100% - 16px),transparent 100%);padding:4px 16px}
#cst-about .cab-chipnav .cab-chips::-webkit-scrollbar{display:none}
}
/* story layout on tablet and mobile */
@media(max-width:980px){
#cst-about.cab-ready .cab-story{grid-template-columns:1fr;gap:16px}
#cst-about .cab-tabs{flex-direction:column;overflow:visible}
#cst-about .cab-tab{flex:none;width:100%}
}
/* mobile */
@media(max-width:700px){
#cst-about .cab-hero{padding:40px 0 120px}
#cst-about .cab-hero .cab-lead{font-size:17px;margin-bottom:26px}
#cst-about .cab-rise{display:none}
#cst-about .cab-hero-btns{justify-content:center}
#cst-about .cab-hero-btns .cab-btn{justify-content:center}
#cst-about .cab-badge{position:relative;left:auto;bottom:auto;margin:-28px auto 0;max-width:92%}
#cst-about .cab-hero-photo .cab-ph{transform:none}
#cst-about .cab-chipnav-btn{display:none}
#cst-about .cab-chipnav{margin-bottom:20px}
#cst-about .cab-roles{justify-content:center}
#cst-about .cab-careers{text-align:center}
#cst-about .cab-careers h2,#cst-about .cab-careers .cab-txt{text-align:center}
#cst-about .cab-careers .cab-eyebrow{justify-content:center;display:flex}
#cst-about .cab-careers .cab-btn,#cst-about .cab-cta .cab-btn{display:flex;width:fit-content;margin:0 auto}
#cst-about .cab-cta{padding:44px 22px 40px}
#cst-about .cab-panel{padding:26px;min-height:0}
#cst-about .cab-panel .cab-big{font-size:120px}
#cst-about .cab-quote{gap:20px;text-align:center}
#cst-about .cab-quote img{margin:0 auto}
#cst-about .cab-quote blockquote{font-size:20px}
#cst-about .cab-quote .cab-cite{text-align:center}
#cst-about .cab-team-top{justify-content:center}
#cst-about .cab-tl-card{padding:20px 22px}
}
/* v9.1: tighter spacing on desktop */
@media(min-width:701px){
#cst-about .cab-sec{padding:64px 0}
#cst-about .cab-hero{padding:64px 0 120px}
#cst-about .cab-head{margin-bottom:32px}
#cst-about .cab-quote{margin-top:40px}
#cst-about .cab-cta{margin-top:40px}
#cst-about .cab-tl-item,#cst-about .cab-tl-item:nth-child(odd){padding-bottom:40px}
}
/* v9.2: enquire bar (Meet the Team page) */
#cst-about .cab-bar{margin-top:40px;display:flex;align-items:center;justify-content:space-between;gap:28px;padding:40px 48px;border-radius:28px;background:radial-gradient(500px 240px at 90% 0%,rgba(255,138,0,.28),transparent 70%),linear-gradient(135deg,#FFF7EC 0%,#FFFFFF 60%,#F4F6FA 100%);border:1px solid #FFE1BD}
#cst-about .cab-bar h2{font-size:clamp(24px,2.8vw,34px);margin:0}
#cst-about .cab-bar .cab-eyebrow{margin-bottom:8px}
#cst-about .cab-bar .cab-btn{flex:none;padding:17px 32px}
@media(max-width:700px){
#cst-about .cab-bar{flex-direction:column;text-align:center;padding:32px 22px}
#cst-about .cab-bar h2{text-align:center}
#cst-about .cab-bar .cab-eyebrow{justify-content:center;display:flex}
}
/* v10: Our impact */
#cst-about .cab-impact{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
#cst-about .cab-imp{border-radius:24px;padding:34px 30px;background:var(--n);color:#fff;position:relative;overflow:hidden}
#cst-about .cab-imp:nth-child(2){background:#4C6BD8}
#cst-about .cab-imp:nth-child(3){background:var(--o)}
#cst-about .cab-imp::after{content:"";position:absolute;right:-40px;bottom:-40px;width:140px;height:140px;border-radius:50%;border:26px solid rgba(255,255,255,.1)}
#cst-about .cab-imp-num{font-family:var(--hf);font-size:clamp(40px,4.6vw,58px);line-height:1;margin-bottom:10px}
#cst-about .cab-imp-lbl{font-size:16px;color:rgba(255,255,255,.88);max-width:240px}
#cst-about .cab-reviews{margin-top:28px;background:var(--s);border-radius:24px;padding:28px 28px 20px}
#cst-about .cab-reviews-title{font-family:var(--hf);font-size:22px;color:var(--n);margin-bottom:14px}
@media(max-width:700px){#cst-about .cab-impact{grid-template-columns:1fr}#cst-about .cab-reviews-title{text-align:center}}
/* v11: four impact cards */
#cst-about .cab-impact{grid-template-columns:repeat(4,1fr)}
#cst-about .cab-imp:nth-child(4){background:var(--n)}
#cst-about .cab-imp-num{font-size:clamp(34px,3.6vw,50px)}
@media(max-width:980px){#cst-about .cab-impact{grid-template-columns:repeat(2,1fr)}}
@media(max-width:700px){#cst-about .cab-impact{grid-template-columns:1fr}}

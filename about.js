/*!
 * CST Training About Us page (v4: content lives in the page, this file adds styling and interactions)
 * Host on GitHub Pages (cst-advisor repo, root), load with ?v=N cache buster.
 * The page content is the about-page.html markup inside <div id="cst-about">, editable in the visual editor.
 * Add a person: copy a .cab-p card inside the right .cab-dept. No photo? Leave the img out and initials show.
 * Add a milestone: copy a .cab-tl-item. Highlight one by adding cab-hl to its .cab-tl-card.
 * Add a venue: copy a .cab-v and change data-addr (used for the map).
 * Story tabs: each .cab-panel needs data-tab (button label) and optional data-big (watermark).
 * WordPress strips <style> tags from page content, so this script injects the page CSS.
 */
(function () {
  "use strict";
  var CSS = [
    'html{overflow-x:clip}',
    '#cst-about{--n:#1C2560;--n2:#141B4A;--o:#FF8A00;--s:#F4F6FA;--b:#DDE3F0;--t:#3D4665;--m:#6B7394;--hf:"Alata",Arial,sans-serif;--bf:"Asap",Arial,sans-serif;font-family:var(--bf);color:var(--t);line-height:1.6;font-size:17px;-webkit-font-smoothing:antialiased}',
    '#cst-about *,#cst-about *::before,#cst-about *::after{box-sizing:border-box}',
    '#cst-about h1,#cst-about h2,#cst-about h3,#cst-about h4,#cst-about p{margin:0;padding:0;text-transform:none;text-align:left}',
    '#cst-about h1,#cst-about h2,#cst-about h3{font-family:var(--hf);font-weight:400;letter-spacing:.02em;line-height:1.12;color:var(--n)}',
    '#cst-about a{text-decoration:none}',
    '#cst-about img{max-width:100%;display:block}',
    '#cst-about button{font-family:inherit;cursor:pointer}',
    '#cst-about .cab-band{width:100vw;margin-left:calc(50% - 50vw);position:relative}',
    '#cst-about .cab-wrap{max-width:1180px;margin:0 auto;padding:0 24px}',
    '#cst-about .cab-sec{padding:96px 0}',
    '#cst-about .cab-eyebrow{display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--o);margin-bottom:14px}',
    '#cst-about .cab-eyebrow::before{content:"";width:22px;height:3px;border-radius:2px;background:var(--o)}',
    '#cst-about .cab-h2{font-size:clamp(30px,4vw,46px);margin-bottom:14px}',
    '#cst-about .cab-lead{font-size:19px;color:var(--m);max-width:640px}',
    '#cst-about .cab-head{margin-bottom:48px}',
    '#cst-about .cab-btn{display:inline-flex;align-items:center;gap:10px;padding:15px 26px;border-radius:999px;font-weight:700;font-size:16px;border:2px solid transparent;transition:transform .25s,box-shadow .25s,background .25s,color .25s}',
    '#cst-about .cab-btn:hover{transform:translateY(-2px)}',
    '#cst-about .cab-btn-o{background:var(--o);color:#fff;box-shadow:0 10px 24px -10px rgba(255,138,0,.8)}',
    '#cst-about .cab-btn-ghost{border-color:rgba(255,255,255,.35);color:#fff}',
    '#cst-about .cab-btn-ghost:hover{border-color:#fff;background:rgba(255,255,255,.08)}',
    '#cst-about .cab-btn-n{background:var(--n);color:#fff}',
    '#cst-about .cab-arrow{display:inline-block;transition:transform .25s}#cst-about .cab-btn:hover .cab-arrow{transform:translateX(4px)}',
    /* hero */
    '#cst-about .cab-hero{background:radial-gradient(1200px 600px at 85% 10%,#2A3580 0%,transparent 60%),var(--n);color:#fff;overflow:hidden;padding:110px 0 150px}',
    '#cst-about .cab-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:56px 56px;mask-image:linear-gradient(to bottom,#000 30%,transparent 95%);-webkit-mask-image:linear-gradient(to bottom,#000 30%,transparent 95%)}',
    '#cst-about .cab-rise{position:absolute;bottom:-40%;width:2px;height:120px;background:linear-gradient(to top,transparent,var(--o));border-radius:2px;opacity:.55;animation:cabRise linear infinite}',
    '@keyframes cabRise{from{transform:translateY(0)}to{transform:translateY(-190vh)}}',
    '#cst-about .cab-hero-in{position:relative;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}',
    '#cst-about .cab-hero h1{color:#fff;font-size:clamp(38px,5.4vw,66px);margin-bottom:22px}',
    '#cst-about .cab-hero h1 em{font-style:normal;color:var(--o)}',
    '#cst-about .cab-hero .cab-lead{color:rgba(255,255,255,.78);margin-bottom:34px}',
    '#cst-about .cab-hero-btns{display:flex;flex-wrap:wrap;gap:14px}',
    '#cst-about .cab-hero-photo{position:relative}',
    '#cst-about .cab-hero-photo .cab-ph{border-radius:28px;overflow:hidden;box-shadow:0 40px 80px -30px rgba(0,0,0,.6);transform:rotate(1.5deg);transition:transform .6s}',
    '#cst-about .cab-hero-photo:hover .cab-ph{transform:rotate(0)}',
    '#cst-about .cab-hero-photo img{width:100%;aspect-ratio:4/3;object-fit:cover}',
    '#cst-about .cab-badge{position:absolute;left:-28px;bottom:-30px;background:#fff;color:var(--n);border-radius:20px;padding:18px 22px;box-shadow:0 24px 50px -20px rgba(0,0,0,.45);display:flex;gap:16px;align-items:center;max-width:320px;animation:cabFloat 5s ease-in-out infinite}',
    '@keyframes cabFloat{50%{transform:translateY(-8px)}}',
    '#cst-about .cab-badge strong{font-family:var(--hf);font-weight:400;font-size:44px;line-height:1;color:var(--o)}',
    '#cst-about .cab-badge p{font-weight:700;font-size:15px;line-height:1.3;color:var(--n)}',
    '#cst-about .cab-badge .cab-small{display:block;font-weight:400;font-size:12px;color:var(--m);margin-top:4px}',
    /* stats */
    '#cst-about .cab-stats{position:relative;margin-top:-80px;z-index:2}',
    '#cst-about .cab-stats-in{display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-radius:24px;box-shadow:0 30px 60px -30px rgba(28,37,96,.35);border:1px solid var(--b);overflow:hidden}',
    '#cst-about .cab-stat{padding:30px 26px;border-right:1px solid var(--b)}#cst-about .cab-stat:last-child{border-right:0}',
    '#cst-about .cab-stat .cab-num{display:block;font-family:var(--hf);font-weight:400;font-size:clamp(32px,3.6vw,44px);color:var(--n);line-height:1.05}',
    '',
    '#cst-about .cab-stat .cab-lbl{display:block;margin-top:6px;font-size:15px;color:var(--m)}',
    /* story */
    '#cst-about .cab-story{display:grid;grid-template-columns:280px 1fr;gap:48px}',
    '#cst-about .cab-tabs{display:flex;flex-direction:column;gap:10px}',
    '#cst-about .cab-tab{text-align:left;padding:18px 20px;border-radius:16px;border:1px solid var(--b);background:#fff;color:var(--n);font-weight:700;font-size:16px;display:flex;gap:14px;align-items:center;transition:all .25s}',
    '#cst-about .cab-tab i{font-style:normal;font-family:var(--hf);color:var(--m);font-size:14px}',
    '#cst-about .cab-tab:hover{border-color:var(--n)}',
    '#cst-about .cab-tab[aria-selected="true"]{background:var(--n);color:#fff;border-color:var(--n);box-shadow:0 16px 30px -16px rgba(28,37,96,.6)}',
    '#cst-about .cab-tab[aria-selected="true"] i{color:var(--o)}',
    '#cst-about .cab-panel{background:var(--s);border-radius:24px;padding:44px;position:relative;overflow:hidden;min-height:330px}',
    '#cst-about .cab-panel[hidden]{display:none}',
    '#cst-about .cab-panel.cab-show{animation:cabIn .5s ease both}',
    '@keyframes cabIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}',
    '#cst-about .cab-panel h3{font-size:clamp(24px,2.6vw,32px);margin-bottom:16px}',
    '#cst-about .cab-panel p+p{margin-top:14px}',
    '#cst-about .cab-panel .cab-big{position:absolute;right:24px;bottom:-30px;font-family:var(--hf);font-size:180px;line-height:1;color:rgba(28,37,96,.05);pointer-events:none}',
    '#cst-about .cab-quote{margin-top:56px;background:var(--n);color:#fff;border-radius:28px;padding:56px;position:relative;overflow:hidden;display:grid;grid-template-columns:auto 1fr;gap:36px;align-items:center}',
    '#cst-about .cab-quote::after{content:"";position:absolute;right:-60px;top:-60px;width:240px;height:240px;border-radius:50%;border:40px solid rgba(255,138,0,.12)}',
    '#cst-about .cab-quote img,#cst-about .cab-quote .cab-qi{width:120px;height:120px;border-radius:50%;object-fit:cover;border:4px solid var(--o);background:#fff}',
    '#cst-about .cab-quote blockquote{margin:0;padding:0;border:0;font-family:var(--hf);font-size:clamp(20px,2.3vw,28px);line-height:1.4;color:#fff;position:relative;z-index:1}',
    '#cst-about .cab-quote blockquote::before{content:"\\201C";color:var(--o);font-size:1.6em;line-height:0;vertical-align:-.35em;margin-right:4px}',
    '#cst-about .cab-quote .cab-cite{display:block;margin-top:18px;font-style:normal;font-family:var(--bf);font-size:15px;color:rgba(255,255,255,.7)}',
    '#cst-about .cab-quote .cab-cite strong{color:#fff}',
    '#cst-about .cab-pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px}',
    '#cst-about .cab-pillar{border:1px solid var(--b);border-radius:20px;padding:28px;background:#fff;transition:transform .3s,box-shadow .3s,border-color .3s}',
    '#cst-about .cab-pillar:hover{transform:translateY(-6px);box-shadow:0 24px 40px -24px rgba(28,37,96,.4);border-color:transparent}',
    '#cst-about .cab-pillar .cab-ic{width:48px;height:48px;border-radius:14px;background:#FFF7EC;display:grid;place-items:center;margin-bottom:18px}',
    '#cst-about .cab-pillar h3{font-size:20px;margin-bottom:8px}',
    '#cst-about .cab-pillar p{font-size:15px;color:var(--m)}',
    /* timeline */
    '#cst-about .cab-tl-sec{background:var(--s)}',
    '#cst-about .cab-tl{position:relative;max-width:980px;margin:0 auto}',
    '#cst-about .cab-tl-line{position:absolute;left:50%;top:0;bottom:0;width:4px;margin-left:-2px;background:var(--b);border-radius:4px}',
    '#cst-about .cab-tl-fill{position:absolute;left:0;top:0;width:100%;height:0;background:linear-gradient(var(--n),var(--o));border-radius:4px}',
    '#cst-about .cab-tl-item{position:relative;width:50%;padding:0 48px 56px 0;opacity:0;transform:translateY(30px);transition:opacity .7s,transform .7s}',
    '#cst-about .cab-tl-item:nth-child(odd){margin-left:50%;padding:0 0 56px 48px}',
    '#cst-about .cab-tl-item.cab-on{opacity:1;transform:none}@media(min-width:701px){#cst-about .cab-tl-item+.cab-tl-item{margin-top:-90px}}',
    '#cst-about .cab-tl-dot{position:absolute;top:22px;right:-11px;width:22px;height:22px;border-radius:50%;background:#fff;border:4px solid var(--b);transition:border-color .4s,transform .4s;z-index:1}',
    '#cst-about .cab-tl-item:nth-child(odd) .cab-tl-dot{right:auto;left:-11px}',
    '#cst-about .cab-tl-item.cab-on .cab-tl-dot{border-color:var(--o);transform:scale(1.15)}',
    '#cst-about .cab-tl-card{background:#fff;border-radius:20px;padding:26px 28px;box-shadow:0 20px 40px -28px rgba(28,37,96,.45);border:1px solid var(--b)}',
    '#cst-about .cab-tl-card.cab-hl{background:var(--n);border-color:var(--n)}',
    '#cst-about .cab-tl-card.cab-hl h3{color:#fff}#cst-about .cab-tl-card.cab-hl p{color:rgba(255,255,255,.78)}',
    '#cst-about .cab-tl-card p.cab-tl-date{display:inline-block;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--o);margin-bottom:8px}',
    '#cst-about .cab-tl-card h3{font-size:22px;margin-bottom:8px}',
    '#cst-about .cab-tl-card p{font-size:15.5px}',
    '#cst-about .cab-tl-card img{margin-top:16px;border-radius:14px;width:100%;height:170px;object-fit:cover}',
    /* gallery */
    '#cst-about .cab-gal{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:220px;gap:16px}',
    '#cst-about .cab-gi{display:block;position:relative;border-radius:20px;overflow:hidden;cursor:zoom-in;border:0;padding:0;background:var(--s)}',
    '#cst-about .cab-gi.wide{grid-column:span 2}#cst-about .cab-gi.tall{grid-row:span 2}#cst-about .cab-gi.big{grid-column:span 2;grid-row:span 2}#cst-about .cab-gi.logo{background:#ECEAE6}#cst-about .cab-gi.logo img{object-fit:contain}',
    '#cst-about .cab-gi img{width:100%;height:100%;object-fit:cover;transition:transform .7s}',
    '#cst-about .cab-gi:hover img{transform:scale(1.06)}',
    '#cst-about .cab-gi span{position:absolute;left:0;right:0;bottom:0;padding:40px 18px 14px;background:linear-gradient(transparent,rgba(20,27,74,.85));color:#fff;font-size:14px;font-weight:700;text-align:left;transform:translateY(100%);transition:transform .35s}',
    '#cst-about .cab-gi:hover span,#cst-about .cab-gi:focus-visible span{transform:none}',
    '#cst-about .cab-lb{position:fixed;inset:0;background:rgba(14,19,52,.92);display:none;align-items:center;justify-content:center;z-index:99999;padding:30px}',
    '#cst-about .cab-lb.cab-open{display:flex;animation:cabFade .25s}',
    '@keyframes cabFade{from{opacity:0}}',
    '#cst-about .cab-lb img{max-height:82vh;max-width:90vw;border-radius:14px}',
    '#cst-about .cab-lb p{position:absolute;bottom:22px;left:0;right:0;text-align:center;color:#fff;font-size:15px}',
    '#cst-about .cab-lb button{position:absolute;background:rgba(255,255,255,.12);color:#fff;border:0;width:52px;height:52px;border-radius:50%;font-size:24px;line-height:1}',
    '#cst-about .cab-lb button:hover{background:var(--o)}',
    '#cst-about .cab-lb-x{top:20px;right:20px}#cst-about .cab-lb-p{left:20px;top:50%}#cst-about .cab-lb-n{right:20px;top:50%}',
    /* team */
    '#cst-about .cab-team-sec{background:linear-gradient(var(--n),var(--n2));color:#fff;overflow:hidden}',
    '#cst-about .cab-team-sec .cab-h2{color:#fff}#cst-about .cab-team-sec .cab-lead{color:rgba(255,255,255,.72)}',
    '#cst-about .cab-team-top{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:28px}',
    '#cst-about .cab-search{position:relative;min-width:280px}',
    '#cst-about .cab-search input{width:100%;padding:14px 18px 14px 46px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;font-family:inherit;font-size:16px;outline:none;transition:border-color .2s,background .2s;margin:0;height:auto;box-shadow:none}',
    '#cst-about .cab-search input::placeholder{color:rgba(255,255,255,.55)}',
    '#cst-about .cab-search input:focus{border-color:var(--o);background:rgba(255,255,255,.12)}',
    '#cst-about .cab-search svg{position:absolute;left:17px;top:50%;transform:translateY(-50%);opacity:.6}',
    '#cst-about .cab-chips{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 14px;scrollbar-width:thin;margin-bottom:26px}',
    '#cst-about .cab-chip{flex:0 0 auto;padding:11px 18px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;font-weight:700;font-size:15px;display:flex;gap:8px;align-items:center;transition:all .2s;white-space:nowrap}',
    '#cst-about .cab-chip small{font-size:12px;background:rgba(255,255,255,.14);border-radius:999px;padding:2px 8px;font-weight:700}',
    '#cst-about .cab-chip:hover{border-color:#fff}',
    '#cst-about .cab-chip[aria-pressed="true"]{background:var(--o);border-color:var(--o)}',
    '#cst-about .cab-chip[aria-pressed="true"] small{background:rgba(0,0,0,.15)}',
    '#cst-about .cab-sub{font-family:var(--hf);font-size:20px;color:var(--o);margin:10px 0 18px;letter-spacing:.03em}',
    '#cst-about .cab-people{display:grid;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));gap:18px;margin-bottom:30px}',
    '#cst-about .cab-p{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:22px 14px 20px;text-align:center;transition:transform .3s,background .3s,border-color .3s;animation:cabPop .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 25ms)}',
    '@keyframes cabPop{from{opacity:0;transform:translateY(18px) scale(.96)}}',
    '#cst-about .cab-p:hover{transform:translateY(-6px);background:rgba(255,255,255,.1);border-color:rgba(255,138,0,.6)}',
    '#cst-about .cab-av{width:104px;height:104px;margin:0 auto 14px;border-radius:50%;position:relative;padding:4px;background:conic-gradient(var(--o) 0 0,rgba(255,255,255,.15) 0);transition:background .4s}',
    '#cst-about .cab-p:hover .cab-av{background:conic-gradient(var(--o) 0 360deg,rgba(255,255,255,.15) 0)}',
    '#cst-about .cab-av img{width:100%;height:100%;border-radius:50%;object-fit:cover;background:#fff}',
    '#cst-about .cab-av .cab-in{width:100%;height:100%;border-radius:50%;display:none;place-items:center;background:linear-gradient(135deg,#2A3580,var(--n));font-family:var(--hf);font-size:32px;color:#fff}',
    '#cst-about .cab-av.cab-noimg .cab-in{display:grid}',
    '#cst-about .cab-p .cab-n{margin:0;display:block;font-size:16px;color:#fff}',
    '#cst-about .cab-p .cab-r{display:block;font-size:13px;line-height:1.35;color:rgba(255,255,255,.65);margin-top:4px}',
    '#cst-about .cab-empty{padding:40px;text-align:center;color:rgba(255,255,255,.7)}',
    '#cst-about .cab-team-note{font-size:15px;color:rgba(255,255,255,.6);text-align:center;margin-top:10px}',
    /* accreditations */
    '#cst-about .cab-acc{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}',
    '#cst-about .cab-acc a{background:#fff;border:1px solid var(--b);border-radius:18px;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s,border-color .3s}',
    '#cst-about .cab-acc a:hover{transform:translateY(-5px);border-color:var(--o);box-shadow:0 20px 34px -22px rgba(28,37,96,.45)}',
    '#cst-about .cab-acc img{max-height:62px;width:auto;max-width:100%;object-fit:contain;filter:grayscale(1);opacity:.75;transition:filter .3s,opacity .3s}',
    '#cst-about .cab-acc a:hover img{filter:none;opacity:1}',
    '#cst-about .cab-acc .cab-accn{font-size:12px;font-weight:700;color:var(--m);margin-top:8px;letter-spacing:.06em;text-transform:uppercase}',
    '#cst-about .cab-acc a.cab-noimg img{display:none}#cst-about .cab-acc a.cab-noimg .cab-accn{font-family:var(--hf);font-size:22px;color:var(--n);text-transform:none;margin:0}',
    /* venues */
    '#cst-about .cab-ven-sec{background:var(--s)}',
    '#cst-about .cab-ven{display:grid;grid-template-columns:1fr 1.15fr;gap:28px;align-items:stretch}',
    '#cst-about .cab-vlist{display:flex;flex-direction:column;gap:10px}',
    '#cst-about .cab-v{cursor:pointer;text-align:left;background:#fff;border:1px solid var(--b);border-radius:16px;padding:16px 18px;display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;color:var(--t);transition:all .25s}',
    '#cst-about .cab-v .cab-pin{width:38px;height:38px;border-radius:12px;background:var(--s);display:grid;place-items:center;transition:background .25s}',
    '#cst-about .cab-v .cab-vn{display:block;color:var(--n);font-size:16px}',
    '#cst-about .cab-v .cab-va{display:block;font-size:13.5px;color:var(--m);line-height:1.4}',
    '#cst-about .cab-v:hover{border-color:var(--n)}',
    '#cst-about .cab-v[aria-pressed="true"]{border-color:var(--o);box-shadow:0 14px 28px -20px rgba(28,37,96,.5)}',
    '#cst-about .cab-v[aria-pressed="true"] .cab-pin{background:var(--o)}#cst-about .cab-v[aria-pressed="true"] .cab-pin svg{stroke:#fff}',
    '#cst-about .cab-map{border-radius:24px;overflow:hidden;background:#dfe5f1;min-height:420px;position:relative;box-shadow:0 30px 60px -36px rgba(28,37,96,.5)}',
    '#cst-about .cab-map iframe{position:absolute;inset:0;width:100%;height:100%;border:0}',
    '#cst-about .cab-map-tag{position:absolute;left:16px;bottom:16px;background:var(--n);color:#fff;padding:10px 16px;border-radius:12px;font-size:14px;font-weight:700;z-index:1;box-shadow:0 10px 20px -10px rgba(0,0,0,.5)}',
    '#cst-about .cab-tag-hq{display:inline-block;margin-left:6px;font-size:11px;font-weight:700;background:var(--o);color:#fff;border-radius:6px;padding:1px 7px;vertical-align:2px}',
    '#cst-about .cab-more{margin-top:16px;font-size:15px;color:var(--m)}',
    /* careers + cta */
    '#cst-about .cab-careers{border-radius:32px;background:var(--n);color:#fff;padding:64px;display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center;position:relative;overflow:hidden}',
    '#cst-about .cab-careers::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:40px 40px}',
    '#cst-about .cab-careers>*{position:relative}',
    '#cst-about .cab-careers h2{color:#fff;font-size:clamp(28px,3.4vw,40px);margin-bottom:14px}',
    '#cst-about .cab-careers .cab-txt{color:rgba(255,255,255,.78);margin-bottom:26px}',
    '#cst-about .cab-roles{display:flex;flex-wrap:wrap;gap:10px}',
    '#cst-about .cab-roles a{padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;font-weight:700;font-size:15px;transition:all .2s}',
    '#cst-about .cab-roles a:hover{background:var(--o);border-color:var(--o)}',
    '#cst-about .cab-cta{text-align:center;padding:90px 0 100px}',
    '#cst-about .cab-cta h2{text-align:center;font-size:clamp(30px,4vw,48px);margin-bottom:14px}',
    '#cst-about .cab-cta .cab-txt{text-align:center;max-width:560px;margin:0 auto 30px;color:var(--m)}',
    '#cst-about .cab-foot{font-size:12.5px;color:var(--m);text-align:center;margin-top:36px}',
    /* reveal */
    '#cst-about .cab-rv{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s ease}',
    '#cst-about .cab-rv.cab-on{opacity:1;transform:none}',
    /* responsive */
    '#cst-about .cab-dept{display:none}#cst-about .cab-dept.cab-active{display:block}',
    '#cst-about .cab-center,#cst-about .cab-center h2{text-align:center}',
    '#cst-about .cab-cta h2,#cst-about .cab-cta .cab-foot{text-align:center}#cst-about .cab-cta .cab-eyebrow{justify-content:center;display:flex}',
    '#cst-about .cab-vtx{min-width:0}#cst-about .cab-v .cab-vn{font-weight:700}#cst-about .cab-p p{text-align:center}#cst-about .cab-p .cab-n{font-weight:700}#cst-about .cab-gi.wide:last-child:nth-child(4){grid-column:1/-1;grid-row:span 2}',
    '#cst-about .cab-hero-btns .cab-btn{margin:0}',
    '#cst-about .cab-quote > img{flex:none}',
    '#cst-about .cab-badge > div{min-width:0}',
    '@media(max-width:980px){#cst-about .cab-hero-in,#cst-about .cab-story,#cst-about .cab-ven,#cst-about .cab-careers{grid-template-columns:1fr}#cst-about .cab-tabs{flex-direction:row;overflow-x:auto}#cst-about .cab-tab{flex:0 0 auto}#cst-about .cab-acc{grid-template-columns:repeat(3,1fr)}#cst-about .cab-stats-in{grid-template-columns:repeat(2,1fr)}#cst-about .cab-stat:nth-child(2){border-right:0}#cst-about .cab-stat:nth-child(-n+2){border-bottom:1px solid var(--b)}#cst-about .cab-pillars{grid-template-columns:1fr}#cst-about .cab-gal{grid-template-columns:repeat(2,1fr)}#cst-about .cab-badge{left:12px}}',
    '@media(max-width:700px){#cst-about .cab-sec{padding:70px 0}#cst-about .cab-hero{padding:80px 0 130px}#cst-about .cab-tl-line{left:11px}#cst-about .cab-tl-item,#cst-about .cab-tl-item:nth-child(odd){width:100%;margin-left:0;padding:0 0 36px 44px}#cst-about .cab-tl-dot,#cst-about .cab-tl-item:nth-child(odd) .cab-tl-dot{left:0;right:auto}#cst-about .cab-quote{grid-template-columns:1fr;padding:36px}#cst-about .cab-panel{padding:30px}#cst-about .cab-careers{padding:36px}#cst-about .cab-acc{grid-template-columns:repeat(2,1fr)}#cst-about .cab-gal{grid-auto-rows:160px}#cst-about .cab-people{grid-template-columns:repeat(2,1fr)}#cst-about .cab-map{min-height:320px}#cst-about .cab-search{min-width:100%}}',
    '@media(prefers-reduced-motion:reduce){#cst-about *{animation:none!important;transition:none!important}#cst-about .cab-rv,#cst-about .cab-tl-item{opacity:1;transform:none}#cst-about .cab-rise{display:none}}'
  ].join('\n');

  var ICON = {
    shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
    home: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V21H3z"/><path d="M9 21v-6h6v6"/></svg>',
    pin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C2560" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
  };

  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function txt(n) { return n ? (n.textContent || '').trim() : ''; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function initials(name) { var p = name.split(/\s+/); return ((p[0] || '?')[0] + (p[1] ? p[1][0] : '')).toUpperCase(); }

  function init(root) {
    if (!document.getElementById('cab-fonts')) {
      var l = el('link'); l.id = 'cab-fonts'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Alata&family=Asap:wght@400;700&display=swap';
      document.head.appendChild(l);
    }
    if (!document.getElementById('cab-css')) { var st = el('style'); st.id = 'cab-css'; st.textContent = CSS; document.head.appendChild(st); }
    var $ = function (s, c) { return (c || root).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || root).querySelectorAll(s)); };
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Strip stray <p> and <br> that the editor sometimes adds between blocks
    $$('p:empty, .cab-people > br, .cab-vlist > br, .cab-gal > br, .cab-acc > br, .cab-roles > br').forEach(function (n) { n.parentNode.removeChild(n); });

    // Hero decoration
    var hero = $('.cab-hero');
    if (hero) {
      hero.insertBefore(el('div', 'cab-grid-bg'), hero.firstChild);
      for (var r = 0; r < 9; r++) { var s = el('span', 'cab-rise'); s.style.cssText = 'left:' + (6 + r * 11) + '%;animation-duration:' + (9 + (r * 7) % 9) + 's;animation-delay:-' + (r * 1.7) + 's'; hero.insertBefore(s, hero.children[1]); }
    }
    // Button arrows
    $$('.cab-btn-o, .cab-btn-n').forEach(function (b) { if (!$('.cab-arrow', b)) b.appendChild(el('span', 'cab-arrow', ' →')); });

    // Story tabs
    var panels = $$('.cab-panel');
    if (panels.length) {
      var tabs = el('div', 'cab-tabs'); tabs.setAttribute('role', 'tablist');
      var host = $('.cab-panels'); host.parentNode.insertBefore(tabs, host);
      var btns = panels.map(function (p, i) {
        p.id = 'cab-p' + i; p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', 'cab-t' + i);
        if (p.getAttribute('data-big')) p.insertBefore(el('span', 'cab-big', esc(p.getAttribute('data-big'))), p.firstChild);
        var b = el('button', 'cab-tab', '<i>0' + (i + 1) + '</i>' + esc(p.getAttribute('data-tab') || txt($('h3', p))));
        b.type = 'button'; b.id = 'cab-t' + i; b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', p.id);
        tabs.appendChild(b); return b;
      });
      var select = function (i) {
        btns.forEach(function (b, j) { b.setAttribute('aria-selected', i === j); b.tabIndex = i === j ? 0 : -1; panels[j].hidden = i !== j; panels[j].classList.toggle('cab-show', i === j); });
      };
      btns.forEach(function (b, i) {
        b.addEventListener('click', function () { select(i); });
        b.addEventListener('keydown', function (e) {
          var k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
          if (k) { e.preventDefault(); var n = (i + k + btns.length) % btns.length; select(n); btns[n].focus(); }
        });
      });
      select(0);
    }

    // Pillar icons
    $$('.cab-pillar').forEach(function (p) { var k = p.getAttribute('data-icon'); if (ICON[k]) p.insertBefore(el('div', 'cab-ic', ICON[k]), p.firstChild); });

    // Timeline
    var tl = $('.cab-tl');
    if (tl) {
      var line = el('div', 'cab-tl-line', '<div class="cab-tl-fill"></div>'); tl.insertBefore(line, tl.firstChild);
      $$('.cab-tl-item', tl).forEach(function (it) { it.insertBefore(el('span', 'cab-tl-dot'), it.firstChild); });
      var fill = $('.cab-tl-fill', tl);
      var onScroll = function () { var r = tl.getBoundingClientRect(); fill.style.height = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - r.top) / r.height)) * 100 + '%'; };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }

    // Gallery + lightbox
    var gis = $$('.cab-gi');
    if (gis.length) {
      var lb = el('div', 'cab-lb', '<button type="button" class="cab-lb-x" aria-label="Close">×</button><button type="button" class="cab-lb-p" aria-label="Previous">‹</button><img alt=""><button type="button" class="cab-lb-n" aria-label="Next">›</button><p></p>');
      lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
      root.appendChild(lb);
      var lbImg = $('img', lb), lbCap = $('p', lb), gi = 0, last = null;
      var items = gis.map(function (a) { var im = $('img', a); var cap = im ? im.alt : ''; a.appendChild(el('span', '', esc(cap))); a.setAttribute('aria-label', 'Open photo: ' + cap); return { src: a.getAttribute('href') || (im && im.src), cap: cap }; });
      var open = function (i) { gi = (i + items.length) % items.length; lbImg.src = items[gi].src; lbImg.alt = items[gi].cap; lbCap.textContent = items[gi].cap; if (!lb.classList.contains('cab-open')) { last = document.activeElement; lb.classList.add('cab-open'); $('.cab-lb-x', lb).focus(); } };
      var close = function () { lb.classList.remove('cab-open'); if (last) last.focus(); };
      gis.forEach(function (a, i) { a.addEventListener('click', function (e) { e.preventDefault(); open(i); }); });
      $('.cab-lb-x', lb).addEventListener('click', close);
      $('.cab-lb-p', lb).addEventListener('click', function () { open(gi - 1); });
      $('.cab-lb-n', lb).addEventListener('click', function () { open(gi + 1); });
      lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
      document.addEventListener('keydown', function (e) { if (!lb.classList.contains('cab-open')) return; if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') open(gi - 1); else if (e.key === 'ArrowRight') open(gi + 1); });
    }

    // Team explorer
    var depts = $$('.cab-dept');
    if (depts.length) {
      $$('.cab-p').forEach(function (c) {
        var name = txt($('.cab-n', c)), img = $('img', c), av = el('div', 'cab-av');
        av.appendChild(el('div', 'cab-in', initials(name))); av.firstChild.setAttribute('aria-hidden', 'true');
        if (img) { img.loading = 'lazy'; av.insertBefore(img, av.firstChild); img.addEventListener('error', function () { av.classList.add('cab-noimg'); img.remove(); }); }
        else av.classList.add('cab-noimg');
        c.insertBefore(av, c.firstChild);
      });
      var top = $('.cab-team-top');
      var search = el('label', 'cab-search', ICON.search + '<input type="search" placeholder="Search by name or role" aria-label="Search the team">');
      top.appendChild(search);
      var input = $('input', search);
      var chips = el('div', 'cab-chips'); chips.setAttribute('role', 'group'); chips.setAttribute('aria-label', 'Choose a team');
      top.parentNode.insertBefore(chips, top.nextSibling);
      var results = el('div', 'cab-results'); results.setAttribute('aria-live', 'polite'); results.hidden = true;
      depts[depts.length - 1].parentNode.insertBefore(results, depts[depts.length - 1].nextSibling);
      var current = 0;
      var chipBtns = depts.map(function (d, i) {
        var b = el('button', 'cab-chip', esc(d.getAttribute('data-label') || 'Team') + '<small>' + $$('.cab-p', d).length + '</small>');
        b.type = 'button'; chips.appendChild(b);
        b.addEventListener('click', function () { input.value = ''; show(i); });
        return b;
      });
      var stagger = function (scope) { $$('.cab-p', scope).forEach(function (c, i) { c.style.setProperty('--i', Math.min(i, 30)); c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; }); };
      var show = function (i) {
        current = i; results.hidden = true; results.innerHTML = '';
        depts.forEach(function (d, j) { d.classList.toggle('cab-active', i === j); });
        chipBtns.forEach(function (b, j) { b.setAttribute('aria-pressed', i === j); });
        stagger(depts[i]);
      };
      input.addEventListener('input', function () {
        var q = input.value.trim().toLowerCase();
        if (!q) { show(current); return; }
        depts.forEach(function (d) { d.classList.remove('cab-active'); });
        chipBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        var seen = {}, grid = el('div', 'cab-people');
        $$('.cab-dept .cab-p').forEach(function (c) {
          var key = txt($('.cab-n', c)) + '|' + txt($('.cab-r', c));
          if (seen[key] || key.toLowerCase().indexOf(q) < 0) return;
          seen[key] = 1; grid.appendChild(c.cloneNode(true));
        });
        results.innerHTML = '';
        if (grid.children.length) results.appendChild(grid); else results.appendChild(el('p', 'cab-empty', 'No one matches “' + esc(q) + '”. Try a first name or a role such as tutor.'));
        results.hidden = false; stagger(results);
      });
      show(0);
    }

    // Accreditation logo fallback
    $$('.cab-acc img').forEach(function (im) { im.loading = 'lazy'; im.addEventListener('error', function () { im.parentNode.classList.add('cab-noimg'); im.remove(); }); });

    // Venues map
    var vs = $$('.cab-v');
    if (vs.length) {
      var map = el('div', 'cab-map', '<iframe loading="lazy" title="Venue map" referrerpolicy="no-referrer-when-downgrade"></iframe><span class="cab-map-tag"></span>');
      $('.cab-ven').appendChild(map);
      var frame = $('iframe', map), tag = $('.cab-map-tag', map);
      vs.forEach(function (v, i) {
        var t = el('div', 'cab-vtx'); while (v.firstChild) t.appendChild(v.firstChild);
        v.appendChild(el('span', 'cab-pin', ICON.pin)); v.appendChild(t);
        v.setAttribute('role', 'button'); v.tabIndex = 0;
        v.addEventListener('click', function () { pick(i); });
        v.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(i); } });
      });
      var pick = function (i) {
        var v = vs[i];
        frame.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(v.getAttribute('data-addr') || txt($('.cab-va', v))) + '&t=m&z=15&output=embed';
        tag.textContent = txt($('.cab-vn', v)).replace(/Head office$/, '').trim();
        vs.forEach(function (x, j) { x.setAttribute('aria-pressed', i === j); });
      };
      pick(0);
    }

    // Reveal on scroll + counters
    var count = function (n) {
      var end = +n.getAttribute('data-count'), suf = n.getAttribute('data-suffix') || '', t0 = null;
      if (reduce) return;
      var step = function (t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1400, 1); n.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    var targets = $$('.cab-rv, .cab-tl-item');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (!e.isIntersecting) return; e.target.classList.add('cab-on'); $$('[data-count]', e.target).forEach(count); io.unobserve(e.target); });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      targets.forEach(function (t) { io.observe(t); });
    } else targets.forEach(function (t) { t.classList.add('cab-on'); });

    // Smooth in-page links
    $$('a[href^="#cab-"]').forEach(function (a) {
      a.addEventListener('click', function (e) { var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); } });
    });
  }

  function start() { var root = document.getElementById('cst-about'); if (root && !root.getAttribute('data-ready')) { root.setAttribute('data-ready', '1'); init(root); } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

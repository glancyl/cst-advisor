/* CST Training · Mental Health hub (/mental-health-courses/) · v2 · 17 Nov 2026
   Loads the shared hub styles (nvq-hub.css) plus the mental health extras, runs the course
   finder, the "Which course" tabs and the live First Aid for Mental Health dates.
   Page copy lives in the WordPress page. Prices and URLs: update MH_COURSES below (and the
   price lines on the course cards in the page) whenever the master product record changes.
   Every interaction uses one delegated listener on the document, because another script on the
   site rewrites the page after load and drops listeners attached to individual elements. */
(function () {
  if (window.__mhhub) return;
  window.__mhhub = true;

  var BASE = (document.currentScript && document.currentScript.src.replace(/[^/]*$/, "")) || "https://glancyl.github.io/cst-advisor/";
  var VER = (document.currentScript && (document.currentScript.src.match(/\?v=\w+/) || [""])[0]) || "";
  if (!document.querySelector("link[data-nvqh]")) {
    var l = document.createElement("link"); l.rel = "stylesheet"; l.href = BASE + "nvq-hub.css" + VER; l.setAttribute("data-nvqh", "1"); document.head.appendChild(l);
  }

  var CSS = [
    /* First section after the hero sits under its curved edge */
    ".nvqh.mhh-after{padding-top:96px!important}",
    "@media (max-width:700px){.nvqh.mhh-after{padding-top:70px!important}}",
    /* Hero side panel */
    ".mhh-side{background:#fff;color:var(--body);border-radius:var(--r);padding:22px 22px 18px;box-shadow:0 12px 30px rgba(29,37,96,.25);border-top:5px solid var(--orange)}",
    ".nvqh .mhh-side h3{color:var(--navy);margin:0 0 10px!important}",
    ".mhh-side dl{margin:0;display:grid;gap:10px}",
    ".mhh-side dt{font-weight:700;color:var(--navy);font-size:.95rem}",
    ".mhh-side dd{margin:2px 0 0;font-size:.92rem}",
    ".mhh-side dd b{color:var(--navy);font-size:1.15rem}",
    /* Finder */
    ".nvqh-hero h1{margin:0 0 14px!important}",
    ".mhh-finder{display:grid;grid-template-columns:1.2fr 1.2fr .8fr;gap:16px;margin-bottom:6px}",
    ".mhh-finder select{width:100%;max-width:100%}",
    ".mhh-finder input[type=number]{font:inherit;color:var(--navy);border:1.5px solid #c3c8dc;border-radius:8px;padding:12px 14px;background:#fff;width:100%;height:auto}",
    ".mhh-finder input[type=number]:focus{border-color:var(--navy);outline:none;box-shadow:0 0 0 3px rgba(29,37,96,.12)}",
    "#mhh-reco .note{font-size:.93rem;margin:0;color:var(--body);background:var(--light);border-radius:8px;padding:12px 14px}",
    "#mhh-reco .nvqh-pick p{margin:0}",
    /* Course cards, as the SHEA hub */
    ".mhh-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}",
    ".mhh-card{background:var(--navy);border-radius:18px;padding:26px 24px;display:flex;flex-direction:column;gap:6px;box-shadow:0 12px 30px rgba(29,37,96,.18)}",
    ".mhh-card .tag{display:inline-block;align-self:flex-start;background:var(--orange);color:#fff;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin:0 0 6px;padding:5px 12px;border-radius:20px}",
    ".nvqh .mhh-card h3{font-size:1.4rem!important;margin:0!important;color:var(--orange)}",
    ".mhh-card .amt{font-size:2rem;font-weight:700;color:#fff;margin:6px 0 0}",
    ".mhh-card .amt small{font-size:.9rem;font-weight:600;color:#c3c9e6}",
    ".mhh-card .for{color:#fff;font-weight:600;margin:0}",
    ".mhh-card ul{list-style:none;margin:10px 0 18px;padding:14px 0 0;flex:1 1 auto;border-top:1px solid rgba(255,255,255,.18)}",
    ".mhh-card li{position:relative;padding-left:22px;margin:0 0 8px;font-size:.95rem;color:#e6e9f7}",
    ".mhh-card li::before{content:'\\2713';position:absolute;left:0;color:var(--orange);font-weight:700}",
    ".mhh-card .links{display:flex;flex-wrap:wrap;gap:8px}",
    ".mhh-card.featured{outline:3px solid var(--orange);outline-offset:-3px}",
    /* Which course tabs */
    ".mhh-tabs{display:grid;grid-template-columns:260px minmax(0,1fr);gap:22px;align-items:start}",
    ".mhh-tabs>*{min-width:0}",
    ".mhh-tablist{display:flex;flex-direction:column;gap:8px}",
    ".mhh-tablist button{text-align:left;font:inherit;background:#fff;border:1.5px solid var(--line);border-left:5px solid var(--line);border-radius:10px;padding:12px 14px;cursor:pointer;color:var(--navy);font-weight:700}",
    ".mhh-tablist button::after{content:attr(data-sub);display:block;font-weight:400;font-size:.85rem;color:var(--muted);margin-top:2px}",
    ".mhh-tablist button span{display:none}",
    ".mhh-tablist button[aria-selected=true]{border-color:var(--navy);border-left-color:var(--orange);background:var(--navy);color:#fff}",
    ".mhh-tablist button[aria-selected=true]::after{color:#c9cde0}",
    ".mhh-pane{display:none;background:#fff;border:1px solid var(--line);border-top:5px solid var(--orange);border-radius:var(--r);padding:26px 28px}",
    ".mhh-pane.on{display:block}",
    ".mhh-pane .tw{overflow-x:auto;margin:12px 0}",
    ".mhh-pane table{width:100%;border-collapse:collapse;font-size:.95rem;min-width:560px}",
    ".mhh-pane th{background:var(--navy);color:#fff;text-align:left;padding:10px 12px}",
    ".mhh-pane td{padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top}",
    ".mhh-pane tr:nth-child(even) td{background:var(--light)}",
    ".mhh-means{background:#FFF7EC;border:1px solid #FFC77F;border-radius:10px;padding:14px 16px;margin-top:14px}",
    ".nvqh .mhh-means h4{font-size:1rem!important;color:#9a5300;margin:0 0 4px!important}",
    ".mhh-means p{margin:0}",
    /* Team ladder on orange */
    ".mhh-team{display:grid;grid-template-columns:1.2fr 1fr;gap:28px;align-items:center}",
    ".nvqh .mhh-team h2{color:#fff;margin:0 0 12px!important}",
    ".mhh-team p{color:#fff}",
    ".mhh-offer{background:#fff;border-radius:var(--r);padding:24px 26px;color:var(--body);box-shadow:0 12px 30px rgba(29,37,96,.2)}",
    ".mhh-offer .amt{font-size:2.2rem;font-weight:700;color:var(--navy);margin:4px 0 0}",
    ".mhh-offer .amt small{font-size:.9rem;font-weight:600}",
    ".mhh-offer ul{margin:10px 0 16px;padding-left:20px}",
    ".mhh-offer li{margin:0 0 6px}",
    /* Live dates, as the SHEA hub */
    ".mhh-dates{max-width:900px;margin:0 auto;display:grid;gap:10px}",
    ".mhh-month{font-weight:700;color:var(--navy);font-size:1.1rem;margin:14px 0 2px}",
    ".mhh-date{background:#fff;border:1px solid var(--line);border-left:5px solid var(--orange);border-radius:10px;padding:14px 18px;display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:8px 20px;align-items:center}",
    ".nvqh .mhh-date h4{margin:0!important;font-size:1.1rem!important;color:var(--navy)}",
    ".mhh-date .meta{font-size:.9rem;color:var(--muted);margin:2px 0 0}",
    ".mhh-date .amt{font-size:1.35rem;font-weight:700;color:var(--navy);white-space:nowrap}",
    ".mhh-date .amt small{font-size:.8rem;font-weight:600}",
    ".mhh-date .btns{display:flex;gap:8px}",
    ".mhh-more{justify-self:center;margin-top:8px}",
    ".mhh-dates [hidden]{display:none!important}",
    ".mhh-dates .nvqh-note{text-align:center}",
    /* Call back form (posts to the generic HubSpot enquiry form) */
    ".mhh-form{display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:left;margin-top:14px}",
    ".mhh-form .full{grid-column:1/-1}",
    ".mhh-form label{display:block;font-weight:700;color:var(--navy);font-size:.88rem;margin:0 0 4px}",
    ".mhh-form input,.mhh-form select,.mhh-form textarea{width:100%;max-width:100%;font:inherit;color:var(--navy);border:1.5px solid #c3c8dc;border-radius:8px;padding:10px 12px;background:#fff;height:auto;box-sizing:border-box}",
    ".mhh-form textarea{min-height:80px;resize:vertical}",
    ".mhh-form input:focus,.mhh-form select:focus,.mhh-form textarea:focus{border-color:var(--navy);outline:none;box-shadow:0 0 0 3px rgba(29,37,96,.12)}",
    ".mhh-form .send{text-align:center}",
    ".mhh-form .send .nvqh-btn{border:0;cursor:pointer;min-width:220px}",
    ".mhh-form .send .nvqh-btn[disabled]{opacity:.6;cursor:default}",
    ".mhh-status{margin:0;font-size:.9rem;text-align:center;min-height:1em}",
    ".mhh-status.err{color:#b42318;font-weight:600}",
    ".mhh-form .legal{font-size:.78rem;color:var(--muted);margin:0;text-align:center}",
    ".mhh-thanks{display:none;background:#ECFDF3;border:1px solid #A6F4C5;border-radius:10px;padding:16px 18px;margin-top:14px;text-align:left;color:#05603A}",
    "@media (max-width:700px){.mhh-form{grid-template-columns:1fr}}",
    /* WordPress stray paragraphs and breaks inside grids */
    ".mhh-cards>br,.mhh-cards>p:empty,.mhh-finder>br,.mhh-finder>p:empty,.mhh-tabs>br,.mhh-tabs>p:empty,.mhh-tablist>br,.mhh-tablist>p:empty,.mhh-team>br,.mhh-team>p:empty{display:none}",
    "@media (max-width:1000px){.mhh-cards{grid-template-columns:1fr 1fr}.mhh-tabs{grid-template-columns:1fr}.mhh-tablist{flex-direction:row;flex-wrap:wrap}.mhh-tablist button{flex:1 1 200px}}",
    "@media (max-width:700px){.mhh-cards,.mhh-finder,.mhh-team{grid-template-columns:1fr}.mhh-pane{padding:20px 18px}.mhh-date{grid-template-columns:1fr}.mhh-date .btns{flex-wrap:wrap}}"
  ].join("\n");
  function injectCss() { if (!document.getElementById("mhh-css")) { var s = document.createElement("style"); s.id = "mhh-css"; s.textContent = CSS; document.head.appendChild(s); } }
  injectCss();

  /* Single source for the finder. Keep in line with the master product record. */
  var SITE = "https://www.csttraining.co.uk";
  var TEAM_PRICE = 1400, TEAM_MAX = 12;
  var C = {
    famh: { name: "Level 2 First Aid for Mental Health", url: "/level-2-first-aid-mental-health/", price: 172, len: "2 days, live online", exam: "Two Highfield exams" },
    aw:   { name: "Level 2 Mental Health Awareness", url: "/level-2-mental-health-intro/", price: 130, len: "1 day, live online", exam: "One Highfield exam" },
    l1:   { name: "Level 1 Mental Health and Wellbeing", url: "/level-1-mental-wellbeing/", price: 99, len: "1 day, live online", exam: "One Highfield exam" }
  };
  var WHY = {
    famh: "First Aid for Mental Health is for the people colleagues will turn to. They learn to spot the signs, start the conversation, check for risk and point the person to the right help.",
    aw: "Mental Health Awareness gives everyone the same understanding of mental health and how to look after their own. It's the first unit of First Aid for Mental Health, so people can build on it later.",
    l1: "Mental Health and Wellbeing is the gentlest introduction: what mental health is, looking after your own, supporting family and friends, and where to find help."
  };
  function money(n) { return "£" + n.toLocaleString("en-GB", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }
  function track(ev, d) { try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: ev }, d || {})); } catch (e) {} }
  function val(id) { var el = document.getElementById(id); return el ? el.value : ""; }

  function pick(key, tag, n, alt) {
    var c = C[key], cost = n > 1 ? n + " people: " + money(c.price * n) + " + VAT" : money(c.price) + " + VAT";
    return '<div class="nvqh-pick' + (alt ? " alt" : "") + '"><div><p class="tag">' + esc(tag) + "</p><h4>" + esc(c.name) + "</h4>" +
      '<p class="meta">' + esc(c.len) + ". " + esc(c.exam) + '. <span class="cost">' + esc(cost) + "</span></p></div>" +
      '<div class="btns"><a class="nvqh-btn pri" href="' + SITE + c.url + '">View Course</a>' +
      '<a class="nvqh-btn out" href="#enquire" data-mhh-cb="' + esc(c.name) + '">Request a Call Back</a></div></div>';
  }
  function teamPick(n) {
    var courses = Math.ceil(n / TEAM_MAX);
    return '<div class="nvqh-pick"><div><p class="tag">Better value for your team</p><h4>A First Aid for Mental Health course of your own</h4>' +
      '<p class="meta">Up to ' + TEAM_MAX + " people, live online on dates that suit your rota. " +
      '<span class="cost">' + (courses > 1 ? courses + " courses: " + money(TEAM_PRICE * courses) : money(TEAM_PRICE)) + " + VAT</span></p></div>" +
      '<div class="btns"><a class="nvqh-btn pri" href="#enquire" data-mhh-cb="Team course: First Aid for Mental Health">Request a Team Course</a></div></div>';
  }

  function render() {
    var box = document.getElementById("mhh-reco"); if (!box) return;
    var who = val("mhh-who"), need = val("mhh-need"), n = Math.max(1, parseInt(val("mhh-n"), 10) || 1);
    if (!who || !need) { box.innerHTML = '<p class="nvqh-note">Answer the questions above and we\'ll show you the right course and the price.</p>'; return; }
    var key = "famh";
    if (need === "aware") key = "aw";
    else if (need === "self") key = who === "staff" ? "l1" : "aw";
    var html = "", notes = [];
    if (key === "famh" && n >= 9) {
      html += teamPick(n);
      html += pick("famh", "Or book seats on our public dates", n, true);
    } else {
      html += pick(key, "We'd recommend", n);
    }
    notes.push(WHY[key]);
    if (key === "aw" && who === "supporter") notes.push("Want this person to support colleagues? First Aid for Mental Health includes everything on the awareness course, plus the first aider skills.");
    if (need === "client") notes.push("If a client, tender or policy names a specific certificate, send it to us before you book and we'll tell you honestly whether this one meets it.");
    if (key === "famh" && n >= 5 && n < 9) notes.push("From nine people, a course of your own for up to " + TEAM_MAX + " (" + money(TEAM_PRICE) + " + VAT) costs about the same or less than public seats.");
    if (key !== "famh" && n >= 5) notes.push("Training five or more? Ask us about team rates or a course just for your team.");
    box.innerHTML = html + notes.map(function (t) { return '<p class="note">' + esc(t) + "</p>"; }).join("");
    track("mhh_finder", { who: who, need: need, people: n, course: key });
  }

  /* ---------- Which course tabs ---------- */
  function showTab(btn) {
    var key = btn.getAttribute("data-mhh-tab");
    Array.prototype.forEach.call(document.querySelectorAll("[data-mhh-tab]"), function (b) { b.setAttribute("aria-selected", b === btn ? "true" : "false"); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-mhh-pane]"), function (p) { p.classList.toggle("on", p.getAttribute("data-mhh-pane") === key); });
    track("mhh_tab", { tab: key });
  }

  /* ---------- FAQ structured data, built from the FAQ section ---------- */
  function faqSchema() {
    if (document.getElementById("mhh-faq-ld")) return;
    var items = document.querySelectorAll("#mhh-faq details"); if (!items.length) return;
    var data = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [] };
    Array.prototype.forEach.call(items, function (d) {
      var q = d.querySelector("summary"), a = d.querySelector("p"); if (!q || !a) return;
      data.mainEntity.push({ "@type": "Question", name: q.textContent.trim(), acceptedAnswer: { "@type": "Answer", text: a.textContent.trim() } });
    });
    var s = document.createElement("script"); s.type = "application/ld+json"; s.id = "mhh-faq-ld"; s.textContent = JSON.stringify(data); document.head.appendChild(s);
  }

  /* ---------- live course dates from WooCommerce (Store API) ----------
     <div class="mhh-dates" id="mhh-dates" data-cat="1472" data-time="08:30 to 17:00, two days"
          data-fallback="/level-2-first-aid-mental-health/"></div>  */
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var SHOW = 4;
  var datesHTML = null, datesBusy = false;
  function datesBox() { return document.getElementById("mhh-dates"); }
  function paintDates() {
    var box = datesBox(); if (!box || datesHTML === null) return;
    if (box.getAttribute("data-state") !== "done") { box.innerHTML = datesHTML; box.setAttribute("data-state", "done"); }
  }
  function loadDates() {
    var box = datesBox(); if (!box) return;
    if (datesHTML !== null) { paintDates(); return; }
    if (datesBusy) return;
    datesBusy = true;
    var cat = box.getAttribute("data-cat"), time = box.getAttribute("data-time") || "", fb = box.getAttribute("data-fallback") || "/contact/";
    var KEY = "mhh-dates-" + cat, TTL = 10 * 60 * 1000, cached = null;
    try { cached = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}
    var fresh = cached && Date.now() - cached.t < TTL;
    if (!fresh) box.innerHTML = '<p class="nvqh-note">Loading dates…</p>';
    var req = fresh ? Promise.resolve(cached.list) :
      fetch("/wp-json/wc/store/v1/products?category=" + encodeURIComponent(cat) + "&stock_status=instock&per_page=100" +
        "&_fields=id,name,permalink,prices,is_in_stock,low_stock_remaining", { credentials: "same-origin" })
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function (list) {
          var slim = (list || []).map(function (p) { return { id: p.id, name: p.name, permalink: p.permalink, prices: p.prices, is_in_stock: p.is_in_stock, low_stock_remaining: p.low_stock_remaining }; });
          try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), list: slim })); } catch (e) {}
          return slim;
        });
    req
      .then(function (list) {
        var today = new Date(); today.setHours(0, 0, 0, 0);
        var rows = (list || []).map(function (p) {
          var m = String(p.name || "").match(/(\d{2})[-\/](\d{2})[-\/](\d{4})/); if (!m) return null;
          if (/bespoke|up to 12|employees/i.test(p.name || "")) return null;
          var d = new Date(+m[3], +m[2] - 1, +m[1]);
          var pr = p.prices || {}, mu = Math.pow(10, pr.currency_minor_unit || 0);
          return { d: d, id: p.id, url: p.permalink, price: (+pr.price || 0) / mu, stock: p.is_in_stock !== false, low: p.low_stock_remaining };
        }).filter(function (r) { return r && r.stock && r.d >= today; }).sort(function (a, b) { return a.d - b.d; });
        if (!rows.length) { datesHTML = '<p class="nvqh-note">No dates are listed right now. Call 020 3488 4472 and we\'ll find you one.</p>'; return; }
        var html = "", last = "";
        rows.forEach(function (r, i) {
          var mk = MONTHS[r.d.getMonth()] + " " + r.d.getFullYear(), hide = i >= SHOW ? ' data-more="1" hidden' : "";
          if (mk !== last) { html += '<p class="mhh-month"' + hide + ">" + mk + "</p>"; last = mk; }
          var seats = r.low && r.low <= 4 ? "Only " + r.low + " seats left" : "";
          html += '<div class="mhh-date"' + hide + "><div><h4>Starts " + DAYS[r.d.getDay()] + " " + r.d.getDate() + " " + mk + "</h4>" +
            '<p class="meta">Live online on Google Meet' + (time ? " · " + esc(time) : "") + (seats ? " · <strong>" + seats + "</strong>" : "") + "</p></div>" +
            '<div class="amt">' + money(r.price) + " <small>+ VAT</small></div>" +
            '<div class="btns"><a class="nvqh-btn pri" href="' + esc(r.url) + "?add-to-cart=" + r.id + '" data-mhh-book="' + r.id + '">Book Now</a></div></div>';
        });
        if (rows.length > SHOW) html += '<button type="button" class="nvqh-btn out mhh-more" data-mhh-more="1">Show more dates</button>';
        datesHTML = html;
      })
      .catch(function () {
        datesHTML = '<p class="nvqh-note">We couldn\'t load the dates just now. <a href="' + esc(fb) + '">See all course dates</a> or call 020 3488 4472.</p>';
      })
      .then(function () { datesBusy = false; paintDates(); });
  }

  /* ---------- call back form ----------
     Built here so WordPress can't alter it. Posts to the generic HubSpot enquiry form
     (the one the ILM, CMI and NEBOSH pages use), with the course in enquiry_qualification. */
  var HS_URL = "https://api.hsforms.com/submissions/v3/integration/submit/19996504/82962984-45f3-49f7-af62-fc7da9f14b2f";
  var COURSES = ["Level 2 First Aid for Mental Health", "Team course: First Aid for Mental Health", "Level 2 Mental Health Awareness", "Level 1 Mental Health and Wellbeing", "Not sure yet"];
  function mk(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; }
  function buildForm() {
    var box = document.getElementById("mhh-form"); if (!box || box.querySelector("form")) return;
    box.innerHTML = "";
    var form = mk("form", "mhh-form"); form.noValidate = true;
    function fld(lbl, type, full, opts) {
      var w = mk("div", full ? "full" : null), id = "mhhf-" + lbl.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, ""), l = mk("label", null, lbl), i;
      if (type === "select") { i = mk("select"); opts.forEach(function (o) { var p = mk("option", null, o); p.value = o; i.appendChild(p); }); }
      else if (type === "textarea") i = mk("textarea"); else { i = mk("input"); i.type = type; }
      i.id = id; l.setAttribute("for", id); w.appendChild(l); w.appendChild(i); form.appendChild(w); return i;
    }
    var fN = fld("Your name", "text"), fC = fld("Company (optional)", "text"), fE = fld("Email", "email"), fP = fld("Phone", "tel");
    var fK = fld("Course", "select", false, COURSES), fH = fld("How many people?", "number"); fH.min = "1"; fH.value = "1";
    var fQ = fld("Anything else? (optional)", "textarea", true);
    fN.autocomplete = "name"; fE.autocomplete = "email"; fP.autocomplete = "tel"; fC.autocomplete = "organization";
    var bw = mk("div", "full send"), sb = mk("button", "nvqh-btn pri", "Request a Call Back"); sb.type = "submit"; bw.appendChild(sb); form.appendChild(bw);
    var st = mk("p", "mhh-status full"); st.setAttribute("role", "status"); form.appendChild(st);
    form.appendChild(mk("p", "legal full", "We'll only use your details to reply to this enquiry."));
    var th = mk("div", "mhh-thanks"); th.appendChild(mk("b", null, "Thanks, we've got your request. ")); th.appendChild(document.createTextNode("We'll call you the same working day. If it's urgent, call 020 3488 4472."));
    box.appendChild(form); box.appendChild(th);
    var pre = window.__mhhCourse; if (pre && COURSES.indexOf(pre) > -1) fK.value = pre;
    var n = parseInt(val("mhh-n"), 10); if (n > 1) fH.value = String(n);
  }
  /* Submit is handled by one listener on the document (below), because another script on the site
     can re-render the page, which drops listeners attached to the form itself. */
  function submitForm(form) {
    var box = form.parentNode, g = function (id) { return document.getElementById(id); };
    var fN = g("mhhf-your-name"), fC = g("mhhf-company-optional"), fE = g("mhhf-email"), fP = g("mhhf-phone"),
        fK = g("mhhf-course"), fH = g("mhhf-how-many-people"), fQ = g("mhhf-anything-else-optional");
    var sb = form.querySelector("button[type=submit]"), st = form.querySelector(".mhh-status"), th = box.querySelector(".mhh-thanks");
    if (!fN || !fE || !fP || !sb || sb.disabled) return;
    var name = fN.value.trim(), email = fE.value.trim(), ph = fP.value.trim();
    function err(t, x) { st.className = "mhh-status full err"; st.textContent = t; if (x) x.focus(); }
    if (!name) return err("Add your name.", fN);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err("Enter a valid email address.", fE);
    if (!ph) return err("Add a phone number so we can call you back.", fP);
    var parts = name.split(/\s+/), first = parts.shift(), last = parts.join(" ") || "-", people = String(Math.max(1, parseInt(fH.value, 10) || 1));
    var msg = "Mental health call back request\n\nCompany: " + (fC.value.trim() || "-") + "\nCourse: " + fK.value + "\nPeople: " + people + (fQ.value.trim() ? "\n\nNotes:\n" + fQ.value.trim() : "");
    var fields = [{ name: "firstname", value: first }, { name: "lastname", value: last }, { name: "email", value: email }, { name: "phone", value: ph },
      { name: "message", value: msg }, { name: "enquiry_qualification", value: fK.value }, { name: "enquiry_learners", value: people },
      { name: "enquiry_options_selected", value: "Mental health hub call back" }];
    var ctx = { pageUri: location.href, pageName: document.title }, m = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/); if (m) ctx.hutk = decodeURIComponent(m[1]);
    sb.disabled = true; sb.textContent = "Sending"; st.className = "mhh-status full"; st.textContent = "";
    fetch(HS_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fields: fields, context: ctx }) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function () {
        track("mhh_enquiry", { course: fK.value, people: +people });
        var f = document.querySelector("#mhh-form form"), t = document.querySelector("#mhh-form .mhh-thanks");
        if (f) f.style.display = "none";
        if (t) { t.style.display = "block"; t.scrollIntoView({ behavior: "smooth", block: "center" }); }
      })
      .catch(function () { sb.disabled = false; sb.textContent = "Request a Call Back"; err("That didn't send. Please try again, or call 020 3488 4472."); });
  }
  function preselect(course) {
    window.__mhhCourse = course;
    var sel = document.getElementById("mhhf-course"); if (sel && COURSES.indexOf(course) > -1) sel.value = course;
    var hp = document.getElementById("mhhf-how-many-people"), n = parseInt(val("mhh-n"), 10); if (hp && n > 1) hp.value = String(n);
  }

  /* ---------- delegated listeners ---------- */
  document.addEventListener("submit", function (e) {
    var f = e.target && e.target.closest && e.target.closest(".mhh-form"); if (!f) return;
    e.preventDefault(); submitForm(f);
  }, true);
  document.addEventListener("change", function (e) { if (e.target && e.target.id && e.target.id.indexOf("mhh-") === 0) render(); });
  document.addEventListener("input", function (e) { if (e.target && e.target.id === "mhh-n") render(); });
  document.addEventListener("click", function (e) {
    if (!e.target.closest) return;
    var tab = e.target.closest("[data-mhh-tab]"); if (tab) { e.preventDefault(); showTab(tab); return; }
    var more = e.target.closest("[data-mhh-more]"); if (more) {
      Array.prototype.forEach.call(datesBox().querySelectorAll("[data-more]"), function (el) { el.hidden = false; el.removeAttribute("data-more"); });
      more.remove(); datesHTML = datesBox().innerHTML; return;
    }
    var cb = e.target.closest("[data-mhh-cb]"); if (cb) { preselect(cb.getAttribute("data-mhh-cb")); track("mhh_callback", { course: cb.getAttribute("data-mhh-cb") }); return; }
    var b = e.target.closest("[data-mhh-book]"); if (b) track("mhh_book", { product: b.getAttribute("data-mhh-book") });
  });

  /* ---------- no white bar between the last section and the site footer ----------
     The theme pads the page wrapper and leaves empty paragraphs after the content. This only runs
     on this page, so it walks up from the last hub section to <body>, removes bottom spacing on
     each wrapper and hides empty elements that follow it. */
  function isEmpty(el) { return !el.querySelector("img,iframe,form,input,video,svg") && !el.textContent.replace(/\s|\u00a0/g, ""); }
  function closeFooterGap() {
    var all = document.querySelectorAll("section.nvqh"); if (!all.length) return;
    var el = all[all.length - 1];
    while (el && el !== document.body) {
      el.style.setProperty("margin-bottom", "0", "important");
      if (el.tagName !== "SECTION") el.style.setProperty("padding-bottom", "0", "important");
      var sib = el.nextElementSibling;
      while (sib) {
        if (/^(P|BR|DIV)$/.test(sib.tagName) && isEmpty(sib) && !sib.id) sib.style.setProperty("display", "none", "important");
        else if (/footer/i.test(sib.tagName + " " + sib.className + " " + sib.id)) { sib.style.setProperty("margin-top", "0", "important"); break; }
        else break;
        sib = sib.nextElementSibling;
      }
      el = el.parentElement;
    }
  }
  var gapTimer = null;
  function gapSoon() { clearTimeout(gapTimer); gapTimer = setTimeout(closeFooterGap, 150); }

  function init() { injectCss(); render(); loadDates(); faqSchema(); buildForm(); closeFooterGap(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  if (window.MutationObserver) new MutationObserver(function () {
    var box = document.getElementById("mhh-reco"); if (box && !box.firstChild) render();
    var db = datesBox(); if (db && db.getAttribute("data-state") !== "done") loadDates();
    injectCss();
    buildForm();
    gapSoon();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

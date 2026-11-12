/* CST Training · EUSR SHEA hub and course pages · v7 · 11 Nov 2026
   Loads the shared hub styles (nvq-hub.css) plus a few SHEA extras, and runs the course finder.
   Page copy lives in the WordPress page. Prices and URLs: update SHEA_COURSES below.
   Every interaction uses one delegated listener on the document, because another script on the
   site rewrites the page after load and drops listeners attached to individual elements. */
(function () {
  var BASE = (document.currentScript && document.currentScript.src.replace(/[^/]*$/, "")) || "https://glancyl.github.io/cst-advisor/";
  var VER = (document.currentScript && (document.currentScript.src.match(/\?v=\w+/) || [""])[0]) || "";
  if (!document.querySelector("link[data-nvqh]")) {
    var l = document.createElement("link"); l.rel = "stylesheet"; l.href = BASE + "nvq-hub.css" + VER; l.setAttribute("data-nvqh", "1"); document.head.appendChild(l);
  }
  var CSS = [
    ".sheah-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}",
    ".sheah-card{background:var(--navy);border-radius:18px;padding:26px 24px;display:flex;flex-direction:column;gap:6px;box-shadow:0 12px 30px rgba(29,37,96,.18)}",
    ".sheah-card .tag{display:inline-block;align-self:flex-start;background:var(--orange);color:#fff;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin:0 0 6px;padding:5px 12px;border-radius:20px}",
    ".nvqh .sheah-card h3{font-size:1.45rem;margin:0;color:var(--orange)}",
    ".sheah-card .amt{font-size:2rem;font-weight:700;color:#fff;margin:6px 0 0}",
    ".sheah-card .amt small{font-size:.9rem;font-weight:600;color:#c3c9e6}",
    ".sheah-card ul{list-style:none;margin:10px 0 18px;padding:14px 0 0;flex:1 1 auto;border-top:1px solid rgba(255,255,255,.18)}",
    ".sheah-card li{position:relative;padding-left:22px;margin:0 0 8px;font-size:.95rem;color:#e6e9f7}",
    ".sheah-card li::before{content:'\\2713';position:absolute;left:0;color:var(--orange);font-weight:700}",
    ".sheah-card .nvqh-btn{align-self:flex-start}",
    ".sheah-card .links{display:flex;flex-wrap:wrap;gap:8px}",
    ".sheah-finder{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:22px}",
    ".sheah-finder label{display:block;font-weight:700;color:var(--navy);margin-bottom:6px;font-size:.95rem}",
    ".sheah-finder select{width:100%;max-width:100%}",
    "#sheah-reco .nvqh-pick+.nvqh-pick{margin-top:12px}",
    "#sheah-reco .note{font-size:.92rem;margin:12px 0 0;color:var(--body)}",
    "@media (max-width:1000px){.sheah-cards{grid-template-columns:repeat(2,1fr)}.sheah-finder{grid-template-columns:repeat(2,1fr)}}",
    "@media (max-width:700px){.sheah-cards,.sheah-finder{grid-template-columns:1fr}}",
    ".sheah-cards>br,.sheah-finder>br{display:none}",
    ".sheah-facts{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}",
    ".sheah-facts div{background:#fff;border-radius:12px;padding:18px 16px;text-align:center;border-bottom:4px solid var(--orange)}",
    ".sheah-facts b{display:block;font-size:1.5rem;color:var(--navy)}",
    ".sheah-facts span{font-size:.9rem;color:var(--muted)}",
    ".sheah-two{display:grid;grid-template-columns:1fr 1fr;gap:20px}",
    ".sheah-two>div{background:var(--light);border:1px solid var(--line);border-top:4px solid var(--orange);border-radius:var(--r);padding:24px 26px}",
    ".sheah-two ul,.sheah-two ol{margin:10px 0 0;padding-left:20px}",
    ".sheah-two li{margin:0 0 6px}",
    ".sheah-dates{max-width:900px;margin:0 auto;display:grid;gap:10px}",
    ".sheah-month{font-weight:700;color:var(--navy);font-size:1.1rem;margin:14px 0 2px}",
    ".sheah-date{background:#fff;border:1px solid var(--line);border-left:5px solid var(--orange);border-radius:10px;padding:14px 18px;display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:8px 20px;align-items:center}",
    ".sheah-date h4{margin:0;font-size:1.1rem;color:var(--navy)}",
    ".sheah-date .meta{font-size:.9rem;color:var(--muted);margin:2px 0 0}",
    ".sheah-date .amt{font-size:1.35rem;font-weight:700;color:var(--navy);white-space:nowrap}",
    ".sheah-date .amt small{font-size:.8rem;font-weight:600}",
    ".sheah-date .btns{display:flex;gap:8px}",
    ".sheah-date.full{opacity:.6;border-left-color:var(--muted)}",
    ".sheah-more{justify-self:center;margin-top:8px}",
    ".sheah-filter{display:flex;align-items:center;gap:12px;justify-content:flex-end;flex-wrap:wrap}",
    ".sheah-filter label{font-weight:700;color:var(--navy);margin:0}",
    ".sheah-filter select{width:auto;min-width:200px;max-width:100%}",
    ".sheah-dates .nvqh-note{text-align:center}",
    "@media (max-width:1000px){.sheah-facts{grid-template-columns:repeat(2,1fr)}}",
    "@media (max-width:700px){.sheah-two{grid-template-columns:1fr}.sheah-date{grid-template-columns:1fr}.sheah-date .btns{flex-wrap:wrap}}",
    ".sheah-facts>br,.sheah-two>br{display:none}"
  ].join("\n");
  if (!document.getElementById("sheah-css")) { var s = document.createElement("style"); s.id = "sheah-css"; s.textContent = CSS; document.head.appendChild(s); }

  /* Single source for the finder. Keep in line with the master product record. */
  var SITE = "https://www.csttraining.co.uk";
  var C = {
    gas:   { name: "SHEA Gas", url: "/eusr-shea-gas-course/", price: 175, len: "1 day, live online", reg: "Registration lasts 5 years" },
    water: { name: "SHEA Water", url: "/eusr-shea-water-course/", price: 175, len: "1 day, live online", reg: "Registration lasts 3 years" },
    power: { name: "SHEA Power", url: "/shea-power-course/", price: 175, len: "1 day, live online", reg: "Registration lasts 3 years" },
    ccp:   { name: "SHEA Cross-Country Pipelines", url: "/shea-cross-country-pipelines/", price: 160, len: "1 day, live online", reg: "Registration lasts 3 years" },
    nwh:   { name: "National Water Hygiene", url: "/eusr-national-water-hygiene/", price: 139, len: "Half a day, live online", reg: "Registration lasts 3 years" },
    renew: { name: "SHEA Renewal", url: null, price: 129, len: "Half a day, live online", reg: "Renews for 5 years (Gas) or 3 years" }
  };
  var RENEW_URL = { gas: "/shea-gas-refresher/", water: "/shea-water-refresher/", power: "/shea-power-refresher/" };
  var BANDS = [{ min: 7, pct: 10 }, { min: 3, pct: 5 }];
  function money(n) { return "£" + n.toLocaleString("en-GB", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }
  function track(ev, d) { try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: ev }, d || {})); } catch (e) {} }

  function priceLine(c, n) {
    var b = BANDS.filter(function (x) { return n >= x.min; })[0], pct = b ? b.pct : 0;
    var each = c.price * (1 - pct / 100);
    if (n <= 1) return money(c.price) + " + VAT";
    return n + " people: " + money(each * n) + " + VAT" + (pct ? " (" + pct + "% team rate applied)" : "");
  }
  function pick(key, url, tag, n, alt) {
    var c = C[key];
    return '<div class="nvqh-pick' + (alt ? " alt" : "") + '"><div><p class="tag">' + esc(tag) + "</p><h4>" + esc(c.name) + "</h4>" +
      '<p class="meta">' + esc(c.len) + ". " + esc(c.reg) + '. <span class="cost">' + esc(priceLine(c, n)) + "</span></p></div>" +
      '<div class="btns">' + (url ? '<a class="nvqh-btn pri" href="' + SITE + url + '">View Dates</a>' : "") +
      '<a class="nvqh-btn out" href="#enquire" data-sheah-cb="' + esc(c.name) + '">Request a Call Back</a></div></div>';
  }
  function val(id) { var el = document.getElementById(id); return el ? el.value : ""; }

  function render() {
    var box = document.getElementById("sheah-reco"); if (!box) return;
    var sector = val("sheah-sector"), sit = val("sheah-sit"), job = val("sheah-job"), n = parseInt(val("sheah-n"), 10) || 1;
    if (!sector || !sit || !job) { box.innerHTML = '<p class="nvqh-note">Answer the questions above and we\'ll show you the course, the price and which CSCS card to apply for.</p>'; return; }
    var html = "", notes = [];
    if (sit === "renew") {
      if (sector === "ccp") {
        html += pick("renew", null, "If your registration is still in date", n);
        notes.push("Call us to book a Pipelines renewal. If your registration has already expired, you'll need the full one-day course again.");
      } else {
        html += pick("renew", RENEW_URL[sector], "If your registration is still in date", n);
        html += pick(sector, C[sector].url, "If it has already expired", n, true);
      }
    } else {
      html += pick(sector, C[sector].url, "You need", n);
      if (sit === "add") notes.push("Already hold SHEA for another sector? EUSR has a shorter route if your original registration is under two years old. Ask us whether it applies to you.");
    }
    if (sector === "water") html += pick("nwh", C.nwh.url, "Working on clean water sites? You'll also need", n, true);
    notes.push(job === "apprentice" ? "For site access as an apprentice you'll also need the EUSR CSCS Apprentice card, a separate application to EUSR." :
      job === "labourer" ? "For site access as a labourer you'll also need the EUSR CSCS Utilities Labourer card, a separate application to EUSR." :
      job === "skilled" ? "For site access in a skilled role you'll also need the EUSR CSCS card for your trade, a separate application to EUSR, which needs a Level 2 qualification as well as your SHEA." :
      "Supervisors and managers need the EUSR CSCS card that matches their role, a separate application to EUSR, as well as a valid SHEA.");
    if (n >= 8) notes.push("With eight or more we can run the course just for your team, on a date that suits your rota.");
    else if (n >= 3) notes.push("Ask us for your team rate when you book.");
    box.innerHTML = html + notes.map(function (t) { return '<p class="note">' + esc(t) + "</p>"; }).join("");
    track("sheah_finder", { sector: sector, situation: sit, job: job, people: n });
  }

  function filterDates(m) {
    var box = datesBox(); if (!box) return;
    Array.prototype.forEach.call(box.querySelectorAll(".sheah-month,.sheah-date"), function (el) {
      el.hidden = m ? el.getAttribute("data-m") !== m : el.hasAttribute("data-more");
    });
    var more = box.querySelector("[data-sheah-more]"); if (more) more.hidden = !!m;
  }
  document.addEventListener("change", function (e) {
    if (!e.target || !e.target.id) return;
    if (e.target.id === "sheah-month-filter") { filterDates(e.target.value); track("sheah_month_filter", { month: e.target.value }); return; }
    if (e.target.id.indexOf("sheah-") === 0) render();
  });
  document.addEventListener("input", function (e) { if (e.target && e.target.id === "sheah-n") render(); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-sheah-cb]"); if (!a) return;
    track("sheah_callback", { course: a.getAttribute("data-sheah-cb") });
  });
  /* ---------- live course dates from WooCommerce (Store API) ----------
     <div class="sheah-dates" id="sheah-dates" data-cat="1108" data-time="08:30 to 17:00"
          data-fallback="/eusr-shea-gas-dates/"></div>  */
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var SHOW = 6;
  /* The site rewrites document.body after load (the review-count snippet), which swaps the dates
     box for a copy. So the result is cached and always written to whichever box is in the page now. */
  var datesHTML = null, datesBusy = false;
  function datesBox() { return document.getElementById("sheah-dates"); }
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
    var KEY = "sheah-dates-" + cat, TTL = 10 * 60 * 1000, cached = null;
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
          var m = String(p.name || "").match(/(\d{2})-(\d{2})-(\d{4})/); if (!m) return null;
          var d = new Date(+m[3], +m[2] - 1, +m[1]);
          var pr = p.prices || {}, mu = Math.pow(10, pr.currency_minor_unit || 0);
          return { d: d, id: p.id, url: p.permalink, price: (+pr.price || 0) / mu, stock: p.is_in_stock !== false, low: p.low_stock_remaining };
        }).filter(function (r) { return r && r.stock && r.d >= today; }).sort(function (a, b) { return a.d - b.d; });
        if (!rows.length) { datesHTML = '<p class="nvqh-note">No dates are listed right now. Call 020 3488 4472 and we\'ll find you one.</p>'; return; }
        var html = "", last = "", months = [];
        rows.forEach(function (r, i) {
          var mk = MONTHS[r.d.getMonth()] + " " + r.d.getFullYear(), hide = i >= SHOW ? ' data-more="1" hidden' : "";
          var mattr = ' data-m="' + mk + '"';
          if (mk !== last) { html += '<p class="sheah-month"' + mattr + hide + ">" + mk + "</p>"; last = mk; months.push(mk); }
          var seats = r.low && r.low <= 4 ? "Only " + r.low + " seats left" : "";
          html += '<div class="sheah-date"' + mattr + hide + "><div><h4>" + DAYS[r.d.getDay()] + " " + r.d.getDate() + " " + mk + "</h4>" +
            '<p class="meta">Live online' + (time ? " · " + esc(time) : "") + (seats ? " · <strong>" + seats + "</strong>" : "") + "</p></div>" +
            '<div class="amt">' + money(r.price) + " <small>+ VAT</small></div>" +
            '<div class="btns"><a class="nvqh-btn pri" href="' + esc(r.url) + "?add-to-cart=" + r.id + '" data-sheah-book="' + r.id + '">Book Now</a>' +
            '<a class="nvqh-btn out" href="' + esc(r.url) + '">More Info</a></div></div>';
        });
        if (rows.length > SHOW) html += '<button type="button" class="nvqh-btn out sheah-more" data-sheah-more="1">Show more dates</button>';
        var filter = months.length > 1 ? '<div class="sheah-filter"><label for="sheah-month-filter">Filter by month</label><select id="sheah-month-filter"><option value="">All months</option>' +
          months.map(function (m) { return '<option value="' + m + '">' + m + "</option>"; }).join("") + "</select></div>" : "";
        datesHTML = filter + html;
      })
      .catch(function () {
        datesHTML = '<p class="nvqh-note">We couldn\'t load the dates just now. <a href="' + esc(fb) + '">See all course dates</a> or call 020 3488 4472.</p>';
      })
      .then(function () { datesBusy = false; paintDates(); });
  }
  document.addEventListener("click", function (e) {
    var m = e.target.closest && e.target.closest("[data-sheah-more]"); if (m) {
      var box = datesBox();
      Array.prototype.forEach.call(box.querySelectorAll("[data-more]"), function (el) { el.hidden = false; el.removeAttribute("data-more"); });
      m.remove(); return;
    }
    var b = e.target.closest && e.target.closest("[data-sheah-book]"); if (b) track("sheah_book", { product: b.getAttribute("data-sheah-book") });
  });

  function init() { render(); loadDates(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  if (window.MutationObserver) new MutationObserver(function () {
    var box = document.getElementById("sheah-reco"); if (box && !box.firstChild) render();
    var db = datesBox(); if (db && db.getAttribute("data-state") !== "done") loadDates();
    if (!document.getElementById("sheah-css")) { var s2 = document.createElement("style"); s2.id = "sheah-css"; s2.textContent = CSS; document.head.appendChild(s2); }
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

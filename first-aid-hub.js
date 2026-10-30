/*!
 * CST Training First Aid hub (v6: hide cancelled courses, only lists published, visible, in-stock dates)
 * Host on GitHub Pages (cst-advisor repo), load with ?v=N cache buster.
 * Load AFTER nebosh-hub.js, which supplies the shared nbx/nbi page CSS.
 * Mount point:
 *   <div class="cst-fa-finder"
 *        data-faw-url="/level-3-award-in-first-aid-at-work-3-day-course-rqf/"
 *        data-efaw-url="/emergency-first-aid-work/"
 *        data-faw-dates="/level-3-award-in-first-aid-at-work-3-day-course-rqf/#dates"
 *        data-efaw-dates="/emergency-first-aid-work/#dates"
 *        data-faw-price="215" data-efaw-price="95"></div>
 * Live dates:
 *   <div class="cst-fa-dates" data-category="product-category-slug" (preferred; or data-search="First Aid At Work") data-match="first aid at work"
 *        data-exclude="emergency|requal" data-theme="dark"
 *        data-fallback="#enquire" data-fallback-label="Ask us about dates"></div>
 *   Reads published WooCommerce products through the Store API. First aid titles look like
 *   "London (Dartford) | Level 3 First Aid At Work | Highfields Approved | 09-12-2026":
 *   the first part is the location, and the date is read from anywhere in the title.
 *   ?location=dartford preselects a location. Past and sold-out dates are hidden.
 *   Optional early start: an inline snippet at the top of the page can set
 *   window.CSTFA[categorySlug] = fetch(...first page...) so the request begins before this script loads.
 * Suggested numbers follow HSE's table of suggested first-aid personnel (INDG214 / L74).
 */
(function () {
  "use strict";
  var SITE = "https://www.csttraining.co.uk";
  var CONTACT = SITE + "/contact/";

  var CSS = [
    ".cst-fa-finder .nbi-bar input{-webkit-appearance:none;appearance:none;font:inherit;font-size:16px;font-weight:700;color:#1d2560;background:#f4f5f9;border:2px solid #dcdfea;border-radius:30px;padding:6px 16px;margin:0 4px;width:110px;max-width:100%}",
    ".cst-fa-finder .nbi-bar input.set{border-color:#ff8c04;background:#fff6ea}",
    ".cst-fa-finder .nbi-bar input:focus-visible{outline:3px solid #ff8c04;outline-offset:2px}",
    "@media(max-width:760px){.cst-fa-finder .nbi-bar input{display:block;width:100%;margin:6px 0}}",
    ".cst-fa-finder .fa-src{font-size:13px!important;color:#6b7394!important;margin:14px 0 0!important}"
  ].join("");

  function injectCss() {
    if (document.getElementById("fa-css")) return;
    var s = document.createElement("style"); s.id = "fa-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function linkBtn(href, cls, text) { var a = el("a", "nbx-btn " + cls, text); a.href = href; return a; }
  function money(n) { return "£" + n.toLocaleString("en-GB"); }
  function plural(n, one, many) { return n === 1 ? one : many; }
  function abs(u) { return /^https?:/.test(u) ? u : SITE + u; }

  var HAZARD = [
    ["low", "lower hazard, such as an office or shop"],
    ["high", "higher hazard, such as a construction site, warehouse or factory"]
  ];
  var SHIFTS = [["1", "one shift"], ["2", "two shifts"], ["3", "three shifts"]];

  // HSE suggested minimum per shift. Returns { kind: "ap" | "efaw" | "either" | "faw", n }
  function suggest(hz, people) {
    if (hz === "low") {
      if (people < 25) return { kind: "ap", n: 1 };
      if (people <= 50) return { kind: "efaw", n: 1 };
      return { kind: "faw", n: Math.ceil(people / 100) };
    }
    if (people < 5) return { kind: "ap", n: 1 };
    if (people <= 50) return { kind: "either", n: 1 };
    return { kind: "faw", n: Math.ceil(people / 50) };
  }

  function mount(root) {
    if (root._fa) return; root._fa = true;
    injectCss();
    root.classList.add("nbi");
    root.innerHTML = "";

    var C = {
      faw: {
        name: "First Aid at Work", length: "3 days",
        price: +(root.getAttribute("data-faw-price") || 215),
        url: abs(root.getAttribute("data-faw-url") || "/level-3-award-in-first-aid-at-work-3-day-course-rqf/"),
        dates: abs(root.getAttribute("data-faw-dates") || "/level-3-award-in-first-aid-at-work-3-day-course-rqf/#dates")
      },
      efaw: {
        name: "Emergency First Aid at Work", length: "1 day",
        price: +(root.getAttribute("data-efaw-price") || 95),
        url: abs(root.getAttribute("data-efaw-url") || "/emergency-first-aid-work/"),
        dates: abs(root.getAttribute("data-efaw-dates") || "/emergency-first-aid-work/#dates")
      }
    };

    var bar = el("div", "nbi-bar"); root.appendChild(bar);
    function sel(list, ph, label) {
      var x = el("select"); x.setAttribute("aria-label", label);
      var o = el("option", null, ph); o.value = ""; x.appendChild(o);
      list.forEach(function (p) { var op = el("option", null, p[1]); op.value = p[0]; x.appendChild(op); });
      return x;
    }
    var sh = sel(HAZARD, "choose the type", "Type of workplace");
    var num = el("input"); num.type = "number"; num.min = "1"; num.max = "5000"; num.inputMode = "numeric";
    num.placeholder = "e.g. 30"; num.setAttribute("aria-label", "Most people on site at once");
    var ss = sel(SHIFTS, "choose", "Number of shifts");
    bar.appendChild(document.createTextNode("Our workplace is "));
    bar.appendChild(sh);
    bar.appendChild(document.createTextNode(", with up to "));
    bar.appendChild(num);
    bar.appendChild(document.createTextNode(" people on site at once, working "));
    bar.appendChild(ss);
    bar.appendChild(document.createTextNode("."));
    bar.appendChild(el("p", "nbi-hint", "Answer all three to see the cover HSE suggests, the course to book and the price. No email needed."));

    var out = el("div"); out.setAttribute("aria-live", "polite"); root.appendChild(out);

    function update() {
      var people = parseInt(num.value, 10);
      var okNum = people > 0 && people <= 5000;
      sh.classList.toggle("set", !!sh.value);
      ss.classList.toggle("set", !!ss.value);
      num.classList.toggle("set", okNum);
      out.innerHTML = "";
      if (!sh.value || !ss.value || !okNum) return;

      var shifts = +ss.value, s = suggest(sh.value, people);
      var courseKey = s.kind === "faw" || (s.kind === "either") ? "faw" : "efaw";
      var K = C[courseKey], A = C[courseKey === "faw" ? "efaw" : "faw"];
      var total = s.n * shifts;
      var perShift = shifts > 1 ? " on each shift" : "";

      var head, why;
      if (s.kind === "ap") {
        head = "At least one appointed person" + perShift;
        why = "For " + (sh.value === "low" ? "a lower hazard workplace with fewer than 25" : "a higher hazard workplace with fewer than 5") +
          " people, HSE suggests at least one appointed person to take charge of first aid arrangements. An appointed person isn't a trained first aider, so many employers train someone in Emergency First Aid at Work instead, which means someone on site can act in an emergency.";
      } else if (s.kind === "efaw") {
        head = "At least " + total + " Emergency First Aid at Work " + plural(total, "first aider", "first aiders");
        why = "For a lower hazard workplace with 25 to 50 people, HSE suggests at least one first aider trained in Emergency First Aid at Work" + perShift + ".";
      } else if (s.kind === "either") {
        head = "At least " + total + " trained " + plural(total, "first aider", "first aiders");
        why = "For a higher hazard workplace with 5 to 50 people, HSE suggests at least one first aider" + perShift + ", trained in Emergency First Aid at Work or First Aid at Work depending on the injuries that could happen. Where there's machinery, work at height or sharp tools, First Aid at Work is usually the right choice because it covers fractures, head and spinal injuries, burns and serious illness.";
      } else {
        var per = sh.value === "low" ? 100 : 50;
        head = "At least " + total + " First Aid at Work " + plural(total, "first aider", "first aiders");
        why = "For a " + (sh.value === "low" ? "lower" : "higher") + " hazard workplace with more than 50 people, HSE suggests at least one First Aid at Work first aider for every " + per +
          " people (or part of " + per + ")" + perShift + ". With " + people + " people that's " + s.n + perShift + ".";
      }

      var box = el("div", "nbi-res");
      box.appendChild(el("span", "nbi-vt", "HSE's suggested minimum"));
      box.appendChild(el("h3", null, head));
      var meta = el("div", "nbi-meta");
      meta.appendChild(el("span", null, K.name));
      meta.appendChild(el("span", null, K.length));
      meta.appendChild(el("span", null, money(K.price) + " + VAT per person"));
      if (total > 1) meta.appendChild(el("span", "nx", money(K.price * total) + " + VAT for " + total));
      box.appendChild(meta);
      box.appendChild(el("p", null, why));
      box.appendChild(el("p", null, "HSE expects cover whenever people are at work, including holidays and sickness, so most employers train at least one more person than the minimum."));

      var bb = el("div", "nbi-btns");
      bb.appendChild(linkBtn(K.dates, "or", "See " + K.name + " dates"));
      bb.appendChild(linkBtn(CONTACT, "gh", total >= 5 ? "Ask about group or on-site training" : "Enquire"));
      box.appendChild(bb);

      var al = el("p", "nbi-alt");
      al.appendChild(document.createTextNode("Also worth a look: "));
      var a = el("a", null, A.name + " (" + A.length + ", " + money(A.price) + " + VAT)"); a.href = A.url; al.appendChild(a);
      box.appendChild(al);

      box.appendChild(el("p", "fa-src", "Based on HSE's suggested numbers of first aid personnel. These are a starting point, not fixed legal ratios, so your own first aid needs assessment decides your cover."));

      var rs = el("button", "nbi-reset", "Start again"); rs.type = "button";
      rs.addEventListener("click", function () { sh.value = ""; ss.value = ""; num.value = ""; update(); sh.focus(); });
      box.appendChild(rs);
      out.appendChild(box);

      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "first_aid_finder", fa_hazard: sh.value, fa_people: people, fa_shifts: shifts, fa_course: courseKey, fa_total: total });
      } catch (e) {}
    }
    sh.addEventListener("change", update);
    ss.addEventListener("change", update);
    num.addEventListener("input", update);
  }


  // ---------- Live dates (v3) ----------
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var CACHE_MS = 5 * 60 * 1000, KEEP_MS = 24 * 60 * 60 * 1000;
  function decode(s) { var t = document.createElement("textarea"); t.innerHTML = s; return t.value; }
  function cacheGet(k) { try { var c = JSON.parse(localStorage.getItem("fad2:" + k) || "null"); return c && Date.now() - c.t < KEEP_MS ? c : null; } catch (e) { return null; } }
  function cacheSet(k, d) {
    try {
      var slim = d.map(function (p) { return { id: p.id, name: p.name, permalink: p.permalink, prices: p.prices && { price: p.prices.price, currency_minor_unit: p.prices.currency_minor_unit }, is_in_stock: p.is_in_stock, is_purchasable: p.is_purchasable, low_stock_remaining: p.low_stock_remaining }; });
      localStorage.setItem("fad2:" + k, JSON.stringify({ t: Date.now(), d: slim }));
    } catch (e) {}
  }
  function fetchPages(base, q) {
    var sep = base.indexOf("?") > -1 ? "&" : "?";
    var filter = q.cat ? "category=" + encodeURIComponent(q.cat) : "search=" + encodeURIComponent(q.search);
    function url(n) { return base + sep + filter + "&per_page=100&page=" + n + "&catalog_visibility=catalog&stock_status=instock,onbackorder&_fields=id,name,permalink,prices,is_in_stock,is_purchasable,low_stock_remaining"; }
    function get(n) {
      return fetch(url(n), { credentials: "same-origin" })
        .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); var tp = +(r.headers.get("X-WP-TotalPages") || 1); return r.json().then(function (j) { return { j: j, tp: tp }; }); });
    }
    var early = q.cat && window.CSTFA && window.CSTFA[q.cat];
    var first = early ? Promise.resolve(early).then(function (res) { if (!res || !res.j) throw new Error("early"); return res; }).catch(function () { return get(1); }) : get(1);
    // First page tells us how many pages there are; fetch the rest at the same time rather than one by one
    return first.then(function (res) {
      var rest = [];
      for (var n = 2; n <= Math.min(res.tp, 8); n++) rest.push(get(n));
      return Promise.all(rest).then(function (more) {
        return more.reduce(function (all, m) { return all.concat(m.j || []); }, res.j || []);
      });
    });
  }
  function parseFA(p) {
    var name = decode(p.name || ""), parts = name.split("|").map(function (x) { return x.trim(); });
    var m = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(name);
    if (!m) return null;
    var pr = p.prices || {}, mu = Math.pow(10, pr.currency_minor_unit == null ? 2 : pr.currency_minor_unit);
    return {
      id: p.id, date: new Date(+m[3], +m[2] - 1, +m[1]), loc: parts.length > 1 ? parts[0] : "",
      price: pr.price ? Math.round(+pr.price / mu) : null,
      inStock: p.is_in_stock !== false && p.is_purchasable !== false,
      low: p.low_stock_remaining || null, url: p.permalink
    };
  }
  function mountDates(root) {
    if (root._fad) return; root._fad = true;
    root.classList.add("nbd"); if (root.getAttribute("data-theme") === "dark") root.classList.add("nbd-dark");
    root.innerHTML = "";
    var search = root.getAttribute("data-search") || "First Aid At Work";
    var must = (root.getAttribute("data-match") || "").split("|").map(function (x) { return x.trim().toLowerCase(); }).filter(Boolean);
    var not = (root.getAttribute("data-exclude") || "").split("|").map(function (x) { return x.trim().toLowerCase(); }).filter(Boolean);
    var base = root.getAttribute("data-endpoint") || "/wp-json/wc/store/v1/products";
    var fb = root.getAttribute("data-fallback") || "#enquire";
    var fallback = fb.charAt(0) === "#" ? fb : abs(fb);
    var fallbackLabel = root.getAttribute("data-fallback-label") || "Ask us about dates";
    var course = root.getAttribute("data-course-label") || "First Aid at Work";
    var step = +(root.getAttribute("data-show") || 8);
    var want = ""; try { want = (new URLSearchParams(location.search).get("location") || "").toLowerCase(); } catch (e) {}
    var state = { loc: "", shown: step }, items = [];

    var bar = el("div", "nbd-bar"); root.appendChild(bar);
    var list = el("div", "nbd-list"); list.setAttribute("aria-live", "polite"); root.appendChild(list);
    var more = el("button", "nbd-more", "Show more dates"); more.type = "button"; root.appendChild(more);
    more.addEventListener("click", function () { state.shown += step; draw(); });
    var locSel = el("select", "nbd-loc"); locSel.setAttribute("aria-label", "Choose a location");
    locSel.addEventListener("change", function () { state.loc = locSel.value; state.shown = step; draw(); });

    function msg(t) {
      list.innerHTML = ""; var p = el("p", "nbd-msg", t + " "); var a = el("a", null, fallbackLabel); a.href = fallback;
      p.appendChild(a); list.appendChild(p); more.style.display = "none";
    }
    (function skeleton() {
      for (var k = 0; k < 4; k++) { var r = el("div", "nbd-row nbd-skel"); ["w1", "w2", "w3", "w4"].forEach(function (w) { r.appendChild(el("div", "nbd-sk " + w)); }); list.appendChild(r); }
      more.style.display = "none";
    })();

    function buildBar() {
      bar.innerHTML = "";
      var locs = items.map(function (i) { return i.loc; }).filter(function (v, k, a) { return v && a.indexOf(v) === k; }).sort();
      locSel.innerHTML = ""; var o = el("option", null, "All locations"); o.value = ""; locSel.appendChild(o);
      locs.forEach(function (l) { var op = el("option", null, l); op.value = l; locSel.appendChild(op); });
      if (want && !state.loc) { for (var i = 0; i < locs.length; i++) if (locs[i].toLowerCase().indexOf(want) > -1) { state.loc = locs[i]; break; } }
      locSel.value = state.loc; bar.appendChild(locSel);
    }
    function draw() {
      var rows = items.filter(function (i) { return !state.loc || i.loc === state.loc; });
      list.innerHTML = "";
      if (!rows.length) { msg("No upcoming dates for this location right now."); return; }
      rows.slice(0, state.shown).forEach(function (i) {
        var r = el("div", "nbd-row");
        var dt = el("div", "nbd-date", i.date.getDate() + " " + MONTHS[i.date.getMonth()] + " " + i.date.getFullYear());
        dt.appendChild(el("span", null, DAYS[i.date.getDay()] + " start")); r.appendChild(dt);
        var w = el("div", "nbd-what"); w.appendChild(el("b", null, course));
        if (i.loc) w.appendChild(document.createTextNode(" in " + i.loc));
        if (i.low) w.appendChild(el("span", "nbd-low", "Only " + i.low + " place" + (i.low === 1 ? "" : "s") + " left"));
        r.appendChild(w);
        r.appendChild(el("div", "nbd-price", i.price != null ? money(i.price) + " + VAT" : ""));
        var a = el("a", "nbx-btn or", "Book now"); a.href = i.url;
        a.addEventListener("click", function () { try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "fa_date_click", fa_course: course, fa_location: i.loc, fa_date: i.date.toISOString().slice(0, 10) }); } catch (e) {} });
        r.appendChild(a); list.appendChild(r);
      });
      more.style.display = rows.length > state.shown ? "" : "none";
    }
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var shown = false, settled = false;
    setTimeout(function () { if (!settled && !shown && root.isConnected) msg("The dates are taking longer than usual to load."); }, 12000);
    function show(data) {
      items = (data || []).filter(function (p) {
        var n = decode(p.name || "").toLowerCase();
        return must.every(function (w) { return n.indexOf(w) > -1; }) && !not.some(function (w) { return n.indexOf(w) > -1; });
      }).map(parseFA).filter(function (i) { return i && i.inStock && i.date >= today; })
        .sort(function (a, b) { return a.date - b.date; });
      if (!items.length) { msg("No upcoming dates are listed online right now."); return; }
      shown = true; buildBar(); draw();
    }
    var cat = root.getAttribute("data-category") || "";
    var key = base + "|" + (cat ? "cat:" + cat : search), cached = cacheGet(key);
    if (cached && cached.d.length) show(cached.d); else cached = null;
    if (!cached || Date.now() - cached.t >= CACHE_MS) {
      fetchPages(base, { cat: cat, search: search }).then(function (d) { settled = true; if (d.length) cacheSet(key, d); show(d); })
        .catch(function () { settled = true; if (!shown) msg("We couldn't load the dates just now."); });
    } else settled = true;
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-finder"), mount);
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-dates"), mountDates);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  if (window.MutationObserver) new MutationObserver(function () {
    if (!document.getElementById("fa-css")) injectCss();
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-finder"), function (r) { if (!r._fa || !r.firstChild) { r._fa = false; mount(r); } });
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-dates"), function (r) { if (!r._fad) mountDates(r); });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

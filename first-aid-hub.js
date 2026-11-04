/*!
 * CST Training First Aid hub (v7: adds the hub booking panel; v6: hide cancelled courses, only lists published, visible, in-stock dates)
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
 * Booking panel (hub):
 *   <div class="cst-fa-book"></div>   (optional data-course="efaw" to start on Emergency First Aid at Work)
 *   Course, venue and date from the same live dates, a people counter capped at places left, and Book now,
 *   which adds the chosen date to the basket (?add-to-cart=ID&quantity=N).
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

  // ---------- Booking panel (v7): course, venue, date, people, Book now ----------
  var BCOURSES = [
    { k: "faw", name: "First Aid at Work", days: 3, len: "3 days",
      blurb: "For construction, warehousing and higher hazard workplaces, or more than 50 people",
      cat: "level-3-award-in-first-aid-at-work-3-day-course-rqf", must: ["first aid at work"], not: ["emergency", "requal"],
      page: "/level-3-award-in-first-aid-at-work-3-day-course-rqf/" },
    { k: "efaw", name: "Emergency First Aid at Work", days: 1, len: "1 day",
      blurb: "For offices, shops and other lower hazard workplaces",
      cat: "emergency-first-aid-work", must: ["emergency first aid at work"], not: ["requal"],
      page: "/emergency-first-aid-work/" }
  ];
  var BMON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var BDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var STEP = (window.innerWidth < 600 ? 6 : 9), MAXP = 12;

  function bEsc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function bMoney(n) { return "\u00a3" + Math.round(n).toLocaleString("en-GB"); }
  function fmt(d) { return BDAY[d.getDay()] + " " + d.getDate() + " " + BMON[d.getMonth()]; }

  var CSS = [
    ".fab{--nv:#1d2560;--or:#ff8c04;--bl:#4c6bd8;--sf:#f4f5f9;--bd:#dcdfea;--tx:#1b1f33;--mu:#565c75;color:var(--tx);font-size:16px;line-height:1.5;text-align:left;display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:28px;align-items:start;position:relative;z-index:20}",
    ".fab *{box-sizing:border-box}",
    "@media(max-width:900px){.fab{grid-template-columns:1fr}}",
    ".fab-main{background:#fff;border-radius:18px;padding:26px;box-shadow:0 10px 30px rgba(29,37,96,.10)}",
    ".fab-hd{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin:0 0 14px}",
    ".fab-hd h3{display:flex;align-items:center;gap:12px;margin:0!important;font-size:20px!important;line-height:1.3!important;color:var(--nv)!important;font-weight:700}",
    ".fab-n{flex:0 0 30px;width:30px;height:30px;border-radius:50%;background:var(--nv);color:#fff;font-size:14px;font-weight:700;display:inline-flex;align-items:center;justify-content:center}",
    ".fab-hd small,.fab-hd a{font-size:14px;color:var(--mu)}",
    ".fab-hd a{color:var(--nv)!important;font-weight:700;text-decoration:underline}",
    ".fab-sec+.fab-sec{margin-top:28px}",
    ".fab-courses{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:12px}",
    ".fab-c{border:2px solid var(--bd);border-radius:14px;padding:16px 18px;cursor:pointer;background:#fff;position:relative;z-index:21;user-select:none;transition:border-color .15s,background .15s}",
    ".fab-c b{display:block;font-size:18px;line-height:1.25;color:var(--nv)}",
    ".fab-c .p{display:block;margin:6px 0;font-weight:700;color:#b35f00;font-size:15px}",
    ".fab-c span.d{display:block;font-size:14px;color:var(--mu)}",
    ".fab-c:hover{border-color:#b9bfd6}",
    ".fab-c.on{border-color:var(--or);background:#fff8ee}",
    ".fab-pills{display:flex;flex-wrap:wrap;gap:10px}",
    ".fab-pill{border:2px solid var(--bd);border-radius:30px;padding:9px 18px;font-weight:700;font-size:15px;color:var(--nv);background:#fff;cursor:pointer;position:relative;z-index:21;user-select:none;transition:all .15s}",
    ".fab-pill:hover{border-color:#b9bfd6}",
    ".fab-pill.on{background:var(--nv);border-color:var(--nv);color:#fff}",
    ".fab-pill.ask{border-style:dashed;color:var(--mu);text-decoration:none!important}",
    ".fab-dates{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,180px),1fr));gap:12px}",
    "@media(max-width:600px){.fab-dates{grid-template-columns:1fr 1fr;gap:10px}.fab-d{padding:12px}.fab-d b{font-size:16px}.fab-main{padding:18px}}",
    ".fab-d{border:2px solid var(--bd);border-radius:14px;padding:14px 16px;cursor:pointer;background:#fff;position:relative;z-index:21;user-select:none;transition:border-color .15s,background .15s}",
    ".fab-d b{display:block;font-size:18px;color:var(--nv);line-height:1.25}",
    ".fab-d .m{display:block;font-size:14px;color:var(--mu);margin-top:2px}",
    ".fab-d .s{display:block;font-size:13px;font-weight:700;margin-top:8px;color:#2e7d4f}",
    ".fab-d .s.low{color:#b35f00}",
    ".fab-d:hover{border-color:#b9bfd6}",
    ".fab-d.on{border-color:var(--or);background:#fff8ee}",
    ".fab-more{display:block;width:fit-content;margin:16px auto 0;font:inherit;font-weight:700;background:#fff;border:2px solid var(--nv);color:var(--nv);border-radius:30px;padding:10px 24px;cursor:pointer;position:relative;z-index:21}",
    ".fab-msg{background:var(--sf);border:1px dashed var(--bd);border-radius:12px;padding:18px;color:var(--mu);text-align:center}",
    ".fab-msg a{color:var(--nv)!important;font-weight:700}",
    ".fab-sk{height:74px;border-radius:14px;background:linear-gradient(90deg,#e7e9f3 25%,#f4f5f9 50%,#e7e9f3 75%);background-size:200% 100%;animation:fabsk 1.2s infinite linear}",
    "@keyframes fabsk{to{background-position:-200% 0}}",
    ".fab-sum{background:var(--nv);color:#fff;border-radius:18px 18px 40px 18px;padding:26px;position:sticky;top:110px}",
    "@media(max-width:900px){.fab-sum{position:static}}",
    ".fab-sum h3{color:#fff!important;font-size:22px!important;margin:0 0 14px!important}",
    ".fab-row{display:flex;justify-content:space-between;gap:12px;padding:7px 0;font-size:15px}",
    ".fab-row span{color:#c3c9e6}",
    ".fab-row b{text-align:right}",
    ".fab-ppl{display:inline-flex;align-items:center;gap:10px}",
    ".fab-ppl i{font-style:normal;width:30px;height:30px;border-radius:50%;border:2px solid rgba(255,255,255,.4);display:inline-flex;align-items:center;justify-content:center;font-weight:700;cursor:pointer;user-select:none;position:relative;z-index:21}",
    ".fab-ppl i.off{opacity:.35;cursor:default}",
    ".fab-tot{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid rgba(255,255,255,.2);margin-top:12px;padding-top:16px}",
    ".fab-tot span{color:#c3c9e6}",
    ".fab-tot b{font-size:34px;line-height:1}",
    ".fab-tot b small{font-size:13px;font-weight:400;color:#c3c9e6;margin-left:6px}",
    ".fab-go{display:block;text-align:center;background:var(--or);color:var(--nv)!important;border-radius:12px;padding:15px;font-weight:700;font-size:17px;text-decoration:none!important;margin:18px 0 12px;position:relative;z-index:21;transition:transform .15s}",
    ".fab-go:hover{transform:translateY(-1px)}",
    ".fab-go.off{background:#5a6290;color:#c3c9e6!important;pointer-events:none}",
    ".fab-sum p{font-size:14px;color:#c3c9e6;margin:0 0 10px!important}",
    ".fab-sum a.l{color:#fff!important;text-decoration:underline;font-weight:700}",
    ".fab-team{background:rgba(255,255,255,.08);border-radius:12px;padding:14px 16px;margin-top:14px;font-size:14px;color:#e6e9f7}",
    ".fab-c:focus-visible,.fab-pill:focus-visible,.fab-d:focus-visible,.fab-ppl i:focus-visible{outline:3px solid var(--or);outline-offset:2px}"
  ].join("");

  function injectBookCss() {
    if (document.getElementById("fab-css")) return;
    var s = document.createElement("style"); s.id = "fab-css"; s.textContent = CSS; document.head.appendChild(s);
  }

  /* ---------- data: same Store API call and cache as the course page date lists ---------- */
  var BASE = "/wp-json/wc/store/v1/products";
  function fetchCat(cat) {
    var key = BASE + "|cat:" + cat, c = cacheGet(key);
    if (c && c.d.length && Date.now() - c.t < CACHE_MS) return Promise.resolve(c.d);
    return fetchPages(BASE, { cat: cat }).then(function (d) { if (d.length) cacheSet(key, d); return d; })
      .catch(function (e) { if (c && c.d.length) return c.d; throw e; });
  }
  function parse(course, list) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    return (list || []).filter(function (p) {
      var n = decode(p.name || "").toLowerCase();
      return course.must.every(function (w) { return n.indexOf(w) > -1; }) && !course.not.some(function (w) { return n.indexOf(w) > -1; });
    }).map(function (p) {
      var name = decode(p.name || ""), parts = name.split("|").map(function (x) { return x.trim(); });
      var m = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(name); if (!m) return null;
      var pr = p.prices || {}, mu = Math.pow(10, pr.currency_minor_unit == null ? 2 : pr.currency_minor_unit);
      return { id: p.id, date: new Date(+m[3], +m[2] - 1, +m[1]), loc: parts.length > 1 ? parts[0] : "",
        price: pr.price ? +pr.price / mu : null, ok: p.is_in_stock !== false && p.is_purchasable !== false,
        low: p.low_stock_remaining || null, url: p.permalink };
    }).filter(function (i) { return i && i.ok && i.loc && i.date >= today; })
      .sort(function (a, b) { return a.date - b.date; });
  }

  /* ---------- widget ---------- */
  var ROOTS = [];
  function mountBook(root) {
    if (root._fab) return; root._fab = true; injectBookCss();
    var st = { course: root.getAttribute("data-course") === "efaw" ? "efaw" : "faw", loc: "", id: null, ppl: 1, shown: STEP, data: {}, err: false, loading: true };
    var want = ""; try { want = (new URLSearchParams(location.search).get("location") || "").toLowerCase(); } catch (e) {}
    root._st = st; root._want = want; ROOTS.push(root);
    render(root);
    Promise.all(BCOURSES.map(function (c) {
      return fetchCat(c.cat).then(function (d) { st.data[c.k] = parse(c, d); }).catch(function () { st.data[c.k] = null; });
    })).then(function () {
      st.loading = false; st.err = !st.data.faw && !st.data.efaw;
      pickDefaults(root); render(root);
    });
  }
  function course(k) { return BCOURSES[k === "efaw" ? 1 : 0]; }
  function items(st) { return st.data[st.course] || []; }
  function locs(st) {
    var c = {}; items(st).forEach(function (i) { c[i.loc] = (c[i.loc] || 0) + 1; });
    return Object.keys(c).sort(function (a, b) { return c[b] - c[a] || a.localeCompare(b); });
  }
  function pickDefaults(root) {
    var st = root._st, L = locs(st);
    if (!L.length) { st.loc = ""; st.id = null; return; }
    if (L.indexOf(st.loc) < 0) {
      st.loc = L[0];
      if (root._want) for (var i = 0; i < L.length; i++) if (L[i].toLowerCase().indexOf(root._want) > -1) { st.loc = L[i]; break; }
    }
    var at = items(st).filter(function (x) { return x.loc === st.loc; });
    if (!at.some(function (x) { return x.id === st.id; })) st.id = at.length ? at[0].id : null;
    var sel = current(st); if (sel && sel.low) st.ppl = Math.min(st.ppl, sel.low);
  }
  function current(st) { var id = st.id; return items(st).filter(function (x) { return x.id === id; })[0] || null; }
  function fromPrice(k, st) {
    var p = (st.data[k] || []).map(function (i) { return i.price; }).filter(function (x) { return x != null; });
    return p.length ? Math.min.apply(null, p) : null;
  }

  function render(root) {
    var st = root._st, c = course(st.course), sel = current(st);
    var h = '<div class="fab-main">';
    // 1 course
    h += '<div class="fab-sec"><div class="fab-hd"><h3><span class="fab-n">1</span>Choose your course</h3><a href="#finder">Not sure which? Use the finder</a></div><div class="fab-courses">';
    BCOURSES.forEach(function (x) {
      var fp = fromPrice(x.k, st);
      h += '<div class="fab-c' + (x.k === st.course ? " on" : "") + '" role="button" tabindex="0" aria-pressed="' + (x.k === st.course) + '" data-act="course" data-v="' + x.k + '"><b>' + bEsc(x.name) + '</b><span class="p">' + bEsc(x.len) + (fp != null ? " · " + (x.k === "faw" ? "from " : "") + bMoney(fp) + " + VAT" : "") + '</span><span class="d">' + bEsc(x.blurb) + "</span></div>";
    });
    h += "</div></div>";
    // 2 venue
    h += '<div class="fab-sec"><div class="fab-hd"><h3><span class="fab-n">2</span>Choose a venue</h3></div>';
    if (st.loading) h += '<div class="fab-pills"><div class="fab-sk" style="height:42px;width:100%"></div></div>';
    else if (st.err || !items(st).length) h += '<div class="fab-msg">No ' + bEsc(c.name) + ' dates are listed online right now. <a href="#enquire">Ask us about dates</a></div>';
    else {
      h += '<div class="fab-pills">';
      locs(st).forEach(function (l) { h += '<div class="fab-pill' + (l === st.loc ? " on" : "") + '" role="button" tabindex="0" aria-pressed="' + (l === st.loc) + '" data-act="loc" data-v="' + bEsc(l) + '">' + bEsc(l) + "</div>"; });
      h += '<a class="fab-pill ask" href="#enquire">Another town?</a></div>';
    }
    h += "</div>";
    // 3 date
    var at = items(st).filter(function (x) { return x.loc === st.loc; });
    h += '<div class="fab-sec"><div class="fab-hd"><h3><span class="fab-n">3</span>Pick a date</h3>' +
      (at.length ? "<small>" + at.length + " date" + (at.length === 1 ? "" : "s") + " at " + bEsc(st.loc) + "</small>" : "") + "</div>";
    if (st.loading) { h += '<div class="fab-dates">'; for (var k = 0; k < 6; k++) h += '<div class="fab-sk"></div>'; h += "</div>"; }
    else if (at.length) {
      h += '<div class="fab-dates">';
      at.slice(0, st.shown).forEach(function (i) {
        var s = i.low ? '<span class="s low">Only ' + i.low + " place" + (i.low === 1 ? "" : "s") + " left</span>" : '<span class="s">Places available</span>';
        h += '<div class="fab-d' + (i.id === st.id ? " on" : "") + '" role="button" tabindex="0" aria-pressed="' + (i.id === st.id) + '" data-act="date" data-v="' + i.id + '"><b>' + fmt(i.date) + " " + i.date.getFullYear() + '</b><span class="m">' + bEsc(c.len) + (i.price != null ? " · " + bMoney(i.price) + " + VAT" : "") + "</span>" + s + "</div>";
      });
      h += "</div>";
      if (at.length > st.shown) h += '<div class="fab-more" role="button" tabindex="0" data-act="more">Show more dates</div>';
    }
    h += "</div></div>";

    // summary
    var tot = sel && sel.price != null ? sel.price * st.ppl : null;
    var maxp = sel && sel.low ? Math.min(MAXP, sel.low) : MAXP;
    h += '<aside class="fab-sum"><h3>Your booking</h3>' +
      '<div class="fab-row"><span>Course</span><b>' + bEsc(c.name) + "</b></div>" +
      '<div class="fab-row"><span>Venue</span><b>' + (st.loc ? bEsc(st.loc) : "Choose a venue") + "</b></div>" +
      '<div class="fab-row"><span>Date</span><b>' + (sel ? fmt(sel.date) + " · " + bEsc(c.len) : "Pick a date") + "</b></div>" +
      '<div class="fab-row"><span>People</span><b class="fab-ppl"><i role="button" tabindex="0" aria-label="One fewer person" data-act="minus" class="' + (st.ppl <= 1 ? "off" : "") + '">&minus;</i>' + st.ppl +
      '<i role="button" tabindex="0" aria-label="One more person" data-act="plus" class="' + (st.ppl >= maxp ? "off" : "") + '">+</i></b></div>' +
      '<div class="fab-tot"><span>Total</span><b>' + (tot != null ? bMoney(tot) : "\u00a3 0") + "<small>+ VAT</small></b></div>";
    var go = sel ? sel.url + (sel.url.indexOf("?") > -1 ? "&" : "?") + "add-to-cart=" + sel.id + "&quantity=" + st.ppl : "#";
    h += '<a class="fab-go' + (sel ? "" : " off") + '" data-act="go" href="' + bEsc(go) + '">' + (sel ? "Book now" : "Choose a date to book") + "</a>" +
      '<p><a class="l" href="' + abs(c.page) + '">What\u2019s on the ' + bEsc(c.name) + " course</a></p>" +
      "<p>Free date transfer up to five working days before. If we move a course, moving with us is always free.</p>" +
      '<div class="fab-team">Training more than 12, or want us to come to you? We can run the course at your premises. <a class="l" href="#enquire">Ask for a quote</a></div>' +
      "</aside>";
    root.innerHTML = '<div class="fab">' + h + "</div>";
  }

  function act(el) {
    var root = el.closest(".cst-fa-book"); if (!root || !root._st) return;
    var st = root._st, a = el.getAttribute("data-act"), v = el.getAttribute("data-v");
    if (a === "course" && v !== st.course) { st.course = v; st.shown = STEP; st.id = null; pickDefaults(root); }
    else if (a === "loc") { st.loc = v; st.shown = STEP; st.id = null; pickDefaults(root); }
    else if (a === "date") {
      st.id = +v; var s = current(st); if (s && s.low) st.ppl = Math.min(st.ppl, s.low);
      if (window.innerWidth < 900) setTimeout(function () {
        var sum = root.querySelector(".fab-sum"); if (!sum) return;
        var y = sum.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - 90;
        try { window.scrollTo({ top: y, behavior: "smooth" }); } catch (e) { window.scrollTo(0, y); }
      }, 60);
    }
    else if (a === "more") st.shown += STEP;
    else if (a === "minus") st.ppl = Math.max(1, st.ppl - 1);
    else if (a === "plus") { var c = current(st), mx = c && c.low ? Math.min(MAXP, c.low) : MAXP; st.ppl = Math.min(mx, st.ppl + 1); }
    else if (a === "go") {
      if (!current(st)) return;
      try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "fa_hub_book", fa_course: course(st.course).name, fa_location: st.loc, fa_people: st.ppl }); } catch (e) {}
      window.location.href = el.href; return;
    }
    render(root);
  }

  /* Events: delegated on window in the capture phase, with a position check as a backup, so theme
     layers or other scripts on the page can't swallow the taps (the issue seen on the electrical hub). */
  function hit(x, y) {
    var all = document.querySelectorAll(".cst-fa-book [data-act]"), best = null, area = Infinity;
    for (var i = 0; i < all.length; i++) {
      var r = all[i].getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom && r.width * r.height < area) { best = all[i]; area = r.width * r.height; }
    }
    return best;
  }
  var last = 0;
  function onPoint(e) {
    var t = e.target && e.target.closest ? e.target.closest(".cst-fa-book [data-act]") : null;
    if (!t) { var pt = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : e; if (pt.clientX != null) t = hit(pt.clientX, pt.clientY); }
    if (!t) return;
    if (e.type === "click" && e.cancelable) e.preventDefault();
    var now = Date.now(); if (now - last < 350) return; last = now;
    act(t);
  }
  ["click", "pointerup"].forEach(function (ev) { window.addEventListener(ev, onPoint, true); });
  window.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var t = e.target && e.target.closest ? e.target.closest(".cst-fa-book [data-act]") : null;
    if (t) { e.preventDefault(); act(t); }
  }, true);

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-finder"), mount);
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-book"), mountBook);
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-dates"), mountDates);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  if (window.MutationObserver) new MutationObserver(function () {
    if (!document.getElementById("fa-css")) injectCss();
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-finder"), function (r) { if (!r._fa || !r.firstChild) { r._fa = false; mount(r); } });
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-dates"), function (r) { if (!r._fad) mountDates(r); });
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-book"), function (r) { if (!r._fab) mountBook(r); });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

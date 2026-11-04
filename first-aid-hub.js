/*!
 * CST Training First Aid hub (v10: links point to the new course pages; v9: postcode search sorts dates by nearest venue; v8: venue dropdown, location on every date, fixes titles with the course name first; v7: hub booking panel; v6: hide cancelled courses, only lists published, visible, in-stock dates)
 * Host on GitHub Pages (cst-advisor repo), load with ?v=N cache buster.
 * Load AFTER nebosh-hub.js, which supplies the shared nbx/nbi page CSS.
 * Mount point:
 *   <div class="cst-fa-finder"
 *        data-faw-url="/first-aid-at-work-level-3/"
 *        data-efaw-url="/emergency-first-aid-at-work/"
 *        data-faw-dates="/first-aid-at-work-level-3/#dates"
 *        data-efaw-dates="/emergency-first-aid-at-work/#dates"
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
        url: abs(root.getAttribute("data-faw-url") || "/first-aid-at-work-level-3/"),
        dates: abs(root.getAttribute("data-faw-dates") || "/first-aid-at-work-level-3/#dates")
      },
      efaw: {
        name: "Emergency First Aid at Work", length: "1 day",
        price: +(root.getAttribute("data-efaw-price") || 95),
        url: abs(root.getAttribute("data-efaw-url") || "/emergency-first-aid-at-work/"),
        dates: abs(root.getAttribute("data-efaw-dates") || "/emergency-first-aid-at-work/#dates")
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
  /* Location is the title part that isn't the course name, awarding body or date. Titles differ:
     "London (Dartford) | Level 3 First Aid At Work | Highfields Approved | 09-12-2026" or
     "Level 3 Emergency First Aid At Work | Manchester | 06-01-2027". */
  function locOf(name) {
    var parts = name.split("|").map(function (x) { return x.trim(); });
    for (var i = 0; i < parts.length; i++) {
      var s = parts[i];
      if (s && !/first aid|highfield|approved|\blevel\b|\brqf\b|requal|course|\d{1,2}-\d{1,2}-\d{4}/i.test(s)) return s;
    }
    return "";
  }
  function parseFA(p) {
    var name = decode(p.name || ""), parts = name.split("|").map(function (x) { return x.trim(); });
    var m = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(name);
    if (!m) return null;
    var pr = p.prices || {}, mu = Math.pow(10, pr.currency_minor_unit == null ? 2 : pr.currency_minor_unit);
    return {
      id: p.id, date: new Date(+m[3], +m[2] - 1, +m[1]), loc: locOf(name),
      price: pr.price ? Math.round(+pr.price / mu) : null,
      inStock: p.is_in_stock !== false && p.is_purchasable !== false,
      low: p.low_stock_remaining || null, url: p.permalink
    };
  }
  // ---------- Postcode search helpers (v9, same as nebosh-hub v33) ----------
  var PLACES = {
    "dartford": [51.4462, 0.2196], "london": [51.5074, -0.1278], "central london": [51.5074, -0.1278], "west london": [51.4975, -0.22],
    "bexley": [51.4415, 0.1488], "chelmsford": [51.7356, 0.4685], "birmingham": [52.4862, -1.8904], "coleshill": [52.4986, -1.7069],
    "manchester": [53.4808, -2.2426], "stockport": [53.4106, -2.1575], "liverpool": [53.4084, -2.9916], "glasgow": [55.8642, -4.2518],
    "edinburgh": [55.9533, -3.1883], "bristol": [51.4545, -2.5879], "exeter": [50.7184, -3.5339], "bridgwater": [51.1279, -2.999],
    "southampton": [50.9097, -1.4044], "brighton": [50.8225, -0.1372], "leeds": [53.8008, -1.5491], "newcastle": [54.9783, -1.6178],
    "milton keynes": [52.0406, -0.7594], "cardiff": [51.4816, -3.1791], "nottingham": [52.9548, -1.1581], "leicester": [52.6369, -1.1398],
    "sheffield": [53.3811, -1.4701], "plymouth": [50.3755, -4.1427], "norwich": [52.6309, 1.2974], "cambridge": [52.2053, 0.1218],
    "oxford": [51.752, -1.2577], "reading": [51.4543, -0.9781], "portsmouth": [50.8198, -1.088], "swindon": [51.5558, -1.7797],
    "ipswich": [52.0567, 1.1482], "peterborough": [52.5695, -0.2405], "coventry": [52.4068, -1.5197], "hull": [53.7676, -0.3274],
    "york": [53.959, -1.0815], "preston": [53.7632, -2.7031], "stoke": [53.0027, -2.1794], "middlesbrough": [54.5742, -1.235],
    "aberdeen": [57.1497, -2.0943], "belfast": [54.5973, -5.9301], "swansea": [51.6214, -3.9436], "maidstone": [51.2724, 0.529],
    "basildon": [51.5761, 0.4887], "luton": [51.8787, -0.42], "northampton": [52.2405, -0.9027], "gloucester": [51.8642, -2.2382]
  };
  var NBD_TRACK = "https://script.google.com/macros/s/AKfycbwEbK2DSXtjCHWMfJbe4yabGTk8KRJI3b0Lf45wKYkFYwyx7D495YCXjUS774oG_LSe/exec";
  var PLACE_CACHE = {};
  function miles(a, b) {
    var R = 3958.8, r = Math.PI / 180, dLat = (b[0] - a[0]) * r, dLon = (b[1] - a[1]) * r;
    var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  }
  function geocodePostcode(pc) {
    var clean = pc.trim().replace(/\s+/g, "");
    return fetch("https://api.postcodes.io/postcodes/" + encodeURIComponent(pc.trim())).then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.status === 200 && d.result) return { ll: [d.result.latitude, d.result.longitude], label: d.result.postcode };
        var out = clean.match(/^[A-Z]{1,2}[0-9][0-9A-Z]?/i); if (!out) throw new Error("not found");
        return fetch("https://api.postcodes.io/outcodes/" + encodeURIComponent(out[0])).then(function (r) { return r.json(); })
          .then(function (d2) { if (d2.status === 200 && d2.result) return { ll: [d2.result.latitude, d2.result.longitude], label: d2.result.outcode }; throw new Error("not found"); });
      });
  }
  function placeCoords(name) {
    var key = (name || "").toLowerCase().trim();
    if (!key) return Promise.resolve(null);
    if (PLACE_CACHE[key] !== undefined) return Promise.resolve(PLACE_CACHE[key]);
    var tries = [key].concat((key.match(/\(([^)]+)\)/) || [])[1] ? [key.match(/\(([^)]+)\)/)[1].trim()] : [], key.replace(/\(.*?\)/g, "").trim(), key.split(/[,\-]/)[0].trim());
    for (var i = 0; i < tries.length; i++) if (PLACES[tries[i]]) return Promise.resolve(PLACE_CACHE[key] = PLACES[tries[i]]);
    try { var saved = JSON.parse(localStorage.getItem("nbdplace:" + key) || "null"); if (saved) return Promise.resolve(PLACE_CACHE[key] = saved); } catch (e) {}
    var q = tries[1] || tries[0];
    return fetch("https://api.postcodes.io/places?q=" + encodeURIComponent(q) + "&limit=1").then(function (r) { return r.json(); })
      .then(function (d) {
        var p = d && d.result && d.result[0]; var ll = p ? [p.latitude, p.longitude] : null;
        PLACE_CACHE[key] = ll; try { if (ll) localStorage.setItem("nbdplace:" + key, JSON.stringify(ll)); } catch (e) {}
        return ll;
      }).catch(function () { return (PLACE_CACHE[key] = null); });
  }
  function miLabel(n) { n = Math.round(n); return n < 1 ? "under 1 mile" : n + (n === 1 ? " mile" : " miles"); }
  function trackPc(pc, loc) {
    try { var i = new Image(); i.src = NBD_TRACK + "?postcode=" + encodeURIComponent(pc) + "&page=" + encodeURIComponent(location.href) + "&region=" + encodeURIComponent("First Aid dates") + "&location=" + encodeURIComponent(loc || ""); } catch (e) {}
  }

  function injectPcCss() {
    if (document.getElementById("fad-pc-css")) return;
    var st = document.createElement("style"); st.id = "fad-pc-css";
    st.textContent =
    ".nbd-pc{display:inline-flex;align-items:center;gap:6px;background:#fff;border:2px solid #dcdfea;border-radius:30px;padding:3px 3px 3px 14px}" +
    ".nbd-pc input{font:inherit;font-size:15px;font-weight:700;color:#1d2560;border:0!important;outline:0;background:transparent!important;width:120px;padding:6px 0!important;margin:0!important;box-shadow:none!important;text-transform:uppercase;height:auto!important}" +
    ".nbd-pc input::placeholder{color:#8a8fb0;font-weight:400;text-transform:none}" +
    ".nbd-pc button{font:inherit;font-weight:700;font-size:14px;border:0;border-radius:30px;background:#ff8c04!important;color:#fff!important;padding:8px 16px;cursor:pointer;white-space:nowrap}" +
    ".nbd-pc button[disabled]{opacity:.6;cursor:wait}" +
    ".nbd-pc:focus-within{border-color:#ff8c04}" +
    ".nbd-near{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 12px;margin:-6px 0 16px;font-size:15px;color:#1b1f33;text-align:center}" +
    ".nbd-near b{color:#1d2560}" +
    ".nbd-near button{font:inherit;font-size:14px;font-weight:700;background:none!important;border:0;color:#1d2560!important;text-decoration:underline;cursor:pointer;padding:0}" +
    ".nbd-near.err{color:#c0392b;font-weight:700}" +
    ".nbd-dist{display:inline-block;margin-left:8px;font-size:13px;font-weight:700;color:#1d2560;background:#eef1ff;border-radius:30px;padding:2px 10px;white-space:nowrap}" +
    ".nbd.nbd-dark .nbd-near,.nbd.nbd-dark .nbd-near b,.nbd.nbd-dark .nbd-near button{color:#fff!important}" +
    ".nbd.nbd-dark .nbd-near.err{color:#ffb3a8!important}" +
    "@media(max-width:760px){.nbd-pc{width:100%;max-width:360px}.nbd-pc input{flex:1;width:auto}}";
    document.head.appendChild(st);
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
    var state = { loc: "", shown: step, near: null }, items = [], dist = {};
    injectPcCss();

    var bar = el("div", "nbd-bar"); root.appendChild(bar);
    var list = el("div", "nbd-list"); list.setAttribute("aria-live", "polite"); root.appendChild(list);
    var more = el("button", "nbd-more", "Show more dates"); more.type = "button"; root.appendChild(more);
    more.addEventListener("click", function () { state.shown += step; draw(); });
    var locSel = el("select", "nbd-loc"); locSel.setAttribute("aria-label", "Choose a location");
    locSel.addEventListener("change", function () { state.loc = locSel.value; state.shown = step; draw(); });

    var pcBox = el("form", "nbd-pc"); pcBox.setAttribute("role", "search"); pcBox.noValidate = true;
    var pcIn = el("input"); pcIn.type = "text"; pcIn.placeholder = "Your postcode"; pcIn.maxLength = 8; pcIn.autocomplete = "postal-code"; pcIn.setAttribute("aria-label", "Enter your postcode to find your nearest venue");
    var pcBtn = el("button", null, "Find nearest"); pcBtn.type = "submit";
    pcBox.appendChild(pcIn); pcBox.appendChild(pcBtn);
    var near = el("div", "nbd-near"); near.style.display = "none"; root.insertBefore(near, list);
    function nearNote(node, err) {
      near.innerHTML = ""; near.className = "nbd-near" + (err ? " err" : "");
      if (!node) { near.style.display = "none"; return; }
      near.style.display = "";
      if (err) { near.textContent = node; return; }
      near.appendChild(node);
      var c = el("button", null, "Clear"); c.type = "button";
      c.addEventListener("click", function () { state.near = null; pcIn.value = ""; nearNote(""); draw(); });
      near.appendChild(c);
    }
    pcBox.addEventListener("submit", function (e) {
      e.preventDefault();
      var pc = pcIn.value.trim();
      if (pc.length < 2) { nearNote("Please enter a valid UK postcode.", true); return; }
      pcBtn.disabled = true; pcBtn.textContent = "Searching...";
      geocodePostcode(pc).then(function (g) {
        var locs = items.map(function (i) { return i.loc; }).filter(function (v, k, a) { return v && a.indexOf(v) === k; });
        return Promise.all(locs.map(function (l) { return placeCoords(l).then(function (ll) { dist[l] = ll ? miles(g.ll, ll) : Infinity; }); }))
          .then(function () {
            state.near = g; state.loc = ""; locSel.value = ""; state.shown = step;
            var best = locs.filter(function (l) { return isFinite(dist[l]); }).sort(function (a, b) { return dist[a] - dist[b]; })[0];
            var t = document.createElement("span");
            if (best) { t.appendChild(document.createTextNode("Dates nearest to ")); t.appendChild(el("b", null, g.label)); t.appendChild(document.createTextNode(". Closest venue: ")); t.appendChild(el("b", null, best + ", " + miLabel(dist[best]))); }
            else t.appendChild(document.createTextNode("Showing dates for " + g.label + "."));
            nearNote(t); trackPc(g.label, best || "");
            try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "fa_postcode_search", fa_course: course, fa_location: best || "" }); } catch (err) {}
            draw();
          });
      }).catch(function () { nearNote("Sorry, we couldn't find that postcode. Please check it and try again.", true); })
        .then(function () { pcBtn.disabled = false; pcBtn.textContent = "Find nearest"; });
    });

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
      if (locs.length > 1) bar.appendChild(pcBox);
    }
    function draw() {
      var rows = items.filter(function (i) { return !state.loc || i.loc === state.loc; });
      list.innerHTML = "";
      if (!rows.length) { msg("No upcoming dates for this location right now."); return; }
      if (state.near && !state.loc) rows = rows.slice().sort(function (a, b) {
        var da = dist[a.loc], db = dist[b.loc]; da = da == null ? Infinity : da; db = db == null ? Infinity : db;
        return Math.round(da) - Math.round(db) || a.date - b.date;
      });
      rows.slice(0, state.shown).forEach(function (i) {
        var r = el("div", "nbd-row");
        var dt = el("div", "nbd-date", i.date.getDate() + " " + MONTHS[i.date.getMonth()] + " " + i.date.getFullYear());
        dt.appendChild(el("span", null, DAYS[i.date.getDay()] + " start")); r.appendChild(dt);
        var w = el("div", "nbd-what"); w.appendChild(el("b", null, course));
        if (i.loc) w.appendChild(document.createTextNode(" in " + i.loc));
        if (state.near && isFinite(dist[i.loc])) w.appendChild(el("span", "nbd-dist", miLabel(dist[i.loc]).replace(/^u/, "U") + " away"));
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
      page: "/first-aid-at-work-level-3/" },
    { k: "efaw", name: "Emergency First Aid at Work", days: 1, len: "1 day",
      blurb: "For offices, shops and other lower hazard workplaces",
      cat: "emergency-first-aid-work", must: ["emergency first aid at work"], not: ["requal"],
      page: "/emergency-first-aid-at-work/" }
  ];
  var BMON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var BDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var STEP = (window.innerWidth < 600 ? 6 : 9), MAXP = 12;

  function bEsc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function bMoney(n) { return "\u00a3" + Math.round(n).toLocaleString("en-GB"); }
  function fmt(d) { return BDAY[d.getDay()] + " " + d.getDate() + " " + BMON[d.getMonth()]; }

  var BCSS = [
    ".fab{--nv:#1d2560;--or:#ff8c04;--bl:#4c6bd8;--sf:#f4f5f9;--bd:#dcdfea;--tx:#1b1f33;--mu:#565c75;color:var(--tx);font-size:16px;line-height:1.5;text-align:left;display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:28px;align-items:start;position:relative;z-index:20}",
    ".fab *{box-sizing:border-box}",
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
    ".fab-selwrap{position:relative;max-width:420px}",
    ".fab-sel{-webkit-appearance:none;appearance:none;width:100%;font:inherit;font-size:16px;font-weight:700;color:var(--nv);background:#fff;border:2px solid var(--bd);border-radius:12px;padding:13px 44px 13px 16px;cursor:pointer;position:relative;z-index:21}",
    ".fab-sel:focus{outline:3px solid var(--or);outline-offset:2px;border-color:var(--or)}",
    ".fab-selwrap:after{content:'';position:absolute;right:18px;top:50%;width:9px;height:9px;border-right:2px solid var(--nv);border-bottom:2px solid var(--nv);transform:translateY(-70%) rotate(45deg);pointer-events:none;z-index:22}",
    ".fab-ask{display:inline-block;margin-top:10px;font-size:14px;color:var(--mu)}",
    ".fab-ask a{color:var(--nv)!important;font-weight:700;text-decoration:underline}",
    ".fab-dates{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,180px),1fr));gap:12px}",
    "@media(max-width:600px){.fab-dates{grid-template-columns:1fr 1fr;gap:10px}.fab-d{padding:12px}.fab-d b{font-size:16px}.fab-main{padding:18px}}",
    ".fab-d{border:2px solid var(--bd);border-radius:14px;padding:14px 16px;cursor:pointer;background:#fff;position:relative;z-index:21;user-select:none;transition:border-color .15s,background .15s}",
    ".fab-d b{display:block;font-size:18px;color:var(--nv);line-height:1.25}",
    ".fab-d .loc{display:block;font-size:14px;font-weight:700;color:var(--bl);margin-top:3px}",
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
    ".fab-sum{background:var(--nv);color:#fff;border-radius:18px;padding:24px;position:sticky;top:110px;box-shadow:0 14px 34px rgba(29,37,96,.25)}",
    "@media(max-width:1100px){.fab{grid-template-columns:1fr}.fab-sum{position:static}}",
    ".fab-sum h3{color:#fff!important;font-size:22px!important;margin:0 0 16px!important}",
    ".fab-lines{background:rgba(255,255,255,.06);border-radius:12px;padding:4px 16px}",
    ".fab-row{padding:11px 0;border-bottom:1px solid rgba(255,255,255,.1)}",
    ".fab-row:last-child{border-bottom:0}",
    ".fab-row span{display:block;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#aab2d8;margin-bottom:2px}",
    ".fab-row b{display:block;font-size:16px;line-height:1.35;color:#fff}",
    ".fab-row b.ph{color:#8f97c2;font-weight:400}",
    ".fab-pplrow{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 0 4px}",
    ".fab-pplrow > span:first-child{font-size:15px;color:#e6e9f7;font-weight:700}",
    ".fab-ppl{display:inline-flex;align-items:center;gap:14px;font-size:18px;font-weight:700}",
    ".fab-ppl i{font-style:normal;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.12);display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;cursor:pointer;user-select:none;position:relative;z-index:21}",
    ".fab-ppl i:hover{background:rgba(255,255,255,.22)}",
    ".fab-ppl i.off{opacity:.3;cursor:default}",
    ".fab-tot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:14px;padding-top:16px;border-top:1px solid rgba(255,255,255,.2)}",
    ".fab-tot span{color:#c3c9e6;font-size:15px}",
    ".fab-tot span small{display:block;font-size:12px;color:#8f97c2}",
    ".fab-tot b{font-size:36px;line-height:1;white-space:nowrap}",
    ".fab-tot b small{font-size:13px;font-weight:400;color:#c3c9e6;margin-left:6px}",
    ".fab-go{display:block;text-align:center;background:var(--or);color:var(--nv)!important;border-radius:30px;padding:15px;font-weight:700;font-size:17px;text-decoration:none!important;margin:20px 0 14px;position:relative;z-index:21;box-shadow:0 8px 18px rgba(255,140,4,.35);transition:transform .15s}",
    ".fab-go:hover{transform:translateY(-1px)}",
    ".fab-go.off{background:#3a4378;color:#aab2d8!important;box-shadow:none;pointer-events:none}",
    ".fab-sum p{font-size:13px;color:#c3c9e6;margin:0 0 8px!important;line-height:1.45}",
    ".fab-sum a.l{color:#fff!important;text-decoration:underline;font-weight:700}",
    ".fab-team{border-top:1px solid rgba(255,255,255,.12);margin-top:12px;padding-top:12px;font-size:13px;color:#c3c9e6}",
    ".fab-c:focus-visible,.fab-d:focus-visible,.fab-ppl i:focus-visible{outline:3px solid var(--or);outline-offset:2px}"
  ].join("");

  function injectBookCss() {
    if (document.getElementById("fab-css")) return;
    var s = document.createElement("style"); s.id = "fab-css"; s.textContent = BCSS; document.head.appendChild(s);
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
      return { id: p.id, date: new Date(+m[3], +m[2] - 1, +m[1]), loc: locOf(name),
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
    return Object.keys(c).sort(function (a, b) { return a.localeCompare(b); }).map(function (l) { return [l, c[l]]; });
  }
  function visible(st) { return items(st).filter(function (x) { return !st.loc || x.loc === st.loc; }); }
  function pickDefaults(root) {
    var st = root._st, L = locs(st).map(function (x) { return x[0]; });
    if (st.loc && L.indexOf(st.loc) < 0) st.loc = "";
    if (root._want && !st.loc) { for (var i = 0; i < L.length; i++) if (L[i].toLowerCase().indexOf(root._want) > -1) { st.loc = L[i]; break; } }
    var at = visible(st);
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
    if (st.loading) h += '<div class="fab-sk" style="height:50px;max-width:420px"></div>';
    else if (st.err || !items(st).length) h += '<div class="fab-msg">No ' + bEsc(c.name) + ' dates are listed online right now. <a href="#enquire">Ask us about dates</a></div>';
    else {
      h += '<div class="fab-selwrap"><select class="fab-sel" data-change="loc" aria-label="Choose a venue"><option value="">All venues (' + items(st).length + ' dates)</option>';
      locs(st).forEach(function (l) { h += '<option value="' + bEsc(l[0]) + '"' + (l[0] === st.loc ? " selected" : "") + ">" + bEsc(l[0]) + " (" + l[1] + ")</option>"; });
      h += '</select></div><span class="fab-ask">Can\u2019t see your town? <a href="#enquire">Ask us about dates near you</a></span>';
    }
    h += "</div>";
    // 3 date
    var at = visible(st);
    h += '<div class="fab-sec"><div class="fab-hd"><h3><span class="fab-n">3</span>Pick a date</h3>' +
      (at.length ? "<small>" + at.length + " date" + (at.length === 1 ? "" : "s") + (st.loc ? " at " + bEsc(st.loc) : " across all venues") + "</small>" : "") + "</div>";
    if (st.loading) { h += '<div class="fab-dates">'; for (var k = 0; k < 6; k++) h += '<div class="fab-sk"></div>'; h += "</div>"; }
    else if (at.length) {
      h += '<div class="fab-dates">';
      at.slice(0, st.shown).forEach(function (i) {
        var s = i.low ? '<span class="s low">Only ' + i.low + " place" + (i.low === 1 ? "" : "s") + " left</span>" : '<span class="s">Places available</span>';
        h += '<div class="fab-d' + (i.id === st.id ? " on" : "") + '" role="button" tabindex="0" aria-pressed="' + (i.id === st.id) + '" data-act="date" data-v="' + i.id + '"><b>' + fmt(i.date) + " " + i.date.getFullYear() + '</b><span class="loc">' + bEsc(i.loc) + '</span><span class="m">' + bEsc(c.len) + (i.price != null ? " \u00b7 " + bMoney(i.price) + " + VAT" : "") + "</span>" + s + "</div>";
      });
      h += "</div>";
      if (at.length > st.shown) h += '<div class="fab-more" role="button" tabindex="0" data-act="more">Show more dates</div>';
    }
    h += "</div></div>";

    // summary
    var tot = sel && sel.price != null ? sel.price * st.ppl : null;
    var maxp = sel && sel.low ? Math.min(MAXP, sel.low) : MAXP;
    h += '<aside class="fab-sum"><h3>Your booking</h3><div class="fab-lines">' +
      '<div class="fab-row"><span>Course</span><b>' + bEsc(c.name) + " (" + bEsc(c.len) + ")</b></div>" +
      '<div class="fab-row"><span>Venue</span>' + (sel ? "<b>" + bEsc(sel.loc) + "</b>" : '<b class="ph">Choose a venue</b>') + "</div>" +
      '<div class="fab-row"><span>Start date</span>' + (sel ? "<b>" + fmt(sel.date) + " " + sel.date.getFullYear() + "</b>" : '<b class="ph">Pick a date</b>') + "</div>" +
      "</div>" +
      '<div class="fab-pplrow"><span>People</span><span class="fab-ppl"><i role="button" tabindex="0" aria-label="One fewer person" data-act="minus" class="' + (st.ppl <= 1 ? "off" : "") + '">&minus;</i>' + st.ppl +
      '<i role="button" tabindex="0" aria-label="One more person" data-act="plus" class="' + (st.ppl >= maxp ? "off" : "") + '">+</i></span></div>' +
      '<div class="fab-tot"><span>Total' + (sel && sel.price != null && st.ppl > 1 ? "<small>" + st.ppl + " \u00d7 " + bMoney(sel.price) + "</small>" : "") + "</span><b>" + (tot != null ? bMoney(tot) : "\u00a30") + "<small>+ VAT</small></b></div>";
    var go = sel ? sel.url + (sel.url.indexOf("?") > -1 ? "&" : "?") + "add-to-cart=" + sel.id + "&quantity=" + st.ppl : "#";
    h += '<a class="fab-go' + (sel ? "" : " off") + '" data-act="go" href="' + bEsc(go) + '">' + (sel ? "Book now" : "Choose a date to book") + "</a>" +
      '<p><a class="l" href="' + abs(c.page) + '">What\u2019s on the ' + bEsc(c.name) + " course</a></p>" +
      "<p>Free date transfer up to five working days before. If we move a course, moving with us is always free.</p>" +
      '<div class="fab-team">Training more than 12, or want us to come to you? <a class="l" href="#enquire">Ask for a quote</a></div>' +
      "</aside>";
    root.innerHTML = '<div class="fab">' + h + "</div>";
  }

  function act(el) {
    var root = el.closest(".cst-fa-book"); if (!root || !root._st) return;
    var st = root._st, a = el.getAttribute("data-act"), v = el.getAttribute("data-v");
    if (a === "course" && v !== st.course) { st.course = v; st.shown = STEP; st.id = null; pickDefaults(root); }
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
      try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "fa_hub_book", fa_course: course(st.course).name, fa_location: (current(st) || {}).loc || "", fa_people: st.ppl }); } catch (e) {}
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
  window.addEventListener("change", function (e) {
    var s = e.target; if (!s || !s.getAttribute || s.getAttribute("data-change") !== "loc") return;
    var root = s.closest(".cst-fa-book"); if (!root || !root._st) return;
    var st = root._st; st.loc = s.value; st.shown = STEP; st.id = null; pickDefaults(root); render(root);
  }, true);
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

/*!
 * CST Training First Aid hub (v2: separate dates links for FAW and EFAW)
 * Host on GitHub Pages (cst-advisor repo), load with ?v=N cache buster.
 * Load AFTER nebosh-hub.js, which supplies the shared nbx/nbi page CSS.
 * Mount point:
 *   <div class="cst-fa-finder"
 *        data-faw-url="/level-3-award-in-first-aid-at-work-3-day-course-rqf/"
 *        data-efaw-url="/emergency-first-aid-work/"
 *        data-faw-dates="/level-3-first-aid-at-work-locations-page/"
 *        data-efaw-dates="/emergency-first-aid-work/#filter-section"
 *        data-faw-price="215" data-efaw-price="95"></div>
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
        dates: abs(root.getAttribute("data-faw-dates") || "/level-3-first-aid-at-work-locations-page/")
      },
      efaw: {
        name: "Emergency First Aid at Work", length: "1 day",
        price: +(root.getAttribute("data-efaw-price") || 95),
        url: abs(root.getAttribute("data-efaw-url") || "/emergency-first-aid-work/"),
        dates: abs(root.getAttribute("data-efaw-dates") || "/emergency-first-aid-work/#filter-section")
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

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-finder"), mount);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  if (window.MutationObserver) new MutationObserver(function () {
    if (!document.getElementById("fa-css")) injectCss();
    Array.prototype.forEach.call(document.querySelectorAll(".cst-fa-finder"), function (r) { if (!r._fa || !r.firstChild) { r._fa = false; mount(r); } });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

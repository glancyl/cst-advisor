/* CST Training ILM and CMI hubs: one-tap finder, team cost calculator and card styles.
   Load on both hubs:
   <script nitro-exclude src="https://glancyl.github.io/cst-advisor/leadership-hub.js?v=2" defer></script>
   Mounts: <div class="cst-lh-finder" data-group="ilm|cmi"></div>
           <div class="cst-lh-team" data-group="ilm|cmi"></div>
   Prices are current list prices, ex VAT (csttraining.co.uk, 3 Nov 2026). Monthly = price / 10.
   OPEN ITEM: team ladder 5% (3 to 6) / 10% (7+) on ILM and CMI (Luisa). */
(function () {
  "use strict";

  var SITE = "https://www.csttraining.co.uk/";
  var HUBS = { ilm: SITE + "ilm-courses-nvqs/", cmi: SITE + "cmi-courses/" };

  /* [size, full name, price, length, slug] */
  var ILM = {
    l2: { h: "ILM Level 2 Developing Leadership & Team Skills", who: "For people leading a team for the first time, or about to.", items: [
      ["Award", "ILM Level 2 Award in Developing Leadership & Team Skills", 399, "4 to 8 weeks", "ilm-level-2-award-in-leadership-team-skills/"],
      ["Certificate", "ILM Level 2 Certificate in Developing Leadership & Team Skills", 795, "4 to 8 weeks", "ilm-level-2-certificate-in-leadership-team-skills/"]] },
    l3: { h: "ILM Level 3 Leadership & Management Skills", who: "For team leaders, supervisors and first-line managers.", items: [
      ["Award", "ILM Level 3 Award in Leadership & Management Skills", 529, "4 to 8 weeks", "ilm-level-3-award-in-leadership-management/"],
      ["Certificate", "ILM Level 3 Certificate in Leadership & Management Skills", 949, "4 to 8 weeks", "ilm-level-3-certificate-in-leadership-management/"],
      ["Diploma", "ILM Level 3 Diploma in Leadership & Management Skills", 1295, "12 to 16 weeks", "ilm-level-3-diploma-in-leadership-management/"]] },
    l4: { h: "ILM Level 4 Leadership & Management", who: "For new and aspiring middle managers.", items: [
      ["Award", "ILM Level 4 Award in Leadership & Management", 629, "4 to 8 weeks", "ilm-level-4-award-in-leadership-management/"],
      ["Certificate", "ILM Level 4 Certificate in Leadership & Management", 999, "4 to 8 weeks", "ilm-level-4-certificate-in-leadership-management/"],
      ["Diploma", "ILM Level 4 Diploma in Leadership & Management", 1329, "12 to 16 weeks", "ilm-level-4-diploma-in-leadership-management/"]] },
    l5: { h: "ILM Level 5 Operational Leadership & Management Skills", who: "For managers running a department, site or function.", items: [
      ["Award", "ILM Level 5 Award in Operational Leadership & Management Skills", 695, "4 to 8 weeks", "ilm-level-5-award-in-leadership-management/"],
      ["Certificate", "ILM Level 5 Certificate in Operational Leadership & Management Skills", 1095, "4 to 8 weeks", "ilm-level-5-certificate-in-leadership-management/"],
      ["Diploma", "ILM Level 5 Diploma in Operational Leadership & Management Skills", 1395, "12 to 16 weeks", "ilm-level5-diploma-in-leadership-management/"]] },
    l6: { h: "ILM Level 6 Leadership & Management", who: "For senior managers preparing for director-level work.", items: [
      ["Award", "ILM Level 6 Award in Leadership & Management", 1195, "4 to 8 weeks", "ilm-level-6-award-in-management/"],
      ["Certificate", "ILM Level 6 Certificate in Leadership & Management", 1295, "4 to 8 weeks", "ilm-level-6-certificate-in-leadership-and-management/"],
      ["Diploma", "ILM Level 6 Diploma in Leadership & Management", 1495, "12 to 16 weeks", "ilm-level-6-diploma-in-management/"]] },
    l7: { h: "ILM Level 7 Strategic Leadership & Management", who: "For directors, executives and business owners.", items: [
      ["Award", "ILM Level 7 Award in Strategic Leadership & Management", 995, "4 to 8 weeks", "ilm-level-7-award-in-leadership-management/"],
      ["Certificate", "ILM Level 7 Certificate in Strategic Leadership & Management", 1495, "4 to 8 weeks", "ilm-level-7-certificate-in-leadership-management/"],
      ["Diploma", "ILM Level 7 Diploma in Strategic Leadership & Management", 1795, "5 to 6 months", "ilm-level-7-diploma-in-leadership-management/"],
      ["Extended Diploma", "ILM Level 7 Extended Diploma in Strategic Leadership & Management", 2495, "12 to 18 months", "ilm-level-7-extended-diploma-in-strategic-leadership-management/"]] }
  };

  var CMI = {
    l3: { h: "CMI Level 3 Principles of Management & Leadership", who: "For team leaders and first-line managers.", items: [
      ["Diploma", "CMI Level 3 Diploma in Principles of Management & Leadership", 1799, "3 to 6 months", "cmi-level-3-diploma-in-principles-of-management-leadership/"]] },
    l5: { h: "CMI Level 5 Management & Leadership", who: "For managers who lead teams or other managers. Our most popular CMI qualification.", cmgr: true, items: [
      ["Diploma", "CMI Level 5 Diploma in Management & Leadership", 1680, "6 to 12 months", "cmi-level-5-diploma-in-management-leadership/"]] },
    l7: { h: "CMI Level 7 Strategic Management & Leadership Practice", who: "For senior managers and directors.", cmgr: true, items: [
      ["Diploma", "CMI Level 7 Diploma in Strategic Management & Leadership Practice", 1900, "6 to 12 months", "cmi-level-7-diploma-in-strategic-management-and-leadership-practice/"]] },
    cm: { h: "CMI Coaching & Mentoring", who: "For managers who coach and mentor others, at Level 3 or Level 7.", items: [
      ["Level 3 Diploma", "CMI Level 3 Diploma in Coaching & Mentoring", 1340, "3 to 6 months", "cmi-level-3-diploma-in-coaching-mentoring/"],
      ["Level 7 Diploma", "CMI Level 7 Diploma in Leadership Coaching & Mentoring", 1500, "6 to 12 months", "cmi-level-7-diploma-in-leadership-coaching-mentoring/"]] },
    pc: { h: "CMI Professional Consulting", who: "For consultants, and anyone building consultancy skills.", items: [
      ["L5 Award", "CMI Level 5 Award in Principles of Management Consulting", 320, "2 to 3 months", "cmi-level-5-award-principles-management-consulting/"],
      ["L5 Certificate", "CMI Level 5 Certificate in Principles of Management Consulting", 550, "3 to 5 months", "cmi-level-5-certificate-principles-management-consulting/"],
      ["L5 Award", "CMI Level 5 Award in Management Consulting Practice", 320, "3 to 12 months", "cmi-level-5-award-in-management-consulting/"],
      ["L5 Certificate", "CMI Level 5 Certificate in Management Consulting Practice", 550, "6 to 12 months", "cmi-level-5-certificate-in-management-consulting/"],
      ["L5 Diploma", "CMI Level 5 Diploma in Management Consulting Practice", 1100, "6 to 12 months", "cmi-level-5-diploma-in-management-consulting/"],
      ["L7 Diploma", "CMI Level 7 Diploma in Professional Consulting", 1100, "6 to 12 months", "cmi-level-7-diploma-in-professional-consulting/"]] },
    pm: { h: "CMI Project Management", who: "For project managers and project leads.", items: [
      ["Level 3 Award", "CMI Level 3 Award in Project Management", 300, "8 to 16 weeks", "cmi-level-3-award-in-project-management/"],
      ["Level 5 Certificate", "CMI Level 5 Certificate in Project Management", 600, "3 to 5 months", "cmi-level-5-certificate-in-project-management/"]] }
  };

  var CHOICES = {
    ilm: [
      ["l2", "I'm new to leading a team", "Or about to be"],
      ["l3", "I'm a team leader or supervisor", "First-line manager with people to manage"],
      ["l4", "I'm moving into middle management", "Taking on more managers or a bigger remit"],
      ["l5", "I run a department, site or function", "Usually with a budget to manage"],
      ["l6", "I'm a senior manager", "Preparing for director-level work"],
      ["l7", "I'm a director or business owner", "Executive or owner level"]
    ],
    cmi: [
      ["l3", "I'm a team leader or first-line manager", "Leading a team day to day"],
      ["l5", "I manage a department or other managers", "Our most popular CMI qualification"],
      ["l7", "I'm a senior manager or director", "Leading strategy at senior level"],
      ["cm", "I want to coach and mentor others", "Level 3 or Level 7"],
      ["pc", "I work in consulting", "Or want to build consultancy skills"],
      ["pm", "I lead projects", "Level 3 or Level 5"]
    ]
  };

  var WHY = {
    ilm: {
      l2: "A first leadership qualification, built around the work you already do.",
      l3: "Built for people who already manage a team and want to do it with more confidence.",
      l4: "For managers stepping up from leading a team to leading a wider area.",
      l5: "For managers responsible for a department, site or function and the people in it.",
      l6: "For senior managers getting ready for director-level decisions.",
      l7: "The highest ILM level, for people setting direction for an organisation."
    },
    cmi: {
      l3: "Assessed by written assignment, with your own team as the case.",
      l5: "The Diploma opens the Chartered Manager route: with three years' management experience you can apply to CMI for CMgr status.",
      l7: "The Diploma opens the Chartered Manager route: with three years' management experience you can apply to CMI for CMgr status.",
      cm: "Learn to coach and mentor the people you manage, at the level that matches your role.",
      pc: "Consulting qualifications from Award to Diploma. Start small and build up.",
      pm: "Recognised project management qualifications, assessed by written assignment."
    }
  };

  var BANDS = [{ min: 7, pct: 0.10 }, { min: 3, pct: 0.05 }];

  function data(g) { return g === "cmi" ? CMI : ILM; }
  function gbp(n) { return "£" + Math.round(n).toLocaleString("en-GB"); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function pct(n) {
    for (var i = 0; i < BANDS.length; i++) if (n >= BANDS[i].min) return BANDS[i].pct;
    return 0;
  }

  /* ---------- styles (also styles the static .lhx-sizes rows on the hub cards) ---------- */
  var CSS = [
    ".lhx{--nv:#1d2560;--or:#ff8c04;--bl:#4c6bd8;--sf:#f4f5f9;--bd:#dde3f0;--tx:#3a3f55;--mu:#6b7394;color:var(--tx);font-size:16px;line-height:1.55;text-align:left}",
    ".lhx *{box-sizing:border-box}",
    ".lhx-card{background:#fff;border-radius:16px;box-shadow:0 10px 30px rgba(29,37,96,.12);padding:28px;margin:24px auto 0;max-width:1000px}",
    ".lhx-ask{text-align:center;font-size:20px;font-weight:700;color:var(--nv);margin:0 0 18px}",
    ".lhx-opts{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}",
    ".lhx-opt{user-select:none;display:flex;flex-direction:column;gap:6px;text-align:left;background:var(--sf);border:2px solid transparent;border-radius:12px;padding:18px;cursor:pointer;font-family:inherit;transition:border-color .15s,background .15s}",
    ".lhx-opt b{color:var(--nv);font-size:17px;line-height:1.3}",
    ".lhx-opt span{color:var(--mu);font-size:14px;line-height:1.4}",
    ".lhx-opt:hover{border-color:var(--bd);background:#fff}",
    ".lhx-opt.on{border-color:var(--or);background:#fff7ec}",
    ".lhx-opt:focus-visible{outline:2px solid var(--bl);outline-offset:2px}",
    ".lhx-res{margin-top:26px;border-top:1px solid var(--bd);padding-top:24px}",
    
    ".lhx-res h3{color:var(--nv);font-size:26px;margin:0 0 8px;line-height:1.25}",
    ".lhx-note{background:#e4edfb;border:1px solid #2e6fd6;border-radius:10px;padding:12px 16px;margin:16px 0 0;color:var(--nv)}",
    ".lhx-note a{color:var(--nv);font-weight:700;text-decoration:underline}",
    ".lhx-small{font-size:14px;color:var(--mu);margin-top:14px}",
    /* size rows: used in finder results AND static hub cards */
    ".lhx-sizes{list-style:none!important;margin:4px 20px 20px!important;padding:0!important;border-top:1px solid #e3e7f1}",
    ".lhx-res .lhx-sizes{margin:16px 0 0!important}",
    ".lhx-sizes li{list-style:none!important;margin:0!important;padding:0!important;border-bottom:1px solid #e3e7f1}",
    ".lhx-sizes li:before{display:none!important}",
    ".lhx-sizes a{display:grid;grid-template-columns:1fr auto 18px;align-items:center;gap:12px;padding:12px 6px;text-decoration:none!important;color:#1d2560!important;transition:background .15s}",
    ".lhx-sizes a:hover{background:#fff7ec}",
    ".lhx-sizes b{display:block;font-size:16px;line-height:1.3;color:#1d2560}",
    ".lhx-sizes small{display:block;font-size:13px;line-height:1.35;color:#6b7394;margin-top:2px}",
    ".lhx-sizes .p{text-align:right}",
    ".lhx-sizes .go{color:#ff8c04;font-size:22px;font-weight:700;line-height:1;text-align:right}",
    ".lhx-q{transition:transform .2s,box-shadow .2s}",
    ".lhx-q:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(29,37,96,.28)!important}",
    ".lhx-qb{transition:background .15s,color .15s}",
    ".lhx-qb:hover{background:#ffffff!important;border-color:#ffffff!important;color:#1d2560!important}",
    ".lhx-qb.gh:hover{background:#ff8c04!important;border-color:#ff8c04!important;color:#fff!important}",
    ".lhx-tot{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));margin-top:22px}",
    ".lhx-tot div{background:var(--sf);border-radius:12px;padding:16px;text-align:center}",
    ".lhx-tot b{display:block;color:var(--nv);font-size:28px;line-height:1.2}",
    ".lhx-tot span{font-size:14px;color:var(--mu)}",
    ".lhx-grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))}",
    ".lhx label{display:block;font-weight:700;color:var(--nv);margin:0 0 6px;font-size:15px}",
    ".lhx select,.lhx input{width:100%;padding:12px 14px;border:1px solid var(--bd);border-radius:10px;font-size:16px;color:var(--nv);background:#fff;font-family:inherit}",
    ".lhx-btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px;justify-content:center}",
    ".lhx-btn{display:inline-block;padding:12px 24px;border-radius:30px;font-weight:700;text-decoration:none!important;font-size:16px}",
    ".lhx-btn.or{background:var(--or);color:#fff!important}",
    ".lhx-btn.gh{border:2px solid var(--nv);color:var(--nv)!important}"
  ].join("");

  function injectCSS() {
    if (document.getElementById("lhx-css")) return;
    var s = document.createElement("style");
    s.id = "lhx-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function sizeRows(items) {
    return '<ul class="lhx-sizes">' + items.map(function (it) {
      return '<li><a href="' + SITE + it[4] + '" title="' + esc(it[1]) + '"><span class="s"><b>' + esc(it[0]) + "</b><small>" + esc(it[3]) +
        '</small></span><span class="p"><b>' + gbp(it[2]) + " + VAT</b><small>or " + gbp(it[2] / 10) + ' + VAT a month</small></span><span class="go" aria-hidden="true">&rsaquo;</span></a></li>';
    }).join("") + "</ul>";
  }

  /* ---------- finder ---------- */
  function renderResult(box, g, key) {
    var d = data(g)[key];
    var html = "<h3>We'd recommend " + esc(d.h) + "</h3><p>" + esc(d.who) + " " + esc(WHY[g][key]) + "</p>";
    html += sizeRows(d.items);
    if (g === "ilm" && d.items.length > 1) {
      html += '<p class="lhx-small">Not sure which size? The Award, Certificate and Diploma use the same units in different amounts, so you can start with the Award and top up later.</p>';
    }
    html += g === "ilm"
      ? '<div class="lhx-note">Prefer written assignments and a route to Chartered Manager? <a href="' + HUBS.cmi + '">Compare CMI qualifications</a>.</div>'
      : '<div class="lhx-note">Prefer to be assessed on your own work by portfolio? <a href="' + HUBS.ilm + '">Compare ILM qualifications</a>.</div>';
    html += '<p class="lhx-small">Booking for three or more? <a href="#team">Work out the team price</a>, or call us on <a href="tel:02034884472">020 3488 4472</a>.</p>';
    box.innerHTML = html;
  }

  function mountFinder(el) {
    if (el.getAttribute("data-lhx") === "1") return;
    el.setAttribute("data-lhx", "1");
    var g = el.getAttribute("data-group") === "cmi" ? "cmi" : "ilm";
    el.innerHTML = '<div class="lhx"><div class="lhx-card"><p class="lhx-ask">Which sounds most like you?</p><div class="lhx-opts" role="group">' +
      CHOICES[g].map(function (c) {
        return '<div class="lhx-opt" role="button" tabindex="0" data-k="' + c[0] + '"><b>' + esc(c[1]) + "</b><span>" + esc(c[2]) + "</span></div>";
      }).join("") + '</div><div class="lhx-res" style="display:none" aria-live="polite"></div></div></div>';
  }

  /* One delegated handler on window, capture phase, so theme or plugin scripts
     that stop click events further down can't block the finder. */
  function pick(opt) {
    var root = opt.closest(".cst-lh-finder");
    if (!root) return;
    var g = root.getAttribute("data-group") === "cmi" ? "cmi" : "ilm";
    Array.prototype.forEach.call(root.querySelectorAll(".lhx-opt"), function (x) {
      x.classList.toggle("on", x === opt);
      x.setAttribute("aria-pressed", x === opt ? "true" : "false");
    });
    var box = root.querySelector(".lhx-res");
    renderResult(box, g, opt.getAttribute("data-k"));
    box.style.display = "block";
  }
  window.addEventListener("click", function (e) {
    var opt = e.target && e.target.closest ? e.target.closest(".cst-lh-finder .lhx-opt") : null;
    if (opt) pick(opt);
  }, true);
  window.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var opt = e.target && e.target.closest ? e.target.closest(".cst-lh-finder .lhx-opt") : null;
    if (opt) { e.preventDefault(); pick(opt); }
  }, true);

  /* ---------- team calculator ---------- */
  function mountTeam(el) {
    var g = el.getAttribute("data-group") === "cmi" ? "cmi" : "ilm";
    var all = [];
    var d = data(g);
    Object.keys(d).forEach(function (k) {
      d[k].items.forEach(function (it) { all.push(it); });
    });
    var opts = all.map(function (it, i) {
      return '<option value="' + i + '">' + esc(it[1]) + " (" + gbp(it[2]) + " + VAT)</option>";
    }).join("");
    el.innerHTML = '<div class="lhx"><div class="lhx-card"><div class="lhx-grid">' +
      '<div><label for="lhx-tc-' + g + '">Qualification</label><select id="lhx-tc-' + g + '">' + opts + "</select></div>" +
      '<div><label for="lhx-tn-' + g + '">Number of people</label><input id="lhx-tn-' + g + '" type="number" min="1" max="200" value="3"></div>' +
      '</div><div class="lhx-tot"></div>' +
      '<p class="lhx-small">Prices exclude VAT. Three to six people save 5%, seven or more save 10%. Eight or more? Ask about a private cohort with one tutor for your team. Employers can pay on invoice, on the same account as the rest of your CST Training bookings.</p>' +
      '<div class="lhx-btns"><a class="lhx-btn or" href="' + SITE + 'contact/">Request a team quote</a></div></div></div>';
    var sel = el.querySelector("select");
    var num = el.querySelector("input");
    var out = el.querySelector(".lhx-tot");
    function calc() {
      var it = all[parseInt(sel.value, 10) || 0];
      var n = Math.max(1, Math.min(200, parseInt(num.value, 10) || 1));
      var p = pct(n);
      var each = it[2] * (1 - p);
      out.innerHTML =
        "<div><b>" + gbp(each) + "</b><span>per person + VAT</span></div>" +
        "<div><b>" + gbp(each * n) + "</b><span>total for " + n + (n === 1 ? " person" : " people") + " + VAT</span></div>" +
        "<div><b>" + (p ? gbp(it[2] * p * n) : "£0") + "</b><span>" + (p ? "team saving (" + Math.round(p * 100) + "%)" : "team rates start at 3 people") + "</span></div>";
    }
    sel.addEventListener("change", calc);
    num.addEventListener("input", calc);
    calc();
  }

  function init() {
    injectCSS();
    Array.prototype.forEach.call(document.querySelectorAll(".cst-lh-finder"), mountFinder);
    Array.prototype.forEach.call(document.querySelectorAll(".cst-lh-team"), mountTeam);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

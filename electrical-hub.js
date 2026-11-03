/* CST Training Electrical hub: route finder + team cost calculator.
   Host on the cst-advisor repo (GitHub Pages) and load from the hub page:
   <script nitro-exclude src="https://glancyl.github.io/cst-advisor/electrical-hub.js?v=1" defer></script>
   Mounts: <div class="cst-elec-finder"></div> and <div class="cst-elec-team"></div>
   All prices ex VAT. Facts from the Electrical audit, 27 Oct 2026.
   OPEN ITEMS (check before publish):
   - 18th Edition £290 includes C&G registration and remote exam (Photis)
   - Team ladder 5% (3 to 6) / 10% (7+) on NVQ products (Luisa) */
(function () {
  "use strict";

  var URLS = {
    ewq: "https://www.csttraining.co.uk/level-3-electrotechnical-experienced-worker/",
    wiring: "https://www.csttraining.co.uk/electrical-installations-18th-edition/",
    contact: "https://www.csttraining.co.uk/contact/",
    phone: "020 3488 4472"
  };

  var COURSES = {
    ewq: {
      name: "Level 3 Electrotechnical Experienced Worker Qualification",
      short: "Experienced Worker Qualification",
      code: "City & Guilds 2346-03",
      list: 1550,
      priceLine: "£1,395 + VAT paid in full, or £1,550 + VAT on a plan (£155 a month over 10 months at 0%)",
      cta: "View the Experienced Worker Qualification"
    },
    wiring: {
      name: "18th Edition (BS 7671:2018+A4:2026)",
      short: "18th Edition",
      code: "City & Guilds 2382-26",
      list: 290,
      priceLine: "£290 + VAT, City & Guilds registration and remote exam included. You'll need your own Orange Book (about £106).",
      cta: "View the 18th Edition course"
    }
  };

  var BANDS = [{ min: 7, pct: 0.10 }, { min: 3, pct: 0.05 }];

  var ROUTE = [
    ["Free skills scan", "We check your years on the tools and your certificates before you pay anything.", "CST Training"],
    ["Register", "City & Guilds 2346-03 registration. You can apply for an ECS Experienced Worker card while you work through it.", "CST Training"],
    ["Experienced Worker Qualification", "A portfolio of your real jobs, plus an assessor observing you on site.", "CST Training"],
    ["18th Edition (2382-26)", "Required for the qualification to be certificated. Online with us.", "CST Training"],
    ["Initial Verification (2391-50)", "Also required. We don't run this one, so you sit it at a City & Guilds centre of your choice and send us the certificate.", "A City & Guilds centre"],
    ["AM2E", "The practical assessment, taken at an independent NET centre once the qualification is complete.", "NET centre"],
    ["ECS Gold Card", "Pass the ECS Health, Safety & Environmental assessment and apply for your Installation Electrician Gold Card.", "ECS / JIB"]
  ];

  function gbp(n) {
    return "£" + Math.round(n).toLocaleString("en-GB");
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function pct(n) {
    for (var i = 0; i < BANDS.length; i++) if (n >= BANDS[i].min) return BANDS[i].pct;
    return 0;
  }

  /* ---------- styles (injected: BoldGrid strips <style> from page content) ---------- */
  var CSS = [
    ".elx{--nv:#1d2560;--or:#ff8c04;--bl:#4c6bd8;--sf:#f4f5f9;--bd:#dde3f0;--tx:#3a3f55;--mu:#6b7394;color:var(--tx);font-size:16px;line-height:1.55;text-align:left}",
    ".elx *{box-sizing:border-box}",
    ".elx-card{background:#fff;border-radius:16px;box-shadow:0 10px 30px rgba(29,37,96,.12);padding:28px;margin:24px auto 0;max-width:980px}",
    ".elx-grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}",
    ".elx label{display:block;font-weight:700;color:var(--nv);margin:0 0 6px;font-size:15px}",
    ".elx select,.elx input{width:100%;padding:12px 14px;border:1px solid var(--bd);border-radius:10px;font-size:16px;color:var(--nv);background:#fff;font-family:inherit}",
    ".elx select:focus,.elx input:focus{outline:2px solid var(--bl);outline-offset:1px}",
    ".elx-go{display:block;margin:22px auto 0;background:var(--or);color:#fff;border:0;border-radius:30px;padding:14px 34px;font-size:17px;font-weight:700;cursor:pointer;font-family:inherit}",
    ".elx-go:hover{background:var(--nv)}",
    ".elx-res{margin-top:26px;border-top:1px solid var(--bd);padding-top:24px}",
    ".elx-res[hidden]{display:none}",
    ".elx-res h3{color:var(--nv);font-size:26px;margin:0 0 6px;line-height:1.25}",
    ".elx-code{color:var(--mu);font-size:14px;margin:0 0 14px}",
    ".elx-price{background:#fff7ec;border:1px solid #ffc77f;border-radius:10px;padding:12px 16px;color:var(--nv);font-weight:700;margin:14px 0}",
    ".elx-note{background:#e4edfb;border:1px solid #2e6fd6;border-radius:10px;padding:12px 16px;margin:14px 0;color:var(--nv)}",
    ".elx-warn{background:#fdf1f0;border:1px solid #e9b4ae;border-radius:10px;padding:12px 16px;margin:14px 0;color:#7a231a}",
    ".elx-steps{list-style:none;margin:18px 0 0;padding:0;counter-reset:s}",
    ".elx-steps li{counter-increment:s;position:relative;padding:10px 0 10px 46px;border-bottom:1px solid var(--sf)}",
    ".elx-steps li:before{content:counter(s);position:absolute;left:0;top:10px;width:32px;height:32px;border-radius:50%;background:var(--nv);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:15px}",
    ".elx-steps li.ours:before{background:var(--or)}",
    ".elx-steps b{color:var(--nv)}",
    ".elx-who{display:inline-block;font-size:13px;color:var(--mu);margin-left:6px}",
    ".elx-btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}",
    ".elx-btn{display:inline-block;padding:12px 24px;border-radius:30px;font-weight:700;text-decoration:none!important;font-size:16px}",
    ".elx-btn.or{background:var(--or);color:#fff!important}",
    ".elx-btn.gh{border:2px solid var(--nv);color:var(--nv)!important}",
    ".elx-btn:hover{opacity:.9}",
    ".elx-tot{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));margin-top:22px}",
    ".elx-tot div{background:var(--sf);border-radius:12px;padding:16px;text-align:center}",
    ".elx-tot b{display:block;color:var(--nv);font-size:28px;line-height:1.2}",
    ".elx-tot span{font-size:14px;color:var(--mu)}",
    ".elx-small{font-size:14px;color:var(--mu);margin-top:14px}"
  ].join("");

  function injectCSS() {
    if (document.getElementById("elx-css")) return;
    var s = document.createElement("style");
    s.id = "elx-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function select(id, label, opts) {
    var o = opts.map(function (x) {
      return '<option value="' + x[0] + '">' + esc(x[1]) + "</option>";
    }).join("");
    return '<div><label for="' + id + '">' + label + '</label><select id="' + id + '">' + o + "</select></div>";
  }

  /* ---------- finder ---------- */
  function recommend(a) {
    var r = { course: "wiring", h: "", why: "", warn: "", route: false };
    var scotland = a.where === "sco";

    if (a.role === "experienced" || (a.role === "employer" && a.goal !== "current")) {
      if (a.goal === "current" && a.role === "experienced") {
        r.course = "wiring";
        r.why = "The 18th Edition (2382-26) is the current Amendment 4 wiring regulations award, so it's what a card, scheme or employer asking for the current 18th Edition wants. It's also one of the three parts you'll need if you later go for the Experienced Worker Qualification and an ECS Gold Card.";
      } else if (scotland) {
        r.course = "wiring";
        r.warn = "City & Guilds doesn't offer the Experienced Worker Qualification (2346-03) in Scotland. The 18th Edition is available wherever you are, and SJIB can advise on the Scottish route.";
        r.why = "The 18th Edition (2382-26) is the current Amendment 4 wiring regulations award, online with the exam sat remotely.";
      } else {
        r.course = "ewq";
        r.route = true;
        r.why = a.role === "employer"
          ? "The Experienced Worker Qualification qualifies the electricians you already employ, assessed on your own sites with no time out for college. Each person needs five years as a practising electrician and a Level 2 electrical qualification, and we check that at a free skills scan before anyone pays."
          : "The Experienced Worker Qualification recognises the work you already do. You build a portfolio from real jobs, an assessor observes you on site, and there's no classroom course. You'll need five years as a practising electrician (training time doesn't count) and a Level 2 electrical qualification. We check this at a free skills scan before you pay anything.";
      }
    } else if (a.role === "newer") {
      r.course = "wiring";
      r.why = "The Experienced Worker Qualification needs five years as a practising electrician, so the 18th Edition (2382-26) is the right place to start now. It's one of the three parts of the Experienced Worker route, so it counts when you get there.";
    } else if (a.role === "qualified") {
      r.course = "wiring";
      r.why = a.goal === "gold"
        ? "With an NVQ Level 3 or a completed apprenticeship you're already at the standard the Experienced Worker Qualification recognises, so you don't need it. If your card or scheme wants Amendment 4, the 18th Edition (2382-26) is the course."
        : "The 18th Edition (2382-26) is the only 18th Edition exam City & Guilds now runs, and it's what schemes, card renewals and employers expect for Amendment 4.";
    } else if (a.role === "allied") {
      r.course = "wiring";
      r.why = "If you do fixed electrical work in another trade, the 18th Edition (2382-26) shows you work to the current regulations. There are no formal entry requirements, though basic electrical knowledge is expected. The Experienced Worker Qualification is only for practising electricians.";
    } else {
      r.course = "wiring";
      r.why = "The 18th Edition (2382-26) brings your team up to Amendment 4, online at their own pace with the City & Guilds exam sat remotely.";
    }

    r.h = "We'd recommend the " + COURSES[r.course].short;
    return r;
  }

  function renderResult(box, a) {
    var r = recommend(a);
    var c = COURSES[r.course];
    var html = "<h3>" + esc(r.h) + "</h3>" +
      '<p class="elx-code">' + esc(c.code) + "</p>";
    if (r.warn) html += '<div class="elx-warn">' + esc(r.warn) + "</div>";
    html += "<p>" + esc(r.why) + "</p>";
    html += '<div class="elx-price">' + esc(c.priceLine) + "</div>";

    if (r.route) {
      html += "<p><b>Your whole route to an ECS Gold Card.</b> Steps 3, 4 and 5 must all be done within 18 months of registering. Orange steps are with CST Training.</p>";
      html += '<ol class="elx-steps">' + ROUTE.map(function (s, i) {
        var ours = s[2] === "CST Training";
        return '<li class="' + (ours ? "ours" : "") + '"><b>' + esc(s[0]) + '</b><span class="elx-who">' + esc(s[2]) + "</span><br>" + esc(s[1]) + "</li>";
      }).join("") + "</ol>";
      html += '<p class="elx-small">Not included in the qualification price: the 18th Edition (£290 + VAT with us), Initial Verification, the Orange Book, the AM2E and ECS card fees. We show you the full total at the skills scan.</p>';
    }

    var n = parseInt(a.n, 10) || 1;
    if (n >= 3) {
      var p = pct(n);
      html += '<div class="elx-note">Booking for ' + n + " people? Team rates take " + Math.round(p * 100) + "% off every place, and we can run the skills scan for the whole team in one session. <a href=\"#team\">Work out the cost</a>.</div>";
    }

    html += '<div class="elx-btns"><a class="elx-btn or" href="' + (r.course === "ewq" ? URLS.ewq : URLS.wiring) + '">' + esc(c.cta) + "</a>" +
      '<a class="elx-btn gh" href="' + URLS.contact + '">' + (r.course === "ewq" ? "Book my free skills scan" : "Enquire") + "</a></div>";
    html += '<p class="elx-small">Prefer to talk it through? Call us on <a href="tel:02034884472">' + URLS.phone + "</a>.</p>";

    box.innerHTML = html;
    box.hidden = false;
    if (box.scrollIntoView) box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function mountFinder(el) {
    el.innerHTML = '<div class="elx"><div class="elx-card"><div class="elx-grid">' +
      select("elx-role", "I am", [
        ["experienced", "An electrician with 5+ years but no NVQ Level 3 or apprenticeship"],
        ["newer", "An electrician with under 5 years' experience"],
        ["qualified", "A qualified electrician (NVQ Level 3 or apprenticeship)"],
        ["allied", "Another trade that does some electrical work"],
        ["employer", "An employer with electricians to qualify"]
      ]) +
      select("elx-goal", "I need it for", [
        ["gold", "An ECS Gold Card / fully qualified status"],
        ["current", "Amendment 4: my card, scheme or employer wants the current 18th Edition"]
      ]) +
      select("elx-where", "I work in", [
        ["ewni", "England, Wales or Northern Ireland"],
        ["sco", "Scotland"]
      ]) +
      '<div><label for="elx-n">How many people?</label><input id="elx-n" type="number" min="1" max="200" value="1"></div>' +
      '</div><button type="button" class="elx-go">Show my route</button>' +
      '<div class="elx-res" hidden aria-live="polite"></div></div></div>';

    var box = el.querySelector(".elx-res");
    el.querySelector(".elx-go").addEventListener("click", function () {
      renderResult(box, {
        role: el.querySelector("#elx-role").value,
        goal: el.querySelector("#elx-goal").value,
        where: el.querySelector("#elx-where").value,
        n: el.querySelector("#elx-n").value
      });
    });
  }

  /* ---------- team calculator ---------- */
  function mountTeam(el) {
    var start = el.getAttribute("data-course") === "ewq" ? "ewq" : "wiring";
    el.innerHTML = '<div class="elx"><div class="elx-card"><div class="elx-grid">' +
      select("elx-tc", "Qualification", [
        ["wiring", "18th Edition (2382-26), £290 + VAT"],
        ["ewq", "Experienced Worker Qualification, £1,550 + VAT list"]
      ]) +
      '<div><label for="elx-tn">Number of people</label><input id="elx-tn" type="number" min="1" max="200" value="3"></div>' +
      '</div><div class="elx-tot"></div>' +
      '<p class="elx-small">Prices exclude VAT. Three to six people save 5%, seven or more save 10%. Employers can pay on invoice, and it all goes on the same account as your SMSTS, CSCS and NVQ bookings.</p>' +
      '<div class="elx-btns" style="justify-content:center"><a class="elx-btn or" href="' + URLS.contact + '">Request a team quote</a></div>' +
      "</div></div>";

    var sel = el.querySelector("#elx-tc");
    var num = el.querySelector("#elx-tn");
    var out = el.querySelector(".elx-tot");
    sel.value = start;

    function calc() {
      var c = COURSES[sel.value];
      var n = Math.max(1, Math.min(200, parseInt(num.value, 10) || 1));
      var p = pct(n);
      var each = c.list * (1 - p);
      var saving = c.list * p * n;
      out.innerHTML =
        "<div><b>" + gbp(each) + "</b><span>per person + VAT</span></div>" +
        "<div><b>" + gbp(each * n) + "</b><span>total for " + n + (n === 1 ? " person" : " people") + " + VAT</span></div>" +
        "<div><b>" + (p ? gbp(saving) : "£0") + "</b><span>" + (p ? "team saving (" + Math.round(p * 100) + "%)" : "team rates start at 3 people") + "</span></div>";
    }
    sel.addEventListener("change", calc);
    num.addEventListener("input", calc);
    calc();
  }

  function init() {
    injectCSS();
    Array.prototype.forEach.call(document.querySelectorAll(".cst-elec-finder"), mountFinder);
    Array.prototype.forEach.call(document.querySelectorAll(".cst-elec-team"), mountTeam);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

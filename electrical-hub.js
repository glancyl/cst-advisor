/* CST Training Electrical hub: route finder + team cost calculator.
   Host on the cst-advisor repo (GitHub Pages) and load from the hub page:
   <script nitro-exclude src="https://glancyl.github.io/cst-advisor/electrical-hub.js?v=3" defer></script>
   Mounts: <div class="cst-elec-finder"></div> and <div class="cst-elec-team"></div>
   All prices ex VAT. Facts from the Electrical audit, 27 Oct 2026.
   OPEN ITEMS (check before publish):
   - 18th Edition \u00a3290 includes C&G registration and remote exam (Photis)
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
      priceLine: "\u00a31,550 + VAT, or \u00a3155 + VAT a month over 10 months, interest free",
      cta: "View the Experienced Worker Qualification"
    },
    wiring: {
      name: "18th Edition (BS 7671:2018+A4:2026)",
      short: "18th Edition",
      code: "City & Guilds 2382-26",
      list: 290,
      priceLine: "\u00a3290 + VAT, City & Guilds registration and remote exam included. You'll need your own Orange Book (about \u00a3106).",
      cta: "View the 18th Edition course"
    }
  };

  var BANDS = [{ min: 7, pct: 0.10 }, { min: 3, pct: 0.05 }];

  var ROUTE = [
    ["Free eligibility check", "Enquire and we check your years on the tools and your certificates before you commit.", "CST Training"],
    ["Register", "City & Guilds 2346-03 registration. You can apply for an ECS Experienced Worker card while you work through it.", "CST Training"],
    ["Experienced Worker Qualification", "A portfolio of your real jobs, plus an assessor observing you on site.", "CST Training"],
    ["18th Edition (2382-26)", "Required for the qualification to be certificated. Online with us.", "CST Training"],
    ["Initial Verification (2391-50)", "Also required. We don't run this one, so you sit it at a City & Guilds centre of your choice and send us the certificate.", "A City & Guilds centre"],
    ["AM2E", "The practical assessment, taken at an independent NET centre once the qualification is complete.", "NET centre"],
    ["ECS Gold Card", "Pass the ECS Health, Safety & Environmental assessment and apply for your Installation Electrician Gold Card.", "ECS / JIB"]
  ];

  function gbp(n) {
    return "\u00a3" + Math.round(n).toLocaleString("en-GB");
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
    ".elx-ask{text-align:center;font-size:20px;font-weight:700;color:var(--nv);margin:0 0 18px}",
    ".elx-opts{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}",
    ".cst-elec-finder{position:relative;z-index:20}",
    ".elx-opt{position:relative;z-index:21;cursor:pointer;-webkit-tap-highlight-color:transparent;user-select:none;display:flex;flex-direction:column;gap:6px;text-align:left;background:var(--sf);border:2px solid transparent;border-radius:12px;padding:18px;cursor:pointer;font-family:inherit;transition:border-color .15s,background .15s}",
    ".elx-opt b{color:var(--nv);font-size:17px;line-height:1.3}",
    ".elx-opt span{color:var(--mu);font-size:14px;line-height:1.4}",
    ".elx-opt:hover{border-color:var(--bd);background:#fff}",
    ".elx-opt.on{border-color:var(--or);background:#fff7ec}",
    ".elx-opt:focus-visible{outline:2px solid var(--bl);outline-offset:2px}",
    ".elx-more{margin-top:16px}",
    ".elx-more summary{cursor:pointer;font-weight:700;color:var(--nv)}",
    ".elx-res{margin-top:26px;border-top:1px solid var(--bd);padding-top:24px}",
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

  /* ---------- finder: one tap ---------- */
  var CHOICES = [
    ["ewq", "I'm an electrician with 5+ years but no NVQ", "I want my ECS Gold Card"],
    ["wiring", "I need the current 18th Edition", "For my card, scheme or employer"],
    ["allied", "I'm in another trade", "Plumbing, heating, kitchens or maintenance"],
    ["team", "I'm qualifying a team", "Electricians I already employ"]
  ];

  var RESULTS = {
    ewq: { course: "ewq", h: "The Experienced Worker Qualification",
      why: "It recognises the work you already do. You build a portfolio from real jobs, an assessor observes you on site, and there's no classroom course. You'll need five years as a practising electrician and a Level 2 electrical qualification, so enquire and we'll check your eligibility for free before you commit.",
      note: "Under five years, or based in Scotland? Start with the 18th Edition instead, as it counts towards the route later.",
      route: true, cta2: "Check my eligibility" },
    wiring: { course: "wiring", h: "The 18th Edition (2382-26)",
      why: "It's the current Amendment 4 wiring regulations award and the only 18th Edition exam City & Guilds now runs. Online at your own pace, with the exam sat remotely.",
      cta2: "Enquire" },
    allied: { course: "wiring", h: "The 18th Edition (2382-26)",
      why: "If you do fixed electrical work in another trade, the 18th Edition shows you work to the current regulations. There are no formal entry requirements, though basic electrical knowledge is expected.",
      cta2: "Enquire" },
    team: { course: "ewq", h: "The Experienced Worker Qualification for your team",
      why: "Qualify the electricians you already employ without releasing them for college. One eligibility check for the whole team, site observations grouped by job, and three or more people get the team rate.",
      route: true, team: true, cta2: "Request a team quote" }
  };

  function renderResult(box, key) {
    var r = RESULTS[key];
    var c = COURSES[r.course];
    var html = "<h3>We'd recommend " + esc(r.h) + "</h3>" +
      '<p class="elx-code">' + esc(c.code) + "</p>" +
      "<p>" + esc(r.why) + "</p>" +
      '<div class="elx-price">' + esc(c.priceLine) + "</div>";
    if (r.note) html += '<div class="elx-note">' + esc(r.note) + "</div>";
    if (r.route) {
      html += '<details class="elx-more"><summary>See the full route to a Gold Card</summary>' +
        '<ol class="elx-steps">' + ROUTE.map(function (s) {
          return '<li class="' + (s[2] === "CST Training" ? "ours" : "") + '"><b>' + esc(s[0]) + '</b><span class="elx-who">' + esc(s[2]) + "</span><br>" + esc(s[1]) + "</li>";
        }).join("") + "</ol>" +
        '<p class="elx-small">Steps 3, 4 and 5 must all be done within 18 months of registering. Initial Verification, the Orange Book, the AM2E and ECS card fees are separate.</p></details>';
    }
    html += '<div class="elx-btns"><a class="elx-btn or" href="' + (r.course === "ewq" ? URLS.ewq : URLS.wiring) + '">' + esc(c.cta) + "</a>" +
      '<a class="elx-btn gh" href="' + (r.team ? "#team" : URLS.contact) + '">' + esc(r.cta2) + "</a></div>";
    box.innerHTML = html;
  }

  function mountFinder(el) {
    if (el.getAttribute("data-elx") === "1") return;
    el.setAttribute("data-elx", "1");
    el.innerHTML = '<div class="elx"><div class="elx-card"><p class="elx-ask">Which sounds most like you?</p><div class="elx-opts" role="group">' +
      CHOICES.map(function (c) {
        return '<div class="elx-opt" role="button" tabindex="0" data-k="' + c[0] + '"><b>' + esc(c[1]) + "</b><span>" + esc(c[2]) + "</span></div>";
      }).join("") +
      '</div><div class="elx-res" style="display:none" aria-live="polite"></div></div></div>';
  }

  /* Delegated on window, capture phase, so theme or plugin scripts can't swallow the clicks. */
  function pick(opt) {
    var root = opt.closest(".cst-elec-finder");
    if (!root) return;
    Array.prototype.forEach.call(root.querySelectorAll(".elx-opt"), function (x) {
      x.classList.toggle("on", x === opt);
      x.setAttribute("aria-pressed", x === opt ? "true" : "false");
    });
    var box = root.querySelector(".elx-res");
    renderResult(box, opt.getAttribute("data-k"));
    box.style.display = "block";
    var go = function () {
      var r = box.getBoundingClientRect();
      var offset = window.innerWidth < 768 ? 100 : Math.round(window.innerHeight * 0.35);
      var cur = window.pageYOffset || document.documentElement.scrollTop;
      var y = r.top + cur - offset;
      if (Math.abs(y - cur) > 40) {
        try { window.scrollTo({ top: y, behavior: "smooth" }); } catch (e) { window.scrollTo(0, y); }
      }
      box.setAttribute("tabindex", "-1");
      try { box.focus({ preventScroll: true }); } catch (e) {}
    };
    if (window.requestAnimationFrame) requestAnimationFrame(go); else setTimeout(go, 0);
  }
  /* Find the option under the pointer by position, not by event target. This still works if an
     invisible theme layer sits on top of the finder or another script stops the event. */
  function optAt(x, y) {
    var opts = document.querySelectorAll(".cst-elec-finder .elx-opt");
    for (var i = 0; i < opts.length; i++) {
      var r = opts[i].getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return opts[i];
    }
    return null;
  }
  var lastPick = 0;
  function onPoint(e) {
    var pt = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : e;
    if (pt.clientX == null) return;
    var o = optAt(pt.clientX, pt.clientY);
    if (!o) return;
    var now = Date.now();
    if (now - lastPick < 350) return;
    lastPick = now;
    pick(o);
  }
  ["click", "pointerup", "touchend"].forEach(function (ev) {
    window.addEventListener(ev, onPoint, { capture: true, passive: true });
    document.addEventListener(ev, onPoint, { capture: true, passive: true });
  });
  window.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var o = e.target && e.target.closest ? e.target.closest(".cst-elec-finder .elx-opt") : null;
    if (o) { e.preventDefault(); pick(o); }
  }, true);

  /* ---------- team calculator ---------- */
  function mountTeam(el) {
    if (el.getAttribute("data-elx") === "1") return;
    el.setAttribute("data-elx", "1");
    var start = el.getAttribute("data-course") === "ewq" ? "ewq" : "wiring";
    el.innerHTML = '<div class="elx"><div class="elx-card"><div class="elx-grid">' +
      select("elx-tc", "Qualification", [
        ["wiring", "18th Edition (2382-26), \u00a3290 + VAT"],
        ["ewq", "Experienced Worker Qualification, \u00a31,550 + VAT"]
      ]) +
      '<div><label for="elx-tn">Number of people</label><input id="elx-tn" type="number" min="1" max="200" value="3"></div>' +
      '</div><div class="elx-tot"></div>' +
      '<p class="elx-small">Prices exclude VAT. Three to six people save 5%, seven or more save 10%. Employers can pay on invoice, and it all goes on the same account as your SMSTS, CSCS and NVQ bookings.</p>' +
      '<div class="elx-btns" style="justify-content:center"><a class="elx-btn or" href="' + URLS.contact + '">Request a team quote</a></div>' +
      "</div></div>";

    el.querySelector("#elx-tc").value = start;
    calcTeam(el);
  }

  function calcTeam(root) {
    var sel = root.querySelector("select"), num = root.querySelector("input"), out = root.querySelector(".elx-tot");
    if (!sel || !num || !out) return;
    var c = COURSES[sel.value] || COURSES.wiring;
    var n = Math.max(1, Math.min(200, parseInt(num.value, 10) || 1));
    var p = pct(n);
    var each = c.list * (1 - p);
    out.innerHTML =
      "<div><b>" + gbp(each) + "</b><span>per person + VAT</span></div>" +
      "<div><b>" + gbp(each * n) + "</b><span>total for " + n + (n === 1 ? " person" : " people") + " + VAT</span></div>" +
      "<div><b>" + (p ? gbp(c.list * p * n) : "\u00a30") + "</b><span>" + (p ? "team saving (" + Math.round(p * 100) + "%)" : "team rates start at 3 people") + "</span></div>";
  }
  ["input", "change", "keyup"].forEach(function (ev) {
    window.addEventListener(ev, function (e) {
      var root = e.target && e.target.closest ? e.target.closest(".cst-elec-team") : null;
      if (root) calcTeam(root);
    }, true);
  });

  function init() {
    try { console.log("[elx] ready v5"); } catch (e) {}
    injectCSS();
    Array.prototype.forEach.call(document.querySelectorAll(".cst-elec-finder"), mountFinder);
    Array.prototype.forEach.call(document.querySelectorAll(".cst-elec-team"), mountTeam);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

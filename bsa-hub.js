/* CST Training Building Safety Act course page: one-tap tier finder.
   Mount: <div class="cst-bsa-finder"></div>
   Load:  <script nitro-exclude src="https://glancyl.github.io/cst-advisor/bsa-hub.js?v=1" defer></script> */
(function () {
  "use strict";
  var SITE = "https://www.csttraining.co.uk";
  var TIERS = {
    t1: { n: "Tier 1: Practitioner", price: "\u00a3100 + VAT", time: "2 hours", qs: "10 question multiple choice assessment",
      url: SITE + "/product/bsa-tier-1-practitioner-elearning/",
      why: "Built for people working on the front line. It covers the need to know essentials: how the Act affects daily work, why the Golden Thread matters and what it means to be a competent worker under the Act." },
    t2: { n: "Tier 2: Supervisor", price: "\u00a3200 + VAT", time: "4 hours", qs: "20 question multiple choice assessment",
      url: SITE + "/product/building-safety-act-tier-2-supervisor-elearning/",
      why: "Built for people overseeing teams. Everything in the Practitioner tier, plus the roles and responsibilities of duty holders and the Gateway stages, so you can manage compliance through a project." },
    t3: { n: "Tier 3: Manager", price: "\u00a3300 + VAT", time: "6 hours", qs: "30 question multiple choice assessment",
      url: SITE + "/product/building-safety-act-tier-3-manager-elearning/",
      why: "Our most comprehensive tier, for people carrying the most accountability. It covers why the Act was introduced, how the oversight bodies work and the requirements for storing and sharing building information." }
  };
  var CHOICES = [
    ["t1", "I work on site", "Operatives, trades and site workers"],
    ["t2", "I supervise a team or site", "Supervisors, foremen and site managers"],
    ["t3", "I manage projects or a business", "Project, contracts and design managers, directors"],
    ["team", "I'm training a team", "Different roles across your business"]
  ];

  var CSS = [
    ".bsx{--nv:#1d2560;--or:#ff8c04;--bl:#4c6bd8;--sf:#f4f5f9;--bd:#dde3f0;--tx:#3a3f55;--mu:#6b7394;color:var(--tx);font-size:16px;line-height:1.55;text-align:left;position:relative;z-index:20}",
    ".bsx *{box-sizing:border-box}",
    ".bsx-card{background:#fff;border-radius:16px;box-shadow:0 10px 30px rgba(29,37,96,.12);padding:28px;margin:24px auto 0;max-width:1000px}",
    ".bsx-ask{text-align:center;font-size:20px;font-weight:700;color:var(--nv);margin:0 0 18px!important}",
    ".bsx-opts{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))}",
    ".bsx-opt{display:flex;flex-direction:column;gap:6px;background:var(--sf);border:2px solid transparent;border-radius:12px;padding:18px;cursor:pointer;user-select:none;position:relative;z-index:21;transition:border-color .15s,background .15s}",
    ".bsx-opt b{color:var(--nv);font-size:17px;line-height:1.3}",
    ".bsx-opt span{color:var(--mu);font-size:14px;line-height:1.4}",
    ".bsx-opt:hover{border-color:var(--bd);background:#fff}",
    ".bsx-opt.on{border-color:var(--or);background:#fff7ec}",
    ".bsx-opt:focus-visible{outline:2px solid var(--bl);outline-offset:2px}",
    ".bsx-res{margin-top:26px;border-top:1px solid var(--bd);padding-top:24px;outline:none;animation:bsxIn .35s ease}",
    "@keyframes bsxIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}",
    ".bsx-res h3{color:var(--nv)!important;font-size:26px!important;margin:0 0 8px!important;line-height:1.25!important}",
    ".bsx-meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 4px}",
    ".bsx-meta span{background:var(--sf);border-radius:20px;padding:6px 12px;font-size:14px;font-weight:700;color:var(--nv)}",
    ".bsx-meta span.p{background:#fff7ec;color:#b35f00}",
    ".bsx-tbl{width:100%;border-collapse:collapse;margin-top:12px}",
    ".bsx-tbl td{padding:10px 8px;border-bottom:1px solid var(--bd);vertical-align:top}",
    ".bsx-tbl td:first-child{font-weight:700;color:var(--nv)}",
    ".bsx-btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:20px}",
    ".bsx-btn{display:inline-block;padding:12px 24px;border-radius:30px;font-weight:700;text-decoration:none!important;font-size:16px;position:relative;z-index:21}",
    ".bsx-btn.or{background:var(--or);color:#fff!important}",
    ".bsx-btn.gh{border:2px solid var(--nv);color:var(--nv)!important}",
    ".bsx-small{font-size:14px;color:var(--mu);margin-top:14px!important}",
    ".bsx-small a{color:var(--nv)!important;font-weight:700}"
  ].join("");

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function result(key) {
    if (key === "team") {
      return "<h3>Match each role to a tier</h3><p>Most employers put their site teams on Tier 1, supervisors on Tier 2 and managers on Tier 3, so everyone learns what the Act means for their own role.</p>" +
        '<table class="bsx-tbl"><tr><td>Operatives and trades</td><td>Tier 1: Practitioner, ' + TIERS.t1.price + "</td></tr>" +
        "<tr><td>Supervisors and site managers</td><td>Tier 2: Supervisor, " + TIERS.t2.price + "</td></tr>" +
        "<tr><td>Project, contracts and design managers, directors</td><td>Tier 3: Manager, " + TIERS.t3.price + "</td></tr></table>" +
        '<div class="bsx-btns"><a class="bsx-btn or" href="#enquire">Ask about team bookings</a><a class="bsx-btn gh" href="#tiers">Compare the tiers</a></div>' +
        '<p class="bsx-small">Rather talk? Call us on <a href="tel:02034884472">020 3488 4472</a>.</p>';
    }
    var t = TIERS[key];
    return "<h3>We'd recommend " + esc(t.n) + "</h3><p>" + esc(t.why) + "</p>" +
      '<div class="bsx-meta"><span class="p">' + t.price + "</span><span>" + t.time + " learning time</span><span>" + t.qs + "</span><span>CITB Assured</span></div>" +
      '<div class="bsx-btns"><a class="bsx-btn or" href="' + t.url + '">Buy ' + esc(t.n.split(": ")[0]) + '</a><a class="bsx-btn gh" href="#tiers">Compare the tiers</a></div>' +
      '<p class="bsx-small">Training a team? <a href="#enquire">Ask about team bookings</a> or call us on <a href="tel:02034884472">020 3488 4472</a>.</p>';
  }

  function mount(el) {
    if (el.getAttribute("data-bsx") === "1") return;
    el.setAttribute("data-bsx", "1");
    el.innerHTML = '<div class="bsx"><div class="bsx-card"><p class="bsx-ask">Which sounds most like you?</p><div class="bsx-opts">' +
      CHOICES.map(function (c) { return '<div class="bsx-opt" role="button" tabindex="0" data-k="' + c[0] + '"><b>' + esc(c[1]) + "</b><span>" + esc(c[2]) + "</span></div>"; }).join("") +
      '</div><div class="bsx-res" style="display:none" aria-live="polite"></div></div></div>';
  }

  function pick(opt) {
    var root = opt.closest(".cst-bsa-finder"); if (!root) return;
    Array.prototype.forEach.call(root.querySelectorAll(".bsx-opt"), function (x) { x.classList.toggle("on", x === opt); x.setAttribute("aria-pressed", x === opt ? "true" : "false"); });
    var box = root.querySelector(".bsx-res");
    box.innerHTML = result(opt.getAttribute("data-k"));
    box.style.display = "block";
    var go = function () {
      var r = box.getBoundingClientRect(), cur = window.pageYOffset || document.documentElement.scrollTop;
      var y = r.top + cur - (window.innerWidth < 768 ? 100 : Math.round(window.innerHeight * 0.35));
      if (Math.abs(y - cur) > 40) { try { window.scrollTo({ top: y, behavior: "smooth" }); } catch (e) { window.scrollTo(0, y); } }
      box.setAttribute("tabindex", "-1"); try { box.focus({ preventScroll: true }); } catch (e) {}
    };
    if (window.requestAnimationFrame) requestAnimationFrame(go); else setTimeout(go, 0);
    try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "bsa_finder", bsa_choice: opt.getAttribute("data-k") }); } catch (e) {}
  }

  /* Same approach as the other hubs: window capture plus a position check, so theme layers or other
     scripts can't swallow the taps. */
  function optAt(x, y) {
    var o = document.querySelectorAll(".cst-bsa-finder .bsx-opt");
    for (var i = 0; i < o.length; i++) { var r = o[i].getBoundingClientRect(); if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return o[i]; }
    return null;
  }
  var last = 0;
  function onPoint(e) {
    var t = e.target && e.target.closest ? e.target.closest(".cst-bsa-finder .bsx-opt") : null;
    if (!t) { var pt = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : e; if (pt.clientX != null) t = optAt(pt.clientX, pt.clientY); }
    if (!t) return;
    var now = Date.now(); if (now - last < 350) return; last = now;
    pick(t);
  }
  ["click", "pointerup"].forEach(function (ev) { window.addEventListener(ev, onPoint, true); });
  window.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var t = e.target && e.target.closest ? e.target.closest(".cst-bsa-finder .bsx-opt") : null;
    if (t) { e.preventDefault(); pick(t); }
  }, true);

  function init() {
    if (!document.getElementById("bsx-css")) { var s = document.createElement("style"); s.id = "bsx-css"; s.textContent = CSS; document.head.appendChild(s); }
    try { console.log("[bsx] ready v2"); } catch (e) {}
    Array.prototype.forEach.call(document.querySelectorAll(".cst-bsa-finder"), mount);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

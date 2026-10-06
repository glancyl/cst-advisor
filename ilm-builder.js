/*!
 * CST Training ILM unit builder widget (v15: site-matched colours, styles for the BoldGrid ILM page via .ilmx)
 * Host on GitHub Pages, load with ?v=N cache buster.
 *
 * Mount on any page:
 * <div class="cst-ilm-builder" data-level="5" data-qual="choose"></div>
 *   data-level       5 (add more levels to LEVELS below)
 *   data-qual        award | certificate | diploma | choose (shows a switcher)
 *   data-form-guid   optional, HubSpot form GUID (defaults to FORM_GUID below)
 *   data-phone       optional, phone number shown on the call button
 */
(function () {
  "use strict";

  var PORTAL_ID = "19996504";
  var FORM_GUID = "82962984-45f3-49f7-af62-fc7da9f14b2f"; // Course Builder Enquiry
  var DEFAULT_PHONE = "020 3488 4472";

  var QUALS = {
    award:       { label: "Award",       optional: 1, induction: "1 hour",  tutorial: "At least 3 hours" },
    certificate: { label: "Certificate", optional: 3, induction: "2 hours", tutorial: "At least 7 hours" },
    diploma:     { label: "Diploma",     optional: 8, induction: "2 hours", tutorial: "At least 7 hours" }
  };

  var GROUPS = [
    { id: "self",   name: "You and your development" },
    { id: "people", name: "People and culture" },
    { id: "ops",    name: "Operations and delivery" },
    { id: "money",  name: "Finance and data" },
    { id: "strat",  name: "Strategy and change" },
    { id: "rel",    name: "Relationships and partners" }
  ];

  var LEVELS = {
    5: {
      title: "ILM Level 5 Operational Leadership and Management Skills",
      mandatory: "501",
      fallback: ["503", "514", "502", "515", "509", "525"],
      units: [
        ["501","Assessing own leadership performance","self","Reflect on how you lead, gather feedback and plan where to grow.",true],
        ["502","Managing own continuing personal and professional development","self","Plan, record and review your own development."],
        ["503","Managing people","people","Direct, support and manage the performance of your team."],
        ["504","Leading people and organisational culture","people","Shape how your team works and how culture is set."],
        ["505","Coaching and mentoring in a leadership role","people","Develop others through coaching and mentoring."],
        ["506","Promoting equity of opportunity, diversity and inclusion","people","Build fair, inclusive practice into how you manage."],
        ["507","Leading and managing wellbeing in the workplace","people","Look after your team's wellbeing as part of the job."],
        ["508","Managing operational workforce planning","ops","Match people and skills to the work coming up."],
        ["509","Project management","ops","Plan, run and close projects to time and budget."],
        ["512","Optimising the use of technology","ops","Get more from the systems and tools you use."],
        ["513","Managing business risk","ops","Spot, assess and control risk in your area."],
        ["516","Managing resources","ops","Make the best use of people, kit and materials."],
        ["517","Business process engineering","ops","Map and improve how work flows through the business."],
        ["518","Managing quality","ops","Set and maintain the standards your work must meet."],
        ["520","Operational planning and reporting","ops","Turn plans into targets and report on progress."],
        ["510","Managing operational finance","money","Manage budgets and costs in your area."],
        ["511","Making a financial case","money","Put the numbers behind a proposal or investment."],
        ["523","Data driven decision making","money","Use data to inform and justify decisions."],
        ["514","Problem-solving and decision-making","strat","Work through problems and make sound decisions."],
        ["515","Leading innovation and change","strat","Lead your team through change and new ways of working."],
        ["519","Contributing to the delivery of organisational strategy","strat","Link your team's work to the wider strategy."],
        ["521","Organisational culture and ethics","strat","Understand and influence values and ethical practice."],
        ["522","Organisational sustainability","strat","Build sustainable practice into operations."],
        ["527","Developing products and services","strat","Take a new product or service from idea to delivery."],
        ["524","Developing and managing collaborative relationships","rel","Build working relationships that get results."],
        ["525","Managing stakeholder relationships","rel","Identify stakeholders and keep them on side."],
        ["526","Working with partners","rel","Work effectively with external partners and suppliers."]
      ]
    }
  };

  var CSS = [
    ".ilmb{--n:#1d2560;--o:#ff8c04;--bg:#F4F5F9;--s:#FFF;--ink:#1B1F33;--mut:#565C75;--ln:#DCDFEA;--ns:#E7E9F3;",
    "--hd:'Alata',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Arial,sans-serif;",
    "--bd:'Asap',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Arial,sans-serif;",
    "font-family:var(--bd);color:var(--ink);font-size:1.0625rem;line-height:1.55;background:var(--bg);padding:40px 20px;border-radius:14px;box-sizing:border-box}",
    ".ilmb *,.ilmb *::before,.ilmb *::after{box-sizing:border-box}",
    ".ilmb :focus-visible{outline:3px solid var(--o);outline-offset:2px;border-radius:4px}",
    ".ilmb-in{max-width:1120px;margin:0 auto}",
    ".ilmb h2,.ilmb h3{font-family:var(--hd);line-height:1.2;margin:0}",
    ".ilmb h2{font-size:clamp(1.5rem,3.2vw,2rem);font-weight:700;color:var(--n)}",
    ".ilmb h3{font-size:1.05rem;font-weight:600}",
    ".ilmb p{margin:0 0 .8em}",
    ".ilmb-lead{color:var(--mut);max-width:62ch;font-size:1.1rem;margin-top:10px!important}",
    ".ilmb-ev{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;margin-top:20px}",
    ".ilmb-evc{background:var(--s);border:1px solid var(--ln);border-top:3px solid var(--o);border-radius:10px;padding:14px 16px}",
    ".ilmb-evc b{display:block;font-family:var(--hd);font-weight:600;color:var(--n);margin-bottom:4px}",
    ".ilmb-evc span{display:block;font-size:.93rem;color:var(--mut);line-height:1.45}",
    ".ilmb-tabwrap{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:0 0 20px}",
    ".ilmb-tablabel{font-family:var(--hd);font-weight:600;color:var(--n);font-size:1rem}",
    ".ilmb-tabs{display:flex;gap:8px;margin:0;flex-wrap:wrap}",
    ".ilmb-tabs button,.ilmb-chip{font:inherit;font-weight:600;padding:9px 16px;border-radius:99px;border:1.5px solid var(--ln);background:var(--s);color:var(--ink);cursor:pointer}",
    ".ilmb-tabs button[aria-selected=true]{background:var(--n);border-color:var(--n);color:#fff}",
    ".ilmb-grid{display:grid;grid-template-columns:1fr 290px;gap:32px;margin-top:28px;align-items:start}",
    "@media(max-width:900px){.ilmb-grid{grid-template-columns:1fr}}",
    ".ilmb-suggest{background:var(--s);border:1px solid var(--ln);border-radius:10px;padding:18px 20px;margin-bottom:22px}",
    ".ilmb-suggest>p{font-weight:600;margin-bottom:10px}",
    ".ilmb-chips{display:flex;flex-wrap:wrap;gap:8px}",
    ".ilmb-chip{font-weight:400;font-size:.95rem;padding:7px 13px;background:transparent}",
    ".ilmb-chip[aria-pressed=true]{border-color:var(--o);background:rgba(255,138,0,.14)}",
    ".ilmb-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:12px}",
    ".ilmb-btn{text-decoration:none;display:inline-block;font:inherit;font-weight:700;padding:11px 22px;border-radius:30px;border:0;cursor:pointer;background:var(--n);color:#fff}",
    ".ilmb-btn.ghost{background:transparent;color:var(--ink);border:1.5px solid var(--ln)}",
    ".ilmb-btn.or{background:var(--o);color:#1B1F33}",
    ".ilmb-btn[disabled]{opacity:.6;cursor:wait}",
    ".ilmb-group{margin-bottom:22px}",
    ".ilmb-group h3{font-size:1rem;color:var(--mut);margin-bottom:10px}",
    ".ilmb-units{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}",
    ".ilmb-unit{font:inherit;text-align:left;display:block;width:100%;background:var(--s);color:var(--ink);border:1.5px solid var(--ln);border-radius:10px;padding:12px 14px;cursor:pointer;transition:border-color .15s}",
    ".ilmb-unit .c{font-family:var(--hd);font-weight:600;font-size:.85rem;color:var(--mut)}",
    ".ilmb-unit .nm{display:block;font-weight:700;margin:2px 0 4px;line-height:1.3}",
    ".ilmb-unit .d{display:block;font-size:.93rem;color:var(--mut);line-height:1.4}",
    ".ilmb-unit[aria-pressed=true]{border-color:var(--o);box-shadow:inset 4px 0 0 var(--o)}",
    ".ilmb-unit[aria-pressed=true]:not(.lk) .c::after{content:' selected';color:var(--o)}",
    ".ilmb-unit[disabled]{cursor:not-allowed;opacity:.45}",
    ".ilmb-unit.lk{cursor:default;border-style:dashed}",
    ".ilmb-ladder{position:sticky;top:110px;background:var(--s);border:1px solid var(--ln);border-radius:12px;padding:20px}",
    ".ilmb-ladder .t{font-family:var(--hd);font-weight:600;color:var(--n);margin-bottom:8px}",
    ".ilmb-ladder .ct{color:var(--mut);font-size:.95rem;margin-bottom:14px}",
    ".ilmb-rungs{display:flex;flex-direction:column-reverse;gap:6px;margin:0;padding:0;list-style:none}",
    ".ilmb-rung{display:flex;gap:10px;align-items:center;min-height:34px;border-radius:7px;padding:6px 10px;background:var(--bg);font-size:.92rem;line-height:1.25;border-left:4px solid var(--ln);margin:0}",
    ".ilmb-rung.f{border-left-color:var(--o);background:var(--ns)}",
    ".ilmb-rung.m{border-left-color:var(--n)}",
    ".ilmb-rung b{font-family:var(--hd);font-weight:600;min-width:30px}",
    ".ilmb-rung .e{color:var(--mut);font-style:italic}",
    ".ilmb-done{display:none;background:rgba(255,138,0,.14);border-radius:8px;padding:10px 12px;font-weight:600;margin-top:12px;font-size:.95rem}",
    ".ilmb-ladder.full .ilmb-done{display:block}",
    ".ilmb-enq{display:none}",
    ".ilmb.ilmb-full .ilmb-enq{display:inline-block}",
    ".ilmb.ilmb-full .ilmb-enq-l{display:block;width:100%;text-align:center;margin-top:10px}",
    ".ilmb-cta{scroll-margin-top:120px}",
    ".ilmb-note{font-size:.88rem;color:var(--mut);margin:12px 0 0!important}",
    ".ilmb-cta{background:var(--n);color:#fff;border-radius:12px;padding:32px 28px;margin-top:40px}",
    ".ilmb-cta h2{color:#fff}",
    ".ilmb-cta .ilmb-lead{color:rgba(255,255,255,.82)}",
    ".ilmb-form{margin-top:22px;display:grid;grid-template-columns:1fr 1fr;gap:14px 16px;max-width:720px}",
    ".ilmb-form .fl{grid-column:1/-1}",
    "@media(max-width:600px){.ilmb-form{grid-template-columns:1fr}}",
    ".ilmb-form label{display:block;color:#fff;font-weight:600;margin-bottom:6px;font-size:.95rem}",
    ".ilmb-form input,.ilmb-form textarea,.ilmb-form select{display:block;width:100%;font:inherit;padding:11px 12px;border-radius:8px;border:1.5px solid transparent;background:#fff;color:#1B1F33;margin:0}",
    ".ilmb-form textarea{min-height:110px}",
    ".ilmb-sum{background:rgba(255,255,255,.08);border-radius:10px;padding:14px 16px;font-size:.95rem;color:rgba(255,255,255,.9);white-space:pre-wrap;max-height:220px;overflow:auto}",
    ".ilmb-status{grid-column:1/-1;font-weight:600;min-height:1.4em;color:#fff;margin:0!important}",
    ".ilmb-status.err{color:#FFC680}",
    ".ilmb-consent{grid-column:1/-1;font-size:.88rem;color:rgba(255,255,255,.72);margin:0!important}",
    ".ilmb-cta .ilmb-btn.ghost{color:#fff;border-color:rgba(255,255,255,.4)}",
    ".ilmb-thanks{display:none;margin-top:22px;max-width:640px;background:rgba(255,255,255,.08);border-left:4px solid var(--o);border-radius:8px;padding:18px 20px}",
    ".ilmb-thanks h3{margin-bottom:6px;color:#fff}",
    "@media(prefers-reduced-motion:reduce){.ilmb *{transition:none!important}}"
  ].join("");

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function getCookie(n) {
    var m = document.cookie.match(new RegExp("(?:^|; )" + n + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : undefined;
  }
  function field(wrap, id, label, type, opts) {
    opts = opts || {};
    var d = el("div", opts.full ? "fl" : null);
    var l = el("label", null, label); l.htmlFor = id; d.appendChild(l);
    var i;
    if (type === "textarea") i = el("textarea");
    else if (type === "select") {
      i = el("select");
      opts.options.forEach(function (o) { var op = el("option", null, o); op.value = o; i.appendChild(op); });
    } else { i = el("input"); i.type = type; }
    i.id = id;
    if (opts.auto) i.autocomplete = opts.auto;
    d.appendChild(i); wrap.appendChild(d);
    return i;
  }

  var STATES = {};

  // Styles for the ILM page content (.ilmp). WordPress strips <style> tags
  // from page content, so they are injected from here instead.
  var PAGE_CSS = ".ilmp{--n:#1C2560;--o:#FF8A00;--bg:#F4F5F9;--ink:#1B1F33;--mut:#565C75;--ln:#DCDFEA;--ns:#E7E9F3;font-family:'Asap',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Arial,sans-serif;color:var(--ink);font-size:1.0625rem;line-height:1.6}.ilmp *{box-sizing:border-box}.ilmp h1,.ilmp h2,.ilmp h3{font-family:'Alata',ui-sans-serif,system-ui,Arial,sans-serif;color:var(--n);line-height:1.2;margin:0 0 12px}.ilmp h1{font-size:clamp(1.9rem,4.6vw,2.8rem)}.ilmp h2{font-size:clamp(1.45rem,3vw,1.9rem)}.ilmp h3{font-size:1.1rem}.ilmp p{margin:0 0 .9em;max-width:none}.ilmp-sec{position:relative;padding:56px max(20px,calc((100% - 1120px)/2));background:#fff;box-shadow:0 0 0 100vmax #fff;clip-path:inset(0 -100vmax)}.ilmp-sec.alt{background:var(--bg);box-shadow:0 0 0 100vmax var(--bg)}.ilmp-sec.hero{background:#4c6bd8;box-shadow:0 0 0 100vmax #4c6bd8;color:#fff;padding-top:64px;padding-bottom:64px}.ilmp-sec.hero h1{color:#fff}.ilmp-sec.hero p{color:rgba(255,255,255,.88)}.ilmp-sec.hero .ilmp-lead{color:#fff}.ilmp-lead{font-size:1.15rem;color:var(--mut)}.ilmp-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-top:28px}.ilmp-fact{background:var(--bg);border-left:4px solid var(--o);border-radius:8px;padding:14px 16px}.ilmp-fact b{display:block;font-family:'Alata',sans-serif;font-size:1.5rem;color:var(--n)}.ilmp-fact span{font-size:.95rem;color:var(--mut)}.hero .ilmp-fact{background:rgba(255,255,255,.14);border-left-color:#fff}.hero .ilmp-fact b{color:#fff}.hero .ilmp-fact span{color:rgba(255,255,255,.9)}.ilmp-tw{overflow-x:auto;margin-top:20px;border:1px solid var(--ln);border-radius:10px}.ilmp table{border-collapse:collapse;width:100%;min-width:560px;background:#fff;margin:0}.ilmp th,.ilmp td{padding:13px 16px;text-align:left;border-bottom:1px solid var(--ln);vertical-align:top}.ilmp thead th{background:var(--n);color:#fff;font-family:'Alata',sans-serif;font-weight:400}.ilmp tbody th{font-weight:700;background:var(--bg)}.ilmp tr:last-child td,.ilmp tr:last-child th{border-bottom:0}.ilmp-steps{list-style:none;padding:0;margin:24px 0 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:0;counter-reset:s}.ilmp-steps li{counter-increment:s;padding:16px 18px 16px 0;border-top:3px solid var(--ln);margin:0}.ilmp-steps li.k{border-top-color:var(--o)}.ilmp-steps li::before{content:counter(s);display:block;font-family:'Alata',sans-serif;font-size:1.5rem;color:var(--n)}.ilmp-steps p{color:var(--mut);font-size:.98rem;margin:4px 0 0}.ilmp-ev{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin-top:24px}.ilmp-ev>div{background:#fff;border:1px solid var(--ln);border-radius:10px;padding:18px 20px}.ilmp-ev p{font-size:.98rem;color:var(--mut);margin:0}.ilmp-ev ul{margin:8px 0 0;padding-left:1.1em;font-size:.98rem;color:var(--mut)}.ilmp details{border-bottom:1px solid var(--ln);padding:16px 0}.ilmp details:first-of-type{border-top:1px solid var(--ln)}.ilmp summary{cursor:pointer;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;gap:16px}.ilmp summary::-webkit-details-marker{display:none}.ilmp summary::after{content:'+';font-size:1.4rem;line-height:1;color:var(--o);flex:none}.ilmp details[open] summary::after{content:'\u2212'}.ilmp details p{margin:10px 0 0;color:var(--mut)}.ilmp-faq{margin-top:20px}.ilmp :focus-visible{outline:3px solid var(--o);outline-offset:2px}.ilmp .ilmb{background:transparent;padding:0;border-radius:0}.ilmp-sec.usps{padding-top:28px;padding-bottom:28px;background:var(--bg);box-shadow:0 0 0 100vmax var(--bg)}.ilmp-usps{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px}.ilmp-usp{display:flex;gap:10px;align-items:flex-start;background:#fff;border:1px solid var(--ln);border-radius:10px;padding:14px 16px;font-size:.93rem;line-height:1.45;color:var(--mut)}.ilmp-usp svg{flex:none;width:20px;height:20px;margin-top:3px;color:var(--o)}.ilmp-usp b{display:block;font-family:'Alata',sans-serif;font-weight:400;font-size:1rem;color:var(--n);margin-bottom:2px}.ilmp .ilmb-lead{max-width:none}/* New BoldGrid ILM page (.ilmx) */.ilmx-tw{overflow-x:auto;border-radius:12px;margin-top:20px;border:1px solid #dcdfea}.ilmx-tw table{border-collapse:collapse;width:100%;min-width:560px;background:#fff;margin:0}.ilmx-tw th,.ilmx-tw td{padding:14px 16px;text-align:left;border-bottom:1px solid #dcdfea;vertical-align:top;font-size:16px}.ilmx-tw thead th{background:#1d2560;color:#fff;font-weight:700}.ilmx-tw tbody th{background:#f4f5f9;color:#1d2560;font-weight:700}.ilmx-tw tr:last-child td,.ilmx-tw tr:last-child th{border-bottom:0}.ilmx-ev{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin:10px 0 0}.ilmx-card{background:#fff;border-radius:15px;padding:24px 26px;height:100%}.ilmx-card h3{color:#1d2560;font-size:20px;font-weight:700;margin:0 0 8px}.ilmx-card p,.ilmx-card li{color:#565c75;font-size:16px;line-height:1.55;margin:0}.ilmx-card ul{margin:8px 0 0;padding-left:1.1em}.ilmx-faq details{border-bottom:1px solid #dcdfea;padding:18px 0}.ilmx-faq details:first-of-type{border-top:1px solid #dcdfea}.ilmx-faq summary{cursor:pointer;font-weight:700;font-size:18px;color:#1d2560;list-style:none;display:flex;justify-content:space-between;gap:16px}.ilmx-faq summary::-webkit-details-marker{display:none}.ilmx-faq summary::after{content:'+';font-size:26px;line-height:1;color:#ff8c04;flex:none}.ilmx-faq details[open] summary::after{content:'\u2212'}.ilmx-faq details p{margin:10px 0 0;color:#565c75}.ilmx-build .ilmb{background:transparent;padding:0;border-radius:0}.ilmx-build .ilmb-lead{max-width:none}";

  function injectPageCss() {
    if (document.getElementById("ilmp-css") || !document.querySelector(".ilmp,.ilmx")) return;
    var s = document.createElement("style"); s.id = "ilmp-css"; s.textContent = PAGE_CSS;
    document.head.appendChild(s);
  }

  // FAQ dropdowns: handled at document level so they keep working even if
  // the theme re-renders the page content or blocks native toggling.
  document.addEventListener("click", function (e) {
    var s = e.target && e.target.closest ? e.target.closest(".ilmp summary,.ilmx-faq summary") : null;
    if (!s || !s.parentNode) return;
    e.preventDefault();
    var d = s.parentNode;
    if (d.hasAttribute("open")) d.removeAttribute("open"); else d.setAttribute("open", "");
  }, true);

  function injectCss() {
    if (document.getElementById("ilmb-css")) return;
    var s = document.createElement("style"); s.id = "ilmb-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function mount(root, idx) {
    var level = root.getAttribute("data-level") || "5";
    var L = LEVELS[level];
    if (!L) return;
    var qualAttr = (root.getAttribute("data-qual") || "choose").toLowerCase();
    var formGuid = root.getAttribute("data-form-guid") || FORM_GUID;
    var phone = root.getAttribute("data-phone") || DEFAULT_PHONE;
    var uid = "ilmb" + idx + "-";

    var UNITS = L.units.map(function (u) { return { code: u[0], name: u[1], group: u[2], desc: u[3], mandatory: !!u[4] }; });
    var byCode = {}; UNITS.forEach(function (u) { byCode[u.code] = u; });
    var optionalCount = UNITS.filter(function (u) { return !u.mandatory; }).length;

    var key = level + "|" + qualAttr + "|" + idx;
    var state = STATES[key] || (STATES[key] = { qual: QUALS[qualAttr] ? qualAttr : "diploma", picks: [], focus: [] });
    root._ilmbMounted = true;
    function max() { return QUALS[state.qual].optional; }

    root.classList.add("ilmb");
    root.innerHTML = "";
    var inner = el("div", "ilmb-in"); root.appendChild(inner);

    var h = el("h2"); inner.appendChild(h);
    var lead = el("p", "ilmb-lead"); inner.appendChild(lead);

    var evStrip = el("div", "ilmb-ev"); inner.appendChild(evStrip);
    [
      ["No exams or tests", "Every unit is evidenced from work you already do, with no written assignments."],
      ["Recorded discussions", "One video call with your assessor often covers most of your units."],
      ["Witness testimony", "A single statement from your manager can count across several units."],
      ["Online portfolio", "Upload work plans, minutes or short videos and get feedback on each piece."]
    ].forEach(function (e) {
      var c = el("div", "ilmb-evc");
      c.appendChild(el("b", null, e[0]));
      c.appendChild(el("span", null, e[1]));
      evStrip.appendChild(c);
    });

    var tabsWrap = el("div", "ilmb-tabwrap");
    tabsWrap.appendChild(el("span", "ilmb-tablabel", "Choose your qualification:"));
    var tabs = el("div", "ilmb-tabs"); tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Choose your qualification");
    tabsWrap.appendChild(tabs);
    if (qualAttr === "choose") {
      Object.keys(QUALS).forEach(function (k) {
        var b = el("button", null, QUALS[k].label); b.type = "button"; b.setAttribute("role", "tab");
        b.addEventListener("click", function () {
          state.qual = k; state.picks = state.picks.slice(0, max()); render();
        });
        b.setAttribute("data-k", k); tabs.appendChild(b);
      });
      inner.insertBefore(tabsWrap, h);
    }

    var grid = el("div", "ilmb-grid"); inner.appendChild(grid);
    var left = el("div"); grid.appendChild(left);

    var sug = el("div", "ilmb-suggest"); left.appendChild(sug);
    sug.appendChild(el("p", null, "Not sure where to start? Choose up to three areas you spend most time on. We'll suggest units as soon as you pick three."));
    var chips = el("div", "ilmb-chips"); sug.appendChild(chips);
    var focusGroups = GROUPS.filter(function (g) { return g.id !== "self"; });
    focusGroups.forEach(function (g) {
      var c = el("button", "ilmb-chip", g.name); c.type = "button"; c.setAttribute("aria-pressed", "false");
      c.addEventListener("click", function () {
        var ix = state.focus.indexOf(g.id);
        if (ix > -1) state.focus.splice(ix, 1);
        else { if (state.focus.length >= 3) state.focus.shift(); state.focus.push(g.id); }
        Array.prototype.forEach.call(chips.children, function (ch, k) {
          ch.setAttribute("aria-pressed", state.focus.indexOf(focusGroups[k].id) > -1 ? "true" : "false");
        });
        // Three areas picked: suggest straight away, without jumping the page
        if (state.focus.length === 3) suggest(false);
      });
      chips.appendChild(c);
    });
    var row = el("div", "ilmb-row"); sug.appendChild(row);
    var sugBtn = el("button", "ilmb-btn"); sugBtn.type = "button"; row.appendChild(sugBtn);
    var clrBtn = el("button", "ilmb-btn ghost", "Clear picks"); clrBtn.type = "button"; row.appendChild(clrBtn);
    var enqBtn = el("button", "ilmb-btn or ilmb-enq", "Enquire now"); enqBtn.type = "button"; row.appendChild(enqBtn);

    function suggest(scroll) {
      var pools = (state.focus.length ? state.focus : ["people", "ops", "strat"]).map(function (g) {
        return UNITS.filter(function (u) { return u.group === g && !u.mandatory; }).map(function (u) { return u.code; });
      });
      var picks = [], k = 0, cap = max();
      while (picks.length < cap && pools.some(function (p) { return p.length; })) {
        var p = pools[k % pools.length]; if (p.length) picks.push(p.shift()); k++;
      }
      L.fallback.forEach(function (c) { if (picks.length < cap && picks.indexOf(c) < 0) picks.push(c); });
      state.picks = picks.slice(0, cap);
      render();
      if (scroll) rungs.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    sugBtn.addEventListener("click", function () { suggest(true); });
    clrBtn.addEventListener("click", function () { state.picks = []; render(); });

    var unitBtns = {};
    GROUPS.forEach(function (g) {
      var box = el("div", "ilmb-group"); box.appendChild(el("h3", null, g.name));
      var ug = el("div", "ilmb-units");
      UNITS.filter(function (u) { return u.group === g.id; }).forEach(function (u) {
        var b = el("button", "ilmb-unit" + (u.mandatory ? " lk" : "")); b.type = "button";
        b.appendChild(el("span", "c", u.code + (u.mandatory ? " mandatory" : "")));
        b.appendChild(el("span", "nm", u.name));
        b.appendChild(el("span", "d", u.desc));
        if (u.mandatory) { b.setAttribute("aria-pressed", "true"); b.setAttribute("aria-disabled", "true"); }
        else b.addEventListener("click", function () {
          var ix = state.picks.indexOf(u.code);
          if (ix > -1) state.picks.splice(ix, 1); else if (state.picks.length < max()) state.picks.push(u.code);
          render();
        });
        unitBtns[u.code] = b; ug.appendChild(b);
      });
      box.appendChild(ug); left.appendChild(box);
    });

    var ladder = el("aside", "ilmb-ladder"); ladder.setAttribute("aria-live", "polite"); grid.appendChild(ladder);
    var lt = el("div", "t"); ladder.appendChild(lt);
    var lc = el("div", "ct"); ladder.appendChild(lc);
    var rungs = el("ol", "ilmb-rungs"); ladder.appendChild(rungs);
    var done = el("div", "ilmb-done"); ladder.appendChild(done);
    var enqBtn2 = el("button", "ilmb-btn or ilmb-enq ilmb-enq-l", "Enquire now"); enqBtn2.type = "button"; ladder.appendChild(enqBtn2);
    ladder.appendChild(el("p", "ilmb-note", "You can change units at induction. Nothing here is final."));

    // Enquiry form
    var cta = el("div", "ilmb-cta"); cta.id = uid + "enquire"; inner.appendChild(cta);
    function goToForm() {
      cta.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () { try { fFirst.focus({ preventScroll: true }); } catch (e) { fFirst.focus(); } }, 600);
    }
    enqBtn.addEventListener("click", goToForm);
    enqBtn2.addEventListener("click", goToForm);
    cta.appendChild(el("h2", null, "Send your picks to our team"));
    cta.appendChild(el("p", "ilmb-lead", "We'll come back to you with a quote based on your units, and you could be booked in for induction within a week."));
    var form = el("form", "ilmb-form"); form.noValidate = true; cta.appendChild(form);
    var fFirst = field(form, uid + "first", "First name", "text", { auto: "given-name" });
    var fLast = field(form, uid + "last", "Last name", "text", { auto: "family-name" });
    var fEmail = field(form, uid + "email", "Email", "email", { auto: "email" });
    var fPhone = field(form, uid + "phone", "Phone", "tel", { auto: "tel" });
    var fLearners = field(form, uid + "learners", "How many learners?", "select", { options: ["1", "2", "3", "4", "5", "6 to 10", "More than 10"] });
    var fStart = field(form, uid + "start", "When would you like to start?", "select", { options: ["As soon as possible", "Within 1 month", "1 to 3 months", "3 months or more", "Not sure yet"] });
    var fQ = field(form, uid + "q", "Any questions for us? (optional)", "textarea", { full: true });
    var sumWrap = el("div", "fl"); sumWrap.appendChild(el("label", null, "What we'll receive"));
    var sum = el("div", "ilmb-sum"); sumWrap.appendChild(sum); form.appendChild(sumWrap);
    form.appendChild(el("p", "ilmb-consent", "We'll use these details to reply about your qualification. See our privacy policy at csttraining.co.uk."));
    var brow = el("div", "fl ilmb-row"); brow.style.marginTop = "0"; form.appendChild(brow);
    var sendBtn = el("button", "ilmb-btn or", "Send my picks to CST Training"); sendBtn.type = "submit"; brow.appendChild(sendBtn);
    var call = el("a", "ilmb-btn ghost", "Or call " + phone); call.href = "tel:" + phone.replace(/\s/g, ""); brow.appendChild(call);
    var status = el("p", "ilmb-status"); status.setAttribute("role", "status"); form.appendChild(status);
    var thanks = el("div", "ilmb-thanks"); thanks.tabIndex = -1; cta.appendChild(thanks);
    thanks.appendChild(el("h3", null, "Thanks, we've got your picks."));
    thanks.appendChild(el("p", null, "Our team will be in touch shortly. If it's urgent, call " + phone + "."));

    function qualName() { return "ILM Level " + level + " " + QUALS[state.qual].label; }
    function allCodes() { return [L.mandatory].concat(state.picks); }

    function summary() {
      var lines = [qualName() + ": unit picks", ""];
      lines.push(L.mandatory + " " + byCode[L.mandatory].name + " (mandatory)");
      if (!state.picks.length) lines.push("(no optional units picked yet)");
      state.picks.forEach(function (c) { lines.push(c + " " + byCode[c].name); });
      lines.push("");
      lines.push("Learners: " + fLearners.value);
      lines.push("Planned start: " + fStart.value);
      return lines.join("\n");
    }

    function render() {
      var q = QUALS[state.qual], m = max(), full = state.picks.length >= m, total = m + 1;
      h.textContent = "Build your " + q.label;
      lead.textContent = "Every " + q.label + " starts with unit " + L.mandatory + ". You then choose " + m +
        " of the " + optionalCount + " optional unit" + (m > 1 ? "s" : "") +
        ". Pick the ones that match the work you already do, so your evidence largely comes from your normal week. Your assessor confirms the final choice with you at induction.";
      Array.prototype.forEach.call(tabs.children, function (t) {
        t.setAttribute("aria-selected", t.getAttribute("data-k") === state.qual ? "true" : "false");
      });
      sugBtn.textContent = "Suggest " + m + " unit" + (m > 1 ? "s" : "");
      UNITS.forEach(function (u) {
        if (u.mandatory) return;
        var b = unitBtns[u.code], on = state.picks.indexOf(u.code) > -1;
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.disabled = !on && full;
      });
      lt.textContent = "Your " + q.label;
      lc.textContent = (state.picks.length + 1) + " of " + total + " units";
      rungs.innerHTML = "";
      var mand = el("li", "ilmb-rung m f"); mand.appendChild(el("b", null, L.mandatory));
      mand.appendChild(el("span", null, byCode[L.mandatory].name)); rungs.appendChild(mand);
      for (var i = 0; i < m; i++) {
        var c = state.picks[i], li = el("li", "ilmb-rung" + (c ? " f" : ""));
        if (c) { li.appendChild(el("b", null, c)); li.appendChild(el("span", null, byCode[c].name)); }
        else li.appendChild(el("span", "e", "Optional unit " + (i + 1)));
        rungs.appendChild(li);
      }
      done.textContent = "That's a full " + q.label + ". Send these picks to our team below.";
      enqBtn.textContent = enqBtn2.textContent = "Enquire about this " + q.label;
      ladder.classList.toggle("full", full);
      root.classList.toggle("ilmb-full", full);
      sum.textContent = summary();
    }

    fLearners.addEventListener("change", render);
    fStart.addEventListener("change", render);

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var first = fFirst.value.trim(), last = fLast.value.trim(), email = fEmail.value.trim(), ph = fPhone.value.trim();
      function err(t, f) { status.className = "ilmb-status err"; status.textContent = t; if (f) f.focus(); }
      if (!first || !last) return err("Add your first and last name.", first ? fLast : fFirst);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err("Enter a valid email address so we can reply.", fEmail);
      if (!ph) return err("Add a phone number so our team can talk your units through with you.", fPhone);

      var q = fQ.value.trim();
      var fields = [
        { name: "firstname", value: first },
        { name: "lastname", value: last },
        { name: "email", value: email },
        { name: "phone", value: ph },
        { name: "message", value: summary() + (q ? "\n\nQuestions:\n" + q : "") },
        { name: "enquiry_qualification", value: qualName() },
        { name: "enquiry_options_selected", value: allCodes().map(function (c) { return c + " " + byCode[c].name; }).join("; ") },
        { name: "enquiry_learners", value: fLearners.value },
        { name: "enquiry_start", value: fStart.value }
      ];
      var ctx = { pageUri: location.href, pageName: document.title };
      var hutk = getCookie("hubspotutk"); if (hutk) ctx.hutk = hutk;

      sendBtn.disabled = true; sendBtn.textContent = "Sending";
      status.className = "ilmb-status"; status.textContent = "";

      fetch("https://api.hsforms.com/submissions/v3/integration/submit/" + PORTAL_ID + "/" + formGuid, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: fields, context: ctx })
      }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      }).then(function () {
        try {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: "course_builder_submit", enquiry_qualification: qualName(), enquiry_options: allCodes().join(";") });
        } catch (e) {}
        form.style.display = "none"; thanks.style.display = "block"; thanks.focus();
      }).catch(function () {
        sendBtn.disabled = false; sendBtn.textContent = "Send my picks to CST Training";
        err("That didn't send. Please try again, or call " + phone + " and we'll take your picks over the phone.");
      });
    });

    render();
  }

  function init() {
    try {
      injectPageCss();
      var roots = document.querySelectorAll(".cst-ilm-builder");
      if (!roots.length) return;
      injectCss();
      Array.prototype.forEach.call(roots, function (r, i) {
        if (r._ilmbMounted) return;
        try { mount(r, i); } catch (e) { if (window.console) console.error("ILM builder:", e); }
      });
    } catch (e) {}
  }

  // Some theme scripts copy page content as HTML after load, which keeps the
  // look but strips click handlers. Watch for that and remount when it happens.
  var timer = null;
  function watch() {
    init();
    if (!window.MutationObserver || !document.body) return;
    new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(init, 150);
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", watch);
  else watch();
})();

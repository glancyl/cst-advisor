/*!
 * CST Training CMI unit builder widget (v5: CMI Project Management Level 3 and Level 5)
 * Separate from ilm-builder.js so the live ILM pages can't break.
 * Host on GitHub Pages, load with ?v=N cache buster (N matches this version).
 *
 * Mount on any page:
 * Level comparison page (Diploma at each level, with a level switcher):
 * <div class="cst-cmi-builder" data-level="3,5,7" data-default="5"></div>
 * Single level page (sizes at one level):
 * <div class="cst-cmi-builder" data-level="5" data-qual="choose"></div>
 *   data-level       3 | 5 | 7, or a comma list to compare levels (Diploma at each)
 *   data-default     with a comma list, the level selected first
 *   data-qual        single level only: award | certificate | diploma | choose (shows a switcher)
 *   data-form-guid   optional, HubSpot form GUID (defaults to FORM_GUID below)
 *   data-phone       optional, phone number shown on the call button
 *
 * Coaching and Mentoring comparison (mandatory units plus optional units):
 * <div class="cst-cmi-builder" data-quals="cm3,cm7" data-qual="cm3"></div>
 *   data-quals       comma list of keys from COACH (2+ shows a switcher)
 *   data-qual        which one is selected first
 *
 * Fixed-unit course page (every unit mandatory, so the learner picks a level, not units):
 * <div class="cst-cmi-course" data-course="pm" data-default="l5"></div>
 *   data-course      key in COURSES below (pm = Project Management)
 *   data-default     option key selected first (l3 | l5)
 *   data-heading     optional, replaces the section heading
 *   (own class so older script versions ignore it rather than showing the wrong builder)
 *
 * Version log
 *   v1  CMI Level 5 Award, Certificate and Diploma in Management and Leadership
 *   v2  CMI Level 3 and Level 7 Diplomas, level switcher, Group A minimum for Level 7
 *   v3  Enquiry form centred on the page
 *   v4  CMI Level 3 Diploma in Coaching and Mentoring and Level 7 Diploma in Leadership Coaching and Mentoring
 *   v5  CMI Project Management (Level 3 Award, Level 5 Certificate): fixed-unit level picker with centred enquiry form
 */
(function () {
  "use strict";
  if (window.__cstCmiBuilder) return;
  window.__cstCmiBuilder = true;

  var PORTAL_ID = "19996504";
  var FORM_GUID = "82962984-45f3-49f7-af62-fc7da9f14b2f"; // Course Builder Enquiry
  var DEFAULT_PHONE = "020 3488 4472";

  // Focus areas used by the "suggest units" chips
  var TOPICS = [
    { id: "people", name: "Leading people" },
    { id: "ops",    name: "Operations and projects" },
    { id: "money",  name: "Finance and data" },
    { id: "strat",  name: "Strategy and change" },
    { id: "rel",    name: "Customers and stakeholders" }
  ];

  /*
   * Each level:
   *   quals    credit bands per size. min/max credits, minUnits, plain-English range and rule
   *   themes   display groups, in CMI's own theme order
   *   bars     barred pairs: units that can't be taken together
   *   units    [code, name, theme, topic, credits, onlyFor (array of qual keys, optional)]
   *   gA       optional: theme id whose credits count towards a qual's gAmin (Level 7 Group A)
   */
  var LEVELS = {
    3: {
      title: "CMI Level 3",
      qualTitle: "in Principles of Management and Leadership",
      quals: {
        diploma: { label: "Diploma", min: 37, max: null, minUnits: 1, range: "at least 37",
                   rule: "Any combination of units counts." }
      },
      themes: [
        { id: "found",   name: "Foundations for Excellence" },
        { id: "people",  name: "Managing People and Developing Relationships" },
        { id: "results", name: "Delivering Results (Day to Day Activities)" },
        { id: "self",    name: "Managing Self" }
      ],
      bars: [],
      starter: "301",
      units: [
        ["301","Principles of Management and Leadership","found","people",7],
        ["302","Managing a Team to Achieve Results","people","people",6],
        ["303","Managing Individuals to be Effective in their Role","people","people",5],
        ["304","Principles of Communication in the Workplace","people","rel",5],
        ["305","Building Stakeholder Relationships using Effective Communication","people","rel",4],
        ["306","Principles of Equality, Diversity and Inclusive Working Practice","people","people",6],
        ["307","Developing the Knowledge, Skills and Abilities of Individuals and Teams","people","people",4],
        ["308","Managing Volunteers","people","people",5],
        ["309","Responding to Conflict in the Workplace","people","people",3],
        ["310","Supporting Teams and Individuals Through Change","people","strat",5],
        ["311","Contributing to the Delivery of a Project","results","ops",6],
        ["312","Managing Daily Activities to Achieve Results","results","ops",4],
        ["313","Developing and Sharing Good Practice","results","strat",5],
        ["314","Managing Budgets and Resources","results","money",5],
        ["315","Principles of Health and Safety in a Work Setting","results","ops",6],
        ["316","Monitoring Quality to Improve Outcomes","results","ops",5],
        ["317","Supporting the Delivery of Customer Service","results","rel",5],
        ["318","Managing Data and Information","results","money",5],
        ["319","Managing Meetings","results","rel",4],
        ["320","Presenting for Success","results","rel",5],
        ["321","Managing Own Personal and Professional Development","self","self",5]
      ]
    },
    5: {
      title: "CMI Level 5",
      qualTitle: "in Management and Leadership",
      quals: {
        award:       { label: "Award",       min: 4,  max: 12,   minUnits: 1, range: "4 to 12",
                       rule: "Pick at least one unit." },
        certificate: { label: "Certificate", min: 13, max: 36,   minUnits: 2, range: "13 to 36",
                       rule: "Pick at least two units." },
        diploma:     { label: "Diploma",     min: 37, max: null, minUnits: 6, range: "at least 37",
                       rule: "Pick at least six units. Unit 608 is open to you on the Diploma only." }
      },
      themes: [
        { id: "found",   name: "Foundations for Excellence" },
        { id: "people",  name: "Managing People and Developing Relationships" },
        { id: "results", name: "Delivering Results (Day to Day Activities)" },
        { id: "self",    name: "Managing Self" }
      ],
      bars: [["502","503"],["502","505"],["502","511"],["502","526"],["526","501"]],
      starter: "501",
      units: [
        ["501","Principles of Management and Leadership in an Organisational Context","found","strat",7],
        ["526","Principles of Leadership Practice","found","people",8],
        ["502","Principles of Developing, Managing and Leading Individuals and Teams to Achieve Success","people","people",6],
        ["503","Principles of Managing and Leading Individuals and Teams to Achieve Success","people","people",5],
        ["504","Managing Performance","people","people",5],
        ["505","Forming Successful Teams","people","people",4],
        ["506","Managing Equality, Diversity and Inclusion","results","people",5],
        ["507","Principles of Delivering Coaching and Mentoring","results","people",5],
        ["508","Principles of Developing a Skilled and Talented Workforce","results","people",4],
        ["509","Managing Stakeholder Relationships","results","rel",4],
        ["510","Managing Conflict","results","people",5],
        ["511","Principles of Recruiting, Selecting and Retaining Talent","results","people",5],
        ["512","Workforce Planning","results","ops",4],
        ["513","Managing Projects to Achieve Results","results","ops",6],
        ["514","Managing Change","results","strat",5],
        ["515","Creating and Delivering Operational Plans","results","ops",6],
        ["516","Planning, Procuring and Managing Resources","results","ops",6],
        // ["517","Principles of Innovation","results","strat",5],  // in CMI spec, not in the CST Training handbook. Uncomment if offered.
        ["518","Managing Risk","results","ops",6],
        ["519","Managing Quality and Continuous Improvement","results","ops",6],
        ["520","Managing Finance","results","money",6],
        ["521","Using Data and Information for Decision Making","results","money",5],
        ["522","Managing the Customer Experience","results","rel",5],
        ["523","Principles of Marketing Products and Services","results","rel",6],
        ["524","Conducting a Management Project","results","strat",10],
        ["608","Strategic Corporate Social Responsibility and Sustainability","results","strat",7,["diploma"]],
        ["525","Using Reflective Practice to Inform Personal and Professional Development","self","self",5]
      ]
    },
    7: {
      title: "CMI Level 7",
      qualTitle: "in Strategic Management and Leadership Practice",
      quals: {
        diploma: { label: "Diploma", min: 37, max: null, minUnits: 1, gAmin: 30, range: "at least 37",
                   rule: "At least 30 credits must come from Group A, and the other 7 can come from Group A or Group B." }
      },
      themes: [
        { id: "A", name: "Group A" },
        { id: "B", name: "Group B" }
      ],
      gA: "A",
      bars: [],
      starter: "701",
      units: [
        ["701","Strategic Leadership","A","people",11],
        ["702","Leading and Developing People to Optimise Performance","A","people",10],
        ["703","Collaboration and Partnerships","A","rel",7],
        ["704","Developing Organisational Strategy","A","strat",9],
        ["705","Leading Strategic Change","A","strat",8],
        ["706","Finance for Strategic Leaders","A","money",8],
        ["707","Organisational Design and Development","A","strat",8],
        ["708","Strategic Risk Management","A","ops",8],
        ["709","Strategic Management of Data and Information","A","money",8],
        ["710","Marketing Strategy","A","rel",8],
        ["711","Entrepreneurial Practice","A","strat",9],
        ["712","Strategic Management Project","A","ops",10],
        ["713","Applied Research for Strategic Leaders","A","money",7],
        ["714","Personal and Professional Development for Strategic Leaders","A","self",9],
        ["715","Strategic Approaches to Equality Diversity and Inclusion","A","people",8],
        ["716","Strategic Approaches to Mental Health and Wellbeing","A","people",7],
        ["607","Procurement, Purchasing and Contracting","B","ops",6],
        ["608","Strategic Corporate Social Responsibility and Sustainability","B","strat",7],
        ["609","Leading Quality Management","B","ops",7],
        ["610","Principles and Practices of Policy Development","B","strat",6],
        ["612","Coaching Skills for Leaders","B","people",7],
        ["614","Principles and Practices of Ethical Decision Making","B","strat",6]
      ]
    }
  };

  /*
   * Fixed-unit courses: every unit is mandatory, so the learner chooses an
   * option (usually a level) rather than units. All facts from the CST Training
   * learner handbooks (v1, February 2024).
   *   options  [key, tab label, full qualification name, price, best for, covers,
   *             credits, total qualification time, guided learning hours, units [[code, name, credits]]]
   */
  var COURSES = {
    pm: {
      title: "CMI Project Management",
      undecided: "Level 3 Award or Level 5 Certificate",
      options: [
        ["l3", "Level 3 Award", "CMI Level 3 Award in Project Management", "\u00a3300 + VAT",
         "Supervisors and first line managers",
         "How projects work, managing stakeholders and team roles, and planning and controlling a project.",
         6, 60, 25, [["PM3001", "Introduction to Project Management", 6]]],
        ["l5", "Level 5 Certificate", "CMI Level 5 Certificate in Project Management", "\u00a3600 + VAT",
         "Middle managers leading projects",
         "Managing projects through problems and challenges, then planning and managing a genuine workplace project or an academic enquiry.",
         16, 160, 54, [["513", "Managing Projects to Achieve Results", 6], ["524", "Conducting a Management Project", 10]]]
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
    ".ilmb-unit .cr{display:inline-block;margin-top:8px;font-size:.82rem;font-weight:700;color:var(--n);background:var(--ns);border-radius:99px;padding:2px 10px}",
    ".ilmb-tag{display:inline-block;margin-left:6px;font-size:.75rem;font-weight:700;color:var(--mut);border:1px solid var(--ln);border-radius:99px;padding:0 7px;vertical-align:1px}",
    ".ilmb-tag.dip{color:#8a4b00;border-color:var(--o)}",
    ".ilmb-bar{height:10px;border-radius:99px;background:var(--bg);overflow:hidden;margin:4px 0 12px}",
    ".ilmb-bar i{display:block;height:100%;width:0;background:var(--o);transition:width .2s}",
    ".ilmb-bar.ok i{background:var(--n)}",
    ".ilmb-meter{font-size:.92rem;color:var(--mut);margin:0 0 4px!important}",
    ".ilmb-meter b{color:var(--ink)}",
    ".ilmb-picks{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-direction:column;gap:6px;max-height:380px;overflow:auto}",
    ".ilmb-pick{display:flex;gap:8px;align-items:center;background:var(--ns);border-left:4px solid var(--o);border-radius:7px;padding:6px 6px 6px 10px;font-size:.9rem;line-height:1.25;margin:0}",
    ".ilmb-pick span{flex:1}",
    ".ilmb-pick em{font-style:normal;font-weight:700;color:var(--n);white-space:nowrap}",
    ".ilmb-pick button{font:inherit;border:0;background:transparent;color:var(--mut);cursor:pointer;font-size:1.15rem;line-height:1;padding:2px 6px}",
    ".ilmb-empty{color:var(--mut);font-style:italic;font-size:.92rem;margin:12px 0 0!important}",
    ".ilmb-g2bar{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;justify-content:space-between;background:var(--s);border:1px dashed var(--ln);border-radius:10px;padding:12px 16px;margin:0 0 22px;font-size:.93rem;color:var(--mut)}",
    ".ilmb-g2bar span{flex:1;min-width:220px}",
    ".ilmb-hint{background:var(--bg);border-radius:8px;padding:10px 12px;font-size:.93rem;margin-top:12px}",
    ".ilmb-ladder.full .ilmb-hint{display:none}",
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

  // Styles for the page content (.ilmx, shared with the ILM pages). WordPress strips <style> tags
  // from page content, so they are injected from here instead.
  var PAGE_CSS = ".ilmp{--n:#1C2560;--o:#FF8A00;--bg:#F4F5F9;--ink:#1B1F33;--mut:#565C75;--ln:#DCDFEA;--ns:#E7E9F3;font-family:'Asap',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Arial,sans-serif;color:var(--ink);font-size:1.0625rem;line-height:1.6}.ilmp *{box-sizing:border-box}.ilmp h1,.ilmp h2,.ilmp h3{font-family:'Alata',ui-sans-serif,system-ui,Arial,sans-serif;color:var(--n);line-height:1.2;margin:0 0 12px}.ilmp h1{font-size:clamp(1.9rem,4.6vw,2.8rem)}.ilmp h2{font-size:clamp(1.45rem,3vw,1.9rem)}.ilmp h3{font-size:1.1rem}.ilmp p{margin:0 0 .9em;max-width:none}.ilmp-sec{position:relative;padding:56px max(20px,calc((100% - 1120px)/2));background:#fff;box-shadow:0 0 0 100vmax #fff;clip-path:inset(0 -100vmax)}.ilmp-sec.alt{background:var(--bg);box-shadow:0 0 0 100vmax var(--bg)}.ilmp-sec.hero{background:#4c6bd8;box-shadow:0 0 0 100vmax #4c6bd8;color:#fff;padding-top:64px;padding-bottom:64px}.ilmp-sec.hero h1{color:#fff}.ilmp-sec.hero p{color:rgba(255,255,255,.88)}.ilmp-sec.hero .ilmp-lead{color:#fff}.ilmp-lead{font-size:1.15rem;color:var(--mut)}.ilmp-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-top:28px}.ilmp-fact{background:var(--bg);border-left:4px solid var(--o);border-radius:8px;padding:14px 16px}.ilmp-fact b{display:block;font-family:'Alata',sans-serif;font-size:1.5rem;color:var(--n)}.ilmp-fact span{font-size:.95rem;color:var(--mut)}.hero .ilmp-fact{background:rgba(255,255,255,.14);border-left-color:#fff}.hero .ilmp-fact b{color:#fff}.hero .ilmp-fact span{color:rgba(255,255,255,.9)}.ilmp-tw{overflow-x:auto;margin-top:20px;border:1px solid var(--ln);border-radius:10px}.ilmp table{border-collapse:collapse;width:100%;min-width:560px;background:#fff;margin:0}.ilmp th,.ilmp td{padding:13px 16px;text-align:left;border-bottom:1px solid var(--ln);vertical-align:top}.ilmp thead th{background:var(--n);color:#fff;font-family:'Alata',sans-serif;font-weight:400}.ilmp tbody th{font-weight:700;background:var(--bg)}.ilmp tr:last-child td,.ilmp tr:last-child th{border-bottom:0}.ilmp-steps{list-style:none;padding:0;margin:24px 0 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:0;counter-reset:s}.ilmp-steps li{counter-increment:s;padding:16px 18px 16px 0;border-top:3px solid var(--ln);margin:0}.ilmp-steps li.k{border-top-color:var(--o)}.ilmp-steps li::before{content:counter(s);display:block;font-family:'Alata',sans-serif;font-size:1.5rem;color:var(--n)}.ilmp-steps p{color:var(--mut);font-size:.98rem;margin:4px 0 0}.ilmp-ev{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin-top:24px}.ilmp-ev>div{background:#fff;border:1px solid var(--ln);border-radius:10px;padding:18px 20px}.ilmp-ev p{font-size:.98rem;color:var(--mut);margin:0}.ilmp-ev ul{margin:8px 0 0;padding-left:1.1em;font-size:.98rem;color:var(--mut)}.ilmp details{border-bottom:1px solid var(--ln);padding:16px 0}.ilmp details:first-of-type{border-top:1px solid var(--ln)}.ilmp summary{cursor:pointer;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;gap:16px}.ilmp summary::-webkit-details-marker{display:none}.ilmp summary::after{content:'+';font-size:1.4rem;line-height:1;color:var(--o);flex:none}.ilmp details[open] summary::after{content:'\u2212'}.ilmp details p{margin:10px 0 0;color:var(--mut)}.ilmp-faq{margin-top:20px}.ilmp :focus-visible{outline:3px solid var(--o);outline-offset:2px}.ilmp .ilmb{background:transparent;padding:0;border-radius:0}.ilmp-sec.usps{padding-top:28px;padding-bottom:28px;background:var(--bg);box-shadow:0 0 0 100vmax var(--bg)}.ilmp-usps{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px}.ilmp-usp{display:flex;gap:10px;align-items:flex-start;background:#fff;border:1px solid var(--ln);border-radius:10px;padding:14px 16px;font-size:.93rem;line-height:1.45;color:var(--mut)}.ilmp-usp svg{flex:none;width:20px;height:20px;margin-top:3px;color:var(--o)}.ilmp-usp b{display:block;font-family:'Alata',sans-serif;font-weight:400;font-size:1rem;color:var(--n);margin-bottom:2px}.ilmp .ilmb-lead{max-width:none}/* New BoldGrid ILM page (.ilmx) */.ilmx-tw{overflow-x:auto;border-radius:12px;margin-top:20px;border:1px solid #dcdfea}.ilmx-tw table{border-collapse:collapse;width:100%;min-width:560px;background:#fff;margin:0}.ilmx-tw th,.ilmx-tw td{padding:14px 16px;text-align:left;border-bottom:1px solid #dcdfea;vertical-align:top;font-size:16px}.ilmx-tw thead th{background:#1d2560;color:#fff;font-weight:700}.ilmx-tw tbody th{background:#f4f5f9;color:#1d2560;font-weight:700}.ilmx-tw tr:last-child td,.ilmx-tw tr:last-child th{border-bottom:0}.ilmx-ev{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin:10px 0 0}.ilmx-card{background:#fff;border-radius:15px;padding:24px 26px;height:100%}.ilmx-card h3{color:#1d2560;font-size:20px;font-weight:700;margin:0 0 8px}.ilmx-card p,.ilmx-card li{color:#565c75;font-size:16px;line-height:1.55;margin:0}.ilmx-card ul{margin:8px 0 0;padding-left:1.1em}.ilmx-faq details{border-bottom:1px solid #dcdfea;padding:18px 0}.ilmx-faq details:first-of-type{border-top:1px solid #dcdfea}.ilmx-faq summary{cursor:pointer;font-weight:700;font-size:18px;color:#1d2560;list-style:none;display:flex;justify-content:space-between;gap:16px}.ilmx-faq summary::-webkit-details-marker{display:none}.ilmx-faq summary::after{content:'+';font-size:26px;line-height:1;color:#ff8c04;flex:none}.ilmx-faq details[open] summary::after{content:'\u2212'}.ilmx-faq details p{margin:10px 0 0;color:#565c75}.ilmx-build .ilmb{background:transparent;padding:0;border-radius:0}.ilmx-build .ilmb-lead{max-width:none}";

  function injectPageCss() {
    if (document.getElementById("ilmp-css") || !document.querySelector(".ilmp,.ilmx")) return;
    var s = document.createElement("style"); s.id = "ilmp-css"; s.textContent = PAGE_CSS;
    document.head.appendChild(s);
  }

  // Extra styles for CMI-only bits (barred tag)
  var CSS_CMI = ".ilmb-tag.bar{color:#9b1c1c;border-color:#e8b4b4}.ilmb-unit[disabled] .ilmb-tag.bar{opacity:1}" +
    // Centred enquiry form (CMI only, the ILM pages keep their layout)
    ".cst-cmi-builder .ilmb-cta,.cst-cmi-course .ilmb-cta{text-align:center}.cst-cmi-builder .ilmb-cta .ilmb-lead,.cst-cmi-course .ilmb-cta .ilmb-lead{margin-left:auto;margin-right:auto}" +
    ".cst-cmi-builder .ilmb-form,.cst-cmi-course .ilmb-form{margin-left:auto;margin-right:auto;text-align:left}.cst-cmi-builder .ilmb-form .ilmb-row,.cst-cmi-course .ilmb-form .ilmb-row{justify-content:center}" +
    ".cst-cmi-builder .ilmb-consent,.cst-cmi-builder .ilmb-status,.cst-cmi-course .ilmb-consent,.cst-cmi-course .ilmb-status{text-align:center}" +
    ".cst-cmi-builder .ilmb-thanks,.cst-cmi-course .ilmb-thanks{margin-left:auto;margin-right:auto;text-align:left}" +
    // Fixed-unit mode (Project Management): centred level cards above the form
    ".cmib-fx .ilmb-in{max-width:980px}.cmib-fx>.ilmb-in>h2,.cmib-fx>.ilmb-in>.ilmb-lead{text-align:center;margin-left:auto;margin-right:auto}" +
    ".cmib-opts{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:26px}@media(max-width:700px){.cmib-opts{grid-template-columns:1fr}}" +
    ".cmib-opt{font:inherit;text-align:left;display:flex;flex-direction:column;gap:6px;width:100%;background:#fff;color:var(--ink);border:2px solid var(--ln);border-radius:14px;padding:20px 22px;cursor:pointer;transition:border-color .15s,box-shadow .15s}" +
    ".cmib-opt:hover{border-color:var(--n)}.cmib-opt[aria-checked=true]{border-color:var(--o);box-shadow:inset 0 4px 0 var(--o)}" +
    ".cmib-opt .lv{font-family:var(--hd);font-weight:600;font-size:.85rem;color:var(--mut)}.cmib-opt[aria-checked=true] .lv::after{content:' selected';color:var(--o)}" +
    ".cmib-opt .nm{font-family:var(--hd);font-weight:700;font-size:1.2rem;color:var(--n);line-height:1.25}" +
    ".cmib-opt .cv{color:var(--mut);font-size:.95rem;line-height:1.45}" +
    ".cmib-opt ul{list-style:none;margin:6px 0 0;padding:0;display:flex;flex-direction:column;gap:6px}" +
    ".cmib-opt li{margin:0;background:var(--ns);border-left:4px solid var(--n);border-radius:7px;padding:6px 10px;font-size:.92rem;line-height:1.3}" +
    ".cmib-opt li b{font-family:var(--hd);font-weight:600;margin-right:6px}" +
    ".cmib-opt .ft{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 12px;margin-top:auto;padding-top:10px;border-top:1px solid var(--ln);font-size:.92rem;color:var(--mut)}" +
    ".cmib-opt .ft b{color:var(--n);font-size:1.05rem}" +
    ".cmib-und{display:block;margin:16px auto 0;font:inherit;font-weight:600;background:transparent;border:1.5px dashed var(--ln);border-radius:99px;padding:9px 18px;color:var(--ink);cursor:pointer}" +
    ".cmib-und[aria-checked=true]{border-style:solid;border-color:var(--o);background:rgba(255,138,0,.14)}" +
    ".cmib-fx .ilmb-cta{margin-top:30px}";

  // FAQ dropdowns: handled at document level so they keep working even if
  // the theme re-renders the page content or blocks native toggling.
  document.addEventListener("click", function (e) {
    var s = e.target && e.target.closest ? e.target.closest(".ilmx-faq summary") : null;
    if (!s || !s.parentNode) return;
    e.preventDefault();
    var d = s.parentNode;
    if (d.hasAttribute("open")) d.removeAttribute("open"); else d.setAttribute("open", "");
  }, true);

  function injectCss() {
    if (document.getElementById("ilmb-css")) { addCmiCss(); return; }
    var s = document.createElement("style"); s.id = "ilmb-css"; s.textContent = CSS;
    document.head.appendChild(s);
    addCmiCss();
  }
  function addCmiCss() {
    if (document.getElementById("cmib-css")) return;
    var s = document.createElement("style"); s.id = "cmib-css"; s.textContent = CSS_CMI;
    document.head.appendChild(s);
  }

  function mount(root, idx) {
    var levelAttr = (root.getAttribute("data-level") || "5").replace(/\s/g, "");
    var compare = levelAttr.indexOf(",") > -1;
    var qualAttr = (root.getAttribute("data-qual") || "choose").toLowerCase();
    var formGuid = root.getAttribute("data-form-guid") || FORM_GUID;
    var phone = root.getAttribute("data-phone") || DEFAULT_PHONE;
    var uid = "cmib" + idx + "-";

    // Options shown in the switcher: the Diploma at each level (compare),
    // or each size at one level.
    var OPTS = [];
    if (compare) {
      levelAttr.split(",").forEach(function (lv) {
        var L = LEVELS[lv]; if (!L || !L.quals.diploma) return;
        OPTS.push({ key: "l" + lv, level: lv, qual: "diploma", tab: "Level " + lv });
      });
    } else {
      var L0 = LEVELS[levelAttr]; if (!L0) return;
      Object.keys(L0.quals).forEach(function (k) {
        if (qualAttr === "choose" || qualAttr === k) OPTS.push({ key: k, level: levelAttr, qual: k, tab: L0.quals[k].label });
      });
    }
    if (!OPTS.length) return;
    var optByKey = {}; OPTS.forEach(function (o) { optByKey[o.key] = o; });
    var defKey = compare ? "l" + (root.getAttribute("data-default") || "") : (optByKey.diploma ? "diploma" : OPTS[0].key);
    if (!optByKey[defKey]) defKey = OPTS[0].key;

    var key = "cmi|" + levelAttr + "|" + qualAttr + "|" + idx;
    var state = STATES[key] || (STATES[key] = { opt: defKey, picks: [], focus: [] });
    root._cmibMounted = true;

    var L, Q, UNITS, byCode, builtLevel = null;
    function o() { return optByKey[state.opt]; }
    function q() { return L.quals[o().qual]; }
    function setLevel() {
      L = LEVELS[o().level];
      UNITS = L.units.map(function (u) {
        return { code: u[0], name: u[1], theme: u[2], topic: u[3], cr: u[4], only: u[5] || null };
      });
      byCode = {}; UNITS.forEach(function (u) { byCode[u.code] = u; });
    }
    setLevel();

    function allowed(u) { return !u.only || u.only.indexOf(o().qual) > -1; }
    function barredBy(u, list) {
      for (var i = 0; i < L.bars.length; i++) {
        var p = L.bars[i], other = p[0] === u.code ? p[1] : p[1] === u.code ? p[0] : null;
        if (other && list.indexOf(other) > -1) return other;
      }
      return null;
    }
    function credits(list) { var t = 0; list.forEach(function (c) { t += byCode[c].cr; }); return t; }
    function creditsA(list) {
      var t = 0; if (!L.gA) return 0;
      list.forEach(function (c) { if (byCode[c].theme === L.gA) t += byCode[c].cr; }); return t;
    }
    function fits(u, list) {
      var Qq = q();
      if (!allowed(u) || barredBy(u, list)) return false;
      if (Qq.max != null && credits(list) + u.cr > Qq.max) return false;
      return true;
    }
    function valid(list) {
      var Qq = q(), t = credits(list);
      return t >= Qq.min && (Qq.max == null || t <= Qq.max) && list.length >= Qq.minUnits &&
        (!Qq.gAmin || creditsA(list) >= Qq.gAmin);
    }
    function trim() {
      var keep = [];
      state.picks.forEach(function (c) { if (byCode[c] && fits(byCode[c], keep)) keep.push(c); });
      state.picks = keep;
    }

    root.classList.add("ilmb");
    root.innerHTML = "";
    var inner = el("div", "ilmb-in"); root.appendChild(inner);
    var h = el("h2"); inner.appendChild(h);
    var lead = el("p", "ilmb-lead"); inner.appendChild(lead);

    var evStrip = el("div", "ilmb-ev"); inner.appendChild(evStrip);
    [
      ["Assignments from real work", "Assignments, reports and work product show your learning, set by your trainer for your chosen units."],
      ["Presentations", "Where it suits your units, you may present to your tutor or assessor."],
      ["Workbooks and 1-1 tuition", "CMI workbooks and pre-recorded material for specific units, alongside 1-1 sessions with your trainer."],
      ["CMI Management Direct", "Access CMI's resources portal throughout your course and for up to 3 months after."]
    ].forEach(function (e) {
      var c = el("div", "ilmb-evc");
      c.appendChild(el("b", null, e[0]));
      c.appendChild(el("span", null, e[1]));
      evStrip.appendChild(c);
    });

    var tabsWrap = el("div", "ilmb-tabwrap");
    tabsWrap.appendChild(el("span", "ilmb-tablabel", compare ? "Choose your level:" : "Choose your qualification:"));
    var tabs = el("div", "ilmb-tabs"); tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", compare ? "Choose your level" : "Choose your qualification");
    tabsWrap.appendChild(tabs);
    if (OPTS.length > 1) {
      OPTS.forEach(function (op) {
        var b = el("button", null, op.tab); b.type = "button"; b.setAttribute("role", "tab");
        b.addEventListener("click", function () {
          if (state.opt === op.key) return;
          var lvChanged = optByKey[state.opt].level !== op.level;
          state.opt = op.key;
          if (lvChanged) { state.picks = []; setLevel(); buildUnits(); } else trim();
          render();
        });
        b.setAttribute("data-k", op.key); tabs.appendChild(b);
      });
      inner.insertBefore(tabsWrap, h);
    }

    var grid = el("div", "ilmb-grid"); inner.appendChild(grid);
    var left = el("div"); grid.appendChild(left);

    var sug = el("div", "ilmb-suggest"); left.appendChild(sug);
    sug.appendChild(el("p", null, "Not sure where to start? Choose up to three areas you spend most time on. We'll suggest units as soon as you pick three."));
    var chips = el("div", "ilmb-chips"); sug.appendChild(chips);
    TOPICS.forEach(function (g) {
      var c = el("button", "ilmb-chip", g.name); c.type = "button"; c.setAttribute("aria-pressed", "false");
      c.addEventListener("click", function () {
        var ix = state.focus.indexOf(g.id);
        if (ix > -1) state.focus.splice(ix, 1);
        else { if (state.focus.length >= 3) state.focus.shift(); state.focus.push(g.id); }
        syncChips();
        if (state.focus.length === 3) suggest(false);
      });
      chips.appendChild(c);
    });
    function syncChips() {
      Array.prototype.forEach.call(chips.children, function (ch, k) {
        ch.setAttribute("aria-pressed", state.focus.indexOf(TOPICS[k].id) > -1 ? "true" : "false");
      });
    }
    var row = el("div", "ilmb-row"); sug.appendChild(row);
    var sugBtn = el("button", "ilmb-btn", "Suggest units"); sugBtn.type = "button"; row.appendChild(sugBtn);
    var clrBtn = el("button", "ilmb-btn ghost", "Clear picks"); clrBtn.type = "button"; row.appendChild(clrBtn);
    var enqBtn = el("button", "ilmb-btn or ilmb-enq", "Enquire now"); enqBtn.type = "button"; row.appendChild(enqBtn);
    var unitArea = el("div"); left.appendChild(unitArea);

    // Suggestions: the foundation unit first (except on an Award), then
    // round-robin through the chosen focus areas until the size is complete.
    // Where a Group A minimum applies, Group A units are used until it is met.
    function suggest(scroll) {
      var Qq = q(), picks = [];
      function needA() { return Qq.gAmin && creditsA(picks) < Qq.gAmin; }
      function add(u) {
        if (!u || picks.indexOf(u.code) > -1 || !fits(u, picks)) return;
        if (u.cr >= 10 && Qq.min < 37) return; // keep large units out of small sizes
        if (needA() && u.theme !== L.gA) return;
        picks.push(u.code);
      }
      function short() { return credits(picks) < Qq.min || picks.length < Qq.minUnits || needA(); }
      if (o().qual !== "award" && L.starter) add(byCode[L.starter]);
      var focus = state.focus.length ? state.focus : ["people", "ops", "strat"];
      var pools = focus.map(function (t) {
        return UNITS.filter(function (u) { return u.topic === t && u.cr < 10; });
      });
      var k = 0, guard = 0;
      while (short() && pools.some(function (p) { return p.length; }) && guard++ < 500) {
        var p = pools[k % pools.length]; if (p.length) add(p.shift()); k++;
      }
      UNITS.forEach(function (u) { if (short() && u.cr < 10) add(u); });
      UNITS.forEach(function (u) { if (short()) add(u); });
      state.picks = picks;
      render();
      if (scroll && ladder.scrollIntoView) ladder.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    sugBtn.addEventListener("click", function () { suggest(true); });
    clrBtn.addEventListener("click", function () { state.picks = []; render(); });

    function toggle(code) {
      var ix = state.picks.indexOf(code);
      if (ix > -1) state.picks.splice(ix, 1);
      else if (fits(byCode[code], state.picks)) state.picks.push(code);
      render();
    }

    var unitBtns, barTags, themeBoxes;
    function buildUnits() {
      unitArea.innerHTML = ""; unitBtns = {}; barTags = {}; themeBoxes = {};
      L.themes.forEach(function (g) {
        var list = UNITS.filter(function (u) { return u.theme === g.id; });
        if (!list.length) return;
        var box = el("div", "ilmb-group"); box.appendChild(el("h3", null, g.name));
        var ug = el("div", "ilmb-units");
        list.forEach(function (u) {
          var b = el("button", "ilmb-unit"); b.type = "button";
          var c = el("span", "c", u.code);
          if (u.only) c.appendChild(el("span", "ilmb-tag dip", "Diploma only"));
          var bt = el("span", "ilmb-tag bar"); bt.style.display = "none"; c.appendChild(bt); barTags[u.code] = bt;
          b.appendChild(c);
          b.appendChild(el("span", "nm", u.name));
          b.appendChild(el("span", "cr", u.cr + " credit" + (u.cr > 1 ? "s" : "")));
          b.addEventListener("click", function () { toggle(u.code); });
          unitBtns[u.code] = b; ug.appendChild(b);
        });
        box.appendChild(ug); unitArea.appendChild(box); themeBoxes[g.id] = box;
      });
    }
    buildUnits();

    var ladder = el("aside", "ilmb-ladder"); ladder.setAttribute("aria-live", "polite"); grid.appendChild(ladder);
    var lt = el("div", "t"); ladder.appendChild(lt);
    var lc = el("div", "ct"); ladder.appendChild(lc);
    var bar = el("div", "ilmb-bar"); var barFill = el("i"); bar.appendChild(barFill); ladder.appendChild(bar);
    var mNeed = el("p", "ilmb-meter"); ladder.appendChild(mNeed);
    var mUnits = el("p", "ilmb-meter"); ladder.appendChild(mUnits);
    var mA = el("p", "ilmb-meter"); ladder.appendChild(mA);
    var picksList = el("ul", "ilmb-picks"); ladder.appendChild(picksList);
    var empty = el("p", "ilmb-empty", "No units picked yet. Tap a unit to add it."); ladder.appendChild(empty);
    var hint = el("div", "ilmb-hint"); ladder.appendChild(hint);
    var done = el("div", "ilmb-done"); ladder.appendChild(done);
    var enqBtn2 = el("button", "ilmb-btn or ilmb-enq ilmb-enq-l", "Enquire now"); enqBtn2.type = "button"; ladder.appendChild(enqBtn2);
    ladder.appendChild(el("p", "ilmb-note", "You can change units at induction. Nothing here is final."));

    // Enquiry form
    var cta = el("div", "ilmb-cta"); cta.id = uid + "enquire"; inner.appendChild(cta);
    function goToForm() {
      if (cta.scrollIntoView) cta.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () { try { fFirst.focus({ preventScroll: true }); } catch (e) { fFirst.focus(); } }, 600);
    }
    enqBtn.addEventListener("click", goToForm);
    enqBtn2.addEventListener("click", goToForm);
    cta.appendChild(el("h2", null, "Send your picks to our team"));
    cta.appendChild(el("p", "ilmb-lead", "We'll come back to you with a quote based on your units. Induction is usually within 7 working days of registration."));
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

    function qualName() { return L.title + " " + q().label + " " + L.qualTitle; }
    function shortName() { return compare ? "Level " + o().level + " " + q().label : q().label; }

    function summary() {
      var t = credits(state.picks);
      var lines = [qualName() + ": unit picks", ""];
      if (!state.picks.length) lines.push("(no units picked yet)");
      state.picks.forEach(function (c) { var u = byCode[c]; lines.push(c + " " + u.name + " (" + u.cr + " credits)"); });
      lines.push("");
      lines.push("Total: " + t + " credits across " + state.picks.length + " unit" + (state.picks.length === 1 ? "" : "s"));
      lines.push("Learners: " + fLearners.value);
      lines.push("Planned start: " + fStart.value);
      return lines.join("\n");
    }

    function render() {
      var Qq = q(), t = credits(state.picks), n = state.picks.length, ok = valid(state.picks), tA = creditsA(state.picks);
      h.textContent = "Build your " + shortName();
      lead.textContent = "The " + L.title + " " + Qq.label + " " + L.qualTitle + " needs " + Qq.range + " credits. " + Qq.rule +
        (L.bars.length ? " A few units can't be taken together, so the builder blocks those for you." : "") +
        " Pick the units that match the work you already do. Your assessor confirms the final choice with you at induction.";
      Array.prototype.forEach.call(tabs.children, function (b) {
        b.setAttribute("aria-selected", b.getAttribute("data-k") === state.opt ? "true" : "false");
      });
      Object.keys(themeBoxes).forEach(function (gid) {
        var any = false;
        UNITS.forEach(function (u) {
          if (u.theme !== gid) return;
          var b = unitBtns[u.code], on = state.picks.indexOf(u.code) > -1, show = allowed(u);
          b.style.display = show ? "" : "none";
          if (show) any = true;
          b.setAttribute("aria-pressed", on ? "true" : "false");
          var by = on ? null : barredBy(u, state.picks);
          barTags[u.code].textContent = by ? "Not with " + by : "";
          barTags[u.code].style.display = by ? "" : "none";
          b.disabled = !on && !fits(u, state.picks);
        });
        themeBoxes[gid].style.display = any ? "" : "none";
      });

      lt.textContent = "Your " + shortName();
      lc.textContent = t + " credit" + (t === 1 ? "" : "s") + " picked";
      barFill.style.width = Math.min(100, Math.round(t / Qq.min * 100)) + "%";
      bar.classList.toggle("ok", ok);
      mNeed.innerHTML = "";
      mNeed.appendChild(document.createTextNode("Needed: "));
      mNeed.appendChild(el("b", null, Qq.range + " credits"));
      mUnits.innerHTML = "";
      if (Qq.minUnits > 1) {
        mUnits.appendChild(document.createTextNode("Units: "));
        mUnits.appendChild(el("b", null, n + " picked, at least " + Qq.minUnits + " needed"));
      }
      mUnits.style.display = Qq.minUnits > 1 ? "" : "none";
      mA.innerHTML = "";
      if (Qq.gAmin) {
        mA.appendChild(document.createTextNode("Group A: "));
        mA.appendChild(el("b", null, tA + " of at least " + Qq.gAmin + " credits"));
      }
      mA.style.display = Qq.gAmin ? "" : "none";

      picksList.innerHTML = "";
      state.picks.forEach(function (c) {
        var u = byCode[c], li = el("li", "ilmb-pick");
        li.appendChild(el("span", null, u.code + " " + u.name));
        li.appendChild(el("em", null, u.cr + " cr"));
        var x = el("button", null, "\u00d7"); x.type = "button"; x.setAttribute("aria-label", "Remove " + u.name);
        x.addEventListener("click", function () { toggle(c); });
        li.appendChild(x); picksList.appendChild(li);
      });
      empty.style.display = n ? "none" : "";
      var parts = [], needCr = Qq.min - t, needU = Qq.minUnits - n, needA = Qq.gAmin ? Qq.gAmin - tA : 0;
      if (n) {
        if (needCr > 0) parts.push(needCr + " more credit" + (needCr === 1 ? "" : "s"));
        if (needU > 0) parts.push("at least " + needU + " more unit" + (needU === 1 ? "" : "s"));
        if (needA > 0) parts.push(needA + " more Group A credit" + (needA === 1 ? "" : "s"));
      }
      hint.textContent = parts.length ? "Add " + parts.join(" and ") + " to complete your " + shortName() + "." : "";
      hint.style.display = hint.textContent ? "" : "none";
      done.textContent = "That's a full " + shortName() + " at " + t + " credits. Send these picks to our team below.";
      enqBtn.textContent = enqBtn2.textContent = "Enquire about this " + q().label;
      ladder.classList.toggle("full", ok);
      root.classList.toggle("ilmb-full", ok);
      sum.textContent = summary();
    }

    fLearners.addEventListener("change", render);
    fStart.addEventListener("change", render);

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var first = fFirst.value.trim(), last = fLast.value.trim(), email = fEmail.value.trim(), ph = fPhone.value.trim();
      function err(tx, f) { status.className = "ilmb-status err"; status.textContent = tx; if (f) f.focus(); }
      if (!first || !last) return err("Add your first and last name.", first ? fLast : fFirst);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err("Enter a valid email address so we can reply.", fEmail);
      if (!ph) return err("Add a phone number so our team can talk your units through with you.", fPhone);

      var qx = fQ.value.trim();
      var fields = [
        { name: "firstname", value: first },
        { name: "lastname", value: last },
        { name: "email", value: email },
        { name: "phone", value: ph },
        { name: "message", value: summary() + (qx ? "\n\nQuestions:\n" + qx : "") },
        { name: "enquiry_qualification", value: qualName() },
        { name: "enquiry_options_selected", value: state.picks.map(function (c) { return c + " " + byCode[c].name; }).join("; ") },
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
          window.dataLayer.push({ event: "course_builder_submit", enquiry_qualification: qualName(), enquiry_options: state.picks.join(";") });
        } catch (e) {}
        form.style.display = "none"; thanks.style.display = "block"; thanks.focus();
      }).catch(function () {
        sendBtn.disabled = false; sendBtn.textContent = "Send my picks to CST Training";
        err("That didn't send. Please try again, or call " + phone + " and we'll take your picks over the phone.");
      });
    });

    render();
  }

  /* ---------- Coaching and Mentoring (v4) ----------
   * Fixed mandatory units plus optional units to a minimum credit total.
   * Mount: <div class="cst-cmi-builder" data-quals="cm3,cm7" data-qual="cm3"></div>
   * Each unit is [code, title, credits, short description, mandatory?, focus label].
   */
  var COACH = {
    // Source: Level3_CMICoachingandMentoring_Handbook_v1 (Feb 2024)
    cm3: {
      tab: "Level 3 Diploma",
      short: "Level 3 Diploma",
      title: "CMI Level 3 Diploma in Coaching and Mentoring",
      optMin: 7,
      fallback: ["4004", "4003", "4008", "3016"],
      units: [
        ["3011", "Principles, skills and impact of coaching and mentoring", 7, "The core principles and skills of coaching and mentoring, and the difference they make.", true],
        ["3012", "Coaching and mentoring for individual and team needs", 6, "Work out what individuals and teams need, and how coaching and mentoring can meet it.", true],
        ["3013", "Coaching and mentoring relationships", 5, "Build and manage effective coaching and mentoring relationships.", true],
        ["3014", "Coaching and mentoring processes", 7, "Plan and run coaching and mentoring sessions using a clear process.", true],
        ["3015", "Completing the coaching and mentoring process", 5, "Bring a coaching or mentoring programme to a close and review it.", true],
        ["3016", "Coaching and mentoring process evaluation", 5, "Evaluate how well your coaching and mentoring has worked.", false, "Evaluating results"],
        ["4003", "Understanding organisational culture, values and behaviour", 7, "How culture and values shape behaviour where you work.", false, "Culture and values"],
        ["4004", "Understanding team dynamics", 7, "How teams form and work together, and how to get the best from them.", false, "Team dynamics"],
        ["4008", "Promoting equality and diversity", 7, "Promote fair, inclusive practice in your team.", false, "Equality and diversity"]
      ]
    },
    // Source: Level7_CMILeadershipCoachingandMentoring_Handbook_v1 (Feb 2024)
    cm7: {
      tab: "Level 7 Diploma",
      short: "Level 7 Diploma",
      title: "CMI Level 7 Diploma in Leadership Coaching and Mentoring",
      optMin: 7,
      fallback: ["7019", "7010", "6001", "6004"],
      units: [
        ["7015", "Coaching and mentoring within organisational culture", 7, "How coaching and mentoring fit with, and shape, the culture of your organisation.", true],
        ["7016", "Coaching and mentoring policies", 6, "Develop the policies that govern coaching and mentoring across the organisation.", true],
        ["7017", "Organisational coaching and mentoring", 6, "Design coaching and mentoring at organisational level.", true],
        ["7018", "Strategic impact of coaching and mentoring", 6, "Measure and show the strategic value of coaching and mentoring.", true],
        ["7002", "Developing performance management strategies", 7, "Build strategies that improve performance across the organisation.", true],
        ["7020", "Leadership coaching and mentoring skills", 7, "The advanced coaching and mentoring skills needed by senior leaders.", true],
        ["7019", "Embedding coaching and mentoring in the organisation", 7, "Make coaching and mentoring part of how the organisation works.", false, "Embedding coaching"],
        ["7010", "Implementing organisational change strategies", 7, "Lead change strategies through the organisation.", false, "Leading change"],
        ["6001", "Managing organisational culture", 7, "Understand and influence the culture of your organisation.", false, "Organisational culture"],
        ["6004", "Leading equality and diversity", 7, "Lead equality, diversity and inclusion at a senior level.", false, "Equality and diversity"]
      ]
    }
  };

  function cr(n) { return n + " credit" + (n === 1 ? "" : "s"); }

  var COACH_STATES = {};

  function mountCoaching(root, idx) {
    var keys = (root.getAttribute("data-quals") || root.getAttribute("data-qual") || "")
      .split(",").map(function (k) { return k.trim(); }).filter(function (k) { return COACH[k]; });
    if (!keys.length) return;
    var first = root.getAttribute("data-qual");
    var formGuid = root.getAttribute("data-form-guid") || FORM_GUID;
    var phone = root.getAttribute("data-phone") || DEFAULT_PHONE;
    var uid = "cmic" + idx + "-";

    var stKey = keys.join(",") + "|" + idx;
    var state = COACH_STATES[stKey] || (COACH_STATES[stKey] = {
      qual: keys.indexOf(first) > -1 ? first : keys[0], picks: {}, focus: {}
    });
    keys.forEach(function (k) { state.picks[k] = state.picks[k] || []; state.focus[k] = state.focus[k] || []; });
    root._cmibMounted = true;

    var DATA = {};
    keys.forEach(function (k) {
      var Q = COACH[k];
      var units = Q.units.map(function (u) { return { code: u[0], name: u[1], cr: u[2], desc: u[3], mand: !!u[4], focus: u[5] }; });
      var by = {}; units.forEach(function (u) { by[u.code] = u; });
      var mandCr = units.filter(function (u) { return u.mand; }).reduce(function (a, u) { return a + u.cr; }, 0);
      DATA[k] = { Q: Q, units: units, by: by, mandCr: mandCr };
    });
    function D() { return DATA[state.qual]; }
    function picks() { return state.picks[state.qual]; }
    function optCr(list) { return list.reduce(function (a, c) { return a + D().by[c].cr; }, 0); }

    root.classList.add("ilmb");
    root.innerHTML = "";
    var inner = el("div", "ilmb-in"); root.appendChild(inner);

    var tabs = el("div", "ilmb-tabs");
    if (keys.length > 1) {
      var tabsWrap = el("div", "ilmb-tabwrap");
      tabsWrap.appendChild(el("span", "ilmb-tablabel", "Choose your qualification:"));
      tabs.setAttribute("role", "tablist"); tabs.setAttribute("aria-label", "Choose your qualification");
      tabsWrap.appendChild(tabs); inner.appendChild(tabsWrap);
      keys.forEach(function (k) {
        var b = el("button", null, COACH[k].tab); b.type = "button"; b.setAttribute("role", "tab");
        b.setAttribute("data-k", k);
        b.addEventListener("click", function () { state.qual = k; build(); });
        tabs.appendChild(b);
      });
    }

    var h = el("h2"); inner.appendChild(h);
    var lead = el("p", "ilmb-lead"); inner.appendChild(lead);

    var evStrip = el("div", "ilmb-ev"); inner.appendChild(evStrip);
    [
      ["Assignments from your role", "Assignments, reports and work product, set by your trainer and tailored to your job at induction."],
      ["Online portfolio", "Upload evidence, get feedback on every piece and track your progress at any time."],
      ["1-1 tuition", "CST Training workbooks and pre-recorded material, alongside 1-1 sessions with your trainer."],
      ["CMI Management Direct", "CMI's resources portal, open throughout and for 3 months after you finish."]
    ].forEach(function (e) {
      var c = el("div", "ilmb-evc");
      c.appendChild(el("b", null, e[0]));
      c.appendChild(el("span", null, e[1]));
      evStrip.appendChild(c);
    });

    var grid = el("div", "ilmb-grid"); inner.appendChild(grid);
    var left = el("div"); grid.appendChild(left);

    var ladder = el("aside", "ilmb-ladder"); ladder.setAttribute("aria-live", "polite"); grid.appendChild(ladder);
    var lt = el("div", "t"); ladder.appendChild(lt);
    var lc = el("div", "ct"); ladder.appendChild(lc);
    var bar = el("div", "ilmb-bar"); var barFill = el("i"); bar.appendChild(barFill); ladder.appendChild(bar);
    var mMand = el("p", "ilmb-meter"); ladder.appendChild(mMand);
    var mOpt = el("p", "ilmb-meter"); ladder.appendChild(mOpt);
    var picksList = el("ul", "ilmb-picks"); ladder.appendChild(picksList);
    var empty = el("p", "ilmb-empty", "No optional units picked yet. Tap one to add it."); ladder.appendChild(empty);
    var hint = el("div", "ilmb-hint"); ladder.appendChild(hint);
    var done = el("div", "ilmb-done"); ladder.appendChild(done);
    var enqBtn2 = el("button", "ilmb-btn or ilmb-enq ilmb-enq-l", "Enquire now"); enqBtn2.type = "button"; ladder.appendChild(enqBtn2);
    ladder.appendChild(el("p", "ilmb-note", "You can change units at induction. Nothing here is final."));

    // Enquiry form, centred below the builder
    var cta = el("div", "ilmb-cta"); cta.id = uid + "enquire"; inner.appendChild(cta);
    function goToForm() {
      cta.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () { try { fFirst.focus({ preventScroll: true }); } catch (e) { fFirst.focus(); } }, 600);
    }
    enqBtn2.addEventListener("click", goToForm);
    cta.appendChild(el("h2", null, "Send your picks to our team"));
    cta.appendChild(el("p", "ilmb-lead", "We'll come back to you with a quote, and your induction is usually booked within 7 working days of registration."));
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
    var brow = el("div", "fl ilmb-row"); form.appendChild(brow);
    var sendBtn = el("button", "ilmb-btn or", "Send my picks to CST Training"); sendBtn.type = "submit"; brow.appendChild(sendBtn);
    var call = el("a", "ilmb-btn ghost", "Or call " + phone); call.href = "tel:" + phone.replace(/\s/g, ""); brow.appendChild(call);
    var status = el("p", "ilmb-status"); status.setAttribute("role", "status"); form.appendChild(status);
    var thanks = el("div", "ilmb-thanks"); thanks.tabIndex = -1; cta.appendChild(thanks);
    thanks.appendChild(el("h3", null, "Thanks, we've got your picks."));
    thanks.appendChild(el("p", null, "Our team will be in touch shortly. If it's urgent, call " + phone + "."));

    var unitBtns = {}, chipBtns = [], sugBtn, enqBtn;

    function toggle(code) {
      var p = picks(), ix = p.indexOf(code);
      if (ix > -1) p.splice(ix, 1); else p.push(code);
      render();
    }

    function suggest(scroll) {
      var d = D(), p = [], f = state.focus[state.qual];
      d.units.forEach(function (u) { if (!u.mand && f.indexOf(u.code) > -1) p.push(u.code); });
      d.Q.fallback.forEach(function (c) { if (optCr(p) < d.Q.optMin && p.indexOf(c) < 0) p.push(c); });
      state.picks[state.qual] = p;
      render();
      if (scroll) ladder.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Rebuild the unit list for the selected qualification
    function build() {
      left.innerHTML = ""; unitBtns = {}; chipBtns = [];
      var d = D(), opt = d.units.filter(function (u) { return !u.mand; });

      var sug = el("div", "ilmb-suggest"); left.appendChild(sug);
      sug.appendChild(el("p", null, "Not sure which optional unit? Pick what matters most in your role and we'll suggest units that reach the " + d.Q.optMin + " credits you need."));
      var chips = el("div", "ilmb-chips"); sug.appendChild(chips);
      opt.forEach(function (u) {
        var c = el("button", "ilmb-chip", u.focus); c.type = "button";
        c.setAttribute("aria-pressed", state.focus[state.qual].indexOf(u.code) > -1 ? "true" : "false");
        c.addEventListener("click", function () {
          var f = state.focus[state.qual], ix = f.indexOf(u.code);
          if (ix > -1) f.splice(ix, 1); else f.push(u.code);
          c.setAttribute("aria-pressed", ix > -1 ? "false" : "true");
          suggest(false);
        });
        chipBtns.push(c); chips.appendChild(c);
      });
      var row = el("div", "ilmb-row"); sug.appendChild(row);
      sugBtn = el("button", "ilmb-btn", "Suggest units"); sugBtn.type = "button"; row.appendChild(sugBtn);
      sugBtn.addEventListener("click", function () { suggest(true); });
      var clr = el("button", "ilmb-btn ghost", "Clear picks"); clr.type = "button"; row.appendChild(clr);
      clr.addEventListener("click", function () {
        state.picks[state.qual] = []; state.focus[state.qual] = [];
        chipBtns.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        render();
      });
      enqBtn = el("button", "ilmb-btn or ilmb-enq", "Enquire now"); enqBtn.type = "button"; row.appendChild(enqBtn);
      enqBtn.addEventListener("click", goToForm);

      [["Mandatory units (all included)", true], ["Optional units", false]].forEach(function (g) {
        var box = el("div", "ilmb-group"); box.appendChild(el("h3", null, g[0]));
        var ug = el("div", "ilmb-units");
        d.units.filter(function (u) { return u.mand === g[1]; }).forEach(function (u) {
          var b = el("button", "ilmb-unit" + (u.mand ? " lk" : "")); b.type = "button";
          b.appendChild(el("span", "c", "Unit " + u.code + (u.mand ? " mandatory" : "")));
          b.appendChild(el("span", "nm", u.name));
          b.appendChild(el("span", "d", u.desc));
          b.appendChild(el("span", "cr", cr(u.cr)));
          if (u.mand) { b.setAttribute("aria-pressed", "true"); b.setAttribute("aria-disabled", "true"); }
          else b.addEventListener("click", function () { toggle(u.code); });
          unitBtns[u.code] = b; ug.appendChild(b);
        });
        box.appendChild(ug); left.appendChild(box);
      });
      render();
    }

    function qualName() { return D().Q.title; }
    function allCodes() {
      return D().units.filter(function (u) { return u.mand; }).map(function (u) { return u.code; }).concat(picks());
    }
    function summary() {
      var d = D(), oc = optCr(picks());
      var lines = [qualName() + ": unit picks", ""];
      lines.push("Mandatory units (" + cr(d.mandCr) + "):");
      d.units.forEach(function (u) { if (u.mand) lines.push("Unit " + u.code + " " + u.name); });
      lines.push("");
      lines.push("Optional units (" + cr(oc) + "):");
      if (!picks().length) lines.push("(none picked yet)");
      picks().forEach(function (c) { lines.push("Unit " + c + " " + d.by[c].name + " (" + cr(d.by[c].cr) + ")"); });
      lines.push("");
      lines.push("Total: " + cr(d.mandCr + oc));
      lines.push("Learners: " + fLearners.value);
      lines.push("Planned start: " + fStart.value);
      return lines.join("\n");
    }

    function render() {
      var d = D(), Q = d.Q, p = picks(), oc = optCr(p), ok = oc >= Q.optMin, total = d.mandCr + oc;
      var nMand = d.units.filter(function (u) { return u.mand; }).length;
      var nOpt = d.units.length - nMand;
      h.textContent = "Build your " + Q.short;
      lead.textContent = "The " + Q.title + " includes " + nMand + " mandatory units worth " + d.mandCr +
        " credits. You then choose from " + nOpt + " optional units to add at least " + Q.optMin +
        " more credits. Pick the ones closest to the work you already do, and your assessor confirms the final choice with you at induction.";
      Array.prototype.forEach.call(tabs.children, function (t) {
        t.setAttribute("aria-selected", t.getAttribute("data-k") === state.qual ? "true" : "false");
      });
      d.units.forEach(function (u) {
        if (u.mand) return;
        unitBtns[u.code].setAttribute("aria-pressed", p.indexOf(u.code) > -1 ? "true" : "false");
      });
      lt.textContent = "Your " + Q.short;
      lc.textContent = cr(total) + " in total";
      barFill.style.width = Math.min(100, Math.round(oc / Q.optMin * 100)) + "%";
      bar.classList.toggle("ok", ok);
      mMand.innerHTML = ""; mMand.appendChild(document.createTextNode("Mandatory: "));
      mMand.appendChild(el("b", null, cr(d.mandCr) + " included"));
      mOpt.innerHTML = ""; mOpt.appendChild(document.createTextNode("Optional: "));
      mOpt.appendChild(el("b", null, oc + " of at least " + Q.optMin + " credits"));

      picksList.innerHTML = "";
      p.forEach(function (c) {
        var u = d.by[c], li = el("li", "ilmb-pick");
        li.appendChild(el("span", null, u.name));
        li.appendChild(el("em", null, u.cr + " cr"));
        var x = el("button", null, "\u00d7"); x.type = "button"; x.setAttribute("aria-label", "Remove " + u.name);
        x.addEventListener("click", function () { toggle(c); });
        li.appendChild(x); picksList.appendChild(li);
      });
      empty.style.display = p.length ? "none" : "";
      var need = Q.optMin - oc;
      hint.textContent = p.length && need > 0 ? "Add " + cr(need) + " more from the optional units to complete your " + Q.short + "." : "";
      hint.style.display = hint.textContent ? "" : "none";
      done.textContent = "That's a complete " + Q.short + " at " + cr(total) + ". Send these picks to our team below.";
      enqBtn.textContent = enqBtn2.textContent = "Enquire about this " + Q.short;
      ladder.classList.toggle("full", ok);
      root.classList.toggle("ilmb-full", ok);
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

      var q = fQ.value.trim(), d = D();
      var fields = [
        { name: "firstname", value: first },
        { name: "lastname", value: last },
        { name: "email", value: email },
        { name: "phone", value: ph },
        { name: "message", value: summary() + (q ? "\n\nQuestions:\n" + q : "") },
        { name: "enquiry_qualification", value: qualName() },
        { name: "enquiry_options_selected", value: allCodes().map(function (c) { return c + " " + d.by[c].name; }).join("; ") },
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

    build();
  }

  // ---------- Fixed-unit courses (every unit mandatory) ----------
  function mountFixed(root, idx, C) {
    var formGuid = root.getAttribute("data-form-guid") || FORM_GUID;
    var phone = root.getAttribute("data-phone") || DEFAULT_PHONE;
    var uid = "cmif" + idx + "-";
    var OPTS = C.options.map(function (a) {
      return { key: a[0], tab: a[1], name: a[2], price: a[3], best: a[4], covers: a[5], cr: a[6], tqt: a[7], glh: a[8],
               units: a[9].map(function (u) { return { code: u[0], name: u[1], cr: u[2] }; }) };
    });
    var byKey = {}; OPTS.forEach(function (o) { byKey[o.key] = o; });
    var def = root.getAttribute("data-default");
    var key = "cmif|" + root.getAttribute("data-course") + "|" + idx;
    var state = STATES[key] || (STATES[key] = { opt: byKey[def] ? def : OPTS[OPTS.length - 1].key });
    root._cmibMounted = true;
    function cur() { return byKey[state.opt] || null; }

    root.classList.add("ilmb"); root.classList.add("cmib-fx");
    root.innerHTML = "";
    var inner = el("div", "ilmb-in"); root.appendChild(inner);
    inner.appendChild(el("h2", null, root.getAttribute("data-heading") || "Choose your qualification: Level 3 or Level 5"));
    inner.appendChild(el("p", "ilmb-lead", "Every unit in both qualifications is mandatory, so there are no units to pick. Choose the level that fits your role and our team will come back to you with everything you need to get started."));

    var opts = el("div", "cmib-opts"); opts.setAttribute("role", "radiogroup");
    opts.setAttribute("aria-label", "Choose your " + C.title + " qualification");
    inner.appendChild(opts);
    var cards = {};
    OPTS.forEach(function (o) {
      var b = el("button", "cmib-opt"); b.type = "button"; b.setAttribute("role", "radio");
      b.appendChild(el("span", "lv", o.tab));
      b.appendChild(el("span", "nm", o.name));
      b.appendChild(el("span", "cv", o.covers));
      var ul = el("ul");
      o.units.forEach(function (u) {
        var li = el("li"); li.appendChild(el("b", null, u.code));
        li.appendChild(document.createTextNode(u.name + " (" + u.cr + " credits)")); ul.appendChild(li);
      });
      b.appendChild(ul);
      var ft = el("span", "ft");
      ft.appendChild(el("span", null, o.cr + " credits | " + o.tqt + " hours total"));
      ft.appendChild(el("b", null, o.price));
      b.appendChild(ft);
      b.addEventListener("click", function () { state.opt = o.key; render(); });
      cards[o.key] = b; opts.appendChild(b);
    });
    var und = el("button", "cmib-und", "Not sure yet? Ask our team to help you choose"); und.type = "button";
    und.setAttribute("role", "radio");
    und.addEventListener("click", function () { state.opt = "undecided"; render(); });
    inner.appendChild(und);

    // Enquiry form (centred via the CMI CSS)
    var cta = el("div", "ilmb-cta"); cta.id = uid + "enquire"; inner.appendChild(cta);
    var ch = el("h2"); cta.appendChild(ch);
    cta.appendChild(el("p", "ilmb-lead", "We'll come back to you with a quote and answer any questions. Induction is usually within 7 working days of registration."));
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
    var SEND = "Send my enquiry to CST Training";
    var sendBtn = el("button", "ilmb-btn or", SEND); sendBtn.type = "submit"; brow.appendChild(sendBtn);
    var call = el("a", "ilmb-btn ghost", "Or call " + phone); call.href = "tel:" + phone.replace(/\s/g, ""); brow.appendChild(call);
    var status = el("p", "ilmb-status"); status.setAttribute("role", "status"); form.appendChild(status);
    var thanks = el("div", "ilmb-thanks"); thanks.tabIndex = -1; cta.appendChild(thanks);
    thanks.appendChild(el("h3", null, "Thanks, we've got your enquiry."));
    thanks.appendChild(el("p", null, "Our team will be in touch shortly. If it's urgent, call " + phone + "."));

    function qualName() { var o = cur(); return o ? o.name : C.title + " (undecided: " + C.undecided + ")"; }
    function optionsText() {
      var o = cur();
      return o ? o.units.map(function (u) { return u.code + " " + u.name; }).join("; ") : "Undecided: " + C.undecided;
    }
    function summary() {
      var o = cur(), lines = [qualName() + ": enquiry", ""];
      if (o) {
        o.units.forEach(function (u) { lines.push(u.code + " " + u.name + " (" + u.cr + " credits, mandatory)"); });
        lines.push(""); lines.push("Total: " + o.cr + " credits"); lines.push("Price: " + o.price);
      } else lines.push("Help needed choosing between the " + C.undecided + ".");
      lines.push("Learners: " + fLearners.value);
      lines.push("Planned start: " + fStart.value);
      return lines.join("\n");
    }
    function render() {
      OPTS.forEach(function (o) { cards[o.key].setAttribute("aria-checked", state.opt === o.key ? "true" : "false"); });
      und.setAttribute("aria-checked", cur() ? "false" : "true");
      var o = cur();
      ch.textContent = o ? "Enquire about the " + o.tab : "Enquire and we'll help you choose";
      sum.textContent = summary();
    }
    fLearners.addEventListener("change", render);
    fStart.addEventListener("change", render);

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var first = fFirst.value.trim(), last = fLast.value.trim(), email = fEmail.value.trim(), ph = fPhone.value.trim();
      function err(tx, f) { status.className = "ilmb-status err"; status.textContent = tx; if (f) f.focus(); }
      if (!first || !last) return err("Add your first and last name.", first ? fLast : fFirst);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err("Enter a valid email address so we can reply.", fEmail);
      if (!ph) return err("Add a phone number so our team can talk your options through with you.", fPhone);

      var qx = fQ.value.trim();
      var fields = [
        { name: "firstname", value: first },
        { name: "lastname", value: last },
        { name: "email", value: email },
        { name: "phone", value: ph },
        { name: "message", value: summary() + (qx ? "\n\nQuestions:\n" + qx : "") },
        { name: "enquiry_qualification", value: qualName() },
        { name: "enquiry_options_selected", value: optionsText() },
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
          window.dataLayer.push({ event: "course_builder_submit", enquiry_qualification: qualName(), enquiry_options: cur() ? cur().units.map(function (u) { return u.code; }).join(";") : "undecided" });
        } catch (e) {}
        form.style.display = "none"; thanks.style.display = "block"; thanks.focus();
      }).catch(function () {
        sendBtn.disabled = false; sendBtn.textContent = SEND;
        err("That didn't send. Please try again, or call " + phone + " and we'll take your enquiry over the phone.");
      });
    });

    render();
  }

  function init() {
    try {
      injectPageCss();
      var roots = document.querySelectorAll(".cst-cmi-builder,.cst-cmi-course");
      if (!roots.length) return;
      injectCss();
      Array.prototype.forEach.call(roots, function (r, i) {
        if (r._cmibMounted) return;
        try { var ck = r.getAttribute("data-course"); if (ck) { if (COURSES[ck]) mountFixed(r, i, COURSES[ck]); } else if (r.hasAttribute("data-quals")) mountCoaching(r, i); else mount(r, i); } catch (e) { if (window.console) console.error("CMI builder:", e); }
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

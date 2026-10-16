/*!
 * CST Training NEBOSH hub (v23: team quote button centred)
 * Host on GitHub Pages, load with ?v=N cache buster.
 * Mount point: <div class="cst-nebosh-matcher"></div>
 * Live dates:  <div class="cst-nebosh-dates" data-search="NEBOSH Construction"></div>
 *   Reads published WooCommerce products through the Store API. Product titles must follow
 *   "Course name (format) | DD-MM-YYYY | Location". Fully booked and past dates are hidden.
 * IOSH tools:  <div class="cst-iosh-tailor" data-course="ms"></div>
 *               <div class="cst-iosh-timeline" data-course="ms"></div>
 *               <div class="cst-iosh-team" data-course="ms"></div>
 *               <div class="cst-iosh-finder"></div>  (hub: role, goal, study and prior give a course, price and next date)
 * WordPress strips <style> tags from page content, so this script also injects the hub's page CSS.
 */
(function () {
  "use strict";
  var SITE = "https://www.csttraining.co.uk";
  var C = {
 "ngc": {
  "name": "NEBOSH National General Certificate in Occupational Health and Safety",
  "short": "National General Certificate",
  "type": "Certificate",
  "url": "/nebosh-general-certificate-health-safety/",
  "length": "10 days online or classroom",
  "price": 1175,
  "fin": true,
  "who": "The usual first certificate for a career in health and safety, in any sector.",
  "why": [
   "The usual first certificate for a career in health and safety, in any sector",
   "Meets the academic requirement for Tech IOSH membership",
   "Starts every Monday, live online"
  ],
  "outcomes": [
   "Carry out a workplace risk assessment you can use the next day",
   "Advise on legal duties and what good health and safety management looks like",
   "Take part in incident investigations and support audits"
  ],
  "assess": "Two parts: a 24-hour scenario-based exam taken at home, and a risk assessment of a real workplace submitted online.",
  "notfor": "If you work on construction sites, the Construction certificate fits better and lets you apply for the CSCS AQP card."
 },
 "cn": {
  "name": "NEBOSH Health and Safety Management for Construction (UK)",
  "short": "Construction Certificate",
  "type": "Certificate",
  "url": "/nebosh-health-safety-management-construction/",
  "length": "10 days online or classroom",
  "price": 1175,
  "fin": true,
  "who": "For site managers, supervisors and anyone moving into construction health and safety.",
  "why": [
   "Built around construction sites and CDM 2015",
   "Holders can apply for the CSCS Academically Qualified Person (AQP) card",
   "SCQF Level 7, comparable to RQF Level 4"
  ],
  "outcomes": [
   "Recognise, assess and control a range of common construction hazards",
   "Develop safe systems of work and help manage contractors",
   "Advise on the roles, competencies and duties under construction legislation"
  ],
  "assess": "A digital, scenario-based exam taken directly with NEBOSH after your course, on a date you choose.",
  "notfor": "It doesn't meet the Tech IOSH requirement. If that's your goal, take the General Certificate."
 },
 "fire": {
  "name": "NEBOSH Certificate in Fire Safety",
  "short": "Fire Safety Certificate",
  "type": "Certificate",
  "url": "/nebosh-certificate-in-fire-safety-course/",
  "length": "4 days live online",
  "price": 1200,
  "fin": true,
  "who": "For anyone responsible for fire risk assessments in a building.",
  "why": [
   "For anyone responsible for fire risk assessments in a building",
   "Four days live online",
   "Includes a real fire risk assessment as part of the NEBOSH assessment"
  ],
  "outcomes": [
   "Carry out a fire risk assessment for a low to medium risk workplace",
   "Choose sensible fire prevention and protection measures",
   "Plan evacuation and emergency arrangements"
  ],
  "assess": "Two parts: a 24-hour scenario-based exam and a practical fire risk assessment.",
  "notfor": "It's a specialist fire qualification, not a general health and safety certificate."
 },
 "emc": {
  "name": "NEBOSH Environmental Management Certificate",
  "short": "Environmental Management Certificate",
  "type": "Certificate",
  "url": "/nebosh-environmental-management-certificate-course/",
  "length": "5 days live online",
  "price": 950,
  "fin": true,
  "who": "For people responsible for environmental performance or moving into sustainability.",
  "why": [
   "For people responsible for environmental performance or moving into sustainability",
   "Five days live online",
   "Includes a practical assessment of a real workplace"
  ],
  "outcomes": [
   "Assess environmental aspects and impacts in your workplace",
   "Understand environmental legal duties and management systems",
   "Plan for environmental emergencies and reduce waste and emissions"
  ],
  "assess": "Two parts: a 24-hour scenario-based exam and a practical assessment of environmental aspects and impacts in a workplace.",
  "notfor": "If you only need an introduction, Environmental Awareness is a shorter starting point."
 },
 "psm": {
  "name": "NEBOSH HSE Certificate in Process Safety Management",
  "short": "Process Safety Management",
  "type": "Specialist certificate",
  "url": "/nebosh-hse-cert-process-safety-management/",
  "length": "4 days live online",
  "price": 750,
  "fin": true,
  "who": "For supervisors and managers in oil and gas, chemicals and other high-hazard process industries.",
  "why": [
   "For supervisors and managers in oil and gas, chemicals and other high-hazard process industries",
   "Developed by NEBOSH with the HSE",
   "Four days live online"
  ],
  "outcomes": [
   "Understand how major process incidents happen",
   "Support a process safety management system",
   "Recognise the controls for reactions, storage, fire and explosion"
  ],
  "assess": "A 40-question multiple-choice exam, 90 minutes, online.",
  "notfor": "It isn't designed for experienced process safety engineers working on plant design."
 },
 "hsw": {
  "name": "NEBOSH Health and Safety at Work Award",
  "short": "Health and Safety at Work Award",
  "type": "Award",
  "url": "/health-and-safety-nebosh-award/",
  "length": "3 days live online",
  "price": 450,
  "fin": false,
  "who": "A practical grounding for team leaders, supervisors, HR and facilities staff.",
  "why": [
   "A practical grounding for team leaders, supervisors, HR and facilities staff",
   "Three days live online",
   "The natural first step towards the General Certificate"
  ],
  "outcomes": [
   "Carry out simple workplace inspections and spot common hazards",
   "Assess risks and suggest sensible controls",
   "Understand why accidents happen and how to investigate them"
  ],
  "assess": "A workplace-based health and safety review at the end of the course.",
  "notfor": "If you want a health and safety career, go straight to the General Certificate."
 },
 "le": {
  "name": "NEBOSH HSE Certificate in Health and Safety Leadership Excellence",
  "short": "Leadership Excellence",
  "type": "Short course",
  "url": "/nebosh-hse-certificate-in-leadership-excellence/",
  "length": "1 day live online",
  "price": 250,
  "fin": false,
  "who": "One day for directors, owners and senior leaders.",
  "why": [
   "One day for directors, owners and senior leaders",
   "Developed with the HSE",
   "Works best booked for a whole leadership team"
  ],
  "outcomes": [
   "Understand your legal and moral leadership duties",
   "See how leadership shapes safety culture",
   "Leave with a plan for your own organisation"
  ],
  "assess": "A reflective statement during the day, with no exam.",
  "notfor": "It's about leading safety culture, not managing day-to-day risk."
 },
 "mr": {
  "name": "NEBOSH HSE Award in Managing Risks and Risk Assessment at Work",
  "short": "Managing Risks and Risk Assessment",
  "type": "Award",
  "url": "/nebosh-hse-managing-risks-at-work/",
  "length": "E-learning or 1 day live",
  "price": 415,
  "fin": false,
  "who": "For anyone who manages health and safety risks or carries out risk assessments.",
  "why": [
   "Practical, proportionate risk assessment the way the HSE recommends",
   "Start today online, or spend one day with a tutor",
   "A good first step towards the General Certificate"
  ],
  "outcomes": [
   "Identify the hazards that matter",
   "Assess risk in a sensible, proportionate way",
   "Choose controls and record them properly"
  ],
  "assess": null,
  "notfor": "It's an award, not a professional health and safety qualification."
 },
 "ii": {
  "name": "NEBOSH HSE Introduction to Incident Investigation",
  "short": "Incident Investigation",
  "type": "Short course",
  "url": "/nebosh-course-incident-investigation/",
  "length": "1 day live online",
  "price": 270,
  "fin": false,
  "who": "For supervisors, safety reps and anyone who investigates incidents.",
  "why": [
   "For supervisors, safety reps and anyone who investigates incidents",
   "One day, live online",
   "Assessed on a realistic set of incident evidence"
  ],
  "outcomes": [
   "Investigate straightforward incidents yourself",
   "Gather evidence and interview witnesses well",
   "Write actions that stop it happening again"
  ],
  "assess": "A practical review of incident evidence, ending in an action plan.",
  "notfor": "It's an introduction, so for complex investigations combine it with the General Certificate."
 },
 "ms": {
  "name": "NEBOSH HSE Certificate in Managing Stress at Work",
  "short": "Managing Stress at Work",
  "type": "Short course",
  "url": "/nebosh-hse-certificate-in-managing-stress-at-work/",
  "length": "E-learning or live",
  "price": 320,
  "fin": false,
  "who": "For line managers, HR teams and health and safety practitioners.",
  "why": [
   "For line managers, HR teams and health and safety practitioners",
   "Uses the HSE Management Standards",
   "Start today online, or learn with a tutor"
  ],
  "outcomes": [
   "Recognise the early signs of work-related stress",
   "Assess stress risk with the HSE Management Standards",
   "Plan practical interventions"
  ],
  "assess": null,
  "notfor": "It's about organisational stress risk, not counselling individuals."
 },
 "mh": {
  "name": "NEBOSH HSE Certificate in Manual Handling Risk Assessment",
  "short": "Manual Handling Risk Assessment",
  "type": "Short course",
  "url": "/nebosh-hse-manual-handling-risk-assessment/",
  "length": "E-learning or live",
  "price": 320,
  "fin": false,
  "who": "For safety champions, supervisors and occupational health teams.",
  "why": [
   "For safety champions, supervisors and occupational health teams",
   "Uses the HSE's own assessment tools",
   "Start today online, or learn with a tutor"
  ],
  "outcomes": [
   "Assess manual handling tasks with recognised HSE tools",
   "Spot the factors that cause musculoskeletal injuries",
   "Recommend practical controls"
  ],
  "assess": "A practical task: assess a filmed manual handling activity using the HSE's tools.",
  "notfor": "It's about assessing tasks, not lifting technique training for operatives."
 },
 "wwb": {
  "name": "NEBOSH Working with Wellbeing",
  "short": "Working with Wellbeing",
  "type": "Short course",
  "url": "/working-with-wellbeing-nebosh/",
  "length": "E-learning or live",
  "price": 150,
  "fin": false,
  "who": "For managers, HR and anyone supporting people at work.",
  "why": [
   "For managers, HR and anyone supporting people at work",
   "Built on the NEBOSH wellbeing tree",
   "Start today online, or learn with a tutor"
  ],
  "outcomes": [
   "Understand the factors that shape wellbeing at work",
   "Review how your organisation is doing",
   "Plan and measure three practical initiatives"
  ],
  "assess": "A two-part written task: review your workplace, then plan three wellbeing initiatives.",
  "notfor": "It's about workplace wellbeing, not mental health first aid."
 },
 "ea": {
  "name": "NEBOSH Award in Environmental Awareness at Work",
  "short": "Environmental Awareness",
  "type": "Award",
  "url": "/nebosh-award-environmental-awareness/",
  "length": "E-learning or live",
  "price": 300,
  "fin": false,
  "who": "An introduction for team leaders, supervisors and facilities staff.",
  "why": [
   "An introduction for team leaders, supervisors and facilities staff",
   "Start today online, or learn with a tutor",
   "Leads on to the Environmental Management Certificate"
  ],
  "outcomes": [
   "Understand how everyday work affects the environment",
   "Know your part in an environmental management system",
   "Respond to environmental incidents"
  ],
  "assess": "An online multiple-choice assessment.",
  "notfor": "If you manage environmental performance, take the Environmental Management Certificate."
 }
};

  var ROLES = [
    ["site", "a site operative or tradesperson"],
    ["sitemgr", "a site supervisor or manager"],
    ["hs", "working in health and safety"],
    ["mgr", "a manager, or in HR or facilities"],
    ["leader", "a director or senior leader"],
    ["process", "in a process or high-hazard industry"],
    ["env", "in an environmental or sustainability role"],
    ["other", "in another role outside construction"]
  ];
  var GOALS = [
    ["career", "start or build a career in health and safety"],
    ["moveup", "move up into site management"],
    ["manage", "manage health and safety in my team"],
    ["culture", "lead a safer culture"],
    ["risk", "get on top of a specific risk"],
    ["env", "improve environmental performance"],
    ["team", "train my team"]
  ];
  var RISKS = [
    ["fire", "fire safety"], ["ra", "risk assessment"], ["inc", "investigating incidents"],
    ["mh", "manual handling"], ["stress", "work-related stress"], ["wb", "wellbeing"], ["process", "process safety"]
  ];
  var RISK_COURSE = { fire: "fire", ra: "mr", inc: "ii", mh: "mh", stress: "ms", wb: "wwb", process: "psm" };

  // One rules table for the hub (keep in step with the course pages' "is this right for you" verdicts)
  function recommend(role, goal, risk) {
    var site = role === "site" || role === "sitemgr";
    if (goal === "risk") {
      var p = RISK_COURSE[risk];
      return p ? { main: p, alt: p === "mr" ? "hsw" : "mr" } : null;
    }
    if (goal === "career") {
      if (site) return { main: "cn", alt: "ngc" };
      if (role === "process") return { main: "ngc", alt: "psm" };
      if (role === "env") return { main: "ngc", alt: "emc" };
      return { main: "ngc", alt: "cn" };
    }
    if (goal === "moveup") return site ? { main: "cn", alt: "ngc" } : { main: "ngc", alt: "cn" };
    if (goal === "manage") {
      if (site) return { main: "cn", alt: "hsw" };
      if (role === "leader") return { main: "le", alt: "hsw" };
      if (role === "process") return { main: "psm", alt: "mr" };
      return { main: "hsw", alt: "ngc" };
    }
    if (goal === "culture") return { main: "le", alt: "hsw" };
    if (goal === "env") return role === "env" ? { main: "emc", alt: "ea" } : { main: "ea", alt: "emc" };
    if (goal === "team") {
      if (site) return { main: "cn", alt: "mr", team: true };
      if (role === "leader") return { main: "le", alt: "hsw", team: true };
      if (role === "process") return { main: "psm", alt: "mr", team: true };
      if (role === "env") return { main: "emc", alt: "ea", team: true };
      return { main: "hsw", alt: "mr", team: true };
    }
    return null;
  }

  var CSS = [
    /* Matcher */
    ".nbm{--n:#1d2560;--o:#ff8c04;--bg:#f4f5f9;--mut:#565c75;--ln:#dcdfea;--ns:#e7e9f3;color:#1b1f33;font-size:17px;line-height:1.55}",
    ".nbm *{box-sizing:border-box}",
    ".nbm-q{background:#fff;border:1px solid var(--ln);border-radius:14px;padding:26px 28px;font-size:22px;line-height:2.1;color:var(--n);font-weight:700}",
    ".nbm-q label{display:inline}",
    ".nbm-sel{position:relative;display:inline-block;margin:0 4px;vertical-align:middle}",
    ".nbm-sel select{-webkit-appearance:none;appearance:none;font:inherit;font-size:18px;font-weight:700;color:var(--n);background:var(--bg);border:2px solid var(--ln);border-radius:30px;padding:6px 40px 6px 18px;cursor:pointer;max-width:100%;line-height:1.4}",
    ".nbm-sel select:focus-visible{outline:3px solid var(--o);outline-offset:2px}",
    ".nbm-sel.set select{border-color:var(--o);background:#fff6ea}",
    ".nbm-sel::after{content:'';position:absolute;right:16px;top:50%;width:8px;height:8px;border-right:2px solid var(--n);border-bottom:2px solid var(--n);transform:translateY(-70%) rotate(45deg);pointer-events:none}",
    ".nbm-risk{display:none}.nbm-risk.on{display:inline}",
    ".nbm-hint{margin:14px 0 0;font-size:15px;color:var(--mut);font-weight:400;line-height:1.5}",
    ".nbm-res{margin-top:22px;display:none}.nbm-res.on{display:block}",
    ".nbm-card{background:#fff;border:1px solid var(--ln);border-left:6px solid var(--o);border-radius:14px;padding:28px 30px}",
    ".nbm-tag{display:inline-block;background:var(--n);color:#fff;font-size:13px;font-weight:700;border-radius:30px;padding:3px 12px;margin-bottom:10px}",
    ".nbm-card h3{color:var(--n);font-size:26px;line-height:1.25;margin:0 0 12px}",
    ".nbm-facts{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px}",
    ".nbm-facts span{background:var(--ns);color:var(--n);font-size:14px;font-weight:700;border-radius:30px;padding:5px 14px}",
    ".nbm-cols{display:grid;grid-template-columns:1fr 1fr;gap:24px}",
    "@media(max-width:760px){.nbm-cols{grid-template-columns:1fr}.nbm-q{font-size:19px;padding:20px}.nbm-sel{display:block;margin:6px 0}.nbm-sel select{width:100%}}",
    ".nbm-card h4{color:var(--n);font-size:17px;margin:0 0 8px}",
    ".nbm-card ul{margin:0;padding-left:1.15em}.nbm-card li{margin:0 0 6px;color:#1b1f33}",
    ".nbm-note{background:var(--bg);border-radius:10px;padding:12px 16px;margin:18px 0 0;font-size:15px;color:var(--mut)}",
    ".nbm-note b{color:var(--n)}",
    ".nbm-btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}",
    ".nbm-btn{display:inline-block;font-weight:700;font-size:16px;border-radius:30px;padding:12px 26px;text-decoration:none!important;border:2px solid var(--n)}",
    ".nbm-btn.or{background:var(--o);border-color:var(--o);color:#1b1f33!important}",
    ".nbm-btn.nv{background:var(--n);color:#fff!important}",
    ".nbm-btn.gh{background:#fff;color:var(--n)!important}",
    ".nbm-btn:focus-visible{outline:3px solid var(--o);outline-offset:2px}",
    ".nbm-alt{margin-top:16px;background:#fff;border:1px dashed var(--ln);border-radius:12px;padding:16px 20px;font-size:16px}",
    ".nbm-alt a{color:var(--n);font-weight:700}",
    ".nbm-reset{background:none;border:0;color:var(--mut);text-decoration:underline;cursor:pointer;font:inherit;font-size:15px;margin-top:14px;padding:0}",
    /* Course explorer cards */
    ".nbx-group{margin:0 0 34px}",
    ".nbx-group>p{margin:0 0 16px}",
    "details.nbx-course{background:#fff;border:1px solid #dcdfea;border-radius:12px;margin:0 0 12px;overflow:hidden}",
    "details.nbx-course[open]{border-color:#1d2560}",
    ".nbx-course summary{list-style:none;cursor:pointer;display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;padding:18px 22px}",
    ".nbx-course summary::-webkit-details-marker{display:none}",
    ".nbx-course summary:focus-visible{outline:3px solid #ff8c04;outline-offset:-3px}",
    ".nbx-name{flex:1 1 320px;color:#1d2560;font-weight:700;font-size:18px;line-height:1.35}",
    ".nbx-meta{display:flex;flex-wrap:wrap;gap:8px}",
    ".nbx-meta span{background:#e7e9f3;color:#1d2560;font-size:14px;font-weight:700;border-radius:30px;padding:4px 12px;white-space:nowrap}",
    ".nbx-meta span.pr{background:#fff6ea;color:#8a4b00}",
    ".nbx-course summary::after{content:'+';font-size:28px;line-height:1;color:#ff8c04;font-weight:700;flex:none}",
    ".nbx-course[open] summary::after{content:'\\2212'}",
    ".nbx-body{padding:0 22px 22px;display:grid;grid-template-columns:1fr 1fr;gap:20px 28px;border-top:1px solid #e7e9f3;padding-top:18px}",
    "@media(max-width:760px){.nbx-body{grid-template-columns:1fr}}",
    ".nbx-body h4{color:#1d2560;font-size:16px;margin:0 0 6px}",
    ".nbx-body p{margin:0;color:#3a3f55;font-size:16px}",
    ".nbx-body ul{margin:0;padding-left:1.15em;color:#3a3f55;font-size:16px}",
    ".nbx-body li{margin:0 0 4px}",
    ".nbx-wide{grid-column:1/-1}",
    ".nbx-links{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:12px}",
    /* Course cards (v2) */
    ".nbx-gh{border-left:6px solid #ff8c04;padding:2px 0 2px 16px;margin:34px 0 18px}",
    ".nbx-gh h3.nbx-gt{color:#1d2560!important;font-size:26px!important;line-height:1.25!important;margin:0 0 4px!important}",
    ".nbx-gh p.nbx-gp{margin:0!important;color:#565c75;font-size:16px}",
    ".nbx-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;align-items:stretch}",
    ".nbx-grid:has(details[open]){align-items:start}",
    ".nbx-cc{background:#fff;border:1px solid #dcdfea;border-radius:14px;overflow:hidden;display:flex;flex-direction:column}",
    ".nbx-cc-top{background:#1d2560;padding:18px 20px 16px;border-bottom:4px solid #ff8c04}",
    ".nbx-cc-top p.nbx-cc-type{color:#ff8c04!important;font-weight:700;font-size:14px!important;margin:0 0 4px!important;line-height:1.3}",
    ".nbx-cc-top h4.nbx-cc-name{color:#fff!important;font-size:19px!important;line-height:1.3!important;margin:0!important;font-weight:700}",
    ".nbx-cc-facts{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid #e7e9f3;background:#f4f5f9}",
    ".nbx-cc-fact{padding:12px 16px 12px 20px}",
    ".nbx-cc-fact+.nbx-cc-fact{border-left:1px solid #e7e9f3}",
    ".nbx-cc-fact p.nbx-l{margin:0!important;font-size:13px;color:#565c75;line-height:1.3}",
    ".nbx-cc-fact p.nbx-v{margin:2px 0 0!important;font-size:15px;font-weight:700;color:#1d2560;line-height:1.35}",
    ".nbx-cc-fact p.nbx-v.pr{color:#b35f00}",
    ".nbx-cc p.nbx-cc-who{padding:14px 20px 0;margin:0!important;font-size:15px;color:#3a3f55;line-height:1.5;flex:1}",
    "details.nbx-cc-more{margin:12px 20px 0;border-top:1px solid #e7e9f3;padding-top:10px}",
    ".nbx-cc-more summary{list-style:none;cursor:pointer;font-weight:700;font-size:15px;color:#1d2560;display:flex;justify-content:space-between;gap:10px}",
    ".nbx-cc-more summary::-webkit-details-marker{display:none}",
    ".nbx-cc-more summary::after{content:'+';color:#ff8c04;font-size:22px;line-height:1}",
    ".nbx-cc-more[open] summary::after{content:'\\2212'}",
    ".nbx-cc-more summary:focus-visible{outline:3px solid #ff8c04;outline-offset:2px}",
    ".nbx-cc-more p.nbx-h{margin:12px 0 2px!important;font-weight:700;color:#1d2560;font-size:14px}",
    ".nbx-cc-more p.nbx-t,.nbx-cc-more li{margin:0!important;font-size:14px;color:#3a3f55;line-height:1.5}",
    ".nbx-cc-more ul.nbx-ul{margin:0!important;padding-left:1.1em!important}",
    ".nbx-cc-btns{padding:16px 20px 20px;display:flex;flex-wrap:wrap;gap:8px}",
    ".nbx-btn{display:inline-block;font-weight:700;font-size:15px;border-radius:30px;padding:10px 18px;text-decoration:none!important;line-height:1.2;border:2px solid #1d2560}",
    ".nbx-btn.or{background:#ff8c04;border-color:#ff8c04;color:#1b1f33!important}",
    ".nbx-btn.gh{background:#fff;color:#1d2560!important}",
    ".nbx-btn:focus-visible{outline:3px solid #ff8c04;outline-offset:2px}",
    /* Stats band */
    ".nbx-stats{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:10px}",
    "@media(max-width:760px){.nbx-stats{grid-template-columns:1fr}}",
    ".nbx-stat{border:2px solid rgba(255,255,255,.18);border-radius:14px;padding:24px 28px;text-align:center}",
    ".nbx-stat p.nbx-n{margin:0!important;color:#ff8c04!important;font-size:72px!important;line-height:1!important;font-weight:700}",
    ".nbx-stat p.nbx-d{margin:10px 0 0!important;color:#fff!important;font-size:19px;line-height:1.45}",
    /* Individual course pages (v5) */
    ".nbx-kf .nbx-cc-facts{grid-template-columns:1fr 1fr}",
    ".nbx-kf .nbx-cc-fact{border-top:1px solid #e7e9f3}",
    ".nbx-kf .nbx-cc-fact:nth-child(-n+2){border-top:0}",
    ".nbx-kf .nbx-cc-fact:nth-child(odd){border-left:0}",
    ".nbx-fit{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:10px}",
    "@media(max-width:760px){.nbx-fit{grid-template-columns:1fr}}",
    ".nbx-fit .nbx-cc-top.no{background:#565c75}",
    "ul.nbx-check{list-style:none!important;margin:0!important;padding:16px 20px 20px!important}",
    "ul.nbx-check li.nbx-ci{position:relative;padding:0 0 0 30px!important;margin:0 0 10px!important;font-size:16px;line-height:1.5;color:#3a3f55}",
    "ul.nbx-check li.nbx-ci::before{content:'';position:absolute;left:4px;top:4px;width:8px;height:14px;border:solid #ff8c04;border-width:0 3px 3px 0;transform:rotate(45deg)}",
    "ul.nbx-check.x li.nbx-ci::before{width:14px;height:3px;border:0;background:#565c75;transform:none;top:11px;left:2px}",
    ".nbx-els{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;margin-top:10px}",
    ".nbx-el{display:flex;align-items:center;gap:14px;background:#fff;border-radius:12px;padding:14px 16px}",
    ".nbx-el p.nbx-eln{flex:none;width:40px;height:40px;border-radius:50%;background:#1d2560;color:#fff!important;font-weight:700;font-size:16px;display:flex;align-items:center;justify-content:center;margin:0!important}",
    ".nbx-el p.nbx-elt{margin:0!important;color:#1d2560;font-weight:700;font-size:16px;line-height:1.35}",
    ".nbx-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:10px;counter-reset:nbs}",
    ".nbx-step{background:#fff;border:1px solid #dcdfea;border-top:4px solid #ff8c04;border-radius:12px;padding:18px 18px 20px;counter-increment:nbs}",
    ".nbx-step::before{content:counter(nbs);display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:#1d2560;color:#fff;font-weight:700;margin-bottom:10px}",
    ".nbx-step p.nbx-sh{margin:0 0 4px!important;color:#1d2560;font-weight:700;font-size:17px}",
    ".nbx-step p.nbx-st{margin:0!important;color:#3a3f55;font-size:15px;line-height:1.5}",
    ".nbx-fmts{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:10px 0 30px}",
    ".nbx-fmt{background:#1d2560;border-radius:12px;padding:20px 22px;border-bottom:4px solid #ff8c04}",
    ".nbx-fmt p.nbx-fh{margin:0 0 4px!important;color:#ff8c04!important;font-weight:700;font-size:15px}",
    ".nbx-fmt p.nbx-ft{margin:0!important;color:#fff!important;font-weight:700;font-size:19px;line-height:1.35}",
    /* Live dates (v7) */
    ".nbd{--n:#1d2560;--o:#ff8c04;color:#1b1f33}",
    ".nbd-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;margin:0 0 18px}",
    ".nbd-tab{font:inherit;font-weight:700;font-size:15px;padding:9px 18px;border-radius:30px;border:2px solid #dcdfea;background:#fff!important;color:#1d2560!important;cursor:pointer}",
    ".nbd-tab[aria-pressed=true]{background:#4c6bd8!important;border-color:#4c6bd8!important;color:#fff!important}",
    ".nbd-tab:focus-visible,.nbd-loc:focus-visible,.nbd-more:focus-visible{outline:3px solid #ff8c04;outline-offset:2px}",
    ".nbd-loc{font:inherit;font-size:15px;font-weight:700;color:#1d2560;padding:9px 14px;border-radius:30px;border:2px solid #ff8c04;background:#fff6ea}",
    ".nbd-list{display:flex;flex-direction:column;gap:10px}",
    ".nbd-row{display:grid;grid-template-columns:150px 1fr auto auto;gap:14px 20px;align-items:center;background:#fff;border:1px solid #dcdfea;border-left:5px solid #ff8c04;border-radius:12px;padding:14px 18px}",
    "@media(max-width:760px){.nbd-row{grid-template-columns:1fr auto}.nbd-row .nbd-what{grid-column:1/-1;order:-1}}",
    ".nbd-date{font-weight:700;color:#1d2560;font-size:18px;line-height:1.2}",
    ".nbd-date span{display:block;font-size:13px;font-weight:400;color:#565c75;margin-top:2px}",
    ".nbd-what{font-size:16px;color:#1b1f33;line-height:1.35}",
    ".nbd-what b{color:#1d2560}",
    ".nbd-low{display:inline-block;margin-left:8px;font-size:13px;font-weight:700;color:#b35f00;background:#fff6ea;border-radius:30px;padding:2px 10px}",
    ".nbd-price{font-weight:700;color:#1d2560;white-space:nowrap}",
    ".nbd-row .nbx-btn{white-space:nowrap}",
    ".nbd-more{display:block;margin:16px auto 0;font:inherit;font-weight:700;background:#fff;border:2px solid #1d2560;color:#1d2560;border-radius:30px;padding:10px 24px;cursor:pointer}",
    ".nbd-msg{text-align:center;background:#fff;border:1px dashed #dcdfea;border-radius:12px;padding:18px;color:#565c75}",
    ".nbd-msg a{color:#1d2560;font-weight:700}",
    ".nbd-skel{min-height:62px}",
    ".nbd-sk{height:14px;border-radius:7px;background:linear-gradient(90deg,#e7e9f3 25%,#f4f5f9 50%,#e7e9f3 75%);background-size:200% 100%;animation:nbdsk 1.2s infinite linear}",
    ".nbd-sk.w1{width:110px}.nbd-sk.w2{width:70%}.nbd-sk.w3{width:90px}.nbd-sk.w4{width:100px;height:38px;border-radius:30px}",
    "@keyframes nbdsk{0%{background-position:200% 0}100%{background-position:-200% 0}}",
    "@media(prefers-reduced-motion:reduce){.nbd-sk{animation:none}}",
    /* Dark section (data-theme=\"dark\"): orange selected tab, white outline button */
    ".nbd.nbd-dark .nbd-tab{border-color:#fff}",
    ".nbd.nbd-dark .nbd-more{background:transparent;border-color:#fff;color:#fff}",
    /* IOSH course tools (v17) */
    ".nbi{color:#1b1f33;font-size:16px;line-height:1.55}",
    ".nbi *{box-sizing:border-box}",
    ".nbi-bar{background:#fff;border:1px solid #dcdfea;border-radius:14px;padding:22px 26px;font-size:20px;line-height:2.1;color:#1d2560;font-weight:700}",
    ".nbi-bar select,.nbi-f select,.nbi-f input{-webkit-appearance:none;appearance:none;font:inherit;font-size:16px;font-weight:700;color:#1d2560;background:#f4f5f9;border:2px solid #dcdfea;border-radius:30px;padding:6px 16px;margin:0 4px;max-width:100%}",
    ".nbi-bar select.set{border-color:#ff8c04;background:#fff6ea}",
    ".nbi-bar select:focus-visible,.nbi-f select:focus-visible,.nbi-f input:focus-visible,.nbi button:focus-visible{outline:3px solid #ff8c04;outline-offset:2px}",
    "@media(max-width:760px){.nbi-bar{font-size:17px}.nbi-bar select{display:block;width:100%;margin:6px 0}}",
    ".nbi-hint{margin:10px 0 0!important;font-size:14px;font-weight:400;color:#565c75;line-height:1.5}",
    ".nbi-out{margin-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:18px}",
    "@media(max-width:760px){.nbi-out{grid-template-columns:1fr}}",
    ".nbi-v{grid-column:1/-1;background:#fff;border:1px solid #dcdfea;border-left:6px solid #ff8c04;border-radius:14px;padding:22px 24px}",
    ".nbi-v.warn{border-left-color:#4c6bd8}",
    ".nbi-v .nbi-vt{display:inline-block;background:#1d2560;color:#fff;font-size:13px;font-weight:700;border-radius:30px;padding:3px 12px;margin-bottom:8px}",
    ".nbi-v.warn .nbi-vt{background:#4c6bd8}",
    ".nbi-v h3{color:#1d2560!important;font-size:22px!important;line-height:1.3!important;margin:0 0 8px!important}",
    ".nbi-v p{margin:0 0 10px!important;color:#3a3f55}",
    ".nbi-card{background:#fff;border:1px solid #dcdfea;border-radius:14px;padding:20px 22px}",
    ".nbi-card h4{color:#1d2560!important;font-size:18px!important;margin:0 0 10px!important}",
    ".nbi-card ul{margin:0!important;padding-left:1.15em!important}.nbi-card li{margin:0 0 8px!important;color:#3a3f55}",
    ".nbi-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}",
    ".nbi-chips span{background:#e7e9f3;color:#1d2560;font-size:13px;font-weight:700;border-radius:30px;padding:4px 12px}",
    ".nbi-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}",
    ".nbi-tl{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:16px}",
    ".nbi-tl div{background:#fff;border:1px solid #dcdfea;border-top:4px solid #ff8c04;border-radius:12px;padding:14px 16px;color:#3a3f55;font-size:15px}",
    ".nbi-tl b{display:block;color:#1d2560;font-size:14px;margin-bottom:4px}",
    ".nbi-f{display:flex;flex-wrap:wrap;gap:12px 18px;align-items:center;justify-content:center;color:#fff;font-weight:700}",
    ".nbi-f label{display:flex;align-items:center;gap:8px;flex-wrap:wrap}",
    ".nbi-small{font-size:14px!important;color:#565c75;margin:10px 0 0!important}",
    ".nbi-form{display:grid;grid-template-columns:1fr 1fr;gap:12px 14px;margin-top:18px}",
    "@media(max-width:600px){.nbi-form{grid-template-columns:1fr}}",
    ".nbi-form .full{grid-column:1/-1}",
    ".nbi-form label{display:block;font-weight:700;font-size:14px;color:#1d2560;margin-bottom:4px}",
    ".nbi-form input,.nbi-form select,.nbi-form textarea{display:block;width:100%;font:inherit;padding:10px 12px;border:1.5px solid #dcdfea;border-radius:8px;background:#fff;color:#1b1f33}",
    ".nbi-form textarea{min-height:90px}",
    ".nbi-status{font-weight:700;color:#1d2560;margin:4px 0 0!important}.nbi-status.err{color:#b3261e}",
    ".nbi-res{margin-top:18px;background:#fff;border:1px solid #dcdfea;border-left:6px solid #ff8c04;border-radius:14px;padding:24px 26px}",
    ".nbi-res .nbi-vt{display:inline-block;background:#1d2560;color:#fff;font-size:13px;font-weight:700;border-radius:30px;padding:3px 12px;margin-bottom:8px}",
    ".nbi-res h3{color:#1d2560!important;font-size:24px!important;line-height:1.3!important;margin:0 0 10px!important}",
    ".nbi-res p{margin:0 0 12px!important;color:#3a3f55}",
    ".nbi-meta{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}",
    ".nbi-meta span{background:#e7e9f3;color:#1d2560;font-size:14px;font-weight:700;border-radius:30px;padding:5px 14px}",
    ".nbi-meta span.nx{background:#fff6ea;color:#8a4b00}",
    ".nbi-alt{margin-top:12px;font-size:15px;color:#565c75}.nbi-alt a{color:#1d2560;font-weight:700}",
    ".nbi-reset{background:none;border:0;color:#565c75;text-decoration:underline;cursor:pointer;font:inherit;font-size:14px;margin-top:12px;padding:0}",
    ".nbi-thanks{display:none;background:#fff6ea;border-left:4px solid #ff8c04;border-radius:8px;padding:16px 18px;margin-top:16px}",
    /* Comparison table and FAQs */
    ".nbx-tw{overflow-x:auto;border-radius:12px;margin-top:20px;border:1px solid #dcdfea;background:#fff}",
    ".nbx-tw table{border-collapse:collapse;width:100%;min-width:640px;background:#fff;margin:0}",
    ".nbx-tw th,.nbx-tw td{padding:14px 16px;text-align:left;border-bottom:1px solid #dcdfea;vertical-align:top;font-size:16px;color:#1b1f33}",
    ".nbx-tw thead th{background:#1d2560;color:#fff;font-weight:700}",
    ".nbx-tw tbody th{background:#f4f5f9;color:#1d2560;font-weight:700}",
    ".nbx-tw tr:last-child td,.nbx-tw tr:last-child th{border-bottom:0}",
    ".nbx-faq details{border-bottom:1px solid #dcdfea;padding:18px 0}",
    ".nbx-faq details:first-of-type{border-top:1px solid #dcdfea}",
    ".nbx-faq summary{cursor:pointer;font-weight:700;font-size:18px;color:#1d2560;list-style:none;display:flex;justify-content:space-between;gap:16px}",
    ".nbx-faq summary::-webkit-details-marker{display:none}",
    ".nbx-faq summary::after{content:'+';font-size:26px;line-height:1;color:#ff8c04;flex:none}",
    ".nbx-faq details[open] summary::after{content:'\\2212'}",
    ".nbx-faq details p{margin:10px 0 0;color:#565c75}",
    "@media(prefers-reduced-motion:reduce){.nbm *,.nbx-course *{transition:none!important}}"
  ].join("");

  function injectCss() {
    if (document.getElementById("nbx-css")) return;
    var s = document.createElement("style"); s.id = "nbx-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }
  function el(t, c, txt) { var e = document.createElement(t); if (c) e.className = c; if (txt != null) e.textContent = txt; return e; }
  function money(n) { return "£" + n.toLocaleString("en-GB"); }
  function select(id, label, opts) {
    var w = el("span", "nbm-sel");
    var s = el("select"); s.id = id; s.setAttribute("aria-label", label);
    var o0 = el("option", null, "choose..."); o0.value = ""; s.appendChild(o0);
    opts.forEach(function (o) { var op = el("option", null, o[1]); op.value = o[0]; s.appendChild(op); });
    w.appendChild(s); return w;
  }
  function btn(href, cls, txt) { var a = el("a", "nbm-btn " + cls, txt); a.href = href; return a; }

  function mount(root, idx) {
    if (root._nbm) return; root._nbm = true;
    root.classList.add("nbm"); root.innerHTML = "";
    var uid = "nbm" + idx + "-";
    var q = el("div", "nbm-q"); root.appendChild(q);
    q.appendChild(document.createTextNode("I'm "));
    var sRole = select(uid + "role", "Your role", ROLES); q.appendChild(sRole);
    q.appendChild(document.createTextNode(" and I want to "));
    var sGoal = select(uid + "goal", "What you want to achieve", GOALS); q.appendChild(sGoal);
    var riskWrap = el("span", "nbm-risk"); riskWrap.appendChild(document.createTextNode(", mainly "));
    var sRisk = select(uid + "risk", "Which risk", RISKS); riskWrap.appendChild(sRisk); q.appendChild(riskWrap);
    q.appendChild(document.createTextNode("."));
    q.appendChild(el("p", "nbm-hint", "Pick both and your recommended course appears straight away. No email needed."));
    var res = el("div", "nbm-res"); res.setAttribute("aria-live", "polite"); root.appendChild(res);

    var selects = [sRole, sGoal, sRisk];
    selects.forEach(function (w) {
      w.querySelector("select").addEventListener("change", function () { update(true); });
    });

    function update(track) {
      var role = sRole.querySelector("select").value, goal = sGoal.querySelector("select").value;
      var risk = goal === "risk" ? sRisk.querySelector("select").value : "";
      selects.forEach(function (w) { w.classList.toggle("set", !!w.querySelector("select").value); });
      riskWrap.classList.toggle("on", goal === "risk");
      res.innerHTML = ""; res.classList.remove("on");
      if (!role || !goal || (goal === "risk" && !risk)) return;
      var r = recommend(role, goal, risk); if (!r) return;
      render(r);
      if (track) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "nebosh_matcher", matcher_role: role, matcher_goal: goal, matcher_risk: risk || "", matcher_course: r.main });
      }
    }

    function render(r) {
      var c = C[r.main], a = C[r.alt];
      var card = el("div", "nbm-card");
      card.appendChild(el("span", "nbm-tag", "Our recommendation"));
      card.appendChild(el("h3", null, c.name));
      var facts = el("div", "nbm-facts");
      [c.type, c.length, "From " + money(c.price) + " + VAT"].concat(c.fin ? ["0% finance over 10 months"] : [])
        .forEach(function (f) { facts.appendChild(el("span", null, f)); });
      card.appendChild(facts);
      var cols = el("div", "nbm-cols"); card.appendChild(cols);
      var c1 = el("div"); c1.appendChild(el("h4", null, "Why it fits")); var u1 = el("ul");
      c.why.forEach(function (w) { u1.appendChild(el("li", null, w)); }); c1.appendChild(u1); cols.appendChild(c1);
      var c2 = el("div"); c2.appendChild(el("h4", null, "You'll be able to")); var u2 = el("ul");
      c.outcomes.forEach(function (w) { u2.appendChild(el("li", null, w)); }); c2.appendChild(u2); cols.appendChild(c2);
      if (c.assess) {
        var n1 = el("p", "nbm-note"); n1.appendChild(el("b", null, "How you're assessed: ")); n1.appendChild(document.createTextNode(c.assess)); card.appendChild(n1);
      }
      var n2 = el("p", "nbm-note"); n2.appendChild(el("b", null, "Worth knowing: ")); n2.appendChild(document.createTextNode(c.notfor)); card.appendChild(n2);
      if (r.team) {
        var n3 = el("p", "nbm-note"); n3.appendChild(el("b", null, "Booking for a team? ")); n3.appendChild(document.createTextNode("Call us on 020 3488 4472 for group pricing, or ask about running the course in-house.")); card.appendChild(n3);
      }
      var b = el("div", "nbm-btns");
      b.appendChild(btn(SITE + c.url, "or", "View the " + c.short));
      b.appendChild(btn(SITE + "/contact/", "nv", "Enquire now"));
      card.appendChild(b);
      res.appendChild(card);
      var alt = el("div", "nbm-alt");
      alt.appendChild(document.createTextNode("Also worth a look: "));
      var al = el("a", null, a.name); al.href = SITE + a.url; alt.appendChild(al);
      alt.appendChild(document.createTextNode(". " + a.who));
      res.appendChild(alt);
      var rs = el("button", "nbm-reset", "Start again"); rs.type = "button";
      rs.addEventListener("click", function () {
        selects.forEach(function (w) { w.querySelector("select").value = ""; }); update(false);
        sRole.querySelector("select").focus();
      });
      res.appendChild(rs);
      res.classList.add("on");
    }
  }


  // ---------- Live course dates (v7) ----------
  // Reads WooCommerce products by search term and groups them by format, parsed from the title.
  var FORMATS = [
    { id: "block",   label: "Two-week block",  test: function (t) { return !/classroom|weekend|day.?release|(^|[\s-])dr\b/i.test(t); }, note: "Online, Monday to Friday over 2 weeks" },
    { id: "day",     label: "Day release",     test: function (t) { return (/day.?release/i.test(t) || /(^|[\s-])dr\b/i.test(t)) && !/2 day/i.test(t); },        note: "Online, 1 day a week over 10 weeks" },
    { id: "twoday",  label: "Two-day release", test: function (t) { return /2 day day.?release/i.test(t); },                     note: "Online, 2 days a week over 5 weeks" },
    { id: "weekend", label: "Weekend",         test: function (t) { return /weekend/i.test(t) && !/classroom/i.test(t); },     note: "Online at weekends" },
    { id: "class",   label: "Classroom",       test: function (t) { return /classroom/i.test(t); },                                note: "Classroom" }
  ];
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  function decode(s) { var t = document.createElement("textarea"); t.innerHTML = s; return t.value; }
  function parseProduct(p) {
    var name = decode(p.name || ""), parts = name.split("|").map(function (x) { return x.trim(); });
    var m = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(parts[1] || name);
    if (!m) return null;
    var d = new Date(+m[3], +m[2] - 1, +m[1]);
    var fmt = null;
    for (var i = 0; i < FORMATS.length; i++) if (FORMATS[i].test(parts[0])) { fmt = FORMATS[i]; break; }
    if (!fmt) return null;
    // Titles like "IOSH-MS | 21-10-2026 | Chelmsford" name a town instead of saying "Classroom"
    var loc = parts[2] || "";
    if (fmt.id !== "class" && loc && !/online|virtual|remote|zoom|google meet/i.test(loc)) fmt = FORMATS[FORMATS.length - 1];
    var pr = p.prices || {}, mu = Math.pow(10, pr.currency_minor_unit == null ? 2 : pr.currency_minor_unit);
    return {
      id: p.id, date: d, fmt: fmt, loc: parts[2] || "",
      price: pr.price ? Math.round(+pr.price / mu) : null,
      inStock: p.is_in_stock !== false && p.is_purchasable !== false,
      low: p.low_stock_remaining || null, url: p.permalink
    };
  }
  var FETCHES = {}, CACHE_MS = 15 * 60 * 1000, KEEP_MS = 24 * 60 * 60 * 1000;
  function cacheGet(k) {
    try { var c = JSON.parse(localStorage.getItem("nbd:" + k) || "null"); return c && Date.now() - c.t < KEEP_MS ? c : null; } catch (e) { return null; }
  }
  function cacheSet(k, d) {
    try {
      var slim = (d || []).map(function (p) { return { id: p.id, name: p.name, permalink: p.permalink, prices: p.prices && { price: p.prices.price, currency_minor_unit: p.prices.currency_minor_unit }, is_in_stock: p.is_in_stock, is_purchasable: p.is_purchasable, low_stock_remaining: p.low_stock_remaining }; });
      localStorage.setItem("nbd:" + k, JSON.stringify({ t: Date.now(), d: slim }));
    } catch (e) {}
  }
  function fetchOne(base, search, fresh) {
    var k = base + "|" + search;
    if (!fresh) { var c = cacheGet(k); if (c && Date.now() - c.t < CACHE_MS) return Promise.resolve(c.d); }
    if (!FETCHES[k]) FETCHES[k] = fetchPages(base, search).then(function (d) { cacheSet(k, d); return d; })
      .catch(function (e) { delete FETCHES[k]; throw e; });
    return FETCHES[k];
  }
  function cachedAll(base, searches) {
    var lists = searches.map(function (q) { var c = cacheGet(base + "|" + q); return c ? c.d : null; });
    if (lists.some(function (l) { return !l; })) return null;
    var seen = {}, out = [];
    lists.forEach(function (l) { l.forEach(function (p) { if (!seen[p.id]) { seen[p.id] = 1; out.push(p); } }); });
    return { data: out, stale: searches.some(function (q) { return Date.now() - cacheGet(base + "|" + q).t >= CACHE_MS; }) };
  }
  function fetchAll(base, searches, fresh) {
    return Promise.all(searches.map(function (q) { return fetchOne(base, q, fresh); })).then(function (lists) {
      var seen = {}, out = [];
      lists.forEach(function (l) { (l || []).forEach(function (p) { if (!seen[p.id]) { seen[p.id] = 1; out.push(p); } }); });
      return out;
    });
  }
  function fetchPages(base, search) {
    var out = [], sep = base.indexOf("?") > -1 ? "&" : "?";
    function page(n) {
      return fetch(base + sep + "search=" + encodeURIComponent(search) + "&per_page=100&page=" + n +
        "&_fields=id,name,permalink,prices,is_in_stock,is_purchasable,low_stock_remaining", { credentials: "same-origin" })
        .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); var tp = +(r.headers.get("X-WP-TotalPages") || 1); return r.json().then(function (j) { return { j: j, tp: tp }; }); })
        .then(function (res) { out = out.concat(res.j); return n < res.tp && n < 5 ? page(n + 1) : out; });
    }
    return page(1);
  }

  function mountDates(root) {
    if (root._nbd) return; root._nbd = true;
    root.classList.add("nbd"); if (root.getAttribute("data-theme") === "dark") root.classList.add("nbd-dark"); root.innerHTML = "";
    var searches = (root.getAttribute("data-search") || "NEBOSH Construction").split("|").map(function (x) { return x.trim(); }).filter(Boolean);
    var must = (root.getAttribute("data-match") || "").split("|").map(function (x) { return x.trim().toLowerCase(); }).filter(Boolean);
    var not = (root.getAttribute("data-exclude") || "").split("|").map(function (x) { return x.trim().toLowerCase(); }).filter(Boolean);
    var base = root.getAttribute("data-endpoint") || "/wp-json/wc/store/v1/products";
    var vat = root.getAttribute("data-vat-label") || " + VAT";
    var fallback = root.getAttribute("data-fallback") || SITE + "/nebosh-course-type/";
    var step = +(root.getAttribute("data-show") || 8);
    var blockLabel = root.getAttribute("data-block-label"), blockNote = root.getAttribute("data-block-note");
    function fl(f) { return f.id === "block" && blockLabel ? blockLabel : f.label; }
    var dayNote = root.getAttribute("data-day-note");
    function fn(f) { return f.id === "block" && blockNote ? blockNote : f.id === "day" && dayNote ? dayNote : f.note; }
    var want = ""; try { want = (new URLSearchParams(location.search).get("dates") || "").toLowerCase(); } catch (e) {}
    var state = { fmt: want || "all", loc: "", shown: step }, items = [];

    var bar = el("div", "nbd-bar"); root.appendChild(bar);
    var list = el("div", "nbd-list"); list.setAttribute("aria-live", "polite"); root.appendChild(list);
    var more = el("button", "nbd-more", "Show more dates"); more.type = "button"; root.appendChild(more);
    more.addEventListener("click", function () { state.shown += step; draw(); });
    var msg = function (t) { list.innerHTML = ""; var p = el("p", "nbd-msg", t + " "); var a = el("a", null, "See all course dates"); a.href = fallback; p.appendChild(a); list.appendChild(p); more.style.display = "none"; };
    function skeleton() {
      list.innerHTML = "";
      for (var k = 0; k < 4; k++) { var r = el("div", "nbd-row nbd-skel"); r.appendChild(el("div", "nbd-sk w1")); r.appendChild(el("div", "nbd-sk w2")); r.appendChild(el("div", "nbd-sk w3")); r.appendChild(el("div", "nbd-sk w4")); list.appendChild(r); }
      more.style.display = "none";
    }
    skeleton();

    var locSel = el("select", "nbd-loc"); locSel.setAttribute("aria-label", "Choose a location");
    locSel.addEventListener("change", function () { state.loc = locSel.value; state.shown = step; draw(); });

    function tabs() {
      bar.innerHTML = "";
      [{ id: "all", label: "All dates" }].concat(FORMATS).forEach(function (f) {
        if (f.id !== "all" && !items.some(function (i) { return i.fmt.id === f.id; })) return;
        var b = el("button", "nbd-tab", f.id === "all" ? f.label : fl(f)); b.type = "button";
        b.setAttribute("aria-pressed", state.fmt === f.id ? "true" : "false");
        b.addEventListener("click", function () { state.fmt = f.id; state.loc = ""; state.shown = step; tabs(); draw(); });
        bar.appendChild(b);
      });
      if (state.fmt === "class") {
        var locs = items.filter(function (i) { return i.fmt.id === "class"; }).map(function (i) { return i.loc; })
          .filter(function (v, k, a) { return v && a.indexOf(v) === k; }).sort();
        locSel.innerHTML = ""; var o = el("option", null, "All locations"); o.value = ""; locSel.appendChild(o);
        locs.forEach(function (l) { var op = el("option", null, l); op.value = l; locSel.appendChild(op); });
        locSel.value = state.loc; bar.appendChild(locSel);
      }
    }
    function draw() {
      var rows = items.filter(function (i) { return (state.fmt === "all" || i.fmt.id === state.fmt) && (!state.loc || i.loc === state.loc); });
      list.innerHTML = "";
      if (!rows.length) { msg("No upcoming dates for this option right now."); return; }
      rows.slice(0, state.shown).forEach(function (i) {
        var r = el("div", "nbd-row");
        var dt = el("div", "nbd-date", i.date.getDate() + " " + MONTHS[i.date.getMonth()] + " " + i.date.getFullYear());
        dt.appendChild(el("span", null, DAYS[i.date.getDay()] + " start")); r.appendChild(dt);
        var w = el("div", "nbd-what"); w.appendChild(el("b", null, fl(i.fmt)));
        w.appendChild(document.createTextNode(" " + (i.fmt.id === "class" ? (i.loc ? "in " + i.loc : "") : "online, " + fn(i.fmt).replace(/^Online, /, ""))));
        if (i.low) w.appendChild(el("span", "nbd-low", "Only " + i.low + " place" + (i.low === 1 ? "" : "s") + " left"));
        r.appendChild(w);
        r.appendChild(el("div", "nbd-price", i.price != null ? money(i.price) + vat : ""));
        var a = el("a", "nbx-btn or", "Book now"); a.href = i.url; r.appendChild(a);
        list.appendChild(r);
      });
      more.style.display = rows.length > state.shown ? "" : "none";
    }

    var today = new Date(); today.setHours(0, 0, 0, 0);
    var settled = false, shown = false;
    setTimeout(function () { if (!settled && !shown && root.isConnected) msg("The dates are taking longer than usual to load."); }, 12000);
    function show(data) {
      if (must.length || not.length) data = (data || []).filter(function (p) {
        var n = decode(p.name || "").toLowerCase();
        return must.every(function (w) { return n.indexOf(w) > -1; }) && !not.some(function (w) { return n.indexOf(w) > -1; });
      });
      items = (data || []).map(parseProduct).filter(function (i) { return i && i.inStock && i.date >= today; })
        .sort(function (a, b) { return a.date - b.date; });
      if (!items.length) { msg("No upcoming dates are listed online right now."); return; }
      if (items.every(function (i) { return i.fmt.id !== state.fmt; }) && state.fmt !== "all") state.fmt = "all";
      shown = true; tabs(); draw();
    }
    // Show any saved copy straight away, then refresh it in the background when it's older than 15 minutes
    var cached = cachedAll(base, searches);
    if (cached) show(cached.data);
    if (!cached || cached.stale) {
      fetchAll(base, searches, !!cached).then(function (data) { settled = true; show(data); })
        .catch(function () { settled = true; if (!shown) msg("We couldn't load the dates just now."); });
    } else settled = true;
  }


  // ---------- IOSH course tools (v17) ----------
  var IOSH = {
    ms: {
      name: "IOSH Managing Safely", price: 390, cprice: 550, url: SITE + "/iosh-managing-safely/",
      roles: [["sup","a supervisor or team leader"],["mgr","a manager or department head"],["dir","a director or senior leader"],["site","a construction site manager or supervisor"],["ops","an operative, technician or office worker"],["hs","starting a career in health and safety"],["hr","in HR or L&D, booking for other people"]],
      goals: [["team","run my team safely"],["req","meet an employer, client or contract requirement"],["audit","respond to an audit, incident or insurer"],["cscs","get a CSCS card"],["refresh","refresh my Managing Safely"],["group","train a group of people"],["duties","understand my legal duties"]],
      P: {
        sup: { fit: "Managing Safely is the course IOSH built for supervisors and team leaders, the people who direct work without being safety professionals.",
          use: ["Write the risk assessment for your own section and brief your team on the controls","Run a toolbox talk on the hazards that actually matter in your area, not a generic list","Deal with a near miss properly: the immediate cause, the underlying cause and what changes","Know when to stop a job, and explain why in the language your manager and the HSE use"],
          next: "NEBOSH General if you move towards a health and safety role, and the Managing Safely Refresher at three years either way. First-time supervisors often pair this with the ILM Level 3 Award.",
          jobs: ["Supervisor","Team leader","Shift leader","Chargehand","Foreman"] },
        mgr: { fit: "Three days of practical management content built around the decisions a manager makes, with a live tutor who has made them. Day release keeps you in the business four days a week.",
          use: ["Sign off risk assessments knowing what \"suitable and sufficient\" means, and send the weak ones back","Set proactive indicators for your department, rather than just counting accidents","Lead an incident investigation that finds the underlying cause, not someone to blame","Answer an auditor's questions with evidence, not reassurance"],
          next: "NEBOSH General if your remit grows into health and safety, and the Refresher at three years.",
          jobs: ["Operations manager","Production manager","Facilities manager","Transport manager","Depot manager"] },
        dir: { fit: "If you want the practical detail your managers have, and a clear picture of where your personal duties sit, this is the course.",
          use: ["Understand your personal duties as a director under health and safety law","Ask the right questions of your management team about risk, controls and performance","Read your safety data and know which numbers matter","Set the tone with visible leadership on health and safety"],
          next: "Managing Safely for the managers below you as well, so everyone works to the same framework.",
          jobs: ["Director","Owner-manager","Head of operations","Partner"] },
        site: { fit: "Managing Safely gives you the management framework behind RAMS and permits. It's a general management course, not a CITB card course: for SMSTS or SSSTS see our CITB courses, and for a health and safety career on sites, NEBOSH Construction.",
          use: ["Review the RAMS your subcontractors hand you and spot what's missing","Investigate a site incident properly, before the client's health and safety team does","Measure site safety with proactive indicators, not just RIDDOR reports","Understand your duties as the person in charge of the site"],
          next: "NEBOSH Construction for a health and safety role on sites, or SMSTS or SSSTS if you need the CITB route.",
          jobs: ["Site manager","Site supervisor","Works manager","Project manager"] },
        ops: { fit: "", use: ["If you're stepping up to supervise, Managing Safely is the course to do first","Otherwise, Working Safely covers what you need in a day"], next: "Working Safely now, and Managing Safely when you supervise.", jobs: [] },
        hs: { fit: "", use: ["A grounding in risk assessment and the law before NEBOSH","Credibility with the managers you'll advise, because you'll have done their course"], next: "The NEBOSH General Certificate, which meets the academic requirement for Tech IOSH.", jobs: ["Health and safety co-ordinator","Health and safety adviser (with NEBOSH)"] },
        hr: { fit: "Managing Safely is the standard course employers specify for anyone who manages people. Three or more from one employer get 5% off any public date, seven or more 10%, and from six we can run it just for your organisation.",
          use: ["Book every new supervisor onto the next course as they're appointed","Run a closed course for a whole tier of management after an audit, incident or new contract","Mix courses: managers on Managing Safely, the workforce on Working Safely"],
          next: "Working Safely for your workforce, the Refresher for existing Managing Safely holders, and NEBOSH for your health and safety lead.",
          jobs: [] }
      }
    }
  };
  var NGC_URL = SITE + "/nebosh-general-certificate-health-safety/", WS_URL = SITE + "/iosh-working-safely/", CONTACT = SITE + "/contact/";
  function opt(sel, list, ph) { var o = el("option", null, ph); o.value = ""; sel.appendChild(o); list.forEach(function (x) { var p = el("option", null, x[1]); p.value = x[0]; sel.appendChild(p); }); }
  function linkBtn(href, cls, txt) { var a = el("a", "nbx-btn " + cls, txt); a.href = href; return a; }

  function mountTailor(root) {
    if (root._nbi) return; root._nbi = true;
    var K = IOSH[root.getAttribute("data-course") || "ms"]; if (!K) return;
    root.classList.add("nbi"); root.innerHTML = "";
    var bar = el("div", "nbi-bar"); root.appendChild(bar);
    bar.appendChild(document.createTextNode("I'm "));
    var sr = el("select"); sr.setAttribute("aria-label", "Your role"); opt(sr, K.roles, "choose your role"); bar.appendChild(sr);
    bar.appendChild(document.createTextNode(" and I want to "));
    var sg = el("select"); sg.setAttribute("aria-label", "Your goal"); opt(sg, K.goals, "choose your goal"); bar.appendChild(sg);
    bar.appendChild(document.createTextNode("."));
    bar.appendChild(el("p", "nbi-hint", "We'll tell you honestly whether this course fits, and if another one fits better, we'll say so."));
    var out = el("div", "nbi-out"); out.setAttribute("aria-live", "polite"); root.appendChild(out);
    function verdict(role, goal) {
      if (goal === "cscs") return { warn: true, h: "Managing Safely won't get you a CSCS card.", p: "For the green labourer card you need the Level 1 Award in Health and Safety in a Construction Environment and the CITB HS&E test. Call us on 020 3488 4472 and we'll book you onto the right course.", btn: [CONTACT, "Ask about the CSCS route"] };
      if (goal === "refresh") return { warn: true, h: "If you already hold Managing Safely, the Refresher is the one for you.", p: "IOSH recommends a one-day Refresher every three years, so you don't need to repeat the full course. Ask our team for the next date.", btn: [CONTACT, "Ask about the Refresher"] };
      if (role === "hs") return { warn: true, h: "For a health and safety career, NEBOSH General is usually the better fit.", p: "Managing Safely is a manager's awareness course. It's a useful grounding, but the NEBOSH General Certificate is the qualification employers list for health and safety roles.", btn: [NGC_URL, "See the NEBOSH General Certificate"] };
      if (role === "ops" && goal !== "group") return { warn: true, h: "If you don't manage anyone, Working Safely is usually the better fit.", p: "Managing Safely is for people who supervise others. Working Safely covers what you need in one day, live online, for £145 + VAT.", btn: [WS_URL, "See IOSH Working Safely"] };
      var P = K.P[role] || {}, p = P.fit || "";
      if (role === "hr" || goal === "group") return { h: "Yes, Managing Safely is the right course for your people.", p: p || "Three or more from one employer get 5% off any public date, seven or more 10%, and from six we can run it just for your organisation.", btn: ["#team", "See team rates and in-house"] };
      return { h: "Yes, this is the right course for you.", p: p, btn: ["#dates", "See the next dates"] };
    }
    function update() {
      var role = sr.value, goal = sg.value; sr.classList.toggle("set", !!role); sg.classList.toggle("set", !!goal);
      out.innerHTML = ""; if (!role || !goal) return;
      var v = verdict(role, goal), P = K.P[role] || {};
      var box = el("div", "nbi-v" + (v.warn ? " warn" : "")); box.appendChild(el("span", "nbi-vt", v.warn ? "Honest answer" : "Good fit for you"));
      box.appendChild(el("h3", null, v.h)); if (v.p) box.appendChild(el("p", null, v.p));
      var bb = el("div", "nbi-btns"); bb.appendChild(linkBtn(v.btn[0], "or", v.btn[1]));
      if (v.warn) bb.appendChild(linkBtn("#dates", "gh", "Stay with " + K.name.replace("IOSH ", "")));
      box.appendChild(bb); out.appendChild(box);
      if (P.use && P.use.length) {
        var c1 = el("div", "nbi-card"); c1.appendChild(el("h4", null, "How you'll use it in your job"));
        var u = el("ul"); P.use.forEach(function (x) { u.appendChild(el("li", null, x)); }); c1.appendChild(u);
        if (P.jobs && P.jobs.length) { var ch = el("div", "nbi-chips"); P.jobs.forEach(function (j) { ch.appendChild(el("span", null, j)); }); c1.appendChild(ch); }
        out.appendChild(c1);
      }
      if (P.next) { var c2 = el("div", "nbi-card"); c2.appendChild(el("h4", null, "Where it leads")); c2.appendChild(el("p", null, P.next)); out.appendChild(c2); }
      try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "iosh_tailor", iosh_role: role, iosh_goal: goal, iosh_course: root.getAttribute("data-course") || "ms" }); } catch (e) {}
    }
    sr.addEventListener("change", update); sg.addEventListener("change", update);
  }

  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function addWorkDays(d, n) { var x = new Date(d); while (n > 0) { x.setDate(x.getDate() + 1); if (x.getDay() % 6) n--; } return x; }
  function fmtDate(d) { return DAYS[d.getDay()].slice(0, 3) + " " + d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(); }
  function isoDate(d) { var m = d.getMonth() + 1, dd = d.getDate(); return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (dd < 10 ? "0" : "") + dd; }

  function mountTimeline(root) {
    if (root._nbi) return; root._nbi = true;
    var course = root.getAttribute("data-course") || "ms";
    root.classList.add("nbi"); root.innerHTML = "";
    var f = el("div", "nbi-f"); root.appendChild(f);
    var l1 = el("label", null, "Start date "); var inp = el("input"); inp.type = "date"; l1.appendChild(inp); f.appendChild(l1);
    var fmt = null;
    if (course === "ms") { var l2 = el("label", null, "Format "); fmt = el("select"); [["block","3 days in a row"],["dr","Day release, 1 day a week"]].forEach(function (o) { var p = el("option", null, o[1]); p.value = o[0]; fmt.appendChild(p); }); l2.appendChild(fmt); f.appendChild(l2); }
    var t = new Date(); t.setHours(12, 0, 0, 0); t = addDays(t, ((8 - t.getDay()) % 7) || 7); inp.value = isoDate(t);
    var out = el("div", "nbi-tl"); out.setAttribute("aria-live", "polite"); root.appendChild(out);
    var note = el("p", "nbi-small", "IOSH issues your certificate within 28 working days of your result. Dates are a guide."); note.style.color = "#c9cde0"; note.style.textAlign = "center"; root.appendChild(note);
    function row(h, v) { var d = el("div"); d.appendChild(el("b", null, h)); d.appendChild(document.createTextNode(v)); out.appendChild(d); }
    function draw() {
      out.innerHTML = ""; if (!inp.value) return;
      var s = new Date(inp.value + "T12:00:00");
      if (course === "ms") {
        var end = fmt && fmt.value === "dr" ? addDays(s, 14) : addWorkDays(s, 2), proj = addDays(end, 14);
        row("Your course", fmtDate(s) + " to " + fmtDate(end)); row("Exam", fmtDate(end) + ", the last day");
        row("Project due", fmtDate(proj)); row("Certificate", "Typically by " + fmtDate(addWorkDays(proj, 28)));
      } else {
        row("Course and assessment", fmtDate(s)); row("Result", "On the day"); row("Certificate", "Typically by " + fmtDate(addWorkDays(s, 28)));
      }
    }
    inp.addEventListener("change", draw); if (fmt) fmt.addEventListener("change", draw); draw();
  }

  function mountTeam(root) {
    if (root._nbi) return; root._nbi = true;
    var K = IOSH[root.getAttribute("data-course") || "ms"] || IOSH.ms;
    var prices = { ms: [390, "IOSH Managing Safely (online)"], msc: [550, "IOSH Managing Safely (classroom)"], ws: [145, "IOSH Working Safely"] };
    root.classList.add("nbi"); root.innerHTML = "";
    var calc = el("div", "nbi-card"); root.appendChild(calc);
    calc.appendChild(el("h4", null, "Work out the cost"));
    var f = el("div", "nbi-f"); f.style.justifyContent = "flex-start"; f.style.color = "#1d2560"; calc.appendChild(f);
    var l1 = el("label", null, "People "); var n = el("input"); n.type = "number"; n.min = "1"; n.max = "200"; n.value = "3"; n.style.width = "90px"; l1.appendChild(n); f.appendChild(l1);
    var l2 = el("label", null, "Course "); var cs = el("select");
    Object.keys(prices).forEach(function (k) { var p = el("option", null, prices[k][1]); p.value = k; cs.appendChild(p); });
    cs.value = (root.getAttribute("data-course") || "ms") === "ws" ? "ws" : "ms"; l2.appendChild(cs); f.appendChild(l2);
    var res = el("div", "nbi-tl"); calc.appendChild(res);
    calc.appendChild(el("p", "nbi-small", "3 to 6 people: 5% off public dates. 7 or more: 10% off. 6 or more: we can also run the course just for your team, quoted within 24 hours. IOSH registration, assessment and certificates included."));
    function row(h, v) { var d = el("div"); d.appendChild(el("b", null, h)); d.appendChild(document.createTextNode(v)); res.appendChild(d); }
    function draw() {
      res.innerHTML = ""; var k = +n.value || 0; if (k < 1) return;
      var price = prices[cs.value][0], rate = k >= 7 ? 0.9 : k >= 3 ? 0.95 : 1, full = price * k, tot = Math.round(full * rate);
      row(k + " at the standard price", money(full) + " + VAT");
      row(rate < 1 ? "Team rate (" + Math.round((1 - rate) * 100) + "% off)" : "Your price", money(tot) + " + VAT");
      row(k >= 6 ? "Or in-house" : "Booking", k >= 6 ? "A course just for your team, at your site or online" : k >= 3 ? "Book public dates together, on one invoice" : "Book online, and add colleagues later");
    }
    n.addEventListener("input", draw); cs.addEventListener("change", draw); draw();

    var qc = el("div", "nbi-card"); qc.style.marginTop = "18px"; root.appendChild(qc);
    qc.appendChild(el("h4", null, "Get a team quote"));
    qc.appendChild(el("p", null, "Tell us your numbers, course, where and when, and we'll send a written quote within 24 hours."));
    var form = el("form", "nbi-form"); form.noValidate = true; qc.appendChild(form);
    function fld(lbl, type, full, opts) {
      var w = el("div", full ? "full" : null), l = el("label", null, lbl), i;
      if (type === "select") { i = el("select"); opts.forEach(function (o) { var p = el("option", null, o); p.value = o; i.appendChild(p); }); }
      else if (type === "textarea") i = el("textarea"); else { i = el("input"); i.type = type; }
      w.appendChild(l); w.appendChild(i); form.appendChild(w); return i;
    }
    var fN = fld("Your name", "text"), fC = fld("Company", "text"), fE = fld("Email", "email"), fP = fld("Phone", "tel");
    var fW = fld("Where", "select", false, ["Public dates, live online", "Public dates, classroom", "In-house at our site", "Live online, just for our team", "Not sure yet"]);
    var fT = fld("When", "select", false, ["As soon as possible", "Within 1 month", "1 to 3 months", "3 months or more"]);
    var fQ = fld("Anything else? (optional)", "textarea", true);
    var bw = el("div", "full"); bw.style.textAlign = "center"; var sb = el("button", "nbx-btn or", "Request my quote"); sb.type = "submit"; bw.appendChild(sb); form.appendChild(bw);
    var st = el("p", "nbi-status full"); st.style.textAlign = "center"; st.setAttribute("role", "status"); form.appendChild(st);
    var th = el("div", "nbi-thanks"); th.appendChild(el("b", null, "Thanks, we've got your request. ")); th.appendChild(document.createTextNode("We'll send your quote within 24 hours. If it's urgent, call 020 3488 4472.")); qc.appendChild(th);
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = fN.value.trim(), email = fE.value.trim(), ph = fP.value.trim();
      function err(t, x) { st.className = "nbi-status full err"; st.textContent = t; if (x) x.focus(); }
      if (!name) return err("Add your name.", fN);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err("Enter a valid email address so we can send your quote.", fE);
      if (!ph) return err("Add a phone number in case we need to check anything.", fP);
      var parts = name.split(/\s+/), first = parts.shift(), last = parts.join(" ") || "-";
      var course = prices[cs.value][1], people = String(+n.value || 0);
      var msg = "IOSH team quote request\n\nCompany: " + (fC.value.trim() || "-") + "\nCourse: " + course + "\nPeople: " + people + "\nWhere: " + fW.value + "\nWhen: " + fT.value + (fQ.value.trim() ? "\n\nNotes:\n" + fQ.value.trim() : "");
      var fields = [{ name: "firstname", value: first }, { name: "lastname", value: last }, { name: "email", value: email }, { name: "phone", value: ph },
        { name: "message", value: msg }, { name: "enquiry_qualification", value: course + ": team quote" },
        { name: "enquiry_options_selected", value: fW.value }, { name: "enquiry_learners", value: people }, { name: "enquiry_start", value: fT.value }];
      var ctx = { pageUri: location.href, pageName: document.title }; var m = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/); if (m) ctx.hutk = decodeURIComponent(m[1]);
      sb.disabled = true; sb.textContent = "Sending"; st.className = "nbi-status full"; st.textContent = "";
      fetch("https://api.hsforms.com/submissions/v3/integration/submit/19996504/82962984-45f3-49f7-af62-fc7da9f14b2f", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fields: fields, context: ctx }) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function () { try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "iosh_team_quote", iosh_course: course, iosh_people: people }); } catch (e) {} form.style.display = "none"; th.style.display = "block"; })
        .catch(function () { sb.disabled = false; sb.textContent = "Request my quote"; err("That didn't send. Please try again, or call 020 3488 4472."); });
    });
  }


  // ---------- IOSH hub course finder (v18) ----------
  var CN_URL = SITE + "/nebosh-health-safety-management-construction/", MS_URL = SITE + "/iosh-managing-safely/";
  var FIND = {
    roles: [["sup","a supervisor or team leader"],["mgr","a manager or department head"],["dir","a director or senior leader"],["site","a construction site manager or supervisor"],["ops","an operative, technician or office worker"],["hs","starting a career in health and safety"],["hr","in HR or L&D, booking for other people"]],
    goals: [["team","run my team safely"],["req","meet an employer, client or contract requirement"],["audit","respond to an audit, incident or insurer"],["cscs","get a CSCS card"],["refresh","refresh my Managing Safely"],["career","start a career in health and safety"],["group","train a group of people"],["duties","understand my legal duties"]],
    study: [["live","live online with a tutor"],["class","in a classroom near me"],["site","at our workplace"]],
    prior: [["none","nothing yet"],["ws","Working Safely"],["ms","Managing Safely"],["citb","SMSTS or SSSTS"],["nebosh","a NEBOSH certificate"]],
    C: {
      ms: { name: "IOSH Managing Safely", price: "Online £390 + VAT, classroom £550 + VAT", meta: "3 days, or 1 day a week for 3 weeks", url: MS_URL, search: "IOSH-MS|IOSH-MS-DR", match: "iosh-ms" },
      ws: { name: "IOSH Working Safely", price: "£145 + VAT", meta: "1 day, live online", url: WS_URL, search: "IOSH-WS", match: "iosh-ws" },
      msr: { name: "IOSH Managing Safely Refresher", price: "Ask us for the price", meta: "1 day", url: CONTACT, btn: "Ask about the Refresher" },
      inhouse: { name: "In-house training for your team", price: "Quoted within 24 hours", meta: "6 or more people, at your site or online", url: "#team", btn: "Get a team quote" },
      l1: { name: "Level 1 Award in Health and Safety in a Construction Environment", price: "Call us for the price", meta: "The CSCS green card route", url: CONTACT, btn: "Ask about the CSCS route" },
      nebosh: { name: "NEBOSH National General Certificate", price: "From £1,175 + VAT", meta: "10 days, online or classroom", url: NGC_URL, btn: "View NEBOSH General" },
      neboshc: { name: "NEBOSH Health and Safety Management for Construction", price: "From £1,175 + VAT", meta: "10 days, online or classroom", url: CN_URL, btn: "View NEBOSH Construction" }
    }
  };
  function findCourse(role, goal, study, prior) {
    if (goal === "cscs") return { p: "l1", alt: "ws", msg: "A CSCS green card needs the Level 1 Award in Health and Safety in a Construction Environment and the CITB HS&E test. No IOSH course gives you a card, so call us and we'll book you onto the right one." };
    if (goal === "career" || role === "hs") { var cn = role === "site"; return { p: cn ? "neboshc" : "nebosh", alt: "ms", msg: cn ? "For a health and safety role on construction sites, NEBOSH Construction is the qualification employers list, and holders can apply for the CSCS AQP card. Managing Safely is a manager's awareness course, so it won't get you a health and safety role on its own." : "For a career in health and safety, you need the qualification employers list in job adverts: the NEBOSH General Certificate. Managing Safely is a manager's awareness course, so it's a useful first step rather than the destination." }; }
    if (goal === "refresh" || (prior === "ms" && goal !== "group" && role !== "hr")) return { p: "msr", alt: "nebosh", msg: "You already hold Managing Safely, so you don't need to repeat the full course. IOSH recommends a one-day Refresher every three years. Ready to progress instead? NEBOSH General is the next step." };
    if (goal === "group" || role === "hr" || study === "site") { var c = role === "ops" ? "ws" : "ms"; return { p: "inhouse", alt: c, msg: "Six or more from one employer and we'll run " + (c === "ws" ? "Working Safely" : "Managing Safely") + " just for your team, at your site or live online, on your dates. Fewer than six? Three to six people get 5% off public dates, and seven or more 10%, on one invoice." }; }
    if (role === "ops") return { p: "ws", alt: "ms", msg: "Working Safely is the course for your role: one day on the essentials, live online. If you supervise anyone, you need Managing Safely instead." };
    if (role === "site") return { p: "ms", alt: "neboshc", fmt: study, msg: (goal === "req" ? "Check which course the client actually asked for. " : "") + "If the contract wants a CITB card-route course, that's SMSTS or SSSTS. If you manage people and want the management framework behind your RAMS, it's Managing Safely. For a health and safety role on sites, it's NEBOSH Construction." };
    var lead = goal === "team" ? "The course IOSH built for exactly this: you've got a team, their safety is your responsibility, and you need the practical tools. " :
      goal === "audit" ? "After an audit, incident or insurer request, Managing Safely is what most employers put their supervisors and managers through, and we can run it in-house if there are several of you. " :
      goal === "req" ? "Your employer or client has asked for Managing Safely: three days, live with a tutor, with the assessment and IOSH certificate included. " :
      goal === "duties" || role === "dir" ? "Managing Safely gives you the full picture of what the law expects of you and your managers, with the practical detail to act on it. " :
      "Managing Safely is the course for anyone who manages people. ";
    return { p: "ms", alt: "nebosh", fmt: study === "class" ? "class" : "block",
      msg: lead + (study === "class" ? "Classroom courses run at locations across the UK, so pick your nearest one." : "Prefer one day a week? Day release runs 1 day a week for 3 weeks, at the same price.") };
  }
  function nextDate(K, fmt) {
    if (!K.search) return Promise.resolve(null);
    var base = "/wp-json/wc/store/v1/products", today = new Date(); today.setHours(0, 0, 0, 0);
    return fetchAll(base, K.search.split("|")).then(function (data) {
      var items = (data || []).filter(function (p) { var n = decode(p.name || "").toLowerCase(); return n.indexOf(K.match) > -1 && !/refresher|e-?learning|in-house/.test(n); })
        .map(parseProduct).filter(function (i) { return i && i.inStock && i.date >= today; }).sort(function (a, b) { return a.date - b.date; });
      var pick = fmt ? items.filter(function (i) { return i.fmt.id === fmt; }) : [];
      return (pick.length ? pick : items)[0] || null;
    }).catch(function () { return null; });
  }
  function mountFinder(root) {
    if (root._nbi) return; root._nbi = true;
    root.classList.add("nbi"); root.innerHTML = "";
    var bar = el("div", "nbi-bar"); root.appendChild(bar);
    function sel(list, ph, label) { var x = el("select"); x.setAttribute("aria-label", label); opt(x, list, ph); return x; }
    var sr = sel(FIND.roles, "choose your role", "Your role"), sg = sel(FIND.goals, "choose your goal", "Your goal"), ss = sel(FIND.study, "choose how", "How you'd like to study"), sp = { value: "" };
    [["I'm ", sr], [" and I want to ", sg], [". I'd like to study ", ss]].forEach(function (x) { bar.appendChild(document.createTextNode(x[0])); bar.appendChild(x[1]); });
    bar.appendChild(document.createTextNode("."));
    bar.appendChild(el("p", "nbi-hint", "Pick your role and goal to see your recommended course and price, then jump straight to its dates. No email needed."));
    var out = el("div"); out.setAttribute("aria-live", "polite"); root.appendChild(out);
    var token = 0;
    function update() {
      [sr, sg, ss].forEach(function (x) { x.classList.toggle("set", !!x.value); });
      out.innerHTML = ""; if (!sr.value || !sg.value) return;
      var r = findCourse(sr.value, sg.value, ss.value || "live", sp.value || "none"), K = FIND.C[r.p], A = FIND.C[r.alt];
      var box = el("div", "nbi-res"); box.appendChild(el("span", "nbi-vt", "Our recommendation"));
      box.appendChild(el("h3", null, K.name));
      var meta = el("div", "nbi-meta"); meta.appendChild(el("span", null, K.meta)); meta.appendChild(el("span", null, K.price));
      var cls = r.p === "ms" && r.fmt === "class";
      var fmtKey = cls ? "class" : "block", fmtName = cls ? "classroom" : "online";
      box.appendChild(meta); box.appendChild(el("p", null, r.msg));
      var bb = el("div", "nbi-btns"), main;
      if (K.search) { main = linkBtn(K.url + "?dates=" + fmtKey + "#dates", "or", "See " + fmtName + " dates"); bb.appendChild(main); bb.appendChild(linkBtn(K.url, "gh", "View " + K.name.replace("IOSH ", ""))); }
      else { main = linkBtn(K.url, "or", K.btn || "View " + K.name.replace("IOSH ", "")); bb.appendChild(main); }
      bb.appendChild(linkBtn(CONTACT, "gh", "Enquire")); box.appendChild(bb);
      if (A) { var al = el("p", "nbi-alt"); al.appendChild(document.createTextNode("Also worth a look: ")); var a = el("a", null, A.name); a.href = A.url; al.appendChild(a); box.appendChild(al); }
      var rs = el("button", "nbi-reset", "Start again"); rs.type = "button"; rs.addEventListener("click", function () { [sr, sg, ss].forEach(function (x) { x.value = ""; }); update(); sr.focus(); }); box.appendChild(rs);
      out.appendChild(box);
      try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "iosh_finder", iosh_role: sr.value, iosh_goal: sg.value, iosh_study: ss.value, iosh_course: r.p }); } catch (e) {}
    }
    [sr, sg, ss].forEach(function (x) { x.addEventListener("change", update); });
  }

  // Give closed cards in the same row the same height, so "What you'll learn" and the buttons line up.
  // An opened card grows on its own without stretching its neighbours.
  function equalise() {
    Array.prototype.forEach.call(document.querySelectorAll(".nbx-grid"), function (g) {
      var cards = Array.prototype.slice.call(g.querySelectorAll(".nbx-cc"));
      cards.forEach(function (c) { c.style.minHeight = ""; });
      if (!g.querySelector("details[open]")) return;
      var rows = {};
      cards.forEach(function (c) { (rows[c.offsetTop] = rows[c.offsetTop] || []).push(c); });
      Object.keys(rows).forEach(function (k) {
        var max = 0;
        rows[k].forEach(function (c) { var d = c.querySelector("details"); if (!d || !d.open) max = Math.max(max, c.offsetHeight); });
        if (max) rows[k].forEach(function (c) { c.style.minHeight = max + "px"; });
      });
    });
  }
  var eqTimer;
  function equaliseSoon() { clearTimeout(eqTimer); eqTimer = setTimeout(equalise, 60); }

  function init() {
    injectCss();
    equalise();
    window.addEventListener("resize", equaliseSoon);
    window.addEventListener("load", equalise);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(equalise);
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(equaliseSoon);
      Array.prototype.forEach.call(document.querySelectorAll(".nbx-grid"), function (g) { ro.observe(g); });
    }
    document.addEventListener("toggle", function (e) { if (e.target.closest && e.target.closest(".nbx-cc")) equalise(); }, true);
    Array.prototype.forEach.call(document.querySelectorAll(".cst-nebosh-matcher"), function (r, i) { mount(r, i); });
    Array.prototype.forEach.call(document.querySelectorAll(".cst-nebosh-dates"), function (r) { mountDates(r); });
    mountTools();
  }
  function mountTools() {
    Array.prototype.forEach.call(document.querySelectorAll(".cst-iosh-tailor"), function (r) { if (!r._nbi) mountTailor(r); });
    Array.prototype.forEach.call(document.querySelectorAll(".cst-iosh-timeline"), function (r) { if (!r._nbi) mountTimeline(r); });
    Array.prototype.forEach.call(document.querySelectorAll(".cst-iosh-team"), function (r) { if (!r._nbi) mountTeam(r); });
    Array.prototype.forEach.call(document.querySelectorAll(".cst-iosh-finder"), function (r) { if (!r._nbi) mountFinder(r); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  // Re-mount if the theme re-renders page content
  if (window.MutationObserver) new MutationObserver(function () {
    if (!document.getElementById("nbx-css")) injectCss();
    Array.prototype.forEach.call(document.querySelectorAll(".cst-nebosh-matcher"), function (r, i) { if (!r._nbm || !r.firstChild) { r._nbm = false; mount(r, i); } });
    Array.prototype.forEach.call(document.querySelectorAll(".cst-nebosh-dates"), function (r) { if (!r._nbd) mountDates(r); });
    mountTools();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

/*!
 * CST Training NEBOSH hub (v7: live course dates from WooCommerce)
 * Host on GitHub Pages, load with ?v=N cache buster.
 * Mount point: <div class="cst-nebosh-matcher"></div>
 * Live dates:  <div class="cst-nebosh-dates" data-search="NEBOSH Construction"></div>
 *   Reads published WooCommerce products through the Store API. Product titles must follow
 *   "Course name (format) | DD-MM-YYYY | Location". Fully booked and past dates are hidden.
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
    ".nbd-tab{font:inherit;font-weight:700;font-size:15px;padding:9px 18px;border-radius:30px;border:2px solid #dcdfea;background:#fff;color:#1d2560;cursor:pointer}",
    ".nbd-tab[aria-pressed=true]{background:#1d2560;border-color:#1d2560;color:#fff}",
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
    { id: "block",   label: "Two-week block",  test: function (t) { return !/classroom/i.test(t) && !/day.?release/i.test(t); }, note: "Online, Monday to Friday over 2 weeks" },
    { id: "day",     label: "Day release",     test: function (t) { return /\(day release\)/i.test(t); },                         note: "Online, 1 day a week over 10 weeks" },
    { id: "twoday",  label: "Two-day release", test: function (t) { return /2 day day.?release/i.test(t); },                     note: "Online, 2 days a week over 5 weeks" },
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
    var pr = p.prices || {}, mu = Math.pow(10, pr.currency_minor_unit == null ? 2 : pr.currency_minor_unit);
    return {
      id: p.id, date: d, fmt: fmt, loc: parts[2] || "",
      price: pr.price ? Math.round(+pr.price / mu) : null,
      inStock: p.is_in_stock !== false && p.is_purchasable !== false,
      low: p.low_stock_remaining || null, url: p.permalink
    };
  }
  function fetchAll(base, search) {
    var out = [], sep = base.indexOf("?") > -1 ? "&" : "?";
    function page(n) {
      return fetch(base + sep + "search=" + encodeURIComponent(search) + "&per_page=100&page=" + n, { credentials: "same-origin" })
        .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); var tp = +(r.headers.get("X-WP-TotalPages") || 1); return r.json().then(function (j) { return { j: j, tp: tp }; }); })
        .then(function (res) { out = out.concat(res.j); return n < res.tp && n < 5 ? page(n + 1) : out; });
    }
    return page(1);
  }

  function mountDates(root) {
    if (root._nbd) return; root._nbd = true;
    root.classList.add("nbd"); root.innerHTML = "";
    var search = root.getAttribute("data-search") || "NEBOSH Construction";
    var base = root.getAttribute("data-endpoint") || "/wp-json/wc/store/v1/products";
    var vat = root.getAttribute("data-vat-label") || " + VAT";
    var fallback = root.getAttribute("data-fallback") || SITE + "/nebosh-course-type/";
    var step = +(root.getAttribute("data-show") || 8);
    var state = { fmt: "all", loc: "", shown: step }, items = [];

    var bar = el("div", "nbd-bar"); root.appendChild(bar);
    var list = el("div", "nbd-list"); list.setAttribute("aria-live", "polite"); root.appendChild(list);
    var more = el("button", "nbd-more", "Show more dates"); more.type = "button"; root.appendChild(more);
    more.addEventListener("click", function () { state.shown += step; draw(); });
    var msg = function (t) { list.innerHTML = ""; var p = el("p", "nbd-msg", t + " "); var a = el("a", null, "See all course dates"); a.href = fallback; p.appendChild(a); list.appendChild(p); more.style.display = "none"; };
    msg("Loading the latest dates...");

    var locSel = el("select", "nbd-loc"); locSel.setAttribute("aria-label", "Choose a location");
    locSel.addEventListener("change", function () { state.loc = locSel.value; state.shown = step; draw(); });

    function tabs() {
      bar.innerHTML = "";
      [{ id: "all", label: "All dates" }].concat(FORMATS).forEach(function (f) {
        if (f.id !== "all" && !items.some(function (i) { return i.fmt.id === f.id; })) return;
        var b = el("button", "nbd-tab", f.label); b.type = "button";
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
        var w = el("div", "nbd-what"); w.appendChild(el("b", null, i.fmt.label));
        w.appendChild(document.createTextNode(" " + (i.fmt.id === "class" ? (i.loc ? "in " + i.loc : "") : "online, " + i.fmt.note.replace(/^Online, /, ""))));
        if (i.low) w.appendChild(el("span", "nbd-low", "Only " + i.low + " place" + (i.low === 1 ? "" : "s") + " left"));
        r.appendChild(w);
        r.appendChild(el("div", "nbd-price", i.price != null ? money(i.price) + vat : ""));
        var a = el("a", "nbx-btn or", "Book now"); a.href = i.url; r.appendChild(a);
        list.appendChild(r);
      });
      more.style.display = rows.length > state.shown ? "" : "none";
    }

    var today = new Date(); today.setHours(0, 0, 0, 0);
    fetchAll(base, search).then(function (data) {
      items = (data || []).map(parseProduct).filter(function (i) { return i && i.inStock && i.date >= today; })
        .sort(function (a, b) { return a.date - b.date; });
      if (!items.length) { msg("No upcoming dates are listed online right now."); return; }
      tabs(); draw();
    }).catch(function () { msg("We couldn't load the dates just now."); });
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
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  // Re-mount if the theme re-renders page content
  if (window.MutationObserver) new MutationObserver(function () {
    if (!document.getElementById("nbx-css")) injectCss();
    Array.prototype.forEach.call(document.querySelectorAll(".cst-nebosh-matcher"), function (r, i) { if (!r._nbm || !r.firstChild) { r._nbm = false; mount(r, i); } });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

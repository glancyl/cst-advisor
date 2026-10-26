/*!
 * CST Training ILM unit builder widget (v29: "About this unit" dropdown on every unit; builder collapsed behind a "Build my ..." button)
 * Host on GitHub Pages, load with ?v=N cache buster.
 *
 * Mount on any page:
 * <div class="cst-ilm-builder" data-level="5" data-qual="choose"></div>
 *   data-level       5 (add more levels to LEVELS below)
 *   data-qual        award | certificate | diploma | choose (shows a switcher; Level 2 has no diploma)
 *   data-form-guid   optional, HubSpot form GUID (defaults to FORM_GUID below)
 *   data-phone       optional, phone number shown on the call button
 */
(function () {
  "use strict";

  var PORTAL_ID = "19996504";
  var SITE = "https://www.csttraining.co.uk";
  // WooCommerce product IDs for Buy now, keyed "level-size". A size without an ID shows the enquiry form only.
  var PRODUCTS = {
    "2-award": 79081, "2-certificate": 79084,
    "3-award": 79088, "3-certificate": 79092, "3-diploma": 79116,
    "4-award": 79123, "4-certificate": 79130, "4-diploma": 79132,
    "5-award": 79134, "5-certificate": 79136, "5-diploma": 79137,
    "6-award": 79140, "6-certificate": 95302, "6-diploma": 79143,
    "7-award": 79150, "7-certificate": 79155, "7-diploma": 79159, "7-extended": 95318
  };
  // Builds the checkout link and keeps the Buy now buttons in step with the picks.
  function buyLink(pid, units, qual) {
    return SITE + "/checkout/?add-to-cart=" + pid + "&cst_units=" + encodeURIComponent(units) + "&cst_qual=" + encodeURIComponent(qual);
  }
  function syncBuy(btns, level, qualKey, full, units, qual) {
    var pid = PRODUCTS[level + "-" + qualKey];
    btns.forEach(function (b) {
      if (!pid) { b.removeAttribute("href"); b.style.display = "none"; return; }
      b.href = SITE + "/checkout/?add-to-cart=" + pid + (units ? "&cst_units=" + encodeURIComponent(units) + "&cst_qual=" + encodeURIComponent(qual) : "");
      b.style.display = "";
    });
  }
  function trackBuy(btn, getQual, getUnits) {
    btn.addEventListener("click", function () {
      try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "course_builder_buy", enquiry_qualification: getQual(), enquiry_options: getUnits() }); } catch (e) {}
    });
  }
  var FORM_GUID = "82962984-45f3-49f7-af62-fc7da9f14b2f"; // Course Builder Enquiry
  var DEFAULT_PHONE = "020 3488 4472";

  var QUALS = {
    award:       { label: "Award",       optional: 1, induction: "1 hour",  tutorial: "At least 3 hours" },
    certificate: { label: "Certificate", optional: 3, induction: "2 hours", tutorial: "At least 7 hours" },
    diploma:     { label: "Diploma",     optional: 8, induction: "2 hours", tutorial: "At least 7 hours" }
  };

  // Level 4 is credit-based: each size has a credit range and Group 2 caps
  var QUALS4 = {
    award:       { label: "Award",       min: 5,  max: 12,   g1min: 0, g2max: 0,  range: "5 to 12",
                   rule: "All of your units come from Group 1." },
    certificate: { label: "Certificate", min: 13, max: 36,   g1min: 7, g2max: 6,  range: "13 to 36",
                   rule: "At least 7 credits must come from Group 1, and no more than 6 from Group 2." },
    diploma:     { label: "Diploma",     min: 37, max: null, g1min: 0, g2max: 18, range: "at least 37",
                   rule: "Up to 18 credits can come from Group 2, and the two Diploma-only units are open to you." }
  };

  var GROUPS = [
    { id: "self",   name: "You and your development" },
    { id: "people", name: "People and culture" },
    { id: "ops",    name: "Operations and delivery" },
    { id: "money",  name: "Finance and data" },
    { id: "strat",  name: "Strategy and change" },
    { id: "rel",    name: "Relationships and partners" }
  ];

  var QUALS2 = {
    award:       { label: "Award",       optional: 1, induction: "1 hour", tutorial: "At least 2 hours" },
    certificate: { label: "Certificate", optional: 7, induction: "1 hour", tutorial: "At least 2 hours" }
  };

  // Level 6: credit-based. "Group 1" is units 601 to 612; "Group 2" is the Level 5 and Level 7 units.
  var QUALS6 = {
    award:       { label: "Award",       min: 5,  max: null, g1min: 5,  g2max: 0,  range: "at least 5",
                   rule: "All of your units come from 601 to 612." },
    certificate: { label: "Certificate", min: 15, max: null, g1min: 8,  g2max: 7,  range: "at least 15",
                   only: ["504", "514", "522", "529", "550", "717"],
                   rule: "At least 8 credits must come from units 601 to 612, and no more than 7 from the Level 5 and Level 7 units." },
    diploma:     { label: "Diploma",     min: 40, max: null, g1min: 21, g2max: 19, range: "at least 40",
                   only: ["504", "514", "522", "529", "550", "703", "710", "711", "712", "713", "714", "715", "716", "717"],
                   rule: "At least 21 credits must come from units 601 to 612, and no more than 19 from the Level 5 and Level 7 units." }
  };

  // Level 7: credit-based with four sizes. "Group 1" is the Level 7 units; "Group 2" is the Level 6 units (and 800).
  // Each size lists exactly which units it can use.
  var QUALS7 = {
    award:       { label: "Award", min: 7, max: null, g1min: 7, g2max: 0, range: "at least 7",
                   allow: ["703", "715", "716", "717"],
                   rule: "All of your units come from 703, 715, 716 and 717." },
    certificate: { label: "Certificate", min: 15, max: null, g1min: 8, g2max: 7, range: "at least 15",
                   allow: ["700", "701", "702", "703", "710", "711", "712", "713", "714", "715", "716", "717", "601", "606", "607", "609", "610", "611", "612"],
                   rule: "At least 8 credits must come from Level 7 units, and no more than 7 from selected Level 6 units." },
    diploma:     { label: "Diploma", min: 40, max: null, g1min: 21, g2max: 19, range: "at least 40",
                   allow: ["700", "701", "702", "703", "710", "711", "712", "713", "714", "715", "716", "717", "601", "602", "603", "604", "605", "606", "607", "608", "609", "610", "611", "612"],
                   rule: "At least 21 credits must come from Level 7 units, and no more than 19 from Level 6 units." },
    extended:    { label: "Extended Diploma", min: 60, max: null, g1min: 31, g2max: 19, range: "at least 60",
                   allow: ["700", "701", "702", "703", "710", "711", "712", "713", "714", "715", "716", "717", "601", "602", "603", "604", "605", "606", "607", "608", "609", "610", "611", "612", "800"],
                   rule: "At least 31 credits must come from Level 7 units, and no more than 19 from Level 6 units. Unit 800, The impactful CEO, is only available on the Extended Diploma." }
  };

  var QUALS3 = {
    award:       { label: "Award",       optional: 1, induction: "1 hour",  tutorial: "At least 2 hours" },
    certificate: { label: "Certificate", optional: 3, induction: "2 hours", tutorial: "At least 4 hours" },
    diploma:     { label: "Diploma",     optional: 6, induction: "2 hours", tutorial: "At least 7 hours" }
  };

  var LEVELS = {
    2: {
      title: "ILM Level 2 Developing Leadership and Team Skills",
      quals: QUALS2,
      mandatory: "201",
      fallback: ["202", "204", "207", "212", "206", "214", "203"],
      units: [
        ["201","Personal and professional development as a senior team member","self","Reflect on your role in the team and plan your own development.",true],
        ["202","Supporting team performance","people","Help your team hit its goals and work well together."],
        ["203","Responding to disagreements in the workplace","people","Handle disagreements in the team calmly and fairly."],
        ["204","Supporting the motivation of a team","people","Understand what motivates people and help keep your team engaged."],
        ["205","Equity, diversity and inclusion in the workplace","people","Support a fair and inclusive workplace for everyone."],
        ["206","Supporting organisational improvements","ops","Spot ways to improve how things are done and help put them in place."],
        ["210","Record keeping and information management in the workplace","ops","Keep accurate records and manage information properly."],
        ["211","Health, safety and wellbeing in the workplace","ops","Play your part in keeping people safe and well at work."],
        ["208","Decision making using data","money","Use data to help make better decisions."],
        ["207","Problem solving","strat","Work through problems in a structured way."],
        ["209","The organisation and its environment","strat","Understand how your organisation works and what affects it."],
        ["212","Effective communication","rel","Communicate clearly with your team and others."],
        ["213","Communication tools and techniques in the workplace","rel","Choose and use the right communication tools for the job."],
        ["214","Understanding stakeholders and meeting stakeholder needs","rel","Understand who your stakeholders are and what they need."],
        ["215","Providing support to external stakeholders","rel","Support customers and other people outside your organisation."]
      ]
    },
    3: {
      title: "ILM Level 3 Leadership and Management Skills",
      quals: QUALS3,
      mandatory: "301",
      fallback: ["303", "308", "312", "306", "307", "315"],
      units: [
        ["301","Developing effective leadership skills","self","Understand how you lead and develop the skills to lead your team well.",true],
        ["302","Managing personal and professional development","self","Plan, record and review your own development."],
        ["303","Managing the performance of others","people","Set goals, give feedback and manage how your team performs."],
        ["304","Supporting wellbeing in the workplace","people","Look after your team's wellbeing as part of the job."],
        ["305","Effective recruitment","people","Plan and run recruitment that finds the right people."],
        ["314","Supporting flexible working","people","Support flexible working arrangements in your team."],
        ["315","Developing a high performing team","people","Build and lead a team that performs well."],
        ["306","Developing project management skills","ops","Plan, run and review projects in your area."],
        ["316","Legislation and compliance","ops","Understand the laws and rules that apply to your area of work."],
        ["310","Analysing data to make decisions","money","Use data to inform and justify decisions."],
        ["311","Organisational finance","money","Understand budgets, costs and how finance works in your organisation."],
        ["307","Managing and implementing change","strat","Plan change and help your team through it."],
        ["308","Problem solving and decision making","strat","Work through problems and make sound decisions."],
        ["309","The organisation and its environmental responsibilities","strat","Understand your organisation's environmental duties and your part in them."],
        ["312","Effective communication","rel","Communicate clearly with your team and others."],
        ["313","Planning and leading structured workplace communication","rel","Plan and lead structured communication such as briefings and meetings."],
        ["317","Managing external stakeholder relationships","rel","Build and keep good relationships with people outside your organisation."]
      ]
    },
    4: {
      mode: "credits",
      title: "ILM Level 4 Leadership and Management",
      // [code, name, group (1, 2, or 0 = outside both group limits), focus area, credits, diploma only]
      units: [
        ["8605-400","Understanding the Management Role to Improve Management Performance",1,"self",4],
        ["8605-401","Planning and Leading a Complex Team Activity",1,"people",4],
        ["8605-402","Managing Equality and Diversity in Own Area",1,"people",4],
        ["8605-403","Managing Risk in the Workplace",1,"ops",3],
        ["8605-404","Delegating Authority in the Workplace",1,"people",3],
        ["8605-405","Developing People in the Workplace",1,"people",5],
        ["8605-406","Developing Your Leadership Styles",1,"self",4],
        ["8605-407","Understanding Financial Management",1,"money",3],
        ["8605-408","Management Communication",1,"rel",4],
        ["8605-409","Managing Personal Development",1,"self",15,true],
        ["8605-410","Managing the Analysis of Secondary Data",1,"money",4],
        ["8605-411","Managing a Healthy and Safe Environment",1,"ops",2],
        ["8605-412","Managing Meetings",1,"rel",3],
        ["8605-413","Managing Marketing Activities",1,"strat",3],
        ["8605-414","Data Collection and Analysis to Justify Management Decision Making",1,"money",2],
        ["8605-415","Motivating People in the Workplace",1,"people",2],
        ["8605-416","Solving Problems by Making Effective Decisions in the Workplace",1,"strat",3],
        ["8605-417","Managing and Implementing Change in the Workplace",1,"strat",6],
        ["8605-418","Understanding the Organisational Culture and Context",1,"strat",6],
        ["8605-419","Understanding Work in Contemporary Society",1,"strat",3],
        ["8605-420","Budgetary Planning and Control",1,"money",3],
        ["8605-421","Interpreting Financial Statements to Assess Organisational Performance Using Financial Ratios",1,"money",3],
        ["8605-422","Understanding the Importance of Marketing for an Organisation",1,"strat",4],
        ["8605-423","Using Quantitative Methods to Solve Management Problems",1,"money",6],
        ["8605-424","Understanding the Economics of the Marketplace",1,"strat",6],
        ["8605-425","Developing Individual Mental Toughness",1,"self",2],
        ["8605-426","Understanding the Macro Economic Environment",1,"strat",7],
        ["8605-427","Developing a Culture to Support Innovation and Improvement",1,"strat",3],
        ["8605-300","Solving Problems and Making Decisions",2,"strat",2],
        ["8605-301","Understanding Innovation and Change in an Organisation",2,"strat",2],
        ["8605-302","Planning Change in the Workplace",2,"strat",2],
        ["8605-303","Planning and Allocating Work",2,"ops",2],
        ["8605-304","Writing for Business",2,"rel",1],
        ["8605-305","Contributing to Innovation and Creativity in the Workplace",2,"strat",2],
        ["8605-306","Understanding Customer Service Standards and Requirements",2,"rel",2],
        ["8605-307","Giving Briefings and Making Presentations",2,"rel",2],
        ["8605-308","Understanding Leadership",2,"self",2],
        ["8605-309","Understand How to Establish an Effective Team",2,"people",1],
        ["8605-310","Understanding How to Motivate to Improve Performance",2,"people",2],
        ["8605-311","Developing Yourself and Others",2,"self",2],
        ["8605-312","Understanding Conflict Management in the Workplace",2,"people",1],
        ["8605-313","Understanding Stress Management in the Workplace",2,"people",1],
        ["8605-314","Understanding Discipline in the Workplace",2,"people",1],
        ["8605-315","Understanding Recruitment and Selection of New Staff in the Workplace",2,"people",2],
        ["8605-316","Understanding the Induction of New Staff in the Workplace",2,"people",1],
        ["8605-317","Understanding Training and Coaching in the Workplace",2,"people",2],
        ["8605-318","Understanding Quality Management in the Workplace",2,"ops",2],
        ["8605-319","Understanding Organising and Delegating in the Workplace",2,"ops",1],
        ["8605-320","Managing Workplace Projects",2,"ops",2],
        ["8605-321","Understanding Health and Safety in the Workplace",2,"ops",2],
        ["8605-322","Understand the Organisation and its Context",2,"strat",2],
        ["8605-323","Understanding Performance Management",2,"people",2],
        ["8605-324","Understand Costs and Budgets in an Organisation",2,"money",1],
        ["8605-325","Understand How to Manage the Efficient Use of Materials and Equipment",2,"ops",2],
        ["8605-326","Understanding the Communication Process in the Workplace",2,"rel",2],
        ["8605-327","Understanding Negotiation and Networking in the Workplace",2,"rel",1],
        ["8605-328","Understand How to Lead Effective Meetings",2,"rel",2],
        ["8605-329","Understanding Workplace Information Systems",2,"ops",1],
        ["8605-330","Understanding Marketing for Managers",2,"strat",1],
        ["8605-331","Understanding Support Services Operations in an Organisation",2,"ops",3],
        ["8605-332","Understanding Sustainability and Environmental Issues in an Organisation",2,"strat",3],
        ["8605-333","Understanding Procurement and Supplier Management in the Workplace",2,"rel",2],
        ["8605-334","Understanding and Developing Relationships in the Workplace",2,"rel",2],
        ["8605-335","Understand How to Manage Contracts and Contractors in the Workplace",2,"rel",2],
        ["8605-336","Understanding Incident Management and Disaster Recovery in the Workplace",2,"ops",2],
        ["8605-337","Understanding Security Measures in the Workplace",2,"ops",2],
        ["8605-338","Understanding How to Manage Remote Workers",2,"people",2],
        ["8605-341","Leading and Motivating a Team Effectively",2,"people",2],
        ["8605-359","Understanding Good Practice in Coaching within an Organisational Context",2,"people",3],
        ["8605-361","Understanding Good Practice in Mentoring within an Organisational Context",2,"people",3],
        ["8605-501","Managing Improvement",2,"ops",3],
        ["8605-502","Making a Financial Case",2,"money",3],
        ["8605-503","Developing Critical Thinking",2,"self",4],
        ["8605-504","Leading Innovation and Change",2,"strat",5],
        ["8605-505","Managing Individual Development",2,"people",4],
        ["8605-506","Managing Stress and Conflict in the Organisation",2,"people",3],
        ["8605-507","Understanding the Organisational Environment",2,"strat",5],
        ["8605-508","Understanding Organisational Culture and Ethics",2,"strat",3],
        ["8605-509","Managing Customer Relations",2,"rel",3],
        ["8605-510","Managing for Efficiency and Effectiveness",2,"ops",4],
        ["8605-511","Managing Projects in the Organisation",2,"ops",4],
        ["8605-512","Managing Resources",2,"ops",4],
        ["8605-513","Managing Information",2,"ops",4],
        ["8605-514","Managing Recruitment",2,"people",5],
        ["8605-515","Managing Work Analysis",2,"ops",3],
        ["8605-516","Analysing and Interpreting Statistics to Inform Management Decisions",2,"money",2],
        ["8605-517","Understanding the Management of Facilities",2,"ops",2],
        ["8605-518","Making Professional Presentations",2,"rel",2],
        ["8605-519","Developing and Leading Teams to Achieve Organisational Goals and Objectives",2,"people",4],
        ["8605-520","Assessing Your Own Leadership Capability and Performance",2,"self",6],
        ["8605-521","Managing Own Continuing Professional Development",2,"self",15,true],
        ["8605-522","Becoming an Effective Leader",2,"self",5],
        ["8605-523","Preparing to Apply Lean Production and Improvement Methodologies to Operational Problems in Service Delivery",2,"ops",8],
        ["8605-525","Improving and Maintaining the Organisation's Environmental Performance",2,"strat",5],
        ["8605-526","Managing Remote Workers",2,"people",5],
        ["8605-527","Partnership Working",2,"rel",4],
        ["8605-528","Understanding Governance of Organisations",2,"strat",6],
        ["8605-529","Knowledge and Information Management",2,"ops",5],
        ["8605-533","Managing Mental Health in the Workplace",2,"people",3],
        ["8605-550","Understanding the Skills, Principles and Practice of Effective Coaching and Mentoring Within an Organisational Context",2,"people",6]
      ]
    },
    6: {
      mode: "credits",
      title: "ILM Level 6 Leadership and Management",
      quals: QUALS6,
      g1label: "Units 601 to 612", g2label: "Level 5 and 7 units",
      g2tag: function (u) { return u.code.charAt(0) === "5" ? "Level 5" : "Level 7"; },
      units: [
        ["601","Developing personal effectiveness and impact",1,"self",6],
        ["602","Developing critical thinking",1,"self",8],
        ["603","Progressive discourse in modern leadership",1,"self",10],
        ["604","Delivering outcomes through people",1,"people",12],
        ["605","Optimising organisational capacity",1,"ops",10],
        ["606","Maximising data efficiency for organisational success",1,"money",7],
        ["607","Leading a sustainable and future focused organisation",1,"strat",5],
        ["608","Delivering a commercially focused strategy",1,"strat",8],
        ["609","Principles and practices of risk management",1,"ops",5],
        ["610","Innovation, creativity and entrepreneurship",1,"strat",5],
        ["611","Project management",1,"ops",7],
        ["612","Introduction to strategic management",1,"strat",4],
        ["703","Developing strategic leadership and management capability",2,"self",10],
        ["710","Embedding a culture of developmental leadership",2,"people",12],
        ["711","Strategic leadership development",2,"self",11],
        ["712","Supporting a culture of innovation through change",2,"strat",12],
        ["713","Strategic influencing and negotiation",2,"rel",13],
        ["714","Strategic optimisation of people resources",2,"people",11],
        ["715","Adopting a data led approach to strategic management",2,"money",10],
        ["716","Developing a commercially focused organisation",2,"money",10],
        ["717","Evolving approaches in leadership and management",2,"self",7],
        ["504","Leading innovation and change",2,"strat",5],
        ["514","Managing recruitment",2,"people",5],
        ["522","Becoming an effective leader",2,"self",5],
        ["529","Knowledge and information management",2,"ops",5],
        ["550","Understanding the skills, principles and practice of effective coaching and mentoring within an organisational context",2,"people",6]
      ]
    },
    7: {
      mode: "credits",
      title: "ILM Level 7 Strategic Leadership and Management",
      quals: QUALS7,
      dipQual: "extended", dipLabel: "Extended Diploma only",
      g1label: "Level 7 units", g2label: "Level 6 units",
      g2tag: function (u) { return u.code === "800" ? "" : "Level 6"; },
      units: [
        ["700","Developing leadership and management capability through enquiry",1,"self",20],
        ["701","Developing a high-level business case",1,"money",20],
        ["702","Developing and maintaining a high-performance culture and optimising resources",1,"people",20],
        ["703","Developing strategic leadership and management capability",1,"self",10],
        ["710","Embedding a culture of developmental leadership",1,"people",12],
        ["711","Strategic leadership development",1,"self",11],
        ["712","Supporting a culture of innovation through change",1,"strat",12],
        ["713","Strategic influencing and negotiation",1,"rel",13],
        ["714","Strategic optimisation of people resources",1,"people",11],
        ["715","Adopting a data led approach to strategic management",1,"money",10],
        ["716","Developing a commercially focused organisation",1,"money",10],
        ["717","Evolving approaches in leadership and management",1,"self",7],
        ["800","The impactful CEO",0,"strat",20,true],
        ["601","Developing personal effectiveness and impact",2,"self",6],
        ["602","Developing critical thinking",2,"self",8],
        ["603","Progressive discourse in modern leadership",2,"self",10],
        ["604","Delivering outcomes through people",2,"people",12],
        ["605","Optimising organisational capacity",2,"ops",10],
        ["606","Maximising data efficiency for organisational success",2,"money",7],
        ["607","Leading a sustainable and future focused organisation",2,"strat",5],
        ["608","Delivering a commercially focused strategy",2,"strat",8],
        ["609","Principles and practices of risk management",2,"ops",5],
        ["610","Innovation, creativity and entrepreneurship",2,"strat",5],
        ["611","Project management",2,"ops",7],
        ["612","Introduction to strategic management",2,"strat",4]
      ]
    },
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
    "font-family:var(--bd);color:var(--ink);font-size:1.0625rem;line-height:1.55;background:var(--bg);padding:40px 20px;border-radius:0;box-sizing:border-box;box-shadow:0 0 0 100vmax var(--bg);clip-path:inset(0 -100vmax)}",
    ".ilmb *,.ilmb *::before,.ilmb *::after{box-sizing:border-box}",
    ".ilmb :focus-visible{outline:3px solid var(--o);outline-offset:2px;border-radius:4px}",
    ".ilmb-in{max-width:1120px;margin:0 auto}",
    ".ilmb h2,.ilmb h3{font-family:var(--hd);line-height:1.2;margin:0}",
    ".ilmb h2{font-size:clamp(1.5rem,3.2vw,2rem);font-weight:700;color:var(--n)}",
    ".ilmb h3{font-size:1.05rem;font-weight:600}",
    ".ilmb p{margin:0 0 .8em}",
    ".ilmb-lead{color:var(--mut);max-width:none;font-size:1.1rem;margin-top:10px!important}",
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
    ".ilmb-enq{display:inline-block}",".ilmb-ladder .ilmb-enq-l{display:block;width:100%;text-align:center;margin-top:10px}",
    ".ilmb.ilmb-full .ilmb-enq{display:inline-block}",
    ".ilmb.ilmb-full .ilmb-enq-l{display:block;width:100%;text-align:center;margin-top:10px}",
    ".ilmb-btn.buy{background:#fff;color:#1d2560!important;text-decoration:none!important}",
    ".ilmb-ladder .ilmb-btn.buy{display:block;width:100%;text-align:center;margin-top:10px;background:#1d2560;color:#fff!important}",
    ".ilmb-cta{scroll-margin-top:120px}",
    ".ilmb-note{font-size:.88rem;color:var(--mut);margin:12px 0 0!important}",
    ".ilmb-cta{background:var(--n);color:#fff;border-radius:12px;padding:32px 28px;margin-top:40px}",
    ".ilmb-cta h2{color:#fff}",
    ".ilmb-cta{text-align:center}",
    ".ilmb-cta .ilmb-lead{max-width:720px;margin-left:auto;margin-right:auto}",
    ".ilmb-cta .ilmb-form{margin-left:auto;margin-right:auto;text-align:left}",
    ".ilmb-cta .ilmb-form .ilmb-row{justify-content:center}",
    ".ilmb-cta .ilmb-consent,.ilmb-cta .ilmb-status{text-align:center}",
    ".ilmb-cta .ilmb-thanks{margin-left:auto;margin-right:auto;text-align:left}",
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

  // Styles for the ILM page content (.ilmp). WordPress strips <style> tags
  // from page content, so they are injected from here instead.
  var PAGE_CSS = ".ilmp{--n:#1C2560;--o:#FF8A00;--bg:#F4F5F9;--ink:#1B1F33;--mut:#565C75;--ln:#DCDFEA;--ns:#E7E9F3;font-family:'Asap',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Arial,sans-serif;color:var(--ink);font-size:1.0625rem;line-height:1.6}.ilmp *{box-sizing:border-box}.ilmp h1,.ilmp h2,.ilmp h3{font-family:'Alata',ui-sans-serif,system-ui,Arial,sans-serif;color:var(--n);line-height:1.2;margin:0 0 12px}.ilmp h1{font-size:clamp(1.9rem,4.6vw,2.8rem)}.ilmp h2{font-size:clamp(1.45rem,3vw,1.9rem)}.ilmp h3{font-size:1.1rem}.ilmp p{margin:0 0 .9em;max-width:none}.ilmp-sec{position:relative;padding:56px max(20px,calc((100% - 1120px)/2));background:#fff;box-shadow:0 0 0 100vmax #fff;clip-path:inset(0 -100vmax)}.ilmp-sec.alt{background:var(--bg);box-shadow:0 0 0 100vmax var(--bg)}.ilmp-sec.hero{background:#4c6bd8;box-shadow:0 0 0 100vmax #4c6bd8;color:#fff;padding-top:64px;padding-bottom:64px}.ilmp-sec.hero h1{color:#fff}.ilmp-sec.hero p{color:rgba(255,255,255,.88)}.ilmp-sec.hero .ilmp-lead{color:#fff}.ilmp-lead{font-size:1.15rem;color:var(--mut)}.ilmp-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-top:28px}.ilmp-fact{background:var(--bg);border-left:4px solid var(--o);border-radius:8px;padding:14px 16px}.ilmp-fact b{display:block;font-family:'Alata',sans-serif;font-size:1.5rem;color:var(--n)}.ilmp-fact span{font-size:.95rem;color:var(--mut)}.hero .ilmp-fact{background:rgba(255,255,255,.14);border-left-color:#fff}.hero .ilmp-fact b{color:#fff}.hero .ilmp-fact span{color:rgba(255,255,255,.9)}.ilmp-tw{overflow-x:auto;margin-top:20px;border:1px solid var(--ln);border-radius:10px}.ilmp table{border-collapse:collapse;width:100%;min-width:560px;background:#fff;margin:0}.ilmp th,.ilmp td{padding:13px 16px;text-align:left;border-bottom:1px solid var(--ln);vertical-align:top}.ilmp thead th{background:var(--n);color:#fff;font-family:'Alata',sans-serif;font-weight:400}.ilmp tbody th{font-weight:700;background:var(--bg)}.ilmp tr:last-child td,.ilmp tr:last-child th{border-bottom:0}.ilmp-steps{list-style:none;padding:0;margin:24px 0 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:0;counter-reset:s}.ilmp-steps li{counter-increment:s;padding:16px 18px 16px 0;border-top:3px solid var(--ln);margin:0}.ilmp-steps li.k{border-top-color:var(--o)}.ilmp-steps li::before{content:counter(s);display:block;font-family:'Alata',sans-serif;font-size:1.5rem;color:var(--n)}.ilmp-steps p{color:var(--mut);font-size:.98rem;margin:4px 0 0}.ilmp-ev{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin-top:24px}.ilmp-ev>div{background:#fff;border:1px solid var(--ln);border-radius:10px;padding:18px 20px}.ilmp-ev p{font-size:.98rem;color:var(--mut);margin:0}.ilmp-ev ul{margin:8px 0 0;padding-left:1.1em;font-size:.98rem;color:var(--mut)}.ilmp details{border-bottom:1px solid var(--ln);padding:16px 0}.ilmp details:first-of-type{border-top:1px solid var(--ln)}.ilmp summary{cursor:pointer;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;gap:16px}.ilmp summary::-webkit-details-marker{display:none}.ilmp summary::after{content:'+';font-size:1.4rem;line-height:1;color:var(--o);flex:none}.ilmp details[open] summary::after{content:'\u2212'}.ilmp details p{margin:10px 0 0;color:var(--mut)}.ilmp-faq{margin-top:20px}.ilmp :focus-visible{outline:3px solid var(--o);outline-offset:2px}.ilmp .ilmb{background:transparent;padding:0;border-radius:0}.ilmp-sec.usps{padding-top:28px;padding-bottom:28px;background:var(--bg);box-shadow:0 0 0 100vmax var(--bg)}.ilmp-usps{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px}.ilmp-usp{display:flex;gap:10px;align-items:flex-start;background:#fff;border:1px solid var(--ln);border-radius:10px;padding:14px 16px;font-size:.93rem;line-height:1.45;color:var(--mut)}.ilmp-usp svg{flex:none;width:20px;height:20px;margin-top:3px;color:var(--o)}.ilmp-usp b{display:block;font-family:'Alata',sans-serif;font-weight:400;font-size:1rem;color:var(--n);margin-bottom:2px}.ilmp .ilmb-lead{max-width:none}/* New BoldGrid ILM page (.ilmx) */.ilmx-tw{overflow-x:auto;border-radius:12px;margin-top:20px;border:1px solid #dcdfea}.ilmx-tw table{border-collapse:collapse;width:100%;min-width:560px;background:#fff;margin:0}.ilmx-tw th,.ilmx-tw td{padding:14px 16px;text-align:left;border-bottom:1px solid #dcdfea;vertical-align:top;font-size:16px}.ilmx-tw thead th{background:#1d2560;color:#fff;font-weight:700}.ilmx-tw tbody th{background:#f4f5f9;color:#1d2560;font-weight:700}.ilmx-tw tr:last-child td,.ilmx-tw tr:last-child th{border-bottom:0}.ilmx-ev{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin:10px 0 0}.ilmx-card{background:#fff;border-radius:15px;padding:24px 26px;height:100%}.ilmx-card h3{color:#1d2560;font-size:20px;font-weight:700;margin:0 0 8px}.ilmx-card p,.ilmx-card li{color:#565c75;font-size:16px;line-height:1.55;margin:0}.ilmx-card ul{margin:8px 0 0;padding-left:1.1em}.ilmx-faq details{border-bottom:1px solid #dcdfea;padding:18px 0}.ilmx-faq details:first-of-type{border-top:1px solid #dcdfea}.ilmx-faq summary{cursor:pointer;font-weight:700;font-size:18px;color:#1d2560;list-style:none;display:flex;justify-content:space-between;gap:16px}.ilmx-faq summary::-webkit-details-marker{display:none}.ilmx-faq summary::after{content:'+';font-size:26px;line-height:1;color:#ff8c04;flex:none}.ilmx-faq details[open] summary::after{content:'\u2212'}.ilmx-faq details p{margin:10px 0 0;color:#565c75}.ilmx-build .ilmb{background:transparent;padding:0;border-radius:0;box-shadow:none;clip-path:none}.ilmx-build .ilmb-lead{max-width:none}";

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
    if (L.mode === "credits") return mountCredits(root, idx, L, level);
    var QL = L.quals || QUALS;
    var qualAttr = (root.getAttribute("data-qual") || "choose").toLowerCase();
    var formGuid = root.getAttribute("data-form-guid") || FORM_GUID;
    var phone = root.getAttribute("data-phone") || DEFAULT_PHONE;
    var uid = "ilmb" + idx + "-";

    var UNITS = L.units.map(function (u) { return { code: u[0], name: u[1], group: u[2], desc: u[3], mandatory: !!u[4] }; });
    var byCode = {}; UNITS.forEach(function (u) { byCode[u.code] = u; });
    var optionalCount = UNITS.filter(function (u) { return !u.mandatory; }).length;

    var key = level + "|" + qualAttr + "|" + idx;
    var state = STATES[key] || (STATES[key] = { qual: QL[qualAttr] ? qualAttr : (QL.diploma ? "diploma" : Object.keys(QL).slice(-1)[0]), picks: [], focus: [] });
    root._ilmbMounted = true;
    function max() { return QL[state.qual].optional; }

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
      Object.keys(QL).forEach(function (k) {
        var b = el("button", null, QL[k].label); b.type = "button"; b.setAttribute("role", "tab");
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
    var buyL = el("a", "ilmb-btn buy", "Buy now"); buyL.style.display = "none"; ladder.appendChild(buyL);
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
    cta.appendChild(el("p", "ilmb-lead", "We'll come back to you with a quote based on your units, and your induction is usually within 7 working days of registration."));
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
    var buyF = el("a", "ilmb-btn buy", "Buy now"); buyF.style.display = "none"; brow.appendChild(buyF);
    var call = el("a", "ilmb-btn ghost", "Or call " + phone); call.href = "tel:" + phone.replace(/\s/g, ""); brow.appendChild(call);
    var status = el("p", "ilmb-status"); status.setAttribute("role", "status"); form.appendChild(status);
    var thanks = el("div", "ilmb-thanks"); thanks.tabIndex = -1; cta.appendChild(thanks);
    thanks.appendChild(el("h3", null, "Thanks, we've got your picks."));
    thanks.appendChild(el("p", null, "Our team will be in touch shortly. If it's urgent, call " + phone + "."));

    function qualName() { return "ILM Level " + level + " " + QL[state.qual].label; }
    function allCodes() { return [L.mandatory].concat(state.picks); }
    function unitsText() { return allCodes().map(function (c) { return c + " " + byCode[c].name; }).join("; "); }
    trackBuy(buyL, qualName, unitsText); trackBuy(buyF, qualName, unitsText);

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
      var q = QL[state.qual], m = max(), full = state.picks.length >= m, total = m + 1;
      h.textContent = "Build your " + q.label;
      lead.textContent = "Every " + q.label + " starts with unit " + L.mandatory + ". You then choose " + m +
        " of the " + optionalCount + " optional units" +
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
      syncBuy([buyL, buyF], level, state.qual, full, (full ? unitsText() : (state.picks.length ? unitsText() + " (remaining units to be chosen at induction)" : "")), qualName());
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

  // ---------- Credit-based builder (ILM Level 4) ----------
  function mountCredits(root, idx, L, level) {
    var Q = L.quals || QUALS4;
    var G1 = L.g1label || "Group 1 units", G2 = L.g2label || "Group 2 units";
    function g2tag(u) { return L.g2tag ? L.g2tag(u) : "Group 2"; }
    var qualAttr = (root.getAttribute("data-qual") || "choose").toLowerCase();
    var formGuid = root.getAttribute("data-form-guid") || FORM_GUID;
    var phone = root.getAttribute("data-phone") || DEFAULT_PHONE;
    var uid = "ilmb" + idx + "-";

    var UNITS = L.units.map(function (u) { return { code: u[0], name: u[1], grp: u[2], topic: u[3], cr: u[4], dip: !!u[5] }; });
    var byCode = {}; UNITS.forEach(function (u) { byCode[u.code] = u; });

    var key = level + "|" + qualAttr + "|" + idx;
    var state = STATES[key] || (STATES[key] = { qual: Q[qualAttr] ? qualAttr : "certificate", picks: [], focus: [] });
    root._ilmbMounted = true;
    function q() { return Q[state.qual]; }

    var dipQual = L.dipQual || "diploma", dipLabel = L.dipLabel || "Diploma only";
    function g2l() { return q().g2label || G2; }
    function allowed(u) {
      if (q().allow) return q().allow.indexOf(u.code) > -1;
      if (u.dip && state.qual !== dipQual) return false;
      if (u.grp === 2 && q().g2max === 0) return false;
      if (u.grp === 2 && q().only && q().only.indexOf(u.code) < 0) return false;
      return true;
    }
    function totals(list) {
      var t = { t: 0, g1: 0, g2: 0 };
      list.forEach(function (c) { var u = byCode[c]; t.t += u.cr; if (u.grp === 1) t.g1 += u.cr; else if (u.grp === 2) t.g2 += u.cr; });
      return t;
    }
    function fits(u, T) {
      var Qq = q();
      if (Qq.max != null && T.t + u.cr > Qq.max) return false;
      if (u.grp === 2 && T.g2 + u.cr > Qq.g2max) return false;
      return true;
    }
    function valid(T) {
      var Qq = q();
      return T.t >= Qq.min && (Qq.max == null || T.t <= Qq.max) && T.g1 >= Qq.g1min && T.g2 <= Qq.g2max;
    }
    function trim() {
      var keep = [];
      state.picks.forEach(function (c) { var u = byCode[c]; if (allowed(u) && fits(u, totals(keep))) keep.push(c); });
      state.picks = keep;
    }

    root.classList.add("ilmb");
    root.innerHTML = "";
    var inner = el("div", "ilmb-in"); root.appendChild(inner);
    var h = el("h2"); inner.appendChild(h);
    var lead = el("p", "ilmb-lead"); inner.appendChild(lead);

    var evStrip = el("div", "ilmb-ev"); inner.appendChild(evStrip);
    [
      ["No exams or tests", "Knowledge questions are answered at your own pace, in writing or on a call, and they aren't a test."],
      ["Recorded discussions", "One video call with your assessor can cover most of your units."],
      ["Witness testimony", "A statement from your manager can count as evidence across several units."],
      ["Assignments from real work", "Written assignments and case studies are based on your own role, with your assessor guiding you."]
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
      Object.keys(Q).forEach(function (k) {
        var b = el("button", null, Q[k].label); b.type = "button"; b.setAttribute("role", "tab");
        b.addEventListener("click", function () { state.qual = k; trim(); render(); });
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
        if (state.focus.length === 3) suggest(false);
      });
      chips.appendChild(c);
    });
    var row = el("div", "ilmb-row"); sug.appendChild(row);
    var sugBtn = el("button", "ilmb-btn", "Suggest units"); sugBtn.type = "button"; row.appendChild(sugBtn);
    var clrBtn = el("button", "ilmb-btn ghost", "Clear picks"); clrBtn.type = "button"; row.appendChild(clrBtn);
    var enqBtn = el("button", "ilmb-btn or ilmb-enq", "Enquire now"); enqBtn.type = "button"; row.appendChild(enqBtn);
    var g2Btn = el("button", "ilmb-btn ghost ilmb-g2btn"); g2Btn.type = "button";
    g2Btn.addEventListener("click", function () { state.showG2 = !state.showG2; render(); });

    function suggest(scroll) {
      var Qq = q(), picks = [];
      function add(u) {
        if (picks.indexOf(u.code) > -1 || !allowed(u) || u.dip || !fits(u, totals(picks))) return;
        picks.push(u.code);
      }
      function short() { return totals(picks).t < Qq.min; }
      var pools = (state.focus.length ? state.focus : ["people", "ops", "strat"]).map(function (t) {
        return UNITS.filter(function (u) { return u.topic === t && u.grp === 1; })
          .sort(function (x, y) { return x.cr - y.cr; });
      });
      var k = 0;
      while (short() && pools.some(function (p) { return p.length; })) {
        var p = pools[k % pools.length]; if (p.length) add(p.shift()); k++;
      }
      UNITS.forEach(function (u) { if (short() && u.grp === 1) add(u); });
      UNITS.forEach(function (u) { if (short()) add(u); });
      state.picks = picks;
      render();
      if (scroll) ladder.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    sugBtn.addEventListener("click", function () { suggest(true); });
    clrBtn.addEventListener("click", function () { state.picks = []; render(); });

    function toggle(code) {
      var ix = state.picks.indexOf(code);
      if (ix > -1) state.picks.splice(ix, 1);
      else { var u = byCode[code]; if (allowed(u) && fits(u, totals(state.picks))) state.picks.push(code); }
      render();
    }

    var unitBtns = {}, groupBoxes = {};
    GROUPS.forEach(function (g) {
      var list = UNITS.filter(function (u) { return u.topic === g.id; })
        .sort(function (a, b) { return a.grp - b.grp; });
      if (!list.length) return;
      if (!left.querySelector(".ilmb-g2bar")) {
        var g2bar = el("div", "ilmb-g2bar");
        g2bar.appendChild(el("span", "ilmb-g2txt"));
        g2bar.appendChild(g2Btn); left.appendChild(g2bar);
      }
      var box = el("div", "ilmb-group"); box.appendChild(el("h3", null, g.name));
      var ug = el("div", "ilmb-units");
      list.forEach(function (u) {
        var b = el("button", "ilmb-unit"); b.type = "button";
        var c = el("span", "c", u.code);
        if (u.grp === 2 && g2tag(u)) c.appendChild(el("span", "ilmb-tag", g2tag(u)));
        if (u.dip) c.appendChild(el("span", "ilmb-tag dip", dipLabel));
        b.appendChild(c);
        b.appendChild(el("span", "nm", u.name));
        b.appendChild(el("span", "cr", u.cr + " credit" + (u.cr > 1 ? "s" : "")));
        b.addEventListener("click", function () { toggle(u.code); });
        unitBtns[u.code] = b; ug.appendChild(b);
      });
      box.appendChild(ug); left.appendChild(box); groupBoxes[g.id] = box;
    });

    var ladder = el("aside", "ilmb-ladder"); ladder.setAttribute("aria-live", "polite"); grid.appendChild(ladder);
    var lt = el("div", "t"); ladder.appendChild(lt);
    var lc = el("div", "ct"); ladder.appendChild(lc);
    var bar = el("div", "ilmb-bar"); var barFill = el("i"); bar.appendChild(barFill); ladder.appendChild(bar);
    var mNeed = el("p", "ilmb-meter"); ladder.appendChild(mNeed);
    var mG2 = el("p", "ilmb-meter"); ladder.appendChild(mG2);
    var picksList = el("ul", "ilmb-picks"); ladder.appendChild(picksList);
    var empty = el("p", "ilmb-empty", "No units picked yet. Tap a unit to add it."); ladder.appendChild(empty);
    var hint = el("div", "ilmb-hint"); ladder.appendChild(hint);
    var done = el("div", "ilmb-done"); ladder.appendChild(done);
    var enqBtn2 = el("button", "ilmb-btn or ilmb-enq ilmb-enq-l", "Enquire now"); enqBtn2.type = "button"; ladder.appendChild(enqBtn2);
    var buyL = el("a", "ilmb-btn buy", "Buy now"); buyL.style.display = "none"; ladder.appendChild(buyL);
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
    cta.appendChild(el("p", "ilmb-lead", "We'll come back to you with a quote based on your units, and your induction is usually within 7 working days of registration."));
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
    var buyF = el("a", "ilmb-btn buy", "Buy now"); buyF.style.display = "none"; brow.appendChild(buyF);
    var call = el("a", "ilmb-btn ghost", "Or call " + phone); call.href = "tel:" + phone.replace(/\s/g, ""); brow.appendChild(call);
    var status = el("p", "ilmb-status"); status.setAttribute("role", "status"); form.appendChild(status);
    var thanks = el("div", "ilmb-thanks"); thanks.tabIndex = -1; cta.appendChild(thanks);
    thanks.appendChild(el("h3", null, "Thanks, we've got your picks."));
    thanks.appendChild(el("p", null, "Our team will be in touch shortly. If it's urgent, call " + phone + "."));


    function qualName() { return "ILM Level " + level + " " + q().label; }
    function allCodes() { return state.picks.slice(); }
    function unitsText() { return allCodes().map(function (c) { return c + " " + byCode[c].name; }).join("; "); }
    trackBuy(buyL, qualName, unitsText); trackBuy(buyF, qualName, unitsText);

    function summary() {
      var T = totals(state.picks);
      var lines = [qualName() + ": unit picks", ""];
      if (!state.picks.length) lines.push("(no units picked yet)");
      state.picks.forEach(function (c) { var u = byCode[c]; lines.push(c + " " + u.name + " (" + u.cr + " credits)"); });
      lines.push("");
      lines.push("Total: " + T.t + " credits (" + G1 + ": " + T.g1 + ", " + g2l() + ": " + T.g2 + ")");
      lines.push("Learners: " + fLearners.value);
      lines.push("Planned start: " + fStart.value);
      return lines.join("\n");
    }

    function render() {
      var Qq = q(), T = totals(state.picks), ok = valid(T);
      h.textContent = "Build your " + Qq.label;
      lead.textContent = "The ILM Level " + level + " " + Qq.label + " needs " + Qq.range + " credits. " + Qq.rule +
        " Each unit carries a credit value, so pick the ones that match the work you already do. Your assessor confirms the final choice with you at induction.";
      Array.prototype.forEach.call(tabs.children, function (t) {
        t.setAttribute("aria-selected", t.getAttribute("data-k") === state.qual ? "true" : "false");
      });
      Object.keys(groupBoxes).forEach(function (gid) {
        var any = false;
        UNITS.forEach(function (u) {
          if (u.topic !== gid) return;
          var b = unitBtns[u.code], on = state.picks.indexOf(u.code) > -1;
          var show = allowed(u) && (u.grp !== 2 || state.showG2 || on);
          (b.parentNode.classList.contains("ilmb-uw") ? b.parentNode : b).style.display = show ? "" : "none";
          if (show) any = true;
          b.setAttribute("aria-pressed", on ? "true" : "false");
          b.disabled = !on && !fits(u, T);
        });
        groupBoxes[gid].style.display = any ? "" : "none";
      });

      var g2n = UNITS.filter(function (u) { return u.grp === 2 && allowed(u); }).length;
      g2Btn.textContent = (state.showG2 ? "Hide " : "Show ") + g2l() + " (" + g2n + ")";
      g2Btn.parentNode.querySelector(".ilmb-g2txt").textContent = G1 + " are shown. " + g2l() + " can be added within the limits for your qualification.";
      g2Btn.parentNode.style.display = Qq.g2max > 0 ? "" : "none";
      lt.textContent = "Your " + Qq.label;
      lc.textContent = T.t + " credit" + (T.t === 1 ? "" : "s") + " picked";
      barFill.style.width = Math.min(100, Math.round(T.t / Qq.min * 100)) + "%";
      bar.classList.toggle("ok", ok);
      mNeed.innerHTML = "";
      mNeed.appendChild(document.createTextNode("Needed: "));
      mNeed.appendChild(el("b", null, Qq.range + " credits"));
      mG2.innerHTML = "";
      if (Qq.g2max > 0) {
        mG2.appendChild(document.createTextNode(g2l() + ": "));
        mG2.appendChild(el("b", null, T.g2 + " of " + Qq.g2max + " credits max"));
        mG2.style.display = "";
      } else mG2.style.display = "none";

      picksList.innerHTML = "";
      state.picks.forEach(function (c) {
        var u = byCode[c], li = el("li", "ilmb-pick");
        li.appendChild(el("span", null, u.name));
        li.appendChild(el("em", null, u.cr + " cr"));
        var x = el("button", null, "\u00d7"); x.type = "button"; x.setAttribute("aria-label", "Remove " + u.name);
        x.addEventListener("click", function () { toggle(c); });
        li.appendChild(x); picksList.appendChild(li);
      });
      empty.style.display = state.picks.length ? "none" : "";
      var need = Qq.min - T.t;
      hint.textContent = state.picks.length && need > 0
        ? "Add " + need + " more credit" + (need === 1 ? "" : "s") + " to reach the minimum for a " + Qq.label + "."
        : "";
      hint.style.display = hint.textContent ? "" : "none";
      done.textContent = "That's a full " + Qq.label + " at " + T.t + " credits. Send these picks to our team below.";
      enqBtn.textContent = enqBtn2.textContent = "Enquire about this " + Qq.label;
      ladder.classList.toggle("full", ok);
      root.classList.toggle("ilmb-full", ok);
      syncBuy([buyL, buyF], level, state.qual, ok, (ok ? unitsText() : (state.picks.length ? unitsText() + " (remaining units to be chosen at induction)" : "")), qualName());
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


  // ---------- About this unit (dropdown under each unit card) ----------
  // Plain-English summaries drafted from the official unit titles and specs. Edit freely.
  var ABOUT = {
"201": "Look at your role in the team, what's expected of you and where you want to grow, then build a development plan. It gives you a clear direction and shows you're ready for more responsibility.",
"202": "Covers setting goals, checking progress and helping colleagues do their best work. Useful if you're often the one keeping the team on track day to day.",
"203": "Explores why disagreements happen and how to handle them calmly and fairly before they escalate. A practical skill that keeps the team working well together.",
"204": "Looks at what drives people at work and how you can keep your team engaged. Helps you get the best from colleagues without relying on authority.",
"205": "Covers what equity, diversity and inclusion mean at work and your part in making sure everyone is treated fairly. Useful in any role where you support or guide others.",
"206": "Shows you how to spot better ways of working, put ideas forward and help changes stick. Great if you often see how things could run more smoothly.",
"207": "Gives you a structured way to pin down a problem, weigh up options and choose a solution. Saves time and stops the same issues coming back.",
"208": "Covers collecting simple data and using it to back up decisions. Helps you make choices you can explain with facts rather than gut feel.",
"209": "Explores how your organisation is set up and the outside factors that affect it. Helps you see how your work fits the bigger picture.",
"210": "Covers keeping accurate records and handling information securely and in line with the rules. Useful wherever paperwork, data or confidentiality matter.",
"211": "Looks at your responsibilities for health, safety and wellbeing and how to spot and report risks. Important in any team and essential on busy or hazardous sites.",
"212": "Covers choosing the right message and method, listening well and giving clear instructions. Better communication means fewer mistakes and smoother teamwork.",
"213": "Explores the communication tools your workplace uses, from email to video calls, and when each works best. Helps you get your message across quickly and professionally.",
"214": "Helps you identify who has an interest in your team's work and what they expect. Useful for building good working relationships across the organisation.",
"215": "Covers supporting customers, suppliers and other outside contacts to a high standard. Ideal if you deal with people outside your organisation.",
"301": "Explores leadership styles, what makes leaders effective and how you lead today, then plans how you'll improve. It's the foundation for the rest of the qualification.",
"302": "Covers assessing your own skills, setting development goals and reviewing your progress. Keeps your career moving in the direction you want.",
"303": "Covers setting objectives, monitoring work, giving feedback and tackling underperformance. A core skill for anyone with people reporting to them.",
"304": "Looks at what affects wellbeing at work and how you can support your team, including spotting when someone is struggling. Healthier teams are more productive and stay longer.",
"305": "Covers planning a role, running fair selection and choosing the right person. Helps you avoid costly hiring mistakes.",
"306": "Takes you through planning, running and reviewing a project, including scope, timescales and risks. Useful for anyone asked to deliver work outside the day job.",
"307": "Explores why change happens, how people react and how to lead your team through it. Valuable when new systems, restructures or new ways of working land on your desk.",
"308": "Gives you tools to analyse problems, generate options and make decisions you can justify. Makes you more confident handling tricky situations.",
"309": "Covers your organisation's environmental duties and practical ways to reduce its impact. Increasingly important as clients and regulators focus on sustainability.",
"310": "Covers gathering and analysing data to support decisions and present what you find. Helps you make the case for decisions with evidence.",
"311": "Explains budgets, costs and how money flows through your organisation. Useful if you manage a budget or need to understand the financial side of decisions.",
"312": "Covers communicating clearly with different audiences, listening actively and overcoming barriers. Strong communication underpins every other management skill.",
"313": "Covers planning and leading meetings, briefings and presentations so they're focused and useful. Makes the time spent in meetings count.",
"314": "Explores flexible working options, the rules around requests and how to manage a team working different patterns. Helpful as more teams mix hours and locations.",
"315": "Looks at what makes teams perform well and how to build trust, clear roles and shared goals. Ideal if you want more from the team you lead.",
"316": "Covers the main laws and regulations that apply to your area and how to make sure your team complies. Reduces risk for you and your organisation.",
"317": "Covers building and keeping strong relationships with clients, suppliers and partners. Useful in any role that depends on people outside your organisation.",
"501": "Reflect on how you lead, gather feedback and plan how to grow as a leader. It anchors the whole qualification in your own development.",
"502": "Covers planning, recording and reviewing your own development over time. Keeps your skills current and your career on track.",
"503": "Covers directing, supporting and managing the performance of your team. The core people management skills for an operational leader.",
"504": "Explores how culture forms and how leaders shape it through what they say and do. Useful if you want to build a positive, high performing environment.",
"505": "Covers using coaching and mentoring to develop people in your team. Helps you grow talent rather than doing everything yourself.",
"506": "Covers building fair, inclusive practice into recruitment, development and day-to-day management. Supports a diverse team where everyone can contribute.",
"507": "Explores how to lead and manage wellbeing, including spotting issues early and creating a supportive culture. Helps reduce absence and keep people engaged.",
"508": "Covers forecasting the people and skills you'll need and planning how to meet that need. Helps you avoid gaps and last-minute resourcing problems.",
"509": "Covers planning, running and closing projects to time, cost and quality. Valuable for any manager delivering change or one-off work.",
"510": "Covers setting and managing budgets, controlling costs and understanding financial information. Essential if you hold budget responsibility.",
"511": "Covers building a financial case for a proposal, including costs, benefits and return on investment. Helps you win approval for your ideas.",
"512": "Explores how to get more value from the systems and digital tools your team uses. Helps you improve efficiency and make better use of investment.",
"513": "Covers identifying, assessing and controlling risks in your area. Helps you protect your operation and make better informed decisions.",
"514": "Covers structured techniques for analysing problems and choosing the best course of action. Useful for the complex issues operational leaders face.",
"515": "Covers creating the conditions for new ideas and leading people through change. Valuable when your organisation needs to adapt quickly.",
"516": "Covers planning and managing people, equipment, materials and money efficiently. Helps you deliver more with what you have.",
"517": "Covers mapping how work flows through the business and redesigning processes to improve it. Useful for cutting waste and delays.",
"518": "Covers setting quality standards, monitoring them and driving continuous improvement. Helps you deliver consistently and keep customers happy.",
"519": "Explores how organisational strategy is set and how your team's work contributes to it. Helps you align priorities with the bigger picture.",
"520": "Covers turning goals into operational plans and targets, then reporting on progress. Gives you a clear line between strategy and day-to-day delivery.",
"521": "Covers organisational values, ethical practice and how leaders influence behaviour. Helps you lead with integrity and handle grey areas.",
"522": "Covers building environmental, social and economic sustainability into operations. Increasingly expected by clients, investors and employees.",
"523": "Covers gathering, analysing and interpreting data to inform decisions. Makes your decisions easier to justify and harder to challenge.",
"524": "Covers building productive working relationships across teams and organisations. Helps you get results that depend on other people.",
"525": "Covers identifying stakeholders, understanding their interests and managing expectations. Keeps key people on side through change and delivery.",
"526": "Covers setting up and managing work with external partners and suppliers. Helps partnerships deliver what was promised.",
"527": "Covers taking a new product or service from idea through development to launch. Useful if you're involved in growth or innovation.",
"8605-400": "Explores your role as a manager, how it supports organisational goals and how to improve your own performance. A strong starting point for any Level 4 programme.",
"8605-401": "Covers planning a complex piece of work, leading the team through it and reviewing the results. Shows you can deliver beyond routine tasks.",
"8605-402": "Covers equality and diversity law and good practice and how to apply them in your area. Helps you manage fairly and reduce risk.",
"8605-403": "Covers identifying and assessing risks in your workplace and putting controls in place. Helps you protect people, assets and performance.",
"8605-404": "Covers what to delegate, to whom and how to support and monitor it. Frees up your time and develops your team.",
"8605-405": "Covers identifying development needs, planning learning and evaluating the results. Builds a more capable team.",
"8605-406": "Explores leadership models and styles and how to adapt yours to different situations. Helps you lead more effectively and flexibly.",
"8605-407": "Covers budgets, financial information and how financial decisions are made. Gives you confidence with the numbers side of management.",
"8605-408": "Covers communicating effectively as a manager, including choosing the right methods and overcoming barriers. Better communication improves almost everything you do.",
"8605-409": "A substantial unit on assessing your development needs, planning and carrying out learning, and reviewing how it has improved your performance. Builds a lasting habit of self-development.",
"8605-410": "Covers finding, analysing and using existing data and research to inform management decisions. Saves time and strengthens your recommendations.",
"8605-411": "Covers health and safety law and your responsibilities for keeping your area safe. Essential for any manager responsible for people or premises.",
"8605-412": "Covers planning, chairing and following up meetings so they achieve their purpose. Makes meetings shorter and more productive.",
"8605-413": "Covers planning, carrying out and evaluating marketing activities. Useful if your role touches promotion, sales or customers.",
"8605-414": "Covers collecting and analysing data to justify a management decision. Helps you back up proposals with evidence.",
"8605-415": "Explores motivation theory and practical ways to motivate your team. Helps improve engagement and performance.",
"8605-416": "Covers analysing workplace problems, weighing options, and making and reviewing decisions. Builds confidence in tackling difficult issues.",
"8605-417": "Covers planning change, managing its impact on people and evaluating the outcome. Valuable when you need to lead your team through new ways of working.",
"8605-418": "Explores organisational culture, structure and the wider context your organisation operates in. Helps you understand why things work the way they do.",
"8605-419": "Explores how work is changing, including technology, flexible working and workforce trends. Helps you anticipate what's coming.",
"8605-420": "Covers preparing budgets and monitoring and controlling spend against them. Essential for managers with budget responsibility.",
"8605-421": "Covers reading financial statements and using ratios to assess how an organisation is performing. Helps you understand the health of a business.",
"8605-422": "Explores the role marketing plays in an organisation's success. Useful for managers who work alongside marketing or sales.",
"8605-423": "Covers using numerical and statistical techniques to analyse and solve management problems. Adds rigour to your decision making.",
"8605-424": "Explores supply, demand, competition and how markets affect your organisation. Helps you understand the commercial pressures you face.",
"8605-425": "Explores mental toughness and how to build resilience and confidence under pressure. Useful in demanding roles.",
"8605-426": "Explores the wider economy, including growth, inflation and government policy, and how it affects organisations. Helps you plan with the bigger picture in mind.",
"8605-427": "Covers creating a culture where people suggest and try new ideas. Helps your team keep improving.",
"8605-300": "Covers practical techniques for identifying problems, finding solutions and making decisions. A short, hands-on unit.",
"8605-301": "Explores why organisations need innovation and change and how change affects people. A good introduction to managing change.",
"8605-302": "Covers planning a change in your area and thinking through its impact. Helps changes go more smoothly.",
"8605-303": "Covers planning work and allocating it to the right people. Helps your team work efficiently.",
"8605-304": "Covers writing clear, well structured business documents. Useful for reports, emails and proposals.",
"8605-305": "Covers generating creative ideas and helping to put them into practice. Encourages fresh thinking in your team.",
"8605-306": "Explores customer service standards and how to meet customer expectations. Useful in customer-facing roles.",
"8605-307": "Covers planning and delivering briefings and presentations with confidence. Helps you get your message across.",
"8605-308": "Explores leadership styles and qualities and what makes leaders effective. A good grounding for newer leaders.",
"8605-309": "Covers how teams form and how to set one up for success. Useful for new or changing teams.",
"8605-310": "Explores motivation theory and how to use it to improve performance. Helps you get more from your team.",
"8605-311": "Covers identifying learning needs and supporting your own and others' development. Builds skills across the team.",
"8605-312": "Explores the causes of conflict at work and ways to manage it. Helps keep working relationships healthy.",
"8605-313": "Explores the causes of workplace stress and how to manage it for yourself and others. Supports wellbeing and productivity.",
"8605-314": "Covers disciplinary procedures and how to handle them fairly and in line with the law. Important for any manager of people.",
"8605-315": "Covers the stages of recruiting and selecting new staff. Helps you hire the right people.",
"8605-316": "Covers planning an induction that helps new starters settle in quickly. Improves retention and early performance.",
"8605-317": "Covers identifying training needs and using training and coaching to develop people. Builds a more skilled team.",
"8605-318": "Explores quality standards and approaches to managing quality. Helps you deliver consistent results.",
"8605-319": "Covers organising work and delegating effectively. Frees up your time for higher value tasks.",
"8605-320": "Covers planning and managing a workplace project. Useful for delivering one-off pieces of work.",
"8605-321": "Covers health and safety responsibilities and good practice at work. Essential knowledge for managers.",
"8605-322": "Explores how organisations are structured and the environment they operate in. Helps you see the bigger picture.",
"8605-323": "Covers setting objectives and monitoring and reviewing performance. A core skill for managing people.",
"8605-324": "Covers how costs and budgets work in an organisation. Useful if you're new to budget responsibility.",
"8605-325": "Covers using materials and equipment efficiently and reducing waste. Saves money and resources.",
"8605-326": "Explores how communication works and how to make it more effective. Reduces misunderstandings.",
"8605-327": "Covers negotiation techniques and building useful networks. Helps you reach agreements and widen your influence.",
"8605-328": "Covers planning and leading meetings that achieve their aims. Makes meetings more productive.",
"8605-329": "Explores the information systems used at work and how to use them well. Helps you manage information effectively.",
"8605-330": "A short introduction to marketing principles for managers. Helps you work better with marketing teams.",
"8605-331": "Explores how support services such as facilities, IT or HR operate and are managed. Useful in support service roles.",
"8605-332": "Explores sustainability and environmental issues and how organisations respond to them. Increasingly important for every manager.",
"8605-333": "Covers procurement processes and managing suppliers. Helps you get value for money.",
"8605-334": "Covers building and developing effective working relationships. Helps you get things done through others.",
"8605-335": "Covers managing contracts and contractors so work is delivered as agreed. Useful where you rely on third parties.",
"8605-336": "Covers planning for incidents and recovering from disruption. Helps keep the business running when things go wrong.",
"8605-337": "Explores physical and information security measures at work. Helps protect people, premises and data.",
"8605-338": "Explores the challenges of managing people who work remotely and how to address them. Useful for hybrid teams.",
"8605-341": "Covers leading a team and keeping people motivated to achieve shared goals. Practical skills for team leaders.",
"8605-359": "Explores good practice in workplace coaching and the benefits it brings an organisation. A foundation for coaching others.",
"8605-361": "Explores good practice in workplace mentoring and the benefits it brings. A foundation for mentoring others.",
"8605-501": "Covers identifying and putting improvements in place in your area. Helps you drive better results.",
"8605-502": "Covers building a financial case for a proposal. Helps you get your ideas approved.",
"8605-503": "Covers analysing arguments and evidence to reach sound judgements. Sharpens your decision making.",
"8605-504": "Covers leading innovation and change and managing its impact on people. Valuable in fast-changing organisations.",
"8605-505": "Covers assessing and supporting the development of individuals in your team. Grows your team's capability.",
"8605-506": "Covers managing stress and conflict across the organisation. Supports a healthier working environment.",
"8605-507": "Explores the internal and external factors that affect organisations. Helps you plan with the wider context in mind.",
"8605-508": "Explores organisational culture, values and ethical behaviour. Helps you lead with integrity.",
"8605-509": "Covers managing customer relationships and service. Helps you keep and grow customers.",
"8605-510": "Covers improving efficiency and effectiveness in your area. Helps you do more with less.",
"8605-511": "Covers planning, managing and evaluating projects. Useful for delivering change.",
"8605-512": "Covers planning and managing physical and human resources. Helps you use resources well.",
"8605-513": "Covers managing information to support decision making. Helps the right people get the right information.",
"8605-514": "Covers planning and managing recruitment and selection. Helps you attract and appoint the right people.",
"8605-515": "Covers analysing work processes to improve how they're done. Helps cut waste and improve productivity.",
"8605-516": "Covers analysing and interpreting statistics to inform decisions. Adds evidence to your management judgement.",
"8605-517": "Explores how facilities are managed to support an organisation. Useful in facilities or operations roles.",
"8605-518": "Covers preparing and delivering professional presentations. Builds confidence in front of an audience.",
"8605-519": "Covers developing and leading teams to achieve organisational goals. Links team performance to the bigger picture.",
"8605-520": "Covers assessing your own leadership capability and planning how to improve it. Helps you lead more effectively.",
"8605-521": "A substantial unit on planning, carrying out and reviewing your continuing professional development. Builds a lasting habit of self-development.",
"8605-522": "Explores what effective leadership looks like and how to develop it in yourself. Helps you grow as a leader.",
"8605-523": "Covers lean and continuous improvement methods and how to apply them to service delivery problems. Helps remove waste and improve flow.",
"8605-525": "Covers improving and maintaining your organisation's environmental performance. Supports sustainability goals.",
"8605-526": "Covers managing remote workers effectively, including communication and performance. Essential for distributed teams.",
"8605-527": "Covers setting up and managing partnerships with other organisations. Helps partnerships deliver results.",
"8605-528": "Explores how organisations are governed and held to account. Useful for senior or board-facing roles.",
"8605-529": "Covers capturing, sharing and managing knowledge and information. Helps your organisation learn and improve.",
"8605-533": "Covers recognising mental health issues at work and supporting colleagues. Helps create a supportive workplace.",
"8605-550": "Covers the skills, principles and practice of coaching and mentoring in an organisation. Prepares you to develop others.",
"601": "Covers assessing and developing your personal effectiveness and the impact you have on others. Helps you lead with greater confidence and presence.",
"602": "Covers critical thinking techniques for analysing information and making sound judgements. Essential as your decisions become more complex.",
"603": "Explores current debates and new thinking in leadership and how they apply to your practice. Keeps your leadership approach current.",
"604": "Covers leading and developing people to deliver organisational outcomes. A substantial unit at the heart of senior people leadership.",
"605": "Covers assessing and improving your organisation's capacity to deliver, across people, processes and resources. Helps the organisation do more with what it has.",
"606": "Covers using data efficiently to support organisational success. Helps you turn information into better decisions.",
"607": "Explores leading an organisation that is sustainable and ready for the future. Supports long-term thinking and resilience.",
"608": "Covers developing and delivering a commercially focused strategy. Helps you connect leadership decisions to commercial results.",
"609": "Covers the principles and practices of managing risk at organisational level. Helps protect the organisation and its plans.",
"610": "Explores how to encourage innovation, creativity and entrepreneurial thinking. Helps your organisation spot and seize opportunities.",
"611": "Covers project management approaches and tools for delivering complex projects. Valuable for leaders sponsoring or running major work.",
"612": "An introduction to strategic management and how strategy is formed and delivered. A bridge into senior strategic roles.",
"700": "A substantial unit where you investigate a leadership or management issue through enquiry and research. Builds your ability to lead evidence-based change.",
"701": "A substantial unit on developing a high-level business case for a strategic proposal. Helps you secure investment and support.",
"702": "A substantial unit on building a high-performance culture and making the best use of resources. Helps you lift organisational performance.",
"703": "Covers developing strategic leadership and management capability in yourself and others. Prepares you for senior strategic roles.",
"710": "Covers embedding a culture where leaders develop others. Builds leadership strength throughout the organisation.",
"711": "Covers designing and leading leadership development at a strategic level. Helps build the leaders your organisation needs.",
"712": "Covers supporting a culture of innovation while the organisation goes through change. Helps it adapt and improve.",
"713": "Covers strategic influencing and negotiation with senior stakeholders. Helps you win support for your agenda.",
"714": "Covers making the best strategic use of the organisation's people. Helps match talent to strategy.",
"715": "Covers using data to inform and evaluate strategic management. Adds rigour to strategic decisions.",
"716": "Covers developing a commercially focused organisation. Helps leaders drive financial sustainability and growth.",
"717": "Explores evolving and emerging approaches to leadership and management. Keeps your practice current.",
"800": "Explores the role and impact of a chief executive, including leading the organisation, its board and its stakeholders. Available on the Extended Diploma only."
};
  function aboutFor(root, code) { if (root.getAttribute("data-level") === "6" && /^5\d\d$/.test(code)) code = "8605-" + code; return ABOUT[code]; }
  var AB_CSS = ".ilmb-uw{display:flex;flex-direction:column}.ilmb-uw>.ilmb-unit{flex:1}" +
    ".ilmb-ab{font:inherit;font-size:.86rem;font-weight:700;color:var(--n);background:none;border:0;padding:7px 2px 0;margin:0;cursor:pointer;text-align:left;display:inline-flex;gap:6px;align-items:center;align-self:flex-start}" +
    ".ilmb-ab::after{content:'+';color:var(--o);font-size:1.1rem;line-height:1}.ilmb-ab[aria-expanded=true]::after{content:'\\2212'}" +
    ".ilmb-abp{font-size:.9rem;color:var(--mut);line-height:1.45;background:var(--s);border:1px solid var(--ln);border-left:3px solid var(--o);border-radius:8px;padding:9px 11px;margin:6px 0 0}.ilmb-abp[hidden]{display:none}";
  var abN = 0;
  function addAbout(root) {
    if (!document.getElementById("ilmb-ab-css")) {
      var s = document.createElement("style"); s.id = "ilmb-ab-css"; s.textContent = AB_CSS; document.head.appendChild(s);
    }
    Array.prototype.forEach.call(root.querySelectorAll(".ilmb-unit"), function (b) {
      if (!b.parentNode || b.parentNode.classList.contains("ilmb-uw")) return;
      var c = b.querySelector(".c"), m = c && c.textContent.match(/\d{4}-\d{3}|\d{3,4}/);
      var txt = m && aboutFor(root, m[0]);
      if (!txt) return;
      var w = document.createElement("div"); w.className = "ilmb-uw";
      b.parentNode.insertBefore(w, b); w.appendChild(b);
      w.style.display = b.style.display; b.style.display = "";
      var t = el("button", "ilmb-ab", "About this unit"); t.type = "button";
      var p = el("p", "ilmb-abp", txt); p.hidden = true; p.id = "ilmb-ab-" + (++abN);
      t.setAttribute("aria-expanded", "false"); t.setAttribute("aria-controls", p.id);
      t.addEventListener("click", function () {
        var open = p.hidden; p.hidden = !open; t.setAttribute("aria-expanded", open ? "true" : "false");
      });
      w.appendChild(t); w.appendChild(p);
    });
  }

  // ---------- Collapsible builder (ILM v28, CMI v12) ----------
  // Builders start closed behind a teaser with a "Build my ..." button.
  // Opt out per page with data-collapsed="false". Optional overrides:
  // data-collapse-heading, data-collapse-text, data-collapse-label.
  // Opens itself when the URL or a clicked link points at the builder or its section (e.g. #build).
  var TZ_OPEN = {};
  var TZ_CSS = ".ilmb-tz{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px 24px;max-width:1120px;margin:0 auto;background:#fff;border:1px solid #DCDFEA;border-left:4px solid #ff8c04;border-radius:12px;padding:22px 26px}" +
    ".ilmb-tz-tx{flex:1;min-width:240px}.ilmb-tz-tx h2{margin:0 0 6px!important}.ilmb-tz-tx p{margin:0!important;color:#565C75}" +
    ".ilmb-tz .ilmb-btn{white-space:nowrap}" +
    ".ilmb-tz.open{background:transparent;border:0;padding:0;margin:0 auto 12px;justify-content:flex-end}.ilmb-tz.open .ilmb-tz-tx{display:none}" +
    ".ilmb-closed>.ilmb-in{display:none}" +
    ".ilmb-opening>.ilmb-in{animation:ilmbTz .3s ease-out}" +
    "@keyframes ilmbTz{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}" +
    "@media(prefers-reduced-motion:reduce){.ilmb-opening>.ilmb-in{animation:none}}";

  function injectTzCss() {
    if (document.getElementById("ilmb-tz-css")) return;
    var s = document.createElement("style"); s.id = "ilmb-tz-css"; s.textContent = TZ_CSS;
    document.head.appendChild(s);
  }

  function tzTarget(hash) {
    try { return hash && hash.length > 1 ? document.querySelector(hash) : null; } catch (e) { return null; }
  }
  function openFromHash(hash) {
    var t = tzTarget(hash); if (!t) return;
    var list = t.classList && t.classList.contains("ilmb") ? [t] : t.querySelectorAll(".ilmb");
    Array.prototype.forEach.call(list, function (r) { if (r._tzOpen) r._tzOpen(); });
  }
  if (!window.__ilmbTzLinks) {
    window.__ilmbTzLinks = true;
    window.addEventListener("hashchange", function () { openFromHash(location.hash); });
    document.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a[href*='#']") : null;
      if (a && a.pathname === location.pathname) openFromHash(a.hash);
    }, true);
  }

  function addToggle(root, idx) {
    var inner = root.querySelector(".ilmb-in");
    if (!inner || root.querySelector(".ilmb-tz")) return;
    if ((root.getAttribute("data-collapsed") || "").toLowerCase() === "false") return;
    injectTzCss();
    var key = (root.className.match(/cst-[a-z-]+/) || ["b"])[0] + "|" + idx;
    var fixed = root.classList.contains("cmib-fx");

    var tz = el("div", "ilmb-tz"), tx = el("div", "ilmb-tz-tx");
    var th = el("h2"), tp = el("p");
    tx.appendChild(th); tx.appendChild(tp); tz.appendChild(tx);
    var btn = el("button", "ilmb-btn or"); btn.type = "button";
    if (!inner.id) inner.id = "ilmbtz-" + key.replace(/\W/g, "-");
    btn.setAttribute("aria-controls", inner.id);
    tz.appendChild(btn);
    root.insertBefore(tz, inner);

    function title() {
      for (var i = 0; i < inner.children.length; i++) if (inner.children[i].tagName === "H2") return inner.children[i].textContent;
      return "Build your qualification";
    }
    function label() {
      var t = title();
      return root.getAttribute("data-collapse-label") || (/^Build your /.test(t) ? t.replace(/^Build your /, "Build my ") : "Show options");
    }
    function setOpen(open, scroll) {
      TZ_OPEN[key] = open;
      root.classList.toggle("ilmb-closed", !open);
      tz.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        btn.className = "ilmb-btn ghost"; btn.textContent = "Hide builder";
        root.classList.add("ilmb-opening");
        setTimeout(function () { root.classList.remove("ilmb-opening"); }, 400);
      } else {
        btn.className = "ilmb-btn or"; btn.textContent = label();
        th.textContent = root.getAttribute("data-collapse-heading") || title();
        tp.textContent = root.getAttribute("data-collapse-text") || (fixed
          ? "Compare the levels side by side, then buy now or send your enquiry to our team."
          : "Pick the units that fit the work you already do, then buy now or send your picks to our team. Nothing is final until induction.");
      }
      if (scroll && root.scrollIntoView) root.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    btn.addEventListener("click", function () {
      var open = !TZ_OPEN[key];
      setOpen(open, true);
      if (open) try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "course_builder_open", builder_title: title() }); } catch (e) {}
    });
    root._tzOpen = function () { if (!TZ_OPEN[key]) setOpen(true, false); };
    var t = tzTarget(location.hash);
    setOpen(!!TZ_OPEN[key] || !!(t && (t === root || t.contains(root))), false);
  }

  function init() {
    try {
      injectPageCss();
      var roots = document.querySelectorAll(".cst-ilm-builder");
      if (!roots.length) return;
      injectCss();
      Array.prototype.forEach.call(roots, function (r, i) {
        if (r._ilmbMounted) { addAbout(r); return; }
        try { mount(r, i); if (r._ilmbMounted) { addToggle(r, i); addAbout(r); } } catch (e) { if (window.console) console.error("ILM builder:", e); }
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

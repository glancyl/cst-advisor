/* CST Training · Level 1 Health & Safety page · v5
   Loads level1-hub.css from the same folder, then runs the card checker and the route tabs.
   Works by position (1st question, 2nd button...) as well as by data attributes, so it still
   works if the WordPress editor strips attributes or wraps buttons in <p> tags. */
(function () {
  "use strict";
  if (window.__l1hub) return;
  window.__l1hub = true;

  var BOOK = "https://www.csttraining.co.uk/product/level-1-health-safety-construction-environment/";
  var HSA = "https://www.csttraining.co.uk/hsa-courses/";
  var NVQ = "https://www.csttraining.co.uk/nvqs/";

  /* ---------- Stylesheet ---------- */
  var me = document.currentScript;
  if (!me) {
    var all = document.querySelectorAll('script[src*="level1-hub.js"]');
    me = all[all.length - 1];
  }
  var src = me && me.src ? me.src : "https://glancyl.github.io/cst-advisor/level1-hub.js";
  var base = src.split("?")[0].replace(/[^/]+$/, "");
  var ver = src.indexOf("?") > -1 ? "?" + src.split("?")[1] : "";
  if (!document.querySelector('link[href*="level1-hub.css"]')) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = base + "level1-hub.css" + ver;
    document.head.appendChild(link);
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function btn(href, text, cls) {
    return '<a class="l1-btn ' + (cls || "l1-btn-orange") + '" href="' + href + '">' + text + "</a>";
  }

  /* ---------- Card checker ---------- */
  var KEYS = ["job", "how", "who"];
  var VALUES = { job: ["labour", "trade", "super"], how: ["online", "tutor"], who: ["me", "staff", "team"] };

  function result(a) {
    var team = a.who === "team";
    var teamLine = team
      ? "<p>Booking three or more? Ask us for a team quote and we'll get everyone booked in, each with their own login.</p>"
      : a.who === "staff"
      ? "<p>Booking for staff? Add each learner's name and email at checkout and their login goes straight to them.</p>"
      : "";
    var testLine = "<p>You'll also need a pass in the CITB HS&amp;E test (Operatives), taken in the last two years, before applying to CSCS.</p>";

    if (a.job === "trade") return {
      alt: true, h: "You need a different card",
      body: "<p>CSCS says the green Labourer card is for unskilled work only, and skilled workers holding one will be refused site access. Your route is the NVQ for your trade, which leads to a Blue Skilled Worker card.</p><p>Labouring while you train? The Level 1 covers you in the meantime.</p>",
      btns: btn(NVQ, "See construction NVQs") + btn("#contact", "Ask us about your route", "l1-btn-ghost")
    };
    if (a.job === "super") return {
      alt: true, h: "You need a supervisor or manager card",
      body: "<p>Supervisory and management roles usually need the Gold Supervisor or Black Manager card, through an NVQ and the right CITB test. The Level 1 is for labouring roles only.</p>",
      btns: btn("#contact", "Ask us about your route") + btn(NVQ, "See construction NVQs", "l1-btn-ghost")
    };
    if (!a.how || !a.who) return null;
    if (a.how === "tutor") return {
      alt: true, h: "The CITB HSA may suit you better",
      body: "<p>Prefer a day with a tutor? Our CITB Health and Safety Awareness course is the other route to the same green card. It lasts five years, so you'd retake it when you renew your card. The Level 1 doesn't expire.</p>" + testLine + teamLine,
      btns: btn(HSA, "See HSA dates") + btn(team ? "#contact" : BOOK, team ? "Request a team quote" : "Book the Level 1 instead", "l1-btn-ghost")
    };
    return {
      alt: false, h: "The Level 1 is the right course",
      body: "<p>With the CITB test, the Level 1 is what CSCS asks for on a first green Labourer card. It doesn't expire, so you won't need to retake it when you renew your card.</p>" + testLine + teamLine,
      btns: team ? btn("#contact", "Request a team quote") + btn(BOOK, "Or book online now", "l1-btn-ghost") : btn(BOOK, "Book Now £150 + VAT")
    };
  }

  function initChecker(root) {
    var answers = {};
    var qs = root.querySelectorAll(".l1-q");
    var out = root.querySelector(".l1-answer");

    function render() {
      var skip = answers.job === "trade" || answers.job === "super";
      each(qs, function (q, i) { if (i > 0) q.classList.toggle("l1-hidden", skip); });
      var r = result(answers);
      if (!r) {
        out.innerHTML = '<p class="l1-answer-wait">' + (answers.job ? "Nearly there, answer the next question" : "Your answer appears here") + "</p>";
        return;
      }
      out.innerHTML = '<div class="l1-result' + (r.alt ? " l1-alt" : "") + '"><h3>' + r.h + "</h3>" + r.body +
        '<div class="l1-result-btns">' + r.btns + '</div></div><button type="button" class="l1-reset">Start again</button>';
      if (window.dataLayer) window.dataLayer.push({ event: "l1_checker_result", l1_result: r.h });
    }

    document.addEventListener("click", function (e) {
      if (!e.target.closest || !root.contains(e.target)) return;
      var reset = e.target.closest(".l1-reset");
      if (reset) {
        answers = {};
        each(root.querySelectorAll(".l1-opts button"), function (b) { b.classList.remove("l1-on"); b.setAttribute("aria-pressed", "false"); });
        each(qs, function (q) { q.classList.remove("l1-done", "l1-hidden"); });
        e.preventDefault();
        e.stopPropagation();
        render();
        qs[0].scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      var b = e.target.closest(".l1-opts button");
      if (!b || !root.contains(b)) return;
      e.preventDefault();
      e.stopPropagation();
      var q = b.closest(".l1-q");
      var qi = Array.prototype.indexOf.call(qs, q);
      var key = q.getAttribute("data-q") || KEYS[qi];
      var group = q.querySelectorAll(".l1-opts button");
      var bi = Array.prototype.indexOf.call(group, b);
      each(group, function (x) { x.classList.remove("l1-on"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("l1-on");
      b.setAttribute("aria-pressed", "true");
      q.classList.add("l1-done");
      answers[key] = b.getAttribute("data-v") || (VALUES[key] || [])[bi];
      render();
    }, true);

    each(root.querySelectorAll(".l1-opts button"), function (b) { b.setAttribute("aria-pressed", "false"); b.type = "button"; });
  }

  /* ---------- Tabs ---------- */
  function initTabs(root) {
    var tabs = root.querySelectorAll(".l1-tablist button");
    var panels = root.querySelectorAll(".l1-panel");
    function show(i) {
      each(tabs, function (t, j) {
        t.classList.toggle("l1-on", i === j);
        t.setAttribute("aria-selected", i === j ? "true" : "false");
        t.tabIndex = i === j ? 0 : -1;
      });
      each(panels, function (p, j) {
        p.hidden = i !== j;
        p.style.setProperty("display", i === j ? "block" : "none", "important");
      });
    }
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest(".l1-tablist button") : null;
      if (!t || !root.contains(t)) return;
      e.preventDefault();
      e.stopPropagation();
      show(Array.prototype.indexOf.call(tabs, t));
    }, true);
    root.addEventListener("keydown", function (e) {
      var t = e.target.closest(".l1-tablist button");
      if (!t) return;
      var n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!n) return;
      var i = (Array.prototype.indexOf.call(tabs, t) + n + tabs.length) % tabs.length;
      tabs[i].focus();
      show(i);
    });
    each(tabs, function (t) { t.type = "button"; });
    show(0);
  }

  ready(function () {
    document.documentElement.classList.add("l1-js");
    each(document.querySelectorAll(".l1-checker"), initChecker);
    each(document.querySelectorAll(".l1-tabs"), initTabs);
  });
})();

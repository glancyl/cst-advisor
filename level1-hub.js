/* CST Training · Level 1 Health & Safety page · v1
   Hosted on GitHub Pages (cst-advisor repo). Loads level1-hub.css from the same folder,
   then wires up the route checker and the "Level 1 or HSA?" tabs.
   All page wording lives in the page HTML apart from the checker results below. */
(function () {
  "use strict";

  var BOOK = "https://www.csttraining.co.uk/product/level-1-health-safety-construction-environment/";
  var HSA = "https://www.csttraining.co.uk/hsa-courses/";
  var NVQ = "https://www.csttraining.co.uk/nvqs/";

  /* ---------- CSS (BoldGrid strips <style>, so it loads from here) ---------- */
  var me = document.currentScript;
  var base = me && me.src ? me.src.split("?")[0].replace(/[^/]+$/, "") : "https://glancyl.github.io/cst-advisor/";
  var ver = me && me.src && me.src.indexOf("?") > -1 ? "?" + me.src.split("?")[1] : "";
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = base + "level1-hub.css" + ver;
  document.head.appendChild(link);

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function btn(href, text, cls) {
    return '<a class="btn btn-rounded ' + (cls || "btn-color-1") + '" href="' + href + '">' + text + "</a>";
  }

  /* ---------- Route checker ---------- */
  function result(a) {
    var team = a.who === "team";
    var teamLine = team
      ? "<p>Booking three or more? Ask us for a team quote and we'll get everyone booked in, each with their own login.</p>"
      : a.who === "staff"
      ? "<p>Booking for staff? Add each learner's name and email at checkout and their login goes straight to them.</p>"
      : "";
    var testLine = "<p>You'll also need a pass in the CITB Health, Safety and Environment test (Operatives), taken in the last two years, before applying to CSCS.</p>";

    if (a.job === "trade") {
      return {
        alt: true,
        h: "You need a different card",
        body: "<p>CSCS says the green Labourer card is for unskilled work only, and skilled workers holding one will be refused site access. Your route is the NVQ for your trade, which leads to a Blue Skilled Worker card.</p><p>If you're labouring while you train, the Level 1 covers you in the meantime.</p>",
        btns: btn(NVQ, "See construction NVQs") + btn("#contact", "Ask us about your route", "btn-color-2")
      };
    }
    if (a.job === "super") {
      return {
        alt: true,
        h: "Supervisors and managers need a different card",
        body: "<p>Supervisory and management roles usually need the Gold Supervisor or Black Manager card, through an NVQ and the right CITB test. The Level 1 is for labouring roles only.</p><p>Get in touch and we'll set out the right route for you.</p>",
        btns: btn("#contact", "Ask us about your route") + btn(NVQ, "See construction NVQs", "btn-color-2")
      };
    }
    if (!a.how || !a.who) return null;

    if (a.how === "tutor") {
      return {
        alt: true,
        h: "The CITB HSA may suit you better",
        body: "<p>If you'd rather spend a day with a tutor, our CITB Health and Safety Awareness course is the other route to the same green card. It counts for five years and can only be used once.</p><p>The Level 1 starts today and counts for life, so you'll never need to repeat it.</p>" + testLine + teamLine,
        btns: btn(HSA, "See HSA dates") + btn(team ? "#contact" : BOOK, team ? "Request a team quote" : "Book the Level 1 instead", "btn-color-2")
      };
    }
    return {
      alt: false,
      h: "The Level 1 is the right course",
      body: "<p>The Level 1 Award, together with the CITB test, is what CSCS asks for on a first green Labourer card. It counts for life, so you won't need to retake it when the card is renewed.</p>" + testLine + teamLine,
      btns: team
        ? btn("#contact", "Request a team quote") + btn(BOOK, "Or book online now", "btn-color-2")
        : btn(BOOK, "Book Now £150 + VAT")
    };
  }

  function initChecker(root) {
    var answers = {};
    var out = root.querySelector("[data-l1-answer]");
    var qHow = root.querySelector('[data-q="how"]');
    var qWho = root.querySelector('[data-q="who"]');

    root.querySelectorAll(".l1-opts button").forEach(function (b) {
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () {
        var q = b.closest("[data-q]");
        var key = q.getAttribute("data-q");
        q.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        answers[key] = b.getAttribute("data-v");

        var labouring = answers.job === "labour";
        [qHow, qWho].forEach(function (el) { if (el) el.classList.toggle("l1-hidden", answers.job && !labouring); });

        var r = result(answers);
        if (!r) {
          out.innerHTML = '<p class="l1-answer-wait">Answer the remaining questions to see your result.</p>';
          return;
        }
        out.innerHTML = '<div class="l1-result' + (r.alt ? " l1-result-alt" : "") + '"><h3>' + r.h + "</h3>" + r.body + '<div class="l1-result-btns">' + r.btns + "</div></div>";
        if (window.dataLayer) window.dataLayer.push({ event: "l1_checker_result", l1_result: r.h, l1_job: answers.job, l1_how: answers.how || "", l1_who: answers.who || "" });
      });
    });
  }

  /* ---------- Tabs ---------- */
  function initTabs(root) {
    var tabs = root.querySelectorAll("[data-tab]");
    var panels = root.querySelectorAll("[data-panel]");
    function show(key) {
      tabs.forEach(function (t) {
        var on = t.getAttribute("data-tab") === key;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== key; });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { show(t.getAttribute("data-tab")); });
      t.addEventListener("keydown", function (e) {
        var n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!n) return;
        var next = tabs[(i + n + tabs.length) % tabs.length];
        next.focus();
        show(next.getAttribute("data-tab"));
      });
    });
    show(tabs[0].getAttribute("data-tab"));
  }

  ready(function () {
    document.documentElement.classList.add("l1-js");
    document.querySelectorAll("[data-l1-checker]").forEach(initChecker);
    document.querySelectorAll("[data-l1-tabs]").forEach(initTabs);
  });
})();

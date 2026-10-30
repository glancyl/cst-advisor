/*!
 * CST Training About Us page (v7)
 * Styling lives in a WPCode CSS snippet (about.css), so the page looks right even if this file never loads.
 * This file only adds interactions: story tabs, team filter and search, venue map, photo lightbox,
 * timeline progress line, initials for staff without photos.
 * All clicks use event delegation on the document, so they keep working even if another script
 * rewrites document.body.innerHTML.
 */
(function () {
  "use strict";
  var DONE = 'cab-ready';
  function q(s, c) { return (c || document).querySelector(s); }
  function qa(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function txt(n) { return n ? (n.textContent || '').trim() : ''; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function initials(name) { var p = name.split(/\s+/); return ((p[0] || '?')[0] + (p[1] ? p[1][0] : '')).toUpperCase(); }
  function safe(fn) { try { fn(); } catch (e) { if (window.console) console.error('[cst-about]', e); } }

  /* ---------- one-time markup enhancements (persist in the HTML) ---------- */
  function build(root) {
    safe(function () { // hero rising lines
      var hero = q('.cab-hero', root); if (!hero) return;
      for (var r = 0; r < 9; r++) { var s = el('span', 'cab-rise'); s.style.cssText = 'left:' + (6 + r * 11) + '%;animation-duration:' + (9 + (r * 7) % 9) + 's;animation-delay:-' + (r * 1.7) + 's'; hero.insertBefore(s, hero.firstChild); }
    });
    safe(function () { // story tabs
      var panels = qa('.cab-panel', root), host = q('.cab-panels', root); if (!panels.length || !host) return;
      var tabs = el('div', 'cab-tabs'); tabs.setAttribute('role', 'tablist');
      panels.forEach(function (p, i) {
        p.id = 'cab-p' + i; p.setAttribute('role', 'tabpanel');
        if (p.getAttribute('data-big')) p.insertBefore(el('span', 'cab-big', esc(p.getAttribute('data-big'))), p.firstChild);
        var b = el('button', 'cab-tab', '<i>0' + (i + 1) + '</i>' + esc(p.getAttribute('data-tab') || txt(q('h3', p))));
        b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('data-i', i); b.setAttribute('aria-controls', p.id);
        b.setAttribute('aria-selected', i === 0); p.hidden = i !== 0; if (i === 0) p.classList.add('cab-show');
        tabs.appendChild(b);
      });
      host.parentNode.insertBefore(tabs, host);
    });
    safe(function () { // team: avatars, chips, search
      var depts = qa('.cab-dept', root); if (!depts.length) return;
      qa('.cab-p', root).forEach(function (c) {
        var img = q('img', c), av = el('div', 'cab-av'), ini = el('div', 'cab-in', esc(initials(txt(q('.cab-n', c)))));
        ini.setAttribute('aria-hidden', 'true'); av.appendChild(ini);
        if (img) { var wrap = img.parentNode; av.insertBefore(img, ini); if (wrap !== c && wrap.tagName === 'P' && !wrap.textContent.trim() && !wrap.children.length) wrap.parentNode.removeChild(wrap); }
        else av.classList.add('cab-noimg');
        c.insertBefore(av, c.firstChild);
      });
      var top = q('.cab-team-top', root);
      top.appendChild(el('label', 'cab-search', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input type="search" placeholder="Search by name or role" aria-label="Search the team">'));
      var chips = el('div', 'cab-chips'); chips.setAttribute('role', 'group'); chips.setAttribute('aria-label', 'Choose a team');
      depts.forEach(function (d, i) {
        d.setAttribute('data-i', i); if (i === 0) d.classList.add('cab-active');
        var b = el('button', 'cab-chip', esc(d.getAttribute('data-label') || 'Team') + '<small>' + qa('.cab-p', d).length + '</small>');
        b.type = 'button'; b.setAttribute('data-i', i); b.setAttribute('aria-pressed', i === 0); chips.appendChild(b);
      });
      top.parentNode.insertBefore(chips, top.nextSibling);
      var res = el('div', 'cab-results'); res.hidden = true; res.setAttribute('aria-live', 'polite');
      depts[depts.length - 1].parentNode.insertBefore(res, depts[depts.length - 1].nextSibling);
    });
    safe(function () { // gallery captions + lightbox shell
      qa('.cab-gi', root).forEach(function (a, i) { var im = q('img', a); a.setAttribute('data-i', i); a.appendChild(el('span', '', esc(im ? im.alt : ''))); });
      if (qa('.cab-gi', root).length) {
        var lb = el('div', 'cab-lb', '<button type="button" class="cab-lb-x" aria-label="Close">×</button><button type="button" class="cab-lb-p" aria-label="Previous">‹</button><img alt=""><button type="button" class="cab-lb-n" aria-label="Next">›</button><p></p>');
        lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); root.appendChild(lb);
      }
    });
    safe(function () { // venue map
      var vs = qa('.cab-v', root), ven = q('.cab-ven', root); if (!vs.length || !ven) return;
      vs.forEach(function (v, i) { v.setAttribute('role', 'button'); v.tabIndex = 0; v.setAttribute('data-i', i); v.setAttribute('aria-pressed', i === 0); });
      ven.appendChild(el('div', 'cab-map', '<iframe loading="lazy" title="Venue map" referrerpolicy="no-referrer-when-downgrade" src="' + mapUrl(vs[0]) + '"></iframe><span class="cab-map-tag">' + esc(vName(vs[0])) + '</span>'));
    });
    root.classList.add(DONE);
  }
  function mapUrl(v) { return 'https://maps.google.com/maps?q=' + encodeURIComponent(v.getAttribute('data-addr') || txt(q('.cab-va', v))) + '&t=m&z=15&output=embed'; }
  function vName(v) { var n = q('.cab-vn', v); if (!n) return ''; var c = n.cloneNode(true); qa('.cab-tag-hq', c).forEach(function (t) { t.remove(); }); return txt(c); }

  /* ---------- behaviour (delegated, survives DOM rewrites) ---------- */
  function root() { return document.getElementById('cst-about'); }
  function selectTab(r, i) {
    qa('.cab-tab', r).forEach(function (b, j) { b.setAttribute('aria-selected', i === j); b.tabIndex = i === j ? 0 : -1; });
    qa('.cab-panel', r).forEach(function (p, j) { p.hidden = i !== j; p.classList.toggle('cab-show', i === j); });
  }
  function showDept(r, i) {
    var res = q('.cab-results', r); if (res) { res.hidden = true; res.innerHTML = ''; }
    var input = q('.cab-search input', r); if (input) input.value = '';
    qa('.cab-dept', r).forEach(function (d, j) { d.classList.toggle('cab-active', i === j); if (i === j) stagger(d); });
    qa('.cab-chip', r).forEach(function (b, j) { b.setAttribute('aria-pressed', i === j); });
  }
  function stagger(scope) { qa('.cab-p', scope).forEach(function (c, i) { c.style.setProperty('--i', Math.min(i, 30)); c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; }); }
  function search(r, val) {
    var qv = val.trim().toLowerCase(), res = q('.cab-results', r);
    if (!qv) { var on = q('.cab-chip[aria-pressed="true"]', r); var idx = 0; qa('.cab-chip', r).forEach(function (b, j) { if (b.getAttribute('data-last') === '1') idx = j; }); showDept(r, on ? +on.getAttribute('data-i') : idx); return; }
    qa('.cab-chip', r).forEach(function (b) { if (b.getAttribute('aria-pressed') === 'true') b.setAttribute('data-last', '1'); else b.removeAttribute('data-last'); b.setAttribute('aria-pressed', 'false'); });
    qa('.cab-dept', r).forEach(function (d) { d.classList.remove('cab-active'); });
    var seen = {}, grid = el('div', 'cab-people');
    qa('.cab-dept .cab-p', r).forEach(function (c) {
      var key = txt(q('.cab-n', c)) + '|' + txt(q('.cab-r', c));
      if (seen[key] || key.toLowerCase().indexOf(qv) < 0) return; seen[key] = 1; grid.appendChild(c.cloneNode(true));
    });
    res.innerHTML = ''; res.appendChild(grid.children.length ? grid : el('p', 'cab-empty', 'No one matches “' + esc(qv) + '”. Try a first name or a role such as tutor.'));
    res.hidden = false; stagger(res);
  }
  function pickVenue(r, i) {
    var vs = qa('.cab-v', r), v = vs[i]; if (!v) return;
    var f = q('.cab-map iframe', r), t = q('.cab-map-tag', r);
    if (f) f.src = mapUrl(v); if (t) t.textContent = vName(v);
    vs.forEach(function (x, j) { x.setAttribute('aria-pressed', i === j); });
  }
  var gi = 0, lastFocus = null;
  function openLb(r, i) {
    var items = qa('.cab-gi', r), lb = q('.cab-lb', r); if (!items.length || !lb) return;
    gi = (i + items.length) % items.length; var a = items[gi], im = q('img', a);
    q('img', lb).src = a.getAttribute('href') || (im && im.src); q('img', lb).alt = im ? im.alt : ''; q('p', lb).textContent = im ? im.alt : '';
    if (!lb.classList.contains('cab-open')) { lastFocus = document.activeElement; lb.classList.add('cab-open'); q('.cab-lb-x', lb).focus(); }
  }
  function closeLb(r) { var lb = q('.cab-lb', r); if (lb) lb.classList.remove('cab-open'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }

  document.addEventListener('click', function (e) {
    var r = root(); if (!r || !e.target.closest) return;
    var t;
    if ((t = e.target.closest('#cst-about .cab-tab'))) { selectTab(r, +t.getAttribute('data-i')); return; }
    if ((t = e.target.closest('#cst-about .cab-chip'))) { showDept(r, +t.getAttribute('data-i')); return; }
    if ((t = e.target.closest('#cst-about .cab-v'))) { pickVenue(r, +t.getAttribute('data-i')); return; }
    if ((t = e.target.closest('#cst-about .cab-gi'))) { e.preventDefault(); openLb(r, +t.getAttribute('data-i')); return; }
    if (e.target.closest('#cst-about .cab-lb-x')) { closeLb(r); return; }
    if (e.target.closest('#cst-about .cab-lb-p')) { openLb(r, gi - 1); return; }
    if (e.target.closest('#cst-about .cab-lb-n')) { openLb(r, gi + 1); return; }
    if (e.target.classList && e.target.classList.contains('cab-lb')) { closeLb(r); return; }
    if ((t = e.target.closest('#cst-about a[href^="#cab-"]'))) {
      var dest = document.getElementById(t.getAttribute('href').slice(1));
      if (dest) { e.preventDefault(); dest.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
  });
  document.addEventListener('input', function (e) { var r = root(); if (r && e.target.closest && e.target.closest('#cst-about .cab-search')) search(r, e.target.value); });
  document.addEventListener('keydown', function (e) {
    var r = root(); if (!r) return;
    var lb = q('.cab-lb.cab-open', r);
    if (lb) { if (e.key === 'Escape') closeLb(r); else if (e.key === 'ArrowLeft') openLb(r, gi - 1); else if (e.key === 'ArrowRight') openLb(r, gi + 1); return; }
    var t = e.target.closest && e.target.closest('#cst-about .cab-tab');
    if (t) { var k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (k) { e.preventDefault(); var n = qa('.cab-tab', r).length, i = (+t.getAttribute('data-i') + k + n) % n; selectTab(r, i); qa('.cab-tab', r)[i].focus(); } }
    var v = e.target.closest && e.target.closest('#cst-about .cab-v');
    if (v && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pickVenue(r, +v.getAttribute('data-i')); }
  });
  window.addEventListener('scroll', function () {
    var r = root(), tl = r && q('.cab-tl', r); if (!tl) return;
    var b = tl.getBoundingClientRect();
    tl.style.setProperty('--fill', Math.max(0, Math.min(1, (window.innerHeight * 0.6 - b.top) / b.height)) * 100 + '%');
  }, { passive: true });

  function start() { var r = root(); if (r && !r.classList.contains(DONE)) build(r); }
  // Run after every DOMContentLoaded handler (a sitewide snippet rewrites body.innerHTML then), and again on load as a backstop.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(start, 0); }); else setTimeout(start, 0);
  window.addEventListener('load', function () { setTimeout(start, 0); });
})();

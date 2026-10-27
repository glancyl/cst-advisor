/* CST Training · Health & Safety Consultancy page · hosted at https://glancyl.github.io/cst-advisor/
   Loaded on the page with: <script src="https://glancyl.github.io/cst-advisor/hs-consultancy.js?v=N" defer></script>
   Uses cp-hub.css (shared with the hub) plus cp-consult.css (consultancy pages only). Bump ?v=N on the page after every JS edit,
   and CSS_VERSION below after every CSS edit. */
(function () {
  if (document.getElementById("cp-hub-css")) return;
  var CSS_VERSION = 17;
  if (!document.querySelector('link[href*="family=Alata"]')) {
    var f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Alata&family=Asap:wght@400;600;700&display=swap";
    document.head.appendChild(f);
  }
  var l = document.createElement("link");
  l.id = "cp-hub-css"; l.rel = "stylesheet";
  l.href = "https://glancyl.github.io/cst-advisor/cp-hub.css?v=" + CSS_VERSION + "&t=" + Math.floor(Date.now() / 600000);
  document.head.appendChild(l);
  var c = document.createElement("link");
  c.id = "cp-consult-css"; c.rel = "stylesheet";
  c.href = "https://glancyl.github.io/cst-advisor/cp-consult.css?v=" + CSS_VERSION + "&t=" + Math.floor(Date.now() / 600000);
  document.head.appendChild(c);
})();

(function(){
  'use strict';
  var root = document.getElementById('cp-hub');
  if(!root) return;

  /* ===================== CONFIG ===================== */
  var CONFIG = {
    hubspot: { portalId: '19996504', formId: 'a81a7d9c-e2dd-41fe-8956-d06c40e11808', region: 'na1' },
    interestField: 'service_interest',
    interestDefault: 'H&S consultancy',
    messageField: 'message',
    phone: '020 3488 4472', tel: 'tel:02034884472'
  };

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function push(ev){ try{ window.dataLayer = window.dataLayer || []; window.dataLayer.push(ev); }catch(e){} }
  function closest(el, sel){ return el && el.closest ? el.closest(sel) : null; }

  /* ===================== undo WordPress auto-formatting ===================== */
  Array.prototype.slice.call(root.querySelectorAll('br')).forEach(function(b){ b.parentNode.removeChild(b); });
  Array.prototype.slice.call(root.querySelectorAll('p')).forEach(function(p){
    if(p.className || p.id) return;
    var ownText = Array.prototype.some.call(p.childNodes, function(n){ return n.nodeType === 3 && n.textContent.trim() !== ''; });
    if(ownText) return;
    while(p.firstChild) p.parentNode.insertBefore(p.firstChild, p);
    p.parentNode.removeChild(p);
  });

  /* ===================== tidy-ups after WordPress formatting =====================
     1. The JSON-LD above the page gets wrapped in an empty <p>, which shows as a white
        strip under the header. Remove that wrapper.
     2. The editor splits answers that contain a link across several lines, so the
        affected FAQ answers are rewritten here in one clean paragraph. */
  (function(){
    var prev = root.previousSibling;
    while(prev){
      var before = prev.previousSibling;
      if(prev.nodeType === 1 && prev.tagName === 'P' && Array.prototype.every.call(prev.childNodes, function(n){ return (n.nodeType === 1 && (n.tagName === 'SCRIPT' || n.tagName === 'BR')) || (n.nodeType === 3 && n.textContent.trim() === ''); })){
        while(prev.firstChild) prev.parentNode.insertBefore(prev.firstChild, prev);
        prev.parentNode.removeChild(prev);
      } else if(prev.nodeType === 1 && prev.tagName === 'BR'){
        prev.parentNode.removeChild(prev);
      } else if(prev.nodeType === 1 && prev.tagName !== 'SCRIPT'){
        break;
      }
      prev = before;
    }
    var FAQ_FIX = {
      'Can you act as our competent person?': 'Yes, through <a href="/compliance-partner/" data-cp-xlink="compliance-partner">Compliance Partner</a>. A named consultant acts as your competent H&amp;S assistance under Regulation 7 of the Management of Health and Safety at Work Regulations 1999, alongside managed training records, from £20 per operative a month. You remain the duty holder.'
    };
    Array.prototype.forEach.call(root.querySelectorAll('.cp-faq details'), function(d){
      var s = d.querySelector('summary'), a = d.querySelector('.a');
      var fix = s && FAQ_FIX[s.textContent.trim()];
      if(fix && a) a.innerHTML = fix;
    });
  })();

  /* ===================== close any gap between the site header and the hero =====================
     Whatever the theme or editor puts above the page content, measure the space between the
     bottom of the site header and the top of our hero and pull the page up by exactly that much. */
  (function(){
    function closeGap(){
      var header = document.querySelector('header.site-header, #masthead, .site-header, header');
      if(!header || header.contains(root)) return;
      var pos = getComputedStyle(header).position;
      if(pos === 'fixed' || pos === 'sticky') return;
      root.style.marginTop = '';
      var gap = Math.round(root.getBoundingClientRect().top - header.getBoundingClientRect().bottom);
      if(gap > 0 && gap < 120) root.style.marginTop = (-gap) + 'px';
    }
    closeGap();
    window.addEventListener('load', closeGap);
    window.addEventListener('resize', closeGap);
  })();

  /* ===================== extra calls to action ===================== */
  (function(){
    function el(html){ var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
    function after(node, html){ if(node && node.parentNode) node.parentNode.insertBefore(el(html), node.nextSibling); }
    var quote = '<a class="cp-btn primary" href="#cp-h-enquire">Request a quote</a>';
    var call = function(cls){ return '<a class="cp-btn '+cls+'" href="'+CONFIG.tel+'">Call '+CONFIG.phone+'</a>'; };
    after(root.querySelector('#cp-h-options .cp-opts'), '<div class="cp-btns cp-center">'+quote+call('ghost')+'</div>');
    after(root.querySelector('#cp-h-training .cp-courselinks'), '<div class="cp-band"><div><h3>Training and consultancy from one provider</h3><p>Book the courses your policy calls for with the same team that writes it, at our venues, online or on your premises.</p></div><div class="cp-btns">'+call('ghost')+quote+'</div></div>');
    after(root.querySelector('#cp-h-faq .cp-faq'), '<div class="cp-band light"><div><h3>Still got a question?</h3><p>Talk it through with our team, or send us a message and we’ll come back to you.</p></div><div class="cp-btns">'+call('navy')+'<a class="cp-btn primary" href="#cp-h-enquire">Send us a message</a></div></div>');
  })();

  /* ===================== which service finder ===================== */
  function hsFind(){
    var sizeEl = document.getElementById('cp-hs-size'), whyEl = document.getElementById('cp-hs-why'), out = document.getElementById('cp-hs-reco');
    if(!sizeEl || !whyEl || !out) return;
    var z = sizeEl.value, w = whyEl.value;
    if(!w){ out.innerHTML = ''; out.classList.remove('show'); return; }
    var map = {
      policy:['Standard procedures, tailored', '£1,495 + VAT, including two consultant days', (z==='lt5' ? 'With fewer than five employees a written policy isn’t a legal requirement, but a client or PQQ will still ask for one. ' : 'With five or more employees a written policy is required by section 2(3) of the Health and Safety at Work etc. Act 1974. ')+'We review how your business works and write the policy and procedures to fit, then walk your managers through them.', '#cp-h-tailored','How it works'],
      docs:['Template document pack', '£200 + VAT', 'You know what you’re doing, so you need one consistent set of documents to do it with. The pack gives you the templates to complete and own. Many clients start here and add consultancy later.', '#cp-h-pack','See what’s in the pack'],
      competent:['Compliance Partner', 'From £20 per operative a month', 'Regulation 7 of the Management Regulations requires every employer to appoint competent assistance. On Compliance Partner a named CST Training consultant acts as your competent person, which gives you a name for the PQQ, alongside managed training records. You remain the duty holder.', '/compliance-partner/#cp-s-levels','See the three levels'],
      records:['Compliance Partner', 'From £6 per operative a month', 'Expiring cards and certificates are a records problem, not a consultancy problem. Compliance Partner keeps every operative’s record live, alerts at 90, 60 and 30 days, and books the training once you approve. The upper levels add a retained H&S consultant on the same monthly fee.', '/compliance-partner/#cp-s-levels','See the three levels'],
      inspect:['Site safety inspection', '£395 + VAT per site', 'A walk-round of a live site against your own arrangements, with a clear, prioritised written report. For a full check of your policy, arrangements and records, the H&S management system audit is £995 + VAT.', '#cp-h-consultancy','What it includes'],
      incident:['Accident investigation', '£650 + VAT a day, pro rata', 'We support your investigation and help you prepare a RIDDOR report where one is needed. Making the report remains your duty. Most investigations take one to two days.', '#cp-h-enquire','Talk to us'],
      tw:['Temporary works consultancy', 'From £200 + VAT', 'Temporary works has its own page: a document pack, a generic or bespoke procedure, site audits and an advisory line for your TWCs and TWSs.', '/temporary-works-consultancy/','Go to temporary works']
    };
    var m = map[w]; if(!m) return;
    var xl = m[3].charAt(0) === '/' ? ' data-cp-xlink="'+(m[3].indexOf('temporary') > -1 ? 'temporary-works-consultancy' : 'compliance-partner')+'"' : '';
    out.innerHTML = '<span class="cp-chip">Recommended</span><h3>'+esc(m[0])+'</h3><div class="cp-reco-price">'+esc(m[1])+'</div><p>'+esc(m[2])+'</p>'
      + '<div class="cp-btns"><a class="cp-btn navy" href="'+m[3]+'"'+xl+'>'+esc(m[4])+'</a><a class="cp-btn outline" href="#cp-h-enquire" data-cp-msg="'+esc('Finder recommendation: '+m[0]+'.')+'">Talk to us</a></div>';
    out.classList.add('show');
    push({event:'cp_finder', cp_page:'hs', cp_recommendation:m[0]});
  }

  /* All listeners sit on the document, so NitroPack re-inserting the content can't drop them */
  document.addEventListener('change', function(e){
    var t = e.target; if(t && (t.id === 'cp-hs-size' || t.id === 'cp-hs-why')) hsFind();
  }, true);

  document.addEventListener('click', function(e){
    /* law tabs */
    var b = closest(e.target, '[data-cp-tab]');
    if(b){
      var law = closest(b, '.cp-law'); if(!law) return;
      Array.prototype.forEach.call(law.querySelectorAll('[data-cp-tab]'), function(x){ x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
      Array.prototype.forEach.call(law.querySelectorAll('[data-cp-pane]'), function(p){ p.classList.toggle('on', p.getAttribute('data-cp-pane') === b.getAttribute('data-cp-tab')); });
      return;
    }
    /* cross-links to the hub and temporary works page */
    var x = closest(e.target, 'a[data-cp-xlink]');
    if(x) push({event:'cp_crosslink', cp_from:'health-and-safety-consultancy', cp_destination:x.getAttribute('data-cp-xlink')});
    /* buttons that prefill the form message */
    var a = closest(e.target, 'a[data-cp-msg]');
    if(a){ pendingMsg = a.getAttribute('data-cp-msg'); if(hsForm){ setField(hsForm, CONFIG.interestField, CONFIG.interestDefault); setField(hsForm, CONFIG.messageField, pendingMsg, true); } }
  });

  /* ===================== subnav highlight ===================== */
  var links = root.querySelectorAll('.cp-subnav a');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        Array.prototype.forEach.call(document.querySelectorAll('#cp-hub .cp-subnav a'), function(a){ a.classList.toggle('on', a.getAttribute('href') === '#'+en.target.id); });
      });
    }, {rootMargin:'-30% 0px -60% 0px'});
    Array.prototype.forEach.call(links, function(a){ var s = document.getElementById(a.getAttribute('href').slice(1)); if(s) io.observe(s); });
  }

  /* ===================== HubSpot form ===================== */
  var hsForm = null, pendingMsg = '';
  function setField(form, name, value, onlyIfEmpty){
    var el = form && form.querySelector('[name="'+name+'"]'); if(!el || !value) return;
    if(onlyIfEmpty && el.value) return;
    var proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
    el.dispatchEvent(new Event('input', {bubbles:true}));
    el.dispatchEvent(new Event('change', {bubbles:true}));
  }
  if(CONFIG.hubspot.portalId && CONFIG.hubspot.formId){
    var s = document.createElement('script');
    s.src = 'https://js' + (CONFIG.hubspot.region === 'eu1' ? '-eu1' : '') + '.hsforms.net/forms/embed/v2.js';
    s.async = true;
    s.onload = function(){
      if(!window.hbspt) return;
      window.hbspt.forms.create({
        region: CONFIG.hubspot.region, portalId: CONFIG.hubspot.portalId, formId: CONFIG.hubspot.formId,
        target: '#cp-hs-form',
        onFormReady: function($f){
          hsForm = ($f && $f[0]) ? $f[0] : ($f && $f.querySelector ? $f : document.querySelector('#cp-hs-form form'));
          setField(hsForm, CONFIG.interestField, CONFIG.interestDefault);
          setField(hsForm, CONFIG.messageField, pendingMsg, true);
        },
        onFormSubmitted: function(){
          var v = '';
          try{ var el = hsForm && hsForm.querySelector('[name="'+CONFIG.interestField+'"]'); v = el ? el.value : ''; }catch(e){}
          push({event:'cp_form_submit', cp_page:'hs', cp_service_interest: v || CONFIG.interestDefault});
        }
      });
    };
    document.head.appendChild(s);
  }

  try{ console.info('CST Training H&S consultancy page script v4 loaded'); }catch(e){}
})();

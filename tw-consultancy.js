/* CST Training · Temporary Works Consultancy page · hosted at https://glancyl.github.io/cst-advisor/
   Loaded on the page with: <script src="https://glancyl.github.io/cst-advisor/tw-consultancy.js?v=N" defer></script>
   Uses cp-hub.css (shared with the hub) plus cp-consult.css (consultancy pages only).
   Bump ?v=N on the page after every JS edit, and CSS_VERSION below after every CSS edit.

   BEFORE THE SHOP GOES LIVE: put the WooCommerce product IDs into CONFIG.products below.
   While an ID is 0, its Buy button sends the visitor to the enquiry form instead, with
   the product named in the message, so nothing breaks while the products are drafts. */
(function () {
  if (document.getElementById("cp-hub-css")) return;
  var CSS_VERSION = 15;
  if (!document.querySelector('link[href*="family=Alata"]')) {
    var f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Alata&family=Asap:wght@400;600;700&display=swap";
    document.head.appendChild(f);
  }
  ["cp-hub", "cp-consult"].forEach(function (name) {
    var l = document.createElement("link");
    l.id = name + "-css"; l.rel = "stylesheet";
    l.href = "https://glancyl.github.io/cst-advisor/" + name + ".css?v=" + CSS_VERSION;
    document.head.appendChild(l);
  });
})();

(function(){
  'use strict';
  var root = document.getElementById('cp-hub');
  if(!root) return;

  /* ===================== CONFIG ===================== */
  var CONFIG = {
    hubspot: { portalId: '19996504', formId: 'a81a7d9c-e2dd-41fe-8956-d06c40e11808', region: 'na1' },
    interestField: 'service_interest',
    interestDefault: 'Temporary works',
    messageField: 'message',
    phone: '020 3488 4472', tel: 'tel:02034884472',
    basketUrl: '/basket/',            /* the WooCommerce basket page */
    products: {
      proc: 0,                        /* Generic Temporary Works Procedure, £599 */
      pack: 0,                        /* Temporary Works Document Pack (all 11), £200 */
      templates: [0,0,0,0,0,0,0,0,0,0,0]   /* TW-01 to TW-11, £25 each, in order */
    }
  };

  var PACK = [
    ['TW-01','Duty Holders List','Who the Designated Individual, TWC, TWSs, designers and checkers are, and for which sites.'],
    ['TW-02','TW Appointment Record','The company record of each temporary works appointment and its scope.'],
    ['TW-03','TW Appointment Letter','The letter the Designated Individual issues to appoint a TWC or TWS in writing.'],
    ['TW-04','TW Pre-Qualification Questions','What to ask a subcontractor before they design or build temporary works.'],
    ['TW-05','TW Design Brief','Loads, ground, geometry and constraints handed to the designer.'],
    ['TW-06','TW Design Certification','The designer and checker sign-off, with the check category recorded.'],
    ['TW-07','TW Design Change Request','Change control for anything that moves after the design is certified.'],
    ['TW-08','TW Register','The live register of every temporary works item on a site, by status.'],
    ['TW-09','TW Inspection & Test Plan','What gets inspected, by whom, at which hold points.'],
    ['TW-10','TW Inspection Report','The record of each inspection and whether the item is fit to load.'],
    ['TW-11','TW Permit','Permit to load and permit to strike or dismantle, signed by the TWC.']
  ];

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function push(ev){ try{ window.dataLayer = window.dataLayer || []; window.dataLayer.push(ev); }catch(e){} }
  function closest(el, sel){ return el && el.closest ? el.closest(sel) : null; }
  function $(id){ return document.getElementById(id); }

  /* ===================== undo WordPress auto-formatting ===================== */
  Array.prototype.slice.call(root.querySelectorAll('br')).forEach(function(b){ b.parentNode.removeChild(b); });
  Array.prototype.slice.call(root.querySelectorAll('p')).forEach(function(p){
    if(p.className || p.id) return;
    var ownText = Array.prototype.some.call(p.childNodes, function(n){ return n.nodeType === 3 && n.textContent.trim() !== ''; });
    if(ownText) return;
    while(p.firstChild) p.parentNode.insertBefore(p.firstChild, p);
    p.parentNode.removeChild(p);
  });
  /* the JSON-LD above the page gets wrapped in an empty <p>, which shows as a white strip */
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
  })();

  /* ===================== extra calls to action ===================== */
  (function(){
    function el(html){ var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
    function after(node, html){ if(node && node.parentNode) node.parentNode.insertBefore(el(html), node.nextSibling); }
    var call = function(cls){ return '<a class="cp-btn '+cls+'" href="'+CONFIG.tel+'">Call '+CONFIG.phone+'</a>'; };
    after(root.querySelector('#cp-t-bespoke .cp-days'), '<div class="cp-btns cp-center"><a class="cp-btn navy" href="#cp-t-enquire" data-cp-msg="I’d like to book a call about the Bespoke Temporary Works Package.">Book a call about the package</a>'+call('ghostnavy')+'</div>');
    after(root.querySelector('#cp-t-faq .cp-faq'), '<div class="cp-band light"><div><h3>Still got a question?</h3><p>Talk it through with our temporary works team, or send us a message and we’ll come back to you.</p></div><div class="cp-btns">'+call('navy')+'<a class="cp-btn primary" href="#cp-t-enquire">Send us a message</a></div></div>');
  })();

  /* ===================== buying through WooCommerce ===================== */
  var pendingMsg = '', hsForm = null;
  function toForm(msg){
    pendingMsg = msg;
    if(hsForm){ setField(hsForm, CONFIG.interestField, CONFIG.interestDefault); setField(hsForm, CONFIG.messageField, msg, true); }
  }
  function addToBasket(ids, names, btn){
    if(!ids.length || ids.some(function(id){ return !id; })){
      /* products not set up yet: route to the enquiry form with the order in the message */
      toForm('I’d like to buy: '+names.join(', ')+'.');
      return false;
    }
    push({event:'cp_add_to_basket', cp_page:'tw', cp_items:names.join(' | ')});
    if(btn){ btn.setAttribute('aria-busy','true'); btn.textContent = 'Adding to basket…'; }
    var i = 0;
    function next(){
      if(i >= ids.length){ window.location.href = CONFIG.basketUrl; return; }
      var body = new FormData(); body.append('product_id', ids[i]); body.append('quantity', 1);
      fetch('/?wc-ajax=add_to_cart', {method:'POST', body:body, credentials:'same-origin'})
        .then(function(r){ if(!r.ok) throw new Error('add failed'); i++; next(); })
        .catch(function(){ window.location.href = CONFIG.basketUrl + '?add-to-cart=' + ids[i]; });
    }
    next();
    return true;
  }

  /* ===================== document pack builder ===================== */
  var sel = {};
  function selCount(){ return Object.keys(sel).length; }
  function renderTiles(){
    var tiles = $('cp-tw-tiles'); if(!tiles) return;
    if(!tiles.querySelector('.cp-tile')){
      tiles.innerHTML = PACK.map(function(t,i){
        return '<button class="cp-tile" type="button" data-cp-tile="'+i+'" aria-pressed="false"><span class="cp-tile-bar"><span>'+t[0]+'</span><span>£25</span></span><span class="cp-tile-body"><strong>'+esc(t[1])+'</strong><span>'+esc(t[2])+'</span></span><span class="cp-tick" aria-hidden="true"></span></button>';
      }).join('');
    }
    var n = selCount(), cost = n * 25;
    Array.prototype.forEach.call(tiles.querySelectorAll('.cp-tile'), function(t){
      var on = !!sel[t.getAttribute('data-cp-tile')]; t.classList.toggle('on', on); t.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if($('cp-tw-sel')) $('cp-tw-sel').textContent = '£'+cost;
    if($('cp-tw-count')) $('cp-tw-count').innerHTML = (n ? n+' of 11 selected. ' : 'Nothing selected yet. ') + '<button class="cp-selall" type="button" data-cp-selall="1">'+(n===11 ? 'Clear selection' : 'Select all 11')+'</button>';
    var nudge = $('cp-tw-nudge');
    if(nudge){
      if(n >= 9){ nudge.textContent = 'The full pack of 11 is £200. Switching saves you £'+(cost-200)+' and gets you the other '+(11-n)+'.'; nudge.classList.add('show'); }
      else if(n === 8){ nudge.textContent = 'Eight templates cost the same as the full pack. Take all 11 for £200.'; nudge.classList.add('show'); }
      else if(n >= 1){ nudge.textContent = 'Most TWCs end up needing the register, the design brief and the permit together. The full pack is £200 for all 11.'; nudge.classList.add('show'); }
      else { nudge.classList.remove('show'); }
    }
    var buy = $('cp-tw-buysel');
    if(buy){
      var off = n === 0 || n === 11;
      buy.classList.toggle('off', off); buy.setAttribute('aria-disabled', off ? 'true' : 'false');
      buy.textContent = n === 11 ? 'Use “Buy the full pack” instead' : (n ? 'Buy '+n+' selected: £'+cost : 'Buy selected templates');
    }
  }
  renderTiles();

  /* ===================== which option finder ===================== */
  function twFind(){
    var sEl = $('cp-tw-sit'), nEl = $('cp-tw-sites'), wEl = $('cp-tw-work'), out = $('cp-tw-reco');
    if(!sEl || !out) return;
    var s = sEl.value, n = nEl ? nEl.value : '', w = wEl ? wEl.value : '';
    if(!s){ out.innerHTML = ''; out.classList.remove('show'); return; }
    var highRisk = (w==='structural'||w==='frames'||w==='mixed'), many = (n==='6'), several = (n==='3'||n==='6'), r;
    if(s==='design') r = {t:'Design and design checks', p:'Quoted per job', why:'Temporary works design and design checks are quoted per job, each with its own scope and cover. Tell us what the job is and we’ll come back with a scope.', cta:'#cp-t-enquire', ctaT:'Request a quote'};
    else if(s==='templates') r = {t:'Temporary Works Document Pack', p:'£200 + VAT for all 11, or £25 each', why:'You already have a procedure, so the pack gives your TWC the documents to run it, written to the same roles and categories as BS 5975-1:2024.', cta:'#cp-t-pack', ctaT:'Pick your templates'};
    else if(s==='check') r = {t:'Temporary Works Site Audit', p:'£995 + VAT per site, plus travel', why:(many?'With six or more live sites, a rolling programme suits better than one-off visits: one audit per site per year, or per phase on longer jobs. ':'')+'One live site checked against your own procedure, with an on-site debrief and a written report.', cta:'#cp-t-audit', ctaT:'See what an audit checks'};
    else if(many) r = {t:'Compliance Partner + Temporary Works', p:'From £28 per operative a month', why:'Six or more live sites means the procedure has to work for people who never meet, and it has to be audited to stay alive. Compliance Partner + Temporary Works gives you the procedure, register, audits and an advisory line for your TWCs on one monthly fee, with TWC or TWS course places each year.', cta:'#cp-t-bridge', ctaT:'See how it fits together'};
    else if(s==='varied' || (highRisk && (s==='new'||s==='old'||s==='pqq'))) r = {t:'Bespoke Temporary Works Package', p:'£3,495 + VAT', why:(highRisk?'Structural alterations, RAAC and frames are where generic procedures fail, because the categories and checks have to match the work. ':'')+'Three days with our engineer: discovery on your site, a procedure written around your work, the full pack configured for your roles, review and handover.'+(s==='pqq'?' If the tender deadline is this week, buy the generic procedure now to attach and we’ll replace it in the bespoke package.':''), cta:'#cp-t-bespoke', ctaT:'How the package works'};
    else if(s==='old') r = {t:'Generic Temporary Works Procedure', p:'£599 + VAT', why:'BS 5975:2019 was withdrawn in December 2024 and superseded by BS 5975-1:2024 and BS 5975-2:2024. Your work is fairly consistent, so a procedure aligned to the 2024 parts that you edit to your company replaces the withdrawn reference properly. Add the pack if your templates also cite the old edition, and book an audit 8 to 12 weeks after it goes live.', cta:'#cp-t-options', ctaT:'See the procedure'};
    else if(s==='pqq') r = {t:'Generic Temporary Works Procedure plus the Document Pack', p:'£599 + £200 + VAT', why:'Both are instant downloads, so you can attach a BS 5975-1:2024 procedure and the documents to the tender today. '+(several?'With several live sites, plan the bespoke package once the tender is in.':''), cta:'#cp-t-options', ctaT:'See both products'};
    else r = {t:'Generic Temporary Works Procedure plus the Document Pack', p:'£599 + £200 + VAT', why:'Your TWC has the training, so this gives the company the written system and the documents the course assumed existed. Edit in your company name, Designated Individual and TWC and it’s ready to adopt. '+(several?'If the sites multiply or the work gets more varied, the bespoke package is the upgrade.':''), cta:'#cp-t-options', ctaT:'See both products'};
    out.innerHTML = '<span class="cp-chip">Recommended</span><h3>'+esc(r.t)+'</h3><div class="cp-reco-price">'+esc(r.p)+'</div><p>'+esc(r.why)+'</p>'
      + '<div class="cp-btns"><a class="cp-btn navy" href="'+r.cta+'">'+esc(r.ctaT)+'</a><a class="cp-btn outline" href="#cp-t-enquire" data-cp-msg="'+esc('Finder recommendation: '+r.t+'.')+'">Talk it through</a></div>';
    out.classList.add('show');
    push({event:'cp_finder', cp_page:'tw', cp_recommendation:r.t});
  }

  /* ===================== listeners on the document (NitroPack-safe) ===================== */
  document.addEventListener('change', function(e){
    var t = e.target; if(t && (t.id === 'cp-tw-sit' || t.id === 'cp-tw-sites' || t.id === 'cp-tw-work')) twFind();
  }, true);

  document.addEventListener('click', function(e){
    /* template tiles */
    var tile = closest(e.target, '[data-cp-tile]');
    if(tile){ var k = tile.getAttribute('data-cp-tile'); if(sel[k]) delete sel[k]; else sel[k] = true; renderTiles(); return; }
    if(closest(e.target, '[data-cp-selall]')){ if(selCount() === 11) sel = {}; else PACK.forEach(function(_,i){ sel[i] = true; }); renderTiles(); return; }

    /* buy selected templates */
    var bs = closest(e.target, '#cp-tw-buysel');
    if(bs){
      var n = selCount();
      if(n === 0 || n === 11){ e.preventDefault(); return; }
      var keys = Object.keys(sel).map(Number).sort(function(a,b){ return a-b; });
      var ids = keys.map(function(i){ return CONFIG.products.templates[i]; });
      var names = keys.map(function(i){ return PACK[i][0]+' '+PACK[i][1]; });
      if(addToBasket(ids, names, bs)) e.preventDefault();
      return;
    }

    /* buy now buttons: procedure and full pack */
    var b = closest(e.target, '[data-cp-buy]');
    if(b){
      var which = b.getAttribute('data-cp-buy');
      var label = which === 'proc' ? 'Generic Temporary Works Procedure (£599 + VAT)' : 'Temporary Works Document Pack, all 11 (£200 + VAT)';
      if(addToBasket([CONFIG.products[which]], [label], b)) e.preventDefault();
      return;
    }

    /* law tabs */
    var tb = closest(e.target, '[data-cp-tab]');
    if(tb){
      var law = closest(tb, '.cp-law'); if(!law) return;
      Array.prototype.forEach.call(law.querySelectorAll('[data-cp-tab]'), function(x){ x.classList.toggle('on', x === tb); x.setAttribute('aria-selected', x === tb ? 'true' : 'false'); });
      Array.prototype.forEach.call(law.querySelectorAll('[data-cp-pane]'), function(p){ p.classList.toggle('on', p.getAttribute('data-cp-pane') === tb.getAttribute('data-cp-tab')); });
      return;
    }

    /* cross-links and form prefills */
    var x = closest(e.target, 'a[data-cp-xlink]');
    if(x) push({event:'cp_crosslink', cp_from:'temporary-works-consultancy', cp_destination:x.getAttribute('data-cp-xlink')});
    var a = closest(e.target, 'a[data-cp-msg]');
    if(a) toForm(a.getAttribute('data-cp-msg'));
  });

  /* ===================== subnav highlight ===================== */
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        Array.prototype.forEach.call(document.querySelectorAll('#cp-hub .cp-subnav a'), function(a){ a.classList.toggle('on', a.getAttribute('href') === '#'+en.target.id); });
      });
    }, {rootMargin:'-30% 0px -60% 0px'});
    Array.prototype.forEach.call(root.querySelectorAll('.cp-subnav a'), function(a){ var s = document.getElementById(a.getAttribute('href').slice(1)); if(s) io.observe(s); });
  }

  /* ===================== HubSpot form ===================== */
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
          push({event:'cp_form_submit', cp_page:'tw', cp_service_interest: v || CONFIG.interestDefault});
        }
      });
    };
    document.head.appendChild(s);
  }

  try{ console.info('CST Training temporary works page script v2 loaded'); }catch(e){}
})();

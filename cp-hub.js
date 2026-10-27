/* CST Training · Compliance Partner hub · hosted at https://glancyl.github.io/cst-advisor/
   Loaded on the page with: <script src="https://glancyl.github.io/cst-advisor/cp-hub.js?v=N" defer></script>
   Bump ?v=N on the page after every JS edit, and CSS_VERSION below after every CSS edit. PRICING and CONFIG live further down. */
(function () {
  if (document.getElementById("cp-hub-css")) return;
  /* NitroPack rewrites the script tag, so the version can't be read from it.
     Bump CSS_VERSION whenever cp-hub.css changes. */
  var CSS_VERSION = 10;
  var v = "v=" + CSS_VERSION;
  if (!document.querySelector('link[href*="family=Alata"]')) {
    var f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Alata&family=Asap:wght@400;600;700&display=swap";
    document.head.appendChild(f);
  }
  var l = document.createElement("link");
  l.id = "cp-hub-css"; l.rel = "stylesheet";
  l.href = "https://glancyl.github.io/cst-advisor/cp-hub.css" + (v ? "?" + v : "");
  document.head.appendChild(l);
})();

(function(){
  'use strict';
  var root = document.getElementById('cp-hub');
  if(!root) return;

  /* ===================== undo WordPress auto-formatting =====================
     wpautop wraps loose elements in <p> and adds <br>, which breaks the grids.
     Remove every <br>, drop empty <p>, and unwrap any classless <p> that only
     holds elements (no text of its own). Real paragraphs are left alone. */
  (function(){
    Array.prototype.slice.call(root.querySelectorAll('br')).forEach(function(b){ b.parentNode.removeChild(b); });
    Array.prototype.slice.call(root.querySelectorAll('p')).forEach(function(p){
      if(p.className || p.id) return;
      var ownText = Array.prototype.some.call(p.childNodes, function(n){ return n.nodeType === 3 && n.textContent.trim() !== ''; });
      if(ownText) return;
      while(p.firstChild) p.parentNode.insertBefore(p.firstChild, p);
      p.parentNode.removeChild(p);
    });
  })();

  /* ===================== CONFIG: set before go-live ===================== */
  var CONFIG = {
    brochureUrl: '',                                  // e.g. https://www.csttraining.co.uk/wp-content/uploads/2026/11/compliance-partner-brochure.pdf
    hubspot: { portalId: '19996504', formId: 'a81a7d9c-e2dd-41fe-8956-d06c40e11808', region: 'na1' },
    interestField: 'service_interest',                // HubSpot internal property name
    interestDefault: 'Compliance Partner',
    messageField: 'message'
  };

  /* ===================== PRICING: the single source of truth ===================== */
  var PRICING = {
    bands: [50, 100, Infinity],
    bandLabels: ['First 50', '51 to 150 (85%)', '151 and above (70%)'],
    perOpSetup: 15,
    levels: [
      { key:'mt', name:'Managed Training', tag:'We run your training compliance', rate:[6.00, 5.10, 4.20], min:250,
        setupFixed:0, setupMin:500, setupLabel:'£15 per operative (minimum £500)', hs:false, tw:false,
        includes:['Compliance Control software','Records set up and checked','Expiry alerts and evidence chasing','Gap analysis and bookings','Quarterly compliance report'] },
      { key:'cp', name:'Compliance Partner', tag:'Training plus a retained H&S consultant', rate:[20.00, 17.00, 14.00], min:750,
        setupFixed:1500, setupMin:0, setupLabel:'£1,500 plus £15 per operative', hs:true, tw:false,
        includes:['Everything in Managed Training','Named consultant as your competent person','H&S policy and annual review','Site inspections and RAMS reviews','Advice line, accident and RIDDOR support','SSIP and prequalification support','Monthly compliance report'],
        link:['/health-and-safety-consultancy/','More about our H&S consultancy','health-and-safety-consultancy'] },
      { key:'tw', name:'Compliance Partner + Temporary Works', tag:'The full service, including temporary works', rate:[28.00, 23.80, 19.60], min:1100,
        setupFixed:2500, setupMin:0, setupLabel:'£2,500 plus £15 per operative', hs:true, tw:true,
        includes:['Everything in Compliance Partner','Temporary works procedure and register','Temporary works audits','Advisory line for your TWCs and TWSs','TWC or TWS course places each year','Design and design checks quoted per job'],
        link:['/temporary-works-consultancy/','More about our temporary works consultancy','temporary-works-consultancy'] }
    ],
    extras: [
      ['Training booked with CST Training','Agreed rates, fixed for 12 months'],
      ['Training with other providers','Their price plus 10% (minimum £25)'],
      ['Extra H&S consultancy','£650 a day'],
      ['Extra temporary works engineer time','£995 a day'],
      ['Temporary works design and checks','Quoted per job']
    ],
    allowBands: ['Up to 50 operatives','51 to 150','151 to 250'],
    allowances: [
      ['Site safety inspections', ['4','8','12, monthly'], false],
      ['RAMS and document reviews', ['24','40','60'], false],
      ['H&S policy and annual review', ['Yes','Yes','Yes'], false],
      ['H&S management system audit', ['No','Yes','Yes'], false],
      ['Quarterly review with your directors', ['No','4','4'], false],
      ['Full accident investigations', ['1','1','2'], false],
      ['Temporary works audits (TW level only)', ['2','4','6'], true],
      ['TWC or TWS course places (TW level only)', ['2','3','4'], true]
    ],
    examples: [
      { title:'Groundworks contractor, 40 operatives', level:'mt', n:40,
        inc:['Records for all 40 operatives set up and checked','Expiry alerts, chasing and bookings','Quarterly compliance report'] },
      { title:'Building contractor, 120 operatives', level:'cp', n:120,
        inc:['Named competent person','8 site inspections and 40 RAMS reviews a year','H&S system audit and quarterly director reviews'] },
      { title:'Main contractor, 250 operatives', level:'tw', n:250,
        inc:['Monthly site inspections and 60 RAMS reviews a year','TW procedure, register and 6 audits a year','4 TWC or TWS course places'] }
    ]
  };

  /* ===================== helpers ===================== */
  function q(sel){ return root.querySelector(sel); }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function gbp(n){ var whole = Math.round(n) === n; return '£' + n.toLocaleString('en-GB', whole ? {} : {minimumFractionDigits:2, maximumFractionDigits:2}); }
  function rate(r){ return '£' + r.toFixed(2); }
  function rateShort(r){ return rate(r).replace('.00',''); }
  function push(ev){ try{ window.dataLayer = window.dataLayer || []; window.dataLayer.push(ev); }catch(e){} }
  function levelByKey(k){ for(var i=0;i<PRICING.levels.length;i++){ if(PRICING.levels[i].key===k) return PRICING.levels[i]; } return PRICING.levels[0]; }

  function fee(level, n){
    var left = Math.max(0, Math.floor(n)), sum = 0, lines = [];
    PRICING.bands.forEach(function(size, i){
      var inBand = Math.min(left, size); if(inBand <= 0) return;
      var amt = Math.round(inBand * level.rate[i] * 100) / 100;
      lines.push({count:inBand, rate:level.rate[i], amt:amt});
      sum = Math.round((sum + amt) * 100) / 100; left -= inBand;
    });
    var minApplied = sum < level.min;
    return { lines:lines, sum:sum, total: minApplied ? level.min : sum, minApplied:minApplied };
  }
  function setup(level, n){ return Math.max(level.setupFixed + n * PRICING.perOpSetup, level.setupMin); }
  function allowBand(n){ return n <= 50 ? 0 : n <= 150 ? 1 : n <= 250 ? 2 : -1; }
  function table(head, rows, caption, numFrom){
    var h = '<table>' + (caption ? '<caption>'+esc(caption)+'</caption>' : '') + '<thead><tr>';
    head.forEach(function(c,i){ h += '<th scope="col"'+(numFrom!=null && i>=numFrom?' class="num"':'')+'>'+esc(c)+'</th>'; });
    h += '</tr></thead><tbody>';
    rows.forEach(function(r){ h += '<tr>'; r.forEach(function(c,i){ h += '<td'+(numFrom!=null && i>=numFrom?' class="num"':'')+'>'+esc(c)+'</td>'; }); h += '</tr>'; });
    return h + '</tbody></table>';
  }

  /* accreditation CONFIRM chip removed at Liam's request */
  Array.prototype.forEach.call(root.querySelectorAll('#cp-s-why .cp-confirm'), function(c){ var p = c.closest('p'); (p || c).parentNode.removeChild(p || c); });

  /* ===================== render from PRICING ===================== */
  q('[data-cp="hero-levels"]').innerHTML = PRICING.levels.map(function(l){
    return '<dt>'+esc(l.name)+'</dt><dd>from '+rateShort(l.rate[0])+' per operative</dd>';
  }).join('');

  q('[data-cp="levels"]').innerHTML = PRICING.levels.map(function(l, i){
    var mid = i === 1;
    return '<div class="cp-level'+(mid?' mid':'')+'">'
      + '<h3>'+esc(l.name)+'</h3><p class="cp-tag">'+esc(l.tag)+'</p>'
      + '<p class="cp-from"><b>'+rateShort(l.rate[0])+'</b>per operative a month</p>'
      + '<ul>'+l.includes.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul>'
      + '<div class="cp-foot"><a class="cp-btn '+(mid?'primary':'navy')+' sm" href="#cp-s-enquire" data-cp-msg="I’m interested in '+esc(l.name)+'.">Book a free records review</a>'
      + (l.link ? '<a href="'+l.link[0]+'" data-cp-xlink="'+l.link[2]+'">'+esc(l.link[1])+'</a>' : '')
      + '</div></div>';
  }).join('');

  q('[data-cp="allow-table"]').innerHTML = table(
    ['Included each year'].concat(PRICING.allowBands),
    PRICING.allowances.map(function(a){ return [a[0]].concat(a[1]); }),
    'Yearly allowances on Compliance Partner and Compliance Partner + Temporary Works. Temporary works rows apply to the + Temporary Works level only.', 1);

  q('[data-cp="rate-table"]').innerHTML = table(
    ['Level'].concat(PRICING.bandLabels, ['Monthly minimum']),
    PRICING.levels.map(function(l){ return [l.name].concat(l.rate.map(rate), [gbp(l.min)]); }),
    'The rate applies only to the operatives within each band. Monthly fee is the sum across bands, or the monthly minimum if higher. All prices exclude VAT.', 1);

  q('[data-cp="setup-table"]').innerHTML = table(['Level','Onboarding fee'],
    PRICING.levels.map(function(l){ return [l.name, l.setupLabel]; }));

  q('[data-cp="extra-table"]').innerHTML = table(['Item','Price'], PRICING.extras);

  q('[data-cp="examples"]').innerHTML = PRICING.examples.map(function(ex){
    var l = levelByKey(ex.level), f = fee(l, ex.n), s = setup(l, ex.n);
    var line = f.lines.map(function(x){ return x.count+' × '+rate(x.rate)+' = '+gbp(x.amt); }).join('; ') + (f.minApplied ? '; monthly minimum applies' : '');
    return '<div class="cp-ex"><p class="lvl">'+esc(l.name)+'</p><h3>'+esc(ex.title)+'</h3><p class="calcline">'+line+'</p>'
      + '<div class="cp-figs"><div><b>'+gbp(f.total)+'</b><span>a month</span></div><div><b>'+gbp(Math.round(f.total*1200)/100)+'</b><span>a year</span></div><div><b>'+gbp(s)+'</b><span>set-up</span></div></div>'
      + '<ul>'+ex.inc.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul></div>';
  }).join('');

  /* ===================== extra calls to action and pricing layout ===================== */
  (function(){
    var PHONE = '020 3488 4472', TEL = 'tel:02034884472';
    function el(html){ var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
    function after(node, html){ if(node && node.parentNode){ var n = el(html); node.parentNode.insertBefore(n, node.nextSibling); return n; } }
    function subhead(text){ var hs = root.querySelectorAll('#cp-s-pricing .cp-subhead'); for(var i=0;i<hs.length;i++){ if(hs[i].textContent.trim() === text) return hs[i]; } return null; }
    var review = function(msg, label, cls){ return '<a class="cp-btn '+(cls||'primary')+'" href="#cp-s-enquire"'+(msg?' data-cp-msg="'+esc(msg)+'"':'')+'>'+esc(label||'Book a free records review')+'</a>'; };
    var call = function(cls){ return '<a class="cp-btn '+(cls||'outline')+'" href="'+TEL+'">Call '+PHONE+'</a>'; };

    // How it works: buttons under the "You stay in control" panel
    after(root.querySelector('#cp-s-how .cp-control'), '<div class="cp-btns cp-center">'+review()+call('navy')+'</div>');

    // Pricing: set-up and extras side by side
    var h1 = subhead('One-off set-up'), t1 = root.querySelector('[data-cp="setup-table"]');
    var h2 = subhead('Charged separately'), t2 = root.querySelector('[data-cp="extra-table"]');
    if(h1 && t1 && h2 && t2){
      var note = t2.nextElementSibling;
      var grid = el('<div class="cp-two"><div></div><div></div></div>');
      h1.parentNode.insertBefore(grid, h1);
      grid.children[0].appendChild(h1); grid.children[0].appendChild(t1);
      grid.children[1].appendChild(h2); grid.children[1].appendChild(t2);
      if(note && note.classList.contains('cp-small')) grid.children[1].appendChild(note);
    }

    // Pricing: terms as a card, then a call to action band
    var th = subhead('Terms');
    if(th){
      var card = el('<div class="cp-terms"></div>');
      th.parentNode.insertBefore(card, th);
      var p1 = th.nextElementSibling, p2 = p1 && p1.nextElementSibling;
      card.appendChild(th); if(p1) card.appendChild(p1); if(p2 && p2.tagName === 'P') card.appendChild(p2);
      after(card, '<div class="cp-band"><div><h3>Want a fixed quote for your headcount?</h3><p>We’ll review your training records and H&amp;S arrangements, recommend the right level and confirm your price, free of charge.</p></div><div class="cp-btns">'+review('I’d like a fixed quote.','Get my fixed quote')+call('ghost')+'</div></div>');
    }

    // Examples: button under the three examples
    after(root.querySelector('#cp-s-examples .cp-examples'), '<div class="cp-btns cp-center">'+review('I’d like a quote like the examples on your page.','Get a quote like this for your business')+'</div>');

    // Why CST Training: button under the cards
    after(root.querySelector('#cp-s-why .cp-cards'), '<div class="cp-btns cp-center">'+review()+'</div>');

    // FAQs: still got a question
    after(root.querySelector('#cp-s-faq .cp-faq'), '<div class="cp-band light"><div><h3>Still got a question?</h3><p>Talk it through with our team, or send us a message and we’ll come back to you.</p></div><div class="cp-btns">'+call('navy')+review('','Send us a message','primary')+'</div></div>');
  })();

  /* ===================== calculator =====================
     Listeners sit on the document and elements are looked up on every change,
     because NitroPack re-inserts page content after load, which drops any
     listener attached to the original elements. This also means
     it keeps working if the theme re-renders the page. */
  var calcTimer = null;
  function calcEls(scope){ return { ops:scope.querySelector('#cp-calc-ops'), lvl:scope.querySelector('#cp-calc-level'), out:scope.querySelector('#cp-calc-out') }; }
  function runCalc(scope, track){
    var el = calcEls(scope); if(!el.ops || !el.lvl || !el.out) return;
    var n = Math.max(1, Math.min(2000, parseInt(el.ops.value,10) || 1)), l = levelByKey(el.lvl.value);
    var f = fee(l, n), s = setup(l, n), band = allowBand(n);
    var h = '<h3>'+esc(l.name)+', '+n+' operative'+(n===1?'':'s')+'</h3>'
      + '<div class="cp-big">'+gbp(f.total)+'<small>a month, ex VAT</small></div><div class="cp-lines">'
      + f.lines.map(function(x){ return '<div class="sub"><span>'+x.count+' operatives at '+rate(x.rate)+'</span><b>'+gbp(x.amt)+'</b></div>'; }).join('')
      + (f.minApplied ? '<div class="sub"><span>Below the monthly minimum, so the minimum of '+gbp(l.min)+' applies</span><b>'+gbp(l.min)+'</b></div>' : '')
      + '<div><span>Over a year</span><b>'+gbp(Math.round(f.total*1200)/100)+'</b></div>'
      + '<div><span>One-off set-up</span><b>'+gbp(s)+'</b></div></div>';
    if(l.hs){
      h += '<div class="cp-inc"><h4>Included each year at this headcount</h4>';
      h += band < 0 ? '<p class="cp-small">Over 250 operatives, we scope and quote your allowance.</p>'
        : '<ul>'+PRICING.allowances.filter(function(a){ return !a[2] || l.tw; }).map(function(a){ return '<li>'+esc(a[0].replace(' (TW level only)',''))+': <strong>'+esc(a[1][band])+'</strong></li>'; }).join('')+'</ul>';
      h += '</div>';
    } else {
      h += '<div class="cp-inc"><h4>Included</h4><ul>'+l.includes.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul></div>';
    }
    h += '<div class="cp-btns" style="margin-top:16px"><a class="cp-btn primary" href="#cp-s-enquire" data-cp-msg="I’d like a fixed quote for '+esc(l.name)+', '+n+' operatives.">Get a fixed quote for '+n+' operatives</a></div>';
    h += '<p class="cp-fine">Prices exclude VAT. Your quote is based on your actual headcount. Training booked through the service is charged separately.</p>';
    el.out.innerHTML = h;
    if(track){
      clearTimeout(calcTimer);
      calcTimer = setTimeout(function(){ push({event:'cp_calculator', cp_level:l.name, cp_operatives:n, cp_monthly:f.total}); }, 1200);
    }
  }
  Array.prototype.forEach.call(root.querySelectorAll('.cp-calc'), function(c){
    var el = calcEls(c); if(!el.lvl) return;
    el.lvl.innerHTML = PRICING.levels.map(function(l){ return '<option value="'+l.key+'">'+esc(l.name)+'</option>'; }).join('');
    el.lvl.value = 'cp';
    runCalc(c, false);
  });
  ['input','change','keyup'].forEach(function(type){
    document.addEventListener(type, function(e){
      var t = e.target; if(!t || (t.id !== 'cp-calc-ops' && t.id !== 'cp-calc-level')) return;
      var c = t.closest ? t.closest('.cp-calc') : null; if(c) runCalc(c, true);
    }, true);
  });

  /* ===================== brochure ===================== */
  var bro = document.getElementById('cp-brochure');
  var broChip = document.getElementById('cp-brochure-chip');
  if(broChip){ var bp = broChip.closest('p'); (bp || broChip).parentNode.removeChild(bp || broChip); }
  if(bro){
    if(CONFIG.brochureUrl){
      bro.href = CONFIG.brochureUrl;
      bro.addEventListener('click', function(){ push({event:'cp_brochure'}); });
    } else {
      bro.parentNode.removeChild(bro); // hidden until the brochure URL is set in CONFIG
    }
  }

  /* ===================== cross-links to the consultancy pages ===================== */
  document.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a[data-cp-xlink]') : null;
    if(a) push({event:'cp_crosslink', cp_destination:a.getAttribute('data-cp-xlink')});
  });

  /* ===================== subnav highlight ===================== */
  var links = root.querySelectorAll('.cp-subnav a');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        links.forEach(function(a){ a.classList.toggle('on', a.getAttribute('href') === '#'+en.target.id); });
      });
    }, {rootMargin:'-30% 0px -60% 0px'});
    links.forEach(function(a){ var s = document.getElementById(a.getAttribute('href').slice(1)); if(s) io.observe(s); });
  }

  /* ===================== HubSpot form ===================== */
  var hsForm = null, pendingMsg = (function(){ try{ return new URLSearchParams(location.search).get('msg') || ''; }catch(e){ return ''; } })();
  function setField(form, name, value, onlyIfEmpty){
    var el = form && form.querySelector('[name="'+name+'"]'); if(!el || !value) return;
    if(onlyIfEmpty && el.value) return;
    var proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    var setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
    setter.call(el, value);
    el.dispatchEvent(new Event('input', {bubbles:true}));
    el.dispatchEvent(new Event('change', {bubbles:true}));
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a[data-cp-msg]') : null; if(!a) return;
    pendingMsg = a.getAttribute('data-cp-msg');
    if(hsForm){ setField(hsForm, CONFIG.interestField, CONFIG.interestDefault); setField(hsForm, CONFIG.messageField, pendingMsg, true); }
  });

  if(CONFIG.hubspot.portalId && CONFIG.hubspot.formId){
    var fchip = document.getElementById('cp-form-chip'); if(fchip) fchip.hidden = true;
    Array.prototype.forEach.call(root.querySelectorAll('#cp-s-enquire .cp-formbox > .cp-confirm'), function(c){ c.parentNode.removeChild(c); });
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
          push({event:'cp_form_submit', cp_service_interest: v || CONFIG.interestDefault});
        }
      });
    };
    document.head.appendChild(s);
  }

  try{ console.info('CST Training Compliance Partner hub script v11 loaded'); }catch(e){}
  /* self-test hook: in the console, cpHub.check() should log nine passes */
  window.cpHub = { fee:fee, check:function(){
    var want = {25:[250,750,1100], 100:[555,1850,2590], 200:[1020,3400,4760]};
    Object.keys(want).forEach(function(n){ PRICING.levels.forEach(function(l,i){
      var got = fee(l, +n).total; console.log((got===want[n][i]?'PASS ':'FAIL ')+l.name+' @ '+n+': '+got);
    }); });
  }};
})();

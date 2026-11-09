(function () {
  // CCNSG venues. Add a line here as each new CCNSG location goes live.
  var DATES_URL = "https://www.csttraining.co.uk/ccnsg-course-dates/";
  var LOCATIONS = [
    { name: "Birmingham", url: DATES_URL, lat: 52.4751, lon: -1.8840, region: "Midlands" },
    { name: "Bristol", url: DATES_URL, lat: 51.4545, lon: -2.5879, region: "South West England" },
    { name: "Cardiff", url: DATES_URL, lat: 51.4785, lon: -3.1770, region: "Wales" }
  ];

  var TRACK_URL = 'https://script.google.com/macros/s/AKfycbwEbK2DSXtjCHWMfJbe4yabGTk8KRJI3b0Lf45wKYkFYwyx7D495YCXjUS774oG_LSe/exec';

  function haversineMiles(lat1, lon1, lat2, lon2) {
    var R = 3958.8;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  function trackSearch(postcode, region, location) {
    try {
      var img = new Image();
      img.src = TRACK_URL + '?postcode=' + encodeURIComponent(postcode) + '&page=' + encodeURIComponent(window.location.href) + '&region=' + encodeURIComponent(region) + '&location=' + encodeURIComponent(location);
    } catch (e) {}
  }

  // Approximate centre of each postcode area, used if the postcode lookup service can't be reached.
  var AREAS = {AB:[57.15,-2.1],AL:[51.75,-0.34],B:[52.48,-1.89],BA:[51.38,-2.36],BB:[53.75,-2.48],BD:[53.79,-1.75],BH:[50.72,-1.88],BL:[53.58,-2.43],BN:[50.83,-0.14],BR:[51.4,0.02],BS:[51.45,-2.59],BT:[54.6,-5.93],CA:[54.89,-2.93],CB:[52.21,0.12],CF:[51.48,-3.18],CH:[53.19,-2.89],CM:[51.74,0.47],CO:[51.89,0.9],CR:[51.37,-0.1],CT:[51.28,1.08],CV:[52.41,-1.51],CW:[53.1,-2.44],DA:[51.45,0.22],DD:[56.46,-2.97],DE:[52.92,-1.48],DG:[55.07,-3.61],DH:[54.78,-1.57],DL:[54.52,-1.55],DN:[53.52,-1.13],DT:[50.71,-2.44],DY:[52.51,-2.09],E:[51.53,-0.03],EC:[51.52,-0.09],EH:[55.95,-3.19],EN:[51.65,-0.08],EX:[50.72,-3.53],FK:[56.0,-3.78],FY:[53.82,-3.05],G:[55.86,-4.25],GL:[51.86,-2.24],GU:[51.24,-0.57],GY:[49.45,-2.54],HA:[51.58,-0.34],HD:[53.65,-1.78],HG:[53.99,-1.54],HP:[51.75,-0.75],HR:[52.06,-2.72],HS:[58.21,-6.39],HU:[53.74,-0.33],HX:[53.72,-1.86],IG:[51.56,0.08],IM:[54.15,-4.48],IP:[52.06,1.15],IV:[57.48,-4.22],JE:[49.19,-2.11],KA:[55.61,-4.5],KT:[51.41,-0.3],KW:[58.44,-3.09],KY:[56.11,-3.16],L:[53.41,-2.98],LA:[54.05,-2.8],LD:[52.24,-3.38],LE:[52.64,-1.13],LL:[53.08,-3.8],LN:[53.23,-0.54],LS:[53.8,-1.55],LU:[51.88,-0.42],M:[53.48,-2.24],ME:[51.38,0.52],MK:[52.04,-0.76],ML:[55.79,-3.99],N:[51.57,-0.11],NE:[54.97,-1.61],NG:[52.95,-1.15],NN:[52.24,-0.9],NP:[51.59,-3.0],NR:[52.63,1.3],NW:[51.55,-0.18],OL:[53.54,-2.12],OX:[51.75,-1.26],PA:[55.85,-4.42],PE:[52.57,-0.24],PH:[56.4,-3.43],PL:[50.38,-4.14],PO:[50.8,-1.09],PR:[53.76,-2.7],RG:[51.45,-0.97],RH:[51.17,-0.17],RM:[51.56,0.18],S:[53.38,-1.47],SA:[51.62,-3.94],SE:[51.47,-0.06],SG:[51.9,-0.2],SK:[53.41,-2.15],SL:[51.51,-0.59],SM:[51.36,-0.19],SN:[51.56,-1.78],SO:[50.91,-1.4],SP:[51.07,-1.79],SR:[54.91,-1.38],SS:[51.54,0.71],ST:[53.0,-2.18],SW:[51.46,-0.17],SY:[52.71,-2.75],TA:[51.02,-3.1],TD:[55.6,-2.43],TF:[52.68,-2.45],TN:[51.13,0.26],TQ:[50.46,-3.53],TR:[50.26,-5.05],TS:[54.57,-1.23],TW:[51.45,-0.34],UB:[51.53,-0.45],W:[51.51,-0.2],WA:[53.39,-2.59],WC:[51.52,-0.12],WD:[51.66,-0.4],WF:[53.68,-1.5],WN:[53.55,-2.63],WR:[52.19,-2.22],WS:[52.59,-1.98],WV:[52.59,-2.13],YO:[53.96,-1.08],ZE:[60.15,-1.15]};

  function areaFallback(postcode) {
    var m = postcode.trim().toUpperCase().match(/^([A-Z]{1,2})[0-9]/);
    if (!m) return null;
    var a = AREAS[m[1]] || AREAS[m[1].charAt(0)];
    return a ? { lat: a[0], lon: a[1], postcode: postcode.trim().toUpperCase(), approx: true } : null;
  }

  function withTimeout(promise, ms) {
    return new Promise(function(resolve, reject) {
      var t = setTimeout(function() { reject(new Error('timeout')); }, ms);
      promise.then(function(v) { clearTimeout(t); resolve(v); }, function(e) { clearTimeout(t); reject(e); });
    });
  }

  function lookup(postcode) {
    var clean = postcode.trim().replace(/\s+/g, '');
    return fetch('https://api.postcodes.io/postcodes/' + encodeURIComponent(clean))
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.status === 200 && data.result) {
          return { lat: data.result.latitude, lon: data.result.longitude, postcode: data.result.postcode };
        }
        var outcode = clean.match(/^[A-Z]{1,2}[0-9][0-9A-Z]?/i);
        if (!outcode) throw new Error('not found');
        return fetch('https://api.postcodes.io/outcodes/' + encodeURIComponent(outcode[0]))
          .then(function(r) { return r.json(); })
          .then(function(d2) {
            if (d2.status === 200 && d2.result) {
              return { lat: d2.result.latitude, lon: d2.result.longitude, postcode: d2.result.outcode };
            }
            throw new Error('not found');
          });
      });
  }

  function geocode(postcode) {
    var p = (typeof fetch === 'function') ? withTimeout(lookup(postcode), 5000) : Promise.reject(new Error('no fetch'));
    return p.catch(function(err) {
      if (window.console) console.warn('CCNSG finder: lookup failed, using postcode area', err);
      var f = areaFallback(postcode);
      if (f) return f;
      throw err;
    });
  }

  var ROOT_ID = 'cst-postcode-finder-ccnsg';
  var H4 = 'margin:0 0 4px;font-size:15px;text-transform:uppercase;letter-spacing:0.04em;color:#6b7099;font-weight:700;';

  // Builds the finder. Other scripts on the site can rebuild page content, which wipes
  // listeners attached to elements, so every lookup below goes through the live DOM
  // and all events are handled at document level.
  function render(root) {
    root.setAttribute('data-ccnsg-ready', '1');
    root.style.cssText = 'position:relative;z-index:50;max-width:640px;margin:32px auto;padding:26px 24px;background:#ffffff;border-radius:14px;font-family:Inter,Arial,sans-serif;color:#1c2560;text-align:center;';
    root.innerHTML =
      '<h3 style="font-family:Montserrat,Arial,sans-serif;font-size:22px;font-weight:bold;margin:0 0 6px;color:#1c2560;">Find your nearest CCNSG course</h3>' +
      '<p style="margin:0 0 18px;font-size:15px;color:#4a4f6b;">Enter your postcode to see the closest CCNSG venues</p>' +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
        '<input data-ccnsg="pc" type="text" placeholder="e.g. DA1 5FS" maxlength="8" autocomplete="postal-code" style="flex:1 1 220px;max-width:260px;padding:13px 16px;font-size:16px;border:2px solid #d7d9e6;border-radius:8px;outline:none;text-transform:uppercase;color:#1c2560;background:#fff;">' +
        '<button data-ccnsg="go" type="button" style="background:#1C2560;color:#fff;border:none;padding:13px 26px;font-size:16px;font-weight:600;border-radius:8px;cursor:pointer;">Find Courses</button>' +
      '</div>' +
      '<div data-ccnsg="msg" style="margin-top:14px;font-size:14px;min-height:20px;color:#4a4f6b;"></div>' +
      '<div data-ccnsg="results" style="display:none;margin-top:22px;text-align:left;border:1px solid #e3e5f0;border-radius:12px;padding:22px 26px;background:#f7f8fc;">' +
        '<h4 style="' + H4 + '">Course Dates</h4>' +
        '<a href="' + DATES_URL + '" target="_blank" rel="noopener" style="display:inline-block;font-size:19px;font-weight:700;color:#1C2560;text-decoration:none;border-bottom:2px solid #FF8A00;margin-bottom:16px;">All CCNSG Dates</a>' +
        '<h4 style="margin-top:16px;' + H4 + '">Nearest Venues</h4>' +
        '<div data-ccnsg="grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;"></div>' +
        '<p style="margin:16px 0 0;font-size:14px;color:#4a4f6b;">Booking for a group? <a href="https://www.csttraining.co.uk/contact/" style="color:#1C2560;font-weight:600;">Ask us about running CCNSG at your site</a>.</p>' +
      '</div>';
  }

  function part(root, name) { return root.querySelector('[data-ccnsg="' + name + '"]'); }

  function setMessage(root, text, isError) {
    var msg = part(root, 'msg'); if (!msg) return;
    msg.textContent = text || '';
    msg.style.color = isError ? '#c0392b' : '#4a4f6b';
    msg.style.fontWeight = isError ? '600' : 'normal';
  }

  function escapeHtml(t) { return String(t).replace(/[&<>"]/g, function(c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function handleSearch(root) {
    if (root.getAttribute('data-ccnsg-busy') === '1') return;
    var input = part(root, 'pc');
    var postcode = input ? input.value : '';
    if (!postcode || postcode.trim().length < 2) { setMessage(root, 'Please enter a valid UK postcode.', true); return; }
    root.setAttribute('data-ccnsg-busy', '1');
    setMessage(root, 'Searching...', false);
    part(root, 'results').style.display = 'none';

    geocode(postcode).then(function(loc) {
      var live = document.getElementById(ROOT_ID) || root;
      var ranked = LOCATIONS.map(function(l) {
        return { loc: l, dist: haversineMiles(loc.lat, loc.lon, l.lat, l.lon) };
      }).sort(function(a, b) { return a.dist - b.dist; }).slice(0, 4);

      trackSearch(loc.postcode, ranked[0].loc.region, ranked[0].loc.name);

      part(live, 'grid').innerHTML = ranked.map(function(item) {
        var miles = loc.approx ? 'approx. ' + Math.round(item.dist) : item.dist.toFixed(1);
        return '<a href="' + item.loc.url + '" target="_blank" rel="noopener" style="display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #e3e5f0;border-radius:8px;padding:12px 14px;text-decoration:none;color:#1C2560;font-weight:600;font-size:15px;">' +
          '<span>' + escapeHtml(item.loc.name) + '</span><span style="font-weight:400;font-size:12px;color:#8a8fb0;white-space:nowrap;margin-left:8px;">' + miles + ' mi</span></a>';
      }).join('');
      setMessage(live, '', false);
      part(live, 'results').style.display = 'block';
    }).catch(function(err) {
      if (window.console) console.error('CCNSG finder:', err);
      setMessage(document.getElementById(ROOT_ID) || root, "Sorry, we couldn't find that postcode. Please check it and try again.", true);
    }).then(function() {
      root.removeAttribute('data-ccnsg-busy');
      var live = document.getElementById(ROOT_ID); if (live) live.removeAttribute('data-ccnsg-busy');
    });
  }

  function rootOf(el) { return el && el.closest ? el.closest('#' + ROOT_ID) : null; }

  document.addEventListener('click', function(e) {
    var btn = e.target && e.target.closest ? e.target.closest('[data-ccnsg="go"]') : null;
    if (!btn) return;
    e.preventDefault();
    handleSearch(rootOf(btn));
  }, true);

  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    var input = e.target && e.target.closest ? e.target.closest('[data-ccnsg="pc"]') : null;
    if (!input) return;
    e.preventDefault();
    handleSearch(rootOf(input));
  }, true);

  function init() {
    var root = document.getElementById(ROOT_ID);
    if (root && !part(root, 'go')) render(root);
  }

  init();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  window.addEventListener('load', init);
  // Re-render if another script empties or replaces the finder.
  if (window.MutationObserver) {
    new MutationObserver(function() { init(); }).observe(document.documentElement, { childList: true, subtree: true });
  }
  if (window.console) console.log('CCNSG finder v4 loaded');

})();

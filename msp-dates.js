/* CST Training course dates list (MSP pages) v7: filters use native radio buttons, no click handlers
   Reads upcoming dates from the course's own dates page (the WooCommerce
   category page, already cached by NitroPack so it loads fast), then renders:
   e-learning "Start today" row first, then dated virtual classroom rows.

   Mount on the page:
   <div data-cst-dates data-dates-page="https://www.csttraining.co.uk/msp-foundation-5th-edition/"
        data-elearning-price="£1,000 + VAT" data-elearning-url="https://..."
        data-course-label="3-day course" data-course-desc="online on Google Meet"> fallback text </div>
   <script nitro-exclude src="https://glancyl.github.io/cst-advisor/msp-dates.js?v=5"></script>
*/
(function () {
  var CACHE_MINS = 30;
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function css() {
    if (document.getElementById('cstd-css')) return;
    var s = document.createElement('style');
    s.id = 'cstd-css';
    s.textContent =
      '.cstd{max-width:1030px;margin:0 auto}' +
      '.cstd-filters{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:0 0 22px;position:relative;z-index:5}' +
      '.cstd-pill{display:inline-block;border:0;background:#fff;color:#1d2560!important;font-weight:700;font-size:15px;padding:11px 20px;border-radius:999px;cursor:pointer;text-decoration:none!important;pointer-events:auto;user-select:none}' +
            '.cstd-row{display:flex;align-items:center;gap:20px;background:#fff;border-left:5px solid #ff8c04;border-radius:10px;padding:14px 18px;margin:0 0 10px;text-align:left}' +
      '.cstd-row.el{background:#f4f6fa;border-left-color:#4c6bd8}' +
      '.cstd-when{flex:0 0 140px}' +
      '.cstd-date{color:#1d2560;font-weight:700;font-size:17px;line-height:1.2}' +
      '.cstd-row.el .cstd-date{color:#4c6bd8}' +
      '.cstd-day{color:#6b7394;font-size:13px}' +
      '.cstd-what{flex:1;color:#1d2560;font-size:16px}' +
      '.cstd-price{color:#1d2560;font-weight:700;font-size:16px;white-space:nowrap}' +
      '.cstd-book{background:#ff8c04;color:#1d2560!important;font-weight:700;font-size:15px;padding:10px 18px;border-radius:999px;text-decoration:none!important;white-space:nowrap}' +
      '.cstd-book:hover{background:#ffa133}' +
      '.cstd-morewrap{text-align:center;margin-top:18px}' +
      '.cstd-more{display:inline-block;text-decoration:none!important;margin:0;background:transparent;border:2px solid #fff;color:#fff;font-weight:700;font-size:16px;padding:11px 24px;border-radius:999px;cursor:pointer}' +
      '.cstd-msg{color:#fff;text-align:center;padding:12px}' +
      '.cstd-r{position:absolute!important;opacity:0!important;width:1px!important;height:1px!important;pointer-events:none!important;margin:0!important}' +
      'label.cstd-pill,label.cstd-more{margin:0}' +
      '.cstd-r-all:checked~.cstd-filters .p-all,.cstd-r-el:checked~.cstd-filters .p-el,.cstd-r-dt:checked~.cstd-filters .p-dt{background:#4c6bd8;color:#fff!important}' +
      '.cstd-r-el:checked~.cstd-list .t-dt{display:none}' +
      '.cstd-r-dt:checked~.cstd-list .t-el{display:none}' +
      '.cstd-r-all:checked~.cstd-m:not(:checked)~.cstd-list .x-all{display:none}' +
      '.cstd-r-dt:checked~.cstd-m:not(:checked)~.cstd-list .x-dt{display:none}' +
      '.cstd-m:checked~.cstd-morewrap,.cstd-r-el:checked~.cstd-morewrap{display:none}' +
      '.cstd-r-dt:checked~.cstd-morewrap.no-dt{display:none}' +
      '.cstd-msg a{color:#ff8c04;font-weight:700}' +
      '@media(max-width:700px){.cstd-row{flex-wrap:wrap;gap:8px 14px}.cstd-when,.cstd-what{flex:1 1 100%}.cstd-price{flex:1}}';
    document.head.appendChild(s);
  }

  function row(cls, date, day, what, price, href) {
    return '<div class="cstd-row ' + cls + '"><div class="cstd-when"><div class="cstd-date">' + date +
      '</div><div class="cstd-day">' + day + '</div></div><div class="cstd-what">' + what +
      '</div><div class="cstd-price">' + price + '</div><a class="cstd-book" href="' + href + '">Book now</a></div>';
  }

  // Pull dated products out of the dates page HTML
  function parse(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var out = [], seen = {};
    var links = doc.querySelectorAll('a[href*="add-to-cart="]');
    Array.prototype.forEach.call(links, function (a) {
      var id = (/add-to-cart=(\d+)/.exec(a.getAttribute('href')) || [])[1];
      if (!id || seen[id]) return;
      // climb to the smallest box that holds this product's date
      var box = a.parentElement, m = null;
      while (box && box !== doc.body) {
        if (box.querySelectorAll('a[href*="add-to-cart="]').length > 1) { box = null; break; }
        m = /(\d{2})-(\d{2})-(\d{4})/.exec(box.textContent);
        if (m) break;
        box = box.parentElement;
      }
      if (!box || !m) return;
      var priceEl = box.querySelector('.price ins .woocommerce-Price-amount') || box.querySelector('ins .woocommerce-Price-amount');
      if (!priceEl) { var all = box.querySelectorAll('.woocommerce-Price-amount'); priceEl = all[all.length - 1]; }
      var price = priceEl ? priceEl.textContent.replace(/\s+/g, '') : '';
      seen[id] = 1;
      out.push({ id: id, t: new Date(+m[3], +m[2] - 1, +m[1]).getTime(), price: price ? price + ' + VAT' : '' });
    });
    return out;
  }

  function load(url) {
    var key = 'cstd3-' + url;
    try {
      var hit = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (hit && Date.now() - hit.at < CACHE_MINS * 60000) return Promise.resolve(hit.d);
    } catch (e) {}
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);
    return fetch(url, { credentials: 'same-origin', signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (html) {
        clearTimeout(timer);
        var d = html ? parse(html) : [];
        if (d.length) { try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), d: d })); } catch (e) {} }
        return d;
      })
      .catch(function () { clearTimeout(timer); return []; });
  }

  var UID = 0;

  function init(el) {
    var page = el.getAttribute('data-dates-page') || el.getAttribute('data-all-link') || '';
    var elPrice = el.getAttribute('data-elearning-price');
    var elUrl = el.getAttribute('data-elearning-url');
    var label = el.getAttribute('data-course-label') || 'Virtual classroom';
    var desc = el.getAttribute('data-course-desc') || 'online';
    var show = parseInt(el.getAttribute('data-show') || '6', 10);
    var elRow = (elPrice && elUrl) ? row('el t-el', 'Start today', 'Any time', '<strong>E-learning</strong> online, at your own pace', elPrice, elUrl) : '';
    var n = ++UID;

    el.className += ' cstd';
    var path = page.replace(/^https?:\/\/[^\/]+/, '');
    var src = el.querySelector('.cstd-src');
    var srcHtml = src ? src.innerHTML : '';
    var source = srcHtml ? Promise.resolve(parse(srcHtml)) : load(path);

    el.innerHTML = elRow + '<div class="cstd-msg">Loading course dates…</div>';

    source.then(function (list) {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var dates = list.filter(function (x) { return x.t >= today.getTime(); }).sort(function (a, b) { return a.t - b.t; });

      if (!dates.length) {
        el.innerHTML = elRow + '<div class="cstd-msg">Dates didn\'t load just now. <a href="' + page + '">See all course dates</a> or call 020 3488 4472.</div>';
        return;
      }

      var allIndex = elRow ? 1 : 0;
      var rows = elRow ? [elRow] : [];
      dates.forEach(function (x, i) {
        var d = new Date(x.t);
        var cls = 't-dt' + (allIndex + i >= show ? ' x-all' : '') + (i >= show ? ' x-dt' : '');
        rows.push(row(cls, d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(), DAYS[d.getDay()] + ' start',
          '<strong>' + label + '</strong> ' + desc, x.price, '/cart/?add-to-cart=' + x.id));
      });

      var id = 'cstd' + n;
      var html = '';
      if (elRow) {
        html += '<input type="radio" class="cstd-r cstd-r-all" name="' + id + '" id="' + id + '-all" checked>' +
          '<input type="radio" class="cstd-r cstd-r-el" name="' + id + '" id="' + id + '-el">' +
          '<input type="radio" class="cstd-r cstd-r-dt" name="' + id + '" id="' + id + '-dt">';
      } else {
        html += '<input type="radio" class="cstd-r cstd-r-dt" name="' + id + '" id="' + id + '-dt" checked>';
      }
      html += '<input type="checkbox" class="cstd-r cstd-m" id="' + id + '-more">';
      if (elRow) {
        html += '<div class="cstd-filters">' +
          '<label class="cstd-pill p-all" for="' + id + '-all">All dates</label>' +
          '<label class="cstd-pill p-el" for="' + id + '-el">E-learning</label>' +
          '<label class="cstd-pill p-dt" for="' + id + '-dt">' + label + '</label></div>';
      }
      html += '<div class="cstd-list">' + rows.join('') + '</div>';
      if (rows.length > show) {
        html += '<div class="cstd-morewrap' + (dates.length > show ? '' : ' no-dt') + '"><label class="cstd-more" for="' + id + '-more">Show more dates</label></div>';
      }
      el.innerHTML = html;
    }).catch(function () {
      el.innerHTML = elRow + '<div class="cstd-msg"><a href="' + page + '">See all course dates</a> or call 020 3488 4472.</div>';
    });
  }

  function start() {
    var mounts = document.querySelectorAll('[data-cst-dates]');
    if (!mounts.length) return;
    css();
    Array.prototype.forEach.call(mounts, init);
    if (window.console) console.log('CST dates v7 loaded');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

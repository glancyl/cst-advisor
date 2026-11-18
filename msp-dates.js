/* CST Training course dates list (MSP pages) v3
   Reads upcoming dates from the course's own dates page (the WooCommerce
   category page, already cached by NitroPack so it loads fast), then renders:
   e-learning "Start today" row first, then dated virtual classroom rows.

   Mount on the page:
   <div data-cst-dates data-dates-page="https://www.csttraining.co.uk/msp-foundation-5th-edition/"
        data-elearning-price="£1,000 + VAT" data-elearning-url="https://..."
        data-course-label="3-day course" data-course-desc="online on Google Meet"> fallback text </div>
   <script nitro-exclude src="https://glancyl.github.io/cst-advisor/msp-dates.js?v=3"></script>
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
      '.cstd-filters{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:0 0 22px}' +
      '.cstd-pill{border:0;background:#fff;color:#1d2560;font-weight:700;font-size:15px;padding:11px 20px;border-radius:999px;cursor:pointer}' +
      '.cstd-pill.on{background:#4c6bd8;color:#fff}' +
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
      '.cstd-more{display:block;margin:18px auto 0;background:transparent;border:2px solid #fff;color:#fff;font-weight:700;font-size:16px;padding:11px 24px;border-radius:999px;cursor:pointer}' +
      '.cstd-msg{color:#fff;text-align:center;padding:12px}' +
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

  function init(el) {
    var page = el.getAttribute('data-dates-page') || el.getAttribute('data-all-link') || '';
    var elPrice = el.getAttribute('data-elearning-price');
    var elUrl = el.getAttribute('data-elearning-url');
    var label = el.getAttribute('data-course-label') || 'Virtual classroom';
    var desc = el.getAttribute('data-course-desc') || 'online';
    var show = parseInt(el.getAttribute('data-show') || '6', 10);
    var elRow = (elPrice && elUrl) ? row('el', 'Start today', 'Any time', '<strong>E-learning</strong> online, at your own pace', elPrice, elUrl) : '';

    el.className += ' cstd';
    el.innerHTML = elRow + '<div class="cstd-msg">Loading course dates…</div>';

    // same-origin path so it works on www and non-www
    var path = page.replace(/^https?:\/\/[^\/]+/, '');

    load(path).then(function (list) {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var dates = list.filter(function (x) { return x.t >= today.getTime(); }).sort(function (a, b) { return a.t - b.t; });

      var rows = [];
      if (elRow) rows.push({ type: 'elearning', html: elRow });
      dates.forEach(function (x) {
        var d = new Date(x.t);
        rows.push({ type: 'dates', html: row('', d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(), DAYS[d.getDay()] + ' start',
          '<strong>' + label + '</strong> ' + desc, x.price, '/cart/?add-to-cart=' + x.id) });
      });

      var fail = !dates.length ? '<div class="cstd-msg">Dates didn\'t load just now. <a href="' + page + '">See all course dates</a> or call 020 3488 4472.</div>' : '';
      var filter = 'all', limit = show;

      function render() {
        var vis = rows.filter(function (r) { return filter === 'all' || r.type === filter; });
        var html = '';
        if (elRow && dates.length) {
          html += '<div class="cstd-filters">' +
            '<button class="cstd-pill' + (filter === 'all' ? ' on' : '') + '" data-f="all">All dates</button>' +
            '<button class="cstd-pill' + (filter === 'elearning' ? ' on' : '') + '" data-f="elearning">E-learning</button>' +
            '<button class="cstd-pill' + (filter === 'dates' ? ' on' : '') + '" data-f="dates">' + label + '</button></div>';
        }
        html += vis.slice(0, limit).map(function (r) { return r.html; }).join('') + fail;
        if (vis.length > limit) html += '<button class="cstd-more">Show more dates</button>';
        el.innerHTML = html;
        Array.prototype.forEach.call(el.querySelectorAll('.cstd-pill'), function (b) {
          b.addEventListener('click', function () { filter = b.getAttribute('data-f'); limit = show; render(); });
        });
        var more = el.querySelector('.cstd-more');
        if (more) more.addEventListener('click', function () { limit += show; render(); });
      }
      render();
    }).catch(function () {
      el.innerHTML = elRow + '<div class="cstd-msg"><a href="' + page + '">See all course dates</a> or call 020 3488 4472.</div>';
    });
  }

  function start() {
    var mounts = document.querySelectorAll('[data-cst-dates]');
    if (!mounts.length) return;
    css();
    Array.prototype.forEach.call(mounts, init);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

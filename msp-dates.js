/* CST Training course dates list (MSP pages)
   Reads live products from the WooCommerce Store API and renders the
   e-learning product first, then upcoming virtual classroom dates.

   Mount on the page:
   <div data-cst-dates data-category="2455" data-elearning="140080"
        data-course-label="3-day course" data-course-desc="online on Google Meet, 3 consecutive days"></div>
   <script src="https://glancyl.github.io/cst-advisor/msp-dates.js?v=2"></script>
*/
(function () {
  var API = '/wp-json/wc/store/v1/products';
  var FIELDS = '_fields=id,name,permalink,prices,is_in_stock,is_purchasable';
  var CACHE_MINS = 30;

  function cached(key, url) {
    try {
      var hit = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (hit && Date.now() - hit.t < CACHE_MINS * 60000) return Promise.resolve(hit.d);
    } catch (e) {}
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 10000);
    return fetch(url, ctrl ? { signal: ctrl.signal } : {}).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        clearTimeout(timer);
        if (d) { try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {} }
        return d;
      }).catch(function () { clearTimeout(timer); return null; });
  }

  function css() {
    if (document.getElementById('cstd-css')) return;
    var s = document.createElement('style');
    s.id = 'cstd-css';
    s.textContent =
      '.cstd{max-width:1030px;margin:0 auto;font-family:inherit}' +
      '.cstd-filters{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:0 0 22px}' +
      '.cstd-pill{border:0;background:#fff;color:#1d2560;font-weight:700;font-size:15px;padding:11px 20px;border-radius:999px;cursor:pointer}' +
      '.cstd-pill.on{background:#4c6bd8;color:#fff}' +
      '.cstd-row{display:flex;align-items:center;gap:20px;background:#fff;border-left:5px solid #ff8c04;border-radius:10px;padding:14px 18px;margin:0 0 10px}' +
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
      '@media(max-width:700px){.cstd-row{flex-wrap:wrap;gap:8px 14px}.cstd-when{flex:1 1 100%}.cstd-what{flex:1 1 100%}.cstd-price{flex:1}}';
    document.head.appendChild(s);
  }

  function txt(html) {
    var t = document.createElement('textarea');
    t.innerHTML = String(html || '').replace(/<[^>]+>/g, '');
    return t.value;
  }

  function money(p) {
    if (!p || p.prices == null) return '';
    var n = Number(p.prices.price) / Math.pow(10, p.prices.currency_minor_unit || 2);
    return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' + VAT';
  }

  function parseDate(name) {
    var m = /(\d{2})-(\d{2})-(\d{4})/.exec(name);
    return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null;
  }

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function row(cls, date, day, what, price, href) {
    return '<div class="cstd-row ' + cls + '"><div class="cstd-when"><div class="cstd-date">' + date +
      '</div><div class="cstd-day">' + day + '</div></div><div class="cstd-what">' + what +
      '</div><div class="cstd-price">' + price + '</div><a class="cstd-book" href="' + href + '">Book now</a></div>';
  }

  function init(el) {
    var cat = el.getAttribute('data-category');
    var elId = el.getAttribute('data-elearning');
    var label = el.getAttribute('data-course-label') || 'Virtual classroom';
    var desc = el.getAttribute('data-course-desc') || 'online';
    var show = parseInt(el.getAttribute('data-show') || '6', 10);
    var allLink = el.getAttribute('data-all-link') || '';
    var elPrice = el.getAttribute('data-elearning-price');
    var elUrl = el.getAttribute('data-elearning-url');

    // E-learning row shows instantly from the page's own attributes, no API call needed
    var instantEl = (elPrice && elUrl) ? { permalink: elUrl, _price: elPrice } : null;
    if (instantEl) {
      el.innerHTML = row('el', 'Start today', 'Any time', '<strong>E-learning</strong> online, at your own pace', instantEl._price, elUrl) +
        '<div class="cstd-msg">Loading course dates…</div>';
    } else {
      el.innerHTML = '<div class="cstd-msg">Loading dates…</div>';
    }

    var getEl = instantEl ? Promise.resolve(instantEl) : (elId ? cached('cstd-p-' + elId, API + '/' + elId + '?' + FIELDS) : Promise.resolve(null));
    var getDates = cat ? cached('cstd-c-' + cat, API + '?category=' + encodeURIComponent(cat) + '&per_page=100&' + FIELDS).then(function (d) { return d || []; }) : Promise.resolve([]);

    Promise.all([getEl, getDates]).then(function (res) {
      var el1 = res[0], list = res[1] || [];
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var dates = list.map(function (p) { return { p: p, d: parseDate(txt(p.name)) }; })
        .filter(function (x) { return x.d && x.d >= today && x.p.is_in_stock !== false && x.p.is_purchasable !== false; })
        .sort(function (a, b) { return a.d - b.d; });

      var rows = [];
      if (el1) rows.push({ type: 'elearning', html: row('el', 'Start today', 'Any time', '<strong>E-learning</strong> online, at your own pace', el1._price || money(el1), el1.permalink) });
      dates.forEach(function (x) {
        rows.push({ type: 'dates', html: row('', x.d.getDate() + ' ' + MONTHS[x.d.getMonth()] + ' ' + x.d.getFullYear(), DAYS[x.d.getDay()] + ' start',
          '<strong>' + label + '</strong> ' + desc, money(x.p), '/cart/?add-to-cart=' + x.p.id) });
      });

      if (!dates.length && allLink) {
        rows.push({ type: 'dates', html: '<div class="cstd-msg">Dates didn\'t load. <a href="' + allLink + '">See all course dates</a> or call 020 3488 4472.</div>' });
      }
      if (!rows.length) {
        el.innerHTML = '<div class="cstd-msg">We couldn\'t load dates just now. <a href="' + (allLink || '/contact/') + '">See all dates</a> or call 020 3488 4472.</div>';
        return;
      }

      var filter = 'all', limit = show;
      function render() {
        var vis = rows.filter(function (r) { return filter === 'all' || r.type === filter; });
        var html = '<div class="cstd-filters">' +
          '<button class="cstd-pill' + (filter === 'all' ? ' on' : '') + '" data-f="all">All dates</button>' +
          (el1 ? '<button class="cstd-pill' + (filter === 'elearning' ? ' on' : '') + '" data-f="elearning">E-learning</button>' : '') +
          (dates.length ? '<button class="cstd-pill' + (filter === 'dates' ? ' on' : '') + '" data-f="dates">' + label + '</button>' : '') +
          '</div>';
        html += vis.slice(0, limit).map(function (r) { return r.html; }).join('');
        if (vis.length > limit) html += '<button class="cstd-more">Show more dates</button>';
        el.innerHTML = html;
        el.querySelectorAll('.cstd-pill').forEach(function (b) {
          b.addEventListener('click', function () { filter = b.getAttribute('data-f'); limit = show; render(); });
        });
        var more = el.querySelector('.cstd-more');
        if (more) more.addEventListener('click', function () { limit += show; render(); });
      }
      render();
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

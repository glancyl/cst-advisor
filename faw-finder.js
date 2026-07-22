(function () {
  var LOCATIONS = [
    { name: "Dartford", url: "https://www.csttraining.co.uk/faw-dartford/", lat: 51.4462, lon: 0.2196, region: "Greater London" },
    { name: "Croydon", url: "https://www.csttraining.co.uk/faw-croydon/", lat: 51.3762, lon: -0.0982, region: "Greater London" },
    { name: "Central London", url: "https://www.csttraining.co.uk/faw-central-london/", lat: 51.5074, lon: -0.1278, region: "Greater London" },
    { name: "Leeds", url: "https://www.csttraining.co.uk/faw-leeds/", lat: 53.8008, lon: -1.5491, region: "Yorkshire" },
    { name: "Sheffield", url: "https://www.csttraining.co.uk/faw-sheffield/", lat: 53.3811, lon: -1.4701, region: "Yorkshire" },
    { name: "Birmingham", url: "https://www.csttraining.co.uk/faw-birmingham/", lat: 52.4862, lon: -1.8904, region: "Midlands" },
    { name: "Chelmsford", url: "https://www.csttraining.co.uk/faw-chelmsford/", lat: 51.7356, lon: 0.4685, region: "Essex" },
    { name: "Manchester", url: "https://www.csttraining.co.uk/faw-manchester/", lat: 53.4808, lon: -2.2426, region: "North West England" },
    { name: "Milton Keynes", url: "https://www.csttraining.co.uk/faw-milton-keynes/", lat: 52.0406, lon: -0.7594, region: "South East England" },
    { name: "Bristol", url: "https://www.csttraining.co.uk/faw-bristol/", lat: 51.4545, lon: -2.5879, region: "South West England" }
  ];

  var REGION_PAGES = {
    "Greater London": { label: "All Greater London Dates", url: "https://www.csttraining.co.uk/faw-greater-london/" },
    "Yorkshire": { label: "All Yorkshire Dates", url: "https://www.csttraining.co.uk/faw-yorkshire/" },
    "Midlands": { label: "All Midlands Dates", url: "https://www.csttraining.co.uk/faw-midlands/" },
    "Essex": { label: "All Essex Dates", url: "https://www.csttraining.co.uk/faw-essex/" },
    "North West England": { label: "All North West England Dates", url: "https://www.csttraining.co.uk/faw-north-west-england/" },
    "South East England": { label: "All South East England Dates", url: "https://www.csttraining.co.uk/faw-south-east-england/" },
    "South West England": { label: "All South West England Dates", url: "https://www.csttraining.co.uk/faw-south-west-england/" }
  };

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

  function geocode(postcode) {
    var clean = postcode.trim().replace(/\s+/g, '');
    return fetch('https://api.postcodes.io/postcodes/' + encodeURIComponent(postcode.trim()))
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

  function init() {
    var root = document.getElementById('cst-postcode-finder-faw');
    if (!root) return;

    root.innerHTML = '';
    root.style.cssText = 'max-width:640px;margin:32px auto;font-family:Inter,Arial,sans-serif;color:#1c2560;text-align:center;';

    var heading = document.createElement('h3');
    heading.textContent = 'Find your nearest First Aid at Work course';
    heading.style.cssText = 'font-family:Montserrat,Arial,sans-serif;font-size:22px;font-weight:bold;margin:0 0 6px;color:#1c2560;';
    root.appendChild(heading);

    var subtext = document.createElement('p');
    subtext.textContent = 'Enter your postcode to see the closest Level 3 First Aid at Work training locations';
    subtext.style.cssText = 'margin:0 0 18px;font-size:15px;color:#4a4f6b;';
    root.appendChild(subtext);

    var inputRow = document.createElement('div');
    inputRow.style.cssText = 'display:flex;gap:10px;justify-content:center;flex-wrap:wrap;';

    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'e.g. DA1 5FS';
    input.maxLength = 8;
    input.autocomplete = 'postal-code';
    input.style.cssText = 'flex:1 1 220px;max-width:260px;padding:13px 16px;font-size:16px;border:2px solid #d7d9e6;border-radius:8px;outline:none;text-transform:uppercase;';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Find Courses';
    btn.style.cssText = 'background:#1C2560;color:#fff;border:none;padding:13px 26px;font-size:16px;font-weight:600;border-radius:8px;cursor:pointer;';

    inputRow.appendChild(input);
    inputRow.appendChild(btn);
    root.appendChild(inputRow);

    var msg = document.createElement('div');
    msg.style.cssText = 'margin-top:14px;font-size:14px;min-height:20px;';
    root.appendChild(msg);

    var results = document.createElement('div');
    results.style.cssText = 'display:none;margin-top:22px;text-align:left;border:1px solid #e3e5f0;border-radius:12px;padding:22px 26px;background:#f7f8fc;';
    root.appendChild(results);

    var regionHeading = document.createElement('h4');
    regionHeading.textContent = 'Region';
    regionHeading.style.cssText = 'margin:0 0 4px;font-size:15px;text-transform:uppercase;letter-spacing:0.04em;color:#6b7099;font-weight:700;';
    results.appendChild(regionHeading);

    var regionLink = document.createElement('a');
    regionLink.target = '_blank';
    regionLink.rel = 'noopener';
    regionLink.textContent = 'Loading...';
    regionLink.style.cssText = 'display:inline-block;font-size:19px;font-weight:700;color:#1C2560;text-decoration:none;border-bottom:2px solid #FF8A00;margin-bottom:16px;';
    results.appendChild(regionLink);

    var gridHeading = document.createElement('h4');
    gridHeading.textContent = '2 Nearest Locations';
    gridHeading.style.cssText = 'margin:16px 0 4px;font-size:15px;text-transform:uppercase;letter-spacing:0.04em;color:#6b7099;font-weight:700;';
    results.appendChild(gridHeading);

    var grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(2,1fr);gap:10px;';
    results.appendChild(grid);

    function setMessage(text, isError) {
      msg.textContent = text || '';
      msg.style.color = isError ? '#c0392b' : '';
      msg.style.fontWeight = isError ? '600' : 'normal';
    }

    function handleSearch() {
      var postcode = input.value;
      if (!postcode || postcode.trim().length < 2) {
        setMessage('Please enter a valid UK postcode.', true);
        return;
      }
      setMessage('Searching...', false);
      results.style.display = 'none';
      btn.disabled = true;

      geocode(postcode).then(function(loc) {
        var ranked = LOCATIONS.map(function(l) {
          return { loc: l, dist: haversineMiles(loc.lat, loc.lon, l.lat, l.lon) };
        }).sort(function(a, b) { return a.dist - b.dist; });

        var nearest2 = ranked.slice(0, 2);
        var topRegion = nearest2[0].loc.region;
        var regionInfo = REGION_PAGES[topRegion];

        if (regionInfo) {
          regionLink.textContent = regionInfo.label;
          regionLink.href = regionInfo.url;
        }

        trackSearch(loc.postcode, topRegion, nearest2[0].loc.name);

        grid.innerHTML = '';
        nearest2.forEach(function(item) {
          var a = document.createElement('a');
          a.href = item.loc.url;
          a.target = '_blank';
          a.rel = 'noopener';
          a.style.cssText = 'display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #e3e5f0;border-radius:8px;padding:12px 14px;text-decoration:none;color:#1C2560;font-weight:600;font-size:15px;';
          var nameSpan = document.createElement('span');
          nameSpan.textContent = item.loc.name;
          var distSpan = document.createElement('span');
          distSpan.textContent = item.dist.toFixed(1) + ' mi';
          distSpan.style.cssText = 'font-weight:400;font-size:12px;color:#8a8fb0;white-space:nowrap;margin-left:8px;';
          a.appendChild(nameSpan);
          a.appendChild(distSpan);
          grid.appendChild(a);
        });

        setMessage('', false);
        results.style.display = 'block';
      }).catch(function() {
        setMessage("Sorry, we couldn't find that postcode. Please check it and try again.", true);
      }).finally(function() {
        btn.disabled = false;
      });
    }

    btn.addEventListener('click', handleSearch);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') handleSearch();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

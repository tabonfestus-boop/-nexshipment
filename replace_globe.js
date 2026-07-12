const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Find start and end markers
const START = `  <section id="global-network" style="background:linear-gradient(160deg,#040C28 0%,#071435 50%,#0A1A40 100%);padding:100px 0;position:relative;overflow:hidden;">`;
const END = `  </script>`;  // we need the one right after the globe IIFE

const startIdx = c.indexOf(START);
// Find the </script> that closes the globe IIFE - it comes after })();
const iifeEnd = c.indexOf('  })();\r\n  </script>');
const endIdx = iifeEnd + '  })();\r\n  </script>'.length;

if (startIdx === -1 || iifeEnd === -1) {
  console.log('Could not find markers. startIdx:', startIdx, 'iifeEnd:', iifeEnd);
  process.exit(1);
}

const newSection = `  <!-- ════════════════════════════════════════
       GLOBAL NETWORK - REAL 3D GLOBE
  ════════════════════════════════════════ -->
  <section id="global-network" style="background:linear-gradient(160deg,#020818 0%,#040f26 60%,#071435 100%);padding:80px 0 100px;position:relative;overflow:hidden;">

    <!-- subtle star field background -->
    <div id="globe-stars" style="position:absolute;inset:0;pointer-events:none;z-index:0;"></div>

    <div class="container" style="position:relative;z-index:2;">

      <!-- ── HEADER ── -->
      <div style="text-align:center;max-width:680px;margin:0 auto 56px;" class="reveal">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);padding:7px 16px;border-radius:40px;margin-bottom:22px;">
          <span style="width:8px;height:8px;background:#22c55e;border-radius:50%;box-shadow:0 0 8px #22c55e;animation:ping 2s infinite;display:inline-block;"></span>
          <span style="color:#4ade80;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">Live Operations Dashboard</span>
        </div>
        <h2 style="color:white;font-family:var(--font-head);font-size:clamp(2rem,5vw,3.2rem);font-weight:900;line-height:1.08;margin-bottom:18px;">
          Global Network <span style="color:var(--orange);">In Motion</span>
        </h2>
        <p style="color:rgba(255,255,255,0.55);font-size:1.05rem;line-height:1.7;">
          Watch our active shipments moving across 192+ countries in real-time. Over 2,400 active flights and sea freight routes managed daily.
        </p>
      </div>

      <!-- ── TWO-COLUMN LAYOUT: Globe left, Stats right ── -->
      <div style="display:grid;grid-template-columns:1fr 380px;gap:40px;align-items:center;max-width:1100px;margin:0 auto;" class="reveal" id="globe-layout">

        <!-- Globe container -->
        <div style="position:relative;">
          <div id="globe-3d" style="width:100%;height:560px;border-radius:24px;overflow:hidden;"></div>
          <!-- soft vignette over edges -->
          <div style="position:absolute;inset:0;border-radius:24px;box-shadow:inset 0 0 80px rgba(2,8,24,0.7);pointer-events:none;"></div>
        </div>

        <!-- Right side: stats + route cards -->
        <div style="display:flex;flex-direction:column;gap:16px;">

          <!-- Live count card -->
          <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:28px 28px 24px;backdrop-filter:blur(20px);">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;">
              <span style="width:7px;height:7px;background:#F97316;border-radius:50%;box-shadow:0 0 8px #F97316;animation:ping 1.5s infinite;display:inline-block;"></span>
              <span style="color:rgba(255,255,255,0.5);font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Live Network Pulse</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
              <div>
                <div style="font-family:var(--font-head);font-size:2.2rem;font-weight:900;color:white;line-height:1;" id="live-routes">12,491</div>
                <div style="font-size:0.65rem;color:var(--orange);text-transform:uppercase;letter-spacing:0.13em;font-weight:800;margin-top:6px;">Active Routes</div>
              </div>
              <div>
                <div style="font-family:var(--font-head);font-size:2.2rem;font-weight:900;color:#4ade80;line-height:1;">192</div>
                <div style="font-size:0.65rem;color:#4ade80;text-transform:uppercase;letter-spacing:0.13em;font-weight:800;margin-top:6px;">Countries</div>
              </div>
            </div>
          </div>

          <!-- Metric tiles -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="background:rgba(249,115,22,0.08);border:1px solid rgba(249,115,22,0.2);border-radius:16px;padding:20px 18px;">
              <div style="font-family:var(--font-head);font-size:1.7rem;font-weight:900;color:white;line-height:1;">2,400+</div>
              <div style="font-size:0.62rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-top:6px;">Flights / Day</div>
            </div>
            <div style="background:rgba(96,165,250,0.08);border:1px solid rgba(96,165,250,0.2);border-radius:16px;padding:20px 18px;">
              <div style="font-family:var(--font-head);font-size:1.7rem;font-weight:900;color:#60a5fa;line-height:1;">340</div>
              <div style="font-size:0.62rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-top:6px;">Ports Covered</div>
            </div>
            <div style="background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);border-radius:16px;padding:20px 18px;">
              <div style="font-family:var(--font-head);font-size:1.7rem;font-weight:900;color:#4ade80;line-height:1;">98.7%</div>
              <div style="font-size:0.62rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-top:6px;">On-Time Rate</div>
            </div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px 18px;">
              <div style="font-family:var(--font-head);font-size:1.7rem;font-weight:900;color:white;line-height:1;">3.2d</div>
              <div style="font-size:0.62rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-top:6px;">Avg Transit</div>
            </div>
          </div>

          <!-- Active routes list -->
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:20px 20px 16px;">
            <div style="font-size:0.65rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-bottom:14px;">Top Active Corridors</div>
            <div style="display:flex;flex-direction:column;gap:10px;" id="corridors-list">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:rgba(255,255,255,0.75);font-size:0.82rem;">🌍 London → Dubai</span>
                <span style="color:var(--orange);font-size:0.75rem;font-weight:700;">248 pkg</span>
              </div>
              <div style="height:1px;background:rgba(255,255,255,0.06);"></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:rgba(255,255,255,0.75);font-size:0.82rem;">🌏 Singapore → Tokyo</span>
                <span style="color:var(--orange);font-size:0.75rem;font-weight:700;">183 pkg</span>
              </div>
              <div style="height:1px;background:rgba(255,255,255,0.06);"></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:rgba(255,255,255,0.75);font-size:0.82rem;">🌎 New York → Paris</span>
                <span style="color:var(--orange);font-size:0.75rem;font-weight:700;">312 pkg</span>
              </div>
              <div style="height:1px;background:rgba(255,255,255,0.06);"></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:rgba(255,255,255,0.75);font-size:0.82rem;">🌍 Dubai → Johannesburg</span>
                <span style="color:#4ade80;font-size:0.75rem;font-weight:700;">97 pkg</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- Globe.gl CDN -->
  <script src="https://unpkg.com/globe.gl@2.31.1/dist/globe.gl.min.js"></script>
  <script>
  (function(){
    var el = document.getElementById('globe-3d');
    if(!el) return;

    // Generate star field
    (function(){
      var stars = document.getElementById('globe-stars');
      if(!stars) return;
      var html = '';
      for(var i=0;i<200;i++){
        var x=Math.random()*100, y=Math.random()*100;
        var s=(Math.random()*1.5+0.3).toFixed(1);
        var op=(Math.random()*0.6+0.2).toFixed(2);
        html += '<div style="position:absolute;left:'+x+'%;top:'+y+'%;width:'+s+'px;height:'+s+'px;background:white;border-radius:50%;opacity:'+op+';animation:twinkle '+(2+Math.random()*3).toFixed(1)+'s ease-in-out infinite alternate;"></div>';
      }
      stars.innerHTML = html;
    })();

    // Route arcs data
    var ARCS = [
      {startLat:51.5,  startLng:-0.12, endLat:25.2, endLng:55.27,  color:'#F97316', label:'London → Dubai'},
      {startLat:25.2,  startLng:55.27, endLat:1.35, endLng:103.82, color:'#F97316', label:'Dubai → Singapore'},
      {startLat:1.35,  startLng:103.82,endLat:35.68,endLng:139.69, color:'#60a5fa', label:'Singapore → Tokyo'},
      {startLat:40.71, startLng:-74.0, endLat:48.86,endLng:2.35,   color:'#F97316', label:'New York → Paris'},
      {startLat:48.86, startLng:2.35,  endLat:51.5, endLng:-0.12,  color:'#60a5fa', label:'Paris → London'},
      {startLat:25.2,  startLng:55.27, endLat:-26.2,endLng:28.04,  color:'#4ade80', label:'Dubai → Johannesburg'},
      {startLat:40.71, startLng:-74.0, endLat:19.43,endLng:-99.13, color:'#a78bfa', label:'New York → Mexico City'},
      {startLat:35.68, startLng:139.69,endLat:1.35, endLng:103.82, color:'#60a5fa', label:'Tokyo → Singapore'},
      {startLat:-26.2, startLng:28.04, endLat:51.5, endLng:-0.12,  color:'#4ade80', label:'Johannesburg → London'},
      {startLat:19.43, startLng:-99.13,endLat:40.71,endLng:-74.0,  color:'#F97316', label:'Mexico City → New York'},
    ];

    // Hub cities
    var HUBS = [
      {lat:51.5,  lng:-0.12, label:'LONDON',       size:0.6},
      {lat:25.2,  lng:55.27, label:'DUBAI',         size:0.7},
      {lat:1.35,  lng:103.82,label:'SINGAPORE',    size:0.6},
      {lat:35.68, lng:139.69,label:'TOKYO',         size:0.55},
      {lat:40.71, lng:-74.0, label:'NEW YORK',      size:0.65},
      {lat:48.86, lng:2.35,  label:'PARIS',         size:0.5},
      {lat:-26.2, lng:28.04, label:'JOHANNESBURG',  size:0.5},
      {lat:19.43, lng:-99.13,label:'MEXICO CITY',  size:0.45},
    ];

    var globe = Globe()
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#1e60c8')
      .atmosphereAltitude(0.18)
      // Arcs
      .arcsData(ARCS)
      .arcColor('color')
      .arcDashLength(0.4)
      .arcDashGap(0.2)
      .arcDashAnimateTime(2200)
      .arcStroke(0.5)
      .arcAltitude(0.3)
      // Hub points
      .pointsData(HUBS)
      .pointColor(function(){ return '#F97316'; })
      .pointAltitude(0.01)
      .pointRadius('size')
      .pointsMerge(false)
      // Labels
      .labelsData(HUBS)
      .labelLat('lat')
      .labelLng('lng')
      .labelText('label')
      .labelSize(0.5)
      .labelDotRadius(0.35)
      .labelColor(function(){ return 'rgba(255,255,255,0.9)'; })
      .labelResolution(3)
      (el);

    // Responsive sizing
    function resize(){
      var w = el.offsetWidth;
      globe.width(w).height(Math.max(w*0.75, 400));
    }
    resize();
    window.addEventListener('resize', resize);

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;
    globe.controls().enableZoom = false;

    // Start at a good angle showing Europe/Africa/Asia
    globe.pointOfView({lat:20, lng:20, altitude:2.2}, 0);

    // Animate live routes counter
    (function(){
      var el2 = document.getElementById('live-routes');
      if(!el2) return;
      var base = 12491;
      setInterval(function(){
        base += Math.floor(Math.random()*3 - 1);
        el2.textContent = base.toLocaleString();
      }, 3000);
    })();

  })();
  </script>

  <style>
    @keyframes twinkle { from{opacity:0.15} to{opacity:0.85} }
    #globe-layout { transition: all 0.3s; }
    @media (max-width: 900px) {
      #globe-layout { grid-template-columns: 1fr !important; }
      #globe-3d { height: 380px !important; }
    }
    @media (max-width: 560px) {
      #globe-3d { height: 300px !important; }
    }
  </style>`;

// Replace from START through the old script closing tag
c = c.substring(0, startIdx) + newSection + c.substring(endIdx);

fs.writeFileSync('index.html', c);
console.log('✅ Real 3D Globe section implemented. File size:', c.length, 'bytes');

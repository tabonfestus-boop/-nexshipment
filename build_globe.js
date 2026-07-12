const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const GLOB_START = `  <!-- ════════════════════════════════════════\n       GLOBAL NETWORK - REAL 3D GLOBE`;
const SERV_START = `  <!-- ════════════════════════════════════════\r\n       SERVICES SECTION`;

let si = html.indexOf(GLOB_START);
// Second occurrence of services section
let ei = html.indexOf(SERV_START, html.indexOf(SERV_START) + 10);
if (ei === -1) ei = html.lastIndexOf(SERV_START);

if (si === -1 || ei === -1) {
  console.error('Markers not found. si=', si, 'ei=', ei);
  process.exit(1);
}

console.log('Replacing lines', html.substring(0,si).split('\n').length, 'to', html.substring(0,ei).split('\n').length);

const NEW_SECTION = `  <!-- ════════════════════════════════════════
       GLOBAL NETWORK - REAL 3D GLOBE
  ════════════════════════════════════════ -->
  <section id="global-network" style="background:linear-gradient(160deg,#010812 0%,#020c1a 60%,#040f20 100%);padding:80px 0 100px;position:relative;overflow:hidden;">

    <canvas id="star-cv" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;"></canvas>

    <div class="container" style="position:relative;z-index:2;">

      <div style="text-align:center;max-width:680px;margin:0 auto 56px;" class="reveal">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);padding:7px 18px;border-radius:40px;margin-bottom:22px;">
          <span style="width:8px;height:8px;background:#22c55e;border-radius:50%;box-shadow:0 0 8px #22c55e;animation:ping 2s infinite;display:inline-block;"></span>
          <span style="color:#4ade80;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">Live Operations Dashboard</span>
        </div>
        <h2 style="color:white;font-family:var(--font-head);font-size:clamp(2rem,5vw,3.2rem);font-weight:900;line-height:1.08;margin-bottom:18px;">
          Global Network <span style="color:var(--orange);">In Motion</span>
        </h2>
        <p style="color:rgba(255,255,255,0.55);font-size:1.05rem;line-height:1.7;">
          Real-time shipments across 192+ countries. Over 2,400 active flights and sea freight routes managed daily.
        </p>
      </div>

      <div id="gn-layout" style="display:grid;grid-template-columns:1fr 360px;gap:40px;align-items:center;max-width:1120px;margin:0 auto;">

        <!-- Globe -->
        <div style="position:relative;display:flex;justify-content:center;align-items:center;">
          <div id="globe-3d" style="width:520px;height:520px;max-width:100%;position:relative;z-index:1;"></div>
        </div>

        <!-- Stats panel -->
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:22px;padding:26px;backdrop-filter:blur(20px);">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;">
              <span style="width:7px;height:7px;background:#F97316;border-radius:50%;box-shadow:0 0 8px #F97316;animation:ping 1.5s infinite;display:inline-block;"></span>
              <span style="color:rgba(255,255,255,0.45);font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">Live Network Pulse</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div>
                <div style="font-family:var(--font-head);font-size:2.2rem;font-weight:900;color:white;line-height:1;" id="live-routes">12,491</div>
                <div style="font-size:0.63rem;color:var(--orange);text-transform:uppercase;letter-spacing:0.13em;font-weight:800;margin-top:6px;">Active Routes</div>
              </div>
              <div>
                <div style="font-family:var(--font-head);font-size:2.2rem;font-weight:900;color:#4ade80;line-height:1;">192</div>
                <div style="font-size:0.63rem;color:#4ade80;text-transform:uppercase;letter-spacing:0.13em;font-weight:800;margin-top:6px;">Countries</div>
              </div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="background:rgba(249,115,22,0.09);border:1px solid rgba(249,115,22,0.25);border-radius:16px;padding:18px 16px;">
              <div style="font-family:var(--font-head);font-size:1.65rem;font-weight:900;color:white;line-height:1;">2,400+</div>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-top:6px;">Flights / Day</div>
            </div>
            <div style="background:rgba(96,165,250,0.09);border:1px solid rgba(96,165,250,0.22);border-radius:16px;padding:18px 16px;">
              <div style="font-family:var(--font-head);font-size:1.65rem;font-weight:900;color:#60a5fa;line-height:1;">340</div>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-top:6px;">Ports Covered</div>
            </div>
            <div style="background:rgba(74,222,128,0.09);border:1px solid rgba(74,222,128,0.22);border-radius:16px;padding:18px 16px;">
              <div style="font-family:var(--font-head);font-size:1.65rem;font-weight:900;color:#4ade80;line-height:1;">98.7%</div>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-top:6px;">On-Time Rate</div>
            </div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:18px 16px;">
              <div style="font-family:var(--font-head);font-size:1.65rem;font-weight:900;color:white;line-height:1;">3.2d</div>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-top:6px;">Avg Transit</div>
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:20px 18px 16px;">
            <div style="font-size:0.63rem;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-bottom:14px;">Top Active Corridors</div>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:rgba(255,255,255,0.72);font-size:0.8rem;">🌍 London → Dubai</span>
                <span style="color:var(--orange);font-size:0.72rem;font-weight:700;">248 pkg</span>
              </div>
              <div style="height:1px;background:rgba(255,255,255,0.05);"></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:rgba(255,255,255,0.72);font-size:0.8rem;">🌏 Singapore → Tokyo</span>
                <span style="color:var(--orange);font-size:0.72rem;font-weight:700;">183 pkg</span>
              </div>
              <div style="height:1px;background:rgba(255,255,255,0.05);"></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:rgba(255,255,255,0.72);font-size:0.8rem;">🌎 New York → Paris</span>
                <span style="color:var(--orange);font-size:0.72rem;font-weight:700;">312 pkg</span>
              </div>
              <div style="height:1px;background:rgba(255,255,255,0.05);"></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:rgba(255,255,255,0.72);font-size:0.8rem;">🌍 Dubai → Johannesburg</span>
                <span style="color:#4ade80;font-size:0.72rem;font-weight:700;">97 pkg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <style>
    @media (max-width:960px){
      #gn-layout{grid-template-columns:1fr!important;}
      #globe-3d{width:100%!important;height:380px!important;}
    }
    @media (max-width:520px){#globe-3d{height:300px!important;}}
  </style>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script>
  /* ── Starfield ─────────────────────────────── */
  (function(){
    var cv=document.getElementById('star-cv');
    if(!cv)return;
    function paint(){
      cv.width=cv.offsetWidth||window.innerWidth;
      cv.height=cv.offsetHeight||700;
      var ctx=cv.getContext('2d');
      ctx.clearRect(0,0,cv.width,cv.height);
      for(var i=0;i<300;i++){
        var x=Math.random()*cv.width,y=Math.random()*cv.height;
        var r=Math.random()*1.4+0.2;
        var a=Math.random()*0.75+0.1;
        ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,'+a.toFixed(2)+')';ctx.fill();
      }
    }
    paint();
    window.addEventListener('resize',paint);
  })();

  /* ── Real 3D Globe ─────────────────────────── */
  (function(){
    var container=document.getElementById('globe-3d');
    if(!container||typeof THREE==='undefined')return;

    var W=container.offsetWidth||520;
    var H=container.offsetHeight||520;

    /* Renderer */
    var renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setSize(W,H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.setClearColor(0x000000,0);
    renderer.shadowMap.enabled=false;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cssText='border-radius:50%;display:block;';

    /* Scene & Camera */
    var scene=new THREE.Scene();
    var camera=new THREE.PerspectiveCamera(40,W/H,0.1,1000);
    camera.position.z=2.8;

    /* Lighting — key light from top-left, soft fill from right */
    scene.add(new THREE.AmbientLight(0x111122,1.8));
    var sunLight=new THREE.DirectionalLight(0xfff4e8,3.5);
    sunLight.position.set(-3,2,4);
    scene.add(sunLight);
    var fillLight=new THREE.DirectionalLight(0x223366,0.4);
    fillLight.position.set(4,-1,-3);
    scene.add(fillLight);

    /* ── Helper: lat/lng → 3D unit vector ──── */
    function ll2v(lat,lng,r){
      r=r||1;
      var ph=(90-lat)*Math.PI/180;
      var th=(lng+180)*Math.PI/180;
      return new THREE.Vector3(
        -r*Math.sin(ph)*Math.cos(th),
         r*Math.cos(ph),
         r*Math.sin(ph)*Math.sin(th)
      );
    }

    /* ── Proper atmosphere shader (Fresnel) ── */
    function makeAtmosphere(innerR,outerR,color,coeff,power){
      var geo=new THREE.SphereGeometry(outerR,64,64);
      var mat=new THREE.ShaderMaterial({
        uniforms:{
          glowColor:{value:new THREE.Color(color)},
          coeff:{value:coeff||0.7},
          power:{value:power||5.0}
        },
        vertexShader:[
          'varying vec3 vNormal;',
          'void main(){',
          '  vNormal=normalize(normalMatrix*normal);',
          '  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);',
          '}'
        ].join('\\n'),
        fragmentShader:[
          'uniform vec3 glowColor;',
          'uniform float coeff;',
          'uniform float power;',
          'varying vec3 vNormal;',
          'void main(){',
          '  float intensity=pow(coeff-dot(vNormal,vec3(0.0,0.0,1.0)),power);',
          '  intensity=clamp(intensity,0.0,1.0);',
          '  gl_FragColor=vec4(glowColor,intensity);',
          '}'
        ].join('\\n'),
        side:THREE.BackSide,
        blending:THREE.AdditiveBlending,
        transparent:true,
        depthWrite:false
      });
      return new THREE.Mesh(geo,mat);
    }

    /* ── Canvas fallback Earth texture (night) ── */
    function makeNightTexture(){
      var c=document.createElement('canvas');
      c.width=2048;c.height=1024;
      var g=c.getContext('2d');

      /* Deep space ocean */
      g.fillStyle='#050d1a';g.fillRect(0,0,2048,1024);

      /* Subtle ocean depth gradient */
      var og=g.createRadialGradient(1024,512,100,1024,512,1200);
      og.addColorStop(0,'rgba(10,30,80,0.4)');og.addColorStop(1,'rgba(0,0,0,0)');
      g.fillStyle=og;g.fillRect(0,0,2048,1024);

      function px(lat,lng){return[(lng+180)/360*2048,(90-lat)/180*1024];}

      function land(pts,col){
        g.beginPath();
        var p=px(pts[0][0],pts[0][1]);g.moveTo(p[0],p[1]);
        for(var i=1;i<pts.length;i++){p=px(pts[i][0],pts[i][1]);g.lineTo(p[0],p[1]);}
        g.closePath();g.fillStyle=col||'#1a3320';g.fill();
      }

      /* Dark land masses with subtle color variation */
      var DK='#0e2218',MD='#142b1e',LT='#1a3322',DS='#2a1e0a';

      land([[37,10],[32,-5],[20,-17],[14,-17],[5,-5],[0,-8],[-5,-8],[-20,-14],[-35,18],[-35,26],[-27,33],[-11,40],[4,42],[12,44],[22,37],[30,32]],MD);
      land([[36,-9],[44,-9],[47,-5],[52,2],[55,9],[54,19],[55,24],[58,22],[60,25],[70,29],[61,59],[51,42],[47,37],[42,28],[41,29],[40,18],[36,-9]],DK);
      land([[56,8],[59,5],[62,6],[65,14],[68,17],[71,26],[70,29],[66,25],[60,25],[58,22],[56,10]],DK);
      land([[37,27],[42,42],[47,53],[55,73],[55,80],[60,68],[70,68],[72,53],[72,100],[73,130],[65,142],[55,135],[50,140],[45,135],[40,127],[35,120],[22,114],[10,105],[1,104],[5,99],[14,100],[18,102],[23,114],[30,122],[37,27]],MD);
      land([[29,34],[24,37],[12,44],[14,48],[22,59],[24,57],[17,53],[12,50],[20,38],[29,34]],DS);
      land([[22,68],[28,65],[32,74],[34,74],[30,78],[20,87],[8,78],[10,80],[22,68]],DK);
      land([[22,100],[14,100],[10,99],[5,103],[1,104],[5,100],[10,100],[18,102],[22,100]],MD);
      land([[5,94],[0,98],[0,104],[-5,108],[-5,106],[0,104],[-3,102],[-5,95],[5,94]],MD);
      land([[72,-73],[72,-80],[60,-95],[55,-78],[46,-84],[42,-83],[40,-74],[35,-77],[30,-88],[25,-90],[22,-88],[14,-90],[8,-77],[9,-80],[22,-106],[32,-117],[40,-124],[47,-124],[50,-128],[55,-130],[60,-136],[65,-168],[60,-168],[55,-165],[50,-128],[45,-124],[72,-140]],DK);
      land([[60,-44],[70,-23],[76,-18],[83,-30],[83,-40],[76,-58],[68,-52],[60,-44]],'#0d1c26');
      land([[12,-73],[5,-52],[0,-50],[-5,-35],[-23,-43],[-35,-57],[-55,-68],[-55,-64],[-40,-65],[-35,-70],[-18,-70],[-5,-80],[10,-75]],MD);
      land([[-12,131],[-12,136],[-15,140],[-20,149],[-35,151],[-38,147],[-38,140],[-35,138],[-32,116],[-20,114],[-15,124]],'#1c1208');
      land([[32,130],[34,130],[36,136],[37,138],[40,142],[43,140],[41,140],[36,136],[34,130]],DK);
      land([[50,-5],[52,-5],[55,-4],[58,-4],[57,0],[52,2],[50,0],[50,-5]],DK);

      /* City lights — warm golden glows */
      var CITIES=[
        /* Europe */ [51.5,-0.12,10],[48.86,2.35,9],[52.52,13.4,8],[40.71,-74,0,10],
        [41.9,12.5,7],[40.41,-3.7,7],[55.75,37.62,8],[59.33,18.07,6],[55.68,12.57,5],
        [48.2,16.37,6],[50.08,14.47,5],[52.23,21.01,5],[47.5,19.04,5],
        /* Asia */ [35.69,139.69,12],[37.57,126.98,10],[37.44,127.14,9],[25.04,121.56,9],
        [31.23,121.47,11],[39.91,116.39,11],[22.33,114.18,9],[1.35,103.82,10],
        [3.14,101.69,8],[13.75,100.5,8],[28.63,77.22,9],[18.96,72.82,10],[12.97,77.59,7],
        [25.2,55.27,9],[24.46,54.37,7],[21.39,39.86,7],[24.69,46.72,8],
        /* Americas */ [40.71,-74.0,11],[42.36,-71.06,8],[41.88,-87.63,10],
        [34.05,-118.24,10],[37.77,-122.42,9],[47.6,-122.33,8],[43.65,-79.38,8],
        [45.5,-73.57,7],[25.77,-80.19,7],[19.43,-99.13,10],
        [-23.55,-46.63,10],[-34.61,-58.38,9],[-33.87,151.21,9],[-37.81,144.96,7],
        [-26.2,28.04,9],[-33.9,18.42,7],[6.45,3.47,7],[5.55,-0.2,6]
      ];

      CITIES.forEach(function(ci){
        var lat=ci[0],lng=ci[1],sz=(ci[2]||8);
        var p=px(lat,lng);
        /* Inner bright core */
        var rd=g.createRadialGradient(p[0],p[1],0,p[0],p[1],sz*1.5);
        rd.addColorStop(0,'rgba(255,230,120,0.98)');
        rd.addColorStop(0.3,'rgba(255,180,60,0.7)');
        rd.addColorStop(0.7,'rgba(255,120,20,0.25)');
        rd.addColorStop(1,'rgba(255,80,0,0)');
        g.fillStyle=rd;g.beginPath();g.arc(p[0],p[1],sz*1.5,0,Math.PI*2);g.fill();
        /* Bright centre dot */
        g.fillStyle='rgba(255,245,200,0.95)';g.beginPath();g.arc(p[0],p[1],sz*0.35,0,Math.PI*2);g.fill();
      });

      /* Ice caps */
      var icN=g.createLinearGradient(0,0,0,80);
      icN.addColorStop(0,'rgba(160,200,240,0.8)');icN.addColorStop(1,'rgba(100,150,200,0)');
      g.fillStyle=icN;g.fillRect(0,0,2048,80);
      var icS=g.createLinearGradient(0,944,0,1024);
      icS.addColorStop(0,'rgba(100,150,200,0)');icS.addColorStop(1,'rgba(160,200,240,0.8)');
      g.fillStyle=icS;g.fillRect(0,944,2048,80);

      return new THREE.CanvasTexture(c);
    }

    /* ── Build the globe once texture is ready ── */
    function buildGlobe(tex){

      /* Earth sphere */
      var geo=new THREE.SphereGeometry(1,64,64);
      var mat=new THREE.MeshPhongMaterial({
        map:tex,
        specular:new THREE.Color(0x112244),
        shininess:18,
        emissive:new THREE.Color(0x050d1a),
        emissiveIntensity:0.05
      });
      var earth=new THREE.Mesh(geo,mat);
      earth.rotation.y=-0.8;
      scene.add(earth);

      /* Proper Fresnel atmosphere — uses BackSide shader */
      var atm=makeAtmosphere(1,1.12,0x2277ff,0.7,5.5);
      scene.add(atm);
      /* Secondary softer outer glow */
      var atm2=makeAtmosphere(1,1.22,0x1144bb,0.5,7.0);
      scene.add(atm2);

      /* ── Route arcs ───────────────────────────── */
      var HUBS=[
        [51.5,-0.12],[25.2,55.27],[1.35,103.82],[35.68,139.69],
        [40.71,-74.0],[48.86,2.35],[-26.2,28.04],[19.43,-99.13]
      ];
      var ROUTES=[
        [0,1,0xF97316],[1,2,0xF97316],[2,3,0x60a5fa],
        [4,5,0xF97316],[5,0,0x60a5fa],[1,6,0x4ade80],
        [4,7,0xa78bfa],[3,2,0x60a5fa]
      ];

      var arcObjs=[];
      ROUTES.forEach(function(r){
        var s=ll2v(HUBS[r[0]][0],HUBS[r[0]][1]);
        var e=ll2v(HUBS[r[1]][0],HUBS[r[1]][1]);
        var mid=s.clone().add(e).normalize().multiplyScalar(1.6);
        var curve=new THREE.QuadraticBezierCurve3(s,mid,e);
        var pts=curve.getPoints(90);
        var g2=new THREE.BufferGeometry().setFromPoints(pts);
        var m2=new THREE.LineBasicMaterial({color:r[2],transparent:true,opacity:0.7});
        scene.add(new THREE.Line(g2,m2));

        /* Animated ship dot */
        var dg=new THREE.SphereGeometry(0.016,8,8);
        var dm=new THREE.MeshBasicMaterial({color:0xffffff});
        var dot=new THREE.Mesh(dg,dm);
        scene.add(dot);
        arcObjs.push({curve:curve,dot:dot,offset:Math.random()});
      });

      /* Hub markers on the Earth surface (rotate with earth) */
      HUBS.forEach(function(h){
        var pos=ll2v(h[0],h[1],1.012);
        var mg=new THREE.SphereGeometry(0.018,10,10);
        var mm=new THREE.MeshBasicMaterial({color:0xF97316});
        var mk=new THREE.Mesh(mg,mm);
        mk.position.copy(pos);
        earth.add(mk);
        /* Pulse ring — flat disc */
        var rg=new THREE.RingGeometry(0.025,0.035,20);
        var rm=new THREE.MeshBasicMaterial({color:0xF97316,transparent:true,opacity:0.55,side:THREE.DoubleSide});
        var ring=new THREE.Mesh(rg,rm);
        ring.position.copy(pos.clone().multiplyScalar(1.018));
        ring.lookAt(pos.clone().multiplyScalar(3));
        earth.add(ring);
      });

      /* Animate */
      var clock=new THREE.Clock();
      function animate(){
        requestAnimationFrame(animate);
        var elapsed=clock.getElapsedTime();
        earth.rotation.y+=0.0015;
        atm.rotation.y+=0.0015;
        atm2.rotation.y+=0.0015;
        arcObjs.forEach(function(a){
          var u=(elapsed*0.1+a.offset)%1;
          var pos=a.curve.getPoint(u);
          a.dot.position.copy(pos);
        });
        renderer.render(scene,camera);
      }
      animate();
    }

    /* Try real NASA night texture first, fallback to canvas */
    var loader=new THREE.TextureLoader();
    loader.crossOrigin='anonymous';
    loader.load(
      'https://unpkg.com/three-globe/example/img/earth-night.jpg',
      function(tex){buildGlobe(tex);},
      undefined,
      function(){
        console.warn('CDN texture failed, using canvas fallback');
        buildGlobe(new THREE.CanvasTexture(makeNightTexture()));
      }
    );

    /* Responsive */
    window.addEventListener('resize',function(){
      var w=container.offsetWidth,h=container.offsetHeight||w;
      camera.aspect=w/h;camera.updateProjectionMatrix();
      renderer.setSize(w,h);
    });

    /* Live counter */
    var el2=document.getElementById('live-routes');
    if(el2){var base=12491;setInterval(function(){base+=Math.floor(Math.random()*5)-2;el2.textContent=base.toLocaleString();},2800);}

  })();
  </script>

`;

html = html.substring(0, si) + NEW_SECTION + html.substring(ei);
fs.writeFileSync('index.html', html);

var secs=(html.match(/<section/g)||[]).length;
var secsC=(html.match(/<\/section>/g)||[]).length;
var scrs=(html.match(/<script/g)||[]).length;
var scrsC=(html.match(/<\/script>/g)||[]).length;
console.log('✅ Photorealistic globe installed!');
console.log('   sections:', secs,'/',secsC,'  scripts:',scrs,'/',scrsC);
console.log('   File size:', html.length,'bytes');

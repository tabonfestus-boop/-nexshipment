const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// 1. Richer section background
c = c.replace(
  `background:var(--navy);padding:100px 0;position:relative;overflow:hidden;">\n    <div style="position:absolute;inset:0;opacity:0.03`,
  `background:linear-gradient(160deg,#040C28 0%,#071435 50%,#0A1A40 100%);padding:100px 0;position:relative;overflow:hidden;">\n    <div style="position:absolute;inset:0;opacity:0.04`
);

// 2. Globe atmosphere — ocean-blue sphere
c = c.replace(
`    // --- DRAW FUNCTIONS (no shadowBlur for performance) ---\r\n    function atm(){\r\n      var g=cx.createRadialGradient(CX,CY,R*0.88,CX,CY,R*1.4);\r\n      g.addColorStop(0,'rgba(249, 115, 22,0.10)');\r\n      g.addColorStop(0.7,'rgba(249, 115, 22,0.03)');\r\n      g.addColorStop(1,'rgba(0,0,0,0)');\r\n      cx.fillStyle=g;\r\n      cx.beginPath();cx.arc(CX,CY,R*1.4,0,Math.PI*2);cx.fill();\r\n      // dark side\r\n      var d=cx.createRadialGradient(CX+R*0.28,CY-R*0.15,R*0.05,CX,CY,R);\r\n      d.addColorStop(0,'rgba(0,0,0,0)');\r\n      d.addColorStop(0.82,'rgba(0,5,25,0)');\r\n      d.addColorStop(1,'rgba(0,5,25,0.6)');\r\n      cx.fillStyle=d;cx.beginPath();cx.arc(CX,CY,R,0,Math.PI*2);cx.fill();\r\n    }`,
`    // --- DRAW FUNCTIONS ---
    function atm(){
      // Ocean base
      var ocean=cx.createRadialGradient(CX-R*0.15,CY-R*0.1,R*0.1,CX,CY,R);
      ocean.addColorStop(0,'#1a4a8a');ocean.addColorStop(0.5,'#0d2d5e');ocean.addColorStop(1,'#071830');
      cx.fillStyle=ocean;cx.beginPath();cx.arc(CX,CY,R,0,Math.PI*2);cx.fill();
      // Atmosphere glow
      var g=cx.createRadialGradient(CX,CY,R*0.88,CX,CY,R*1.35);
      g.addColorStop(0,'rgba(30,100,200,0.22)');g.addColorStop(0.5,'rgba(20,80,180,0.08)');g.addColorStop(1,'rgba(0,0,0,0)');
      cx.fillStyle=g;cx.beginPath();cx.arc(CX,CY,R*1.35,0,Math.PI*2);cx.fill();
      // Specular highlight
      var hl=cx.createRadialGradient(CX-R*0.35,CY-R*0.35,R*0.05,CX-R*0.2,CY-R*0.2,R*0.7);
      hl.addColorStop(0,'rgba(180,210,255,0.18)');hl.addColorStop(1,'rgba(0,0,0,0)');
      cx.fillStyle=hl;cx.beginPath();cx.arc(CX,CY,R,0,Math.PI*2);cx.fill();
      // Dark terminator
      var d=cx.createRadialGradient(CX+R*0.3,CY-R*0.1,R*0.05,CX+R*0.1,CY,R);
      d.addColorStop(0,'rgba(0,0,0,0)');d.addColorStop(0.75,'rgba(0,2,18,0)');d.addColorStop(1,'rgba(0,2,18,0.65)');
      cx.fillStyle=d;cx.beginPath();cx.arc(CX,CY,R,0,Math.PI*2);cx.fill();
    }`
);

// 3. Grid lines — cooler blue
c = c.replace(
`    function grid(){\r\n      cx.lineWidth=0.55;\r\n      var la,lo,f,vv,pp;\r\n      for(lo=0;lo<360;lo+=30){ // fewer lines = faster\r\n        cx.strokeStyle='rgba(249, 115, 22,0.16)';cx.beginPath();f=true;\r\n        for(la=-84;la<=84;la+=5){\r\n          vv=v3(la,lo,rot);if(vv.z<0){f=true;continue;}\r\n          pp=pj(vv);cx.globalAlpha=vv.z*0.5;\r\n          if(f){cx.moveTo(pp.x,pp.y);f=false;}else cx.lineTo(pp.x,pp.y);\r\n        }cx.stroke();\r\n      }\r\n      for(la=-60;la<=60;la+=30){\r\n        cx.strokeStyle='rgba(249, 115, 22,0.12)';cx.beginPath();f=true;\r\n        for(lo=0;lo<=360;lo+=4){\r\n          vv=v3(la,lo,rot);if(vv.z<0){f=true;continue;}\r\n          pp=pj(vv);cx.globalAlpha=vv.z*0.4;\r\n          if(f){cx.moveTo(pp.x,pp.y);f=false;}else cx.lineTo(pp.x,pp.y);\r\n        }cx.stroke();\r\n      }\r\n      cx.globalAlpha=1;\r\n    }`,
`    function grid(){
      cx.lineWidth=0.45;
      var la,lo,f,vv,pp;
      for(lo=0;lo<360;lo+=20){
        cx.strokeStyle='rgba(100,160,255,0.12)';cx.beginPath();f=true;
        for(la=-84;la<=84;la+=4){
          vv=v3(la,lo,rot);if(vv.z<0){f=true;continue;}
          pp=pj(vv);cx.globalAlpha=vv.z*0.4;
          if(f){cx.moveTo(pp.x,pp.y);f=false;}else cx.lineTo(pp.x,pp.y);
        }cx.stroke();
      }
      for(la=-60;la<=60;la+=20){
        cx.strokeStyle='rgba(100,160,255,0.10)';cx.beginPath();f=true;
        for(lo=0;lo<=360;lo+=3){
          vv=v3(la,lo,rot);if(vv.z<0){f=true;continue;}
          pp=pj(vv);cx.globalAlpha=vv.z*0.35;
          if(f){cx.moveTo(pp.x,pp.y);f=false;}else cx.lineTo(pp.x,pp.y);
        }cx.stroke();
      }
      cx.globalAlpha=1;
    }`
);

// 4. Land dots — teal green (real globe look)
c = c.replace(
`    function land(){\r\n      // Batch all dots into one path per alpha bucket for speed\r\n      var i,v,p,a,s;\r\n      for(i=0;i<LAND.length;i++){\r\n        v=v3(LAND[i][1],LAND[i][0],rot);\r\n        if(v.z<0)continue;\r\n        p=pj(v);\r\n        a=Math.pow(Math.max(0,v.z),0.55)*0.85;\r\n        s=1.1+v.z*0.85;\r\n        cx.globalAlpha=a;\r\n        cx.fillStyle='rgba(255,102,0,0.72)';\r\n        cx.beginPath();cx.arc(p.x,p.y,s,0,Math.PI*2);cx.fill();\r\n      }\r\n      cx.globalAlpha=1;\r\n    }`,
`    function land(){
      var i,v,p,a,s;
      for(i=0;i<LAND.length;i++){
        v=v3(LAND[i][1],LAND[i][0],rot);
        if(v.z<0)continue;
        p=pj(v);
        a=Math.pow(Math.max(0,v.z),0.5)*0.9;
        s=1.2+v.z*0.9;
        cx.globalAlpha=a;
        cx.fillStyle=v.z>0.6?'rgba(72,210,150,0.88)':'rgba(50,180,120,0.72)';
        cx.beginPath();cx.arc(p.x,p.y,s,0,Math.PI*2);cx.fill();
      }
      cx.globalAlpha=1;
    }`
);

// 5. Arcs — glowing with shadow
c = c.replace(
`    function arc(h1,h2,t,col){\r\n      var v1=v3(h1[0],h1[1],rot),v2=v3(h2[0],h2[1],rot);\r\n      // Skip if both hubs facing away\r\n      if(v1.z<0.02&&v2.z<0.02)return;\r\n      var p1=pj(v1),p2=pj(v2);\r\n      var mx=(p1.x+p2.x)/2,my=(p1.y+p2.y)/2;\r\n      var d=Math.hypot(p2.x-p1.x,p2.y-p1.y);\r\n      if(d<10)return; // skip tiny arcs\r\n      var lf=d*0.36;\r\n      var nx=-(p2.y-p1.y)/d,ny=(p2.x-p1.x)/d;\r\n      var ccx=mx+nx*lf,ccy=my+ny*lf*0.4;\r\n      var al=Math.min((v1.z+v2.z)/2,1)*0.78;\r\n      cx.save();\r\n      cx.globalAlpha=al;cx.strokeStyle=col;cx.lineWidth=1.5;\r\n      // NO shadowBlur here â€" replaced with colored arc only\r\n      cx.setLineDash([5,6]);cx.beginPath();\r\n      cx.moveTo(p1.x,p1.y);cx.quadraticCurveTo(ccx,ccy,p2.x,p2.y);cx.stroke();\r\n      cx.setLineDash([]);\r\n      // Ship dot\r\n      var sx=(1-t)*(1-t)*p1.x+2*(1-t)*t*ccx+t*t*p2.x;\r\n      var sy=(1-t)*(1-t)*p1.y+2*(1-t)*t*ccy+t*t*p2.y;\r\n      // Simple trail (3 dots, no glow)\r\n      var k,tt,tx,ty;\r\n      for(k=1;k<=3;k++){\r\n        tt=Math.max(0,t-k*0.04);\r\n        tx=(1-tt)*(1-tt)*p1.x+2*(1-tt)*tt*ccx+tt*tt*p2.x;\r\n        ty=(1-tt)*(1-tt)*p1.y+2*(1-tt)*tt*ccy+tt*tt*p2.y;\r\n        cx.globalAlpha=al*(0.25-k*0.07);\r\n        cx.fillStyle='#fff';\r\n        cx.beginPath();cx.arc(tx,ty,2.4-k*0.4,0,Math.PI*2);cx.fill();\r\n      }\r\n      cx.globalAlpha=al;cx.fillStyle='#fff';\r\n      cx.beginPath();cx.arc(sx,sy,3.5,0,Math.PI*2);cx.fill();\r\n      cx.restore();\r\n    }`,
`    function arc(h1,h2,t,col){
      var v1=v3(h1[0],h1[1],rot),v2=v3(h2[0],h2[1],rot);
      if(v1.z<0.02&&v2.z<0.02)return;
      var p1=pj(v1),p2=pj(v2);
      var mx=(p1.x+p2.x)/2,my=(p1.y+p2.y)/2;
      var d=Math.hypot(p2.x-p1.x,p2.y-p1.y);
      if(d<10)return;
      var lf=d*0.4;
      var nx=-(p2.y-p1.y)/d,ny=(p2.x-p1.x)/d;
      var ccx=mx+nx*lf,ccy=my+ny*lf*0.45;
      var al=Math.min((v1.z+v2.z)/2,1)*0.9;
      cx.save();
      // Glow pass
      cx.shadowColor=col;cx.shadowBlur=10;
      cx.globalAlpha=al*0.4;cx.strokeStyle=col;cx.lineWidth=3.5;
      cx.beginPath();cx.moveTo(p1.x,p1.y);cx.quadraticCurveTo(ccx,ccy,p2.x,p2.y);cx.stroke();
      cx.shadowBlur=0;
      // Crisp dashed route line
      cx.globalAlpha=al;cx.strokeStyle=col;cx.lineWidth=1.4;
      cx.setLineDash([5,5]);cx.beginPath();
      cx.moveTo(p1.x,p1.y);cx.quadraticCurveTo(ccx,ccy,p2.x,p2.y);cx.stroke();
      cx.setLineDash([]);
      // Shipment dot
      var sx=(1-t)*(1-t)*p1.x+2*(1-t)*t*ccx+t*t*p2.x;
      var sy=(1-t)*(1-t)*p1.y+2*(1-t)*t*ccy+t*t*p2.y;
      // Glowing comet trail
      var k,tt,tx,ty;
      for(k=1;k<=4;k++){
        tt=Math.max(0,t-k*0.035);
        tx=(1-tt)*(1-tt)*p1.x+2*(1-tt)*tt*ccx+tt*tt*p2.x;
        ty=(1-tt)*(1-tt)*p1.y+2*(1-tt)*tt*ccy+tt*tt*p2.y;
        cx.globalAlpha=al*(0.28-k*0.06);
        cx.fillStyle=col;
        cx.beginPath();cx.arc(tx,ty,2.6-k*0.35,0,Math.PI*2);cx.fill();
      }
      cx.shadowColor='#fff';cx.shadowBlur=8;
      cx.globalAlpha=al;cx.fillStyle='#fff';
      cx.beginPath();cx.arc(sx,sy,4,0,Math.PI*2);cx.fill();
      cx.shadowBlur=0;
      cx.restore();
    }`
);

// 6. Hub markers — glowing orange with label pill
c = c.replace(
`    var lastPulse=0;\r\n    function hub(h){\r\n      var v=v3(h[0],h[1],rot);if(v.z<0.06)return;\r\n      var p=pj(v),al=v.z;\r\n      var pu=((Date.now()/1100)%1); // slower pulse = cheaper\r\n      cx.save();\r\n      // Pulse ring â€" no shadowBlur\r\n      cx.globalAlpha=al*(1-pu)*0.3;\r\n      cx.strokeStyle='#FF6600';cx.lineWidth=1;\r\n      cx.beginPath();cx.arc(p.x,p.y,5+pu*16,0,Math.PI*2);cx.stroke();\r\n      // White dot\r\n      cx.globalAlpha=al;cx.fillStyle='#fff';\r\n      cx.beginPath();cx.arc(p.x,p.y,4.5,0,Math.PI*2);cx.fill();\r\n      // Orange centre\r\n      cx.fillStyle='#FF6600';\r\n      cx.beginPath();cx.arc(p.x,p.y,2.2,0,Math.PI*2);cx.fill();\r\n      // Label\r\n      cx.globalAlpha=al*0.92;\r\n      cx.font='bold 7.5px Barlow,Arial,sans-serif';\r\n      cx.fillStyle='rgba(255,255,255,0.95)';cx.textAlign='center';\r\n      cx.fillText(h[2],p.x,p.y-13);\r\n      cx.restore();\r\n    }`,
`    function hub(h){
      var v=v3(h[0],h[1],rot);if(v.z<0.06)return;
      var p=pj(v),al=v.z;
      var pu=((Date.now()/900)%1);
      cx.save();
      // Outer pulse ring
      cx.globalAlpha=al*(1-pu)*0.5;
      cx.strokeStyle='#F97316';cx.lineWidth=1.2;
      cx.beginPath();cx.arc(p.x,p.y,6+pu*20,0,Math.PI*2);cx.stroke();
      // Second ring offset
      var pu2=((Date.now()/900+0.4)%1);
      cx.globalAlpha=al*(1-pu2)*0.28;
      cx.beginPath();cx.arc(p.x,p.y,6+pu2*20,0,Math.PI*2);cx.stroke();
      // Glowing orange hub dot
      cx.shadowColor='#F97316';cx.shadowBlur=14;
      cx.globalAlpha=al;
      cx.fillStyle='#F97316';
      cx.beginPath();cx.arc(p.x,p.y,5.5,0,Math.PI*2);cx.fill();
      cx.shadowBlur=0;
      // White centre
      cx.fillStyle='#fff';
      cx.beginPath();cx.arc(p.x,p.y,2.8,0,Math.PI*2);cx.fill();
      // Label background pill
      cx.globalAlpha=al*0.95;
      cx.font='bold 7px Inter,Arial,sans-serif';
      var lw=cx.measureText(h[2]).width+14;
      cx.fillStyle='rgba(4,12,40,0.78)';
      cx.beginPath();
      if(cx.roundRect)cx.roundRect(p.x-lw/2,p.y-27,lw,15,4);else cx.rect(p.x-lw/2,p.y-27,lw,15);
      cx.fill();
      cx.fillStyle='rgba(255,255,255,0.98)';cx.textAlign='center';
      cx.fillText(h[2],p.x,p.y-16);
      cx.restore();
    }`
);

// 7. Route colors — brand orange
c = c.replace(
  `[1,0,'#FF6600'],[1,2,'#FF8833'],[1,4,'#60a5fa'],\r\n      [3,4,'#FF6600'],[3,5,'#3b82f6'],[0,6,'#FF8833'],\r\n      [2,4,'#FF6600'],[5,3,'#60a5fa'],[7,0,'#3b82f6'],[6,4,'#FF6600']`,
  `[1,0,'#F97316'],[1,2,'#FB923C'],[1,4,'#60a5fa'],\n      [3,4,'#F97316'],[3,5,'#38bdf8'],[0,6,'#FB923C'],\n      [2,4,'#F97316'],[5,3,'#60a5fa'],[7,0,'#38bdf8'],[6,4,'#F97316']`
);

fs.writeFileSync('index.html', c);
console.log('✅ Globe fully upgraded to premium look. Size:', c.length);

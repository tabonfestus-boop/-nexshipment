const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
const originalLength = content.length;

// Exact broken string — note the mixed LF after widget close, then CRLF inside section
const brokenStr = `  </div>\n\n        <p style="color:rgba(255,255,255,0.6);font-size:1.1rem;">Watch our active shipments moving across 192+ countries in real-time. Over 2,400 active flights and sea freight routes managed daily.</p>\r\n      </div>\r\n      <div style="position:relative;width:100%;max-width:960px;margin:0 auto;border-radius:32px;background:radial-gradient(circle at 50% 60%, rgba(249,115,22,0.08) 0%, transparent 50%);padding-bottom:20px;" class="reveal">`;

const fixedStr = `  </div>

  <!-- ════════════════════════════════════════
       GLOBAL NETWORK - 3D ROTATING GLOBE
  ════════════════════════════════════════ -->
  <section id="global-network" style="background:var(--navy);padding:100px 0;position:relative;overflow:hidden;">
    <div style="position:absolute;inset:0;opacity:0.03;background-image:linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px);background-size:40px 40px;"></div>
    <div class="container" style="position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;">
      <div style="text-align:center;max-width:700px;margin-bottom:60px;" class="reveal">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.2);padding:6px 14px;border-radius:30px;margin-bottom:20px;">
          <div style="width:8px;height:8px;background:#22c55e;border-radius:50%;box-shadow:0 0 10px #22c55e;animation:ping 2s infinite;"></div>
          <span style="color:#4ade80;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Live Operations Dashboard</span>
        </div>
        <h2 style="color:white;font-family:var(--font-head);font-size:clamp(2rem,5vw,3rem);font-weight:900;line-height:1.1;margin-bottom:20px;">Global Network <span style="color:var(--orange);">In Motion</span></h2>
        <p style="color:rgba(255,255,255,0.6);font-size:1.1rem;">Watch our active shipments moving across 192+ countries in real-time. Over 2,400 active flights and sea freight routes managed daily.</p>
      </div>
      <div style="position:relative;width:100%;max-width:960px;margin:0 auto;border-radius:32px;background:radial-gradient(circle at 50% 60%, rgba(249,115,22,0.08) 0%, transparent 50%);padding-bottom:20px;" class="reveal">`;

if (content.includes(brokenStr)) {
  content = content.replace(brokenStr, fixedStr);
  console.log('✅ Restored global-network section perfectly.');
} else {
  // Manually locate and do surgical replacement
  const startMarker = '  </div>\n\n        <p style="color:rgba(255,255,255,0.6);font-size:1.1rem;">Watch our active shipments';
  const endMarker = 'class="reveal">';
  const si = content.indexOf('Watch our active shipments moving across 192+ countries');
  if (si !== -1) {
    // Find start of the section (the closing </div> of widget before the broken <p>)
    const widgetClose = content.lastIndexOf('  </div>\n\n', si);
    // Find end of the orphaned opening div (the class="reveal"> that starts the globe wrapper)
    const revealEnd = content.indexOf('class="reveal">', si);
    if (widgetClose !== -1 && revealEnd !== -1) {
      const before = content.substring(0, widgetClose);
      const after = content.substring(revealEnd + 'class="reveal">'.length);
      content = before + fixedStr + after;
      console.log('✅ Used surgical replacement — restored section header.');
    }
  }
}

fs.writeFileSync('index.html', content);
console.log(`Done. File size: ${content.length} bytes (was ${originalLength})`);

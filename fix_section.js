const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// The problem: after the stats card closing </div>, the HTML section close tags
// and <script> open tag were deleted. We need to restore them.
// Currently line ~2042 has:  "        </div>\n    var cx=cv.getContext('2d');"
// We need to insert:  "</div></div></section><script>(function(){var cv=...; var cx=..."

const broken = `        </div>
    var cx=cv.getContext('2d');`;

const fixed = `        </div>
      </div>

      <!-- Live stats row below globe -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;width:100%;max-width:960px;margin:28px auto 0;" class="reveal">
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px 20px;text-align:center;">
          <div style="font-size:1.9rem;font-weight:900;color:white;font-family:var(--font-head);line-height:1;">2,400+</div>
          <div style="font-size:0.65rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-top:7px;">Flights / Day</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px 20px;text-align:center;">
          <div style="font-size:1.9rem;font-weight:900;color:#4ade80;font-family:var(--font-head);line-height:1;">98.7%</div>
          <div style="font-size:0.65rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-top:7px;">On-Time Rate</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px 20px;text-align:center;">
          <div style="font-size:1.9rem;font-weight:900;color:#F97316;font-family:var(--font-head);line-height:1;">340</div>
          <div style="font-size:0.65rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-top:7px;">Ports Covered</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px 20px;text-align:center;">
          <div style="font-size:1.9rem;font-weight:900;color:#60a5fa;font-family:var(--font-head);line-height:1;">3.2 Days</div>
          <div style="font-size:0.65rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-top:7px;">Avg Transit</div>
        </div>
      </div>

    </div>
  </section>
  <script>
  (function(){
    var cv=document.getElementById('globe-canvas');
    if(!cv)return;
    var cx=cv.getContext('2d');`;

if (c.includes(broken)) {
  c = c.replace(broken, fixed);
  console.log('✅ Restored section close tags and script wrapper + added stats row.');
} else {
  console.log('❌ Could not find broken pattern. Let me check what is there...');
  const idx = c.indexOf("var cx=cv.getContext('2d');");
  console.log('Context before var cx:', JSON.stringify(c.substring(idx - 150, idx + 50)));
}

fs.writeFileSync('index.html', c);
console.log('Size:', c.length);

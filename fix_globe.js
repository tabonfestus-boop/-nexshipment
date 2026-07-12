const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. FIX THE SLIDER / WIDGET CORRUPTION
const startStr = '    <button class="slider-arrow" id="slider-prev" aria-label="Previous slide" style="display:none !important;">';
const endStr = '  <!-- GLOBAL NETWORK - 3D ROTATING GLOBE -->';

let startIndex = content.indexOf(startStr);
let endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const replacement = `    <!-- Arrows (Hidden as requested) -->
    <button class="slider-arrow" id="slider-prev" aria-label="Previous slide" style="display:none !important;">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
    </button>
    <button class="slider-arrow" id="slider-next" aria-label="Next slide" style="display:none !important;">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
    </button>

    <!-- Dots -->
    <div class="slider-dots" id="slider-dots">
      <button class="slider-dot active" onclick="goToSlide(0)" aria-label="Slide 1"></button>
      <button class="slider-dot" onclick="goToSlide(1)" aria-label="Slide 2"></button>
      <button class="slider-dot" onclick="goToSlide(2)" aria-label="Slide 3"></button>
      <button class="slider-dot" onclick="goToSlide(3)" aria-label="Slide 4"></button>
      <button class="slider-dot" onclick="goToSlide(4)" aria-label="Slide 5"></button>
    </div>
  </div>

  <!-- ════════════════════════════════════════
       TRACKING WIDGET BAR — MINIMAL PRO
  ════════════════════════════════════════ -->
  <div id="tracking-widget-bar">
    <div class="tw-card">
      <h2>Track & Trace Your Shipment</h2>
      <p>Enter your tracking number to get real-time updates on your package</p>
      
      <div class="tw-form-simple">
        <input 
          id="hero-tracking-input" 
          type="text" 
          class="tw-input-simple"
          placeholder="Enter your tracking number..." 
          autocomplete="off" 
          spellcheck="false"
        />
        <button id="hero-track-btn" onclick="window.trackShipment(event)">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <span id="btn-text">Track Shipment</span>
          <div id="btn-spinner" style="display:none;width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
        </button>
      </div>
    </div>
  </div>

`;
    
    // Replace everything between the very first slider-arrow button and GLOBAL NETWORK
    content = content.substring(0, content.lastIndexOf('    <!-- Arrows (Hidden as requested) -->', startIndex) !== -1 ? content.lastIndexOf('    <!-- Arrows (Hidden as requested) -->', startIndex) : startIndex) + replacement + content.substring(endIndex);
    
    // Now make sure we don't have lingering duplicate arrows
    // (the above substring logic might be messy, let's just do a clear replace if possible)
}

// Better approach to wipe out all the garbage arrows:
const regexCorrupt = /    <!-- Arrows \(Hidden as requested\) -->[\s\S]*?(?=  <!-- GLOBAL NETWORK - 3D ROTATING GLOBE -->)/;
const replacementCorrupt = `    <!-- Arrows (Hidden as requested) -->
    <button class="slider-arrow" id="slider-prev" aria-label="Previous slide" style="display:none !important;">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
    </button>
    <button class="slider-arrow" id="slider-next" aria-label="Next slide" style="display:none !important;">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
    </button>

    <!-- Dots -->
    <div class="slider-dots" id="slider-dots">
      <button class="slider-dot active" onclick="goToSlide(0)" aria-label="Slide 1"></button>
      <button class="slider-dot" onclick="goToSlide(1)" aria-label="Slide 2"></button>
      <button class="slider-dot" onclick="goToSlide(2)" aria-label="Slide 3"></button>
      <button class="slider-dot" onclick="goToSlide(3)" aria-label="Slide 4"></button>
      <button class="slider-dot" onclick="goToSlide(4)" aria-label="Slide 5"></button>
    </div>
  </div>

  <!-- ════════════════════════════════════════
       TRACKING WIDGET BAR — MINIMAL PRO
  ════════════════════════════════════════ -->
  <div id="tracking-widget-bar">
    <div class="tw-card">
      <h2>Track & Trace Your Shipment</h2>
      <p>Enter your tracking number to get real-time updates on your package</p>
      
      <div class="tw-form-simple">
        <input 
          id="hero-tracking-input" 
          type="text" 
          class="tw-input-simple"
          placeholder="Enter your tracking number..." 
          autocomplete="off" 
          spellcheck="false"
        />
        <button id="hero-track-btn" onclick="window.trackShipment(event)">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <span id="btn-text">Track Shipment</span>
          <div id="btn-spinner" style="display:none;width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
        </button>
      </div>
    </div>
  </div>

`;

content = content.replace(/    <button class="slider-arrow" id="slider-prev"[\s\S]*?(?=  <!-- GLOBAL NETWORK - 3D ROTATING GLOBE -->)/, replacementCorrupt);

// 2. UPGRADE GLOBE UI
const globeRegex = /<div style="position:relative;width:100%;max-width:960px;" class="reveal">\s*<canvas id="globe-canvas" style="width:100%;height:auto;display:block;border-radius:16px;"><\/canvas>\s*<div style="position:absolute;bottom:24px;right:24px;background:rgba\(4,12,40,0\.88\);backdrop-filter:blur\(16px\);-webkit-backdrop-filter:blur\(16px\);border:1px solid rgba\(255,255,255,0\.12\);padding:18px 28px;border-radius:18px;display:flex;gap:24px;box-shadow:0 12px 40px rgba\(0,0,0,0\.6\);">\s*<div>\s*<div style="font-family:var\(--font-head\);font-size:1\.9rem;font-weight:900;color:white;line-height:1;">12,491<\/div>\s*<div style="font-size:0\.62rem;color:var\(--orange\);text-transform:uppercase;letter-spacing:0\.12em;font-weight:800;margin-top:5px;">Active Routes<\/div>\s*<\/div>\s*<div style="width:1px;background:rgba\(255,255,255,0\.12\);"><\/div>\s*<div>\s*<div style="font-family:var\(--font-head\);font-size:1\.9rem;font-weight:900;color:white;line-height:1;">192<\/div>\s*<div style="font-size:0\.62rem;color:#4ade80;text-transform:uppercase;letter-spacing:0\.12em;font-weight:800;margin-top:5px;">Countries<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

const newGlobe = `<div style="position:relative;width:100%;max-width:960px;margin:0 auto;border-radius:32px;background:radial-gradient(circle at 50% 60%, rgba(249,115,22,0.08) 0%, transparent 50%);padding-bottom:20px;" class="reveal">
        <canvas id="globe-canvas" style="width:100%;height:auto;display:block;filter:drop-shadow(0 0 30px rgba(249,115,22,0.15));"></canvas>
        <div style="position:absolute;bottom:30px;right:40px;background:rgba(10, 25, 47, 0.4);backdrop-filter:blur(32px);-webkit-backdrop-filter:blur(32px);border:1px solid rgba(255,255,255,0.08);border-top:1px solid rgba(255,255,255,0.2);padding:24px 40px;border-radius:24px;display:flex;gap:40px;box-shadow:0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);">
          <div style="text-align:center;">
            <div style="font-family:var(--font-head);font-size:2.5rem;font-weight:900;color:white;line-height:1;text-shadow:0 0 20px rgba(255,255,255,0.4);">12,491</div>
            <div style="font-size:0.7rem;color:var(--orange);text-transform:uppercase;letter-spacing:0.15em;font-weight:800;margin-top:8px;">Active Routes</div>
          </div>
          <div style="width:1px;background:linear-gradient(to bottom, transparent, rgba(255,255,255,0.25), transparent);"></div>
          <div style="text-align:center;">
            <div style="font-family:var(--font-head);font-size:2.5rem;font-weight:900;color:white;line-height:1;text-shadow:0 0 20px rgba(255,255,255,0.4);">192</div>
            <div style="font-size:0.7rem;color:#4ade80;text-transform:uppercase;letter-spacing:0.15em;font-weight:800;margin-top:8px;">Countries</div>
          </div>
        </div>
      </div>`;

content = content.replace(globeRegex, newGlobe);

fs.writeFileSync('index.html', content);
console.log('Fixed index.html thoroughly.');

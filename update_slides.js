const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const newSlides = `<!-- SLIDE 1 — VIDEO -->
    <div class="slide active" id="slide-0">
      <video class="slide-video" autoplay muted loop playsinline preload="auto">
        <source src="Background%20video.mp4" type="video/mp4"/>
      </video>
      <div class="slide-overlay"></div>
      <div class="slide-content">
        <div class="container">
          <div class="slide-tag">World-Class Logistics</div>
          <h1 class="slide-h1">Leading Global<br/>Logistics Service</h1>
          <p class="slide-sub">Delivering excellence across air, sea and land — connecting businesses worldwide with speed, safety and precision you can trust.</p>
          <div class="slide-btns">
            <a href="#services" class="slide-btn-primary">
              Our Services
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact-section" class="slide-btn-secondary">
              Contact Us
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDE 2 — VIDEO1 -->
    <div class="slide" id="slide-1">
      <video class="slide-video" autoplay muted loop playsinline preload="auto">
        <source src="Background%20video1.mp4" type="video/mp4"/>
      </video>
      <div class="slide-overlay"></div>
      <div class="slide-content">
        <div class="container">
          <div class="slide-tag">Trusted Courier Network</div>
          <h1 class="slide-h1">Fastest &amp; Reliable<br/>Courier Service</h1>
          <p class="slide-sub">Same-day and express delivery options across 192+ countries. Your packages arrive on time, every time — guaranteed.</p>
          <div class="slide-btns">
            <a href="#quote-section" class="slide-btn-primary">
              Get a Quote
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
            </a>
            <a href="#services" class="slide-btn-secondary">
              Learn More
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDE 3 — VIDEO2 -->
    <div class="slide" id="slide-2">
      <video class="slide-video" autoplay muted loop playsinline preload="auto">
        <source src="Background%20video2.mp4" type="video/mp4"/>
      </video>
      <div class="slide-overlay"></div>
      <div class="slide-content">
        <div class="container">
          <div class="slide-tag">Ocean & Air Freight</div>
          <h1 class="slide-h1">Professional<br/>Freight Solutions</h1>
          <p class="slide-sub">FCL &amp; LCL sea freight, air cargo and customs clearance — complete door-to-door logistics solutions for businesses of all sizes.</p>
          <div class="slide-btns">
            <a href="#services" class="slide-btn-primary">
              Our Services
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact-section" class="slide-btn-secondary">
              Contact Us
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDE 4 — IMAGE1 -->
    <div class="slide" id="slide-3">
      <div class="slide-img-bg" style="background-image:url('background%20image1.jfif')"></div>
      <div class="slide-overlay"></div>
      <div class="slide-content">
        <div class="container">
          <div class="slide-tag">Smart Warehousing</div>
          <h1 class="slide-h1">Industry Standard<br/>Warehousing</h1>
          <p class="slide-sub">State-of-the-art secure warehousing with real-time inventory management, climate control, and 24/7 surveillance at key global hubs.</p>
          <div class="slide-btns">
            <a href="#quote-section" class="slide-btn-primary">
              Request a Quote
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
            </a>
            <a href="#services" class="slide-btn-secondary">
              Learn More
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDE 5 — IMAGE2 -->
    <div class="slide" id="slide-4">
      <div class="slide-img-bg" style="background-image:url('Background%20image2.jfif')"></div>
      <div class="slide-overlay"></div>
      <div class="slide-content">
        <div class="container">
          <div class="slide-tag">Secure & Guaranteed</div>
          <h1 class="slide-h1">Commitment to<br/>Excellence</h1>
          <p class="slide-sub">Our dedicated team works round the clock to ensure your goods are handled with utmost care and delivered safely.</p>
          <div class="slide-btns">
            <a href="#quote-section" class="slide-btn-primary">
              Get a Quote
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
            </a>
            <a href="#services" class="slide-btn-secondary">
              Learn More
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>`;

let startIdx = content.indexOf('<!-- SLIDE 1 — VIDEO (Airplane Takeoff) -->');
let endIdx = content.indexOf('<!-- Arrows (Hidden as requested) -->');

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + newSlides + '\n\n    ' + content.substring(endIdx);
} else {
  console.log('Could not find slide markers.');
}

const dotsRegex = /<!-- Dots -->[\s\S]*?<div class="slider-dots" id="slider-dots">[\s\S]*?<\/div>\s*<\/div>/;
const newDots = `<!-- Dots -->
    <div class="slider-dots" id="slider-dots">
      <button class="slider-dot active" onclick="goToSlide(0)" aria-label="Slide 1"></button>
      <button class="slider-dot" onclick="goToSlide(1)" aria-label="Slide 2"></button>
      <button class="slider-dot" onclick="goToSlide(2)" aria-label="Slide 3"></button>
      <button class="slider-dot" onclick="goToSlide(3)" aria-label="Slide 4"></button>
      <button class="slider-dot" onclick="goToSlide(4)" aria-label="Slide 5"></button>
    </div>
  </div>`;

content = content.replace(dotsRegex, newDots);

fs.writeFileSync('index.html', content);
console.log('Update complete.');

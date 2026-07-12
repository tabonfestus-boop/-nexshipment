const fs = require('fs');

function applyAll() {
  let content = fs.readFileSync('index.html', 'utf8');

  // 1. Update CSS Variables
  content = content.replace(
    /:root\s*\{[\s\S]*?--transition:\s*all\s*0.3s\s*ease;\s*\}/,
    `:root {
      --orange:       #FF6600;
      --orange-dark:  #E65C00;
      --orange-light: #FF8533;
      --navy:         #0B1437;
      --navy-light:   #162050;
      --white:        #FFFFFF;
      --gray-light:   #F4F6F9;
      --gray-mid:     #E8ECF0;
      --text-dark:    #1A2340;
      --text-mid:     #4A5568;
      --text-light:   #718096;
      --font-head:    'Montserrat', sans-serif;
      --font-body:    'Open Sans', sans-serif;
      --shadow-sm:    0 2px 8px rgba(0,0,0,0.08);
      --shadow-md:    0 8px 32px rgba(0,0,0,0.12);
      --shadow-lg:    0 20px 60px rgba(0,0,0,0.18);
      --radius:       6px;
      --radius-lg:    12px;
      --transition:   all 0.3s ease;
    }`
  );

  // 2. Update Body Background
  content = content.replace(
    /body\s*\{\s*font-family:\s*var\(--font-body\);\s*color:\s*var\(--text-dark\);\s*background:\s*var\(--white\);/g,
    `body {
      font-family: var(--font-body);
      color: var(--text-dark);
      background: var(--gray-light);`
  );

  // 3. Update Slider CSS Animation
  content = content.replace(
    /\/\* Slides \*\/[\s\S]*?\/\* Video slide \*\/[\s\S]*?object-fit: cover;\s*\}/,
    `/* Slides */
    .slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      transform: scale(1.02);
      transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1), transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1;
    }

    .slide.active { opacity: 1; transform: scale(1.0); z-index: 2; }

    /* Image slide background */
    .slide-img-bg {
      position: absolute; inset: 0;
      background-size: cover;
      background-position: center;
      transform: scale(1.04);
      transition: transform 8s ease;
    }

    .slide.active .slide-img-bg { transform: scale(1.0); }

    /* Video slide */
    .slide-video {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      transform: scale(1.04);
      transition: transform 8s ease;
    }
    
    .slide.active .slide-video { transform: scale(1.0); }`
  );

  // 4. Update the Slider HTML
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

  content = content.replace(
    /<!-- SLIDE 1 — VIDEO \(Airplane Takeoff\) -->[\s\S]*?<!-- Arrows \(Hidden as requested\) -->/,
    newSlides + '\n\n    <!-- Arrows (Hidden as requested) -->'
  );

  // 5. Update the dots (from 4 to 5 dots)
  content = content.replace(
    /<!-- Dots -->[\s\S]*?<div class="slider-dots" id="slider-dots">[\s\S]*?<\/div>\s*<\/div>/,
    `<!-- Dots -->
    <div class="slider-dots" id="slider-dots">
      <button class="slider-dot active" onclick="goToSlide(0)" aria-label="Slide 1"></button>
      <button class="slider-dot" onclick="goToSlide(1)" aria-label="Slide 2"></button>
      <button class="slider-dot" onclick="goToSlide(2)" aria-label="Slide 3"></button>
      <button class="slider-dot" onclick="goToSlide(3)" aria-label="Slide 4"></button>
      <button class="slider-dot" onclick="goToSlide(4)" aria-label="Slide 5"></button>
    </div>
  </div>`
  );

  // 6. Update goToSlide to have a safety check
  content = content.replace(
    /function goToSlide\(n\)\s*\{\s*slides\[current\]\.classList\.remove\('active'\);\s*dots\[current\]\.classList\.remove\('active'\);\s*current\s*=\s*\(n\s*\+\s*slides\.length\)\s*%\s*slides\.length;\s*slides\[current\]\.classList\.add\('active'\);\s*dots\[current\]\.classList\.add\('active'\);\s*resetAuto\(\);\s*\}/,
    `function goToSlide(n) {
      if (!slides || !slides.length) return;
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      resetAuto();
    }`
  );

  fs.writeFileSync('index.html', content);
}
applyAll();

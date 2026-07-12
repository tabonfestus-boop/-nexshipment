const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Fix corrupted map-hub section
content = content.replace(
  /.map-hub {\s*position: absolute;\s*transform: translate\(-50%, -50%\);\s*display: flex;\s*.hub-label {/g,
  `.map-hub {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .hub-pulse {
      position: absolute;
      width: 12px; height: 12px;
      background: var(--orange);
      border-radius: 50%;
      animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      opacity: 0.7;
    }
    .hub-dot {
      width: 8px; height: 8px;
      background: white;
      border: 2px solid var(--orange);
      border-radius: 50%;
      position: relative;
      z-index: 2;
    }
    .hub-label {`
);

// 2. Fix the mobile media query for tracking widget
const mobileTwRegex = /\.tw-card \{ padding: 30px 20px; \}\s*\.tw-form-simple \{ flex-direction: column; \}\s*#hero-track-btn \{ width: 100%; justify-content: center; \}/g;
const newMobileTw = `.tw-card { padding: 32px 16px; transform: translateY(-16px); border-radius: 20px; }
      .tw-card h2 { font-size: 1.6rem; }
      .tw-card p { font-size: 0.95rem; margin-bottom: 24px; }
      .tw-form-simple { padding: 5px; border-radius: 40px; }
      .tw-input-simple { padding: 0 16px; font-size: 0.95rem; }
      #hero-track-btn { padding: 0 18px; font-size: 0.85rem; height: 50px; gap: 6px; width: auto; justify-content: center; }`;

content = content.replace(mobileTwRegex, newMobileTw);

fs.writeFileSync('index.html', content);
console.log('Fixed index.html');

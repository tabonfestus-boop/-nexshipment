const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const regex = /\.tw-card \{ padding: 32px 16px; transform: translateY\(-16px\); border-radius: 20px; \}[\s\S]*?#hero-track-btn \{ padding: 0 18px; font-size: 0\.85rem; height: 50px; gap: 6px; width: auto; justify-content: center; \}/;

const replacement = `.tw-card { padding: 32px 20px; transform: translateY(-16px); border-radius: 24px; }
      .tw-card h2 { font-size: 1.8rem; letter-spacing: -0.02em; margin-bottom: 8px; }
      .tw-card p { font-size: 0.95rem; margin-bottom: 24px; }
      .tw-form-simple { 
        flex-direction: column; 
        background: transparent; 
        border: none; 
        box-shadow: none; 
        padding: 0; 
        border-radius: 0; 
        gap: 12px;
      }
      .tw-form-simple:focus-within { box-shadow: none; transform: none; }
      .tw-input-simple { 
        width: 100%; 
        border: 1.5px solid #E2E8F0; 
        border-radius: 16px; 
        padding: 18px 20px; 
        font-size: 1rem;
        background: white;
        transition: all 0.3s ease;
        box-sizing: border-box;
      }
      .tw-input-simple:focus {
        border-color: var(--orange);
        box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.15);
      }
      #hero-track-btn { 
        width: 100%; 
        height: 56px; 
        border-radius: 16px; 
        justify-content: center; 
        font-size: 1.05rem;
        box-sizing: border-box;
      }`;

if(content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('index.html', content);
    console.log('Successfully applied perfect mobile vertical stack layout.');
} else {
    console.log('Could not find the target string. The file might have been modified differently.');
}

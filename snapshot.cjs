const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5200', { waitUntil: 'load', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000)); // wait for rendering

  const html = await page.evaluate(() => {
    // 1. Remove Vite dev scripts
    document.querySelectorAll('script').forEach(s => s.remove());
    
    // 2. Remove injected style tags to keep it clean (we'll use style.css)
    document.querySelectorAll('style').forEach(s => s.remove());
    
    // 3. Add Canvas Container for our Vanilla JS Three.js
    const canvas = document.querySelector('canvas');
    if (canvas) {
        const wrapper = canvas.closest('.absolute.inset-0');
        if (wrapper) wrapper.innerHTML = '<div id="canvas-container" class="absolute inset-0 w-full h-full z-0"></div>';
    }
    
    return document.documentElement.innerHTML;
  });

  // Re-assemble clean HTML
  let finalHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n`;
  
  // Extract just the head content minus styles
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  if(headMatch) {
      finalHtml += headMatch[1];
  }
  finalHtml += `\n<link rel="stylesheet" href="./style.css">\n</head>\n<body>\n`;
  
  // Extract body
  const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i);
  if(bodyMatch) {
      finalHtml += bodyMatch[1];
  }
  
  finalHtml += `\n<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n`;
  finalHtml += `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>\n`;
  finalHtml += `<script src="./script.js"></script>\n`;
  finalHtml += `</body>\n</html>`;
  
  // Remove React hydration attributes
  finalHtml = finalHtml.replace(/data-reactroot=""/g, '');
  
  fs.mkdirSync('new_web_clean', { recursive: true });
  fs.writeFileSync('new_web_clean/index.html', finalHtml);
  
  await browser.close();
  process.exit(0);
})();

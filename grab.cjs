const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // Just navigate, don't wait for any specific event except domcontentloaded
  await page.goto('http://localhost:5201', { waitUntil: 'domcontentloaded' });
  
  // Hard wait for 5 seconds to let React render and animations start
  await new Promise(r => setTimeout(r, 5000));

  const html = await page.evaluate(() => {
    document.querySelectorAll('script').forEach(s => s.remove());
    document.querySelectorAll('style').forEach(s => s.remove());
    
    const canvas = document.querySelector('canvas');
    if (canvas) {
        const wrapper = canvas.closest('.absolute.inset-0');
        if (wrapper) wrapper.innerHTML = '<div id="canvas-container" class="absolute inset-0 w-full h-full z-0"></div>';
    }
    
    return document.documentElement.innerHTML;
  });

  let finalHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n`;
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  if(headMatch) finalHtml += headMatch[1];
  finalHtml += `\n<link rel="stylesheet" href="./style.css">\n</head>\n<body>\n`;
  
  const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i);
  if(bodyMatch) finalHtml += bodyMatch[1];
  
  finalHtml += `\n<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n`;
  finalHtml += `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>\n`;
  finalHtml += `<script src="./script.js"></script>\n`;
  finalHtml += `</body>\n</html>`;
  
  finalHtml = finalHtml.replace(/data-reactroot=""/g, '');
  
  fs.mkdirSync('new_web_clean', { recursive: true });
  fs.writeFileSync('new_web_clean/index.html', finalHtml);
  
  await browser.close();
  process.exit(0);
})();

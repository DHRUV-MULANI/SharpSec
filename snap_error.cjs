const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER_ERROR:', msg.text());
    }
  });
  
  page.on('pageerror', err => {
    console.log('PAGE_EXCEPTION:', err.toString());
  });

  try {
    await page.goto('http://localhost:5186', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));
    
    // Check if #root is empty
    const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML || 'NO_ROOT');
    if (rootHtml.trim() === '' || rootHtml === 'NO_ROOT') {
        console.log('ROOT_IS_EMPTY! The React app failed to mount or crashed without an error boundary.');
    } else {
        console.log('ROOT_HAS_CONTENT');
    }
  } catch (e) {
    console.log('GOTO_ERROR:', e.message);
  }
  
  await browser.close();
  process.exit(0);
})();

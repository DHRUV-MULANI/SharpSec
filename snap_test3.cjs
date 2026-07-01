const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER_LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER_ERROR:', err.toString()));
  
  await page.goto('http://localhost:5187', { waitUntil: 'networkidle0', timeout: 15000 }).catch(e => console.log('GOTO ERR:', e));
  
  const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
  const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML || '');
  console.log('BODY_BG:', bodyBg);
  console.log('ROOT_HTML_LENGTH:', rootHtml.length);
  if (rootHtml.length < 500) {
      console.log('ROOT_HTML_SNIPPET:', rootHtml);
  }
  
  await browser.close();
  process.exit(0);
})();

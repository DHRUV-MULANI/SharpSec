const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => { if(msg.type() === 'error') errors.push(msg.text()) });
  page.on('pageerror', err => errors.push(err.message));
  await page.goto('http://localhost:5178', { waitUntil: 'networkidle0' });
  
  const rootHtml = await page.$eval('#root', el => el.innerHTML);
  console.log('ROOT HTML LENGTH:', rootHtml.length);
  if (errors.length > 0) {
    console.log('ERRORS:', errors);
  }
  await browser.close();
  process.exit(0);
})();

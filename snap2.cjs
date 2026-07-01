const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('ERR:', err.toString()));
  await page.goto('http://localhost:5185', { waitUntil: 'networkidle2', timeout: 15000 }).catch(e => console.log(e));
  const html = await page.content();
  console.log('HTML_LENGTH:', html.length);
  if (html.length < 500) console.log(html);
  await browser.close();
  process.exit(0);
})();

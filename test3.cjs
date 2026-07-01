const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:5180', { waitUntil: 'networkidle0' });
  const html = await page.content();
  console.log("NAVBAR HTML:", html.includes('<nav'));
  console.log("BLACKHOLE HTML:", html.includes('pointer-events-none z-0'));
  console.log("IS WHITE SCREEN?:", html.includes('<div id="root"></div></body>')); // empty root
  await browser.close();
  process.exit(0);
})();

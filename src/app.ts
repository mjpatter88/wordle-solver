import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1200,1200']
  });
  const page = await browser.newPage();
  page.setViewport({width: 1200, height:1000});
  await page.goto('https://www.powerlanguage.co.uk/wordle/', { waitUntil: 'domcontentloaded' });
  // Wait a second after page load so all elements are ready for interaction.
  await page.waitForTimeout(1000);
  console.log('Page finished loading.')

  await browser.close();
})();


// References:
// https://github.com/puppeteer/examples/blob/master/pacman.js
// https://www.w3schools.com/cssref/css_selectors.asp
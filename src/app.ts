import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1200,1200']
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1200, height: 1000 });
    await page.goto('https://www.powerlanguage.co.uk/wordle/', { waitUntil: 'domcontentloaded' });
    // Wait a second after page load so all elements are ready for interaction.
    await page.waitForTimeout(1000);
    console.log('Page finished loading.')

    // The 'pierce' handler is necessary to select elements in the shadow dom.
    let closeHandle = await page.$('pierce/.close-icon');
    if(closeHandle) {
        console.log("Clicking close button to dismiss instructions...");
        await closeHandle.click();
    }
    await page.keyboard.type("abc");

    let tileHandles = await page.$$('pierce/.tile');
    console.log(tileHandles.length)
})();


// References:
// https://github.com/puppeteer/examples/blob/master/pacman.js
// https://www.w3schools.com/cssref/css_selectors.asp
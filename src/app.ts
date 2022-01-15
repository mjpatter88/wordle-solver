import puppeteer from 'puppeteer';
import { GamePage } from './game_page';
import { GamePlayer } from './game_player';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1200,1200']
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1200, height: 1000 });

    let gamePage = new GamePage(page);
    let gamePlayer = new GamePlayer(gamePage);
    await gamePlayer.play();
})();

// References:
// https://www.powerlanguage.co.uk/wordle/
// https://github.com/puppeteer/examples/blob/master/pacman.js
// https://www.w3schools.com/cssref/css_selectors.asp
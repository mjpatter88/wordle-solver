import puppeteer from 'puppeteer';
import { GamePage } from './game_page';
import { GameState } from './game_state';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1200,1200']
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1200, height: 1000 });

    let gameState = new GameState();
    let gamePage = new GamePage(page);
    await gamePage.visit();
    await gamePage.startGame();

    let guess = getNextGuess();
    await gamePage.enterGuess(guess);
    let result = await gamePage.getGuessResult(1);
    gameState.addGuess(guess, result);
    // TODO: start here. Build GamePlayer and Solver classes, etc.
})();

function getNextGuess(): string {
    return "tears";
}

// References:
// https://www.powerlanguage.co.uk/wordle/
// https://github.com/puppeteer/examples/blob/master/pacman.js
// https://www.w3schools.com/cssref/css_selectors.asp
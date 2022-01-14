import puppeteer from 'puppeteer';
import { GamePage } from './game_page';

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
    let result = await gamePage.getGuessResult();
    gameState.addGuess(guess, result);
    // TODO: start here. Read guess result in gamepage and then build GamePlayer and Solver classes with core.ts containing pure functions for generating guesses, etc.

    let tileHandles = await page.$$('pierce/.tile');
    console.log(tileHandles.length)
})();

function getNextGuess(): string {
    return "tears";
}

// References:
// https://www.powerlanguage.co.uk/wordle/
// https://github.com/puppeteer/examples/blob/master/pacman.js
// https://www.w3schools.com/cssref/css_selectors.asp
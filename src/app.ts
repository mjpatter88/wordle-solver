import puppeteer from 'puppeteer';
import { GamePage } from './game_page';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1200,1200']
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1200, height: 1000 });

    let gamePage = new GamePage(page);
    await gamePage.visit();
    await gamePage.startGame();
    await gamePage.enterGuess(getNextGuess());

    let tileHandles = await page.$$('pierce/.tile');
    console.log(tileHandles.length)
})();

function getNextGuess(): string {
    return "tears";
}

class GameState {
    private guesses: Guess[] = [];
}

class Guess {

}

enum LetterState {
    Correct, // letter appears in solution in same position
    Present, // letter appears in solution in different position
    Absent, // letter does not appear in solution
    TBD, // letter's state is not yet known
}

// References:
// https://www.powerlanguage.co.uk/wordle/
// https://github.com/puppeteer/examples/blob/master/pacman.js
// https://www.w3schools.com/cssref/css_selectors.asp
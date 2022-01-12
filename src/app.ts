import puppeteer, { Page } from 'puppeteer';

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

class GamePage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    public async visit(): Promise<void> {
        await this.page.goto('https://www.powerlanguage.co.uk/wordle/', { waitUntil: 'domcontentloaded' });
        // Wait a second after page load so all elements are ready for interaction.
        await this.page.waitForTimeout(1000);
        console.log('Page finished loading.')
    }

    public async startGame(): Promise<void> {
        // The 'pierce' handler is necessary to select elements in the shadow dom.
        let closeHandle = await this.page.$('pierce/.close-icon');
        if (closeHandle) {
            console.log("Clicking close button to dismiss instructions...");
            await closeHandle.click();
        }
    }

    public async enterGuess(word: string): Promise<void> {
        await this.page.keyboard.type(word);
        await this.page.keyboard.press('Enter');
        // Wait two seconds for the animation to complete.
        await this.page.waitForTimeout(2000);
        console.log("complete");
    }
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
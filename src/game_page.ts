import { Page } from 'puppeteer';
import { LetterState, letterStateFromAttrString } from './game_state';

export class GamePage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    public async visit(): Promise<void> {
        await this.page.goto('https://www.powerlanguage.co.uk/wordle/', { waitUntil: 'domcontentloaded' });
        // Wait a second after page load so all elements are ready for interaction.
        await this.page.waitForTimeout(1000);
        console.log('Page finished loading.');
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

    // number is the guess number to analyze. Valid values are 1-6.
    public async getGuessResult(number: number): Promise<LetterState[]>{
        let result: LetterState[] = [];
        if(number > 6) {
            throw new Error("Illegal guess number greater than 6: ${number}");
        }
        if(number < 1) {
            throw new Error("Illegal guess number less than 1: ${number}");
        }
        // The 'pierce' handler is necessary to select elements in the shadow dom.
        let gameRows = await this.page.$$('pierce/game-row');
        let guessRow = gameRows[number-1];
        let tiles = await guessRow.$$('pierce/game-tile');
        console.log(tiles.length);
        for(let tile of tiles) {
            // For some attributes, such as this one, it can only be fetched by evaluating js:
            // https://stackoverflow.com/questions/56467696/get-the-value-of-html-attributes-using-puppeteer
            let tileState = await this.page.evaluate(el => el.getAttribute("evaluation"), tile);
            result.push(letterStateFromAttrString(tileState));
        }
        console.log(result);
        return result;
    }
}

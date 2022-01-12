import { Page } from 'puppeteer';

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
}

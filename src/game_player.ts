import { GamePage } from "./game_page";
import { GameState } from "./game_state";

export class GamePlayer {
    private page: GamePage;
    private state: GameState;

    constructor(page: GamePage) {
        this.page = page;
        this.state = new GameState();
    }

    public async play() {
        await this.page.visit();
        await this.page.startGame();

        let guess = getNextGuess();
        await this.page.enterGuess(guess);
        let result = await this.page.getGuessResult(1);
        this.state.addGuess(guess, result);
        // TODO: start here. Build GamePlayer and Solver classes, etc.
    }
}

function getNextGuess(): string {
    return "tangy";
}

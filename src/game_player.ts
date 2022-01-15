import { Constraint } from "./constraint";
import { GamePage } from "./game_page";
import { GameState } from "./game_state";
import { Solver } from "./solver";

export class GamePlayer {
    private page: GamePage;
    private state: GameState;
    private solver: Solver;

    constructor(page: GamePage) {
        this.page = page;
        this.state = new GameState();
        this.solver = new Solver();
    }

    public async play() {
        await this.page.visit();
        await this.page.startGame();

        let constraints: Constraint[] = [];

        let guessNumber = 1;
        while (!this.state.isGameFinished()) {
            let guess = this.solver.getNextGuess(constraints);
            await this.page.enterGuess(guess);
            let result = await this.page.getGuessResult(guessNumber);
            this.state.addGuess(guess, result);
            constraints = Constraint.fromGuessResult(guess, result);
            guessNumber += 1;
        }
    }
}


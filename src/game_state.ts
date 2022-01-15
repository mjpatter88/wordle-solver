export class GameState {
    private guesses: Guess[] = [];

    public addGuess(guess: string, result: LetterState[]) {
        this.guesses.push(new Guess(guess, result));
    }

    public isGameFinished(): boolean {
        if (this.guesses.length == 0) {
            return false;
        }

        if (this.guesses[this.guesses.length - 1].isSolution()) {
            console.log("We won!");
            return true;
        }

        if (this.guesses.length == 6) {
            console.log("We lost :(");
            return true;
        }

        return false;
    }
}

class Guess {
    private letters: Letter[];
    constructor(guess: string, result: LetterState[]) {
        this.letters = [];
        if (guess.length != 5) {
            throw new Error(`Unexepcted guess length: ${guess.length}`);
        }
        if (result.length != 5) {
            throw new Error(`Unexepcted result length: ${result.length}`);
        }
        result.forEach((element, index) => {
            this.letters.push(new Letter(guess.charAt(index), element));
        });
    }
    public isSolution(): boolean {
        for (let letter of this.letters) {
            if (letter.state != LetterState.Correct) {
                return false;
            }
        }
        return true;
    }
}

class Letter {
    public letter: string;
    public state: LetterState;
    constructor(letter: string, state: LetterState) {
        this.letter = letter;
        this.state = state;
    }
}

export enum LetterState {
    Correct, // letter appears in solution in same position
    Present, // letter appears in solution in different position
    Absent, // letter does not appear in solution
    TBD, // letter's state is not yet known
}

export function letterStateFromAttrString(attr: string): LetterState {
    switch (attr) {
        case "correct":
            return LetterState.Correct;
        case "absent":
            return LetterState.Absent;
        case "present":
            return LetterState.Present;
        default:
            throw new Error("Illegal letter state attribute: {attr}");
    }
}
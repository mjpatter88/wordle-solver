
import { LetterState } from "./game_state";

// A constraint represents a letter, whether or not that letter is present, a position, and whether or not that letter is in that position.
// If the letter is not present, the position is basically ignored.
export class Constraint {
    letter: string;
    position: number;
    correctPosition: boolean;
    isPresent: boolean;

    constructor(letter: string, isPresent: boolean, position: number, correctPosition: boolean) {
        this.letter = letter;
        this.isPresent = isPresent;
        if (position > 5) {
            throw new Error(`Illegal position greater than 5: ${position}`);
        }
        if (position < 0) {
            throw new Error(`Illegal position less than 0: ${position}`);
        }
        this.position = position;
        this.correctPosition = correctPosition;
    }

    static fromGuessResult(guess: string, result: LetterState[]): Constraint[] {
        let constraints: Constraint[] = [];
        result.forEach((result, index) => {
            let letter = guess.charAt(index);
            switch (result) {
                case (LetterState.Correct):
                    constraints.push(new Constraint(letter, true, index, true));
                    break;
                case (LetterState.Present):
                    constraints.push(new Constraint(letter, true, index, false));
                    break;
                case (LetterState.Absent):
                    constraints.push(new Constraint(letter, false, index, false));
                    break;
            }
        });
        return constraints;
    }

    // Returns true if the given word meets this constraint.
    meetsConstraint(word: string): boolean {
        if (this.isPresent) {
            if (this.correctPosition) {
                return word[this.position] == this.letter;
            }
            else {
                return word[this.position] != this.letter && word.indexOf(this.letter) > -1;
            }

        } else {
            return word.indexOf(this.letter) == -1;
        }
    }
}
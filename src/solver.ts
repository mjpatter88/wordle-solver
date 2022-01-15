import { Constraint } from "./constraint";
import { answers } from "./word_lists";

// See README.md for how this was generated.
const initialGuessList = ["alert", "scion", "dumpy", "bough", "flack", "vowel"];

export class Solver {
    private solutionList: string[];
    private guessList: string[];

    constructor() {
        this.solutionList = answers;
        this.guessList = initialGuessList;
        // Reverse the list since we will be "pop"ing elements off the end.
        this.guessList.reverse();
    }

    // The list of constraints are *new* constraints that will be used to narrow down
    // the list of possible solutions.
    //
    // If there is only one possible solution, that will be returned.
    // If there are multiple possible solutions, then return the next guess from the guess list.
    //
    // This could be optimized to play on "hard mode" by generating the next guess from the list
    // of possible solutions rather than pre-generating a list of guesses offline.
    public getNextGuess(constraints: Constraint[]): string {
        constraints.forEach((constraint) => this.applyConstraint(constraint));
        console.log(`${this.solutionList.length} possibe solutions.`);
        console.log(this.solutionList);
        if (this.solutionList.length == 0) {
            throw new Error("No possible solution found!");
        }
        else if (this.solutionList.length == 1) {
            return this.solutionList[0];
        }
        else {
            if (this.guessList.length != 0) {
                return this.guessList.pop()!;
            }
            else {
                throw new Error("Encountered end of guesslist unexpectedly.");
            }
        }
    }

    // Narrow down the solutionList using the given constraint.
    private applyConstraint(constraint: Constraint) {
        this.solutionList = this.solutionList.filter((solution) => constraint.meetsConstraint(solution));
    }
}
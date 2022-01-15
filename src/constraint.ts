export class Constraint {
    letter: string;
    position?: number;

    constructor(letter: string, position?: number) {
        this.letter = letter;
        if (position !== undefined) {
            if (position > 5) {
                throw new Error("Illegal position greater than 5: ${position}");
            }
            if (position < 0) {
                throw new Error("Illegal position less than 0: ${position}");
            }
            this.position = position;
        }
    }
}
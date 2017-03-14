/// <reference path="Card.ts" />

abstract class BackerCard extends Card {
    constructor(name: string, description: string, savingThrows: DiceFace[]) {
        super(name, description);
        this.savingThrows = savingThrows;
    }

    savingThrows: DiceFace[];
}

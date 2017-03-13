/// <reference path="Card.ts" />

abstract class BackerCard extends Card {
    readonly savingThrows: DiceFace[];
    constructor(name: string, description: string, savingThrows: DiceFace[]) {
        super(name, description);
        this.savingThrows = savingThrows;
    }
}

/// <reference path="Card.ts" />

abstract class ActionCard extends Card {
    constructor(name: string, description: string, savingThrows: DiceFace[]) {
        super(name, description);
        this.savingThrows = savingThrows;
    }

    readonly savingThrows: DiceFace[];
}

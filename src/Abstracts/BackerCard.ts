/// <reference path="Card.ts" />

abstract class BackerCard extends Card {
    constructor(name: string, description: string, savingThrows: DiceFace[], fund: number, progress: number) {
        super(name, description);
        this.savingThrows = savingThrows;
        this.fund = fund;
        this.progress = progress;
    }

    savingThrows: DiceFace[];
    fund: number;
    progress: number;
}

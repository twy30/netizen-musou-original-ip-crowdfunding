class Deck {
    constructor() {
        this.cards = [];
    }

    add(card: Card): void {
        this.cards.push(card);
    }

    draw(): Card {
        if (this.isEmpty) { throw new Error("drawing from an empty deck"); }
        let index = Math.floor(this.cards.length * Math.random());
        let ret = this.cards[index];
        this.cards.splice(index, 1);
        return ret;
    }

    get isEmpty(): boolean { return this.cards.length <= 0; }

    get cardCount(): number { return this.cards.length; }

    private cards: Card[];
}

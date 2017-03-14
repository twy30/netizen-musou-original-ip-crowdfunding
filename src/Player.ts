class Player {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.fund = 0;
        this.progress = 0;
        this.goal = 10;
        this.cards = new Deck();
        this.backerCards = new Deck();
    }

    readonly id: number;
    readonly name: string;
    fund: number;
    progress: number;
    goal: number;
    cards: Deck;
    backerCards: Deck;
}

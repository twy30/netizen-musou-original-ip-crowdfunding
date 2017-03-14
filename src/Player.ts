class Player {
    constructor(name: string) {
        this.name = name;
        this.fund = 0;
        this.progress = 0;
        this.goal = 10;
        this.cards = new Deck();
    }

    private readonly name: string;
    private fund: number;
    private progress: number;
    private goal: number;
    private cards: Deck;
}

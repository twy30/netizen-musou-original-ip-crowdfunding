class Player {
    private fund: number;
    private progress: number;
    private goal: number;
    private cards: Deck<Card>;
    constructor() {
        this.fund = 0;
        this.progress = 0;
        this.goal = 10;
        this.cards = new Deck<Card>();
    }
}

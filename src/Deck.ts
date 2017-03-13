class Deck<T extends Card> {
    private cards: T[] = [];
    add(card: T): void {
        this.cards.push(card);
    }
}

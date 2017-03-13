abstract class ItemCard extends Card {
    readonly cost: number;
    constructor(name: string, description: string, cost: number) {
        super(name, description);
        this.cost = cost;
    }
}

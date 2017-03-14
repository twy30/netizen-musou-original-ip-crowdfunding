abstract class ItemCard extends Card {
    constructor(name: string, description: string, cost: number) {
        super(name, description);
        this.cost = cost;
    }

    cost: number;
}

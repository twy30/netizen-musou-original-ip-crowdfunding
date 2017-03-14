abstract class Card {
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    readonly name: string;
    readonly description: string;
}

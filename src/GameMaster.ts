class GameMaster {

// System Methods

    static WriteMessage(messageText: string): void {
        let newMessage = document.createElement("li");
        newMessage.innerText = messageText;
        let existingMessages = GameMaster.messageOutput.childNodes;
        if (existingMessages.length <= 0) {
            GameMaster.messageOutput.appendChild(newMessage);
        } else {
            GameMaster.messageOutput.insertBefore(newMessage, existingMessages[0]);
        }
    }

// Initialization

    static start(): void {
        GameMaster.initializeUI();
        GameMaster.initializeGame();
    }

// Initialization::UI

    private static initializeUI(): void {
        GameMaster.gamePanel = document.getElementById("gameUI");

        GameMaster.gameMasterPanel = document.createElement("div");
        GameMaster.gamePanel.appendChild(GameMaster.gameMasterPanel);

        GameMaster.playerPanels = document.createElement("div");
        GameMaster.gamePanel.appendChild(GameMaster.playerPanels);

        GameMaster.messagePanel = document.createElement("div");
        GameMaster.gamePanel.appendChild(GameMaster.messagePanel);
        GameMaster.messageOutput = document.createElement("ul");
        GameMaster.messagePanel.appendChild(GameMaster.messageOutput);
    }

    private static gamePanel: HTMLElement;
    private static gameMasterPanel: HTMLElement;
    private static playerPanels: HTMLElement;
    private static messagePanel: HTMLElement;
    private static messageOutput: HTMLElement;

// Initialization::Game

    private static initializeGame(): void {
        GameMaster.unusedActionCards = new Deck<ActionCard>();
        GameMaster.unusedActionCards.add(new CertainReasons());
        GameMaster.unusedActionCards.add(new ExpandedScope());
        GameMaster.unusedActionCards.add(new LetterOfLaw());

        GameMaster.unusedBackerCards = new Deck<BackerCard>();
        GameMaster.unusedBackerCards.add(new Fatso1());
        GameMaster.unusedBackerCards.add(new HotChick());
        GameMaster.unusedBackerCards.add(new OrdinaryFolk());

        GameMaster.unusedItemCards = new Deck<ItemCard>();
        GameMaster.unusedItemCards.add(new Encyclopedia());
        GameMaster.unusedItemCards.add(new EyeDrop());
        GameMaster.unusedItemCards.add(new MicroMovie());
    }

    private static unusedActionCards: Deck<ActionCard>;
    private static unusedBackerCards: Deck<BackerCard>;
    private static unusedItemCards: Deck<ItemCard>;
}

class GameMaster {
    private constructor() {}

// Public Methods

    WriteMessage(messageText: string, sourceName: string): void {
        let newMessage = document.createElement("li");
        newMessage.style.fontFamily = "monospace";
        newMessage.innerText = `[${new Date().toISOString()}][${sourceName}]: ${messageText}`;
        let existingMessages = this.messageOutput.childNodes;
        if (existingMessages.length <= 0) {
            this.messageOutput.appendChild(newMessage);
        } else {
            this.messageOutput.insertBefore(newMessage, existingMessages[0]);
        }
    }

// Initialization

    static start(): void {
        GameMaster._intance = new GameMaster();
        GameMaster.instance.initializeUI();
        GameMaster.instance.initializeGame();
    }

    static get instance(): GameMaster { return GameMaster._intance; }

    private static _intance: GameMaster;

// Initialization, UI

    private initializeUI(): void {
        this.gamePanel = document.getElementById("gameUI");

        this.gameMasterPanel = document.createElement("div");
        this.gamePanel.appendChild(this.gameMasterPanel);

        this.playerPanels = document.createElement("div");
        this.gamePanel.appendChild(this.playerPanels);

        this.messagePanel = document.createElement("div");
        this.gamePanel.appendChild(this.messagePanel);
        this.messageOutput = document.createElement("ul");
        this.messagePanel.appendChild(this.messageOutput);
    }

    private gamePanel: HTMLElement;
    private gameMasterPanel: HTMLElement;
    private playerPanels: HTMLElement;
    private messagePanel: HTMLElement;
    private messageOutput: HTMLElement;

// Initialization, Game

    private initializeGame(): void {
        this.newCards = new Deck();
        this.newCards.add(new CertainReasons());
        this.newCards.add(new ExpandedScope());
        this.newCards.add(new LetterOfLaw());
        this.newCards.add(new Encyclopedia());
        this.newCards.add(new EyeDrop());
        this.newCards.add(new MicroMovie());

        this.newBackerCards = new Deck();
        this.newBackerCards.add(new Fatso1());
        this.newBackerCards.add(new HotChick());
        this.newBackerCards.add(new OrdinaryFolk());

        this.players = [new Player("Player1"), new Player("Player2")];
    }

    private newCards: Deck;
    private newBackerCards: Deck;
    private players: Player[];
}

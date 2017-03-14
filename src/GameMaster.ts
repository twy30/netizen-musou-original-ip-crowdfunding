class GameMaster {
    private constructor() {}

// Public Methods

    WriteMessage(messageText: string): void {
        let newMessage = document.createElement("li");
        newMessage.style.fontFamily = "monospace";
        newMessage.innerText = `[${new Date().toISOString()}] ${messageText}`;
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
        GameMaster.instance.initializeSystemUI();
        GameMaster.instance.initializeGame();
        GameMaster.instance.initializePlayerUI();
    }

    static get instance(): GameMaster { return GameMaster._intance; }

    private static _intance: GameMaster;

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
        for (let i = 2; i > 0; --i) { this.addToNewBackerCards(new Fatso1()); }
        for (let i = 2; i > 0; --i) { this.addToNewBackerCards(new Fatso2()); }
        for (let i = 2; i > 0; --i) { this.addToNewBackerCards(new Fatso3()); }
        for (let i = 9; i > 0; --i) { this.addToNewBackerCards(new Groupie()); }
        for (let i = 2; i > 0; --i) { this.addToNewBackerCards(new HotChick()); }
        for (let i = 2; i > 0; --i) { this.addToNewBackerCards(new OnePercent()); }
        for (let i = 5; i > 0; --i) { this.addToNewBackerCards(new OrdinaryFolk()); }

        this.players = [];
        for (let i = 0; i < 2; ++i) { this.players.push(new Player(i, `玩家${i}`)); }

        this.availableBackerCards = new Deck();
        this.drawFromNewBackerCardsThenAddToAvailableBackerCards();
    }

    private addToNewBackerCards(card: Card): void {
        this.newBackerCards.add(card);
        this.WriteMessage(`ＧＭ將 ${card.name} 加入投資人卡池。`);
    }

    private drawFromNewBackerCardsThenAddToAvailableBackerCards(): void {
        let expectedAvailableBackerCardCount = 5;
        while (this.availableBackerCards.cardCount < expectedAvailableBackerCardCount) {
            if (this.newBackerCards.isEmpty) {
                break;
            } else {
                let newCard = this.newBackerCards.draw();
                this.availableBackerCards.add(newCard);
                this.WriteMessage(`ＧＭ從投資人卡池中抽出 ${newCard.name} 加入潛在投資人區。`);
            }
        }
    }

    private newCards: Deck;
    private newBackerCards: Deck;
    private players: Player[];
    private availableBackerCards: Deck;

// Initialization, System UI

    private initializeSystemUI(): void {
        this.gamePanel = document.getElementById("gameUI");

        this.gameMasterPanel = document.createElement("div");
        this.gamePanel.appendChild(this.gameMasterPanel);
        let gameInfoPanel = document.createElement("div");
        gameInfoPanel.appendChild(document.createTextNode("潛在投資人："));
        this.gameMasterOutput = document.createElement("ul");
        gameInfoPanel.appendChild(this.gameMasterOutput);
        this.gameMasterPanel.appendChild(gameInfoPanel);

        this.messagePanel = document.createElement("div");
        this.gamePanel.appendChild(this.messagePanel);
        this.messagePanel.appendChild(document.createTextNode("系統訊息："));
        this.messageOutput = document.createElement("ul");
        this.messagePanel.appendChild(this.messageOutput);
    }

    private gamePanel: HTMLElement;
    
    private gameMasterPanel: HTMLElement;
    private gameMasterOutput: HTMLElement;

    private messagePanel: HTMLElement;
    private messageOutput: HTMLElement;

// Initialization, Player UI

    private initializePlayerUI(): void {
        this.playerPanel = document.createElement("div");
        this.gamePanel.insertBefore(this.playerPanel, this.gamePanel.lastChild);
        this.playerOutputs = [];
        for (let i = 0; i < this.players.length; ++i) {
            let playerInfoPanel = document.createElement("div");
            playerInfoPanel.appendChild(document.createTextNode(this.players[i].name))
            let playerOutput = document.createElement("ul");
            playerInfoPanel.appendChild(playerOutput);
            this.playerOutputs.push(playerOutput);
            this.playerPanel.appendChild(playerInfoPanel);
        }
    }

    private playerPanel: HTMLElement;
    private playerOutputs: HTMLElement[];
}

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
        for (let i = 0; i < 1; ++i) { this.players.push(new Player(i, `玩家${i}`)); }

        this.availableBackerCards = new Deck();
        this.drawFromNewBackerCardsThenAddToAvailableBackerCards();
    }

    private addToNewBackerCards(card: Card): void {
        this.newBackerCards.add(card);
        this.WriteMessage(`ＧＭ無中生有變出一張【${card.name}】，加入潛在投資人卡池。`);
    }

    private drawFromNewBackerCardsThenAddToAvailableBackerCards(): void {
        let expectedAvailableBackerCardCount = 5;
        while (this.availableBackerCards.cardCount < expectedAvailableBackerCardCount) {
            if (this.newBackerCards.isEmpty) {
                break;
            } else {
                let newCard = this.newBackerCards.draw();
                this.availableBackerCards.add(newCard);
                this.WriteMessage(`ＧＭ從潛在投資人卡池中抽出【${newCard.name}】加入投資人區。`);
            }
        }

        this.listBackers();

        if (this.players[0].progress >= this.players[0].goal) {
            this.WriteMessage("★☆★☆★☆★★☆★☆★☆★");
            this.WriteMessage("☆★☆★☆★☆☆★☆★☆★☆");
            this.WriteMessage("★☆★☆★☆★★☆★☆★☆★");
            this.WriteMessage("☆★☆★☆★☆☆★☆★☆★☆");
            this.WriteMessage("進度完成，遊戲結束");
            this.WriteMessage(`最後成績：現金 ${this.players[0].fund} 萬，進度 ${this.players[0].progress}/${this.players[0].goal} = ${Math.round(this.players[0].progress*100/this.players[0].goal)}%`);
        } else if (this.availableBackerCards.cardCount <= 0) {
            this.WriteMessage("╳✕╳✕╳✕╳");
            this.WriteMessage("✕╳✕╳✕╳✕");
            this.WriteMessage("╳✕╳✕╳✕╳");
            this.WriteMessage("✕╳✕╳✕╳✕");
            this.WriteMessage("萬人響應，零人到場，遊戲結束");
            this.WriteMessage(`最後成績：現金 ${this.players[0].fund} 萬，進度 ${this.players[0].progress}/${this.players[0].goal} = ${Math.round(this.players[0].progress*100/this.players[0].goal)}%`);
        }
    }

    private listBackers(): void {
        this.gameMasterPanel.firstChild.firstChild.textContent = `目前有 ${this.availableBackerCards.cardCount} 位投資人（潛在投資人卡池中還剩 ${this.newBackerCards.cardCount} 人)。`;
        while (this.gameMasterOutput.firstChild !== null) {
            this.gameMasterOutput.removeChild(this.gameMasterOutput.firstChild);
        }
        for (let card of this.availableBackerCards.cards) {
            let cardNode = document.createElement("li");
            cardNode.style.fontFamily = "monospace";
            cardNode.addEventListener("click", function(){ GameMaster.instance.pitch(<BackerCard> card); });

            let savingThrowString = "";
            for(let df of (<BackerCard>card).savingThrows) { savingThrowString += this.getDiceFace(df); }

            let cardEntry = `【${card.name}；${card.description}】 ${savingThrowString} [現金+＄${(<BackerCard>card).fund}萬] [進度+${(<BackerCard>card).progress}] ｛點此擲骰向這位投資人募款｝`;
            cardNode.textContent = cardEntry;
            this.gameMasterOutput.appendChild(cardNode);
        }
    }

    private pitch(card: BackerCard): void {
        let diceRoll = <DiceFace> (Math.floor(Math.random() * 6) + 1);
        let fundingSuccessful = card.savingThrows.indexOf(diceRoll) > -1;

        this.WriteMessage("");

        let message = `你對【${card.name}】擲出 ${this.getDiceFace(diceRoll)} ，`;
        
        if (fundingSuccessful) {
            message += `[現金+＄${card.fund}萬] [進度+${card.progress}]`;
            this.WriteMessage(message);
            let indexToRemove = this.availableBackerCards.cards.indexOf(card);
            this.availableBackerCards.cards.splice(indexToRemove, 1);
            this.players[0].cards.add(card);
            this.WriteMessage(`ＧＭ將【${card.name}】自 投資人區 移到你的 成功募資區 。`);

            this.drawPlayerInfo();
        } else {
            message += "募款失敗。";
            this.WriteMessage(message);
            let indexToRemove = this.availableBackerCards.cards.indexOf(card);
            this.availableBackerCards.cards.splice(indexToRemove, 1);
            this.WriteMessage(`ＧＭ將【${card.name}】自 投資人區 移到 廢牌區 。`);
        }

        this.drawFromNewBackerCardsThenAddToAvailableBackerCards();
    }

    private drawPlayerInfo(): void {
        while (this.playerOutputs[0].firstChild !== null) {
            this.playerOutputs[0].removeChild(this.playerOutputs[0].firstChild);
        }

        let playerFund = 0;
        let playerProgress = 0;

        for (let card of this.players[0].cards.cards) {
            let cardNode = document.createElement("li");
            cardNode.style.fontFamily = "monospace";

            let savingThrowString = "";
            for(let df of (<BackerCard>card).savingThrows) { savingThrowString += this.getDiceFace(df); }

            let cardEntry = `【${card.name}；${card.description}】 ${savingThrowString} [現金+＄${(<BackerCard>card).fund}萬] [進度+${(<BackerCard>card).progress}]`;
            cardNode.textContent = cardEntry;
            this.playerOutputs[0].appendChild(cardNode);

            playerFund += (<BackerCard>card).fund;
            playerProgress += (<BackerCard>card).progress;
        }

        this.players[0].fund = playerFund;
        this.players[0].progress = playerProgress;
        this.playerPanel.firstChild.firstChild.textContent = `${this.players[0].name} 目前資金 ${this.players[0].fund} 進度 ${this.players[0].progress}/${this.players[0].goal}`;
    }

    private getDiceFace(diceFace: DiceFace): string {
        switch (diceFace) {
            case DiceFace.D1:
            return "\u2680";
            case DiceFace.D2:
            return "\u2681";
            case DiceFace.D3:
            return "\u2682";
            case DiceFace.D4:
            return "\u2683";
            case DiceFace.D5:
            return "\u2684";
            case DiceFace.D6:
            return "\u2685";
            default:
            throw new Error("unknown diceFace: " + diceFace);
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

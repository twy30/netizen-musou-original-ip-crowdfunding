class GameMaster {
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

    static start(): void {
        GameMaster.initializeUI();
    }

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
}

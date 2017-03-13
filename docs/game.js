var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameMaster = (function () {
    function GameMaster() {
    }
    GameMaster.WriteMessage = function (messageText) {
        var newMessage = document.createElement("li");
        newMessage.innerText = messageText;
        var existingMessages = GameMaster.messageOutput.childNodes;
        if (existingMessages.length <= 0) {
            GameMaster.messageOutput.appendChild(newMessage);
        }
        else {
            GameMaster.messageOutput.insertBefore(newMessage, existingMessages[0]);
        }
    };
    GameMaster.start = function () {
        GameMaster.initializeUI();
    };
    GameMaster.initializeUI = function () {
        GameMaster.gamePanel = document.getElementById("gameUI");
        GameMaster.gameMasterPanel = document.createElement("div");
        GameMaster.gamePanel.appendChild(GameMaster.gameMasterPanel);
        GameMaster.playerPanels = document.createElement("div");
        GameMaster.gamePanel.appendChild(GameMaster.playerPanels);
        GameMaster.messagePanel = document.createElement("div");
        GameMaster.gamePanel.appendChild(GameMaster.messagePanel);
        GameMaster.messageOutput = document.createElement("ul");
        GameMaster.messagePanel.appendChild(GameMaster.messageOutput);
    };
    return GameMaster;
}());
var Card = (function () {
    function Card() {
    }
    return Card;
}());
/// <reference path="Card.ts" />
var ActionCard = (function (_super) {
    __extends(ActionCard, _super);
    function ActionCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ActionCard;
}(Card));
/// <reference path="Card.ts" />
var BackerCard = (function (_super) {
    __extends(BackerCard, _super);
    function BackerCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BackerCard;
}(Card));
var ItemCard = (function (_super) {
    __extends(ItemCard, _super);
    function ItemCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemCard;
}(Card));
//# sourceMappingURL=game.js.map
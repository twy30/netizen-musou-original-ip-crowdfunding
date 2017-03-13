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
var Deck = (function () {
    function Deck() {
        this.cards = [];
    }
    Deck.prototype.add = function (card) {
        this.cards.push(card);
    };
    return Deck;
}());
var GameMaster = (function () {
    function GameMaster() {
    }
    // System Methods
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
    // Initialization
    GameMaster.start = function () {
        GameMaster.initializeUI();
        GameMaster.initializeGame();
    };
    // Initialization::UI
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
    // Initialization::Game
    GameMaster.initializeGame = function () {
        GameMaster.unusedBackerCards = new Deck();
        GameMaster.unusedBackerCards.add(new OrdinaryFolk());
    };
    return GameMaster;
}());
var Card = (function () {
    function Card(name, description) {
        this.name = name;
        this.description = description;
    }
    return Card;
}());
/// <reference path="Card.ts" />
var ActionCard = (function (_super) {
    __extends(ActionCard, _super);
    function ActionCard(name, description, savingThrows) {
        var _this = _super.call(this, name, description) || this;
        _this.savingThrows = savingThrows;
        return _this;
    }
    return ActionCard;
}(Card));
/// <reference path="Card.ts" />
var BackerCard = (function (_super) {
    __extends(BackerCard, _super);
    function BackerCard(name, description, savingThrows) {
        var _this = _super.call(this, name, description) || this;
        _this.savingThrows = savingThrows;
        return _this;
    }
    return BackerCard;
}(Card));
var DiceFace;
(function (DiceFace) {
    DiceFace[DiceFace["D1"] = 1] = "D1";
    DiceFace[DiceFace["D2"] = 2] = "D2";
    DiceFace[DiceFace["D3"] = 3] = "D3";
    DiceFace[DiceFace["D4"] = 4] = "D4";
    DiceFace[DiceFace["D5"] = 5] = "D5";
    DiceFace[DiceFace["D6"] = 6] = "D6";
})(DiceFace || (DiceFace = {}));
var ItemCard = (function (_super) {
    __extends(ItemCard, _super);
    function ItemCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemCard;
}(Card));
var CertainReasons = (function (_super) {
    __extends(CertainReasons, _super);
    function CertainReasons() {
        return _super.call(this, "某些理由", "所以我們的進度會稍微延後", [
            DiceFace.D1,
            DiceFace.D2,
            DiceFace.D3,
        ]) || this;
    }
    return CertainReasons;
}(ActionCard));
var ExpandedScope = (function (_super) {
    __extends(ExpandedScope, _super);
    function ExpandedScope() {
        return _super.call(this, "擴大規模", "給支持我們的人更多感動！", [
            DiceFace.D1,
            DiceFace.D2,
        ]) || this;
    }
    return ExpandedScope;
}(ActionCard));
var LetterOfLaw = (function (_super) {
    __extends(LetterOfLaw, _super);
    function LetterOfLaw() {
        return _super.call(this, "正當事業", "正當事業，絕對合法！", [
            DiceFace.D1,
            DiceFace.D2,
            DiceFace.D3,
            DiceFace.D4,
            DiceFace.D5,
        ]) || this;
    }
    return LetterOfLaw;
}(ActionCard));
var Fatso1 = (function (_super) {
    __extends(Fatso1, _super);
    function Fatso1() {
        return _super.call(this, "肥宅一號", "忽有龐然大物，拔山倒樹而來", [
            DiceFace.D1,
            DiceFace.D2,
            DiceFace.D3,
            DiceFace.D4,
            DiceFace.D5,
        ]) || this;
    }
    return Fatso1;
}(BackerCard));
var HotChick = (function (_super) {
    __extends(HotChick, _super);
    function HotChick() {
        return _super.call(this, "正妹", "聞起來香香der", [
            DiceFace.D1,
            DiceFace.D2,
        ]) || this;
    }
    return HotChick;
}(BackerCard));
var OrdinaryFolk = (function (_super) {
    __extends(OrdinaryFolk, _super);
    function OrdinaryFolk() {
        return _super.call(this, "普通人", "普通到你記不住他", [
            DiceFace.D1,
            DiceFace.D2,
            DiceFace.D3,
        ]) || this;
    }
    return OrdinaryFolk;
}(BackerCard));
//# sourceMappingURL=game.js.map
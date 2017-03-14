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
    Deck.prototype.draw = function () {
        if (this.isEmpty()) {
            throw new Error("drawing from an empty deck");
        }
        var index = this.cards.length * Math.random();
        var ret = this.cards[index];
        this.cards.splice(index, 1);
        return ret;
    };
    Deck.prototype.isEmpty = function () { return this.cards.length <= 0; };
    return Deck;
}());
var DiceFace;
(function (DiceFace) {
    DiceFace[DiceFace["D1"] = 1] = "D1";
    DiceFace[DiceFace["D2"] = 2] = "D2";
    DiceFace[DiceFace["D3"] = 3] = "D3";
    DiceFace[DiceFace["D4"] = 4] = "D4";
    DiceFace[DiceFace["D5"] = 5] = "D5";
    DiceFace[DiceFace["D6"] = 6] = "D6";
})(DiceFace || (DiceFace = {}));
var GameMaster = (function () {
    function GameMaster() {
    }
    // Public Methods
    GameMaster.prototype.WriteMessage = function (messageText, sourceName) {
        var newMessage = document.createElement("li");
        newMessage.style.fontFamily = "monospace";
        newMessage.innerText = "[" + new Date().toISOString() + "][" + sourceName + "]: " + messageText;
        var existingMessages = this.messageOutput.childNodes;
        if (existingMessages.length <= 0) {
            this.messageOutput.appendChild(newMessage);
        }
        else {
            this.messageOutput.insertBefore(newMessage, existingMessages[0]);
        }
    };
    // Initialization
    GameMaster.start = function () {
        GameMaster._intance = new GameMaster();
        GameMaster.instance.initializeUI();
        GameMaster.instance.initializeGame();
    };
    Object.defineProperty(GameMaster, "instance", {
        get: function () { return GameMaster._intance; },
        enumerable: true,
        configurable: true
    });
    // Initialization, UI
    GameMaster.prototype.initializeUI = function () {
        this.gamePanel = document.getElementById("gameUI");
        this.gameMasterPanel = document.createElement("div");
        this.gamePanel.appendChild(this.gameMasterPanel);
        this.playerPanels = document.createElement("div");
        this.gamePanel.appendChild(this.playerPanels);
        this.messagePanel = document.createElement("div");
        this.gamePanel.appendChild(this.messagePanel);
        this.messageOutput = document.createElement("ul");
        this.messagePanel.appendChild(this.messageOutput);
    };
    // Initialization, Game
    GameMaster.prototype.initializeGame = function () {
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
    };
    return GameMaster;
}());
var Player = (function () {
    function Player(name) {
        this.name = name;
        this.fund = 0;
        this.progress = 0;
        this.goal = 10;
        this.cards = new Deck();
    }
    return Player;
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
var ItemCard = (function (_super) {
    __extends(ItemCard, _super);
    function ItemCard(name, description, cost) {
        var _this = _super.call(this, name, description) || this;
        _this.cost = cost;
        return _this;
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
var Encyclopedia = (function (_super) {
    __extends(Encyclopedia, _super);
    function Encyclopedia() {
        return _super.call(this, "設定集", "這有一個龐大的世界觀", 400) || this;
    }
    return Encyclopedia;
}(ItemCard));
var EyeDrop = (function (_super) {
    __extends(EyeDrop, _super);
    function EyeDrop() {
        return _super.call(this, "眼藥水", "你看到他講到都哭了…", 100) || this;
    }
    return EyeDrop;
}(ItemCard));
var MicroMovie = (function (_super) {
    __extends(MicroMovie, _super);
    function MicroMovie() {
        return _super.call(this, "微電影", "我的一個夢想…", 300) || this;
    }
    return MicroMovie;
}(ItemCard));
//# sourceMappingURL=game.js.map
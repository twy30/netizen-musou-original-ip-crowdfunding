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
        if (this.isEmpty) {
            throw new Error("drawing from an empty deck");
        }
        var index = Math.floor(this.cards.length * Math.random());
        var ret = this.cards[index];
        this.cards.splice(index, 1);
        return ret;
    };
    Object.defineProperty(Deck.prototype, "isEmpty", {
        get: function () { return this.cards.length <= 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Deck.prototype, "cardCount", {
        get: function () { return this.cards.length; },
        enumerable: true,
        configurable: true
    });
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
    GameMaster.prototype.WriteMessage = function (messageText) {
        var newMessage = document.createElement("li");
        newMessage.style.fontFamily = "monospace";
        newMessage.innerText = "[" + new Date().toISOString() + "] " + messageText;
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
        GameMaster.instance.initializeSystemUI();
        GameMaster.instance.initializeGame();
        GameMaster.instance.initializePlayerUI();
    };
    Object.defineProperty(GameMaster, "instance", {
        get: function () { return GameMaster._intance; },
        enumerable: true,
        configurable: true
    });
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
        for (var i = 2; i > 0; --i) {
            this.addToNewBackerCards(new Fatso1());
        }
        for (var i = 2; i > 0; --i) {
            this.addToNewBackerCards(new Fatso2());
        }
        for (var i = 2; i > 0; --i) {
            this.addToNewBackerCards(new Fatso3());
        }
        for (var i = 9; i > 0; --i) {
            this.addToNewBackerCards(new Groupie());
        }
        for (var i = 2; i > 0; --i) {
            this.addToNewBackerCards(new HotChick());
        }
        for (var i = 2; i > 0; --i) {
            this.addToNewBackerCards(new OnePercent());
        }
        for (var i = 5; i > 0; --i) {
            this.addToNewBackerCards(new OrdinaryFolk());
        }
        this.players = [];
        for (var i = 0; i < 1; ++i) {
            this.players.push(new Player(i, "\u73A9\u5BB6" + i));
        }
        this.availableBackerCards = new Deck();
        this.drawFromNewBackerCardsThenAddToAvailableBackerCards();
    };
    GameMaster.prototype.addToNewBackerCards = function (card) {
        this.newBackerCards.add(card);
        this.WriteMessage("\uFF27\uFF2D\u7121\u4E2D\u751F\u6709\u8B8A\u51FA\u4E00\u5F35\u3010" + card.name + "\u3011\uFF0C\u52A0\u5165\u6F5B\u5728\u6295\u8CC7\u4EBA\u5361\u6C60\u3002");
    };
    GameMaster.prototype.drawFromNewBackerCardsThenAddToAvailableBackerCards = function () {
        var expectedAvailableBackerCardCount = 5;
        while (this.availableBackerCards.cardCount < expectedAvailableBackerCardCount) {
            if (this.newBackerCards.isEmpty) {
                break;
            }
            else {
                var newCard = this.newBackerCards.draw();
                this.availableBackerCards.add(newCard);
                this.WriteMessage("\uFF27\uFF2D\u5F9E\u6F5B\u5728\u6295\u8CC7\u4EBA\u5361\u6C60\u4E2D\u62BD\u51FA\u3010" + newCard.name + "\u3011\u52A0\u5165\u6295\u8CC7\u4EBA\u5340\u3002");
            }
        }
        this.listBackers();
        if (this.players[0].progress >= this.players[0].goal) {
            this.WriteMessage("★☆★☆★☆★★☆★☆★☆★");
            this.WriteMessage("☆★☆★☆★☆☆★☆★☆★☆");
            this.WriteMessage("★☆★☆★☆★★☆★☆★☆★");
            this.WriteMessage("☆★☆★☆★☆☆★☆★☆★☆");
            this.WriteMessage("進度完成，遊戲結束");
            this.WriteMessage("\u6700\u5F8C\u6210\u7E3E\uFF1A\u73FE\u91D1 " + this.players[0].fund + " \u842C\uFF0C\u9032\u5EA6 " + this.players[0].progress + "/{this.players[0].goal} = " + Math.round(this.players[0].progress * 100 / this.players[0].goal) + "%");
        }
        else if (this.availableBackerCards.cardCount <= 0) {
            this.WriteMessage("╳✕╳✕╳✕╳");
            this.WriteMessage("✕╳✕╳✕╳✕");
            this.WriteMessage("╳✕╳✕╳✕╳");
            this.WriteMessage("✕╳✕╳✕╳✕");
            this.WriteMessage("萬人響應，零人到場，遊戲結束");
            this.WriteMessage("\u6700\u5F8C\u6210\u7E3E\uFF1A\u73FE\u91D1 " + this.players[0].fund + " \u842C\uFF0C\u9032\u5EA6 " + this.players[0].progress + "/{this.players[0].goal} = " + Math.round(this.players[0].progress * 100 / this.players[0].goal) + "%");
        }
    };
    GameMaster.prototype.listBackers = function () {
        this.gameMasterPanel.firstChild.firstChild.textContent = "\u76EE\u524D\u6709 " + this.availableBackerCards.cardCount + " \u4F4D\u6295\u8CC7\u4EBA\uFF08\u6F5B\u5728\u6295\u8CC7\u4EBA\u5361\u6C60\u4E2D\u9084\u5269 " + this.newBackerCards.cardCount + " \u4EBA)\u3002";
        while (this.gameMasterOutput.firstChild !== null) {
            this.gameMasterOutput.removeChild(this.gameMasterOutput.firstChild);
        }
        var _loop_1 = function (card) {
            var cardNode = document.createElement("li");
            cardNode.style.fontFamily = "monospace";
            cardNode.addEventListener("click", function () { GameMaster.instance.pitch(card); });
            var savingThrowString = "";
            for (var _i = 0, _a = card.savingThrows; _i < _a.length; _i++) {
                var df = _a[_i];
                savingThrowString += this_1.getDiceFace(df);
            }
            var cardEntry = "\u3010" + card.name + "\uFF1B" + card.description + "\u3011 " + savingThrowString + " [\u73FE\u91D1+\uFF04" + card.fund + "\u842C] [\u9032\u5EA6+" + card.progress + "] \uFF5B\u9EDE\u6B64\u64F2\u9AB0\u5411\u9019\u4F4D\u6295\u8CC7\u4EBA\u52DF\u6B3E\uFF5D";
            cardNode.textContent = cardEntry;
            this_1.gameMasterOutput.appendChild(cardNode);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.availableBackerCards.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            _loop_1(card);
        }
    };
    GameMaster.prototype.pitch = function (card) {
        var diceRoll = (Math.floor(Math.random() * 6) + 1);
        var fundingSuccessful = card.savingThrows.indexOf(diceRoll) > -1;
        this.WriteMessage("");
        var message = "\u4F60\u5C0D\u3010" + card.name + "\u3011\u64F2\u51FA " + this.getDiceFace(diceRoll) + " \uFF0C";
        if (fundingSuccessful) {
            message += "[\u73FE\u91D1+\uFF04" + card.fund + "\u842C] [\u9032\u5EA6+" + card.progress + "]";
            this.WriteMessage(message);
            var indexToRemove = this.availableBackerCards.cards.indexOf(card);
            this.availableBackerCards.cards.splice(indexToRemove, 1);
            this.players[0].cards.add(card);
            this.WriteMessage("\uFF27\uFF2D\u5C07\u3010" + card.name + "\u3011\u81EA \u6295\u8CC7\u4EBA\u5340 \u79FB\u5230\u4F60\u7684 \u6210\u529F\u52DF\u8CC7\u5340 \u3002");
            this.drawPlayerInfo();
        }
        else {
            message += "募款失敗。";
            this.WriteMessage(message);
            var indexToRemove = this.availableBackerCards.cards.indexOf(card);
            this.availableBackerCards.cards.splice(indexToRemove, 1);
            this.WriteMessage("\uFF27\uFF2D\u5C07\u3010" + card.name + "\u3011\u81EA \u6295\u8CC7\u4EBA\u5340 \u79FB\u5230 \u5EE2\u724C\u5340 \u3002");
        }
        this.drawFromNewBackerCardsThenAddToAvailableBackerCards();
    };
    GameMaster.prototype.drawPlayerInfo = function () {
        while (this.playerOutputs[0].firstChild !== null) {
            this.playerOutputs[0].removeChild(this.playerOutputs[0].firstChild);
        }
        var playerFund = 0;
        var playerProgress = 0;
        for (var _i = 0, _a = this.players[0].cards.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            var cardNode = document.createElement("li");
            cardNode.style.fontFamily = "monospace";
            var savingThrowString = "";
            for (var _b = 0, _c = card.savingThrows; _b < _c.length; _b++) {
                var df = _c[_b];
                savingThrowString += this.getDiceFace(df);
            }
            var cardEntry = "\u3010" + card.name + "\uFF1B" + card.description + "\u3011 " + savingThrowString + " [\u73FE\u91D1+\uFF04" + card.fund + "\u842C] [\u9032\u5EA6+" + card.progress + "]";
            cardNode.textContent = cardEntry;
            this.playerOutputs[0].appendChild(cardNode);
            playerFund += card.fund;
            playerProgress += card.progress;
        }
        this.players[0].fund = playerFund;
        this.players[0].progress = playerProgress;
        this.playerPanel.firstChild.firstChild.textContent = this.players[0].name + " \u76EE\u524D\u8CC7\u91D1 " + this.players[0].fund + " \u9032\u5EA6 " + this.players[0].progress + "/" + this.players[0].goal;
    };
    GameMaster.prototype.getDiceFace = function (diceFace) {
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
    };
    // Initialization, System UI
    GameMaster.prototype.initializeSystemUI = function () {
        this.gamePanel = document.getElementById("gameUI");
        this.gameMasterPanel = document.createElement("div");
        this.gamePanel.appendChild(this.gameMasterPanel);
        var gameInfoPanel = document.createElement("div");
        gameInfoPanel.appendChild(document.createTextNode("潛在投資人："));
        this.gameMasterOutput = document.createElement("ul");
        gameInfoPanel.appendChild(this.gameMasterOutput);
        this.gameMasterPanel.appendChild(gameInfoPanel);
        this.messagePanel = document.createElement("div");
        this.gamePanel.appendChild(this.messagePanel);
        this.messagePanel.appendChild(document.createTextNode("系統訊息："));
        this.messageOutput = document.createElement("ul");
        this.messagePanel.appendChild(this.messageOutput);
    };
    // Initialization, Player UI
    GameMaster.prototype.initializePlayerUI = function () {
        this.playerPanel = document.createElement("div");
        this.gamePanel.insertBefore(this.playerPanel, this.gamePanel.lastChild);
        this.playerOutputs = [];
        for (var i = 0; i < this.players.length; ++i) {
            var playerInfoPanel = document.createElement("div");
            playerInfoPanel.appendChild(document.createTextNode(this.players[i].name));
            var playerOutput = document.createElement("ul");
            playerInfoPanel.appendChild(playerOutput);
            this.playerOutputs.push(playerOutput);
            this.playerPanel.appendChild(playerInfoPanel);
        }
    };
    return GameMaster;
}());
var Player = (function () {
    function Player(id, name) {
        this.id = id;
        this.name = name;
        this.fund = 0;
        this.progress = 0;
        this.goal = 10;
        this.cards = new Deck();
        this.backerCards = new Deck();
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
    function BackerCard(name, description, savingThrows, fund, progress) {
        var _this = _super.call(this, name, description) || this;
        _this.savingThrows = savingThrows;
        _this.fund = fund;
        _this.progress = progress;
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
        ], 300, 3) || this;
    }
    return Fatso1;
}(BackerCard));
var Fatso2 = (function (_super) {
    __extends(Fatso2, _super);
    function Fatso2() {
        return _super.call(this, "肥宅二號", "再刷一單就好……", [
            DiceFace.D1,
            DiceFace.D2,
            DiceFace.D3,
            DiceFace.D4,
            DiceFace.D5,
        ], 50, 0) || this;
    }
    return Fatso2;
}(BackerCard));
var Fatso3 = (function (_super) {
    __extends(Fatso3, _super);
    function Fatso3() {
        return _super.call(this, "肥宅三號", "肥宅沒人愛 ＱＱ", [
            DiceFace.D1,
            DiceFace.D2,
            DiceFace.D3,
            DiceFace.D4,
            DiceFace.D5,
            DiceFace.D6,
        ], 300, 2) || this;
    }
    return Fatso3;
}(BackerCard));
var Groupie = (function (_super) {
    __extends(Groupie, _super);
    function Groupie() {
        return _super.call(this, "粉粉", "Ｏ大加油！", [
            DiceFace.D1,
            DiceFace.D2,
            DiceFace.D3,
            DiceFace.D4,
            DiceFace.D5,
        ], 50, 0) || this;
    }
    return Groupie;
}(BackerCard));
var HotChick = (function (_super) {
    __extends(HotChick, _super);
    function HotChick() {
        return _super.call(this, "正妹", "聞起來香香der", [
            DiceFace.D1,
            DiceFace.D2,
        ], 100, 1) || this;
    }
    return HotChick;
}(BackerCard));
var OnePercent = (function (_super) {
    __extends(OnePercent, _super);
    function OnePercent() {
        return _super.call(this, "有錢人", "別讓有錢人不開心", [
            DiceFace.D1,
        ], 1500, 2) || this;
    }
    return OnePercent;
}(BackerCard));
var OrdinaryFolk = (function (_super) {
    __extends(OrdinaryFolk, _super);
    function OrdinaryFolk() {
        return _super.call(this, "普通人", "普通到你記不住他", [
            DiceFace.D1,
            DiceFace.D2,
            DiceFace.D3,
        ], 300, 1) || this;
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
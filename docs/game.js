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
    GameMaster.start = function () {
        alert("Hello, World!");
    };
    return GameMaster;
}());
var ActionCard = (function (_super) {
    __extends(ActionCard, _super);
    function ActionCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ActionCard;
}(Card));
var BackerCard = (function (_super) {
    __extends(BackerCard, _super);
    function BackerCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BackerCard;
}(Card));
var Card = (function () {
    function Card() {
    }
    return Card;
}());
var ItemCard = (function (_super) {
    __extends(ItemCard, _super);
    function ItemCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemCard;
}(Card));

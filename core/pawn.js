var Turkish_Chess = Turkish_Chess || {};

module.exports = ( function (self) {
    "use strict";

    self.Pawn = function (_type) {
        this.Type = {
            WHITE: 1,
            BLACK: 2,
            Q_WHITE: 3,
            Q_BLACK: 4,
        };

        var type;
        var pos = [];
        var lastPos = [];

        var init = function(_type){
            type = _type;
        };

        this.setType = function(newtype){
            type = newtype;
        };

        this.getType = function(){
            return type;
        };

        this.lastPosition = function(){
            return lastPos;
        };

        this.setPos = function(_pos){
            pos = _pos;
        };

        this.getPos = function(){
            return pos;
        };

        this.isQueen = function(){
            return (type == Type.Q_BLACK || type == Type.Q_WHITE);
        };

        init(_type);
    };

    return self;
}(Turkish_Chess || {}));
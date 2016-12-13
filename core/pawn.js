var Turkish_Chess = Turkish_Chess || {};

var merge = require('merge');
var core = merge(require('./pawn_type'));

module.exports = ( function (self) {
    "use strict";

    self.Pawn = function (_type) {
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
            return (type == core.PawnType.Q_BLACK || type == core.PawnType.Q_WHITE);
        };

        init(_type);
    };

    return self;
}(Turkish_Chess || {}));
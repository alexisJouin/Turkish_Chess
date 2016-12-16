var Turkish_Chess = Turkish_Chess || {};

//var merge = require('merge');
//var core = merge(require('./pawn_type'));

module.exports = (function (self) {
    "use strict";

    self.Move = function () {

        var positionDepart;
        var positionArrive;
        var nextMove;
        var direction; // UP || DOWN || RIGHT || LEFT
        var size;

        var init = function () {
            positionDepart = [];
            positionArrive = [];
            nextMove = null;
            direction = null;
            size = 1;
        };


        this.determinateDirection = function () {
            var fromLine = this.positionDepart[0];
            var fromColumn = this.positionDepart[1];

            var toLine = this.positionArrive [0];
            var toColumn = this.positionArrive[1];

            if (fromLine < toLine) {
                this.direction = "DOWN";
            } else if (fromLine > toLine) {
                this.direction = "UP";
            } else if (fromColumn < toColumn) {
                this.direction = "RIGHT";
            } else if (fromColumn > toColumn) {
                this.direction = "LEFT";
            }
        };

        this.getSize = function () {
            return this.size;
        };

        this.getNextMove = function () {
            return this.nextMove;
        };

        this.addMove = function (newMove) {
            this.nextMove = newMove;
            this.size++;
        };

        this.getTotalSize = function () {
            return size + this.recursiveOperation(nextMove);

        };

        this.getPositionDepart = function () {
            return positionDepart;
        };

        this.getPositionArrive = function () {
            return positionArrive;
        };

        this.recursiveOperation = function (nextMove) {
            if (nextMove !== null) {
                return size + this.recursiveOperation(nextMove.getNextMove());
            } else
                return 0;
        };

        init();
    };

    return self;
}(Turkish_Chess || {}));
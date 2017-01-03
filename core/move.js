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
        var originalMove = null;

        var init = function () {
            positionDepart = [];
            positionArrive = [];
            nextMove = null;
            direction = null;
            size = 1;
            originalMove = null;
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
            return size;
        };

        this.incSize = function () {
            size++;
        };

        this.getNextMove = function () {
            return nextMove;
        };
        //
        // this.setOriginalMove = function(aMove) {
        //     originalMove = aMove;
        // }

        this.addMove = function (newMove) {
            nextMove = newMove;

            // if (originalMove == null) {
            //     newMove.setOriginalMove(this);
            //     this.incSize();
            // } else {
            //     newMove.setOriginalMove(originalMove);
            //     originalMove.incSize();
            // }

            size++;
        };

        this.getTotalSize = function () {
            var aMove = this;
            var aSize = 0;//size = 1;
            while (aMove !== null ) { //&& aMove.getNextMove() !== null) {
                aMove = aMove.getNextMove();
               // aSize += aMove.getSize();
                aSize++;
            }
            return aSize; //+ this.recursiveOperation(nextMove);

            //return size;

            //return size + this.recursiveOperation(nextMove);
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
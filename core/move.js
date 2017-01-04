var Turkish_Chess = Turkish_Chess || {};

//var merge = require('merge');
//var core = merge(require('./pawn_type'));

module.exports = (function (self) {
    "use strict";

    self.Move = function () {

        var positionDepart;
        var positionArrive;
        var positionPawnRemove;
        var nextMove;
        var direction; // UP || DOWN || RIGHT || LEFT
        var size;
        var originalMove;

        var init = function () {
            positionDepart = [];
            positionArrive = [];
            positionPawnRemove = [];
            nextMove = null; //[]; //null;
            originalMove = null;
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

        this.setOriginalMove = function(aMove) {
            originalMove = aMove;
        };

        this.getOriginalMove = function () {
            return originalMove;
        };

        this.addMove = function (newMove) {
            nextMove = newMove;

           // if (positionPawnRemove.length > 0  ) {
                nextMove.positionPawnRemove.concat(this.positionPawnRemove);
           // }


            if (originalMove == null) {
                nextMove.setOriginalMove(this);

               // this.incSize();
            } else {
                nextMove.setOriginalMove(originalMove);
                //originalMove.incSize();
            }

           // size++;
        };

        this.getTotalSize = function () {
            var aMove = this;
            var aSize = 1;//size = 1;
            while (aMove !== null ) { //&& aMove.getNextMove() !== null) {
                if (aMove.getNextMove() !== null) {
                    aMove = aMove.getNextMove();
                    aSize++;
                } else {
                    aMove = null; //aMove.getNextMove();
                }
            }
            return aSize; //+ this.recursiveOperation(nextMove);

            //return size;

            //return size + this.recursiveOperation(nextMove);
        };

        this.isValidPawn = function (aLine,aColumn) {
            var aMove = this;
            while (aMove.getOriginalMove() !== null) {
                if ((aMove.getOriginalMove().positionDepart[0] === aLine
                     && aMove.getOriginalMove().positionDepart[1] === aColumn) //pion lui meme
                    ||
                    (aMove.getOriginalMove().positionPawnRemove[0] === aLine
                     && aMove.getOriginalMove().positionPawnRemove[1] === aColumn)) { //pion retiré
                    return false;
                }
                aMove = aMove.getOriginalMove();
            }
            return true;
        };

        this.isIn = function (aLine,aColumn) {
            var pr = this.positionPawnRemove;

            if (pr == null) {return false}
            for (var i = 0; i < pr.length; i++) {
                if (pr[i][0] == aLine && pr[i][1] == aColumn) {
                    return true;
                }
            }

            if (positionDepart[0] == aLine && positionDepart[1] == aColumn) {
                return true;
            }
            return false;




        }

        this.getPositionDepart = function () {
            return positionDepart;
        };

        this.getPositionArrive = function () {
            return positionArrive;
        };

        this.getPositionPawnRemove = function () {
            return positionPawnRemove;
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
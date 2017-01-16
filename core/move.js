var Turkish_Chess = Turkish_Chess || {};


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
            nextMove = null;
            originalMove = null;
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
            return size;
        };

        this.incSize = function () {
            size++;
        };

        this.getNextMove = function () {
            return this.nextMove;
        };

        // this.setNextMove = function (aNewMove) {
        //     this.nextMove = aNewMove;
        // };

        this.setOriginalMove = function(aMove) {
            this.originalMove = aMove;
        };

        this.getOriginalMove = function () {
            return this.originalMove;
        };

        this.addMove = function (newMove) {
            this.nextMove = (newMove);

           // nextMove.positionPawnRemove.concat(this.positionPawnRemove);
            if (this.getOriginalMove() != null ) {
                this.nextMove.setOriginalMove(this.getOriginalMove());
               // this.nextMove = (this.getOriginalMove());
            } else  this.nextMove.setOriginalMove(this);
            // if (nextMove.getOriginalMove() == null) {
            //     nextMove.setOriginalMove(this);
            // } else {
            //     nextMove.setOriginalMove(originalMove);
            // }
        };

        this.getTotalSize = function () {
            var aMove = this;
            var aSize = 1;//size = 1;
            while (aMove != null ) {
                if (aMove.getNextMove() != null) {
                    aMove = aMove.getNextMove();
                    aSize++;
                } else {
                    aMove = null;
                }
            }
            return aSize;
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
           // console.log(aLine," ",aColumn);
            //var pr = this.positionPawnRemove;
            var pr = this.getPawnRemove();

            if (pr == null) {
              //  console.log(aLine," ",aColumn, "Null");
                return false;}
            for (var i = 0; i < pr.length; i++) {
                if (pr[i][0] == aLine && pr[i][1] == aColumn) {
                  //  console.log(aLine," ",aColumn, "yes");
                    return true;
                }
            }

            if (positionDepart[0] == aLine && positionDepart[1] == aColumn) {
               // console.log(aLine," ",aColumn, "yes");
                return true;
            }
            return false;
        }

        this.getPositionDepart = function () {


            // var aMove =  this.getOriginalMove();
            // return aMove.getPositionDepart();

            //return this.getOriginalMove().getPositionDepart();


            if (this.getOriginalMove() != null) {
               return this.getNextMove().getOriginalMove().getPositionDepart();
            }
           // //return (this.getOriginalMove() != null) ?
           //  // this.getOriginalMove().getPositionDepart() : this.positionDepart;
           return this.positionDepart;
        };

        this.getPositionArrive = function () {
            return this.positionArrive;
        };

        this.getPositionPawnRemove = function () {
            return this.positionPawnRemove;
        };

        this.addpositionPawnRemove = function (position) {
            if (this.positionPawnRemove == null) {
                this.positionPawnRemove = [];
            }
            this.positionPawnRemove.push(position);
        };

        this.getPawnRemove = function () {
            //var tabRemove = [];
            var aMove;
            if (this.getOriginalMove() != null) {
                aMove = this.getOriginalMove(); //cas secondaire
            } else
                aMove = this; // cas primaire

            var tabRemove = (typeof aMove.getPositionPawnRemove() !== 'undefined') ? aMove.getPositionPawnRemove().slice(0) : [];
            while (aMove !== null) {

                if (aMove.getNextMove() != null) {
                    aMove = aMove.getNextMove();
                    if (aMove.getPositionPawnRemove() != null && aMove.getPositionPawnRemove().length > 0) {
                       // tabRemove.splice(0,0,aMove.getPositionPawnRemove()[0].slice(0));
                        tabRemove.splice(0,0,aMove.getPositionPawnRemove().slice(0));
                    }
                } else {aMove = null;}
            }
            return tabRemove;
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
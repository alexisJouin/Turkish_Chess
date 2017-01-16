/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Turkish_Chess = Turkish_Chess || {};

var merge = require("merge");
var core = merge(require("./pawn"), require("./pawn_type"), require("./move"));

module.exports = function (self) {
    "use strict";

    self.Board = function () {
        var board;
        var players = []; //J1 : WHITE, J2 : BLACK
        var playingPlayerIndex;
        var whitePawns = [];
        var blackPawns = [];

        var init = function () {
            playingPlayerIndex = 0;

            // Init pawns
            for (var i = 0; i < 16; i++) {
                whitePawns.push(new core.Pawn(core.PawnType.WHITE, "WHITE"));
                blackPawns.push(new core.Pawn(core.PawnType.BLACK, "BLACK"));
            }
            // Init the board
            board = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ];
            // Putting pawns on the board
            for (var i = 0; i < 8; i++) {
                whitePawns[i].setLastPosition([1, i]);
                board[1][i] = whitePawns[i];
                //whitePawns[i].setLastPosition([1, i]);

                whitePawns[i + 8].setLastPosition([2, i]);
                board[2][i] = whitePawns[i + 8];
                //whitePawns[i+8].setLastPosition([2, i]);

                blackPawns[i].setLastPosition([5, i]);
                board[5][i] = blackPawns[i];
                //blackPawns[i].setLastPosition([5, i]);

                blackPawns[i + 8].setLastPosition([6, i]);
                board[6][i] = blackPawns[i + 8];
                //blackPawns[i+8].setLastPosition([6, i]);
            }
        };

        this.initTest = function () {
            playingPlayerIndex = 0;


            while (whitePawns.length > 0) {
                whitePawns.pop()
            }
            while (blackPawns.length > 0) {
                blackPawns.pop()
            }

            // Init pawns
            for (var i = 0; i < 3; i++) {
                whitePawns.push(new core.Pawn(core.PawnType.WHITE, "WHITE"));
                blackPawns.push(new core.Pawn(core.PawnType.BLACK, "BLACK"));
            }
            // Init the board
            board = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ];
            // Putting pawns on the board

            whitePawns[0].setLastPosition([1, 2]);
            board[1][2] = whitePawns[0];
            whitePawns[1].setLastPosition([6, 2]);
            board[6][2] = whitePawns[1];
            whitePawns[2].setLastPosition([6, 4]);
            board[6][4] = whitePawns[2];


            blackPawns[0].setLastPosition([4, 4]);
            board[4][4] = blackPawns[0];
            blackPawns[1].setLastPosition([1, 4]);
            board[1][4] = blackPawns[1];

            blackPawns[2].setLastPosition([7, 5]);
            board[7][5] = blackPawns[2];

        };

        // coulour must be "BLACK" or "WHITE"
        this.getNbPawns = function (colour) {
            var nb = 0;
            switch (colour) {
                case "WHITE":
                    nb = whitePawns.length;
                    break;
                case "BLACK":
                    nb = blackPawns.length;
                default:
                    break;
            }
            return nb;
        };


        this.getBoard = function () {
            return board;
        };

        this.getPlayers = function () {
            return players;
        };

        this.getBoardArray = function () {
            var array = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ];

            for (var line = 0; line < board.length; line++) {
                for (var column = 0; column < board[line].length; column++) {
                    if (board[line][column] != 0) {
                        array[line][column] = board[line][column].getType();
                    }
                }
            }
            return array;
        };

        this.getLineBoard = function (i) {
            return board[i];
        };

        this.getPositionBoard = function (i, j) {
            return board[i][j];
        };


        this.movePawn = function (pawnIndexLine, pawnIndexColumn, indexLineToMove, indexColumnToMove) {

            board[indexLineToMove][indexColumnToMove] = board[pawnIndexLine][pawnIndexColumn];
            board[pawnIndexLine][pawnIndexColumn] = 0;
            board[indexLineToMove][indexColumnToMove].setLastPosition([indexLineToMove,indexColumnToMove]);

            if (board[indexLineToMove][indexColumnToMove].getColour() == "WHITE") {
                var indextemp = whitePawns.indexOf(board[indexLineToMove][indexColumnToMove]);
                whitePawns[indextemp] = board[indexLineToMove][indexColumnToMove];
            } else {
                var indextemp = blackPawns.indexOf(board[indexLineToMove][indexColumnToMove]);
                blackPawns[indextemp] = board[indexLineToMove][indexColumnToMove];
            }
            this.transformPawnToQueen([indexLineToMove, indexColumnToMove]);
        };

        //Deplacement autoriser ou non pour pion
        this.allow = function (pawnIndexLine, pawnIndexColumn, indexLineToMove, indexColumnToMove) {

            var pawn = board[pawnIndexLine][pawnIndexColumn];
            //case vide
            if (board[pawnIndexLine][pawnIndexColumn] == 0) {
                return false;
            }

            // Get colour of the current player
            var currentPlayer = this.getCurrentPlayer();
            var currentPlayerColour = "";
            if (currentPlayer == 0) {
                currentPlayerColour = "WHITE";
            } else {
                currentPlayerColour = "BLACK";
            }


            if (pawn.getColour() == currentPlayerColour) {

                switch (pawn.isQueen()) {
                    // -- IS NOT A QUEEN
                    case false:
                        // Pawn is WHITE
                        if (board[indexLineToMove][indexColumnToMove] == 0) {
                            switch (pawn.getColour()) {
                                case "WHITE":
                                    if ((pawnIndexLine + 1 == indexLineToMove && pawnIndexColumn == indexColumnToMove && pawnIndexLine < 7) // Mouvement en bas
                                        || (pawnIndexLine == indexLineToMove && pawnIndexColumn - 1 == indexColumnToMove && pawnIndexColumn > 0) // Mouvement à gauche
                                        || (pawnIndexLine == indexLineToMove && pawnIndexColumn + 1 == indexColumnToMove && pawnIndexColumn < 7)) { // mouvement à droite
                                        return true;
                                    } else {
                                        return false;
                                    }
                                    break;
                                case "BLACK":
                                    if ((pawnIndexLine - 1 == indexLineToMove && pawnIndexColumn == indexColumnToMove && pawnIndexLine > 0) // Move up
                                        || (pawnIndexLine == indexLineToMove && pawnIndexColumn - 1 == indexColumnToMove && pawnIndexColumn > 0) // Move left
                                        || (pawnIndexLine == indexLineToMove && pawnIndexColumn + 1 == indexColumnToMove && pawnIndexColumn < 7)) { // move right
                                        return true;
                                    } else {
                                        return false;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            return false;
                        }
                        break;
                    // -- IS A QUEEN
                    case true:
                        if (board[indexLineToMove][indexColumnToMove] == 0) {

                            var moveline = 0;
                            var movecol  = 0;
                            //move up
                            if (pawnIndexLine > indexLineToMove && pawnIndexColumn == indexColumnToMove) {
                                moveline = pawnIndexLine -1;
                                while (moveline >= indexLineToMove && moveline >= 0) {
                                    if (board[moveline][indexColumnToMove] !== 0) {
                                        return false;
                                    }
                                    moveline--;
                                }
                                return true;
                            }

                            //move down
                            if (pawnIndexLine < indexLineToMove && pawnIndexColumn == indexColumnToMove) {
                                moveline = pawnIndexLine +1;
                                while (moveline <= indexLineToMove && moveline <= 7) {
                                    if (board[moveline][indexColumnToMove] !== 0) {
                                        return false;
                                    }
                                    moveline++;
                                }
                                return true;
                            }

                            //move left
                            if (pawnIndexColumn > indexColumnToMove && pawnIndexLine == indexLineToMove) {
                                movecol = pawnIndexColumn -1;
                                while (movecol >= indexLineToMove && movecol >= 0) {
                                    if (board[indexLineToMove][movecol] !== 0){
                                        return false;
                                    }
                                    movecol--;
                                }
                                return true;
                            }

                            //move right
                            if (pawnIndexColumn < indexColumnToMove && pawnIndexLine == indexLineToMove) {
                                movecol = pawnIndexColumn +1;
                                while (movecol <= indexLineToMove && movecol <= 7 ) { //&&
                                    // possible) {
                                    if (board[indexLineToMove][movecol] !== 0){
                                        return false;
                                    }
                                    movecol++;
                                }
                                return true;
                            }

                            return false;

                        } else {
                            return false;
                        }
                        break;
                    default:
                        return false;
                        break;
                }
            } else {
                return false;
            }
        };

        this.getPossibleMovesObjects = function (indexLine, indexColumn) {
            var possibleMoves = [];
            for (var line = 0; line < board.length; line++) {
                for (var column = 0; column < board[line].length; column++) {
                    if (this.allow(indexLine, indexColumn, line, column)) {
                        var possibleMove = new core.Move();
                        possibleMove.positionDepart = [indexLine, indexColumn];
                        possibleMove.positionArrive = [line, column];
                        possibleMove.determinateDirection();
                        var thisPossibleMove = this.getPossibleMovesObjects(possibleMove.positionArrive[0], possibleMove.positionArrive[1]);
                        if (thisPossibleMove != null && thisPossibleMove.length > 0) {
                            possibleMove.addMove(thisPossibleMove);
                        }
                        possibleMoves.push(possibleMove);
                    }
                }
            }
            return possibleMoves;
        };

        this.getPossibleMoves = function (indexLine, indexColumn) {
            var possibleMoves = [];
            var result = this.getPossibleMovesObjects(indexLine, indexColumn);
            if (result != null && result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    var x = result[i].positionArrive[0];
                    var y = result[i].positionArrive[1];
                    possibleMoves.push([x, y]);
                }
                return possibleMoves;
            } else {
                return null;
            }
        };

        //Case vide
        this.empty = function (position) {
            if (board[position[0]][position[1]] == 0) {
               // console.log(position,"vide");
                return true;
            } else {
              //  console.log(position,"pleine");
                return false;
            }
        };


        //Coup obligatoire
        this.getPossibleAttacks = function (pawnIndexLine, pawnIndexColumn, pawn, possibleMove) {

            var movesArray = [];
            //// console.log("move array",movesArray);


            var caseDown = [pawnIndexLine + 1, pawnIndexColumn];
            var case2Down = [pawnIndexLine + 2, pawnIndexColumn];
            var caseUp = [pawnIndexLine - 1, pawnIndexColumn];
            var caseLeft = [pawnIndexLine, pawnIndexColumn - 1];
            var caseRight = [pawnIndexLine, pawnIndexColumn + 1];

            if (pawn == null) {
                pawn = board[pawnIndexLine][pawnIndexColumn];
            }

            if (possibleMove == null) {
                possibleMove = new core.Move();
                possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
            }
            //// console.log("Entree possible ",(typeof possibleMove.getPositionPawnRemove() !== 'undefined') ? possibleMove.getPositionPawnRemove() : [] );
            if (pawn !== 0) {

                switch (pawn.isQueen()) {
                    // Si c'est un pion
                    case false:

                        //Possible capture ?
                        if (pawnIndexColumn < 6
                            && (!this.empty(caseRight) //CASE RIGHT
                                && !possibleMove.isIn(pawnIndexLine, pawnIndexColumn + 1))
                            && board[pawnIndexLine][pawnIndexColumn + 1].getColour() !== pawn.getColour() //board[pawnIndexLine][pawnIndexColumn].getColour()
                            && (board[pawnIndexLine][pawnIndexColumn + 2] == 0
                                || possibleMove.isIn(pawnIndexLine, pawnIndexColumn + 2)) ) {
                            // console.log("Right pawnIndexLine ",pawnIndexLine," pawnIndexColumn"
                            //             ,pawnIndexColumn);

                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine, pawnIndexColumn +2];
                            possibleMove.positionPawnRemove = [[pawnIndexLine,pawnIndexColumn +1]];
                            possibleMove.determinateDirection();

                            var thisPossibleAttack = this.getPossibleAttacks(pawnIndexLine, pawnIndexColumn + 2, pawn, possibleMove);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {

                                var myMoveAttack = new core.Move();
                                myMoveAttack.positionDepart = [pawnIndexLine, pawnIndexColumn];
                                myMoveAttack.positionArrive = [pawnIndexLine, pawnIndexColumn +2];
                                myMoveAttack.positionPawnRemove = [pawnIndexLine, pawnIndexColumn +1];
                                myMoveAttack.determinateDirection();
                                possibleMove.addMove(myMoveAttack);
                            }
                            movesArray.unshift(possibleMove);
                            // console.log("Right getPawnRemove ", possibleMove.getPawnRemove());
                            //possibleMove = null;
                        }

                        if (pawnIndexColumn > 1
                            && (!this.empty(caseLeft) //CASE LEFT
                                && !possibleMove.isIn(pawnIndexLine, pawnIndexColumn - 1))
                            && (board[pawnIndexLine][pawnIndexColumn - 1].getColour() !== pawn.getColour()) //board[pawnIndexLine][pawnIndexColumn].getColour())
                            && (board[pawnIndexLine][pawnIndexColumn - 2] == 0
                                || possibleMove.isIn(pawnIndexLine, pawnIndexColumn - 2)) ) {
                            // console.log("Left pawnIndexLine ",pawnIndexLine," pawnIndexColumn"
                            //             ,pawnIndexColumn);

                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine, pawnIndexColumn -2];
                            possibleMove.positionPawnRemove = [[pawnIndexLine,pawnIndexColumn -1]];
                            possibleMove.determinateDirection();

                            var thisPossibleAttack = this.getPossibleAttacks(pawnIndexLine, pawnIndexColumn - 2, pawn, possibleMove);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {

                                var myMoveAttack = new core.Move();
                                myMoveAttack.positionDepart = [pawnIndexLine, pawnIndexColumn];
                                myMoveAttack.positionArrive = [pawnIndexLine, pawnIndexColumn -2];
                                myMoveAttack.positionPawnRemove = [pawnIndexLine, pawnIndexColumn -1];
                                myMoveAttack.determinateDirection();
                                possibleMove.addMove(myMoveAttack);
                            }
                            movesArray.unshift(possibleMove);
                            // console.log("Left getPawnRemove ", possibleMove.getPawnRemove());
                            //possibleMove = null;
                        }

                        //Pawn is WHITE
                        if (pawnIndexLine < 6
                            // CASE DOWN
                            && pawn.getColour() == "WHITE"
                            && (!this.empty(caseDown)
                                && !possibleMove.isIn(pawnIndexLine + 1, pawnIndexColumn))

                            && board[pawnIndexLine + 1][pawnIndexColumn].getColour() == "BLACK"
                            && (board[pawnIndexLine + 2][pawnIndexColumn] == 0
                                || possibleMove.isIn(pawnIndexLine + 2, pawnIndexColumn)) ) {

                            // console.log("Down pawnIndexLine ",pawnIndexLine," pawnIndexColumn"
                            //             ,pawnIndexColumn);

                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine + 2, pawnIndexColumn];
                            possibleMove.positionPawnRemove = [[pawnIndexLine + 1,pawnIndexColumn]];
                            possibleMove.determinateDirection();

                            var thisPossibleAttack = this.getPossibleAttacks(pawnIndexLine + 2, pawnIndexColumn, pawn, possibleMove);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {

                                var myMoveAttack = new core.Move();
                                myMoveAttack.positionDepart = [pawnIndexLine, pawnIndexColumn];
                                myMoveAttack.positionArrive = [pawnIndexLine + 2, pawnIndexColumn];
                                myMoveAttack.positionPawnRemove = [pawnIndexLine + 1, pawnIndexColumn];
                                myMoveAttack.determinateDirection();
                                possibleMove.addMove(myMoveAttack);
                            }
                            movesArray.unshift(possibleMove);
                            // console.log("Down getPawnRemove ", possibleMove.getPawnRemove());
                            //possibleMove = null;
                        }
                        //Pawn is BLACK
                        if (pawnIndexLine > 1
                            // CASE UP
                            && pawn.getColour() == "BLACK"
                            && (!this.empty(caseUp)
                                && !possibleMove.isIn(pawnIndexLine - 1, pawnIndexColumn))
                            && board[pawnIndexLine - 1][pawnIndexColumn].getColour() == "WHITE"
                            && (board[pawnIndexLine - 2][pawnIndexColumn] == 0
                               || possibleMove.isIn(pawnIndexLine - 2, pawnIndexColumn)) ) {

                            // console.log("Up pawnIndexLine ",pawnIndexLine," pawnIndexColumn"
                            //             ,pawnIndexColumn);

                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine - 2, pawnIndexColumn];
                            possibleMove.positionPawnRemove = [[pawnIndexLine - 1,pawnIndexColumn]];
                            possibleMove.determinateDirection();

                            var thisPossibleAttack = this.getPossibleAttacks(pawnIndexLine - 2, pawnIndexColumn, pawn, possibleMove);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {
                                var myMoveAttack = new core.Move();
                                myMoveAttack.positionDepart = [pawnIndexLine, pawnIndexColumn];
                                myMoveAttack.positionArrive = [pawnIndexLine - 2, pawnIndexColumn];
                                myMoveAttack.positionPawnRemove = [pawnIndexLine - 1, pawnIndexColumn];
                                myMoveAttack.determinateDirection();
                                possibleMove.addMove(myMoveAttack);
                            }
                            movesArray.unshift(possibleMove);
                            // console.log("Up getPawnRemove ", possibleMove.getPawnRemove());
                            //possibleMove = null;
                        }


                        break;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // Si c'est une reine.
                    case true :


                        var moveCol  = 1;
                        var moveLine = 1;
                        var myColor  = pawn.getColour();
                        //Attack LEFT
                        while ((pawnIndexColumn-moveCol) >= 0
                               && board[pawnIndexLine][pawnIndexColumn-moveCol] == 0) {
                               moveCol++;
                        }
                        if ((pawnIndexColumn-moveCol) > 0
                            && (board[pawnIndexLine][pawnIndexColumn-moveCol] != 0
                                && !possibleMove.isIn(pawnIndexLine, pawnIndexColumn - moveCol))
                            && board[pawnIndexLine][pawnIndexColumn-moveCol].getColour() !== myColor
                            && (board[pawnIndexLine][pawnIndexColumn-moveCol-1] == 0
                                || possibleMove.isIn(pawnIndexLine, pawnIndexColumn - moveCol -1 )) ) {

                            // console.log("Left pawnIndexLine ",pawnIndexLine," pawnIndexColumn"
                            //             ,pawnIndexColumn);

                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine, pawnIndexColumn - moveCol - 1];
                            possibleMove.positionPawnRemove = [[pawnIndexLine, pawnIndexColumn - moveCol]];
                            possibleMove.determinateDirection();

                            var thisPossibleAttack = this.getPossibleAttacks(pawnIndexLine, pawnIndexColumn - moveCol - 1, pawn, possibleMove);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {
                                var myMoveAttack = new core.Move();
                                myMoveAttack.positionDepart = [pawnIndexLine, pawnIndexColumn];
                                myMoveAttack.positionArrive = [pawnIndexLine, pawnIndexColumn - moveCol - 1];
                                myMoveAttack.positionPawnRemove = [pawnIndexLine, pawnIndexColumn - moveCol];
                                myMoveAttack.determinateDirection();
                                possibleMove.addMove(myMoveAttack);
                            }
                            movesArray.unshift(possibleMove);
                            // console.log("Queen Left getPawnRemove ", possibleMove.getPawnRemove());
                            //possibleMove = null;
                        }

                        //Attack RIGHT
                        moveCol = 1
                        while ((pawnIndexColumn + moveCol) < 7   //cherche pion a droite
                               && board[pawnIndexLine][pawnIndexColumn + moveCol] == 0) {
                               moveCol++;
                        }
                        if ((pawnIndexColumn + moveCol) < 7
                            && (board[pawnIndexLine][pawnIndexColumn + moveCol] != 0
                                && !possibleMove.isIn(pawnIndexLine, pawnIndexColumn + moveCol))
                            && board[pawnIndexLine][pawnIndexColumn + moveCol].getColour() !== myColor
                            && (board[pawnIndexLine][pawnIndexColumn + moveCol +1] == 0
                                || possibleMove.isIn(pawnIndexLine, pawnIndexColumn + moveCol +1)) ) {

                            // console.log("Right pawnIndexLine ",pawnIndexLine," pawnIndexColumn"
                            //             ,pawnIndexColumn);

                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine, pawnIndexColumn + moveCol + 1];
                            possibleMove.positionPawnRemove = [[pawnIndexLine, pawnIndexColumn + moveCol]];
                            possibleMove.determinateDirection();

                            var thisPossibleAttack = this.getPossibleAttacks(pawnIndexLine, pawnIndexColumn + moveCol + 1, pawn, possibleMove);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {
                                var myMoveAttack = new core.Move();
                                myMoveAttack.positionDepart = [pawnIndexLine, pawnIndexColumn];
                                myMoveAttack.positionArrive = [pawnIndexLine, pawnIndexColumn + moveCol + 1];
                                myMoveAttack.positionPawnRemove = [pawnIndexLine, pawnIndexColumn + moveCol];
                                myMoveAttack.determinateDirection();
                                possibleMove.addMove(myMoveAttack);
                            }
                            movesArray.unshift(possibleMove);
                            // console.log("Queen Right getPawnRemove ",
                            // possibleMove.getPawnRemove());
                            //possibleMove = null;
                        }

                        //Attack Down
                        moveLine = 1;
                        while ((pawnIndexLine + moveLine) < 7   //cherche pion bas
                        && board[pawnIndexLine + moveLine][pawnIndexColumn] == 0 ) {
                            moveLine++;
                        }
                        if ((pawnIndexLine + moveLine) < 7
                            && (board[pawnIndexLine + moveLine][pawnIndexColumn] != 0
                                && !possibleMove.isIn(pawnIndexLine + moveLine, pawnIndexColumn))
                            && board[pawnIndexLine + moveLine][pawnIndexColumn].getColour() !== myColor
                            && (board[pawnIndexLine + moveLine + 1][pawnIndexColumn] == 0
                               || possibleMove.isIn(pawnIndexLine + moveLine + 1, pawnIndexColumn)) ) {

                            // console.log("Down pawnIndexLine ",pawnIndexLine," pawnIndexColumn"
                            //             ,pawnIndexColumn);

                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine + moveLine + 1, pawnIndexColumn];
                            possibleMove.positionPawnRemove = [[pawnIndexLine + moveLine, pawnIndexColumn]];
                            possibleMove.determinateDirection();

                            var thisPossibleAttack = this.getPossibleAttacks(pawnIndexLine + moveLine + 1, pawnIndexColumn, pawn, possibleMove);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {
                                var myMoveAttack = new core.Move();
                                myMoveAttack.positionDepart = [pawnIndexLine, pawnIndexColumn];
                                myMoveAttack.positionArrive = [pawnIndexLine + moveLine + 1, pawnIndexColumn];
                                myMoveAttack.positionPawnRemove = [pawnIndexLine + moveLine, pawnIndexColumn];
                                myMoveAttack.determinateDirection();
                                possibleMove.addMove(myMoveAttack);
                            }
                            movesArray.unshift(possibleMove);
                            // console.log("Queen Down getPawnRemove ",
                            // possibleMove.getPawnRemove());
                            //possibleMove = null;
                        }

                        //Attack UP
                        moveLine = 1;
                        while ((pawnIndexLine - moveLine) > 0   //cherche piont a droite
                               && board[pawnIndexLine - moveLine][pawnIndexColumn] == 0) {
                            moveLine++;
                        }

                        if ((pawnIndexLine - moveLine) > 0
                            && (board[pawnIndexLine - moveLine][pawnIndexColumn] != 0
                                && !possibleMove.isIn(pawnIndexLine- moveLine, pawnIndexColumn))
                            && board[pawnIndexLine - moveLine][pawnIndexColumn].getColour() !== myColor
                            && (board[pawnIndexLine - moveLine - 1][pawnIndexColumn] == 0
                                || possibleMove.isIn(pawnIndexLine - moveLine - 1, pawnIndexColumn)) ) {

                            // console.log("Down pawnIndexLine ",pawnIndexLine," pawnIndexColumn"
                            //             ,pawnIndexColumn);

                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine + moveLine - 1, pawnIndexColumn];
                            possibleMove.positionPawnRemove = [[pawnIndexLine + moveLine, pawnIndexColumn]];
                            possibleMove.determinateDirection();

                            var thisPossibleAttack = this.getPossibleAttacks(pawnIndexLine - moveLine - 1, pawnIndexColumn, pawn, possibleMove);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {
                                var myMoveAttack = new core.Move();
                                myMoveAttack.positionDepart = [pawnIndexLine, pawnIndexColumn];
                                myMoveAttack.positionArrive = [pawnIndexLine - moveLine - 1, pawnIndexColumn];
                                myMoveAttack.positionPawnRemove = [pawnIndexLine - moveLine, pawnIndexColumn];
                                myMoveAttack.determinateDirection();
                                possibleMove.addMove(myMoveAttack);
                            }
                            movesArray.unshift(possibleMove);
                            // console.log("Queen Down getPawnRemove ",
                            // possibleMove.getPawnRemove());
                            //possibleMove = null;
                        }
                        break;
                    default:
                        break;
                }
                //// console.log("move array < sortie >",movesArray[0]);
                return movesArray;
            } else {
                return null;
            }
        };


        this.toString = function () {
            var st = "[";
            for (var i = 0; i < board.length; i++) {
                st += "[";
                for (var j = 0; j < board[i].length; j++) {
                    if (board[i][j] != 0) {
                        st += board[i][j].toString() + ", ";
                    } else {
                        st += "\" \",";
                    }
                }
                st += "], \n";
            }
            st += "]";
            return st;
        };

        this.allowMovePawn = function (fromLine, fromColumn, toLine, toColumn) {
            var desiredMoveLocation = [toLine, toColumn];

            // Determining current player colour
            var playerColour = "";
            if (playingPlayerIndex == 0) {
                playerColour = "WHITE";
            } else {
                playerColour = "BLACK";
            }

            var everyAttackesPossible = [];
            var everyMovesPossible = [];

            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j < board[i].length; j++) {
                    if (board[i][j] !== 0) {
                        if (board[i][j].getColour() == playerColour) {
                            var thisPossibleAttack = this.getPossibleAttacks(i, j, null, null);
                            var thisPossibleMove = this.getPossibleMovesObjects(i, j);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {
                                everyAttackesPossible.push(this.getPossibleAttacks(i, j, null, null));
                            }
                            if (thisPossibleMove != null && thisPossibleMove.length > 0) {
                                everyMovesPossible.push(this.getPossibleMovesObjects(i, j));
                            }
                        }
                    }
                }
            }

            //capture obligatoire
            if (everyAttackesPossible != null && everyAttackesPossible.length > 0) {
                var maxSize = 0;
                var indexMaxSize = -1;
                var indexChoice = -1;
                for (var i = 0; i < everyAttackesPossible.length; i++) {
                    if (everyAttackesPossible[i][0].getTotalSize() > maxSize) {
                        maxSize = everyAttackesPossible[i][0].getTotalSize();
                        indexMaxSize = i;
                    }
                    //console.log(everyAttackesPossible[i][0].positionArrive[0],"
                    // ",everyAttackesPossible[i][0].positionArrive[1]);
                    //console.log(everyAttackesPossible[i][0].positionArrive[0] == toLine,"
                    // ",everyAttackesPossible[i][0].positionArrive[1] == toColumn);

                    if (everyAttackesPossible[i][0].positionArrive[0] == toLine
                        && everyAttackesPossible[i][0].positionArrive[1] == toColumn) {
                        indexChoice = i;
                        //console.log(indexChoice);
                    }

                    // for (var j = 0; j < everyAttackesPossible[i].length; j++) {
                    //     if (everyAttackesPossible[i][j].getTotalSize() > maxSize) {
                    //         maxSize = everyAttackesPossible[i][j].getTotalSize();
                    //         indexMaxSize = i;
                    //         // if (everyAttackesPossible[i][j].getPositionArrive()[0] == toLine
                    //         //     && everyAttackesPossible[i][j].getPositionArrive()[1] == toColumn) {
                    //         //     break;
                    //         // }
                    //     }
                    // }
                }
                if (indexChoice > -1 && everyAttackesPossible[indexChoice][0].getTotalSize()
                    >= everyAttackesPossible[indexMaxSize][0].getTotalSize() ) {
                    return {type: "Attack", move: everyAttackesPossible[indexChoice]};
                } else return {type: "Attack", move: everyAttackesPossible[indexMaxSize]};

            } else if (everyMovesPossible != null && everyMovesPossible.length > 0) {

                //mouvement est un mouvement possible
                for (var i = 0; i < everyMovesPossible.length; i++) {
                    for (var j = 0; j < everyMovesPossible[i].length; j++) {
                        if (desiredMoveLocation[0] === everyMovesPossible[i][j].positionArrive[0]
                            && desiredMoveLocation[1] === everyMovesPossible[i][j].positionArrive[1]
                            && fromLine === everyMovesPossible[i][j].positionDepart[0]
                            && fromColumn === everyMovesPossible[i][j].positionDepart[1]
                        ) {
                            return {type: "Move", move: everyMovesPossible[i]};
                        }
                    }
                }
            } else {
                //Ne pas joueur
                return null;
            }
        };

        this.moveOrAttackPawn = function (fromLine, fromColumn, toLine, toColumn) {
            var whatToDo = this.allowMovePawn(fromLine, fromColumn, toLine, toColumn);

            if (whatToDo != null && whatToDo.move.length > 0) {
                if (whatToDo.type === "Attack") {
                    var attackMovement = whatToDo.move;
                    //VIOLENT ATTACK !!!!
                   //// console.log("--------------------------",attackMovement);
                    this.attackPawn(attackMovement);
                } else if (whatToDo.type === "Move") {
                    var moveMovement = whatToDo.move;
                    // Moving the pawn gently
                    for (var i = 0; i < moveMovement.length; i++) {
                        if (moveMovement[i].positionDepart[0] === fromLine
                            && moveMovement[i].positionDepart[1] === fromColumn
                            && moveMovement[i].positionArrive[0] === toLine
                            && moveMovement[i].positionArrive[1] === toColumn) {
                            this.movePawn(moveMovement[i].positionDepart[0], moveMovement[i].positionDepart[1],
                                moveMovement[i].positionArrive[0], moveMovement[i].positionArrive[1]);
                        }
                    }
                }
            }

        };

        this.attackPawn = function (move) {
            //TODO verifier si plus d'une attack, celle choisie par joueur
            //var positionDepart = move[0].positionDepart;
            var positionDepart;// = move[0].getPositionDepart();
            if (move[0].getNextMove() != null
                && move[0].getNextMove().positionDepart != "undefined" ) {
                positionDepart = move[0].getNextMove().positionDepart;
            } else positionDepart = move[0].getPositionDepart();

            console.log("positionDep :",positionDepart);
            var positionArrive = move[0].positionArrive;

            var positionPawnRemove = move[0].getPawnRemove(); // move[0].positionPawnRemove;
            console.log("positionArr :",positionArrive);
           // console.log("remove :",positionPawnRemove);
            console.log("remove :",move[0].getPawnRemove());
            console.log();
            for (var i = 0; i < positionPawnRemove.length; i++) {
                this.removePawn(positionPawnRemove[i][0], positionPawnRemove[i][1]);
            }

            //// console.log("===========================",move[0].getNextMove().positionDepart);

            this.movePawn(positionDepart[0], positionDepart[1],
                positionArrive[0], positionArrive[1]);
        };

        this.removePawn = function (line, column) {
            var pawn = board[line][column];
            switch (pawn.getColour()) {
                case "WHITE":

                    var i = whitePawns.indexOf(board[line][column]);
                    if (i != -1) {
                        whitePawns.splice(i, 1);
                    }
                    if (whitePawns.length === 1) {
                        whitePawns[0].setQueen();
                    }
                    break;

                case "BLACK":
                    var i = blackPawns.indexOf(pawn);
                    if (i != -1) {
                        blackPawns.splice(i, 1);
                    }
                    if (blackPawns.length === 1) {
                        blackPawns[0].setQueen();
                    }
                    break;
                default:
                    break;
            }
            board[line][column] = 0;
        };

        this.addPlayer = function (id) {
            players.push(id);
        };

        this.swapPlayer = function () {
            playingPlayerIndex = (playingPlayerIndex + 1) % 2;
        };

        this.getCurrentPlayer = function () {
            return playingPlayerIndex;
        };

        this.whoWins = function () {
            var whoWin = "NOBODY";
            if (whitePawns.length == 0) {
                whoWin = "BLACK";
            } else if (blackPawns.length == 0) {
                whoWin = "WHITE";
            }
            return whoWin;
        };

        this.transformPawnToQueen = function (position) {
            if (board[position[0]][position[1]] != 0) {
                if (position[0] == 7 && board[position[0]][position[1]].getColour() == "WHITE") {
                    //DO transform en queen + changer parametre
                    board[position[0]][position[1]].setQueen();
                } else {
                    if (position[0] == 0 && board[position[0]][position[1]].getColour() == "BLACK") {
                        //DO transform en queen + changer parametre
                        board[position[0]][position[1]].setQueen();
                    }
                }
            }
        };

        init();
    };

    return self;
}(Turkish_Chess || {});

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Turkish_Chess = Turkish_Chess || {};

var merge = require("merge");
var core = merge(require("./pawn"), require("./pawn_type"), require("./move"));

module.exports = (function (self) {
    "use strict";

    self.Board = function () {
        var board;
        var players = []; //J1 : WHITE, J2 : BLACK
        var playingPlayerIndex;
        var whitePawns = [];
        var blackPawns = [];

        var init = function () {
            // Init player
//            players.push(1);
//            players.push(2);

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
                board[1][i] = whitePawns[i];
                board[2][i] = whitePawns[i + 8];
                board[5][i] = blackPawns[i];
                board[6][i] = blackPawns[i + 8];
            }
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

//        this.movePawn = function (pawnIndexLine, pawnIndexColumn, indexLineToMove, indexColumnToMove) {
//            board[indexLineToMove][indexColumnToMove] = board[pawnIndexLine][pawnIndexColumn];
//            board[pawnIndexLine][pawnIndexColumn] = 0;
//        };

        //Deplacement autoriser ou non pour pion
        this.allow = function (pawnIndexLine, pawnIndexColumn, indexLineToMove, indexColumnToMove) {

            var pawn = board[pawnIndexLine][pawnIndexColumn];
            //case vide
            if (board[pawnIndexLine][pawnIndexColumn] == 0) {
                return false;
            }

            switch (pawn.isQueen()) {
                // -- IS NOT A QUEEN
                case false:
                    // Pawn is WHITE
                    if (board[indexLineToMove][indexColumnToMove] == 0) {
                        switch (board[pawnIndexLine][pawnIndexColumn].getColour()) {
                            case "WHITE":
                                if ((pawnIndexLine + 1 == indexLineToMove && pawnIndexColumn == indexColumnToMove) // Mouvement en bas
                                        || (pawnIndexLine == indexLineToMove && pawnIndexColumn - 1 == indexColumnToMove) // Mouvement à gauche
                                        || (pawnIndexLine == indexLineToMove && pawnIndexColumn + 1 == indexColumnToMove)) { // mouvement à droite
                                    return true;
                                } else {
                                    return false;
                                }
                                break;
                            case "BLACK":
                                if ((pawnIndexLine - 1 == indexLineToMove && pawnIndexColumn == indexColumnToMove) // Move up
                                        || (pawnIndexLine == indexLineToMove && pawnIndexColumn - 1 == indexColumnToMove) // Move left
                                        || (pawnIndexLine == indexLineToMove && pawnIndexColumn + 1 == indexColumnToMove)) { // move right
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

                    return false;
                    break;
                default:
                    return false;
                    break;
            }
        };

        this.getPossibleMoves = function (indexLine, indexColumn) {
            var possibleMoves = [];
            for (var line = 0; line < board.length; line++) {
                for (var column = 0; column < board[line].length; column++) {
                    if (this.allow(indexLine, indexColumn, line, column)) {
                        var possibleMove = new core.Move();
                        possibleMove.positionDepart = [indexLine, indexColumn];
                        possibleMove.positionArrive = [line, column];
                        possibleMove.determinateDirection();
                        var thisPossibleMove = this.getPossibleMoves(possibleMove.positionArrive[0], possibleMove.positionArrive[1]);
                        if (thisPossibleMove !== []) {
                            possibleMove.addMove(thisPossibleMove);
                        }
                        possibleMoves.push(possibleMove);
//                        possibleMoves.push([line, column]);
                    }
                }
            }
            return possibleMoves;
        };

        //Case vide
        this.empty = function (position) {
            if (board[position[0]][position[1]] == 0) {
                return true;
            } else {
                return false;
            }
        };


        //Coup obligatoire
        this.getPossibleAttacks = function (pawnIndexLine, pawnIndexColumn) {

            var movesArray = [];

            var caseDown = [pawnIndexLine + 1, pawnIndexColumn];
            var caseUp = [pawnIndexLine - 1, pawnIndexColumn];
            var caseLeft = [pawnIndexLine, pawnIndexColumn - 1];
            var caseRight = [pawnIndexLine, pawnIndexColumn + 1];

            var pawn = board[pawnIndexLine][pawnIndexColumn];

            if (pawn != 0) {



                switch (pawn.isQueen()) {
                    // Si c'est un pion
                    case false:


                        //Possible capture ?
                        if (!this.empty(caseRight) //CASE RIGHT
                                && board[pawnIndexLine][pawnIndexColumn + 1].getColour() !== board[pawnIndexLine][pawnIndexColumn].getColour()
                                && board[pawnIndexLine][pawnIndexColumn + 2] == 0) {
                            //TODO ajouter au tableau le coup possible
                            var possibleMove = new core.Move();
                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine, pawnIndexColumn + 2];
                            possibleMove.determinateDirection();
                            var thisPossibleAttack = this.getPossibleAttacks(possibleMove.positionArrive[0], possibleMove.positionArrive[1]);
                            if (thisPossibleAttack !== []) {
                                possibleMove.addMove(thisPossibleAttack);
                            }
                            movesArray.push(possibleMove);
                            console.log("Capture !!!");
                        }

                        if (!this.empty(caseLeft) //CASE LEFT
                                && board[pawnIndexLine][pawnIndexColumn - 1].getColour() !== board[pawnIndexLine][pawnIndexColumn].getColour()
                                && board[pawnIndexLine][pawnIndexColumn - 2] == 0) {
                            //TODO ajouter au tableau le coup possible
                            var possibleMove = new core.Move();
                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine, pawnIndexColumn - 2];
                            possibleMove.determinateDirection();
                            var thisPossibleAttack = this.getPossibleAttacks(possibleMove.positionArrive[0], possibleMove.positionArrive[1]);
                            if (thisPossibleAttack !== []) {
                                possibleMove.addMove(thisPossibleAttack);
                            }
                            movesArray.push(possibleMove);
                            console.log("Capture !!!");
                        }

                        //Pawn is WHITE
                        if (board[pawnIndexLine][pawnIndexColumn].getColour() == "WHITE" // CASE DOWN
                                && !this.empty(caseDown)
                                && board[pawnIndexLine + 1][pawnIndexColumn].getColour() == "BLACK"
                                && board[pawnIndexLine + 2][pawnIndexColumn] == 0) {
                            //TODO ajouter au tableau le coup possible
                            var possibleMove = new core.Move();
                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine + 2, pawnIndexColumn];
                            possibleMove.determinateDirection();
                            var thisPossibleAttack = this.getPossibleAttacks(possibleMove.positionArrive[0], possibleMove.positionArrive[1]);
                            if (thisPossibleAttack !== []) {
                                possibleMove.addMove(thisPossibleAttack);
                            }
                            movesArray.push(possibleMove);
                            console.log("Capture !!!");
                        }
                        //Pawn is BLACK
                        if (board[pawnIndexLine][pawnIndexColumn].getColour() == "BLACK" // CASE UP
                                && !this.empty(caseUp)
                                && board[pawnIndexLine - 1][pawnIndexColumn].getColour() == "WHITE"
                                && board[pawnIndexLine - 2][pawnIndexColumn] == 0) {
                            //TODO ajouter au tableau le coup possible
                            var possibleMove = new core.Move();
                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine - 2, pawnIndexColumn];
                            possibleMove.determinateDirection();
                            var thisPossibleAttack = this.getPossibleAttacks(possibleMove.positionArrive[0], possibleMove.positionArrive[1]);
                            if (thisPossibleAttack !== []) {
                                possibleMove.addMove(thisPossibleAttack);
                            }
                            movesArray.push(possibleMove);
                            console.log("Capture !!!");
                        }


                        break;

                        // Si c'est une reine.
                    case true :
                        if (!this.empty(caseRight) //CASE RIGHT
                                && board[pawnIndexLine][pawnIndexColumn + 1].getColour() !== board[pawnIndexLine][pawnIndexColumn].getColour()
                                && board[pawnIndexLine][pawnIndexColumn + 2] == 0) {
                            //TODO ajouter au tableau le coup possible
                            console.log("Capture !!!");
                        }

                        if (!this.empty(caseLeft) //CASE LEFT
                                && board[pawnIndexLine][pawnIndexColumn - 1].getColour() !== board[pawnIndexLine][pawnIndexColumn].getColour()
                                && board[pawnIndexLine][pawnIndexColumn - 2] == 0) {
                            //TODO ajouter au tableau le coup possible
                            console.log("Capture !!!");
                        }

                        //Pawn is WHITE
                        if (!this.empty(caseDown)
                                && board[pawnIndexLine + 1][pawnIndexColumn].getColour() !== board[pawnIndexLine][pawnIndexColumn].getColour()
                                && board[pawnIndexLine + 2][pawnIndexColumn] == 0) {
                            //TODO ajouter au tableau le coup possible
                            console.log("Capture !!!");
                        }
                        //Pawn is BLACK
                        if (!this.empty(caseUp)
                                && board[pawnIndexLine - 1][pawnIndexColumn].getColour() !== board[pawnIndexLine][pawnIndexColumn].getColour()
                                && board[pawnIndexLine - 2][pawnIndexColumn] == 0) {
                            //TODO ajouter au tableau le coup possible
                            console.log("Capture !!!");
                        }
                        break;
                        break;
                    default:
                        break;
                }
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
            console.log(st);
            return st;
        };

        this.allowMovePawn = function (fromLine, fromColumn, toLine, toColumn) {
            var possibleMoves = this.getPossibleMoves(fromLine, fromColumn); //ensemble des mouvements possibles
            var possibleAttacks = this.getPossibleAttacks(fromLine, fromColumn);//capture possible ou non
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
            //for tous ses pions
            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j < board[i].length; j++) {
                    if (board[i][j].getColour() == playerColour) {
                        var thisPossibleAttack = this.getPossibleAttacks(i, j);
                        var thisPossibleMove = this.getPossibleMoves(i, j);
                        if (thisPossibleAttack !== []) {
                            everyAttackesPossible.push(this.getPossibleAttacks(i, j));
                        }
                        if (thisPossibleMove !== []) {
                            everyMovesPossible.push(this.getPossibleMoves(i, j));
                        }
                    }
                }
            }

            //capture obligatoire
            if (everyAttackesPossible !== []) {
                //ajout dans possible Attack
                var maxSize = 0;
                var indexMaxSize = -1;
                for (var i = 0; i < everyAttackesPossible.length; i++) {
                    if (everyAttackesPossible[i].getTotalSize() > maxSize) {
                        maxSize = everyAttackesPossible[i].getTotalSize();
                        indexMaxSize = i;
                    }
                }
                return everyAttackesPossible[indexMaxSize];
            } else if (everyMovesPossible !== []) {

                //mouvement est un mouvement possible
                for (var i = 0; i < everyMovesPossible.length; i++) {
                    if (desiredMoveLocation[0] === everyMovesPossible[i].getPositionArrive()[0]
                            && desiredMoveLocation[1] === everyMovesPossible[i].getPositionArrive()[1]) {
                        return everyMovesPossible[i];
                    }
                }
            } else {
                //Ne pas joueur 
                return null;
            }
        };

        this.moveOrAttackPawn = function (fromLine, fromColumn, toLine, toColumn, playerColour) {
            board[toLine][toColumn] = board[fromLine][fromColumn];
            board[fromLine][fromColumn] = 0;
        };

        this.addPlayer = function (id) {
            players.push(id);
        };

        this.swapPlayer = function () {
//            var tmp = players[1];
//            players[1] = players[0];
//            players[0] = tmp;
            playingPlayerIndex = (playingPlayerIndex + 1) % 2;
        };

        this.getCurrentPlayer = function () {
            return players[playingPlayerIndex];
        };

        init();
    };

    return self;
}(Turkish_Chess || {}));

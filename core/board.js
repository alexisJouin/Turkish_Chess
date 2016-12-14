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
        var player = []; //J1 : WHITE, J2 : BLACK
        var whitePawns = [];
        var blackPawns = [];

        var init = function () {
            // Init player
            player.push(1);
            player.push(2);

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
            return player;
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
                        possibleMove.addMove(this.getPossibleMoves(possibleMove.positionArrive[0], possibleMove.positionArrive[1]));
                        possibleMoves.push(possibleMove);
                        // TODO : recursivity trick
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
        this.requiredAllow = function (pawnIndexLine, pawnIndexColumn) {


            var caseDown = [pawnIndexLine + 1, pawnIndexColumn];
            var caseUp = [pawnIndexLine - 1, pawnIndexColumn];
            var caseLeft = [pawnIndexLine, pawnIndexColumn - 1];
            var caseRight = [pawnIndexLine, pawnIndexColumn + 1];


            //Possible capture ?
            if(!this.empty(caseRight) //CASE RIGHT
                && board[pawnIndexLine][pawnIndexColumn+1].getColour()!==board[pawnIndexLine][pawnIndexColumn].getColour()
                && board[pawnIndexLine][pawnIndexColumn+2]==0 ){
                //TODO ajouter au tableau le coup possible
                console.log("Capture !!!");
            }

            if(!this.empty(caseLeft) //CASE LEFT
                && board[pawnIndexLine][pawnIndexColumn-1].getColour()!==board[pawnIndexLine][pawnIndexColumn].getColour()
                && board[pawnIndexLine][pawnIndexColumn-2]==0 ){
                //TODO ajouter au tableau le coup possible
                console.log("Capture !!!");
            }

            //Pawn is WHITE
            if(board[pawnIndexLine][pawnIndexColumn].getColour()=="WHITE" // CASE DOWN
                && !this.empty(caseDown)
                && board[pawnIndexLine+1][pawnIndexColumn].getColour()=="BLACK"
                && board[pawnIndexLine+2][pawnIndexColumn]==0 ){
                //TODO ajouter au tableau le coup possible
                console.log("Capture !!!");
            }
            //Pawn is BLACK
            if(board[pawnIndexLine][pawnIndexColumn].getColour()=="BLACK" // CASE UP
                && !this.empty(caseUp)
                && board[pawnIndexLine-1][pawnIndexColumn].getColour()=="WHITE"
                && board[pawnIndexLine-2][pawnIndexColumn]==0 ){
                //TODO ajouter au tableau le coup possible
                console.log("Capture !!!");
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

        this.movePawn = function (fromLine, fromColumn, toLine, toColumn) {
            var possibleMoves = this.getPossibleMoves(fromLine, fromColumn);
            var desiredMoveLocation = [toLine, toColumn];
            for (var i = 0; i < possibleMoves.length; i++) {
                if (possibleMoves[i] === desiredMoveLocation) {

                }
            }
        };


        this.setPlayer = function (id) {
            players.push(id);
        };

        this.swapPlayer = function () {
            var tmp = players[1];
            players[1] = players[0];
            players[0] = tmp;
        };

        this.getCurrentPlayer = function () {
            return players[0];
        };

        init();
    };

    return self;
}(Turkish_Chess || {}));

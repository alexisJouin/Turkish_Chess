/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Turkish_Chess = Turkish_Chess || {};

var merge = require("merge");
var core = merge(require("./pawn"), require("./pawn_type"));

module.exports = (function (self) {
    "use strict";

    self.Board = function () {
        var board;

        var whitePawns = [];
        var blackPawns = [];

        var init = function () {
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
        };

        //Deplacement autoriser ou non pour pion
        this.allow = function (pawnIndexLine, pawnIndexColumn, indexLineToMove, indexColumnToMove) {

            var pawn = board[pawnIndexLine][pawnIndexColumn];
            pawn.isQueen();

            if (!pawn.isQueen()) {

                //Pawn is WHITE
                if (board[indexLineToMove][indexColumnToMove] == 0) {
                    if (board[pawnIndexLine][pawnIndexColumn].getColour() == "WHITE") {
                        if ((pawnIndexLine + 1 == indexLineToMove && pawnIndexColumn == indexColumnToMove) || (pawnIndexLine == indexLineToMove && pawnIndexColumn - 1 == indexColumnToMove) || (pawnIndexLine == indexLineToMove && pawnIndexColumn + 1 == indexColumnToMove)) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if ((pawnIndexLine - 1 == indexLineToMove && pawnIndexColumn == indexColumnToMove) || (pawnIndexLine == indexLineToMove && pawnIndexColumn - 1 == indexColumnToMove) || (pawnIndexLine == indexLineToMove && pawnIndexColumn + 1 == indexColumnToMove)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            } else {
                //TODO Autoriser Dame
                return false;
            }

        };

        this.getPossibleMoves = function (indexLine, indexColumn) {
            var possibleMoves = [];
            for (var line = 0; line < board.length; line++) {
                for (var column = 0; column < board[line].length; column++) {
                    if (this.allow(indexLine, indexColumn, line, column)) {
                        var possibleMove = [line, column];
                        possibleMoves.push(possibleMove);
                        // TODO : recursivity trick
                    }
                }
            }
            return possibleMoves;
        };

        //Coup obligatoire
        this.requiredAllow = function (pawn) {

            console.log("====" + pawn);

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

        init();
    };

    return self;
}(Turkish_Chess || {}));
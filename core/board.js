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
        }

        //Deplacement autoriser ou non pour pion
        this.allow = function (pawn, i, j) {

            var x = pawn[0];
            var y = pawn[1];

            //RECUPERE COULEUR : board[1][5].getColour());
            //Verifie si le pion existe !
            if (board[x][y] == 0) {
                return false;
            }

            console.log(board[x][y].isQueen());
            //DOIT FAIRE LE TEST SI PION OU DAME !
            //Pawn is WHITE
            if (board[i][j] == 0) {
                if (board[pawn[0]][pawn[1]].getColour() == "WHITE") {
                    if ((i == x + 1 && j == y) || (i == x && j == y - 1) && (i == x && j == y + 1)) {//[i,j] == [x+1,y]
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if ((i == x - 1 && j == y) || (i == x && j == y - 1) && (i == x && j == y + 1)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        };


           this.getPossibleMove 
            

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
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Turkish_Chess = Turkish_Chess || {};

//var merge = require("merge");
var core = require("./pawn.js");

module.exports = (function (self) {
    "use strict";

    self.Board = function () {
        var board;

        var whitePawns = [];
        var blackPawns = [];

        this.initializeBoard = function () {
            // Init white pawns
                        
            for (var i = 0; i < 16; i++) {
                whitePawns.push(new core.Pawn(core.Pawn.Type.WHITE));
                blackPawns.push(new core.Pawn(core.Pawn.Type.BLACK));
            }

            // Init the board
            this.board = [
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

            for (var i = 1; i < 3; i++) {
                for (var j = 0; j < 8 * i; j++) {
                    this.board[i][j] = whitePawns[j * (i-1)];
                    console.log(j * (i -1));
                }
            }
        };


        this.getBoard = function () {
            return this.plateau;
        };

        this.toString = function () {
            var plateauString = "[";
            for (var line = 0; line < plateau.length; line++) {
                plateauString += "[";
                for (var column = 0; column < plateau[line].length; column++) {

                }
            }

            plateauString += "]";
            return plateau;
        };

    };

    return self;
}(Turkish_Chess || {}));
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Turkish_Chess = Turkish_Chess || {};

module.exports = (function (self) {
    "use strict";

    self.Board = function () {
        var plateau;


        this.initializeBoard = function () {
            this.plateau = [
                [" ", " ", " ", " ", " ", " ", " ", " "],
                ["W", "W", "W", "W", "W", "W", "W", "W"],
                ["W", "W", "W", "W", "W", "W", "W", "W"],
                [" ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " "],
                ["B", "B", "B", "B", "B", "B", "B", "B"],
                ["B", "B", "B", "B", "B", "B", "B", "B"],
                [" ", " ", " ", " ", " ", " ", " ", " "]
            ];
        };


        this.getBoard = function () {
            return this.plateau;
        };
        
        this.toString = function(){
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
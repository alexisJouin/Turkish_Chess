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

        this.movePawn = function (pawnIndexLine, pawnIndexColumn, indexLineToMove, indexColumnToMove) {
            board[indexLineToMove][indexColumnToMove] = board[pawnIndexLine][pawnIndexColumn];
            board[pawnIndexLine][pawnIndexColumn] = 0;

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
                        
                        return false;
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
//                        possibleMoves.push([line, column]);
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

            if (pawn !== 0) {

                switch (pawn.isQueen()) {
                    // Si c'est un pion
                    case false:

                        //Possible capture ?
                        if (!this.empty(caseRight) //CASE RIGHT
                                && pawnIndexColumn < 6
                                && board[pawnIndexLine][pawnIndexColumn + 1].getColour() !== board[pawnIndexLine][pawnIndexColumn].getColour()
                                && board[pawnIndexLine][pawnIndexColumn + 2] == 0) {
                            //TODO ajouter au tableau le coup possible
                            var possibleMove = new core.Move();
                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine, pawnIndexColumn + 2];
                            possibleMove.determinateDirection();
                            var thisPossibleAttack = this.getPossibleAttacks(possibleMove.positionArrive[0], possibleMove.positionArrive[1]);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {
                                possibleMove.addMove(thisPossibleAttack);
                            }
                            movesArray.push(possibleMove);
                            console.log("Capture !!!");
                        }

                        if (!this.empty(caseLeft) //CASE LEFT
                                && pawnIndexColumn > 1
                                && (board[pawnIndexLine][pawnIndexColumn - 1].getColour() !== board[pawnIndexLine][pawnIndexColumn].getColour())
                                && (board[pawnIndexLine][pawnIndexColumn - 2] == 0)) {
                            //TODO ajouter au tableau le coup possible
                            var possibleMove = new core.Move();
                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine, pawnIndexColumn - 2];
                            possibleMove.determinateDirection();
                            var thisPossibleAttack = this.getPossibleAttacks(possibleMove.positionArrive[0], possibleMove.positionArrive[1]);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {
                                possibleMove.addMove(thisPossibleAttack);
                            }
                            movesArray.push(possibleMove);
                            console.log("Capture !!!");
                        }

                        //Pawn is WHITE
                        if (!this.empty(caseDown)
                                && pawnIndexLine < 6
                                && board[pawnIndexLine][pawnIndexColumn].getColour() == "WHITE" // CASE DOWN
                                && board[pawnIndexLine + 1][pawnIndexColumn].getColour() == "BLACK"
                                && board[pawnIndexLine + 2][pawnIndexColumn] == 0) {
                            //TODO ajouter au tableau le coup possible
                            var possibleMove = new core.Move();
                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine + 2, pawnIndexColumn];
                            possibleMove.determinateDirection();
                            var thisPossibleAttack = this.getPossibleAttacks(possibleMove.positionArrive[0], possibleMove.positionArrive[1]);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {
                                possibleMove.addMove(thisPossibleAttack);
                            }
                            movesArray.push(possibleMove);
                            console.log("Capture !!!");
                        }
                        //Pawn is BLACK
                        if (board[pawnIndexLine][pawnIndexColumn].getColour() == "BLACK" // CASE UP
                                && !this.empty(caseUp)
                                && pawnIndexLine > 1
                                && board[pawnIndexLine - 1][pawnIndexColumn].getColour() == "WHITE"
                                && board[pawnIndexLine - 2][pawnIndexColumn] == 0) {
                            //TODO ajouter au tableau le coup possible
                            var possibleMove = new core.Move();
                            possibleMove.positionDepart = [pawnIndexLine, pawnIndexColumn];
                            possibleMove.positionArrive = [pawnIndexLine - 2, pawnIndexColumn];
                            possibleMove.determinateDirection();
                            var thisPossibleAttack = this.getPossibleAttacks(possibleMove.positionArrive[0], possibleMove.positionArrive[1]);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {
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
            //   console.log(st);
            return st;
        };

        this.allowMovePawn = function (fromLine, fromColumn, toLine, toColumn) {
//            var possibleMoves = this.getPossibleMoves(fromLine, fromColumn); //ensemble des mouvements possibles
//            var possibleAttacks = this.getPossibleAttacks(fromLine, fromColumn);//capture possible ou non
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
                    if (board[i][j] !== 0) {
                        if (board[i][j].getColour() == playerColour) {
                            var thisPossibleAttack = this.getPossibleAttacks(i, j);
                            var thisPossibleMove = this.getPossibleMovesObjects(i, j);
                            if (thisPossibleAttack != null && thisPossibleAttack.length > 0) {
                                everyAttackesPossible.push(this.getPossibleAttacks(i, j));
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
                //ajout dans possible Attack
                var maxSize = 0;
                var indexMaxSize = -1;
                for (var i = 0; i < everyAttackesPossible.length; i++) {
                    for (var j = 0; j < everyAttackesPossible[i].length; j++) {
                            console.log("everyAttackPossible total size : " + everyAttackesPossible[i][j].getTotalSize());
                        if (everyAttackesPossible[i][j].getTotalSize() > maxSize) {
                            maxSize = everyAttackesPossible[i][j].getTotalSize();
                            indexMaxSize = i;
                        }
                    }
                }
                return {type: "Attack", move: everyAttackesPossible[indexMaxSize]};
            } else if (everyMovesPossible != null && everyMovesPossible.length > 0) {

                //mouvement est un mouvement possible
                for (var i = 0; i < everyMovesPossible.length; i++) {
                    for (var j = 0; j < everyMovesPossible[i].length; j++) {
                        if (desiredMoveLocation[0] === everyMovesPossible[i][j].positionArrive[0]
                                && desiredMoveLocation[1] === everyMovesPossible[i][j].positionArrive[1]
                                //modif Eric
                                && fromLine === everyMovesPossible[i][j].positionDepart[0]
                                && fromColumn === everyMovesPossible[i][j].positionDepart[1]
                                //end modif eric
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
           // board[toLine][toColumn] = board[fromLine][fromColumn];
            //board[fromLine][fromColumn] = 0;



            var whatToDo = this.allowMovePawn(fromLine, fromColumn, toLine, toColumn);

            if (whatToDo != null && whatToDo.move.length > 0) {
                if (whatToDo.type === "Attack") {
                    var attackMovement = whatToDo.move;
                    //TODO : VIOLENT ATTACK !!!!
                    this.attackPawn(attackMovement);
                } else if (whatToDo.type === "Move") {
                    var moveMovement = whatToDo.move;
                    // Moving the pawn gently
                    for (var i = 0; i < moveMovement.length; i++) {
                        //modif eric
                            if (moveMovement[i].positionDepart[0] === fromLine
                                && moveMovement[i].positionDepart[1] === fromColumn
                                && moveMovement[i].positionArrive[0] === toLine
                                && moveMovement[i].positionArrive[1] === toColumn ) {
                                this.movePawn(moveMovement[i].positionDepart[0], moveMovement[i].positionDepart[1],
                                    moveMovement[i].positionArrive[0], moveMovement[i].positionArrive[1]);
                            }
                        //end
                        // old value this.movePawn(moveMovement[i].positionDepart[0], moveMovement[i].positionDepart[1],
                        // moveMovement[i].positionArrive[0], moveMovement[i].positionArrive[1]);
                    }
                }
            }

        };


        this.attackPawn = function (move) {
            for (var i = 0; i < move.length ; i ++) {
                var positionDepart = move[i].positionDepart;
                var positionArrive = move[i].positionArrive;

                var positionPawnRemove;
                switch (move[i].direction){
                    case "DOWN":
                        positionPawnRemove = [(positionDepart[0] +1) , positionDepart[1]];
                        break;
                    case "UP":
                        positionPawnRemove = [(positionDepart[0] -1) , positionDepart[1]];
                        break;
                    case "RIGHT":
                        positionPawnRemove = [positionDepart[0]  , (positionDepart[1] + 1)];
                        break;
                    case "LEFT":
                        positionPawnRemove = [positionDepart[0]  , (positionDepart[1] - 1)];
                        break;
                    default:
                        break;
                }

                // Détermination de la position du pion à supprimer
                // var positionPawnRemove = [positionDepart[0] - positionArrive[0], positionDepart[1] - positionArrive[1]];
///**/
                console.log("positionDepart : " + positionDepart);
                console.log("positionArrive : " + positionArrive);
                console.log("positionPawnRemove : " + positionPawnRemove);

                this.removePawn(positionPawnRemove[0], positionPawnRemove[1]);
                this.movePawn(positionDepart[0], positionDepart[1], positionArrive[0], positionArrive[1]);

                if (move[i].nextMove != null) {

                    this.attackPawn(move[i].nextMove);
                }
            }
        };

        this.removePawn = function (line, column) {
            var pawn = board[line][column];
            switch (pawn.getColour()) {
                case "WHITE":
                    whitePawns.pop(pawn);
                    //modif eric
                    if (whitePawns.length ===1) {
                        whitePawns[0].setQueen();
                    } // end modif eric
                    break;

                case "BLACK":
                    blackPawns.pop(pawn);
                    //modif eric
                    if (blackPawns.length ===1) {
                        blackPawns[0].setQueen();
                    } // end modif eric
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
//            var tmp = players[1];
//            players[1] = players[0];
//            players[0] = tmp;
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

            var pawn = board[position[0]][position[1]];

            console.log("=>>>>>>" + board[position[0]][position[1]]);
            console.log("=>>>>>>" + position);
            // modif eric
            if (pawn != 0 ) {
                if (position[0] == 7 && pawn.getColour() == "WHITE") {
                    //TODO transform en queen + changer parametre
                    pawn.setQueen();
                    board[position[0]][position[1]]=pawn; // add eric
                }
            } else {
                if (position[0] == 0 && pawn.getColour() == "BLACK") {
                    //TODO transform en queen + changer parametre
                    pawn.setQueen();
                    board[position[0]][position[1]]=pawn; // add eric

                }
            }
            // end modif eric
           /* old version
            if (pawn != 0 && pawn.getColour() == "WHITE") {
                if (position[0] == 0 ) {
                    //TODO transform en queen + changer parametre
                    pawn.setQueen();
                }
            } else {
                if (position[0] == 0) {
                    //TODO transform en queen + changer parametre
                    pawn.setQueen();
                }
            }*/
        };

        init();
    };

    return self;
}(Turkish_Chess || {}));

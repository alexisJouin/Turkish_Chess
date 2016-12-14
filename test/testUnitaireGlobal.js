/**
 * Created by esailly on 14/12/16.
 */

var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var fs = require('fs');
var core = require('./../core');

describe('Global Test', function () {
    var board = new core.Board();
    it('Board', function () {
        expect(board.getNbPawns("WHITE")).equal(16);
        expect(board.getNbPawns("BLACK")).equal(16);
        expect(board.getBoardArray()) === ([
            [ 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 2, 2, 2, 2, 2, 2, 2, 2 ],
            [ 2, 2, 2, 2, 2, 2, 2, 2 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ]
        ]);
    });

    it('Base move pawn', function () {
        // ok for front
        expect(board.allow(2,0,3,0)).equal(true);
        expect(board.allow(2,1,3,1)).equal(true);
        //ko for back
        expect(board.allow(1,1,0,0)).equal(false);
        expect(board.allow(1,1,1,0)).equal(false);
        expect(board.allow(1,1,2,0)).equal(false);
        //ko for diagonal
        expect(board.allow(2,1,3,0)).equal(false);
        expect(board.allow(2,1,3,2)).equal(false);
        //TODO erreur isqueen sur case vide
        //ko no pawn
        //expect(board.allow(0,0,0,1)).equal(false);

        //ko pawn on other
        expect(board.allow(1,1,2,1)).equal(false);
        //ok lateral
        board.movePawn(2,1,3,1); // not cool standing
        //console.log(board.getBoardArray());
        //Todo Fct move
        // expect(board.allow(3,1,3,0)).equal(true);
        // expect(board.allow(3,1,3,2)).equal(true);
    });
});

describe('Init Pawn tests', function () {
    var pawnW = new core.Pawn(core.PawnType.WHITE, "WHITE");
    var pawnB = new core.Pawn(core.PawnType.BLACK, "BLACK");

    it('Base create pawnW', function () {
        //test white pawn
        expect(pawnW.getType()).equal(core.PawnType.WHITE);
        expect(pawnW.getColour()).equal("WHITE");
        expect(pawnW.isQueen()).equal(false);
        expect(pawnW.toString()).equal("{colour : WHITE, isQueen : false}");

        pawnW.setQueen();

        expect(pawnW.isQueen()).equal(true);
        expect(pawnW.getType()).equal(core.PawnType.Q_WHITE);
        expect(pawnW.getColour()).equal("WHITE");
        expect(pawnW.toString()).equal("{colour : WHITE, isQueen : true}");
    });

    it('Base create pawnB', function () {
        //test white pawn
        expect(pawnB.getType()).equal(core.PawnType.BLACK);
        expect(pawnB.getColour()).equal("BLACK");
        expect(pawnB.isQueen()).equal(false);
        expect(pawnB.toString()).equal("{colour : BLACK, isQueen : false}");

        pawnB.setQueen();

        expect(pawnB.isQueen()).equal(true);
        expect(pawnB.getType()).equal(core.PawnType.Q_BLACK);
        expect(pawnB.getColour()).equal("BLACK");
        expect(pawnB.toString()).equal("{colour : BLACK, isQueen : true}");
    });
});
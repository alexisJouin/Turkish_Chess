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

    it('Base move pawn White', function () {
        console.log("Base move pawn White");
        console.log();
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
        expect(board.allow(0,0,0,1)).equal(false);

        //ko pawn on other
        expect(board.allow(1,1,2,1)).equal(false);
        //ok lateral
        board.moveOrAttackPawn(2,1,3,1); // not cool standing
        //console.log(board.getBoardArray());
        //Todo Fct move
         expect(board.allow(3,1,3,0)).equal(true);
         expect(board.allow(3,1,3,2)).equal(true);
    });

    it('Base move pawn Black', function () {
        console.log("Base move pawn Black");
        console.log();
        board.swapPlayer();
        // ok for front
        expect(board.allow(5,0,4,0)).equal(true);
        expect(board.allow(5,1,4,1)).equal(true);
        //ko for back
        expect(board.allow(6,1,0,7)).equal(false);
        expect(board.allow(6,1,1,7)).equal(false);
        expect(board.allow(6,1,2,7)).equal(false);
        //ko for diagonal
        expect(board.allow(5,1,4,0)).equal(false);
        expect(board.allow(5,1,4,2)).equal(false);
        //ko no pawn
        expect(board.allow(4,0,3,0)).equal(false);

        //ko pawn on other
        expect(board.allow(6,1,5,1)).equal(false);
        //ok lateral
        board.moveOrAttackPawn(5,1,4,1); // not cool standing
        expect(board.allow(4,1,4,0)).equal(true);
        expect(board.allow(4,1,4,2)).equal(true);
    });

    it('Base template', function () {

    });
});

describe('Init Pawn tests', function () {
    var pawnW = new core.Pawn(core.PawnType.WHITE, "WHITE");
    var pawnB = new core.Pawn(core.PawnType.BLACK, "BLACK");

    it('Base create pawnW', function () {
        console.log("Base create pawn White");
        console.log();
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
        console.log("Base create pawn Black");
        console.log();
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




describe('Init moves tests', function () {
    console.log("Init moves tests");
    console.log();
    var board = new core.Board();
    var m1 = new core.Move();
    var m2 = new core.Move();
    var m3 = new core.Move();

   console.log("size move ",m1.getSize());
   console.log("globalsize move ",m1.getTotalSize());
    m1.addpositionPawnRemove([1,1]);
    m2.addpositionPawnRemove([2,2]);
    m3.addpositionPawnRemove([3,3]);
    m1.addMove(m2);
   console.log("size move ",m1.getSize());
   console.log("globalsize move ",m1.getTotalSize());
    m2.addMove(m3);
   console.log("size move ",m1.getSize());
   console.log("globalsize move ",m1.getTotalSize());
    expect(m1.getTotalSize()).equal(3);
    console.log(m1.getPawnRemove());
   // expect(m1.getPawnRemove()).to.deep.equal([ [ 3, 3 ], [ 2, 2 ], [ 1, 1 ] ]);
});


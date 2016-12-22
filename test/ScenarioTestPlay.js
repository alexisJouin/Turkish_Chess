/**
 * Created by esailly on 15/12/16.
 */
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var fs = require('fs');
var core = require('./../core');

var ArrayMoveToString = function (arrayPositions) {
    if (arrayPositions != null && arrayPositions.length > 0) {
        var result = "[ ";
        for (i = 0 ; i < arrayPositions.length ; i++) {
           result += "["+arrayPositions[i].positionArrive[0] +","+arrayPositions[i].positionArrive[0]+"]";
           if (i !== arrayPositions.length -1 ) {
               result +=",";
           } else result +=" ]";
        }
    } else return "[]";
    return result;
};

var myColor = function (_board, posLine, posColumn) {
   // var myColor;
    if (!_board.empty([posLine, posColumn])) {
        var pawn = _board.getPositionBoard(posLine, posColumn);
        return  pawn.getColour();
    } else return  "Empty";
};

var myIsQueen = function (_board, posLine, posColumn) {
    if (!_board.empty([posLine, posColumn])) {
        var pawn = _board.getPositionBoard(posLine, posColumn);
        return  pawn.isQueen();
    } else return  false;
};

describe('Test a Play', function () {
    var board = new core.Board();

    it('New play', function () {
        //console.log(board.getPlayers());
        expect(board.getPlayers()).to.deep.equal([]);
        board.addPlayer("Id1");
        expect(board.getPlayers()).to.deep.equal(["Id1"]);
        board.addPlayer("Id2");
        expect(board.getPlayers()).to.deep.equal(["Id1","Id2"]);
        expect(board.getCurrentPlayer()).equal(0);
        board.swapPlayer();
        expect(board.getCurrentPlayer()).equal(1);
        board.swapPlayer();

        //player 1
        expect(board.getPossibleMoves(2,2)).to.deep.equal([[3,2]]);
        expect(board.getPossibleMoves(2,0)).to.deep.equal([[3,0]]);
        expect(board.getPossibleMoves(2,7)).to.deep.equal([[3,7]]);
        board.swapPlayer();

        //player 2
        expect(board.getPossibleMoves(2,2)).equal(null); //noir joue blanc
        expect(board.getPossibleMoves(5,1)).to.deep.equal([[4,1]]);
        expect(board.getPossibleMoves(5,0)).to.deep.equal([[4,0]]);
        expect(board.getPossibleAttacks(5,2)).to.deep.equal([]);

        board.swapPlayer();
        //Player 1
        board.moveOrAttackPawn(2,3,3,3);
        expect(board.empty([2,3])).equal(true);
        expect(board.empty([3,3])).equal(false);
        expect(myColor(board,3,3)).equal("WHITE");
        //console.log(board.getBoardArray(),"\n");

        //possible but not authorize
        expect(board.getPossibleMoves(3,3)).to.deep.equal([ [3,2],[3,4],[4,3] ]);

        expect(board.getCurrentPlayer()).equal(0); // iterface change player
        board.swapPlayer();
        expect(board.getCurrentPlayer()).equal(1);
        //player 2

        board.moveOrAttackPawn(5,3,4,3);
        //console.log(board.getBoardArray(),"\n");

        expect(board.getCurrentPlayer()).equal(1);
        board.swapPlayer();
        expect(board.getCurrentPlayer()).equal(0);
        //player 1

        expect(board.getCurrentPlayer()).equal(0);
        board.swapPlayer();
        expect(board.getCurrentPlayer()).equal(1);
        //player 2

        expect(board.getCurrentPlayer()).equal(1);
        board.swapPlayer();
        expect(board.getCurrentPlayer()).equal(0);
        //player 1

        //possibleAttack
        //todo attention multiple attack must be [5,3] and after [7,5] and Queen !
        //expect(ArrayMoveToString(board.getPossibleAttacks(3,3))).to.deep.equal("[ [5,3] ]");
        //expect(ArrayMoveToString(board.getPossibleAttacks(3,3))).to.deep.equal("[ [7,3] ]");
        expect(ArrayMoveToString(board.getPossibleAttacks(2,2))).to.deep.equal("[]");

        //Attack
        board.moveOrAttackPawn(3,3,5,3); //normaly must be (3,3,7,3)
        expect(board.empty([3,3])).equal(true); // White origin
        expect(board.empty([5,3])).equal(false); // white final

        //todo remove black after attack
        expect(board.getNbPawns("BLACK")).equal(15);
        expect(board.empty([4,3])).equal(true); // Black to remove
        //expect(board.empty([6,3])).equal(true); // Black to remove
       // expect(board.empty([7,3])).equal(false); // white final


        // todo remove after debug
        expect(board.empty([4,3])).equal(true);
      //  console.log(board.getBoardArray(),"\n");


        expect(myColor(board,5,3)).equal("WHITE");

        // todo test if isqueen
       // expect(myIsQueen(board,7,3)).equal(true);

        expect(board.getCurrentPlayer()).equal(0);
        board.swapPlayer();
        expect(board.getCurrentPlayer()).equal(1);
        //player 2

        console.log(board.getBoardArray());

        // //test attack
        // expect(board.getPossibleMoves(3,3)).to.deep.equal([[3,2],[3,4]]); //not must be null
        // expect(board.getPossibleAttacks(3,3)).to.deep.equal([[5,3]]);





    });



});

describe('Test a Win', function () {
    var board = new core.Board();
    var pawn;

    board.initTest();

    it('New play for Queen', function () {

        console.log(board.getBoardArray());
        console.log();
        expect(board.getNbPawns("WHITE")).equal(3);

        board.moveOrAttackPawn(6,4,7,4);
        expect(board.getPositionBoard(7,4).isQueen()).equal(true);
        expect(board.getPositionBoard(7,4).getType()).equal(3);
        console.log(board.getBoardArray());
        console.log();
        //queen bouge
        //todo queen bouge
       // board.moveOrAttackPawn(7,3,4,3);
       // board.removePawn(7,3);
        console.log(board.getBoardArray());
        console.log(board.getNbPawns("WHITE"));

        board.swapPlayer();
        //player 2
        board.moveOrAttackPawn(4,4,4,3);


        console.log(board.getBoardArray(),"\n test queen");
        board.swapPlayer();
        //player 1

        board.moveOrAttackPawn(1,2,1,3);
        board.swapPlayer();
        console.log(board.getBoardArray());
        console.log();
        //player 2
        board.moveOrAttackPawn(1,4,1,2);

        console.log(board.getBoardArray(),"\n test queen");
        // last pawn is Queen
        expect(board.getNbPawns("WHITE")).equal(1);
        expect(board.getPositionBoard(6,2).isQueen()).equal(true);
        expect(board.getPositionBoard(6,2).getType()).equal(3);

        //player 2
        board.moveOrAttackPawn(1,2,0,2);
        console.log(board.getBoardArray(),"\n test queen");
        expect(board.getPositionBoard(0,2).isQueen()).equal(true);
        expect(board.getPositionBoard(0,2).getType()).equal(4);

        board.moveOrAttackPawn(0,2,7,2);
        console.log(board.getBoardArray(),"\n test fin");


    });
});

// describe('Test a Queen', function () {
//     var board = new core.Board();
//     var pawn;
//
//     board.initTest();
//
//     it('New play for Queen', function () {
//
//         console.log(board.getBoardArray());
//         expect(board.getNbPawns("WHITE")).equal(2);
//
//         board.moveOrAttackPawn(6,2,7,2);
//         console.log(board.getBoardArray(),"\n");
//         console.log("[7,2] isQueen = ", board.getPositionBoard(7,2).isQueen,"\n");
//         console.log("[7,2] type = ",board.getPositionBoard(7,2).getType(),"\n");
//         //expect(myIsQueen(board2,7,2)).equal(true);
//         expect(board.getPositionBoard(7,2).isQueen).equal(true);
//
//
//
//
//         console.log(board2.getBoardArray(),"\n");
//         board2.moveOrAttackPawn(2,2,3,2);
//         board2.moveOrAttackPawn(3,2,4,2);
//         board2.moveOrAttackPawn(4,2,5,2);
//         board2.moveOrAttackPawn(5,2,6,2);
//         board2.moveOrAttackPawn(6,2,7,2);
//         console.log(board2.getBoardArray(),"\n");
//         console.log("[7,2] isQueen = ",board2.getPositionBoard(7,2).isQueen,"\n");
//         console.log("[7,2] type = ",board2.getPositionBoard(7,2).getType(),"\n");
//         //expect(myIsQueen(board2,7,2)).equal(true);
//         expect(board2.getPositionBoard(7,2).isQueen).equal(true);
//      //   expect(board2.getPositionBoard(7,2).getType()).equal(3);
//
//
//         //expect(myIsQueen(board2,7,2)).equal(true);
//
//         board2.swapPlayer();
//         //player 2
//
//         board2.moveOrAttackPawn(5,5,4,5);
//         board2.moveOrAttackPawn(4,5,3,5);
//         board2.moveOrAttackPawn(3,5,2,5);
//         board2.moveOrAttackPawn(2,5,1,5);
//         board2.moveOrAttackPawn(1,5,0,5);
//         console.log(board2.getBoardArray(),"\n");
//         console.log("[0,5] isQueen = ",board2.getPositionBoard(0,5).isQueen,"\n");
//         //expect(myIsQueen(board2,0,5)).equal(true);
//         expect(board2.getPositionBoard(0,5).isQueen).equal(true);
//
//     });
// });
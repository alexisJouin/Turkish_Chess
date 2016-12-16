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

    it('New play for win', function () {

        for (var i = 0 ; i < 8; i++) {
            if (i< 3 || i > 4) {
                board.removePawn(1,i);
                board.removePawn(2,i);
                board.removePawn(5,i);
                board.removePawn(6,i);
            }
            if (i == 4) {
                board.removePawn(1,i);
                board.removePawn(2,i);
            }
        }
        console.log(board.getBoardArray());
        board.moveOrAttackPawn(2,3,3,3);
        board.moveOrAttackPawn(3,3,4,3);
        board.swapPlayer();
        //player 2
        board.moveOrAttackPawn(5,3,3,3);
        //todo remove
        //board.removePawn(4,3);
        console.log(board.getBoardArray());
        //expect(myIsQueen(board,1,3)).equal(true);

    });
});
/**
 * Created by esailly on 21/12/16.
 */
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var fs = require('fs');
var core = require('./../core');
//var stp = require("./ScenarioTestPlay");

describe('Test a Play', function () {
    var board = new core.Board();

    it('Bug False move', function () {
        board.addPlayer("Id1");
        board.addPlayer("Id2");

        //Player 1
        board.moveOrAttackPawn(2,3,3,3);
        expect(board.empty([2,3])).equal(true);
        expect(board.empty([3,3])).equal(false);

        board.swapPlayer();
        //player 2

        board.moveOrAttackPawn(5,5,4,5);

        board.swapPlayer();
        //player 1
        //console.log(board.getBoardArray(),"\n");

        board.moveOrAttackPawn(2,4,2,3);
     //   console.log(board.getBoardArray());
        expect(board.empty([2,4])).equal(true);
        expect(board.empty([2,3])).equal(false);
        expect(board.empty([1,3])).equal(false);

     //   console.log(board.getBoardArray(),"\n");

        board.swapPlayer();
        //player 2

        board.moveOrAttackPawn(5,4,4,4);
        board.swapPlayer();
        //player 1
        console.log(board.getBoardArray(),"\n");
        board.moveOrAttackPawn(3,3,4,3);
        console.log(board.getBoardArray(),"\n");
        expect(board.empty([3,3])).equal(true);
        expect(board.empty([4,3])).equal(false);
        expect(board.empty([3,2])).equal(true);

        board.swapPlayer();
        //player 2
       // console.log(board.getPossibleAttacks(5,3),"\n");
       // console.log(board.getPossibleAttacks(4,4),"\n");
       // console.log(board.getPossibleAttacks(5,4),"\n");

        // console.log(board.allowMovePawn(5,4,4,4).positionArrive,"\n");
        // console.log(board.allowMovePawn(5,3,3,3).positionArrive,"\n");
        // console.log(board.allowMovePawn(4,4,4,2).positionArrive,"\n");

        board.moveOrAttackPawn(4,4,4,2);
        console.log(board.getBoardArray(),"\n");

    });
});
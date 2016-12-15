/**
 * Created by esailly on 15/12/16.
 */
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var fs = require('fs');
var core = require('./../core');

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
        //console.log(board.getPositionBoard(3,3));
        expect(board.empty([2,3])).equal(true);

      //  expect(board.getCurrentPlayer()).equal(1);
        board.swapPlayer();
        board.moveOrAttackPawn(5,3,4,3);
        board.swapPlayer();

        //expect(board.getPossibleAttacks(3,3)).to.deep.equal([]);





        //player 2
        expect(board.getPossibleAttacks(2,2)).to.deep.equal([]);
       // expect(board.getPossibleAttacks(5,1)).to.deep.equal([[4,1]]);
       // expect(board.getPossibleAttacks(5,0)).to.deep.equal([[4,0]]);


       // expect(board.getPossibleAttacks(2,2)) === ([]);
       // console.log(board.moveOrAttackPawn(2,2,0,0));
       // expect(board.moveOrAttackPawn(2,2)) === ([])



    });



});
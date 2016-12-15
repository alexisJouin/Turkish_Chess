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
        board.swapPlayer();

        //player 2
      //  expect(board.getPossibleMoves(2,2)).to.deep.equal([]); //noir joue blanc
        expect(board.getPossibleMoves(5,1)).to.deep.equal([[4,1]]);
        expect(board.getPossibleMoves(5,0)).to.deep.equal([[4,0]]);

        //player 2
        expect(board.getPossibleAttacks(2,2)).to.deep.equal([]); //noir joue blanc
       // expect(board.getPossibleAttacks(5,1)).to.deep.equal([[4,1]]);
       // expect(board.getPossibleAttacks(5,0)).to.deep.equal([[4,0]]);


       // expect(board.getPossibleAttacks(2,2)) === ([]);
       // console.log(board.moveOrAttackPawn(2,2,0,0));
       // expect(board.moveOrAttackPawn(2,2)) === ([])



    });



});
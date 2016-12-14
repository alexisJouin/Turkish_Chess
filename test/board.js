var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var fs = require('fs');
var core = require('./../core');

describe('Board', function () {
    it('TestBidon', function () {
        expect(2).equal(2);
        var b = new core.Board();
        //console.log(b.toString());
    });
});

describe('Board', function () {
    it('Couleur', function () {

        var board = new core.Board();
        var colors = board.getPositionBoard(1, 2).getColour();
        var nbWhite = board.getNbPawns("WHITE");

        expect("WHITE").equal(colors);
        expect(16).equal(nbWhite);

    });

});



describe('Board', function () {
    it('Move Pion', function () {
        var board = new core.Board();

        var allows1 = board.allow(2, 2, 3, 2);
        var allows2 = board.allow(5, 2, 4, 2);
        var allows3 = board.allow(5, 2, 5, 3);
        expect(allows1).equal(true);
        expect(allows2).equal(true);
        expect(allows3).equal(false);
    });

});

describe('Board', function () {
    it('getPossibleMoves', function () {
        var board = new core.Board();
        var possibleMoves = board.getPossibleMoves(5,0);
        console.log(possibleMoves);
        var expectedPossibleMoves = [[4,0]];
        expect(expectedPossibleMoves) === (possibleMoves);
    });
});

describe('Board', function () {
    it('capture required', function () {
        var board = new core.Board();

        var allows1 = board.requiredAllow(2, 2);

        //expect(allows1).equal(true);

    });

});
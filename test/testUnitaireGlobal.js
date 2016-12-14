/**
 * Created by esailly on 14/12/16.
 */

var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var fs = require('fs');
var core = require('./../core');

describe('Global Test', function () {
    it('Board', function () {
        var board = new core.Board();
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


});
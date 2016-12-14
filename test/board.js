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

    describe('Board', function () {
        it('Couleur', function () {

            var board = new core.Board();
            var colors = board.getPositionBoard(1,2).getColour();
            var nbWhite=board.getNbPawns("WHITE");

            expect("WHITE").colors;
            expect(16).nbWhite;

        });

    });

    describe('Board', function () {
        it('Move Pion', function () {
           var board = new core.Board();

           var pion = [2,2];
           var allows = board.allow(pion,3,2);
           expect(allows).equal(true);

        });

    });




});
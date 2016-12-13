var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var fs = require('fs');
var core = require('./../core');

describe('Board', function () {
    it('TestBidon', function () {
        expect(2).equal(2);
        var b = new core.Board();
        console.log(b.toString());
    });

});
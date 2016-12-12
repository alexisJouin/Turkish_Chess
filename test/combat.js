var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var fs = require('fs');
var path = require('path');

var core = require('./../core');


describe('Pokemon card loading', function () {

    //test unitaire pikachu
    it('Pikachu', function () {
        var card_pikachu = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/42.json', 'utf8'));

        expect(card_pikachu.name()).to.equal("Pikachu");
        expect(card_pikachu.attacks().length).to.equal(2);
        expect(card_pikachu.retreat_cost()).to.equal(1);
        expect(card_pikachu.expansion().name()).to.equal("XY");
        expect(card_pikachu.expansion().number()).to.equal(146);
        expect(card_pikachu.card_number()).to.equal(42);
    });


    //test combat paras et Ponyta
    it('Paras & Ponyta', function () {
        var card_paras = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/Generations/6.json', 'utf8'));
        var card_ponyta = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/Generations/9.json', 'utf8'));
        //creations cartes
        var paras = new core.Pokemon(card_paras);
        var ponyta = new core.Pokemon(card_ponyta);
        var board = new core.Board([paras, ponyta]);

        expect(paras.life_point()).to.equal(60);

        board.attacker().applyDamage(30);
        //soigne
        board.attacker().applyHeal(40);
        expect(paras.life_point()).to.equal(60);


        var i = board.defender().to_object().retreat_cost;

       //board.attacker().applyDamage(for(var j=0;j<i;j++){board.defender().applyDamage(40);});

        
            /*for(var i =0;i<2;i++) {
                board.attacker().applyDamage(40);
            };
            */
        console.log(board.defender().to_object().type);
        expect(paras.life_point()).to.equal(60);


    });

});
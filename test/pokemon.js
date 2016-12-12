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

  //test ponyta
  it('Ponyta', function () {
    var card_ponyta = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/Generations/14.json', 'utf8'));

    expect(card_ponyta.name()).to.equal("Ponyta");
    expect(card_ponyta.attacks().length).to.equal(2);
    expect(card_ponyta.retreat_cost()).to.equal(1);
    expect(card_ponyta.expansion().name()).to.equal("Generations");
    expect(card_ponyta.expansion().number()).to.equal(83);
    expect(card_ponyta.card_number()).to.equal(14);
  });

  //test combat stari et Pikachu
  it('Stari & Pikachu', function () {
    var card_stari = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/33.json', 'utf8'));
    var card_pikachu = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/42.json', 'utf8'));
    var stari = new core.Pokemon(card_stari);
    var pikachu = new core.Pokemon(card_pikachu);
    var board = new core.Board([stari, pikachu]);

    expect(stari.life_point()).to.equal(60);

    board.turn();
    expect(stari.life_point()).to.equal(50);

    board.attacker().applyDamage(30);
    expect(pikachu.life_point()).to.equal(30);

  });

  //test règles
  it('Paras & Pikachu', function () {
    var card_paras = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/33.json', 'utf8'));
    var card_pikachu = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/42.json', 'utf8'));
    var paras= new core.Pokemon(card_paras);
    var pikachu = new core.Pokemon(card_pikachu);
    var board = new core.Board([paras, pikachu]);

    expect(paras.life_point()).to.equal(60);

    board.turn();
    expect(paras.life_point()).to.equal(50);

    board.attacker().applyDamage(30);
    expect(pikachu.life_point()).to.equal(30);

  });

  //test combat kokiyas et Ponyta
  it('Kokiyas & Ponyta', function () {
    var card_kokiyas = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/Generations/19.json', 'utf8'));
    var card_ponyta = new core.Builder().createFromJSON(fs.readFileSync('./data/XY/Generations/14.json', 'utf8'));
    //creations cartes
    var kokiyas = new core.Pokemon(card_kokiyas);
    var ponyta = new core.Pokemon(card_ponyta);
    var board = new core.Board([kokiyas, ponyta]);

    expect(kokiyas.life_point()).to.equal(60);

    board.turn();
    
    expect(kokiyas.life_point()).to.equal(60);
  });

  
  it('All XY cards', function () {
    var cards = [];
    var files = fs.readdirSync('./data/XY/XY/');

    files.forEach(function (file) {
      if (path.extname(file) === '.json') {
        cards.push(new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/' + file, 'utf8')));
      }
    });
    expect(cards.length).to.equal(48);
  });

});

describe('Deck', function () {
  it('Init', function () {
    var deck = new core.Deck([], [], []);

    expect(deck).to.not.equal(null);
  });

  it('InitWithPokemonCards', function () {
    var pokemon_cards = [];
    var energy_cards = [];
    var files = fs.readdirSync('./data/XY/XY/');

    files.forEach(function (file) {
      if (path.extname(file) === '.json') {
        pokemon_cards.push(new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/' + file, 'utf8')));
      }
    });
    for (i = 0; i < 6; ++i) {
      energy_cards.push(new core.EnergyCard(core.EnergyType.PLANT));
    }
    for (i = 0; i < 6; ++i) {
      energy_cards.push(new core.EnergyCard(core.EnergyType.WATER));
    }

    var deck = new core.Deck(pokemon_cards, energy_cards, []);

    expect(deck.pokemon_cards().length).to.equal(48);
    expect(deck.valid()).to.be.true;
  });
});

describe('Board', function () {
  it('Hand', function () {
    var pokemon_cards = [];
    var energy_cards = [];
    var files = fs.readdirSync('./data/XY/XY/');

    files.forEach(function (file) {
      if (path.extname(file) === '.json') {
        pokemon_cards.push(new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/' + file, 'utf8')));
      }
    });
    for (var i = 0; i < 6; ++i) {
      energy_cards.push(new core.EnergyCard(core.EnergyType.PLANT));
      energy_cards.push(new core.EnergyCard(core.EnergyType.WATER));
    }

    var deck1 = new core.Deck(pokemon_cards, energy_cards, []);
    var deck2 = new core.Deck(pokemon_cards, energy_cards, []);
    var player1 = new core.Player(deck1);
    var player2 = new core.Player(deck2);
    var board = new core.Board([player1, player2]);

    board.selectInitialHands();

    expect(board.attacker().hand().length).to.equal(7);
    expect(board.defender().hand().length).to.equal(7);

  console.log('===== ATTACKER =====');
    board.attacker().hand().forEach(function (card) {
      if (card.card_type() === core.CardType.POKEMON) {
        console.log(card.name() + ' ' + card.stage());
      } else {
        console.log('ENERGY ' + card.type());
      }
    });
    console.log(' => ' + board.attacker().isValidInitialHand());
    console.log('===== DEFENDER =====');
    board.defender().hand().forEach(function (card) {
      if (card.card_type() === core.CardType.POKEMON) {
        console.log(card.name() + ' ' + card.stage());
      } else {
        console.log('ENERGY ' + card.type());
      }
    });
    console.log(' => ' + board.defender().isValidInitialHand());

  });

  it('First active pokemon', function () {
    var pokemon_cards = [];
    var energy_cards = [];
    var files = fs.readdirSync('./data/XY/XY/');

    files.forEach(function (file) {
      if (path.extname(file) === '.json') {
        pokemon_cards.push(new core.Builder().createFromJSON(fs.readFileSync('./data/XY/XY/' + file, 'utf8')));
      }
    });
    for (var i = 0; i < 6; ++i) {
      energy_cards.push(new core.EnergyCard(core.EnergyType.PLANT));
      energy_cards.push(new core.EnergyCard(core.EnergyType.WATER));
    }

    var board = new core.Board([
      new core.Player(new core.Deck(pokemon_cards, energy_cards, [])),
      new core.Player(new core.Deck(pokemon_cards, energy_cards, []))
    ]);

    var valid = false;

    do {
      board.selectInitialHands();
      valid = board.attacker().isValidInitialHand() && board.defender().isValidInitialHand();
      if (!valid) {
        board.cancelInitialHands();
      }
    } while (!valid);

    var index = board.attacker().getFirstBasePokemonCardIndex();
    var card = board.attacker().takeCardInHand(index);

    expect(card.card_type()).to.equal(core.CardType.POKEMON);
    expect(card.stage()).to.equal(core.Stage.BASE);

  });

});
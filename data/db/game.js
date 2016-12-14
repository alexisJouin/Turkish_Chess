exports = module.exports = function(app, mongoose) {
    var gameSchema = new mongoose.Schema({
        player1: String,
        player2: String,
        winner: String,
        number_of_turns: Number
    });

    app.db.model('Game', gameSchema);
};



exports = module.exports = function(app, mongoose) {
    var tournamentSchema = new mongoose.Schema({
        player1: String,
        player2: String,
        player3: String,
        player4: String
    });

    app.db.model('Tournament', tournamentSchema);
};
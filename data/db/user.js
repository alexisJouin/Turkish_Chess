exports = module.exports = function(app, mongoose) {
    var userSchema = new mongoose.Schema({
        username: String,
        password: String,
        mail: String
    });

    app.db.model('User', userSchema);
};



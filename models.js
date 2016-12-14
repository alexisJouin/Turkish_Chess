exports = module.exports = function (app, mongoose){

    require('./data/db/user')(app, mongoose);
    require('./data/db/game')(app, mongoose);


};
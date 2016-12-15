var express = require('express');
var router = express.Router();
//var core = require('../core');
var fs = require('fs');

router.post('/', function(req, res, next) {
    res.render('menu');
});

router.get('/', function(req, res, next) {

    if(!req.session._id && !req.session.username && !req.session.mail){  // Si non connecte, redirige vers connexion
        res.redirect('/connexion');
    }else { // Sinon on affiche menu
        // Creation classement


        tab_classement = [];
        var i = 0;
        req.app.db.models.User.find(function(enn,users){
            users.forEach(function(user){
                tab_classement[i] = []
                tab_classement[i]['rang'] = i+1;
                tab_classement[i]['pseudo'] = user.username;
                tab_classement[i]['points'] = user.points;
                i++;


            });
            // Compte le nombre de parties d'un joueur
            req.app.db.models.Game.count( { $or: [ { 'player1':req.session.username }, { 'player2':req.session.username } ] }, function(err, req_number_of_games){
                if(req_number_of_games > 0) {
                    // S'il a au moins une partie, on la/les selectionnes
                    req.app.db.models.Game.find({$or: [{'player1': req.session.username}, {'player2': req.session.username}]}, function (err, req_games) {
                        stats_game = [];
                        stats_game['nbmatch'] = req_number_of_games;
                        stats_game['nbwin'] = 0;
                        stats_game['nbturnmin'] = req_games[0].number_of_turns;
                        var number_of_turn = 0;

                        for(var i = 0; i < req_number_of_games; i++){
                            if(req_games[i].winner == req.session.username){
                                stats_game['nbwin']++;
                                if(req_games[i].number_of_turns < stats_game['nbturnmin']){
                                    stats_game['nbturnmin'] = req_games[i].number_of_turns;
                                }
                            }
                            number_of_turn += req_games[i].number_of_turns;

                        }

                        stats_game['ratio'] = Math.round((stats_game['nbwin'] / stats_game['nbmatch'])*100)/100;
                        stats_game['nbturnmean'] = Math.round((number_of_turn / stats_game['nbmatch'])*100)/100;



                        res.render('menu', {
                            _id: req.session._id,
                            username: req.session.username,
                            mail: req.session.mail,
                            has_game: 1,
                            stats: stats_game,
                            classement: tab_classement
                        });

                    });

                }else{
                    res.render('menu', {
                        _id: req.session._id,
                        username: req.session.username,
                        has_game: 0,
                        mail: req.session.mail,
                        classement: tab_classement
                    });
                }

            });
        }).sort( { points: -1 } );





/*

        // Compte le nombre de parties d'un joueur
        req.app.db.models.Game.count( { $or: [ { 'player1':req.session.username }, { 'player2':req.session.username } ] }, function(err, req_number_of_games){
            if(req_number_of_games > 0) {
                // S'il a au moins une partie, on la/les selectionnes
                req.app.db.models.Game.find({$or: [{'player1': req.session.username}, {'player2': req.session.username}]}, function (err, req_games) {
                    stats_game = [];
                    stats_game['nbmatch'] = req_number_of_games;
                    stats_game['nbwin'] = 0;
                    stats_game['nbturnmin'] = req_games[0].number_of_turns;
                    var number_of_turn = 0;

                    for(var i = 0; i < req_number_of_games; i++){
                        if(req_games[i].winner == req.session.username){
                            stats_game['nbwin']++;
                            if(req_games[i].number_of_turns < stats_game['nbturnmin']){
                                stats_game['nbturnmin'] = req_games[i].number_of_turns;
                            }
                        }
                        number_of_turn += req_games[i].number_of_turns;

                    }

                    stats_game['ratio'] = Math.round((stats_game['nbwin'] / stats_game['nbmatch'])*100)/100;
                    stats_game['nbturnmean'] = Math.round((number_of_turn / stats_game['nbmatch'])*100)/100;

                    res.render('menu', {
                        _id: req.session._id,
                        username: req.session.username,
                        mail: req.session.mail,
                        has_game: 1,
                        stats: stats_game
                    });

                });

            }else{
                res.render('menu', {
                    _id: req.session._id,
                    username: req.session.username,
                    has_game: 0,
                    mail: req.session.mail
                });
            }

        });
*/


    }
});

router.get('/deconnexion', function(req, res, next) {
    req.session.destroy();
    res.writeHead(302, {
        'Location': '/connexion'
        //add other headers here...
    });
    res.end();

});

/*
function getRatio(pseudo) {
    req.app.db.models.Game.count({$or: [{'player1': pseudo}, {'player2': pseudo}]}, function (err, req_number_of_games) {
        if(req_number_of_games == 0){
            return 0;
        }
        var number_of_match = 0;
        var number_of_win = 0;
        req.app.db.models.Game.find({$or: [{'player1': pseudo}, {'player2': pseudo}]}, function (err, req_games) {

            for(var i = 0; i < req_number_of_games; i++){
                if(req_games[i].winner == pseudo) {
                    number_of_win = number_of_win + 1;
                }
                number_of_match = number_of_match +1;
            }
        });
        return number_of_win/number_of_match;

    });
}
*/

module.exports = router;


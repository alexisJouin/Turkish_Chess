var express = require('express');
var router = express.Router();
//var core = require('../core');
var fs = require('fs');

/* GET game page. */
router.get('/', function(req, res, next) {
    if(!req.session._id && !req.session.username && !req.session.mail){  // Si non connecte, redirige vers connexion
        res.redirect('/connexion');
    }else { // Sinon on affiche jeu
        res.render('game', {
            _id: req.session._id,
            username: req.session.username,
            mail: req.session.mail,
        });
    }

});

module.exports = router;

var express = require('express');
var router = express.Router();
//var core = require('../core');
var fs = require('fs');

/* GET game page. */
router.get('/', function(req, res, next) {
    if(!req.session._id && !req.session.username && !req.session.mail){  // Si non connecte, redirige vers connexion
        res.redirect('/connexion');
    }else { // Sinon on affiche jeu
        res.render('game');
    }

});

module.exports = router;

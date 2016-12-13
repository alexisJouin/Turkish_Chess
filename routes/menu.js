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
        res.render('menu', {
            _id: req.session._id,
            username: req.session.username,
            mail: req.session.mail,
        });
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



module.exports = router;


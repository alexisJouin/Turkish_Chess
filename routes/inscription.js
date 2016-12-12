/**
 * Created by Alexis on 08/06/2016.
 */

var express = require('express');
var router = express.Router();
//var core = require('../core');
var fs = require('fs');

/* GET inscription page. */
router.get('/', function(req, res, next) {
    if (req.session._id && req.session.username && req.session.mail) {  // Si connecte, redirige vers menu
        res.redirect('/menu')
    } else {
        res.render('inscription');
    }
});


router.post('/', function(req, res, next) {
    if (req.session._id && req.session.username && req.session.mail) {  // Si connecte, redirige vers menu
        res.redirect('/menu')
    } else {
        

        // Codes erreurs
        // 1 = deja pris
        // 2 = trop court

        // create the user
        var newUser = {
            username: req.param('username'),
            password: req.param('password'),
            mail: req.param('mail')
        };

        // save the user
        req.app.db.models.User.count({'username': req.param('username')}, function (err, pseudo) {
            if (pseudo > 0) { // Pseudo deja pris
                res.render('inscription', {pseudo: 1});
            } else if (req.param('username').length < 3) { // Pseudo trop court
                res.render('inscription', {pseudo: 2});
            } else {
                req.app.db.models.User.count({'mail': req.param('mail')}, function (err, mail) {
                    if (mail > 0) { // Mail deja pris
                        res.render('inscription', {mail: 1});
                    } else {
                        if (req.param('password').length < 6) { // Mot de passe trop court
                            res.render('inscription', {password: 1});
                        } else {
                            //INSCRIPTION
                            req.app.db.models.User.create(newUser, function (err, user) {
                                if (err) {
                                    console.log('Error in Saving user: ' + err);
                                    throw err;
                                }
                                console.log('User Registration succesful');
                                res.redirect('/connexion');
                            });
                        }
                    }

                });
            }

        });
    }
});


module.exports = router;

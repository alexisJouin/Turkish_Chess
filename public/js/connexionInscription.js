/**
 * Created by Alexis on 09/06/2016.
 */

$( document ).ready(function() {

    //Gestion des cliques boutons pour inscription/connexion
    $("#connexion_move").click(function(){
        window.location.replace("/connexion");
    });

    //Gestion des cliques boutons pour inscription/connexion
    $("#inscription_move").click(function(){
        window.location.replace("/inscription");
    });
    
});

/*

    var pseudo = $("#pseudo").val();
    var email = $("#email").val();
    var mdp = $("#password").val();

    //Bouton inscription
    $("#inscription_button").click(function (event) {
        event.preventDefault();
        testBasique();
    });

    //Bouton de connexion
    $("#connexion_button").click(function (event) {
        event.preventDefault();
        testBasique();
    });


    function testBasique(){
        
        pseudo = $("#pseudo").val();
        email = $("#email").val();
        mdp = $("#password").val();

        var errors="";
        
        if(pseudo === ""){
            $("#errPseudo").show();
        }
        if(mdp === ""){
            $("#errMdp").show();
        }
        if(email === ""){
            $("#errMail").show();
        }

        $("#pseudo").click(function(){
            $("#errPseudo").fadeOut();
        });
        $("#password").click(function(){
            $("#errMdp").fadeOut();
        });
        $("#email").click(function(){
            $("#errMail").fadeOut();
        });

    }
    */
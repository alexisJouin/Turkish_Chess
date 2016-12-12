$( document ).ready(function() {

    //Boutton Lancer Partie
    $("#playGame").click(function () {
        window.location.replace("/jeu");
    });

    $("#logOut").click(function () {
        //window.location.replace("/connexion?deconnexion=true");

        $.ajax({
            type: 'PUT',
            url: '/connexion',
            data: {
                type: "logOut"
            },
            sucess: function (sucess) {
                alert('sucess');
            },
            err: function (err) {
                alert('err');
            }
        });
        window.location.replace("/connexion");

    });



});


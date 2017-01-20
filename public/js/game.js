$( document ).ready(function() {
    socket.emit('play', $('#name').attr('name'));
});

var socket = io.connect('http://localhost:3000');
var canPlay = false;
var playerColour = -1;
var player;
var opponentName, myName;

socket.on('opponentDisconnected', function(){
    canPlay = false;
    console.log("Adversaire déconnecté");
    $('#tour').html("Adversaire déconnecté");
    $("#tour").fadeIn(1000);
});

socket.on('turn', function (turn) {
    canPlay = turn;
    if (canPlay) {
        $('#tour').html("A vous de jouer !");
        $("#tour").fadeIn(1000);
        $("#tour").delay(1000).fadeOut(1000);

        //$('#currentPlayer').html("A vous de jouer !");
    }
    else {
        $('#tour').html("C'est le tour de l'adversaire !");
        $("#tour").fadeIn(1000);
        $("#tour").delay(1000).fadeOut(1000);
        //$('#currentPlayer').html("C'est à l'adversaire de jouer");
    }
});

socket.on('colour', function (c) {
    playerColour = c;
    if (c == 0) {
        //$('#playerColor').html("Vous êtes le joueur BLANC");
        player = 'whitePawn';
        $('.blackPawn').css('cursor', 'not-allowed');
    }
    else if (c == 1) {
        //$('#playerColor').html("Vous êtes le joueur NOIR");
        player = 'blackPawn';
        $('.whitePawn').css('cursor', 'not-allowed');
    }
});


//On get le plateau du moteur
socket.on('board', function (board, nbWhite, nbBlack) {
    constructBoard(board);

    if(playerColour == 0){
        $("#userblanc").html("Blanc : "+myName+" ("+nbWhite+")");
        $("#usernoir").html("Noir : "+opponentName+" ("+nbBlack+")");

        $("#userblanc").css('text-decoration','underline');
    }else{
        $("#userblanc").html("Blanc : "+opponentName+" ("+nbWhite+")");
        $("#usernoir").html("Noir : "+myName+" ("+nbBlack+")");

        $("#usernoir").css('text-decoration','underline');

    }
});


socket.on('waiting', function (wait) {
    var joueurColorText;
    if(playerColour == 0){
        joueurColorText = "BLANC";
    }
    else{
        joueurColorText = "NOIR";
    }

    if (wait) {
        $("#waiting").fadeIn(1000);
    }
    else {
        $("#waiting p").html("La partie commence, vous êtes " + joueurColorText );
        $("#waiting").delay(1000).fadeOut(1500);
    }
});

// Get déplacement possible
socket.on('possibleMoves', function (moves) {
    $(".possibleCase").removeClass('possibleCase');
    moves.forEach(function (pos) {
        $("#" + pos.positionArrive[1] + "_" + pos.positionArrive[0]).addClass('possibleCase');
    });
});

socket.on('opponentName', function(oppName){
    myName = $('#name').attr('name');
    opponentName = oppName;
});

var coord;

//Au click sur un pion
$(document).on('click', ".piece", function () {
    if (canPlay && $(this).hasClass(player)) {
        //Coordonnées du pion
        var y = parseInt($(this).parent().attr('id').slice(0));
        var x = parseInt($(this).parent().attr('id').slice(2));
        coord = [x, y];

        socket.emit('pawn', coord);

        //Si c'est au tour du joueur il peut déplacer les pions
        $('.piece').removeClass('selectedPiece');
        $(this).addClass('selectedPiece');


    }
});

socket.on('getPossibleAttacks', function(ObligatoireMove){
    if(ObligatoireMove[0] = "Attack"){
        alert("Obligatoire !!")
    }
    console.log("Obligatoire"+ ObligatoireMove);
});

socket.on('win', function(win){
    if(win){
        alert(" VICTOIRE !!!!")
    }else{
        alert(" DéFAITE :'( !!!!")
    }
    console.log("Obligatoire"+ ObligatoireMove);
});

//Déplace la pièce au click sur possible case
$(document).on('click', ".possibleCase", function () {

    //Coordonnées après déplacement
    var y_final = parseInt($(this).attr('id').slice(0));
    var x_final = parseInt($(this).attr('id').slice(2));
    var coord_final = [x_final, y_final];

    socket.emit('move', coord, coord_final);
    console.log("Init : "+ coord);
    console.log("arrivé : "+ coord_final);
    $('.piece').removeClass('selectedPiece');

});


/** List of functions **/
/**
 * Construction du plateau dans le view
 * @param board => tableau de 8 tableaux contenant les pions
 * 0 => vide / 1 => Blan / 2 => Noir
 */
function constructBoard(board) {
    var output = "" +
        "<thead>" +
        "<tr><th><th>0<th>1<th>2<th>3<th>4<th>5<th>6<th>7" +
        "<tbody>";
    var nbLigne = 0;

    board.forEach(function (ligne) {
        output += "<tr class='row'><th>" + nbLigne;

        var nbColumn = 0;
        ligne.forEach(function (element) {

            //Noir
            if (element == 2) {
                //&#9823;
                output += "<td class='tile' align='center' id='" + nbColumn + "_" + nbLigne + "'><img src='img/noirPion.png' class='piece blackPawn'/></td>";
            }
            //Blanc
            else if (element == 1) {
                //&#9817;
                output += "<td class='tile' align='center' id='" + nbColumn + "_" + nbLigne + "'><img src='img/blancPion.png' class='piece whitePawn'/></td>";
            }
            //Blanc Reine
            else if (element == 3) {
                //&#9817;
                output += "<td class='tile' align='center' id='" + nbColumn + "_" + nbLigne + "'><img src='img/blancQueen.png' class='piece whitePawn'/></td>";
            }
            //Noir Reine
            else if (element == 4) {
                //&#9817;
                output += "<td class='tile' align='center' id='" + nbColumn + "_" + nbLigne + "'><img src='img/noirQueen.png' class='piece whitePawn'/></td>";
            }
            else {
                output += "<td class='tile' align='center' id='" + nbColumn + "_" + nbLigne + "'></td>";
            }
            nbColumn++;

        });
        nbLigne++;
    });
    $('#board').children('table').html(output);
}

/**
 * Déplacer un élément avec annimation
 * @param sel -> élément html qui reçoit élément à déplacer
 * @param  -> vitesse de l'animation
 * @returns {*}
 */
$.fn.animateAppendTo = function (sel, speed) {
    var $this = this,
        newEle = $this.clone(true).appendTo(sel),
        newPos = newEle.position();
    newEle.hide();
    $this.css('position', 'absolute').animate(newPos, speed, function () {
        newEle.show();
        $this.remove();
    });
    return newEle;
};
var socket = io.connect('http://localhost:3000');
socket.emit('play');
var canPlay = false;

socket.on('turn', function (turn) {
    canPlay = turn;
    if (canPlay) {
        $('#currentPlayer').html("A vous de jouer !");
    }
    else {
        $('#currentPlayer').html("C'est à l'adversaire de jouer");
    }
});

socket.on('colour', function (c) {
    if (c == 0) {
        $('#playerColor').html("Vous êtes le joueur BLANC");
    }
    else if (c == 1) {
        $('#playerColor').html("Vous êtes le joueur NOIR");
    }
});

// Get déplacement possible
socket.on('possibleMoves', function (moves) {

    $(".possibleCase").removeClass('possibleCase');
    moves.forEach(function (pos) {

        $("#" + pos.positionArrive[1] + "_" + pos.positionArrive[0]).addClass('possibleCase');
    });
});

//On get le plateau du moteur
socket.on('board', function (board) {
    constructBoard(board);
});


socket.on('waiting', function (wait) {
    if (wait) {
        $("#waiting").fadeIn(1000);
    }
    else {
        $("#waiting p").html("Trouvé !");
        $("#waiting").delay(1000).fadeOut(1000);
    }
});


//Au click sur un pion
$(document).on('click', ".piece", function () {

    //Coordonnées du pion
    var y = parseInt($(this).parent().attr('id').slice(0));
    var x = parseInt($(this).parent().attr('id').slice(2));
    var coord = [x, y];
    //console.log(coord);
    socket.emit('pawn', coord);


    //Si c'est au tour du joueur il peut déplacer les pions
    if (canPlay) {
        movePiece($(this));
    }
    else {
        $('.piece').removeClass('selectedPiece');
    }
});


/** List of functions **/

/**
 * Construction du plateau dans le view
 * @param board => tableau de 8 tableaux contenant les pions
 * 0 => vide / 1 => Noir / 2 => Blanc
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
            if (element == 1) {
                //&#9823;
                output += "<td class='tile' align='center' id='" + nbColumn + "_" + nbLigne + "'><img src='img/noirPion.png' class='piece blackPawn'/></td>";
            }
            else if (element == 2) {
                //&#9817;
                output += "<td class='tile' align='center' id='" + nbColumn + "_" + nbLigne + "'><img src='img/blancPion.png' class='piece whitePawn'/></td>";
            }
            else {
                output += "<td class='tile' align='center' id='" + nbColumn + "_" + nbLigne + "'></td>";
            }
            nbColumn++;

        });
        nbLigne++;
    });
    $('#board').children('table').append(output);
}

/**
 * Déplacement d'un pion
 * @param element => pion sélectionné
 */
function movePiece(piece) {
    $('.piece').removeClass('selectedPiece');
    piece.addClass('selectedPiece');

    /*
     piece.draggable({
     containment: "",
     //stack: '#board table',
     revert: true
     });
     */

    //Chercher les coordonées possibles
    /* boardPosibleCoords.forEach(function (coord) {
     console.log(coord);
     $("#" + coord[0] + "_" + coord[1]).addClass('possibleCase');
     });*/

    //Déplace la pièce
    $(document).on('click', ".possibleCase", function () {
        $(".selectedPiece").animateAppendTo($(this), 1500);

        //Coordonnées avant déplacement
        var x_init = parseInt($(".selectedPiece").parent().attr('id').slice(0));
        var y_init = parseInt($(".selectedPiece").parent().attr('id').slice(2));
        var coord_init = [x_init, y_init];

        //Coordonnées après déplacement
        var x_final = parseInt($(this).attr('id').slice(0));
        var y_final = parseInt($(this).attr('id').slice(2));
        var coord_final = [x_final, y_final];

        //socket.emit('move', coord_init, coord_final);
        $('.piece').removeClass('selectedPiece');

    });

    /*
     $('td').each(function () {

     //Si case vide
     $("td:empty").droppable({
     drop: function (event, ui) {
     ui.draggable.draggable('option', 'revert', false);
     $(this).addClass("ui-state-highlight");
     console.log($(this));
     }
     });
     });
     */
}

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
var socket = io.connect('http://localhost:3000');
socket.emit('play');

var boardPosibleCoords = [
    [1, 1], [1, 2], [1, 3], [1, 6],[8, 8]
];

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

var canPlay = false;
socket.on('turn', function (turn) {
    canPlay = turn;
    console.log("socket : " + canPlay);
});

//Au click sur un pion
$(document).on('click', "img", function () {
    //Si c'est au tour du joueur il peut déplacer les pions
    console.log(canPlay);
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
        "<tr><th><th>A<th>B<th>C<th>D<th>E<th>F<th>G<th>H" +
        "<tbody>";
    var nbLigne = 1;

    board.forEach(function (ligne) {
        output += "<tr class='row'><th>" + nbLigne;

        var nbColumn = 1;
        ligne.forEach(function (element) {

            //Noir
            if (element == 1) {
                //&#9823;
                output += "<td class='tile' align='center' id='" + nbLigne + "_" + nbColumn + "'><img src='img/noirPion.png' class='piece blackPawn'/></td>";
            }
            else if (element == 2) {
                //&#9817;
                output += "<td class='tile' align='center' id='" + nbLigne + "_" + nbColumn + "'><img src='img/blancPion.png' class='piece whitePawn'/></td>";
            }
            else {
                output += "<td class='tile' align='center' id='" + nbLigne + "_" + nbColumn + "'></td>";
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
    boardPosibleCoords.forEach(function (coord) {
        $("#" + coord[0] + "_" + coord[1]).addClass('possibleCase');
    });

    //Déplace la pièce
    $(document).on('click', ".possibleCase", function () {
        $(".selectedPiece").animateAppendTo($(this),1500);

        //Coordonnées avant déplacement
        var x_init = parseInt($(".selectedPiece").parent().attr('id').slice(0));
        var y_init = parseInt($(".selectedPiece").parent().attr('id').slice(2));
        var coord_init = [x_init, y_init];

        //Coordonnées après déplacement
        var x_final = parseInt($(this).attr('id').slice(0));
        var y_final = parseInt($(this).attr('id').slice(2));
        var coord_final = [x_final, y_final];

        socket.emit('move', coord_init, coord_final);
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

$.fn.animateAppendTo = function(sel, speed) {
    var $this = this,
        newEle = $this.clone(true).appendTo(sel),
        newPos = newEle.position();
    newEle.hide();
    $this.css('position', 'absolute').animate(newPos, speed, function() {
        newEle.show();
        $this.remove();
    });
    return newEle;
};
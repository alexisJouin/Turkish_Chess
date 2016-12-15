var socket = io.connect('http://localhost:3000');
socket.emit('play');

    var boardPosibleCoords = [
        [1, 1], [1, 2],[1, 3],[1, 6]
    ];

//On get le plateau du moteur
socket.on('board', function (board) {
    constructBoard(board);
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

$(document).on('click', "img", function () {
    movePiece($(this));

});

/**
 * Déplacement d'un pion
 * @param element => pion sélectionné
 */
function movePiece(piece) {
    $('.piece').removeClass('selectedPiece');
    piece.addClass('selectedPiece');

    piece.draggable({
        containment: "",
        //stack: '#board table',
        revert: true
    });

    //Chercher les coordonées possibles
    boardPosibleCoords.forEach(function (coord) {

        $("#"+coord[0]+"_"+coord[1]).addClass('possibleCase');

    });

    //Déplace la pièce
    $(document).on('click', ".possibleCase" , function () {
        $(".selectedPiece").appendTo($(this));
    });

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
}
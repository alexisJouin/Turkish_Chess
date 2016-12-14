var socket = io.connect('http://localhost:3000');
socket.emit('play');

//On get le plateau du moteur
socket.on('board', function (board) {
    constructBoard(board);
});


$(document).on('click', 'img', function () {
    movePiece($(this));
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
    var nbLigne = 8;
    board.forEach(function (ligne) {
        output += "<tr class='row'><th>" + nbLigne;
        nbLigne--;
        ligne.forEach(function (element) {

            //Blanc
            if (element == 1) {
                //&#9823;
                output += "<td class='tile'><img src='img/noirPion.png' class='piece blackPawn'/></td>";
            }
            else if (element == 2) {
                //&#9817;
                output += "<td class='tile'><img src='img/blancPion.png' class='piece whitePawn'/></td>";
            }
            else {
                output += "<td class='tile'></td>";
            }

        });
    });
    $('#board').children('table').append(output);
}

/**
 * Déplacement d'un pion
 * @param element => pion sélectionné
 */
function movePiece(element) {
    var plateau = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    
    $('.piece').removeClass('selectedPiece');
    element.addClass('selectedPiece');

    element.draggable({
        containment: "",
        //stack: '#board table',
        revert: true
    });


    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;


    $('h1').droppable({
        drop: function (event, ui) {
            $(this)
                .addClass("ui-state-highlight")
                .find("p")
                .html("Dropped!");
        }
    });
}
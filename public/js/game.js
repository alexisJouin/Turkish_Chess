$( document ).ready(function() {

   var board = Array(
       Array("","","","","","","",""),
       Array("w","w","w","w","w","w","w","w"),
       Array("w","w","w","w","w","w","w","w"),
       Array("","","","","","","",""),
       Array("","","","","","","",""),
       Array("b","b","b","b","b","b","b","b"),
       Array("b","b","b","b","b","b","b","b"),
       Array("","","","","","","","")
   );

    var output="" +
        "<thead>" +
        "<tr><th><th>A<th>B<th>C<th>D<th>E<th>F<th>G<th>H" +
        "<tbody>";
    var nbLigne = 1;

    console.log(board);

    board.forEach(function(ligne){
        output += "<tr class='row'><th>" + nbLigne ;
        nbLigne++;
        ligne.forEach(function(element) {

            if(element=="b"){
                //&#9823;
               output += "<td class='tile'><img src='img/noirPion.png' class='blackPawn'/></td>";
            }
            else if(element =="w"){
                //&#9817;
                output += "<td class='tile'><img src='img/blancPion.png' class='whitePawn'/></td>";
            }
            else{
                output += "<td class='tile'></td>";
            }



            console.log(element);
        });
    });

    $('#board').children('table').append(output);
    $('img').draggable({
        containment: "parent"
    });
    $('h1').droppable({
        drop: function( event, ui ) {
            $( this )
                .addClass( "ui-state-highlight" )
                .find( "p" )
                .html( "Dropped!" );
        }
    });

    $('img').click(function(){
        $('img').css('border', 'none');
        $(this).css('border', '2px solid green');
        $(this).css('border-radius', '180px');
    });


});
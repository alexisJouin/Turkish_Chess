var socket = io.connect('http://localhost:3000');

$('#play').click(function () {
    socket.emit('play');
});

$('#move').click(function () {
    socket.emit('move', [1,2], [5,2]);
});

$('#pawn').click(function () {
    socket.emit('pawn', [2,3]);
});

socket.on('board',function(board) {
    console.log(board);
});

socket.on('waiting',function(wait) {
    if(wait){
        $("#waiting").html("En attente d'un autre joueur...");
    }
    else {
        $("#waiting").html("");
    }
});

socket.on('colour', function(c){
    if(c == 0){
        console.log("JOUEUR BLANC");
    }
    else if(c == 1){
        console.log("JOUEUR NOIR");
    }
});

socket.on('possibleMoves', function(moves){
    console.log(moves);
});

$('#move').attr('disabled','disabled');
socket.on('turn',function(turn) {
    if(turn){
        $('#move').removeAttr('disabled');
    }
    else {
        $('#move').attr('disabled','disabled');
    }
});


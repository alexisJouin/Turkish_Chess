var socket = io.connect('http://localhost:3000');

$('#play').click(function () {
    socket.emit('play');
});

$('#move').click(function () {
    socket.emit('move', []);
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

$('#move').attr('disabled','disabled');
socket.on('turn',function(turn) {
    if(turn){
        $('#move').removeAttr('disabled');
    }
    else {
        $('#move').attr('disabled','disabled');
    }
});


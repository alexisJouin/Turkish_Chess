/**
 * Created by Harinck Aurelien on 08/06/2016.
 */
var socket = io.connect('http://localhost:3000');


$('#play').click(function () {
    socket.emit('play');
});

socket.on('board',function(board) {
    console.log(board);
});
/*
socket.on('test', function(message){
    alert(message);
});
*/
socket.on('turn',function(turn) {
    if(turn){
        console.log("C'est votre tour");
        socket.emit("move", [12,5]);
    }
    else {
        console.log("Ce n'est pas votre tour");
    }
});
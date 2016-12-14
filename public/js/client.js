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


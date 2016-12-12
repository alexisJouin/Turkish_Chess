/**
 * Created by Harinck Aurelien on 08/06/2016.
 */
var socket = io.connect('http://localhost:3000');


$('#poke').click(function () {
    socket.emit('message', 'Salut serveur, ça va ?');
});


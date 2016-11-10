var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;

app.use('/', express.static(__dirname + '/public'));

var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(PORT, function() {
    console.log('Server listening at port ' + PORT);
});

io.on('connection', function(socket) {
    console.log('A new user has connected: ' + socket.id);
    socket.emit('add-u', socket.id);

    socket.on('add-user', function(data) {
        console.log(data.geom, data.pos, data.color, socket.id);
        io.sockets.emit('add-sb', {
            geom: data.geom,
            color: data.color,
            pos: data.pos,
            id: socket.id
        });
    });

    socket.on('disconnect', function() {
        console.log('A user has disconnected: ' + socket.id);
        io.sockets.emit('remove', socket.id);
    });
});

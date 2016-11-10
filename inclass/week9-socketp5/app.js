var express	= require('express');
var app = express();
var PORT = 8888;

// Routing
app.use('/', express.static(__dirname + '/public'));

// Socket.io setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(PORT, function(){
    console.log('Server listening at port ' + PORT);
});

/*-------------- SOCKET.IO --------------*/
io.on('connection', function(socket){
    console.log('A new user has connected: ' + socket.id);
    socket.on('mouse', function(data) {
        console.log("Received" + data.x + ', ' + data.y);

        socket.broadcast.emit('mouse', data);
    })
});
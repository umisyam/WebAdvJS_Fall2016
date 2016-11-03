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

var express	= require('express');
var app = express();
var PORT = 4000;

// Routing
app.use('/', express.static(__dirname + '/public'));

// Socket.io setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(PORT, function(){
    console.log('Server listening at port %d' + PORT);
});

/*-------------- SOCKET.IO --------------*/
// Everything will be inside the on() function
// .on() listens to any string you create ('umi-entered', 'soomi-arrived',...)
// or two predefined events: 'connection' and 'disconnect'
io.on('connection', function(socket) {
    // .on(identifier, callback(data))      listens to
    // .emit(identifier, data)              sends data to every user
    // .broadcast.emit(identifier, data)    sends data to every user, except the newly created
    console.log('A new user has connected: ' + socket.id);
    socket.emit('welcome', 'welcome! your ID is ' + socket.id);

    io.sockets.emit('hey everyone', 'hey everyone! Please welcome ' + socket.id);

    socket.on('message to server', function(data){
    	io.sockets.emit('message to clients', {
    		id: socket.id,
    		msg: data
    	})
    })

    socket.on('disconnect', function(){
    	io.sockets.emit('bye', 'See you, ' + socket.id + '!!!!!');
    })
});






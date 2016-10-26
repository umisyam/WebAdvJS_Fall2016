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

    /*---------- THIS ALL HAPPENS ON EVERY NEW CONNECTION ----------*/
    console.log('A new user has connected: ' + socket.id);

    // I'm using 'welcome,' but it could be ANY STRING!
    // The important thing is to use the same one on the client side
    socket.emit('welcome', 'Welcome! your id is ' + socket.id);  // sending back a simple string

    // The code above sent a message to the newly created connection only! (socket)
    // If we want to send data to every user, we need io.sockets.emmit
    io.sockets.emit('hey-everybody', 'hey, everybody! Please welcome ' + socket.id);
    // io.sockets.emit -----will send to all the clients
    // socket.broadcast.emit -----will send the message to all the other clients except itself
    // http://stackoverflow.com/questions/10342681/whats-the-difference-between-io-sockets-emit-and-broadcast
    /*--------------------------------------------------------------*/


    /*----- THESE ARE LISTENERS! CALLED WHEN A MSG IS RECEIVED -----*/
    // A listener for socket disconnection
    socket.on('disconnect', function() {
        io.sockets.emit('bye', 'See you, ' + socket.id + '!');
    });

    socket.on('msg-to-server', function(data) {
        io.sockets.emit('msg-to-clients', {
            id: socket.id,
            msg: data
        });
    });
    /*--------------------------------------------------------------*/
});